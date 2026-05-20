# Fold Row-Tube Coverage Attempt

Status: **rejected coverage attempt**.

This is a coverage attempt only. It does not edit `causal_ledger.json`, does not accept fold constants, and does not authorize `branch_chart.json`.

The tested packet is `seed-doubled-four-arc-cosine-template-v0` with refinement `preledger-separator-level-split-v1`. The tested inputs were:

- `fold_interval_constants_contract.md`
- `fold_interval_constants_attempt.json`
- `fold_impulse_constants.json`
- `fold_layer_atlas.json`
- `mesh_refined_preledger_v1.json`
- `causal_ledger.json`

## Contract Test

The fold interval constants contract requires, for every fold row
$$
B=(I_\alpha^r,I_\beta^s,y),
\qquad
y\in\{u,w\},
$$
a measurable receiver projection
$$
E_B\subseteq I_\alpha^r,
$$
a measurable source-slice family
$$
S_B(t)\subseteq I_\beta^s,
$$
interval enclosures
$$
L_{r,B}\ge |E_B|,
\qquad
L_{s,B}\ge \sup_{t\in E_B}|S_B(t)|,
$$
and a proof that
$$
E_B,
\qquad
S_B(t)
$$
contain the full mollifier contribution assigned to the row.

The inspected refined intervals and fold atlas are not enough to certify these data. They identify the fold layers, the sixteen rows touching them, positive kinematic fold margins
$$
\alpha_\Sigma>0,
\qquad
\nu_{\mathrm{exit},\Sigma}>0,
$$
and the parity data
$$
\Delta N_\Sigma\in2\mathbb{Z},
\qquad
\Delta D_\Sigma=0.
$$
They do not provide a mollifier-support sublevel set, a receiver projection, a source-slice family, or a coverage proof for the full dual-mollified row contribution.

The only available row coverage data are the full refined-interval fallback rectangles recorded in `fold_interval_constants_attempt.json` and `fold_impulse_constants.json`. Those fallbacks are finite diagnostic data, not accepted interval-certified row-tube coverage. They may be read as coarse fixed-parameter consumption tests, but they may not be used to claim the intended
$$
O(\eta^{1/2})
$$
fold-transit scaling.

## Row-Family Table

| Separator | Row | Available fallback for $E_B$ and $S_B(t)$ | $L_{r,B}$ | $L_{s,B}$ | Coverage status |
| --- | --- | --- | ---: | ---: | --- |
| $\Sigma_1$ | `R_w_F1_A0` | Full refined receiver/source intervals | 0.157079632681 | 0.848755401660 | Diagnostic full-interval fallback; not certified |
| $\Sigma_1$ | `R_w_F1_F1` | Full refined receiver/source intervals | 0.157079632681 | 0.157079632681 | Diagnostic full-interval fallback; not certified |
| $\Sigma_1$ | `R_w_A1_F1` | Full refined receiver/source intervals | 1.129922584913 | 0.157079632681 | Diagnostic full-interval fallback; not certified |
| $\Sigma_1$ | `R_w_A2_F1` | Full refined receiver/source intervals | 1.697510803319 | 0.157079632681 | Diagnostic full-interval fallback; not certified |
| $\Sigma_2$ | `R_w_F2_A0` | Full refined receiver/source intervals | 0.157079632681 | 0.848755401660 | Diagnostic full-interval fallback; not certified |
| $\Sigma_2$ | `R_w_F2_A1` | Full refined receiver/source intervals | 0.157079632681 | 1.129922584913 | Diagnostic full-interval fallback; not certified |
| $\Sigma_2$ | `R_w_F2_F2` | Full refined receiver/source intervals | 0.157079632681 | 0.157079632681 | Diagnostic full-interval fallback; not certified |
| $\Sigma_2$ | `R_w_A2_F2` | Full refined receiver/source intervals | 1.697510803319 | 0.157079632681 | Diagnostic full-interval fallback; not certified |
| $\Sigma_3$ | `R_u_F3_A2` | Full refined receiver/source intervals | 0.157079632681 | 1.697510803319 | Diagnostic full-interval fallback; not certified |
| $\Sigma_3$ | `R_u_F3_F3` | Full refined receiver/source intervals | 0.157079632681 | 0.157079632681 | Diagnostic full-interval fallback; not certified |
| $\Sigma_3$ | `R_u_A3_F3` | Full refined receiver/source intervals | 1.129922584912 | 0.157079632681 | Diagnostic full-interval fallback; not certified |
| $\Sigma_3$ | `R_u_A4_F3` | Full refined receiver/source intervals | 0.848755401660 | 0.157079632681 | Diagnostic full-interval fallback; not certified |
| $\Sigma_4$ | `R_u_F4_A2` | Full refined receiver/source intervals | 0.157079632681 | 1.697510803319 | Diagnostic full-interval fallback; not certified |
| $\Sigma_4$ | `R_u_F4_A3` | Full refined receiver/source intervals | 0.157079632681 | 1.129922584912 | Diagnostic full-interval fallback; not certified |
| $\Sigma_4$ | `R_u_F4_F4` | Full refined receiver/source intervals | 0.157079632681 | 0.157079632681 | Diagnostic full-interval fallback; not certified |
| $\Sigma_4$ | `R_u_A4_F4` | Full refined receiver/source intervals | 0.848755401660 | 0.157079632681 | Diagnostic full-interval fallback; not certified |

No row is certified. No row is wholly missing a diagnostic fallback. All sixteen rows are rejected because the fallback rectangles are not certified row-tube projections or direct interval quadrature enclosures of the full dual-mollified row integrals.

## Rejection

The coverage attempt is rejected under the fold interval constants contract.

The exact missing coverage data required to pass are, for each of the sixteen fold rows:

1. A declared mollifier-support sublevel set for the chosen compact-support shell mollifier, or a direct interval quadrature route that encloses the full dual-mollified row contribution.
2. A certified receiver projection
   $$
   E_B\subseteq I_\alpha^r.
   $$
3. A certified source-slice family
   $$
   S_B(t)\subseteq I_\beta^s.
   $$
4. Interval enclosures
   $$
   L_{r,B}\ge |E_B|,
   \qquad
   L_{s,B}\ge \sup_{t\in E_B}|S_B(t)|.
   $$
5. A proof that all contributing support is covered: every point contributing to
   $$
   a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)
   =
   \Gamma
   \int_{S_B(t)}
   \frac{\hat r_s(t;s)}
   {|x(t)-x(s)|^2+\epsilon_c^2}\,
   \delta_\eta\!\big(|x(t)-x(s)|-c_f(t-s)\big)\,ds
   $$
   must lie in the reported
   $$
   E_B,
   \qquad
   S_B(t).
   $$

For the normal-form route, the missing data must also prove
$$
L_{r,B}\le c_{\Sigma,B}\eta^{1/2}
$$
with finite
$$
c_{\Sigma,B}.
$$
Without that row-tube projection, the full refined interval remains only a diagnostic full-interval fallback.

## Consequence

The existing refined intervals and fold atlas support a finite diagnostic fallback table, but they do not certify row-tube projections
$$
E_B
$$
or source slices
$$
S_B(t)
$$
for any of the sixteen fold rows. Therefore the sixteen fold-layer rows remain unconsumed by this attempt, the fold constants remain rejected, and `branch_chart.json` remains unauthorized.
