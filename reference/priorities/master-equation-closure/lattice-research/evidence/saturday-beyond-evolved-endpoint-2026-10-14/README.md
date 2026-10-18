# Evidence for the localized lattice family beyond its evolved-history endpoint (2026-10-14)

This folder holds the one instrument written for the note [The localized lattice family beyond its evolved-history endpoint](../../analysis/saturday-localized-beyond-evolved-endpoint-2026-10-14.md), task 2 of the [round of 2026-10-14](../../../../../op/agent-chats/2026-10-14-saturday-breathing-lattice-low-angular-momentum/chat.md). The note's results are hand derivations. The instrument evaluates the polynomial $F_\mu$ of the note's Corollary S.1a and the barrier conditions of its Theorem S.2 in exact rational arithmetic from declared constants. It integrates nothing and evaluates no history, and its agreement with the derivation is not independent evidence. The note's Lemma S.3 and Proposition S.4 have no instrument.

## The instrument

[`profile_barrier.py`](profile_barrier.py) takes one argument, the JSON file it writes. It imports, by file path and without modifying them, the frozen instrument of the evolved-history note, [`evolved_history_bootstrap.py`](../saturday-evolved-history-continuation-2026-10-12/evolved_history_bootstrap.py) (SHA-256 `b50b95f3…38d2`), for its exact polynomial, its chart-parameter routine and its declared constants, and through it the frozen extension instrument [`forward_extension_constants.py`](../saturday-forward-extension-2026-10-12/forward_extension_constants.py) (SHA-256 `8c111d04…6a85`) for exact rounding helpers and the interval exponential and logarithm (`mpmath.iv`, 50 digits). Importing the latter runs its lattice census; no lattice sum is enclosed in this run.

**Declared inputs** are those of the accepted extension and evolved-history notes, entered as exact decimals by the imported instrument: $a\in[2.6952,2.6953]$, $C_L\le0.03927$, $Z_5\le10.3824$, the six lattice-sum bounds at $a$ and $2a$, $\bar\Lambda_0=0.1144$, $p_0=0.0763$, $\theta=0.9308$, $\lambda_+<2.8953$; and $\delta_2=0.018$, $K_2=28$ from the evolved-history theorem. The factor $\mu$ is declared as the upper interval endpoint of $e^{-0.2(1-2\rho)}$ rounded up at five decimals. Chart parameters are formed by the imported routine exactly as in the evolved-history note.

## Order of work

A failed known case stops the run with exit code 2 before any target. The run passed every known case at the first attempt; there is no earlier version of this instrument.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| K1 | $F_\mu$ with unit constants, $\mathsf s_1=\tfrac12$, $c_{E3}=0$, $g=1$, $d=y=1$, $\mu=\tfrac12$: by hand $\tfrac72+\tfrac{39}2+\tfrac98+\tfrac{23}2=\tfrac{285}8$ | hand value, exact | pass |
| K1b | the same at $\mu=1$: the accepted polynomial's hand value $\tfrac{389}8$ | hand value, exact | pass |
| K2 | at $\mu=1$, $F_\mu$ equals the frozen $F$ at nine points on the charts $1/25$, $1/20$, $1/16$ | same-author frozen code | pass |
| K3 | $C_LF(0.018,0.009072)$ on the chart $1/25$ lies in $(0.0090317,0.0090318]$ (value $0.00903176523578$) | accepted regression value | pass |
| K4 | declared $\mu$ is $1$ at $\rho=\tfrac12$ and $41597/50000<1$ at $\rho=\tfrac1{25}$ | exact | pass |
| K5 | $F_\mu$ nondecreasing in $\mu$ at a sample point | sampled property | pass |
| scan | charts $1/25$, $9/200$, $1/20$, $11/200$, $1/16$; seed sizes $0.0205$ to $0.0212$ in steps of $0.0001$; $K$ on the half-grid from $10$ to $80$; barrier, chart and start conditions exact | exact arithmetic | largest passing grid size $0.0211$ on $1/20$, $0.0210$ on $11/200$, $0.0209$ on $9/200$; none on $1/25$ and $1/16$ within the grid |
| declared | chart $1/20$, $\mu\le0.83528$, $\delta_3=0.0211$, $K_3=32$: $C_LF_\mu=0.0142447155\ldots<y_3=0.01424672$; $\delta_3+2y_3=0.04959344\le0.05$; start conditions; scaling sample | exact arithmetic | all hold |
| table | $T_E$, $T_S$ and central lower bounds at $\varepsilon=10^{-3},\dots,10^{-6}$ | interval logarithm and exponential, outward rounding | printed; central bound not positive at $T_S$ |

K1, K1b and K4 are independent of earlier work. K2 and K3 compare with frozen code and accepted values by the same author; they show that the new function reduces to the accepted one at $\mu=1$, and they do not validate the note's Lemma S.1 or Corollary S.1a. The scan's grids are coarse; it establishes no largest seed size.

## Run

2026-10-14 (UTC), in the foreground through the owned-compute supervisor with the shared environment's Python: requested 10:54:46.331Z, wall time $0.344$ s, exit code 0, process group closed, nothing on standard error. It is the only execution. Outputs are retained outside Git in `.local-data/aaa-work-threads/saturday-breathing-lattice-low-angular-momentum-2026-10-14/claude-lattice/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `profile_barrier.py` | 10614 | `bea66243026ad3a28d7d40df5204906219a195673979d338b3c89cf67e721fc2` |
| `run1.json` | 4,018 | `32b3057a80817389b3f45343b90ac1a7150e1feba423c8a62fe511d8b4567e6a` |
| `run1.out` | 3,496 | `4ed7154f01c02338b581bf82e99573b698a5244692db320384e2e8d3987b3bd4` |
| `run1.supervisor.json` | 2,397 | `d2bdfc7ce2323e181258a4eaf576b480fd4467cb2a96a65047da7f7e8a639e61` |

`run1.stderr.log` and `run1.wrapper.err` are empty. `run1.out` is a copy of the supervisor's stdout log and `run1.supervisor.json` its printed record. The `history/` folder is empty because the instrument was not changed after it was written.

A scratch float script, `.tmp/saturday-breathing-lattice-low-angular-momentum-2026-10-14/lattice/scratch_mu.py`, was run before the instrument to see whether the factor $\mu$ helps and on which charts. It is exploration, not evidence, and the note quotes nothing from it.

## Corrections after review

The [Codex review](../../analysis/saturday-localized-beyond-evolved-endpoint-codex-review-2026-10-14.md) supports the later barrier and the exact pair decomposition and asked for four corrections, PF1 to PF4. They were made on 2026-10-14 in the note and in this README only; the instrument, its outputs and the scratch script were not changed, and nothing was run.

- **PF1.** The note now states the forward factor as a property of the accepted upper envelope of the seed measured against the seed-size bound, not as an actual growth or decay rate of the seed.
- **PF2.** The seed's third time derivative carries its own constant, $\bar\Lambda_3\le0.1144\times2.8953/2.6952<0.1229$, a factor at most $1.0743$; the envelope difference is proved from the Fourier integral in the local coordinate $q=k-Q$; the third-order onset of the odd part is stated as a local Taylor statement along smooth pure-seed amplitude lines, with the uniform summed bound still open.
- **PF3.** The scan row of the table above now reports the frozen output exactly: $0.0211$ on $1/20$, $0.0210$ on $11/200$, $0.0209$ on $9/200$. The first version of this README said $0.0211$ on both $1/20$ and $11/200$.
- **PF4.** The note scopes the limiting term to the present absolute-value estimate, marks the orientation figures as covering one part of one coefficient, and makes any later barrier conditional on a summed odd-part bound, its assembly with all terms and a check at a declared endpoint.

First reviewed identities, superseded by the corrected files: the note, 29,565 bytes, SHA-256 `b3d41b66cef747f4017338e95e01c05edee7e663b794fee9f954603090cf7575`; this README, 5,669 bytes, SHA-256 `4a18e39f9784415c5db670f2f53eefa6a9d8ea61738440a1423a709936831c71`. Copies are kept in `.tmp/saturday-breathing-lattice-low-angular-momentum-2026-10-14/lattice/pre-pf/`.
