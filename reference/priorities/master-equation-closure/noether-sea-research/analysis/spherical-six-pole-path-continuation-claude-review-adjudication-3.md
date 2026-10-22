# Six-pole path continuation, review: adjudication 3 (Q3: the repaired cover's results at ends 412 and 431; the history-reading premise; the narrower bracket)

Written 2026-10-20 by the review role. No Python was run by me; every number is read from the support's records with `node` or from code. It rules against my frozen [reference](spherical-six-pole-path-continuation-claude-review-reference.md) (`91751abc…`) section 2, after [adjudication 1](spherical-six-pole-path-continuation-claude-review-adjudication-1.md) (`94503261…`).

## 1. Records read

| file | sha256 |
|---|---|
| [S1 controls](../evidence/spherical-six-pole-path-continuation-claude-support-S1-receval-v5-controls.json) | `d9e10f25b2027add48c0d5bbd8b2b0bd4798390b3170d1d6dbdbab2ad83e8b4a` |
| [S2 ends 412 and 431](../evidence/spherical-six-pole-path-continuation-claude-support-S2-receval-v5-ends-412-431.json) | `ffee4590804350aefbffa33fbed86f93b20dd770acb7b35cf6823b1578c13ed0` |
| S2 out | `cf99bc76affa5c518c9bad260d408832d407d0e70408e0d92d11a9f4752f6449` |
| S2 out.time | `bf115c5c246efebc51f5060f832992abf07f95bdc81aa72035c5d4fc60e4a980` (32.42 s wall, peak RSS 91,734,016 B) |

The instrument is receval v5 `2756db62…`, as admitted in adjudication 1.

## 2. Conditions of adjudication 1 (measured)

**(a) Met.** S1 has all 14 controls passing: P1–P9 and V0–V4. The chain486, slice6 and slice5 controls also pass. In V1 the image is $[0.7,1.02]$, with 9 of 9 pieces containing their exact root ranges. In V2 the dropped top strip is refused ("last edge is not up(x)"), and with the check bypassed the image is $[0.7,1.01968]$, so the check has teeth. V3 refuses an interior gap. V4 refuses a piece outside the box. S2 reran all 14 before its targets, and all passed.

**(b) Met.** The rows come from the reconstructed records r1–r5, with no override and the cover check passed. Both rows carry the full end account.

| end | end time $t$ | $q$ box | $w$ box | $l'$ (dimensionless) | sign |
|---|---|---|---|---|---|
| 412 | $[5.986684593623649597167969,\,5.986684709182828044891357]$ | $[1.531651186,\,1.534825100]$ | $[0.308524237,\,0.309997746]$ | $[-0.002491758634,\,-0.000089897792]$ | NEGATIVE |
| 431 | $[6.176684593623649597167969,\,6.176684709182828044891357]$ | $[1.588591877,\,1.592054307]$ | $[0.290277975,\,0.291846452]$ | $[+0.000087604600,\,+0.003285263991]$ | POSITIVE |

- Physical support rate $l'/100$ is negative at 412 and positive at 431: $[-2.49\times10^{-5},-9.0\times10^{-7}]$ and $[+8.8\times10^{-7},+3.29\times10^{-5}]$; $T\approx59.867$ and $61.767$.
- **Account (hulls, dimensionless).**
  - At 412: $l\in[-0.11189,-0.11032]$, $r\in[0.015131,0.015791]$, $a\in[-0.087679,-0.086718]$, $-w^2\in[-0.096099,-0.095187]$ and $r'\in[0.054296,0.056156]$.
  - At 431: $l\in[-0.11195,-0.11019]$, $r\in[0.025931,0.026777]$, $a\in[-0.105943,-0.104565]$ and $r'\in[0.058326,0.060844]$.
  - The like class gives the largest negative tangent contribution, $-0.0628$ at 412 and $-0.0835$ at 431, and the largest positive radial contribution, $0.0953$ and $0.1043$. Multiplicity is included.
- The values agree with C24 to the printed digits, as the support's falsifier expects for a $10^{-30}$ widening.
- **Diagnostics.** On these real boxes, v4's edge formula happened to reach $\overline x$: the October sliver did not occur there. v4's nearest reading of the end box did NOT contain the decimal box at 412 ($w$) or at 431 ($q$ and $w$), so the C2 outward reading mattered in principle, at about $10^{-30}$.

## 3. The history-reading premise (the PI's question; derived from code)

**How the records are written.** Each frozen step writes its history fields with `s45(x) = mp.nstr(pt(x), 25)`, round to nearest at 25 significant digits, with no write pad. This covers `S`, `VS`, `a0`, `ap` and the class ranges; read at [steps3 line 214](../evidence/spherical-six-pole-antipodal-claude-continuation-steps3-iv.py), and inferred to be inherited unchanged by steps6 to steps9, which extend that writer by execution. So a stored decimal bound can lie INSIDE the proved binary enclosure by up to half a unit in the 25th significant digit. That is at most $5\times10^{-25}$ for $|x|<10$, and at most $5\times10^{-26}$ for $|x|<1$. It is about $10^{5}$ times one binary ulp. The end strings are different. v4.4 writes them as `pair(I(lo - PAD, up + PAD))` with PAD $=10^{-23}$, so they keep a margin of at least $9.5\times10^{-24}$ outside the proof (derived).

**Who pads on reading.**

| reader | fields | pad on read | outer? |
|---|---|---|---|
| subject (steps6 `Ipad`, steps7 `T0`) | S, VS, a0, ap, time origin | $10^{-23}$ | yes (derived: $10^{-23}>5\times10^{-25}$) |
| review (audit7 `Ip`, `rec_sub`), inherited by audit8–audit10 and ddl10 | S, VS, a0, ap, end strings, and the time origin through `rec_sub` | $10^{-23}$ | yes (derived) |
| support (slice4 `make_slabs`/`lookup`, receval v5 `iv_of`) | A0, AP, S, VS, law: none; slab time offsets: $10^{-24}$; end strings: write-padded | none for A0, AP, S, VS | NO for A0, AP, S, VS (derived) |

**Answer to the first question.** Yes, it can invalidate the PROOF, though not by sign in any plausible way. The support's slab lookup forms the polynomial box from A0 and AP and then INTERSECTS it with S, VS and the law box (slice4 `lookup`, with `use_wholestep`). All of these are read unpadded from nearest-written decimals. The true history at a source time can therefore lie outside the box used, by at most about $5\times10^{-25}$ in $q'$ and $w'$ and $5\times10^{-26}$ in $a'$. The enclosures of $l'$ at 412 and 431 are then proved only under the premise that the decimal record boxes contain the true values. That premise is not derived. One binary ulp, as the question puts it, understates the gap: the decimal writing loses up to $5\times10^{-25}$; the binary parse adds only about $10^{-30}$.

**Size (inferred, not used for the ruling).** A crude derivative bound of order $10^{2}$–$10^{4}$, applied to these perturbations, gives a shift below $10^{-20}$ against margins of $8.99\times10^{-5}$ and $8.76\times10^{-5}$. A rigorous version would need the full chain-rule bound of my reference 2.4, applied to history inputs. I do not certify on it.

**Answer to the second question.** NO. My October and current instruments read every history field outward with a $10^{-23}$ pad, including the time origin. So the BROADER certified bracket $(5.956684593623649597167969,\,6.236684709182828044891357)$ and its $l''>0$ whole-step proofs (C23, C25) are not exposed to this premise. The subject's own steps read padded too, so the certified history itself is not exposed.

## 4. Ruling on the narrower bracket

The end signs are measured: 412 negative and 431 positive, on the repaired, fully covering, outward-read end box. With $l''>0$ on every whole step 374–437 (October C23, C25), this gives $l'<0$ on $[t_{374},t_{412}]$ and a unique, strict zero in $(5.986684593623649597167969,\,6.176684709182828044891357)$, i.e. $T\in(59.8668459,\,61.7668471)$.

**Status: CONDITIONAL**, now on ONE named premise instead of the October sliver: the support's lookup reads the history boxes A0, AP, S, VS and the law box unpadded from nearest-written decimals. The cover gap of adjudication 14 is CLOSED.

**What closes it (proposal):**
- A receval v6 that reads every history field outward, with a pad of at least $10^{-23}$ (the subject's and the review's convention), and changes nothing else.
- A known control: a constructed record whose true value lies $4\times10^{-25}$ outside its nearest-written decimal is contained by the padded reader and missed by the unpadded one.
- One rerun of ends 412 and 431.

That is one invocation of about 32 s. With the same signs, I would certify the narrower bracket. Alternatively, a rigorous derivative bound in the sense of reference 2.4 extended to history inputs would close it.

**Falsifiers.** A padded rerun that changes either sign. A writer of `S`, `VS`, `a0` or `ap` in the frozen chain that already pads, which would make the premise derived and certify the bracket now. Check the step writer in steps5 to steps9 for a pad before `s45`.
