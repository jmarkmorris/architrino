# Final recovery test coverage

The first inventory is a discovery baseline, not a completed test run. The [candidate inventory](../evidence/test-coverage-inventory.json) was produced by `git ls-files -c -o --exclude-standard -z` and a path classifier after its positive and exclusion controls passed. It identifies 460 candidate paths: 326 JavaScript tests, 82 Python tests, 49 standalone check candidates, one CMake registration file and two GitHub workflow files. These are filenames, not test-case counts, independent coverage units or passing results.

## Execution groups to reconcile

| Group | Existing entrypoint or owner | Remaining coverage work |
| --- | --- | --- |
| JavaScript tests | `scripts/run-test-sweep.mjs`, normal and `--slow` selections | Reconcile every candidate against selection, nested skips, prerequisites and process controls; files outside its naming rules remain explicit. |
| Python tests | Shared-venv test modules; subject owners' reproduction commands | Determine discovery/import requirements and fixtures per family. System Python is not a substitute. |
| EOM solver compiled checks | `src/eom/CMakeLists.txt` | Rebuild through the supported build owner, enumerate CTest registrations and any CLI checks outside CTest, then retain actual outcomes. |
| Standalone checks | Check/validate scripts and package/procedure entrypoints | Separate directly runnable checks from libraries, destructive modes and generators; identify checks not discoverable by filename. |
| Publication | `scripts/pr-validation-receipt.mjs` | Validate the exact final candidate against the correct base; report the optional sweep independently of the required exit status. |
| GitHub | `.github/workflows/content-integrity.yml` and `pages.yml` | Verify applicable jobs at the published candidate; distinguish PR build from deployment after an authorized main merge. |

Reading `src/eom/CMakeLists.txt` identifies CTest entries for solver fixtures, acceleration fixtures, history pin lifetime, history terminal-state equivalence, evolution fixtures, stationary joint frontier fixtures and the Borg protocol version. This is the declared CTest selection, not proof that it exhausts solver tests.

Every applicable test or check needs an observed pass, failure, timeout, cancellation, skip or blocked prerequisite at an identified source state. Blocked and unexecuted coverage cannot count as all passed. No broad sweep, new scientific campaign, GitHub dispatch or publication was performed while constructing this inventory. The next reconciliation must include package scripts, invoked subprocesses, test-level exclusions and procedure-owned checks before calling the inventory exhaustive.

## Entrypoint reconciliation, 2026-09-08

The [entrypoint record](../evidence/test-entrypoint-reconciliation.json) records the source digests and actual selections. Calling the existing `selectTestFiles` functions without executing their selections yields 316 normal and ten slow Node files. Comparing their union against the 326 JavaScript candidates finds no missing or extra paths in this declared naming scope. It does not discover tests hidden behind another filename convention or prove that every test inside a selected file will execute.

A recording callback supplied to the existing `runChecks` function captures 34 default child commands and one omitted opt-in sweep. The callback spawns no subprocess and its synthetic success values are discarded; this inspection supplies commands, not test results. A known one-command/one-exclusion fixture passed before the real gate was inspected. The CMake registration extractor likewise passed a known multiline registration and commented-out exclusion before returning the seven actual entries. Both instruments are retained in [reconcile-test-entrypoints.mjs](../evidence/acceleration-migration/reconcile-test-entrypoints.mjs).

The record also enumerates the package commands and the commands of both GitHub build jobs by reading their live workflow files. The package's `pretest` prepares ignored runtime assets, `test` invokes Node discovery, and `build:site` builds the static site. None invokes the Python or CTest families. Content Integrity's GitHub job separately runs the production dependency audit; Pages adds deployment image tests, reconstruction from a fresh checkout, the static build, and Borg byte-identity validation. Pages deployment additionally depends on an enabled main-branch publishing path and its successful build, so a PR build cannot establish deployment success.

Remaining reconciliation includes the 82 Python candidate modules' supported discovery, runtime and fixture requirements, the 49 check/validate candidates' executable roles, additional audit/verify/smoke and generator check modes, and test-level skips or subprocess prerequisites. These unresolved groups prevent an exhaustive-coverage claim. Final execution must bind the then-current source state; the entrypoint record's source digests make later changes detectable.
