# Research findings

## Source and authority boundary

This packet synthesizes operator-supplied external responses attributed to Terence Tao, Andrey Kolmogorov, Henri Poincare, Elie Cartan, Hendrik Lorentz, Albert Einstein, and Bill Thurston to the shared [close-approach continuation prompt](council-close-approach-continuation-2026-07-29.md). One invited eighth reviewer did not respond. That absence is neutral: it is not agreement, disagreement, negative evidence, or a reason to strengthen any claim.

The seven responses are external research guidance only. Their agreement identifies a useful common mathematical programme, but it supplies no acceptance authority, independent numerical evidence, or status change. Where the responses introduced extra hypotheses, this packet retains the hypothesis only when it can be tested without importing it as a premise.

Plainly: seven reviewers pointed toward the same next calculation. That makes the calculation worth doing; it does not make its answer known.

## Shared setup

Use persistent labels \(1\) and \(2\) and a fixed collinear orientation \(\widehat{\mathbf e}\). The signed present-time coordinate separation is

$$
\chi(T)
=
\left(
\mathbf X_2(T)-\mathbf X_1(T)
\right)\cdot\widehat{\mathbf e}.
$$

A present coordinate crossing is \(\chi(T_\times)=0\), with the sign of \(\chi\) changing across \(T_\times\). Persistent labels preserve that sign change; relabeling the two histories at the crossing would erase the distinction the calculation is meant to test.

For an ordered delayed interaction \(i\leftarrow j\), an emission time \(s<T\) is a causal root when

$$
g_{ij}(T,s)
=
r_{ij}(T,s)-(T-s)
=
0,
$$

where, in normalized units \(c_f=1\),

$$
r_{ij}(T,s)
=
\left\|
\mathbf X_i(T)-\mathbf X_j(s)
\right\|,
\qquad
D_{ij}(T,s)
=
\partial_s g_{ij}(T,s).
$$

On an isolated simple root with \(r_{ij}>0\) and \(D_{ij}\neq0\), the canonical regular contribution is

$$
\mathbf A_{ij}(T;s)
=
C_{ij}
\frac{\mathbf n_{ij}(T,s)}
{r_{ij}(T,s)^2|D_{ij}(T,s)|},
\qquad
\mathbf n_{ij}
=
\frac{\mathbf X_i(T)-\mathbf X_j(s)}{r_{ij}(T,s)}.
$$

The regular acceleration is the sum over the complete causal-root census for every ordered pair. Receiver-time playback factors are not acceleration weights.

Plainly: the current positions and the delayed source positions are different objects. Every arriving root samples an earlier point on a persistently labeled source history, and every admitted root must remain in the sum.

## Derived event separation

Three events must be recorded separately:

1. **Present signed coordinate crossing:** \(\chi(T_\times)=0\).
2. **Positive-range causal-root fold:** for some root, \(g_{ij}(T_f,s_f)=0\), \(D_{ij}(T_f,s_f)=0\), and \(r_{ij}(T_f,s_f)>0\).
3. **Zero delayed-range coincidence:** for some root, \(g_{ij}(T_c,s_c)=0\) and \(r_{ij}(T_c,s_c)=0\).

These definitions show that none of the three events implies either of the other two without additional geometry. At \(T_\times\), a delayed root still samples \(s<T_\times\) and can have both positive range and nonzero transmitter Jacobian. A fold can occur while the delayed range is positive. A zero-range event can occur without the ordinary nondegenerate fold hypotheses.

**Claim grade: derived from the displayed definitions.** The ordering of the three events for the proposed control is unresolved and must be measured from the complete root ledger.

Plainly: the two current coordinates can cross before, after, or without a delayed root merger. Calling all three events a collision would hide the question the calculation needs to answer.

## Maximal regular retained-history result

The current defensible dynamical object is the maximal retained-history evolution on the connected interval where:

- the complete causal-root census is available;
- every consumed root has \(r_{ij}>0\) and \(D_{ij}\neq0\);
- every root time lies inside the retained history with a positive margin; and
- the regular all-root acceleration sum is defined.

The interval terminates at the first failed condition. Nothing in this object supplies passage, rebound, a singular-boundary value, or an outgoing continuation.

**Claim grade: derived scope statement.** It summarizes what the regular equations can presently support. It is not a global existence result.

Plainly: the regular evolution may be followed until its own assumptions fail. What happens after that first failure remains open.

## Conditional positive-range fold analysis

For a positive-range nondegenerate fold, take a local normal form

$$
g(T,s)
=
\alpha(T-T_f)
+
\frac{\beta}{2}(s-s_f)^2
+
o\!\left(
|T-T_f|+|s-s_f|^2
\right),
\qquad
\alpha\beta\neq0.
$$

On the two-root side, \(|s-s_f|=O(|T-T_f|^{1/2})\), hence

$$
|D(T,s)|
=
|\partial_s g(T,s)|
=
O(|T-T_f|^{1/2}).
$$

If \(r(T_f,s_f)>0\) and the remaining vector factors stay bounded, each regular root contribution can therefore have pointwise magnitude

$$
O(|T-T_f|^{-1/2}),
$$

which is locally integrable in \(T\) but unbounded at \(T_f\).

**Claim grade: derived only under the displayed ordinary-fold, positive-range, and bounded-factor hypotheses.** The exact coefficient and the complete signed all-root sum are unresolved. Tangential folds, higher multiplicity, simultaneous events, and zero delayed range require different analysis.

Plainly: a generic fold spike can have finite area while its height diverges. Finite integrated acceleration does not make instantaneous acceleration bounded and does not prove a unique continuation.

## Proposed emission-time pushforward representation

On the simple-root domain, the exact delta identity is

$$
\int
\mathbf F_{ij}(T,s)
\delta\!\left(g_{ij}(T,s)\right)\,ds
=
\sum_{s_k:\,g_{ij}(T,s_k)=0}
\frac{\mathbf F_{ij}(T,s_k)}
{|D_{ij}(T,s_k)|},
$$

with

$$
\mathbf F_{ij}(T,s)
=
C_{ij}
\frac{\mathbf n_{ij}(T,s)}
{r_{ij}(T,s)^2}.
$$

Thus the emission-time pushforward reproduces the canonical complete simple-root sum exactly when every root is isolated and simple.

**Claim grade: derived identity on the regular domain; proposed innovation at a fold.** Treating the time-dependent pushforward as a locally finite vector measure through a positive-range fold is a candidate formulation only. It must first prove local finiteness for the exact all-root expression and then prove uniqueness of a measure-valued or Caratheodory continuation. The identity itself supplies neither proof.

Plainly: the delta formula is a faithful rewrite before the fold. Whether that rewrite remains a unique mathematical evolution at the fold is the open question.

## Zero delayed range remains separate

At \(r_{ij}=0\), both \(r_{ij}^{-2}\) and the direction \(\mathbf n_{ij}\) require separate treatment. The positive-range fold power count does not determine their combined scaling. No boundary value, distributional finite part, event map, core, or width is selected.

**Claim grade: unresolved.** The next admissible step is a separate all-root scaling and integrability calculation if the bounded regular approach actually reaches a zero-range regime.

Plainly: solving the root-density spike would not solve the inverse-square zero-range problem.

## Corrections and rejected shortcuts

The response synthesis does not support any of the following:

- a field-speed-crossing assertion;
- self-hit feedback as an input mechanism;
- a conserved account;
- an exact square-root coefficient without the complete local geometry;
- regularity of a hypothesized superluminal contact;
- bounded instantaneous acceleration inferred from local integrability;
- a receiver playback factor inserted to manufacture cancellation;
- root deletion, branch selection, or incomplete enumeration;
- arbitrary finite width or a fitted boundary impulse; or
- a scalar surrogate in place of the vector delayed-root sum.

**Claim grade: rejected or unestablished research hypotheses.** None may be used in the immediate calculation.

# Proposed changes

## Evidence-bounded synthesis

Retain the seven-response consensus as a priority-only research map:

- The maximal regular retained-history evolution is the present endpoint.
- Persistent labels and signed coordinate data must survive the coordinate crossing.
- The complete causal-root ledger must distinguish current-coordinate, positive-range-fold, and zero-range events.
- The pushforward identity is a candidate fold representation only after exact regular-domain recovery, local finiteness, and uniqueness are proved.
- Zero delayed range remains a separate scaling problem.

No reader-facing change, queue status change, or closure claim follows from this synthesis.

## Pre-boundary root-and-singularity ledger calculation

Run one bounded, mirror-symmetric, opposite-polarity, collinear approach from large finite separation using \(c_f=1\), the canonical regular all-root acceleration, fixed initial retained histories, and persistent labels. Predeclare a decreasing ladder of positive signed-separation sections \(\rho_k\downarrow0\). Record the incoming section \(\chi=+\rho_k\); if the regular domain survives through \(\chi=0\), record the crossing without relabeling and continue only on the same regular chart to the matched section \(\chi=-\rho_k\) or to an earlier fail-closed stop.

This is not permission to cross a causal-root fold or zero-range boundary. Stop before consuming any row when:

- a complete root census cannot be certified;
- an interval enclosure for any consumed delayed range contains zero;
- an interval enclosure for any consumed \(D_{ij}\) contains zero;
- a required root loses positive retained-history margin; or
- the independent root oracle and the evolution record disagree.

At every accepted section and terminal stop, record:

1. the complete ordered-pair root census, persistent root identities, multiplicities, root times, and signs of \(D_{ij}\);
2. \(\chi(T)\), whether signed coordinate crossing has occurred, and its bracketed time if it has;
3. the minimum delayed range over all consumed roots;
4. the minimum absolute transmitter Jacobian over all consumed roots;
5. the minimum retained-history margin;
6. the signed relative-acceleration integral

   $$
   I[T_a,T_b]
   =
   \int_{T_a}^{T_b}
   \left(
   \mathbf A_2(T)-\mathbf A_1(T)
   \right)\cdot\widehat{\mathbf e}\,dT;
   $$

7. the total variation

   $$
   V[T_a,T_b]
   =
   \int_{T_a}^{T_b}
   \left|
   \left(
   \mathbf A_2(T)-\mathbf A_1(T)
   \right)\cdot\widehat{\mathbf e}
   \right|\,dT;
   $$

8. refinement evidence across time step, history resolution, arithmetic precision, root-isolation tolerance, quadrature, and section ladder; and
9. an independently authored or analytically closed root oracle on every interval where such an oracle has declared reach.

Plainly: the calculation watches which regular margin fails first and whether the present coordinates cross while every delayed root remains regular. It does not fill in a missing singular value.

The calculation is falsified as a complete pre-boundary record by any missing root, label swap, hidden branch deletion, root-oracle disagreement, nonpositive history margin, undeclared receiver playback weight, scalar replacement, finite-width insertion, post-fit impulse, or claimed integral limit that moves under the predeclared refinements.

## Candidate work held outside the immediate action

Only after the pre-boundary record identifies an isolated positive-range nondegenerate fold should a separate proof attempt test whether the exact emission-time pushforward is locally finite and admits a unique measure-valued or Caratheodory continuation. Only after a zero delayed-range approach is identified should a separate scaling calculation be designed. Neither candidate is selected or queued by this packet.

# Items to disposition into the priorities directory

| Item | Live owner | Disposition | Exact next action | Nonclaims |
| --- | --- | --- | --- | --- |
| Pre-boundary root-and-singularity ledger calculation | `MEC-007` mirror close-approach causal-root boundary | `priority-only`; no status change | Execute the bounded regular approach and section contract above; stop fail-closed at the first uncertified root, zero-containing delayed-range or transmitter-Jacobian interval, retained-history loss, or oracle disagreement | This is not a continuation, boundary value, MEC-005 provenance closure, MEC-007 completion result, conserved account, stability or retention result, physical realization, or solver acceptance |

The missing eighth response receives no priority disposition. The proposed pushforward, measure-valued continuation, Caratheodory continuation, matched asymptotics, repelling comparison, and zero-range scaling remain research possibilities rather than additional queue actions.

Promotion classification: `priority-only`. No material in this packet is ready for reader-facing promotion.
