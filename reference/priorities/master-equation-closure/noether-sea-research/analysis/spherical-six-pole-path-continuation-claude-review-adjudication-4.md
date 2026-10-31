# Six-pole path continuation, review: adjudication 4 (design of steps10-cm v4.7: both bracket ends; the post-read cm46 edits)

Written 2026-10-20 by the review role. Code reading only; no Python run. Against my frozen [reference](spherical-six-pole-path-continuation-claude-review-reference.md) (`91751abc…`) section 1, after [adjudication 2](spherical-six-pole-path-continuation-claude-review-adjudication-2.md) (`05864a5f…`).

**Subjects.**

| file | sha256 |
|---|---|
| [cm47](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm47.py) | `a85c264892b89419c1dc3c15e6ef1ded546fbe97d9ceca7919d032d93eca3c34` |
| [diff cm46 → cm47](../evidence/spherical-six-pole-path-continuation-claude-continuation-cm46-to-cm47.diff) | `9b429ea6db4b08e87df3aa9d442507916a1c6a89f3d4aa227b424ec85bca4bff` |
| [continuation wave-1 report](spherical-six-pole-path-continuation-claude-continuation-wave1.md), sections 1–5 | `a4c7fad7d0fa8d91459b2176590bc72510e252e90b7011474650d9d272197193` |

I read the diff in full. It applies to cm46 `4f685bc0…`.

## 1. The rule (from the diff)

- **Frozen path unchanged.** `tau_point9` is called first; when it straddles, its object is returned.
- **Fallback upper end.** The fallback now uses the upper end $b=\overline{\mathrm{chord}}+\max(0.90,\,2.05-\overline{\mathrm{chord}})=\max(\mathrm{chord}+0.90,\,2.05)$ for every class.
- **Ladder start.** The ladder starts at rung 0, the frozen lower end. So a failure of the upper end alone is repaired without lowering $a$.
- **Unchanged.** Everything else in the fallback is as in v4.6: the admissibility $a_k>\max(0,\overline{t_0}-t_G)$; $\sup h(a_k)<0$ proved; the frozen `tau_point_asym` on $[a_k,b]$; uniqueness over $[\underline{t_0}-b,\overline{t_0}-a_k]$; refusal with the failing inequality.
- **Like class.** $2.05-\mathrm{chord}_L<0.90$, so the like fallback is exactly v4.6's.

## 2. Against reference 1.3 at both ends (derived)

- **Upper end.** On the unit sphere every class chord is at most 2. So $h(b)=b-r_c\ge2.05-2=0.05>0$ for every parameter and every history, whenever the read at $t_0-b$ is defined. That read is near $t\approx4.7$, inside the records. The outward rounding of $r_c$ cannot consume a 0.05 margin. This is my reference 1.3's global upper end with $\epsilon=0.05$. It removes the predicted unlike obstruction near steps 507–509 (adjudication 2, section 3), and it is valid for a rising root of any class.
- **Lower end.** Unchanged from v4.6, which met items 1–4 and 6.
- **Uniqueness.** It is now proved over a longer read range, $[\underline{t_0}-b,\overline{t_0}-a_k]$, which the fallback already computes from the records' `VS` boxes and the window enclosure. Sub-wake motion holds on the whole history (October D15), so this costs nothing.
- **Chart (item 5).** The v4.4 `accel_parts` chart refusal is unchanged.
- **Same root.** Where the frozen bracket straddles, the frozen object is returned. Elsewhere, any proved straddle encloses the unique root (reference 1.1).

All six items of 1.3 are met at both ends, together with the rising-root requirement. **DESIGN ADMITTED.**

## 3. Controls B7 and B8 (design)

- **B7 (known).** An unlike root above $\mathrm{chord}_U+0.90$, in two cases. The first is a stationary source at $Q=1.82$, $q'=1.77$, with the exact root (about 1.888) from the INDEPENDENT direct-vector embedding. It must be enclosed to $10^{-15}$ on rung 0 with $b=2.05$, while the frozen bracket refuses. The second is a uniform source with $u=+0.10$ and a root of about 1.83, whose enclosure is proved by an independent direct-vector sign test.
- **B8 (negatives).** An upper end forced to 1.80, below the root, must refuse with "frozen bracket on $[a_k,b]$ refused". The like geometry on the unlike source must be detected.

Together with B1–B6 these are adequate. They give a known case above the old upper end with an independent oracle, a rising root, a forced upper-end failure, and a class exchange.

**Gap (minor).** No negative shows that a read at $t_0-b$ past the START of covered history refuses. That read cannot occur at $t\approx6.8$ with $b\le2.2$, and the frozen `history` refuses windowless reads below the first record. No action is required for this campaign.

## 4. Do the post-read cm46 edits matter? (derived from the wave-1 report and the diffs)

No. `cm46` (`4f685bc0…`) was never run; the run copy convention does not apply, and the admitted bytes are preserved as `cm46-v1` (`a48ec4e6…`, matching the hash I read). The edits change only control EXPECTATIONS in PART2:
- the rung number of the second B1 case;
- B3's cap and the coverage-edge rung;
- B2's width tolerance, from $10^{-18}$ to $10^{-15}$, which is consistent with 60 bisections of a width-2 bracket;
- a missing-key guard;
- a class-exchange negative that now accepts a refusal or a disjoint enclosure;
- string formatting.

The PART1 rule is byte-identical. All of these are inherited by cm47 and judged there. A loosened tolerance in a KNOWN control is acceptable here because the B2 pass also requires the independent direct-vector signs ($h<0$ just below and $h>0$ just above the enclosure). The class-exchange negative still has teeth: a refusal or a disjoint enclosure are both detections, while an intersecting enclosure fails it.

## 5. Ruling and conditions

**cm47 ADMITTED** as the Q2 step instrument, on these conditions:
- (a) the grant-K1 controls record has every inherited v4.4 control and B1–B8 passing;
- (b) the equivalence replay is reported as consistency only;
- (c) slices start from the r5 step-492 strings.

Each slice is ruled on separately.

**Falsifiers.**
- A K1 record with any failure.
- A slice step whose bracket data show $b<2$ on a fallback, $a_k\le\overline{t_0}-t_G$, or a uniqueness bound $\ge1$.
- A fallback root enclosure disjoint from my own audit's root on the same state.
