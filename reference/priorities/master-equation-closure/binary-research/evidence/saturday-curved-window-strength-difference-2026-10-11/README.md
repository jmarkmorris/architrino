# Evidence for the curved-window strength-difference bound (2026-10-11)

This folder holds the one instrument written for the note [The difference of the two row strengths on curved delay windows](../../analysis/saturday-curved-window-strength-difference-2026-10-11.md), produced in the [quantitative round](../../../../../op/agent-chats/2026-10-11-saturday-quantitative-followups/chat.md) as its third task. The note's results are hand derivations. The instrument checks closed forms, kinematic inequalities and the transcription of constants on prescribed paths, and evaluates the note's constants in exact rational arithmetic. It establishes nothing about solutions of the Master Equation and is not independent evidence for the derivations.

## What the instrument is

[`strength_difference_check.py`](strength_difference_check.py) uses the Python standard library only (no NumPy, SciPy or mpmath). It takes one argument, the path of the JSON file it writes.

- **Paths.** Each member moves by a constant drift plus uniform circular motion, $\mathbf x(t)=\mathbf c+\mathbf Vt+\rho\,(\cos(\omega t+\varphi),\sin(\omega t+\varphi))$. Its acceleration has the constant magnitude $\rho\,\omega^2$, so the largest acceleration over any window is known exactly, and its speed never exceeds $\lvert\mathbf V\rvert+\rho\lvert\omega\rvert$. These paths are prescribed and do not obey the equation.
- **Rows.** The single partner root is found by bisection of $(t-s)-\lvert\mathbf X-\mathbf x_j(s)\rvert$, which is strictly decreasing in $s$ for a speed bound below $1$; 200 halvings. The formal row is then $\tau$, the unit vector $\mathbf n$ from the emission point to the receiver, $D=1-\mathbf n\cdot\mathbf v_j(s)$ and $a=1/(\tau^2D)$, with $c_f=1$ and unit reduced coupling. "Formal" means computed from the paths; the paths' own accelerations are not these rows.
- **Random numbers.** One generator, seed `20261011`, used in a fixed order.

## Order of work

A failed known case stops the run before any target and returns exit code 2.

| Stage | What is compared | Result of run 1 |
| --- | --- | --- |
| K1 | Closed-form tangent delay $T_i$, $E_i^0$ and $a_i^0$ of the note's Lemma S.1 against an independent bisection of $y=\lvert\boldsymbol\rho_i+\mathbf vy\rvert$; 400 states, speeds up to $0.95$ | largest scaled error $5.03\times10^{-14}$ against a threshold of $10^{-10}$; pass |
| K2 | Four hand values in exact fractions (stationary pair; transmitter 2 approaching along the axis at $3/5$; transmitter 2 moving across the axis at $3/5$; transmitter 1 receding along the axis at $3/5$ with the row received by member 2), against the path-root solver and the closed forms | largest error $8.9\times10^{-16}$ against a threshold of $10^{-12}$; pass |
| K3 | Straight uniform prescribed paths: formal rows against closed forms and $\zeta$ against $\zeta_0$; 400 pairs, speeds up to $0.9$ | largest scaled errors: delay $1.25\times10^{-14}$, $\tau D$ $2.7\times10^{-15}$, $r^2a$ $6.2\times10^{-15}$, $\zeta$ $6.5\times10^{-15}$, against a threshold of $10^{-9}$; pass |
| K4 | Eleven exact arithmetic controls of the rational evaluator and rounding | all true; pass |
| T1 | Kinematic core on curved prescribed paths: Lemma S.2 (both parts), Lemma S.3, Lemma S.4, first inequality of Proposition S.5, and its sum for $\zeta$; 2999 pairs with speed bounds up to $0.9$ and 3000 with bounds up to $0.32$; both rows of each | no failure beyond the allowances given below; largest left/right ratios $0.99999996$, $0.99999994$, $0.99966$, $0.398$, $0.324$, $0.229$ |
| T2 | Constants: (B1), (B2), $T_i\ge r/(1+w)$, $E_i^0\ge r\sqrt{1-w^2}$, and the right side of Proposition S.5 with $\bar a_j$ replaced by the (B4) majorant against $c(w)/(2r^3)$ and $c(w)/r$; 2999 states, $0.0202\le w\le0.3200$ | no failure beyond the allowances given below; largest ratios $0.9551$ and $0.9454$ |
| Table | $c(w)$, $\rho_Z(w)$, $\rho_e(w)$, their sum, $z_0(w)$ and $\rho_0(w)$ at nine rational $w$ | printed; see the note |

The K4 controls are: $c(0)=4$; the rational square-root bounds return $4/5$ exactly for $w=3/5$; the formula for $c$ gives exactly $100$ at $w=3/5$ (outside the theorem's range, used only as arithmetic with an exact square root); $\rho_e(0)=1$; $\rho_e(1/5)=81/4$; upward rounding of $1/3$ and $1/2$ to four decimals gives $0.3334$ and $0.5$; downward rounding of $2/3$ gives $0.6666$; upward rounding of $-1/3$ gives $-0.3333$; the square-root bounds at $w=1/10$ bracket $\sqrt{99/100}$ and differ by $10^{-41}$; and the decimal printer returns `0.3334`.

## How the table is made outward-safe

$w$ is an exact fraction $p/q$. $\sqrt{1-w^2}$ is enclosed between $s/(q\,10^{40})$ and $(s+1)/(q\,10^{40})$ with $s$ the integer square root of $(q^2-p^2)\,10^{80}$. The formulas are evaluated in exact fractions: the upper value of $c$ uses the lower square-root bound, and $\rho_Z$, $z_0$ and $\rho_0$ use the same; $\rho_e$ is an exact rational. Declared values are these exact upper values rounded up at the stated decimal place by integer division. No floating-point number enters a declared value. The column `c_float_comparison` in the output is a float evaluation printed for comparison only.

## What T1 and T2 can and cannot show

T1 tests kinematic statements that the note claims for every pair of paths, with the true largest acceleration over the window, so a violation would refute them and a pass on these samples is consistent with them. It does not test Theorem S1, because the theorem's last step bounds a solution's acceleration by the strength of the row it receives, which prescribed paths do not satisfy. T2 tests algebra: that the bound $K(w)\,\bar a_j/r$ follows from the first inequality of Proposition S.5 under a speed bound, and that $c(w)/(2r^3)$ is $K(w)/r$ times the (B4) majorant, as transcribed. Neither target tests a derivative, a period integral, Corollary S1.1 or Corollary S1.2. T1 and T2 sample random states; they do not cover the classes.

**Allowances and what a pass means.** The checks are floating-point comparisons with these acceptance allowances, read from the instrument's source.

- T1, each row check (Lemma S.2 both parts, Lemma S.3, Lemma S.4, first inequality of Proposition S.5): the left side may exceed the right by $10^{-9}$ times the right side plus $10^{-12}\,(1+r^{-2}+r)$.
- T1, the $\zeta$ check: $10^{-9}$ times the right side plus $10^{-11}$.
- T2: (B1), $T_i\ge r/(1+w)$ and $E_i^0\ge r\sqrt{1-w^2}$ with an allowance of $10^{-12}\,r$; (B2) with an absolute $10^{-12}$; the two chain comparisons with a relative $10^{-12}$. In T2 the constant $c(w)$ is a float evaluation of the formula, not the exact-rational table value.

The roots come from floating-point bisection, and the path positions and velocities, the acceleration magnitudes $\rho\,\omega^2$ and both sides of every inequality are floating-point numbers. None has a certified enclosure of its rounding error. A pass therefore means that no sampled state failed beyond the allowances above. It is not a certified inequality on each sampled exact path. The table of constants does not share this limit: it is computed in exact fractions, as described above.

## Run record

All work was on 2026-10-11 (UTC). The run went through the owned-compute supervisor in the foreground:

```text
node scripts/dev/owned-compute-supervisor.mjs run --owner-task <host session> --deadline-seconds 300 -- \
  /Users/markmorris/vibe/.venv/bin/python \
  reference/priorities/master-equation-closure/binary-research/evidence/saturday-curved-window-strength-difference-2026-10-11/strength_difference_check.py \
  .local-data/aaa-work-threads/saturday-quantitative/claude-task-3/run1.json
```

Run 1 was requested at 23:35:54.769Z and finished at 23:35:55.996Z: $1.16$ seconds of wall time by the supervisor's record, exit code 0, process group closed, nothing on standard error. It is the only execution of the instrument. Outputs are retained outside Git in `.local-data/aaa-work-threads/saturday-quantitative/claude-task-3/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `strength_difference_check.py` | 22,237 | `089acb2d8083d250d14bc86b954b22fb684c7f15cb38b99b1ea0a537c1db2261` |
| `history/strength_difference_check.pre-run-draft.py` | 22,524 | `067b01d31b26aa1faa9f2ca4a04ffe88d831dc000b4cb1ee80dd4765d7a62e66` |
| `run1.json` | 6,029 | `7533aa32e61ce5366e15e61324e6424ca355c518460cff8731becef50e5de641` |
| `run1.out` | 5,450 | `51852c80d08323db668b09071c36c081019132cf85f9f30728f181fc681087b4` |
| `run1.stderr.log` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `run1.supervisor.json` | 2,358 | `fc291908862b0f6e1f6e006a561958a4a6d9f2e3752ee9d38a6b607880cc24bc` |

`run1.out` and `run1.stderr.log` are copies of the supervisor's own log files for run id `23a39945-c5e1-40a6-98e3-dc64189ff416`. `run1.supervisor.json` is the supervisor's printed record, captured from its standard output. The empty file `run1.wrapper.err` beside them is the supervisor command's own standard error.

**Pre-run draft.** Before its only run the instrument was edited once, in two places: a comment in the K2 block was reworded, and the sampling lines at the start of T2 were simplified from "draw with budget $0.165$, then with probability one half redraw with budget $0.32$" to "draw the budget from $\{0.165,0.32\}$". The draft was never executed, and no output depends on it. It was not saved before the edit; `history/strength_difference_check.pre-run-draft.py` is a reconstruction made afterwards by reversing those two recorded replacements in the final file, and is kept so the change can be inspected. Because T2's sampling consumes random numbers differently in the draft, running the draft would give different T2 samples.

## Sources read for the instrument's conventions

The row follows the Master Equation's per-hit acceleration as reread on 2026-10-11: direction from the emission point to the reception point, transmitter-side factor with the transmitter's velocity at emission, weight $c_f/\lvert D_t\rvert$, attraction for unlike polarities. The instrument computes only strengths, delays and factors, so the sign of the acceleration does not enter it. The earlier frozen instrument `window_bounds_check.py` of the non-mirror note was not modified, imported or rerun.

## Corrections after review

The [Codex review](../../analysis/saturday-curved-window-strength-difference-codex-review-2026-10-11.md) requested three wording corrections, C1 to C3. Only C3 concerns this file: the acceptance thresholds and allowances are now stated where passes are reported, and a pass is described as no failure beyond them. The instrument, the reconstructed pre-run draft and every run output are unchanged, and nothing was rerun. The README as first reviewed was 8,949 bytes, SHA-256 `0943c0fa21b3fb21b2dd5a7bec599149281fbab4494868ff70b8ce1a9d99cae5`.
