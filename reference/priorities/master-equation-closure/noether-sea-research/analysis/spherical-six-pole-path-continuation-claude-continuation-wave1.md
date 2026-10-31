# Six-pole path continuation, continuation role (jack-k-hale lens): wave-1 report

*Living report of the continuation role in the [path-continuation plan](spherical-six-pole-path-continuation-plan.md) (sha256 `e963f8aa1924e910294f8c15aeed592f236d55c8a767095d3e6a4534ad3c8134`, verified 20:55:16 UTC). Checkpoint 1 written 21:13–21:16 UTC (clock-read). No Python has been run by this role; every statement about runtime behaviour below is a design statement until the granted controls record exists.*

**Exposure disclosure.** This session had no earlier exposure to the campaign files beyond the reads listed here. The jack-k-hale lens authored the October 14 continuation instruments (steps9, steps10-cm v4.4, cm45) and its wave-1 report, so the subject code is the lens's own earlier work. Read in this session: AGENTS.md; specialist charter and role file; both briefs; the plan; the predecessor synthesis (grep-level for sections 3, 5, 7 and the bracket notes), adjudications 13–15 (grep-level), the October continuation wave-1 report (grep-level); the frozen instrument chain listed in section 1; and, after the review froze, the review's reference section 1 and the header of its adjudication 1 (data only).

## 1. Where the bracket is set (measured by reading the code; hashes by `shasum -a 256`)

The step instrument is a chain of executed frozen files. Every root call goes through the module-global name `tau_point`, which each layer rebinds.

- `steps3-iv.py` (`1352182139423cb3088be03eae81ee7624bd8d09d67d86c864da32caf085b024`), executed by steps6 up to its line 281: `step()` at line 163 calls `tau_point(enc, t0, Q0, c)` at line 169 and refuses at line 170 with "tau bracket failed at t0 for class …", the exact r5 refusal text.
- `steps6-iv.py` (`df590c407041a184bc67fd792cd7c25286f7534171696903c61b4d3d6080613e`): `tau_point_wide` lines 129–160; the bracket line is 137, `a = iv.mpf(lo(guess) - half); b = iv.mpf(up(guess) + half)`, with `guess = fixed_chord(Q0, c)`, the chord to the partner's REST position ($q'=0$; for like, $\sqrt{2+\sqrt2\sin q}$). The straddle test is `up(h(a)) < 0 and lo(h(b)) > 0`; the end evaluation `end_eval` (line 219) refuses with "failed: delay bracket for …" at line 223.
- `steps9-iv.py` v3c1 (`62174fb9b274821c6e53f26808e663ce659e791cce90d175c0b269f1e75f90bb`): line 59 rewrites line 137 textually into `tau_point_asym(…, half, half_up)`; line 60 `LOWER9 = {1: 0.45, -1: 0.90, 0: 0.45}` (the fixed like lower end $\mathrm{chord}_L-0.90$ that refused step 493); line 61 `tau_point9` with `half_up = 0.90` for every class; line 63 `tau_point = tau_point9`.
- `steps10-cm.py` v4.4 (`1bcc8a279934bc77b83e164ee4e7e8499d5fb44c173395b8178802fbd31e0540`): line 28 executes steps9; line 103 (`accel_parts`) calls `tau_point` at the centre and over $Q_d$; the step and end evaluation reach line 169 of steps3 and line 222 of steps6 through step9/end_eval9.

## 2. Repair (derived)

**Setting.** $h(\tau)=\tau-r_c(Q_0,q(t_0-\tau))$, $h'=1+\partial_{q'}r_c\,w(t_0-\tau)\ge1-|w|$ because the source moves at unit coordinate speed on a great circle of the unit sphere. Sub-wake history gives a unique root on $(0,\infty)$; $h(0^+)<0$ and $h(\tau)\ge\tau-2$. So any bracket with proved $\sup h(a)<0<\inf h(b)$ and proved $\sup|w|<1$ on the source times it spans encloses THE root (derived; the review's reference 1.1 states the same independently).

**Lower-end constraint.** $a$ must satisfy $\overline{t_0}-a\le t_G$ ($t_G$ the guaranteed coverage end, the lower end of the last record's uncertain end time), i.e. $a>a_{\min}=\max(0,\overline{t_0}-t_G)$, about $1.2\times10^{-7}$ at a step start; and $\sup h(a)<0$ must be proved by evaluation.

**Rule (v4.7, stateless).** First call the frozen `tau_point9` unchanged; if it straddles, return its result object (identical bytes). Only if it refuses, a fallback: rungs $k=0,1,\dots,12$ with $a_k=\underline{\mathrm{chord}}-\mathrm{LOWER9}_c-0.15k$; the first rung with proved $\sup h(a_k)<0$ and $a_k>a_{\min}$ is used; the upper end is $b=\overline{\mathrm{chord}}+\max(0.90,\,2.05-\overline{\mathrm{chord}})=\max(\mathrm{chord}+0.90,\,2.05)$, so $h(b)\ge0.05>0$ whenever the read at $t_0-b$ is defined; the frozen `tau_point_asym` then runs on $[a_k,b]$ and re-proves both signs and bisects exactly as before; uniqueness is proved per fallback call from the window enclosure and the whole-step velocity boxes of the records over $[\underline{t_0}-b,\overline{t_0}-a_k]$. Every failure refuses with its inequality recorded. It is stateless (no previous-root memory), so a rising root (after a path turn, or the unlike root) is handled the same way and outputs do not depend on call order.

**Same root wherever the old bracket worked.** Derived by code path: the fallback is entered only when `tau_point9` returns None, so on every state where v4.4 straddled the returned object is the frozen one; mathematically any proved straddle encloses the unique root anyway. The like fallback is exactly v4.6's (for like $2.05-\mathrm{chord}_L<0.90$).

**What changes nothing else.** The law, step map, chart, remainders, checks and records are the v4.4 text executed unchanged; the new code records bracket data (`v46_bracket`, `v46_bracket_end`, `out["v46"]`) and appends the bracket diagnostic to a refusal message.

## 3. Files (checkpoint 1)

| file | sha256 | status |
| --- | --- | --- |
| [cm46-v1](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm46-v1.py) | `a48ec4e6a6f36c7d43baaea0204805123600c7c474a6006f0ff1588bb72f86f5` | the state the review admitted (adjudication 2); reconstructed exactly by reverse-applying my edits, hash matched |
| [cm46](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm46.py) | `4f685bc0becbd1292ade40e3d1cfdb4da76f8353d111f04fa4e6246a17a43491` | v4.6 after pre-run fixes (never run); frozen |
| [cm47](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm47.py) | `a85c264892b89419c1dc3c15e6ef1ded546fbe97d9ceca7919d032d93eca3c34` | v4.7, the instrument requested for the controls record |
| [diff cm46 → cm47](../evidence/spherical-six-pole-path-continuation-claude-continuation-cm46-to-cm47.diff) | `9b429ea6db4b08e87df3aa9d442507916a1c6a89f3d4aa227b424ec85bca4bff` | for the review |

**What changed in cm46 after `a48ec4e6…` (measured by diff).** Pre-run corrections from my own code reading, no logic change to the bracket: (1) the second B1 known case needs rung 2, not 3 (root 0.661 above $a_2=0.636$), and B3's negatives moved accordingly (cap at 1 rung; coverage edge at rung 2, accepted case now also checks rung 2); (2) B2's width tolerance 1e-18 → 1e-15 (60 bisections of a width-2 bracket leave about 2e-18); (3) a guard against a missing key in B2; (4) the class-sign negative accepts a refusal or a disjoint enclosure; (5) B1's detail values written as strings (JSON); (6) B6's diagnostic tolerates an undefined $h$.

## 4. Controls specification (v4.7 record; known and negative first)

- **Inherited:** all 60 v4.4 controls (43 frozen v3c1 + 17 own) recomputed under the rebinding; they must still pass.
- **B1 known:** constructed stationary like source; exact root = direct-vector chord (the frozen (0b) embedding, independent of `geom`); frozen bracket refuses; fallback encloses on rung 1 ($Q=1.74$, $q'=1.60$, root 0.858) and rung 2 ($Q=1.82$, $q'=1.77$, root 0.661).
- **B2 known:** uniform like sources $|u|=0.30$; independent direct-vector sign proof of each enclosure; approaching source below the frozen end; RISING root (receding source) enclosed by the fallback at $t_0=5$ and by the unchanged frozen bracket at $t_0=6.2$.
- **B3 negatives (like):** cap at 1 rung refuses; upper end below the root refuses; injected $|w'|=1.2$ refuses uniqueness; a rung-2 read $10^{-9}$ past the coverage end refuses, $10^{-6}$ inside is accepted; exchanged class sign detected.
- **B4:** anchor state, all classes identical to the frozen root.
- **B5 (consistency, not evidence):** r1–r5 appended by name and sha256; at the step-474 and step-491 end states every class identical to the frozen root.
- **B6:** step-492 end (step-493 start): frozen like bracket refuses; fallback encloses strictly inside $[a_k,b]$ with uniqueness proved; unlike and antipode identical; the missing step-492 end evaluation completes (reported, not an admitted record).
- **B7 known (v4.7):** unlike roots above $\mathrm{chord}_U+0.90$: stationary source (root 1.888) and uniform source $u=0.10$ (root about 1.83, direct-vector sign test); frozen refuses; fallback rung 0, $b=2.05$.
- **B8 negatives (v4.7):** upper end forced to 1.80 refuses; like geometry on the unlike source detected.
- **Equivalence replay (separate run; consistency only, shared code):** v4.7 recon from r4 to step 492 must reproduce r5's strings for steps 435–492 (`t_int`, `S`, `VS`, `a0`, `ap`, `end_q_str`, `end_v_str`, end-evaluation strings, `corr`, `affine_last`), compared by `jq` after a known self-comparison and a perturbed-copy negative.

## 5. Grades and falsifiers so far

Derived: uniqueness and the identity-where-old-works property (code path). Measured: none yet. Inferred: the like root needs rung 1 within about 25 steps of 492 and rung 2 near the path turn (from r5 roots falling about 0.0052 per step); the path turn near step 560–580 (from $w\approx0.199$ and $a\approx-0.21$ growing in magnitude); a possible chart obstruction at source $q'\le1.80$ near the turn (guessed from $q\approx1.82$ and delay about 0.66). Falsifiers: any B-control failing; any byte difference in the replay on 435–492; a fallback enclosure disjoint from the review's own root on the same state.

## 6. Runs and instrument versions after checkpoint 1

**K1 (grant K1; cm47 `a85c264892b89419c1dc3c15e6ef1ded546fbe97d9ceca7919d032d93eca3c34`).** PID 95250, 2026-10-20T21:15:09Z to 21:15:42Z, exit 2 (controls failed; not the alarm), wall 33.40 s, peak RSS 124485632 bytes; census at 21:15:03 UTC showed only the granted foreign class (82438; 91373 and 91812 with cwd in the ceiling-contact local-data folder). Record [cm47-controls.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm47-controls.json) `634d6f3dd07cd78c3f2d9b89ce2fef7e6e5427bceecf93e3012267122360df4b`, [.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm47-controls.out) `f1f2162f0feba91b65ae2f95565e46e2be3ca1e6d196a0b8a7ad96d42bd581f9`, [.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm47-controls.out.time) `841ea5ac671143d9cbcc386f9c6b05869ce27591bf6ed5d0a595ffc36812a0a2`.

Measured (cm47, mpmath iv at 30 digits, $N=4000$): all 60 inherited controls and B1–B5, B7, B8 pass. B6 failed only on its last item: the step-492 end evaluation raised `KeyError('steps')`. The bracket items of B6 passed at the step-492 end ($t_0\in[6.786684593623649597167969,6.786684709182828044891357]$): the frozen like bracket refuses, with $h(\mathrm{chord}_L-0.90)=[-0.0051540,+0.0010139]$ at $a=0.941939530033$ (straddles zero, so not proved negative, as in r5); the fallback on rung 1 ($a=0.791939530033$, $b=2.74224032504$) encloses the like root $[0.9405800424347079,0.9488323146158715]$ with margins $0.1486$ and $1.7934$; uniqueness is proved with $\sup|w'|\le0.38963734$ over the read source range; the delayed like source has $q'\in[1.48480,1.49043]$ and $w'\in[0.32004,0.32211]$, inside the chart; unlike and antipode are identical to the frozen roots.

**Cause (measured by reading the code).** My control B3 used a module-global dict `b3`, which shadowed the frozen global `b3` (the antipodal-b3 record) that steps6 `end_eval` reads at its line 227. B3 runs in every mode, so the shadowing would also have broken every recon end evaluation. The controls caught it before any target run.

**cm471 (v4.7.1, `05abecc028a2cf4f3875ab7adc4c4df9f12339d2401abdb0a1aff0125e7d3e5c`).** The controls now run inside functions (`_controls_known_47`, `_controls_records_47`), so no control variable becomes a module global; cm47 is kept exactly as run. [Diff against cm47](../evidence/spherical-six-pole-path-continuation-claude-continuation-cm47-to-cm471.diff) `58b92ca11efedb053a9d9790dbcc274e13dbcffcf1ee308b51fb94d3233793c1`. The bracket logic is byte-identical (measured): the PART1 region hashes to `65e0edd003cb8017290a49302157c95d8ccd1f967ed6f34b3b734dd6dfbd8407` in both files once the version line is excluded. Name collisions (measured): all 46 module-level names that cm471 executes were grepped whole-word in all eight files of the executed chain (wave14, wave15, steps3, steps6, steps7, steps8, steps9 and steps10-cm v4.4, hashes in the [record](../evidence/spherical-six-pole-path-continuation-claude-continuation-cm471-name-grep.txt) `d31d66365a854ffc4aa573805d97c66219d61faba280ab78f06071174cdb4660`). Only intended rebindings hit: RECORDS, corr_step, end_eval9, tau_point and history (injected in controls and restored), plus the sys, os and hashlib imports.

**Equivalence checker (jq; no Python).** It passed its known case: r5 against r5 gives 58 steps equal, step 492 compared in projected mode, and `affine_last` equal. It passed two negatives: a one-digit change in step 470's `end_q_str` was detected while timing and recording keys changed at steps 480–481 were ignored, and a deleted step 460 was detected as missing.

**K2 (cm471 controls).** PID 2420, 21:22:35Z to 21:23:13Z, exit 0, wall 37.72 s, peak RSS 127221760 bytes. Record [cm471-controls.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-controls.json) `8583831a3ecf75d62102fc76a86efb46d3842c2a67cd5d99ac3bf2d7639f9410`, [.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-controls.out) `d8c2d1fc29c4be0aae154e13bae0264249e0077e09c69fa70fd2fec18b56a984`, [.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-controls.out.time) `7572ec11910f7b48ac76e854bad351ee8069b78da814d7d5dd21c38eaf11c97b`. All 68 controls pass (measured). Known cases against direct-vector references: B1 encloses the stationary like chords $0.857874161754181920$ (rung 1) and $0.661022133496752864$ (rung 2) with widths about $1.7\times10^{-18}$; B7 encloses the stationary unlike chord $1.887604232625949860$ above the frozen upper end $1.6934$ (rung 0, $b=2.05$). The step-492 end evaluation that r5 lacked now completes: $w=[0.1975116,0.1997870]$, $a=[-0.2165397,-0.2087222]$, $l=[-0.1083133,-0.1049739]$, $l'=[0.0063617,0.0197035]$ (positive); it is reported, not an admitted record. Review adjudication 8 admitted cm471 for targets; adjudication 6 barred cm47.

**K3 (equivalence replay; consistency only, shared code, not independent evidence).** PID 3688, 21:24:57Z to 21:26:47Z, exit 142: the 110 s alarm fired (compute incident). The partial record (saved through step 476) is [equiv-r5replay.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-equiv-r5replay.json) `b1f9958f6a6f8cbbe4fb85c2bf0d3f61accf2618c71e9fdda5e51c6ebf09c85d`, with [.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-equiv-r5replay.out) `25c0d759a58c4caf8c3bc949d2cdc9c547fe0962fdc394c53d9aafaeab5bb965` and [.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-equiv-r5replay.out.time) `85ff3baed84102326daca3886be1488b84254d119fb77133709a163fbedcef74`. Measured with the jq checker, which passed its known and negative cases first: steps 435–476 are EQUAL to r5 in every field (42 of 42; timing and recording keys excluded). The fallback was never engaged on these steps. Measured: the whole run, the frozen code included, ran about 2.2 times slower than r5, and the inferred cause is machine load (load average 12.5, measured by the PI). The PI accepted 435–476 as partial consistency without a rerun.

## 7. Continuation slices

**P1 (resume r5 at step 492, to step 515).** PID 7209, 21:28:51Z to 21:29:58Z, exit 0, wall 66.79 s, peak RSS 112066560 bytes. Record [P1.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.json) `e19aac9418e7cdc0b5d34b80084463e46aa2bf14763cfb15f92c7ff132adcac4`, with [.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.out) `794601b67737b28ed05fe497c3b49a38abc6cb2c2a07f454ae2b3d2e673bfe53` and [.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.out.time) `9dcb62549e73020b7d4eec856fcdf67b25bc4298f4bda36da740632d144d1497`.

Measured (instrument cm471: mpmath interval arithmetic at 30 digits, $N=4000$; domain: the identical radius-10 history resumed from r5's step-492 strings; steps 493–515, all certified, no refusal):

- **Reach.** $t\in[7.016684593623649597167969,7.016684709182828044891357]$, physical $T\approx70.167$.
- **Speed.** $w$ is proved positive at every end. Its lower bound is 0.19536 at step 493 and 0.14110 at step 515.
- **Acceleration.** $a$ is proved negative on every whole step.
- **Support rate.** $l'$ is proved positive at every end; over the whole step it spans zero on steps 513–515.
- **Like bracket.** The fallback is on rung 1 throughout; its lower margin falls from 0.144 to 0.045.
- **Unlike bracket.** The frozen bracket holds through step 509, where the upper margin is 0.00031. From step 510 the fallback takes over on rung 0 with $b=2.05$, upper margin 0.36. This is the failure that review adjudication 2 predicted.
- **Antipode bracket.** The frozen bracket holds throughout.
- **Chart.** The like delayed source reaches $q'\le1.5952$ at step 515, a margin of 0.205 to 1.80 that shrinks about 0.0045 per step. Source $w'$ stays in $[0.289,0.376]$.
- **Widths.** The $q$ width grows from 0.00460 to 0.00516 and the $w$ width from 0.00229 to 0.00289.

**At the step-515 end** (physical values in brackets; acceleration and support divided by 10, support rate by 100):

- **State.** $q=[1.7822,1.7851]$, $w=[0.141099,0.143986]$.
- **Acceleration.** $a=[-0.284467,-0.269993]$ ($[-0.0284,-0.0270]$).
- **Tangent contributions** (multiplicities included): unlike $[-0.021258,-0.020978]$, like $[-0.269861,-0.255785]$, antipode $[+0.006652,+0.006770]$.
- **Canonical radial contributions:** unlike $[-0.050325,-0.050138]$, like $[+0.155206,+0.158545]$, antipode $[-0.023661,-0.023597]$, total $r=[0.081221,0.084809]$.
- **Signed support.** $-w^2\approx[-0.02073,-0.01991]$, $l=[-0.105541,-0.101130]$, $l'=[0.0052979,0.0247093]$.

Inferred from these numbers: the like tangent term provides almost all of the deceleration. The zero of $w$ lies near steps 560–565, and the 1.80 chart edge on source $q'$ is expected to hold through the turn and to bind after it.

**P2 (resume P1 at step 515, to step 550).** PID 12496, 21:34:07Z to 21:35:30Z, exit 0, wall 82.67 s, peak RSS 101957632 bytes. Record [P2.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.json) `08683e84f29af2578e0dc1f6203f607968ac8ca304be6da924e9128581d04e96`, with [.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.out) `6e4038c5b35c96eef15757b17978214b097aa5982418a7be3afb31eef5c472d5` and [.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.out.time) `1b106edcb63326a977eb5ee2c8e46d116c389aa00c2a0d301f11664fe4acaedf`.

Measured (instrument cm471; domain: steps 516–550, all certified, no refusal):

- **Speed.** $w$ is proved positive at every end. Its lower bound first falls below 0.1 at the step-529 end, $[0.0989013,0.1025978]$. At step 550, $w=[0.0239806,0.0302924]$.
- **Acceleration.** $a$ is proved negative on every whole step.
- **Support rate at ends.** $l'$ is proved positive at ends 516–530 and spans zero at every end 531–550. The first spanning end is 531, $[-0.000159,+0.023944]$; at 550 it is $[-0.014087,+0.012843]$. No end has $l'$ proved negative.
- **Support rate over steps.** $l'$ spans zero on every whole step 516–550.
- **Like bracket.** Rung 1 through step 525, rung 2 from step 526; the rung-2 margin is 0.0705 at 550.
- **Unlike bracket.** Rung 0 throughout, with upper margin 0.295 at 550.
- **Antipode bracket.** Frozen throughout.
- **Chart.** The like source has $q'\le1.7190$ at step 550, a margin of 0.081 to 1.80.
- **Widths.** $q$ width 0.00649 and $w$ width 0.00631 at step 550.

**At the step-550 end:**

- **State.** $t=[7.3666845936,7.3666847092]$ ($T=73.667$), $q=[1.810013,1.816505]$.
- **Acceleration.** $a=[-0.395352,-0.363063]$.
- **Tangent contributions:** unlike $[-0.019035,-0.018732]$, like $[-0.381904,-0.350054]$, antipode $[+0.005587,+0.005723]$.
- **Radial contributions:** unlike $[-0.049669,-0.049464]$, like $[+0.169668,+0.175331]$, antipode $[-0.023814,-0.023744]$, total $r=[0.096185,0.102123]$.
- **Signed support.** $l=[-0.103040,-0.096760]$.

Inferred: the first end with $w$ proved negative should come near step 558–559. A maximum of $l$ (a second support turn) before the path turn cannot be decided at end resolution here, because the end box of $l'$ is about 0.027 wide.

**P3 (resume P2 at step 550, to step 570).** PID 18367, 21:39:00Z to 21:40:02Z, exit 0, wall 61.85 s, peak RSS 109543424 bytes. Record [P3.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.json) `e6b7fbb6b1107508e76730c9647fe15b8ef2de06460ede0463819ac6a4f3434b`, with [.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.out) `a9d04053efcd16560deac66e207a6f87ee958eb4f5361a20d5813208ba61b972` and [.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.out.time) `4297436dfe92767a078b7882fe7968dbf0a11197d1e11c688dcfc1de4e227801`. The recon loop has no stop on the sign of $w$, so it ran to the granted limit of step 570; the brief's stop was applied at slice end. There was no refusal.

Measured (instrument cm471; domain: certified steps 551–570, consecutive and chained by exact strings from r5):

- **Last end with $w$ proved positive: step 556.** End time $[7.426684593623649597167969,7.426684709182828044891357]$; $w=[0.000550578,0.007435661]$.
- **Step 557.** At its end $w$ spans zero.
- **First end with $w$ proved negative: step 558.** End time $[7.446684593623649597167969,7.446684709182828044891357]$; $w=[-0.007438242,-0.000344342]$.
- **Later ends.** $w$ is proved negative at every end from 559 to 570.
- **Acceleration.** $a$ is proved negative on every whole step 551–570. On step 557 it is $[-0.418793,-0.369589]$ and on step 558 $[-0.421093,-0.371275]$.
- **Candidate path-turn bracket** (earlier end's lower time, later end's upper time): $t\in(7.426684593623649597167969,7.446684709182828044891357)$, physical $T\in(74.2668459,74.4668471)$.

Derived from these proved signs and the continuity of $w$: $w$ has a zero in that bracket. Because $a<0$ is proved on the whole steps 557 and 558, $w$ is strictly decreasing there, so the zero is unique and strict: a strict maximum of $q$ and a zero of the speed magnitude, not a speed maximum. The certificate itself belongs to the review.

**At the step-558 end:**

- **State.** $q=[1.810685,1.817711]$.
- **Acceleration.** $a=[-0.415155,-0.378136]$.
- **Tangent contributions:** unlike $[-0.018715,-0.018393]$, like $[-0.401722,-0.365169]$, antipode $[+0.005282,+0.005426]$.
- **Radial contributions:** unlike $[-0.049606,-0.049393]$, like $[+0.170533,+0.176695]$, antipode $[-0.023861,-0.023789]$, total $r=[0.097066,0.103514]$.
- **Signed support.** $l=[-0.103569,-0.097066]$, $l'=[-0.023480,+0.003847]$.
- **Delay roots.** Like $[0.685582,0.700637]$ on rung 2, unlike $[1.762687,1.766592]$ on rung 0, antipode frozen $[1.950361,1.952303]$.
- **Widths.** $q$ 0.0070258, $w$ 0.0070939.
- **Chart.** The like source has $q'\le1.74013$ at step 558 and $\le1.76668$ at step 570, a margin of 0.033 to 1.80. Source $w'\ge0.1713$.

**Support rate.**

- **Ends.** $l'$ spans zero at ends 551–561. It is first proved negative at the step-562 end, $[-0.030002,-0.000017]$, end time $[7.486684593623649597167969,7.486684709182828044891357]$, and stays proved negative through 570.
- **Whole steps.** $l'$ spans zero on 551–567 and is proved negative on 568–570.
- **A maximum of $l$.** P2 proved $l'>0$ at the step-530 end, so (derived) $l'$ has a zero in $(7.166684593623649597167969,7.486684709182828044891357)$: a maximum of $l$, a second support turn. Its order relative to the path turn and its uniqueness are not decided at end resolution.

**Receiver sign handling** (measured by reading the code; scope: the eight chain files and cm471). The step map, the closure iteration, the record reader after $T^\*$ and the end and whole-step $w$ boxes are all signed. The only constructions with $w\ge0$ built in are in the window enclosure (steps3 lines 97, 99 and 107), which is read only for source times $s\le T^\*\approx1.367$, the release from rest. Steps 557–558 closed with whole-step $w$ boxes that span zero.

## 8. Bracket history over the continuation (measured from the recorded `v46_bracket` data)

| class | steps 435–492 (replay, r5) | 493–509 | 510–525 | 526–570 |
| --- | --- | --- | --- | --- |
| like | frozen $[\mathrm{chord}-0.90,\mathrm{chord}+0.90]$; lower margin 0.309 at step 435, 0.087 at step 476; refused at the step-492 end | fallback rung 1, $a=\mathrm{chord}-1.05$; margin 0.144 to 0.003 | rung 1 | rung 2, $a=\mathrm{chord}-1.20$; margin 0.145 at step 527, 0.031 at step 570 |
| unlike | frozen; upper margin 0.162 at step 435, 0.029 at the step-492 end | frozen; upper margin 0.00031 at step 509 | fallback rung 0, $b=2.05$; margin 0.364 to 0.335 | rung 0; margin 0.270 at step 570 |
| antipode | frozen | frozen | frozen | frozen; upper margin 0.175 at step 570 |

No call was refused in P1–P3. Every fallback call proved uniqueness with $\sup|w'|\le0.39$ over the source times it read. If the slices continued, the like class would need rung 3 within about 10 steps of step 570 (inferred from the 0.003-per-step fall of its margin); the stateless ladder takes that rung without any change to the instrument.

**Evidence size (measured by `ls -l` and `du -sk`).** This role's files in the evidence folder total 4,873,397 bytes. The role's scratch folder holds about 4.2 MiB, mostly two r5 copies used for the jq negatives. Nothing is in `.local-data`.

## 9. Review rulings on this role's work (the review's grades, cited by sha256)

All rulings below are the independent review's (ramon-e-moore lens), graded there as derived from measured enclosures unless stated. Where the review used my records it calls that cross-code consistency, not independence.

- [Adjudication 2](spherical-six-pole-path-continuation-claude-review-adjudication-2.md) `05864a5f00d39dcfc5b280b092e94a5a937afb96d42ff49496f0708c345be8a2`: admitted the v4.6 lower-end design (cm46 at `a48ec4e6…`). It predicted a second obstruction, the unlike root outgrowing $\mathrm{chord}_U+0.90$ near steps 507–509, and derived the upper end $2+\epsilon$.
- [Adjudication 4](spherical-six-pole-path-continuation-claude-review-adjudication-4.md) `5201ad6258e0c60e47667b28fda3a89b3d9e2063868229418ee2b667f62f5bd1`: admitted the v4.7 design (both bracket ends; all six items of its reference 1.3 met, rising root included). It ruled that the post-read cm46 edits change only control expectations. Its conditions were controls first, the replay reported as consistency only, and slices starting from the r5 step-492 strings. It named three falsifiers on slice bracket data: $b<2$ on a fallback, $a_k\le\overline{t_0}-t_G$, and a uniqueness bound $\ge1$.
- [Adjudication 6](spherical-six-pole-path-continuation-claude-review-adjudication-6.md) `26156623ac613475af79be5e06bed4aeeb2f6d0967119206310a178e90c67825`: the K1 record is kept as a failed controls record and is not evidence for targets; its 492-end bracket readings are consistent with the design. The admission carries over to cm471, whose PART1 is byte-identical to cm47's apart from the version string. cm47 is barred from targets.
- [Adjudication 8](spherical-six-pole-path-continuation-claude-review-adjudication-8.md) `84868ffe7e7875f4e0e74a3fcf8d8935533bb0bc3a6624c4aedbae9ccdea8347`: K2 passes 68 of 68 controls; cm471 is ADMITTED for targets. Certified brackets are cited in the reader-padded form.
- [Adjudication 9](spherical-six-pole-path-continuation-claude-review-adjudication-9.md) `f3f69c2a922939d5a4123beca50759f19922b723803141b5266f82c71c2acbf9`: P1 ACCEPTED through the step-515 end; no event.
- [Adjudication 10](spherical-six-pole-path-continuation-claude-review-adjudication-10.md) `a3ec10189cadce73901bd4609dcbf38aeb61fbaeeab48ef32458d2a834370738`: P2 ACCEPTED through the step-550 end; no event yet.
- [Adjudication 11](spherical-six-pole-path-continuation-claude-review-adjudication-11.md) `a1e34ae842760e4a4538c11a2eb53c05ee07403dc49a4ea3b6c5516773a1dccf`: P3 ACCEPTED. The PATH TURN is CERTIFIED, unique and strict, in $t\in(7.426684593623649597167959,\,7.446684709182828044891367)$ (padded), with $q(t_\star)\in[1.810754,1.817731]$; the review graded it as derived from measured enclosures with its own audit10 evaluation. A canonical radial maximum exists after the path turn; its uniqueness is open.
- [Adjudication 12](spherical-six-pole-path-continuation-claude-review-adjudication-12.md) `145d1875b62a159d8c45fd91673ee2fcce9f662b53f8d366ef8ce70fffaf6691`: the second support turn (a maximum of $l$) exists in $(7.176684593623649597167959,\,7.466684709182828044891367)$. Its uniqueness and strictness are open, and its order relative to the path turn is undecided. It also issued the completion ruling to the step-570 end.
- [Adjudication 13](spherical-six-pole-path-continuation-claude-review-adjudication-13.md) `d4d372e8b5cd9ff078df9be2efb8b639a3b7bf3596fe4c67594e42aecd9dff17`: narrowed the second-support-turn bracket to $(7.176684593623649597167959,\,7.436684709182828044891367)$, with the negative end cross-code from the support's receval v6; the order is still undecided. It placed the canonical radial maximum in $(7.446684593623649597167959,\,7.526684709182828044891367)$, after the path turn as instants.

## 10. Incidents and corrections

- **K1, PID 95250 (controls failed, exit 2).** My control B3 assigned a module-global `b3` that shadowed the frozen antipodal-b3 record read by steps6 `end_eval` at its line 227, so B6's end evaluation raised `KeyError('steps')`. The same defect would have broken every recon end evaluation. Fixed in cm471 by function scope, which the review admitted (adjudications 6 and 8). The cause was found by reading the code.
- **K3, PID 3688 (110 s alarm, exit 142).** The equivalence replay saved steps 435–476 and then stopped at the alarm. The whole run, frozen code included, ran about 2.2 times slower than r5 (measured); the cause is inferred to be machine load (load average 12.5, measured by the PI). 42 of 42 saved steps were equal to r5. The PI accepted this as partial consistency without a rerun.
- **Evidence-size self-correction.** In checkpoint 3 I estimated "about 9 MB" of evidence without measuring it. The measured figure (`ls -l`) for my evidence files at 21:41 was 4,873,397 bytes; I corrected it in the next message. The final figure is in section 11.
- **Post-read edit of cm46.** After the review had read cm46 at `a48ec4e6…`, I corrected its control expectations before any run. The admitted bytes were restored exactly as `cm46-v1` (hash matched), and the review ruled the edits control-only (adjudication 4).
- **Stop after P3.** The recon loop has no stop on the sign of $w$, so P3 ran to its granted limit of step 570 although $w<0$ was first proved at the step-558 end. Steps 559–570 were computed inside that one granted invocation; no further run was requested.

## 11. Manifest (self-excluded: this report is not listed; hashes taken by `shasum -a 256` and sizes by `stat`, at closeout)

| file | bytes | sha256 |
| --- | --- | --- |
| [spherical-six-pole-path-continuation-claude-continuation-cm46-to-cm47.diff](../evidence/spherical-six-pole-path-continuation-claude-continuation-cm46-to-cm47.diff) | 9067 | `9b429ea6db4b08e87df3aa9d442507916a1c6a89f3d4aa227b424ec85bca4bff` |
| [spherical-six-pole-path-continuation-claude-continuation-cm47-to-cm471.diff](../evidence/spherical-six-pole-path-continuation-claude-continuation-cm47-to-cm471.diff) | 21816 | `58b92ca11efedb053a9d9790dbcc274e13dbcffcf1ee308b51fb94d3233793c1` |
| [spherical-six-pole-path-continuation-claude-continuation-cm471-name-grep.txt](../evidence/spherical-six-pole-path-continuation-claude-continuation-cm471-name-grep.txt) | 1552 | `d31d66365a854ffc4aa573805d97c66219d61faba280ab78f06071174cdb4660` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm46-v1.py](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm46-v1.py) | 25242 | `a48ec4e6a6f36c7d43baaea0204805123600c7c474a6006f0ff1588bb72f86f5` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm46.py](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm46.py) | 25395 | `4f685bc0becbd1292ade40e3d1cfdb4da76f8353d111f04fa4e6246a17a43491` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm47-controls.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm47-controls.json) | 87789 | `634d6f3dd07cd78c3f2d9b89ce2fef7e6e5427bceecf93e3012267122360df4b` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm47-controls.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm47-controls.out) | 8783 | `f1f2162f0feba91b65ae2f95565e46e2be3ca1e6d196a0b8a7ad96d42bd581f9` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm47-controls.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm47-controls.out.time) | 777 | `841ea5ac671143d9cbcc386f9c6b05869ce27591bf6ed5d0a595ffc36812a0a2` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm47.py](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm47.py) | 29700 | `a85c264892b89419c1dc3c15e6ef1ded546fbe97d9ceca7919d032d93eca3c34` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.json) | 910447 | `e19aac9418e7cdc0b5d34b80084463e46aa2bf14763cfb15f92c7ff132adcac4` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.out) | 11986 | `794601b67737b28ed05fe497c3b49a38abc6cb2c2a07f454ae2b3d2e673bfe53` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P1.out.time) | 777 | `9dcb62549e73020b7d4eec856fcdf67b25bc4298f4bda36da740632d144d1497` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.json) | 1275191 | `08683e84f29af2578e0dc1f6203f607968ac8ca304be6da924e9128581d04e96` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.out) | 13774 | `6e4038c5b35c96eef15757b17978214b097aa5982418a7be3afb31eef5c472d5` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P2.out.time) | 777 | `1b106edcb63326a977eb5ee2c8e46d116c389aa00c2a0d301f11664fe4acaedf` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.json) | 849506 | `e6b7fbb6b1107508e76730c9647fe15b8ef2de06460ede0463819ac6a4f3434b` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.out) | 11541 | `a9d04053efcd16560deac66e207a6f87ee958eb4f5361a20d5813208ba61b972` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-P3.out.time) | 777 | `4297436dfe92767a078b7882fe7968dbf0a11197d1e11c688dcfc1de4e227801` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-controls.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-controls.json) | 94789 | `8583831a3ecf75d62102fc76a86efb46d3842c2a67cd5d99ac3bf2d7639f9410` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-controls.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-controls.out) | 8784 | `d8c2d1fc29c4be0aae154e13bae0264249e0077e09c69fa70fd2fec18b56a984` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-controls.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-controls.out.time) | 777 | `7572ec11910f7b48ac76e854bad351ee8069b78da814d7d5dd21c38eaf11c97b` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-equiv-r5replay.json](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-equiv-r5replay.json) | 1438043 | `b1f9958f6a6f8cbbe4fb85c2bf0d3f61accf2618c71e9fdda5e51c6ebf09c85d` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-equiv-r5replay.out](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-equiv-r5replay.out) | 14795 | `25c0d759a58c4caf8c3bc949d2cdc9c547fe0962fdc394c53d9aafaeab5bb965` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-equiv-r5replay.out.time](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-equiv-r5replay.out.time) | 813 | `85ff3baed84102326daca3886be1488b84254d119fb77133709a163fbedcef74` |
| [spherical-six-pole-path-continuation-claude-continuation-steps10-cm471.py](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471.py) | 30499 | `05abecc028a2cf4f3875ab7adc4c4df9f12339d2401abdb0a1aff0125e7d3e5c` |

Total: 25 evidence files, 4873397 bytes. Scratch folder `.tmp/six-pole-path-continuation/continuation/`: 4316 KiB by `du -sk` (two r5 copies used as jq negatives, draft and earlier report states, the checker scripts). Nothing is in `.local-data`. No Git writes were made.
