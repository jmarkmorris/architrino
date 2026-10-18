# Independent staggered cells: Q2, comparison source acceleration

Date: 2026-10-14. Author: Claude (session `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`), under Codex's release of Q2 preparation at 11:34:43.785Z in the [staggered-cells conversation](../../../../op/agent-chats/2026-10-14-residuals-staggered-cells/chat.md). Status: positive-time Bernstein and negative-time exponential components accepted by Codex's [Q2 review](staggered-cell-independent-q2-review-2026-10-14.md) (entry 12:01:30.520Z); its zero-endpoint comment RSC-07 is resolved by version 2 in Section 6, **pending Codex review**. Sections 1 to 5 describe version 1; where Section 2 says a box containing zero takes the hull of both sides, version 1 did so only for boxes reaching strictly below zero. No propagation target was evaluated, and this component is not yet used by any instrument.

## 1. Object and boundary

Q2 encloses the comparison curve's source acceleration $Q''(s)$ over boxes of source times. That is the input a propagation step needs for the source-acceleration term of the receiver sensitivity $J_d$ and for the acceleration-error table. It concerns the comparison only:

- for $s\le0$, $Q(s)=a e^{\lambda_c s}$ with the exact saved $a=2^{-40}$ and $\lambda_c$, so $Q''(s)=\lambda_c^2Q(s)$;
- for $s\ge0$, $Q$ is the piecewise quintic through the saved node jets on the grid $k/512$.

The actual branch's characteristic exponent $\lambda$ and its nonlinear incoming allowance $K_0a^2e^{2\lambda s}$ are a separate propagation term and are not used.

## 2. Derivation

**Positive times.** On archive cell $k$, with $x=512(s-k/512)\in[0,1]$, the quintic is $c_0+c_1x+\dots+c_5x^5$, where the $c_j$ are the pinned evaluator's interval coefficients. Then

$$
Q''(s)=512^2\,(a_0+a_1x+a_2x^2+a_3x^3),\qquad a_0=2c_2,\ a_1=6c_3,\ a_2=12c_4,\ a_3=20c_5.
$$

In the degree-three Bernstein basis on $[0,1]$ the coefficients are

$$
b_0=a_0,\quad b_1=a_0+\tfrac13a_1,\quad b_2=a_0+\tfrac23a_1+\tfrac13a_2,\quad b_3=a_0+a_1+a_2+a_3 .
$$

The cubic is $\sum_jb_j\binom3jx^j(1-x)^{3-j}$, a convex combination of the $b_j$ for each $x\in[0,1]$. So its range over the whole cell lies in $[\min_jb_j,\max_jb_j]$, which bounds interior extrema as well as endpoint values. The operations use the pinned outward interval class, with $1/3$ as an outward interval; $512^2$ is an exact power of two.

A box of source times is enclosed by the hull of the whole-cell enclosures of every archive cell it intersects. The hull is taken by an exact range-minimum and range-maximum table, a sparse table over the per-cell lower and upper ends.

**Negative times.** The accepted early method encloses $e^{\lambda_cs}$ at the box ends. The function is increasing, so $Q''$ over $[s_\ell,s_h]$ lies in $\lambda_c^2a\,[E_{\rm lo}(s_\ell),E_{\rm hi}(s_h)]$, with $\lambda_c^2a$ as an outward interval.

**Zero.** The comparison is $C^1$ but not $C^2$ at zero. $Q''(0^+)$ is the saved node acceleration $a_0$, and $Q''(0^-)=\lambda_c^2a$. A box containing zero takes the hull of both sides. The one-sided jump

$$
J_0=|a_0-\lambda_c^2a|
$$

is computed exactly in rationals and kept, with an upward binary64 conversion, for the acceleration-error table: the time-zero obligation of the original subject's propagation.

**Domain.** Source times must lie in $[-32,\ \text{end of archive}]$, and only order 2 is provided; orders 0 and 1 belong to the early method. Reversed boxes are refused.

## 3. Instrument and known controls

File: `lattice-research/evidence/staggered-cell-independent-2026-10-14/staggered_q2_acceleration.py`, SHA-256 `1594ee99557d60dff9a04dba3aee4dad8c4dd9816cf07f8999755d58c2f489e2`. It loads accepted driver v6 by its pinned hash, and through it driver v2, the method and the pinned evaluator, none of them modified. It authenticates the archive by same-buffer admission.

Known controls, 7 of 7 on the first run (`claude-q2/q2-known-run1.json`), run after packet B's compute had ended:

| Control | Result |
| --- | --- |
| Q1 Nonzero-start degree-five polynomial over a multi-cell box. $g(t)=t^5-2t^3+t$ has exact binary64 jets at $k/512$ for $k\le240$, so its Hermite quintics reproduce $g$ exactly. The box $[3/512+1/4096,\,9/512-1/4096]$ spans cells 3 to 8 | Enclosure $[-0.21083,\,-0.07031]$ contains the exact range $[-0.20790,\,-0.07324]$ of $g''$ |
| Q2 Interior extremum beyond endpoint values. Cell 228 contains $t=1/\sqrt5$, where $g''=-8/\sqrt5=-3.5777088$ | Whole-cell enclosure reaches $-3.5777105$. Both endpoint values, $-3.5776119$ and $-3.5777087$, are above the interior minimum, so node values alone would miss it |
| Q3 Negative times, $\lambda_c^2a e^{\lambda_cs}$ at $s=-1$, $-10$, $-31.5$ against a 60-digit reference | Enclosed, relative width below $10^{-13}$ |
| Q4 Zero seam with unequal one-sided accelerations, box $[-2^{-12},2^{-12}]$ | Encloses the exponential side, $Q''(0^+)=a_0$ and the quintic at $2^{-12}$. $J_0=3.5178\times10^{-27}$, positive, matching a 60-digit evaluation to $10^{-40}$ relative |
| Q5 Refusals | Below $-32$, beyond the archive, orders 0 and 1, and a reversed box are each refused for their reason |
| Q6 Range table | Equals a direct scan on 200 random cell ranges |
| Q7 Diagnostic only | All 4,773 saved node accelerations lie in their adjacent whole-cell enclosures. The widest whole-cell enclosure relative to its lower end is $2.3\%$ |

Q7 is node parity, a diagnostic, as you asked. The cell-by-cell widths at that level are expected where $Q''$ changes sign or is small; I have not examined where the $2.3\%$ cell lies.

## 4. What Q2 enables, and what it does not

With Q2, the next components can be derived and controlled:

- the full receiver sensitivity $J_d$ over root boxes, including $-r\sigma n^3a_s/(r^3D^3)$-type terms, through the signed coefficient $L_j$;
- the zero-history derivatives $H_*$ and $B_*$;
- the root shift $|s-s_0|$;
- the acceleration-error table with $J_0$.

No signed coefficient, majorant or event is implemented or released.

Shared premises: the archive's node jets and the pinned interval coefficients of the quintic, the early method's exponential and driver v6's data admission.

## 5. Retention

`claude-q2/` holds the sources as run (Q2, driver v6, driver v2, the method), the known receipt and its outputs, `closeout.json`, `commands.txt`, `outputs.sha256` and `sources.sha256`. The reduction's fixtures are retained in `claude-reduction/`.

## 6. Version 2: both one-sided limits at zero (RSC-07)

Codex found that version 1 took the negative-time branch only when a box's lower end was strictly negative (`has_neg = s.lo < 0`). Closed boxes $[0,b]$, including the singleton $[0,0]$, therefore omitted the left limit $\lambda_c^2a$, contrary to Section 2. The real archive's jump is tiny ($3.5\times10^{-27}$), so version 1's crossing-zero control Q4 could not show this. Codex's exact synthetic history with limits 1 and 2 did.

**Convention, now explicit.** Q2 returns a one-sided acceleration envelope. The comparison is $C^1$ but not $C^2$ at zero, so a unique $Q''(0)$ need not exist. Any closed box containing zero includes both one-sided limits: the right one from the quintic of cell 0, the left one from the exponential, whose projected box is $[\min(s_\ell,0),0]$. A box strictly on one side of zero takes only that side.

**File:** `staggered_q2_acceleration_v2.py`, SHA-256 `2aceed71b0f8ca0f01769f67f77811b49f5d829ae2d9dc2e45eda015705d7ee2`; the 55-line diff from version 1 is retained as `q2-v1-to-v2-final.diff`. The change is `has_neg = s.lo <= 0`. Two hooks, a synthetic negative-time history and a synthetic $a_0$, are added for the controls only. Version 1, its report bytes (`5b090faa…3337`, retained in `claude-q2-v2/reviewed-report/`) and receipts are unchanged.

**Known controls, 9 of 9** (`claude-q2-v2/q2v2-known-run2.json`). The seven version-1 controls are kept, and two are new:

| Control | Result |
| --- | --- |
| Q8 Large unequal limits. Synthetic $C^1$ history $Q=e^s$ for $s<0$, $1+s+s^2$ for $s\ge0$ (exact jets on the $1/512$ grid), left limit 1, right limit 2, exact jump 1 | $[0,0]$ and $[0,h/2]$ give $[0.99999999999999911,\,2.0000000001555773]$, containing both limits. $[-h/2,0]$ gives $[0.99902391418197,\,2.0000000001555773]$, containing $e^{-h/2}$ (60-digit reference) and both limits. The strictly positive $[h/4,h/2]$ gives $[1.99999999984806,\,2.0000000001555773]$, containing 2 and excluding 1. The computed jump is exactly 1 |
| Q9 Real comparison | The singleton $[0,0]$ contains both $\lambda_c^2a$ and $a_0$ |

Run 1 failed only Q8, on my own margin. I required the enclosure's lower end at $[-h/2,0]$ to lie a relative $10^{-12}$ below $e^{-h/2}$, while the enclosure is tighter than that, with lower end $0.99902391418197$ against $e^{-h/2}=0.99902391418197\ldots$. Run 2 checks containment of the 60-digit reference instead. Both runs are retained with their sources.

No physical cell, propagation target or coverage rerun was evaluated; Q2 is still unused by any instrument.
