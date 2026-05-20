# Fold Parent Regular-Boundary `u` Probe

## Scope

This packet checks the residual `u` equality cores left by `fold_parent_endpoint_u_closure_attempt.md` and `fold_parent_u_positive_overlap_subdivision_attempt.md` against the accepted separator-family coverage alternative in `fold_parent_boundary_complement_packet.md`.

Read sources:

- `fold_parent_u_positive_overlap_subdivision_attempt.md`
- `fold_parent_endpoint_u_closure_attempt.md`
- `fold_parent_boundary_complement_packet.md`
- `fold_parent_fold_family_membership_attempt.md`
- `fold_full_interval_constants_certificate.json`
- `fold_layer_atlas.json`
- `mesh_refined_preledger_v1.json`

This packet does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, `pass_fail_ledger.md`, the integrated regular-boundary attempt, or any `w` lane file.

## Verdict

Rejected as a current-contract separator-family coverage certificate.

No residual `u` equality core can be consumed by the currently accepted fold-layer rows alone. Each core is adjacent to $\Sigma_3$ or $\Sigma_4$ in a diagnostic sense, but exact accepted coverage requires membership in one of the recorded fold-layer row rectangles
$$
\mathcal{F}_{\Sigma_3}
=
\{R_u_F3_A2,R_u_F3_F3,R_u_A3_F3,R_u_A4_F3\}
$$
or
$$
\mathcal{F}_{\Sigma_4}
=
\{R_u_F4_A2,R_u_F4_A3,R_u_F4_F4,R_u_A4_F4\}.
$$

The residual cores below are regular-boundary subrectangles with interval ids such as `A3/A2`, `A4/A2`, or `A4/A3`. They are not exact members of the accepted fold-layer rows, and treating them as covered would expand the fold-layer domain beyond the accepted atlas rows. The packet therefore fails closed.

No `u` parent row can be consumed.

## Current Accepted Coverage Contract

For a `u` boundary complement $B$, the fold-layer alternative accepts the complement only when all of the following are recorded on the same packet identity tuple:

1. $B\in\mathcal{F}_{\Sigma_3}$ or $B\in\mathcal{F}_{\Sigma_4}$;
2. the corresponding fold-layer rows have finite accepted constants;
3. the separator keeps
   $$
   \alpha_{\Sigma}>0,\qquad
   \nu_{\mathrm{exit},\Sigma}>0,\qquad
   \Delta N_\Sigma\in2\mathbb{Z},\qquad
   \Delta D_\Sigma=0;
   $$
4. no fold-layer contribution is evaluated as a simple-root branch and no simple-root branch is double-counted.

`fold_full_interval_constants_certificate.json` supplies accepted fixed-parameter constants for the 16 fold-layer row rectangles, including the eight `u` rows listed above. It does not add regular-side collars to those rectangles. `fold_layer_atlas.json` likewise names only `F3` and `F4` layer intervals for the `u` fold families.

## Residual Equality-Core Routing Table

The table records the best possible diagnostic separator routing. The `Accepted now?` column is the live verdict under the current contract.

| Parent row | Residual core source | Residual theta rectangle | Diagnostic separator | Nearest accepted row | Accepted now? | Fail-closed reason |
| --- | --- | --- | --- | --- | --- | --- |
| `R_u_A3_A2` | `receiver_left` | $\theta_r\in[r_32_left_hi,0.670709367399]$, $\theta_s\in[s_32_left_lo,0.635083617650]$ | $\Sigma_3$ | Would need `A3/A2` coverage across the `F3` boundary; accepted rows are `F3/A2` and `A3/F3`. | No | Neither side is inside `F3` on the residual core; accepting it would add an `A3/A2` regular-boundary bridge not present in $\mathcal{F}_{\Sigma_3}$. |
| `R_u_A3_A2` | `source_left` | $\theta_r\in[r_32_source_left,0.839916382350]$, $\theta_s\in[s_32_source_left,0.541038833440]$ | $\Sigma_4$ | Would need a receiver-side regular collar for `F4/A2`. | No | Receiver is an endpoint-scale `A3` tail adjacent to `F4`, not `F4`; the core also touches the accepted simple-root boundary, so ownership must be explicit. |
| `R_u_A4_A2` | `receiver_right` | $\theta_r\in[0.957747116028,r_42_right_hi]$, $\theta_s\in[s_42_right_lo,0.635083617650]$ | $\Sigma_3$ | Would need a source-side regular collar for `A4/F3`. | No | Source is an `A2` collar adjacent to `F3`, not `F3`; accepting it would expand `R_u_A4_F3`. |
| `R_u_A4_A2` | `source_right` | $\theta_r\in[r_42_source_right,0.957747116028]$, $\theta_s\in[0.625869003963,s_42_source_right]$ | $\Sigma_3$ | Would need a source-side regular collar for `A4/F3`. | No | Endpoint-scale core is still positive-width after recorded endpoints; source remains in `A2`, and the core touches the simple-root boundary. |
| `R_u_A4_A3` | `receiver_left` | $\theta_r\in[0.864916382350,0.873898811563]$, $\theta_s\in[s_43_left_hi,s_43_left_lo]$ | $\Sigma_4$ | Would need an `A4/A3` bridge across the `F4` boundary; accepted rows are `F4/A3` and `A4/F4`. | No | Neither side is inside `F4` on the residual core; accepting it would add a regular-boundary bridge outside $\mathcal{F}_{\Sigma_4}$. |
| `R_u_A4_A3` | `receiver_right` | $\theta_r\in[0.957785341387,r_43_right_hi]$, $\theta_s\in[0.660083617650,s_43_right_lo]$ | $\Sigma_3$ | Would need a source-side regular collar for `A4/F3`. | No | Source is an `A3` collar adjacent to `F3`, not `F3`; accepting it would expand `R_u_A4_F3`. |

The `R_u_A4_A2/source_left` strip is not an equality core after the subdivision attempt. It remains an endpoint-scale separated strip whose strict gap was not accepted after outward rounding. It therefore cannot be consumed by the residual-core route.

## Parent-Row Consumption Table

| Parent row | Locally endpoint-excluded strips already available | Residual equality cores accepted by current $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$ rows | Other blocker | Can parent row be consumed? |
| --- | ---: | ---: | --- | --- |
| `R_u_A3_A2` | 1 | 0 | `receiver_left` and `source_left` remain outside exact fold-family coverage. | No |
| `R_u_A4_A2` | 0 | 0 | `receiver_right` and `source_right` remain outside exact fold-family coverage; `source_left` has no accepted outward-rounded strict gap. | No |
| `R_u_A4_A3` | 2 | 0 | `receiver_left` and `receiver_right` remain outside exact fold-family coverage. | No |

## Pass Conditions For A Future Regular-Boundary Theorem

A later packet could consume these residual cores only by adding an explicit regular-boundary theorem field, not by silently reusing the current fold-layer rows. The minimum field is:

```text
regular_boundary_coverage:
  separator: Sigma_3 | Sigma_4
  ledger: u
  residual_core_id: <parent-row>/<strip>
  regular_boundary_relation: B_core in overline(F_Sigma)^bdry
  theta_rectangle: exact receiver/source intervals after threshold subdivision
  null_coordinate_core: certified outward-rounded equality-core enclosure
  adjacent_accepted_rows: accepted F-row ids used for domination
  domination_ref: proof that accepted fixed-parameter fold constants dominate this regular-boundary core on the same packet identity tuple
  separator_conditions_preserved: alpha_floor > 0, exit_floor > 0, Delta_N even, Delta_D = 0
  simple_root_ownership: half-open or disjoint ownership proving the core is not counted inside the accepted simple-root branch row
  branch_sum_exclusion: fold-covered core enters only through the fold integral, not a simple-root branch-sum formula
```

For `R_u_A4_A2/source_left`, a separate field would still be needed unless a certified strict gap is supplied:

```text
endpoint_scale_gap_certificate:
  strip_id: R_u_A4_A2/source_left
  outward_rounded_gap: positive lower bound for Delta^u_B
  root_count_bound: [0,0]
```

Without these fields, the current contract has no place to record regular-side collars adjacent to `F3` or `F4`, and no rule preventing double-counting where a residual core shares a boundary with an accepted simple-root subrow.

## Fail Conditions

This regular-boundary route must fail closed if any of the following occurs:

- a residual core is assigned to $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$ without an exact accepted row match or a new accepted regular-boundary relation;
- coverage extends `R_u_F3_A2`, `R_u_A3_F3`, `R_u_A4_F3`, `R_u_F4_A2`, `R_u_F4_A3`, or `R_u_A4_F4` beyond the interval ids recorded in the accepted constants certificate;
- a core touching an accepted simple-root boundary lacks an explicit ownership rule;
- any residual core is evaluated as a simple-root branch contribution;
- `R_u_A4_A2/source_left` is treated as closed without an accepted outward-rounded strict gap or another expressly accepted non-equality alternative;
- any live ledger, atlas, branch chart, or pass/fail ledger is rewritten from this diagnostic packet alone.

## Live Authorization

| Artifact or state | Authorization |
| --- | --- |
| `R_u_A3_A2` | Not consumed. |
| `R_u_A4_A2` | Not consumed. |
| `R_u_A4_A3` | Not consumed. |
| `causal_ledger.json` | No update authorized. |
| `fold_layer_atlas.json` | No update authorized. |
| `branch_chart.json` | No creation or authorization. |
| Pass/fail ledgers | No update authorized by this packet. |

The exact verdict is: under the current contract, all residual `u` equality cores are diagnostically routable to $\Sigma_3$ or $\Sigma_4$ but none is accepted as separator-family coverage. A consumable route requires an explicit regular-boundary coverage field with domination and simple-root ownership, plus a separate accepted strict-gap certificate for `R_u_A4_A2/source_left` if that strip remains outside the equality-core theorem.
