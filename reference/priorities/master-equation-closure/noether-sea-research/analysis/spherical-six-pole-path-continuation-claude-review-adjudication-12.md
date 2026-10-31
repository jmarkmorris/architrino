# Six-pole path continuation, review: adjudication 12 (the second support turn: existence certified, uniqueness open; completion ruling to the step-570 end)

Written 2026-10-20 by the review role, after my granted invocations G4a (failed), G4a2 and G4b′.

## 1. Runs (measured)

| run | PID | UTC | exit | wall | peak RSS | outputs (sha256) |
|---|---|---|---|---|---|---|
| G4a, ddl10 492–530 | 23703 | 21:43:51–21:44:01 | 1 (KeyError `end_classes`: r5 step 492 has no end account) | 10.43 s | 117,456,896 | [json](../evidence/spherical-six-pole-path-continuation-claude-review-ddl10-G4a-492-530.json) `6c34b316…` (controls only), out `67df1c32…`, out.time `1bb1dea6…`; kept as a failed record |
| G4a2, ddl10 494–530 | 25703 | 21:45:37–21:46:34 | 0 | 56.63 s | 117,309,440 | [band record](../evidence/spherical-six-pole-path-continuation-claude-review-ddl10-G4a2-494-530.json.ddl10.json) `aa8c50614ded419772123b93602cf787d8564fe9c672b8e3196ea1c5d1d7e118`; json `6c34b316…`; out `87a1b203…`; out.time `3fc92f20…` |
| G4b′, ddl10 531–533 | 28240 | 21:48:56–21:49:12 | 0 | 16.30 s | 118,931,456 | [band record](../evidence/spherical-six-pole-path-continuation-claude-review-ddl10-G4b-531-533.json.ddl10.json) `ceaf4d6499dea7e05bcf6a0590a7b03710ce4f53406a03864798049d84c96b1c`; json `6c34b316…`; out `1e1b90ca…`; out.time `6f21f17d…` |

All runs used ddl10 `67a82d34…`, unchanged, at $K=4$, with `--own` r1–r5, P1, P2 and P3. In every run the audit9 controls, R1–R3 and I1–I4 all passed before the target rows. Every row read reconstructed history only. The three `.json` files are byte-identical, because they hold the same controls with no targets.

## 2. Measured enclosures

- **The refined $l''$ straddles zero on every whole step 494–533.** For example, step 494 gives $[-0.0352,+0.0672]$, step 530 gives $[-0.1306,+0.0629]$, and step 533 gives $[-0.1423,+0.0591]$. The hull widths are 0.10–0.20, against about 0.03 in October, so a whole-step sign of $l''$ is NOT available.
- **My end $l'$ lower bounds** are $0.006768$ at 494, $0.001510$ at 530, $0.001027$ at 531, $0.000522$ at 532 and $0.0000629$ at 533.
- **My end $l'$ at 560 (G3)** is $[-0.023992,\,-0.000566]$, NEGATIVE. It is the first proved-negative end in my own evaluation; the subject's is 562.

## 3. Positive side at every instant (derived)

**Lower-bound lemma.** On a step with $l''\ge L$, $l'(t)\ge A+\min(L,0)\Delta$, where $A$ is the lower bound of $l'$ at the previous end.

- **Steps 494–531.** The margins are positive on every step: $0.00635$ at 494, falling to $0.00060$ at 530 and $0.00017$ at 531. This rests on my own end values and $l''$ rows.
- **Step 532 fails.** There $0.001027-0.001383<0$.
- **Steps 492–493.** These are covered by the subject's whole-step $l'$ enclosures (`dl_dt_over_step` in r5 and P1), which are positive. This is CROSS-CODE coverage from the subject's admitted step records, not my own evaluation.
- **Up to step 491.** October adjudication 15 gives $l'>0$ at every instant from the 437 end to the 491 end.

So $l'>0$ at every instant from the step-437 end to the step-531 end, with $t\le7.176684709182828044891357$.

## 4. Second support turn: EXISTENCE certified (derived from measured enclosures)

$l'>0$ on $[t_{437},t_{531}]$ and $l'(t_{560})<0$, from my own evaluation. Since $l'$ is continuous, on $[t_{531},t_{560}]$ the function $l$ rises at the left end and falls at the right end. Its maximum over that interval is therefore interior, and it is a local MAXIMUM of $l$. With $l<0$ throughout, it is a local minimum of the inward support magnitude.

$l$ increases strictly from the first support turn up to $t_{531}$. So every local maximum of $l$ after the first support turn, up to $t_{560}$, lies in the bracket below, and at least one exists. With full time uncertainty and the padded reading:

$$t_{s2}\in(7.176684593623649597167959,\ 7.466684709182828044891367),\qquad T\in(71.7668459,\,74.6668471).$$

The recorded-string form is $(7.176684593623649597167969,\,7.466684709182828044891357)$.

- **NOT proved:** uniqueness, strictness, or that the crossing of $l'$ is a single sign change. These would need $l''<0$ on every whole step 532–560, which the $K=4$ hulls do not give. $K=8$ is not expected to close hulls about 0.2 wide (inferred). Narrower brackets could come from the support's S5 end evaluations at 540–560 (subdivided boxes), provided they prove signs at intermediate ends.
- **Order relative to the path turn: UNDECIDED.** The path-turn bracket $(7.426684593623649597167959,\,7.446684709182828044891367)$ (adjudication 11) lies INSIDE this bracket.
- **Mechanism (inferred from the measured account).** $l'=-2wa-r'$. As $w\to0$, the opposing term $-2wa$ falls, with centres 0.0846 at 493, 0.058 at 533 and about 0 at 557. Meanwhile $r'$ stays positive until about the 557 end (adjudication 11). The rate $l'$ therefore loses its positive part and turns negative.

**Grade.** Existence is DERIVED from measured enclosures:
- the negative end comes from my own end evaluation (audit10 G3, 560);
- the positive side comes from my own ddl10 rows and end values (494–531), the subject's whole-step boxes (492–493; cross-code), and October adjudication 15.

Instrument: mpmath intervals at 30 digits with padded readers. Domain: steps 437–560 of the reconstructed and continued radius-10 six-pole rest history.

**Falsifiers.**
- A proved $l'\le0$ at an instant before the 531 end.
- A proved $l'\ge0$ at the 560 end.
- Any listed enclosure missing its true value.

## 5. Completion ruling (to the step-570 end, $t\le7.566684709182828044891357$)

- **Q3. First support turn, narrower bracket:** CERTIFIED, unique and strict, in $(5.986684593623649597167959,\,6.176684709182828044891367)$ (adjudication 7).
- **Q2. Path turn:** CERTIFIED, unique and strict; the first since release. It lies in $(7.426684593623649597167959,\,7.446684709182828044891367)$, with $q(t_\star)\in[1.810754,1.817731]$ (adjudication 11).
- **Canonical radial maximum:** existence certified in $(7.436684593623649597167959,\,7.526684709182828044891367)$; uniqueness open (adjudication 11).
- **Second support turn (a maximum of $l$):** existence certified in $(7.176684593623649597167959,\,7.466684709182828044891367)$. Uniqueness and strictness are open, and its order relative to the path turn is undecided (section 4).
- **Instruments admitted:** receval v5 and v6 (adjudications 1 and 5), and the cm47 design carried to cm471 (adjudications 4, 6 and 8). cm47 is barred from targets.
- **Slices accepted:** P1 (493–515), P2 (516–550) and P3 (551–570) (adjudications 9–11).
- **Shared premises** of every ruling, so agreement among roles is not independent evidence: the stored-rate premise; the frozen step instrument; the admitted v4.4 inclusion; the intersection premise; and the G1 chart for the subject's steps. The source $q'$ reached 1.7667, a margin of 0.033 to the chart edge.
