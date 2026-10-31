# Six-pole post-turn campaign, support role: wave-1 report (living)

*Support role (emmy-noether lens) for the Claude PI; campaign start 02:26:53 UTC 2026-10-21 (plan sha256 `b03917315cde3e9c04c4aefbdb9780b3a52029110da9961ce25a51e70c43be0a`). This session carries the path-continuation context. Times are read from `date -u`; prior states are copied to scratch before each rewrite.*

## Checkpoint 1 (02:34 UTC)

The [commands file](../evidence/spherical-six-pole-post-turn-claude-support-commands.txt) holds every grant, census and receipt.

### Q4: lower end of the second-support-turn bracket

Q4 uses receval v7, unchanged (`b0d1462e…`, admitted by path-continuation adjudication 14). Records are r1–r5 and P1–P3. Every evaluation is at the end instant only.

| run | PID | UTC | real / user | ends | cover | result |
| --- | --- | --- | --- | --- | --- | --- |
| S9 | 70638 | 02:29:00–02:29:12 | 12.10 / 11.87 s | 539, 541 | 6×24 | both $l'>0$ |
| S10 | 72238 | 02:31:18–02:31:34 | 15.62 / 15.32 s | 542, 543 | 8×48 | both undecided |

**Measured.** At end 539, $l'\in[0.00166986979778955301555477,\,0.01443636592177986056864394]$. At end 541, $l'\in[0.0003043607057881497530648731,\,0.01327100890489839669339084]$. At end 542, $l'\in[-0.0002027273902196859328855212,\,0.0123677011353463163824368]$. At end 543, $l'\in[-0.00097371,\,0.01169500]$. Every cover check passed.

**Rulings and next step.** The latest end with $l'$ proved positive is 541. Review post-turn adjudication 1 (`e91ee3cc…`, relayed) admits S9. It notes that narrowing the all-maxima bracket from below needs refined $l'>0$ at every consecutive end from 531 to 540. That is S11 (ten rows, line 39), accepted and queued.

**Incident (S10).** I evaluated the request-header line rather than the command line, and did so before the grant's earliest launch time of 02:30:42. Bash rejected the header text with a syntax error, so no Python ran and no output was written. S10 was then re-granted for line 23 and ran correctly.

### Q3 prerequisite: chart extension (geomx)

[geomx](../evidence/spherical-six-pole-post-turn-claude-support-geomx-iv.py), sha256 `8e95b77a745dc037415c194ec774fcec23e7153fcde40f1bdc6b3e3c72fe4119`, comes with a [diff from geomv](../evidence/spherical-six-pole-post-turn-claude-support-geomv-to-geomx.diff), sha256 `ef90ec0e…`. It extends the source box to $q'\in[0,1.83]$ and $w'\in[-0.20,0.45]$. The changes:

- X2: a known check on the extension strips;
- X3: swapped-sign negative controls;
- X4: a prescribed-history control whose reads reach the extension, with sign-flip and omission negatives;
- X5: an exact-edge cell cover and interval $D$ ranges.

The sizing is inferred. The like source reads post-turn history from about step 624, and $w'<-0.10$ from about step 648. G1x is requested (line 42). Nothing has run.

## Checkpoint 2 (02:37 UTC): S11, ends 531–540

**Run.** S11: PID 74616, 02:35:52–02:36:27 UTC, exit 0. Real time 34.58 s, user 34.13 s, peak RSS 103,825,408 bytes. All controls passed, and every cover check passed at 6×24.

**Result** (measured; instrument receval v7, end instant only). $l'$ is POSITIVE at every end from 531 to 540. The lower bounds are 0.005966, 0.005523, 0.005063, 0.004541, 0.004025, 0.003485, 0.002886, 0.002294, 0.001670 and 0.000985. Together with S9 (end 541), $l'>0$ is proved at every consecutive end from 531 to 541. Full enclosures are in the commands file and the S11 JSON.

**Inference (for the review).** Chaining instant-wise positivity between consecutive ends, by the review's lower lemma, would move the lower end of the all-maxima bracket to the end of step 541, $t\ge7.276684593623649597167959$. Whether that chain holds is the review's ruling.

## Checkpoint 3 (02:43 UTC): G1x, the extended chart

**Run.** G1x ran as PID 79111, 02:42:15–02:42:32 UTC, exit 0, with 16.43 s real and 16.28 s user. The launch came about 4 minutes after the grant because I was in a long foreground wait. All controls passed: K1, X2, X3, H1, W1, W3, K2, K3, W2, W4, W5, H2, K2b, W6, W7 and X4.

**Census of the extended box** (measured; instrument geomx; 65×183 cells with exact edges; interval arithmetic at 30 digits). The box is receiver $q\in[1.45,2.10]$, source $q'\in[0,1.83]$, source $w'\in[-0.20,0.45]$.

- $M<0$ on every cell, with $M\in[-1.00183,\,-0.38723]$.
- $N\in[-0.76707,\,0.08521]$, the same range as on G1; the extension strip has $N<0$.
- Chord floors: unlike 0.765367, like 0.394463, antipode 0.995142.
- $D$ ranges: unlike $[0.81856,\,1.40824]$, like $[0.54143,\,1.20381]$, antipode $[0.82652,\,1.39034]$. So $D>0$ is proved on the whole box.

**Grading.**

- Derived: the cell-cover lemma, which is the same as for the end-box cover.
- Measured: the census above, and the X2 and X4 agreements to better than $10^{-29}$.
- Inferred: that the extended box contains every read the continuation will make within the clock. The like source reaches $w'<-0.10$ from about step 648.
- Falsifier for that inference: any continuation read with $q'>1.83$ or $w'<-0.20$. The step instrument must refuse such a read.

## Checkpoint 4 (02:59 UTC): frozen-step end boxes; receval v8 (no compute)

**Rulings relayed by the PI.**

- Post-turn adjudication 5 (`1018a55d…`) admits G1x.
- The continuation's P4 (cm48) refused step 571: its affine end box and its frozen-step end box do not intersect (adjudication 9, `29649d2c…`).
- The review asks for $l'$ at ends 541 and 556, evaluated on the frozen-step end boxes alone.

**Measured (record fields read by jq).** P2 and P3 store the frozen-step end box in `corr.box_end_q/w`, separately from `end_q_str/end_v_str`. At ends 541 and 556 the intersected box equals the affine box, padded by about $10^{-23}$, and lies inside the frozen-step box. At 556 the frozen-step $w$ box is $[0.0003643778,\,0.0076188167]$; the intersected box is $[0.0005505781,\,0.0074356607]$.

**receval v8.** [receval v8](../evidence/spherical-six-pole-post-turn-claude-support-receval-v8.py), sha256 `661ac635…`, with the [v7→v8 diff](../evidence/spherical-six-pole-post-turn-claude-support-receval-v7-to-v8.diff), sha256 `51c03afe…`.

- The flag `--end-box=frozen-step` evaluates the end instant on `corr.box_end_q/w`. Everything else is as in v7.
- New control V5: a known record with a corr box selects that box. Negative case: a record without corr fields is refused.
- Requested runs: S12 (controls) and S13 (ends 541 and 556 at 8×48).

**Incident.** A shell-only wait hit the tool's 120 s timeout and was moved to the background. It finished at 02:53:57 UTC with exit 0. No Python was involved.

## Checkpoint 5 (03:03 UTC): certificates suspended; preparing re-evaluation on the rebuilt chain

**Defect (relayed by the PI; found by the continuation).** The steps10-cm v4.4 resume serializer stores every `affine_last` number as its absolute value. This affects every reconstructed record written after a slice resume: October r2–r5 and P1–P3. Those records come from intersecting with a set that was never proved to contain the true state.

**What is suspended.** All of my end-instant evaluations read that chain, so their certificates are suspended until the chain is rebuilt with a signed serializer (cm49) from the step-154 anchor. The suspended runs are:

- the path-continuation runs S2/S4 (412, 431), S6/S8 (556–558) and the Phase B rows;
- the post-turn runs S9–S11 (531–541).

**What is not affected.** The instruments themselves (the cover lemma, v5–v8 and geomx) and the G1x chart census, which reads no records.

**Prepared, not run (inferred costs at light load).** Re-evaluation templates on r1 plus the rebuilt slices:

- S14: ends 556, 541 and 557, cover 8×48, about 20–25 s;
- S15: ends 531–540, cover 6×24, about 35 s;
- S16: ends 412 and 431, cover 6×24, about 15 s.

**Join checker.** joincheck2, sha256 `4ae355a8…`, adds one tolerance: a single trailing refused step. It was validated before use. The known joins r1→r2 and r4→r5 pass. Four negative cases fail as they should: a mid-step left uncertified, a removed step, the wrong order, and a start $w$ with its sign flipped.

S12 and S13 are cancelled; receval v8 is kept and has never been run.

## Checkpoint 6 (03:21 UTC): commands for the rebuilt chain (held)

**Input chain.** The rebuilt chain is cm49 R1′…R6′, starting at step 155 from the anchor, with no old r1 (PI, 03:21). The review has accepted R1′–R3′, which cover steps 155–385.

**Join checks (measured with joincheck2).** R1′→R2′ passes after step 220, with 75 entries. R2′→R3′ passes after step 295, with 90 entries. The sha256 prefixes are `f81012da…`, `93eb668c…` and `034afdb7…`.

**Prepared commands** (in the commands file; held until R6′ and the review's path-turn audit):

| run | ends | cover | expected user time (light load) |
| --- | --- | --- | --- |
| S14 | 531–541 and 556 (twelve rows) | 6×24 | about 40 s |
| S16 | 412 and 431 | 6×24 | — |

**Slot order.** Kept as the PI set it: R4′ → R5′ → R6′ → audit → S14 → S16.

## Checkpoint 7 (03:35 UTC): S14 on the rebuilt chain

**Inputs.** The rebuilt chain is cm49 R1′–R6′ (`f81012da…`, `93eb668c…`, `034afdb7…`, `051f2252…`, `acbafff3…`, `c1454e39…`). It was accepted by review adjudications 14 and 15, which also re-certify the path turn on it. The join check joincheck2 passed on all five joins.

**Run.** S14 ran as PID 98720 from 03:34:04 to 03:34:29 UTC, with exit code 0 and 25.08 s of real time. All controls passed. Control P1 confirmed the reconstructed chain over steps 155–570, with no skipped step and no join or meet failure.

**Result** (measured with receval v7 at 6×24, end instant only). $l'$ is POSITIVE at every end from 531 to 541; the lower ends run from 0.006085 at 531 down to 0.000436 at 541. $l'$ is NEGATIVE at the end of step 556, with enclosure $[-0.0135079,\,-0.0007099]$. At that same end $w\in[0.00042473,\,0.00756460]$, so $w>0$ is proved there.

**Restored on the rebuilt chain (inferred; the review rules).** These results restore the earlier conclusions in full:

- $l'>0$ at every end from 531 to 541;
- the maximum of $l$ comes before the path turn.

Every sign is unchanged from the suspended evaluation of the old chain, and the margins grew slightly.

## Checkpoint 8 (03:49 UTC): S16, the first support turn on the rebuilt chain

**Run.** S16 ran on the rebuilt cm49 chain R1′–R6′ as PID 1459, 03:48:18–03:48:31 UTC, exit 0, 12.99 s of real time. All controls passed, and the cover checks passed at both ends.

**Result** (measured; instrument receval v7, 6×24 cover, end instant only). These are the end-instant signs of $l'$ behind the first-support-turn bracket certified in path-continuation adjudication 7:

| end | $l'$ enclosure | sign | margin |
| --- | --- | --- | --- |
| 412 | $[-0.0023273131,\,-0.0002548773]$ | NEGATIVE | $2.55\times10^{-4}$ |
| 431 | $[0.0003031624,\,0.0030699871]$ | POSITIVE | $3.03\times10^{-4}$ |

The sign at each end is restored on the rebuilt chain.

## Final report (written 03:51:12 UTC; planned work complete; holding for the close)

### Review rulings cited (by sha256; each ruling belongs to the review)

| post-turn adjudication | subject | sha256 |
| --- | --- | --- |
| 1 | S9: what ends 539 and 541 narrow | `e91ee3cc49adb07baf488b35c542a045a68bf7c022709fe04627dba2f4a539ec` |
| 5 | G1x: extended chart ADMITTED | `1018a55da79d69ea0973fbe3afef471dee9e4127b67f6cfdd37ea62c3b4a14c2` |
| 9 | P4: step 571 refused (empty intersection) | `29649d2c1b92676c9c39457ddefbb503761e9f70de40efd713c34aca180b061f` |
| 14 | rebuilt slices R1′–R3′ ACCEPTED | `12800117ab73c09c82cd3c5f3199b076e87c122a4cd7cb0cc7b582acb2493b5e` |
| 15 | R4′–R6′ accepted; path turn RE-CERTIFIED | `342062ff2b7fe56d4730915adc969c056951d9049f3b3a1e4a574dc1da1e091e` |
| 18 | narrower first-support-turn bracket re-certified | `28cb55dccb0659d1a42425166c16bb59efcf6945d35982974885b9144d1c7005` |

### Q4 and the second support turn

- **S9–S11 (old chain).** These runs found $l'>0$ at every end from 531 to 541; S10 left 542 and 543 undecided. Their certificates were then suspended: the continuation found that the v4.4 resume serializer stores `affine_last` unsigned, so every reconstructed record written after a slice resume (October r2–r5 and P1–P3) is unproved.
- **S14 (rebuilt cm49 chain R1′–R6′; measured with receval v7 at 6×24, end instant only).**
  - $l'>0$ at every end from 531 to 541. The lower end of the enclosure falls from 0.006085 at 531 to 0.000436 at 541.
  - $l'<0$ at the end of step 556, with $l'\in[-0.0135079,\,-0.0007099]$, and $w>0$ is proved there.
  - Inferred, for the review to rule on: $l'>0$ at every consecutive end from 531 to 541, and the maximum of $l$ comes before the path turn.
- **Not decided.** Ends 542 and 543 were undecided on the old chain at 8×48 and were not re-run.

### First support turn (rebuilt chain)

S16 (measured; receval v7, 6×24) gives, on the rebuilt chain:

- $l'(412)\in[-0.0023273,\,-0.0002549]$, NEGATIVE;
- $l'(431)\in[0.0003032,\,0.0030700]$, POSITIVE.

Adjudication 18 re-certifies the narrower bracket on this evidence.

### Q3 prerequisite: chart extension

**Instrument.** [geomx](../evidence/spherical-six-pole-post-turn-claude-support-geomx-iv.py) (`8e95b77a…`) extends the chart to source $q'\in[0,1.83]$ and $w'\in[-0.20,0.45]$; the receiver chart is unchanged.

**G1x run.** Every control passed:

- K1;
- X2 and X4, agreement with vectors and with Richardson differences to below $10^{-29}$;
- X3, the swapped-sign negatives;
- every inherited geomv control.

**Census** (measured; interval arithmetic on 65×183 cells with exact edges):

- $M<0$ on every cell;
- $N$ has the same range as on G1;
- chord floors: unlike 0.765, like 0.394, antipode 0.995;
- $D>0$ is proved for every class.

The review admitted the extension (adjudication 5).

### Prepared and never run

- **receval v8** (`661ac635…`): evaluates the end instant on the frozen-step box via `--end-box=frozen-step`, with control V5. Its runs, S12 and S13, were cancelled with the chain suspension.
- **Templates** for the old-chain re-evaluation, superseded by S14 and S16.

### Incidents

1. **S10.** I evaluated the request header (line 22) instead of the command (line 23), before the 02:30:42 floor. Bash rejected it with a syntax error, so no Python ran. After a re-grant, every command was matched by its text and every floor was checked by script.
2. **G1x.** The launch came about 4 minutes after the grant, because I was in a 5-minute foreground wait. Shorter waits were used afterwards.
3. **Backgrounded wait.** A shell-only wait hit the 120 s tool timeout and was moved to the background. It finished at 02:53:57 with exit 0; no Python was involved.
4. **Stray leading spaces.** Two stray leading spaces (in geomx and v8) were caught by reading the diffs, before any run. Each file was re-hashed after the fix. An earlier, never-sent geomx diff state was replaced.
5. **Blocked launches.** No launch was blocked by the census in this campaign. The census gained class (e) at 02:45 UTC.

### Open questions and falsifiers

- Ends 542 and 543 remain undecided.
- The instant-wise chaining between consecutive ends is the review's lower lemma, not mine.
- Falsifiers: a v7 enclosure that misses the true $l'$; a rebuilt record that does not contain the true state; a continuation read outside the geomx box (the step instrument must refuse it).
