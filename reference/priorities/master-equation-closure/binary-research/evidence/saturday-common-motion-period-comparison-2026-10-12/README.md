# Evidence for the common-motion comparison (2026-10-12)

This folder holds the one instrument written for the note [The common-motion term against the gain](../../analysis/saturday-common-motion-period-comparison-2026-10-12.md), the last stage of the [continuation round](../../../../../op/agent-chats/2026-10-12-saturday-lattice-and-period-averages/chat.md). The note's results are hand derivations. The instrument checks the note's kinematic identity and its algebra on prescribed paths and evaluates the note's constants in exact rational arithmetic. Prescribed paths do not obey the equation. The note's bounds, necessary condition and exclusion use the rows of a solution and are not tested here. Agreement of a same-session instrument with the derivation is not independent evidence.

## The instrument

[`common_motion_balance_check.py`](common_motion_balance_check.py) uses the Python standard library only and takes one argument, the JSON file it writes. It imports, by file path and without modifying it, the frozen instrument of the straight-term note, [`straight_strength_identity_check.py`](../saturday-straight-strength-period-average-2026-10-12/straight_strength_identity_check.py) (SHA-256 `ef781665…5a6b`), for its path class, its drawing of random breathing pairs, the periodic trapezoid rule and the exact-rational helpers. Random numbers come from one generator with seed `2026101203`, used in a fixed order.

- *Paths.* The imported breathing pairs (a common drift plus three circular harmonics for each member), admitted by the imported filter sampled at 400 instants; that filter is not a certificate for every instant. For one known case, the exact prescribed family of the breathing review ($r=1$, $J=1/[10(1+\tfrac1{10}\cos t)]$, velocity sum along the axis), written at the level of its kinematic state.
- *Kinematic form.* $q_i$ is the paths' own acceleration across the axis. Where the note has row strengths, the instrument uses the straight strengths $a_i^0$ computed from the present velocities, and $q_1^0=-a_1^0b_2$, $q_2^0=-a_2^0b_1$; the difference $q_i-q_i^0$ is kept as an explicit term so that the identity checked is exact for any paths.
- *Quadrature.* Periodic trapezoid rule with 4096 points.

## Order of work

A failed known case stops the run with exit code 2 before any target. The run passed every known case at the first attempt; there is no earlier version of this instrument.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| K1 | $\tau_0=r(a_2^0b_1-a_1^0b_2)$ and the split of $\frac rJ\sum(b_i/S_i)q_i^0$ into its $P_\perp^2$ and $J^2/r^2$ parts, in exact fractions at two states with rational square roots; the first gives $\tau_0=3/8$ | exact arithmetic by hand | pass |
| K2 | $\sigma(3/5)=1/5$, $\sigma(0)=0$; $\sigma''=(1-b^2)^{-3/2}$ by five-point second differences at 200 points | hand values | pass; difference $5.2\times10^{-8}$ (threshold $10^{-6}$) |
| K3 | Imported trapezoid rule: $\oint\cos^2=\pi$; $\oint dt/(1+\tfrac1{10}\cos t)=2\pi/\sqrt{0.99}$ | classical integrals | pass, to $10^{-13}$ and $10^{-12}$ |
| K4 | Drift plus rigid rotation, 10 pairs: $\oint\tau_0=\Theta=2\pi$, acceleration term and $S$ term zero | hand-known family | pass; largest defect $7.3\times10^{-14}$ |
| K5 | Exact prescribed family with the velocity sum along the axis, both signs of its parameter: $\tau_0=J$, so $\oint\tau_0=\Theta=0.2\pi/\sqrt{0.99}$; $M_+^0=0$; acceleration term equals the $S$ term. This family has $P_\perp=0$, so $W_S=B_S=0$ on it: it is a zero-loss control and says nothing about the sign of $B_S$ | hand-known family (breathing review's construction) | pass; largest defect $4\times10^{-16}$ (threshold $10^{-13}$) |
| exact controls | At $w=3/5$: $\sqrt{1-w^2}=4/5$, $\kappa_M=4$, $\kappa_S=125/256$ (formula values outside any theorem's range, arithmetic only) | exact arithmetic | pass |
| P1 | Theorem C.1: $\oint\tau_0$ against $\Theta+\oint\frac rJ\sum(b_i/S_i)q_i-\oint(S_1+S_2)\,dx$; 40 breathing pairs | none beyond the known cases | defect at most $4.6\times10^{-15}$ of the sum of the term sizes; threshold $10^{-9}$ |
| P2 | $\oint\tau_0$ against $\Theta-M_+^0+M_{\rm rel}^0+B_S+\oint\frac rJ\sum(b_i/S_i)(q_i-q_i^0)$; 40 pairs | none beyond the known cases | defect at most $2.7\times10^{-15}$; threshold $10^{-9}$ |
| null | $\oint(2-S_1-S_2)\,dx$ against $\oint W_S\,dx$; 40 pairs | none beyond the known cases | at most $2.3\times10^{-16}$ of the variation of $r/J$ sampled at 1024 instants; threshold $10^{-11}$ |
| A1, A2 | The two algebraic identities at 800 sampled states | none beyond the known cases | relative defects at most $2.2\times10^{-14}$ and $7.1\times10^{-16}$; threshold $10^{-11}$ |
| W | $\tfrac14P_\perp^2\le W_S\le\tfrac14(1+\varphi_2(w_t))P_\perp^2$ at 800 sampled states, $w_t$ the state's own larger transverse speed | none beyond the known cases | excess $0$ (absolute allowance $10^{-14}$) |
| ratio | Quadrature value of $\lvert B_S\rvert/(\kappa_S\oint P_\perp^2\lvert dx\rvert)$, $\kappa_S$ at the largest transverse speed among 1024 sampled instants | none | at most $0.564$; acceptance $\le1+10^{-12}$ |
| Table | $\kappa_M$, $\kappa_S$, $4w^2\kappa_M$, $4w^2\kappa_S$, $e_1$, $e_2$ at nine rational $w$ | exact rational arithmetic | printed; see the note |

In A1 the relative defect is taken against $\lvert\tau_0\rvert$, and in A2 against $\lvert M_+^0\text{ integrand}\rvert+\lvert M_{\rm rel}^0\text{ integrand}\rvert$. In the "ratio" row the sampled largest transverse speed may be below the true largest by an amount not bounded here; the row reports the sampled coefficient and the quadrature ratio and certifies nothing about the full period. The output also prints the ranges of $M_+^0/\Theta$ and $B_S/\Theta$ over the 40 prescribed pairs ($0.027$ to $24$, and $-0.068$ to $0.21$); these describe the prescribed paths with formal straight strengths and say nothing about solutions.

All floating-point comparisons use the thresholds stated and have no certified enclosure of rounding, truncation or quadrature error. A pass means no sample failed beyond its threshold.

## How the table is made outward-safe

$w=p/q$ exactly; $\sqrt{1-w^2}$ is bounded below by the imported integer-square-root bound $s_{\rm lo}$. Then $\kappa_M\le(1+w)^2/(2(1-w)s_{\rm lo})$, $\kappa_S\le1/(4s_{\rm lo}^3)$, $c_3=(1+w)^3/(1-3w)^2$ exactly, $e_1=c_3+w\,c$ with $c$ the accepted declared upper bound of the curved-window note's table, taken as declared, and $e_2\le w\,c_3/s_{\rm lo}$. All are rounded up to four significant figures by integer division.

## Run

2026-10-12 (UTC), in the foreground through the owned-compute supervisor with the shared environment's Python: requested 19:29:50Z, wall time $1.349$ s, exit code 0, process group closed, nothing on standard error. It is the only execution.

Outputs are retained outside Git in `.local-data/aaa-work-threads/saturday-continuation-2026-10-12/claude-lambda/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `common_motion_balance_check.py` | 13,781 | `6405c8510e06429224218ff1984575b60f6a7f511b8d8ba3a5b24d757951fa57` |
| `run1.json` | 5,173 | `3ec38cae32a2a50b4eec9f6679ec9cc234f2c3365a31d0689aaedf11ec402a75` |
| `run1.out` | 4,409 | `e1e5ac9b2b2d1ab1230951b8ee51a576ffa65b23708128c57b6990b41ef44067` |
| `run1.supervisor.json` | 2,387 | `b44eebbdc75c2e9d8122b05603e2b17ebc65e8a8d65f64a105f29a07a6c11611` |

`run1.stderr.log` and `run1.wrapper.err` beside them are empty. `run1.out` is a copy of the supervisor's own log and `run1.supervisor.json` its printed record. The `history/` folder is empty because the instrument was not changed after it was written.

## Corrections after review

The [Codex review](../../analysis/saturday-common-motion-period-comparison-codex-review-2026-10-12.md) requested three corrections, CM1 to CM3, all in the note. In this file one clarification follows from CM2: the K5 family has $P_\perp=0$ and is a zero-loss control only. The instrument does not compute the review's separate transverse-sum family; that family's two signs of $B_S$ are a hand derivation in the review, repeated in the note, and no run was made for it. The instrument, the imported module and the outputs are unchanged and nothing was rerun. The README as first reviewed was 7,553 bytes, SHA-256 `688286e1387a2376c28a23dc74770f9ad01928bf06a2a392453009e5d4feab95`.
