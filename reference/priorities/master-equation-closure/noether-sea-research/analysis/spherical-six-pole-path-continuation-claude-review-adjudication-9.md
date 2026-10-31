# Six-pole path continuation, review: adjudication 9 (slice P1, steps 493–515: ACCEPTED; no event)

Written 2026-10-20 by the review role, after my granted invocation G1.

**Subject.** [P1](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.json), sha256 `e19aac9418e7cdc0b5d34b80084463e46aa2bf14763cfb15f92c7ff132adcac4`, from cm471 (`05abecc0…`, admitted in adjudications 6 and 8). It has 23 steps, 493 to 515, all certified, with stop reason "plan exhausted". It resumes from r5 (`7af61785…`) at step 492.

**My run (G1).** I ran audit10 (`b2b90c7a…`, frozen, unchanged; its 66 controls passed first) on PID 10808, from 21:32:18 to 21:32:29 UTC, exit 0, 10.80 s, peak RSS 86,982,656 B. Before the run, a census found only standing-class foreign PIDs 9251 and 99079, each confirmed by its lsof cwd.

| output | sha256 |
|---|---|
| [json](../evidence/spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.md) | `2a2a16dd969490f6e92962d2893069c9c6b67b8d3c41a3bc35ed717c38ffad6f` |
| [consistency](../evidence/spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.md) | `6d9c296cb49d549cbacf252e2afe67ff0d424a5366cce1d6cbd6fe7688d687ef` |
| [out](../evidence/spherical-six-pole-path-continuation-claude-review-audit10-G1-P1.out) | `82eccd494a80f15d6293c1305d5b0cb027ad954953f6901d8e54f852e543c902` |
| out.time | `54b6d7c2338cf760716197156e9df0bddf2df9bb59124db50146c151ebf4e1a2` |

## 1. Audit (measured)

- **All 23 steps OK.** Each step was appended through audit9's checked path, which asserts alignment and continuity. Step 493's start box contains r5's step-492 end box. There were 0 fails and 0 sign disagreements between subject and mine.
- **Delay roots.** My own delay roots meet the subject's for every class at every end. My bracket is $\pm0.02$ about the subject's root, with a straddle proved by my own $h$ and padded lookup, so it is valid by reference 1.1.
- **End signs (my own end evaluation).** At every end, $w>0$ (the end box lower bound) and $a<0$. The like and unlike tangent contributions are negative and the antipode's is positive, at every end. $l<0$ and $l'>0$ at every end. All my end values meet the subject's.
- **Whole-step $a$.** It is NEGATIVE on every whole step 493–515 on both of my readings: the stored range $a_0+a'[0,\Delta]$, and my own law on the whole-step boxes.
- **$l''$.** audit9's single-interval $l''$ jet ($K=1$) is UNDECIDED on these steps. Nothing below uses it.
- **Frozen consistency.** 282 rows meet, through step 436.
- **Not taken from the audit.** As the PI instructed, I take no event from audit10's chain or event summary; its `speed_events` is empty in any case. Its flag "resume strings equal previous end False" is the known artifact of listing the target in `--own`; it also appeared in October C23.

## 2. Domain and chart qualification

**Actual domain (measured from P1's whole-step and class boxes).**
- Receiver $q\in[1.7407,\,1.7851]$.
- Delayed source $q'\in[1.1468,\,1.5952]$ over all three classes.
- Delayed source $w'\in[0.2891,\,0.3756]$.
- My transmitter factors satisfy $D_t\ge0.7447$ at every end.

**Qualification.**
- **Covering chart.** The support's admitted G1 chart (October adjudication 2): receiver $[1.45,2.10]$, source $q'\in[0,1.80]$, $w'\in[-0.10,0.45]$. The actual domain lies inside it, and the subject's v4.4 step refuses outside it.
- **My evaluation.** My kernels are closed-form interval evaluations. They are valid wherever they return finite enclosures with proved $r>0$ and $D_t>0$; they need no chart (derived).
- **audit10's flag.** Its `new_box_ok`, with source $q'\le1.20$ and $w'\ge-0.05$, flags every step. That flag is scope information about audit8's old box, not a failure.
- **Beyond the chart.** A source $q'>1.80$ or $w'<-0.10$ would make the subject refuse. I would then need a separately controlled chart before ruling.

## 3. Tracking (my own end evaluation; dimensionless; class contributions include multiplicity)

| end | $t$ (end time) | $q$ | $w$ | $a$ | unlike tan | like tan | antipode tan |
|---|---|---|---|---|---|---|---|
| 493 | $[6.796684593623649597167969,\,6.796684709182828044891357]$ | $[1.742668,1.747265]$ | $[0.1953631,0.1976579]$ | $[-0.2192015,-0.2111696]$ | $[-0.023244,-0.022941]$ | $[-0.203104,-0.195483]$ | $[0.007147,0.007255]$ |
| 504 | $[6.906684593623649597167969,\,6.906684709182828044891357]$ | $[1.762792,1.767653]$ | $[0.1699615,0.1725090]$ | $[-0.2503201,-0.2395266]$ | $[-0.022201,-0.021911]$ | $[-0.235032,-0.224642]$ | $[0.006914,0.007027]$ |
| 515 | $[7.016684593623649597167969,\,7.016684709182828044891357]$ | $[1.779933,1.785093]$ | $[0.1410994,0.1439860]$ | $[-0.2844656,-0.2699979]$ | $[-0.021258,-0.020978]$ | $[-0.269860,-0.255790]$ | $[0.006652,0.006770]$ |

| end | $r$ (canonical radial, total) | $-2wa$ | $r'$ | $l$ | $l'$ | whole-step $a$ (my law) |
|---|---|---|---|---|---|---|
| 493 | $[0.066658,0.069135]$ | $[0.082509,0.086654]$ | $[0.067024,0.075801]$ | $[-0.108204,-0.104825]$ | $[+0.006708,+0.019629]$ | $[-0.220546,-0.207443]$ |
| 504 | $[0.074161,0.077143]$ | $[0.081421,0.086365]$ | $[0.064016,0.074518]$ | $[-0.106902,-0.103048]$ | $[+0.006902,+0.022349]$ | $[-0.251974,-0.235288]$ |
| 515 | $[0.081222,0.084809]$ | $[0.076193,0.081918]$ | $[0.057953,0.070264]$ | $[-0.105541,-0.101131]$ | $[+0.005929,+0.023965]$ | $[-0.286447,-0.265309]$ |

**Widths.** At 493, $q$ and $w$ are $4.60\times10^{-3}$ and $2.30\times10^{-3}$; at 515 they are $5.16\times10^{-3}$ and $2.89\times10^{-3}$.

**Delay roots (mine) at 515.** Unlike $[1.694630,1.697676]$; like $[0.829243,0.839464]$; antipode $[1.923011,1.924792]$. The subject's bracket data show the like fallback on rung 1 throughout. The unlike fallback, with upper end 2.05, first engages at step 510; adjudication 2 predicted 507–509 for the old upper end.

**Physical values.** At 515, $T\approx70.167$, $a/10\approx-0.028$, $l/10\approx-0.0103$ and $l'/100\in[+5.9\times10^{-5},+2.40\times10^{-4}]$.

## 4. Rulings (derived from the measured items above)

- **P1 ACCEPTED** as a continuation of the certified history through the step-515 end, with $t\le7.016684709182828044891357$ and guaranteed prefix $7.016684593623649597167969$.
- **No path turn through the 515 end.** $w>0$ holds at every instant up to the 515 end. Through the 491 end this is October adjudication 15. On step 492 the admitted r5 whole-step velocity box lies in $w>0$. On 493–515, $a<0$ on every whole step and $w(t_{515})>0$ give $w(t)>w(t_{515})>0$ for every earlier $t$.
- **No second support turn is claimed.** $l'>0$ at every end 493–515, but the whole-step sign of $l'$ is not proved on these steps ($l''$ is undecided at $K=1$). So "no support turn on 492–515" is NOT certified at every instant. Each end value is positive, with margins of at least $0.0059$, and they do not trend down. That makes a zero-and-return between ends implausible (inferred), but it is not excluded.
- **Mechanism check (reference 3.6).** $-2wa$ has started to FALL, from about $0.0846$ at 493 to $0.0790$ at 515 (centres). $r'$ is falling more slowly in its centre, from $0.0714$ to $0.0641$. $l'=-2wa-r'$ is still positive. As $w\to0$, $-2wa\to0$. If $r'$ stays positive, a second support turn (a maximum of $l$) must come BEFORE the path turn. I will apply this criterion to every later slice.

**Falsifiers.**
- An enclosure in sections 1 or 3 that misses its true value.
- A later record that does not meet P1's end boxes.
- A proved $w\le0$ or $a\ge0$ anywhere on 493–515.
