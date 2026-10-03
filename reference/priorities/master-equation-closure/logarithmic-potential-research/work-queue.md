# Logarithmic potential research work queue

This queue holds the remaining operator-requested plan for assessing the proposal. Completed inputs are the [LPR-001 instantaneous control](analysis/instantaneous-collinear-first-event.md), [LPR-002 causal formulation](analysis/causal-logarithmic-formulation.md), [LPR-003 incoming first-event theorem](analysis/causal-collinear-first-event.md), and [LPR-004 continuation obstruction](analysis/causal-continuation-obstruction.md), with separately authored independent proofs linked from their treatments. Every new research artifact remains in this directory. Legend: ✓ Done, ◐ Partial, ○ Not done. Lifecycle status and explicit dependency labels accompany every item.

## Ranked Next Objects

No global numerical score is assigned. The order below is a local dependency plan. LPR-006 is the next unresolved object: the proved collinear obstruction triggers the plan's early-disposition path, before investing in the remaining conserved-account work.

The operator removed the quadratic receiver response from this scenario. The [strict treatment](manuscript.md#strict-domain-with-unchanged-logarithmic-acceleration) retains the logarithmic equation on the domain below wake speed; its incoming theorem reaches the excluded boundary at positive separation. The [inclusive inequality with unchanged acceleration](manuscript.md#inclusive-domain-with-unchanged-logarithmic-acceleration) admits that endpoint but supplies no continuing motion. A subsequently requested [boundary-projection examination](manuscript.md#boundary-projection-as-an-explicit-additional-response) now states the additional equation explicitly and derives its entry and unique immediate local unit-speed continuation with zero self acceleration. The following interval to its next event remains a separate discussion step. The [occurrence audit](analysis/quadratic-response-occurrence-audit.md) records the quadratic separation; that withdrawn side study supplies no active assumption. LPR-006 execution remains deferred, and examining the projection does not adopt it into the baseline Master Equation.

| Order | Object | Progress and lifecycle | Dependency | Completion result |
| --- | --- | --- | --- | --- |
| 1 | [LPR-006 — Research disposition](#lpr-006--research-disposition) | ○ Not done — Queued; execution Deferred during the current discussion | Completed LPR-004 obstruction and its regularity boundary; use only the explicitly selected scenario assumptions | Operator-reviewable continue, revise, or park recommendation |
| 2 | [LPR-005 — Robustness and conserved account](#lpr-005--robustness-and-conserved-account) | ◐ Partial — remaining execution Deferred | Incoming and endpoint family results available; further work depends on disposition | Remaining robustness assessment and a derived account with boundary terms, or named failures |

## Remaining research stages

## LPR-006 — Research disposition

- **Progress / lifecycle:** ○ Not done — Queued. LPR-004's independent collinear noncontinuation result supplies the decisive earlier obstruction contemplated by this plan.
- **Request:** Assess whether the logarithmic proposal resolves a specific problem or yields a useful obstruction, and what additional assumptions it costs. Compare the same declared observables across the instantaneous reference, causal candidate, and current-law control without treating their distinct hypotheses as one model.
- **Completion:** Consolidate the scientific result in the manuscript and a concise continue, revise-a-named-assumption, or park recommendation in priorities. Name the strongest supported claim, independent evidence, falsifier, remaining uncertainty, and next bounded question. The operator decides whether broader work or promotion is warranted; until then, all substantive logarithmic research remains here.

## LPR-005 — Robustness and conserved account

- **Progress / lifecycle:** ◐ Partial — the incoming theorem and continuation obstruction cover every $a,K>0$ and affine prepared speed $0\le u_0<1$. Remaining robustness and conserved-account execution is Deferred pending LPR-006's disposition. No continuing collinear trajectory exists in the tested same-law class.
- **Request:** Assess any additional preparation or response comparisons only after their purpose survives the disposition. Distinguish physical dimensionless parameters from changes of units and the arbitrary reference radius. Do not interpret a sweep over authored knobs as evidence for the physical law.
- **Account:** Identify the proposed transported quantity, its evolution and source/receiver boundary terms. Distinguish scalar potential, emitted surface measure, gradient flux, and quadratic-gradient flux. A static spherical identity is not a dynamical energy theorem. Assess infinite-range and short-distance requirements within the declared domain.
- **Completion / falsifier:** Report which conclusions persist outside the established family, which fail, and whether an independently derived account closes. A changing outcome under a pure gauge shift, hidden retuning, missing boundary contribution, or a failed independent control is a scoped negative result. Transverse perturbations and electromagnetic angular recovery remain optional, separately scoped questions; their absence does not weaken the established collinear obstruction.

## Execution and storage

New local exploratory instruments and their definitions stay under this lane's `analysis/`; retained evidence records stay under its `evidence/`. Large reproducible outputs use the existing ignored runtime owners with exact reproduction links here. Use the shared venv for any Python, keep $c_f=1$, and use the repository's watched-job procedure if later authorized computations are long-running. No new standing test suite, production solver implementation, or broad experiment sweep is introduced by this plan.
