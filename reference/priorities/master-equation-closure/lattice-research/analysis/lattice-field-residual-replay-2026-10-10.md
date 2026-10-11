# Lattice field, Jacobian, residual and source-prefix enclosure replay (2026-10-10)

This report records a fresh recomputation of the interval enclosures that the next-event certificate consumes: the stationary coefficient and field bounds, the receiver Jacobian, the continuous residual, and the incoming source-prefix error table. It complements the [independent assessment](lattice-continuation-chain-codex-assessment-2026-10-10.md), whose Sections 6–8 replayed the history audit and the final event arithmetic while leaving these enclosures as accepted inputs. The scenario is unchanged: normalized $c_f=1$, $g=16$, the infinite alternating unit cubic lattice with its original stationary eight-source grouping, the supplied two-target negative-time pulse and forward release, and the complete canonical cross-root census. No trajectory, equation, event rule, summation or accepted receipt was changed.

## 1. Result

Every enclosure named in the assignment was recomputed from the preserved instruments and agrees with its accepted receipt in every scientific field. **Grade: measured**, by the frozen original instrument files, whose bytes and scientific function bodies were preserved, executed with the three kinds of adaptation named in Section 2, and checked by an exact field-by-field JSON comparison and elementwise array comparison whose known cases passed first.

- **Continuous residual.** The 32-cell residual over reception times $[5,11/2]$ reproduced with zero differing scientific fields, including every per-receiver residual, position, velocity and acceleration bound in all 32 cells. Its largest per-cell acceleration-mismatch bound is $0.6661983858759744$ in both runs.
- **Source-prefix error table.** The 174-cell refinement from $73/32$ to $5$ reproduced bit for bit. The fresh array file has the same SHA-256 as the accepted one. The time-five maxima are $P=0.0009921827453216576$, $V=0.00427323514253792$ and $A_{\mathrm{prefix}}=0.019567817386430732$.
- **Field and receiver Jacobian over the event cells.** The 32-cell event comparison was recomputed from the fresh residual and the fresh prefix table rather than from the accepted ones. It reproduced with zero differing scientific fields, including every per-receiver Jacobian bound $\lambda$, source-error term and speed bound. All 32 error tubes close, and `event_forced`, `no_target_turn` and `transverse_all_possible` are true in both runs. The 32-cell auxiliary endpoint speed lower bound is $1.087882571705592$ at anchor $(-1,0,1)$ in both; that figure describes the whole auxiliary comparison, whereas the accepted event uses only its first 31 cells.
- **Stationary coefficients, tails and the separately authored references.** All fifteen independently authored reference instruments in scope passed their known controls and then their targets. Their fresh receipts match the retained originals except for timers and for recorded paths and hashes of upstream receipts that themselves carry a new timer.

Two limits govern what this establishes. First, agreement of a fresh run with an earlier run of the same instrument shows that the computation is deterministic and that its inputs are intact; it is not an independent proof that the computation is correct. Section 4 therefore states, component by component, which separately authored reference or separately established bound checks which predicate, and where no second evaluator exists. Second, the enclosures take earlier accepted receipts as inputs. Those inputs were authenticated by hash and not recomputed; Section 5 lists them.

One finding needs the plan owner's attention: the frozen instruments could not run as recorded, because analysis modules they load were moved after the accepted runs. Section 3 explains the cause and the read-only authentication used.

## 2. Terms and method

An **enclosure** is an interval, computed with outward rounding, that is proved to contain an exact quantity. A **subject** is the instrument that computes an enclosure the certificate consumes. A **reference** is a separately authored instrument that checks one predicate about a subject or its output by a different method. A **known case** is an input whose correct answer is known in advance; each instrument is run on its known cases, and the pass is recorded, before it is run on its target.

The original instruments write their receipts beside themselves or into the accepted evidence directories. Running them as recorded would overwrite accepted receipts. Each driver below therefore reads the original source file byte-identical and checks its SHA-256 against the owning manifest and against the retained byte copy. No frozen file was edited and no scientific function body was changed. The execution nevertheless differs from the recorded commands in three explicit ways, and the result is conditional on each being what it is stated to be:

1. **Output redirection.** Receipts are written to a fresh directory. For the subjects this is done by resetting a module attribute after loading the unmodified file. For the fifteen references it is done by executing the reference's text with one statement replaced, `HERE=Path(__file__).resolve().parent`, so the executed text of a reference differs from its file in that one statement.
2. **Relocated analysis modules.** The analysis modules the instruments load are served from their moved location, where each differs from the recorded bytes in one root-index line. Section 3 gives the authentication. The effective bytes of those seven modules are therefore the authenticated moved files, not the recorded ones.
3. **Fresh event inputs.** The event-cell comparison reads the fresh residual and the fresh prefix table from this replay in place of the accepted ones.

The adaptations per driver are:

| Driver | Adaptation | What stays fixed |
| --- | --- | --- |
| [Residual driver](../evidence/lattice-residuals-replay-residual-2026-10-10.py) | The module attribute `OUT` of `residual.py` | The three ROOT sources, seven recorded dependencies, default arguments (64 cells per unit, full archive) |
| [Prefix driver](../evidence/lattice-residuals-replay-prefix-2026-10-10.py) | `HERE` of `prefix_refinement4.py` only, after byte copies of the three files it reads there | Six HALE sources, 37 immutable inputs recorded by `retention.json` |
| [Event-comparison driver](../evidence/lattice-residuals-replay-event-comparison-2026-10-10.py) | `HERE`, the refined-error table and the `--residual` argument, both pointed at the fresh outputs of this replay | Six HALE sources and the same 37 immutable inputs |
| [Subject-controls driver](../evidence/lattice-residuals-replay-subject-controls-2026-10-10.py) | Each loaded module's own `HERE`, and `source_boxes.OUT` | Eight HALE sources |
| [Reference driver](../evidence/lattice-residuals-replay-references-2026-10-10.py) | The one statement `HERE=Path(__file__).resolve().parent` is replaced by the fresh directory | Fifteen MOORE references; all explicit subject and input paths |

No reference file and no subject file was modified. Fresh outputs are under `.local-data/master-equation-closure/lattice-residuals-replay-2026-10-10/`, in the subdirectories `residual/`, `prefix/`, `event-comparison/`, `subject-controls/` and `independent/`, with the combined comparison in `compare.json`. This is ignored local storage and is not part of a fresh Git checkout.

The [comparison instrument](../evidence/lattice-residuals-replay-compare-2026-10-10.py) was written for this task. Before use on any target it passed four known cases: identical values report no difference; a timer-only change is reported as a timer and not as agreement; a one-unit-in-the-last-place change in a float is reported; and a missing key or unequal list length is reported. It treats a key named `seconds` as a timer and everything else as scientific.

## 3. Finding: the frozen instruments load modules that have since moved

The residual and Jacobian subjects load interval-arithmetic and certificate modules from `reference/priorities/master-equation-closure/analysis/`. Commit `308002c7b` (2026-09-30) moved those modules one directory deeper, into `lattice-research/analysis/`, and changed one line in each so that the module still finds the repository root (`parents[k]` became `parents[k+1]`). Two consequences follow, both **measured** by running the unmodified instruments and by `git show` of the pre-move blobs:

1. The recorded reproduction commands fail with `FileNotFoundError` at import. The first attempt of each driver stopped there, before any computation and before any output.
2. The live files no longer have the recorded hashes. The residual owner's `reproduction.json` records `smooth-two-particle-post-restart-nineteen-population-certificate.py` at `ec8ca75d…`; the live moved file is `71eaa618…`. The through-five retention record gives `smooth-two-particle-later-residual.py` as `19f28d34…`; the live file is `b209d412…`.

The [relocation helper](../evidence/lattice-residuals-replay-relocation-2026-10-10.py) resolves this without writing anything. For each analysis module actually loaded, it reads the pre-move Git blob, requires the same line count, requires every differing line to be exactly the root-index increment, and requires the pre-move blob to match the recorded SHA-256 where a manifest recorded one. Only then does it serve the load from the live moved file. Seven modules were loaded and all seven passed: each differs from its pre-move blob on exactly one line, and both recorded hashes match their pre-move blobs. Every driver receipt lists the modules, both hashes and the differing line number.

The moved modules are therefore equivalent to the recorded ones for this computation: the single changed line computes the same repository root from the new location. **Grade: derived** from the line-level comparison, and consistent with the bitwise-equal outputs. The falsifier is any differing line other than the root index in any loaded module, which the helper would report and refuse.

A second, smaller gap: `prefix_refinement4.py` gates its known controls on `comparison-full-known.json`, a PASS receipt from a superseded comparison. The historical `retention.json` does not list that file, by reading that manifest's file list. It is not without a copy, however: the prefix driver placed a byte copy in the fresh `prefix/` directory before running the known controls. The scratch original and that recovery copy both have SHA-256 `c381393fa6a4a73d9d92eec0813514c253f6c7772e107899832d4940f3cc539c`, measured by the [restore script](../evidence/lattice-residuals-replay-restore-gate-2026-10-10.py) in `check` mode. Its `restore` mode writes the scratch location from the recovery copy only when that location is missing, and stops without writing if a file with different bytes is present; four known cases of that rule passed first, and a run against the present original reported it present and identical. The recovery copy is inventoried in the supplemental retention record described in Section 6. The historical manifest was left unchanged.

## 4. Coverage map

The table gives, for each required enclosure, the subject and its hash, the known-case result, the target result, and the agreement with the accepted receipt. Hashes are shortened to their first eight hexadecimal digits; the fresh receipts hold the full values. "Equal" means equal in every scientific field by the comparison instrument, or elementwise equal for arrays.

| Enclosure | Subject (SHA-256) | Known case | Target | Fresh against accepted |
| --- | --- | --- | --- | --- |
| Stationary far coefficients, cube radius 24 | `stationary-coefficients.py` (`2c592f4e`) and `stationary-full-coefficients.py` (`2bb35feb`) | PASS: exact six-neighbour coefficients | PASS, exit 0 | Equal; only the timer differs |
| Full cubic coefficient, cube radius 256 | `cubic-shell-reference.py` (`f318de4c`) | PASS | PASS, exit 0 | Equal; only the timer differs |
| Stationary centre, tail and Jacobian error bounds | `stationary-error.py` (`21f123d4`), `stationary-error-cubic256.py` (`3282261b`), `stationary-full-tail.py` (`c4494199`) | PASS | PASS, exit 0 | Equal; only the recorded upstream paths and hashes differ |
| Stationary Jacobian as consumed by the subjects | `stationary_jacobian.py` (`6efe2735`), `stationary_full.py` (`ad23f717`) | PASS; receipts byte-identical to retained | Known controls only | Byte-identical known receipts |
| Receiver Jacobian formulas | `jacobian.py` (`a9207fe0`), `jacobian_factored.py` (`76cb2d56`) | PASS; receipts byte-identical to retained | Known controls only | Byte-identical known receipts |
| Receiver Jacobian and field over the event cells | `event_comparison.py` (`78bd1032`) | PASS | completed, exit 0 | Equal: 0 scientific differences, 32 timers; the two fields naming the residual file read differ, as intended |
| Continuous residual, 32 cells on $[5,11/2]$ | `residual_polynomial.py` (`fdaf3c84`) over `residual_factored.py` (`c02683ee`) and `residual.py` (`81e1571b`) | PASS: three receipts byte-identical to retained | completed, exit 0 | Equal: 0 scientific differences, 1 timer |
| Incoming source boxes, 320 bins to time 5 | `source_boxes.py` (`0cd0cff5`) | PASS | PASS | Arrays equal; file hash identical (`38ef55ab`) |
| Early prefix errors before $73/32$ | `early_prefix.py` (`bad54962`) | PASS | PASS | Arrays, receipt and file hash identical (`4e9530b3`) |
| Source-prefix refinement, 174 cells to time 5 | `prefix_refinement4.py` (`dbf31017`) | PASS; receipt byte-identical to retained | completed, exit 0 | Arrays equal; file hash identical (`467aeec7`); 0 scientific differences, 174 timers |

The stationary coefficient rows are a special case. The accepted coefficient intervals are themselves the output of the separately authored reference, which the residual subject consumes through an explicit adapter. Re-running them reproduces the reference; the fresh adapter input written by the residual subject equals the accepted one.

### 4.1 What checks each component independently

For each component, this subsection names the separately authored reference or separately established bound, the predicate it checks, and what remains checked only by repetition of the subject.

**Stationary coefficients and field.** The reference sums signed monomial numerators over 117,622 lattice labels as exact integers grouped by squared radius, using an explicit Legendre expansion, whereas the numerical proposal uses a binomial expansion; the [adjudication](smooth-two-particle-next-event-independent-adjudication.md) Section 6 describes both. Predicate checked: all 27 distinct far coefficients and 110 monomials are enclosed, with proposal-centre error below $2.367\times10^{-13}$, and the near cubic coefficient lies in $[14.439125383752526,14.439125383752536]$. The infinite tails are bounded analytically from the shell count and are evaluated by the error and tail references. Not recomputed here: the numerical proposal file `stationary.json` (`d7783466…`), which the reference binds by hash.

**Receiver Jacobian.** `jacobian-reference.py` (`93cbc7bc`) validates the factored Jacobian algebra against an independently expanded symmetric form on three noncollinear exact rational jets. Predicate checked: the formula. Not independently checked: the interval evaluation of that formula over the actual source and receiver tubes, which produces the per-receiver bound $\lambda$ in each cell. That evaluation is done only by the subjects.

**Continuous residual.** `residual-row-reference.py` (`f88e2530`) checks the residual row and its complete time derivative by direct implicit differentiation on three noncollinear rational jets. `residual-constants-reference.py` (`c3bee2fe`) checks that all eight fixed rationals in the tail and cubic are enclosed by the subject's own conversion. `coverage-reference.py` (`31b66bba`) checks the census: 1502 receivers, 1350 incoming labels and 149,046 relationships, a complete superset of the actual generated rows. `regularity-reference.py` (`437617ea`) derives the jerk bound, below the clean value 200,000. Predicates checked: the row algebra, the constants, the completeness of the row set, and the regularity assumption. Not independently checked: the 32-cell interval evaluation itself. The file listings of the two locations inspected, the retained independent owner `.local-data/master-equation-closure/next-event/independent/` and the reference scratch directory `.tmp/mec-008-next-event/moore/`, contain no evaluator of the full residual. That is a statement about those two listings and the coverage their receipts declare; it does not rule out an evaluator elsewhere in the repository or outside it.

**Source-prefix errors.** `prefix-arithmetic4-reference.py` (`b58694b5`) checks all 174 rows of the accepted table, its monotone cumulative bounds, the accepted intersections and independently bounded positive kernels. It reads the accepted table; because the fresh table is bitwise equal to it, that check applies to the fresh table without further assumption. `early-profile-reference.py` (`7bdce901`) checks that every early bound dominates an independent exact-coefficient reconstruction at 4673 fine nodes. `prefix-residual-early.py` (`25e1528e`) and `prefix-residual-coverage.py` (`6bd38555`) check that every prefix cell lies in a retained residual bin. Predicates checked: the propagation arithmetic, table provenance, and residual-bin coverage. Not independently checked: the per-cell coefficients $\lambda$ and $q$ computed inside the refinement from the Jacobian and history-error bounds.

## 5. Evidence boundary

The four categories below must not be merged.

**Fresh reproducibility (measured here).** The residual, the prefix table, the source boxes, the early profile and the event-cell comparison reproduce from the preserved instruments and authenticated inputs. This establishes determinism and input integrity on this machine with the shared project environment.

**Independent adjudication (re-run here, authored earlier).** Fifteen separately authored references passed known controls and targets again. They check the predicates listed in Section 4.1. Their independence rests on separate authorship and different methods as described in the adjudication; this replay did not author a new reference.

**Conditional reconstruction (from the earlier follow-up, not repeated).** The independent event reference checked all $32\times1502=48064$ propagation steps conditional on the accepted field, Jacobian, coefficient, source-prefix and residual inputs. This replay shows those inputs reproduce. It does not turn the conditional check into an unconditional one, because the per-cell interval evaluations named in Section 4.1 still have no second evaluator.

**Unreplayed inputs (authenticated by hash, not recomputed).** These are load-bearing, by reading the subject sources and the manifests, and remain accepted inputs:

- The auxiliary comparison archive (`97aa2156…`) and the through-five incoming population (`b8c44502…`). Recomputing them would be new trajectory evolution, which this assignment excludes.
- The earlier residual and error receipts the prefix refinement reads for times before five: the population-restart, post-restart, next-maximum and through-five residual receipts, the error table in `population-h21-4.json`, and the source profile `fine-prefix-norms.json` (`f15e7a00…`). These belong to older branches. They are consumed as bounds, so they are load-bearing; they were not recomputed, and execution was not broadened to them.
- Frozen helper sources outside the next-event owners: `.tmp/mec-008-population-restart/moore/polynomial.py`, its `population-error-target.json`, and `through-five/continuation/compare.py`.
- The numerical stationary proposal `stationary.json` and the census `census.npz` (`41bf6aa3…`); the census was replayed in the earlier follow-up.
- The event extraction `event_extract2.py` and the optional late residual-grid reserve were not run. The reserve is not needed for this event.

The event conclusion keeps its accepted scope: the first 31 cells of the 32-cell auxiliary comparison force the first global speed-one event, and the final auxiliary cell is not actual post-event evolution.

## 6. Receipts

Runs used the shared project environment (`../.venv`, Python 3.13.2) under the owned-compute supervisor with owner task `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`, a fresh identity. Wall times are from the supervisor leases. The two long jobs ran concurrently on an eight-core machine, so their times are not comparable with the historical sequential times. The event-cell comparison took about two and a half times its historical time; the cause was not investigated, and no cost conclusion is drawn from it.

| Job | Run identifier | Wall seconds | Exit | Process group closed | Historical seconds |
| --- | --- | ---: | ---: | --- | ---: |
| Residual, 32 cells | `1e70a2c5-c802-4430-adae-aba98c752aa8` | 697.151 | 0 | yes | 568.605 |
| Prefix refinement, 174 cells | `e5e0db79-057f-412c-97f0-6012e6a1f6b0` | 379.776 | 0 | yes | 335.531 |
| Event-cell comparison | `e35ad4a3-6729-4039-a79d-3c0db851e6be` | 242.356 | 0 | yes | 98.868 |
| Fifteen references | `f4f72644-acc4-439f-be9c-ef752a16e376` | 38.686 | 0 | yes | not recorded as one run |
| Subject controls | `d3cd44fb-dda8-4fc4-85df-53fce74d11af` | 7.312 | 0 | yes | not recorded as one run |

Memory use was not measured. Heartbeats were the residual's per-cell progress file and the prefix job's flushed rows every eight cells; both advanced throughout.

Preservation: a SHA-256 listing of every file under `.tmp/mec-008-next-event/` and `.local-data/master-equation-closure/next-event/` (282 files, excluding bytecode caches) was taken before the first run. The same listing taken after the last run is byte-identical, by `cmp`: no preserved subject, reference, input or historical receipt changed. The supervisor's closeout for the owner task reported `clear`. The listings are in `.tmp/lattice-residuals-replay-2026-10-10/`.

Retention: the fresh outputs satisfy the local-storage boundary in ignored `.local-data/` and are not backed up separately. The measured lease times above are the only cost evidence; the aggregate cost of a full replay was not profiled, and no regeneration time is claimed.

A supplemental retention record, `retention/retention-supplement.json` in the fresh directory, indexes what the historical owners do not. It was written by the [supplement builder](../evidence/lattice-residuals-replay-retention-supplement-2026-10-10.py), which only adds files under `retention/` and refuses to replace a present file with different bytes. It holds: byte copies of the before and after preservation listings, each equal to its scratch original and to the other (SHA-256 `fa1e7aef…`, 282 lines); the supervisor's own redacted status for each of the five runs, each checked to report completion, exit 0 and a closed process group; the paths of the live lease and log files; the recovery copy of the gate receipt with its restoration command; and SHA-256 values of sixteen fresh scientific outputs. The raw lease files hold a control token and were not copied. The closeout output shown at the end of the replay was not saved at the time; the retained `closeout-rerun.json` is a later rerun for the same owner task and supports only that no lease of this owner was live at the rerun. After the supplement was written, the 99 pre-existing files of the fresh directory and the 282 preserved files were re-hashed and found unchanged.

## 7. Reproduction

Run from the repository root. Known controls must pass before each target. The event-comparison steps require the residual and prefix targets to have completed.

```bash
PY="${AAA_VENV:-../.venv}/bin/python"
E=reference/priorities/master-equation-closure/lattice-research/evidence
"$PY" $E/lattice-residuals-replay-residual-2026-10-10.py known
"$PY" $E/lattice-residuals-replay-residual-2026-10-10.py target
"$PY" $E/lattice-residuals-replay-prefix-2026-10-10.py known
"$PY" $E/lattice-residuals-replay-prefix-2026-10-10.py target
"$PY" $E/lattice-residuals-replay-subject-controls-2026-10-10.py
"$PY" $E/lattice-residuals-replay-references-2026-10-10.py all
"$PY" $E/lattice-residuals-replay-event-comparison-2026-10-10.py known
"$PY" $E/lattice-residuals-replay-event-comparison-2026-10-10.py target
"$PY" $E/lattice-residuals-replay-compare-2026-10-10.py
"$PY" $E/lattice-residuals-replay-restore-gate-2026-10-10.py selftest
"$PY" $E/lattice-residuals-replay-restore-gate-2026-10-10.py check
"$PY" $E/lattice-residuals-replay-retention-supplement-2026-10-10.py
```

If the scratch gate receipt is missing, run the restore script with `restore` before the prefix known controls. The supplement builder expects the scratch preservation listings and the five run identifiers of this replay; it documents this run and is not a general tool.

For the three long targets, wrap the command in the supervisor, for example `node scripts/dev/owned-compute-supervisor.mjs run --owner-task <task> --deadline-seconds 900 -- "$PY" $E/lattice-residuals-replay-residual-2026-10-10.py target`. The drivers refuse to run a target without a fresh known receipt from the same driver bytes.

## 8. Falsifiers

Each of the following would overturn a statement above, and each can be checked from the fresh directory:

- `compare.json` reporting a nonzero `scientific_difference_count` for the residual, prefix table or event comparison, or `false` under `arrays_equal`.
- Any row of `independent/summary.json` whose known result is not `PASS`, whose target exit is nonzero, or whose listed differences include a field other than `seconds` or the recorded upstream `inputs`.
- Any driver stopping with a source, dependency or immutable-input hash mismatch, or the relocation helper reporting a differing line other than the root index.
- A difference between the retained before and after preservation listings, or between either and its scratch original.
- A retained run status that does not report completion, exit 0 and a closed process group, or a recovery copy of the gate receipt whose SHA-256 is not `c381393f…539c`, or a `restore` run that replaces a present file with different bytes.
- A loaded analysis module or executed reference whose bytes differ from the frozen file in any way other than the adaptations listed in Section 2.
- A separately authored evaluator of the 32-cell residual or of the per-cell $\lambda$ and $q$ bounds that disagrees with the subjects. None was found in the two listings named in Section 4.1; this is the remaining route by which the enclosures could be wrong while every check here still passes.

## 9. Proposed integration for the parent plan

These are proposals for the plan owner; the parent reciprocal-review plan was not edited.

1. Record the residual, source-prefix, source-box, early-profile and event-cell enclosures as freshly reproduced with zero scientific differences, at the grade stated in Section 1, and keep the event certificate's dependence on them described as conditional on subject-only interval evaluations.
2. Record the relocation finding of Section 3 against the residual and continuation reproduction owners: their recorded commands no longer run, and two recorded dependency hashes refer to pre-move paths. A correction note in the owners, rather than an edit of the frozen manifests, would let a later reader reproduce without rediscovering this.
3. Point the continuation owner at the recovery copy of `comparison-full-known.json` and its restoration command recorded in the supplemental retention record, since the historical manifest does not list that file.
4. Treat a second, separately authored evaluator of one residual cell and of one cell's $\lambda$ and $q$ bounds as the next step that would add independent evidence. Further repetition of the same subjects would not.

## 10. Review dispositions

Codex reviewed this report at SHA-256 `28e0e1e4…6644` and raised three comments. None changes a scientific conclusion, and no scientific output was rerun or rewritten.

| Comment | Disposition | Where resolved |
| --- | --- | --- |
| R0-01: the gate receipt was described as having no retained copy | Accepted. The statement was too broad: a fresh byte copy already existed. Both copies have the recorded SHA-256; the copy is inventoried and a conflict-refusing restoration command is given | Section 3; restore script; `retention/retention-supplement.json` |
| R0-02: the preservation listings were kept in disposable scratch alone | Accepted. Byte copies of both listings, redacted run statuses for all five runs, and a closeout rerun are retained and indexed. The original closeout display was not saved, and the record says so | Section 6; supplement builder; `retention/` |
| R0-03: execution and claim precision | Accepted. The grade statement now names the output redirections, the one-line root relocation and the fresh event inputs as execution adaptations; the absence claim is narrowed to the two listings inspected; the unmeasured regeneration estimate is removed | Sections 1, 2, 4.1, 6 and 8 |

One correction to this packet's own instrument: the supplement builder first stopped because it read the supervisor's status at the wrong level of its JSON. It had copied the two listings and written nothing else. The selection was corrected, the copy rule's known cases were rerun, and the builder then completed.
