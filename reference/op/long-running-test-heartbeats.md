# Long-Running Job Policy and Heartbeat Notes

This file owns the operating procedure and recurrence evidence for long-running tests, simulations, rebuilds, and analytical campaigns. Keep the [README-op.md](README-op.md) checklist concise; put operational detail and dated evidence here.

## Operating Procedure

1. Rebuild before running compiled work. Record the binary build time and compare it with the latest relevant source change so a stale binary cannot masquerade as a slow or surprising result.
2. Prefer waiting for an owned foreground job when completion fits the active task.
3. Do not report completion while leaving an unobserved job running.
4. If detachment is necessary, detach the process from the launching shell and report:
   - PID;
   - exact command or executable;
   - output and heartbeat paths;
   - start time;
   - fixed heartbeat cadence;
   - stop and resumption procedure.
5. A heartbeat must flush observable progress such as step index, simulation time, wall seconds, processed candidates, or artifact count. A final artifact alone is not a heartbeat.
6. Verify that the detached process remains alive after the launching shell exits and that the heartbeat advances before handing it off.
7. On completion or failure, report the terminal state and remove or close any monitoring mechanism that no longer has a job to watch.
8. Repository-controlled detached compute must use `node scripts/dev/owned-compute-supervisor.mjs start` unless its launcher is explicitly registered in [owned-compute-launch-policy.v1.json](owned-compute-launch-policy.v1.json) as a specialized process-control owner. Direct shell backgrounding and unregistered `detached: true` launches are not accepted operating paths.
9. Every supervised launch requires an owner task and a hard deadline. In a Codex task, use the stable `$CODEX_SESSION_ID` as `--owner-task` and `$CODEX_THREAD_ID` as `--owner-thread`; the project `Stop` hook receives that same session identity. The supervisor records an ignored machine-readable lease, exact command, working directory, target and sidecar birth identities, process group, output paths, heartbeat cadence, resource-independent wall clock, authenticated loopback control endpoint, and terminal group-closure state under `.local-data/owned-compute/`.
10. Before a non-Codex task closes, run `node scripts/dev/owned-compute-supervisor.mjs closeout --owner-task <task>` and resolve every live or identity-uncertain lease by waiting, authenticated handoff, or controlled stop. For a trusted Codex project, [`.codex/hooks.json`](../../.codex/hooks.json) runs the same owner-aware closeout automatically at every root-task `Stop` boundary and continues the task while closeout is blocked. Handoff changes operational ownership only; it does not transfer scientific authority or acceptance.
11. Use `list` or `reconcile` before examining the broader process table. The supervisor may signal an unmonitored group only when the live group leader exactly matches the lease's PID, process-group ID, process birth time, and command. Any mismatch fails closed and requires manual investigation; PID, name, CPU use, or silence alone never authorizes a signal.
12. A detached scientific launcher retains all of its own stricter process-census, admission, memory, deadline, evidence, and acceptance obligations. The generic supervisor is an outer lifecycle envelope, not a scientific oracle or substitute for closed-world membership.
13. Prune terminal operational records only through `prune --older-than-seconds <seconds>`. The command is a dry-run unless `--apply` is also present. It selects only terminal leases older than the threshold with `processGroupClosed: true`; it retains live, launching, stopping, unmonitored, identity-mismatched, stale-closed, too-recent, or otherwise uncertain leases. Before any apply, it verifies the exact lease and its declared canonical stdout/stderr logs are distinct regular non-symlinked files beneath `.local-data/owned-compute/`; any unsafe candidate refuses the entire apply.
14. The repository-controlled Codex `Stop` hook is the automatic enforcement boundary for trusted Codex sessions: it passes the hook's `session_id` to `closeout --owner-task` and asks Codex to continue when that owner retains live or identity-uncertain compute. Codex requires review and trust of new or changed project hooks before they run; until that trust is recorded, use the explicit closeout command. Other task hosts remain outside this automatic boundary unless they provide an equivalent lifecycle callback with a stable owner identity and honor a nonzero closeout result. Global Git hooks are not a substitute because they cannot identify the current task and must not fail on compute legitimately owned by unrelated tasks.

The canonical forms are:

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds <seconds> -- <command> [args...]
node scripts/dev/owned-compute-supervisor.mjs start --owner-task "$CODEX_SESSION_ID" --owner-thread "$CODEX_THREAD_ID" --deadline-seconds <seconds> -- <command> [args...]
node scripts/dev/owned-compute-supervisor.mjs handoff --run-id <run-id> --to-task <task> --to-thread <thread-id>
node scripts/dev/owned-compute-supervisor.mjs stop --run-id <run-id> --reason <reason>
node scripts/dev/owned-compute-supervisor.mjs list --active
node scripts/dev/owned-compute-supervisor.mjs reconcile
node scripts/dev/owned-compute-supervisor.mjs prune --older-than-seconds <seconds>
node scripts/dev/owned-compute-supervisor.mjs prune --older-than-seconds <seconds> --apply
```

`run` is the default for work that fits the active task. `start` returns only after the persistent sidecar and target group have registered. Outside Codex, replace the environment-backed owner values with the task host's stable owner-task and owner-thread identifiers. Detached runs survive the launching shell but cannot run beyond their declared deadline; the sidecar remains responsible for heartbeat and group cleanup. Terminal leases and logs remain local operational records and are not scientific evidence by themselves.

`prune` reports selected, retained, and deleted records. Dry-run reports what would be eligible without deleting files. Apply deletes only each selected lease plus the stdout and stderr logs named by that lease; it never follows command arguments or treats referenced scientific artifacts as retention targets. A passing prune report establishes only bounded cleanup of closed operational records under the owned-compute state root. It does not establish scientific acceptance, evidence retention, closed-world process membership, or prevention of processes launched outside repository-controlled wrappers.

Do not place credentials or private tokens in command-line arguments because the exact command is retained in the local lease. The source-inventory checker detects literal `detached: true` additions; the policy prohibition on shell backgrounding and computed detachment remains a review obligation rather than a closed-world source theorem.

The procedure does not advance: silence is not progress unless a separately observed process state proves the job is still healthy.

The `Stop` hook establishes task-closeout enforcement only for repository-trusted Codex sessions whose supervised launches use the matching `CODEX_SESSION_ID`. It does not run for subagents, replace explicit closeout in other hosts, establish scientific acceptance, or prevent processes launched outside repository-controlled wrappers.

## Recurrence Notes

- 2026-05-25: Reopened after the `Shift31` root-tail tube test ran for about 228 seconds with no intermediate row progress.
- 2026-05-29: A narrowed expression-level M4 refinement probe also stayed silent past two minutes before clean `SIGINT`; add progress callbacks before using that path as a sprint critical path.
- 2026-05-29: The combined H37/H38 successor coefficient test command stayed silent after the TAP header for roughly eight minutes before clean `SIGINT`; add heartbeat/progress to the successor certificate test harness before relying on it as a final sprint check.
- 2026-05-29: The standalone thirty-eighth-order post-$U$ successor coefficient test again stayed silent after the TAP header for more than five minutes before clean `SIGINT`; prioritize heartbeat and cooperative stop support for this exact test path.
- 2026-09-02: Six high-CPU process groups remained after recent tasks had no active subagent work. Ownership had to be reconstructed from task history before graceful interruption. Added the canonical owned-compute lease/supervisor, closeout and reconciliation commands, and a fail-closed source inventory so new repository detachment cannot appear silently.
