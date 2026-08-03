# Topo App Work Log

This file is the chronological work log for the `app-topo` priority area. Use [priorities.md](priorities.md) for strategy, [work-queue.md](work-queue.md) for accepted executable work, [requirements-and-design.md](requirements-and-design.md) for the current application boundary, and [brainstorming.md](brainstorming.md) for provisional ideas.

## Log Entries

### 2026-08-02 — TOPO-001 Observable And Reference Geometry Closed

- Added [the TOPO-001 contract](topo-observable-and-reference-geometry-v1.md) for the prescribed uniformly translating single-source geometry with $c_f=1$.
- Derived the unique positive causal root for every off-source sample at $0\leq\beta<1$, together with $D_t=\lambda_\beta/\tau_\beta$ and $W^{\mathrm{acc}}=\tau_\beta/\lambda_\beta$.
- Selected `Signed ordinary wake intensity`, $\mathcal I_q^{\mathrm{ord}}=\varsigma_q/(\tau_\beta\lambda_\beta)$, as the first raw scalar and explicitly did not identify it as a scalar potential or receiver acceleration.
- Added the radial $\beta=0$ control, exact equal-distance leading/trailing samples at two regular nonzero speeds, polarity reversal, and the exact $\beta=1$ split between the ordinary trailing half-plane, rootless leading/transverse region, and degenerate source-point family.
- Defined distinct ordinary, singular, unavailable, nonordinary, unresolved, and display-clipped result states plus operator-checkable falsifiers.
- Removed TOPO-001 from the live queue. TOPO-002 is now the top item; the reference surface remains blocked on that display contract. A future true scalar-potential mode remains routed to [Potential](../app-potential/priorities.md).

Plainly: the first map now has one exact raw meaning and exact endpoint behavior. The open potential question remains separate instead of being hidden inside the wake-intensity label.

### 2026-08-02 — Priority Area Created

- Created `app-topo` as a focused two-dimensional prescribed-path viewer rather than an alternative Potential calculation route.
- Captured the fixed normalized source position $(2/3,1/2)$, left-to-right translation, $\beta=v/c_f$ slider, initial electrino/positrino choices, recalculation behavior, tunable contour count, and red-purple-blue signed palette.
- Limited the first release to a static single-time map and deferred dynamics.
- Recorded linear, signed-log2, and asinh display transforms for controlled comparison, with asinh as the leading but unselected default candidate.
- Identified the first blocker: `potential` and a signed $1/r^2$ wake-intensity quantity require distinct mathematical definitions unless a versioned scientific contract explicitly equates or relates them.
- Bound reusable path-to-potential conversion to [Potential](../app-potential/priorities.md) and shared interchange to [AAA Core](../app-aaa-core/priorities.md).
- Queued the observable/reference-geometry contract and the interaction/color contract. No application implementation began.

Plainly: the app idea now has a durable home, but the first colored pixel waits for an exact definition of what its value means.
