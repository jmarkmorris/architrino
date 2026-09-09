# Finite-ledger dependency-map trial

The operator authorized this second bounded chain alongside the corrected moving-single-root chain. It remains report-only, with no accepted baseline and no transfer of authority from A. The [map](finite-ledger-dependencies.jsonld) records the existing conditional finite-ledger theorem in [the Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), using its existing equation occurrence identifiers.

## Derivation and source relationships

Fix a finite ledger, one common receiver chart, retained histories, selected roots, regularization, and boundary convention. Assume each differentiable row scalar satisfies $\mathbf A_b=-\nabla\Phi_b$ on that chart. Define $\Phi_{\mathcal B}=\sum_{b\in\mathcal B}\Phi_b$. Coordinatewise differentiation of a finite sum gives

$$
-\nabla\Phi_{\mathcal B}
=-\sum_{b\in\mathcal B}\nabla\Phi_b
=\sum_{b\in\mathcal B}\mathbf A_b.
$$

This is a derived conditional identity. It assumes the per-row scalar identities; it does not establish them for arbitrary physical rows. It does not exchange an infinite sum and a derivative, mix different retained histories or boundary rules, or establish a global scalar. Adding a moving architrino may change the histories and root chart and therefore requires new premises.

| Record | Exact source and role |
| --- | --- |
| `finite-common-chart` | The finite-ledger theorem's opening paragraph fixes histories, root selections, regularization, boundary convention and the common differentiable chart. |
| `per-row-gradient-premise` | Occurrence `corpus-equation-2837fc9fb586113c` states each required per-row identity. |
| `finite-scalar-sum` | Occurrence `corpus-equation-379c9faa834280a0` defines the finite scalar sum. |
| `gradient-linearity-proof` | The source explicitly invokes linearity of the receiver gradient. |
| `finite-ledger-identity` | Occurrence `corpus-equation-fdd480956fb47265` identifies the vector sum with the negative gradient of the scalar sum. |
| `finite-ledger-polynomial-check` | The bounded polynomial instrument supplies measured implementation controls; it does not prove existence of physical row scalars. |

The premise and sum depend on the fixed domain. The proof depends on that domain, the per-row premise, and the sum definition. The final identity depends on this proof. A separately labeled numerical-implementation check covers only the finite-sum operation. The explicit source-bound relationships are the authoritative map records; the derived query graph is not an independent proof.

## Independent controls

[The instrument](../../../../scripts/equation-mapping/verify-finite-ledger-superposition.mjs) preserves the independently prepared scratch polynomial control unchanged. It uses illustrative $\Phi_1=x^2+2y$ and $\Phi_2=3x-y+z^2$. Independent expansion gives $-\nabla(\Phi_1+\Phi_2)=(-2x-3,-1,-2z)$. A known linear-function case first checks the sign, coordinate ordering, and step denominator. Three polynomial witnesses then agree with handwritten expected values, and omitting the second row fails each expectation. These are mathematical examples, not asserted physical ledger rows.

The shared [reader tests](../../../../tests/equation-dependency-map.test.mjs) exercise unchanged snapshots, changed domain relationships, deleted per-row dependencies, deleted coverage, stale sources, and rejection of a comparison between different chain scopes. The old/new comparison preserves obligations when relations are removed. An unchanged selected snapshot stays quiet in these controls; neither the test fixture nor a pass grants baseline approval.

## Integration and acceptance boundary

The existing [B runner](../../../../scripts/equation-mapping/check-moving-single-root-map.mjs) now reports both chains. The finite-ledger chain is a new candidate: its report explicitly sets `baseline: not-established` and `review: required`, inventories all its current objects/relationships, and executes the polynomial instrument. It does not compare the candidate with itself to manufacture an accepted predecessor. Until a predecessor is accepted, the production report cannot classify deleted second-chain edges against one; the entire chain remains review-required, and the fixed polynomial check still runs after successful structural validation.

The local publication caller remains unchanged and report-only. The [separate GitHub B workflow](../../../../.github/workflows/option-b-trial.yml) runs the two-chain tests and runner, then retains both chain reports, actual outputs and `review-manifest.json` in its B artifact. No new workflow execution is claimed before the next PR runs it.

The exact manifest identifies both candidate maps and the source, instrument, test, contract, workflow and package bytes relevant to this bounded trial. It is a review input, not an operator statement. Advancing either chain's accepted baseline requires the existing exact-head operator scope acceptance and verified merge-byte contract. The current implementation provides no accept command or automatic baseline promotion. See [the source review](../../development-process-review/analysis/option-b-first-chain-baseline-review.md) for the first-chain correction, historical evidence, and precise remaining acceptance step.
