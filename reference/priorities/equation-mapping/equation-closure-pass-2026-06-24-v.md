# Equation Closure Pass 2026-06-24 V

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral support-id instability negative control
- Promotion status: priority-only

## Scope

This pass adds an isolated negative control for the support-id stability coordinate introduced in pass U. It does not add a new acceptance rule. It verifies that the existing step-backed refinement contract fails when refinement steps drift to a different retained support id, even though the steps are otherwise source-backed and residual-bounded.

No equation scores change.

## Mathematical Correction

Step-backed refinement evidence must prove persistence of the same retained support, not merely persistence of some nearby accepted-looking support. The refinement path is therefore required to keep a fixed support id:

$$
S_j = S_{\mathrm{eq}}
\quad\text{for every refinement step }j.
$$

If the sequence has decreasing step size, increasing memory depth, durable per-step sources, and bounded residuals, but its step records bind to $S'_j\neq S_{\mathrm{eq}}$, then it is evidence for a different support path. It cannot certify the retained invariant cell used by the `EQ-02` through `EQ-04` coframe rows.

This is a support witness failure, not a row-binding failure and not a connection/holonomy failure. The latter remains the next major mathematical question for the pending source-contract split review.

## Executable Artifact

The new source-internal negative-control fixture is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-refinement-support-id-negative-control.v1.json
```

It supplies accepted-looking support, row bindings, top-level refinement convergence, calibrated negative controls, connection, residual rows, and valid per-step source references. Each refinement step has bounded inclusion, support, and scalar residuals. The only deliberate defect is that the refinement steps use:

```text
S_eq_retained_domain_refinement_support_id_drift_0001
```

instead of the source report support id:

```text
S_eq_retained_domain_refinement_support_id_negative_0001
```

## Current Output

The fixture produces a blocked certificate:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=refinement_persistence_support_id_stability`;
- failed checks: `refinement_persistence_support_id_stability`.

The corresponding step-source completeness check passes in this fixture, so the producer now distinguishes two refinement defects:

- missing or incomplete per-step evidence: `refinement_persistence_step_sources`;
- retained support drift across the refinement path: `refinement_persistence_support_id_stability`.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

The pass adds a cleaner falsifier for a future accepted invariant-cell certificate, but it supplies no accepted retained support, retained row binding, or holonomy witness.

## Next Action

Do not add step-backed connection or holonomy transport evidence until the pending source-contract split review is integrated. That review should decide whether the next executable object remains one combined invariant-cell/coframe source report or splits into:

1. retained-domain support certificate;
2. wake-return coframe extraction certificate over that support;
3. connection/holonomy transport witness tying the row sections together without hidden retune.
