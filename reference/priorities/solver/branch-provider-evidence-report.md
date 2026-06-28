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

## Current Executable Result

Executable artifact:
[branch-provider-evidence-report.mjs](../../../scripts/solver-audits/branch-provider-evidence-report.mjs)

Current manifest:
[branch-provider-current-candidates.json](../../../scripts/solver-audits/fixtures/branch-provider-current-candidates.json)

Focused test:
[branch-provider-evidence-report.test.js](../../../tests/branch-provider-evidence-report.test.js)

The current manifest evaluates seven candidate rows:

| Candidate | Consumer rank(s) | Current source status | First blocker |
| --- | ---: | --- | --- |
| `field-speed-action-increment-fixture-source` | 2 | `fixture_shape_only` | `accepted_non_fixture_source_missing` |
| `pressure-row-current-status` | 4 | `diagnostic_only` | `accepted_non_fixture_source_missing` |
| `pressure-row-fe-silicate-toy-partial` | 4 | `toy_replay_only` | `accepted_non_fixture_source_missing` |
| `pressure-row-a0-branch-source-frontier-partial` | 4 | `tier0_continuation_ready_not_accepted_history` | `accepted_non_fixture_source_missing` |
| `bounded-speed-normal-candidate-fixture` | 5 | `fixture_normal_candidate` | `accepted_non_fixture_source_missing` |
| `moving-retained-branch-status-shell` | 6 | `status_shell_only` | `accepted_non_fixture_source_missing` |
| `tri-binary-torque-wake-same-row-diagnostic` | 2, 6 | `solver_proxy_diagnostic` | `accepted_non_fixture_source_missing` |

The emitted report returns:

| Report field | Current value |
| --- | --- |
| `provider_verdict` | `same_domain_branch_provider_missing` |
| `first_failure` | `accepted_non_fixture_source_missing` |
| `candidate_count` | 7 |
| `provider_ready_consumer_count` | 0 |

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
`conservation_pullback_hash` on the same record.
