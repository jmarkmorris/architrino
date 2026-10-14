# Independent event cells: serial chain, cells 0 to 7

Date: 2026-10-12. Author: Claude (session `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`), under Codex's release entry of 19:18:57.113Z in the [event-cells conversation](../../../../op/agent-chats/2026-10-12-residuals-event-cells/chat.md). Status: cells 0 to 7, 8 to 15 and 16 to 23 reviewed and accepted by Codex (entries of 19:34:00.699Z, 19:42:49.431Z and 21:14:42.036Z, at the pilot's shared-input boundary); cells 24 to 30 computed under the third entry's release and **pending Codex review** (Section 15). All 31 cells are now computed as one chain. No event extraction has been done and event sufficiency is undecided. Method, derivations and the shared-input boundary are in the [pilot report](event-cell-independent-pilot-2026-10-12.md); this document records only the chain runs and does not repeat them. Sections 1 to 7 and 10 to 12 are the reviewed record of the first packet and are unchanged except for this paragraph, the coverage table in Section 8 and one added line in Section 12; the reviewed bytes (`afcd7469…c582`) are retained in the second packet's owner. Section 13 is the reviewed record of the second packet and is unchanged; the bytes reviewed with it (`7da14523…6800`) are retained in the third packet's owner. Section 14 is the reviewed record of the third packet and is unchanged; the bytes reviewed with it (`4fbc44db…29cd`) are retained in the fourth packet's owner.

## 1. Outcome

The first eight of the 31 load-bearing cells, $[5+k/64,\,5+(k+1)/64]$ for $k=0,\dots,7$, were evaluated in sequence in one supervised process. Each cell's defect $\rho$, receiver coefficient $\lambda$ and inherited source-history term $q$ in $|e''|\le\lambda|e|+q+\rho$ were enclosed for all 1,502 receivers, and the position and velocity error majorants were carried from each cell into the next. All eight tubes closed on the first radius; no cell failed; the run stopped after cell 7 as released. Cell 8 was not started and no event extraction was done.

Two things a reviewer should know first.

1. **The propagated majorants are not uniformly below the frozen subject's.** Their maxima over receivers are lower in every cell, but at 648 to 686 receivers per cell the new position majorant is above the frozen one, by at most $1.1\times10^{-5}$ at the end of cell 7 (frozen maximum there $1.712\times10^{-3}$), and that excess grows from cell to cell. The cause is the per-receiver $\rho$, which from cell 1 onward is larger than the frozen per-receiver value at 668 to 796 receivers. Both are upper bounds, so this is no contradiction; it means the new chain cannot be assumed to reproduce the frozen event margins, and that question stays open until all 31 cells are propagated and a separate extraction is done.
2. **Grade.** The enclosures are derived (interval arithmetic with outward rounding, complete over each cell) conditional on the shared inputs in Section 9. Times and memory are measured, by the instruments named beside them. The comparison with the frozen values in Section 6 is a reading of two saved tables, nothing more.

## 2. What was run

One command, from the instrument directory `reference/priorities/master-equation-closure/lattice-research/evidence/event-cell-independent-2026-10-12/`, under `scripts/dev/owned-compute-supervisor.mjs run` with a 1,140 s deadline:

`python -B event_cell_chain_v2.py target 0 7 <owner>/chain <supplement-3>/known-v4-run1.json --sub 1 --incoming chain`

with the shared venv interpreter, owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-chain-0-7/` (fresh), and `<supplement-3>` the reviewed owner `claude-supplement-3/`.

| Item | SHA-256 |
| --- | --- |
| `event_cell_chain_v2.py` (reviewed) | `b98aea55122d28a0b65b753489b1c2045695df7e17b110f1d59fd0263e1245bd` |
| `event_cell_serial.py` | `71de6c772f2d6c47651a20635f320efc00cf7f18f375c834afa85639cb352ce1` |
| `event_cell_core_v2.py` | `0f86c42d745abb77bbed69f01e8961bc9454e267362716ce7841271634ce7c16` |
| `event_cell_known_v4.py` (reviewed) | `ea2bc74645d3ec92e0da8d61be9383301249a59a8163932a09afff5192558a00` |
| `known-v4-run1.json`, the pinned passing receipt | `9e4f98b6290da8e7e2523df44b08adc98cfc28297ead405a2d805e5aaa2347c2` |
| Receivers, `next-event/evolution/cross-reference/reference.npz` | `97aa2156bae5557dd19dc7072bc973e1e2e6d33d4b60da3584fbb730172f13ac` |
| Sources, `post-restart/approximant/population-h21-4.npz` | `b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988` |
| Census, `next-event/history/census.npz` | `41bf6aa3ab31969805c63f213e93a8f2a0fa33ad92204841b8488acbe183be70` |
| Stationary input, `next-event/residual/full-stationary-input.json` | `08d73efda9b21a6645c6756e6c67f510e692bea6eb1105d8b9bf2ce82a1d0b56` |
| Accepted error table, `next-event/continuation/prefix-refinement4.npz` | `467aeec7cd3a38688e0dae4b5840dea3e8bdd3ae0c305ec9388791d2baef5a22` |
| Frozen subject, `next-event/continuation/event-comparison.json` (identities; comparison in Section 6) | `48e9d227e70314f45e6563a5d49ca4262d49a8bc248a320578e2deca6a4516d1` |
| Frozen residual rows, `next-event/residual/residual-polynomial.json` (Section 6 only) | `d2e25f2e9a3ce1c6f0e667b3c085f95f814aa9111bcda1a230f4ce44e7c31ed7` |

All input paths are under `.local-data/master-equation-closure/` and were opened read-only. The instrument hashes were checked before launch; the runner itself refuses other bytes of the serial driver, the core and the receipt. Copies of the three instruments as run are in `sources-as-run/`.

Known cases: none were rerun for this packet. The pinned receipt is the reviewed passing run of the ten chain-runner controls, which in turn pins the passing 34-case receipt for the arithmetic.

## 3. Start state

Cell 0 takes its incoming majorants from the accepted through-five error table's entry at time five (row 320 of 321), mapped to the 1,502 receivers by exact lattice identity. 1,350 receivers are present in that table. The other 152 are absent and start at zero, each after the runner's check that its initial jet is exactly zero and its first front cannot arrive before five. Largest incoming position majorant $9.921827453216576\times10^{-4}$; largest incoming velocity majorant $4.27323514253792\times10^{-3}$. The reduction script confirms that cell 0's saved incoming arrays equal this mapping exactly.

No value of the frozen subject's later profile enters the chain.

## 4. Results by cell

Each figure is the maximum (or, where named, the minimum) over all 1,502 receivers of a rigorous bound valid on the whole cell. "Latest emission" is the largest upper end of any causal-root enclosure. "Smallest range" and "smallest factor" are lower bounds of the source-to-receiver distance and of $1-\mathbf{n}\cdot\mathbf{v}$ over every evaluated row, taking the smaller of the $\rho$ pass and the $\lambda$, $q$ pass. "Displacement with error" is the largest receiver displacement including the tube, which must stay below the $7/20$ domain. Decimal figures are rounded outward where they are bounds: upward for maxima, downward for minima.

| Cell | Interval | Latest emission | Smallest range | Smallest factor | $\rho$ max | $\lambda$ max | $q$ max | Position majorant out | Velocity majorant out | Smallest tube margin | Displacement with error |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | $[5,\,321/64]$ | 4.0801 | 0.9355 | 0.9869 | 0.003353 | 4.2197 | 0.011001 | 0.00106114 | 0.00455334 | $1.77\times10^{-5}$ | 0.06261 |
| 1 | $[321/64,\,161/32]$ | 4.0981 | 0.9331 | 0.9861 | 0.003609 | 4.6044 | 0.011707 | 0.00113466 | 0.00485777 | $1.75\times10^{-5}$ | 0.06500 |
| 2 | $[161/32,\,323/64]$ | 4.1162 | 0.9306 | 0.9853 | 0.003906 | 5.0377 | 0.012600 | 0.00121316 | 0.00519119 | $1.73\times10^{-5}$ | 0.06745 |
| 3 | $[323/64,\,81/16]$ | 4.1344 | 0.9281 | 0.9844 | 0.004242 | 5.4958 | 0.013423 | 0.00129711 | 0.00555585 | $1.71\times10^{-5}$ | 0.06998 |
| 4 | $[81/16,\,325/64]$ | 4.1527 | 0.9254 | 0.9834 | 0.004620 | 5.9908 | 0.014219 | 0.00138704 | 0.00595668 | $1.68\times10^{-5}$ | 0.07259 |
| 5 | $[325/64,\,163/32]$ | 4.1714 | 0.9224 | 0.9826 | 0.005047 | 6.5578 | 0.015199 | 0.00148355 | 0.00639894 | $1.65\times10^{-5}$ | 0.07527 |
| 6 | $[163/32,\,327/64]$ | 4.1906 | 0.9188 | 0.9816 | 0.005532 | 7.1854 | 0.016197 | 0.00158738 | 0.00689215 | $1.61\times10^{-5}$ | 0.07802 |
| 7 | $[327/64,\,41/8]$ | 4.2099 | 0.9151 | 0.9805 | 0.006082 | 7.8792 | 0.017451 | 0.00169932 | 0.00743971 | $1.56\times10^{-5}$ | 0.08125 |

Every emission enclosure ends before time five, so every source value used lies in the accepted history; the source-domain requirement of the pilot report holds with room on these cells. In every cell the incoming majorant is inside the tube, the outgoing majorant is strictly inside it, and the displacement with error is below $7/20$ (all three asserted by the runner and recorded true). Full-precision values are in `chain/summary.json` and `packet-analysis.json`.

Tails. The stationary tail added to $\rho$ is at most $5.6\times10^{-9}$ and the derivative tail added to $\lambda$ at most $3.8\times10^{-7}$ in every cell; both grow slowly with the cell index.

## 5. Row accounting

The union has 149,046 receiver-source rows. A row is left out only when its whole initial root enclosure ends at or before the smaller of the comparison history's exactly-zero prefix and a lower bound of the actual first front, in which case it contributes exactly zero to $\rho$ and to $\lambda$ and carries zero source error. Nothing is left out by size or by sampling. The $\rho$ pass is evaluated per Hermite piece, so its count is a range over the pieces of the cell.

| Cell | $\rho$ rows evaluated (least to most over pieces) | $\rho$ rows left out (least to most) | $\lambda$, $q$ rows evaluated | $\lambda$, $q$ rows left out | Rows with an active pulse | Seconds |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 69,144 to 69,778 | 79,268 to 79,902 | 69,784 | 79,262 | 192 | 18.0 |
| 1 | 69,780 to 69,992 | 79,054 to 79,266 | 69,992 | 79,054 | 384 | 18.1 |
| 2 | 69,992 to 70,900 | 78,146 to 79,054 | 70,932 | 78,114 | 384 | 18.6 |
| 3 | 70,968 to 71,680 | 77,366 to 78,078 | 71,708 | 77,338 | 240 | 19.8 |
| 4 | 71,724 to 72,602 | 76,444 to 77,322 | 72,666 | 76,380 | 240 | 18.4 |
| 5 | 72,666 to 74,552 | 74,494 to 76,380 | 74,714 | 74,332 | 240 | 18.3 |
| 6 | 74,828 to 77,960 | 71,086 to 74,218 | 77,992 | 71,054 | 336 | 19.1 |
| 7 | 77,970 to 78,134 | 70,912 to 71,076 | 78,150 | 70,896 | 336 | 20.8 |

In each row of the table, evaluated plus left out equals 149,046. The evaluated count rises with the cell index because more first fronts have arrived.

## 6. Comparison with the frozen subject, read only

This section reads the frozen subject's per-receiver $\rho$ (`residual-polynomial.json`, `per_path_residual`) and its per-cell $\lambda$, $q$ and outgoing majorants (`event-comparison.json`, `profiles`) and compares them receiver by receiver with the new arrays. It is done by `packet-analysis.py` after the run; nothing from it enters the chain. Figures here are plain readings, rounded to the digits shown.

| Cell | $\rho$: new max; frozen max; receivers where new is above; largest excess | $\lambda$: new max; frozen max; receivers above | $q$: new max; frozen max; receivers above | Position majorant out: new max; frozen max; receivers above; largest excess | Velocity majorant out: new max; frozen max; receivers above; largest excess |
| --- | --- | --- | --- | --- | --- |
| 0 | 0.003353; 0.01631; 676; 0.00098 | 4.220; 4.296; 0 | 0.01100; 0.01101; 0 | 0.00106113; 0.00106232; 648; $1.1\times10^{-7}$ | 0.00455333; 0.00470568; 648; $1.4\times10^{-5}$ |
| 1 | 0.003608; 0.002202; 796; 0.0016 | 4.604; 4.742; 0 | 0.01171; 0.01171; 0 | 0.00113465; 0.00113811; 650; $5.0\times10^{-7}$ | 0.00485777; 0.00499527; 706; $3.6\times10^{-5}$ |
| 2 | 0.003906; 0.002419; 740; 0.0017 | 5.038; 5.152; 0 | 0.01260; 0.01261; 0 | 0.00121315; 0.00121863; 674; $1.2\times10^{-6}$ | 0.00519118; 0.00531333; 686; $5.8\times10^{-5}$ |
| 3 | 0.004242; 0.002687; 728; 0.0018 | 5.496; 5.571; 0 | 0.01342; 0.01343; 0 | 0.00129710; 0.00130437; 674; $2.3\times10^{-6}$ | 0.00555584; 0.00566181; 686; $8.2\times10^{-5}$ |
| 4 | 0.004620; 0.003015; 708; 0.0019 | 5.991; 6.069; 0 | 0.01422; 0.01422; 0 | 0.00138703; 0.00139583; 686; $3.8\times10^{-6}$ | 0.00595667; 0.00604644; 694; $1.1\times10^{-4}$ |
| 5 | 0.005047; 0.003412; 668; 0.0020 | 6.558; 6.622; 0 | 0.01520; 0.01521; 0 | 0.00148355; 0.00149361; 686; $5.7\times10^{-6}$ | 0.00639893; 0.00647210; 676; $1.4\times10^{-4}$ |
| 6 | 0.005531; 0.003873; 684; 0.0020 | 7.185; 7.381; 0 | 0.01620; 0.01620; 0 | 0.00158737; 0.00159847; 678; $8.1\times10^{-6}$ | 0.00689214; 0.00695189; 662; $1.7\times10^{-4}$ |
| 7 | 0.006082; 0.004401; 724; 0.0021 | 7.879; 8.064; 0 | 0.01745; 0.01746; 6; excess $1.5\times10^{-5}$ | 0.00169932; 0.00171125; 666; $1.1\times10^{-5}$ | 0.00743971; 0.00748600; 662; $1.9\times10^{-4}$ |

What this shows, and what it does not.

- $\lambda$ is at or below the frozen value at every receiver in all eight cells. $q$ is at or below it everywhere except six receivers in cell 7, by at most $1.5\times10^{-5}$.
- From cell 1 on, the largest new $\rho$ is about 1.4 to 1.6 times the largest frozen $\rho$, and the new value is the larger one at roughly half the receivers. In cell 0 the frozen maximum is the larger, but the new value is still above the frozen one at 676 receivers.
- Consequently the new majorants exceed the frozen ones at roughly 45 percent of receivers, and the largest position excess grows with every cell: $1.1\times10^{-7}$, $5.0\times10^{-7}$, $1.2\times10^{-6}$, $2.3\times10^{-6}$, $3.8\times10^{-6}$, $5.7\times10^{-6}$, $8.1\times10^{-6}$, $1.1\times10^{-5}$ at cells 0 to 7.
- I have not determined why the new $\rho$ is larger where it is. Candidate explanations, none tested: the two instruments enclose different things over a cell (this one bounds the defect on the whole cell by direct interval evaluation per Hermite piece; the frozen one is a polynomial residual bound), or interval overestimation here, which a finer subdivision (`--sub 2` or more) would reduce at proportionate cost. This is a guess about cause, not a finding.
- Nothing here says whether the event margins of the frozen argument survive under the new chain. That needs cells 8 to 30 and a separate extraction.

## 7. Chain continuity and the saved state

Checked by `packet-analysis.py` on the saved files, all true: cell 0's incoming arrays equal the accepted-table mapping exactly; for each of cells 1 to 7 the incoming position and velocity arrays equal the preceding cell's outgoing arrays exactly; every cell is marked counted; every tube closed on its first attempt; the chain state's arrays equal cell 7's outgoing arrays and its next cell is 8; the state file matches the digest recorded in `chain-state.json`; the predecessor file matches its recorded digest.

| File in `claude-chain-0-7/chain/` | SHA-256 |
| --- | --- |
| `cell-00.npz` | `505e549e99e68ad94bf5503f7d33f4a9c716cc0b34e51f6bd11e95e6cf6b0ef6` |
| `cell-01.npz` | `5cf8b0826fef5c46992dd849a320700b7f38dc10643fd668687e7c68565bb64a` |
| `cell-02.npz` | `c6cc1e1325502363ae4198c73f710d50ce52216702cb407651cdd763dca2de48` |
| `cell-03.npz` | `71b946680cffcd008e68a6d7a2d7b840e06557f20833e45ca2b4784cd2aaf4c4` |
| `cell-04.npz` | `bc293687fa0add68e36afa1bbcc507e5ade5814a7f9849cd9a4bce459bdb4528` |
| `cell-05.npz` | `5d6a776b53d4dc6319c1a5ed3192b3ba9ceeea12656c3a7612be5bd545c9a3e5` |
| `cell-06.npz` | `e34b2ff0469805fb6b735deb34e0531b017b360af8f104fdf0ddd793dbd1f4e9` |
| `cell-07.npz` | `7dadf5a696426c17111dc50bb5349d69e3d44b87f7d19d163a780a0f71b8bd74` |
| `chain-state.npz` (next cell 8) | `1435ad3b598f8fc231b3b1ee514df9413a82f5dd2c4c084d4248e465d1f55bfc` |
| `chain-state.json` | `2038779f472ffdc3d574a5e0f9f68780932173c4fe2bed4bb298ca2587eba94a` |
| `summary.json` | `c79d353c65f4e0832989cb8f9e94ef524c2e3727079383c41b1fbfc741e8a35e` |

Each cell file holds, for the 1,502 receivers: identities, `rho`, `lam`, `q`, the exact `tube` used for $\lambda$ and $q$, `P_in`, `V_in`, `P_out`, `V_out`, `A_out`, and the comparison position, velocity and acceleration boxes over the cell. `packet-analysis.json` gives a digest of the raw bytes of each of the nine bound arrays in each cell.

A later batch must resume with `--state <this chain directory>` and first cell 8; the runner refuses any other first cell, changed state or changed predecessor.

## 8. Coverage of the 31 cells

| Cells $k$ | Interval | Status |
| --- | --- | --- |
| 0 to 7 | $[5,\,41/8]$ | Computed as one consistently propagated chain from the accepted time-five table; all 1,502 receivers per cell; reviewed and accepted by Codex |
| 8 to 15 | $[41/8,\,21/4]$ | Computed, resumed from the reviewed saved state of cells 0 to 7; all 1,502 receivers per cell; reviewed and accepted by Codex (Section 13) |
| 16 to 23 | $[21/4,\,43/8]$ | Computed, resumed from the reviewed saved state of cells 0 to 15; all 1,502 receivers per cell; reviewed and accepted by Codex (Section 14) |
| 24 to 30 | $[43/8,\,351/64]$ | Computed, resumed from the reviewed saved state of cells 0 to 23; all 1,502 receivers per cell; pending Codex review (Section 15) |

The earlier evaluation of cell 30 in the pilot used the frozen incoming profile as a labelled conditional and is not part of this chain; cell 30 remains to be computed with propagated incoming values.

## 9. Shared inputs that remain

Unchanged from the pilot report, Section 2. The chain shares with the frozen subject: the receiver comparison paths; the accepted source histories through five and their accepted error table; the union census (which rows exist, and the first fronts used by the zero-prefix exclusion); the stationary coefficient input; and the unchanged Master Equation with numerical $c_f=1$ and $g=16$. Agreement or disagreement between this chain and the frozen values is therefore not a test of any of those inputs.

## 10. Time, memory, failed runs, supervision

- Supervisor run `66dad526-abbb-4bb4-9a2d-9f2fc5649607`: started 19:19:48.130Z, finished 19:22:36.004Z (167.9 s by the supervisor's clock), status completed, exit code 0, process group closed. Deadline was 19:38:48Z. Retained as `chain-supervisor-start.json` and `chain-supervisor-status.json`, both with the control token redacted by the supervisor.
- Setup 15.6 s and the eight cells 151.1 s in total, by the runner's own timers in `summary.json`.
- Peak resident memory 1,238,532,096 bytes, as recorded by the runner in `summary.json`.
- Failed runs in this packet: none. There was one run and it completed. `chain.stderr` is empty.
- Closeout for this owner task is recorded in `closeout.json`.

## 11. What would show this packet wrong

1. An independent evaluation of any receiver's defect, at any time inside one of these eight cells, exceeding that cell's saved `rho` for the receiver; likewise a receiver Jacobian norm inside the saved tube exceeding `lam`, or a source-history contribution exceeding `q`.
2. A causal root for any evaluated row lying outside its enclosure, or any emission later than the cell's "latest emission" figure.
3. A row left out by the zero-prefix rule that is in fact non-zero in the cell.
4. Any cell's incoming array differing from its predecessor's outgoing array, or cell 0's from the accepted table.
5. A recomputation from the saved `rho`, `lam`, `q` and incoming majorants giving an outgoing majorant above the saved one.

## 12. Retention

Owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-chain-0-7/`: `chain/` (eight cell files, `summary.json`, `chain-state.npz`, `chain-state.json`); `chain.stdout`, `chain.stderr`; the two supervisor records; `sources-as-run/`; `packet-analysis.py`, `packet-analysis.json`, `packet-tables.md`; `closeout.json`; `commands.txt`; `outputs.sha256` (paths relative to the owner) and `sources.sha256` (paths relative to the repository). The pilot owner, the three supplement owners and Codex's folders were not written to.

The second packet's retention is in Section 13.7.

## 13. Second packet: cells 8 to 15

Released by Codex's entry of 19:34:00.699Z. Everything in Sections 2, 5 (the exclusion rule), 9 and 11 applies unchanged; only what differs is recorded here.

### 13.1 Outcome

Cells 8 to 15, $[5+k/64,\,5+(k+1)/64]$ for $k=8,\dots,15$, were evaluated in sequence in one supervised process, resumed from the reviewed saved state of cells 0 to 7. All eight completed for all 1,502 receivers; every tube closed on the first radius; no cell failed; the run stopped after cell 15 as released. Cell 16 was not started and no event extraction was done. The grades are those of Section 1, item 2.

Two things to know first.

1. **From cell 11 on, the largest new velocity majorant is above the largest frozen one** (cell 15: $0.0151471$ against $0.0151121$). The largest position majorant is still below the frozen maximum in every cell, but the gap is narrowing (cell 15: $0.00303296$ against $0.00304448$) and the per-receiver excess keeps growing, to $4.9\times10^{-5}$ in position at cell 15. Section 13.5.
2. **The smallest tube margin is shrinking**, from $1.52\times10^{-5}$ at cell 8 to $8.78\times10^{-6}$ at cell 15. Every tube still closed on the first radius. If a later tube does not close on the first radius the runner tries larger radii, up to eight, and stops the chain if none closes.

### 13.2 What was run

The same instrument, receipt, inputs and digests as Section 2, checked again before launch, with the same interpreter and supervisor. Command, from the instrument directory, with a 1,150 s deadline (19:54:20Z):

`python -B event_cell_chain_v2.py target 8 15 <owner>/chain <supplement-3>/known-v4-run1.json --sub 1 --incoming chain --state <claude-chain-0-7>/chain`

Owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-chain-8-15/`, fresh (its absence was tested before creation). Resumed state, checked against the digests in the release before launch: `chain-state.npz` `1435ad3b598f8fc231b3b1ee514df9413a82f5dd2c4c084d4248e465d1f55bfc`, `chain-state.json` `2038779f472ffdc3d574a5e0f9f68780932173c4fe2bed4bb298ca2587eba94a`, predecessor `cell-07.npz` `7dadf5a696426c17111dc50bb5349d69e3d44b87f7d19d163a780a0f71b8bd74`. All 24 entries of the first packet's output manifest verified immediately before launch. The runner's own guards accepted the state (next cell 8, completed cells 0 to 7 without gap, digests, identities, and state arrays equal to the predecessor's outgoing arrays). No known cases were rerun.

### 13.3 Results by cell

Same conventions and outward rounding as Section 4.

| Cell | Interval | Latest emission | Smallest range | Smallest factor | $\rho$ max | $\lambda$ max | $q$ max | Position majorant out | Velocity majorant out | Smallest tube margin | Displacement with error |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 8 | $[41/8,\,329/64]$ | 4.2295 | 0.9111 | 0.9793 | 0.006709 | 8.6371 | 0.018600 | 0.00182029 | 0.00804700 | $1.52\times10^{-5}$ | 0.08499 |
| 9 | $[329/64,\,165/32]$ | 4.2492 | 0.9070 | 0.9781 | 0.007425 | 9.4715 | 0.019426 | 0.00195129 | 0.00872440 | $1.47\times10^{-5}$ | 0.08892 |
| 10 | $[165/32,\,331/64]$ | 4.2692 | 0.9027 | 0.9769 | 0.008247 | 10.4134 | 0.020710 | 0.00209358 | 0.00949152 | $1.40\times10^{-5}$ | 0.09304 |
| 11 | $[331/64,\,83/16]$ | 4.2894 | 0.8981 | 0.9756 | 0.009193 | 11.4838 | 0.022699 | 0.00224858 | 0.0103534 | $1.33\times10^{-5}$ | 0.09736 |
| 12 | $[83/16,\,333/64]$ | 4.3097 | 0.8934 | 0.9739 | 0.010286 | 12.6288 | 0.024389 | 0.00241791 | 0.0113262 | $1.24\times10^{-5}$ | 0.10189 |
| 13 | $[333/64,\,167/32]$ | 4.3304 | 0.8884 | 0.9725 | 0.011555 | 13.9113 | 0.025792 | 0.00260351 | 0.0124381 | $1.13\times10^{-5}$ | 0.10666 |
| 14 | $[167/32,\,335/64]$ | 4.3513 | 0.8831 | 0.9709 | 0.013040 | 15.4037 | 0.028258 | 0.00280766 | 0.0137014 | $1.01\times10^{-5}$ | 0.11168 |
| 15 | $[335/64,\,21/4]$ | 4.3725 | 0.8775 | 0.9690 | 0.014791 | 17.2733 | 0.030366 | 0.00303296 | 0.0151471 | $8.78\times10^{-6}$ | 0.11698 |

Every emission enclosure ends before time five. In every cell the incoming majorant is inside the tube, the outgoing majorant strictly inside it, and the displacement with error below $7/20$ (asserted by the runner, recorded true). The stationary tail added to $\rho$ is at most $3.4\times10^{-8}$ and the derivative tail added to $\lambda$ at most $1.7\times10^{-6}$. Full-precision values are in `chain/summary.json` and `packet-analysis.json`.

### 13.4 Row accounting

| Cell | $\rho$ rows evaluated (least to most over pieces) | $\rho$ rows left out (least to most) | $\lambda$, $q$ rows evaluated | $\lambda$, $q$ rows left out | Rows with an active pulse | Seconds |
| --- | --- | --- | --- | --- | --- | --- |
| 8 | 78,150 to 79,414 | 69,632 to 70,896 | 79,452 | 69,594 | 336 | 21.7 |
| 9 | 79,426 to 79,590 | 69,456 to 69,620 | 79,594 | 69,452 | 336 | 19.5 |
| 10 | 79,590 to 79,702 | 69,344 to 69,456 | 79,738 | 69,308 | 336 | 19.2 |
| 11 | 79,710 to 80,890 | 68,156 to 69,336 | 81,034 | 68,012 | 384 | 19.3 |
| 12 | 81,034 to 84,756 | 64,290 to 68,012 | 84,900 | 64,146 | 384 | 20.2 |
| 13 | 84,860 to 85,786 | 63,260 to 64,186 | 85,918 | 63,128 | 336 | 20.9 |
| 14 | 86,206 to 88,356 | 60,690 to 62,840 | 88,472 | 60,574 | 336 | 21.8 |
| 15 | 88,508 to 89,076 | 59,970 to 60,538 | 89,160 | 59,886 | 336 | 21.3 |

Evaluated plus left out equals 149,046 in every case.

### 13.5 Comparison with the frozen subject, read only

Same reading and same caveats as Section 6: done after the run by the owner's `packet-analysis.py`; nothing from it enters the chain; plain readings rounded to the digits shown. Per Codex's release, no cause for the differences is accepted and no frozen event margin is transferred; the chain will settle its own event sufficiency after complete coverage.

| Cell | $\rho$: new max; frozen max; receivers where new is above; largest excess | $\lambda$: new max; frozen max; receivers above | $q$: new max; frozen max; receivers above; largest excess | Position majorant out: new max; frozen max; receivers above; largest excess | Velocity majorant out: new max; frozen max; receivers above; largest excess |
| --- | --- | --- | --- | --- | --- |
| 8 | 0.006708; 0.005014; 808; 0.0021 | 8.637; 8.748; 0 | 0.01860; 0.01861; 0 | 0.00182029; 0.00183282; 666; $1.4\times10^{-5}$ | 0.00804699; 0.00807815; 678; $2.2\times10^{-4}$ |
| 9 | 0.007424; 0.005728; 844; 0.0021 | 9.471; 9.539; 0 | 0.01943; 0.01943; 0 | 0.00195129; 0.00196419; 662; $1.8\times10^{-5}$ | 0.00872440; 0.00873954; 686; $2.5\times10^{-4}$ |
| 10 | 0.008246; 0.006566; 840; 0.0021 | 10.41; 10.63; 0 | 0.02071; 0.02072; 0 | 0.00209357; 0.00210662; 674; $2.2\times10^{-5}$ | 0.00949152; 0.00949600; 694; $2.8\times10^{-4}$ |
| 11 | 0.009193; 0.007549; 848; 0.0022 | 11.48; 11.63; 0 | 0.02270; 0.02271; 0 | 0.00224857; 0.00226160; 678; $2.7\times10^{-5}$ | 0.0103534; 0.0103457; 714; $3.1\times10^{-4}$ |
| 12 | 0.01029; 0.008719; 864; 0.0022 | 12.63; 12.71; 0 | 0.02439; 0.02440; 4; $1.5\times10^{-5}$ | 0.00241790; 0.00243070; 682; $3.2\times10^{-5}$ | 0.0113261; 0.0113047; 746; $3.4\times10^{-4}$ |
| 13 | 0.01155; 0.01014; 852; 0.0022 | 13.91; 14.20; 0 | 0.02579; 0.02579; 2; $8.6\times10^{-7}$ | 0.00260351; 0.00261594; 686; $3.7\times10^{-5}$ | 0.0124380; 0.0124128; 754; $3.7\times10^{-4}$ |
| 14 | 0.01304; 0.01189; 844; 0.0021 | 15.40; 15.61; 0 | 0.02826; 0.02828; 98; $3.9\times10^{-8}$ | 0.00280766; 0.00281967; 694; $4.3\times10^{-5}$ | 0.0137013; 0.0136733; 750; $4.0\times10^{-4}$ |
| 15 | 0.01479; 0.01402; 828; 0.0020 | 17.27; 17.61; 0 | 0.03037; 0.03037; 2; $2.5\times10^{-6}$ | 0.00303296; 0.00304448; 714; $4.9\times10^{-5}$ | 0.0151470; 0.0151121; 762; $4.2\times10^{-4}$ |

Readings. $\lambda$ stays at or below the frozen value at every receiver. $q$ is above it at a handful of receivers in cells 12 to 15, by at most $1.5\times10^{-5}$. The new $\rho$ is the larger at 808 to 864 receivers, with a largest excess that stays near $0.002$ while both maxima grow, so the ratio of the maxima falls from 1.34 at cell 8 to 1.05 at cell 15. The position majorant is above the frozen one at 662 to 714 receivers and the velocity majorant at 678 to 762.

### 13.6 Continuity, saved state, resources

Checked by `packet-analysis.py` on the saved files, all true: cell 8's incoming arrays equal the resumed state's arrays and equal cell 7's outgoing arrays, exactly; each of cells 9 to 15 has incoming arrays equal to the preceding cell's outgoing arrays exactly; every cell is marked counted; every tube closed on its first attempt; the new state's arrays equal cell 15's outgoing arrays, its next cell is 16, its completed cells are 0 to 15 without gap and its start origin is unchanged; state and predecessor digests match.

| File in `claude-chain-8-15/chain/` | SHA-256 |
| --- | --- |
| `cell-08.npz` | `951f4b5a3a586fe9d4ef368525a12ccdec04c7a1782967dd4a01bf661006582d` |
| `cell-09.npz` | `50735c942f1d89280d5eec49714121fb4f58be9ef1b8fac2331fa3aee62b4d78` |
| `cell-10.npz` | `897d75a33c55e0f6c568c9d9e4792f31c0560b48ef2699be8887fcf189a171c3` |
| `cell-11.npz` | `09a2d4ea26b1b24fccf9e671798520f5ce60b4f15d1888f1cc841e932b49ca7b` |
| `cell-12.npz` | `85db05445e165c7087f88a17d9d757bbf8970b824f68602f3dceb82f6a71ff8e` |
| `cell-13.npz` | `11e98f088d931b9f1cd69ca58564ce6b60043758d9f29e0de6bbad668e4ce575` |
| `cell-14.npz` | `bf85372fd41e34f098d6cfda6ad1ea6d27ba933d35d04cc76dfec130dd7f699f` |
| `cell-15.npz` | `277e1ac9080f06d4df84501be83b3527e8f99e24d9847a62102ef33067e568a0` |
| `chain-state.npz` (next cell 16) | `cff23e7ccbe6f69e3d07037f078d9523e2266d5f80e5e49578f569d2cea5f88d` |
| `chain-state.json` | `7f13ed66ec30f89bdcc6b04445afdc88fcc485604bfef83b6cc7dbbfab9f7a06` |
| `summary.json` | `c53feebd68c1c4688dce10e81f7e5cd8c60c38f328fb262a778db3af36b355f1` |

Supervisor run `8e92b424-3fce-453e-9cb3-104ee999694d`: started 19:35:10.267Z, finished 19:38:11.011Z (180.7 s by the supervisor's clock), status completed, exit code 0, process group closed. Setup 15.9 s and the eight cells 163.9 s in total by the runner's timers. Peak resident memory 1,238,827,008 bytes as recorded by the runner. Failed or unfinished runs in this packet: none; `chain.stderr` is empty. Closeout for this owner task is recorded in the owner's `closeout.json`.

A later batch must resume with `--state <claude-chain-8-15>/chain` and first cell 16.

### 13.7 Retention

Owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-chain-8-15/`: `chain/` (cell-08 to cell-15, `summary.json`, `chain-state.npz`, `chain-state.json`); `chain.stdout`, `chain.stderr`; the two supervisor records, token redacted; `sources-as-run/`; `reviewed-report/` (this report as reviewed, `afcd7469…c582`); `packet-analysis.py`, `packet-analysis.json`, `packet-tables.md`; `closeout.json`; `commands.txt`; `outputs.sha256` (owner-relative) and `sources.sha256` (repository-relative). The first packet's owner and every earlier owner were read, not written.

## 14. Third packet: cells 16 to 23

Released by Codex's entry of 19:42:49.431Z together with the matching native pointer delivered at 21:07Z. Everything in Sections 2, 5 (the exclusion rule), 9 and 11 applies unchanged; only what differs is recorded here.

### 14.1 Outcome

Cells 16 to 23, $[5+k/64,\,5+(k+1)/64]$ for $k=16,\dots,23$, were evaluated in sequence in one supervised process, resumed from the reviewed saved state of cells 0 to 15. All eight completed for all 1,502 receivers; no cell failed; the run stopped after cell 23 as released. Cell 24 was not started and no event extraction was done. The grades are those of Section 1, item 2.

Three things to know first.

1. **Cells 19 to 23 each needed a second tube radius.** The first radius was rejected in each (the outgoing majorant came out above the assumed tube at some receiver); the runner then enlarged the tube, re-evaluated $\lambda$ and $q$ on the larger tube, and the second radius closed with room. The saved $\lambda$, $q$ and tube of each cell are those of the accepted second attempt; the rejected attempt contributes nothing to the chain and is recorded in the summary. Cells 16 to 18 closed on the first radius with margins falling to $2.25\times10^{-6}$. Section 14.4.
2. **Against the frozen subject, the maxima have turned the other way.** The largest new $\rho$ is below the largest frozen $\rho$ from cell 17 on (cell 23: $0.04999$ against $0.06487$); the largest velocity majorant is below the frozen maximum again from cell 18 on; the largest position majorant is below it in every cell and the gap is widening (cell 23: $0.00616533$ against $0.00619602$). Per receiver, the new majorants are still above the frozen ones at about half the receivers. Section 14.6.
3. **Magnitudes are growing quickly**, as expected approaching the event: $\lambda$ rises from 19.3 to 47.2 over these eight cells and the upper bound on receiver speed including its error from 0.40 to 0.66 (with $c_f=1$), while the smallest transmitter factor $1-\mathbf{n}\cdot\mathbf{v}$ is still at least 0.9486 and every emission still precedes time five.

### 14.2 What was run

The same instrument, receipt, inputs and digests as Section 2, checked again before launch, with the same interpreter and supervisor. Command, from the instrument directory, with a 1,140 s deadline (21:26:28Z):

`python -B event_cell_chain_v2.py target 16 23 <owner>/chain <supplement-3>/known-v4-run1.json --sub 1 --incoming chain --state <claude-chain-8-15>/chain`

Owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-chain-16-23/`, fresh (its absence was tested before creation). Resumed state, checked against the digests in the release before launch: `chain-state.npz` `cff23e7ccbe6f69e3d07037f078d9523e2266d5f80e5e49578f569d2cea5f88d`, `chain-state.json` `7f13ed66ec30f89bdcc6b04445afdc88fcc485604bfef83b6cc7dbbfab9f7a06`, predecessor `cell-15.npz` `277e1ac9080f06d4df84501be83b3527e8f99e24d9847a62102ef33067e568a0`. All 25 output entries and all 19 source entries of the second packet's manifests verified immediately before launch. The runner's own guards accepted the state. No known cases were rerun.

### 14.3 Results by cell

Same conventions and outward rounding as Section 4. For cells 19 to 23 every figure is from the accepted second attempt.

| Cell | Interval | Latest emission | Smallest range | Smallest factor | $\rho$ max | $\lambda$ max | $q$ max | Position majorant out | Velocity majorant out | Smallest tube margin | Displacement with error |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 16 | $[21/4,\,337/64]$ | 4.3940 | 0.8716 | 0.9674 | 0.016868 | 19.2735 | 0.032879 | 0.00328262 | 0.0168211 | $7.01\times10^{-6}$ | 0.12257 |
| 17 | $[337/64,\,169/32]$ | 4.4159 | 0.8653 | 0.9653 | 0.019338 | 21.6693 | 0.036414 | 0.00356047 | 0.0187588 | $4.97\times10^{-6}$ | 0.12848 |
| 18 | $[169/32,\,339/64]$ | 4.4382 | 0.8587 | 0.9630 | 0.022292 | 24.4130 | 0.039413 | 0.00387117 | 0.0210304 | $2.25\times10^{-6}$ | 0.13475 |
| 19 | $[339/64,\,85/16]$ | 4.4609 | 0.8516 | 0.9607 | 0.025853 | 27.6093 | 0.043708 | 0.00422032 | 0.0236840 | $1.60\times10^{-5}$ | 0.14141 |
| 20 | $[85/16,\,341/64]$ | 4.4841 | 0.8440 | 0.9582 | 0.030175 | 31.3012 | 0.047624 | 0.00461460 | 0.0268136 | $1.65\times10^{-5}$ | 0.14851 |
| 21 | $[341/64,\,171/32]$ | 4.5079 | 0.8358 | 0.9550 | 0.035448 | 35.8330 | 0.053264 | 0.00506256 | 0.0305632 | $1.66\times10^{-5}$ | 0.15609 |
| 22 | $[171/32,\,343/64]$ | 4.5323 | 0.8271 | 0.9522 | 0.041936 | 40.8469 | 0.058816 | 0.00557502 | 0.0350814 | $1.67\times10^{-5}$ | 0.16422 |
| 23 | $[343/64,\,43/8]$ | 4.5573 | 0.8177 | 0.9486 | 0.049995 | 47.1298 | 0.065140 | 0.00616533 | 0.0409884 | $1.64\times10^{-5}$ | 0.17296 |

Every emission enclosure ends before time five. In every cell the incoming majorant is inside the accepted tube, the outgoing majorant strictly inside it, and the displacement with error below $7/20$ (asserted by the runner, recorded true). The stationary tail added to $\rho$ is at most $2.3\times10^{-7}$ and the derivative tail added to $\lambda$ at most $8.6\times10^{-6}$. The upper bound on receiver speed including the velocity majorant is 0.3941, 0.4208, 0.4501, 0.4823, 0.5181, 0.5579, 0.6026 and 0.6531 for cells 16 to 23. Full-precision values are in `chain/summary.json` and `packet-analysis.json`.

### 14.4 Tube attempts

"Worst margin" is the smallest, over receivers, of the assumed tube radius minus the computed outgoing position majorant; a tube is accepted only if it is positive (and the incoming majorant is inside). Readings from `chain/summary.json`, rounded to three digits.

| Cell | First radius: worst margin | First radius: outcome | Second radius: worst margin | Outcome |
| --- | --- | --- | --- | --- |
| 16 | $7.02\times10^{-6}$ | closed | not needed | counted |
| 17 | $4.98\times10^{-6}$ | closed | not needed | counted |
| 18 | $2.26\times10^{-6}$ | closed | not needed | counted |
| 19 | $-1.02\times10^{-6}$ | rejected | $1.60\times10^{-5}$ | counted |
| 20 | $-5.20\times10^{-6}$ | rejected | $1.66\times10^{-5}$ | counted |
| 21 | $-1.03\times10^{-5}$ | rejected | $1.66\times10^{-5}$ | counted |
| 22 | $-1.70\times10^{-5}$ | rejected | $1.67\times10^{-5}$ | counted |
| 23 | $-2.57\times10^{-5}$ | rejected | $1.64\times10^{-5}$ | counted |

The first radius is falling short by more each cell, so cells 24 to 30 should be expected to need the second radius as well; whether the second suffices throughout is not known until they are run. A rejected first radius costs one extra evaluation of $\lambda$ and $q$ and no rigour: the bound is proved only on the accepted tube.

### 14.5 Row accounting

| Cell | $\rho$ rows evaluated (least to most over pieces) | $\rho$ rows left out (least to most) | $\lambda$, $q$ rows evaluated | $\lambda$, $q$ rows left out | Rows with an active pulse | Seconds |
| --- | --- | --- | --- | --- | --- | --- |
| 16 | 89,136 to 89,882 | 59,164 to 59,910 | 89,910 | 59,136 | 384 | 22.8 |
| 17 | 89,882 to 90,042 | 59,004 to 59,164 | 90,136 | 58,910 | 384 | 24.6 |
| 18 | 90,100 to 90,272 | 58,774 to 58,946 | 90,340 | 58,706 | 192 | 22.4 |
| 19 | 90,308 to 91,550 | 57,496 to 58,738 | 91,740 | 57,306 | 192 | 23.7 |
| 20 | 91,716 to 93,122 | 55,924 to 57,330 | 93,210 | 55,836 | 192 | 27.0 |
| 21 | 93,186 to 94,196 | 54,850 to 55,860 | 94,280 | 54,766 | 336 | 27.0 |
| 22 | 94,212 to 95,254 | 53,792 to 54,834 | 95,574 | 53,472 | 336 | 25.9 |
| 23 | 95,540 to 98,276 | 50,770 to 53,506 | 98,404 | 50,642 | 240 | 26.2 |

Evaluated plus left out equals 149,046 in every case (checked by script). The $\lambda$, $q$ counts are the same on both attempts of a cell.

### 14.6 Comparison with the frozen subject, read only

Same reading and same caveats as Sections 6 and 13.5: done after the run by the owner's `packet-analysis.py`; nothing from it enters the chain; plain readings rounded to the digits shown; no cause accepted and no frozen event margin transferred.

| Cell | $\rho$: new max; frozen max; receivers where new is above; largest excess | $\lambda$: new max; frozen max; receivers above | $q$: new max; frozen max; receivers above; largest excess | Position majorant out: new max; frozen max; receivers above; largest excess | Velocity majorant out: new max; frozen max; receivers above; largest excess |
| --- | --- | --- | --- | --- | --- |
| 16 | 0.01687; 0.01661; 844; 0.0021 | 19.27; 19.61; 0 | 0.03288; 0.03288; 10; $5.5\times10^{-6}$ | 0.00328261; 0.00329367; 718; $5.6\times10^{-5}$ | 0.0168211; 0.0167973; 770; $4.5\times10^{-4}$ |
| 17 | 0.01934; 0.01977; 834; 0.0021 | 21.67; 21.83; 0 | 0.03641; 0.03644; 16; $8.4\times10^{-6}$ | 0.00356046; 0.00357126; 738; $6.3\times10^{-5}$ | 0.0187588; 0.0187486; 770; $4.8\times10^{-4}$ |
| 18 | 0.02229; 0.02367; 796; 0.0022 | 24.41; 24.78; 0 | 0.03941; 0.03941; 12; $1.3\times10^{-5}$ | 0.00387117; 0.00388206; 738; $7.1\times10^{-5}$ | 0.0210304; 0.0210534; 766; $5.0\times10^{-4}$ |
| 19 | 0.02585; 0.02853; 800; 0.0023 | 27.61; 27.78; 0 | 0.04371; 0.04370; 12; $3.9\times10^{-6}$ | 0.00422031; 0.00423192; 746; $7.9\times10^{-5}$ | 0.0236839; 0.0237523; 758; $5.3\times10^{-4}$ |
| 20 | 0.03017; 0.03461; 820; 0.0023 | 31.30; 31.75; 0 | 0.04762; 0.04770; 6; $2.7\times10^{-6}$ | 0.00461459; 0.00462812; 750; $8.7\times10^{-5}$ | 0.0268136; 0.0269927; 742; $5.4\times10^{-4}$ |
| 21 | 0.03545; 0.04230; 870; 0.0024 | 35.83; 36.60; 0 | 0.05326; 0.05339; 38; $8.7\times10^{-6}$ | 0.00506255; 0.00507957; 758; $9.6\times10^{-5}$ | 0.0305632; 0.0308307; 756; $5.5\times10^{-4}$ |
| 22 | 0.04194; 0.05214; 872; 0.0024 | 40.85; 41.14; 0 | 0.05882; 0.05893; 18; $1.8\times10^{-5}$ | 0.00557501; 0.00559749; 766; $1.0\times10^{-4}$ | 0.0350813; 0.0355138; 752; $5.4\times10^{-4}$ |
| 23 | 0.04999; 0.06487; 896; 0.0023 | 47.13; 47.87; 0 | 0.06514; 0.06526; 38; $9.3\times10^{-5}$ | 0.00616532; 0.00619602; 758; $1.1\times10^{-4}$ | 0.0409883; 0.0413609; 764; $5.6\times10^{-4}$ |

Readings. $\lambda$ stays at or below the frozen value at every receiver. $q$ is above it at 6 to 38 receivers per cell, by at most $9.3\times10^{-5}$. The new $\rho$ is the larger at 796 to 896 receivers with a largest excess that stays near $0.002$, while the largest new $\rho$ falls below the largest frozen $\rho$ from cell 17 on. The position majorant is above the frozen one at 718 to 766 receivers and the velocity majorant at 742 to 770, with largest excesses still growing slowly; the maxima over receivers are below the frozen maxima for position in every cell and for velocity from cell 18 on.

### 14.7 Continuity, saved state, resources

Checked by `packet-analysis.py` on the saved files, all true: cell 16's incoming arrays equal the resumed state's arrays and equal cell 15's outgoing arrays, exactly; each of cells 17 to 23 has incoming arrays equal to the preceding cell's outgoing arrays exactly; every cell is marked counted; the new state's arrays equal cell 23's outgoing arrays, its next cell is 24, its completed cells are 0 to 23 without gap and its start origin is unchanged; state and predecessor digests match. Attempts per cell: 1, 1, 1, 2, 2, 2, 2, 2.

| File in `claude-chain-16-23/chain/` | SHA-256 |
| --- | --- |
| `cell-16.npz` | `b5e1cd8e91939fbf6957c3ee72b3a68ba62d8d34b4162f4e88f40096ebd7a1dd` |
| `cell-17.npz` | `ecf091276f369f1a3009c1d5b9e2ae74cb3d16632ad93a3c88bc122f704fbcee` |
| `cell-18.npz` | `28a80ec78715ecf13a1de4bf437d7de6bec7e62481f512e223952d17846dc6b1` |
| `cell-19.npz` | `efa5e6ecf672aa49f8e51728a79fe2102530f08cfe6a38aa17f456b6297ece95` |
| `cell-20.npz` | `0c99b14f53c49880af5018124977f4bd9246b265df3a4ba1be858a894863e3bc` |
| `cell-21.npz` | `0e40f1c17b916ddd9b18ef5aedafba9b533d9ccf058832c1b502e9c828fb664c` |
| `cell-22.npz` | `406e24a0340fb56e3b8389c2cdd8870ef84e94e6572a6418081d05e5b895356a` |
| `cell-23.npz` | `2ce1e8901ad6dd062d0a9c8a0ef73b42817d85160d1bf6a94030a9c8d7d0053e` |
| `chain-state.npz` (next cell 24) | `d4d2134a9c2dbce7c28355159e6c44b46fa00ca565679b025744b837e1385a8b` |
| `chain-state.json` | `67c495623d1fad6d3b2309a1f97eb9ae6b5a2bd1b1d53dbdb291657383fd23e4` |
| `summary.json` | `c3a4e0f629f086084e3b60b718e886d6b2312fc8dc4c1460687a0c3198f79acc` |

Supervisor run `7f3e171c-6223-4e08-b646-a31cb854a624`: started 21:07:28.957Z, finished 21:11:05.083Z (216.1 s by the supervisor's clock), status completed, exit code 0, process group closed. Setup 15.5 s and the eight cells 199.6 s in total by the runner's timers. Peak resident memory 1,312,079,872 bytes as recorded by the runner. Failed or unfinished runs in this packet: none; `chain.stderr` is empty. Closeout for this owner task is recorded in the owner's `closeout.json`.

A later batch must resume with `--state <claude-chain-16-23>/chain` and first cell 24.

### 14.8 Retention

Owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-chain-16-23/`: `chain/` (cell-16 to cell-23, `summary.json`, `chain-state.npz`, `chain-state.json`); `chain.stdout`, `chain.stderr`; the two supervisor records, token redacted; `sources-as-run/`; `reviewed-report/` (this report as reviewed with the second packet, `7da14523…6800`); `packet-analysis.py` (byte-identical to the second packet's), `packet-analysis.json`, `packet-tables.md`; `closeout.json`; `commands.txt`; `outputs.sha256` (owner-relative) and `sources.sha256` (repository-relative). Every earlier owner was read, not written.

## 15. Fourth packet: cells 24 to 30

Released by Codex's entry of 21:14:42.036Z. Everything in Sections 2, 5 (the exclusion rule), 9 and 11 applies unchanged; only what differs is recorded here.

### 15.1 Outcome

Cells 24 to 30, $[5+k/64,\,5+(k+1)/64]$ for $k=24,\dots,30$, were evaluated in sequence in one supervised process, resumed from the reviewed saved state of cells 0 to 23. All seven completed for all 1,502 receivers; no cell failed; the run stopped after cell 30. With this packet all 31 load-bearing cells, $[5,\,351/64]$, are computed as one consistently propagated chain from the accepted time-five table. No cell beyond 30, no refinement and no event extraction was run. The grades are those of Section 1, item 2.

Four things to know first.

1. **End of chain.** At the end of cell 30 the largest position majorant is $0.0156387$ and the largest velocity majorant $0.185379$; the largest displacement including its error over cell 30 is $0.26502$, inside the $7/20$ domain; the latest emission used anywhere in the chain is at most $4.7777$, before five.
2. **Every one of these seven cells closed on the second tube radius.** The first radius was rejected in each, by an amount growing from $3.72\times10^{-5}$ to $3.24\times10^{-4}$; the second closed with $1.65\times10^{-5}$ to $1.70\times10^{-5}$ of room. As in cells 19 to 23, the saved $\lambda$, $q$ and tube are those of the accepted attempt. Section 15.4.
3. **The stored receiver-speed diagnostic exceeds the field speed in the last cells.** The runner stores, per cell, an upper bound on comparison receiver speed plus the velocity majorant. It is 0.7106, 0.7768, 0.8540, 0.9451, 1.0545, 1.1886 and 1.3576 for cells 24 to 30, against $c_f=1$. The comparison part alone, read from the saved velocity boxes as the norm of the per-component box maxima (an overestimate of the speed), is 0.6622, 0.7190, 0.7840, 0.8589, 0.9463, 1.0492 and 1.1722. The runner only stores this figure (line 135 of `event_cell_chain_v2.py`); no estimate in it uses receiver speed, and the Master Equation's acceleration does not contain the receiver's velocity. Every source value used is emitted before time five, where the smallest transmitter factor over the whole chain is 0.9052. I report it because it is the first place a bound on a path speed in this chain passes one, and whether that matters for the event argument is for the extraction and its review, not for this packet.
4. **Against the frozen subject**, the maxima over receivers are all lower at the end of cell 30: position $0.0156387$ against $0.0160116$, velocity $0.185379$ against $0.198434$, $\rho$ $0.2336$ against $0.4557$. Per receiver, the new position majorant is still the larger at 756 to 772 of the 1,502 receivers, by at most $1.6\times10^{-4}$. Section 15.6.

### 15.2 What was run

The same instrument, receipt, inputs and digests as Section 2, checked again before launch, with the same interpreter and supervisor. Command, from the instrument directory, with a 1,140 s deadline (21:34:54Z):

`python -B event_cell_chain_v2.py target 24 30 <owner>/chain <supplement-3>/known-v4-run1.json --sub 1 --incoming chain --state <claude-chain-16-23>/chain`

Owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-chain-24-30/`, fresh (its absence was tested before creation). Resumed state, checked against the digests in the release before launch: `chain-state.npz` `d4d2134a9c2dbce7c28355159e6c44b46fa00ca565679b025744b837e1385a8b`, `chain-state.json` `67c495623d1fad6d3b2309a1f97eb9ae6b5a2bd1b1d53dbdb291657383fd23e4`, predecessor `cell-23.npz` `2ce1e8901ad6dd062d0a9c8a0ef73b42817d85160d1bf6a94030a9c8d7d0053e`. All 25 output entries and all 20 source entries of the third packet's manifests verified immediately before launch. The runner's own guards accepted the state. No known cases were rerun.

### 15.3 Results by cell

Same conventions and outward rounding as Section 4. Every figure is from the accepted second attempt.

| Cell | Interval | Latest emission | Smallest range | Smallest factor | $\rho$ max | $\lambda$ max | $q$ max | Position majorant out | Velocity majorant out | Smallest tube margin | Displacement with error |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 24 | $[43/8,\,345/64]$ | 4.5832 | 0.8074 | 0.9448 | 0.060109 | 54.6814 | 0.073558 | 0.00685067 | 0.0484273 | $1.69\times10^{-5}$ | 0.18240 |
| 25 | $[345/64,\,173/32]$ | 4.6100 | 0.7963 | 0.9406 | 0.072944 | 63.7727 | 0.080822 | 0.00765384 | 0.0578281 | $1.67\times10^{-5}$ | 0.19263 |
| 26 | $[173/32,\,347/64]$ | 4.6382 | 0.7837 | 0.9355 | 0.089457 | 75.5038 | 0.092118 | 0.00860461 | 0.0700237 | $1.65\times10^{-5}$ | 0.20379 |
| 27 | $[347/64,\,87/16]$ | 4.6697 | 0.7678 | 0.9299 | 0.111052 | 90.4556 | 0.105082 | 0.00974304 | 0.0861708 | $1.68\times10^{-5}$ | 0.21603 |
| 28 | $[87/16,\,349/64]$ | 4.7033 | 0.7498 | 0.9239 | 0.139777 | 110.4772 | 0.126412 | 0.0111809 | 0.108273 | $1.69\times10^{-5}$ | 0.22954 |
| 29 | $[349/64,\,175/32]$ | 4.7390 | 0.7298 | 0.9165 | 0.178913 | 137.5406 | 0.148119 | 0.0131105 | 0.139398 | $1.67\times10^{-5}$ | 0.24524 |
| 30 | $[175/32,\,351/64]$ | 4.7777 | 0.7067 | 0.9052 | 0.233507 | 176.9133 | 0.176801 | 0.0156387 | 0.185379 | $1.65\times10^{-5}$ | 0.26502 |

Every emission enclosure ends before time five. In every cell the incoming majorant is inside the accepted tube, the outgoing majorant strictly inside it, and the displacement with error below $7/20$ (asserted by the runner, recorded true). The stationary tail added to $\rho$ is at most $3.6\times10^{-6}$ and the derivative tail added to $\lambda$ at most $3.7\times10^{-4}$. Full-precision values are in `chain/summary.json` and `packet-analysis.json`.

Cell 30 here and in the pilot. The corrected pilot evaluated cell 30 with the frozen subject's incoming profile as a labelled conditional (pilot report Section 10.4: $\lambda$ at most 178.425, $q$ 0.177146, outgoing position 0.0159838). The chain's cell 30 uses its own propagated incoming majorants. Read from the two saved cell files after the run: the `rho` arrays are identical bit for bit, as they must be because $\rho$ does not depend on the incoming error; the chain's incoming position majorant is the larger at 772 receivers and the smaller at the rest, and its `lam` and `q` are correspondingly the larger at exactly those 772 receivers, while their maxima over receivers are lower (176.9133 and 0.176801).

### 15.4 Tube attempts

Same definition as Section 14.4; readings from `chain/summary.json`, rounded to three digits.

| Cell | First radius: worst margin | First radius: outcome | Second radius: worst margin | Outcome |
| --- | --- | --- | --- | --- |
| 24 | $-3.72\times10^{-5}$ | rejected | $1.69\times10^{-5}$ | counted |
| 25 | $-5.21\times10^{-5}$ | rejected | $1.68\times10^{-5}$ | counted |
| 26 | $-7.34\times10^{-5}$ | rejected | $1.65\times10^{-5}$ | counted |
| 27 | $-1.03\times10^{-4}$ | rejected | $1.69\times10^{-5}$ | counted |
| 28 | $-1.47\times10^{-4}$ | rejected | $1.70\times10^{-5}$ | counted |
| 29 | $-2.16\times10^{-4}$ | rejected | $1.68\times10^{-5}$ | counted |
| 30 | $-3.24\times10^{-4}$ | rejected | $1.65\times10^{-5}$ | counted |

Over the whole chain: cells 0 to 18 closed on the first radius, cells 19 to 30 on the second; no cell needed a third and none failed.

### 15.5 Row accounting

| Cell | $\rho$ rows evaluated (least to most over pieces) | $\rho$ rows left out (least to most) | $\lambda$, $q$ rows evaluated | $\lambda$, $q$ rows left out | Rows with an active pulse | Seconds |
| --- | --- | --- | --- | --- | --- | --- |
| 24 | 98,314 to 100,014 | 49,032 to 50,732 | 100,254 | 48,792 | 240 | 28.2 |
| 25 | 100,232 to 101,024 | 48,022 to 48,814 | 101,102 | 47,944 | 240 | 29.3 |
| 26 | 101,054 to 102,222 | 46,824 to 47,992 | 102,508 | 46,538 | 336 | 28.8 |
| 27 | 102,444 to 105,468 | 43,578 to 46,602 | 105,586 | 43,460 | 336 | 29.8 |
| 28 | 105,492 to 106,984 | 42,062 to 43,554 | 107,078 | 41,968 | 288 | 30.7 |
| 29 | 107,090 to 108,378 | 40,668 to 41,956 | 108,490 | 40,556 | 288 | 37.8 |
| 30 | 108,412 to 108,962 | 40,084 to 40,634 | 109,148 | 39,898 | 288 | 38.2 |

Evaluated plus left out equals 149,046 in every case (checked by script). The $\lambda$, $q$ counts are the same on both attempts of a cell. For cell 30 the $\rho$ counts equal the corrected pilot's (40,084 to 40,634 left out); the $\lambda$, $q$ count left out is 39,898 here against 39,906 in the corrected pilot's `summary.json`, the chain's tube being a different one.

### 15.6 Comparison with the frozen subject, read only

Same reading and same caveats as Sections 6, 13.5 and 14.6: done after the run by the owner's `packet-analysis.py`; nothing from it enters the chain; plain readings rounded to the digits shown; no cause accepted and no frozen event margin transferred.

| Cell | $\rho$: new max; frozen max; receivers where new is above; largest excess | $\lambda$: new max; frozen max; receivers above | $q$: new max; frozen max; receivers above; largest excess | Position majorant out: new max; frozen max; receivers above; largest excess | Velocity majorant out: new max; frozen max; receivers above; largest excess |
| --- | --- | --- | --- | --- | --- |
| 24 | 0.06011; 0.08157; 932; 0.0022 | 54.68; 55.78; 0 | 0.07356; 0.07381; 14; $3.6\times10^{-4}$ | 0.00685066; 0.00689345; 758; $1.2\times10^{-4}$ | 0.0484273; 0.0492047; 764; $5.9\times10^{-4}$ |
| 25 | 0.07294; 0.1038; 954; 0.0023 | 63.77; 63.93; 4 | 0.08082; 0.08088; 24; $5.9\times10^{-5}$ | 0.00765384; 0.00771468; 758; $1.3\times10^{-4}$ | 0.0578280; 0.0590700; 780; $6.2\times10^{-4}$ |
| 26 | 0.08946; 0.1341; 992; 0.0023 | 75.50; 75.97; 0 | 0.09212; 0.09218; 28; $4.2\times10^{-5}$ | 0.00860460; 0.00869135; 758; $1.3\times10^{-4}$ | 0.0700236; 0.0720024; 784; $6.5\times10^{-4}$ |
| 27 | 0.1111; 0.1760; 1,036; 0.0024 | 90.46; 90.82; 0 | 0.1051; 0.1052; 26; $3.8\times10^{-4}$ | 0.00974303; 0.00986660; 756; $1.4\times10^{-4}$ | 0.0861708; 0.0892396; 804; $6.9\times10^{-4}$ |
| 28 | 0.1398; 0.2357; 1,010; 0.0025 | 110.5; 113.5; 0 | 0.1264; 0.1273; 28; $4.9\times10^{-4}$ | 0.0111809; 0.0113028; 760; $1.4\times10^{-4}$ | 0.108273; 0.113459; 798; $7.3\times10^{-4}$ |
| 29 | 0.1789; 0.3231; 974; 0.0026 | 137.5; 140.6; 0 | 0.1481; 0.1491; 32; $3.3\times10^{-4}$ | 0.0131104; 0.0133168; 772; $1.5\times10^{-4}$ | 0.139397; 0.147759; 798; $7.6\times10^{-4}$ |
| 30 | 0.2335; 0.4557; 982; 0.0027 | 176.9; 178.8; 2 | 0.1768; 0.1773; 34; $5.1\times10^{-5}$ | 0.0156386; 0.0160116; 772; $1.6\times10^{-4}$ | 0.185378; 0.198434; 802; $8.1\times10^{-4}$ |

Readings. The largest new $\rho$ is 0.74 of the largest frozen $\rho$ at cell 24 and 0.51 at cell 30, while per receiver the new value remains the larger at 932 to 1,036 receivers, by at most 0.0027. $\lambda$ is above the frozen value for the first time in the chain, at four receivers in cell 25 (by at most 0.020) and two in cell 30 (by at most 0.0088); $q$ is above it at 14 to 34 receivers per cell, by at most $4.9\times10^{-4}$. The position majorant is above the frozen one at 756 to 772 receivers and the velocity majorant at 764 to 804; the maxima over receivers are below the frozen maxima for both in every cell, and the gap widens to the end.

### 15.7 Continuity, saved state, resources

Checked by `packet-analysis.py` on the saved files, all true: cell 24's incoming arrays equal the resumed state's arrays and equal cell 23's outgoing arrays, exactly; each of cells 25 to 30 has incoming arrays equal to the preceding cell's outgoing arrays exactly; every cell is marked counted; the new state's arrays equal cell 30's outgoing arrays, its next cell is 31, its completed cells are 0 to 30 without gap and its start origin is unchanged; state and predecessor digests match. Attempts per cell: 2 in each.

| File in `claude-chain-24-30/chain/` | SHA-256 |
| --- | --- |
| `cell-24.npz` | `9a69caf773c19e46a7b62de070a8221f8fd75a27519cd3e168504c03c47373b0` |
| `cell-25.npz` | `31a824dfd66663463b50b867e65e64d62665a3d0beb6b62926054f619935e545` |
| `cell-26.npz` | `90149492821744240ef392d35bba1c714f7b18cdb2cbaa6197c58c69387b4e9a` |
| `cell-27.npz` | `faa4b1a8281e98f769598a194ec5eacfd7e2df956f324389db1485f1b21b2e5a` |
| `cell-28.npz` | `f122062db2992afa2e0e4699d5702079c210ed8d1ee5b172aaad4543dd2813d0` |
| `cell-29.npz` | `69329d0cdb370cce285d2ae95e54aa6a8301196cca59f81902cf27edaf09a6db` |
| `cell-30.npz` | `8c2e82a0c9a18c9baab36d670d793c3a663999361186ed098efc6e008fd029e2` |
| `chain-state.npz` (next cell 31, the end of the released range) | `504f1c37afac256973b2c95080362791b75753fd614229ce222ed678622aaf83` |
| `chain-state.json` | `839adbe81f1973c2a49ee924bc5349e52c8a4768b87f11a5b2f34ddb5fdff9af` |
| `summary.json` | `f020ee1b96b22ea4b09e545abba7b31fd3ee14c20ad1ed4017c272b09a087087` |

Supervisor run `660c1abb-d9db-45d5-8496-c0915b2502f0`: started 21:15:54.628Z, finished 21:19:54.314Z (239.7 s by the supervisor's clock), status completed, exit code 0, process group closed. Setup 15.9 s and the seven cells 222.8 s in total by the runner's timers. Peak resident memory 1,276,428,288 bytes as recorded by the runner. Failed or unfinished runs in this packet: none; `chain.stderr` is empty. Closeout for this owner task is recorded in the owner's `closeout.json`.

The runner refuses any first cell above 30, so this state cannot be resumed; it is the chain's final state.

### 15.8 The whole chain

| Packet | Cells | Owner under `event-cell-independent-2026-10-12/` | Supervisor run | Supervisor seconds | Cell seconds | Tube attempts |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 to 7 | `claude-chain-0-7/` | `66dad526-abbb-4bb4-9a2d-9f2fc5649607` | 167.9 | 151.1 | 1 each |
| 2 | 8 to 15 | `claude-chain-8-15/` | `8e92b424-3fce-453e-9cb3-104ee999694d` | 180.7 | 163.9 | 1 each |
| 3 | 16 to 23 | `claude-chain-16-23/` | `7f3e171c-6223-4e08-b646-a31cb854a624` | 216.1 | 199.6 | 1, 1, 1, 2, 2, 2, 2, 2 |
| 4 | 24 to 30 | `claude-chain-24-30/` | `660c1abb-d9db-45d5-8496-c0915b2502f0` | 239.7 | 222.8 | 2 each |

Four runs, each completed with exit code 0 and a closed process group; no failed run and no failed cell anywhere in the chain; 31 cell files, each holding all 1,502 receivers. The 31 cells took 737.4 s in total by the runner's timers.

What exists now is a complete set of per-receiver, per-cell $\rho$, $\lambda$, $q$ and a consistently propagated pair of position and velocity majorants from time five to $351/64$, with the comparison position, velocity and acceleration boxes and outgoing acceleration majorants saved per cell for a later extraction. What does not exist: any statement about the event. Whether these bounds suffice to locate or certify the later two-target event has not been examined in this campaign.

### 15.9 Retention

Owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-chain-24-30/`: `chain/` (cell-24 to cell-30, `summary.json`, `chain-state.npz`, `chain-state.json`); `chain.stdout`, `chain.stderr`; the two supervisor records, token redacted; `sources-as-run/`; `reviewed-report/` (this report as reviewed with the third packet, `4fbc44db…29cd`); `packet-analysis.py` (byte-identical to the second and third packets'), `packet-analysis.json`, `packet-analysis.stdout`, `packet-tables.md`; `closeout.json`; `commands.txt`; `outputs.sha256` (owner-relative) and `sources.sha256` (repository-relative). Every earlier owner was read, not written.
