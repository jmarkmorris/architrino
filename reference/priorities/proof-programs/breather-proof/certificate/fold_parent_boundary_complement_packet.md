# Fold Parent Boundary Complement Packet

## Status

This packet is a concrete proof packet for the six fold-adjacent parent boundary complements in packet `seed-doubled-four-arc-cosine-template-v0`.

It does not edit `causal_ledger.json`, does not authorize `branch_chart.json`, and does not promote rows. The current pre-ledger status remains

`preledger_rejected_fold_impulse_and_fold_adjacent_parent_leftovers_remaining`.

The packet records the exact acceptance alternatives needed to consume the six parent rows after the fold-layer constants are accepted on the same packet identity tuple. Route A from `fold_parent_contract_decision_packet.md` is now adopted as a third fail-closed alternative for endpoint-excluded parent complements. Until one of the alternatives is certified for every complement, the six parent rows remain `split_required` with `failure_code=range_overlap_requires_level_split`.

## Source State

The current refined pre-ledger has:

- 140 certified empty rows;
- 6 accepted strict simple-root subrows;
- 16 unresolved live-ledger fold-layer rows with `failure_code=fold_layer_impulse_ceiling_not_evaluated`; `fold_full_interval_constants_certificate.json` supplies accepted fixed-parameter constants for these rows, but the live ledger has not been rewritten;
- 6 unresolved parent rows with `failure_code=range_overlap_requires_level_split`;
- 0 accepted fold-layer rows;
- `branch_chart_authorized=false`.

The six accepted strict simple-root subrows must be preserved. The parent rows are not accepted merely because their interiors contain accepted simple-root subrows: each remaining fold-adjacent boundary complement must also be certified by one of the alternatives below.

## Boundary Complement Acceptance Alternatives

For each fold-adjacent boundary complement $B$ in a parent row on ledger
$$
y\in\{u,w\},
$$
the complement is accepted only if exactly one of the following certificate alternatives is recorded.

### Alternative 1: strict range-empty gap

The complement is accepted as range-empty when
$$
\Delta^y_B
=
\operatorname{dist}\!\big(Y_{\alpha}^{y},Y_{\beta}^{y}\big)
>0.
$$

The strict positive gap must be recorded for the boundary complement itself. The accepted simple-root subrow's source-coverage gap does not certify the boundary complement.

### Alternative 2: coverage by an accepted fold-layer row

The complement is accepted as fold-layer-covered when it is assigned to the relevant separator family
$$
B\in\mathcal{F}_{\Sigma}
$$
and the corresponding fold-layer row is accepted with finite
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty.
$$

The fold-layer acceptance must also preserve the stored separator conditions
$$
\alpha_{\Sigma}>0,
\qquad
\nu_{\mathrm{exit},\Sigma}>0,
\qquad
\Delta N_\Sigma\in2\mathbb{Z},
\qquad
\Delta D_\Sigma=0.
$$

For the `w` ledger, the relevant separator families are $\mathcal{F}_{\Sigma_1}$ and $\mathcal{F}_{\Sigma_2}$. For the `u` ledger, the relevant separator families are $\mathcal{F}_{\Sigma_3}$ and $\mathcal{F}_{\Sigma_4}$.

### Alternative 3: endpoint-excluded boundary complement

The complement is accepted as endpoint-excluded only when all possible contacts between
$$
Y_{\alpha}^{y}(B)
\quad\text{and}\quad
Y_{\beta}^{y}(B)
$$
are confined to a finite listed endpoint-contact set, no off-endpoint crossing is possible, and every listed contact is excluded by the same causal self-interaction or zero-depth endpoint convention used by the diagonal-exclusion subledger.

The certificate must record:

1. outward-rounded interval enclosures for $Y_{\alpha}^{y}(B)$ and $Y_{\beta}^{y}(B)$;
2. the finite contact set
   $$
   Y_{\alpha}^{y}(B)\cap Y_{\beta}^{y}(B);
   $$
3. strict monotonicity, or another accepted no-crossing proof, on the receiver and source intervals after the listed contacts are removed;
4. for each contact, the receiver endpoint, source endpoint, source lift, memory-depth value or range, and the exclusion convention;
5. positive separation after deleting the listed endpoint contacts;
6. root-count bound $[0,0]$ for the complement;
7. a complement-boundary topology convention specifying ownership of shared simple-root and fold-layer boundaries.

This alternative is not a relaxation of strict range-empty closure. If a complement has a positive-width null-coordinate overlap after endpoint contacts are removed, it is not endpoint-excluded and must be rejected or routed to another accepted alternative.

## Row-by-Row Parent Complement Packet

| Parent row | Ledger | Receiver | Source | Accepted simple-root subrow | Source floor | Receiver floor | Source-coverage gap | Memory-depth range | Horizon gap | Sign margin | Root-count bound | Required boundary-complement alternatives |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | ---: | ---: | --- | --- |
| `R_w_A1_A0` | `w` | `A1` | `A0` | `S_w_A1_A0_4` | 0.061926988065 | 0.055761655527 | 0.005 | $[0.281740312711,1.877903023959]$ | 4.405282283221 | 0.281740312711 | $[1,1]$ | Each complement must have $\Delta^w_B>0$, be covered by an accepted row in $\mathcal{F}_{\Sigma_1}$ or $\mathcal{F}_{\Sigma_2}$, or satisfy the endpoint-excluded complement alternative. |
| `R_w_A2_A0` | `w` | `A2` | `A0` | `S_w_A2_A0_5` | 0.061926988065 | 0.061926988065 | 0.005 | $[2.034745625957,2.085251677498]$ | 4.197933629682 | 2.034745625957 | $[1,1]$ | Each complement must have $\Delta^w_B>0$, be covered by an accepted row in $\mathcal{F}_{\Sigma_1}$ or $\mathcal{F}_{\Sigma_2}$, or satisfy the endpoint-excluded complement alternative. |
| `R_w_A2_A1` | `w` | `A2` | `A1` | `S_w_A2_A1_6` | 0.055761655527 | 0.110022164784 | 0.005 | $[0.278626695826,1.805406300616]$ | 4.477779006564 | 0.278626695826 | $[1,1]$ | Each complement must have $\Delta^w_B>0$, be covered by an accepted row in $\mathcal{F}_{\Sigma_1}$ or $\mathcal{F}_{\Sigma_2}$, or satisfy the endpoint-excluded complement alternative. |
| `R_u_A3_A2` | `u` | `A3` | `A2` | `S_u_A3_A2_1` | 0.061926988065 | 0.055761655527 | 0.005 | $[0.281740312711,1.877903023959]$ | 4.405282283221 | 0.281740312711 | $[1,1]$ | Each complement must have $\Delta^u_B>0$, be covered by an accepted row in $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$, or satisfy the endpoint-excluded complement alternative. |
| `R_u_A4_A2` | `u` | `A4` | `A2` | `S_u_A4_A2_2` | 0.061926988065 | 0.061926988065 | 0.005 | $[2.034745625957,2.085251677498]$ | 4.197933629682 | 2.034745625957 | $[1,1]$ | Each complement must have $\Delta^u_B>0$, be covered by an accepted row in $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$, or satisfy the endpoint-excluded complement alternative. |
| `R_u_A4_A3` | `u` | `A4` | `A3` | `S_u_A4_A3_3` | 0.055761655527 | 0.110022164784 | 0.005 | $[0.278626695826,1.805406300616]$ | 4.477779006564 | 0.278626695826 | $[1,1]$ | Each complement must have $\Delta^u_B>0$, be covered by an accepted row in $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$, or satisfy the endpoint-excluded complement alternative. |

## Separator Family Routing

The relevant accepted fold-layer coverage must use the existing separator families and atlas references.

| Separator family | Ledger | Atlas reference | Rows that may cover boundary complements after acceptance |
| --- | --- | --- | --- |
| $\mathcal{F}_{\Sigma_1}$ | `w` | `fold_layer_atlas.json:fold_Sigma_1_w` | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` |
| $\mathcal{F}_{\Sigma_2}$ | `w` | `fold_layer_atlas.json:fold_Sigma_2_w` | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` |
| $\mathcal{F}_{\Sigma_3}$ | `u` | `fold_layer_atlas.json:fold_Sigma_3_u` | `R_u_F3_A2`, `R_u_F3_F3`, `R_u_A3_F3`, `R_u_A4_F3` |
| $\mathcal{F}_{\Sigma_4}$ | `u` | `fold_layer_atlas.json:fold_Sigma_4_u` | `R_u_F4_A2`, `R_u_F4_A3`, `R_u_F4_F4`, `R_u_A4_F4` |

Coverage by a separator family is available only after the relevant fold-layer rows have accepted finite constants on the same packet identity tuple:
$$
C_\Sigma<\infty,
\qquad
A_{\Sigma,\eta,\epsilon_c}<\infty,
\qquad
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty.
$$

Diagnostic, off-packet, or scratch constants do not provide coverage.

## Pass Criteria

This parent-complement packet passes only if all of the following hold on the same packet identity tuple:

1. Each of the six accepted simple-root subrows remains accepted with its recorded source floor, receiver floor, source-coverage gap, memory-depth range, horizon gap, sign margin, and root-count bound $[1,1]$.
2. Every boundary complement of each parent row is explicitly classified as one of:
   $$
   \Delta^y_B>0
   $$
   for a strict range-empty complement, or
   $$
   B\in\mathcal{F}_{\Sigma}
   $$
   for a complement covered by an accepted fold-layer row with finite $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}$, or an endpoint-excluded complement with a finite endpoint-contact table, no off-endpoint crossing, positive separation after deleting listed contacts, and root-count bound $[0,0]$.
3. The relevant separator family is one of $\mathcal{F}_{\Sigma_1}$, $\mathcal{F}_{\Sigma_2}$, $\mathcal{F}_{\Sigma_3}$, or $\mathcal{F}_{\Sigma_4}$ as routed above.
4. No boundary complement remains `split_required`.
5. No fold-layer row is promoted to `simple_root`, and no separator-layer contribution is evaluated with a branch-sum formula using a collapsing $|J_y|^{-1}$ factor.
6. The 140 already accepted empty rows retain their positive range gaps.

If these conditions hold after accepted fold-layer constants are recorded, the six parent rows are consumed by their accepted strict simple-root subrows plus accepted boundary complements. This still does not by itself authorize `branch_chart.json`; authorization requires the full pre-ledger update to close every unresolved row.

## Fail Criteria

This parent-complement packet fails if any one of the following occurs:

- any accepted simple-root subrow loses one of its recorded strict margins or root-count bound $[1,1]$;
- any boundary complement is neither strict range-empty, covered by an accepted fold-layer row, nor accepted as an endpoint-excluded complement;
- any endpoint-excluded complement has a positive-width null-coordinate overlap after deleting the listed endpoint contacts;
- any endpoint-excluded complement lacks a complement-boundary topology convention or root-count bound $[0,0]$;
- a complement is assigned to a separator family whose fold-layer row still has `accepted_as_fold_layer=false`;
- any required fold-layer constant is absent, infinite, diagnostic-only, off-packet, or not tied to the same packet identity tuple;
- any separator loses $\alpha_{\Sigma}>0$, $\nu_{\mathrm{exit},\Sigma}>0$, $\Delta N_\Sigma\in2\mathbb{Z}$, or $\Delta D_\Sigma=0$;
- any fold-layer row is reclassified as a simple-root branch;
- `branch_chart.json` is produced before the full pre-ledger has no `split_required` rows.

## Diagnostic-Only Constants Blocker

The exact blocker that remains if constants are diagnostic-only is:

`fold_layer_impulse_ceiling_not_evaluated` remains active on the 16 fold-layer rows, so the separator families $\mathcal{F}_{\Sigma_1}$, $\mathcal{F}_{\Sigma_2}$, $\mathcal{F}_{\Sigma_3}$, and $\mathcal{F}_{\Sigma_4}$ are not accepted coverage families. Therefore the six parent rows remain `split_required` with `failure_code=range_overlap_requires_level_split`, because their accepted simple-root interiors do not certify the fold-adjacent boundary complements.

Equivalently, with diagnostic-only constants:

| Artifact or row class | Correct remaining state |
| --- | --- |
| 16 fold-layer rows | Remain `split_required` with `failure_code=fold_layer_impulse_ceiling_not_evaluated`. |
| 6 fold-adjacent parent rows | Remain `split_required` with `failure_code=range_overlap_requires_level_split`. |
| `causal_ledger.json` | Remains rejected. |
| `branch_chart.json` | Remains unauthorized and absent. |

## Certificate Update Target

The next accepted certificate update must record, for every boundary complement of the six parent rows, either a strict positive gap
$$
\Delta^y_B>0
$$
or the exact separator-family membership
$$
B\in\mathcal{F}_{\Sigma}
$$
with finite
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty.
$$
It may instead record the endpoint-excluded complement alternative, but only with a finite endpoint-contact table, no off-endpoint crossing, positive separation after deleting the listed contacts, root-count bound $[0,0]$, and an explicit complement-boundary topology convention.

Only after the 16 fold-layer rows and the six parent boundary-complement packets are accepted may the pre-ledger become eligible to set `branch_chart_authorized=true`.
