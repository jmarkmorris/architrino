# Six-pole post-turn campaign, review: adjudication 3 (design of steps10-cm v4.8: the extended chart in the step)

Written 2026-10-21 by the review role. Code reading only; no Python run. Rules against my [post-turn reference](spherical-six-pole-post-turn-claude-review-reference.md) (`09e6130e…`), sections 1.4–1.5.

**Subjects.**
- [cm48](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48.py), sha256 `5e67e4b09558d19f5ffef3c3127105bc32139c03768aa83b965397c9addf7646`.
- [diff cm471 → cm48](../evidence/spherical-six-pole-post-turn-claude-continuation-cm471-to-cm48.diff), sha256 `ffcc89d7214cdd1a70d64fd36b41ef931f7a59a6781b27a2e7e53d4e14eac52a`.

I read the diff in full. The base is cm471 (`05abecc0…`), unchanged.

## 1. The change (derived from the diff)

- **The box line.** One asserted textual replacement of the v4.4 `BOX` line changes source $q'$ from $[0,1.80]$ to $[0,1.83]$ and source $w'$ from $[-0.10,0.45]$ to $[-0.20,0.45]$. The receiver box $[0.55,2.10]$ is unchanged.
- **Bracket rule.** Unchanged. The version label is now 4.8.
- **New control B9.** The two predicates the step actually uses, `in_box` in `accel_parts` and the frozen `in_iv` step check, must:
  - accept boxes just inside each new edge;
  - refuse boxes $10^{-9}$ past each new edge;
  - accept $q'\in[1.805,1.81]$ under the new box, while the old 1.80 edge refuses it;
  - still enforce the unchanged $w'\le0.45$ and receiver edges.

  This is the control my reference 1.4 asked the step to carry ("old box refuses, new accepts").
- **The re-census.** The inherited control E10 (v4.4 lines 321–349) reads `BOX` at run time. It therefore re-runs its direct-vector check and its signed census on the NEW box: 150 points per class, five of them at $q=\pi/2$, and $30\times30$ cells, requiring $r>0.35$.
- **Per-step guard.** Transmitter positivity is checked on each step by the frozen sub-wake test on the actual boxes. Step validity therefore does not rest on the sign of $M$. The sign maps of geomx (adjudication 2) serve interpretation, namely each factor's side of 1 and the $N$-reversal flags, and the refusal guard.

## 2. Findings

- **(a) Provenance mismatch (measured).** cm48's header cites geomx as `12f7528524c4ea1741e5a18d9aa2c524adc4c1f12d93c5f375fca603fbdf8983`. The file on disk, which I ruled on in adjudication 2, is `8e95b77a745dc037415c194ec774fcec23e7153fcde40f1bdc6b3e3c72fe4119`, and no other geomx file exists under the prefix. The box values in cm48 (1.83 and $-0.20$) equal geomx's. So the computation is unaffected and the citation is wrong. It must be corrected in the continuation's report, as a dated note, before slices are ruled on. cm48 itself is not to be edited once it has run.
- **(b) The E10 floor might fail on the extended box (inferred).** At $q=2.10$, $q'=1.83$ the like chord is about 0.41 by my hand estimate. E10's coarse cells, about $0.052\times0.061$, could enclose it below 0.35 and fail the control. That would be a correct refusal of an untested corner, not a fault. If it happens, the remedy is a receiver box narrowed to what the path visits, or a finer E10 grid, with controls rerun. It is not an override.
- **(c) Receiver below 1.45.** The geomx sign maps cover receiver $q\ge1.45$, while the step box runs to 0.55. I will flag any slice whose receiver box goes below 1.45. Its interpretive sign statements (factor side, $N$ sign) then rest on E10's coarse census only.

## 3. Ruling

**cm48 DESIGN ADMITTED** as the Q3 step instrument, on these conditions:
1. a saved cm48 controls record with every inherited control (including E10 on the new box) and B1–B9 passing, before any slice;
2. the geomx citation corrected in the continuation's report, as in (a);
3. slices start from the certified P3 step-570 strings;
4. a positive G1x record for the sign-map interpretation (adjudication 2).

**Falsifiers.**
- A slice step whose source box exceeds $q'=1.83$ or $w'<-0.20$ without refusing.
- An E10 pass on a box different from the one recorded in `chart_v48`.
