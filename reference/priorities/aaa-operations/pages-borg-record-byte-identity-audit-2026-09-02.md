# Published Borg Record Byte-Identity Audit — 2026-09-02

## Scope And Claim Grade

This is a measured production-packaging audit of `https://www.architrino.com`, not a scientific validation of any Borg configuration. The instrument downloaded the deployed `assembly-registry.v1.json`, downloaded all 145 record URLs named by that registry, computed SHA-256 over the received bytes, and compared each digest with the registry's deployed `recordSha256`. No production or repository state was changed by the measurement.

Plainly: this audit asks whether the website delivered the exact record bytes its own registry promises. It does not ask whether the underlying assembly is physically correct.

## Production Result

| Field | Measured value |
| --- | ---: |
| Pages workflow run | `33582467854` |
| Deployed source commit | `897fe1aa79be7ae1e77144d52ef396d209645323` |
| Registry revision | `borg-assembly-registry.2026-09-01.v1` |
| Registry entries | 145 |
| Record bytes downloaded and hashed | 119,457,972 |
| Matching record hashes | 2 |
| Mismatching record hashes | 143 |

The two matching files were `all-axial-three-binary-boundary.assembly-view-record.v0.json` and `stella-octangula-static-assembly.assembly-view-record.v0.json`. The other 143 deployed record files did not match the exact byte identities declared by the deployed registry.

Plainly: the public registry loads, but it points to expected hashes that disagree with nearly every moving numerical record the same deployment serves.

## Bounded Cause Isolation

The representative `three-axis-circular-coincident-midpoints.assembly-view-record.v0.json` was generated from the exact deployed source commit on macOS with Node 26 and again with the bundled Node 24 runtime. Both local runs produced 715,241 bytes with SHA-256 `0b3fc42b6ee30b2b941d36d774c0124741636041a695b16673eb6dfbf490f608`, matching the deployed registry. The public Actions-built file also had 715,241 bytes but SHA-256 `b2b79ba9cfd8e9f5d1d6be29100dd52a72ee84ba9bc36e7cfdbe2985397fb317`.

A recursive JSON comparison found 66 differing numeric leaves, zero non-numeric differences, a maximum absolute difference of `9.094947017729282e-13`, and a maximum relative difference of `9.795663545840445e-10`. Differences occurred in generated interpolation coefficients and position/velocity error fields. The same macOS bytes under Node 24 and Node 26, combined with different Ubuntu Actions bytes, strongly isolate the cause to platform-dependent floating-point evaluation or serialization. The exact instruction or library responsible has not yet been proven.

Plainly: the original 91-byte total was incidental—some decimal spellings became a character longer or shorter. The numerical values barely moved, but changing even one byte changes SHA-256 completely.

## User-Facing Importance

`src/apps/borg/BorgBootstrap.js` hashes a fetched record and rejects it when the digest differs from the registry's `recordSha256`. Therefore this packaging mismatch can prevent exact-record loading for the 143 mismatching entries. The loader behavior is a code-path fact; this audit did not interactively exercise all 143 records in a browser.

## Implemented Resolution

The candidate fix on `codex/malachite` advances the prescribed assembly record emitter to `prescribed-assembly-record-emitter.v5` and declares `assembly-view-record-position-grid.v2`. For each segment, coefficient $k$ is rounded to the nearest multiple of $2\times10^{-11}/\Delta T^k$, where the integer power of $\Delta T$ is evaluated by repeated IEEE-754 multiplication rather than the runtime's exponentiation function. Position and velocity residual bounds are enlarged by the worst-case grid contribution and rounded upward. Derived display vectors and sampled ansatz points use the same $2\times10^{-11}$ position grid; source specifications and scientific identity inputs are not rewritten.

Plainly: the rounding scale is defined by how much a coefficient can move the displayed path, not by how many digits happen to appear in a very large or very small coefficient.

Applying the first position-grid candidate to all 145 pairs of historical macOS-reconstructed and Ubuntu Actions-produced records collapsed 51,051 numeric differences to 145 byte-identical pairs; the input pairs had zero non-numeric differences. Fresh GitHub execution then falsified that candidate: Node 22 and Node 26 represented `duration ** k` one binary step apart for some segment durations, so 59 regenerated records still disagreed even when the selected grid integer was the same. Version 2 removes that runtime-dependent power operation from the grid definition. Independent fresh generation under local Node 22 and Node 26 then produced the same 145 records and registry hashes, totaling 116,875,800 bytes.

GitHub Actions run `33685894947` checked commit `8a11dc9bd70804009181edde0e05f2048d217232` on Ubuntu 24.04 with Node 22.23.2. Its source-only runtime preparation generated the records, and the verifier reported 145-of-145 agreement across the source catalog, registry, assembly-view collection, record identities, and record SHA-256 values. The broader Content Integrity job later stopped on a stale generated startup-orientation file from concurrent branch work, after the Borg verifier had passed; the artifact upload and deployment were therefore skipped.

The Pages workflow now runs `scripts/borg/verify-assembly-record-byte-identity.mjs --check` before `actions/upload-pages-artifact`, and the full content-integrity runner performs the same check immediately after preparing runtime assets. The verifier fails closed on a missing record, omitted catalog identity, changed URL, record/registry identity disagreement, byte-hash disagreement, or collection/registry disagreement.

This is measured local and current-branch Ubuntu evidence for byte-portable generation. A verified `main` deployment, a post-deployment 145-of-145 public audit, and representative exact-record loading remain required before OPS-013 is closed.

## Required Resolution

OPS-013 closes only when all four conditions hold:

1. Sealed record generation is byte-portable across the supported local and Actions environments, or the record format defines and implements a canonical numeric encoding before hashing.
2. The Pages build fails before publication when any generated record digest differs from the registry entry that names it.
3. A production audit reports 145 matching hashes out of 145 deployed records.
4. Representative exact-record selections load successfully in Borg after deployment.

The falsifier for closure is any generated or deployed record whose byte digest differs from its registry `recordSha256`.

Closure goal: restore one portable, fail-closed byte-identity contract between every published Borg registry entry and its sealed record.
