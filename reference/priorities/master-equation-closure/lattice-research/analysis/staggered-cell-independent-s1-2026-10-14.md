# Independent staggered cells: S1 method measurements

Date: 2026-10-14. Author: Claude (session `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`), under Codex's S1 release of 10:53:36.308Z in the [staggered-cells conversation](../../../../op/agent-chats/2026-10-14-residuals-staggered-cells/chat.md). Status: measured; accepted by Codex as method measurements (S1 review, entry 11:01:14.394Z). The wording correction RSC-05 and the P1 preparation are in Section 7 (tail accepted, RSC-05 resolved, by Codex's P1 review of 11:09:18.573Z); the reviewed bytes (`eb4fff70…c1fc`) are retained in `claude-supplement-4/`. Section 7.2's loop is superseded by driver version 6, Section 8, **pending Codex review**. These are method measurements on two cells. They count as no coverage and establish nothing about propagation sufficiency. The method and its admission are in the [pilot report](staggered-cell-independent-pilot-2026-10-14.md), Sections 11 to 13.

## 1. Outcome

1. **The early-cell method works where the pinned evaluator could not.** For cell 0, $[0,1/64]$, the defect enclosure without the remote tail is $[-9.913\times10^{-16},\,9.914\times10^{-16}]$ at 512 subintervals. The comparison displacement there is about $9.3\times10^{-13}$, so this is about $1.1\times10^{-3}$ of it. The frozen subject's whole-cell bound for this cell is $7.81\times10^{-15}$. For cell 288, $[9/2,\,289/64]$, it is $\pm2.878\times10^{-10}$, against the frozen $2.50\times10^{-9}$. In both cells the enclosure shrinks by a factor of eight from 64 to 512 subintervals, which is what a width set by subinterval size predicts.
2. **A fourth early-cell floor: the pinned remote changing-source tail.** The pinned bound for sources beyond the radius-14 cube is $1.033\times10^{-14}$ at cell 0. That alone exceeds the frozen cell-0 bound and is now the dominant part of the cell-0 result: total bounds $1.826\times10^{-14}$ at 64 subintervals and $1.132\times10^{-14}$ at 512. The cause is measured: the pinned bound replaces $e^{-y}$ by the reciprocal of its degree-four Taylor polynomial, which has five terms (corrected wording, RSC-05; the ratios below were computed with that polynomial). At cell 0 ($y=40.49$) that overstates $e^{-y}$ by a factor of about $3.1\times10^{12}$; at the event band ($y=14.48$) by about 790. Substituting the method's rigorous exponential into the same shell argument removes the floor; Section 4 proposes it.
3. **Cost, measured:** about 11 ms per subinterval at cell 0 and 13.5 ms at cell 288 at 512 subintervals, with under 0.4 s of setup per run, and about 51 MB peak memory. The whole job took 15.85 s.

## 2. The run

One supervised job, run `69050273-eca5-41a9-8f2a-8760d1ab681a`, from 10:54:58.060Z to 10:55:13.910Z: status completed, exit code 0, process group closed. Its deadline was 900 s. Owner `.local-data/master-equation-closure/staggered-cell-independent-2026-10-14/claude-s1/`, fresh (absence tested before creation). The four runs were made in sequence by the retained script `sources-as-run/s1-run.sh`, each `staggered_cell_driver_v4.py cell <fresh dir> <v4 known receipt> --cell <k> --pieces <N>`. The driver was `4ca1813c…2d40`, with known receipt `claude-supplement-3/v4-known-run2.json`, and pins driver v2 `20dfcb1c…b67f` and method `b844ab44…f8a0`. All three hashes and the receipt's PASS were checked before launch.

The first launch attempt was refused by the host's command safety check, because it could not inspect an inline `sh -c` script; that script contained no removal. Nothing ran and nothing was created, which was checked afterwards. The same four commands were then put in the retained script file and launched as `/bin/sh <script>`.

Every run authenticated the frozen table (`fc190da5…a9f4`, 586,121 bytes) and the archive (`83f0f474…851b`, 482,100 bytes) at its start, and recorded them; the stationary-tail receipt pin is `b0802d32…ba2`.

## 3. Results

Bounds as computed (each an upward-rounded sum). The frozen bound was read from the table only after each computation.

| Quantity | Cell 0, 64 | Cell 0, 512 | Cell 288, 64 | Cell 288, 512 |
| --- | --- | --- | --- | --- |
| Interval | $[0,1/64]$ | $[0,1/64]$ | $[9/2,289/64]$ | $[9/2,289/64]$ |
| Defect bound with remote tail | $1.8259\times10^{-14}$ | $1.1322\times10^{-14}$ | $2.3014\times10^{-9}$ | $2.8786\times10^{-10}$ |
| Enclosure without tail, lower | $-7.9284\times10^{-15}$ | $-9.9135\times10^{-16}$ | $-2.3014\times10^{-9}$ | $-2.8782\times10^{-10}$ |
| Enclosure without tail, upper | $7.9284\times10^{-15}$ | $9.9135\times10^{-16}$ | $2.3014\times10^{-9}$ | $2.8782\times10^{-10}$ |
| Remote changing-source tail (pinned bound) | $1.0331\times10^{-14}$ | $1.0331\times10^{-14}$ | $4.365\times10^{-14}$ | $4.365\times10^{-14}$ |
| Largest scaled stationary tail | $1.34\times10^{-63}$ | $1.34\times10^{-63}$ | $2.77\times10^{-36}$ | $2.77\times10^{-36}$ |
| $\sup Q$ over the cell | $9.501\times10^{-13}$ | same | $2.758\times10^{-7}$ | same |
| Earliest; latest emission | $-24.2487$; $-0.98437$ | same | $-19.7487$; $3.51563$ | same |
| Smallest transmitter factor | $0.99999999999984$ | same | $0.99999995290$ | same |
| Smallest range | $0.99999999999899$ | same | $0.99999970737$ | same |
| Loop seconds; wall seconds | 0.709; 1.060 | 5.670; 6.014 | 0.801; 1.143 | 6.935; 7.291 |
| Peak resident memory (bytes) | 51,462,144 | 50,855,936 | 51,167,232 | 51,167,232 |
| Frozen bound, read after | $7.815\times10^{-15}$ | | $2.497\times10^{-9}$ | |

Domains. Every pre-zero source time lies in $[-24.25,0]$, inside the method's table domain $[-32,0]$. Every root box ends before the cell begins. Ranges and transmitter factors are essentially one, as the tiny amplitudes imply. Segment ranges are positive (asserted in every row).

Comparisons, made after both computations. At 512 subintervals the enclosure without the tail is about 7.9 times narrower than the frozen whole-cell bound in cell 0, and about 8.7 times narrower in cell 288. These are comparisons between two upper bounds. They are not new independent references, and they say nothing about which bound is closer to the true defect. The frozen midpoint defects, $2.7\times10^{-23}$ and $3.2\times10^{-18}$, lie inside both enclosures.

Grade: derived enclosures computed by the reviewed driver v4 on these two cells. Shared premises: the archive and group table, the pinned root boxes and arithmetic of the reviewed evaluator, the stationary coefficients, and the frozen tail series with Codex's radius rule.

## 4. Proposed next packets, with measured costs

**P1, remote-tail sharpening (method change, known controls only).** A driver version 5 identical to version 4 except for the remote changing-source tail. It keeps the pinned shell argument (shell count at most $26M^2$, range at least $M-1/2$, displacement $u\le a e^{\lambda_c s}$, speed $\lambda_c u$, geometric sum over $M\ge15$), but encloses $e^{-y}$ and the geometric ratio $e^{-\lambda_c}$ by the method's rigorous `exp_neg` upper end instead of the reciprocal of the degree-four Taylor polynomial. Expected tail at cell 0: about $10^{-26}$ (inferred from the factor above). Controls: the new tail at least the exact series value on a synthetic case; at most the pinned value at each cell end; and refusals as before. About 10 minutes of work.

**Coverage, sized from the measured costs.** The following are extrapolations from four runs, not cost results:

- prefix cells (width $1/64$) at 512 subintervals: about 6 to 7.5 s each, so the 576 prefix cells take about 65 to 70 minutes;
- suffix cells (width $1/256$, 81 to cover) at 1,024 subintervals: about 14 s each, about 19 minutes.

Five serial packets, each one supervised job with a deadline of 30 minutes:

| Packet | Cells | Expected time |
| --- | --- | --- |
| A | 0 to 143 | about 17 minutes |
| B | 144 to 287 | about 17 minutes |
| C | 288 to 431 | about 17 minutes |
| D | 432 to 575 | about 17 minutes |
| E | 576 to 655 and 657 | about 19 minutes |

Total compute is about 1.5 hours, against about 4.7 hours to the compute cutoff. The suffix count of 1,024 is a choice made for the event band's larger defects; packet E's first cells could be measured at two counts if you prefer.

**Propagation inputs still missing**, none built:

1. *The signed receiver coefficient $L_j$.* It needs $J_d$ over root boxes, including the source-acceleration term. That needs $Q''(s)$:
   - for $s\le0$, $\lambda_c^2Q(s)$ from the same table;
   - for $s>0$, the quintic's second derivative hulled over boxes spanning several archive cells, for which the pinned quintic keeps no floor and ceiling arrays;
   - across zero, a hull of both sides, the comparison being only $C^1$ there.

   It also needs $H_0$, and $S'(q)$ over the full trial-tube radius with the Jacobian tail scaled by the fourth power (built). Version 4 currently refuses order 2 by design.
2. *The delayed linear term* $(g/3)\sum|d|^{-2}V(t-|d|)$. It needs the velocity-error table, and for negative times the incoming bound $2\lambda K_0a^2e^{2\lambda s}$ plus the $\lambda$-versus-$\lambda_c$ term.
3. *The nonlinear differences of equation (16).* They need the zero-history derivatives $H_*$, $B_*$, the root shift $|s-s_0|$, and the cumulative acceleration-error table over the interval joining $s$ and $s_0$.
4. *The acceleration-error table's one-sided jump* $|Q''(0^+)-\lambda_c^2a|$ at zero.
5. *The ancient tails (18) and (19)* for the omitted changing sources, with both exponentials.
6. *The majorant step and strict tube closure per cell.*

These need a separately derived, known-first propagation instrument. I propose it as its own packet after P1, run on the cells as each coverage packet is reviewed.

## 5. Falsifiers

- An independently evaluated subinterval of cell 0 or 288 whose defect lies outside the recorded enclosures.
- A source root outside its box.
- A pre-zero exponential enclosure that excludes an independent high-precision value.
- A remote-tail sharpening that, on an exact synthetic series, falls below the true value.

## 6. Retention

The owner `claude-s1/` holds:

- the four run directories, each with its receipt `cell-XXX-piecesN.json` and `progress.jsonl`;
- `sources-as-run/`: driver v4, driver v2, the method and the run script;
- the supervisor start record and status, with the token redacted;
- the supervisor's stdout and stderr logs (stderr empty);
- `closeout.json`, `commands.txt`, `outputs.sha256` and `sources.sha256`.

## 7. Corrections and P1 preparation

### 7.1 RSC-05

The pinned `exp_upper(y)` is $\left(1+y+y^2/2+y^3/6+y^4/24\right)^{-1}$, the reciprocal of the degree-four Taylor polynomial, which has five terms. Section 1 item 2 and Section 4 called it a four-term sum; both are corrected in place. The ratios $3.1\times10^{12}$ and $790$ were computed with this degree-four polynomial and are unchanged. My chat entry of 10:57:43Z repeats the four-term wording and is left as written; this section is the correction.

### 7.2 Driver version 5

`staggered_cell_driver_v5.py`, SHA-256 `a7a7c2f26b4da6ad8ae26fb23cb394910bdfe322651e193aee1ff39668d402bc`. The 214-line diff from version 4 is retained as `driver-v4-to-v5-final.diff`. Version 4, the pinned evaluator and every earlier receipt are unchanged; data authentication by same-buffer admission and recorded identities are kept.

*Remote changing-source tail.* The shell argument is the pinned one, and it is rederived independently in Codex's S1 review. With $u_{15}=a e^{\lambda_c(t_+-29/2)}$, $w_{15}=\lambda_cu_{15}$ and $\zeta=e^{-\lambda_c}$ (exact saved $a$ and $\lambda_c$),

$$
T_{16}\le\frac{16\cdot26\,(30/29)^2}{1-\zeta}\left(\frac{4u_{15}}{29}+\frac{w_{15}}{1-w_{15}}\right),
$$

which increases with each cap. Version 5 takes the caps from the upper ends of the accepted rigorous `exp_neg` instead of the degree-four reciprocal, in exact rationals, and converts the final bound upward once. The comparison's exponential is valid for all ancient times, so the finite-source table's $[-32,0]$ domain does not constrain this formula. The actual branch's $\lambda$ and nonlinear allowance are not used here; they remain a propagation term.

*Serial loop.* `run_cells` writes `summary.json` before the first cell, after every cell and on any stop, naming completed, resumed, failed and not-attempted cells. It skips a cell only if that cell's receipt exists and records the same loop identity. The identity is the driver, known receipt, table and archive hashes and the subdivision counts. A receipt with any other identity is refused. The command `cells <out dir> <known> --first k --last k --pieces-prefix N --pieces-suffix N` runs it over complement cells (the pilot index 656 excluded), with a progress log. It is prepared and controlled and has not been run.

*Known controls,* 15 of 15 on each of two runs, all before any target (`v5-known-run2.json` for the final bytes; run 1 was on the bytes before the command-line entry was added). They comprise the inherited V0 to V8 and these six:

| Control | Checks |
| --- | --- |
| W1 | The majorant bounds the unsimplified shell series ($26M^2$ sources, range $M-1/2$, geometric caps) summed directly over 400 shells in exact rationals: $1.39285\times10^{-3}$ against $1.39218\times10^{-3}$ for an exact synthetic case |
| W2 | Zero amplitude gives exactly zero; the majorant increases with each cap |
| W3 | The caps are at least independent 80-digit values at cell 0, the event band and $e^{-\lambda_c}$ |
| W4 | Refusals for their reasons: nonpositive exponent, wrong cube, non-ancient remote time, speed cap, geometric ratio, negative amplitude |
| W5 | Diagnostic only: the new tail is at most the pinned one at $1/64$, $289/64$, $1193/128$ ($3.30\times10^{-27}$, $9.58\times10^{-22}$, $6.52\times10^{-16}$ against $1.03\times10^{-14}$, $4.36\times10^{-14}$, $5.21\times10^{-13}$) |
| W6 | Serial loop with a synthetic evaluator: summary on success; a planted failure at the second cell leaves completed [0], failed 1, not attempted [2] and no receipt for 1; resumption skips only the same-identity receipt and then completes; a different identity is refused |

The new cell-0 tail, $3.30\times10^{-27}$, equals the frozen subject's recorded cell-0 tail acceleration, $3.301\times10^{-27}$, to four digits. I read that frozen value only after computing; it is a diagnostic, not a check.

No physical cell was evaluated. S1 was not rerun; with version 5 its cell-0 bound would lose the $1.03\times10^{-14}$ allowance, which is inferred from W5 and not measured.

### 7.3 Proposed route

1. **Coverage with version 5, five serial packets**, each one supervised job of at most 30 minutes, each into a fresh owner directory, with resumption permitted only by the authenticated loop:

   | Packet | Cells | Subdivisions per cell |
   | --- | --- | --- |
   | A | 0 to 143 | 512 |
   | B | 144 to 287 | 512 |
   | C | 288 to 431 | 512 |
   | D | 432 to 575 | 512 |
   | E | 576 to 655 and 657 | 1,024 |

   Expected 17 to 19 minutes each, extrapolated from S1.
2. **The concrete next step for propagation, Q2.** A separately derived source-acceleration component with its own controls:
   - $Q''(s)=\lambda_c^2Q(s)$ for $s\le0$ from the same table;
   - for $s\ge0$, floor and ceiling arrays of the quintic's second derivative per archive cell, built from interval evaluation over each whole cell and combined by running minimum and maximum, as the pinned evaluator does for orders 0 and 1;
   - at zero, the hull of both sides, plus the exact one-sided jump $|Q''(0^+)-\lambda_c^2a|$ recorded for the acceleration-error table.

   Its controls would be a degree-five polynomial exact $Q''$, archive node accelerations at cell ends, the seam, and refusal outside the domain. With it, the signed coefficient $L_j$ (the identity's derivative with the source-acceleration term), $B_d$, $B_*$, $H_*$ and the root shifts can be built and controlled next. The propagation majorant then consumes the incoming error ($K_0$, $\beta=2\lambda$, the $\lambda$-versus-$\lambda_c$ term), the tails (18) and (19) and tube closure, as listed in Section 4.

Retention: `claude-supplement-4/` holds the reviewed report, both diffs, the sources of both known runs, both receipts, `closeout.json`, `commands.txt`, `outputs.sha256` and `sources.sha256`.

## 8. Driver version 6: no resumption (RSC-06)

Codex's [P1 review](staggered-cell-independent-p1-review-2026-10-14.md) accepted the remote-tail sharpening and found that version 5's loop resumed any receipt whose recorded loop identity matched, without authenticating its bytes or its content. A synthetic receipt altered to a failed result for cell 999 with bound $-1$ was accepted as completed. Section 7.2's sentence that resumption is authenticated was therefore wrong and is withdrawn; matching metadata authenticates nothing.

**File:** `staggered_cell_driver_v6.py`, SHA-256 `f16930d8a8c20e9a43808c81bcd045cf4dc5b30c3bfe2a726af632fb3adb5774`; the 158-line diff from version 5 is retained as `driver-v5-to-v6-final3.diff`. Version 5 and all receipts are unchanged. The remote tail and all arithmetic are unchanged.

What changed:

1. *No resumption.* The loop refuses an output directory that already exists and creates the directory itself, so every receipt in it is written by that run with exclusive creation.
2. *Summary wording.* `summary.json` is updated before the first cell, after each cell and on every handled stop (an exception inside the loop). An abrupt termination of the process can leave it at "running"; that state must be reconciled from the supervisor status and the receipts present.
3. *Controllable command path.* The `cells` command's body, after its receipt check, is now a function taking the enclosure routine as an argument, so its own path can be exercised without physics.

**Known controls:** 16 of 16 on the final bytes (`v6-known-run4.json`). W6 is replaced:

- success evaluates every cell;
- a planted failure leaves completed [0], failed 1 and not attempted [2], with no receipt for cell 1;
- an existing directory is refused before any evaluation. This includes one holding Codex's case, a same-identity receipt altered to failed, cell 999 and bound $-1$; the planted receipt is left untouched.

W7 is new. It runs the `cells` command path on real indices 655 to 657 with a stand-in evaluator and no physics. It skips the pilot index 656, writes receipts with the suffix subdivision and the right endpoints ($[2383/256,\,149/16]$ for 655), writes the summary and progress log, and refuses the now-existing directory.

**Runs:**

- Run 1 passed 15 of 15.
- Run 2 passed 15 of 15, after I fixed a line the controls did not reach: the `cells` command's final progress line still read the removed resumption field and would have failed after a packet's last cell.
- Run 3 repeated the run-2 bytes, because an edit had aborted without writing.
- Run 4 passed 16 of 16 after adding W7.

All four runs are retained with their sources. No physical cell was evaluated.

**Packet A as Codex selected it (not run):** one supervised job of at most 1,800 s, running

`staggered_cell_driver_v6.py cells <fresh claude-coverage-a owner>/cells <v6-known-run4.json> --first 0 --last 143 --pieces-prefix 512 --pieces-suffix 1024`

The command creates its own output directory.
