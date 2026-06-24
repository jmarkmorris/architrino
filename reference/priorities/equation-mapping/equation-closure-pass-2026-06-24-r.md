# Equation Closure Pass 2026-06-24 R

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral source-shell negative-control fixture
- Promotion status: priority-only

## Scope

This pass adds a focused negative-control source report for the `EQ-02` through `EQ-04` coframe extraction producer.

No equation scores change.

## Executable Change

The new negative-control source report is:

```text
scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-shell-negative-control.v1.json
```

It is deliberately accepted-looking:

- source status is `accepted`;
- support status is `accepted`;
- row bindings are `accepted`;
- connection and residual rows are accepted-looking;
- concrete ids avoid the known attempt/placeholder filters.

But it leaves the mathematical content of the return-map objects empty:

- `B_N` has no interval hull, coordinates, box, radius, width, or measure lower bound;
- `Sigma_N` has no section rule or positive transversality margin;
- `P_N` has no return-time or map-norm bound;
- `K_P_N` has no inclusion residual.

The producer is run with `--no-retained-record` for this fixture so the test isolates source-report internals rather than failing first on the current attempt carrier ids.

## Current Output

The negative-control fixture produces a blocked certificate:

- `status=blocked`;
- `producer.scoreDecision=no_score_increase`;
- `producer.nextBlocker=support_B_N_certified`;
- failed checks: `support_B_N_certified`, `support_Sigma_N_certified`, `support_P_N_certified`, and `support_K_P_N_certified`.

The fixture intentionally still carries accepted-looking shell fields such as `support.status=accepted`; the authoritative disposition is the producer-level blocked status and its failed substantive support checks.

This confirms that accepted-looking source shells cannot pass merely by naming source objects. The producer now requires substantive return-map geometry before it can emit an accepted coframe extraction certificate.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

## Next Action

Keep the Kolmogorov-style source-report review as the next outside mathematical attack. The remaining question is not whether the producer blocks empty shells; it does. The question is whether the substantive fields required for `B_N`, `Sigma_N`, `P_N`, and `K_P_N` are the right mathematical fields for an accepted positive-width invariant-cell/coframe source report.
