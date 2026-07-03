# Equation Closure Pass 2026-06-24 J

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral executable coframe reciprocity diagnostic
- Promotion status: priority-only

## Scope

This pass implements the first executable gamma-free coframe reciprocity test for `EQ-02`, `EQ-03`, and `EQ-04`. It extends the existing retained-record runner rather than adding a separate Lorentz-only path.

No equation scores change.

## Executable Change

The retained-record input now includes a `gamma_free_coframe_row`. The row declares:

- the allowed inputs: $c_f$, $u$, $\mathcal L_{\mathrm{root}}$, $\mathcal L_{\mathrm{wake}}$, and retained boundary history;
- no use of $\gamma_f$ as an input;
- no use of Lorentz target coefficients;
- no use of the mass-shell target;
- no use of fitted clock/envelope rows.

The evaluator checks the reciprocal coframe product

$$
e^0_u(\partial_t)\frac{e^\parallel_u}{e^\perp_u}=1
$$

before any score movement is allowed.

For the current attempt fixture at $\beta_f=0.6$, the diagnostic row reports:

$$
e^0_u(\partial_t)=1.25,
\qquad
e^\parallel_u=0.8,
\qquad
e^\perp_u=1,
\qquad
e^0_u(\partial_t)\frac{e^\parallel_u}{e^\perp_u}=1.
$$

The comparison value $\gamma_f=1.25$ is reported only after the coframe calculation as `gamma_f_for_comparison_only`.

## Negative Control

The runner includes `gamma_inserted_coframe`. This negative control allows the reciprocity residual to pass while forcing a nonzero forbidden-input or holonomy residual. Its role is to catch the fatal circularity:

$$
\gamma_f
\to
e^A_u
\to
\text{recovered }\gamma_f.
$$

The current attempt fixture passes this negative control. A later hardening pass adds a separate `coframeExtraction` diagnostic and `reciprocal_unextracted_coframe` negative control so this reciprocity result is not mistaken for extracted wake-return evidence.

## Current Output

Running

```sh
node scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs --summary --pretty
```

returns:

- `status=blocked_same_branch_identity`;
- `scoreDecision=no_score_increase`;
- `nextBlocker=missing_accepted_raw_labeled_rows_preserved_on_retained_history`;
- `coframeReciprocity=passed`;
- `gamma_inserted_coframe=passed`;
- `rowCount=15`, with all retained rows still `attempt`;
- `witnessCount=4`, with support, holonomy, split, and retune witnesses still `attempt`;
- `diagnosticPassCount=16` in the original pass-J output;
- `negativeControlPassCount=5` in the original pass-J output.

Running

```sh
node scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs --require-populated --out /tmp/eq02-04-retained-record-required.json
```

still exits nonzero. The coframe reciprocity row is therefore a diagnostic success marker, not score evidence.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

## Next Action

Replace the declared attempt coframe legs with an actual wake-return extraction on a certified invariant support. The next score-review-eligible version must source the coframe row from the same accepted positive-width cell that supplies raw labels, causal roots, wake tails, energy/action rows, phase rows, Noether sea rows, and $W_{\mathrm{hol}}=0$.
