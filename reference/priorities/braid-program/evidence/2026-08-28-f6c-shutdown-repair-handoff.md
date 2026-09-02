# asymmetric counter-breathing representative shutdown repair and scientific restart handoff

Closure goal: Independently accept the controller shutdown repair, then advance the already declared scientific batch only if its complete admission and conservative execution budget fit. The whole-history goal remains open.

## Authority and current disposition

The operator authorized this task from **2026-08-28T22:38:40Z** until a hard stop at **2026-08-29T00:38:40Z**, with no automatic extension. The exact request and start observation are retained in `operator-request.txt` and `authorization-and-scope.md` under the private evidence directory below. The preceding [one-hour handoff](2026-08-28-f6c-one-hour-extension-handoff.md) and [whole-history handoff](2026-08-28-f6c-whole-history-campaign-handoff.md) remain unchanged.

**Final disposition: the private shutdown repair is operationally accepted for all five declared controls.** All three failure controls and both positive regressions passed independent result and closure review plus parent integration within their original limits. Last integration completed at **2026-08-28T23:20:03.602Z**. **No scientific interval advanced; no-go for a longer whole-history campaign.** Work stops at the operator's requested architecture checkpoint, with the broader goal unmet. No further control, numerical run or compute reservation is planned here.

Plainly: a repaired failure path is useful operational progress, but it does not supply any of the missing scientific history.

## Evidence location and repair

All new private sources, exact plans, raw tool packets, independent reviews, predecessor archives and accounting records are under:

```text
.local-data/braid-analysis/f6c-whole-history-20260828/repair-20260828T223840Z/
```

Paths below are relative to that directory unless stated otherwise. They are provenance locations, not reader-facing web links. Accepted controls stay in their individual case directories; the old rejected exit-137 attempt stays in the unchanged `one-hour-20260828T212413Z/disconnect-before-payload-v1/` directory.

The implementation changes only the two private candidate successors. `launch-abc-enclosed-root-pilot.candidate-v2.mjs` records genuine child exit, stdout close, stderr close and IPC disconnect, and composes completion from those four observations. Aggregate child `close` remains separately recorded when it occurs, but is not required for a real child's terminal progress. No completion event is manufactured and no Node counter is modified. The existing ownership checks, deadlines, callback tracking, cleanup, guards and lock discipline remain.

The repair's accepted scope is the five declared real-child IPC controls, subject to their individual final dispositions below. Spawn failure without an assigned child PID retains its separate existing path and is not exercised by these controls. This result does not claim every process-launch failure mode or every downstream scientific caller has been accepted.

The unchanged bootstrap timer now emits one authenticated observation from its existing callback before its existing stop action. Its original clock, minimum deadline, integer millisecond scheduling and immediate stop remain; no acknowledgment, retry or extra timer is added. C preserves the finite lifecycle and timer fields in durable rejection evidence. Missing timer evidence fails the withholding control.

Plainly: the controller waits for actual process and channel shutdown facts. The timeout test must identify the original timer, rather than merely a child with a familiar exit code.

Independent requirements were frozen before the corresponding implementation: `independent-repair-expectations-v1.md` (`7bfea6d900a111fa1ac27ccc0f625864d4e0ddc0187576dbed3aec55126264b3`), the source-derived integer-quantization addendum (`79ae5abad3f3ac5535e24862ffc93c2f497c73ade373872c0c48a47909157ef9`) and the finite observation schema (`d9a1c75a60ce833949072229841474d750289fb30784031f7f264d5e983d7f1a`). The addendum preserves the existing timer's fractional-millisecond truncation; it was written before timer implementation or real results. The old verifier remains byte-preserved. Its independent successor passed 22 authored predicate controls, including rejection of an unrelated early exit-125 record; these are reader tests, not substitutes for real processes.

## Exact source and runtime bindings

| Role | File | SHA-256 |
| --- | --- | --- |
| Repaired K | `launch-abc-enclosed-root-pilot.candidate-v2.mjs` | `932e29c8c972484d528ae69193b25da6e4c1780ca474529a84f36c7916358545` |
| Repaired C | `f6c-bounded-operation.candidate-v2.mjs` | `c70351aca5f22928b39dea521ef80fbecb81e35e1bd31e7ff3173804145b5934` |
| Metadata preparer | `prepare-real-ipc-control-v2.mjs` | `4ac94c2718aa45519d3c83f4e0a1e6d6e9133da402fc61d3f6cc5b7ac8df76ff` |
| Independent result verifier | `verify-real-ipc-control-v2.mjs` | `69a6f6c9a56d88684c0881e930c30aacb169c7b8d55dfae4f9c40a5478bdb7f9` |
| Independent closure auditor | `audit-real-ipc-closure-v2.mjs` | `e268c80562675578402620ddd190f6da976e0ec97a3ca65338a4c9702a0caac5` |
| Independent subject review | `independent-candidate-review-v2.md` | `12fd7acc5f89b274255b8a084a60298beede129578b28d4997662f0fd680edcd` |

Plainly: every actual invocation is tied to these exact source bytes. A later edit requires new review and cannot inherit these results.

No compiled scientific program was built or run. Controls use `/opt/homebrew/Cellar/node/26.3.0/bin/node`, SHA-256 `56694c81b093cc8da273fa017cf91765b3653e5f64f16727976ffaa87b2b6b31`, and `libnode.147.dylib`, `9f9751defe52e68e8140d622235bb1718824caf289d6fdb3e7bb5d5039f94148`. `node-runtime-source-observation-v1.json` retains fresh five-field filesystem identities. The installed `internal/child_process` source remains 31,824 bytes, hash `382cf63835f081ef300c9aa52b6ca84cc036fa0e81b77b79de7dc2c8d5b8f1c1`.

Canonical C/K/H remain `0e0f728b79f32c3a8c03021748902dca3b450fac6b450d73ce1868b32ae61228`, `18cc7d6a646d1bad55fbc02e3b8eb09223f7098c9940360998ad6a6a04e1d2c8` and `a327d1ed9d3d6a4017f41ecc4d67eafc5d03abfe4ac60a0844c2624ced8be1f9`. The private repair is not canonical promotion or a complete scientific invocation. Source archives preserve consumed generations before changes.

## Actual controls and invocation records

Each prepared case has `plan.json`, `preparation-v1.json`, `external-invocation-v1.json` and `independent-exact-admission-v1.md`. Only actually launched cases have fresh parent prelaunch observations and `actual-tool-records-v1.json`; accepted cases additionally retain independent result/closure tool records, `independent-closure-review-v1.md` and `parent-integration-v1.json`. The external invocation file contains the exact command and tool options. Actual packets preserve the original before/after UTC and monotonic clock tools and every untruncated command/poll result. No reconstructed or illustrative invocation replaces those records.

| Case directory | Exact plan SHA-256 | Current disposition |
| --- | --- | --- |
| `disconnect-before-payload-v1` | `15517bf343a4881d0e9f3b8af7f8c1e8d65b5aef87216e33f8244cfbd37cf3d4` | Accepted; external exit 1 in 4.847925 s |
| `exit-after-ack-before-start-v1` | `8f33dbde1caa03574779bb5874bab67612251c8ca074c050cb26b1a43728af5f` | Accepted; external exit 1 in 6.169180084 s |
| `withhold-payload-v1` | `8a5c0ed51a366429b8d2510f6b47e3fba49279cf915a7983397b856c691269dc` | Accepted; external exit 1 in 13.887938458 s |
| `positive-tiny-v1` | `fe006cdc705cdf6a3d45eca888cb5809287963321d95e37eaf2b9c9b22f8256e` | Accepted; external exit 0 in 5.223968083 s |
| `positive-large-v1` | `9a9a807cc65b6c8bd4db55ed27701e49ae864193be1075d5862d14ce30c84658` | Accepted; external exit 0 in 8.574729958 s |

Plainly: rejection is the expected result for each deliberately interrupted operation. Independent acceptance means that the required failure was actually observed and safely closed; it never changes the operation into a scientific success.

Each actual interval used separate immediate quiescence acknowledgments from the phase-varying display representative and benchmark owners and their active reviewers, plus the local independent reviewer. Process-creating metadata was held only through the actual interval and released at the observed terminal boundary; numerical work did not inherit admission. Idle holds were released when a peer acknowledgment was unavailable. No future compute reservation is created by these acknowledgments.

The disconnected-send control retained the actual native `ERR_IPC_CHANNEL_CLOSED` callback after the sticky first failure, actual child exit 125, both stream closures and IPC disconnect, with **aggregate close absent**. Its final composed completion was at 599.646958 ms of the original controller clock. The early-exit control retained successful payload delivery, authenticated group SIGTERM before startup, actual null/SIGTERM exit and all four closure observations; aggregate close was present and recorded later. This measured difference supports the source explanation for the missing aggregate notification. The old failed run's missing callback trace and the sender of its exit 137 remain unestablished.

Withholding retained the authenticated original timer event after **10,001.473750 ms** of child time. Its recorded scheduled delay was 9,999 ms, exactly the unchanged integer-floor expression; the parent received the event before actual child exit 125. No payload or startup send occurred, both output logs were empty, and independent result/closure review plus parent integration passed. An unrelated early exit 125 cannot satisfy the frozen timer/header/clock predicates.

Plainly: the negative controls identify their distinct intended causes, retain actual exit/channel evidence, and close normally. The earlier failed attempt remains rejected.

The tiny and large positives each executed their independently declared literal once, producing exactly seven stdout bytes (`IPC_OK` plus LF) and empty stderr. Actual payload/argv sizes were 3,672/8,688 bytes and 83,679/8,692 bytes respectively. Both retained successful native payload and startup callbacks, actual child exit 0 with no signal, all four lifecycle observations, and no timeout. The 60,039-byte large source's base64 body alone is 80,052 bytes, exceeding the 65,536-byte argv cap; it now crosses IPC within the unchanged 1-MiB payload limit. Literal fixture hashes and full identities remain in each plan and preparation receipt.

Plainly: ordinary small and large messages still execute correctly after the repair. These are transport fixtures, not numerical calculations.

## Scientific restart and architecture decision

Accepted conditional causal cover remains all 160 original intervals. Independently accepted emission refinement and integrated acceleration/mismatch remain original intervals **0, 1 and 2**. No new interval is accepted here. The remaining 157 intervals, required refinements, complete three-setting accuracy, whole-history average/worst mismatch and measured whole-history costs remain open. None of these conditional diagnostics establishes balance, retention, stability or a persistent braid.

The exact next declared batch is original parents **[3,4,5]**, serially, at the original first accuracy setting. `restart-scope-and-admission.md` records the unchanged geometry, `c_f=1`, literal interval/time tokens, numerical settings, frozen mathematical references and fresh source checks. The old prepared batch `42589bc128c93e9a9cd2da5f0176afe25075d6c015cbe23bf7dc1961f4b7206f` and retained-three audit plan `cff694044f16ff42406c0bb81b2171020914e40627def46b1138e0adbe9d9dd8` are not admitted current commands.

Source inspection found a concrete downstream contract mismatch: current C publishes conditional completion pending independently observed terminal closure, whereas the parent issuer/closure consumers and frozen segment audit require the historical full-completion record. The segment audit's checks at lines 688–705 cannot accept new C output by replacing hashes or fabricating old closure flags. Historical mathematical checks remain unchanged. Parent preparation also retains obsolete C/K pins and historical-source/accounting requirements. Matching bytes across the recorded filesystem-device boundary does not restore old identity authority.

Plainly: fixing shutdown does not yet give the science pipeline a compatible, independently checked completion record. Running an old command or rewriting its success flags would bypass the acceptance boundary.

The named remaining reservations alone total **84 minutes after operational acceptance**: 120+600 seconds for the 49 stage controls, 120+600 seconds for the retained-three audit, up to 1,800 seconds for the six parent producer/comparison stages with original-deadline issuance/cleanup, and up to 1,800 seconds for streamed evaluation. This excludes unfinished migration, affected controls, preparation and final handoff; no complete admitted worst-case schedule currently exists. These are declared reservations, not measured scientific costs.

At the last operational integration, only **4,716.398 seconds (78 minutes 36.398 seconds)** remained before the hard stop, already less than those 5,040 seconds without any migration allowance. Thus the complete declared sequence could not fit even before resolving the source-level incompatibility. No partial refinement was launched as a substitute for accepted integrated coverage.

The concrete architecture reassessment is to reconcile **one existing operational completion contract** across C and its current consumers, keeping arithmetic/provenance separate from independently observed terminal closure. Preserve historical records and frozen mathematics, migrate affected consumers with independently justified expectations, and validate the existing common invocation. Do not add another maintained supervisor, interval-specific exception or fabricated legacy record. Transport controls alone do not justify a longer whole-history campaign.

## Accounting and terminal boundary

The unchanged case bounds are 75 seconds K work, 90 seconds ordinary completion and 120 seconds total cleanup, followed by at most 600 seconds of independent external closure before the hard task stop. The 2-GiB RSS limit, 250-ms target/1,000-ms maximum sample gap, 64-MiB scientific/16-MiB log limits, source/path caps and host/disk floors remain unchanged. The independent verifier reads C's resource journal; the independent closure auditor performs fresh process-table and signal-zero checks. Parent integration rechecks sources, aliases, retained files, combined storage and lock absence before the original external deadline.

| Accepted control | RSS samples / peak bytes | Maximum recorded gap (ms) | Final case files / logical bytes / allocated bytes | Recorded absent PIDs / groups | Parent integration after actual exit (s) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Disconnected send | 13 / 161660928 | 322.238458 | 17 / 750815 / 778240 | 16 / 2 | 150.948 |
| Early child exit | 15 / 165363712 | 335.789958 | 17 / 935669 / 966656 | 18 / 2 | 70.028 |
| Withheld payload | 53 / 184500224 | 335.061625 | 16 / 812714 / 847872 | 56 / 2 | 91.999 |
| Tiny positive | 13 / 167198720 | 331.113708 | 16 / 823851 / 860160 | 17 / 2 | 206.078 |
| Large positive | 13 / 163168256 | 319.861375 | 16 / 818502 / 856064 | 17 / 2 | 75.695 |

Plainly: measured control costs fit their limits. These sampled peaks are not continuous maxima or forecasts of whole-history scientific cost.

Each accepted case also charges six declared prior artifacts totaling 34,216 bytes outside its case directory. Parent integration conservatively charges every retained case and prior byte against the stricter 16-MiB log cap, including publication reserve, so the looser scientific cap also holds. Allocated bytes are filesystem block counts, not physical exclusive storage or deduplication measurements. Raw packets preserve the conservative tool-launch-to-observed-exit interval; pre-entry OS scheduling and interpreter overhead have no stronger suspension guarantee. RSS sampling starts within the guarded controller and does not cover all pre-entry tool overhead.

Fresh per-case closure audits found no recorded PID, child of a recorded PID, or member of a recorded group; all corresponding signal-zero checks returned `ESRCH`. Missing historical birth identities remain explicitly recorded: 78525, 79038, 80373, 80971/80984, and 82488/82502 respectively. These observations do not prove absence of never-observed detached descendants. The first closure audit's sandbox `EPERM` is preserved as a failed metadata attempt; only its exact escalated successor supplied acceptance. No actual case was repeated or retroactively accepted by that retry. Later terminal metadata reauthentication does not renew expired original acceptance windows.

Plainly: the receipt says exactly which processes were checked and where the instrument has no coverage; it does not turn partial process observation into a universal machine-wide claim.

At **2026-08-28T23:20:25.047Z**, `terminal-metadata-v1.json` (`c9b061defd420d63f4ed2bdcd03354238cf65b5fc0fdebe43bc25b7117e83b60`) freshly reauthenticated all original control source/plan/alias generations, consumed predecessor archives and historical review bindings. A bounded two-second process-table probe and 134 signal-zero checks found all **124 distinct recorded PIDs and 10 groups** absent; the shared lock remained absent. This is a fresh terminal observation, not a rerun of expired acceptance. Exact metadata command and actual exit-0 tool object are in `terminal-metadata-tool-v1.json`.

Before publishing that receipt, the complete repair directory held **150 files in 29 directories, 6,764,439 logical bytes and 7,053,312 allocated bytes**. This includes source copies, preserved failed evidence, five case directories and external review records, not just the subjects' output trees. A 1-MiB reserve covers terminal metadata, final independent review and seal; their actual additional sizes and final path list are accounted in `final-seal-v1.json`. The elapsed task time to this terminal observation was 41 minutes 45.047 seconds, including source work, reviews and coordination; final documentation time is recorded by the seal. No task-wide continuous CPU/RSS measurement or whole-history cost was made.

Plainly: the terminal record covers the entire new evidence directory and names the remaining publication overhead. Source checks confirm preserved bytes, not renewed permission to execute old commands.

## Changed paths and final review

Scoped tracked addition: this handoff. Private changes are confined to the single ignored repair directory. No canonical C/K/H, EOM, mathematical reference, shared readiness or prior handoff was edited; no commit, push, unrelated regeneration or evidence deletion occurred.

The private executable changes are the two candidate subjects, the metadata preparer, the independently owned result-verifier and closure-auditor successors, and the independent predicate/prelaunch checks. The unchanged literal fixtures and hook are copied evidence. Frozen requirements, source reviews, raw controls, preservation archives, restart assessment and terminal records are supporting artifacts. `terminal-metadata-v1.json` inventories their exact paths/hashes/identities; `final-seal-v1.json` adds final publication files and binds this handoff plus `independent-handoff-final-review-v1.md`. No ignored path is presented as a public web link.

Closure goal: Preserve the independently accepted five-control repair and the exact unadmitted [3,4,5] restart; reconcile the existing completion contract before seeking a new scientific execution window. The broader whole-history goal remains open.
