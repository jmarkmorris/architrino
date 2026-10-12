# Instruments of the stationary frontier diagnosis (2026-10-11)

This directory holds byte-for-byte copies of the three session instruments used by the [stationary frontier diagnosis](../../analysis/saturday-stationary-frontier-diagnosis-2026-10-11.md). They are records of what was run. They are not repository tests, they link or import no solver code, and they are not part of the solver or of its independent oracle.

| File | Bytes | SHA-256 | What it does |
| --- | ---: | --- | --- |
| `freeze_source.py` | 2150 | `bb5fc864b0fd25cba2ebe982a3568f5ea60092d28e1180b192d213c3bd60af40` | Copies `src/eom` and the two out-of-tree build inputs into a new directory, hashing every live file before and after the copy and every copy, and accepts the snapshot only if all agree. It refuses an existing destination. It writes nothing outside its destination and a manifest beside it. |
| `frontier_budget.py` | 10248 | `366c6903f715aacd0fe8289429332f8e93d5feb4e2d2ac5824ba1bf09c205a22` | Reads the fixture's own outputs and recombines the solver's **reported** budget components at the first rejected step in exact rational arithmetic; tabulates published radii against time for two sources; compares the nominal path with a separately written reference integration and with the oracle record. Unchanged since the first submission; see the annotations below. |
| `frontier_budget_coefficients.py` | 8095 | `28dfed35f0bbba5dae9551462999f384b7145612ef4f963e26b63cba7d508d33` | Added after review. Rebuilds the budget's inputs from the **coefficients and remainders** of the rejected-candidate dump: shared-symbol coefficients and independent remainders of both joint segments, nominal separation from the ordinary cubics, the nonlinear term and its domain condition, the ordinary-box budget, and a transmitter-factor floor from the source segment's nominal velocity. It takes no component from the solver's diagnostic string except for comparison. Same known case K1. |

## Known cases of `frontier_budget.py`

Run first; the script exits with status 1 if one fails.

- **K1.** The tabulated row of the [root-time budget theorem](../borg-current-root-time-budget-theorem-2026-07-20.md): residual widths $2.3358335487121392\times10^{-4}$ and $5.8451014205730445\times10^{-7}$ over the factor $1.0416561786956829$ must give the tabulated root-time width $2.2480341383515460\times10^{-4}$ to within $10^{-18}$. Obtained: $2.2480341383515447\times10^{-4}$.
- **K2.** A scalar integration of the stationary mirror release written in the instrument (unchanged row law, $c_f=1$, $K=0.2862286103053385$, half-separation $0.5$; fourth-order fixed step $10^{-4}$, quintic-Hermite history, Newton roots) must reproduce the terminal time and half-position of the separately authored [oracle record](../../../master-equation-closure/evidence/mec-007-stationary-mirror-incoming-oracle.v1.json) to $2\times10^{-7}$ and its checkpoint at $T=1.24$ to $10^{-8}$. Obtained: $2.9\times10^{-8}$, $2.2\times10^{-8}$ and $3.4\times10^{-11}$. The oracle record is read only.

## Annotations to the first instrument and its output (not edited)

The file `frontier_budget.py` and its retained output `analysis/frontier_budget.out` are kept byte-for-byte. Four of their labels are wrong or too strong and are corrected here.

- The output line "per-step acceptance limit on the full-step/half-step difference: 0.125 * position tolerance" is **wrong**. In the frozen source, $0.125$ of the tolerance is the threshold of `step_has_growth_headroom`, which only decides whether the next step may grow. The atomic step is rejected against the full position and velocity tolerances.
- The column and phrase "largest single-step radius increment" report differences between the published radii of successive segments. These are **not** the solver's local-error records, which the outputs used do not expose.
- The column headings "|nominal W - reference|" and "radius W / actual error" should read as the nominal path's difference from a numerical reference at sampled instants. Neither reference carries a rigorous error bound, so "actual error" is too strong.
- The instrument prints the diagnostic's `bracket half-width 0` and `centre residual 0` as "other terms". In the frozen `JointRootBracket.cpp` the routine returns after the failed root-time consumption **before** computing either; the zeros are default values, not evaluated quantities.

## What the second instrument found

Its retained output is `analysis/frontier_budget_coefficients.out`, listed with its digest in `manifest-supplement-1.json` in the local directory. Projected uncertainty from coefficients $4.1365991331\times10^{-6}$ against the solver's $4.1365991309\times10^{-6}$ (relative $5.4\times10^{-10}$, the rebuilt value the larger by $2\times10^{-15}$, unexplained); nonlinear term to $6.8\times10^{-7}$ relative; ordinary-box width to $8\times10^{-11}$ relative; domain condition satisfied. The solver reports the shared-symbol part as zero and the whole as remainder, whereas the dump has two shared symbols on the receiver; only the total enters the budget. The transmitter-factor floor is **not reproduced**: the solver's enclosure is wider by two ordinary velocity radii on each side, so its floor is the more conservative. The width exceeds the tolerance with the solver's floor, with the rebuilt floor and with the nominal factor.

Command: `python frontier_budget_coefficients.py run-W.stdout cc-W-candidate.json frontier_budget_coefficients.json`, from the directory holding the run outputs.

## Command

From the directory holding the run outputs, with the shared environment (`$AAA_VENV`, falling back to `../.venv` from the repository root):

`python frontier_budget.py run-W.stdout cc-W-candidate.json cc-V.stdout <oracle record> frontier_budget.json cc-W.stdout`

The arguments are the no-argument fixture output, the rejected-candidate dump, the trajectory output of the variant without the recentering block, the oracle record, the output file, and the trajectory output of the frozen source. It runs in a few seconds.

## Inputs and outputs

All run payloads, the frozen source (82 files: 80 under `src/eom` and the two out-of-tree build inputs), the variant patches, the build logs and the first instrument's output are retained in the ignored local directory `.local-data/aaa-work-threads/saturday-followups/claude-task-2/`: 70 files, 9,866,992 bytes, listed with sizes and SHA-256 in its `manifest.json` (12,537 bytes, SHA-256 `ce3f9b491e727c8b221a40df0707ed1813fc9b2fade294a4bd3bc731ab53616a`, unchanged since the first submission; the two files added afterwards are listed in `manifest-supplement-1.json`, which also records that the original 70 were verified unchanged), which also records the build and run commands, the source of each run and the supervisor run identifiers. This is local retention, not a backup, and is unavailable in a fresh checkout. The frozen live source is not reconstructible from Git, because it contains another session's uncommitted edits; it is kept there as `source/snapshot-W.tar` with its file manifest. The committed sources are reconstructible with `git archive` from the commits named in the manifest.

## Rebuilding safely

Follow the hand procedure in the [earlier evidence note](../saturday-borg-six-path-2026-10-10/README.md#repeating-the-work-safely): a new empty directory, `git archive` for committed sources, no deletion of computed paths. Two additions for this host. The default CommandLineTools SDK did not link on 2026-10-11, so pass `-DCMAKE_OSX_SYSROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk`; and commits from `3fa846aa9` on need the surface-constraint definition file as a build input, which `freeze_source.py` copies and the manifest's archive command names. Build only the target `eom_stationary_joint_frontier_fixture_cli`, in the foreground under the owned-compute supervisor with a deadline.

## Limits

*Truncation and continuous error:* the reference integration has a fixed step and no error enclosure; comparisons with it and with the oracle are at sampled instants and bound nothing between them. *Roundoff:* the budget reconstruction is exact rational arithmetic on the decimal components the solver reports; those components are the solver's own outward-rounded doubles, and the reference integration is double precision without an enclosure. *History:* radii are read at accepted times from the fixture's frames and from one rejected-candidate dump. The instruments check the solver's reported budget against the theorem and against its own retained coefficients; they do not show that the admitted displacement set contains the true displacement, do not certify the solver's enclosures and are not an oracle for it. Agreement of sampled nominal positions with numerical references is not a proof of enclosure or of tightness.
