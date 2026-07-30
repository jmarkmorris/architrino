# Field-Speed Ceiling: Mathematics, Geometry, and Dynamical System

**Status:** provisional mathematical framework for investigation.  
**Claim level:** no field-speed ceiling is adopted by this document.

## Purpose

Build the proposed field-speed-ceiling model from its smallest mathematical
objects before using special encounter charts. The question is whether one can
place the existing causal-wake dynamics inside a closed architrino velocity
domain without silently changing root admission, wake bookkeeping, or the
meaning of acceleration.

The existing [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md)
remains the reference for the current unbounded velocity domain. This document
develops only a possible alternative model.

## Proposed axiom budget

Do not restate the existing Architrino primitives here. This investigation
inherits Euclidean void, absolute time, persistent architrino paths, point-delta
emission, causal wake propagation at $c_f$, and ordinary inverse-square wake
dilution wherever the current causal-root law is regular.

The proposed alternative needs only one new combined postulate:

> **Speed-Ceiling Response Postulate.** Every architrino velocity remains in
> the closed ball $\mathcal B_{c_f}$. At its boundary, each finite ordinary
> received acceleration contribution has the least-changed effective value
> compatible with remaining in that ball: its speed-increasing component is
> removed, while its transverse and speed-reducing components remain.

The two clauses are logically necessary: a speed bound alone does not select
an evolution at the boundary. They are grouped as one response postulate,
rather than introducing separate axioms for per-wake saturation, a finite core,
a maturity length, collinearity, straight motion, or a special self-root
exception.

The following are consequences to prove, not additional axioms: no
super-field-speed history; zero effective forward acceleration at the cap;
transverse turning at fixed speed; speed reduction under an opposing
contribution; and straight constant-speed motion for a cap-state collinear
case with no remaining transverse or opposing row.

Plainly: add one rule about how a maximum speed responds to a wake. Let the
geometry produce the rest.

## 1. Kinematic state

Let an architrino path in Euclidean void be

$$
\mathbf X(T)\in\mathbb R^3,
\qquad
\mathbf V(T)=\frac{d\mathbf X}{dT}.
$$

The proposal replaces the present open velocity domain with the closed ball

$$
\mathcal B_{c_f}
=
\left\{
\mathbf V\in\mathbb R^3:
\|\mathbf V\|\le c_f
\right\}.
$$

The boundary $\partial\mathcal B_{c_f}$ is the field-speed sphere. This is a
geometric state constraint, not yet a causal-root rule.

Plainly: velocity may point in any direction, but its tip must stay inside or
on a sphere of radius $c_f$.

## 2. Interior and boundary dynamics

Let $\mathbf A_{\mathrm{raw}}$ denote the acceleration that the declared
causal-wake/root ledger would supply wherever that ledger is ordinary and
finite. Let $\mathbf A_{\mathrm{eff}}$ denote the acceleration actually used
to evolve the constrained velocity.

For an interior state $\|\mathbf V\|<c_f$, the least-invasive candidate is

$$
\mathbf A_{\mathrm{eff}}
=
\mathbf A_{\mathrm{raw}}.
$$

For a differentiable path on the boundary, viability requires

$$
\mathbf V\mathbin{\cdot}\mathbf A_{\mathrm{eff}}
\le0.
$$

This says only that the acceleration cannot point out through the velocity
sphere. It allows a tangential contribution to turn the velocity and an
opposite contribution to reduce speed.

Plainly: at the cap, a wake may turn an architrino or slow it, but it may not
increase the magnitude of its velocity.

## 3. A coordinate-free candidate saturation map

For $\mathbf V\ne\mathbf0$, write

$$
\hat{\mathbf v}=\frac{\mathbf V}{\|\mathbf V\|},
\qquad
(z)_+=\max(z,0).
$$

One possible constrained-dynamics map is

$$
\mathbf A_{\mathrm{eff}}
=
\begin{cases}
\mathbf A_{\mathrm{raw}}, & \|\mathbf V\|<c_f,\\[4pt]
\mathbf A_{\mathrm{raw}}
-
\bigl(\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{raw}}\bigr)_+
\hat{\mathbf v}, & \|\mathbf V\|=c_f.
\end{cases}
$$

It preserves all inward and tangential components at the boundary while
removing only the speed-increasing normal component. In convex-analysis
language it is projection onto the tangent cone of $\mathcal B_{c_f}$.

This is a candidate mathematical expression, not a selected Architrino law.
It cannot be evaluated when $\mathbf A_{\mathrm{raw}}$ itself is undefined or
non-locally-finite.

### Boundary geometry: speed, turning, and slowing

At nonzero velocity, decompose a finite raw acceleration into the direction of
motion and the perpendicular plane:

$$
\mathbf A_{\mathrm{raw}}
=
\bigl(\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{raw}}\bigr)
\hat{\mathbf v}
+
\mathbf A_\perp,
\qquad
\hat{\mathbf v}\mathbin{\cdot}\mathbf A_\perp=0.
$$

The first term changes speed; the second changes direction. At the field-speed
boundary, the candidate saturation map removes only a positive first term. A
negative first term remains available to reduce speed, and a transverse term
remains available to bend the path while preserving speed.

In the strictly collinear mirror chart, there is no transverse component. If
the only finite raw row is forward and speed-increasing, the cap gives zero
effective acceleration and straight constant-speed motion. That is a special
case of the three-dimensional geometry, not the general rule.

### Alternative cap response: excess-wake transverse redirection

The minimal response map removes a forbidden speed-increasing component. A
stronger candidate model instead redirects some or all of that rejected
component into the plane perpendicular to $\mathbf V$. Let

$$
\mathbf n(T)\mathbin{\cdot}\hat{\mathbf v}(T)=0,
\qquad
\|\mathbf n(T)\|=1,
$$

be a declared transverse direction, supplied by the full wake geometry rather
than chosen arbitrarily. A redirection rule has the schematic form

$$
\mathbf A_{\mathrm{eff}}
=
\mathbf A_{\mathrm{raw}}
-
\bigl(\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{raw}}\bigr)_+
\hat{\mathbf v}
+
a_{\mathrm{turn}}\mathbf n.
$$

Here $a_{\mathrm{turn}}$ must be a defined function of the incoming wake and
cap state. It cannot be supplied by the speed ceiling alone. A purely forward
wake in unrestricted three-dimensional space has no preferred transverse
direction; a partner configuration, a plane, or another declared geometric
record must select $\mathbf n$.

In a planar chart, if $a_{\mathrm{turn}}>0$ is constant and $\mathbf n$ remains
the same signed inward normal of one fixed center, then

$$
R=\frac{c_f^2}{a_{\mathrm{turn}}}
$$

is constant and the cap-state path is a circle. If the transverse direction or
magnitude changes with the wake geometry, the path has changing curvature
instead. Thus circular cap-state motion is a derived consequence of a specific
redirection geometry, not of a speed ceiling alone.

Plainly: a cap can merely prevent speeding up, or it can redirect excess wake
into turning. The second possibility is a promising new geometry candidate,
but it needs the wake to say which way to turn.

## 4. Causal-wake interface still required

The state constraint alone does not answer which causal roots are admitted at
exact field speed. A complete model must state, before summing contributions:

1. whether co-moving equality candidates are inactive, a distinct boundary
   event, or part of a new finite wake representation;
2. how every ordinary partner and self root retains unique ledger ownership;
3. whether the raw wake measure is finite at the boundary; and
4. how the constrained evolution emits an outgoing retained history.

The cap may not be used to erase an already admitted root after its divergent
weight has been computed. The admission/update rule must make the cap-state
measure well-defined first.

### Plateau wake: point-source limit and cap-state evolution

The working proposal does not add a finite core or maturity radius merely to
make the point-source limit finite. Emission is treated in the usual
distributional point-source limit. At every fixed positive radius, the emitted
wake has an ordinary, finite inverse-square value; as the local spatial or
time increment tends to zero, the emission is represented by its finite delta
measure at the origin.

For any artificially declared positive lower radius $r_0$, the old-shell tail
also has finite geometric weight:

$$
\int_{r_0}^{R}\frac{dr}{r^2}
=
\frac{1}{r_0}-\frac{1}{R}
\longrightarrow
\frac{1}{r_0}
\quad\text{as }R\to\infty.
$$

Thus arbitrarily old shells need not create an infinite inverse-square tail.
The proposed dynamical answer to exact co-moving field-speed geometry is not a
new radius: apply the cap-state map to the speed-increasing received effect
before it changes velocity. On a straight cap-state segment, a forward
self-wake contribution therefore has zero effective velocity-changing effect,
even though its ordinary positive-radius inverse-square wake value is defined.

This is a provisional evolution convention. A later complete wake/account law
must still state its measure and provenance, especially for mixed-direction or
transverse cap-state contributions. The convention does not erase an emission;
it says that a contribution incapable of increasing an already maximal speed
does not change that speed.

## 5. Collinear chart as a special case

For the mirror-symmetric collinear encounter, the velocity-sphere condition
reduces to the scalar statement that the signed speed cannot increase beyond
$c_f$. The MEC-007 incoming theorem supplies the first arrival at that sphere
at positive separation. It does not decide whether the constrained path turns,
has a boundary event, or travels along the boundary.

A nonzero interval on the boundary is especially diagnostic: under the current
sharp root condition, co-moving equality gives a non-simple continuum of
candidates. The inverse-square tail observation is finite from a separately
given positive radius, but the current equation does not derive that radius or
resolve the zero-Jacobian continuum.

## 6. Mathematical sequence

1. Specify the closed velocity domain and equality root-admission rule.
2. Define a finite cap-state causal-wake measure or boundary update.
3. Prove existence and uniqueness of constrained histories on one declared
   encounter class.
4. Recompute the complete root ledger and outgoing retained history.
5. Only then test binary, Braid, translating-assembly, and observer-level
   Lorentz-recovery consequences.

## 7. Causal reception geometry

For a receiver event $(i,T)$ and an emission from path $j$ at $S<T$, define the
causal-surface function

$$
g_{ij}(T,S)
=
c_f(T-S)-\left\|\mathbf X_i(T)-\mathbf X_j(S)\right\|.
$$

An ordinary delayed reception is an isolated positive-delay zero of $g_{ij}$.
On a regular chart its emission-time derivative is nonzero; equivalently, the
causal surface crosses the transmitter history rather than travelling along it.
This is the geometric origin of the regular transmitter-side factor in the
existing Master Equation.

For a straight same-transmitter cap-state segment,

$$
\mathbf X(T)=\mathbf X_0+c_f(T-T_0)\hat{\mathbf v},
$$

every earlier point on that same segment satisfies $g_{ii}(T,S)=0$, but none
is an isolated crossing. The derivative in the emission-time direction is
zero. The proposed cap-state interpretation is therefore: this co-moving
same-characteristic family is not an ordinary active self-reception. It is a
geometric contact family, not a sequence of independent impacts.

This is the precise mathematical version of the operator observation that an
architrino travelling with its own wake cannot be overtaken by that wake.

## 8. Finite-ledger constrained evolution

On a chart with a finite set of ordinary, finite causal receptions, write their
raw acceleration contributions as $\mathbf a_\alpha(T)$. The candidate capped
evolution is

$$
\frac{d\mathbf V}{dT}
=
\sum_{\alpha\in\mathcal C_{\mathrm{ord}}(T)}
\Pi_{\mathbf V}\!\left(\mathbf a_\alpha(T)\right),
$$

where $\Pi_{\mathbf V}$ is the Speed-Ceiling Response map in Section 3. The
cap-state co-moving contact family from Section 7 is not included in
$\mathcal C_{\mathrm{ord}}(T)$ as an ordinary root. Other partner or
non-collinear roots remain subject to the same normal root-admission and
finite-ledger requirements.

For this finite regular setting, the closed velocity ball is invariant. At its
boundary,

$$
\frac{d}{dT}\|\mathbf V\|^2
=
2\mathbf V\mathbin{\cdot}\frac{d\mathbf V}{dT}
\le0.
$$

Thus the cap is a dynamical consequence of the response postulate, rather than
an after-the-fact velocity clamp.

## 9. First derived geometric consequences

### Interior recovery

While $\|\mathbf V\|<c_f$, $\Pi_{\mathbf V}$ is the identity. The capped
model agrees with the ordinary finite-root acceleration law until the first
field-speed boundary contact.

### Boundary decomposition

At $\|\mathbf V\|=c_f$, a positive speed-changing component is removed;
negative speed-changing and transverse components remain. Hence the cap may
hold speed fixed, reduce it, or bend the trajectory, without any coordinate
choice or collinearity assumption.

### Straight cap-state special case

If the finite ordinary ledger has only components parallel to $\mathbf V$ and
all are speed-increasing, then every effective contribution is zero. The
motion is straight at constant field speed until another ordinary contribution
or a boundary event changes the ledger. This is the proposed interpretation of
the stationary collinear mirror chart after first arrival at field speed; it is
not yet a proved outgoing history.

### Re-entry into the interior

Once a retained effective contribution has a component opposite $\mathbf V$,
the speed can fall below $c_f$. The response map becomes the identity again,
and ordinary finite-root dynamics resumes. The time and geometry of such a
re-entry must be calculated from the actual outgoing retained history.

## 10. Immediate calculation ladder

1. Recheck the stationary collinear mirror release through its established
   first boundary, now using the finite-ledger capped operator.
2. Classify whether a cap-state interval has only a co-moving self-contact
   family and the persistent partner row, or whether another root/boundary
   appears first.
3. Calculate the first off-axis perturbation: which wake components bend,
   which slow, and which are projected out at the field-speed sphere.
4. Only after those local charts are controlled, calculate equal-radius
   phase-offset Braid geometry and translating-assembly velocity composition.

## 11. Full-geometry target

The desired end state is one delayed constrained dynamical system containing:

- persistent architrino paths and their retained histories;
- causal-wake propagation at $c_f$;
- an isolated-crossing reception geometry;
- the Speed-Ceiling Response map; and
- an event rule for any nonordinary root or retained-history boundary.

The test is not whether a cap can be stated. The test is whether this single
system yields finite, unique histories and useful geometry without adding
case-specific rules for collinear pairs, Braids, or translating assemblies.

## 12. First conditional calculation: stationary mirror cap segment

This section applies the proposed model only to the established stationary,
mirror-symmetric collinear incoming chart. Let $q(T)>0$ be the half-separation
and let $u=-dq/dT$ be each inward speed in units $c_f=1$. MEC-007 establishes
an event $T_\ast$ with

$$
u(T_\ast)=1,\qquad q(T_\ast)=q_\ast>0,
$$

and one simple partner root emitted at $s<T_\ast$.

### Conditional cap segment

Assume the alternative model's straight cap-state consequence applies after
$T_\ast$ until the first new ledger boundary. Then

$$
u(T)=1,
\qquad
q(T)=q_\ast-(T-T_\ast).
$$

The persistent pre-threshold partner emission $s(T)<T_\ast$ is governed by

$$
F_T(s)=q(T)+q(s)-(T-s)=0,
\qquad
\partial_sF_T=1-u(s)>0.
$$

It remains a unique ordinary partner root while $s<T_\ast$. Differentiating
the root equation on the cap segment gives

$$
\frac{ds}{dT}
=
\frac{2}{1-u(s)}>0.
$$

Thus the emission time moves forward through the retained pre-threshold
history and reaches $s=T_\ast$ when

$$
T=T_\ast+q_\ast,
$$

which is exactly the coordinate-coincidence time $q(T)=0$ of this conditional
straight segment.

### What this establishes, conditionally

Before that coincidence time, the cap-state model has the old partner row and
the non-isolated co-moving same-transmitter contact family. The latter is not
an ordinary self-hit under Section 7; the forward partner row is
speed-increasing and has zero effective contribution under the proposed
cap-response map. Hence the assumed straight field-speed segment is internally
consistent on this finite open interval at the level of effective motion.

At coordinate coincidence, the old partner row itself reaches the
non-transverse boundary $s=T_\ast$ with $1-u(s)\to0$. This is the next event;
it is not an ordinary partner reception, and it does not determine passage,
rebound, or an outbound real-history branch.

Plainly: under the cap proposal, the pair can travel at field speed from the
known first boundary to coordinate coincidence without the super-field
self-root birth. The first remaining mathematical problem moves to the
coincidence event, where the old partner wake becomes non-transverse.

### Claim boundary

This is a conditional calculation inside the proposed capped model. It does
not prove the cap postulate, choose coincidence semantics, establish that
coordinate passage occurs, or advance MEC-007. It is falsified if the capped
root ledger develops an additional ordinary root or boundary before the stated
coincidence event.

## 13. Equal-radius three-pair reference Braid geometry

This section defines a deliberately simple starting geometry for the capped
Braid questions. It uses no inherited program label and makes no claim that
the geometry is a retained physical branch.

### Reference conditions

- The common group velocity is zero: the Braid center is fixed in the Euclidean
  void frame.
- There is no external acceleration contribution. Only the Braid's own
  causal-wake ledger may act.
- There are three persistent opposite-polarity pairs, each with the same
  circular radius $R$, the same angular frequency $\omega$, and antipodal pair
  members.
- The three circular planes are mutually orthogonal, sharing one center. This
  is a concrete first geometry, not a requirement for every future Braid.
- The pair phases are

$$
(\phi_1,\phi_2,\phi_3)
=
\left(0,\frac{2\pi}{3},\frac{4\pi}{3}\right).
$$

### Kinematic realization

Choose three orthonormal plane bases

$$
(\mathbf e_{1,1},\mathbf e_{1,2})=(\mathbf e_y,\mathbf e_z),
\quad
(\mathbf e_{2,1},\mathbf e_{2,2})=(\mathbf e_z,\mathbf e_x),
\quad
(\mathbf e_{3,1},\mathbf e_{3,2})=(\mathbf e_x,\mathbf e_y).
$$

For pair index $a\in\{1,2,3\}$ and opposite-polarity member sign
$\epsilon\in\{+1,-1\}$, define the reference paths

$$
\mathbf X_{a,\epsilon}(T)
=
\epsilon R
\left[
\cos(\omega T+\phi_a)\mathbf e_{a,1}
+
\sin(\omega T+\phi_a)\mathbf e_{a,2}
\right].
$$

Their speed is $R\omega$. The cap-state version sets

$$
R\omega=c_f.
$$

Plainly: this is six architrinos in three opposite-polarity pairs. Each pair
traces one circle of the same radius, the circles lie in the three coordinate
planes, and their phase clocks are spaced evenly by one third of a turn.

### What the geometry must still earn

This kinematic reference is not yet self-reinforcing. To become a capped Braid
solution, its complete delayed partner and self-root ledger must show, for
every one of the six labels:

1. the required transverse turning $c_f^2/R$;
2. zero net speed-changing component at the field-speed boundary under the
   chosen cap response;
3. zero forbidden out-of-plane drift, or a declared three-dimensional closure
   replacing that planar statement;
4. complete root, phase, and retained-history closure under the same record;
   and
5. a finite response at every nonordinary root or phase-topology boundary.

The next calculation is to derive the dimensionless causal-root equations for
this exact geometry, then determine whether its symmetric phase pattern admits
the all-label vector closure. No phase lock, radius basin, $H$ transition,
stability, or physical realization is assumed by writing these paths.

## Claim boundary

This document is not a derivation of a speed ceiling, a continuation law, a
root regularization, an energy/momentum account, a Lorentz result, or a
physical claim. Its function is to state the mathematics that such a proposal
must complete.
