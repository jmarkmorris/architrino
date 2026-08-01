# Field-Speed Ceiling: Mathematics, Geometry, and Dynamical System

**Status:** provisional regular-chart partial model for investigation.
**Claim level:** no field-speed ceiling is adopted by this document.
**Reviewed by:** [Jack K. Hale read-only review, captured 2026-07-31](jack-k-hale-review-response-2026-07-31.md);
[Lars Hörmander read-only review, captured 2026-07-31](lars-hormander-review-response-2026-07-31.md);
[Bill Thurston read-only review, captured 2026-08-01](bill-thurston-review-response-2026-08-01.md);
[Albert Einstein read-only review, captured 2026-08-01](albert-einstein-review-response-2026-08-01.md).

## Purpose

Build the proposed field-speed-ceiling model from its smallest mathematical
objects before using special encounter charts. The question is whether one can
place the existing causal-wake dynamics inside a closed architrino velocity
domain without silently changing root admission, wake bookkeeping, or the
meaning of acceleration.

The existing [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md)
remains the reference for the current unbounded velocity domain. This document
develops only a possible alternative model.

## Provenance and status map

| Material | Status in this document | Authority and boundary |
| --- | --- | --- |
| Euclidean void, absolute time, persistent paths, causal wakes at $c_f$, ordinary positive-delay simple roots, and the regular Master Equation | `canonical premise` | Inherited unchanged from the canonical corpus. These premises do not imply a primitive speed ceiling. |
| First field-speed arrival, incoming simple partner root, and unchanged-sharp-law post-threshold obstruction in the stationary mirror encounter | `conditional input` | Owned by MEC-007, whose lifecycle status is `Awaiting verification`. This document may reason conditionally from that packet but does not treat its input as accepted or independently verified. |
| Complete constrained-response axiom: closed primitive velocity ball, absolutely continuous regular-chart velocity, radial normal-cone reaction, and response only after a complete finite ordinary net ledger is formed | `proposed foundational law` | One complete regular-chart axiom under discussion; not canonical and not adopted here. Its tangent-cone projection and least-change formula are derived a.e. from these clauses, not from the bare speed inequality. It introduces no new numerical scale and has no value when the ordinary net ledger is incomplete, nonordinary, or non-locally-finite. |
| Frozen-ledger constrained evolution and cap-admissible per-channel root monotonicity | `derived regular-chart results` | For an externally supplied $L^1_{\mathrm{loc}}$ ledger, the normal-cone inclusion has one absolutely continuous velocity solution. On any cap-admissible retained transmitter history, one ordered channel has an empty, singleton, or characteristic-interval root set. Neither result constructs the coupled history-to-ledger map or a contact measure. |
| Isolated-crossing rule and inactive co-moving same-transmitter interval | `proposed admission convention` | Limited to the stated same-transmitter geometry. It does not classify partner contact, zero separation, folds, or a general $D_t=0$ event. |
| Minimal collinear partner-contact convention: no ordinary row at exact coincidence, separately retained source measures, and proposed event coefficient $\Delta\mathbf V_{\mathrm{contact}}=\mathbf0$ | `proposed event postulate` | Selected for review only for the stated exact same-path mirror-collinear partner coincidence. Zero event coefficient is not a distributional cancellation, finite-part value, or regulator-independent limit. Its reset returns only an outgoing contact one-jet. |
| History phase space, projected state-dependent-delay solution concept, regular-root assumptions, post-event compatibility, receiver-side measure decomposition, and weak-limit topology | `unmet formulation and theorem obligations` | Required before perturbative reduction, forward invariance, existence, uniqueness, or continuation can be claimed for a solution rather than for the pointwise response algebra. |
| Admission, ownership, update, and outgoing-history semantics for all other nonordinary contact families | `missing event-domain postulate` | No general event disposition is selected. Until this is supplied, the document is not a complete closed-domain dynamical system. |
| Straight collinear cap segment | `conditional hypothesis` | Assumes the MEC-007 input, the complete constrained-response axiom, and the limited same-transmitter admission convention. |
| Open-segment root census, finite accumulated old-partner row, partner-contact obstruction, velocity-preserving outgoing contact one-jet, and first transverse variation | `derived conditional result` | The outgoing one-jet additionally assumes the proposed minimal collinear partner-contact reset. No right-hand path or open post-contact solution follows. |
| Thirty-root inventory on the prescribed six-path geometry | `derived reference-path theorem` | Exact for the declared labeled paths. Their primary topological object is a loop in collision-free configuration space, not a six-component spatial link; the paths are not evolved or retained dynamics. |
| Sampled root margins and four-orientation vector-closure failure | `diagnostic` | Geometry-only numerical evidence. The $T=0$ slice has a versioned 100-decimal-place Python/mpmath oracle and receipt; neither instrument selects a boundary response or establishes physical realization. |

Plainly: the document uses canonical root geometry, one complete proposed
regular-chart response law, one limited self-contact convention, and one
newly selected but narrowly collinear partner-contact postulate. Two useful
regular-chart consequences are now proved, but the coupled delayed-history
problem and general nonordinary event law are still missing. The calculations
therefore remain conditional tests of a partial model rather than an adopted
ceiling dynamics.

## Compact mathematical foundation

This section states the minimum existing geometry and dynamics used below. It
is a compact restatement for this investigation, not a replacement for the
canonical [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md).

### Void, time, and primitive paths

The substrate is a fixed Euclidean void $\mathbb R^3$ and one oriented,
continuous absolute-time parameter $T\in\mathbb R$. An architrino $a$ has a
persistent identity, fixed polarity $q_a$, and a complete retained path

$$
\mathbf X_a(T)\in\mathbb R^3,
\qquad
\mathbf V_a(T)=\frac{d\mathbf X_a}{dT}.
$$

The primitive law is acceleration-first: an architrino has no primitive mass,
and its acceleration is determined from its own receiver event together with
the retained transmitter histories. In the absence of an admitted causal hit,
the path is straight with constant velocity.

### Point emission, propagation, and causal reception

At each emission time $s$, transmitter $j$ supplies the labeled spatial
point-emission measure

$$
\mathsf E_{j,s}
=
q_j\,
\delta_{\mathbf X_j(s)},
\qquad
q_j\ne0
$$

for an admitted emission. The label $j$, emission time $s$, position, and
source strength remain part of its provenance. Its causal surface propagates
through the fixed void at field speed $c_f$. At receiver event
$(T_r,\mathbf X_r(T_r))$, define

Over an emission-time interval $I$, the corresponding labeled source-history
measure is

$$
\mathsf E_j\!\restriction_I(ds,d\mathbf x)
=
q_j\,
\delta_{\mathbf X_j(s)}(d\mathbf x)\,ds.
$$

This measure keeps the source label as part of its typed carrier; labels are
not summed before provenance and convergence are assessed.

$$
\mathbf r_{r\leftarrow t}(T_r,T_t)
=
\mathbf X_r(T_r)-\mathbf X_t(T_t),
\qquad
r_{r\leftarrow t}=\|\mathbf r_{r\leftarrow t}\|,
$$

and the causal-root function

$$
g_{r\leftarrow t}(T_r,T_t)
=
r_{r\leftarrow t}-c_f(T_r-T_t).
$$

An ordinary reception root is a retained positive-delay solution
$g_{r\leftarrow t}=0$, with the transmitter-side factor

$$
D_t
=
\partial_{T_t}g_{r\leftarrow t}
=
c_f-\hat{\mathbf r}_{r\leftarrow t}\mathbin{\cdot}\mathbf V_t(T_t)
\ne0,
\qquad
\hat{\mathbf r}_{r\leftarrow t}
=
\frac{\mathbf r_{r\leftarrow t}}{r_{r\leftarrow t}}.
$$

Thus the causal ledger is not a sum over simultaneous positions: it is the
ordered list of transmitter emission events whose expanding causal surfaces
reach the receiver event. For a regular simple root, uniform emission time
measure collapses with the factor $1/|D_t|$. Same-transmitter roots, if any,
remain subject to the same complete root ledger and the canonical exclusion of
the zero-delay diagonal.

Positive delay implies
$r_{r\leftarrow t}=c_f(T_r-T_t)>0$. The point-delta emission at zero source
radius therefore does not create an ordinary reception at its emission origin:
the ordinary inverse-square direction and magnitude are evaluated only after
the wake has reached positive causal separation. This excludes the
zero-delay, zero-separation diagonal, but positive separation alone does not
classify a nonisolated positive-delay root family.

Plainly: the emission begins at a point, while an ordinary received row occurs
later at positive distance. A continuum of positive-distance contacts can
still leave the ordinary simple-root chart.

### Regular Master Equation: unbounded reference

For a declared regular chart, the existing Master Equation gives the receiver
acceleration as the causal-root sum

$$
\frac{d^2\mathbf X_r}{dT_r^2}
=
\sum_t\ \sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}
\kappa\,\sigma_{tr}\,|q_tq_r|
\frac{c_f}{r_{r\leftarrow t}^2\,|D_t|}
\hat{\mathbf r}_{r\leftarrow t},
$$

where $\sigma_{tr}=\operatorname{sign}(q_tq_r)$ and
$\mathcal C_{r\leftarrow t}(T_r)$ is the admitted root set for the ordered
transmitter--receiver pair. The inverse-square factor is the geometric
dilution of a fixed emitted measure over an expanding causal surface; the
factor $c_f/|D_t|$ is the transmitter-side density of those surfaces at the
root. The canonical law treats both distinct-transmitter and admitted
self-transmitter rows through this causal-root accounting.

The corresponding ordinary receiver measure for ordered channel
$i\leftarrow j$ at fixed reception time $T$ is the vector-valued source-time
measure defined, for a compactly supported test function $\varphi$, by

$$
\left\langle
\boldsymbol{\mathsf R}^{\mathrm{ord}}_{i\leftarrow j,T},
\varphi
\right\rangle
=
\int_{s<T}
\varphi(s)\,
\mathbf K_{ij}(T,s)\,
\delta\!\left(g_{i\leftarrow j}(T,s)\right)\,ds,
$$

where

$$
\mathbf K_{ij}(T,s)
=
\kappa\,\sigma_{ji}\,|q_jq_i|
\frac{c_f}{r_{i\leftarrow j}(T,s)^2}
\hat{\mathbf r}_{i\leftarrow j}(T,s).
$$

On an isolated simple-root chart, the one-dimensional coarea identity gives

$$
\left\langle
\boldsymbol{\mathsf R}^{\mathrm{ord}}_{i\leftarrow j,T},
\varphi
\right\rangle
=
\sum_{s_\alpha\in\mathcal C_{i\leftarrow j}(T)}
\varphi(s_\alpha)
\frac{\mathbf K_{ij}(T,s_\alpha)}
{|D_t(T,s_\alpha)|}.
$$

This receiver measure is not the source measure $\mathsf E_{j,s}$. A
nonisolated coincidence family is outside this ordinary coarea collapse even
when every member has positive causal separation.

This is the unbounded reference evolution. It supplies
$\mathbf A_{\mathrm{raw}}$ only on a chart where its root set, root
multiplicities, and regularity conditions are defined. It supplies neither a
speed ceiling nor a rule for a nonordinary cap-state root family.

Plainly: a source point measure records what was emitted. The receiver measure
records how isolated causal intersections contribute to acceleration. Contact
requires a third, separately typed object rather than identifying these two.

### Proposed regular-chart alteration

The field-speed-ceiling investigation changes none of the preceding geometry,
emission, propagation, or ordinary regular-root contribution. It proposes one
complete constrained-response axiom for regular charts: a closed velocity
domain, absolutely continuous regular velocity, radial normal-cone reaction,
and response only after the completed finite ordinary net ledger is formed.
Its least-change boundary formula follows a.e. under those clauses. The axiom
does not supply general nonordinary contact admission or event evolution.

## Proposed axiom budget and partial-model boundary

The compact foundation above supplies Euclidean void, absolute time,
persistent architrino paths, point-delta emission, causal wake propagation at
$c_f$, and ordinary inverse-square wake dilution wherever the current
causal-root law is regular.

The smallest proposed regular-chart foundation is one complete law:

> **Complete Constrained-Response Axiom.** Every architrino velocity lies in
> the closed ball $\mathcal B_{c_f}$. On a regular chart its velocity is
> absolutely continuous, and after the canonical causal-root construction
> supplies a complete finite ordinary net ledger, its constraint reaction lies
> in the radial Euclidean normal cone. The response is applied once, after the
> complete net sum is formed.

The axiom acts only after every ordinary root has been admitted, evaluated at
its canonical weight, and included in the finite net sum. It introduces no new
numerical scale. The minimal-selection theorem in Section 2 derives the
least-change tangent-cone response a.e. from these proposed solution-form
clauses. It is not derived from the bare inequality
$\|\mathbf V\|\le c_f$.

A complete closed-domain dynamical system also needs event-domain
commitments. For the exact mirror-collinear encounter studied in Section 12,
the operator has selected this minimum convention for review:

> **Minimal Collinear Partner-Contact Postulate.** At the exact same-path
> coincidence of the two labeled partners, the ordinary
> positive-separation, isolated-reception ledger contains no contact row. The
> zero-radius point-emission delta is source bookkeeping and is not a partner
> acceleration contribution. The separately recorded contact event contributes
> zero velocity impulse:
>
> $$
> \Delta\mathbf V_{i,\mathrm{contact}}=\mathbf0
> \qquad\text{for each participating label }i.
> $$

This is a proposed event law, not a result derived from the point-emission
delta, the positive-separation ordinary domain, or the constrained-response
axiom. Its event record owns the nonisolated partner-contact family and the
limiting incoming-root transition exactly once, while assigning neither an
ordinary reception row nor an acceleration to the source delta at
coincidence.

### Required history and reset interface

The delayed equation is not a finite-dimensional ordinary differential
equation. A candidate state at reception time $T$ must include an extended
retained history, not only instantaneous positions and velocities. Write the
required state schematically as

$$
\mathfrak h_T
=
\left(
\left\{\mathbf X_i,\mathbf V_i\right\}_{(-\infty,T]},
\mathcal E_T,
\mathcal L_T,
\mathcal M_T
\right),
$$

where $\mathcal E_T$ is the labeled emission history and $\mathcal L_T$ is the
ordinary-root and nonordinary-event ownership ledger. The additional record
$\mathcal M_T$ holds the typed receiver and event-update measures without
identifying either with $\mathcal E_T$. The admissible history space
$\mathfrak H$ and its topology are not yet constructed.

A projected state-dependent-delay solution on an interval $I$ would need, at
minimum:

1. Lipschitz paths with velocities $\mathbf V_i\in BV_{\mathrm{loc}}(I)$, so
   $D\mathbf V_i$ is a locally finite vector Radon measure, and locally
   absolutely continuous velocities on every regular open subchart;
2. a complete finite ordinary branch set at almost every reception time;
3. branch separation and a transversality floor
   $|D_t|\ge d_{\min}>0$ away from declared nonordinary events;
4. an inactive-gap condition separating every recorded inactive family from
   admitted ordinary branches;
5. the complete ordinary ledger formed before the proposed tangent-cone
   projection is applied; and
6. post-event history compatibility sufficient to restart the root census
   without losing, duplicating, or reweighting an emission or limiting branch.

These are formulation and theorem obligations, not assumptions already proved
for the candidate model.

For the exact collinear partner event, let
$\mathfrak G_{\mathrm{col}}\subset\mathfrak H^{-}$ be the proposed reset guard.
Membership requires:

- declared left traces
  $\mathbf X_i(T_{\mathrm c}^{-})=\mathbf X_{\mathrm c}$ and
  $\mathbf V_1(T_{\mathrm c}^{-})=c_f\mathbf e$,
  $\mathbf V_2(T_{\mathrm c}^{-})=-c_f\mathbf e$;
- the bounded pre-contact root censuses for both ordered channels
  $1\leftarrow2$ and $2\leftarrow1$ from Section 12;
- a half-open ownership convention: isolated ordinary branches own
  $T<T_{\mathrm c}$, while the typed event owns only the contact stratum at
  $T=T_{\mathrm c}$;
- separately retained labeled source measures
  $\mathsf E_{1,T_{\mathrm c}}$ and $\mathsf E_{2,T_{\mathrm c}}$;
- separate records for the endpoint emissions $s=T_{\mathrm c}$ and for each
  positive-delay family member $s<T_{\mathrm c}$;
- the identified nonisolated partner-emission strata and limiting
  incoming-root transitions in both ordered channels;
- an explicit route for every competing ordinary, tangent, fold, diagonal, or
  other nonordinary stratum; an unclassified competing stratum makes the
  guard fail; and
- geometric ownership records whose aggregate is invariant under any
  orientation-preserving integration reparameterization used to describe the
  same emission stratum without changing absolute time.

The narrow reset is a map

$$
\mathcal R_{\mathrm{col}}
:
\mathfrak G_{\mathrm{col}}
\longrightarrow
\mathfrak J_{\mathrm{col}}^{+},
$$

whose codomain $\mathfrak J_{\mathrm{col}}^{+}$ contains only outgoing contact
one-jets

$$
J_{i,+}^{1}
=
\left(
\mathbf X_i(T_{\mathrm c}^{+}),
\mathbf V_i(T_{\mathrm c}^{+})
\right).
$$

The proposed reset assigns

$$
\mathbf X_i(T_{\mathrm c}^{+})=\mathbf X_{\mathrm c},
\qquad
\mathbf V_i(T_{\mathrm c}^{+})
=
\mathbf V_i(T_{\mathrm c}^{-}),
\qquad
\Delta\mathbf V_{i,\mathrm{contact}}=\mathbf0.
$$

It does not map into a right-hand retained history. The separately labeled
source measures remain nonzero:

$$
\mathsf E_{1,T_{\mathrm c}}\ne0,
\qquad
\mathsf E_{2,T_{\mathrm c}}\ne0.
$$

They remain available to any later ordinary positive-separation reception and
are not partner acceleration contributions at contact. The event update is the
receiver-time atomic measure

$$
\boldsymbol{\mathsf J}^{\mathrm{evt}}_i
=
\Delta\mathbf V_{i,\mathrm{contact}}\,
\delta_{T_{\mathrm c}},
$$

whose coefficient is set to zero by the proposed postulate. That zero
coefficient is not a distributional cancellation, principal value, finite
part, or regulator-independent limit of a receiver measure. The event record
owns the declared contact strata once while preserving both source labels.

Any restart claim would require the reset codomain to be extended with a
compatible outgoing retained-history record, labeled source record, ownership
ledger, and receiver-measure record. None is supplied by the outgoing
one-jets.

### Typed measures and unresolved contact decomposition

The formulation keeps three objects distinct:

| Object | Domain and codomain | Present status |
| --- | --- | --- |
| Source point-emission measure $\mathsf E_{j,s}$ | A labeled spatial Radon measure at fixed emission time $s$. | Canonical source provenance; nonzero at each admitted contact-time emission. |
| Ordinary receiver measure $\boldsymbol{\mathsf R}^{\mathrm{ord}}_{i\leftarrow j,T}$ | A vector-valued source-time measure at fixed receiver event $(i,T)$, obtained by simple-root coarea collapse. | Canonical only on isolated positive-delay roots with $D_t\ne0$. |
| Contact-event update $\boldsymbol{\mathsf J}^{\mathrm{evt}}_i$ | A vector-valued atomic measure in receiver time whose coefficient is $\Delta\mathbf V_{i,\mathrm{contact}}$. | Proposed coefficient zero for the narrow event; not a value of either preceding measure. |

On a compact receiver-time neighborhood $U$ of $T_{\mathrm c}$, define the
ordinary receiver-time measure where the regular rows are locally integrable:

$$
\boldsymbol{\mathsf M}^{\mathrm{ord}}_i(B)
=
\int_B
\sum_j
\boldsymbol{\mathsf R}^{\mathrm{ord}}_{i\leftarrow j,T}(1)\,dT,
\qquad
B\subset U.
$$

A distributional contact formulation must determine whether there is a
parameterization-independent decomposition

$$
\boldsymbol{\mathsf M}^{\mathrm{rec}}_i
=
\boldsymbol{\mathsf M}^{\mathrm{ord}}_i
+
\boldsymbol{\mathsf M}^{\mathrm{contact}}_i
+
\boldsymbol{\mathsf M}^{\mathrm{comp}}_i,
$$

where $\boldsymbol{\mathsf M}^{\mathrm{contact}}_i$ owns the nonisolated
partner-contact stratum and
$\boldsymbol{\mathsf M}^{\mathrm{comp}}_i$ owns every separately typed
competing stratum. Neither measure is presently defined. The response map from
this received measure to $D\mathbf V_i$, and its relation to the separate
event update $\boldsymbol{\mathsf J}^{\mathrm{evt}}_i$, are also unresolved.
The packet therefore does not have complete wake semantics.

For FSC-006, use the following candidate topology on $U$:

1. $\mathbf X_i^{(n)}\to\mathbf X_i$ uniformly,
   $\mathbf V_i^{(n)}\to\mathbf V_i$ in $L^1(U)$, and
   $D\mathbf V_i^{(n)}\stackrel{*}{\rightharpoonup}D\mathbf V_i$ in the space
   of finite vector Radon measures;
2. each $\mathsf E_j^{(n)}\!\restriction_U$ converges weak-* in the finite
   signed Radon measures on
   $\{j\}\times U\times\mathbb R^3$, without merging source labels;
3. each ordered receiver-time measure and each competing-stratum measure
   converges weak-* in its labeled finite vector-Radon space; and
4. event-update measures converge weak-* in receiver time as a separate typed
   component.

For a cap-admissible perturbation that resolves the contact stratum into
ordinary isolated simple roots, the required prove-or-refute statement is

$$
\boldsymbol{\mathsf M}^{\mathrm{ord},(n)}_i
=
\boldsymbol{\mathsf M}^{\mathrm{away},(n)}_i
+
\boldsymbol{\mathsf M}^{\mathrm{split},(n)}_i,
\qquad
\boldsymbol{\mathsf M}^{\mathrm{split},(n)}_i
\stackrel{*}{\rightharpoonup}
\boldsymbol{\mathsf M}^{\mathrm{contact}}_i.
$$

A finite-Radon limit requires uniform local total-variation control. Failure
of that bound, loss of source labels, parameterization-dependent aggregation,
or different limits for admissible perturbation families refutes this
candidate reduction. Convergence of root counts alone proves none of these
measure statements.

The cap-admissible root-monotonicity theorem below implies that one ordered
channel can have at most one isolated simple root. Thus FSC-006 must center on
a single branch with $D_t\to0^+$ resolving a characteristic interval, while
retaining label-separated competing channels. It may not use a quotient of an
infinite raw ledger unless a new nonordinary response law is proposed: the
current foundational proposal forms a complete finite raw ledger first.

#### Open-domain fold total-variation negative control

One standard local fold chart already supplies a negative control. Let

$$
g_\varepsilon(s)
=
a(s-s_0)^2-\varepsilon,
\qquad
a>0,
\qquad
\varepsilon>0.
$$

Its two simple roots and absolute Jacobians are

$$
s_\pm
=
s_0\pm\sqrt{\frac{\varepsilon}{a}},
\qquad
\left|g_\varepsilon'(s_\pm)\right|
=
2\sqrt{a\varepsilon}.
$$

If the vector kernel remains bounded away from zero on this chart, the sum of
the two absolute coarea weights is

$$
\frac{1}{\left|g_\varepsilon'(s_+)\right|}
+
\frac{1}{\left|g_\varepsilon'(s_-)\right|}
=
\frac{1}{\sqrt{a\varepsilon}},
$$

so the local total variation diverges as $\varepsilon^{-1/2}$. The absolute
$1/|D_t|$ weight supplies no orientation-sign cancellation. Special polarity
or vector cancellation can reduce a particular net vector only if it is
proved from the complete same-record ledger; it does not by itself bound the
underlying total variation.

Claim grade: `derived`. This is a conditional local obstruction. The
calculation does not prove that every perturbation of the mirror-contact
interval has this normal form, and it does not define the missing contact
measure. The fold chart is not cap-admissible because its two-root geometry
requires $D_t$ to change sign. It remains a negative control for the canonical
open model and for any broader perturbation class. It is falsified for a
declared event class by a theorem that excludes this chart or proves uniform
local total-variation bounds and one labeled weak-* limit for every admissible
perturbation in that class.

Plainly: in the open model, one tangent root can split into two ordinary roots
whose received measure grows without bound. The ceiling excludes that exact
two-root pattern within one channel, but it does not make the remaining
single-root approach to a characteristic interval finite. FSC-006 still has
to test the raw labeled receiver measure; this calculation is not a contact
law.

Plainly: Hörmander’s correction turns “the roots split correctly” into a real
measure question. The source records, received acceleration, and velocity jump
live in different spaces, and the missing contact measure cannot be set to
zero by naming the jump coefficient zero. The reset still returns only
position-and-velocity data at contact; constructing a compatible right-hand
history remains a separate state-dependent-delay problem.

### Continuous response versus atomic event update

The regular operator maps a completed finite ordinary acceleration ledger to
the absolutely continuous velocity derivative
$\mathbf A_{\mathrm{eff}}=d\mathbf V/dT$. The event operator is the separate
reset $\mathcal R_{\mathrm{col}}$, whose output is an outgoing contact one-jet
and whose proposed atomic coefficient is
$\Delta\mathbf V_{\mathrm{contact}}=\mathbf0$.

A possible rule such as projecting an aggregated trial event increment into
the velocity ball would be a different event postulate. No such rule is
selected here, and the continuous tangent-cone projection does not imply it.

Plainly: projecting an acceleration during regular motion and deciding a
velocity jump at one event are different operations. The packet proposes a
value only for the one narrow collinear event coefficient.

A complete general closed-domain system still needs the broader commitment:

> **Nonordinary Contact Admission and Event Postulate.** Every nonisolated,
> zero-Jacobian, zero-separation, or otherwise nonordinary contact family
> needs declared admission, unique root or event ownership, a finite response
> or terminal disposition, and—if continuation is selected—a unique velocity,
> retained-history, and outgoing-emission update.

Section 4 adds a limited same-transmitter admission convention, and Section 12
applies the proposed minimal partner-contact postulate only to the exact
mirror-collinear event. No general form or disposition is selected for other
nonordinary contacts. The displayed equations therefore define a
**regular-chart partial model with one declared collinear event update**: they
apply while the ordinary root ledger is complete and finite, plus at that one
typed event.

Within that partial model, the following are consequences of the complete
axiom rather than additional postulates: no super-field-speed history; zero
effective impact from the net forward component at the cap; transverse
turning at fixed speed; speed reduction under a backward component; and
straight constant-speed motion for a cap-state collinear case with no
remaining transverse or backward component.

Plainly: the proposed response axiom says where velocity may lie and how a
finite ordinary net acceleration is made admissible. The separate collinear
event postulate says only that one exact partner coincidence adds no velocity
jump. Other nonordinary contacts remain open.

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

Neither the velocity ball nor its boundary supplies a discrete topological
sector:

$$
\pi_1\!\left(\mathcal B_{c_f}\right)=0,
\qquad
\pi_1\!\left(\partial\mathcal B_{c_f}\right)
=
\pi_1(S^2)=0.
$$

Thus a loop of admissible velocities or boundary directions can contract
unless another declared exclusion, separator, or framing prevents the
contraction. The speed constraint alone supplies no braid retention,
generation index, orbit protection, or stability result.

Plainly: velocity may point in any direction, but its tip must stay inside or
on a sphere of radius $c_f$. That sphere constrains speed but does not tie a
topological knot in the motion.

## 2. Complete constrained-response axiom

Let the canonical construction first supply the complete finite ordinary net
ledger

$$
\mathbf A_{\mathrm{ord}}
=
\sum_{\alpha\in\mathcal C_{\mathrm{ord}}}
\mathbf a_\alpha.
$$

No $\mathbf a_\alpha$ is clipped, deleted, duplicated, or reweighted. For the
closed velocity ball, define its tangent cone by

$$
T_{\mathcal B_{c_f}}(\mathbf V)
=
\begin{cases}
\mathbb R^3, & \|\mathbf V\|<c_f,\\[4pt]
\left\{\mathbf a\in\mathbb R^3:
\mathbf V\mathbin{\cdot}\mathbf a\le0\right\},
& \|\mathbf V\|=c_f.
\end{cases}
$$

Define the Euclidean normal cone by

$$
N_{\mathcal B_{c_f}}(\mathbf V)
=
\begin{cases}
\{\mathbf0\}, & \|\mathbf V\|<c_f,\\[4pt]
\{\lambda\hat{\mathbf v}:\lambda\ge0\},
& \|\mathbf V\|=c_f.
\end{cases}
$$

The proposed regular-chart solution law is:

1. $\mathbf V\in AC(I;\mathcal B_{c_f})$;
2. after the complete finite ordinary ledger is formed, there is a radial
   reaction $\mathbf n(T)\in N_{\mathcal B_{c_f}}(\mathbf V(T))$ such that

$$
\dot{\mathbf V}
=
\mathbf A_{\mathrm{ord}}-\mathbf n
\qquad\text{a.e. on }I;
$$

3. the admit-evaluate-sum-respond operation order below is retained.

The closed ball, absolute continuity, radial reaction, and ledger-first order
are clauses of one proposed foundational law. The bare speed inequality still
does not select an acceleration response at one isolated instant.

### Minimal-selection theorem

Under the proposed regular-chart solution law,

$$
\boxed{
\dot{\mathbf V}
=
\mathcal P_{\mathbf V}\!\left(\mathbf A_{\mathrm{ord}}\right)
=
\Pi_{T_{\mathcal B_{c_f}}(\mathbf V)}
\!\left(\mathbf A_{\mathrm{ord}}\right)
=
\underset{
\mathbf a\in T_{\mathcal B_{c_f}}(\mathbf V)
}{\operatorname{arg\,min}}
\left\|\mathbf a-\mathbf A_{\mathrm{ord}}\right\|^2
}
\qquad\text{a.e.}
$$

Indeed, the result is immediate in the interior because the normal cone is
$\{\mathbf0\}$. On the boundary level set
$E=\{T:\|\mathbf V(T)\|=c_f\}$, absolute continuity gives

$$
\frac{d}{dT}\|\mathbf V\|^2=0
\qquad\text{for a.e. }T\in E.
$$

Writing $\mathbf n=\lambda\hat{\mathbf v}$ at such a time therefore gives

$$
0
=
\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}-\lambda.
$$

Because $\lambda\ge0$, boundary times at which the raw radial component is
strictly inward have measure zero; a.e. on $E$,

$$
\lambda
=
\bigl(\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}\bigr)_+.
$$

This is exactly the Euclidean tangent-cone projection and its least-change
arg-min formula. Claim grade: `derived under the proposed foundational law`.
It is falsified by an absolutely continuous ball-valued solution satisfying
the radial normal-cone law whose derivative differs from the displayed
projection on a set of positive measure.

Every rotation-invariant inner product on this velocity space is a positive
scalar multiple of the Euclidean one, so it has the same radial normal line
and the same projection. No robustness claim is made for a more general
state-dependent or anisotropic metric.

Plainly: the proposed law says that regular velocity cannot jump and that the
constraint can react only along the boundary radius. Along an actual regular
solution those clauses force the smallest inward correction almost
everywhere. They do not turn the speed inequality itself into a response law,
and they do not determine an atomic contact update.

The operation order is part of the same proposal:

$$
\boxed{
\text{admit ordinary roots}
\longrightarrow
\text{evaluate every acceleration contribution}
\longrightarrow
\text{sum at one receiver event}
\longrightarrow
\text{apply the response once}
}.
$$

The arriving contributions need not share an emission time. The order is
falsified by any implementation whose final response changes when the same
complete ledger is reordered, repartitioned, or batched differently.

Plainly: first calculate the canonical net acceleration. Then, and only at the
field-speed boundary, choose the closest acceleration that does not point out
of the allowed velocity ball. The closest-response formula is now a theorem
of the proposed regular solution law rather than a separate independent
clause.

### Frozen-ledger constrained layer

For a supplied input $\mathbf f\in L^1_{\mathrm{loc}}(I;\mathbb R^3)$ and
$\mathbf V(T_0)\in\mathcal B_{c_f}$, the fixed-set evolution inclusion

$$
\dot{\mathbf V}
+
N_{\mathcal B_{c_f}}(\mathbf V)
\ni
\mathbf f
$$

has one absolutely continuous ball-valued solution. The normal cone of a
closed convex set is maximal monotone. Thus, for two supplied ledgers and
initial data, its standard contraction estimate is

$$
\|\mathbf V_1(T)-\mathbf V_2(T)\|
\le
\|\mathbf V_1(T_0)-\mathbf V_2(T_0)\|
+
\int_{T_0}^{T}\|\mathbf f_1-\mathbf f_2\|\,dT'.
$$

Claim grade: `derived reduction`. This closes only the response layer with an
externally supplied ledger. FSC-007 still has to place retained histories in
a declared normed phase space, prove the complete ordinary ledger is locally
Lipschitz on a fixed regular chart, integrate position, and close the coupled
fixed-point argument.

Plainly: once the incoming acceleration record is already known, the capped
velocity equation has one stable regular solution. The hard part still open
is proving that the delayed paths themselves produce a unique, sufficiently
regular ledger while they evolve.

## 3. Derived coordinate-free response geometry

For $\mathbf V\ne\mathbf0$, write

$$
\hat{\mathbf v}=\frac{\mathbf V}{\|\mathbf V\|},
\qquad
(z)_+=\max(z,0).
$$

The orthogonal projection derived from the proposed regular solution law
evaluates to

$$
\mathbf A_{\mathrm{eff}}
=
\begin{cases}
\mathbf A_{\mathrm{ord}}, & \|\mathbf V\|<c_f,\\[4pt]
\mathbf A_{\mathrm{ord}}
-
\bigl(\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}\bigr)_+
\hat{\mathbf v}, & \|\mathbf V\|=c_f.
\end{cases}
$$

It preserves all backward and transverse components at the boundary while
removing only the forward speed-increasing component.

For every finite ordinary ledger at the boundary, the radial component is

$$
\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{eff}}
=
\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}
-
\bigl(\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}\bigr)_+
=
\min\!\left(
\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}},0
\right)
\le0.
$$

Hence, along any differentiable projected state-dependent-delay solution that
exists on a regular-history segment,
$d\|\mathbf V\|/dT\le0$ at $\|\mathbf V\|=c_f$. Conditional on existence and
the history, branch-finiteness, separation, and transversality obligations
above, the pointwise response makes the closed velocity ball forward-invariant.
The inequality is derived from the proposed axiom; existence of a solution to
which it applies is not.

This is a derived property of the proposed axiom, not a derivation or adoption
of that axiom. It cannot be evaluated when $\mathbf A_{\mathrm{ord}}$ itself
is undefined, incomplete, or non-locally-finite.

### Boundary geometry: speed, turning, and slowing

At nonzero velocity, decompose a finite raw acceleration into the direction of
motion and the perpendicular plane:

$$
\mathbf A_{\mathrm{ord}}
=
\bigl(\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}\bigr)
\hat{\mathbf v}
+
\mathbf A_\perp,
\qquad
\hat{\mathbf v}\mathbin{\cdot}\mathbf A_\perp=0.
$$

Writing

$$
a_\parallel
=
\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}},
$$

the boundary response is

$$
\mathbf A_{\mathrm{eff}}
=
\begin{cases}
\mathbf A_\perp, & a_\parallel\ge0,\\[4pt]
a_\parallel\hat{\mathbf v}+\mathbf A_\perp,
& a_\parallel<0.
\end{cases}
$$

Thus a forward component has zero effective speed-increasing impact, a
transverse component remains to turn the velocity, and a backward component
remains to reduce speed. Moreover,

$$
\frac{d}{dT}\|\mathbf V\|
=
\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{eff}}
=
\min(a_\parallel,0)
\le0
\qquad
\text{when }\|\mathbf V\|=c_f.
$$

On a cap-state segment with $\mathbf V=c_f\mathbf n$,
$\|\mathbf n\|=1$, and $a_\parallel\ge0$, the proposed law gives

$$
c_f\frac{d\mathbf n}{dT}
=
\mathbf A_\perp,
\qquad
\kappa_{\mathrm{path}}
=
\frac{\|\mathbf A_\perp\|}{c_f^2}.
$$

A circular physical-space path follows only if this curvature is constant and
the normal direction points consistently toward one fixed center. A tangent
acceleration at one instant does not preserve the field-speed sphere by
itself; the response must be applied at every boundary time along an existing
regular solution.

Plainly: the ceiling can permit turning, but the completed wake ledger must
supply both the amount and direction of that turn. A circle is an additional
geometric consequence to prove, not a consequence of touching the sphere.

#### Proposed wash-over rule: three regular boundary cases

For this regular-chart calculation only, call the proposed map

$$
\mathcal W_{\mathbf V}\!\left(\mathbf A_{\mathrm{ord}}\right)
=
\mathbf A_{\mathrm{ord}}
-
(a_\parallel)_+\hat{\mathbf v}
$$

the **wash-over rule**: the positive outward longitudinal part washes over the
velocity boundary, while no transverse or inward part is removed. This is only
another name for the tangent-cone projection derived above; it is not a
second axiom or a rule derived from the bare speed inequality.

- **Pure forward.** If
  $\mathbf A_{\mathrm{ord}}=a_+\hat{\mathbf v}$ with $a_+>0$, then
  $\mathbf A_{\mathrm{eff}}=\mathbf0$ and
  $d\|\mathbf V\|/dT=0$ at the boundary.
- **Pure transverse.** If
  $\mathbf A_{\mathrm{ord}}=\mathbf A_\perp$ with
  $\hat{\mathbf v}\mathbin{\cdot}\mathbf A_\perp=0$, then
  $\mathbf A_{\mathrm{eff}}=\mathbf A_\perp$ and
  $d\|\mathbf V\|/dT=0$ at that boundary instant.
- **Pure backward.** If
  $\mathbf A_{\mathrm{ord}}=-a_-\hat{\mathbf v}$ with $a_->0$, then
  $\mathbf A_{\mathrm{eff}}=-a_-\hat{\mathbf v}$ and
  $d\|\mathbf V\|/dT=-a_-<0$.

These are pointwise regular-boundary calculations. They assume no maximum
acceleration: a transverse acceleration of any finite magnitude is
kinematically admissible at that instant. The speed inequality constrains the
instantaneous radial derivative, not a separately specified path shape. For
the closed ball to remain invariant over an interval, the proposed response
map must apply at every boundary time along a differentiable regular-history
solution; a tangent acceleration by itself neither establishes a
physical-space circle nor supplies a contact continuation.

Plainly: the candidate rule discards only the part of the total ordinary
acceleration that would increase an already maximal speed. A sideways total
can remain, and a backward total can slow the architrino. That says nothing
about how tightly it turns or what happens at a nonordinary event.

#### Regular non-contact two-wake superposition example

Take a receiver at the field-speed boundary with

$$
\mathbf V=c_f\mathbf e_x,
\qquad
a_0>0,
$$

and suppose its complete finite ordinary ledger contains two individually
admitted incoming contributions

$$
\mathbf a_1=2a_0\mathbf e_x,
\qquad
\mathbf a_2=a_0(-\mathbf e_x+\mathbf e_y).
$$

They are first retained exactly as ordinary ledger entries and summed:

$$
\mathbf A_{\mathrm{ord}}
=
\mathbf a_1+\mathbf a_2
=
a_0\mathbf e_x+a_0\mathbf e_y.
$$

Thus $a_\parallel=a_0>0$ and
$\mathbf A_\perp=a_0\mathbf e_y$. Applying the proposed wash-over rule once
to this combined total gives

$$
\mathbf A_{\mathrm{eff}}
=
\mathcal W_{\mathbf V}\!\left(\mathbf A_{\mathrm{ord}}\right)
=
a_0\mathbf e_y,
\qquad
\frac{d}{dT}\|\mathbf V\|=0
\quad\text{at this instant}.
$$

In particular, the prohibited per-row operation would give a different
answer:

$$
\mathcal W_{\mathbf V}(\mathbf a_1)
+
\mathcal W_{\mathbf V}(\mathbf a_2)
=
\mathbf0+a_0(-\mathbf e_x+\mathbf e_y)
\ne
a_0\mathbf e_y.
$$

The local response therefore neither absorbs, reflects, weakens, nor
terminates either wake. Both source-emission records and both propagating wake
contributions remain unchanged; only their one completed ordinary total is
used to calculate the candidate receiver response. This is a hand-checkable
regular non-contact example of the proposed response law, not an adopted law
or a universal physical conclusion.

Plainly: the two wakes are not handled one at a time. Their original arrows
are both kept, added together, and only then passed through the proposed
speed-boundary rule. Here the combined forward part is removed, leaving the
combined sideways part.

#### Kinematic tangent-sphere statement

Independently of the proposed response map, let a differentiable path satisfy
\(\|\mathbf V(T)\|=c_f\) at a boundary event.  Then

$$
\frac{d}{dT}\|\mathbf V\|^2
=
2\mathbf V\mathbin{\cdot}\mathbf A_{\mathrm{eff}}.
$$

Therefore a locally speed-preserving boundary motion satisfies

$$
\mathbf V\mathbin{\cdot}\mathbf A_{\mathrm{eff}}=0.
$$

Its acceleration is tangent to the velocity sphere
\(\partial\mathcal B_{c_f}\).  A strictly inward component
\(\mathbf V\mathbin{\cdot}\mathbf A_{\mathrm{eff}}<0\) decreases speed,
while an outward component
\(\mathbf V\mathbin{\cdot}\mathbf A_{\mathrm{eff}}>0\) is incompatible
with remaining in the closed velocity ball.  This is kinematics of the state
constraint only.  It supplies neither a transverse magnitude nor direction,
does not select a physical-space circle or maximum turning rate, and does not
define a contact continuation or adopt a response law.

These are consequences of the complete proposed axiom. The Euclidean
decomposition is coordinate-free, and no new numerical scale enters.

In the strictly collinear mirror chart, there is no transverse component. If
the only finite raw row is forward and speed-increasing, the cap gives zero
effective acceleration and straight constant-speed motion. That is a special
case of the three-dimensional geometry, not the general rule.

### Regular-chart constrained equation

On a complete finite ordinary causal-root ledger, substitution of the
canonical rows into the proposed axiom gives

$$
\frac{d^2\mathbf X_r}{dT_r^2}
=
\mathcal P_{\mathbf V_r}\!\left[
\sum_t\ \sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}
\kappa\,\sigma_{tr}\,|q_tq_r|
\frac{c_f}{r_{r\leftarrow t}^2\,|D_t|}
\hat{\mathbf r}_{r\leftarrow t}
\right].
$$

Below field speed, $\mathcal P_{\mathbf V_r}$ is the identity, so this is
exactly the existing regular Master Equation. At field speed, the axiom first
forms the complete ordinary root sum and then removes only its net
speed-increasing component. It does not license omission, deletion, or
reweighting of any admitted regular root.

This total-ledger ordering is part of the proposed axiom. A rule that applies
a cap separately to each root row would be a different proposed Master
Equation and is intentionally not assumed here. The axiom does not define a
nonordinary, non-simple, or non-locally-finite cap-state root family; Section 4
supplies only the working same-transmitter co-moving classification.

## 4. Causal-wake interface: working equality admission

The state constraint alone does not answer which causal roots are admitted at
exact field speed. The catalogue below separates the root and event geometries
that the packet must not conflate.

### Event-stratum catalogue

The ordinary and nonordinary geometries must remain typed separately:

| Event stratum | Local condition | Current status and required disposition |
| --- | --- | --- |
| Regular isolated root | $g=0$, positive delay, and $D_t\ne0$. | Canonical ordinary acceleration contribution. |
| Fold root | $g=0$, $D_t=0$, and a nonzero second emission-time derivative on the declared chart. | Nonordinary; requires a fold measure, transition, or terminal rule. |
| Characteristic interval | $g(T_r,T_t)=0$ on an emission-time interval. | Nonordinary; requires interval ownership and a separately declared response. |
| Zero-delay diagonal | $T_t=T_r$ and $r=0$. | Excluded from ordinary reception by the positive-delay domain and $H(0)=0$; any event semantics remain separately typed. |
| Multiple-branch coincidence | Two or more root branches meet at one receiver event. | Each branch or event stratum needs unique ownership before aggregation. |
| Root accumulation | Infinitely many roots occur in a compact emission-time interval. | Not a finite ordinary ledger; requires a locally finite measure law or a terminal disposition. |

There is no separate positive-delay zero-separation causal stratum under the
declared root equation: $g=0$ and $T_t<T_r$ imply
$r=c_f(T_r-T_t)>0$. A zero-range limit can still be singular, but its exact
endpoint lies on the excluded diagonal rather than at positive delay.

The straight same-transmitter cap interval and the mirror-collinear partner
interval are both characteristic geometries. Treating the former as inactive
and the latter as a typed contact event is not a consequence of geometry
alone; it comes from the two separately proposed source-identity and event-
ownership conventions in this packet.

### Root monotonicity under the ceiling

Suppose the retained transmitter history is differentiable and
$\|\mathbf V_t(s)\|\le c_f$ for every relevant emission time. At fixed
receiver event,

$$
\partial_s g_{r\leftarrow t}(T_r,s)
=
D_t
=
c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_t(s)
\ge0.
$$

Therefore $s\mapsto g_{r\leftarrow t}(T_r,s)$ is nondecreasing. Its zero set
in one ordered channel is empty, one point, or one connected characteristic
interval. In particular, one cap-admissible ordered channel cannot contain
two separated isolated roots or a transversal fold. Isolated-root
accumulation outside a zero interval is also impossible. Simultaneous roots
belonging to different ordered channels are not excluded by this theorem.

For a simple root, $D_t>0$. If

$$
D_r
=
c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r(T_r)
\ge0,
$$

then implicit differentiation gives

$$
\frac{dS}{dT_r}
=
\frac{D_r}{D_t}
\ge0.
$$

This branch derivative is not defined on a characteristic interval. Claim
grade: `derived under the proposed closed velocity domain`. The result is
falsified by one cap-admissible differentiable retained history with two
separated roots in the same ordered channel or a simple root with $D_t<0$.

Plainly: if no transmitter can outrun its wakes, one receiver cannot meet two
separate wakefronts from that same transmitter at one instant. It can meet
one front, ride alongside a whole family, or meet none. The whole-family case
is exactly where the ordinary row formula still stops.

Plainly: a fold, a whole interval of roots, the excluded same-time diagonal,
and an infinite root accumulation are different mathematical events. A
complete open-domain model must say which record owns each one and what
response, if any, it produces. The closed candidate removes the per-channel
fold and separated-root cases, but it does not classify a characteristic
interval or simultaneous strata from different channels.

For this provisional framework, use the following proposed working definition
before forming the Master-Equation sum:

> **Isolated-crossing reception rule.** An active ordinary reception is an
> isolated, positive-delay causal root with $D_t\ne0$. A same-transmitter
> co-moving interval at field speed, on which the receiver remains on a past
> emitted wakefront without that wakefront reaching or crossing it, is not an
> ordinary reception row.

Under this convention, a straight field-speed architrino does not receive an
ordinary acceleration row from its own co-moving wake family. The result is
not obtained by summing an infinite family and canceling it: the family is
nonisolated and has $D_t=0$, so it lies outside the ordinary root set
$\mathcal C_{r\leftarrow r}$ before the sum and the ceiling map are evaluated.

The family must nevertheless be recorded as an **inactive co-moving
self-contact interval**, with its transmitter/receiver identity and time
interval. This preserves provenance without treating its members as omitted,
deleted, or reweighted ordinary roots. The rule addresses only the exact
same-transmitter co-moving case. A tangent partner contact, a mixed-direction
cap-state contact, or any other non-simple event remains a separately defined
boundary chart.

Every retained ordinary partner and self root still requires unique ledger
ownership, and any constrained continuation must emit a declared outgoing
retained history. Those are continuing proof obligations, not consequences of
the isolated-crossing rule.

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
For the exact co-moving self family, however, this integral is not an ordinary
Master-Equation calculation: the working equality rule classifies the family
as noncrossing and inactive before an ordinary row weight is assigned. Its
zero ordinary self row therefore comes from the proposed event-domain
classification informed by reception geometry, not from a cutoff, a
cancellation, or a cap applied to a divergent raw self sum.

This is a provisional admission convention. A later complete wake/account law
must still state its measure and provenance, especially for mixed-direction or
transverse cap-state contributions. The convention does not erase an emission;
it records a nonordinary self-contact family while assigning it no ordinary
reception row.

### Event-domain boundary, not an infinity prescription

The complete constrained-response axiom receives a vector only after the
ordinary root construction has produced a complete finite net ledger. It does
not turn an undefined root family into the zero vector.

This distinction is decisive at partner contact. For every strict
positive-delay member $S<T$ of a co-moving contact family, the causal equality
gives

$$
r(T,S)=c_f(T-S)>0.
$$

The pointwise inverse-square factor is therefore evaluated at positive
separation. The ordinary formula fails because the family is nonisolated and
$D_t=0$, so the causal delta cannot collapse to a discrete finite ledger with
unique ordinary-root ownership. The first missing object is an event-domain
admission, measure, ownership, and disposition rule—not a numerical cure for
an infinite ordinary row.

The zero-delay, zero-separation diagonal remains outside ordinary reception,
and a separately prescribed straight separating right trace can generate a
zero-range divergent row. Those are different statements. Neither one assigns
a disposition to the positive-delay nonisolated partner-contact family.

For the exact mirror-collinear event only, the proposed Minimal Collinear
Partner-Contact Postulate supplies that missing disposition: the family is
owned by one contact event, contributes no ordinary row, and gives
$\Delta\mathbf V_{\mathrm{contact}}=\mathbf0$. This is an added event law. It
does not follow from projecting a vector, and it does not change any ordinary
positive-separation isolated row before or after the event.

Plainly: the boundary response can act on a finite list of received rows. At
partner contact there is no ordinary list to project. The proposed collinear
postulate separately declares what the exact event does, without calling its
nonordinary family an infinite ordinary acceleration.

## 5. Collinear chart as a special case

For the mirror-symmetric collinear encounter, the velocity-sphere condition
reduces to the scalar statement that the signed speed cannot increase beyond
$c_f$. Conditional on MEC-007's `Awaiting verification` incoming packet, the
first arrival at that sphere occurs at positive separation. This is an input
hypothesis here, not an accepted theorem. It does not decide whether the
constrained path turns, has a boundary event, or travels along the boundary.

A nonzero interval on the boundary is especially diagnostic: the unmodified
sharp root condition produces a non-simple continuum of co-moving candidates.
The working equality rule above classifies the exact same-transmitter family
as inactive rather than as ordinary roots. The inverse-square tail observation
is finite from a separately given positive radius, but it does not by itself
decide any other zero-Jacobian contact.

## 6. Mathematical sequence

1. State the complete constrained-response axiom on finite ordinary charts.
2. Record the limited same-transmitter equality convention.
3. Apply the proposed zero-impulse postulate at the exact mirror-collinear
   partner contact and return only its outgoing contact one-jet.
4. Define the source-provenanced receiver-side contact and competing-stratum
   measures in the candidate Radon topology.
5. For cap-admissible perturbations, prove or refute the single-root
   $D_t\to0^+$ receiver-measure limit, uniform total-variation control, and
   parameterization-independent weak-* convergence.
6. Define a locally finite post-contact response measure and compatible
   outgoing retained-history record.
7. Prove existence and uniqueness on an open post-contact interval.
8. Extend event-domain admission and ownership to other nonordinary contacts.
9. Recompute the complete root ledger and outgoing retained history.
10. Only then test binary, braid, translating-assembly, and observer-level
   Lorentz-recovery consequences.

## 7. Causal reception geometry

For a receiver event $(i,T)$ and an emission from path $j$ at $S<T$, define the
causal-surface function

$$
g_{ij}(T,S)
=
\left\|\mathbf X_i(T)-\mathbf X_j(S)\right\|-c_f(T-S).
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

On a chart with a finite set of ordinary, finite causal receptions, write the
complete ordinary net ledger acceleration as

$$
\mathbf A_{\mathrm{ord}}(T)
=
\sum_{\alpha\in\mathcal C_{\mathrm{ord}}(T)}
\mathbf a_\alpha(T).
$$

The proposed axiom gives the total-ledger rule

$$
\frac{d\mathbf V}{dT}
=
\mathcal P_{\mathbf V}\!\left(\mathbf A_{\mathrm{ord}}(T)\right),
$$

where $\mathcal P_{\mathbf V}$ is the finite-ledger tangent-cone response map
in Section 3. The cap-state co-moving contact family from Section 7 is not
included in $\mathcal C_{\mathrm{ord}}(T)$ as an ordinary root. Other partner
or non-collinear roots remain subject to the same normal root-admission and
finite-ledger requirements.

For any sufficiently regular projected solution on this finite ordinary chart,
the boundary inequality is

$$
\frac{d}{dT}\|\mathbf V\|^2
=
2\mathbf V\mathbin{\cdot}\frac{d\mathbf V}{dT}
\le0.
$$

Thus forward invariance is conditional on the existence of the projected
state-dependent-delay solution and its complete finite ordinary ledger. The
pointwise inequality follows from the proposed axiom rather than an
after-the-fact velocity clamp; it does not prove that such a solution exists.

## 9. First derived geometric consequences

### Interior recovery

While $\|\mathbf V\|<c_f$, $\mathcal P_{\mathbf V}$ is the identity. The capped
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

1. Recheck the stationary collinear mirror release through its conditional
   MEC-007 first boundary, now using the finite-ledger capped operator.
2. Classify whether a cap-state interval has only a co-moving self-contact
   family and the persistent partner row, or whether another root/boundary
   appears first.
3. Calculate the first off-axis perturbation: which wake components bend,
   which slow, and which are projected out at the field-speed sphere.
4. Only after those local charts are controlled, calculate equal-radius
   phase-offset braid geometry and translating-assembly velocity composition.

## 11. Full-geometry target

The desired end state is one delayed constrained dynamical system containing:

- persistent architrino paths and their retained histories;
- causal-wake propagation at $c_f$;
- an isolated-crossing reception geometry;
- a finite-ledger tangent-cone response; and
- an event rule for any nonordinary root or retained-history boundary.

The test is not whether a cap can be stated. The test is whether this single
system yields finite, unique histories and useful geometry without adding
case-specific rules for collinear pairs, Braids, or translating assemblies.

## 12. First conditional calculation: stationary mirror cap segment

This section applies the proposed partial model only to the conditional
stationary, mirror-symmetric collinear incoming chart. Let $q(T)>0$ be the
half-separation and let $u=-dq/dT$ be each inward speed in units $c_f=1$.
Assume the `Awaiting verification` MEC-007 input supplies an event $T_\ast$
with

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
non-transverse boundary $s=T_\ast$ with $1-u(s)\to0$. More strongly, every
partner emission on the cap interval satisfies the causal equality:

$$
\left\|
\mathbf X_r(T_\ast+q_\ast)-\mathbf X_t(s)
\right\|
=
T_\ast+q_\ast-s,
\qquad
T_\ast\le s<T_\ast+q_\ast.
$$

This is a non-isolated positive-delay partner-contact interval with $D_t=0$,
not an ordinary partner reception. The working same-transmitter
self-contact convention does not classify it.

Plainly: conditional on the MEC-007 input and the regular-chart response, the
pair can travel at field speed from the assumed first boundary to coordinate
coincidence without the super-field self-root birth. At coincidence the next
object is an entire partner contact family rather than one ordinary root, so
the proposed collinear event postulate—not the ordinary ledger—owns it.

### Proposed reset and outgoing contact one-jet

Let the two incoming labeled velocities at coincidence be

$$
\mathbf V_1(T_{\mathrm c}^{-})=c_f\mathbf e,
\qquad
\mathbf V_2(T_{\mathrm c}^{-})=-c_f\mathbf e.
$$

The Minimal Collinear Partner-Contact Postulate declares no ordinary contact
row and

$$
\Delta\mathbf V_{i,\mathrm{contact}}
=
\mathbf V_i(T_{\mathrm c}^{+})
-
\mathbf V_i(T_{\mathrm c}^{-})
=
\mathbf0.
$$

The reset therefore returns the velocity-preserving outgoing contact one-jet

$$
\mathbf V_i(T_{\mathrm c}^{+})
=
\mathbf V_i(T_{\mathrm c}^{-}).
$$

This is the full consequence presently licensed by the postulate. A one-jet
specifies position and one-sided velocity at $T_{\mathrm c}$; it does not imply
a right-hand path expansion, separation, passage, or a solution on any interval
$(T_{\mathrm c},T_{\mathrm c}+\varepsilon)$.

Plainly: the postulate supplies outgoing position-and-velocity data at the
contact. It does not yet supply even a short path after the contact.

The independent bounded recheck in
[capped-collinear-endpoint-reanalysis.md](capped-collinear-endpoint-reanalysis.md)
shows that the old partner row has finite accumulated raw contribution on the
open segment even though its pointwise weight diverges at the endpoint. The
candidate projected contribution is zero throughout that open segment. The
same recheck also shows that an explicitly prescribed unaccelerated straight
separating right trace would produce a new zero-range partner row with a
nonintegrable inverse-square contribution. This is a conditional obstruction
for that trace, not a universal continuation no-go. The general near-contact
question is the queued
[separating-trace incompatibility theorem target](near-contact-separating-trace-incompatibility-theorem-target.md).

### First transverse linearization

Fix the right receiver on the open cap segment, with

$$
\hat{\mathbf v}_r=-\mathbf e_x,
\qquad
\mathbf A_{\mathrm{raw}}=a_0\hat{\mathbf v}_r,
\qquad
a_0>0.
$$

Let $\delta\mathbf y_r(T)$ and $\delta\mathbf y_t(s)$ be transverse position
perturbations of the receiver and its unique old partner emission, and let
$R=T-s$. At first order, transverse displacement does not change the root time,
range, or $D_t$. It changes only the arriving direction:

$$
\delta\hat{\mathbf r}
=
\frac{
\delta\mathbf y_r(T)-\delta\mathbf y_t(s)
}{R}.
$$

Linearizing the active boundary projection gives

$$
\delta\mathbf A_{\mathrm{eff}}
=
-a_0
\left[
\frac{
\delta\mathbf y_r(T)-\delta\mathbf y_t(s)
}{R}
+
\delta\hat{\mathbf v}_r(T)
\right].
$$

The first-order response is purely transverse: it bends the path. The positive
longitudinal partner component remains projected out, and no first-order
speed-reducing component appears while the projection stays on its strictly
positive branch. A change of sign in the raw speed component is a separate
nonsmooth chart of the saturation map.

Plainly: a small sideways displacement changes which sideways direction the
old partner wake points, and a small sideways velocity changes the velocity
sphere's tangent plane. Those are the two first-order bending terms.

For any unit-speed path segment,

$$
\left\|
\mathbf X(T)-\mathbf X(S)
\right\|
\le
T-S.
$$

Equality holds only when the velocity direction is constant almost everywhere
on the segment. Therefore a genuinely curved cap-state perturbation has no
positive-delay same-path root on that curved interval; a straight subinterval
retains the non-isolated co-moving self-contact family. This statement concerns
same-path geometry only and does not exclude a new partner root or another
boundary event.

Claim grade: `derived first-order conditional result` on the open cap segment.
It is not a stability result. It is falsified by a direct first variation of
the same root and total-ledger projection that produces a nonzero first-order
longitudinal term while the base raw speed component remains strictly
positive.

### Claim boundary

This is a conditional calculation inside the proposed capped model. It does
not prove or adopt the complete constrained-response axiom or the Minimal
Collinear Partner-Contact Postulate, generalize the event rule, establish a
right-hand path, or advance MEC-007. Conditional on the two proposed laws, it
establishes only the velocity-preserving outgoing contact one-jet. The
open-segment ledger is falsified if it develops an additional ordinary root or
boundary before the stated coincidence event. The endpoint classification is
falsified if a complete same-record census makes the partner-contact family
ordinary and finite under an already accepted rule.

## Appendix A — Alternate response hypothesis: transverse redirection

This appendix is outside the regular-chart minimal-response model developed
above. It records a distinct conditional response hypothesis and is not part
of the provisional postulate set.

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

Claim grade: `conditional alternate-response hypothesis`. Its first
obligations are a geometry-derived transverse direction, a defined response
magnitude, unique wake ownership, and a complete event rule wherever the
ordinary finite-ledger premise fails. No such law is selected here.

Plainly: redirection is a different proposed dynamics, not an interpretation
of the minimal projection. It stays in an appendix until its direction,
magnitude, provenance, and contact-event behavior are derived.

## Appendix B — Conditional prescribed six-path reference geometry

This section defines a deliberately simple six-label reference geometry for
the capped-response questions. It uses no inherited program label and makes no
claim that the geometry is a retained physical branch or a spatial link. It is
placed in an appendix because its paths are prescribed tests of the
regular-chart response, not solutions produced by the partial model.

### Reference conditions

- The common group velocity is zero: the braid center is fixed in the Euclidean
  void frame.
- There is no external acceleration contribution. Only the braid's own
  causal-wake ledger may act.
- There are three persistent opposite-polarity pairs, each with the same
  circular radius $R$, the same angular frequency $\omega$, and antipodal pair
  members.
- The three circular planes are mutually orthogonal, sharing one center. This
  is a concrete first geometry, not a requirement for every future braid.
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

For the vector calculation, write the polarity assignment as

$$
q_{a,\epsilon}=s_a\epsilon q_0,
\qquad
s_a\in\{+1,-1\}.
$$

A simultaneous reversal of all $s_a$ changes no pairwise polarity product.
Therefore one may fix $s_1=1$ and check the four relative orientations
$(s_1,s_2,s_3)\in\{(1,1,1),(1,1,-1),(1,-1,1),(1,-1,-1)\}$.

Plainly: this is six architrinos in three opposite-polarity pairs. Each pair
traces one circle of the same radius, the circles lie in the three coordinate
planes, and their phase clocks are spaced evenly by one third of a turn.

### What the geometry must still earn

This kinematic reference is not yet self-reinforcing. To become a retained
six-worldline solution, its complete delayed partner and self-root ledger must
show, for every one of the six labels:

1. the required transverse turning $c_f^2/R$;
2. zero net speed-changing component at the field-speed boundary under the
   chosen cap response;
3. zero forbidden out-of-plane drift, or a declared three-dimensional closure
   replacing that planar statement;
4. complete root, phase, and retained-history closure under the same record;
   and
5. a finite response at every nonordinary root or phase-topology boundary.

### Dimensionless causal-root equations

Set $c_f=R=\omega=1$ and define the positive-member unit paths

$$
\begin{aligned}
\mathbf u_1(\theta)&=(0,\cos\theta,\sin\theta),\\
\mathbf u_2(\theta)&=(\sin\theta,0,\cos\theta),\\
\mathbf u_3(\theta)&=(\cos\theta,\sin\theta,0).
\end{aligned}
$$

For a receiver $(a,\epsilon)$ at $T$, a transmitter $(b,\eta)$ at
$S=T-\tau$, and $p=\epsilon\eta$, the positive-delay root equation is

$$
F_{ab}^{p}(T,\tau)
=
2-2pC_{ab}(T,\tau)-\tau^2
=
0,
\qquad
0<\tau\le2,
$$

where

$$
C_{ab}(T,\tau)
=
\mathbf u_a(T+\phi_a)
\mathbin{\cdot}
\mathbf u_b(T-\tau+\phi_b).
$$

The six ordered cross-plane functions are

$$
\begin{array}{c|c}
(a,b) & C_{ab}(T,\tau)\\
\hline
(1,2) & \sin(T+\phi_1)\cos(T-\tau+\phi_2)\\
(1,3) & \cos(T+\phi_1)\sin(T-\tau+\phi_3)\\
(2,1) & \cos(T+\phi_2)\sin(T-\tau+\phi_1)\\
(2,3) & \sin(T+\phi_2)\cos(T-\tau+\phi_3)\\
(3,1) & \sin(T+\phi_3)\cos(T-\tau+\phi_1)\\
(3,2) & \cos(T+\phi_3)\sin(T-\tau+\phi_2).
\end{array}
$$

For $a=b$, $C_{aa}=\cos\tau$. The same-label equation has no
positive-delay solution because

$$
2\sin\!\left(\frac{\tau}{2}\right)<\tau
\quad
\text{for }\tau>0.
$$

The antipodal member of the same pair has the unique root

$$
2\cos\!\left(\frac{\tau_{\mathrm{pair}}}{2}\right)
=
\tau_{\mathrm{pair}},
\qquad
\tau_{\mathrm{pair}}
\approx
1.47817026643042.
$$

Plainly: every delayed-root calculation has been reduced to one scalar delay
$\tau$. The same architrino has no positive-delay circular self root, while its
antipodal partner has one time-independent root.

### Exact root-count theorem

For every cross-plane same-time pair, the declared phase offsets give

$$
\left|C_{ab}(T,0)\right|
\le
\frac{2+\sqrt3}{4}
<1.
$$

Thus distinct labels never coincide at equal time, and their causal residual
$g(\tau)=\|\mathbf X_i(T)-\mathbf X_j(T-\tau)\|-\tau$ starts positive at
$\tau=0$. It is nonpositive at $\tau=2$ because both points lie on the unit
sphere. Moreover,

$$
\frac{dg}{d\tau}
=
\hat{\mathbf r}\mathbin{\cdot}\mathbf V_j(T-\tau)-1
\le0.
$$

The residual cannot vanish on an interval: that would require a changing
circular transmitter velocity to remain aligned with one fixed tangent ray.
Hence each ordered distinct-label channel has exactly one positive-delay root.

Every such root is simple. If $D_t=0$, then
$\hat{\mathbf r}=\mathbf V_j$ and

$$
\mathbf X_i
=
\mathbf X_j+\tau\mathbf V_j.
$$

But $\|\mathbf X_j\|=\|\mathbf X_i\|=\|\mathbf V_j\|=1$ and
$\mathbf X_j\mathbin{\cdot}\mathbf V_j=0$, which would imply
$1=1+\tau^2$ for $\tau>0$, a contradiction. Therefore $D_t>0$.
The same tangent-line argument at the receiver gives $D_r>0$, so every root
has positive signed playback $dS/dT=D_r/D_t$ on this reference geometry.

It follows that, at every reception time in the common period, the exact
ordered inventory is:

- six same-label channels with no positive-delay ordinary root;
- six ordered antipodal same-pair roots; and
- twenty-four ordered cross-plane roots.

The total is exactly thirty simple ordinary roots, five for each receiver.
Simultaneous sign reversal
$(\epsilon,\eta)\mapsto(-\epsilon,-\eta)$ preserves each scalar root, reducing
the cross-plane calculation to twelve $(a,b,p)$ families with multiplicity two.
There are no transmitter-side folds or tangent roots on this reference
geometry.

Plainly: the root count no longer depends on a time scan. Geometry proves that
every architrino receives exactly one ordinary root from each of the other five
labels and none from itself, throughout the whole period.

Claim grade: `derived geometry theorem` for the prescribed reference paths,
not for an evolved or retained braid. It is falsified by an exact
positive-delay same-label root, a same-time distinct-label coincidence, or a
positive-delay distinct-label root with $D_t=0$ on these paths.

### Configuration-space status of the prescribed paths

For each antipodal pair, the two labels traverse the same unparameterized
circle with a half-period phase shift. The three mutually orthogonal carrier
circles also intersect pairwise as spatial subsets. Their union is therefore
not a six-component embedded spatial link, and ordinary link, knot, or writhe
invariants are not defined for that union of traces.

The exact no-equal-time-collision result above instead makes the periodic
primary object the labeled configuration loop

$$
\Gamma
:
S_T^1
\longrightarrow
\operatorname{Conf}_6(\mathbb R^3),
\qquad
\Gamma(T)
=
\left(
\mathbf X_1(T),\ldots,\mathbf X_6(T)
\right).
$$

For freely moving labeled points in three dimensions, this configuration
space does not supply the planar braid-group protection of a constrained
two-dimensional braid. Any later Assembly Atlas classification must therefore
retain the extra structures that are actually forbidden to change, such as a
declared framing, carrier or separator constraints, polarity labels, the
causal-root ledger, and event ownership. A schematic future record is

$$
\mathfrak A
=
\left[
\Gamma;
\mathfrak f;
\mathcal L_{\mathrm{root}};
\mathcal S_{\mathrm{sep}};
\mathcal E_{\mathrm{event}}
\right],
$$

but no such retained record is certified by this appendix.

Plainly: the drawn circles cross or coincide as tracks, but the six labels do
not occupy the same point at the same time. The legitimate object is their
labeled motion plus any declared constraints and causal records, not a picture
of six linked spatial loops.

### Reproducible numerical root inventory

The independent theorem above supplies the root count. The geometry-only
instrument
[equal-radius-three-pair-root-geometry.mjs](../../../scripts/field-speed-ceiling/equal-radius-three-pair-root-geometry.mjs)
reconstructs the roots directly from the three-dimensional paths and evaluates
their vectors without importing an EOM solver trajectory.

On $2{,}881$ uniform reception-time samples, it evaluated $86{,}430$ ordinary
roots. The sampled delay range was
$[0.2163818719,1.9446736250]$, the sampled $D_t$ floor was
$0.2557068327$, the sampled $D_r$ floor was $0.2557066703$, and sign-reversed
mirror delays agreed to the printed floating-point resolution. These are
measured diagnostic margins, not interval-certified global bounds. The
analytic theorem, rather than the time scan, establishes the count, positive
playback, and absence of folds.

Plainly: the numerical calculation reproduces the theorem and supplies useful
delay and Jacobian scales, but the proof of thirty roots does not depend on
whether the time grid happened to sample a narrow event.

### All-label vector-closure test

Let $\lambda=\kappa q_0^2>0$. For the root from $(b,\eta)$ to
$(a,\epsilon)$, define the unit-coupling row

$$
\mathbf a_{a\epsilon\leftarrow b\eta}^{(0)}
=
s_as_b\epsilon\eta
\frac{
\hat{\mathbf r}_{a\epsilon\leftarrow b\eta}
}{
\tau^2D_t
},
$$

and sum all five rows to obtain
$\mathbf A_{a,\epsilon}^{(0)}(T)$. Positive $\lambda$ scales the total-ledger
projection homogeneously.

For the prescribed unit circle to satisfy the minimal total-ledger response,
the projected acceleration must equal

$$
\frac{d\mathbf V_{a,\epsilon}}{dT}
=
-\mathbf X_{a,\epsilon}.
$$

With
$\mathbf b_{a,\epsilon}
=
\mathbf X_{a,\epsilon}\mathbin{\times}\mathbf V_{a,\epsilon}$,
three necessary conditions are:

1. $\mathbf V\mathbin{\cdot}\mathbf A^{(0)}\ge0$, so the cap removes rather
   than retains the raw speed-changing component;
2. $\mathbf b\mathbin{\cdot}
   \mathcal P_{\mathbf V}(\mathbf A^{(0)})=0$; and
3. $-\mathbf X\mathbin{\cdot}
   \mathcal P_{\mathbf V}(\mathbf A^{(0)})$ is one positive constant for all
   six labels and all $T$, so one $\lambda$ can supply the required turning.

A separately implemented 100-decimal-place Python/mpmath coordinate-space
oracle at $T=0$ gives the following counterexamples:

| Relative polarity orientation | Receiver | Failing component |
| --- | --- | ---: |
| $(1,1,1)$ | $1+$ | $\mathbf V\cdot\mathbf A^{(0)}=-0.3655392198715$ |
| $(1,1,-1)$ | $1+$ | $\mathbf V\cdot\mathbf A^{(0)}=-0.3655392198715$ |
| $(1,-1,1)$ | $1+$ | $\mathbf b\cdot\mathcal P_{\mathbf V}(\mathbf A^{(0)})=0.8925757279332$ |
| $(1,-1,-1)$ | $2+$ | $\mathbf V\cdot\mathbf A^{(0)}=-0.3301014265762$ |

The versioned
[input specification](../../../scripts/field-speed-ceiling/t0-six-path-oracle-input.v1.json)
binds the normalization, geometry, 100-decimal-place precision, bisection
depth, orientations, and four sign inequalities. The
[receipt](fsc-004-t0-six-path-mpmath-receipt.v1.json) records the input,
canonicalized-specification, and oracle-source SHA-256 hashes, the exact
reproduction command, mpmath version, all thirty root residuals, every
$D_t,D_r$ pair, the same-label chord--arc certificate, and the four full
precision sign values. Its maximum absolute residual is
$1.428734239102844\times10^{-101}$.

The
[receipt test](../../../tests/test_field_speed_ceiling_t0_mpmath_oracle.py)
checks exact receipt reproduction, all three hashes, the thirty-row inventory,
positive $D_t,D_r$, the residual bound, the four published inequalities, and
the non-adoptive claim boundary. That parity verifies durable provenance and
determinism; the coordinate-space implementation is independent of the
unchanged JavaScript time-scan instrument, while the exact theorem above—not
either numerical implementation—owns the root-count proof.

Plainly: the high-precision wording now points to a stored input, calculation,
receipt, and test. The receipt is evidence only for the declared $T=0$ slice;
the analytic theorem supplies the all-time root inventory on the prescribed
paths.

The JavaScript geometry instrument independently reproduces these signs and,
over the declared time grid, reports failure of the necessary conditions for
all four relative polarity orientations. Therefore this equal-radius,
$120^\circ$, mutually orthogonal reference geometry is not an exact
fixed-field-speed solution of the minimal total-ledger response.

Its durable classification in this packet is: **regular-root-complete
prescribed carrier; dynamically rejected under the minimal total-ledger
ceiling response**. It is not a retained braid or a physical assembly.

Plainly: the delayed wakes exist cleanly, but their vectors do not sustain the
six prescribed circles. Depending on the polarity orientation, at least one
architrino is slowed or pushed out of its required circular plane.

Claim grade: `measured negative vector-closure result` on the prescribed paths
and the minimal total-ledger response. The root topology is theorem-grade; the
displayed vector values and the 100-decimal-place receipt are high-precision
$T=0$ diagnostics rather than outward-rounded interval certificates. The
negative result is falsified by an independent same-record evaluation that
reverses every listed nonzero sign, or by a separately adopted cap response
that changes the vector equation. It does not test the unselected excess-wake
redirection candidate.

## Claim boundary

This document is not a derivation of a speed ceiling, a general continuation
law, a root regularization, a regulator-independent contact measure, an
energy/momentum account, a Lorentz result, or a physical claim. It now
establishes the conditional collinear open-segment ledger, its coincidence
partner-contact obstruction, the
velocity-preserving outgoing contact one-jet from one proposed zero-impulse
event postulate, a first
transverse linearization, the exact root topology of one prescribed six-path
reference geometry, and a measured negative vector-closure result for that
geometry. None of those results adopts the ceiling, supplies a finite unique
history on an open post-contact interval, defines the receiver-side contact
measure, proves perturbative weak convergence, retains a braid, or advances a
closure score.
