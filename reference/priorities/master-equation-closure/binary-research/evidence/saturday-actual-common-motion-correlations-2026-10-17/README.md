# Evidence for the common-motion correlation note (2026-10-17)

This folder holds the one instrument written for the note [The sign-free common-motion correlation reduced to radial travel](../../analysis/saturday-actual-common-motion-correlations-2026-10-17.md), task 1 of the [round of 2026-10-17](../../../../../op/agent-chats/2026-10-17-saturday-correlations-six-hour/chat.md). The note's results are hand derivations. The instrument only evaluates their closed-form constants, in exact rational arithmetic. It integrates nothing, evaluates no history and checks no theorem, so its agreement with the derivation is not independent evidence.

## The instrument

[`correlation_constants.py`](correlation_constants.py) takes one argument, the JSON file it writes. It uses only the Python standard library (`fractions`) and does not import the earlier low-J instrument. The one irrational input, $\sqrt{1-w^2}$, is enclosed by a rational bracket of width below $10^{-29}$, proved by squaring.

Each constant uses the enclosure end that is conservative for its use in the note:

- upper bounds for $c(w)$, $z_0$, $e$, $k$, $k_1$, $k_A'$, $\mathcal M$, $m$, the slopes $a$ and $a'$, and the intercepts $b$, $b'$ and $k^2$;
- lower bounds for $c_-$, $D$, $D-m$ and the separations $c_-/b_f$.

The slopes are coded in the forms $2w+(2wm+w^2/2)/(D-m)$ and $2w+(4wm+w^2)/(D-m)$. These decrease in $D$ and increase in $m$, so inserting the lower $D$ and the upper $m$ gives upper bounds.

## Order of work

A failed known case writes the partial record and stops with exit code 2 before any target. The run passed every known case at its first execution. Before that execution the script was edited once: the two slope expressions were corrected to the monotone forms above, because the first draft did not match the note's formulas. There is no earlier executed version.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| K1 | $\alpha=81/110$, $c_3=1331/490$, $c_2=301/990$, $c_1=121/90$ at $w=1/10$ | hand values, exact | pass |
| K2 | $D(1/10)\ge0.19194$ and $k(1/10)\le0.052624$ | values accepted by the low-J review's separate reference | pass ($0.191944300464$, $0.0526233718883$) |
| K3 | $k_1(1/10)\le0.001483$ | accepted signed-breathing hand value | pass ($0.00148270138492$) |
| K4 | $e(1/10)\le3.989$ | accepted manuscript coefficient | pass ($3.98881112534$) |
| K5 | $c_-/(2w)\ge7.32$ at $w=1/10$ | accepted manuscript value | pass ($7.32672567324$) |
| targets | $\mathcal M$, $m$, $D-m$, slopes, intercepts and separations at $w=1/10,1/20,1/100$ | exact rational | as tabulated in the note's Corollary C.4 |

K1 is independent of earlier work. K2–K5 are regression checks against previously accepted values. They do not validate Theorem C.2 or Corollaries C.3–C.4.

## Run

The run was on 2026-10-18 (UTC), in the foreground through the owned-compute supervisor, using the shared environment's Python:

- requested 10:55:52.334Z, finished 10:55:52.501Z;
- exit code 0, process group closed, nothing on standard error;
- the only execution; owned-compute closeout afterwards reported `clear`.

Outputs are kept outside Git in `.local-data/aaa-work-threads/saturday-correlations-six-hour-2026-10-17/claude-correlations/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `correlation_constants.py` | 4,262 | `9cc0c2be68e020ca5a065bb29ac87ef8149bbeb43ddabc3fd9475f73db7f5c58` |
| `run1.json` | 3,273 | `f35db17c0c6c721337b04ee32e09ddf4265eaa394e33225b27d81912f3320239` |
| `run1.out` | 2,149 | `70db31e05c128fdcdba6501b820917b40f6d6a455dfc1f583caa15a040bd4f96` |
| `run1.supervisor.json` | 2,409 | `e5893d868a3db33c3ed0fa6e106bcb745518f0da8429693ca32d1f29d39ab12b` |

`run1.stderr.log` and `run1.wrapper.err` are empty. `run1.out` is a copy of the supervisor's standard-output log, and `run1.supervisor.json` is its printed record. The instrument has not changed since its execution, so there is no `history/` folder. The note rounds each tabulated decimal from `run1.out` in the conservative direction.

## Corrections after review

The [independent review](../../analysis/saturday-actual-common-motion-correlations-codex-review-2026-10-18.md) supports the note's mathematics and confirms every tabulated value with a separately authored reference. Its three scope corrections, CR1–CR3, were made on 2026-10-18 in the note and in this README only; the instrument and its outputs were not changed, and nothing was rerun. In this README's terms: the separations $c_-/b_f$ in the run output are cutoffs for a positive lower bound on mean radial speed, not necessary maximum separations, and do not show that a history is mostly radial.

First reviewed identities, superseded by the corrected files: the note, 20,393 bytes, SHA-256 `1d9dea1e3aa7675fdffc57e00dda89e1f850deb9b4d3a43091b32937fad2ad9e`; this README, 4,050 bytes, SHA-256 `3c8b252ce386eb67cd67e483fd3a55334fb4a6308638e10d3b383b4035702ed5`. Copies are kept in `.tmp/saturday-correlations-six-hour-2026-10-17/claude-correlations/pre-cr/`.
