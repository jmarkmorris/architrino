# Six-pole path continuation, review: adjudication 11 (slice P3, steps 551–570: ACCEPTED; the PATH TURN is CERTIFIED; a canonical radial maximum exists)

Written 2026-10-20 by the review role, after my granted invocation G3. The certificate follows my frozen [reference](spherical-six-pole-path-continuation-claude-review-reference.md) (`91751abc…`), section 3.

**Subject.** [P3](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.json), sha256 `e6b7fbb6b1107508e76730c9647fe15b8ef2de06460ede0463819ac6a4f3434b`, produced by cm471. It contains 20 steps, 551–570, all certified, and stopped with "plan exhausted".

**My run (G3).** audit10 (`b2b90c7a…`, unchanged), with 66 of 66 controls passing first. PID 21618 ran from 21:42:09 to 21:42:20 UTC, exit 0, 10.57 s wall, peak RSS 91,389,952 B. It audited 20 of 20 steps with 0 fails and 0 sign disagreements; frozen consistency was 282 of 282. Before the run, the census found only standing-class foreign processes.

| output | sha256 |
|---|---|
| [json](../evidence/spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.md) | `8b6e4dd04196847817f2e135e6e1e4dcda9cafb35d4475a9e4195f52178fd6e8` |
| consistency | `a178c320bdf2804257c7887e8a72c3395c4eaee766a8874c596c1fd168889d6d` |
| out | `bb4b501a1c552b4394aedbf6f8ec554b21ef35bea94a00e04d6438b693e318d5` |
| out.time | `dbd0a80efa7f6da65631ce1c500818a8cd86d62fe086197443fd2b13fccaee3f` |

No event is taken from audit10's chain or event summary. Every event below is derived from my own per-step enclosures.

## 1. Measured signs (my own end evaluation and whole-step readings)

- **$w$ at the ends.** $w$ is POSITIVE at every end through 556; at 556, $w\in[+0.0005505781,\,+0.007435661]$. It is UNDECIDED at 557, $[-0.003433491,\,+0.003554892]$. It is NEGATIVE at every end from 558 to 570; at 558, $w\in[-0.007438242,\,-0.0003443419]$, and at 570, $[-0.05685352,\,-0.04832092]$.
- **$a$ on whole steps.** $a$ is NEGATIVE on every whole step 551–570 on both readings, the stored range and my law on the whole-step boxes. On step 557 my law gives $[-0.4153564,-0.3724820]$; on step 558, $[-0.4176090,-0.3741884]$. Together with adjudications 9 and 10, $a<0$ on every whole step 493–570.
- **Domain.** Receiver $q\in[1.8069,\,1.8177]$; source $q'\in[1.3445,\,1.7667]$; source $w'\in[0.1713,\,0.3494]$; $D_t\ge0.8122$. All of this lies inside the G1 chart. The like-source margin to $q'=1.80$ is now 0.033.

## 2. PATH TURN: CERTIFIED, unique, strict (derived)

The certificate follows reference 3.1–3.4:

- **Positive side.** $w>0$ at every instant of $(0,t_{556}]$. Through the 491 end this rests on October adjudication 15. Step 492 is covered by the admitted velocity box. On 493–556, $a<0$ on every whole step and $w(t_{556})>0$ give $w(t)>w(t_{556})>0$.
- **Negative side, attained.** $w<0$ is proved on the certified 558 end box.
- **Uniqueness and strictness.** $a<0$ on whole steps 557 and 558 makes $w$ strictly decreasing on $[t_{556},t_{558}]$. So there is exactly one zero $t_\star$, the crossing is strict from positive to negative, and $q$ has a strict local MAXIMUM at $t_\star$ (since $\ddot q=a<0$). At $t_\star$ the speed magnitude $|w|$ is zero. This is not a speed maximum. It is the FIRST path turn since release.
- **Bracket.** It uses the earlier end's lower time and the later end's upper time, with full time uncertainty.
  - Padded reading (fully derived, as in adjudication 8): $t_\star\in(7.426684593623649597167959,\ 7.446684709182828044891367)$.
  - Recorded-string form: $(7.426684593623649597167969,\,7.446684709182828044891357)$, exact under the frozen exact-decimal origin premise.
  - Physically, $T\in(74.2668459,\,74.4668471)$.
- **Turning coordinate.** $q(t_\star)=\max q\in[1.810754,\,1.817731]$. The lower end is $q$ at the 556 end, because $q$ increases until $t_\star$. The upper end is the hull of the whole-step boxes $S$ of steps 557 and 558, the steps that contain $t_\star$.
- **After the turn.** $w<0$ and $a<0$ hold through the 570 end, so the common coordinate is moving back with growing speed.

**Grade.** The certificate is derived from measured enclosures. Instrument: audit10 at 30 digits with padded readers, my own end and whole-step evaluation. Domain: steps 551–570 of the radius-10 six-pole rest history, continued from r5 by cm471. The end and whole-step signs agree with the subject's; that is cross-code consistency, not independence.

## 3. Account at the path turn (my own end evaluation; dimensionless; tangent contributions include multiplicity)

| end | $t$ (end) | $q$ | $w$ | $a$ | unlike tan | like tan | antipode tan |
|---|---|---|---|---|---|---|---|
| 556 | $[7.426684593623649597167969,\,7.426684709182828044891357]$ | $[1.810754,1.817640]$ | $[+0.000551,+0.007436]$ | $[-0.410582,-0.374744]$ | $[-0.018788,-0.018471]$ | $[-0.397154,-0.361775]$ | $[0.005361,0.005502]$ |
| 557 | $[7.436684593623649597167969,\,7.436684709182828044891357]$ | $[1.810739,1.817695]$ | $[-0.003433,+0.003555]$ | $[-0.412900,-0.376478]$ | $[-0.018751,-0.018431]$ | $[-0.399470,-0.363511]$ | $[0.005321,0.005464]$ |
| 558 | $[7.446684593623649597167969,\,7.446684709182828044891357]$ | $[1.810685,1.817711]$ | $[-0.007438,-0.000344]$ | $[-0.415147,-0.378139]$ | $[-0.018715,-0.018393]$ | $[-0.401714,-0.365172]$ | $[0.005282,0.005426]$ |

| end | $r$ (canonical radial, total) | $-w^2$ | $l$ | $-2wa$ | $r'$ | $l'$ |
|---|---|---|---|---|---|---|
| 556 | $[0.096956,0.103276]$ | $[-0.0000553,-0.0000003]$ | $[-0.103332,-0.096956]$ | $[+0.000413,+0.006106]$ | $[+0.002364,+0.018624]$ | $[-0.018211,+0.003741]$ |
| 557 | $[0.097022,0.103404]$ | $[-0.0000126,0]$ | $[-0.103416,-0.097010]$ | $[-0.002835,+0.002936]$ | $[+0.000514,+0.016735]$ | $[-0.019571,+0.002422]$ |
| 558 | $[0.097067,0.103511]$ | $[-0.0000553,-0.0000001]$ | $[-0.103567,-0.097067]$ | $[-0.006176,-0.000260]$ | $[-0.001508,+0.014836]$ | $[-0.021012,+0.001248]$ |

The $-w^2$ column is computed by hand from the $w$ box (derived). At the turn, $l=-r$.

**Delay roots at 557 (mine).** Unlike $[1.761440,1.765315]$; like $[0.687673,0.702601]$; antipode $[1.949655,1.951592]$. In the subject's bracket data, the like fallback is on rung 2, with a lower margin of 0.0537. The unlike fallback has upper end 2.05 and a margin of 0.286.

**Widths at 557.** $q$: $6.96\times10^{-3}$; $w$: $6.99\times10^{-3}$.

**Physical values.** $T\approx74.37$; $a/10\approx-0.039$; $l/10\approx-0.010$; $l'/100\in[-2.0\times10^{-4},+2.4\times10^{-5}]$.

**Per-class radial contributions.** My audit gives the radial total only. The class split is the support's S6 task.

**Transmitter domain at the turn (reference 3.5, measured).** Every delayed source speed is positive at the turn and still positive through 570, with $w'\in[0.1713,0.3494]$. So the transmitter factors keep their pre-turn side, with $D_t\ge0.812$. The source speeds turn negative only about $\tau_{\min}\approx0.69$ in $t$ after $t_\star$, near step 626 (inferred).

## 4. A maximum of the canonical radial acceleration (derived; existence only)

$r'>0$ at the 557 end, $[+0.000514,+0.016735]$, and $r'<0$ at the 566 end, $[-0.018276,-0.000644]$. Both come from my own evaluation; the subject's values agree in sign. Since $r'$ is continuous, $r$ attains a local MAXIMUM in the interior of

$$(7.436684593623649597167959,\ 7.526684709182828044891367),$$

that is $T\in(74.3668,\,75.2668)$, with $r\approx0.097$–$0.104$ there.

- **Uniqueness and strictness are NOT proved.** They would need a whole-step $r''<0$, which was not run.
- **Not a support event.** It overlaps the path-turn bracket only at its start, $(7.43668,\,7.44668)$. Its order relative to $t_\star$ is NOT decided.

## 5. Reference 3.6 prediction: not triggered

At $t_\star$, $l'=-r'(t_\star)$. But $r'$ is undecided at the 558 end and has no whole-step sign on 557–558, so $r'(t_\star)>0$ is NOT proved. The "free" negative side of $l'$ fails, as I reported before this adjudication.

The second support turn is therefore pending. It needs a proved negative $l'$ at an end, and $l''<0$ on every whole step between 534 and that end:
- My first proved-negative end is 560, with $l'\in[-0.023992,-0.000566]$; the subject's is 562.
- The $l''$ runs are G4a2 (494–530) and G4b (531–570).

If a second support turn is certified, its bracket will be about $(t_{533},t_{560})$. That overlaps the path-turn bracket, so **the order of the two events will be UNDECIDED**. I do not force an order.

## 6. Rulings

- **P3 ACCEPTED** through the 570 end, $t\le7.566684709182828044891357$.
- **PATH TURN CERTIFIED**, as in section 2.
- **Canonical radial maximum**: existence certified in the section-4 interval; uniqueness open.
- **Second support turn**: pending G4a2 and G4b.

**Falsifiers.**
- Any listed enclosure that misses its true value.
- A proved $a\ge0$ on any part of steps 557–558, which would remove uniqueness.
- A later record that does not meet the 558 end box.
