# Collinear-Breather Certificate Pass/Fail Ledger

## Status

This ledger records the current finite certificate packet for the collinear-breather proof program. It is a status ledger only: it does not add a gate, does not certify a branch chart, and does not promote the conditional Schauder theorem.

Current verdict: the proof has not passed. The current packet is rejected at the null-coordinate pre-ledger before branch-chart certification.

## Packet Identity

The current packet identifier is `seed-doubled-four-arc-cosine-template-v0`.

The packet identity tuple is
$$
\mathfrak{I}_{\mathrm{seed}}
=
\left(
\mathcal{K},
T_{\mathrm{cyc}},
\mathcal{S},
\mathcal{P},
\mathcal{B}_{\mathrm{rep}},
\Theta
\right).
$$

| Entry | Current value |
| --- | --- |
| $\mathcal{K}$ | `doubled_four_arc_generic` |
| $T_{\mathrm{cyc}}$ | `6.28318530718` |
| $\mathcal{S}$ | `section x(0)=1.25, xdot(0)=0 with inbound-side convention supplied by the first nonzero mesh point` |
| $\mathcal{P}$ | `c_f=1.0`, `eta=0.02`, `epsilon_c=0.05`, `g=1.0`, `h=6.28318530718` |
| $\mathcal{B}_{\mathrm{rep}}$ | `cosine-velocity-class-template-v0` |
| $\Theta$ | `mesh.json:nodes`; refined pre-ledger diagnostic uses `mesh_refined_preledger_v1.json` with `refinement_id=preledger-separator-level-split-v1` |

The candidate template is
$$
x(\theta)=1.25\cos(2\pi\theta),
\qquad
T_{\mathrm{cyc}}=2\pi,
\qquad
c_f=1.
$$
It is finite candidate data only. It is not an EOM-solved or returned-sample-certified cycle.

## Status Vocabulary

| Status | Meaning in this ledger |
| --- | --- |
| `accepted` | The artifact or row satisfies its local existing acceptance condition. This does not imply the full proof passed. |
| `diagnostic` | The artifact supplies finite calculations or routing information but is not accepted certificate data and does not consume rows. |
| `rejected` | The current packet failed an existing certificate condition at this row. |
| `blocked` | The row cannot be executed because a required earlier row is rejected or absent. |
| `pending` | The row is required later, but is not executable until dependencies pass. |
| `absent` | The required artifact is not present in this certificate directory. |

## Available Artifacts

SHA-256 values were observed during this pass for the existing artifacts.

| Artifact | Status | SHA-256 | Notes |
| --- | --- | --- | --- |
| `itinerary.json` | `accepted` as coarse parity data | `790050fbcc64b51318bf2d79598e2c1d346492de91881457112a33d34f0b7c47d` | `status=coarse_parity_gate_passed`; necessary only, not a branch chart. |
| `itinerary_parity_report.md` | `accepted` as coarse parity report | `95a46051fcedef128b0f75682b09b3aeb08f7a84d39a79608e7527fd86dd55cf` | Verifies $\Delta N\in2\mathbb{Z}$ and $\Delta D=0$ at the velocity-class separator gate. |
| `phi_cyc.json` | `accepted` as finite candidate data | `e14b0ca5219e4c3a9446fdb4b090087cf3557a75ea9b003c7284c12b6927ea1c` | `status=candidate`; residual targets are `not_evaluated`. |
| `mesh.json` | `accepted` as draft candidate mesh | `71e2c7a0f87d75c07fc5b5ada4bcb51155498519c021b3985aa55868f83587ee` | `status=draft_mesh_for_candidate_packet`; 15 nodes and 25 parent subblocks. |
| `candidate_cycle_packet_report.md` | `accepted` as finite packet report | `99a17c7b618dff127c5cd1e56d6e368e80ff3d85e2c5bc3f76bf23a49b092096` | Clears only `Candidate data absent`. |
| `mesh_refined_preledger_v1.json` | `rejected` diagnostic refinement | `8f18ef61acbe298f11fc2f3d355114bf72676da4f90046781a7afdcc316035ba` | `status=diagnostic_refinement_rejected_fold_impulse_and_fold_adjacent_parent_leftovers`. |
| `diagonal_exclusion_subledger.json` | `accepted` subledger | `8de6b0b2decbb03be42459fbc2d0d598e8e5ad09cb1bd0a52a372049465e0f66` | 24 diagonal, periodic endpoint, and adjacent-boundary contacts accepted as empty rows. |
| `fold_layer_atlas.json` | `blocked` as live fold-layer certificate | `cddbd7ffe760e27d84fb493ec2df1d20ca2403474588c3a26493f24ccead9d04` | Kinematic atlas is ready, and an accepted fixed-parameter fold ceiling now exists externally in `fold_full_interval_constants_certificate.json`; the live atlas still has zero accepted fold-layer rows because it has not been rewritten and the parent complements remain open. |
| `causal_ledger.json` | `rejected` as full pre-ledger | `d4a366e18ec73293269ede3ca065a64fba4779c6959b9c687b6d3209e441062b` | `status=preledger_rejected_fold_impulse_and_fold_adjacent_parent_leftovers_remaining`; `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.md` | `rejected` interval report | `1e615908372002be71abc73b6278bd70a7df7d421350c31e875c8c39db91f589` | Records the exact rejected pre-ledger state. |
| `seed_chart_packet.md` | `accepted` as contract only | `1d02c826c14bd4cb6b4cda33ebdd1178e2b624bc65bd2634b12ec14dcb841e70` | Specifies schemas and pass/fail routing; it is not a proof artifact by itself. |
| `fold_impulse_bound_derivation.md` | `accepted` as conditional proof form | `67bb17108814549c9028adb855e1ff7bf66efbd5a5e8854b26bd2c89ecf614d7` | Derives the finite separator-ceiling form and a full-interval fallback; it is not a certificate pass. |
| `fold_impulse_constants.json` | `diagnostic` only | `d75e04a8de36b9726c60c0aeb00bf7383ccad1e9ddef75f996261ed9b1db036b` | `status=diagnostic_bound_not_interval_certified`; finite values are not accepted interval constants and consume no rows. |
| `fold_row_consumption_report.md` | `accepted` as row-consumption map | `de1ba2cd440733ac5e76e9003a8a532abecfc866f5b30ddb8d876497642fad7b` | Maps the 16 fold-layer rows and 6 parent rows; it does not update `causal_ledger.json`. |
| `fold_interval_constants_contract.md` | `accepted` as contract only | `a45d4e2f52249923c0fa8b57d2b9f2819ee3046c9a2d61278618016de79ac54c` | Defines the required accepted-constants fields and pass/fail route for the mollifier, coupling, row-tube, source-slice, row-enclosure, and separator-aggregate data. |
| `fold_parent_boundary_complement_packet.md` | `accepted` as contract only | `bdfe5d1bd031117234202808dd3141d3dd4c0329bc0b4ceae9f329db691fc01d` | Defines how the six fold-adjacent parent rows are consumed after accepted fold-layer constants: strict range-empty complements, coverage by accepted fold-layer rows, or endpoint-excluded complements. |
| `fold_mollifier_coupling_audit.md` | `accepted` as audit | `b21af9941cc51e47beda398ae70b846cb07fdbb0bce9735d4b4ac3eb80cc86ba` | Confirms `g=1.0` is the packet's reduced $\Gamma=\kappa\epsilon^2$ convention and identifies the missing mollifier/direct-quadrature route later narrowed by `fold_mollifier_kernel_candidate.md`. |
| `fold_mollifier_kernel_candidate.md` | `accepted` as local kernel candidate | `10123bd48f13ade05c79d9a0ad0cee26828a6c657a7301657af5df71534986a9` | Proves a compact-support $C^1$ shell mollifier with $M_\delta=15/16$ and $\|\delta_\eta\|_\infty=46.875$ for $\eta=0.02$; it does not accept fold constants. |
| `fold_interval_constants_attempt.json` | `rejected` interval attempt | `f2cc699b8efb6704b78be120c16c90991c535be39bed2f81ec184704d1697128` | `status=rejected_interval_constants_mollifier_candidate_available_missing_row_tubes_and_dual_mollified_enclosures`; `fold_constants_all_accepted=false`; `branch_chart_authorized=false`. |
| `fold_row_tube_coverage_attempt.md` | `rejected` coverage attempt | `4da54035f93c4b0d807e43a4e5c9330a12fabcabcde3364127772aba33467bfa` | Shows the existing refined intervals provide only full-interval diagnostic fallbacks, not certified $E_B$, $S_B(t)$, $L_{r,B}$, $L_{s,B}$, or support coverage. |
| `fold_full_interval_fallback_legality.md` | `accepted` as legality note | `5b761fb6fb0f062f9d569860f87af98512ae6060340a19cf6fcf8042427a4708` | Shows the contracts permit a coarse fixed-parameter full-interval fallback, while excluding row-tube $O(\eta^{1/2})$ scaling and direct-quadrature claims. |
| `fold_full_interval_constants_certificate.json` | `accepted` fixed-parameter constants | `e5dc6c97327fa360e562ea976c0bc7db7595ac2ecbcf5d482ecffb2b7dc257e1` | `status=accepted_fixed_parameter_full_interval_fallback_not_row_tube_scaling_not_direct_quadrature`; all 16 fold rows and all 4 separator aggregates have finite accepted fallback constants; `branch_chart_authorized=false`. |
| `fold_parent_after_full_interval_status.md` | `accepted` as post-constants status | `00fad445b3184b4805867b0a3f9d35c3500d52331977f6471a4f0b5e99d856ff` | Records that the 16 fold rows become fold-ceiling-ready under the accepted full-interval certificate, but the six parent boundary complements still block the pre-ledger. |
| `fold_parent_w_complement_closure_attempt.md` | `rejected` closure attempt | `f4c18d23de4d14b13b0d8794d6b54fc74dd247d98307d7cdbe2ddf43a00f0cc3` | Shows the three `w` parent rows cannot be consumed without explicit complement intervals, certified $\Delta^w_B>0$ gaps, or exact $\mathcal{F}_{\Sigma_1}$ / $\mathcal{F}_{\Sigma_2}$ membership. |
| `fold_parent_u_complement_closure_attempt.md` | `rejected` closure attempt | `a5343044ac6d839456ed835b2cd3ec807a3a845c89ecef2b7fdf3e384fc11f56` | Shows the three `u` parent rows cannot be consumed without explicit complement intervals, certified $\Delta^u_B>0$ gaps, or exact $\mathcal{F}_{\Sigma_3}$ / $\mathcal{F}_{\Sigma_4}$ membership. |
| `fold_parent_complement_partition_attempt.md` | `rejected` partition attempt | `469a49a4f72606a207e2e1ad5496144bb2a62b318a89093550768efcd084427d` | Enumerates the natural boundary strips left after the six accepted simple-root subrows and rejects strict range-empty closure because the strip ranges are zero/touching; later endpoint and subdivision attempts still leave residual equality cores. |
| `fold_parent_endpoint_exclusion_legality.md` | `rejected` historical proof-policy attempt | `000ed5ed81b2eef8a5ac30c9b2e04c1a63f84d9580dd37afb1c3b244c47d2590` | Shows endpoint-touching parent strips were not accepted under the original two-alternative parent-complement contract; the later Route A extension adds the third alternative. |
| `fold_parent_fold_family_membership_attempt.md` | `rejected` membership attempt | `82a62b359f7d12d62f3c7a6be4573c86f204539975d602385124ac4b632f1fe4` | Shows none of the 20 named parent-complement strips is exactly one of the accepted fold-layer row rectangles. |
| `fold_parent_contract_decision_packet.md` | `accepted` as decision record | `dcc58cf6d5d0f2df88cfea2bcedace59199784fa88420401ff34b38c86647322` | Records the fork that led to the approved Route A endpoint-exclusion alternative and now points to the current cosine-packet rejection. |
| `fold_parent_endpoint_contract_extension.md` | `accepted` as contract extension | `54569bcf6e0bf30426cff8a76bfadf167d641e938d50ce550ddc1f85914721b9` | Records the Route A endpoint-excluded complement alternative now added to `fold_parent_boundary_complement_packet.md`; it does not itself close any row. |
| `fold_parent_endpoint_w_closure_attempt.md` | `rejected` endpoint-closure attempt | `c6511ad9080402ac3ab43668daa7d7e0735a212b23339094fbc6337e99d47c5a` | Locally accepts four singleton endpoint strips with root-count bound $[0,0]$, but rejects complete `w` closure because five strips have positive-width null-coordinate overlap and one lacks an outward-rounded gap. |
| `fold_parent_endpoint_u_closure_attempt.md` | `rejected` endpoint-closure attempt | `63845da29885b18f1453e0128189ae77c793ec94a41d8e2bc5325a915e9d9dd7` | Locally accepts three singleton endpoint strips with root-count bound $[0,0]$, but rejects complete `u` closure because seven strips have positive-width or endpoint-scale positive overlap and one lacks an outward-rounded gap. |
| `fold_parent_w_positive_overlap_subdivision_attempt.md` | `rejected` subdivision attempt | `3a46328ef7487ff0d246afe362213c59c2435fdf9472dfe1b6b24ab22f391ebb` | Splits the remaining `w` overlap strips by inverse thresholds, but residual equality cores retain positive-width overlap or an uncertified endpoint-scale gap; no `w` parent row is consumed. |
| `fold_parent_u_positive_overlap_subdivision_attempt.md` | `rejected` subdivision attempt | `c20818eab1cf737043796779f77e4fd2de4c5310987ef1a3f9536e50ee42bc8d` | Splits the remaining `u` overlap strips by inverse thresholds, but residual overlap cores and one uncertified endpoint-scale separated strip remain; no `u` parent row is consumed. |
| `fold_parent_regular_boundary_w_probe.md` | `rejected` regular-boundary probe | `3a61ef95e7e318a4acb8921b69470285f90aea7516f3a5ef79c45468a082c364` | Shows the residual `w` equality cores are only diagnostically adjacent to $\Sigma_1$ or $\Sigma_2$ and are not accepted $\mathcal{F}_{\Sigma_1}$ or $\mathcal{F}_{\Sigma_2}$ row rectangles. |
| `fold_parent_regular_boundary_u_probe.md` | `rejected` regular-boundary probe | `8b9b80c2fa9efdbda5ec04cbf5b470654b60bdc0c8e21493a00efe96d54c38a7` | Shows the residual `u` equality cores are only diagnostically adjacent to $\Sigma_3$ or $\Sigma_4$ and are not accepted $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$ row rectangles. |
| `fold_parent_regular_boundary_contract_probe.md` | `rejected` contract probe | `2ebceafffdfc3f4fcfc27e2e5164c48197cbe6d99e90f948772931c56e9b551b` | Defines the minimal finite same-packet regular-boundary theorem fields, then rejects current consumption because inclusion, domination, ownership, and non-core gap fields are absent. |
| `fold_parent_regular_boundary_coverage_attempt.md` | `rejected` integrated coverage attempt | `4725b74b51ccebeaf3ecef28e12a9a99bfd18a5d51200a8a08ccc81fa04ef6fc` | Integrates the `w`, `u`, and contract probes; regular-boundary coverage is not accepted for the residual equality cores, so no parent row is consumed. |
| `cosine_packet_parent_gate_rejection.md` | `accepted` as packet rejection status | `5fed19bebb391b23e8fb581b713bcef763cbbed66e829e99d2e57a75a0943dd6` | Records that the current cosine packet is rejected before branch-chart certification after all attempted parent-complement closure routes fail. |
| `next_candidate_refinement_handoff.md` | `accepted` as next-target handoff | `d577d8ca055af543815548d43a3d309be16ccc462e003fb3ef92822d71b1f3fd` | Opens the next fresh-candidate target and states that the rejected cosine packet must not proceed to branch-chart construction. |
| `fixed_cosine_refinement_rescue_test.md` | `rejected` rescue test | `0b33765cd6b50622336c0d75bb1e919b19a01b68279ea1736ddca2a0fe651e68` | Shows mesh-only/simple-root refinement is not a plausible rescue for the fixed cosine null-coordinate geometry; residual equality collars remain structural. |
| `fixed_history_strict_collar_persistence_lemma.md` | `accepted` as obstruction lemma | `d7ab760e6609394ac60e9ba671d19750bae579002971d3b3de8687757cbe0963` | Proves fixed-history mesh refinement cannot consume positive-width equality cores under strict simple-root coverage; the obstruction is a null-coordinate overlap invariant. |
| `sub_field_speed_action_test_case.md` | `accepted` as analytic baseline | `c4fda6c5682a195f650971f6921b2763da64ef68446e03089d69d3368d5d232f` | Records the action-generated sub-field-speed comparison branch: held-source release criterion, Lambert-$W$ exterior delayed-partner solution, and exact self-root exclusion under a strict sub-field speed cap. It does not authorize branch-chart construction. |
| `next_candidate_solver_target.md` | `accepted` as next solver target | `306f99597290e0b791d5d8d4ab6ef9a81afbcab0c0af180db126215c824365dc` | Defines the next executable target as a fresh fold-adapted collocation candidate with the null-coordinate pre-ledger as the first acceptance row and a tangent-space gap-opening criterion for parent complements. |
| `fresh_fold_collocation_solver_surface.md` | `accepted` as solver-surface audit | `c20665cf33ab43fbaa1eeb48ea44cac4aa477d160eb036c6ea6d4dc59d4eb0de` | Records that no runnable breather-specific fresh-candidate solver or pre-ledger generator exists yet and specifies the minimum lawful same-packet successor artifacts plus the finite gap-opening linearization. |
| `null_coordinate_separation_direction_lemma.md` | `accepted` as constructive next-candidate lemma | `50c4ed9e180c8cb775f000afd7aa556623cbc2bea479d1207392da1fa8a07ddf` | Converts parent-complement repair into a finite-dimensional separation-direction and tangent-space feasibility problem for fresh collocation candidates. |
| `aaa_corpus_recommendation_handoff.md` | `accepted` as promoted corpus handoff | `82369034df58a41b6983edf1a5042fd788ff55b9ebe791ac1b60ccf25a0b6408` | Records that scoped AAA updates promoted the null-coordinate pre-ledger as a candidate-falsification gate while keeping detailed rejected-packet data priority-only. |
| `regular_boundary_user_facing_recommendation.md` | `accepted` as user-facing corpus recommendation | `b7e4f09b90463fd04cf6726b5b3c03cbc8d468c5aa883d9d1b4928f560b34a26` | Recommends no named regular-boundary theorem in AAA now; the current generic same-packet complement predicate is sufficient until a same-packet inclusion/domination theorem exists. |
| `fold_row_consumption_attempt.md` | `rejected` historical row-consumption attempt | `51c766cb2f733a0a39aa65701194c27be9de1f4f2535a821413f85540c3f32cd` | Records that the earlier rejected interval attempt consumed zero rows before the accepted full-interval fallback certificate existed. |

## Absent Required Artifacts

| Artifact | Status | Blocking dependency |
| --- | --- | --- |
| `branch_chart.json` | `absent` | Blocked by rejected `causal_ledger.json`. |
| `seed_chart_interval_report.md` | `absent` | Blocked by absent `branch_chart.json` and rejected `causal_ledger.json`. |
| `corridor_nonemptiness_report.md` | `absent` | Pending after seed-chart row. |
| `parameters.json` | `absent` | Pending after corridor nonemptiness. |
| `coupled_corridor_interval_report.md` | `absent` | Pending after corridor nonemptiness and parameter selection. |
| `monodromy.json` | `absent` | Pending after branch-chart and coupled-corridor rows. |
| `monodromy_report.md` | `absent` | Pending after branch-chart and coupled-corridor rows. |
| `returned_samples.json` | `absent` | Pending after monodromy route decision. |
| `returned_sample_interval_report.md` | `absent` | Pending after monodromy route decision. |
| `topology_interval_report.md` | `absent` | Pending after returned-sample row. |

## Row Ledger

| Row | Current status | Evidence | Exact blocker or next action |
| --- | --- | --- | --- |
| Velocity itinerary parity prerequisite | `accepted` | `itinerary.json`, `itinerary_parity_report.md`; all separator jumps are even and signed degree is preserved. | No current blocker, but this is only a coarse parity gate and must be rerun if the itinerary changes. |
| Candidate-cycle packet | `accepted` as finite data | `phi_cyc.json`, `mesh.json`, `candidate_cycle_packet_report.md`; same packet id `seed-doubled-four-arc-cosine-template-v0`. | EOM residuals $E_j$, returned-history residuals $R_j^x,R_j^v$, and fold integral targets are `not_evaluated`; this row clears only `Candidate data absent`. |
| Seed-chart gate 1: candidate-cycle data | `accepted` as data | Finite template, period, parameters, mesh, and packet identity are present. | Proceeded to null-coordinate pre-ledger. |
| Seed-chart gate 2: null-coordinate pre-ledger | `rejected` | Live `causal_ledger.json`, `causal_preledger_interval_report.md`; 140 empty rows, 6 strict simple-root subrows, 0 accepted fold-layer rows, 22 `split_required` rows. `fold_full_interval_constants_certificate.json` supplies accepted fixed-parameter fold ceilings for the 16 fold rows without editing the live ledger. Route A endpoint exclusion, finer threshold subdivision, and regular-boundary coverage have all been attempted and rejected as complete parent-row consumption certificates. | The current cosine packet is rejected before branch-chart certification. The accepted fixed-parameter fold constants remain reusable diagnostics, but no live ledger rewrite is authorized because no route consumes the six parent rows. The next proof-program work is a new candidate/refinement target or a separately accepted enlarged regular-boundary theorem with inclusion and domination fields. |
| Seed-chart gate 3: active branch-chart certification | `blocked` and `absent` | `branch_chart.json` is absent; `branch_chart_authorized=false` in `causal_ledger.json`. | Requires a passed pre-ledger. No simple-root branch chart may be built while fold-layer rows and parent boundary leftovers remain unresolved. |
| Seed-chart row | `blocked` and `absent` | `seed_chart_interval_report.md` is absent. | Requires `branch_chart.json`, packet identity check, pre-ledger consumption, branch-chart authorization, strict seed margins, and finite sensitivities. |
| Coupled-corridor row | `pending` and artifacts `absent` | No corridor artifacts are present. | Depends on seed-chart row. |
| Monodromy diagnostic row | `pending` and artifacts `absent` | No monodromy artifacts are present. | Depends on branch-chart and coupled-corridor rows. |
| Returned-sample row | `pending` and artifacts `absent` | No returned-sample artifacts are present. | Depends on monodromy route decision plus prior certified domain. |
| Topology row | `pending` and artifact `absent` | `topology_interval_report.md` is absent. | Depends on returned-sample row. |
| Schauder closeout | `blocked` | All five finite audit rows have not passed on one same certified domain. | Conditional theorem cannot be promoted. |

## Accepted Subrows Inside The Rejected Pre-Ledger

The rejected pre-ledger still contains accepted subresults that should be preserved if the same packet is continued.

| Accepted subresult | Count or margin |
| --- | ---: |
| Certified range-empty base rows | 116 |
| Certified diagonal-exclusion empty rows | 24 |
| Certified empty base rows total | 140 |
| Certified simple-root subrows | 6 |
| Minimum range-empty gap $\gamma_{\mathrm{empty}}$ | 0.208212341788 |
| Minimum simple-root derivative floor $\nu_{\mathrm{simple}}$ | 0.055761655527 |
| Simple-root coverage gap $\gamma_{\mathrm{cov}}$ | 0.005 |
| Minimum memory-depth margin $\gamma_\tau$ | 0.278626695826 |
| Minimum horizon margin $\gamma_h$ | 4.197933629682 |
| Minimum sign margin $\gamma_{\mathrm{sign}}$ | 0.278626695826 |
| Minimum fold curvature floor $\alpha_{\Sigma}$ | 0.669228904575 |
| Minimum fold exit floor $\nu_{\mathrm{exit},\Sigma}$ | 0.055761655527 |

Accepted simple-root subrows:

| Row | Parent row | Ledger | Receiver | Source | Status |
| --- | --- | --- | --- | --- | --- |
| `S_u_A3_A2_1` | `R_u_A3_A2` | `u` | `A3` | `A2` | `accepted` simple-root subrow |
| `S_u_A4_A2_2` | `R_u_A4_A2` | `u` | `A4` | `A2` | `accepted` simple-root subrow |
| `S_u_A4_A3_3` | `R_u_A4_A3` | `u` | `A4` | `A3` | `accepted` simple-root subrow |
| `S_w_A1_A0_4` | `R_w_A1_A0` | `w` | `A1` | `A0` | `accepted` simple-root subrow |
| `S_w_A2_A0_5` | `R_w_A2_A0` | `w` | `A2` | `A0` | `accepted` simple-root subrow |
| `S_w_A2_A1_6` | `R_w_A2_A1` | `w` | `A2` | `A1` | `accepted` simple-root subrow |

## Exact Rejected Pre-Ledger Blockers

### Fold-Layer Impulse Ceiling Not Evaluated

The live `causal_ledger.json` still contains 16 rows with `failure_code=fold_layer_impulse_ceiling_not_evaluated`:

| Row | Ledger | Receiver | Source |
| --- | --- | --- | --- |
| `R_w_F1_A0` | `w` | `F1` | `A0` |
| `R_w_F1_F1` | `w` | `F1` | `F1` |
| `R_w_A1_F1` | `w` | `A1` | `F1` |
| `R_w_A2_F1` | `w` | `A2` | `F1` |
| `R_w_F2_A0` | `w` | `F2` | `A0` |
| `R_w_F2_A1` | `w` | `F2` | `A1` |
| `R_w_F2_F2` | `w` | `F2` | `F2` |
| `R_w_A2_F2` | `w` | `A2` | `F2` |
| `R_u_F3_A2` | `u` | `F3` | `A2` |
| `R_u_F3_F3` | `u` | `F3` | `F3` |
| `R_u_A3_F3` | `u` | `A3` | `F3` |
| `R_u_A4_F3` | `u` | `A4` | `F3` |
| `R_u_F4_A2` | `u` | `F4` | `A2` |
| `R_u_F4_A3` | `u` | `F4` | `A3` |
| `R_u_F4_F4` | `u` | `F4` | `F4` |
| `R_u_A4_F4` | `u` | `A4` | `F4` |

The four fold-layer atlas rows have positive kinematic data but are not accepted fold-layer rows in the live atlas file:

| Event | Ledger | Interval | $\alpha_{\Sigma}$ | $\nu_{\mathrm{exit},\Sigma}$ | $\Delta N$ | $\Delta D$ | Status |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| $\Sigma_1$ | `w` | `F1` | 0.669228904575 | 0.055761655527 | 2 | 0 | `blocked`: $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}$ not evaluated |
| $\Sigma_2$ | `w` | `F2` | 0.669228904575 | 0.055761655527 | -2 | 0 | `blocked`: $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}$ not evaluated |
| $\Sigma_3$ | `u` | `F3` | 0.669228904575 | 0.055761655527 | 2 | 0 | `blocked`: $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}$ not evaluated |
| $\Sigma_4$ | `u` | `F4` | 0.669228904575 | 0.055761655527 | -2 | 0 | `blocked`: $I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}$ not evaluated |

The accepted fixed-parameter certificate quantity now exists in `fold_full_interval_constants_certificate.json`:
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty.
$$
For each $\Sigma\in\{\Sigma_1,\Sigma_2,\Sigma_3,\Sigma_4\}$, the accepted full-interval fallback records
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
\le
11289.90742089375
$$
at $\eta=0.02$, $\epsilon_c=0.05$, $\Gamma=1$, and $M_\delta=15/16$. This is finite fixed-parameter consumption only: it is not the intended row-tube $O(\eta^{1/2})$ scaling and is not direct quadrature. In `fold_layer_atlas.json`, each row still reports `not_evaluated_missing_dual_mollified_acceleration_bound` with `C_Sigma=null`, `A_Sigma_eta_epsilon_c=null`, and `I_fold_eta_epsilon_c_Sigma=null` because the live atlas has not been rewritten.

`fold_impulse_bound_derivation.md` supplies the conditional finite form
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
\le
C_\Sigma\eta^{1/2}A_{\Sigma,\eta,\epsilon_c},
$$
and `fold_impulse_constants.json` records diagnostic full-rectangle values for all four separators. `fold_mollifier_coupling_audit.md` resolves the reduced coupling convention as
$$
g=1.0=\Gamma=\kappa\epsilon^2
$$
for the current packet. The interval attempt still rejects because the packet lacks direct quadrature enclosures, certified row-tube projections, and source-slice coverage for the fold rows. Therefore the diagnostic constants consume no rows.

`fold_mollifier_kernel_candidate.md` now supplies a compact-support normalized $C^1$ shell candidate
$$
\delta(z)=\frac{15}{16}(1-z^2)^2
$$
on $|z|\le1$ and zero outside, with exact
$$
M_\delta=\frac{15}{16}
$$
and
$$
\|\delta_\eta\|_\infty=46.875
$$
for $\eta=0.02$. `fold_full_interval_fallback_legality.md` shows that the full refined receiver/source intervals may be used as a coarse fixed-parameter fallback. `fold_full_interval_constants_certificate.json` imports this kernel and accepts the 16 fold rows for fixed-parameter fold-ceiling purposes. `fold_row_tube_coverage_attempt.md` remains rejected as a row-tube coverage proof: no fold row has certified shorter $E_B$, $S_B(t)$, $L_{r,B}$, $L_{s,B}$, or a proof that all mollifier support is covered for the intended scaling route.

### Fold-Adjacent Parent Boundary Leftovers

There are 6 rows with `failure_code=range_overlap_requires_level_split`:

| Row | Ledger | Receiver | Source | Accepted subrow already extracted |
| --- | --- | --- | --- | --- |
| `R_w_A1_A0` | `w` | `A1` | `A0` | `S_w_A1_A0_4` |
| `R_w_A2_A0` | `w` | `A2` | `A0` | `S_w_A2_A0_5` |
| `R_w_A2_A1` | `w` | `A2` | `A1` | `S_w_A2_A1_6` |
| `R_u_A3_A2` | `u` | `A3` | `A2` | `S_u_A3_A2_1` |
| `R_u_A4_A2` | `u` | `A4` | `A2` | `S_u_A4_A2_2` |
| `R_u_A4_A3` | `u` | `A4` | `A3` | `S_u_A4_A3_3` |

These parent rows have accepted simple-root interiors, but their boundary leftovers are adjacent to active fold layers. The fixed-parameter fold-layer alternative is now available for the 16 fold rows, and `fold_parent_endpoint_contract_extension.md` adds endpoint-excluded complements as a third contract alternative. The endpoint-closure attempts locally accept seven singleton-contact strips, and the finer positive-overlap subdivision attempts name diagnostic empty wings by inverse thresholds. The regular-boundary probes then reject current-contract coverage because the residual cores are not exact accepted fold-layer row rectangles and no finite same-packet inclusion/domination theorem is present. The six parent rows are therefore not consumed.

## Next Executable Row

The next executable row is still the null-coordinate pre-ledger, not the branch chart.

Next certificate action:

1. Use `fresh_fold_collocation_solver_surface.md`, `next_candidate_solver_target.md`, and `null_coordinate_separation_direction_lemma.md` to implement or manually instantiate a fresh fold-adapted collocation candidate for `doubled_four_arc_generic`; do not attempt another mesh-only rescue of the rejected cosine packet.
2. Run itinerary parity and the null-coordinate pre-ledger on the new packet identity before any branch-chart work.
3. Only after every pre-ledger row is `empty`, `simple_root`, or bounded `fold_layer` may `branch_chart.json` be produced.
4. The high-level falsification-gate principle has been promoted into the three proof-program AAA documents; keep the detailed rejected-packet inventory priority-only.
5. `regular_boundary_user_facing_recommendation.md` records the user-facing documentation decision: do not name regular-boundary coverage as accepted doctrine until a finite same-packet inclusion/domination theorem exists.
6. `fixed_history_strict_collar_persistence_lemma.md` explains the fixed-cosine obstruction, while `null_coordinate_separation_direction_lemma.md` gives the constructive fresh-candidate route: solve the tangent-space gap-opening feasibility problem before spending work on branch-chart rows.
7. `sub_field_speed_action_test_case.md` is the sidecar analytic baseline for a no-separator comparison: first test whether the action-generated held-source and exterior delayed-partner branches remain strictly sub-field-speed before spending branch-chart work on a field-speed itinerary.

The current cosine template is rejected before branch-chart certification even though the finite fixed-parameter fold ceiling is available.
