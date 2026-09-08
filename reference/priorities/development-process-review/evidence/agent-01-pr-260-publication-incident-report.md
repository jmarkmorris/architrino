# Incident report: PR #260 publication attempt, `codex/sapphire`

Retrospective only. No repository files, tests, tools, credentials, or Git/GitHub state were touched in producing this report.

## 1. Scope and coverage

**Topic.** Resuming the first handoff of `reference/op/git/codex-pr-branch.md` for branch `codex/sapphire` (35 commits over `origin/main` `316a9258`, PR #259) at the PR-creation step, after a prior thread stopped on a GitHub 403.

**Dates.** Sandbox and GitHub timestamps run from 2026-09-06 (operator's opening prompt, dated state "2026-09-06") through 2026-09-07 ~03:45Z. PR #260 was created 2026-09-07T00:55:57Z; its checks were cancelled 02:28Z.

**Original objective.** Verify branch state, create a ready PR through the GitHub connector, watch checks, confirm mergeability, report the publish handoff receipt.

**How it expanded.** (a) Connector PR creation failed repeatedly; the operator created the PR with `gh`. (b) The PR's CI checks hung and were cancelled. (c) The cause was traced to the reporting test sweep this branch added to the gate; the gate, sweep script, and workflows were redesigned twice (skip flag, then opt-in). (d) The operator's Mac commit attempt through the pre-commit hook stalled on the same tests with the venv present, which reclassified the failure from environmental to a process-supervision defect. (e) Work ended with eight uncommitted files and a handoff prompt for a Codex session on the Mac.

**What I can inspect.** The full transcript of this session, including original tool outputs, is available to me; I saw no compaction notice. The **prior thread** (three 403s, the sandbox gate run, and the authoring of `pr-body-codex-sapphire.md`) is **not** inspectable; everything about it comes from the operator's opening prompt and from the body file's own text, and is marked below as *remembered claim*. Mac terminal output exists only as pasted excerpts; the full pre-commit log, the CI job logs, and the `runner-stderr.log`/`launcher-stderr.log` files beyond the excerpts pasted are not available to me.

Evidence labels used below: **[tool]** original tool output in this session; **[paste]** operator-pasted terminal output; **[claim]** remembered or relayed statement not backed by output I can see.

## 2. Failure inventory

**F01 — Connector `create_pull_request` 403.**
Effect: PR could not be created through the designated path. Operation: `create_pull_request(owner=jmarkmorris, repo=architrino, head=codex/sapphire, base=main, draft=false, title="Operations gate, pin attribution, and pilot rename repair with corpus academic-style pass", body=<file>)`. Excerpt [tool]: `failed to create pull request: POST https://api.github.com/repos/jmarkmorris/architrino/pulls: 403 Resource not accessible by integration []`. Sequence: three prior-thread attempts [claim, including one after a permission change and a Claude restart]; attempt 4 this session (after `get_me` = `jmarkmorris`); attempt 5 after the operator "added all read and write permissions" without reconnecting [claim]; attempt 6 after the operator disconnected/reconnected the connector [claim] with `get_me` succeeding first. All three this-session attempts returned the identical string. Environment: GitHub REST via connector; `get_me`, `list_pull_requests`, `pull_request_read` succeeded throughout. Proposed cause (inferred, not observed): the app installation token lacked Pull requests write; the operator later reported [claim] the installation page showed "installed six months ago, only read permissions, no way to configure" and uninstalled it. Response: stop after each single retry; `gh` fallback offered and used by the operator (PR #260 created [paste]). Last outcome: unresolved; connector PR writes never succeeded. Uncertainty: after the operator uninstalled the GitHub app, connector *reads* continued to succeed (`pull_request_read` on #260 at ~00:56Z and later); whether a reinstall occurred via reconnect or reads use a different grant is not established.

**F02 — Connector `update_pull_request draft:true` 403.** Same class as F01. Excerpt [tool]: `Failed to convert pull request to draft: Resource not accessible by integration`. One attempt. Response: handed to operator as `gh pr ready --undo 260`; whether it was run is not confirmed in the transcript [no paste].

**F03 — Sandbox Git lacks `merge-tree --write-tree`.** Effect: the procedure's mergeability preflight could not run as written. Command: `git merge-tree --write-tree HEAD origin/main`. Excerpt [tool]: `fatal: unknown rev --write-tree` (Git 2.34.1, Linux sandbox). Response: substituted `git merge-base --is-ancestor origin/main HEAD` → `yes` [tool], reasoning that an ancestor base cannot conflict; GitHub later reported `mergeable_state: unstable` (no conflict) [tool]. Outcome: resolved by substitution; the substitute is weaker than the named command only in form, since ancestry implies a fast-forward.

**F04 — PR #260 checks hung and were cancelled.** Effect: PR could not become ready; the branch's own change was the cause. Checks: `validate-content` (run 34071364268, job 101589201389) and `build` (run 34071364264, job 101589201262), both `in_progress` from 00:56:05Z through polls at 00:59, 01:05, 01:09, 01:12, 01:15, 01:18, 01:21, 01:24, 01:27, 01:30, 01:34, 01:37, 01:53 [tool]; both `conclusion: cancelled`, `completed_at` 02:28:12Z/02:28:19Z [tool]; a `deploy` job also `cancelled` at 02:28:12Z. Calibration [tool]: #259's `validate-content` 2m16s, `build` 5m20s. Operator-pasted CI log [paste]: repeating `{"schema":"braid-program/subfield-circular-pilot-outer-heartbeat.v1","pid":49258,"elapsedWallSeconds":1473…1590,"stdoutBytes":0,"stderrBytes":383,"stopping":false}` and `{"kind":"f6c-acceleration-pilot-heartbeat",…,"closedAdmittedStages":[],"accepted":false}`, plus operator report that "tests are still appearing" before that [claim]. Environment: GitHub-hosted `ubuntu-latest`, Node 22 per workflow, no venv, no `timeout-minutes`, sweep with no `--test-timeout` (read from `.github/workflows/*.yml` and `scripts/run-test-sweep.mjs` [tool]). Proposed cause at the time (inferred): pilot-process tests waiting on a venv Python that does not exist, unbounded. Revised by F07: the wait is a supervisor group-close defect, and the venv's absence is not required to trigger it. Response: operator cancelled both runs [claim, confirmed by check-run state]; gate redesign (section 3). Outcome: unresolved on GitHub; no green check has ever completed for #260.

**F05 — Gate step 11 `EPERM` in the sandbox.** Check: `node --test tests/owned-compute-stop-hook.test.js` (step 11/33). Excerpt [tool]: `Error: EPERM: operation not permitted, unlink '…/.local-data/owned-compute/plans/23edc754-….json'`, exit 1, 0.12–0.13 s. Observed in all three sandbox gate runs this session (1m10s, 1m03s, 1m07s totals). Environment: Linux sandbox, mounted checkout, Node v22.23.2. Prior-thread [claim] and OPS-018/OPS-021 rows record the same. Proposed cause: sandbox cannot unlink under `.local-data/`. Response: treated as environmental; not repaired. Outcome: a Mac run of step 11 is not in evidence in this session (the Mac gate was interrupted before its summary).

**F06 — Gate step 16 router drift after editing the runner.** Check: `node scripts/build-agent-startup-orientation.mjs --check`, exit 1 [tool]. Cause (observed): the router fingerprints `scripts/check-content-integrity.mjs`. Response: `--write` then `--check` → current [tool]; diff showed one fingerprint row `229 | c37d06f38b894abc` → `259 | a3c99f8fc3f58560` [tool]. After the second runner edit (opt-in), `--write` was run with output suppressed and `--check` reported current; the resulting hash was not captured. Outcome: resolved; expected consequence of editing a fingerprinted source.

**F07 — Mac pre-commit gate: pilot-process tests stall; gate interrupted.** Effect: commit could not complete in bounded time; orphaned supervisors. Operation: `git commit` → `.githooks/pre-commit` → `node scripts/pr-validation-receipt.mjs run --base origin/main` (after `[pr-validation] receipt miss: receipt missing.`) [paste]. Observed [paste]: `✖ captured launcher worker entry and Python wrapper close two synthetic stages with measured CPU (120002.185042ms)`; heartbeats for pid 32022 continuing to `elapsedWallSeconds` 225 after that failure; a second pilot pid 37792 starting and stalling (`stdoutBytes":0,"stderrBytes":506`). Environment [paste]: macOS host, `Node.js v26.3.0`, venv present (`../.venv` resolution assumed from the test's code path [tool read of `tests/f6c-acceleration-pilot-process.test.js:20`]; the venv's actual resolution on the Mac is not shown). Branch `codex/sapphire`, HEAD `36d34a26`, eight uncommitted files. Diagnostic files [paste, from `$TMPDIR/f6c-range-registered-control-uDwcBR/…/consumer-process/`]: `runner-stdout.log` (362 bytes) = `{"completed": true, "accepted": false, "syntheticOnly": true, "output": {…"bytes": 43}}`; `runner-stderr.log` (578 bytes) = two JSON resource-accounting lines, ~0.02 s CPU. Proposed cause (inferred from those files): the child stage completed; the supervisor never observed the owned process group close. Node 26 vs the Node 22 used elsewhere is a candidate, not observed. Response: operator Ctrl-C [claim]; `ps` grep for `launch-[a-z0-9-]*-pilot|eom_.*_cli` returned nothing afterwards [paste]; 164 temp dirs removed [paste]; sweep made opt-in; findings recorded in OPS-022/OPS-024 (uncommitted). Outcome: **confirmed unresolved defect**, mechanism unidentified; no commit produced; no receipt.

**F08 — `f6b-prescribed-kernel-diagnostic` crash on Mac.** Excerpt [paste]: `TypeError: sourceRecord.assemblyId must be a nonempty string.` at `src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs:53` via `scripts/mapping-electromagnetism/f6b-prescribed-kernel-diagnostic.mjs:116`, followed by `✖ F6b diagnostic rejects shared circles and preserves polarity-resolved tangent structure (165.79ms)`. Cause: matches the OPS-024 row "prescribed-assembly v3 schema and required `assemblyId`" (read from `work-queue.md` [tool]). Response: none; pre-existing routed decision row. Outcome: unresolved, owner named in OPS-024.

**F09 — `✖ source snapshot binds fresh builder, whole EOM owners and frozen references (5.1ms)`** [paste]. Test file not identifiable from the excerpt. Consistent with the OPS-024 "EOM reviewed-source pins after #246" row, but that attribution is inferred. Response: none. Outcome: unresolved.

**F10 — Reporting-sweep failures generally (CI and Mac).** The operator reported "a lot of errors" in the CI log [claim]; the Mac paste shows several `✖` lines. These are the population OPS-024 triaged (181 failing assertions in 48 files in the sandbox [claim, from the row text]). No count from CI or the Mac was captured this session. Classified reporting-only by `reporting: true` in the runner [tool]. Outcome: unchanged.

**F11 — `gh pr create` warning `Warning: 1 uncommitted change`** [paste]. Effect: the operator asked whether to delete the PR. Observed cause: untracked `pr-body-codex-sapphire.md` at repo root (`?? pr-body-codex-sapphire.md` [tool]). Outcome: explained (untracked file is not in a PR); the operator deleted the file [claim]; `git status` later clean [tool].

**F12 — Sandbox cannot write the validation receipt.** [claim from the opening prompt and the PR body]; consistent with F05's `EPERM` class. Consequence observed this session: no receipt existed on the Mac either (`receipt miss: receipt missing` [paste]), so the Mac commit ran the full gate. Outcome: structural; not a defect of the branch.

**F13 — Tooling interruptions without decision impact.** `sleep 240` exceeded the sandbox tool cap (`Command timed out after 177984ms` [tool]); `require("yaml")` absent in the sandbox, replaced by `python3 -c "import yaml…"` [tool]; the opt-in verification run was deliberately killed by `timeout 110` after the sweep header appeared [tool], which may have left sandbox test children running (not checked).

**F14 — Temp-dir count discrepancy.** `find … -mmin -120` counted 158 [paste]; the later `ls -d … | wc -l` counted 164 before removal, 0 after [paste]. Reconciled as additional directories created by the interrupted gate between the two commands; not verified.

## 3. Changes and verification

**Proposed and applied (uncommitted, unpushed).** Eight files, two successive versions; `git status` at the end showed `MM` on six (staged first version by the operator's `git add` [paste], second version unstaged) and `M ` on two [tool]. Nothing was committed or pushed in this session; the Mac commit was interrupted before the hook completed.

| File | Change (final version) |
|---|---|
| `scripts/check-content-integrity.mjs` | Sweep check gains `skipWhen`/`skipReason`; runs only when `AAA_TEST_SWEEP=run` (first version: skipped when `=skip`); skipped checks printed in place and in the closing summary; exit status unaffected. |
| `scripts/run-test-sweep.mjs` | Passes `--test-timeout` to `node --test`: 120 000 ms default, 600 000 ms with `--slow`, `--test-timeout=<ms>` override with validation. |
| `.github/workflows/content-integrity.yml` | `timeout-minutes: 20`; `--slow` step removed; (first version set `AAA_TEST_SWEEP: skip`, later removed). |
| `.github/workflows/pages.yml` | `timeout-minutes: 30`; (env removed in final version). |
| `scripts/config/test-sweep-slow-list.json` | `rule` text updated to opt-in/on-demand wording. |
| `reference/op/agent-startup-orientation.generated.md` | Regenerated fingerprint row for the runner (F06). |
| `reference/priorities/aaa-operations/work-queue.md` | OPS-022: three new dated entries (CI hang; corrective; Mac gate run) and revised blocker/completion lines; OPS-024: pilot-process row annotated, then reclassified as defect. |
| `reference/op/README-op.md` | One line: sandbox edits, Mac commits. |

**Was the gate/test itself changed?** Yes, throughout. The gate runner, the sweep instrument, the CI workflows, and the slow-list config are the subjects of the change. No test expectations, fixtures, pins, or reference implementations were altered in this session. The only hash movement is the router's fingerprint of the runner (old `c37d06f38b894abc`, new `a3c99f8fc3f58560` after version 1; the post-version-2 value not captured), which is a current-source expectation, not a historical evidence binding, justified by the regeneration command the repository names for it.

**Verification performed (sandbox, Linux, Node v22.23.2)** [all tool]: `node --check` on both scripts; YAML parsed via Python; JSON parsed; `--list` reporting 312 files/120 000 ms and 10 files/600 000 ms, an override honoured, a malformed override throwing; known case for the timeout (3 s sleep under `--test-timeout=500` → `test timed out after 500ms`, exit 1) run before any sweep executed under the bound; full runner with the skip (v1) and with no env (v2) completing in 1m03s–1m10s with only step 11 failing and step 33 listed as skipped; with `AAA_TEST_SWEEP=run` (v2) step 33 starting the 312-file sweep (then killed); pinned process tests `pr-branch-process-conformance`, `runtime-asset-build`, `pre-push-gate-policy`, `pr-validation-receipt` 31/31; router and CLAUDE.md floor `--check` current.

**What is not verified.** The change has not run on a GitHub runner (the workflows' `timeout-minutes` and the absence of the env are untested there). It has not completed on the Mac: the only Mac run was of version 1 and was interrupted. Correctness of the *design* — that a gate without the sweep is acceptable — rests on the operator's decision, not on evidence. The timeout instrument was validated on a known case, and on the Mac it demonstrably fired (F07), which is independent evidence that the bound works; it is not evidence that the sweep is otherwise healthy.

**Verified repairs.** None to the underlying defects. The only repair verified end-to-end is the router regeneration (F06).

## 4. Decisions to accept or defer failures

1. **Proceeding to PR creation with no local receipt.** Rationale: sandbox cannot write it (F12); prior-thread gate results [claim] and the branch tip being pushed. Authorization: the procedure invocation. Risk: the pre-push hook's run on the pushing machine was "not observed by the thread that rebuilt this body" (PR body text). Owner: none named.
2. **Step 11 `EPERM` treated as environmental (F05).** Evidence: the `EPERM … unlink '…/.local-data/…'` text, three times. Not a test that executed to a verdict; an unavailable prerequisite (writable `.local-data`). Risk: no Mac pass of step 11 is in this session's evidence. Owner: OPS-018/OPS-021 rows.
3. **Reporting sweep failures accepted as non-gating (F10).** Rationale: `reporting: true`, the OPS-020 Question 3 decision [row text]. Authorization: operator decision 2026-09-06 [row text]. Risk: the routed rows remain red. Owner: OPS-024 table, per row.
4. **Sweep skipped in CI (v1), then made opt-in everywhere (v2).** Authorization: operator "do 1 2 3 4" (v1 spec) and "do 1 and 3 now" (inversion). Evidence: F04 and F07. Risk: the sweep runs nowhere automatically; promotion to blocking depends on someone running it by hand. Owner: OPS-022. Note: v1 skipped only hosts without the venv; v2 was adopted because F07 showed the venv is not the discriminator.
5. **Per-test timeout added (120 s / 600 s).** Authorization: operator "do … 2". Evidence: known-case pass, then F07 firing on the Mac. Remaining risk: `node --test`'s timeout does not kill test children (observed, F07), so a bound converts a hang into a failure *plus* an orphan. Owner: recorded in OPS-022; the test-side fix is unassigned.
6. **Job `timeout-minutes` added (20/30).** Rationale: cap the cost of a future hang. Untested on GitHub. Values chosen from #259's durations.
7. **`--slow` CI step removed.** This exceeded the operator's literal words; I flagged it as a judgment when reporting. Rationale: the operator's stated target of CI returning to #259 durations. Risk: the slow list is now run only on demand. Owner: OPS-022.
8. **OPS-024 decision rows deferred to the successor branch.** Authorization: operator "do … 3". Risk: #260 merges with 48 failing files by the sandbox count [claim]. Owner: per-row owners in OPS-024.
9. **CI runs cancelled (F04) and the Mac gate interrupted (F07).** Operator actions; rationale: unbounded wait. No data lost; no commit produced.
10. **Handoff prompt instructs "Do not re-verify by running the sweep."** Rationale: F07 shows a Mac sweep cannot complete. Risk: the commit lands with the sweep never having completed anywhere under the new bound.

## 5. Git and GitHub access

**Local Git (sandbox, Git 2.34.1, mounted checkout).** Reads and inspection succeeded throughout: `branch --show-current`, `--no-optional-locks status -sb`, `rev-parse`, `rev-list --count`, `merge-base --is-ancestor`, `diff --shortstat`, `ls-tree`, `log` [tool]. No `index.lock` at any check. `merge-tree --write-tree` unsupported (F03). No `add`, `commit`, or `push` attempted from the sandbox; the hook path cannot complete there (F12).

**Remote fetch.** `git fetch origin` ran once in the sandbox with no error output and refs unchanged afterwards [tool]; success is inferred from absence of error, since the fetch printed nothing.

**Remote push.** None attempted this session. The branch tip `36d34a26` was already at `origin/codex/sapphire` [tool, before and after fetch].

**GitHub CLI (`gh`, operator's Mac).** `gh pr create --title … --body-file pr-body-codex-sapphire.md` succeeded → `https://github.com/jmarkmorris/architrino/pull/260` [paste]; a gh update notice (2.95.0 → 2.100.0) appeared. `gh pr ready --undo 260` was recommended; execution not confirmed. Authentication and authorization for `gh` are the operator's account, scope not shown.

**Connector (GitHub MCP).** Authenticated as `jmarkmorris` (id 14032547) via `get_me`, before and after the reconnect [tool]. Authorized reads succeeded: `list_pull_requests` (head filter), `pull_request_read` `get`/`get_check_runs`/`get_status` on #259 and #260 [tool]. Authorized writes failed: `create_pull_request` ×3 this session, `update_pull_request(draft:true)` ×1, all `403 Resource not accessible by integration` (F01, F02). Permission scope: not exposed by the API; the operator's reading of the installation page [claim] was "read only, installed six months ago, not configurable". Successful login and reads were never taken as evidence of write access. No tokens or headers appeared in any output.

## 6. Process problems and corrections

**Contradicted diagnosis: "the pilot stall needs a host without the venv."** Stated by me after F04 and written into the v1 code comments and workflow comments. Contradicted by F07 on the Mac with the venv. Corrected the same day in v2 and in the OPS-022 entry, which now records the earlier wording as superseded. Consequence: one wasted edit cycle and a Mac gate attempt that was doomed.

**Unsupported attribution inherited from OPS-024.** The nine pilot-process files were classed "environmental — expected green on the Mac" by a sandbox whose resource limits killed them. This session showed the sandbox figure was a kill, not a completion. The row was reclassified (uncommitted).

**Unsupported figure caught before it mattered.** I wrote "the slowest non-slow file was 8.5 s" in a code comment; it was not measured; replaced with the 10 s threshold relationship before verification. Similarly a sentence claiming the known case ran "before the change was applied" was corrected to "before any sweep was executed under the bound".

**Wrong log location.** I directed the operator to `find .local-data -name runner-stderr.log`; the newest hit was from 2026-08-28 and empty for this purpose. The tests write under `$TMPDIR` (`mkdtempSync(path.join(tmpdir(), …))`, read afterwards [tool]). One wasted round trip; then the correct files were found and were decisive.

**Repeated retries with unchanged result.** Six `create_pull_request` attempts across two threads produced the identical 403. Each retry this session followed an operator-reported configuration change, so none was blind, but none was informative either; the fallback should have been taken after the first this-session failure. The `update_pull_request` attempt added a fifth data point of the same kind.

**Instruction the operator could not follow.** I described a GitHub installation-permissions review page ("step 1"); the operator could not find it and reported the installation as non-configurable. My description of GitHub's UI was an assumption.

**Environmental assumptions that affected work.** Sandbox Git version (F03); sandbox `EPERM` (F05, F12); Node 22 in sandbox/CI versus Node 26 on the Mac, discovered only from the Mac paste; the belief that the sweep's 1m12s sandbox time [claim] predicted CI.

**Scope expansion.** A publication handoff became a gate redesign and then a supervision-defect investigation. Each step was operator-directed ("let's discuss the path forward", "do 1 2 3 4", "do 1 and 3"), and the OPS-024 decision rows were explicitly kept out. The branch under review nonetheless gained eight more modified files before any commit.

**Successful recoveries.** Ancestry substitute for `merge-tree` (F03); PR body figures re-measured against the tip before use (903 files, +42,777/−33,333, empty `.local-data` tree) [tool]; the timeout instrument validated on a known case before use and then observed firing on the real target; the orphan risk identified before the operator let the gate run to exhaustion; temp-dir cleanup confirmed 164→0.

**Missing evidence.** The prior thread's gate run and receipt-write failure; the full CI job logs; the full Mac pre-commit output and its `[test-sweep]` summary; the router hash after the v2 regeneration; whether `gh pr ready --undo 260` was run; the venv's resolved path on the Mac; whether the `ps` pattern used to check for orphans covers every supervisor process name.

## 7. Unresolved handoff

**Confirmed unresolved defects.**
1. Pilot-process supervision: child stage completes, supervisor never observes group close (F07). Blocks any automatic sweep anywhere; owner unassigned beyond "gate-leader group-close path under `scripts/eom/launch-*-pilot.mjs`".
2. `node --test` timeout orphans test children (F07). Compounds 1 wherever the bound fires.
3. Connector cannot write pull requests (F01, F02). Blocks the connector-only publication path; `gh` works.

**Suspected defects needing verification.**
4. Node 26.3.0 as the discriminator for defect 1 — the Node 22 vs 26 experiment in the handoff prompt has not been run.
5. F09 (`source snapshot binds fresh builder…`) — file and cause not identified.
6. Pilot-process tests leave `$TMPDIR` directories behind by design or by omission — 164 in one session.

**Checks blocked by missing prerequisites.**
7. Gate step 11 on a writable host (F05): no Mac result in evidence.
8. Full gate completion on the Mac under the v2 change: never run.
9. `timeout-minutes` and env-free workflows on a GitHub runner: never run.
10. A completed sweep under the 120 s bound, on any host.

**Decisions still requiring review.**
11. Whether a commit gate with no automatic test sweep is acceptable until defect 1 is fixed (opt-in v2); operator-authorized, not independently reviewed.
12. Removal of the `--slow` CI step (my judgment beyond the operator's words).
13. Merging #260 with the OPS-024 rows unresolved and the sweep red.

**Claims of repair lacking adequate verification.**
14. "CI returns to roughly #259 durations" — inferred from removing the sweep; unmeasured.
15. The eight-file change as a whole — verified only in the sandbox; uncommitted, unpushed, never green on the Mac or GitHub.

**Missing transcript sections or logs for independent review.**
16. The prior thread (three 403s, sandbox gate run, PR body authoring).
17. Full logs of GitHub jobs 101589201389 and 101589201262 (cancelled).
18. Full Mac pre-commit output from the interrupted run, especially any `[test-sweep]` and `[content-integrity]` summary lines.
19. The connector app's installation record as the operator saw it before uninstalling.
20. Confirmation of `gh pr ready --undo 260` and the current draft state of #260.

Coverage: complete for this session's transcript; incomplete for the prior thread, CI logs, and Mac terminal beyond the pasted excerpts. This report does not certify the repository or the branch as healthy.