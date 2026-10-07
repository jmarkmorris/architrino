# Source Taylor geometry across smooth interpolation knots

## Purpose and assumptions

A polynomial source bridge can become excessively broad when a candidate source interval spans very short interpolation pieces. The independently accepted [midpoint construction](overnight2-d-midpoint-geometry.md) avoids that bridge, but its first-order displacement bound can still enlarge the source interval enough to include many pieces. This note derives a second alternative: retain the candidate delay polynomial and bound the source position by its first-order Taylor polynomial with an independently enclosed acceleration remainder. It changes no reference, physical preparation, selected equation, source roots or comparison norm.

Let $Q_j$ be the exact-increment reference source on a connected candidate source interval $S=[u_-,u_+]$. Require that $S$ lie strictly on one side of the original source birth at zero. On the positive branch, the validated reference is continuously differentiable across its ordinary polynomial knots; its acceleration is piecewise continuous and bounded. On the negative branch, the prescribed rigid history is smooth. Thus $Q_j'$ is absolutely continuous on $S$. Let $M\ge\sup_{u\in S}|Q_j''(u)|$, with the acceleration bound including both one-sided traces at every intersected ordinary knot.

The [independent component review](overnight2-d-taylor-geometry-independent-review.md) accepts the repaired [helper](overnight2-d-taylor-geometry.py) and this conditional derivation. Known controls passed before any original-preparation target. No target application, cost reduction or additional trajectory admission is asserted.

## A source enclosure retaining the delay polynomial

Choose a representable center $u_0\in S$. For every $u\in S$, integration of the absolutely continuous velocity gives

$$
Q_j(u)=Q_j(u_0)+Q_j'(u_0)(u-u_0)+r_j(u),
\qquad |r_j(u)|\le\frac{M}{2}|u-u_0|^2.
$$

The same bound holds on either side of $u_0$: reversing the integral orientation leaves the absolute remainder unchanged. It does not require a single polynomial formula on $S$, and it remains valid across ordinary acceleration discontinuities because position and velocity are continuous there. A velocity jump inside $S$ would invalidate this argument and is explicitly rejected.

For a reception cell $J=[a,b]$, retain any candidate positive delay polynomial $\tau_c(t)$ and set $s_c(t)=t-\tau_c(t)$. An interval bound encloses the complete candidate range $s_c(J)$ in $S$. Let $r\ge\sup_{t\in J}|s_c(t)-u_0|$. Interval point evaluations of $Q_j(u_0)$ and $Q_j'(u_0)$ then define the polynomial enclosure

$$
\widetilde Q_j(t)=Q_j(u_0)+Q_j'(u_0)(s_c(t)-u_0),
\qquad
Q_j(s_c(t))\in\widetilde Q_j(t)+[-Mr^2/2,Mr^2/2]^3.
$$

The componentwise box is deliberately conservative relative to the vector remainder. The polynomial arithmetic retains the shared dependence on reception time while carrying this uniform remainder explicitly; no derivative is taken of that remainder. Neither the candidate source polynomial nor a short reference piece is extrapolated as an exact source beyond its validated domain.

## Root and matrix-region contract

The exact receiver polynomial and the source enclosure give a vector enclosure for $R_c(t)=Q_i(t)-Q_j(s_c(t))$. Interval polynomial arithmetic bounds the squared gap $g(t)=\tau_c(t)^2-|R_c(t)|^2$. If the candidate delay has a strictly positive lower bound $\tau_{\min}$ and the complete reference speed is at most $L<1$, then

$$
|\tau_c(t)-|R_c(t)||
=\frac{|g(t)|}{\tau_c(t)+|R_c(t)|}
\le\frac{|g(t)|}{\tau_{\min}}.
$$

The complete causal gap is strictly increasing with lower slope $1-L$. Under the existing separation and root-existence premises, the same reference root-shift bound is therefore

$$
\delta_0=\frac{\sup_{t\in J}|g(t)|}{\tau_{\min}(1-L)}.
$$

This supplies the same complete geometry contract as the original polynomial bridge. The unchanged receiver-translation construction adds $P/(1-L)$ to the root shift and $P+L\delta$ to the candidate-vector enclosure before dividing by a positive delay interval. Complete source-piece and acceleration-trace evaluation, source-velocity perturbation bounds, positive denominators and finite source-birth jump allowances remain separate consumer obligations.

Only the candidate source range must avoid zero for this Taylor formula. An enlarged true-root interval may cross zero; the complete path remains Lipschitz there, so the root-gap bound still applies, while the existing matrix and jump machinery must cover both traces. This construction does not silently remove those event terms.

## Implementation, controls and falsifiers

The helper obtains $M$ by summing the outward componentwise absolute bounds of the existing complete source-acceleration box over $S$. The triangle inequality makes this an upper bound on the Euclidean acceleration norm; no sampled acceleration or user-chosen constant is used. It separately evaluates source position and velocity at the enclosed representable center. Its outward polynomial remainder includes point-evaluation and candidate-polynomial uncertainty. Exact-increment nodes define the reference; floating root search only proposes the delay polynomial. Invalid complete speed, birth-crossing candidate interval, unavailable source range or nonpositive candidate delay fails closed.

Known controls use the exact source $Q_j(u)=u^2/8$ on positive time, represented with binary-rational knots and matching derivatives. Across the ordinary knot at one, $M=1/4$ and source radius $1/4$ give the exact Taylor allowance $1/128$. The helper encloses the independently evaluated positions. A fixed receiver at two has the positive source root $s=4-\sqrt{32-8t}$ on the selected reception interval; independent integer-square-root rational brackets verify its enclosure. A candidate range crossing zero is rejected. These are kinematic controls, not new master-equation preparations.

A discontinuous source velocity inside $S$, an omitted acceleration trace, an acceleration exceeding $M$, an inward Taylor remainder or a missed candidate value invalidates this enclosure. A source/root counterexample satisfying the stated hypotheses would refute the derivation. Even a valid and narrower root enclosure does not itself establish a lower computational cost, a closed nonlinear error comparison, later existence or tail entry. A separately bound integration and independent actual-output review are required before scientific use.

During independent review, an exactly stationary control exposed a fail-closed availability issue in the inherited square-root verification when taking the norm of an outward near-zero acceleration box. The original source and note are preserved. The helper now uses the outward componentwise absolute sum for $M$, avoiding that square-root call while retaining a valid norm upper bound. No interval primitive or independent oracle is edited. Separate verification accepts this narrow change, the formerly failing stationary case and a nonzero vector-acceleration case.

## Proposed integration and measured-selection boundary

The new [Taylor admission composition](overnight2-d-taylor-admission.py) attempts this complete geometry first. It selects it only when its reference root-shift upper bound is at most an outward lower bound on one hundredth of the reception-cell width. This threshold is an analysis selection heuristic, not a physical tolerance. Any unavailable or insufficiently tight Taylor enclosure delegates to the independently accepted screened polynomial/midpoint construction. No values are mixed across enclosures; every downstream source-history, matrix, event and strict-trial gate remains unchanged.

The composition records the Taylor source center, acceleration upper bound, uniform source-position remainder and candidate source interval for every selected Taylor channel. It binds both new executed sources in addition to all inherited producers and data, preserves accepted prior records and runs inherited plus exact Taylor/selection controls before target use. Those controls passed. The [independent integration review](overnight2-d-taylor-admission-independent-review.md) accepts the composition. A bounded original-cell cost/error pilot remains separate; no performance improvement is inferred from code shape or fewer candidate constructions. The current geometric-prefix extractor recognizes only its two stated earlier entry paths and must not be silently used for this new producer.
