# Six-pole post-turn campaign, review: adjudication 14 (rebuilt slices R1′–R3′, steps 155–385: ACCEPTED)

Written 2026-10-21 by the review role, after my granted run GP2.

## 1. Subjects and run (measured)

**Slices (cm49 `a0880ac6…`).** Every slice carries `affine_format: "signed-v49"`.

| slice | sha256 | steps | certified | resumed from |
|---|---|---|---|---|
| [R1′](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.json) | `f81012daaaf76d660ec76fd731193a020c078d26e6487aa0e4ba2477874869ce` | 155–220 | 66/66 | — |
| [R2′](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.json) | `93eb668c642752b3077102e03acad2b216d929c4a0a39158559b450fb9a263dd` | 221–295 | 75/75 | R1′ (tagged) |
| [R3′](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.json) | `034afdb7660197afaf7c38bc7126ce3ecfe1ff5e03887b45970882a7f4029d79` | 296–385 | 90/90 | R2′ (tagged) |

**My run (GP2).**
- **Instrument:** audit10 (`b2b90c7a…`, unchanged).
- **Chain:** `--own` holds only R1′–R3′, which are also the targets.
- **Process:** PID 94690, 03:18:13–03:18:50 UTC, exit 0, 37.40 s, peak RSS 128,040,960 B.
- **Census:** no Python process present.
- **Outputs:**
  - [json](../evidence/spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.md) `47f11448c741c8345314c00137555e93308e5dced77c20fba61569acf2ae9229`;
  - consistency `2f6d0ef3…`;
  - out `595a3008…`;
  - out.time `081914c0…`.

## 2. Findings (measured)

- **Audit.** 68 of 68 controls passed for each target. All 231 steps passed with no failures, and there was no sign disagreement between the subject and me.
- **Frozen consistency.** All 231 reconstructed ends through step 385 meet their frozen accepted records. This is consistency only.
- **R1′ matches old r1 exactly.** It is string-identical to the old r1 on all 66 shared steps, as an in-run chain should be. Its saved form now holds negative entries in 66 of its 200 columns.
- **The new chain departs from the old exactly where the stripped resume took effect.**
  - On 221–224 it equals the old chain; those steps were run in memory in the old r1.
  - It differs from step 225 on, the first step after the old r2's stripped resume. The PI reports that R3′ matches the old chain on 0 of 90 steps.
  - At 225 the old $w$ enclosure, $[0.3876215154,\,0.3886138122]$, does not contain the new one, $[0.3876211666,\,0.3886141610]$. The stripped resume therefore produced a narrower set that left out part of what is now the proved enclosure.

## 3. Ruling

**R1′–R3′ ACCEPTED** as the certified reconstruction from the step-154 anchor through the step-385 end, $t\le5.716684709182828044891357$.

No events are re-derived yet. The speed maximum near $t\approx4.25$ (step about 238) and the radial zero near 5.69 (step about 369) lie in this span. If re-certified, they must come from this chain's per-step signs under my October criteria, and that needs the corresponding runs.

**Falsifiers.** A later slice that fails to join R3′'s step-385 end, or any listed enclosure missing its true value.
