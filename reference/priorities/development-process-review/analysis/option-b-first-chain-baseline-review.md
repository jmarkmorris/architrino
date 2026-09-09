# Option B first-chain review and bounded second-chain integration

## Disposition

The first-chain source review finds one unsupported current dependency and one outdated justification among the two relationships flagged by PR #264. A corrected candidate is prepared and passes isolated graph controls and the actual B entrypoint. No reviewed baseline has been advanced. The operator subsequently designated this task as executor and resolved shared ownership. The corrected map, second chain, reader/runner, tests and workflow are now integrated in the assigned repository paths; historical scratch evidence remains preserved.

The first map's corrected candidate contains 22 objects and 38 relationships by the tested reader. The additional bounded finite-ledger chain has six objects and seven source-justified relationships. It is integrated in the live reader and report-only workflow; the source-based derivation and bounded polynomial controls remain its evidence limits. The existing A checks remain authoritative and the live B implementation remains report-only.

## Verified PR and source provenance

The assigned repository GitHub route retrieved PR #264, its reviews and comments, and the B artifact from [run 34294132874](https://github.com/jmarkmorris/architrino/actions/runs/34294132874). The PR head is `36d26d944229fe4b0c7398e03843c4c7502cbb53`; the merged source is `16c25e9e95aad0ee3710f6ba7cb1f1b03e0889c2`. Live `git rev-parse HEAD` and `git branch --show-current` returned that merge and `codex/apollo`. The CI report identifies synthetic test-merge head `6631c124632c5299d5f57d255c7d91a379f4a422`, which is distinct from the final merge.

The verification script recomputed all 14 report input digests from both actual merged Git objects and live files, and they matched. Exact retained stdout/stderr digests also matched the report. Thus the source and instrument bytes used for this scoped CI result survived into the final merge. This byte comparison establishes scoped identity, not approval or scientific correctness. The [retrieved report](../evidence/option-b-stage-two/pr264-report.json) records `review-required`, successful numerical/prose/existing-test execution, and exactly the two changed prose-check relationships.

The reviews and issue-comments API responses were both empty at inspection. The [PR body](https://github.com/jmarkmorris/architrino/pull/264) explicitly states that merging the implementation does not approve the map or transfer authority from A. Therefore neither the merge nor its green report-only job supplies the missing scope acceptance.

## Independent mathematical and coverage review

The mathematical reference is the [moving-single-root derivation](https://github.com/jmarkmorris/architrino/blob/16c25e9e95aad0ee3710f6ba7cb1f1b03e0889c2/content/markdown/aaa/dynamics/master-equation.md#L1556), supplemented by the explicit constant-coupling and continuity statements in the [receiver-gradient analysis](https://github.com/jmarkmorris/architrino/blob/16c25e9e95aad0ee3710f6ba7cb1f1b03e0889c2/reference/priorities/master-equation-closure/analysis/receiver-wake-gradient-closure.md#L418). The graph traversal is not the mathematical reference.

Fix reception time and source history. On a connected regular receiver chart, let the selected differentiable emission root be $s$, with displacement $\mathbf R=\mathbf x-\mathbf X(s)$, separation $r=\|\mathbf R\|>0$, direction $\mathbf n=\mathbf R/r$, and transmitter factor $D=c_f-\mathbf n\cdot\mathbf V(s)\ne0$. Differentiating the causal constraint gives

$$
0=d[r-c_f(T-s)]=\mathbf n\cdot d\mathbf x+D\,ds,
\qquad
\nabla s=-\frac{\mathbf n}{D},
\qquad
\nabla r=\frac{c_f\mathbf n}{D}.
$$

Continuity and nonvanishing of $D$ on the connected chart make $\epsilon=\operatorname{sgn}D$ constant. The signed coupling $C$ is also fixed. Therefore, for $\Phi=C\epsilon/r$,

$$
-\nabla\Phi
=C\epsilon\frac{\nabla r}{r^2}
=C\frac{c_f}{r^2|D|}\mathbf n.
$$

This reproduces the separately declared canonical acceleration row. It supports the derivative's links to the causal constraint, definitions and regularity assumptions, and the proof's links to the scalar, derivative, fixed coupling, fixed sign, common chart and canonical row. The scalar definition itself uses $r$, $C$ and $\epsilon$; it does not require the already computed root derivative. The identity and theorem-claim links express this source correspondence under these hypotheses. These are derived local claims. A regular-chart counterexample to the displayed identity would falsify them; no global scalar, singular continuation or action claim follows.

The numerical implementation is a separate bounded check. Direct source inspection confirms that the [subject verifier](https://github.com/jmarkmorris/architrino/blob/16c25e9e95aad0ee3710f6ba7cb1f1b03e0889c2/scripts/equation-mapping/verify-moving-single-root-scalar-gradient.mjs#L124) recomputes roots by Newton iteration and differentiates scalar values. The [reference](https://github.com/jmarkmorris/architrino/blob/16c25e9e95aad0ee3710f6ba7cb1f1b03e0889c2/scripts/equation-mapping/verify-receiver-wake-gradient.mjs#L117) separately brackets a root and supplies circular separation/transmitter-factor values. The subject reconstructs the canonical ledger using those values. Those sources support the calculation/reference/parameter/constraint relationships as implementation or comparison requirements, not as complete independence from shared model premises.

The test imports that verifier and checks residual bounds, regular-chart floors, inverse-square and outside-chart negatives, and declared scope. It does not read the Markdown identity or establish the theorem. The measured-prose relationship names which calculation the sentence reports; it does not authenticate the original historical generating run. Historical run, environment and output relationships continue to describe the retained Python-era experiment. Their bytes are preserved; a current rerun is a separate execution.

## Disposition of the flagged relationships

| Flagged relationship | Direct source finding | Candidate correction |
| --- | --- | --- |
| `checks-prose-check-measured-prose` | The current Node comparator requires exactly one displayed maximum, parses its mantissa/exponent and checks it against the supplied residual with half-last-digit tolerance. The runner supplies the Master Equation text. The meaning is supported, but the relation still cites the historical Python comparator. | Keep the relationship; advance its revision and bind its justification to the exact Node comparator and actual call site. |
| `checks-prose-check-output` | Its target is the retained historical result. The actual runner passes `JSON.parse(stdout)` from the fresh numerical subprocess. It does not pass the retained historical result object. Equality of these output bytes in the inspected case does not establish that the historical output was consumed. | Remove this unsupported current edge. Add a distinct fresh-output field contract, a comparison-input relationship to that contract, and its dependency on the numerical calculation that returns the residual field. Preserve the historical result and run. |

The [corrected map](../../master-equation-closure/contracts/moving-single-root-dependencies.jsonld) has SHA-256 `d040d275054d1e422c81837119aaf6f50ca72ac2c3a207b24993c4246ed822ce`. The fresh-output object is a calculation specification, not a fabricated result or new generating activity. Actual run identities remain in execution receipts. This correction strengthens the truthfulness of the graph's declared input coverage without adding mathematical authority.

## Preserved pre-integration controls and execution

The existing reader's independently specified SHA, selector, hand-graph, deleted-dependency, deleted-coverage, stale-binding and displayed-value controls ran before the candidate map was read. The [first-chain control record](../evidence/option-b-stage-two/first-chain-review-controls.json) then records three additional cases:

- The exact corrected candidate compared with the same selected snapshot has no changed objects, changed relationships or selected obligations.
- Removing its fresh-output comparison edge remains review-required and still selects the prose obligation through old coverage.
- Changing the proof/sign relationship remains review-required and selects both existing obligations.

The first case establishes unchanged-comparison behavior; it is not an acceptance receipt or an independently approved baseline. The other two establish retained review visibility through the existing old/new impact rule. They do not prove that every dependency is represented.

The unchanged production B entrypoint was also run against an isolated source copy containing the corrected candidate. Its [execution report](../evidence/option-b-stage-two/corrected-candidate-run.json) records 22 objects, 38 relationships, all three actual executions passing, and `review-required` against the existing historical comparison source. No live map or baseline was changed to produce this result. A separate read-only run of the current live map likewise returned review-required. The original numerical sources, reference and test remained byte-identical.

## Baseline acceptance still required

The [existing approval design](https://github.com/jmarkmorris/architrino/blob/16c25e9e95aad0ee3710f6ba7cb1f1b03e0889c2/reference/priorities/development-process-review/analysis/option-b-approval-and-pilot-review.md#L9) distinguishes operator-attributed acceptance of an exact scope/head/manifest from a merge event alone. It prefers the ordinary GitHub/operator route over a new signing service. The live trial has a fixed historical comparison source and no automatic accept command. This assignment authorizes review and corrections; it does not supply an attestation for bytes that had not yet been reviewed when the assignment was sent.

The [review manifest](../evidence/option-b-stage-two/review-manifest.json), SHA-256 `a09096267f0c2ffad339c356a910b4876cd5d2f5659a569102c77a4a0e8097cc`, identifies the merged source, CI evidence, corrected candidate and exact source bindings. It is a candidate review artifact, explicitly not approval. Because the corrected map is not in a published Git head, the existing Git-based baseline route cannot yet retrieve that map from an accepted commit. The next publication review must name the exact head containing these bytes, the manifest and this report, and record the operator's bounded scope acceptance. After the merge, independently compare scoped bytes with the accepted manifest before changing the baseline constant/loader. Do not fabricate an operator statement, create a commit in this task, or substitute the current scratch fixture for that step.

A concrete acceptance statement for that later review is: accept the corrected moving-single-root dependency map and its declared numerical/prose coverage identified by this manifest and the exact published candidate head, for report-only B change comparison; retain A and all stated scientific nonclaims. The source review recommends that bounded acceptance after the corrected bytes are present and verified. The published head is intentionally not invented here.

## Second bounded chain

The second chain is the [finite-ledger scalar-superposition theorem](https://github.com/jmarkmorris/architrino/blob/16c25e9e95aad0ee3710f6ba7cb1f1b03e0889c2/content/markdown/aaa/dynamics/master-equation.md#L1624). It is distinct from proving a scalar representative for one moving root: it assumes valid differentiable row scalars on one shared chart and derives the finite sum identity. With a finite fixed index set $\mathcal B$ and $\mathbf A_b=-\nabla\Phi_b$ for every row,

$$
\Phi_{\mathcal B}=\sum_{b\in\mathcal B}\Phi_b,
\qquad
-\nabla\Phi_{\mathcal B}
=-\sum_{b\in\mathcal B}\nabla\Phi_b
=\sum_{b\in\mathcal B}\mathbf A_b.
$$

For each coordinate, the derivative of a finite sum is the sum of derivatives. This proves the conditional identity. It does not license an infinite-sum interchange, mixed retained histories or boundary conventions, or a row whose scalar premise has not been established. It also does not show that adding a moving architrino preserves the earlier histories or chart.

The [second map](../../master-equation-closure/contracts/finite-ledger-dependencies.jsonld) binds the existing per-row premise, finite scalar sum and total-identity occurrence IDs, the common-chart/finiteness assumption, the finite-linearity proof statement, and one bounded polynomial check. Its seven relationships are: premise and sum depend on the domain; proof depends on the domain, premise and sum; identity depends on the proof; the polynomial check covers the finite-sum implementation only. These links follow the displayed derivation, rather than being inferred from graph reachability.

The [polynomial controls](../../../../scripts/equation-mapping/verify-finite-ledger-superposition.mjs) use illustrative scalar functions $\Phi_1=x^2+2y$ and $\Phi_2=3x-y+z^2$. Independent expansion gives $-\nabla(\Phi_1+\Phi_2)=(-2x-3,-1,-2z)$. A known linear-function test first verifies the finite-difference sign and axis convention. Three exact polynomial witnesses then match handwritten values, while omission of the second row fails each reference. This is mathematical implementation evidence for finite addition; these illustrative functions are not asserted to be physical ledger rows.

The [second-chain graph controls](../evidence/option-b-stage-two/second-chain-controls.json) pass unchanged, changed-domain relationship, deleted-premise dependency and deleted-coverage cases. The scratch control used a preview reader admitting only this additional named scope. The integrated reader now admits those same two exact scopes and rejects cross-scope comparisons. The live report explicitly marks the second chain as having no accepted predecessor; its entire candidate remains review-required, without a current-map self-baseline. Integration does not confer baseline acceptance.

## Readiness

Legend: ✓ Done; ◐ Partial; ○ Not done.

| State | Work | Remaining condition |
| --- | --- | --- |
| ✓ Done | Retrieve PR #264's actual B report and verify scoped merged/live input and output identities | No new approval implied. |
| ✓ Done | Source-review the flagged meanings and prepare corrected first-chain candidate | Correction and exact source manifest are ready to inspect. |
| ✓ Done | Exercise unchanged/change/deletion controls and actual corrected-candidate entrypoint | B remains review-required against its current comparison source. |
| ◐ Partial | Establish the next accepted baseline | Exact corrected published head, operator scope acceptance and verified merge bytes are absent; no baseline was advanced. |
| ✓ Done | Integrate a second bounded chain | Source-reviewed map and equivalent controls are installed report-only; its accepted baseline is explicitly absent. |
| ✓ Done | Coordinate shared-file edits and capture in campaign owners | The operator-designated executor received resolved ownership and integrated the substantive review here. Earlier blocked messages did not authorize a bypass. |

Recommended next action: review the integrated candidate through the existing exact-head publication and scope-acceptance contract. The runner now emits a new exact two-map review manifest; the earlier manifest linked above preserves scratch provenance and is not the final integration manifest. No new approval infrastructure, publication or repository-wide migration is performed by this task.

## Integrated verification

The connected four-file Node test run passed 36 tests with no failures, skips or cancellations on Node 26 and Node 22. The retained [Node 26 log](../evidence/option-b-stage-two/node26-tests.log) and [Node 22 log](../evidence/option-b-stage-two/node22-tests.log) identify the exercised cases. They cover both graph scopes, relationship changes and deletions, stale source bindings, actual CLI failure paths, manifest identity, receipt behavior and existing PR-policy conformance. These focused checks do not establish whole-repository health.

The final [integration report](../evidence/option-b-stage-two/integration-report.json) and [integration manifest](../evidence/option-b-stage-two/integration-manifest.json) record the connected two-chain candidate. The manifest identifies exact working bytes and an observed Git head; it does not assert that uncommitted candidate bytes belong to that head. The earlier scratch reports and manifest remain separate historical records. Baseline advancement still requires operator acceptance of the exact published candidate and verification of the merged scoped bytes.
