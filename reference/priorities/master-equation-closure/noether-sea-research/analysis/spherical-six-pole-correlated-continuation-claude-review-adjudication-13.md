# Six-pole correlated continuation review: adjudication 13 (r5 accepted; certificate of the FIRST support turn; admission of the cover file cm45)

Written 2026-10-14T13:02:44Z by the review role, after my granted invocations C23 (a) and C23 (b).

**Subject.** [r5](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C22-r5.json), sha256 7af6178534c67a97e78800f6a5c7782b4c27fd6f124ed15bad7d82483e54b875: steps 435 to 492 certified, 493 refused (like-class delay bracket at $t_0$), `controls_all_pass` true, `partial` false.

**My runs.**
- C23 (a), audit10, PID 62823, exit 0: [json](../evidence/spherical-six-pole-correlated-continuation-claude-review-audit10-C23-r5.json) 8e2d0ca51a4fbdf171f00a481d2bc265a98598672fa61119f75374a4c04ec2ab; [out](../evidence/spherical-six-pole-correlated-continuation-claude-review-audit10-C23-r5.out) 6f4a612a….
- C23 (b), ddl10 (67a82d34…), PID 62927, exit 0: [band record](../evidence/spherical-six-pole-correlated-continuation-claude-review-ddl10-C23-r5band.json.ddl10.json) d0f72dc74abf3f1e7f6d355384cc93d59aef81d9fbc28f697317d80cf7c8145b; [out](../evidence/spherical-six-pole-correlated-continuation-claude-review-ddl10-C23-r5band.out) 76f15113….

## 1. r5: ACCEPTED (measured)

- All of my controls pass, including R1 to R3 and I1 to I4.
- r1 to r5 were appended through the checked path, up to own-492.
- I audited the 57 steps 435 to 491 with no failure and no sign disagreement with the subject.
- Steps 435 and 436 meet their frozen records; no frozen record exists beyond 436.
- Every band step read reconstructed records only.

## 2. Measured enclosures at the turn

| quantity | step | enclosure |
|---|---|---|
| my end $\dot l$ | 435 | $[-0.000119736,\ 0.004840832]$ |
| my end $\dot l$ | 436 | $[-0.000000292,\ 0.005043018]$ |
| my end $\dot l$ | 437 | $[0.000135755,\ 0.005267197]$ (POSITIVE) |
| refined $\ddot l$ ($K=4$) | 374 to 435 | positive on every whole step (435: $[0.000175,\ 0.0339]$) |
| refined $\ddot l$ ($K=4$) | 436 | $[-0.000108,\ 0.0343]$, undecided |
| refined $\ddot l$ ($K=4$) | 437 | $[-0.000280,\ 0.0347]$, undecided |

- At step 437, my evaluation on the subject's box and the subject's stored value are also positive (cross-code agreement on the same records).
- Over these steps, $l \approx -0.112$ is negative, $w > 0$, and $a$ and the jerk are negative.

## 3. Certificate of the FIRST support turn (derived from section 2 and adjudication 12)

- **Exclusion before the window.** $\dot l < 0$ holds at every instant from step 275 to the true step-409 end (whole-step proofs: turning-point adjudication 12 to 370; adjudications 8 and 12 for 371 to 409).
- **Positive end.** $\dot l > 0$ at the true step-437 end.
- **First crossing.** $\dot l$ is continuous, so $t_c = \inf\{t > t_{409}:\ \dot l(t) > 0\}$ exists. It is the first time since step 275 that $\dot l$ leaves the negative side, and it lies in the bracket below. With $l < 0$, $t_c$ is the first local minimum of $l$, a maximum of $|l|$: the FIRST SUPPORT TURN.
- **Bracket.** $t_c \in (5.956684593623649597167969,\ 6.236684709182828044891357)$, using the lower end of the 409-end time and the upper end of the 437-end time, so the full origin uncertainty is included.
- **Strictness and uniqueness.**
  - If $t_c$ lies at or before the 435 end, then $\ddot l > 0$ makes $\dot l$ strictly increasing through $t_c$. It is a strict crossing, and the only zero of $\dot l$ in $[t_{409}, t_{435}]$.
  - If $t_c$ lies in $(t_{435}, t_{437}]$, existence and firstness hold, but strictness is not yet proved, because $\ddot l$ is undecided on 436 and 437.
  - A K = 8 refinement on 435 to 437 has been requested to close this.
- **Ruling.** SIGNED-SUPPORT TURNING POINT (first; a minimum of $l$): CERTIFIED TO EXIST in the bracket above. Strictness is proved for a crossing up to the 435 end; strictness on 436 to 437 is pending.
- **Falsifiers:** any listed enclosure missing the true value; a jump of $\dot l$; a reconstructed record not containing the true state.

## 4. Admission of the cover file cm45 (derived from the code)

**Subject.** [steps10-cm45.py](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm45.py), sha256 fe23d4ae9cdfec0ab410ed6076f1c8b960f561ce09f6bc4f09bb463d377d5d34. Diff against v4.4: one flag line, the cover functions with controls E18 to E21, and the cover call in recon mode. The step code is unchanged.

**The cover is outer, and each part is valid:**
- **Half-planes.** For every direction $u$ actually used (a point vector), the set lies in $\{x : u\cdot(x - c) \le h(u)\}$, with $h(u) = \sum_i |u\cdot g_i|$ as a directed upper bound. This is a support-function bound, valid for any $u$. The directions are the normals of the 12 largest columns plus 36 fixed directions, each with its negative.
- **$q$-range.** The range is $c_q \pm h(e_q)$, clipped to the proved end box, which is valid because the true state lies in both.
- **Slabs.** They share the same mp endpoints, so they leave no gap.
- **$w$-bounds.** Each slab's bounds are the interval upper or lower values of $(h - u_x\,dq)/u_y$ over the whole slab, so they hold for every $q$ in it.
- **Empty slabs.** A slab with $w_{lo} > w_{up}$ contains no point of the set, so dropping it is valid.
- **$w$-box.** The $w$-box is clipped to the proved end box.
- **$\dot l$.** Each piece is evaluated with the admitted end expression on the interval end time. E21 checks equality with the admitted evaluation to $10^{-25}$.
- **Sign.** It is given only when all pieces agree.

**Controls.**
- E18: the exact range $\pm 1.8$ of $2q - 3w$ is contained (checked by hand: $f(g_1) = 0.5$, $f(g_2) = 1.3$), and the vertices $(\pm1.2, \pm0.2)$ and $(\pm0.8, \pm0.8)$ are covered.
- E19: a dropped slab misses $(0.5, 0.25) = 0.5\,g_1$.
- E20: a support bound shrunk by $10^{-20}$ excludes the vertex $(1.2, 0.2)$.
- E21: outer agreement on step 155.
- These are adequate. The design is ADMITTED.

**Conditions for using its records:**
- (a) a controls record with every control passing, E18 to E21 included;
- (b) the replay of 365 to 437 from r3 must reproduce the r4 and r5 end strings EXACTLY (same step code). If it does not, the replay is a new reconstruction and needs my audit10;
- (c) cover signs are the subject's evaluation (cross-code).

**How the cover can narrow the bracket.**
- A cover-negative end $\dot l(t_k) < 0$ for some $k \le 435$ narrows its lower side. Since $\dot l$ is strictly increasing on 374 to 435 (my $\ddot l$), $\dot l$ is then negative up to $t_k$ (derived).
- A cover-positive end before 437 narrows its upper side.
