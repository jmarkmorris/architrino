# Equation Closure Pass 2026-06-24 O

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: score-neutral invariant-cell support guard
- Promotion status: priority-only

## Scope

This pass hardens the accepted-evidence path for the `EQ-02` through `EQ-04` coframe extraction certificate. It does not supply accepted evidence and does not answer the Poincare-style review packet.

No equation scores change.

## Executable Change

The retained-record runner now refuses to pass `coframeExtraction` for an accepted certificate unless the inner support certificate is also accepted and contains:

- concrete `B_N`;
- concrete `Sigma_N`;
- concrete `P_N`;
- concrete `K_P_N`;
- positive `positiveTransverseWidth`;
- certified `returnInclusion`.

This closes a premature-promotion hole: marking the outer certificate `accepted` is no longer enough if the invariant-cell fields remain attempt labels or null values.

## Current Output

The current attempt fixture is unchanged in status:

- `coframeReciprocity=passed`;
- `coframeExtraction=not_evaluated`;
- `coframeExtraction.reason=coframe_extraction_evidence_not_accepted`;
- `nextBlocker=missing_accepted_raw_labeled_rows_preserved_on_retained_history`.

The new guard only activates when a certificate claims accepted status. A temporary accepted-but-attempt-support variant fails at `coframe_extraction_support_certificate_not_accepted`, as intended.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

## Next Action

Integrate the Poincare-style response when available, especially the exact refinement and negative-control schema for the invariant-cell certificate. The runner now protects the minimum support object, but the review should still decide how memory-depth, section-relocation, drift-perturbation, transverse-displacement, and phase-permutation persistence are represented before a certificate producer is implemented.
