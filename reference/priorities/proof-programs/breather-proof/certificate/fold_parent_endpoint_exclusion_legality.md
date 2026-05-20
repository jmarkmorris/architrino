# Fold Parent Endpoint Exclusion Legality

## Scope

This proof-policy packet decides whether the zero/touching parent-complement strips listed in `fold_parent_complement_partition_attempt.md` can be accepted under the original parent-complement contract by an endpoint-aware exclusion, without changing that contract.

Supersession note: this packet remains the historical rejection under the original two-alternative contract. Route A was later approved in `fold_parent_endpoint_contract_extension.md`, which adds endpoint-excluded boundary complements as a third alternative. The later `w` and `u` endpoint-closure attempts still reject complete parent-row consumption because positive-width overlap remains.

Sources read:

- `fold_parent_boundary_complement_packet.md`
- `fold_parent_complement_partition_attempt.md`
- `causal_preledger_interval_report.md`
- `diagonal_exclusion_subledger.json`
- `seed_chart_packet.md`
- `causal_ledger.json`
- `fold_parent_after_full_interval_status.md`
- `fold_parent_u_complement_closure_attempt.md`
- `fold_parent_w_complement_closure_attempt.md`

This packet does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, pass/fail ledgers, or any live ledger.

## Verdict

Rejected as an accepted parent-complement closure policy under the original contract.

The zero/touching parent-complement strips could not be accepted by endpoint-aware exclusion without a contract change. At the time of this packet, the parent-complement contract permitted exactly two alternatives for each boundary complement $B$:

$$
\Delta^y_B
=
\operatorname{dist}\!\big(Y_{\alpha}^{y},Y_{\beta}^{y}\big)
>0
$$

or

$$
B\in\mathcal{F}_{\Sigma}
$$

with the corresponding fold-layer row accepted with finite

$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty.
$$

Endpoint-touching exclusion was neither of those alternatives. Therefore this packet rejected the strips in `fold_parent_complement_partition_attempt.md` as a live closure certificate under the original contract. The later Route A extension changes the contract, but the six parent rows still remain blocked because the endpoint-closure attempts do not accept every strip.

## Existing Alternatives

### Strict $\Delta^y_B>0$

The strict range-empty alternative does not permit endpoint-touching strip exclusion. The partition attempt explicitly records zero/touching gaps, plus two endpoint-scale gaps that are not accepted after outward rounding. A gap equal to zero, or a diagnostic gap that does not survive outward-rounded certification, is not the strict inequality required by the contract.

Thus the natural strip partition cannot close by

$$
\Delta^y_B>0.
$$

### Coverage by accepted fold-layer row

The accepted fold-layer alternative can consume a parent complement only when the complement is explicitly assigned to the relevant separator family:

$$
B\in\mathcal{F}_{\Sigma_1}
\quad\text{or}\quad
B\in\mathcal{F}_{\Sigma_2}
$$

for the `w` ledger, or

$$
B\in\mathcal{F}_{\Sigma_3}
\quad\text{or}\quad
B\in\mathcal{F}_{\Sigma_4}
$$

for the `u` ledger, with the covering fold-layer row accepted on the same packet identity tuple.

That route is not an endpoint-aware exclusion. It is a fold-layer coverage classification. The current partition attempt does not prove exact membership of the regular-parent boundary strips in any accepted fold-layer family. Therefore the existing second alternative does not currently accept the endpoint-touching strips either.

## Diagonal And Adjacent-Boundary Logic

The diagonal-exclusion and adjacent-boundary logic cannot be reused here as-is.

The accepted diagonal subledger closes rows whose only contact is a same-interval diagonal, a periodically identified zero-depth endpoint, or an adjacent interval endpoint with zero memory depth under the causal self-interaction convention. Those accepted rows have root-count bound $[0,0]$ because strict monotonicity leaves no off-endpoint crossing and the remaining endpoint is excluded by that specific convention.

The parent-complement strips are a different proof class:

- they are complements of regular parent rows after removing accepted simple-root subrows;
- their contacts are endpoint contacts in null-coordinate range, not automatically same-interval diagonal contacts;
- the parent rows carry positive memory-depth ranges for the accepted simple-root interiors;
- the original parent-complement contract did not cite the diagonal-exclusion subledger as an acceptance method;
- the diagonal-exclusion subledger does not enumerate these parent-complement strips or assign them root-count bound $[0,0]$.

Adjacent-boundary reasoning may be used as a model for a future proof pattern, but it was not a reusable certificate under the original parent-complement contract.

## Required Contract Change If Endpoint Exclusion Is Desired

Accepting these strips by endpoint-aware exclusion would require adding a third parent-complement acceptance alternative. A minimal contract change would need language of the following form.

For each boundary complement $B$, the complement may be accepted as endpoint-excluded only if a same-packet certificate records:

1. certified outward-rounded interval images $Y_{\alpha}^{y}(B)$ and $Y_{\beta}^{y}(B)$;
2. a proof that
   $$
   Y_{\alpha}^{y}(B)\cap Y_{\beta}^{y}(B)
   $$
   is confined to a listed finite set of endpoint contacts;
3. strict monotonicity or another accepted no-crossing argument on the relevant receiver and source subintervals, proving no off-endpoint root remains;
4. an explicit endpoint-contact table naming the receiver endpoint, source endpoint, source lift, memory-depth value or range, and exclusion convention for each contact;
5. a positive separation margin after deleting the listed endpoint contacts;
6. root-count bound $[0,0]$ for the endpoint-excluded complement;
7. a statement that the endpoint exclusion applies to parent-boundary complements and is distinct from both strict range-empty gaps and fold-layer coverage.

If the intended exclusion is instead topological, the contract must also specify whether the complement partition is closed, open, or half-open along shared simple-root and fold-layer boundaries. Without that topology clause, a zero/touching range intersection cannot be silently removed from a closed complement rectangle.

For the present artifacts at the time of this packet, this was discussion-required before use. The later `fold_parent_endpoint_contract_extension.md` supplies that contract change.

## Live Ledger Authorization

No live ledger updates are authorized by this historical endpoint-policy packet.

| Artifact or state | Authorization |
| --- | --- |
| `causal_ledger.json` | No update authorized. |
| `fold_layer_atlas.json` | No update authorized. |
| `branch_chart.json` | No creation or authorization. |
| Pass/fail ledgers | No update authorized by this packet. |
| Six parent rows | Remain blocked unless later closed by strict $\Delta^y_B>0$, exact accepted fold-family coverage, endpoint-excluded complements under the later Route A contract, or another accepted closure theorem. |

This packet's proof-policy state is fail-closed under the original two-alternative parent-complement contract. The current live blocker is no longer policy approval for endpoint exclusion; it is the positive-width overlap found by the later Route A closure attempts.
