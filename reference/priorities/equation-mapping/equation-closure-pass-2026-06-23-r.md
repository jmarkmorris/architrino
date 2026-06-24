# Equation Closure Pass 2026-06-23 R

## Scope

- `EQ-14`, `EQ-25`, `EQ-30`, and `EQ-31` finite-window statistical carrier rows.
- Score-neutral evaluator in [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs).
- Toy carrier input in [finite-window-statistical-carrier-eq31-toy.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-toy.v1.json).

## Result

This pass hardens the accepted-row semantics for $\mathcal C_{\mathrm{stat}}^{W,T}$. A row can no longer close by reporting the bare status `retained`. Accepted carrier components must now have:

- status `accepted`, `passed`, or `populated`;
- a concrete row identity;
- a source reference that resolves to an existing durable source/evidence file.

The exit-corridor family has the same burden at family level. Every corridor must carry accepted retained status, accepted ledger status, a concrete corridor identity, and an existing durable source reference before the evaluator can treat `C` as accepted.

Durable source references exclude placeholder strings, missing files, temporary files, generated reading copies, directory paths, and `.tmp` files.

## Executable Checks

The toy run remains score-neutral:

```text
node scripts/equation-mapping/finite-window-statistical-carrier.mjs \
  --input scripts/equation-mapping/finite-window-statistical-carrier-eq31-toy.v1.json \
  --summary --pretty
```

It reports:

```text
status: toy_structure_only
scoreDecision: no_score_increase
nextBlocker: missing_accepted_W
rowReasons:
  W: row_not_accepted
  Phi_T: row_not_accepted
  mu_star_T: row_not_accepted
  Q: row_not_accepted
  K_det: row_not_accepted
  B: row_not_accepted
  C: corridor_not_accepted
  S_retune: row_not_accepted
```

Two negative checks now protect the future score path:

- an `accepted` carrier window with a missing source file reports `W: row_source_not_found`;
- a carrier window with status `retained` and an existing source file reports `W: row_not_accepted`.

## Score Disposition

No score changes. The hardening protects future acceptance but does not supply a retained branch ensemble, finite-window measure, detector kernel, outcome partition, corridor ledger, or no-hidden-retune witness.

`EQ-14`, `EQ-25`, `EQ-30`, and `EQ-31` keep their current `6/23 b` scores.

## Closure Value

The finite-window carrier can now be used as a shared score-moving route without a hidden compatibility trap. The evaluator distinguishes:

- a useful toy shape check;
- an attempted retained carrier with missing accepted rows;
- an accepted retained carrier whose rows are source-backed and not merely labeled.

The strongest next score-moving target is still one real retained carrier:

$$
\left(
W,
T,
\Phi_T,
\mu_{*,T},
\mathcal Q,
K_{\mathrm{det}},
\mathcal B,
\{C_k\},
\mathcal S_{\mathrm{retune}}
\right)
$$

with the first blocker at `W`, then $\Phi_T$, $\mu_{*,T}$, $\mathcal Q$, $K_{\mathrm{det}}$, $\mathcal B$, $\{C_k\}$, and $\mathcal S_{\mathrm{retune}}$.

## Bill Review Packet

The temporary Bill Thurston review packet should stay consolidated: prompt first, then the review material. The prompt should ask first for overall insights, corrections, and advancements, then list the specific questions and the comment budget for the round.
