# Fold Parent Regular-Boundary `w` Probe

## Scope

This packet checks the residual `w` equality cores left after:

- `fold_parent_endpoint_w_closure_attempt.md`;
- `fold_parent_w_positive_overlap_subdivision_attempt.md`;
- `fold_parent_fold_family_membership_attempt.md`;
- `fold_parent_boundary_complement_packet.md`;
- `fold_full_interval_constants_certificate.json`;
- `fold_layer_atlas.json`;
- `mesh_refined_preledger_v1.json`.

It asks whether any residual core can be consumed by the currently accepted separator-family coverage for $\mathcal{F}_{\Sigma_1}$ or $\mathcal{F}_{\Sigma_2}$ without expanding beyond accepted fold-layer rows or double-counting accepted simple-root branches.

This packet does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, `pass_fail_ledger.md`, the integrated regular-boundary attempt, or any `u` lane file.

## Verdict

Rejected as a parent-row consumption certificate.

Under the current contract, none of the residual `w` equality cores is covered by accepted separator-family coverage. Each core can be associated with a nearby separator event, but the actual core rectangle remains a regular-side `A* / A*` or regular-side `A* / A0` subrectangle. The accepted fixed-parameter fold rows for the `w` separators are only:

| Separator | Accepted row rectangles in the constants certificate |
| --- | --- |
| $\mathcal{F}_{\Sigma_1}$ | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` |
| $\mathcal{F}_{\Sigma_2}$ | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` |

No residual equality core has receiver interval id `F1` or `F2`, or source interval id `F1` or `F2`, in the exact way required by those accepted row rectangles. Treating a regular-side residual core as covered would therefore require a new regular-boundary coverage theorem, not a use of the current fold-layer rows.

Consequently:

| Question | Answer |
| --- | --- |
| Can any residual `w` equality core be consumed under the current contract? | No. |
| Can any residual core be mapped to $\Sigma_1$ or $\Sigma_2$ as a nearby regular-boundary target? | Yes, diagnostically only. |
| Does diagnostic separator adjacency imply accepted coverage? | No. |
| Would accepting these cores now expand the accepted fold-layer rows? | Yes. |
| Would accepting them without a boundary-topology field risk double-counting simple-root branches? | Yes, for cores sharing simple-root endpoints. |
| Can any `w` parent row be consumed by this packet? | No. |

## Residual Core Coverage Table

| Parent row | Residual core from subdivision packet | Nearest separator routing | Current accepted row that would be needed | Current-contract result |
| --- | --- | --- | --- | --- |
| `R_w_A1_A0` | `receiver_left`: $[0.160536675649330,0.170709367399]\times[0.125869003963000,0.135083617650]$ | $\Sigma_1$, because the source edge meets the left side of `F1` and the receiver lies on the right regular side. | No exact row. It is not `R_w_F1_A0` because receiver is regular `A1`, and not `R_w_A1_F1` because source is regular `A0`. | Rejected. Diagnostic $\Sigma_1$ adjacency only. |
| `R_w_A1_A0` | `source_left`: endpoint-scale core at the upper `A1` boundary and the source threshold near $0.041038833440$ | $\Sigma_2$, because the receiver edge lies at the left boundary of `F2`. | No exact row. It is not `R_w_F2_A0` because receiver is regular `A1`, not `F2`. | Rejected. Diagnostic $\Sigma_2$ adjacency only. |
| `R_w_A2_A0` | `receiver_right`: $[0.457747116028,0.458923441955692]\times[0.125869003963000,0.135083617650]$ | $\Sigma_1$, because the source edge meets the left side of `F1` while receiver remains in regular `A2`. | No exact row. It is not `R_w_A2_F1` because source is regular `A0`, not `F1`. | Rejected. Diagnostic $\Sigma_1$ adjacency only. |
| `R_w_A2_A1` | `receiver_left`: $[0.364916382350,0.373898811563]\times[0.329553995645000,0.339463324350670]$ | $\Sigma_2$, because receiver is right-regular adjacent to `F2` and source is left-regular adjacent to `F2`. | No exact row. It is not `R_w_F2_A1` because receiver is regular `A2`, and not `R_w_A2_F2` because source is regular `A1`. | Rejected. Diagnostic $\Sigma_2$ adjacency only. |
| `R_w_A2_A1` | `receiver_right`: $[0.457785341387,0.458961166560311]\times[0.160083617650,0.170446004355000]$ | $\Sigma_1$, because source is right-regular adjacent to `F1` and receiver remains in regular `A2`. | No exact row. It is not `R_w_A2_F1` because source is regular `A1`, not `F1`. | Rejected. Diagnostic $\Sigma_1$ adjacency only. |

The `R_w_A2_A0/source_left` strip is not listed as a residual equality core here. The subdivision packet classifies it as a diagnostic strict-empty candidate whose outward-rounded positive gap is not accepted.

## Simple-Root Ownership Check

The accepted simple-root rows in this `w` lane are:

| Simple-root row | Receiver interval | Source interval | Accepted theta rectangle |
| --- | --- | --- | --- |
| `S_w_A1_A0_4` | `A1` | `A0` | $[0.170709367399,0.339916382350]\times[0.041038833440,0.125869003963]$ |
| `S_w_A2_A0_5` | `A2` | `A0` | $[0.364916382350,0.457747116028]\times[0.041076558044,0.125869003963]$ |
| `S_w_A2_A1_6` | `A2` | `A1` | $[0.373898811563,0.457785341387]\times[0.170446004355,0.329553995645]$ |

The residual cores are complement pieces adjacent to these simple-root windows. Several share endpoints with the accepted simple-root rows. A regular-boundary theorem that tries to consume the residual cores must therefore record endpoint ownership and root-count allocation explicitly. Otherwise the same boundary branch could be counted once as part of the simple-root row and again as regular-boundary fold coverage.

## Pass And Fail Conditions

This probe would pass only if a residual core had exact current-contract membership in an accepted row from $\mathcal{F}_{\Sigma_1}$ or $\mathcal{F}_{\Sigma_2}$ on the same packet identity tuple, while remaining disjoint from accepted simple-root interiors with explicit endpoint ownership.

It fails because every residual equality core has one of these blockers:

- it is a regular-side `A* / A*` or `A* / A0` rectangle, not an accepted `F1` or `F2` fold-layer row rectangle;
- accepting it would enlarge the separator family beyond the rows listed in the constants certificate;
- for cores touching `S_w_A1_A0_4`, `S_w_A2_A0_5`, or `S_w_A2_A1_6`, no current field assigns complement-boundary endpoint ownership and prevents double counting.

## Exact Additional Theorem Field Needed

The minimal additional field is a new regular-boundary coverage field, not a reinterpretation of the current fold-layer rows. A sufficient field would have to be recorded per residual core:

```text
regular_boundary_core_coverage:
  residual_core_id: <parent-row>/<strip>
  ledger: w
  separator: Sigma_1 | Sigma_2
  adjacent_fold_interval: F1 | F2
  covered_theta_rectangle:
    receiver: [theta_min, theta_max]
    source: [theta_min, theta_max]
  regular_side_membership:
    receiver_side: left_regular | right_regular | none
    source_side: left_regular | right_regular | none
    relation: B_core in overline{F}^{bdry}_{Sigma}
  domination:
    packet_id: seed-doubled-four-arc-cosine-template-v0
    refinement_id: preledger-separator-level-split-v1
    eta: 0.02
    epsilon_c: 0.05
    Gamma: 1
    finite_bound: I^{regular-bdry}_{eta,epsilon_c,Sigma}(B_core) < infinity
    dominated_by: accepted fixed-parameter fold constants for the same Sigma
  separator_conditions_preserved:
    alpha_Sigma_positive: true
    nu_exit_Sigma_positive: true
    Delta_N_Sigma_even: true
    Delta_D_Sigma_zero: true
  simple_root_exclusion:
    disjoint_from_simple_root_interiors: true
    shared_endpoint_owner: simple_root | regular_boundary | deleted_endpoint
    root_count_allocation: no branch counted in both rows
  no_expansion_clause:
    does_not_promote_AA_rectangle_to_existing_fold_row: true
    records coverage as new regular-boundary family, not as exact F-row membership
```

Without that field, the only fail-closed conclusion is that the residual equality cores remain unresolved.

## Parent Row Consumption

| Parent row | Endpoint-excluded strips already locally accepted | Residual equality cores after this probe | Other blocker | Parent row consumed? |
| --- | --- | --- | --- | --- |
| `R_w_A1_A0` | `source_right` | `receiver_left`, `source_left` rejected under current separator coverage. | None beyond the rejected residual cores. | No. |
| `R_w_A2_A0` | `source_right` | `receiver_right` rejected under current separator coverage. | `source_left` remains only a diagnostic strict-empty candidate, not an accepted outward-rounded gap. | No. |
| `R_w_A2_A1` | `source_left`, `source_right` | `receiver_left`, `receiver_right` rejected under current separator coverage. | None beyond the rejected residual cores. | No. |

No `w` parent row can be consumed by this packet.

## Promotion Decision

Priority-only. This packet records a proof-program blocker and a precise theorem-field target. It is not reader-facing corpus prose and should not be promoted into `content/markdown/aaa` until a regular-boundary theorem is actually proved or rejected as part of the breather proof program.
