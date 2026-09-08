# First Bounded Process Investigation

Date: 2026-09-07. The operator authorized the first investigation after reviewing the proposed plan. This pass produced a controlled reproduction and a narrower mechanism hypothesis, not a production repair. Original reports, production sources, tests, and pins remain unchanged.

## Result

The current supervisor does not accept normal completion of a minimal Node module that only writes a completion marker and returns. The same module with an explicit process exit completes successfully. Both results were measured on the operator's Mac with Node v26.3.0 using the [synthetic probe](../evidence/process-controls/supervision-probe.mjs). No Python, EOM executable, numerical calculation, or broad test sweep was needed.

An in-memory experiment releasing the watchdog's event-loop references removed the wait but caused the runner to exit with `SIGKILL`, which the supervisor correctly rejected. This is evidence against applying a simple `unref` patch as the repair. The normal-completion and cancellation paths must be reconciled while preserving the protection against signalling unrelated processes.

The separate bootstrap-interruption control produced the reported unauthenticated-birth cleanup message, but its runner and observed watchdog were absent in an independent post-run `ps` query. That supports cleanup in this one control; it does not justify deleting independent cleanup assertions from tests generally or prove every interruption timing safe.

## Controls and observations

The supervisor was given 20 seconds total, with its existing 15-second cleanup reserve, leaving approximately five seconds for work. The canonical owned-compute wrapper added a 30-second outer deadline and a five-second heartbeat. Before each target run, the command/output capture checked a known Node program returning the exact `KNOWN_CONTROL` marker. The explicit-exit case then supplied the successful end-to-end control before testing natural return. The probe's process inspector uses the existing repository parser; post-run absence checks separately use `/bin/ps -p <pid>` and require exit 1 with empty output. These are operational controls, not independent scientific validation.

| Control | Supervisor result | Measured elapsed time inside probe | Independent recorded-PID observation | Evidence |
| --- | --- | ---: | --- | --- |
| Explicit exit after writing marker | Accepted, clean completion | 0.269 s | Runner and watchdog absent | [Output](../evidence/process-controls/explicit-exit.stdout.log), [receipt](../evidence/process-controls/explicit-exit.receipt.json) |
| Natural return after writing the same marker | Rejected: runner close exceeded original allowance | 5.314 s | Runner and watchdog absent after deadline cleanup | [Output](../evidence/process-controls/natural-return.stdout.log), [heartbeats](../evidence/process-controls/natural-return.stderr.log), [receipt](../evidence/process-controls/natural-return.receipt.json) |
| Natural return with watchdog and IPC references released in an in-memory module copy | Rejected: runner did not exit cleanly; exit signal `SIGKILL` | 0.370 s | Runner and watchdog absent | [Output](../evidence/process-controls/unref-control.stdout.log), [receipt](../evidence/process-controls/unref-control.receipt.json) |
| Interruption at second process inspection, before ownership authentication | Rejected for the deliberate interruption; cleanup message “runner birth was never authenticated” | 10.161 s | Independently captured runner and watchdog PIDs absent | [Output](../evidence/process-controls/bootstrap-interruption.stdout.log), [receipt](../evidence/process-controls/bootstrap-interruption.receipt.json) |

The diagnostic program intentionally catches rejected supervisor outcomes and records them, so its own exit 0 and the generic wrapper's `completed` status do not mean the supervisor accepted the workload. The outcome column above comes from each supervisor receipt. A completion marker proves the workload reached that line, not that its enclosing process exited.

## Mechanism and limits

Reading `SUBFIELD_CIRCULAR_BOOTSTRAP_SOURCE` in `scripts/eom/launch-subfield-circular-root-pilot.mjs` shows a watchdog child created with an IPC channel, with error, exit, and message listeners. After the workload import completes, the bootstrap disconnects its channel to the outer parent; the watchdog relationship remains. Reading `SUBFIELD_CIRCULAR_ROOT_GUARD_SOURCE` shows disconnect or control-channel loss invokes cancellation and may kill the still-live runner group. Reading the supervisor completion path shows it awaits runner close before later channel cleanup.

Together with the controls, this strongly supports an incorrect interaction between ordinary event-loop completion and watchdog cancellation. The in-memory change altered two references together, so it does not isolate the individual reference responsible. The `SIGKILL` observation is measured; attributing that signal specifically to the watchdog is inferred from the inspected cancellation path, not independently traced at the operating-system signal source. A different sender or different surviving handle would overturn that specific mechanism inference.

The full acceleration-pilot process test has not been rerun. The minimal reproduction isolates a shared supervisor behavior consistent with the reported hang; it does not prove this is the only cause across all pilot families. Node 22 is not installed at `/opt/homebrew/opt/node@22/bin/node` by `ls -l`; no claim is made about other possible installations, and no runtime was downloaded. The cross-version experiment remains pending if needed after the lifecycle design is understood.

## Execution restriction encountered in this pass

The initial generic wrapper attempt in the restricted execution environment timed out before target registration. A direct `ps` command then returned “Operation not permitted.” Both target logs were empty. Running process inspection with reviewed host permissions revealed the diagnostic sidecar still alive after its advertised deadline. The generic wrapper installs its deadline after startup work, by source inspection, so it did not bound this pre-registration failure in the observed attempt. The exact blocked startup operation inside that sidecar was not traced.

This is an additional wrapper-startup finding, separate from the pilot normal-return reproduction. The sidecar's exact PID, birth time, process group, and command were rechecked before signalling only that process. A subsequent host `ps` query confirmed it absent. The successful diagnostic runs then used host permissions for the process inspection their supervisors require. `owned-compute-supervisor.mjs closeout` reported this task clear after all four controls; that lease-based result is supplemented by the explicit PID checks, because the original failed startup had no recorded target identity.

The initial run was `e24c9dc4-7409-4387-9082-cac0a3894ef2`; the observed sidecar was PID 74390, born `Mon Sep 7 00:32:27 2026`. Its cleanup was verified with `ps -p 74390,74422,74423 -o pid=,ppid=,pgid=,stat=` returning exit 1 and no output after the targeted signal. No unrelated process was selected for a signal. No raw control tokens were copied into the evidence collection.

## Reproduction and source identity

The final probe includes all four modes and their common known-case check; modes were added as the investigation progressed. It preserves the final reproducible instrument, not a claim that its bytes were identical at every earlier run. The earlier versions and edits are retained in this receiving task's tool history. The raw outputs and supervisor receipts were copied from the observed runs into `evidence/process-controls/`.

```bash
node scripts/dev/owned-compute-supervisor.mjs run \
  --owner-task "${CODEX_SESSION_ID:-$CODEX_THREAD_ID}" \
  --deadline-seconds 30 --heartbeat-seconds 5 -- \
  node reference/priorities/development-process-review/evidence/process-controls/supervision-probe.mjs explicit-exit
```

The other modes are `natural-return`, `unref-control`, and `bootstrap-interruption`. Run only in an environment where process inspection and the supervisor's control endpoint are available. The `unref-control` mode changes a loaded in-memory copy at exactly one asserted source location; it never writes the production launcher. The source root is the repository working directory. No compiled work is invoked, so no binary rebuild applies.

`shasum -a 256` measured the production launcher as `3f6026b029d5e1d90354213f34f3305e71f19e9d4020fc4f2ea0a56983bcc85a` and the final preserved probe as `e2d2013adb9d309c375001851c6147f49f4a5380d6bfb45d270ce3efe4398282`. Reproduction at different source bytes must be recorded as a new comparison.

## Next repair boundary

The first bounded investigation is complete: it reproduced an operational defect, demonstrated a successful control, rejected a tempting incomplete patch, and independently checked one disputed cleanup scenario. No operator decision about scientific behavior was needed.

The next engineering step is to specify and validate normal runner/watchdog completion separately from cancellation, then test that behavior in the real pilot composition. Preserve watchdog protection during live work, verify output drain and clean exit, and prove that cancellation still terminates owned descendants without signalling unauthenticated identities. Strengthen the bootstrap test with an independent observation of the processes it actually created. Address the generic wrapper's startup deadline under its own owner rather than conflating the two supervisors. Production changes and any resulting pin review should follow this contract-level assessment; no pin cascade or broad repair has been applied in this pass.
