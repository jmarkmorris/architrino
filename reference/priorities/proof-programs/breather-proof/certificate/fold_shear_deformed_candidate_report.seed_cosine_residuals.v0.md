# Finite Fold-Shear Deformed Candidate Seed

## Scope

This packet records the finite-deformation consequence of
`gap_opening_live_fold_shear_result.seed_cosine_residuals.v0.json`.

It is priority-only. It is not a fresh solved candidate, not an
outward-rounded interval certificate, not a pre-ledger pass, not a live-ledger
update, and not branch-chart authorization. Its claim is narrower: the strict
live fold-shear tangent witness gives an explicit finite interval of candidate
histories that opens the declared residual collars in the local fixed-period
matrix.

Artifacts:

- `fold_shear_deformed_candidate.seed_cosine_residuals.v0.json`
- `../../../../../scripts/proof-programs/fold-shear-finite-deformation.mjs`
- `gap_opening_live_fold_shear_input.seed_cosine_residuals.v0.json`
- `gap_opening_live_fold_shear_result.seed_cosine_residuals.v0.json`

## Finite Deformation

Use the rejected cosine history only as source data:
$$
X(\theta)=1.25\cos(2\pi\theta),
\qquad
T_{\mathrm{cyc}}=6.28318530718.
$$
Let $H$ be the half-period-antisymmetric $C^1$ shear from the live witness
$$
(b_T,h_{A0},h_{A1},h_{A2})
=
(0,\ 0.433491813815,\ -0.556350501775,\ -1),
$$
and set
$$
X_\varepsilon(\theta)=X(\theta)+\varepsilon H(\theta),
\qquad
T_\varepsilon=T_{\mathrm{cyc}}.
$$

For fixed period, each null coordinate is affine in the candidate history:
$$
y_\sigma(\theta;X_\varepsilon,T_\varepsilon)
=
y_\sigma(\theta;X,T_{\mathrm{cyc}})
+\varepsilon\sigma H(\theta),
\qquad
\sigma\in\{-1,+1\}.
$$
Therefore every declared residual-collar row in the finite matrix has exact
linear finite surplus
$$
g_m(\varepsilon)=\varepsilon\lambda_m-\kappa_m,
$$
where
$$
\kappa_m=\texttt{required\_margin}_m,
\qquad
\lambda_m=(A\xi)_m.
$$
Strict finite separation for all listed collars requires
$$
\varepsilon>
\varepsilon_{\min}
=
\max_m\frac{\kappa_m}{\lambda_m}
=
0.0515044597755009.
$$

The generated artifact chooses
$$
\varepsilon=0.0625.
$$
The controlling mirrored residual rows are
`R_w_A1_A0_receiver_left` and `R_u_A3_A2_receiver_left`. With the chosen
deformation,
$$
\min_m g_m(0.0625)
=
0.00106743573978125.
$$

## Exact Preservation By The Basis

The finite seed preserves the structural data that the basis makes exact:

- periodic identification;
- half-period antisymmetry;
- section displacement and section velocity at $\theta=0$;
- separator displacement and separator velocity at $\Sigma_1,\ldots,\Sigma_4$;
- $C^1$ matching at the first-half arc boundaries and their half-period mirrors.

The output JSON records sampled, non-certificate bounds
$$
\max |H|\approx0.999999969597041,
\qquad
\max|\varepsilon H|\approx0.0624999980998151,
$$
and
$$
X_\varepsilon(\theta)\in[-1.25081444376787,\ 1.25081444376787]
$$
on a 20001-point sample. These sampled bounds are diagnostic only.

## Theory Advance

The live fold-shear witness was a strict tangent result. This packet adds the
finite corollary: because the relevant fixed-period null-coordinate rows are
affine in $X$, the tangent witness produces an explicit one-parameter family of
finite candidate histories with positive declared residual gaps once
$\varepsilon>\varepsilon_{\min}$.

This is not another requirement. It is a constructive seed for the next
fold-adapted collocation solve. The successor solver should use
$X_\varepsilon$ as an initial history or low-dimensional continuation direction,
then enforce the full structural equations, dynamic residuals, fold integrals,
and outward-rounded null-coordinate pre-ledger on one fresh packet identity.

## Limitations

- The seed is not an EOM-solved returned sample.
- The residual rows are finite endpoint calculations, not interval-certified
  pre-ledger rows.
- The current structural matrix fixes only period in the local shear subspace;
  it is not the full $DC(\mathbf a_0)$ for a solved fresh candidate.
- No claim is made about origin-layer placement, fold nondegeneracy, velocity
  class interiors, dynamic residuals, returned-sample rows, or non-overlap rows
  not included in the declared residual-collar matrix.
- `causal_ledger.json`, `fold_layer_atlas.json`, and `branch_chart.json` remain
  unchanged and unauthorized.

## Capture Decision

Priority-only as a real theory advancement and finite success marker. The
corpus-safe public principle remains the promoted null-coordinate pre-ledger
falsification gate and the fresh-candidate gap-opening criterion. This finite
seed should not be promoted into `content/markdown/aaa` until a fresh
same-packet candidate carries it through the full structural Jacobian and
interval pre-ledger.
