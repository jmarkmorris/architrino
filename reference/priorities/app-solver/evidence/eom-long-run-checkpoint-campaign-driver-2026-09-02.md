# EOM Long-Run Checkpoint And Campaign-Driver Acceptance

Status: ACCEPTED FOR BOUNDED-POPULATION OPERATIONAL USE; CHECKPOINT, RESUME, MANIFEST, PROGRESS, CANCELLATION, AND REPLAY CLAIMS ONLY (2026-09-02).

## Decision

EOM-003 is complete at bounded-population operational grade. Checkpoint continuation now restores cumulative accepted and rejected attempt counts in addition to exact retained histories, accepted time, controller step, certificate-cost cooldown, adaptive-growth headroom, joint histories, and permanent ordinary-history fallback state. Checkpoint creation rejects any certificate whose last attempted step was rejected, so an unfinished retry state cannot be represented as resumable. Empty initial boundaries, completed results, and diagnostic or cancelled results ending on an accepted atomic step remain eligible.

The reusable campaign harness now treats engine step counts as cumulative run counters, verifies each invocation's count deltas against its complete step records, binds resume to checkpoint and manifest counter equality, and records both aggregate and per-path initial and accepted history provenance. The checkpoint is published atomically before the matching manifest. A crash leaving either the checkpoint or frame stream ahead of the manifest therefore fails the resume identity checks rather than silently combining generations.

Plainly: a restart now carries every state item that can change the next accepted decision. The system refuses to save a half-finished retry, and it refuses to resume when the checkpoint, manifest, or history identities disagree.

## Continuation-State Inventory

| State | Preservation rule | Current evidence |
| --- | --- | --- |
| Accepted absolute time | Exact decimal checkpoint token | Interrupted and uninterrupted boundaries match exactly. |
| Ordinary retained histories | Complete segment tokens and history fingerprints | Every accepted segment and coefficient/error token matches after restart. No prefix was retired. |
| Joint affine histories | Complete joint segment registry when active | Existing active and permanent ordinary-fallback controls pass. |
| Controller step | Exact checkpoint token | Three adaptive cuts and the bounded five-attempt run reproduce later widths. |
| Accepted/rejected counts | Cumulative checkpoint counters | Resume callbacks continue at 3, 4, and 5 after a two-step prefix; the five-attempt run completes exactly at its declared limit. |
| Certificate-cost cooldown | Exact remaining-step count | Existing roundtrip and continuation controls pass. |
| Two-success growth memory | Exact consecutive-headroom count | Cuts after one, two, and four accepted steps reproduce uninterrupted growth decisions. |
| Joint fallback mode | `active`, `ordinary_fallback`, or `disabled` | Ordinary fallback cannot silently reactivate joint state after restart. |
| Model and checkpoint identity | Content-sensitive fingerprints | Model mismatch, payload tampering, incomplete older schema, and manifest/checkpoint mismatch fail closed. |
| Warm caches and snapshot reuse | Lawfully reconstructed performance state | Cache-use telemetry may differ after restart; it has no acceptance authority and is not part of decision identity. |
| Pending rejected-step retry state | Not serializable | Checkpoint creation rejects a certificate ending in a rejected step. |

Plainly: cached work may be recomputed, but accepted histories, adaptive-controller memory, counters, and fallback state may not be guessed or reset. A run can restart only from a clean accepted boundary.

## Deterministic Restart And Manifest Gate

The rebuilt `attractor-ensemble-harness` ran the frozen two-path straight-prehistory control through two five-step chunks in two ways: uninterrupted to `0.10000000000000001`, and to `0.050000000000000003` followed by a new-process resume to the same final time. Both final manifests contain two completed chunks, ten accepted steps, zero rejected steps, 22 frame rows, certified release-root clearance, concrete engine/spec/date provenance, initial and accepted history-manifest fingerprints, the checkpoint fingerprint, and per-path charge, history fingerprint, segment count, and coverage bounds. The uninterrupted manifest records zero resumes and the interrupted route records one.

The independent comparison script reported:

- final checkpoint bytes identical, SHA-256 `87b90cdb81d8fa8a929890d5a138cc7480330c3a4a65c7864a909c8e9c21cad2`;
- frame bytes identical, SHA-256 `31f762d3d27e22e1de18a765b5aae5bb708aaec93951ad7f4cd4c9fec9f7ccd6`;
- evolved assembly-record bytes identical, SHA-256 `349eebb4ef94d334ae7cdf5cf87613698a916478dd5b67a5248cfe14d6fa7383`;
- deterministic census projections equal after removing only measured wall-time fields;
- manifest checkpoint identity equal to the decoded checkpoint;
- manifest accepted-history identities equal to the evolved record; and
- complete checkpoint segment tokens equal to the evolved record.

Plainly: stopping the executable and starting it again produces the same stored continuation and display record. This is deterministic-restart and provenance evidence, not an independent proof that the shared numerical method is correct.

## Progress And Cancellation

The engine accepts a cooperative cancellation callback and observes it only before the first attempt or after an accepted atomic step. The campaign host maps `SIGINT` and `SIGTERM` to that callback. A live `SIGINT` control stopped at accepted time `2.6899999999999995` with 286 cumulative accepted steps, zero rejected steps, a checkpoint fingerprint, and manifest status `halted_cancelled_at_accepted_boundary`. A new process resumed that checkpoint through accepted time `2.75` and cumulative accepted step 298. Heartbeats reported cumulative accepted-step identities before and after restart.

The core fixture independently toggles cancellation after two accepted steps, checkpoints that boundary, resumes to the five-step run limit, and reproduces the uninterrupted decision records. Cancellation is not consulted while a rejected attempt has uncheckpointed retry state.

Plainly: an operator stop waits for a safe publication boundary. It never turns an unfinished candidate into accepted history, and the resulting checkpoint can continue with the original run counters.

## Validation

- `tests/test_eom_native_coupled_evolution.py`: 41 tests passed in 91.918 seconds.
- `scripts/eom/validate-attractor-resume-gate.mjs`: passed byte identity, deterministic census, cumulative accounting, checkpoint/manifest identity, complete history provenance, release clearance, and checkpoint-to-record token parity.
- `tests/subfield-circular-root-launcher.test.js`: 15 tests passed in 21.152 seconds with process inspection enabled, covering normal exit, deadline cleanup, output preservation, retired identities, inspection loss before and after stop/resume, scoped cancellation, and unrelated-process preservation.
- Fresh optimized standalone compiles passed for `attractor-ensemble-harness.cpp` and `antipodal-binary-spiral-law.cpp` against the rebuilt EOM library.

Plainly: the focused controls cover both continuation mechanics and the separate process launcher. The first sandboxed launcher attempt lacked process-inspection permission and was not treated as a product failure; the same current tree passed when the test received the process authority its cases require.

## Claim Boundary And Falsifiers

Claim grade: measured bounded-population operational evidence plus derived checkpoint-boundary invariants. This packet establishes deterministic continuation, complete retained-history persistence, cumulative run accounting, crash-generation checks, progress, accepted-boundary cancellation, and scoped launcher cleanup. It does not establish a physical branch, persistence, stability, a Braid or Borg fate, independent numerical correctness beyond the already accepted EOM-002 controls, distributed restart, or million-path capability.

Falsify this acceptance if a restart changes a discrete step decision or accepted history token; if a run exceeds cumulative attempt limits after restart; if callbacks reset to local counts; if a rejected-step boundary can be checkpointed; if manifest, checkpoint, or accepted-history identities can disagree and still resume; if cancellation publishes an unfinished candidate; or if any named focused gate fails with its required execution authority.

Plainly: EOM-003 makes long runs safely stoppable and resumable. Scientific conclusions still require their own independent oracle and consumer-specific acceptance gates.
