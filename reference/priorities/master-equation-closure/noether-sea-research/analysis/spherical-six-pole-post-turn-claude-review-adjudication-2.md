# Six-pole post-turn campaign, review: adjudication 2 (Q4: lower end of the second-support-turn bracket moved to the 539 end; design of the chart extension geomx)

Written 2026-10-21 by the review role. No Python was run for this adjudication; GP1 below is my granted run, already receipted to the PI. Rules against my [post-turn reference](spherical-six-pole-post-turn-claude-review-reference.md) (`09e6130e…`).

## 1. Inputs (measured)

**S11.** The support's refined end evaluations, [S11](../evidence/spherical-six-pole-post-turn-claude-support-S11-receval-v7-ends-531-540-6x24.json), sha256 `8108121c413a92283b91c97ba061917c50fbed19bf0c3ae76110c0487f0f08b4`. Instrument: receval v7 at a 6×24 cover, end-only. All 17 controls passed before the targets. Wall time 34.58 s, peak RSS 103,825,408 B.

Lower bounds of $l'$ at each end (all ten ends are POSITIVE):

| end | 531 | 532 | 533 | 534 | 535 | 536 | 537 | 538 | 539 | 540 |
|---|---|---|---|---|---|---|---|---|---|---|
| lower $l'$ | 0.005966 | 0.005523 | 0.005063 | 0.004541 | 0.004025 | 0.003485 | 0.002886 | 0.002294 | 0.001670 | 0.000985 |

**My ddl10 rows ($K=4$).** These give the lower bound $L_k$ of $l''$ on each whole step:
- G4b′ ([path-continuation adjudication 12](spherical-six-pole-path-continuation-claude-review-adjudication-12.md)): $L_{532}=-0.13826$, $L_{533}=-0.14234$.
- GP1 ([band record](../evidence/spherical-six-pole-post-turn-claude-review-ddl10-GP1-534-541.json.ddl10.json), sha256 `3564273e3a53596b3b61e2ed6c4e7802eff4320fcc0dbc15f7839cf5f3fc6bdd`; PID 73596; 19.24 s; all controls passed): $L_{534..541}=-0.14580,\,-0.15001,\,-0.15430,\,-0.15782,\,-0.16204,\,-0.16638,\,-0.16990,\,-0.17417$.

## 2. Instant-wise positivity (derived)

The lemma is $l'(t)\ge A_{k-1}+\min(L_k,0)\Delta$ on step $k$, with $\Delta=0.01$. Here $A_{k-1}$ is S11's refined lower bound at the previous end and $L_k$ is my bound on the step.

| step | 532 | 533 | 534 | 535 | 536 | 537 | 538 | 539 | 540 |
|---|---|---|---|---|---|---|---|---|---|
| margin | 0.004583 | 0.004099 | 0.003605 | 0.003041 | 0.002482 | 0.001907 | 0.001266 | 0.000630 | $-0.000029$ |

The chain fails at 540. With [path-continuation adjudication 12](spherical-six-pole-path-continuation-claude-review-adjudication-12.md) for 437–531, this gives $l'>0$ at EVERY instant from the step-437 end to the step-539 end, i.e. $t\le7.256684709182828044891357$.

**Grade.** Derived from measured enclosures. The end values come from the support's v7 (cross-code). The $l''$ bounds come from my ddl10.

## 3. Q4 ruling: the bracket is narrowed

**All-maxima bracket.** Every local maximum of $l$ after the first support turn, up to the 556 end, lies in

$$(7.256684593623649597167959,\ 7.426684709182828044891367),\qquad T\in(72.5668459,\,74.2668471),$$

and at least one exists. This replaces the lower end 7.1767 (adjudication 15 of the path-continuation campaign) with the 539 end. The bracket still lies strictly before the path turn.

**Not yet tight.** The chain missed step 540 by only $2.9\times10^{-5}$. Either of two single runs would plausibly carry it through 540 (inferred):
- a finer cover at end 539 (for example 8×48), giving a higher $A_{539}$;
- $K=8$ on step 540, giving a less negative $L_{540}$.

Going past 541 is not possible on present values: $A_{540}=0.000985$ is below $|L_{541}|\Delta=0.00174$.

## 4. Design of the chart extension geomx (against my reference section 1)

**Subjects.**
- [geomx](../evidence/spherical-six-pole-post-turn-claude-support-geomx-iv.py), sha256 `8e95b77a745dc037415c194ec774fcec23e7153fcde40f1bdc6b3e3c72fe4119`.
- [geomv → geomx diff](../evidence/spherical-six-pole-post-turn-claude-support-geomv-to-geomx.diff), sha256 `ef90ec0edf358916b39475e59b0f88e8ccf2d3fc21c71e17f87559257a1ad1a8`. I read it in full. The base is the frozen geomv `1b0077c0…`.

**Box.** Receiver $[1.45,2.10]$ (unchanged); source $q'\in[0,1.83]$; source $w'\in[-0.20,0.45]$; antipode difference $d\in[-0.38,2.10]$. This covers my sizing in reference 1.2: $q'\le q(t_\star)\le1.817731$ plus a pad, and $w'$ down to $-0.20$ for the like source after about step 648.

| reference item | geomx | verdict |
|---|---|---|
| 1.3(a) $M$ sign per cell | inherited geomv target census ($M$ counts per cell) on 65×183 cells | met if the record shows $M<0$ on every cell, or lists the exceptions |
| 1.3(b) $N$ sign map | inherited census ($N$ positive, negative or undecided) | met when reported |
| 1.3(c) chord floors | inherited per-class floors | met when reported and positive; the like floor in the far corner is about 0.41 by my hand estimate at $q=2.10$, $q'=1.83$ |
| 1.3(d) transmitter factors | NEW interval-arithmetic $D$ ranges per class, with a proved-positivity flag | met |
| 1.3(e) root uniqueness | global, from sub-wake motion | no census needed |
| 1.4 direct-vector known case | X2: 300 points on the two extension strips, both code paths, three classes, sign of the tangent hit equal to the sign of $N$ | met; stronger than one point |
| 1.4 $q=\pi/2$ oracle and K1 | inherited geomv controls K1…W7 retained | met if they pass |
| 1.4 sign-flip and class-label negatives | X3 at $(1.70,1.82,-0.15)$: velocity flip, class swap, receiver and source exchanged | met |
| 1.4 prescribed turning history | X4: $q(s)=1.46+0.36\sin(0.5(s-2))$, peaking at 1.82, at times reading $q'>1.80$ and like $w'<-0.10$, against Richardson differences, with flip and omission negatives | met (consistency only, as labelled) |
| 1.4 census coverage | X5: box read outward; exact first and last edges; shared internal edges; strict monotonicity asserted | met |
| 1.4 old box refuses, new box accepts | not in geomx: this belongs to the STEP instrument's `BOX` | must appear in cm48's controls |

**Ruling: geomx DESIGN ADMITTED.** A G1x record is admitted promptly if it shows all of the following:
- (i) every inherited and new control passing before the census;
- (ii) $M<0$ on all $65\times183$ cells, or the exceptions listed;
- (iii) positive chord floors per class;
- (iv) `D_all_positive_proved` true;
- (v) the $N$ map reported.

The chart then extends the qualified domain to $q'\le1.83$ and $w'\ge-0.20$. That holds for certificates which use only these properties, and only through the step's `in_box` refusals.

**Falsifiers.**
- A G1x cell with $M\ge0$ that is not listed.
- A step whose recorded source boxes leave the extended box without refusing.
- A proved $q'>q(t_\star)$ while $w<0$.
