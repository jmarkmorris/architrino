# Live Fold-Shear Gap-Opening Report

## Scope

This packet replaces the independent-column diagnostic gap matrix with the first
live local tangent matrix for the residual parent-complement collars of
`seed-doubled-four-arc-cosine-template-v0`.

It is still not a live fresh candidate, not a full structural Jacobian, not an
interval certificate, not a pre-ledger pass, and not branch-chart authorization.
Its claim is narrower and mathematical: an actual half-period-antisymmetric
$C^1$ shear basis on the first half-cycle has a strict tangent witness for the
declared residual-collar signed gaps.

Artifacts:

- `gap_opening_live_fold_shear_input.seed_cosine_residuals.v0.json`
- `gap_opening_live_fold_shear_result.seed_cosine_residuals.v0.json`
- `../../../../../scripts/proof-programs/fold-shear-gap-matrix-builder.mjs`
- `../../../../../scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs`

## Basis

Let
$$
\sigma_1=0.14758361765,
\qquad
\sigma_2=0.35241638235.
$$
Define first-half arc intervals
$$
A_0=[0,\sigma_1],
\qquad
A_1=[\sigma_1,\sigma_2],
\qquad
A_2=[\sigma_2,1/2].
$$
For $A_j=[L_j,R_j]$, use the $C^1$ bump
$$
\psi_j(\theta)
=
\sin^2\!\left(\pi\frac{\theta-L_j}{R_j-L_j}\right)
$$
on $A_j$ and zero outside $A_j$. Extend by half-period antisymmetry:
$$
H(\theta+1/2)=-H(\theta).
$$

The tangent direction is
$$
H(\theta)=h_{A0}\psi_0(\theta)+h_{A1}\psi_1(\theta)+h_{A2}\psi_2(\theta),
\qquad
\delta T=0.
$$
Because $\psi_j=\psi'_j=0$ at each arc endpoint, this basis preserves the
periodic seam, section displacement, separator support endpoints, and $C^1$
matching at the support boundaries to first order by construction.

## Live Matrix

Rows use the signed gap orientation
$$
\delta_m=y_{\mathrm{source}}-y_{\mathrm{receiver}},
$$
with
$$
\delta w(\theta)=H(\theta),
\qquad
\delta u(\theta)=-H(\theta).
$$
For each residual collar $C_m=R_m\times S_m$, the finite matrix row is the
endpoint minimum
$$
A_{m,j}
=
\min_{\theta_s\in\partial S_m,\ \theta_r\in\partial R_m}
\left(
\delta y_j(\theta_s)-\delta y_j(\theta_r)
\right).
$$
Each row subtracts the recorded residual overlap depth as `required_margin`.
The listed collar intervals lie on one monotone side of their respective
$\sin^2$ bumps, so endpoint evaluation is the finite monotone-matrix value for
this local calculation. This is not outward-rounded interval certification.

The structural matrix is the local fixed-period row
$$
B\xi=0,
\qquad
B=(1,0,0,0),
$$
for
$$
\xi=(b_T,h_{A0},h_{A1},h_{A2}).
$$

## Result

The scanner returned:

| Field | Value |
| --- | --- |
| `status` | `feasible` |
| `theory_success_marker` | `strict_null_coordinate_gap_opening_tangent_witness` |
| `method` | `nullspace_perceptron_strict_witness` |
| `nullity` | `3` |
| `xi_infinity_norm` | `1` |
| `max_structural_residual` | `0` |
| `min_gap_value_after_required_margin` | `0.0920789718365` |
| `preledger_pass` | `false` |
| `updates_live_ledger` | `false` |
| `branch_chart_authorized` | `false` |

The emitted tangent witness is

```json
{
  "b_T": 0,
  "h_A0": 0.433491813815,
  "h_A1": -0.556350501775,
  "h_A2": -1
}
```

For the declared finite matrix,
$$
B\xi=0,
\qquad
A\xi-\kappa\ge 0.0920789718365\,\mathbf{1},
\qquad
\|\xi\|_\infty=1.
$$

## Theory Advance

The diagnostic matrix treated `w` and `u` residual collars as independent
columns. This live local matrix removes that independence. Since
$$
H(\theta+1/2)=-H(\theta),
$$
and
$$
\delta u=-H,
\qquad
\delta w=H,
$$
each second-half `u` collar is the half-period mirror of a first-half `w`
calculation when $\delta T=0$. The strict witness therefore says something real
about the candidate geometry: one symmetry-preserving first-half shear can open
all eleven listed residual collars in the declared source-above-receiver
orientation.

This gives the next candidate a constructive seed direction. The fresh
fold-collocation generator should not begin by adding more parent-complement
rules. It should first carry this shear direction into a same-packet collocation
candidate and then test whether the full structural residuals, dynamic residuals,
and interval pre-ledger can still be satisfied.

## Limitations

- The matrix is local. It does not include the full structural Jacobian
  $DC(\mathbf a_0)$ for a solved fresh candidate.
- The signed orientation is `source_minus_receiver` for all residual collars.
  A separate boundary-continuation orientation may be useful when preserving the
  exact simple-root side ownership of the rejected cosine packet, but that is not
  the claim of this run.
- The endpoint minima are finite monotone-matrix values, not outward-rounded
  interval lower bounds.
- Endpoint-scale positive-overlap rows remain included because they still carry
  residual overlap at recorded precision. Endpoint-scale non-overlap rows are
  excluded.
- The result must not update `causal_ledger.json`, rewrite
  `fold_layer_atlas.json`, or authorize `branch_chart.json`.

## Capture Decision

Priority-only as a real theory advancement and executable success marker. The
safe mathematical content is the live fold-shear witness:
$$
\exists H\ \text{with}\ H(\theta+1/2)=-H(\theta),
\qquad
B\xi=0,
\qquad
A\xi>\kappa
$$
for the residual-collar matrix derived from actual $C^1$ first-half arc bumps.
Promotion to `content/markdown/aaa` should wait until the same idea is carried
into a fresh candidate with the full structural Jacobian and interval-bounded
pre-ledger rows.
