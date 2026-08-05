# Field-Speed Ceiling: Delay-Integration Stability and Convergence Review

**Review identifier:** FSC-001-GD1-2026-08-02.
**Reviewer lens:** [Germund Dahlquist — Delay-Integration Stability and Convergence Analyst](../../research-office/specialists/roles-geometry-dynamics/germund-dahlquist.md).
**Review target:** [mathematics-geometry-dynamical-system.md](mathematics-geometry-dynamical-system.md), Sections 1–11 only.
**Review date:** 2026-08-02.
**Scope:** Sections 1–11 only. Sections 12 and later are out of scope and were not reviewed.
**Claim level:** review findings only — nothing in this file adopts, advances, or ratifies any ceiling law, event law, or numerical scheme. All numerical spot-checks below are diagnostics, not evidence.

This review reads the packet as a numerical analyst must read it: as the
specification of a target problem (a projected state-dependent-delay evolution
with causal-root input) plus one constructive scheme (the catching-up
projected-increment scheme of Section 7), and asks whether the stated
mathematics is consistent, what a discrete instantiation silently needs, what
its convergence order and stability actually are, and where root-finding and
error propagation become ill-conditioned near the ceiling boundary and near
$D_t\to0$.

Plainly: I checked the document the way an integrator builder would — does the
math hold up, what did it forget to say a computer would need, how fast does
its one proposed algorithm converge, and where do the numbers become
untrustworthy.

## 1. Verdict summary

The regular-chart mathematics of Sections 4–11 is, within my lens, in very
good shape. I re-derived or numerically reproduced every load-bearing formula
I tested and found no invalid derivation in scope: the minimal-selection
theorem, the contraction estimate, the catching-up bounds, the total-variation
transfer identity, the fold weights, the root monotonicity and rigidity
arguments, the root-stability constant $2/d_{\min}$, and the full circular
family of Section 11 (general-$\lambda$ root, $D_t=D_r=c_f(1+\lambda\sin\xi_\lambda)$,
ledger components, $R_{\ast,\lambda}$ monotonicity, Dottie constants, helix
negative result) all check out. The single ERROR finding concerns an
operationally unsatisfiable falsifier statement, not a derivation.

The main deficits in my lens are: no convergence order is stated for the
catching-up scheme; the compactness passage silently uses uniform
integrability; there is no quadrature or roundoff perturbation clause; the
regular-chart hypotheses lack an explicit range/delay floor (the vanishing-delay
hazard); root-stability is position-only and velocity-history discontinuities
(breaking points) are not propagated into a scheme discipline; and first-contact
event conditioning is unaddressed. Findings GD-12 through GD-16 contribute
concrete lemmas, an order-one convergence theorem target with proof sketch, a
breaking-point cascade lemma, and a stiffness-removing reparameterization, all
inside the packet's own regular-chart boundary.

Plainly: the derivations pass inspection. What is missing is the contract a
computer program would need — how accurate, how stable, which events to track,
and which tolerances can be certified — and this review supplies the first
draft of that contract plus several provable upgrades.

## 2. Verified computations (diagnostics, not evidence)

Two computation sets were rerun independently of the document's text, in
normalized wake-speed units $c_f=1$. The shared `$AAA_VENV` Python environment
is not mounted in this review sandbox; the system `python3` was used instead.
Both sets are diagnostics: they can refute a formula but do not by themselves
establish any theorem.

**Diagnostic set 1 — Section 11 circular charts, from raw geometry.** For the
equal-speed antipodal circular chart I solved the causal-root equation
$\|\mathbf X_1(T)-\mathbf X_2(S)\|=T-S$ directly from the prescribed paths by
bisection, with no use of the document's reduced equations. Results: half-delay
angle $=0.7390851332151607$ (matches $\xi_0$ and $\cos\xi=\xi$),
$\theta=1.4781702664303213$ rad $=84.69291766818584^\circ$,
$D_t=D_r=1.6736120291832148=1+\sin\xi_0$ from geometry, radial and tangential
row components matching $a_r,a_\theta$ to $10^{-16}$, and the radial balance
$|a_r(R_\ast)|=1/R_\ast$ with $R_\ast/K=0.20211137351526115$. For
$\lambda=0.6$ the geometric root reproduced $\xi_\lambda=\lambda\cos\xi_\lambda$
and $D_t=D_r=1+\lambda\sin\xi_\lambda$ exactly; $R_{\ast,\lambda}$ is strictly
decreasing on a $\lambda$-grid of $(0,1]$ with the stated endpoint. For the
translating helix with $u=0.5$, the geometric root gave the Dottie angle again,
$D_t=D_r=v^2(1+\sin D)=1.255209021887411$, raw parallel component with the sign
of $v^2\sin D-u^2$, and effective axial component $-0.1716<0$, confirming the
negative ansatz result.

**Diagnostic set 2 — Section 7 catching-up scheme.** (i) Against a closed-form
one-dimensional reference (ball $[-1,1]$, input $2\cos T$, exact saturating
solution assembled by hand — an independent reference, not a refinement
target), the exact-average catching-up scheme converged with error dominated by
the single step containing the boundary-exit event; the observed error
sequence is non-monotone in $h$ because it is governed by the offset between
the event time and the mesh, exactly the breaking-point behavior described in
GD-14. (ii) The per-step defect between one projected increment
$\Pi_{\mathcal B}(\mathbf V_0+\varepsilon\mathbf g)$ and the exact
constant-input constrained flow over the same step was measured for three
boundary configurations; the log-log slope tends to $2.0$ in all three
(mixed, transverse-dominant, and interior-to-crossing), supporting the
quadratic chord-versus-slide defect used in GD-13. (iii) A midpoint-quadrature
variant for $\mathbf F_k$ produced comparable errors, consistent with the
backward-error account in GD-4.

Plainly: I rebuilt the binary numbers straight from the circle geometry and got
the document's constants to the last digit, and I ran the projection algorithm
against a case whose exact answer I could write down by hand. The algorithm's
error comes almost entirely from steps that straddle a boundary event, and the
one-step projection error shrinks like the square of the step, which is what
the new convergence theorem below needs.

## 3. Findings

### 3.1 ERRORS

#### GD-1 (ERROR) — The order-of-operations falsifier is unsatisfiable at finite precision

Section 7 states:

> "The order is falsified by any implementation whose final response changes
> when the same complete ledger is reordered, repartitioned, or batched
> differently."

Taken literally, every floating-point implementation is falsified: binary
floating-point summation is not associative, so reordering an actual ledger
changes the final response at roundoff magnitude in essentially every
nontrivial case. As written, the operator-checkable falsifier condemns all
conforming implementations and therefore cannot serve its intended
discriminating role. This is an invalid step in the operational sense — the
statement quantifies over implementations but ignores the arithmetic those
implementations must use.

Correct replacement (either clause restores a discriminating falsifier):

> "The order is falsified by any implementation whose final response changes
> by more than its declared accumulation tolerance when the same complete
> ledger is reordered, repartitioned, or batched differently; an
> implementation claiming exact order-invariance must use an exactly
> associative accumulator (for example fixed-point superaccumulation or
> compensated summation with certified bound)."

Claim grade: derived (non-associativity of floating-point addition is a
theorem of the arithmetic standard). Falsifier for this finding: exhibit a
floating-point implementation of a nontrivial many-row ledger whose sum is
bit-identical under all permutations without an exact-accumulation technique;
none exists for general inputs.

Plainly: the document says "your code is wrong if reordering the list of
acceleration rows changes the answer." But ordinary computer addition always
changes the answer a tiny bit when you reorder it, so the test as written
fails every honest program. The fix is to allow a declared rounding tolerance
or demand a special exact-summation method.

### 3.2 GAPS

#### GD-2 (GAP) — The compactness passage in Section 7 silently uses uniform integrability and a reaction-measure bound

The frozen-ledger paragraph argues: interpolants are equi-absolutely
continuous, then "Compactness and passage to that inequality give a
subsequential solution." Two hypotheses are used without being stated. First,
passing to the limit in the discrete variational inequality needs weak $L^1$
convergence of the interpolant derivatives; $L^1$-boundedness alone does not
give weak $L^1$ compactness. What saves the argument is that the interpolant
derivative on each step is the local average of $\|\mathbf f\|$, so the family
is uniformly integrable and the Dunford–Pettis theorem applies. Second, the
discrete reactions $\mathbf n_k=(\mathbf V_k+\mathbf F_k-\mathbf V_{k+1})/\Delta_k$
must converge as measures; the needed uniform bound
$\sum_k\|\mathbf n_k\|\Delta_k\le\sum_k\|\mathbf F_k\|\le\|\mathbf f\|_{L^1}$
is true but nowhere recorded. Third, the limit identification requires that
the left-endpoint and right-endpoint piecewise interpolants share one uniform
limit, which equicontinuity supplies but the text does not say.

Related: the sentence "The normal cone of a closed convex set is maximal
monotone" invites the reader to cite off-the-shelf existence theory, but the
classical subdifferential theory is an $L^2$ theory; for $\mathbf f\in L^1$
the constructive catching-up argument (or the rate-independent play-operator
reparameterization, see GD-9) is the actual load-bearing existence proof and
should be labeled as such.

Suggested repair: one added paragraph stating (i) uniform integrability of the
interpolant derivatives via local averaging and Dunford–Pettis, (ii) the
displayed reaction-measure bound, and (iii) that the constructive scheme is
the existence proof for $L^1$ input. Claim grade for this finding: derived
(each missing step is standard once named). Falsifier: a proof of the
subsequential limit that uses only $L^1$-boundedness of derivatives without
uniform integrability.

Plainly: the convergence argument is right, but it quietly leans on two
standard facts — the discrete speeds cannot concentrate into spikes, and the
constraint reactions have bounded total size — that must be written down for
the proof to be checkable.

#### GD-3 (GAP) — No consistency order or convergence rate is declared for the catching-up scheme

Section 7 proves that the scheme converges but says nothing about how fast.
For a scheme intended to anchor any future numerical instantiation this is a
material omission: without a declared target order, refinement studies cannot
distinguish healthy convergence from order reduction, and no tolerance can be
certified from a step size. The role-level failure condition "step refinement
alone is treated as sufficient" becomes unfalsifiable when no order is on
record. GD-13 below contributes the missing statement as a proposed theorem
(order one for bounded-variation input, with a measured quadratic per-step
defect), and GD-14 explains why event-containing steps, not smooth steps,
control the realized error.

Claim grade: derived (the omission is checkable by reading Section 7).
Falsifier: a passage in Sections 1–11 stating a convergence order for the
scheme; none exists.

Plainly: "it converges" is not enough to build software against. You need
"it converges like $h$" — otherwise you cannot tell a working run from a
subtly broken one, and you cannot turn a step size into an error bar.

#### GD-4 (GAP) — The exact-integral increments $\mathbf F_k$ hide a quadrature and roundoff clause

The scheme is defined with $\mathbf F_k=\int_{T_k}^{T_{k+1}}\mathbf f\,dT$
evaluated exactly. A real instantiation evaluates $\mathbf f$ from causal-root
ledgers at finitely many points and quadratures the step integral; it also
commits roundoff. The document's own contraction estimate supplies the correct
backward-error hook, but it is never invoked for this purpose: if
$\tilde{\mathbf F}_k$ are the computed increments, the perturbation of the
discrete solution is bounded by
$\sum_k\|\mathbf F_k-\tilde{\mathbf F}_k\|$, by the same projection
nonexpansiveness that gives the discrete stability bound. A trustworthy
instantiation must therefore declare its per-step quadrature error budget and
show the sum is within tolerance; the midpoint-quadrature diagnostic in
Section 2 illustrates that a consistent quadrature does not degrade the
observed accuracy class.

Claim grade: derived (the perturbation bound follows from nonexpansiveness,
one line). Falsifier: a discrete perturbation of the increments whose effect
on the iterates exceeds the cumulative increment error; nonexpansiveness
forbids it.

Plainly: the algorithm is stated as if the step integrals were known exactly.
Real code approximates them. Fortunately the scheme is so stable that the
total damage is at most the sum of the small per-step integration errors —
but that budget has to be declared, not assumed.

#### GD-5 (GAP) — No explicit range/delay floor: the vanishing-delay hazard is unnamed

The regular-chart obligations in Section 5 include branch separation and the
transversality floor $|D_t|\ge d_{\min}$, but no positive lower bound on root
range $r$ (equivalently, on delay $\Delta=r/c_f$). Yet every numerical
statement in my lens needs one: the method-of-steps causality horizon — the
interval length over which the ledger input is fully determined by
already-computed history — equals the minimum active delay, and it collapses
to zero exactly on approach to coincidence, where $r\to0$. State-dependent
delay equations with vanishing delays are a known pathological class for
integrators: stepping becomes implicit in the current unknown, and no fixed
mesh is causally closed. The document's kernel bound also needs the same
floor: $\|\mathbf K\|\le Kc_f/r_{\min}^2$ is used implicitly in the
total-variation transfer conclusion ("positive range and $D_r$ floors").

Suggested repair: add "a declared range floor $r\ge r_{\min}>0$ on the chart,
equivalently a delay floor $\Delta\ge r_{\min}/c_f$" to the numbered
obligations of Section 5, and note that the floor is what makes explicit
method-of-steps stepping causal.

Claim grade: derived (the horizon-equals-minimum-delay statement is immediate
from positive delay). Falsifier: a causal explicit stepping construction on a
chart with $\inf r=0$ that never needs the current-step unknown; the delay
identity $\Delta=r/c_f$ forbids it.

Plainly: the ledger at time $T$ only uses the past, so you can integrate
forward in windows shorter than the shortest delay. Near coincidence the
shortest delay shrinks to zero, and the windows vanish with it. The document
should list "delays stay above a floor" as an explicit chart hypothesis,
because every numerical plan depends on it.

#### GD-6 (GAP) — Root stability is position-only; velocity atoms break ledger continuity

The Section 9 root-stability lemma bounds root motion by position sup-norm:
$|S'-S|\le(2/d_{\min})\|\mathfrak h'-\mathfrak h\|_\infty$. The lemma is
correct (I re-derived the constant 2), but a ledger row also evaluates the
transmitter velocity at the root time, through $D_t$ and through the row
direction. Two consequences are unstated. First, the mean-value step needs the
$D_t\ge d_{\min}$ floor on the whole emission-time interval between $S$ and
$S'$ on the matched branch, with the a.e.-derivative form of the mean-value
inequality since paths are only Lipschitz; the text's "intervening roots
remain simple" gestures at this but should say "on the intervening interval."
Second, and more important for numerics: the declared solution class has
$\mathbf V_j\in BV_{\mathrm{loc}}$, so $D\mathbf V_j$ may carry atoms. When a
history perturbation (or one integration step) shifts the root time across an
atom of $D\mathbf V_j$, the evaluated $\mathbf V_j(S)$ jumps by the atom mass
and the row changes by $O(1)$ no matter how small the perturbation. Any
history-to-ledger continuity claim therefore silently assumes an atom-free
window around each active root time. This is precisely the breaking-point
mechanism of GD-14 seen from the stability side.

Claim grade: derived. Falsifier: a Lipschitz-in-sup-norm bound for a ledger
row across a $D\mathbf V$ atom at the root time; the jump construction above
refutes any such bound.

Plainly: the lemma says a small nudge of the paths moves the reception time
only a little. True — but if the transmitter's velocity had a kink exactly at
that reception time, a tiny nudge flips which side of the kink you sample, and
the received acceleration row changes by a finite amount. Smoothness windows
around active roots must be declared.

#### GD-7 (GAP) — First-boundary-contact conditioning is unaddressed

Section 10.7 takes as conditional input an event $T_\ast$ with
$u(T_\ast)=1$. Nothing in Sections 1–11 states the transversality of that
contact. For event localization, the conditioning of $T_\ast$ is governed by
the contact order of $\|\mathbf V(T)\|$ with $c_a$: if
$d\|\mathbf V\|/dT$ is bounded away from zero at contact (transversal
contact), the event time is well-conditioned and standard event location
recovers it to $O(\mathrm{tol})$; if the contact is tangential
($d\|\mathbf V\|/dT\to0$ at contact, as in the diagnostic's
$2\cos T$ example at $T=\pi/2$), the event time is only half-order
conditioned: an evaluation error $\eta$ in the speed yields an event-time
error $O(\sqrt{\eta})$. Since the entire conditional edifice of Section 10.7
hangs on $T_\ast$, the packet should record which contact class the
mirror-encounter input asserts, and any numerical restaging of the conditional
chart must declare its contact-localization tolerance accordingly.

Claim grade: derived (the two conditioning classes are elementary). Falsifier:
an event localizer achieving $O(\eta)$ event-time accuracy at a tangential
contact from speed evaluations of accuracy $\eta$; the quadratic flatness
forbids it.

Plainly: finding the exact moment the speed first touches the ceiling is easy
if the speed is still rising briskly at that moment, and much harder if it
grazes the ceiling flatly. The document never says which case its assumed
first-contact event is, and the error bars differ by a square root.

### 3.3 IMPROVE

#### GD-8 (IMPROVE) — Name the normative discretization; the case formula is a discontinuous vector field

The Section 8 case formula for $\mathbf A_{\mathrm{eff}}$ is discontinuous as
a function of $\mathbf V$ across the boundary $\|\mathbf V\|=c_a$ whenever
$a_\parallel>0$: the interior value is $\mathbf A_{\mathrm{ord}}$ and the
boundary value removes the forward part. That is correct mathematics for the
differential inclusion, but if an implementer feeds
$\dot{\mathbf V}=\mathcal P_{\mathbf V}(\mathbf A_{\mathrm{ord}})$ into a
classical one-step or multistep integrator as an ODE right-hand side, the
integrator will chatter across the boundary and collapse to low order,
regardless of its nominal order — the standard discontinuous-right-hand-side
failure. The document should state explicitly that the normative discrete law
is the state projection of Section 7 (increment, then project), not
pointwise evaluation of the case formula, and that boundary arcs are entered
and left through located events (GD-14).

Claim grade: derived (discontinuity is read off the case formula; the chatter
mechanism is classical). Falsifier: a classical explicit integrator applied to
the raw case formula that maintains its nominal order across an active
boundary arc without event handling; the first-step defect at the boundary
already caps the local order.

Plainly: there are two ways to code this law. Plugging the "if inside, use
raw; if on the sphere, use trimmed" formula into a standard solver makes the
solver stutter at the sphere. Adding the whole step first and then projecting
back — the document's own scheme — is the correct one, and the document
should say so out loud.

#### GD-9 (IMPROVE) — Name the structure: fixed-set Moreau process; the boundary layer is rate-independent

The frozen-ledger layer
$\dot{\mathbf V}+N_{\mathcal B_{c_a}}(\mathbf V)\ni\mathbf f$ is a Moreau
process with a fixed convex set, equivalently the vector play/stop system of
hysteresis theory driven by $\mathbf U(T)=\int\mathbf f$. Naming this buys
three things at zero cost: (i) the catching-up terminology and its
convergence literature become citable anchors for future certified schemes;
(ii) the boundary response is exposed as rate-independent in the driving
increment — reparameterizing time leaves the constrained response of a
supplied ledger unchanged, which is a useful invariance test for
implementations; (iii) the strict convexity and smoothness of the ball is
exactly the structural fact my convergence theorem GD-13 exploits, and is
worth recording as the reason the ball case is numerically benign compared
with general convex constraints.

Claim grade: derived (identification is definitional). Falsifier: a supplied
finite ledger whose catching-up output changes under an orientation-preserving
reparameterization of the partition refinement in the zero-step limit;
rate-independence forbids it.

Plainly: this equation type has a name and a mature toolbox. Saying the name
connects the packet to decades of known results about exactly this
projection-onto-a-ball evolution, instead of re-proving them piecemeal.

#### GD-10 (IMPROVE) — State the certified root-localization corollary of monotonicity, and detect intervals by the rigidity predicate

Section 9 proves $s\mapsto g(T_r,s)$ nondecreasing per ordered channel under
the ceiling, with zero set empty, a point, or one interval. The numerical
corollary deserves to be stated in the packet because it is the strongest
computational consequence of the ceiling in scope: root enumeration per
channel reduces to certified sign bracketing. Given evaluations with certified
enclosures $g(a)<-\eta$ and $g(b)>\eta$, monotonicity guarantees exactly one
root in $[a,b]$ and bisection converges with a rigorous enclosure at every
step — no Newton globalization, no root-count heuristics, no missed-root
hazard. Near a degenerate root the enclosure narrows slowly (width is
controlled by $d_{\min}$ through
$\text{width}\le(\text{residual gap})/d_{\min}$ only where the floor holds),
but correctness never fails. Conversely, distinguishing a characteristic
interval from a near-flat simple root by sampling $g$ is hopelessly
ill-conditioned; the rigidity theorem converts it into a well-conditioned
geometric predicate on the retained history itself — check exact wake-speed
straight-line exact-aim motion of the transmitter on the candidate interval —
which is checkable from the history representation without evaluating $g$ at
all.

Claim grade: derived (both statements follow from Section 9's theorems).
Falsifier: a ceiling-admissible channel with $g(a)<0<g(b)$ and either zero or
two isolated roots in $[a,b]$; monotonicity forbids it.

Plainly: because the root function only ever climbs, a computer can trap each
reception time between a definitely-negative and a definitely-positive
evaluation and squeeze — with a guarantee, not a hope. And to decide whether a
whole interval of emissions arrives at once, do not squint at tiny values of
$g$; use the document's own rigidity theorem and check the transmitter's path
geometry directly.

#### GD-11 (IMPROVE) — Section 10.7's root sweep is not Lipschitz in receiver time; parameterize by emission time

On the conditional ceiling segment, $ds/dT=2/(1-u(s))\to\infty$ as
$s\to T_\ast$. Any receiver-time dense output of $S(T)$ therefore loses
accuracy near the endpoint: interpolating a function with unbounded derivative
on a uniform $T$-mesh is first-order-defeating. The cure is already in the
packet: the simple-branch transfer identity of Section 5 is precisely a change
of integration variable to emission time $s$, in which the incoming-channel
density is bounded (positive range, $D_r$ floor). A numerical restaging of the
10.7 chart should integrate the accumulated row contribution in $s$, not $T$,
near the endpoint. This also makes the finiteness statement of 10.7 (finite
accumulated raw contribution despite divergent pointwise weight) manifest at
the discrete level rather than emergent from cancellation.

Claim grade: derived. Falsifier: a uniform-in-$T$ interpolant of $S(T)$ on
the segment with error $o(1)$ under mesh refinement at fixed cost ratio near
the endpoint; the unbounded derivative forbids a uniform first-order rate.

Plainly: near the end of the approach, each tick of receiver time sweeps
through a huge stretch of the partner's emission history. Bookkeeping per tick
of receiver time then goes blurry. Bookkeeping per tick of emission history —
which the document's own transfer identity licenses — stays sharp.

### 3.4 ADVANCE

#### GD-12 (ADVANCE) — Discrete contraction lemma: the scheme is unconditionally contractive

**Lemma (discrete contraction).** Let $\{\mathbf V_k\}$, $\{\mathbf W_k\}$ be
catching-up iterates on the same partition with increments
$\{\mathbf F_k\}$, $\{\mathbf G_k\}$ and initial data in
$\mathcal B_{c_a}$. Then for every $k$,

$$
\|\mathbf V_{k+1}-\mathbf W_{k+1}\|
\le
\|\mathbf V_k-\mathbf W_k\|
+
\|\mathbf F_k-\mathbf G_k\|,
$$

hence
$\max_k\|\mathbf V_k-\mathbf W_k\|
\le\|\mathbf V_0-\mathbf W_0\|+\sum_k\|\mathbf F_k-\mathbf G_k\|$.

*Proof.* $\Pi_{\mathcal B_{c_a}}$ is nonexpansive:
$\|\Pi(\mathbf V_k+\mathbf F_k)-\Pi(\mathbf W_k+\mathbf G_k)\|
\le\|(\mathbf V_k-\mathbf W_k)+(\mathbf F_k-\mathbf G_k)\|$; apply the
triangle inequality. $\square$

This is the exact discrete counterpart of the continuous contraction estimate
in Section 7, valid at every step size with no stability restriction — the
analogue, for this projected scheme, of unconditional contractivity
(B-stability) in classical stiff theory. It is the license for GD-4's backward
error account and for long-horizon error budgets: discrete error never
amplifies, it only accumulates additively through increment differences.

Claim grade: derived (proof above is complete). Falsifier: two iterate
sequences on one partition violating the displayed inequality at some step;
nonexpansiveness of the Euclidean ball projection forbids it.

Plainly: run the algorithm twice with slightly different inputs and the
answers drift apart no faster than the input differences pile up — at any step
size whatsoever. That is the strongest kind of numerical stability there is,
and it comes free from the projection.

#### GD-13 (ADVANCE) — Proposed first-order convergence theorem for bounded-variation input

**Proposed theorem (order one for $BV$ input).** Let
$\mathbf f\in BV([T_0,T_1];\mathbb R^3)\cap L^\infty$, let $\mathbf V$ solve
the frozen-ledger inclusion, and let $\{\mathbf V_k\}$ be the catching-up
iterates with exact averages on a partition of maximum step $h$. Then

$$
\max_k\|\mathbf V_k-\mathbf V(T_k)\|
\le
h\,\mathrm{Var}_{[T_0,T_1]}(\mathbf f)
+
\frac{C_0}{c_a}\,h\,
\|\mathbf f\|_{L^\infty}\,\|\mathbf f\|_{L^1},
$$

with an absolute constant $C_0$ (conjectured $C_0\le2$).

*Proof sketch, two lemmas.* (i) *Input averaging.* Let $\bar{\mathbf f}_h$ be
the piecewise step-average of $\mathbf f$. Then
$\int\|\mathbf f-\bar{\mathbf f}_h\|\le h\,\mathrm{Var}(\mathbf f)$
(standard for $BV$), and the continuous contraction estimate bounds the
distance between the exact solutions with inputs $\mathbf f$ and
$\bar{\mathbf f}_h$ by that integral. (ii) *Chord-versus-slide defect.* On one
step with constant input $\mathbf g$ and increment
$\mathbf F_k=\mathbf g\Delta_k$, the catching-up endpoint
$\Pi_{\mathcal B}(\mathbf V_k+\mathbf F_k)$ and the exact constant-input
constrained flow endpoint agree exactly while the ball is inactive and differ
by at most $C_0\|\mathbf F_k\|^2/c_a$ when the boundary is active: both
endpoints deviate from the unconstrained point $\mathbf V_k+\mathbf F_k$ only
through the constraint, both first-order corrections are the same removal of
the outward radial part, and the residual difference is a curvature term of
the sphere of radius $c_a$, hence quadratic in the step increment. Summing
defects through the nonexpansive exact flow gives
$\sum_k C_0\|\mathbf F_k\|^2/c_a
\le(C_0/c_a)\,h\,\|\mathbf f\|_{L^\infty}\|\mathbf f\|_{L^1}$. $\square$

*Status and obligations.* Lemma (i) is complete. Lemma (ii) is stated with a
proof sketch only; the full proof must handle a mid-step first contact and
exclude multiple active/inactive switches per step for $h$ small (bounded
input gives at most one contact per step once
$h<c_a/\|\mathbf f\|_{L^\infty}$-type smallness holds). The measured per-step
defect slopes ($\to2.0$ in three configurations, Section 2) are diagnostics
consistent with lemma (ii); they are not its proof. *Sharpness:* order one is
sharp for $BV$ input with atoms — an input jump inside a boundary-exit step
leaves an irreducible $O(h)$ per-event defect (one-dimensional construction:
$\mathbf f$ jumping from outward to inward mid-step); smooth transversal-exit
cases can superconverge, as the closed-form diagnostic showed, because the
event-step defect is then quadratic in the event offset.

Claim grade: proposed theorem — the bound is inferred pending the full proof
of lemma (ii); everything else is derived. Falsifier: a $BV\cap L^\infty$
input and partition family for which the left side exceeds the right side; or
a proof that the per-step boundary defect is worse than quadratic in
$\|\mathbf F_k\|$, which would break the second term.

Plainly: with a ledger of bounded total wiggle, halving the step should halve
the error, and the two error sources are exactly (a) replacing the input by
its per-step averages and (b) cutting the sphere's curve by a chord once per
step. Both are proportional to the step. The one missing piece is a clean
proof that the chord shortcut is a squared-step error, which my measurements
support but do not prove.

#### GD-14 (ADVANCE) — Breaking-point cascade lemma and the event-inclusion discipline

**Lemma (cascade well-ordering; derived).** Suppose transmitter $j$'s velocity
has a kink or $D\mathbf V_j$-atom at time $t^\ast$, and consider receiver
$i$'s channel with a simple branch $S_{i\leftarrow j}$, floors
$D_t\ge d_{\min}>0$, $D_r\ge0$, and range floor $r\ge r_{\min}>0$ on the
chart. Then: (a) the receiver times at which the branch samples $t^\ast$ form
a single point if $D_r>0$ there (a closed interval if $D_r=0$, the frozen
stratum); (b) any such image time $T$ satisfies
$T-t^\ast=r/c_f\ge r_{\min}/c_f$; (c) consequently a cascade of propagated
discontinuities — the receiver's response kinks at the image time, which
propagates onward through every channel it transmits into — advances by at
least $r_{\min}/c_f$ per generation and has finitely many generations in any
compact time interval.

*Proof.* (a) is monotonicity of $S$ in $T$ ($dS/dT=D_r/D_t\ge0$) plus strict
monotonicity where $D_r>0$. (b) is the causal equality $r=c_f(T-S)$ at the
root with $S=t^\ast$. (c) follows by induction on generations. $\square$

**Scheme discipline (derived consequence, standard for delay equations).** A
step containing an unlocated propagated discontinuity carries an $O(h)$ local
defect regardless of the smooth-case order of the method, so global order
beyond one on charts with events requires locating cascade times (by solving
$g(T,t^\ast)=0$ for $T$, a certified bracketing problem by GD-10) and placing
them on the mesh. The closed-form diagnostic in Section 2 shows exactly this
signature: total error dominated by the single event-containing step and
non-monotone in $h$ through the mesh-event offset. Under the ceiling this
discipline is *implementable*, because per-channel root uniqueness and
monotonicity make each cascade image computable by certified bisection; above
wake speed it is not, which is a numerical restatement of Section 11.2's
warning.

Claim grade: lemma derived; the order-reduction statement is derived at the
level of local defect and inferred at the level of realized global order
(method-dependent). Falsifier: a chart with the stated floors on which a
cascade has two generations closer than $r_{\min}/c_f$, or an unlocated-event
integration exhibiting sustained order two through event-bearing steps.

Plainly: every kink in one path's velocity is re-broadcast to every receiver
at a strictly later time fixed by the causal geometry, and those re-broadcasts
form a finite, orderly family that a program can compute in advance and place
its steps on. Skip that bookkeeping and the integrator quietly drops to first
order no matter how fancy it is.

#### GD-15 (ADVANCE) — Emission-time substepping removes the $D_t$ stiffness exactly

**Scheme proposal (derived identity, proposed control law).** Near an episode
where $D_t$ becomes small while range and $D_r$ keep floors
($r\ge r_{\min}$, $D_r\ge\rho_{\min}>0$), per-receiver-time step control on
the ledger magnitude is stiff: the row scales as $1/D_t$ with no upper bound.
The Section 5 transfer identity

$$
\int_B\frac{\|\mathbf K\|}{D_t}\,dT
=
\int_{S(B)}\frac{\|\mathbf K\|}{D_r}\,ds
$$

is exactly a change of integration variable, so a step controller that
equidistributes the *emission-time* increment $\Delta S$ bounds the per-step
received impulse by
$(\sup\|\mathbf K\|/\rho_{\min})\,\Delta S
\le(Kc_f/(r_{\min}^2\rho_{\min}))\,\Delta S$, with constants independent of
any $D_t$ floor. The stiffness was an artifact of the parameterization, not of
the dynamics; the reparameterized substepping integrates the same branch with
uniformly bounded per-step work and impulse. This is the discrete twin of
GD-11 and turns the packet's transfer lemma into an algorithm.

Claim grade: identity derived (it is Section 5's own lemma); the control-law
adequacy is inferred pending an implementation. Falsifier: an episode with the
stated $r$ and $D_r$ floors in which $\Delta S$-equidistributed steps admit
per-step impulse exceeding the displayed bound; the identity forbids it.

Plainly: when the transmitter-side factor collapses, each received row looks
huge, but only for a proportionally tiny sliver of receiver time. Stepping by
slivers of the *emission* clock instead of the receiver clock makes every step
carry a modest, bounded kick — the apparent stiffness cancels out exactly, by
the document's own identity.

#### GD-16 (ADVANCE) — Shape of the missing history-to-ledger Lipschitz constant

The Section 7 closing obligation ("prove the complete ordinary ledger is
locally Lipschitz on a fixed regular chart") needs a quantitative target. For
one row
$\mathbf a=Kc_f\,\hat{\mathbf r}/(r^2D_t)$ on a chart with floors
$r\ge r_{\min}$, $D_t\ge d_{\min}$, transmitter speed $\le c_a\le c_f$, and an
atom-free window with a.e. path-acceleration bound $a_{\max}$ around the root
time, the perturbation decomposition

$$
\delta\mathbf a
=
\frac{Kc_f}{r^2D_t}\,\delta\hat{\mathbf r}
-\frac{2Kc_f\,\hat{\mathbf r}}{r^3D_t}\,\delta r
-\frac{Kc_f\,\hat{\mathbf r}}{r^2D_t^2}\,\delta D_t,
$$

with $\|\delta\hat{\mathbf r}\|\le2\|\delta\mathbf X\|_\infty/r$,
$|\delta r|\le\|\delta\mathbf X_r\|_\infty+\|\delta\mathbf X_t\|_\infty
+c_a|\delta S|\le2\|\delta\mathbf X\|_\infty+c_a|\delta S|$,
$|\delta D_t|\le c_a\|\delta\hat{\mathbf r}\|+\|\delta\mathbf V\|_\infty
+a_{\max}|\delta S|$, and the root-shift bound
$|\delta S|\le2\|\delta\mathbf X\|_\infty/d_{\min}$ from Section 9, yields the
candidate composite constant

$$
L_{\mathrm{row}}
\le
\frac{Kc_f}{r_{\min}^2 d_{\min}}
\left[
\frac{4}{r_{\min}}
+\frac{2c_a}{r_{\min}d_{\min}}\Bigl(1+\frac{c_a}{c_f}\Bigr)
+\frac{2a_{\max}}{d_{\min}^2}
\right]\!\|\delta\mathbf X\|_\infty
+
\frac{Kc_f}{r_{\min}^2 d_{\min}^2}\,\|\delta\mathbf V\|_\infty ,
$$

up to absolute-constant bookkeeping that a full proof must fix. Summing over
the at most $N-1$ active channels (Section 9 count) gives the ledger constant
$L_{\mathrm{ledger}}\le(N-1)L_{\mathrm{row}}$. This is the explicit smallness
input for a method-of-steps contraction on horizons below the delay floor
(GD-5), and it makes visible which floors dominate: the $d_{\min}^{-2}$ and
$r_{\min}^{-3}$ dependencies say the contraction radius collapses fastest
through transversality loss, then through range loss.

Claim grade: proposed bound — each ingredient inequality is derived, the
composite constant is inferred pending a line-by-line proof with fixed
absolute constants and the atom-free window made precise (GD-6). Falsifier: a
chart satisfying the floors on which the row's history-Lipschitz constant
exceeds the displayed form's scaling in $r_{\min}$, $d_{\min}$, or
$a_{\max}$.

Plainly: to finish its own open theorem, the document needs a number: how
sensitively one received row depends on wiggles of the stored paths. This
finding writes that number's formula down — showing it blows up like the
inverse square of the transversality floor and the inverse cube of the range
floor — so the future fixed-point proof knows exactly what it must control.

### 3.5 INSIGHT

#### GD-17 (INSIGHT) — The ceiling buys three certified numerical properties at once, and loses all three above $c_f$

For $c_a\le c_f$, each ordered channel simultaneously has: at most one
ordinary root (uniqueness — no enumeration heuristics); nondecreasing
$g(T_r,\cdot)$ (certified bracketing — no missed roots, GD-10); and
$dS/dT=D_r/D_t\ge0$ (no root retrogression — warm-started tracking never
backtracks through history, so retained-history storage can be a forward
cursor). These are exactly the three properties a certified delay-integrator
needs from its root layer. For $c_a>c_f$ all three fail at once. Section 11.2
already says the analysis cannot be continued upward; this review adds that
the *numerical* problem class jumps discontinuously at $c_a=c_f$ too — the
equality boundary is simultaneously the analytic and the computational
frontier of the tame regime.

Plainly: at or below wake speed, a computer can find every reception with a
guarantee, and its bookmark into each partner's history only ever moves
forward. One notch above wake speed, all of those guarantees evaporate
together. The tame zone for proofs and the tame zone for software are the same
zone.

#### GD-18 (INSIGHT) — The only in-scope divergence mechanism is range collapse; step controllers should watch $r$, not $|D_t|$

Sections 5 and 10.7 are mutually consistent in a way worth surfacing: the
transfer lemma makes every positive-range small-$D_t$ episode integrable
(finite accumulated impulse — 10.7's incoming channel, with range tending to
$q_\ast>0$, instantiates this), while the genuinely divergent object in scope
is exclusively the zero-range endpoint ($r=c_f(T_{\mathrm c}-s)\to0$,
transferred density $(T_{\mathrm c}-s)^{-2}$). The numerical moral: a
step-size or trust controller keyed on the pointwise row magnitude
$\propto1/D_t$ over-refines harmlessly during benign transversality dips but
does not flag the true hazard; the certified hazard indicator on these charts
is the range floor $r_{\min}$ (equivalently the delay floor, GD-5). Monitors
should treat $r\downarrow$ as the singularity alarm and $D_t\downarrow$ with
$r$ bounded below as a reparameterization instruction (GD-15).

Plainly: rows that look enormous because the geometry lines up for an instant
are actually harmless — they act for a proportionally tiny time. The thing
that can genuinely blow up is two paths getting close. Software should sound
its alarm on distance, not on the flashy-looking row size.

#### GD-19 (INSIGHT) — The equal-speed circular chart is a ready-made independent oracle for any future instantiation

The Section 11.1.1 chart supplies, in closed form up to one scalar root of
$\cos\xi=\xi$: the root angle (radius-independent), the delay, $D_t=D_r$, both
row components, and the compatible radius $R_\ast$ — a one-parameter family
($K$, with $c_f=1$) of exact reference data for a delayed causal-root ledger
with a genuinely nontrivial state-dependent delay. Because it is authored
analytically and independently of any solver, it satisfies the repository's
evidence-independence rule for an oracle: a future numerical instantiation of
this partial model can be checked against it without shared-enumerator
circularity. Diagnostic set 1 is a template: root, factors, components, and
balance were reproduced from raw prescribed geometry to $10^{-16}$. The
general-$\lambda$ family and the helix negative result extend the oracle set
(a correct instantiation must also *fail* to zero the helix's axial residual —
a negative control, which is the rarer and more valuable kind).

Plainly: the binary circle is not just a physics candidate — it is a test
target with exactly known answers, created by hand rather than by any program,
which is precisely what honest software validation needs. And the helix that
provably cannot balance gives the test suite something every good suite needs:
a case the code must report as failing.

#### GD-20 (INSIGHT) — The helix negative result sits exactly where numerics would be least trustworthy

In Section 11.1.2, $D_t=D_r=v^2(1+\sin D)/c_f$ vanishes quadratically as the
translation share grows ($v\to0$, $u\to c_f$). Any numerical sweep of
near-axial translating binaries would therefore operate with collapsing
root-factor floors — precisely the regime where root conditioning (GD-10) and
row sensitivity (GD-16, the $d_{\min}^{-2}$ term) degrade fastest — and its
verdicts would be least certifiable. The analytic negative result carries the
full load in the region numerics handles worst. This is the correct division
of labor, and it should be preserved: if the retuning-transition program of
11.1.3 ever motivates simulating near-axial translation, the plan must budget
for the $v^2$ collapse of $D_t$ explicitly rather than discovering it as
mysterious step-size death.

Plainly: the fastest-translating binaries are exactly the ones a simulator
would measure worst, because the reception geometry there becomes nearly
grazing. Fortunately the document already settled that region with a proof, so
no simulation needs to be trusted there — and none should be.

## 4. Delay-integrator contract: requirements for a trustworthy numerical instantiation

The following consolidates the findings into the contract that any future
numerical instantiation of this partial model (regular charts, Sections 5–9,
plus the conditional 10.7 chart) must satisfy before its output is used for
any conclusion. Requirements N-1 through N-10; each names its source finding.

1. **N-1 (scheme).** The normative discrete law is increment-then-project
   (Section 7), never pointwise integration of the case formula (GD-8).
2. **N-2 (order target).** Declared convergence order for the response layer:
   one, per GD-13, pending its lemma (ii); refinement studies must test
   against this order and treat deficits as defects, not noise (GD-3).
3. **N-3 (stability ledger).** Error budgets use the discrete contraction of
   GD-12: initial error plus cumulative increment error; any observed
   amplification beyond it is a bug by theorem.
4. **N-4 (quadrature clause).** Per-step increment error
   $\|\mathbf F_k-\tilde{\mathbf F}_k\|$ declared and summed into the budget
   (GD-4); ledger summation uses compensated or exact accumulation with the
   reorder-invariance falsifier in its tolerance form (GD-1).
5. **N-5 (root layer).** Roots enumerated per ordered channel by certified
   monotone bracketing with interval-evaluated $g$ (GD-10); warm starts are
   forward-only cursors (GD-17); characteristic-interval suspicion resolved by
   the rigidity predicate on the history, not by small-$|g|$ samples (GD-10).
6. **N-6 (floors).** Declared chart floors $r\ge r_{\min}$,
   $D_t\ge d_{\min}$, plus the delay floor $r_{\min}/c_f$ as the
   method-of-steps horizon (GD-5); a run reaching a floor stops at the
   certified boundary rather than integrating through it (role failure
   condition: no numerical smoothing across a singular event).
7. **N-7 (events).** Breaking-point cascade times computed by certified
   bracketing and placed on the mesh (GD-14); boundary contact and
   $a_\parallel$ sign-change events located with declared tolerance and the
   contact class (transversal or tangential) recorded (GD-7).
8. **N-8 (stiff episodes).** Positive-range small-$D_t$ episodes integrated by
   emission-time substepping with impulse-bounded steps (GD-15); the
   singularity alarm keys on range, not on row magnitude (GD-18).
9. **N-9 (refinement matrix).** Convergence assessed on the full matrix — time
   step, history-representation resolution, root tolerance, and arithmetic
   precision — never on time step alone (role mandate; GD-6 shows history
   resolution enters through velocity evaluation at shifted roots).
10. **N-10 (oracles).** Validation against the independent analytic oracle
    family of GD-19, including the helix negative control; agreement between
    two methods sharing one root enumerator is not root validation (role
    failure condition).

Plainly: this is the checklist that turns "we integrated it and it looked
fine" into "the run is certified to mean something." Every line traces to a
specific finding above, and every line is checkable by an operator without
trusting the code's own self-report.

## 5. Falsification summary for this review

Each finding above carries its own falsifier inline. Globally: this review is
falsified as a whole if a derivation error is exhibited in any of the
Sections 4–11 items reported verified in Section 1 (the diagnostics scripts'
construction is described in Section 2 and is reproducible from the prescribed
geometry alone), or if the packet already contains, in Sections 1–11, a
convergence-order statement, a range-floor obligation, or an event-inclusion
discipline that GD-3, GD-5, or GD-14 report missing.

Plainly: every claim here tells you exactly what observation would kill it,
and the review itself dies if someone finds a real math error in the parts I
certified as clean or finds the missing clauses already present in the text.
