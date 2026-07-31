# Receiver Wake-Gradient Closure Proof Design

## Status

- Kind: `priority`
- Queue item: `MEC-006`
- Priority object: `receiver_wake_gradient_closure`
- Claim level: `priority-only derivation and proof design`
- Workstream: [master-equation-closure](priorities.md)
- Related queue items:
  [MEC-001 characteristic-tail action adjudication](work-queue.md#mec-001--characteristic-tail-action-adjudication),
  [MEC-005 pairwise causal-root ledger closure](pairwise-causal-root-ledger-closure.md),
  and
  [MEC-007 mirror close-approach causal-root boundary](mirror-close-approach-causal-root-boundary.md)
- Routed research input:
  [wake reception, transfer, and maturity](../../research-office/research-history/review-packets/terence-tao-wake-reception-transfer-and-maturity-2026-07-28.md)
  invokes MEC-006 only when a reception candidate actually consumes a
  receiver/self acceleration-gradient row; it is not a blanket gate on
  allocation research.
- External review evidence: operator-supplied independent mathematical audit
  of the regular fixed-reception Jacobian and singular-boundary extension
  problem, received 2026-07-29. No public source identity or durable external
  artifact was supplied.
- Finite-width review input: operator-supplied mathematical review of
  constant-time emission and causal-defect mollification, received 2026-07-29.
  Its nonuniqueness argument is incorporated below with corrected
  regular-domain and coincident-boundary scope.
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
nonzero transmitter factor. The external audit independently rederived that
open-domain tensor. The separately structured numerical verifier
[`verify-receiver-wake-gradient.mjs`](../../../scripts/equation-mapping/verify-receiver-wake-gradient.mjs)
also accepts static, constant-velocity, and uniform-circular three-dimensional
controls without importing the analytic tensor scaffold or the EOM solver
sensitivity implementation.

The same instantaneous receiver formula applies to one positive-delay
same-history root only when the past transmitter point is held fixed and the
root has certified separation and transmitter-factor floors. It does not
define the trivial self diagonal, a fold, a coincident same-transmitter birth,
or the full functional derivative in which current and past points belong to
one varied history. Without a predeclared core or diagonal rule, no uniform
receiver/self gradient exists for the exhibited positive-delay family as it
approaches the diagonal. The external audit also proves that the open-domain
mathematics does not select a unique fold, coincident-birth, or self-diagonal
boundary extension.

Plainly: the ordinary partner-root derivative can be written completely. It
includes the fact that moving the receiver changes which past emission time is
selected. Independent analytic and numerical checks now support that regular
result. They do not repair the unresolved self diagonal or turn a scalar wake
picture into an accepted action.

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
- closure of MEC-001, MEC-005, or MEC-007.

The stationary mirror first-boundary theorem, complete pre-boundary root and
singularity ledger, same-event root-admission question, and unchanged
sharp-law post-threshold obstruction are owned separately by
[MEC-007](mirror-close-approach-causal-root-boundary.md). They are not
MEC-006 verification or completion evidence.

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

## External Audit Scope Map

The external audit uses the dimensionless transmitter factor

$$
J_t
\equiv
1-\frac{\mathbf n\cdot\mathbf v}{c_f}
=
\frac{D}{c_f}.
$$

Its implicit receiver-position derivative is

$$
\delta s
=
-\frac{\mathbf n\cdot\delta\mathbf x}{c_fJ_t}
=
-\frac{\mathbf n\cdot\delta\mathbf x}{D},
$$

which is exactly the root-time derivative used below.

Plainly: the review and the live packet use differently scaled names for the
same signed simple-root denominator. Converting the notation makes their
root-time derivatives identical.

The audit allows a generalized $C^1$ source amplitude $B(s)$ multiplying the
regular row. Its product rule adds

$$
\left.
\delta\mathbf A
\right|_{B}
=
\frac{c_f}{r^2|D|}
\mathbf n\,B'(s)\,\delta s
$$

in the live speed-denominator convention, after any fixed normalization is
absorbed into $B$. The canonical Architrino row instead has
$B=C_{ij}=\kappa\sigma_{ij}|q_iq_j|$, constant on the retained history, so
$B'(s)=0$.

Plainly: the review checked a slightly more general amplitude than the live
operator needs. Its extra amplitude-derivative term vanishes in the canonical
specialization. This evidence does not introduce time-varying Architrino
polarity or a new source law.

The review's verified scope is:

- fixed reception time;
- one isolated simple partner root;
- $r>0$ and $|D|\ge D_{\min}>0$;
- frozen $C^2$ transmitter history;
- a $C^1$ generalized source amplitude, specialized here to constant
  $C_{ij}$; and
- fixed coupling sign and fixed $c_f$.

It does not verify receiver-time playback, complete history variation, a
positive-delay same-history rule, or any singular-boundary extension.

Plainly: the audit is independent evidence for the regular tensor only. Its
failure-regime analysis is evidence that more input is required at the
boundary, not evidence for one preferred input.

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

## Singular-Boundary Obstruction

An ordinary fold has the local normal form

$$
g(u,\lambda)=u^2-\lambda,
$$

with two simple roots $u_\pm=\pm\sqrt{\lambda}$ for $\lambda>0$. The signed
root factors have opposite signs, but the canonical acceleration weight uses
their absolute values. The two incident acceleration rows therefore reinforce
rather than cancel:

$$
\mathbf A_+ + \mathbf A_-
=
O\!\left(\lambda^{-1/2}\right),
\qquad
\frac{\partial}{\partial\lambda}
\left(\mathbf A_+ + \mathbf A_-\right)
=
O\!\left(\lambda^{-3/2}\right).
$$

These powers belong to the ordinary-fold normal form only. They are not a
claim about every multiple-root geometry.

Plainly: taking the absolute root factor makes the two sides of an ordinary
fold add. The acceleration row and its transverse derivative diverge as the
roots merge.

The open-domain expression does not determine a unique distributional
extension across the fold. If one extension is admitted, adding a distribution
supported on the fold boundary leaves every open-domain value unchanged.
Choosing its coefficient, derivative order, or reference scale is an
additional boundary assumption.

For a coincident birth with $r\to0$ while $|D|$ remains bounded away from zero,
a symmetric distributional prescription can define a distributional
gradient, but it does not supply a pointwise acceleration-gradient value for
evolution. Non-symmetric regularizations can change the finite boundary part.
The regular tensor therefore cannot select among those prescriptions.

For the explicit same-history family above, the acceleration diverges as
$\tau^{-3}$, its transverse receiver gradient as $\tau^{-4}$, and its
longitudinal receiver gradient as $\tau^{-5}$. Those exponents are proved only
for that exhibited family. Their nonintegrable behavior also prevents that
family from acquiring a distributional time-boundary value without a
subtraction, core, or other new rule.

Plainly: distribution theory can describe some singular rows, but it does not
automatically produce the pointwise number required by an evolution update.
In the exhibited self family, even the direct distributional route needs an
extra assumption.

The external audit therefore verifies the regular tensor and proves a
boundary-extension obstruction, not a boundary prescription. In the excluded
region the operational disposition remains `Not advanced`: it must return an
unresolved boundary row, never zero, a selected branch, or an undeclared finite
part.

## Continuous Emission Does Not Select A Finite Width

Constant emission measure per absolute transmitter time can be written

$$
d\mu=\rho_s\,ds.
$$

On a source-history segment with nonzero speed,
$d\ell=\|\mathbf v(s)\|\,ds$, the same measure has the path-length chart

$$
d\mu
=
\frac{\rho_s}{\|\mathbf v(s)\|}\,d\ell.
$$

Plainly: the inverse-speed density is the Jacobian of a coordinate change. It
does not multiply the time-chart measure a second time, and it introduces no
time or length scale. At a source turning point the path-length chart
degenerates while the absolute-time chart remains valid.

One candidate finite-width regulator class replaces the sharp causal
constraint by a normalized causal-defect profile. For
$\phi\in L^1(\mathbb R)$ with $\int\phi(u)\,du=1$, define

$$
\phi_w(u)
=
\frac{1}{w}\phi\!\left(\frac{u}{w}\right),
\qquad
w>0,
$$

and

$$
\mathbf A^{(w)}_{ij}(T)
=
C_{ij}c_f
\int
\phi_w\!\left(g(T,s)\right)
\frac{\mathbf n(T,s)}{r(T,s)^2}\,ds.
$$

Here $w$ has units of length because $g=r-c_f(T-s)$ does. A temporal profile
with width $\tau$ belongs to the same regulator class after a declared profile
change and $w=c_f\tau$.

Plainly: this formula describes a possible smearing of reception around the
causal surface. Constant-time emission does not choose the profile, its width,
its support, or its matching rule, so the formula is a regulator family rather
than a derived wake law.

On an isolated simple-root chart, use $u=g(T,s)$ as the integration
coordinate. The regulated row has the local form

$$
\mathbf A^{(w)}_{ij}
=
C_{ij}c_f
\int
\phi(z)\,\mathbf H(wz)\,dz,
\qquad
\mathbf H(0)
=
\frac{\mathbf n}{r^2|D|}.
$$

Therefore

$$
\lim_{w\to0^+}\mathbf A^{(w)}_{ij}
=
C_{ij}\frac{c_f}{r^2|D|}\mathbf n
$$

whenever the simple-root chart and a dominated-convergence bound hold. If
$\mathbf H$ is sufficiently smooth and the needed profile moments are finite,
the leading correction is generically $O(w)$; it is $O(w^2)$ for a centered
even profile.

Plainly: normalized profiles recover the sharp row in the zero-width limit.
At a fixed nonzero width they generally modify even a regular row because the
geometry and root factor vary across the profile support. Exact exterior
matching would require another declared construction; it does not follow from
compact support alone.

At an ordinary fold with local form
$g\approx\kappa_2(s-s_\ast)^2$, $\kappa_2>0$, the profile integral contains

$$
\int
\phi_w\!\left(\kappa_2\sigma^2\right)\,d\sigma
=
(w\kappa_2)^{-1/2}
\int\phi(x^2)\,dx.
$$

The coefficient depends on the profile. The independently executed
$[\lambda+a\epsilon^2]^{-1/2}$ comparison above already measures different
boundary coefficients for $a=1/4$ and $a=1$ despite their common sharp
open-domain limit.

Plainly: a fixed nonzero profile may soften the fold evaluation, but the
finite answer is not selected by the regular operator. The disagreement of
equally admissible regulators proves that open-domain recovery does not derive
a boundary value.

Causal-defect smearing also leaves the factor
$\mathbf n/r^2$ inside the integral. It therefore does not by itself define
the self diagonal or guarantee a finite coincident encounter or finite
impulse. Any such claim needs an additional spatial source profile,
near-origin rule, or derived wake-state transition and its own convergence
proof.

Plainly: smoothing the root collapse and smoothing the inverse-square
near-origin singularity are different mathematical operations. Success at a
fold cannot be reused as a self-diagonal prescription.

The dimensions of the regular row permit the candidate length
$|C_{ij}|/c_f^2$. Nothing in the supplied operator makes that amplitude scale
control the support of the causal kernel. Using
$w=\beta|C_{ij}|/c_f^2$ would add an amplitude-to-geometry coupling, leave the
dimensionless coefficient $\beta$ free, and still leave the profile free.

Plainly: dimensional availability is not a derivation. Under the current
continuous-emission picture, the sharp zero-width constraint is selected and
every positive width introduces at least a scale and a profile as new
constitutive input.

## Boundary-Treatment Option Matrix

No option in this table is selected or accepted. The table records the new
assumption each option would introduce and the obligations it would inherit.

| Candidate treatment | New assumption | Regular-domain compatibility | Pointwise evolution value | Regulator dependence and verification obligation | MEC-005 provenance consequence | MEC-004 signed-account consequence | Acceptance condition and falsifier |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Unresolved boundary quarantine | The declared operator domain excludes folds, coincident births, and the self diagonal. | Exact on every admitted regular root. | No boundary value. | No regulator; every excluded evaluation must return `Not advanced`. | Preserve the unresolved boundary event and all incident root identities; do not record a zero row. | No signed-account row can be claimed across the unresolved event. | Accepted only as the current operational restriction, not closure; falsified by silent zeroing, branch deletion, or finite-part substitution. |
| Fixed spatial core | A core radius, interior acceleration profile, and matching rule are primitive additions. | Compatible only outside the declared core and only if the exterior row is unchanged. | Potentially, if the interior profile is complete. | Depends on radius, shape, and matching order; verify continuity class, scale sensitivity, and the zero-core limit without fitting to the target row. | Core entry, interior update, and exit need unique owners; incident regular roots remain visible. | Requires separately derived core-account maps on the same update; a residual cannot supply them. | Accept only with a derived or explicitly authorized profile and independent checks; falsified by regulator-shape dependence outside the declared core or duplicate event ownership. |
| Fold-factor smoothing | A scale and profile replace $|D|^{-1}$ near $D=0$. | Modifies a neighborhood of the fold unless a compact matching construction is declared. | Finite for a fixed nonzero scale. | Profile and scale dependent; compare at least two inequivalent regulators and verify any claimed limit. | Both incident root cells remain recorded and one fold-boundary row owns the smoothing transition. | Requires a new signed fold-account row; smoothing alone derives no account value. | Accept only if the scale/profile is independently fixed and the result is regulator invariant at the claimed grade; falsified by the demonstrated regulator disagreement. |
| Finite causal-defect width | A normalized profile, positive width, support convention, and matching rule replace the sharp causal constraint. | Recovers the canonical row as $w\to0^+$ on a controlled simple-root chart; generally modifies regular rows at fixed $w$. | May soften a fold for fixed $w$ but does not by itself define $r=0$ or guarantee a finite encounter impulse. | Scale, profile, and profile moments are free; verify convergence order, fold coefficients, coincident behavior, and any claimed impulse across inequivalent profiles and scales. | Every incident sharp root remains identifiable outside the support; an overlapping support interval and boundary transition require one declared owner. | A regulated acceleration or finite impulse supplies no signed account map. | Remains an unselected regulator unless a separate wake-state derivation fixes its scale and profile; falsified as derived by two admissible profiles with the same sharp limit and different boundary values. |
| Self delay or separation floor | A minimum positive delay or distance and a transition rule are primitive additions. | Exact above the floor; undefined or modified below it. | Only if the below-floor transition is specified. | Floor and transition dependent; verify approach from every admitted side and event crossing. | A floor-crossing row must own the transition; retained roots cannot simply disappear from the ledger. | The omitted near-diagonal segment remains unaccounted unless its signed map is separately derived. | Accept only with an explicit transition and independent crossing tests; falsified by treating excluded self rows as zero. |
| Branch selection or signed cancellation | A branch priority, deletion rule, or replacement of $|D|^{-1}$ by a signed factor is introduced. | Incompatible with the canonical regular operator when both simple roots are admitted. | May produce a one-sided value, but for a changed operator. | Selection dependent; verify invariance under root relabeling and perturbations through the fold. | Deletes or reweights an admitted root and therefore breaks exhaustive provenance unless the operator itself is explicitly changed. | Any resulting cancellation is not a derived MEC-004 account. | Rejected under the unchanged canonical operator; falsified by any admitted simple root whose contribution is discarded or sign-changed. |
| Finite-impulse fold event map | A boundary event map replaces the pointwise singular interval. | Can leave regular rows unchanged away from the event. | No pointwise Jacobian at the event; only an integrated update if defined. | Event-window and limiting-path dependent unless a unique map is derived; verify convergence from both fold sides. | The two incident root branches attach once to one fold-event owner; the event must not be copied into each root row. | Requires a separately derived signed event-account map on exactly the same event. | Accept only with a unique, regulator-independent event map and independent integration check; falsified by window or path dependence. |
| Symmetric distributional finite part | A symmetry class, test-function space, and distributional prescription are declared. | Agrees with the regular expression off the singular support. | No pointwise evolution value. | Symmetry dependent; compare non-symmetric regulators and specify all boundary-supported terms. | The distributional boundary object needs its own provenance row while incident regular roots remain distinct. | A distributional acceleration gradient does not by itself derive a signed account row. | Insufficient for pointwise evolution; additionally falsified for the exhibited self family without a further subtraction or core. |
| Boundary-supported counterterm | A coefficient, support rule, derivative order, and reference scale are added. | Can agree exactly on the open domain. | Only if embedded in a separately declared update rule. | Coefficient and scale are free in the current mathematics; verify them against an independent derivation, not a post-fit residual. | Counterterm provenance must be distinct from causal-root provenance and attributed once. | A fitted counterterm cannot be booked as a derived signed account. | Accept only when coefficient and scale are independently fixed; falsified by equally regular alternatives with different finite boundary rows. |
| Remove all self roots | Same-history roots are excluded by definition. | Changes the live self-hit inclusion rule even where a self root is regular. | Defines absence, not the missing boundary value. | No numerical regulator, but requires a new operator-level exclusion proof and regression over all self rows. | Omits the self-root bundle rather than accounting for it. | Cannot establish a closed account for an encounter class removed by declaration. | Rejected without explicit operator revision; falsified by any admitted positive-delay self root under the live rule. |
| Derived wake-state or core transition | A new state and update law is derived that reduces to the regular operator outside the boundary region. | Potentially compatible if exact regular reduction is proved. | Potentially, if the update is complete. | Must derive its scale and be regulator invariant at the claimed grade; requires an independent oracle and boundary-crossing tests. | Emission, reception, root transfer, and boundary-state ownership must be unique and exhaustive. | MEC-004 maps must be separately derived on the identical state update and cannot be inferred from closure residuals. | The only listed research class capable in principle of meeting all requirements; it remains unselected and falsifies if regular reduction, unique provenance, or regulator independence fails. |

Plainly: the current mathematics selects none of these treatments. Boundary
quarantine is the only authorized operational behavior, but it records an
unresolved row rather than closing it. A derived wake-state or core transition
could in principle close the pointwise update, but it still needs a separate
derivation and independent evidence.

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

## Independently Structured Three-Dimensional Verification

The standalone verifier
[`verify-receiver-wake-gradient.mjs`](../../../scripts/equation-mapping/verify-receiver-wake-gradient.mjs)
does not import the analytic Jacobian scaffold, EOM solver sensitivities, or
the diagnostic implementation above. It evaluates the canonical acceleration
row directly, re-solves the root after every receiver perturbation, and uses
centered differences with Richardson extrapolation. The circular-history
control also uses a separately coded five-point stencil.

The executed controls were:

| Control | Independent feature | Maximum final tensor error |
| --- | --- | ---: |
| Static transmitter | Exact fixed-root geometry | $1.76\times10^{-12}$ |
| Constant-velocity transmitter, closed root | Closed-form quadratic root | $1.46\times10^{-12}$ |
| Constant-velocity transmitter, bracketed root | Independently bracketed scalar solve | $9.78\times10^{-12}$ |
| Uniform circular transmitter | Non-affine three-dimensional history with delayed transmitter acceleration | $1.77\times10^{-11}$ |

The closed-form and bracketed constant-velocity roots agreed within
$1.4\times10^{-14}$. For the circular control, the maximum difference between
the extrapolated centered-difference tensor and the five-point tensor was
$2.96\times10^{-13}$.

The same verifier evaluated the ordinary fold model with two members of the
regularizer family
$[\lambda+a\epsilon^2]^{-1/2}$, using $a=1/4$ and $a=1$. At the boundary,
they gave acceleration-row coefficients in ratio $2$ and transverse derivative
coefficients in ratio $8$, although both reproduce the same sharp open-domain
expression at every fixed $\lambda>0$ as $\epsilon\to0$. The verifier
therefore reports
`boundary_prescription_not_selected`.

Plainly: three different transmitter histories and two independent numerical
stencils agree with the regular tensor after every root is solved again. Two
equally open-domain-compatible fold regulators disagree at the boundary, so a
numerical limit does not choose a prescription.

This is independently structured numerical evidence, not a second analytic
proof. Its target tensors are frozen from the documented analytic formula, but
its comparison path does not implement that formula. The operator-supplied
external audit supplies the independent analytic derivation. Together they
verify the fixed-reception regular tensor on the declared open domain; neither
establishes a self-diagonal, fold, or coincident-birth evolution value.

The executed commands were:

```text
node scripts/equation-mapping/verify-receiver-wake-gradient.mjs
node --test tests/receiver-wake-gradient-verifier.test.mjs
```

Both completed successfully. The measured claim is limited to the declared
regular controls and the demonstrated fold-regulator disagreement.

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

The new standalone verifier is independent of this EOM solver code path. Its
regular controls support the same tensor without reusing the implementation,
while its fold comparison deliberately declines to produce a boundary value.

Plainly: the live code contains all regular chain-rule pieces, and the new
standalone comparison checks them without importing that code. This closes the
regular numerical sub-obligation but does not close MEC-006's boundary
obligation or grant EOM solver acceptance.

## Acceptance And Falsifiers

The regular fixed-reception partner-root sub-obligation is independently
verified at evidence-only authority by the external analytic audit and the
standalone numerical verifier. It covers:

1. the static-transmitter tensor;
2. a constant-velocity closed-form root and an independently bracketed root;
3. a non-affine uniform-circular three-dimensional history;
4. root re-resolution after every receiver perturbation;
5. the distinction between fixed-reception spatial differentiation,
   receiver-time playback, and whole-history variation; and
6. an explicit fold-regulator disagreement.

Overall MEC-006 completion still requires an explicitly authorized boundary
candidate that:

1. defines whether its output is a pointwise update, an event map, or only a
   distribution;
2. preserves the canonical regular acceleration operator on its declared open
   domain;
3. records all incident root and boundary provenance exactly once under
   MEC-005;
4. supplies independently derived MEC-004 signed-account maps if any account
   claim is later attempted;
5. passes its option-specific regulator, path, and boundary-crossing tests;
6. rejects or explains the exhibited positive-delay self family; and
7. returns `Not advanced` outside its proved domain.

A finite-width candidate must additionally:

1. distinguish causal-defect smoothing from any spatial near-origin profile;
2. recover the sharp row and verified receiver gradient on a predeclared
   zero-width ladder;
3. measure rather than suppress dependence on at least two inequivalent
   profiles and two widths;
4. demonstrate any claimed finite encounter impulse by converged quadrature;
5. preserve both incident root identities and assign an overlapping support
   interval exactly once under MEC-005; and
6. state what independent wake-state law fixes both the scale and profile
   before calling either derived.

The derivation is falsified if any accepted regular control shows that the
boxed tensor omits a root-time, direction, inverse-square, transmitter-factor,
or delayed-transmitter-acceleration term. The universal self-compatible claim
is falsified by any admitted approach to the diagonal for which the proposed
gradient lacks a uniform bound or depends on an undeclared regulator path.

Plainly: the regular tensor has now passed independent analytic and numerical
review. MEC-006 remains incomplete because every boundary value in the option
matrix either changes the operator, depends on an unchosen scale or
prescription, or fails to define a pointwise update.

## Dependency And Conclusion

The exact conclusion is:

- **Regular partner-root receiver gradient:** `INDEPENDENTLY VERIFIED` on the
  declared fixed-reception open domain, at evidence-only authority.
- **Positive-delay same-history instantaneous receiver gradient:**
  `CONDITIONAL`, valid only under a frozen self convention and positive
  separation and transmitter-factor floors.
- **Trivial diagonal, fold, and coincident same-transmitter gradient:**
  `BLOCKED`; the simple-root expression does not apply and the mathematics
  does not select a unique extension.
- **Complete self-compatible receiver/whole-history gradient:**
  `INCOMPLETE`; no boundary option is selected, derived, or accepted.
- **Finite wake width from constant-time continuous emission:** `NOT DERIVED`;
  causal-defect mollification adds a scale and profile, and it does not by
  itself close the coincident boundary.
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
the derivative of each admitted regular acceleration row. Any future boundary
derivative rule must retain both incident root identities, give the derivative
boundary transition a single owner, and prohibit duplicate booking as both a
root row and a boundary row.

MEC-007 separately owns the mirror close-approach event geometry, incoming
first-boundary theorems, same-event measure test, and unchanged-law
post-threshold obstruction. MEC-006 applies to that program only if a
calculation consumes a receiver/self acceleration-gradient row.

MEC-004 remains separate. No boundary acceleration-gradient prescription
supplies a signed account value. If a future boundary update is accepted,
MEC-004 must derive its signed maps on that identical update rather than
constructing them from a residual. MEC-005's two-body conservation
interpretation remains gated on MEC-007's unresolved encounter boundary, on an
accepted MEC-006 self-compatible derivative disposition wherever such rows are
consumed, and on the separately required account closure on the same encounter
record.

Plainly: the regular mathematical derivative is now independently checked
term by term. The unresolved problem is confined to singular-boundary
semantics. Choosing among the listed options would add a new assumption, so
this evidence-only pass does not make that choice.
