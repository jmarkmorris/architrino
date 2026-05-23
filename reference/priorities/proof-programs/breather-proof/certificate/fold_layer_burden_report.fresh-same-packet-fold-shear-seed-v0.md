# Fresh Fold-Layer Burden Report

## Verdict

The fresh sidecar `fresh-same-packet-fold-shear-seed-v0` has 16 fold-layer rows that cannot be
consumed by ordinary null-coordinate range data. They require a same-packet
fold-layer certificate. This report records the burden only; it does not update
`fold_layer_atlas.json`, does not rewrite `causal_ledger.json`, and does
not authorize `branch_chart.json`.

| Separator | Rows |
| --- | --- |
| `Sigma_1` | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` |
| `Sigma_2` | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` |
| `Sigma_3` | `R_u_F3_A2`, `R_u_F3_F3`, `R_u_A3_F3`, `R_u_A4_F3` |
| `Sigma_4` | `R_u_F4_A2`, `R_u_F4_A3`, `R_u_F4_F4`, `R_u_A4_F4` |

## Row Burden

| Row | Separator | Ledger | Receiver | Source | Diagnostic overlap width |
| --- | --- | --- | --- | --- | ---: |
| `R_w_F1_A0` | `Sigma_1` | `w` | `F1` | `A0` | 0.00692899875917008 |
| `R_w_F1_F1` | `Sigma_1` | `w` | `F1` | `F1` | 0.00745102360868999 |
| `R_w_A1_F1` | `Sigma_1` | `w` | `A1` | `F1` | 0.00390055196395989 |
| `R_w_F2_A0` | `Sigma_2` | `w` | `F2` | `A0` | 0.00686862500427998 |
| `R_w_F2_A1` | `Sigma_2` | `w` | `F2` | `A1` | 0.00399766290998005 |
| `R_w_F2_F2` | `Sigma_2` | `w` | `F2` | `F2` | 0.00686862500427998 |
| `R_w_A2_F1` | `Sigma_1` | `w` | `A2` | `F1` | 0.00745102360868999 |
| `R_w_A2_F2` | `Sigma_2` | `w` | `A2` | `F2` | 0.00686862500427998 |
| `R_u_F3_A2` | `Sigma_3` | `u` | `F3` | `A2` | 0.00693091276859015 |
| `R_u_F3_F3` | `Sigma_3` | `u` | `F3` | `F3` | 0.00745102360887007 |
| `R_u_A3_F3` | `Sigma_3` | `u` | `A3` | `F3` | 0.00390055196413996 |
| `R_u_F4_A2` | `Sigma_4` | `u` | `F4` | `A2` | 0.0068686250044605 |
| `R_u_F4_A3` | `Sigma_4` | `u` | `F4` | `A3` | 0.00399766291016057 |
| `R_u_F4_F4` | `Sigma_4` | `u` | `F4` | `F4` | 0.0068686250044605 |
| `R_u_A4_F3` | `Sigma_3` | `u` | `A4` | `F3` | 0.00745102360887007 |
| `R_u_A4_F4` | `Sigma_4` | `u` | `A4` | `F4` | 0.0068686250044605 |

## Required Same-Packet Fields

- fresh packet identity check with refs to phi_cyc, mesh, input screen, causal ledger, and seed contract.
- fresh atlas_id, separator_event, interval_id, ledger, theta_center, t_center, theta_range, t_range, and layer radii.
- alpha_floor > 0 and exit_floor > 0 for each separator layer.
- parity fields delta_root_count, delta_signed_degree = 0, local_even_jump, and parity_status.
- mollifier proof or direct quadrature route under the fresh packet identity.
- Gamma/g coupling certification.
- per-row E_B, S_B(t), L_r_B, L_s_B, support coverage, and finite I_fold_B or finite A_B_eta_epsilon_c route.
- fresh separator aggregates C_Sigma, A_Sigma_eta_epsilon_c, and I_fold_eta_epsilon_c_Sigma, unless a direct-row impulse route replaces the aggregate route.

## Template-Only Reuse

The historical cosine-packet fold artifacts may be reused only as templates:
`fold_layer_atlas.json`, `fold_impulse_constants.json`, `fold_interval_constants_attempt.json`, `fold_full_interval_constants_certificate.json`, `fold_full_interval_fallback_legality.md`. They are
not fresh-packet evidence and do not consume the rows above.

## Consumption Rule

Each row above may become `fold_layer` only after the fresh same-packet fields
are accepted. No row above may be rewritten as `simple_root`, and no branch-sum
residual may be routed through the separator.

## Capture Decision

Priority-only. This is a fold-layer burden packet for the fresh sidecar. It
should remain under `reference/priorities` until a later fresh same-packet
fold-layer certificate supplies the missing fields.
