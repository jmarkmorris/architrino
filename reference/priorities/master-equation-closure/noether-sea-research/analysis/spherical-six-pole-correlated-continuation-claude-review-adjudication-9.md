# Six-pole correlated continuation review: adjudication 9 (the continuation's C15 controls record and C16 matched comparison; admission of the reconstruction slices)

Written 2026-10-14T12:34:57Z by the review role. No code was run.

**Read.**
- The C15 record [steps10-cm-v44-C15-controls.json](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C15-controls.json), sha256 a4bd7cde8d42ef52714c48b44172d35385c0be74b0f98fe6de238e955c5af1b5 (.out 0cf148df…, .out.time ab42e68c…).
- The C16 record [steps10-cm-v44-C16-compare.json](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C16-compare.json), sha256 36c21032c63f599658dc79ed2a297658341658e4837f81ff579a5aa8e7354956 (.out 9d8803c0…, .out.time d494b059…).
- The continuation's receipt: C15 PID 50933, 12:28:32 to 12:28:59 UTC, exit 0; C16 PID 51976, 12:31:00 to 12:31:58 UTC, exit 0.
- The script [steps10-cm.py](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm.py), sha256 1bcc8a279934bc77b83e164ee4e7e8499d5fb44c173395b8178802fbd31e0540: compare and recon modes, lines 330 to 443.

## 1. C15 meets the admission rule of adjudications 5 and 7 (measured)

- **Script hash.** The grant names 1bcc8a27…, and the file on disk has that hash. Its modification time (12:26 UTC) precedes both runs. The records do not embed the script hash, so the identity of the bytes run is inferred from the grant, the hash now and the modification time. I recommend writing the script hash into every output.
- **Controls.** 60 of 60 pass, with exit 0.
- **E16.** All four results as expected: the relaxed false positive at $(3,-3)$; certified outside at $(3,-3)$; inside at $(2.5,2.5)$; outside at $(3.5,3.5)$.
- **E17.** All eight results as expected, including the near-boundary case left undecided.
- **E2, E3 (two-symbol inside, tied excluded), E4 (interior points) and N-R (full set contains the truth, dropped set excludes it):** all witnessed by the certified test.

C15 ADMITS the matched comparison.

## 2. C16: the inputs are matched (derived from the code; measured in the record)

- Both chains start from the same anchor: step 154, like-reception s3b, $t_0 \in [3.406684593623649597167969,\ 3.406684709182828044891357]$, $q$ width $3.34386\times10^{-4}$, $w$ width $8.904\times10^{-4}$.
- Both read the same history: the reader is truncated to the 204 records through the anchor.
- Compare mode appends nothing to the reader, so neither chain sees a frozen or reconstructed record after 154. Every delayed read closed inside the step-154 guaranteed coverage; otherwise the frozen step check would have refused.
- Both use the same law, the same $t_0$ and $\Delta$, and the same frozen step instrument.
- "Old" is the frozen step on the old boxes. "New" is the same frozen step on the new boxes, intersected with the affine end.

## 3. Every narrowing is proved (derived)

At each step the new end is the intersection of two sets:
- the hull of the affine set, a proved enclosure by my inclusion theorem (reference 1.1 to 1.9), with the design admitted in adjudication 3, the shared-column repair in adjudication 5 and the controls in C15;
- the frozen step's end on the proved new start box.

Both enclose the same true state at the same instant, so the intersection is valid. It is padded outward and becomes the next proved start box, while the affine form continues. The induction is that of adjudication 3. Nothing else narrows: no frozen record after the anchor is used to narrow. The meets in section 4 are checks only.

## 4. The gain on matched inputs is real (measured)

Widths at step 174, after 20 steps:

| quantity | old | new |
|---|---|---|
| $w$ | $1.11027\times10^{-3}$ | $9.17879\times10^{-4}$ (17.3% narrower) |
| $q$ | $5.32697\times10^{-4}$ | $5.14733\times10^{-4}$ (3.4%) |
| $a$ | $1.83938\times10^{-4}$ | $1.78136\times10^{-4}$ (3.2%) |
| $l$ | $8.77905\times10^{-4}$ | $7.35028\times10^{-4}$ (16.3%) |
| $\dot l$ at the end | $4.06695\times10^{-4}$ | $3.70618\times10^{-4}$ (8.9%) |
| $\dot l$ over the step | $2.82611\times10^{-3}$ | $2.77748\times10^{-3}$ (1.7%) |

- **Growth of $w$ over the 20 steps** from the anchor's $8.904\times10^{-4}$: old $+2.20\times10^{-4}$, new $+2.75\times10^{-5}$, about eight times slower. From step 155: $2.11\times10^{-4}$ against $2.34\times10^{-5}$, about nine times.
- **New width never larger.** On every one of the 20 steps, each new width is at most the old one (read from the .out rows).
- **Consistency.** On all 20 steps the new end meets the old end and the frozen accepted record of the same step. That consistency is necessary between proved enclosures, but it is not evidence of correctness.
- **$w$-row budget at step 174.** The remainder radius is $4.08\times10^{-7}$ (about 87%), delayed reads and origin $5.83\times10^{-8}$ (about 12%), and the derivative term $9.0\times10^{-10}$. The new $w$ growth is therefore now set by the jerk enclosure's width, not by lost correlation.
- **Over-step $\dot l$ barely narrows.** Its width (about $2.8\times10^{-3}$) is dominated by the motion within the step, which the end-state correlation cannot remove (inferred from the budget). Whole-step decisions near a turn will therefore need sub-interval or end-plus-$\ddot l$ methods (adjudication 8), not only the narrower ends.

The comparison covers steps 155 to 174 only. Nothing here licenses extrapolation of the width ratio to step 436.

## 5. Admission of the reconstruction slices (ruling)

The recon mode, read in full at lines 410 to 443:
- appends each certified reconstructed step to the reader before it can be read, so history after step 154 comes ONLY from the reconstruction;
- checks that each reconstructed end meets the frozen accepted record, and REFUSES on a contradiction, without narrowing by it;
- resumes only from a complete, all-pass slice with the same anchor.

The slices r1 (steps 155 to 224) and later are ADMITTED to run under script 1bcc8a27… and the C15 record, on these conditions for accepting each slice record:
- (a) `controls_all_pass` true and `partial` false;
- (b) a consecutive chain of certified steps from 155 (or from the resumed step), every step meeting its frozen record;
- (c) the receipt shows a granted single invocation with exit 0 and the output names fixed in advance;
- (d) after r1 exists, I audit it with my own instrument (audit10, sha256 b2b90c7a…; a grant will be requested), and the slice's sign claims are adjudicated only after that audit.

**Falsifiers:** a reconstructed end disjoint from its frozen accepted record (the run refuses it); my audit10 finding a reconstructed record that fails alignment or continuity, or whose end does not meet the frozen record; or my end evaluation on a reconstructed box disagreeing in sign with the slice's claim.
