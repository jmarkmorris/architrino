# Fold Parent Endpoint `w` Closure Attempt

## Scope

This packet attempts endpoint-exclusion closure for the `w` parent-complement strips listed in `fold_parent_complement_partition_attempt.md` under the approved Route A endpoint-exclusion alternative from `fold_parent_contract_decision_packet.md`.

Sources read:

- `fold_parent_contract_decision_packet.md`
- `fold_parent_complement_partition_attempt.md`
- `fold_parent_endpoint_exclusion_legality.md`
- `fold_parent_boundary_complement_packet.md`
- `mesh_refined_preledger_v1.json`
- `causal_preledger_interval_report.md`
- `diagonal_exclusion_subledger.json`

This packet does not edit `fold_parent_boundary_complement_packet.md`, `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, pass/fail ledgers, or any live ledger.

## Verdict

Rejected as a complete endpoint-exclusion closure certificate for the three `w` parent rows.

The attempt fails closed because several `w` parent-complement strips have positive-width null-coordinate overlap, not merely finite endpoint contact. Route A can only apply when
$$
Y_{\alpha}^{w}(B)\cap Y_{\beta}^{w}(B)
$$
is confined to a finite endpoint-contact set and no off-endpoint crossing remains. Positive-width overlap is not an endpoint-contact case.

Therefore:

| Question | Answer |
| --- | --- |
| Exact verdict | Rejected. |
| Accepted strips | Four strip-local endpoint-only contacts are acceptable under Route A if the approved complement-boundary convention deletes the listed endpoints. |
| Rejected strips | Six strips are rejected: five have positive-width null-coordinate overlap and one has only an uncertified endpoint-scale diagnostic gap. |
| Can the three `w` parent rows be consumed? | No. |
| Are live ledger updates authorized? | No. |
| Root-count bound for accepted endpoint-only strips | $[0,0]$. |
| Root-count bound for rejected strips | Not assigned by this packet. |

## Route A Criteria Check

| Criterion | Result |
| --- | --- |
| Outward-rounded $Y^w$ ranges | The packet uses the displayed rounded diagnostic ranges from `fold_parent_complement_partition_attempt.md` as the attempted enclosures; any positive-width overlap in these ranges is fail-closed. |
| Finite endpoint-contact set | Holds only for four strips: `R_w_A1_A0/source_right`, `R_w_A2_A0/source_right`, `R_w_A2_A1/source_left`, and `R_w_A2_A1/source_right`. |
| No off-endpoint crossing | Holds only in the four endpoint-only strips, by strict monotonicity on the regular receiver/source subintervals and singleton range contact. |
| Endpoint contact table | Recorded below for the four endpoint-only strips. |
| Positive separation after deleting contacts | Holds only for the four endpoint-only strips. |
| Root-count bound $[0,0]$ | Recorded only for the four endpoint-only strips. |
| Fail-closed positive-width overlap test | Fails for five strips. |

The `R_w_A2_A0/source_left` strip is not accepted here even though the diagnostic table shows an endpoint-scale gap, because `fold_parent_complement_partition_attempt.md` explicitly says that gap is not accepted after outward rounding.

## Per-Strip Overlap Table

| Parent row | Strip | Receiver $Y_{\alpha}^{w}(B)$ | Source $Y_{\beta}^{w}(B)$ | Overlap/contact type | Endpoint-exclusion status |
| --- | --- | --- | --- | --- | --- |
| `R_w_A1_A0` | `receiver_left` | $[1.669902497690,1.675063938914]$ | $[1.250000000000,1.674902497689]$ | Positive-width overlap $[1.669902497690,1.674902497689]$ | Rejected: not finite endpoint contact. |
| `R_w_A1_A0` | `source_left` | $[1.466528714676,1.669902497690]$ | $[1.250000000000,1.466528714678]$ | Positive-width overlap $[1.466528714676,1.466528714678]$ | Rejected: fail closed on positive-width overlap, even at endpoint scale. |
| `R_w_A1_A0` | `source_right` | $[1.466528714676,1.669902497690]$ | $[1.669902497690,1.674902497689]$ | Singleton endpoint contact at $1.669902497690$ | Strip-local accepted under Route A. |
| `R_w_A2_A0` | `receiver_right` | $[1.669902497690,3.164200959219]$ | $[1.250000000000,1.674902497689]$ | Positive-width overlap $[1.669902497690,1.674902497689]$ | Rejected: not finite endpoint contact. |
| `R_w_A2_A0` | `source_left` | $[1.466690155900,1.669902497690]$ | $[1.250000000000,1.466690155899]$ | Diagnostic endpoint-scale gap, not accepted after outward rounding | Rejected: no certified Route A contact or certified strict gap. |
| `R_w_A2_A0` | `source_right` | $[1.466690155900,1.669902497690]$ | $[1.669902497690,1.674902497689]$ | Singleton endpoint contact at $1.669902497690$ | Strip-local accepted under Route A. |
| `R_w_A2_A1` | `receiver_left` | $[1.466690155900,1.471528714676]$ | $[1.466528714676,1.675063938914]$ | Positive-width overlap $[1.466690155900,1.471528714676]$ | Rejected: not finite endpoint contact. |
| `R_w_A2_A1` | `receiver_right` | $[1.670063938913,3.164200959219]$ | $[1.466528714676,1.675063938914]$ | Positive-width overlap $[1.670063938913,1.675063938914]$ | Rejected: not finite endpoint contact. |
| `R_w_A2_A1` | `source_left` | $[1.471528714676,1.670063938913]$ | $[1.670063938913,1.675063938914]$ | Singleton endpoint contact at $1.670063938913$ | Strip-local accepted under Route A. |
| `R_w_A2_A1` | `source_right` | $[1.471528714676,1.670063938913]$ | $[1.466528714676,1.471528714676]$ | Singleton endpoint contact at $1.471528714676$ | Strip-local accepted under Route A. |

## Endpoint Contact Table

The following four contacts are the only `w` parent-complement contacts confined to singleton endpoint values in the attempted ranges. The source lift is `0` in each row.

| Parent row | Strip | Contact value | Receiver endpoint | Source endpoint | Source lift | Memory-depth value or range | Exclusion convention | Root-count bound |
| --- | --- | ---: | --- | --- | ---: | --- | --- | --- |
| `R_w_A1_A0` | `source_right` | $1.669902497690$ | $\theta_r=0.170709367399$ | $\theta_s=0.125869003963$ | 0 | $\tau=0.281740312711$ | Endpoint deleted by the approved Route A parent-complement boundary convention; the deleted endpoint is shared with the accepted simple-root subrow boundary. | $[0,0]$ |
| `R_w_A2_A0` | `source_right` | $1.669902497690$ | $\theta_r=0.457747116028$ | $\theta_s=0.125869003963$ | 0 | $\tau=2.085251677498$ | Endpoint deleted by the approved Route A parent-complement boundary convention; the deleted endpoint is shared with the accepted simple-root subrow boundary. | $[0,0]$ |
| `R_w_A2_A1` | `source_left` | $1.670063938913$ | $\theta_r=0.457785341387$ | $\theta_s=0.170446004355$ | 0 | $\tau=1.805406300616$ | Endpoint deleted by the approved Route A parent-complement boundary convention; the deleted endpoint is shared with the accepted simple-root subrow boundary. | $[0,0]$ |
| `R_w_A2_A1` | `source_right` | $1.471528714676$ | $\theta_r=0.373898811563$ | $\theta_s=0.329553995645$ | 0 | $\tau=0.278626695826$ | Endpoint deleted by the approved Route A parent-complement boundary convention; the deleted endpoint is shared with the accepted simple-root subrow boundary. | $[0,0]$ |

For these four rows, strict monotonicity on the regular receiver and source subintervals leaves no off-endpoint crossing. After deleting the listed endpoint contact, the remaining receiver and source images are separated on the open complement pieces.

## Accepted Strip-Local Endpoint Exclusions

The strip-local accepted endpoint exclusions are:

1. `R_w_A1_A0/source_right`
2. `R_w_A2_A0/source_right`
3. `R_w_A2_A1/source_left`
4. `R_w_A2_A1/source_right`

These acceptances are local to this Route A attempt. They do not consume the parent rows because each affected parent row still has at least one rejected complement strip.

## Rejected Strips

| Parent row | Strip | Reason |
| --- | --- | --- |
| `R_w_A1_A0` | `receiver_left` | Positive-width null-coordinate overlap. |
| `R_w_A1_A0` | `source_left` | Positive-width null-coordinate overlap, even though the width is endpoint-scale. |
| `R_w_A2_A0` | `receiver_right` | Positive-width null-coordinate overlap. |
| `R_w_A2_A0` | `source_left` | Diagnostic endpoint-scale gap is not an accepted outward-rounded positive separation certificate. |
| `R_w_A2_A1` | `receiver_left` | Positive-width null-coordinate overlap. |
| `R_w_A2_A1` | `receiver_right` | Positive-width null-coordinate overlap. |

## Parent Row Consumption

| Parent row | Strip-local Route A status | Parent row consumption |
| --- | --- | --- |
| `R_w_A1_A0` | One endpoint-only strip accepted; two strips rejected. | Not consumed. |
| `R_w_A2_A0` | One endpoint-only strip accepted; two strips rejected. | Not consumed. |
| `R_w_A2_A1` | Two endpoint-only strips accepted; two strips rejected. | Not consumed. |

The three `w` parent rows therefore remain blocked. This packet authorizes no update to `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, pass/fail ledgers, or any live pre-ledger state.
