# Independent review of midpoint reference geometry

## Disposition and frozen scope

Derived disposition: the [midpoint geometry theorem](overnight2-d-midpoint-geometry.md) and [helper](overnight2-d-midpoint-geometry.py) correctly provide an alternative enclosure with the mathematical contract consumed by the unchanged delayed matrix-region construction. No required correction was found. The frozen note has SHA-256 `55c0388d83c3a31340f98778d34305d3d09b4ee17ee4a50c3fb6ddf3169e4200`; the helper has SHA-256 `a851e1f8a9a854bd400dc7a8c71635ce3d0f3a64fbce2472bcfe5ecbe95d1d2a`.

This is a conditional mathematical and implementation-component verdict. No original-preparation target was run, no additional actual interval is accepted, and no integration adapter is adjudicated here. The accepted original trajectory still ends at the separately reviewed [423-cell prefix](overnight2-d-fourth-prefix-admission-independent-review.md). The live Ramon E. Moore lens and retained Specialist charter supply the review discipline; the derivation and independently authored controls provide evidence. The parent's obstruction diagnostic is context, not an independent mathematical result or proof of the origin of its broad enclosure. Its target was not replayed or diagnosed here.

## Independent direct-gap derivation

Fix a validated reference cell $[a,b]$, a representable $m\in[a,b]$, a positive constant proposal $\tau_0$, and complete receiver/source paths with common Lipschitz constant $0\le L<1$. Put $h=\max(m-a,b-m)$ and

$$
R_0=Q_i(m)-Q_j(m-\tau_0),\qquad
R_c(t)=Q_i(t)-Q_j(t-\tau_0).
$$

The triangle inequality gives $|R_c(t)-R_0|\le L|t-m|+L|t-m|\le2Lh$. Thus each coordinate of $R_c(t)$ lies in the corresponding point-vector interval enlarged by $2Lh$. An interval enclosure of the point norm yields $\epsilon\ge|\tau_0-|R_0||$, and the reverse triangle inequality then gives $|\tau_0-|R_c(t)||\le\epsilon+2Lh$. This bound needs only complete position Lipschitz continuity, not a classical derivative at source zero or at any ordinary knot.

For fixed reception point, define $F_t(\tau)=\tau-|Q_i(t)-Q_j(t-\tau)|$. If $\tau_2>\tau_1$, then

$$
F_t(\tau_2)-F_t(\tau_1)\ge(1-L)(\tau_2-\tau_1).
$$

At any positive root $\tau(t)$, this strict two-time slope implies $|\tau(t)-\tau_0|\le|F_t(\tau_0)|/(1-L)\le(\epsilon+2Lh)/(1-L)=\delta_0$. This proof is independent of the proposal's accuracy and of the squared-gap polynomial bridge. Root existence and positive present separation remain caller premises. With a complete subunit source and positive translated present separation, the same slope and growth at infinite delay give the usual complete positive-root existence and uniqueness; the helper does not certify these premises by returning a finite box.

For an arbitrary receiver translation $p$ with $|p|\le P$, its causal gap at the same candidate changes by at most $P$. Hence the translated root obeys $|\tau_p(t)-\tau_0|\le\delta_0+P/(1-L)=\delta$. The actual geometric displacement differs from the constant-delay candidate by

$$
\bigl[Q_i(t)+p-Q_j(t-\tau_p(t))\bigr]-R_c(t)
=p+Q_j(t-\tau_0)-Q_j(t-\tau_p(t)),
$$

whose norm is at most $P+L\delta$. Accordingly the candidate-vector box enlarged by this radius encloses the translated displacement. Dividing by the positive delay enclosure gives a valid normal-vector box. A valid present-separation delay floor may intersect the delay lower bound without losing a true root. Velocity-argument perturbations are separate: $Z$ does not change the geometric root equation, but the consumer must retain the shifted acceleration-denominator condition and source velocity/acceleration piece coverage.

## Exact meanings of the returned fields

The helper returns a singleton encoded positive delay `tb`, the entire constant-delay candidate source interval `s=[a,b]-tb`, the candidate displacement box `R`, an interval whose upper endpoint bounds $\delta_0$, the complete speed bound `L`, and member indices. These are precisely the meanings needed by the frozen consumer. In particular `s` is not already the root source interval, `R` is not already the actual translated displacement, and the consumer must still add its root-shift and vector enlargements.

Read-only inspection of `delayed-variation.source_interval` confirms it adds `g.delta + P/(1-L)` to the returned candidate source interval. `matrix_region` forms the matching delay interval, intersects its lower endpoint with its independently valid separation floor, and enlarges the returned vector by `P + L*delta` before division. It then calls the complete source-box routine on the full resulting source interval and separately adds the velocity perturbation to the acceleration's velocity argument. The helper therefore does not require changing that consumer algebra or reinterpret its fields. It must not be combined with a caller that already applied these enlargements under a different field convention.

## Interval implementation, midpoint and source selection

The floating root search is used only to propose a positive finite encoded $\tau_0$. The receiver point is independently evaluated by the exact increment polynomial at the encoded midpoint, using the supplied interval-enclosed exact accumulated nodes. The source point time is formed by interval subtraction of encoded midpoint and delay; it is not silently rounded to a single source time. The complete source-box evaluator encloses every actual source piece intersecting that small interval, using the exactly joined rigid negative branch where needed and both traces at source zero or ordinary source knots. The position join is continuous, which makes the complete Lipschitz estimate valid through the original kick. Large source-time uncertainty may make the interval loose but does not justify extending a short polynomial piece past its chart.

The point-vector interval is formed from those receiver and source position enclosures. The norm and magnitude use the previously reviewed outward primitives, so the upper endpoint of `magnitude(tau-norm(R))` bounds the true absolute point gap even when the norm interval straddles the proposal. Multiplication, addition and division then produce the complete motion and root-shift bounds. No derivative of a uniform error interval is taken.

The implementation explicitly checks that its floating midpoint lies in the reception cell. It does not assume that `(a+b)/2` exactly halves the encoded interval. It separately encloses `mid-a` and `b-mid`, takes the larger upper endpoint as `half`, and uses that bound in `2*L*half`. The supplied affine control really exercises an asymmetric rounded midpoint of the encoded interval `[4,4.3]`. A midpoint rounding toward one side therefore cannot discard the longer half-cell. A nonfinite/nonpositive proposal or invalid scalar speed bound is rejected; unavailable or out-of-domain source coverage fails in the source evaluator.

The helper injects the caller's existing interval modules rather than creating a competing arithmetic implementation. `tb`, `s`, `R`, `delta` and `L` use the caller's polynomial interval class. Source-box input/output crosses to the front helper's interval type through explicit lower/upper endpoint arrays. The unchanged matrix consumer subsequently converts into its own matrix interval type as before. The independent control below exercises this actual type path; it is not merely a structural dictionary comparison.

The helper is not a standalone reference validator. It relies on the surrounding application for a valid ordered finite grid, valid cell/member indices, matching exact node enclosures and coefficient arrays, verified complete speed bound, original preparation and root-existence/separation premises. This is the same established caller contract as the replaced geometry function. Supplying an arbitrary namespace, rounded absolute nodes or an unverified $L$ does not acquire validity from this helper. A future adapter must bind the helper, dependencies and selection rule and undergo its own review.

## Independently authored known controls

Measured: only lightweight synthetic controls were run under the shared venv. The supplied static delay-two and affine-source controls passed, including the check that the encoded `[4,4.3]` midpoint is not the exact rational midpoint. Independently authored controls then used different cases and expectations:

- A stationary exact source/receiver separation of two was evaluated with a deliberately wrong positive proposal of five. The returned root-shift upper bound is at least three, and the actual delay two and exact source times are enclosed. The floating proposal-only receiver cache deliberately returned position 999 instead of the true receiver position two. The interval result still used the exact declared coefficients. This directly tests that proposal correctness and cache equality are not hidden proof premises.
- A stationary receiver at two and source fixed before birth then moving as $s/4$ were enclosed over the entire reception cell `[1.9,2.1]`, which crosses the source-zero reception. At each encoded endpoint and exact rational midpoint, independent formulas $\tau=2+p$ for $t\le2+p$ and $\tau=(8+4p-t)/3$ otherwise give the true delay for translations $p=-1/100,0,1/100$. Every exact source time and delay lies in the unchanged consumer's enlarged boxes.
- The same control checks the candidate vector $2-\max(t-2,0)/4$ against the returned `R` box and checks the independent complete speed motion bound. The actual `matrix_region` accepts the helper output, returns finite matrix intervals, and includes both the negative source branch and positive piece zero. Interval field types match the caller's expected class.
- Nonpositive, infinite and NaN delay proposals were rejected. Complete speed values $-0.1$, one and $1.1$ were rejected. These controls use explicit exceptions and were not treated as original-preparation or scientific-target results.

The analytic derivations above establish the general bound; finite control points exercise selected implementation obligations and do not replace whole-cell reasoning. No diagnostic from the failed original cell was used as an expected answer.

## Identities, preservation and falsifiers

| Inspected artifact | SHA-256 |
| --- | --- |
| Frozen midpoint note | `55c0388d83c3a31340f98778d34305d3d09b4ee17ee4a50c3fb6ddf3169e4200` |
| Frozen midpoint helper | `a851e1f8a9a854bd400dc7a8c71635ce3d0f3a64fbce2472bcfe5ecbe95d1d2a` |
| Unchanged delayed variation consumer | `7cf2b81572afb2a54f3d8c1f22c4e3e3975c6620914122043932e73cf2367c04` |
| Complete source-box helper | `4763d2e72f988f31d8452d6fcb0c514b6bd0913b577e9fa73636c270e556bdb8` |
| Exact receiver polynomial helper | `9b8baa6135d12145275a5b64fb8f803623ce04d802e65f5ae68f6b24d7a54554` |

Only this new companion was written. Subjects, imported producers, reference arrays, prior receipts/reviews and parent account were not edited. Closing hashes retain the stated identities; relative file links and whitespace were checked. No heavy target, growing partial, original-cell diagnostic, recursive agent or Git mutation was used.

The verdict is falsified by a true candidate vector outside `R`, a root outside the direct-gap shift bound under the stated complete-speed and existence premises, an inward rounded half-cell/gap calculation, an omitted source piece or a consumer interpreting the returned fields differently. A poorly proposed delay, loose point enclosure or failed later scalar comparison can prevent useful admission without falsifying the theorem. This component does not decide where the old polynomial bridge became broad, establish acceptance of a replacement adapter, or determine contact, escape or future ordinary continuation. Its bounded independent review is complete.
