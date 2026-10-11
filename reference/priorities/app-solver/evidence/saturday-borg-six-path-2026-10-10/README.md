# Instruments of the six-path Borg coarse-step investigation (2026-10-10)

This directory holds byte-for-byte copies of the session instruments used by the [six-path analysis](../../analysis/saturday-borg-six-path-certification-2026-10-10.md). They are historical records of what was run. They are not repository instruments, not regular tests, and not part of the solver or of its independent oracle. The copies were compared with their originals in `.tmp/saturday-serial/i3/` by `cmp` when they were made, and the originals were left in place.

**Do not run the two shell helpers as they stand.** The reasons and a safe way to repeat the work are given under [Hazards](#hazards-of-the-two-shell-helpers) and [Repeating the work safely](#repeating-the-work-safely).

## Files

| File | Bytes | SHA-256 | What it did |
| --- | ---: | --- | --- |
| `independent_reference.py` | 5836 | `a628de117e726ab695f5701a4b7526c7f08025b3a15d035d29072605def82574` | Integrates the six static-field equations in 40-digit arithmetic and compares with the driver's endpoints. Its analytic known case, the radial fall, runs before the target. |
| `segment_containment.py` | 2561 | `e4651a4a7472663c3e1113e258067b282da78a3a9218a443bf953bec803a5ec8` | Compares the same reference with the published cubic segments at 41 instants. Imports the file above, which reruns it. |
| `tightest.py` | 1711 | `fd567768f48897376feabf6d0b437bb30076b5cac71e6f4e5e7eb9443c3a9436` | Reports, at segment ends, the ratio of the difference from the numerical reference to the published radius. Imports the reference file, which reruns it. |
| `pair_distance_bounds.py` | 2378 | `3754a4e53a664679ac50de9ed0d3d31cfd68da898ea59fbe047f602538030e36` | Exact rational check of the hypotheses of the uniform bound: pair distances, resting past, and the three constants. Known case first. |
| `dump-request.mjs` | 3063 | `a21df868be51cc3d28f3c3254e2c3d8349e1febc4a798075b31eda048d324170` | Rebuilds and prints the request of the frozen driver's step-0.01 row with the driver's own builders. |
| `ladder-with-histories.mjs` | 9557 | `840ce2eb9a935a57f584215bb8a03398416124d7cb8d96da8d1e27d28a13ac3f` | The frozen driver with one line changed so that the published histories are printed, and with import paths adjusted to the scratch location. |
| `snapshot_run.sh` | 1973 | `d093071046a6797bf09b706d618545b6377bb435a1f625e2efe6e46bc9651cc0` | Exported one commit with `git archive`, built its solver and ran its own driver. |
| `variant_run.sh` | 1502 | `ec93013ac4f486ea910906ebe00ffcf7ce213237fc4ad1494bdda20ccde1c8d1` | Built an exported source with chosen files replaced and ran the driver. |

The Python files read `request-h.json`, `ladder-six-with-histories.json` and `independent_reference_endpoint.json` from their working directory. The two `.mjs` files import the Borg builders by a path three levels above their own directory, which was correct in `.tmp/saturday-serial/i3/` and is not correct here; they must be copied to a directory three levels below the repository root before use.

## Inputs, results and receipts

Selected inputs, outputs and attribution receipts are retained, also as byte-for-byte copies, in the ignored local directory `.local-data/aaa-work-threads/saturday-serial/claude-i3/` relative to the repository root: 29 files, 7,317,751 bytes. Its `manifest.json` (6324 bytes, SHA-256 `5960b56b6b53da297050a37400363a8c7dcce1b0cee8b53df9223c0f4be8c027`) lists every file with its byte count and SHA-256, and repeats the table above. To retrieve, read the manifest and recompute the hashes. This is local retention under the accepted local-storage rule. It is not a backup, and the timing fields inside the driver outputs would differ in any rerun.

Contents: the request dump; the three unmodified driver outputs and the output with histories; the reference output and endpoint file; the containment, ratio and exact-bound outputs; the control-test log, the `ctest` log and the two build logs of the current-commit build; and, under `states/`, the driver output of each exported commit and variant, the stationary-fixture output where it was run, and the one edited source file of the variant that removes the recentering block.

Not retained: the exported sources and the builds. They are regenerated from the named commits.

## Hazards of the two shell helpers

- `variant_run.sh` begins by deleting the directory `var-<name>` under a fixed scratch path with `rm -rf`, the name being its first argument. A wrong or empty argument deletes something other than what was intended. It then copies a base export, overwrites chosen files, builds and runs.
- `snapshot_run.sh` reuses an existing export directory and an existing build if they are present, so it can silently run a stale source or binary, and it overwrites its previous output files. It also copies the generated Borg budget module from the working tree into the export, which is correct only while that module's authored data is unchanged from the exported commit.
- Both contain absolute paths of the original checkout and of its Python environment.

## Repeating the work safely

These are instructions to follow by hand. They are not a script, and nothing here was run after the investigation.

1. Create a new empty directory with `mktemp -d` under an ignored scratch location, and record it. Never point any step at an existing directory, and never use `rm -rf` on a computed path.
2. Export one commit into it: `git --no-optional-locks archive <commit> src/eom scripts/eom src/apps package.json | tar -x -C <new-directory>`. This reads the object store and does not touch the working tree or create a worktree.
3. For commits from `3039b6430` onward the driver imports `content/generated/borg/certified-budget-identities.v1.js`, which is not tracked, so it has to be supplied to the export, and it must be shown to be the right file before it is copied. Three checks are needed, and if any one fails, stop this replay; do not copy a moving or stale input.
   - The exported commit against the current commit: `git diff --stat <commit> HEAD -- src/apps/borg/data scripts/borg/build-certified-budget-identities.mjs` must print nothing.
   - The current commit against the working tree, because another session may have uncommitted edits: `git --no-optional-locks status --short -- src/apps/borg/data scripts/borg/build-certified-budget-identities.mjs` and `git diff --stat -- src/apps/borg/data scripts/borg/build-certified-budget-identities.mjs` must both print nothing.
   - The generated module against its owner: run the generator's own check, `node scripts/borg/build-certified-budget-identities.mjs --check`, and require it to report the module current. Do not run the generator with `--write` for this purpose.

   Only when all three pass, copy the generated files into the same relative place in the export.
4. To make a variant, copy the export to a second new directory and replace only the files under study, taking them from another export; record the names.
5. Configure and build inside the export with `cmake -S <dir>/src/eom -B <dir>/build -DCMAKE_BUILD_TYPE=Release` and `cmake --build <dir>/build --target eom_borg_shadow_cli`. Record the build time and the binary's SHA-256. This builds a solver; do it in the foreground or under the owned-compute supervisor.
6. From inside the export run `node scripts/eom/run-borg-eom-refinement-ladder.mjs build/eom_borg_shadow_cli 6` and write its output to a new file.
7. For the stationary fixture, build the target `eom_stationary_joint_frontier_fixture_cli` in the same export and run it with no arguments; it takes about a minute and exits non-zero when its frontier replay is rejected.
8. For the reference, copy the Python files and the three JSON inputs from the local retention directory into a new directory and run `independent_reference.py` with the driver output files as arguments, using the shared environment. Do not edit the reference to match solver output.

Expected results for comparison are the tables of the analysis note. A different outcome on a different toolchain is a new measurement to be recorded, not a reason to alter the reference or the driver.
