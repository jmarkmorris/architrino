# Candidate Repair Strict-Gap Closure Target

## Scope

This packet implements the selected route from
`regular_boundary_route_decision.md`: pivot away from the regular-boundary
$T(C)$ domination route and drive the fresh sidecar toward strict null-coordinate
parent-complement closure.

It is priority-only. It does not accept any row, does not edit a live ledger,
and does not authorize `branch_chart.json`. It gives the next repaired candidate
or successor packet a finite pass/fail target.

## Source State

The current packet `fresh-same-packet-fold-shear-seed-v0` has a strong partial
pre-ledger:

- 124 accepted empty rows;
- 6 proof-interval-v4 simple-root subrows;
- 10 receiver-side parent-complement strips still `split_required`;
- 16 active fold-layer rows still requiring same-packet fold-layer fields;
- no branch-chart authorization.

The regular-boundary path is blocked because proof-interval-v8 has no fresh
same-packet fold ceiling, no $I^{\mathrm{reg\text{-}bdry}}$ bounds, and no
non-core complement closure. Therefore the next closure attempt should change
the candidate geometry until the 10 parent-complement collars become strict
range-empty, exact fold-layer, or endpoint-owned rows before any branch-chart
work.

## Strict-Gap Functionals

For a parent-complement strip
$$
M=R\times S
$$
with ledger coordinate
$$
z_\ell(\theta)=c_fT_{\mathrm{cyc}}\theta+\sigma_\ell X(\theta),
\qquad
\sigma_u=-1,\quad \sigma_w=+1,
$$
define the two possible strict-gap functionals
$$
\delta_{S<R}(M)
=
\inf_{\theta_r\in R}z_\ell(\theta_r)
-
\sup_{\theta_s\in S}z_\ell(\theta_s),
$$
and
$$
\delta_{R<S}(M)
=
\inf_{\theta_s\in S}z_\ell(\theta_s)
-
\sup_{\theta_r\in R}z_\ell(\theta_r).
$$
The strip is range-empty when either functional is strictly positive. At the
current v10 sidecar every listed strip has both functionals nonpositive. The
repair target chooses the smaller current deficit unless structural constraints
force the opposite orientation.

For a candidate parameter vector $\mathbf a$, the strict-gap repair condition is
$$
\delta_m(\mathbf a)>0
\qquad
\text{for all }m=1,\ldots,10.
$$
For a tangent repair direction $\xi$ at a provisional structural candidate
$\mathbf a_0$, the sufficient finite test is
$$
D\delta_m(\mathbf a_0)\xi
\ge
\kappa_m+\gamma_m,
\qquad
\gamma_m>0,
$$
where
$$
\kappa_m=-\delta_m(\mathbf a_0)
$$
is the current strict-gap deficit in the chosen orientation.

## Current v10 Deficits

The current v10 interval ranges give the following repair targets. The selected
orientation is the lower-deficit orientation computed from the recorded
receiver/source null-coordinate ranges.

| Strip | Ledger | Parent row | Selected orientation | Current deficit |
| --- | --- | --- | --- | ---: |
| `C_w_A1_A0_left_v10_1` | `w` | `R_w_A1_A0` | $S<R$ | 0.030530625174797876 |
| `C_w_A2_A0_left_v10_2` | `w` | `R_w_A2_A0` | $R<S$ | 0.09712946440190295 |
| `C_w_A2_A0_right_v10_3` | `w` | `R_w_A2_A0` | $S<R$ | 0.06160689267192887 |
| `C_w_A2_A1_left_v10_4` | `w` | `R_w_A2_A1` | $R<S$ | 0.030206375980674993 |
| `C_w_A2_A1_right_v10_5` | `w` | `R_w_A2_A1` | $S<R$ | 0.06517841972513794 |
| `C_u_A3_A2_left_v10_6` | `u` | `R_u_A3_A2` | $S<R$ | 0.04542975382825887 |
| `C_u_A4_A2_left_v10_7` | `u` | `R_u_A4_A2` | $S<R$ | 0.2505559801302599 |
| `C_u_A4_A2_right_v10_8` | `u` | `R_u_A4_A2` | $S<R$ | 0.049789505024516956 |
| `C_u_A4_A3_left_v10_9` | `u` | `R_u_A4_A3` | $R<S$ | 0.026634572563022374 |
| `C_u_A4_A3_right_v10_10` | `u` | `R_u_A4_A3` | $S<R$ | 0.03846190342426503 |

The largest selected deficit is the left `R_u_A4_A2` collar. A repair attempt
that cannot open that collar with a certified positive margin cannot consume the
six parent rows by the strict-gap route.

## Closure Criterion

A repaired successor packet may treat the six proof-interval-v4 parent rows as
strict-gap closed only if it supplies, on one frozen packet identity:

1. outward-rounded receiver/source ranges for the 10 strips above;
2. a positive lower bound
   $$
   \delta_m\ge\gamma_m>0
   $$
   in a declared orientation for every strip;
3. a proof that the six simple-root subrows either persist with certified
   source-inner coverage, Jacobian floor, memory-depth margin, and sign margin,
   or are recomputed by the same proof-interval backend;
4. a proof that the 124 already accepted empty rows either persist or are
   recomputed;
5. a separate treatment of the active fold-layer rows, endpoint/seam rows, and
   nonmonotone diagonal contacts.

If any repaired collar remains overlap, endpoint-scale uncertain, or residual
equality core, the strict-gap repair route fails closed for that parent row.

## Solver Use

The existing finite fold-shear witness remains useful only as a seed direction.
The current v10 deficits show that the first sidecar did not finish strict-gap
closure. The free-period local-shear diagnostic and the shifted-separator
fixed-period diagnostic now sharpen the route:

- the free-period local-shear matrix has a strict tangent witness, but direct
  finite integration reaches 20 field-speed crossings at its strict-gap
  threshold;
- the shifted-separator fixed-period matrix has a stricter tangent witness
  $(h_{A0s},h_{A1s},h_{A2s})=(-1,-1,-1)$ with minimum post-margin surplus
  `0.484518823372`, but direct finite integration still reaches 12 field-speed
  roots at $\lambda_{\min}=0.264833953926991`;
- the bounded three-coordinate shifted-separator sampled LP screen adds
  explicit field-speed sign-itinerary inequalities to 810 sampled collar
  inequalities and 1,940 retained field-speed sign guards, but its optimum
  still has nonpositive sampled strict-gap margin
  $\gamma_{\mathrm{sample}}=-0.204126631574676$;
- the split-two shifted-separator enrichment repeats the same sampled screen
  with six subarc coefficients and still has nonpositive sampled margin
  $\gamma_{\mathrm{sample}}=-0.207816886605516$;
- the anti-periodic cubic Hermite same-itinerary screen tests grid refinements
  through 270 Hermite nodes and 541 LP variables, with derivative-bound
  sensitivity over $40\le |H'_i|_{\max}\le 640$, and reaches the sampled
  boundary from below with best margin
  $\gamma_{\mathrm{sample}}=-2.20865857936394\times 10^{-10}$ rather than a
  positive strict-gap margin;
- the row-only numerical dual for that Hermite sampled LP gives a
  residual-adjusted negative upper bound
  $\gamma\le -2.20862209291526\times 10^{-10}$ at half-grid 256;
- the rationalization audit replaces the 23 active half-grid-256 dual
  multipliers by exact rationals with denominator cap $10^9$ while preserving
  the negative binary64-row residual-adjusted bound
  $\gamma\le -2.20860276388005\times 10^{-10}$;
- the active-row interval backend reconstructs those 23 rows with exact
  rational Hermite coefficients, outward rational trigonometric bounds, exact
  gamma stationarity, and no gamma residual cap, proving the finite sampled
  row-system upper bound
  $\gamma\le -2.20499517531647\times 10^{-10}$;
- the continuous-collar lift verifies that the active sampled rows are embedded
  in the declared continuous collar/speed target, so the sampled obstruction
  lifts by sample-subset inclusion for this generic same-itinerary Hermite
  route;
- the period-coupled Hermite screen adds a period tangent and separator
  speed-contact locks but still returns best
  $\gamma_{\mathrm{sample}}=-2.20865843237662\times 10^{-10}$;
- the velocity-first Bernstein screen hard-codes the fixed-separator
  field-speed sign corridor at the control level but still returns best
  $\gamma_{\mathrm{sample}}=-0.0126050167182319$.

The next solver should therefore:

1. treat generic same-itinerary Hermite basis enrichment as closed for this
   repair route;
2. treat the bounded period-coupled Hermite and fixed-separator
   velocity-corridor structural screens as obstructed;
3. either instantiate the larger nonlinear fold-coordinate collocation target
   or use `fresh_v10_higher_fold_itinerary_rebuild_target.v0.md` as the
   explicit 12-root itinerary-rebuild target, with
   `candidate_cycle_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.md`
   as its diagnostic seed surface,
   `fresh_v10_higher_fold_root_tube_certificate.v0.md` as the binary64
   root-count audit surface, and
   `fresh_v10_higher_fold_root_tube_interval_certificate.v0.md` as the
   proof-grade root-count topology certificate, plus the proof-interval
   v1/v2/v3/v4/v5/v6 sidecars under `fresh-v10-higher-fold-12-root-rebuild-v0`: v1
   certifies 270 exact-rational coarse range-empty rows, v2 certifies 1,062
   row-specific trigonometric range-empty rows, v3 certifies those 1,062
   range-empty rows plus 26 root-complement monotone diagonal exclusions, and
   v4 records 42 simple-root receiver subwindow certificates while consuming 0
   parent simple-root rows. v5 audits those 42 regular residual parents,
   certifies 571 simple-root receiver cells, misses 773 cells, and consumes 0
   parent rows. v6 adaptively refines the failed receiver cells to terminal grid
   128, certifies 622 simple-root receiver leaves, records 3,024 structural
   terminal source-cover misses, resolves 0 coarse cells, and consumes 0 parent
   rows. The source-cover defect atlas records the exact rational terminal
   boundary burden for the 42 regular rows: 1,207 low-side and 1,817 high-side
   terminal source-cover defects, with 10 low-only rows, 10 high-only rows, and
   22 two-sided rows. It also records 0 receiver-interior missing leaves, so the
   current obstruction is boundary ownership or boundary movement rather than
   interior receiver-cover failure. The boundary ownership audit proves 42 / 42
   complete terminal-grid receiver partitions while certifying 0 rows against
   the full pass rule, so the next regular-row target is a source-boundary
   movement, receiver-contraction, or endpoint/topology ownership certificate.
   The one-leaf boundary movement probe checks the three smallest regular-row
   components and certifies 0 movement or contraction rows; its strict
   thresholds are `0.000026691996524`, `0.000026691996524`, and
   `0.00024618430271`.
   The source-boundary movement theorem attempt verifies those thresholds as
   exact source-boundary defect identities but certifies 0 source-boundary
   movement rows because the packet lacks a same-packet source-boundary
   variation or endpoint-tightening certificate that preserves monotonicity and
   memory margins.
   The receiver-range contraction theorem attempt verifies the same thresholds
   as exact receiver-boundary defect identities but certifies 0 receiver
   contraction rows because the packet lacks a same-packet receiver-range
   refinement or receiver endpoint-tightening certificate that preserves
   monotonicity and memory margins.
   The candidate-change boundary-data constructor combines those two failed
   routes into exact boundary-opening inequalities,
   `sigma_source_lower + rho_receiver_lower > required_strict_improvement_q`
   for the two low-side rows and
   `sigma_source_upper + rho_receiver_upper > required_strict_improvement_q`
   for the high-side row. It declares all three targets but certifies 0
   same-packet candidate-change boundary-data rows because the packet contains
   no deformation or endpoint-tightening data assigning positive boundary
   shifts.
   The direct-path lambda shift screen then tests the first concrete candidate
   direction for those shifts. At sampled active endpoints, increasing `lambda`
   from `0.3` to `0.305` opens all three one-leaf boundary targets; the largest
   active-endpoint threshold is `lambda>0.301815056706425`. The follow-on
   `lambda=0.305` replay recertifies proof-grade 12-root topology for the trial
   seed and reruns the v1-v6 preledger sidecars, but still leaves 162 rows
   `split_required`, 0 complete receiver-cover parent rows, 0 accepted
   fold-layer rows, and no branch-chart authorization. This remains
   priority-only and fail-closed because direct-path lambda motion alone does
   not prove monotonicity, memory, ownership, branch-reuse exclusion, or
   non-owned-complement closure for row consumption.
   The preledger row-family classifier now fixes the non-rule-blocked handoff:
   the 162 split-required rows split into 42 regular source-cover
   parent-complement rows, 8 periodic endpoint/complement rows, and 112
   higher-fold layer rows. The `lambda=0.305` replay improves v6 receiver-cover
   certified cells by 10 and reduces structural misses by 12, but it does not
   reduce the split-required row count, complete any parent row, accept any
   fold-layer row, or authorize a branch chart. The most promising mechanical
   certificate target is therefore the regular source-cover one-leaf
   interval-certificate route, beginning with the three screened one-leaf rows.
   The one-leaf proof-data readiness classifier then reduces that route to the
   first missing proof object: all three screened rows are sampled-positive and
   have a proof-data target declared, but all three first block at
   `source_endpoint_interval_box_constructed`, with first source-layer blocker
   `source_endpoint_boundary_binding_constructed`. The endpoint-box/residual-function
   pair certificate attempt is now recorded in
   `one_leaf_endpoint_box_residual_function_pair_certificate_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.md`:
   it verifies that 4 / 4 first endpoint-boundary-binding primitives,
   witness-object endpoint-boundary-binding refs, endpoint value-binding maps,
   and endpoint values bound to boundary bindings are present, with 3 / 3 row
   primitive/ref/value-map pairs, but it still constructs 0 / 4 binding
   contracts, witness-object contract links, full endpoint boundary bindings,
   carrier admissions, endpoint motion/evaluation maps, and 0 / 3 endpoint
   interval-box pairs, residual-function pairs, residual interval-bound pairs,
   pair certificates, preledger passes, or consumed rows. The current blocker
   is `binding_contract_satisfied`, with symmetric
   `witness_object_has_contract_link` absent. If that proof object requires a
   rule decision, the route remains fail-closed at this handoff.
   The one-leaf binding-contract satisfaction dependency classifier then tests
   that handoff against the no-contract-link chain, target ref/value
   promotion-rule attempt, and terminal constructor-basis attempt. It records
   4 / 4 endpoint value-binding maps, 4 / 4 binding-contract tests, 6 target
   ref/value source equations, 6 value-map bindings, 4 / 4 constructor-basis
   source scopes, and 3 / 3 row constructor-basis source-scope pairs, but 0 / 4
   no-contract-link premise proofs, proof-grade target ref/value packages,
   promotion rules, predicate-symbol constructor bases, argument-sort
   constructor bases, judgment-codomain constructor bases,
   endpoint-localization rules, constructor-basis soundness proofs,
   constructor-basis derivations, binding contracts, witness-object contract
   links, preledger passes, or consumed rows. The route now collides with the
   stopped constructor-basis blocker at `predicate_symbol_constructor_basis_present`;
   no row consumption or branch-chart authorization follows, and this lane
   should not continue without new proof-grade constructor-basis evidence or an
   explicit pivot.
   The fold-layer burden atlas groups the 112 fold-layer rows
   by 12 separator layers, but consumes 0 rows. The branch still leaves 162
   rows `split_required` across 42 structural parent complement-coverage rows,
   8 periodic endpoint/complement rows, and 112 fold-layer rows. The periodic
   endpoint/complement ownership classifier then isolates the 8 seam rows with
   source interval `A12`, source lift `-1`, and row-specific overlap/touching,
   but records 0 / 8 source-lift consistency proofs, endpoint ownership
   certificates, complement closure certificates, no-double-counting
   certificates, branch-reuse exclusions, or consumed rows. The higher-fold
   layer same-packet field readiness classifier records the absent-field
   fold-layer baseline: it records 112 split-required fold-layer rows over
   `Sigma_hf_01` through `Sigma_hf_12`, ledger counts `u=56`, `w=56`, interval
   type counts `regular -> fold_layer_candidate = 50`,
   `fold_layer_candidate -> regular = 38`, and
   `fold_layer_candidate -> fold_layer_candidate = 24`, with 0 / 112 rows
   carrying `higher_fold_layer_atlas_ref`, `alpha_floor`, `exit_floor`,
   `same_packet_fold_impulse_or_direct_quadrature_bound`,
   `fold_layer_parity_record`, or `parent_complement_consumption_ref`. It
   consumes 0 rows, keeps `preledger_pass=false`, keeps
   `updates_live_ledger=false`, keeps `accepted_fold_layer_rows=0`, and
   authorizes no branch chart. The follow-up atlas-ref source candidate
   classifier constructs 12 / 12 candidate atlas source refs and assigns
   candidate refs to 112 / 112 fold-layer rows, but keeps 0 / 112 accepted
   `higher_fold_layer_atlas_ref`, `alpha_floor`, `exit_floor`,
   `same_packet_fold_impulse_or_direct_quadrature_bound`,
   `fold_layer_parity_record`, or `parent_complement_consumption_ref`; it also
   consumes 0 rows and authorizes no branch chart. The accepted atlas-ref
   obligation classifier then verifies complete candidate source evidence for
   12 / 12 separator refs and 112 / 112 rows, but fail-closes at
   `higher_fold_separator_layer_certificate_absent`: 0 / 112 accepted
   `higher_fold_layer_atlas_ref`, 0 / 112 separator-layer certificates, 0
   accepted fold-layer rows, 0 consumed rows, and no branch-chart
   authorization. The separator-certificate attempt then rejects the inspected
   `fold_impulse_constants.json` source for all 12 separator refs as
   wrong-packet, non-interval-certified, not accepted, and non-matching for
   `Sigma_hf_*`, so it still records 0 / 112
   `higher_fold_separator_layer_certificate`, accepted
   `higher_fold_layer_atlas_ref`, proof-grade `alpha_floor`, proof-grade
   `exit_floor`, impulse/direct-quadrature bounds, parity records, consumption
   refs, consumed rows, or branch-chart authorizations. The separator
   source-field readiness classifier then separates the positive source-side
   fact from proof-grade promotion: 12 / 12 separator profiles and 112 / 112
   fold-layer rows have complete candidate interval source fields, including
   same-packet layer geometry, input-screen intervals, mesh intervals,
   root-tube one-root interval sources, derivative-floor sources, and the
   no-extra-root complement packet with total root count `12..12`, but 0 / 112
   rows have `higher_fold_separator_layer_certificate`, accepted
   `higher_fold_layer_atlas_ref`, `alpha_floor`, `exit_floor`,
   `same_packet_fold_impulse_or_direct_quadrature_bound`,
   `fold_layer_parity_record`, or `parent_complement_consumption_ref`. The
   proof-field dependency classifier then records that the next fold-layer
   source packet is not row consumption but
   `same_packet_fold_impulse_or_direct_quadrature_bound_source_packet`: 12 / 12
   accepted atlas-ref, alpha-floor, exit-floor, parity, and parent
   row-association targets have candidate anchors, but 0 / 12 separator
   profiles have a same-packet impulse/direct-quadrature source packet or any
   proof-grade child field. The same-packet impulse/direct-quadrature
   source-packet attempt then reduces that blocker to full input-screen
   row-rectangle interval sources and row projection/source-slice candidates
   for 112 / 112 fold-layer rows and 12 / 12 separator layers, while still
   recording 0 mollifier or direct-quadrature route declarations, certified
   `M_delta` or `Gamma/g` coupling fields, accepted coverage certificates,
   dual-mollified row integrand interval enclosures, direct quadrature
   enclosures, row impulse enclosures, or accepted
   `same_packet_fold_impulse_or_direct_quadrature_bound` source packets. The
   first missing source-packet checklist field is
   `mollifier_or_direct_quadrature_route_declaration_absent`; the first reduced
   acceptance blocker is
   `row_projection_source_slice_coverage_certificate_absent`; the first
   numerical enclosure blocker is
   `dual_mollified_row_integrand_interval_enclosure_absent`. The same-packet
   impulse route-declaration attempt then declares
   `mollifier_norm_full_input_screen_rectangle_fallback` as the candidate
   route for 12 / 12 separator layers and 112 / 112 fold-layer rows, with
   candidate `E_B`, `S_B(t)`, `L_r_B`, and `L_s_B` bindings from the full
   input-screen row rectangles. It proves no accepted route declaration, no
   same-packet `M_delta` certificate, no `Gamma/g` coupling certificate, no
   accepted coverage certificate, no row enclosure, no accepted source packet,
   no row consumption, `preledger_pass=false`, no live-ledger update, and no
   branch-chart authorization. The first source-packet blocker after route
   declaration is `M_delta_interval_certified_absent`; the first coupling
   blocker is `Gamma_g_coupling_certified_absent`; the first coverage blocker
   remains `row_projection_source_slice_coverage_certificate_absent`; and the
   first numerical enclosure blocker remains
   `dual_mollified_row_integrand_interval_enclosure_absent`. The same-packet
   mollifier `M_delta` certificate attempt then certifies `M_delta=15/16` and
   `delta_eta_sup_norm=375/8` by exact rational arithmetic for 12 / 12
   separator layers and 112 / 112 fold-layer rows. It proves no `Gamma/g`
   coupling certificate, no accepted coverage certificate, no row enclosure, no
   accepted source packet, no row consumption, `preledger_pass=false`, no
   live-ledger update, and no branch-chart authorization. The first
   source-packet blocker after this artifact is
   `Gamma_g_coupling_certified_absent`; the first coverage blocker remains
   `row_projection_source_slice_coverage_certificate_absent`; and the first
   numerical enclosure blocker remains
   `dual_mollified_row_integrand_interval_enclosure_absent`. The same-packet
   mollifier coupling certificate attempt then certifies `Gamma=g=1` for
   12 / 12 separator layers and 112 / 112 fold-layer rows while carrying the
   `M_delta` certificate forward. It proves no accepted coverage certificate,
   no row enclosure, no accepted source packet, no row consumption,
   `preledger_pass=false`, no live-ledger update, and no branch-chart
   authorization. The first source-packet blocker after this artifact is
   `row_projection_source_slice_coverage_certificate_absent`; the first
   numerical enclosure blocker remains
   `dual_mollified_row_integrand_interval_enclosure_absent`. The same-packet
   row coverage certificate attempt then joins the source-packet rows, route
   declarations, and coupling rows by `row_id` and certifies full input-screen
   rectangle equality coverage for 12 / 12 separator layers and 112 / 112
   fold-layer rows. It proves no row-tube eta-sqrt scaling, no row enclosure,
   no accepted source packet, no row consumption, `preledger_pass=false`, no
   live-ledger update, and no branch-chart authorization. The first
   source-packet blocker after this artifact is
   `dual_mollified_row_integrand_interval_enclosure_absent`. The same-packet
   row enclosure certificate attempt then applies the mollifier-norm
   full-input-screen rectangle fallback with exact row bound constant `18750`.
   It certifies 112 / 112 dual-mollified row integrand interval enclosures,
   row acceleration ceilings, and row impulse ceilings, while still proving no
   row-tube eta-sqrt scaling, no direct quadrature, no separator aggregate
   fields, no accepted source packet, no row consumption, `preledger_pass=false`,
   no live-ledger update, and no branch-chart authorization. The first
   source-packet blocker after this artifact is
   `separator_aggregate_C_Sigma_present_absent`. The same-packet separator
   aggregate certificate attempt then constructs 12 / 12 separator aggregate
   `C_Sigma`, `A_Sigma_eta_epsilon_c`, and
   `I_fold_eta_epsilon_c_Sigma` fields from the row enclosures by exact
   rational arithmetic. It still proves no row-tube eta-sqrt scaling, no direct
   quadrature, no accepted source packet, no `higher_fold_separator_layer_certificate`,
   no row consumption, `preledger_pass=false`, no live-ledger update, and no
   branch-chart authorization. The first source-packet blocker after this
   artifact is
   `same_packet_fold_impulse_or_direct_quadrature_bound_source_packet_absent`.
   The same-packet impulse-bound source-packet acceptance dependency classifier
   then confirms that aggregate fields are present for 12 / 12 separator layers,
   but records 0 source-packet acceptance rules, 0 accepted source packets, 0
   `higher_fold_separator_layer_certificate` fields, no row consumption,
   `preledger_pass=false`, no live-ledger update, and no branch-chart
   authorization. The first source-packet blocker after this artifact is
   `fixed_parameter_separator_aggregate_to_same_packet_fold_impulse_or_direct_quadrature_bound_acceptance_rule_absent`;
   the alpha/exit/parity child-field interval diagnostic then materializes
   candidate child sources for 12 / 12 separator profiles and 112 / 112
   fold-layer rows without deciding that source-packet acceptance rule. It
   records positive candidate `alpha_floor` sources with minimum
   `20.353739080283133119`, positive candidate `exit_floor` source-rectangle
   widths with minimum `0.008`, and root-tube parity source evidence for all 12
   separator profiles, while still proving 0 / 112 proof-grade `alpha_floor`,
   `exit_floor`, or `fold_layer_parity_record` fields, 0 row consumption,
   `preledger_pass=false`, no live-ledger update, and no branch-chart
   authorization. The mechanical child-field blockers are
   `proof_grade_alpha_floor_derivation_absent`,
   `proof_grade_exit_floor_derivation_absent`, and
   `explicit_fold_layer_parity_record_delta_fields_absent`;
   the follow-on child-field derivation attempt then sharpens those blockers to
   0 fresh `alpha_floor` proof refs, 0 fresh `exit_floor` proof refs, 0 fresh
   `fold_layer_parity_record` proof refs, and 0 fresh parity delta fields
   `delta_root_count`, `delta_signed_degree`, `local_even_jump`, and
   `parity_status`. It rejects stale seed-packet parity data and still consumes
   0 rows, keeps `preledger_pass=false`, and authorizes no branch chart. The
   next child-field blockers are `alpha_floor_proof_grade_ref_null`,
   `exit_floor_proof_grade_ref_null`,
   `fold_layer_parity_record_proof_grade_ref_null`, and
   `fresh_fold_layer_parity_record_delta_fields_absent`;
   the source-ref manifest then materializes deterministic `source_ref` handles
   for `alpha_floor`, `exit_floor`, and `fold_layer_parity_record` evidence for
   12 / 12 separator profiles and 112 / 112 rows. It also records 12 / 12
   candidate parity delta records and 112 / 112 row-level candidate parity
   delta associations, while keeping 0 proof-grade child fields,
   0 proof-grade parity delta fields, 0 row consumption, `preledger_pass=false`,
   and no branch-chart authorization. The current child-field blocker is
   `child_field_source_ref_handle_not_proof_grade_ref` plus
   `candidate_parity_delta_record_not_proof_grade_ref`;
   the derivation source-data proof attempt then packages complete
   derivation-source-data records for `alpha_floor`, `exit_floor`, and
   `fold_layer_parity_record` for 12 / 12 separator profiles and 112 / 112
   rows. It preserves 12 / 12 candidate parity delta records and 112 / 112
   row-level candidate parity delta associations, while keeping 0 proof-grade
   child refs, 0 proof-grade parity delta fields, 0 row consumption,
   `preledger_pass=false`, and no branch-chart authorization. The current
   child-field blocker is complete derivation source data that still is not a
   `proof_grade_ref`: `child_field_source_ref_handle_not_proof_grade_ref` plus
   `candidate_parity_delta_record_not_proof_grade_ref`;
   the source-data proof-grade ref obligation classifier then counts
   336 missing child-field `proof_grade_ref` obligations and 448 missing
   proof-grade parity delta field obligations across 112 / 112 rows, while
   keeping 12 / 12 candidate parity delta records and 112 / 112 row-level
   candidate parity delta associations source-side only, 0 proof-grade child
   refs, 0 proof-grade parity delta rows, 0 row consumption,
   `preledger_pass=false`, and no branch-chart authorization. The current
   child-field blocker is counted proof-grade obligations still unsatisfied:
   `child_field_source_ref_handle_not_proof_grade_ref` plus
   `candidate_parity_delta_record_not_proof_grade_ref`;
   the proof-grade derivation application attempt then applies a strict
   existing-proof-grade-derivation-ref test to those obligations, constructing
   0 proof-grade `alpha_floor` refs, 0 proof-grade `exit_floor` refs,
   0 proof-grade `fold_layer_parity_record` refs, and 0 proof-grade parity
   delta rows across the same 112 rows. The current child-field blocker is no
   imported proof-grade child derivation ref:
   `proof_grade_alpha_floor_derivation_absent`,
   `proof_grade_exit_floor_derivation_absent`,
   `proof_grade_fold_layer_parity_record_absent`, and
   `proof_grade_fold_layer_parity_record_delta_fields_absent`;
   the source-certificate bridge attempt then records available root-tube
   source certificates for 112 / 112 alpha-floor row associations and
   112 / 112 fold-layer parity row associations, plus 112 / 112 exit candidate
   interval-width sources, while constructing 0 generic
   source-certificate-to-child-field derivation bridges; the alpha-floor
   root-tube derivative-floor
   proof-grade derivation attempt then constructs 112 / 112 proof-grade
   `alpha_floor` refs from 12 / 12 one-root separator tubes, 12 / 12 positive
   derivative floors, 0 failing derivative-piece profiles, and 112 / 112 exact
   source-data/root-tube rational matches, with 0 source-ref-as-proof-ref reuse.
   It still constructs 0 proof-grade `exit_floor` refs, 0 proof-grade
   `fold_layer_parity_record` refs, and 0 proof-grade parity delta rows; the
   fold-layer parity-record root-tube topology proof-grade derivation attempt
   then constructs 112 / 112 proof-grade `fold_layer_parity_record` refs and
   112 / 112 complete proof-grade parity delta rows from 12 / 12 one-root
   separator tubes, 12 / 12 endpoint sign-change certificates, 12 / 12
   complement no-extra-root profiles, and 0 failing derivative-piece profiles,
   with 0 source-ref-as-proof-ref reuse. It still constructs 0 proof-grade
   `exit_floor` refs; the exit-floor interval-width source-certificate attempt
   then constructs 112 / 112 proof-grade `exit_floor` source certificates from
   exact same-packet interval-width checks and distinct
   `proof_source_certificate_ref` handles, while still constructing 0
   proof-grade `exit_floor` refs;
4. assemble the signed gap derivative matrix $A$ for the selected orientations
   above;
5. keep the structural constraint matrix $B=DC(\mathbf a_0)$, including section,
   symmetry, separator, matching, and neutral-coordinate rows;
6. solve
   $$
   B\xi=0,
   \qquad
   A\xi\ge\kappa+\gamma;
   $$
   together with finite field-speed-itinerary inequalities inside that
   constrained solve;
7. emit a candidate packet only after the same deformation also preserves or
   recomputes the simple-root and empty-row certificates.

This is the shortest path toward closure because it attacks the actual
parent-complement obstruction rather than adding a regular-boundary theorem
around the same overlap geometry.

## Capture Decision

Priority-only. This packet is not corpus-ready and should not be promoted into
$\mathbb{A}\mathbb{A}\mathbb{A}$ prose. It provides the next strict finite target for the proof-program
queue: repair the candidate until the 10 parent-complement strips have certified
positive null-coordinate gaps, then run the applicable proof-interval preledger
for that repaired or successor packet before any branch-chart construction.
