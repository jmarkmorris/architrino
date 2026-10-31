# Six-pole path continuation, review: adjudication 5 (design of the support's receval v6: padded reading of every stored decimal input)

Written 2026-10-20 by the review role. Code reading only; no Python run. It follows [adjudication 3](spherical-six-pole-path-continuation-claude-review-adjudication-3.md) (`be702609…`), section 3.

**Subjects.**

| file | sha256 |
|---|---|
| [receval v6](../evidence/spherical-six-pole-path-continuation-claude-support-receval-v6.py) | `bd3baea86fe824b34bbc5e379f4ec9e8eb3232499c1291fb4f3f0f78737fbb9a` |
| [diff v5 → v6](../evidence/spherical-six-pole-path-continuation-claude-support-receval-v5-to-v6.diff) | `cd6b740dafd56a901cce88eef07dc4091976ecfc4d8d4371747d2adbbce410d4` |
| v5 (base, unchanged) | `2756db62…` |

I read the diff in full.

## 1. The change (from the diff)

The frozen chain486 is executed first and unchanged, so its controls run on the frozen reading. Then:

- **The reader.** `iv_of` is rebound to `ivp`, which reads the lower decimal with floor and the upper with ceiling at working precision. It then subtracts and adds $10^{-23}$ in interval arithmetic. It refuses any $|x|\ge100$.
- **What is re-read.** The window premises ($T^\*$, $q(T^\*)$, $\dot q(T^\*)$) are re-read through `ivp`. The 486 frozen laws are recomputed with `rec_boxes` and the slab chain rebuilt with `make_slabs`, both through the padded reader. The reconstructed chain is built from the padded laws.
- **The end box and time.** The end box and end time are read outward (v5 C2) and then padded by $10^{-23}$.

## 2. Validity (derived)

- **The pad covers the writing loss.** The frozen writer `s45` rounds to nearest at 25 significant digits. For $|x|<100$ its half-unit is at most $5\times10^{-24}$, which is less than $10^{-23}$. Each padded box therefore contains the binary enclosure that was written, and the guard refuses the only range where this would fail.
- **The rebinding reaches every reader.** The chain is executed with `exec` in the same module globals, and the functions it defines (`rec_boxes`, `make_slabs`, the slab `lookup`) resolve `iv_of` at call time. So the rebinding reaches every history field of the end-instant route: S, VS, A0, AP, the law, the time origin, Q0/V0 and the window premises.
- **No unpadded read remains on the route.** I searched v6 for other direct parses of record strings (`Istr(`, `I(*`, `mp.mpf(st[`). The only one is `t_end_of`, which is defined but never called. The end-instant route uses `end_time_out`, which is outward and then padded.
- **Padding cannot cost validity.** Every widening is outward. The cover (v5 C1), the contraction from the proved whole-box root range (adjudication 1) and the sign rule are unchanged.

## 3. Controls (design)

- **D1 (identity of the rebuild path; consistency, not evidence).** With the UNPADDED reader, `rec_boxes` and `make_slabs` reproduce the frozen 486 slabs exactly. This shows the rebuild re-runs the same path, so D2 compares like with like.
- **D2.** Every padded slab field contains the frozen field, the window premises contain the frozen ones, and all 485 joins pass.
- **W1 (known with a negative).** The field $[2/3,4/3]$ is written by `nstr(·,25)`. That rounds inward at both ends, since $2/3$ rounds up and $4/3$ rounds down; I checked by hand. The padded read must contain the true field, the unpadded read must miss it, and the $\ge100$ guard must refuse. This is the control I asked for in adjudication 3, in a stronger, two-sided form.
- **V1.** The tolerance moves from $10^{-25}$ to $10^{-22}$. The end-box pad adds at most $3\times10^{-23}$ to the image of $q+2w$, so V1 keeps its tightness meaning.

## 4. Ruling

**DESIGN ADMITTED.** receval v6 closes the history-reading premise of adjudication 3. The S4 rerun of ends 412 and 431 may be granted once the S3 controls record shows these passing:
- every inherited control: chain486, slice6, slice5, P1–P9 and V0–V4;
- D1, D2 and W1.

If S4 then proves $l'(t_{412})<0$ and $l'(t_{431})>0$, I will certify the narrower bracket in the next adjudication. That bracket also rests on $l''>0$ on every whole step 374–437 (October C23, C25), which my padded readers already proved.

**Falsifiers.** An S3 record with any failed control. An S4 row whose cover check failed or which used an override. A further unpadded read found on the end-instant route.
