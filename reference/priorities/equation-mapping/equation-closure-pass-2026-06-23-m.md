# Equation Closure Pass 2026-06-23 M

## Scope

- `EQ-31` resonance widths, lifetimes, and branching fractions.
- Finite-window statistical carrier $\mathcal C_{\mathrm{stat}}^{W,T}$ from [Equation Closure Pass 2026-06-23 L](equation-closure-pass-2026-06-23-l.md).
- Score-neutral executable carrier evaluator in [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs).

## Result

This pass adds a small reducer for the finite-window statistical carrier:

```text
node scripts/equation-mapping/finite-window-statistical-carrier.mjs \
  --input scripts/equation-mapping/finite-window-statistical-carrier-eq31-toy.v1.json \
  --summary --pretty
```

The toy packet computes the `EQ-31` metastable escape projections from one corridor measure:

$$
\gamma_k=\frac{\mu_T(C_k)}{T},
\qquad
\Gamma_{\mathrm{cmp}}=\hbar\sum_k\gamma_k,
\qquad
\tau_{\mathrm{cmp}}=\left(\sum_k\gamma_k\right)^{-1},
\qquad
B_k=\frac{\gamma_k}{\sum_j\gamma_j}.
$$

For the included two-corridor toy input, the reducer reports:

- $\gamma_{\alpha}=0.003$ and $\gamma_{\beta}=0.001$;
- $\Gamma_{\mathrm{cmp}}=0.004$ for $\hbar=1$;
- $\tau_{\mathrm{cmp}}=250$;
- branching fractions $B_{\alpha}=0.75$ and $B_{\beta}=0.25$.

The same run also reports:

```text
status: toy_structure_only
scoreDecision: no_score_increase
nextBlocker: missing_accepted_W
missingAcceptedRows: W, Phi_T, mu_star_T, Q, K_det, B, C, S_retune
```

The later hardening pass in [Equation Closure Pass 2026-06-23 R](equation-closure-pass-2026-06-23-r.md) keeps this output score-neutral while tightening the accepted path: accepted carrier rows require concrete identities and durable source/evidence files, and the bare status `retained` no longer counts as accepted.

## Score Disposition

No score changes. `EQ-31` remains `2` in `6/23 b`. The reducer computes the right projected quantities but the included carrier is a toy. No retained metastable branch window, transition map, finite-window measure, coarse-graining, detector kernel, outcome partition, exit-corridor family, or no-hidden-retune witness has been accepted.

## Closure Value

This is not a new gate. It is the first executable shape of the common statistical carrier. It makes the next score-moving burden precise: replace the toy rows with a retained carrier and make the same evaluator return `accepted_retained_statistical_carrier` without changing the equations or adding a second ensemble.

## Next Closure Step

Find or produce one retained metastable branch candidate and populate:

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

with accepted row statuses. Until then, the line-shape and Breit-Wigner comparison remains downstream of the escape-measure row.

The nearest physical candidates in the current corpus are meson records, especially the free charged-pion weak corridor, the neutral-pion Gate C two-photon corridor, and kaon lifetime/width or mixing corridors. Those are comparison-side candidates only. A retained replacement packet still has to supply the branch window, transition map, finite measure, detector/readout kernel, corridor ledgers, and no-hidden-retune witness before the reducer can support a score move.
