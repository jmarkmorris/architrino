# Evidence for the summed signed lattice remainder (2026-10-18)

This folder holds the one instrument written for the note [The summed signed remainder of the localized lattice family and a later barrier](../../analysis/saturday-summed-signed-lattice-remainder-2026-10-18.md), task 2 of the [round of 2026-10-17](../../../../../op/agent-chats/2026-10-17-saturday-correlations-six-hour/chat.md). The note's lemmas are hand derivations. The instrument evaluates their closed-form bounds in exact rational arithmetic, together with the barrier conditions built from them. It integrates nothing, evaluates no history and proves no lemma, so its agreement with the derivation is not independent evidence.

## The instrument

[`signed_barrier.py`](signed_barrier.py) takes one argument, the JSON file it writes. Its imports, all by file path and none modified:

- the frozen evolved-history instrument [`evolved_history_bootstrap.py`](../saturday-evolved-history-continuation-2026-10-12/evolved_history_bootstrap.py), for its chart-parameter routine, declared constants ($C_L$, $Z_5$, the six lattice sums, $a$, $\bar\Lambda_0$, $p_0$, $\theta$) and the accepted polynomial $F$;
- through it, the frozen extension instrument, for row constants, exact rounding helpers and the interval exponential and logarithm (`mpmath.iv`).

Importing the latter runs its lattice census; no lattice sum is enclosed in these runs.

**What it computes:**

- the third-derivative constants of Lemma L.1, from $D\ge1-\varpi$ and the accepted upper bound for $\mathsf m$;
- the per-offset bounds of Lemma L.2 (odd part) and Lemma L.3 (one source-difference bracket), as exact polynomials in $A$, $q=\mu d$, $y$, $\mathsf s$ and powers of $1/r$;
- the sums over offsets, with the declared sums $S_k(a)$ and $S_k(2a)$, $k=2,3,4$, and three replacements: $S_5\le S_4$; $S_1(a)\le0.69831$ (quantification note); and $S_1(2a)\le e^{-a}S_1(a)$, with $e^{-a}$ enclosed from above;
- powers $\mathsf s^j$ with $j\ge3$, reduced by $\mathsf s\le\mathsf s_1$;
- $F_{\rm sgn}=g[c_{E3}A^3+\Sigma_{\rm br}+\tfrac12\mathcal O]$ and the barrier conditions.

Every slope or coefficient is formed from upper bounds; every comparison is exact.

## Order of work

A failed known case writes the partial record and stops with exit code 2 before any target. Both versions passed every known case at their first execution.

Before its first execution, version 1 was edited once. That edit made $\mathsf s^j$ with $j\ge3$ use $\mathsf s_1^{j-2}$, because the first draft handled only $j\le3$ while the bracket products reach $j=5$. It also added the known case K2b.

Version 2 adds, after the version-1 targets and without changing any version-1 function, the declared starts on chart $1/16$, the gains over $T_S$ and the central growth table. Within the new block, one interval conversion was fixed before execution. Version 1 is retained as [`history/signed_barrier.v1.py`](history/signed_barrier.v1.py).

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| K1 | expansion of $(A+q\mathsf s)^2q\mathsf s$ | hand algebra | pass |
| K2 | Lemma L.1 constants at rest ($\varpi=0$, $\mathsf m=1$): $6,12,20,24+10.1548$ | hand values | pass |
| K2b | $1.1548^2\cdot3\ge4$, so $1.1548\ge2/\sqrt3$ | exact | pass |
| K3 | rest bound $c_{30}\ge24$, the exact rest norm of $\nabla^4(1/\rho)$ | exact | pass |
| K4 | chart $1/20$: $c_{20}\le8.3344$, $c_{11}\le4.032$, $c_{02}\le3.0877$, $\eta\le1.30935$, $\mathsf s_1\le0.08842$ | accepted declared values | pass |
| K5 | $\mu(1/20)\le0.83528$ | accepted declared value | pass |
| K6 | frozen $C_LF(0.018,0.009072)$ on chart $1/25$ in $(0.0090317,0.0090318]$ | accepted regression value | pass ($0.0090317652\ldots$) |
| K7 | $\lvert\partial_R^3\Psi\rvert/c_{30}$ at 300 random arguments, by central differences | sampled float check | pass (largest $0.661$) |
| v1 targets | Lemma L.1 constants, the summed polynomials, $C_LF_{\rm sgn}$ at the accepted endpoint, barrier scans on charts $1/20$, $1/18$, $1/16$ | exact | as in the note, Section 5 |
| v2 targets | four declared starts on chart $1/16$: (b) at the declared endpoint, chart and start conditions, validity of $\mu$, gain over $T_S$, central growth bound | exact; interval logarithm and exponential | as in the note, Theorem L.5 |

K1–K3 are independent of earlier work. K4–K6 are regression checks against accepted same-author values. K7 is a sampled float comparison and proves nothing between samples. None of them validates Lemmas L.1–L.3 or Theorem L.4.

## Runs

Both runs took place on 2026-10-18 (UTC), in the foreground through the owned-compute supervisor with the shared environment's Python. Each exited with code 0, closed its process group and wrote nothing on standard error. Owned-compute closeout afterwards reported `clear`. Outputs are kept outside Git in `.local-data/aaa-work-threads/saturday-correlations-six-hour-2026-10-17/claude-lattice/`.

| Run | Version | Requested | Finished |
| --- | --- | --- | --- |
| 1 | v1 | 11:21:53.097Z | 11:21:53.291Z |
| 2 | v2 | 11:23:23.189Z | 11:23:23.378Z |

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `signed_barrier.py` (v2) | 14,275 | `267a234e5e68c84d764e95ad0479465f1e6c3e32c871a42f792f5defb9699c82` |
| `history/signed_barrier.v1.py` | 12,343 | `38670e1fba08798b8d982b12cae43a6499517d4e27bcddf2f4bb52e9401354e8` |
| `run1.json` | 5,035 | `c6a19accd9d172e97165a7045667efd90482d0da91fea2fc8ae088a82c86ee64` |
| `run1.out` | 1,610 | `331eead76008cb26eb3cacb600d58ca6de85aa17f0a74620ed0afd5055525b8b` |
| `run1.supervisor.json` | 2,382 | `f126ae403190550aa67511663726b0be3cd82ab8f1187202dc66764138090d7d` |
| `run2.json` | 7,901 | `2757ee559cc7a234b3dba36fad0de796360f4648a700595714b6cc33051b5c6f` |
| `run2.out` | 2,737 | `bb0fc804bd358fb102c439ce08d87ed39082773609aab466e71400f168417c24` |
| `run2.supervisor.json` | 2,383 | `ad4fdb6fe09090f6ab6ecd5df42f1231e08eb2fbad3b5594002d4c45f1404da6` |

The four standard-error and wrapper files are empty. Each `.out` file is a copy of the supervisor's standard-output log.

The JSON files store polynomial coefficients as floats, for display only; the barrier comparisons inside the instrument are exact. Each decimal the note quotes from these runs is rounded in the conservative direction. Two float breakdowns of $C_LF_{\rm sgn}$ in the note, Sections 4–5, come from a scratch script run on `run1.json`; they are orientation, not evidence.

## Corrections after review

The [independent review](../../analysis/saturday-summed-signed-lattice-remainder-codex-review-2026-10-18.md) supports the note's lemmas and assembly and reproduces its barrier values with a separately authored reference. Its clarifications SL1–SL3 were made on 2026-10-18 in the note and in this README only; neither instrument version nor any output was changed, and nothing was rerun. Three points bear on this folder. The growth table of version 2 covers only four amplitudes; the note now proves the emptiness of that particular lower bound for every admitted amplitude by hand. The three-part breakdown at the new endpoint quoted in the note comes from the review's reference, not from these runs. And the "Two float breakdowns" sentence above applies to the old endpoint only.

First reviewed identities, superseded by the corrected files: the note, 31,030 bytes, SHA-256 `64fd835c070d914034ec8a34254c6d1e2eca7fa492f9a0afc9203d5f93ca3404`; this README, 6,452 bytes, SHA-256 `54f618d7195fb8c270aef50af2fc116f50f8189004bcd545b47cd35faf62e29e`. Copies are kept in `.tmp/saturday-correlations-six-hour-2026-10-17/claude-lattice/pre-sl/`.
