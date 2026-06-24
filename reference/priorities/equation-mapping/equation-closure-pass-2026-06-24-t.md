# Equation Closure Pass 2026-06-24 T

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral calibrated negative-control hardening
- Promotion status: priority-only

## Scope

This pass adds the calibrated-margin requirement implied by the retained-evidence review. A negative control is not evidence merely because it is marked `accepted` and has a positive violated residual. The violation must be large relative to an explicit accept band and above the declared arithmetic and truncation noise floors.

No equation scores change.

## Mathematical Correction

The source report now declares the scale on which witness acceptance is meaningful:

- `acceptBand`: the allowed acceptance band for the positive certificate;
- `arithmeticNoiseFloor`: the arithmetic-certification floor;
- `truncationNoiseFloor`: the finite-history or finite-window truncation floor;
- `negativeMarginFactor`: the required multiplier separating a deliberately violated control from the accept band.

The producer requires:

$$
\texttt{acceptBand}
\ge
\max(
\texttt{arithmeticNoiseFloor},
\texttt{truncationNoiseFloor},
\texttt{tolerance}
)
$$

and, for every required negative control,

$$
\texttt{violationMargin}
\ge
\texttt{negativeMarginFactor}\cdot\texttt{acceptBand}.
$$

The factor must be strictly greater than `1`; otherwise the negative-control residual is not separated from the acceptance band.

This keeps zero-looking support, split, and holonomy witnesses from becoming accepted by choosing an unrealistically narrow acceptance band or by reporting a violated control whose residual is numerically indistinguishable from the acceptance/noise scale.

## Executable Change

The coframe extraction producer now adds:

- `accept_band_calibrated`;
- `negative_control_window_length_margin_calibrated`;
- `negative_control_section_relocation_margin_calibrated`;
- `negative_control_transverse_displacement_margin_calibrated`;
- `negative_control_phase_permutation_margin_calibrated`;
- `negative_control_reciprocal_unextracted_coframe_margin_calibrated`;
- `negative_control_holonomy_retune_margin_calibrated`.

The new margin negative-control source report is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-margin-negative-control.v1.json
```

It supplies accepted-looking support, source-bound row bindings, refinement persistence, connection, residual, and negative-control rows. Its negative controls deliberately set `violationMargin=1e-7` while the declared `acceptBand=1e-6` and `negativeMarginFactor=10`, so the required margin is `1e-5`.

This source-internal fixture is run with `--no-retained-record`; its concrete fixture ids intentionally do not match the current retained-record attempt ids because matching those attempt ids would test the placeholder-id layer before the margin-calibration layer.

## Current Output

The margin negative-control fixture produces a blocked certificate:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=negative_control_window_length_margin_calibrated`;
- failed checks: every required `negative_control_*_margin_calibrated` check.

The earlier negative-control fixtures retain their intended first blockers:

- empty source shell: `support_B_N_certified`;
- source-bound row shell: `row_binding_raw_labeled_rows_preserved_on_retained_history`;
- populated but unrefined shell: `refinement_persistence`.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

The pass adds a scale discipline for future accepted certificates, but supplies no accepted invariant cell, retained row binding, or holonomy witness.

## Next Action

Wait for the source-contract split review before performing a major contract split. If continuing with small hardenings before that response, the next safe target is step-backed refinement evidence: require each refinement step to carry a durable source reference, stable support id, inclusion residual, support residual, and scalar residual.
