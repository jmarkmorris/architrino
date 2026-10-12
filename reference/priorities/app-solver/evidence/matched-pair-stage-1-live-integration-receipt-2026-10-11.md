# Matched-Pair Enclosure, Stage 1: Live Integration Receipt, 2026-10-11

This receipt records the application of the reviewed Stage 1 snapshot route to the live checkout, the far-field contract correction, and the controls run on the live build. The design is the [Stage 0 packet](../analysis/matched-pair-stage-0-design.md) with [addendum 1](../analysis/matched-pair-stage-0-addendum-1.md); the implementation is the version reviewed in the [version 3 preparation record](../analysis/matched-pair-stage-1-preparation-v3.md) and its [independent review](../analysis/matched-pair-review-stage-1-v3-2026-10-11.md). The capability is an opt-in grouped enclosure for canonical acceleration snapshots, default disabled, refused by the evolution entry points. This receipt is the implementer's; independent acceptance of the live state is the reviewer's. All numerical instances use $c_f=1$.

## 1. Authorization and what was written

The operator authorized the edits directly in the implementing session at 2026-10-11T21:54Z, in answer to a request naming the far-field contract, five solver files and three new files. The session's host accepted every write. Before applying, the live solver source hashed equal to the Stage 0 inventory, by a diff of the two SHA-256 lists, and the version 3 patch's check mode reported every preimage unique.

| File | Change |
| --- | --- |
| `src/eom/include/architrino/eom/MatchedPairEnclosure.hpp`, `src/eom/src/MatchedPairEnclosure.cpp` | New. Byte-identical to the reviewed version 3 files |
| `src/eom/native/eom_matched_pair_fixture_cli.cpp` | New. The reviewed version 3 fixture plus the five coverage controls of section 4 |
| `src/eom/CMakeLists.txt`, `CertifiedAcceleration.hpp`, `CertifiedAcceleration.cpp`, `CoupledEvolution.hpp`, `CoupledEvolution.cpp` | The reviewed version 3 guarded patch, applied by its script |
| `contracts/far-field-contribution-enclosure.md` | Bound, cutoff and one table row corrected; section 5 |

**Claim grade: measured.** After application, `diff -rq` between the reviewed scratch tree and the live solver tree reports one differing file, the fixture, and no other difference. The eight changed or added solver files are the only entries that differ between the Stage 0 inventory and the live inventory, by a diff of the two hash lists. The thirteen tracked and five untracked solver files that other work had already modified are untouched apart from the three of them the patch edits by guarded exact-string replacement, namely `CMakeLists.txt`, `CoupledEvolution.hpp` and `CoupledEvolution.cpp`; the two `CertifiedAcceleration` files had no prior modification. Falsifier: a solver file outside those eight whose hash differs from the Stage 0 inventory at the live inventory time, 2026-10-11T21:59:54Z.

No tracker, queue, work log, scope document, reviewer file, README, checkpoint or transport file was edited. No generated file was regenerated.

## 2. Build and a toolchain change

Between the Stage 0 baseline build and this one, the Xcode toolchain on this host began refusing to run with the message that the Xcode license agreements have not been accepted. Accepting a license is a system action outside this task. The live build therefore selects the Command Line Tools toolchain for its own processes with `DEVELOPER_DIR=/Library/Developer/CommandLineTools`, keeping the same pinned `MacOSX26.5.sdk`. Its compiler reports Apple clang 21.0.0 build 2100.3.34.2; the baseline was built with build 2100.1.1.101. No system setting was changed.

To keep the comparison like for like, the read-only baseline snapshot was rebuilt with the same Command Line Tools toolchain and its fixtures rerun. **Claim grade: measured**, by `cmp`: that rebuilt baseline's native, acceleration and evolution `all` outputs are byte-identical to the original frozen baseline outputs, and its dispersal output differs only in the four wall-clock fields. The toolchain change therefore does not alter these outputs, and the live comparison below is not confounded by it.

The live build is Release, two workers, under the compute supervisor, in the separate directory `.tmp/eom-matched-pair/build-live`, with no compiler warning or error.

## 3. Results on the live build

**Known control first.** The known static source at distance two gives a receiver total containing $-1/4$ on the exact route.

**Disabled route.** **Claim grade: measured**, by `cmp` and a field comparison. With the policy at its default, the live native, acceleration and evolution `all` outputs are byte-identical to the frozen baseline. The dispersal output has identical keys in identical order and differs only in the four wall-clock fields. No numerical field was filtered and no schema or source-identity difference appears in these outputs. This establishes that the disabled route is unchanged on these fixtures; it is not evidence that any enclosure is correct.

**Agreement with the reviewed scratch outputs.** By `cmp`, the live outputs for the sixteen reviewer-input cases, the matrix negatives and the evolution guard are byte-identical to the version 3 scratch outputs. The first forty-five live snapshot cases are identical to the scratch ones, and every module line that existed in version 3 is identical. The reviewer's containment comparison, made on those reviewer-input bytes, therefore applies to the live output unchanged.

**The reviewer's instruments, unchanged, on the live library.** The consumer harness passes its known control and reports all three targets refused. The matrix probe passes its known nine-slot control and reports all fourteen targets refused, including the false-separation target. Both outputs are byte-identical to the version 3 reruns. These are the implementer's reruns.

**Controls.** Module: 33 certificates, 10 enclosed, 1 absent, 22 declined. Single-request mutations: 36, all refused after the genuine certificate is accepted. Complete matrix: 9 mutations and a 37-field sweep, none certified. Snapshots: 47 cases. Evolution guard: both entry points and an unknown policy refused. The author's consistency instrument passes its known cases and eighteen further checks on the live outputs.

## 4. Coverage items named by the review

**Unequal retained starts.** At snapshot level, both far-field scheduling paths require a common history start, so a population with unequal starts never reaches the grouped route. A live snapshot with the follower's history starting ten time units earlier takes the exhaustive exact route, attempts no group, and returns totals bit-identical to the same snapshot with the policy disabled. At module level, a window that starts before a member's retained history exists is declined with `MPE-WINDOW-01`. A member whose retained history starts before the window is admitted only when its earlier interval is re-proved root free from its own history; the control has a recomputed prefix residual of about $-10.005$ on both endpoints and is recorded as `member_prefix_reproved`. No source-time region is left unaccounted in an admitted group. Whether the review's word "refusal" requires declining that re-proved case as well is the reviewer's call; the route as built accounts for the region instead of refusing it.

**Nonfinite or inadequate arithmetic.** Three module controls decline with `MPE-BOUND-01`: a distance floor whose cube underflows, so the radius cannot be evaluated; a finite but very large position whose squared distance overflows; and a charge token that is not a decimal. A history whose own position hull is nonfinite cannot be constructed at all, because the retained-history layer refuses it before any enclosure route; that was observed when an earlier form of the overflow control failed in the history constructor.

**Receiver-total exhaustion.** No control reaches the snapshot's receiver-total failure, and the reason is structural. For one receiver the self relationship is never enclosed, so at most $N-1$ sources are enclosed. Each individually enclosed source spends at most one slice lower endpoint, and each group spends at most the downward-rounded sum of two. The receiver's enclosed width is therefore at most $(N-1)$ slice lower endpoints, which is below the allocation $f_{\mathrm{FF}}\tau_A$ by about one slice, a relative margin of $1/N$. Upward rounding of the running sum adds at most about $N$ units in the last place, a relative amount near $N\cdot2^{-53}$, which is smaller than $1/N$ for any population below about $10^{7}$ paths. **Claim grade: derived**, as a bound on admitted widths; falsifier: a certified snapshot whose receiver enclosed width exceeds its allocation while every enclosure passed its own slice test. What is measured is that group widths enter the receiver sum: in the static control the receiver's enclosed width equals the one group's emitted width. The receiver-total test itself is existing code, unchanged, and remains a defensive ledger check.

## 5. Contract correction

`contracts/far-field-contribution-enclosure.md` now states the individual bound the classifier evaluates and the binding supports, $B_{ij}=\kappa^+Q^+_{ij}c_f^+/((r^-_{ij})^2\nu_{s,ij})$ with $\kappa^+=\sup|\kappa|$, replaces the cutoff accordingly, replaces the sentence asserting that a receiver-speed numerator is required by a statement that the canonical weight is receiver-independent, and keeps the receiver speed bound in the `FFE-NORMAL-01` row as a diagnostic value. Its SHA-256 changed from `2cd1ef7e04721948ae6045f7f2bd0ee3fadcaf97b978e2d4cc4720aeecc5ddc1` to `443f1cee8b8357cfab520c35fb9a54227b88474c1c49d3be3d5761ef3c6070f2`. The law is unchanged. Its links resolve, its display delimiters are paired and it has no whitespace diagnostics.

The edit makes `content/generated/reference/reference-surface.v1.json` stale, as do the new records of this work; `node scripts/build-reference-surface.mjs --check` reports it. That is the expected consequence of editing a source the index fingerprints, and regeneration belongs to the publication procedure: `node scripts/build-reference-surface.mjs --write`.

## 6. Identities and retention

| Item | Identity |
| --- | --- |
| Live solver source inventory | 82 files at 2026-10-11T21:59:54Z; list `.local-data/eom-matched-pair/2026-10-11/live-stage1-source-inventory.sha256`, SHA-256 `0e736f7ed6acfda25b4c7949b32de43db5ba514fb5726ec80e597d4073393f9b` |
| Module header and source | `7c74472de5371240…` and `4e9cdc0c5817f56b…`, equal to the reviewed version 3 files |
| Fixture | `8da7d6afd6f8acbc…` |
| Live binaries, rebuilt reviewer instruments, case files and contract | `live-stage1-binary-case-contract-identities.sha256` in the same directory |
| Live outputs | `live-stage1-outputs/` with `live-stage1-output-identities.sha256` |
| Same-toolchain baseline outputs | `baseline-clt-outputs/` |
| Build logs | `live-stage1-build.log`, `baseline-clt-build.log` |

Every Python step used `"${AAA_VENV:-../.venv}/bin/python"`. Raw outputs are local retention and are not a backup. No supervised job is running; every lease closed with exit 0.

## 7. What is established and what is open

Established on the live checkout: the reviewed Stage 1 route is applied; the disabled route reproduces the frozen baseline; every control and both reviewer instruments give the results they gave on the reviewed scratch build; and the contract states the implemented bound.

Open: the reviewer's independent acceptance of the live state; the solver README, the trackers and the scope's execution section, which this session does not own or was not authorized to edit; the persistence and transport bindings a later evolution route would need; and all of Stages 2 and 3. The capability is snapshot-only on single-segment, error-free cubic source windows, applies less often than a geometric pairing would, is not always tighter than the individual route, and carries no cost result.
