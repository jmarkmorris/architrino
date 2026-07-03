# Equation Closure Pass 2026-06-23 E

## Workstream Metadata

- Kind: `priority`
- Status: `complete`
- Mode: `team-agent continuation with executable reducer integration`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Score column updated: none
- Claim level: score-neutral executable contract check

## Purpose

This pass turned the `EQ-02` through `EQ-04` common-carrier factoring into a concrete executable reducer contract. The mathematical carrier is:

$$
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)
=
\left(
\mathfrak B_u,
\mathcal N_0,
\mathcal L_{\mathrm{root}}(u),
\mathcal L_{\mathrm{wake}}(u),
\mathcal L_{E\mathbf p\mathbf J}(u)
\right),
$$

and the retained-row extraction target remains:

$$
\operatorname{Emit}_{02\text{-}04}^{\mathrm{bin}}(u_k):
\texttt{equationBearing}(\mathfrak a,u_k)
\longmapsto
\left(
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u_k),
\Theta_{02\text{-}04}^{\mathrm{bin}}(u_k),
\mathcal R_{02\text{-}04}^{\mathrm{bin}}(u_k),
\mathcal R_{01-05}^{\mathfrak B_{u_k}}(W_k),
\mathcal S_{\mathrm{root}}^{02\text{-}04}(u_k),
\mathcal S_{\mathrm{retune}}^{02\text{-}04}(u_k)
\right).
$$

The new executable artifact is [check-emit-02-04-contract.mjs](../../../scripts/equation-mapping/check-emit-02-04-contract.mjs). It consumes the live three-binary solver report's `cases[].branchChartProjection.equationBearing` payload and projects it against the declared `EQ-02` through `EQ-04` rows without treating current-proxy rows as score evidence.

## Executable Result

Command:

```sh
node scripts/equation-mapping/check-emit-02-04-contract.mjs --input /tmp/tri-binary-equation-bearing-check-e.json --summary --pretty
```

Summary:

| Field | Result |
| --- | --- |
| Input schema | `aaa-tri-binary-frequency-candidate-solver-report.v76` |
| Source payload | `cases[].branchChartProjection.equationBearing` |
| Cases inspected | 7 |
| Evaluable cases | 0 |
| Blocked cases | 7 |
| Retained branch claim | `false` |
| Contract status | `blocked_not_evaluable` |
| Score decision | `no_score_increase` |
| Source record mode | `nested_equationBearing_sourceRecordRefs` for all 7 cases |

The checker is doing the intended fail-closed work. It confirms that the live report contains useful current-proxy rows, including root-chart, active-lineage, same-row torque/wake diagnostic, common-clock, lever-arm/speed, and energy-frequency target rows. It also confirms that those rows do not yet populate the retained translating-binary carrier or the full same-record residual.

The checker separates retained target rows from current solver-report rows: `requiredRows` are retained $\operatorname{Emit}_{02\text{-}04}^{\mathrm{bin}}$ target rows, while `currentProxyRows` are current three-binary solver-report rows. In particular, `root_chart_reduced` is proxy-only and does not count as a retained $\mathfrak B_u$ row.

## Missing Rows By Projection

| Projection | Missing rows in all 7 cases |
| --- | --- |
| Common carrier | `retained_branch_chart`, `root_starvation_row`, `row_set_identity`, `tail_wake_pullback`, `vector_partition_retained`, `energy_routing`, `retained_noether_sea_cell` |
| Clock | `clock_period_T_u_T0`, `gamma_f_u`, `same_branch_chart_identity` |
| Envelope | `envelope_axes_R_parallel_R_perp`, `rho_u_shape_row`, `same_branch_chart_identity` |
| Two-way signal | `two_way_signal_delta_tw`, `beta_f_u`, `same_branch_chart_identity` |
| Energy | `E_CM_u`, `M0_bin`, `speed_convention_c_f`, `exposure_row`, `energy_routing`, `same_branch_chart_identity` |
| Momentum | `p_CM_u`, `drift_vector_u_hat_e`, `speed_convention_c_f`, `vector_partition_retained`, `recoil_or_boundary_exchange`, `same_branch_chart_identity` |
| Mass shell | `E_CM_u`, `p_CM_u`, `M0_bin`, `speed_convention_c_f`, `spatial_metric_h_ab`, `same_branch_chart_identity` |
| Rest mass | `M0_bin_at_rest`, `M0_bin_u`, `same_branch_chart_identity` |
| Medium response | `M_sea_ab_u`, `retained_noether_sea_cell`, `speed_convention_c_f`, `spatial_metric_h_ab`, `same_branch_chart_identity` |
| Same-record witnesses | `row_set_identity`, `same_branch_chart_identity`, `same_root_conservation_certificate`, `retune_witness_zero`, `split_witness_zero` |

## Score Decision

No `6/23 b` score changes are justified.

- `EQ-02` and `EQ-03` remain `4`: the common-carrier interface is now executable, but the retained clock, envelope, two-way signal, and same-branch identity rows are not populated.
- `EQ-04` remains `4`: the contract exposes the missing energy, momentum, rest-mass, and mass-shell rows, but no retained $E_{\mathrm{CM},u}$, $p_{\mathrm{CM},u}$, $M_0^{\mathrm{bin}}$, or exposure row has been computed.
- No `Promoted?` cells should be marked `ready` or `complete` from this pass.

## Next Reducer Target

The smallest accepted-retained-evidence next step is not another prose residual. It is a retained branch carrier row that satisfies:

$$
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u_k)
\supset
\left(
\texttt{retained\_branch\_chart},
\texttt{root\_starvation\_row},
\texttt{row\_set\_identity},
\texttt{tail\_wake\_pullback},
\texttt{vector\_partition\_retained},
\texttt{energy\_routing},
\texttt{retained\_noether\_sea\_cell}
\right),
$$

with all seven rows tied to the same retained branch chart. Once that carrier is populated, the checker can distinguish a genuinely evaluable `EQ-02` through `EQ-04` packet from another current-proxy report.

## Promotion Decision

Priority-only. The pass adds a useful success marker under the existing `EQ-02` through `EQ-04` proof route, but it does not create a reader-facing result. Promotion remains blocked until a retained branch calculation populates the carrier, full record, residual vector, same-root conservation row, split witness, and retune witness.
