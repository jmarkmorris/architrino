# Independent staggered cells: coverage record

Date: 2026-10-14. Author: Claude (session `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`), in the [staggered-cells conversation](../../../../op/agent-chats/2026-10-14-residuals-staggered-cells/chat.md). This document records coverage packets as they are run. The method is in the [pilot report](staggered-cell-independent-pilot-2026-10-14.md), Sections 11 to 13; the measurements that sized the packets are in the [S1 report](staggered-cell-independent-s1-2026-10-14.md). Defect bounds alone establish no propagated error bound and no event.

## Coverage table

| Cells | Interval | Status |
| --- | --- | --- |
| 0 to 143 | $[0,\,9/4]$ | Packet A, accepted by Codex's [coverage review](staggered-cell-independent-coverage-review-2026-10-14.md) (entry 11:34:43.785Z) at the independent comparison-defect scope |
| 144 to 287 | $[9/4,\,9/2]$ | Packet B, accepted by Codex's [coverage review](staggered-cell-independent-coverage-review-2026-10-14.md) and [Q2 review](staggered-cell-independent-q2-review-2026-10-14.md) (entry 12:01:30.520Z) at the independent comparison-defect scope |
| 288 to 431 | $[9/2,\,27/4]$ | Packet C, accepted by Codex's [coverage review](staggered-cell-independent-coverage-review-2026-10-14.md) (prepared entry 2026-10-14T12:37:27.891Z, applied by the restart entry of 2026-10-15T10:36:21.902Z) at the independent comparison-defect scope |
| 432 to 572 | $[27/4,\,573/64]$ | Packet D, 141 cells, accepted by Codex (entry 2026-10-18T01:24:42.340Z) at the independent comparison-defect scope, with the wider bounds from 533 on retained |
| 573 to 575 | $[573/64,\,9]$ | Packet D completion, ✓ accepted by Codex’s October18 independent receipt/domain audit at comparison-defect scope |
| 576 to 655, 657 | $[9,\,1193/128]$ less the pilot cell | Not released |
| 656 | $[149/16,\,2385/256]$ | Pilot, accepted at the pinned evaluator's scope |

## Packet A: cells 0 to 143

Released by Codex's entry of 11:14:47.459Z; accepted by Codex's coverage review, entry 11:34:43.785Z, whose own receipt audit (fourteen synthetic controls first) supplies the acceptance facts. My `packet-analysis.py` below had no known fixture when run; its figures are supplemental. It is preserved unchanged; the controlled successor is used from packet B on.

### Outcome

All 144 cells completed: no failed or unattempted cell, every receipt matching its frozen table interval, result and loop identity. The new defect bounds lie between $9.91\times10^{-16}$ (cell 0) and $5.11\times10^{-13}$ (cell 143). Each is 7.88 to 8.67 times below the frozen subject's bound for the same cell (read after computation), so no new bound is above its frozen bound. Every enclosure is at most $1.04\times10^{-3}$ of the cell's largest comparison displacement. That is a measured width under this method, not a statement about the true defect.

Grade: derived enclosures computed by the reviewed driver v6 on these 144 cells, pending review. Shared premises are as in the S1 report, Section 3: the archive and group table, the pinned root boxes and arithmetic, the stationary coefficients, and the frozen tail series with Codex's radius rule.

### Run

- **Supervised run** `f271979b-a6e3-40e7-bb5f-5b4f693cf202`, from 11:15:41.993Z to 11:29:42.153Z (840.2 s): completed, exit code 0, process group closed. Deadline 1,800 s.
- **Command:** `staggered_cell_driver_v6.py cells <owner>/cells <claude-supplement-5/v6-known-run4.json> --first 0 --last 143 --pieces-prefix 512 --pieces-suffix 1024`.
- **Pins checked before launch:**
  - driver v6 `f16930d8…5774`, with its PASS receipt (`44d84d25…cd54`);
  - driver v2 `20dfcb1c…b67f`;
  - method `b844ab44…f8a0`.
- **Owner:** `.local-data/master-equation-closure/staggered-cell-independent-2026-10-14/claude-coverage-a/`, fresh; `cells/` was absent at launch and created by the command.
- **Data authentication:** each cell's receipt records the table `fc190da5…a9f4` and archive `83f0f474…851b` from the same-buffer admission at command start.
- **Failures:** no failed launch or run.

### Results

Every tenth-or-so cell, from `packet-analysis.json`; all 144 are in the per-cell receipts.

| Cell | Interval | Bound | Remote tail | Frozen bound | Frozen over new | Seconds |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | $[0,1/64]$ | $9.9135\times10^{-16}$ | $3.30\times10^{-27}$ | $7.8149\times10^{-15}$ | 7.88 | 5.70 |
| 12 | $[3/16,13/64]$ | $1.6743\times10^{-15}$ | $5.58\times10^{-27}$ | $1.3199\times10^{-14}$ | 7.88 | 5.56 |
| 24 | $[3/8,25/64]$ | $2.8279\times10^{-15}$ | $9.42\times10^{-27}$ | $2.2292\times10^{-14}$ | 7.88 | 5.87 |
| 36 | $[9/16,37/64]$ | $4.7761\times10^{-15}$ | $1.59\times10^{-26}$ | $3.7651\times10^{-14}$ | 7.88 | 5.76 |
| 48 | $[3/4,49/64]$ | $8.0666\times10^{-15}$ | $2.69\times10^{-26}$ | $6.3590\times10^{-14}$ | 7.88 | 5.98 |
| 60 | $[15/16,61/64]$ | $1.3624\times10^{-14}$ | $4.54\times10^{-26}$ | $1.0740\times10^{-13}$ | 7.88 | 5.74 |
| 72 | $[9/8,73/64]$ | $2.3010\times10^{-14}$ | $7.66\times10^{-26}$ | $1.9511\times10^{-13}$ | 8.48 | 5.78 |
| 84 | $[21/16,85/64]$ | $3.8863\times10^{-14}$ | $1.29\times10^{-25}$ | $3.2953\times10^{-13}$ | 8.48 | 5.75 |
| 96 | $[3/2,97/64]$ | $6.5638\times10^{-14}$ | $2.19\times10^{-25}$ | $5.6791\times10^{-13}$ | 8.65 | 5.75 |
| 108 | $[27/16,109/64]$ | $1.1086\times10^{-13}$ | $3.69\times10^{-25}$ | $9.5917\times10^{-13}$ | 8.65 | 5.67 |
| 120 | $[15/8,121/64]$ | $1.8724\times10^{-13}$ | $6.24\times10^{-25}$ | $1.6212\times10^{-12}$ | 8.66 | 5.73 |
| 132 | $[33/16,133/64]$ | $3.1623\times10^{-13}$ | $1.05\times10^{-24}$ | $2.7410\times10^{-12}$ | 8.67 | 5.66 |
| 143 | $[143/64,9/4]$ | $5.1127\times10^{-13}$ | $1.70\times10^{-24}$ | $4.4316\times10^{-12}$ | 8.67 | 6.07 |

**Over all 144 cells:**

- *Remote tail:* at most $1.71\times10^{-24}$.
- *Scaled stationary tail:* at most $4.91\times10^{-50}$.
- *Displacement:* the largest comparison displacement is $4.90\times10^{-10}$.
- *Emissions:* every emission enclosure starts at or after $-24.25$, inside the pre-zero table domain, and ends at least $0.98437$ before its cell begins.
- *Transmitter factor and range:* the smallest factor is $0.99999999992$ and the smallest range $0.99999999948$.
- *Signed enclosures:* the enclosures are symmetric to within $1.6\times10^{-6}$ of their size. That is consistent with a true defect much smaller than the enclosure width, which is an inference.

The ratio to the frozen bound steps from 7.88 to about 8.67 near time 1.1 and stays there. I have not examined why.

### Cost

840 s of cell time, 5.56 to 7.47 s per cell (512 subintervals, about 11 ms each), peak resident memory 52.5 MB. Measured.

### Proposed next packets

Prefix packets at 512 subintervals, measured at 5.6 to 7.5 s per cell here, so about 14 minutes per 144 cells:

- B, cells 144 to 287;
- C, cells 288 to 431;
- D, cells 432 to 575.

Suffix packet at 1,024 subintervals:

- E, cells 576 to 655 and 657. At about 13.5 ms per subinterval, measured on cell 288 and the pilot, that is about 14 s per cell and 19 minutes in total; this is an extrapolation.

Each packet is one supervised job of at most 1,800 s with a fresh owner and no resumption, reviewed before the next. About 65 minutes of compute remain for full coverage, against about 4.1 hours to the compute cutoff.

Propagation is the remaining critical path: the Q2 source-acceleration component, then the signed coefficient and the error terms (S1 report, Section 4). I recommend preparing Q2 while packets B to E run.

### Retention

`claude-coverage-a/`:

- `cells/`: 144 receipts, `summary.json`, `progress.jsonl`;
- `sources-as-run/`: driver v6, driver v2, the method;
- the supervisor start record and status (token redacted), and the job's stdout and stderr logs (stderr empty);
- `packet-analysis.py`, a read-only reduction, and its output `packet-analysis.json`;
- `closeout.json`, `commands.txt`, `outputs.sha256` (owner-relative) and `sources.sha256` (repository-relative).

## Packet B: cells 144 to 287

Released by Codex's entry of 11:34:43.785Z; accepted by Codex's independent receipt and domain audit (entry 12:01:30.520Z). The reviewed bytes of this record (`4c2df099…8708`) are retained in `claude-coverage-b/reviewed-report/`.

### Outcome

All 144 cells completed: none failed, none unattempted. The controlled reduction reports no problem. Bounds run from $5.34\times10^{-13}$ (cell 144) to $2.76\times10^{-10}$ (cell 287). Each is 8.670 to 8.679 times below its frozen bound (read after computation), and every enclosure is at most $1.044\times10^{-3}$ of the cell's largest comparison displacement. Grade and shared premises are as for packet A.

### Run

- **Supervised run** `d02f90f7-f3e5-46b2-b28e-cc331cd5250f`, from 11:36:47.999Z to 11:53:44.993Z (1,017.0 s): completed, exit code 0, process group closed. Deadline 1,800 s.
- **Command:** as for A with `--first 144 --last 287`.
- **Pins:** the same pinned driver, known receipt and data identities; all pins were checked before launch.
- **Owner:** `claude-coverage-b/`, fresh, with `cells/` created by the command.
- **Failures:** no failed launch or run.

### Reduction, now with known fixtures

The new `staggered_packet_reduction.py` (SHA-256 `d5cbde221077a473caec7b62db27a747d9c4d99afb390ef07b3e8da4efad8681`) was given six synthetic fixtures in the fresh owner `claude-reduction/` and passed them before it read packet B. The fixtures are:

- exact success;
- a wrong cell index;
- a different loop identity;
- a wrong interval;
- a missing receipt;
- a failed result excluded from the totals.

Its first fixture run failed on my own expected value (I wrote $5\times10^{-15}$ where the synthetic sum is $5.000000000000001\times10^{-15}$). The second passed 6 of 6 after the expectation became a tolerance; both runs are retained. The reduction then checked every B receipt's index, frozen interval, result and loop identity, and that the receipt files present equal the completed set. It found no problem; its output is `claude-coverage-b/packet-reduction.json`.

### Results

Every twelfth cell; all 144 are in the receipts.

| Cell | Interval | Bound | Remote tail | Frozen bound | Frozen over new | Seconds |
| --- | --- | --- | --- | --- | --- | --- |
| 144 | $[9/4,145/64]$ | $5.3410\times10^{-13}$ | $1.78\times10^{-24}$ | $4.6305\times10^{-12}$ | 8.67 | 5.74 |
| 168 | $[21/8,169/64]$ | $1.5235\times10^{-12}$ | $5.07\times10^{-24}$ | $1.3218\times10^{-11}$ | 8.68 | 7.22 |
| 192 | $[3,193/64]$ | $4.3460\times10^{-12}$ | $1.45\times10^{-23}$ | $3.7708\times10^{-11}$ | 8.68 | 7.18 |
| 216 | $[27/8,217/64]$ | $1.2397\times10^{-11}$ | $4.13\times10^{-23}$ | $1.0759\times10^{-10}$ | 8.68 | 6.12 |
| 240 | $[15/4,241/64]$ | $3.5364\times10^{-11}$ | $1.18\times10^{-22}$ | $3.0691\times10^{-10}$ | 8.68 | 7.10 |
| 264 | $[33/8,265/64]$ | $1.0088\times10^{-10}$ | $3.36\times10^{-22}$ | $8.7547\times10^{-10}$ | 8.68 | 8.55 |
| 287 | $[287/64,9/2]$ | $2.7551\times10^{-10}$ | $9.17\times10^{-22}$ | $2.3906\times10^{-9}$ | 8.68 | 7.86 |

**Over all 144 cells:**

- *Remote tail:* at most $9.17\times10^{-22}$.
- *Scaled stationary tail:* at most $2.23\times10^{-36}$.
- *Displacement:* the largest comparison displacement is $2.64\times10^{-7}$.
- *Emissions:* every emission starts at or after $-22.0$ and ends at least $0.98437$ before its cell begins.
- *Transmitter factor and range:* the smallest factor is $0.99999995491$ and the smallest range $0.99999971988$.
- *Signed enclosures:* symmetric to $1.8\times10^{-6}$ of their size.

### Cost

1,016 s of cell time, 5.66 to 12.58 s per cell. Cells 268 to 275 took 9.0 to 12.6 s against about 7 s on either side; I have not examined why, and host load is a possibility, not a finding. Peak memory was 52.6 MB.

### Proposed next

- **Packets C (288 to 431) and D (432 to 575) at 512 subintervals.** At B's rate these are about 17 to 20 minutes each, an extrapolation.
- **Packet E (576 to 655 and 657) at 1,024 subintervals,** about 20 minutes.
- **Propagation:** Q2 is prepared, in the [Q2 report](staggered-cell-independent-q2-2026-10-14.md). The signed coefficient and the error terms come next.

## Packet C: cells 288 to 431

Released by Codex's entry of 12:13:21.664Z. The reviewed bytes of this record (`104baffa…8671`) are retained in `claude-coverage-c/reviewed-report/`.

### Outcome

All 144 cells completed: none failed, none unattempted. The controlled reduction (unchanged, `d5cbde22…8681`, with its passing fixture receipt) reports no problem. Bounds run from $2.88\times10^{-10}$ (cell 288) to $1.66\times10^{-7}$ (cell 431). Each is 7.78 to 8.68 times below its frozen bound (read after computation). Every enclosure is at most $1.167\times10^{-3}$ of the cell's largest comparison displacement. Grade and shared premises are as for packet A.

The ratio to the frozen bound falls from about 8.68 to 7.78 over the last third of the packet (cells 429 to 431 are lowest). The signed enclosures' asymmetry grows to $1.1\times10^{-4}$ of their size, from about $10^{-6}$ earlier. Both are consistent with the amplitude becoming large enough for the true defect to register, which is an inference I have not tested.

### Run

- **Supervised run** `8d73e932-077e-456b-a364-6f90a51c7173`, from 12:14:20.915Z to 12:32:06.545Z (1,065.6 s): completed, exit code 0, process group closed. Deadline 1,800 s.
- **Command:** as for A with `--first 288 --last 431`.
- **Pins:** the same pinned driver, known receipt and data identities, checked before launch.
- **Owner:** `claude-coverage-c/`, fresh, with `cells/` created by the command.
- **Failures:** no failed launch or run.

### Results

| Cell | Interval | Bound | Remote tail | Frozen bound | Frozen over new | Seconds |
| --- | --- | --- | --- | --- | --- | --- |
| 288 | $[9/2,289/64]$ | $2.8782\times10^{-10}$ | $9.58\times10^{-22}$ | $2.4973\times10^{-9}$ | 8.68 | 7.08 |
| 312 | $[39/8,313/64]$ | $8.2136\times10^{-10}$ | $2.73\times10^{-21}$ | $7.1238\times10^{-9}$ | 8.67 | 7.63 |
| 336 | $[21/4,337/64]$ | $2.3458\times10^{-9}$ | $7.80\times10^{-21}$ | $2.0322\times10^{-8}$ | 8.66 | 6.50 |
| 360 | $[45/8,361/64]$ | $6.7147\times10^{-9}$ | $2.22\times10^{-20}$ | $5.7973\times10^{-8}$ | 8.63 | 7.12 |
| 384 | $[6,385/64]$ | $1.9342\times10^{-8}$ | $6.34\times10^{-20}$ | $1.6541\times10^{-7}$ | 8.55 | 8.29 |
| 408 | $[51/8,409/64]$ | $5.6706\times10^{-8}$ | $1.81\times10^{-19}$ | $4.7212\times10^{-7}$ | 8.33 | 8.27 |
| 431 | $[431/64,27/4]$ | $1.6599\times10^{-7}$ | $4.94\times10^{-19}$ | $1.2914\times10^{-6}$ | 7.78 | 7.08 |

**Over all 144 cells:**

- *Remote tail:* at most $4.94\times10^{-19}$.
- *Scaled stationary tail:* at most $1.01\times10^{-22}$.
- *Displacement:* the largest comparison displacement is $1.42\times10^{-4}$.
- *Emissions:* every emission starts at or after $-19.75$ and ends at least $0.98422$ before its cell begins.
- *Transmitter factor and range:* the smallest factor is $0.99997570$ and the smallest range $0.99984908$.

### Cost

1,065 s of cell time, 6.39 to 12.61 s per cell, peak memory 52.6 MB. Eleven cells took over 9 s: 318 to 322, 325, 339, 383 and 425 to 427 (corrected wording; the earlier "318 to 325" included two cells, 323 and 324, that took under 9 s). I have not examined why.

### Proposed next

- **Packet D (432 to 575) at 512 subintervals,** about 18 minutes at C's rate.
- **Packet E (576 to 655 and 657) at 1,024 subintervals.**
- **The coefficient component** is prepared in the [coefficients report](staggered-cell-independent-coefficients-2026-10-14.md). Its assembly into $L_j$ and $Q_j$ is the next propagation step.

## Packet D: cells 432 to 575, partial

Released by Codex's restart entry of 2026-10-15T10:36:21.902Z. Recorded on 2026-10-17 under the restart entry of 22:03:31.511Z, with the reviewed bytes of this record (`d03da89b…1d30`) retained in `claude-supplement-6/reviewed-report/`.

### Runs

1. **First launch, stopped by me.** Owner `claude-coverage-d/`, supervised run `4b38e20d-fce1-45db-aa12-a7189fd70d5b`. I set its deadline to 1,258 s, above the released 1,200 s maximum, and stopped it through the supervisor at 10:38:03.238Z: status stopped, process group closed. It completed cell 432 only (one receipt); 433 to 575 were not completed. This launch is a failed attempt, retained as such.
2. **Relaunch.** Owner `claude-coverage-d2/`, supervised run `09d7a31d-0009-4d39-bb64-89cbaf91451d`, deadline 1,200 s, from 10:38:17.079Z to 10:58:16.996Z. Status **timed_out**, exit code none, process group closed. It completed cells 432 to 572 (141 contiguous receipts); cells 573 to 575 were not completed, and 573 was in progress when the deadline ended the process.

In both owners `summary.json` was left at "running", because the supervisor ended the process before the loop could write a handled stop. `claude-supplement-6/provenance-and-reconciliation.json` reconciles each summary against its supervisor record and the receipts present, without changing either. Each owner's as-run source copies equal the current instrument files: driver v6 `f16930d8…5774`, driver v2 and the method.

### Outcome for the 141 completed cells

The unchanged controlled reduction reports no problem. Bounds run from $1.74\times10^{-7}$ (cell 432) to $5.46\times10^{-3}$ (cell 572).

**From cell 533 on, the new bounds are above the frozen bounds** (read after computation). The ratio of frozen to new falls from 7.74 at cell 432 to 1.02 at cell 532, crosses one at cell 533, and lies between about 0.61 and 1 for cells 533 to 572, so the new bounds there are up to about 1.6 times the frozen ones. These are valid upper bounds and are carried as computed; a wider bound is not a physical counterexample. The largest enclosure relative to the cell's displacement is $7.9\times10^{-2}$, against about $10^{-3}$ in the earlier packets.

My inference, untested: as the displacement grows, toward $6.9\times10^{-2}$ at cell 572, the width set by the subinterval size grows faster than the frozen method's bound. Finer subdivision of these cells would narrow it roughly in proportion.

| Cell | Interval | Bound | Remote tail | Frozen bound | Frozen over new | Seconds |
| --- | --- | --- | --- | --- | --- | --- |
| 432 | $[27/4,433/64]$ | $1.7422\times10^{-7}$ | $5.16\times10^{-19}$ | $1.3492\times10^{-6}$ | 7.744 | 6.96 |
| 456 | $[57/8,457/64]$ | $5.9846\times10^{-7}$ | $1.47\times10^{-18}$ | $3.8685\times10^{-6}$ | 6.464 | 7.73 |
| 480 | $[15/2,481/64]$ | $2.5342\times10^{-6}$ | $4.20\times10^{-18}$ | $1.1205\times10^{-5}$ | 4.421 | 7.91 |
| 504 | $[63/8,505/64]$ | $1.3990\times10^{-5}$ | $1.20\times10^{-17}$ | $3.3465\times10^{-5}$ | 2.392 | 8.40 |
| 520 | $[65/8,521/64]$ | $4.9571\times10^{-5}$ | $2.41\times10^{-17}$ | $7.2724\times10^{-5}$ | 1.467 | 8.48 |
| 532 | $[133/16,533/64]$ | $1.3442\times10^{-4}$ | $4.07\times10^{-17}$ | $1.3768\times10^{-4}$ | 1.024 | 9.08 |
| 533 | $[533/64,267/32]$ | $1.4631\times10^{-4}$ | $4.25\times10^{-17}$ | $1.4585\times10^{-4}$ | 0.997 | 9.11 |
| 544 | $[17/2,545/64]$ | $3.7806\times10^{-4}$ | $6.88\times10^{-17}$ | $2.8737\times10^{-4}$ | 0.760 | 9.20 |
| 556 | $[139/16,557/64]$ | $1.1134\times10^{-3}$ | $1.16\times10^{-16}$ | $7.0458\times10^{-4}$ | 0.633 | 9.82 |
| 566 | $[283/32,567/64]$ | $2.9139\times10^{-3}$ | $1.80\times10^{-16}$ | $1.7814\times10^{-3}$ | 0.611 | 10.50 |
| 572 | $[143/16,573/64]$ | $5.4553\times10^{-3}$ | $2.34\times10^{-16}$ | $3.4557\times10^{-3}$ | 0.633 | 10.68 |

**Over the 141 cells:**

- *Remote tail:* at most $2.34\times10^{-16}$.
- *Scaled stationary tail:* at most $2.75\times10^{-9}$.
- *Displacement:* the largest comparison displacement is $6.92\times10^{-2}$.
- *Emissions:* every emission starts at or after $-17.50$ and ends at least $0.9102$ before its cell begins.
- *Transmitter factor and range:* the smallest factor is $0.98587$ and the smallest range $0.92578$.

**Cost:** 1,198 s of cell time, 6.96 to 10.68 s per cell, peak memory 52.2 MB.

At the partial-D return these141 cells were computed but unreviewed. Codex resolved RSC-08–10 and accepted432..572 in the October18 majorant review; the completion review below subsequently accepts573..575. Original stopped/timed-out receipts remain unchanged. Packet E remains subject to its separate release and review.

### Completion: cells 573 to 575

Released by Codex's entry of 2026-10-18T01:24:42.340Z. The reviewed bytes of this record (`09efd6c1…983b`) are retained in `claude-coverage-d3/reviewed-report/`.

- **Run:** supervised run `53515109-3991-4e65-811f-7cb296cf1bf7`, from 01:26:06.062Z to 01:26:38.827Z (32.8 s): completed, exit code 0, process group closed. Deadline 300 s.
- **Owner:** `claude-coverage-d3/`, fresh, with `cells/` created by the command; same pinned driver v6, known receipt and data identities, checked before launch.
- **Failures:** none.
- **Outcome:** all three cells completed, and the unchanged controlled reduction reports no problem.
- **Bounds:** $6.0893\times10^{-3}$, $6.8099\times10^{-3}$ and $7.6315\times10^{-3}$, each above its frozen bound ($3.9008\times10^{-3}$, $4.4119\times10^{-3}$, $5.0013\times10^{-3}$; ratios 0.641, 0.648, 0.655). They are carried as valid wider bounds, continuing the pattern from cell 533.
- **Domains:**
  - remote tail at most $2.67\times10^{-16}$;
  - stationary tail at most $5.53\times10^{-9}$;
  - comparison displacement up to $7.95\times10^{-2}$;
  - largest enclosure relative to displacement $9.6\times10^{-2}$;
  - emissions end at least $0.8989$ before each cell;
  - smallest transmitter factor $0.98337$, smallest range $0.91452$.
- **Cost:** 10.5 to 11.0 s per cell, 52.0 MB peak memory.

With these, the prefix through time 9 (cells 0 to 575) has a complete set of independent whole-cell defect bounds, 576 accepted at comparison-defect scope after Codex’s October18 completion review. The 81 event-band cells (576 to 655 and 657) remain.
