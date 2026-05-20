# Fold Parent Regular-Boundary Coverage Attempt

## Scope

This packet integrates the regular-boundary probes for packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`.

Sources read:

- `fold_parent_regular_boundary_w_probe.md`
- `fold_parent_regular_boundary_u_probe.md`
- `fold_parent_regular_boundary_contract_probe.md`
- `fold_parent_w_positive_overlap_subdivision_attempt.md`
- `fold_parent_u_positive_overlap_subdivision_attempt.md`
- `fold_parent_boundary_complement_packet.md`
- `fold_parent_fold_family_membership_attempt.md`
- `fold_full_interval_constants_certificate.json`
- `fold_layer_atlas.json`

This packet does not edit `causal_ledger.json`, does not edit `fold_layer_atlas.json`, does not create `branch_chart.json`, and does not promote any live pre-ledger row.

## Verdict

Rejected as a parent-row consumption certificate.

The residual equality cores are diagnostically adjacent to the four separator families, but they are not accepted by the current fold-layer coverage alternative. The current alternative accepts only exact coverage by the already named fold-layer row rectangles:
$$
\mathcal{F}_{\Sigma_1},
\quad
\mathcal{F}_{\Sigma_2},
\quad
\mathcal{F}_{\Sigma_3},
\quad
\mathcal{F}_{\Sigma_4}.
$$
The residual cores are regular-side `A* / A*`, `A* / A0`, or `A* / A2` subrectangles. They are not exact `F*` row rectangles, and `fold_parent_fold_family_membership_attempt.md` already rejects exact fold-family membership for the parent-complement strips.

A finite regular-boundary theorem can be stated as a future target, but the present packet set does not satisfy it. The missing fields are:

1. a finite same-packet definition of
   $$
   \overline{\mathcal{F}}_{\Sigma}^{\mathrm{bdry}}
   $$
   by named residual cores;
2. exact inclusion of every residual core in that finite regular-boundary family;
3. a same-packet domination inequality proving that the accepted fixed-parameter fold ceiling covers the fold rows plus the added regular-boundary cores, or a separately accepted enlarged ceiling;
4. topology and ownership fields preventing double counting of accepted simple-root boundary branches;
5. accepted strict-gap closure for the endpoint-scale separated non-core strips `R_w_A2_A0/source_left` and `R_u_A4_A2/source_left`, unless a separate accepted alternative closes them.

Without those fields, accepting the residual cores would silently expand the fold-layer coverage domain and would risk evaluating the same boundary branch both as a simple-root branch and as fold-covered regular-boundary material.

## Regular-Boundary Contract Test

The minimal theorem target from `fold_parent_regular_boundary_contract_probe.md` is:

> Fix the exact packet identity tuple and the accepted fixed-parameter constants at
> $$
> \eta=0.02,\qquad \epsilon_c=0.05,\qquad \Gamma=1.
> $$
> A finite list of residual equality cores may be consumed only if every core has an outward-rounded rectangle, an exact separator assignment, an inclusion proof
> $$
> C\in\overline{\mathcal{F}}_{\Sigma}^{\mathrm{bdry}},
> $$
> preserved separator conditions, a same-packet domination inequality, and an explicit no-double-counting rule against simple-root branches and endpoint-excluded complements.

The current artifacts pass only the diagnostic enumeration part of this target. They do not prove inclusion or domination.

The accepted fixed-parameter certificate records finite values such as
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
=
11289.90742089375
$$
for each separator aggregate, but those values were accepted for the 16 fold-layer row rectangles only. No artifact proves that the same aggregate bound has slack for the residual regular-side cores.

## Residual-Core Routing Summary

| Lane | Residual cores inspected | Diagnostic separator routing | Current-contract verdict |
| --- | ---: | --- | --- |
| `w` | 5 equality cores plus one endpoint-scale strict-gap failure | Cores are adjacent to $\Sigma_1$ or $\Sigma_2$. | Rejected: none is an exact member of $\mathcal{F}_{\Sigma_1}$ or $\mathcal{F}_{\Sigma_2}$, and `R_w_A2_A0/source_left` lacks an accepted outward-rounded strict gap. |
| `u` | 6 equality cores plus one endpoint-scale strict-gap failure | Cores are adjacent to $\Sigma_3$ or $\Sigma_4$. | Rejected: none is an exact member of $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$, and `R_u_A4_A2/source_left` lacks an accepted outward-rounded strict gap. |

## Parent Row Consumption

| Parent row | Current locally accepted pieces | Remaining blocker | Parent row consumed? |
| --- | --- | --- | --- |
| `R_w_A1_A0` | `source_right` endpoint-excluded locally. | `receiver_left` and `source_left` fail regular-boundary coverage. | No |
| `R_w_A2_A0` | `source_right` endpoint-excluded locally. | `receiver_right` fails regular-boundary coverage; `source_left` has no accepted strict gap. | No |
| `R_w_A2_A1` | `source_left` and `source_right` endpoint-excluded locally. | `receiver_left` and `receiver_right` fail regular-boundary coverage. | No |
| `R_u_A3_A2` | `source_right` endpoint-excluded locally. | `receiver_left` and `source_left` fail regular-boundary coverage. | No |
| `R_u_A4_A2` | None. | `receiver_right` and `source_right` fail regular-boundary coverage; `source_left` has no accepted strict gap. | No |
| `R_u_A4_A3` | `source_left` and `source_right` endpoint-excluded locally. | `receiver_left` and `receiver_right` fail regular-boundary coverage. | No |

## Consequence

The current cosine packet has now failed all attempted parent-complement closure routes in this finite certificate chain:

1. strict range-empty gaps fail on the natural strip partition;
2. exact fold-family membership fails for all named parent-complement strips;
3. endpoint exclusion locally accepts seven singleton contacts but fails complete parent-row closure;
4. finer threshold subdivision identifies diagnostic empty wings but leaves residual equality cores or uncertified endpoint-scale gaps;
5. regular-boundary coverage is not satisfied by the current artifacts because inclusion, domination, and ownership fields are absent.

Therefore the current packet remains rejected before branch-chart certification. No live pre-ledger update is authorized.

## Live Ledger Authorization

| Artifact or state | Authorization |
| --- | --- |
| Six fold-adjacent parent rows | Not consumed. |
| 16 fold-layer rows | Fixed-parameter constants exist externally, but live rows are not rewritten by this packet. |
| `causal_ledger.json` | No update authorized. |
| `fold_layer_atlas.json` | No update authorized. |
| `branch_chart.json` | No creation or authorization. |

## Capture Decision

Priority-only. This packet records a failed proof route and a precise future theorem-field target. It should not be promoted into `content/markdown/aaa` unless a later packet proves the regular-boundary inclusion and domination fields or uses this failure as a reader-facing example in a proof-program discussion.
