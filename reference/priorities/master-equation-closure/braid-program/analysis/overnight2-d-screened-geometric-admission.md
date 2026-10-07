# Selecting a valid geometry enclosure before computing an alternative

## Motivation and scope

The standard-library `cProfile` instrument measured the one-cell geometric pilot under owned run `0879b19c-aeda-4628-99e9-70178dd396e2`, completed with exit zero and closed group at 10:37:47.972 UTC after 64.435 supervisor seconds. Its profile assigns 36.774 cumulative seconds to the combined geometry calls, including 26.574 to polynomial geometry and 10.559 to midpoint geometry including controls; matrix-region calls account for another 19.568 cumulative seconds. These instrumented times overlap and cannot be added as independent costs. Profiling overhead also prevents interpreting them as the uninstrumented wall times. The uninstrumented pilot took 38.692 supervisor seconds. Its 56 target channels selected 54 polynomial and two midpoint enclosures.

This measurement motivates skipping an alternative that is unnecessary for validity. The [screened research composition](overnight2-d-screened-geometric-admission.py) first computes the previously accepted polynomial enclosure. If that valid enclosure has a sufficiently small root-shift upper bound, it selects the entire enclosure directly. Otherwise it computes the reviewed midpoint alternative and applies the existing smaller-shift selection. The physical problem, reference, accepted past, residual budgets and scalar comparison do not change. All original producers and receipts remain frozen. The [independent component review](overnight2-d-screened-and-prefix-independent-review.md) accepts this implementation. Its later next-cell pilot is an absolute cost profile, not a same-cell speedup measurement; no additional actual interval follows from this selection note.

## Selection rule and mathematical boundary

For a reception cell $[a,b]$ and complete speed bound $0\le L<1$, define the nonnegative screening threshold

$$
q=\frac{L(b-a)}{1-L}.
$$

The instrument uses a nonnegative outward lower bound on this number. When the polynomial shift upper bound is at most that threshold, it returns the complete polynomial geometry contract. Otherwise it obtains the midpoint contract and selects one complete contract, including its own proposal, vector box, source interval and root-shift allowance. No quantities are mixed between contracts.

The midpoint construction has $h=\max(m-a,b-m)\ge(b-a)/2$ and nonnegative point-gap allowance. Its mathematical radius $(\epsilon+2Lh)/(1-L)$ is therefore at least $q$. This explains the threshold as an economical screening choice. Soundness requires only that the selected enclosure is valid: the optimization is not asserted to reproduce every floating selection bit or to minimize the complete matrix region. At $L=0$ the conservative threshold is zero. If no valid polynomial construction is returned, the midpoint construction remains required and its failure propagates.

Unlike the earlier composition, a midpoint failure is irrelevant when a valid polynomial enclosure has already passed the screen, because that alternative is not evaluated. Where the midpoint is evaluated, its previous failure behavior remains. This is a change of availability and cost, not a weakened admission condition. The unchanged source-before-cell, refined-containment, source-piece, denominator, signed-matrix, residual, jump and strict-trial checks still decide actual admission.

## Binding, controls and falsifiers

The new composition imports the frozen [earlier adapter](overnight2-d-geometric-admission.py), overrides only geometry selection, and appends its own path to the existing dependency binder. The old adapter, midpoint helper, original admission core and all original dependencies remain bound. Inherited known controls run through the new dispatch before any target. The additional exact threshold control uses $L=1/2$ and cell width one, with polynomial shifts $1/2$ and $2$ on opposite sides of the exact threshold one; a missing polynomial must fail the screen. These controls passed before target use.

The screening threshold is not a new physical tolerance or scenario modification. A selected invalid enclosure, incomplete dependency binding, mixed candidate fields or a bypassed downstream admission gate invalidates the implementation. A measured target is needed to assess cost; channel counts alone do not establish a speedup. The original cell 423 result is independently accepted as part of the [424-cell prefix](overnight2-d-fifth-prefix-admission-independent-review.md); this implementation by itself admits no further trajectory interval.
