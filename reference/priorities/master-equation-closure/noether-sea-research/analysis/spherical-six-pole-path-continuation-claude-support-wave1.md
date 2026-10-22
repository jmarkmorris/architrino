# Six-pole path continuation, support role: wave-1 report (living)

*Support role (emmy-noether lens) for the Claude PI "curvature"; campaign start 20:54:49 UTC 2026-10-20. This is a living report; prior states are copied to `.tmp/six-pole-path-continuation/support/` before each rewrite. Times are read from `date -u`.*

## Exposure disclosure

This session has no memory of the October 14 campaign. Before writing v5 I read:

- receval v4 in full;
- review adjudication 14;
- synthesis section 7;
- the C24 commands and receipts in the predecessor support commands file;
- the C24 rows for steps 412 and 431, through `jq`;
- the helper definitions in the frozen exec chain (wave14, slice4, dlambda3);
- the `end_q_str` writing line of steps10-cm v4.4;
- the installed mpmath source for interval conversion.

I had not opened any new path-continuation file written by another role.

## Checkpoint 1 (21:04 UTC, no compute run)

**Hashes verified with `shasum -a 256`:**

| file | sha256 | check |
| --- | --- | --- |
| receval v4 | `094cd08243d65bca6def3542958470b2c9fd2acfab9e3d3622312154348bd5ab` | equals brief |
| steps10-cm v4.4 | `1bcc8a279934bc77b83e164ee4e7e8499d5fb44c173395b8178802fbd31e0540` | equals plan |
| r5 (C22) | `7af6178534c67a97e78800f6a5c7782b4c27fd6f124ed15bad7d82483e54b875` | equals plan |
| r4 (C20) | `8182cb08f20b4409e61b3149c800a0a022572d2e23fb0b2ec9f77f3acd55d8d6` | equals brief |
| r1 (C18) | `7940e277359dd41690b60a0b77af59e5587c3172397c119854d809190538c2d4` | not in brief |
| r2 (C20) | `7b1470e81409f6a9361b8f932e5974895698f373e6b0d2dc8d340e53d5aec3c1` | not in brief |
| r3 (C20) | `e2dc6540a21e0682a14fce9a5d848785c06839f4c688f64f94ce8606c4cf6cb8` | not in brief |
| plan | `e963f8aa1924e910294f8c15aeed592f236d55c8a767095d3e6a4534ad3c8134` | equals launch message |

**Written:**

- [receval v5](../evidence/spherical-six-pole-path-continuation-claude-support-receval-v5.py), sha256 `2756db628afc892a857eee56d2e8d79858d137f4566c685a6fe7b397fdcc8acd`;
- [controls specification](spherical-six-pole-path-continuation-claude-support-receval-v5-controls-spec.md), sha256 `d295c0f9e258e27ae82f12f3e093a922339e8aa7bbe89db5a554739ed63d8f5c`.

**What v5 changes.** The specification gives the derivation; the file header gives the complete change list.

- **C1, exact cover with shared edges.** The first and last edges are the box endpoints. Each internal edge is computed once and shared by the two adjacent pieces. A `cover_ok` check proves that the union equals the box, or the route refuses (derived lemma in the specification).
- **C2, outward decimal reading of the end box and end time.** This is an addition beyond the brief, flagged for PI acceptance.
- **C3, a full end account.** It adds $l$, $r$, $a$, $-w^2$, the per-class tangent and radial contributions, the totals, and the class end roots with their margins.
- **C4, a step-list command line.**
- **C5, controls V0–V4 and per-row diagnostics.**

**Grading.** The cover lemma is derived. The claim that v5 runs correctly is not yet established: no Python has run, so syntax and runtime are unverified. The first run is the controls record S1.

**Open premise (flagged, not changed).** History slabs are still read from decimal strings to the nearest binary value. This is shared with every earlier adjudication, and I infer it is immaterial; that is not derived.

## Checkpoint 2 (21:17 UTC): v5 runs S1 and S2; v6 written

**Receipts.** The [commands file](../evidence/spherical-six-pole-path-continuation-claude-support-commands.txt) holds every grant, census and receipt.

| run | PID | UTC | wall | peak RSS (bytes) | exit | result |
| --- | --- | --- | --- | --- | --- | --- |
| S1 (v5 controls) | 90318 | 21:07:07–21:07:11 | 4.15 s | 90,767,360 | 0 | all controls pass (chain486/slice6/slice5, P1–P9, V0–V4) |
| S2 (v5, ends 412, 431) | 92610 | 21:11:56–21:12:28 | 32.42 s | 91,734,016 | 0 | all controls pass; targets below |

**Blocked launches.** S2 was blocked twice by Python processes outside the granted foreign set, at 21:09:24 (PID 91373) and at 21:10:39 (PID 91812). Both were foreign jobs running in the ceiling-contact folder. Neither was touched. The PI widened the standing class before the run.

**S2 results** (measured; instrument receval v5; domain: end instants of the reconstructed records r1–r5 with the frozen∩reconstructed lookup):

- End-412 $\dot l\in[-0.002491758633779073118129032,\,-0.00008989779246735850570268608]$, negative. End-431 $\dot l\in[0.00008760459953429698860288524,\,0.00328526399131647849946631]$, positive.
- Both cover checks passed. The 25-digit strings are identical to C24's (determinism of the route, not independent evidence).
- Diagnostic: v4's edge formula reached $\overline{x}$ exactly on all 8 real boxes, so adjudication 14's edge sliver did not occur on these boxes.
- Diagnostic: v4's nearest reading did not contain the decimal end box at 412 $w$ and at 431 $q$ and $w$. So C24 did evaluate a box up to about $10^{-31}$ inside the recorded one. C2 closes that gap.

**Review adjudication 2** (relayed by the PI). The history fields were written by `nstr(·,25)` to nearest with no pad, so v5's unpadded reads can lie inward by up to about $5\times10^{-25}$. The narrower bracket is therefore NOT certified from v5 output. S2 stays informative only.

**v6.** [receval v6](../evidence/spherical-six-pole-path-continuation-claude-support-receval-v6.py), sha256 `bd3baea86fe824b34bbc5e379f4ec9e8eb3232499c1291fb4f3f0f78737fbb9a`, with the [v5→v6 diff](../evidence/spherical-six-pole-path-continuation-claude-support-receval-v5-to-v6.diff), sha256 `cd6b740dafd56a901cce88eef07dc4091976ecfc4d8d4371747d2adbbce410d4`.

- Every stored decimal input is read outward and padded by $10^{-23}$.
- The frozen and reconstructed chains are rebuilt under that reader.
- New controls: D1 (the rebuild is the identical path), D2 (padded fields contain the frozen fields; joins pass) and W1 (inward `nstr` rounding: the padded read contains the field, the unpadded read misses it).
- Requested: S3 (v6 controls) and S4 (v6, ends 412 and 431).

**End account at the two ends** (v5 S2, reconstructed records; hull over the 9 cover pieces; dimensionless, with $T=10t$, acceleration and support $/10$, support rate $/100$ for physical units):

| quantity | end 412 | end 431 |
| --- | --- | --- |
| $t$ | $[5.98668459362,\,5.98668470918]$ | $[6.17668459362,\,6.17668470918]$ |
| $q$ (width) | $[1.531651186,\,1.534825100]$ ($3.17\times10^{-3}$) | $[1.588591877,\,1.592054307]$ ($3.46\times10^{-3}$) |
| $w$ (width) | $[0.308524237,\,0.309997746]$ ($1.47\times10^{-3}$) | $[0.290277975,\,0.291846452]$ ($1.57\times10^{-3}$) |
| $a$ (tangent total) | $[-0.0876795,\,-0.0867178]$ | $[-0.1059426,\,-0.1045654]$ |
| tangent: unlike / like / antipode | $[-0.03323,-0.03292]$ / $[-0.06285,-0.06209]$ / $[0.008306,0.008371]$ | $[-0.03059,-0.03030]$ / $[-0.08355,-0.08234]$ / $[0.008102,0.008174]$ |
| radial: unlike / like / antipode | $[-0.05667,-0.05650]$ / $[0.09530,0.09576]$ / $[-0.02349,-0.02347]$ | $[-0.05489,-0.05472]$ / $[0.10430,0.10495]$ / $[-0.02348,-0.02345]$ |
| $r$ (canonical radial total) | $[0.0151312,\,0.0157909]$ | $[0.0259307,\,0.0267769]$ |
| $-w^2$ | $[-0.0960986,\,-0.0951872]$ | $[-0.0851744,\,-0.0842613]$ |
| $l$ | $[-0.1118895,\,-0.1103184]$ (neg) | $[-0.1119513,\,-0.1101920]$ (neg) |
| $l'$ | $[-0.00249176,\,-0.0000898978]$ (neg) | $[0.0000876046,\,0.00328526]$ (pos) |
| $dr/dt$ | $[0.0542959,\,0.0561558]$ | $[0.0583262,\,0.0608435]$ |
| smallest root margin (class) | $4.49\times10^{-5}$ (antipode); like $9.06\times10^{-5}$ | $8.40\times10^{-5}$ (antipode); like $9.74\times10^{-5}$ |

Multiplicities 2/2/1 are included once in the class rows. The rate of $a$ is not evaluated by this instrument.

**Mechanism reading** (inferred, end values only). At both ends $w>0$ and $a<0$, so $-2wa>0$ and that term pushes $l'$ upward. The change of $l'$ from negative at 412 to positive at 431 occurs while $dr/dt$ grows (0.054→0.058–0.061) and $-2wa$ grows (about 0.054 to about 0.061). End values alone cannot exclude interior events.

## Checkpoint 3 (21:22 UTC): v6 runs S3 and S4; Phase A complete

| run | PID | UTC | wall | peak RSS (bytes) | exit | result |
| --- | --- | --- | --- | --- | --- | --- |
| S3 (v6 controls) | 99211 | 21:18:14–21:18:20 | 5.85 s | 94,289,920 | 0 | all controls pass: D1, D2, W1, P1–P9, V0–V4 |
| S4 (v6, ends 412, 431) | 1137 | 21:20:56–21:21:21 | 24.96 s | 94,076,928 | 0 | all controls pass; targets below |

Review adjudication 5 admitted the v6 design before S4 was granted (relayed by the PI).

**Controls (measured; instrument receval v6).**

- D1: the unpadded rebuild reproduces all 486 frozen slabs exactly. This shows only that the rebuild uses the same path.
- D2: every padded field contains its frozen field, and 0 joins fail.
- W1: `nstr(·,25)` wrote $[2/3,4/3]$ as `0.6666666666666666666666667` and `1.333333333333333333333333`, both inward. The unpadded read misses the field, the padded read contains it, and the guard refuses values of 100 or more.
- V1: the image is $[0.69999999999999999999997,\,1.02000000000000000000003]$. The pad is visible.

**S4 results** (measured; receval v6 with padded reads and the exact cover; reconstructed records r1–r5 with the frozen∩reconstructed lookup; domain: end instants only):

- End 412: $\dot l\in[-0.002491758633779073118147904,\,-0.0000898977924673585056839101]$. NEGATIVE, with margin $8.99\times10^{-5}$. The cover check passed.
- End 431: $\dot l\in[0.00008760459953429698858073472,\,0.003285263991316478499488237]$. POSITIVE, with margin $8.76\times10^{-5}$. The cover check passed.
- The padded end times are $[5.986684593623649597167959,\,5.986684709182828044891367]$ and $[6.176684593623649597167959,\,6.176684709182828044891367]$.
- The frozen-record ends remain undecided.

**Bracket (inferred; the review rules on it).** The review proved $\ddot l>0$ on every whole step from 374 to 437 (adjudications 12–14 of October 14). With that, these signs place the first strict support turn in $(5.986684593623649597167959,\,6.176684709182828044891367)$, using the padded endpoints. This interval contains the conditional bracket. Falsifiers:

- a v6 enclosure missing the true $\dot l$;
- a reconstructed record that does not contain the true state;
- a padded field that still lies inside its true value, possible only for a stored value of 100 or more, which the guard refuses.

**Correction.** In v6 the per-row field `v4_nearest_contains_decimal_box` calls the rebound padded reader, so it reports the padded reading, not v4's. The valid v4 measurement is the S2 one.

## Checkpoint 4 (21:36 UTC): Q3 closed; Phase B readiness (no compute)

**Q3.** The PI relays that review adjudication 7 (`05a0a810…`) CERTIFIES the narrower first-support-turn bracket in its padded form, $(5.986684593623649597167959,\,6.176684709182828044891367)$, so $T\in(59.86684593623649597167959,\,61.76684709182828044891367)$. That ruling is the review's. This report supplies the S4 enclosures it rests on.

**Phase B readiness.** These checks are measured by reading v6 and by `jq` on P1 (`e19aac9418e7cdc0b5d34b80084463e46aa2bf14763cfb15f92c7ff132adcac4`).

- v6 admits P1, P2, … as reconstructed records after r1–r5 without a code change.
- r5's trailing step-493 record (certified false, no end strings) is skipped, so P1 appends from 493.
- All 23 P1 steps are certified and carry end strings.
- P1's start strings are byte-equal to r5's step-492 end strings.
- Every field that v6 reads is present.
- The largest stored magnitude is 7.0167, so the guard is not triggered.
- An exact-string join check by `jq` is proposed before each launch, because v6 checks joins only by meets.

**Subject's own fields, read by jq (not my evaluation).** The end $l'$ is positive at every end from 505 to 515. The whole-step $l'$ spans zero on 513–515. At the end of 515, $l'\in[0.0053,\,0.0247]$ and $w\in[0.1411,\,0.1440]$. A maximum of $l$ is therefore not yet bracketed within P1.

## Checkpoint 5 (21:45 UTC): Phase B commands prepared and held (no compute)

- **Join checker.** I built an exact-string join checker in jq, [.tmp/six-pole-path-continuation/support/joincheck.sh](../../../../../.tmp/six-pole-path-continuation/support/joincheck.sh), sha256 `4de937ee…`. It passed its known case (r5→P1) and caught both negatives (r5→P2, and a perturbed start digit).
- **Target joins.** Run on its targets, it passes P1→P2 (after 515; 35 steps) and P2→P3 (after 550; 20 steps). The slices are P2 `08683e84…` and P3 `e6b7fbb6b1107508e76730c9647fe15b8ef2de06460ede0463819ac6a4f3434b`.
- **Subject's own signs, read by jq (not my evaluation).** End $w$ is positive through 556, spans zero at 557, and is negative from 558. End $l'$ is positive through 530, spans zero over 531–561, and is negative from 562.
- **Prepared commands, held for grant.** S5 evaluates ends spread over 535–560 for the maximum of $l$. S6 evaluates ends 556, 557 and 558 for the path turn. Both use receval v6 with r1–r5 and P1–P3.

## Checkpoint 6 (22:00 UTC): S6, the account at the path-turn ends

**Rulings relayed by the PI.** Review adjudication 11 (`a1e34ae8…`) certifies the path turn in $(7.426684593623649597167959,\,7.446684709182828044891367)$. Adjudication 12 (`145d1875…`) certifies that a second support turn exists in $(7.1767,\,7.4667)$; its uniqueness is open. These rulings are the review's.

**S6 run.** PID 35791, 21:57:35–21:59:19 UTC, exit 0. Wall time was 104.70 s against 34.20 s of user CPU, because the CPU was shared with foreign jobs; peak RSS was 102,924,288 bytes.

- Before launch: the join checks r5→P1→P2→P3 passed. The census showed only classes (a) and (c).
- All controls passed. The reconstructed chain runs from step 155 to 570, with no join failure.

**Account at the path-turn ends.** Measured with receval v6 on records r1–r5 and P1–P3, end instants only. Values are dimensionless (physical: $T=10t$; $a,r,l$ divided by 10; $l',r'$ divided by 100). Class rows include multiplicity.

| quantity | end 556 | end 557 | end 558 |
| --- | --- | --- | --- |
| $t$ | $[7.42668459,\,7.42668471]$ | $[7.43668459,\,7.43668471]$ | $[7.44668459,\,7.44668471]$ |
| $q$ | $[1.810754,\,1.817640]$ | $[1.810739,\,1.817695]$ | $[1.810685,\,1.817711]$ |
| $w$ | $[0.000551,\,0.007436]$ | $[-0.003433,\,0.003555]$ | $[-0.007438,\,-0.000344]$ |
| $a$ | $[-0.405033,\,-0.379854]$ | $[-0.407229,\,-0.381674]$ | $[-0.409376,\,-0.383411]$ |
| tangent unlike | $[-0.018767,\,-0.018491]$ | $[-0.018730,\,-0.018452]$ | $[-0.018694,\,-0.018413]$ |
| tangent like | $[-0.391807,\,-0.366685]$ | $[-0.394003,\,-0.368504]$ | $[-0.396148,\,-0.370239]$ |
| tangent antipode | $[0.0053683,\,0.0054946]$ | $[0.0053293,\,0.0054565]$ | $[0.0052899,\,0.0054180]$ |
| radial unlike | $[-0.049595,\,-0.049431]$ | $[-0.049588,\,-0.049424]$ | $[-0.049582,\,-0.049417]$ |
| radial like | $[0.171010,\,0.175833]$ | $[0.171080,\,0.175947]$ | $[0.171130,\,0.176046]$ |
| radial antipode | $[-0.023835,\,-0.023791]$ | $[-0.023841,\,-0.023796]$ | $[-0.023847,\,-0.023802]$ |
| $r$ | $[0.0975803,\,0.102612]$ | $[0.0976512,\,0.102728]$ | $[0.0977008,\,0.102827]$ |
| $r'$ | $[0.0047067,\,0.0160912]$ | $[0.0028453,\,0.0141924]$ | $[0.00090944,\,0.0122922]$ |
| $-w^2$ | $[-5.53\times10^{-5},\,-3.0\times10^{-7}]$ | $[-1.26\times10^{-5},\,+1.35\times10^{-6}]$ (loose: $w\cdot w$ with $0\in w$) | $[-5.53\times10^{-5},\,-1.2\times10^{-7}]$ |
| $l$ | $[-0.102667,\,-0.0975806]$ | $[-0.102740,\,-0.0976499]$ | $[-0.102883,\,-0.0977009]$ |
| $l'$ | $[-0.0145599,\,+0.000325730]$ undecided | $[-0.0158710,\,-0.000992802]$ NEG | $[-0.0172767,\,-0.00223580]$ NEG |
| roots: unlike / like / antipode | $[5.66201,5.66717]$ / $[6.72161,6.73700]$ / $[5.47564,5.47790]$ | $[5.67071,5.67591]$ / $[6.73364,6.74916]$ / $[5.48493,5.48719]$ | $[5.67943,5.68466]$ / $[6.74560,6.76125]$ / $[5.49422,5.49648]$ |
| smallest root margin | like upper $0.0$; antipode $5.39\times10^{-4}$ | like upper $0.0$; antipode $5.43\times10^{-4}$ | like upper $0.0$; antipode $5.46\times10^{-4}$ |

**The like-root upper margin is 0.0 at all three ends** (measured). The contracted like root reaches the upper end of the recorded source range. Its containment is proved by the residual-sign check that runs before contraction, so the enclosure is sound. Its upper edge, however, is the subject's recorded bracket.

**Mechanism** (inferred from end values). As $w\to0$ the term $-2wa$ vanishes, so $l'\approx-r'$. Here $r'>0$, driven by the like-class radial term, so $l'<0$ through the path turn. Falsifier: a proved $r'\le0$ at a path-turn end.

**Second support turn** (inferred, for the review). End 557 proves $l'<0$ at a time no later than $7.436684709182828044891367$. Together with a proved positive end, this can tighten the upper end of the adjudication-12 bracket. It bears on uniqueness only through the review's own $l''$ argument.

**Compute note.** About 33 s of wall time per row under shared CPU. S5 has been proposed as two 2-row invocations: S5a = steps 540, 550 and S5b = steps 545, 555, prepared in the commands file.

## Checkpoint 7 (22:09 UTC): receval v7 and its controls (S7)

**Relayed rulings.** The PI relays that review adjudication 13 (`d4d372e8…`) admits S6. My negative $l'$ at end 557 narrows the second-support-turn bracket to $(7.1767,\,7.4367)$. Whether that turn comes before or after the path turn is decided only if $l'<0$ is proved at the end of step 556.

**v7.** [receval v7](../evidence/spherical-six-pole-path-continuation-claude-support-receval-v7.py), sha256 `b0d1462e629e634f20d67281f791de840b3fb3454590f25222cf892fd7c745a8`; [v6→v7 diff](../evidence/spherical-six-pole-path-continuation-claude-support-receval-v6-to-v7.diff), sha256 `d7de35753cfea66d12d0c6199724359c7108cd7366746e2709190bf1b9626acf`. The changes:

- E1: separate cover counts along $q$ and $w$, with the same exact cover and check.
- E2 (cost only): an `--end-only` flag.
- E3 (cost only): the contraction and lookup are computed once per $q$ piece.
- E4: diagnostics and progress output.

**Why 6×24.** $w$ enters $l'$ only through the law, chiefly through $-2wa$, so with E3 refining along $w$ costs only law evaluations. Refining along $q$ costs contractions and lookups.

**S7 run.** PID 47600, 22:08:04–22:08:23 UTC, exit 0. Wall 19.48 s, user 9.21 s, peak RSS 103,186,432 bytes. All controls pass, including V1–V4 at 6×24.

**Census incident.** The first census at 22:07:51 still used the pre-broadening class rule, so it held the launch (correctly, under that rule). After I rewrote the census script to the broadened classes, the launch proceeded. No foreign process was touched.

**S8 (end 556, 6×24, end instant only).** Requested and held for the review's ruling on the v7 diff. Estimated cost is about 16 s user, which is 35–50 s of wall time under the present load.

## Checkpoint 8 (22:15 UTC): S8, the sign of l at the end of step 556

**S8 run.** PID 51939, 22:14:20–22:14:51 UTC, exit 0. Wall 31.08 s against 11.78 s of user CPU; peak RSS 103,186,432 bytes. All controls pass.

**Result (measured; instrument receval v7 at 6×24, end instant only; records r1–r5 and P1–P3).** At the end of step 556,

$$l'\in[-0.01355014336812795473966846,\,-0.0006660723481990931065796207],$$

so $l'$ is NEGATIVE there. The cover check passed. At 3×3 (S6) the same enclosure was undecided, $[-0.01456,\,+0.000326]$.

**Where the bound is tight.** The upper end of the enclosure comes from the top corner piece, $(q,w)$ piece $(5,23)$. Across the six $q$ pieces the upper ends are $-0.000863$, $-0.000824$, $-0.000784$, $-0.000744$, $-0.000707$, $-0.000666$.

**End account.**

- $a\in[-0.403582,\,-0.381199]$ and $-2wa\in[0.000420,\,0.006002]$, so $-2wa>0$.
- $r'\in[0.0052296,\,0.0155527]$, also positive.
- $r\in[0.0977517,\,0.102432]$ and $l\in[-0.102487,\,-0.0977520]$.
- Tangent parts: unlike $[-0.018761,\,-0.018497]$, like $[-0.390407,\,-0.367979]$, antipode $[0.0053704,\,0.0054925]$.
- Radial parts: unlike $[-0.049588,\,-0.049438]$, like $[0.171171,\,0.175664]$, antipode $[-0.023831,\,-0.023794]$.

**Reading (inferred; the review rules on it).**

- At the end of step 556, $w>0$ is proved (its lower end is $0.000551$) and $l'<0$ is proved.
- The second support turn, a maximum of $l$, therefore lies before that instant. The path turn lies after it, with $t\ge7.426684593623649597167959$.
- So the maximum of $l$ comes strictly before the path turn.
- Falsifiers: a v7 enclosure that misses the true $l'$; a P-slice record that does not contain the true state.

**Mechanism (inferred).** Near the turn, $l'=-2wa-r'$. The term $-2wa$, at most $0.0060$, nearly balances $r'$, at least $0.0052$, only at the corner where $w$ is largest. That is why refining along $w$ decided the sign.

## Final report (written 22:22:30 UTC; closed for compute by the PI after S8)

### Review rulings cited (by sha256; the review owns each ruling)

| adjudication | subject | sha256 |
| --- | --- | --- |
| 1 | design of receval v5 (cover repair; C2 admitted) | `94503261c0a936df1a2fad050d126f46c86e5ff254088ed5fe0f97df4581ca4a` |
| 3 | Q3: v5 results at ends 412 and 431; the history-reading premise (unpadded `nstr` fields) | `be70260978af90e8cf3ef033a8f1cbcef6d2218e44b3b3f2c288efc35322819b` |
| 5 | design of receval v6 (padded reading) | `7018a0610bb3d9b07debb3b4baf24584f16d79c061a26b3bbb06c94d2ac164e0` |
| 7 | Q3 ruling: narrower first-support-turn bracket CERTIFIED (padded form) | `05a0a8101cf6ebdb64f8ee5f4fa2c9fdb58e7ccf33a0bb7c98444bcc7d63e640` |
| 13 | S6 account at 556–558; narrower second-turn bracket; how to decide the order | `d4d372e8b5cd9ff078df9be2efb8b639a3b7bf3596fe4c67594e42aecd9dff17` |
| 14 | design of receval v7 (E3 included); the zero like-root margin | `a3ad44948e3eacae40686726c87de2384800c8eca99817bb496c6df5154a22d9` |

**Numbering correction.** In checkpoint 2 I attributed the padding ruling to "adjudication 2", as it was relayed. By the file titles, adjudication 2 concerns the continuation's root bracket, and the padding ruling is adjudication 3.

### Phase A: Q3, the narrower first-support-turn bracket

- **Derived.** v5's end-instant cover provably equals the end box.
  - The first and last edges are the box endpoints, and each internal edge is shared by the two pieces either side of it.
  - `cover_ok` holds, and by the lemma in the [controls specification](spherical-six-pole-path-continuation-claude-support-receval-v5-controls-spec.md) the union of the pieces equals the box.
  - The end time is not subdivided, and the root contraction is not a subdivision.
  - v6 adds an outward read of every stored decimal with a $10^{-23}$ pad. This covers inward `nstr(·,25)` rounding up to $5\times10^{-25}$ for magnitudes below 100; larger magnitudes are refused.
- **Measured: v4's sliver.** Exact rational checks in S2 show that v4's edge formula reached $\overline{x}$ on all eight real boxes, so adjudication 14's sliver did not occur at 412 or 431. v4's nearest reading of the end strings did fall inside the decimal box at 412 $w$ and at 431 $q$ and $w$, by at most one binary rounding unit.
- **Measured: S4.** Instrument receval v6; records r1–r5 with the frozen∩reconstructed lookup; end instants only.
  - End 412: $l'\in[-0.002491758633779073118147904,\,-0.0000898977924673585056839101]$, negative.
  - End 431: $l'\in[0.00008760459953429698858073472,\,0.003285263991316478499488237]$, positive.
- **Ruling (review, adjudication 7).** The bracket $(5.986684593623649597167959,\,6.176684709182828044891367)$ is certified, i.e. $T\in(59.86684593623649597167959,\,61.76684709182828044891367)$.

### Phase B: the account at the path-turn ends

**Measured.** S6 (v6, 3×3) and S8 (v7, 6×24); records r1–r5 and P1–P3; end instants only. Checkpoints 6 and 8 give the full class tables.

| end | $w$ | $l'$ | sign |
| --- | --- | --- | --- |
| 556 (S6, 3×3) | $[0.000551,\,0.007436]$ | $[-0.0145599,\,+0.000325730]$ | undecided |
| 556 (S8, 6×24) | same box | $[-0.01355014336812795473966846,\,-0.0006660723481990931065796207]$ | NEG |
| 557 (S6) | $[-0.003433,\,0.003555]$ | $[-0.0158710,\,-0.000992802]$ | NEG |
| 558 (S6) | $[-0.007438,\,-0.000344]$ | $[-0.0172767,\,-0.00223580]$ | NEG |

At all three ends $r'>0$, $l<0$, and the like class dominates both the tangent and the radial account.

**Inferred (for the review).** $l'<0$ is proved at the end of step 556, where $w>0$ is also proved. So the second support turn, a maximum of $l$, comes strictly before the path turn. The path turn was certified in adjudication 11; the existence of the second turn was certified in adjudication 12, with its uniqueness still open.

**Mechanism (inferred).** As $w\to0$ the term $-2wa$ vanishes, so $l'\approx-r'$, and $r'>0$ is driven by the like-class radial term. Falsifier: a proved $r'\le0$ at a path-turn end.

### Class account at 412 and 431 (v5 S2; v6 agrees to 7 digits)

This is the table in checkpoint 2. At 412, $l=[-0.11189,\,-0.11032]$ and $r=[0.015131,\,0.015791]$. At 431, $l=[-0.11195,\,-0.11019]$ and $r=[0.025931,\,0.026777]$.

### Incidents (none with values affected)

1. **Blocked launches (correct).** S2 was held twice, at 21:09:24 (PID 91373, `ccor_implicit2.py`, then outside the named set) and at 21:10:39 (PID 91812, `ccor_spike.py`, outside the then-defined class). S7 was held once, at 22:07:51 (PID 44095, then outside the class rule). Each time the PI widened the standing class and the run went ahead. No foreign process was touched.
2. **Diagnostic flag corrected.** In v6 the per-row `v4_nearest_contains_decimal_box` calls the rebound padded reader, so it reports the padded reading, not v4's. The valid measurement is S2's. This is recorded in the commands file and in checkpoint 3.
3. **Census script rewritten.** It now uses lsof for the working directory and `ps -ww` for the script resolved against that directory, applying the PI's classes (a)–(d) from 22:07:20 UTC.
4. **Load.** S6 took 104.70 s of real time (34.20 s user), close to the 110 s alarm. That is why S5 was first split and then deferred. No alarm fired in any run.
5. **Timestamp correction.** Checkpoint 4's heading was first typed as 21:40 and corrected to the clock-read 21:36. One commands-file line said "21:3x" and now cites the clock-read anchor instead.

### Proposals

- S5 is optional: ends 540–555 on v7 with `--end-only`, two rows per invocation, to bracket the maximum of $l$ from below.
- The rate of $a$ at the joins is not yet evaluated.
- The like-root upper margin of 0.0 at 556–558 could be removed by giving v7 a wider start bracket that is still containment-checked. That would make the like enclosure independent of the subject's recorded range.

### Open questions and falsifiers

- History slabs: v6 pads them, which closes the earlier open premise. The reconstructed records themselves remain the continuation's proved enclosures, and I did not re-prove them.
- Uniqueness of the second support turn is open (the review owns it).
- Falsifiers: any v6 or v7 enclosure that misses its true value; a P-slice record that does not contain the true state; a stored field of magnitude 100 or more being read (the guard refuses this).
