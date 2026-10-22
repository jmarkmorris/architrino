# Six-pole path continuation, review: adjudication 13 (the support's S6 account at the path-turn ends 556–558; a narrower bracket for the second support turn; how to decide the order)

Written 2026-10-20 by the review role. Record reading only; I ran no Python for this adjudication.

## 1. Subject

The subject is [S6](../evidence/spherical-six-pole-path-continuation-claude-support-S6-receval-v6-pathturn-556-558.json), sha256 `3ec77e74a35f2212ad5e66cb446a5ab7fbd9ff990bd07cbdc39d59a1479846ab`.

- **Companion records.** Out `180ef672…`; out.time `bad17979…`, showing 104.70 s real against 34.20 s user. That is within the 110 s alarm under load, a 5 s margin.
- **Instrument.** receval v6 (`bd3baea8…`, admitted in [adjudication 5](spherical-six-pole-path-continuation-claude-review-adjudication-5.md)), per the support's commands file, line 79. The record's `instrument` field still says "receval v5"; that label is inherited from the v5 text and is wrong.
- **Controls.** All 17 pass before the targets: D1, D2, W1, P1–P9 and V0–V4.
- **Run.** It used the reconstructed chain r1–r5 and P1–P3, with every history field read padded.

## 2. Measured (subdivided end evaluation; cover checked; cross-code with my audit)

| end | $l'$ | $r$ | $r'$ | $a$ | $l$ |
|---|---|---|---|---|---|
| 556 | $[-0.01455994,\,+0.00032573]$, undecided | $[0.0975803,0.1026117]$ | $[+0.0047067,+0.0160912]$ | $[-0.4050330,-0.3798543]$ | $[-0.1026670,-0.0975807]$ |
| 557 | $[-0.01587100,\,-0.00099280]$, NEGATIVE | $[0.0976512,0.1027275]$ | $[+0.0028453,+0.0141924]$ | $[-0.4072293,-0.3816736]$ | $[-0.1027402,-0.0976499]$ |
| 558 | $[-0.01727673,\,-0.00223580]$, NEGATIVE | $[0.0977008,0.1028274]$ | $[+0.0009094,+0.0122922]$ | $[-0.4093761,-0.3834105]$ | $[-0.1028827,-0.0977009]$ |

**Class account at 557 (dimensionless, multiplicity included).**

| class | tangent | radial |
|---|---|---|
| unlike | $[-0.018730,-0.018452]$ | $[-0.049588,-0.049424]$ |
| like | $[-0.394003,-0.368504]$ | $[+0.171080,+0.175948]$ |
| antipode | $[+0.005329,+0.005456]$ | $[-0.023841,-0.023796]$ |

The like pair carries almost all of the tangent acceleration and the whole positive radial part. Ends 556 and 558 differ from 557 only in the fourth digit.

All the end roots lie inside their recorded source ranges. The like root reaches the recorded range's upper edge (margin 0.0). That is allowed: the recorded range was first proved to contain the root by the residual-sign straddle check.

These enclosures are narrower than mine (adjudication 11) and meet them wherever both exist; the signs never disagree. That is cross-code consistency, not independent evidence.

**Notable (measured).** $r'>0$ is PROVED at all three ends here, and at 558 my own evaluation was undecided. Combined with my $r'<0$ at the 566 end, a local maximum of $r$ exists in $(\underline t^{\,e}_{558},\,\overline t^{\,e}_{566})$, which is $(7.446684593623649597167959,\,7.526684709182828044891367)$ with the padded reading. That maximum lies AFTER the path turn, as instants of the history. Uniqueness is still open, so another local maximum between the 557 and 558 ends is not excluded.

## 3. Second support turn: narrower bracket (derived; the negative end is cross-code)

With $l'>0$ at every instant through the 531 end ([adjudication 12](spherical-six-pole-path-continuation-claude-review-adjudication-12.md)) and $l'(t_{557})<0$ (S6), the argument of adjudication 12, section 4, places at least one local maximum of $l$, and every local maximum after the first support turn up to $t_{557}$, in

$$(7.176684593623649597167959,\ 7.436684709182828044891367),\qquad T\in(71.7668459,\,74.3668471).$$

This replaces the upper end 7.4667 that came from my own 560. **Grade:** derived from measured enclosures. The negative end is the support's receval v6 (cross-code). The positive side is as in adjudication 12. Uniqueness and strictness remain open.

## 4. Order of the second support turn and the path turn (derived)

Both events live on ONE history with ONE uncertain clock origin. So their order is decided by the step-end instants, not by the absolute time brackets.

- The path turn lies strictly after the 556 end instant and before the 558 end instant (adjudication 11).
- The support maximum lies before the 557 end instant (section 3).
- The two overlap only between the 556 and 557 end instants. **The order is still UNDECIDED.**
- **What would decide it:** a proved $l'<0$ at the 556 end. That would put every such maximum before the 556 end instant, and so strictly BEFORE the path turn.
  - S6 gives $l'(t_{556})\le+0.00033$, so a finer end cover could plausibly settle it (inferred).
  - receval's end cover is fixed at $3\times3$. The `n_sub` argument controls the sub-steps, not the end cover. A version that changes only the end-cover count, say to $6\times6$, with V1–V4 rerun, plus a single rerun at end 556, is the bounded route. I estimate 60–100 s under the current load (inferred from S6's 34 s user time for three ends at $3\times3$).

## 5. Ruling

- **S6 ADMITTED.** It is a measured account of $r$, $l$, $l'$ and the class contributions at the path-turn ends 556–558, made with an admitted instrument whose controls passed.
- **Second support turn: existence CERTIFIED** in the narrower bracket of section 3. Uniqueness is open. Its order relative to the path turn is undecided, and section 4 gives the route to decide it.
- **Canonical radial maximum: existence certified** in $(7.446684593623649597167959,\,7.526684709182828044891367)$, after the path turn as instants. Uniqueness is open.

**Falsifiers.**
- A rerun of end 557 with $l'\ge0$ anywhere on its box.
- A proved $l'\le0$ at an instant before the 531 end.
- A proved $r'\le0$ at the 558 end.
