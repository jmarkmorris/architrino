# Six-pole path continuation, review: adjudication 7 (Q3 ruling: the narrower bracket of the first support turn is CERTIFIED)

Written 2026-10-20 by the review role. Record reading only; I ran no Python. This ruling closes the condition of [adjudication 3](spherical-six-pole-path-continuation-claude-review-adjudication-3.md) (`be702609…`) under the design admitted in [adjudication 5](spherical-six-pole-path-continuation-claude-review-adjudication-5.md) (`7018a061…`).

## 1. Records (measured; read with `node`)

| record | sha256 | result |
|---|---|---|
| [S3 controls, receval v6](../evidence/spherical-six-pole-path-continuation-claude-support-S3-receval-v6-controls.json) | `d92c9336029c73cbae05db14115191056e67caba92a8af36af7a20f9da6b9c89` | 17 of 17 pass (P1–P9, V0–V4, D1, D2, W1); chain486, slice6 and slice5 controls pass |
| [S4 ends 412 and 431, receval v6](../evidence/spherical-six-pole-path-continuation-claude-support-S4-receval-v6-ends-412-431.json) | `d00b5dd0e8704c605948a2d0c4ace89fcea15236084aea0d0d7d9194cfed984a` | the same 17 controls pass first; both rows evaluated, with no refusal |
| S4 out / out.time | `74aa9864…` / `cf6eafcf…` | 24.96 s wall, peak RSS 94,076,928 B |

The V1 image under v6 is $[0.69999999999999999999997,\,1.02000000000000000000003]$, which contains the exact $[0.7,1.02]$ within $3\times10^{-23}$, as expected from the pad.

**End rows, receval v6.** Every history field and the end box and end time are read outward with a $10^{-23}$ pad; the cover is exact and checked.

| end | end time used (padded) | $l'$ (dimensionless) | sign |
|---|---|---|---|
| 412 | $[5.986684593623649597167959,\,5.986684709182828044891367]$ | $[-0.002491758633779073118147904,\,-0.0000898977924673585056839101]$ | NEGATIVE |
| 431 | $[6.176684593623649597167959,\,6.176684709182828044891367]$ | $[+0.00008760459953429698858073472,\,+0.003285263991316478499488237]$ | POSITIVE |

**Tracked quantities.**

| quantity | 412 end | 431 end |
|---|---|---|
| $l$ | $[-0.111889,-0.110318]$ | $[-0.111951,-0.110192]$ |
| $r$ | $[0.015131,0.015791]$ | $[0.025931,0.026777]$ |
| $-w^2$ | $[-0.096099,-0.095187]$ | $[-0.085174,-0.084261]$ |
| $a$ | $[-0.087679,-0.086718]$ | $[-0.105943,-0.104565]$ |
| $r'$ | $[0.054296,0.056156]$ | $[0.058326,0.060844]$ |

Physical values: $T=10t$; $l/10$ is about $-0.011$; $l'/100$ is $[-2.49\times10^{-5},-9.0\times10^{-7}]$ at 412 and $[+8.8\times10^{-7},+3.29\times10^{-5}]$ at 431.

The padded enclosures differ from v5's only beyond the 18th significant digit. The margins to zero are $8.99\times10^{-5}$ and $8.76\times10^{-5}$.

## 2. Certificate (derived from the measured enclosures above and the October records)

1. **Before the 412 end.** $l''>0$ on every whole step 374–437. This is my own October C23 ($K=4$) and C25 ($K=8$), with padded readers, so it is not exposed to the history premise (adjudication 3). $l'$ is therefore strictly increasing on $[t_{374},t_{437}]$, and with $l'(t_{412})<0$ it is negative on $[t_{374},t_{412}]$. Before $t_{374}$, $l'<0$ by the October whole-step proofs on steps 371–409 (October adjudications 8 and 12) and, before those, the preceding campaign's admitted exclusion back to step 275.
2. **After the 431 end.** $l'(t_{431})>0$. With strict increase, $l'>0$ on $[t_{431},t_{437}]$. October adjudication 15 extends this to every instant through the step-491 end.
3. **The zero.** $l'$ is continuous, so it has exactly one zero $t_c$ between the true 412 and 431 ends. The crossing is strict, from negative to positive, and it is the only zero of $l'$ on $[t_{275},t_{491}]$.

**The bracket.** Use the earlier end's lower time and the later end's upper time, with full time uncertainty. Taking the conservative, padded reading of the time strings:

$$t_c\in(5.986684593623649597167959,\ 6.176684709182828044891367).$$

The bracket as printed in October, $(5.986684593623649597167969,\,6.176684709182828044891357)$, differs from this by $10^{-23}$ at each end. The October form is exact under the frozen chain's time-origin premise (each `t_int` string is the declared decimal origin plus a multiple of 0.01, so it is exact). Physically, $T=10t\in(59.8668459,\,61.7668471)$.

**Ruling.** FIRST SIGNED-SUPPORT TURN (a strict minimum of $l$ with $l<0$, i.e. a maximum of the inward support magnitude): CERTIFIED, UNIQUE and STRICT in the narrower bracket above. It supersedes the conditional status of October adjudication 14 and synthesis section 7.

**Grade and independence.** Derived from measured enclosures.
- The end signs come from the support's instrument: receval v6, on the reconstructed records r1–r5.
- The strictness comes from my instrument (ddl10).
- They share the stored-rate premise, the frozen step instrument, the admitted v4.4 inclusion, and the intersection premise. Their agreement is cross-code, not independent evidence of those premises.
- The cover and the history reading are now derived (adjudications 1, 3 and 5), not inferred.
- Instrument: mpmath interval arithmetic at 30 digits. Domain: ends 412 and 431 of the radius-10 six-pole rest history, reconstructed from the step-154 anchor.

**Falsifiers.**
- A rerun in which either end sign changes.
- A history field of r1–r5 that contradicts its padded box.
- A proved $l''\le0$ on any part of steps 374–437.
- A jump of $l'$ inside a step.
