# Stage 3 Increment 1, Version 4: Admission Correction Receipt — 2026-10-12

The independent [review of version 3](../analysis/matched-pair-review-stage-3-increment-1-v3-2026-10-12.md) closed findings I1-R1, I1-R2 and I1-R4 and found one remaining admission case, I1-R3b. This receipt records its correction, in scratch and on the live solver bytes. Version 3 and everything before it are preserved unchanged: see the [version 3 receipt](matched-pair-stage-3-increment-1-v3-receipt-2026-10-12.md) and [its evidence directory](matched-pair-stage-3-increment-1-v3/). The reviewer's instruments and frozen references were read and not modified. Every instance uses $c_f=1$.

## The finding, accepted as found

Two things reached an early return unchecked.

- **Evidence supplied with histories that declare no radius.** Admission checked a supplied evidence object only when some history declared a radius. An evidence object issued for a generated population could therefore be supplied with the original exact histories, which it does not bind, and a zero-length request, an immediate cancellation or a step limit of zero returned it with the status of validated evidence and a continuation.
- **Malformed coupling and charges.** A coupling that is not a number was read only when a positive step used it, so the same three early returns completed with a continuation.

Neither is a failed enclosure. No step was certified on the wrong evidence; a non-binding object was carried and labelled.

## The correction

Admission, hypothesis H0, now also requires:

- the coupling and every charge to be an exact finite decimal token, optionally signed and with an exponent, that is also a finite binary64 value. No sign is excluded;
- any supplied evidence to bind every path's identifier, charge and content chain under the request's coupling, whether or not a radius is declared. Evidence remains required where a radius is declared. A non-binding object is refused, not discarded.

Both checks run in the producer's admission, which the driver calls before any early return, so a refused request returns no accepted time, no evidence, no ledger and no continuation. In the producer's step, the coupling is read only after admission has accepted its token; before, a malformed coupling raised an exception from the public producer where it now declines with `VFS-H0-01`. That exception was found by the new fixture on its first scratch run, and the output of that run is retained under `.local-data/eom-matched-pair/2026-10-12/increment-1-v4/first-run-producer-threw/`.

## How it was prepared and applied

A fresh scratch tree, `stage3g-tree`, was copied from the live version 3 bytes, corrected and qualified there: 100 of 100 assertions. The same edits were applied to `src/eom` with the host's file-editing tools; no shell command wrote there. **Measured at 19:31:45Z:** `diff -rq src/eom .tmp/eom-matched-pair/stage3g-tree/src/eom` reports no difference. The live build then ran under the owned-compute supervisor with exit status 0, finished 19:33:45Z after 120.0 s, with no compiler warning.

Four files differ from version 3: `ValidatedFarStep.cpp`, the two headers (comments only) and the evolution fixture program. [version-3-to-version-4.diff](matched-pair-stage-3-increment-1-v4/version-3-to-version-4.diff) is the whole change.

## Identities

| Item | SHA-256 |
| --- | --- |
| Live `src/eom` after version 4 | 90-file inventory [live-increment-1-v4-source-inventory.sha256](matched-pair-stage-3-increment-1-v4/live-increment-1-v4-source-inventory.sha256) |
| `ValidatedEvolution.hpp` | `2f2e9d246fb7638566333f98cb50e711cc664444f9f12ef97393215cdb4b5906` |
| `ValidatedFarStep.hpp` | `2bf1a998a59e9a2f1ef4335b9b4e92a63dd06a2aa1fd2e76150fbe87e891689f` |
| `ValidatedFarStep.cpp` | `a3dff0f538af2262f726f95c1a6ed7161f1e86e068ef99f44758b1b982b57c31` |
| `native/eom_validated_evolution_fixture_cli.cpp` | `239955a032b39d9669b1851d4092915d5188415152de72ad678a73b0ac510c4f` |
| Live build library, `.tmp/eom-matched-pair/build-live-increment-1-v4/` | `b08482d017b2b68b02f958068acb82be5d3d023b5001e877cc8a039c2ff99481` |
| Live evolution fixture program | `c9bd7fde93757319979e047c7e49167d334b34f70b7b598461b5730031ec822e` |
| [matched_pair_stage_3_increment_1_v4_check.py](matched_pair_stage_3_increment_1_v4_check.py) | `ff9d559b8a4203b881a8853a2441a1605fbad88ce1b80ac393ce55377ffdf65c` |
| Live outputs, 20 files | [live-output-identities.sha256](matched-pair-stage-3-increment-1-v4/live-output-identities.sha256); the files are under `.local-data/eom-matched-pair/2026-10-12/increment-1-v4/live-outputs/` |

The version 4 checker is the version 3 checker with rows added; no earlier checker was modified.

## Results on the live build

| Check | Result |
| --- | --- |
| Version 4 checker | 100 of 100 assertions, three recorded quantities, exit status 0 |
| Version 3 checker, unchanged, on the version 4 outputs | 86 of 86 |
| All 19 version 3 live output files against version 4 | byte-identical, so the correction changed no earlier output, including the six ordinary solver fixture outputs |
| Against the version 4 scratch outputs | every fixture output byte-identical |
| Library-port gate checker | 95 of 95 rows |
| `scripts/check-transmitter-factor-clean-slate.mjs` | passes |

The new fixture command emits 39 rows, 34 of them run summaries. Known cases first:

| Known case | Measured |
| --- | --- |
| Exact histories, no evidence, zero length | completes at time $0$ with a continuation and the status `no_validated_step_accepted` |
| Generated population with its own evidence, zero length | completes, keeps the evidence, and that evidence's chains equal the histories' chains |
| Couplings `0`, `-0.001`, `1e-3`, `+0.001`, zero length | each completes |
| Coupling `1e-3` for one step; charges `+1` and `-1e0` for one step | each accepts one certified step |

Then the refusals, each halted as `initial_population_refused` with `VFS-H0-01`, no accepted time, no evidence, no ledger, no continuation and no attempt:

| Refusal | Cases |
| --- | --- |
| The reviewer's target: a generated population's evidence supplied with the original exact histories | zero length, immediate cancellation, step limit of zero, and a positive-length run |
| Another exact population's evidence supplied with these exact histories | zero length |
| Malformed coupling | nine tokens at zero length: `not-a-number`, `nan`, `inf`, the empty token, `1e`, `0x10`, `1.0.0`, a leading space, and `1e400`, which is an exact decimal but not a finite binary64 value |
| Malformed charge | the same nine tokens at zero length |
| Coupling `not-a-number` | immediate cancellation, step limit of zero, and a positive-length run |
| Public producer | declines the non-binding evidence on the exact histories, a malformed coupling and a malformed charge with `VFS-H0-01` and publishes nothing |

## What this establishes and what it does not

**Claim grade: measured**, by the live build and the checkers above, on the cases listed. On the live bytes no early return carries evidence that does not bind the supplied population, and no early return accepts a coupling or charge outside the admitted grammar, while the genuine exact and generated early returns still complete.

It does not establish acceptance of increment 1; that is the reviewer's, on the reviewer's own unchanged admission probe, which was not run here. The fixture and checkers are the implementation writer's and are not independent evidence. The limits of the version 3 receipt stand: no grouping, workers or persistence; continuation and evidence sealed within one process; policy, controls and continuation not bound into the ordinary request or the checkpoint identity.

**Falsifiers.** The reviewer's unchanged admission targets returning a non-binding evidence object or a continuation on these bytes; a malformed coupling or charge completing any request; a known exact or generated early return refused; a previously closed finding reopening on this build; or any live file differing from the inventory.
