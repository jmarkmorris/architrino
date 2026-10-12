# Evidence: stationary fixture obligations, task 2 (2026-10-11)

This directory holds the patches and the two session instruments for the [task-2 note](../../analysis/saturday-stationary-fixture-obligations-2026-10-11.md). It was extended after the [Codex review](../../analysis/saturday-stationary-fixture-obligations-codex-review-2026-10-11.md) (findings T1 to T5): the two instruments, the first patch and every original output are unchanged; two patches for the corrected fixture and two retention folders were added. The subject of the task is one edited source file, `src/eom/native/eom_stationary_joint_frontier_fixture_cli.cpp`. The instruments check the record that file prints. They import no solver code and were written in the same session as the edit; their agreement with the fixture's own assertions is agreement about one record and is not an independent qualification of the solver or of any trajectory.

## Files

| File | Bytes | SHA-256 | Role |
| --- | ---: | --- | --- |
| `fixture-v5.patch` | 50,610 | `a2136880232f887ea2c5479e47446bcd9b1849bbafa21498eccc3183f19e2ee2` | `git diff` of the first v5 fixture against the committed file; kept unchanged |
| `fixture-v5.1.patch` | 59,377 | `5b187b78130d0abeab0f332029ad9dd139880ac91ad2b6efafbe92b3386cfde9` | `git diff` of the corrected fixture against the committed file |
| `fixture-v5-to-v5.1.patch` | 12,541 | `a49a8acc79ac18166f2a2c2fb85dde7e22e42abf15c139354b32299f62bdd9eb` | `diff -u` from the first v5 fixture to the corrected one (seven hunks) |
| `fixture_record_check.py` | 21,024 | `112d326fd62f01d4a92a41af62b8c58c21b57e18ca73c71547fb1a38550c7a64` | the checker, frozen before the fixture was edited |
| `record_mutation_controls.py` | 3,434 | `a917fb1404de5a68339018e97adf26f06b535524d3f11937c9664933b5071874` | twelve single-defect mutations of a real record, run after the target passed |
| `history/fixture_record_check.attempt1.py` | 19,588 | `507fec12ae430fb201f393f1dda17d3769f33ac67e84c44840a9b77cf0e4f05b` | first version; failed its own known case |
| `history/fixture_record_check.attempt2.py` | 19,735 | `8c0ace246f56f68e02b13584f91af205c138d03d099ba1e7760c2907c3e3b579` | second version; revised before the fixture edit |

Fixture source: preimage SHA-256 `430b592d788b2f3a05a07810eafbb7ef0468f3542b54db2866162f1ae30fa7ae` (the committed bytes); first v5 file `2423f31c5ff00891ec55acbdf40cf515e686b5cc00d0824e237a261c36eb782f`; corrected file, now live, `fc103b0ce523990479195be56c071fe83b8c9bc86f6ce8da7f9c418aaf0a5a7d`.

## Order of events (UTC, 2026-10-11, from `date -u` and the supervisor records)

1. 22:46:47 fixture preimage verified, no tracked diff.
2. 22:53:20 checker attempt 1 fails its analytic known case (charge product $1/36$ against the request's charge tokens, a difference in the thirty-fifth digit). No target existed.
3. 22:53:31 attempt 2 passes its known cases. Then a reading of `CoupledEvolution.cpp` showed that an accepted step has no separate recertification snapshot; its `accepted_snapshot` is the recertification on the published history. The record's field names were changed (`consumed_*`, `recertification_*`) and one more defective known case was added.
4. 22:54:51 the checker is frozen at `112d326f…7a64`; the fixture file is still the preimage.
5. 22:57:46 the fixture file is written (`2423f31c…782f`), after re-verifying the preimage in the same command.
6. 22:58:19 to 22:58:39 build. 22:58:48 to 22:59:34 first no-argument run. 22:59:47 the frozen checker passes the record.
7. 23:00 to 23:04 diagnostic runs, the registered test, the mutation controls and a repeat run.

8. 23:14 review received. In the first v5 fixture the two C++ comparison functions were used on evolved histories (the final step's publication, then the rejected control) before their own defect controls ran. That order is a fact about every run listed in steps 6 and 7 and is not altered here.
9. 23:15:48 the first v5 build subject is captured (see "Preserved build subjects").
10. 23:17:14 the corrected fixture is written (`fc103b0c…5a7d`) after re-verifying the first v5 bytes; 23:17:19 rebuild finished; 23:17:30 to 23:18:15 corrected no-argument run; then the frozen checker and the mutation controls on the corrected record.

Neither earlier checker version was ever run on a fixture record.

## The checker

`fixture_record_check.py` reads a v5 record with exact decimal parsing and checks each row of the note's requirement table:

- **Structure:** schema, minimum-reach token, prefix status, four ordered pairs present once each in the consumed, recertified and direct snapshots, certified statuses, root counts, carrier ends and counts.
- **Independent arithmetic:** each cross root's width against the unchanged tolerance; the causal equation $\lvert X_r(T)-X_t(S)\rvert=T-S$ as an interval test from the printed receiver enclosure at $T$, the printed transmitter hull over the root bracket, and the bracket; the canonical per-root acceleration $\kappa\,\sigma\lvert q_iq_j\rvert/(r^2\lvert D_t\rvert)$ as an interval from the same data, which must meet the solver's recertified total; overlap of consumed and recertified totals; direct-against-traversal row comparison done by the checker itself.
- **Rejection control:** the two printed control sets differ in `root_tolerance` only; the tolerance is at most a quarter of the smaller printed receiver radius and below it; the step is rejected with the expected code, stage and row diagnostics; accepted time unchanged; both invariance blocks equal, with matching digests and non-zero counts; comparator self-tests detected.

**Known cases, asserted before any target file is read.** K1: an analytic stationary pair at $x=\pm\tfrac12$, emission time exactly $T-1$, transmitter factor $1$, acceleration $\mp\kappa\lvert q_iq_j\rvert$, must pass. K2: seventeen copies of K1 with one defect each (shifted root, scaled acceleration, missing pair, wide root, parity difference, wrong reach, unequal or vacuous invariance, wrong digests, loose or extra control changes, accepted control, moved accepted time, other refusal route, blind comparator, mandatory frontier, disjoint consumed acceleration) must each be detected by the expected message.

**What it cannot do.** It reads the record. It cannot check that the fixture computed the record correctly. The enclosures and hulls it uses are printed by the solver's own history layer. Its arithmetic is `decimal` at sixty digits with rounding to nearest, applied to printed endpoints, and its interval tests are intersections; it is a consistency check and not an outward-certified interval reference. It takes certificate statuses, equality flags and digests as reported and does not reconstruct carriers, isolate roots or check root completeness. It compares the two printed numerical-policy sets with each other and does not pin the positive policy itself; that the positive request is unchanged is established by the patch. It does not read the `comparator_known_cases` block added in the corrected record. It certifies nothing about the true solution.

## The fixture's own comparison controls (corrected version)

These are C++ controls inside the fixture, separate from the Python reader. Before either comparison function sees an evolved history the fixture builds two-segment carriers by hand and requires: an ordinary carrier equal to an independently built copy; unequal to a copy with the constant position `0.25` in place of `0.5`; unequal to a copy with position error `2e-14` in place of `1e-14`; a joint carrier (two symbols, one coefficient `1e-7`, one remainder radius `1e-8`) equal to an independently built copy; unequal to a copy with coefficient `2e-7`; unequal to a copy whose radius is moved up by one binary64 step. If any of the six fails, or a constructor throws, the fixture stops with exit status 1 before the minimum-reach block. Afterwards, on the real carriers, one path's carrier against the other's must differ for both kinds, and a real joint carrier with one radius moved by one step must be constructed and must differ; a constructor exception there now fails the control. In the corrected run all were satisfied. No run demonstrates the refusal path of the six controls, because that would need a deliberately broken build.

## Retained outputs

Outside Git, in `.local-data/aaa-work-threads/saturday-quantitative/claude-task-2/`: 30 files, 7,960,905 bytes, listed with digests in `manifest.sha256` there (30 lines). The principal ones:

| File | SHA-256 | Content |
| --- | --- | --- |
| `source-digests-before-build.txt` | `cf899c159f6c1d93ac13401820d43732a1152d00293d26423296b81401319604` | first v5: digests of the 83 files under `src/eom`; the lists taken after the build and after the runs are byte-identical |
| `run-noarg.stdout.json` | `52d683e55e37e2ff4ce9e275783516bcb94ee5bcd5a3dc7a3cede1e3739edf68` | the v5 record, 36,465 bytes; `run-noarg-repeat.stdout.json` is byte-identical |
| `check-noarg.out` | `829ea60651a611a275f5ce0a0d889aef6af32bf7d9d5af3367bab8f95ff907bd` | frozen checker on that record: known cases passed, `PASS` |
| `mutation-controls.out` | `16e994ad9260712bfc85733e065dc20b26f349e1e81c741624f48f3a86df2c84` | twelve mutations, each detected |
| `run-cc2.stdout.json` | `683c2910abb64dc4d26d7e0dd4c163c05e91d117fce9fa0d09e0509c9c95f3b0` | diagnostic mode with the earlier retained run's arguments |
| `cc2-candidate.json` | `e2f668c9949f65fc310f2f90706ee9b50547ad05faa7798f2fbbffc57c2cf634` | its rejected-candidate file, byte-identical to the one retained by the diagnosis |
| `configure-attempt1.stderr.log` | in the manifest | the failed first configure (Xcode licence message) |
| `fixture-v5-attempt1.patch` | in the manifest | `diff -u` of the scratch preimage copy against the written file; same change as `fixture-v5.patch` in another diff format |

The original manifest and its 30 payloads are unchanged and verify (`shasum -c`, 30 of 30).

### Preserved build subjects (added)

Listed in `manifest-supplement-1.sha256` (19 entries, SHA-256 `d5b5bfee046900051a22cb9b5d90473cd3f47980ec5d4d2710a9acffba1d010f`).

`preserved-v5-first/`, captured at 23:15:48Z while the live tree still matched the pre-build digest list:

| File | SHA-256 | Content |
| --- | --- | --- |
| `source-snapshot.tar` | `578b4d2f80e6633556bc8d0a06a16cd09b9d75dca2707c900e97bae13c171bd2` | the 83 files under `src/eom` and the two out-of-tree build inputs named by `cmake/EquationSourceIdentity.cmake`; extracted and compared with the pre-build digest list, equal |
| `eom_stationary_joint_frontier_fixture_cli.v5-first` | `c9d9bb2e7e6254bb647f4594b07766373cae2567135135a042cea137e22dcea6` | the binary that produced every first-v5 output |
| `eom_stationary_joint_frontier_fixture_cli.v5-first.cpp` | `2423f31c5ff00891ec55acbdf40cf515e686b5cc00d0824e237a261c36eb782f` | the first v5 fixture source |
| `CMakeCache.txt`, `toolchain-and-configuration-receipt.txt`, `out-of-tree-build-inputs.sha256`, `source-digests-at-capture.txt` | in the supplement | build configuration; host, compiler and CMake versions; the exact configure and build commands; digests |

`corrected-v5.1/`:

| File | SHA-256 | Content |
| --- | --- | --- |
| `eom_stationary_joint_frontier_fixture_cli.v5.1.cpp` | `fc103b0ce523990479195be56c071fe83b8c9bc86f6ce8da7f9c418aaf0a5a7d` | corrected fixture source |
| `eom_stationary_joint_frontier_fixture_cli.v5.1` | `e2d6b390175fd882c650afe3291882e72f3849a51858521736641d8f6aa40b17` | corrected binary |
| `source-digests-before-build.txt` | `166b8e3761ce7c87535df3ffbf95728a4b7aa4e82d108898b5317ecbad4509d9` | 83-file list; differs from the first v5 list in the fixture file only; the list after the run is identical |
| `run-noarg.stdout.json` | `856067184baa79316959ee903e6ae683bf172ccf8fe67ed3ae5b479f0ad41902` | corrected record, 37,414 bytes; equal to the first v5 record once the added fields are removed |
| `check-noarg.out` | `5f4689992de9adbdb67b8b70466a9cb5e10290f335d65a61e82b167f04abdae0` | frozen checker on the corrected record: `PASS` |
| `mutation-controls.out` | `16e994ad9260712bfc85733e065dc20b26f349e1e81c741624f48f3a86df2c84` | twelve mutations detected; byte-identical to the first v5 output |
| build and run supervisor records and logs | in the supplement | rebuild 4.412 s, run 45.384 s, both exit 0 |

The other 82 source files of the corrected build are those in `source-snapshot.tar`. Neither retention folder holds credentials or host state beyond the receipt's version lines. This is local retention under an ignored directory, not a backup.

Supervisor wall times, first v5: configure 0.853 s; build 20.287 s; no-argument run 46.631 s; repeat 49.8 s; registered test 49.57 s; diagnostic mode 46.178 s (default step) and 48.389 s (explicit step). The failed first configure took 1.144 s.

## Reproduce

From the repository root. The toolchain variables are the ones `src/eom/README.md` records for this host; they are per-process.

```bash
DEVELOPER_DIR=/Library/Developer/CommandLineTools cmake -S src/eom -B .tmp/stationary-fixture-build -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_SYSROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk
```

```bash
DEVELOPER_DIR=/Library/Developer/CommandLineTools cmake --build .tmp/stationary-fixture-build --target eom_stationary_joint_frontier_fixture_cli --parallel 2
```

```bash
.tmp/stationary-fixture-build/eom_stationary_joint_frontier_fixture_cli > .tmp/stationary-fixture-record.json
```

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/app-solver/evidence/saturday-stationary-fixture-obligations-2026-10-11/fixture_record_check.py .tmp/stationary-fixture-record.json
```

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/app-solver/evidence/saturday-stationary-fixture-obligations-2026-10-11/record_mutation_controls.py .tmp/stationary-fixture-record.json
```

Use the repository's compute supervisor for the build and the fixture run. The fixture run takes about 50 seconds and should exit 0; the checker should print `PASS`; the mutation controls should end with `ALL 12 MUTATIONS DETECTED`.

## What this can and cannot establish

It establishes that, for the recorded source states and builds, the first and the corrected fixture each exit 0; that a separate reader finds each record structurally complete and arithmetically consistent, at its stated precision, with the causal equation and the per-root acceleration evaluated from printed enclosures; that the reader detects each tested defect; that the corrected fixture's comparison functions pass six hand-written known cases before use; and that the first version's diagnostic-mode output for the earlier arguments is unchanged, the corrected version leaving that code untouched. It does not establish that the solver's enclosures contain the true solution, that the root-time refusal is necessary for every sound certificate, or anything about a physical trajectory.
