# Branch Provider Evidence Report

Status: `priority-only-current-candidates-fail-closed`

## Purpose

`branch_provider_evidence_report/v0` is the shared provider-boundary audit for
top-six ranks that need one same-domain branch-bearing object before they can
consume downstream rows. It is not a new physics gate and does not close any
rank by itself. It records whether current solver, geometry-export, branch,
pressure, normal-candidate, or angular-momentum rows already carry the minimum
provider fields:

| Field | Requirement |
| --- | --- |
| `provider_source_status` | `accepted_non_fixture_source`, not a toy, fixture, replay-only row, proxy diagnostic, or status shell |
| `same_domain_record_ref` | Stable record proving the fields are carried on one same-domain row |
| `branch_certificate_ref` | Retained branch certificate reference |
| `active_root_or_live_ledger_identity` | Active-root ledger or bounded-speed live-ledger identity |
| `branch_local_projection_or_normalization_identity` | Branch-local projection, source-map, quotient, or normalization identity |
| `conservation_pullback_hash` | Required by the rank 2 `accepted_transition_source` consumer |

The same executable report now also emits
`same_domain_branch_provider_object_construction_attempt/v0`. That construction
attempt is a priority-only field inventory for the same-domain branch-bearing
provider object; it is not provider acceptance. It keeps
`provider_ready_authorized_by_this_attempt=false` and
`downstream_consumer_authorization=false`.

The construction attempt additionally requires:

| Field | Requirement |
| --- | --- |
| `branch_rows_ref` | Explicit branch rows such as `P_-` / `P_+` or `P_b` before any aggregate `P` erases branch identity |
| `branch_labels` | Branch labels for the explicit branch rows |
| `branch_weights_or_intervals` | Branch weights or intervals for the explicit branch rows |
| `projection_map_ref` | Projection-map reference for the same-domain branch-bearing row |
| `pushforward_operator_ref` | Pushforward operator reference for the same-domain row |
| `normalization_identity_ref` | Normalization identity reference before aggregate `P` is consumed |
| `source_term_refs_upstream_of_aggregate_p` | Source-term references upstream of aggregate `P` |
| `aggregate_erasure_negative_control_ref` | Negative control showing aggregate-only `P` is rejected when branch identity is erased |

## Current Executable Result

Executable artifact:
[branch-provider-evidence-report.mjs](../../../scripts/solver-audits/branch-provider-evidence-report.mjs)

Current manifest:
[branch-provider-current-candidates.json](../../../scripts/solver-audits/fixtures/branch-provider-current-candidates.json)

Focused test:
[branch-provider-evidence-report.test.js](../../../tests/branch-provider-evidence-report.test.js)

The current manifest evaluates eight candidate rows:

| Candidate | Consumer rank(s) | Current source status | First blocker |
| --- | ---: | --- | --- |
| `field-speed-action-increment-fixture-source` | 2 | `fixture_shape_only` | `accepted_non_fixture_source_missing` |
| `pressure-row-current-status` | 4 | `diagnostic_only` | `accepted_non_fixture_source_missing` |
| `pressure-row-fe-silicate-toy-partial` | 4 | `toy_replay_only` | `accepted_non_fixture_source_missing` |
| `pressure-row-a0-branch-source-frontier-partial` | 4 | `tier0_continuation_ready_not_accepted_history` | `accepted_non_fixture_source_missing` |
| `bounded-speed-normal-candidate-fixture` | 5 | `fixture_normal_candidate` | `accepted_non_fixture_source_missing` |
| `moving-retained-branch-status-shell` | 6 | `status_shell_only` | `accepted_non_fixture_source_missing` |
| `tri-binary-torque-wake-same-row-diagnostic` | 2, 6 | `solver_proxy_diagnostic` | `accepted_non_fixture_source_missing` |
| `h39-aggregate-p-provider-preaggregation-construction-attempt` | 2, 4, 5, 6 | `target_only_not_accepted_source` | `accepted_non_fixture_source_missing` |

The emitted report returns:

| Report field | Current value |
| --- | --- |
| `provider_verdict` | `same_domain_branch_provider_missing` |
| `first_failure` | `accepted_non_fixture_source_missing` |
| `candidate_count` | 8 |
| `provider_ready_consumer_count` | 0 |
| `provider_object_construction_attempt.status` | `same_domain_branch_provider_object_construction_blocked` |
| `provider_object_construction_attempt.ready_candidate_count` | 0 |
| `provider_object_construction_attempt.first_failure` | `accepted_non_fixture_source_missing` |
| `provider_object_construction_attempt.consumer_construction_attempt_readouts` | 4 H39 readouts for ranks 2, 4, 5, and 6 |
| `provider_object_construction_attempt.candidate_attempts[].source_contract_readout` | H39 directed-rounded shared-domain provider boundary replay verified, provider certification open, source-provenance refinement non-authorizing |

The H39 aggregate-`P` construction-attempt readouts bind ranks 2, 4, 5, and 6
to the same target-only row:
`h39-requested-y44-terminal-aggregate-p-provider-preaggregation-branch-bearing-audit`.
Each readout carries
`aggregate_erasure_negative_control_ref=aggregate-P-provider-probe-born-aggregate-only`,
keeps `construction_attempt_ready=false`, keeps
`provider_ready_authorized_by_this_attempt=false`, and keeps
`downstream_consumer_authorization=false`. Rank 2 alone also records
`consumer_specific_missing_fields=["conservation_pullback_hash"]`.

## Candidate Source-Contract Readout

The H39 construction attempt now carries
`branch_provider_candidate_source_contract_readout/v0` with artifact id
`h39-directed-rounded-shared-domain-provider-boundary-replay-source-contract-readout`.
It records that the directed-rounded shared-domain provider boundary replay is
verified across five shared source cells:
`speed.0.first-y`, `speed.1.first-y`, `speed.2.first-y`,
`speed.3.first-y`, and `speed.4.first-y`. The readout records 17 boundary
checks, `source_term_provider_probe_same_domain_contract_ready=true`,
`source_term_provider_probe_same_radius_contract_ready=true`, and
`terminal_row_enclosure_boundary_replay_verified=true`.

This is not provider acceptance. It keeps
`directed_rounded_shared_domain_provider_certified=false`,
`source_term_provider_probe_rows_certify_directed_rounded_source=false`,
`source_term_provider_probe_term_width_realization_closed=false`, and
`provider_ready_authorized_by_this_readout=false`. The open blocker kinds are
`source_term_provider_directed_source_certification_open` and
`source_term_provider_term_width_realization_open`.

The readout also carries
`branch_provider_candidate_source_provenance_refinement/v0`. This records the
current H39 narrowing without changing the official blockers. Term width has
been reduced to signed-radius source-provenance machinery, the signed-radius
subinterval emitter primitive is materialized, source-term producer-image fields
are projected, and the lambda terminal witness branch intervals are available.
The nested `source_provenance_emitter_target` records the signed-radius
subinterval emitter primitive target while keeping
`source_provenance_emitter_materialized=false` and
`provider_ready_authorized_by_this_target=false`.
The replay still keeps
`directed_rounded_source_provenance_still_open=true`,
`source_provenance_certificate_fields_present=false`,
`source_provenance_emitter_materialized=false`, and
`source_map_provider_branch_intervals_available=false`. The current H39 blocker
is `same-domain-source-map-provider-object-branch-intervals-needed`, with
`current_primary_missing_object_kind=source-map-provider-object-branch-intervals`
and `next_evidence_object="same-domain source-map provider-object branch
intervals on every terminal row"`. It keeps
`provider_ready_authorized_by_this_refinement=false`.

The refinement now also carries
`branch_provider_candidate_source_map_provider_object_branch_interval_readout/v0`
as a negative-control readout. It records 15 terminal rows and 30 branch rows
while keeping `source_map_provider_branch_intervals_available=false`,
`provider_object_branch_intervals_present=false`, and
`accepted_provider_object_branch_interval_count=0`. The readout explicitly
rejects lambda terminal witness branch intervals, aggregate-$P$-only provider
rows, variable-owned alpha candidates, and row-local expression branch feeds as
provider-object branch intervals. The missing identity kinds remain the
same-domain branch-bearing $P_b$ map, branch projection or alpha map,
pushforward operator reference, and normalization identity reference. It keeps
`provider_ready_authorized_by_this_readout=false` and
`downstream_consumer_authorization=false`.

The same readout now carries the target-only
`branch_provider_candidate_source_map_provider_object_branch_interval_target/v0`.
That target fixes the next positive evidence object without authorizing
provider readiness: the five shared source cells `speed.0.first-y` through
`speed.4.first-y`, terminal $h$ indexes 37, 36, and 35, and both branch rows
`P_-` and `P_+` for every terminal row. The target therefore names exact
terminal rows such as `speed.0.first-y:h37` and exact branch rows such as
`speed.0.first-y:h37:P_-`, for 15 terminal rows and 30 branch rows total.
Each branch row still needs both `source_map_provider_branch_intervals` and
`provider_object_branch_intervals`, the same four identity kinds, and
same-record binding across `same_domain_record_ref`, `terminal_graph_cell_id`,
`terminal_h_index`, `branch`, `source_y_order`,
`required_xi_derivative_order`, both interval payload fields, the $P_b$ map,
the branch projection or alpha map, `pushforward_operator_ref`, and
`normalization_identity_ref`.

The executable target distinguishes the already available lambda terminal
witness intervals from the still-missing provider-object branch intervals.
Lambda terminal witness branch intervals are comparison witnesses only; they do
not carry the same-domain source-map/provider-object branch identity. It keeps
`provider_ready_authorized_by_this_target=false` and
`downstream_consumer_authorization=false`.

The same readout now emits
`branch_provider_candidate_source_map_provider_object_branch_split_map_availability/v0`.
This availability object attempts the next branch split-map object for the
required 15 terminal rows and 30 branch rows. The current branch-provider
manifest does not yet emit
`source_map_provider_object_branch_split_map_available_terminal_row_count`, so
the availability object reports
`status=source-map-provider-object-branch-split-map-source-field-not-emitted`,
`observed_available_terminal_row_count=0`, and
`branch_split_map_populated=false`. It keeps
`provider_ready_authorized_by_this_availability=false` and
`downstream_consumer_authorization=false`.

The same availability object now reads the H39 producer-side field
`provider_object_branch_antisymmetric_equation_available_terminal_row_count`
from the terminal-expression-level source-map provider-object branch
antisymmetric equation extractor. That extractor is emitted, but it reports
`available_terminal_row_count=0`, `missing_terminal_row_count=15`, and
`all_required_terminal_rows_missing=true` for the 15 terminal rows
`speed.{0..4}.first-y:h{37,36,35}`. This is an explicit absence readout, not
provider acceptance. The readout now carries exact
`missing_terminal_row_ids` for all 15 terminal rows and exact
`missing_branch_row_ids` for all 30 required provider-object branch rows,
including both `P_-` and `P_+` on each terminal row. The smallest next evidence
object is still a same-domain provider-object branch antisymmetric equation
$A_P=P_- - P_+$ or explicit expression-level `P_-` / `P_+` branch rows on all
15 terminal rows.

The same readout now emits
`branch_provider_candidate_source_map_provider_object_branch_interval_source_field_availability_audit/v0`.
This compact source-field audit inspects the H39 diagnostic field families that
could feed the provider object: the expression-level producer, the
antisymmetric equation extractor, the branch split-map underdetermination
readout, terminal-row provider-object replay, and provider-object branch
residual extractor. It does not materialize provider-object branch intervals.
Its first missing provider field is
`source_map_provider_object_branch_split_map_available_terminal_row_count`,
with the producer-side antisymmetric equation count emitted as `0 / 15`,
followed by the still-missing candidate/admissible/actual branch intervals, the
two interval payloads, and the four identity families. It keeps
`provider_ready_authorized_by_this_audit=false` and
`downstream_consumer_authorization=false`.

The same readout now carries
`branch_provider_candidate_producer_side_same_domain_branch_row_evidence_target/v0`.
This target names the producer-side object that is still absent: a same-domain
expression-level provider-object branch antisymmetric equation
$A_P=P_- - P_+$, or explicit expression-level `P_-` / `P_+` branch rows that
determine $u_P=A_P/2$, on all 15 terminal rows. It repeats the exact terminal
row IDs, exact branch row IDs, same-record binding fields, identity families,
and interval payloads required for the object. Its negative control is
`aggregate-P-provider-probe-born-aggregate-only`: aggregate `P`, lambda terminal
witness intervals, branch-attributed source terms, and row-local branch feeds
remain rejected unless they carry the same-record `P_-` / `P_+` provider-object
rows, both interval payloads, the $P_b$ map, branch projection or alpha map,
pushforward operator reference, and normalization identity. It keeps
`provider_ready_authorized_by_this_target=false` and
`downstream_consumer_authorization=false`.

## Receiver-Normal First-Derivative Readout

The H39/theta3minus provider path does not yet populate
`receiver-normal-retained-branch-family-first-derivative/v0`. The closest
available object is the target-only H39 provider-object branch row target above:
five shared source cells, 15 terminal rows
`speed.{0..4}.first-y:h{37,36,35}`, and 30 branch rows
`speed.{0..4}.first-y:h{37,36,35}:P_-` / `P_+`.

That object is useful because it names the branch-family candidate precisely,
but it is still an absence readout. The executable manifest reports:

| Field | H39 executable readout |
| --- | --- |
| `source_contract_boundary_verified` | `true` across five shared source cells |
| `provider_row_source_kind` | `directed-rounded-same-domain-h38-source-map-residual-provider`; source-map provenance, not a retained causal-root force/action record |
| `lambda_terminal_witness_branch_intervals_available` | `true`, comparison witness only |
| `source_map_provider_branch_intervals_available` | `false` |
| `provider_object_branch_intervals_present` | `false` |
| `accepted_provider_object_branch_interval_count` | `0` out of required `30` |
| `provider_object_branch_antisymmetric_equation_available_terminal_row_count` | `0` out of required `15` |
| `explicit_provider_object_branch_row_count` | `0` out of required `30` |
| `source_term_provider_branch_attributed_term_row_count` | `0` |
| `all_provider_object_branch_antisymmetric_equations_missing` | `true` |

Executable source-field ledger:

| Stage | Executable field or readout | Current value | Receiver-normal consequence |
| --- | --- | --- | --- |
| Branch split map | `source_map_provider_object_branch_split_map_available_terminal_row_count` | source field not emitted; observed `0 / 15` | No same-domain $P_b$ branch split map exists for the retained branch-family candidate. |
| Branch antisymmetric equation | `provider_object_branch_antisymmetric_equation_available_terminal_row_count` emitted by `terminal-expression-level-source-map-provider-object-branch-antisymmetric-equation-extractor` | emitted absence; `0 / 15`, with all exact terminal rows missing | No $A_P=P_- - P_+$ row is available to determine the provider-object branch moment. |
| Explicit provider-object branches | `explicit_provider_object_branch_row_count` | `0 / 30` | No explicit `P_-` / `P_+` provider-object branch rows can be bound to a retained record. |
| Branch-attributed source terms | `source_term_provider_branch_attributed_term_row_count` | `0` | Aggregate `P`, lambda terminal witness intervals, variable-owned alpha candidates, and row-local expression feeds remain negative-control inputs, not accepted provider-object branches. |
| Identity payloads | `source_field_availability_audit.identity_families` | missing same-domain branch-bearing $P_b$ map, branch projection or alpha map, `pushforward_operator_ref`, and `normalization_identity_ref` | Candidate branch feeds cannot be admitted as provider-object branch rows. |
| Receiver-normal derivative binding | `receiver-normal-retained-branch-family-first-derivative/v0` rows | not emitted | No same-record $D_s$, $D_t$, $D_vD_s$, $D_vD_t$, or $D_vW^{\mathrm{rec}}$ can be consumed from this H39 target. |

Populated candidate diagnostics that remain rejected:

| Candidate diagnostic | Populated count | Rejected count or missing identity | Receiver-normal consequence |
| --- | --- | --- | --- |
| Variable-owned alpha branch feed | 15 terminal candidates and 45 alpha rows | `admissible_as_actual_provider_object_branch_source_terminal_row_count=0` | $A_{\mathrm{var}}$ is a finite candidate, not an accepted $A_P=P_- - P_+$ provider-object branch moment. |
| Row-local feed to provider-object $P_b$ identity audit | `candidate_provider_object_branch_pair_available_terminal_row_count=15` | `admissible_provider_object_branch_pair_terminal_row_count=0` | Candidate `P_-` / `P_+` intervals exist, but no same-domain identity proves they are the actual provider-object branches. |
| Provider-object $P_b$ pushforward operator audit | 45 term-pushforward comparison rows and 45 candidate term branch pairs | `same_domain_pushforward_operator_identity_available_terminal_row_count=0` and `same_domain_pushforward_normalization_identity_available_terminal_row_count=0` | Candidate branch terms are not admissible without the pushforward operator and normalization identity. |
| Aggregate $P$ preaggregation branch-bearing audit | five raw provider-probe rows and 15 raw provider-probe term rows | zero branch-label, branch-weight, branch-interval, projection-map, pushforward-operator, or normalization-field hits | The provider object is born aggregate-only before terminal replay, so it cannot supply a retained branch-family derivative record. |
| H39 coefficient-series source-map residual provider chain | five source-map residual H39 provider rows with same-domain, same-radius, interval-inclusion, and numerator-budget checks | source-provenance-only failure; no accepted $A_P$ or explicit `P_-` / `P_+` provider-object branch row and no retained causal-root derivative record | `h39-coefficient-series-provider-candidate-not-retained-record-preimage`: source-map residual provider candidates remain negative-control inputs for receiver-normal derivative evidence. |

Mapped against the receiver-normal first-derivative artifact, the same H39 row
therefore has this status:

| Artifact row | H39/theta3minus status |
| --- | --- |
| `retained_record_key` | Not populated. The H39 row has provider source cells, terminal $h$ indexes, and target branch labels, but no retained causal-root id, source/receiver ids, source-to-receiver direction, receiver time, source time or delay row, retained box, or force-row regulator state. |
| `variation_key` | Not populated for receiver-normal use. H39 names source-map derivative order and terminal graph coordinates, not the force/action variation $v$ consumed by $D_vD_s$, $D_vD_t$, and $D_vW^{\mathrm{rec}}$. |
| `receiver_normal_fields` | Missing. No same-record $D_s$, $D_t$, fixed sign labels, or $W^{\mathrm{rec}}$ are emitted on the H39 provider-object branch target. |
| `receiver_normal_derivatives` | Missing. No $D_vD_s$, $D_vD_t$, or reconstructed $D_vW^{\mathrm{rec}}$ interval is emitted. |
| `geometry_derivatives` | Missing for force/action use. The row has terminal graph/provider coordinates, not $D_vr_a$ and $D_v\hat{\mathbf r}_a$ or shell-braid $D_v\eta_a$ and $D_v\widehat{\mathbf R}_a$. |
| `force_kernel_derivative` | Missing. No $\mathbf B_a^{\mathrm{rec}}$ or $D_v\mathbf B_a^{\mathrm{rec}}$ row is emitted. |
| `branch_family_checksum` | Target-only. The exact 15 terminal rows and 30 `P_-` / `P_+` branch rows are named, but none is accepted as a provider-object branch interval and none is bound to a receiver-normal force/action consumer checksum. |
| `negative_controls` | Partially populated. The aggregate-erasure negative control rejects aggregate `P`, lambda terminal witness intervals, branch-attributed source terms, and row-local branch feeds without same-record `P_-` / `P_+` provider-object rows and identity payloads. |

Derivative-evidence verdict:

$$
\texttt{h39-receiver-normal-first-derivative-evidence-not-populated},
\qquad
\texttt{h39-provider-object-branch-rows-missing-before-receiver-normal-derivative}.
$$

The smallest H39/theta3minus evidence object is therefore not a force/action
derivative row yet. It is a two-stage obligation:

1. first, emit the producer-side same-domain provider-object branch rows:
   $A_P=P_- - P_+$ or explicit `P_-` / `P_+` rows, both interval payloads,
   the $P_b$ map, branch projection or alpha map, pushforward operator
   reference, normalization identity, and the already named 15-terminal /
   30-branch binding fields;
2. then bind that accepted provider object to a retained causal-root
   force/action record that emits $D_s$, $D_t$, fixed sign labels,
   $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_t$, reconstructed
   $D_vW^{\mathrm{rec}}$, geometry derivatives, and the same retained
   branch-family checksum consumed by the force/action packet.

Until both stages are present on the same retained record, H39/theta3minus
packets remain root-geometry, recurrence, or provider-provenance diagnostics.
They do not satisfy the receiver-normal first-derivative artifact and cannot
move force/action, action, power, wake-history, or retained-branch claims.

### H39 Retained-Record Handoff Row Target

Priority-only row target:
`h39-receiver-normal-retained-record-preimage-row/v0`.

This is not a new provider-acceptance gate. It is the smallest row shape that
would let an accepted H39 provider-object branch row become a candidate input to
`receiver-normal-retained-branch-family-first-derivative/v0` without losing
same-record identity.

| Handoff row field | Required payload | Current H39/theta3minus status |
| --- | --- | --- |
| `accepted_provider_object_branch_row_ref` | Accepted same-domain `P_-` / `P_+` provider-object row or $A_P=P_- - P_+$ row, with terminal row id, branch label, both interval payloads, $P_b$ map, branch projection or alpha map, `pushforward_operator_ref`, and `normalization_identity_ref`. | Missing. Candidate branch feeds exist, but no admissible provider-object branch row or pushforward identity exists. |
| `retained_causal_root_record_ref` | Stable retained causal-root force/action record that consumes the provider row: source/receiver ids, source-to-receiver direction, receiver time, source time or delay row, retained box, regulator state, and source artifact hash. | Missing. H39 names terminal source-map coordinates, not a retained causal-root force/action record. |
| `branch_family_binding` | Map from each H39 branch row `speed.{0..4}.first-y:h{37,36,35}:P_-` / `P_+` into the retained branch list $\mathcal{A}_{\mathcal B}$ consumed by the force/action packet, with a consumer checksum. | Target-only. The 30 branch rows are named, but none is accepted or checksummed as a retained force/action branch family. |
| `receiver_normal_fields` | Same-record $D_s$, $D_t$, fixed sign labels, and $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ on the retained causal-root record. | Missing. No H39 provider row emits $D_s$, $D_t$, or $W^{\mathrm{rec}}$. |
| `receiver_normal_derivative_fields` | Same-record $D_vD_s$, $D_vD_t$, and reconstructed $D_vW^{\mathrm{rec}}$ using the retained-record formula. | Missing. No H39 provider row emits force/action variation derivatives. |
| `geometry_derivative_fields` | Same-record $D_vr_a$ and $D_v\hat{\mathbf r}_a$, or the shell-braid specialization $D_v\eta_a$ and $D_v\widehat{\mathbf R}_a$. | Missing. H39 terminal graph/provider coordinates do not supply the force/action geometry derivative row. |
| `negative_control_status` | Reject aggregate `P`, lambda terminal witness intervals, variable-owned alpha candidates, row-local expression feeds, term-pushforward candidate rows, or source-map residual provider candidates unless the accepted provider-object branch row and retained causal-root record are both present. | Active. These are the populated-but-rejected diagnostics above. |

Failure statuses for this handoff row are:

| Status | Meaning |
| --- | --- |
| `h39-provider-object-branch-row-missing` | No accepted same-domain provider-object `P_-` / `P_+` branch row or $A_P=P_- - P_+$ row exists. |
| `h39-provider-object-retained-record-unbound` | An accepted provider-object branch row exists, but no retained causal-root force/action record consumes it on the same branch family. |
| `h39-retained-branch-family-checksum-missing` | The H39 branch list is not checksummed against the retained branch list consumed by force/action, action, power, wake-history, or Lipschitz rows. |
| `h39-receiver-normal-fields-missing` | The retained record lacks $D_s$, $D_t$, fixed signs, or $W^{\mathrm{rec}}$. |
| `h39-receiver-normal-derivative-fields-missing` | The retained record lacks $D_vD_s$, $D_vD_t$, or reconstructed $D_vW^{\mathrm{rec}}$. |
| `h39-provider-candidate-consumed-as-retained-record` | A variable-owned alpha candidate, row-local branch feed, term-pushforward candidate, source-map residual provider candidate, lambda terminal witness interval, or aggregate `P` row is consumed as if it were an accepted retained record. |

Packet-local H39 negative controls feeding this handoff row:

| Packet-local status | Rejected object | Reason it cannot populate the retained-record preimage row |
| --- | --- | --- |
| `h39-thirty-eighth-successor-not-retained-record-preimage` | Thirty-eighth-order $N_{38}$ successor coefficient or derivative-bound row | Producer-side provenance only; no accepted $A_P=P_- - P_+$ or explicit `P_-` / `P_+` provider-object branch row and no retained causal-root derivative record. |
| `h39-primitive-vector-provider-provenance-only-not-retained-record-preimage` | H39 primitive-vector replay with $\Lambda_{39}^{\mathrm R}<1$ or hybrid prefix-Cauchy order diagnostic feeding that replay lane | Primitive or hybrid-prefix provenance may support source-map construction, but it emits none of $D_s$, $D_t$, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_t$, $D_vW^{\mathrm{rec}}$, or the branch-family checksum. |
| `h39-coefficient-series-provider-candidate-not-retained-record-preimage` | Coefficient-series source-map residual provider candidate, source-map residual envelope, provider-fit diagnostic, or signed-radius target | Candidate provider rows have same-domain/source-map value only; they are not accepted provider-object branch rows and are not bound to a retained causal-root force/action record. |

Partial-population invariant. The branch-provider report already has a
fail-closed partial-object test: even if the producer-side extractor reports 14
available $A_P$ terminal rows and 28 explicit provider-object branch rows, the
target remains `producer-side-same-domain-branch-row-evidence-missing` with
`provider_ready_authorized_by_this_target=false`. The H39 retained-record
handoff inherits that invariant: every one of the 15 terminal rows and all 30
`P_-` / `P_+` branch rows must be accepted before the receiver-normal
derivative fields can be considered for the same retained record.

Fixture target:
`h39-receiver-normal-retained-record-preimage-fixture/v0`.

This fixture target now lives inside the executable branch-provider evidence
report as a fail-closed object. It tests the retained-record handoff row without
authorizing provider readiness, downstream consumers, or a retained-branch
claim. It exercises these rows:

| Fixture row | Required setup | Expected status |
| --- | --- | --- |
| `current_h39_absence` | The H39 fixture reports `0 / 15` available $A_P$ terminal rows, `0 / 30` explicit provider-object branch rows, no accepted provider-object branch interval, and no retained causal-root force/action record. | `h39-provider-object-branch-row-missing` |
| `source_map_residual_provider_only` | The fixture carries `provider_row_source_kind=directed-rounded-same-domain-h38-source-map-residual-provider` with same-domain/source-map residual checks, but no accepted $A_P$ or explicit `P_-` / `P_+` provider-object branch row and no retained causal-root derivative record. | `h39-coefficient-series-provider-candidate-not-retained-record-preimage`; no downstream authorization |
| `partial_provider_object_branch_row` | The producer-side extractor reports 14 available $A_P$ terminal rows and 28 explicit provider-object branch rows, with exact missing terminal and branch row ids. | `h39-provider-object-branch-row-missing`; no downstream authorization |
| `accepted_provider_object_unbound` | All 15 terminal rows and all 30 `P_-` / `P_+` rows are accepted as provider-object branch rows, but no retained causal-root force/action record consumes them. | `h39-provider-object-retained-record-unbound` |
| `retained_record_missing_receiver_normal_derivative` | The provider row is bound to a retained causal-root record carrying $D_s$, $D_t$, fixed signs, and $W^{\mathrm{rec}}$, but omits $D_vD_s$, $D_vD_t$, or reconstructed $D_vW^{\mathrm{rec}}$. | `h39-receiver-normal-derivative-fields-missing` |
| `fourth_jet_taylor_derivative_only` | Fourth-jet or Taylor derivative rows are present only as diagnostics, without accepted provider-object branch rows and retained causal-root same-record binding. | `h39-provider-candidate-consumed-as-retained-record`; no receiver-normal derivative evidence |
| `preimage_review_candidate` | The accepted provider row, retained causal-root record, branch-family checksum, $D_s$, $D_t$, fixed signs, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_t$, reconstructed $D_vW^{\mathrm{rec}}$, and geometry derivative fields all share one source artifact hash and retained box. | `h39-receiver-normal-retained-record-preimage-review-required`; still not retained-branch promotion |

The positive review fixture is not allowed to pass by copying a terminal graph
coordinate into a force/action record. It must verify the receiver-normal
derivative reconstruction on the retained causal-root row and must keep
`provider_ready_authorized_by_this_fixture=false`,
`downstream_consumer_authorization=false`, and
`retained_branch_claim_authorized_by_this_fixture=false`. Fourth-jet/Taylor
rows, coefficient-series source-map residual providers, lambda terminal
witnesses, row-local expression feeds, aggregate-$P$ rows, and signed-radius
targets remain negative controls unless the accepted provider-object branch row
and retained causal-root derivative record are both present on the same retained
record.

## Authorization Boundary

This report may mark a future provider row as ready for a downstream consumer
only when the consumer's provider fields are present on one accepted
non-fixture source record. It still does not run
`field_speed_action_self_hit_scan/v0`, does not populate pressure-response
coefficients, does not populate `moving_retained_branch_certificate/v0`, does
not certify bounded-speed branch retention, and does not authorize a retained
branch claim.

## Next Evidence Object

The smallest positive object is one candidate row with
`provider_source_status=accepted_non_fixture_source`, a stable
`same_domain_record_ref`, `branch_certificate_ref`,
`active_root_or_live_ledger_identity`, and
`branch_local_projection_or_normalization_identity`. Rank 2 additionally needs
`conservation_pullback_hash` on the same record. The construction attempt makes
the branch-materialization burden explicit: the same row must also carry the
pre-aggregate branch rows, labels, weights or intervals, projection map,
pushforward operator, normalization identity, upstream source-term references,
and aggregate-erasure negative control before provider acceptance is consumed by
ranks 2, 4, 5, or 6.

For the H39 source-map provider-object branch-interval path specifically, the
next object is one same-domain expression-level source-map provider-object
branch split map that emits finite `P_-` and `P_+` intervals for all 15
terminal rows `speed.{0..4}.first-y:h{37,36,35}` and all 30 branch rows. The
immediate producer-side blocker is now populated as an absence: the branch
antisymmetric equation field is emitted, but reports zero available terminal
rows and names every missing `P_-` / `P_+` branch row. The accepted provider
packet must carry the producer-side same-domain branch-row evidence target:
a same-domain $A_P=P_- - P_+$ equation or explicit expression-level `P_-` /
`P_+` rows, both interval payloads, the $P_b$ map, branch projection or alpha
map, pushforward operator reference, normalization identity reference, and the
same-record binding fields named above.

For receiver-normal derivative use, that provider-object packet is still only
stage one. Stage two is the retained-record preimage row: bind the accepted
provider-object branch row to the retained causal-root force/action record with
$D_s$, $D_t$, fixed signs, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_t$,
reconstructed $D_vW^{\mathrm{rec}}$, geometry derivatives, and the retained
branch-family checksum. Primitive-vector replays, coefficient-series source-map
residual provider candidates, source-map residual envelopes, provider-fit diagnostics, and
signed-radius targets remain negative controls until both stages are present.
