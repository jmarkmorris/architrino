# Six-pole post-turn campaign, review: adjudication 21 (return-path slice P6′, steps 661–688: ACCEPTED; no event)

Written 2026-10-21 by the review role, after my granted run GP7, the last compute of the campaign.

## Subject and run (measured)

**Subject.** [P6′](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P6.json), sha256 `0bd1084778c126ce67f74bd820a9aaea3a1707d568b3adf769379dddb965996d`. Produced by cm49, with the `signed-v49` tag. Steps 661–688, all 28 certified, stop reason "plan exhausted".

**My run, GP7.** Instrument audit10 (`b2b90c7a…`, unchanged). The `--own` chain was R1′–R6′ and P4′–P6′; the target was P6′.

| field | value |
|---|---|
| PID | 4178 |
| time (UTC) | 04:02:06–04:02:13 |
| exit | 0 |
| wall | 7.31 s |
| peak RSS | 119,848,960 B |
| census | no Python present |

| output | sha256 |
|---|---|
| [json](../evidence/spherical-six-pole-post-turn-claude-review-audit10-GP7-P6.json) | `94b5eba3f03264ec6ad0e8ed17eda060a1f40afd827f0e4b1f6a17500682077c` |
| consistency | `8071dd1f…` |
| out | `34d6cd9b…` |
| out.time | `33a82df9…` |

68 of 68 controls passed. All 28 steps are OK, with no sign disagreement.

## Signs and values (measured, my own evaluation)

On all 28 steps, both at the ends and over whole steps:
- $w<0$;
- $a<0$, at the ends and on whole steps under both readings;
- $l'<0$ on whole steps;
- $r'<0$ at the ends;
- all three tangent contributions $<0$; the antipode's has stayed negative since 652;
- $r>0$ and $l<0$.

Values at the 688 end:

| quantity | enclosure |
|---|---|
| $w$ | $[-0.454995,-0.428986]$ |
| $a$ | $[-0.215591,-0.189718]$ |
| $r$ | $[0.016376,0.022263]$ |
| $l$ | $[-0.229283,-0.200405]$ |
| $r'$ | $[-0.078758,-0.056878]$ |
| $D_L$ | $[1.0951,1.1165]$ |
| $D_U$ | $[1.0509,1.0538]$ |
| $D_A$ | $[0.9732,0.9764]$ |

## Ruling (derived)

**P6′ ACCEPTED** through the 688 end, $t\le8.746684709182828044891357$, i.e. $T\approx87.47$. No event occurs on 661–688:
- no speed extremum, since $a<0$ on every whole step;
- no support turn, since $l'<0$ on every whole step;
- no sign change of any partner tangent contribution, of $r$, or of $l$.

## Outlook (inferred)

**Canonical radial acceleration.** $r$ falls about 0.0012 per step, so it would reach zero roughly 15–20 steps after 688. That would be a radial ZERO, not a support event.

**Chart edge.** The like delayed source speed reaches $[-0.1764,-0.1457]$ at 688 and falls about 0.006 per step. It would reach the chart edge $w'=-0.20$ near steps 692–697. A further slice would refuse there, correctly, until a new chart extension with its own controls is admitted.

**Negative like source speed.** Every step here has one. These rulings rest on my signed closed forms, and I have no known control with $v'<0$ (adjudication 19).

**Falsifiers.** An enclosure missing its true value, or a proved $a\ge0$ on any whole step 661–688.
