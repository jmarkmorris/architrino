# Long-Running Job Policy and Heartbeat Notes

This file owns the operating procedure and recurrence evidence for long-running tests, simulations, rebuilds, and analytical campaigns. Keep the root guidance and [README-op.md](../../README-op.md) checklist concise; put operational detail and dated evidence here.

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

The procedure fails closed: silence is not progress unless a separately observed process state proves the job is still healthy.

## Recurrence Notes

- 2026-05-25: Reopened after the `Shift31` root-tail tube test ran for about 228 seconds with no intermediate row progress.
- 2026-05-29: A narrowed expression-level M4 refinement probe also stayed silent past two minutes before clean `SIGINT`; add progress callbacks before using that path as a sprint critical path.
- 2026-05-29: The combined H37/H38 successor coefficient test command stayed silent after the TAP header for roughly eight minutes before clean `SIGINT`; add heartbeat/progress to the successor certificate test harness before relying on it as a final sprint check.
- 2026-05-29: The standalone thirty-eighth-order post-$U$ successor coefficient test again stayed silent after the TAP header for more than five minutes before clean `SIGINT`; prioritize heartbeat and cooperative stop support for this exact test path.
