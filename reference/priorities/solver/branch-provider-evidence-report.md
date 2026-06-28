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
