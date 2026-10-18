# Independent staggered cells: pilot on the reviewed cell

Date: 2026-10-14. Author: Claude (session `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`), under Codex's pilot release of 10:04:10Z in the [staggered-cells conversation](../../../../op/agent-chats/2026-10-14-residuals-staggered-cells/chat.md) and the [campaign plan](staggered-cell-independent-campaign-2026-10-14.md). Status: late-cell value accepted by Codex at the pinned evaluator's scope (review entry 10:23:25.933Z); corrections RSC-01 to RSC-03 are in Section 11 (RSC-01 and RSC-02 resolved, method components accepted, by Codex's method review of 10:39:25.397Z); driver version 3 (Section 12) accepted by Codex's driver review of 10:46:43.505Z except for RSC-04, which driver version 4 resolves in Section 13, **pending Codex review**. Sections 1 to 10 are the reviewed bytes (`fbe978c1…bebd`, retained in `claude-supplement-1/`) except for this paragraph and the two control rows of Section 4, which now point to Section 11. Only the pilot cell was evaluated; no other cell was started.

## 1. Outcome

1. **The pilot passes.** A new general cell driver, built around the reviewed corrected evaluator as a pinned mathematical input, encloses the comparison curve's equation defect on the whole cell $[149/16,\,2385/256]$ (table index 656) by $0.0015550587367998904$, inside the frozen subject's $0.023476976833088595$. Every scientific field of the receipt equals the reviewed version-2 receipt for the same cell. That equality is a deterministic repetition and checks the new driver's loop; it is not new evidence about the bound, whose validity rests on the reviewed evaluator.
2. **The table is measured from the frozen bytes.** 658 cells, contiguous from time zero with exact dyadic joins: 576 of width $1/64$ through 9, then 82 of width $1/256$ through $1193/128$. The pilot is index 656; the complement is indices 0 to 655 and 657, 657 cells, listed in `cell-table-and-complement.json`.
3. **Measured cost.** 56.3 s wall for the cell at 4,096 subintervals (13.7 ms per subinterval), 41.6 MB peak resident memory, one process.
4. **A precise limitation, before any early cell is attempted.** The pinned evaluator encloses every source emitted before time zero by the constants $0<Q\le a$, $0<Q'\le\lambda_c a$. A lattice-sum estimate (Section 6) puts the resulting width of the acceleration enclosure at about $10^{-8}$ at every reception time up to the event, which is about $10^4\,a$ at time zero, where the true acceleration is about $7.8\,a$. Fed into error propagation with growth $e^{\lambda t}$, about $2\times10^{11}$ by the event, that cannot force the event. So the pinned evaluator is sufficient for late cells like the pilot but not, as it stands, for the early cells; a rigorous enclosure of $a e^{\lambda_c s}$ for $s\le0$ is needed, as a new, separately controlled component.
5. **Propagation inputs are identified, not computed** (Section 7). The defect is one of six inputs a fresh error propagation needs.
6. **Feasibility.** At the pilot's resolution the 657 cells would take about ten hours, longer than the window; at coarser resolution they would fit but with wider bounds whose sufficiency is untested. Both are extrapolations from one cell. Section 8 proposes a short measurement packet before any coverage packet.

## 2. Inputs, authenticated

| Input | Path under `.local-data/master-equation-closure/` | SHA-256 | Role |
| --- | --- | --- | --- |
| Comparison archive | `staggered-first-event/evolution/refinement512/trajectory.npz` | `83f0f474…851b` | Defines the comparison curve and carries the group table; shared by definition |
| Frozen cell table | `staggered-first-event/integration/residual-refined-complete.json` | `fc190da5…a9f4` | Cell identities only; frozen values read after computation, for comparison |
| Stationary coefficient and tail receipts | `next-event/independent/cubic-shell-target.json`, `stationary-full-coefficients-target.json`, `stationary-full-tail-target.json` | as pinned in the evaluator | Shared named references |
| Characteristic-root receipt | `staggered-first-event/independent/lambda-reference.json` | `2747dddd…c558` | Known case only |
| Pinned evaluator | `reference/…/lattice-research/evidence/serial-staggered-cell-enclosure-v2-2026-10-10.py` | `8f08b1cd…e51e` | Mathematical input, never modified |

The archive has 4,773 nodes at spacing $1/512$ from 0 to $1193/128$, amplitude $2^{-40}$ and saved exponent $\lambda_c=2.795230690086811$; the group table has 3,073 rows.

## 3. Instrument and derivation

New file: `lattice-research/evidence/staggered-cell-independent-2026-10-14/staggered_cell_driver.py`, SHA-256 `8e9f538c5b2e2ab31f6bd4086d125f428fcf0e6ad6f33fa75a4cd9455cd3009a`, the version that passed known run 3 and ran pilot 2 (Section 10 lists the two earlier versions).

The defect is $\rho(t)=Q''(t)-\mathcal F[Q](t)$, with $\mathcal F=16\,[S(Q(t))+\sum_d(\text{row}_d-\text{static row}_d)]$ over the 24,388 labels of the radius-14 cube in 3,073 exact $(m,p)$ groups, plus a remote changing-source tail; the formulas are those of the [coverage report](serial-staggered-residual-coverage-2026-10-10.md), Section 5. The driver divides a table cell into $N$ dyadic subintervals, each inside one archive cell with exactly representable endpoints, and encloses $\rho$ over each whole subinterval with the evaluator's outward interval arithmetic; the cell bound is the largest magnitude plus the remote tail, rounded upward.

| Component | Status |
| --- | --- |
| Interval arithmetic, quintic reconstruction, comparison curve, roots and rows, stationary field, remote tail, the per-subinterval `defect` | Unchanged: the pinned evaluator's functions, called as they are |
| Loading | New: the evaluator dispatches a command line at import, so its bytes are hash-checked and executed into a private namespace with a command line it rejects, after all definitions have run |
| Table authentication and indexing | New, controlled (K2) |
| Loop over an arbitrary table cell | New; generalizes the evaluator's one-cell routine without changing any arithmetic call; controlled (K7, K8) |
| Literal source cube and shell cancellation | New controls (K4, K5) on the shared group table |
| Seam at time zero | New control (K6) |

Why no time-zero acceleration-jump allowance is needed. That allowance repairs a derivative transfer, which this method does not use. $Q''$ enters only at reception times, each inside one archive cell with $t\ge0$. At source times only $Q$ and $Q'$ enter; the comparison is $C^1$ across zero, and a source box straddling zero is enclosed by the hull of the quintic on its nonnegative part and the constant bounds on its negative part. No continuity of $Q''$ is assumed.

## 4. Known controls, before the target

Nine control groups (`known-run3.json`), the first of which reruns the pinned evaluator's own sixteen:

| Control | What it checks | Requested item it covers |
| --- | --- | --- |
| K0 | The evaluator's sixteen groups pass through the namespace: interval quotient, square root, mixed product, quintic exact on a degree-five polynomial, archive node jets at three cells, static lattice zero, 3-4-5 static row, growth root against the certified $\lambda$, stationary field sign and size, outward $1+2^{-54}$, rational upward conversion and $e^{-1}$ bound, exact moving source (root $-5$, range 5, $D=9/10$, changed row $4/1125$), four refusals (bracket excluding the root, unit-speed source, understated root box, zero-containing divisor), non-dyadic subdivisions, literal receipt hash | outward arithmetic and tiny sums; Hermite jets; static cancellation; growth normalization; exact moving Pythagorean row and root; missing root, inadmissible speed, understated box, zero denominator, non-dyadic subdivision, failed containment |
| K1 | The loader refuses evaluator bytes with one appended byte | pinned identity |
| K2 | Synthetic 576 + 82 table accepted with the pilot at 656; gap, overlap, wrong width, missing cell, nonzero start refused. **Corrected (RSC-02):** its non-dyadic case used binary64 0.1, which is dyadic, and was refused for its width; driver version 2 uses exact 1/10 and asserts the non-dyadic reason (Section 11.2) | table and seams |
| K3 | $-1/3$ strictly enclosed; $-9/256$ exact; the outward sum of $\pm2^{-1074}$ encloses 0 | negative and tiny conversions |
| K4 | Literal enumeration of the cube: 24,388 labels, 3,073 $(m,p)$ groups, identical keys, multiplicities and parities to the archive table | source-group multiplicity |
| K5 | Every one of the 346 $|d|^2$ shells has vertical second moment exactly one third of its trace, in rationals | exact shell cancellation |
| K6 | Over $[-1/2048,1/2048]$ the enclosure contains $Q$ and $Q'$ on both sides of zero | source seam |
| K7 | Non-power-of-two counts refused. **Corrected (RSC-02):** its straddling case used `pieces=1`, refused as not a power of two before the straddling guard; driver version 2 uses 2 pieces on $[0,1/64]$ and asserts the straddling reason (Section 11.2) | dyadic subdivision |
| K8 | The driver loop on two subintervals equals direct calls of the pinned `defect` | driver glue |

Not covered, by design or by scope: curved-source acceleration-sensitive differentiation (not used by a direct method); the nonlinear ancient allowance $K_0a^2e^{2\lambda s}$, which concerns the actual branch's incoming error and enters propagation, not the comparison's defect; and the early-cell treatment of Section 6, which does not exist yet. K6 also exposes the limitation directly: its enclosure of $Q$ over the seam box is $[0,\,9.107\times10^{-13}]$, the lower end being the constant bound.

## 5. Pilot result

| Quantity | Value |
| --- | --- |
| Cell, index | $[149/16,\,2385/256]$, 656 |
| Subintervals | 4,096 |
| Defect bound, including the remote tail | $0.0015550587367998904$ |
| Enclosure of $\rho$ without the tail | $[-0.0015129306636412212,\,0.0015550587362804793]$ |
| Remote changing-source tail | $5.194108628084432\times10^{-13}$ |
| Comparison displacement, supremum through the cell | $0.23662350274552965$, below $1/4$ |
| Latest emission | $8.576571983422143$, before the cell |
| Smallest range; smallest transmitter factor | $0.7398342665778594$; $0.9337417411447414$ |
| Frozen bound, read after computation | $0.023476976833088595$; the new bound is below it |
| Wall time; peak memory | 56.3 s; 41,582,592 bytes |

Grade: derived enclosure computed by the reviewed evaluator through the new driver, on this cell only. Every field above equals the reviewed version-2 receipt (`cell-runs-v2/v2c1-pieces4096-2026-10-10/`), as expected of the same arithmetic.

## 6. Why the early cells need more than the pinned evaluator

For a source emitted before zero the pinned evaluator uses $Q(s)\in[0,a]$ and $Q'(s)\in[0,\lambda_c a]$ instead of $a e^{\lambda_c s}$. A changed row's sensitivity to its source displacement is at most $2/r^3$ and to its source velocity about $1/r^2$, so the constants widen $\mathcal F$ by roughly $16\,a\sum_d(2/r^3+\lambda_c/r^2)$ over the sources that emit before zero. Over the radius-14 cube, $\sum2/r^3=79.70$ and $\sum1/r^2=213.70$ (multiplicity-weighted, computed from the group table), so at reception times in the first cell, when every source emits before zero, the widening is about $9.9\times10^{-9}$, that is about $1.1\times10^4\,a$, against a true acceleration of about $\lambda^2a=7.1\times10^{-12}$ and a frozen defect bound of $7.8\times10^{-15}$. The sources farther than $t$ keep it near $10^{-8}$ through the whole table ($9.4\times10^{-9}$ at $t=1$, $4.5\times10^{-9}$ at $t=9.3$).

Grade: inferred, from the formulas and the computed lattice sums; no early cell was evaluated. Consequence: a defect of order $10^{-8}$ near time zero, propagated through growth of order $e^{\lambda\cdot9.32}\approx2.1\times10^{11}$, gives errors far above the event's displacement scale of about $0.24$. This is a method insufficiency, not a physical finding. The remedy is a rigorous enclosure of $a e^{\lambda_c s}$ and its derivative on $s\le0$, with its own controls; with it, the remote-source widening scales with the actual source displacement, and the remaining width is set by the subinterval size.

## 7. Inputs a fresh error propagation needs

From the [first-event derivation](staggered-lattice-first-event.md), Sections 5, 6 and 8, a cell's majorant step $P''=L_jP+Q_j$ needs, besides $\rho$:

1. the signed receiver coefficient $L_j\ge|g[S'(q)+\sum_d\sigma_d(J_d-H_0)]|$ over the cell's receiver tube, summed with signs before the absolute value, with $J_d$ including the source-acceleration term;
2. the delayed linear term $(g/3)\sum_d|d|^{-2}V(t-|d|)$ from the velocity-error table;
3. the four nonlinear difference terms of equation (16), needing $B_d$, $B_*$, $H_*$, the root shift $|s-s_0|$ and the acceleration-error table over the interval joining $s$ and $s_0$;
4. the incoming error for $s\le0$: $K_0a^2e^{2\lambda s}$ plus the $\lambda$-versus-$\lambda_c$ discrepancy over $[-64,0]$, and the remote tails (18) and (19);
5. the one-sided acceleration jump of the comparison at zero, in the acceleration-error table;
6. a tube radius per cell, closed strictly by the positive series step.

None of these is computed in this pilot. Items 1 and 3 need new interval formulas, including the source acceleration $Q''(s)$ over root boxes, which the pinned evaluator does not enclose; each would need its own controls. Item 4 uses the accepted incoming theorem and the certified $\lambda$ as shared inputs.

## 8. Proposed serial route and budget

Measured: 13.7 ms per subinterval on the pilot cell. A width-$1/64$ cell needs a multiple of 8 subintervals (one archive cell each), a width-$1/256$ cell a multiple of 2. The following are extrapolations from that one cell, not cost results: at the pilot's subinterval width ($1/2^{20}$) a $1/64$ cell needs 16,384 subintervals, about 3.7 minutes, so the 576 prefix cells would take about 36 hours; at 4,096 per cell, about 56 s per cell and ten hours for all 657; at 1,024 per cell, about 14 s and 2.6 hours, with bounds roughly four times wider than at 4,096. The window has about 5.4 hours of compute left.

Proposal, for Codex to release or change:

1. **Packet S1, method extension and measurement, no coverage counted.** A separately versioned driver adding a rigorous enclosure of $a e^{\lambda_c s}$, $\lambda_c a e^{\lambda_c s}$ for $s\le0$ (exact rational Taylor bounds with outward conversion, controlled against independent Fraction series and the seam), the evaluator's other arithmetic unchanged. Then measure cost and bound on two cells, index 0 and index 288 ($[9/2,\,289/64]$), each at two subdivision counts. About 15 minutes.
2. **Packet S2, propagation instrument**, separately derived, known-first, for the six inputs of Section 7, run on the cells covered so far.
3. **Coverage packets**, serial and reviewed, sized from S1's measured cost, earliest cells first, since propagation consumes them in order.

Without S1 there is no measured basis for choosing a subdivision for 657 cells, and with the pinned evaluator unchanged the early cells would be covered but useless for propagation.

## 9. Shared inputs and falsifiers

Shared: the archive and its group table (the multiplicities also checked here by literal enumeration), the stationary coefficient and tail receipts, the frozen table's cell identities, and the characteristic-root receipt (known case only). Agreement with the frozen bound is not a proof of any of them.

This would be shown wrong by: an independently evaluated subinterval of the pilot cell whose defect lies outside $[-0.0015129306636412212,\,0.0015550587362804793]$ widened by the tail; a root of a radius-14 source outside its box; a table cell other than those in `cell-table-and-complement.json` in the frozen bytes; a failed outward operation in the pinned arithmetic; or an early cell, evaluated with an exact pre-zero history, whose acceleration enclosure is not much narrower than Section 6's estimate.

## 10. Runs, failures and retention

| Run | Outcome |
| --- | --- |
| Known 1 | **Failed** before any control ran: the driver located the repository root one directory too high (`parents[5]` for a file one level deeper than the evaluator). Driver `5ebd81dc…f7b2`. Retained (`known-run1.stdout/.stderr`, `sources-known1/`) |
| Known 2 | Passed 9 of 9 after that one-line fix. Driver `6ab04c67…96ff` (`known-run2.json`, `sources-known2/`) |
| Pilot 1 | **Failed** after the loop completed: an operator-precedence error in the receipt file name raised a `TypeError`, so no receipt was written. Supervisor run `788bb44c-59cf-4a96-986f-0aea10494832`, exit 1, group closed; its progress log showed the same final enclosure. Retained (`pilot.stdout/.stderr`, `pilot-cell656-pieces4096/progress.jsonl`, supervisor records) |
| Known 3 | Passed 9 of 9 for the fixed bytes, driver `8e9f538c…009a` (`known-run3.json`, `sources-known3/`) |
| Pilot 2 | Completed. Supervisor run `fcae377a-ffc1-45e9-8d25-270a0eacde50`, 10:11:30.385Z to 10:12:26.712Z, exit 0, group closed (`pilot-run2-cell656-pieces4096/cell-656.json`, `progress.jsonl`) |

Owner `.local-data/master-equation-closure/staggered-cell-independent-2026-10-14/claude-pilot/`: the receipts and sources above, `cell-table-and-complement.json`, supervisor records with the token redacted, `closeout.json`, `commands.txt`, `outputs.sha256` (owner-relative) and `sources.sha256` (repository-relative). Nothing frozen, no original receipt and no Codex folder was written to.

## 11. Corrections after review (RSC-01 to RSC-03)

Codex's [pilot review](staggered-cell-independent-pilot-review-2026-10-14.md) accepted the late-cell value at the pinned evaluator's scope and raised three comments. They are resolved below, except for one preparation step named in 11.3 that is not yet built. No physical cell was evaluated for these corrections; the pilot receipt is unchanged. New files: `staggered_cell_driver_v2.py` and `staggered_early_method.py` beside the driver; new owner `.local-data/master-equation-closure/staggered-cell-independent-2026-10-14/claude-supplement-1/`. The original driver, its receipts and the pilot owner are unchanged.

### 11.1 RSC-01, the requested reads

The pilot entry stated that these reads had not been done; that statement was true when made at 10:16:26Z and is preserved there. After it, between 10:16Z and 10:17Z, I read: the incoming-history construction `smooth-two-particle-incoming-reachability.md` (446 lines), its domain document (316 lines) and its independent adjudication (399 lines), each in full; the lattice `priorities.md` (87 lines) and `work-queue.md` (114 lines), in full; and, of the canonical `content/markdown/aaa/dynamics/master-equation.md` (5,917 lines), only the sections that define the equation used here: path-history sum and integral representation (lines 83 to 164), the canonical form with per-hit and total acceleration and its conventions and exclusions (lines 1363 to 1533), and direction, sign, scaling and normalization (lines 1751 to 1816). The rest of that document is not read.

Scope of these reads: they establish the scenario definitions I use (polarity and sign convention, the transmitter factor $D=1-\mathbf n\cdot\mathbf v$, the excluded zero-delay root, the exact two-sublattice reduction, the incoming bound $|q^{(k)}-\lambda^ka e^{\lambda t}|\le(2\lambda)^kK_0a^2e^{2\lambda t}$ and the roles of $\lambda$ and $\lambda_c$). They are not an independent proof review of those documents. One consequence for this campaign: the comparison's pre-zero history is $a e^{\lambda_c s}$ by definition, while the actual branch's exponent $\lambda$ and correction $K_0a^2e^{2\lambda s}$ bound the actual-minus-comparison error and enter propagation only.

### 11.2 RSC-02, the two negative controls

Driver version 2, SHA-256 `20dfcb1c781a615c2ab291a05afce86759907e3898c279e876dfdfb48d2fb67f`, changes only K2 and K7 (52-line diff retained as `driver-v1-to-v2.diff`). Each refusal is now asserted by its reason, and the reasons are recorded in `driver-v2-known-run1.json`, which passed 9 of 9 on its first run:

| Case | Reason recorded |
| --- | --- |
| gap; overlap | gap or overlap before cell 10 |
| wrong width | cell 600 has width 1/128, not 1/256 |
| exact non-dyadic 1/10 | non-dyadic endpoint in cell 5 |
| missing cell | table has 657 cells, not 658 |
| nonzero start | table does not start at time zero |
| 1000 pieces on the pilot cell | pieces must be a power of two |
| 2 pieces on $[0,1/64]$ | subintervals would straddle archive cells |

No arithmetic or target path changed, so the pilot was not rerun. The frozen table's exact pins already excluded the malformed intervals these controls simulate.

### 11.3 RSC-03, early-cell method preparation

The early cells need three things the pinned evaluator does not supply. Two are now built and controlled; the third is identified and not built.

**(a) Rigorous pre-zero history.** For $s\le0$ the comparison is $Q(s)=a e^{\lambda_c s}$, $Q'(s)=\lambda_c Q(s)$, with $a=2^{-40}$ and $\lambda_c$ the saved binary64 exponent taken as an exact rational. For rational $x\le0$, choose $j$ with $|x|/2^j\le1/8$ and $y=x/2^j$; the order-24 Taylor sum $S$ and the Lagrange remainder $R=|y|^{25}/25!$ (valid because $e^\xi\le1$ for $\xi\le0$) give $e^y\in[S-R,S+R]$, both ends positive. Each end is rounded outward to 160 significant bits and the interval is squared $j$ times with outward rounding. A table holds $e^{-\lambda_c k/1024}$ for $k\le32768$ (down to $s=-32$), built from one rigorous base by outward powers. At a box endpoint $s$, with grid point $g\le s$ and $x=\lambda_c(s-g)\in[0,\lambda_c/1024]$, $e^{\lambda_c s}=e^{\lambda_c g}e^x$ with $T_4(x)\le e^x\le T_4(x)+x^5/60$; the series constants are rounded outward. Monotonicity gives the box hull. A box straddling zero takes the hull with the quintic.

**(b) Cancellation-preserving changed row.** With $u=Q(s)$, $w=Q'(s)$, $z_0=Q(t)-m$, $z=z_0-\sigma u$, $r^2=p+z^2$, $n=z/r$, $D=1-\sigma nw>0$, $f(z)=z(p+z^2)^{-3/2}$ and $H=f'=(p-2z^2)(p+z^2)^{-5/2}$,

$$
\sigma\left[\frac{f(z)}D-f(z_0)\right]=-u\int_0^1H(z_0-\theta\sigma u)\,d\theta+\frac{n^2w}{r^2D}.
$$

This is the identity in Codex's review, rederived: $f(z)-f(z_0)=(z-z_0)\cdot$(mean of $H$ on the segment) with $z-z_0=-\sigma u$, and $\sigma f(z)(D^{-1}-1)=\sigma f(z)\,\sigma nw/D=n^2w/(r^2D)$ because $f(z)=n/r^2$. The integral is enclosed by $H$ over the interval hull of the segment, after asserting $p+z^2>0$ on the whole hull. The implementation takes its root boxes from the pinned evaluator's `rows` and recomputes each row by the identity.

*Rounding account* (derived, as a bound on magnitudes). No two order-one rows are subtracted. The only near-equal order-one subtraction left is $z_0=Q(t)-m$, whose absolute rounding of about $10^{-16}$ enters only the smooth factor $H$, which multiplies $u\approx10^{-12}$, so it contributes about $10^{-28}$ per row. The rows are summed by the pinned outward exactly rounded sum, and the defect subtracts two quantities of about $10^{-11}$ with outward rounding of about $10^{-27}$. What remains in an early cell is the width from the dependence of each term on its reception subinterval and root box, which S1 must measure.

**Known controls, before any target** (`method-known-run4.json`, method SHA-256 `b844ab44b102a7e1835720fef7c8f19b8d72d7bc60cd04eff2c56d2c587ef8a0`, 6 of 6):

| Control | Result |
| --- | --- |
| M1 exponential at $-1/8$, $-1$, $-7.3$, $-70$, $-10^{-6}$ against an 80-digit mpmath 1.3.0 evaluation | enclosed; relative widths below $10^{-45}$ |
| M2 $Q=a e^{\lambda_c s}$ at five points down to $-31.9$, same reference | enclosed; relative widths at most $3.0\times10^{-15}$ |
| M3 seam box $[-2^{-12},2^{-12}]$ | $Q$ and $Q'$ enclosed at both ends; lower ends above $0.99a$ and $0.99\lambda_ca$, where the pinned evaluator gives 0 |
| M4 identity, exact rationals | $7/144$ ($p=0$, $z_0=4$, $\sigma=1$, $u=1$, $w=0$), $11/180$ ($p=0$, $z_0=3$, $\sigma=-1$, $u=1$, $w=1/4$) and $4/1125$ (moving 3-4-5 row) enclosed; segments $u=2^{-20}$ and $u=2^{-40}$ enclose their exact values with relative width below $10u$ |
| M5 axial segment reaching zero range | refused for that reason |
| M6 growth normalization at the actual amplitude $2^{-40}$, reception $t=0$, pure exponential history, radius-14 cube | $16\sum$ of identity rows equals $\lambda^2a$ within $1.2\times10^{-13}$ relative, relative width $2.3\times10^{-13}$ |

M6 also measures, on the same synthetic history at the same point, what the pinned rows give: relative width **1.78** with the exact pre-zero history, and **568** with the pinned constant bounds. So at the early amplitude the subtraction alone destroys the result, as the review said, and the identity removes that loss. This is a known case on a synthetic history at one reception time, not an early cell. M4's first case is wider than the monotone range $[1/32,2/27]$ given in the review because my interval evaluation of $H$ over a long segment has dependency width; the exact value is enclosed, and over the short segments of real rows the width scales with the segment, as the $u=2^{-20}$ and $2^{-40}$ cases show.

Three method runs failed before the passing fourth, all retained with their sources: run 1 indexed a 0-d result in the growth control; run 2 failed three controls of mine (an $x^4$ remainder too coarse for my own width threshold, which I fixed by carrying the series one order further; a seam check whose relative margin was tighter than the enclosure; and the long-segment range above); run 3 failed only my short-segment threshold, which I then set from the identity's scaling. None was an invalid enclosure.

**(c) Not built: a stationary remainder that scales with $|Q|$.** The pinned `field16` adds the tabulated stationary tail at the smallest tabulated radius not below $|q|$. The smallest tabulated radius is $1/10$, where the g-included tail is $1.736\times10^{-8}$. Every early cell would therefore carry a $\pm1.7\times10^{-8}$ floor regardless of the method above. I read the shared tail reference `next-event/independent/stationary-full-tail.py`: its bound is a sum of positive monomials in the radius $B$, lowest power $B^5$, valid for $|q|\le B$ with $B^2/m<1$. Evaluating that same formula at the cell's own $\sup|Q|$ (about $10^{-12}$ early) would give a floor near $10^{-60}$. That is an evaluation of a pinned shared reference at a new radius, whose majorant property I take from reading its source rather than re-proving; it would be a declared shared input. It is not implemented.

### 11.4 Proposed S1, for release or change

Before any cost run, a driver version 3, with its own known controls: (i) the history of (a); (ii) the rows of (b); (iii) the stationary field of the pinned coefficients with the tail from (c) at the cell's $\sup|Q|$; (iv) the same dyadic loop as version 2. Its controls: loop glue against direct calls; on two subintervals of the already covered pilot cell, the new and pinned enclosures must intersect (both valid), as a diagnostic only; the refusals of version 2. Then the bounded experiment: cells 0 and 288, each at two subdivision counts (for example 64 and 512 per cell), one supervised job, deadline 15 minutes, reporting bound, width split and wall time, and counting as no coverage. Defect bounds alone do not settle sufficiency; the propagation inputs of Section 7 remain separate.

### 11.5 Retention for the corrections

Supplement owner: `reviewed-report/` (the reviewed bytes), `driver-v1-to-v2.diff`, `driver-v2-known-run1.json` with its outputs and `sources-known1/`, `method-known-run1` to `-run4` with outputs and `sources-method-run1/` to `-run4/`, `closeout.json`, `commands.txt`, `outputs.sha256` and `sources.sha256`.

## 12. Driver version 3: early-cell method admission

Codex's [method review](staggered-cell-independent-method-review-2026-10-14.md) accepted the pre-zero history and the cancellation identity and derived a radius rule for the stationary tail. Driver version 3 wires them together; it was admitted by known controls only. No physical cell was evaluated: the only reception times used are two subintervals of the already covered pilot cell, as a diagnostic in V6. The reviewed report bytes (`4cb450ed…4137`) are retained in `claude-supplement-2/`.

**File:** `lattice-research/evidence/staggered-cell-independent-2026-10-14/staggered_cell_driver_v3.py`, SHA-256 `c4a28b1bb78ee54b2345097496abd7d1f4fa4e36a2de390b097f1c8377b33e67`. It loads driver version 2 (`20dfcb1c…b67f`) and the method (`b844ab44…f8a0`) by their pinned hashes, and through version 2 the pinned evaluator; none of them is changed.

**What is new in version 3.**

1. *Source orders.* The early history is admitted for $Q$ and $Q'$ only; order 2 is refused. Pre-zero source times outside $[-32,0]$ remain refused by the method's table.
2. *Radius-scaled stationary remainder.* Using the review's rule from the frozen positive series, for a tabulated radius $B_0$ and $0\le B\le B_0$ the field tail is at most $(B/B_0)^5$ times its stored value, and the receiver-Jacobian tail at most $(B/B_0)^4$ times its stored value. The stored values include $g=16$ already. $B$ is $\sup|q|$ over the reception subinterval, rounded upward. For a defect the receiver is the comparison itself; a propagation step must use its full trial-tube radius instead. $B_0$ is the smallest tabulated radius at or above $B$. Radii above $7/20$ and negative radii are refused. The scaling is exact rational arithmetic on the stored binary64 values, each an upper bound of its exact rational, with one upward conversion. The tail reference's dispatcher is not executed; its receipt is read as data and pinned (`b0802d32…ba2`).
3. *Stationary polynomial.* The cubic and the potential degrees 6 to 14 from the pinned coefficient receipts are evaluated exactly as the pinned field routine evaluates them, with the scaled tail in place of the fixed one.
4. *Defect.* On a subinterval, $\rho=Q''(t)-[16S(Q(t))+16\sum(\text{identity rows})]$. The cell bound adds the pinned remote changing-source tail at the cell's right end and rounds upward. Root boxes, positive transmitter factors and positive segment ranges are all asserted as before.

**Known controls, first run, 8 of 8** (`v3-known-run1.json`):

| Control | Checks |
| --- | --- |
| V0 | Archive, frozen table, pinned evaluator, stationary-tail receipt and characteristic receipt match their pins; a wrong method pin is refused |
| V1 | Source order 2 refused for its reason; orders 0 and 1 give positive enclosures |
| V2 | A pre-zero box below $-32$ refused for its reason |
| V3 | Scaling bounds the exact polynomial $2B^5+3B^7$ at $0$, $1/4$, $1/2$ and refuses $3/4$ for a table at $1/2$. On the frozen table: zero at 0, the stored value at $1/10$, $1.08\times10^{-63}$ at $2^{-40}$ for the field and $5.9\times10^{-51}$ for the Jacobian; $0.36$ and $-0.1$ refused |
| V4 | Planted failures refused for their reasons: vanishing transmitter factor, zero-range segment, displacement outside the $1/4$ ball |
| V5 | $16S(1/8)$ encloses the exact rational polynomial at both coefficient extremes |
| V6 | The loop on two subintervals of the covered pilot cell equals direct calls; each new enclosure overlaps the pinned one, widths about $0.80$ against $5.6$. Diagnostic only, both being valid enclosures |
| V7 | Non-power-of-two and archive-straddling subdivisions refused for their reasons |

V6's width ratio is an observation about the two methods on two subintervals of a late cell, not a measured cell bound and not an independent reference for the acceleration. The difference is that the identity removes the subtraction there as well.

**Proposed S1 job (not run).** One supervised job, deadline 900 s, four runs in sequence into a fresh owner: cell 0 at 64 and at 512 subintervals, then cell 288 at 64 and at 512. Each runs `staggered_cell_driver_v3.py cell <fresh dir> <passing v3 known receipt> --cell <k> --pieces <N>`. Fields reported per run: the defect bound and its enclosure without tail, the remote tail, the largest scaled stationary tail, $\sup Q$, earliest and latest emission, smallest transmitter factor and range, loop and wall seconds, and peak memory, with the frozen bound printed beside the result only after computation. These runs count as no coverage. Their purpose is to measure the early-cell width and cost that every later choice depends on. The propagation inputs of Section 7 remain separate.

Retention: `claude-supplement-2/` holds the reviewed report, `driver-v2-to-v3.diff`, the three sources as run, the known receipt with its output, `closeout.json`, `commands.txt`, `outputs.sha256` and `sources.sha256`.

## 13. Driver version 4: target-time data admission (RSC-04)

Codex's [driver review](staggered-cell-independent-driver-review-2026-10-14.md) accepted version 3's mathematics and controls and found one admission gap: the target path opened the frozen table and archive without authenticating their current bytes. Version 4 closes it; no arithmetic changed and no cell was evaluated.

**File:** `staggered_cell_driver_v4.py`, SHA-256 `4ca1813ce404ea00adf0bbc374e2c8c4cf7952c193237b1dcb22fff648ab2d40`; the 62-line diff from version 3 is retained as `driver-v3-to-v4-final.diff`. A new helper, `admit_data`, reads a file's bytes once, checks their SHA-256 against the pin, and parses those same bytes, so the authenticated bytes are the ones used. The target path calls it for the table and the archive immediately before use and records path, SHA-256 and byte count in its output under `data_identities`. The known admission calls the same helper (V0). A new control V8 writes a temporary synthetic file and checks two things. With a wrong expected hash it is refused with "data identity differs"; with its right hash it is parsed from the authenticated bytes. No frozen file is touched.

**Known controls:** 9 of 9 on run 2 (`v4-known-run2.json`), with the recorded identities archive `83f0f474…851b` (482,100 bytes) and table `fc190da5…a9f4` (586,121 bytes). Run 1 failed in the new identity-recording line, before any control was reached: it called `relative_to` on a relative path. It is retained with its source and its leftover temporary synthetic file. The fix resolves the path first; nothing else changed.

The S1 job of Section 12 would use version 4 in place of version 3. Retention: `claude-supplement-3/` holds the reviewed report (`f577240b…b49a`), both diffs, the sources of both runs, the receipts, `closeout.json`, `commands.txt`, `outputs.sha256` and `sources.sha256`.
