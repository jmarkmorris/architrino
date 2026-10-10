# Dynamics preservation and execution audit

## Scope and disposition

This is a measured preservation checkpoint for the spherical 3:3 dynamics worker, not campaign completion or a new scientific adjudication. The receiving owner is the coordinator, which owns [the synthesis](spherical-three-three-synthesis.md). Scientific verdicts remain at their separately recorded grades; in particular this audit does not accept the pending six-cell prepared-hexagon proof.

Audit completed October 10, 2026; the final clock check returned `2026-10-10 05:32:12 UTC`. Repository-relative paths below resolve under `/Users/markmorris/vibe/architrino`.

The audit used existing filesystem, Git, session-log and supervisor inspection commands only. It did not rerun any scientific instrument, regenerate output, create a new instrument, signal a process or alter a lease. The [retention owner](../../../../op/machine-artifact-retention.md) requires preserving evidence when practical regeneration is unverified, and distinguishes accepted local retention from independently backed-up preservation.

Measured inventory by scoped `rg --files`, `ls -la`, `wc -lc` and `shasum -a 256`: six prior dynamics analysis files, twelve evidence/source files and six retained local runtime files are present and readable. The six local files total 26,335,926 bytes and 994,310 physical lines. The eighteen durable-path files total 159,856 bytes and 2,364 lines, before adding this audit. These are logical file sizes, not allocated storage measurements. No file is relocated or deleted.

Measured Git status: `git ls-files` returned no paths for the eighteen dynamics analysis/evidence subjects, and `git --no-optional-locks status --short` reported each as `??`. They occupy intended durable repository paths but are not yet tracked. `git check-ignore` reported all six local runtime paths as ignored. No Git publication, remote preservation or independent backup is claimed. The designated publication runner, when separately authorized, owns eventual staging and publication; the coordinator owns the present capture account.

## Exact artifact receipt

All paths in the first two tables are relative to this research owner's `analysis/` or `evidence/` directories. The common filename prefix is `spherical-three-three-dynamics`; the suffix column appends to that prefix. Hashes are SHA-256 measured during this audit. The line and byte counts are `wc -lc` results.

| Analysis suffix | Lines | Bytes | SHA-256 |
| --- | --- | --- | --- |
| `.md` | 504 | 56324 | `8d9bf403fac2fb076880e8300382740330df360028e99db3900a88fdafd752a7` |
| `-small-direction-review.md` | 131 | 12797 | `06dd37166d37033b9be61e766b67966386b777950e11dd4da5af50b6b1a78744` |
| `-rotating-hexagon.md` | 154 | 9270 | `b0948c700dfeb0872e7f4f0785d37b896d492be9b4fcde47258467566c785640` |
| `-first-incoming-review.md` | 108 | 12293 | `8da60171f9f89058e06cc8362d39e4239381ba5e085360d0aca76ab576ec3a9b` |
| `-normal-support-transition.md` | 196 | 11320 | `241329c6e1218a5124ec5844d247ec698821d8982deb70731a9bc8cad937c3e8` |
| `-prepared-hexagon-six-cells.md` | 187 | 11949 | `bef27cca3446e1af42394542b0801df673b956b84bbd0537bdeeb9547fe6aab7` |

| Evidence suffix | Lines | Bytes | SHA-256 |
| --- | --- | --- | --- |
| `-diagnostic.mjs` | 96 | 5866 | `b8ad44d6f6d8ad15be33c4574e358edd5c5d89c55a4a13b3a83acf4ae1890fde` |
| `-mean-check.mjs` | 27 | 1410 | `2bb03ef1594ab14754e7ea1acf019310c2c490a71892aaeaa4e089c9411eea33` |
| `-shifted.mjs` | 97 | 6166 | `8665e80b4971a0d003aaad4cf2a2eabed7072e9f7ca98d997010fd7f907778fb` |
| `-superfield-roots.mjs` | 66 | 3673 | `73f65040e65dcefafdbe26010bff2fb7d5353c3a60a956963acb7c1885889a4b` |
| `-superfield-root-bounds.json` | 82 | 1827 | `6f7a145f62cb64d563edae86948733d67002598dadf72e4bdb46e2ab821c78aa` |
| `-phase-zero-superfield.mjs` | 55 | 3036 | `483f4b51cab873dfc4410d772977c9660f86038e1914d97b4e25deeb383efdf6` |
| `-phase-zero-superfield-target.jsonl` | 2 | 1576 | `f3e11793725b4c601d174a3d340e3d8597d6d961fa2cd5c96ec6ab1fa80b298f` |
| `-phase-zero-superfield-profile.txt` | 2 | 106 | `3cfc5ca6ae010f01a41f8b72e867bf447d9c22c6cd5d0073296fad7ad4eadbc1` |
| `-radius-map.mjs` | 29 | 2767 | `9bdea9b677b560ce30bc9af49ad656754b63e8e08c5fe886c95efa6411cc8ae0` |
| `-radius-map.json` | 488 | 13952 | `a180686c4924a5c742f220091340324bf56b0d6c669885344c6c566f8ab4991d` |
| `-fold-local.mjs` | 72 | 4126 | `a5889a5b53a35959a051cea98b4abf902774fc2239ee52c3e15d97387bb19096` |
| `-fold-local.json` | 68 | 1398 | `ce4d02b7f9df0988912f062a052f0ee57f02caa2854be21d7190ec8f3d837fda` |

The local runtime directory is `.local-data/master-equation-closure/spherical-three-three/dynamics/`, relative to the repository root. The following are full basenames within that directory.

| Runtime basename | Lines | Bytes | SHA-256 |
| --- | --- | --- | --- |
| `subfield-48.json` | 14817 | 393936 | `473098dbea806b70545f7058ed535f4c3fc9ad142c291e382b3208d167fb0af8` |
| `subfield-192.json` | 56289 | 1491275 | `e65b8083f50287b8c8021470e13bf03e7d0b723a57a5a5c664db13e756fb59ef` |
| `subfield-768.json` | 222177 | 5879897 | `b36c2d606238667a9202779a8c9282adc2834b53daa20ec9561814b4b5cae44b` |
| `shifted-96.json` | 143147 | 3801465 | `3dea8dc79ff11e905034b2e98315bb306e96f88389555eaab6f824dd0a4d5156` |
| `shifted-384.json` | 557867 | 14760269 | `5fd43bb039ab40faff94f4a86ee3c87266a82fb455631833f0f7e9349b50b4fd` |
| `radius-map-log.jsonl` | 13 | 9084 | `0621a675c2fc99f592a3d4b5b7ff4e3dcef92989e73fa64aa9fbf19c40c3fc21` |

The large local JSON files retain complete prescribed-history sample rows, not merely their summaries. Their scale exceeds ordinary line thresholds and the largest exceeds 10 MiB; the present disposition is keep in the established ignored owner. Size does not authorize deletion or force-adding. These payloads preserve numerical samples and root ledgers for the synchronized and shifted circle families, not actual evolved trajectories. The radius map combines sampled sub-wake histories and one admitted super-wake event; the distinction remains in its payload and main report.

Retrieval is local: read the stated path from the repository root and rerun `shasum -a 256` against the corresponding receipt. No remote retrieval path was established. The main analysis records the scientific limitations and controls; the sources above identify the producing versions. This receipt does not replace any payload.

## Reproduction recipes and practical limits

The following commands are recipes only; none ran in this audit. Execute from the repository root. `EVID` below denotes `reference/priorities/master-equation-closure/noether-sea-research/evidence`; `REPLAY` must be a new task-scoped scratch directory, never an original output path. Existing controls must pass before targets. Each instrument also runs its controls internally before its target. A future authorized replay must retain its own profile and compare stable scientific fields, not volatile timing or memory fields.

```bash
node "$EVID/spherical-three-three-dynamics-diagnostic.mjs" controls
node --max-old-space-size=256 "$EVID/spherical-three-three-dynamics-diagnostic.mjs" target 48 "$REPLAY/subfield-48.json"
node --max-old-space-size=256 "$EVID/spherical-three-three-dynamics-diagnostic.mjs" target 192 "$REPLAY/subfield-192.json"
node --max-old-space-size=256 "$EVID/spherical-three-three-dynamics-diagnostic.mjs" target 768 "$REPLAY/subfield-768.json"
node "$EVID/spherical-three-three-dynamics-mean-check.mjs" "$REPLAY/subfield-768.json"
node "$EVID/spherical-three-three-dynamics-shifted.mjs" controls
node --max-old-space-size=256 "$EVID/spherical-three-three-dynamics-shifted.mjs" target 96 "$REPLAY/shifted-96.json"
node --max-old-space-size=256 "$EVID/spherical-three-three-dynamics-shifted.mjs" target 384 "$REPLAY/shifted-384.json"
node "$EVID/spherical-three-three-dynamics-superfield-roots.mjs" controls
node --max-old-space-size=256 "$EVID/spherical-three-three-dynamics-superfield-roots.mjs" target "$REPLAY/superfield-root-bounds.json"
node "$EVID/spherical-three-three-dynamics-phase-zero-superfield.mjs" controls
node --max-old-space-size=256 "$EVID/spherical-three-three-dynamics-phase-zero-superfield.mjs" target reviewed-admission
node "$EVID/spherical-three-three-dynamics-fold-local.mjs" controls
node --max-old-space-size=256 "$EVID/spherical-three-three-dynamics-fold-local.mjs" target "$REPLAY/fold-local.json"
```

The phase-zero token records the required prior admission verdict; it is not permission to skip that verdict. Its original target stdout is the retained two-line JSONL. The original profiled invocation was `/usr/bin/time -l node --max-old-space-size=256 .../spherical-three-three-dynamics-phase-zero-superfield.mjs target reviewed-admission`, with stdout/stderr captured separately in the listed target/profile files.

The radius-map recipe is `node "$EVID/spherical-three-three-dynamics-radius-map.mjs"`. Inspection of that source shows hard-coded input paths to retained `subfield-768.json` and the durable phase-zero JSONL, and a hard-coded output path to the frozen radius-map JSON. **Do not replay it in the active checkout as written:** it overwrites the frozen output. A future separately authorized replay needs an isolated copied directory layout or a new companion with an explicit output destination while preserving the original instrument. This is a reproduction limitation, not authorization to modify it here.

Measured original cost from retained `wallSeconds`/`memory.rss` fields, read by `tail` and `rg`:

| Original run | Wall seconds | RSS bytes |
| --- | --- | --- |
| Subfield 48 | 0.04320325 | 63750144 |
| Subfield 192 | 0.162793958 | 68042752 |
| Subfield 768 | 0.606014625 | 80707584 |
| Shifted 96 | 0.399266667 | 90062848 |
| Shifted 384 | 1.59161925 | 115638272 |
| Superfield root certificate | 0.051048333 | 57737216 |
| Fold-local certificate | 0.035116084 | 54935552 |
| Phase-zero target | 0.05 from partial external profile | Unavailable |

These are observed first-run costs, not demonstrations of present regeneration cost or reliability. Dedicated mean-check and radius-map resource profiles were not retained. The partial phase-zero profile records denied `sysctl kern.clockrate`, so extended statistics are unavailable. No target was rerun to repair telemetry. Exact historical byte regeneration is not established, especially where wall-time or memory metadata is embedded. The original Node runtime version was not independently verified in this audit; the retained sources expose their imports and inputs. Scientific reproduction criteria and a controlled replay remain unverified in this audit. Preserve all originals by default.

## Execution and lease receipt

The own session is identified by `session_meta.payload.id=01a123e1-8247-75f2-b750-48066a679640`, not its inherited parent `session_id`. Its exact local log is `/Users/markmorris/.codex/sessions/2026/10/09/rollout-2026-10-09T23-35-43-01a123e1-8247-75f2-b750-48066a679640.jsonl`. A read-only `jq` projection of its existing `event_msg` / `CommandExecution` records selected commands containing `node` and the dynamics prefix. The scientific launch receipts were terminal:

| Execution | Terminal receipt ID | Recorded status |
| --- | --- | --- |
| Subfield controls | `exec-d59510a9-20d9-4470-b37c-1bb7c4bd9a34` | completed, 0 |
| Subfield 48 | `exec-f55facf2-8bce-4714-8e67-409ea6d9b268` | completed, 0 |
| Subfield 192 and 768, sequential shared shell | `exec-20802b7f-4ba8-4317-94e4-220ced5a14ce` | completed, shared-shell 0 |
| Mean check | `exec-7ee706ca-0d16-4159-89b9-e114232928b1` | completed, 0 |
| Shifted controls | `exec-cce31aab-a042-4090-bed8-b204fab0a2af` | completed, 0 |
| Shifted 96 | `exec-fce0c65d-ac5e-418a-98c3-a8b9f1ccf08f` | completed, 0 |
| Shifted 384 | `exec-e649dbde-6383-428e-9288-2f1a85da4cd1` | completed, 0 |
| Root controls | `exec-630b2437-377b-4325-9844-19a47299ea51` | completed, 0 |
| Root target | `exec-b62b1f41-ac7b-4d79-b6f8-cbdae9e78a59` | completed, 0 |
| Phase-zero controls | `exec-a2c3a7a3-884a-4020-846e-0aa91f2b15fd` | completed, 0 |
| Profiled phase-zero target | `exec-bc24077a-d83a-4f25-bce9-46fb8af70d3e` | wrapper failed, 1; complete target output retained |
| Radius map | `exec-30576099-dfe1-4e1d-bbe0-79e6bfce9470` | completed, 0 |
| Radius map stdout capture | `exec-c37e231f-e3ae-48e0-9d73-c538aaa0075b` | completed, 0 |
| Fold controls | `exec-080e5509-a3a4-4642-87e5-df6130d6021b` | completed, 0 |
| Fold target | `exec-4eb1129a-9e51-42d0-9e8e-23beedcc7c0e` | completed, 0 |

The sequential 192/768 receipt proves the foreground sequence terminated; it does not preserve a separate exit status for the 192 command. Both complete payloads remain present. Standalone controls and mean-check stdout remain in the session log and are summarized in the main analysis, rather than separate durable stdout files. This is a capture-format limitation, not missing source or target payload. Subsequent analytical slices launched no scientific jobs.

Following the [live supervisor owner](../../../../op/long-running-test-heartbeats.md), `node scripts/dev/owned-compute-supervisor.mjs list --active` was attempted before process-table inspection. It failed with `spawn EPERM` while trying to obtain process identity. A subsequent scoped `ps -axo pid,ppid,stat,etime,command` query was denied with `Operation not permitted`. Thus this audit cannot independently certify current process-table liveness or global idleness.

Read-only `rg -l '01a123e1-8247-75f2-b750-48066a679640|spherical-three-three-dynamics' .local-data/owned-compute -g '*.json'` returned no matches. This establishes no matching lease JSON in that searched local scope; it does not exclude unleased processes or unrelated campaign workers. The owned scientific executions have terminal historical receipts above, and no owned live lease was identified. No unrelated process or record was touched. If a fresh live census is required, the coordinator should perform the scoped supervisor/process check in an environment permitted to inspect process identities. The sandbox limitation is the outstanding operational verification dependency, not a claim that a job is running.

**Separate coordinator recovery, reported by the coordinator after the worker check:** the coordinator reproduced the sandbox `spawn EPERM`, then an automatically approved escalated read-only supervisor retry exited zero. Its displayed output contained unrelated legacy identity-uncertain records and was truncated; the coordinator made no global-idleness claim. The coordinator also reported no matches from a raw lease-JSON search for the exact root/three-worker IDs or the dynamics/review instrument prefixes. No process or lease record was changed. This is attributed recovery evidence, not a worker-run successful census. The worker has not repeated that supervisor call, and the original denial remains preserved above.

## Capture gaps and receiving owner

No expected target payload or source in this dynamics inventory is missing by the named filesystem/hash checks. The following limitations remain explicit: ignored local files have no verified independent backup; the intended durable files are currently untracked; exact-byte/practical regeneration has not been demonstrated; mean-check and radius-map resource cost is unmeasured; phase-zero peak-memory telemetry is unavailable; some stdout and individual compound-command statuses exist only in the session record; and current live process census is blocked by sandbox permissions. The coordinator receives these limitations with the intact payloads and exact hashes. They do not authorize deletion, recreation, forced tracking or a new scientific run.

This audit completes only the requested bounded preservation task. It does not declare campaign completion or change any independent verdict. The sole newly authored file is this dynamics-prefixed companion. All original files in the receipt remain preserved, and no regeneration or cleanup is pending from an action taken here.

Final document validation: `git diff --no-index --check /dev/null` on this companion emitted no whitespace diagnostics; exit 1 records the new-file difference. The inventory, counts and hashes above came from successful built-in file commands, while the two failed live process checks and coordinator recovery are separately stated. No scientific check was rerun as part of this receipt.
