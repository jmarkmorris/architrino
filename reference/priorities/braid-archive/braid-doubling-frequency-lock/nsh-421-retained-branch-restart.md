# NSH-421 Retained-Branch Restart

Status: priority-only proof-status packet.

Claim level: receiver-normal retained-branch restart required.

Scope: NSH-421 names the nested-shell braid candidate family whose role-assigned integer frequency ratio is `I:M:O = 4:2:1`. The frequency-ratio, resonance-lock, phase, caustic, and geometry material remains useful only at its own claim level. It does not by itself certify a retained branch.

## Receiver-Normal Standard Applied

Retained-branch evidence must close on one retained record under current receiver-normal accounting. A retained record must carry the branch identity, active row identity, source and receiver geometry, source-normal denominator, receiver-normal numerator, receiver-normal branch weight, retained/rejected status, and the downstream rows that consume the weight.

The admissible local weight is

$$
W^{rec}=\left|\frac{D_T}{D_s}\right|.
$$

Here `D_s` is the source-normal denominator and `D_t` is the current diagnostic field name for the canonical receiver-normal numerator $D_T$ on the same active row. Source-normal-only rows, Jacobian-only rows, and historical $\eta^{-2} |J|^{-1}$ weights are diagnostics only. A frequency lock is not a retained branch.

Primary receiver-normal references for this screen:

- [receiver-normal branch-strength certificate](../../master-equation-closure/receiver-normal-branch-strength-certificate.md)
- [receiver-normal restart ledger](../../master-equation-closure/receiver-normal-master-equation-restart-ledger.md)
- [receiver-normal clean-slate checker](../../../../scripts/check-receiver-normal-clean-slate.mjs)

## Evidence Classification

| Evidence surface | Classification | What survives | Retained-branch disposition |
| --- | --- | --- | --- |
| [Doubling-frequency resonance chapter](../../../../content/markdown/aaa/noether-braid/braid-families.md#noether-braid-doubling-frequency-resonance-lock) exact speed identity and integer phase closure | frequency theorem support | `v_k = 2 pi f_k r_k`; integer closure `f_I:f_M:f_O = n:m:1`; NSH-421 as the `4:2:1` role-assigned candidate | No retained-branch use until the same branch record also carries receiver-normal rows and retained dynamics rows. |
| Harmonic-overlap lemma and `nu = 4` common-cover reading | frequency theorem support | The `1:2:4` outer-normalized cover is a minimal common-cover candidate when the theorem assumptions hold. | Topological overlap does not prove branch-derived amplitudes, polygon closure, or stability. |
| Phase-bundle, holonomy, `D_plane`, caustic impulse, and Floquet targets | retained-branch candidate | These are the right theorem targets for a finite-eta branch chart. | Candidate only until they close on the same retained branch record as `W^{rec}` and the accepted branch certificate. |
| Caustic-weighted selection score | dynamics diagnostic | It can rank a branch only if amplitudes, caustic rows, holonomy, and finite-eta return-map rows are branch-derived. | `J` may serve as a transversality or caustic-window diagnostic, not as a substitute for receiver-normal branch strength. |
| [Scaling and packing scaffold](noether-braid-scaling-and-packing.md) | geometry/support support | The fixed-ledger product relation and radius identities remain useful geometry constraints. | The constants must be supplied by an accepted retained branch before they become retention or action evidence. |
| [Phenomenological heuristics archive](phenomenological-heuristics.md) | dynamics diagnostic | Intuition about binary hierarchy and action counting is retained only as provenance. | Direct inference from covering degree, Jacobian weight, or historical action-counting rows is stale for retained-branch proof. |
| [Angular-momentum minimal candidate instance](../braid-angular-momentum-spin/minimal-candidate-set-instance.md) | dynamics diagnostic | Same-row force, partition, torque, wake, root-population, hinge, and point-event proxy rows remain useful diagnostics. | The packet explicitly keeps `retainedBranchClaim=false`; no retained branch is certified. |
| Torque/wake same-row diagnostic family | retained-branch candidate / shared blocker diagnostic | It supplies the closest current same-row diagnostic path and sampled active-row identity, but the current selected diagnostic is not itself an accepted NSH-421 row. | It fails before retained-branch proof at `branch_certificate_ref_missing`. |
| Source-normal-only, Jacobian-only, or $\eta^{-2} |J|^{-1}$ force/action rows | stale retained-branch claim if used as proof | They may still describe transversality, caustic exposure, or historical search heuristics. | They cannot authorize retained-branch, action, force, energy, or Noether-wake conclusions. |

## Same-Record Receiver-Normal Search Result

No accepted same-record receiver-normal branch-weight evidence for NSH-421 was found in the screened corpus, priority packets, scripts, fixtures, or tests.

The closest current path is the torque/wake same-row diagnostic family. Its useful partial row is the selected `index-ratio:f2` diagnostic, but that row is only a nearest shared blocker diagnostic. It is not an accepted NSH-421 retained record. It remains below retained-branch proof because the same retained branch certificate has not been emitted. The current blocker chain is:

1. `branch_certificate_ref_missing`
2. `same_retained_active_row_ids` blocked until the branch certificate exists
3. `accepted_branch_chart_ref` missing
4. `moving_retained_branch_certificate_ref` missing
5. `accepted_transition_source_ref` and `action_increment_row_id` missing for the later action source row

The sampled active-row diagnostics remain useful only as diagnostics while this chain is open. A direct NSH-421 restart must emit the same kind of retained branch certificate for a `proof_id: NSH-421` record rather than importing the `index-ratio:f2` row as if it certified the `4:2:1` family.

### Current NSH-421 Diagnostic Rows That Survive

The current tri-binary run with `--f-min 2 --f-max 2 --integer-lock-m-max 2 --integer-lock-n-max 4` now preserves receiver-normal diagnostic fields on the dyadic `4:2:1` rows. These rows are useful because they carry same-row `D_s`, `D_t`, and `W^{rec}` quantities, but they remain diagnostic because both dyadic cases report `retainedBranchClaim: false`, `promotionReady: false`, and `branchSelectionResidualStatus: blocked_not_evaluable`.

For `phase-lock:dyadic-lock-4-2-1:f2`, the active and torque rows carry:

| Row id | `D_s` / `sourceNormalDenominator` | `D_t` / `receiverNormalNumerator` | `W^{rec}` / `branchWeight` |
| --- | ---: | ---: | ---: |
| `phase-lock:dyadic-lock-4-2-1:f2:inner:root-0` | `1.6780895642582345` | `1` | `0.5959157492538426` |
| `phase-lock:dyadic-lock-4-2-1:f2:middle:root-0` | `1.7103575284184616` | `1` | `0.5846730776369797` |
| `phase-lock:dyadic-lock-4-2-1:f2:outer:root-0` | `1.749201356009824` | `1` | `0.571689472206414` |

For `index-ratio:dyadic-lock-4-2-1:f2`, the active and torque rows carry:

| Row id | `D_s` / `sourceNormalDenominator` | `D_t` / `receiverNormalNumerator` | `W^{rec}` / `branchWeight` |
| --- | ---: | ---: | ---: |
| `index-ratio:dyadic-lock-4-2-1:f2:inner:root-0` | `2.546186069710083` | `1` | `0.39274427422889135` |
| `index-ratio:dyadic-lock-4-2-1:f2:middle:root-0` | `1.7103575284184616` | `1` | `0.5846730776369797` |
| `index-ratio:dyadic-lock-4-2-1:f2:outer:root-0` | `1.4970370078791997` | `1` | `0.6679861584829258` |

The first current NSH-421 retained-row blocker in the dyadic branch projection is `row_set_identity`: force, torque, normalized tail-wake, and partition residuals have not yet been proven to use the same retained active rows on one accepted record. This is the NSH-421-specific version of the same bridge failure that the torque/wake same-row diagnostic exposes as `branch_certificate_ref_missing`.

### Accepted-Certificate Continuation Screen

The follow-up target was to produce the first accepted NSH-421 retained active-row branch certificate with same-record `D_s`, `D_t`, `W^{rec}`, accepted `branch_certificate_ref`, and matching `same_retained_active_row_ids`. Current repo evidence still cannot emit that accepted certificate.

The dyadic 4:2:1 runner output supplies the receiver-normal numeric part of the target on both surviving diagnostic cases. For each sampled active row, the active-row and torque-row payloads agree on `rowId`, `D_s`, `D_t`, `receiverNormalFactor`, `unsignedReceiverNormalFactor`, and `branchWeight`. That is necessary evidence for the eventual certificate schema, but it is not sufficient because the same rows remain diagnostic samples rather than an accepted retained record.

The current source search found no `proof_id: NSH-421` evidence object and no non-fixture accepted instance of `torque_wake_retained_active_row_branch_certificate_evidence_object/v0`. The closest branch-provider candidate remains `tri-binary-torque-wake-same-row-diagnostic` in `scripts/solver-audits/fixtures/branch-provider-current-candidates.json`; it is explicitly `provider_source_status: solver_proxy_diagnostic`, has `branch_certificate_ref: null`, and notes that the diagnostic leaves `retainedBranchClaim=false`.

Therefore no valid edit can truthfully set `retained_branch: true`, populate `branch_certificate_ref`, or promote `same_retained_active_row_ids` from target-required row ids to accepted retained row ids. Doing so with the current rows would manufacture the certificate from diagnostic evidence and would violate the receiver-normal retained-record standard.

The first current accepted-certificate blocker is:

`branch_certificate_ref_missing`

The first producer target remains:

`torque_wake_retained_active_row_branch_certificate_producer_target/v0`

The first source object that must become real is one accepted non-fixture same-record retained active-row provider for the NSH-421 / torque-wake route. It must bind `proof_id: NSH-421`, the dyadic `4:2:1` labels, accepted non-fixture source provenance, `branch_certificate_ref`, `same_retained_active_row_ids`, `receiver_normal_branch_rows`, same-record branch-chart identity, accepted branch chart, moving retained branch certificate, active-root ledger hash, conservation-pullback hash, and negative control on one record. The coordinating same-branch intake name already used by the neighboring structural-integrity packet is `same_record_accepted_branch_chart_intake_for_q_index_ratio_f2`; that intake is a route target until its accepted branch-chart and certificate refs are populated by source evidence.

## Minimum Accepted Retained-Record Schema

The minimum NSH-421 retained record must be a single accepted record, not a stitched set of rows from different diagnostics. It must include:

- `proof_id: NSH-421`
- raw branch labels and role-assigned labels, including `I:M:O = 4:2:1`
- `retained_record_id`, source artifact hash, provider provenance, and accepted non-fixture source status
- accepted `branch_certificate_ref`
- same-record branch identity: extraction window, active root ledger hash, accepted branch chart ref, separator chart ref, positive-gap record ref, memory-depth record ref, and active wave-vector gap ref
- `same_retained_active_row_ids` matching the force, partition, torque, wake, phase, and action rows consumed by the proof
- causal-root, event-domain, inactive-gap, continuation-cardinality, and finite-memory rows for the same retained branch
- receiver-normal branch-strength rows for every consumed active row:
  - source and receiver ids
  - source time and receiver time
  - geometry row id
  - `sourceNormalDenominator` / `D_s`
  - `receiverNormalNumerator` / `D_t`
  - `receiverNormalFactor = D_t / D_s` (canonical $D_T/D_s$)
  - `unsignedReceiverNormalFactor = abs(receiverNormalFactor)`
  - `branchWeight = unsignedReceiverNormalFactor`
  - regulator, sign, fold, and caustic status
  - fail-closed negative control showing that a source-normal-only or Jacobian-only replacement does not pass
- phase and geometry rows: `(m,n) = (2,4)`, phase offsets, holonomy defect, `D_plane` floor, caustic impulse, branch-derived amplitudes, and radius/speed rows
- dynamics rows on the same retained record: torque consistency, wake pullback, vector partition, action or energy routing, section stability, competitor rows, and Floquet gap
- explicit downstream authorization flags, all false until the same record is accepted

Until those fields close on one record, NSH-421 remains a frequency-lock theorem target plus a retained-branch candidate, not a retained branch.

## First Producer And Checker

The exact first producer target to restart retained-branch proofing is:

`torque_wake_retained_active_row_branch_certificate_producer_target/v0`

The corresponding first evidence-object schema is:

`torque_wake_retained_active_row_branch_certificate_evidence_object/v0`

The first checker/report to rerun against the produced object is:

`../../../scripts/nested-shell-braid/torque-wake-same-row-diagnostic-report.mjs --evidence-object <path>`

The older blocker-path diagnostic mode remains:

`../../../scripts/nested-shell-braid/fixtures/torque-wake-same-row-diagnostic-priority-target.json`

Reason: this is the current checker family that already binds sampled force, partition, torque, and wake rows, now requires `receiver_normal_branch_rows`, and names the first retained-branch blocker before same retained active-row IDs can be accepted: `branch_certificate_ref_missing`. The direct `--evidence-object` mode now checks the NSH-421 retained active-row branch-certificate acceptance contract. The current priority input is still only a blocker-path diagnostic, not an NSH-421 retained certificate.

The follow-on checkers are not the first restart target. They become meaningful only after the accepted branch certificate exists:

- `../../../scripts/nested-shell-braid/field-speed-action-self-hit-scan-source-binding-candidate-intake-report.mjs`
- `../../../scripts/nested-shell-braid/rank2-rank6-branch-source-join-report.mjs`
- `../../../scripts/nested-shell-braid/moving-retained-branch-certificate-report.mjs`
- `../../../scripts/check-receiver-normal-clean-slate.mjs`

## Current Checker Snapshot

As of this screen, the relevant checkers are fail-closed:

- torque/wake same-row diagnostic report: valid, `promotion_status: priority-only`, `selected_case_id: index-ratio:f2`, `same_record_source_binding: false`, `retained_branch: false`, `first_failure: branch_certificate_ref_missing`, `receiver_normal_branch_rows: receiver_normal_branch_rows_missing`
- rank-2 source-binding report: valid, `source_verdict: diagnostic_rejected_endpoint_source`, `first_failure: source_row_binding_open`
- rank-2 candidate-intake report: valid, `report_status: source_row_binding_open`, `accepted_transition_source_candidate_count: 0`
- moving retained branch certificate report: valid, `certificate_verdict: blocked_pending_accepted_branch_chart`, `first_failure: blocked_pending_accepted_branch_chart`
- accepted branch-chart source scout: valid, `candidate_count: 9`, `accepted_count: 0`, `first_failure: accepted_same_record_branch_chart_absent`, `first_rejection_code: branch_certificate_ref_missing`
- rank2/rank6 branch-source join report: valid, `same_branch_source_join: false`, `first_failure: source_row_binding_open`
- tri-binary dyadic `4:2:1` run: diagnostic receiver-normal fields present on active and torque rows for the `phase-lock` and `index-ratio` dyadic cases, but both remain `retainedBranchClaim: false` and `promotionReady: false`
- NSH-421 evidence-object acceptance mode: executable in `torque-wake-same-row-diagnostic-report.mjs --evidence-object`; it requires `proof_id: NSH-421`, `family_id: dyadic-lock-4-2-1`, `role_assigned_integer_ratio: 4:2:1`, accepted non-fixture source/provenance rows, exact same retained active-row IDs, and same-row receiver-normal equations. A contract-complete test object passes the checker, while a branch-certificate-missing object fails first at `branch_certificate_ref_missing` and source-normal-only rows fail at `missing_receiver_normal_branch_row_fields`.

Interpretation: the downstream join and transition-source rows are still open, but they are not the first restart target. The branch-certificate row remains first because `same_retained_active_row_ids` cannot be accepted before an accepted retained active-row `branch_certificate_ref` exists.

## Preservation Decision

Keep:

- the NSH-421 frequency-ratio theorem material
- the exact integer phase-closure and radius identities
- the phase-bundle, caustic, holonomy, recurrence, and Floquet theorem targets
- the geometry/support scaffold
- the torque/wake same-row diagnostics as the nearest retained-branch restart route

Restart:

- every retained-branch, force, action, energy, Noether-wake, branch-output, score-movement, or preferred-configuration claim that relies on source-normal-only, Jacobian-only, or $\eta^{-2} |J|^{-1}$ evidence
- any NSH-421 retained-branch claim made without same-record `D_s`, `D_t`, `W^{rec}`, accepted `branch_certificate_ref`, and same retained active-row IDs

First proof blocker:

`branch_certificate_ref_missing`

First proof target:

Produce an accepted `torque_wake_retained_active_row_branch_certificate_evidence_object/v0` for a `proof_id: NSH-421` retained record, then rerun the torque/wake same-row diagnostic report family to see whether `same_retained_active_row_ids` can be accepted under receiver-normal accounting.
