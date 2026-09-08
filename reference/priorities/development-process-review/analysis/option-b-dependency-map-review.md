# Option B dependency-map review: moving-single-root scalar gradient

The pilot map is useful for exposing changes, but it is not ready to become an authoritative dependency or coverage map. Source review finds a misleading prerequisite from the scalar definition to the root derivative, an unsupported claim that the existing test examines the recorded prose result, and missing distinctions among the mathematical proof, numerical implementation, and execution evidence. The recommended next step is a separately authorized correction and review of this one candidate map while current enforcement remains in place.

**Status: completed source-based review; proposed corrections only.** This review assesses all eleven relationships in the [historical pilot mapping](../evidence/option-b-real-chain-pilot/records.jsonld). It does not modify that mapping, its expected outcomes, its recorded evidence, the scientific sources, or the independent reference. The [pilot report](option-b-real-chain-pilot.md) remains the record of what the experiment actually tested. Eight matching pilot outcomes establish behavior for the declared graph, not correctness or completeness of that graph.

## Source and review method

The mathematical assessment follows the causal equation and differentiation directly, then compares those prerequisites with the declared edges. The executable assessment reads the actual imports, numerical calculations, assertions, and result comparison. Graph traversal is not used to establish completeness. The completeness claim is limited to the omissions identified within this selected theorem and its existing check; this is neither an exhaustive corpus dependency audit nor a fresh independent numerical experiment.

The following labels identify exact source locations. Line numbers refer to the inspected bytes; the seven source/evidence files match the pilot's [manifest](../evidence/option-b-real-chain-pilot/manifest.json), whose source revision is `e0afd98e5c032d14dcbb053a5636a0454bb94285`. Acceptance of that revision remains unestablished. Existing occurrence identities identify displayed formulas, not abstract mathematical equivalence between documents.

| Label | Source and precise location | Role in this review |
| --- | --- | --- |
| M | [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), lines 1556–1622, “Moving-single-root scalar representative”; also lines 108–146 and 256–301 | Canonical assumptions, four selected equation occurrences, result paragraph, and upstream acceleration-weight reasoning |
| D | [Receiver-wake-gradient closure](../../master-equation-closure/analysis/receiver-wake-gradient-closure.md), lines 418–520; canonical row at 48–86 | Expanded proof, fixed coupling, constant-sign argument, numerical account, and explicit nonclaims |
| C | [Scalar-gradient verifier](../../../../scripts/equation-mapping/verify-moving-single-root-scalar-gradient.mjs), lines 6–23, 86–161, 169–194, and 216 onward | Numerical subject, chart parameters, root solver, stencils, reference consumption, assertions |
| R | [Receiver-wake-gradient verifier](../../../../scripts/equation-mapping/verify-receiver-wake-gradient.mjs), lines 117–169, 205–242, 472–607 | Unchanged reference implementation, bracketed causal root, canonical acceleration, circular control |
| T | [Existing test](../../../../tests/moving-single-root-scalar-gradient-verifier.test.mjs), entire 45-line file | Calls C and asserts reported thresholds, labels, and scope; contains no Markdown read |
| P | [Pilot runner](../evidence/option-b-real-chain-pilot/run_pilot.py), lines 43–50, 53–61, 130–148 | Historical edge construction and separate displayed-result comparison |

> Claim grade: measured for file contents and exact-byte preservation, using source reads and shared-venv Python `hashlib.sha256` comparisons against the retained manifest and a before/after inventory of the pilot evidence directory. The SHA-256 `abc` known answer passed before target reads. Claim grade: inferred for the relationship dispositions below, from those source contents and the displayed differentiation. Falsifier: a cited source using a different prerequisite, an actual test path reading the claimed prose, or a mismatching retained source/evidence hash would overturn the corresponding disposition.

## What the mathematical proof actually needs

At fixed reception time, move the receiver while retaining the same transmitter history and following the same selected causal root. Write the receiver position as $\mathbf x$, emission time as $s$, transmitter history as $\mathbf X(s)$, separation as $r=\|\mathbf x-\mathbf X(s)\|$, direction as $\mathbf n=(\mathbf x-\mathbf X(s))/r$, and transmitter factor as $D=c_f-\mathbf n\cdot\mathbf V(s)$, where $\mathbf V$ is the history's velocity and $c_f$ is wake speed. The chart has positive separation and nonzero transmitter factor. Smoothness of the retained history sufficient for these derivatives and continuity of $D$ is required; D line 469 explicitly uses continuity. The canonical coupling $C$ is constant for the selected row (D line 442).

The causal equation and its differential supply the root derivative:

$$
g(\mathbf x,s)=r-c_f(T-s)=0,
\qquad
0=\mathbf n\cdot d\mathbf x+D\,ds,
\qquad
\nabla s=-\frac{\mathbf n}{D},
\qquad
\nabla r=\frac{c_f}{D}\mathbf n.
$$

Here $T$ is fixed reception time and the gradient differentiates receiver position. Division by $D$ requires the nonzero-factor assumption. The derivative is not obtained from geometric definitions alone: it also uses the causal constraint, the fixed-history differentiation convention, and selection of the differentiable root.

Continuity and nonvanishing of $D$ make its sign $\epsilon=\operatorname{sgn}(D)$ constant on the connected chart. The scalar is defined by $\Phi=C\epsilon/r$. That definition needs the geometric quantities and domain; the root derivative is used in proving what its gradient equals:

$$
-\nabla\Phi
=\frac{C\epsilon}{r^2}\nabla r
=\frac{Cc_f\epsilon}{r^2D}\mathbf n
=\frac{Cc_f}{r^2|D|}\mathbf n
=\mathbf A.
$$

The last equality identifies the result with the independently stated canonical acceleration row $\mathbf A$. It cannot be justified by declaring the gradient to be that row. Thus the proof needs the scalar definition, root derivative, constant $C$, constant-sign argument, and canonical acceleration law as distinct premises. The scalar formula alone establishes none of the other premises.

Connectedness warrants a single sign over the whole named chart; it is stronger than needed for local differentiation on each connected component. Changing the word to “disconnected” therefore invalidates the stated reason for one chart-wide sign, but does not by itself prove the pointwise identity false. On disconnected components the sign can differ while the same identity holds componentwise. A candidate map should expose this distinction instead of reporting that every downstream mathematical statement has been disproved.

> Claim grade: derived for the displayed local differentiation under these premises. Falsifier: a regular point satisfying them where the displayed equalities fail. The reasoning does not establish chart gluing, singular continuation, a whole-history action, conservation, or EOM solver acceptance.

## Disposition of each historical relationship

In this table `X → Y` means the historical record says X depends on Y; `check → X` means it says the test examines X. Object aliases match P and the pilot report. “Supported” means the stated narrow relationship is supported, not that all necessary edges have been discovered. Mathematical prerequisites, source-document support, implementation dependencies, and check coverage must remain distinguishable to readers even if a future schema retains a small predicate vocabulary.

| Historical relationship | Meaning and exact supporting source | Review disposition and proposed treatment |
| --- | --- | --- |
| definitions → assumptions | The geometric definitions use a selected root and divide by positive separation; M 1556–1574 and D 420–442 supply their domain. | Supported as domain dependence, but coarse: connectedness is not needed merely to define the geometry. The assumption selector includes the definition display itself, so these are overlapping byte bindings, not independent premises. Split the domain prose from the formula in a candidate. |
| root-derivative → definitions | M 1578–1594 and D 444–465 differentiate the causal equation using the defined direction and transmitter factor. | Supported but incomplete as a direct prerequisite list. Add explicit causal constraint, fixed-history/reception convention, and regular differentiable-root assumptions. Some are currently reachable only through a coarse overlapping assumptions node. |
| scalar → root-derivative | M 1598–1606 defines $\Phi=C\epsilon/r$; D 469–475 does likewise. | Unsupported as a necessary mathematical prerequisite of the definition. The derivative explains the choice and proves the subsequent identity. Replace with scalar → definitions/domain and put the derivative prerequisite on the proof. If retained as explanatory motivation it must not masquerade as mathematical necessity. |
| derivation → scalar | D 477–493 differentiates the scalar defined at 469–475. | Supported for the formula's mathematical content. The analysis restates its own scalar; it does not mechanically consume the distinct M occurrence. Record the cross-document correspondence as reviewed support, not an import. Restrict the derivation node to the proof: its current selector also contains measured results and action discussion through line 520. |
| identity → derivation | M 1610–1618 states the identity proved in D 477–495. | Supported as proof support. The historical justification selects only the conclusion display in M, which does not establish the cross-document proof relationship. Bind the relevant D proof and its hypotheses as justification; treat the M/D correspondence explicitly. |
| calculation → identity | C 153–160 computes scalar values; 232–256 compares their numerical gradient with the canonical row. | Supported as a declared verification target, not as code importing the equation or a numerical proof of it. C separately implements both scalar evaluation and ledger assembly. Add scalar, canonical-row, and chart/specification inputs; preserve numerical independence from the analytic gradient. |
| calculation → reference | C 6–8 imports R; 216–235 selects its circular control and uses its separation/transmitter factor to assemble the ledger. R 548–590 defines the matching control. | Supported as an executable dependency. The entire R function executes, including other controls, before returning. The consumed reference is a root record, not an externally supplied finished scalar-gradient answer. Preserve R bytes and expose the common model/geometry assumptions. |
| result → calculation | M 1622 explicitly reports the circular scalar-gradient measurement; D 501 names C and R. | Supported for the measured clause only. The selected result span also asserts a derived theorem and a falsifier; those depend on proof and assumptions. Split theorem statement from measured result. A measurement also needs the particular run, inputs, environment, and aggregation/rounding rule, not just a calculation specification. |
| check → identity | T 9 invokes C; T 26–29 checks numerical residual and stencil thresholds. | Supported only as bounded implementation evidence for the circular control. T does not parse the identity display, prove the theorem, or cover all regular charts. Retain coverage with that restriction; textual equation correctness still requires source review. |
| check → calculation | T imports/calls C and checks its schema, chart floors, residuals, negative controls, and nonclaims. | Supported as executable regression coverage. Also record the test's actual implementation dependency on C. Assertions about returned scope strings do not establish the mathematical nonclaims independently. |
| check → result | The target is M's prose result span, whereas T reads only C's returned object. P 53–61 separately reads the displayed maximum. | Unsupported as coverage of the bound prose record. Replace with an explicitly separate result-record obligation bound to P's comparison (or a later authorized implementation). Retire the misleading edge only through reviewed correction; preserve its historical existence and the pilot's deletion-case evidence. |

## Missing relationships and boundaries for a candidate map

The following proposed changes are a review specification, not a second editable production adjacency list. New source objects would receive explicit candidate identities and bindings during a separately authorized correction. The four existing equation occurrence identities remain attached to their original occurrences.

| Proposed correction | Source reason and necessary relationships | Consequence if omitted |
| --- | --- | --- |
| Separate causal constraint and regularity assumptions | Bind the constraint in D 444–450 or the corresponding canonical source, and assumptions in M 1556–1576/D 420–442. Root derivative depends on both and on geometric definitions. | A changed causal relation or differentiation convention can be hidden inside a broad proof span without a meaningful prerequisite explanation. |
| Represent constant coupling and constant-sign reasoning | D 442 fixes $C$; D 469 derives constant sign from continuity, nonvanishing, and connectedness. Proof depends on those premises, scalar, and root derivative. The M constant-sign sentence lies between the selected equation displays. | The current four equation selectors omit the local sign sentence; whole-file review still catches its bytes, but graph impact cannot accurately name it. If $C$ varies with position, an additional $-\epsilon\nabla C/r$ term appears and the displayed identity is no longer established. |
| Bind the canonical acceleration law independently | M 108–146 and 256–301 give the root-Jacobian weight and reception rule; D 48–86 states the per-root row. Both proof and calculation depend on this law; R implements it at 205–242. | The equality to the physical row can become circular if the only row representation is the identity being tested. Reference code has mathematical premises even though it is kept independently authored and unchanged. |
| Split proof from measurements and action discussion | D 418–499 supports the theorem; 501–503 reports numerical evidence; 505–520 contains a scaling comparison and action limits. | The current derivation node depends on numerical evidence for its measured prose but not for its proof. Treating all of it as one prerequisite risks artificial cycles or misleading “proof depends on test” claims. |
| Specify numerical domain and method coverage | C 10–23, 86–93, 124–194 and 197–213 define one circular history, receiver ball, root interval, tolerances, stencils and sample points. Calculation depends on these; test coverage names them. | A whole-file binding notices edits but does not explain that the numerical residual is evaluated at the central receiver across stencil refinements, not over every point of the ball. The analytic chart bounds and sampled checks have different roles. |
| Represent reference premises and shared inputs | R 117–169, 205–242 and 548–590; C 10–30 and 232–235. Preserve the independently coded Newton-versus-bracketed root routes and the common canonical model. | Independent code structure can be mistaken for independence from all assumptions. C reconstructs the ledger using its own direction/coupling plus R's root quantities; the graph does not prove that every shared parameter or normalization is correct. |
| Split result claim from producing activity | The design's existing `generatedBy` and `usesInput` vocabulary can connect a new measured result to the actual run and its source/environment versions. Keep historical receipt identity distinct from the pilot rerun. | A rerun that agrees numerically can be misrepresented as authentication of the original historical measurement. No such authentication was established. |
| Make displayed-result coverage truthful | P 53–61 compares one displayed maximum with a numerical value; P 147 calls it separately from T. Connect that obligation to the prose field, producing-run maximum, and rounding contract. | The current test edge overstates coverage. P does not verify the whole paragraph, the wrong-scaling number, all claim grades, or arbitrary result syntax. Its regex uses the first match rather than independently certifying uniqueness. |

The existing circular numerical control has $c_f=1$ and source speed $0.28$, so its transmitter factor remains positive with analytic floor $0.72$ (C 86–93). It does not numerically exercise a negative-$D$ chart, arbitrary histories, or all receiver points. The symbolic sign conversion above covers either sign under its hypotheses. The source review therefore supports restricting numerical coverage, not adding new tests in this review-only task.

P's result comparison uses the baseline executed maximum for the candidate prose checks. That is sufficient for the pilot's fixed cases, which changed only prose or metadata while the scientific calculation/reference bytes stayed fixed. It is not evidence of a general candidate calculation-to-result pipeline after executable or parameter changes. Such a pipeline would need candidate-specific output binding before integration.

The historical edge justifications were constructed by copying each source object's binding (P 47–50). That gives exact bytes to inspect but does not establish that those bytes explain the edge. The scalar and identity examples above show why relationship review must assess the argument, endpoints, and scope separately from freshness.

## Recommendation and concrete remaining decision

The map assessment is complete; acceptance of a corrected map is not. The historical pilot succeeds as a bounded change-report experiment and remains exploratory. Its present relationships should not be integrated as authoritative scientific dependencies or comprehensive check coverage.

Legend: ✓ Done; ○ Not done.

| State | Decision or work | Recommendation and reason |
| --- | --- | --- |
| ✓ Done | Review all eleven relationships and identify substantive omissions | Use this source-based table as the correction brief; preserve the historical map and receipts. |
| ○ Not done | Author and review one corrected candidate map with separated proof, numerical-result, run, and check coverage | Recommended next authorization. Keep the same theorem scope, independently preserved reference, and current enforcement. Judge its edge meanings against the cited reasoning, not its traversal output. |
| ○ Not done | Approve the exact candidate map and its bounded coverage | Operator decision after candidate review. Approve which source objects and predicates carry authority and which uncovered obligations remain explicit. A byte refresh cannot supply this decision. |
| ○ Not done | Decide whether to transfer any existing enforcement responsibility | Defer. It requires an exact consumer/binder inventory, an authenticated accepted baseline and review/receipt route, supported reader/selector behavior, and a reviewed cutover. This review establishes none of those production mechanisms. |

The immediate adoption decision is therefore whether to authorize a corrected candidate for this one chain, with the narrowed evidence claims above, while retaining current enforcement. Production integration requires a later explicit decision naming the exact responsibilities to transfer. This review neither installs dependencies nor edits scientific code, publishes Git changes, or broadens migration scope.

## Corrected candidate and isolated verification

The separately authorized [corrected candidate and source review](option-b-corrected-candidate-review.md) addresses this review with 21 objects and 37 justified relationships. Nine isolated controls matched their predeclared observations; scientific checks, historical pilot evidence, and current enforcement remain unchanged. The candidate separates proof premises, numerical coverage, prose-result verification, reference inputs, and observed run provenance. Its exact meanings and coverage await acceptance; production integration remains a separate unapproved decision.
