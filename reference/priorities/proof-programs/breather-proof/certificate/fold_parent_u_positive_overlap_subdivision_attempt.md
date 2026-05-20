# Fold Parent `u` Positive-Overlap Subdivision Attempt

## Scope

This packet continues the `u` parent-complement lane after `fold_parent_endpoint_u_closure_attempt.md`. It attempts to subdivide the remaining positive-overlap or endpoint-scale uncertified strips for the three `u` parent rows:

- `R_u_A3_A2`
- `R_u_A4_A2`
- `R_u_A4_A3`

Sources read:

- `fold_parent_complement_partition_attempt.md`
- `fold_parent_endpoint_u_closure_attempt.md`
- `fold_parent_boundary_complement_packet.md`
- `mesh_refined_preledger_v1.json`
- `causal_preledger_interval_report.md`

This packet does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, `pass_fail_ledger.md`, or any `w` lane file.

## Verdict

Rejected as a parent-row consumption certificate.

The finer subdivision is useful diagnostically: several strict-empty wings are separated by explicit null-coordinate thresholds. However, every `u` parent row still contains at least one positive-width residual overlap, endpoint-scale positive overlap, or endpoint-scale gap that is not accepted after outward rounding. No remaining strip becomes a fully accepted endpoint-excluded complement, and no additional simple-root subrow is recorded as a live consumable row.

Therefore no parent row can be consumed, and no live ledger update is authorized.

## Subdivision Equation

Use the packet's cosine null coordinate
$$
U(\theta)=u(\theta)=2\pi\theta-1.25\cos(2\pi\theta).
$$

All thresholds below are defined by exact equations of the form
$$
U(\theta_\ast)=U(\theta_0)
$$
on the monotone regular interval named in the table. Decimal values are diagnostic values from the same formula, rounded for this packet.

For a strict-empty wing, the threshold-facing endpoint is not itself consumed by the strict gap statement. A closed live substrip must be inward-rounded away from the listed equality threshold, or else it must be covered by an accepted endpoint convention. The residual overlap rows below include those threshold contacts and fail closed when a positive-width null-coordinate overlap remains.

## Thresholds Used

| Label | Monotone interval | Defining equation | Diagnostic value |
| --- | --- | --- | ---: |
| `r_32_left_hi` | `A3` | $U(r_\ast)=U(0.635083617650)$ | $0.660536675649329$ |
| `s_32_left_lo` | `A2` | $U(s_\ast)=U(0.670709367399)$ | $0.625869003962779$ |
| `s_32_source_left` | `A2` | $U(s_\ast)=U(0.839916382350)$ | $0.541038833439689$ |
| `r_32_source_left` | `A3` | $U(r_\ast)=U(0.541038833440)$ | $0.839916382346198$ |
| `r_42_right_hi` | `A4` | $U(r_\ast)=U(0.635083617650)$ | $0.958923441955692$ |
| `s_42_right_lo` | `A2` | $U(s_\ast)=U(0.957747116028)$ | $0.625869003963346$ |
| `s_42_source_right` | `A2` | $U(s_\ast)=U(0.957747116028)$ | $0.625869003963346$ |
| `r_42_source_right` | `A4` | $U(r_\ast)=U(0.625869003963)$ | $0.957747116027943$ |
| `s_43_left_hi` | `A3` | $U(s_\ast)=U(0.873898811563)$ | $0.829553995645058$ |
| `s_43_left_lo` | `A3` | $U(s_\ast)=U(0.864916382350)$ | $0.839463324350671$ |
| `r_43_right_hi` | `A4` | $U(r_\ast)=U(0.660083617650)$ | $0.958961166560311$ |
| `s_43_right_lo` | `A3` | $U(s_\ast)=U(0.957785341387)$ | $0.670446004354903$ |

The repeated `A2` threshold in `R_u_A4_A2` is intentional: the source-right strip's lower endpoint is endpoint-scale below the receiver upper endpoint, so the same receiver endpoint determines the tiny residual overlap.

## Strip Subdivision Results

| Parent row | Strip | Certifiable pieces after inward rounding | Residual fail-closed piece | Residual null-coordinate size | Simple-root result |
| --- | --- | --- | --- | ---: | --- |
| `R_u_A3_A2` | `receiver_left` | Source prefix $\theta_s<s_32_left_lo$ is below the receiver range; receiver prefix $\theta_r<r_32_left_hi$ is above the source range. | $\theta_r\in[r_32_left_hi,0.670709367399]$, $\theta_s\in[s_32_left_lo,0.635083617650]$. | about $0.005$ | Interior inverse branches exist only after choosing an arbitrary positive coverage margin; endpoint collars remain, so no consumable simple-root subrow is recorded. |
| `R_u_A3_A2` | `source_left` | Source prefix $\theta_s<s_32_source_left$ and receiver prefix $\theta_r<r_32_source_left$ are strict-empty after inward rounding. | Endpoint-scale tail $\theta_r\in[r_32_source_left,0.839916382350]$, $\theta_s\in[s_32_source_left,0.541038833440]$. | about $1.33\times10^{-12}$ | No: the remaining tail is positive-width after the recorded endpoints are used. |
| `R_u_A4_A2` | `receiver_right` | Source prefix $\theta_s<s_42_right_lo$ is below the receiver range; receiver suffix $\theta_r>r_42_right_hi$ is above the source range. | $\theta_r\in[0.957747116028,r_42_right_hi]$, $\theta_s\in[s_42_right_lo,0.635083617650]$. | about $0.005$ | Interior inverse branches exist only after choosing an arbitrary positive coverage margin; endpoint collars remain, so no consumable simple-root subrow is recorded. |
| `R_u_A4_A2` | `source_left` | No accepted strict-empty certificate: the diagnostic exact gap is only about $1.32\times10^{-12}$ and was already not accepted after outward rounding. | Entire strip remains an uncertified endpoint-scale separated strip. | no accepted positive gap | No: there is no positive-width root band, but also no certified strict gap. |
| `R_u_A4_A2` | `source_right` | Source suffix $\theta_s>s_42_source_right$ is above the receiver range; receiver prefix $\theta_r<r_42_source_right$ is below the source range. | Endpoint-scale tail $\theta_r\in[r_42_source_right,0.957747116028]$, $\theta_s\in[0.625869003963,s_42_source_right]$. | about $2.42\times10^{-13}$ | No: the remaining tail is positive-width after the recorded endpoints are used. |
| `R_u_A4_A3` | `receiver_left` | Source prefix $\theta_s<s_43_left_hi$ is above the receiver range; source suffix $\theta_s>s_43_left_lo$ is below the receiver range. | $\theta_r\in[0.864916382350,0.873898811563]$, $\theta_s\in[s_43_left_hi,s_43_left_lo]$. | about $0.004838558776$ | Interior inverse branches exist only after choosing an arbitrary positive coverage margin; endpoint collars remain, so no consumable simple-root subrow is recorded. |
| `R_u_A4_A3` | `receiver_right` | Receiver suffix $\theta_r>r_43_right_hi$ is above the source range; source suffix $\theta_s>s_43_right_lo$ is below the receiver range. | $\theta_r\in[0.957785341387,r_43_right_hi]$, $\theta_s\in[0.660083617650,s_43_right_lo]$. | about $0.005$ | Interior inverse branches exist only after choosing an arbitrary positive coverage margin; endpoint collars remain, so no consumable simple-root subrow is recorded. |

## Endpoint-Excluded Pieces

No new endpoint-excluded piece is accepted in this packet.

The three finite endpoint contacts already accepted locally in `fold_parent_endpoint_u_closure_attempt.md` are unchanged:

- `R_u_A3_A2` / `source_right`
- `R_u_A4_A3` / `source_left`
- `R_u_A4_A3` / `source_right`

The endpoint-scale tails in `R_u_A3_A2` / `source_left` and `R_u_A4_A2` / `source_right` are not finite contact sets after the recorded endpoints are used; they retain positive-width null-coordinate overlap at the recorded scale. The `R_u_A4_A2` / `source_left` strip is not a positive-overlap strip in exact arithmetic, but its separation is below the accepted outward-rounded gap threshold and therefore remains uncertified.

## Additional Simple-Root Subrows

No additional simple-root subrow is recorded as a consumable row.

The positive-width residual cores are monotone-on-monotone bands, so an interior rectangle could be made into a simple-root diagnostic by choosing a new positive coverage margin
$$
\epsilon>0
$$
inside the residual null-coordinate overlap. That does not consume the residual core: the required simple-root inequality
$$
\operatorname{dist}\!\big(Y_{\alpha}^{u},\partial Y_{\beta}^{u}\big)>0
$$
forces endpoint collars of positive null-coordinate width to remain outside any finite interior simple-root rectangle unless another accepted endpoint or fold-layer coverage alternative is added. This packet therefore does not create arbitrary partial simple-root rows.

## Parent-Row Consumption

| Parent row | Previously accepted endpoint strips | New strict-empty wings | Remaining blocker | Can parent row be consumed? |
| --- | ---: | ---: | --- | --- |
| `R_u_A3_A2` | 1 | diagnostic only, after inward rounding | `receiver_left` retains about $0.005$ overlap; `source_left` retains endpoint-scale positive overlap. | No |
| `R_u_A4_A2` | 0 | diagnostic only, after inward rounding | `receiver_right` retains about $0.005$ overlap; `source_left` has no accepted outward-rounded gap; `source_right` retains endpoint-scale positive overlap. | No |
| `R_u_A4_A3` | 2 | diagnostic only, after inward rounding | `receiver_left` retains about $0.004838558776$ overlap; `receiver_right` retains about $0.005$ overlap. | No |

## Live Ledger Authorization

No live ledger updates are authorized.

| Artifact or state | Authorization |
| --- | --- |
| `R_u_A3_A2` | Not consumed. |
| `R_u_A4_A2` | Not consumed. |
| `R_u_A4_A3` | Not consumed. |
| `causal_ledger.json` | No update authorized. |
| `fold_layer_atlas.json` | No update authorized. |
| `branch_chart.json` | No creation or authorization. |
| `pass_fail_ledger.md` | No update authorized by this packet. |

The exact fail-closed blocker is not lack of a finer threshold calculation. It is the persistence of positive-width residual overlap, plus one endpoint-scale separated strip whose gap is not accepted after outward rounding.
