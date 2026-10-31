# Six-pole path continuation, review: adjudication 15 (S7 and S8 on receval v7: $l'<0$ at the 556 end; the second support turn PRECEDES the path turn)

Written 2026-10-20 by the review role. Record reading only; I ran no Python for this adjudication.

## 1. Records (measured)

| record | sha256 | result |
|---|---|---|
| [S7 controls, v7 at 6×24](../evidence/spherical-six-pole-path-continuation-claude-support-S7-receval-v7-controls-6x24.json) | `9ea3f2f2b47c8d976cd5e234a1034dde7c218e988e13cd2534a87703e182caed` | 17 of 17 pass. V1 at 6×24 has 144 pieces, each containing its exact root ranges, and an image of $[0.69999999999999999999997,\,1.02000000000000000000003]$. |
| [S8, end 556 at 6×24](../evidence/spherical-six-pole-path-continuation-claude-support-S8-receval-v7-end556-6x24.json) | `86beeb59e1e03469c67f72c47e4d52fcda30b35d856bd404555ee9438ef42c87` | The same 17 controls pass first. Instrument "receval v7", counts $[6,24]$, `--end-only`. |
| S8 out / out.time | `c3f7136b…` / `22b359ba…` | 31.08 s real, 11.78 s user; peak RSS 103,186,432 B |

**End 556 at 6×24 (padded, outward, exact cover, checked).** The rate is $l'\in[-0.013550143,\,-0.00066607235]$, which is **NEGATIVE**. Its largest upper end, $-0.00066607$, sits on piece $(q_5,w_{23})$, at the top corner of the box. All six per-$q$-piece hulls are negative. The 3×3 evaluation in S6 gave $[-0.01456,+0.00033]$, so the finer cover decided it, as adjudication 13 anticipated.

**Account at end 556.** $l\in[-0.1024872,-0.0977520]$, $r\in[0.0977517,0.1024319]$, $r'\in[+0.0052296,+0.0155527]$ and $a\in[-0.4035819,-0.3811992]$. The end box is the admitted one: $q\in[1.8107538,1.8176402]$, $w\in[0.00055058,0.00743566]$.

## 2. The second support turn precedes the path turn (derived)

**Premises.**
- $l'>0$ at every instant from the step-437 end to the step-531 end ([adjudication 12](spherical-six-pole-path-continuation-claude-review-adjudication-12.md), section 3).
- $l'(t_{556})<0$ (S8).
- $w(t_{556})>0$ and $a<0$ on every whole step 557–558, so the path turn $t_\star$ lies strictly after the 556 end instant ([adjudication 11](spherical-six-pole-path-continuation-claude-review-adjudication-11.md)).

**Argument.** On $[t_{531},t_{556}]$, $l$ rises at the left end and falls at the right end. Its maximum over that interval is therefore attained in the interior, and that point is a local MAXIMUM of $l$. Because $l$ increases strictly from the first support turn to $t_{531}$, at least one local maximum of $l$ after the first support turn lies in $(t_{531},t_{556})$. Every local maximum before the earliest maximiser on that interval lies there too.

**Conclusion.** A second signed-support turn, a local maximum of $l$ (a local minimum of the inward magnitude, since $l<0$), occurs strictly BEFORE the path turn. Both events lie on one history with one uncertain clock origin, so the order follows from the step-end instants and is derived.

**Bracket (padded reading).**

$$t_{s2}\in(7.176684593623649597167959,\ 7.426684709182828044891367),\qquad T\in(71.7668459,\,74.2668471).$$

The recorded-string form is $(7.176684593623649597167969,\,7.426684709182828044891357)$. The two brackets meet only within the origin width at their shared 556 end. As instants on the history, $t_{s2}<t_{556}<t_\star$.

**NOT proved: uniqueness and strictness.** The $l''$ hulls straddle zero (adjudication 12), so more than one local maximum, with local minima between them, is not excluded inside the bracket.

**Grade.** Derived from measured enclosures.
- The negative end, 556, is the support's receval v7 evaluation: cross-code, under the shared premises.
- The positive side comes from my ddl10 G4a2 and G4b′ rows with my end values, the subject's whole-step boxes on 492–493 (cross-code), and October adjudication 15.
- The path-turn side is my G3 audit.
- Instrument: mpmath intervals at 30 digits, padded readers. Domain: steps 437–558 of the continued radius-10 six-pole history.

**Mechanism (inferred from the measured account).** $l'=-2wa-r'$.
- While $w>0$ and $a<0$, the term $-2wa$ is positive and opposes stronger inward support.
- As $w\to0$, that term shrinks: at the 556 end $-2wa\in[0.0004,0.0061]$, by hand from the S8 $w$ and $a$ boxes.
- $r'$ stays positive: $[0.0052,0.0156]$ at 556.
- So $l'$ turns negative shortly BEFORE $w$ reaches zero. The signed support then falls again, and the inward support magnitude grows once more, before the path turns.

This matches the conditional prediction of my reference 3.6 in substance. There, $r'(t_\star)>0$ would force a maximum of $l$ before $t_\star$. Here the same order follows from the 556 end sign, without needing $r'$ at the turn.

## 3. Ruling

**SECOND SUPPORT TURN (a local maximum of $l$):** existence CERTIFIED in the bracket above, and STRICTLY BEFORE THE PATH TURN. Uniqueness and strictness are open.

**Falsifiers.**
- A rerun of end 556 with $l'\ge0$ anywhere on its box.
- A proved $l'\le0$ at an instant before the 531 end.
- A proved $w\le0$ at the 556 end.
