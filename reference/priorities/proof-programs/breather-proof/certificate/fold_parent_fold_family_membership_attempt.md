# Fold Parent Fold-Family Membership Attempt

## Scope

This packet checks whether every named parent-complement strip in `fold_parent_complement_partition_attempt.md` has exact membership in one of the accepted fold-layer families on the same packet identity tuple.

Inputs read for this pass:

- `fold_parent_complement_partition_attempt.md`
- `fold_full_interval_constants_certificate.json`
- `fold_parent_boundary_complement_packet.md`
- `fold_layer_atlas.json`
- `mesh_refined_preledger_v1.json`
- `causal_ledger.json`

The checked packet identity tuple is:

| Field | Value |
| --- | --- |
| `packet_id` | `seed-doubled-four-arc-cosine-template-v0` |
| `refinement_id` | `preledger-separator-level-split-v1` |
| $T_{\mathrm{cyc}}$ | 6.28318530718 |
| Fold-constant parameters | $\eta=0.02$, $\epsilon_c=0.05$, $\Gamma=1$ |

This packet does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, pass/fail ledgers, or files owned by other workers.

## Verdict

Rejected as an exact parent-complement fold-family membership certificate.

No named parent-complement strip is covered exactly by an accepted fold-layer row on the same packet identity tuple. The obstruction is not the fixed-parameter fold-constant calculation: `fold_full_interval_constants_certificate.json` records accepted finite constants for the 16 fold-layer row rectangles. The obstruction is exact set membership. Every named parent-complement strip is a subrectangle of a regular-parent row with receiver/source interval ids of the form `A*` and `A*`; every accepted fold-layer row rectangle in the relevant separator families has at least one interval id equal to `F1`, `F2`, `F3`, or `F4`.

Consequently, the current parent-complement strips satisfy neither already-recorded acceptance alternative:

$$
\Delta^y_B>0
$$

nor exact recorded membership

$$
B\in\mathcal{F}_{\Sigma}.
$$

No live ledger update is authorized.

## Accepted Fold-Layer Families Used For Comparison

The fixed-parameter constants certificate records finite accepted constants for the following row rectangles. The live `fold_layer_atlas.json` still records `accepted_fold_layer_rows=0`, so this comparison is intentionally limited to the accepted constants packet and does not promote live atlas state.

| Separator family | Ledger | Fold interval | Accepted fold-layer row rectangles in constants certificate | Fold theta range |
| --- | --- | --- | --- | --- |
| $\mathcal{F}_{\Sigma_1}$ | `w` | `F1` | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` | $[0.135083617650,0.160083617650]$ |
| $\mathcal{F}_{\Sigma_2}$ | `w` | `F2` | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` | $[0.339916382350,0.364916382350]$ |
| $\mathcal{F}_{\Sigma_3}$ | `u` | `F3` | `R_u_F3_A2`, `R_u_F3_F3`, `R_u_A3_F3`, `R_u_A4_F3` | $[0.635083617650,0.660083617650]$ |
| $\mathcal{F}_{\Sigma_4}$ | `u` | `F4` | `R_u_F4_A2`, `R_u_F4_A3`, `R_u_F4_F4`, `R_u_A4_F4` | $[0.839916382350,0.864916382350]$ |

## Strip Membership Comparison

The table below compares each named strip against the only relevant separator families allowed by `fold_parent_boundary_complement_packet.md`. "Exact row match" means that the strip has the same receiver interval id, source interval id, and theta rectangle as one accepted fold-layer row rectangle. Shared endpoints are not exact membership.

| Parent row | Strip | Strip receiver interval id and $\theta$ range | Strip source interval id and $\theta$ range | Relevant accepted fold-layer rows | Exact row match | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| `R_w_A1_A0` | `receiver_left` | `A1`, $[0.160083617650,0.170709367399]$ | `A0`, $[0,0.135083617650]$ | $\mathcal{F}_{\Sigma_1}$: `F1/A0`, `F1/F1`, `A1/F1`, `A2/F1`; $\mathcal{F}_{\Sigma_2}$: `F2/A0`, `F2/A1`, `F2/F2`, `A2/F2` | No. Receiver is regular `A1`, not `F1` or `F2`; source is not `F1` or `F2`. | rejected |
| `R_w_A1_A0` | `source_left` | `A1`, $[0.170709367399,0.339916382350]$ | `A0`, $[0,0.041038833440]$ | Same `w` rows as above. | No. Rectangle is an `A1/A0` subrectangle; no accepted `w` fold-layer row has `A1/A0`. | rejected |
| `R_w_A1_A0` | `source_right` | `A1`, $[0.170709367399,0.339916382350]$ | `A0`, $[0.125869003963,0.135083617650]$ | Same `w` rows as above. | No. Source touches the `F1` endpoint but remains inside `A0`; exact source interval id is not `F1`. | rejected |
| `R_w_A2_A0` | `receiver_right` | `A2`, $[0.457747116028,0.635083617650]$ | `A0`, $[0,0.135083617650]$ | Same `w` rows as above. | No. `R_w_F2_A0` has source `A0` but receiver `F2`, not the listed `A2` subrange. | rejected |
| `R_w_A2_A0` | `source_left` | `A2`, $[0.364916382350,0.457747116028]$ | `A0`, $[0,0.041076558044]$ | Same `w` rows as above. | No. Receiver starts at the right endpoint of `F2` but lies in regular `A2`; source is `A0`, not `F1` or `F2`. | rejected |
| `R_w_A2_A0` | `source_right` | `A2`, $[0.364916382350,0.457747116028]$ | `A0`, $[0.125869003963,0.135083617650]$ | Same `w` rows as above. | No. The source touches the `F1` endpoint and the receiver touches the `F2` endpoint, but the strip remains `A2/A0`. | rejected |
| `R_w_A2_A1` | `receiver_left` | `A2`, $[0.364916382350,0.373898811563]$ | `A1`, $[0.160083617650,0.339916382350]$ | Same `w` rows as above. | No. Receiver is regular `A2` and source is regular `A1`; no accepted `w` fold-layer row has `A2/A1`. | rejected |
| `R_w_A2_A1` | `receiver_right` | `A2`, $[0.457785341387,0.635083617650]$ | `A1`, $[0.160083617650,0.339916382350]$ | Same `w` rows as above. | No. Rectangle is an `A2/A1` subrectangle; accepted `A2` receiver rows require source `F1` or `F2`. | rejected |
| `R_w_A2_A1` | `source_left` | `A2`, $[0.373898811563,0.457785341387]$ | `A1`, $[0.160083617650,0.170446004355]$ | Same `w` rows as above. | No. Source touches the `F1` endpoint but remains inside `A1`; accepted rows with receiver `A2` require source `F1` or `F2`. | rejected |
| `R_w_A2_A1` | `source_right` | `A2`, $[0.373898811563,0.457785341387]$ | `A1`, $[0.329553995645,0.339916382350]$ | Same `w` rows as above. | No. Source touches the `F2` endpoint but remains inside `A1`; exact source interval id is not `F2`. | rejected |
| `R_u_A3_A2` | `receiver_left` | `A3`, $[0.660083617650,0.670709367399]$ | `A2`, $[0.364916382350,0.635083617650]$ | $\mathcal{F}_{\Sigma_3}$: `F3/A2`, `F3/F3`, `A3/F3`, `A4/F3`; $\mathcal{F}_{\Sigma_4}$: `F4/A2`, `F4/A3`, `F4/F4`, `A4/F4` | No. Receiver touches the `F3` endpoint but lies in regular `A3`; source is `A2`, not `F3` or `F4`. | rejected |
| `R_u_A3_A2` | `source_left` | `A3`, $[0.670709367399,0.839916382350]$ | `A2`, $[0.364916382350,0.541038833440]$ | Same `u` rows as above. | No. Rectangle is an `A3/A2` subrectangle; no accepted `u` fold-layer row has `A3/A2`. | rejected |
| `R_u_A3_A2` | `source_right` | `A3`, $[0.670709367399,0.839916382350]$ | `A2`, $[0.625869003963,0.635083617650]$ | Same `u` rows as above. | No. Source touches the `F3` endpoint but remains inside `A2`; exact source interval id is not `F3`. | rejected |
| `R_u_A4_A2` | `receiver_right` | `A4`, $[0.957747116028,1]$ | `A2`, $[0.364916382350,0.635083617650]$ | Same `u` rows as above. | No. `R_u_F4_A2` has source `A2` but receiver `F4`, not the listed `A4` subrange. | rejected |
| `R_u_A4_A2` | `source_left` | `A4`, $[0.864916382350,0.957747116028]$ | `A2`, $[0.364916382350,0.541076558044]$ | Same `u` rows as above. | No. Receiver starts at the right endpoint of `F4` but lies in regular `A4`; source is `A2`, not `F3` or `F4`. | rejected |
| `R_u_A4_A2` | `source_right` | `A4`, $[0.864916382350,0.957747116028]$ | `A2`, $[0.625869003963,0.635083617650]$ | Same `u` rows as above. | No. The source touches the `F3` endpoint and the receiver touches the `F4` endpoint, but the strip remains `A4/A2`. | rejected |
| `R_u_A4_A3` | `receiver_left` | `A4`, $[0.864916382350,0.873898811563]$ | `A3`, $[0.660083617650,0.839916382350]$ | Same `u` rows as above. | No. Receiver is regular `A4` and source is regular `A3`; no accepted `u` fold-layer row has `A4/A3`. | rejected |
| `R_u_A4_A3` | `receiver_right` | `A4`, $[0.957785341387,1]$ | `A3`, $[0.660083617650,0.839916382350]$ | Same `u` rows as above. | No. Rectangle is an `A4/A3` subrectangle; accepted `A4` receiver rows require source `F3` or `F4`. | rejected |
| `R_u_A4_A3` | `source_left` | `A4`, $[0.873898811563,0.957785341387]$ | `A3`, $[0.660083617650,0.670446004355]$ | Same `u` rows as above. | No. Source touches the `F3` endpoint but remains inside `A3`; accepted rows with receiver `A4` require source `F3` or `F4`. | rejected |
| `R_u_A4_A3` | `source_right` | `A4`, $[0.873898811563,0.957785341387]$ | `A3`, $[0.829553995645,0.839916382350]$ | Same `u` rows as above. | No. Source touches the `F4` endpoint but remains inside `A3`; exact source interval id is not `F4`. | rejected |

## Exactly Covered Strips

None.

Every named strip is adjacent to, or endpoint-touching with, one or more fold-layer intervals, but no strip is itself one of the accepted fold-layer row rectangles in `fold_full_interval_constants_certificate.json`.

## Minimal New Theorem Needed

The minimal new theorem is not another fold-constant theorem. It is a parent-complement coverage theorem that turns endpoint-adjacent regular strips into accepted boundary-complement coverage without changing their interval ids.

One sufficient theorem statement is:

**Regular Parent Boundary Strip Coverage Theorem.** For the packet identity tuple
`seed-doubled-four-arc-cosine-template-v0`, `preledger-separator-level-split-v1`, $T_{\mathrm{cyc}}=6.28318530718$, $\eta=0.02$, $\epsilon_c=0.05$, and $\Gamma=1$, each named boundary strip $B$ in `fold_parent_complement_partition_attempt.md` is accepted if either:

1. $B$ has a certified strict parent-complement gap
   $$
   \Delta^y_B>0,
   $$
   with outward-rounded endpoint enclosures recorded for $B$ itself; or
2. $B$ is covered by a new explicitly recorded regular-boundary membership relation
   $$
   B\in\overline{\mathcal{F}}_{\Sigma}^{\mathrm{bdry}}
   $$
   whose definition includes regular-side subrectangles adjacent to the accepted fold-layer interval, preserves the same separator conditions
   $$
   \alpha_{\Sigma}>0,
   \qquad
   \nu_{\mathrm{exit},\Sigma}>0,
   \qquad
   \Delta N_\Sigma\in2\mathbb{Z},
   \qquad
   \Delta D_\Sigma=0,
   $$
   and proves that the already accepted fixed-parameter fold constants dominate the regular-boundary contribution on the same packet identity tuple.

This theorem would be a new coverage theorem, not an exact membership theorem for the currently accepted fold-layer families. Without it, the parent complements remain outside the accepted fold-layer row rectangles.

## Live Ledger Authorization

| Artifact | Authorized by this packet? | Reason |
| --- | --- | --- |
| `causal_ledger.json` | No | The six parent rows remain `split_required` with `failure_code=range_overlap_requires_level_split`; exact fold-family membership is rejected for all named strips. |
| `fold_layer_atlas.json` | No | This packet does not alter live atlas state; the read atlas records `accepted_fold_layer_rows=0`. |
| `branch_chart.json` | No | `fold_full_interval_constants_certificate.json` has `branch_chart_authorized=false`, and the parent-complement strips are not closed. |
| Pass/fail ledgers | No | This packet is a rejected proof attempt and does not promote rows. |

## Closure Statement

The parent-complement problem is now separated into two facts:

1. Finite fixed-parameter fold constants exist for the 16 fold-layer row rectangles in the constants certificate.
2. The 20 named regular-parent complement strips are not exact members of those fold-layer row rectangles.

Therefore the current proof program cannot consume the six fold-adjacent parent rows by exact fold-family membership alone.
