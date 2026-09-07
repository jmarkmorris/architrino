# Data-File Layout Completion

This campaign finishes the workstream directory layout pass recorded in [../work-log.md](../work-log.md) under 2026-09-05. That pass filed 236 Markdown documents into layout subdirectories across the 27 active priority lanes. It covered Markdown only, so 32 machine-readable data files still sit at the top level of nine of those lanes, where the layout says supporting material does not belong.

Twenty-six of those files are referenced by scripts, tests, or runtime source through pinned paths, so moving them means editing their consumers in the same change. Six had no measured consumer and move on their own. The campaign runs in two stages for that reason: the unpinned six first, as a rehearsal that exercises the destination judgment without touching any consumer, then the pinned twenty-six.

This campaign is written for a Claude session. Claude may read anything here without asking and may run read-only Git commands. Git writes and publication remain Codex's under operator invocation, and nothing below authorizes them.

## Write Authorization

The operator authorizes repository writes under `reference/priorities/` for this campaign. Create, edit, move, and rename within that tree without asking per action. This covers every file relocation in both stages, because all 32 files and all their destinations are inside `reference/priorities/`, and it covers the work-log and campaign updates the completion section requires.

The authorization stops at that tree. Stage B's consumer edits land in `scripts/`, `tests/`, and `src/`, where the standing per-action write rule in [CLAUDE.md](../../../../CLAUDE.md) still governs: ask the operator before each of those edits. Do not read this grant as extending to generated artifacts, `content/`, `apps/`, or any file outside `reference/priorities/`, and do not treat a move inside the authorized tree as licence to change a file's content while relocating it.

The stage boundary matters more because of that split. Stage A is entirely inside the authorized tree and needs no approval at all; Stage B is where the conversation with the operator actually happens, and grouping its consumer edits by consuming file keeps that conversation short.

## Prerequisite Reading

Read [AGENTS.md](../../../../AGENTS.md) and the [workstream directory layout](../../README.md#workstream-directory-layout) before moving anything. The layout table owns the destination vocabulary and the rule that filing changes location only: it does not change a file's claim grade, evidence status, lifecycle state, or authority, and it does not retire it.

## Stage A — Six Files With No Measured Consumer

**Complete, 2026-09-05.** All six moved to the destinations below. The no-code-consumer finding held on re-derivation, but the original measurement had omitted `reference/` and `content/markdown/`, where ten Markdown documents did link to these files; those twenty links were repaired in the same change. No consumer edit outside `reference/priorities/` was needed. Stage B remains open.

| File, relative to `reference/priorities/` | Destination |
| --- | --- |
| `app-aaa-core/aaa-core-representative-path-workload-matrix.v1.json` | `contracts/` |
| `braid-program/f6c-dual-turn-return-search-2026-08-24.json` | `evidence/` |
| `braid-program/f6c-radial-frequency-continuation-2026-08-24.json` | `evidence/` |
| `braid-program/three-binary-five-coordinate-bounded-eom-comparison-2026-08-25.json` | `evidence/` |
| `mapping-electromagnetism/adaptive-cubic-background-o0-audit-2026-08-25.json` | `evidence/` |
| `mapping-electromagnetism/adaptive-cubic-site-local-release-ladder-audit-2026-08-25.json` | `evidence/` |

The absence of a consumer was measured by filename search over `scripts/`, `tests/`, `.github/`, `src/`, and `apps/` on 2026-09-05. That measurement is stale the moment anyone adds a reference, so re-derive it for each file before moving it rather than trusting this table. Absence of a search hit is also not the same as absence of a consumer: a path assembled at runtime from a directory constant and a filename will not match a full-path search, so search for the bare filename as well.

## Stage B — Twenty-Six Files With Pinned Consumers

| File, relative to `reference/priorities/` | Destination |
| --- | --- |
| `aaa-operations/browser-performance-baseline-2026-09-01.json` | `evidence/` |
| `aaa-operations/feedback-webapp-release-gate-2026-09-01.json` | `evidence/` |
| `aaa-operations/browser-performance-budget.v1.json` | `contracts/` |
| `aaa-operations/deployment-budget.v1.json` | `contracts/` |
| `aaa-operations/feedback-intake-policy.v1.json` | `contracts/` |
| `aaa-operations/observability-policy.v1.json` | `contracts/` |
| `aaa-operations/public-security-policy.v1.json` | `contracts/` |
| `aaa-operations/webapp-release-gate.v1.json` | `contracts/` |
| `app-aaa-core/aaa-core-accepted-history-stream.v0.json` | `contracts/` |
| `app-aaa-core/aaa-core-client.v0.json` | `contracts/` |
| `app-aaa-core/aaa-core-codec-registry.v0.json` | `contracts/` |
| `app-aaa-core/aaa-core-path-interchange.v0.json` | `contracts/` |
| `app-aaa-core/aaa-core-potential.v1.json` | `contracts/` |
| `app-aaa-core/aaa-core-query-transform-publication.v0.json` | `contracts/` |
| `app-borg/assembly-registry.v1.json` | `contracts/` |
| `app-borg/borg-release-budget-manifest.v1.json` | `contracts/` |
| `app-borg/library-classifications.v4.json` | `contracts/` |
| `app-borg/borg-preset-calibration-sweep.v1.json` | `evidence/` |
| `app-photon/helical-self-hit-phase-lock-sweep.receipt.v1.json` | `evidence/` |
| `braid-program/borg-platonic-relationship-assignments.v1.json` | `configurations/` |
| `braid-program/braid-candidate-adjudication-projection.v1.json` | `contracts/` |
| `field-speed-ceiling/fsc-004-t0-six-path-mpmath-receipt.v1.json` | `evidence/` |
| `field-speed-ceiling/fsc-010-circular-binary-all-root-mpmath-receipt.v1.json` | `evidence/` |
| `master-equation-closure/mec-007-stationary-mirror-incoming-oracle.v1.json` | `evidence/` |
| `source-mining/legacy-architrino-wordpress-mining-queue.txt` | `archive-analysis/` |
| `source-mining/legacy-architrino-wordpress-posts.jsonl` | `archive-analysis/` |

Destinations follow the layout table: versioned contract and policy artifacts to `contracts/`, receipts, oracle outputs, measured records, and dated audits to `evidence/`, enumerated configuration and candidate records to `configurations/`. Two assignments are debatable and were made deliberately. `app-borg/assembly-registry.v1.json` is a versioned artifact and also an enumerated record; it is filed as a contract because its consumers treat it as an interface. The two `source-mining` data files go to that lane's existing `archive-analysis/` rather than a new subdirectory, because they are the legacy archive that the directory already analyses. Where a destination looks wrong, say so with the reason rather than filing it elsewhere silently.

## Consumers

The consumer set measured on 2026-09-05 spans `scripts/`, `tests/`, and `src/`. Re-derive it rather than trusting this list, then update every hit.

```text
scripts/check-browser-performance-budget.mjs
scripts/check-deployment-budget.mjs
scripts/check-webapp-release-gate.mjs
scripts/check-borg-scientific-status-projection.mjs
scripts/build-machine-artifact-receipts.mjs
scripts/borg/audit-public-assembly-record-byte-identity.mjs
scripts/borg/build-assembly-registry.mjs
scripts/borg/build-assembly-view-collection.mjs
scripts/borg/verify-assembly-record-byte-identity.mjs
scripts/borg/verify-assembly-registry-migration.py
scripts/borg/verify-platonic-relationship-assignments.py
scripts/dev/BorgLibraryService.mjs
scripts/eom/export-compact-sweep-dashboard.mjs
scripts/field-speed-ceiling/circular-binary-all-root-mpmath-oracle.py
scripts/source-mining/build-legacy-architrino-archive.py
src/aaa-core/accepted-history-stream-v0.mjs
src/aaa-core/codec-registry-v0.mjs
src/aaa-core/path-interchange-v0.mjs
src/aaa-core/query-transform-publication-v0.mjs
src/apps/borg/BorgAppManifest.js
src/apps/borg/BorgPlatonicRelationships.mjs
src/apps/borg/BorgScientificStatus.mjs
src/apps/braid-search/BraidSearchRuntime.js
tests/aaa-core-accepted-history-stream-v0.test.js
tests/aaa-core-client-v0.test.js
tests/aaa-core-codec-registry-v0.test.js
tests/aaa-core-path-interchange-v0.test.js
tests/aaa-core-potential-v1.test.js
tests/aaa-core-query-transform-publication-v0.test.js
tests/borg-assembly-registry.test.js
tests/borg-eom-migration.test.js
tests/borg-library.test.js
tests/borg-measured-run-presets.test.js
tests/borg-platonic-relationships.test.js
tests/borg-scientific-status.test.js
tests/braid-search-borg-navigation.test.js
tests/browser-performance-budget.test.js
tests/compact-sweep-dashboard-data.test.js
tests/deployment-budget.test.js
tests/operations-observability-policy.test.js
tests/operations-public-security-policy.test.js
tests/public-feedback-intake.test.js
tests/test_field_speed_ceiling_circular_binary_all_root_certificate.py
tests/test_field_speed_ceiling_t0_mpmath_oracle.py
tests/test_mec007_stationary_mirror_incoming_oracle.py
tests/webapp-release-gate.test.js
```

Two consumers are easy to miss because they are not code. `scripts/field-speed-ceiling/t0-six-path-oracle-input.v1.json` names the FSC-004 receipt path inside a JSON payload, and `src/apps/borg/library/README.md` names `assembly-registry.v1.json`, `library-classifications.v4.json`, and `braid-candidate-adjudication-projection.v1.json` in prose.

Search for bare filenames as well as full repository-relative paths, and read each hit before editing it. A path assembled from a directory constant and a filename will not appear as a full path anywhere.

## Hazards

Three of these files are read by the content-integrity gate, through `scripts/check-webapp-release-gate.mjs`, `scripts/check-deployment-budget.mjs`, and `scripts/check-browser-performance-budget.mjs`. A missed reference in one of those does not fail at edit time; it fails in continuous integration, or, worse, a checker that resolves a missing input to a default passes without checking anything. Before moving those three, read each checker's failure path and confirm it errors on a missing input rather than skipping. A gate that passes vacuously after this change is a worse outcome than a gate that fails, because it looks like success.

`scripts/borg/build-assembly-registry.mjs` consumes four of these files and feeds the Borg record byte-identity verification. Any change in its output bytes is a stop condition, not an expected consequence of relocating an input.

## Validation

Run after each stage and report exact output:

```bash
node scripts/check-content-integrity.mjs
node scripts/validate-priority-ranking.mjs
node --test tests/
```

Run the Python tests named above with `"${AAA_VENV:-../.venv}/bin/python"` rather than system Python.

Then, as a separate check, confirm that no reference to any former path survives in `scripts/`, `tests/`, `src/`, `apps/`, `.github/`, or `reference/`. A passing suite is not that evidence: a reference inside an untested branch, a docstring, or a rarely run script passes the suite and is still wrong.

Do not regenerate `content/generated/reference/reference-surface.v1.json` to make a check pass. It is an ignored runtime asset that refreshes on the next `prepare-runtime-assets` run.

## Stop Conditions

Stop and report an exact blocker rather than proceeding if a consumer resolves its path dynamically in a way a literal rewrite cannot express; if a checker or test tolerates a missing input instead of failing; if `build-assembly-registry.mjs` output bytes change; if a file's correct destination is genuinely ambiguous under the layout table; or if any validation command fails for a reason not attributable to this change.

## Completion

Add a dated entry to [../work-log.md](../work-log.md) recording the files moved, the consumers updated, the exact validation commands and their results, and the residual-reference search result. Grade the claim: counts and command results are measured, and each file's destination is an editorial judgment. State the falsifier, which is any surviving reference to a former path, or any consumer that reads a moved file from where it used to be.

When both stages are complete, update the 2026-09-05 work-log entry so it no longer describes these files as outstanding, and remove this campaign from the queue that carries it.

Do not stage, commit, push, or open a pull request. Publication happens only under an explicit operator invocation of [codex-pr-branch.md](../../../op/git/codex-pr-branch.md).
