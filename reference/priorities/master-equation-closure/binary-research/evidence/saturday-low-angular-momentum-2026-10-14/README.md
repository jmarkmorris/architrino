# Evidence for the low-angular-momentum note (2026-10-14)

This folder holds the one instrument written for the note [Low and sign-changing angular momentum in repeating two-member histories](../../analysis/saturday-low-angular-momentum-2026-10-14.md), task 3 of the [round of 2026-10-14](../../../../../op/agent-chats/2026-10-14-saturday-breathing-lattice-low-angular-momentum/chat.md). The note's theorems are hand derivations. The instrument evaluates only their closed-form constants in exact rational arithmetic. It integrates nothing, evaluates no history, and does not check any theorem. Its agreement with the derivation is not independent evidence.

## The instrument

[`lowj_constants.py`](lowj_constants.py) takes one argument, the JSON file it writes. It uses only the Python standard library (`fractions`). The one irrational input, $\sqrt{1-w^2}$, is enclosed by a rational bracket of width below $10^{-29}$. The bracket is proved by squaring both ends. Each constant uses the bracket end that is conservative in the direction the note uses:

- upper bounds for $c(w)$, $z_0$, $e(w)=c_3+wc(w)$, $k(w)$ and $e(w)/(2w^2)$ (the frozen output field `rcross_up`). At a zero of J with $S=\sqrt{1-b^2}$, the necessary condition for an actual product obeying the coarse cap to lie outside the band is $r>e(w)S/(2w^2)$. Since $S\le1$, the field $e(w)/(2w^2)$ is only a conservative upper display for that b-dependent comparison: it is not itself a necessary separation cutoff and gives no direction;
- lower bounds for $c_-$, $D(w)$, the excluded separation $c_-/(2wk)$, the floor $c_-/(4w^2)$ and the closest-approach value $c_-/(2w)$.

The rational inputs $\alpha$, $c_1$ and $c_3$ are exact.

## Order of work

A failed known case writes the partial record and stops with exit code 2 before any target. The run passed every known case at its first execution. The script was edited once before that execution, to change one printed sentence about the grid scan. There is no earlier executed version.

| Stage | What is compared | Kind of reference | Result |
| --- | --- | --- | --- |
| K1 | $\alpha(1/10)=81/110$, $c_3(1/10)=1331/490$ | hand value, exact | pass |
| K2 | $\sqrt{99/100}$ bracket proved by squaring, width $<10^{-29}$ | exact | pass |
| K3 | $e(1/10)=c_3+wc\in(3.988,3.989]$; manuscript 9.3 uses the upward-rounded 3.989 | accepted coefficient | pass ($3.98881112534$) |
| K4 | $\rho_Z+\rho_e\le5.4170$ at $w=1/10$ (manuscript Section 9) | accepted bound | pass ($5.41690399738$) |
| K5 | $c_-/(2w)\ge7.32$ at $w=1/10$ (manuscript 9.4) | accepted bound | pass ($7.32672567324$) |
| targets | $D$, $k$, $c_-/(2wk)$, floor, $c_-/(2w)$, $e/(2w^2)$, $k/w^2$, $w^3c_-/(2wk)$ at $w=1/10,1/20,1/100,1/1000$ | exact rational | as tabulated in the note's Corollary Z.1 |
| scan | sign of the lower bound of $D(w)$ at $w=n/300$, $n=1,\dots,33$ | exact rational, sampled | lower bound positive through $n=32$ ($8/75$), which proves $D>0$ there; lower bound negative at $n=33$ ($0.11$), which alone does not prove $D<0$ |

K1 and K2 are independent of earlier work. K3–K5 are regression checks against values that earlier separate reviews accepted. They confirm that this instrument's curvature constant, floor constant and $e_1$ agree with accepted values at $w=1/10$; they do not validate the note's Theorems L and Z or Proposition X. The scan is a grid observation and proves no sign of $D$ between grid points.

## Run

The run was on 2026-10-14 (UTC), in the foreground through the owned-compute supervisor with the shared environment's Python. Request time was 11:33:48.729Z and the finish 11:33:48.843Z. Exit code 0, process group closed, nothing on standard error. This was the only execution. Owned-compute closeout afterwards reported `clear`. Outputs are retained outside Git in `.local-data/aaa-work-threads/saturday-breathing-lattice-low-angular-momentum-2026-10-14/claude-lowj/`.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `lowj_constants.py` | 4,893 | `368797a040adbcfe1817016ea0693c7bbfec9073dd5227f463ac173d688ee6eb` |
| `run1.json` | 4,885 | `187c97afebdfb12274b3f2f0376eb396f22ba1e74e53e39863f5df28fa89452f` |
| `run1.out` | 2,247 | `7298fdaa54e556c0648f0f021db5a9c126f01d76da5625119ca525accc4efc6f` |
| `run1.supervisor.json` | 2,387 | `a952dab3f44d5f9e74ff5ae2c38fef0faf2889a2c4a81140219ca3b13beb76fa` |

`run1.stderr.log` and `run1.wrapper.err` are empty. `run1.out` is a copy of the supervisor's standard-output log; `run1.supervisor.json` is the supervisor's printed record. The instrument has not been changed since its execution, so there is no `history/` folder.

The note rounds each tabulated decimal from `run1.out` in the conservative direction.

## Corrections after review

The [Codex review](../../analysis/saturday-low-angular-momentum-codex-review-2026-10-14.md) supports the period identities, Theorems L and Z, the separation exclusion and the rate formula at zeros of J. It asked for three corrections, LJ1 to LJ3. On 2026-10-14 they were made in the note and this README only. The instrument and its outputs were not changed, and nothing was rerun.

- **LJ1.** The note now gives the direction tests as the actual-product inequalities $P_\parallel b>eS/r$ (positive derivative) and $P_\parallel b<-eS/r$ (negative derivative). It corrects the upward one-sided condition to $P_\parallel b\ge-eS/r$ and leaves zeros inside the band, or with zero derivative, unclassified. The necessary size comparison is now $r>eS/(2w^2)$ with $S=\sqrt{1-b^2}$, not a direction threshold. The frozen field `rcross_up` encloses $e/(2w^2)\le199.441$ at $w=0.1$, which is only a conservative upper display for that comparison. It supplies no necessary cutoff $r>199.441$ and no sufficient direction. After corrected-source verification, a remaining README remainder corrected these two explanations to include S.
- **LJ2.** J-periodicity now uses a rotation that preserves the orientation of the motion plane. An orientation-reversing proper rotation is handled by doubling the period. Only a sign-changing zero reverses the turning direction; identically zero J, tangent zeros, flat zero intervals and sign changes are kept separate, and no transverse crossing is assumed.
- **LJ3.** The scan above encloses $D$ from below, so its negative value at $0.11$ alone proves nothing about the sign of $D$. The note now proves that $D$ is strictly decreasing, using the review's argument with attribution. It combines this with this instrument's lower enclosure at $8/75$ and the review reference's upper enclosure at $0.11$, which gives $D>0$ on $(0,8/75]$ and $D<0$ on $[0.11,1/3)$. The transition between those two values is not located.

First reviewed identities, superseded by the corrected files: the note, 26,208 bytes, SHA-256 `83d27fb243e371948fb51ead643603716c890135a088a5a69d418bbd6fd934c0`; this README, 4,266 bytes, SHA-256 `cc7bb7a90391142e484a3d9b45a1e6e844abde3fc4a37e70c0795f7810ad4f39`. Copies are kept in `.tmp/saturday-breathing-lattice-low-angular-momentum-2026-10-14/lowj/pre-lj/`.
