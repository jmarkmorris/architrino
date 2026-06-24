# Equation Closure Pass 2026-06-24 G

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: retained-evidence disposition and next accepted-object target
- Promotion status: priority-only

## Scope

This pass works on `EQ-02`, `EQ-03`, `EQ-04`, and downstream `EQ-04A`. It does not add a new equation row, runner, or score. It narrows the next mathematical burden to one accepted retained evidence object.

## Disposition

The current retained-record evaluator for `EQ-02` through `EQ-04` already has the useful fail-closed shape: it numerically checks clock, envelope, two-way leakage, energy, momentum, rest mass, mass shell, medium response, split witness, retune witness, and negative controls on the same attempted carrier. The blocker is not a missing formula. The blocker is accepted source-backed retained support.

The next score-moving object is:

$$
\mathfrak D_{S_{\mathrm{eq}}}^{02\text{-}04}
\longrightarrow
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u_k)
\longrightarrow
\Theta_{02\text{-}04}^{\mathrm{bin}}(u_k),
$$

with the first accepted coordinate:

$$
\texttt{raw\_labeled\_rows\_preserved\_on\_retained\_history}.
$$

This row must be source-backed, bound to the same retained support, and accepted by the existing same-branch checker. A current proxy row, temporary report, generated reading copy, or attempt fixture does not count.

## Why This Helps `EQ-04A`

The Koide row is useful only after `EQ-04` supplies a mass-shell and exposure carrier. The charged-lepton mass-root vector

$$
\mathbf R_{\ell}
=
\left(
\sqrt{M_{\ell,0}},
\sqrt{M_{\ell,1}},
\sqrt{M_{\ell,2}}
\right)
$$

should be checked against the $45^\circ$ Koide geometry only after $M_{\ell,0}$, $M_{\ell,1}$, and $M_{\ell,2}$ are predicted from one charged-lepton branch family and one exposure/shielding/Noether sea response map. Koide cannot serve as the fitting target for that map.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

The reason is conservative: the pass sharpens the accepted-object target but does not supply accepted retained rows.

## Next Action

Replace the current `S_eq` retained-domain attempt with a source-backed retained-domain fixture that preserves raw generator labels on retained history. If that full fixture cannot be produced, produce one accepted durable row on the same support, with `raw_labeled_rows_preserved_on_retained_history` first and `Noether_sea_record_bound_to_S_eq` second. Keep the current evaluators fail-closed for every still-missing row.
