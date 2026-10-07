# A bounded alternative to a loose polynomial root bridge

## Observed obstruction and scope

The frozen delayed-admission calculation rejects cell 423, whose reception interval is $[15.284844494560298,15.384844494560298]$, because one enclosed source interval is not strictly earlier than the cell. The known-control-first diagnostic `overnight2-d-admission-obstruction.py` identifies channel $4\leftarrow3$: its candidate delay lies in $[4.738278880502692,4.738284296563515]$, but its certified polynomial bridge radius exceeds 977.68. The enclosure is too broad to prove source ordering. The independent separation-based delay floor remains greater than 2.04356, giving source upper bound below 13.34129 on that same translated-receiver region. Neither observation establishes a trajectory singularity. The [independently accepted completed prefix](overnight2-d-fourth-prefix-admission-independent-review.md) ends before this cell.

This note derives a different reference-geometry enclosure for use with the same previously reviewed matrix-region contract. It changes no reference curve, original preparation, master equation, source selection or scalar error argument. The [independent component review](overnight2-d-midpoint-geometry-independent-review.md) accepts the construction and its small helper under the stated complete-reference premises. Original-preparation application remains separate. All original instruments and failed evidence remain frozen.

## A constant delay proposal on one cell

Let $Q_i,Q_j$ be the complete reference paths, both $L$-Lipschitz with $0\le L<1$. Fix a reception cell $[a,b]$, a representable point $m\in[a,b]$, and any positive constant delay proposal $\tau_0$. Define

$$
R_0=Q_i(m)-Q_j(m-\tau_0),\qquad h=\max(m-a,b-m).
$$

An interval evaluation at the single point encloses $R_0$ and supplies $\epsilon\ge|\tau_0-|R_0||$. The proposal may come from the existing floating root search, but only this independent interval gap controls its error. For every $t\in[a,b]$, define the constant-delay candidate vector $R_c(t)=Q_i(t)-Q_j(t-\tau_0)$. The two reference speed bounds give

$$
|R_c(t)-R_0|\le2Lh,\qquad
|\tau_0-|R_c(t)||\le\epsilon+2Lh.
$$

Thus a componentwise box centered on the interval for $R_0$ with radius $2Lh$ encloses every candidate vector. This uses complete path Lipschitz continuity across ordinary interpolation knots and the original velocity kick; it differentiates no arbitrary enclosure remainder and extends no short polynomial piece beyond its domain.

The complete causal gap is strictly increasing in delay with lower slope $1-L$. Under the already established positive-separation/root-existence premises, every reference root therefore obeys

$$
|\tau(t)-\tau_0|\le\delta_0:=\frac{\epsilon+2Lh}{1-L}.
$$

For a receiver translation of norm at most $P$, the gap changes by at most $P$, giving the same translated-root enclosure with

$$
\delta=\delta_0+\frac{P}{1-L},\qquad
\tau\in\tau_0+[-\delta,\delta],\qquad
s\in[a,b]-\tau_0+[-\delta,\delta].
$$

The actual translated source displacement relative to its constant-delay candidate is at most $L\delta$. Hence the existing matrix-region construction may use the candidate-vector box enlarged by $P+L\delta$, divided by the positive delayed-range enclosure. The unchanged present-separation floor can strengthen the delay lower bound. Source velocity/acceleration boxes must still cover every intersected source piece and both required traces. The separate velocity perturbation retains the original positive-denominator condition $L+Z<1$.

## Interface and implementation boundary

The helper returns the same mathematical quantities consumed by the frozen matrix-region code: a constant candidate delay interval `tb`, candidate source interval `s`, candidate-vector box `R`, certified reference root-shift upper `delta`, complete source-speed bound `L`, and receiver/source indices. Its root-shift proof uses the causal gap directly, rather than the squared-gap formula of the polynomial bridge. The later translation enlargement and direction enclosure depend on these quantities' meanings, not on which gap formula produced the certified radius.

Every operation that supplies a bound is rounded outward by the existing reviewed interval implementation. The center point is checked to lie in the cell, and its distance to each endpoint is separately enclosed; a rounded midpoint is not assumed to divide the interval exactly. The point source time is formed by interval subtraction. The exact-increment receiver polynomial and complete source-box evaluator supply the point vector. A missing source interval, nonpositive proposal or invalid complete speed bound fails closed. The helper does not silently replace the exact-increment reference by the floating cache used to propose the root.

Both the original and this alternative enclosure remain conditional on the established complete-reference domain. Choosing either valid enclosure does not change the physical problem. A combined application must bind this new helper and its selection logic in its evidence, retain accepted earlier history unchanged, and undergo separate implementation and output review. No new actual interval is accepted merely because the alternative geometry is narrower.

## Controls and falsifiers

Known controls precede any original-preparation target. Two fixed points separated by 2 have exactly constant delay 2. A second control uses a fixed receiver at 2 and a source moving with velocity $1/4$ after its continuous birth position, with the source fixed before birth. For reception times in $[4,4.3]$, the exact positive root has source time $s=(4t-8)/3$ and delay $(8-t)/3$. These formulas independently check the complete-cell source and delay bounds, including a nonsymmetric representable midpoint. They are kinematic controls, not selected master-equation preparations.

A complete $L$-Lipschitz reference whose candidate vector leaves the displayed box, or whose root differs from the proposal by more than the gap bound, would falsify the derivation. An invalid complete speed/reference identity, inward point-gap bound or omitted source piece invalidates an implementation. A later error comparison that does not close remains a limitation of that comparison; neither this construction nor the earlier gate failure decides escape, contact or global continuation.
