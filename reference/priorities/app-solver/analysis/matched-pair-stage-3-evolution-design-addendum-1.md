# Stage 3 Design, Addendum 1: Application State, Refusal Map and Controller as Built in Increment 1

This addendum corrects the [Stage 3 design](matched-pair-stage-3-evolution-design.md), whose reviewed bytes are preserved, as required by the [independent review of the live port and design](matched-pair-review-stage-3-live-port-and-design-2026-10-12.md). It also records the decisions taken while building increment 1. Evidence for increment 1 is in its [receipt](../evidence/matched-pair-stage-3-increment-1-receipt-2026-10-12.md). Every numerical instance uses $c_f=1$.

## 1. Application state

The design said the live library port was prepared but not applied. That is no longer true. The port was applied on 2026-10-12 and qualified live, as its [receipt](../evidence/matched-pair-stage-3-live-library-port-receipt-2026-10-12.md) records, and the reviewer accepted it within its bounded producer and snapshot domain. Increment 0 of the design's table is therefore complete, and increment 1 was released.

## 2. Refusal map, replacing the design's section 7 split

The design's section 7 grouped refusals loosely into "may be retried" and "halt". The reviewer replaced that with a disposition per code. The driver implements it exactly as follows, and its header states the same table.

| Producer refusal | Controller response |
| --- | --- |
| `VFS-H0-01` | Halt. Invalid tokens, population, chart or evidence are not repaired by a shorter step |
| `VFS-H1-01`, retained past speed | Halt |
| `VFS-H1-01`, step velocity box | Retry with half the step |
| `VFS-H2-01`, `VFS-H4-01`, `VFS-H5-01` | Retry with half the step, from unchanged inputs |
| `VFS-H3-01` | Retry with half the step, at most a declared number of times; then halt as unresolved |
| `VFS-PUB-01` | Halt, retaining the failure. A certified step that cannot be appended is treated the same way |
| `VFS-BUDGET-01` | Retry with half the step |
| `VFS-BUDGET-02` | Halt if a declared radius the population already carries exceeds the total budget; otherwise retry with half the step under the same total constraint |
| Anything unrecognised | Halt |

Every retry is bounded three ways: by the declared minimum step, by a declared number of attempts per step, and for the lower sign by its own count. Every refusal leaves the accepted population, its evidence and its ledger untouched.

**The two origins of `VFS-H1-01` are distinguished explicitly.** The producer's certificate gains one field, `cause`, set to `retained_past_speed` or `step_velocity_box` at the two places that code is raised. The controller reads that field and does not infer the origin from the reason text or from which parts of the certificate happen to be filled. This is the only change increment 1 makes to the accepted producer, and it changes none of the producer fixture's output.

For `VFS-BUDGET-02` the controller decides the origin itself, from data it holds: it compares the declared radii of each path's last segment with the total budget.

## 3. The controller as built

- **Its own entry point.** Validated evolution is `evolve_validated_far_step_histories`, in its own source unit. It calls no single-time snapshot, predictor, corrector, step-doubling comparison, root-pressure, cost-feedback or growth heuristic of the ordinary controller, and the ordinary entry points do not call it. They continue to refuse every grouped token, and they refuse the validated evolution token as well.
- **Exact decimal time.** Start, end, step and every boundary are plain decimal tokens. Remaining time is an exact decimal difference, the attempted step is the exact smaller of the controller step and the remaining time, halving is exact, and termination is exact token equality with the requested end. No boundary is formed in binary arithmetic. The final step may be shorter than the declared minimum step, because it is fixed by the requested end and not by a retry.
- **Step length.** A step that needed a retry keeps the shortened length for a declared number of accepted steps. After that, a first-attempt acceptance doubles the next step, never beyond the declared initial step. This is the driver's own rule and uses nothing from the ordinary controller.
- **Atomic state.** The accepted population, its evidence, its ledger and the current time are replaced together and only on acceptance. Cancellation is observed before the first attempt and after an accepted step only. The callback runs after the accepted state is in place.
- **Certificate.** Each attempt is reported in the existing `NativeAtomicStepCertificate` shape with a new schema token, no substeps and no snapshot, and the run in the existing `NativeCoupledEvolutionCertificate` shape. Beside them the driver returns the producer's certificate for each attempt, the issued evidence, and a per-path, per-axis ledger of inherited, incremental and total declared radii.

## 4. What increment 1 deliberately leaves out

- **Request and checkpoint identity.** The review asks that the new execution policy and its controls be bound in the existing request and checkpoint identity, with the default fingerprint bytes preserved. Increment 1 adds no field to the ordinary request and does not touch the checkpoint unit, so the default fingerprint is unchanged by construction. The binding belongs with persistence, which is a later increment, and it touches the checkpoint owner's files. It is recorded here as an open obligation and not as done.
- **Dispatch from the ordinary entry point.** A caller selects validated evolution by calling its entry point with its policy token. Routing through the ordinary request would need that request to carry the policy, the budgets and the evidence, which is the same identity work as the previous item.
- **Grouping, workers, persistence.** Unchanged from the design: later increments, each after the previous one is accepted.

## 5. A measured consequence worth recording

Started from the adversarial step of $2$ on the aliasing control, the controller refuses on the increment budget seven times, first accepts a step of $1/64$, and then alternates among steps of $1/128$, $1/64$ and $1/32$ as the budget allows. It reaches $t=2$ in 142 accepted steps with 33 refusals. Its end velocity tube contains the frozen true bracket and has half-width $5.9\times10^{-7}$, against $1.9\times10^{-7}$ for 512 uniform steps of $1/256$. The wider tube overlaps the interval the ordinary carrier published. That is not an error: a validated tube is required to contain the truth, not to be narrow. It does show that the increment budget alone does not control the accumulated width, which is the reason the design keeps a separate total budget.

**Claim grade: measured**, by the increment 1 fixture and checker on that case; one configuration and one budget.
