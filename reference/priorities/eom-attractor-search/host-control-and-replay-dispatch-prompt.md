# Dispatch Prompt — N=12 Host Control + Harness Replay Confirmation

Operator dispatch text, revised 2026-07-16 (supersedes the draft written in the assembly-search session earlier the same day; the Borg replay route and repo constraints changed that afternoon). Paste as a single prompt. Infrastructure-only: no evidence campaign, no engine-source changes.

---

Closure goal: convert the Phase 0 sandbox-to-host timing transfer from inferred to measured by running the $N=12$ host control on the native machine, and confirm the Phase 2 harness replay file loads through the current Borg record route — then capture both results in the eom-attractor-search workstream.

# Objective

Two residuals from the 2026-07-15 Phase 0/Phase 2 session (see `reference/priorities/eom-attractor-search/priorities.md` item 1 and the two 2026-07-15 entries in `work-log.md`):

1. **$N=12$ host control.** Every Phase 0 cost number was measured on a 4-core Linux arm64 sandbox; the ratios and exponents are the portable claims, but their transfer to this host is currently *inferred*. Rebuild the native engine first and state the build time against the last `src/eom` source change (a stale binary produces a wrong answer that looks like a slow one). Then:

   ```bash
   cmake -S src/eom -B .tmp/eom-native-dev -DCMAKE_BUILD_TYPE=Release
   cmake --build .tmp/eom-native-dev --parallel 8
   c++ -std=c++20 -O3 -DNDEBUG -Isrc/eom/include -I/opt/homebrew/include \
     scripts/eom/attractor-phase0-release-profile.cpp \
     .tmp/eom-native-dev/libeom_native.a \
     /opt/homebrew/lib/libmpfr.dylib /opt/homebrew/lib/libgmp.dylib \
     -pthread -o .tmp/attractor-phase0-release-profile
   .tmp/attractor-phase0-release-profile --population=12 --end-time=0.2 \
     --threads=4 \
     --output=reference/priorities/eom-attractor-search/evidence/phase0-workload-profile-2026-07-15/n12-host.json
   ```

   The run emits a heartbeat per accepted step on stderr; do not report DONE with it unwatched. Expect roughly 20 accepted steps and single-digit seconds. Compare against the sandbox targets (measured): $0.591$ s/step, exact-root $49.6\%$ of wall, $10.1$ snapshots/step, $202$ µs per ordered pair per snapshot, zero MPFR pairs, zero rejected steps. Report the host-to-sandbox wall ratio — that single number is the transfer factor for every sizing row in `evidence/phase0-workload-profile-2026-07-15.md`. Falsifier to check, not assume: if any attribution percentage moves by more than 10 points, the cost *structure* (not just the clock) differs across hosts — record that as a finding and flag it; do not silently average it away.

2. **Replay confirmation through the current record route.** `reference/priorities/eom-attractor-search/evidence/phase2-harness-validation-2026-07-15/replay.borg-trajectory.json` is a `borg-fixture-trajectory.v1`-shaped file emitted by the harness (`scripts/eom/attractor-ensemble-harness.cpp`), schema-matched by inspection but never loaded end to end. The current consumption path is: convert with `scripts/eom/convert-borg-trajectory-to-assembly-view-record.mjs` to an `assembly-view-record.v0` file, then load through the shared display adapter (`src/apps/shared/EomHistoryDataset.mjs`) as Borg does via `borg.html?eomRecord=<url>`. Run the converter on the replay file, validate the resulting record through the adapter (a node-side load through the same ingestion function Borg uses is sufficient if full browser wiring is disproportionate — say which you did), and deliver a graded statement of what the record route can and cannot consume from harness output, plus the minimal follow-up item if a gap exists. Conversion provenance must inherit, never upgrade, the source's evidence status.

   While there: compile-check `scripts/eom/attractor-ensemble-harness.cpp` under this host's clang (same link line as above with the harness source; it has only been compiled under gcc). Do not modify `src/eom` engine sources; the harness, profiler, and converter are the only owned code files.

3. **Capture.** Append results to the workstream `work-log.md` (dated entry, claim-graded, instruments named), update the priorities item 1 residual list, and commit `n12-host.json` and the converted record per the normal branch flow. These results are prerequisites for the undirected ensemble-release campaign queued in `reference/priorities/braid-program/priorities.md` (queue item 5); note completion there. Treat unrelated dirty files as ambient multi-agent state.

Success is defined by producing the highest-quality completed outcome that is realistically achievable within the current repository, codebase, documentation, and available context. Follow the meta procedure in `reference/op/codex-goal-seeking-prompt-template.md` (execution philosophy, agent strategy, drive to closure, verification, reporting).
