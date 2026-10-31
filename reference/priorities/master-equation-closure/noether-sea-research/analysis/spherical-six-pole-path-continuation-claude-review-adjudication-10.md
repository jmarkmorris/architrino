# Six-pole path continuation, review: adjudication 10 (slice P2, steps 516–550: ACCEPTED; no event yet; how a second support turn becomes certifiable)

Written 2026-10-20 by the review role, after my granted invocation G2.

**Subject.** [P2](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.json), sha256 `08683e84f29af2578e0dc1f6203f607968ac8ca304be6da924e9128581d04e96`, from cm471. It holds 35 steps, 516–550, all certified; stop reason "plan exhausted".

**My run (G2).** audit10 (`b2b90c7a…`, unchanged; 66 of 66 controls passed first). PID 16070, from 21:37:09 to 21:37:22 UTC, exit 0, 12.42 s wall, peak RSS 90,750,976 B. The census before the run found only standing-class foreign processes: 9251 and 99079 (class a), and 12278 (class b).

| output | sha256 |
|---|---|
| [json](../evidence/spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.md) | `99e5b87329c171760bc5d9d3d65cf255528caa2bbf0240fa2c4137f1f132e733` |
| [consistency](../evidence/spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.md) | `14c8e3aa33123fbe82ec4b479c527c334f1cec3b7268b3d9d0df7ac0dea5395c` |
| [out](../evidence/spherical-six-pole-path-continuation-claude-review-audit10-G2-P2.out) | `9a3fcae740826edceaf6476487df5620346aee1dad20964cdaa8376012d179af` |
| out.time | `cc661e314029f31d7f0880fe8e7d951dbc9faa221ce3d8f612f399096e7a92f5` |

## 1. Audit (measured)

- **Steps.** All 35 steps are OK: appended through the checked path, 0 fails, 0 sign disagreements. My delay roots meet the subject's at every end. Frozen consistency is 282 of 282.
- **End signs.** $w>0$ at every end; at 550, $w\in[0.0239806,\,0.0302924]$. $a<0$ at every end, both in my own evaluation and as the whole-step sign on both readings, on every step 516–550.
- **$l'$ at the ends (my own evaluation).** POSITIVE at every end 516–533. The 533 end gives $[+0.0000629,\,+0.0219373]$. It is UNDECIDED at every end 534–550. The subject's own $l'$ is undecided from 531. $l''$ at $K=1$ is undecided throughout.
- **No events taken from audit10's summaries.**

**Domain.** Receiver $q\in[1.7799,\,1.8165]$; source $q'\in[1.2275,\,1.7190]$; source $w'\in[0.2221,\,0.3662]$; $D_t\ge0.7616$. All of this lies inside the G1 chart. The source-$q'$ margin to 1.80 is now $0.081$ (like class).

## 2. Tracking (my own end evaluation, dimensionless)

| end | $w$ | $a$ | $r$ | $-2wa$ | $r'$ | $l'$ |
|---|---|---|---|---|---|---|
| 516 | $[0.13829,0.14122]$ | $[-0.28770,-0.27282]$ | $[0.08183,0.08548]$ | $[0.07546,0.08126]$ | $[0.05720,0.06973]$ | $[+0.00573,+0.02405]$ |
| 533 | $[0.08565,0.08976]$ | $[-0.34367,-0.32084]$ | $[0.09080,0.09560]$ | $[0.05496,0.06170]$ | $[0.03976,0.05490]$ | $[+0.0000629,+0.02194]$ |
| 550 | $[0.02398,0.03029]$ | $[-0.39534,-0.36308]$ | $[0.09619,0.10212]$ | $[0.01741,0.02395]$ | $[0.01326,0.02964]$ | $[-0.01223,+0.01069]$ |

**Widths at 550.** $q$: $6.49\times10^{-3}$. $w$: $6.31\times10^{-3}$. The $l'$ enclosure is about 0.023 wide, mostly from $r'$ (about 0.016).

**Physical values at 550.** $T\approx73.667$; $w$ is in wake-speed units; $a/10\approx-0.038$; $l'/100\in[-1.2\times10^{-4},+1.1\times10^{-4}]$.

## 3. Rulings

- **P2 ACCEPTED** through the 550 end, $t\le7.366684709182828044891357$.
- **No path turn through the 550 end.** $w>0$ at every instant: $a<0$ on every whole step 493–550 and $w(t_{550})>0$.
- **Path-turn outlook (inferred).** $w$ falls about $0.0038$–$0.0039$ per step, so $w$ crosses zero about 6–8 steps after 550, near step 556–558.
- **Second support turn: not yet decided.** The ends straddle zero from 534, so no negative end value of $l'$ exists yet.

## 4. Is a second support turn certifiable? Yes, by a bounded route (derived)

**(i) The negative side comes free after the path turn.** $l'=-2wa-r'$. Once $w<0$ is proved at a certified end with $a<0$, the term $-2wa=-2|w||a|$ is NEGATIVE. If $r'>0$ is also proved there, then $l'<0$ is proved there with no subtraction to decide. At 550, $r'\ge0.0133$ and is falling about $0.0017$ per step, so $r'>0$ should still be provable a few steps past the turn (inferred). So the first proved-$w<0$ end $m$ supplies $l'(t_m)<0$, provided $\underline{r'}>0$ there.

**(ii) Positive side.** $l'(t_{533})>0$ is proved (my end evaluation, margin $6.3\times10^{-5}$). The subject's ends through 530 agree.

**(iii) Uniqueness and strictness.** These need $l''<0$ on EVERY whole step from 534 to $m$. The October ddl10 lemma (refined $l''$ on $K$ sub-intervals) supplies it if the hulls exclude zero. The rough centre is $l''=-2a^2-2w\dot a-r''\approx-0.25+0.17\approx-0.07$, against October hull widths of about 0.03 at $K=4$ (inferred). This is likely decidable at $K=4$, with $K=8$ for any undecided step.

**(iv) Every instant from the 437 end to the 533 end.** Either:
- $l''<0$ on whole steps from some $k_0$ to 533, with a proved positive $l'(t_{k_0})$, together with the October-style lower-bound lemma $l'\ge A+\min(L,0)\Delta$ on 492 to $k_0$, from the same ddl10 records; or
- the lemma on every step 492–533.

The lemma's margin thins near 531–533. That is why (iii) should start at about 520.

**Certificate shape.** SECOND SIGNED-SUPPORT TURN, a strict local MAXIMUM of $l$ (a minimum of the inward magnitude, with $l<0$), unique in $(\underline t^{\,e}_{533},\,\overline t^{\,e}_{m})$. It would lie BEFORE the path turn only if the bracket ends before the first proved-$w<0$ end. Otherwise the order between the two events is not decided by this route. The rough centres put $l'=0$ near step 549 and $w=0$ near 557 (inferred).

**Exact band and cost.** One ddl10 run (`67a82d34…`, unchanged), $K=4$, on steps 492 to $m$ (about 70 steps), with `--own` r1–r5, P1, P2 and P3. October ddl10 cost about 0.9 s per step at $K=4$ (C23: 82 steps in 73 s). So about 65–75 s, within one 110 s invocation; I would split it as 492–530 and 531–$m$ if needed. One possible $K=8$ rerun on undecided steps costs about 10–20 s. Nothing runs until P3 exists and a grant names it.

**Falsifiers.**
- A proved $l'\le0$ at any instant before the 533 end.
- A proved $l''\ge0$ on part of 534–$m$, which would block uniqueness, not existence.
- $\underline{r'}\le0$ at the first proved-$w<0$ end, which would remove the free negative side.
