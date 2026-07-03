# Equation Closure Pass 2026-06-24 U

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral step-backed refinement hardening
- Promotion status: priority-only

## Scope

This pass hardens the `EQ-02` through `EQ-04` coframe extraction producer so refinement persistence is not accepted as a top-level convergence label alone. Each refinement step must now carry durable source evidence, stable support identity, and bounded residuals.

No equation scores change.

## Mathematical Correction

The retained invariant cell still starts from

$$
B_N\subset\Sigma_N,
\qquad
\mathcal K_{P_N}(B_N)\subset B_N.
$$

The previous refinement gate required a decreasing step/window sequence, increasing memory-depth sequence, support-set stability, scalar-residual convergence, and accepted controls. This pass adds the missing source-backed step layer. A refinement path now has to expose steps such as

$$
(h_j,N_j,S_{\mathrm{eq}},\epsilon^{\mathrm{inc}}_j,\epsilon^{\mathrm{supp}}_j,\epsilon^{\mathrm{scal}}_j),
\qquad
h_{j+1}<h_j,\quad N_{j+1}>N_j,
$$

with every step bound to the same retained support id and to a durable source row. The producer checks the inclusion residual, support residual, and scalar residual at each step against the declared tolerance. That makes the refinement claim inspectable instead of a single accepted status attached to an otherwise populated return-map shell.

## Executable Change

The coframe extraction producer now adds two separate checks:

- `refinement_persistence_step_sources`;
- `refinement_persistence_support_id_stability`.

The split is intentional. Step provenance and residual completeness can fail even when the support id is stable. Conversely, support identity can drift even when every step has a durable source. These are different blockers for a retained-branch proof.

Each step in `support.refinementPersistence.steps[]` must provide:

- accepted-like `status`;
- positive `h` or `stepSize`;
- positive integer `N` or `memoryDepth`;
- `supportId` equal to the source report support id;
- durable `sourcePath` or `source`;
- `inclusionResidual <= tolerance`;
- `supportResidual` or `hausdorffResidual <= tolerance`;
- `scalarResidual` or `maxResidual <= tolerance`.

The container must provide at least three steps with strictly decreasing `h` and strictly increasing `N`. The support-id stability check also requires the expected support id itself to be concrete.

The new refinement-step negative-control source report is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-refinement-step-negative-control.v1.json
```

It supplies accepted-looking support, row bindings, top-level refinement convergence, calibrated negative controls, connection, and residual rows, but leaves every refinement step without a source path.

## Current Output

The refinement-step negative-control fixture produces a blocked certificate:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=refinement_persistence_step_sources`;
- failed checks: `refinement_persistence_step_sources`.

The earlier negative-control fixtures retain their intended first blockers:

- empty source shell: `support_B_N_certified`;
- source-bound row shell: `row_binding_raw_labeled_rows_preserved_on_retained_history`;
- populated but unrefined shell: `refinement_persistence`;
- under-margin shell: `negative_control_window_length_margin_calibrated`.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

The pass makes future accepted certificates more auditable, but supplies no accepted invariant cell, retained row binding, or holonomy witness.

## Next Action

Wait for the source-contract split review before a major contract split. If continuing with small hardening while that review is pending, the next safe targets are a support-id-instability negative control and step-backed connection/holonomy transport evidence.
