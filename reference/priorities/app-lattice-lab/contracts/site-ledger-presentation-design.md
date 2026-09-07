# Site Ledger Presentation Design

**Status:** Accepted by the operator and implemented in LAT-011 on 2026-08-01.

## Shared hierarchy

When a calculation exists, the first view contains only:

1. one plain outcome;
2. the dimensionless residual magnitude and vector on one line;
3. one sentence naming the result's scope;
4. two compact local-shell summaries; and
5. `Show calculation` for individual rows.

The first view does not show coordinates, implementation labels, running audit text, empty metrics, or unavailable-value rows.

## Evidence-state mapping

### Certified repeating pattern

- **Outcome:** `Net acceleration is zero at every architrino.`
- **Residual:** `Magnitude 0 · Vector ⟨0, 0, 0⟩`
- **Scope sentence:** `In this ideal repeating pattern, matching pulls cancel at every site at release.`
- **Shell summaries:** `Nearest shell: 6 contributions → 3 matching pairs → zero` and `Next shell: 12 contributions → 6 matching pairs → zero`
- **Disclosure:** `Show calculation` reveals individual normalized contributions and the running local sum.

The two shell rows are labeled as local examples. The all-site result comes from the separate declared repeating-pattern certificate, not from those two rows or the spherical display crop.

### Finite nonperiodic configuration

- **Outcome:** `Net acceleration is zero in this finite configuration.` or `Nonzero in this finite configuration`, determined from the actual displayed calculation.
- **Residual:** Show the calculated dimensionless magnitude and vector.
- **Scope sentence:** State that the result covers the displayed finite configuration only.
- **Shell summaries and disclosure:** Show only rows actually included in that finite calculation.

This state never inherits a repeating-cell certificate or an all-space conclusion. A nonzero residual means nonzero initial acceleration under the displayed ledger; it does not add motion, stability, energy, or conservation claims.

### Acceleration not established

- Show one calm sentence: `Acceleration has not been calculated for this geometry.`
- Keep the two geometric shell descriptions if they help identify the selected site.
- Do not show an outcome icon, residual magnitude, residual vector, zero, `not available` rows, or `Show calculation`.

This state is a geometry reference, not a failed or approximately zero calculation.

## Selection behavior

Before a site is clicked, the certified checkerboard may state its pattern-wide result. After a click, the same hierarchy identifies the selected polarity without exposing raw coordinates. Changing the selected site must not change the evidence state unless the underlying calculation scope changes.

## Acceptance gate

Browser acceptance requires the outcome, residual, scope sentence, and both shell summaries to be readable without opening the calculation disclosure at the operator viewport.
