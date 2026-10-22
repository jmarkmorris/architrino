# Six-pole post-turn campaign, review: adjudication 6 (Kc48: the cm48 controls record; cm48 admitted for slices)

Written 2026-10-21 by the review role. Record reading only; no Python run. Follows [adjudication 3](spherical-six-pole-post-turn-claude-review-adjudication-3.md) (`979dd679…`).

## 1. Record (measured)

| field | value |
|---|---|
| record | [cm48 controls](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.json) |
| sha256 | `473960754f271effaec0c1685a7e1dadcc62d9c6dfa8ea44cb2c1b4d4685b599` |
| wall time | 43.41 s |
| peak RSS | 124,682,240 B |

**69 of 69 controls pass.** These are every inherited control plus B1–B9.

**B9.** Boxes just inside each new edge are accepted. Boxes $10^{-9}$ past each edge are refused. The interval $q'\in[1.805,1.81]$ is accepted by the new box and refused by the old one. The other edges are still enforced. The box values are $q\in[0.55,2.1]$, $q'\in[0,1.83]$ and $w'\in[-0.2,0.45]$.

**E10 ran on the NEW box (derived by comparison).** The like census differs from the October C15 record:

| quantity | October C15 | this record |
|---|---|---|
| like $r_{\min}$ | 0.38975 | 0.355322 |
| like $D$ range | $[0.4324,1.1261]$ | $[0.4089,1.2627]$ |

Both changes are what the extended $q'$ and $w'$ produce. The 0.35 floor passed by a margin of only 0.0053. E10's NAME string still quotes the old box; that label is static and the computation used the new one.

**Note.** E10's census covers the whole step box down to receiver $q=0.55$, and there $M$ reaches $+0.342$. $M$ is therefore NOT negative on the whole step box. The $M<0$ statement (G1x, [adjudication 5](spherical-six-pole-post-turn-claude-review-adjudication-5.md)) holds only for receiver $q\ge1.45$, which is why I flag any slice whose receiver goes below 1.45.

**Citation.** The continuation's [wave-1 report](spherical-six-pole-post-turn-claude-continuation-wave1.md) (`107b2d38…`), line 9, corrects the stale geomx citation: geomx is `8e95b77a…`, and the bounds are unchanged. Condition 2 of adjudication 3 is met.

## 2. Ruling

**cm48 ADMITTED for slices.** All four conditions of adjudication 3 are met:
- the controls record passes;
- the citation is corrected;
- G1x is admitted;
- slices are to start from the P3 step-570 strings.

Each slice is ruled on separately with audit10 on grants.

The October event detectors in audit10 assume $\dot q>0$. On the return path I take events only from my own per-step enclosures, as set out in my reference, section 3.

**Falsifiers.**
- A slice step whose receiver or source boxes leave the chart without the step refusing.
- A slice that does not join the P3 step-570 end box.
