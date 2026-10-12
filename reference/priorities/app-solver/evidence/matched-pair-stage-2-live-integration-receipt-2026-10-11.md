# Matched-Pair Enclosure, Stage 2: Live Integration Receipt, 2026-10-11

This receipt records the application to the live checkout of the exact-piecewise extension accepted in the [independent candidate review](../analysis/matched-pair-review-stage-2-exact-piecewise-2026-10-11.md) and described in the [Stage 2 packet](../analysis/matched-pair-stage-2-exact-piecewise-packet.md). The extension lets the opt-in grouped enclosure for acceleration snapshots admit a search window spanning several cubic segments of each source, provided every segment the window meets is error free. It is the implementer's receipt; independent acceptance of the live state is the reviewer's. All numerical instances use $c_f=1$.

## 1. What was written

The operator's direct authorization of 2026-10-11T21:54Z named the five solver files and the three matched-pair files; this application stays inside it. Before applying, the live solver sources hashed equal to the live Stage 1 inventory, all six entries of the candidate's source manifest verified, and the one-statement patch's check mode reported its preimage unique.

| File | Change |
| --- | --- |
| `MatchedPairEnclosure.hpp`, `MatchedPairEnclosure.cpp`, `eom_matched_pair_fixture_cli.cpp` | Replaced by the accepted candidate files |
| `CoupledEvolution.cpp` | One statement: the snapshot's policy check accepts any known policy |

**Claim grade: measured.** After application, `diff -rq` between the accepted scratch tree and the live solver tree reports one differing file, `README.md`, which the reviewer had changed on the live tree after the scratch copy was taken; its hash is the same before and after this application, so it was preserved. Exactly four solver files differ between the live Stage 1 inventory and the live Stage 2 inventory, the four in the table. Falsifier: any other solver file whose hash differs between those two inventories.

No tracker, queue, work log, scope, reviewer file, README, checkpoint or transport file was edited, and no generated file was regenerated.

## 2. Build

Release, two workers, under the compute supervisor, in `.tmp/eom-matched-pair/build-live`, with the per-process Command Line Tools toolchain and the pinned 26.5 SDK, as for Stage 1. No compiler warning or error.

## 3. Results on the live build

**Disabled route.** **Claim grade: measured**, by `cmp`. The live native, acceleration and evolution `all` outputs are byte-identical to the frozen baseline; the dispersal output has identical keys in identical order and differs only in its four wall-clock fields.

**Stage 1 unchanged.** By `cmp` against the accepted live Stage 1 outputs: the module output, the evolution guard, the matrix negatives, the 47 snapshot cases and the 16 reviewer-input cases are each byte-identical. Adding the piecewise policy changed no Stage 1 byte.

**Stage 2 equals the accepted candidate.** By `cmp` against the accepted scratch outputs: the 16 piecewise module certificates, the 14 Stage 2 snapshot cases and the piecewise matrix negatives are each byte-identical.

**The reviewer's frozen join case, unchanged.** The reviewer's input file, SHA-256 `4c5d92c76433c9707f3d00903f4fb72874b5a65f92ff7ca05112353abe2618b9`, was run through the live fixture without modification. Its one case certifies, admits one group with cell boundaries $-15,-13,-12.5,0$, and gives a receiver total of $[-0.0774794,\,0.0774794]$ on the pair's axis. The output is retained with SHA-256 `ac510e353d56a736ae27e54da69beac09bada8f6768f22304c4a32cdc422a169`. Whether that interval contains the reviewer's exact value is the reviewer's comparison to make on these bytes; the implementer has not read the reviewer's expected values.

**Author's instruments.** The Stage 1 consistency instrument passes its known cases and eighteen further checks on the live outputs; the Stage 2 instrument passes its known cases, its known target and twenty further checks.

## 4. Identities and retention

| Item | Identity |
| --- | --- |
| Live solver source inventory | 82 files at 2026-10-11T22:24:04Z; list `.local-data/eom-matched-pair/2026-10-11/live-stage2-source-inventory.sha256`, SHA-256 `4cfab300dc88ba904f632cef33cffd426803f1f331fe08d51260dc32fb4d5361` |
| Live binaries, the four changed sources and the case files | `live-stage2-binary-source-case-identities.sha256` in the same directory |
| Live outputs | `live-stage2-outputs/` with `live-stage2-output-identities.sha256` |
| Build log | `live-stage2-build.log` |

Every Python step used `"${AAA_VENV:-../.venv}/bin/python"`. Raw outputs are local retention and are not a backup. No supervised job is running; every lease closed with exit 0.

## 5. What is established and what is open

Established on the live checkout: the accepted exact-piecewise extension is applied; the disabled route and every Stage 1 output are unchanged; and the Stage 2 outputs equal the accepted candidate's.

Open: the reviewer's independent acceptance of the live state, including its containment comparison on the join-case output; admission of any history carrying error radii, of the uniform-circular factory, or of solver-generated histories; and Stage 3, whose entry condition is not met. The capability is snapshot-only, applies only to error-free cubic segments, and carries no cost result.
