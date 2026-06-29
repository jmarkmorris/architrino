# Equation Closure Pass 2026-06-23 AE

## Scope

- `EQ-14` Born-current continuity as a record-current projection from the shared finite-window statistical carrier.
- `EQ-25` finite-window thermodynamic record as the thermodynamic wrapper around the shared carrier.
- `EQ-31` first-exit corridor additivity, null-separatrix epsilon sweep, and refinement-cocycle sequence hardening.
- Conservative score disposition for the statistical carrier family after the external geometry/topology review.

## Result

This pass extends [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs) and records the adjacent `EQ-25` thermodynamic wrapper without changing equation scores. The finite-window runners now have score-neutral diagnostics for four projections:

| Row | Executable projection | Toy or attempt result | Score effect |
| --- | --- | --- | --- |
| `EQ-14` | Same-measure record-current projection, finite-difference continuity residual, density-reference residual, and current-reference residual. | [finite-window-statistical-carrier-eq14-born-current-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq14-born-current-toy.v1.json) reports `toy_structure_only`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_W`. | No score change; `EQ-14` remains `3`. |
| `EQ-25` | Deterministic pushforward, collision/projection, entropy balance, thermalization depth, fluctuation, source provenance, and no-hidden-retune residual. | [eq25-thermodynamic-record-attempt.v1.json](../../../scripts/equation-mapping/eq25-thermodynamic-record-attempt.v1.json) reports `blocked_missing_rows`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_theta_therm`. | No score change; `EQ-25` remains blocked on accepted thermodynamic carrier rows. |
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

The compact summary now reports the retained-window blocker as a concrete row detail:

```text
nextBlockerDetails.id: W
nextBlockerDetails.status: toy
nextBlockerDetails.reason: row_not_accepted
nextBlockerDetails.rowId: W_eq14_record_current_toy
nextBlockerDetails.sourcePath: null
nextBlockerDetails.sourceReferenceExists: false
```

## `EQ-25` Thermodynamic Wrapper

The `EQ-25` runner [eq25-thermodynamic-record-residual.mjs](../../../scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs) wraps the finite-window carrier in a thermodynamic record. Its immediate row-level blocker is not `W` directly, but the parent carrier row `theta_therm` that must bind the state space, coarse graining, measure, deterministic pushforward, coarse projection, collision operator, entropy balance, thermalization depth, fluctuation, event ledger, shared Noether sea row, source provenance, and no-hidden-retune witness on one carrier.

The current attempt reports:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_theta_therm
nextBlockerDetails.id: theta_therm
nextBlockerDetails.status: attempt
nextBlockerDetails.reason: row_not_accepted
nextBlockerDetails.carrierId: theta_therm_CMB_attempt_0001
nextBlockerDetails.sourcePath: reference/priorities/equation-mapping/eq-06-24-25-continuum-medium-thermo-packet.md
nextBlockerDetails.sourceReferenceExists: true
```

The source file resolves, but the row status remains `attempt`; therefore the numeric thermodynamic passes and `4/4` negative-control passes are not score evidence. The populated command remains fail-closed:

```sh
node scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs \
  --summary --pretty --require-populated
```

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

The refined toy reports the same first blocker with source-bearing detail:

```text
nextBlockerDetails.id: W
nextBlockerDetails.status: toy
nextBlockerDetails.reason: row_not_accepted
nextBlockerDetails.rowId: W_eq31_null_refinement_toy
nextBlockerDetails.sourcePath: null
nextBlockerDetails.sourceReferenceExists: false
```

## First Accepted Evidence Object

The smallest accepted evidence object for this bucket is not another toy fixture. It is one retained finite-window row $W$ with a durable source reference, accepted status, concrete identity, and a source-backed relation to the same $\Phi_T$, $\mu_{*,T}$, $\mathcal Q$, $K_{\mathrm{det}}$, $\mathcal B$, and $\mathcal S_{\mathrm{retune}}$ consumed by the runner.

The exact shared statistical-carrier first blocker is `missing_accepted_W`. The current compact summaries for `EQ-14`, `EQ-30`, and `EQ-31` all fail on the same row:

```text
EQ-14: W_eq14_record_current_toy, status toy, sourcePath null
EQ-30: W_eq30_elastic_toy, status toy, sourcePath null
EQ-31: W_eq31_null_refinement_toy, status toy, sourcePath null
```

`EQ-25` wraps that lane through `missing_accepted_theta_therm`; it still needs the same finite-window row family inside the thermodynamic carrier before score review.

The required source-backed fields for a score-eligible carrier are:

- accepted retained-window row $W$ with a concrete id and durable `sourcePath` or `source`;
- accepted transition map $\Phi_T$ and finite measure $\mu_{*,T}$ for the same window;
- accepted coarse-graining $\mathcal Q$, detector kernel $K_{\mathrm{det}}$, and outcome partition $\mathcal B$;
- accepted no-hidden-retune witness $\mathcal S_{\mathrm{retune}}$ with residual below tolerance;
- row-specific accepted projection rows: $\Theta_{\rho J}$ and record-current samples for `EQ-14`, scattering/form-factor rows for `EQ-30`, and accepted first-exit corridor family $C$ for `EQ-31`.

## Bucket D Worker Audit 2026-06-26 UTC

Re-running the current Bucket D fixture set did not produce an accepted retained carrier row. The `EQ-14`, `EQ-30`, refined `EQ-31`, and legacy `EQ-31` finite-window inputs still return `toy_structure_only`, `scoreDecision: no_score_increase`, and first blocker `missing_accepted_W`; their `--require-accepted` runs exit nonzero as intended.

No existing durable source can be safely wired as `W` in this pass. The current finite-window statistical fixtures are toy fixtures, and the durable packets that describe the route are coordination or proof-target records rather than retained finite-window evidence. Accepted rows found in other equation-mapping fixtures belong to other lanes and do not supply the shared statistical carrier consumed here.

The first accepted evidence object is therefore constrained to one source-backed retained statistical carrier row family:

| Field | Required accepted content |
| --- | --- |
| `W` | Concrete retained finite window id, accepted status, durable source reference, and declared window kind. |
| `Phi_T` | Same-window deterministic transition map accepted from the same source-backed carrier family. |
| `mu_star_T` | Finite measure on the retained window, accepted status, durable source reference, total mass, and invariance residual below tolerance. |
| `Q` | Accepted coarse-graining tied to the same window and measure. |
| `K_det` | Accepted detector or record kernel reused by every projection in the fixture. |
| `B` | Accepted outcome partition with concrete classes for the same retained window. |
| `S_retune` | Accepted no-hidden-retune witness with durable source reference and residual below tolerance. |
| Row-specific projection rows | Accepted `EQ-14` record-current projection and samples, accepted `EQ-30` scattering/form-factor rows, or accepted `EQ-31` corridor family, depending on which equation consumes the carrier first. |

`EQ-25` remains coupled but not identical to this blocker. The thermodynamic runner first reports `missing_accepted_theta_therm` because it validates the wrapper carrier that must contain the same finite-window family plus state-space, coarse-graining, measure, pushforward, collision/projection, entropy-balance, thermalization-depth, fluctuation, event-ledger, shared Noether sea, source-provenance, and no-hidden-retune rows on one carrier.

Fail-closed negative controls remain: toy or attempt status, missing or non-durable source references, placeholder identities, split density/current measure or flow for `EQ-14`, positive retained-measure separatrix mass for `EQ-31`, refinement-cocycle failure, corridor measure exceeding window measure, and hidden retune residual above tolerance.

What would count as score-review-eligible retained evidence: the same runner returns `accepted_retained_statistical_carrier` on a retained carrier whose source-backed rows satisfy the relevant numeric residuals, with no row populated from toy, placeholder, generated-only, or pending-source material.

## Score Disposition

No score changes.

- `EQ-14` remains `3`: the record-current residual is executable on a toy packet, but no accepted finite-window measurement or branch-flow carrier is populated.
- `EQ-25` remains blocked: the thermodynamic residual and negative controls are executable, but `theta_therm` and every required thermodynamic row are still attempt-level.
- `EQ-30` remains `2`: the elastic scattering projection remains toy evidence.
- `EQ-31` remains `2`: the null-separatrix and refinement sweep are executable on a toy packet, but no accepted metastable branch window supplies the carrier.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promote only after one retained finite-window carrier supplies accepted, source-backed rows and the same runner returns accepted statistics with the relevant score-moving residuals below tolerance.
