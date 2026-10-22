# Six-pole post-turn campaign, review: adjudication 12 (design of steps10-cm v4.9: the signed serializer)

Written 2026-10-21 by the review role. Code reading only; no Python run. Against [adjudication 11](spherical-six-pole-post-turn-claude-review-adjudication-11.md), item (c)0.

**Subjects.** [cm49](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49.py), sha256 `0ece73d43e8963b8742995fa615ab468f8fd9891e505f1ce0893f721ca11e1fd`. [diff cm48 → cm49](../evidence/spherical-six-pole-post-turn-claude-continuation-cm48-to-cm49.diff), sha256 `49bed635f182463dd50e7eed0e29f90d0ed7f0355a86822b3f3241cacd2ea69b`. I read the diff in full. The base cm48 `5e67e4b0…` is unchanged, and the extended chart is kept.

## 1. The change (derived from the diff)

- **Three asserted replacements.** They swap in a signed writer `ser49`, the matching reader `deser49`, and a guarded resume `_resume_form_49`:
  - `ser49` writes `[str(-int(m) if sign else int(m)), int(e)]` from `x._mpf_`.
  - `deser49` keeps the v4.4 text, `mp.mpf((int(m), int(e)))`, so a signed mantissa now returns a negative number.
  - `_resume_form_49` reads only files tagged `affine_format: "signed-v49"`; untagged files are refused.
- **What this forces.** No legacy, sign-stripped `affine_last` can be resumed, so the rebuild must start in memory from the step-154 anchor. That is what adjudication 11 required.
- **Controls S-ser.**
  - (i) Exact round trips through JSON of negative, positive, zero, tiny and irrational numbers, and of a whole form with a NEGATIVE centre and MIXED-sign columns.
  - (ii) NEGATIVE: the old writer fails (i), with the centre sign and a column entry flipped, and a resume file without the tag is refused.
  - (iii) KNOWN resume case, in controls mode, from the anchor. Two steps run in memory are compared with step 1, a JSON save, a resume and step 2. The resumed form must be identical, and step 2 must match string for string with the in-run time origin. The resume-constructed origin is reported as well.
- **Everything else is unchanged:** law, bracket ladder, chart, intersection and checks.

## 2. Assessment (derived)

- **Round trip.** The writer and reader are exact inverses for every finite binary number. The sign is applied to the integer mantissa and `mpf((m, e))` is exact. Control (i) verifies this, including mixed-sign columns, and (ii) has teeth against the old line.
- **Resumes are sound by construction.** A resumed form is now the same zonotope as the in-memory one, and control (iii) shows a resumed step equals the uninterrupted one.
- **The resume time origin** is $[\underline t_{\rm int}+\Delta,\,\overline t_{\rm int}]$, a valid enclosure of the true origin. If it differs from the in-run origin, it differs only by rounding at the $10^{-25}$ level. A difference there changes strings but not validity. That is why (iii) requires identity with the in-run origin and only reports the other.
- **Scope of the repair.** cm49 repairs the writer for all records it writes. It cannot repair already-written records. Those stay suspended (adjudications 10 and 11) and are not to be resumed or cited for events.

## 3. Ruling

**cm49 DESIGN ADMITTED**, on these conditions:
1. A saved controls record in which every inherited control (v4.4, B1–B9) and S-ser (i)–(iii) pass, before any slice.
2. The rebuild runs in recon mode from the step-154 anchor, in slices. Each slice file carries the `signed-v49` tag and is resumed only from a tagged file.
3. Each rebuilt slice is audited with audit10 on a grant. The frozen-record meet through step 436 is reported as consistency.
4. Events are re-derived on the rebuilt chain under the criteria of adjudication 11(c).

**Falsifiers.**
- An S-ser failure.
- A rebuilt slice file without the tag.
- A resumed step that differs from its in-run counterpart beyond the rounding of the origin.
