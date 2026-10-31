# Six-pole post-turn campaign, review: adjudication 8 (Q2 RULING: the second support turn is UNIQUE and STRICT)

Written 2026-10-21 by the review role. Record reading only; no Python run.

## 1. Record (measured)

| item | value |
|---|---|
| record | [J2](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.json) |
| sha256 | `27170902f7e9cd21b7c31ad7a50e5fba472d088168cb573c11c7b88284cb032a` |
| out sha256 | `aa6abc22…` |
| out.time sha256 | `8314bc49…` |
| run time | 76.79 s real |
| instrument | ddl-jet `c0756833…`, admitted in [adjudication 7](spherical-six-pole-post-turn-claude-review-adjudication-7.md) |
| controls | 71 of 71 passed before the band |
| completeness | `partial` false; 26 rows, steps 532–557 |
| sub-intervals | $K=4$ on every row; every row is "negative" |

On step 532 the first sub-interval begins at $t_l=7.176684593623649597167969$, the 531 end's lower time. The last ends at $t_h$. The cover is as derived in [adjudication 4](spherical-six-pole-post-turn-claude-review-adjudication-4.md)(f).

**Whole-step $l''$ hulls (all NEGATIVE).**

| step | $l''$ hull |
|---|---|
| 532 | $[-0.06037,-0.01782]$ |
| 541 | $[-0.09109,-0.03945]$ |
| 550 | $[-0.12531,-0.06637]$ |
| 556 | $[-0.14735,-0.08410]$ |
| 557 | $[-0.15129,-0.08716]$ |

The sub-interval widths are 0.040–0.062. The largest terms in the step-556 width budget are $j_{\rm like}$ 0.024, $p_{\rm like}$ 0.015, $q$ 0.008 and $w$ 0.006.

**Consistency check (mine; shared steps only).** On every shared step, 532–541, the ddl-jet hull lies inside and intersects my ddl10 $K=4$ hull. For example, step 541 has jet hull $[-0.0911,-0.0395]$ and my hull $[-0.1742,+0.0437]$. No disagreement. This is consistency, not independence.

## 2. Certificate (derived from measured enclosures)

1. **$l'$ decreases strictly on $[t_{531},t_{557}]$.** J2 gives $l''<0$ at every instant of every whole step 532–557, as instants on the history.
2. **The end signs.** $l'(t_{541})>0$ (S9, receval v7 6×24, [adjudication 1](spherical-six-pole-post-turn-claude-review-adjudication-1.md)). $l'(t_{556})<0$ (S8, receval v7 6×24, path-continuation adjudication 15).
3. **Exactly one zero.** By 1 and 2, $l'$ has exactly one zero $t_{s2}$ in $(t_{541},t_{556})$, and the crossing is strict, from positive to negative. Also:
   - $l'>0$ at every instant from the step-437 end to $t_{531}$ (path-continuation adjudication 12), and on $[t_{531},t_{541}]$ by strict decrease;
   - $l'<0$ on $[t_{556},t_{557}]$.

   So $t_{s2}$ is the ONLY zero of $l'$ on $[t_{437},t_{557}]$. Together with path-continuation adjudication 15, it is the only zero of $l'$ between the first support turn and $t_{557}$.

**Ruling.** SECOND SIGNED-SUPPORT TURN: CERTIFIED, UNIQUE and STRICT. It is a strict local MAXIMUM of $l=-w^2-r$. Since $l<0$, it is a strict local minimum of the inward support magnitude. It lies in

$$t_{s2}\in(7.276684593623649597167959,\ 7.426684709182828044891367),\qquad T\in(72.7668459,\,74.2668471),$$

using the padded reading. The recorded-string form ends in …969 and …357.

It lies STRICTLY BEFORE the path turn: $t_{s2}<t_{556}<t_\star$ on the one history (path-continuation adjudications 11 and 15).

Q4 and Q2 combine here. Strict monotonicity lets the end sign at 541 move the lower end beyond the lemma's reach at 539.

**Grade.** The certificate is DERIVED from measured enclosures. It rests on three cross-code sources:
- the whole-step $l''$ signs, from the continuation's ddl-jet;
- the end signs, from the support's receval v7;
- the positive side before 531, from my audits and ddl10, with the subject's whole-step boxes on 492–493.

My own ddl10 could not decide $l''$ at $K=4$; its hulls straddle zero. So the uniqueness rests on the SUBJECT side's instrument, checked for consistency against mine.

Shared premises:
- the stored-rate premise, which also supplies the source jerk that dominates the width;
- the frozen step instrument;
- the admitted v4.4 inclusion;
- padded reads;
- the intersection premise.

**Falsifiers.**
- A rerun of any J2 step with an $l''$ hull meeting zero.
- A record contradicting a stored `ap` box.
- A rerun of end 541 with $l'\le0$, or of end 556 with $l'\ge0$.
