# Six-pole post-turn campaign, review: adjudication 5 (G1x: the extended signed-geometry chart is ADMITTED)

Written 2026-10-21 by the review role. Record reading only; no Python run. Applies [adjudication 2](spherical-six-pole-post-turn-claude-review-adjudication-2.md), section 4, and my [reference](spherical-six-pole-post-turn-claude-review-reference.md), section 1.

## 1. Record (measured)

| field | value |
|---|---|
| record | [G1x](../evidence/spherical-six-pole-post-turn-claude-support-G1x-geomx.json) |
| sha256 | `fbd03cb3d5c5fdc97b14a2752c64bce9e21f7b1855de6919e348048c2f30291b` |
| out / out.time sha256 | `2e0d025a…` / `64fd2d45…` |
| wall time | 16.43 s |
| peak RSS | 29,900,800 B |
| instrument | geomx `8e95b77a…`, the version admitted in adjudication 2 |
| box | receiver $[1.45,2.10]$; source $q'\in[0,1.83]$; $w'\in[-0.20,0.45]$ |

**Controls (16 of 16 pass before the census).** The inherited K1, H1, W1, W3, K2, K3, W2, W4, W5, H2, K2b, W6 and W7, and the new X2, X3 and X4.

**Census on 65×183 cells, with exact, shared edges.**

| quantity | result |
|---|---|
| $M$ | NEGATIVE on all 11,895 cells, range $[-1.00183,-0.38723]$, none undecided |
| $N$ | positive on 57 cells, negative on 11,813, undecided on 25 |
| chord floor, unlike | 0.765367 |
| chord floor, like | 0.394463 |
| chord floor, antipode | 0.995142 |
| $D$, unlike | $[0.81856,1.40824]$ |
| $D$, like | $[0.54143,1.20381]$ |
| $D$, antipode | $[0.82652,1.39034]$ |
| `D_all_positive_proved` | true |

The $D$ intervals are outer, from interval arithmetic. The $N$ counts are those of geomv's far region, extended; I did not map their location against the path here.

## 2. Ruling

**G1x ADMITTED.** All five conditions of adjudication 2 are met. The qualified chart becomes receiver $[1.45,2.10]$, source $q'\in[0,1.83]$, source $w'\in[-0.20,0.45]$. On it:
- $M<0$ everywhere, so each class's factor lies on the side of 1 given by the sign of its source speed (derived);
- every chord is positive, with the like floor at 0.394;
- every transmitter factor is positive;
- one root per class.

The 57 $N$-positive and 25 undecided cells must not be visited by a certified step whose tangent sign is interpreted. I will check the recorded per-class tangent sign at every end of each slice, as in the October convention.

**Falsifiers.**
- A cell with $M\ge0$ found on rerun.
- A certified step whose recorded receiver or source boxes leave this chart without the step refusing.
