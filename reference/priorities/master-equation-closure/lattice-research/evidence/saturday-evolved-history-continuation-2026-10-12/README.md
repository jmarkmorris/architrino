# Evidence for the evolved-history continuation of the localized lattice family (2026-10-12)

This folder holds the one instrument written for the note [The localized lattice family followed along its own evolved history](../../analysis/saturday-localized-evolved-history-continuation-2026-10-12.md), the lattice task of the [evolved-history round](../../../../../op/agent-chats/2026-10-12-saturday-evolved-history-and-geometry/chat.md). The note's results are hand derivations. The instrument evaluates the note's polynomial $F$ and its conditions in exact rational arithmetic from declared constants. It integrates nothing and evaluates no history, and its agreement with the derivation is not independent evidence.

## The instrument

[`evolved_history_bootstrap.py`](evolved_history_bootstrap.py) takes one argument, the JSON file it writes. It imports, by file path and without modifying it, the frozen instrument of the extension note, [`forward_extension_constants.py`](../saturday-forward-extension-2026-10-12/forward_extension_constants.py) (SHA-256 `8c111d04…6a85`), for its exact-rational rounding helpers, its row-constant routine (Lemma Q1 for a given speed bound) and its interval exponential and logarithm (`mpmath.iv`, 50 digits, mpmath 1.3.0). Importing that module also runs its lattice census; no lattice sum is enclosed in this run.

**Declared inputs, taken as exact decimals from the accepted extension note:** $a\in[2.6952,2.6953]$; $C_L\le0.03927$; $Z_5\le10.3824$; $S_2,S_3,S_4(2.6952)\le0.5897,\ 0.52522,\ 0.4851$; $S_2,S_3,S_4(5.3904)\le0.030598,\ 0.029603,\ 0.028921$; $\delta_1=0.0052$, $\varrho_1=0.00086$, $K_1=31.9$; and from the quantification note $\bar\Lambda_0=0.1144$, $p_0=0.0763$, $\theta=0.9308$, $\lambda_+<2.8953$. Their authority is those notes and their reviews, with the interval library's outward rounding assumed there.

**Chart parameters** for a radius $\rho$ are formed as in the extension note: $\varpi=2.6953\,\rho$; $\kappa=1-2\rho$; $\eta$ the upper interval endpoint of $e^{2\cdot2.6953\rho}$ rounded up at five decimals; $\mathsf s_1$ that $\eta$ times the upper endpoint of $e^{-2.6952}$, rounded up at five decimals; $c_{20},c_{11},c_{02}$ from the imported routine, rounded up at four decimals; $c_{E3}=4Z_5/(1-\rho)^5$ rounded up at three decimals. Everything after that is exact fractions.

## Order of work

A failed known case stops the run with exit code 2 before any target. The run passed every known case at the first attempt; there is no earlier version of this instrument.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| K1 | $F$ with all sums, $\eta$, $\kappa$, $a$ and row constants equal to $1$, $\mathsf s_1=\tfrac12$, $c_{E3}=0$, $g=1$, at $d=y=1$: by hand $\tfrac{41}8+27+2+\tfrac{29}2=\tfrac{389}8$; and with $c_{E3}=2$ the value rises by $c_{E3}A^3=16$ | hand value, exact | pass |
| K2 | With $y=0$ on the chart $1/100$: $F(\rho,0)/\rho^2$ rounded up at one decimal equals the accepted $C_N\le289.9$ (value $289.8825\ldots$); the chart parameters equal the accepted declared $\eta$, $\mathsf s_1$, $c_{20}$, $c_{11}$, $c_{02}$ | accepted regression values (same author, reviewed) | pass |
| K3 | $F(d,y)\le289.9\,(d+4y)^2$ on the chart $1/100$ at the accepted pair and three other points | accepted regression value | pass |
| K4 | $11.39\times(0.0052+4\times0.00086)^2=8.50258944\times10^{-4}$ | accepted regression value, exact | pass |
| K5 | Rounding helpers on $1/3$ and $2/3$ | exact | pass |
| K6 | $F(d,28d^2)/d^2$ nondecreasing over $d=0.002,0.005,0.009,0.014,0.018$ on the chart $1/25$ ($445.04$, $488.05$, $549.54$, $634.35$, $709.85$, printed values rounded to nearest) | the note's scaling argument | pass |
| main | Chart $1/25$; $(\delta_2,K_2)=(0.018,28)$: (a) $\delta_2+2y_2=0.036144\le0.04$; (b) $C_LF(\delta_2,y_2)=0.00903176\ldots<y_2=0.009072$; (c) $C_LF(\delta_1,Y)<Y$ at $Y=28\,\delta_1^2$ and at $Y=31.9\,\delta_1^2$ | exact arithmetic | all hold |
| ladder | For $\delta=0.0052,0.008,0.012,0.015,0.018$: first $K$ in steps of $\tfrac12$ from $5$ passing (a), (b), (c) | exact arithmetic | $18.5$, $20$, $22.5$, $24.5$, $28$ |
| tables | $T_B$, $T_E$ and central lower bounds for $\varepsilon=10^{-3},\dots,10^{-6}$ | interval logarithm and exponential, outward rounding | printed; see the note |

K1 and K5 are independent of earlier work. K2 to K4 compare with values produced earlier by the same author and reviewed; they show that the code evaluates the accepted formulas at the accepted parameters, and that the refined polynomial reduces to and lies below the accepted bound there. They do not validate the note's Lemma E.2, which is a hand derivation. K6 samples a property the note proves.

Chart $1/25$ values printed by the run: $\varpi=0.107812$, $\kappa=0.92$, $\eta\le1.24064$, $\mathsf s_1\le0.08378$, $c_{20}\le8.0209$, $c_{11}\le3.7836$, $c_{02}\le2.8162$, $c_{E3}\le50.934$. Main-pair consequences: displacement at most $0.027072$; speed at most $0.09742$; acceleration at most $0.39439$; separation at least $0.945856$; transmitter factor at least $0.90258$; gain at least $0.428$.

The "ladder" values are the first passes on a grid of one half, not minima.

## Run

2026-10-12 (UTC), in the foreground through the owned-compute supervisor with the shared environment's Python: requested 21:25:14Z, wall time $0.123$ s, exit code 0, process group closed, nothing on standard error. It is the only execution.

Outputs are retained outside Git in `.local-data/aaa-work-threads/saturday-evolved-history-2026-10-12/claude-lattice/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `evolved_history_bootstrap.py` | 11,340 | `b50b95f302bac6213d216a4b7f5eada6e9018bc75c8de00d512bbceeb65838d2` |
| `run1.json` | 4,326 | `e8230f0b0ea32d596231c5d0e9b96ff2e705ad9caabf111e0fea1d93a75490d9` |
| `run1.out` | 3,755 | `7013b35ca680895fe530e0f07714c0e040acf8ac4e788ccf4e9322f1b3291869` |
| `run1.supervisor.json` | 2,387 | `df1d74a280bf1c15abf545fd763dc374fdcefcfc7eb1df5999e42dc25195ddbe` |

`run1.stderr.log` and `run1.wrapper.err` beside them are empty. `run1.out` is a copy of the supervisor's own log and `run1.supervisor.json` its printed record. The `history/` folder is empty because the instrument was not changed after it was written.

A scratch float script, `.tmp/saturday-evolved-history-2026-10-12/lattice/scratch_float.py`, was used before the instrument was written to choose the chart radius and the pair. It is exploration, not evidence; the note quotes it only where it says so, in its Section 5. Its scope: five chart radii ($0.02$, $0.03$, $0.04$, $0.05$, $0.0625$); $\delta$ raised from $0.0052$ by factors of $1.02$; for each $\delta$, a $K$ sought on the grid of one half from $5$ to $199.5$ satisfying the chart and barrier inequalities in floating point; stop at the first $\delta$ with none. Last passing values: about $0.0137$, $0.0171$, $0.0188$, $0.0192$, $0.0185$. These are the search's findings on those charts and grids. They are not ceilings of the estimate and support no statement about other charts; the words "approximate ceilings" in the first returned version of this README are withdrawn.

## Corrections after review

The [Codex review](../../analysis/saturday-localized-evolved-history-continuation-codex-review-2026-10-12.md) supports the lemmas, the main theorem and the smaller barriers at derived grade, conditional on the accepted declared bounds, and asked for four corrections, EHR1 to EHR4. They were made on 2026-10-12 between 21:40Z and 21:43Z, in the note and in this README only. The instrument, its outputs and the scratch script were not changed, and nothing was run.

- **EHR1 (reading).** The note's Section 1 has a new paragraph recording what was read after the review, with times, and stating that those readings followed the derivation and the run. Its original coverage paragraph is unchanged.
- **EHR2 (no ceiling from a sampled search).** The note's lead, Section 5, limits and proposed propagation, and the paragraph above, now describe the float search with its scope and draw no ceiling, optimality or other-chart conclusion from it. The signed operator bound is labelled an inferred candidate, not a smallest sufficient estimate.
- **EHR3 (the whole linear coefficient).** The note's Section 5 now gives the complete coefficient of the term linear in the correction, $C_L[B_2d+3D_3d^2]$, names its three contributions, and quotes the review's values $17.7428\ldots d$ for the whole leading part and $15.1421\ldots d$ for the receiver-correction, source-seed part that the first version had quoted alone. The two decimals are the review's; the instrument of this folder did not compute them. No barrier calculation changes.
- **EHR4 (notation).** In the proof of Lemma E.2 the lattice offset is now $\ell$; $d$ is only the scalar seed bound.

First reviewed identities, superseded by the corrected files: the note, 30,293 bytes, SHA-256 `1499c54035cf6a7627bd32932e8039e668132b5f32abcbacb091682391af81a3`; this README, 6,613 bytes, SHA-256 `059b82c151c1eff1729587e741663b71bd32cf142096135154d9047adfbdd0b0`. Copies of both are kept in `.tmp/saturday-evolved-history-2026-10-12/lattice/pre-ehr/`.
