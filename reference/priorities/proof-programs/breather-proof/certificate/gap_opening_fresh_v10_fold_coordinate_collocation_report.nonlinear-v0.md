# Fresh v10 Fold-Coordinate Collocation Tangent-Matrix Screen

## Scope

This sidecar instantiates the first nonlinear fold-coordinate collocation
tangent-matrix screen for the fresh v10 proof-program route. It is
priority-only. It does not update a live causal ledger, does not pass the
null-coordinate pre-ledger, and does not authorize branch-chart construction.

Generated artifacts:

- `gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`
- `gap_opening_fresh_v10_fold_coordinate_collocation_result.nonlinear-v0.json`
- [`fresh-v10-nonlinear-fold-coordinate-collocation-matrix-builder.mjs`](../../../../../scripts/proof-programs/fresh-v10-nonlinear-fold-coordinate-collocation-matrix-builder.mjs)

The scanner result is produced by
[`null-coordinate-gap-opening-scanner.mjs`](../../../../../scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs).

## Result

| Field | Value |
| --- | --- |
| Scanner status | `feasible` |
| Success marker | `strict_null_coordinate_gap_opening_tangent_witness` |
| Structural rows | 3 |
| Strict gap rows | 10 |
| Fold-coordinate columns present | `true` |
| Uses receiver-cover ownership as proof input | `false` |
| `B\xi=0` verified within tolerance | `true` |
| $\|\xi\|_\infty$ | 1 |
| Minimum strict-gap value after required margin | `0.484518823372` |
| `preledger_pass` | `false` |
| `updates_live_ledger` | `false` |
| `branch_chart_authorized` | `false` |

The witness is
$$
\xi=
(-1,-1,-1,0.5,0.5,0.5,0.5)
$$
on the ordered variables
`h_A0s`, `h_A1s`, `h_A2s`, `fc_sigma_source_lower`,
`fc_rho_receiver_lower`, `fc_sigma_source_upper`, and
`fc_rho_receiver_upper`.

The three fold-coordinate structural rows are homogeneous pairing rows for
the lower source/receiver opening, upper source/receiver opening, and mirrored
lower/upper opening. The scanner therefore verifies a nonzero declared
structural tangent surface rather than the older zero-constraint shifted-basis
matrix.

## One-Leaf Boundary Screen

The same input imports the three smallest higher-fold one-leaf rows as
screen-focus data:

| Row | Required opening | Witness opening margin |
| --- | ---: | ---: |
| `R_w_A04_A03` | `0.000026691996524` | `0.999973308003476` |
| `R_u_A10_A09` | `0.000026691996524` | `0.999973308003476` |
| `R_u_A07_A06` | `0.00024618430271` | `0.99975381569729` |

The minimum one-leaf boundary-opening margin is therefore
`0.99975381569729` in this bounded tangent screen.

This is a triage success, not a certificate pass. The one-leaf rows still lack
same-packet preservation of source monotonicity, receiver monotonicity, memory
margins, endpoint ownership/no-double-counting, simple-root branch-reuse
exclusion, and non-owned complement closure.

## Guard Facts

The screen records these fail-closed guard facts from the higher-fold branch:

- The source-cover defect atlas still has 42 regular parent rows, 3,024
  structural terminal misses, 0 receiver-interior misses, and 0 consumed rows.
- The boundary ownership audit proves 42 / 42 complete terminal receiver
  partitions but 0 rows satisfying the full ownership pass rule.
- The fold-layer burden atlas still has 112 rows grouped under 12 separator
  layers, with 0 accepted fold-layer rows.
- The `lambda=0.305` replay has proof-grade 12-root topology but still leaves
  162 rows `split_required`, 3,012 receiver-cover missing cells, 0 accepted
  fold-layer rows, and no branch-chart authorization.

## Closure Burden

The next proof object is not another ownership audit over the same receiver
partition. It is a solved same-packet nonlinear fold-coordinate collocation
candidate, or an equivalent proof-grade candidate-change theorem, that carries
the positive boundary openings through monotonicity, memory, endpoint ownership,
branch-reuse exclusion, non-owned complement closure, periodic
endpoint/complement ownership, and same-packet fold-layer certification.
