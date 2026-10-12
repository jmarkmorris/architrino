# Evidence: Saturday non-mirror periodicity, task 3 (2026-10-11)

This directory holds the one session instrument used by the [task-3 note](../../analysis/saturday-nonmirror-periodicity-2026-10-11.md), and the recovered sources of its two earlier versions. The note's results are hand derivations. The instrument checks kinematic inequalities and the transcription of constants on prescribed paths. Prescribed paths do not obey the equation, so nothing here is evidence about solutions, and agreement with the instrument is not independent evidence for the derivations. This README was corrected after the [Codex review](../../analysis/saturday-nonmirror-periodicity-codex-review-2026-10-11.md) (findings N4 and N5); the instrument and its outputs were not changed.

## Instrument

`window_bounds_check.py` (10,608 bytes, SHA-256 `8a3b07926e8785f4f6a7d6c3484327326a2dc143c287389df75ce1d77fb23635`). Python standard library only, double precision, fixed seed `20261011`. It evaluates the single partner row of the canonical Master Equation with $c_f=1$, unit coupling and opposite polarity on analytic planar paths (constant drift plus up to three circular harmonics, with an analytic bound on the speed), solving the causal root by bisection.

**What the script's `rate` is.** `state()["rate"]` is the torque of the formal rows, $\mathbf r\times(\mathbf A_1-\mathbf A_2)$ with $\mathbf A_i$ the row computed from the prescribed paths. It is not the rate of change of the prescribed paths' own $J$, because those paths' accelerations are not the rows. Wherever this README or the script's comments say "rate", read "formal row torque". Comments inside the script that refer to "Theorem P" and "(H-b)" use working names from before the note was written; they correspond to Theorem E and to the pointwise inequality in the proof of Theorem F.

Order of execution, enforced by assertions so that a failed known case stops the run before any target:

1. **K1, known case.** 400 pairs of straight uniform paths: the formal row torque against the exploration's closed form $r\,dJ/dt=v_{1\perp}(1+v_{1\parallel}/S_1)-v_{2\perp}(1-v_{2\parallel}/S_2)$, and against the zero-curvature case of Theorem E's kinematic core, which is an equality.
2. **K2, known case.** The rigid mirror circle of radius $1$ and rate $0.5$: $\tau=1.800734445179$ and $\beta=\omega\tau/2=0.450183611295$, as recorded in the 2026-10-10 note.
3. **T1, target.** Lemma 3, and both sides of the kinematic core of Theorem E (formal row torque against the linear part plus or minus the allowance), on curved prescribed paths. Each path's own acceleration is evaluated at 41 equally spaced points of the window and the largest sampled value is used. This is a finite check. The sampled value cannot exceed the true maximum, so the tested inequality is stricter than the stated one; a pass certifies nothing between sample points.
4. **T2, target.** For paths with analytic speed bound below $0.32$:
   - the kinematic bounds (B1), (B2), (B3), (B5);
   - the row strength at 13 points of each window against the (B4) bound. This tests the row-strength form of (B4) at sample points. It does not test the paths' own accelerations against that bound; that identification holds only for solutions.
   - `lhs` against `expl`. `lhs` is not the formal row torque and not a rate. It is $r^2$ times the linear part `lin` $=r\,(a_2v_{1\perp}-a_1v_{2\perp})$, less the allowance computed with the (B4) row-strength bound `Bbar` substituted for the window's actual curvature. The check confirms that the explicit right side of the note follows from (B1) to (B4) by the stated algebra. It does not compare `q["rate"]` with the explicit inequality.
   - `gam`: $J/r$ less the allowance with the same `Bbar` substitution, against $(J-j_F)/r$.
   - `Hb`, for speed bound at most $0.1476$: $2a_i\cos\beta_i-\lvert\dot\vartheta\rvert\,\tau_j\,$`Bbar` $>0$, again with the substitution.
   The last three are conditional on (B4). They test transcription of constants, not Theorem E, Corollary E1 or Theorem F.
5. **T3.** Float evaluation of the constants quoted in the note. The positivity of $\kappa$ used in Theorem F's proof rests on the exact rational inequality in the note, not on these floats.

## Retained final run

Run on 2026-10-11, started 19:39:37.559Z and finished 19:39:39.514Z by the supervisor's record (1.967 seconds wall time), exit code 0. Outputs are retained outside Git in `.local-data/aaa-work-threads/saturday-followups/claude-task-3/`:

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `window_bounds_check.out` | 1,682 | `b246a95f73d7f235f3ad5e0069b7e44b93f8235f258d5b1db2a48dbfdb32be8c` |
| `window_bounds_check.json` | 2,330 | `19ce28bd982a0fdcbe43fc560f7212eec82c5b728309fcc0614bf27da740dee5` |
| `window_bounds_check.supervisor.json` | 2,353 | `3fdfe7b2ccf8de34df4466fae4ba14d2ea9ec4707223853f2335d6e2853ec560` |

Recorded results: K1 largest scaled errors $4.8\times10^{-15}$ and $5.1\times10^{-15}$; K2 $\tau=1.8007344451794949$, $\beta=0.45018361129487344$; T1 on 2399 samples, smallest normalised margins $0.0060$ (Lemma 3), $0.083$ (lower side), $0.094$ (upper side), formal torque positive in 1659 and negative in 740; T2 on 2033 samples, every margin positive, `expl` positive in 724, `Hb` on 1730.

## Earlier attempts and their recovered sources

| Attempt | Supervisor record (wall time) | Outcome |
| --- | --- | --- |
| 1 | 19:38:52.213Z to 19:38:52.602Z (0.404 s) | exit 1 at import; no result |
| 2 | 19:39:09.493Z to 19:39:10.620Z (1.139 s) | exit 0; 1500 general samples |
| final | 19:39:37.559Z to 19:39:39.514Z (1.967 s) | exit 0; 2400 samples |

An earlier statement, in the conversation entry of 19:46:46Z, that each run took under one second was wrong for attempts 2 and 3.

- **Attempt 1** imported `scipy.optimize.brentq`. The import failed with a dynamic-loader error on `scipy/sparse/linalg/_propack/_spropack.cpython-313-darwin.so`. The raw stderr is retained as `n5-additive-2026-10-11/window_bounds_check.attempt1-import-failure.stderr.log` (2,826 bytes, SHA-256 `1583267184c736e44a4e3011c81b46578345cce318452970a27d0b7125551f93`), and the supervisor record as `window_bounds_check.attempt1-import-failure.supervisor.json` (`cfe1a402a41e30f822687197a3d5e0a1b6da31786bae2d4fa8376eeec1223824`). This establishes that this import failed in this run. It does not establish the cause, and it does not establish that other SciPy modules or other instruments fail. The cause was not investigated and is unresolved; an earlier version of this README attributed it to an operating-system update without evidence. No environment change was made. The root solve was replaced by bisection and the import removed.
- **Attempt 2** ran the first complete version and passed. In it `expl` was positive in only 2 of 1134 T2 samples, so the algebraic check was exercised almost entirely where its right side is negative. A second family of 900 pairs with opposite transverse drifts at wide separation was then added, together with the `Hb` check. The known cases and the general family's construction were not changed, but one added random draw per pair changed the random sequence, so the general samples of attempt 2 are not the general samples of the final run. The final instrument cannot reproduce attempt 2's samples. Attempt 2's outputs are retained in `attempt2-before-coverage-extension/` (`window_bounds_check.out` `8b2192cdb4418042034a90f1212954f63d9169c508aa5b065d79014586a9d52f`, `window_bounds_check.json` `ce2aaf75c8b9aecf28d02e224b97deb5feec8aadb8d8d2800b41f2b3f51a846a`, `window_bounds_check.supervisor.json` `1688b6b0dc5953fb44f5ba8ddf36a6ada5c3b62ae8f4445e575f3c03840798a2`).

**Recovered sources.** The sources of attempts 1 and 2 were not saved as files when they ran. They were recovered at 19:57Z from the session transcript, which records the exact command that wrote the first version, by [`history/recover_sources.py`](history/recover_sources.py) (4,753 bytes, `de5a68faf4a03d03136ed20e771530bde5a9ace57a6989aa42265404f5b3d0ca`). That script passed a known SHA-256 case first, extracted the first version, applied the two recorded edits in order, and asserted that the result equals the final instrument byte for byte (it does: `8a3b0792…3635`). The transcript is outside the repository, so the recovery script documents the procedure and is not rerunnable from the repository alone.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| [`history/window_bounds_check.attempt1.py`](history/window_bounds_check.attempt1.py) | 9,397 | `143836829425be405f418c668e52a8e1d0afc2098f334893e5cee0ed15a4aa62` |
| [`history/window_bounds_check.attempt2.py`](history/window_bounds_check.attempt2.py) | 9,668 | `c42a5bf2362505417ad1ef06a97302b70ea85fc7cd0a8920eaaa92b07449cb42` |

As a check on the recovery, the recovered attempt-2 source was rerun once through the supervisor (1.223 s, exit 0). Its standard output and JSON are byte-identical to the retained attempt-2 outputs (same SHA-256 values as above). The rerun's files are in `n5-additive-2026-10-11/` (`attempt2-rerun.out`, `attempt2-rerun.json`, `attempt2-rerun.supervisor.json` `a3d86719cde697e042952dd0430ded8dd751a734576c71c1433997b231a671fd`). The recovered attempt-1 source was not rerun; its identity rests on the transcript extraction and the edit chain.

## Reproduce

From the repository root, with the shared environment:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/saturday-nonmirror-periodicity-2026-10-11/window_bounds_check.py .tmp/window_bounds_check.json
```

The run takes about two seconds and ends with `ALL PASSED`. The seed is fixed, so the printed margins should reproduce on the same interpreter and platform; small differences in the last digits on another platform would not change a pass. Replace the file name by `history/window_bounds_check.attempt2.py` to reproduce attempt 2.

## M2 continuation (added 2026-10-11, about 20:12Z by `date -u`)

The note's last section, the M2 continuation, is hand derivation only. No instrument was written, changed or run for it, and nothing in this directory tests Propositions H, I or K or the leading-order statements made there. The one check recorded in that section is an analytic comparison with the second reading's exact straight-window formulas for two prescribed paths of equal constant velocity. On those paths the actual accelerations are zero and the comparison uses the formal rows, so it checks only the algebraic relations H(2), H(3) and H(4) with the formal row torque. It does not test the evolution relations H(1) and H(5) or any period average. The section's one-turn figure is a formal calculation in an auxiliary model with prescribed fixed $r$ and $J$; it is not a solution, has no error bound, and nothing in this directory tests it (corrected after the Codex review's findings A1 to A3). The instrument, its outputs and the recovered sources listed above are unchanged.

## What this can and cannot establish

It can show that Lemma 3, the kinematic core of Theorem E and the kinematic bounds (B1), (B2), (B3), (B5) are not contradicted at the sampled points of these prescribed paths, and that the explicit constants in the note follow from (B1) to (B4) by the stated algebra. It does not test (B4) for accelerations, any statement about $dJ/dt$ of a solution, Proposition D (i) and (ii), Corollary E1, Theorem F or Corollary F1. No solution was integrated in this task.
