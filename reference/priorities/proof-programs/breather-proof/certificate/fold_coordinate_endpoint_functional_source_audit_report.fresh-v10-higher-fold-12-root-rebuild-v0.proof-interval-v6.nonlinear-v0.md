# Higher-Fold Fold-Coordinate Endpoint-Functional Source Audit

## Verdict

The endpoint-functional source audit fail-closes. The existing higher-fold seed,
mesh, preledger input screen, one-leaf boundary-data rows, source-cover atlas,
and boundary-ownership audit are sufficient to locate the row-local endpoint
targets for the three one-leaf rows. They are not sufficient to define global
exact endpoint functionals for the four `fc_*` basis variables.

| Quantity | Value |
| --- | ---: |
| Variables audited | 4 |
| Rows audited | 3 |
| Seed `phi_cyc` present | true |
| Seed `mesh` present | true |
| Seed preledger input present | true |
| Target endpoint refs declared | 4 / 4 |
| Target endpoint values present | 4 / 4 |
| Endpoint boundary bindings present | 0 / 4 |
| Endpoint-functional domains present | 0 / 4 |
| Theta supports present | 0 / 4 |
| Basis formulas present | 0 / 4 |
| Endpoint-source-ready variables | 0 / 4 |
| Endpoint-source-ready rows | 0 / 3 |
| Row consumption count | 0 |

## Source Rule

A row-local boundary ref becomes usable for a fold-coordinate basis only after
the basis variable has an exact endpoint-functional domain, an endpoint boundary
binding, exact endpoint value data, theta support, basis and derivative
formulas, $X$ and $\dot X$ update bases, mesh and endpoint motion rules,
source/receiver monotonicity rules, non-target endpoint-functional zero
certification, exact $B\xi=0$ certification, and rank certification.

The present data satisfy the locator and row-local endpoint-value side of that
rule. They do not satisfy the functional binding, domain, support, formula,
or certification side.

## Source Artifacts

| Artifact | File | Present |
| --- | --- | --- |
| `basisAttempt` | `fold_coordinate_finite_realization_basis_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json` | true |
| `oneLeaf` | `one_leaf_candidate_change_boundary_data.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true |
| `phi` | `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.json` | true |
| `mesh` | `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.json` | true |
| `preledgerInput` | `causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.json` | true |
| `sourceCoverAtlas` | `source_cover_defect_atlas.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true |
| `ownershipAudit` | `source_cover_boundary_ownership_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true |

## Variable Audit

| Variable | Role | Endpoint ref | Endpoint value | Endpoint binding | Functional domain | Theta support | Ready |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `fc_sigma_source_lower` | `source` | true | true | false | false | false | false |
| `fc_rho_receiver_lower` | `receiver` | true | true | false | false | false | false |
| `fc_sigma_source_upper` | `source` | true | true | false | false | false | false |
| `fc_rho_receiver_upper` | `receiver` | true | true | false | false | false | false |

## Variable-Field Audit

| Field | Variables certified |
| --- | ---: |
| `screen_variable_present` | 4 / 4 |
| `basis_symbol_declared` | 4 / 4 |
| `endpoint_boundary_action_declared` | 4 / 4 |
| `boundary_delta_sign_consistent` | 4 / 4 |
| `row_uses_covered` | 4 / 4 |
| `target_endpoint_ref_declared` | 4 / 4 |
| `target_endpoint_value_present` | 4 / 4 |
| `endpoint_boundary_binding_present` | 0 / 4 |
| `endpoint_functional_domain_present` | 0 / 4 |
| `theta_support_present` | 0 / 4 |
| `basis_formula_present` | 0 / 4 |
| `basis_derivative_formula_present` | 0 / 4 |
| `x_update_basis_present` | 0 / 4 |
| `xdot_update_basis_present` | 0 / 4 |
| `mesh_update_rule_present` | 0 / 4 |
| `endpoint_motion_rule_present` | 0 / 4 |
| `source_monotonicity_rule_present` | 0 / 4 |
| `receiver_monotonicity_rule_present` | 0 / 4 |
| `periodic_extension_rule_present` | 0 / 4 |
| `c1_gluing_rule_present` | 0 / 4 |
| `non_target_endpoint_functionals_zero_certified` | 0 / 4 |
| `exact_screen_zero_certified` | 0 / 4 |
| `rank_certified` | 0 / 4 |
| `endpoint_source_ready` | 0 / 4 |

## Row-Local Source Audit

| Row | Source interval | Receiver interval | Source ref | Receiver ref | Source value | Receiver value | Ownership component | No double counting |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `R_w_A04_A03` | `A03` | `A04` | true | true | true | true | true | false |
| `R_u_A10_A09` | `A09` | `A10` | true | true | true | true | true | false |
| `R_u_A07_A06` | `A06` | `A07` | true | true | true | true | true | false |

## Row-Field Audit

| Field | Rows certified |
| --- | ---: |
| `one_leaf_row_present` | 3 / 3 |
| `screen_row_resolved` | 3 / 3 |
| `mesh_receiver_interval_resolved` | 3 / 3 |
| `mesh_source_interval_resolved` | 3 / 3 |
| `source_cover_atlas_row_resolved` | 3 / 3 |
| `ownership_audit_row_resolved` | 3 / 3 |
| `ownership_component_resolved` | 3 / 3 |
| `source_boundary_ref_declared` | 3 / 3 |
| `receiver_boundary_ref_declared` | 3 / 3 |
| `source_boundary_value_present` | 3 / 3 |
| `receiver_boundary_value_present` | 3 / 3 |
| `terminal_grid_span_present` | 3 / 3 |
| `endpoint_ownership_no_double_counting_certified` | 0 / 3 |
| `endpoint_functionals_certified` | 0 / 3 |
| `row_consumed` | 0 / 3 |
| `branch_chart_authorized` | 0 / 3 |

## Closure Burden

The next proof object is not another locator audit. It is the exact endpoint
functional data for
$\Psi_{\mathrm{fc\_sigma\_source\_lower}}$,
$\Psi_{\mathrm{fc\_rho\_receiver\_lower}}$,
$\Psi_{\mathrm{fc\_sigma\_source\_upper}}$, and
$\Psi_{\mathrm{fc\_rho\_receiver\_upper}}$: endpoint-functional domains,
endpoint boundary bindings, theta supports, formulas, derivative formulas,
$X$ and $\dot X$ update bases, mesh and endpoint rules, source/receiver
monotonicity, non-target endpoint-functional zero certification, exact
$B\xi=0$, and rank certification.

## Capture Decision

Priority-only source audit. This packet records that existing artifacts contain
row-local endpoint locators and endpoint values, but not the global exact
endpoint functionals needed to promote the fold-coordinate screen into a
same-packet finite basis or candidate history.
