# Six-pole correlated continuation review: adjudication 15 (completion ruling to the step-491 end; no second support turn after the first)

Written 2026-10-14T13:11:38Z by the review role. No code was run; every number is read from my C23 records (adjudication 13) and combined by hand.

## 1. $\dot l > 0$ at every instant from the true step-437 end to the true step-491 end (derived from measured enclosures)

**Lower-bound lemma (derived).** On a step with $\ddot l \ge L$ almost everywhere, $\dot l(t) \ge \dot l(t_0) + \min(L, 0)\,\Delta$. So if the lower end $A$ of the previous end's enclosure satisfies $A + \min(L,0)\,\Delta > 0$, then $\dot l > 0$ over the whole step.

**Inputs (measured).** From my [C23 band record](../evidence/spherical-six-pole-correlated-continuation-claude-review-ddl10-C23-r5band.json.ddl10.json), sha256 d0f72dc7…:
- my end $\dot l$ lower ends: 0.000136 at 437, rising steadily to 0.00655 at 490;
- my refined $\ddot l$ lower ends: from $-0.00057$ at step 438 down to $-0.0306$ at step 491.

**Check, step by step (hand arithmetic, each one subtraction).**

| step | $A$ (previous end, lower) | $\lvert L\rvert\,\Delta$ | margin |
|---|---|---|---|
| 438 | 0.000135755 | 0.0000057 | 0.000130 |
| 445 | 0.0010505 | 0.0000229 | positive |
| 460 | 0.0030289 | 0.0000719 | positive |
| 475 | 0.0050015 | 0.0001480 | positive |
| 490 | 0.0064753 | 0.0002949 | 0.00618 |
| 491 | 0.0065536 | 0.0003055 | 0.00625 |

Every step from 438 to 491 passes; the smallest margin is at 438.

**Ruling.** $\dot l > 0$ at every instant from the true 437 end to the true 491 end, $t \le 6.776684709182828044891357$. There is NO second support turn in that interval. Together with adjudication 14, $\dot l$ has exactly ONE zero on $[t_{275}, t_{491}]$: the first support turn.

## 2. Completion ruling (to $t = 6.776684709182828044891357$, the step-491 end; reconstruction from the step-154 anchor)

- **PATH TURN: NOT REACHED.**
  - $w > 0$ at every end through 491: $[0.19957, 0.20396]$ at 491 by my audit.
  - $w$ is decreasing, because $a < 0$ at every end from 240 on, with negative jerk.
  - Hence $w > 0$ at every instant (derived from end signs plus monotonicity).
- **SPEED MAXIMUM: CERTIFIED, UNIQUE** in $(4.246684593623649597167969,\ 4.266684709182828044891357)$ (adjudication 12).
- **RADIAL ACCELERATION ZERO: CERTIFIED, UNIQUE**, increasing, in $(5.686684593623649597167969,\ 5.706684709182828044891357)$ (adjudication 12).
- **SIGNED-SUPPORT TURNING POINT, the first (a strict minimum of $l$, with $l < 0$): CERTIFIED, UNIQUE, STRICT** in $(5.986684593623649597167969,\ 6.176684709182828044891357)$ (adjudication 14). On my evaluations alone the bracket is $(5.956684593623649597167969,\ 6.236684709182828044891357)$.
- **No second support turn** through the 491 end (section 1).
- **Passage of $q$ through $\pi/2$:** as certified on the frozen records (turning-point adjudication 12). The reconstructed ends meet the frozen ones through 436.

**Premises.**
- The stored-rate premise.
- The frozen step instrument and the admitted correlated inclusion (adjudications 3, 5, 6, 7 and 9).
- The intersection of proved enclosures.
- My frozen audit kernels, whose controls ran in every invocation.

Cross-code agreement between the subject, the support and the review shares these premises and records. It is not independent evidence of them.

**Falsifiers:** an enclosure listed in adjudications 12 to 15 missing its true value; a reconstructed record not containing the true state; a jump of $\dot l$ inside a step.
