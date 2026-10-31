# Six-pole post-turn campaign, review: adjudication 18 (Q3 of the path-continuation campaign, the NARROWER first-support-turn bracket, re-certified on the rebuilt chain)

Written 2026-10-21 by the review role. Record reading only; no Python run.

## 1. Inputs (measured)

**The support's S16.** [S16](../evidence/spherical-six-pole-post-turn-claude-support-S16-receval-v7-rebuilt-412-431-6x24.json), sha256 `8fb030bab3a7f027c4650536d216f80f0266058c7f06ffe6bfc1616bfe61be3c`, ran 12.99 s.

- **Instrument.** receval v7 with a 6×24 cover, end-only. It reads the rebuilt chain: P1 reports reconstructed steps 155–570 with no skips. Every history field is read padded and the cover is exact.
- **Controls.** 17 of 17 pass.

| end | $l'$ | sign |
|---|---|---|
| 412 | $[-0.0023273131,\,-0.0002548773]$ | NEGATIVE |
| 431 | $[+0.0003031624,\,+0.0030699871]$ | POSITIVE |

**My GP5b** ([adjudication 17](spherical-six-pole-post-turn-claude-review-adjudication-17.md)). $l''>0$ on every whole step 410–436.

## 2. Certificate (derived)

1. $l'$ increases strictly on $[t_{409},t_{436}]$.
2. With $l'(t_{412})<0$, $l'$ is negative on $[t_{409},t_{412}]$. Adjudication 17 already gives $l'<0$ at every instant before the 409 end.
3. With $l'(t_{431})>0$, there is exactly one zero, strictly crossing, in $(t_{412},t_{431})$. It is the same event as in adjudication 17.

**Ruling.** FIRST SIGNED-SUPPORT TURN: CERTIFIED, UNIQUE and STRICT in the narrower bracket, with the padded reading:

$$t_{s1}\in(5.986684593623649597167959,\ 6.176684709182828044891367),\qquad T\in(59.8668459,\,61.7668471).$$

This restores, on the rebuilt chain, the bracket of path-continuation adjudication 7, which had been suspended. That the two brackets coincide is consistency only. The certificate rests on S16, GP5a, GP5b and the earlier frozen exclusion.

**Grade.** DERIVED from measured enclosures. The end signs come from the support's receval v7 (cross-code). The $l''$ sign and the negative side come from my own instruments on the rebuilt chain.

**Shared premises.**
- the stored-rate premise;
- the frozen step instrument;
- the cm49 inclusion with the signed serializer;
- padded reads;
- the intersection premise.

**Falsifiers.**
- A rerun of end 412 with $l'\ge0$, or of end 431 with $l'\le0$.
- A proved $l''\le0$ on part of steps 413–431.
