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
diagonal/simple-root/fold rows, and still authorizes no branch chart. A
proof-interval-v3 sidecar adds exact-rational derivative enclosures for
same-interval regular diagonal rows: it accepts 116 range-empty rows plus 8
monotone diagonal exclusions, leaves 38 rows `split_required`, accepts no
simple-root or fold-layer rows, and still authorizes no branch chart. A
proof-interval-v4 sidecar keeps the v3 accepted empty rows and records six
fresh simple-root subrow certificates with strict oriented source-inner
coverage, strict source/receiver derivative floors, and strict causal memory
margins; parent complements, endpoint/seam rows, inactive fold-neighborhood
contacts, fold-interval diagonals, and active fold-layer rows remain
unconsumed, so it also authorizes no branch chart. A proof-interval-v5 sidecar
then probes the 10 receiver-side parent-complement strips around those six
subwindows by the same exact-rational strict range-empty test: it certifies 0
strict-empty complement strips, consumes 0 simple-root parent rows, leaves 38
parent rows `split_required`, and still authorizes no branch chart. A
proof-interval-v6 sidecar imports those strips and tests the accepted ownership
or coverage alternatives against current same-packet data: strict range-empty,
endpoint/topology ownership, exact fold-family coverage, and regular-boundary
coverage all fail for all 10 strips, so it consumes 0 simple-root parent rows
and still authorizes no branch chart. A proof-interval-v7 sidecar then
constructs same-packet ownership-data candidates: 10 finite candidate
regular-boundary cores, 16 fresh fold-layer burden rows considered, 0 endpoint
contact tables, 0 accepted complement strips, and 0 consumed simple-root parent
rows; it also authorizes no branch chart. A proof-interval-v8 sidecar then
constructs the finite regular-boundary candidate-family inventory: 4 finite
candidate families, 20 candidate membership edges, 0 certified single separator
assignments, 0 same-packet inclusion proofs, 0 fresh domination inequalities, 0
topology/no-double-counting certificates, 0 non-core complement closures, 0
accepted complement strips, and 0 consumed simple-root parent rows; it also
authorizes no branch chart. A proof-interval-v9 sidecar then proves the
current-field separator-assignment no-go for the v8 inventory: all 10 candidate
cores have two candidate separators, no exact singleton selector, and no
accepted topology ownership rule; side labels, endpoint adjacency without
ownership, array order, separator order, and family order are rejected as
certificates. It accepts 0 separator assignments, 0 complement strips, consumes
0 simple-root parent rows, and also authorizes no branch chart. A
proof-interval-v10 sidecar then proves the current-field
topology/no-double-counting no-go for those residual cores: 10 imported cores,
5 tested topology/no-double-counting methods, 50 failed method evaluations, 0
certified topology/no-double-counting certificates, 0 accepted complement
strips, and 0 consumed simple-root parent rows. It also authorizes no branch
chart. The regular-boundary $T(C)$ route is now deferred because it requires a
fresh same-packet domination packet. The active route is candidate repair /
strict-gap closure, recorded in
`candidate_repair_strict_gap_closure_target.md`; it requires certified positive
null-coordinate gaps on all 10 v10 parent-complement collars before any
pre-ledger row consumption or branch-chart construction resumes.
A fresh v10 local-shear diagnostic now imports those same 10 collars and finds
a free-period finite tangent witness with minimum post-margin surplus
`0.115066037632`. This is useful repair-direction evidence only: it keeps
`preledger_pass=false`, `updates_live_ledger=false`, and
`branch_chart_authorized=false`. A direct finite-integration audit of that
witness now blocks naive promotion: the collar nonnegative threshold is
`0.685286902752066`, controlled by `C_u_A4_A2_left_v10_7`, but the direct path
already has 20 field-speed crossings at that threshold and 24 crossings at
$\lambda=1$. A shifted-separator fixed-period basis then opens all collars as a
tangent, with witness $(h_{A0s},h_{A1s},h_{A2s})=(-1,-1,-1)$ and minimum
post-margin surplus `0.484518823372`, but direct finite integration reaches 12
field-speed roots at $\lambda_{\min}=0.264833953926991$. A bounded
three-coordinate shifted-separator sampled LP screen then adds the explicit
field-speed sign-itinerary inequalities, with 810 sampled collar inequalities
and 1,940 retained field-speed sign guards, but its optimum is still
$\gamma_{\mathrm{sample}}=-0.204126631574676$. A split-two enrichment of the
same shifted arcs also fails the sampled same-itinerary screen, with
$\gamma_{\mathrm{sample}}=-0.207816886605516$. A richer anti-periodic cubic
Hermite screen then approaches the sampled same-itinerary boundary from below:
the best tested solve has 270 Hermite nodes, 541 LP variables, and
$\gamma_{\mathrm{sample}}=-2.20865857936394\times 10^{-10}$, with no positive
margin under derivative-bound sensitivity. A row-only numerical dual
obstruction now matches the Hermite primal boundary and gives a
residual-adjusted upper bound
$\gamma\leq -2.20862209291526\times 10^{-10}$ at half-grid 256. A
rationalization audit then replaces the 23 active half-grid-256 multipliers by
exact rationals with denominator cap $10^9$ while preserving
$\gamma\leq -2.20860276388005\times 10^{-10}$ against the binary64 row matrix.
An active-row interval backend then reconstructs the 23 active rows with exact
rational Hermite coefficients, outward rational trigonometric row bounds, exact
gamma stationarity, and no gamma residual cap. It proves the finite sampled
Hermite row-system upper bound
$\gamma\leq -2.20499517531647\times 10^{-10}$, while still leaving
continuous-in-collar inequalities and the live proof-interval preledger open.
A continuous-collar lift then verifies that the 5 active gap samples and 18
active speed samples are embedded in the declared continuous collar/speed
target. By sample-subset inclusion, any continuous same-itinerary Hermite repair
would satisfy the active sampled subset, so the negative sampled dual bound
rules it out. A separate moving-row variation budget is not needed for this
obstruction and would be a constructive-certificate burden. Two bounded
same-itinerary structural screens then fail to open a positive sampled margin:
the period-coupled Hermite screen with separator speed-contact locks has best
$\gamma_{\mathrm{sample}}=-2.20865843237662\times 10^{-10}$, and the
fixed-separator velocity-Bernstein sign-corridor screen has best
$\gamma_{\mathrm{sample}}=-0.0126050167182319$. The selected repair route is
now at a narrower decision boundary: instantiate the nonlinear fold-coordinate
collocation target or explicitly rebuild around a higher-fold itinerary. The
first higher-fold route is now frozen as
`fresh-v10-higher-fold-12-root-rebuild-v0`, using the shifted-separator
strict-gap threshold's 12 field-speed roots as the seed itinerary and treating
all old same-itinerary rows as historical unless recomputed or proven
persistent. A diagnostic successor seed packet now materializes that route at
`lambda=0.3`, with 25 mesh intervals and 1,250 sampled preledger-input rows,
but it still consumes no row and does not authorize a branch chart. A
binary64/Lipschitz root-tube certificate attempt first gave positive 12-root
audit evidence with minimum complement margin `0.0365691941041439`, 6/6
first-half/second-half parity, and disjoint candidate tubes. The
outward-rational interval certificate now closes the root-count topology gate
with one root in each of the 12 tubes, no extra roots on the 13 complements,
total root count bound `12..12`, minimum root derivative floor
`20.353739080283133119`, and minimum complement residual margin
`0.023248692491025871`. The proof-interval v1/v2/v3/v4/v5/v6 sidecars now consume
that root-count topology input: v1 certifies 270 coarse range-empty rows, v2
certifies 1,062 row-specific trigonometric range-empty rows, v3 uses the
root-count complement certificate to certify 26 same-interval diagonal
exclusions, and v4 records 42 simple-root receiver subwindow certificates while
consuming 0 parent simple-root rows. v5 audits those 42 regular residual
parents, certifies 571 receiver-grid cells, misses 773 cells, and consumes 0
parent rows. v6 adaptively refines the failed receiver cells to terminal grid
128, certifies 622 receiver leaves, records 3,024 structural terminal
source-cover misses, resolves 0 coarse cells, and consumes 0 parent rows. The
source-cover defect atlas now records the exact rational boundary burden for
those 42 regular rows: 1,207 low-side and 1,817 high-side terminal defects, 10
low-only rows, 10 high-only rows, 22 two-sided rows, and 0 receiver-interior
missing leaves. The source-cover boundary ownership certificate target converts
that atlas into a finite 42-row closure lemma, and the boundary ownership audit
proves 42 / 42 complete terminal-grid receiver partitions while certifying 0
rows against the full ownership pass rule. The one-leaf boundary movement probe
then tests the three smallest boundary components, records required strict
movement/contraction thresholds `0.000026691996524`, `0.000026691996524`, and
`0.00024618430271`, and certifies 0 source-boundary movement rows, 0
receiver-range contraction rows, and 0 full pass-rule rows. The one-leaf
source-boundary movement theorem attempt then verifies those thresholds as
exact source-boundary defect identities while certifying 0 same-packet
source-boundary movement rows. The one-leaf receiver-range contraction theorem
attempt verifies the same thresholds as exact receiver-boundary defect
identities while certifying 0 same-packet receiver contraction rows. The
one-leaf candidate-change boundary-data constructor then combines those source
and receiver routes into exact boundary-opening inequalities while certifying 0
same-packet candidate-change rows. The direct-path lambda shift screen gives a
positive sampled direction for those three rows at `lambda=0.305`, and the
follow-on replay recertifies proof-grade 12-root topology for that trial seed.
However, the replayed v1-v6 preledger stack still leaves 162 rows
`split_required`, 0 complete receiver-cover parent rows, 0 accepted fold-layer
rows, and no branch-chart authorization. Direct-path lambda motion alone is not
a row-closure mechanism. The branch still leaves 162 rows for a new
source-cover/parent-complement theorem or candidate change with proof-grade
positive boundary-opening data, endpoint/complement ownership, receiver-cover
closure, and fold-layer closure. A
higher-fold fold-layer burden atlas now groups the 112 fold-layer rows by 12
separator layers but consumes 0 rows. No live ledger or branch chart is
authorized. The first nonlinear fold-coordinate collocation tangent-matrix
screen now adds bounded fold-coordinate columns and 3 homogeneous structural
rows to the v10 strict-gap matrix. It has a feasible scanner witness with
minimum strict-gap post-margin `0.484518823372` and a positive three-row
one-leaf boundary-opening guard with minimum margin `0.99975381569729`, but it
still consumes 0 rows and keeps `preledger_pass=false` and
`branch_chart_authorized=false`.

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
| `next_candidate_solver_target.md` | `accepted` as next solver target | `78d6ff8727007615275eb167adaec927b2ac7cd26f02c0cf0b2d19d817aa6a9c` | Defines the next executable target as a fresh fold-adapted collocation candidate with the null-coordinate pre-ledger as the first acceptance row and a tangent-space gap-opening criterion for parent complements, now with diagnostic, live local scanner, finite-deformation seed surfaces, the higher-fold interval root-count topology certificate, the v6 structural source-cover split state, the source-cover defect atlas, the boundary ownership audit, the one-leaf boundary movement probe, the one-leaf source-boundary theorem attempt, the one-leaf receiver contraction theorem attempt, the one-leaf candidate-change boundary-data constructor, the direct-path lambda shift screen, the `lambda=0.305` replay no-go, the endpoint-functional domain/evaluation-map no-go, the endpoint-functional domain/evaluation-map contract, the endpoint-functional $C^1$ endpoint-basis ansatz attempt, the endpoint-functional explicit $\Psi_j$ formula attempt, and the fold-layer burden-atlas worklist. |
| `fresh_fold_collocation_solver_surface.md` | `accepted` as solver-surface audit | `49e80e39251d54d9a7bdd86b5e8e360507fedfba3f91127cfa280dfd2359ac46` | Records that the first sidecar generator now exists, that the fresh sidecar fail-closes at the binary64 preledger attempt, and that proof-interval-v10 partially certifies row-specific trigonometric range-empty rows, regular monotone diagonal rows, simple-root subwindows, parent-complement probes, ownership/coverage probes, same-packet ownership-data candidates, a regular-boundary finite-family inventory, a separator-assignment no-go, and a topology/no-double-counting no-go while all ten probed complement strips remain unresolved; specifies the minimum lawful same-packet successor artifacts plus the finite gap-opening linearization, diagnostic scanner surface, live local fold-shear matrix, finite candidate-history seed, endpoint-functional domain/evaluation-map no-go, endpoint-functional domain/evaluation-map contract, endpoint-functional $C^1$ endpoint-basis ansatz attempt, and endpoint-functional explicit $\Psi_j$ formula attempt. |
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
| `fresh_same_packet_fold_shear_seed_contract.md` | `accepted` as same-packet seed contract | `2d9d57560b9e25f8006d63912ea438a562922ab30c0b5c3511e8e9c5e02a3313` | Records the finite seed formula, inbound phase shift, residual-collar surplus law, successor output contract, first sidecar fulfillment note, fail-closed preledger attempts, proof-interval partial certificates through v10, and blocker-anatomy sidecars. It remains priority-only and does not authorize live ledger edits. |
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
| `fresh-proof-interval-preledger-v3.mjs` | `accepted` as proof-interval trig-plus-diagonal sidecar generator | `df7cbb18b32fb76b9d316ab1c7434a5dee5873aea797a51b08da0b12bcae5ee2` | Deterministically emits the proof-interval-v3 backend certificate, sidecar ledger, report, and engine audit using exact-rational row-specific trigonometric range enclosures plus derivative enclosures for same-interval regular diagonal rows. |
| `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v3.json` | `accepted` partial backend certificate | `bb66982ecad9a9f9bc089252c544a98b080d2c8f96a67f319d7cc1abfe9d3811` | Records the v3 range and derivative enclosure method, source hashes, numeric intake, rational $\pi$ bracket `333/106 < pi < 355/113`, Taylor remainder rule, and machine-readable $X_\delta$ and $dX_\delta/d\theta$ basis policy. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v3.json` | `fail-closed` proof-interval trig-plus-diagonal sidecar | `dfa2c07366ccc32a4f72359ee7cf132d288c7af36b7ba1c94adb7c0524182e1e` | `status=proof_interval_v3_trig_range_monotone_diagonal_sidecar_branch_chart_blocked`; accepts 116 row-specific trigonometric range-empty rows plus 8 monotone diagonal exclusions, leaves 38 `split_required` rows, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v3.md` | `fail-closed` proof-interval trig-plus-diagonal report | `89f072c559b2c04d3314075ea413706552b7d65ee9d56b1210eac66e02a6dcd7` | Records the exact-rational range-empty and monotone diagonal subset, minimum accepted range gap `0.055914412432543`, minimum accepted diagonal Jacobian floor `0.001946149764116`, and the remaining simple-root/structural, fold-interval diagonal, inactive-fold-neighborhood, and active fold-layer burdens. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v3.json` | `diagnostic` proof-interval trig-plus-diagonal engine audit | `823a9844b0afa2749cb112e5b6eba1b661905e1dcdb8211cf9bfcb103b232e05` | Confirms v3 uses certified trigonometric enclosures for range-empty rows and exact derivative floors for same-interval regular diagonal rows, while simple-root, fold-layer, and parent-complement certificates remain absent. |
| `fresh-proof-interval-preledger-v4.mjs` | `accepted` as proof-interval trig-diagonal-simple-root sidecar generator | `0c58096c1bea6d7cec5fc35e01e47dc323e3f6b85399ec455c67164f8a61b08b` | Deterministically emits the proof-interval-v4 backend certificate, sidecar ledger, report, and engine audit using exact-rational row-specific trigonometric range enclosures, derivative enclosures, oriented source-inner simple-root coverage, and a receiver-grid subwindow search. |
| `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v4.json` | `accepted` partial backend certificate | `21c4dc5bd3891869b86e0f434c44608af0b5cfead25d4729d86ff08eba675651` | Records the v4 range, derivative, and simple-root subwindow method, source hashes, numeric intake, rational $\pi$ bracket `333/106 < pi < 355/113`, Taylor remainder rule, and exact packet memory-horizon policy. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v4.json` | `fail-closed` proof-interval trig-diagonal-simple-root sidecar | `4d57cb631d09d145702244b26227fceee42bd528ae75ca4a8f27f1abbb010298` | `status=proof_interval_v4_trig_range_monotone_diagonal_simple_root_sidecar_branch_chart_blocked`; accepts 116 row-specific trigonometric range-empty rows plus 8 monotone diagonal exclusions, records 6 simple-root subrow certificates, leaves 38 parent rows `split_required`, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v4.md` | `fail-closed` proof-interval trig-diagonal-simple-root report | `884e13cdea3a0f6b2c12a8266fc222e363c55d274836bf7a1ff1e46fe243b7e3` | Records the exact-rational range-empty, monotone diagonal, and simple-root subwindow subset: 6 simple-root subrows, minimum simple-root Jacobian floor `0.001946149764116`, coverage gap `0.001122267086258`, memory lower margin `0.263009875015056`, and horizon margin `2.532580711213249`. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v4.json` | `diagnostic` proof-interval trig-diagonal-simple-root engine audit | `0dc1adebb4f8fb530f3369cf33c343909d6a6eaabeb57c35e97c9eecdad8ed2c` | Confirms v4 records simple-root subwindow certificates but does not consume parent complements, periodic seam endpoint ownership, inactive fold-neighborhood contacts, fold-interval diagonal locks, or active fold-layer obligations. |
| `fresh-proof-interval-preledger-v5.mjs` | `accepted` as proof-interval parent-complement-probe sidecar generator | `4c22f49b49e5d76f7c7aa7458e6d8c0fe27b01456dc3405d59163368cea89be1` | Deterministically emits the proof-interval-v5 backend certificate, sidecar ledger, report, and engine audit by importing the v4 simple-root subrows and probing receiver-side parent complements with exact-rational strict range-empty tests. |
| `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v5.json` | `accepted` partial backend certificate | `f85be64a5e6fdcfff48676ab92e3ba73ebda95cd1f93221a81f6dc297bb6e912` | Records the v5 range, derivative, simple-root subwindow, and parent-complement-probe method, including the v4 sidecar source identity and the no-source-complement condition for the six imported simple-root subrows. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v5.json` | `fail-closed` proof-interval parent-complement-probe sidecar | `15730328d60c1b4ddd3628c9de186b01d4471dcb4bd1724a1cecd00fe424d589` | `status=proof_interval_v5_trig_range_monotone_diagonal_simple_root_parent_complement_sidecar_branch_chart_blocked`; keeps 124 accepted empty rows and 6 simple-root subrow certificates, probes 10 parent-complement strips, certifies 0 strict-empty complement strips, consumes 0 simple-root parent rows, leaves 38 parent rows `split_required`, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v5.md` | `fail-closed` proof-interval parent-complement-probe report | `40dea4fce15dddeec28f159bacd92adfef2351e2fdeda165bb22fecdff2dc75e` | Records the exact-rational range-empty, monotone diagonal, simple-root subwindow, and parent-complement probe subset: 10 receiver-side complement strips probed, 0 strict-empty complement strips, 0 simple-root parent rows consumed, and all complement blockers requiring subdivision, endpoint ownership, or boundary certificate. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v5.json` | `diagnostic` proof-interval parent-complement-probe engine audit | `358fe902bc36f4cfc48e077d07361de3c44fb87580dd67c03271f4f9bf53f59b` | Confirms v5 records parent-complement probes but does not consume simple-root parent rows, periodic seam endpoint ownership, inactive fold-neighborhood contacts, fold-interval diagonal locks, or active fold-layer obligations. |
| `fresh-proof-interval-preledger-v6.mjs` | `accepted` as proof-interval complement ownership/coverage probe generator | `915ddb9b852fc11b3a4c0bd5cbc29d46302c636b2683ea5de5b0949a770ae7dc` | Deterministically emits the proof-interval-v6 backend certificate, sidecar ledger, report, and engine audit by importing the v5 complement strips and testing accepted ownership or coverage alternatives without recomputing the v4/v5 trigonometric backend. |
| `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v6.json` | `accepted` partial backend certificate | `ecea8d45349494df3119949562933bee2a0dd9261ffbf0c9302c21a7ef20b407` | Records the v6 complement ownership/coverage probe method, v5 source artifacts, same-packet fold-layer burden source, and policy sources for strict range-empty, endpoint/topology, fold-family, and regular-boundary alternatives. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v6.json` | `fail-closed` proof-interval complement ownership/coverage probe sidecar | `5d5c6f54a24d73e31e1536d63a033dd69d301ffc8289a5bcabf4d7e8c1afbf52` | `status=proof_interval_v6_complement_ownership_probe_branch_chart_blocked`; inherits 124 accepted empty rows and 6 simple-root subrow certificates from v5, tests 10 parent-complement strips, accepts 0 by strict range-empty, endpoint/topology ownership, exact fold-family coverage, or regular-boundary coverage, consumes 0 simple-root parent rows, leaves 38 parent rows `split_required`, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v6.md` | `fail-closed` proof-interval complement ownership/coverage report | `1b6eefc63b323c7a440b0bf170dc1db0573b84d6170e1257b3d1b8f1463230c1` | Records the negative ownership/coverage result: all 10 complement strips fail strict range-empty, endpoint/topology ownership, exact fold-family coverage, and regular-boundary coverage under current same-packet data. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v6.json` | `diagnostic` proof-interval complement ownership/coverage engine audit | `208f683f1545378fad613cad43351eb29e1d9ba80b0e026fa41f9cced97fcee8` | Confirms v6 is an import-and-policy probe on v5 complement strips, accepts no parent-complement strip, and does not consume simple-root parent rows, periodic seam endpoint ownership, inactive fold-neighborhood contacts, fold-interval diagonal locks, or active fold-layer obligations. |
| `fresh-proof-interval-preledger-v7.mjs` | `accepted` as proof-interval same-packet ownership-data constructor | `51d83af3da424d8ff00a6ef93096957423fe81b7bf4e4b6c3a03af207604e61a` | Deterministically emits the proof-interval-v7 backend certificate, sidecar ledger, report, and engine audit by importing the v6 complement strips and constructing same-packet candidate endpoint, fold-family, and regular-boundary records without recomputing the v4-v6 trigonometric backend. |
| `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v7.json` | `accepted` partial backend certificate | `369ecfbd278d30c85b184e74faf1e3dc5680f8f50fa36ff087d841baa009b6d7` | Records the v7 same-packet ownership-data constructor method, v6 source artifacts, fresh fold-layer burden, blocker anatomy, input screen, mesh, seed contract, and policy sources for endpoint/topology, fold-family, and regular-boundary alternatives. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v7.json` | `fail-closed` proof-interval ownership-data constructor sidecar | `addc7c6dfa9021d3bc2ccc2ff4750179f3ff73d2c412fca7e59773abddec558c` | `status=proof_interval_v7_same_packet_ownership_data_probe_branch_chart_blocked`; inherits 124 accepted empty rows and 6 simple-root subrow certificates, constructs 10 finite candidate regular-boundary cores, considers 16 fresh fold-layer burden rows, constructs 0 endpoint contact tables, accepts 0 complement strips by accepted alternatives, consumes 0 simple-root parent rows, leaves 38 parent rows `split_required`, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v7.md` | `fail-closed` proof-interval ownership-data constructor report | `b1a8cd148511d6d152e86d9258d8085d867adc3b535ab1e5384dd6744ee86eaf` | Records the same-packet ownership-data construction result: 10 candidate regular-boundary cores exist, but endpoint contact tables, accepted same-packet fold-layer exact membership, regular-boundary inclusion/domination, topology/no-double-counting, and non-core complement closure remain absent. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v7.json` | `diagnostic` proof-interval ownership-data constructor engine audit | `015b8405b85b9c67b0112cd91243a35182da234f50def90285cc9b20dab43b4c` | Confirms v7 is an import-and-construction probe on v6 complement strips, accepts no parent-complement strip, and does not consume simple-root parent rows, periodic seam endpoint ownership, inactive fold-neighborhood contacts, fold-interval diagonal locks, or active fold-layer obligations. |
| `fresh-proof-interval-preledger-v8.mjs` | `accepted` as proof-interval regular-boundary finite-family constructor | `bfb74e307b3749620608d9397061b74aca19f75998aa2274d5d99a69a8daebd3` | Deterministically emits the proof-interval-v8 backend certificate, sidecar ledger, report, and engine audit by importing the v7 candidate regular-boundary cores and constructing finite candidate families without accepting coverage. |
| `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v8.json` | `accepted` partial backend certificate | `4f55b4963c6adfc6065bd5ade6287a096c6680784cf0b8469929ad1324cac552` | Records the v8 finite regular-boundary candidate-family method, v7 source artifacts, fold constants audit source, fresh fold-layer burden, blocker anatomy, input screen, mesh, seed contract, and policy sources for regular-boundary alternatives. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v8.json` | `fail-closed` proof-interval regular-boundary finite-family sidecar | `d4828cf3be5b033553990060c6d41dcb9e78496cb595c58ec564dc331637e554` | `status=proof_interval_v8_regular_boundary_finite_family_probe_branch_chart_blocked`; inherits 124 accepted empty rows and 6 simple-root subrow certificates, constructs 4 finite candidate families and 20 candidate membership edges from 10 v7 cores, certifies 0 separator assignments, 0 inclusion proofs, 0 fresh domination inequalities, 0 topology/no-double-counting certificates, 0 non-core complement closures, accepts 0 complement strips, consumes 0 simple-root parent rows, leaves 38 parent rows `split_required`, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v8.md` | `fail-closed` proof-interval regular-boundary finite-family report | `c750683ec7e03af9ea29882458ae388e0132288fdf7a86ec292ecd74beb6e363` | Records the finite candidate-family construction result: 4 candidate families and 20 candidate membership edges exist, but single separator assignment, same-packet inclusion, fresh domination, topology/no-double-counting, and non-core complement closure remain absent. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v8.json` | `diagnostic` proof-interval regular-boundary finite-family engine audit | `6b18a3805de4046634f57fa6c3def8bbe28616b0567f5772f18c1f17c7996a9c` | Confirms v8 is an import-and-finite-family probe on v7 candidate cores, accepts no parent-complement strip, and does not consume simple-root parent rows, periodic seam endpoint ownership, inactive fold-neighborhood contacts, fold-interval diagonal locks, or active fold-layer obligations. |
| `fresh-proof-interval-preledger-v9.mjs` | `accepted` as proof-interval separator-assignment no-go auditor | `d9d2d3a0f630d9501b76caa5ea638fb2bc8037b409a7909dd056a744e7f39148` | Deterministically emits the proof-interval-v9 backend certificate, sidecar ledger, report, and engine audit by importing the v8 finite candidate-family inventory and rejecting current selector shortcuts without accepting coverage. |
| `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v9.json` | `accepted` partial backend certificate | `2491cb7e856ffe546dc47d31238476780359ebfdc08c3d073a7f3aff633f93f3` | Records the v9 selector pass rule: exact separator assignment requires an explicit singleton field or accepted topology ownership convention; candidate-list length, side labels, endpoint adjacency without ownership, array order, and family ordering are not proof-grade. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v9.json` | `fail-closed` proof-interval separator-assignment no-go sidecar | `f2ac2b2e9344f7259f2e04b226694214b87c97739d745d83b0e8c34b3568cf3e` | `status=proof_interval_v9_separator_assignment_no_go_branch_chart_blocked`; inherits the v8 finite family inventory, records 10 ambiguous two-separator cores, tests 5 selector methods over 10 cores, accepts 0 separator assignments, accepts 0 complement strips, consumes 0 simple-root parent rows, leaves 38 parent rows `split_required`, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v9.md` | `fail-closed` proof-interval separator-assignment no-go report | `2d1614d4c64f31af6058556e30cb0509e92c476ff572a60fc8b1014167d16012` | Proves the current-field no-go: every imported v8 core has two candidate separators and no accepted ownership selector, so side labels, endpoint adjacency without ownership, array order, separator order, and family order cannot certify a singleton assignment. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v9.json` | `diagnostic` proof-interval selector no-go engine audit | `2286616119f9493b7ae3ff06cbf2ff670da59a3c53c8965f9fc0d3388300e2fb` | Confirms v9 is a selector-field audit on imported v8 candidate cores, accepts no parent-complement strip, and does not consume simple-root parent rows, periodic seam endpoint ownership, inactive fold-neighborhood contacts, fold-interval diagonal locks, or active fold-layer obligations. |
| `fresh-proof-interval-preledger-v10.mjs` | `accepted` as proof-interval topology/no-double-counting no-go auditor | `5c781e01aa798c078d071fb6287974fee9f1c1918de9721a98461f7e9a0aa208` | Deterministically emits the proof-interval-v10 backend certificate, sidecar ledger, report, and engine audit by importing the v9 residual regular-boundary inventory and rejecting current topology/no-double-counting shortcuts without accepting coverage. |
| `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json` | `accepted` partial backend certificate | `3c2aaba50a8884f8f761e2a3597a478b8f53c511b885bbd15ed3cf213000d22d` | Records the v10 topology/no-double-counting pass rule: regular-boundary consumption requires explicit topology ownership and no-double-counting data; absence of topology fields, complement-boundary ownership, branch-reuse exclusions, endpoint-excluded disjointness, and fold-layer nonexpansion certificates is fail-closed. |
| `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json` | `fail-closed` proof-interval topology/no-double-counting no-go sidecar | `a2dc3e86e6c78656a338fde81fac83cd0e79b8307249217016cbd1f628ec7e9b` | `status=proof_interval_v10_topology_no_double_counting_no_go_branch_chart_blocked`; inherits the v9 residual core inventory, tests 5 topology/no-double-counting methods over 10 cores, certifies 0 topology/no-double-counting certificates, accepts 0 complement strips, consumes 0 simple-root parent rows, leaves 38 parent rows `split_required`, and keeps `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.md` | `fail-closed` proof-interval topology/no-double-counting no-go report | `537e5211c67075b1f8e2f3fb1f31b817abb61c4ce82d6d04af3c22e2e0adc586` | Proves the current-field no-go: every imported residual core lacks the explicit topology field, complement-boundary ownership rule, simple-root branch-reuse exclusion, endpoint-excluded disjointness proof, and fold-layer nonexpansion certificate required to certify topology/no-double-counting. |
| `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json` | `diagnostic` proof-interval topology/no-double-counting no-go engine audit | `a346158974006313712525f4216e4df75427531322da24d20b821b1003112cc0` | Confirms v10 is a topology/no-double-counting audit on imported v9 residual cores, accepts no parent-complement strip, and does not consume simple-root parent rows, periodic seam endpoint ownership, inactive fold-neighborhood contacts, fold-interval diagonal locks, or active fold-layer obligations. |
| `regular_boundary_topology_ownership_certificate_target.md` | `accepted` as priority-only certificate target | `58e8afc868b335b72936e694f978e3fc21b913a55eeca2fb68b489a928299c37` | Converts the proof-interval-v10 no-go into a finite residual-core ownership lemma target $T(C)$ requiring exact separator assignment, same-packet inclusion, simple-root branch-reuse exclusion, endpoint disjointness, fold-layer nonexpansion/domination, and non-core complement closure before any regular-boundary parent-complement consumption. |
| `regular_boundary_route_decision.md` | `accepted` as priority-only proof-strategy decision point | `08d61e8f000416ddbc5f92aacc1a4ed2e0b4de1e5fff5aa2f3f1a184b723cf2b` | Records that the regular-boundary route cannot continue from topology ownership alone: proof-interval-v8 has historical fold ceilings only, no fresh same-packet $I^{\mathrm{reg\text{-}bdry}}$ bound, no enlarged fresh ceiling, and no non-core complement closure. It now records the selected route as candidate repair / strict-gap closure and defers the fresh domination packet. |
| `candidate_repair_strict_gap_closure_target.md` | `accepted` as priority-only strict-gap repair target | `9378c2e1543451cb069081232b61c6490c66cd29e048fab41c6f5e1f7695819c` | Converts the 10 v10 parent-complement collars into signed null-coordinate gap targets for a repaired or successor candidate. It now records that direct tangent rays, shifted/split/Hermite enrichment, proof-grade sampled Hermite obstruction, period-coupled Hermite locking, and fixed-separator velocity-Bernstein corridors fail to produce a constructive same-itinerary repair; the higher-fold branch has proof-grade root-count topology, a proof-interval v1/v2/v3/v4/v5/v6 sidecar stack, a source-cover defect atlas, a boundary ownership audit, a one-leaf boundary movement probe, a one-leaf source-boundary theorem attempt, a one-leaf receiver contraction theorem attempt, a one-leaf candidate-change boundary-data constructor, a direct-path lambda shift screen with positive sampled one-leaf openings, a `lambda=0.305` topology-certified but row-blocked replay, and a fold-layer burden atlas. Its open split is 42 structural parent-complement receiver-cover rows, 8 periodic endpoint/complement rows, and 112 fold-layer rows before parent-row consumption or branch-chart work. |
| `fresh-v10-strict-gap-matrix-builder.mjs` | `accepted` as strict-gap diagnostic matrix builder | `ce4cacc6d3f98b7bc6490f66bac5fac82410a8a1e8634ff115582c17d26bf429` | Imports proof-interval-v10 parent-complement strips and emits the declared local-shear strict-gap scanner input, with `--period-mode free` as the active diagnostic mode and `--period-mode fixed` available for comparison. |
| `gap_opening_fresh_v10_strict_gap_input.local_shear_free_period.v0.json` | `diagnostic` strict-gap scanner input | `57a8a32222e180be8acd4af8620d3d4925722fa9d294d9511383eca121a87a90` | Declares the 10 v10 collar gap rows, lower-deficit orientations, required margins, existing half-period-antisymmetric $C^1$ local shear basis, and free period tangent. It is not an interval certificate. |
| `gap_opening_fresh_v10_strict_gap_result.local_shear_free_period.v0.json` | `diagnostic` strict-gap scanner result | `74ce8f7d8f9bdfb070f0a2da0044611d0a8b62e29a4e2fefd4c6bcf4db00d7ac` | Scanner returns `status=feasible` with witness `(b_T,h_A0,h_A1,h_A2)=(-0.176804284695,-0.998248451171,-1,-0.558213117762)` and `min_gap_value_after_required_margin=0.115066037632`; no live ledger or branch chart is authorized. |
| `gap_opening_fresh_v10_strict_gap_report.local_shear_free_period.v0.md` | `accepted` as priority-only strict-gap diagnostic report | `b61e292898a0adf92b192ae83f3d13d32c6c567b4eea1fcf9f8b0f1ab564d2b9` | Records the free-period diagnostic witness, the 10 collar margins, and the fixed-period comparison that misses `C_u_A4_A3_right_v10_10` by `0.0025032931028`; it identifies period freedom or a stronger basis as the next solver burden. |
| `fresh-v10-strict-gap-finite-integration-audit.mjs` | `accepted` as strict-gap direct-integration audit generator | `7d4af9d97563736867bf3ae165ddd861d452159a76557ea25a713cbb8474648c` | Deterministically applies the free-period strict-gap witness to the current fresh seed as $X_\lambda=X_{\mathrm{fresh}}+\lambda H_{\mathrm{repair}}$, $T_\lambda=T_0+\lambda b_T$, then counts field-speed crossings along that direct path. |
| `fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.json` | `diagnostic` direct-integration obstruction result | `a65e7ec93836b6890e32ec4ccd698584736fa72402ea2a0f3349bbc573aa43cd` | Records $\lambda_{\min}=0.685286902752066$ for nonnegative strict-gap collars, controlled by `C_u_A4_A2_left_v10_7`, with 20 field-speed crossings at the threshold and 24 crossings at $\lambda=1$; no live ledger or branch chart is authorized. |
| `fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.md` | `accepted` as priority-only direct-integration obstruction report | `350fea9ce7db581aa859c6011b928be5e1db3e5379ab2efbd0f1e7b6046d7df2` | Blocks direct promotion of the free-period local-shear witness under `doubled_four_arc_generic` and states the next decision: preserve the four field-speed separators or explicitly authorize a higher-fold itinerary. |
| `fresh-v10-shifted-separator-strict-gap-matrix-builder.mjs` | `accepted` as shifted-separator strict-gap matrix builder | `548e796f6a99e8f92d2f340616ad56ab83db1b36c09312a7dc97d99536553d1d` | Builds the fixed-period shifted-separator $C^1$ basis whose arc endpoints are the current fresh separator phases, so separator velocities are preserved to first order. |
| `gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json` | `diagnostic` shifted-separator strict-gap scanner input | `8d8a654ed4aed78f6eaddce771751a7ec5e9a538898c4057fefa8d6a9a586ae3` | Declares the shifted-separator fixed-period basis, the 10 v10 collar gap rows, and the candidate witness $(h_{A0s},h_{A1s},h_{A2s})=(-1,-1,-1)$. It is not an interval certificate. |
| `gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json` | `diagnostic` shifted-separator strict-gap scanner result | `085e03d764370aa33ac7dc33a4faecd7a191bbd485f4e98dfc6ff512338b5f55` | Scanner returns `status=feasible` by `input_witness`, with `min_gap_value_after_required_margin=0.484518823372`; no live ledger or branch chart is authorized. |
| `fresh-v10-shifted-separator-finite-integration-audit.mjs` | `accepted` as shifted-separator finite-integration audit generator | `d8249b93e95aef81d3fe69cb0332fed3706cfa31d46b2ab23f0dd4f92c4e46c3` | Applies the shifted-separator tangent witness as a fixed-period finite path and counts field-speed roots along the direct ray. |
| `fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.json` | `diagnostic` shifted-separator direct-integration obstruction result | `2294230e1343b8c5739b6f080d9884e590b24131744260b7c27a2600fcdb9e28` | Records $\lambda_{\min}=0.264833953926991$ for nonnegative strict-gap collars, controlled by `C_u_A4_A2_left_v10_7`, with 12 field-speed roots at the threshold and 24 roots at $\lambda=1`; no live ledger or branch chart is authorized. |
| `fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.md` | `accepted` as priority-only shifted-separator obstruction report | `7b3367e3066e9d9752bf96b35b92cc96494921767929f30515e6d777c3fb6b9e` | Records that the shifted basis is a useful solver-basis signal, but direct finite integration is still not a valid same-itinerary repaired candidate. |
| `fresh-v10-finite-itinerary-strict-gap-screen.py` | `accepted` as finite-itinerary strict-gap screen generator | `f6024d07ceaed037e92a682622700b3f08cd83737f00bc04b5b83476d7f8809d` | Solves a bounded shifted-separator sampled LP with sampled v10 collar inequalities and retained field-speed sign guards using SciPy/HiGHS from the shared workspace venv. |
| `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.json` | `diagnostic` finite-itinerary strict-gap screen result | `599a8975f9fe3f6e2f7f173a9d5d2684d32ddb1066e7d7772b991a19a51f6ec2` | Records `status=sampled_itinerary_constraints_block_positive_strict_gap_margin`, 810 sampled gap inequalities, 1,940 retained field-speed sign guards, and optimum $\gamma_{\mathrm{sample}}=-0.204126631574676`; no live ledger or branch chart is authorized. |
| `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.md` | `accepted` as priority-only finite-itinerary screen report | `0f69685ee1fa659b506c0bc899b2883de172ada50ec56a26571fa8723b3e7415` | Closes the bounded three-coordinate shifted basis as a same-itinerary finite repair route and points to a richer basis or explicit higher-fold itinerary decision. |
| `fresh-v10-shifted-separator-split-matrix-builder.py` | `accepted` as split shifted-separator matrix builder | `a7aafb6532a4777f2826ce63f60013c801785afec8ab684b041376f98048ffc6` | Builds split shifted-separator $C^1$ subarc bases for same-itinerary strict-gap screens while preserving zero derivative at declared separator phases. |
| `gap_opening_fresh_v10_strict_gap_input.shifted_separator_split2_fixed_period.v0.json` | `diagnostic` split-two shifted-separator strict-gap input | `793a74bee5efb859c142f66aac8ac8a6dcd705da126f1b836ef77e144c8d7a09` | Declares six split shifted-separator subarc variables over the same 10 v10 collar rows; it is not an interval certificate. |
| `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator_split2.v0.json` | `diagnostic` split-two finite-itinerary screen result | `2a7e9eb4d2db5805ce198b2f026a1ef9a5296ec8f0d8ee144aa0b1e88928abdf` | Records `status=sampled_itinerary_constraints_block_positive_strict_gap_margin`, 810 sampled gap inequalities, 1,940 retained field-speed sign guards, and optimum $\gamma_{\mathrm{sample}}=-0.207816886605516`; no live ledger or branch chart is authorized. |
| `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator_split2.v0.md` | `accepted` as priority-only split-two finite-itinerary screen report | `f8ebc3c190ca65e8039034dc14d5c415d8d466a7562be5c1749abbd1dd640b2d` | Records that the first split shifted-basis enrichment still has nonpositive sampled same-itinerary strict-gap margin. |
| `fresh-v10-hermite-itinerary-gap-boundary-screen.py` | `accepted` as Hermite itinerary boundary screen generator | `33f2d4de5afc08d2d2549b0d619b899d25fc3a411adb6749a907b409f32279f0` | Solves anti-periodic cubic Hermite same-itinerary sampled LPs with separator derivative locks, sampled v10 collar inequalities, retained field-speed sign guards, and derivative-bound sensitivity using SciPy/HiGHS from the shared workspace venv. |
| `fresh_v10_hermite_itinerary_gap_boundary_screen.v0.json` | `diagnostic` Hermite finite-itinerary boundary result | `8c111d28452c3d67511765c2437fec7dfad87732cfc946ff7d6a176ffe22713b` | Records `status=sampled_hermite_boundary_no_positive_margin_found`, grid refinements through 270 Hermite nodes and 541 LP variables, 810 sampled gap inequalities, 1,940 retained field-speed sign guards, and best margin $\gamma_{\mathrm{sample}}=-2.20865857936394\times 10^{-10}$; no live ledger or branch chart is authorized. |
| `fresh_v10_hermite_itinerary_gap_boundary_screen.v0.md` | `accepted` as priority-only Hermite boundary screen report | `93f44a4dd4996221ba6c01e457ebdb3a3f97aaa5b409fa8c96c1ab78418fcb50` | Records that a substantially richer same-itinerary Hermite basis reaches the sampled boundary from below and does not find positive strict-gap margin; next same-itinerary work should derive an interval dual obstruction or change structural ansatz. |
| `fresh-v10-hermite-dual-obstruction.py` | `accepted` as Hermite row-only dual obstruction generator | `a986ff194736f8700d6c1edc0b30ddc390421ba785a0bc9412e22dc202d61a52` | Solves the same Hermite sampled LP as a row-only primal and dual, normalizes HiGHS dual sign conventions into nonnegative multipliers, audits stationarity/complementarity/residuals, and reports a residual-adjusted dual upper bound without using a gamma-cap proof row. |
| `fresh_v10_hermite_dual_obstruction.v0.json` | `diagnostic` Hermite row-only dual obstruction result | `a97fe7573baaf69314caa3800e5210408ff22d6969415cbc9b95893e7e0d8230` | Records `status=sampled_hermite_dual_obstruction_float_certified_for_tested_levels`, half-grid refinements 64 through 256, row-only primal/dual agreement to floating precision, the full active multiplier table for each tested level, and residual-adjusted upper bound $\gamma\leq -2.20862209291526\times 10^{-10}$ at half-grid 256; no live ledger or branch chart is authorized. |
| `fresh_v10_hermite_dual_obstruction.v0.md` | `accepted` as priority-only Hermite dual obstruction report | `edd8b5e7a16942d604c5147364c16c70ebba3bb8670512749f81398b9fd6483a` | Records the active-row dual certificate anatomy, including the full active multiplier table at the tightest level, and identifies proof-grade intervalization of those rows as the next same-itinerary closure step. |
| `fresh-v10-hermite-dual-rationalization-audit.py` | `accepted` as Hermite dual rationalization audit generator | `aa0e51d24c1fe589af78e41d0bb6d7c6bcc7eb09147af67cfec998f4d6718df3` | Rationalizes active half-grid-256 dual multipliers at several denominator caps and audits the residual-adjusted bound against the current binary64 Hermite row matrix. |
| `fresh_v10_hermite_dual_rationalization_audit.v0.json` | `diagnostic` Hermite dual rationalization audit result | `1a6005ec6212e09787ddb1b057595db2a790ca68070a2c221b2f3c3bb55d6141` | Records `status=rational_multiplier_candidate_binary64_rows_negative`; denominator cap $10^9$ rationalizes all 23 active multipliers, uses maximum denominator `986613153`, and preserves binary64-row residual-adjusted upper bound $\gamma\leq -2.20860276388005\times 10^{-10}$; no live ledger or branch chart is authorized. |
| `fresh_v10_hermite_dual_rationalization_audit.v0.md` | `accepted` as priority-only Hermite dual rationalization report | `72915f78c7aeaac8837b8679a59e504f19d6d9d297521d0e960844e9b184f7f8` | Records that multiplier exactness is not the current same-itinerary blocker; the remaining proof-grade burden is outward-rounded interval enclosure of the active Hermite row coefficients. |
| `fresh-v10-hermite-active-row-interval-backend.mjs` | `accepted` as Hermite active-row interval backend generator | `f660bedda7e015ead134452bf6a8488c4701c0b8abfe56154d4d2a968fdfbf4e` | Reconstructs the 23 active half-grid-256 rows with exact rational Hermite coefficients, rational trigonometric enclosures, exact-rational multipliers, exact gamma stationarity, and deterministic source-margin containment checks. |
| `fresh_v10_hermite_active_row_interval_backend.v0.json` | `accepted` as proof-grade finite sampled Hermite dual obstruction | `7d23099b1e5d46a4984d6e52f529160290190fcc673790536004339562bd368a` | Records `status=proof_grade_sampled_dual_obstruction_closed`, adjusted upper interval $\gamma\leq -2.20499517531647\times 10^{-10}$, no gamma residual cap, 23 active rows, 18 active speed rows, and active speed guard lower bound `0.027994697344905384`; no live ledger or branch chart is authorized. |
| `fresh_v10_hermite_active_row_interval_backend.v0.md` | `accepted` as priority-only active-row interval report | `6125e0f7c382ae99c1b4364f023019c6a4df17763e014906ee4927987f9a02ad` | Closes Option A for the finite sampled Hermite row system while explicitly excluding continuous-in-collar obstruction, repaired candidate status, proof-interval preledger pass, live ledger update, and branch-chart authorization. |
| `fresh-v10-hermite-continuous-collar-lift.mjs` | `accepted` as Hermite sample-subset lift generator | `02e33bba91c2b4d667207e639dc338369eeec40ac2737a6b9e6c767fde739763` | Verifies exact sample embedding for the active rows against the declared shifted-separator strict-gap input and Hermite screen sample model. |
| `fresh_v10_hermite_continuous_collar_lift.v0.json` | `accepted` as priority-only same-itinerary Hermite obstruction lift | `5840bb258a37dfbcab0b9f6c24437503c464aeae74bd2de151a4df9e756edc2f` | Records `status=continuous_same_itinerary_obstructed_by_active_sample_subset`, with 5/5 active gap rows and 18/18 active speed rows embedded in the continuous target; no live ledger or branch chart is authorized. |
| `fresh_v10_hermite_continuous_collar_lift.v0.md` | `accepted` as priority-only continuous-target lift report | `ae17e2f88913beda48737d918bca9fdb51ee411b1c4303d127f795b7ac3bb063` | Closes the logical obstruction lift by sample-subset inclusion while explicitly excluding between-sample variation bounds, repaired candidate status, proof-interval preledger pass, live ledger update, and branch-chart authorization. |
| `fresh-v10-period-coupled-hermite-itinerary-screen.py` | `accepted` as period-coupled Hermite screen generator | `dd5632a254fb3d6834a6bc142f0cd786d3d932a2c8c6992e87d77e0d70ea4bbe` | Adds a period tangent and separator speed-contact locks to the Hermite same-itinerary sampled screen. |
| `fresh_v10_period_coupled_hermite_itinerary_screen.v0.json` | `diagnostic-obstructed` period-coupled Hermite screen result | `9ee5f661e569a26a12789f514162aaa1c69f3abf4880c6f4552ca06803884c9d` | Records `status=sampled_period_coupled_hermite_no_positive_margin_found`, best $\gamma_{\mathrm{sample}}=-2.20865843237662\times 10^{-10}$, and no live ledger or branch chart authorization. |
| `fresh_v10_period_coupled_hermite_itinerary_screen.v0.md` | `accepted` as priority-only period-coupled Hermite screen report | `f58bbe8c1bee73ac5c758fc89db45ea62202b991f00355d869c77da090d6b5d1` | Documents the period tangent plus separator speed-lock structural route and its nonpositive sampled margin. |
| `fresh-v10-velocity-bernstein-itinerary-screen.py` | `accepted` as velocity-Bernstein screen generator | `2bebf3aa8c441e6fcacd8c89ff0f5f2aeb0cc31250472bc5bc2a4667d4a02d06` | Builds a velocity-first same-itinerary LP with Bernstein control corridors that hard-code the fixed-separator field-speed sign itinerary. |
| `fresh_v10_velocity_bernstein_itinerary_screen.v0.json` | `diagnostic-obstructed` velocity-Bernstein screen result | `019a892a6bf4651738fd683e3362c155913a540870c34980c8c1ce307be8083a` | Records `status=sampled_velocity_bernstein_no_positive_margin_found`, best degree-31 $\gamma_{\mathrm{sample}}=-0.0126050167182319$, and no live ledger or branch chart authorization. |
| `fresh_v10_velocity_bernstein_itinerary_screen.v0.md` | `accepted` as priority-only velocity-Bernstein screen report | `5ceccbfdbd16df5ec93a3c6dec70d6dea22360fc0997f48b7015aced84232142` | Documents the fixed-separator velocity-corridor route and its nonpositive sampled strict-gap margin. |
| `fresh_v10_itinerary_structural_decision_packet.md` | `accepted` as priority-only itinerary decision packet | `f2bc8f65cdcf7a705af74c2a7064013ababa80f06cfd41b265615539d8ee40fe` | Records proof-grade intervalization plus sample-subset lift of the active Hermite dual rows as Option A, records bounded period-coupled / velocity-corridor Option B screens as obstructed, and records the higher-fold interval root-count certificate plus v1/v2/v3/v4/v5/v6 proof-interval sidecars, source-cover defect atlas, boundary ownership audit, one-leaf boundary movement probe, one-leaf source-boundary theorem attempt, one-leaf receiver contraction theorem attempt, one-leaf candidate-change boundary-data constructor, direct-path lambda shift screen, `lambda=0.305` row-blocked replay, and fold-layer burden atlas before residual parent-complement, endpoint/complement, and fold-layer closure. |
| `fresh-v10-higher-fold-itinerary-rebuild-target.mjs` | `accepted` as higher-fold target generator | `5a73f622ef1d6f5ec6ae3efd25c8c727f196d368917a9f2f8fabae4180cd32ae` | Reads the fresh seed contract plus shifted/free finite-integration obstructions and deterministically emits the priority-only 12-root rebuild target with v1/v2/v3/v4/v5/v6 sidecar, one-leaf post-probe boundary-target handoff, direct-path lambda screen handoff, and fold-layer burden-atlas handoff. |
| `fresh_v10_higher_fold_itinerary_rebuild_target.v0.json` | `diagnostic-target` higher-fold itinerary rebuild target | `b9bf46f276be0f89aad4cc2d8f48bbcfdf5a0f2105af9b84f3adb1ee3f6aba54` | Records `status=higher_fold_itinerary_rebuild_target_frozen_from_shifted_separator_obstruction`, proposed successor packet `fresh-v10-higher-fold-12-root-rebuild-v0`, proposed itinerary `fresh_v10_shifted_threshold_12_root_itinerary`, 12 threshold roots, the diagnostic successor seed packet, the binary64 root-tube attempt, the interval root-count certificate, proof-interval v1/v2/v3/v4/v5/v6 sidecars, the direct-path lambda screen boundary, the fold-layer burden atlas, and no live ledger or branch chart authorization. |
| `fresh_v10_higher_fold_itinerary_rebuild_target.v0.md` | `accepted` as priority-only higher-fold target report | `30afb85e597152595cd9fd737546aad7f9a613c7cc377782e795db44ba6d343a` | Freezes the 12-root higher-fold rebuild target, records the row-reuse boundary, notes that the diagnostic successor seed packet, interval root-count certificate, proof-interval v1/v2/v3/v4/v5/v6 sidecars, one-leaf post-probe boundary-target stack, direct-path lambda shift screen, and fold-layer burden atlas now exist, and requires a new source-cover/parent-complement theorem or candidate change with proof-grade positive boundary-opening data, endpoint/complement ownership, and same-packet fold-layer certification before branch-chart work. |
| `fresh-v10-higher-fold-successor-seed-packet.mjs` | `accepted` as higher-fold successor seed generator | `e8cc5f37a7bf784f65b77c7d4628afb140e57e1ce7ade16e858f1e7b4fef43c3` | Materializes diagnostic successor packets along the shifted direct path, including the baseline `lambda=0.3` packet and the `lambda=0.305` trial via computed direct-path root scans when a lambda is absent from the old obstruction table; reports the v1/v2/v3/v4/v5/v6 proof-interval sidecar stack plus the one-leaf post-probe boundary-target stack, direct-path lambda shift screen, `lambda=0.305` replay audit, fold-layer burden atlas, and proof-grade positive boundary-opening requirement. |
| `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.json` | `diagnostic` higher-fold candidate-history seed | `a731d57f5b5cfd1b3992c54dc0b989aed59c636e01e667dcc3ff15c7a160f8dd` | Records `status=higher_fold_direct_path_seed_not_preledger`, itinerary `fresh_v10_shifted_threshold_12_root_itinerary`, 12 field-speed contacts, and no live ledger or branch chart authorization. |
| `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.json` | `diagnostic` higher-fold separator-refined mesh | `807ef730a80d0a8568d9e8fe09123ea8ddd3880630443ebd16e891b560ca0aee` | Records a 25-interval mesh around diagnostic separator collars for the 12 sampled field-speed contacts and points to the interval root-count certificate; it is not a preledger classification. |
| `causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.json` | `diagnostic` higher-fold preledger input screen | `3bdab74a60bc1c54f5fffa56bce2c21d5ec69291b953c723825cde99c45ae3ec` | Records 1,250 sampled input rows, with 1,066 sampled-disjoint rows and 184 overlap/touch rows; all rows remain `not_interval_certified` and consume nothing outside a proof-interval sidecar. |
| `candidate_cycle_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.md` | `accepted` as priority-only higher-fold seed report | `7d607e95aab98cde247249c997c6ea11dbf1bf9279a15123800f9d1def22f863` | Documents the diagnostic seed identity, field-speed contacts, preledger input-screen counts, the existing root-count topology certificate, the v1/v2/v3/v4/v5/v6 proof-interval sidecar results, the source-cover boundary ownership audit, the one-leaf boundary movement probe, the one-leaf source-boundary theorem attempt, the one-leaf receiver contraction theorem attempt, the one-leaf candidate-change boundary-data constructor, the direct-path lambda shift screen, the `lambda=0.305` topology-certified but row-blocked replay, the fold-layer burden atlas, and the remaining residual row-certificate requirements. |
| `fresh-v10-higher-fold-root-tube-certificate.mjs` | `accepted` as root-tube certificate-attempt generator | `e709fc7d09d38ad09f5b5362f206689dbb0e37f34accae0bc24419d28deed2ec` | Deterministically evaluates the 12 sampled field-speed contacts as candidate root tubes and complement intervals using binary64/Lipschitz inequalities. |
| `fresh_v10_higher_fold_root_tube_certificate.v0.json` | `diagnostic` binary64/Lipschitz root-tube certificate attempt | `d4227cbf19e631e88e4e08b13bf2f99de6bd926ca91d9485ec6a8a20864746d1` | Records `status=binary64_lipschitz_root_tube_certificate_ready_for_directed_rounding`, 12 candidate root tubes, disjoint tube ordering, complement `[0,0]` binary64 evidence, and `proof_grade_ready=false`; superseded by the interval certificate for topology. |
| `fresh_v10_higher_fold_root_tube_certificate.v0.md` | `accepted` as priority-only root-tube certificate-attempt report | `fa70fe9b3797303a9e46de45a5408d81a43227ffa8c875da8ffafec9d9ac46c6` | Documents the binary64 root-tube and complement margins as an audit surface; the proof-grade topology result belongs to the outward-rational interval certificate. |
| `fresh-v10-higher-fold-root-tube-interval-certificate.mjs` | `accepted` as outward-rational interval root-count certificate generator | `091852cb2a3636cde3fa812626af69039e732b0efd03294e56877a9889aefec4` | Deterministically evaluates the same 12 root tubes and 13 complement intervals with exact rational JSON-token intake and outward rational trigonometric interval enclosures. |
| `fresh_v10_higher_fold_root_tube_interval_certificate.v0.json` | `accepted` as proof-grade root-count topology certificate | `1a69d9ad8da4df4fbf63e2bef706da62b878bf86be22a1c1c9805bbc487eb365` | Records `status=outward_rational_interval_12_root_certificate_passed`, 12 one-root tube certificates, 13 no-extra-root complement certificates, total root count bound `12..12`, minimum root derivative floor `20.353739080283133119`, and minimum complement residual margin `0.023248692491025871`. |
| `fresh_v10_higher_fold_root_tube_interval_certificate.v0.md` | `accepted` as priority-only root-count interval report | `8eebda612c18a3f9ee410c36620adbbcc38f170d4e08b1c716f0194ca60b4815` | Documents the proof-grade root-count topology certificate and authorizes proof-interval preledger work under `fresh-v10-higher-fold-12-root-rebuild-v0`; no live ledger or branch chart is authorized. |
| `fresh-v10-higher-fold-proof-interval-preledger-v1.mjs` | `accepted` as higher-fold proof-interval v1 generator | `56a74a06837435adcf67b9031b3916953d25b4cd634bc2cd283b611951b55ace` | Deterministically emits the higher-fold proof-interval v1 backend, sidecar ledger, report, and engine audit by exact-rational JSON-token intake and a coarse direct-path $t\pm X$ range bound. |
| `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json` | `accepted` partial backend certificate | `95819f48a0ff76f5926fcf712e77028aadf7900df76f8eca41bbf192d7eef300` | Records the higher-fold direct-path $X$ envelope $|X_{\mathrm{seed}}(\theta)|\le 2.274365144724375$ and binds the 12-root interval topology certificate as an input. |
| `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json` | `fail-closed` higher-fold proof-interval v1 sidecar | `07cfa6c3766d346cdd6a04151f47dacf48ed252cb82e68e3b0bce3bd6d9cf206` | `status=higher_fold_proof_interval_v1_xbound_sidecar_branch_chart_blocked`; certifies 270 exact-rational coarse range-empty rows, leaves 980 rows `split_required`, and keeps `preledger_pass=false` and `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.md` | `fail-closed` higher-fold proof-interval v1 report | `fd75fe17c6268d5f5208741894fbf7470157435ec49a27964aca5d85d88716fb` | Reports 270 accepted range-empty rows, 980 split-required rows, failure-family counts 678 fold-layer-candidate contacts, 252 row-specific certificate rows, and 50 same-interval diagonal or endpoint rows. |
| `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json` | `diagnostic` higher-fold proof-interval v1 engine audit | `d64f65d1f0ff3edb19a70e649bb147ae079707334d066f54dd06408eb15ee5e5` | Confirms exact BigInt rational endpoints, no binary64 endpoint use, and no simple-root, diagonal, fold-layer, live-ledger, or branch-chart authorization. |
| `fresh-v10-higher-fold-proof-interval-preledger-v2.mjs` | `accepted` as higher-fold proof-interval v2 generator | `46ca5e0a37ed45508b7cf7682f336af331ee48e809bc4ab84d798f53717fcc26` | Deterministically emits the higher-fold proof-interval v2 backend, sidecar ledger, report, and engine audit by exact-rational JSON-token intake and row-specific trigonometric null-coordinate range enclosures. |
| `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json` | `accepted` partial backend certificate | `1f84bc79082bf87bd7d2ca532a4b498ece3c75c1a1e6855de7d58f66a30a8b9a` | Records the higher-fold row-specific trigonometric range method, source hashes, numeric intake policy, rational $\pi$ bracket, Taylor remainder rule, and direct-path $X_{\mathrm{seed}}$ basis definition. |
| `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json` | `fail-closed` higher-fold proof-interval v2 sidecar | `00dbbc47538762d10a912d69763bb78dad55679fcff0929072e6fcf3ba16f76c` | `status=higher_fold_proof_interval_v2_trig_range_sidecar_branch_chart_blocked`; certifies 1,062 exact-rational row-specific trigonometric range-empty rows, leaves 188 rows `split_required`, and keeps `preledger_pass=false` and `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.md` | `fail-closed` higher-fold proof-interval v2 report | `16cd0363fc50bc30252bdd09f51103614066ed02e4deb3fd639a32908fc1c576` | Reports 1,062 accepted range-empty rows, 188 split-required rows, failure-family counts 112 fold-layer-candidate contacts, 50 simple-root/complement rows, and 26 same-interval diagonal or endpoint rows. |
| `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json` | `diagnostic` higher-fold proof-interval v2 engine audit | `68ae125ed0e0887f93908f3aa6907a8839ec1433629fd9814f1aefa1fb19e0fc` | Confirms exact BigInt rational endpoints, no binary64 endpoint use for certified rows, row-specific trigonometric range enclosures for range-empty rows, and no simple-root, diagonal, fold-layer, live-ledger, or branch-chart authorization. |
| `fresh-v10-higher-fold-proof-interval-preledger-v3.mjs` | `accepted` as higher-fold proof-interval v3 generator | `29d4c4b2415bc1b564abc16179e186916be4bc510d626a52e813c1a2a29dd56b` | Deterministically emits the higher-fold proof-interval v3 backend, sidecar ledger, report, and engine audit by reusing v2 range enclosures and adding root-count-complement monotone diagonal exclusions. |
| `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.json` | `accepted` partial backend certificate | `b17fe158041173644cde2135eba903ecce269c37f4363d88c5fa8ae4dc1cfffb` | Records the v3 exact-rational intake, row-specific trigonometric range method, root-count complement diagonal policy, source hashes, numeric intake policy, and no branch-chart authorization. |
| `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.json` | `fail-closed` higher-fold proof-interval v3 sidecar | `09c021be2aca34ba663d01d87861928ce9902fc482cbe2432db38da23004f72a` | `status=higher_fold_proof_interval_v3_trig_range_root_complement_diagonal_sidecar_branch_chart_blocked`; certifies 1,062 range-empty rows plus 26 root-complement monotone diagonal exclusions, leaves 162 rows `split_required`, and keeps `preledger_pass=false` and `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.md` | `fail-closed` higher-fold proof-interval v3 report | `44833051e12302b7fe7c81230ef71a875a266feba8e36c5051d9ad4381a20be7` | Reports 1,088 accepted empty rows, including 26 diagonal exclusions, 162 split-required rows, failure-family counts 112 fold-layer-candidate contacts and 50 simple-root/complement rows, and no branch-chart authorization. |
| `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.json` | `diagnostic` higher-fold proof-interval v3 engine audit | `60bb6e285a3b0b6891ee16d34e48dd5e7ab33883a24941f6d4fb9d70e0ae6c23` | Confirms exact BigInt rational endpoints, no binary64 endpoint use for certified rows, root-count complement derivative floors for same-interval diagonal rows, and no simple-root, fold-layer, live-ledger, or branch-chart authorization. |
| `fresh-v10-higher-fold-proof-interval-preledger-v4.mjs` | `accepted` as higher-fold proof-interval v4 generator | `99b008d41c767aec4cbc8affe690a2acc9f7995bcefc023329c9fc14f92a3b46` | Deterministically emits the higher-fold proof-interval v4 backend, sidecar ledger, report, and engine audit by reusing v3 accepted empty rows and adding root-complement monotone simple-root receiver-subwindow certificates. |
| `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.json` | `accepted` partial backend certificate | `7ee76e3cee7687edfffa1b4f2c49adbf301fa8dd7530a2d73268deab84470530` | Records the v4 exact-rational intake, row-specific trigonometric range method, root-count complement diagonal policy, simple-root receiver-subwindow policy, source hashes, numeric intake policy, and no branch-chart authorization. |
| `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.json` | `fail-closed` higher-fold proof-interval v4 sidecar | `d0d4c75eaa588e048886a312a4d4aa8a7c1d70a241374134d30ea8bdc9804aa3` | `status=higher_fold_proof_interval_v4_trig_range_root_complement_diagonal_simple_root_sidecar_branch_chart_blocked`; records 42 simple-root receiver subwindow certificates, consumes 0 parent simple-root rows, leaves 162 rows `split_required`, and keeps `preledger_pass=false` and `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.md` | `fail-closed` higher-fold proof-interval v4 report | `205352ca5984c95dbfec2bb40d54cf345d95ecf2c822842e065f2a333859c5d4` | Reports 1,088 accepted empty rows, 42 simple-root receiver subwindow certificates, 162 split-required base rows split across 42 parent complement-coverage rows, 8 periodic endpoint/complement rows, and 112 fold-layer rows, and no branch-chart authorization. |
| `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.json` | `diagnostic` higher-fold proof-interval v4 engine audit | `30de452674c7bcd5cabb9516fa8be96de0c848efe72604deb1abc4d8dfa416cf` | Confirms exact BigInt rational endpoints, no binary64 endpoint use for certified rows, root-count complement derivative floors for diagonal and simple-root subwindow rows, and no parent-complement, fold-layer, live-ledger, or branch-chart authorization. |
| `fresh-v10-higher-fold-proof-interval-preledger-v5.mjs` | `accepted` as higher-fold proof-interval v5 generator | `686378938c4762935bbd17dd6b55cb935f117e255ffa373744da99cb4397b8ba` | Deterministically emits the higher-fold proof-interval v5 backend, sidecar ledger, report, and engine audit by importing v4 and adding a fail-closed 32-cell receiver-grid cover audit for the 42 regular residual parent rows. |
| `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.json` | `accepted` partial backend certificate | `4fab852a01302a8daa5a9031640ec5f85d96415982ee5f964c3a48cfc5a101f4` | Records the v5 exact-rational intake, row-specific trigonometric range method, root-count complement diagonal/simple-root policy, receiver-grid cover audit policy, source hashes, numeric intake policy, and no branch-chart authorization. |
| `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.json` | `fail-closed` higher-fold proof-interval v5 sidecar | `9464748bc4bda95b4f8a04e2bdae4e0b34dbd7062aa3bc3479cfe8b9b0b53dea` | `status=higher_fold_proof_interval_v5_trig_range_diagonal_simple_root_receiver_cover_sidecar_branch_chart_blocked`; audits 42 regular residual parent rows, certifies 571 simple-root receiver-grid cells, misses 773 cells, consumes 0 parent rows, leaves 162 rows `split_required`, and keeps `preledger_pass=false` and `branch_chart_authorized=false`. |
| `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.md` | `fail-closed` higher-fold proof-interval v5 report | `b32715f46adf4cf912b4cafe0325013c3b6c634470d58746c06c4e9d01862201` | Reports 1,088 accepted empty rows, 42 simple-root receiver subwindow certificates, 571 receiver-cover cells, 773 missing cover cells, 162 split-required base rows, and no branch-chart authorization. |
| `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.json` | `diagnostic` higher-fold proof-interval v5 engine audit | `777b8b0508a333dcbcf615ac32809857f85053cd25c48400a493562b8daa10ae` | Confirms exact BigInt rational endpoints, no binary64 endpoint use for certified rows, root-count complement derivative floors for diagonal/simple-root receiver-cover cells, and no endpoint ownership, fold-layer, live-ledger, or branch-chart authorization. |
| `fresh-preledger-blocker-anatomy.mjs` | `accepted` as blocker-anatomy generator | `c1337bfa408899922ac1f5032656d25c031ca4040814a01a43264ef8222f02d3` | Deterministically classifies the 34 fresh `split_required` rows into proof burdens and emits the anatomy plus fold-layer burden sidecars; it does not accept rows. |
| `fresh_preledger_blocker_anatomy.fresh-same-packet-fold-shear-seed-v0.json` | `diagnostic` blocker anatomy | `1fa08ed4283a0c22b30a371a9a6473732af0dd3d091160ee7322cc6f02516e10` | Classifies the 34 blockers as 16 fold-layer certificate rows, 6 regular parent root-candidate overlaps, 10 endpoint/seam or inactive-fold-neighborhood contacts, and 2 nonmonotone diagonal contacts. |
| `fresh_preledger_blocker_anatomy_report.fresh-same-packet-fold-shear-seed-v0.md` | `diagnostic` blocker-anatomy report | `99c73407b90ac45a279f18d74cc1ef50af93981d3c2255481b18ae6034c6e603` | Records the row-family proof burdens and keeps all branch-chart authorization flags false. |
| `fold_layer_burden.fresh-same-packet-fold-shear-seed-v0.json` | `diagnostic` fresh fold-layer burden | `7948ad914455d0303d9b97e7d4a176766579458949060cf91c202af48965b1bf` | Groups the 16 fresh fold-layer rows by $\Sigma_1,\ldots,\Sigma_4$ and lists same-packet fields required before any row can become `fold_layer`. |
| `fold_layer_burden_report.fresh-same-packet-fold-shear-seed-v0.md` | `diagnostic` fresh fold-layer burden report | `679952b2a9492f75d1d7323f51f94878985024b8ccb388a7fc13e208b5de5715` | States that historical cosine fold artifacts are template-only for the fresh packet and that fold rows must not be rewritten as `simple_root`. |
| `aaa_corpus_recommendation_handoff.md` | `accepted` as promoted corpus handoff | `82369034df58a41b6983edf1a5042fd788ff55b9ebe791ac1b60ccf25a0b6408` | Records that scoped $\mathbb{A}\mathbb{A}\mathbb{A}$ updates promoted the null-coordinate pre-ledger as a candidate-falsification gate while keeping detailed rejected-packet data priority-only. |
| `regular_boundary_user_facing_recommendation.md` | `accepted` as user-facing corpus recommendation | `b7e4f09b90463fd04cf6726b5b3c03cbc8d468c5aa883d9d1b4928f560b34a26` | Recommends no named regular-boundary theorem in $\mathbb{A}\mathbb{A}\mathbb{A}$ now; the current generic same-packet complement predicate is sufficient until a same-packet inclusion/domination theorem exists. |
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
| `branch_chart.json` | `absent` | Blocked by rejected/fail-closed fresh preledger attempts; neither the diagnostic input screen, the binary64 range-empty pass, proof-interval-v1, proof-interval-v2, proof-interval-v3, proof-interval-v4, proof-interval-v5, proof-interval-v6, proof-interval-v7, proof-interval-v8, proof-interval-v9, nor proof-interval-v10 authorizes a branch chart. |
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
| Seed-chart gate 2: null-coordinate pre-ledger | `fail-closed` | `causal_ledger.fresh-same-packet-fold-shear-seed-v0.json`, `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.md`, `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v1.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v2.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v3.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v3.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v4.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v4.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v5.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v5.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v6.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v6.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v7.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v7.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v8.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v8.json`, `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v9.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v9.json`, `fresh_preledger_blocker_anatomy.fresh-same-packet-fold-shear-seed-v0.json`, and `fold_layer_burden.fresh-same-packet-fold-shear-seed-v0.json`; binary64 sidecar: 162 rows, 128 empty rows accepted by that pass, 34 `split_required` rows; proof-interval-v1 sidecar: 70 exact-rational coarse range-empty rows and 92 `split_required` rows; proof-interval-v2 sidecar: 116 exact-rational row-specific trig range-empty rows and 46 `split_required` rows; proof-interval-v3 sidecar: 116 exact-rational row-specific trig range-empty rows plus 8 monotone diagonal exclusions and 38 `split_required` rows; proof-interval-v4 sidecar: same 124 accepted empty rows plus 6 recorded simple-root subrow certificates while parent rows remain split-required; proof-interval-v5 sidecar: same accepted row subset plus 10 receiver-side parent-complement probes, 0 strict-empty complement acceptances, and 0 consumed simple-root parent rows; proof-interval-v6 sidecar: same accepted row subset plus 10 ownership/coverage probes, 0 endpoint/topology-owned strips, 0 exact fold-family-covered strips, 0 regular-boundary-covered strips, and 0 consumed simple-root parent rows; proof-interval-v7 sidecar: same accepted row subset plus 10 same-packet ownership-data candidate records, 10 finite candidate regular-boundary cores, 16 fold-layer burden rows considered, 0 endpoint contact tables, 0 accepted complement strips, and 0 consumed simple-root parent rows; proof-interval-v8 sidecar: same accepted row subset plus 4 finite candidate regular-boundary families, 20 candidate membership edges, 0 certified separator assignments, 0 inclusion proofs, 0 fresh domination inequalities, 0 topology/no-double-counting certificates, 0 non-core complement closures, and 0 consumed simple-root parent rows; proof-interval-v9 sidecar: same accepted row subset plus a current-field selector audit over those 10 cores, 10 ambiguous two-separator cores, 0 accepted separator assignments, 20 rejected side/order heuristic assignments, 0 accepted complement strips, and 0 consumed simple-root parent rows; all sidecars record `branch_chart_authorized=false`. Historical rejected evidence remains in `causal_ledger.json` and `causal_preledger_interval_report.md` for the old cosine packet only. | The binary64 attempt is not an MPFR/Arb formal interval certificate; proof-interval-v1 is exact-rational but deliberately coarse; proof-interval-v2 adds certified row-specific trigonometric range enclosures; proof-interval-v3 adds certified derivative enclosures for regular same-interval diagonal rows; proof-interval-v4 adds oriented source-inner simple-root subwindow certificates; proof-interval-v5 shows strict range-empty parent-complement consumption fails on all 10 probed receiver-side complement strips; proof-interval-v6 shows the current same-packet data also lacks accepted endpoint/topology ownership, exact fold-family coverage, and regular-boundary coverage for those 10 strips; proof-interval-v7 constructs the finite candidate regular-boundary core table but still lacks endpoint contact tables, accepted same-packet fold-layer exact membership, regular-boundary inclusion/domination, topology/no-double-counting, and non-core complement closure; proof-interval-v8 constructs a formal finite candidate-family inventory but still lacks single separator assignment, same-packet inclusion, fresh domination, topology/no-double-counting, and non-core complement closure; proof-interval-v9 proves that current fields cannot supply a separator assignment because every imported core has two candidate separators and no accepted selector. Exact blockers are anatomized as 16 active fold-layer certificate rows, 6 regular parent root-candidate overlaps, 10 structural endpoint/seam or inactive-fold-neighborhood contacts, and 2 nonmonotone diagonal contacts in the binary64 sidecar; v9 leaves 38 parent rows unresolved because simple-root complements require proof-grade same-packet ownership or coverage data, seam endpoint ownership, inactive fold-neighborhood contacts, fold-interval diagonal locks, and fold-layer rows. No live `causal_ledger.json` rewrite, branch-chart construction, or Schauder promotion is authorized until every fresh row is accepted as empty, simple_root, or fold_layer with no unresolved parent complement. |
| Sidecar diagnostic: regular-boundary topology/no-double-counting | `fail-closed` | `causal_ledger.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json`, `preledger_interval_backend_certificate.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json`, `causal_preledger_interval_report.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.md`, and `preledger_interval_engine_audit.fresh-same-packet-fold-shear-seed-v0.proof-interval-v10.json`; proof-interval-v10 imports the v9 residual inventory, tests 5 topology/no-double-counting methods over 10 cores, records 50 failed method evaluations, certifies 0 topology/no-double-counting certificates, accepts 0 complement strips, consumes 0 simple-root parent rows, leaves 38 parent rows `split_required`, and records `branch_chart_authorized=false`. | Current fields cannot certify regular-boundary topology/no-double-counting because the packet lacks explicit topology fields, complement-boundary ownership for residual cores, simple-root branch-reuse exclusions, endpoint-excluded complement disjointness, and fold-layer nonexpansion certificates. The fresh domination route is deferred. The selected next route is to repair or replace the successor candidate so the 10 complement collars have certified positive strict gaps. |
| Sidecar diagnostic: fresh v10 strict-gap local shear | `diagnostic` | `fresh-v10-strict-gap-matrix-builder.mjs`, `gap_opening_fresh_v10_strict_gap_input.local_shear_free_period.v0.json`, `gap_opening_fresh_v10_strict_gap_result.local_shear_free_period.v0.json`, and `gap_opening_fresh_v10_strict_gap_report.local_shear_free_period.v0.md`; the free-period declared matrix imports the 10 v10 collars, uses the existing $A_0,A_1,A_2$ half-period-antisymmetric $C^1$ basis plus $b_T$, and returns `status=feasible` with `min_gap_value_after_required_margin=0.115066037632`. | This is a repair-direction success marker, not a row acceptance. The full structural Jacobian is absent, endpoint extrema are not outward-rounded interval bounds, and branch-chart construction remains blocked. The next solver should keep period/phase freedom or enlarge the fixed-period basis before rerunning the proof-interval pre-ledger. |
| Sidecar diagnostic: fresh v10 strict-gap finite integration | `diagnostic-obstructed` | `fresh-v10-strict-gap-finite-integration-audit.mjs`, `fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.json`, and `fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.md`; the direct finite path reaches the strict-gap nonnegative threshold at $\lambda_{\min}=0.685286902752066$, controlled by `C_u_A4_A2_left_v10_7`, with 20 field-speed crossings there and 24 crossings at $\lambda=1$. | Direct finite integration of the free-period local-shear witness is not promotable under `doubled_four_arc_generic`. The next repair must either preserve the four field-speed separators as hard constraints or deliberately reopen the packet identity around a higher-fold itinerary before any pre-ledger rerun. |
| Sidecar diagnostic: shifted-separator strict-gap finite integration | `diagnostic-obstructed` | `fresh-v10-shifted-separator-strict-gap-matrix-builder.mjs`, `gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`, `gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json`, `fresh-v10-shifted-separator-finite-integration-audit.mjs`, `fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.json`, and `fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.md`; the shifted basis returns `status=feasible` with `min_gap_value_after_required_margin=0.484518823372`, but the direct finite path reaches 12 field-speed roots at $\lambda_{\min}=0.264833953926991$. | The shifted basis is the best current solver basis signal, but not a direct repair. The next repair should solve finite strict-gap and field-speed-itinerary inequalities together before any proof-interval pre-ledger rerun. |
| Sidecar diagnostic: bounded shifted-separator finite-itinerary screen | `diagnostic-obstructed` | `fresh-v10-finite-itinerary-strict-gap-screen.py`, `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.json`, and `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.md`; the sampled LP uses 810 sampled collar inequalities and 1,940 retained field-speed sign guards, and returns $\gamma_{\mathrm{sample}}=-0.204126631574676$. | The three-coordinate shifted basis is closed as a same-itinerary finite repair route. Later split-two and Hermite screens are the stronger same-itinerary follow-up evidence. |
| Sidecar diagnostic: split-two shifted-separator finite-itinerary screen | `diagnostic-obstructed` | `fresh-v10-shifted-separator-split-matrix-builder.py`, `gap_opening_fresh_v10_strict_gap_input.shifted_separator_split2_fixed_period.v0.json`, `fresh-v10-finite-itinerary-strict-gap-screen.py`, `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator_split2.v0.json`, and `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator_split2.v0.md`; the sampled LP uses six split subarc coefficients and returns $\gamma_{\mathrm{sample}}=-0.207816886605516$. | The smallest richer shifted same-itinerary basis also fails the sampled finite repair screen. The Hermite boundary screen is the stronger same-itinerary enrichment result. |
| Sidecar diagnostic: Hermite same-itinerary boundary screen | `diagnostic-obstructed` | `fresh-v10-hermite-itinerary-gap-boundary-screen.py`, `fresh_v10_hermite_itinerary_gap_boundary_screen.v0.json`, and `fresh_v10_hermite_itinerary_gap_boundary_screen.v0.md`; the sampled LP uses anti-periodic cubic Hermite nodal values and derivatives through 270 nodes and 541 LP variables, 810 sampled collar inequalities, and 1,940 retained field-speed sign guards, and returns best margin $\gamma_{\mathrm{sample}}=-2.20865857936394\times 10^{-10}$. | The richer Hermite same-itinerary family reaches the sampled boundary from below but does not open positive margin. Continuing on the current itinerary now requires an interval dual obstruction or genuinely different structural ansatz; otherwise explicitly reopen the packet identity around a higher-fold itinerary before any proof-interval pre-ledger rerun. |
| Sidecar diagnostic: Hermite row-only numerical dual obstruction | `diagnostic-obstructed` | `fresh-v10-hermite-dual-obstruction.py`, `fresh_v10_hermite_dual_obstruction.v0.json`, and `fresh_v10_hermite_dual_obstruction.v0.md`; the tested half-grid 256 solve has row-only primal $\gamma=-2.20865953292879\times 10^{-10}$, row-only dual upper bound $-2.20865936650938\times 10^{-10}$, residual allowance $3.72735941171401\times 10^{-15}$, and residual-adjusted upper bound $\gamma\leq -2.20862209291526\times 10^{-10}$. | The numerical dual supplies the active obstruction anatomy for the Hermite same-itinerary family, but it is not proof-grade because the active rows and residual audit are still floating-point. The rationalization audit is the stronger multiplier-side follow-up. |
| Sidecar diagnostic: Hermite exact-rational multiplier audit | `diagnostic-obstructed` | `fresh-v10-hermite-dual-rationalization-audit.py`, `fresh_v10_hermite_dual_rationalization_audit.v0.json`, and `fresh_v10_hermite_dual_rationalization_audit.v0.md`; denominator cap $10^9$ rationalizes all 23 active half-grid-256 multipliers and gives binary64-row residual-adjusted upper bound $\gamma\leq -2.20860276388005\times 10^{-10}$. | Multiplier exactness is not the active same-itinerary blocker. The follow-up active-row interval backend closes the declared finite sampled row system at proof grade, and the continuous-collar lift closes the same-itinerary no-go by active sample-subset inclusion. |
| Sidecar obstruction: Hermite active-row interval backend | `sampled-obstruction-closed` | `fresh-v10-hermite-active-row-interval-backend.mjs`, `fresh_v10_hermite_active_row_interval_backend.v0.json`, and `fresh_v10_hermite_active_row_interval_backend.v0.md`; the active-row certificate has objective interval $[-2.21428231006974\times 10^{-10},-2.20546406841486\times 10^{-10}]$, residual allowance $4.6889309839\times 10^{-14}$, and adjusted upper interval $\gamma\leq -2.20499517531647\times 10^{-10}$. | This closes the declared finite sampled Hermite row system at proof grade, but it does not prove continuous-in-collar inequalities between samples, accept a repaired candidate, pass the proof-interval preledger, update a live ledger, or authorize a branch chart. |
| Sidecar obstruction: Hermite continuous-collar lift | `same-itinerary-hermite-route-closed` | `fresh-v10-hermite-continuous-collar-lift.mjs`, `fresh_v10_hermite_continuous_collar_lift.v0.json`, and `fresh_v10_hermite_continuous_collar_lift.v0.md`; all 5 active gap rows and all 18 active speed rows are embedded in the declared continuous target, inheriting $\gamma\leq -2.20499517531647\times 10^{-10}$ by sample-subset inclusion. | This closes the generic same-itinerary Hermite obstruction route without proving between-sample variation bounds. A moving-row variation budget would be needed for a constructive positive candidate, not for this no-go. |
| Sidecar diagnostic: period-coupled Hermite structural screen | `diagnostic-obstructed` | `fresh-v10-period-coupled-hermite-itinerary-screen.py`, `fresh_v10_period_coupled_hermite_itinerary_screen.v0.json`, and `fresh_v10_period_coupled_hermite_itinerary_screen.v0.md`; the sampled LP adds $b_T$, imposes $H'(\sigma_i)-v_i b_T=0$, and returns best $\gamma_{\mathrm{sample}}=-2.20865843237662\times 10^{-10}$. | Period coupling and separator speed-contact locks do not produce a positive same-itinerary sampled repair. |
| Sidecar diagnostic: velocity-Bernstein structural screen | `diagnostic-obstructed` | `fresh-v10-velocity-bernstein-itinerary-screen.py`, `fresh_v10_velocity_bernstein_itinerary_screen.v0.json`, and `fresh_v10_velocity_bernstein_itinerary_screen.v0.md`; the sampled LP hard-codes fixed-separator field-speed sign corridors by Bernstein control bounds and returns best degree-31 $\gamma_{\mathrm{sample}}=-0.0126050167182319$. | The bounded fixed-separator velocity-corridor route does not produce a positive same-itinerary sampled repair. Remaining constructive same-itinerary work would need nonlinear fold-coordinate collocation rather than another bounded linear screen. |
| Decision packet: fresh v10 itinerary and structural route | `priority-decision` | `fresh_v10_itinerary_structural_decision_packet.md`; Option A is proof-grade intervalization plus sample-subset lift of the active Hermite dual rows, Option B now includes period-coupled Hermite and velocity-Bernstein structural no-go screens, and Option C is a higher-fold itinerary rebuild. | Option A is closed for this generic same-itinerary Hermite route, and bounded Option B screens are obstructed. The live decision boundary is nonlinear fold-coordinate collocation versus higher-fold residual parent-complement, endpoint/complement, and same-packet fold-layer certification using the source-cover defect and fold-layer burden atlases. |
| Sidecar certificate: higher-fold root-count topology | `root-count-topology-certified` | `fresh-v10-higher-fold-root-tube-interval-certificate.mjs`, `fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`, and `fresh_v10_higher_fold_root_tube_interval_certificate.v0.md`; the interval certificate proves one root in each of 12 tubes, no extra roots on 13 complements, and total root count bound `12..12` for `fresh-v10-higher-fold-12-root-rebuild-v0`. | This closes the root-count topology gate only. It authorizes proof-interval preledger work under the higher-fold packet identity, but it does not consume null-coordinate rows, update a live ledger, or authorize branch-chart construction. |
| Sidecar certificate: higher-fold proof-interval v1 | `fail-closed` | `fresh-v10-higher-fold-proof-interval-preledger-v1.mjs`, `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json`, and `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.md`; the sidecar certifies 270 exact-rational coarse range-empty rows and leaves 980 rows `split_required`. | This starts higher-fold preledger classification and blocks branch-chart work. The v2 sidecar supersedes it as the live row-specific range-empty closure surface. |
| Sidecar certificate: higher-fold proof-interval v2 | `fail-closed` | `fresh-v10-higher-fold-proof-interval-preledger-v2.mjs`, `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json`, and `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.md`; the sidecar certifies 1,062 exact-rational row-specific trigonometric range-empty rows and leaves 188 rows `split_required`. | Superseded by the v3 root-complement monotone diagonal sidecar as the live higher-fold residual surface. |
| Sidecar certificate: higher-fold proof-interval v3 | `fail-closed` | `fresh-v10-higher-fold-proof-interval-preledger-v3.mjs`, `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.json`, and `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.md`; the sidecar certifies 1,062 exact-rational row-specific trigonometric range-empty rows plus 26 root-complement monotone diagonal exclusions and leaves 162 rows `split_required`. | Superseded by the v4 simple-root receiver-subwindow sidecar as the live higher-fold residual surface. |
| Sidecar certificate: higher-fold proof-interval v4 | `fail-closed` | `fresh-v10-higher-fold-proof-interval-preledger-v4.mjs`, `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.json`, and `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.md`; the sidecar records 42 proof-grade simple-root receiver subwindow certificates, consumes 0 parent simple-root rows, and leaves 162 rows `split_required`. | Superseded by the v5 receiver-cover audit sidecar as the live higher-fold residual surface. |
| Sidecar certificate: higher-fold proof-interval v5 | `fail-closed` | `fresh-v10-higher-fold-proof-interval-preledger-v5.mjs`, `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.json`, and `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.md`; the sidecar audits 42 regular residual parent rows, certifies 571 proof-grade simple-root receiver cells, misses 773 cells, consumes 0 parent rows, and leaves 162 rows `split_required`. | Superseded by the v6 adaptive receiver-cover audit sidecar as the live higher-fold regular residual surface. |
| Sidecar certificate: higher-fold proof-interval v6 | `fail-closed` | `fresh-v10-higher-fold-proof-interval-preledger-v6.mjs`, `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`, `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`, `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`, and `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`; script hash `d4fee72fd0e1d47e6f2ce11a1b24851d732cfe6554e7111e8914b613a1af3687`, backend hash `f24318dcd26ad10e851e7e6139aa54563aa3210a27e52e3c4da7d7dd85ef6891`, ledger hash `0d774bb9e3e664d6749ef120a5805a4eeef7b19fdf412432201ea49a2b96f4a5`, report hash `08c13482d2f3e8c6c681b405bebd11f8ee4d20d92dd2d498cc46eaf352a7bd3c`, audit hash `5301a1116462592a4fbe7754a0e7a177aaa5af0ae3a0579c30254091e0480160`; the sidecar adaptively refines the 773 failed v5 receiver cells to terminal grid 128, certifies 622 proof-grade simple-root receiver leaves, records 3,024 structural terminal source-cover misses, resolves 0 coarse cells, consumes 0 parent rows, and leaves 162 rows `split_required`. | This is the current higher-fold preledger surface. The 42 regular residual rows are not closed by coarse-grid refinement under the current full-source rule. The next preledger actions are a new source-cover/parent-complement theorem or candidate change, periodic endpoint/complement ownership for 8 rows, and fold-layer certification for 112 rows; no branch chart is authorized. |
| Sidecar diagnostic: higher-fold source-cover defect atlas | `priority-only` | `fresh-v10-higher-fold-source-cover-defect-atlas.mjs`, `source_cover_defect_atlas.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`, and `source_cover_defect_atlas_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`; script hash `3b96b98bdb0597eb7d09abfa40e3e6a5cb370396058ebd36727a90c7a7a021bf`, JSON hash `71acd423e49347c930c978976eca3d6fcd38475840f03daf572a36bc0c2b373d`, report hash `916d1be74f08ae19fb97f2397d667dfc742ba24ac23d8fb526b41dc0d8375df2`; the atlas records the exact rational boundary burdens for the 42 regular residual rows: 1,207 low-side and 1,817 high-side terminal source-cover defects, 10 low-only rows, 10 high-only rows, 22 two-sided rows, and 0 receiver-interior missing leaves. | It consumes 0 rows, keeps `branch_chart_authorized=false`, and turns the regular parent-complement part of the remaining burden into a finite boundary-ownership or boundary-movement worklist. The next regular-row action is a proof-grade same-packet source-cover/parent-complement theorem, receiver-contraction theorem, endpoint/topology ownership theorem, or candidate change meeting these exact boundary-attached burdens. |
| `source_cover_boundary_ownership_certificate_target.md` | `accepted` as priority-only certificate target | `044632090ca927a0390214ad688607843ac8eab11ba01d732755bf2a014073be` | Converts the source-cover defect atlas, boundary ownership audit, one-leaf boundary movement probe, one-leaf source-boundary theorem attempt, one-leaf receiver contraction theorem attempt, one-leaf candidate-change boundary-data constructor, direct-path lambda shift screen, `lambda=0.305` row-blocked replay, the one-leaf fold-coordinate candidate-change theorem attempt, the fold-coordinate promotion audit, the fold-coordinate materialization audit, the fold-coordinate history-realization contract, the fold-coordinate history-realization theorem attempt, the fold-coordinate finite-realization basis attempt, the endpoint-functional source audit, endpoint-functional construction attempt, endpoint-functional binding no-go, endpoint-functional domain/evaluation-map attempt, endpoint-functional domain/evaluation-map contract, endpoint-functional $C^1$ endpoint-basis ansatz attempt, and endpoint-functional explicit $\Psi_j$ formula attempt into a finite 42-row boundary ownership closure lemma: every regular parent row needs an exact rational receiver partition, owned boundary-attached terminal spans, strict source-boundary movement or receiver-range contraction or topology/endpoint ownership, memory margins, branch-reuse exclusion, and non-owned complement closure before any `simple_root` parent consumption. |
| Sidecar diagnostic: higher-fold source-cover boundary ownership audit | `priority-only` | `fresh-v10-higher-fold-source-cover-boundary-ownership-audit.mjs`, `source_cover_boundary_ownership_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`, and `source_cover_boundary_ownership_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`; script hash `ccb67adb8b39e13db5f615c29f7d06f1f9c0c50ac3240f040da638ad82479255`, JSON hash `779de21e7d809940a94341a45176a5b45f0f4c5c0529b88cb46d002a2ab53ef6`, report hash `fc6ab9775eca83fbf0f36644e9ce62c36f279ac5b5d2bf9bcfd6f1f8c4219106`; the audit proves 42 / 42 complete terminal-grid receiver partitions, records 2,352 certified terminal leaves and 3,024 boundary terminal leaves across 64 boundary components, and certifies 0 rows against the full boundary-ownership pass rule. | It consumes 0 rows, keeps `branch_chart_authorized=false`, and isolates the remaining regular-row blocker to the absent ownership fields: terminal spans are partitioned, but source-boundary movement, receiver-range contraction, endpoint/topology ownership, no-double-counting, branch-reuse exclusion, and non-owned complement closure are not certified. |
| Sidecar diagnostic: higher-fold one-leaf boundary movement probe | `priority-only` | `fresh-v10-higher-fold-one-leaf-boundary-movement-probe.mjs`, `one_leaf_boundary_movement_probe.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`, and `one_leaf_boundary_movement_probe_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`; script hash `1a146f88786b56f9f48890c8e45a701147f5df5b02e1213fbafea62549a836b8`, JSON hash `8f3d773cce8b8709cc8d28352525835d7937e7a1182510e5e998ca0ff56b7438`, report hash `d4a88aaa2555a8f5ff0330d0bddd91b1189b4aca888de9d0378957cdfabea52a`; the probe audits `R_w_A04_A03`, `R_u_A10_A09`, and `R_u_A07_A06`, records strict thresholds `0.000026691996524`, `0.000026691996524`, and `0.00024618430271`, and certifies 0 source-boundary movement rows, 0 receiver-range contraction rows, and 0 full pass-rule rows. | It consumes 0 rows, keeps `branch_chart_authorized=false`, and shows the smallest regular-row blocker is an absent same-packet movement/contraction theorem plus all-owned memory margins, endpoint ownership/no-double-counting, branch-reuse exclusion, and non-owned-complement closure. |
| Sidecar diagnostic: higher-fold one-leaf source-boundary movement theorem attempt | `priority-only` | `fresh-v10-higher-fold-one-leaf-source-boundary-movement-theorem.mjs`, `one_leaf_source_boundary_movement_theorem.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`, and `one_leaf_source_boundary_movement_theorem_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`; script hash `511514cc8be306862278c6714d534c41cb0686f7e857db6d8ea2ea2ef2a1cae0`, JSON hash `da7d865cb72b1c78ff2ef8e2669fd8584af8bce9a8072b35b8ea3b2b8e9b3dcf`, report hash `d7a3864058dfd76ba983cd83d3db8e12a883f4c66bf617438ea362125839f59f`; the attempt verifies 3 / 3 strict threshold identities but certifies 0 same-packet source-boundary movement rows, 0 endpoint-tightening certificates, and 0 movement-preservation rows. | It consumes 0 rows, keeps `branch_chart_authorized=false`, and shows the source-boundary route needs an actual same-packet source variation or endpoint-tightening theorem before ownership/no-double-counting work can consume the one-leaf rows. |
| Sidecar diagnostic: higher-fold one-leaf receiver-range contraction theorem attempt | `priority-only` | `fresh-v10-higher-fold-one-leaf-receiver-range-contraction-theorem.mjs`, `one_leaf_receiver_range_contraction_theorem.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`, and `one_leaf_receiver_range_contraction_theorem_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`; script hash `62bed34491d3483f16a84efd1d18e40a5eac60af65bb67cff81ad21d8192972d`, JSON hash `58851c345888e900e8bedc270f38e3afb0b5df7cc4758362c857f775d930b5b6`, report hash `38077c4137f488d1e3dc2432814b4a464ea6c3e49c779328dd2b2f83dc268d04`; the attempt verifies 3 / 3 strict threshold identities but certifies 0 same-packet receiver contraction rows, 0 receiver endpoint-tightening certificates, and 0 contraction-preservation rows. | It consumes 0 rows, keeps `branch_chart_authorized=false`, and shows the receiver-contraction route needs an actual same-packet receiver-range refinement or receiver endpoint-tightening theorem before ownership/no-double-counting work can consume the one-leaf rows. |
| Sidecar diagnostic: higher-fold one-leaf candidate-change boundary-data constructor | `priority-only` | `fresh-v10-higher-fold-one-leaf-candidate-change-boundary-data-constructor.mjs`, `one_leaf_candidate_change_boundary_data.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`, and `one_leaf_candidate_change_boundary_data_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`; script hash `d36f2baab5e88540f7b49ad72c9f542217fde106d69c3aa40722713951a7a2f3`, JSON hash `f05f1094ce80b2a3c750f77135e0322162146602650923f01954cefe1159f547`, report hash `f88d6b0ac6832cd3571c062d22104202d8c66356a8d9b9337bda3afe800f71b3`; the constructor verifies 3 / 3 strict threshold identities inherited from the source and receiver theorem attempts, declares 3 / 3 combined boundary-opening targets, but certifies 0 same-packet candidate-change rows and 0 strict combined openings. | It consumes 0 rows, keeps `branch_chart_authorized=false`, and shows the candidate-change route needs actual same-packet deformation or endpoint-tightening data assigning positive source or receiver boundary shifts before ownership/no-double-counting work can consume the one-leaf rows. |
| Sidecar diagnostic: higher-fold one-leaf direct-path lambda shift screen | `priority-only` | `fresh-v10-higher-fold-one-leaf-direct-path-lambda-shift-screen.mjs`, `one_leaf_direct_path_lambda_shift_screen.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`, and `one_leaf_direct_path_lambda_shift_screen_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`; script hash `1906a68bf4163106a1f38d437902268a6f42dd15038f4818447a175bfa84f212`, JSON hash `08176b503110002ca25fb0cf201860d124e33e6ca0e424b8d4ff8fae58069d88`, report hash `5332e155903d78ce640545c28c5c63e4f701a28c7ea8ee46839ecaa87144264e`; the screen raises the direct-path parameter from `lambda=0.3` to `lambda=0.305` and finds positive sampled active-endpoint boundary openings for 3 / 3 one-leaf rows, with largest active-endpoint threshold `lambda>0.301815056706425`. | It consumes 0 rows and keeps `branch_chart_authorized=false`; the follow-on `lambda=0.305` replay recertifies topology and reruns v1-v6, but direct-path lambda motion still lacks source/receiver monotonicity, memory margins, endpoint ownership/no-double-counting, branch-reuse exclusion, non-owned-complement closure, and parent row consumption. |
| Sidecar diagnostic: higher-fold `lambda=0.305` preledger replay audit | `priority-only-topology-certified-row-blocked` | `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json`, `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json`, `causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json`, `fresh_v10_higher_fold_root_tube_interval_certificate.lambda0305.v0.json`, `lambda0305_preledger_replay_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`, and `lambda0305_preledger_replay_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`; the trial seed has 12 computed direct-path roots, a passing outward-rational 12-root topology certificate, v6 receiver-cover certified cells rising from 622 to 632, and structural misses falling from 3,024 to 3,012. | It still leaves 162 rows `split_required`, 0 complete receiver-cover parent rows, 0 accepted fold-layer rows, and `branch_chart_authorized=false`. It shows that `lambda=0.305` is a valid topology-preserving trial direction but not a row-closure mechanism by itself. |
| Sidecar diagnostic: fresh v10 nonlinear fold-coordinate collocation tangent screen | `priority-only-tangent-feasible-row-blocked` | `fresh-v10-nonlinear-fold-coordinate-collocation-matrix-builder.mjs`, `gap_opening_fresh_v10_fold_coordinate_collocation_input.nonlinear-v0.json`, `gap_opening_fresh_v10_fold_coordinate_collocation_result.nonlinear-v0.json`, and `gap_opening_fresh_v10_fold_coordinate_collocation_report.nonlinear-v0.md`; the screen adds 4 bounded fold-coordinate columns and 3 homogeneous structural rows to the shifted-separator v10 strict-gap matrix, preserves the 10 strict parent-complement collar rows, and the scanner returns `feasible` with `B_xi_residual_verified_zero_with_tolerance=true`, minimum post-margin `0.484518823372`, and $\|\xi\|_\infty=1$. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. The imported one-leaf guard has 3 / 3 positive boundary-opening rows with minimum margin `0.99975381569729`, but monotonicity, memory, endpoint ownership/no-double-counting, branch-reuse exclusion, non-owned complement closure, periodic endpoint/complement ownership, and fold-layer certification remain open. |
| Sidecar diagnostic: higher-fold one-leaf fold-coordinate collocation candidate-change theorem attempt | `priority-only-screen-positive-proof-grade-row-blocked` | `fresh-v10-higher-fold-one-leaf-fold-coordinate-candidate-change-theorem.mjs`, `one_leaf_fold_coordinate_collocation_candidate_change_theorem_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `one_leaf_fold_coordinate_collocation_candidate_change_theorem_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `3745704063dc2d142f421bc1e36ef0c02f52fc1d8268062b82f58dcc497b7982`, JSON hash `72bb4cff296b722a2bb8d38a393454fde10969ba7bc15709e952879b26058f18`, report hash `654da08c5f225256fdfa2378f2fff82bac557717af95480fbace03102778d6cc`; the attempt matches 3 / 3 one-leaf constructor rows, verifies 3 / 3 fold-coordinate screen-positive boundary openings with minimum screen margin `0.999753815697289`, preserves the 10 strict-gap and 3 structural-row screen counts, and keeps 0 proof-grade candidate-change rows. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It sharpens the blocker: the nonlinear witness is a positive screen for all three one-leaf rows, but no proof-grade same-packet candidate change, source/receiver monotonicity, memory margins, endpoint ownership/no-double-counting, branch-reuse exclusion, non-owned complement closure, root-topology recertification, or preledger rerun exists for that candidate change. |
| Sidecar diagnostic: higher-fold fold-coordinate candidate promotion audit | `priority-only-promotion-audit-realization-blocked` | `fresh-v10-higher-fold-fold-coordinate-candidate-promotion-audit.mjs`, `fold_coordinate_candidate_promotion_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_candidate_promotion_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `ed73b90300bb30b5f96286a726c28211444e42c33f6922f21a1a554cd13ab397`, JSON hash `cd807ff5a92c2503984f39683e50ddbf745e8c9a5acf35e63151820459f1fba0`, report hash `c29de012c8a7dcf26c15eda968b2bbdbad9eca7c0f47f9b93205b2b57c4afd01`; the audit imports the one-leaf theorem attempt, preserves 3 / 3 screen-positive proposed fold-coordinate shifts, finds 0 / 4 expected candidate-specific realization artifacts present, and keeps 0 proof-grade rows. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It confirms that the `lambda=0.305` replay is non-reusable contrast for this fold-coordinate candidate. The next mathematical object is a materialized same-packet fold-coordinate candidate history plus candidate-specific root-topology recertification and proof-interval preledger replay, not another screen over the same witness. |
| Sidecar diagnostic: higher-fold fold-coordinate candidate materialization audit | `priority-only-materialization-audit-realization-blocked` | `fresh-v10-higher-fold-fold-coordinate-candidate-materialization-audit.mjs`, `fold_coordinate_candidate_materialization_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_candidate_materialization_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `75e52331ccdc950a48088312cb36aac9e34b8c74ebaa19f8ec6681099b54afde`, JSON hash `1fb3cff54698bffd12a8bfa65bf43599a17afc367ea9cd3a3c08fb3da04862cd`, report hash `21701df97ce93f371baa18be3b582324ce780bd6ec59f542add561cf321d1e3d`; the audit preserves 3 / 3 screen-positive rows and 4 fold-coordinate boundary-opening columns, but finds 0 / 4 variables with same-packet history realization fields, 0 / 5 candidate artifacts present, and 0 materialization-ready rows. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It proves the honest next object is not candidate-file emission: it is a finite history-realization rule for `fc_sigma_source_lower`, `fc_rho_receiver_lower`, `fc_sigma_source_upper`, and `fc_rho_receiver_upper`, after which root topology and the full v1-v6 preledger chain can be rerun. |
| Sidecar target: higher-fold fold-coordinate history-realization contract | `priority-only-realization-contract-defined-proof-absent` | `fresh-v10-higher-fold-fold-coordinate-history-realization-contract.mjs`, `fold_coordinate_history_realization_contract.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_history_realization_contract_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `1a7e2ac826219f72231aa729a43fe7490ef41f0fc4e45cd03e46739cf8ccc8c8`, JSON hash `155d45c7e309938bb8415e102710c17f8260ac504820d7debb530ed4d406ad72`, report hash `12d5867450f88c1e58e0b7074a6c13494346fc136aeace6762c662705c633c8e`; the contract defines the target $\Delta X_{\mathrm{fc}}(\theta;\xi)$ same-packet update, signed boundary-delta contracts for 3 / 3 one-leaf rows, 8 realization fields per `fc_*` variable, 16 packet-generator fields, 4 source bindings, and a 6-stage candidate-specific v1-v6 replay plan. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It also records that current $B\xi$ evidence is only screen-level: tolerance verification is true, but exact zero certification and rank certification are false. The contract closes the routing ambiguity but not the proof; the next proof object is an actual finite same-packet basis/mesh/endpoint/monotonicity realization satisfying this contract. |
| Sidecar theorem attempt: higher-fold fold-coordinate history-realization theorem attempt | `priority-only-realization-theorem-attempt-fail-closed` | `fresh-v10-higher-fold-fold-coordinate-history-realization-theorem-attempt.mjs`, `fold_coordinate_history_realization_theorem_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_history_realization_theorem_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `d230b22455f1289c3694c8ebbe66c85e95d4bb1a4bdb7936cd6642a89b170566`, JSON hash `64689d3a8c2ccfeeff1cf052619d1bb68691f85ba9eeb66ba9253c3667b3a6c7`, report hash `a2728785acc455a3dc1eb3ad178ebc95da8d9e45a1c4812bb455cbcd6e3284e1`; the attempt verifies 4 / 4 screen coefficients, 3 / 3 signed boundary-delta rows, and 0 / 4 exact finite same-packet realizations. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It proves the contract is not already a theorem: exact $B\xi=0$, rank certification, per-variable $\Psi_j$ support/derivative/mesh/endpoint/monotonicity rules, candidate artifacts, topology recertification, and v1-v6 replay remain absent. |
| Sidecar construction attempt: higher-fold fold-coordinate finite-realization basis attempt | `priority-only-finite-basis-attempt-fail-closed` | `fresh-v10-higher-fold-fold-coordinate-finite-realization-basis-attempt.mjs`, `fold_coordinate_finite_realization_basis_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_finite_realization_basis_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `e5b95ffc35acc32ddd3831db65be57f619e443baf1881c54e760460d4752d58e`, JSON hash `f1b206f5c8dfb051abd9f454c8be3457492af5125f0329ec3b36cffb4cef047a`, report hash `129d882b187cecca8e39594432ef492bee70fa7ddaab88f5c70bf0320d652142`; the attempt verifies 4 / 4 screen variables, basis symbols, and endpoint boundary actions, but 0 / 4 endpoint bindings, supports, formulas, derivative formulas, mesh/endpoint/monotonicity rules, exact $B\xi=0$ certificates, or rank certificates. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It sharpens the blocker from finite-basis absence to endpoint-functional finite basis data absence; no candidate `phi_cyc`, `mesh`, topology certificate, or v1-v6 replay may be emitted until that data exists. |
| Sidecar source audit: higher-fold fold-coordinate endpoint-functional source audit | `priority-only-endpoint-source-audit-fail-closed` | `fresh-v10-higher-fold-fold-coordinate-endpoint-functional-source-audit.mjs`, `fold_coordinate_endpoint_functional_source_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_endpoint_functional_source_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `05662ee0d7ce252ec34c47e97f90252e7f91ccae9f98593f8850cac0543b7dce`, JSON hash `bc88d7a60b1c85ba7c8c1023fc861ca4937904e60c52ae125f5a0e5c3b1aa086`, report hash `c2a6b1377184baeda8905aba31140415b2da08413b1117440bc16cb5aeedbb93`; the audit verifies 4 / 4 target endpoint refs, 4 / 4 row-local endpoint values, 4 / 4 boundary-delta sign matches, 3 / 3 row resolutions against preledger input, mesh, source-cover atlas, and ownership audit, 3 / 3 row-local source boundary values, 3 / 3 row-local receiver boundary values, and 3 / 3 ownership component resolutions, but 0 / 4 endpoint bindings, endpoint-functional domains, supports, formulas, exact $B\xi=0$ certificates, or rank certificates. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It proves the current seed and one-leaf artifacts are locator and row-local endpoint-value data only; the next proof object is an actual exact endpoint-functional construction, not another audit over the same row-local references. |
| Sidecar construction attempt: higher-fold fold-coordinate endpoint-functional construction attempt | `priority-only-endpoint-construction-attempt-fail-closed` | `fresh-v10-higher-fold-fold-coordinate-endpoint-functional-construction-attempt.mjs`, `fold_coordinate_endpoint_functional_construction_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_endpoint_functional_construction_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `d87d92513e61290d297dccaf84ac5ea57d08a133e1142858cc0e87f65f2761c4`, JSON hash `06dc85559f4d8ab4371d1aa2eeca0023496dc6a7ff91b667c0686c802e68d3e6`, report hash `f603023e845a950d75f257aa05046f7fb861e77da084434c38438366373d7096`; the attempt reaches 4 / 4 endpoint locators, 4 / 4 row-local endpoint values, 4 / 4 functional target equations, and 4 / 4 target-action sign checks, but constructs 0 / 4 endpoint functionals and 0 / 3 rows because endpoint bindings, endpoint-functional domains, supports, formulas, exact $B\xi=0$ certificates, rank certificates, same-packet candidate artifacts, topology recertification, and v1-v6 replay remain absent. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It proves the fold-coordinate matrix is still a tolerance-level screen witness rather than a solved same-packet endpoint-functional basis. |
| Sidecar no-go: higher-fold fold-coordinate endpoint-functional binding contract | `priority-only-endpoint-binding-no-go-fail-closed` | `fresh-v10-higher-fold-fold-coordinate-endpoint-functional-binding-contract.mjs`, `fold_coordinate_endpoint_functional_binding_contract_no_go.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_endpoint_functional_binding_contract_no_go_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `69bbe137601cf25bf7b0d4b1ebea058f46230b67e78ae246f99390d859557e8e`, JSON hash `4bdd278f77b76d8d688bfb07f3209debedbdc3010588e0f02c07d3f6ea0e53ff`, report hash `3ddbe5ef571e948e7b8a95dca77c1041f446309008a034b4f6cdfb13f9e39a01`; the no-go tests 4 binding methods across 16 method evaluations and certifies 0 / 4 binding contracts: locators, row-local endpoint values, functional target equations, and target-action signs are present, but endpoint-boundary bindings, endpoint-functional domains, domain charts, evaluation maps, endpoint-value/domain bindings, supports, formulas, exact $B\xi=0$ certificates, rank certificates, and candidate replay data are absent. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It proves the current row-local endpoint q-values are target-location data only; they may not be promoted into endpoint-functional bindings by label or target equation. |
| Sidecar construction attempt: higher-fold fold-coordinate endpoint-functional domain/evaluation map | `priority-only-endpoint-domain-evaluation-map-attempt-fail-closed` | `fresh-v10-higher-fold-fold-coordinate-endpoint-functional-domain-evaluation-map-attempt.mjs`, `fold_coordinate_endpoint_functional_domain_evaluation_map_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_endpoint_functional_domain_evaluation_map_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `78100e23ae6db5e5ffc37d26a6bae3faef03491c9d6b5f66cdb1ac7d16d27d9c`, JSON hash `a0d70f766659598abe68242c887fbf485985a5457570948c26fe97a468affcb8`, report hash `9739ae8e7e5c7ea87bce69050f5e7722ea29984eacdb93063869fa58631ab5bf`; the attempt tests 5 domain/evaluation-map construction methods across 20 method evaluations and certifies 0 / 4 domain/evaluation maps: locators, row-local endpoint values, functional target equations, and target-action signs are present, but endpoint-boundary bindings, endpoint-functional domains, domain charts, domain coordinate rules, evaluation maps, endpoint evaluation rules, endpoint motion rules, exact $B\xi=0$ certificates, rank certificates, and candidate replay data are absent. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It proves the current blocker is the absent endpoint-functional domain/evaluation-map construction itself, not another endpoint locator or target-equation audit. |
| Sidecar target: higher-fold fold-coordinate endpoint-functional domain/evaluation-map contract | `priority-only-endpoint-domain-evaluation-map-contract-defined-proof-absent` | `fresh-v10-higher-fold-fold-coordinate-endpoint-functional-domain-evaluation-contract.mjs`, `fold_coordinate_endpoint_functional_domain_evaluation_contract.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_endpoint_functional_domain_evaluation_contract_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `5ba375f8b60851071b3dce9cb7a0d826bd317b40c9629dc097be021608f8f077`, JSON hash `a7d7a5cbb74aad039e237f9af7d8a575da47740379319f56596133a83d7d1fa8`, report hash `62a7685a8c3332eeffb3cef8458fc05e3a37fcab448eeffcecbaf695b693e204`; the contract declares 4 / 4 endpoint-functional domain/evaluation-map contracts and 3 / 3 signed row contracts, but supplies 0 / 4 domain charts, coordinate rules, evaluation maps, endpoint evaluation rules, endpoint motion rules, same-packet $\Psi_j$ formulas, exact $B\xi=0$ certificates, rank certificates, candidate artifacts, topology recertifications, or v1-v6 replays. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It closes the routing ambiguity after the fail-closed attempt: the next proof object must construct the same-packet endpoint-functional domain/evaluation maps rather than repeat locator, target-equation, binding-label, or tolerance-screen audits. |
| Sidecar construction attempt: higher-fold fold-coordinate endpoint-functional $C^1$ endpoint-basis ansatz | `priority-only-c1-endpoint-basis-ansatz-attempt-fail-closed` | `fresh-v10-higher-fold-fold-coordinate-endpoint-functional-c1-endpoint-basis-ansatz-attempt.mjs`, `fold_coordinate_endpoint_functional_c1_endpoint_basis_ansatz_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_endpoint_functional_c1_endpoint_basis_ansatz_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `eed5c74e51469f1790fb62b7cd5c62a185f0fd1a95c872a00cc5364209cab365`, JSON hash `71799a7e86d9bdc78b185782fd882952da626af11abdd0612d42ee0e76729728`, report hash `7f3aa1b02e0b99f9a36bd47bd7d25b34b7e38d7807dd7dbd560bd4e1a35cfce`; the attempt reuses the shifted-separator $C^1$ bump template as ansatz data for 4 / 4 `fc_*` endpoint variables, declaring 4 / 4 ansatz formulas, derivative formulas, and gluing templates, but constructs 0 / 4 endpoint-basis ansatzes, 0 / 4 domain/evaluation maps, and 0 / 3 row-ready pairs because no endpoint-functional domain chart, endpoint-motion rule, non-target zero certificate, exact $B\xi=0$, rank certificate, candidate artifact, topology recertification, or v1-v6 replay is bound to the template. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It proves the shifted-separator $C^1$ bump machinery is a reusable smooth-template source only, not a same-packet endpoint-functional map by itself. |
| Sidecar construction attempt: higher-fold fold-coordinate endpoint-functional explicit $\Psi_j$ formula attempt | `priority-only-explicit-psi-formula-attempt-fail-closed` | `fresh-v10-higher-fold-fold-coordinate-endpoint-functional-explicit-psi-formula-attempt.mjs`, `fold_coordinate_endpoint_functional_explicit_psi_formula_attempt.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.json`, and `fold_coordinate_endpoint_functional_explicit_psi_formula_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md`; script hash `1faa3361247c74bd01d48d50a974eca8388d2171b7a24d676334be61f7cc2b33`, JSON hash `98b2c6f0894e6ca2e95ed6ffc753bd280d3b5c4cfbefef70c2578154ad916b9a`, report hash `c8bad8a8c4da7d9ff1f3b8f04d521358e2e44bac949a62d21b7495c6f2f43821`; the attempt declares 4 / 4 endpoint-local cubic $\Psi_j$ formula candidates, derivative formulas, support components, and exact local target-action identities over `A03/A09`, `A04/A10`, `A06`, and `A07`, but constructs 0 / 4 proof-grade endpoint-functional formulas, 0 / 4 domain/evaluation maps, and 0 / 3 row-ready pairs because no global same-packet domain chart, gluing/periodicity rule, non-target zero certificate, exact $B\xi=0$, rank certificate, candidate artifact, topology recertification, or v1-v6 replay is bound to the component formulas. | It consumes 0 rows, keeps `preledger_pass=false`, `updates_live_ledger=false`, and `branch_chart_authorized=false`. It proves the local formula identities are available but are not enough to supersede the regular-row burden without a same-packet endpoint-functional domain/evaluation construction and replay. |
| Sidecar diagnostic: higher-fold fold-layer burden atlas | `priority-only` | `fresh-v10-higher-fold-fold-layer-burden-atlas.mjs`, `fold_layer_burden.fresh-v10-higher-fold-12-root-rebuild-v0.json`, and `fold_layer_burden_report.fresh-v10-higher-fold-12-root-rebuild-v0.md`; script hash `e448f1a65072a2fce1d8bc8b91e4470048a4a863d9e3bea995b1a7147e5c0726`, JSON hash `da59d44487f227ab01170459c660fb0cc92e9b8d9a9b894ba8a4c881af015e62`, report hash `d7251b07f178bd606f854ee4b0f3c229e2f76d2b83dabf680daf690747fedced`; the atlas groups 112 fold-layer rows by 12 higher-fold separator layers and records required same-packet fields. | It consumes 0 rows, keeps `branch_chart_authorized=false`, and turns the fold-layer part of the remaining burden into a finite worklist. The next fold-layer action is same-packet alpha/exit/parity/impulse certification, not simple-root rewriting. |
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

The proof-interval-v3 sidecar keeps the v2 trigonometric range backend and adds
exact-rational derivative enclosures for same-interval regular diagonal rows.
It still does not certify simple-root rows, fold-layer rows, or live branch
geometry.

| Proof-interval-v3 quantity | Count or margin |
| --- | ---: |
| Base rows | 162 |
| Exact-rational row-specific trig range-empty rows | 116 |
| Regular monotone diagonal exclusions accepted | 8 |
| Simple-root subrows accepted | 0 |
| Fold-layer rows accepted | 0 |
| Split-required rows | 38 |
| Minimum accepted trig range gap | 0.055914412432543 |
| Minimum accepted diagonal Jacobian floor | 0.001946149764116 |

The proof-interval-v4 sidecar keeps the v3 exact-rational trigonometric and
derivative backend and adds oriented source-inner simple-root subwindow
certificates for the six regular parent root-candidate rows. It records those
subwindows as proof-grade partial successes but does not consume the parent
rows because inactive complements and boundary pieces remain uncertified.

| Proof-interval-v4 quantity | Count or margin |
| --- | ---: |
| Base rows | 162 |
| Exact-rational row-specific trig range-empty rows | 116 |
| Regular monotone diagonal exclusions accepted | 8 |
| Simple-root subrows accepted | 6 |
| Fold-layer rows accepted | 0 |
| Split-required parent rows | 38 |
| Minimum accepted trig range gap | 0.055914412432543 |
| Minimum accepted diagonal Jacobian floor | 0.001946149764116 |
| Minimum simple-root Jacobian floor $\nu_{\mathrm{simple}}$ | 0.001946149764116 |
| Minimum simple-root coverage gap $\gamma_{\mathrm{cov}}$ | 0.001122267086258 |
| Minimum simple-root memory lower margin $\gamma_\tau$ | 0.263009875015056 |
| Minimum simple-root horizon margin $\gamma_h$ | 2.532580711213249 |

The proof-interval-v5 sidecar imports the v4 simple-root subwindows and probes
their receiver-side parent complements against the same full source intervals.
It is a negative proof result for strict range-empty consumption of those
collars: all 10 probed complement strips still have overlapping
null-coordinate ranges and require endpoint/topology ownership, accepted
regular-boundary coverage, exact fold-family coverage, or candidate repair.

| Proof-interval-v5 quantity | Count or margin |
| --- | ---: |
| Base rows | 162 |
| Exact-rational row-specific trig range-empty rows | 116 |
| Regular monotone diagonal exclusions accepted | 8 |
| Simple-root subrows accepted | 6 |
| Parent-complement strips probed | 10 |
| Parent-complement strict empty strips | 0 |
| Parent-complement split-required strips | 10 |
| Simple-root parent rows consumed by v5 | 0 |
| Fold-layer rows accepted | 0 |
| Split-required parent rows | 38 |
| Minimum accepted trig range gap | 0.055914412432543 |
| Minimum accepted diagonal Jacobian floor | 0.001946149764116 |
| Minimum simple-root Jacobian floor $\nu_{\mathrm{simple}}$ | 0.001946149764116 |
| Minimum simple-root coverage gap $\gamma_{\mathrm{cov}}$ | 0.001122267086258 |
| Minimum simple-root memory lower margin $\gamma_\tau$ | 0.263009875015056 |
| Minimum simple-root horizon margin $\gamma_h$ | 2.532580711213249 |
| Minimum parent-complement empty gap | none |

The proof-interval-v6 sidecar imports the v5 complement strips and tests the
accepted ownership or coverage alternatives. It is a negative proof result for
current same-packet complement ownership: all 10 strips fail strict range-empty,
endpoint/topology ownership, exact fold-family coverage, and regular-boundary
coverage under the present artifact set.

| Proof-interval-v6 quantity | Count or margin |
| --- | ---: |
| Base rows inherited from v5 | 162 |
| Empty rows inherited from v5 | 124 |
| Range-empty rows inherited from v5 | 116 |
| Regular monotone diagonal exclusions inherited from v5 | 8 |
| Simple-root subrows inherited from v5 | 6 |
| Parent-complement strips probed | 10 |
| Strict range-empty complement strips | 0 |
| Endpoint/topology-owned strips | 0 |
| Exact fold-family-covered strips | 0 |
| Regular-boundary-covered strips | 0 |
| Parent-complement strips accepted by v6 | 0 |
| Parent-complement split-required strips | 10 |
| Simple-root parent rows consumed by v6 | 0 |
| Fold-layer rows accepted | 0 |
| Split-required parent rows | 38 |

The proof-interval-v7 sidecar imports the v6 complement strips and constructs
same-packet ownership-data candidate records. It is a positive data-construction
step for regular-boundary routing, but it is still a negative acceptance result:
the 10 candidate regular-boundary cores lack same-packet inclusion, domination,
topology/no-double-counting, and non-core complement closure fields.

| Proof-interval-v7 quantity | Count or margin |
| --- | ---: |
| Base rows inherited from v6 | 162 |
| Empty rows inherited from v6 | 124 |
| Range-empty rows inherited from v6 | 116 |
| Regular monotone diagonal exclusions inherited from v6 | 8 |
| Simple-root subrows inherited from v6 | 6 |
| Parent-complement strips probed | 10 |
| Strict range-empty complement strips | 0 |
| Endpoint contact tables constructed | 0 |
| Endpoint/topology-owned strips | 0 |
| Fold-family candidate rows considered | 16 |
| Accepted same-packet fold-layer rows | 0 |
| Exact fold-family-covered strips | 0 |
| Regular-boundary candidate cores constructed | 10 |
| Regular-boundary-covered strips | 0 |
| Parent-complement strips accepted by v9 | 0 |
| Parent-complement split-required strips | 10 |
| Simple-root parent rows consumed by v9 | 0 |
| Fold-layer rows accepted | 0 |
| Split-required parent rows | 38 |

The proof-interval-v8 sidecar imports the v7 candidate regular-boundary cores
and constructs finite candidate families by separator. It is a formal inventory
of candidate objects, not an inclusion or domination proof: every core still
lacks a certified single separator assignment, same-packet inclusion proof,
fresh same-packet domination inequality, topology/no-double-counting
certificate, and non-core complement closure.

| Proof-interval-v8 quantity | Count, margin, or flag |
| --- | ---: |
| Base rows inherited from v7 | 162 |
| Empty rows inherited from v7 | 124 |
| Range-empty rows inherited from v7 | 116 |
| Regular monotone diagonal exclusions inherited from v7 | 8 |
| Simple-root subrows inherited from v7 | 6 |
| Parent-complement strips probed | 10 |
| Regular-boundary candidate cores imported from v7 | 10 |
| Finite regular-boundary candidate families constructed | 4 |
| Candidate membership edges recorded | 20 |
| Exact single separator assignments certified | 0 |
| Same-packet inclusion proofs certified | 0 |
| Same-packet fresh fold ceiling available | `false` |
| Domination inequalities certified | 0 |
| Topology/no-double-counting certificates | 0 |
| Non-core complement closures certified | 0 |
| Regular-boundary-covered strips | 0 |
| Parent-complement strips accepted by v8 | 0 |
| Parent-complement split-required strips | 10 |
| Simple-root parent rows consumed by v8 | 0 |
| Fold-layer rows accepted | 0 |
| Split-required parent rows | 38 |

The proof-interval-v9 sidecar imports the v8 finite candidate-family inventory
and proves a current-field no-go for separator assignment. It does not prove
that no future selector can exist; it proves that this packet cannot accept one
from candidate adjacency, side labels, endpoint adjacency without ownership, or
array/family ordering.

| Proof-interval-v9 quantity | Count, margin, or flag |
| --- | ---: |
| Base rows inherited from v8 | 162 |
| Empty rows inherited from v8 | 124 |
| Range-empty rows inherited from v8 | 116 |
| Regular monotone diagonal exclusions inherited from v8 | 8 |
| Simple-root subrows inherited from v8 | 6 |
| Parent-complement strips probed | 10 |
| Regular-boundary candidate cores imported from v8 | 10 |
| Finite regular-boundary candidate families imported from v8 | 4 |
| Candidate membership edges imported from v8 | 20 |
| Separator-assignment methods tested | 5 |
| Ambiguous two-separator cores | 10 |
| Unique candidate-membership assignments | 0 |
| Exact single separator assignments certified | 0 |
| Separator assignments accepted by v9 | 0 |
| Heuristic assignments rejected | 20 |
| Parent-complement strips accepted by v9 | 0 |
| Parent-complement split-required strips | 10 |
| Simple-root parent rows consumed by v9 | 0 |
| Fold-layer rows accepted | 0 |
| Split-required parent rows | 38 |

The proof-interval-v10 sidecar imports the v9 residual regular-boundary
inventory and audits whether current packet fields certify
topology/no-double-counting for any residual core. It is a negative proof
result: no tested method supplies explicit ownership and no-double-counting
data, and the residual simple-root complements remain unconsumed.

| Proof-interval-v10 quantity | Count, margin, or flag |
| --- | ---: |
| Base rows inherited from v9 | 162 |
| Empty rows inherited from v9 | 124 |
| Range-empty rows inherited from v9 | 116 |
| Regular monotone diagonal exclusions inherited from v9 | 8 |
| Simple-root subrows inherited from v9 | 6 |
| Parent-complement strips probed | 10 |
| Regular-boundary candidate cores imported from v9 | 10 |
| Finite regular-boundary candidate families imported from v9 | 4 |
| Candidate membership edges imported from v9 | 20 |
| Topology/no-double-counting methods tested | 5 |
| Topology/no-double-counting method evaluations | 50 |
| Explicit topology fields | 0 |
| Complement-boundary ownership certificates for residual cores | 0 |
| Simple-root branch-reuse exclusions | 0 |
| Endpoint-excluded complement disjointness certificates | 0 |
| Fold-layer nonexpansion certificates | 0 |
| Topology/no-double-counting certificates accepted by v10 | 0 |
| Parent-complement strips accepted by v10 | 0 |
| Parent-complement split-required strips | 10 |
| Simple-root parent rows consumed by v10 | 0 |
| Fold-layer rows accepted | 0 |
| Split-required parent rows | 38 |

Fresh v4 simple-root subrows:

| Subrow | Parent | Ledger | Receiver | Source | Coverage gap | Memory depth |
| --- | --- | --- | --- | --- | ---: | --- |
| `S_w_A1_A0_v4_1` | `R_w_A1_A0` | `w` | `A1` | `A0` | 0.001721822928833 | `0.263009875015056..2.010093913107699` |
| `S_w_A2_A0_v4_2` | `R_w_A2_A0` | `w` | `A2` | `A0` | 0.043026210068286 | `1.656270700686398..2.750692884427899` |
| `S_w_A2_A1_v4_3` | `R_w_A2_A1` | `w` | `A2` | `A1` | 0.005280315036193 | `0.4753629083017..1.870521556232798` |
| `S_u_A3_A2_v4_4` | `R_u_A3_A2` | `u` | `A3` | `A2` | 0.001721822928833 | `0.263009875015056..2.9845130209105` |
| `S_u_A4_A2_v4_5` | `R_u_A4_A2` | `u` | `A4` | `A2` | 0.020073082906124 | `1.626785432984623..3.75060459596675` |
| `S_u_A4_A3_v4_6` | `R_u_A4_A3` | `u` | `A4` | `A3` | 0.001122267086258 | `0.461585603867875..1.896014159968848` |

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

These parent rows have accepted simple-root interiors, but their boundary leftovers are adjacent to active fold layers. The fixed-parameter fold-layer alternative is now available for the 16 fold rows, and `fold_parent_endpoint_contract_extension.md` adds endpoint-excluded complements as a third contract alternative. The endpoint-closure attempts locally accept seven singleton-contact strips, and the finer positive-overlap subdivision attempts name diagnostic empty wings by inverse thresholds. The regular-boundary probes then reject current-contract coverage because the residual cores are not exact accepted fold-layer row rectangles, no finite same-packet inclusion/domination theorem is present, and proof-interval-v10 now also rejects current-field topology/no-double-counting ownership. The six parent rows are therefore not consumed.

## Next Executable Row

The next executable row is not the branch chart and not the deferred
regular-boundary domination packet. It is the strict-gap repair target for
`fresh-same-packet-fold-shear-seed-v0` or for a deliberately renamed successor
packet if the split blockers are structural.

Next certificate action:

For the current higher-fold branch, continue from
`source_cover_boundary_ownership_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`:
it proves the exact terminal receiver partitions for the 42 regular
parent-complement rows but leaves every boundary ownership pass-rule field
uncertified. The next regular-row certificate must prove source-boundary
movement, receiver-range contraction, or endpoint/topology ownership with
no-double-counting and branch-reuse exclusion; the 8 periodic
endpoint/complement rows and 112 fold-layer rows remain separate open
worklists. The one-leaf boundary movement probe has already fail-closed the
three smallest boundary components, so the next regular-row certificate must
supply actual movement/contraction theorem data rather than another ownership
audit over the same terminal leaves. The source-boundary movement theorem
attempt has now also fail-closed the source-boundary route for those three
components under current data: it verifies the exact threshold identities but
finds no source variation or endpoint-tightening certificate. The
receiver-range contraction theorem attempt also fail-closes under current data:
it verifies the exact receiver-boundary threshold identities but finds no
receiver refinement or receiver endpoint-tightening certificate. The remaining
regular-row route is therefore new source/receiver boundary theorem data, a
candidate change with positive boundary-opening data, or endpoint/topology
ownership only after an analytic alternative exists. The candidate-change
boundary-data constructor has declared the combined inequalities for the three
smallest rows, but it is not a certificate because it assigns no positive
source or receiver boundary shifts. The direct-path lambda shift screen then
finds a positive sampled direction for those three rows at `lambda=0.305`, but
the `lambda=0.305` replay shows this direction is not enough: root topology is
recertified at proof grade and v1-v6 have been rerun, yet the branch still has
162 split-required rows, 0 complete receiver-cover parent rows, 0 accepted
fold-layer rows, no preservation fields, no ownership fields, and no
branch-reuse exclusion. The nonlinear fold-coordinate collocation
tangent-matrix screen now supplies a feasible declared tangent surface with
fold-coordinate columns and positive one-leaf boundary-opening guard data, but
it is still only a solver-surface result. The one-leaf fold-coordinate
candidate-change theorem attempt imports that witness and verifies 3 / 3
screen-positive one-leaf boundary openings, but it still certifies 0 / 3
proof-grade same-packet candidate-change rows. The fold-coordinate promotion
audit then verifies that the expected candidate-specific artifacts are absent:
no fold-coordinate `phi_cyc`, no fold-coordinate `mesh`, no candidate-specific
root-topology certificate, and no candidate-specific proof-interval replay. The
next certificate action is therefore to materialize such a same-packet
fold-coordinate candidate history, or prove an analytic realization theorem for
the same variables, and then rerun topology and preledger before attempting the
missing preservation, ownership, endpoint/complement, and fold-layer fields. The
materialization audit fail-closes the first option under current data: the
`fc_*` columns are boundary-opening screen variables with 0 / 4 history
realizations. The history-realization contract now defines that immediate proof
object as a finite $\Delta X_{\mathrm{fc}}(\theta;\xi)$ update with exact
support, $X$ and $\dot X$ bases, mesh update, endpoint motion, source and
receiver monotonicity rules, candidate artifact namespace, and v1-v6 replay
plan. The follow-on history-realization theorem attempt confirms this contract
is still not a theorem: 4 / 4 screen coefficients and 3 / 3 signed row
contracts are present, but exact $B\xi=0$, rank certification, all 4 finite
same-packet $\Psi_j$ realizations, candidate artifacts, topology
recertification, v1-v6 replay, and row consumption remain absent. The
finite-realization basis attempt then shows that the first conservative basis
route is also not present: the four variables have screen variables, basis
symbols, and endpoint boundary actions, but no endpoint functional bindings,
supports, basis formulas, derivative formulas, mesh/endpoint/monotonicity
rules, exact $B\xi=0$ certificates, or rank certificates. The
endpoint-functional source audit then checks the existing seed and one-leaf
source artifacts directly: they locate 4 / 4 endpoint refs, 4 / 4 row-local
endpoint values, and 3 / 3 row-local ownership components, but still provide
0 / 4 endpoint bindings, endpoint-functional domains, supports, formulas,
exact $B\xi=0$ certificates, or rank certificates. The endpoint-functional
construction attempt then tries to use those row-local values and still
constructs 0 / 4 endpoint functionals and 0 / 3 rows because the exact
functional binding, domain, formula, exact screen-zero, rank, candidate
artifact, topology, and v1-v6 replay data are absent. The endpoint-functional
binding no-go then tests 4 possible promotion methods across 16 method
evaluations and certifies 0 / 4 binding contracts: row-local q-values and
target equations do not determine endpoint functionals without an explicit
domain chart, endpoint-boundary binding, evaluation map, formula/support data,
exact screen-zero certificate, rank certificate, and candidate replay. The
endpoint-functional domain/evaluation-map attempt then tests that missing layer
directly across 5 construction methods and 20 method evaluations, certifying
0 / 4 domain/evaluation maps and 0 / 3 domain/evaluation-ready rows because no
domain chart, domain coordinate rule, evaluation map, endpoint evaluation rule,
endpoint motion rule, exact $B\xi=0$, rank certificate, or candidate replay is
present. The endpoint-functional domain/evaluation-map contract then declares
the exact successor burden: 4 / 4 endpoint contracts and 3 / 3 signed row
contracts exist as contracts, but 0 / 4 domain charts, evaluation maps,
endpoint motion rules, same-packet $\Psi_j$ formulas, exact $B\xi=0$
certificates, rank certificates, candidate artifacts, topology
recertifications, or v1-v6 replays are supplied. The endpoint-functional
$C^1$ endpoint-basis ansatz attempt then tests the existing shifted-separator
smooth-bump route and fail-closes: 4 / 4 ansatz formulas, derivative formulas,
and gluing templates are declared, but 0 / 4 endpoint-basis ansatzes,
0 / 4 domain/evaluation maps, and 0 / 3 row-ready pairs are constructed. The
explicit $\Psi_j$ formula attempt then writes the component-local cubic
formula candidates directly and verifies 4 / 4 local target-action identities,
but constructs 0 / 4 proof-grade endpoint-functional formulas, 0 / 4
domain/evaluation maps, and 0 / 3 row-ready pairs because no global
same-packet domain chart, gluing/periodicity rule, non-target zero
certificate, exact $B\xi=0$, rank certificate, candidate topology, or v1-v6
replay is bound to those formulas.

1. Resolve the inactive complements and boundary pieces around the six proof-interval-v4 simple-root subrows by the selected strict-gap repair route: proof-interval-v5 shows strict range-empty consumption accepts none of the 10 receiver-side complement strips, proof-interval-v6 shows the current same-packet data supplies no endpoint/topology ownership, exact fold-family coverage, or regular-boundary coverage, proof-interval-v7 constructs 10 candidate regular-boundary cores without accepting any, proof-interval-v8 constructs 4 finite candidate families without inclusion/domination/topology/closure fields, proof-interval-v9 proves that current fields cannot certify a singleton separator assignment for any imported core, and proof-interval-v10 proves that current fields cannot certify topology/no-double-counting ownership for any imported residual core. `candidate_repair_strict_gap_closure_target.md` is now the executable target, `gap_opening_fresh_v10_strict_gap_report.local_shear_free_period.v0.md` supplies the free-period local-shear direction, `fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.md` blocks direct finite integration of that direction under `doubled_four_arc_generic`, `fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.md` shows that the shifted-separator basis opens all collars as a tangent but is still not a direct finite repair, `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.md` closes the bounded three-coordinate shifted basis under sampled same-itinerary constraints, `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator_split2.v0.md` shows the smallest split enrichment also fails, `fresh_v10_hermite_itinerary_gap_boundary_screen.v0.md` shows a 541-variable Hermite same-itinerary family reaches only a sampled boundary, `fresh_v10_hermite_dual_obstruction.v0.md` supplies residual-adjusted row-only numerical dual evidence, `fresh_v10_hermite_dual_rationalization_audit.v0.md` supplies exact-rational active multipliers, `fresh_v10_hermite_active_row_interval_backend.v0.md` closes the declared finite sampled active-row system at proof grade, `fresh_v10_hermite_continuous_collar_lift.v0.md` lifts that obstruction by sample-subset inclusion, `fresh_v10_period_coupled_hermite_itinerary_screen.v0.md` blocks the period-coupled Hermite separator-lock variant, `fresh_v10_velocity_bernstein_itinerary_screen.v0.md` blocks the fixed-separator velocity-corridor variant, `fresh_v10_itinerary_structural_decision_packet.md` records bounded same-itinerary structural screens as obstructed, `fresh_v10_higher_fold_itinerary_rebuild_target.v0.md` freezes the first 12-root higher-fold rebuild target, `candidate_cycle_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.md` materializes its diagnostic successor seed packet, `fresh_v10_higher_fold_root_tube_certificate.v0.md` records the binary64/Lipschitz audit surface, `fresh_v10_higher_fold_root_tube_interval_certificate.v0.md` certifies the 12-root topology at proof grade, `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.md` certifies 270 coarse range-empty rows, `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.md` certifies 1,062 row-specific trigonometric range-empty rows, `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.md` certifies those 1,062 range-empty rows plus 26 root-complement monotone diagonal exclusions, `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.md` records 42 simple-root receiver subwindow certificates while consuming 0 parent rows, `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.md` audits the 42 regular residual parents with 571 certified receiver cells and 773 missing cells while consuming 0 parent rows, `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md` refines those misses to terminal grid 128 with 622 certified leaves, 3,024 structural terminal source-cover misses, and 0 resolved coarse cells, `source_cover_defect_atlas_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md` converts those 42 regular rows into exact rational source-cover boundary burdens, `source_cover_boundary_ownership_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md` proves 42 / 42 complete terminal receiver partitions but 0 ownership pass-rule rows, `one_leaf_direct_path_lambda_shift_screen_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md` gives a positive sampled one-leaf direction, and `lambda0305_preledger_replay_audit_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md` recertifies that direction's topology but leaves row closure blocked. The next certificate action is a proof-grade same-packet source-cover/parent-complement theorem, receiver-contraction theorem, endpoint/topology ownership theorem, or candidate change with positive boundary-opening data meeting the atlas burdens for the 42 regular rows; periodic endpoint/complement ownership for the 8 lift rows; and same-packet fold-layer certification for the 112 rows grouped by `fold_layer_burden_report.fresh-v10-higher-fold-12-root-rebuild-v0.md`, unless the nonlinear fold-coordinate collocation branch supersedes it.

   Follow-on note: `fold_coordinate_endpoint_functional_explicit_psi_formula_attempt_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.nonlinear-v0.md` shows the nonlinear fold-coordinate branch has not superseded the regular-row burden yet; it now has explicit row-local endpoint locators, endpoint values, target equations, endpoint-functional domain/evaluation-map contracts, signed row contracts, a fail-closed $C^1$ endpoint-basis ansatz attempt, and component-local $\Psi_j$ formula identities, but still requires actual endpoint-functional domain charts, evaluation maps, global gluing/periodicity, non-target zero certificates, mesh, endpoint, monotonicity, candidate topology, exact $B\xi=0$, rank, and v1-v6 replay proofs before materialized same-packet candidate history can exist.
2. Resolve the two periodic-seam structural rows and the two remaining regular nonmonotone diagonal/endpoint rows by endpoint ownership, diagonal splitting, or candidate repair.
3. Resolve the eight inactive-fold-neighborhood contacts and four fold-interval diagonal locks by fold-aware endpoint ownership, inactive-coordinate fold-neighborhood splitting, or candidate repair.
4. Certify same-packet fold-layer impulse fields and consume the 16 fold-layer rows plus all fold-adjacent parent complements by accepted alternatives.
5. Only after every fresh pre-ledger row is accepted as `empty`, `simple_root`, or bounded `fold_layer`, with all parent complements consumed by an accepted same-packet alternative, may `branch_chart.json` be produced.
6. The high-level falsification-gate principle has been promoted into the three proof-program $\mathbb{A}\mathbb{A}\mathbb{A}$ documents; keep the detailed rejected-packet inventory priority-only.
7. `regular_boundary_user_facing_recommendation.md` records the user-facing documentation decision: do not name regular-boundary coverage as accepted doctrine until a finite same-packet inclusion/domination theorem exists.
8. `fixed_history_strict_collar_persistence_lemma.md` explains the fixed-cosine obstruction, while `null_coordinate_separation_direction_lemma.md`, the live fold-shear witness, the finite deformed seed, the fresh sidecar packet, and `candidate_repair_strict_gap_closure_target.md` give the constructive fresh-candidate route: certify the symmetry-preserving candidate-history repair before spending work on branch-chart rows.
9. `sub_field_speed_action_test_case.md` is the sidecar analytic baseline for a no-separator comparison: first test whether the action-generated held-source and exterior delayed-partner branches remain strictly sub-field-speed before spending branch-chart work on a field-speed itinerary.

The historical cosine template is rejected before branch-chart certification
even though the finite fixed-parameter fold ceiling is available. The fresh
sidecar packet has now also fail-closed before branch-chart certification. The
same-itinerary Hermite route has now closed as an obstruction by proof-grade
active sampled dual plus sample-subset lift, and bounded period-coupled /
velocity-corridor structural screens also fail; candidate repair and live
preledger certification remain open.
