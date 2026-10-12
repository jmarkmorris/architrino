# Instruments of the Saturday follow-up round (2026-10-11)

This directory holds byte-for-byte copies of the session instruments of the follow-up round, one section per task. They are records of what was run. They are not repository tests, they import no solver, oracle or certified instrument, and they are a reference only for the notes that cite them.

## Task 1: forward evolution of the localized lattice preparation

Subject: [forward-evolution note](../../analysis/saturday-localized-forward-evolution-2026-10-11.md).

| File | Bytes | SHA-256 | What it does |
| --- | ---: | --- | --- |
| `task-1-forward_constants.py` | 4359 | `3a004f4d6ec9cd3fbd94bb047a25b3d06d7cbc9017eb096930766492d6d4bb65` | Evaluates lattice sums and the explicit rate $\nu_*(\rho,\varpi)$ of the note's Proposition 4 at $g=16$, $a=2.65$, for five pairs of margins. It integrates nothing and solves no equation. |

The copy was compared with its original `.tmp/saturday-followups/task-1/forward_constants.py` by `cmp`.

**Known cases, run first; the script stops if one fails.** (K1) the separable sum $\sum_{d\ne0}e^{-s(\lvert d_1\rvert+\lvert d_2\rvert+\lvert d_3\rvert)}$ at $s=0.7$ against its closed form; (K2) a two-sided estimate for $Z_4=\sum_{d\ne0}\lvert d\rvert^{-4}$ from the floating cube sum and shell-count terms, which must contain the literature value $16.5323$ (see the defect below: its upper end is not a bound for the infinite sum); (K3) the hand majorants of the preparation note for $S_2$ and $S_3$ at $5.05$, which must dominate the direct sums and equal $0.04938$ and $0.04494$ to the quoted figures.

**Command and settings.** From a scratch directory, with the shared environment: `"${AAA_VENV:-../.venv}/bin/python" <path>/task-1-forward_constants.py <output.json>`. Cube half-width 60, double precision, no random numbers. It ran in under one second.

**Outputs**, retained as byte copies in the ignored local directory `.local-data/master-equation-closure/saturday-followups/claude-task-1/` with `manifest.json`:

| Output | Bytes | SHA-256 |
| --- | ---: | --- |
| `task-1-forward_constants.out` | 992 | `4ab9ccdac3bdb432ba06fc7f7ab9ebedf13499cfec1bf30d6d87803eafd0e437` |
| `task-1-forward_constants.json` | 1144 | `7e1c76e44e88590babc99197559777823ca9276280adb43f558f2a04031cfb5d` |

The `.out` file ends with three timing lines from the shell, which a rerun will not reproduce. This is local retention, not a backup, and is unavailable in a fresh checkout.

**Defect found in review (Codex finding V3).** The script computes its upper estimate of the omitted part of $Z_4$ as `sum(26.0/m**2 for m in range(N + 1, 200000))` and its docstring and printed line call `Z4c + up` the upper end of a bracket for the infinite sum. The shells with $m\ge200000$ are missing from that sum. They are positive and total at most $26/199999\approx1.3\times10^{-4}$, so the printed upper end $16.7893$ is not a proved upper bound for $Z_4$, and passing K2 does not make it one. The script and its outputs are kept exactly as run; nothing was rerun. The note's proofs do not use this number: they use the analytical bound $Z_4\le26\sum_{m\ge1}m^{-2}\le52$.

**Limits, by kind of error.** Truncation: the exponential sums are over the cube of half-width 60 with a tail below $10^{-60}$; the $Z_4$ estimate omits the shells beyond $m=199999$ as described above. Roundoff: double precision, no enclosure anywhere, including the cube sum of $Z_4$ and the evaluation of the hand-majorant formula at $2.4$ ($S_2\approx1.1018$, $S_3\approx0.8680$). History and continuous error: none, because nothing is evolved. The tabulated rates are therefore floating evaluations of the formula for $\nu_*$ with a floating estimate of $Z_4$; they are not certified upper rates. The note uses them only to show the formula's size, and no proof in it depends on this instrument.
