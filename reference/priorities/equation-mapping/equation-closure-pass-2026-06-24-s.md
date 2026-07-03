# Equation Closure Pass 2026-06-24 S

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral source-bound row and refinement-persistence hardening
- Promotion status: priority-only

## Scope

This pass integrates two retained-evidence corrections. First, a populated return-map shell is still not retained-branch evidence unless it persists under refinement and deliberately violated controls. Second, row bindings are not evidence when they are bare status labels; they must be source-bound rows on the same retained row set, common carrier, domain, and support. The pass strengthens the `EQ-02` through `EQ-04` coframe extraction producer without changing scores.

## Mathematical Correction

The support certificate still starts with a positive-width return-map object:

$$
B_N\subset\Sigma_N,
\qquad
\mu_{\perp}(B_N)>0,
\qquad
\mathcal K_{P_N}(B_N)\subset B_N.
$$

The new hardening adds the next obligation: this object must remain stable under refinement. A populated $B_N,\Sigma_N,P_N,\mathcal K_{P_N}$ tuple is not enough if it appears only at one history order or one numerical window. The source report must now carry:

- a decreasing step/window sequence such as `hSequence`;
- an increasing memory-depth sequence such as `NSequence`;
- accepted support-set stability with bounded residual;
- accepted scalar-residual convergence with bounded residual;
- accepted refinement controls for window length, section placement, transverse displacement, and phase permutation.

Negative controls must also report a concrete violated margin. A bare `accepted` label is no longer enough: the producer requires an `expectedFailure` plus a positive `violationMargin` or equivalent residual gap.

## Row-Binding Correction

The retained branch cannot be accepted by attaching fitted rows to a later valid-looking support. Each row binding must now be a source-bound object with:

- accepted status;
- concrete `rowId`;
- `retainedRowSetId=S_eq`;
- matching `commonCarrierId`;
- matching `domainId`;
- matching `supportId`;
- durable `sourcePath` or `source`.

This turns a bare row label into a row coordinate on the same retained support. It also keeps the support witness $W_{\mathrm{supp}}$ meaningful before the holonomy witness $W_{\mathrm{hol}}$ is evaluated.

## Executable Change

The producer [produce-eq02-04-coframe-extraction-certificate.mjs](../../../scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs) now rejects:

- bare `accepted` row-binding strings;
- source-bound rows whose retained row set, common carrier, domain, or support does not match the source report;
- accepted-looking negative controls with no violated margin;
- accepted-looking refinement objects with no three-point refinement path;
- populated return-map shells with no support-set stability or scalar-residual convergence;
- source reports with no `window_length` negative control.

The new row-binding negative-control source report is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-row-binding-negative-control.v1.json
```

It deliberately supplies accepted-looking support, refinement, connection, residual, and negative-control fields, but leaves row bindings as bare `accepted` strings.

The new refinement negative-control source report is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-refinement-negative-control.v1.json
```

It deliberately supplies accepted-looking `B_N`, `Sigma_N`, `P_N`, and `K_P_N` fields, but leaves refinement persistence as a declared one-point shell.

These source-internal negative controls are run with `--no-retained-record`; their concrete fixture ids intentionally do not match the current retained-record attempt ids because matching those attempt ids would test the placeholder-id layer before the source-report internals.

## Current Output

The row-binding negative-control fixture produces a blocked certificate:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=row_binding_raw_labeled_rows_preserved_on_retained_history`;
- failed checks: every required `row_binding_*` check.

The refinement negative-control fixture produces a blocked certificate:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=refinement_persistence`;
- failed checks: `refinement_persistence`.

The earlier source-shell negative control still blocks at `support_B_N_certified`, confirming that the new refinement gate did not obscure the empty-return-map failure mode.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

The pass raises the accepted-source burden, but it supplies no accepted invariant cell, retained row binding, or holonomy witness.

## Next Action

The next implementation step should split the source contract into two explicit layers if the current single source object becomes too dense:

1. retained-domain support certificate: $B_N,\Sigma_N,P_N,\mathcal K_{P_N}$ plus refinement persistence and negative-control margins;
2. coframe extraction certificate: gamma-free extracted coframe, connection, torsion, phase holonomy, support transport, and holonomy transport over that retained support.

The next review packet should attack this split only after the current producer has made the blocker visible in executable output, which this pass now does.
