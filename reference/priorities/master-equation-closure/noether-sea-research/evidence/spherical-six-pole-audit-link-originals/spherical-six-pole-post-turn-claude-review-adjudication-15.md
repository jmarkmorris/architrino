# Six-pole post-turn campaign, review: adjudication 15 (rebuilt slices R4′–R6′ accepted; the PATH TURN is RE-CERTIFIED on the rebuilt chain; ddl-jet v2 admitted)

Written 2026-10-21 by the review role, after my granted run GP3.

## 1. Subjects and run (measured)

**Slices (cm49).** All three carry the `signed-v49` tag. Each resumes from the previous tagged slice.

| slice | sha256 | steps |
|---|---|---|
| [R4′](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R4.json) | `051f2252c883a7eca7c2c3d78189827acbf2a6a7a32c56055842bf36b1feb5c0` | 386–475 |
| [R5′](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R5.json) | `acbafff3e4f45711f18ed66b13256c5ff14dfa793ec4b941f895d3eab234015f` | 476–550 |
| [R6′](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-R6.json) | `c1454e398553ca639a2ed2412472602b2c3c3d7d8459942f3d599bc764c48c2e` | 551–570 |

**My run (GP3).** audit10 (`b2b90c7a…`, unchanged). The `--own` chain was R1′–R6′ only, with targets R4′–R6′.

| field | value |
|---|---|
| PID | 97243 |
| time (UTC) | 03:28:51–03:29:29 |
| exit | 0 |
| wall time | 37.49 s |
| peak RSS | 134,807,552 B |
| census | no Python process present |

| output | sha256 |
|---|---|
| [json](../evidence/spherical-six-pole-post-turn-claude-review-audit10-GP3-R4R5R6.json) | `89f6e7a04809c577446a1e78ee817da513eb068d85f1b0d0266dca29d8cfe5d3` |
| consistency | `06ed4ff6…` |
| out | `1e3cf117…` |
| out.time | `d7eeaa29…` |

## 2. Findings (measured)

- **Audit.** 68/68 controls pass for each target. All 185 steps (386–570) audit OK, with 0 fails and 0 sign disagreements. All 282 frozen-consistency rows meet, through 436.
- **Whole-step $a$.** It is NEGATIVE on every whole step 386–570, on both readings (the stored range and my law on the boxes).
- **Whole-step $w$ (the `VS` boxes).** The lower bound is POSITIVE on every step 155–385 (minimum 0.32950, from GP2) and on every step 386–556 (minimum 0.000275666, at 556).
- **Ends near the turn (end boxes of the audited records; $a$ from my own end evaluation).**

| end | $w$ | $a$ (mine) |
|---|---|---|
| 556 | $[+0.00042472961,\,+0.0075646005]$ | $[-0.40985499,-0.37538006]$ |
| 557 | $[-0.0035868611,\,+0.0037117136]$ | $[-0.41213765,-0.37715520]$ |
| 558 | $[-0.0076192689,\,-0.00015977500]$ | $[-0.41435179,-0.37884558]$ |

## 3. PATH TURN re-certified (derived, under [adjudication 11](spherical-six-pole-post-turn-claude-review-adjudication-11.md)(c)1)

- **(i) Positive side.** $w>0$ at every instant of $(0,t_{556}]$. Before the 154 anchor this rests on the earlier campaigns' frozen accepted records (box chain, unaffected). From 155 to 556 it rests on the rebuilt chain's whole-step `VS` boxes, all positive.
- **(ii) Negative side.** $w<0$ is attained on the certified 558 end box.
- **(iii) Uniqueness.** $a<0$ on whole steps 557 and 558.
- **(iv) Result.** There is exactly one zero $t_\star$. The crossing is strict, from positive to negative. At $t_\star$ the coordinate $q$ has a strict local MAXIMUM and $|w|$ is zero; this is not a speed maximum. It is the FIRST path turn since release.

$$t_\star\in(7.426684593623649597167959,\ 7.446684709182828044891367),\qquad T\in(74.2668459,\,74.4668471),$$

with the padded reading. The maximum coordinate is $q(t_\star)\in[1.8109107,\,1.8175687]$. The lower bound is the 556 end; the upper bound is the hull of the whole-step boxes $S$ on 557–558.

**Account at the turn (my own end evaluation, dimensionless, multiplicity included).**

| end | like tangent | unlike tangent | antipode tangent | $r$ | $l$ | $-2wa$ | $r'$ | $l'$ |
|---|---|---|---|---|---|---|---|---|
| 557 | $[-0.39872,-0.36418]$ | $[-0.018744,-0.018438]$ | $[+0.005324,+0.005461]$ | $[0.097136,0.103282]$ | $[-0.103295,-0.097123]$ | $[-0.002957,+0.003059]$ | $[+0.000678,+0.016560]$ | $[-0.019517,+0.002381]$ |

**Physical values.** $T\approx74.37$; $a/10\approx-0.039$.

**Grade.** DERIVED from measured enclosures on the rebuilt chain. The instruments are audit10 (mine) and the cm49 records (the subject's). The bracket coincides with the suspended one. The coincidence is consistency only; the certificate rests on the new evidence.

**Falsifiers.**
- An enclosure above missing its true value.
- A proved $a\ge0$ on any part of steps 557 or 558.

## 4. ddl-jet v2 (code reading)

The PI reports `ddl-jet-v2` with sha256 `aa51eb79…` and a 32-line diff, `9fd54044…`. Its only change, as reported, is that `CHAINJ` names R1′–R6′ by name and sha256 and requires the signed-v49 tag; the header and version also change. Every control runs in the same invocation before the targets, as in J2. I accept it on that description and need no separate controls run. I will verify the diff when ruling on J3.
