# Stage 3 Increment 4, Version 2: Record Admission and Request Binding, Scratch Receipt — 2026-10-12

The independent [review of the increment 4 scratch packet](../analysis/matched-pair-review-stage-3-increment-4-2026-10-12.md) held live application for two admission findings, I4-R1 and I4-R2. Both are accepted as found. This receipt records their correction in a new scratch tree. The [first scratch receipt](matched-pair-stage-3-increment-4-scratch-receipt-2026-10-12.md), its [evidence directory](matched-pair-stage-3-increment-4/), its tree and its outputs are preserved unchanged. **Nothing is applied to the live solver:** `diff -rq src/eom .tmp/eom-matched-pair/stage3i-tree/src/eom` reports no difference at 21:12:32Z, so the live tree is exactly accepted increment 3. Every instance uses $c_f=1$.

Neither finding forged evidence or contradicted a positive enclosure case. Both let something through that had not been checked.

## I4-R1: a record with no leg was restored without admission

**The defect.** Restore called the driver only inside its loop over legs. A record with no leg therefore came back as `restored`, with its origin paths, without its origin or controls ever passing the driver's admission. The record parser and the record-opening call checked only part of that domain. The reviewer's probe reseals five single changes to a genuine zero-leg record, a zero minimum step, no attempt allowance, a charge that is not a number, a coupling beyond binary64, and a duplicate path identifier, and all five were restored.

**The correction.** Opening a record now admits the origin through the driver itself: a zero-length call of the real evolution entry point, which applies its whole request and population domain and takes no step. This unit keeps no admission rules of its own. Restore opens the record's origin before anything else, so every successful restore, with or without legs, has passed that admission; a failure is reported at the admission stage with no usable state. Reading without replay is documented as returning well-formed but unadmitted claims.

## I4-R2: the record builder did not bind the request's population or evidence

**The defect.** When a leg was appended, the request's histories were compared with the record's last content chains, but a chain does not carry a path's identifier or charge, and the request's evidence was not compared at all. The reviewer's probe appends a genuine certificate with the request's receiver charge changed, with its identifier changed, and with a later generated evidence object supplied beside the original exact histories; all three were accepted.

**The correction.** The request's ordered population must equal the record's last boundary in identifier, charge and chain, path by path, and the request's evidence must be the evidence of that boundary: none at the origin, and otherwise the sealed evidence of the continuation the leg carries. The walk through the sealed evidence of each accepted step, added in version 1, is unchanged.

## Identities

| Item | SHA-256 |
| --- | --- |
| Scratch tree `.tmp/eom-matched-pair/stage3k-tree/src/eom`, copied from the version 1 scratch tree | 93-file inventory [scratch-increment-4-v2-source-inventory.sha256](matched-pair-stage-3-increment-4-v2/scratch-increment-4-v2-source-inventory.sha256) |
| `ValidatedRunRecord.hpp`, 254 lines | `933217d69975772d9c3ce126eb1bdfd6652218373d76a73632eb24f473b26c67` |
| `ValidatedRunRecord.cpp`, 1169 lines | `e5bf92f6c990b81162b84dc55284754114759ecd56e1fa4adc4880fe88f12f76` |
| `native/eom_validated_evolution_fixture_cli.cpp` | `ec64bdd0632b752168af59c948fef196fa1a6d3327b1033a87ef35dea23b0df0` |
| `CMakeLists.txt`, unchanged from version 1 | `cfcaa1bb0330101fdd212dc0f55ce4a4af8eb94dbcf67a79cd6799d9f724c6bd` |
| Scratch build library, `.tmp/eom-matched-pair/build-stage3k/` | `937e354dedfdb9e169eb5dc37fc1661919e553fb5ac390fe3e9e0444bf644804` |
| Scratch evolution fixture program | `061184e872e3a84b185247e097948e35fd9dd0abfb9837f526263d7048ca476c` |
| [matched_pair_stage_3_increment_4_v2_check.py](matched_pair_stage_3_increment_4_v2_check.py) | `e6a5d6b11b0df90bf8f84abb429e5b2c426fac6c0d996fd8cf75b62430d7fc28` |
| Reviewer's record probe, read and compiled unchanged | prefix `2a5ddb7ab916d096` |
| Scratch outputs, 36 files | [scratch-output-identities.sha256](matched-pair-stage-3-increment-4-v2/scratch-output-identities.sha256); the files are under `.local-data/eom-matched-pair/2026-10-12/increment-4-v2/scratch-outputs/` |

The evidence directory [matched-pair-stage-3-increment-4-v2/](matched-pair-stage-3-increment-4-v2/) holds the four sources, [increment-4-version-1-to-version-2.diff](matched-pair-stage-3-increment-4-v2/increment-4-version-1-to-version-2.diff), which is the whole correction in 204 lines, the cumulative difference from live increment 3, the run script, the checker output, the zero-leg record file, and the output of the reviewer's probe on this build. The build is CMake Release, two build workers, no compiler warning, under the owned-compute supervisor with exit status 0.

## Results on the scratch build

| Check | Result |
| --- | --- |
| Version 2 checker | 157 of 157 assertions, exit status 0 |
| First increment 4 checker, unchanged, on these outputs | 152 of 153. The one row that fails required every restoration to return a continuation. A genuine zero-leg restoration returns none, correctly, and the version 2 checker states the row as: a continuation is returned exactly when at least one leg was replayed |
| Twelve earlier evolution fixture files against accepted increment 3 live outputs | 12 of 12 byte-identical |
| Six ordinary and four far-step fixture files against accepted live outputs | 10 of 10 byte-identical |
| Record, worker and grouping outputs at four workers against one worker | byte-identical |
| The one-leg, three-leg and adaptive record files against version 1 | byte-identical: the record format and genuine records are unchanged |

**The reviewer's unchanged probe**, compiled against this build and run, with its known cases first:

| Probe target | Version 1 | Version 2 |
| --- | --- | --- |
| Known: exact-origin zero-leg replay | passes | passes |
| Zero minimum step | restored | refused at admission |
| No attempt allowance | restored | refused at admission |
| Charge not a number | restored | refused at admission |
| Coupling beyond binary64 | restored | refused at admission |
| Duplicate path identifier | restored | refused at admission |
| Known: genuine one-leg append and restore by record identity | passes | passes |
| Request charge changed | appended | refused |
| Request identifier changed | appended | refused |
| Request field speed changed | refused | refused |
| Later evidence supplied with the exact origin | appended | refused |

Every refused restore reports no paths, no evidence and no continuation.

**The fixture's own cases for the two findings.** Known first: a genuine exact origin with no leg restores as itself under record-only and by record identity, with three paths, no evidence, no continuation and an extendable record. Then six resealed changes refused at admission, the reviewer's five and an initial step below the minimum; the same five refused when a record is opened; and the three request changes plus the field-speed control refused by the builder.

Across this build there are 115 restore results: 94 refusals and 21 restorations. No refusal returns usable state.

## What this establishes and what it does not

**Claim grade: measured**, on the scratch build, for the cases listed.

Established on these cases: no restore succeeds on an origin or controls the driver does not admit, with or without legs; a leg is appended only when the request is the record's own continuation in population and evidence; and genuine records and every earlier output are unchanged.

Not established, as before: authentication of a record across processes, durability of the written file, any timing of replay, larger populations, and binding into the ordinary request or the checkpoint identity. The reviewer's probe was run here unchanged as a convenience; its independent run is the reviewer's. Live qualification has not been attempted.

**Falsifiers.** A restore that succeeds for an origin or control the driver refuses; an append accepted for a request whose population or evidence differs from the record's last boundary; a genuine record or earlier output that changed; or usable state after any refusal.
