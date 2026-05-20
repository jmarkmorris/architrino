# Fold Parent Endpoint `u` Closure Attempt

## Scope

This packet attempts endpoint-exclusion closure for the `u` parent-complement strips listed in `fold_parent_complement_partition_attempt.md` under approved Route A from `fold_parent_contract_decision_packet.md`.

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

Rejected as a closure certificate for the three `u` parent rows.

The Route A endpoint-exclusion alternative can only consume a strip when the null-coordinate intersection is confined to a finite endpoint-contact set, strict monotonicity or an equivalent no-crossing argument excludes off-endpoint crossing, the listed contacts are deleted by an explicit endpoint convention, and the remaining separation is positive with root-count bound $[0,0]$.

That condition fails for the `u` parent-complement family because seven of the ten strips have positive-width null-coordinate overlap in the recorded $u$ ranges. These are not finite endpoint-contact sets. The attempt therefore fails closed before any live pre-ledger update.

## Per-Strip Classification

The following table uses the `u` ranges recorded in `fold_parent_complement_partition_attempt.md`. For positive-width overlaps, outward rounding can only preserve or enlarge the obstruction, so the strip is rejected without an endpoint-contact table. For endpoint-scale diagnostic separation, the strip is also rejected because the earlier partition packet records that it is not accepted after rounding.

| Parent row | Strip | Receiver $u$ range | Source $u$ range | Intersection or diagnostic gap | Type | Route A strip status |
| --- | --- | --- | --- | --- | --- | --- |
| `R_u_A3_A2` | `receiver_left` | $[4.811495151279,4.816656592503]$ | $[3.118984347961,4.816495151279]$ | $[4.811495151279,4.816495151279]$, width $0.005$ | positive-width overlap | Rejected: not a finite endpoint-contact set. |
| `R_u_A3_A2` | `source_left` | $[4.608121368266,4.811495151279]$ | $[3.118984347961,4.608121368267]$ | $[4.608121368266,4.608121368267]$, width about $10^{-12}$ | positive-width overlap | Rejected: fail closed; positive-width overlap, even at endpoint scale. |
| `R_u_A3_A2` | `source_right` | $[4.608121368266,4.811495151279]$ | $[4.811495151279,4.816495151279]$ | $\{4.811495151279\}$ | finite endpoint contact | Locally endpoint-excludable with root-count bound $[0,0]$. |
| `R_u_A4_A2` | `receiver_right` | $[4.811495151280,5.033185307180]$ | $[3.118984347961,4.816495151279]$ | $[4.811495151280,4.816495151279]$, width about $0.005$ | positive-width overlap | Rejected: not a finite endpoint-contact set. |
| `R_u_A4_A2` | `source_left` | $[4.608282809490,4.811495151280]$ | $[3.118984347961,4.608282809489]$ | diagnostic separation about $10^{-12}$ | endpoint-scale separated, not accepted after rounding | Rejected: no certified strict gap and no endpoint contact to delete. |
| `R_u_A4_A2` | `source_right` | $[4.608282809490,4.811495151280]$ | $[4.811495151279,4.816495151279]$ | $[4.811495151279,4.811495151280]$, width about $10^{-12}$ | positive-width overlap | Rejected: fail closed; positive-width overlap, even at endpoint scale. |
| `R_u_A4_A3` | `receiver_left` | $[4.608282809490,4.613121368266]$ | $[4.608121368266,4.816656592503]$ | $[4.608282809490,4.613121368266]$, width about $0.004838558776$ | positive-width overlap | Rejected: not a finite endpoint-contact set. |
| `R_u_A4_A3` | `receiver_right` | $[4.811656592503,5.033185307180]$ | $[4.608121368266,4.816656592503]$ | $[4.811656592503,4.816656592503]$, width $0.005$ | positive-width overlap | Rejected: not a finite endpoint-contact set. |
| `R_u_A4_A3` | `source_left` | $[4.613121368266,4.811656592503]$ | $[4.811656592503,4.816656592503]$ | $\{4.811656592503\}$ | finite endpoint contact | Locally endpoint-excludable with root-count bound $[0,0]$. |
| `R_u_A4_A3` | `source_right` | $[4.613121368266,4.811656592503]$ | $[4.608121368266,4.613121368266]$ | $\{4.613121368266\}$ | finite endpoint contact | Locally endpoint-excludable with root-count bound $[0,0]$. |

## Endpoint Contact Table

Only the finite-contact strips are listed here. Source lift is $0$ for all three contacts. The memory-depth values below match the endpoint values of the accepted simple-root subrow memory-depth ranges in `mesh_refined_preledger_v1.json`.

| Parent row | Strip | Contact value | Receiver endpoint | Source endpoint | Source lift | Memory-depth value | Exclusion convention | Root-count bound |
| --- | --- | ---: | --- | --- | ---: | ---: | --- | --- |
| `R_u_A3_A2` | `source_right` | $4.811495151279$ | $\theta_r=0.670709367399$ | $\theta_s=0.625869003963$ | 0 | $0.281740312711$ | shared simple-root boundary contact deleted by Route A half-open parent-complement ownership | $[0,0]$ |
| `R_u_A4_A3` | `source_left` | $4.811656592503$ | $\theta_r=0.957785341387$ | $\theta_s=0.670446004355$ | 0 | $1.805406300616$ | shared simple-root boundary contact deleted by Route A half-open parent-complement ownership | $[0,0]$ |
| `R_u_A4_A3` | `source_right` | $4.613121368266$ | $\theta_r=0.873898811563$ | $\theta_s=0.829553995645$ | 0 | $0.278626695826$ | shared simple-root boundary contact deleted by Route A half-open parent-complement ownership | $[0,0]$ |

For these three finite contacts, monotonicity on the recorded receiver and source intervals gives no off-endpoint crossing. After deleting the listed endpoint contact, the remaining one-sided separation is positive by the same monotone endpoint ordering used in the partition packet.

## Accepted Strips

Accepted locally by the Route A endpoint-exclusion test:

- `R_u_A3_A2` / `source_right`
- `R_u_A4_A3` / `source_left`
- `R_u_A4_A3` / `source_right`

These local acceptances do not consume any full parent row because each affected parent row must have all of its boundary complement strips accepted, and unresolved or rejected strips remain.

## Rejected Strips

Rejected for positive-width null-coordinate overlap:

- `R_u_A3_A2` / `receiver_left`
- `R_u_A3_A2` / `source_left`
- `R_u_A4_A2` / `receiver_right`
- `R_u_A4_A2` / `source_right`
- `R_u_A4_A3` / `receiver_left`
- `R_u_A4_A3` / `receiver_right`

Rejected for endpoint-scale diagnostic separation that is not accepted after outward rounding:

- `R_u_A4_A2` / `source_left`

## Parent-Row Consumption

| Parent row | Boundary strips accepted | Boundary strips rejected or unresolved | Can parent row be consumed? |
| --- | ---: | ---: | --- |
| `R_u_A3_A2` | 1 | 2 | No |
| `R_u_A4_A2` | 0 | 3 | No |
| `R_u_A4_A3` | 2 | 2 | No |

The three `u` parent rows cannot be consumed. The root-count bound $[0,0]$ is available only for the three locally endpoint-excludable strips, not for any full `u` parent-complement family.

## Live Ledger Authorization

No live ledger updates are authorized.

| Artifact or state | Authorization |
| --- | --- |
| Three `u` parent rows | Not consumed. |
| `causal_ledger.json` | No update authorized. |
| `fold_layer_atlas.json` | No update authorized. |
| `branch_chart.json` | No creation or authorization. |
| Pass/fail ledgers | No update authorized by this packet. |

The exact fail-closed blocker is positive-width null-coordinate overlap in the `u` parent-complement strips, not merely finite endpoint contact.
