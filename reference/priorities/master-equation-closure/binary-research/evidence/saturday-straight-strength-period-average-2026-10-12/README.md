# Evidence for the exact reduction of the straight strength-difference term (2026-10-12)

This folder holds the one instrument written for the note [The straight strength-difference term over a period](../../analysis/saturday-straight-strength-period-average-2026-10-12.md), phase 2 of the [continuation round](../../../../../op/agent-chats/2026-10-12-saturday-lattice-and-period-averages/chat.md). The note's results are hand derivations. The instrument checks the identity of the note's Theorem Z on prescribed paths, where it is kinematics, and evaluates the note's constants in exact rational arithmetic. Prescribed paths do not obey the equation; nothing here is evidence about solutions, and agreement of a same-session instrument with the derivation is not independent evidence.

## The instrument

[`straight_strength_identity_check.py`](straight_strength_identity_check.py) uses the Python standard library only and takes one argument, the JSON file it writes. Random numbers come from one generator with seed `20261012`, used in a fixed order.

- *Paths.* Both members share a drift $\mathbf V$; each adds circular harmonics $A_k(\cos(k\omega t+\varphi_k),\sin(k\omega t+\varphi_k))$ with $k=1,2,3$. The pair repeats rigidly with period $2\pi/\omega$ (a translation, no rotation). Positions, velocities and accelerations are analytic. A drawn pair is kept only if, at 400 instants of the period, $r\ge0.2$, $J\ge0.02\,r$ and both speeds are at most $0.9$. This admission is a sampled filter. It does not certify that $r>0$, $J>0$ and speeds below one hold at every instant of the period.
- *Quantities.* $u_i$, $b_i$ are the velocity components along and across the axis; $q_i$ is the path's own acceleration across the axis; $J=r(b_1-b_2)$, $\dot r=u_1-u_2$, $\dot J=r(q_1-q_2)$. The integrands of $Z_0$, $T_1$, $B_\Phi$, $T_3$ are formed from these as in the note.
- *Quadrature.* The periodic trapezoid rule, which converges faster than any power for analytic periodic integrands.

## Order of work

A failed known case stops the run with exit code 2 before any target.

| Stage | What is compared | Kind of reference | Result of run 2 |
| --- | --- | --- | --- |
| K1 | $g(3/5)=1/4$, $\Phi(3/5)=1/50$; $\Phi'=b\,g$ and $\Gamma'=g$ by five-point differences at 200 points; the closed form $b^4/(2(1+S)^2)$ against the series $b^4/8+b^6/16+5b^8/128$ at $b=0.01$ and against $1/50$ at $3/5$; the direct form of $\Phi$ against the closed form at 200 points | hand values, series | pass; derivative defect $4.5\times10^{-9}$ (threshold $10^{-8}$); direct against closed form $8\times10^{-17}$ (threshold $5\times10^{-16}$) |
| K2 | The split of the note's Lemma Z.2 in exact fractions on two hand cases; the first gives $3/100$ on both sides | exact arithmetic by hand | pass |
| K3 | $\oint\cos^2=\pi$; $\oint e^{\cos t}dt=2\pi I_0(1)=7.954926521012845$ | classical integrals | pass, to $10^{-13}$ and $10^{-12}$ |
| K4 | Drift plus rigid rotation on two circles of different radii, 20 pairs: $Z_0=T_1=B_\Phi=T_3=0$ although the integrand of $Z_0$ is not zero | hand-worked family (note, Section 2) | pass; largest integral $1.6\times10^{-16}$ of (largest integrand $\times$ period), with integrands up to $3.3\times10^{-3}$ |
| exact controls | At $w=3/5$, where the square root is exactly $4/5$: $g=1/4$, $\Phi=1/50$, $\tau_1=2\cdot\tfrac9{25}\cdot\tfrac14\cdot64$, $\tau_3=\tfrac35\cdot\tfrac14\cdot64$ (formula values outside the theorem's range, arithmetic only); two rounding controls | exact arithmetic | pass |
| T1 | Pointwise identity of Theorem Z at 1000 states of 40 breathing pairs, the rates of $\Phi(b_i)$ and $\Gamma(b_i)$ taken by five-point differences of the paths' own $b_i(t)$ with step $10^{-4}$ of the period | none beyond the known cases | largest defect $1.05\times10^{-13}$ absolute, $6.7\times10^{-8}$ of the sum of the term sizes; threshold $10^{-7}$ |
| T2 | Period identity $Z_0=T_1+B_\Phi+T_3$ on 40 breathing pairs, 4096 quadrature points | none beyond the known cases | largest defect $9.8\times10^{-15}$ of the sum of the term sizes; threshold $10^{-9}$ |
| Table | $g(w)$, $\Phi(w)$, $\tau_1(w)$, $\tau_3(w)$ at nine rational $w$, and $\rho_Z+\rho_e+\tau_3$ at five | exact rational arithmetic | printed; see the note |

In T1 the finite-difference rates are computed from the paths and not from the relation $\dot b_i=q_i-\Omega u_i$, so the check does not assume the lemma it tests. Its defect is at the level of the finite-difference error, and the margin to the threshold is small ($6.7\times10^{-8}$ against $10^{-7}$). T2 does not use finite differences; it uses $\dot r$ and $\dot J$ from the paths' velocities and accelerations.

All floating-point comparisons are made with the thresholds stated; none has a certified enclosure of rounding or truncation error. A pass means no sample failed beyond its threshold.

## How the table is made outward-safe

$w=p/q$ exactly. $\sqrt{1-w^2}$ is bounded below by $s/(q\,10^{40})$ with $s$ the integer square root of $(q^2-p^2)\,10^{80}$. The upper values $g\le1/s_{\rm lo}-1$, $\Phi\le1-s_{\rm lo}-w^2/2$, $\tau_1=2w^2g(1+w)^3/(1-w)^3$ and $\tau_3=w\,g(1+w)^3/(1-w)^3$ are exact fractions, rounded up to four significant figures by integer division. The last column adds the accepted $\rho_Z+\rho_e$ of the curved-window note, taken as declared there, and rounds up at four decimals.

## Runs

Both on 2026-10-12 (UTC), in the foreground through the owned-compute supervisor with the shared environment's Python:

| Run | Instrument version | Requested | Wall time | Exit | Outcome |
| --- | --- | --- | --- | --- | --- |
| `run1` | attempt 1 (`history/straight_strength_identity_check.attempt1.py`) | 18:44:52Z | $0.126$ s | 2 | stopped at a K1 known case; no target ran |
| `run2` | final | 18:45:13Z | $4.599$ s | 0 | all known cases and controls passed; targets passed |

**The failed first attempt.** K1 compared the direct form $1-\sqrt{1-b^2}-b^2/2$ with its series at $b=0.01$ to an absolute $10^{-17}$. There the direct form subtracts nearly equal numbers and is accurate only to rounding error of order $10^{-16}$; the difference was $1.15\times10^{-17}$ and the case failed. The fault was the test's tolerance, not the function. The comparison was changed to use the cancellation-free closed form $b^4/(2(1+\sqrt{1-b^2})^2)$ against the series to a relative $10^{-12}$. The same edit added two controls that attempt 1 did not have: the closed form's hand value $1/50$ at $b=3/5$, and the direct form against the closed form at 200 random points to $5\times10^{-16}$. The target routines, and the formulas they and the table evaluate, were not changed. The 200 added random draws are taken from the shared generator before K2 to K4 and the targets, so every later random quantity in the final run, including the K4 pairs and all target paths, differs from what attempt 1's sequence would have produced. Attempt 1 stopped before any target, so it has no target output and no comparison of targets between the versions is possible or claimed. Attempt 1's source and output are retained, as are the final source and output. The direct form is what the targets use; at the values of $b_i$ in the targets its rounding error is far below the thresholds.

## Identities

Outputs are retained outside Git in `.local-data/aaa-work-threads/saturday-continuation-2026-10-12/claude-z0/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `straight_strength_identity_check.py` | 14,872 | `ef781665b9996746e2f6d6e850bed2c4954db28a1dbf17d2bb4fbfa60ef75a6b` |
| `history/straight_strength_identity_check.attempt1.py` | 14,000 | `ff8333fb531cd799c494c2a47c358127b3ab6cd551251dafeee9113541c17c15` |
| `run1.json` | 1,276 | `6e8a3677049712165c7fb4fab650001a9e6b5b347485eecf2e2e8a970ca5f38f` |
| `run1.out` | 761 | `ae7cf45d256da0e417f634e274fb466c368fedd26d96aec4d6324e5f89cc6d5e` |
| `run1.supervisor.json` | 2,387 | `c3a043750f1d927a82c1246f23faba6e1be9bd24ac6bb6c770227900e6c561f5` |
| `run2.json` | 5,437 | `e0201927cd851ea0b538a0f336f7a2112ccedc3657a9056f8fbd48abd1d422ef` |
| `run2.out` | 4,551 | `5c9cbbf81da540ba8937cc3be892071a796cfd21477f141d0a2a83aa24944806` |
| `run2.supervisor.json` | 2,391 | `946bd5406955acb6439316ac5cc1510ee0322fc780829e459d13a5baed3bc086` |

The two `*.stderr.log` files and the two `*.wrapper.err` files beside them are empty. Each `*.out` is a copy of the supervisor's own log and each `*.supervisor.json` its printed record.

## Corrections after review

The [Codex review](../../analysis/saturday-straight-strength-period-average-codex-review-2026-10-12.md) requested four corrections, ZR1 to ZR4. In this file, ZR3: the account of the change between attempt 1 and the final instrument now lists the two added controls and the changed random sequence, and the path admission is described as a sampled filter. ZR1, ZR2 and ZR4 concern the note. No instrument or output was changed and nothing was rerun. The README as first reviewed was 7,724 bytes, SHA-256 `dfaebf4b70a2836b2160f7b31868646eab7a713d0f7585459250d94ca83c57d2`.
