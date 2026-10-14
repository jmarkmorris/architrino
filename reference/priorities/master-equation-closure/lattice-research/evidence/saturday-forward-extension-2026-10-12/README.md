# Evidence for the extension of the localized lattice family beyond its guaranteed time (2026-10-12)

This folder holds the two instruments written for the note [The localized lattice family beyond its guaranteed time](../../analysis/saturday-localized-forward-extension-2026-10-12.md), task 1 of the [continuation round](../../../../../op/agent-chats/2026-10-12-saturday-lattice-and-period-averages/chat.md). The note's results are hand derivations. The instruments evaluate its constants: lattice sums by interval arithmetic with an analytic tail, everything else in exact rational arithmetic with outward rounding. Neither integrates the equation or evaluates a history, and their agreement with the derivations is not independent evidence.

## The instruments

**[`forward_extension_constants.py`](forward_extension_constants.py)** takes one argument, the JSON file it writes. It uses `mpmath.iv` at 50 digits (mpmath 1.3.0, from the shared environment) and Python fractions.

- *Lattice sums.* $S_p(x)=\sum_{d\ne0}e^{-xr}/r^p$ is summed over the cube of half-width $30$, grouped by the integer $r^2$, with interval square root, exponential and division from exact rational $x$. The sites outside the cube with largest coordinate $m>30$ number $24m^2+2\le26m^2$ and lie at distance at least $m$, so for $p\ge2$ they add at most $26\,e^{-31x}/(1-e^{-x})$; the upper endpoint of this tail is added to the upper endpoint of the cube sum, and the total is rounded up to five or six decimals by integer division.
- *Constants.* The general-parameter expressions of the note's Lemma X3 (the expressions of the quantification note's Propositions Q3 and Q4 with chart radius, speed bound, range factor, time-shift factor and sum arguments as parameters) are evaluated in exact fractions from declared decimals. Each declared result is rounded outward.
- *Conditions.* The three conditions of Lemma X1 are evaluated exactly for the two declared pairs.
- *Tables.* Logarithms and exponentials are interval operations; lower bounds are rounded down and upper bounds up.

**[`weighted_absorption_constants.py`](weighted_absorption_constants.py)** imports the first instrument unchanged, for its helpers and its cascade function, and evaluates the weighted product constant on the chart of radius $1/100$ from the accepted weighted sums, in exact fractions (two interval exponentials for $\eta$ and $\mathsf s_1$).

## Known cases, run before any target

A failed known case stops the run with exit code 2 before any target.

| Group | What is compared | Kind of reference |
| --- | --- | --- |
| K1 | Rounding helpers on known rationals, including a negative number and a negative decimal place; exactness of an interval endpoint; brackets of $\sqrt2$, $e^0$, $\ln1$ | exact arithmetic (independent) |
| K2 | Lattice census: numbers of representations by three squares for $n=1,\dots,12$ ($6,12,8,6,24,24,0,12,30,24,24,8$); total count $61^3-1$; shell counts $24m^2+2$ | classical counts (independent) |
| K3 | The six weighted-argument sums of the quantification note, $S_{2,3,4}(2.4452)$ and $S_{2,3,4}(5.1404)$, reproduced at five decimals | accepted earlier values (same author, reviewed) |
| K4 | The preparation note's hand-majorant values $S_2(5.05)\le0.04938$, $S_3(5.05)\le0.04494$; for nine pairs $(p,x)$, first three shells $<$ enclosure $\le$ hand majorant; the unweighted $q(5.3)$ against the preparation note's $0.139$ | accepted earlier values (same author) for the three numbers; analytic bounds for the sandwich |
| K5 | Row constants at speed bound $3/16$ against $9.0336$, $4.5991$, $3.7288$ | accepted earlier values |
| K6 | The whole accepted contour cascade through the general-parameter code: $C_{\rm src}\le49.49$, $C_N\le849.2$, $\vartheta\le1.2270$, $C_{\rm src}'\le58.61$, $C_N'\le1023.8$, $q\le0.16035$, $C_L\le0.04099$, and the products $34.81$, $41.97$ | accepted earlier values |
| K7 | The accepted pair in the accepted conditions: $0.49021$ and $3.8124\times10^{-5}$; and that it satisfies the three conditions of Lemma X1 | accepted earlier values |

K6 checks that the code evaluates the accepted formulas correctly when given the accepted parameters. It does not check the substitutions of Lemma X3, which are a hand argument in the note. K3, K5, K6 and K7, and in K4 the two hand-majorant values and $q(5.3)$, compare with numbers produced earlier by the same author. Those are accepted regression values: they were reviewed, but they are not independent reference inputs, and reproducing them checks the code at the accepted parameters only. Independent of that work are K1, K2 and the analytic sandwich in K4 (first three shells below the enclosure, enclosure below the hand majorant). The separate [Codex review](../../analysis/saturday-localized-forward-extension-codex-review-2026-10-12.md) reconstructs the mathematics and audits the declared arithmetic in exact fractions from the declared inputs; it does not recompute the lattice sums or certify the interval library.

## Runs

All on 2026-10-12 (UTC), in the foreground through the owned-compute supervisor, with the shared environment's Python:

```text
node scripts/dev/owned-compute-supervisor.mjs run --owner-task <host session> --deadline-seconds 300 -- \
  /Users/markmorris/vibe/.venv/bin/python <instrument> <output.json>
```

| Run | Instrument version | Requested | Wall time | Exit | Outcome |
| --- | --- | --- | --- | --- | --- |
| `run1` | attempt 1 (`history/forward_extension_constants.attempt1.py`) | 18:10:52Z | $1.755$ s | 2 | stopped at K6; no target ran |
| `run2` | final `forward_extension_constants.py` | 18:11:10Z | $2.228$ s | 0 | all known cases passed; targets passed |
| `weighted1` | `weighted_absorption_constants.py` | 18:12:20Z | $0.096$ s | 0 | known case passed; target passed |

Each run's process group is recorded as closed by the supervisor.

**The failed first attempt.** K6 compared $C_N$ and $C_N'$ formed from the *unrounded* $C_{\rm src}$ and $C_{\rm src}'$, which gives $849.1$ and $1023.7$; the accepted note forms them from its *declared, rounded-up* $C_{\rm src}=49.49$ and $C_{\rm src}'=58.61$, which gives $849.2$ and $1023.8$. The other five quantities of K6 matched. The run stopped before any target, as designed. The comparison was changed to follow the accepted note's rounding order and nothing else was changed; attempt 1's source and its output are retained. The discrepancy is one unit in the last declared digit and comes from the order of rounding, not from the formulas.

**The pre-run draft.** Before the first run one known-case test was edited: K4's test of the hand majorant was changed from equality at five decimals after rounding up to membership in $(0.0493,0.04938]$ and $(0.0449,0.04494]$, because the preparation note states those two values as upper bounds and not as rounded-up endpoints. The draft was copied to `history/` before the edit and was never run.

## Results of `run2` and `weighted1`

- *Accepted constants, re-chosen radii.* $c=34.81$, $c'=41.97$, $\delta_A=0.0017$, $\varrho_A=0.00027$: $\delta_A+4\varrho_A=0.00278$; condition (I) left side $2.69025604\times10^{-4}\le2.7\times10^{-4}$; condition (II) left side $0.9334128<1$; (III) holds with chart $1/16$. $K_A=\lceil\varrho_A/\delta_A^2\rceil=93.5$.
- *Unweighted norm, chart $1/100$.* $\varpi\le0.026953$; $\mathsf m\le1.000364$; $c_{20},c_{11},c_{02}\le7.2247,\ 3.1693,\ 2.1709$; $\eta\le1.05539$; $\mathsf s_1\le0.07127$; $\vartheta\le1.02968$; $c_E\le0.4367$, $c_E'\le0.6551$. Sums: $S_2,S_3,S_4(2.6952)\le0.5897,\ 0.52522,\ 0.4851$; $S_2,S_3,S_4(5.3904)\le0.030598,\ 0.029603,\ 0.028921$. Then $C_{\rm src}\le17.681$, $C_{\rm src}'\le18.334$, $C_N\le289.9$, $C_N'\le303.9$, $q\le0.12343$, $C_L\le0.03927$, $c\le11.39$, $c'\le11.94$. Pair $\delta_1=0.0052$, $\varrho_1=0.00086$: reach $0.00864\le0.01$; (I) $8.50258944\times10^{-4}\le8.6\times10^{-4}$; (II) $0.8252928<1$. $K_1=31.9$. $\lfloor\delta_1/0.1144\rfloor=0.0454$ at three figures.
- *Tables.* As printed in the note's Sections 4 and 5; table A (the accepted-constants pair) is in `run2.out` and is summarised in the note's first table only.
- *Old time with the new coefficient.* $31.9\,\delta_0^2\le1.75\times10^{-5}$; the linear contribution at $T_*$ exceeds it at $\varepsilon=10^{-17}$ and $10^{-20}$ and not at $10^{-25}$, $10^{-28}$, $10^{-30}$, $10^{-35}$.
- *Weighted constant.* $C_{\rm src}^\omega\le23.475$, $C_N^\omega\le382.6$, $C_L^\omega\le0.04099$, $c^\omega\le15.69$; with $A_0=0.00864$, $4c^\omega A_0=0.5422464<1$ and $c^\omega A_0/(1-4c^\omega A_0)\le0.2962$.

## What these runs can and cannot establish

They establish that the declared decimals are upper (or lower) bounds of the displayed formulas, given the interval library's outward rounding, and that each displayed condition holds exactly with its displayed inputs. They do not establish the formulas, which are the note's hand derivation, and they compute no solution. The interval library's own correctness is assumed, as in the earlier evidence; the tail bound is analytic.

## Identities

Instruments are in this folder; outputs are retained outside Git in `.local-data/aaa-work-threads/saturday-continuation-2026-10-12/claude-task-1/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `forward_extension_constants.py` | 20,710 | `8c111d041dc780abd9bef5ec56183ecf7cf1c47a60a590b442eb391b6f216a85` |
| `weighted_absorption_constants.py` | 4,628 | `5bd04858eee8ad1fbec6ecfc3226df4fca7a978726ce2ef21a1c6cbad30a7e45` |
| `history/forward_extension_constants.attempt1.py` | 20,382 | `4153c79df10c3a785ab4d6c7b4def4c10022fe549dbc852a972ad927e7f85f57` |
| `history/forward_extension_constants.pre-run-draft.py` | 20,374 | `35f21f09097353cabf7b786c9a4853aac83ce4c3ec0a93daeb0dc7a94a02ed35` |
| `run1.json` | 4,194 | `6efce2316943932e94ba8b8194cc354596dd7f889beff2481ff2ccc56a491b1a` |
| `run1.out` | 2,566 | `e50f643f8f2d786a716ca8f63c9e762b34270fa1567887e80f729a151ab95f65` |
| `run1.supervisor.json` | 2,358 | `39dce4a14c9376efbbb8dc46b75a7ec5edd4c8fe47ec09cb173181f966e6950e` |
| `run2.json` | 10,720 | `36849d0b8e62e0a4d744d3cff837b74d2a411a1d08ceca28862803d604a78068` |
| `run2.out` | 8,528 | `8c7ce92b3fb06da66464ec5fb04454d41dddce5ca30a3ba91250a39745df78bb` |
| `run2.supervisor.json` | 2,361 | `b16c39ef7107b5af457398c830e8aa255b519b89457e85f70afef27cea07d1c0` |
| `weighted1.json` | 792 | `adffb02970cb89e2d6984bd7e6072759bc48d16bfee2ae9455c132dcb787b61d` |
| `weighted1.out` | 632 | `3162f16714afc6232591878105dfbf6857c354f2e1557749f83af4e77e49bcf6` |
| `weighted1.supervisor.json` | 2,374 | `217a3ed45857e4b7b7b1676646ffee92ca262f187042f80bab89a1a928525cdb` |

The three `*.stderr.log` files and the three `*.wrapper.err` files beside them are empty. The `*.out` and `*.stderr.log` files are copies of the supervisor's own logs; each `*.supervisor.json` is the supervisor's printed record.

A scratch float script, `.tmp/saturday-continuation-2026-10-12/task-1/scratch_float.py`, was used before the instrument was written to choose the chart radius and the declared pair. It is exploration, not evidence, and no number in the note is taken from it except the comparisons explicitly marked as float or scratch values in the note's Section 7 (the ceilings of conditions (I) and (II) alone, about $5.48\times10^{-3}$ and $1.74\times10^{-3}$, and the value of $c$ at chart radius $1/128$). The chart-limited ceiling $5.444\times10^{-3}$ of that section is exact arithmetic on declared values, $10^{-2}-4\times11.39\times10^{-4}$, and needs no instrument.

## Corrections after review

The Codex review requested four corrections, LEX1 to LEX4. In this file: the reference kinds are now stated consistently (LEX4), and the method ceilings are distinguished (LEX2). LEX1 concerns the note's Proposition X7; this file states only the factor $0.2962$, from which the note derives the displacement, velocity and acceleration factors $1.2962$, $1.5924\,a$ and $2.1848\,a^2$, or the common factor $1.2962$ after division by $(2a)^n$. LEX3 is a reading record in the note's Section 1. No instrument, draft, failed attempt or output was changed, and nothing was rerun. The README as first reviewed was 10,559 bytes, SHA-256 `e25de43fa12df3a573013fa4a012ecb957d1016ba9526ae2c5aff9addf7e0d3c`.
