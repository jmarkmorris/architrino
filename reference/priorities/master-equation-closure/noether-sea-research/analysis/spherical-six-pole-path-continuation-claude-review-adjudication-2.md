# Six-pole path continuation, review: adjudication 2 (design of the continuation's repaired delay-root bracket, steps10-cm v4.6)

Written 2026-10-20 by the review role. Code reading only; no Python run. This adjudication rules against my frozen [reference](spherical-six-pole-path-continuation-claude-review-reference.md) (sha256 `91751abc1c547a29f6bbe8d3f4d1562bc868162169f25b6d09e1355a843d69ea`), section 1.

**Subject.** [steps10-cm v4.6](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm46.py), sha256 `a48ec4e6a6f36c7d43baaea0204805123600c7c474a6006f0ff1588bb72f86f5`, read at 21:08:55 UTC.
- It executes v4.4 (`1bcc8a27…`, hash-checked in the script) with two asserted text insertions and no deletion.
- PART1 adds the bracket ladder and rebinds the global `tau_point`.
- PART2 adds wrappers that record bracket data, and controls B1–B6.
- No controls record or slice of this file had been seen when this was written.

## 1. The rule (read from the code)

`tau_point46` calls the frozen `tau_point9` first and returns its object unchanged whenever it straddles. Only on refusal does `_ladder46` run:
- **Lower end.** It lowers the lower end in rungs, $a_k=\underline{\mathrm{chord}}-\mathrm{LOWER9}_c-0.15k$ for $k\le12$. The upper end stays fixed at $\overline{\mathrm{chord}}+0.90$.
- **Admissibility.** A rung is admissible only if $a_k>\max(0,\overline{t_0}-t_G)$, where $t_G$ is the guaranteed coverage end.
- **Straddle.** It requires $\sup h(a_k)<0$ proved, then calls the frozen `tau_point_asym` on $[a_k,b]$. That routine re-proves both signs and bisects with the frozen invariants.
- **Uniqueness.** It requires $\sup|w'|<1$ over the source times $[\underline{t_0}-b,\,\overline{t_0}-a_k]$. The bound comes from the window enclosure and the whole-step velocity boxes `VS` of the certified records met, and returns no bound past $t_G$.
- **Failure.** Every failure refuses and records the failing inequality.

## 2. Against my reference 1.3 (derived)

| item | requirement | v4.6 | verdict |
|---|---|---|---|
| 1 | both signs proved over the whole parameter box | the frozen `tau_point_asym` re-proves $\sup h(a)<0$ and $\inf h(b)>0$; the ladder also pre-checks $h(a_k)$ | met |
| 2 | lower-end read inside guaranteed coverage | explicit $a_k>\overline{t_0}-t_G$; the frozen `history` also refuses beyond coverage (frozen D15) | met |
| 3 | $h'>0$ over the bracket | sub-wake bound over the exact read range, per ladder call; the frozen path keeps the frozen global sub-wake premise (D15) | met |
| 4 | invariant-preserving narrowing | frozen bisection unchanged | met |
| 5 | source state in the chart | the v4.4 `accel_parts` chart refusal ($q'\in[0,1.80]$, $w'\in[-0.10,0.45]$, receiver $[0.55,2.10]$) is unchanged | met |
| 6 | refuse, never clamp | yes | met |
| — | works for a RISING root | the upper end is NOT adapted (see 3) | GAP |

**Same root as before (1.4).** Where the frozen bracket straddles, v4.6 returns the frozen object itself, so the strings are identical. Where it does not, any proved straddle encloses the unique root (reference 1.1). B4 and B5 check identical strings at the anchor and at the step-474 and step-491 ends. That is consistency of shared code, NOT independent evidence, and the controls say so.

**Rebinding.** The frozen step and end routines call the global name `tau_point` at call time (for example steps9 line 98). The rebinding therefore reaches them. A call that bypassed the rebinding would only reproduce the frozen refusal, which fails safe.

**Controls (design).**
- **B1 (known).** A stationary like source, with the exact root computed from INDEPENDENT direct-vector geometry rather than `geom`. The root lies below the frozen lower end, on rungs 1 and 3.
- **B2 (known).** Uniform sources with an independent direct-vector sign test, including a RISING like root that is enclosed below and then above the frozen lower end.
- **B3 (negatives).** These cover the following cases:
  - a capped ladder;
  - an upper end below the root;
  - an injected $|w'|=1.2$;
  - a read $10^{-9}$ past coverage, refused, with $10^{-6}$ inside accepted;
  - an exchanged class sign giving a disjoint enclosure.
- **B4–B6.** Identity with the frozen root at the anchor, and at the 474 and 491 ends. At the refused step-492 end, the ladder encloses the like root strictly inside $[a_k,b]$, with uniqueness proved and the end evaluation completed.

These meet every control I asked for in reference section 1.

## 3. A predicted obstruction: the UNLIKE upper end (inferred from measured r5 values)

The upper end $\overline{\mathrm{chord}}_U+0.90$ is never adapted. From r5 (`7af61785…`), the unlike `tau_box` is $[1.64282,1.64551]$ at the step-491 end and $[1.64504,1.64775]$ at the step-492 end. It is RISING by about $0.0022$ per step.

The unlike chord is $\sqrt{2-\sqrt2\sin q}$. With $q\in[1.7407,1.7453]$ at 492 it is about $0.779$, so the upper end is about $1.679$. The margin is therefore about $0.031$. The upper end rises only about $0.0003$ per step, because $\partial_q\mathrm{chord}_U\approx0.155$ and $q$ gains about $0.002$ per step.

So $\inf h(b)>0$ for the unlike class is expected to fail after roughly 15–17 steps, near step 507–509, well before the path turn (near step 565 by my reference 3.5). Control B3 confirms that lowering cannot rescue an upper failure. The like and antipode upper ends exceed 2 ($1.84+0.90$ and $1.29+0.90$), so they cannot fail.

**Repair (derived, reference 1.3).** Use an upper end $b=2+\epsilon$ for every class, or a ladder that raises it. Then $h(b)\ge b-2>0$ holds on the unit sphere for any history, the read $\underline{t_0}-b$ lies near $t\approx4.8$, inside the records, and uniqueness is proved over the wider read range as the ladder already does. It needs one known control (a rising unlike-type root above the frozen upper end) and one negative.

## 4. Ruling

**ADMITTED** for the lower-end repair (Q2 bracket design), on these conditions:
- (a) a saved controls record in which every inherited v4.4 control and B1–B6 pass, made before any slice;
- (b) slices that start from the r5 step-492 strings through the checked path.

Each continued slice is ruled on separately (audit10 on grants). The admission does NOT cover an upper-end refusal.

**Expected.** The continuation stops near step 507–509 on the unlike upper end, unless a v4.7 with a valid upper end (section 3) is written and its controls pass first. I recommend writing v4.7 now, in parallel with the first slice.

**Falsifiers.**
- A controls record with any failure.
- A slice step whose recorded bracket data show a like rung with $a_k\le\overline{t_0}-t_G$, or a uniqueness bound $\ge1$.
- An unlike refusal that occurs much earlier or later than steps 507–509; this would falsify my inference only, not the admission.
