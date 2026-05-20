# Gap-Opening Feasibility Diagnostic Report

## Scope

This report records the first executable diagnostic for the null-coordinate
separation-direction lemma.

It is not a live candidate, not a same-packet pre-ledger update, and not a
branch-chart authorization. The input matrix is a diagnostic endpoint-shear
surface built from the residual parent-complement collars of the rejected
cosine packet.

Artifacts:

- `gap_opening_feasibility_input.seed_cosine_diagnostic_demo.v0.json`
- `gap_opening_feasibility_result.seed_cosine_diagnostic_demo.v0.json`
- `../../../../../scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs`

## Executed Command

```bash
node scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs --input reference/priorities/proof-programs/breather-proof/certificate/gap_opening_feasibility_input.seed_cosine_diagnostic_demo.v0.json --out reference/priorities/proof-programs/breather-proof/certificate/gap_opening_feasibility_result.seed_cosine_diagnostic_demo.v0.json --pretty
```

## Result

The scanner returned:

| Field | Value |
| --- | --- |
| `status` | `feasible` |
| `theory_success_marker` | `strict_null_coordinate_gap_opening_tangent_witness` |
| `method` | `nullspace_perceptron_strict_witness` |
| `claim_level` | `strict tangent-space gap-opening witness for declared finite matrix` |
| `branch_chart_authorized` | `false` |
| `preledger_pass` | `false` |
| `updates_live_ledger` | `false` |
| `nullity` | `4` |
| `tolerance` | `1e-9` |
| `xi_infinity_norm` | `1` |
| `max_structural_residual` | `0` |
| `min_gap_value_after_required_margin` | `1` |

The emitted witness is

```json
{
  "b_T": 0,
  "h_w_A1": 1,
  "h_w_A2": 1,
  "h_u_A3": 1,
  "h_u_A4": 1
}
```

For the declared finite matrix this satisfies
$$
B\xi=0,
\qquad
A\xi\ge \mathbf{1},
\qquad
\|\xi\|_\infty=1.
$$

## Mathematical Meaning

The useful advance is not the toy diagonal matrix by itself. The advance is
that the parent-complement obstruction now has an executable tangent-space
success marker:
$$
\exists\xi\in\ker B
\quad
\text{such that}
\quad
A\xi>0.
$$
When a fresh fold-collocation packet supplies its true structural Jacobian
$B=DC(\mathbf a_0)$ and signed gap derivative matrix $A$, the same scanner can
fail closed or emit an explicit candidate-history perturbation direction. This
turns $H_{\mathrm{pc}}$ into a constructive search primitive rather than a
passive penalty or a new acceptance gate.

## Limitations

- The matrix is diagnostic only. Its endpoint-shear columns are not yet derived
  from a live fold-adapted collocation basis.
- `rank_B_certified=false` and `B_xi_residual_certified_zero=false`; the current
  run verifies floating residuals for the declared matrix only.
- The result does not edit `causal_ledger.json`, does not mark the current
  cosine packet accepted, and does not authorize `branch_chart.json`.
- A real candidate packet must supply interval-bounded entries for $A$ and $B$,
  then rerun the null-coordinate pre-ledger on the same frozen identity.

## Capture Decision

Priority-only as an executable success marker. The reader-facing AAA corpus
already contains the safe theorem-level implication: a useful fold-adapted
fractional basis must admit a tangent direction that opens the residual
null-coordinate gaps while staying on the structural constraint manifold. The
diagnostic matrix, command output, and finite artifact names remain operational
priority material.
