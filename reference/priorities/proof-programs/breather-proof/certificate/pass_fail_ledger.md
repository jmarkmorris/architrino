# Collinear-Breather Certificate Pass/Fail Ledger

## Status

This ledger records the current finite certificate packet for the collinear-breather proof program. It is a status ledger only: it does not add a gate, does not certify a branch chart, and does not promote the conditional Schauder theorem.

Current verdict: the proof has not passed. The rejected cosine packet remains
historical certificate evidence. The current successor packet is
`fresh-same-packet-fold-shear-seed-v0`: fresh candidate, input-screen, and
fail-closed preledger-attempt artifacts now exist. The fresh binary64
outward-padded preledger attempt accepted only 116 range-empty rows and 12
monotone diagonal exclusions, left 34 rows `split_required`, did not provide an
MPFR/Arb formal interval certificate, and authorized no branch chart. A separate
proof-interval-v1 sidecar now provides exact JSON numeric-token intake and
`BigInt` rational row classification for a coarser range-empty subset: it
accepts 70 rows by strict $c_fT_{\mathrm{cyc}}\theta\pm X_{\max}$ separation,
leaves 92 rows `split_required`, accepts no diagonal/simple-root/fold rows, and
also authorizes no branch chart. A proof-interval-v2 sidecar now adds
row-specific certified trigonometric $X_\delta$ enclosures: it accepts 116
range-empty rows, leaves 46 rows `split_required`, accepts no
diagonal/simple-root/fold rows, and still authorizes no branch chart.

## Packet Identity

The current successor packet identifier is
`fresh-same-packet-fold-shear-seed-v0`.

The earlier packet `seed-doubled-four-arc-cosine-template-v0` is retained below
as a historical rejected packet. Its cosine template, fold-shear witness,
finite deformation, and phase-shift seed contract are construction inputs for
the fresh successor, not active branch-chart authorization.

The packet identity tuple is
$$
\mathfrak{I}_{\mathrm{fresh\_shear\_v0}}
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
| $\mathcal{S}$ | `section x(0)=1.2447644729563, xdot(0)=-0.0876176690331297`, inbound speed `0.0876176690331297` |
| $\mathcal{P}$ | `c_f=1.0`, `eta=0.02`, `epsilon_c=0.05`, `g=1.0`, `epsilon_shear=0.0625`, `h=6.28318530718` |
| $\mathcal{B}_{\mathrm{rep}}$ | `phase-shifted-half-period-antisymmetric-C1-fold-shear-seed-v0` |
| $\Theta$ | `mesh.fresh-same-packet-fold-shear-seed-v0.json:nodes`; pre-ledger input screen uses the same shifted separator mesh |

The successor candidate input is
$$
X_\delta(\theta)
=
1.25\cos(2\pi(\theta+\delta))
+\varepsilon H(\theta+\delta),
\qquad
\delta=0.02,
\qquad
\varepsilon=0.0625,
\qquad
c_f=1.
$$
It is finite candidate input only. It is not an EOM-solved,
returned-sample-certified, or null-coordinate-preledger-certified cycle.

## Status Vocabulary

| Status | Meaning in this ledger |
| --- | --- |
| `accepted` | The artifact or row satisfies its local existing acceptance condition. This does not imply the full proof passed. |
| `diagnostic` | The artifact supplies finite calculations or routing information but is not accepted certificate data and does not consume rows. |
| `input-ready` | Finite same-packet inputs exist for the next certificate row, but the row has not yet been accepted or rejected by an outward-rounded interval certificate. |
| `fail-closed` | A conservative attempt rejected the packet or left required rows unresolved while keeping downstream gates unauthorized. |
| `rejected` | A packet failed an existing certificate condition at this row. |
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
| `fold_parent_contract_decision_packet.md` | `accepted` as decision record | `dcc58cf6d5d0f2df88cfea2bcedace59199784fa88420401ff34b38c86647322` | Records the fork that led to the approved Route A endpoint-exclusion alternative and now points to the historical cosine-packet rejection. |
| `fold_parent_endpoint_contract_extension.md` | `accepted` as contract extension | `54569bcf6e0bf30426cff8a76bfadf167d641e938d50ce550ddc1f85914721b9` | Records the Route A endpoint-excluded complement alternative now added to `fold_parent_boundary_complement_packet.md`; it does not itself close any row. |
| `fold_parent_endpoint_w_closure_attempt.md` | `rejected` endpoint-closure attempt | `c6511ad9080402ac3ab43668daa7d7e0735a212b23339094fbc6337e99d47c5a` | Locally accepts four singleton endpoint strips with root-count bound $[0,0]$, but rejects complete `w` closure because five strips have positive-width null-coordinate overlap and one lacks an outward-rounded gap. |
| `fold_parent_endpoint_u_closure_attempt.md` | `rejected` endpoint-closure attempt | `63845da29885b18f1453e0128189ae77c793ec94a41d8e2bc5325a915e9d9dd7` | Locally accepts three singleton endpoint strips with root-count bound $[0,0]$, but rejects complete `u` closure because seven strips have positive-width or endpoint-scale positive overlap and one lacks an outward-rounded gap. |
| `fold_parent_w_positive_overlap_subdivision_attempt.md` | `rejected` subdivision attempt | `3a46328ef7487ff0d246afe362213c59c2435fdf9472dfe1b6b24ab22f391ebb` | Splits the remaining `w` overlap strips by inverse thresholds, but residual equality cores retain positive-width overlap or an uncertified endpoint-scale gap; no `w` parent row is consumed. |
| `fold_parent_u_positive_overlap_subdivision_attempt.md` | `rejected` subdivision attempt | `c20818eab1cf737043796779f77e4fd2de4c5310987ef1a3f9536e50ee42bc8d` | Splits the remaining `u` overlap strips by inverse thresholds, but residual overlap cores and one uncertified endpoint-scale separated strip remain; no `u` parent row is consumed. |
| `fold_parent_regular_boundary_w_probe.md` | `rejected` regular-boundary probe | `3a61ef95e7e318a4acb8921b69470285f90aea7516f3a5ef79c45468a082c364` | Shows the residual `w` equality cores are only diagnostically adjacent to $\Sigma_1$ or $\Sigma_2$ and are not accepted $\mathcal{F}_{\Sigma_1}$ or $\mathcal{F}_{\Sigma_2}$ row rectangles. |
| `fold_parent_regular_boundary_u_probe.md` | `rejected` regular-boundary probe | `8b9b80c2fa9efdbda5ec04cbf5b470654b60bdc0c8e21493a00efe96d54c38a7` | Shows the residual `u` equality cores are only diagnostically adjacent to $\Sigma_3$ or $\Sigma_4$ and are not accepted $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$ row rectangles. |
| `fold_parent_regular_boundary_contract_probe.md` | `rejected` contract probe | `2ebceafffdfc3f4fcfc27e2e5164c48197cbe6d99e90f948772931c56e9b551b` | Defines the minimal finite same-packet regular-boundary theorem fields, then rejects current consumption because inclusion, domination, ownership, and non-core gap fields are absent. |
| `fold_parent_regular_boundary_coverage_attempt.md` | `rejected` integrated coverage attempt | `4725b74b51ccebeaf3ecef28e12a9a99bfd18a5d51200a8a08ccc81fa04ef6fc` | Integrates the `w`, `u`, and contract probes; regular-boundary coverage is not accepted for the residual equality cores, so no parent row is consumed. |
| `cosine_packet_parent_gate_rejection.md` | `accepted` as packet rejection status | `5fed19bebb391b23e8fb581b713bcef763cbbed66e829e99d2e57a75a0943dd6` | Records that the historical cosine packet is rejected before branch-chart certification after all attempted parent-complement closure routes fail. |
| `next_candidate_refinement_handoff.md` | `accepted` as next-target handoff | `d577d8ca055af543815548d43a3d309be16ccc462e003fb3ef92822d71b1f3fd` | Opens the next fresh-candidate target and states that the rejected cosine packet must not proceed to branch-chart construction. |
| `fixed_cosine_refinement_rescue_test.md` | `rejected` rescue test | `0b33765cd6b50622336c0d75bb1e919b19a01b68279ea1736ddca2a0fe651e68` | Shows mesh-only/simple-root refinement is not a plausible rescue for the fixed cosine null-coordinate geometry; residual equality collars remain structural. |
| `fixed_history_strict_collar_persistence_lemma.md` | `accepted` as obstruction lemma | `d7ab760e6609394ac60e9ba671d19750bae579002971d3b3de8687757cbe0963` | Proves fixed-history mesh refinement cannot consume positive-width equality cores under strict simple-root coverage; the obstruction is a null-coordinate overlap invariant. |
| `sub_field_speed_action_test_case.md` | `accepted` as analytic baseline | `b0ab1d1b54710536c5611c1c16321a5c53a04dfed3287eba0b6436f3474e0e68` | Records the action-generated sub-field-speed comparison branch: held-source release criterion and regular handoff map, Lambert-$W$ exterior delayed-partner solution, and exact self-root exclusion under a strict sub-field speed cap. It does not authorize branch-chart construction. |
| `held_release_handoff_map.md` | `accepted` as analytic handoff map | `ad7b04ecb75b664fe11a84821cfa7083852ba78d08e86aeda12cf7c44ce49a9d` | Proves the unique scalar handoff equation from stationary partner history into the moving-partner delayed chart, separates before-origin from before-handoff field-speed criteria, records the normalized $x_0=1.25$ strict sub-field-speed handoff fixture, and shows the moving-partner root opens with $J_p=1$ and no acceleration jump. |
| `next_candidate_solver_target.md` | `accepted` as next solver target | `e1365cd6c0b3a9a233bd2150c408151ef3113fe40740adfbd8e883e0cde676b5` | Defines the next executable target as a fresh fold-adapted collocation candidate with the null-coordinate pre-ledger as the first acceptance row and a tangent-space gap-opening criterion for parent complements, now with diagnostic, live local scanner, and finite-deformation seed surfaces. |
| `fresh_fold_collocation_solver_surface.md` | `accepted` as solver-surface audit | `ef73f200be021683ecfd2671e3b3f6bbd952bbd45cb4b00dcd06791132aa8828` | Records that the first sidecar generator now exists, that the fresh sidecar fail-closes at the binary64 preledger attempt, and that proof-interval-v2 partially certifies row-specific trigonometric range-empty rows while monotone diagonal, simple-root, endpoint/seam, and fold-layer certification remain open; specifies the minimum lawful same-packet successor artifacts plus the finite gap-opening linearization, diagnostic scanner surface, live local fold-shear matrix, and finite candidate-history seed. |
| `null_coordinate_separation_direction_lemma.md` | `accepted` as constructive next-candidate lemma | `407c129c650152d98d62324ed0fb596f582bb917dd97efe957aa1c1fa72c235e` | Converts parent-complement repair into a finite-dimensional separation-direction and tangent-space feasibility problem for fresh collocation candidates; the finite criterion now has a fail-closed scanner, a live half-period fold-shear witness, and a finite fixed-period deformation corollary. |
| `gap_opening_feasibility_input.seed_cosine_diagnostic_demo.v0.json` | `diagnostic` finite scanner input | `cfd5e4122b30465e2864ad698c2627427132ef8a924464b33440947af04353f2` | Declares independent endpoint-shear columns for the residual cosine-packet collars; not a live candidate, interval certificate, or ledger update. |
| `gap_opening_feasibility_result.seed_cosine_diagnostic_demo.v0.json` | `diagnostic` success marker | `4ca8461413514692f2bf6b77829cda23bd39366456e635a96409eadc9fe526a1` | `status=feasible`; emits the strict tangent witness `(b_T,h_w_A1,h_w_A2,h_u_A3,h_u_A4)=(0,1,1,1,1)` for the declared finite matrix while keeping `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. |
| `gap_opening_feasibility_report.seed_cosine_diagnostic_demo.v0.md` | `diagnostic` scanner report | `10f8e5dfc6ee511f6397fbc9d2d02e4e810753405214fc6433ce73fee273d36e` | Records the executable success marker, limitations, and priority-only capture decision for the gap-opening feasibility scanner. |
| `fold-shear-gap-matrix-builder.mjs` | `accepted` as live local matrix builder | `a1ddfe6ebb45dc03eafb43908dc8b0fc2f849fbf3909cc66974b4ef8c7461eda` | Builds the first live local fold-shear matrix from actual $C^1$ half-period-antisymmetric arc bumps on $A_0,A_1,A_2$; it does not build a full fresh candidate. |
| `gap_opening_live_fold_shear_input.seed_cosine_residuals.v0.json` | `accepted` as live local scanner input | `229f59a6bcb9265d44cbe3e46cbcf3efe629575fb5579579463ee7d32cf2ac92` | Replaces independent diagnostic columns with actual $C^1$ fold-shear basis derivatives for the eleven residual collars, using fixed period, source-above-receiver signed gaps, and required margins equal to recorded overlap depths. |
| `gap_opening_live_fold_shear_result.seed_cosine_residuals.v0.json` | `accepted` as live local success marker | `d07598ee950227297ee453b1e49e881d00886ed33c947124de5e9b1a360906cf` | `status=feasible`; emits witness `(b_T,h_A0,h_A1,h_A2)=(0,0.433491813815,-0.556350501775,-1)` with finite observed margin `0.0920789718365` after required margins; no pre-ledger, live-ledger, or branch-chart claim. |
| `gap_opening_live_fold_shear_report.seed_cosine_residuals.v0.md` | `accepted` as live local theory report | `2ab0bb6e249b1e9f6a4c6df607967c2e7f1dd84cc0e0927b0908bc39269d832f` | Records the half-period fold-shear corollary: one symmetry-preserving first-half shear opens all declared first- and second-half residual collars in the finite local matrix after subtracting residual overlap depths. |
| `fold-shear-finite-deformation.mjs` | `accepted` as finite deformation builder | `19daf931a09bb9195e105cf8837328b7953b2074b73928a7358aaa6a2117ea6c` | Converts the live fold-shear witness into an explicit finite fixed-period candidate-history seed and records the epsilon threshold and finite residual surpluses; it does not run a fresh-candidate solve. |
| `fold_shear_deformed_candidate.seed_cosine_residuals.v0.json` | `accepted` as finite local success marker | `e0216d5751cd8a7ac652241945c4e7d606a176ae71c72ff64327fc183b41ae15` | `status=finite_candidate_seed_not_preledger`; chooses `epsilon=0.0625`, above `epsilon_min_open_all_listed_collars=0.0515044597755009`, and records minimum finite surplus `0.00106743573978125`; no live-ledger, pre-ledger, or branch-chart claim. |
| `fold_shear_deformed_candidate_report.seed_cosine_residuals.v0.md` | `accepted` as finite deformation report | `355b7e7cb166efd0826a77d37d4fd886ab12fac0da3f32c6d1d2297a979c365d` | Records the finite corollary: because fixed-period null-coordinate rows are affine in $X$, the live tangent witness gives a finite one-parameter seed family opening the declared residual collars. |
| `fold-shear-phase-shift-audit.mjs` | `accepted` as phase-shift audit generator | `ff84b64a67a84ceaa7895f1e9fa9785bf69f4123475e87658f6c9b5f328a0e46` | Shifts the finite fold-shear seed to an inbound section while preserving source-minus-receiver null-coordinate differences under shifted row intervals; it does not run a pre-ledger. |
| `fold_shear_phase_shift_audit.seed_cosine_residuals.v0.json` | `accepted` as phase-shift finite success marker | `77a8b45ea21b1cd4b3b7ad724e362b0c0480439ef8779ebcef64cf1051bbf851` | `status=phase_shift_audit_not_preledger`; chooses $\delta=0.02$, records $X_\delta(0)=1.2447644729563$, $\dot x_\delta(0)=-0.0876176690331297$, shifted separator coordinates, and preserved finite collar surpluses. |
| `fresh_same_packet_fold_shear_seed.v0.json` | `accepted` as same-packet seed contract data | `322a6baf6e36360890b3e1c67f3781e8cd55ba9fb83d576a696e47371e43492b` | `status=initial_history_seed_contract_not_preledger`; fixes the next seed contract `fresh-same-packet-fold-shear-seed-v0` and lists required successor artifacts without claiming a live candidate. |
| `fresh_same_packet_fold_shear_seed_contract.md` | `accepted` as same-packet seed contract | `f28949b74d72d0eb92f8db67827e7a7f94dbb451596828824e6acb5742f6b82e` | Records the finite seed formula, inbound phase shift, residual-collar surplus law, successor output contract, first sidecar fulfillment note, fail-closed preledger attempts, proof-interval partial certificates, and blocker-anatomy sidecars. It remains priority-only and does not authorize live ledger edits. |
| `fresh-fold-shear-candidate-packet.mjs` | `accepted` as fresh successor artifact generator | `f4388be264d404e3e895c26d1cc1c98b853a1f1242642540c47628eb44a270a2` | Deterministically emits the fresh sidecar `phi_cyc`, shifted mesh, pre-ledger input screen, and packet report; it is not an interval pre-ledger generator. |
| `phi_cyc.fresh-same-packet-fold-shear-seed-v0.json` | `accepted` as fresh candidate input | `8c1453a9c24fead14a57bc8eec8ced74bb277b09efcce09d30046db7b42bb52c` | `status=fresh_phi_candidate_not_preledger`; records $X_\delta(0)=1.2447644729563$, $\dot x_\delta(0)=-0.0876176690331297$, and shifted separators under the fresh packet identity. |
| `mesh.fresh-same-packet-fold-shear-seed-v0.json` | `accepted` as shifted mesh input | `6870a4d916203e2bc8d30f16f9665cbc4f17315a800f82cac948914f0265a209` | Shifted separator mesh and pre-ledger intervals keyed to `fresh-same-packet-fold-shear-seed-v0`; it does not rewrite `mesh.json`. |
| `causal_preledger_input_screen.fresh-same-packet-fold-shear-seed-v0.json` | `input-ready` diagnostic screen | `ce96eda158429f1d6f3dc070f1dfcefb2a7b50f18aeeee165ad06a790188e86a` | 162 finite sample rows: 116 sampled disjoint rows, 46 sampled overlap-or-touch rows, 0 accepted rows; diagnostic only, not interval-certified. |
| `candidate_cycle_packet_report.fresh-same-packet-fold-shear-seed-v0.md` | `accepted` as fresh packet report | `f9e0b0b3536fc67c8471eb2daa9bf71b7d6489621025e3c9263ac0019565f7ab` | Summarizes the fresh sidecar packet, no-preledger status, and next outward-rounded interval pre-ledger obligation. |
| `fresh-null-coordinate-preledger.mjs` | `accepted` as fail-closed preledger-attempt generator | `27897a42ab27a6b889392ac1e42982f5cb76db145a6ddfd165309610a294b0d6` | Deterministically emits the fresh sidecar `causal_ledger`, interval report, and engine audit. It uses a binary64 outward-padded engine and does not provide an MPFR/Arb formal interval certificate. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.json` | `fail-closed` preledger attempt | `88a5755d2fe5fc0ef637d84c1493312595a087b5e346c4a721b74e857c189162` | `status=preledger_rejected_range_empty_only_overlap_and_fold_rows_remaining`; accepts 128 empty rows by this pass, leaves 34 `split_required` rows, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.md` | `fail-closed` preledger report | `42a5ebae03a48105aeafc3b025875e9c876156877ba23f47e14c7572df9f3200` | Records the fresh sidecar rejection: 116 range-empty rows, 12 monotone diagonal exclusions, 16 fold-layer blockers, 16 range-overlap split rows, and 2 diagonal contacts left unresolved. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.json` | `diagnostic` engine audit | `51c8ae5a537bffe7502582a7ec64bb188f87ed7a3b14d05d1e4fa0b92c1338a1` | Records the binary64 outward-padded engine limitations and the requirement for exact decimal intake plus certified trigonometric interval enclosures before formal interval-certificate promotion. |
| `fresh-proof-interval-preledger-v1.mjs` | `accepted` as proof-interval sidecar generator | `dc77d2477cca2b6f357faf84d7e87bc253fd24254b62d10a5804455abd04b1fe` | Deterministically emits the proof-interval-v1 backend certificate, sidecar ledger, report, and engine audit using lossless JSON numeric-token intake and `BigInt` rational interval arithmetic. It consumes only coarse range-empty rows. |
| `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.json` | `accepted` partial backend certificate | `83f8604c045fb04897a64c885e9703d8ae28ecb9eaec00ab382243bae17a2ee8` | Records exact decimal-token intake, source hashes, `BigInt` rational arithmetic, a Machin rational $\pi$ interval for later trig work, and the conservative envelope $|X_\delta| \le 1.374365144724375 < 11/8$. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.json` | `fail-closed` proof-interval sidecar | `81f2ca9ee6bc58f5fafa8d89738fd225805c6c150abf639a4b144da622d9e000` | `status=proof_interval_v1_range_empty_sidecar_branch_chart_blocked`; accepts 70 coarse range-empty rows by strict rational separation, leaves 92 `split_required` rows, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.md` | `fail-closed` proof-interval report | `4943f57464e142b8badba5de89e4099eaf47ec2d9340387673dba6803a7c09e9` | Records the exact-rational coarse range-empty subset, minimum accepted range gap `0.23578273146175`, and the remaining proof burden without replacing the binary64 sidecar counts. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.json` | `diagnostic` proof-interval engine audit | `00eb49ff686280f5bdaf6111b279629ea065ba41938c6cf17486f71680613cc9` | Confirms the v1 sidecar uses no binary64 endpoints for certified rows and still lacks certified trigonometric enclosures, simple-root extraction, fold-layer certificates, and parent-complement consumption. |
| `fresh-proof-interval-preledger-v2.mjs` | `accepted` as proof-interval trig-range sidecar generator | `d92c27427044d5ec97bcc4fb6747ef041c086e9c3fa4fee008b5d53b15af5443` | Deterministically emits the proof-interval-v2 backend certificate, sidecar ledger, report, and engine audit using exact-rational JSON intake, a rational $\pi$ bracket, Taylor tails, and row-specific trigonometric $X_\delta$ ranges. |
| `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.json` | `accepted` partial backend certificate | `5585d89c992f6b58c2b29e4f526d7f296f3717eceb556da5327a179ec80d00a0` | Records the v2 trig-enclosure method, source hashes, numeric intake, rational $\pi$ bracket `333/106 < pi < 355/113`, Taylor remainder rule, and machine-readable $X_\delta$ basis definition. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.json` | `fail-closed` proof-interval trig-range sidecar | `5b6e7642c6b6124b2135bf6727ce9d0f94409fa0463e8583146bd89d32c5b1ae` | `status=proof_interval_v2_trig_range_sidecar_branch_chart_blocked`; accepts 116 row-specific trigonometric range-empty rows, leaves 46 `split_required` rows, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.md` | `fail-closed` proof-interval trig-range report | `78431494d29673a81d94bb171f130b9859dcf18b357ed671c3e880eea574dc85` | Records the row-specific exact-rational range-empty subset, minimum accepted range gap `0.027437434267372`, and the remaining diagonal, simple-root/structural, inactive-fold-neighborhood, and active fold-layer burdens. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.json` | `diagnostic` proof-interval trig-range engine audit | `23af2e1e26dc8558059bb1961a278136179641540223269680cdcb240c8c3243` | Confirms v2 uses certified trigonometric enclosures only for range-empty rows and still lacks monotone diagonal, simple-root, fold-layer, and parent-complement certificates. |
| `fresh-preledger-blocker-anatomy.mjs` | `accepted` as blocker-anatomy generator | `c1337bfa408899922ac1f5032656d25c031ca4040814a01a43264ef8222f02d3` | Deterministically classifies the 34 fresh `split_required` rows into proof burdens and emits the anatomy plus fold-layer burden sidecars; it does not accept rows. |
| `fresh_preledger_blocker_anatomy.fresh-same-packet-fold-shear-seed-v0.json` | `diagnostic` blocker anatomy | `1fa08ed4283a0c22b30a371a9a6473732af0dd3d091160ee7322cc6f02516e10` | Classifies the 34 blockers as 16 fold-layer certificate rows, 6 regular parent root-candidate overlaps, 10 endpoint/seam or inactive-fold-neighborhood contacts, and 2 nonmonotone diagonal contacts. |
| `fresh_preledger_blocker_anatomy_report.fresh-same-packet-fold-shear-seed-v0.md` | `diagnostic` blocker-anatomy report | `99c73407b90ac45a279f18d74cc1ef50af93981d3c2255481b18ae6034c6e603` | Records the row-family proof burdens and keeps all branch-chart authorization flags false. |
| `fold_layer_burden.fresh-same-packet-fold-shear-seed-v0.json` | `diagnostic` fresh fold-layer burden | `7948ad914455d0303d9b97e7d4a176766579458949060cf91c202af48965b1bf` | Groups the 16 fresh fold-layer rows by $\Sigma_1,\ldots,\Sigma_4$ and lists same-packet fields required before any row can become `fold_layer`. |
| `fold_layer_burden_report.fresh-same-packet-fold-shear-seed-v0.md` | `diagnostic` fresh fold-layer burden report | `679952b2a9492f75d1d7323f51f94878985024b8ccb388a7fc13e208b5de5715` | States that historical cosine fold artifacts are template-only for the fresh packet and that fold rows must not be rewritten as `simple_root`. |
| `aaa_corpus_recommendation_handoff.md` | `accepted` as promoted corpus handoff | `82369034df58a41b6983edf1a5042fd788ff55b9ebe791ac1b60ccf25a0b6408` | Records that scoped AAA updates promoted the null-coordinate pre-ledger as a candidate-falsification gate while keeping detailed rejected-packet data priority-only. |
| `regular_boundary_user_facing_recommendation.md` | `accepted` as user-facing corpus recommendation | `b7e4f09b90463fd04cf6726b5b3c03cbc8d468c5aa883d9d1b4928f560b34a26` | Recommends no named regular-boundary theorem in AAA now; the current generic same-packet complement predicate is sufficient until a same-packet inclusion/domination theorem exists. |
| `field-speed-head-on-root-audit.mjs` | `accepted` as executable root audit | `1ce3eefa48e31fb3041c03caeda67eebd00eced62ce4e53ac5d11fd7a21ee4d2` | Analytic audit script for the normalized field-speed head-on in-flight wake test; emits fail-closed caustic/root-degeneracy status, not a force value. |
| `field_speed_head_on_inflight_wake_input.v0.json` | `accepted` as boundary-test input | `122d76253f688cee95121bd2c48ca4d3f6c27fa0707031cb7cfb3155afbfeae4` | Encodes the operator-proposed left Electrino at $x=-1$, right Positrino at $x=+1$, both moving inward at $|v|=c_f$, with affine inbound prehistory. |
| `field_speed_head_on_inflight_wake_result.v0.json` | `accepted` as fail-closed audit result | `5efde4f379cf9928a6a6cd8248d6aa29fb51352da2a1fb00ce9e02cd94e9db78` | `status=degenerate_caustic_test_passed_fail_closed`; partner wake is still in flight at $t=0$, same-source roots are a continuum with $J=0$, and no candidate cycle or branch chart is authorized. |
| `field_speed_head_on_inflight_wake_test_case.md` | `accepted` as analytic boundary test | `17fb91223afaa3bfa4fb5b34b6ca15bdea47bdc807de2f818b3c1b757738e8ce` | Documents the exact root algebra and the finite-history / dual-mollified follow-up burden for the field-speed head-on seed. |
| `field_speed_head_on_inflight_wake_report.v0.md` | `accepted` as audit report | `16096ff2efde3366c98a86a927fbfc6fcc33cf5db4bf2691ae3c70635e5b7cf9` | Records the executed command, result table, mathematical meaning, and capture decision for the field-speed head-on audit. |
| `field-speed-head-on-finite-history.mjs` | `accepted` as executable finite-history evaluator | `9b7370b09108ababd46378a36989d4eeff559ac3082cb58c063684e7bd6bdc21` | Evaluates the closed-form continuous finite-history acceleration and optional raw countable-emission comparison for the exact affine field-speed head-on seed, with an explicit shell mollifier. |
| `field_speed_head_on_finite_history_input.v0.json` | `accepted` as finite-history input | `d03fd2c93d03ee9ce2380c57f6d9597bf57f41834b94894af60c7ad2d1f2fda1` | Uses $c_f=1$, $x_0=1$, $g=1$, $\epsilon_c=0.05$, $\eta=0.02$, the compact $C^1$ polynomial shell, and horizons through $H=32$ at audit time $t=0$. |
| `field_speed_head_on_finite_history_result.v0.json` | `accepted` as theory-success result | `a3ef8d36769798007feb6c95d7399315366096112d7dbdad25b08e806a79fc7b` | `status=finite_history_formula_evaluated_pre_origin`; continuous $H\to\infty$ right self acceleration is about `-1472.6215563702156`, the partner shell is exactly zero at $t=0$, and regulator assessment is `eta_epsilon_to_zero=divergent_self_continuum`. |
| `field_speed_head_on_finite_history_report.v0.md` | `accepted` as finite-history report | `ffd06ae4181b3be08dcf9a0ab86b93367d210655fcaed15e1fbd7a3699a4f636` | Records the finite-history formula, compact-shell numerical run, and promotion decision into Collinear Breather. |
| `fold_row_consumption_attempt.md` | `rejected` historical row-consumption attempt | `51c766cb2f733a0a39aa65701194c27be9de1f4f2535a821413f85540c3f32cd` | Records that the earlier rejected interval attempt consumed zero rows before the accepted full-interval fallback certificate existed. |

## Absent Required Artifacts

| Artifact | Status | Blocking dependency |
| --- | --- | --- |
| `branch_chart.json` | `absent` | Blocked by rejected/fail-closed fresh preledger attempts; neither the diagnostic input screen, the binary64 range-empty pass, proof-interval-v1, nor proof-interval-v2 authorizes a branch chart. |
| `seed_chart_interval_report.md` | `absent` | Blocked by absent `branch_chart.json` and rejected/fail-closed fresh preledger attempts. |
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
| Candidate-cycle packet | `accepted` as fresh finite input | `phi_cyc.fresh-same-packet-fold-shear-seed-v0.json`, `mesh.fresh-same-packet-fold-shear-seed-v0.json`, `candidate_cycle_packet_report.fresh-same-packet-fold-shear-seed-v0.md`; packet id `fresh-same-packet-fold-shear-seed-v0`. | EOM residuals $E_j$, returned-history residuals $R_j^x,R_j^v$, fold integral targets, and returned-sample rows are not evaluated; this row clears only fresh finite candidate-input absence. |
| Seed-chart gate 1: candidate-cycle data | `accepted` as data | Fresh phase-shifted fold-shear candidate input, period, parameters, shifted mesh, section data, and packet identity are present. | Proceed to proof-grade preledger strengthening or a deliberately repaired successor; the first fresh range-empty attempt has fail-closed. |
| Seed-chart gate 2: null-coordinate pre-ledger | `fail-closed` | `causal_ledger.fresh-same-packet-fold-shear-seed-v0.json`, `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.md`, `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.json`, `fresh_preledger_blocker_anatomy.fresh-same-packet-fold-shear-seed-v0.json`, and `fold_layer_burden.fresh-same-packet-fold-shear-seed-v0.json`; binary64 sidecar: 162 rows, 128 empty rows accepted by that pass, 34 `split_required` rows; proof-interval-v1 sidecar: 70 exact-rational coarse range-empty rows and 92 `split_required` rows; proof-interval-v2 sidecar: 116 exact-rational row-specific trig range-empty rows and 46 `split_required` rows; all sidecars record `branch_chart_authorized=false`. Historical rejected evidence remains in `causal_ledger.json` and `causal_preledger_interval_report.md` for the old cosine packet only. | The binary64 attempt is not an MPFR/Arb formal interval certificate; proof-interval-v1 is exact-rational but deliberately coarse; proof-interval-v2 adds certified row-specific trigonometric range enclosures but still accepts only `empty` rows. Exact blockers are anatomized as 16 active fold-layer certificate rows, 6 regular parent root-candidate overlaps, 10 structural endpoint/seam or inactive-fold-neighborhood contacts, and 2 nonmonotone diagonal contacts in the binary64 sidecar; v2 leaves 46 rows unresolved because it accepts no monotone diagonal, simple-root, or fold-layer obligations. No live `causal_ledger.json` rewrite, branch-chart construction, or Schauder promotion is authorized until every fresh row is accepted as empty, simple-root, or fold-layer with no unresolved parent complement. |
| Seed-chart gate 3: active branch-chart certification | `blocked` and `absent` | `branch_chart.json` is absent; the fresh sidecar preledger records `branch_chart_authorized=false`. | Requires a passed proof-grade fresh preledger. No simple-root branch chart may be built from a diagnostic input screen or from a fail-closed range-empty attempt. |
| Seed-chart row | `blocked` and `absent` | `seed_chart_interval_report.md` is absent. | Requires `branch_chart.json`, packet identity check, pre-ledger consumption, branch-chart authorization, strict seed margins, and finite sensitivities. |
| Coupled-corridor row | `pending` and artifacts `absent` | No corridor artifacts are present. | Depends on seed-chart row. |
| Monodromy diagnostic row | `pending` and artifacts `absent` | No monodromy artifacts are present. | Depends on branch-chart and coupled-corridor rows. |
| Returned-sample row | `pending` and artifacts `absent` | No returned-sample artifacts are present. | Depends on monodromy route decision plus prior certified domain. |
| Topology row | `pending` and artifact `absent` | `topology_interval_report.md` is absent. | Depends on returned-sample row. |
| Schauder closeout | `blocked` | All five finite audit rows have not passed on one same certified domain. | Conditional theorem cannot be promoted. |

## Fresh Fail-Closed Preledger Blockers

The fresh same-packet sidecar has now run one conservative range-empty
preledger attempt. It is useful routing data, but it is not a formal MPFR/Arb
interval certificate and does not authorize downstream rows.

| Fresh preledger quantity | Count or margin |
| --- | ---: |
| Base rows | 162 |
| Empty rows accepted by this pass | 128 |
| Range-empty rows accepted by this pass | 116 |
| Monotone diagonal exclusions accepted by this pass | 12 |
| Certified simple-root subrows | 0 |
| Accepted fold-layer rows | 0 |
| Split-required rows | 34 |
| Fold-layer interval blockers | 16 |
| Range-overlap split blockers | 16 |
| Diagonal contacts without monotone exclusion | 2 |
| Minimum range-empty gap accepted by this pass $\gamma_{\mathrm{empty}}$ | 0.0813286869617 |

The blocker-anatomy sidecar separates the 34 unresolved rows by proof burden:

| Fresh blocker family | Rows |
| --- | ---: |
| Active fold-layer certificate absent | 16 |
| Regular parent root-candidate overlap | 6 |
| Structural endpoint or inactive-fold-neighborhood contact | 8 |
| Structural periodic-seam contact | 2 |
| Nonmonotone diagonal contact | 2 |

The proof-interval-v1 sidecar is stricter and coarser. It does not replace the
binary64 counts above; it is the first exact-rational backend layer for the
subset of rows whose time ranges are separated even after the global envelope
$$
|X_\delta(\theta)| \le 1.374365144724375 < 11/8
$$
is applied.

| Proof-interval-v1 quantity | Count or margin |
| --- | ---: |
| Base rows | 162 |
| Exact-rational coarse range-empty rows | 70 |
| Diagonal exclusions accepted | 0 |
| Simple-root subrows accepted | 0 |
| Fold-layer rows accepted | 0 |
| Split-required rows | 92 |
| Minimum accepted coarse range gap | 0.23578273146175 |

The proof-interval-v2 sidecar advances from coarse global $X_{\max}$ separation
to row-specific certified trigonometric $X_\delta$ ranges. It still accepts
only `empty` rows and does not replace the binary64 or v1 counts.

| Proof-interval-v2 quantity | Count or margin |
| --- | ---: |
| Base rows | 162 |
| Exact-rational row-specific trig range-empty rows | 116 |
| Diagonal exclusions accepted | 0 |
| Simple-root subrows accepted | 0 |
| Fold-layer rows accepted | 0 |
| Split-required rows | 46 |
| Minimum accepted trig range gap | 0.027437434267372 |

## Accepted Subrows Inside The Rejected Pre-Ledger

The historical rejected cosine pre-ledger still contains accepted subresults
that should be preserved as diagnostics if a later packet reuses the same
itinerary logic. They are not accepted rows for
`fresh-same-packet-fold-shear-seed-v0`.

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
for the historical cosine packet. The interval attempt still rejects because
that packet lacks direct quadrature enclosures, certified row-tube projections,
and source-slice coverage for the fold rows. Therefore the diagnostic constants
consume no rows.

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

The next executable row is not the branch chart. It is either proof-grade
preledger strengthening for `fresh-same-packet-fold-shear-seed-v0` or a
deliberately renamed successor packet if the split blockers are structural.

Next certificate action:

1. Add monotone diagonal and simple-root certificates on top of proof-interval-v2. Range-empty enclosure now reaches the expected 116 row-specific range-empty rows; the remaining rows require monotonicity/Jacobian floors, simple-root coverage, endpoint/seam ownership, or same-packet fold-layer impulse fields.
2. Extract same-packet simple-root subrows for the six regular parent root-candidate overlaps with strict source monotonicity, coverage, memory-depth, sign, and Jacobian margins, then strip their complements.
3. Resolve the ten structural endpoint/seam or inactive-fold-neighborhood contacts by endpoint ownership, periodic seam convention, inactive-coordinate fold-neighborhood splitting, or candidate repair.
4. Certify same-packet fold-layer impulse fields and consume the 16 fold-layer rows plus all fold-adjacent parent complements by accepted alternatives.
5. Resolve the two diagonal contacts by a monotone exclusion certificate or reject the packet as structurally unsuitable.
6. Only after every fresh pre-ledger row is accepted as `empty`, `simple_root`, or bounded `fold_layer`, with all parent complements consumed by an accepted same-packet alternative, may `branch_chart.json` be produced.
7. The high-level falsification-gate principle has been promoted into the three proof-program AAA documents; keep the detailed rejected-packet inventory priority-only.
8. `regular_boundary_user_facing_recommendation.md` records the user-facing documentation decision: do not name regular-boundary coverage as accepted doctrine until a finite same-packet inclusion/domination theorem exists.
9. `fixed_history_strict_collar_persistence_lemma.md` explains the fixed-cosine obstruction, while `null_coordinate_separation_direction_lemma.md`, the live fold-shear witness, the finite deformed seed, and the fresh sidecar packet give the constructive fresh-candidate route: certify the symmetry-preserving candidate-history shear before spending work on branch-chart rows.
10. `sub_field_speed_action_test_case.md` is the sidecar analytic baseline for a no-separator comparison: first test whether the action-generated held-source and exterior delayed-partner branches remain strictly sub-field-speed before spending branch-chart work on a field-speed itinerary.

The historical cosine template is rejected before branch-chart certification
even though the finite fixed-parameter fold ceiling is available. The fresh
sidecar packet has now also fail-closed before branch-chart certification, but
it has not been rejected by a proof-grade interval backend yet; the current
artifact is a conservative routing attempt that names the remaining blockers.
