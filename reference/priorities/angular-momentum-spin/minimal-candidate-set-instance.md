# Minimal Candidate-Set Instance

Status. Priority instance for `tri_binary_partition_rule`, downstream of [finite-branch-candidate-set-packet.md](finite-branch-candidate-set-packet.md), [branch-selection-law-packet.md](branch-selection-law-packet.md), and [minimal-four-substep-certificate-instance.md](minimal-four-substep-certificate-instance.md). This file instantiates the finite retained candidate-set format around the clean minimal four-substep branch. It is priority material only and does not promote branch uniqueness, spinor closure, measurement response, or Bell recovery to theorem status.

Claim level. Defer with blocker. The packet shows how the solved reduced minimal branch enters a finite candidate audit trail. The algebraic scalar and vector rows inherited from the minimal certificate remain conditionally populated, but root replay, phase lock, torque consistency, normalized causal-wake pullback, section stability, retained energy routing, and non-minimal competitors are not yet evaluated. The retained candidate is therefore blocked rather than forbidden.

Promotion decision. Defer with blocker. Promote only after at least one finite retained candidate set has populated root, wake, torque, phase, stability, and routing rows, and after the deterministic branch-selection residual can compare all evaluable retained candidates.

## Instance Inputs

Fix the minimal transition window

$$
W_{\min}=[t_i,t_f],
$$

the reduced pre-branch chart $B_{\min}^-$, and the coupling datum

$$
\Gamma_{\min}
=
\left(
+1,
\Delta E_{\mathrm{tx}},
\Delta\mathbf J_{\mathrm{tx}},
\hat{\mathbf a},
\mathrm{Geom}_{\min}
\right).
$$

The retained budget is the smallest budget that can represent one continued branch word, one layer-retune block for each layer, and the two inner self-hit rows named by the reduced minimal certificate:

$$
N_{\min}
=
\left(
N_{\mathrm{act}}^{\min},
N_{\mathrm{inact}}^{\min},
N_{\mathrm{fold}}^{\min},
N_{\mathrm{sep}}^{\min},
N_{\mathrm{grp}}^{\min},
N_{\mathrm{route}}^{\min},
N_{\mathrm{box}}^{\min}
\right).
$$

The present instance does not assert that $N_{\min}$ is globally minimal. It is a local audit budget for replaying the already-solved reduced branch inside the finite-candidate-set contract.

## Candidate Set

The generated set for this reduced instance is

$$
\mathcal A_{N,\min}
\left(
B_{\min}^-,
\Gamma_{\min},
W_{\min}
\right)
=
\{\mathfrak a_{\min}\}.
$$

The retained candidate record is

$$
\mathfrak a_{\min}
=
\left(
B_{\min}^+,
\boldsymbol{\Delta I}_{\min},
\mathrm{core},
\mathfrak m_{B_{\min}^+},
\lambda_{\min},
\mathcal P_{\min}^{\mathrm{red}},
\mathcal Q_{\min}^{\mathrm{iso}},
\upsilon_{\min}
\right),
$$

with

$$
\boldsymbol{\Delta I}_{\min}
=
\left(
\Delta I_{\text{inner}}^{\min},
\Delta I_{\text{middle}}^{\min},
\Delta I_{\text{outer}}^{\min},
\Delta I_{\text{wake}}^{\min}
\right).
$$

The reduced certificate supplies the conditional algebraic rows

$$
\mathcal R_I^{B_{\min}}=0,
\qquad
\mathcal R_{\mathbf J}^{B_{\min}}=\mathbf 0,
\qquad
\mathcal R_{\perp}^{B_{\min}}=\mathbf 0,
$$

under the fixed-normal, no-transport, no-retained-wake assumptions recorded in [minimal-four-substep-certificate-instance.md](minimal-four-substep-certificate-instance.md). Those rows identify the candidate. They do not make it evaluable for deterministic branch selection.

## Audit Partition

The instance audit partition is

$$
\mathcal A_{N,\min}^{\mathrm{eval}}=\varnothing,
\qquad
\mathcal A_{N,\min}^{\mathrm{blk}}=\{\mathfrak a_{\min}\},
\qquad
\mathcal A_{N,\min}^{\mathrm{excl}}=\varnothing.
$$

Equivalently,

$$
\upsilon_{\min}=\mathrm{blocked},
\qquad
\mathfrak a_{\min}\in\mathcal A_{N,\min}^{\mathrm{blk}}.
$$

The candidate is not locally excluded because no row proves an impossible branch, invalid parity, unsourced nonzero wake term, or forbidden routing event. It is blocked because the retained data needed by the branch-selection residual remain absent.

Reduced solver projection 2026-06-20. [tri-binary-offset-family-runner.mjs](../../../scripts/angular-momentum/tri-binary-offset-family-runner.mjs) now supplies a reduced branch-chart projection for the $(f-1,f,f+2)$ candidate family and the $(f-1,f,f+1)$ control. This adds machine-readable proxy evidence for sampled root population, sampled active-row lineage, same-row force / partition / torque / wake diagnostic row IDs, Jacobian floor, outer speed, middle hinge, inner self-hit, integer-cycle phase closure, solver phase-at-hit rows, the index-level self-root parity target, and the clean energy-frequency target $\omega_\ast$. It selects `index-ratio:f2` as the first partial retained-lineage / phase / torque-wake diagnostic payload because that case has the largest positive inner self-hit span separation. The selected time-window torque probe adds 65 trapezoidal fixed-receiver samples over $W$ on the same endpoint row IDs, giving residual norms $3.009907861145633\times10^{-14}$ for the outer row, $0.23789379538011096$ for the middle row, and $0.13919373729527945$ for the inner row under the unit diagnostic convention. The older work-integral wake reconstruction is populated only as a diagnostic: the layer torque integral sum has $z=0.09870005808480142$, so the no-boundary wake-torque reconstruction has $z=-0.09870005808480142$. The selected binary-to-binary path-history probe adds 32 linearized path segments per layer, 96 path rows, and 9,216 source/receiver segment-pair checks, producing 1,477 candidates and 606 refined roots/hits across all nine layer-pair channels without truncation. The replayed binary-to-binary root-ledger detail pass builds 2,612 detail rows for 950 sampled hit candidates, including 606 active-root detail rows and 1,056 inactive-gap rows, with maximum active normalized residual $9.896914280289656\times10^{-14}$. The replay now classifies 941 chronological snapshot edges through the solver root-ledger transition classifier, producing 775 transitions: 379 retained, 173 appeared, 174 disappeared, 49 folded, and no ledger-rerun rows. Inactive-gap margins are populated with 1,056 finite gap rows, maximum width $0.1963495408493623$, and mean width $0.13760504931328713$. All nine layer-pair channels have some retained hit-time coverage, but their common retained time-domain intersection has no positive width; it only touches at two hinge-point candidates, $t=1.3744467859455345=7\pi/16$ and $t=1.5707963267948966=\pi/2$, with cycle fractions $7/32$ and $1/4$. The point-event witness pass populates all nine layer-pair witnesses at both hinge candidates, with the same retained root key `2856731379702547500` and boundary-only incidence in every channel. The point-event diagnostic separates the three diagonal identity witnesses from the six off-diagonal force-bearing channels. At both hinge candidates, all three diagonal identity witnesses populate, all six off-diagonal force-bearing endpoint diagnostics populate, and the off-diagonal unit point-torque cancels below the candidate tolerance $10^{-12}$: $2.7755575615628914\times10^{-16}$ at $7\pi/16$ and $2.7755575615628914\times10^{-17}$ at $\pi/2$. The candidate point-event admissibility row therefore passes at both hinge candidates. The branch-transport incidence diagnostic also passes at the layer-role level for both hinges. The $7\pi/16$ hinge remains pair-map count-blocked, with one incoming-only channel, two outgoing-only channels, and same-source endpoint residual $0.47994903798433036$ on its only attempted match. The $\pi/2$ hinge now has a populated topology pair-map: two incoming-only channels and two outgoing-only channels match by one same-source middle route and one same-receiver middle route. It also has one middle field-speed hinge-capture candidate: the middle layer has speed residual $0$ against tolerance $0.015$, both pair-map routes run through the middle layer, and two of two hinge-chart rows pass with maximum chart residual $0$. It is still delayed-endpoint-geometry blocked because only one of two endpoint-continuity rows passes: the same-receiver middle residual is $0$, while the same-source middle row has source-point residual $0.2032833773475938$, middle emission-clock jump $0.2085874165895798$, wrapped middle phase jump $0.4171748331791605$, and maximum causal-endpoint-to-hinge-chart residual $0.6280004778252143$ against tolerance $10^{-12}$. A single-f retained scan over `index-ratio:f3` through `index-ratio:f8` did not rescue the family: f=3 and f=5 through f=8 have no common retained hinge point, while f=4 has one retained hinge point but no topology pair-map because all four one-sided channels are incoming-only. These rows do not change the audit partition above because the point-event, transport-incidence, topology pair-map, hinge-time chart, and middle field-speed hinge-capture rows are candidate-only with `retainedBranchClaim=false`, only the `outer->outer` channel carries a common active root key across its whole replay path, the other eight layer-pair channels have only partial retained chains, the middle and inner fixed-receiver torque residuals are nonzero, the diagnostic wake reconstruction is nonzero before any boundary term, the inner rank-zero samples coexist with additional active roots over part of $W$, and time-integrated retained torque consistency, binary-to-binary retained phase lock, vector partition, energy routing, section stability, and retained competitor rows remain missing. The machine-readable blocker is now narrower: torque consistency requires a retained point-event rule, geometrically continuous branch-transport pair-map, or retained chart row that authorizes hinge-time chart transport despite the same-source delayed-emission discontinuity or upgrades those boundary-only hinge contacts into an accepted retained point event; wake completion now requires an action-boundary wake-energy increment law on the accepted normalized boundary charge and accepted retained crossing-domain pullback.

Retained-chart feasibility update. The same runner now adds a fail-closed zero-slack retained-chart test for the $\pi/2$ middle field-speed hinge. The result is `retained_chart_feasibility_zero_slack_fails_compensation_payload_missing`: one same-source middle route requires compensation, `zeroSlackRetainedChartNoGo=true`, maximum required endpoint compensation norm is $0.6280004778252143$, maximum required endpoint-pair residual is $0.2032833773475938$, maximum required clock retune is $0.2085874165895798$, and maximum required phase compensation is $0.4171748331791605$. The compensated retained-chart payload inventory is still blocked, but its row-set evidence is narrower and stronger: `row_set_identity` is now a candidate payload because all nine $\pi/2$ hinge-pair witnesses share one common root key, `2856731379702547500`, while the global retained row-set identity over $W$ remains missing. The root-payload interval enclosure is `hinge_common_root_interval_point_only_no_common_side`: all nine pairs have common-root intervals, but their intersection is exactly $t=\pi/2$ with maximum common width $0$, no common left-sided interval, and no common right-sided interval. The branch-route feasibility row `aaa-tri-binary-hinge-root-branch-transport-route-feasibility.v1` now sharpens that blocker: `candidateRoutePass=true`, `zeroSlackRoutePass=false`, and `compensationRequiredMatchCount=1`. Both middle branch-map routes stitch positive-width one-sided root intervals through the same root key; the same-receiver route is zero-slack, while the same-source route has one-sided width $0.09817477042468115$ on each side and remains endpoint / clock compensation blocked. The route-payload certificate `aaa-tri-binary-compensated-route-payload-certificate.v1` is now fail-closed as `compensated_route_payload_complete_formal_acceptance_blocked`: `bounded_undeclared_route_slack`, `transport_angular_momentum_increment`, `root_energy_increment`, and `recoil_channel_data` are populated as diagnostic route fields; no route fields remain missing. The transport rows report maximum unit angular-momentum norm $0.09754069445241503$ with upper bound $0.3080684096622172$; the root-energy rows report maximum unit-action increment $0.4171748331791596$; the recoil rows report maximum unit-balance angular-momentum norm $0.09754069445241503$; the bounded slack rows report maximum bounded geometric slack $0.6280004778252143$, maximum bounded clock retune $0.2085874165895798$, and maximum bounded phase slack $0.4171748331791605$. The candidate payloads are now `row_set_identity` and `route_payload`; partial payloads are `root_payload`, `phase_payload`, `wake_payload`, and `torque_payload`; missing payload is `partition_payload`; blocking payloads are `partition_payload` and `stability_payload`.

The wake target row now gives required boundary-charge norm $0.09870005808480142$, a unit action-kernel wake-charge candidate with candidate residual $0$, a route-authorized pullback-domain target over two route rows and the same three endpoint row IDs, an action-kernel normalization-convention candidate with `eta=0.024543692606170286`, `epsilonC=0.11995659448597733`, endpoint convention `endpoint_clear_receiver_gradient_spatial_charge`, accepted chart-restricted crossing-domain rows with 2/2 route rows accepted, minimum $\eta$ route margin $0.07363107781851086$, minimum lever-arm regularization margin $0.35986978345793197$, a finite endpoint-clear kernel-gradient candidate evaluation with residual $0$, `aaa-tri-binary-master-equation-characteristic-tail-pullback-candidate.v1`, `aaa-tri-binary-pair-radial-characteristic-tail-constrained-solve.v1`, `aaa-tri-binary-characteristic-tail-coefficient-quadrature-target.v1`, `aaa-tri-binary-characteristic-tail-single-coefficient-sign-pattern-solve.v1`, `aaa-tri-binary-layer-polarity-sign-feasibility-target.v1`, `aaa-tri-binary-source-receiver-polarity-row-binding-target.v1`, `aaa-tri-binary-route-derived-source-receiver-polarity-metadata-target.v1`, `aaa-tri-binary-route-local-polarity-acceptance-target.v1`, and `aaa-tri-binary-route-local-coefficient-acceptance-target.v1`.

The free finite gradient remains non-radial against pair geometry (`pairRadialAlignmentPass=false`, maximum pair-radial residual $2.084719821603678$), but the side-split radial-constrained solve reconstructs target charge $(0,0,0.09870005808480142)$ with residual $0$ by `axis_aligned_z_least_norm`. Its maximum absolute side coefficient is $4.104328256986956$, and its maximum absolute signed $\delta_\eta$ candidate is $1.1463938810547583$. The coefficient/quadrature target evaluates all four side rows on-characteristic with maximum $|g|=5.1958437552457326\times10^{-14}$ under the Gaussian $\delta_\eta(g)$ convention; the single-coefficient sign-pattern solve reconstructs the target charge with one positive common coefficient $0.19201858530431484$ and side sign pattern $(-1,-1,-1,-1)$ at residual $0$. The route-local polarity target accepts the canonical middle-positive assignment `outer=-1`, `middle=1`, `inner=-1` for the four route-local characteristic-tail wake rows: `middle->outer` and `middle->inner` are same-source middle rows with source sign $+1$ and receiver sign $-1$, while `outer->middle` and `inner->middle` are same-receiver middle rows with source sign $-1$ and receiver sign $+1$.

The coefficient target deliberately does not accept the stronger direct rowwise common-$\kappa\sigma$ claim: direct accepted row count is $0/4$ and maximum coupling residual is $0.2576215812415463$. The new solver path now accepts the route-local row-amplitude requirement target as `route_local_least_norm_boundary_charge_row_amplitude_law_accepted`: four of four required amplitudes are finite, and the least-norm boundary-charge amplitude law reconstructs them with target residual $0$ and maximum row residual $0$. The same-source compensation-required rows require amplitudes $0.30070373454018245$ and $0.3672995792422465$; the same-receiver zero-slack rows require $0.12884270880640172$ and $-0.3416491993900621$. The algebraic $\delta_\eta$ identity still reconstructs the same amplitudes, while 120 simple non-tautological single-scalar geometry candidates remain rejected; the best rejected candidate is `sqrtUnitAngularContributionNorm:angularOrientation` with maximum residual $0.0842840557121674$. The current wake payload is `wake_payload_boundary_charge_pullback_accepted_wake_energy_law_missing`: the normalized action-kernel wake charge is accepted, the route-authorized retained crossing-domain pullback is accepted, and the wake-energy increment target is `wake_energy_increment_target_populated_action_boundary_law_missing`. That target rejects zero wake energy, rejects reusing the $0.4171748331791596$ root-energy diagnostic as retained wake energy, rejects treating the boundary-charge norm $0.09870005808480142$ as energy without a transaction frequency or action-boundary derivative, and evaluates the $\omega_\ast$-weighted boundary-charge candidate as $0.2714251597332039$ using $\omega_\ast=2.75$ while blocking it because $\omega_\ast$ is not an accepted $\omega_{\text{tx}}$, the action scale is undeclared, and the action-kernel energy derivative is unevaluated. The next smallest closure target remains `wake_payload` before section stability can be evaluated. This falsifies immediate zero-slack chart promotion for the current packet; it does not exclude a later compensated retained chart that populates wake, partition, and stability payloads on the same retained event and retained interval.

Current polarity-metadata disposition. The sampled phase metadata cross-check remains `source_receiver_polarity_phase_metadata_source_mismatch_and_receiver_missing`: it matches the two middle-source rows, mismatches the two outer/inner source rows, and supplies no receiver signs, so it is rejected as an acceptance source. The independent route-derived metadata target is `route_derived_source_receiver_polarity_metadata_candidate_matches_binding` over all four bound rows, and the route-local acceptance target now promotes that metadata to `route_local_source_receiver_polarity_metadata_accepted` for the characteristic-tail wake rows only. This does not accept the global retained branch, the normalized action-kernel charge, retained pullback, or wake energy.

## Row Verdicts

| Row family | Instance value | Verdict |
| --- | --- | --- |
| Candidate identity | One reduced core candidate $\mathfrak a_{\min}$ is named. | Populated. |
| Scalar partition | $\mathcal R_I^{B_{\min}}=0$ in the reduced certificate. | Conditional pass. |
| Vector partition | $\mathcal R_{\mathbf J}^{B_{\min}}=\mathbf 0$ in the reduced certificate. | Conditional pass. |
| Transverse bookkeeping | $\mathcal R_{\perp}^{B_{\min}}=\mathbf 0$ in the reduced certificate. | Conditional pass. |
| Root replay | A reduced circular-root proxy is now populated, but individual continued active-root rows are not supplied through the full retained chart. | Blocked. |
| Phase lock | Solver phase-at-hit rows are now populated for the selected reduced payload, but binary-to-binary retained receiver phase, geometric phase, wake-return delay, and branch-domain margins are not populated. | Blocked. |
| Torque consistency | The force, partition, torque, and wake diagnostic rows now share sampled row IDs. A 65-sample fixed-receiver torque stream gives outer residual $3.009907861145633\times10^{-14}$ but middle residual $0.23789379538011096$ and inner residual $0.13919373729527945$; the binary-to-binary path-history replay now has 606 active-root detail rows, 1,056 inactive-gap rows, 775 classified transitions, and 379 retained transitions. Both hinge candidates $7\pi/16$ and $\pi/2$ have all nine pair witnesses, a shared retained root key, boundary-only incidence, three populated diagonal identity witnesses, six populated off-diagonal force-bearing diagnostics, passing candidate point-event admissibility rows, and layer-balanced branch-transport incidence. The $\pi/2$ topology pair-map is populated, and its middle field-speed hinge-capture row is chart-continuous: the middle speed residual is $0$, both pair-map routes run through the middle layer, two of two chart rows pass, and the maximum chart residual is $0$. It is delayed-endpoint-geometry blocked: one same-receiver endpoint-continuity row passes with residual $0$, while the same-source middle row has source-point residual $0.2032833773475938$, middle emission-clock jump $0.2085874165895798$, wrapped middle phase jump $0.4171748331791605$, and maximum causal-endpoint-to-hinge-chart residual $0.6280004778252143$ against tolerance $10^{-12}$. The branch-route feasibility row now shows both middle pair-map routes stitch positive-width one-sided root intervals through the common root key, but one route still needs endpoint and clock compensation. They remain blocked because no accepted retained point-event rule, zero-slack geometrically continuous branch-transport pair-map, positive-width common retained time domain, wake payload, partition payload, or section-stability payload exists. | Blocked. |
| Retained chart feasibility | The zero-slack retained-chart feasibility diagnostic fails for the $\pi/2$ middle field-speed hinge: one same-source middle route requires endpoint and phase compensation. The compensated payload inventory is blocked, with candidate `row_set_identity` at the hinge event, point-only `root_payload` interval evidence with max common width $0$ and no common one-sided interval, branch-route candidate evidence with `candidateRoutePass=true`, `zeroSlackRoutePass=false`, and one compensation-required match, a complete route-payload certificate that now populates bounded route slack, unit transport angular momentum, unit-action root energy, and unit-balance recoil-channel data, partial `root_payload`, `phase_payload`, `wake_payload`, and `torque_payload`, missing `partition_payload`, blocking `partition_payload` and `stability_payload`, and wake completion as the next smallest closure target. | Blocked. |
| Causal-wake pullback | A diagnostic wake torque sample is attached to each sampled row ID, and the older no-boundary work-integral wake reconstruction now gives $z=-0.09870005808480142$. The route-authorized wake target has required boundary-charge norm $0.09870005808480142$, a unit action-kernel wake-charge candidate with residual $0$, a pullback-domain target over two route rows and the same three endpoint row IDs, an action-kernel normalization-convention candidate with candidate scales `eta=0.024543692606170286` and `epsilonC=0.11995659448597733`, accepted chart-restricted crossing-domain rows with 2/2 route rows accepted, a finite endpoint-clear kernel-gradient candidate evaluation with residual $0$, a populated Master-Equation characteristic-tail pair-radial pullback target, a side-split pair-radial constrained solve that reconstructs the target charge with residual $0$, coefficient/quadrature rows that evaluate $\delta_\eta(g)$ on-characteristic with maximum $|g|=5.1958437552457326\times10^{-14}$, a single-coefficient sign-pattern solve with common coefficient $0.19201858530431484$, sign pattern $(-1,-1,-1,-1)$, and residual $0$, a route-local source/receiver polarity acceptance target with canonical assignment `outer=-1`, `middle=1`, `inner=-1`, a route-local row-amplitude requirement target that accepts the least-norm boundary-charge amplitude law with maximum row residual $0$, and a route-local coefficient acceptance target that is accepted through that amplitude law. The normalized action-kernel boundary charge and retained crossing-domain pullback are accepted, and the remaining blocker is `wake_energy_increment_target_populated_action_boundary_law_missing` on the same retained active rows. | Blocked. |
| Stability | Inactive-gap margins are populated for the replayed binary-to-binary detail rows, but section stability is not evaluated on a common retained row set. | Blocked. |
| Energy routing | The reduced energy-frequency residual is not paired with a declared route. | Blocked. |
| Non-minimal competitors | No finite family of competing retained generator words has been evaluated. | Blocked. |
| Local exclusion | No row proves contradiction or forbidden routing. | No exclusion. |

The deterministic branch-selection residual is therefore not evaluated:

$$
\mathcal R_{\mathrm{sel}}(\mathfrak a_{\min})
\quad
\text{is blocked, not passing.}
$$

## Use In The Workstream

This instance is useful because it makes the next branch-selection job concrete. The next successful pass must replace

$$
\mathcal A_{N,\min}^{\mathrm{eval}}=\varnothing
$$

with a nonempty finite candidate set whose row-lineage maps, interval payloads, quotient witnesses, and retained wake/routing rows all feed the same residual vector $\mathcal R_{\mathrm{sel}}$. Until then, the minimal four-substep branch remains a reduced diagnostic candidate rather than a selected physical branch.
