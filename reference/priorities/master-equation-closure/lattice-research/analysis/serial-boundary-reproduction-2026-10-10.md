# Current-source reproduction of the older lattice boundary certificate (serial task 2, 2026-10-10)

This report answers the queued request to [restore current-source lattice boundary reproducibility](../work-queue.md#restore-current-source-lattice-boundary-reproducibility). The certificate concerned is the [first environmental class boundary](smooth-two-particle-first-class-boundary.md): under the unchanged canonical Master Equation, on the infinite alternating cubic lattice with its stationary eight-source prescription, the two original smooth supplied past pulses, $g=16$ and numerical $c_f=1$, some environmental architrino's displacement reaches the ceiling $1/16$ shortly after $t=5$. The proof compares the actual stopped motion with two auxiliary quadratic curves on $[5,81/16]$, using incoming accepted histories through $17/4$. Those curves are comparison objects; no trajectory is evolved here and nothing after the boundary is claimed. This certificate is distinct from the later wake-speed event replayed in [the field and residual replay](lattice-field-residual-replay-2026-10-10.md).

## 1. Result

**The original bracket is reproduced from the current source: $5121/1024<\tau\le10339/2048$.** The selected residual, the three reference checks and the upstream history endpoint audit were each run again into a fresh owner, known cases first, and each agrees with its frozen receipt in every scientific field. **Grade: measured**, by the preserved instruments under the execution adaptations listed in Section 3, with exact field-by-field comparison whose known cases passed first.

The subject-byte mismatch that prompted this task has a specific cause, and it is not a change to the calculation. The frozen receipt names subject SHA-256 `70910da2…f771`; the live file is `b255840a…1f18`. The live file differs from the Git blob with the frozen hash on exactly one line, `ROOT=HERE.parents[3]` against `ROOT=HERE.parents[4]`, introduced when commit `308002c7b` moved the file one directory deeper. **Grade: measured** by `git show` of the pre-move blob, its SHA-256, and a line comparison; Section 2 gives the evidence.

The reproduction is repeatable: a separate replay driver has since reproduced the same result twice more, each into its own new owner, with the first replay's receipts and the frozen evidence verified unchanged afterwards (Section 11).

Two limits apply. The event reference reads the residual as a shared input, so this is a reproduction and not an independent evaluation of the residual; Section 5 gives the component verdict and leaves the stronger claim open. And the versioned references built here are execution adaptations of the preserved references, not newly authored ones.

## 2. The subject's byte transition

The frozen adjudication and receipt record the subject as `70910da20bf40921f8ef847063ac2652ae36ae765877102edd31dc7f0215f771`. The live file `smooth-two-particle-first-class-boundary-selected-certificate.py` has `b255840a827d029b889072d550f51420c2492c4d06f6991746a8e1b0680d1f18`. The file's history, by `git log --follow` and by hashing each version, has two states:

| Commit | Path | SHA-256 |
| --- | --- | --- |
| `9cd74b05c` (2026-09-26) | `master-equation-closure/analysis/` | `70910da2…f771`, the frozen value |
| `308002c7b` (2026-09-30) | `master-equation-closure/lattice-research/analysis/` | `b255840a…1f18`, the live value |

A `diff` of the first against the live file reports one changed line, line 15, the root index. The file sits one directory deeper, so `parents[4]` from the new location names the same repository root that `parents[3]` named from the old one. The expectation that changed is therefore the file's location, and the first mismatching state is the move commit itself. This was established by inspecting the two blobs and not from the commit's subject line or from which commit touched the file last.

The same holds for every analysis module the subject loads. The replay driver authenticates each loaded module against its pre-move Git blob and refuses any difference other than that one root-index line; nine modules were loaded and all nine passed, each with exactly one such line. The subject's pre-move blob was additionally required to have the frozen SHA-256.

The preserved event reference cannot be executed against the current source, for two reasons that concern identity and location and not results. It reads the subject from its pre-move path, which no longer exists. And it requires the residual receipt's recorded subject identity to equal the hash of the subject file it reads; the frozen receipt records the pre-move hash, while the only subject file now present has the live hash, so the frozen receipt and the current source cannot both satisfy that assertion. These two are the execution and reproduction barriers.

A third feature of that file is not a barrier. It writes one archive identity as a string with a replacement applied. That expression is valid and evaluates to `b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988`, the archive's actual SHA-256; the equality is a known case of the build drivers. It is a readability defect only. The preserved file keeps the original expression and was not edited; the versioned references write the literal.

## 3. Method and execution adaptations

Each instrument ran its analytical known cases first and stopped before its target unless they passed. Frozen subjects, references, inputs and receipts were never written: a SHA-256 listing of all 41 files under `.local-data/master-equation-closure/first-class-boundary/` taken before the first run is byte-identical to one taken after the last, by `cmp`.

| Driver | What it runs | Execution adaptations |
| --- | --- | --- |
| [Residual driver](../evidence/serial-boundary-residual-2026-10-10.py) | The live subject, loaded whole | Output directory redirected; analysis modules served from their moved location after the one-line authentication |
| [Reference build driver](../evidence/serial-boundary-reference-build-2026-10-10.py) | Builds three versioned references from the preserved ones | Exact substitutions, each required to match once: fresh output directory; current subject path; fresh residual path; the archive identity written as a full literal; the retained copy of an earlier error receipt in place of its scratch path; asserted full literal SHA-256 values for every consumed input |
| [History endpoint driver](../evidence/serial-boundary-history-endpoint-2026-10-10.py) | The preserved history endpoint audit | Output directory redirected; the adjudication document it hash-checks read from its moved location, with the instrument's own literal hash assertion unchanged and passing; the nested frozen audit's analysis directory repointed after authentication |
| [Comparison driver](../evidence/serial-boundary-compare-2026-10-10.py) | Field-by-field comparison with the frozen receipts | None; reads only |

The versioned references are [stationary domain](../evidence/serial-boundary-stationary-domain-v2-2026-10-10.py), [stopped reference](../evidence/serial-boundary-stopped-reference-v2-2026-10-10.py) and [event reference](../evidence/serial-boundary-event-reference-v2-2026-10-10.py). Each carries a header naming the preserved file and its SHA-256. Their mathematical arithmetic is unchanged: no formula, constant, bound or comparison in any function was altered. Their executable text is not literally unchanged. Paths and output routing differ; the stopped reference gains literal input guards at module level; and the event reference's `target` function gains a loop at its start that checks a literal SHA-256 for each consumed input before the original statements run. The retained adaptation diffs show 3, 8 and 15 changed lines respectively and are the exact record of these differences. **They are execution adaptations of the preserved references and were not independently authored**; whatever independence they have from the subject is that of the preserved references.

The comparison declares in advance, per document, the fields that must differ: source identities, timers, the paths and hashes of receipts that carry those, and, for the history audit, the identity its nested audit records for the relocated interval module. That last field has the module's pre-move hash in the frozen receipt and its moved hash in a fresh one; the relocation helper authenticates the pair independently. The first history driver's opening description names only the timer; its code and Section 4 give both. A difference in a declared field is listed as metadata and never counted as agreement; any other difference is scientific. Its known cases include a one-unit-in-the-last-place float change, a missing key, an unequal list length, and a field whose name merely begins with a declared name.

## 4. Coverage

| Component | Instrument (SHA-256) | Known cases | Target | Fresh against frozen |
| --- | --- | --- | --- | --- |
| Selected residual, 32 cells on $[5,81/16]$ | Live subject (`b255840a`) | PASS, five controls, including the inherited through-five controls | Completed, exit 0 | 0 scientific differences; declared: two source identities and the timer |
| Stationary comparison domain, radius $3/40$ | Versioned stationary domain (`f3ce8aa0`) | PASS | PASS | Identical |
| Stopped-law bounds, 1278 points | Versioned stopped reference (`91ada742`) | PASS, five controls | PASS | 0 scientific differences; declared: the routed input path and the instrument identity |
| Event bracket and margins | Versioned event reference (`acd0b586`) | PASS, four controls | PASS | 0 scientific differences; declared: four identities |
| History endpoint audit, 1350 rows | Preserved audit (`509ce04b`) | PASS, five controls | PASS | 0 scientific differences; declared: the timer and one relocated module identity |

**Residual.** Thirty-two contiguous cells of width $1/512$ cover $[5,81/16]$. The per-receiver residual bounds are $0.025802910320095154$ at $(-1,0,0)$ and $0.1159371970783429$ at $(1,0,0)$, identical to the frozen values, as are all 32 cells' residual and remainder entries. The source census is 836 source points and 328 selected relationships. The latest emission read is $4.133044001359673$, below the admitted source cut and below $17/4$. The comparison curves stay inside radius $3/40$: the largest comparison position norm is $0.0687$.

**Bracket and margins**, from the versioned event reference on the fresh residual:

| Statement | Value | Against |
| --- | --- | --- |
| No environmental exit through $5121/1024$: upper bound on every environmental position | $0.06247922174669456$ | Ceiling $1/16=0.0625$ |
| Forced exit by $10339/2048$: lower bound on the witness's vertical position at $81/16$, at $(-1,0,0)$ | $0.06442299062249991$ | Ceiling $0.0625$ |
| Target at $(1,0,0)$ keeps rising: vertical velocity lower bound | $0.0975220255575487$ | Zero |
| Target vertical acceleration lower bound | $0.13235810261576156$ | Zero |
| Target radius upper bound on the interval | $0.057140975412902126$ | Ceiling $0.0625$ |
| Global stopped speed upper bound | $0.381302217474868$ | $1/2$ |

The first margin is about $2\times10^{-5}$ and is the tightest in the certificate. The reference's rounded-up coefficients are $(20,17/200)$ for the witness and $(38,9/50)$ for the target, as in the frozen receipt.

**History endpoint.** The preserved audit reproduces all 1350 endpoint rows and its focus, reflection, first-front and tail entries. Its first run under this driver reported one scientific difference, because the driver had not declared the field in which the nested audit records the interval module's identity; the frozen value is that module's pre-move hash and the fresh value its moved hash. The field was then declared, with the reason in the driver, and the first receipt is retained beside the final one. No endpoint value differed in either run.

## 5. Component verdict: what is shared and what is independent

The event reference is separately authored and uses exact rational arithmetic, but it is not a second evaluator of the residual. It reads the subject's residual receipt. The division is:

| Component | Standing |
| --- | --- |
| The 32 per-cell residual bounds | **Shared input.** Computed only by the subject. Reproduced here; not independently evaluated |
| The selected relationship list | **Independently reconciled.** The reference rebuilds the 328 relationships from the points and source cuts by its own rule and requires equality with the subject's list |
| Cell coverage and maxima | **Independently reconciled.** The reference checks 32 contiguous cells of width $1/512$ ending at $81/16$, and that each per-receiver bound is the maximum over cells |
| Endpoint jets at $t=5$ | **Independently reconciled.** Read from the archive and required equal to both the subject's receipt and the history endpoint record; the subject's endpoint enclosures must contain the exact rational quadratic values |
| Stopped-law coefficients and global bounds | **Independent of the subject.** The stopped reference imports nothing from the subject and uses exact rationals |
| Stationary constants on the comparison radius | **Independent of the subject.** Exact rational bounds, both below the constants the subject uses |
| Propagation to the bracket | **Independent arithmetic on a shared input.** Exact rational positive-series kernels with rounded-up coefficients; the residual enters as the forcing |
| Accepted endpoint errors | **Accepted earlier input.** Reproduced by the history audit here; their own derivation belongs to the through-five record and was not recomputed |

**This report does not claim independently recomputed residual bounds.** No cell was reconstructed by separately derived mathematics. That stronger verification remains open, as the queue entry already says. A reproduction of a shared input shows that it is deterministic and that its inputs are intact; it does not show that the residual construction is correct.

## 6. Receipts

Runs used the shared project environment (`../.venv`, Python 3.13.2) with owner task `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`. Fresh outputs are under `.local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10/`, in `selected-check/`, `reference/`, `history/`, `reference-build/` and `retention/`, with `compare.json` and a `receipts.sha256` listing of 43 files. This is ignored local storage, not a separate backup.

| Run | How it ran | Wall seconds | Exit |
| --- | --- | ---: | ---: |
| Residual target | Supervised, run `127d3b39-9dc6-4f94-b587-6621c1317be1`, process group closed | 6.209 | 0 |
| Stationary-domain target, first attempt | Supervised, run `9100423a-0c6c-4f81-9eed-58eae08b4285`; the lease records completion and a closed group, but the supervisor's launch command exited 1 reporting that it timed out waiting for the job to start | 0.033 | 0 by the lease |
| Stationary-domain, stopped and event targets | Run directly, not supervised | not timed individually; about 16 for the three together, by the clock readings before and after | 0 |
| History endpoint replay | Run directly, with a 180-second alarm inside the driver | about 1 | 0 |

What was observed is this: the launch command exited 1 with that message, while the lease for the same run records a completed job of 0.033 seconds with exit 0 and a closed process group. The cause was not investigated and no race is asserted. After it, the remaining reference targets were run directly. The stationary-domain target therefore ran twice and produced the same receipt.

**Correction.** An earlier version of this table gave the three direct reference targets as "under 1" second each and called them sub-second. That was not measured and is wrong for one of them: in the two later supervised replays the stopped-reference target took 15.339 and 16.360 seconds. The stationary and event targets took under 1.1 seconds. No conclusion depended on the figure, but a 15-second job should have run under supervision, and in the replays of Section 11 it does. The supervisor's closeout for the owner task reports `clear`. Redacted statuses for both supervised runs, the closeout, the run logs and both preservation listings are in `retention/`. Aggregate cost was not profiled.

Key hashes: fresh residual `e4c019f5f2f8172b9ed8064c6340cb9f758a81cbc152e6954093ace37fdfaa15`; fresh stopped target `beb85950aead9706534fe57f2dbb7d48df672c7f3572568d886ed851e78be7de`; fresh event target `7e234760c37241a2d4635e0db7b6d09bceb50cb15094b6c1a5c88d7195c68528`; fresh stationary target `080e1171d54208f74ed6a3b3ba01cf5e27132b686acf3efce88e861f87745e41`, equal to the frozen one; comparison `d42a3876da2d21b6ed145fbd1021948c5f2934a348def7a2a2d68295d94fe99d`. The fresh residual's hash differs from the frozen one because it records the live source identity and a new timer. The versioned event reference asserts that hash as a literal, so it is bound to this run's residual; a new residual run changes the timer and requires rebuilding the event reference.

## 7. Reproduction and verification

A new reproduction and a check of existing receipts are different commands. Both run from the repository root.

**A new reproduction.** The [replay driver](../evidence/serial-boundary-replay-2026-10-10.py) writes a complete reproduction into a new owner, `.local-data/master-equation-closure/serial-boundary-replays/<label>/`, and refuses to start if that directory exists. Everything it produces, including the versioned reference sources bound to that run's residual, goes inside the owner. It writes nothing under the frozen evidence, the first replay's owner or the lane's `evidence/` directory.

```bash
node scripts/dev/owned-compute-supervisor.mjs run --owner-task <task> --deadline-seconds 600 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/serial-boundary-replay-2026-10-10.py new --run <new-label>
```

**Verification of an existing owner.** This reads only. It checks an owner's `receipts.sha256`, the frozen reference manifest and the first replay's versioned reference sources.

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/serial-boundary-replay-2026-10-10.py verify .local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10
```

**The first replay's own drivers are a record, not a repeatable procedure.** The first packet ran `serial-boundary-residual`, `serial-boundary-reference-build`, the three versioned references, `serial-boundary-history-endpoint` and `serial-boundary-compare`, in that order, into the fixed owner `serial-boundary-reproduction-2026-10-10/`. Running them again would overwrite receipts that owner's 43-file manifest binds: the residual would get a new timer and a new hash, and `build event` would then refuse, correctly, because the existing versioned event reference asserts the first residual's hash. An earlier version of this section presented that sequence as a reproduction recipe; it is not one. Those drivers and the three `-v2` reference files under `evidence/` are kept unchanged as the exact instruments of the first replay and should not be rerun.

## 8. What was not replayed

- **The subject-side continuation** in `first-class-boundary/continuation/` (`bounds.py`, `event-final.py`), the subject's own route to the bracket. Its frozen receipt records the same two endpoints, `5121/1024` and `10339/2048`, by reading it; it was not rerun.
- **The census and tail history instruments** (`census-instrument.py`, `tail-instrument.py`). Only the endpoint audit, which the references consume, was replayed.
- **The earlier population error receipt** consumed by the stopped reference (`f846844f…`), and the pulse and source-prefix records. They are authenticated by full literal hashes inside the versioned stopped reference and were not recomputed.
- **The through-five archives and their accepted errors.** Recomputing them would be new evolution or an older branch's proof, outside this task.

## 9. Falsifiers

- `compare.json` reporting a nonzero scientific difference count, or a bracket other than `5121/1024`, `10339/2048`.
- A loaded analysis module differing from its pre-move blob on any line other than the root index, which the driver would refuse.
- A versioned reference whose adaptation diff changes a formula, constant, bound or comparison, or whose asserted literal hash does not match the file it names.
- A replay owner whose `receipts.sha256` fails, a second `new` run that writes into an occupied owner, or an open-audit log naming a historical scratch file.
- A difference between the two preservation listings.
- A separately derived evaluation of one residual cell that exceeds the subject's bound for that cell. None has been attempted; this is how the shared input could be wrong while every check here passes.

## 10. Proposed integration

These are proposals for the plan and queue owner; neither was edited.

1. Mark the queue entry complete at the reproduction grade: source-bound current controls, target and versioned references reproduce the frozen receipts and the original bracket; the residual remains a shared input.
2. Add a dated note to the [integration assessment](lattice-review-integration-2026-10-03.md#independence-and-current-reproduction), whose last sentence says no claim of current-source reproducibility is made. That sentence was true when written; this report now supplies the reproduction and identifies the hash transition as the directory move.
3. Record that the preserved reference keeps its two location defects in its original bytes, and that the versioned references are the current route.
4. Keep the independent reconstruction of at least one residual cell as an open verification opportunity. It is not required for the reproduction and is not claimed here.

## 11. Continuation: repeatable replay and review dispositions

Review of the first replay raised three comments. All are accepted. No first-replay or historical byte was changed in resolving them: the first owner's 43-entry receipt list, the frozen 11-entry reference manifest and the three versioned reference files all verify afterwards.

### 11.1 Two further replays in new owners

| Run | Owner | Supervised run | Wall seconds | Files | Result |
| --- | --- | --- | ---: | ---: | --- |
| `r1-2026-10-10` | `serial-boundary-replays/r1-2026-10-10/` | `5a03f10b-e76f-49cc-8a60-51dee2b210e7`, exit 0, group closed | 24.525 | 47 | PASS |
| `r2-open-audit-2026-10-10` | `serial-boundary-replays/r2-open-audit-2026-10-10/` | `67a08933-fdcd-4577-88ca-438bb1e0fa6f`, exit 0, group closed | 25.198 | 47 | PASS |

Each run executed the driver's six known cases, then thirteen steps with the known controls of every stage before its target, and stopped at nothing. Each reproduces the bracket `5121/1024`, `10339/2048` with zero scientific differences against the frozen receipts in all nine compared documents, and zero against the first replay; the only differing fields against the first replay are timers and the identities that follow from them. Each owner holds its residual, references, history audit, the versioned reference sources built for it, five adaptation diffs (3, 8 and 15 changed lines for the references; 12 and 4 for the history instrument and its nested audit), per-step logs, `compare.json`, `run.json` and its own `receipts.sha256`. A second request to create `r1-2026-10-10` was refused with exit 1 and wrote nothing.

**No historical scratch is read.** In these replays the history endpoint audit runs from its retained copy, with its nested audit, pulse record and adjudication document routed to retained or current locations and still checked by the instrument's own literal hashes. The second run measured this: every interpreter in it ran with an audit hook logging each file opened under `.tmp/`. The log has three entries, all the driver's own known-case probe file, which also serves as the hook's positive control in the parent process. A control for child processes, a child interpreter with the same environment opening one scratch file, logged that file; it was run after the replay and not before, so the order for that one control is target first. Git history is still read, to authenticate the moved modules.

### 11.2 Dispositions

| Comment | Disposition | Where resolved |
| --- | --- | --- |
| R2-01: Section 7 was not a repeatable command sequence | Accepted. A separately named replay driver creates a new owner per run, refuses an occupied one, keeps its versioned references inside the owner, and runs without historical scratch. A read-only verification command is separate. Run twice | Sections 7 and 11.1 |
| R2-02: the archive spelling is not a failure reason | Accepted. The old subject path and the frozen and live subject identities are stated as the barriers; the spelling is stated as a valid expression and a readability defect | Section 2 |
| R2-03: function bodies are not literally unchanged; the history declaration | Accepted. The report now says the arithmetic is unchanged while routing changes and literal guards are added, including the loop in the event reference's target function; and that the history audit has two declared differences | Section 3 |

Two corrections of my own are recorded where they apply: the direct reference targets were not sub-second (Section 6), and the supervisor's launch failure is described by what was observed, without a cause (Section 6).

Supplemental receipts are in `serial-boundary-replays/supplement-2026-10-10/`: the refusal log, the open-audit log and its child control, redacted statuses for both supervised runs, the closeout, and the three verification outputs.
