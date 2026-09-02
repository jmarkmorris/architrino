# phase-varying display representative Past-Only Handoff: Fresh Build Plan

Status: independently reviewed build-only plan, 2026-08-27. Separate review accepts the builder, captured registered-child launcher, and all 14 controls, including four independently authored startup-interruption controls. No actual phase-varying display representative input or EOM evolution is authorized by this plan. The current consumer is the separately reviewed data-only producer; the [launch-readiness owner](2026-08-27-braid-search-launch-readiness.md#strength-independent-f5-evolution-prerequisite) retains the independent reference boundary and unresolved ordinary-evolution choices.

Plainly: this step makes and identifies the program that will report the saved prehistory. It does not run the geometry or choose interaction strength.

## Fixed Subject And Sources

| Owner | SHA-256 |
| --- | --- |
| `src/eom/native/eom_f5_prehistory_inspector.cpp` | `b9aeb71f6ca48d77e6b22e2ba06b0adb91884b4569399d4c6fc1acd642298b36` |
| `scripts/eom/prepare-f5-prehistory-handoff.py` | `4c9a5d724cb4d0e24fa35dd3cefed661448d0ff69077171f9d6adc869f8a079c` |
| `tests/test_f5_prehistory_handoff_producer.py` | `ec1d99b6919fd2c666dd1dd157388f9577f054070744db3e38a4cc4b56062770` |
| `scripts/eom/prepare-f5-prehistory-handoff-build.mjs` | `5caae83e0f48ba1bba762613e7083a7f7181aefafeba278d75e1add910b3f460` |
| `tests/f5-prehistory-handoff-build.test.js` | `35d2143a66da0fb4d79c3831568912152f2ccd6137b0d4471d3e911215a713d1` |
| `scripts/eom/launch-f5-prehistory-handoff-build.mjs` | `f4f577c97e421c0767a5c5926c1da95c806d2272670a233fc3d2419a456c2488` |
| `tests/f5-prehistory-handoff-build-launch.test.js` | `8796353c8b196bc4668141b7ae5bb303ffa9e0265333211829b70805a2ba16bc` |
| `tests/f5-prehistory-handoff-build-startup.test.js` | `683b4e53358a6eb330b4350c9d2492966b6e3b786103aa96c42ffb94325c8935` |
| `scripts/eom/verify-f5-prehistory-handoff.py` | `6c94b0ca16dfe20bed4841a547adca349f2f36cdd5ec04211341d6b060032a68` |
| `tests/test_f5_prehistory_handoff.py` | `111e828c8ea3c26996ce51c83496ff7850d48b52cf7e874982c67e882ad6cadf` |

Plainly: the first three files produce data; the last two independently check it. The builder and its tests are operational provenance tools, not mathematical references. No file in one role substitutes for another.

The builder reuses only the unchanged compile-command, dependency and process-supervision helpers in `prepare-abc-enclosed-root.mjs` (`bbe06d12742578ba8cce6f8f55751d4d9e6a8b83404ee998fd48b6f6dbc27905`) and `prepare-f5-enclosed-root.mjs` (`ba154c0a8c63bd390ae1e16de005fd5d52000fedec352619b60b9465a2f813f5`). Importing those modules does not invoke their campaign entry points. The outer launcher captures these exact three executing JavaScript modules and supplies their bytes through the unchanged registered bootstrap in `launch-abc-enclosed-root-pilot.mjs` (`5aa154b1579909cc63f01d81023e2e1412c2a0bb277663d9e1cd118999795baa`). The builder's own snapshots alone establish observed before/after bytes; captured execution identity comes from that separate launcher. The unchanged CMake owner is `e4b3a8bdfc91c756eb00e4c37e872bcbebfe1f7b406a551e3aa630f8818d2bdd`; it receives no inspector target or other edit. The builder separately pins the five History/Interval/Decimal/endpoint source owners already fixed by the handoff reference.

Plainly: the build uses established machinery without touching the code generation currently supporting the A/B/C search.

## Reproducible Build And Evidence

Resolve and record the actual macOS compiler, linker, archive tools, CMake, SDK, compiler-resource directory, Node runtime and shared-venv Python. Configure a new exclusive child of `.local-data/braid-analysis/f5-prehistory-handoff-build-20260827/` with Release C++20, `-O3 -DNDEBUG`, no sanitizers, no fast-math and `-ffp-contract=off`. Build only the fresh `eom_native` static library with two compilation workers. Manually compile and link the standalone inspector using the same resolved compiler, SDK and library arguments, with explicit Boost include discovery and no CMake source mutation.

Plainly: the executable is built from the reviewed sources in a new directory. No old binary or stale library is reused.

Record every actual translation unit and compare pre-build compiler-reported dependency sets with the dependency files emitted by actual compilation. Hash those source/header files before and after, together with complete EOM source snapshots, compiler tools, MPFR/GMP libraries, configured commands, built library, executable and both producer sources. Record file-backed transitive dynamic dependencies; list macOS shared-cache system libraries as platform-trusted without invented file hashes. The only executable control is `--help`; no prefix, history, root packet or coupling is supplied. Any dependency difference, source drift, failed subprocess, unresolved dynamic library or incomplete process closure rejects the build attempt.

Plainly: this records what actually went into the executable. The small help control checks that it starts, not that its mathematical output is correct.

The receipt schema is `braid-program/f5-prehistory-handoff-build.v1`. Required producer-compatible fields are `producerSources.wrapper`, `producerSources.inspector`, `built.executable`, and the fixed `sourceOwners` map. Each file record in those producer fields is exactly absolute `path`, `sha256`, and `bytes`; additional complete build provenance remains alongside those fields. `accepted`, `eomExecuted`, `evolutionAuthorized` and `h3EvidenceEligible` stay false; `rootCalls` remains zero and `dataLoaded` remains false. A matching hash is build identity, not independent build-origin acceptance.

Plainly: the producer can mechanically match this receipt later, but separate review must still establish that the recorded build actually succeeded from these inputs.

## Operating Limits And Launch Admission

The builder must pass independent source and control review before launch. Do not overlap its two compilation workers with four active A/B/C EOM workers. Admit at most two active A/B/C workers, no other owned build, at least 40 percent system memory available and 64 GiB free disk. These are admission conditions, not reserved capacity or a measured runtime prediction. Recheck the existing running search's resource state before launch.

Plainly: the build waits for two search slots to finish so it does not crowd the current four-worker run.

Use one observed outer process supervisor with a fixed 15-second heartbeat and a 1,800-second inclusive deadline covering launch, source capture, configuration, compilation, dependency checks, publication and process closure. The builder's stage supervision uses the remaining time, never a new 1,800-second allowance. Every child waits for independent registration before executing in its owned process group. The outer supervisor validates birth identities and can cancel those groups independently of the builder's event loop; it does not rely on an inner signal handler or a longer grace interval to escape a blocked synchronous log write. Stop and preserve the attempt on interruption, resource-monitor failure, system free-memory percentage below 20, or free disk below 16 GiB. Observe memory and free disk at least every 15 seconds; neither periodic observation nor an individual process profile is a hard aggregate memory reservation. The outer source-bound worker checks fresh completion, exact stage/gate census and final file identities; a separate bounded worker performs final publication under the same inclusive clock.

Plainly: the whole build has one clock and remains visibly watched. Stopping preserves the failed attempt and does not label the geometry a failure.

Publish the receipt create-exclusively, flush and synchronize its file and directory, recheck the inclusive clock, and require fresh matching completion output with successful process exit. Preserve captured launcher, builder, helper, outer-supervisor and resource-tool bindings in the final receipt. Keep heartbeat, resource monitoring and interruption handling active through the final worker and watch teardown. The receipt identifies its resource observations as pre-publication; the fresh final completion carries the full observation sequence through worker closure. Rehash final receipt, logs and built identities independently before acceptance. A late or incomplete receipt remains rejected even if its internal status was written before the stop. No automatic retry or build-directory reuse is authorized.

Plainly: a receipt counts only after the entire build closes successfully on time. A partial file is not a passing build.

After independent build review, declare a separate single-attempt producer/checker invocation bound to the accepted past-only prefix and frozen verifier. That later invocation must again use exclusive output, an inclusive observed deadline, unchanged source/runtime identities, successful process closure and independently checked final hashes. This plan alone does not launch it. The effective-strength choice and ordinary-evolution request remain separate.

Closure goal: independently review and perform one bounded fresh build, then inspect its receipt before any actual phase-varying display representative handoff generation.
