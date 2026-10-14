# Stage 3 Increment 3: Worker Threads in the Validated Step, Scratch Qualification Receipt — 2026-10-12

Increment 3 lets one validated step evaluate its receivers on several threads. The independent reviewer released it in the [increment 2 live review](../analysis/matched-pair-review-stage-3-increment-2-live-and-successors-2026-10-12.md), with two requirements: the first terminal result in receiver order decides a step whether it is a refusal or an exception, and every started worker is joined on every way out. This receipt is the scratch packet. **Nothing here is applied to the live solver:** `diff -rq src/eom .tmp/eom-matched-pair/stage3h-tree/src/eom` reports no difference at 20:26:51Z, so the live tree is exactly accepted increment 2. The design is section 2 of [design addendum 4](../analysis/matched-pair-stage-3-evolution-design-addendum-4.md). Every instance uses $c_f=1$.

## What was built

- **An indexed runner**, in a new header `ValidatedWorkers.hpp`. It runs a task for each index and returns the lowest index whose task ended terminally, by returning true or by throwing. An exception is caught on the thread that ran the task and stored for its index; it never crosses a thread. With one worker the tasks run in order on the calling thread and stop at the first terminal one, as a plain loop does. With more, helper threads share the indices with the calling thread, every task runs, and a guard object joins every started helper on every way out of the function. If a helper cannot be started, the calling thread and the helpers already running finish the work.
- **The receiver loop of the step producer as a task.** The body of the loop over receivers is unchanged except that it writes to that receiver's own record: its pair entries, its group entries, its acceleration box, and at most one refusal. The acceleration box is summed inside the task in the order the loop used. After the runner returns, the calling thread merges the records in receiver order up to and including the terminal receiver, then either rethrows that receiver's exception or declines with its refusal. Records of higher receivers are dropped.
- **Worker count as execution metadata.** The producer takes a worker count when it is constructed, at least one, default one. The driver's request carries one and passes it on. Both certificates record it. It is not a bound control of the continuation.

Everything else in a step runs on the calling thread as before: admission, the speed bound and its cache, the isolation test, box inflation, the step velocity test, publication, content chains, evidence and budgets. `CMakeLists.txt` is unchanged; the new header needs no build entry.

## Identities

| Item | SHA-256 |
| --- | --- |
| Scratch tree `.tmp/eom-matched-pair/stage3i-tree/src/eom`, copied from live increment 2 | 91-file inventory [scratch-increment-3-source-inventory.sha256](matched-pair-stage-3-increment-3/scratch-increment-3-source-inventory.sha256); one file added and five changed |
| `ValidatedWorkers.hpp`, new | `f57af6c025d409b42600502ae17b8712f4f1089a9208162ab6b5bdbd5c1143ee` |
| `ValidatedFarStep.hpp` | `becd942865c79a1594ddf65870b5c3e322b5c498b2426ffb707bca096b1066a5` |
| `ValidatedFarStep.cpp` | `796c2b330675bc2a6633b67d2991baeaa2dca384567d5ed8d05ef212240fda53` |
| `ValidatedEvolution.hpp` | `7d4ab96814ac61b2355fd06aa751b0c5d3fa023ade05c45593630f9a87554876` |
| `ValidatedEvolution.cpp` | `2769708d9de8c7febc20ebf7d445dc82d4445d62ffc496d568c85597f3b89167` |
| `native/eom_validated_evolution_fixture_cli.cpp` | `a8bfd1f7f450723b646d03096dc260f614e4edf6b9a3c5c0951efba9432467b8` |
| Scratch build library, `.tmp/eom-matched-pair/build-stage3i/` | `6232c101233581aa612c8c5d9a671c6d5ab256fd7729e5d1ca114440c5d1f823` |
| Scratch evolution fixture program | `96f6db99f51bbeabd4ff924f14689f5ac1fad47e8bf8c1b4dfa5bd30310bbe4b` |
| Race-detector build library, `.tmp/eom-matched-pair/build-stage3i-tsan/` | `3ae7b00782d097754f105e39680868392e4137346d978a22adb0845c3fda2653` |
| [matched_pair_stage_3_increment_3_check.py](matched_pair_stage_3_increment_3_check.py) | `e0fd0dbdad800aeb0a4119e1d5cdf9621ce3a2851efe46ff3e314e36a612cc77` |
| [Race-detector known case](matched-pair-stage-3-increment-3-race-detector-known-case.cpp) | `5a249998862a5b97a35938f02db84b91e2f28b98e561620c1a0e909b377a2144` |
| Scratch outputs, 118 files | [scratch-output-identities.sha256](matched-pair-stage-3-increment-3/scratch-output-identities.sha256); the files are under `.local-data/eom-matched-pair/2026-10-12/increment-3/scratch-outputs/` |

The evidence directory [matched-pair-stage-3-increment-3/](matched-pair-stage-3-increment-3/) holds the six sources, [increment-2-to-increment-3.diff](matched-pair-stage-3-increment-3/increment-2-to-increment-3.diff), which is the whole change, the run script, the checker output, the worker fixture output and the race-detector script. The build is CMake Release, two build workers, no compiler warning, under the owned-compute supervisor with exit status 0. The machine reports eight processors.

## How the claim is tested

The fixture program takes the worker count as an optional second argument, applies it to every request and every producer it constructs, and prints no row that depends on it. So the claim "the worker count changes nothing but execution" is tested on whole files, with no field projected out. The worker count is recorded in the certificates as execution metadata and is deliberately not printed in any existing row; this is the only field that would differ, and it is named here so that its absence from the comparison is explicit.

The run script runs all twelve evolution fixture commands at worker counts 1, 2, 3, 4 and 8, and counts 4 and 8 twice more, each into its own directory.

## Results on the scratch build

| Check | Result |
| --- | --- |
| Increment 3 checker | 12 of 12 assertions, exit status 0, the three known rows first |
| One worker against the accepted increment 2 live outputs | all 11 evolution fixture files byte-identical; the six ordinary and four far-step fixture files byte-identical |
| 2, 3, 4 and 8 workers, and two repeats each of 4 and 8, against one worker | 96 of 96 files byte-identical: twelve files in each of eight runs |
| Increment 2 checker on the one-worker and the eight-worker outputs | 133 of 133 on each |
| Error streams of all 108 fixture runs | empty |

### Known cases first

- **The indexed runner on synthetic tasks**, 35 cases: eight tasks at 1, 2, 3, 4 and 8 workers with no terminal task; a refusal at index 2 and an exception at 5; an exception at 2 and a refusal at 5; a refusal at 0; an exception at 7; and the refusal-and-exception case with the first and with the second helper launch made to fail. In every case the lowest terminal index is returned with its own kind, so the exception at 5 never displaces the refusal at 2. Every task runs at most once. With one worker the tasks after the terminal one do not run; with more, all eight run, including when a helper launch fails.
- **One worker reproduces the accepted bytes**, as in the table.

### Targets

| Case | Measured |
| --- | --- |
| Eight static paths, no declaration, four steps | on each step 8 self relationships excluded and 56 others, all individual |
| Eight paths with three disjoint declared pairs, four steps | on each step 18 group intervals standing for 36 members, and 20 individual |
| Refusal at the first receiver, the last also refusing | the step's certificate holds 7 entries, all of the first receiver, ending at the undecided source |
| Refusal at a middle receiver, a later one also refusing | 19 entries: two complete receivers, then the middle one up to the undecided source |
| Refusal at the last receiver only | 50 entries: seven complete receivers, then the last at its first source. This one arises on the second enclosure iteration, from the receiver's own box crossing the edge of the retained past |
| Grouped eight-path run cancelled after two steps, resumed with another worker count | equal to the uninterrupted run in content chains, end states, ledger and continuation |
| Worker count zero | refused by the producer and by the driver |

Each refusal case gives the same bytes at every worker count, which is the statement that the parallel merge equals the serial loop there.

### Race detector

The scratch tree was also built with the compiler's thread sanitizer and four fixture commands were run under it at 1, 2 and 8 workers: the worker cases, the grouping cases, the continuation cases and the controller cases.

| Check | Result |
| --- | --- |
| Known case: a program in which two threads write one unsynchronised counter, same compiler and option | reported as a data race |
| Known case: the same program writing separate counters | no report |
| Twelve fixture runs under the sanitizer | no report; every error stream empty |
| Their outputs against the release one-worker outputs | 12 of 12 byte-identical |

The sanitizer runs were first made before the known case existed. They were made again after it, and the figures above are from the second set; the first set is retained beside it under `.local-data/eom-matched-pair/2026-10-12/increment-3/`.

## What this establishes and what it does not

**Claim grade: measured**, on the scratch build, for the cases listed.

Established on these cases: every output byte is the same at every worker count tried and on repeats; one worker reproduces the accepted outputs exactly; a refusing step holds exactly the entries the serial loop holds; and a run resumed with a different worker count equals the uninterrupted run.

Not established: freedom from data races in general. A clean sanitizer report covers the paths these runs exercised, on in-memory histories of at most a few segments, and says nothing of disk-backed histories or of paths not run. Byte-identity across counts is determinism of one implementation and not evidence that any output is right; that rests on the increment 1 and 2 checkers. No speed-up was measured, and with populations this small none should be expected. Exception-against-refusal ordering was tested on the runner with synthetic tasks, because no input was found that makes a receiver's real work throw. Live qualification has not been attempted.

**Falsifiers.** Any output byte that differs between worker counts or between repeats; a step whose certificate at several workers differs from the one-worker certificate; a sanitizer report on a rebuild from the inventoried sources; or a one-worker output differing from the accepted increment 2 output.
