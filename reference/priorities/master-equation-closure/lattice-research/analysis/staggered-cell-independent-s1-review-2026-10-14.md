# Independent review of S1 and the remote changing-source tail

## Disposition of the measurements

The S1 report `eb4fff70…c1fc`, its complete four receipts and retained launch script are reviewed. All twelve repository-relative source and nineteen owner-relative output entries verify by `shasum -a 256 -c`. The script selects exactly cells 0 and 288 at 64 and 512 pieces in sequence. The retained supervisor status gives exit 0, closed process group and 15.85 seconds wall time; the owner-aware closeout is clear. The host rejected the first inline-shell launch before execution; the retained-script alternative succeeded. That resolved operational rejection supplies no scientific finding.

A separately written exact-rational audit first accepts and rejects synthetic outward sums, then checks each receipt's final bound against the exact sum of its recorded maximum absolute signed endpoint and remote-tail upper. It checks admitted source-time, positive range/transmitter and driver identities. The independent alternating-series exponential reference passes its known cases before checking the reported remote-exponential ratios. No physical reception cell is evaluated by this audit. Its first diagnostic used a degree-three reciprocal instead of the actual degree-four reciprocal; that numeric diagnostic was invalid for the pinned routine and is retained with its source. The corrected audit tests the exact degree-four value at argument one first, then passes all receipt and diagnostic checks. Both runs are retained in `codex-s1-review/`.

The measured cell-0 fine bound is `1.1322080150409083e-14`, of which `1.0330731184012908e-14` is the remote-source allowance. Its nominal signed enclosure without that allowance has endpoints about ±`9.9135e-16`. The cell-288 fine bound is `2.878603703654846e-10`, with remote allowance `4.364977922704862e-14`. The dominant width shrinks with subdivision in these two measured cells. These are valid measurements under the already reviewed driver and its shared premises, not newly accepted coverage or fresh propagation sufficiency. Agreement with frozen midpoint values or upper bounds is diagnostic only.

The actual pinned exponential upper is the reciprocal of the degree-four Taylor polynomial, containing five terms:

$$
E_4(y)=\left(1+y+\frac{y^2}{2}+\frac{y^3}{6}+\frac{y^4}{24}\right)^{-1},\qquad y>0.
$$

The report's “four-term” wording needs correction (RSC-05, wording only); its stated ratios agree with the correct degree-four formula. At the right endpoints of cell 0 and the event band, the corrected independent exact alternating-series audit bounds $E_4(y)/e^{-y}$ near $3.0928\times10^{12}$ and $789.74$, respectively. This demonstrates a conservative-method floor, not an invalid enclosure or a physical counterexample.

## Independent shell majorant and admissible sharpening

Let the comparison ancient history be $Q(s)=a e^{\lambda_c s}$, where $a=2^{-40}$ and the saved binary64 $\lambda_c>0$ is treated as exact comparison data. This is distinct from the actual branch's exact characteristic exponent and nonlinear incoming correction. Keep the radius-14 finite cube and all remote shells with sup-norm $M\ge15$. Retain the reviewed displacement-ball and geometric assumptions. For reception $t\le t_+$, an omitted source has range at least $M-1/2$, and its latest source time is at most $t_+-(M-1/2)<0$ when $t_+<29/2$. Define

$$
u_{15}=a e^{\lambda_c(t_+-29/2)},\qquad w_{15}=\lambda_c u_{15},\qquad \zeta=e^{-\lambda_c}.
$$

Then $u_M\le u_{15}\zeta^{M-15}$ and $w_M\le w_{15}\zeta^{M-15}$. The cancellation-preserving row identity and a positive displacement segment give the absolute changed-row bound $2u_M/r^3+w_M/[r^2(1-w_M)]$. A shell has $24M^2+2\le26M^2$ sources. For $M\ge15$, $M^2/(M-1/2)^2\le(30/29)^2$ and $1/(M-1/2)\le2/29$. Because $w_M\le w_{15}<1$, summing the positive geometric majorant gives

$$
T_{16}(t_+)\le \frac{16\cdot26(30/29)^2}{1-\zeta}\left(\frac{4u_{15}}{29}+\frac{w_{15}}{1-w_{15}}\right).
$$

This rederives the pinned shell argument independently; it changes no law, summation prescription, source census or archive. Increasing any of the nonnegative caps $u_{15}$, $w_{15}$ or $\zeta$ increases the right side while their denominators remain positive. Thus the accepted rigorous rational exponential upper can replace $E_4$ for the two caps without altering the shell proof. Compute $y=\lambda_c(29/2-t_+)$ exactly, use the upper end of the accepted `exp_neg(-y)` for $u_{15}$ and of `exp_neg(-lambda_c)` for $\zeta$, multiply by exact rational amplitude/exponent, and convert the final exact-rational bound outward once. Zero amplitude gives zero; nonpositive exponent, wrong cube, non-ancient remote time, $w_{15}\ge1$ or $\zeta\ge1$ must be refused for their actual reason. Preserve original instruments and receipts.

The exact comparison exponential is valid arbitrarily far into the ancient past. The direct finite-source table's `[-32,0]` domain does not constrain this separate tail formula; neither an actual-characteristic exponent nor the nonlinear actual-minus-comparison correction may be silently substituted. The latter remains a separate propagation obligation.

## Current selected successor and limits

Only P1 preparation is released: a separately versioned v5 remote-tail implementation, its derivation, full diff and known-first controls, including an exact synthetic positive geometric series, zero and domain failures, independent exponential references, and preserved data/driver admission. No additional physical cell or whole-table coverage is released until corrected-byte review. RSC-05 can be resolved with that return by correcting the report wording and retaining the reviewed bytes. The proposed five coverage packets and their cost are extrapolations from S1, not measured all-table performance. Before releasing a large packet, the method must show a credible error budget for new propagation; source acceleration across ancient/archive/zero seams and the signed/error sensitivity inputs remain unbuilt.

Fixed $c_f=1$, $g=16$, original infinite grouping, exact coherent ancient branch and pre-global-event law equivalence remain. Later comparison suffix is auxiliary only. Saturday and 1-mec are separate. The original six-hour window and 48 contributions each remain fixed. Missing sources/roots/tails, underestimated cap or inward conversion, failed controls, unclosed tubes or invalid event signs defeat the affected acceptance; a broad valid bound only defeats its sufficiency.
