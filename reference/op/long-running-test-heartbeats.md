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
9. Every supervised launch requires an owner task and a hard deadline. The supervisor records an ignored machine-readable lease, exact command, working directory, target and sidecar birth identities, process group, output paths, heartbeat cadence, resource-independent wall clock, authenticated loopback control endpoint, and terminal group-closure state under `.local-data/owned-compute/`.
10. Before a task closes, run `node scripts/dev/owned-compute-supervisor.mjs closeout --owner-task <task>` and resolve every live or identity-uncertain lease by waiting, authenticated handoff, or controlled stop. Handoff changes operational ownership only; it does not transfer scientific authority or acceptance.
11. Use `list` or `reconcile` before examining the broader process table. The supervisor may signal an unmonitored group only when the live group leader exactly matches the lease's PID, process-group ID, process birth time, and command. Any mismatch fails closed and requires manual investigation; PID, name, CPU use, or silence alone never authorizes a signal.
12. A detached scientific launcher retains all of its own stricter process-census, admission, memory, deadline, evidence, and acceptance obligations. The generic supervisor is an outer lifecycle envelope, not a scientific oracle or substitute for closed-world membership.

The canonical forms are:

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task <task> --deadline-seconds <seconds> -- <command> [args...]
node scripts/dev/owned-compute-supervisor.mjs start --owner-task <task> --owner-thread <thread-id> --deadline-seconds <seconds> -- <command> [args...]
node scripts/dev/owned-compute-supervisor.mjs handoff --run-id <run-id> --to-task <task> --to-thread <thread-id>
node scripts/dev/owned-compute-supervisor.mjs stop --run-id <run-id> --reason <reason>
node scripts/dev/owned-compute-supervisor.mjs list --active
node scripts/dev/owned-compute-supervisor.mjs reconcile
```

`run` is the default for work that fits the active task. `start` returns only after the persistent sidecar and target group have registered. Detached runs survive the launching shell but cannot run beyond their declared deadline; the sidecar remains responsible for heartbeat and group cleanup. Terminal leases and logs remain local operational records and are not scientific evidence by themselves.

Do not place credentials or private tokens in command-line arguments because the exact command is retained in the local lease. The source-inventory checker detects literal `detached: true` additions; the policy prohibition on shell backgrounding and computed detachment remains a review obligation rather than a closed-world source theorem.

The procedure does not advance: silence is not progress unless a separately observed process state proves the job is still healthy.

## Recurrence Notes

- 2026-05-25: Reopened after the `Shift31` root-tail tube test ran for about 228 seconds with no intermediate row progress.
- 2026-05-29: A narrowed expression-level M4 refinement probe also stayed silent past two minutes before clean `SIGINT`; add progress callbacks before using that path as a sprint critical path.
- 2026-05-29: The combined H37/H38 successor coefficient test command stayed silent after the TAP header for roughly eight minutes before clean `SIGINT`; add heartbeat/progress to the successor certificate test harness before relying on it as a final sprint check.
- 2026-05-29: The standalone thirty-eighth-order post-$U$ successor coefficient test again stayed silent after the TAP header for more than five minutes before clean `SIGINT`; prioritize heartbeat and cooperative stop support for this exact test path.
- 2026-09-02: Six high-CPU process groups remained after recent tasks had no active subagent work. Ownership had to be reconstructed from task history before graceful interruption. Added the canonical owned-compute lease/supervisor, closeout and reconciliation commands, and a fail-closed source inventory so new repository detachment cannot appear silently.
