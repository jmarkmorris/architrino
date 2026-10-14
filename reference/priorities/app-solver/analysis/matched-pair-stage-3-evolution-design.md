# Stage 3 Design: Validated Evolution and Matched-Pair Use Within It

This record is the design that the [integration scope](../contracts/matched-pair-enclosure-integration-scope.md) requires before any Stage 3 runtime work. It specifies a bounded, default-disabled way for canonical evolution to publish validated histories and to use the matched-pair bound while doing so. It proposes; it implements nothing. The live library port that would carry the producer and the evidence type is prepared and reviewed in scratch but is not applied, as the [closeout receipt](../evidence/matched-pair-closeout-receipt-2026-10-12.md) and the [integration conversation](../../../op/agent-chats/2026-10-11-eom-matched-pair-integration/chat.md) record. Every numerical instance uses $c_f=1$.

The design rests on results already reviewed: the validated far-step theorem with hypotheses H0 to H5 in [addendum 1](matched-pair-stage-3-addendum-1.md), the admission lessons of [addenda 3](matched-pair-stage-3-addendum-3.md) and [4](matched-pair-stage-3-addendum-4.md), and the producer and evidence of the [version 2 candidate](matched-pair-stage-3-cpp-candidate-v2.md).

## 1. Two different things

Stage 3 has been described as "the grouped route during evolution". Two distinct capabilities hide in that phrase, and the design keeps them apart.

**A validated producer in evolution.** A step type that publishes, for every path, a segment whose declared radii are proved to contain the true continuation, with evidence. This is the far-step theorem used as the integrator. It involves no matched pair.

**Matched-pair use in evolution.** Use of the pair bound to enclose part of a receiver's acceleration. Inside a validated step this cannot be the snapshot bound. The snapshot bound fixes one reception time. The step needs an enclosure of the acceleration at every reception time in the step and every receiver position in its box, which is hypothesis H4. Agreement between a grouped snapshot and an exact snapshot at the step's nodes says nothing about the times between them; that is the aliasing failure in a different place.

A third thing is excluded outright: using the grouped snapshot route inside the ordinary predictor and corrector. Those evaluations run on histories that the ordinary carrier is still building, and the [aliasing control](../evidence/matched-pair-stage-3-aliasing-control-receipt-2026-10-11.md) showed that the ordinary carrier's radii are not enclosures. No ordinary step-doubling segment becomes a validated carrier because its discrepancy is small.

## 2. The whole-step pair bound

**Claim grade: derived**, from the accepted pair theorem and the accepted far-step lemmas; not implemented and not checked by an instrument. Falsifier: a configuration satisfying the conditions below with a pair contribution outside the stated box at some reception time in the step.

Fix a receiver $i$ with step box $\mathcal X_i$, a step $[T,T+h]$, and two sources $\pm$ of opposite charge and equal magnitude. Suppose H0 to H2 hold and both sources are uniformly present for this receiver in the sense of H3. For every reception time $t$ in the step and every $\mathbf x\in\mathcal X_i$, Lemma 1 of addendum 1 gives each source exactly one causal root, in the open interval $(S_{\min},T)$. The pair theorem applies at that receiver event with the common slab $[S_{\min},T]$: the lower residual is negative by H3, and the upper residual at $T$ is positive by H2. Its radius depends on the event only through bounds, so one radius serves the whole step when the bounds are taken uniformly: the distance floor $r^-$ between $\mathcal X_i$ and a convex set containing both position tubes over the complete root window; the speed bound over that window; the equal-time separation $\ell^+$ and the velocity allowance $\omega^+$ of the Stage 2 tube form over that window. The root window is the one the producer already computes, $W^\ast\subseteq[S_{\min},T]$, enlarged to cover both members.

The pair's contribution to $\mathbf F_i(t,\mathbf x)$ then lies in $[-B,B]^3$ for the whole step. In H4 the receiver's acceleration box becomes the sum of the individual kernel boxes for ungrouped sources and one zero-centred box per group. If both sources are uniformly absent the group contributes exactly zero. A pair with one present and one absent member, or with either lower sign undecided, is not grouped and its members are treated individually, each of which then needs its own uniform sign or the step declines.

Two consequences should be stated before anyone builds this.

- **The grouped box is zero-centred and the individual boxes are centred.** Inside a validated step no exact root is ever solved, so grouping does not remove a root search as it does in a snapshot. It replaces two interval kernel evaluations by one bound and usually widens the acceleration box, which widens the published tube and consumes the increment budget. Its benefit in this setting is a cost question that is open and unmeasured, and it may be negative.
- **H2 bounds the step by the smallest separation.** All paths must be mutually farther apart than the step, including the two members of a pair. A matched pair is by nature a close pair, so the step is limited to less than the pair's separation. The validated domain is therefore populations whose smallest separation exceeds a useful step. Tight binaries, self-hits and anything at or above field speed are outside it.

## 3. The bounded canonical domain

Stage 3's first increment admits a run only if every step lies in the domain below. Outside it the run halts at the last accepted boundary.

- Canonical law, legacy canonical equation plan, no Surface geometry, no joint histories, no analytic carriers, no multirate partition, no event impulses, no finite-width state.
- Initial histories: exact prescribed cubics with one common start token, as H0 requires, or a population with producer-issued evidence.
- Every step satisfies H1 to H5 and the declared budgets.

A new evolution policy token names it, `canonical_validated_far_step_evolution/v1`, separate from the snapshot policy token. The default stays `disabled`. Under the default every existing entry point behaves and refuses exactly as now.

## 4. The step, and every evaluation site

The ordinary step in `CoupledEvolution.cpp` evaluates the acceleration at a start snapshot, a predictor snapshot, an endpoint snapshot per corrector iteration, event endpoint snapshots, and a recertification snapshot at the accepted end, once for the full step and once for each half step, and then compares full and half results. Each of those is a single-time evaluation.

Under the validated policy none of those sites is called. The step is one call of the producer: one whole-step acceleration enclosure per path, no predictor, no corrector, no step doubling, no recertification snapshot. This is the only arrangement in which every acceleration evaluation in the step has a whole-step meaning. The grouped whole-step bound of section 2 enters only inside that enclosure.

The grouped snapshot policy stays refused at all of the ordinary sites, permanently and not as a temporary guard, for the reason in section 1.

A later refinement could centre the published curve on a higher-order nominal and keep the validated radius. It would need a bound on the difference between that nominal and the theorem's quadratic over the whole step, and it is not part of this design.

## 5. The accepted-step certificate and the ledger

A validated step returns the existing `NativeAtomicStepCertificate` type, so the controller, callbacks and the run certificate need no new shape, with these meanings.

| Field | Content under the validated policy |
| --- | --- |
| `schema` | A new schema token for validated steps |
| `status`, `failure_code` | `accepted`, or `rejected` with the producer's refusal code |
| `input_history_fingerprints`, `published_histories` | As now. On rejection the published histories are the inputs |
| `substeps`, `accepted_snapshot`, `recertification_snapshot` | Empty: no single-time evaluation occurs |
| `local_errors` | The step's growth of the declared radii, per path and per axis. This is the increment ledger |
| `evidence_status` | A new value distinct from `executable_architecture_evidence`, set only when evidence is issued |
| `integration_method` | A new token naming the validated far step |
| `publication_atomic` | True only if all paths' segments and the evidence were published together |

Two things the existing type does not carry must be added beside it, not squeezed into it: the issued `ValidatedPopulationEvidence`, and a per-path cumulative record of the total declared radius at the accepted time. The cumulative total is already present in the history's own radii; the record makes it visible to the controller without re-reading histories. The increment budget is compared with `local_errors`, as the solver's tolerances are compared now. A separate total budget, if declared, is compared with the cumulative record. The two are different quantities and neither substitutes for the other: in the retained 512-step control each step added at most $1.7\times10^{-9}$ in velocity and the total reached $1.9\times10^{-7}$.

The run certificate reports the validated evidence status only if every step of the run was a validated step.

## 6. Evidence and policy identity

- **Evidence.** Each accepted step issues the sealed evidence object of the candidate, binding the coupling token, the step tokens, and per path the identifier, charge and SHA-256 content chains of the generating and published histories. The next step is admitted only on that evidence. The controller holds exactly one current evidence object and replaces it only on acceptance.
- **Policy identity.** The checkpoint's model fingerprint today does not mention the matched-pair policy. Under the validated policy it must bind the policy token and the declared budgets, so a checkpoint made under one policy or budget cannot resume under another. Under the default it must be byte-identical to today's, which is a compatibility check for the acceptance packet.
- **Scalars.** Coupling, charges and field speed are compared as exact tokens, as the snapshot consumer does.

## 7. Atomic rejection and cancellation

- A step publishes all paths' segments and the evidence, or nothing. A refusal returns the input histories and the previous evidence unchanged, with the refusal code in the certificate.
- Cancellation keeps the existing rule: it is observed only before the first attempt or after an accepted step, so the returned histories, evidence and controller state always form a resumable accepted boundary.
- The controller's response to a refusal is fixed by its code. Budget, isolation and enclosure refusals may be retried with a shorter step, because each can be cured by one, down to the declared minimum step. Provenance, speed and chart refusals are not cured by a shorter step and halt the run. An undecided lower sign halts unless a shorter step decides it. The run then stops with a halt code that names the refusal.
- The controller never substitutes an ordinary step for a refused validated step. Doing so would publish an unproved segment into the chain. If the operator wants to continue past the validated domain, that is a new run under the ordinary policy, whose histories carry no evidence and are refused by every grouped consumer.

## 8. Workers and replay

The producer is serial. With more than one thread the per-pair enclosures may be computed concurrently, but interval sums depend on the order of addition, so the reduction order must be fixed by path order and independent of scheduling. The acceptance condition is that certificates, published tokens and evidence digests are byte-identical for one thread and for several, and across repeated runs. Any retry logic must recompute from the same inputs and must not reuse a partial result from a cancelled worker.

## 9. Persistence and restart

**The limit that shapes this section.** The evidence object is sealed by the type system inside one process. Once written to disk it is bytes that anyone could have written. A content chain detects accidental change. It cannot show that a producer certified the steps, because there is no secret to sign with.

The design therefore distinguishes integrity from validation.

- **What is persisted.** A new versioned checkpoint owner, written through the shared atomic publication routine and leaving the existing version 7 format untouched: the ordinary checkpoint content, the policy token and budgets, and for every accepted validated step its generating record, namely the step tokens, the coupling token, and per path the identifier, charge and both content chains.
- **Integrity on restore.** The restored histories' chains are recomputed and must equal the last record's published chains; every record's generating chains must equal the previous record's published chains, back to the prescribed prefix; the scalars and policy must equal the request's as exact tokens. A failure refuses the checkpoint.
- **Validation on restore.** Integrity does not make the restored population validated. Evidence is reissued only by replay: the producer re-certifies each recorded step from the prescribed prefix and its published tokens must be byte-identical to the restored segments. Only then does the controller hold evidence again. Replay costs as much as the original validated steps, and that cost is the price of not trusting the file.
- **Without replay** a restored run may continue only under the ordinary policy, with no evidence.

A cheaper scheme would need a trust anchor outside the checkpoint, such as a retained certificate log the consumer can read independently. That is a real design alternative and it is not chosen here because nothing in the repository provides one.

## 10. Increments and their acceptance packets

Each increment is default-disabled, is prepared in scratch against a fresh observation of the live sources, and is applied by narrow guarded edits only after its predecessor is independently accepted.

| Increment | Content | Evidence required |
| --- | --- | --- |
| 0, predecessor | The live library port: producer, evidence header, snapshot seam, fixture | The reviewed 95-row gate on live outputs and six unchanged fixture outputs. Blocked on host permission at the time of writing |
| 1 | The validated step as an evolution policy: sections 3 to 7, without the grouped bound, serial | Known static cases first; the reviewer's frozen three-path position and velocity brackets at $1/128$, $1/64$ and $1/32$ contained by every path's tube; the aliasing control reached at $t=2$ with the frozen bracket contained and the aliased interval excluded; every refusal code with no publication; cancellation at accepted boundaries only; default-policy outputs and the default model fingerprint byte-identical |
| 2 | The whole-step pair bound of section 2 inside H4 | The same truth references with grouping on; the grouped acceleration box containing the individual box's true value on the three-path case; two identities and one interval per group in the step's accounting; a mixed pair left ungrouped; measured tube width with and without grouping, reported as a measurement and not as a benefit |
| 3 | Workers | Byte-identical certificates and digests across thread counts and repeats |
| 4 | Persistence and restart | Round trip with replay reproducing every segment; refusal of a checkpoint with any altered history, record, scalar, policy or budget; a restored run without replay holding no evidence; version 7 checkpoints unaffected |

## 11. What this record does and does not settle

**Claim grade: derived** for the whole-step pair bound, from accepted results; **proposed** for everything else. Nothing here is measured.

It settles what "matched-pair use in evolution" can mean without repeating the aliasing error, where each quantity lives in the existing certificate, and what restart can honestly claim. It does not settle whether grouping is worth having inside a validated step, since section 2 gives reasons to doubt it and only increment 2's measurement can answer. It does not enlarge the validated domain: steps are bounded by the smallest separation, and near pairs and self-hits stay outside. And it does not remove the dependence on the live port, which is unapplied.

Questions for the reviewer: whether the fixed controller responses of section 7 are the right split between retry and halt; whether replay is an acceptable meaning of revalidation or a trust anchor should be designed first; and whether increment 2 should be attempted at all before a cost measurement of increment 1.
