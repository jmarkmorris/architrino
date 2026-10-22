# Six-pole post-turn campaign, review: adjudication 16 (the SECOND SUPPORT TURN re-certified on the rebuilt chain: unique and strict, before the path turn)

Written 2026-10-21 by the review role, after my granted runs GP4b and GP4a. The criteria are those of [adjudication 11](spherical-six-pole-post-turn-claude-review-adjudication-11.md)(c)2. Everything below rests on the rebuilt chain R1′–R6′ (cm49, signed serializer).

## 1. Inputs (measured)

**My runs.** Both used ddl10 (`67a82d34…`, unchanged) at $K=4$, with `--own` R1′–R6′ only. All controls passed (audit9, R1–R3, I1–I4), and every history read came from reconstructed records only.

| run | PID | UTC | exit | wall | band record sha256 |
|---|---|---|---|---|---|
| GP4b, steps 494–541 | 99724 | 03:36:57–03:37:43 | 0 | 46.50 s | `b54018aa3b63ea91070e872bf0ca4f16bb098dc6846cf381a3cdecbbac63bbe7` |
| GP4a, steps 438–493 | 227 | 03:39:49–03:40:45 | 0 | 55.21 s | `bcce55884741c11f40aaeaf75f5eacd09bd7e3f3d1502688024ae12b7c2e9573` |

Each run's controls json is `db51eadf…`. The out files are `b1add30d…` and `8acdce98…`. The out.time files are `106464a1…` and `f87a78f1…`.

**My end evaluation (GP3, adjudication 15).** $l'$ at the 437 end is $[+0.000172154,\,+0.005231115]$, positive.

**The support's S14** ([record](../evidence/spherical-six-pole-post-turn-claude-support-S14-receval-v7-rebuilt-531-541-556-6x24.json), sha256 `2fc67b89d9427f133dd11f8d64d13bee1e065f873256b60a1d0c5e8a7259ab7b`):
- **Instrument:** receval v7 with a 6×24 cover, end-only, on the rebuilt chain. Its P1 reports the reconstructed steps as 155–570, with no skips.
- **Controls:** 17 of 17 pass.
- **Results:**
  - $l'$ is POSITIVE at every end 531–541; the lower bound at 541 is $0.000435841$.
  - $l'$ is NEGATIVE at the 556 end, $[-0.013507905,\,-0.000709928]$.

**The continuation's J3** ([record](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.json), sha256 `5767cf817141747e837396b8654a9962d5454a6074e7aec1ec5f396d9c6055f5`):
- **Instrument:** ddl-jet v2, with a chain of R1′–R6′ by name and sha256.
- **Controls and completeness:** 71 of 71 controls pass; the record is complete.
- **Result:** $l''$ is NEGATIVE on every whole step 532–557, for every sub-interval at $K=4$. Hulls run from $[-0.05992,-0.01827]$ at 532 to $[-0.15048,-0.08799]$ at 557.

## 2. Certificate (derived from these measured enclosures)

1. **$l'>0$ at every instant from the 437 end to the 531 end.** This is the lemma $l'\ge A_{k-1}+\min(L_k,0)\Delta$, using my end lower bounds and my $L$ rows. Its margins are positive on every step 438–531; the smallest is 0.000169, at step 438. It fails at 532, where it is no longer needed.
2. **$l'$ strictly decreases on $[t_{531},t_{557}]$** (J3).
3. **End signs.** $l'(t_{541})>0$ and $l'(t_{556})<0$ (S14).

By (2) and (3), $l'$ is positive on $[t_{531},t_{541}]$ and has exactly one zero in $(t_{541},t_{556})$, crossing strictly from positive to negative. By (1) there is no zero on $[t_{437},t_{531}]$. The zero is therefore the only one of $l'$ on $[t_{437},t_{557}]$.

**Ruling.** SECOND SIGNED-SUPPORT TURN: RE-CERTIFIED, UNIQUE and STRICT. It is a strict local MAXIMUM of $l$, equivalently a strict local minimum of the inward support magnitude, since $l<0$. With the padded reading,

$$t_{s2}\in(7.276684593623649597167959,\ 7.426684709182828044891367),\qquad T\in(72.7668459,\,74.2668471).$$

It lies strictly BEFORE the path turn. On the one history, $t_{s2}<t_{556}<t_\star$: $w>0$ at the 556 end, and $a<0$ on whole steps 557 and 558 ([adjudication 15](spherical-six-pole-post-turn-claude-review-adjudication-15.md)).

**Relation to the first support turn.** That it is the first support turn AFTER the first one needs $l'>0$ from the first turn's instant to the 437 end. That comes with the first-turn re-certification (GP5, S16), through $l''>0$ on 374–437 and $l'(t_{437})>0$.

**Grade.** DERIVED from measured enclosures on the rebuilt chain. The $l''$ sign comes from the continuation's ddl-jet and the end signs from the support's receval v7; both are cross-code. The positive side 438–531 comes from my own instruments.

**Premises.**
- the stored-rate premise, which supplies the source jerk that dominates the ddl-jet widths;
- the frozen step instrument;
- the cm49 correlated inclusion with the signed serializer;
- padded reads;
- the intersection premise.

**Consistency note.** The bracket coincides with the suspended one in [adjudication 8](spherical-six-pole-post-turn-claude-review-adjudication-8.md). The coincidence is consistency only; the certificate rests on the evidence above.

**Falsifiers.**
- An $l''$ hull in J3 meeting zero on rerun.
- A rerun of end 541 with $l'\le0$, or of end 556 with $l'\ge0$.
- A lemma margin found negative on 438–531.
