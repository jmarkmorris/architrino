# Receiver Wake-Gradient Closure Proof Design

## Status

- Kind: `priority`
- Queue item: `MEC-006`
- Priority object: `receiver_wake_gradient_closure`
- Claim level: `priority-only derivation and proof design`
- Workstream: [master-equation-closure](priorities.md)
- Related queue items:
  [MEC-001 characteristic-tail action adjudication](work-queue.md#mec-001--characteristic-tail-action-adjudication)
  and
  [MEC-005 pairwise causal-root ledger closure](pairwise-causal-root-ledger-closure.md)
- Routed research input:
  [wake reception, transfer, and maturity](../../entourage/review-packets/terence-tao-wake-reception-transfer-and-maturity-2026-07-28.md)
  invokes MEC-006 only when a reception candidate actually consumes a
  receiver/self acceleration-gradient row; it is not a blanket gate on
  allocation research.
- Current disposition: `INCOMPLETE`
- Promotion status: not promoted

## Finding

The canonical regular partner-root acceleration operator already contains the
arriving direction, inverse-square surface dilution, polarity sign, and
transmitter-side root-Jacobian weight. Its complete receiver-position gradient
for one declared simple root is derived below. The gradient is a tensor
sensitivity of that operator; it is not an omitted acceleration contribution
and must not be added to the operator.

The regular partner-root receiver gradient is closed analytically under fixed
reception time, fixed retained transmitter history, positive separation, and a
nonzero transmitter factor. The EOM solver's existing sharp-root sensitivity
path implements the same general chain-rule structure. A separately authored
full three-dimensional verifier has not accepted the formula, so this packet
does not promote it beyond a proof design with an independently recomputed
numerical diagnostic.

The same instantaneous receiver formula applies to one positive-delay
same-history root only when the past transmitter point is held fixed and the
root has certified separation and transmitter-factor floors. It does not
define the trivial self diagonal, a fold, a coincident same-transmitter birth,
or the full functional derivative in which current and past points belong to
one varied history. Without a predeclared core or diagonal rule, no uniform
receiver/self gradient exists as the positive-delay root approaches the
diagonal.

Plainly: the ordinary partner-root derivative can be written completely. It
includes the fact that moving the receiver changes which past emission time is
selected. That result does not repair the unresolved self diagonal or turn a
scalar wake picture into an accepted action.

## Scope And Nonclaims

This packet derives one fixed-reception spatial derivative and designs its
smallest symmetric two-body check. It does not establish:

- a new acceleration law or a correction to the Master Equation;
- an accepted scalar potential or action;
- an independently evolving causal-wake state;
- conserved energy, momentum, or angular momentum;
- stability, binding, retention, rebound, or a physical energy account;
- an EOM solver acceptance result;
- a finite fold or coincident same-transmitter continuation; or
- closure of MEC-001 or MEC-005.

MEC-005 may use this result only as an acceleration-operator readiness
obligation. Its two-body conservation interpretation remains gated on an
accepted MEC-006 receiver/self gradient, the separate MEC-001 action
adjudication where that route is invoked, and the independently derived wake
and boundary accounts already required by MEC-002 and MEC-004.

Plainly: this work checks how one legal acceleration row changes under a small
receiver displacement. It does not say what account that row carries or
whether a two-body encounter conserves anything.

## Live Authority Boundary

The live Master Equation declares the regular per-root acceleration

$$
\mathbf A_{ij}(T;s)
=
C_{ij}
\frac{c_f}{r^2|D|}
\mathbf n,
\qquad
C_{ij}
\equiv
\kappa\,\sigma_{ij}|q_iq_j|,
$$

with

$$
\mathbf R
=
\mathbf X_i(T)-\mathbf X_j(s),
\qquad
r=\|\mathbf R\|,
\qquad
\mathbf n=\frac{\mathbf R}{r},
\qquad
D=c_f-\mathbf n\cdot\mathbf v,
$$

where $\mathbf v=\dot{\mathbf X}_j(s)$ and the declared causal root satisfies

$$
g(T,s)
=
r-c_f(T-s)
=
0.
$$

Plainly: $C_{ij}$ carries the coupling and polarity sign. The vector
$\mathbf n$ points from the transmitter's past emission point to the receiver.
The factor $c_f/|D|$ measures the density of arriving causal surfaces in the
transmitter-time collapse. A simple root requires both $r>0$ and $D\ne0$.

The receiver-time playback derivative is a different object:

$$
\frac{ds}{dT}
=
\frac{D_r}{D},
\qquad
D_r
=
c_f-\mathbf n\cdot\mathbf V_i(T).
$$

Plainly: $ds/dT$ says how the selected past emission time moves when reception
time advances along the receiver history. It is not an extra acceleration
weight and it is not the receiver-position derivative derived below.

The pure scalar $1/r$ action route remains incomplete in the live corpus
because varying its causal selector produces an additional interior
derivative-of-constraint term. The characteristic-tail kernel in MEC-001 has
an exact receiver-gradient identity, but its frozen whole functional is
undefined on its retained self diagonal. Neither result changes the canonical
regular acceleration operator above.

Plainly: three questions must stay separate. The Master Equation says what one
arriving root contributes. A spatial sensitivity says how that contribution
changes when the receiver is moved. An action asks whether one whole-history
scalar produces the same law and its boundary terms. Success in one question
does not answer the others.

## Declared Differentiation Problem

Hold the reception time $T$ fixed. Hold the retained transmitter history
$\mathbf X_j(\cdot)$ fixed as a function. Let the receiver coordinate
$\mathbf x=\mathbf X_i(T)$ vary in an open neighborhood on which one selected
root $s=s(\mathbf x)$ remains simple and isolated. Assume

$$
r\ge r_{\min}>0,
\qquad
|D|\ge D_{\min}>0,
\qquad
\|\mathbf v\|\le V_{\max},
\qquad
\|\mathbf a\|\le A_{\max},
$$

where $\mathbf a=\ddot{\mathbf X}_j(s)$.

Plainly: the derivative follows one named root, not whichever root a solver
happens to return after perturbation. The separation and transmitter-factor
floors keep the calculation away from collision and fold boundaries.

Use the matrix convention

$$
\left[
\nabla_{\mathbf x}\mathbf A_{ij}
\right]_{ab}
=
\frac{\partial A_{ij,a}}{\partial x_b}.
$$

Plainly: each column records the change in the three acceleration components
when one receiver coordinate is perturbed.

## Root-Time And Delayed-History Derivatives

Implicit differentiation of $g(T,s(\mathbf x))=0$ gives

$$
\nabla_{\mathbf x}s
=
-\frac{\mathbf n}{D}.
$$

Consequently,

$$
d\mathbf R
=
\left(
\mathbf I+\frac{\mathbf v\otimes\mathbf n}{D}
\right)d\mathbf x.
$$

Define

$$
\mathbf P
\equiv
\mathbf I-\mathbf n\otimes\mathbf n,
\qquad
\mathbf M
\equiv
\mathbf I+\frac{\mathbf v\otimes\mathbf n}{D}.
$$

Then

$$
\nabla_{\mathbf x}r
=
\frac{c_f}{D}\mathbf n,
\qquad
\nabla_{\mathbf x}\mathbf n
=
\frac{\mathbf P\mathbf M}{r}.
$$

Plainly: moving the receiver also moves the selected emission time. The matrix
$\mathbf M$ is the delayed-history correction to the direct displacement
change. The projector $\mathbf P$ removes the radial component when the
line-of-action direction changes.

The transmitter velocity is evaluated at the moving root, so

$$
d\mathbf v
=
\mathbf a\,ds.
$$

Writing

$$
\mathbf N
\equiv
\nabla_{\mathbf x}\mathbf n
=
\frac{\mathbf P\mathbf M}{r},
$$

the complete signed transmitter-factor gradient is

$$
\mathbf d
\equiv
\nabla_{\mathbf x}D
=
-\mathbf N^{\mathsf T}\mathbf v
+
\frac{\mathbf n\cdot\mathbf a}{D}\mathbf n.
$$

Equivalently, with
$\mathbf v_\perp=\mathbf P\mathbf v$,

$$
\mathbf d
=
-\frac{\mathbf v_\perp}{r}
+
\frac{1}{D}
\left(
\mathbf n\cdot\mathbf a
-
\frac{\|\mathbf v_\perp\|^2}{r}
\right)\mathbf n.
$$

Plainly: the first term records the change in the line of action relative to
the transmitter velocity. The second records how shifting the emission time
changes that velocity through the transmitter acceleration. Omitting either
term gives an incomplete gradient on a general delayed history.

## Complete One-Root Receiver Gradient

Let

$$
\alpha
\equiv
C_{ij}
\frac{c_f}{r^2|D|},
\qquad
\mathbf h
\equiv
\nabla_{\mathbf x}r
=
\frac{c_f}{D}\mathbf n.
$$

Since

$$
\nabla_{\mathbf x}\log|D|
=
\frac{\mathbf d}{D}
$$

on a one-sign simple-root chart, the complete receiver-position gradient is

$$
\boxed{
\nabla_{\mathbf x}\mathbf A_{ij}
=
\alpha
\left[
\mathbf N
-
\mathbf n\otimes
\left(
\frac{2\mathbf h}{r}
+
\frac{\mathbf d}{D}
\right)
\right].
}
$$

Plainly: $\mathbf N$ differentiates the arriving direction. The
$2\mathbf h/r$ term differentiates inverse-square dilution. The
$\mathbf d/D$ term differentiates the transmitter-side root-Jacobian weight.
Together they are the full spatial sensitivity of the declared one-root
operator.

An equivalent parameter form is useful for implementation checks. For any
fixed-time perturbation parameter $\xi$, let
$\mathbf b_i=\partial_\xi\mathbf X_i(T)$,
$\mathbf b_j=\partial_\xi\mathbf X_j(s)$ at fixed $s$, and
$\mathbf c_j=\partial_\xi\mathbf v_j(s)$ at fixed $s$. Then

$$
s_\xi
=
-\frac{\mathbf n\cdot(\mathbf b_i-\mathbf b_j)}{D},
$$

$$
\mathbf R_\xi
=
\mathbf b_i-\mathbf b_j-\mathbf v s_\xi,
\qquad
\mathbf n_\xi
=
\frac{\mathbf P\mathbf R_\xi}{r},
$$

$$
\mathbf v_\xi^{\mathrm{eff}}
=
\mathbf c_j+\mathbf a s_\xi,
\qquad
D_\xi
=
-
\left(
\mathbf n_\xi\cdot\mathbf v
+
\mathbf n\cdot\mathbf v_\xi^{\mathrm{eff}}
\right),
$$

and

$$
\boxed{
\partial_\xi\mathbf A_{ij}
=
C_{ij}\frac{c_f}{|D|}
\left[
\frac{\mathbf R_\xi}{r^3}
-
\frac{3\mathbf R(\mathbf R\cdot\mathbf R_\xi)}{r^5}
-
\frac{D_\xi}{D}\frac{\mathbf R}{r^3}
\right].
}
$$

Plainly: this second box is the same derivative written one perturbation at a
time. It exposes the exact chain used by the live EOM sharp-root sensitivity:
root time, delayed transmitter position, direction, transmitter factor, and
acceleration weight all change on the same retained record.

### Static-transmitter control

For $\mathbf v=\mathbf a=\mathbf0$, one has
$D=c_f$, $\mathbf M=\mathbf I$, $\mathbf d=\mathbf0$, and

$$
\nabla_{\mathbf x}\mathbf A_{ij}
=
\frac{C_{ij}}{r^3}
\left(
\mathbf I-3\mathbf n\otimes\mathbf n
\right).
$$

Plainly: the general formula reduces to the ordinary derivative of
$C_{ij}\mathbf R/r^3$. Failure of this reduction falsifies the tensor formula
before any delayed-history test is attempted.

## Why A Pure Scalar Route Is Not The Missing Term

At fixed emission time,

$$
\nabla_{\mathbf x}\frac{1}{r}
=
-\frac{\mathbf n}{r^2}.
$$

Following the selected causal root instead gives

$$
\nabla_{\mathbf x}\frac{1}{r}
=
-\frac{c_f}{D}
\frac{\mathbf n}{r^2}.
$$

Plainly: root-constrained differentiation produces the signed factor $1/D$,
not the unsigned acceleration weight $1/|D|$. On a fixed one-sign branch one
can rewrite the canonical row using the branch sign, but that rewrite does not
define a smooth scalar across a fold and does not supply a complete
whole-history action.

Similarly,

$$
\nabla_{\mathbf x}\frac{1}{r^2}
=
-\frac{2c_f}{D}
\frac{\mathbf n}{r^3},
$$

which has the wrong radial scaling for the canonical acceleration.

Plainly: neither a bare $1/r$ nor a bare $1/r^2$ scalar is the complete
receiver/self gradient problem. The first omits the full action variation and
the absolute transmitter weight; the second differentiates to an inverse-cube
row. Differentiating the received surface density itself would produce the
tensor above, not another acceleration to add to the Master Equation.

The live pure scalar action result is stronger than this scaling comparison.
Receiver variation of
$\delta_\eta(g)/r$ also differentiates the causal selector and leaves an
interior derivative-of-constraint residual. The characteristic-tail identity
removes that residual only for its declared receiver-coordinate kernel. MEC-001
shows that the same candidate still needs a finite self-diagonal prescription
and complete receiver-plus-transmitter variation.

Plainly: a correct local gradient identity is not enough to establish an
action. The transmitter occurrence, endpoint terms, retained history, and self
sector must all belong to one finite functional.

## Partner Root, Same-History Root, And Diagonal Boundary

For $i\ne j$, the boxed receiver gradient is complete on the declared regular
root chart. It contains no receiver velocity because reception time is fixed.
Receiver velocity enters only when differentiating along the receiver history,
where $ds/dT=D_r/D$.

For $i=j$ and a positive-delay root $s<T$, the same boxed expression is valid
as an instantaneous receiver-coordinate derivative if:

1. the retained past point $\mathbf X_i(s)$ is held fixed during the
   instantaneous receiver perturbation;
2. the root is isolated and remains on the same branch;
3. $r\ge r_{\min}>0$ and $|D|\ge D_{\min}>0$;
4. the declared self-pair convention admits the root; and
5. the perturbation does not cross a core, fold, memory, or diagonal boundary.

Plainly: a past point on the same history can act as the fixed transmitter
record for this local derivative. That does not make the present and past
points independent in a variation of the entire history.

The general parameter formula, not the receiver-only specialization, is
required when a perturbation changes both $\mathbf X_i(T)$ and
$\mathbf X_i(s)$. The full same-history functional derivative also collects
every occurrence of the varied point in receiver and transmitter roles. That
is the MEC-001 receiver-plus-transmitter problem, not a missing term in the
instantaneous acceleration.

Plainly: the local Jacobian asks what happens if the current receiver point is
moved while its stored past is frozen. A whole-history variation moves the
curve itself and therefore has additional past and future incidences.

The regular formula has the explicit bound

$$
\|\mathbf M\|
\le
1+\frac{V_{\max}}{D_{\min}},
\qquad
\|\mathbf N\|
\le
\frac{1+V_{\max}/D_{\min}}{r_{\min}},
$$

$$
\|\mathbf d\|
\le
V_{\max}\|\mathbf N\|
+
\frac{A_{\max}}{D_{\min}},
\qquad
\|\mathbf h\|
\le
\frac{c_f}{D_{\min}},
$$

and therefore

$$
\left\|
\nabla_{\mathbf x}\mathbf A_{ij}
\right\|
\le
\frac{|C_{ij}|c_f}{r_{\min}^2D_{\min}}
\left[
\|\mathbf N\|
+
\frac{2\|\mathbf h\|}{r_{\min}}
+
\frac{\|\mathbf d\|}{D_{\min}}
\right].
$$

Plainly: positive separation and transmitter-factor floors make the regular
gradient finite. Removing either floor removes this guarantee.

An explicit same-history family proves that the missing uniform near-diagonal
bound is not merely an artifact of the estimate. Set $c_f=1$ and

$$
\mathbf X(t)
=
\left(
t+\frac{a}{2}t^2
\right)\widehat{\mathbf e}_1,
\qquad
a>0.
$$

For reception time $T=\tau>0$, the nontrivial root $s=-\tau$ satisfies

$$
r=2\tau,
\qquad
D=a\tau,
\qquad
\|\mathbf A(T;s)\|
=
\frac{|C|}{4a\tau^3}.
$$

On this one-dimensional root, the longitudinal receiver derivative is

$$
\widehat{\mathbf e}_1^{\mathsf T}
\left(
\nabla_{\mathbf x}\mathbf A
\right)
\widehat{\mathbf e}_1
=
-\frac{C}{2a^2\tau^5},
$$

while each transverse diagonal component has magnitude

$$
\frac{|C|}{8a\tau^4}.
$$

Plainly: every $\tau>0$ row is a positive-delay simple root, but the root
approaches the trivial diagonal and transmitter-factor boundary as
$\tau\to0^+$. The acceleration and its receiver gradient diverge with explicit
powers, so no uniform self-inclusive continuation follows from the regular
formula.

At the trivial self diagonal, $r=0$ and $\mathbf n$ is undefined. At a fold,
$D=0$ and the implicit root derivative is undefined. At a coincident
same-transmitter birth, the two failures can occur together. As a
positive-delay self root approaches the diagonal, the displayed bound diverges
at least through inverse powers of $r_{\min}$ and may also diverge through
$D_{\min}$. No undeclared limiting value is assigned.

Plainly: the regular root formula is not a diagonal prescription. A fixed core,
diagonal exclusion, or separately derived near-origin wake rule must be chosen
before a self-inclusive gradient can be called complete.

## Minimal Symmetric Two-Body Protocol

Set $c_f=1$. Use opposite polarities and mirror histories

$$
\mathbf X_1(t)=-\mathbf z(t),
\qquad
\mathbf X_2(t)=+\mathbf z(t),
$$

with

$$
\mathbf z(t)
=
\left(
1-0.2t,\,
0.15t+0.025t^2,\,
0
\right).
$$

At reception time $T=0$, isolate the unique partner root in the predeclared
bracket $s\in[-6,0)$ for each ordered pair. Use
$C_{12}=C_{21}=-1$ for the normalized diagnostic row.

Plainly: the histories are mirror images, but the transmitter is neither
static nor collinear with the arriving direction. The row therefore exercises
root-time motion, direction change, the transmitter-factor derivative, and
the transmitter-acceleration term.

For each ordered root:

1. solve $g(0,s)=0$ with an independently bracketed scalar root solver;
2. evaluate the boxed analytic tensor without using an EOM solver sensitivity
   output;
3. perturb one receiver coordinate at a time by
   $\epsilon\in\{10^{-2},3\cdot10^{-3},10^{-3},3\cdot10^{-4},
   10^{-4},3\cdot10^{-5},10^{-5}\}$;
4. re-isolate the same root after each perturbation;
5. compare the analytic tensor with the centered finite difference of the
   canonical acceleration row;
6. require second-order convergence before roundoff dominates;
7. require
   $\mathbf A_{12}+\mathbf A_{21}=\mathbf0$ and
   $\nabla\mathbf A_{12}=\nabla\mathbf A_{21}$ under the mirror map; and
8. run negative controls with a bracket containing a second root, $D=0$, or
   $r=0$, each of which must return `Not advanced`.

Plainly: the test differentiates the actual regular-root operator after
re-solving the delay equation. It does not compare against a scalar surrogate,
reuse the analytic root derivative inside the root solver, or assign a finite
answer at a singular row.

### Executed diagnostic

The declared partner root was measured as

$$
s=-2.511960891719265,
\qquad
r=2.5119608917192644,
\qquad
D=0.7986339777277864.
$$

For the $1\leftarrow2$ row,

$$
\mathbf n
=
(-0.9961907395107324,\,
0.08720097770701839,\,
0),
$$

$$
\mathbf A_{12}
=
(0.1976828390888288,\,
-0.0173040524878914,\,
0),
$$

and the derived tensor was

$$
\nabla\mathbf A_{12}
=
\begin{pmatrix}
0.19718509053877792 & -0.023496052870187592 & 0\\
-0.023496052870187596 & -0.07700030564486532 & 0\\
0 & 0 & -0.07899754514884247
\end{pmatrix}.
$$

Plainly: these are measured values for one prescribed diagnostic, not a
retained branch or solver-acceptance result.

The maximum absolute centered-difference error across the tensor was

| $\epsilon$ | Maximum absolute error |
| ---: | ---: |
| $10^{-2}$ | $9.858953\times10^{-6}$ |
| $3\times10^{-3}$ | $8.872755\times10^{-7}$ |
| $10^{-3}$ | $9.858588\times10^{-8}$ |
| $3\times10^{-4}$ | $8.872782\times10^{-9}$ |
| $10^{-4}$ | $9.856654\times10^{-10}$ |
| $3\times10^{-5}$ | $8.638476\times10^{-11}$ |
| $10^{-5}$ | $1.144465\times10^{-11}$ |

The mirror acceleration sum and mirror tensor difference were both zero at the
reported arithmetic precision.

Plainly: the error falls quadratically until floating-point roundoff becomes
visible. This supports the hand derivative on the prescribed row, but the
calculation was authored within this task and is not the separately authored
acceptance verifier required below.

## Live Implementation Correspondence

The EOM solver path in
[`DelayedRootSensitivity.cpp`](../../../src/eom/src/DelayedRootSensitivity.cpp)
computes the parameter derivative of emission time and propagates it into the
delayed displacement. The path in
[`SharpAccelerationSensitivity.cpp`](../../../src/eom/src/SharpAccelerationSensitivity.cpp)
then differentiates the direction, transmitter factor, absolute acceleration
weight, and inverse-square vector. Its generic parameter equations match the
second boxed form above.

The existing independent Decimal test checks one one-dimensional sharp-root
sensitivity coefficient and rejects a transmitter-factor interval containing
zero. It does not independently verify the full three-dimensional
receiver-coordinate tensor, a positive-delay same-history row, a diagonal
negative control, or the mathematical rule separately from the implementation.

Plainly: the live code contains all regular chain-rule pieces, which refutes
the claim that it evaluates only a bare scalar distance law. Code agreement
does not by itself close MEC-006.

## Acceptance And Falsifiers

MEC-006 advances only when a separately authored verifier:

1. derives or directly differentiates the canonical one-root operator without
   importing the EOM solver sensitivity implementation;
2. accepts the static-transmitter tensor;
3. accepts the three-dimensional mirror-history protocol over an
   independently chosen perturbation ladder;
4. checks root identity and inactive gaps after every perturbation;
5. checks a positive-delay same-history row under a frozen, predeclared
   self-pair convention;
6. returns `Not advanced` for the trivial diagonal, a fold, and a
   coincident same-transmitter birth; and
7. distinguishes the fixed-reception spatial gradient from receiver-time
   playback and from complete whole-history variation.

The derivation is falsified if any accepted regular control shows that the
boxed tensor omits a root-time, direction, inverse-square, transmitter-factor,
or delayed-transmitter-acceleration term. The universal self-compatible claim
is falsified by any admitted approach to the diagonal for which the proposed
gradient lacks a uniform bound or depends on an undeclared regulator path.

Plainly: a verifier can confirm the regular tensor while still rejecting
self-inclusive closure. Both results must be reported separately.

## Dependency And Conclusion

The exact conclusion is:

- **Regular partner-root receiver gradient:** `DERIVED`, awaiting independent
  three-dimensional verification.
- **Positive-delay same-history instantaneous receiver gradient:**
  `CONDITIONAL`, valid only under a frozen self convention and positive
  separation and transmitter-factor floors.
- **Trivial diagonal, fold, and coincident same-transmitter gradient:**
  `BLOCKED`; the simple-root expression does not apply.
- **Complete self-compatible receiver/whole-history gradient:**
  `INCOMPLETE`; no declared core or diagonal rule closes it.
- **Pure scalar $1/r$ or $1/r^2$ replacement:** `REFUTED` as a complete route
  under the distinctions above.
- **MEC-006 overall:** `INCOMPLETE`.

MEC-006 sharpens MEC-001 rather than replacing it. MEC-001 owns the complete
receiver-plus-transmitter variation and the finite self-diagonal definition of
the characteristic-tail candidate. MEC-006 owns the fixed-reception spatial
sensitivity of the canonical acceleration row and its self-root admissibility
boundary.

MEC-006 also sharpens MEC-005 rather than replacing it. MEC-005 owns root
enumeration, multiplicity, provenance, and boundary attribution. MEC-006 owns
the derivative of each admitted regular acceleration row. MEC-005's two-body
conservation interpretation remains gated until MEC-006 has an independently
accepted self-compatible disposition and the separately required action or
causal-wake accounts close on the same encounter record.

Plainly: the regular mathematical derivative is now explicit, so an alleged
missing partner-root gradient can be checked term by term. The unresolved
problem is narrower and harder: define and verify the self-inclusive
near-diagonal object without silently changing the Master Equation or filling
an account from a residual.
