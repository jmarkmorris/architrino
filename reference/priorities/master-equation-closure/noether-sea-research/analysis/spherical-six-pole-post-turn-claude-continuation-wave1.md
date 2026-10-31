# Six-pole post-turn campaign, continuation role (jack-k-hale lens): wave-1 report

*Living report under the [post-turn plan](spherical-six-pole-post-turn-plan.md) (sha256 `b03917315cde3e9c04c4aefbdb9780b3a52029110da9961ce25a51e70c43be0a`, read 02:27:20 UTC). The clock started at 02:26:53 UTC. All times are taken from `date -u`.*

## 1. Q3: step instrument with the extended chart (cm48)

[cm48](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48.py) (`5e67e4b09558d19f5ffef3c3127105bc32139c03768aa83b965397c9addf7646`) is cm471 with ONE change. An asserted, count-1 replacement of the v4.4 `BOX` line sets the source $q'$ upper edge to 1.83 (from 1.80) and the source $w'$ lower edge to $-0.20$ (from $-0.10$). See the [diff against cm471](../evidence/spherical-six-pole-post-turn-claude-continuation-cm471-to-cm48.diff) (`ffcc89d7214cdd1a70d64fd36b41ef931f7a59a6781b27a2e7e53d4e14eac52a`).

**Source of the bounds.** The bounds are those of the support's extended geometry instrument geomx. Its hash at 02:39 UTC is `8e95b77a745dc037415c194ec774fcec23e7153fcde40f1bdc6b3e3c72fe4119`. The cm48 header comment cites the earlier `12f75285…`; that file was edited before it was sent, and the bounds are unchanged (re-read at 02:39 UTC). The review admitted the geomx design in post-turn adjudication 2.

**Receiver range kept.** The receiver range stays $[0.55,2.10]$ rather than geomx's $[1.45,2.10]$; the PI accepted this. The inherited anchor-state controls need $q\approx0.59$. Because the inherited control E10 reads `BOX` at run time, it re-verifies the WHOLE new box: closed forms against direct vectors, and a signed census on 30 × 30 cells requiring $r>0.35$.

**New control B9.** The chart predicates actually used (`in_box` in accel_parts, `in_iv` in the frozen step8 check) must:

- accept a box $10^{-9}$ inside each new edge and refuse one $10^{-9}$ past it;
- accept $q'\in[1.805,1.81]$, while the same box is refused under the old 1.80 edge;
- keep enforcing the unchanged edges.

**Like ladder past rung 2** (by reading cm471 PART1, which cm48 keeps):

- The rungs are $k=0,\dots,12$ with $a_k=\underline{\mathrm{chord}_L}-0.90-0.15k$.
- A rung is skipped unless $\sup h(a_k)<0$ is proved.
- The ladder refuses at the first rung with $a_k\le\max(0,\overline{t_0}-t_G)$. With $\mathrm{chord}_L\approx1.83$, about 6 rungs are usable.
- Rung 3 has lower end $\mathrm{chord}-1.35\approx0.48$. Inferred from P3's rung-2 margin of 0.0307 at step 570, falling about 0.0015 per step, it should engage near steps 585–595.

**Slices.** P4, P5, … run 20 steps each from P3's step-570 strings, after the review admits cm48.

## 2. Q2: correlated $l''$ instrument (design and controls)

- **Design.** See [the design note](spherical-six-pole-post-turn-claude-continuation-ddl-design.md) (`00d63f5495b66645b4821300d4964f571b0466c802ea2b496f0b28d3b325d17d`).
- **Instrument.** [ddl-jet](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet.py), `c0756833a6d8e3fe6fc3fedbea145fc456ba1ca725b53648db2995164c51f444`.
- **Method.** Order-2 Taylor jets in time carry interval values with interval gradients over 14 primitives: the receiver $q$ and $w$, and per class the source $q'$, $v'$, $a'$ and $j'$. On top of the jets sits a first-order mean-value form, intersected with the natural extension.
- **Coding correction (derived).** The design note's fixed-point iteration for the delay jets converges only at rate $|r_{q'}v'|\approx0.3$, so it is not exact. The coefficients $\tau_1$ and $\tau_2$ each solve a linear equation with slope $-B$, where $B=r_{q'}v'$, so the instrument solves them exactly as $T_k/(1+B)$.
- **Controls C1–C5** are listed in the design note. C4 also reports the width budget at the step-540 end.
- **Status.** Controls J1 passed and the band run J2 completed; see sections 3 and 4.

## 3. Runs (receipts)

| run | PID | UTC | exit | wall | peak RSS | record (sha256) |
| --- | --- | --- | --- | --- | --- | --- |
| Kc48, cm48 controls | 80237 | 02:44:12–02:44:55 | 0 | 43.41 s | 124,682,240 | [json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.json) `473960754f271effaec0c1685a7e1dadcc62d9c6dfa8ea44cb2c1b4d4685b599` |
| J1, ddl-jet controls | 81560 | 02:46:34–02:47:16 | 0 | 41.68 s | 134,381,568 | [json](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.json) `440c75a9b918bb1bfe6f46db1b96fabd9dc88f5bd1a0844e434f85bf461890fa` |
| J2, ddl-jet band 532–557, $K=4$ | 83178 | 02:48:52–02:50:09 | 0 | 76.79 s | 134,234,112 | [json](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.json) `27170902f7e9cd21b7c31ad7a50e5fba472d088168cb573c11c7b88284cb032a` |

**Kc48 (measured; instrument cm48).** All 69 controls pass. E10 on the new box gives like $r_{\min}=0.355322$, above the 0.35 threshold, with $D>0$ on every cell of every class. Every B9 flag is true.

**J1 (measured; instrument ddl-jet).** All 71 controls pass.

- **C1.** It agrees with the independent direct-vector and `mp.diff` reference to 12 or more digits, for example $l''=-0.0140598461$ and $r''=-0.1926322928$.
- **C2.** The mean-value form is 6.34 times narrower than the natural form.
- **C3.** All three negatives are excluded.
- **C4.** The jet is narrower than the frozen evaluation in every item; for $a'$, 0.040 against 0.133.
- **At the step-540 end.** $l''=[-0.085842,-0.041884]$.

## 4. Q2 result: $l''<0$ on every whole step 532–557

Measured (instrument ddl-jet, mpmath intervals at 30 digits, $K=4$; domain: the certified records r1–r5 and P1–P3; the source jerk is the stored-rate premise):

- Every whole step from 532 to 557 has $l''$ proved NEGATIVE, 26 of 26.
- The hulls run from $[-0.060369,-0.017816]$ at step 532 to $[-0.151293,-0.087156]$ at step 557; the smallest margin is at 532.
- The width budget is led by the like source-jerk box: $0.016$ at step 532 and $0.024$ at step 557.

Derived from these enclosures (the certificate is the review's):

- The whole-step spans cover every instant from the step-531 end to the step-557 end, so $l'$ is strictly decreasing there.
- With $l'>0$ at every instant through the step-531 end (path-continuation adjudication 12), and $l'<0$ at the step-557 end (the support's S6; cross-code, as used in adjudication 13), $l'$ has exactly one zero in $(7.176684593623649597167959,\,7.436684709182828044891367)$, and it is a strict sign change.
- So the second support turn is UNIQUE and STRICT.

Falsifiers:

- an independent $l''\ge0$ proved anywhere on 532–557;
- a true value outside an enclosure;
- $l'\le0$ proved before the step-531 end.

## 5. P4 refusal at step 571 and its cause: the resume serializer drops signs (soundness)

| run | PID | UTC | exit | wall | peak RSS | record (sha256) |
| --- | --- | --- | --- | --- | --- | --- |
| P4, cm48 570 → 590 | 84834 | 02:51:56–02:52:42 | 0 | 45.21 s | 109,838,336 | [json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.json) `7a0916774b14bf5a1617370e74edcb1a9b3f8fe92bb090c3555381a987a9c59e` |
| D1, diag571-v2 | 88035 | 02:59:21–02:59:48 | 0 | 27.36 s | 137,625,600 | [json](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.json) `2cb2993f5fe91aaf1f4d99749d58d422ae88f9f24252ad6d56d593d9e312467a` |

**P4 (measured).** Step 571 was refused: "EMPTY intersection of the reconstructed (affine) end and the frozen-step end". No step was certified.

**The chart change is not the cause** (derived by code reading). `BOX` enters only refusal predicates, and every box at step 571 lies inside the old chart too.

**D1, the known case (measured).** Step 551, recomputed from P2's `affine_last` with the reader through step 550, reproduces P3's recorded corr and end strings exactly (KNOWN_OK true).

**D1, the resume check (measured).** The hull of P3's `affine_last` lies inside the step-570 end strings in $q$. In $w$ it does not: it is their exact mirror, $[+0.04832,+0.05685]$ against $[-0.05685,-0.04832]$.

**D1, step 571 (measured).**

- **Box step.** It closes with $w\in[-0.061281,-0.052186]$.
- **Affine update.** $w\in[+0.044099,+0.052795]$ with either remainder form. The gap is 0.09629, so the remainder form is not the cause.

**Cause** (measured by reading v4.4 line 390, the mpmath source and the stored file):

- `ser(x)` stores `x.man`. In the shared venv's mpmath (`ctx_mp_python.py` line 124) that is the UNSIGNED mantissa, so every serialized number loses its sign.
- P3's `affine_last` has no negative component in any of its 1250 columns, and $c_w\approx+0.0526$ where $w\approx-0.0526$.

**Consequences** (derived):

- Every resume since r2 deserialized a form whose negative columns are reflected. Such columns exist after the first step, because $n_w=m_w+D\,j\,m_q$ with $j<0$.
- That form has the same hull at the resume instant. From then on its propagation is not a proof that it contains the true state.
- The certified end strings intersect the affine hull with the frozen box end. So the soundness of records after each resume (r2–r5, P1–P3) is not established by the instrument's own argument.
- r1 (one continuous run) and the box steps themselves are not affected.
- Results resting on those records, including J2 here, inherit the question until it is settled.

**Proposed repair.** A signed serializer in a new version with an exact round-trip control. Then a resume-free check of the existing records (box-only steps from predecessor ends), and a rebuild from the anchor if required.

## 6. Repair (cm49) and rebuild from the anchor

**The instrument.** [cm49](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49.py) (`a0880ac61065beea4591780236d37b25affb9dd73736548a5c2aa7123ee3c182`; the run copy of the first version is kept as `cm49-v1.py`, `0ece73d4…`) is cm48 with three changes:

- a signed writer, ser49, which takes the sign from `_mpf_[0]`;
- the same reader text as before;
- a format tag `signed-v49`, without which a resume is refused.

**Its controls.** The S-ser control checks three things: exact round trips of the form, including a negative centre and mixed-sign columns; that the old writer fails that round trip; and a known resume case in which two in-run steps equal one step plus a JSON save, a resume and the second step, string for string.

**K49 (PID 90745, compute incident).** It failed with exit 1: a NameError, because `aff_deser` is defined only after the controls. The resume now uses the identical text `_aff_deser49`.

**K49b (PID 91406).** All 70 controls pass. Record `4bf99f0b2c100b6cfb997b9abf32c4a5b38f760130265572d11f55b44c58cd99`.

**Rebuild slices** (measured; instrument cm49; anchor 154; every end through 436 meets its frozen accepted record):

| slice | PID | UTC | wall | steps | record (sha256) | strings identical to the old chain |
| --- | --- | --- | --- | --- | --- | --- |
| R1′ | 91984 | 03:09:40–03:10:41 | 60.78 s | 155–220 | `f81012daaaf76d660ec76fd731193a020c078d26e6487aa0e4ba2477874869ce` | 66 of 66 (old r1 had no resume) |
| R2′ | 92580 | 03:12:18–03:13:22 | 64.22 s | 221–295 | `93eb668c642752b3077102e03acad2b216d929c4a0a39158559b450fb9a263dd` | 4 of 75; first difference at 225, after the old r1→r2 resume |
| R3′ | 93331 | 03:15:04–03:16:19 | 75.02 s | 296–385 | `034afdb7660197afaf7c38bc7126ce3ecfe1ff5e03887b45970882a7f4029d79` | 0 of 90 |

**How the rebuilt ends compare.** Every rebuilt end overlaps the old one; this was checked at double precision, so it is display-level only. The rebuilt widths are slightly narrower.

**What the agreement does and does not show.** The overlap is consistency, not a proof that the old records were sound. The rebuilt chain is the sound one.

| slice | PID | UTC | wall | steps | record (sha256) | strings identical to the old chain |
| --- | --- | --- | --- | --- | --- | --- |
| R4′ | 95210 | 03:20:30–03:21:47 | 77.60 s | 386–475 | `051f2252c883a7eca7c2c3d78189827acbf2a6a7a32c56055842bf36b1feb5c0` | 0 of 90 |
| R5′ | 96133 | 03:23:28–03:24:38 | 69.74 s | 476–550 | `acbafff3e4f45711f18ed66b13256c5ff14dfa793ec4b941f895d3eab234015f` | 0 of 75 |
| R6′ | 96708 | 03:26:15–03:26:51 | 35.86 s | 551–570 | `c1454e398553ca639a2ed2412472602b2c3c3d7d8459942f3d599bc764c48c2e` | 0 of 20 |

**Events on the rebuilt chain** (measured end and whole-step signs; instrument cm49; the certificates are the review's):

- **First support turn.** $l'$ is proved negative at every end through 409, spans zero on 410–436, and is proved positive from the 437 end on.
- **Path turn.** $w$ is proved positive at every end through 556, $[0.0004247,0.0075646]$. It spans zero at 557 and is proved negative from the 558 end on, $[-0.0076193,-0.0001598]$. $a$ is proved negative on every whole step 551–570.
- **Second support turn.** $l'$ is proved positive at the 530 and 531 ends, spans zero on 532–561, and is proved negative from the 562 end on.

These are the same end-sign patterns as the old chain. Every rebuilt end overlaps the old one, and every end through 436 meets its frozen accepted record.

**ddl-jet-v2** ([file](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-v2.py), `aa51eb791f5bf013061ed4d8e84d5e07738bf23ec201144188ee05082e1d3d5b`). Its only change from ddl-jet is the record list: R1′–R6′ by sha256, each required to carry the signed-v49 tag. It is for re-running Q2 on the sound chain.

## 7. Q2 on the rebuilt chain (J3)

J3 ran ddl-jet-v2 over steps 532–557 with $K=4$: PID 98125, 03:31:10–03:31:49 UTC, wall 39.09 s, record `5767cf817141747e837396b8654a9962d5454a6074e7aec1ec5f396d9c6055f5`. All 66 inherited controls and C1–C5 passed in the same invocation, before the target.

**Measured** (instrument ddl-jet-v2; domain: the signed rebuild R1′–R6′):

- $l''$ is proved NEGATIVE on every whole step 532–557, 26 of 26.
- The hulls run from $[-0.059919,-0.018273]$ at step 532 to $[-0.150483,-0.087992]$ at step 557. They agree with J2 on the old records to about $10^{-3}$.

**Derived** (the certificate is the review's):

- $l'$ is strictly decreasing on $[t_{531},t_{557}]$, so it has at most one zero there.
- On this chain $l'>0$ at the 531 end, but $l'$ only spans zero at the 557 end. The first proved-negative end is 562.
- Uniqueness up to 562 therefore needs $l''<0$ on 558–562 as well (proposed run J4), or a negative $l'$ at the 557 end re-evaluated on the rebuilt chain.

**Update from the PI (03:35 UTC).** J4 is not needed. The support's S14, run on the rebuilt chain, proves $l'<0$ at the 556 end, $[-0.013508,-0.000710]$, and $l'>0$ at every end 531–541 (cross-code). With J3's $l''<0$ on every whole step 532–557, $l'$ therefore has exactly one zero, and it is a strict sign change, between the 541 end and the 556 end. The certificate is the review's.

## 8. Status of the questions (continuation role)

- **Q2, uniqueness of the second support turn.** This role has delivered $l''<0$ proved on every whole step 532–557, both on the old records (J2) and on the signed rebuild (J3). The derived uniqueness and strictness rest on the review's ruling, using the support's end signs.
- **Q3, continuation past step 570.** Not achieved.
  - cm48 (the extended chart) was admitted. Its first slice P4 was refused at step 571.
  - The refusal exposed the serializer defect. The defect was repaired in cm49, and the chain was rebuilt from the anchor to step 570 (R1′–R6′).
  - Every rebuilt end through 436 meets its frozen accepted record, and the event end signs reappear.
  - The next bounded step is a slice P4′ from R6′ (cm49, 570 → about 590) on its own grant.
- **Like ladder past rung 2.** Stated from the code in section 1. It was not exercised in this campaign: no slice past 570 ran.

## 9. Incidents

- **K49, PID 90745, exit 1.** A NameError in my own S-ser control: `aff_deser` is defined only after the controls. Fixed in cm49 `a0880ac6…`; the run copy is kept as `cm49-v1.py`.
- **P4, PID 84834, refused at step 571.** An empty intersection of the affine end and the box end. The cause, the unsigned serializer, is a soundness defect present since October. It was found by D1 (PID 88035) after a known case reproduced step 551 exactly.
- **Two receipt corrections.** The cm48 header still cites the pre-edit geomx hash `12f75285…`; the current hash is `8e95b77a…`. One receipt first gave the wrong PID for P4 and was corrected to 84834.
- **Python use and background processes.** No Python ran without a grant. No background process was started. Foreign processes were never touched.

## 10. Manifest (self-excluded: this report is not listed; `shasum -a 256` and `stat` at closeout)

| file | bytes | sha256 |
| --- | --- | --- |
| [spherical-six-pole-post-turn-claude-continuation-ddl-design.md](spherical-six-pole-post-turn-claude-continuation-ddl-design.md) | 9982 | `00d63f5495b66645b4821300d4964f571b0466c802ea2b496f0b28d3b325d17d` |
| [spherical-six-pole-post-turn-claude-continuation-cm471-to-cm48.diff](../evidence/spherical-six-pole-post-turn-claude-continuation-cm471-to-cm48.diff) | 4632 | `ffcc89d7214cdd1a70d64fd36b41ef931f7a59a6781b27a2e7e53d4e14eac52a` |
| [spherical-six-pole-post-turn-claude-continuation-cm48-to-cm49.diff](../evidence/spherical-six-pole-post-turn-claude-continuation-cm48-to-cm49.diff) | 8598 | `49bed635f182463dd50e7eed0e29f90d0ed7f0355a86822b3f3241cacd2ea69b` |
| [spherical-six-pole-post-turn-claude-continuation-cm49v1-to-cm49.diff](../evidence/spherical-six-pole-post-turn-claude-continuation-cm49v1-to-cm49.diff) | 734 | `1912faa2b70a4aedcfa6accd321270a2ba2942117999ff2bbbff5df698497bc5` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.json](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.json) | 91107 | `440c75a9b918bb1bfe6f46db1b96fabd9dc88f5bd1a0844e434f85bf461890fa` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.out](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.out) | 8751 | `0a992c78f23291ea505823ddaed122dd845776e9df48b61c13232d3371294160` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.out.time) | 777 | `dfa3e8dc7227efd48139c1c076d291c0e17b2a6c81d9ab0abb2119f13934be24` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.json](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.json) | 195647 | `27170902f7e9cd21b7c31ad7a50e5fba472d088168cb573c11c7b88284cb032a` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.out](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.out) | 12087 | `aa6abc22ad0fb03c8b33dea2961ec5b144646a7558180b4718a306396305accb` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.out.time) | 777 | `8314bc498abaf7d7397f6159a9ea93821b8c7d6fb63163e7855ee87fafe0c2fc` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.json](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.json) | 195643 | `5767cf817141747e837396b8654a9962d5454a6074e7aec1ec5f396d9c6055f5` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.out](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.out) | 12081 | `575ead8fc34386e1e3c4422ecd5552d81ccbe5f8e36f15f5231be24c76f13a3b` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.out.time) | 777 | `2087fbde08fb6038c071061be611a609ad757dae328d4f21533bd561aa80c079` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-v1-to-v2.diff](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-v1-to-v2.diff) | 3734 | `9fd54044478aab850df97ebf998bcc845ef54ffde5da79e3cf1bb91ca44657ab` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-v2.py](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-v2.py) | 26733 | `aa51eb791f5bf013061ed4d8e84d5e07738bf23ec201144188ee05082e1d3d5b` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet.py](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet.py) | 26593 | `c0756833a6d8e3fe6fc3fedbea145fc456ba1ca725b53648db2995164c51f444` |
| [spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.json](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.json) | 92594 | `2cb2993f5fe91aaf1f4d99749d58d422ae88f9f24252ad6d56d593d9e312467a` |
| [spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.out](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.out) | 10094 | `bd939367c2ba2158bc8edc7eacb8808abe144057f7be68bb692d35c763b5fb93` |
| [spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.out.time) | 777 | `b8a6dc598cb3053c81e40e1c2f4e527b90f773568b74e317b74b4e4a8654ad43` |
| [spherical-six-pole-post-turn-claude-continuation-diag571-v2.py](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571-v2.py) | 10354 | `133bef1f79f4724dded8a96f0beb7492518ee5a3da8a2ae7ab2ff92e8844f35d` |
| [spherical-six-pole-post-turn-claude-continuation-diag571.py](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571.py) | 7494 | `ad57ef20a1f97a851457e5daa07475128eec3885086a8aae053fbcecd29a1e5e` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.json) | 106518 | `7a0916774b14bf5a1617370e74edcb1a9b3f8fe92bb090c3555381a987a9c59e` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.out) | 8816 | `09bced57193b5d7e917216580d869b0c74428d321ab913d4bf82a0b247ec12cb` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.out.time) | 777 | `09bb82151899cd6519396418caeb8d250b41030a825dda8e513eb344829acdd3` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.json) | 95799 | `473960754f271effaec0c1685a7e1dadcc62d9c6dfa8ea44cb2c1b4d4685b599` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.out) | 8946 | `ffb8188a3bf8d3880135087ea9944768b70e6db766bf5c44be4d6d225669b58f` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.out.time) | 777 | `c6a297636d125c42d71a30490bf2c1e190c8546ab9f101b073dfecf5c8914aa9` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48.py](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48.py) | 33948 | `5e67e4b09558d19f5ffef3c3127105bc32139c03768aa83b965397c9addf7646` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.json) | 2030066 | `f81012daaaf76d660ec76fd731193a020c078d26e6487aa0e4ba2477874869ce` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.out) | 19481 | `5de356be16a8d15d7676e6aaebd5d5b0b6bdec276bb3e7a189252d99bd73bb8e` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.out.time) | 777 | `573e51fe65bca185709c063eb4658c78b3e51f2189445aad6b7b5941e20d927a` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.json) | 2325742 | `93eb668c642752b3077102e03acad2b216d929c4a0a39158559b450fb9a263dd` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.out) | 20723 | `c0a5ff8066c3a1e5baca46394d7f817e3472316b3f62e33027d8a9b6ed015511` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.out.time) | 777 | `ecca804941429b25e2f2fbda4d037bd36e0e3554a039bf53e45e457ea2b11993` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.json) | 2803638 | `034afdb7660197afaf7c38bc7126ce3ecfe1ff5e03887b45970882a7f4029d79` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.out) | 23049 | `35a189ce6401dc49fa5b637a1516b7a411ff5ceea57ca91d431e296a81f1bb6d` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.out.time) | 777 | `d4961bc520e9041d6ce691a19f2f61f32f5624eec8688bad8924cbfc29c83d74` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.json) | 2837723 | `051f2252c883a7eca7c2c3d78189827acbf2a6a7a32c56055842bf36b1feb5c0` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.out) | 22679 | `30af5107dcca995b007a80ba714e22361168475122bdc688abb2ccb45a95b300` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.out.time) | 777 | `768c89c1f7db5142774f78dd34b3fb14444343e540bf990d0483955ad5917cef` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.json) | 2434654 | `acbafff3e4f45711f18ed66b13256c5ff14dfa793ec4b941f895d3eab234015f` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.out) | 20038 | `326c1ecf96b7bc3a7af9a8d050a9808da63ea3ead4afde551549da5eb350279b` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.out.time) | 777 | `ff96e172c05b9b520c3f1dbb4e9e7a7163a6864313fe3b4441b60efd87aa482c` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.json) | 851953 | `c1454e398553ca639a2ed2412472602b2c3c3d7d8459942f3d599bc764c48c2e` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.out) | 11859 | `b765dc08f705ca16a9cbc123aa37c84591ad65448dcbafe0f12f0a9669bb8096` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.out.time) | 777 | `9adefc87a0b52cc9f325ce48b6b38c808fe7b895dc05734802f85192ef3f5e7a` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-controls.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-controls.out) | 4722 | `60398858266478f381fc5bc7ee9d6f0c5cf9bcd93bb9bdf9aab361d0e0b32aa9` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-controls.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-controls.out.time) | 1815 | `66b594c988fdc02195254c7940edd0db533380d14b3aa3bdd3f095c66a3931bb` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-v1.py](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-v1.py) | 41311 | `0ece73d43e8963b8742995fa615ab468f8fd9891e505f1ce0893f721ca11e1fd` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49.py](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49.py) | 41581 | `a0880ac61065beea4591780236d37b25affb9dd73736548a5c2aa7123ee3c182` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.json) | 97236 | `4bf99f0b2c100b6cfb997b9abf32c4a5b38f760130265572d11f55b44c58cd99` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.out) | 9104 | `4a78cd8ca9074702c16cec44514d0f63b3aea3f95c3f9cb55820d243833e27de` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.out.time) | 777 | `69bbb0a7dba7b48c1e872ec4ca2c3fc2641dced2c4981f4a87c3d854b32f9275` |

Total: 53 files, 14578360 bytes. Scratch `.tmp/six-pole-post-turn/continuation/`: 92 KiB (`du -sk`). Nothing is in `.local-data`. No Git writes were made.

## 11. Q3 continuation on the rebuilt chain (added after the manifest; manifest rows for new files are in section 12)

**P4′** (instrument cm49, resumed from R6′, steps 570 → 615). PID 1763, 03:50:10–03:51:01 UTC, wall 51.42 s, record `4fc261379d8d4a2f9b21f9f8c1f106e14913b6d3f68a8d0df5416345dfb04c08`. All 45 steps are certified, with no refusal.

Measured on every step 571–615:

- **Signs.** $w<0$ at every end and $a<0$ on every whole step, with $|a|$ shrinking (whole-step upper bound $-0.388\to-0.344$). $l<0$, $l'<0$ and $r'<0$ at every end.
- **Per-class signs.** Constant: tangent $(-,-,+)$, radial $(-,+,-)$, delayed source $w'$ $(+,+,+)$.
- **Events.** None: no speed extremum, no support or radial turn, no partner sign change.
- **Brackets.** The like class is on rung 2, with its lower margin reaching a minimum of 0.01708 at step 591 and then rising, so the like root rises after the turn. The unlike class is on rung 0 with an upper margin of at least 0.239.
- **Chart.** Source $q'\le1.81551$ (margin 0.0145 to 1.83), source $w'\ge0.0339$, receiver $q\ge1.7394$.
- **Widths at the step-615 end.** $q$ 0.0117 and $w$ 0.0177.

Inferred: the like delayed read crosses the path turn near step 626, after which the like source $w'$ becomes negative.

**P5′** (resumed from P4′, steps 615 → 660). PID 2621, 03:52:55–03:53:47 UTC, wall 51.79 s, record `22629d11da8a32445e043b1f9911fecdf53a43aa9e9251c9fac29dd600261fe2`. All 45 steps are certified, with no refusal.

Measured (instrument cm49):

- **Speed and acceleration.** $w<0$ at every end; at step 660, $w=[-0.389524,-0.366111]$. $a<0$ on every whole step, so there is no speed extremum. $|a|$ is shrinking: the whole-step upper bound is $-0.232$ at step 660.
- **Support and radial rates.** $l$, $l'$ and $r'$ are negative at every end.
- **Event: like delayed source velocity.** The like source's $w'$ spans zero at ends 626–631 and is proved negative from the 632 end. The like transmitter factor $D$ moves from below one to above one (straddling one on about 626–634). $M_{\text{like}}<0$ throughout.
- **Event: antipode tangent sign.** The antipode tangent contribution is positive through the 648 end, spans zero on 649–651, and is proved negative from the 652 end; its $N$ sign changes with it.
- **Brackets.** The like class used rung 2, with rung 1 on 2 calls. Its smallest lower margin was $1.3\times10^{-5}$ at step 659.
- **Chart.** Source $q'$ peaked at 1.817569 and stays under 1.83. Source $w'\ge-0.102894$, falling about 0.003 per step. Receiver $q\ge1.5962$.

Inferred: the $w'=-0.20$ edge is reached near step 690, and the receiver crosses $q=1.45$ near step 698. Continuing past that edge needs a further chart extension.

**P6′, the last slice** (resumed from P5′, steps 660 → 688). PID 3260, 03:57:59–03:58:40 UTC, wall 41.03 s, record `0bd1084778c126ce67f74bd820a9aaea3a1707d568b3adf769379dddb965996d`. All 28 steps are certified, with no refusal.

Measured (instrument cm49):

- **Speed and acceleration.** $w<0$ at every end; at step 688, $w=[-0.454995,-0.428986]$. $a<0$ on every whole step; the whole-step box at 688 is $[-0.23011,-0.17574]$, so there is no speed extremum.
- **Support and radial rates.** $l$, $l'$ and $r'$ are negative at every end.
- **Per-class signs.** Constant: tangent $(-,-,-)$, radial $(-,+,-)$, delayed source $w'$ $(+,-,+)$.
- **Brackets.** The like root is rising, and the ladder returned to rung 1. The smallest like lower margin is 0.00301.
- **Chart margins.** Source $w'\ge-0.176394$ (margin 0.0236 to $-0.20$), source $q'\le1.80957$, receiver $q\ge1.478566$.

## 12. Final status (continuation role, post-turn campaign)

- **Q2.** $l''<0$ is proved on every whole step 532–557, both on the old records (J2) and on the signed rebuild (J3). With the support's end signs (S14), uniqueness and strictness of the second support turn follow. The certificate is the review's (adjudication 16).
- **Q3.**
  - A soundness defect in the resume serializer was found when step 571 was refused. It was repaired (cm49), and the history was rebuilt from the step-154 anchor to step 570. The three events were re-certified by the review on the rebuilt chain (adjudications 15–17).
  - The chain was then continued to step 688 with no refusal.
  - Events after the turn: the like source's delayed $w'$ turns negative from the 632 end; the antipode's tangent contribution turns negative from the 652 end.
  - No speed extremum, and no support or radial turn, through step 688.
  - The continuation stops before the $w'=-0.20$ chart edge, which is inferred to be reached near step 695.
- **Next bounded steps.**
  1. A chart extension below $w'=-0.20$, from the support, with the review's admission.
  2. Further slices from P6′ toward the zero of $a$, inferred beyond step 700, which is a maximum of $|w|$ on the return path.
  3. The source-jerk refinement for the $l''$ jets, if a sharper margin is ever needed.

## 13. Final manifest (self-excluded: this report is not listed; `shasum -a 256` and `stat` at 03:59:17 UTC; it supersedes section 10)

| file | bytes | sha256 |
| --- | --- | --- |
| [spherical-six-pole-post-turn-claude-continuation-ddl-design.md](spherical-six-pole-post-turn-claude-continuation-ddl-design.md) | 9982 | `00d63f5495b66645b4821300d4964f571b0466c802ea2b496f0b28d3b325d17d` |
| [spherical-six-pole-post-turn-claude-continuation-cm471-to-cm48.diff](../evidence/spherical-six-pole-post-turn-claude-continuation-cm471-to-cm48.diff) | 4632 | `ffcc89d7214cdd1a70d64fd36b41ef931f7a59a6781b27a2e7e53d4e14eac52a` |
| [spherical-six-pole-post-turn-claude-continuation-cm48-to-cm49.diff](../evidence/spherical-six-pole-post-turn-claude-continuation-cm48-to-cm49.diff) | 8598 | `49bed635f182463dd50e7eed0e29f90d0ed7f0355a86822b3f3241cacd2ea69b` |
| [spherical-six-pole-post-turn-claude-continuation-cm49v1-to-cm49.diff](../evidence/spherical-six-pole-post-turn-claude-continuation-cm49v1-to-cm49.diff) | 734 | `1912faa2b70a4aedcfa6accd321270a2ba2942117999ff2bbbff5df698497bc5` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.json](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.json) | 91107 | `440c75a9b918bb1bfe6f46db1b96fabd9dc88f5bd1a0844e434f85bf461890fa` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.out](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.out) | 8751 | `0a992c78f23291ea505823ddaed122dd845776e9df48b61c13232d3371294160` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J1-controls.out.time) | 777 | `dfa3e8dc7227efd48139c1c076d291c0e17b2a6c81d9ab0abb2119f13934be24` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.json](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.json) | 195647 | `27170902f7e9cd21b7c31ad7a50e5fba472d088168cb573c11c7b88284cb032a` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.out](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.out) | 12087 | `aa6abc22ad0fb03c8b33dea2961ec5b144646a7558180b4718a306396305accb` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J2-532-557.out.time) | 777 | `8314bc498abaf7d7397f6159a9ea93821b8c7d6fb63163e7855ee87fafe0c2fc` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.json](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.json) | 195643 | `5767cf817141747e837396b8654a9962d5454a6074e7aec1ec5f396d9c6055f5` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.out](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.out) | 12081 | `575ead8fc34386e1e3c4422ecd5552d81ccbe5f8e36f15f5231be24c76f13a3b` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-J3-532-557.out.time) | 777 | `2087fbde08fb6038c071061be611a609ad757dae328d4f21533bd561aa80c079` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-v1-to-v2.diff](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-v1-to-v2.diff) | 3734 | `9fd54044478aab850df97ebf998bcc845ef54ffde5da79e3cf1bb91ca44657ab` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet-v2.py](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet-v2.py) | 26733 | `aa51eb791f5bf013061ed4d8e84d5e07738bf23ec201144188ee05082e1d3d5b` |
| [spherical-six-pole-post-turn-claude-continuation-ddl-jet.py](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet.py) | 26593 | `c0756833a6d8e3fe6fc3fedbea145fc456ba1ca725b53648db2995164c51f444` |
| [spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.json](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.json) | 92594 | `2cb2993f5fe91aaf1f4d99749d58d422ae88f9f24252ad6d56d593d9e312467a` |
| [spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.out](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.out) | 10094 | `bd939367c2ba2158bc8edc7eacb8808abe144057f7be68bb692d35c763b5fb93` |
| [spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571-v2-D1.out.time) | 777 | `b8a6dc598cb3053c81e40e1c2f4e527b90f773568b74e317b74b4e4a8654ad43` |
| [spherical-six-pole-post-turn-claude-continuation-diag571-v2.py](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571-v2.py) | 10354 | `133bef1f79f4724dded8a96f0beb7492518ee5a3da8a2ae7ab2ff92e8844f35d` |
| [spherical-six-pole-post-turn-claude-continuation-diag571.py](../evidence/spherical-six-pole-post-turn-claude-continuation-diag571.py) | 7494 | `ad57ef20a1f97a851457e5daa07475128eec3885086a8aae053fbcecd29a1e5e` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.json) | 106518 | `7a0916774b14bf5a1617370e74edcb1a9b3f8fe92bb090c3555381a987a9c59e` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.out) | 8816 | `09bced57193b5d7e917216580d869b0c74428d321ab913d4bf82a0b247ec12cb` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.out.time) | 777 | `09bb82151899cd6519396418caeb8d250b41030a825dda8e513eb344829acdd3` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.json) | 95799 | `473960754f271effaec0c1685a7e1dadcc62d9c6dfa8ea44cb2c1b4d4685b599` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.out) | 8946 | `ffb8188a3bf8d3880135087ea9944768b70e6db766bf5c44be4d6d225669b58f` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-controls.out.time) | 777 | `c6a297636d125c42d71a30490bf2c1e190c8546ab9f101b073dfecf5c8914aa9` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm48.py](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48.py) | 33948 | `5e67e4b09558d19f5ffef3c3127105bc32139c03768aa83b965397c9addf7646` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P4.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P4.json) | 1597726 | `4fc261379d8d4a2f9b21f9f8c1f106e14913b6d3f68a8d0df5416345dfb04c08` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P4.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P4.out) | 15514 | `a40958fdbbe583ed605ab7511538073c9c8433e0d014d82207e708780ec73dcb` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P4.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P4.out.time) | 777 | `cbb8cd2c4ae821d40509ac1a7e0e6c17142c385e4732c79ff0bc3d8de6faa71f` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P5.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P5.json) | 1617023 | `22629d11da8a32445e043b1f9911fecdf53a43aa9e9251c9fac29dd600261fe2` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P5.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P5.out) | 15483 | `84d1adbc98120385787b49dddb7df3e2be6145e163460adf9490fd3ee589b5d4` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P5.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P5.out.time) | 777 | `ca9915a2e3609132e2e6f5461e817daeaa8925ea1e32f3119e640612807304c5` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P6.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P6.json) | 1136062 | `0bd1084778c126ce67f74bd820a9aaea3a1707d568b3adf769379dddb965996d` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P6.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P6.out) | 12988 | `e6098adb4fed463cf4c02437a6ba2f57920d6404319562ca9608b10df974333f` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P6.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P6.out.time) | 777 | `734a8e772157975cde877079cffd651c3061e5bd8c2f1c5a1475adeb3c534786` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.json) | 2030066 | `f81012daaaf76d660ec76fd731193a020c078d26e6487aa0e4ba2477874869ce` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.out) | 19481 | `5de356be16a8d15d7676e6aaebd5d5b0b6bdec276bb3e7a189252d99bd73bb8e` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R1.out.time) | 777 | `573e51fe65bca185709c063eb4658c78b3e51f2189445aad6b7b5941e20d927a` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.json) | 2325742 | `93eb668c642752b3077102e03acad2b216d929c4a0a39158559b450fb9a263dd` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.out) | 20723 | `c0a5ff8066c3a1e5baca46394d7f817e3472316b3f62e33027d8a9b6ed015511` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R2.out.time) | 777 | `ecca804941429b25e2f2fbda4d037bd36e0e3554a039bf53e45e457ea2b11993` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.json) | 2803638 | `034afdb7660197afaf7c38bc7126ce3ecfe1ff5e03887b45970882a7f4029d79` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.out) | 23049 | `35a189ce6401dc49fa5b637a1516b7a411ff5ceea57ca91d431e296a81f1bb6d` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R3.out.time) | 777 | `d4961bc520e9041d6ce691a19f2f61f32f5624eec8688bad8924cbfc29c83d74` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.json) | 2837723 | `051f2252c883a7eca7c2c3d78189827acbf2a6a7a32c56055842bf36b1feb5c0` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.out) | 22679 | `30af5107dcca995b007a80ba714e22361168475122bdc688abb2ccb45a95b300` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.out.time) | 777 | `768c89c1f7db5142774f78dd34b3fb14444343e540bf990d0483955ad5917cef` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.json) | 2434654 | `acbafff3e4f45711f18ed66b13256c5ff14dfa793ec4b941f895d3eab234015f` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.out) | 20038 | `326c1ecf96b7bc3a7af9a8d050a9808da63ea3ead4afde551549da5eb350279b` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.out.time) | 777 | `ff96e172c05b9b520c3f1dbb4e9e7a7163a6864313fe3b4441b60efd87aa482c` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.json) | 851953 | `c1454e398553ca639a2ed2412472602b2c3c3d7d8459942f3d599bc764c48c2e` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.out) | 11859 | `b765dc08f705ca16a9cbc123aa37c84591ad65448dcbafe0f12f0a9669bb8096` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.out.time) | 777 | `9adefc87a0b52cc9f325ce48b6b38c808fe7b895dc05734802f85192ef3f5e7a` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-controls.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-controls.out) | 4722 | `60398858266478f381fc5bc7ee9d6f0c5cf9bcd93bb9bdf9aab361d0e0b32aa9` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-controls.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-controls.out.time) | 1815 | `66b594c988fdc02195254c7940edd0db533380d14b3aa3bdd3f095c66a3931bb` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49-v1.py](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-v1.py) | 41311 | `0ece73d43e8963b8742995fa615ab468f8fd9891e505f1ce0893f721ca11e1fd` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49.py](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49.py) | 41581 | `a0880ac61065beea4591780236d37b25affb9dd73736548a5c2aa7123ee3c182` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.json](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.json) | 97236 | `4bf99f0b2c100b6cfb997b9abf32c4a5b38f760130265572d11f55b44c58cd99` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.out](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.out) | 9104 | `4a78cd8ca9074702c16cec44514d0f63b3aea3f95c3f9cb55820d243833e27de` |
| [spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.out.time](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.out.time) | 777 | `69bbb0a7dba7b48c1e872ec4ca2c3fc2641dced2c4981f4a87c3d854b32f9275` |

Total: 62 files, 18975487 bytes. Scratch `.tmp/six-pole-post-turn/continuation/`: 236 KiB (`du -sk`). Nothing is in `.local-data`. No Git writes were made. No background processes were started; the check at closeout found no Python process of this role.
