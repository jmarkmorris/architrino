# Matched-Pair Stage 2: Design Review

Status: ◐ Partial — exact piecewise cubic preparation is released; the general tube theorem needs a regularity refinement, and generated-history solution inclusion is not established. This reviews [Stage 2 design](matched-pair-stage-2-design.md), SHA-256 `0958714050241f292cf87c9c4795a7e717d504910899f078e55e2ad81320cde3`, against the [canonical binding](../contracts/master-eom-binding-v1.md), actual history validator and the independent [preparation derivation](matched-pair-review-preparation-2026-10-11.md). The [Stage 1 live disposition](matched-pair-review-stage-1-live-2026-10-11.md) releases successor work; it does not certify a new source carrier. All numerical examples below use $c_f=1$.

## Accepted exact piecewise domain and bound structure

**Measured by reading `History.cpp`'s `exact_segment_endpoint`, `exact_enclosures_overlap` and `validate_segment_join`:** endpoint polynomial position and velocity are evaluated as exact rationals; adjacent endpoint times must agree exactly, and the exact position and velocity error intervals must overlap component by component. With zero error tokens, these intervals are singletons, so overlap establishes exact position and derivative continuity. Exact piecewise cubic paths therefore are $C^1$ across every admitted join and piecewise $C^2$. Their causal residual has a derivative at a join and stays strictly monotone under the certified speed floor. A join root is one source event and must not be counted twice. A gap or missing final segment is not complete coverage.

**Derived:** on a common refinement of both segment partitions, Bernstein hulls bound each nominal segment and its derivatives. Taking a whole-window maximum and adding the nominal velocity jumps bounds velocity changes across multiple cells. The proposed sum over both sources' jumps is conservative, since the delayed-velocity decomposition needs only one source's traversed joins. Re-expanding both polynomials into each cell's own local coordinate is necessary before subtracting equal-index controls. Exact partition tokens, both adjacent endpoint bounds and every earlier prefix segment must be covered and retained in certificate comparison.

The structure $\ell=\ell_0+E_++E_-$ and $\omega=w_0+a_0\ell/\nu+J+U_++U_-$ agrees with the independent nominal-acceleration-plus-velocity-error derivation under its stronger true-path regularity assumptions. It never differentiates an error radius into true acceleration. This is a conditional mathematical agreement, not evidence that an arbitrary supplied or generated carrier meets those assumptions.

Release choice (a): implement and independently check exact piecewise cubics now, including roots on either side of a join and exactly at a join, unequal segmentations, full prefix coverage and exact fallback. Existing zero-error join validation supplies the required regularity. The single-segment policy and default-disabled baseline must remain bound independently.

## S2-1: almost-everywhere compatibility does not certify a sharp join hit

The proposed H1 states absolute continuity and a derivative almost everywhere. H3 refers back to that derivative. This suffices for monotonicity and uniqueness of a residual root, but does not ensure a defined derivative at the root itself. The canonical sharp simple-root weight consumes the actual transmitter velocity and transmitter-side factor at that event. A root at a corner needs additional regularity; uniqueness alone does not supply a simple-root chart.

**Derived counterexample within the stated almost-everywhere reading:** on $[-20,0]$, put the receiver at zero and the positive source on the $z$ axis at

$$
X_+(S)=10+\frac{|S+10|}{10}.
$$

Take a constant nominal source $P_+(S)=10$, position radius $1$ and velocity radius $1/10$. The true path is absolutely continuous, stays in the position tube, and its derivative is $-1/10$ before $-10$ and $1/10$ after it. Any chosen velocity value in the tube at $-10$ preserves the almost-everywhere derivative condition. A negative source fixed at $9.99$ has zero radii. Both lower residuals are strictly negative; the position domain is separated from the receiver, and the speed bound is below one. Yet the positive source's unique causal root is exactly $S=-10$, where the actual path has no derivative. Its residual has different one-sided slopes. The design's hypotheses therefore do not establish the sharp acceleration event that the theorem asserts exists. This is a regularity/definedness gap, not an escaping numerical interval.

Before admitting error-carrying histories, strengthen the true-path assumptions to $C^1$ histories with the tube velocity equal to the derivative at every relevant emission time, including joins, or provide an equivalent separately proved chart treatment for nonsmooth roots. State this requirement in the carrier contract and certificate grade. Adding a nominal jump allowance bounds differences of nominal velocities; it does not repair an undefined actual derivative. A correct strengthened theorem may still allow nominal jumps when the true path is $C^1$ and both adjacent tubes enclose its derivative.

Falsifier: a sharp certified group admitted from this corner history without a defined transmitter derivative at its root, or a purported general proof deriving that derivative from only H1's almost-everywhere condition. The displayed path is an analytical control and requires no solver-authored expected value.

## Error tubes and generated histories

Release choice (b) only as mathematical preparation/explicit conditional diagnostics after S2-1 is resolved; a bare radius declaration does not establish that a particular true path and its derivative are enclosed. Do not give such a declaration the same production acceptance grade as exact piecewise histories. If a supplied carrier has an actual whole-window certificate for the strengthened assumptions, identify and bind it before admitting that carrier. Uniform-circular factory radii need their own proof and numerical binding; “expected” is not acceptance.

The generated-history obligation remains open: the accepted step-doubling discrepancy is an error estimate, and this review has no independently validated inclusion theorem connecting its stored tubes to the true delayed-equation solution. A tube theorem encloses compatible histories conditional on their inclusion; it does not prove that inclusion. Preserve the declared distinction. Stage 3 is unreleased until the selected predecessor uncertainty obligation and independent accepted-state reference can be met; continue permitted exact-piecewise work and uncertainty derivation rather than broadening a claim.
