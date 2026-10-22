# Twisted helix certificate: branch joins and extension toward the fold

## Result

This addendum extends the [twisted helix certificate](rotating-ladder-claude-2026-10-20-twisted-certificate.md); conventions, lemmas and the frozen instrument are as described there. At $R=1000$, the balances of the twisted rotating and translating helix now form one continuous ($C^1$) branch for every twist $\alpha\in[0.8801\pi,\,0.9116\pi]$. The branch is certified as follows.

- **Pieces.** The interval is covered by 349 consecutive twist pieces. For each piece, a parametric Krawczyk certificate shows that for every twist in the piece exactly one solution lies in the piece's box.
- **Joins.** At each of the 348 shared twists, a point certificate box lies inside both neighbouring boxes. By uniqueness in each box, the two piece solutions coincide there.

Toward the fold the certificate stops at $0.8801\pi$. The upper-arm balance at $0.878\pi$ from the main note is not reached, so it is not joined to the branch. The returning arm was not attempted.

**Claim grade:** derived, for the branch statement on $[0.8801\pi,0.9116\pi]$, under the same lemmas and the same declared dependency on mpmath 1.3.0 `iv`. Nothing is claimed below $0.8801\pi$. In particular the two balances at $0.878\pi$ are two certified, distinct solutions; they are not a proved fold, and their connection to this branch is not proved. Pieces that are not joined would be local certificates only, but here every shared twist in the covered interval is joined.

## Method

The instrument is unchanged: `twisted_certificate.py`, SHA-256 `75885d17a4a17a08dce3b68a83a11e47c026829d6c09a844f5f84f2ebb849722`. So are the drivers `branch.py` and `glue.py`. Two new join drivers import them:

- `glue_rest.py` (SHA-256 `e5819be4…a7308`);
- `glue_dec.py` (SHA-256 `c742fcf1…cd6e`), which matches shared twists as decimals rather than strings.

`glue_rest.py` missed the join at $0.895\pi$. Its neighbours recorded that twist as `0.895` and `0.8950`, and the driver compared strings. `glue_dec.py` closed that gap.

The known case for both join drivers was the join at $0.9\pi$, which `glue.py` had already certified; each new driver ran it first, and each reproduced `Y_in_both = true`. This replay checks the driver, not the mathematics.

Joins on the original interval used $N=8000$ and point boxes with radii $(2\times10^{-5},\,5\times10^{-8},\,2\times10^{-6})$ in $(d/R,\,\omega R,\,u)$. Joins on the extension used $N=4000$. Below $0.8922\pi$ the tail bounds at $N=4000$ still leave the centre residual about 10 times smaller than the radius in $d/R$.

**Piece widths.** The width shrank toward the fold, and a piece that failed at both radius factors was bisected.

| Twist range ($\times\pi$) | Piece width ($\times\pi$) |
| --- | --- |
| $0.8890$ to $0.8922$ | $0.0001$ |
| $0.8840$ to $0.8890$ | $0.0001$ |
| $0.8820$ to $0.8862$ | $0.00005$ |
| $0.88215$ to $0.88345$ | $0.00005$ |
| $0.8801$ to $0.88215$ | $0.000025$ |

All runs used the owned supervisor in foreground form, with a 60-second heartbeat and hard deadlines.

## Findings

1. **Joins of the original segment (derived).** All joins of $[0.8922\pi,0.9116\pi]$ are certified: the 44 from the main note, 47 in `branch-gluing-rest-1.json` (including the $0.9\pi$ replay), 9 in `branch-gluing-rest-2.json`, and the one at $0.895\pi$ in `branch-gluing-ext-1.json`. That whole segment is therefore one continuous branch.
2. **Extension downward (derived).** Pieces from $0.8922\pi$ down to $0.8801\pi$ are certified, and all their joins pass (`branch-gluing-ext-1.json`, `-ext-2.json`, `-ext-3.json`). Across all 348 joins and 349 pieces there were no join failures. Over every box the member speed is at most $0.015644$.
3. **Values at the lower end (approximate, rounded to nearest; the machine endpoints are in `branch-certificate-summary-extended-2.json`).** At $\alpha\approx0.8801\pi$: $d/R\approx2.9801$, $\omega R\approx0.013420$, $u\approx-0.00803$. The piece $[0.880100\pi,0.8801125\pi]$ has the box below; in each column the box is rounded inward and the enclosure outward.

| Quantity | Uniqueness box | Enclosure of the solutions |
| --- | --- | --- |
| $d/R$ | $[2.97988166,\,2.98032758]$ | $[2.97990021,\,2.98030902]$ |
| $\omega R$ | $[0.0134195718,\,0.0134209917]$ | $[0.0134199163,\,0.0134206471]$ |
| $u$ | $[-0.0080365559,\,-0.0080192183]$ | $[-0.0080322384,\,-0.0080235358]$ |

## Where and why the extension stops

Twenty-nine parent pieces failed at both radius factors and were bisected; every half certified. They lie at:

- $0.8922\pi$ to $0.8932\pi$ (five pieces, in the main note);
- $0.8862\pi$ (one);
- $0.88215\pi$ to $0.8825\pi$ (seven);
- $0.8801\pi$ to $0.8805\pi$ (sixteen).

**Measured failure mode.** In the last failed pieces of width $0.00005\pi$, the component of the Krawczyk image in $d/R$ overruns the box. There $\lvert I-CJ\rvert_{\delta\delta}\approx0.46$–$0.54$ and $\lvert I-CJ\rvert_{\delta u}\approx1.1$–$1.25$, and both grow with the box. The preconditioner's $d/R$ row grows as the Jacobian approaches singularity at the fold. The box widths needed to contain the solution's motion also grow there, because $d(d/R)/d\alpha$ diverges like $(\alpha-\alpha_f)^{-1/2}$.

**Why the run ended.** Near $0.8801\pi$ even pieces of $0.000025\pi$ needed bisection, and progress per supervised run fell below $0.0005\pi$. The extension stopped there on the time budget, not on a proven obstruction.

As expected, the method degrades near a fold. The failures are a property of the method, not evidence about the branch. Continuing to $0.878\pi$ would need either finer pieces at rising cost, or a fold-adapted (extended-system) formulation.

## Falsifiers

- Any certified piece whose box holds no solution, or two solutions, at some twist inside the piece.
- Any join whose point box fails to lie inside both neighbouring boxes on an outward-rounded re-evaluation.

The receipts listed below contain every box needed to run these checks.

## Files

Evidence directory: `evidence/rotating-ladder-claude-2026-10-20/twisted-certificate/`.

| File | SHA-256 |
| --- | --- |
| `branch-certificate-summary-extended-2.json` (all 349 pieces) | `0eef5e5a…401f` |
| `branch-certificate-summary-extended.json` (intermediate, 251 pieces) | `bea312d7…d5d2` |
| `branch-gluing-rest-1.json` | `d4897a2a…9425` |
| `branch-gluing-rest-2.json` | `6897f7d8…18c1` |
| `branch-gluing-ext-1.json` | `6d6e0193…7730` |
| `branch-gluing-ext-2.json` | `8b97fdf3…3c46` |
| `branch-gluing-ext-3.json` | `0127aa80…0669` |

Full piece records are kept as `.local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/twisted-certificate/ext-*.json`.

**Run times (supervised).**

- Joins: 522 s, 105 s, 523 s, 237 s and 405 s.
- Extension: 417 s, 535 s, 511 s, 537 s, 519 s and 515 s.


## Independent review disposition and corrections

Codex reviewed this addendum as frozen (SHA-256 `33c8e014e3f0a929073828aa75360a7da988ca0fd0ab80e8f45d86c28b137653`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-21T01:29:21Z and **accepted the single $C^1$ twisted branch on $[0.8801\pi,\,0.9116\pi]$ at $R=1000$**: it re-read all 349 strict inclusions, matched every summary piece to its full record in the 11 raw run files, checked all 348 shared twists as exact decimals (each with a certified point box strictly inside both neighbouring uniqueness boxes), recomputed a radius-weighted bound $\lVert I-CJ\rVert<0.579$ for all 349 pieces (so every configuration Jacobian is nonsingular), and reran the first new piece and two bridges. Corrections: (1) the summary flag `neighbour_gluing_all_ok: false` records the older, stronger direct test $K_i\subset X_j$ and must be read with that meaning; the accepted 348-join conclusion rests on the separate point-bridge proof; (2) the statements that the Jacobian approaches singularity at the fold and that $d(d/R)/d\alpha$ diverges like $(\alpha-\alpha_f)^{-1/2}$ are conjectural, conditional on a nondegenerate fold, and are not established by these certificates; the measured box overruns support an instrument-conditioning explanation only. Neither the $0.878\pi$ upper solution nor the returning arm is connected to the branch. Displayed lower-end enclosures are outward and uniqueness boxes inward relative to their machine intervals.
