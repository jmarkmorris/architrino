# SH-0 Retained-History Evidence Audit

Status: priority evidence audit, 2026-07-04.

Proof ID: `SH-0`, the rest shell-braid qualification with one declared common shell or controlled radial support band.

Fixture under audit: the group-zero, axis-neutral, common-sphere held-release six-point fixture. Internal script identifiers still use `face-opposite`; in the taxonomy this is the axis-neutral placement where the three positive sites occupy one triangular face and the three negative sites occupy the opposite face.

Claim level: diagnostic row evidence only. This audit does not accept a retained branch, return response, stability row, Noether sea response, branch chart, moving certificate, Lorentz deformation row, score movement, or downstream consumer claim.

## Audit Result

`SH-0` has useful retained-history scaffolding, but it does not yet have accepted retained-history evidence. The evidence chain currently has two layers:

1. A fresh/default construction still fails at the first same-record identity field, `held_release_seed_path_rows[*].retained_record_id`.
2. The active provider-backed acquisition path has already supplied a retained-record id, source row id, candidate provider object, and provider hash. That path is blocked later, at the missing non-circular seed-path acceptance certificate:
   - missing object: `held_release_seed_path_rows_acceptance_certificate`
   - missing field: `held_release_seed_path_rows.acceptance_certificate_ref`

The second layer is the active blocker to preserve in cleanup. The first layer is still valid for an empty rerun, but it is no longer the sharpest blocker for the current provider-backed `SH-0` evidence effort.

## Evidence Handles

| Handle | Current role | Current status | Cleanup decision |
| --- | --- | --- | --- |
| `held-release-causal-wake-toy.mjs` and the held-release toy notes | Euclidean-void diagnostic for the common-sphere symmetry and single compression-to-expansion turn. | Useful diagnostic only; not central-solver retained-history evidence. | Keep as motivation and fixture behavior. Do not let it authorize retention, stability, return, or Noether sea rows. |
| `held-release-seed-path-rows.mjs` | Earliest six-row seed-path producer boundary for the retained-history chain. | Default artifact `held_release_seed_path_rows:12dbf261ff617926` fails at `held_release_seed_path_rows[*].retained_record_id`. Provider-backed artifact `held_release_seed_path_rows:5833f18e53586201` fails at `held_release_seed_path_rows_acceptance_certificate` / `held_release_seed_path_rows.acceptance_certificate_ref`. | Treat the provider-backed acceptance-certificate boundary as the active cleanup target. |
| `held-release-path-history-stream-manifest-set.mjs` | Path-history stream manifest wrapper for the six seed rows. | Default artifact builds six local stream manifests but has no retained record id, provider provenance, or durable stream refs. Provider-backed chain still requires accepted manifest evidence before package acceptance. | Keep local manifests as request/contract evidence only. Do not count local manifests as durable retained-history streams. |
| `central-solver-retained-history-row.mjs` | Central retained-history row request for path streams, same-source self-hit rows, partner causal-root replay, wake/action hooks, branch identity, support residual rows, and internal tangent-authority vectors. | Default row `central_solver_retained_history_row:72c26ba3375a74a6` fails at `central_solver_retained_history_row.provider_provenance.provider_object_ref`. | Use it as the row schema and same-record obligation list, not as accepted retained-history evidence. |
| `central-solver-retained-history-provider-object.mjs` | Candidate provider-object bundle tying seed rows, stream manifests, retained-history row request, native path-history refs, root-ledger refs, causal-root replay refs, wake, action, and provider provenance. | Default provider object is candidate-only. It has no accepted provider-object ref. | Keep as the provider contract. Do not treat candidate provider refs as accepted provenance. |
| `central-solver-retained-source-adapter-acceptance-certificate.mjs` | Adapter-side accepted-evidence contract for the retained-source package. | Contract reports ten observed source fields and zero accepted package fields. First package blocker is `central_solver_retained_source_adapter_same_record_accepted_evidence_package`; the first upstream package field is the seed-path acceptance-certificate ref. | Use this as the downstream package checklist after the seed-path certificate boundary closes. |

## Active Acceptance Ladder

The next cleanup target is not to add more diagnostics. It is to find or create a non-circular accepted seed-path authority object for the current provider-backed artifact.

1. Acquire `held_release_seed_path_rows_acceptance_certificate.v0` for:
   - retained record: `retained-record:held-release-six-point:adapter-acceptance-certificate`
   - source row: `two-speed-preferred-row:u0.8:v0.2`
   - artifact: `held_release_seed_path_rows:5833f18e53586201`
   - required accepted-ref prefix: `accepted:held-release-seed-path-rows:retained-record:held-release-six-point:adapter-acceptance-certificate:two-speed-preferred-row:u0.8:v0.2:`
2. Acquire matching `held_release_seed_path_rows_external_accepted_authority_package.v0` at:
   - `external-authority-package:held-release-seed-path-rows:retained-record:held-release-six-point:adapter-acceptance-certificate:two-speed-preferred-row:u0.8:v0.2`
3. Clear repo authorization for accepted seed-path rows at:
   - `held_release_seed_path_rows.acceptance_certificate_ref`
4. Only after the seed-path certificate boundary closes, fill the retained-source adapter accepted-evidence package fields for path-history manifest set, central retained-history row, central provider object, native path-history stream set, native root-ledger detail rows, causal-root replay rows, same-record action closure, retained wake history, and provider provenance.
5. Only after the adapter accepted-evidence package and external verification close can downstream rows try to claim retained branch, return response, stability, Noether sea response, branch chart, moving certificate, or observer export.

## Non-Authorizing Evidence

The following evidence classes must remain non-authorizing for `SH-0` retention:

- fixture rows,
- diagnostic rows,
- priority prose,
- generated decoys,
- proxy rows,
- candidate refs,
- aggregate or cross-row bundles,
- endpoint-only rows,
- affine geometry alone,
- temp probes,
- local stream manifests without durable refs,
- provider-backed candidates without accepted same-record certificates.

These handles can still explain why the `SH-0` fixture is worth testing. They cannot prove that a branch is retained.

## Promotion Classification

- Corpus promotion: defer with blocker.
- Priority status: keep this audit as the current evidence boundary for `self_hit_held_release_solver_row` and `noether_sea_stabilization_term`.
- First safe promotion after blocker: once accepted seed-path evidence exists, update the proof map and the braid-ideal tracker to name the new accepted source object and the next missing same-record retained-history row.

## Commands Used

```bash
node scripts/braid-ideal/held-release-seed-path-rows.mjs --pretty
node scripts/braid-ideal/held-release-path-history-stream-manifest-set.mjs --pretty
node scripts/braid-ideal/central-solver-retained-history-row.mjs --pretty
node scripts/braid-ideal/central-solver-retained-history-provider-object.mjs --pretty
node scripts/braid-ideal/held-release-seed-path-rows.mjs --retained-record-id=retained-record:held-release-six-point:adapter-acceptance-certificate --source-row-id=two-speed-preferred-row:u0.8:v0.2 --provider-object-ref=candidate:central_solver_retained_history_provider_object:7d4a8fe0a9792327 --provider-artifact-hash=7d4a8fe0a97923270179f2ca0b49b4bc0d6b6ba3251b26e82569bdb4bd1f91df --print-acceptance-certificate-requirement --pretty
node scripts/braid-ideal/central-solver-retained-source-adapter-acceptance-certificate.mjs --retained-record-id=retained-record:held-release-six-point:adapter-acceptance-certificate --source-row-id=two-speed-preferred-row:u0.8:v0.2 --print-same-record-accepted-evidence-contract --pretty
```
