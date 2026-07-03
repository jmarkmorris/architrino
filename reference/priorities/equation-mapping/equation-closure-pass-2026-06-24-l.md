# Equation Closure Pass 2026-06-24 L

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral coframe extraction fail-closed hardening
- Promotion status: priority-only

## Scope

This pass implements the smallest concrete artifact after the gamma-free coframe design review packet: the retained-record runner now distinguishes reciprocal arithmetic from extracted wake-return coframe evidence.

No equation scores change.

## Executable Change

The retained-record runner now reports two separate coframe diagnostics:

- `coframeReciprocity`: checks the declared reciprocal product

  $$
  e^0_u(\partial_t)\frac{e^\parallel_u}{e^\perp_u}=1;
  $$

- `coframeExtraction`: requires accepted extraction evidence before the reciprocal legs can count as wake-return coframe legs.

The extraction evidence must provide:

- accepted status;
- durable solver or proof source kind;
- durable source path;
- matching `commonCarrierId`;
- matching `domainId`;
- certified support kind;
- extraction basis containing $c_f$, $u$, $\mathcal L_{\mathrm{root}}$, and $\mathcal L_{\mathrm{wake}}$;
- no extraction basis using $\gamma_f$, Lorentz targets, mass-shell targets, or fitted clock/envelope rows;
- extraction, support-binding, and holonomy residuals.

## Current Output

For the current attempt fixture at $\beta_f=0.6$:

- `coframeReciprocity=passed`;
- `coframeExtraction=not_evaluated`;
- `undeclaredDiagnostics=["coframeExtraction"]`;
- `diagnosticPassCount=16`;
- `diagnosticCount=17`;
- `negativeControlPassCount=6`;
- `negativeControlCount=6`.

The new negative control is `reciprocal_unextracted_coframe`. It allows the reciprocity residual to pass while forcing nonzero extraction-source, support-binding, or holonomy residuals.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

## Next Action

The next score-moving artifact remains the single-drift source-backed invariant-cell/coframe extraction certificate. It must replace declared coframe legs with extracted wake-return legs on the same retained support before score movement is possible.
