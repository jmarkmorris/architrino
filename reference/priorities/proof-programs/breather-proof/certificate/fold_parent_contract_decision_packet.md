# Fold Parent Contract Decision Packet

## Status

This packet records the decision point reached after the accepted fixed-parameter fold constants and the rejected parent-complement closure attempts for packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`.

It is retained as a decision record, not as the live contract edit. Route A was subsequently approved and recorded in `fold_parent_endpoint_contract_extension.md` and `fold_parent_boundary_complement_packet.md`. This packet does not edit `causal_ledger.json`, `fold_layer_atlas.json`, or `branch_chart.json`.

## Source Results

The fold-constant part of the blocker is no longer the immediate obstacle:

- `fold_full_interval_constants_certificate.json` accepts finite fixed-parameter fold constants for the 16 fold-layer rows.
- `fold_parent_complement_partition_attempt.md` enumerates 20 natural parent-complement strips left after removing the six accepted simple-root subrows.

The two already accepted parent-complement alternatives do not close those strips:

- `fold_parent_endpoint_exclusion_legality.md` rejects endpoint-aware exclusion under the current contract, because the contract permits only strict $\Delta^y_B>0$ or exact accepted fold-layer coverage.
- `fold_parent_fold_family_membership_attempt.md` rejects exact fold-family membership for all 20 strips, because every strip remains a regular-parent subrectangle and none is exactly one of the accepted fold-layer row rectangles.

Therefore no live pre-ledger update is authorized.

The approved Route A follow-up is now recorded separately:

- `fold_parent_endpoint_contract_extension.md` adds endpoint-excluded boundary complements as a third accepted contract alternative.
- `fold_parent_endpoint_w_closure_attempt.md` locally accepts four singleton endpoint-contact `w` strips, but rejects complete `w` closure because five strips have positive-width null-coordinate overlap and one has no accepted outward-rounded gap.
- `fold_parent_endpoint_u_closure_attempt.md` locally accepts three singleton endpoint-contact `u` strips, but rejects complete `u` closure because seven strips have positive-width or endpoint-scale positive overlap and one has no accepted outward-rounded gap.

Thus the proof-policy question answered by this packet is no longer the active blocker. Later endpoint, threshold-subdivision, and regular-boundary attempts all reject complete parent-row consumption, and `cosine_packet_parent_gate_rejection.md` records this cosine packet as rejected before branch-chart certification.

## Decision Surface

There are three coherent next routes.

### Route A: add a third endpoint-exclusion alternative

This route changes the parent-complement contract. It would allow a boundary complement $B$ to be accepted when the null-coordinate ranges touch only at a finite list of excluded endpoint contacts and there is no off-endpoint crossing.

The minimum proof fields are:

1. outward-rounded enclosures for $Y_{\alpha}^{y}(B)$ and $Y_{\beta}^{y}(B)$;
2. the finite endpoint-contact set
   $$
   Y_{\alpha}^{y}(B)\cap Y_{\beta}^{y}(B);
   $$
3. strict monotonicity or another no-crossing proof on the receiver and source intervals;
4. endpoint contact data: receiver endpoint, source endpoint, source lift, memory-depth value or range, and exclusion convention;
5. positive separation after deleting the listed endpoint contacts;
6. root-count bound $[0,0]$ for the complement;
7. an explicit complement-boundary topology convention, such as closed, open, or half-open ownership of shared simple-root and fold-layer boundaries.

This route is attractive because it matches the observed zero/touching geometry, but it requires operator approval because it adds a new accepted proof class.

### Route B: add a regular-boundary fold-coverage theorem

This route leaves the endpoint contacts inside a fold-adjacent coverage theorem rather than treating them as empty. It would define a new regular-boundary coverage relation for strips adjacent to accepted fold layers, for example
$$
B\in\overline{\mathcal{F}}_{\Sigma}^{\mathrm{bdry}},
$$
and prove that the already accepted fixed-parameter fold constants dominate those regular-boundary contributions on the same packet identity tuple.

The minimum proof fields are:

1. a definition of the regular-boundary strip family and its relation to the existing $\mathcal{F}_{\Sigma}$ rows;
2. an inclusion proof for each of the 20 named strips;
3. preservation of
   $$
   \alpha_{\Sigma}>0,\qquad
   \nu_{\mathrm{exit},\Sigma}>0,\qquad
   \Delta N_\Sigma\in2\mathbb{Z},\qquad
   \Delta D_\Sigma=0;
   $$
4. a domination proof showing that the fixed-parameter fold constants still bound the regular-boundary contribution;
5. a row-consumption rule that keeps these strips out of simple-root branch sums.

This route is more mathematical work than Route A, but it may avoid treating endpoint ownership as a standalone proof-policy exception.

### Route C: keep the contract unchanged and reject this packet

This route preserves the original two-alternative parent-complement contract. Since strict range-empty closure and exact fold-family membership both fail for the 20 strips, the current cosine packet remains rejected before branch-chart certification.

The next proof-program step would be a new candidate packet or a new refinement strategy whose parent complements satisfy the existing alternatives:

$$
\Delta^y_B>0
$$

or

$$
B\in\mathcal{F}_{\Sigma}.
$$

This is the most conservative proof-policy route, but it discards the progress made by the accepted fixed-parameter fold constants for this packet unless a later refinement recovers the parent rows.

## Follow-Up Result

Route A has now been approved and attempted, the follow-up finer threshold subdivision has been attempted, and current-contract regular-boundary coverage has been attempted. None consumes the six parent rows. The next implementation packet should not try another pure endpoint-exclusion, threshold-subdivision, or current-contract separator-family coverage pass on the same 20-strip partition. The proof-program target should move to a new candidate/refinement packet, unless a later task explicitly supplies an enlarged regular-boundary theorem with same-packet inclusion and domination fields.

## Live State

| Artifact or state | Current status |
| --- | --- |
| Fixed-parameter fold constants | Accepted for the 16 fold rows. |
| Strict parent-complement gaps | Rejected for the natural 20-strip partition. |
| Exact fold-family membership | Rejected for all 20 strips. |
| Endpoint-exclusion parent alternative | Added to the current parent-complement contract. |
| Endpoint closure attempts | Locally accept seven singleton-contact strips, but reject complete parent-row consumption because positive-width overlap remains. |
| Positive-overlap subdivision attempts | Reject complete parent-row consumption because residual equality cores or uncertified endpoint-scale gaps remain. |
| Regular-boundary coverage attempt | Rejected because exact inclusion, same-packet domination, topology ownership, and non-core strict-gap fields are absent. |
| Current cosine packet | Rejected before branch-chart certification. |
| `causal_ledger.json` | Rejected; no update authorized. |
| `fold_layer_atlas.json` | Not updated. |
| `branch_chart.json` | Unauthorized and absent. |

The next action is a new candidate/refinement packet, not a live-ledger edit.
