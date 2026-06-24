# Equation Closure Pass 2026-06-23 Z

## Workstream Metadata

- Kind: `priority-detail`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Detail source: [Equation Mapping Detail](equation.md)
- Prior pass: [Equation Closure Pass 2026-06-23 Y](equation-closure-pass-2026-06-23-y.md)
- Assigned ID: `EQ-30`
- Status: `score-neutral executable carrier projection pass`
- Scope: priority-only; no reader-facing corpus promotion and no score-table edits
- Claim bucket: derivation/closure target

## Closure Result

This pass extends the shared finite-window statistical carrier evaluator to the scattering and form-factor row:

- [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs)
- [finite-window-statistical-carrier-eq30-elastic-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-toy.v1.json)

The new `EQ-30` projection treats cross-section and form-factor comparisons as readouts of the same $\mathcal C_{\mathrm{stat}}^{W,T}$ carrier used by probability, entropy, and resonance rows. It computes:

- prepared ensemble and incoming-flux availability;
- detected class measures and detector-refinement residuals;
- cross-section residuals from detected measure over $\Phi_{\mathrm{in}}T$;
- exposure-distribution covariance for form-factor samples;
- elastic-regime purity so elastic, inelastic, and lost classes cannot be mixed silently.

The current toy fixture deliberately has the desired numeric shape:

```text
status: toy_structure_only
scoreDecision: no_score_increase
nextBlocker: missing_accepted_W
eq30RowsComputed: true
eq30PreparedFluxPassed: true
eq30DetectorRefinementPassed: true
eq30CrossSectionPassed: true
eq30FormFactorCovariancePassed: true
eq30RegimePurityPassed: true
```

Those numeric passes are not score evidence because the shared carrier rows and the `EQ-30` observation rows are toy/pending-source rows. The run also reports `eq30RowsAccepted: false` with missing `EQ-30` rows:

- `Gamma_a`
- `Phi_in`
- `detected_class_measures`
- `cross_section_comparisons`
- `rho_exp`
- `form_factor_samples`
- `elastic_regime`

## Mathematical Object

The executable object is the elastic scattering residual vector

$$
\mathbf R_{30}^{ep}
=
\left(
\Delta_{\Phi},
\Delta_K,
\Delta_\sigma,
\Delta_F,
\Delta_{\mathrm{regime}}
\right),
$$

where the rate residual consumes

$$
\sigma_{a\to b}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{\Phi_{\mathrm{in}}T}
\int_{\Gamma_a}
\mathbf 1_b(\Phi_T(x))
K_{\mathrm{det}}(x)\,d\mu_a(x)
+
\mathcal R_\sigma,
$$

and the form-factor residual consumes the same exposure quotient rather than an independent fit. The scalar checks in this pass are guardrails: they show that the row can be computed from a shared carrier, not that a retained scattering packet has been accepted.

## Required Rows

The parent finite-window carrier still requires accepted, source-backed rows for:

- `W`
- `Phi_T`
- `mu_star_T`
- `Q`
- `K_det`
- `B`
- `S_retune`

For `EQ-30`, the row then also requires accepted, source-backed rows for:

- `Gamma_a`
- `Phi_in`
- `detected_class_measures`
- `cross_section_comparisons`
- `rho_exp`
- `form_factor_samples`
- `elastic_regime`

The first blocker is deliberately `missing_accepted_W`. A numerically clean elastic cross-section or form-factor toy packet does not substitute for the retained window that binds the branch ensemble, transition map, measure, detector kernel, exposure distribution, and no-hidden-retune witness.

## Score Disposition

| Row | Prior score | Pass Z score | Reason |
| --- | --- | --- | --- |
| `EQ-30` | `2` | `2` | The finite-window carrier projection is executable and the toy diagnostics pass, but the run remains toy-level and blocks first at `missing_accepted_W`. |

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promotion waits for one accepted elastic scattering packet whose parent $\mathcal C_{\mathrm{stat}}^{W,T}$ carrier and `EQ-30` projection rows are source-backed and no-hidden-retune compatible.

## Next Closure Step

Populate the first accepted finite-window carrier row `W`, then populate the `EQ-30` scattering rows on the same retained carrier. The minimum accepted bundle is one elastic scattering packet with $\Gamma_a$, $\Phi_{\mathrm{in}}$, $\Phi_T$, $\mu_a$, $K_{\mathrm{det}}$, $\rho_{\mathrm{exp}}^{\mathbb{A}\mathbb{A}\mathbb{A}}$, event-class measures, cross-section residuals, form-factor samples, and elastic-regime purity all source-backed and bound by the same no-hidden-retune witness.
