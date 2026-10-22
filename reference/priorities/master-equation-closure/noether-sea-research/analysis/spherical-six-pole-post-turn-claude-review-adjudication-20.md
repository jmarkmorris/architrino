# Six-pole post-turn campaign, review: adjudication 20 (return-path slices P4′ and P5′, steps 571–660: ACCEPTED; events)

Written 2026-10-21 by the review role, after my granted run GP6. Events below are judged by my [reference](spherical-six-pole-post-turn-claude-review-reference.md), section 3. The old $w>0$ detectors were not used.

## 1. Subjects and run (measured)

**Slices.** Both were produced by cm49 and carry the `signed-v49` tag. P5′ resumes from P4′.

| slice | sha256 | steps | certified |
|---|---|---|---|
| [P4′](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P4.json) | `4fc261379d8d4a2f9b21f9f8c1f106e14913b6d3f68a8d0df5416345dfb04c08` | 571–615 | 45/45 |
| [P5′](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49-P5.json) | `22629d11da8a32445e043b1f9911fecdf53a43aa9e9251c9fac29dd600261fe2` | 616–660 | 45/45 |

**My run, GP6.** audit10 (`b2b90c7a…`, unchanged), with `--own` R1′–R6′, P4′ and P5′.

| item | value |
|---|---|
| PID | 3056 |
| time (UTC) | 03:56:00–03:56:19 |
| exit | 0 |
| wall | 19.16 s |
| peak RSS | 125,009,920 B |
| census | no Python processes running |
| [json](../evidence/spherical-six-pole-post-turn-claude-review-audit10-GP6-P4P5.json) | `319cd95b45984b868bc82498e486c8e6150da3e3a4a9e0ca499a66ddbb211be7` |
| consistency | `d6208a1e…` |
| out | `5c54e7ad…` |
| out.time | `fd261d72…` |

**Audit result.** 68 of 68 controls passed for each target. All 90 steps were OK, with 0 fails and 0 sign disagreements.

## 2. Measured signs (my own end evaluation, whole-step readings)

- **$w$** is NEGATIVE at every end 571–660. It runs from $[-0.0616,-0.0519]$ at 571 to $[-0.3895,-0.3661]$ at 660. The speed $|w|$ is growing.
- **$a$** is NEGATIVE at every end, and also on every whole step under both readings. It reached its most negative near 581–586 and has been rising since; at 660 it is $[-0.2762,-0.2434]$.
- **$l'$** is NEGATIVE on every whole step 571–660 (my whole-step $l'$).
- **$r'$** is NEGATIVE at every end 571–660. On every whole step 581–660 its outer enclosure $-l'-2\,VS\cdot a$ is negative. On 571–580 that crude whole-step enclosure is undecided.
- **$r$** is positive at every end and **$l$** is negative.
- **Tangent contributions.** The unlike and like tangent contributions are negative at every end. The antipode tangent contribution is POSITIVE through the 648 end, undecided on 649–651, and NEGATIVE from the 652 end.
- **Like source speed** at the end instants: POSITIVE through the 625 end ($[+0.00289,+0.01787]$), undecided on 626–631, NEGATIVE from the 632 end ($[-0.01895,-0.00260]$). By 660 it reaches about $-0.103$, inside the chart.
- **Like transmitter factor $D_L$:** below 1 through about 625, straddling 1 on 626–631, above 1 from about 636 (at 660, $[1.0551,1.0728]$).
- **Chart.** The source coordinate reaches at most $q'=1.8155$, which is below $q(t_\star)$ as reference 1.2 requires. The receiver stays at or above 1.7394. The minimum source speed is about $-0.103$. All of this lies inside the admitted extended chart.

## 3. Rulings (derived)

- **P4′ and P5′ ACCEPTED** through the 660 end, at $t\le8.466684709182828044891357$.
- **No speed extremum on 571–660.** $a<0$ on every whole step and $w<0$, so $|w|$ increases strictly. A return-path speed maximum, which needs $a$ to go from negative to positive, is not reached.
- **No support turn on 571–660.** $l'<0$ at every instant, so $l$ decreases strictly; that is, the inward support magnitude keeps growing. On the return path this matches the reversed mechanism: with $w<0$ and $a<0$, $-2wa<0$ favours stronger inward support.
- **No canonical radial turn on 581–660.** $r'<0$ at every instant there. On 571–580 only the end values are negative, and this adds nothing to the radial-maximum ruling of adjudication 19.
- **Like partner: source-speed sign change, with its transmitter side flip.** Derived as follows.
  1. The like source speed is $w'_L(t)=w(t-\tau_L(t))$.
  2. Its source time $s(t)=t-\tau_L(t)$ increases strictly, since $\dot s=1/D_L>0$.
  3. Near the path turn, $w$ decreases strictly ($a<0$ on whole steps).
  4. So $w'_L$ has exactly one zero, at the instant $s(t)=t_\star$, in

     $$(8.116684593623649597167959,\ 8.186684709182828044891367),$$

     between the 625 and 632 ends (padded reading).
  5. Because $M<0$ on the chart, the like factor $D_L$ crosses 1 at that same instant, from below to above.

  This is the path turn seen by the like partner one delay later, about $\tau_L\approx0.68$. **Grade:** derived from measured enclosures, with uniqueness by composition.
- **Antipode tangent contribution: sign change from positive to negative.** It exists in $(t_{648},t_{652})$, i.e. $(8.346684593623649597167959,\ 8.386684709182828044891367)$. Its uniqueness is not proved; that needs a whole-step derivative sign, which was not run. Geometrically, the antipode's tangent term has the sign of $\sin(q-q'_A)$. Its sign therefore changes as the receiver's present coordinate passes the antipode source's delayed coordinate (inferred reading).
- **Steps with a negative like source speed (632–660; 626–631 straddle).** These rulings rest on my audit's signed closed forms. They are correct by derivation from the code, but I have no known control with $v'<0$ (see [adjudication 19](spherical-six-pole-post-turn-claude-review-adjudication-19.md)). The subject's evaluation agrees with mine in sign, which is consistency only.

**Falsifiers.**
- An enclosure missing its true value.
- A proved $a\ge0$ on any whole step 571–660, which would remove the no-speed-extremum ruling.
- A like source speed proved non-zero at every instant between the 625 and 632 ends.
