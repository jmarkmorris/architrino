# Evidence for the combined breathing integral (2026-10-12)

This folder holds the one instrument written for the note [The combined breathing integral](../../analysis/saturday-combined-breathing-period-average-2026-10-12.md), the breathing stage of the [continuation round](../../../../../op/agent-chats/2026-10-12-saturday-lattice-and-period-averages/chat.md). The note's results are hand derivations. The instrument checks the note's exact identities on prescribed paths, where they are kinematics, records the sign of the breathing integral on those paths, and evaluates the note's constants in exact rational arithmetic. Prescribed paths do not obey the equation. Nothing here is evidence about solutions, and agreement of a same-session instrument with the derivation is not independent evidence.

## The instrument

[`combined_breathing_check.py`](combined_breathing_check.py) uses the Python standard library only and takes one argument, the JSON file it writes. It imports, by file path and without modifying it, the frozen instrument of the straight-term note, [`straight_strength_identity_check.py`](../saturday-straight-strength-period-average-2026-10-12/straight_strength_identity_check.py) (SHA-256 `ef781665…5a6b`), for its path class, its drawing of random breathing pairs, the functions $g$ and $\Phi$, the periodic trapezoid rule and the exact-rational rounding helpers. Random numbers come from one generator with seed `2026101202`, used in a fixed order.

- *Paths.* The imported breathing pairs (a common drift plus three circular harmonics for each member, rigidly repeating by translation), admitted by the imported filter sampled at 400 instants ($r\ge0.2$, $J\ge0.02\,r$, speeds at most $0.9$); that filter is not a certificate for every instant. Also, for one known case, a mirror pair $\mathbf x_1=-\mathbf x_2=\rho(t)(\cos\theta(t),\sin\theta(t))$ with periodic $\rho$ and non-uniform turning, written directly.
- *Kinematic form.* Where a formula of the note contains rows ($q_i$, $A_\parallel$, $A_\perp$), the instrument uses the paths' own accelerations. The identities checked hold in that form for any rigidly repeating paths; the note's bounds, which use the rows of a solution, are not tested.
- *Quadrature.* Periodic trapezoid rule with 4096 points; Simpson's rule with 2000 intervals on each half for the second-difference integral.

## Order of work

A failed known case stops the run with exit code 2 before any target. The run passed every known case at the first attempt; there is no earlier version of this instrument.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| K1 | $\varphi_2(3/5)=61/64$, $\varphi_2(0)=0$; $\Phi''=\varphi_2$ by five-point second differences at 200 points | hand values | pass; difference $7.3\times10^{-8}$ (threshold $10^{-6}$) |
| K2 | Simpson's rule: $\int_{-1}^1(1-\lvert s\rvert)\,ds=1$, $\int_0^1s^2ds=1/3$ | elementary integrals | pass |
| K3 | Second-difference integral at $d=0$, $m=3/5$ against $2\Phi(3/5)=1/25$ | hand value | pass, to $10^{-10}$ |
| K4 | Imported periodic trapezoid rule: $\oint\cos^2=\pi$ | classical integral | pass |
| K5 | Drift plus rigid rotation, 10 pairs: $r/J$ constant, so $\tilde B=0$ | hand-known family | pass; largest $3.7\times10^{-17}$ |
| K6 | Mirror pair with no common velocity and real breathing, 10 pairs: $H=-2\Phi(J/(2r))$ is a function of $J/r$, so $\oint H\,d(r/J)=0$ by an antiderivative | hand-known family | pass; largest $4.0\times10^{-14}$ of (largest weight $\times$ variation), with weight up to $0.0115$ and variation up to $36.2$ |
| exact controls | At $w=3/5$: $\sqrt{1-w^2}=4/5$, $\varphi_2=61/64$, $\kappa_B=93/256$ (formula values outside any theorem's range, arithmetic only) | exact arithmetic | pass |
| N | Null weights $d^2$, $2\Phi(d/2)$, $\sin3d$ with $d=J/r$, integrated against the change of $r/J$; 40 breathing pairs | none beyond the known cases | at most $1.5\times10^{-15}$ of the variation; threshold $10^{-11}$ |
| B | $\oint H\,d(r/J)$ against $\oint H'\,d(r/J)$; 40 pairs | none beyond the known cases | relative difference at most $8.6\times10^{-15}$; threshold $10^{-9}$ |
| C | $\Lambda_{\rm kin}+\tilde B$ against $-C_0+T_1+T_3$; 40 pairs | none beyond the known cases | defect at most $1.3\times10^{-14}$ of the sum of the term sizes; threshold $10^{-9}$ |
| S, W | Second-difference formula, and the two bounds on $H'$, at 800 sampled states | none beyond the known cases | formula to $1.2\times10^{-14}$ (threshold $10^{-9}$); bounds not exceeded (allowance $10^{-14}$, excess observed $0$) |
| ratio | Quadrature value of $\lvert\tilde B\rvert/(\kappa_B\oint\lvert\mathbf P\rvert^2\lvert d(r/J)\rvert)$ with $\kappa_B$ at the largest speed among the pair's 4096 quadrature instants | none | at most $0.614$; acceptance $\le1+10^{-12}$ |
| signs | Sign of the floating-point $\tilde B$ on the 40 pairs | none | 16 positive, 24 negative (observations) |
| Table | $\varphi_2$, $\kappa_B$, $c_1$, $c_2$, $c_3$, $1/\alpha$ at nine rational $w$ | exact rational arithmetic | printed; see the note |

In check B the relative difference is taken against $\max\{\lvert\tilde B\rvert,\ 5\times10^{-4}\times\text{variation}\}$, so that a pair with a very small $\tilde B$ does not inflate the ratio. In the "ratio" row, $\kappa_B$ is evaluated in floating point at the largest speed found among the 4096 quadrature instants. That sampled value may be below the pair's true largest speed, and the difference is not bounded here; the row reports the sampled coefficient and the quadrature ratio and certifies nothing about the full period. In row S, W the bounds on $H'$ use $\varphi_2$ at the state's own larger transverse speed and an absolute allowance of $10^{-14}$. The sign counts are floating-point observations on prescribed paths. The derived statement that kinematics permits either sign rests on the exact family in the [Codex review](../../analysis/saturday-combined-breathing-period-average-codex-review-2026-10-12.md#an-independent-exact-kinematic-family-with-both-signs), not on these counts.

All floating-point comparisons use the thresholds stated and have no certified enclosure of rounding, truncation or quadrature error. A pass means no sample failed beyond its threshold.

## How the table is made outward-safe

$w=p/q$ exactly; $\sqrt{1-w^2}$ is bounded below by the imported integer-square-root bound $s_{\rm lo}$. Then $\varphi_2\le1/s_{\rm lo}^3-1$ and $\kappa_B=(1+2\varphi_2)/8$ are exact fractions; $c_1=(1+w)^2/(1-w)$, $c_2=(3w+w^3)/(1-w^2)$, $c_3=(1+w)^3/(1-3w)^2$ and $1/\alpha=(1+w)/(1-w)^2$ are exact rationals. All are rounded up to four significant figures by integer division.

## Run

2026-10-12 (UTC), in the foreground through the owned-compute supervisor with the shared environment's Python: requested 19:06:00Z, wall time $2.766$ s, exit code 0, process group closed, nothing on standard error. It is the only execution.

Outputs are retained outside Git in `.local-data/aaa-work-threads/saturday-continuation-2026-10-12/claude-breathing/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `combined_breathing_check.py` | 14,331 | `8a6d312b541f950cee10d88ef2848333f148b95720f914178894ab16d614eaf1` |
| `run1.json` | 5,591 | `b8aac2f201447c51bc8475e03c2a2688f7ef7b090ae2caca40314bd0c94bd476` |
| `run1.out` | 4,855 | `a0e3a1f3487dfe615f7529d11f1244cda3716d5bfbb93b57f328e702c9cb9687` |
| `run1.supervisor.json` | 2,391 | `a4d1debe5f92791d9f937476c350e8f3142b68a734e4c58a8c932415b499e6b5` |

`run1.stderr.log` and `run1.wrapper.err` beside them are empty. `run1.out` is a copy of the supervisor's own log and `run1.supervisor.json` its printed record. The `history/` folder is empty because the instrument was not changed after it was written.

## Corrections after review

The Codex review requested three corrections, BR1 to BR3. In this file, BR3: the scale of check B, the allowance of the weight check, the acceptance of the ratio and the status of the sampled largest speed are stated, the sentence claiming the ratio's margin exceeds the sampling effect is withdrawn, and the sign counts are described as floating-point observations. BR1 and BR2 concern the note. The instrument, the imported module and the outputs are unchanged and nothing was rerun. The README as first reviewed was 7,129 bytes, SHA-256 `01ad3e0543c952924736f69d95aa1e8097de66b2f430fc848f9053e21c064491`.
