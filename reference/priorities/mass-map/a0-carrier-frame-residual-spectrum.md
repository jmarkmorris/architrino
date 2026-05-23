# $A_0$ Carrier-Frame Residual Spectrum

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: diagnostic carrier-frame residual localization, not accepted history
- Date: May 22, 2026

## Diagnostic Contract

The script [a0-carrier-frame-residual-spectrum.mjs](../../../scripts/mass-map/a0-carrier-frame-residual-spectrum.mjs) consumes a corrected `a0-tier1-fold-layer-locked-one-period-attempt/v1` artifact and projects the existing `I` sampled forcing target into the local corrected-carrier `I` frame.

For each sampled forcing time, it reads

```text
refined_i_receiver_phase_bin_residual_balance.sampled_forcing.samples[].layers.I.residual_forcing
```

and uses a declared carrier-frame time rule to construct

$$
\mathbf{r}_I(t)=\mathbf{s}_{I+}(t)-\mathbf{s}_{I-}(t),
\qquad
\mathbf{v}_I(t)=\mathbf{v}_{I+}(t)-\mathbf{v}_{I-}(t),
$$

$$
\widehat{\mathbf{e}}_{I,r}
=
\frac{\mathbf{r}_I}{\|\mathbf{r}_I\|},
\qquad
\widehat{\mathbf{e}}_{I,\theta}
=
\frac{
\mathbf{v}_I-(\mathbf{v}_I\cdot\widehat{\mathbf{e}}_{I,r})\widehat{\mathbf{e}}_{I,r}
}{
\|\mathbf{v}_I-(\mathbf{v}_I\cdot\widehat{\mathbf{e}}_{I,r})\widehat{\mathbf{e}}_{I,r}\|
},
\qquad
\widehat{\mathbf{e}}_{I,n}
=
\widehat{\mathbf{e}}_{I,r}\times\widehat{\mathbf{e}}_{I,\theta}.
$$

It then reports the residual components

$$
F_r=\mathbf{F}_I\cdot\widehat{\mathbf{e}}_{I,r},
\qquad
F_\theta=\mathbf{F}_I\cdot\widehat{\mathbf{e}}_{I,\theta},
\qquad
F_n=\mathbf{F}_I\cdot\widehat{\mathbf{e}}_{I,n},
$$

their norms, energy fractions, and one-sided cyclic Fourier spectra. It also reports the projection along $\widehat{\mathbf{v}}_I$ because the reciprocal branch-equation no-go used that direction.

The supported time rules are:

```text
nearest
linear
```

The `nearest` rule matches the previous source-eligibility and reciprocal-checker sampling style. The `linear` rule uses the same local linear state interpolation pattern already used by the $A_0$ one-period runner and validator. Neither rule fits a coordinate.

The artifact boundary is:

```text
artifact_schema = a0-carrier-frame-residual-spectrum/v1
accepted_history_boundary = false
rerun_authority = diagnostic_only_not_corrected_rerun_authority
```

Optional reciprocal checker input is copied as context only. This diagnostic does not fit a branch coordinate, does not add an acceptance gate, and does not authorize corrected rerun.

## May 22, 2026 Execution

The first production diagnostic used the current corrected root-transport identity artifact and copied the reciprocal branch-equation no-go as context:

```text
node scripts/mass-map/a0-carrier-frame-residual-spectrum.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --reciprocal-check /tmp/a0-reciprocal-interlayer-branch-equation-checker.json --pretty --out /tmp/a0-carrier-frame-residual-spectrum.json
```

The row reports:

```text
status = carrier_frame_residual_geometry_computed
diagnostic_classification = insufficient_frame_regularization
total_norm = 313.09723758998507
nearest_sample_audit.max_nearest_distance = 0.006154417216020391
nearest_sample_audit.max_tie_count = 2
nearest_sample_audit.tied_sample_count = 2
```

The `insufficient_frame_regularization` classification is not caused by zero tangential speed. The frame regularity summary has `tangent_fallback_count = 0`. The blocker is nearest-sample ambiguity: one tie is the periodic endpoint, and one tie is an interior midpoint between two corrected carrier samples. Therefore the carrier-frame spectrum is a diagnostic localization, not a branch-coordinate declaration.

The component norms and energy fractions are:

| Component | Norm | Energy fraction |
| --- | ---: | ---: |
| `radial` | `241.635923651966` | `0.5956134954777973` |
| `tangential` | `170.65929181498063` | `0.2970991480086255` |
| `normal` | `102.55421348998827` | `0.10728735651357722` |

The mode-band summary for modes `4..7` is:

| Component | Mode-band energy fraction |
| --- | ---: |
| `total` | `0.6338261855420189` |
| `radial` | `0.7747806794076609` |
| `tangential` | `0.4512664995347311` |
| `normal` | `0.3568497310296845` |

The dominant carrier-frame modes are:

| Component | Dominant mode | Energy fraction |
| --- | ---: | ---: |
| `total` | `4` | `0.18790786399409293` |
| `radial` | `4` | `0.27619669177929623` |
| `tangential` | `3` | `0.24849045133620754` |
| `normal` | `3` | `0.36255324242362313` |

The velocity-direction projection used by the reciprocal branch-equation checker has norm `254.60774534976048`, but its dominant mode is the constant mode with energy fraction `0.25108924018865203`. This helps explain why the reciprocal `M<-I` velocity-projected equation found a real source direction but failed held-out residual: the remaining residual is not only a scalar amplitude along $\widehat{\mathbf{v}}_I$.

## Declared Linear Time-Alignment Run

The same diagnostic was then rerun with a declared linear carrier-frame time rule:

```text
node scripts/mass-map/a0-carrier-frame-residual-spectrum.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --reciprocal-check /tmp/a0-reciprocal-interlayer-branch-equation-checker.json --frame-time-rule linear --pretty --out /tmp/a0-carrier-frame-residual-spectrum-linear.json
```

This run reports:

```text
frame_time_rule = linear
diagnostic_classification = radial_deformation_dominated
total_norm = 313.097237589985
nearest_sample_audit.interpolation_status_counts.exact = 1
nearest_sample_audit.interpolation_status_counts.interpolated = 15
tangent_fallback_count = 0
```

The time-aligned component norms and energy fractions are:

| Component | Norm | Energy fraction |
| --- | ---: | ---: |
| `radial` | `238.9349667589204` | `0.5823726218116948` |
| `tangential` | `172.1142712479367` | `0.30218666299353525` |
| `normal` | `106.3796948631872` | `0.11544071519477007` |

The time-aligned mode-band summary for modes `4..7` is:

| Component | Mode-band energy fraction |
| --- | ---: |
| `total` | `0.6380418978651939` |
| `radial` | `0.7984257865887138` |
| `tangential` | `0.452600860526961` |
| `normal` | `0.3143659967420165` |

The dominant carrier-frame modes are:

| Component | Dominant mode | Energy fraction |
| --- | ---: | ---: |
| `total` | `5` | `0.1946851422781628` |
| `radial` | `4` | `0.30355413662961567` |
| `tangential` | `3` | `0.2511437225118863` |
| `normal` | `3` | `0.4288065979031494` |

The velocity-direction projection has norm `246.87477499321696` and dominant mode `2` with energy fraction `0.2487160543679712`. The time-aligned run therefore preserves the main conclusion while removing the nearest-sample ambiguity: the remaining `I` forcing is radial-dominated in the corrected carrier frame, not a pure reciprocal velocity-direction amplitude.

## Interpretation

The unresolved `I` forcing is primarily radial in the corrected `I` carrier frame, with substantial tangential content and smaller but nonzero normal content. Modes `4..7` remain the relevant high-mode packet in the carrier frame, especially radially. This points away from another reciprocal scalar-amplitude test and toward an explicitly time-aligned radial deformation or radial/tangential deformation coordinate if a future source artifact can declare it before fitting.

The linear diagnostic is still not a branch coordinate. It is a declared time-alignment rule for localization only. A rerun-admissible coordinate must pass a predeclared held-out residual test plus the existing root-transport, raw-row root-ledger, and one-period gates.

## Follow-On Coordinate Check

The follow-on [carrier-frame branch-coordinate checker](a0-carrier-frame-branch-coordinate-checker.md) tests the smallest source-side corrected-carrier deformation ladder suggested by this localization. Under the declared linear time rule, the one-scalar `radial_deformation` family

$$
\delta\rho_I\,\widehat{\mathbf e}_{I,r}
$$

passes the degrees-of-freedom guard but fails held-out residual with full relative residual `0.9987071165861717` and maximum held-out residual `1.0492394121933206`. The two-scalar `radial_phase_state` family lowers the full fit to `0.9290546746127268` but worsens maximum held-out residual to `1.5341171039338615`; the radial/tangential companion lowers full fit to `0.9079340640118748` but worsens holdout to `1.6498611276202226`.

Therefore radial localization is not itself a source-side corrected-carrier deformation coordinate. The immediate `delta_radius` and radial-rate branch-coordinate ladder is a no-go, not corrected-rerun authority.

## Boundary

This packet is diagnostic localization under the existing branch-chart revision contract. It does not create a new acceptance gate. It does not permit a corrected one-period rerun, because held-out residual, root-transport certification, raw-row root-ledger stability, source-side radial deformation declaration, and one-period closure still fail or remain pending.

Promotion decision: priority-only. Do not promote this packet into `content/markdown/aaa` until a time-aligned carrier-frame branch-coordinate row passes held-out residual, root-transport certification, raw-row root-ledger stability, and one-period closure.
