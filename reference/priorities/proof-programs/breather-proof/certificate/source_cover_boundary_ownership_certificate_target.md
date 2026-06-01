# Higher-Fold Source-Cover Boundary Ownership Certificate Target

## Scope

This packet is the next proof-route target after
`source_cover_defect_atlas_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`.
It applies only to the 42 regular parent-complement rows in
`fresh-v10-higher-fold-12-root-rebuild-v0` whose proof-interval v6 receiver
cover remains incomplete.

It is priority-only. It consumes no rows, does not edit a live ledger, and does
not authorize `branch_chart.json`.

## Source State

Proof-interval v6 proves that receiver-grid refinement is not the missing step:
the 773 failed v5 receiver cells refine to terminal grid 128, but 0 coarse cells
are resolved by refinement. The source-cover defect atlas then records:

- 42 regular parent-complement rows;
- 622 certified simple-root receiver leaves;
- 3,024 structural terminal source-cover misses;
- 1,207 low-side and 1,817 high-side source-cover defects;
- 10 low-only rows, 10 high-only rows, and 22 two-sided rows;
- 978 receiver-left boundary missing leaves, 2,046 receiver-right boundary
  missing leaves, and 0 receiver-interior missing leaves.

Thus the residual regular-row problem is not an interior receiver-cover hole.
It is a receiver-boundary ownership, source-boundary movement, or receiver-range
contraction problem.

The follow-up boundary ownership audit,
`source_cover_boundary_ownership_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
now proves the terminal receiver partition field for all 42 rows: 42 / 42 rows
have complete terminal-grid receiver partitions, 64 boundary components carry
the 3,024 missing terminal leaves, and 0 receiver-interior missing leaves
remain. It also records that 0 rows satisfy the full finite pass rule because
the ownership, source-boundary movement or receiver-contraction,
no-double-counting, branch-reuse, and non-owned-complement fields are absent.

## Certificate Target

For each regular parent row
$$
R^\ell_{A_i,A_j},
\qquad
\ell\in\{u,w\},
$$
the certificate must produce an exact rational receiver partition
$$
A_i
=
C_{\mathrm{left}}
\cup
C_{\mathrm{cert}}
\cup
C_{\mathrm{right}},
$$
where:

1. every component of $C_{\mathrm{cert}}$ is already covered by proof-interval v6
   simple-root receiver leaves;
2. every component of $C_{\mathrm{left}}$ and $C_{\mathrm{right}}$ is one of the
   boundary-attached terminal spans recorded by the source-cover defect atlas;
3. the components are disjoint under an explicit half-open or endpoint ownership
   convention;
4. the union covers the whole receiver interval $A_i$ with no unowned terminal
   span.

Each boundary component must then satisfy at least one accepted alternative:

1. **Source-boundary movement.** A same-packet proof shows that the oriented
   source-inner range expands beyond the recorded atlas defect, with strict
   source-cover margin, strict monotonicity, and strict memory-depth margins.
2. **Receiver-range contraction.** A same-packet proof refines the receiver
   outer range so that the recorded source-cover defect becomes nonpositive,
   again preserving strict monotonicity and memory-depth margins.
3. **Boundary ownership/no-double-counting.** A same-packet topology or endpoint
   ownership proof assigns the boundary component to an adjacent row or endpoint
   class, proves no simple-root branch reuse, proves endpoint disjointness where
   applicable, and proves the non-owned complement has no remaining
   null-coordinate overlap.

Positive-width boundary spans are not endpoint singleton contacts. They cannot
be consumed by the old endpoint-exclusion rule unless the certificate supplies a
new exact ownership statement for the whole boundary component.

## Finite Pass Rule

A row may become `simple_root` only if all of the following fields are certified:

- `complete_receiver_partition=true`;
- `all_terminal_spans_owned=true`;
- `strict_source_coverage_or_contraction=true`;
- `memory_margins_all_owned_components=true`;
- `endpoint_ownership_no_double_counting=true`;
- `simple_root_branch_reuse_exclusion=true`;
- `non_owned_complement_closed=true`.

If any field is absent, the row remains `split_required`.

## Theorem Target

**Boundary ownership closure lemma.** For a fixed higher-fold packet identity,
suppose each of the 42 regular parent-complement rows has an exact rational
receiver partition satisfying the finite pass rule above. Then the proof-grade
simple-root leaves and the certified boundary components form a disjoint
receiver cover for every regular parent row. Under the same half-open ownership
convention, those rows may be consumed as `simple_root` without branch reuse or
double-counting. No branch chart is authorized until the remaining 8
endpoint/complement rows and 112 fold-layer rows also close.

## First Probe Rows

The smallest boundary burdens are the natural first probes:

| Row | Missing leaves | Boundary side | Atlas defect |
| --- | ---: | --- | ---: |
| `R_w_A04_A03` | 1 | low | 0.000026691996524 |
| `R_u_A10_A09` | 1 | low | 0.000026691996524 |
| `R_u_A07_A06` | 1 | high | 0.00024618430271 |

These rows are not accepted. They are the smallest finite tests for the
boundary ownership closure lemma.

The one-leaf boundary movement probe,
`one_leaf_boundary_movement_probe_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
now audits these rows. It records exact strict improvement thresholds for the
two low-side failures and the one high-side failure, but certifies 0
source-boundary movement rows, 0 receiver-range contraction rows, 0
all-owned-component memory-margin rows, and 0 endpoint ownership/no-double
counting rows. The probe consumes 0 rows.

The source-boundary movement theorem attempt,
`one_leaf_source_boundary_movement_theorem_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
then converts those three thresholds into exact source-boundary inequalities:
the two low-side rows require strict negative movement of the source lower
boundary by more than `0.000026691996524`, and the high-side row requires
strict positive movement of the source upper boundary by more than
`0.00024618430271`. It verifies the threshold identities but certifies 0
same-packet source-boundary movement rows because no source-boundary variation,
endpoint-tightening certificate, source-monotonicity preservation, or
all-owned memory-margin proof is present. It consumes 0 rows.

The receiver-range contraction theorem attempt,
`one_leaf_receiver_range_contraction_theorem_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
separately converts the same thresholds into exact receiver-boundary
contraction inequalities. It verifies all three receiver-side threshold
identities but certifies 0 same-packet receiver contractions because no
receiver-range refinement, receiver endpoint-tightening certificate,
receiver-monotonicity preservation, or all-owned memory-margin proof is
present. It consumes 0 rows.

The candidate-change boundary-data constructor,
`one_leaf_candidate_change_boundary_data_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
combines the two failed theorem routes into one exact boundary-opening
condition. The low-side rows require
`sigma_source_lower + rho_receiver_lower > required_strict_improvement_q`; the
high-side row requires
`sigma_source_upper + rho_receiver_upper > required_strict_improvement_q`. It
declares all three combined targets but finds no same-packet candidate-change
data assigning positive source or receiver boundary shifts, so it certifies 0
candidate-change boundary-data rows and consumes 0 rows.

The direct-path lambda shift screen,
`one_leaf_direct_path_lambda_shift_screen_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
then tests whether the existing higher-fold direct-path parameter supplies a
candidate-change direction. At the sampled active endpoints, increasing
`lambda` from `0.3` to `0.305` opens 3 / 3 one-leaf boundary targets, with
largest active-endpoint opening threshold `lambda>0.301815056706425`. This is
only a finite route-finding screen and consumes 0 rows. The follow-on
`lambda0305_preledger_replay_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`
recertifies the trial seed's 12-root topology by outward-rational interval
checks, but the v1-v6 preledger replay still leaves 162 rows `split_required`,
0 complete receiver-cover parent rows, 0 accepted fold-layer rows, and no
branch-chart authorization.

The fold-coordinate collocation theorem attempt,
`one_leaf_fold_coordinate_collocation_candidate_change_theorem_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then imports the nonlinear fold-coordinate tangent witness back into the
one-leaf candidate-change stack. It matches all three constructor rows and
verifies 3 / 3 screen-level positive boundary openings, with minimum screen
margin `0.999753815697289`. It still certifies 0 proof-grade same-packet
candidate-change rows: no accepted deformation, source/receiver monotonicity,
memory margin, endpoint ownership/no-double-counting, branch-reuse exclusion,
non-owned complement closure, root-topology recertification, or preledger rerun
exists for that candidate change.

The fold-coordinate promotion audit,
`fold_coordinate_candidate_promotion_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
separates the screen evidence from proof-grade promotion. It records all 3
proposed fold-coordinate shift rows, but it finds 0 / 4 expected
fold-coordinate candidate artifacts present: no same-packet `phi_cyc`, no
same-packet `mesh`, no candidate-specific root-topology recertification, and no
candidate-specific proof-interval replay. The `lambda=0.305` replay remains
external contrast only; it does not certify the fold-coordinate candidate.

The materialization audit,
`fold_coordinate_candidate_materialization_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then tests whether those candidate artifacts can honestly be emitted from the
current fold-coordinate data. It fail-closes: all three one-leaf rows remain
screen-positive, but the four fold-coordinate boundary-opening columns carry
0 / 4 history-realization rules and no candidate-specific `phi_cyc`, `mesh`,
preledger-input screen, root-topology certificate, or preledger replay exists.

The history-realization contract,
`fold_coordinate_history_realization_contract_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
turns that blocker into a finite theorem/generator target. It defines the
required $\Delta X_{\mathrm{fc}}(\theta;\xi)$ same-packet update form, the
signed source/receiver boundary-delta contracts for the two lower rows and one
upper row, the 8 realization fields required for each `fc_*` variable, and the
candidate-specific v1-v6 replay plan. It still authorizes no row consumption:
0 / 4 realizations, 0 / 5 candidate artifacts, and 0 contract-ready rows are
present.

The history-realization theorem attempt,
`fold_coordinate_history_realization_theorem_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then checks whether that contract can already become an exact same-packet
realization theorem. It cannot: 4 / 4 fold-coordinate variables have screen
coefficients and 3 / 3 rows have signed boundary-delta contracts, but 0 / 4
variables have the 8 required realization fields, exact $B\xi=0$ and rank
certification are absent, 0 / 5 candidate artifacts exist, topology and v1-v6
replay are absent, and row consumption remains 0.

The finite-realization basis attempt,
`fold_coordinate_finite_realization_basis_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then checks the first conservative construction route for the exact
$\Psi_j$ functions. It verifies that the four variables have screen variables,
basis symbols, and endpoint boundary actions, but no endpoint functional
bindings, theta supports, basis formulas, derivative formulas, $X$ or
$\dot X$ update bases, mesh update, endpoint motion, gluing, monotonicity,
exact $B\xi=0$, rank certification, candidate topology, v1-v6 replay, or row
consumption exists.

The endpoint-functional source audit,
`fold_coordinate_endpoint_functional_source_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then checks whether the existing seed, mesh, preledger input, one-leaf
boundary-data, source-cover atlas, and ownership audit already contain the
missing exact endpoint-functional source data. They contain locator and
row-local endpoint-value data but not functional data: 4 / 4 target endpoint
refs and 4 / 4 row-local endpoint values are present, all 3 one-leaf rows
resolve in the preledger input, mesh, source-cover atlas, and ownership
component table, but 0 / 4 endpoint bindings, endpoint-functional domains,
supports, formulas, exact $B\xi=0$ certificates, or rank certificates are
present.

The endpoint-functional construction attempt,
`fold_coordinate_endpoint_functional_construction_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then attempts to promote the locator layer into exact endpoint functionals. It
reaches 4 / 4 endpoint locators, 4 / 4 row-local endpoint values, and 4 / 4
target equations, but constructs 0 / 4 endpoint functionals and 0 / 3 rows
because endpoint-functional domains and bindings, support/formula/derivative
data, exact $B\xi=0$, rank certification, candidate artifacts, topology
recertification, and v1-v6 replay remain absent.

The endpoint-functional binding no-go,
`fold_coordinate_endpoint_functional_binding_contract_no_go_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then prevents the row-local endpoint values from being promoted by label. It
tests 4 binding methods and 16 method evaluations, but certifies 0 / 4 binding
contracts and 0 / 3 binding-ready rows because endpoint-functional domains,
endpoint-boundary bindings, evaluation maps, support/formula data, exact
$B\xi=0$, rank certification, candidate artifacts, topology recertification,
and v1-v6 replay are absent.

The endpoint-functional domain/evaluation-map attempt,
`fold_coordinate_endpoint_functional_domain_evaluation_map_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then tests the missing layer directly. It evaluates 5 construction methods and
20 method evaluations, but certifies 0 / 4 domain/evaluation maps and 0 / 3
domain/evaluation-ready rows. Endpoint locators, row-local endpoint values, and
target equations remain present; endpoint-functional domain charts, domain
coordinate rules, evaluation maps, endpoint evaluation rules, endpoint motion
rules, exact $B\xi=0$, rank certification, candidate artifacts, topology
recertification, and v1-v6 replay remain absent.

The endpoint-functional domain/evaluation-map contract,
`fold_coordinate_endpoint_functional_domain_evaluation_contract_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then converts that fail-closed result into an exact successor burden. It
declares 4 / 4 endpoint-functional domain/evaluation-map contracts and 3 / 3
signed row contracts, but supplies 0 / 4 actual domain charts, coordinate
rules, evaluation maps, endpoint motion rules, same-packet $\Psi_j$ formulas,
exact $B\xi=0$ certificates, rank certificates, candidate artifacts, topology
recertification, or v1-v6 replay data. It therefore consumes 0 rows while
making clear that endpoint locations and scalar endpoint values are not enough
to define the endpoint functionals.

The endpoint-functional $C^1$ endpoint-basis ansatz attempt,
`fold_coordinate_endpoint_functional_c1_endpoint_basis_ansatz_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then tests whether the existing shifted-separator $C^1$ bump machinery can
supply that missing object. It declares 4 / 4 $C^1$ ansatz families, formulas,
derivative formulas, periodic-extension templates, and gluing templates, but
constructs 0 / 4 endpoint-basis ansatzes, 0 / 4 domain/evaluation maps, and
0 / 3 row-ready pairs because no endpoint-functional domain chart,
endpoint-motion rule, non-target zero certificate, exact $B\xi=0$, rank
certificate, candidate artifact, topology recertification, or v1-v6 replay is
bound to the template.

The endpoint-functional explicit $\Psi_j$ formula attempt,
`fold_coordinate_endpoint_functional_explicit_psi_formula_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then supplies the missing local polynomial formulas as component-local
candidates. It declares 4 / 4 endpoint-local formula candidates and derivative
formulas, verifies 4 / 4 local target-action identities, and records the exact
support components over source intervals `A03`, `A09`, `A06` and receiver
intervals `A04`, `A10`, `A07`. It still constructs 0 / 4 proof-grade
endpoint-functional formulas, 0 / 4 domain/evaluation maps, and 0 / 3
row-ready pairs because the local formulas are not bound to a same-packet
domain chart, global gluing/periodicity rule, non-target zero certificate,
exact $B\xi=0$, rank certificate, candidate topology, or v1-v6 replay.

The endpoint-functional global domain/evaluation-map construction attempt,
`fold_coordinate_endpoint_functional_global_domain_evaluation_map_construction_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then tests that promotion layer directly. It preserves 4 / 4 local $\Psi_j$
formula candidates and 4 / 4 exact component endpoint identities, but constructs
0 / 4 global domain charts, 0 / 4 global coordinate rules, 0 / 4 endpoint
evaluation maps, 0 / 4 non-target zero certificates, 0 / 4 exact $B\xi=0$ or
rank certificates, and 0 / 3 row-ready global domain/evaluation pairs. This
shows the one-leaf fold-coordinate route is blocked at global same-packet
domain/evaluation semantics, not at the local polynomial formula layer.

The endpoint-functional candidate artifact replay-readiness audit,
`fold_coordinate_endpoint_functional_candidate_artifact_replay_readiness_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then closes the immediate replay route. It records 0 / 5 same-packet
fold-coordinate candidate artifacts, 0 / 4 topology recertifications, 0 / 4
proof-interval v1-v6 replays, and 0 / 3 replay-ready rows. The direct-path
`lambda=0.305` replay remains non-reusable contrast because it certifies a
shifted-separator trial seed, not the fold-coordinate endpoint-functional
candidate namespace.

The endpoint-functional component-union chart certificate,
`fold_coordinate_endpoint_functional_component_union_chart_certificate_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then certifies the finite support chart subproblem: 4 / 4 component-union
domains, coordinate rules, no-double-counting rules, formula-to-chart bindings,
and target endpoint evaluation locators are constructed, and 3 / 3 rows now
have source/receiver chart pairs. This does not consume rows because endpoint
motion, full endpoint evaluation maps, non-target zero certificates, exact
$B\xi=0$, rank, candidate artifacts, topology, and replay remain absent.

The endpoint-functional post-component-union endpoint-motion full
evaluation-map layer attempt,
`fold_coordinate_endpoint_functional_post_component_union_endpoint_motion_full_evaluation_map_layer_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then proves that the component-union chart cannot itself be promoted into
endpoint motion or a full endpoint-functional evaluation map. It preserves
4 / 4 chart certificates, target locators, declared evaluation-map symbols, and
declared endpoint evaluation rules, but still constructs 0 / 4 endpoint
boundary bindings, 0 / 4 same-packet history update formulas, 0 / 4 endpoint
motion rules, 0 / 4 endpoint evaluation maps, 0 / 4 non-target zero
certificates, 0 / 4 exact $B\xi=0$ or rank certificates, and 0 consumable
rows.

The post-component-union endpoint-boundary-binding source-data audit,
`fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_source_data_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then closes the immediate source-data question. It verifies 4 / 4 endpoint
boundary actions, target endpoint refs and values, component-union target
locators, evaluation-map symbols, and declared endpoint evaluation rules, plus
3 / 3 row-local source/receiver boundary refs, boundary values, signed
boundary-delta contracts, and source/receiver chart pairs. It still constructs
0 / 4 endpoint boundary bindings, 0 / 4 same-packet history update formulas,
0 / 4 endpoint motion rules, 0 / 4 endpoint evaluation maps, 0 / 4 full
endpoint evaluation maps, 0 / 4 non-target zero certificates, 0 / 4 exact
$B\xi=0$ or rank certificates, and 0 consumable rows. The endpoint-functional
branch now has enough source data to attempt a boundary-binding construction,
but it has not yet supplied the construction.

The post-component-union endpoint-boundary-binding construction attempt,
`fold_coordinate_endpoint_functional_post_component_union_endpoint_boundary_binding_construction_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then performs that attempt and fail-closes. It preserves 4 / 4 endpoint
source-data rows and 3 / 3 row source-data rows, but constructs 0 / 4 endpoint
boundary bindings, 0 / 4 endpoint value bindings, 0 / 4 same-packet history
update formulas, 0 / 4 endpoint motion rules, 0 / 4 endpoint evaluation maps,
0 / 4 full endpoint evaluation maps, 0 / 4 non-target zero certificates,
0 / 4 exact $B\xi=0$ or rank certificates, and 0 consumable rows. The source
data are therefore necessary input, not a proof-grade endpoint boundary binding.

The row-closure geometry budget packet,
`row_closure_geometry_budget_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then records the authorized geometry-change route. It imports the direct-path
one-leaf lambda screen and the `lambda=0.305` replay: 3 / 3 one-leaf rows have
positive sampled boundary-opening budgets with shared active-endpoint threshold
`lambda>0.301815056706425`, and the trial value has margin
`0.0031849432935751`. The imported trial keeps proof-grade 12-root topology and
has a v1-v6 preledger replay, but it still leaves 162 `split_required` base
rows, 0 complete receiver-cover parent rows, 0 accepted fold-layer rows, and no
branch-chart authorization. It consumes 0 rows and records that replaying the
same direct-path lambda screen is not row closure by itself.

The one-leaf boundary-opening interval-certificate attempt,
`one_leaf_boundary_opening_interval_certificate_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then tests whether that screen-level budget can become an interval certificate.
It declares 3 / 3 nonempty sampled lambda intervals, but certifies 0 / 3
interval active-endpoint enclosures, 0 / 3 interval defect-derivative bounds,
0 / 3 strict combined boundary-opening certificates, 0 / 3 source/receiver
monotonicity certificates, 0 / 3 memory-margin certificates, 0 / 3 ownership
or non-owned-complement closures, 0 / 3 proof-grade interval certificates, and
0 consumed rows.

The one-leaf active-endpoint interval-enclosure attempt,
`one_leaf_active_endpoint_interval_enclosure_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then tests the missing interval active-endpoint enclosure sublayer. It records
3 / 3 stable sampled source/receiver endpoint pairs, but constructs 0 / 3
source endpoint interval boxes, 0 / 3 receiver endpoint interval boxes,
0 / 3 endpoint residual interval bounds, 0 / 3 derivative-isolation
certificates, 0 / 3 endpoint switch-exclusion certificates, 0 / 3
active-endpoint uniqueness certificates, 0 / 3 active-endpoint gap-margin
certificates, and 0 / 3 interval active-endpoint enclosures. It consumes
0 rows, keeps `preledger_pass=false`, keeps `updates_live_ledger=false`, keeps
`branch_chart_authorized=false`, and emits no candidate artifacts, topology
recertification, or proof-interval replay of its own. This keeps the blocker
at proof-grade interval endpoint boxes, residual bounds, derivative isolation,
no-switch/uniqueness data, and gap margins before any boundary-opening interval
certificate can be promoted.

The one-leaf active-endpoint interval-box/no-switch construction attempt,
`one_leaf_active_endpoint_interval_box_no_switch_construction_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`,
then tests those missing boxes and no-switch data directly. It declares
3 / 3 constant-theta sampled endpoint-box candidates, but constructs 0 / 3
source endpoint interval boxes, 0 / 3 receiver endpoint interval boxes,
0 / 3 residual functions on boxes, 0 / 3 residual interval bounds, 0 / 3
derivative-isolation certificates, 0 / 3 endpoint uniqueness certificates,
0 / 3 endpoint switch-exclusion certificates, 0 / 3 positive endpoint-gap
certificates, and 0 / 3 interval active-endpoint enclosures. It consumes
0 rows, keeps `preledger_pass=false`, keeps `updates_live_ledger=false`, keeps
`branch_chart_authorized=false`, and emits no candidate artifacts, topology
recertification, or proof-interval replay of its own. This prevents the stable
sampled endpoint theta values at `lambda=0.3` and `lambda=0.305` from being
mistaken for interval boxes over the full lambda interval.

## Capture Decision

Priority-only theorem target. The partition-audit implementation is now
complete, and the first source-boundary and receiver-range theorem attempts
both fail-close with 0 accepted rows. The candidate-change constructor now
states the exact combined boundary-opening equation that a future deformation
must satisfy, but it also fail-closes because no such deformation data is
present. The direct-path lambda screen supplies the first positive sampled
candidate-change direction, and the `lambda=0.305` replay proves that this
direct-path amplitude can keep proof-grade 12-root topology. It does not close
row consumption. The fold-coordinate theorem attempt gives the first positive
screen-level candidate-change bridge for all three one-leaf rows, but it also
fail-closes because the positive opening has not been promoted to proof-grade
same-packet data. The promotion audit first sharpened that into missing
candidate-specific artifacts, and the materialization audit now sharpens it
again into the missing mathematical object: a finite history-realization rule
for the fold-coordinate boundary-opening variables. The history-realization
contract now fixes the exact update and replay fields that such a theorem must
satisfy. The theorem attempt now confirms that the contract is not already a
theorem: the exact finite $\Psi_j$ basis, support, derivative, mesh, endpoint,
source-monotonicity, and receiver-monotonicity rules are absent. The
finite-realization basis attempt now sharpens that again: the absent object is
an endpoint-functional finite basis construction, not merely a missing file
writer. The endpoint-functional construction attempt now confirms that even
the locator layer cannot be promoted by current data, and the domain/evaluation
map attempt confirms that the missing endpoint-functional object is a domain
chart plus evaluation map, not a row-local endpoint value or target equation.
The domain/evaluation-map contract now fixes the exact proof burden for that
missing object without consuming rows. The $C^1$ endpoint-basis ansatz attempt
then rules out a direct promotion from shifted-separator smooth-bump templates
to endpoint-functional maps. The explicit $\Psi_j$ formula attempt separates
the local obstruction cleanly, and the global domain/evaluation-map attempt
then fail-closes the promotion step: endpoint-local cubic formulas and their
target-action identities are available, but no global same-packet domain chart,
coordinate rule, gluing/periodicity rule, endpoint evaluation map, non-target
zero certificate, exact $B\xi=0$, rank certificate, or replay certificate is
constructed. The candidate artifact replay-readiness audit then confirms that
this absence blocks same-packet artifact emission and proof-interval replay:
there are 0 / 5 candidate artifacts and 0 / 3 replay-ready rows. The
component-union chart certificate closes the finite support-list ambiguity and
no-double-counting subproblem for the four `fc_*` variables, but it still leaves
endpoint motion, full endpoint evaluation maps, non-target zero certificates,
exact $B\xi=0$, rank, candidate artifacts, topology, and replay absent. The
post-component-union endpoint-motion full evaluation-map layer attempt confirms
that this chart is still only a locator layer: it constructs 0 / 4 endpoint
motion rules and 0 / 4 full endpoint evaluation maps. The endpoint-boundary
binding source-data audit then verifies that the boundary actions, target
endpoint refs and values, component-union locators, declared evaluation rules,
and row-local source/receiver boundary data are ready for a construction
attempt, while still recording 0 / 4 endpoint boundary bindings, 0 / 4
same-packet history update formulas, and 0 / 4 endpoint motion rules. The
construction attempt then proves the promotion still fails: source data,
declared domain contracts, component locators, and signed boundary-delta
contracts construct 0 / 4 endpoint boundary bindings and 0 / 4 endpoint motion
rules. The row-closure geometry budget packet then records that the available
direct-path geometry change is real only at screen level: 3 / 3 one-leaf rows
open at `lambda=0.305`, but the replay still leaves 162 split-required base
rows, 0 complete receiver-cover parent rows, and 0 accepted fold-layer rows.
The one-leaf interval-certificate attempt then fail-closes the narrowest
promotion route: it has 3 / 3 nonempty sampled lambda intervals but 0 / 3
interval active-endpoint enclosures, derivative bounds, strict combined
boundary-opening certificates, monotonicity certificates, memory-margin
certificates, ownership/no-double-counting closures, non-owned-complement
closures, proof-grade interval certificates, or consumed rows. The
active-endpoint interval-enclosure attempt then narrows the first missing
subproblem: sampled source/receiver endpoint pairs are stable in 3 / 3 rows,
but there are 0 / 3 interval endpoint boxes, residual bounds, derivative
isolation certificates, switch-exclusion certificates, uniqueness
certificates, active-endpoint gap-margin certificates, interval active-endpoint
enclosures, or consumed rows. The interval-box/no-switch construction attempt
then proves the next promotion also fails: constant-theta sampled endpoint-box
candidates exist in 3 / 3 rows, but there are 0 / 3 proof-grade endpoint
interval boxes, residual functions on boxes, residual interval bounds,
derivative-isolation certificates, endpoint uniqueness certificates,
switch-exclusion certificates, positive endpoint-gap certificates,
active-endpoint interval enclosures, or consumed rows. The next
implementation must therefore either supply new same-packet endpoint boundary
bindings and endpoint motion/evaluation-map proof data, strengthen the positive
row-closure geometry budget with actual interval enclosure and preservation
proof data, or strengthen the receiver-cover certificate: new same-packet
source-boundary variation data, receiver-range refinement data,
endpoint/complement ownership, or another candidate change must actually assign
proof-grade positive boundary shifts and preservation fields before these
one-leaf rows can progress. Even then, the finite pass rule still also requires
all-owned-component memory margins, endpoint/topology ownership with
no-double-counting, simple-root branch-reuse exclusion, and non-owned complement
closure. No regular parent row may be accepted until all fields in the finite
pass rule are present.
