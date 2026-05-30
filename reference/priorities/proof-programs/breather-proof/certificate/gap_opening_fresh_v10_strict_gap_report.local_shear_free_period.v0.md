# Fresh v10 Strict-Gap Local-Shear Report

## Scope

This packet is a priority-only diagnostic for the selected
candidate-repair / strict-gap route of `fresh-same-packet-fold-shear-seed-v0`.

It imports the 10 proof-interval-v10 parent-complement collars and evaluates
them against the existing half-period-antisymmetric $C^1$ shear basis on
$A_0,A_1,A_2$, now allowing a period tangent column $b_T$. It is not a repaired
candidate, not a full structural Jacobian, not an interval certificate, not a
pre-ledger pass, and not branch-chart authorization.

Artifacts:

- `gap_opening_fresh_v10_strict_gap_input.local_shear_free_period.v0.json`
- `gap_opening_fresh_v10_strict_gap_result.local_shear_free_period.v0.json`
- `../../../../../scripts/proof-programs/fresh-v10-strict-gap-matrix-builder.mjs`
- `../../../../../scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs`

## Executed Commands

```bash
node scripts/proof-programs/fresh-v10-strict-gap-matrix-builder.mjs --pretty
node scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs --input reference/priorities/proof-programs/breather-proof/certificate/gap_opening_fresh_v10_strict_gap_input.local_shear_free_period.v0.json --out reference/priorities/proof-programs/breather-proof/certificate/gap_opening_fresh_v10_strict_gap_result.local_shear_free_period.v0.json --pretty
```

## Matrix

For each collar $C_m=R_m\times S_m$, the builder chooses the lower current
deficit orientation:
$$
\delta_{S<R,m}=\inf_R z_\ell-\sup_S z_\ell,
\qquad
\delta_{R<S,m}=\inf_S z_\ell-\sup_R z_\ell,
$$
where
$$
z_w(\theta)=T_{\mathrm{cyc}}\theta+X(\theta),
\qquad
z_u(\theta)=T_{\mathrm{cyc}}\theta-X(\theta).
$$
The tangent variables are
$$
\xi=(b_T,h_{A0},h_{A1},h_{A2}),
$$
with the same first-half basis
$$
\psi_j(\theta)=
\sin^2\!\left(\pi\frac{\theta-L_j}{R_j-L_j}\right)
$$
on $A_j=[L_j,R_j]$ and zero outside, extended by
$$
H(\theta+1/2)=-H(\theta).
$$

This free-period diagnostic uses no structural rows:
$$
B=\varnothing.
$$
Thus it tests whether the existing local shear basis plus a period tangent can
open the selected v10 strict-gap functionals. It does not prove that a solved
candidate lies on this tangent direction.

## Result

The scanner returned:

| Field | Value |
| --- | --- |
| `status` | `feasible` |
| `theory_success_marker` | `strict_null_coordinate_gap_opening_tangent_witness` |
| `method` | `nullspace_perceptron_strict_witness` |
| `nullity` | `4` |
| `xi_infinity_norm` | `1` |
| `max_structural_residual` | `0` |
| `min_gap_value_after_required_margin` | `0.115066037632` |
| `preledger_pass` | `false` |
| `updates_live_ledger` | `false` |
| `branch_chart_authorized` | `false` |

The emitted witness is

```json
{
  "b_T": -0.176804284695,
  "h_A0": -0.998248451171,
  "h_A1": -1,
  "h_A2": -0.558213117762
}
```

For the declared finite matrix,
$$
A\xi-\kappa\ge0.115066037632\,\mathbf{1},
\qquad
\|\xi\|_\infty=1.
$$

## Collar Margins

| Collar | Orientation | Required margin | Value after margin |
| --- | --- | ---: | ---: |
| `C_w_A1_A0_left_v10_1` | `source_below_receiver` | 0.0305306251747979 | 0.371306703032 |
| `C_w_A2_A0_left_v10_2` | `receiver_below_source` | 0.097129464401903 | 0.140113336348 |
| `C_w_A2_A0_right_v10_3` | `source_below_receiver` | 0.0616068926719289 | 0.693852748769 |
| `C_w_A2_A1_left_v10_4` | `receiver_below_source` | 0.030206375980675 | 0.380758286166 |
| `C_w_A2_A1_right_v10_5` | `source_below_receiver` | 0.0651784197251379 | 0.57402524062 |
| `C_u_A3_A2_left_v10_6` | `source_below_receiver` | 0.0454297538282589 | 0.356407574379 |
| `C_u_A4_A2_left_v10_7` | `source_below_receiver` | 0.25055598013026 | 0.115066037632 |
| `C_u_A4_A2_right_v10_8` | `source_below_receiver` | 0.049789505024517 | 0.298695357683 |
| `C_u_A4_A3_left_v10_9` | `receiver_below_source` | 0.0266345725630224 | 0.358523506914 |
| `C_u_A4_A3_right_v10_10` | `source_below_receiver` | 0.038461903424265 | 0.193766978188 |

The controlling collar is `C_u_A4_A2_left_v10_7`, which had the largest
selected current deficit and still retains a diagnostic surplus of
`0.115066037632` after the required margin.

## Fixed-Period Comparison

As a transient comparison, the same builder was run with
`--period-mode fixed` into `/tmp`, then scanned with the same executable. That
run returned `status=inconclusive` with
`min_gap_value_after_required_margin=-0.0025032931028`; the failing collar was
`C_u_A4_A3_right_v10_10`.

The comparison is not promoted as a repo artifact. Its routing value is that
the current local basis appears to need a period tangent column for the v10
strict-gap target. The next repaired candidate should therefore treat
$T_{\mathrm{cyc}}$ as a solve variable or supply a different shape basis that
opens `C_u_A4_A3_right_v10_10` at fixed period.

## Theory Advance

The strict-gap repair target is no longer only a table of deficits. The
existing local shear basis, when augmented by a period tangent, has a concrete
finite witness for all 10 v10 parent-complement collars:
$$
\exists \xi
\quad
\text{such that}
\quad
A\xi>\kappa.
$$
This makes the next repair more specific. A successor solver should include
$b_T$ or an equivalent period/phase degree of freedom when assembling the true
structural system
$$
DC(\mathbf a_0)\xi=0.
$$
If that structural system kills the period tangent, the current three-bump
shape basis is probably insufficient and must be enlarged.

## Limitations

- The result certifies only the declared finite tangent matrix.
- The matrix uses endpoint extrema from the v10 collar ranges; it is not an
  outward-rounded interval lower bound.
- The structural Jacobian $DC(\mathbf a_0)$ for a repaired or solved successor
  candidate is absent.
- A feasible witness here does not update `causal_ledger.json`, consume parent
  rows, certify fold-layer rows, or authorize `branch_chart.json`.
- The repaired candidate must still rerun proof-interval row classification,
  including simple-root, endpoint/seam, fold-layer, diagonal, and strict-empty
  rows, on one frozen packet identity.

## Capture Decision

Priority-only. This is a useful executable success marker for the selected
repair route, not reader-facing theorem prose. Promotion should wait until the
witness is integrated into a repaired or successor candidate and the
proof-interval pre-ledger passes with strict margins.
