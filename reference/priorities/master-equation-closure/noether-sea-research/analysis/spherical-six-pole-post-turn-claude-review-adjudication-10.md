# Six-pole post-turn campaign, review: adjudication 10 (CAUSE of the step-571 contradiction: the affine resume drops every sign; scope reaches back to step 225)

Written 2026-10-21 by the review role. Record and code reading only; no Python run.

## 1. The diagnostic D1 (measured)

**Subject.** [D1](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.json), sha256 `2cb2993f5fe91aaf1f4d99749d58d422ae88f9f24252ad6d56d593d9e312467a`, from diag571 v2 (`133bef1f…`, built on the frozen cm48), 27.36 s. Inherited controls pass.

- **(A) Known case.** Step 551, resumed from P2, reproduces P3's recorded corr and end strings EXACTLY: `KNOWN_OK` true. This shows only that the code is deterministic; P3 was produced by the same resume path.
- **(B) Resume check at 570.** The hull of the restored affine form gives $w\in[+0.0483209,\,+0.0568535]$. The restored end strings give $w\in[-0.0568535,\,-0.0483209]$. Same magnitudes, OPPOSITE SIGN: `F_hull_inside_end_w` is false. The symbol tags and $t_0$ are correct.
- **(C) Step 571.**
  - Frozen box: $w\in[-0.06128,-0.05219]$.
  - Affine, integral remainder: $w\in[+0.04410,+0.05280]$.
  - $w$ is disjoint, with a gap of 0.0963; $q$ meets.

## 2. Cause (derived from code and records)

**The serializer drops the sign.** The v4.4 serializer is `ser(x) = [str(int(x.man)), int(x.exp)]` (line 390). Its inverse is `deser` (line 391). In the shared venv's mpmath (`ctx_mp_python.py` line 124), `man = property(lambda self: self._mpf_[1])`. That is the UNSIGNED mantissa; the sign is `_mpf_[0]`, which `ser` never stores.

**Measured confirmation.** Every saved `affine_last` holds no negative number at all, centre or coefficient:

| record | symbols | with a negative coefficient |
|---|---|---|
| r1 | 212 | 0 |
| r2 | 422 | 0 |
| r5 | 1016 | 0 |
| P1 | 1085 | 0 |
| P2 | 1190 | 0 |
| P3 | 1250 | 0 |

This is although the step map creates negative coefficients (through $A'<0$). P3's centre $c_w=+0.05259$ while $w<0$.

**What a resume does.** It restores $\hat c+\sum_i|M_i|\xi_i$ instead of $\hat c+\sum_iM_i\xi_i$. Here $|M_i|$ is taken entrywise and $\hat c$ is the absolute centre.

- Before the turn, the centres were positive, so only the coefficient signs were lost.
- The hull ($\hat c\pm\sum|M|$) is unchanged at the resume instant whenever the centre is positive. That is why nothing failed visibly.
- But the SET is different. Flipping the sign of one entry of a two-entry column changes the parallelotope, which then need not contain the true state.
- Propagating the wrong set gives affine ends that need not contain the truth.
- Each certified end is the INTERSECTION of that affine hull with the frozen-step box. The frozen-step box itself starts from the previous certified (intersected) end. So the whole chain after a resume is no longer PROVED to contain the true motion.

**It is not cm48-specific and not a post-turn premise.** At 571 the centre sign flip turned a silent defect into an empty intersection. cm48's box change is cleared by (A) and (C).

## 3. Scope (derived)

| span | status |
|---|---|
| steps 155–224 (r1) | sound: run in memory from the in-run anchor form, with no resume |
| steps 225–570 (r2–r5 in October; P1, P2, P3 here) | not proved: each run starts from a sign-stripped form |

The second group includes every result that rests on reconstructed boxes after step 224:
- the October first-support-turn certificate, in both of its brackets (October adjudications 13–15, and this campaign's path-continuation adjudication 7);
- the path turn, together with its "each enclosure alone" back-up in my adjudication 9 §3. That back-up does NOT rescue it, because the frozen boxes also start from intersected ends;
- the second support turn (adjudication 8), the canonical radial maximum and the Q4 brackets.

The frozen accepted records of the earlier turning-point campaign, steps 275–436, which were built by box steps without an affine form, are NOT affected.

The reconstructed ends met those frozen records at every step through 436. That is consistency with an independent chain, not a proof of containment.

**Every event ruling resting on steps 225–570 is SUSPENDED** until the chain is recomputed with a sign-preserving resume. That covers my path-continuation adjudications 7, 9–15 and post-turn adjudications 1, 2 and 8. The ruling texts are not edited.

This is a falsifier listed in those adjudications ("a reconstructed record not containing the true state") becoming live as a possibility, not a proof that any event is wrong (inferred).

## 4. Remedy (proposal)

1. A NEW step version (cm49) whose serializer keeps the sign, e.g. `[str(int(x.man)) with x._mpf_[0] applied, int(x.exp)]` or `mp.nstr(x, 50)`, with a matching deserializer. Controls first:
   - a round-trip of a form with negative centre and negative coefficients, exactly equal;
   - a negative: the old `ser` fails the round-trip;
   - a KNOWN resume case: $n$ steps run uninterrupted versus the same $n$ steps split by a save-and-resume give identical strings.
2. Recompute the chain from the last sound state, the in-run r1 end at 224 (or from the 154 anchor), through 570 under cm49, in slices. That is 346 steps at about 1.5–2 s per step, so about 7–9 invocations (inferred from the measured 45 s for 20-step slices).
3. Re-audit the new slices, then re-derive the events in order of dependence: the path turn ($w$ signs at 556 and 558, $a<0$ whole-step), then the first support turn and the Q3 brackets, then the second support turn.

Within the clock (stop 04:41:53 UTC) step 2 may be feasible, and step 3 only partly (inferred).

## 5. Ruling

**The cause of the P4 contradiction is identified (derived): the v4.4 affine serializer drops signs.** Q3 continuation is blocked. All certificates resting on reconstructed steps 225–570 are SUSPENDED pending a sign-preserving recomputation.

**Falsifiers.**
- An mpmath whose `man` is signed in the venv actually used. The source line above says it is not.
- A saved `affine_last` holding a negative entry.
- A cm49 recomputation reproducing the old strings exactly. That would mean the lost signs had no effect, which is possible only if no column ever had mixed signs.
