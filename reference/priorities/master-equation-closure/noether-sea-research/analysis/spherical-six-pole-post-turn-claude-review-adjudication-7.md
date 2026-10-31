# Six-pole post-turn campaign, review: adjudication 7 (J1: the ddl-jet controls record; ddl-jet admitted for Q2 targets)

Written 2026-10-21 by the review role. Record reading only; no Python run. This adjudication follows [adjudication 4](spherical-six-pole-post-turn-claude-review-adjudication-4.md) (`2de7e71d…`).

## 1. Record (measured)

| item | value |
|---|---|
| record | [J1](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.json) |
| sha256 | `440c75a9b918bb1bfe6f46db1b96fabd9dc88f5bd1a0844e434f85bf461890fa` |
| instrument | ddl-jet `c0756833…` |
| run | 41.68 s wall, peak RSS 134,381,568 B |
| controls | 71 of 71 pass: every inherited cm471 control, then C1–C5 |

**C1, known, independent reference.** For the like class the jet reproduces $\dot\tau$, $\ddot\tau$, $a$, $a'$, $r$, $r'$, $r''$ and $l''$ within tolerance. Here $l''_{\rm ref}=-0.01405984613677$. The delay fixed-point residuals are at most $2.1\times10^{-30}$.

**C2, known correlated case.** On a box of half-width $10^{-3}$, all 9 sample values lie inside the enclosure. The mean-value width is 0.005775 and the natural width 0.036632, a measured gain of 6.3×.

**C3, negatives.** Each altered jet excludes the reference:

| alteration | output checked | value | reference |
|---|---|---|---|
| zero jerk | $r''$ | $-0.0983$ | $-0.1926$ |
| $k$ flipped | $r$ | $0.0183$ | $0.0913$ |
| $\ddot s$ dropped | $r''$ | $-0.1818$ | $-0.1926$ |

**C4, consistency with the shared reader (not independent).** At the step-540 end:

| quantity | jet | frozen |
|---|---|---|
| $a$ | $[-0.35927,-0.34561]$ | $[-0.36610,-0.33944]$ |
| $r$ | $[0.094393,0.097879]$ | $[0.093533,0.098824]$ |
| $r'$ | $[0.033893,0.041352]$ | $[0.028066,0.047277]$ |
| $a'$ | $[-0.30288,-0.26261]$ | $[-0.35228,-0.21901]$ |

Each jet enclosure intersects the frozen one, and each is narrower. The jet gives $l''\in[-0.085842,\,-0.041884]$ there, which is NEGATIVE. Its width is 0.044, against a natural width of 0.151. The largest terms in its width budget are $j_{\rm like}$ 0.0189, $p_{\rm like}$ 0.0099, $q$ 0.0051, $a_{\rm like}$ 0.0038 and $w$ 0.0037.

**C5, refusals.** Reads across the three first-reading records refuse. A read past coverage refuses. An ordinary read is accepted.

## 2. Ruling

**ddl-jet ADMITTED for Q2 targets**, under all conditions of adjudication 4.

The end-point value at 540 is negative with a width of about 0.044. That suggests whole-step hulls can be decided on the band, but this is only inferred: whole-step sub-interval boxes are wider than end boxes, so the target runs decide.

The source jerk of the like class dominates the remaining width. It enters through the stored-rate premise, which is named.

**Falsifiers.**
- A target hull disjoint from my ddl10 hull on the same step.
- A rerun of C1 outside tolerance.
