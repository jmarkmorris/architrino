# Lars Hörmander Field-Speed Ceiling Review and Response

**Review identifier:** `FSC-001-LH-2026-07-31` **Reviewer:** Lars Hörmander **Review mode:** completed read-only distributional-formulation review **Captured:** 2026-07-31 from the operator-supplied review handoff **Response authority:** Field-Speed priority packet only **Theory status:** no ceiling, contact law, regulator-independent limit, continuation, or canonical change adopted

## Review scope

The review examined the ordinary isolated-root coarea construction, the nonisolated mirror-collinear contact stratum, the proposed zero-impulse event coefficient, the event guard and ownership interface, the receiver-side measure problem, and the FSC-005 near-contact theorem target.

Reviewer conclusions are mathematical review input, not theory authority. The operator-supplied review text is preserved first, followed by a disposition matrix that assigns exactly one response to every substantive finding.

## Operator-supplied review text

1. The nonisolated coincidence family is correctly outside ordinary isolated-root coarea rows.
2. Type and keep distinct the source point-emission measure, receiver causal-root acceleration measure, and contact-event atomic velocity update.
3. Zero atomic impulse is a proposed event coefficient, not a distributional cancellation or finite-part conclusion; record nonzero source provenance despite the zero event atom.
4. Strengthen guard and ownership: both ordered channels, a half-open branch/event convention, source labels separately retained, $s=T_{\mathrm c}$ separate from the $s<T_{\mathrm c}$ family, competing strata routing, parameterization-independent aggregation, and an outgoing record if restart is claimed.
5. Add receiver-side contact measure decomposition as an unresolved obligation; correct any wording that says wake semantics are complete.
6. Specify a topology and prove or refute perturbative splitting and weak convergence of source-provenanced receiver measures, not merely root counts.
7. Revise the FSC-005 separating-trace target with correct $s_\delta$ versus emission-retention wording, a sign hypothesis, both channels, competing strata, a BV/Radon or equivalent solution class, a complete-ledger asymptotic/no-leading-cancellation condition, and an exact limited conclusion.
8. Downgrade readiness: the packet is not ready for a Tao-style well-posedness review as a posed evolution problem. It is ready only for narrower distributional-formulation work.

## Complete finding record and response matrix

| # | Substantive finding | Disposition | Response and durable implementation |
| ---: | --- | --- | --- |
| 1 | The nonisolated coincidence family is correctly outside ordinary isolated-root coarea rows. | **Accepted and implemented** | The mathematics packet now states the ordinary receiver measure as a coarea collapse over isolated simple roots and keeps the positive-delay contact stratum outside that construction. This validates only the classification, not a contact response. |
| 2 | The source point-emission measure, receiver causal-root acceleration measure, and contact-event atomic velocity update must be typed and kept distinct. | **Accepted and implemented** | The mathematics packet now defines three separately typed objects: labeled spatial source measures $\mathsf E_{j,s}$, source-time receiver measures $\boldsymbol{\mathsf R}^{\mathrm{ord}}_{i\leftarrow j,T}$, and receiver-time event-update measures $\boldsymbol{\mathsf J}^{\mathrm{evt}}_i$. No one object is used as another. |
| 3 | Zero atomic impulse is a proposed event coefficient, not a distributional cancellation or finite-part conclusion; source provenance remains nonzero despite the zero event atom. | **Accepted and implemented** | The event coefficient is explicitly proposed as $\Delta\mathbf V_{i,\mathrm c}=\mathbf0$. The packet denies cancellation, regularization, finite-part, or regulator-independent interpretations and separately retains the two nonzero labeled source measures at $s=T_{\mathrm c}$. |
| 4 | Guard and ownership must cover both ordered channels, a half-open branch/event convention, separately retained source labels, separation of $s=T_{\mathrm c}$ from the $s<T_{\mathrm c}$ family, competing-strata routing, parameterization-independent aggregation, and an outgoing record if restart is claimed. | **Accepted and implemented** | Each item is now a declared guard or ownership requirement. The reset still returns only one-jets; a restart remains inadmissible until a compatible outgoing retained-history, source, ownership, and receiver-measure record is supplied. |
| 5 | Receiver-side contact measure decomposition is unresolved, and wake semantics must not be described as complete. | **Accepted and implemented** | The mathematics packet now displays the receiver-time measure decomposition into ordinary, contact-stratum, and competing-stratum terms, and types the event-update measure separately. The contact and competing receiver measures and their response relation remain undefined. Readiness, audit, and log wording now call wake semantics unresolved. |
| 6 | A topology must be specified, and perturbative splitting plus weak convergence of source-provenanced receiver measures must be proved or refuted rather than inferred from root counts. | **Accepted as queued formulation/theorem target** | A candidate trajectory-and-measure topology and the required weak-* convergence statement are specified in the mathematics packet. FSC-006 now owns proof or refutation, including uniform total-variation control, label provenance, parameterization independence, and failure by non-tightness or divergent variation. Nothing is advanced by stating the target. |
| 7 | FSC-005 needs corrected $s_\delta$ versus emission-retention wording, a sign hypothesis, both channels, competing strata, a BV/Radon or equivalent solution class, complete-ledger asymptotics with no leading cancellation, and an exact limited conclusion. | **Accepted and implemented** | FSC-005 now distinguishes the moving root $s_{i,\delta}$ from the separately retained contact emission at $s=0$, treats both ordered partner channels, states the sign and complete-ledger hypotheses, uses a BV velocity/vector-Radon derivative class, routes competing strata, and limits the conclusion to incompatibility within that declared class. FSC-005 remains blocked on FSC-006 and `Not advanced`. |
| 8 | The packet is not ready for a Tao-style well-posedness review as a posed evolution problem; it is ready only for narrower distributional-formulation work. | **Accepted and implemented** | Readiness, priorities, queue, and log now record the downgrade. The exact next gate is completion and narrow review of FSC-006's typed receiver-measure decomposition and weak-limit formulation. No Tao review has been contacted, started, or implied. |

## Measure-level correction

The zero event coefficient has only the meaning

$$
\boldsymbol{\mathsf J}^{\mathrm{evt}}_i
=
\Delta\mathbf V_{i,\mathrm c}\,
\delta_{T_{\mathrm c}},
\qquad
\Delta\mathbf V_{i,\mathrm c}=\mathbf0
\quad\text{by proposed postulate}.
$$

It does not imply that a source measure vanishes, that a receiver measure cancels, or that the nonisolated contact stratum has a zero finite part. In particular, the separately labeled source records

$$
\mathsf E_{1,T_{\mathrm c}}\ne0,
\qquad
\mathsf E_{2,T_{\mathrm c}}\ne0
$$

remain in provenance even though the proposed event atom is zero.

Plainly: a zero coefficient on the velocity jump does not erase either emission and does not evaluate the unresolved received contact measure.

## Remaining obligations after response

1. Construct the declared history/trajectory topology and its admissible set.
2. Define the receiver-side contact and competing-stratum vector measures.
3. Prove or refute parameterization-independent perturbative splitting and weak-* convergence with uniform local total-variation control.
4. Prove that both ordered FSC-005 channels have the required root, transversality, sign, and complete-ledger leading asymptotic, or provide an admissible counterexample.
5. Supply compatible outgoing retained-history, source, ownership, and receiver-measure records before posing a restart.
6. Only after those objects exist, pose existence, uniqueness, or continuous dependence for a projected state-dependent-delay evolution.

None of these obligations is advanced by the review response itself.

## Response boundary

No Hörmander finding was omitted or rejected. Findings 1–5, 7, and 8 were accepted and implemented. Finding 6 was accepted as a queued formulation/theorem target. No reviewer was contacted during this response, no Tao review was started, and nothing was published.

The response does not adopt a ceiling or contact law, select general contact semantics, claim a regulator-independent limit or finite-part value, choose a continuation, or assert conservation, stability, physical realization, MEC advancement, or closure-score movement.

Closure goal: complete the FSC-006 source-provenanced receiver-measure formulation and its weak-limit test before requesting any well-posedness review.
