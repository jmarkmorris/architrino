# Independent staggered cells: last coverage packets, propagated error and first event

Date: 2026-10-20. Author: Claude (session `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`, residuals), in the six-hour window Op opened directly in residuals at 20:48:06Z, recorded in the [staggered-cells conversation](../../../../op/agent-chats/2026-10-14-residuals-staggered-cells/chat.md). Reviewer: Codex gpt-6.1-sol at high effort in a read-only sandbox (Op's direction); its replies are kept verbatim in `.local-data/master-equation-closure/staggered-cell-independent-2026-10-14/claude-review-channel/`.

**Status: ✓ computed and reviewed (review 3, 21:57:17Z: no blocking findings).**
- **Review 1** (assembly derivation, reading only) returned three blocking and two should-fix findings. All are addressed in Section 3.
- **Review 2** (fixes, packets E and F, propagation and extraction) found no defect in the assembly, the packets or the numbers. It supported the recorded result with the reviewer's own computations, listed in Section 7.
  - Its one blocking finding concerned the extraction command, which did not authenticate its propagation inputs, plus one missing-control item.
  - Both are fixed in Section 5, and the corrected command reproduces the result exactly.
- **Review 3** confirmed both fixes with the reviewer's own mutation tests: zeroed bounds are now refused before use, and E3 and E4 fail when what they guard is removed. Its replay of the extraction matches the receipt.

This document does not change the [coverage record](staggered-cell-independent-coverage-2026-10-14.md) or the [assembly preparation status](staggered-cell-independent-assembly-2026-10-15.md). Both are bound by digest in review manifests, so later results are recorded here instead.

## 1. Result in brief

**Current certificate (Section 8, reviewed).**
$$\frac{2383}{256}<t_*<\frac{4769}{512},\qquad 9.30859375<t_*<9.314453125,$$
- $q''(t_*)>6.4036$, so $\mathbf V_i\cdot\mathbf A_i>6.4036$ for every label;
- distinct-label separation above $0.52742$;
- final error bounds $|h|\le1.71\times10^{-3}$ and $|h'|\le1.27\times10^{-2}$;
- receiver tube at most $0.2441<1/4$.

It is inside the frozen bracket and three-eighths of its width: $1191/128<t_*\le1193/128$. Its margins exceed the frozen ones ($5.9711$, $0.50889$). The bullets below record the first, wider certificate from the v6 suffix bounds. It remains valid and is contained in the frozen bracket.


- **Coverage complete.** The last 81 table cells (576 to 655 and 657) now have independent comparison-defect bounds, so all 658 cells are covered (pilot 656 separately).
  - The new bounds are valid but 9.4 to 14.6 times wider than the frozen subject's, rising from $7.7\times10^{-3}$ to $0.23$.
- **Propagation complete.** The actual-minus-comparison error is propagated through all 658 cells with a strict tube closing on every cell.
  - At $t=1193/128$ the bounds are $|h|\le3.20\times10^{-3}$ and $|h'|\le3.35\times10^{-2}$.
- **First event.** The extracted speed-one event of the exact branch satisfies
  $$\frac{4765}{512}<t_*<\frac{4771}{512},\qquad 9.306640625<t_*<9.318359375,$$
  - At $t_*$, $q''(t_*)>5.9149$, so $\mathbf V_i\cdot\mathbf A_i>5.9149$ for every label.
  - Distinct-label separation stays above $0.51629$ up to the bracket's end.
  - This lies inside the frozen certificate's bracket $1191/128<t_*\le1193/128$ and is narrower. The frozen values were read only after computation.

**Grade:** derived bounds computed by new instruments and independently checked by the reviewer's own code (Section 7). The computation is independent of the frozen subject's propagation: it shares no error arrays, and the frozen table supplies only cell intervals and post-computation comparisons. Shared premises are the archive comparison curve, the group table, the stationary coefficients and tail series, the characteristic-root receipt, and the accepted incoming theorem (4).

## 2. Packets E and F: cells 576 to 655 and 657

- **Driver.** Admitted v6 (`f16930d8…5774`), with its known receipt `44d84d25…cd54`, at 1,024 subintervals per cell of width 1/256.
- **E** (owner `claude-coverage-e`, run `59cc59b6-e284-4b82-ba3a-cc07fc76d262`):
  - It started at 20:49:45Z with a 2,400 s deadline.
  - It **timed out at its deadline** while computing cell 655, after writing 79 receipts (576 to 654).
  - The cost per cell rose from 22.6 s to 73.9 s as the displacement grew.
  - The abrupt stop left `summary.json` at "running". The admitted packet reduction reconciled it from the receipts present and found no problems.
- **F** (owner `claude-coverage-f`, run `739a00b0-71b7-4900-a129-baac1302bbbd`): cells 655 and 657 completed with exit code 0 in 75 s. The reduction found no problems.
- **Margins** over E and F:
  - smallest transmitter factor $D\ge0.9302$;
  - smallest range $0.728$;
  - latest emission at least $0.724$ before the cell start;
  - remote comparison tail at most $6.5\times10^{-16}$;
  - stationary tail at most $2.7\times10^{-6}$.
- **Why the bounds are wide.** The frozen suffix used a midpoint value plus a derivative transfer. v6 encloses directly, and its cancellation identity encloses the mean of $H$ by its range over the whole displacement segment. At $q\approx0.1$ to $0.24$ that range is wide: the widest enclosure is $0.96$ of the cell's comparison displacement.
  - By comparison, the pilot cell 656, evaluated with the pinned direct rows at 4,096 pieces, has $1.6\times10^{-3}$.
  - This is an inference about the cause from the enclosure structure; it was not separately measured.
  - Wider bounds are valid upper bounds, not physical counterexamples.

## 3. Propagation instrument

File `../evidence/staggered-cell-independent-2026-10-14/staggered_propagation.py`, SHA-256 `dc06bfe3e3c568c96fdbc22fcc604f36d05dffbef6aeba4ba7d97c766a266678`. It loads the admitted v6 driver, signed coefficients, Q2 v2 and majorant v2 at their pins and modifies none of them. The full derivation is in its docstring; the essentials follow.

**Object.** $h=q-Q$, where $Q$ is the comparison and $q$ solves the auxiliary cross-row equation. That equation keeps every distinct-label source and the original infinite stationary grouping, and omits the self channel. It equals the full-law branch only up to their first speed-one time (Section 7 of the [first-event document](staggered-lattice-first-event.md)). With $F=F_{\rm fin}+T$, where $F_{\rm fin}$ is the stationary field plus the changed rows of the radius-14 cube and $T$ is the rows outside the cube,
$$h''=(F_{\rm fin}[q]-F_{\rm fin}[Q])-(Q''-F_{\rm fin}[Q])+T[q].$$
The coverage receipts bound the middle term, and they already include the comparison's remote cap.

**Finite part.** Interpolate $q_\theta=Q+\theta h$. Every $q_\theta$ lies in an envelope made of the comparison's enclosure padded by the strictly-past error bounds $P,V,A$. The pinned root search, run on that envelope, contains every interpolated root. Each row's variation (signed coefficients, accepted) is split at the zero-history values $H_*=H(-m)$ and $B_*=m^2/|d|^4$, at $s_0=t-|d|$.

- **Exact cancellation.** Per Euclidean shell, $\sum{\rm mult}\,H_*=0$ exactly (an integer identity on the archive's 3,073 groups, control K1), so the $-H_*h(s_0)$ terms are removed exactly.
- **Bound per cell.** With the signed receiver sum formed before the magnitude,
$$|h''|\le L_j|h|+Q_j,\qquad L_j=\Big|16\Big[S'(q)+\sum{\rm mult}\,(K-\sigma H_0)\Big]\Big|,$$
$$Q_j=16\sum{\rm mult}\Big[|K-\sigma H_*|P(s)+|B-B_*|V(s)+\big(|H_*|V+B_*A\big)_{\rm hull}|s-s_0|+B_*V(s_0)\Big]+\rho_j+T_j.$$
- **Delayed linear term.** The last summand is the positive delayed sum of eq. (13), not absorbed into $L_j$.
- **Stationary derivative.** $S'$ is the pinned polynomial's derivative plus the fourth-power-scaled Jacobian tail.

**Remote part.** $T[q]$ is bounded in absolute value, so no receiver-derivative tail (eq. 19) is needed. Every source outside the cube emits before zero and obeys the incoming theorem. The admitted shell majorant then applies with the caps
$$u_{15}=aE+K_0a^2E^2,\qquad w_{15}=\lambda_{\rm hi}(aE+2K_0a^2E^2),\qquad E\ge e^{\lambda_{\rm lo}(t_+-29/2)},\qquad \zeta\ge e^{-\lambda_{\rm lo}}.$$

**Loop.**
- Each cell takes the accepted majorant step with a strict tube $P<R$, doubling $R$ on refusal; every cell closed on its first attempt.
- $P$ and $V$ are carried as upward binary64 values, which is valid because every majorant coefficient is nonnegative.
- $A=L_jR+Q_j$.
- The receiver tube must stay below $|q|<1/4$.
- Initial state: $|h(0)|\le1.2408\times10^{-19}$ and $|h'(0)|\le6.9365\times10^{-19}$ from the incoming bound. The comparison joins $ae^{\lambda_cs}$ exactly in position and velocity (checked). The exact jump $J_0=3.518\times10^{-27}$ enters every acceleration lookup that touches zero.

**Defect admission.**
- Every coverage owner's manifest is pinned by digest. For packets A to D3 these are the manifests' digests taken today; for E and F, those of this session's new manifests.
- Each receipt is read once, matched to its manifest entry and parsed from the same bytes.
- The pilot receipt is pinned by its own digest.

**Review 1 and changes.**
- Codex found three blocking issues:
  - the tube radius reached NumPy as an exact rational, so a physical run would have failed;
  - a nonpositive subdivision count skipped the whole finite assembly;
  - receipts without a manifest were admitted.
- It also found two should-fix items: wording that did not separate the auxiliary solution from the full-law branch, and seam and whole-path paths without controls.
- All are fixed.
- After the review I found a further defect: exact rationals grew every cell, and the first full run slowed to about 6 s per cell. I stopped that run at cell 313; it is retained in `claude-propagation-full/` with its stop record. The loop now rounds upward.

**Known controls**, 11 of 11 on the first run of these bytes (`claude-propagation-known-2/known-run1.json`):

| Control | What it shows |
| --- | --- |
| K0 | Module pins, data admission and the exact join; a wrong pin is refused |
| K1 | Exact shell cancellation and the parity of every group |
| K2 | On synthetic histories over the radius-2 cube, the 60-digit root-solved row difference lies within $L|h|+Q_{\rm src}$. Moving comparison: bound/actual 1.54 to 1.61. Zero comparison: 1.00002 to 1.032, so the delayed linear term is tight |
| K3 | The envelope's root boxes contain both paths' 60-digit roots |
| K4 | The stationary derivative contains exact secant slopes for both coefficient extremes |
| K5 | The actual remote tail is above a direct 400-shell series (80 digits) and refused for non-ancient sources |
| K6 | The incoming grid lies above the exact bound at 200 random points |
| K7 | The error view is never below ErrorTable v2, including a decisive jump at the four seam shapes |
| K8 | Loop composition against 60-digit cosh; tube retry; refusal after four attempts |
| K9 | Eight admission refusals |
| K10 | The complete `cell_bound` path with exact rational tubes; subdivision refusals |

## 4. Propagation results

Owner `claude-propagation-full-2`, run `b2a87d78-d9db-499e-8fee-3e39e83de10d`, cells 0 to 657, one piece per cell: completed in 19.9 s, exit code 0. The 16-cell pilot (`claude-propagation-pilot-2`, run `e94becd1-1089-42f2-8b5b-357351e36e1b`) agrees with the first 16 rows.

| Cell | End time | $P$ | $V$ | $L_j$ | $Q_j$ | $\rho_j$ | Receiver tube |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 1/64 | 2.6e-19 | 1.6e-17 | 1.2e-12 | 9.9e-16 | 9.9e-16 | 9.5e-13 |
| 143 | 9/4 | 1.1e-13 | 3.5e-13 | 7.5e-10 | 1.1e-12 | 5.1e-13 | <1e-5 |
| 287 | 9/2 | 1.2e-10 | 3.6e-10 | 4.1e-7 | 1.1e-9 | 2.8e-10 | <1e-5 |
| 431 | 27/4 | 1.0e-7 | 3.0e-7 | 2.4e-4 | 8.7e-7 | 1.7e-7 | 1.4e-4 |
| 575 | 9 | 3.1e-4 | 1.8e-3 | 7.2 | 9.0e-3 | 7.6e-3 | 0.0806 |
| 653 | 1191/128 | 2.7e-3 | 2.7e-2 | 66.0 | 0.190 | 0.175 | 0.2323 |
| 657 | 1193/128 | 3.2e-3 | 3.3e-2 | 76.8 | 0.249 | 0.231 | 0.2471 |

- **Defect share.** The coverage defect is more than 90% of $Q_j$ except on the pilot cell 656, whose defect is $1.6\times10^{-3}$.
- **Root margins.** The smallest transmitter factor is 0.930 and the smallest range 0.728. The latest emission is 0.724 before the cell start, so every lookup is strictly past.
- **Tube margin.** The receiver tube reaches $0.2471$, just inside $1/4$. A wider late defect, or any later cell, could fail this check; this one did not.

## 5. Event extraction

File `../evidence/staggered-cell-independent-2026-10-14/staggered_event_extraction.py`, SHA-256 `3b00059bcaac690ee461f4fa29f7fbacd9e14a81918270fb690dc9cca9f165d4`.

- **Input binding.** The command takes the propagation summary and rows digests as trusted inputs. It reads each file once, matches and parses the same bytes, and checks the structure: completed status, complete prefix, nonnegative finite bounds, monotone $P$ and $V$, and strict tubes.
- **Why it changed.** In review 2, Codex showed that the previous bytes (`5c8bf54d…`, retained) accepted zeroed bounds.
- **Known controls**, 4 of 4:
  - E1: a synthetic crossing, exact;
  - E2: four refusals by reason;
  - E3: decisive unequal adjacent velocity bounds at a table-cell boundary node;
  - E4: six admission refusals.
- **Receipts.** `claude-event-extraction-2/extraction.json` is bound to summary `51da6a9b…c27c531` and rows `a174cc8e…8ef4a7`. It gives the same bracket and margins as the first extraction (`claude-event-extraction/`, retained).

On every archive sub-cell of width $1/512$ it uses the comparison's whole-cell enclosures of $Q$ and $Q'$ (quintic Horner), and of $Q''$ (Q2 v2 Bernstein), with the propagated $P,V,A$ of the containing table cell:

- **Lower bound.** $\sup Q'+V<1$ on every sub-cell through $4765/512$, so $q'<1$ on $[0,4765/512]$, and $q'>0$ throughout (no turn).
- **Upper bound.** At the node $4771/512$, $Q'-V>1$, so $q'>1$ there. Hence a first speed-one time exists in $(4765/512,\,4771/512)$.
  - The auxiliary equation agrees with the full law until that first time. Nothing after it is promoted to a full-law solution.
- **Transversality.** On the bracket, $\inf Q''-A>5.9149$, so $q''(t_*)>0$ and $\mathbf V_i\cdot\mathbf A_i=q'q''>5.9149$.
- **Separation.** $1-2(\sup Q+P)>0.51629$ through $4771/512$.

## 6. Limits and falsifiers

- **Review scope.** The reviewer is a separate process and model instance with its own checking code, but it shares the admitted interval and history primitives, the archive, the group table, the stationary coefficients and tail series, the characteristic-root receipt and the incoming theorem. Agreement on those shared inputs is not independent evidence about them.
- **Late defect bounds.** They are an order of magnitude wider than the frozen ones. The event bracket survives because the late interval is short, but the tube margin at the last cell is 0.003.
- **Falsifiers.** Any of the following, found by an independent check, would falsify the result:
  - a cell whose true comparison defect exceeds its receipt;
  - a root outside its envelope box;
  - a source acceleration outside Q2 v2's enclosure;
  - an incoming error above the accepted bound (4);
  - a failure of the shell identity of K1.
  - Separately, a reviewer's independent recomputation of $L_j$ or $Q_j$ above the stored value for some cell would invalidate the corresponding step.
- **Not shown.** No statement is made about generic populations, finite support, outgoing evolution after $t_*$, or other amplitudes.

## 7. Review 2: the reviewer's own checks

Codex reported the following, all run in its read-only sandbox with the shared venv. They are its statements; I have not repeated them. "Own" marks code it wrote itself.

- **Receipts (own).**
  - All 94 E and 18 F manifest entries and all 81 receipt identities, intervals, subdivisions, data and code bindings verify.
  - The outward defect-plus-tail sums, domains, ranges, denominators and strictly-past emissions verify.
  - E holds exactly 576 to 654, F holds 655 and 657, and neither holds 656.
  - All 658 propagation $\rho$ values and receipt digests match their inputs, including the pilot at 656.
- **Tails (own).** All 81 comparison remote caps exceed its 90-digit evaluation of the infinite majorant. Its measured new/frozen ratios are 9.264 to 14.596.
- **Propagation (own).**
  - A separate 90-digit recurrence, validated first on polynomial and exponential cases, bounds every stored endpoint from below.
  - All 658 cells have monotone $P$ and $V$, strict tubes, sufficient $A$, and consistent coefficient and source accounting.
  - The largest receiver tube is $0.24710372358993335<1/4$.
- **Assembly (own).** It independently reconstructed roots, lookups, signed coefficients, stationary derivative, source totals and remote caps for cells 576 and 657, without calling my assembly functions. It shares only the admitted interval and history primitives. Its $L_j$ and $Q_j$ agree with the stored values within two rounding steps, and exactly for cell 657.
- **Event (own).** From exact-rational Hermite coefficients and Bernstein bounds, validated on known polynomials first, it establishes $4765/512<t_*<4771/512$. Its margins:
  - prefix speed below 0.993040;
  - upper-node speed above 1.012037;
  - separation above 0.5162939180;
  - bracket acceleration above 5.9149074101;
  - earlier source speeds below 0.069773.
  These hold conditional on the admitted incoming theorem and the propagation construction.
- **Replay.** Selected loop, subdivision, seam-lookup and extraction functions passed. It read, but did not rerun, the known receipts.

It is the same model family as the original subject's coordinator, but a separate process with its own code for the checks above. Its replays of my functions are reported as replays.

## 8. Tightened suffix: direct-row bounds and the sharper event

**Status: ✓ reviewed** (review 5, 23:41:53Z: no blocking findings).
- The reviewer's own code verified:
  - all 126 packet manifest entries, with exact coverage of the 81 cells;
  - the per-cell minimum selection on all 658 cells;
  - a 90-digit recurrence over all 658 steps;
  - an independent reconstruction of cell 657 ($L_j$ exact, $Q_j$ within two rounding steps);
  - exact-rational event predicates giving the same bracket, with prefix speed below 0.988018 and upper-node speed above 1.005049;
  - the 81 direct remote caps.
- **Should-fix, fixed on 2026-10-21 at Op's direction.** The run summary's `defect_source` labelled cell 656 "v6", but its bound comes from the separately accepted direct pilot receipt (driver `8e9f538c…`, digest verified by the reviewer).
  - The propagation now labels it "pilot" (`45ac5e18…`, control K11). Known controls pass 12 of 12 (`claude-propagation-known-5`).
  - The rerun `claude-propagation-full-5` has every row's bounds bit-identical to `full-4`. The extraction `claude-event-extraction-4` has every result field equal to `extraction-3`.
  - The earlier receipts are kept, not rewritten.
- **Empty-selection guard, fixed.** It is in `staggered_suffix_direct_v2.py` (`a2df4e3b…`), with control S3: the pilot reproduction plus two empty-selection refusals, PASS in `claude-suffix-direct-v2-known`. Version 1, which produced G1 to G4, is kept unchanged.

**Why.** The v6 suffix bounds (Section 2) left a receiver-tube margin of only 0.003.

**Method.** I applied the enclosure accepted for the late pilot 656, the pinned evaluator's direct rows, to every other suffix cell.
- The glue `../evidence/staggered-cell-independent-2026-10-14/staggered_suffix_direct.py` (SHA-256 `a65675963cf90604cee7256f2a87d24e5cd49e47958ddbfd4c4412f3c584ecfd`) adds no arithmetic. It calls driver v2's `enclose` through driver v6's loader, with v6's same-buffer data admission and its no-resumption loop.
- Its known control reproduces the accepted pilot receipt for cell 656 at 4,096 pieces bit for bit. That is implementation evidence, not a second mathematical reference.
- Review 4 found no blocking findings. Its own reasoning supports applying the method to all suffix cells: the crude pre-zero caps, the unscaled stationary remainder, the remote-source argument and the ball check all hold there.
- Review 4's should-fix item, that an empty selection reports completion, is left in these bytes so that one glue identity covers all four packets. Every cell the propagation needs is admitted individually, so an empty run cannot supply a bound.

**Packets.** All at 2,048 subintervals:

| Packet | Cells | Run | Outcome |
| --- | --- | --- | --- |
| G1 | 576 to 614 | `ec36bce8` | timed out at its 2,400 s deadline while computing 615 |
| G2 | 616 to 647 | `47504e80` | timed out likewise while computing 648 |
| G3 | 648 to 655, 657 | `19549d13` | completed, exit 0 |
| G4 | 615 | `f1f71d1f` | completed, exit 0 |

- **Reductions.** A field-adapted copy of the admitted reduction's checks, retained in each owner, found no problems.
- **Bounds.** They run from $6.0\times10^{-4}$ to $3.05\times10^{-3}$. Cells 576 to 582 are slightly above the frozen bounds; all others are 1.0 to 7.6 times below. Against v6 on the same cells they are 13 to 75 times smaller.
- **Margins.** Smallest $D$ 0.932, smallest range 0.735.

**Propagation change.** Instrument SHA-256 `ad5a54a25c93c4c245e98c1afdc4a75eb4b6a8ea6f904cb5eaeaa3a8c47e7652`; the diff from the reviewed `dc06bfe3…` is retained in the review channel.
- For each suffix cell it admits both the v6 and the direct receipt, each authenticated by a pinned manifest, and uses the smaller bound. The minimum of two valid upper bounds is valid.
- A cell must be listed by exactly one pinned direct manifest.
- Known controls pass 12 of 12, with new control K11 for direct admission and the minimum rule. A failed known run, caused by an ill-posed K11 case, is retained in `claude-propagation-known-3`.

**New propagation** (`claude-propagation-full-4`, run `dc71b384`): every tube closed on its first attempt, and all 81 suffix cells use the direct bound. Late, the propagated source terms rather than the defect dominate $Q_j$.

| Cell | $P$ | $V$ | $L_j$ | $Q_j$ | $\rho_j$ | Receiver tube |
| --- | --- | --- | --- | --- | --- | --- |
| 615 | 6.7e-4 | 3.2e-3 | 19.3 | 4.9e-3 | 1.1e-3 | 0.1322 |
| 647 | 1.3e-3 | 8.3e-3 | 51.3 | 1.4e-2 | 2.3e-3 | 0.2086 |
| 657 | 1.7e-3 | 1.27e-2 | 74.2 | 2.1e-2 | 3.1e-3 | 0.2441 |

**New extraction.** Unchanged reviewed bytes `3b00059b…`, bound to summary `d201d46c…` and rows `40de4eb0…` (`claude-event-extraction-3`):
$$\frac{2383}{256}<t_*<\frac{4769}{512},\qquad 9.30859375<t_*<9.314453125,$$
- $q''(t_*)>6.4036$, so $\mathbf V_i\cdot\mathbf A_i>6.4036$ for every label;
- separation above $0.52742$;
- $V\le0.01213$ at the upper node.

This bracket is half the width of Section 5's and lies inside it. Its transversality and separation margins now exceed the frozen certificate's ($5.9711$ and $0.50889$, read after computation). The receiver-tube margin to $1/4$ doubles, to $0.006$.
