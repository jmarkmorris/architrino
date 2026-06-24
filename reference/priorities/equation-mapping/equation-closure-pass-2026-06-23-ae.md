# Equation Closure Pass 2026-06-23 AE

## Scope

- `EQ-14` Born-current continuity as a record-current projection from the shared finite-window statistical carrier.
- `EQ-31` first-exit corridor additivity, null-separatrix epsilon sweep, and refinement-cocycle sequence hardening.
- Conservative score disposition for the statistical carrier family after the external geometry/topology review.

## Result

This pass extends [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs) without changing equation scores. The runner now has score-neutral diagnostics for three finite-window statistical projections:

| Row | Executable projection | Toy or attempt result | Score effect |
| --- | --- | --- | --- |
| `EQ-14` | Same-measure record-current projection, finite-difference continuity residual, density-reference residual, and current-reference residual. | [finite-window-statistical-carrier-eq14-born-current-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq14-born-current-toy.v1.json) reports `toy_structure_only`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_W`. | No score change; `EQ-14` remains `3`. |
| `EQ-30` | Prepared flux, detector refinement, cross-section normalization, form-factor covariance, and elastic-regime purity. | Existing elastic toy remains `toy_structure_only`, first blocker `missing_accepted_W`. | No score change; `EQ-30` remains `2`. |
| `EQ-31` | First-exit corridor semantics, pre-detector first-exit additivity, null-separatrix mass, epsilon-sequence monotonicity, restriction-row cocycle defect, and refinement-defect sequence. | [finite-window-statistical-carrier-eq31-null-separatrix-refinement-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-null-separatrix-refinement-toy.v1.json) reports `toy_structure_only`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_W`. | No score change; `EQ-31` remains `2`. |

## `EQ-14` Record-Current Projection

The `EQ-14` projection checks that density and current are not fitted as independent probability-fluid rows. A packet must bind both to the same finite-window measure and deterministic flow:

```text
recordCurrentProjection.densityMeasureId == carrier.finiteMeasure.id
recordCurrentProjection.currentMeasureId == carrier.finiteMeasure.id
recordCurrentProjection.densityFlowId == carrier.transitionMap.id
recordCurrentProjection.currentFlowId == carrier.transitionMap.id
```

Then each record-current sample computes

$$
\Delta_{\rho J}
=
\left|
\frac{\rho(t+\Delta t)-\rho(t)}{\Delta t}
+\nabla\cdot\mathbf J
\right|
$$

and optional comparison residuals against a reference observer wave chart:

$$
\Delta_\rho=\lvert \rho_{\mathrm{rec}}-\rho_{\mathrm{ref}}\rvert,
\qquad
\Delta_J=\lvert J_{\mathrm{rec}}-J_{\mathrm{ref}}\rvert.
$$

The toy fixture has the intended numeric shape:

```text
status: toy_structure_only
scoreDecision: no_score_increase
eq14RowsComputed: true
eq14SameMeasureFlowPassed: true
eq14ContinuityPassed: true
eq14DensityReferencePassed: true
eq14CurrentReferencePassed: true
nextBlocker: missing_accepted_W
```

This is not score evidence. The score-moving row must replace toy carrier rows with accepted source-backed rows for $W$, $\Phi_T$, $\mu_{*,T}$, $\mathcal Q$, $K_{\mathrm{det}}$, $\mathcal B$, $\mathcal S_{\mathrm{retune}}$, $\Theta_{\rho J}$, and the record-current samples.

## `EQ-31` Null-Separatrix And Refinement Sweep

The runner now rejects detector-side class measures as first-exit evidence unless the input supplies pre-detector first-exit preimage rows. The additivity row is evaluated against corridor measures before detector readout:

```text
corridorSemantics.firstExitPreimageRows[].kind == "corridor_preimage"
corridorSemantics.firstExitPreimageRows[].measureStage == "pre_detector_escape"
```

The null-separatrix diagnostic can be supplied as a scalar, a measure-row estimate, or an epsilon sequence. The new toy supplies both measure rows and an epsilon sequence, with the current estimate

$$
\mu_{*,T}\!\left(N_{0.01}(\partial\mathcal B)\right)=0.0004
$$

below tolerance and decreasing across the declared epsilon sequence. The refinement diagnostic can be supplied as a scalar, restriction rows, or a defect sequence. The new toy computes the restriction-row cocycle defect as the sum of absolute parent/child pushforward differences:

$$
\mathcal R_{\mathrm{coarse}}=0.00035.
$$

The run reports:

```text
status: toy_structure_only
scoreDecision: no_score_increase
firstExitCorridorsDeclared: true
firstExitAdditivityPassed: true
nullSeparatrixPassed: true
refinementCompatibilityPassed: true
nextBlocker: missing_accepted_W
```

This is the desired conservative posture. The toy demonstrates the diagnostic shape; it does not prove the retained path-history measure exists, is tight, has null separatrix, or glues under refinement.

## Score Disposition

No score changes.

- `EQ-14` remains `3`: the record-current residual is executable on a toy packet, but no accepted finite-window measurement or branch-flow carrier is populated.
- `EQ-30` remains `2`: the elastic scattering projection remains toy evidence.
- `EQ-31` remains `2`: the null-separatrix and refinement sweep are executable on a toy packet, but no accepted metastable branch window supplies the carrier.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promote only after one retained finite-window carrier supplies accepted, source-backed rows and the same runner returns accepted statistics with the relevant score-moving residuals below tolerance.
