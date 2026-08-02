# Field-Speed Ceiling: Mathematics, Geometry, and Dynamical System

**Status:** provisional regular-chart partial model for investigation.
**Claim level:** no field-speed ceiling is adopted by this document.
**Reviewed by:** [Jack K. Hale read-only review, captured 2026-07-31](jack-k-hale-review-response-2026-07-31.md);
[Lars Hörmander read-only review, captured 2026-07-31](lars-hormander-review-response-2026-07-31.md);
[Bill Thurston read-only review, captured 2026-08-01](bill-thurston-review-response-2026-08-01.md);
[Albert Einstein read-only review, captured 2026-08-01](albert-einstein-review-response-2026-08-01.md);
[Albert Einstein second read-only review, captured 2026-08-01](albert-einstein-second-review-response-2026-08-01.md).

## 1. Purpose

Build the proposed field-speed-ceiling model from its smallest mathematical
objects before using special encounter charts. The question is whether one can
place the existing causal-wake dynamics inside a closed architrino velocity
domain without silently changing root admission, wake bookkeeping, or the
meaning of acceleration.

The existing [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md)
remains the reference for the current unbounded velocity domain. This document
develops only a possible alternative model.

## 2. Reading architecture

The document has four mathematical layers.

1. The compact foundation, Section 5, and Sections 6--9 define the proposed
   ceiling law, its parameter regimes, coordinate-free response geometry, and
   the ordinary-root domain on which it acts.
2. Section 10 uses the mirror-collinear encounter as a boundary stress
   test. Its leading proposed resolution is swept-source reception: a
   receiver-side frozen root is recorded but does not create a repeated
   ordinary row. The required event-atom and retained-history laws remain
   unresolved; this is not the model's constructive binary branch.
3. Section 11 organizes circular binaries by path-speed-ceiling regime;
   Section 11.1 derives the shared at-or-below-wake-speed chart and gives the
   equal-speed Dottie specialization.
4. Section 12 begins only after that binary result. It develops the analytic
   three-binary inverse problem, mixed-frequency and scale constraints, and
   the action-transfer target. Section 13 then gives the cycle diagnostics,
   conditional energy interface, and persistence questions.
Plainly: the main constructive path now runs from the proposed response law to
one exact field-speed binary and then, separately, to the equations a Noether
braid must satisfy. The collinear material remains because it tests a different
boundary of the same proposal.

## 3. Provenance and status map

| Material | Status in this document | $c_a$ regime | Authority and boundary |
| --- | --- | --- | --- |
| **Scope and speed regimes** | — | — | — |
| Existing causal-wake setting: Euclidean void, absolute time, persistent paths, wakes at $c_f$, ordinary simple delayed roots, and the regular Master Equation | `canonical premise` | Canonical, unbounded | These are inherited unchanged. They do not themselves impose an architrino path-speed ceiling. |
| Candidate architrino path-speed ceiling $c_a$, compared with wake speed $c_f$ | `investigation parameter` | All three cases | The current canonical path domain has no finite maximum speed. This document investigates three alternatives: $c_a<c_f$, $c_a=c_f$, and $c_a>c_f$. Each needs its own root, ledger, and binary analysis; none is adopted here. |
| **Proposed ceiling law and regular-domain limits** | — | — | — |
| First arrival at the proposed path-speed-ceiling boundary in the mirror encounter | `conditional input` | $c_a=c_f$ only | This is an unverified conditional mirror-encounter input. It is an idealized, isolated, mirror-symmetric head-on encounter with no external asymmetry, in which the two paths approach the same point at the same absolute time. It is not a general nonordinary-event solution. |
| Proposed path-speed-ceiling response: form the full ordinary wake ledger, then prevent only the part of net acceleration that would exceed the ceiling | `proposed foundational law` | All constrained cases | This is the proposed change to the Master Equation. It applies only where the ordinary ledger is complete and finite; it does not define what happens at coincidence, tangency, or any other nonordinary event. For $c_a<c_f$, the path-speed gap excludes transmitter-side tangency, but it does not by itself resolve coincidence or other exceptional events. |
| Results on already-supplied, well-behaved wake ledgers and ordinary simple roots | `derived regular-chart results` | All constrained cases | Given a finite ordinary ledger, the proposed path-speed-ceiling response has one regular velocity evolution. These results classify ordinary root channels and transfer variation along a simple root branch. They do not construct the coupled delayed history, decide an event, or solve coincidence. |
| Limited rule for an isolated same-transmitter crossing | `proposed admission convention` | $c_a>c_f$ only | This applies only to that one stated geometry. For $c_a<c_f$, a positive-delay same-transmitter crossing is excluded by the speed gap. For $c_a=c_f$, equality can occur only on a rigid co-moving interval, not as an isolated crossing. An isolated self-crossing is therefore relevant only if the path domain permits motion above $c_f$. It does not decide partner coincidence, zero separation, folds, or general tangent-root events. |
| Proposed rule at the exact head-on partner coincidence: no ordinary wake row and no velocity jump | `proposed event postulate` | $c_a=c_f$ only | This is only for the idealized mirror-collinear coincidence. It does not cancel a singularity or define a general limiting value; it supplies only the immediate outgoing velocity direction. |
| A full delayed-history state space, solution definition, and rules for carrying history through an event | `unmet formulation and theorem obligations` | All constrained cases | These are needed before claiming existence, uniqueness, continuation, or stability for the actual delayed system rather than for the pointwise response formula. |
| A general rule for every other kind of nonordinary event or tangent root | `missing event-domain postulate` | All constrained cases | The ordinary positive-delay geometry is classified, but the document does not yet say how to admit, assign, update, or retain histories for all exceptional cases. Until it does, this is not a complete dynamical system. |
| **Idealized collinear stress test** | — | — | — |
| Assumed straight head-on motion after first reaching the proposed path-speed ceiling | `conditional hypothesis` | $c_a=c_f$ only | This uses the unverified conditional mirror-encounter input, the proposed path-speed-ceiling response, and the limited same-transmitter crossing rule. |
| What the document can calculate on the open approach before head-on coincidence | `derived conditional result` | $c_a=c_f$ only | It counts the ordinary roots, shows the incoming partner contribution has finite total effect on the open segment, identifies the nonordinary-event obstruction, and gives an immediate no-jump velocity direction. It does not produce a path beyond coincidence. |
| Receiver-side frozen root and swept-source reception | `proposed foundational refinement with derived regular-chart equivalence` | $c_a=c_f$ boundary only | A receiver can remain on one partner wakefront while its received-emission time stays constant. The proposal records that branch as inactive rather than repeatedly adding an ordinary row. Where $D_t,D_r>0$, it reproduces the canonical ordinary measure exactly. It does not yet define event atoms, a complete outgoing history, or an ownership rule for an inherited partner characteristic family carried across coincidence. |
| **Constructive binary program** | — | — | — |
| Exact prescribed circular binary at path speed $c_f$ | `derived exact prescribed-chart compatibility theorem under the proposed foundational law` | $c_a=c_f$ only | The two-member circular history has one ordinary partner wake, a radius-independent delay angle, and the required inward turning component after the proposed response removes its forward speed-increasing part. This selects one radius for that prescribed chart. It does not prove capture, retained dynamics, stability, or a physical binary. |
| **Braid, action, and reference geometry** | — | — | — |
| Equations a three-binary periodic candidate must satisfy | `derived analytic reduction and theorem target` | $c_a=c_f$ only | The document reduces a candidate braid to its root ledger, phase-return arithmetic, path-speed-ceiling condition, and scale equations. It has not found a complete three-binary solution or proved that one is stable. |
| Possible action transfer, binary retuning, and energy language | `typed closure target with conditional identities` | $c_a=c_f$ only | This document states what an eventual action account would have to connect, but it has not derived an event, conservation rule, primitive architrino energy, or a relation to observer-level Planck $h$. |
| Exact root count for one prescribed six-path reference geometry | `derived reference-path theorem` | $c_a=c_f$ only | The result is exact for those chosen paths. It describes a loop of six labeled positions that never coincide at equal time; it is not an evolved or retained braid. |
| Numerical checks of root margins and four polarity choices for the prescribed six-path geometry | `diagnostic` | $c_a=c_f$ only | These calculations test that one chosen geometry and find vector-closure failures. They do not choose a path-speed-ceiling response or establish a physical object. |

Plainly: the document keeps the existing causal geometry and tests one proposed
path-speed-ceiling response. It can calculate several ordinary, well-behaved cases,
but it still lacks a general rule for coincidence events and for carrying the full
delayed history through them. The work is therefore a conditional partial model,
not adopted ceiling dynamics.

## 4. Compact mathematical foundation

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
later at positive distance. A continuum of positive-distance causal intersections can
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
speed ceiling nor a rule for a nonordinary path-speed-ceiling boundary-state root family.

Plainly: a source point measure records what was emitted. The receiver measure
records how isolated causal intersections contribute to acceleration. A coincidence
requires a third, separately typed object rather than identifying these two.

## 5. Proposed axiom budget and partial-model boundary

The compact foundation above supplies Euclidean void, absolute time,
persistent architrino paths, point-delta emission, causal wake propagation at
$c_f$, and ordinary inverse-square wake dilution wherever the current
causal-root law is regular.

The field-speed-ceiling investigation changes none of that preceding geometry,
emission, propagation, or ordinary regular-root contribution. It instead
proposes one complete path-speed-ceiling response for regular charts. Its
least-change boundary formula holds almost everywhere; here and below, that
means it may exclude exceptional event times of measure zero. The proposed
axiom does not supply a general rule for coincidence events or their continuation.

The smallest proposed regular-chart foundation is one complete law:

> **Complete Constrained-Response Axiom.** Every architrino velocity lies in
> the closed ball $\mathcal B_{c_a}$. On a regular chart its velocity is
> absolutely continuous, and after the canonical causal-root construction
> supplies a complete finite ordinary net ledger, its constraint reaction lies
> in the radial Euclidean normal cone. The response is applied once, after the
> complete net sum is formed.

The axiom acts only after every ordinary root has been admitted, evaluated at
its canonical weight, and included in the finite net sum. It takes the candidate
ceiling $c_a$ as its one investigation parameter and introduces no additional
response scale. The minimal-selection theorem in Section 7 derives the
least-change tangent-cone response almost everywhere from these proposed solution-form
clauses. It is not derived from the bare inequality
$\|\mathbf V\|\le c_a$.

### Path-speed-ceiling regimes

The proposed ceiling $c_a$ is distinct from wake speed $c_f$. This document
therefore considers three parameter regimes before specializing any geometry:
$0<c_a<c_f$, $c_a=c_f$, and $c_a>c_f$. It does not select one of them.

For a circular path on the lower boundary $0<c_a<c_f$, write

$$
\lambda=\frac{c_a}{c_f},
\qquad
R|\omega|=c_a.
$$

The delayed-chord construction developed for the circular binary later in the
document gives the modified half-delay equation

$$
\xi=\lambda\cos\xi.
$$

It has one positive root. The Dottie-number relation $\xi=\cos\xi$ is the
special equal-speed case $c_a=c_f$. Thus a lower path-speed ceiling does not
remove the circular-binary question; it changes its delay angle and requires a
new complete-ledger radial-balance derivation.

The three regimes have different regularity consequences:

1. **$c_a=c_f$.** This is the document's current exact prescribed field-speed
   chart. It has the derived radius-independent Dottie angle and one selected
   compatible radius under the proposed response.
2. **$0<c_a<c_f$.** Every ordinary transmitter factor has the uniform bound
   $D_t\ge c_f-c_a>0$. Positive-delay same-transmitter roots are excluded by
   the strict path-speed gap. Section 11.1 derives the compatible radius of
   the prescribed all-past two-label circular chart. That is neither a
   retained-history existence result nor a stability result.
3. **$c_a>c_f$.** The path domain again permits the additional causal-root and
   same-transmitter root families associated with above-wake-speed motion. The
   present regular theory does not supply their admission, ownership,
   continuation, or response law.

The receiver-side frozen-root stratum is available only at the equality
boundary: for $c_a<c_f$, $D_r\ge c_f-c_a>0$, so a simple incoming front crosses
the receiver rather than remaining frozen. Thus the swept-source proposal does
not remove the lower-speed coincidence obstruction. It is a candidate
resolution only for an equality-boundary history whose full outgoing root
census actually contains a frozen branch.

Claim grade: `parameter-regime reduction and theorem target`. The modified
delay equation and the lower-speed root-factor floor are derived from the
declared circular kinematics. No regime here proves a retained history,
binary stability, a selected lower-speed radius, or a reason that the
universe chooses one ceiling value.

Plainly: a maximum architrino speed below the wake speed would give a different
but potentially cleaner binary problem. Equality with wake speed is the
special boundary case developed later as a prescribed chart; a higher ceiling
reopens the difficult root families.

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
2. a declared delay window (or an explicitly all-past local topology) that
   contains every emission time used by a root for receiver times in the
   chart; causal-history factors at root times use left-continuous regulated
   representatives, with separate one-sided traces only where a declared
   event owns them;
3. a complete finite ordinary branch set at almost every reception time,
   together with a selected received-history clock for every active ordered
   channel and a rule for cross-channel aggregation;
4. branch separation and a transversality floor
   $|D_t|\ge d_{\min}>0$ away from declared nonordinary events;
5. an inactive-gap condition separating every recorded inactive family from
   admitted ordinary branches;
6. the complete ordinary ledger formed before the proposed tangent-cone
   projection is applied; and
7. post-event history compatibility sufficient to restart the root count and classification
   without losing, duplicating, or reweighting an emission or limiting branch.

These are formulation and theorem obligations, not assumptions already proved
for the candidate model.

### Typed measures and unresolved nonordinary-event decomposition

The formulation keeps three objects distinct:

| Object | Domain and codomain | Present status |
| --- | --- | --- |
| Source point-emission measure $\mathsf E_{j,s}$ | A labeled spatial Radon measure at fixed emission time $s$. | Canonical source provenance; nonzero at each admitted event-time emission. |
| Ordinary receiver measure $\boldsymbol{\mathsf R}^{\mathrm{ord}}_{i\leftarrow j,T}$ | A vector-valued source-time measure at fixed receiver event $(i,T)$, obtained by simple-root coarea collapse. | Canonical only on isolated positive-delay roots with $D_t\ne0$. |
| Coincidence-event update $\boldsymbol{\mathsf J}^{\mathrm{evt}}_i$ | A vector-valued atomic measure in receiver time whose coefficient is $\Delta\mathbf V_{i,\mathrm{coincidence}}$. | Proposed coefficient zero for the narrow event; not a value of either preceding measure. |

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

A distributional nonordinary-event formulation must determine whether there is a
parameterization-independent decomposition

$$
\boldsymbol{\mathsf M}^{\mathrm{rec}}_i
=
\boldsymbol{\mathsf M}^{\mathrm{ord}}_i
+
\boldsymbol{\mathsf M}^{\mathrm{coincidence}}_i
+
\boldsymbol{\mathsf M}^{\mathrm{comp}}_i,
$$

where $\boldsymbol{\mathsf M}^{\mathrm{coincidence}}_i$ owns the nonisolated
partner-root stratum and
$\boldsymbol{\mathsf M}^{\mathrm{comp}}_i$ owns every separately typed
competing stratum. Neither measure is presently defined. The response map from
this received measure to $D\mathbf V_i$, and its relation to the separate
event update $\boldsymbol{\mathsf J}^{\mathrm{evt}}_i$, are also unresolved.
This document therefore does not have complete wake semantics.

For the proposed receiver-time measure analysis, fix a receiver neighborhood
$U$ and a declared finite delay window $I_W=[T_{\mathrm c}-W,\sup U]$ that
contains every selected emission time for receiver times in $U$. (An all-past
local topology would need to replace this finite-window hypothesis.) Use the
following candidate topology on $U$ and $I_W$:

1. $\mathbf X_i^{(n)}\to\mathbf X_i$ uniformly on $I_W$,
   $\mathbf V_i^{(n)}\to\mathbf V_i$ in $L^1(I_W)$, and
   $D\mathbf V_i^{(n)}\stackrel{*}{\rightharpoonup}D\mathbf V_i$ on $I_W$ in the space
   of finite vector Radon measures;
2. each $\mathsf E_j^{(n)}\!\restriction_{I_W}$ converges weak-* in the finite
   signed Radon measures on
   $\{j\}\times U\times\mathbb R^3$, without merging source labels;
3. each ordered receiver-time measure and each competing-stratum measure
   converges weak-* in its labeled finite vector-Radon space; and
4. event-update measures converge weak-* in receiver time as a separate typed
   component.

For a ceiling-admissible perturbation that resolves the coincidence stratum
into ordinary isolated simple roots, the immediately meaningful target is
local weak-* convergence on compact subsets of the open source-time interval
$s<T_{\mathrm c}$, under an explicit delay-window, trace, kernel, and
label-preservation hypothesis. No finite vector-Radon endpoint measure at
$s=T_{\mathrm c}$ is asserted here.

For the exact mirror chart, the separately calculated endpoint variation has
the residue $K/(2c_f^2)$. Matching that residue across perturbation families is
a proposed consistency target, not an invariant theorem: it requires uniform
asymptotics and an explicitly ordered limiting procedure. Failure of local
variation control, loss of source labels, parameterization-dependent
aggregation, or different admissible-family residues refutes the candidate
reduction. Convergence of root counts alone proves none of these measure
statements.

The ceiling-admissible root-classification theorem below implies that one ordered
channel can have at most one isolated simple root. The analysis therefore retains
label-separated channels and studies a single simple branch approaching a
characteristic interval or zero-range endpoint. It may not use a quotient of
an infinite raw ledger unless a new nonordinary response law is proposed: the
current foundational proposal forms a complete finite raw ledger first.

#### Simple-branch total-variation transfer and zero-range localization

Let $S(T)$ be an injective simple-root branch on a receiver-time set $B$, and
assume $D_t,D_r>0$. Because

$$
\frac{dS}{dT}=\frac{D_r}{D_t},
$$

change of variables gives the exact identity

$$
\int_B
\frac{\|\mathbf K(T,S(T))\|}{D_t(T,S(T))}\,dT
=
\int_{S(B)}
\frac{\|\mathbf K(T(s),s)\|}{D_r(T(s),s)}\,ds.
$$

Consequently, positive range and $D_r$ floors give a uniform branch total-
variation bound that is independent of a vanishing $D_t$ floor. This does not
apply when $D_r$ also vanishes or when the branch ceases to be injective.

In the declared mirror-coincidence channel,

$$
D_r=2c_f,
\qquad
r=c_f(T_{\mathrm c}-s),
$$

so the transferred density is proportional to
$(T_{\mathrm c}-s)^{-2}$. Every truncated far part
$s\le T_{\mathrm c}-\rho$ is finite; the total variation diverges as
$\rho\downarrow0$. Claim grade: `derived for the simple-branch transfer and
mirror localization`.

A remaining theorem must prove or refute a parameterization-independent weak-*
limit for the truncated far part. It requires uniform branch
collapse, receiver left-trace and kernel convergence along the collapsing
reception times, label retention, competing-stratum routing, and independence
from the admissible perturbation family. The current topology's uniform path
and $L^1$-velocity convergence does not by itself supply those moving-time
trace limits. The remaining issue is the zero-range raw-measure tail, complete-ledger sign,
and projected-remainder control.

Plainly: a small transmitter Jacobian makes one instantaneous row large, but
it also squeezes the receiver-time interval carrying that row. Away from zero
range those effects cancel in integrated size. The mirror chart's unresolved
singularity is the inverse-square endpoint, and even its finite far part still
needs a theorem saying every admissible approximation gives the same limit.

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
calculation does not prove that every perturbation of the mirror-coincidence
interval has this normal form, and it does not define the missing coincidence
measure. The fold chart is not ceiling-admissible because its two-root geometry
requires $D_t$ to change sign. It remains a negative control for the canonical
open model and for any broader perturbation class. It is falsified for a
declared event class by a theorem that excludes this chart or proves uniform
local total-variation bounds and one labeled weak-* limit for every admissible
perturbation in that class.

Plainly: in the open model, one tangent root can split into two ordinary roots
whose received measure grows without bound. The ceiling excludes that exact
two-root pattern within one channel. The transfer theorem makes a closed-
channel simple branch finite away from zero range, but the mirror endpoint and
its perturbation-independent limit remain unresolved. This fold calculation
is not a nonordinary-event law.

Plainly: Hörmander’s correction turns “the roots split correctly” into a real
measure question. The source records, received acceleration, and velocity jump
live in different spaces, and the missing nonordinary-event measure cannot be set to
zero by naming the jump coefficient zero. The reset still returns only
position-and-velocity data at coincidence; constructing a compatible right-hand
history remains a separate state-dependent-delay problem.

### Continuous response versus atomic event update

The regular operator maps a completed finite ordinary acceleration ledger to
the absolutely continuous velocity derivative
$\mathbf A_{\mathrm{eff}}=d\mathbf V/dT$. The event operator is the separate
reset $\mathcal R_{\mathrm{col}}$, whose output is the immediate position-and-velocity data at the outgoing coincidence
and whose proposed atomic coefficient is
$\Delta\mathbf V_{\mathrm{coincidence}}=\mathbf0$.

A possible rule such as projecting an aggregated trial event increment into
the velocity ball would be a different event postulate. No such rule is
selected here, and the continuous tangent-cone projection does not imply it.

Plainly: projecting an acceleration during regular motion and deciding a
velocity jump at one event are different operations. This document proposes a
value only for the one narrow collinear event coefficient.

A complete general closed-domain system still needs the broader commitment:

> **Nonordinary Event Admission and Update Postulate.** Every nonisolated,
> zero-Jacobian, zero-separation, or otherwise nonordinary event family
> needs declared admission, unique root or event ownership, a finite response
> or terminal disposition, and—if continuation is selected—a unique velocity,
> retained-history, and outgoing-emission update.

Section 9 adds a limited same-transmitter admission convention, and Section 10.7
applies the proposed minimal partner-coincidence postulate only to the exact
mirror-collinear event. No general form or disposition is selected for other
nonordinary events. The displayed equations therefore define a
**regular-chart partial model with one declared collinear event update**: they
apply while the ordinary root ledger is complete and finite, plus at that one
typed event.

Within that partial model, the following are consequences of the complete
axiom rather than additional postulates: no super-field-speed history; zero
effective impact from the net forward component at the ceiling; transverse
turning at fixed speed; speed reduction under a backward component; and
straight constant-speed motion for a path-speed-ceiling boundary-state collinear case with no
remaining transverse or backward component.

Plainly: the proposed response axiom says where velocity may lie and how a
finite ordinary net acceleration is made admissible. The separate collinear
event postulate says only that one exact partner coincidence adds no velocity
jump. Other nonordinary events remain open.

## 6. Kinematic state

Let an architrino path in Euclidean void be

$$
\mathbf X(T)\in\mathbb R^3,
\qquad
\mathbf V(T)=\frac{d\mathbf X}{dT}.
$$

The proposal replaces the present open velocity domain with the closed ball

$$
\mathcal B_{c_a}
=
\left\{
\mathbf V\in\mathbb R^3:
\|\mathbf V\|\le c_a
\right\}.
$$

The boundary $\partial\mathcal B_{c_a}$ is the path-speed-ceiling sphere. This is a
geometric state constraint, not yet a causal-root rule.

Neither the velocity ball nor its boundary supplies a discrete topological
sector:

$$
\pi_1\!\left(\mathcal B_{c_a}\right)=0,
\qquad
\pi_1\!\left(\partial\mathcal B_{c_a}\right)
=
\pi_1(S^2)=0.
$$

Thus a loop of admissible velocities or boundary directions can contract
unless another declared exclusion, separator, or framing prevents the
contraction. The speed constraint alone supplies no braid retention,
generation index, orbit protection, or stability result.

Plainly: velocity may point in any direction, but its tip must stay inside or
on a sphere of radius $c_a$. That sphere constrains speed but does not tie a
topological knot in the motion.

## 7. Complete constrained-response axiom

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
T_{\mathcal B_{c_a}}(\mathbf V)
=
\begin{cases}
\mathbb R^3, & \|\mathbf V\|<c_a,\\[4pt]
\left\{\mathbf a\in\mathbb R^3:
\mathbf V\mathbin{\cdot}\mathbf a\le0\right\},
& \|\mathbf V\|=c_a.
\end{cases}
$$

Define the Euclidean normal cone by

$$
N_{\mathcal B_{c_a}}(\mathbf V)
=
\begin{cases}
\{\mathbf0\}, & \|\mathbf V\|<c_a,\\[4pt]
\{\lambda\hat{\mathbf v}:\lambda\ge0\},
& \|\mathbf V\|=c_a.
\end{cases}
$$

The proposed regular-chart solution law is:

1. $\mathbf V\in AC(I;\mathcal B_{c_a})$;
2. after the complete finite ordinary ledger is formed, there is a radial
   reaction $\mathbf n(T)\in N_{\mathcal B_{c_a}}(\mathbf V(T))$ such that

$$
\dot{\mathbf V}
=
\mathbf A_{\mathrm{ord}}-\mathbf n
\qquad\text{almost everywhere on }I;
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
\Pi_{T_{\mathcal B_{c_a}}(\mathbf V)}
\!\left(\mathbf A_{\mathrm{ord}}\right)
=
\underset{
\mathbf a\in T_{\mathcal B_{c_a}}(\mathbf V)
}{\operatorname{arg\,min}}
\left\|\mathbf a-\mathbf A_{\mathrm{ord}}\right\|^2
}
\qquad\text{almost everywhere}.
$$

Indeed, the result is immediate in the interior because the normal cone is
$\{\mathbf0\}$. On the boundary level set
$E=\{T:\|\mathbf V(T)\|=c_a\}$, absolute continuity gives

$$
\frac{d}{dT}\|\mathbf V\|^2=0
\qquad\text{for almost every }T\in E.
$$

Writing $\mathbf n=\lambda\hat{\mathbf v}$ at such a time therefore gives

$$
0
=
\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}-\lambda.
$$

Because $\lambda\ge0$, boundary times at which the raw radial component is
strictly inward have measure zero; almost everywhere on $E$,

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
and they do not determine an atomic coincidence update.

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

The arriving contributions need not share an emission time. In exact
arithmetic the order is falsified by a final response that changes when the
same complete ledger is reordered, repartitioned, or batched differently. A
floating-point implementation must instead declare and meet an accumulation
tolerance for that invariance check.

Plainly: first calculate the canonical net acceleration. Then, and only at the
path-speed-ceiling boundary, choose the closest acceleration that does not point out
of the allowed velocity ball. The closest-response formula is now a theorem
of the proposed regular solution law rather than a separate independent
clause.

### Frozen-ledger constrained layer

For a supplied input $\mathbf f\in L^1_{\mathrm{loc}}(I;\mathbb R^3)$ and
$\mathbf V(T_0)\in\mathcal B_{c_a}$, the fixed-set evolution inclusion

$$
\dot{\mathbf V}
+
N_{\mathcal B_{c_a}}(\mathbf V)
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

A constructive catching-up scheme makes the existence route explicit. For a
partition $T_0<T_1<\cdots<T_m$, set

$$
\mathbf F_k
=
\int_{T_k}^{T_{k+1}}\mathbf f(T)\,dT,
\qquad
\mathbf V_{k+1}
=
\Pi_{\mathcal B_{c_a}}\!\left(\mathbf V_k+\mathbf F_k\right).
$$

Nonexpansiveness of the projection gives
$\|\mathbf V_{k+1}-\mathbf V_k\|\le\|\mathbf F_k\|$. The interpolants are
therefore equi-absolutely-continuous for $L^1$ input; they are equi-Lipschitz
when the input is bounded. The projection variational inequality supplies the
discrete normal-cone reaction. Compactness and passage to that inequality
give a subsequential solution, while the contraction estimate gives
uniqueness and hence convergence of the full approximation family. General
$L^1$ input follows by bounded or step-function approximation.

Claim grade: `derived reduction`. This closes only the response layer with an
externally supplied ledger. A remaining history-to-ledger theorem must place retained histories in
a declared normed phase space, prove the complete ordinary ledger is locally
Lipschitz on a fixed regular chart, integrate position, and close the coupled
fixed-point argument.

Plainly: once the incoming acceleration record is already known, the
path-speed-ceiling
velocity equation has one stable regular solution. The hard part still open
is proving that the delayed paths themselves produce a unique, sufficiently
regular ledger while they evolve. The projection scheme constructs the
supplied-ledger solution without pretending that an integrable input is
uniformly bounded.

## 8. Derived coordinate-free response geometry

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
\mathbf A_{\mathrm{ord}}, & \|\mathbf V\|<c_a,\\[4pt]
\mathbf A_{\mathrm{ord}}
-
\bigl(\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}\bigr)_+
\hat{\mathbf v}, & \|\mathbf V\|=c_a.
\end{cases}
$$

It preserves all backward and transverse components at the boundary while
removing only the forward speed-increasing component.

For fixed boundary direction $\hat{\mathbf v}$, this finite-ledger response is
$1$-Lipschitz in the raw net acceleration:

$$
\left\|
\mathcal P_{\mathbf V}(\mathbf A)
-
\mathcal P_{\mathbf V}(\mathbf B)
\right\|
\le
\|\mathbf A-\mathbf B\|.
$$

Indeed, writing
$\mathbf A=a_\parallel\hat{\mathbf v}+\mathbf A_\perp$ gives

$$
\mathcal P_{\mathbf V}(\mathbf A)
=
\min(a_\parallel,0)\hat{\mathbf v}+\mathbf A_\perp,
$$

and $x\mapsto\min(x,0)$ is $1$-Lipschitz. If boundary directions
$\hat{\mathbf v}^{(n)}\to\hat{\mathbf v}$, the effective responses converge
exactly when the corresponding global transverse vectors and retained
backward scalars converge. In particular,

$$
\mathcal P_{\mathbf V}(\mathbf b)=\mathbf0
\quad\Longleftrightarrow\quad
\mathbf b=\lambda\hat{\mathbf v},
\qquad
\lambda\ge0.
$$

These are finite-ledger statements. They neither define the response on an
infinite raw ledger nor make a projected subleading singular remainder
locally integrable.

Plainly: for legitimate finite inputs, small changes in the net acceleration
produce no larger change in the ceiling response. A divergent leading term can
vanish only when it points exactly forward, and that says nothing by itself
about any smaller but still nonintegrable remainder.

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
$d\|\mathbf V\|/dT\le0$ at $\|\mathbf V\|=c_a$. Conditional on existence and
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
\text{when }\|\mathbf V\|=c_a.
$$

On a path-speed-ceiling boundary-state segment with $\mathbf V=c_a\mathbf n$,
$\|\mathbf n\|=1$, and $a_\parallel\ge0$, the proposed law gives

$$
c_a\frac{d\mathbf n}{dT}
=
\mathbf A_\perp,
\qquad
\kappa_{\mathrm{path}}
=
\frac{\|\mathbf A_\perp\|}{c_a^2}.
$$

A circular physical-space path follows only if this curvature is constant and
the normal direction points consistently toward one fixed center. A tangent
acceleration at one instant does not preserve the field-speed sphere by
itself; the response must be applied at every boundary time along an existing
regular solution.

Plainly: the ceiling can permit turning, but the completed wake ledger must
supply both the amount and direction of that turn. A circle is an additional
geometric consequence to prove, not a consequence of touching the sphere.

#### Proposed post-summation ceiling-response rule: three regular boundary cases

For this regular-chart calculation only, call the proposed map

$$
\mathcal W_{\mathbf V}\!\left(\mathbf A_{\mathrm{ord}}\right)
=
\mathbf A_{\mathrm{ord}}
-
(a_\parallel)_+\hat{\mathbf v}
$$

the **post-summation ceiling-response rule**: the positive outward longitudinal part washes over the
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
physical-space circle nor supplies a nonordinary-event continuation.

Plainly: the candidate rule discards only the part of the total ordinary
acceleration that would increase an already maximal speed. A sideways total
can remain, and a backward total can slow the architrino. That says nothing
about how tightly it turns or what happens at a nonordinary event.

#### Regular two-wake superposition example

Take a receiver at the field-speed boundary with

$$
\mathbf V=c_a\mathbf e_x,
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
$\mathbf A_\perp=a_0\mathbf e_y$. Applying the proposed post-summation ceiling-response rule once
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
regular example of the proposed response law, not an adopted law
or a universal physical conclusion.

Plainly: the two wakes are not handled one at a time. Their original arrows
are both kept, added together, and only then passed through the proposed
speed-boundary rule. Here the combined forward part is removed, leaving the
combined sideways part.

#### Kinematic tangent-sphere statement

Independently of the proposed response map, let a differentiable path satisfy
\(\|\mathbf V(T)\|=c_a\) at a boundary event.  Then

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
\(\partial\mathcal B_{c_a}\).  A strictly inward component
\(\mathbf V\mathbin{\cdot}\mathbf A_{\mathrm{eff}}<0\) decreases speed,
while an outward component
\(\mathbf V\mathbin{\cdot}\mathbf A_{\mathrm{eff}}>0\) is incompatible
with remaining in the closed velocity ball.  This is kinematics of the state
constraint only.  It supplies neither a transverse magnitude nor direction,
does not select a physical-space circle or maximum turning rate, and does not
define a nonordinary-event continuation or adopt a response law.

These are consequences of the complete proposed axiom. The Euclidean
decomposition is coordinate-free, and no new numerical scale enters.

In the strictly collinear mirror chart, there is no transverse component. If
the only finite raw row is forward and speed-increasing, the ceiling response gives zero
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

Strictly below the path-speed ceiling, $\mathcal P_{\mathbf V_r}$ is the
identity, so this is exactly the existing regular Master Equation. At the
path-speed ceiling, the axiom first forms the complete ordinary root sum and then removes only its net
speed-increasing component. It does not license omission, deletion, or
reweighting of any admitted regular root.

This total-ledger ordering is part of the proposed axiom. A rule that applies
a ceiling response separately to each root row would be a different proposed Master
Equation and is intentionally not assumed here. The axiom does not define a
nonordinary, non-simple, or non-locally-finite path-speed-ceiling boundary-state root family; Section 4
classifies the possible positive-delay geometry per ordered channel but
supplies only the working same-transmitter co-moving disposition.

## 9. Causal-wake interface: working equality admission

The state constraint alone does not answer which causal roots are admitted at
exact field speed. The catalogue below separates the root and event geometries
that the document must not conflate.

### Event-stratum catalogue

The ordinary and nonordinary geometries must remain typed separately:

| Event stratum | Local condition | Current status and required disposition |
| --- | --- | --- |
| Regular swept simple branch | $g=0$, positive delay, $D_t>0$, and the selected received-history clock is locally increasing; $D_r$ may vanish only at isolated receiver-side tangency instants. | Canonical ordinary contribution on the regular swept part. Section 10.9 gives a proposed source-swept formulation that agrees there. |
| Isolated receiver-side tangency | $g=0$, positive delay, $D_t>0$, $D_r=0$ at one receiver time, but the selected clock is not locally constant. | It is not a frozen interval. The proposed measure formulation retains its ordinary swept contribution; a pointwise event convention is not separately asserted. |
| Receiver-side frozen interval | $g=0$ on a nondegenerate receiver-time interval, $D_t>0$, and the selected emission time is constant throughout that interval. | Proposed nonordinary stratum: the receiver rides one already-received wakefront rather than receiving newly swept source history. Its proposed inactive disposition is given in Section 10.9. |
| Degenerate isolated root | $g=0$, positive delay, $D_t=0$, and the zero is isolated. | Nonordinary. On a $C^2$ ceiling-admissible chart the quadratic fold coefficient vanishes. Under an additional $C^3$ nonzero-third-derivative hypothesis, the local crossing is cubic; higher odd order or flat crossings remain possible. |
| Characteristic interval | $g(T_r,T_t)=0$ on a nondegenerate emission-time interval. | Nonordinary. The rigidity theorem below forces an exact-aim straight ceiling-speed chord, but geometry alone supplies no interval ownership, endpoint transition, or response. |
| Zero-delay diagonal | $T_t=T_r$ and $r=0$. | Excluded from ordinary reception by the positive-delay domain; any event semantics remain separately typed. |
| Cross-channel simultaneity | Roots or nonordinary strata from two or more ordered channels occur at one receiver event. | Per-channel classification does not determine their joint ownership or aggregation. |
| Open-domain quadratic fold | $g=0$, $D_t=0$, and a nonzero second emission-time derivative. | Impossible on a $C^2$ ceiling-admissible channel; retained below as a negative control for the canonical open model or a broader perturbation class. |

There is no separate positive-delay zero-separation causal stratum under the
declared root equation: $g=0$ and $T_t<T_r$ imply
$r=c_f(T_r-T_t)>0$. A zero-range limit can still be singular, but its exact
endpoint lies on the excluded diagonal rather than at positive delay.

The straight same-transmitter ceiling interval and the mirror-collinear partner
interval are both characteristic geometries. Treating the former as inactive
and the latter as a typed coincidence event is not a consequence of geometry
alone; it comes from the two separately proposed source-identity and event-
ownership conventions in this document.

### Root monotonicity under the ceiling

Suppose the retained transmitter path is Lipschitz with speed bounded by
$c_f$. At a fixed receiver event, let
$r(s)=\|\mathbf X_r(T_r)-\mathbf X_t(s)\|$. For $s_2>s_1$, the reverse
triangle inequality and the speed bound give

$$
r(s_2)
\ge
r(s_1)-c_f(s_2-s_1).
$$

Therefore

$$
g(T_r,s_2)-g(T_r,s_1)
=
r(s_2)-r(s_1)+c_f(s_2-s_1)
\ge0.
$$

Thus $s\mapsto g(T_r,s)$ is nondecreasing without requiring the range to be
differentiable. Its zero set in one ordered channel is empty, one point, or
one connected interval. A singleton is either simple or degenerate. One
ceiling-admissible ordered channel cannot contain two separated isolated roots, a
quadratic fold, or isolated-root accumulation outside a zero interval.
Simultaneous strata belonging to different ordered channels are not excluded.

For a simple root, $D_t>0$. If

$$
D_r
=
c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r(T_r)
\ge
c_f-\|\mathbf V_r(T_r)\|
\ge0,
$$

then implicit differentiation gives

$$
\frac{dS}{dT_r}
=
\frac{D_r}{D_t}
\ge0.
$$

This branch derivative is not defined on a characteristic interval. A
strictly positive $D_r$ floor is an additional hypothesis whenever this map
must be inverted or used for a uniform change-of-variable estimate. Claim
grade: `derived under the proposed closed velocity domain`. The result is
falsified by one ceiling-admissible Lipschitz retained history with two separated
roots in the same ordered channel or a simple root with $D_t<0$.

### Characteristic-interval rigidity and per-channel classification

Let $g(T_r,s)=0$ for every $s\in[s_1,s_2]$, with $s_1<s_2<T_r$. Then

$$
r(s)=c_f(T_r-s),
$$

so $r(s_1)-r(s_2)=c_f(s_2-s_1)$. Equality holds in both the reverse-triangle
estimate and the Lipschitz speed bound. Consequently the transmitter travels
at speed $c_f$ almost everywhere on $[s_1,s_2]$ along the fixed exact-aim
direction toward the receiver event. Equivalently, the interval is one
straight characteristic chord. Conversely, such a chord gives
$g(T_r,s)=0$ throughout the interval.

Combining rigidity with monotonicity gives the complete transmitter-side
positive-delay geometry catalogue for one ordered channel:

1. no root;
2. one simple isolated root;
3. one degenerate isolated root; or
4. one rigid characteristic interval.

If the paths are $C^2$ and a degenerate isolated root occurs at an interior
emission time, $D_t=g'=0$ is a local minimum of the nonnegative derivative,
so $g''=0$ there. The first nonzero derivative of a smooth isolated crossing
must therefore occur at odd order at least three; no finite-order assumption
is made for a flat crossing.

This is a per-channel geometry theorem, not a complete event classification.
It does not assign dispositions to the degenerate root or interval, classify
the excluded zero-delay diagonal, select interval-endpoint transitions,
identify source-dependent rules, or aggregate simultaneous strata from
different channels.

Plainly: a whole interval of arriving emissions is possible only when the
transmitter runs straight at exactly wake speed and aims exactly at the fixed
receiver event. That greatly narrows the missing geometries, but it still does
not say what either exceptional geometry does to the receiver.

### Regular-root count and stability lemma

For a finite $N$-architrino history, one receiver has at most $N-1$ ordinary
distinct-transmitter roots at one time. A same-transmitter equality under the
speed bound forces the straight characteristic interval just described, so it
does not add a simple ordinary root.

On a common delay chart, let two retained histories $\mathfrak h$ and
$\mathfrak h'$ have roots $S$ and $S'$ in the same ordered channel. If
$D_t^{\mathfrak h'}(s)\ge d_{\min}>0$ on the closed emission-time segment
joining $S$ and $S'$, then the mean-value
estimate and the position sup norm give

$$
|S'-S|
\le
\frac{2}{d_{\min}}
\|\mathfrak h'-\mathfrak h\|_\infty.
$$

The factor two allows both receiver and transmitter positions to move. This
lemma controls an already matched branch. It does not prove a fixed active-
channel set, inactive gaps, a bounded delay window, velocity-history control,
a ledger-row gradient bound, or the contraction needed to close the history-to-ledger theorem.

Plainly: the ceiling makes the number of regular roots automatically finite
when the number of architrinos is finite, and a root moves continuously while
it stays uniformly simple. It does not stop a channel from appearing,
disappearing, or approaching a nonordinary event unless the remaining gap and
transversality hypotheses are proved.

Plainly: if no transmitter can outrun its wakes, one receiver cannot meet two
separate wakefronts from that same transmitter at one instant. It can meet
one front, ride alongside a whole family, or meet none. The whole-family case
is exactly where the ordinary row formula still stops.

Plainly: a degenerate isolated crossing, a rigid interval, the excluded same-
time diagonal, and simultaneous strata from different channels are different
mathematical events. The closed candidate classifies the possible geometry in
one positive-delay channel, but it does not assign any general event response.

For this provisional framework, use the following proposed working definition
before forming the Master-Equation sum:

> **Swept-branch reception rule (proposed).** An active ordinary reception is
> a positive-delay simple branch whose selected received-history clock is
> locally increasing. An isolated receiver-side tangency does not by itself
> make the branch inactive. By contrast, a nondegenerate interval on which
> that clock is constant is a receiver-side frozen interval and is not an
> ordinary reception row under the proposed source-swept law. A
> same-transmitter co-moving interval at field speed is likewise nonordinary.

Under this convention, a straight field-speed architrino does not receive an
ordinary acceleration row from its own co-moving wake family. The result is
not obtained by summing an infinite family and canceling it: the family is
nonisolated and has $D_t=0$, so it lies outside the ordinary root set
$\mathcal C_{r\leftarrow r}$ before the sum and the ceiling map are evaluated.

The family must nevertheless be recorded as an **inactive co-moving
same-transmitter root interval**, with its transmitter/receiver identity and time
interval. This preserves provenance without treating its members as omitted,
deleted, or reweighted ordinary roots. The rule addresses only the exact
same-transmitter co-moving case. A tangent partner event, a receiver-side
frozen partner root, a mixed-direction path-speed-ceiling boundary-state event,
or any other non-simple event remains a separately defined boundary chart.

Every retained ordinary partner and self root still requires unique ledger
ownership, and any constrained continuation must emit a declared outgoing
retained history. Those are continuing proof obligations, not consequences of
the isolated-crossing rule.

### Plateau wake: point-source limit and path-speed-ceiling boundary-state evolution

The working proposal does not add a finite core or maturity radius merely to
make the point-source limit finite. Emission is treated in the usual
distributional point-source limit. At every fixed positive radius, the emitted
wake has an ordinary, finite inverse-square value; as the local spatial or
time increment tends to zero, the emission is represented by its finite delta
measure at the origin.

For any artificially declared positive lower radius $r_0$, the tail from
distant earlier wakefronts
also has finite geometric weight:

$$
\int_{r_0}^{R}\frac{dr}{r^2}
=
\frac{1}{r_0}-\frac{1}{R}
\longrightarrow
\frac{1}{r_0}
\quad\text{as }R\to\infty.
$$

Thus arbitrarily distant earlier wakefronts need not create an infinite
inverse-square tail.
For the exact co-moving self family, however, this integral is not an ordinary
Master-Equation calculation: the working equality rule classifies the family
as noncrossing and inactive before an ordinary row weight is assigned. Its
zero ordinary self row therefore comes from the proposed event-domain
classification informed by reception geometry, not from a cutoff, a
cancellation, or a ceiling response applied to a divergent raw self sum.

This is a provisional admission convention. A later complete wake/account law
must still state its measure and provenance, especially for mixed-direction or
transverse path-speed-ceiling boundary-state contributions. The convention does not erase an emission;
it records a nonordinary same-transmitter root family while assigning it no ordinary
reception row.

### Event-domain boundary, not an infinity prescription

The complete constrained-response axiom receives a vector only after the
ordinary root construction has produced a complete finite net ledger. It does
not turn an undefined root family into the zero vector.

This distinction is decisive at partner coincidence. For every strict
positive-delay member $S<T$ of a co-moving root family, the causal equality
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
a disposition to the positive-delay nonisolated partner-root family.

For the exact mirror-collinear event only, the proposed Minimal Collinear
Partner-Coincidence Postulate supplies that missing disposition: the family is
owned by one coincidence event, contributes no ordinary row, and gives
$\Delta\mathbf V_{\mathrm{coincidence}}=\mathbf0$. This is an added event law. It
does not follow from projecting a vector, and it does not change any ordinary
positive-separation isolated row before or after the event.

Plainly: the boundary response can act on a finite list of received rows. At
partner coincidence there is no ordinary list to project. The proposed collinear
postulate separately declares what the exact event does, without calling its
nonordinary family an infinite ordinary acceleration.

## 10. Collinear stress test

### Collinear coincidence guard and proposed reset

A complete closed-domain dynamical system also needs event-domain
commitments. For the exact mirror-collinear encounter studied in Section 10.7,
the analysis examines the following minimum convention:

> **Minimal Collinear Partner-Coincidence Postulate.** At the exact same-path
> coincidence of the two labeled partners, the ordinary
> positive-separation, isolated-reception ledger contains no coincidence row. The
> zero-radius point-emission delta is source bookkeeping and is not a partner
> acceleration contribution. The separately recorded coincidence event contributes
> zero velocity impulse:
>
> $$
> \Delta\mathbf V_{i,\mathrm{coincidence}}=\mathbf0
> \qquad\text{for each participating label }i.
> $$

This is a proposed event law, not a result derived from the point-emission
delta, the positive-separation ordinary domain, or the constrained-response
axiom. Its event record owns the nonisolated partner-root family and the
limiting incoming-root transition exactly once, while assigning neither an
ordinary reception row nor an acceleration to the source delta at
coincidence.

For the exact collinear partner event, let
$\mathfrak G_{\mathrm{col}}\subset\mathfrak H^{-}$ be the proposed reset guard.
Membership requires:

- declared left traces
  $\mathbf X_i(T_{\mathrm c}^{-})=\mathbf X_{\mathrm c}$ and
  $\mathbf V_1(T_{\mathrm c}^{-})=c_f\mathbf e$,
  $\mathbf V_2(T_{\mathrm c}^{-})=-c_f\mathbf e$;
- the bounded pre-coincidence root count and classifications for both ordered channels
  $1\leftarrow2$ and $2\leftarrow1$ from Section 10.7;
- a half-open ownership convention: isolated ordinary branches own
  $T<T_{\mathrm c}$, while the typed event owns only the coincidence stratum at
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

whose codomain $\mathfrak J_{\mathrm{col}}^{+}$ contains only outgoing coincidence
immediate position-and-velocity data

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
\Delta\mathbf V_{i,\mathrm{coincidence}}=\mathbf0.
$$

It does not map into a right-hand retained history. The separately labeled
source measures remain nonzero:

$$
\mathsf E_{1,T_{\mathrm c}}\ne0,
\qquad
\mathsf E_{2,T_{\mathrm c}}\ne0.
$$

They remain available to any later ordinary positive-separation reception and
are not partner acceleration contributions at coincidence. The event update is the
receiver-time atomic measure

$$
\boldsymbol{\mathsf J}^{\mathrm{evt}}_i
=
\Delta\mathbf V_{i,\mathrm{coincidence}}\,
\delta_{T_{\mathrm c}},
$$

whose coefficient is set to zero by the proposed postulate. That zero
coefficient is not a distributional cancellation, principal value, finite
part, or regulator-independent limit of a receiver measure. The event record
owns the declared coincidence strata once while preserving both source labels.

Any restart claim would require the reset codomain to be extended with a
compatible outgoing retained-history record, labeled source record, ownership
ledger, and receiver-measure record. None is supplied by the outgoing
immediate position-and-velocity data.


For the mirror-symmetric collinear encounter, the velocity-sphere condition
reduces to the scalar statement that the signed speed cannot increase beyond
$c_a$. Conditional on the unverified mirror-encounter input, the
first arrival at that sphere occurs at positive separation. This is an input
hypothesis here, not an accepted theorem. It does not decide whether the
constrained path turns, has a boundary event, or travels along the boundary.

A nonzero interval on the boundary is especially diagnostic: the unmodified
sharp root condition produces a non-simple continuum of co-moving candidates.
The working equality rule above classifies the exact same-transmitter family
as inactive rather than as ordinary roots. The inverse-square tail observation
is finite from a separately given positive radius, but it does not by itself
decide any other zero-Jacobian event.

### 10.1 Mathematical sequence

1. State the complete constrained-response axiom on finite ordinary charts.
2. Record the limited same-transmitter equality convention.
3. Apply the proposed zero-impulse postulate at the exact mirror-collinear
   partner coincidence and return only its outgoing coincidence immediate position-and-velocity data.
4. Define the source-provenanced receiver-side coincidence and competing-stratum
   measures in the candidate Radon topology.
5. Prove or refute local weak-* convergence on the open source-time interval,
   together with the exact-chart endpoint residue, under explicit
   branch-collapse, trace, kernel, label, and competing-stratum hypotheses.
6. Resolve the mirror chart's zero-range raw-measure tail,
   complete-ledger leading sign, and projected-remainder integrability.
7. In parallel, use the root-count and root-stability lemmas to
   prove the regular history-to-ledger gradient and contraction theorem.
8. Define a locally finite post-coincidence response measure and compatible
   outgoing retained-history record.
9. Prove existence and uniqueness on an open post-coincidence interval.
10. Extend event-domain admission and ownership to other nonordinary events.
11. Recompute the complete root ledger and outgoing retained history.
12. In parallel, exact regular charts may test binary
   compatibility. Only after the preceding event and solution obligations are
   closed may such a chart be generalized into binary, braid,
   translating-assembly, or observer-level Lorentz-recovery consequences.

### 10.2 Causal reception geometry

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

For a straight same-transmitter path-speed-ceiling boundary-state segment,

$$
\mathbf X(T)=\mathbf X_0+c_f(T-T_0)\hat{\mathbf v},
$$

every earlier point on that same segment satisfies $g_{ii}(T,S)=0$, but none
is an isolated crossing. The derivative in the emission-time direction is
zero. The proposed path-speed-ceiling boundary-state interpretation is therefore: this co-moving
same-characteristic family is not an ordinary active self-reception. It is a
geometric coincidence family, not a sequence of independent impacts.

This expresses the geometric observation that an architrino travelling with
its own wake cannot be overtaken by that wake.

### 10.3 Finite-ledger constrained evolution

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
in Section 8. The path-speed-ceiling boundary-state co-moving root family
classified in Sections 9--10 is not
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

### 10.4 First derived geometric consequences

#### Interior recovery

While $\|\mathbf V\|<c_f$, $\mathcal P_{\mathbf V}$ is the identity. The
path-speed-ceiling
model agrees with the ordinary finite-root acceleration law until the first
field-speed boundary event.

#### Boundary decomposition

At $\|\mathbf V\|=c_f$, a positive speed-changing component is removed;
negative speed-changing and transverse components remain. Hence the ceiling response may
hold speed fixed, reduce it, or bend the trajectory, without any coordinate
choice or collinearity assumption.

#### Straight path-speed-ceiling boundary-state special case

If the finite ordinary ledger has only components parallel to $\mathbf V$ and
all are speed-increasing, then every effective contribution is zero. The
motion is straight at constant field speed until another ordinary contribution
or a boundary event changes the ledger. This is the proposed interpretation of
the stationary collinear mirror chart after first arrival at field speed; it is
not yet a proved outgoing history.

#### Re-entry into the interior

Once a retained effective contribution has a component opposite $\mathbf V$,
the speed can fall below $c_f$. The response map becomes the identity again,
and ordinary finite-root dynamics resumes. The time and geometry of such a
re-entry must be calculated from the actual outgoing retained history.

### 10.5 Immediate calculation ladder

1. Recheck the stationary collinear mirror release through its conditional
   first boundary in the conditional mirror encounter, now using the
   finite-ledger path-speed-ceiling response.
2. Classify whether a path-speed-ceiling boundary-state interval has only a co-moving same-transmitter root
   family and the persistent partner row, or whether another root/boundary
   appears first.
3. Calculate the first off-axis perturbation: which wake components bend,
   which slow, and which are projected out at the field-speed sphere.
4. Only after those local charts are controlled, calculate equal-radius
   phase-offset braid geometry and translating-assembly velocity composition.

### 10.6 Full-geometry target

The desired end state is one delayed constrained dynamical system containing:

- persistent architrino paths and their retained histories;
- causal-wake propagation at $c_f$;
- an isolated-crossing reception geometry;
- a finite-ledger tangent-cone response; and
- an event rule for any nonordinary root or retained-history boundary.

The test is not whether a ceiling can be stated. The test is whether this single
system yields finite, unique histories and useful geometry without adding
case-specific rules for collinear pairs, Braids, or translating assemblies.

### 10.7 First conditional calculation: stationary mirror ceiling segment

This section applies the proposed partial model only to the conditional
stationary, mirror-symmetric collinear incoming chart. Let $q(T)>0$ be the
half-separation and let $u=-dq/dT$ be each inward speed in units $c_f=1$.
Assume the unverified conditional mirror-encounter input supplies an event $T_\ast$
with

$$
u(T_\ast)=1,\qquad q(T_\ast)=q_\ast>0,
$$

and one simple partner root emitted at $s<T_\ast$.

#### Conditional ceiling segment

Assume the alternative model's straight path-speed-ceiling boundary-state consequence applies after
$T_\ast$ until the first new ledger boundary. Then

$$
u(T)=1,
\qquad
q(T)=q_\ast-(T-T_\ast).
$$

The persistent pre-threshold incoming partner emission $s(T)<T_\ast$ is governed by

$$
F_T(s)=q(T)+q(s)-(T-s)=0,
\qquad
\partial_sF_T=1-u(s)>0.
$$

It remains a unique ordinary partner root while $s<T_\ast$. Differentiating
the root equation on the ceiling segment gives

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

#### What this establishes, conditionally

Before that coincidence time, the path-speed-ceiling boundary-state model has the incoming partner row and
the non-isolated co-moving same-transmitter coincidence family. The latter is not
an ordinary same-transmitter root under the admission rule in Section 9; the forward partner row is
speed-increasing and has zero effective contribution under the proposed
ceiling-response map. Hence the assumed straight field-speed segment is internally
consistent on this finite open interval at the level of effective motion.

At coordinate coincidence, the incoming partner row itself reaches the
non-transverse boundary $s=T_\ast$ with $1-u(s)\to0$. More strongly, every
partner emission on the ceiling interval satisfies the causal equality:

$$
\left\|
\mathbf X_r(T_\ast+q_\ast)-\mathbf X_t(s)
\right\|
=
T_\ast+q_\ast-s,
\qquad
T_\ast\le s<T_\ast+q_\ast.
$$

This is a non-isolated positive-delay partner-root interval with $D_t=0$,
not an ordinary partner reception. The working same-transmitter
root convention does not classify it.

Plainly: conditional on the mirror-encounter input and the regular-chart response, the
pair can travel at field speed from the assumed first boundary to coordinate
coincidence without the super-field self-root birth. At coincidence the next
object is an entire partner coincidence family rather than one ordinary root, so
the proposed collinear event postulate—not the ordinary ledger—owns it.

#### Proposed reset and outgoing coincidence immediate position-and-velocity data

Let the two incoming labeled velocities at coincidence be

$$
\mathbf V_1(T_{\mathrm c}^{-})=c_f\mathbf e,
\qquad
\mathbf V_2(T_{\mathrm c}^{-})=-c_f\mathbf e.
$$

The Minimal Collinear Partner-Coincidence Postulate declares no ordinary coincidence
row and

$$
\Delta\mathbf V_{i,\mathrm{coincidence}}
=
\mathbf V_i(T_{\mathrm c}^{+})
-
\mathbf V_i(T_{\mathrm c}^{-})
=
\mathbf0.
$$

The reset therefore returns the velocity-preserving outgoing coincidence immediate position-and-velocity data

$$
\mathbf V_i(T_{\mathrm c}^{+})
=
\mathbf V_i(T_{\mathrm c}^{-}).
$$

This is the full consequence presently licensed by the postulate. An immediate position-and-velocity data record
specifies position and one-sided velocity at $T_{\mathrm c}$; it does not imply
a right-hand path expansion, separation, passage, or a solution on any interval
$(T_{\mathrm c},T_{\mathrm c}+\varepsilon)$.

Plainly: the postulate supplies outgoing position-and-velocity data at the
coincidence. It does not yet supply even a short path after the coincidence.

The independent bounded recheck in
[capped-collinear-endpoint-reanalysis.md](capped-collinear-endpoint-reanalysis.md)
shows that the incoming partner row has finite accumulated raw contribution on the
open segment even though its pointwise weight diverges at the endpoint. The
candidate projected contribution is zero throughout that open segment. The
same recheck also shows that an explicitly prescribed unaccelerated straight
separating right trace would produce a new zero-range partner row with a
nonintegrable inverse-square contribution. This is a conditional obstruction
for that trace, not a universal continuation no-go. The general near-coincidence
question is formulated in the
[separating-trace incompatibility theorem target](near-contact-separating-trace-incompatibility-theorem-target.md).

#### First transverse linearization

Fix the right receiver on the open ceiling segment, with

$$
\hat{\mathbf v}_r=-\mathbf e_x,
\qquad
\mathbf A_{\mathrm{raw}}=a_0\hat{\mathbf v}_r,
\qquad
a_0>0.
$$

Let $\delta\mathbf y_r(T)$ and $\delta\mathbf y_t(s)$ be transverse position
perturbations of the receiver and its unique incoming partner emission, and let
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
incoming partner wake points, and a small sideways velocity changes the velocity
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
on the segment. Therefore a genuinely curved path-speed-ceiling boundary-state perturbation has no
positive-delay same-path root on that curved interval; a straight subinterval
retains the non-isolated co-moving same-transmitter root family. This statement concerns
same-path geometry only and does not exclude a new partner root or another
boundary event.

Claim grade: `derived first-order conditional result` on the open ceiling segment.
It is not a stability result. It is falsified by a direct first variation of
the same root and total-ledger projection that produces a nonzero first-order
longitudinal term while the base raw speed component remains strictly
positive.

#### Claim boundary

This is a conditional calculation inside the proposed ceiling model. It does
not prove or adopt the complete constrained-response axiom or the Minimal
Collinear Partner-Coincidence Postulate, generalize the event rule, establish a
right-hand path, or establish the mirror encounter. Conditional on the two proposed laws, it
establishes only the velocity-preserving outgoing coincidence immediate position-and-velocity data. The
open-segment ledger is falsified if it develops an additional ordinary root or
boundary before the stated coincidence event. The endpoint classification is
falsified if a complete same-record census makes the partner-root family
ordinary and finite under an already accepted rule.

### 10.8 Coincidence-continuation alternatives: current disposition

The preceding calculation resolves neither passage nor rebound after the
idealized coincidence. The following alternatives have been considered. None
is presently a derived continuation law.

- **Ordinary straight-through passage under the current row wording.** The
  no-impulse postulate preserves the incoming velocities at the coincidence
  instant, but it supplies no right-hand retained history. If the frozen
  partner root is booked as an ordinary row merely because $D_t\ne0$, a
  prescribed separating trace generates a zero-range partner contribution with
  nonintegrable inverse-square scaling.
- **Swept-source reception.** The leading proposed resolution is to classify a
  frozen partner root by receiver-side crossing, not transmitter-side root
  isolation alone. Section 10.9 states the proposed law. It is compatible with
  every regular chart where $D_r>0$, but it is new foundational data on the
  frozen stratum and does not yet supply a general event law.
- **Cancellation between the approaching and separating receiver-time
  singular terms.** A symmetric principal-value cancellation is not an
  ordinary receiver-time integral. Within the declared bounded-variation
  class, cancellation on disjoint time supports cannot cure divergent total
  variation. This does not address the separately proposed exact-coincidence
  raw-wake superposition above, which pairs equal-and-opposite source fronts
  before a receiver-time event measure is assigned.
- **A finite short-range cutoff.** Replacing the inverse-square factor by a
  bounded kernel introduces a new length or density scale. The finite total
  wake amount on every nonzero sphere does not determine that scale.
- **A finite coincidence interval.** A transition that skips a nonzero time
  or distance interval requires entry and exit data, an outgoing retained
  history, and an account of the wake records during the interval. It is a new
  event law, not a consequence of the ordinary formula.
- **A cancellation or redirection from the complete ledger.** This remains a
  theorem target. It must classify every same-order contribution at each
  receiver before the post-summation response is applied; pairwise symmetry
  alone does not cancel a receiver's local ledger.
- **Co-moving same-transmitter wake geometry.** A path that has travelled at
  field speed and then stops can encounter a characteristic interval of its
  own earlier emissions. The ordinary isolated-root rule does not aggregate
  that interval or define its response.
- **A third architrino that starts a coincident opposite-polarity pair moving.**
  The external wake can supply a differential input, but the current theory
  does not decide whether the pair's coincident source records remain separate
  or form a neutral event source for later receptions.
- **A noncoincidence restriction.** Requiring only $r_{ij}(T)>0$ forbids the
  exact event but still permits arbitrarily close approach and does not bound
  the inverse-square term. Requiring $r_{ij}(T)\ge\ell>0$ removes that
  near-zero divergence, but introduces a minimum-separation scale $\ell$ that
  must be derived or explicitly postulated.
- **Transverse or non-collinear escape.** Under an additional $C^3$
  nonzero-third-derivative condition, an external asymmetry can break the
  ideal mirror-collinear configuration. No function-space theorem yet excludes
  exact coincidence in every multi-architrino history.

Plainly: the ordinary approach chart and the proposed no-impulse rule cover
only the approach and the exact instant. They do not yet identify a lawful
route through the first open interval after coincidence. The next mathematical
task is to prove or refute the leading complete-ledger asymptotics for a
declared outgoing solution class, or to derive a new nonordinary event law
that supplies the missing retained history.

### 10.9 Proposed swept-source reception: the frozen-root resolution

The receiver-side factor

$$
D_r=c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r
$$

answers a different question from $D_t$. The latter tests whether the causal
equation selects an isolated emission time when a receiver event is fixed. The
former tests whether the corresponding wakefront sweeps across the receiver as
receiver time advances. On a simple branch $s=S(T)$,

$$
\frac{dS}{dT}=\frac{D_r}{D_t}.
$$

Thus $D_t\ne0$ does not by itself establish that newly emitted source history
is reaching the receiver.

For the prescribed mirror straight-through trace after coincidence, normalized
by $c_f=1$ and with coincidence at $T=0$,

$$
\mathbf X_1(T)=T\mathbf e,
\qquad
\mathbf X_2(T)=-T\mathbf e,
\qquad T>0,
$$

the partner root is $S(T)=0$ for every $T>0$. Its factors are

$$
g(T,s)=2s,
\qquad
D_t=2,
\qquad
D_r=0,
\qquad
\frac{dS}{dT}=0.
$$

The partner's coincidence-time wakefront expands at the same speed as the
receiver departs. The receiver therefore remains on that one front. Later
partner emissions begin farther away and do not catch the receiver in this
ideal chart. This is the receiver-side frozen-root stratum introduced in
Section 9.

> **Swept-Source Reception Law (proposed).** For each ordered channel, count
> source history only while its causal wakefront crosses the receiver. On a
> simple branch with $D_t>0$ and $D_r>0$, use the source-swept receiver measure
>
> $$
> \boldsymbol{\mathsf R}^{\mathrm{sweep}}(dT)
> =
> \frac{\mathbf K(T,S(T))}{D_r(T,S(T))}\,dS(T).
> $$
>
> On a receiver-side frozen interval, where $S$ is constant on a nondegenerate
> receiver-time interval, record the branch as inactive and add no ordinary
> receiver row. An isolated receiver-side tangency is not such an interval and
> retains the regular swept contribution. A jump or singular component of the
> received-history clock is a separately typed nonordinary event and has no
> general disposition under this proposal.

The displayed measure formula is asserted only where $D_r>0$. It must not be
read as a cancellation of $dS=0$ against a zero denominator at a frozen root.
Choosing this source-time, swept-measure extension is new proposed
foundational data; only after choosing it does a frozen interval have zero
swept measure. It is not a consequence of the existing transmitter-side root
catalogue alone.

On a regular branch with $D_t,D_r>0$,

$$
\frac{dS}{D_r}=\frac{dT}{D_t},
$$

so the swept-source measure is exactly the canonical ordinary receiver
measure. The proposal therefore changes no regular sub-ceiling chart, where a
strict speed gap gives $D_r>0$. On a declared finite-switching chart, the
selected channel clocks provide only a proposed organizing structure: their
absolutely continuous increasing parts account for swept ordinary rows,
plateaus account for frozen intervals, and jumps or singular-continuous parts
remain separately typed nonordinary data. Its only immediate change is the
treatment of receiver-side noncrossing strata at the ceiling.

For the ideal mirror coincidence, this law removes the repeated ordinary-row
obstruction from the single persistent $s=0$ partner front: that frozen branch
is inactive. This does not yet establish straight-through passage for the
actual incoming cap history. If the partner had an earlier field-speed cap
segment, its cap-emission interval can remain a nonisolated partner
characteristic family after coincidence. The swept-source law classifies the
single frozen front, not that inherited family. Its receiver measure and
open-interval disposition therefore require a separate proposed event-family
completion.

Only on a separately declared zero-contact-only prehistory, with no inherited
partner characteristic interval, can the proposed frozen-branch rule combine
with the same-transmitter convention, the proposed zero-impulse event, and an
absence of external or event-atom rows to verify an empty effective outgoing
ledger. Even then this is a conditional prescribed-history verification, not a
selected or unique continuation. In every case the present law lacks a
complete outgoing retained history, a general coincidence atom, uniqueness,
stability, causal decoupling in perturbed histories, and any action or
conservation account.

#### Proposed exact-coincidence raw-wake superposition

The coincidence event requires a raw-wake operation before any labeled
architrino response is assigned. At one shared event in absolute time and
space $(T_{\mathrm c},\mathbf x_{\mathrm c})$, retain every contributing
source label and its provenance, but first form the signed raw event wake

$$
\mathsf W_{\mathrm{event}}
=
\sum_{j\in\mathcal J_{\mathrm{event}}}
\mathsf W_{j\to\mathrm{event}}.
$$

Only after this source-level superposition may an event response be assigned
to either labeled architrino. This is a proposed nonordinary-event law; it
does not alter the ordinary positive-delay, receiver-indexed ledger.

For the exact mirror coincidence of equal-magnitude opposite-polarity cap
histories, pair corresponding cap-front contributions by their common arrival
at $(T_{\mathrm c},\mathbf x_{\mathrm c})$. The proposed matching condition is

$$
\mathsf W_{+}(\tau)+\mathsf W_{-}(\tau)=0
\qquad
\text{for every matched cap parameter }\tau>0.
$$

It gives

$$
\mathsf W_{\mathrm{event}}=0,
\qquad
\Delta\mathbf V_{1,\mathrm{coincidence}}
=
\Delta\mathbf V_{2,\mathrm{coincidence}}
=
\mathbf0.
$$

Thus the existing zero-impulse postulate becomes a conditional consequence of
this proposed raw-wake superposition rule in that exact mirror case. The
source labels are retained in the event record even though their signed raw
wakes cancel; no source is silently deleted.

This law is not derived from the current receiver-weighted ordinary kernel.
It must be tested by defining the raw wake object and proving the stated
pairing for the actual cap histories. It does not cover unequal strengths,
broken mirror symmetry, unmatched source histories, an added external wake,
or any open interval after coincidence. It also does not provide the outgoing
retained history or an ownership rule for the inherited partner
characteristic family.

Plainly: at exact coincidence, equal and opposite piled raw wakes cancel
before either labeled architrino responds. This is different from attempting
to cancel divergent receiver-time integrals after they have already been
assigned to separate receiver ledgers.

Claim grade: `proposed foundational refinement with derived regular-chart
equivalence`. The equivalence is falsified by one simple branch with
$D_t,D_r>0$ on which the two displayed receiver measures differ. The
frozen-root disposition is falsified only by an adopted alternative reception
law or a derived source-to-receiver measure that assigns a nonzero ordinary row
to a noncrossing front.

Plainly: ordinary reception means that new wake history reaches the receiver.
If the receiver merely rides one front forever, the proposal records that fact
but does not bill it again at every later time. This applies neutrally to a
self wake or a partner wake; source identity is not the reason for the rule.

This resolution does not turn the ideal mirror encounter into a breather. In
the narrower zero-contact-only outgoing chart, each receiver rides only the
coincidence-time partner front and later partner fronts cannot catch it; there
is therefore no derived restoring acceleration there. The actual incoming cap
history is not yet entitled to that conclusion, because its inherited partner
characteristic family remains unowned. A breather would in any event require a
separate, lawful slowdown below $c_f$, a return mechanism, and a disposition
for the resulting ceiling-exit self-wake event.

Plainly: swept-source reception can remove the repeated $s=0$ outgoing row
without creating a pull back toward the partner. It gives a clean candidate
escape only for the separately declared zero-contact-only history; it does
not yet dispose of the inherited cap family or give a repeated
approach-and-separation motion.

## 11. Circular binaries

### 11.1 Circular binary at or below wake speed: $0<c_a\le c_f$

This is a ceiling-boundary-speed family: the candidate circle runs at
$\|\mathbf V_i\|=R|\omega|=c_a$, not at an arbitrary speed below $c_a$.
Assume the two labeled antipodal circular paths are prescribed for all past
times and that no other labels are present. The result below concerns this
complete two-label periodic history only.

Set

$$
\lambda=\frac{c_a}{c_f}\in(0,1],
\qquad
R|\omega|=c_a.
$$

Use the prescribed isolated, non-translating, opposite-polarity antipodal
circular paths

$$
\mathbf X_1(T)=R\mathbf e_r(T),
\qquad
\mathbf X_2(T)=-R\mathbf e_r(T),
\qquad
\mathbf e_r(T)=(\cos\omega T,\sin\omega T,0).
$$

Put $\xi=|\omega|\Delta/2$. The full positive-delay
partner equation is

$$
\xi=\lambda|\cos\xi|.
$$

Because $\xi\le\lambda\le1<\pi/2$, every such root has $\cos\xi>0$.
It therefore reduces to the unique positive root

$$
\boxed{\xi_\lambda=\lambda\cos\xi_\lambda.}
$$

Indeed, $\xi-\lambda\cos\xi$ is strictly increasing on $[0,\lambda]$,
negative at zero, and positive at $\lambda$. Thus
$\xi_\lambda\in(0,\lambda)$. The corresponding partner range, delay, and
root factors are

$$
r_{12}=2R\cos\xi_\lambda,
\qquad
\Delta=\frac{2R\xi_\lambda}{c_a},
\qquad
D_t=D_r=c_f(1+\lambda\sin\xi_\lambda)>0.
$$

For $0<c_a<c_f$, the strict speed gap gives
$D_t,D_r\ge c_f-c_a>0$ at every positive-range ordinary root of a
speed-admissible history and excludes every
positive-delay same-transmitter root. At equality, the same circular chart
has one simple partner root and no positive-delay same-transmitter root by the
separate equality calculation below.

With $K=\kappa|q_1q_2|>0$, choose $\omega>0$ without loss of generality; the
opposite orientation is obtained by reversing $\mathbf e_\theta$. The complete
two-label ordinary ledger then consists of one partner row per receiver,

$$
\mathbf A_{12}^{\mathrm{ord}}
=
-
\frac{K}
{4R^2\cos^2\xi_\lambda(1+\lambda\sin\xi_\lambda)}
\left(
\cos\xi_\lambda\,\mathbf e_r
-
\sin\xi_\lambda\,\mathbf e_\theta
\right).
$$

Its radial component is inward and its tangential component is forward. The
proposed response is applied once to that complete ordinary ledger, removing
the forward component and retaining the inward component. Matching that
inward acceleration to $c_a^2/R$ gives the unique radius compatible with this
prescribed uniform circle and its angular-frequency magnitude

$$
R_{\ast,\lambda}
=
\frac{K}
{4c_a^2\cos\xi_\lambda(1+\lambda\sin\xi_\lambda)},
\qquad
|\omega_{\ast,\lambda}|
=
\frac{4c_a^3\cos\xi_\lambda(1+\lambda\sin\xi_\lambda)}{K}.
$$

For fixed $K$ and $c_f$, this compatible-radius family is strictly decreasing
as $\lambda$ rises through $(0,1]$. Indeed,

$$
\lambda=\frac{\xi_\lambda}{\cos\xi_\lambda},
\qquad
c_a^2\cos\xi_\lambda(1+\lambda\sin\xi_\lambda)
=
c_f^2\,
\frac{\xi_\lambda^2}{\cos\xi_\lambda}
\left(1+\xi_\lambda\tan\xi_\lambda\right).
$$

Both $\lambda$ and the right-hand denominator factor increase strictly with
$\xi_\lambda\in(0,D]$. Hence $R_{\ast,\lambda}$ decreases strictly and its
parameter-family endpoint minimum occurs at $\lambda=1$, where
$\xi_\lambda=D=\cos D$:

$$
R_{\ast,\min}^{\mathrm{chart}}
=
\frac{K}{4c_f^2D(1+\sin D)}.
$$

This is a minimum only over the fixed-$K$, prescribed at-or-below-wake-speed
circular family. It is not a universal minimum radius or a retuning result.

Claim grade: `derived prescribed-chart compatibility theorem under the
proposed constrained-response law`. This does not establish a realized
history, capture, stability, conservation, or selection of $c_a$.

Plainly: the lower-speed and equal-speed circles are one family. The path-speed
ratio changes the delayed angle and the selected scale; the equal-speed case
is special because its angle is the Dottie number.

#### 11.1.1 Equal-speed specialization: $c_a=c_f$

This section tests an isolated, non-translating, opposite-polarity two-label
binary with a fixed absolute-space midpoint directly on the regular field-speed
boundary. It uses the same
uniform-circular geometry as the canonical
[Master Equation circular benchmark](../../../content/markdown/aaa/dynamics/master-equation.md#sub-field-speed-two-body-uniform-circular-orbit),
but derives the equality case $\|\mathbf V_i\|=c_f$ here rather than assuming
that a strictly sub-field result automatically extends to the boundary.

##### Equal-time radius and delayed line of action

Choose the positive orientation $\omega>0$; reversing it exchanges the
orientation of $\mathbf e_\theta$ and gives the counterpart chart.

Let

$$
\mathbf X_1(T)
=
R\mathbf e_r(T),
\qquad
\mathbf X_2(T)
=
-R\mathbf e_r(T),
\qquad
\mathbf e_r(T)
=
(\cos\omega T,\sin\omega T,0),
$$

with

$$
\mathbf e_\theta(T)
=
(-\sin\omega T,\cos\omega T,0),
\qquad
\omega R=c_f.
$$

The equal-time radius is the line from the fixed binary midpoint through the
receiver's current position. The current velocity is
$\mathbf V_1(T)=c_f\mathbf e_\theta(T)$, so it is perpendicular to that
equal-time radius. The delayed line of action instead joins the partner's
earlier transmission point $\mathbf X_2(S)$ to the receiver event
$\mathbf X_1(T)$; it generally does not pass through the midpoint.

Plainly: the architrino's velocity points sideways along the candidate circle.
The received partner acceleration points along a different, delayed diagonal
that can be split into an inward part and a forward part.

##### Radius-independent acute partner root

Let $S=T-\Delta<T$ be a partner emission time and define

$$
\xi
=
\frac{\omega\Delta}{2}.
$$

For the root in $0<\xi<\pi/2$, the received range is

$$
r_{12}
=
\left\|
\mathbf X_1(T)-\mathbf X_2(S)
\right\|
=
2R\cos\xi.
$$

At field speed, the causal equation becomes

$$
2R\cos\xi
=
c_f\Delta
=
c_f\frac{2\xi}{\omega}
=
2R\xi,
$$

and hence

$$
\cos\xi=\xi.
$$

Any real solution of $x=\cos x$ lies in $[-1,1]$; no negative number in that
interval can equal its positive cosine. The function $\cos x-x$ is strictly
decreasing on $[0,1]$, changes sign there, and therefore has exactly one real
root,

$$
\xi_0
\approx
0.7390851332151606.
$$

This constant is commonly called the **Dottie number**. Write

$$
D
=
\xi_0,
\qquad
D
=
\cos D.
$$

The equation $x=\cos x$ is the intrinsic exact definition used here: $D$ is
its unique real solution. The symbol $D$ in this paragraph is the Dottie
number and must not be confused with the separately indexed root factors
$D_t$ and $D_r$.

Exact equations remain authoritative. Displayed decimals in this document are
rounded numerical aids, not independent inputs to a claim.

No conventional finite expression is known that reduces $D$ to familiar
constants such as $\pi$, $e$, $\sqrt{2}$, the Euler--Mascheroni constant
$\gamma$, or the golden ratio $\phi$, nor to the Lambert $W$ function or the
standard elementary and classical special functions. This is a
literature-status statement rather than a proved impossibility theorem. The
notion of a closed form for an individual number has no single universal
definition, and more elaborate inverse-function and convergent-series
representations of $D$ are known. The present derivation therefore uses the
fixed-point definition $D=\cos D$ and does not claim a universal
nonrepresentability theorem.

Plainly: the radius-independent binary angle is a named mathematical constant,
not a new fitted parameter. Its defining equation is the clean exact form
needed here; the decimal is only a numerical evaluation.

If $\theta=2\xi_0$ denotes the full orbital phase delay, then in normalized
wake-speed units $c_f=1$,

$$
\theta
\approx
1.4781702664303213\ \text{radians}
\approx
84.6929176682^\circ
<
90^\circ.
$$

Thus both the half-delay angle $\xi_0$ and the full phase delay $\theta$ are
acute. The radius has cancelled from the root equation. The range and delay
still scale with it:

$$
r_{12}
=
2R\xi_0,
\qquad
\Delta
=
\frac{2R\xi_0}{c_f}.
$$

Plainly: every field-speed circle has the same delayed angle and the same
directional split. Making the circle larger stretches the received chord and
delay by the same factor; making it smaller contracts both by that factor.

The transmitter-side factor is

$$
D_t
=
c_f(1+\sin\xi_0)
>
0,
$$

so the partner root is ordinary and simple. It is the unique partner root on
the complete circular history: for $\xi>1$, the causal distance
$2R\xi$ already exceeds the maximum chord $2R$, while on $(0,1)$ the root
function is strictly decreasing. There is no positive-delay same-transmitter
root because every nontrivial circular chord is strictly shorter than the
corresponding field-speed path length. Each receiver's complete ordinary
two-label ledger therefore contains exactly one partner row and no self row.

Plainly: this field-speed circle does not encounter the collinear coincidence
problem. At every positive radius its only received ordinary acceleration row
is the simple opposite-label partner row.

##### The post-summation response retains the inward component

At the partner root,

$$
\hat{\mathbf r}_{12}
=
\cos\xi_0\,\mathbf e_r
-
\sin\xi_0\,\mathbf e_\theta.
$$

Let

$$
K
=
\kappa|q_1q_2|
>
0.
$$

Opposite polarity makes the partner acceleration point toward the transmission
point:

$$
\mathbf A_{12}^{\mathrm{ord}}
=
-
\frac{K}
{4R^2\cos^2\xi_0(1+\sin\xi_0)}
\left(
\cos\xi_0\,\mathbf e_r
-
\sin\xi_0\,\mathbf e_\theta
\right).
$$

Its current equal-time radial and velocity-parallel components are therefore

$$
a_r
=
-
\frac{K}
{4R^2\cos\xi_0(1+\sin\xi_0)}
<
0,
$$

and

$$
a_\theta
=
\frac{K\sin\xi_0}
{4R^2\cos^2\xi_0(1+\sin\xi_0)}
>
0.
$$

Because $\mathbf V_1=c_f\mathbf e_\theta$, the tangential term is forward,
parallel to the velocity. There is no backward component on this chart. The
radial term points inward along the line through the receiver and the binary
midpoint, and it is perpendicular to the velocity.

The partner row is first retained as the complete ordinary net ledger. The
proposed response is then applied once:

$$
\mathbf A_1^{\mathrm{eff}}
=
\mathcal P_{c_f\mathbf e_\theta}
\left(
\mathbf A_{12}^{\mathrm{ord}}
\right)
=
a_r\mathbf e_r.
$$

The label-exchanged calculation gives the mirror result for receiver $2$.
The forward term is removed rather than redirected; the surviving inward term
was already present in the raw partner row.

Plainly: causal delay gives the attractive row a forward slant. At field speed
the proposed response removes that forward slant, leaving exactly the inward
direction needed to bend each labeled path about the common midpoint.

##### Unique compatible radius

A uniform circle of radius $R$ and speed $c_f$ has path acceleration

$$
\mathbf A_1^{\mathrm{path}}
=
-
\frac{c_f^2}{R}\mathbf e_r.
$$

Using $\cos\xi_0=\xi_0$, exact compatibility with the projected partner row
requires

$$
\frac{K}
{4R^2\xi_0(1+\sin\xi_0)}
=
\frac{c_f^2}{R}.
$$

There is one positive compatible radius:

$$
R_\ast
=
\frac{K}
{4c_f^2\xi_0(1+\sin\xi_0)}.
$$

In normalized wake-speed units $c_f=1$,

$$
R_\ast
\approx
0.20211137351526113\,K.
$$

Thus the causal angle and directional decomposition are scale-free at field
speed, but the dynamics are not. The received inverse-square magnitude scales
as $R^{-2}$, while the acceleration required by a field-speed circle scales
as $R^{-1}$. Their intersection selects $R_\ast$.

Equivalently,

$$
\frac{|a_r(R)|}{c_f^2/R}
=
\frac{R_\ast}{R}.
$$

For a prescribed circle with $R<R_\ast$, the projected inward acceleration is
stronger than that circle requires and its instantaneous curvature radius is
smaller than $R$. For $R>R_\ast$, it is weaker and the instantaneous curvature
radius is larger than $R$. These are residual signs on the one-parameter
circular family, not a radial stability theorem for perturbed retained
histories.

Plainly: the speed boundary fixes the speed, and the delayed geometry fixes the
turning direction. The competition between inverse-square acceleration and
the curvature required at that speed fixes the one compatible radius.

##### Small-radius boundary and claim grade

For every fixed $R>0$, the partner range $2R\xi_0$ is positive and the root
factor $D_t=c_f(1+\sin\xi_0)$ stays strictly positive. The ordinary chart has
no separate finite ``very small radius'' threshold. As $R\to0^+$, however,
the causal range tends to zero and the received acceleration grows as
$R^{-2}$. At $R=0$, the positive-delay ordinary chart has ended at exact
coincidence. A finite core, altered zero-range kernel, or additional coincidence
rule would be new mathematical data and is not assumed here.

Claim grade: `derived exact prescribed-chart compatibility theorem under the
proposed foundational law`. With the complete periodic paths prescribed for
all past times and $R=R_\ast$, both labeled paths have one complete simple
partner row per receiver and zero pointwise residual in the proposed
constrained regular Master Equation. Until the document declares the projected
delay-equation phase space and solution concept, this is not an existence
claim for a solution in that missing class. It also does not establish capture
from stationary data, attraction to $R_\ast$, radial or transverse stability,
robustness to other labels or wakes, a finite nonordinary-event limit, conservation,
adoption of the ceiling, or physical realization.

The result is falsified by any of the following on the identical two-label
periodic history:

1. a complete root count and classification finds another ordinary partner or self row;
2. the field-speed partner root is not simple, unique, or acute;
3. the complete partner acceleration has a backward component or the proposed
   post-summation response fails to leave the displayed inward vector;
4. substitution of $R_\ast$ leaves a nonzero path-acceleration residual; or
5. the stated ordinary inverse-square row ceases to be the declared regular
   law at some positive $R$.

Plainly: the prescribed circle passes the proposed regular boundary equation
exactly. That does not yet prove that the delayed evolution admits this chart
in its eventual solution class, that a naturally released binary reaches it,
or that a perturbed binary remains near it.

#### 11.1.2 Orthogonally translating equal-speed circular-binary ansatz

The preceding chart has no common translation: its binary midpoint is fixed in
absolute space. The next ansatz asks whether that midpoint can translate at
constant speed $u$ along an axis $\mathbf e_z$ orthogonal to the rotation
plane. Let

$$
\mathbf X_1(T)=uT\mathbf e_z+R\mathbf e_r(T),
\qquad
\mathbf X_2(T)=uT\mathbf e_z-R\mathbf e_r(T),
$$

and write $v=R\omega>0$ for the in-plane orbital speed. The equal-speed
ceiling condition is

$$
u^2+v^2=c_f^2.
$$

This is a helical absolute-space path for each label. The delayed partner
range satisfies

$$
c_f^2\Delta^2
=
u^2\Delta^2+4R^2\cos^2\xi,
\qquad
\xi=\frac{\omega\Delta}{2}.
$$

Using $v=R\omega$ and $c_f^2-u^2=v^2$ reduces this equation to

$$
\xi=|\cos\xi|.
$$

Since $0<\xi\le1<\pi/2$, $\cos\xi>0$, so $\xi=\cos\xi$. Strict increase of
$\xi-\cos\xi$ gives the unique positive delayed partner root, again at the
Dottie angle $\xi=D$. For every same-transmitter delay $\Delta>0$,

$$
\left\|\mathbf X_i(T)-\mathbf X_i(T-\Delta)\right\|^2
=
u^2\Delta^2+4R^2\sin^2\xi
<
u^2\Delta^2+v^2\Delta^2
=
c_f^2\Delta^2,
$$

so the same-transmitter channel has no positive-delay root. With two labels,
this proves that the displayed partner root is the complete ordinary ledger
for this prescribed ansatz. On that root, direct differentiation gives

$$
D_t=D_r=\frac{v^2}{c_f}(1+\sin D)>0.
$$

The delayed partner direction has an axial component,

$$
\hat{\mathbf r}
=
\frac{v}{c_f}
\left(D\mathbf e_r-\sin D\,\mathbf e_\theta\right)
+
\frac{u}{c_f}\mathbf e_z.
$$

For the attractive two-label partner row write
$\mathbf A_{12}^{\mathrm{ord}}=-C\hat{\mathbf r}$ with $C>0$. Its axial
component is $-Cu/c_f$. The raw velocity-parallel component is

$$
\mathbf A_{12}^{\mathrm{ord}}\mathbin{\cdot}\mathbf V_1
=
\frac{C}{c_f}\left(v^2\sin D-u^2\right).
$$

The proposed path-speed-ceiling response can remove only a positive component
parallel to the full velocity. Its effective axial component is therefore

$$
\left(\mathbf A_{12}^{\mathrm{eff}}\right)_z
=
-\frac{Cu}{c_f}
-
\frac{u}{c_f^2}
\max\!\left\{
\frac{C}{c_f}\left(v^2\sin D-u^2\right),0
\right\}
<0
\qquad (u>0).
$$

A uniform translating helix requires zero axial path acceleration, whereas
the complete isolated two-label ordinary ledger retains a backward axial
residual. Therefore this particular constant-translation ansatz has no
zero-residual solution for $u>0$ under the proposed response. This does not
exclude a binary with other labels, a nonuniform midpoint path, or a different
event or response law.

Claim grade: `derived negative prescribed-ansatz result under the proposed
constrained-response law`. It is falsified by an omitted ordinary root that
changes the complete two-label ledger, an error in the delayed partner
direction or root factors, or a ceiling response that removes the displayed
backward axial component.

Plainly: translating the whole binary uses part of the available path speed,
but the delayed partner is also behind in the translation direction. Its wake
therefore slows the common translation. The Dottie angle survives, yet a
steady helix does not pass the proposed two-label acceleration equation.

#### 11.1.3 Proposed binary-retuning transition

The exact circular charts above do not provide a transition between radii. The
following is a proposed binary event mechanism, not a consequence of the
regular response law. It acts symmetrically on both members of an
opposite-polarity binary and supplies a finite backward-plus-inward chord.
Immediately after the event, both path speeds are strictly below $c_f$ and
their equal-time radius is decreasing. During that sub-field-speed segment the
complete ordinary causal-root ledger must be recomputed. The proposed endpoint
is a smaller-radius circular record at field speed.

For two field-speed endpoints,

$$
R^-|\omega^-|=R^+|\omega^+|=c_f,
\qquad
R^+<R^-
\Longrightarrow
|\omega^+|>|\omega^-|.
$$

The event requires a symmetric guard and reset, lawful sub-field-speed root
and boundary ownership through the chord, a rebuilt outgoing retained history,
and independently admissible complete-ledger endpoint records. It does not
prove that such an event exists, that a radius--frequency ladder is discrete or
unbounded, or that action, energy, or a Planck-scale quantity is transferred.

Plainly: a tighter field-speed circle has a faster angular cadence. The missing
mathematics is not that endpoint relation; it is the lawful event and history
update that could carry one binary from one endpoint to the other.

### 11.2 Higher path-speed ceiling: $c_a>c_f$

This regime is the controlled bridge from a finite path-speed ceiling to the
canonical unrestricted path domain. A finite $c_a>c_f$ still bounds every
path, but it permits above-wake-speed segments. As the permitted ceiling is
raised, the same additional partner-root and same-transmitter-root families
remain admissible over a larger path domain. Removing the ceiling altogether
removes the speed-bound argument used in Section 9 to make one ordered
channel's emission-time root set monotone.

Accordingly, the regular at-or-below-wake circular derivation cannot simply be
continued into this regime. Before a higher-speed circular binary can be
claimed, the analysis must give a complete root census, define admission and
ownership for every returned self and partner branch, and then form the full
ordinary ledger before applying the proposed response. No such higher-speed
binary result is derived here.

This is the same class of mathematical problem exposed by the coincidence
analysis: geometry can present returned, repeated, or co-moving causal roots
without itself deciding which ones are active receptions or how their ledger is
owned. In the coincidence chart the issue concentrates at one nonordinary
event. Above wake speed it can arise across an open interval of otherwise
positive-range motion, so it is broader than the frozen-root case.

Plainly: allowing a path to outrun a wake reopens the causal-root geometries
that the at-or-below-wake analysis avoided. A finite higher ceiling lets us
study that return in a bounded setting; no ceiling is the limiting unrestricted
case, not a consequence of the circular-binary result.

## 12. Noether braid

### 12.1 Analytic inverse problem

The exact two-label chart makes a three-binary construction plausible in one
specific mathematical sense: the proposed regular equation now has a known
zero-residual circular building block at field speed. A Noether braid is not
obtained by placing three independent copies beside one another, because every
additional label changes every receiver's complete causal-root ledger before
the response is applied. The constructive problem is therefore an inverse
problem for the full six-label history.

Claim grade: `derived analytic reduction and theorem target`. The equations in
this section are necessary and sufficient for a prescribed regular
field-speed circular chart to satisfy the proposed pointwise response. Their
three-binary solution set, retained-history realization, and stability are not
assumed.

Plainly: one exact binary supplies a candidate component, not a superposition
rule. The six paths must be solved together because each architrino receives
wakes from all five other labels.

#### Three antipodal field-speed binaries

Index the binaries by $a\in\{1,2,3\}$ and the two persistent members of each
binary by $\epsilon\in\{+1,-1\}$. Choose for each binary a center
$\mathbf C_a$, an oriented orthonormal plane frame
$(\mathbf e_{a1},\mathbf e_{a2})$, a radius $R_a>0$, an angular frequency
$\omega_a\ne0$, and a phase $\phi_a$. Define

$$
\vartheta_a(T)
=
\omega_aT+\phi_a,
$$

$$
\hat{\boldsymbol\rho}_{a\epsilon}(T)
=
\epsilon
\left(
\cos\vartheta_a(T)\,\mathbf e_{a1}
+
\sin\vartheta_a(T)\,\mathbf e_{a2}
\right),
$$

and

$$
\mathbf X_{a\epsilon}(T)
=
\mathbf C_a
+
R_a\hat{\boldsymbol\rho}_{a\epsilon}(T).
$$

The antipodal factor $\epsilon$ fixes the pair separation within each binary.
The common-center case has
$\mathbf C_1=\mathbf C_2=\mathbf C_3$; separated binary centers remain
available because some declared Noether-braid families do not use one common
center.

Every constituent lies on the field-speed boundary exactly when

$$
R_a|\omega_a|=c_f,
\qquad
a\in\{1,2,3\}.
$$

Its unit velocity direction and prescribed path acceleration are

$$
\hat{\mathbf t}_{a\epsilon}(T)
=
\frac{\mathbf V_{a\epsilon}(T)}{c_f},
\qquad
\mathbf A_{a\epsilon}^{\mathrm{path}}(T)
=
-
\frac{c_f^2}{R_a}
\hat{\boldsymbol\rho}_{a\epsilon}(T).
$$

Plainly: at field speed the radius and angular frequency are not independent.
Choosing one fixes the other, while the centers, plane orientations, and
relative phases still control the cross-binary wake geometry.

#### Complete ordinary root and acceleration system

Let $i=(a,\epsilon)$ be a receiver and $j=(b,\eta)$ a transmitter. A regular
positive-delay root is a number $\tau_{i\leftarrow j}(T)>0$ satisfying

$$
\left\|
\mathbf X_i(T)
-
\mathbf X_j(T-\tau_{i\leftarrow j}(T))
\right\|
=
c_f\tau_{i\leftarrow j}(T).
$$

At each such root define

$$
\hat{\mathbf r}_{i\leftarrow j}(T)
=
\frac{
\mathbf X_i(T)-\mathbf X_j(T-\tau_{i\leftarrow j}(T))
}{c_f\tau_{i\leftarrow j}(T)},
$$

and

$$
D_{t,i\leftarrow j}(T)
=
c_f
-
\hat{\mathbf r}_{i\leftarrow j}(T)
\mathbin{\cdot}
\mathbf V_j(T-\tau_{i\leftarrow j}(T)).
$$

Restrict the first analytic attack to collision-free histories for which every
admitted root is simple and uniformly separated from the nonordinary strata:

$$
\tau_{i\leftarrow j}(T)>0,
\qquad
r_{i\leftarrow j}(T)>0,
\qquad
D_{t,i\leftarrow j}(T)\ge d_0>0.
$$

The ceiling-domain root monotonicity theorem gives at most one ordinary root per
ordered channel. A circular same-transmitter channel has no positive-delay
root because a nontrivial chord is strictly shorter than its field-speed arc.
The complete ordinary net acceleration for receiver $i$ is therefore

$$
\mathbf A_i^{\mathrm{ord}}(T)
=
\sum_{j\ne i\,:\,\tau_{i\leftarrow j}(T)\ \mathrm{exists}}
\kappa\,\sigma_{ji}|q_jq_i|
\frac{c_f}
{r_{i\leftarrow j}(T)^2D_{t,i\leftarrow j}(T)}
\hat{\mathbf r}_{i\leftarrow j}(T).
$$

Every row in this sum is retained with its source label and root time. No row
is clipped, weakened, redirected, or projected separately.

Plainly: the closed speed domain turns root enumeration into a finite
per-channel problem on this regular chart. The difficult part is the vector
sum: cross-binary rows can change both the turning direction and the net
forward or backward component.

#### Necessary-and-sufficient field-speed braid criterion

For each receiver define the completed net velocity-parallel scalar

$$
g_i(T)
=
\hat{\mathbf t}_i(T)
\mathbin{\cdot}
\mathbf A_i^{\mathrm{ord}}(T),
$$

and the completed net component perpendicular to the velocity,

$$
\mathbf B_i(T)
=
\left(
\mathbf I
-
\hat{\mathbf t}_i(T)
\hat{\mathbf t}_i(T)^{T}
\right)
\mathbf A_i^{\mathrm{ord}}(T).
$$

The prescribed six-path chart satisfies the proposed regular response
pointwise if and only if, for every label $i=(a,\epsilon)$ and every time in
the declared history,

$$
\boxed{
g_i(T)\ge0
}
$$

and

$$
\boxed{
\mathbf B_i(T)
=
-
\frac{c_f^2}{R_a}
\hat{\boldsymbol\rho}_i(T).
}
$$

Indeed, when $g_i\ge0$, the proposed response removes exactly
$g_i\hat{\mathbf t}_i$ and leaves $\mathbf B_i$. If $g_i<0$, the backward
component is retained and the effective acceleration cannot equal the purely
velocity-perpendicular circular path acceleration. The vector equation also
requires every out-of-plane component to vanish; an inward scalar balance
alone is insufficient.

Claim grade: `derived exact compatibility criterion under the proposed
regular response`. It is falsified by one complete regular prescribed chart
whose pointwise equation closes while either boxed condition fails, or by a
chart satisfying both conditions whose projected residual is nonzero.

Plainly: the ceiling does not need every individual wake to point forward.
It needs the completed net parallel component of every architrino to be
nonnegative. The response then caps that one net component, while the remaining
two-dimensional perpendicular vector must supply exactly the required inward
turn and no out-of-plane deflection.

#### Reverse solution rather than a universal-forward theorem

The practical construction problem is to solve the boxed equality and
inequality for

$$
\left(
R_1,R_2,R_3,
\omega_1,\omega_2,\omega_3,
\phi_1,\phi_2,\phi_3,
\mathbf C_1,\mathbf C_2,\mathbf C_3,
\mathbf e_{a1},\mathbf e_{a2}
\right),
$$

subject to $R_a|\omega_a|=c_f$, collision avoidance, simple-root floors, and
the declared Noether-braid geometry. A theorem saying that every member of a
broad geometric family automatically has $g_i\ge0$ would be stronger, but the
existing negative six-path calculation shows that symmetry and clean roots do
not automatically close the required vector response. The reverse problem is
therefore the primary route: find the parameter tuples for which all twelve
conditions---six scalar inequalities and six perpendicular vector
equalities---hold for the entire return interval.

Because the root functions and acceleration rows are analytic away from
collisions and nonordinary strata, a periodic candidate can be tested by its
Fourier residuals. If $T_{\mathrm{ret}}$ is a common return period and
$\Omega=2\pi/T_{\mathrm{ret}}$, define

$$
\widehat{\mathbf Q}_{i,m}
=
\frac{1}{T_{\mathrm{ret}}}
\int_0^{T_{\mathrm{ret}}}
\left[
\mathbf B_i(T)
+
\frac{c_f^2}{R_a}
\hat{\boldsymbol\rho}_i(T)
\right]
e^{-im\Omega T}\,dT.
$$

Exact circular closure requires

$$
\widehat{\mathbf Q}_{i,m}=\mathbf0
\quad
\text{for every }i\text{ and }m\in\mathbb Z,
\qquad
\min_T g_i(T)\ge0.
$$

Symmetry can reduce this infinite coefficient family to finitely many orbit
representatives or harmonics only after that reduction is proved for the
declared geometry.

Plainly: the analytic search is a nonlinear spectrum problem. A numerical
sample can reject a candidate, but an exact retained chart requires the whole
periodic residual to vanish, not only a few phases or an average.

#### Frequency commensurability and phase data

An unperturbed three-binary chart has one common return period only if there
are nonzero integers $k_a$ such that

$$
\omega_aT_{\mathrm{ret}}
=
2\pi k_a,
\qquad
a\in\{1,2,3\}.
$$

Writing $\Omega=2\pi/T_{\mathrm{ret}}$ gives

$$
\omega_a=k_a\Omega,
\qquad
R_a
=
\frac{c_f}{|k_a|\Omega},
$$

and therefore

$$
\frac{R_a}{R_b}
=
\frac{|k_b|}{|k_a|}.
$$

Thus a periodic field-speed braid cannot choose three radii and three
frequencies independently. A primitive winding triple
$\mathbf k=(k_1,k_2,k_3)$ fixes the radius ratios; one common scale
$\Omega^{-1}$ remains for the vector ledger to select.

Equal frequency is only the primitive case $\mathbf k=(1,1,1)$.  Triples such
as $(1,2,3)$ and $(1,2,4)$ are equally legitimate periodic kinematic
candidates, with inverse radius ratios.  This arithmetic classifies possible
common-return charts; it does not assert that any such triple has a complete
ledger zero, remains in orthogonal planes, or is stable.

For fixed marked oriented plane frames, absolute-time translation changes the
phase origins by
$\phi_a\mapsto\phi_a+\omega_a\tau$. Let
$\boldsymbol\ell^{(1)},\boldsymbol\ell^{(2)}$ be an integer basis of the
primitive lattice

$$
\left\{
\boldsymbol\ell\in\mathbb Z^3:
\boldsymbol\ell\mathbin{\cdot}\mathbf k=0
\right\}.
$$

Two global relative-phase coordinates on the quotient by absolute-time
translation may then be chosen as

$$
\Psi_1
=
\boldsymbol\ell^{(1)}
\mathbin{\cdot}
\boldsymbol\phi,
\qquad
\Psi_2
=
\boldsymbol\ell^{(2)}
\mathbin{\cdot}
\boldsymbol\phi,
$$

with the appropriate $2\pi$ identifications. The tempting pair
$k_1\phi_2-k_2\phi_1$ and $k_1\phi_3-k_3\phi_1$ is locally independent but
need not separate all global phase sheets when $|k_1|>1$. For the primitive
equal-frequency winding $\mathbf k=(1,1,1)$, a lattice basis gives the familiar
relative phase differences $\phi_2-\phi_1$ and $\phi_3-\phi_1$.
Incommensurate frequencies instead give a quasiperiodic phase torus and have
no finite common return period; they require a separate almost-periodic closure
definition.

If the plane frames themselves vary, the parameterization has three additional
representation redundancies:

$$
(\mathbf e_{a1},\mathbf e_{a2},\phi_a)
\mapsto
(\operatorname{Rot}_{\alpha_a}\mathbf e_{a1},
 \operatorname{Rot}_{\alpha_a}\mathbf e_{a2},
 \phi_a-\alpha_a).
$$

These triples describe the same path and must be fixed by a frame convention
or quotiented before parameter counting. The sign of $k_a$ is likewise defined
relative to the marked orientation of its plane frame.

Claim grade: `derived kinematic phase-return arithmetic`. It does not show
that any winding triple satisfies the complete wake ledger.

Plainly: possible unperturbed periodic combinations are organized first by
integer winding ratios, then by two genuine relative phases, plane geometry,
and one overall scale. The causal-root and vector equations decide which of
those combinations, if any, survive.

### 12.2 Scale, radius, and frequency consequences

#### Homothetic scale-selection theorem

Take a fixed collision-free dimensionless six-path shape
$\overline{\mathbf X}_i(u)$ and form its homothetic family

$$
\mathbf X_i^{(L)}(T)
=
L\overline{\mathbf X}_i
\left(
\frac{c_fT}{L}
\right),
\qquad
L>0.
$$

Assume the polarity and coupling coefficients are fixed, the same simple root
topology persists, and every geometric length scales by $L$. Dimensionless
root lags, directions, and normalized transmitter factors are then independent
of $L$. The complete raw acceleration and prescribed path acceleration scale
as

$$
\mathbf A_i^{\mathrm{ord},(L)}
=
L^{-2}\overline{\mathbf A}_i^{\mathrm{ord}},
\qquad
\mathbf A_i^{\mathrm{path},(L)}
=
\frac{c_f^2}{L}
\overline{\mathbf X}_i''.
$$

Define the physical ceiling velocity on the dimensionless chart by

$$
\overline{\mathbf V}_i(u)
=
c_f\overline{\mathbf X}_i'(u).
$$

The proposed response is positively homogeneous, so exact compatibility is
equivalent to

$$
\mathcal P_{\overline{\mathbf V}_i}
\left(
\overline{\mathbf A}_i^{\mathrm{ord}}(u)
\right)
=
c_f^2L\overline{\mathbf X}_i''(u)
$$

for every label and phase. Hence a fixed noninertial dimensionless shape has
at most one positive compatible scale unless the displayed vectors vanish or
a degeneracy changes the root chart. Existence requires every label and phase
to select the same scalar $L$ with the same vector direction.

Claim grade: `derived homothetic scale-selection theorem` on the stated
regular chart. It is falsified by two different positive scales with identical
dimensionless paths, fixed couplings, identical root topology, and nonzero
path curvature that both satisfy the proposed equation.

Plainly: field-speed geometry can be scale-free while inverse-square dynamics
is not. A successful braid shape does not come in arbitrary enlarged and
shrunken copies; the acceleration equation selects one scale or rejects the
shape.

#### Isolated field-speed binary frequency in normalized units

For the exact binary of Section 11.1.1,

$$
R_\ast
=
\frac{K}
{4c_f^2D(1+\sin D)},
\qquad
D=\cos D.
$$

Its angular frequency, cycle frequency, period, and partner delay are

$$
\omega_\ast
=
\frac{c_f}{R_\ast}
=
\frac{4c_f^3D(1+\sin D)}{K},
$$

$$
f_\ast
=
\frac{\omega_\ast}{2\pi}
=
\frac{2c_f^3D(1+\sin D)}{\pi K},
$$

$$
T_\ast
=
\frac{1}{f_\ast}
=
\frac{\pi K}{2c_f^3D(1+\sin D)},
\qquad
\Delta_\ast
=
\frac{2R_\ast D}{c_f}.
$$

In normalized wake-speed units $c_f=1$,

$$
R_\ast
\approx
0.20211137351526113K,
$$

$$
\omega_\ast
\approx
\frac{4.9477670781574865}{K},
\qquad
f_\ast
\approx
\frac{0.7874615877561081}{K},
$$

and

$$
T_\ast
\approx
1.269903212484974K,
\qquad
\Delta_\ast
\approx
0.29875502283765176K.
$$

The delay occupies the radius-independent fraction

$$
\frac{\Delta_\ast}{T_\ast}
=
\frac{D}{\pi}
\approx
0.2352581046338496
$$

of one revolution.

Plainly: ``the frequency of the $c_f=1$ binary'' is not an additional free
number. Once the existing coupling scale $K$ is specified, the Dottie-number
geometry fixes the radius, angular frequency, ordinary cycle frequency,
period, and causal delay together.

#### Small-radius obstruction

For the isolated pair, the ordinary partner root remains simple at every
$R>0$, but its projected inward acceleration grows as $R^{-2}$ while the
required field-speed curvature grows only as $R^{-1}$. The exact balance
therefore occurs only at $R_\ast$.

More generally, consider one field-speed binary inside a candidate braid and
suppose all nonpartner received ranges remain above $r_0>0$ and all their
transmitter factors remain above $d_0>0$ as $R_a\to0^+$. Those external rows
are $O(1)$, while the internal partner row is $O(R_a^{-2})$ and the required
curvature is $O(R_a^{-1})$. No sequence of exact circular solutions can then
have $R_a\to0^+$.

A small-radius solution sequence would require at least one of the following:

1. another received range shrinking as $O(R_a)$ and contributing at
   $O(R_a^{-2})$;
2. a complete-ledger cancellation of the leading $R_a^{-2}$ coefficient that
   leaves the required $R_a^{-1}$ term;
3. a root-topology or event transition out of the declared regular chart; or
4. a separately proposed change to the point inverse-square law.

Claim grade: `derived conditional small-radius obstruction`. It supplies no
universal minimum radius without the stated external-range and root-factor
floors.

Plainly: the speed ceiling alone does not install a hard core. It does make an
isolated or externally well-separated field-speed binary too strongly curved
as its radius approaches zero. A still-smaller braid layer would need another
nearby row to cancel the leading singularity or would have to leave the
ordinary chart.

#### Radius limits still to prove

The current analytic results distinguish three questions.

- **Exact isolated radius:** $R_\ast$ is proved for the two-label prescribed
  field-speed chart.
- **Scale of a fixed braid shape:** the homothetic theorem permits at most one
  compatible overall scale.
- **Global minimum and maximum over all braid shapes:** open. Proving either
  requires compactness or coercivity of the admissible shape domain together
  with collision, root-factor, and phase-return bounds.

An admissible-radius theorem should therefore optimize over the exact residual
set, not assume a preferred small scale:

$$
R_{\min}^{\mathrm{braid}}
=
\inf
\left\{
\min_aR_a:
\text{all complete-ledger braid conditions hold}
\right\},
$$

with an analogous supremum for $R_{\max}^{\mathrm{braid}}$. A positive value
is a theorem only if the admissible set is nonempty and the small-radius escape
routes above are excluded.

Plainly: the first binary has a selected radius, but the smallest possible
radius across every coupled braid geometry remains a genuine analytic
optimization problem.

### 12.3 Closed-cycle action transfer

#### Which $h$ is under discussion

Use $h_{\mathrm{act}}$ for a candidate closed-cycle action unit carried by a
retained braid. It is distinct from the finite-memory depth used elsewhere and
is not identified here with the observer-level Planck constant $h$. That
identification remains a separate action-scale recovery target.

If the complete retained history and every typed root, wake, action, boundary,
and event ledger return after one period without an intervening event stratum,
the branch and action labels return to their initial values. This excludes a
net inter-level transaction per cycle, but not an owned intra-cycle exchange.
A repeating spatial geometry alone does not establish that ledger closure. A
transfer is a transition between two admissible complete branch records, not a
property of one stationary path configuration.

Plainly: the unperturbed mathematics can identify possible levels and their
cycle data. Moving one action unit between levels is a separate event problem.

#### Endpoint equations for a one-unit transfer

Collect one branch record into

$$
\mathbf z
=
\left(
R_a,\omega_a,\phi_a,\mathbf C_a,
\mathbf e_{a1},\mathbf e_{a2},
\mathbf k,\mathcal L,\mathcal G
\right),
$$

where $\mathcal L$ is the labeled causal-root ledger and $\mathcal G$ denotes
the inter-binary wake-exchange record. Separate the equality residuals,
inequality margins, and simple-root domain as

$$
\mathfrak F_{\mathrm{eq}}(\mathbf z)=0,
\qquad
\mathfrak G(\mathbf z)\ge\mathbf0,
\qquad
\mathbf z\in\mathfrak D_{\mathrm{simp}}.
$$

Here $\mathfrak F_{\mathrm{eq}}$ owns phase return and vector response,
$\mathfrak G$ owns collision, speed-ceiling, separation, and transversality margins, and
$\mathfrak D_{\mathrm{simp}}$ owns the declared root topology. If an eventual
action functional supplies a closed-cycle ledger
$\mathcal A_{\mathrm{cyc}}(\mathbf z)$, a candidate one-unit transition from
$\mathbf z^-$ to $\mathbf z^+$ must at minimum satisfy all three endpoint
conditions:

$$
\mathfrak F_{\mathrm{eq}}(\mathbf z^-)=0,
\qquad
\mathfrak F_{\mathrm{eq}}(\mathbf z^+)=0,
$$

$$
\mathfrak G(\mathbf z^-)\ge\mathbf0,
\qquad
\mathfrak G(\mathbf z^+)\ge\mathbf0,
\qquad
\mathbf z^\pm\in\mathfrak D_{\mathrm{simp}},
$$

and a typed action-account target. Define
$\Delta\mathcal A_{\mathrm{cyc}}=
\mathcal A_{\mathrm{cyc}}(\mathbf z^+)-
\mathcal A_{\mathrm{cyc}}(\mathbf z^-)$, while
$\Delta\mathcal A_{\mathrm{wake}}$ and
$\Delta\mathcal A_{\partial}$ are respectively outgoing-minus-incoming action
assigned to the owned wake and boundary ledgers. One candidate orientation is

$$
\Delta\mathcal A_{\mathrm{cyc}}
+
\Delta\mathcal A_{\mathrm{wake}}
+
\Delta\mathcal A_{\partial}
=
\mathcal A_{\mathrm{evt}},
\qquad
\mathcal A_{\mathrm{evt}}
=
s_{\mathrm{act}}h_{\mathrm{act}},
\qquad
s_{\mathrm{act}}\in\{+1,-1\}.
$$

The displayed orientation and event coefficient are proposed account data,
not a conservation law derived from the acceleration equation. The event
record must also own every root or nonordinary stratum that changes between
$\mathcal L^-$ and $\mathcal L^+$ and must supply a compatible outgoing
history.

Plainly: both the pre-transition and post-transition braid must independently satisfy the full
dynamics. The transferred action cannot be assigned only to one binary while
the other radii, phases, roots, and outgoing wake account are left unchanged
by assumption.

#### How field-speed binaries must retune

Any binary that remains on the field-speed boundary on both sides obeys

$$
R_a^-|\omega_a^-|
=
R_a^+|\omega_a^+|
=
c_f.
$$

The exact finite relation is

$$
\ln\frac{R_a^+}{R_a^-}
=
-
\ln\frac{|\omega_a^+|}{|\omega_a^-|}.
$$

Along a smooth same-topology branch its differential form is

$$
d\ln R_a
=
-d\ln|\omega_a|.
$$

On a periodic branch with $\omega_a=k_a\Omega$, a same-winding retuning changes
the common cadence $\Omega$ and therefore rescales all field-speed radii
inversely. A change in any integer $k_a$ is a branch transition: the allowed
radius ratios and phase invariants change discretely and the complete root
ledger must be rebuilt.

If exact periodic closure has first been proved equivalent to a finite
symmetry-reduced equality-residual map, write that map as
$\mathbf F(\mathbf y)$ in continuous branch coordinates $\mathbf y$. Until
such a finite reduction is proved, the corresponding derivative is an
operator on the full Fourier residual sequence rather than a finite matrix.
Carry the speed-ceiling inequalities as a separate margin vector
$\mathbf G(\mathbf y)\ge\mathbf0$. For a differentiable family
$\mathbf y(\varepsilon)$ through a point with strict speed-ceiling margins, the
same-chart tangent $\dot{\mathbf y}=d\mathbf y/d\varepsilon|_0$ must solve

$$
D\mathbf F(\mathbf y)[\dot{\mathbf y}]
=
\mathbf0,
$$

together with the infinitesimal account equation

$$
D\mathcal A_{\mathrm{cyc}}(\mathbf y)[\dot{\mathbf y}]
+
\dot{\mathcal A}_{\mathrm{wake}}
+
\dot{\mathcal A}_{\partial}
=
\dot{\mathcal A}_{\mathrm{evt}}.
$$

At an active speed-ceiling margin, the corresponding first-order tangent inequality
must also be imposed:

$$
D\mathbf G_{\mathrm{act}}(\mathbf y)[\dot{\mathbf y}]
\ge
\mathbf0.
$$

Such a boundary point is a complementarity problem, not an unconstrained
smooth residual zero.

Under invariant retained-history and boundary hypotheses, fix a slice
transverse to the exact $E(3)\times\mathbb R$ symmetry-group orbit. These are
symmetry directions, not presumed gauge redundancies. On that slice, local
uniqueness requires the bordered derivative to be injective; in a square
finite-dimensional reduction it must be nonsingular. The wake, boundary, and
event-account rates must be prescribed or independently constrained rather
than left free. Even then, the tangent system is only a local diagnostic. A
finite one-unit transaction is governed by the endpoint equations and can
cross a root or speed-ceiling-margin boundary.

Equivariance of the proposed Euclidean projection under the declared symmetry
group supplies no Noether charge by itself because no generating variational
action for that response has been established.

Claim grade: `derived endpoint and tangent constraints conditional on an
accepted action ledger`. No value of $h_{\mathrm{act}}$ or transfer map is
derived here. A proposed transfer fails this interface if either endpoint is
not an admissible residual zero, if any root or event account is duplicated or
omitted, if the action balance changes under an allowed ledger
reparameterization, or if the event supplies no compatible outgoing history.

Plainly: a field-speed binary that tightens must speed up in angular cadence,
and one that expands must slow down. Which binaries do which is determined by
the full constrained residual and action account, not by fixed roles assigned
to binary indices.

#### Exact missing event datum

The proposed regular response supplies no event that transfers
$h_{\mathrm{act}}$. Earlier above-field-speed root-birth proposals relied on a
same-transmitter root birth beyond the field-speed threshold; that route is not
available inside the closed primitive velocity domain. A ceiling-compatible
transfer would need a separately typed event, for example a finite-chord
cross-label root transition or a Noether sea boundary exchange, together with
its guard, reset, root ownership, wake account, and post-event history.

This document does not select that event. Its analytic contribution is the
endpoint manifold and retuning system against which any proposed transfer can
be tested.

Plainly: the ceiling sharpens the $h_{\mathrm{act}}$ question. It provides
well-defined candidate levels, but it removes the previously imagined
above-field same-transmitter root birth. The missing object is now a lawful transition
between two complete field-speed braid records.

### 12.4 Volumetric braid assemblies and the Noether-sea interface

The finite three-binary problem is not yet a Noether sea. A sea would be a
volumetric collection of braid records with additional geometry and causal
accounting; it cannot be obtained by placing independently solved finite
braids beside one another. Each added braid changes the complete wake ledger
of every receiver in its causal domain.

The required construction has five parts:

1. define the local braid record, its center, orientation, phase, winding, and
   density over a region of the Euclidean void;
2. specify a locally finite or otherwise controlled many-braid causal-root
   ledger, including the treatment of distant earlier wakefronts;
3. derive the collective response from that ledger rather than postulating a
   background medium or an averaged binding rule;
4. define boundary and exchange records for a finite region, including any
   proposed transfer between a braid and the surrounding sea; and
5. prove the relevant speed-ceiling, root-separation, and persistence bounds
   for the resulting many-braid history.

No density law, sea equilibrium, constitutive response, or exchange mechanism
is derived here. This subsection is an interface and derivation program, not a
claim that the finite braid already extends to a volumetric sea.

Plainly: a Noether sea needs a rule for how many braids occupy a volume and how
all of their wakes add up. The finite-braid equations are a possible building
block, but they are not the sea itself.

## 13. Cycle diagnostics, energy interface, and persistence

### Exact per-revolution acceleration-work diagnostic

At the Master Equation level, acceleration is primitive and architrinos have
no primitive mass. The quantity available directly from one periodic path is
the velocity-squared cycle diagnostic

$$
\mathcal J_i^{\mathrm{raw}}
=
\int_0^{T_a}
\mathbf V_i(T)
\mathbin{\cdot}
\mathbf A_i^{\mathrm{ord}}(T)
\,dT,
$$

with the effective counterpart obtained by replacing
$\mathbf A_i^{\mathrm{ord}}$ by $\mathbf A_i^{\mathrm{eff}}$. These are not
energies; multiplying them by an effective response coefficient would be an
additional assembly-level bookkeeping step.

For one exact isolated field-speed binary, the raw forward component is
constant. Each label has

$$
\mathcal J_{\mathrm{label}}^{\mathrm{raw}}
=
2\pi R_\ast a_\theta
=
2\pi c_f^2\frac{\sin D}{D},
$$

and the two-label binary has

$$
\mathcal J_{\mathrm{binary}}^{\mathrm{raw}}
=
4\pi c_f^2\frac{\sin D}{D}.
$$

In normalized units $c_f=1$,

$$
\mathcal J_{\mathrm{label}}^{\mathrm{raw}}
\approx
5.726578731318179,
\qquad
\mathcal J_{\mathrm{binary}}^{\mathrm{raw}}
\approx
11.453157462636359.
$$

The proposed response removes the completed forward term at every phase, so

$$
\mathcal J_{\mathrm{label}}^{\mathrm{eff}}
=
\mathcal J_{\mathrm{binary}}^{\mathrm{eff}}
=
0.
$$

This zero says that the exact circle has no effective speed change over a
revolution. It does not say where the rejected raw forward account is stored,
transferred, or conserved; the proposed normal-cone response still needs a
compatible action or wake-update ledger for that statement.

Claim grade: `derived exact cycle diagnostic under the proposed response`.
It is not an energy or conservation result.

Plainly: the raw delayed partner wake tries to increase the tangential speed
on every revolution. The ceiling response cancels that speed-changing effect, leaving zero
effective speed gain. The mathematics has not yet identified the accounting
destination of the cancelled raw contribution.

### What ``energy stored per revolution'' can mean

For a retained assembly with an accepted canonical cycle pair
$(Q_a,\Pi_a)$, the closed-cycle action allocation would be

$$
\mathcal A_{\mathrm{cyc},a}
=
\oint_{\gamma_a}
\Pi_a\,dQ_a.
$$

If a separately derived same-record identity supplies a constant binary
energy readout $E_a$, a cycle frequency $f_a$, and the relation
$\mathcal A_{\mathrm{cyc},a}=E_aT_a$, then

$$
\mathcal A_{\mathrm{cyc},a}
=
E_aT_a
=
\frac{E_a}{f_a},
\qquad
E_a
=
f_a\mathcal A_{\mathrm{cyc},a}.
$$

Under the additional candidate allocation
$\mathcal A_{\mathrm{cyc},a}=N_ah_{\mathrm{act}}$ with
$N_a\in\mathbb Z$, this becomes

$$
E_a
=
N_ah_{\mathrm{act}}f_a.
$$

For the isolated field-speed binary, substitution of the exact frequency
would give the conditional readout

$$
E_\ast
=
N_ah_{\mathrm{act}}
\frac{2c_f^3D(1+\sin D)}{\pi K}.
$$

For two candidate records, a frequency-step expression is available only under
the same additional identity and allocation assumptions:

$$
\Delta E_a
=
N_a^+h_{\mathrm{act}}f_a^+
-
N_a^-h_{\mathrm{act}}f_a^-.
$$

This is a conditional interface, not a calculated energy gap.  In particular,
there is presently no derived tightest binary, minimum admissible radius,
terminal frequency, potential-zero convention, or identification of
$h_{\mathrm{act}}$ with observer-level $h$ or $\hbar$.

None of these energy equations is licensed until the causal action or wake
update defines $\Pi_a$, the cycle allocation, the wake and boundary terms, and
the same-record energy account, including the branch-specific identity
$\mathcal A_{\mathrm{cyc},a}=E_aT_a$. The phrase ``per revolution'' properly
refers to closed-cycle action or transferred account. The displayed energy
readout exists only on a branch for which that additional identity is derived.

Claim grade: `typed conditional energy/action interface`, not a derived energy
level and not an identification of $h_{\mathrm{act}}$ with observer-level
Planck $h$. The readout is falsified if an accepted same-record action does not
satisfy $\mathcal A_{\mathrm{cyc}}=ET$, if the cycle allocation is not integral
in $h_{\mathrm{act}}$, or if the extracted unit changes across the declared
equivalence class. Any such failure removes
$E=N h_{\mathrm{act}}f$ without changing the orbital or acceleration-work
results.

Plainly: the current dynamics can calculate the orbit and its cycle-response
diagnostic. A stored-energy number requires both a conjugate action ledger and
the separately proved branch identity connecting that action to energy and
period; neither has yet been supplied.

### Self-sustaining versus stable

A prescribed periodic chart that closes every root and vector residual
reproduces its own unperturbed path pointwise. That earns the narrow statement
that the chart is self-sustaining in the absence of perturbation, conditional
on membership in the eventual solution class. It does not say what happens
after a perturbation. That stronger robustness statement requires an
orbital-stability theorem for the projected state-dependent-delay equation.

After the history phase space and solution concept are declared, the correct
linear test is the monodromy operator of the full-history return map. Fix a
slice transverse to the full declared $E(3)\times\mathbb R$ symmetry orbit. A
standard sufficient hyperbolic criterion for exponential orbital asymptotic
stability modulo those symmetries is fully symmetry-reduced monodromy spectral
radius strictly below one, together with collision, root-separation,
speed-ceiling-margin, and event-domain floors over the perturbation tube. Unit-modulus or
nonhyperbolic modes require nonlinear return-map analysis. Orbital or
Lyapunov stability and basin attraction are separate claims; neither follows
from the displayed sufficient criterion alone.

The proof order is strict:

1. solve the exact complete-ledger braid residual;
2. place that periodic chart in the declared delay-equation solution class;
3. differentiate the history-to-root-to-ledger map on its simple-root tube;
4. construct the fully symmetry-reduced monodromy operator; and
5. prove or refute the multiplier bound.

No stability spectrum may be computed about a nonzero-residual prescribed
geometry. A nonzero-residual prescribed geometry therefore cannot serve as a
stability base point.

Plainly: an exact repeating braid would establish unperturbed persistence.
Survival after a small disturbance is a separate theorem, and it can be asked
only after an exact braid has been found.

### Current constructive conclusion

The analytic status is now:

1. one isolated field-speed binary has an exact zero-residual prescribed
   circular chart and a selected radius and frequency;
2. a periodic three-binary field-speed chart is reduced to integer winding
   data, two relative phases, plane and center geometry, one overall scale,
   finite per-phase simple-root equations, six net-forward inequalities, and
   six perpendicular vector equations;
3. fixed-shape scale freedom is removed by the homothetic theorem;
4. small-radius escape is obstructed unless another near row or leading
   cancellation enters;
5. $h_{\mathrm{act}}$ transfer is reduced to a transition between two exact
   residual zeros plus a separately typed event and action account; and
6. the per-revolution acceleration-work diagnostic is exact, while stored
   energy remains conditional on the missing action/update ledger.

The construction is now an explicit regular-chart residual problem inside the
proposed field-speed model. It is not evidence that the residual system has a
three-binary zero, that any zero is stable, or that it recovers particle,
conservation, Planck-action, or observer-level claims.

Plainly: the proposal is now expressed as a testable analytic program.
The next decisive result is an exact three-binary zero or a theorem excluding
a declared geometry class.

## 14. Claim boundary

This document is not a derivation of a speed ceiling, a general continuation
law, a root regularization, a regulator-independent nonordinary-event measure, an
energy/momentum account, a Lorentz result, or a physical claim. It now
establishes the conditional collinear open-segment ledger, its coincidence
partner-nonordinary-event obstruction, the
velocity-preserving outgoing coincidence immediate position-and-velocity data from one proposed zero-impulse
event postulate, a first
transverse linearization, one exact field-speed circular two-label
prescribed-chart compatibility result under the proposed regular response
law, its selected radius and frequency, the necessary-and-sufficient
complete-ledger criterion for a prescribed regular field-speed braid, the
periodic winding and relative-phase reduction, the homothetic scale-selection
theorem, the conditional small-radius obstruction, and exact raw and effective
per-revolution acceleration-work diagnostics. It also supplies only a typed
endpoint interface for $h_{\mathrm{act}}$ transfer, binary retuning, and a
possible energy readout: no action-transfer event, action functional, energy
account, or conservation law has been derived. It does not adopt the ceiling, supply a finite unique history on an open
post-coincidence interval, define the receiver-side nonordinary-event measure, prove
perturbative weak convergence, find or retain a three-binary braid, prove
orbital stability, identify $h_{\mathrm{act}}$ with observer-level Planck
$h$, or advance a closure score.
