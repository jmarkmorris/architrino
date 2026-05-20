# Fold Parent Endpoint Contract Extension

## Status

This packet records the approved Route A update to `fold_parent_boundary_complement_packet.md` for packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`.

It is a contract update only. It does not close any parent row, does not edit `causal_ledger.json`, does not edit `fold_layer_atlas.json`, and does not authorize `branch_chart.json`.

## Added Alternative

The parent-complement contract now allows a third acceptance alternative: endpoint-excluded boundary complements.

A boundary complement $B$ may be accepted by this alternative only when all possible contacts between
$$
Y_{\alpha}^{y}(B)
\quad\text{and}\quad
Y_{\beta}^{y}(B)
$$
are confined to a finite listed endpoint-contact set, no off-endpoint crossing is possible, and every listed contact is excluded by the same causal self-interaction or zero-depth endpoint convention used by the diagonal-exclusion subledger.

The required certificate fields are:

1. outward-rounded interval enclosures for $Y_{\alpha}^{y}(B)$ and $Y_{\beta}^{y}(B)$;
2. the finite contact set
   $$
   Y_{\alpha}^{y}(B)\cap Y_{\beta}^{y}(B);
   $$
3. strict monotonicity, or another accepted no-crossing proof, on the receiver and source intervals after the listed contacts are removed;
4. for each contact, the receiver endpoint, source endpoint, source lift, memory-depth value or range, and the exclusion convention;
5. positive separation after deleting the listed endpoint contacts;
6. root-count bound $[0,0]$ for the complement;
7. a complement-boundary topology convention specifying ownership of shared simple-root and fold-layer boundaries.

## Fail-Closed Clause

This alternative does not accept positive-width null-coordinate overlap. If
$$
Y_{\alpha}^{y}(B)\cap Y_{\beta}^{y}(B)
$$
contains a nontrivial interval after the listed endpoint contacts are removed, then $B$ is not endpoint-excluded. It must be rejected or certified by another accepted alternative.

## Consequence

The endpoint-exclusion route may now be attempted on the 20 named strips in `fold_parent_complement_partition_attempt.md`. A successful closure still requires a separate certificate that proves every strip satisfies one accepted alternative. Only after all parent complements close may a later live pre-ledger update rewrite the 16 fold rows and 6 parent rows from `split_required` to accepted rows.
