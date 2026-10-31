# Six-pole post-turn campaign, review: adjudication 11 (the serializer defect confirmed; which of my rulings depend on post-resume records; what the rebuild must show)

Written 2026-10-21 by the review role. Code and record reading only; no Python run. Extends [adjudication 10](spherical-six-pole-post-turn-claude-review-adjudication-10.md) (`9eead36a…`).

## (a) The defect: CONFIRMED (derived from the code; measured in the stored files)

- **The serializer drops the sign.** The serializer is v4.4 line 390, `ser(x) = [str(int(x.man)), int(x.exp)]`. The venv's mpmath defines `man = property(lambda self: self._mpf_[1])` (`ctx_mp_python.py` line 124). That is the unsigned mantissa, so the sign `_mpf_[0]` is lost.
- **Every saved form is all-positive.** My own `node` count finds zero negative entries in each saved `affine_last`: r1 (212 symbols), r2 (422), r5 (1016), P1 (1085), P2 (1190) and P3 (1250). P3's centre is $c_w=+0.0526$ although $w<0$.
- **What a resume restores.** The entrywise-absolute zonotope. Its hull equals the true hull whenever the centre is positive, but it is not the same set.
- **No resume is sound, including r1's file.** r1's own saved form is stripped as well. A rebuild cannot resume from any saved `affine_last`. It must start from the in-run anchor at step 154, or from a re-run that is never serialized with the old `ser`.

## (b) Which of my rulings depend on post-resume records (steps 225 and later)

**October correlated-continuation review.** I have re-read only 11–15 in this session.

| ruling | depends on post-resume records? | status |
|---|---|---|
| 11 (r1 accepted, steps 155–224) | no: r1 ran in memory from the anchor | STANDS |
| 12 (r2–r4 audits; speed maximum re-found in $(4.2467,4.2667)$; radial zero at about 5.69; whole-step $l'$ proofs 371–409) | yes: 4.25 is about step 238, inside r2 | SUSPENDED |
| 13 (r5 audit; first-support-turn certificate, broader bracket) | yes | SUSPENDED |
| 14 ($K=8$; C24 narrower bracket) | yes | SUSPENDED |
| 15 (completion; no second turn through 491) | yes | SUSPENDED |

October 1–10 are instrument and design admissions. Any event content in them must be checked against the same split; I have not re-read them here.

**This campaign's path-continuation adjudications 1–15.**

| rulings | content | status |
|---|---|---|
| 1, 2, 4, 5, 6 | designs: receval v5, cm46, cm47, receval v6, the cm471 harness | STAND |
| 3 | its values at ends 412 and 431 are on reconstructed records | values SUSPENDED; the history-premise derivation STANDS |
| 7 | Q3 narrower bracket | SUSPENDED |
| 8 | K2 admission and the endpoint-reading rule | STAND |
| 8 | step-492 values | SUSPENDED |
| 9, 10, 11 | P1–P3 acceptance; path turn; radial maximum | SUSPENDED |
| 12–15 | second support turn, its brackets and its order | SUSPENDED |
| 14 | the receval v7 design and the zero-margin soundness | STAND |

**This campaign's post-turn adjudications.**

| ruling | content | status |
|---|---|---|
| reference | | STANDS |
| 1 | S9 values | SUSPENDED |
| 2 | Q4 bracket | SUSPENDED |
| 2 | geomx design | STANDS |
| 3 | cm48 design | STANDS as a design; its slices must now come from cm49 |
| 4 | ddl-jet design | STANDS |
| 5 | G1x chart; pure geometry | STANDS |
| 6 | Kc48 as a controls record | STANDS |
| 7 | J1 as a controls record (its C4 values at 540 are consistency only) | STANDS |
| 8 | Q2, second support turn unique | SUSPENDED |
| 9 | superseded by 10 for the cause; its §3 back-up argument is withdrawn, because both enclosures start from intersected ends | — |

**What remains sound evidence about the motion.** The frozen accepted records through step 436 (box chain, no affine form), r1 (155–224), and every geometric or instrument-level result.

## (c) What the rebuild and re-audit must show, by event (priority order)

**0. Instrument cm49.** It must carry:
- a sign-preserving serializer with an exact deserializer;
- controls first:
  - an exact round trip of a form with a negative centre and mixed-sign coefficients;
  - the OLD `ser` failing that round trip (a negative control);
  - a KNOWN resume case: $n$ steps uninterrupted give the same strings as $n$ steps split by save and resume;
  - every inherited control, including B9.
- the rebuild from the step-154 anchor in memory through 570, in slices with signed resumes.

Each slice is audited (audit10). The frozen-record meet through 436 is consistency only.

**1. Path turn.**
- (i) $w>0$ at every instant from release to some proved-positive end $k$. Up to 436 the frozen accepted records may supply this if their whole-step $w$ boxes are positive; that needs checking. After 436, use whole-step $a<0$ with $w(t_k)>0$ on the new chain.
- (ii) $w<0$ proved at a later certified end $m$.
- (iii) $a<0$ on every whole step $k+1,\dots,m$.
- (iv) The padded bracket. My own end evaluations on the new chain are required.

**2. Second support turn.**
- (i) Refined end signs on the new chain: positive at an end near 541, negative at an end near 556 (support v7, end-only).
- (ii) ddl-jet $l''<0$ on every whole step across the bracket, rerun on the new chain.
- (iii) $l'>0$ at every instant from the first support turn to the bracket start: my ddl10 rows plus refined ends on the new chain, with the lemma.

**3. First support turn and the narrower bracket.**
- (i) The negative side: $l'<0$ at every instant from 275 to the 409 end. Wherever this rested on reconstructed records, re-derive it on the new chain or on the frozen records alone.
- (ii) End signs at 409/412 (negative) and 431/437 (positive) on the new chain: my audit and the support's v6/v7.
- (iii) $l''>0$ on every whole step 374–437: my ddl10 on the new chain.
- (iv) The padded brackets.

Each certificate is re-derived from its own evidence on the new chain, never carried over from the suspended records. If the new chain reproduces the old strings exactly (falsifier of adjudication 10), the old rulings can be reinstated by citation.

**Cost (inferred).** 416 steps at about 1.5–2 s per step. That is 10–12 invocations with 90 s gaps, about 35–45 min, before re-audits. Within the clock (stop 04:41:53 UTC) the path turn is reachable; the support turns probably only in part.
