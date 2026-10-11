# The six-path Borg coarse-step row: the recorded failure is already repaired at the current commit, and the repair has a side effect (2026-10-10)

## Result

**The recorded barrier does not reproduce on the committed source.** The unmodified six-path Borg seed-0 refinement driver, built from commit `6f869aaae4a62fcff8e11d957c8af0656c0a2a0b`, completes all four rows, including the step-$0.01$ row that the [workstation analysis](../campaigns/apple-silicon-workstation-analysis.md#borg-bridge-workload-and-the-serial-joint-state-limit) records as halting with `minimum_step_exhausted` after `krawczyk_image_not_strictly_interior`. Its `strictControlPassed` is true. No production code was changed in this stage, because there was no failure left to repair. An [independent review](saturday-borg-six-path-certification-codex-review-2026-10-10.md) by Codex reran the frozen driver on the committed source with the same outcome, inspected the code transition, and reran unchanged copies of the reference scripts; its four corrections are incorporated below.

1. **Where the failure went (measured).** The recorded failure reproduces exactly at the commit of the old measurement, `3d22044f`, and at `38b0a154b` of 2026-09-14. It is absent from `2859fedfa` of 2026-09-15 onward. Within that commit one change is responsible: ten lines in `CoupledEvolution.cpp` that, when the joint endpoint inclusion test fails, continue the existing correction iteration from the newly evaluated centre if iterations remain. Replacing only that file group in the old source removes the failure; removing only those ten lines from the new source restores it. Each of the commit's four other solver changes, applied alone, leaves the failure in place.
2. **The accepted row agrees with an independent calculation at sampled instants (reduction derived; comparison measured).** For this preparation the motion on $[0,0.01]$ reduces exactly to six uncoupled ordinary differential equations in a static field, by a uniform bound that does not depend on any numerical integration. Those equations were integrated separately in 40-digit working arithmetic. At step $0.01$ the solver's endpoint differs from that numerical reference by at most $5.0\times10^{-11}$ in position and $1.0\times10^{-8}$ in velocity, and the reference lies inside the published error radii at each of 41 sampled instants across the interval, for all four rows. These are point comparisons; they are not a continuous enclosure and carry no certified bound on the reference's own error.
3. **The same ten lines make another existing native test fail (measured).** On the committed source the native suite passes six of seven tests. The seventh, `eom_stationary_joint_frontier_fixture`, exits non-zero with `fail_closed`. It passes at `38b0a154b`, fails from `2859fedfa`, fails when only the evolution change is added to the old source, and passes when only the ten lines are removed from the new source. No record of this was found in the repository's Markdown under `reference/` by a search for the fixture's name together with failure words.
4. **Documentation that is now out of date.** [The solver README](../../../../src/eom/README.md) still says the strict six-path control "currently fails closed at coarse step `0.01`". The workstation analysis's statement is a dated measurement that was true at its commit. The repair itself is recorded in the Braid Program's [evidence of 2026-09-14](../../master-equation-closure/braid-program/evidence/2026-09-14-zero-acceleration-and-binary-validation.md), which did not rerun the Borg ladder.
5. **What is not established.** A passing engineering ladder is not Borg migration, a long-horizon result, physical acceptance or a new mode. The admitted preparation is six architrinos at rest with a prescribed past; it is not a self-consistent past. The stationary-fixture failure was located but not diagnosed further, and nothing was repaired.

> Claim grade: measured for items 1, 3 and 4, by the builds, runs and searches named under [Reproduction](#reproduction-commands-and-receipts), each bound to an exported commit; derived for the reduction in item 2, by the uniform first-exit argument below with its hypotheses checked in exact arithmetic, and measured for the sampled comparison, the reference instrument having passed one closed-form case before the target. In the evolution contract's vocabulary the reference result is `reference` evidence and the driver's rows are `executable_architecture_evidence`; nothing here is `canonical`. Falsifier: a clean build of commit `6f869aaae` whose unmodified six-path ladder halts at step $0.01$; an old-source build with only the evolution file group replaced that still halts; an independent integration of the six static-field equations that falls outside a published radius; or a clean build of `6f869aaae` on which the stationary fixture exits zero.

## The frozen row and its preparation

The driver is [run-borg-eom-refinement-ladder.mjs](../../../../scripts/eom/run-borg-eom-refinement-ladder.mjs), unmodified, with the path count given explicitly as six; without that argument it uses one path. It builds the request from the Borg manifest with seed index 0, start time 0 and target duration $0.01$, and submits four rows to one persistent solver process: fixed steps $0.01$, $0.005$ and $0.0025$ with one worker, and $0.0025$ with four workers. The request for the first row, rebuilt with the same builders by a diagnostic script, has these contents (measured by printing it).

| Item | Value |
| --- | --- |
| Contract and model binding | `eom_evolution_contract/v1`, `master_eom_binding/v1` |
| Paths | `1001` to `1006`, charges $+1,-1,+1,-1,+1,-1$ |
| Retained past | exact inertial polynomials on $[-1.05,0]$ with zero velocity: every path is at rest at its seeded position; provenance `analytic-inertial-c1-initial-datum/v1`, not solver output |
| Smallest separation of two paths | $0.288893$ |
| Field speed, coupling, core scale | $1$, $0.05$, $0.2$ |
| Root, acceleration, position, velocity and correction tolerances | $10^{-3}$, $10^{-1}$, $10^{-2}$, $10^{-2}$, $10^{-1}$ |
| SHA-256 of the canonical input histories | `886dbaa3ff8c0d35c474558d76c8f65a3dee3913952278748c02829656bfb85d` |
| Allocation hash of the step-$0.01$ row | `09da3afbc4dd5de043f509ca94015989e3fba34e788072450e418f8f8467b3fa` |

The input-history hash equals the one recorded by the workstation analysis, so the row tested here has the same input as the recorded failure. Numerical $c_f$ is $1$. This prescribed resting past is a numerical preparation admitted by the Borg policy. It has nothing to do with the self-consistent lattice past constructed elsewhere in this campaign, and no self-consistent past is claimed for it.

## Known controls, run before the target

Both controls named for this stage are assertions of the unchanged test `test_joint_precision_controls_cover_live_sum_full_corrector_and_retention` in [tests/test_eom_native_coupled_evolution.py](../../../../tests/test_eom_native_coupled_evolution.py). The test builds the solver into its own temporary directory and compares the fixture's output with references written in that test file: an analytic static sum for six collinear paths, recomputed in Decimal arithmetic, and an 80-digit Decimal elimination of the declared 18-by-18 cyclic linear system.

- **Six-path static acceleration and root control:** 30 sharp partner rows consumed, no fallback rows, every Decimal receiver sum inside the solver's joint representation. Passed.
- **Independent 18-dimensional linear Krawczyk control:** certified, positive minimum margin, every Decimal root component inside the Krawczyk image. Passed.
- **Enlarged-remainder control:** returns `krawczyk_image_not_strictly_interior` and publishes nothing. Passed.

The test ran in $38.2$ seconds at 23:47:49Z, exit code 0, while `git status` showed no modified or untracked file under `src/eom`, `scripts/eom`, `src/apps` or `tests`. No oracle, test or reference file was edited.

## Current outcome of the unmodified driver

**Build identity.** The solver was configured and built in Release mode in the task-owned directory `.tmp/saturday-serial/i3/build` at 23:47:03Z to 23:47:32Z, with the working tree clean under the solver, driver and app paths. A second build from a `git archive` export of commit `6f869aaae` gave a `eom_borg_shadow_cli` with the same SHA-256, `3c0a21c1893577d8b01c0948bf346d2f38cea003028e80d59559c8998cec5aff`, so the first build is a build of the committed source. This matters because another session began editing files under `src/eom`, including `CoupledEvolution.cpp`, at 23:53Z; those uncommitted edits are not part of anything measured here.

**Outcome (measured, three runs).**

| Row | Step | Workers | Status | Accepted steps | Largest local-error estimate, position and velocity |
| --- | --- | --- | --- | --- | --- |
| `h` | 0.01 | 1 | completed | 1 | $1.50\times10^{-10}$, $3.01\times10^{-8}$ |
| `h_over_2` | 0.005 | 1 | completed | 2 | $9.39\times10^{-12}$, $3.76\times10^{-9}$ |
| `h_over_4` | 0.0025 | 1 | completed | 4 | $5.87\times10^{-13}$, $4.70\times10^{-10}$ |
| `h_over_4_threads_4` | 0.0025 | 4 | completed | 4 | same as the row above |

The driver reports refinement differences of $7.51\times10^{-9}$ between steps $0.01$ and $0.005$ and $9.39\times10^{-9}$ between $0.01$ and $0.0025$, both under its $10^{-8}$ limit, identical histories for one and four workers, one persistent worker, and `strictControlPassed: true`. The step-$0.01$ row has 36 ordered pair certificates, 30 with one root and six self pairs with none, route `exhaustive_exact_pair_batch`, no rejected step. A hash over the claim-carrying fields of the output, the statuses, endpoints, step decisions and local errors, is identical in three runs: `cdee8fc509e45d50c41ad47ddb745d0813f774ad76b485f2f76bf68da4565a12`. Wall times are outside that hash; the whole driver takes two to four seconds.

Agreement between these rows is a refinement comparison of the solver with itself. It is not independent evidence; the next section supplies that.

## An independent reference for this row

**Reduction (derived; hypotheses checked in exact arithmetic).** The reduction must hold at every instant of $[0,0.01]$, so it needs a bound that is uniform over the interval. The argument is the one supplied by the independent review, checked here step by step.

Let $\mathbf c_i$ be the six seeded positions, $H=0.01$, $R=0.001$ and $\kappa=0.05$. Exact rational arithmetic on the decimal tokens of the request shows that all fifteen pair distances lie strictly between $0.28$ and $1$ (the smallest is $0.288893$ and the largest $0.823673$ in float display), that every path's supplied past is exactly at rest on $[-1.05,0]$ with zero error radii, and that the field speed is $1$. Consider the six ordinary differential equations

$$
\ddot{\mathbf x}_i=\kappa\,q_i\sum_{j\ne i}q_j\,\frac{\mathbf x_i-\mathbf c_j}{\lvert\mathbf x_i-\mathbf c_j\rvert^{3}},\qquad\mathbf x_i(0)=\mathbf c_i,\quad\dot{\mathbf x}_i(0)=\mathbf 0,
$$

each for one path in the fixed inverse-square field of the other five, like polarities repelling. While $\mathbf x_i$ stays within distance $R$ of $\mathbf c_i$, its distance to every other anchor exceeds $0.28-R$, so

$$
\lvert\ddot{\mathbf x}_i\rvert\le\frac{5\kappa}{(0.28-R)^2}<3.22 ,\qquad\lvert\dot{\mathbf x}_i(T)\rvert<3.22\,T\le0.0322 ,\qquad\lvert\mathbf x_i(T)-\mathbf c_i\rvert<\tfrac12\,3.22\,T^2\le0.000161<R .
$$

The solution therefore cannot reach the boundary of the ball of radius $R$ before time $H$: at a first exit time the last inequality would be violated. It exists on all of $[0,H]$, meets no singularity of the field, and satisfies the three bounds throughout.

It remains to see that this solution is the solution of the Master Equation for the given retained past. Four facts are needed at every reception time $T$ in $[0,H]$, and each follows from the bounds.

- *No partner root emitted after zero.* For an emission time $S$ in $[0,T)$ the two paths are more than $0.28-2R=0.278$ apart, which exceeds $H\ge T-S$.
- *One partner root, in the resting past, away from its boundary.* For a source at rest at $\mathbf c_j$ the causal condition has the single solution $S=T-\lvert\mathbf x_i(T)-\mathbf c_j\rvert$, and the distance lies between $0.279$ and $1.001$, so $-1.001<S<0$: inside the supplied past $[-1.05,0]$ and not at its retained boundary.
- *Unit transmitter factor.* A source at rest has transmitter factor exactly $c_f=1$, so the sharp row is the plain signed inverse-square row; this is the static-transmitter control of the [binding](../contracts/master-eom-binding-v1.md#independent-controls). The request's core scale belongs to the finite-width route and does not alter a sharp row.
- *No own-history root.* Over the supplied past and the new interval each path has speed below $1$, so it never meets its own earlier wake.

Hence there are exactly thirty partner roots and six inactive self pairs at every reception time, and the displayed equations are the Master Equation for this preparation on this interval. The statement is special to a resting past and a short interval. It establishes neither a self-consistent past nor anything beyond $T=0.01$.

The reference script prints a "largest displacement" of $3.42\times10^{-5}$ and uses it in a line labelled as a reduction check. That number is the displacement at the end time $T=0.01$ only. It is an endpoint measurement, consistent with the uniform bound $1.61\times10^{-4}$, and it does not by itself justify the reduction; the argument above does. The script and its output are preserved unchanged.

**Instrument.** `independent_reference.py` was written without reading the solver's sources. It integrates the six equations by a Taylor-series method with 40-digit working precision and a requested tolerance of $10^{-30}$. One analytic known case runs before the target: a fall from rest toward one fixed opposite source, whose time of fall has a closed form, reproduced to $7\times10^{-40}$. Two further checks are of a different kind and are not known cases. The quantity $\tfrac12\lvert\dot{\mathbf x}\rvert^2+\kappa q_i\sum_jq_j/\lvert\mathbf x-\mathbf c_j\rvert$ is a first integral of these static-field equations, a mathematical fact about them and not an energy account of the delayed system; its drift of at most $6\times10^{-42}$ along the six target integrations is a diagnostic of the target run. And the agreement of the sampled solution with the saved endpoint file, used by the containment script, compares the same integrator with itself and is a consistency check only. The working precision and these checks make a large reference error implausible, but no rigorous error bound for the reference is claimed.

**Comparison at the end time (measured).**

| Row | Largest difference from the reference, position | velocity |
| --- | --- | --- |
| step 0.01 | $5.01\times10^{-11}$ | $1.00\times10^{-8}$ |
| step 0.005 | $1.25\times10^{-11}$ | $2.51\times10^{-9}$ |
| step 0.0025, one or four workers | $3.13\times10^{-12}$ | $6.26\times10^{-10}$ |

The differences fall by a factor of four with each halving of the step.

**Containment in the published radii at sampled instants (measured).** The driver does not print the published histories, so a diagnostic copy that differs from it in one line, printing them, was used; it reproduces the frozen driver's endpoints, statuses, differences and verdict exactly. Each published cubic segment carries position and velocity error radii for each axis. At 41 instants from $0$ to $0.01$, for every path, axis and row, the reference lies inside the nominal cubic value plus or minus the published radius: about 1500 component checks per row, none outside. At segment ends the difference from the numerical reference is at most one third of the published radius, and its median over components is between $0.19$ and $0.29$ of the radius.

**What this establishes.** For this one preparation and interval, the accepted coarse step and its published radii agree, at the sampled instants, with a separately authored numerical solution of equations that are proved to be the same problem. It is not a continuous enclosure of the solver's segments, and not a certification of the reference to forty digits. The reduction is special to a resting past and a short interval; it says nothing about later times, when sources have moved and delays matter.

## Where the recorded failure went

**Instrument.** `snapshot_run.sh` exports one commit's `src/eom`, `scripts/eom`, `src/apps` and `package.json` with `git archive` into a scratch directory, builds the solver there, and runs that commit's own driver with six paths. No worktree is created. Its known case is the commit of the old measurement: at `3d22044f` it returns the recorded failure, step $0.01$ halted with `minimum_step_exhausted` after one rejected step with `krawczyk_image_not_strictly_interior`, the other three rows complete. For commits from `3039b6430` onward the driver imports a generated module that is not tracked; the current copy was supplied to the export, and `git diff` shows its authored data and generator unchanged since that commit.

**States along the history (measured).** Twelve commits after `3d22044f` touch the solver, driver or Borg app files. Only `2859fedfa` changes the corrector or evolution sources.

| State | Step-0.01 row | `strictControlPassed` |
| --- | --- | --- |
| `3d22044f`, 2026-08-30, the recorded measurement's commit | halted | false |
| `38b0a154b`, 2026-09-14; its solver, driver and app files equal those of the parent of `2859fedfa` | halted | false |
| `2859fedfa`, 2026-09-15 | completed | true |
| `6f869aaae`, current | completed | true |

The rejected step at the two failing states carries the same detail: smallest candidate radius $5.32\times10^{-15}$, largest $2.39\times10^{-14}$, and a smallest containment margin of $-1.15\times10^{-15}$ on path `1002`, axis 0, where the radius is $1.21\times10^{-14}$ and the image is $[6.97\times10^{-15},1.32\times10^{-14}]$. The image missed the box by about a tenth of the box's radius, at the scale of rounding.

**Which change of that commit (measured).** `variant_run.sh` builds the old source with chosen files replaced by their `2859fedfa` versions.

| Variant | Step-0.01 row |
| --- | --- |
| old source + new `JointEndpointCorrector.cpp` only | halted |
| old source + new `JointAccelerationSnapshot.cpp` only | halted |
| old source + new `Interval.cpp` only | halted |
| old source + new `ExactPairBatch.cpp` only | halted |
| old source + new `CoupledEvolution.cpp`, its header and the Borg CLI | completed, `strictControlPassed` true |
| `2859fedfa` with only the ten-line recentering block removed | halted |

**The change itself (read from the diff).** In the corrector loop of `CoupledEvolution.cpp`, the joint centre is treated as settled once the correction error is at most $10^{-13}$, and the joint endpoint inclusion is then tested. The added block applies when that test fails with a code beginning `krawczyk_image_not_strictly_interior/` and correction iterations remain: it takes the newly evaluated accelerations as the next guess and continues the loop. It does not accept the failed candidate, and on the last permitted iteration the original failure is returned. The mathematical inclusion test, the candidate radii and every tolerance are unchanged; a later candidate must still pass the same strict test. The settling threshold $10^{-13}$ is larger than this row's candidate radii of order $10^{-14}$, so a centre can count as settled while still being off by more than the box it must fit into, which is the situation the block's own comment describes. `CoupledEvolution.cpp`, `JointEndpointCorrector.cpp` and `Krawczyk.cpp` are unchanged between `2859fedfa` and the current commit.

So the barrier of this stage was in the continuous-error part of the solver, the certified joint endpoint enclosure, and specifically in where the box was centred, not in root coverage, history support, source identity or consumer admission. It was repaired on 2026-09-15 as part of other work.

## A side effect of the same change

**Existing native suite on the committed source (measured).** `ctest` on the build of `6f869aaae` ran seven tests in $106.5$ seconds: six passed and `eom_stationary_joint_frontier_fixture` failed. That fixture evolves a symmetric opposite pair released from rest, builds a retained prefix to $T=1.24$, and replays fixed steps of $0.005$ toward $1.395$.

| State | Fixture exit | Prefix steps | Certified frontier end | Replay | Result |
| --- | --- | --- | --- | --- | --- |
| `38b0a154b` | 0 | 179 | 1.395 | accepted | `certified_complete` |
| `2859fedfa` | 2 | 239 | 1.29 | rejected, `root_completeness_not_certified` | `fail_closed` |
| `6f869aaae`, current | non-zero | 234 | 1.29 | rejected, `root_completeness_not_certified` | `fail_closed` |
| old source + evolution file group (old fixture source) | 2 | 239 | 1.29 | rejected | `fail_closed` |
| `2859fedfa` minus the ten-line block (new fixture source) | 0 | 179 | 1.395 | accepted | `certified_complete` |

The last two rows separate the recentering block from the fixture's own source, which the same commit also changed: the outcome follows the block. At the rejected replay step the fixture reports `root_time_budget_exceeded` with joint width $1.0133\times10^{-5}$ against a root tolerance of $10^{-5}$, an excess of about $1.3$ percent.

**Reading (inferred).** With the block, steps that used to be rejected and halved are accepted after recentering, so the retained prefix is a different sequence of steps, and the joint-history widths it carries to the frontier are slightly larger. The frontier's root-time budget, which was met with little room before, is then missed. This reading is an inference from the step counts and the reported widths. The mechanism was not traced in the code, and no claim is made about which of the two step sequences is the better solver behaviour.

**Status.** The Braid Program's [stationary continuation diagnosis of 2026-09-14](../../master-equation-closure/braid-program/evidence/2026-09-14-stationary-continuation-diagnosis.md) records the fixture returning zero with a 179-step prefix. A search of the Markdown under `reference/`, excluding the campaign conversations, for the fixture's name together with "fail", "regress", "exit", "reject" or "no longer" found no record of the present failure. Whether the fixture's owners know of it is not established by that search. It is a different barrier from the one assigned to this stage and was not pursued.

## The contracts and what they require of these claims

Five contracts govern evidence about this row: the [evolution contract](../contracts/evolution-contract-v1.md), the [precision and certification contract](../contracts/precision-dynamic-range-and-certification-contract.md), the [certified error-budget ledger](../contracts/certified-error-budget-ledger.md), the [model binding](../contracts/master-eom-binding-v1.md) and the [independent oracle contract](../contracts/independent-dynamical-acceptance-oracle.md). They were to be read in full before anything was run. They were not: the controls, the driver and the exported builds were run first, parts of the contracts were read before the first review request, and all five were read in full only afterwards, on 2026-10-11 before this revision. No engine run, build or driver run was repeated after the reading. The reference and ratio scripts were rerun once afterwards, when `tightest.py` was run again to save its output for retention: it imports the reference script, which reran and rewrote `independent_reference_endpoint.json` with the same deterministic content. That rerun is kept as part of the record of evidence capture. The following obligations bear on what this note may say.

- **Evidence status.** The evolution contract reserves `canonical` for output of the complete bound loop with every acceptance passed, calls a result from an independent comparison implementation `reference`, and forbids setting a status from a successful return. This note claims `reference` status for its static-field solution and reports the driver's own label, `executable_architecture_evidence`, for its rows. The row's past is a prescribed datum, which the driver itself lists as a blocker.
- **Independence.** The oracle contract forbids an independent reference from importing or translating production code or using production-generated expected outputs. The reference here reads only the request's input tokens and compares with solver output after computing its own result. It is a session instrument and is not the repository's oracle under `scripts/eom/oracle/`; that oracle was not run on this row.
- **No self-refinement as oracle.** The ledger states that no tighter run of the engine is an independent oracle. The driver's refinement differences are reported as the solver compared with itself.
- **Certification of what was advanced.** The precision contract says a diagnostic computed after a state advance cannot certify the state that was advanced, and that a production error estimate counts as conservative only after the oracle shows it on the promoted workload. The sampled containment is such an after-the-fact comparison on one row. It supports the published radii at those instants; it does not certify the step or show the radii conservative in general.
- **Budget identity.** The row's allocation hash, `09da3afb…`, is the driver's refinement-control record with fixed controller steps. It is not the ratified Research preset, whose hash is `74919ee6…`, although its tolerances equal that preset's. No statement about a ratified preset passing follows.
- **Validation ladder.** The comparison resembles `VAL-12` and the step halving resembles `VAL-09` for this one row. Neither validation is claimed as passed: the ladder is for the implementation over a consumer's declared envelope.
- **Failure naming.** The evolution contract keeps an underlying `coupled_correction_failed` record as the terminal code when the minimum step is reached. The historical halt reported `minimum_step_exhausted` with the Krawczyk detail on its rejected step. Whether that reporting met the naming rule was not examined, and the question is moot at the current commit for this row.
- **Binding snapshot.** The binding pins a digest of the Master Equation source. It was not recomputed here; the reduction uses only the sharp per-root law and the static-transmitter control stated in the binding.

None of these changes a measured result of this note. They narrow what the comparison is called, which the Result section and the reference section now reflect.

## What was and was not done to production code

Nothing under `src/eom`, `scripts/eom`, `src/apps` or `tests` was edited. The repair authorisation of this stage was conditional on reproducing the failure, and the failure does not reproduce. The side effect is a separate question with its own owners, the strict inclusion must not be altered to settle it, and another session is at present editing `CoupledEvolution.cpp`. Two repair directions are noted for whoever takes it up, as suggestions that were not tried: tie the centre-settling threshold to the candidate radius so that a centre is not called settled while it is farther from the fixed point than the box is wide; or keep the recentering and re-examine the stationary frontier's root-time budget against the theorem in the [root-time budget evidence](../evidence/borg-current-root-time-budget-theorem-2026-07-20.md). Either would need the six-path ladder, the stationary fixture and the independent controls rerun together.

## Reproduction commands and receipts

All commands run from the repository root. Scratch material is in the ignored directory `.tmp/saturday-serial/i3/`.

```bash
cmake -S src/eom -B .tmp/saturday-serial/i3/build -DCMAKE_BUILD_TYPE=Release
cmake --build .tmp/saturday-serial/i3/build --parallel 6
PYTHONPATH=. ../.venv/bin/python -m unittest tests.test_eom_native_coupled_evolution.NativeCoupledEvolutionTests.test_joint_precision_controls_cover_live_sum_full_corrector_and_retention -v
node scripts/eom/run-borg-eom-refinement-ladder.mjs .tmp/saturday-serial/i3/build/eom_borg_shadow_cli 6
ctest --test-dir .tmp/saturday-serial/i3/build --output-on-failure
.tmp/saturday-serial/i3/snapshot_run.sh 3d22044fbbfdb89ebc8eca7cc50d0c1ae3eaf5f3
.tmp/saturday-serial/i3/snapshot_run.sh 38b0a154b
.tmp/saturday-serial/i3/snapshot_run.sh 2859fedfa
.tmp/saturday-serial/i3/snapshot_run.sh 6f869aaae4a62fcff8e11d957c8af0656c0a2a0b
```

These lines record what was run. The first two build whatever is in the working tree, which was clean under the solver paths at the time and is not now; to bind a build to the commit, export the commit into a new directory as the evidence README describes. The variant builds, the diagnostic driver copy and the reference were run by `variant_run.sh`, `ladder-with-histories.mjs`, `independent_reference.py` and `segment_containment.py` in the scratch directory.

| Receipt | Value |
| --- | --- |
| Commit measured | `6f869aaae4a62fcff8e11d957c8af0656c0a2a0b`; tree identifiers `src/eom` `8b9bd5ee`, `scripts/eom` `1a95a6a3`, `src/apps` `66966c5c` |
| SHA-256 of committed `CoupledEvolution.cpp` | `060e87f5fbce1fb3108200eb00cac5f72b24ad10362905f6c4d2e412b83640cb` |
| SHA-256 of committed `JointEndpointCorrector.cpp`, `Krawczyk.cpp` | `6722d969339c6afcdbbb333055d8f102ec53fc39361baff9364ce43ca5fb3d79`, `8e45748f3c12bed75251dbbbdf42072d24d385a6a120635064eb891d99f0cfdc` |
| SHA-256 of the driver and its process client | `b981d919f6b4f302ed451a97bbeed0b3ab8aecdc5b7f790fb7c0abb947e440ed`, `e1f85e11748990c5eef649487073e441fb845928f285811b5defbda997c0ddfc` |
| SHA-256 of `eom_borg_shadow_cli`, both builds | `3c0a21c1893577d8b01c0948bf346d2f38cea003028e80d59559c8998cec5aff` |
| Wall times | build $29.5$ s; control test $38.2$ s; driver $2$ to $4$ s; `ctest` $106.5$ s; each snapshot about $20$ s; stationary fixture $43$ to $81$ s |

**Where the evidence is kept.** The scratch directory is disposable, so the unique material was copied byte for byte, with `cmp` against the originals, and the originals were left in place.

- Authored instruments, tracked: [evidence/saturday-borg-six-path-2026-10-10/](../evidence/saturday-borg-six-path-2026-10-10/README.md), eight files with their byte counts and SHA-256 in its README: the reference, containment, ratio and exact-bound scripts, the request dump, the diagnostic driver copy, and the two shell helpers.
- Inputs, results and receipts, local: `.local-data/aaa-work-threads/saturday-serial/claude-i3/` relative to the repository root, 29 files and 7,317,751 bytes, listed with byte counts and SHA-256 in its `manifest.json` (6324 bytes, SHA-256 `5960b56b6b53da297050a37400363a8c7dcce1b0cee8b53df9223c0f4be8c027`). It holds the request dump, the three driver outputs and the output with histories, the reference, containment, ratio and exact-bound outputs, the control-test, `ctest` and build logs, and under `states/` the driver output of every exported commit and variant, the stationary-fixture outputs, and the one edited source file of the block-removed variant. Retrieval is by reading the manifest and recomputing hashes. This is local retention, not a backup.
- Not kept: exported sources and builds, which are regenerated from the named commits in a few minutes. Regenerated driver outputs differ in their timing fields; the claim-carrying fields are what the hash above covers.

**The two shell helpers are records, not a replay route.** `variant_run.sh` deletes a directory whose name is built from its first argument, with `rm -rf`, before it does anything else. `snapshot_run.sh` reuses an export and a build if they already exist, so it can run stale source or a stale binary without saying so, and it overwrites its earlier outputs. Both carry absolute paths of this checkout. They were used as described and should not be rerun. The README of the evidence directory gives hand instructions that start from a new empty directory, never delete a computed path, and never reuse a build. The commands listed at the top of this section that invoke `snapshot_run.sh` are a record of what was run, kept for that reason.

Every run was a foreground run that finished; no process from this stage remains.

## Limits

The reduction to static-field equations holds for this resting preparation on this short interval only. The independent check covers 41 sampled instants including the end time, not a continuous bound between them; the reference is a numerical solution with no certified error bound of its own; and the check concerns the published radii, not the Krawczyk margins of the accepted step, which the driver output does not expose. The repository's own independent oracle was not run on this row. The attribution of both effects to the ten-line block rests on builds of exported sources on today's toolchain, not on the binaries of September. The search for an existing record of the stationary-fixture failure covered Markdown under `reference/` and may have missed a record elsewhere. The reading of why the stationary fixture fails is inferred. Other seeds, path counts, steps and tolerances were not run.

## Proposed text for the owners (not applied)

Shared app-solver trackers and the solver directory have concurrent writers, so nothing was edited outside this note.

- **`src/eom/README.md`, the sentence on the strict six-path control:** "At commit `6f869aaae` the strict six-path full-population refinement control completes at steps `0.01`, `0.005` and `0.0025` with `strictControlPassed` true, following the bounded corrector recentering of 2026-09-15; the full Borg consumer gate remains open on the broader correctness and scale obligations above. The same recentering leaves `eom_stationary_joint_frontier_fixture` failing closed at its frontier replay; see the Saturday analysis of 2026-10-10."
- **App-solver work queue or priorities, one line:** "The six-path Borg step-0.01 Krawczyk halt recorded on 2026-08-30 no longer occurs at `6f869aaae`; it was removed by the corrector recentering in `2859fedfa`, and the accepted row agrees with an independent static-field integration. The same change makes the stationary joint-frontier native test fail closed. Analysis: `analysis/saturday-borg-six-path-certification-2026-10-10.md`."
- **Workstation analysis:** no change proposed to its dated measurement; a forward pointer to this note beside the sentence on the failed row would prevent it being read as current.
