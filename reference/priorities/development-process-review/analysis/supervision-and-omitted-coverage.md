# Supervision and omitted coverage follow-through

Status legend: **✓ Done** = completed at the stated measured scope; **◐ Partial** = some required work remains; **○ Not done** = not executed or accepted. **Blocked** names an unmet prerequisite; **Deferred** names the condition for reopening. Historical tables below retain their original observed outcomes and are not current action lists.

## ✓ Done — startup deadline

Source inspection of `scripts/dev/owned-compute-supervisor.mjs` found that the ordinary deadline timer was installed only after log opening, loopback registration, sidecar identity observation, target spawn, and target identity registration. A stalled pre-target stage therefore had no deadline inside the sidecar. The launcher's ten-second wait bounded only its own wait; it did not supply a successful sidecar termination record.

The current supervisor validates the absolute deadline before opening its startup resources, bounds each asynchronous startup stage by the remaining allowance, checks again before spawning a target, and bounds target identity acquisition with the same deadline. A failed pre-target stage destroys its streams, closes its listening server, and records a failed lease with no target and a closed target group. Target registration failure follows the existing owned-target termination path. This is an operational startup repair; it does not claim that the process can recover from a blocked kernel/filesystem operation or establish any scientific acceptance.

The added stalled-observer control replaces only the observer call in a private copy with a promise that never resolves. It verifies deadline failure, no workload marker, and sidecar exit without the test timeout supplying cleanup. The existing log-collision control still preserves the original file and prevents a target launch. Native TAP for the final supervisor, launch-policy, and stop-hook selection reports 27 passes, zero failures and zero skips in [startup-controls.log](../evidence/supervision-follow-through/startup-controls.log). Owned run `857617a1-6db5-47ee-bfeb-9b49fb240c3a` exits zero after 6.679 wall seconds with group closure. `node scripts/check-owned-compute-launch-policy.mjs` and scoped `git diff --check` also pass.

The measured source SHA-256 is `4da8f0f9b9f8e156b5cba5123f6ac19e96087d6c53ea2edd0d53fec635054c9b`; the supervisor test SHA-256 is `c0469bd96a148b11c44fe3257dc08063137029bcf8c9686772aefedecc20e6b8`, by `shasum -a 256`. A source-name search before editing identified the supervisor's direct callers, test-copy consumers, current F5 handoff runner and secure-tunnel configuration; their historical receipts were not rewritten. A future stalled startup that launches a target after the deadline or fails to exit after the bounded observable stage would falsify the corresponding operational claim.

## ◐ Partial — streamed private-growth recurrence remains open

The two selected active rejection controls pass under owned run `70ddad1a-0ec0-4244-8bf2-cb532d7eea4c` (18.125 wall seconds, exit zero, closed group), with native TAP retained in [streamed-controls.log](../evidence/supervision-follow-through/streamed-controls.log). The retained monitor fixture exits promptly. The retained [private-growth closure](../evidence/supervision-follow-through/private-growth-external-closure.json) explicitly records `status: timed_out`, `exitSignal: SIGTERM`, and observed group closure under its fifteen-second outer owner.

Reading `rejectLifetime` and the final catch in `scripts/eom/f6c-bounded-operation.mjs` explains this boundary: an over-quota retained layout prevents accepted lock cleanup, so the original internal guard remains armed rather than being discarded. The fixture's outer deadline supplies bounded external cancellation. The passing test establishes retained invalid layout, absent public stream, and process closure; it does not establish prompt internal termination or a successful original failed run.

**Blocked — capture an actual supervisor exit reason or reproducible recurrence before claiming historical closure.** The historical `e4335026-cafc-4440-a1ee-687f5b74195b` lease still records stopping after its deadline with no terminal result. Its retained stderr contains only the initial host-resource observation. No causal transition explains the lost supervisor. The new startup patch operates before target registration, whereas that historical fixture reached running and later stopping; this patch is not attributed as its fix. Further recurrence investigation must capture the actual supervisor exit reason or a reproducible failure, preserve the original lease, and distinguish ordinary guard retention from an unexplained loss of supervision.

## Omitted coverage

The SDK environment is now selected and both previously omitted conformance commands have executed. An isolated `@modelcontextprotocol/sdk@1.30.0` installation lives beneath ignored `.local-data/development-process-review/sdk-conformance-1.30.0`, prepared by `npm install --ignore-scripts --no-audit --no-fund` under owned run `6bb3d74b-0a38-48c1-90a0-8ffe064f815b`. The registry version lookup is recorded by `4e0309fc-0ab9-489b-aafb-38c2bc1c4214`; no repository dependency manifest was changed. The [retained dependency lock](../evidence/supervision-follow-through/sdk-1.30.0-package-lock.json) has SHA-256 `592a50ac6302eb8e4a4182fbcb9b36dcbc904036ce650774bd4bfb09dcf9667f` by `shasum -a 256`; the [stdio result](../evidence/supervision-follow-through/sdk-1.30.0-stdio-result.json) and [HTTP failure](../evidence/supervision-follow-through/sdk-1.30.0-http-failure.log) retain actual child output.

| Command | Measured outcome | Remaining responsibility |
| --- | --- | --- |
| `check-fixture-mcp-sdk-conformance.mjs --sdk-root <isolated SDK 1.30.0>` | ✓ Done — Run `12093e6e-7e04-42e7-9e8f-29e04425f70b` passes initialization, the five bounded tools, missing-source error and ping; exit zero, 0.227 seconds, closed group. | This concrete SDK/stdio profile is exercised. |
| `check-loopback-mcp-http-sdk-conformance.mjs --sdk-root <isolated SDK 1.30.0>` | ◐ Partial — Run `062af4a3-19fe-4a97-af81-abd29e603f3e` exits one with `deployment contract rejected: SNAPSHOT_IDENTITY_MISMATCH`; 0.943 seconds, closed group. It fails before listening. | Blocked until the Archie owner repairs the source contract and the actual SDK HTTP profile passes; the SDK environment is available. |

An earlier explicitly selected SDK 1.17.5 environment rejects the server's `2025-11-25` protocol (`c2f95dbd-bdf0-487d-b5ab-b3bb0da41a5d`); its HTTP attempt also encounters the snapshot mismatch (`578810bf-3874-4f64-94fe-4082eb556ab0`). That unsupported protocol pairing is preserved as an environment result, not counted as a defect in the supported 1.30.0 stdio profile. Both installations and their lockfiles remain separate.

**○ Not done — sealed compact fixture. Blocked on the exact historical database or an explicit retirement decision.** `test -f .local-data/braid-analysis/compact-monte-carlo/configuration-sweep-v2/compact-campaigns.sqlite3` returns one. The 660-row sealed-fixture test explicitly skips when that exact historical database is absent. Creating replacement synthetic rows would not restore the sealed regression evidence; this omission remains blocked on the original database or an explicit retirement decision.

The following eight standalone input obligations remain unexecuted. Reading their actual CLI parsers supplies the requirements below; no dummy input is passed to manufacture a successful result. Selection belongs to the scientific-consumption disposition, and a missing applicable input remains a coverage omission.

| Check | Status | Actual required input / reopening condition |
| --- | --- | --- |
| `check-f5-evolution-dynamics.py` | ○ Not done — Deferred to the scientific owner; Blocked until the adjacent exact input is selected | `--request`, `--response`, `--declaration`, and a new `--out`. |
| `check-planar-three-binary-circular-release.py` | ○ Not done — Deferred to the scientific owner; Blocked until the adjacent exact input is selected | `--handoff`, `--out`, and all three coarse/medium/fine responses for release; `--prehistory-only` explicitly contracts the check. |
| `check-stella-octangula-short-release.py` | ○ Not done — Deferred to the scientific owner; Blocked until the adjacent exact input is selected | `--predeclaration`, `--run-summary`, `--out`. |
| `check-stella-octangula-short-release-accepted-ledger.py` | ○ Not done — Deferred to the scientific owner; Blocked until the adjacent exact input is selected | `--predeclaration`, `--run-summary`, `--out`. |
| `validate-attractor-resume-gate.mjs` | ○ Not done — Deferred to the scientific owner; Blocked until the adjacent exact input is selected | Uninterrupted run directory, resumed run directory, and checkpoint dump executable; compares actual checkpoints and run products. |
| `validate-campaign1-binary-workload.mjs` | ○ Not done — Deferred to the scientific owner; Blocked until the adjacent exact input is selected | Selected workload manifest JSON. |
| `check-emit-02-04-contract.mjs` | ○ Not done — Deferred to the scientific owner; Blocked until the adjacent exact input is selected | `--input` tri-binary solver report. |
| `check-same-branch-chart-identity.mjs` | ○ Not done — Deferred to the scientific owner; Blocked until the adjacent exact input is selected | `--input` tri-binary solver report or retained-domain packet. |

These results update concrete operational coverage only. They do not reconcile the complete test inventory, repair every owner failure, or establish overall repository or scientific acceptance.
