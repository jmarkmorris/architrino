# Dynamics

## Master Equation of Motion

This chapter is the canonical statement of the delayed dynamical law used throughout the dynamics branch. It defines what counts as a causal hit, how the receiver-local force law is assembled from path history, and which exact or regularized structures are firm enough to support later work on binaries, tri-binaries, effective geometry, and quantum closure.

For the primitive-entity ontology, see [Architrino](../../../../markdown/aaa/foundations/architrino.md). This chapter begins where ontology stops: once continuous transceiver status is turned into a delay-root law, causal-hit branch sum, Jacobian-weighted acceleration, or regularized simulation equation.

The chapter is long because it plays several roles at once: foundational law, theorem spine, analytic benchmark source, and numerical reference. The opening establishes the causal geometry and canonical equation; later sections develop DDE form, self-hit structure, analytic regimes, and the energy-symmetry-conservation interface.

### Foundations and Causal Geometry

#### Purpose and Scope

This document presents the **Master Equation of Motion (EOM)** governing the lawful evolution of all architrinos in the Euclidean void and absolute time. It is the microscopic dynamics input for later closure programs: assemblies, effective continuum descriptions, observer-level geometry, quantum behavior, and gravity must be recovered from this law only after the corresponding assembly, coarse-graining, and validation burdens are met. The chapter keeps $c_f$ explicit in formulas; setting $c_f=1$ is a nondimensional convention, not a change in the causal law.

Proper time $\tau$ does not exist at this layer. The EOM is integrated exclusively over absolute substrate time $t$. Causal roots, Jacobians, history integrals, and accelerations are all parameterized by $t$ and by emission times $t_0<t$. Clock readouts, time-dilation language, and effective metric comparisons belong only to later observer-inference chapters after the assembly dynamics have supplied a branch-certified period record.

The Master EOM is:

- **Deterministic**: Given complete initial conditions at $t_0$, the future is determined, with **deterministic multistability** at threshold regimes.
- **Non-Markovian**: Depends on full path history, not just instantaneous state.
- **Event-local at the receiver**: Only delayed causal intersections at the receiver event contribute to acceleration (no action-at-a-distance).
- **Causal**: All influences propagate at finite field speed $c_f$.
- **Self-consistent**: Includes self-interaction (self-hit) when same-source causal roots exist; super-field-speed interval history is a necessary warning condition for simple nontrivial self-hit roots, not a sufficient criterion by itself.

The level distinction used throughout the chapter is:

| Level | What is asserted here | What is not asserted here |
| --- | --- | --- |
| Substrate ontology | Architrinos move in absolute time through the Euclidean void and emit causal wakes. | No fundamental spacetime metric, continuum field substance, or observer reconstruction is assumed. |
| Dynamics | Acceleration is the receiver-local sum over delayed causal-root hits. | A plotted orbit or numerical residual is not a proof unless its branch chart is certified. |
| Effective description | Potentials, fields, one-forms, metrics, and wave functions may be reconstructed after coarse-graining. | Effective variables are not promoted to substrate ontology by their predictive usefulness. |
| Inference and observation | A receiver or observer may infer source configurations from hit records and assembly responses. | Inference does not determine the full ontic history unless the missing path-history data are supplied. |

#### Overview and Key Principle

##### The Central Idea

**Receiver-local relevance principle:**

> The only substrate-level contributions to $\mathbf{a}_i(t)$ are causal wake intersections at the receiver event.

At time $t$, the acceleration of architrino $i$ at position $\mathbf{x}_i(t)$ depends only on causal wake surfaces that intersect its current location.

- **Substrate event**: $\mathbf{x}_i(t)$ coincides with an expanding causal isochron emitted by some source at some past time $t_0<t$.
- **Path-history input**: the source worldline determines which emission times solve the causal constraint.
- **Effective reconstruction**: a potential or field value away from the receiver is useful only after one has declared a continuum or diagnostic representation.
- **Inference layer**: source identity, distance, and emission velocity may be reconstructed from additional records, but they are not directly supplied by a single hit.

This is an **event-local delayed interaction rule**: the acceleration is evaluated at the receiver event, but depends on path history through the delayed causal roots.

In the absence of any causal hits, an architrino follows inertial motion: straight-line, constant-velocity trajectories in the fixed Euclidean background.

Operationally, the expanding causal wake is also the theory's minimal bridge between time and space. Absolute time orders emissions, Euclidean distance sets the propagation delay, and the receiver event is where those two inputs are rejoined into one physical interaction. The wake law is therefore not just a force prescription; it is the mechanism that turns temporal ordering plus spatial separation into concrete dynamics.

##### Abstract Form

The Master Equation of Motion (abstract level):

$$
\boxed{
\frac{d^2 \mathbf{x}_i}{dt^2} = \sum_{j \neq i} \mathbf{a}_{ij}(\text{causal history}) + \mathbf{a}_{ii}(\text{self-hit})
}
$$

where:

- $\mathbf{a}_{ij}(\text{causal history})$: Sum of all per-hit accelerations from source $j \neq i$ arriving at receiver $i$ at time $t$
- $\mathbf{a}_{ii}(\text{self-hit})$: Sum of all self-hit acceleration contributions (architrino $i$ intersecting its own past emissions)

(The per-hit acceleration $\mathbf{a}_{ij}(t; t_0)$ is defined below in canonical form. The substrate law is acceleration-first. If a force-like bookkeeping symbol is desired, introduce one universal conversion constant $\mu_{\text{arch}}$ and define $\mathbf{F}_{ij} \equiv \mu_{\text{arch}} \mathbf{a}_{ij}$.)

**Key insight:** Both terms have the same functional form: a radial inverse-square law modulated by the causal Jacobian $J_{ij}(t;t_0)$. They differ only in source identity ($j = i$ vs $j \neq i$).

##### Path-History Sum and Integral Representation

The Master EOM is most naturally understood as a **path-history branch sum**: all of the physical content resides in the past worldlines of the sources, and the causal constraint selects the emission points on those worldlines whose influence reaches the receiver event “now.”

In integral form, the same branch-sum law can be written as

$$
\frac{d^2 \mathbf{x}_i}{dt^2}
= \sum_j \kappa\,\sigma_{ij}\,|q_i q_j|
\int_{-\infty}^t \mathrm{d}t_0 \;
\frac{\hat{\mathbf{r}}_{ij}(t; t_0)}{r_{ij}^2(t; t_0)}
\delta\!\Big(g_{ij}(t; t_0)\Big),
$$

where

- $r_{ij}(t; t_0) = \|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\|$,
- $\hat{\mathbf{r}}_{ij} = (\mathbf{x}_i(t) - \mathbf{x}_j(t_0))/r_{ij}$,
- $g_{ij}(t;t_0) = r_{ij}(t;t_0) - c_f(t-t_0)$,
- $\partial_{t_0} g_{ij}(t;t_0) = c_f - \hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)$,
- $\delta(\cdot)$ enforces the causal constraint $g_{ij}=0$, and
- $\sigma_{ij} = \mathrm{sign}(q_i q_j)$ encodes attraction/repulsion.

The causal delta collapses with the standard root Jacobian, so the integral evaluates to
$$
\int_{-\infty}^{t}\mathrm{d}t_0\;
\! f(t_0)\,\delta\!\big(g_{ij}(t;t_0)\big)
=
\sum_{t_0\in\mathcal{C}_{ij}(t)}
\frac{f(t_0)}
{\left|\partial_{t_0} g_{ij}(t;t_0)\right|},
$$
provided the active roots are simple. This is the path-history integral representation of the exact branch law: acceleration at $t$ depends on the causal contributions selected by the source worldline, with no contribution from noncausal points on that worldline.

For a certified branch chart, simplicity is recorded as a transversality floor:
$$
\left|
\partial_{t_0}g_{ij}(t;t_0)
\right|
=
\left|
c_f-\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)
\right|
\ge
\kappa_{\mathrm{hit}}>0.
$$
When this floor fails, the active root is caustic-like or degenerate and must be routed to a different branch chart or regularization regime.

##### Caustic Transit and Finite Impulse

The branch expression with $|J_{ij}|^{-1}$ should not be interpreted as a permission to pin an architrino at an infinite pointwise force. At a simple delay-map caustic, the branch chart fails, but the time-integrated velocity change can remain finite.

Let $s$ denote the source emission-time variable near a degenerate root $(t_\ast,s_\ast)$, and assume the local delay map has the nondegenerate fold form
$$
g(t,s)
=
\alpha(s-s_\ast)^2
-
\lambda(t-t_\ast)
+
O\!\left(|s-s_\ast|^3+|t-t_\ast|\,|s-s_\ast|+|t-t_\ast|^2\right),
$$
with $\alpha>0$, $\lambda>0$, and $r_{ij}\ge r_{\min}>0$ on the local support. For $t<t_\ast$ the two simple roots satisfy
$$
s_\pm(t)
=
s_\ast
\pm
\sqrt{\frac{\lambda}{\alpha}(t_\ast-t)}
+
O(t_\ast-t),
$$
and the Jacobian factor scales as
$$
\left|\partial_s g(t,s_\pm(t))\right|
=
2\sqrt{\alpha\lambda}\sqrt{t_\ast-t}
+
O(t_\ast-t).
$$
Thus each branch contribution has at worst the local bound
$$
\left\|
\mathbf{a}_{ij,\pm}(t)
\right\|
\le
\frac{C}{\sqrt{t_\ast-t}},
$$
where $C$ absorbs the bounded numerator, $r_{\min}^{-2}$, polarity factor, and coupling. The mechanical impulse through the caustic window is finite:
$$
\int_{t_\ast-\varepsilon}^{t_\ast}
\left\|
\mathbf{a}_{ij,+}(t)
+
\mathbf{a}_{ij,-}(t)
\right\|dt
\le
4C\sqrt{\varepsilon}.
$$

The same conclusion holds for a finite-order algebraic caustic $g\sim (s-s_\ast)^m-\lambda(t-t_\ast)$ with finite $m > 1$: the branch weight scales like $|t-t_\ast|^{-(m-1)/m}$, which is locally integrable in receiver time. A persistent interval with $J=0$, a cusp with no finite-order normal form, or a simultaneous collision-floor failure is not covered by this impulse lemma and must remain in the regularized chart. The simulation rule is therefore: integrate the regularized acceleration through a caustic transit and record the finite $\Delta\mathbf{v}$; do not hold the state exactly on $J=0$ as an infinite-force constraint.

The word "set" in $\mathcal{C}_{ij}(t)$ should therefore be read as a root set extracted from a continuous path-history integral, not as a replacement for that history. The source worldline is continuous data. In the sharp causal-wake limit the delta constraint collapses the received contribution to the emission times in $\mathcal{C}_{ij}(t)$; with $\eta > 0$ mollification, the received contribution comes from finite-width neighborhoods of those roots. A single source can contribute more than one root at the same receiver event when its worldline crosses the receiver's backward causal surface more than once, especially in curved or super-field-speed history. The same bookkeeping applies to nontrivial self-history roots when $j=i$.

Writing
$$
J_{ij}(t;t_0)
\equiv
1-\frac{\mathbf{v}_j(t_0)\cdot\hat{\mathbf{r}}_{ij}(t;t_0)}{c_f},
$$
one obtains the exact branch-resolved form
$$
\frac{d^2 \mathbf{x}_i}{dt^2}
=
\sum_j \sum_{t_0\in\mathcal{C}_{ij}(t)}
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}
{r_{ij}^2(t;t_0)\,\left|J_{ij}(t;t_0)\right|}
\hat{\mathbf{r}}_{ij}(t;t_0).
$$
Since $\partial_{t_0}g_{ij}(t;t_0)=c_f J_{ij}(t;t_0)$, the collapse produces an overall factor $1/c_f$ together with $\left|J_{ij}\right|^{-1}$; by convention that constant factor is absorbed into $\kappa$.
An architrino emits potential at a constant rate per unit absolute time, but a moving source lays that steady output down on a moving family of causal surfaces. The **received causal flux** is therefore velocity dependent through the delay-map Jacobian: source motion geometrically compresses or dilates successive wake arrivals at the receiver. That $J_{ij}^{-1}$ factor is therefore part of the fundamental law, not an optional correction.

Numerical implementations discretize this representation by sampling candidate emission times and solving for the active roots. The familiar “sum over spherical wake surfaces” is therefore a numerical realization of the same branch-selection rule, not a separate physical mechanism.

**Simple-root transport lemma.** Let
$$
F_{ij}(t,s)=\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s),
$$
and suppose $F_{ij}(t,s(t))=0$ on an interval where the active root is simple. Then $s(t)$ is differentiable and
$$
\frac{ds}{dt}
=
\frac{c_f-\hat{\mathbf{r}}_{ij}(t;s)\cdot\mathbf{v}_i(t)}
{c_f-\hat{\mathbf{r}}_{ij}(t;s)\cdot\mathbf{v}_j(s)}
=
\frac{1-\hat{\mathbf{r}}_{ij}\cdot\mathbf{v}_i/c_f}{J_{ij}(t;s)}.
$$
Thus a simple causal root moves continuously with receiver time as long as the denominator stays away from zero. Simulations should track this root-transport residual alongside the root residual and the $J$ floor; failure of the transport equation is a branch-chart failure, not an ordinary force fluctuation.

##### Branch-Chart Closure Object

A local master-equation closure claim should be attached to an explicit branch-chart object, not just to a plotted orbit or a small force residual. For a branch chart on a section $\mathcal{S}$, define
$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
=
\left(
\mathcal{R}^{\mathrm{act}},
\mathcal{G}^{\mathrm{inact}},
\nu_J,
h_{\mathrm{mem}},
\mathcal{R}_{\mathrm{return}},
\lambda_{\mathrm{sec}}
\right).
$$
Here $\mathcal{R}^{\mathrm{act}}$ is the active causal-root set retained by the chart, $\mathcal{G}^{\mathrm{inact}}$ is the collection of inactive branch-gap functions, $\nu_J$ is the active-root Jacobian floor, $h_{\mathrm{mem}}$ is the required memory depth, $\mathcal{R}_{\mathrm{return}}$ is the return residual on the section, and $\lambda_{\mathrm{sec}}$ is the transverse section-stability margin.

The object is acceptable only when
$$
\nu_J>0,
\qquad
\inf_{\mathcal{G}^{\mathrm{inact}}} g_a^{ij}>0,
\qquad
0<h_{\mathrm{mem}}<h<\infty,
\qquad
\|\mathcal{R}_{\mathrm{return}}\|\le\epsilon_{\mathrm{return}},
$$
and the section return is stable, for example
$$
\rho\!\left(M_{\mathcal{S}}\vert_{E_\perp}\right)
\le
1-\lambda_{\mathrm{sec}},
\qquad
\lambda_{\mathrm{sec}}>0.
$$
The inactive-gap condition means that nearby discarded causal roots remain separated from the active chart; the stability condition means that a small transverse section error is trapped rather than amplified.

**Local promotion lemma.** If a candidate history supplies $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ with positive active-root floors, positive inactive gaps, finite memory, bounded return residual, and stable section monodromy, then the history may support a local master-equation closure claim on that section. The lemma does not prove global closure, eliminate all folds, control the $\eta\to0$ limit, or certify unrelated histories. It only promotes the branch chart from a numerical trace to a locally replayable causal-root closure record.

##### State-Dependent Delay Compatibility

A branch-chart closure object must also be compatible with the delayed history space that generates the active roots. Fix a retained history tube
$$
\mathcal{U}_{\mathfrak{B}}
\subset
C^1\!\left([-h,0],(\mathbb{R}^3)^N\right)
$$
around the returned history segment. For each active branch row $\ell$, write its emission offset as $s_\ell(\phi)\in[-h,0)$ for a history $\phi\in\mathcal{U}_{\mathfrak{B}}$, and define
$$
F_\ell(\phi,s)
=
\left\|
\phi_i(0)-\phi_j(s)
\right\|
-c_f(0-s).
$$
The branch chart is history-compatible on $\mathcal{U}_{\mathfrak{B}}$ only if
$$
F_\ell(\phi,s_\ell(\phi))=0,
\qquad
\left|\partial_s F_\ell(\phi,s_\ell(\phi))\right|
\ge c_f\nu_J>0,
$$
and if every inactive complement remains separated by the declared positive gap. Under these conditions the implicit-function theorem gives $C^1$ dependence of $s_\ell$ on the retained history, so the branch acceleration, root-transport residual, and wake-history Noether increments are functionals on one local history chart rather than pointwise rows that only happen to close at one evaluation time.

This compatibility condition is a theorem-target requirement, not a new force law. It says that a promoted branch chart must define a locally replayable delayed functional system: nearby retained histories must keep the same root identities, positive Jacobian floor, inactive gaps, and finite memory depth until a declared fold, branch transition, or chart boundary is reached.

##### Dual-Mollified Absolute-Time Evolution Law

For proof work, branch sums should be derived from one regularized absolute-time law rather than treated as the primary definition through every causal fold. Fix a memory horizon
$$
h>0,
$$
a causal-wake-surface width
$$
\eta>0,
$$
and a short-distance core scale
$$
\epsilon_c>0.
$$
Define
$$
\mathbf r_{ij}(t,s)
\equiv
\mathbf{x}_i(t)-\mathbf{x}_j(s),
\qquad
r_{ij}(t,s)\equiv \|\mathbf r_{ij}(t,s)\|,
$$
and, away from the zero vector,
$$
\widehat{\mathbf r}_{ij}(t,s)
\equiv
\frac{\mathbf r_{ij}(t,s)}{r_{ij}(t,s)}.
$$
The dual-mollified finite-memory evolution law is
$$
\boxed{
\ddot{\mathbf{x}}_i(t)
=
\kappa
\sum_j \sigma_{ij}|q_iq_j|
\int_{t-h}^{t}
\frac{\widehat{\mathbf r}_{ij}(t,s)}
{r_{ij}^2(t,s)+\epsilon_c^2}\,
\delta_\eta\!\big(r_{ij}(t,s)-c_f(t-s)\big)\,ds
}
$$
with the same sign convention
$$
\sigma_{ij}=\mathrm{sign}(q_iq_j)
$$
used in the exact branch law. For equal-magnitude charges
$$
|q_i|=\epsilon,
$$
the factor
$$
|q_iq_j|
$$
reduces to
$$
\epsilon^2.
$$

This equation is the certification-level law for the dual-mollified problem. The causal-surface mollifier
$$
\delta_\eta
$$
selects causal surfaces with finite width, while
$$
\epsilon_c
$$
caps the near-collision inverse-square amplitude. Branch-resolved formulas with Jacobian factors are local reductions of this equation on finite simple-root charts. They should not be used as the global definition across causal folds, caustic transit, or chart-boundary verification.

---

##### Regularized Energy Diagnostic for the Exact Charge

For computation with finite causal-wake-surface width $\eta>0$, it is useful to introduce an $\eta$-regularized diagnostic for the same history-aware energy charge tracked by the exact nonlocal action. When one wants a quadratic kinetic bookkeeping proxy, use a single universal conversion constant $\mu_{\text{arch}}$ rather than particle-specific substrate masses. This smooth expression is used for numerical evaluation and convergence testing of the conserved quantity:
$$
E_{\text{tot}}^{(\eta)}(t)
= \sum_i \frac{1}{2} \mu_{\text{arch}} \left\|\dot{\mathbf{x}}_i(t)\right\|^2
+ E_{\text{wake}}^{(\eta)}(t).
$$
For the regularized interaction diagnostic, a convenient working expression is:
$$
E_{\text{wake}}^{(\eta)}(t) =
\frac{1}{2}\sum_{i,j} \kappa\,\sigma_{ij}\,|q_i q_j|
\int_{t-\tau_{\max}}^{t} dt_0\;
\frac{1}{r_{ij}^2(t; t_0)\,\left|J_{ij}(t;t_0)\right|}\,
\delta_\eta\!\big(r_{ij}(t; t_0) - c_f(t - t_0)\big).
$$
where $\tau_{\max}$ bounds the causal memory depth used in analysis and simulation. Because this expression is written with the branch-level inverse-square force density, it should be treated as a diagnostic candidate unless it is derived from the same time-translation-invariant action-level regularization as the action charge below. If the dual-mollified law with a core cutoff $\epsilon_c$ is used, the energy diagnostic must carry the same cutoff convention. The nonlocal Noether charge used for theorem-level conservation is the boundary functional in [Action-level wake-energy functional at time boundary $t$](#action-level-wake-energy-functional-at-time-boundary-t).

#### Causal Interaction Set (The Geometry of Delay)

##### Definition of Causal Emission Times

For a receiver at position $\mathbf{x}_i(t)$ and a source with worldline $\mathbf{x}_j(t')$, the **causal emission times** $\mathcal{C}_{ij}(t)$ are all past times $t_0 < t$ such that a causal wake surface emitted by source $j$ at $t_0$ arrives at receiver $i$ at time $t$.

**Causal constraint:**

$$
\|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\| = c_f(t - t_0),
$$

where $c_f$ is the field speed (set to 1 in natural units).

**Notation:**

$$
\mathcal{C}_{ij}(t) = \Big\{ t_0 < t \;\Big|\; \|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\| = c_f(t - t_0) \Big\}.
$$

##### Causal-Time Map and Root Topology

For fixed receiver time $t$, define the causal-time map

$$
f_t^{(ij)}(t_0)
\equiv
t_0 + \frac{1}{c_f}\,\|\mathbf{x}_i(t)-\mathbf{x}_j(t_0)\|,
\qquad
F_t^{(ij)}(t_0)\equiv f_t^{(ij)}(t_0)-t.
$$

Then causal emission times are exactly the roots:

$$
t_0\in \mathcal{C}_{ij}(t)\quad \Longleftrightarrow\quad F_t^{(ij)}(t_0)=0.
$$

Operationally, this is the branchwise source-to-receiver reading of the dynamics. The source worldline supplies a path-history map $t_0\mapsto(\mathbf{x}_j(t_0),\mathbf{v}_j(t_0))$, while the receiver supplies the event data $(\mathbf{x}_i(t),\mathbf{v}_i(t),t)$. Solving $F_t^{(ij)}(t_0)=0$ selects exactly those source-history points whose causal isochrons are received at that event. Each selected root therefore maps one source-history branch into one receiver-local line of action; the delay-map Jacobian below records how constant source emission cadence is compressed or dilated when read at the receiver. When multiple roots exist, the causal-root ledger is the bookkeeping of these simultaneous source-to-receiver branch matches.

The one-dimensional delay-map Jacobian is

$$
\frac{dF_t^{(ij)}}{dt_0}
=
1-\frac{\hat{\mathbf{r}}_{ij}(t;t_0)\cdot \mathbf{v}_j(t_0)}{c_f}.
$$

On a bounded history interval $I_t$ (e.g., simulation memory window), define:

- Unsigned root count: $N_{ij}(t)\equiv \#\mathcal{C}_{ij}(t)$,
- Signed Brouwer degree:
  $$
  D_{ij}(t)\equiv \deg(F_t^{(ij)},I_t,0)=\sum_{t_0\in\mathcal{C}_{ij}(t)} \mathrm{sign}\!\left(\frac{dF_t^{(ij)}}{dt_0}\Big|_{t_0}\right).
  $$

##### Delay-Map Theorem Pack (Formalized)

Fix a bounded history interval $I_t=[a,b]\subset(-\infty,t)$ and define regularity conditions:

- **(R1) Boundary regularity:** $0\notin F_t^{(ij)}(\partial I_t)$ (no root crossing at $a$ or $b$).
- **(R2) Simple roots:** if $F_t^{(ij)}(t_0)=0$, then $\frac{dF_t^{(ij)}}{dt_0}(t_0)\neq 0$.

**Theorem 1 (Degree invariance on regular families).**
For any continuous deformation of worldlines/parameters that preserves (R1)-(R2), the signed degree
$D_{ij}(t)=\deg(F_t^{(ij)},I_t,0)$ is invariant.

*Proof sketch:* In 1D, $D_{ij}$ is the oriented count of simple roots. Under a regular homotopy, roots move continuously and cannot appear/disappear in the interior without becoming critical, and cannot enter/leave through the boundary by (R1). Hence the oriented count is constant.

**Proposition 2 (Sub-$c_f$ monotonic single-hit regime).**
If there exists $v_*<c_f$ such that $\|\mathbf{v}_j(t_0)\|\le v_*$ for all $t_0\in I_t$, then
$$
\frac{dF_t^{(ij)}}{dt_0}
\ge
1-\frac{v_*}{c_f}
>0,
$$
so $F_t^{(ij)}$ is strictly increasing on $I_t$. Therefore it has at most one root. If additionally $F_t^{(ij)}(a)<0<F_t^{(ij)}(b)$ (or the opposite sign ordering), then exactly one root exists and
$$
N_{ij}(t)=1,\qquad D_{ij}(t)=+1.
$$

*Proof sketch:* Strict positivity of the Jacobian gives monotonicity, hence injectivity. Existence under endpoint sign change follows by the intermediate value theorem.

**Proposition 3 (Fold criterion and even-jump law).**
In a one-parameter family $F^{(ij)}(t_0;\lambda)$ (with $\lambda$ a control parameter, e.g. receiver time or orbit parameter), interior root-count changes occur only at fold points:
$$
F^{(ij)}(t_0;\lambda)=0,\qquad \partial_{t_0}F^{(ij)}(t_0;\lambda)=0.
$$
For generic folds ($\partial_{t_0t_0}F\neq0$, $\partial_\lambda F\neq0$), one root pair is created/annihilated, so
$$
\Delta N_{ij}=\pm2,\qquad \Delta D_{ij}=0
$$
between regular intervals.

*Proof sketch:* Local normal form near a generic fold is equivalent to $u^2\pm\mu=0$, yielding either 0 or 2 simple roots. The two roots carry opposite Jacobian signs, so the degree is unchanged.

This delay-map theorem pack is foundational rather than merely model-specific. Within this chapter it serves as the fold-geometry reference for delayed-root constructions: regular charts preserve signed degree, while branch creation or annihilation requires a Jacobian-degenerate fold.

##### Single-Hit Regime (Unique $t_0$)

In the **sub-field-speed regime** ($\|\mathbf{v}_j(t_0)\| < c_f$ locally), Proposition 2 applies, and the map is strictly monotone:

$$
\frac{dF_t^{(ij)}}{dt_0}
\ge
1-\frac{\|\mathbf{v}_j(t_0)\|}{c_f}
>0,
$$

so $f_t^{(ij)}$ is a diffeomorphic time map on $I_t$, and the causal set is generically a singleton:

$$
N_{ij}(t)=1,\qquad D_{ij}(t)=+1.
$$

**Intuition:** If the source is moving slower than the field speed, its past emissions form a non-overlapping family of concentric (or nearly concentric) isochrons. Any given receiver location lies on exactly one of those causal surfaces.

##### Multi-Hit Regime (Multiple $t_0$)

In the **super-field-speed regime** ($\|\mathbf{v}_j\| > c_f$ at some past times), the delay map can fold when
$\hat{\mathbf{r}}_{ij}\cdot\mathbf{v}_j > c_f$, i.e. when $dF_t^{(ij)}/dt_0$ changes sign. Then $\mathcal{C}_{ij}(t)$ can contain multiple solutions:

$$
\mathcal{C}_{ij}(t) = \{t_{0,1}, t_{0,2}, \ldots, t_{0,m}\}.
$$

Fold bifurcations create/annihilate roots in pairs. The signed degree $D_{ij}$ stays topologically fixed between folds, while the unsigned branch count $N_{ij}$ jumps by even integers.

For a suggestive first folded branch used as a tri-binary closure target, the reduced root-count analogy is

$$
N_O=1 \;\longrightarrow\; N_I=2,
$$

This is not yet a tri-binary closure result. It is the root-count counterpart one would need to justify before using the action-partition doubling target ($w_I=2w_O$) or the associated $1:2:4$ frequency-lock discussion as derived structure.

**Intuition:** If the source outruns its own emissions, it can emit multiple wake surfaces that later converge and intersect the same receiver location simultaneously (or nearly so, within regularization width $\eta$).

**Example:** In uniform circular motion at $v > c_f$, a receiver can be hit by wake surfaces from multiple points on the source's orbit (different "winding numbers" $m$ due to self-hit dynamics).

##### Self-Hit (Source = Receiver, $j = i$)

When $j = i$ (source and receiver are the same architrino), the causal set $\mathcal{C}_{ii}(t)$ represents **self-hits**: times when architrino $i$ intersects its own past emissions.

**Self-hit condition:**

$$
\|\mathbf{x}_i(t) - \mathbf{x}_i(t_0)\| = c_f(t - t_0), \quad t_0 < t.
$$

**Interval-speed lemma.** Let $\Delta=t-t_0>0$ and suppose $\mathbf{x}_i$ is absolutely continuous on $[t_0,t]$. If
$$
\|\mathbf{x}_i(t)-\mathbf{x}_i(t_0)\|=c_f\Delta,
$$
then
$$
\frac{1}{\Delta}\int_{t_0}^{t}\|\dot{\mathbf{x}}_i(s)\|\,ds\ge c_f.
$$
This follows immediately from the triangle inequality. Therefore strict sub-field-speed motion on the whole interval forbids a nontrivial self-hit. A simple noncoincident self-hit requires super-field-speed motion somewhere along the interval, except for the degenerate straight field-speed case where the causal branch is tangent and the simple-root Jacobian condition fails.

**Critical requirements for self-hit:**

1. **Curvature**: Straight-line motion admits no self-hits (the worldline never intersects its own past causal isochrons).
2. **Super-field-speed interval history**: along the interval from emission to reception, the architrino must have exceeded $c_f$ somewhere, unless the branch is the degenerate straight field-speed case excluded by the simple-root assumptions.

**Key clarification:**

- **Self-hits can be plural**: $\mathcal{C}_{ii}(t)$ can contain multiple emission times (e.g., multiple winding numbers in circular motion).
- **Persistent memory**: Once an architrino has exceeded $v > c_f$ in its past, it can **later slow down** to $v < c_f$ and **still receive self-hits** from wake surfaces emitted during the super-field-speed phase. The self-hit regime is **not** instantaneously tied to current velocity; it depends on **path history**.

**Implication:** Self-hit is a **non-Markovian memory effect**. The architrino's current acceleration depends on whether it **ever** exceeded $c_f$ in the past and curved, not just on its current state.

##### Geometric Interpretation

**Visualize the causal constraint as:**

- Receiver at $\mathbf{x}_i(t)$ "now"
- Source worldline $\{\mathbf{x}_j(t'): t' < t\}$ in the past
 - Field-speed causal wake surface: the expanding isochron at radius $c_f(t - t_0)$ centered at $\mathbf{x}_j(t_0)$
 - **Causal emission times**: where this wake surface **intersects** the receiver's current location

For each $t_0 \in \mathcal{C}_{ij}(t)$, draw a line from $\mathbf{x}_j(t_0)$ to $\mathbf{x}_i(t)$; this is the **line of action** $\hat{\mathbf{r}}_{ij}$ for the force.

This geometry should be read in terms of the source worldline, the expanding causal isochrons centered on past emission points, and the receiver event at which one or more of those isochrons are intersected.

##### Reduced Translating-Loop Delay Checkpoint

To obtain a nontrivial analytic checkpoint from the same causal constraint, consider a translating phase-locked two-leg internal loop, with one leg parallel to motion and one transverse. Let the loop center translate with speed $v$ through the Euclidean void while every wake still propagates at the primitive field speed $c_f$. Define
$$
\beta \equiv \frac{v}{c_f},\qquad C(v)\equiv \frac{L_\parallel(v)}{L_0},
$$
with rest bond length $L_0$.

Parallel round-trip delay:
$$
T_\parallel(v)=\frac{L_\parallel}{c_f-v}+\frac{L_\parallel}{c_f+v}
=\frac{2L_0}{c_f}\frac{C(v)}{1-\beta^2}.
$$

Transverse one-way delay satisfies
$$
c_f^2\tau^2=L_0^2+v^2\tau^2
\;\Rightarrow\;
\tau=\frac{L_0}{c_f\sqrt{1-\beta^2}},
$$
so
$$
T_\perp(v)=2\tau=\frac{2L_0}{c_f}\frac{1}{\sqrt{1-\beta^2}}.
$$

If internal phase locking is operationally isotropic (no orientation-dependent clock leakage),
$$
T_\parallel(v)=T_\perp(v),
$$
then necessarily
$$
C(v)=\sqrt{1-\beta^2},\qquad
T(v)=\frac{T_0}{\sqrt{1-\beta^2}},
\quad
T_0=\frac{2L_0}{c_f}.
$$

This gives a purely substrate-level period-stretch checkpoint. It says only that preserving the same internal phase closure while the receiver translates forces the physical period $T$ to increase in absolute time unless the longitudinal leg shortens. The full unresolved step is proving the same absolute-period scaling for the complete multi-hit NFDE tri-binary dynamics without reducing to a two-leg closure model.

The two-leg loop is only a checkpoint. It has two phase points and one chosen orientation relative to the absolute motion. A real assembly has an effective internal phase cloud distributed over a finite three-dimensional volume, and operational isotropy has to hold for all loop orientations at once. The closure target is therefore a full ellipsoid-to-sphere reduction in the internal tri-binary phase space, not just the equality
$$
T_\parallel=T_\perp
$$
for one leg pair.

Accelerated motion adds a second burden. Even if the inertial translating-loop scaling is recovered, acceleration requires a transport law for the internal phase ledger through the Noether Sea. For a stable branch with rest size $L_0$, center speed $v(t)$, and small acceleration scale $a(t)$, the dynamics target is a branch-period transport law of the schematic form
$$
T_q[v(t),a(t)]
=
T_q[v(t),0]\,
\left(
1+
O\!\left(\frac{a^2L_0^2}{c_f^2}\right)
\right),
$$
with every term evaluated in absolute time. The residual is the finite-loop-size, non-Markovian correction caused by acceleration during one internal phase cycle. Observer-inference chapters may later translate a branch-certified period record into clock and metric language, but no such translation is part of the Master EOM.

---

### Master Equation and DDE Formulation

#### The Master Equation (Canonical Form)

##### Per-Hit Acceleration

For each causal emission time $t_0 \in \mathcal{C}_{ij}(t)$, define:

**Separation vector and distance:**

$$
\mathbf{r}_{ij}(t; t_0) = \mathbf{x}_i(t) - \mathbf{x}_j(t_0), \quad r_{ij} = \|\mathbf{r}_{ij}\|.
$$

**Unit direction (line of action):**

$$
\hat{\mathbf{r}}_{ij} = \frac{\mathbf{r}_{ij}}{r_{ij}} = \frac{\mathbf{x}_i(t) - \mathbf{x}_j(t_0)}{\|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\|}.
$$

**Polarity sign factor:**

$$
\sigma_{ij} = \mathrm{sign}(q_i q_j) = \begin{cases}
+1 & \text{like polarities (repel)} \\
-1 & \text{unlike polarities (attract)}
\end{cases}
$$

**Delay-map Jacobian:**

$$
J_{ij}(t;t_0)
\equiv
1-\frac{\mathbf{v}_j(t_0)\cdot \hat{\mathbf{r}}_{ij}(t;t_0)}{c_f}.
$$

**Per-hit acceleration contribution:**

$$
\mathbf{a}_{ij}(t; t_0)
=
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2\,\left|J_{ij}(t;t_0)\right|}
\, \hat{\mathbf{r}}_{ij},
$$

If a force-like bookkeeping symbol is desired, define
$$
\mathbf{F}_{ij}(t; t_0) \equiv \mu_{\text{arch}}\,\mathbf{a}_{ij}(t; t_0),
$$
where $\mu_{\text{arch}}$ is a universal conversion constant used only for force/energy bookkeeping. It is not a particle-specific inertial mass.

where:

- $\kappa$: universal coupling constant
- $q_i, q_j$: intrinsic polarities of receiver and source ($\pm \epsilon$ for electrinos/positrinos)
- $r_{ij}$: distance from emission point to reception point
- $\hat{\mathbf{r}}_{ij}$: radial direction from emission to reception
- $J_{ij}$: causal Jacobian controlling geometric bunching or dilation of the received wake flux

**Note on interaction structure:** The per-hit acceleration $\mathbf{a}_{ij}(t; t_0)$ is **radial in direction**: it points along the line of action $\hat{\mathbf{r}}_{ij}$ from the source's past position to the receiver's current position. There are **no velocity-dependent cross-product terms** (no $\mathbf{v}_i \times \mathbf{B}$-like contributions) in the fundamental interaction kernel. However, the force magnitude is not purely $1/r^2$; it is modulated by $\left|J_{ij}\right|^{-1}$. Constant emission per unit absolute time at the source is therefore received as a Jacobian-weighted causal flux at the receiver, with the spatial deposition pattern itself changing as the source moves.

**Implication for emergent forces**: All "magnetic" or velocity-dependent forces (e.g., Lorentz force $\mathbf{v} \times \mathbf{B}$) must arise from **delay geometry**, **Jacobian-modulated flux**, and **superposition of radial hits**, not from intrinsic cross-product terms in the fundamental law. This places the burden of magnetic-field emergence on the assembly structure, Noether-Sea dynamics, and the finite-speed causal geometry itself.

##### Total Acceleration (Sum Over All Causal Hits)

The total acceleration on architrino $i$ at time $t$ is the **vector sum** over:

1. All sources $j \neq i$ (partner hits)
2. All causal emission times $t_0 \in \mathcal{C}_{ij}(t)$ for each source
3. Self-hits ($j = i$), if any exist

**Master Equation of Motion (Canonical Form):**

$$
\boxed{
\frac{d^2 \mathbf{x}_i}{dt^2}
=
\sum_{j} \sum_{t_0 \in \mathcal{C}_{ij}(t)}
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2\,\left|J_{ij}(t;t_0)\right|}
\, \hat{\mathbf{r}}_{ij}
}
$$

where:

- Outer sum: over all sources $j$ (including $j = i$ for self-hits)
- Inner sum: over all causal emission times $t_0 \in \mathcal{C}_{ij}(t)$
- Each term: radial inverse-square acceleration with sign $\sigma_{ij}$ and Jacobian weight $\left|J_{ij}\right|^{-1}$

**Explicit separation of partner and self-hit terms:**

$$
\frac{d^2 \mathbf{x}_i}{dt^2}
=
\underbrace{\sum_{j \neq i} \sum_{t_0 \in \mathcal{C}_{ij}(t)} \kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2\,\left|J_{ij}(t;t_0)\right|} \, \hat{\mathbf{r}}_{ij}}_{\text{Partner hits}} + \underbrace{\sum_{t_0 \in \mathcal{C}_{ii}(t)} \kappa \, \sigma_{ii} \, \frac{|q_i q_i|}{r_{ii}^2\,\left|J_{ii}(t;t_0)\right|} \, \hat{\mathbf{r}}_{ii}}_{\text{Self-hits}}.
$$

**Note:** $\sigma_{ii} = +1$ (like polarities repel), so self-hits are always **repulsive**.

This sum can be viewed as a **path-history branch sum**: each emission time in $\mathcal{C}_{ij}(t)$ marks where the receiver's worldline crosses the causal wake surface emitted at $t_0$. The integral representation above is simply the distributional encoding of this branch-selection rule.

##### Conventions and Exclusions

**Heaviside Convention ($H(0) = 0$):**

The emission at $t_0 = t$ (instantaneous self-force) is **excluded**. Formally, this is enforced by writing:

$$
\mathcal{C}_{ij}(t) = \Big\{ t_0 < t \;\Big|\; \|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\| = c_f(t - t_0) \Big\}.
$$

(Strict inequality $t_0 < t$; no $t_0 = t$ allowed.)

**Physical justification:** The causal wake surface at the instant of emission ($r = 0$, $\tau = 0$) has not yet expanded; it cannot exert a force on the emitter "now." Under symmetric regularization (mollification), the $r \to 0$ limit yields zero net push.

**No $r = 0$ causal roots beyond $\tau = 0$:**

Because $r = c_f(t - t_0)$, $r = 0$ implies $\tau = t - t_0 = 0$. This case is excluded by $H(0) = 0$. There are no "collision singularities" in the causal set (architrinos can pass through each other; forces are mediated by expanding wake surfaces, not by contact).

##### Superposition Principle

The Master EOM is **linear in source contributions** on a declared branch chart:

$$
\mathbf{a}_{\text{total}}(t) = \sum_j \mathbf{a}_{j}(t).
$$

The causal-wake distributions from distinct sources superpose without mutual interference, and the receiver sums the branch accelerations that actually intersect it. Effective potentials reconstructed from those wakes also superpose in the corresponding linear diagnostic or continuum limit, but the substrate law remains the receiver-local branch sum.

**Consequence:** The problem of $N$ interacting architrinos reduces to solving $N$ coupled delay differential equations (DDEs), one per architrino, with each depending on the retained history of all sources and on the certified active causal-root rows.

---

#### Terms and Conventions (Detailed Breakdown)

##### Direction and Sign

**Direction of $\hat{\mathbf{r}}_{ij}$:**

$\hat{\mathbf{r}}_{ij}$ points **from the source's historical position** $\mathbf{x}_j(t_0)$ **to the receiver's current position** $\mathbf{x}_i(t)$.

**Sign of the acceleration:**

- **Like polarities** ($\sigma_{ij} = +1$): acceleration along $+\hat{\mathbf{r}}_{ij}$ (repulsion; pushes receiver away from emission point)
- **Unlike polarities** ($\sigma_{ij} = -1$): acceleration along $-\hat{\mathbf{r}}_{ij}$ (attraction; pulls receiver toward emission point)

**Two-body checks (stationary sources):**

- Electrino + Electrino (like polarities): repulsion
- Positrino + Positrino (like polarities): repulsion
- Electrino + Positrino (unlike polarities): attraction
- All symmetric: if source and receiver swap roles, the force direction reverses (Newton's third law in the instantaneous-interaction limit)

##### Scaling and Normalization

**The $1/r^2$ factor:**

Reflects the **surface density** of potential on the causal isochron. As that surface grows, the potential spreads over area $4\pi r^2$, so the density at any point scales as $1/r^2$.

**The Jacobian factor $\left|J_{ij}\right|^{-1}$:**

Under the constant-time emission rule stated above, source motion between emission instants deposits the output onto a history-dependent family of expanding causal surfaces. Motion of the source toward the active branch compresses the spacing of successive wake arrivals and increases the received flux; motion away from the branch dilates the spacing and decreases it. The geometric compression/dilation factor is exactly $\left|J_{ij}\right|^{-1}$.

**Absorption of geometric constants into $\kappa$:**

All geometric normalization factors (e.g., $1/(4\pi)$ from spherical surface area and overall $1/c_f$ factors from $\delta$-function change-of-variables) are absorbed into the coupling constant $\kappa$ by convention. The canonical per-hit law is therefore written with an explicit inverse-square factor together with the dimensionless Jacobian weight $\left|J_{ij}\right|^{-1}$.

**Dimensional analysis:**

$$
[\kappa] = \frac{[\text{Length}]^3}{[\text{Time}]^2 [\text{Polarity}]^2}, \quad [\mathbf{a}] = \frac{[\text{Length}]}{[\text{Time}]^2}.
$$

If the force-like bookkeeping variable $\mathbf{F}=\mu_{\text{arch}}\mathbf{a}$ is introduced, then $[\mathbf{F}]=[\mu_{\text{arch}}][\text{Length}]/[\text{Time}]^2$. In natural units with $c_f = 1$, $[\text{Length}] = [\text{Time}]$, and $\kappa$ has dimensions of $[\text{Length}]/[\text{Polarity}]^2$.

##### Receiver Kinematics (Radial vs Orthogonal Components)

At a given hit $(t; t_0)$, decompose the receiver's velocity into components parallel and orthogonal to the line of action $\hat{\mathbf{r}}_{ij}$:

$$
\mathbf{v}_i(t) = v_r \hat{\mathbf{r}}_{ij} + \mathbf{v}_\perp,
$$

where:

- $v_r = \mathbf{v}_i(t) \cdot \hat{\mathbf{r}}_{ij}$ (radial component; positive = moving away from emission point)
- $\mathbf{v}_\perp = \mathbf{v}_i(t) - v_r \hat{\mathbf{r}}_{ij}$ (orthogonal component)

**Instantaneous effect of the hit:**

Because $\mathbf{a}_{ij}(t; t_0) \parallel \hat{\mathbf{r}}_{ij}$, its instantaneous effect satisfies:

$$
\frac{d}{dt}\mathbf{v}_\perp\Big|_{\text{hit}} = \mathbf{0}, \quad \frac{d}{dt}v_r\Big|_{\text{hit}} = \mathbf{a}_{ij} \cdot \hat{\mathbf{r}}_{ij} = \kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2\,\left|J_{ij}(t;t_0)\right|}.
$$

**Plain language:** A hit only changes the along-the-line velocity component right now; sideways motion continues unaffected (at the instant of the hit). Over time, of course, the changing radial motion alters the trajectory and thus the subsequent orthogonal component.

**Translating-assembly deformation requirement:** The receiver kinematics described here must mechanically produce the moving-assembly deformation, branch-period stretch, and two-way signal-synchronization records that later observer-inference chapters consume. If tri-binaries do not squash along the direction of motion and do not preserve one retained causal-root ledger while translating through the Noether Sea, the downstream recovery program fails at the dynamics layer.

##### Work and Power

The **instantaneous power** (rate of kinetic energy change) from a single hit is:

$$
\frac{dE_k}{dt}\Big|_{\text{hit}} = \mathbf{F}_{ij} \cdot \mathbf{v}_i = \big(\mu_{\text{arch}} \mathbf{a}_{ij} \cdot \hat{\mathbf{r}}_{ij}\big) v_r = \mu_{\text{arch}}\,\kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2\,\left|J_{ij}(t;t_0)\right|} \, v_r.
$$

**Key insight:** There is **no instantaneous work** on the orthogonal component. Power depends only on the radial velocity $v_r$.

**Radial motion and the $1/r^2$ factor (local trend):**

- **Inward motion** ($v_r < 0$, receiver moving toward the emission point): decreases $r_{ij}$ between close successive hits, tending to **increase** subsequent per-hit strengths via $1/r^2$ (all else equal).
- **Outward motion** ($v_r > 0$): increases $r_{ij}$, tending to **decrease** subsequent per-hit strengths.

**Important caveat:** Path-history delay shifts both the causal root $t_0$ and $\hat{\mathbf{r}}_{ij}$ over finite intervals, so these are strictly **local** statements about infinitesimal time evolution. The global trajectory depends on the full history of all sources.

##### Moving-Source Geometry and Received Flux

**Critical modeling note:**

- **Emission rule**: fixed by the constant-time law stated above
- **Spatial deposition**: velocity dependent because the source changes position between emission instants

The **emitted potential pattern in space** is not speed independent: a moving source lays down successive wake surfaces from different points on its worldline. The **received** force magnitude is therefore not purely a function of $r_{ij}$. It is modulated by the causal Jacobian $\left|J_{ij}\right|^{-1}$, which measures how the source motion compresses or dilates the spacing of wake surfaces along the active branch.

The receiver's velocity $\mathbf{v}_i(t)$ does **not** appear as a separate source-strength factor in $\|\mathbf{F}_{ij}\|$ itself (at fixed $r_{ij}$, $\hat{\mathbf{r}}_{ij}$, and $J_{ij}$). It influences:

1. The **instantaneous power** through $\mathbf{F} \cdot \mathbf{v} = \|\mathbf{F}\| v_r$.
2. The **subsequent evolution of $r_{ij}$** (and thus future force magnitudes).
3. Which delayed branches are actually sampled along the receiver worldline over time.

**Causal-flux modulation:** Unlike models that make source strength itself a function of speed, the velocity dependence here enters through the **moving-source geometry** of emission, the **geometry of causal intersections**, and the **bunching or dilation of received wake flux** in the Euclidean void. This is the origin of the Jacobian denominator and the seed of relativistic and magnetic behavior in the emergent theory.

---

#### Delay Differential Equation (DDE) Formulation

##### State Vector and Evolution

Define the **state vector** for architrino $i$:

$$
\mathbf{X}_i(t) = \begin{pmatrix} \mathbf{x}_i(t) \\ \mathbf{v}_i(t) \end{pmatrix} \in \mathbb{R}^6.
$$

The Master EOM is a **second-order ODE** in $\mathbf{x}_i$, or equivalently a **first-order system** in $\mathbf{X}_i$:

$$
\frac{d\mathbf{X}_i}{dt} = \begin{pmatrix} \mathbf{v}_i(t) \\ \mathbf{a}_i(t) \end{pmatrix},
$$

where:

$$
\mathbf{a}_i(t)
=
\sum_{j} \sum_{t_0 \in \mathcal{C}_{ij}(t)}
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2\,\left|J_{ij}(t;t_0)\right|}
\, \hat{\mathbf{r}}_{ij}.
$$

##### Causal Functional Form

The acceleration $\mathbf{a}_i(t)$ depends on the **history** of all worldlines $\{\mathbf{X}_j(t') : t' < t\}$ through the implicit causal constraint:

$$
\|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\| = c_f(t - t_0).
$$

This makes the system a **delay differential equation (DDE)** with **state-dependent delays** (the delay $\tau_j = t - t_0$ is not constant; it depends on the solution itself).

**Functional notation:**

$$
\frac{d\mathbf{X}_i}{dt} = \mathcal{F}\Big[\mathbf{X}_i(t), \{\mathbf{X}_j(\cdot)\}_{j}, t\Big],
$$

where $\mathcal{F}$ is a **causal functional**: it depends on the current state $\mathbf{X}_i(t)$ and the past states $\{\mathbf{X}_j(t') : t' < t\}$ of all architrinos (including $i$ itself for self-hits).

##### Regularization (Mollified Causal Wake Surfaces, Finite $\eta$)

The ideal model uses **surface-delta causal isochrons** in the emission-time integral. On a simple branch with a distance floor and a Jacobian floor, the delta collapses to a continuous receiver-time branch contribution; singular or impulse-like behavior arises only when branches hit collision support, lose transversality, accumulate, or are sampled as unresolved numerical events. One may treat the singular limit as a measure-valued branch law, or regularize by replacing the surface delta with a narrow wake surface of thickness $\eta > 0$:

$$
\delta(r - c_f\tau) \longrightarrow \delta_\eta(r - c_f\tau) = \frac{1}{\sqrt{2\pi}\,\eta} \exp\!\Big(-\frac{(r - c_f\tau)^2}{2\eta^2}\Big),
$$

while preserving total emission $q$.

**Effect:** Under the finite-branch, distance-floor, and transversality assumptions stated below, this supports **continuous-in-time force diagnostics** and classical $C^1$ solutions for $\mathbf{x}_i(t)$ given $C^1$ initial data.

**In the super-field-speed regime** ($\|\mathbf{v}_a\| > c_f$), multiple self-roots can occur; summing over all causal times with an integrable regularization gives a finite contribution only while the active-root count, separation floor, and Jacobian floor remain controlled.

**Convergence requirement:** As $\eta \to 0$, numerical solutions must converge to a well-defined limit.

##### Conditional Well-Posedness for the Regularized Exact Model

To make the existence/uniqueness claim precise for the finite-$\eta$ regularization used in this chapter, we formalize the dynamics as a state-dependent delay system in first-order form:
$$
\dot{\mathbf{Y}}(t)=\mathcal{G}(\mathbf{Y}_t),\qquad
\mathbf{Y}_t(\theta)=\mathbf{Y}(t+\theta),\ \theta\in[-h,0],
$$
with phase space $\mathcal{H}=C^1([-h,0],\mathbb{R}^{6N})$.
This is the convenient proof scaffold used here because the active-root extraction uses the implicit-function theorem on
$$
C^1
$$
histories. For sharper state-dependent delay work, especially when acceleration bounds rather than classical second derivatives are the natural control, the phase space may need to be
$$
W^{1,\infty}([-h,0],\mathbb{R}^{6N})
$$
or an absolutely continuous history class. The exact choice is a regularity burden of the theorem being proved, not a change in the causal law.

**Assumptions (regularized regime):**

- **(W1) Kernel regularity:** $\delta_\eta$ is $C^1$, bounded, and integrable.
- **(W2) Uniform branch finiteness:** on the considered history neighborhood, each pair $(i,j)$ has at most $B_{ij}<\infty$ active causal branches.
- **(W3) Root transversality:** for every active branch $\tau_{ij,\ell}$,
  $$
  \left|\partial_\tau g_{ij}(\tau,\phi)\right|\ge \nu>0,
  \qquad
  g_{ij}(\tau,\phi)=\|\phi_i(0)-\phi_j(-\tau)\|-c_f\tau.
  $$
- **(W4) Distance floor on the branch support:** $\|\phi_i(0)-\phi_j(-\tau_{ij,\ell}(\phi))\|\ge d_{\min}>0$.
- **(W5) Bounded charges/couplings:** $\kappa$, $|q_i|$ finite.

**Conditional theorem (local well-posedness and continuation).**
Under (W1)-(W5), for any initial history $\phi^0\in\mathcal{H}$ there exists $T>0$ and a unique solution
$$
\mathbf{Y}\in C^1([t_0-h,t_0+T),\mathbb{R}^{6N}),\qquad \mathbf{Y}_{t_0}=\phi^0.
$$
The solution extends uniquely to a maximal interval $[t_0-h,t_{\max})$. If on every finite interval
$$
\sup_{t<t^\ast}\|\mathbf{v}(t)\|<\infty,\quad
\inf_{t<t^\ast,\ i,j,\ell} r_{ij,\ell}(t)>0,\quad
\inf_{t<t^\ast,\ i,j,\ell}|\partial_\tau g_{ij,\ell}(t)|>0,
$$
and
$$
\sup_{t<t^\ast,\ i,j}B^{\mathrm{active}}_{ij}(t)<\infty,
$$
then $t_{\max}=\infty$.
Here $r_{ij,\ell}(t)$ denotes the source-receiver distance on branch $\ell$, and
$$
B^{\mathrm{active}}_{ij}(t)
$$
denotes the number of active causal branches of pair
$$
(i,j)
$$
inside the chosen memory horizon at receiver time
$$
t.
$$

**Proof.**

1. By (W3), each active delay branch is simple; the Implicit Function Theorem gives $\tau_{ij,\ell}(\phi)\in C^1$ on a neighborhood of $\phi^0$.
2. Each per-branch acceleration term is a composition of $C^1$ maps (evaluation, subtraction, norm, mollifier, and unit-direction projection). By (W4), denominators stay away from zero; by (W5), coefficients are bounded. Hence each branch term is locally Lipschitz in $\phi$.
3. By (W2), only finitely many branches contribute, so their sum $\mathcal{G}$ is locally Lipschitz on an open subset of $\mathcal{H}$ where (W3)-(W4) hold.
4. Standard state-dependent DDE existence/uniqueness theory on Banach spaces applies, yielding a unique local $C^1$ solution and a maximal extension.
5. Continuation follows from the same theorem: finite-time breakdown can occur only by leaving every bounded subset of the admissible set, i.e. via unbounded speed, vanishing separation on active support, transversality loss/root accumulation, or unbounded active branch-count growth.

Therefore the regularized delayed dynamics are locally well-posed, with global existence whenever those failure modes are excluded. This conditional statement applies to the finite-$\eta$ regularized model; the ideal $\eta\to 0$ surface-delta limit still requires separate control of root accumulation and Jacobian-degenerate branches. $\square$

##### Finite-Continuation Criterion for Global Comparisons

The well-posedness theorem is the dynamics-side home for global-continuation comparisons used later in [GR Phenomenology](../../../../markdown/aaa/spacetime/gr-phenomenology.md#global-continuation-and-cosmic-censorship-comparison) and [Singularity Resolution](../../../../markdown/aaa/spacetime/singularity-resolution.md#cauchy-horizon-comparison-pressure). It should not be read as a claim that observer records determine a unique global spacetime. Its native claim is narrower: a declared finite history, boundary wake record, and branch chart either determine a finite continuation family or they do not.

For a compact subsystem $\Omega$ and window $W=[t_i,t_f]$, let $\mathcal{A}_{\Omega,W}^{(\eta)}$ be the set of branch charts that satisfy the regularized assumptions (W1)-(W5), the bounded active-branch condition, the distance floor, and the root-transversality floor on $W$ using the same finite boundary data $\mathcal{B}_{\partial\Omega}|_W$. The dynamics-side continuation family is
$$
\mathfrak{S}_{\Omega,W}^{\mathrm{ME},\eta}
=
\left\{
\mathbf{Y}_{t_f}^{a}
:
a\in\mathcal{A}_{\Omega,W}^{(\eta)},
\ \mathbf{Y}_{t_f}^{a}
\text{ is generated by the regularized master equation from }
\left(\mathbf{Y}_{t_i},\mathcal{B}_{\partial\Omega}|_W\right)
\right\}.
$$
The comparison passes only if
$$
0<\left|\mathfrak{S}_{\Omega,W}^{\mathrm{ME},\eta}\right|<\infty
$$
with every element carrying the causal-root ledger, energy diagnostic or exact charge used for the run, and the boundary wake data that selected it. Empty, infinite, or unlabeled families are not global closure; they mark an unresolved continuation ambiguity. A later strong-field or cosmology chapter may quotient this family by observer-accessible records, but the quotient must be derived from the same master-equation data rather than imposed as a global-hyperbolicity assumption.

### Operational Principles, Self-Interaction, and Examples

#### Core Principles (Operational Summary)

##### Superposition

**Statement:** The potential wake contributions from all sources **superpose linearly**. The net potential at any point is the sum of the individual wake potentials:

$$
\Phi_{\text{net}}(\mathbf{x}, t) = \sum_{i} \Phi_i(\mathbf{x}, t).
$$

The total acceleration on a particle at any instant is the **vector sum** of the contributions from every causal entry in its path history.

**Operational implication:** Every architrino is continuously immersed in the superposed wakes of all others (and, when the same-source root condition permits, its own). Tractability comes from treating each causal emission independently with $1/r^2$ distance weighting, branch gaps, and screening or cancellation assumptions that make the retained sum finite.

Inverse-square dilution alone is not a global convergence theorem. For an infinite source family, a branch chart must declare a summation or continuum prescription under which
$$
\lim_{R\to\infty}
\sum_{j:\|\mathbf{x}_j\|<R}
\sum_{t_0\in\mathcal{C}_{ij}(t)}
\mathbf{a}_{ij}(t;t_0)
$$
exists, or it must supply local neutrality, angular cancellation, shielding, a screened kernel, finite active horizon, or a mean-field/principal-value subtraction. Without this condition, the many-source wake sum is not a well-defined acceleration law even though each individual hit has the correct surface-density falloff.

##### Velocity Dependence

**Statement:** The dynamics are **delayed** and **radial in direction**. Because the source moves while emitting, both the emitted wake pattern and the received force are velocity dependent through causal geometry. The received force magnitude is modulated by the causal Jacobian $\left|J_{ij}\right|^{-1}$, while the receiver's speed affects the **work rate** and branch sampling via $\mathbf{F} \cdot \mathbf{v} = \|\mathbf{F}\| v_r$.

**Self-interaction requirement:** Self-hit requires super-field-speed interval history: the worldline must exceed $c_f$ somewhere along a nontrivial emission-to-reception interval, except for the degenerate field-speed tangent case excluded by the simple-root branch condition. Curvature alone is insufficient if $\|\mathbf{v}_a\| < c_f$ everywhere on the relevant interval.

**Persistent memory:** Once an architrino has exceeded $\|\mathbf{v}\| > c_f$ in its past and emitted wake surfaces, it can **later slow down** to $\|\mathbf{v}\| < c_f$ and **still receive self-hits** from those earlier emissions. The self-hit regime is **not instantaneously tied to current velocity**; it is a **path-history memory effect**.

##### Causality and Locality

**Causal structure:** Event $A$ at $(t_A, \mathbf{x}_A)$ can influence event $B$ at $(t_B, \mathbf{x}_B)$ only if:

$$
t_B > t_A \quad \text{and} \quad \|\mathbf{x}_B - \mathbf{x}_A\| \leq c_f(t_B - t_A).
$$

This defines a **field-speed causal cone** centered at each event. The filled inequality is the reachability condition; exact hits still occur only on causal wake surfaces satisfying the equality root.

**No action-at-a-distance:** All influences propagate at finite speed $c_f$. There are no instantaneous interactions across spatial separation.

**Event-locality at the receiver:** The Master EOM is evaluated **at the receiver event**: only the causal wake surfaces intersecting $\mathbf{x}_i(t)$ contribute to the acceleration there and then. However, it is **path-history dependent**: the active branches depend on the **entire past worldline** of all sources.

---

#### Self-Interaction (Self-Hit Dynamics)

##### Self-Hit Condition

An architrino $i$ experiences self-hit at time $t$ if there exists $t_0 < t$ such that:

$$
\|\mathbf{x}_i(t) - \mathbf{x}_i(t_0)\| = c_f(t - t_0).
$$

**Geometric interpretation:** The architrino's current position $\mathbf{x}_i(t)$ lies on the causal isochron emitted from its past position $\mathbf{x}_i(t_0)$.

**Requirements:**

1. **Curvature**: The worldline must curve (straight-line motion admits no self-hits).
2. **Super-field-speed interval history**: the speed must exceed $c_f$ somewhere on the interval from emission to reception, except for the degenerate straight field-speed riding case excluded by the branch Jacobian condition.

##### Multiple Self-Hits (Plural)

**Key insight:** An architrino can experience **multiple self-hits simultaneously** (or within a regularization window $\eta$).

**Mechanism:** In curved motion at super-field-speed, the worldline may intersect **multiple past isochrons** at the same observation time $t$. Each intersection corresponds to a distinct emission time $t_{0,k} \in \mathcal{C}_{ii}(t)$.

**Example:** In uniform circular motion at speed $v > c_f$, an architrino can be hit by wake surfaces from multiple points on its own orbit, corresponding to different "winding numbers" $m = 0, 1, 2, \ldots$ (see Maximum-Curvature Orbit).

**Sum over all self-hit roots:**

$$
\mathbf{F}_{ii}(\text{self-hit})
=
\sum_{t_0 \in \mathcal{C}_{ii}(t)}
\kappa \, \sigma_{ii} \,
\frac{|q_i q_i|}{r_{ii}^2\,\left|J_{ii}(t;t_0)\right|}
\, \hat{\mathbf{r}}_{ii},
$$

where $\sigma_{ii} = +1$ (like polarities repel), so each self-hit contributes an **outward** (repulsive) force.

##### Persistent Memory (Self-Hit After Slowing Down)

**Critical clarification:**

Self-hit is **not** instantaneously tied to current velocity. An architrino that has **previously** exceeded $\|\mathbf{v}\| > c_f$ and emitted wake surfaces can **later slow down** to $\|\mathbf{v}\| < c_f$ and **still receive self-hits** from those earlier emissions.

**Scenario:**

1. At time $t_1$: Architrino accelerates to $\|\mathbf{v}\| > c_f$ and emits wake surfaces while in super-field-speed regime.
2. At time $t_2 > t_1$: Architrino slows down to $\|\mathbf{v}\| < c_f$ (e.g., due to partner attraction or external forces).
3. At time $t_3 > t_2$: The architrino's trajectory curves such that it intersects one of the wake surfaces emitted at $t_1$ (when $\|\mathbf{v}\| > c_f$).

**Result:** Self-hit occurs at $t_3$ even though current velocity $\|\mathbf{v}(t_3)\| < c_f$.

**Implication:** Self-hit is a **path-history memory effect**. The architrino's current acceleration depends on **whether it ever exceeded $c_f$ in the past and curved**, not just on its instantaneous state.

**Non-Markovian nature:** Knowing $\mathbf{x}_i(t)$ and $\mathbf{v}_i(t)$ is insufficient to determine $\mathbf{a}_i(t)$. You need the **full past worldline** $\{\mathbf{x}_i(t') : t' < t\}$ to identify all causal self-hit times $t_0 \in \mathcal{C}_{ii}(t)$.

##### Self-Hit as Stabilization Mechanism

**Role in binary formation:** Self-hit provides a **repulsive radial contribution** that opposes the attractive pull of opposite-polarity partners. This competition produces:

- **Maximum-curvature candidates**: the circular toy model identifies where a minimum-radius barrier must be analyzed.
- **Null-separatrix protection**: the Jacobian-degenerate boundary $J=0$ acts as a geometric wall against collapse in the exact kernel.
- **A closure test, not a closure proof**: the same $1/|J|$ amplification multiplies tangential as well as radial projections, so a Jacobian-null branch does not by itself prove vanishing tangential power or an exact locked orbit.

**Connection to quantum behavior:** At this chapter's claim level, non-Markovian memory and deterministic-but-complex self-hit dynamics are a candidate substrate mechanism for effective quantum-like behavior, not yet a derivation of the quantum formalism:

- effective guidance by self-interference and causal-wake history,
- discrete stable states as attractors in phase space,
- measurement uncertainty as receiver-level informational ambiguity.

An important open problem is to map the phase-space attractor landscape for self-hit binaries, including basin size for maximum-curvature orbits, escape conditions, and the existence of secondary attractors such as long-lived elliptical families.

#### Worked Examples (Analytic Baselines)

##### Stationary Opposite Charges (Radial Fall)

**Setup:**
- Two architrinos: Electrino at $\mathbf{x}_1(t)$, Positrino at $\mathbf{x}_2(t)$
- Initial conditions: Both at rest, separated by distance $d_0$
- No self-hits (speeds remain $< c_f$ if $d_0$ is not too small)

**Symmetry:** By polarity symmetry, both fall toward their common center of mass.

**Equations:** Radial coordinate $r(t) = \|\mathbf{x}_2(t) - \mathbf{x}_1(t)\|$ satisfies:

$$
\frac{d^2r}{dt^2} = -\frac{2\kappa \epsilon^2}{r^2},
$$

where the factor of 2 comes from the symmetry (each feels the same magnitude force).

**Solution structure:** This has the same quadrature structure as Keplerian radial fall at leading order in the slow, single-branch regime.

**Key insight:** Partner attraction dominates; no self-hit (speeds remain sub-field-speed for moderate $d_0$).

##### Sub-Field-Speed Circular Orbit (Instability)

**Setup:**
- Two opposite polarities in symmetric circular orbit at radius $R$, speed $v < c_f$
- No self-hits (sub-field-speed regime)

**Partner contribution:**
- Provides inward radial force (centripetal)
- Also provides **tangential force** (always positive, i.e., in direction of motion)

**Result:** Net tangential power $T > 0$ → continuous acceleration → orbit tightens (spiral inward) → speed increases.

**Conclusion within this circular benchmark:** No stable circular orbit appears in the sub-field-speed regime for isolated opposite-polarity binaries.

##### Maximum-Curvature Orbit (Self-Hit Stabilization)

**Setup:**
- Opposite-polarity binary spirals inward (as in 8.2) until speed crosses $\|\mathbf{v}\| = c_f$
- Self-hits activate → repulsive outward force

**Geometric definition (Null Separatrix):**
For an active causal root $t_0 \in \mathcal{C}_{ii}(t)$ on the self-hit branch, define

$$
J_{ii}(t;t_0)\equiv 1-\frac{\mathbf{v}_i(t_0)\cdot \hat{\mathbf{r}}_{ii}(t;t_0)}{c_f}.
$$

The maximum-curvature binary (MCB) boundary is the Jacobian-degenerate set

$$
J_{ii}(t;t_0)=0,
$$

with approach from the admissible side $J_{ii}>0$. Geometrically, this is the state where the receiver trajectory is tangent to the causal wake surface of its own past emission (the “riding-the-shock” limit).

**Why this is a hard wall in the exact theory:**
In the exact branch-resolved force, the self-hit contribution carries the factor

$$
\frac{1}{r_{ii}^2(t;t_0)\,\left|J_{ii}(t;t_0)\right|}.
$$

Hence as $J_{ii}\to 0^+$ the ideal branch-resolved pointwise response diverges, producing a restoring barrier that blocks naive continuation into a collapsing branch. This divergence should not be treated as a literal state pinned at infinite force. Across a simple caustic transit, [Caustic Transit and Finite Impulse](#caustic-transit-and-finite-impulse) shows that the integrated velocity change can remain finite; with finite numerical regularization $\eta > 0$, the event appears as a large but finite impulse that sharpens as $\eta\to 0$.

This null-separatrix is therefore an **amplitude wall** for the self branch. It is not, by itself, a theorem of circular closure. The same branch weight multiplies every projection of the self-hit force, including the tangential component, so contact with $J_{ii}=0$ obstructs collapse but does not by itself establish a periodic orbit or zero net cycle-averaged power.

**Operational characterization of MCB:**
- The inner branch evolves by caustic grazing near $J_{ii}=0$, with finite impulses across the regularized boundary rather than exact pinning on an infinite-force surface.
- The minimum radius $R_{\min}$ is the smallest orbit radius compatible with $J_{ii}\ge 0$ on active roots.
- Tangential power must be controlled separately; near-zero cycle-average power is an additional closure condition, not a consequence of $J_{ii}=0$ alone.

**Significance:**
- Defines a **fundamental length scale** $R_{\min}$ that sets the tightest stable orbit radius
- In the exact geometric model, excludes classical $r \to 0$ collapse by a null-separatrix barrier
- Supplies one geometric ingredient in candidate stable particle assemblies such as tri-binaries

**Status split (analytic vs numeric):**
- **Analytic:** Existence of the Jacobian-null boundary and its singular restoring scaling in the exact kernel.
- **Numeric still required:** Basin size, global attractivity, and long-time capture probability for realistic multi-body assemblies.

#### Informational Ambiguity at the Receiver

##### Limited Information Per Hit

From the perspective of the receiving architrino, the information carried by an intersecting causal isochron is **limited**. The receiver only knows:

1. The **net strength** of the potential at the point of intersection (through the acceleration magnitude $\|\mathbf{F}\|$ when force bookkeeping is used).
2. The **unoriented line of action** through its current position (the line along which the acceleration points).

The receiver does **not** have direct knowledge of:
- The source's identity (which architrino $j$?)
- The source's precise distance $r_{ij}$ (without additional assumptions)
- The source's velocity at emission $\mathbf{v}_j(t_0)$

##### Ambiguity: Electrino vs Positrino on Opposite Sides

A particularly important ambiguity: the receiver cannot distinguish between:

- A **negative potential** due to an Electrino (polarity $-\epsilon$) on one side of the line of action, and
- A **positive potential** due to a Positrino (polarity $+\epsilon$) on the **opposite side** of the same line,

if the resulting radial acceleration is the same.

**Example:** An acceleration **towards** a point along the line of action could be interpreted as:
- Attraction to a Positrino at that point, **or**
- Repulsion from an Electrino located at the diametrically opposite point on the same line.

##### Rest-Frame Recast (Useful Inference Device)

Any single hit can be **equivalently described** with a **stationary emitter** ($\|\mathbf{v}\| = 0$) placed somewhere along the same unoriented line of action, with the emitter's actual speed at emission accounted for by an adjusted emission time and, if desired, a surrogate location along that line.

**Key property:** The same emission law is preserved in this recast; the velocity dependence is transferred into the adjusted emission geometry and the matched Jacobian-weighted flux.

**Utility:** This recast simplifies some analytic calculations and provides intuition for the receiver's "inference problem" (what source configurations are consistent with a given hit?).

##### Superposition Complicates Inference

The ambiguity is compounded by **superposition**: The net potential at any instant is the sum of all intersecting expanding causal wake surfaces. A measured potential along a single radial can be the consequence of a **complex confluence of wakes** from many different emitters located along that line of action, arriving from both directions.

**Consequence:** The receiver experiences a **deterministic acceleration** (given full microstate knowledge, as known to the $\mathbb{U}_{\text{now}}$ universe-state perspective), but has **incomplete local information** about the source configuration.

##### Connection to Quantum Measurement Uncertainty

This limited, unoriented, and source-ambiguous information at the hit level is a candidate bridge to effective quantum-like behavior and measurement uncertainty from deterministic micro-dynamics. The bridge remains a closure target until the coarse-grained state map and record-formation dynamics are derived:

- **Wave function transition**: $\psi$ may be interpreted as a coarse-grained representation of the wake-defined potential landscape only after a density/phase map has been supplied.
- **Measurement interaction**: an outcome is a record formed by assembly interactions and causal-hit history, not by adding a fundamental collapse postulate at this level.
- **Uncertainty**: the native candidate mechanism is informational ambiguity at the receiver plus unresolved microstate sensitivity, not ontic randomness.

### Parameters and Numerical Implementation

#### Parameter Definitions

The core parameters entering the Master Equation are:

| **Parameter** | **Symbol** | **Working convention** | **Dimensional** | **Comment** |
|:--------------|:-----------|:----------------------|:----------------|:------------|
| Wake speed | $c_f$ | Set to 1 in natural units unless otherwise stated | $\mathrm{L}\,\mathrm{T}^{-1}$ | Propagation speed in the causal constraint |
| Coupling constant | $\kappa$ | Universal coupling parameter | $\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2}$ | Controls the strength of the inverse-square interaction |
| Architrino polarity unit | $\epsilon$ | $\lvert e \rvert / 6$ | $\mathrm{Q}$ | Fundamental polarity magnitude |
| Causal-wake-surface thickness (regularization) | $\eta$ | Positive regularization width used in analysis and simulation | $\mathrm{L}$ | Mollifies delta singularities |

In this document, $c_f$ is treated primarily as a unit-setting convention, $\kappa$ as the universal coupling scale of the delayed interaction law, $\epsilon$ as the fundamental polarity unit, and $\eta$ as a regularization parameter used only when a smooth surrogate of the exact causal-wake dynamics is required.

#### Numerical Implementation Notes

##### Delay Root-Finding Algorithms

At each time step $t$, the numerical integrator must solve the **implicit causal constraint** for each source $j$:

$$
\|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\| = c_f(t - t_0), \quad t_0 < t.
$$

**Algorithm (schematic):**

1. For each source $j$, search the history buffer $\{\mathbf{x}_j(t') : t' < t\}$ for all $t_0$ satisfying the constraint.
2. Use **bisection** or **Newton-Raphson** to refine roots to tolerance $\epsilon_{\text{root}}$.
3. If multiple roots exist (multi-hit regime), enumerate all; sum their contributions.
4. If no roots exist (source too far away or not yet causal), skip source $j$ at this time step.

**Efficiency:** Use **history binning** or **spatial hashing** to avoid exhaustive search over all past times.

###### Spatial Hashing for History Buffers

**Efficiency requirement:** Naïve all-pairs history search scales as $O(N^2 T_{\text{history}})$, intractable for $N > 100$ particles.

**Required optimization:** Implement spatial hash grid with cell size $\sim c_f \Delta t_{\max}$; only search cells within causal range of receiver. Expected scaling: $O(N \log N)$.

**Implementation notes:**
- Partition spatial domain into cubic cells of side length $\Delta_{\text{cell}} \approx c_f T_{\text{history,max}}$
- At each time step, bin all architrino positions into cells
- For receiver at $\mathbf{x}_i(t)$, only search cells within causal radius $r_{\text{max}} = c_f T_{\text{history}}$
- Update hash grid incrementally (not from scratch each step)

##### Time-Stepping Schemes for DDEs

The Master EOM is a **state-dependent DDE** (delay depends on the solution itself). Standard ODE integrators (e.g., RK4) must be adapted:

**Recommended methods:**

- **Fixed-point iteration** with predictor-corrector (for implicit delays)
- **Adaptive time-stepping** (small $\Delta t$ when roots are close or numerous)
- **Event detection** for exact root crossings (optional; improves accuracy in sharp-hit regime)

**Stability:** Ensure $\Delta t < \eta / c_f$ (resolve mollified wake surface width); adjust $\eta$ and $\Delta t$ together in convergence tests.

##### Provenance Tracking (Emission Event → Receiver → Response)

**For debugging and interpretation:**

At each hit, log:
- Source ID $j$
- Emission time $t_0$
- Emission position $\mathbf{x}_j(t_0)$
- Reception time $t$
- Reception position $\mathbf{x}_i(t)$
- Force contribution $\mathbf{F}_{ij}(t; t_0)$

**Use cases:**

- Visualize causal cones and causal isochrons
- Identify self-hit events and winding numbers
- Trace energy transfer pathways
- Validate superposition (sum of logged forces = total acceleration?)

### Analytic Regimes and Research Roadmap

#### Summary and Key Takeaways

##### What This Document Establishes

The **Master Equation of Motion** is the deterministic law governing the evolution of all architrinos:

$$
\frac{d^2 \mathbf{x}_i}{dt^2}
=
\sum_{j} \sum_{t_0 \in \mathcal{C}_{ij}(t)}
\kappa \, \sigma_{ij} \,
\frac{|q_i q_j|}{r_{ij}^2\,\left|J_{ij}(t;t_0)\right|}
\, \hat{\mathbf{r}}_{ij}.
$$

**Key features:**

1. **Event-local at the receiver**: Only intersecting delayed causal wake surfaces contribute (no action-at-a-distance).
2. **Non-Markovian**: Depends on full path history (self-hit memory).
3. **Superposition**: Linear sum over all sources and causal roots.
4. **Self-hit**: Repulsive same-source interaction when $\mathcal{C}_{ii}(t)$ is nonempty with a valid transversality floor; super-field-speed interval history is a necessary warning condition for simple nontrivial roots and can persist as memory after slowing down.
5. **Radial line of action with Jacobian flux weighting**: No magnetic or velocity-cross-product terms; all per-hit accelerations point along $\hat{\mathbf{r}}_{ij}$, with magnitude modulated by $\left|J_{ij}\right|^{-1}$.

##### Implications for Emergent Phenomena

The equation supplies the microscopic input for later emergence claims, but it does not by itself prove those claims. The status split is:

- **Binary stabilization**: supported by self-hit barriers and circular/spiral benchmarks; exact stable branches still require certified branch charts and tangential-power closure.
- **Tri-binaries and particle assemblies**: downstream assembly claims that must be derived from multi-body causal-root locking and hierarchy averaging.
- **Quantum behavior**: an effective closure target based on non-Markovian memory, attractor basins, and receiver-level informational ambiguity.
- **Observer-level geometry and gravity**: effective descriptions that must be recovered from Noether-Sea constitutive response and clock/ruler closure, not inserted into the substrate law.
- **Cosmology**: an effective observer-side program tied to Noether-Sea evolution, transport, and clock-rate comparison; the Euclidean void itself is not claimed to expand.

---

#### Fully general case (arbitrary N, arbitrary trajectories)

The master EOM is a coupled system of **state‑dependent delay differential equations** with:

- non-linear dependence on all worldlines,
- implicit causal roots defined by
  $\|\mathbf{x}_i(t)-\mathbf{x}_j(t_0)\| = c_f (t-t_0)$,
- potentially **multiple roots** per pair (multi‑hit, self‑hit),
- non-smooth behavior in the $\eta \to 0$ limit.

In PDE/DDE theory, systems of this type almost never admit closed‑form analytic solutions except in toy limits.

So:

- **Claim:** There is no expectation of general analytic solutions for arbitrary N and trajectories.
- What we can aim for instead:
  - Existence/uniqueness theorems in broad classes,
  - qualitative theory (invariants, attractors, bifurcations),
  - asymptotic approximations (multipole / far‑field, continuum limits),
  - special highly symmetric exact solutions.

That’s standard: even Newtonian N‑body gravity is analytically intractable generically; we’re strictly more complex than that.

---

#### Ideal / symmetric cases where analytic work is realistic

The most tractable cases are the highly symmetric regimes in which closed forms or controlled approximations remain plausible.

##### Static / quasi‑static limit (Coulomb analogue)

Assumptions:

- All particles move slowly: $\|\mathbf{v}_j\| \ll c_f$,
- Configuration changes on timescales long compared to light‑crossing time across the system,
- No self‑hits (sub‑$c_f$ everywhere, weak curvature).

Then:

- For each pair $(i,j)$, the causal root is essentially unique and very close to the instantaneous causal-delay emission time.
- We can neglect acceleration and velocity corrections in the past-emission position.

To leading order, we should recover:

- A **Coulomb‑like 1/r^2 law** between quasi‑static sources,
- The usual Kepler‑like two‑body dynamics.

Analytic status:

- Two‑body problem in this limit: solvable exactly (ellipses, etc.).
- N‑body: same qualitative status as Newtonian gravity/electrostatics—no closed form in general, but standard perturbation methods apply.

This is the basic consistency-check regime of the theory.

---

##### Two‑body, 1D radial motion (head‑on, no angular momentum)

Setup:

- Two opposite polarities on a line, starting at rest, moving directly toward each other,
- Symmetry: center‑of‑mass at rest, only radial variable $r(t)$,
- Speeds sub‑$c_f$ so no self‑hit.

Then:

- Causal delay gives a small correction; in the slow regime we can treat it perturbatively.
- To zeroth order, you already wrote:
  $$
  \frac{d^2 r}{dt^2} = -\frac{2\kappa \epsilon^2}{r^2},
  $$
  which has an exact analytic solution for $r(t)$ (same math as Kepler fall‑to‑center).

We can:

- Write the exact integral for $t(r)$, and invert in special cases.
- Then treat causal delay as a small parameter $\epsilon_\mathrm{ret} \sim r/c_f T$ and develop a systematic expansion.

So: **analytic yes** (up to standard quadratures), and corrections doable.

For the self-hit-capable reduced problem that goes beyond the sub-$c_f$ perturbative regime and sets up a return-map breather question, see [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md).

For the local origin-crossing theorem program in that reduced note, the working 1D model is dual-mollified rather than merely causal-surface-regularized: the causal-surface mollifier $\delta_\eta$ still selects delayed roots, while a separate core mollifier $\epsilon_c$ is imposed on the inverse-square amplitude so the post-crossing local vector field remains finite. That dual-mollified local model is the one used for the first recapture lemmas there.

---

##### Two‑body uniform circular orbit, sub‑$c_f$ (no self‑hit)

Consider the symmetric opposite-polarity circular ansatz
$$
\mathbf{x}_1(t)=R(\cos\omega t,\sin\omega t,0),
\qquad
\mathbf{x}_2(t)=-\mathbf{x}_1(t),
\qquad
\beta\equiv \frac{v}{c_f}=\frac{\omega R}{c_f}\in(0,1).
$$
Fix receiver $1$ at time $t$ and let the unique partner emission time be $t_0=t-\Delta$, with
$$
\xi\equiv \frac{\omega\Delta}{2}\in\left(0,\frac{\pi}{2}\right).
$$
Write $\mathbf{e}_r(t)=(\cos\omega t,\sin\omega t,0)$ and
$\mathbf{e}_\theta(t)=(-\sin\omega t,\cos\omega t,0)$ for the receiver polar frame.

##### Proposition (Unique partner branch and exact delay equation)

In the symmetric sub-$c_f$ circular ansatz, the partner branch is unique and its delay angle $\xi$ is the unique solution of
$$
\cos\xi=\frac{\xi}{\beta},
\qquad
0<\xi<\frac{\pi}{2}.
$$

**Proof.**
The partner separation is
$$
\mathbf{r}_{12}(t;t_0)
=
\mathbf{x}_1(t)-\mathbf{x}_2(t_0)
=
R\big(\mathbf{e}_r(t)+\mathbf{e}_r(t-\Delta)\big),
$$
so
$$
r_{12}(t;t_0)=2R\cos\frac{\omega\Delta}{2}=2R\cos\xi.
$$
The causal condition $r_{12}=c_f\Delta$ therefore becomes
$$
2R\cos\xi=c_f\frac{2\xi}{\omega},
$$
hence $\cos\xi=\xi/\beta$.
Define $h_\beta(\xi)=\cos\xi-\xi/\beta$ on $[0,\pi/2]$. Then
$$
h_\beta(0)=1>0,
\qquad
h_\beta\!\left(\frac{\pi}{2}\right)=-\frac{\pi}{2\beta}<0,
\qquad
h_\beta'(\xi)=-\sin\xi-\frac{1}{\beta}<0.
$$
So $h_\beta$ is strictly decreasing and has exactly one root on $(0,\pi/2)$. $\square$

##### Proposition (Exact partner-only circular force decomposition)

For the unique partner branch above,
$$
\hat{\mathbf{r}}_{12}
=
\cos\xi\,\mathbf{e}_r(t)-\sin\xi\,\mathbf{e}_\theta(t),
\qquad
r_{12}=2R\cos\xi,
\qquad
J_{12}=1+\beta\sin\xi.
$$
Since the charges are opposite, the partner acceleration on receiver $1$ is
$$
\mathbf{a}_{12}
=
-\frac{\kappa |q_1q_2|}{4R^2\cos^2\xi\,(1+\beta\sin\xi)}
\left(
\cos\xi\,\mathbf{e}_r(t)-\sin\xi\,\mathbf{e}_\theta(t)
\right).
$$
Therefore the exact radial and tangential components are
$$
a_r^{(\mathrm{part})}
=
-\frac{\kappa |q_1q_2|}{4R^2\cos\xi\,(1+\beta\sin\xi)}<0,
$$
$$
a_\theta^{(\mathrm{part})}
=
\frac{\kappa |q_1q_2|\,\sin\xi}{4R^2\cos^2\xi\,(1+\beta\sin\xi)}
=
\frac{\kappa |q_1q_2|\,\tan\xi}{4R^2\cos\xi\,(1+\beta\sin\xi)}
>0.
$$

**Proof.**
Using
$$
\mathbf{e}_r(t-\Delta)=\cos(2\xi)\,\mathbf{e}_r(t)-\sin(2\xi)\,\mathbf{e}_\theta(t),
$$
one finds
$$
\mathbf{r}_{12}
=
R\big(\mathbf{e}_r(t)+\mathbf{e}_r(t-\Delta)\big)
=
2R\cos\xi\left(\cos\xi\,\mathbf{e}_r(t)-\sin\xi\,\mathbf{e}_\theta(t)\right),
$$
which gives the stated $r_{12}$ and $\hat{\mathbf{r}}_{12}$.
The source velocity at emission is
$$
\mathbf{v}_2(t_0)
=
-v\,\mathbf{e}_\theta(t-\Delta),
$$
and
$$
\mathbf{e}_\theta(t-\Delta)\cdot\hat{\mathbf{r}}_{12}=\sin\xi,
$$
so
$$
\mathbf{v}_2(t_0)\cdot\hat{\mathbf{r}}_{12}=-v\sin\xi,
\qquad
J_{12}=1-\frac{\mathbf{v}_2(t_0)\cdot\hat{\mathbf{r}}_{12}}{c_f}=1+\beta\sin\xi.
$$
Because $\sigma_{12}=-1$ for opposite polarities, the branch acceleration is $-\kappa|q_1q_2|\hat{\mathbf{r}}_{12}/(r_{12}^2J_{12})$, and projecting onto $\mathbf{e}_r(t)$ and $\mathbf{e}_\theta(t)$ yields the stated components. Since $\xi\in(0,\pi/2)$, every factor in the denominators is positive and $\sin\xi>0$, proving the sign claims. $\square$

##### Corollary (Tangential positivity and circular instability)

Within the isolated partner-only circular ansatz, the tangential power is strictly positive:
$$
\mathbf{a}_{12}\cdot\mathbf{v}_1(t)=v\,a_\theta^{(\mathrm{part})}>0.
$$
Therefore an isolated opposite-polarity binary cannot realize an exact constant-speed circular orbit from partner delay alone.

**Interpretation.**
These are the exact partner-only circular formulas needed elsewhere in the chapter. They show that the delayed partner branch supplies the desired inward radial pull, but it also drives the motion forward along $\mathbf{e}_\theta$. The circular ansatz therefore spirals inward instead of closing unless some additional structure changes the tangential balance.

---

##### Self‑hit for uniform circular motion, $v > c_f$ (single particle)

This is the key toy model for self‑hit/maximum curvature.

Take:

- One architrino on a circle of radius $R$, angular speed $\omega$, velocity $v = \omega R > c_f$.
- We ignore partner forces; pure self‑hit geometry.

Then causal condition:

$$
\big\|\mathbf{x}(t) - \mathbf{x}(t_0)\big\|
= 2R\left|\sin\frac{\omega (t-t_0)}{2}\right|
= c_f (t-t_0).
$$

Let $\Delta = t - t_0 > 0$. Then:

$$
2R\left|\sin\frac{\omega \Delta}{2}\right| = c_f \Delta.
$$

Introduce the dimensionless variables
$$
\beta=\frac{v}{c_f}=\frac{\omega R}{c_f},
\qquad
\xi=\frac{\omega \Delta}{2}.
$$
Then the circular self-hit condition becomes
$$
\sin\xi=\frac{\xi}{\beta},
\qquad 0<\xi<\beta.
$$
For fixed $\beta>1$, the admissible self-hit set is therefore **finite**, not infinite: roots are exactly the intersections of $\sin\xi$ with the line $\xi/\beta$ inside the compact interval $(0,\beta)$.

The principal branch turns on at $\beta=1$. Writing $\beta=1+\mu$ with $\mu>0$ small, the smallest root obeys
$$
\xi_0 \sim \sqrt{6\mu},
\qquad
\Delta_0 \sim \frac{2\sqrt{6\mu}}{\omega},
\qquad
r_0=c_f\Delta_0\sim 2R\sqrt{6\mu}.
$$
The associated circular branch Jacobian is
$$
J_n
=
1-\frac{\mathbf{v}(t-\Delta_n)\cdot\hat{\mathbf{r}}_n}{c_f}
=
1-\beta\cos\xi_n
=
1-\xi_n\cot\xi_n.
$$
On the principal branch,
$$
J_0 \sim 2\mu.
$$
Hence the near-threshold self-hit weight scales like
$$
\frac{1}{r_0^2|J_0|}
\sim
\frac{1}{48R^2\,\mu^2}.
$$
This is the circular caustic behind the null-separatrix wall: the first self branch does not merely appear at $\beta=1$, it appears with a Jacobian-amplified weight that is already singular in the excess speed.

Higher branches are also tractable. For the circular root function
$$
g_\beta(\xi)\equiv \sin\xi-\frac{\xi}{\beta},
$$
new admissible roots can appear only at interior tangencies satisfying
$$
g_\beta(\xi)=0,
\qquad
g_\beta'(\xi)=0.
$$
Eliminating $\beta$ gives the tangency equation
$$
\tan\xi = \xi,
$$
and the corresponding threshold speed is
$$
\beta^\star = \sec\xi^\star.
$$
At every such tangency,
$$
J^\star = 1-\beta^\star \cos\xi^\star = 0.
$$
So each new circular self branch is born directly on a Jacobian-null boundary: branch creation and null-separatrix contact are the same event in the uniform circular toy model.

> **Theorem Target (Signed higher-winding circular branch birth).**
> The circular distance equation should be read branchwise as
> $$
> g_{\beta,s}(\xi)\equiv s\sin\xi-\frac{\xi}{\beta}=0,
> \qquad
> s=\operatorname{sign}(\sin\xi)\in\{+1,-1\}.
> $$
> For each higher half-winding $n\ge 1$, set
> $$
> I_n=\left(n\pi,\left(n+\frac{1}{2}\right)\pi\right),
> \qquad
> s_n=(-1)^n,
> $$
> and let $\xi_n^\star\in I_n$ be the unique positive solution of
> $$
> \tan\xi_n^\star=\xi_n^\star.
> $$
> The signed branch-birth speed is
> $$
> \beta_n^\star
> =
> s_n\sec\xi_n^\star
> =
> |\sec\xi_n^\star|
> =
> \sqrt{1+(\xi_n^\star)^2}.
> $$
> If
> $$
> a_n=\left(n+\frac{1}{2}\right)\pi,
> $$
> then
> $$
> \xi_n^\star=a_n-\frac{1}{a_n}+O(a_n^{-3}),
> \qquad
> \beta_n^\star=a_n-\frac{1}{2a_n}+O(a_n^{-3}).
> $$
> For $\beta=\beta_n^\star+\mu$ with $0<\mu\ll 1$, the two newly active roots satisfy
> $$
> \xi_{n,\pm}(\beta)
> =
> \xi_n^\star
> \pm
> \sqrt{\frac{2\mu}{\beta_n^\star}}
> +O(\mu),
> $$
> and their force-law Jacobians have opposite signs:
> $$
> J_{n,\pm}
> =
> 1-\beta s_n\cos\xi_{n,\pm}
> =
> \pm\,\xi_n^\star
> \sqrt{\frac{2\mu}{\beta_n^\star}}
> +O(\mu).
> $$
> Thus a higher-winding fold creates a signed root pair on a Jacobian-null boundary. Since $r_{n,\pm}\to 2R\xi_n^\star/\beta_n^\star\neq0$, the master-equation force-law weight scales as
> $$
> \frac{1}{r_{n,\pm}^2|J_{n,\pm}|}
> =
> O(\mu^{-1/2}).
> $$
> The causal-action coarea weight is a separate collapse factor:
> $$
> g_{\beta,s_n}'(\xi_{n,\pm})
> =
> s_n\cos\xi_{n,\pm}-\frac{1}{\beta}
> =
> -\frac{J_{n,\pm}}{\beta},
> $$
> so the action-counting density carries an additional $|g_{\beta,s_n}'|^{-1}$ and scales as $O(\mu^{-1})$ at fixed nonzero $r_n^\star$. The coarea factor does not replace the force-law Jacobian weight; it is an additional measure factor from collapsing the causal-action integral onto the circular causal roots.
>
> Consequently the circular self-hit combinatorics remain linearly bounded in $\beta$. A one-sign subchart has
> $$
> N_{\text{self}}^{(+)}(\beta)=\frac{\beta}{\pi}+O(1),
> $$
> while the full signed $|\sin\xi|$ chart has the same no-proliferation form with the convention-dependent leading constant.

> **Benchmark Proposition (Circular branch-count bound).**
> In the symmetric circular benchmark, if the speed ratio obeys
> $$
> |\beta(t)|\le \beta_\ast<\infty
> $$
> uniformly, then the active circular self-hit count is uniformly bounded:
> $$
> N_{\mathrm{self}}(t)
> \le
> \frac{\beta_\ast}{\pi}+C_{\mathrm{circ}},
> $$
> where
> $$
> C_{\mathrm{circ}}
> $$
> is an absolute endpoint-count constant for the circular root equation. This supplies the missing branch-count input in the continuation criterion for that benchmark. A general super-field-speed trajectory still needs its own no-proliferation theorem; tight spirals or repeatedly folded histories can otherwise leave the finite-branch chart even without speed blowup, collision, or a single Jacobian floor loss.

That already:

- Gives us analytic control of the causal roots (as solutions of a simple scalar transcendental),
- Lets us write the self‑force as
  $$
  \mathbf{a}_\text{self}(t) =
  \sum_n \kappa \frac{q^2}{r_n^2\,|J_n|} \hat{\mathbf{r}}_n,
  $$
  with $r_n = c_f \Delta_n$, $J_n = 1-\mathbf{v}(t-\Delta_n)\cdot\hat{\mathbf{r}}_n/c_f$, and directions that can be written explicitly in terms of the phase difference.

We will not get a *closed‑form sum*, but:

- The geometry is 100% analyzable,
- At high speed the number of admissible roots grows only linearly with $\beta$ because all roots lie in $(0,\beta)$,
- Large‑$n$ roots admit asymptotic expansions,
- We can show convergence of the self‑force series away from Jacobian-degenerate roots ($J=0$),
- And derive asymptotic radial/tangential components as functions of $v/c_f$.

Near the null-separatrix condition $J\to 0$, the exact branch weight carries a $1/|J|$ singularity (see Maximum-Curvature Orbit above), so this toy model also captures the geometric-wall limit.

This is again an amplitude statement, not a closure theorem. A circular self branch born on $J=0$ is born with singular weight, but the same singular factor multiplies tangential as well as radial projections. The null wall therefore obstructs continuation through the branch boundary without, by itself, proving an exactly locked circular orbit.

So: **strong analytic handle**, though not “closed form in elementary functions.”

This is the right playground to:

- Derive a condition for equilibrium between self‑repulsion and an imposed centripetal requirement,
- Define $R_\text{min}(v)$ and in particular the extremal radius / speed.

The same circular chart also gives a branchwise force decomposition. On the positive-sine self-hit subchart, every active root satisfies
$$
\sin\xi=\frac{\xi}{\beta},
\qquad
r=2R\sin\xi=2R\frac{\xi}{\beta},
\qquad
J=1-\beta\cos\xi=1-\xi\cot\xi.
$$
Resolving the line-of-action direction into the instantaneous circular frame gives
$$
\hat{\mathbf{r}}(\xi)=\sin\xi\,\mathbf{e}_r+\cos\xi\,\mathbf{e}_\theta.
$$
With
$$
C=\frac{\kappa q^2}{4R^2},
$$
the branchwise self-hit projections are therefore
$$
a_r(\xi)=C\,\frac{\beta}{\xi |J|},
\qquad
a_\theta(\xi)=C\,\frac{\beta^2\cos\xi}{\xi^2 |J|}.
$$
Thus the radial projection is outward on every active self root, while the tangential projection is controlled entirely by the sign of $\cos\xi$.

The branch sheets have the following one-sign structure:

| Sheet | Root status for $\sin\xi=\xi/\beta$ | Radial projection | Tangential projection |
| --- | --- | --- | --- |
| Negative sine lobes | No roots, because $\xi/\beta>0$ | Inactive | Inactive |
| First positive lobe | One nonzero root for $\beta>1$ | Outward | Forward for $\cos\xi>0$, backward for $\cos\xi<0$ |
| Higher positive left sheets | One root after birth from a Jacobian-null fold | Outward | Forward |
| Higher positive right sheets | Paired root after the same birth | Outward | Backward |

For large $\beta$, away from arbitrarily small Jacobian-null birth windows, the signed circular self-hit sums obey
$$
A_r(\beta)=\sum_{\xi_n}a_r(\xi_n)
=
\frac{C}{\pi}\log\beta+O(C),
$$
and
$$
A_\theta(\beta)=\sum_{\xi_n}a_\theta(\xi_n)
=
-\frac{C\beta}{12}+O(C\log\beta).
$$
The corresponding absolute tangential activity is
$$
\sum_{\xi_n}|a_\theta(\xi_n)|
=
\frac{C\beta}{6}+O(C\log\beta).
$$
The full signed $|\sin\xi|$ circular chart uses $s=\operatorname{sign}(\sin\xi)$ and
$$
s\sin\xi=\frac{\xi}{\beta},
\qquad
J=1-\beta s\cos\xi,
\qquad
\hat{\mathbf{r}}(\xi)=|\sin\xi|\,\mathbf{e}_r+s\cos\xi\,\mathbf{e}_\theta.
$$
Thus the full signed-chart projections are
$$
a_r^{|\sin|}(\xi)=C\,\frac{\beta}{\xi |J|},
\qquad
a_\theta^{|\sin|}(\xi)=C\,\frac{\beta^2s\cos\xi}{\xi^2 |J|}.
$$
The radial contribution is still outward on every active self root. The tangential contribution is forward on each left sheet and backward on each right sheet, independent of the sine-lobe sign. In the full signed chart, the order-$\beta$ signed tangential terms cancel pairwise between adjacent sheets, giving the bound
$$
A_r^{|\sin|}(\beta)=\frac{2C}{\pi}\log\beta+O(C),
\qquad
A_\theta^{|\sin|}(\beta)=O(C),
$$
again away from arbitrarily small Jacobian-null birth windows. The absolute tangential activity remains large:
$$
\sum_{\xi_n}|a_\theta^{|\sin|}(\xi_n)|
=
\frac{C\beta}{3}+O(C\log\beta).
$$
Pure circular self-hit is therefore not tangentially neutral branchwise. It supplies outward radial support and large cancelling forward/backward tangential activity; on the positive-sine subchart alone the signed large-$\beta$ residue is backward and order $\beta$, while on the full signed chart the linear signed terms cancel to a bounded remainder. This corrects the stronger blanket statement that self branches are always positive-tangential, without by itself proving or disproving full binary closure.

##### Large-$\beta$ partner/self circular residual

The exact partner branch can now be combined with the self-hit sums to get a high-speed obstruction for the equal-magnitude bare circular binary. Let $\xi_p(\beta)$ solve
$$
\cos\xi_p=\frac{\xi_p}{\beta},
\qquad
0<\xi_p<\frac{\pi}{2},
$$
and set
$$
C=\frac{\kappa q^2}{4R^2}.
$$
Then
$$
\xi_p=\frac{\pi}{2}-\frac{\pi}{2\beta}+O(\beta^{-2}),
$$
so the partner projections satisfy
$$
a_{\theta}^{(\mathrm{part})}
=
\frac{4C}{\pi^2}\beta+O(C),
\qquad
a_{r}^{(\mathrm{part})}
=
-\frac{2C}{\pi}+O(C\beta^{-1}).
$$
On the positive-sine self chart,
$$
a_{\theta}^{(\mathrm{part})}+A_\theta(\beta)
=
C\left(\frac{4}{\pi^2}-\frac{1}{12}\right)\beta+O(C\log\beta)>0
$$
for sufficiently large $\beta$, and
$$
a_{r}^{(\mathrm{part})}+A_r(\beta)
=
\frac{C}{\pi}\log\beta-\frac{2C}{\pi}+O(C)
$$
is outward for sufficiently large $\beta$ outside Jacobian-null birth windows.

On the full signed $|\sin\xi|$ chart,
$$
a_{\theta}^{(\mathrm{part})}+A_\theta^{|\sin|}(\beta)
=
\frac{4C}{\pi^2}\beta+O(C)>0,
$$
while
$$
a_{r}^{(\mathrm{part})}+A_r^{|\sin|}(\beta)
=
\frac{2C}{\pi}\log\beta-\frac{2C}{\pi}+O(C)
$$
is again outward for sufficiently large $\beta$. Thus an exact high-speed constant-radius circular orbit is asymptotically excluded in the equal-magnitude bare two-body kernel away from Jacobian-null windows: the tangential residual remains forward, and the radial branch sum does not provide the required inward acceleration $-\omega^2R$. This is not yet a finite-$\beta$ no-go theorem; any surviving finite-speed window still requires a certified branch chart with positive Jacobian floor, inactive gaps, finite memory depth, and signed residual closure.

The circular self-hit and partner-hit formulas are kernel benchmarks. They are not the Noether-core model. The Noether-core model is the six-body tri-binary branch chart containing self, partner, and inter-layer causal roots, with hierarchy averaging only where justified by separated scales and certified branch data.

---

##### Maximum‑curvature binary (inner binary idealization)

For the full **two‑body** maximum‑curvature orbit (inner binary), we have:

- Two charges on roughly circular orbits about their COM,
- Both potentially with self‑hit,
- Plus partner forces with causal delay.

Analytic expectations:

- An *exact closed form* is very unlikely.
- But:

  - We can construct a controlled circular ansatz:
    - Assume perfectly circular orbits with fixed $R$, $\omega$,
    - Compute partner force including causal delay (as in 2.3),
    - Compute self‑force (as in 2.4),
    - Demand that time‑averaged radial force gives exactly $\omega^2 R$,
    - Demand that time‑averaged tangential force vanish.

  - That gives us a **pair of algebraic conditions** in $R$ and $\omega$ (or equivalently $R$ and $v$).
  - Solving those algebraic conditions (perhaps numerically) defines a maximum‑curvature solution family.

However, the circular benchmark still exposes a serious obstruction in the bare two-body kernel. In the symmetric isolated binary, every active partner branch contributes a positive tangential component. The self sector is different: the circular self-hit branch table above gives outward radial support, while the tangential projection changes sign by sheet; on the full signed chart its order-$\beta$ signed tangential terms cancel to a bounded remainder, with order-$\beta$ absolute tangential activity still present. Therefore the former blanket self-branch positive-tangential claim is too strong. Exact constant-speed closure of the bare circular two-body ansatz is not ruled out by a branchwise sign argument alone; it requires the actual signed partner-plus-self tangential sum to vanish on a certified branch chart.

This sharpens the maximum-curvature program into a concrete fork:

- either the certified signed branch sum fails to cancel the partner drive, so the isolated two-body MCB does **not** exist as an exact constant-speed circular orbit of the bare kernel, or
- an algebraic cancellation exists, after which stability still requires a separate delay-operator proof and may require additional structure beyond the bare circular two-body ansatz, such as medium coupling, genuine tri-binary multi-body locking, or a more subtle non-circular periodic balance.

So:

- Analytically: we can reduce the existence question to algebraic conditions and asymptotic expansions, and in the bare circular ansatz we can identify the partner-positive/self-signed tangential balance that any closure certificate must satisfy.
- Dynamically: the stability question remains separate from the algebraic construction and requires numerical analysis of attractivity versus fine-tuned orbit families.

The expected answer for the bare two-body kernel is instability, not robust attraction. Existence of a circular or maximum-curvature solution would only solve the algebraic balance conditions
$$
\overline F_{\mathrm{rad}}(R,v)=\omega^2R,
\qquad
\overline F_{\mathrm{tan}}(R,v)=0.
$$
Stability is a different question: linearizing the delayed dynamics about the candidate orbit gives a delay operator
$$
L(\lambda)
$$
and the characteristic equation
$$
\det(\lambda I-L(\lambda))=0.
$$
Any root with
$$
\operatorname{Re}\lambda>0
$$
is an unstable mode.

> **Target Proposition (MCB transverse stability diagnostic).**
> For any candidate bare two-body maximum-curvature binary, compute the linearized delay operator on radial and tangential perturbations. The null-separatrix self-hit wall may stabilize or block the radial collapse channel; partner branches supply sign-definite forward drive, while circular self branches supply outward radial support and a signed tangential channel whose full signed-chart linear terms cancel only after summing adjacent sheets. Thus a bare MCB should be treated as an uncertified organizing orbit in
> $$
> (R,v)
> $$
> space until the net signed tangential balance and transverse eigenvalues are certified.

This is the intended dynamical interpretation. Stable particles in the present architecture are tri-binary assemblies; a bare MCB, if it exists, is a high-curvature component or limiting scaffold whose instability explains why additional locking structure is needed.

This would be an “analytic scaffold + numerical check” situation, not full closed forms.

---

##### Symmetric delayed spiral (advanced non-circular benchmark)

The circular obstruction makes a non-circular benchmark worthwhile. A workable first ansatz is the symmetric logarithmic spiral
$$
r(\theta)=R_0 e^{-a\theta},
\qquad
t(\theta)=\frac{\theta}{\Omega},
\qquad
\mathbf{x}_1(\theta)=r(\theta)\,\mathbf{e}_r(\theta),
\qquad
\mathbf{x}_2(\theta)=-r(\theta)\,\mathbf{e}_r(\theta),
$$
with fixed pitch $a>0$ and constant angular rate $\Omega>0$.

The variable-pitch extension replaces the constant pitch by
$$
p(\theta)\equiv-\frac{r'(\theta)}{r(\theta)}.
$$
At a source angle $\theta_0=\theta-\Delta$, write
$$
p_0\equiv p(\theta-\Delta),
\qquad
\omega_0\equiv \dot\theta(\theta-\Delta),
\qquad
\rho\equiv \frac{r(\theta-\Delta)}{r(\theta)}.
$$
The logarithmic benchmark is the special case $p(\theta)=a$, $\omega_0=\Omega$, and $\rho=e^{a\Delta}$. This extension is useful because a true minimum-radius event requires
$$
\dot r=0,
\qquad
\ddot r\ge 0,
$$
which in the pitch variable means
$$
p(\theta_\ast)=0,
\qquad
p'(\theta_\ast)\le 0
$$
when $\dot\theta(\theta_\ast)\ne0$.

For a receiver event at angle $\theta$ and a partner emission at $\theta_0=\theta-\Delta$ with $\Delta>0$, define
$$
\Lambda_p(\theta,\Delta)\equiv \sqrt{1+\rho^2+2\rho\cos\Delta}.
$$
Then
$$
\mathbf{r}_{12}(\theta;\theta_0)
=
r(\theta)\Big[(1+\rho\cos\Delta)\mathbf{e}_r(\theta)-\rho\sin\Delta\,\mathbf{e}_\theta(\theta)\Big],
$$
so the exact delayed-hit condition is
$$
r(\theta)\,\Lambda_p(\theta,\Delta)=c_f\,(t(\theta)-t(\theta-\Delta)).
$$
For constant angular rate this reduces to
$$
\Lambda_p(\theta,\Delta)=\frac{\Delta}{b(\theta)},
\qquad
b(\theta)\equiv \frac{\Omega r(\theta)}{c_f},
$$
which is the non-circular analogue of the circular partner equation $\cos\xi=\xi/\beta$.

The receiver Frenet frame for the variable-pitch spiral is
$$
\hat{\mathbf{T}}
=
\frac{-p\,\mathbf{e}_r(\theta)+\mathbf{e}_\theta(\theta)}{\sqrt{1+p^2}},
\qquad
\hat{\mathbf{N}}
=
\frac{-\mathbf{e}_r(\theta)-p\,\mathbf{e}_\theta(\theta)}{\sqrt{1+p^2}},
$$
where $p=p(\theta)$ and $\hat{\mathbf{N}}$ points inward in the circular limit.
Using the branch unit vector
$$
\hat{\mathbf{r}}_{12}
=
\frac{(1+\rho\cos\Delta)\mathbf{e}_r(\theta)-\rho\sin\Delta\,\mathbf{e}_\theta(\theta)}
{\Lambda_p},
$$
the partner source-velocity projection entering the Jacobian is
$$
\mathbf{v}_2(\theta-\Delta)\cdot\hat{\mathbf{r}}_{12}
=
\frac{r(\theta)\rho\,\omega_0}{\Lambda_p}
\Big[p_0(\cos\Delta+\rho)-\sin\Delta\Big].
$$
Hence
$$
J_{12}
=
1+
\frac{r(\theta)\rho\,\omega_0}{c_f\,\Lambda_p}
\Big[\sin\Delta-p_0(\cos\Delta+\rho)\Big].
$$
The sign is fixed by the circular limit: when $p_0=0$ and $\rho=1$, this gives $J_{12}=1+\beta\sin(\Delta/2)$.

For opposite polarities, the branch acceleration is
$$
\mathbf{a}_{12}
=
\frac{-\kappa |q_1q_2|}{r(\theta)^2\Lambda_p^2 |J_{12}|}\,
\hat{\mathbf{r}}_{12}.
$$
Projecting onto the variable-pitch Frenet frame gives
$$
a_T^{p}
=
\frac{\kappa |q_1q_2|}{r(\theta)^2\Lambda_p^3 |J_{12}|\,\sqrt{1+p^2}}
\Big[p(1+\rho\cos\Delta)+\rho\sin\Delta\Big],
$$
$$
a_N^{p}
=
\frac{\kappa |q_1q_2|}{r(\theta)^2\Lambda_p^3 |J_{12}|\,\sqrt{1+p^2}}
\Big[1+\rho\cos\Delta-p\rho\sin\Delta\Big].
$$
The partner tangential numerator is therefore
$$
S_T^{p}(\theta,\Delta)
\equiv
p(1+\rho\cos\Delta)+\rho\sin\Delta.
$$

The missing self-branch analogue uses
$$
\Lambda_s(\theta,\Delta)\equiv \sqrt{1+\rho^2-2\rho\cos\Delta},
$$
$$
\hat{\mathbf{r}}_{11}
=
\frac{(1-\rho\cos\Delta)\mathbf{e}_r(\theta)+\rho\sin\Delta\,\mathbf{e}_\theta(\theta)}
{\Lambda_s}.
$$
The self-hit delay equation is
$$
r(\theta)\,\Lambda_s(\theta,\Delta)=c_f\,(t(\theta)-t(\theta-\Delta)),
$$
and the self-branch Jacobian is
$$
J_{11}
=
1-
\frac{r(\theta)\rho\,\omega_0}{c_f\,\Lambda_s}
\Big[\sin\Delta+p_0(\rho-\cos\Delta)\Big].
$$
Again the circular limit agrees with the uniform circular self-hit formula, $J_{11}=1-\beta\cos(\Delta/2)$.

For self-hit, $\sigma_{11}=+1$, so
$$
\mathbf{a}_{11}
=
\frac{\kappa q_1^2}{r(\theta)^2\Lambda_s^2 |J_{11}|}\,
\hat{\mathbf{r}}_{11}.
$$
The self-branch tangential projection is
$$
a_T^{s}
=
\frac{\kappa q_1^2}{r(\theta)^2\Lambda_s^3 |J_{11}|\,\sqrt{1+p^2}}
\Big[-p(1-\rho\cos\Delta)+\rho\sin\Delta\Big],
$$
so
$$
S_T^{s}(\theta,\Delta)
\equiv
-p(1-\rho\cos\Delta)+\rho\sin\Delta.
$$

The circular obstruction is now converted into a branch-chart test. A non-circular spiral can beat the isolated circular tangential obstruction only if the certified active roots satisfy a negative weighted tangential sum on enough of the controlled cycle:
$$
\sum_{\mathrm{part}}
\frac{|q_1q_2|\,S_T^p}{\Lambda_p^3 |J_{12}|}
+
\sum_{\mathrm{self}}
\frac{q_1^2\,S_T^s}{\Lambda_s^3 |J_{11}|}
<0
$$
after the common positive factors are removed. Algebraic sign allowance is not enough; the delayed-root equations must actually admit those roots with positive Jacobian floors and finite memory depth.

At a minimum-radius event $\theta_\ast$, the pitch condition gives $p(\theta_\ast)=0$. Therefore both tangential numerators reduce locally to
$$
S_T^p(\theta_\ast,\Delta)=S_T^s(\theta_\ast,\Delta)=\rho\sin\Delta.
$$
Principal roots with $0<\Delta<\pi$ still carry the same positive tangential sign as the circular benchmark. The only bare-kernel escape routes are therefore:

1. admissible older or wrapped roots with $\sin\Delta<0$ and enough Jacobian weight;
2. off-turn variable-pitch intervals where the $p$-terms dominate the positive principal branches;
3. additional medium, tri-binary, or multi-body structure outside the isolated two-body spiral ansatz.

The radial turn condition is equally explicit. Since
$$
\ddot r=a_r+r\dot\theta^2
$$
at a point with $\dot r=0$, a minimum-radius turn requires
$$
r_\ast\dot\theta_\ast^2
-
\sum_{\mathrm{part}}
\frac{\kappa |q_1q_2|\,(1+\rho_p\cos\Delta_p)}
{r_\ast^2\Lambda_{p}^3 |J_{12,p}|}
+
\sum_{\mathrm{self}}
\frac{\kappa q_1^2\,(1-\rho_s\cos\Delta_s)}
{r_\ast^2\Lambda_{s}^3 |J_{11,s}|}
>0.
$$
This is a theorem target, not a closure proof. It supplies the concrete falsification gate: enumerate the admissible partner and self roots on a variable-pitch candidate, certify their Jacobian floors, and test both the radial turn inequality and the weighted tangential sum. If all admissible roots keep the weighted tangential sum nonnegative on every candidate turn corridor, the bare isolated spiral does not beat the circular obstruction.

For a retained chart at a turn center, the radial row can be normalized by the common force factor, but that normalization separates the branch sum from the independent force ratio. In the equal-magnitude opposite-polarity case, one may write
$$
\Gamma\equiv\frac{r_\ast^3\Omega^2}{\kappa q_1^2},
\qquad
B_r(\theta_\ast)
=
-\sum_{\mathrm{part}}
\frac{1+\rho_p\cos\Delta_p}{\Lambda_p^3|J_{12,p}|}
+
\sum_{\mathrm{self}}
\frac{1-\rho_s\cos\Delta_s}{\Lambda_s^3|J_{11,s}|},
$$
so the normalized turn row is
$$
\Gamma+B_r(\theta_\ast)>0.
$$
The retained branch chart fixes $B_r$ only. It does not determine $\Gamma$ from $b_\ast=\Omega r_\ast/c_f$, from the delayed-root offsets, or from a branch-sum threshold. A branch certificate must therefore either supply an independently derived force-ratio interval or report the radial row as blocked.

A fixed retained-chart benchmark illustrates a sharper prescribed-history failure. For the $a_{\mathrm{A1}}=0.204$, $b_\ast=7/2$ constant-$\Omega$ variable-pitch spiral on $I_\ast=[-\pi/6,\pi/6]$, the retained $3+1$ chart has certified active-root, inactive-gap, Jacobian-floor, finite-memory, and root-transport rows. Its exact radial kinematics at $\theta_\ast=0$ fix the force-ratio row by
$$
B_r(C_{\mathrm{A1}};0)=(a_{\mathrm{A1}}-1)\Gamma,
\qquad
\Gamma\in[0.007531050241046427,\ 0.007531144882881889],
$$
which strictly passes the minimum-turn inequality. The same prescribed history fails exact tangential compatibility at the turn center: constant $\Omega$ and $p(0)=0$ require the normalized pointwise tangential force sum $T_0(C_{\mathrm{A1}})$ to vanish, while the retained chart gives
$$
T_0(C_{\mathrm{A1}})
\in[-0.007585901776635041,\ -0.007585740886803276].
$$
Thus A1 is a constant-$\Omega$ kinematic-balance no-go for this prescribed isolated two-body history. It remains a replayable retained-chart benchmark, not a closed isolated spiral certificate and not a rejection of variable-angular-rate, medium-supplemented, tri-binary, or other non-circular histories.

The no-go is also constructive. If the same turn-center radial curve is allowed a variable angular rate, with $\omega_\ast=\dot\theta(0)>0$ and $\alpha_\ast=\ddot\theta(0)$, then $r'(0)=0$ and the exact local balance equations become
$$
B_r(C_{\mathrm{A1}};0)=(a_{\mathrm{A1}}-1)\Gamma_\ast,
\qquad
T_0(C_{\mathrm{A1}})=\Gamma_\ast\frac{\alpha_\ast}{\omega_\ast^2},
$$
where $\Gamma_\ast=r_\ast^3\omega_\ast^2/(\kappa q_1^2)$. Combining the retained A1 intervals gives
$$
\frac{\alpha_\ast}{\omega_\ast^2}
\in[-1.0072833846320208,\ -1.007249363114164].
$$
Thus the constant-$\Omega$ failure supplies a precise local angular-deceleration target for a variable-angular-rate continuation. It does not by itself close such a continuation, because the delayed roots and Jacobian weights must be recomputed for the nonconstant time law.

The stronger invariant form of the target is the angular slope of the time law,
$$
\left.
\frac{d}{d\theta}\log\dot\theta
\right|_{\theta=0}
=
\frac{\ddot\theta(0)}{\dot\theta(0)^2}
=
\frac{T_0(C_{\mathrm{A1}})}{\Gamma_\ast}.
$$
However, the delayed roots are controlled by a finite-memory integral, not by this local slope alone. If
$$
H(\Delta)
=
\omega_\ast
\int_{-\Delta}^{0}
\frac{d\phi}{\dot\theta(\phi)},
$$
then the turn-center root equation is $\Lambda_{P/S}(0,\Delta)=H(\Delta)/b_\ast$. Retaining an old constant-rate root at the same offset would require $H(\Delta_\alpha)=\Delta_\alpha$, or
$$
\int_{-\Delta_\alpha}^{0}
\left(
\frac{\omega_\ast}{\dot\theta(\phi)}-1
\right)d\phi=0.
$$
Thus the variable-rate A1 continuation is a finite-memory time-law problem: the local angular-deceleration target must be reconciled with inverse-rate averages over the delayed branch intervals. Simple one-parameter extensions of the local slope do not preserve A1; they either lose the retained roots or move to a branch ledger with the wrong radial sign for positive $\Gamma$.

This finite-memory condition is nevertheless not an algebraic no-go at the turn center. A positive retained-root inverse-rate profile can be chosen so that the old A1 delayed offsets keep $H(\Delta_\alpha)=\Delta_\alpha$, the active source-speed factors return to their constant-rate values at those offsets, and the same branch sums give $T_0(C_{\mathrm{A1}})/\Gamma_\ast$ equal to the required local angular-rate slope. Such a profile is a branch-chart search target, not an orbit certificate: the active roots, inactive gaps, source-speed Jacobians, finite-memory depth, and root-transport rows still have to be recomputed on an interval for the chosen nonconstant time law.

---

#### Effective Continuum Limits

Another class of analytic work appears only after coarse-graining the microscopic DDE:

##### Homogeneous, isotropic Noether Sea

Assume:

- Very large number of architrinos,
- Statistically homogeneous and isotropic distribution,
- Global neutrality.

Then, at coarse‑grained level:

- Symmetry dictates the net acceleration on a test architrino at rest is zero.
- Small perturbations can be analyzed by linearizing around the homogeneous background.

We can:

- derive an effective wave equation for small perturbations in density or potential diagnostics,
- show that disturbances propagate at an emergent channel speed tied to $c_f$ and medium response,
- recover Maxwell-like or acoustic-like behavior as effective continuum behavior.

These are field-theory-style analytic solutions (plane waves, Green's functions) of the **coarse-grained** equations, not of the micro DDEs. They are useful only when the continuum variables are explicitly derived from the master equation by a declared coarse-graining limit.

This regime is analytically tractable and important for:

- Emergent electromagnetism,
- Emergent metric propagation (gravitational‑wave analogues),
- Stability of the Noether Sea itself.

---

#### Analytic footholds and remaining targets

Several formerly open checks are now footholds rather than blank targets:

1. **Partner-only circular orbit with causal delay ($v<c_f$)** now has explicit radial and tangential components, including the positive tangential-drive obstruction for a bare constant-speed circle.
2. **Uniform circular self-hit ($v>c_f$)** now has principal-root onset asymptotics, signed higher-winding branch birth, branchwise radial/tangential projections, and large-$\beta$ self-hit estimates.
3. **Variable-pitch spiral retained-chart benchmarks** now expose both branch-chart rows and prescribed-history compatibility rows. The fixed A1 constant-$\Omega$ history has certified active-root, inactive-gap, Jacobian-floor, finite-memory, and root-transport rows; its exact radial kinematics fix $\Gamma$ in the accepted normalization and pass the minimum-turn inequality, while the exact turn-center tangential residual excludes zero. A1 is therefore a replayable constant-$\Omega$ kinematic-balance no-go for that prescribed isolated two-body history, not a closure result and not a global no-go for non-circular histories. The same calculation turns the failure into a local continuation equation: a variable-angular-rate A1 turn would need $\ddot\theta(0)/\dot\theta(0)^2\in[-1.0072833846320208,\ -1.007249363114164]$ before the delayed-root chart is recomputed for the new time law. The recomputation is now sharpened as a finite-memory problem: the root equation uses $H(\Delta)=\omega_\ast\int_{-\Delta}^{0}d\phi/\dot\theta(\phi)$, so any viable nonconstant A1 history must match branch-memory averages as well as the local turn slope. A retained-root inverse-rate profile can satisfy those turn-center memory equations, so the remaining burden is interval transport of that profile into a certified branch chart rather than a pointwise algebraic obstruction.

The remaining analytic targets are sharper:

1. build the maximum-curvature branch certificate from active roots, inactive gaps, Jacobian floors, finite memory, root transport, returned-section residuals, radial/tangential balance, and the independent force-ratio row;
2. coarse-grain the master equation around a homogeneous Noether Sea and extract the linear response and dispersion relation $\omega(k)$;
3. prove which regularized energy diagnostic is actually induced by a symmetry-preserving action-level regularization.

These targets keep the bridge between the formal law and the broader closure program mathematical: a branch chart, a conserved charge, or a response equation must be supplied before a stability or mass claim is promoted.

---

#### Bottom line

- **General N‑body analytic solution:** No; the structure is too complex (DDE with state‑dependent delays and self‑hit multiplicity).
- **Idealized / symmetric cases:** Yes, in several important classes:
  - 1D radial two‑body,
  - sub‑$c_f$ circular orbit,
  - uniform circular self‑hit,
  - algebraic maximum‑curvature conditions,
  - continuum/wave limits of the Noether Sea.

---

### Energy, Symmetry, and Conservation

#### Energy, Lagrangian, and Hamiltonian Structure of the Architrino Dynamics

In this section we outline how **energy** and **variational structure** are handled in $\mathbb{A}\mathbb{A}\mathbb{A}$, given the Master Equation of Motion:

$$
\frac{d^2 \mathbf{x}_i}{dt^2} =
\sum_{j} \sum_{t_0 \in \mathcal{C}_{ij}(t)}
\kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2(t;t_0)\,\left|J_{ij}(t;t_0)\right|}\,\hat{\mathbf{r}}_{ij}(t;t_0),
$$

where each contribution comes from a **causal wake intersection** at time $t$ between architrino $i$ and a wake emitted by architrino $j$ at earlier time $t_0$. The set $\mathcal{C}_{ij}(t)$ encodes all such emission times selected by the causal constraint

$$
\|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\| = c_f (t - t_0),\quad t_0 < t.
$$

Once any internal binary reaches the $v>c_f$ regime at some stage in its curved history, **self‑hit** becomes a live branch candidate and must be checked explicitly in realistic energy accounting. Completed assemblies cannot be assigned a “no self-hit” energy row merely from current sub-field-speed motion; the retained path history must show that same-source roots are absent or inactive with a certified branch gap.

We organize the discussion into four pieces:

1. Aggregate kinetic energy for a finite, isolated set of architrinos,
2. An action-level nonlocal Noether energy charge compatible with path‑history dynamics,
3. A nonlocal Lagrangian scaffold whose variations reproduce the Master Equation only when the constraint residual closes,
4. A corresponding Hamiltonian / total energy functional, with energy exchange only at $t=\text{now}$ between architrinos.

---

##### Aggregate Kinetic Energy

We work with **absolute time** $t$ and Euclidean 3‑space. For each architrino $i$, define:

- Position $\mathbf{x}_i(t)$,
- Velocity $\mathbf{v}_i(t) = d\mathbf{x}_i/dt$,
- Optional universal bookkeeping constant $\mu_{\text{arch}}$ when a quadratic kinetic proxy is desired.

We do **not** a priori assign energy to any continuous field; energy is carried by architrinos and their assemblies and is updated only at the instants where wake surfaces intersect receivers.

**Definition (Quadratic kinetic bookkeeping proxy).** For a finite isolated set of architrinos $\{i=1,\dots,N\}$,

$$
K_{\mu}(t) \equiv \sum_{i=1}^N \frac{1}{2} \mu_{\text{arch}} \|\mathbf{v}_i(t)\|^2.
$$

Remarks:

- This is a bookkeeping choice for analysis, numerics, and Noether-style energy accounting. The substrate law itself remains acceleration-first.
- Because $\mu_{\text{arch}}$ is universal, it can be absorbed into units or into an overall normalization of force-like quantities if desired.
- For assemblies (binaries, tri‑binaries), one defines an effective assembly mass $M_\text{assembly}$ as
  $$
  M_\text{assembly} = \frac{1}{V_\text{CM}} \frac{d}{dV_\text{CM}} \left(\text{total kinetic + interaction energy of internal motion}\right),
  $$
  where $V_\text{CM}$ is the center‑of‑mass speed. In practice, this is computed from the internal architrino motions (e.g., the tight inner binary self‑hit orbit plus its interaction with partner binaries).

Thus kinetic energy splits naturally into:

- **Internal kinetic energy** of bound assemblies (setting rest mass),
- **Center‑of‑mass kinetic energy** of assemblies relative to the Noether Sea.

---

##### Action-Level Nonlocal Noether Energy

With finite-speed causal wakes and path-history dependence, an instantaneous position-only potential is not fundamental. Time-translation symmetry of a symmetry-preserving nonlocal action model supplies the corresponding nonlocal Noether charge. The formulas in this subsection therefore belong to the action-derived delayed model, not to every regularized implementation of the Master Equation.

For the dual-mollified local 1D model used later in [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md), the same conservation language should be read more carefully: the causal-surface mollifier $\delta_\eta$ and core mollifier $\epsilon_c$ support a finite local vector field and a tractable return-map theorem program, but exact Noether-charge statements transfer automatically only if that dual mollification is itself derived from a time-translation-invariant action-level regularization of the causal kernel.

###### Energy exchange per causal hit

Consider a single contribution to the acceleration of architrino $i$ at time $t$ from a causal hit emitted by $j$ at time $t_0\in\mathcal{C}_{ij}(t)$. The acceleration contribution is:

$$
\mathbf{a}_{ij}(t;t_0)
= \kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2\,\left|J_{ij}(t;t_0)\right|}\,\hat{\mathbf{r}}_{ij}.
$$

The instantaneous power delivered to architrino $i$ by this hit is:

$$
P_{ij}(t;t_0)
= \mu_{\text{arch}}\,\mathbf{a}_{ij}\cdot \mathbf{v}_i
= \mu_{\text{arch}}\,\kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2\,\left|J_{ij}(t;t_0)\right|}\, v_{r,ij},
$$

where $v_{r,ij} = \mathbf{v}_i(t)\cdot \hat{\mathbf{r}}_{ij}$ is the radial component of the receiver’s velocity along the line of action. This is the **only instant** when the interaction can change the kinetic energy of $i$. Between hits, $\mathbf{a}_{ij}$ from this specific emission is zero.

Summing over all contributing sources and all causal emission times at a given $t$,

$$
\frac{dK_{\mu}}{dt}(t)
= \sum_i \sum_j \sum_{t_0 \in \mathcal{C}_{ij}(t)} P_{ij}(t;t_0),
$$

with the understanding that for self‑hit we include $j=i$ as well.

###### Action-level wake-energy functional at time boundary $t$

Let $\mathcal{K}_{ij}(t_1,t_0)$ denote the causal-delay interaction kernel appearing in the nonlocal action scaffold below:

$$
\mathcal{K}_{ij}(t_1,t_0)
=
\frac{\kappa\,\sigma_{ij}\,|q_i q_j|}{c_f}\,
\Theta(t_1-t_0)\,
\frac{\delta\!\big(g_{ij}(t_1,t_0)\big)}{r_{ij}(t_1,t_0)},
\qquad
g_{ij}(t_1,t_0)=t_1-t_0-\frac{r_{ij}(t_1,t_0)}{c_f}.
$$

For an isolated system, the nonlocal Noether charge associated with $t\mapsto t+\tau$ is

$$
E_{\text{tot}}(t)=K_{\mu}(t)+E_{\text{wake}}(t),
$$

with

$$
E_{\text{wake}}(t)
=
\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{t} dt_0
\int_{t}^{\infty} dt_1\,
\partial_{t_1}\mathcal{K}_{ij}(t_1,t_0).
$$

For $i=j$, the same rule applies with the trivial coincidence branch ($t_1=t_0$) excluded, matching the self-hit convention used throughout this chapter.

Interpretation: the double integral measures interaction links that cross the time boundary $t$ (past emission side $t_0\le t$ and future reception side $t_1\ge t$). This is the exact “in-flight” interaction contribution in the nonlocal theory.

For exact solutions of the causal action, nonlocal Noether’s theorem gives

$$
\frac{d}{dt}\Big(K_{\mu}(t)+E_{\text{wake}}(t)\Big)=0.
$$

No separate spatial field-energy ontology is required; conservation is encoded directly in worldline geometry and the causal kernel.

For proof and simulation, the same statement can be written as a residual balance. Let
$$
\mathbf{R}_i^{(\eta)}(t)
=
\mu_{\text{arch}}\mathbf{a}_i(t)
-
\mathbf{F}_{i,\mathrm{act}}^{(\eta)}(t)
$$
be the Euler-Lagrange residual of the symmetry-preserving regularized action, where $\mathbf{F}_{i,\mathrm{act}}^{(\eta)}$ includes the scale term and any nonzero constraint-variation residual from the action. Let $\mathcal{B}_{E}^{(\eta)}(t)$ collect energy flux through finite history-window endpoints, period cuts, and excluded self-coincidence boundaries. Then the action-level energy balance is
$$
\frac{d}{dt}
\left(
K_{\mu}(t)+E_{\text{wake}}^{(\eta)}(t)
\right)
=
\sum_i\mathbf{v}_i(t)\cdot\mathbf{R}_i^{(\eta)}(t)
+
\mathcal{B}_{E}^{(\eta)}(t).
$$
For isolated compactly supported or period-matched histories, $\mathbf{R}_i^{(\eta)}=\mathbf{0}$ and $\mathcal{B}_{E}^{(\eta)}=0$ give the exact conserved charge. A nonzero residual identifies a real failure mode: branch-chart loss, nonsymmetric regularization, leakage through the finite memory window, or an unaccounted derivative-of-delta counterterm.

###### Equivalent work-integral form

For direct trajectory evaluation, one may reconstruct a compatible interaction contribution through the accumulated power exchange along the realized trajectory:

$$
U(t)=U_\ast-\int_{t_\ast}^{t}\sum_i \mu_{\text{arch}}\,\mathbf{a}_i(t')\cdot\mathbf{v}_i(t')\,dt'.
$$

This work-integral form is a practical trajectory-level reconstruction when the same action-derived force law and boundary convention are used. It should not be treated as an independent off-shell Noether functional; outside the symmetry-preserving action model it is a diagnostic bookkeeping quantity rather than a proved conserved charge.

In short-delay effective limits, $E_{\text{wake}}$ reduces to an approximate instantaneous pair form

$$
E_{\text{wake}}(t)\approx\sum_{i<j}U_{ij}\big(\mathbf{x}_i(t),\mathbf{x}_j(t)\big),
$$

with leading $1/r_{ij}$ behavior plus geometry-dependent self-hit corrections.

---

##### Exact Nonlocal Lagrangian

To connect with variational methods and with later continuum approximations, it is useful to exhibit the **action principle** for the delayed dynamics. Because the interactions depend on path history via causal wakes, the action is necessarily nonlocal in time.

###### Exact causal-delay Fokker-type interaction term

For the focused scalar causal-locus statistic (definitions, theorem spine, and circular branch-count benchmark), see [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md#core-functional-definitions). That chapter's $1/(r^2J)$ functional is an action-counting diagnostic built from the received branch density; it is not automatically identical to the exact Fokker-type variational action below, whose $1/r$ causal kernel yields the inverse-square branch law after variation.

Let the worldline of architrino $i$ be $\mathbf{x}_i(t)$. For the action-scaffold discussion, the same universal bookkeeping constant may be inserted in the quadratic kinetic term:
$$
S[\{\mathbf{x}_i\}]
=
\sum_i \int dt\, \frac{1}{2} \mu_{\text{arch}} \|\mathbf{v}_i(t)\|^2
\;-\;
\frac{1}{2}\sum_{i\neq j} S_{ij},
$$

with interaction contributions

$$
S_{ij}
=
\frac{\kappa\,\sigma_{ij}\,|q_i q_j|}{c_f}
\int dt \int dt'\,
\Theta(t-t')\,
\frac{\delta\!\big(g_{ij}(t,t')\big)}{r_{ij}(t,t')},
$$

where

$$
g_{ij}(t,t') \equiv t-t' - \frac{r_{ij}(t,t')}{c_f},
\qquad
r_{ij}(t,t') = \|\mathbf{x}_i(t) - \mathbf{x}_j(t')\|.
$$

Key points:

- $\Theta(t-t')$ enforces the purely past-causal branch ($t' \le t$).
- $\delta(g_{ij})$ restricts support to the characteristic causal surface $r_{ij}=c_f(t-t')$.
- The sharp action scaffold contains no fundamental mollifier: $\eta$ is a regularization parameter used to test branch limits.

Integrating out the delta via the delay-map Jacobian gives the branch-resolved form:

$$
\delta\!\big(g_{ij}(t,t')\big)
=
\sum_{t_0\in\mathcal{C}_{ij}(t)}
\frac{\delta(t'-t_0)}
{\left|\partial_{t'} g_{ij}(t,t_0)\right|},
\qquad
\partial_{t'} g_{ij}
= -1 + \frac{\hat{\mathbf{r}}_{ij}(t;t_0)\cdot \mathbf{v}_j(t_0)}{c_f}.
$$

Hence

$$
S_{ij}
=
\frac{\kappa\,\sigma_{ij}\,|q_i q_j|}{c_f}
\int dt\,
\sum_{t_0\in\mathcal{C}_{ij}(t)}
\frac{1}
{r_{ij}(t;t_0)\,\left|1-\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)/c_f\right|}.
$$

###### Variation and line-of-action forces

The branch law targeted by the action-level variation is:

$$
\frac{d}{dt}\left(\mu_{\text{arch}}\mathbf{v}_i(t)\right)
= \sum_j \mathbf{F}_{ij}(t),
$$

and the branch-resolved force is

$$
\mathbf{F}_{ij}(t)
=
\mu_{\text{arch}}\,\kappa\,\sigma_{ij}\,|q_i q_j|
\sum_{t_0\in\mathcal{C}_{ij}(t)}
\frac{\hat{\mathbf{r}}_{ij}(t;t_0)}
{r_{ij}^2(t;t_0)\,\left|1-\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)/c_f\right|},
$$

The inverse-square factor follows in the theorem sketch from the variation of the scale-invariant kernel. On a simple-root chart, the interaction density is
$$
\frac{1}{r_{ij}}\delta(g_{ij}),
\qquad
g_{ij}=t-t'-\frac{r_{ij}}{c_f}.
$$
Varying the receiver position gives
$$
\delta r_{ij}
=
\hat{\mathbf r}_{ij}\cdot \delta\mathbf{x}_i,
\qquad
\delta\!\left(\frac{1}{r_{ij}}\right)
=
-\frac{\hat{\mathbf r}_{ij}\cdot\delta\mathbf{x}_i}{r_{ij}^2}.
$$
The variation of
$$
\delta(g_{ij})
$$
is the remaining distributional part of the proof. After the source-side variation, integration by parts on the root-selected chart, and boundary terms are accounted for, the target branch-resolved Euler-Lagrange term is proportional to
$$
\frac{\hat{\mathbf r}_{ij}}{r_{ij}^2|J_{ij}|}.
$$
This $1/r^2$ scaling is not an added ansatz in the accepted proof route: it is the pull-back expected from a scale-invariant causal-cone constraint in 3D when varying a $1/r$ Fokker kernel. The full proof requires controlling the derivative-of-delta term under the same symmetry-preserving regularization.

The derivative-of-delta term has a useful exact reduction on any transversal branch. Since
$$
\partial_{t'}g_{ij}(t,t')
=
-J_{ij}(t;t'),
$$
one has
$$
\delta_\eta'(g_{ij})
=
-
\frac{1}{J_{ij}}
\partial_{t'}\delta_\eta(g_{ij}).
$$
Thus the root-constraint variation can be integrated by parts in the source time $t'$:
$$
\int dt'\,
\Theta(t-t')
\frac{\delta_\eta'(g_{ij})}{c_f r_{ij}}
\hat{\mathbf r}_{ij}
=
\mathcal{B}_{ij}^{(\eta)}(t)
+
\int dt'\,
\delta_\eta(g_{ij})
\partial_{t'}
\left[
\Theta(t-t')
\frac{\hat{\mathbf r}_{ij}}{c_f r_{ij}J_{ij}}
\right].
$$
The first term is an endpoint or excluded-coincidence contribution; the second is the root-chart interior derivative that must be accounted for before the pure scalar kernel can be claimed to derive the branch-resolved force law. Therefore the action proof does not license dropping $\delta_\eta'(g_{ij})$ by fiat. It requires the symmetry-preserving regularization to make this interior derivative vanish, become a boundary/source-side contribution under the allowed variations, or be cancelled by an explicit counterterm. If that cancellation fails, the branch-resolved law requires an additional regularized counterterm beyond $\hat{\mathbf r}_{ij}/(r_{ij}^2|J_{ij}|)$.

The source-side variation narrows the issue further. Holding the receiver point fixed and varying the emission point gives
$$
\delta r_{ij}
=
-\hat{\mathbf r}_{ij}\cdot\delta\mathbf{x}_j(t'),
\qquad
\delta g_{ij}
=
\frac{1}{c_f}\hat{\mathbf r}_{ij}\cdot\delta\mathbf{x}_j(t'),
$$
so
$$
\delta_{\mathrm{src}}\!\left(\frac{\delta_\eta(g_{ij})}{r_{ij}}\right)
=
\left[
\frac{\delta_\eta(g_{ij})}{r_{ij}^2}
+
\frac{\delta_\eta'(g_{ij})}{c_f r_{ij}}
\right]
\hat{\mathbf r}_{ij}\cdot\delta\mathbf{x}_j(t').
$$
Selecting the future reception time as the root gives
$$
\partial_t g_{ij}(t,t')
=
1-\frac{\hat{\mathbf r}_{ij}(t,t')\cdot\mathbf{v}_i(t)}{c_f},
$$
and hence the source-side derivative-of-delta term integrates by parts as
$$
\int dt\,
\Theta(t-t')
\frac{\delta_\eta'(g_{ij})}{c_f r_{ij}}
\hat{\mathbf r}_{ij}
=
\widetilde{\mathcal{B}}_{ij}^{(\eta)}(t')
-
\int dt\,
\delta_\eta(g_{ij})
\partial_t
\left[
\Theta(t-t')
\frac{\hat{\mathbf r}_{ij}}
{c_f r_{ij}\left(1-\hat{\mathbf r}_{ij}\cdot\mathbf{v}_i/c_f\right)}
\right].
$$
This is a coefficient of $\delta\mathbf{x}_j(t')$, not of $\delta\mathbf{x}_i(t)$. For arbitrary compactly supported interior variations, the receiver and source variations are independent. The source-side term therefore does not generically cancel the receiver-side root-chart derivative in the Euler-Lagrange equation for $\mathbf{x}_i(t)$. Noether boundary terms control endpoint contributions and global time-translation, spatial-translation, and rotation charges; they do not remove an interior coefficient under compact variations.

In the sharp positive-delay, transversal limit,
$$
\int dt'\,
\delta_\eta(g_{ij})
\partial_{t'}
\left[
\Theta(t-t')
\frac{\hat{\mathbf r}_{ij}}{c_f r_{ij}J_{ij}}
\right]
\longrightarrow
\frac{1}{|J_{ij}(t;t_0)|}
\left.
\partial_{t'}
\left[
\frac{\hat{\mathbf r}_{ij}(t,t')}{c_f r_{ij}(t,t')J_{ij}(t;t')}
\right]
\right|_{t'=t_0}.
$$
Thus the exact $1/r$ causal kernel proves the target inverse-square branch term only if the admitted branch also satisfies the local stationarity condition
$$
\left.
\partial_{t'}
\left[
\frac{\hat{\mathbf r}_{ij}(t,t')}{r_{ij}(t,t')J_{ij}(t;t')}
\right]
\right|_{t'=t_0}
=
\mathbf{0},
$$
as a sufficient special case, or if the action is supplemented by an explicit regularized counterterm whose receiver Euler derivative cancels this residual interior vector. Such a counterterm must come from an invariant action-level mechanism, not from fitting the already accepted force law. Without one of those conditions, the displayed Master EOM remains the accepted causal law and branch diagnostic, while the pure scalar $1/r$ Fokker-type action is only a partial variational scaffold for it.

Equivalently, define the direct scale term
$$
\mathbf{F}_{ij,\mathrm{scale}}^{(\eta)}(t)
=
\int_{-\infty}^{t}dt'\,
\frac{\hat{\mathbf r}_{ij}(t,t')}{r_{ij}^2(t,t')}\,
\delta_\eta(g_{ij}(t,t'))
$$
and the constraint residual
$$
\mathbf{C}_{ij}^{(\eta)}(t)
=
\mathbf{C}_{ij,\mathrm{recv}}^{(\eta)}(t)
+
\mathbf{C}_{ij,\mathrm{src}}^{(\eta)}(t)
+
\mathbf{C}_{ij,\mathrm{bdry}}^{(\eta)}(t),
$$
where $\mathbf{C}_{ij,\mathrm{recv}}^{(\eta)}$ is the receiver-side interior derivative displayed above, $\mathbf{C}_{ij,\mathrm{src}}^{(\eta)}$ is the source-side coefficient on $\delta\mathbf{x}_j(t')$, and $\mathbf{C}_{ij,\mathrm{bdry}}^{(\eta)}$ is the boundary contribution. On a regularized chart the action-derived equation has the diagnostic form
$$
\mu_{\text{arch}}\mathbf{a}_i(t)
=
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\left(
\mathbf{F}_{ij,\mathrm{scale}}^{(\eta)}(t)
+
\mathbf{C}_{ij}^{(\eta)}(t)
\right).
$$
The canonical branch law is recovered on a tested window $W$ in the weak simple-root limit only if
$$
\lim_{\eta\to0^+}
\int_W
\left\|
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\mathbf{C}_{ij}^{(\eta)}(t)
\right\|dt
=
0
$$
with the same branch floors and boundary convention used to define the action. This windowed residual condition is the minimal proof obligation for upgrading the variational scaffold to an exact action derivation of the Master EOM.

**Decision (pure scalar action).** The pure scalar $1/r$ Fokker-type scaffold does not generically derive the canonical branch law. The obstruction is local, not merely a boundary convention: for compactly supported receiver variations, the source-side coefficient and Noether endpoint terms cannot cancel the receiver-side interior derivative unless the branch satisfies the stationarity condition above or an invariant action-level counterterm supplies the missing Euler derivative.

Equivalently, on an admissible branch with $r_{ij}>0$ and $|J_{ij}|>J_{\min}>0$,
$$
\left.
\partial_{t'}
\left[
\frac{\hat{\mathbf r}_{ij}(t,t')}
{r_{ij}(t,t')J_{ij}(t;t')}
\right]
\right|_{t'=t_0}
\ne
\mathbf{0}
$$
is a certificate that the pure scalar scaffold leaves a nonzero receiver-force residual on that branch. This falsifies the universal claim "the scalar $1/r$ action by itself is the exact action for the Master EOM." It does not falsify the Master EOM, the action-level Noether bookkeeping on closed charts, or the possibility of a later invariant counterterm derived from a richer regularized action.

**No-go scaffold (same-support local scalar counterterm).** The clean local scalar counterterm route is closed under the following restricted assumptions: the added term has the same causal-surface support as the $1/r$ kernel, uses only $g_{ij}$, $r_{ij}$, and $J_{ij}$ on the existing branch chart, introduces no new variables, adds no off-surface support, and is not fitted after the force law is already known. Suppressing the common coupling and sign factors, the allowed branch-pair form is
$$
S_{\mathrm{ct},ij}^{(\eta)}
=
\int dt\,dt'\,
\Theta(t-t')\,
a(r_{ij},J_{ij})\,\delta_\eta(g_{ij}).
$$
For receiver variation,
$$
\delta r_{ij}
=
\hat{\mathbf r}_{ij}\cdot\delta\mathbf{x}_i,
\qquad
\delta g_{ij}
=
-\frac{1}{c_f}\hat{\mathbf r}_{ij}\cdot\delta\mathbf{x}_i.
$$
Before any optional $J_{ij}$-variation is included, the radial part of the counterterm variation contains
$$
\delta_{\mathbf{x}_i}S_{\mathrm{ct},ij}^{(\eta)}
\supset
\left[
\partial_{r_{ij}}a\,\delta_\eta(g_{ij})
-
\frac{a}{c_f}\delta_\eta'(g_{ij})
\right]
\hat{\mathbf r}_{ij}\cdot\delta\mathbf{x}_i.
$$
The optional $J_{ij}$-dependence can add transverse and source-velocity terms, but it does not remove the scalar radial coefficient that must cancel the original derivative-of-delta residual. Cancelling that coefficient for all admitted receiver variations requires
$$
a(r_{ij},J_{ij})
=
-\frac{1}{r_{ij}}.
$$
This choice necessarily adds
$$
\partial_{r_{ij}}a\,\delta_\eta(g_{ij})
=
\frac{\delta_\eta(g_{ij})}{r_{ij}^{2}},
$$
which changes the accepted inverse-square scale term. Any further same-support scalar correction that removes this scale change reintroduces a derivative-of-delta coefficient. A $g_{ij}$-antiderivative of $\delta_\eta(g_{ij})$ would move support away from the causal wake surface and is outside the assumptions. Therefore no same-support local scalar counterterm built only from $g_{ij}$, $r_{ij}$, and $J_{ij}$ is admissible under this restricted route.

The obstruction also survives a finite local delta-jet extension. Let
$$
K_{\mathrm{ct}}^{(\eta)}(r,g)
=
\sum_{n=0}^{N}a_n(r)\delta_\eta^{(n)}(g),
\qquad
D_{ij}
\equiv
\partial_r-\frac{1}{c_f}\partial_g.
$$
The direct kernel $K_0^{(\eta)}=\delta_\eta(g)/r$ has
$$
D_{ij}K_0^{(\eta)}
=
-\frac{\delta_\eta(g)}{r^2}
-\frac{\delta_\eta'(g)}{c_f r}.
$$
Cancelling only the derivative-of-constraint residual would require
$$
D_{ij}K_{\mathrm{ct}}^{(\eta)}
=
\frac{\delta_\eta'(g)}{c_f r}
$$
without adding another $\delta_\eta(g)/r^2$ scale term. For $N\ge1$, the highest derivative coefficient is $-a_N(r)\delta_\eta^{(N+1)}(g)/c_f$, so $a_N=0$; descending through the jet order forces $a_n=0$ for every $n\ge1$. The remaining $N=0$ case requires $a_0(r)=-1/r$, but then $\partial_r a_0=1/r^2$, so the counterterm again changes the inverse-square scale term it was supposed to preserve.

The conclusion is narrow but decisive for local repairs: no finite same-support local scalar or delta-jet counterterm cancels the scalar-kernel residual while leaving the canonical branch strength intact. A viable action-level repair must instead be nonlocal along the $(r,g)$ characteristic, or must use a richer velocity/history-dependent invariant action. Either route changes the action ontology enough that it should be discussed explicitly before canonization.

The terminal common-center inter-layer chart gives a concrete obstruction to the remaining per-branch stationarity route. In that specialization, stationarity of $\hat{\mathbf r}/(rJ)$ forces the source tangent to be parallel to the source-receiver separation. The scalar part then reduces to $\rho_\delta(1-\rho_\delta)=0$: the first factor collapses a positive-delay branch when the source speed is nonzero, and the second factor is $J=0$, a grazing branch excluded by the Jacobian floor. Thus terminal inter-layer charts should not expect the scalar scaffold to close by per-branch stationarity. The remaining local target is either branch-summed residual closure for a scale-only scaffold, or a recoil-inclusive action ledger that retains the residual as wake-emission resistance.

For the scale-only Master EOM, the branch-summed residual target is the vanishing of the signed receiver-side interior Euler derivative after the direct inverse-square term is removed:
$$
\sum_{b:\,o_b=i}
\kappa\,
\operatorname{sign}(q_{j_b}q_i)
\left|q_{j_b}q_i\right|
\mathbf{C}_{b}^{(0)}(t)
=
\mathbf{0}
$$
with the same positive-delay, Jacobian-floor, and boundary convention used by the branch chart. This is not the Master EOM force residual and not the Noether conservation ledger. It is the additional condition needed for the scalar action scaffold to have no leftover interior Euler derivative on that receiver. If the same signed sum is nonzero and is retained by the action rather than cancelled, it is the local recoil term that must appear in the finite-window force and energy ledger.

**Nonlocal characteristic repair target.** The least invasive remaining action-level route is to solve the counterterm equation before imposing causal-surface support. In the reduced scalar variables, the required receiver-gradient correction has the form
$$
D_{ij}K_{\mathrm{ct}}^{(\eta)}(r,g)
=
\frac{\delta_\eta'(g)}{c_f r},
\qquad
D_{ij}
=
\partial_r-\frac{1}{c_f}\partial_g.
$$
The characteristics of $D_{ij}$ preserve
$$
u
=
g+\frac{r}{c_f}.
$$
Thus a formal characteristic solution is
$$
K_{\mathrm{ct}}^{(\eta)}(r,g)
=
H_{\mathrm{ct}}^{(\eta)}\!\left(g+\frac{r}{c_f}\right)
+
\int_{r_\ast}^{r}
\frac{1}{c_f\rho}\,
\delta_\eta'\!\left(g+\frac{r-\rho}{c_f}\right)
d\rho,
$$
with $H_{\mathrm{ct}}^{(\eta)}$ and the lower characteristic endpoint $r_\ast$ fixed by the history-window, core-regularization, or boundary convention. This expression is invariant under time translation, spatial translation, and spatial rotation because it depends only on the causal scalar $g$, the Euclidean separation $r$, and declared scalar endpoints. It is not a same-support wake-surface term: it carries a characteristic tail in $(r,g)$ and therefore changes the action scaffold.

This gives a concrete proof target rather than a completed replacement action. A candidate nonlocal action may be promoted only if its endpoint convention preserves $H(0)=0$, its Euler derivative cancels the residual above without changing the accepted inverse-square branch term, and its Noether boundary terms close the same energy, momentum, and angular-momentum ledger used by the Master EOM.

The endpoint calculation sharpens that target. The lower-endpoint form above is only the formal characteristic integral. A delayed-interior tail should instead be oriented toward an outgoing endpoint:
$$
K_{\mathrm{ct},+}^{(\eta)}(r,g)
=
H_{+}^{(\eta)}\!\left(g+\frac{r}{c_f}\right)
-
\int_{r}^{R_{+}}
\frac{1}{c_f\rho}\,
\delta_\eta'\!\left(u-\frac{\rho}{c_f}\right)
d\rho,
\qquad
u=g+\frac{r}{c_f},
$$
with $R_{+}\ge r$ on the retained finite history chart, or with an explicitly controlled $R_{+}=\infty$ limit. A characteristic endpoint is the special case $R_{+}=R_{+}(u)$. Since $D_{ij}u=0$, differentiation gives
$$
D_{ij}K_{\mathrm{ct},+}^{(\eta)}
=
\frac{\delta_\eta'(g)}{c_f r}
-
\frac{D_{ij}R_{+}}{c_fR_{+}}\,
\delta_\eta'\!\left(u-\frac{R_{+}}{c_f}\right).
$$
Thus the desired interior cancellation holds without an extra endpoint source only when $R_{+}$ is itself a characteristic endpoint, $D_{ij}R_{+}=0$.

**Endpoint-ledger decision.** The displayed endpoint term is not automatically a Noether boundary term. Its support is
$$
u=\frac{R_{+}}{c_f},
\qquad
g=\frac{R_{+}-r}{c_f},
$$
which is generally an interior tail surface of the retained delayed chart, not the primary arrival surface $g=0$. If $D_{ij}R_{+}\ne0$, compact receiver variations inside the retained chart see
$$
-\frac{D_{ij}R_{+}}{c_fR_{+}}\,
\delta_\eta'\!\left(u-\frac{R_{+}}{c_f}\right)
$$
as an Euler coefficient. Moving that term into the Noether wake-history ledger would hide a force-law change unless the endpoint is a declared fixed history boundary whose variation is held fixed. Therefore the characteristic-tail repair preserves the accepted Master EOM branch force only under one of the following conditions:
$$
D_{ij}R_{+}=0,
\qquad\text{or}\qquad
\lim_{\eta\to0^+}
\int_W
\left\|
\frac{D_{ij}R_{+}}{c_fR_{+}}\,
\delta_\eta'\!\left(u-\frac{R_{+}}{c_f}\right)
\right\|dt
=0
$$
for the declared branch chart and fixed endpoint convention. In that admissible case the endpoint contributes only a boundary wake-history flux, not a new receiver force. In the generic non-characteristic case, the repair is a no-go for the current Master EOM because it adds an extra interior action force.

In the sharp-support limit, the outgoing form is supported on
$$
0
\le
g
\le
\frac{R_{+}-r}{c_f},
$$
so it is a causal interior tail behind the arriving wake surface, not a same-support surface density. Conversely, a lower endpoint $r_\ast<r$ supports a tail with $g\le0$ and is not delayed-interior causal support unless the boundary convention supplies a separate interpretation. This proves a useful but limited result: the characteristic-tail equation can cancel the scalar scaffold's interior derivative residual at the level of the Euler derivative, but it does so by adding a nonlocal tail and endpoint ledger obligation. It is not yet an exact action for the Master EOM.

A nondegenerate characteristic endpoint gives the cleanest current candidate. On a retained chart choose
$$
R_{+}(u)
=
c_f(u+h_{+}),
\qquad
h_{+}>0,
$$
or take the controlled $R_{+}=\infty$ limit. Since $R_{+}=R_{+}(u)$ and $D_{ij}u=0$, the endpoint is characteristic and the Euler leakage term proportional to $D_{ij}R_{+}$ vanishes. The outgoing counterterm can then be written, after the change of variable $s=u-\rho/c_f$, as
$$
K_{\mathrm{ct},+}^{(\eta)}(r,g)
=
H_{+}^{(\eta)}(u)
-
\int_{-h_{+}}^{g}
\frac{\delta_\eta'(s)}
{c_f(u-s)}
ds.
$$
Integrating by parts gives
$$
\frac{\delta_\eta(g)}{r}
+
K_{\mathrm{ct},+}^{(\eta)}(r,g)
=
H_{+}^{(\eta)}(u)
+
\frac{\delta_\eta(-h_{+})}
{c_f(u+h_{+})}
+
\int_{-h_{+}}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds.
$$
The finite-endpoint clearance condition is therefore
$$
\mathcal{B}_{+}^{(\eta)}(u,h_{+})
\equiv
\frac{\delta_\eta(-h_{+})}
{c_f(u+h_{+})}
=0,
$$
for a compactly supported mollifier with $h_{+}$ outside the support, or $\mathcal{B}_{+}^{(\eta)}\to0$ in the declared weak limit for a Gaussian mollifier. If finite-$\eta$ endpoint clearance is not exact, the characteristic gauge must be fixed by
$$
H_{+}^{(\eta)}(u)
=
-
\mathcal{B}_{+}^{(\eta)}(u,h_{+})
$$
before the kernel is treated as a normalized action object. This condition is invisible to the receiver Euler derivative because it depends only on $u$, but it is visible to the Noether wake-history charge.

With the endpoint-clear normalization imposed, the delayed-interior effective kernel is
$$
K_{\mathrm{eff},h_{+}}^{(\eta)}(r,g)
=
\int_{-h_{+}}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds,
\qquad
u=g+\frac{r}{c_f}.
$$
In the infinite-endpoint form,
$$
K_{\mathrm{eff}}^{(\eta)}(r,g)
=
\int_{-\infty}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds.
$$
Both forms satisfy the receiver-gradient identity
$$
D_{ij}K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g)}{r^2},
$$
with the finite form using the same identity after endpoint clearance. Thus the delayed-interior characteristic-tail kernel cancels the derivative-of-constraint residual without adding a second inverse-square scale term. The accompanying Noether boundary terms for energy, momentum, and angular momentum must be taken from the same normalized kernel, as below; replacement of a diagnostic inverse-square adapter on any concrete branch still requires the branch-chart residual and conservation checks.

**Noether boundary increments for the normalized tail.** With the endpoint-clear normalization imposed, there is no remaining free $H_{+}^{(\eta)}(u)$ gauge term that can shift the wake-history charge. Define the weighted effective action kernel
$$
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(t_1,t_0)
=
\frac{\kappa\,\sigma_{ij}|q_iq_j|}{c_f}
\Theta(t_1-t_0)
K_{\mathrm{eff}}^{(\eta)}
\!\left(
r_{ij}(t_1;t_0),
g_{ij}(t_1,t_0)
\right),
$$
with the same finite-endpoint version when the chart uses $h_{+}<\infty$. For a time cut $t_\ast$, let
$$
X_{ij}(t_\ast)
=
\{(t_1,t_0):t_0\le t_\ast<t_1,\ t_1>t_0\},
$$
with the trivial self-coincidence branch excluded when $i=j$. The normalized characteristic-tail wake increments are
$$
E_{\mathrm{wake,eff}}^{(\eta)}(t_\ast)
=
\frac{1}{2}\sum_{i,j}
\int_{X_{ij}(t_\ast)}
\partial_{t_1}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(t_1,t_0)
\,dt_0\,dt_1,
$$
$$
\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}(t_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}(t_\ast)}
\nabla_{\mathbf{x}_i(t_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(t_1,t_0)
\,dt_0\,dt_1,
$$
and
$$
\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}(t_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}(t_\ast)}
\mathbf{x}_i(t_1)\times
\nabla_{\mathbf{x}_i(t_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(t_1,t_0)
\,dt_0\,dt_1.
$$
The minus signs in the spatial charges follow the sign convention that the interaction contribution appears with a minus sign in the action. The receiver-gradient identity gives
$$
\nabla_{\mathbf{x}_i(t_1)}
K_{\mathrm{eff}}^{(\eta)}
=
\hat{\mathbf r}_{ij}D_{ij}K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g_{ij})}{r_{ij}^{2}}
\hat{\mathbf r}_{ij},
$$
while the source-end gradient is the opposite. Therefore a global spatial translation or rotation of both endpoints changes no interior action density, and a step translation or step rotation across $t_\ast$ exposes exactly the boundary increments above. The characteristic endpoint condition $D_{ij}R_{+}=0$, together with endpoint clearance, is the local reason these increments are wake-history boundary terms rather than a hidden extra receiver force.

This closes the local kernel-normalization and Noether-increment definition for the delayed-interior characteristic-tail repair. It does not by itself certify any proposed branch, terminal label, or tri-binary attractor: a branch chart must still show vanishing Euler residual, finite memory depth, positive Jacobian floors, and closure of $K_{\mu}+E_{\mathrm{wake,eff}}^{(\eta)}$, $\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}$, and $\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}$ over the same retained branch set.

**Branch-chart conservation pullback.** Let $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ be a retained branch chart with active causal-root rows $\mathcal{R}^{\mathrm{act}}$, positive inactive-root gaps, positive Jacobian floor, finite memory depth, and declared endpoint convention. For a time cut $t_\ast$, define the chart-restricted crossing domain
$$
X_{ij}^{\mathfrak{B}}(t_\ast)
\equiv
X_{ij}(t_\ast)
\cap
\{(t_1,t_0): (i,j,t_1,t_0)\ \text{lies on a retained row of }\mathcal{R}^{\mathrm{act}}\},
$$
with trivial self-coincidence excluded when $i=j$. The pulled-back wake-history charges are the same Noether boundary terms above, restricted to $X_{ij}^{\mathfrak{B}}(t_\ast)$:
$$
E_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}(t_\ast)
=
\frac{1}{2}\sum_{i,j}
\int_{X_{ij}^{\mathfrak{B}}(t_\ast)}
\partial_{t_1}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(t_1,t_0)
\,dt_0\,dt_1,
$$
$$
\mathbf{P}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}(t_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}^{\mathfrak{B}}(t_\ast)}
\nabla_{\mathbf{x}_i(t_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(t_1,t_0)
\,dt_0\,dt_1,
$$
and
$$
\mathbf{J}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}(t_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}^{\mathfrak{B}}(t_\ast)}
\mathbf{x}_i(t_1)\times
\nabla_{\mathbf{x}_i(t_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(t_1,t_0)
\,dt_0\,dt_1.
$$
The matching mechanical charges on the same chart are
$$
K_{\mu,\mathfrak{B}}(t)=\sum_{i\in\mathfrak{B}}\frac{1}{2}\mu_{\text{arch}}\|\mathbf{v}_i(t)\|^2,
\qquad
\mathbf{P}_{\mathrm{mech},\mathfrak{B}}(t)=\sum_{i\in\mathfrak{B}}\mu_{\text{arch}}\mathbf{v}_i(t),
$$
$$
\mathbf{J}_{\mathrm{mech},\mathfrak{B}}(t)
=
\sum_{i\in\mathfrak{B}}
\mathbf{x}_i(t)\times\mu_{\text{arch}}\mathbf{v}_i(t).
$$
For a retained window $W=[t_a,t_b]$, the branch-chart conservation test is
$$
\Delta_W\left(K_{\mu,\mathfrak{B}}+E_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}\right)
=
\int_W\sum_i\mathbf{v}_i(t)\cdot\mathbf{R}_{i,\mathrm{eff},\mathfrak{B}}^{(\eta)}(t)\,dt
+
\int_W\mathcal{B}_{E,\mathfrak{B}}^{(\eta)}(t)\,dt,
$$
$$
\Delta_W\left(\mathbf{P}_{\mathrm{mech},\mathfrak{B}}+\mathbf{P}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}\right)
=
\int_W\sum_i\mathbf{R}_{i,\mathrm{eff},\mathfrak{B}}^{(\eta)}(t)\,dt
+
\int_W\boldsymbol{\mathcal{B}}_{P,\mathfrak{B}}^{(\eta)}(t)\,dt,
$$
$$
\Delta_W\left(\mathbf{J}_{\mathrm{mech},\mathfrak{B}}+\mathbf{J}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}\right)
=
\int_W\sum_i\mathbf{x}_i(t)\times\mathbf{R}_{i,\mathrm{eff},\mathfrak{B}}^{(\eta)}(t)\,dt
+
\int_W\boldsymbol{\mathcal{B}}_{J,\mathfrak{B}}^{(\eta)}(t)\,dt.
$$
The theorem-level branch claim requires the three residual balances to converge to zero with $\epsilon_{\mathrm{var}}^{(\eta)}(W)\to0$, vanishing declared endpoint or period-cut leakage, stable branch floors, and the same retained row set in the force residuals and in the three wake-history charges. A work-integral reconstruction $U(t)$ or a projected torque increment is only a numerical diagnostic unless it is derived from this same action kernel, endpoint convention, and retained branch chart.

Self‑interaction ($i=j$) is included by adding $S_{ii}$ with the same kernel, but explicitly excluding the trivial coincidence $t'=t$ (no instantaneous self‑push at the moment of emission). Self‑hit corresponds to nontrivial roots $t_0<t$ where the worldline re‑intersects its own causal isochrons, which are captured naturally by the same double‑integral structure.

Thus:

- The scalar $1/r$ action above is a nonlocal variational scaffold for the delayed dynamics under the stated branch and regularization assumptions,
- It becomes an exact action derivation of the Master EOM only on branch charts where the constraint residual vanishes or is cancelled by an invariant action-level counterterm,
- A finite same-support local scalar or delta-jet counterterm has been ruled out because it cancels the derivative residual only by disturbing the inverse-square scale term,
- The remaining minimal action repair is the delayed-interior characteristic-tail kernel above; its receiver Euler derivative has the desired inverse-square identity, and its normalized wake-history boundary increments are now explicit,
- Without such closure, the pure scalar action is falsified as the universal exact action for the Master EOM and should be treated as a diagnostic scaffold,
- Any $\delta_\eta$ replacement must preserve the symmetries that supply the Noether charges if conservation claims are to remain exact.

---

##### Total Energy for an Isolated Set

Given the kinetic energy definition, we now address the most useful history-aware total energy for an isolated architrino set.

###### General structure

We define a functional $H_{\text{tot}}$ such that:

- $H_{\text{tot}}$ is constant in $t$ for isolated exact trajectories,
- $H_{\text{tot}}$ reduces to $K_{\mu}+U$ in regimes where an effective potential description is adequate.

For an isolated action-derived system,

$$
H_{\text{tot}}[\{\mathbf{x}_i(\cdot)\},\{\mathbf{v}_i(\cdot)\}; t]
\equiv
K_{\mu}(t) + U(t),
$$

with $U(t)$ reconstructed along the realized trajectory by:

$$
U(t) = U_\ast - \int_{t_\ast}^{t} \sum_i \mu_{\text{arch}}\,\mathbf{a}_i(t')\cdot \mathbf{v}_i(t')\,dt',
$$

where $U_\ast$ is a fixed reference and $\mathbf{a}_i$ is the actual acceleration given by the Master Equation (including self‑hit and partner contributions). Then:

$$
\frac{dH_{\text{tot}}}{dt} = \frac{dK_{\mu}}{dt} + \frac{dU}{dt}
= \sum_i \mu_{\text{arch}}\,\mathbf{a}_i\cdot\mathbf{v}_i
- \sum_i \mu_{\text{arch}}\,\mathbf{a}_i\cdot\mathbf{v}_i
= 0.
$$

In this sense, the total energy functional is:

- Not a local function only of $(\mathbf{x}_i(t),\mathbf{p}_i(t))$,
- But a **history‑aware conserved quantity** that accounts for all past wake emission and all energy exchange via causal intersections.

This matches the ontology:

- **Energy resides in the architrinos and their assemblies**, not in a separate field substance,
- It is only updated at the times $t$ when wake surfaces intersect receivers,
- Yet there exists a global invariant $H_{\text{tot}}$ for isolated trajectories, defined entirely from the particle worldlines and their induced accelerations.

###### Local canonical form in effective limits

In regimes where:

- Internal binaries are in tight, quasi‑stationary maximum‑curvature orbits (giving approximately fixed internal energies),
- Wake travel times across the system are short compared to dynamical timescales of the center‑of‑mass motion of assemblies,
- Self‑hit contributions primarily renormalize the internal energies (rest masses),

we can introduce **effective assemblies** with:

- Effective masses $M_A$,
- Positions $\mathbf{X}_A$,
- Momenta $\mathbf{P}_A = M_A \dot{\mathbf{X}}_A$,
- An approximate instantaneous interaction potential $U_\text{eff}(\{\mathbf{X}_A\})$,

and write a **local canonical Hamiltonian**:

$$
H_\text{eff}(\{\mathbf{X}_A\},\{\mathbf{P}_A\})
=
\sum_A \frac{\|\mathbf{P}_A\|^2}{2M_A} + U_\text{eff}(\{\mathbf{X}_A\}),
$$

which:

- Approximates the full history-aware energy functional when assemblies are well separated and slowly varying,
- Recovers familiar particle‑mechanics structure for many emergent phenomena (orbital motion, scattering, bound states) without ever attributing energy to a continuous field.

---

##### Summary

- **Kinetic energy** is defined in the usual way at the architrino level, with internal kinetic energy of tightly bound self‑hit binaries contributing to assembly rest masses.
- **Interaction energy** is not primitive as an instantaneous position function; it is encoded in the nonlocal causal charge $E_{\text{wake}}$ and may be reconstructed from the work-integral form $U$.
- A **nonlocal variational scaffold** is available under the regularity and boundary assumptions stated above: a multi-time Lagrangian whose kernel enforces the causal isochron geometry and targets the Master EOM with its Jacobian-weighted inverse-square law, becoming an exact action derivation only when the constraint residual vanishes or is explicitly cancelled.
- The **total energy** for an isolated trajectory is history-aware; in suitable limits it reduces to a canonical $H_\text{eff} = \sum \mathbf{P}^2/2M + U_\text{eff}$ for effective assemblies, with no separate “field energy” ontology.

All energy accounting remains localized to **architrinos and their assemblies** and is only updated at the instants when **causal wake surfaces intersect receivers** at $t = \text{now}$. The action-derived conserved charge is written as $K_{\mu}(t)+E_{\text{wake}}(t)$; a work-integral reconstruction $K_{\mu}(t)+U(t)$ is compatible only along realized trajectories after the same boundary convention and force law have been declared.

---

#### Symmetry, Conservation, and Lyapunov Functionals

##### Introduction

The Master Equation is a state-dependent delay system: acceleration at time $t$ depends on the path-history segment over $[t-h,t]$. In this setting, conservation laws are not functions of the instantaneous state $(\mathbf{x},\mathbf{v})$ alone. Instead, they are **functionals on path history** that track "in-flight" wake contributions.

This section makes the symmetry group explicit and states the corresponding conserved functionals for isolated systems with $\eta > 0$.

##### Fundamental Symmetry Group

**Definition (Fundamental symmetry group).** The substrate and interaction kernel are invariant under
$$
G_{\text{fund}} = E(3) \times \mathbb{R}_{\text{time}},
$$
where $E(3)=\mathbb{R}^3 \rtimes O(3)$ acts by spatial translations and rotations, and $\mathbb{R}_{\text{time}}$ acts by time translation.

**Theorem (Invariance of the Master Equation).** If $\mathbf{x}(t)$ is a solution, then:

1. **Time translation:** $\mathbf{y}(t)=\mathbf{x}(t+\tau)$ is a solution for any $\tau \in \mathbb{R}$.
2. **Spatial isometry:** $\mathbf{y}(t)=R\mathbf{x}(t)+\mathbf{b}$ is a solution for any $R\in O(3)$ and $\mathbf{b}\in\mathbb{R}^3$.

*Proof sketch.* The causal constraint depends only on Euclidean distances and time differences. Both are invariant under $G_{\text{fund}}$. The line-of-action vector $\hat{\mathbf{r}}_{ij}$ transforms covariantly under rotations, so the per-hit acceleration retains the same form.

This symmetry statement applies to the background, the interaction kernel, and the transformed full histories. It does not license arbitrary architrino flips or permutations after provenance has been assigned. Let $H_i^t$ denote the path-history/provenance record of architrino $i$ up to time $t$. A label permutation $P$ is an exact symmetry only on the restricted histories for which
$$
H_{P(i)}^t
=
P(H_i^t)
$$
for every $i$, with the same transformation also preserving all causal-root relations $\mathcal{C}_{ij}(t)$. For generic states this condition fails, so effective indistinguishability must be treated as coarse-grained observer bookkeeping rather than substrate identity.

##### Generalized Momentum and Angular Momentum

The delayed theory separates ordinary mechanical motion from the causal-wake history that is still in flight. For an action-derived delayed model with translation and rotation symmetry, the full Noether charges are history functionals: the particle-only quantities need not be conserved by themselves, but the particle-plus-wake totals are. In regularized or numerical variants, the same expressions should be treated as conserved diagnostics only when the chosen regularization preserves those symmetries.

**Definition (Mechanical momentum).**
$$
\mathbf{P}_{\text{mech}}(t) = \sum_i \mu_{\text{arch}} \mathbf{v}_i(t).
$$
Because the forces are delayed, $\dot{\mathbf{P}}_{\text{mech}}(t)$ is generally nonzero.

**Definition (Wake momentum functional).** For an isolated system, define
$$
\mathbf{P}_{\text{wake}}(t) = \mathbf{P}_{\text{wake}}(t_\ast) - \int_{t_\ast}^{t} \sum_i \mathbf{F}_i(s)\,ds,
$$
with $\mathbf{F}_i = \mu_{\text{arch}} \mathbf{a}_i$ from the Master Equation.

**Conservation law (total momentum).**
$$
\mathbf{P}_{\text{tot}}(t) \equiv \mathbf{P}_{\text{mech}}(t) + \mathbf{P}_{\text{wake}}(t)
$$
is constant in time for isolated solutions. It is the momentum decomposition associated with spatial-translation invariance of the nonlocal causal action.

**Definition (Mechanical angular momentum).**
$$
\mathbf{L}_{\text{mech}}(t) = \sum_i \mathbf{x}_i(t) \times \mu_{\text{arch}} \mathbf{v}_i(t).
$$

**Definition (Wake angular momentum functional).**
$$
\mathbf{L}_{\text{wake}}(t) = \mathbf{L}_{\text{wake}}(t_\ast) - \int_{t_\ast}^{t} \sum_i \mathbf{x}_i(s)\times \mathbf{F}_i(s)\,ds.
$$

**Conservation target (total angular momentum).**
$$
\mathbf{L}_{\text{tot}}(t) \equiv \mathbf{L}_{\text{mech}}(t) + \mathbf{L}_{\text{wake}}(t)
$$
is the angular-momentum decomposition associated with rotational invariance of the nonlocal causal action. For isolated solutions of the symmetry-preserving action model it is conserved. For working regularized models, conservation of $\mathbf{L}_{\text{tot}}$ is a validation condition rather than an automatic consequence.

**Remark.** These definitions mirror the energy decomposition used earlier: the apparent "missing" momentum and angular momentum are assigned to in-flight causal-wake geometry. The total quantities are therefore functionals of the path history, not functions of the instantaneous particle state alone.

##### Energy Functional and No-Runaway Criterion

Time-translation invariance implies a conserved history functional, which we write as
$$
E_{\text{tot}}(t) = K_{\mu}(t) + E_{\text{wake}}(t),
$$
where $K_{\mu}$ is the quadratic kinetic bookkeeping proxy and $E_{\text{wake}}$ denotes the exact nonlocal interaction charge. In direct trajectory evaluation, $U$ may be used as a compatible reconstruction up to a constant offset when it is derived from the same action-level force and boundary convention.

This statement is exact for the action-based delayed theory discussed in this section. For regularized working models, especially the dual-mollified local recapture model of [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md), it should be interpreted as exact only when the regularization preserves the same symmetry structure; otherwise it is the natural history-aware bookkeeping candidate rather than a proved invariant.

**Lemma (Bounded work rate under regularization).** If $\eta>0$ and the mollified kernel bounds the per-hit force, then there exists $F_{\max}(\eta)$ such that
$$
\bigg|\frac{dK_{\mu}}{dt}\bigg| \le \sum_i \|\mathbf{F}_i\|\,\|\mathbf{v}_i\|
\le N\,F_{\max}(\eta)\,v_{\max}(t).
$$

**Theorem target (No-runaway criterion).** For an isolated system with fixed $\eta>0$, if the action-derived interaction charge $E_{\text{wake}}(t)$, or a compatible realized-trajectory reconstruction $U(t)$, is bounded below on the admissible history class (for example, by enforcing a minimum separation within the regularized kernel support), then $K_{\mu}(t)$ is bounded for all times where the solution exists. In particular, a runaway $v_{\max}(t)\to\infty$ is only possible if the corresponding interaction term tends to $-\infty$, which requires a collapse toward the singular regime or a breakdown of the regularized assumptions.

*Interpretation.* Self-hit repulsion can transfer energy between $U$ and $K$, but it cannot generate unbounded kinetic energy without a corresponding unbounded decrease in $U$. This is the core conservation argument for excluding unphysical runaway acceleration in the regularized model.

##### Simulation Diagnostics (Symmetry and Conservation)

In addition to the convergence checks in Section 4.2, track these conserved functionals in any isolated run:

- **Total energy**: $H_{\text{tot}}(t) = K_{\mu}(t) + E_{\text{wake}}(t)$, or a declared compatible reconstruction $K_{\mu}+U$, should remain constant within the chosen numerical tolerance.
- **Total momentum**: $\mathbf{P}_{\text{tot}}(t)$ should be constant; monitor $\|\mathbf{P}_{\text{tot}}(t)-\mathbf{P}_{\text{tot}}(0)\|$.
- **Total angular momentum**: $\mathbf{L}_{\text{tot}}(t)$ should be constant; in planar runs, the unit axis $\hat{\mathbf{n}} = \mathbf{L}_{\text{tot}}/\|\mathbf{L}_{\text{tot}}\|$ should remain fixed.
- **Binary symmetry defect** (for symmetric initial data):
$$
\Delta_{\text{sym}}(t)=\|\mathbf{x}_1(t)+\mathbf{x}_2(t)\|.
$$
A secular drift indicates numerical asymmetry or a symmetry-breaking perturbation.

These diagnostics operationalize the symmetry constraints and provide early warning of numerical artifacts or model inconsistencies.

##### Closure Interface: Coarse-Graining Gate to Effective Quantum Envelope

For integration with the quantum closure program, the master equation provides the microscopic gate:
$$
\ddot{\mathbf{x}}_i(t)=\text{delayed causal-hit sum over }\mathcal{C}_{ij}(t).
$$

The required next reduction is a controlled map to mesoscopic density dynamics:
$$
f(t,\mathbf{x},\mathbf{v})
\Longrightarrow
(\rho,\mathbf{u},S)
\Longrightarrow
\psi=\sqrt{\rho}\,e^{iS/\hbar_{\mathrm{eff}}}.
$$

Closure condition for this interface:
- the same coarse-graining window that preserves validated dynamical invariants must recover the effective Schrödinger limit in the non-relativistic, weak-field, fixed-particle-number regime;
- residual non-Markovian terms must be explicitly retained as correction operators, not absorbed into uncontrolled fitting.

**Return-map symplectic residual for action-derived branch promotion.** When a replayable branch chart is promoted to an action-derived reduced Hamiltonian chart, the section return map must preserve the reduced symplectic structure. Let $z=(Q^a,\Pi_a)$ be local reduced coordinates after the retained root constraints and section condition have been solved, let
$$
\mathcal{P}_{\mathcal{S}}:z_n\mapsto z_{n+1},
\qquad
M_{\mathcal{S}}=D\mathcal{P}_{\mathcal{S}},
$$
and let $\Omega_{\mathcal{S}}$ be the pulled-back symplectic matrix on the reduced section. Define
$$
\mathcal{R}_{\Omega}
\equiv
\left\|
M_{\mathcal{S}}^{T}\Omega_{\mathcal{S}}M_{\mathcal{S}}
-
\Omega_{\mathcal{S}}
\right\|,
\qquad
\mathcal{R}_{\mathrm{vol}}
\equiv
\left|\det M_{\mathcal{S}}-1\right|.
$$
For an exact finite-dimensional Hamiltonian reduction, $\mathcal{R}_{\Omega}=0$ and therefore $\mathcal{R}_{\mathrm{vol}}=0$. For the delayed Master EOM these are not automatic consequences of a small orbit residual: they are closure diagnostics for the claim that the retained branch chart has captured the missing path-history degrees of freedom well enough to behave like a canonical return map. A nonzero $\mathcal{R}_{\Omega}$ means at least one of the following remains unresolved: omitted causal-root rows, window-boundary wake flux, an action-level residual, or a reduction that is not actually Hamiltonian. Thus a local master-equation closure claim still uses $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ as defined above, while the stronger Hamiltonian claim must additionally report $\mathcal{R}_{\Omega}\le\epsilon_{\Omega}$.

**Standard charged-particle comparison target.** In ordinary electromagnetic mechanics, a charged particle can be described by
$$
L_{\mathrm{EM}}
=
\frac{1}{2}m\|\dot{\mathbf r}\|^2
-e\phi(\mathbf r,t)
+e\,\dot{\mathbf r}\cdot\mathbf A(\mathbf r,t),
\qquad
\mathbf p_{\mathrm{can}}
=
m\dot{\mathbf r}+e\mathbf A.
$$
The velocity-coupled one-form shifts canonical momentum and yields the effective Lorentz-force law. Under
$$
\phi\mapsto\phi-\partial_t\chi,
\qquad
\mathbf A\mapsto\mathbf A+\nabla\chi,
$$
the Lagrangian changes only by $e\,d\chi/dt$, so the effective equations are unchanged. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is a comparison structure, not substrate ontology: the primitive kernel still contains only radial causal hits. The corresponding closure target is to extract an assembly-level effective one-form
$$
\mathcal{A}_{\mathrm{eff}}
=
A_a^{\mathrm{eff}}(Q,t)\,dQ^a-\phi_{\mathrm{eff}}(Q,t)\,dt
$$
from coarse-grained causal-root geometry, then show that the observer-level residual
$$
\mathcal{R}_{\mathrm{EM}}(W)
=
\int_W
\left\|
\mu_A\mathbf a_A(t)
-
e_A\left(
\mathbf E_{\mathrm{eff}}(\mathbf X_A,t)
+\mathbf V_A(t)\times\mathbf B_{\mathrm{eff}}(\mathbf X_A,t)
\right)
\right\|dt
$$
vanishes in the stated approximation while the underlying branch ledger remains a sum of line-of-action contributions. Failure of this residual is a magnetic-emergence failure, not evidence for inserting an intrinsic cross-product term into the Master EOM.

**Constrained branch-multiplier formulation.** On a fixed retained branch chart, the causal roots may be represented as constrained variables rather than solved away immediately. Let $s_{ij,\ell}(t)$ be the emission time assigned to retained row $\ell$ and define
$$
G_{ij,\ell}(t)
\equiv
r_{ij,\ell}(t)-c_f\big(t-s_{ij,\ell}(t)\big),
\qquad
r_{ij,\ell}(t)
=
\left\|
\mathbf{x}_i(t)-\mathbf{x}_j(s_{ij,\ell}(t))
\right\|.
$$
A branch-reduced constrained scaffold on a window $W$ has the form
$$
S_{\mathfrak{B}}^{(\eta)}
=
\int_W
\left[
\sum_i\frac{1}{2}\mu_{\text{arch}}\|\mathbf{v}_i(t)\|^2
-
\sum_{(i,j,\ell)\in\mathcal{R}^{\mathrm{act}}}
\alpha_{ij}
\frac{w_{ij,\ell}^{(\eta)}(t)}
{r_{ij,\ell}(t)\,|J_{ij,\ell}(t)|}
+
\sum_{(i,j,\ell)\in\mathcal{R}^{\mathrm{act}}}
\lambda_{ij,\ell}(t)G_{ij,\ell}(t)
\right]dt,
$$
where $\alpha_{ij}=\kappa\,\sigma_{ij}|q_iq_j|/c_f$, $w_{ij,\ell}^{(\eta)}$ carries the retained mollified branch weight and cutoff convention, and $\lambda_{ij,\ell}$ is a Lagrange multiplier for the causal-root constraint. Variation with respect to $\lambda_{ij,\ell}$ enforces $G_{ij,\ell}=0$. Variation with respect to the root variable gives the row equation
$$
0
=
\partial_{s_{ij,\ell}}
\left[
-
\alpha_{ij}
\frac{w_{ij,\ell}^{(\eta)}}{r_{ij,\ell}|J_{ij,\ell}|}
+
\lambda_{ij,\ell}G_{ij,\ell}
\right],
$$
provided the row has no explicit $\dot{s}_{ij,\ell}$ dependence after the chosen reduction. Variation with respect to the receiver position exposes the constraint contribution
$$
\delta_{\mathbf{x}_i}
\int_W\lambda_{ij,\ell}G_{ij,\ell}\,dt
=
\int_W
\lambda_{ij,\ell}(t)\,
\hat{\mathbf r}_{ij,\ell}(t)\cdot\delta\mathbf{x}_i(t)\,dt.
$$
Thus the multiplier term is not a new substrate force. It is the finite-dimensional record of the work required to keep the retained branch row on the causal-root surface while the surrounding path history is varied. The unconstrained branch action is recovered only when these multiplier contributions are either solved into the same invariant action-level counterterm used above, converted into legitimate boundary wake-history terms, or shown to vanish in the branch-summed residual:
$$
\mathcal{R}_{\lambda,i}(W)
\equiv
\int_W
\left\|
\sum_{\ell:\,o_\ell=i}
\lambda_\ell(t)\hat{\mathbf r}_\ell(t)
-
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\mathbf{C}_{ij}^{(\eta)}(t)
\right\|dt
\longrightarrow0.
$$
Here $o_\ell$ denotes the receiver index of branch row $\ell$. This is the delayed-action analogue of ordinary holonomic constraint handling: one may solve constraints into generalized coordinates, or retain them with multipliers, but the multiplier ledger must not be hidden inside a claimed exact force law.

**Noether history-functional balance target.** Let $S_{\mathfrak{B}}^{(\eta)}$ be a symmetry-preserving regularized action on a retained branch chart, and let a one-parameter transformation have infinitesimal generator $\boldsymbol{\xi}_i(t)$ on each worldline. If the action changes only by endpoint terms,
$$
\delta_{\xi}S_{\mathfrak{B}}^{(\eta)}
=
\left[
B_{\xi}^{(\eta)}(t)
\right]_{t_a}^{t_b}
$$
after the retained causal-root constraints, endpoint convention, and excluded self-coincidence convention are applied, then the corresponding history charge at a cut $t_\ast$ has the form
$$
Q_{\xi}^{(\eta)}(t_\ast)
=
\sum_i
\mu_{\text{arch}}\mathbf{v}_i(t_\ast)\cdot\boldsymbol{\xi}_i(t_\ast)
+
Q_{\xi,\mathrm{wake}}^{(\eta)}(t_\ast)
-
B_{\xi}^{(\eta)}(t_\ast).
$$
Its finite-window balance is
$$
\frac{dQ_{\xi}^{(\eta)}}{dt}
=
\sum_i
\boldsymbol{\xi}_i(t)\cdot
\mathbf{R}_i^{(\eta)}(t)
+
\mathcal{B}_{\xi}^{(\eta)}(t),
$$
where $\mathbf{R}_i^{(\eta)}$ is the Euler residual of the same action and $\mathcal{B}_{\xi}^{(\eta)}$ collects leakage through finite memory endpoints, period cuts, omitted branch rows, and non-characteristic tail endpoints. Exact conservation follows only when both terms vanish. Time translation, spatial translation, and rotation are the special cases that produce energy, momentum, and angular momentum above. This is the delayed version of the standard symmetry-to-conservation statement, with the crucial difference that the conserved object is a particle-plus-wake history functional rather than an equal-time particle function.

---

**End of Master Equation of Motion Document**

---

## Kinetic and Potential Energy

In $\mathbb{A}\mathbb{A}\mathbb{A}$, energy accounting begins with architrinos and the causal wakes they generate. Architrinos carry primitive kinetic energy through motion and supply potential-energy bookkeeping through delayed interactions; the wake itself is not a standalone substance or vacuum reservoir. A **wake** is the source-dependent causal-isochron record of an architrino's emissions: motion changes its geometry, branch timing, and received potential, not the fact that an emission record exists. The term `wake` is the architrino-native description of what appears as a field at the effective level.

This chapter underwrites [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), [Tri-Binary Dynamics](../../../../markdown/aaa/dynamics/tri-binary-dynamics.md), [Noether Core](../../../../markdown/aaa/spacetime/noether-swarm.md), [Spacetime Assemblies](../../../../markdown/aaa/spacetime/spacetime-assemblies.md), and [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

All such dynamics unfold on a fixed ontological background: absolute time plus the Euclidean void. Forces and motion arise from **delayed causal hits from causal isochrons**, with line-of-action direction and Jacobian-weighted magnitude, on this fixed background. We work in units with causal-wake propagation speed $c_f=1$.

The chapter keeps four levels separate. At the substrate level, kinetic and potential terms are architrino and causal-wake records on absolute time and the Euclidean void. At the dynamical level, energy changes through Jacobian-weighted causal hits and radial power. At the effective level, assemblies acquire inertia, apparent energy, and effective metric response through Noether-Sea coupling. At the inference level, scalar masses, thermodynamic records, and cosmological inventories are accepted only after a window, boundary record, and residual are declared.

Spacetime in this framework belongs to the effective level, not the ontological one. The ambient Noether Sea is a **dense sea of scalable high-energy tri-binary assemblies** occupying the Euclidean void. These tri-binaries are extremely small compared to ordinary Standard Model particles and constitute the medium through which all other assemblies move and interact. The energetic state and configuration of this tri-binary sea control how energy, inertia, and effective geometry appear at larger scales.

---

### Kinetic Energy and Momentum of a Single Architrino

An architrino in motion possesses kinetic energy and momentum.

- **Kinetic Energy $E_k$**

  A scalar quantity representing the energy of motion. For a single architrino $a$ with velocity $\mathbf{v}_a(t)$, we write

  $$E_{k,a}(t) = K\big(\|\mathbf{v}_a(t)\|\big),$$

  where $s$ denotes the speed argument and $K$ is a strictly convex, monotonically increasing function with $K(0)=0$. If an effective saturation proxy is being used, $K'(s)\to\infty$ at the saturation scale; in the primitive limit, $K$ grows unboundedly. $K$ is left unspecified because mass is emergent from interactions between assemblies, especially the Noether-Sea tri-binaries. Strict convexity ensures a one-to-one mapping between kinetic energy and speed magnitude. Because a free architrino has no intrinsic speed limit in the micro-model, $E_k$ is, in principle, unbounded as $\|\mathbf{v}_a\|\to\infty$.

- **Momentum $\mathbf{p}_a$**

  The vector counterpart of kinetic energy:

  $$\mathbf{p}_a(t) = P\big(\|\mathbf{v}_a(t)\|\big)\,\hat{\mathbf{v}}_a(t), \quad \hat{\mathbf{v}}_a = \frac{\mathbf{v}_a}{\|\mathbf{v}_a\|},$$

  where $P$ is a speed-dependent magnitude. Its detailed form is not postulated at the architrino level; it emerges from matching to assembly behavior.

  If this momentum is treated as the conjugate momentum for the primitive kinetic scalar and $\mathbf{F}=d\mathbf{p}/dt$ is used in the work-energy relation, then $P$ and $K$ are not independent. For arbitrary nonzero velocity and acceleration, consistency requires
  $$
  P'(s)=\frac{K'(s)}{s}=\mu_K(s),
  \qquad
  P(s)=\int_0^s\frac{K'(u)}{u}\,du
  $$
  after choosing $P(0)=0$. If this condition is not imposed, $\mathbf{p}$ should be read as a momentum-like bookkeeping vector rather than the canonical momentum of $K$.

**No fundamental mass:**

In this model, there is no **particle-specific substrate mass** assigned to individual architrinos. We do **not** assume $E_k = \frac{1}{2}m\|\mathbf{v}\|^2$ or $\mathbf{p} = m \mathbf{v}$ at the substrate level for distinct architrino species. Instead:

- Kinetic energy and momentum are **primitive kinematic quantities** of architrinos.
- The substrate law is written in **acceleration-first** form.
- If force-like or quadratic-kinetic bookkeeping is needed, one may introduce a single universal conversion constant $\mu_{\text{arch}}$, but this is not a particle-specific inertial mass.
- "Mass" in the usual observer sense appears **only at the assembly level** as a derived property of how a large internal energy distribution responds to external forcing in the tri-binary sea.

---

### Work–Energy Relation and Per-Hit Power

Kinetic-energy accounting is controlled by the acceleration-first master law, but the familiar quadratic work-energy form applies only after a kinetic proxy has been chosen. For a general primitive kinetic scalar with $s_a=\|\mathbf{v}_a\|$,

$$
\frac{dE_{k,a}}{dt}
=
K'(s_a)\frac{\mathbf{v}_a\cdot\mathbf{a}_a}{s_a}
=
\mu_K(s_a)\,\mathbf{a}_a\cdot\mathbf{v}_a,
\qquad
\mu_K(s)\equiv\frac{K'(s)}{s}.
$$

If one introduces the optional universal bookkeeping constant $\mu_{\text{arch}}$ and defines $\mathbf{F}_a \equiv \mu_{\text{arch}}\mathbf{a}_a$, then the quadratic bookkeeping proxy $K_{\mu,a}=\frac{1}{2}\mu_{\text{arch}}\|\mathbf{v}_a\|^2$ satisfies

$$
\frac{dK_{\mu,a}}{dt} = \mathbf{F}_a(t)\cdot\mathbf{v}_a(t).
$$

Here $\mathbf{F}_a$ is the optional force-like bookkeeping quantity associated with the net acceleration from all causal hits; it is not a particle-specific substrate mass law.

From the canonical per-hit law

$$
\mathbf{a}_{o'\leftarrow o}(t; t_0)
=
\kappa\,\sigma_{q_o q_{o'}}\,
\frac{|q_o q_{o'}|}{r^2\,|J_{o'\leftarrow o}(t;t_0)|}\,\hat{\mathbf{r}},
$$

where
$$
J_{o'\leftarrow o}(t;t_0)
\equiv
1-\frac{\mathbf{v}_o(t_0)\cdot\hat{\mathbf{r}}}{c_f}
$$
is the causal Jacobian encoding geometric bunching or dilation of the received wake flux.

Decompose the receiver's velocity into radial and transverse components:

$$\mathbf{v}_{o'} = v_r \hat{\mathbf{r}} + \mathbf{v}_\perp, \quad v_r=\mathbf{v}_{o'}\cdot\hat{\mathbf{r}}.$$

Because $\mathbf{a}_{o'\leftarrow o}\parallel\hat{\mathbf{r}}$:

- The **instantaneous work rate** from this hit is

  $$
  \frac{dK_\mu}{dt}\bigg|_{\text{hit}}
  =
  \mu_{\text{arch}}\mathbf{a}_{o'\leftarrow o}\cdot\mathbf{v}_{o'}
  =
  \mu_{\text{arch}}\frac{\kappa\,\sigma_{q_o q_{o'}}\,|q_o q_{o'}|}{r^2\,|J_{o'\leftarrow o}(t;t_0)|}\,v_r.
  $$

  Only $v_r$ contributes to instantaneous quadratic-proxy power. For the primitive scalar $K$, replace $\mu_{\text{arch}}$ by $\mu_K(\|\mathbf{v}_{o'}\|)$.

- A hit only changes the **along-the-line** component of velocity; sideways motion $\mathbf{v}_\perp$ is unchanged instantaneously.

---

### Potential Energy and Causal-Wake Potential

Potential energy arises from the interaction of an architrino with the **net causal-wake potential** generated by all architrinos, including in some regimes its own past emissions.

#### Net Causal-Wake Potential

At a point $\mathbf{s}$ and time $t$, the net potential is the **superposition** of contributions from all sources:

$$\Phi_{\text{net}}(\mathbf{s},t) = \sum_o \Phi_o(\mathbf{s},t).$$

Each $\Phi_o$ is built from the expanding causal isochrons emitted by source $o$, using the measure-valued or mollified emission density described in the architrino section. In the mollified representation with causal-surface width $\eta>0$, $\Phi_{\text{net}}$ is a smooth function of $(\mathbf{s},t)$; in the ideal limit $\eta\to 0$ it becomes a measure-valued distribution supported on causal isochrons.

#### Potential Availability Is Geometric

The phrase "an architrino emits potential" should not be read as a source continually spending an internal fuel. The emission is the causal-wake geometry of the architrino itself: at each emission time, an expanding causal isochron is added to the source's path history. That causal structure can later participate in work, but it is not a material energy substance stored inside the Euclidean void.

Potential energy is therefore relational. It is assigned when a receiver is placed in a source's path-history causal-wake record and its trajectory intersects the relevant causal wake surfaces. The receiver's energy accounting depends on the active causal roots, their inverse-square distance factors, their polarity signs, the branch Jacobians, and the receiver's radial motion through the line of action. In the general per-hit law the source-side branch factor is

$$
J_{o'\leftarrow o}(t;t_0)
=
1-\frac{\mathbf{v}_o(t_0)\cdot\hat{\mathbf{r}}}{c_f},
$$

while the instantaneous power delivered to the receiver is controlled by

$$
\mathbf{a}_{o'\leftarrow o}\cdot\mathbf{v}_{o'}
=
\lVert\mathbf{a}_{o'\leftarrow o}\rVert\,v_r.
$$

On the affine partner chart used in the [closed-form collinear breather ansatz](../../../../markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md), the same causal bunching appears in the simple branch factor $J_p=1+\dot{x}/c_f$. That formula is not a new global definition of energy; it is the one-dimensional branch expression for how emission cadence is received on that chart.

Thus the potential to do work is broadly available wherever causal wakes pass, but work is realized only through an actual receiver trajectory. A quiet region is not a region with no causal activity; it is a region where the active wake contributions sum to negligible net acceleration and negligible net power for the assemblies present there.

#### Potential Energy

For a receiver architrino $o'$ with polarity $q_{o'}$ at position $\mathbf{s}_{o'}(t)$, the potential energy $U_{o'}(t)$ is the fixed-history bookkeeping value assigned to the current configuration against the causal path-history wake record:

$$U_{o'}(t) = q_{o'}\,\Phi_{\text{net}}[\text{history}]\big(\mathbf{s}_{o'}(t),t\big).$$

Unlike electrostatics, $\Phi_{\text{net}}$ is not a function of instantaneous source positions but a functional of their past worldlines intercepted by the backward causal-wake record of $\mathbf{s}_{o'}(t)$. The gradient $\nabla\Phi_{\text{net}}$ is taken with respect to the receiver's spatial coordinates on the fixed background, holding the causal history fixed. In the idealized picture, $\Phi$ is a distribution supported on causal isochrons, not a smooth continuum field.

When we work with the mollified effective potential $\Phi_\eta$, we can also write the fixed-history, force-like relation:

$$\mathbf{F}_{o'}(t) = -\nabla_{\mathbf{s}_{o'}}U_{o'}(t) = -q_{o'} \nabla_{\mathbf{s}_{o'}} \Phi_\eta[\text{history}]\big(\mathbf{s}_{o'}(t),t\big),$$

and this is equivalent to the Master Equation in the quasi-static, resolved-in-time limit after the same force normalization, such as $\mathbf{F}_{o'}=\mu_{\text{arch}}\mathbf{a}_{o'}$ or the appropriate $\mu_K\mathbf{a}_{o'}$, has been declared.
The force-as-gradient identity is valid only when taking the gradient at fixed causal history; the fundamental force law remains the per-hit sum of the Master EOM.

#### Macroscopic Cancellation and Localized Resonance

Constant causal emission by many architrinos does not imply a large random macroscopic force. The net causal-wake potential is a superposition, and in a large, incoherent population the leading gradients arrive with many signs, distances, phases, and line-of-action directions. For a receiver sampling such a population, positive and negative gradient influences cancel statistically:

$$
\left\langle \nabla \Phi_{\text{net}}\right\rangle_{\text{incoherent}}
\approx
\mathbf{0}.
$$

This cancellation is one reason the Noether Sea can be densely active while remaining macroscopically quiet. What standard prose may call a vacuum state is not empty Euclidean void; it is the effective limit in which the local Noether-Sea assemblies and their causal wakes balance so well that only small residual gradients remain available to ordinary probes.

Phase-locked bound states are the important exception. In a localized assembly, nearby constituents do not sample random phases; their active causal roots are correlated, and the $1/r^2$ distance factor lets the nearest coherent branches dominate over the far incoherent background. A [collinear breather](../../../../markdown/aaa/proof-programs/collinear-breather.md), for example, is precisely a reduced setting in which two opposite-polarity architrinos can form a localized, non-canceling causal resonance. The breather ansatz isolates this effect: instead of averaging away, the partner-hit and self-hit branches stay phase organized enough to exchange kinetic and potential energy across a bounded cycle.

---

### Energy Conservation and Exchange

In the exact causal theory, energy conservation is enforced through exchange between kinetic motion and the causal-history interaction content encoded by wakes. This wake term should not be read as an independent material reservoir that drains from the emitter with every unreceived isochron; it is the nonlocal bookkeeping required by the same delayed causal action that generates the hits. For mollified working models, the strongest exact conservation claims remain conditional on the regularization being derived from the same time-translation-invariant causal action rather than inserted only at the equation-of-motion level.

For a single architrino:

$$\Delta E_k = \int \mathbf{F}\cdot d\mathbf{s} = -\Delta U$$

(when we restrict attention to its interactions with a fixed set of sources). For an **isolated system** of architrinos and their wakes, the total energy is:

$$E_{\text{total}} = \sum_a E_{k,a} + U_{\text{int}} + E_{\text{wake}},$$

and is constant in time for exact isolated solutions of the causal action. In mollified working models, this same bookkeeping should be treated as exact only when the mollified kernel inherits that action-level time-translation symmetry; otherwise it remains the natural candidate history functional to monitor, but not yet an established exact invariant.

- $U_{\text{int}}$ is an optional effective decomposition of near-field interaction energy.
- $E_{\text{wake}}$ accounts for the exact nonlocal interaction content carried by wake structures and any radiation-like transport through the tri-binary sea.

Consistency rule: either use $E_{\text{wake}}$ alone for all interaction energy, or, if a $U_{\text{int}}$ pairwise term is retained as an effective decomposition inside assemblies, then $E_{\text{wake}}$ must explicitly omit the corresponding near-field content to prevent double counting.

#### Wake Escapement

For a finite local window $W\subset\Sigma_t$, **wake escapement** is the subset of emitted causal isochrons that exit the retained window without intersecting any retained receiver inside that window. More explicitly, if architrino $a$ emits at $t_0$, define the causal isochron at later time $t$ by
$$
C_a(t;t_0)
=
\left\{
\mathbf{y}\in\Sigma_t:
\left\|\mathbf{y}-\mathbf{x}_a(t_0)\right\|
=
c_f(t-t_0)
\right\}.
$$
The emitted isochron belongs to the escapement set $\mathcal{E}_{\mathrm{esc}}(W)$ when it has a first retained boundary crossing
$$
C_a(t_{\partial W};t_0)\cap\partial W\ne\varnothing
$$
and there is no retained receiver hit before that crossing:
$$
\nexists\, b,t_r
\quad
\text{with}
\quad
t_0<t_r<t_{\partial W},
\quad
\mathbf{x}_b(t_r)\in W,
\quad
\mathbf{x}_b(t_r)\in C_a(t_r;t_0).
$$

Wake escapement is therefore a finite-window boundary classification, not a new substance in the Euclidean void. It names the portion of causal-wake history that cannot be balanced by local receiver work because no local receiver intercepted it. In a contracting binary, the persistent positive tangential drive identified in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#tangential-drive-and-wake-escapement) should be read against this boundary ledger: particle kinetic gain, local interaction-energy change, recoil, and escaped wake flux are parts of one balance law.

For a finite spatial window $W\subset\Sigma_t$, conservation is a balance law rather than a claim that the window is isolated. This is the conservation-law upgrade relative to instantaneous mechanics: energy, momentum, and angular momentum are not generally conserved equal-time particle snapshots, but finite-window history functionals whose apparent deficits must be carried by causal-wake fluxes or by an explicit residual. Write
$$
E_W(t)
=
\sum_{a:\mathbf{s}_a(t)\in W}K_a(t)
+
U_{\mathrm{int},W}(t)
+
E_{\mathrm{wake},W}(t),
$$
where the terms include only the kinetic, interaction, and wake-history content retained by the declared window record. The finite-window energy balance should take the residual form
$$
\frac{dE_W}{dt}
+
\int_{\partial W}\mathbf{J}_E\cdot\hat{\mathbf{n}}\,dA
=
P_{\mathrm{ext},W}
+
\mathcal{R}_E(\eta,\Delta t,W).
$$
Here $\mathbf{J}_E$ is the boundary flux of causal-wake energy bookkeeping, including any wake escapement through $\partial W$; $P_{\mathrm{ext},W}$ is declared external work through sources or controls not included in $W$; and $\mathcal{R}_E$ records mollifier, timestep, and omitted-boundary-history error. A finite-window conservation claim is mature only when $\mathcal{R}_E\to0$ under the same regularized causal action used for the local equation of motion.

The characteristic-tail repair target in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian) inherits this same rule. If the outgoing tail kernel $K_{\mathrm{ct},+}^{(\eta)}$ is used, its endpoint contribution may be counted as a Noether wake-history boundary flux only when the endpoint is characteristic, or when it is a declared fixed history boundary whose leakage residual vanishes:
$$
\mathcal{B}_{E,+}^{(\eta)}
\sim
\frac{D_{ij}R_{+}}{c_fR_{+}}\,
\delta_\eta'\!\left(u-\frac{R_{+}}{c_f}\right)
\longrightarrow 0
$$
on the retained branch chart. If $D_{ij}R_{+}\ne0$ and this residual does not vanish, the endpoint is an interior Euler source rather than a conservation-boundary term. In that case the characteristic-tail action changes the accepted branch force and cannot be used to close exact energy conservation for the current Master EOM.

The analogous momentum and angular-momentum closures must also remain tied to the same window and boundary data. The finite-window momentum functional $P_W^i$ contains the mechanical momentum retained in $W$ plus the retained wake-history momentum record:
$$
\frac{dP_W^i}{dt}
+
\int_{\partial W}\Pi^{ij}\hat{n}_j\,dA
=
F_{\mathrm{ext},W}^i
+
\mathcal{R}_P^i(\eta,\Delta t,W).
$$
For a declared origin $\mathbf{x}_0$, the corresponding angular-momentum history functional has the schematic form
$$
\mathbf{L}_W(t)
=
\sum_{a:\mathbf{s}_a(t)\in W}
\big(\mathbf{s}_a(t)-\mathbf{x}_0\big)\times\mathbf{p}_a(t)
+
\mathbf{L}_{\mathrm{wake},W}(t),
$$
where $\mathbf{p}_a$ is the declared mechanical momentum proxy for the chosen kinetic bookkeeping. Its finite-window balance target is
$$
\frac{dL_W^i}{dt}
+
\int_{\partial W}\Lambda^{ij}\hat{n}_j\,dA
=
\tau_{\mathrm{ext},W}^i
+
\mathcal{R}_L^i(\eta,\Delta t,W).
$$
Here $\Pi^{ij}$ and $\Lambda^{ij}$ are finite-window flux diagnostics for retained causal wakes and assembly crossings, not new substrate fields. $\tau_{\mathrm{ext},W}^i$ is the external torque about the same origin $\mathbf{x}_0$. If the energy, momentum, and angular-momentum residuals can be made small only by changing the window measure, boundary wake record, or regularization separately for each observable, the calculation has fitted separate summaries rather than demonstrated one causal-history conservation law.

Cosmological inventory comparisons add one more finite-window caution. A gravitational binding contribution is negative relative to dispersed matter in the declared window, but the sign is meaningful only after the boundary and coarse-graining are fixed. For a component inventory over $W$,
$$
E_{\mathrm{bind},W}^{\mathrm{grav}}
=
-\frac{1}{2}
\int_W\!\int_W
\frac{G_{\mathrm{eff}}(\theta;\mathbf{x},\mathbf{y})\,
\rho_{\mathrm{eff}}(\mathbf{x})\rho_{\mathrm{eff}}(\mathbf{y})}
{\|\mathbf{x}-\mathbf{y}\|}
\,dV_{\mathbf{x}}\,dV_{\mathbf{y}}
+
\mathcal{B}_{\partial W},
$$
where $\mathcal{B}_{\partial W}$ records boundary and embedding terms. The corresponding inventory residual is
$$
\mathcal{R}_{\mathrm{grav\,bind},W}
=
\frac{
\left|
E_{\mathrm{bind},W}^{\mathrm{grav}}
-
E_{\mathrm{bind},W}^{\mathrm{obs}}
\right|
}{\epsilon_{\mathrm{bind}}}
+
\frac{|\mathcal{B}_{\partial W}|}{\epsilon_{\partial W}}.
$$
This keeps gravitational binding from being used as an adjustable bookkeeping sign that can repair the cosmic energy inventory without specifying the same window, boundary wake history, and effective $G_{\mathrm{eff}}$ used by the rest of the cosmology branch.

**Theorem target (center of response).** The standard center-of-mass theorem depends on equal-time internal force cancellation. In delayed causal dynamics that cancellation is not available as a particle-only statement on $\Sigma_t$: the reciprocal hit generally belongs to a different emission time, a different causal-root branch, or a boundary wake record not retained by the finite window. For an assembly window $W_A(t)$, the replacement target is to prove that there is a response center $\mathbf{X}_{\mathrm{resp}}(t)$ and an assembly response tensor $M_A^{ij}$ such that the finite-window momentum balance reduces, over resolved windows, to
$$
\frac{d}{dt}\left(M_A^{ij}\dot{X}_{\mathrm{resp},j}\right)
=
F_{\mathrm{ext},W_A}^i
-
\int_{\partial W_A}\Pi^{ij}\hat{n}_j\,dA
+
\mathcal{R}_{\mathrm{resp}}^i(\eta,\Delta t,W_A).
$$
Only when the wake-history boundary flux and residual vanish does this reduce to the familiar center-of-mass form. Until that theorem is closed, a center-of-mass trajectory is an effective readout of the assembly response, not a substrate-level proof that internal delayed forces cancel instantaneously.

In practice, finite systems or simulation domains should monitor $E_W(t)$, $P_W^i(t)$, and $L_W^i(t)$ together with their boundary fluxes and residuals. $E_{\text{total}}(t)$ is the isolated-system limit when the declared window contains the full wake-history record and the boundary terms vanish.

---

### Entropy, Free Energy, and Coarse Residuals

Entropy and free-energy language belongs to coarse-grained records, not to empty Euclidean void. It is useful when a simulation or continuum reduction groups many microhistories into the same retained macrostate. For a declared coarse map $\mathcal Q:S(t)\mapsto z$ with cell probabilities $p_\alpha$ over the retained histories, the entropy diagnostic is
$$
S_{\mathcal Q}
=
-k_B\sum_{\alpha}p_\alpha\log p_\alpha.
$$
When a temperature-like channel $T_{\mathcal Q}$ is declared by the same record, the Helmholtz-style free-energy diagnostic is
$$
F_{\mathcal Q}
=
E_{\mathcal Q}
-
T_{\mathcal Q}S_{\mathcal Q}.
$$
This is not an added thermodynamic postulate. It is a test that the chosen coarse variables have retained enough state counting to make relaxation and response claims reproducible.

For an isolated finite window, the minimum coarse thermodynamic gate is the same-record entropy-production residual
$$
\mathcal R_{S,W}
=
\frac{
\left[
-
\Delta_W S_{\mathcal Q}
+
\int_W
\frac{
\mathcal D_{\mathcal Q}
}{
T_{\mathcal Q}+\varepsilon_T
}
dt
\right]_+
}{
|\Delta_W S_{\mathcal Q}|
+
\int_W
\left|
\frac{\mathcal D_{\mathcal Q}}{T_{\mathcal Q}+\varepsilon_T}
\right|dt
+\varepsilon
},
$$
where $[x]_+=\max(x,0)$ and $\mathcal D_{\mathcal Q}$ is the declared coherent-to-incoherent transfer rate, including viscous, thermal, wake-boundary, or Noether-Sea response channels retained by the packet. Passing this gate means only that the selected coarse record has not made entropy decrease after unresolved boundary leakage is accounted for. It does not prove a fundamental stochastic substrate.

In near-equilibrium comparison runs, response and fluctuation must also come from one record. If an observable $O_A$ has response kernel $\chi_{AB}(\omega)$ to a controlled source coupled to $O_B$, the causal-response check is that the dissipative part and the equilibrium fluctuation spectrum $S_{AB}(\omega)$ obey a declared classical or quantum fluctuation-dissipation row. A dimensionless packet residual can be written as
$$
\mathcal R_{\mathrm{FD}}(A,B)
=
\frac{
\left\|
S_{AB}^{\mathrm{meas}}(\omega)
-
\mathcal F_T\!\left(\chi_{AB}''(\omega)\right)
\right\|_{\omega}
}{
\left\|S_{AB}^{\mathrm{meas}}(\omega)\right\|_{\omega}
+
\left\|\mathcal F_T\!\left(\chi_{AB}''(\omega)\right)\right\|_{\omega}
+\varepsilon
}.
$$
Here $\mathcal F_T$ is the packet's chosen fluctuation-dissipation map, and $\chi_{AB}''$ is the imaginary, dissipative response. A passing value supports the coarse response chart; a failing value means the noise, dissipation, and energy ledger have been fitted separately.

---

### Noether Sea, Effective Spacetime, and Energy Storage

At the fundamental level, the Euclidean void is an empty container. **Effective spacetime** is the observer-level summary of a **sea of high-energy tri-binary assemblies**:

- These tri-binaries are extremely small compared to ordinary particles (electrons, protons, etc.).
- Each tri-binary is itself a tightly bound architrino assembly with very high internal kinetic and potential energy.
- As a sea, they form a **dense population of coupled assemblies** occupying the Euclidean void. This ambient Noether-Sea content carries non-zero assembly density and internal stress. It provides the constitutive relations (permittivity, permeability, and medium-dressed inertial response) that deform the primitive architrino dynamics into effective relativistic kinematics, providing the bridge-level spacetime medium for:
  - Emergent inertia and mass,
  - Effective causal-cone behavior and Lorentz-like behavior,
  - Effective gravitational coupling (emergent geometry at large scales).

Energy in this picture is distributed across:

1. **Unbound Architrinos** (rare at low energies),
2. **Standard Model assemblies** (electrons, nucleons, etc.),
3. The **tri-binary sea** that constitutes the Noether Sea and, in bridge prose, the spacetime medium.

---

### Assemblies: Internal vs Apparent Energy

For composite systems such as Standard Model particles, nuclei, and composite bound states formed from architrinos and embedded in the tri-binary sea, we distinguish:

- **Total internal energy**: energy retained by the assembly and by its immediate tri-binary environment,
- **Apparent energy**: what leaks out as a long-range wake signature and governs how the assembly interacts with the outside world.

#### Internal Energy of an Assembly

For an assembly $A$ (e.g., tri-binary or higher structure), let $i\in A$ run over its constituent architrinos. Then:

$$E_{\text{internal}}(A) = \sum_{i\in A} E_{k,i} + \frac{1}{2} \sum_{\substack{i,j\in A \\ i\neq j}} U_{ij} + E_{\text{coupling to sea}}(A),$$

where:

- $E_{k,i}$ is the kinetic energy of architrino $i$,
- $U_{ij}$ is mutual potential energy of pair $(i,j)$,
- $E_{\text{coupling to sea}}$ accounts for how the assembly deforms and polarizes the surrounding tri-binary sea, that is, the local Noether-Sea environment (or in bridge prose, the local spacetime medium).

This internal energy can be **very large**: accepted high-energy branches may retain Planck-scale or higher internal energy, even when the assembly appears externally as a low-mass effective particle.

#### Apparent Energy and Shielding

The surrounding tri-binary sea, and the arrangement of positive- and negative-polarity architrinos inside an assembly, can **shield** internal energy from the external world through:

- **Polarity cancellation**: positive- and negative-polarity architrinos within the assembly (and in surrounding tri-binaries) emit wakes that interfere destructively at larger distances.
- **Phase-structured far-field cancellation**: the geometry of internal orbits and tri-binary polarization patterns generates cancellation of most multipoles at scales $r \gg$ assembly size.
- **Nested shielding**: in multi-binary fermion cores, outer binaries partially screen the deeper binaries from the surrounding sea. Generation shifts can therefore be read as loss of shielding tiers, not only as loss of constituent count.

At the reference-attractor level, define the **shielding (leakage) factor** as the leading isotropic projection of a larger far-field wake ledger:

$$
\zeta(A_0)
\equiv
\frac{\|\Pi_0\mathcal{L}_{\text{wake}}(A_0)\|}
{\|\mathcal{L}_{\text{naive}}(A_0)\|},
\qquad
\mathcal{L}_{\text{aniso}}(A_0)
\equiv
\mathcal{L}_{\text{wake}}(A_0)-\Pi_0\mathcal{L}_{\text{wake}}(A_0),
$$

evaluated in a regime where the assembly appears as an effective point source. Here $\Pi_0$ extracts the monopole/isotropic component of the far-field wake ledger and $\mathcal{L}_{\text{aniso}}$ retains anisotropic leakage instead of hiding it inside a scalar error term. For a strongly shielded, neutral tri-binary in the tri-binary sea, we expect $\zeta\ll 1$.
Operationally, extract $\zeta(A)$ from a far-field fit of $\Phi_{\text{net}}$ (or hit amplitude) at $r \gg \text{size}(A)$: $\zeta \equiv A_{\text{measured}}/A_{\text{naive}}$, the ratio of the leading $1/r^2$ (or multipole) coefficient to the naive constituent sum, with anisotropic residuals reported separately.
The scalar shielding summary is admissible only when anisotropic leakage is small enough for the comparison being made, for example
$$
\frac{\|\mathcal{L}_{\text{aniso}}(A_0)\|}
{\|\mathcal{L}_{\text{naive}}(A_0)\|}
\le
\epsilon_{\text{aniso}},
$$
with $\epsilon_{\text{aniso}}$ declared before the branch is promoted to a scalar mass-facing result.

The scalar apparent-energy proxy that influences other assemblies at large distances is then:

$$E_{\text{apparent}}(A) \sim \zeta(A)\,E_{\text{internal}}(A),$$

This is a roadmap relation, not a substrate identity; proportionality constants must be fixed by matching to effective low-energy theory (e.g. mapping to $mc^2$).

---

### Emergent Inertia (Mass) from Shielded Energy

**Inertia** is not fundamental; it is the externally exposed response of an assembly's trapped internal causal history, shielding factor, and Noether-Sea coupling to changes in bulk motion.

#### Operational Definition of Inertial Mass

For an assembly $A$, define its inertial mass $m_{\text{inertial}}(A)$ operationally via:

- Apply a small external wake potential (from a distant test source) that exerts a known net force $\mathbf{F}_{\text{ext}}$ on $A$,
- Measure the resulting acceleration of the response center; in regimes where the effective center-of-mass readout has been justified, denote this acceleration by $\mathbf{a}_{\text{cm}}$,
- Define:

$$m_{\text{inertial}}(A) \equiv \frac{\|\mathbf{F}_{\text{ext}}\|}{\|\mathbf{a}_{\text{cm}}\|}.$$

Because the external wake couples mainly to the **apparent energy**, not the full internal circulation, the scalar roadmap limit is:

$$m_{\text{inertial}}(A) \approx \alpha_{\mathrm{m}}\,\frac{\zeta(A)\,E_{\text{internal}}(A)}{c_{\text{eff}}^2}.$$

The tensor handoff is more precise. For a small center-of-mass velocity $V_{\text{cm},b}$ through a declared Noether-Sea response record,
$$
p_{\text{int}}^{a}
\approx
\alpha_{\mathrm{m}}\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}\,
V_{\text{cm},b},
$$
with homogeneous isotropic limit
$$
\mathcal{M}_{\text{sea}}^{ab}\to \frac{h^{ab}}{c_{\text{eff}}^2}.
$$
A more complete first-order handoff keeps the scalar and trace-free exposure pieces visible. Write

$$
\mathcal{Z}_{A}^{ab}
=
\zeta(A)h^{ab}
+
\mathcal{Z}_{\mathrm{tf}}^{ab}(A),
\qquad
h_{ab}\mathcal{Z}_{\mathrm{tf}}^{ab}(A)=0,
$$

and split the local medium response as

$$
\mathcal{M}_{\text{sea}}^{ab}
=
\frac{1}{c_{\text{eff},0}^{2}}
\left[
(1+\delta\mathcal{M}_{0})h^{ab}
+
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right].
$$

Then the exposed inertial-response tensor is

$$
\mathsf{I}_{A}^{ab}
=
\frac{\alpha_{\mathrm{m}}E_{\text{internal}}(A)}{2}
\left(
\mathcal{Z}_{A}^{a}{}_{c}\mathcal{M}_{\text{sea}}^{cb}
+
\mathcal{Z}_{A}^{b}{}_{c}\mathcal{M}_{\text{sea}}^{ca}
\right),
\qquad
p_{\text{int}}^{a}
\approx
\mathsf{I}_{A}^{ab}V_{\text{cm},b}.
$$

Its rotational scalar trace is

$$
m_{\mathrm{tr}}(A)
\equiv
\frac{1}{3}h_{ab}\mathsf{I}_{A}^{ab}
=
\alpha_{\mathrm{m}}
\frac{E_{\text{internal}}(A)}{c_{\text{eff},0}^{2}}
\left[
\zeta(A)(1+\delta\mathcal{M}_{0})
+
\frac{1}{3}\mathcal{Z}_{\mathrm{tf},ab}(A)\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right].
$$

Only in the homogeneous isotropic limit does the scalar mass formula above follow. The trace formula gives a stricter diagnostic: pure exposure anisotropy does not shift scalar mass in an isotropic medium, and pure trace-free medium response does not shift scalar mass for scalar exposure. A scalar mass shift from anisotropy appears only through the contraction $\mathcal{Z}_{\mathrm{tf},ab}\delta\mathcal{M}_{\mathrm{tf}}^{ab}$; otherwise the residue remains directional inertia in $\mathsf{I}_{A}^{ab}$. Here $E_{\text{internal}}$ names the large internal energy circulation, while $\zeta(A)$ names the small external leakage that survives cancellation and Noether-Sea shielding. The formula therefore explains weak long-range gravitational and inertial footprints without making the internal energy small: ordinary probes couple to the leaked pattern, not to every internal exchange branch.

At the matter-to-medium interface, a Standard Model fermion assembly should therefore be treated as a localized source of exposed response, not as an unshielded transfer of all internal energy into the surrounding Noether Sea. For a coarse cell $\Omega_\ell$, the source supplied by stable matter assemblies can be written schematically as

$$
S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)}(\mathbf{x},t)
=
\sum_{A\subset\Omega_\ell}
W_\ell(\mathbf{x}-\mathbf{X}_A(t))\,
\zeta(A)E_{\text{internal}}(A)
+
S_{\mathrm{aniso}}^{(\ell)}(\mathbf{x},t),
$$

where $W_\ell$ is the coarse-graining window, $\mathbf{X}_A$ is the assembly center, and $S_{\mathrm{aniso}}^{(\ell)}$ records exposed tensor, orientation, spin, or wake-history residue that cannot be collapsed into the scalar shielding factor. This source then perturbs the local Noether-Sea state through a constitutive response map,

$$
\delta\theta_{\mathrm{sea}}^{(\ell)}
=
\mathcal{C}_{\mathrm{mat}\to\mathrm{sea}}
\left(
S_{\mathrm{mat}\to\mathrm{sea}}^{(\ell)},
\lambda_A,\xi_A,\mathcal{H}_A,
\theta_{\mathrm{sea},0}^{(\ell)}
\right),
$$

with $\delta\theta_{\mathrm{sea}}^{(\ell)}$ projecting into $n$, $\chi_{\text{sea}}$, $\Gamma_N$, strain, orientation, cadence, and envelope-scale variables. In this language, saying that neighboring Noether cores absorb the exposed potential means that they retune their branch state. Depending on the accepted branch, that retuning may appear as higher cadence, changed strain, stronger alignment, envelope-scale shift, or altered coupling to nearby cores; it should not be compressed into a generic statement that the cores simply gain energy and expand.

This is the same shielding-based logic developed more directly in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md). The matching factor $\alpha_{\mathrm{m}}$ should be fixed only after a calibration-free reference attractor has supplied $E_{\text{internal}}$, $\zeta$, and the medium-response map; it should not be fitted separately to each particle species.

Thermodynamic or entropic derivations of gravitational force are therefore comparison benchmarks for this chapter, not replacements for the mass mechanism. They may sharpen the observer-level equation-of-state target for gravity, but $m_{\text{inertial}}(A)$ is not closed until the same assembly ledger supplies its trapped internal causal history, shielding extraction, Noether-Sea response tensor, and acceleration response.

The immediate hand-off is the $A_0$ reference attractor gate. The energy chapter owns the internal-energy and apparent-energy definitions that $A_0$ must report: layer energies, interaction and wake terms, total $E_{\text{internal}}(A_0)$, far-field wake coefficients, and the exposed-energy combination $\zeta(A_0)E_{\text{internal}}(A_0)$. Those outputs are still closure targets until a stable branch, shielding extraction, and response tensor are computed. Compact finite-coordinate no-go records and branch-chart checker results cannot be consumed as energy-accounting inputs: a rejection blocks the chart path, and a clearance authorizes only a rerun candidate until Tier 2 shielding exists on an accepted branch.

The multi-scale status of $A_0$ matters for this accounting. Fast internal corrections should not be removed until they are classified. Nonresonant inner-layer motion may average out of the leading apparent-energy fit, but corrections that change self-hit counts, the branch Jacobian near $c_f$, or the leakage tensor can change $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, or both. Apparent energy is therefore downstream of closure and stability, not an input used to force a convenient branch.

---

#### Noether Sea and Effective Relativistic Behavior

The tri-binary Noether Sea adds an additional layer:

- Moving assemblies must retune their internal causal ledger and reorganize local Noether-Sea coupling.
- The effective resistance to high center-of-mass speed (near the internal tri-binary causal-wake propagation scale) increases steeply, producing an emergent "speed of light" scale $c_{\text{eff}}$ at which assemblies effectively saturate.

Thus:

- At low center-of-mass speeds $v_{\text{CM}}\ll c_{\text{eff}}$, the effective readout recovers $E_k \approx \frac{1}{2}m_{\text{inertial}} v_{\text{CM}}^2$ for assemblies.
- At high center-of-mass speeds approaching $c_{\text{eff}}$, internal coupling to the tri-binary sea and self-hit effects yield a relativistic-like $E_k \sim m_{\text{inertial}}c_{\text{eff}}^2(\gamma_{\text{eff}}-1)$, with $\gamma_{\text{eff}} = 1/\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}$, as an **effective law**.
- Near $c_{\text{eff}}$, axial architrino stripping and oblation are failure channels or branch-transition hypotheses to test, not assumed parts of the mass mechanism.

The details of this emergent relativistic law arise from the combined dynamics of the assembly and the tri-binary sea; they are not postulated but must be confirmed by coefficient extraction, simulation, and matching to known particle kinematics. Ordinary dissipative drag is a failure channel for this program, not the mass mechanism. The mass-side integration and quantitative derivation path are tracked in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md).

---

### Effective Energy-Momentum Closure

For assembly center-of-mass motion in the Lorentz-suppressed regime, impose the relativistic mass-shell relation as an **effective closure test** (not a substrate postulate):

$$
E_{\text{CM}}^2 = p_{\text{CM}}^2 c_{\text{eff}}^2 + M_0^2 c_{\text{eff}}^4.
$$

Here:
- $M_0$ is the assembly rest/internal invariant extracted at $v_{\text{CM}}=0$ in a locally homogeneous sea.
- $E_{\text{CM}}$ and $p_{\text{CM}}$ are the total center-of-mass energy and momentum measured from trajectory dynamics.
- $c_{\text{eff}}$ is the emergent signal speed of the local Noether-Sea response record; in weak-field isotropic conditions, $c_{\text{eff}}\to c_f$.

Equivalent parameterization:
$$
E_{\text{CM}}=\gamma_{\text{eff}} M_0 c_{\text{eff}}^2,\qquad
p_{\text{CM}}=\gamma_{\text{eff}} M_0 v_{\text{CM}},\qquad
\gamma_{\text{eff}}=\frac{1}{\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}}.
$$

Consistency requirement: if this closure fails in regimes where emergent Lorentz behavior is claimed, the current mass-loading and medium-response model is incomplete.

Cross-links:
- [Proper-time closure test](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#effective-energy-momentum-closure-test)
- [SR mapping entry](../../../../markdown/aaa/philosophy-history/theory-mapping.md#special-relativity-sr)

---

### Energy and Self-Hit in the Tri-Binary Sea

In the **super-field-speed** regime ($\|\mathbf{v}_a\|>1$ somewhere along the relevant path-history interval), architrinos and assemblies can intersect their own past isochrons (self-hit). In the presence of the tri-binary sea:

- Self-hit repulsion acts as an internal **stiffening mechanism** for tri-binaries and more complex assemblies, contributing to their stability.
- Energy represented in an architrino's causal wake and local Noether-Sea response can be partially routed back through delayed self-interaction. At the bookkeeping level, this is an exchange between internal kinetic energy and wake/medium energy associated with the local tri-binary configuration.

At the exact causal-action level, global energy is conserved: self-hit just routes energy along more complex paths (architrino → causal isochron → local Noether Sea → back to architrino/assembly). In dual-mollified local theorem models, the same statement should be read conditionally unless the mollified kernel is explicitly tied to an action-level regularization.

---

### Intuition (Plain Language)

Inside an assembly, large internal causal-history energy can circulate through many branch channels. Outside the assembly, distant probes couple only to the portion of that ledger that survives phase cancellation, shielding, and Noether-Sea response.

Architrinos and their assemblies are where the energy bookkeeping lives. The Noether Sea is a dense population of high-energy tri-binary assemblies whose net long-range wake response is usually quiet because incoherent contributions cancel and shielded internal layers leak only weakly. In nested fermion cores, outer binaries screen deeper layers from the ambient medium. The small residual exposure is what observer-level mass and gravitational response measure.

### Summary and Role in the Larger Theory

- **At the architrino level:**

  Kinetic energy and potential energy are defined via the Master EOM. Exact global conservation belongs to the exact causal-action theory; in mollified working models it is the target bookkeeping structure and is exact only when the regularization preserves the underlying time-translation symmetry. The substrate law is acceleration-first; no particle-specific fundamental mass is assigned to architrinos, and speeds are unbounded in principle.
  Potential availability is geometric rather than fuel-like: causal wakes are emitted as path-history structure, while work appears only when a receiver intersects active wake branches with nonzero radial power.

- **At the assembly level:**

  Large internal energies, plus coupling to the tri-binary sea, generate:
  - Effective inertia (mass),
  - Shielded external wake signatures (tiny apparent energy compared to internal),
  - Generation dependence through how many outer screening layers still surround the deepest core,
  - An emergent speed scale $c_{\text{eff}}$ and relativistic-like behavior.
  Macroscopic quietness follows from superposition and shielding: incoherent populations cancel statistically, while phase-locked assemblies such as collinear breathers preserve localized, non-canceling wake structure.

- **For spacetime and gravity:**

  The sea of small, high-energy tri-binaries forms the Noether Sea and, at coarse-grained level, the effective spacetime medium whose energy density and stress give rise to an emergent metric. The shielding factors and internal energies of both Noether-Sea tri-binaries and "matter" assemblies contribute to:
  - The effective Newton constant $G$,
  - The cosmological Noether-Sea energy density,
  - How strongly observer-level effective metric response is reconstructed from different kinds of energy.

  Density-driven oblation is a candidate contribution to the effective gravitational-coupling closure: as the tri-binary sea encounters denser matter, local tri-binaries may scale down and oblate, creating a compliance gradient that must be mapped through the Noether-Sea response tensor before it can be read as part of $G$.

---

### Appendix A: Energy Zero and Bookkeeping

$\mathbb{A}\mathbb{A}\mathbb{A}$ uses a **binding-energy convention** that fixes the zero of potential energy at the **inner turning point** of an accepted bound branch (the self-hit / max-curvature radius when that branch has been certified). This choice is operational: on a branch with a self-hit lower boundary, the deepest accessible state supplies the reference. It should not be read as a proof that every isolated two-body candidate already has a unique, history-independent cutoff.

Cosmology inventory prose uses the same convention only after declaring the comparison window. Positive component entries such as matter, radiation, dark-sector bookkeeping, and thermal reservoirs are mass-equivalent or energy-density terms measured relative to that window, while gravitational binding is a negative finite-window contribution. Mixing a local branch convention with a cosmological inventory convention without naming the window and boundary term risks double counting the same retained wake-history energy.

#### Physical Setup and Why a New Zero is Needed

For an accepted attractive bound branch (opposite polarities), the inward motion accelerates until it reaches a **minimum radius** $r_{\min}$ where self-hit dynamics and curvature limits prevent further collapse. The motion then rebounds or orbits. Unlike a pure Coulomb potential, this branch has a lower bound on radius (and hence on accessible energy states).

Because a lower bound exists, the natural reference is **not** "infinite separation" but the **ground configuration** at $r_{\min}$.

#### The Bookkeeping Convention

We adopt a **singular-boundary gauge**: since the self-hit dynamics impose a geometric lower bound $r_{\min}$ (the maximum curvature attractor), we fix the potential gauge at this wall.

$$U(r_{\min}) \equiv 0.$$

In this gauge, $U(r)$ represents the **accumulated work** performed to separate the binary from its ground state to radius $r$. Total energy is thus partitioned into *kinetic* (motion) and *deformation* (separation) components, with fully separated (unbound) pairs carrying maximal deformation energy $U_{\max} \equiv B_{\max}$.

#### Binding Energy and Total Energy

Let $B(r)$ denote the **binding energy** at radius $r$, with

$$B(r_{\min}) = B_{\max}.$$

Define

$$U(r) = B_{\max} - B(r).$$

Then total energy bookkeeping is:

$$E_{\text{total}} = K(r) + U(r), \qquad U(r) \ge 0.$$

At the minimum radius:

$$E_{\text{total}} = K_{\max}, \quad U(r_{\min}) = 0.$$

All available mechanical energy is kinetic at the inner turning point. Moving outward converts kinetic energy into potential energy (the rebound / climb-out phase).

#### Effective Potential Language

If an effective potential is used, the centrifugal term and the self-hit barrier both contribute:

$$V_{\text{eff}}(r) = V(r) + \frac{L^2}{2 m_{\text{eff}} r^2} + V_{\text{self-hit}}(r).$$

Here $m_{\text{eff}}$ is an **effective inertial scale** (a bookkeeping proxy for mass in the coarse-grained description), not a primitive architrino mass.

The convention above fixes:

$$V_{\text{eff}}(r_{\min}) = 0.$$

This does **not** change dynamics; it sets a physically meaningful reference.

#### Self-Hit Echo and Discrete Steps (Working Note)

In the current picture, the self-hit region is **not** assumed to change the local force law. The radial slope remains smooth:

$$\frac{dU}{dr} \text{ remains finite and continuous across the retained regularized branch chart.}$$

So the transition between the $v=c_f$ regime and the self-hit regime is a **regularized branch transition**, not a kink in the potential. The distinction shows up in **how action and energy bookkeeping are routed** between binaries, not in a new macroscopic slope.

The discrete step is a causal-root ledger effect, not an assumption that energy itself is made of independent chunks. On a fixed branch chart, the active causal intersections have an integer multiplicity: a self-hit count $N$ and an analogous partner-hit or channel count $M$ in the root-ledger language developed in the [closed-form collinear breather ansatz](../../../../markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md). In the circular binary notation this same idea appears as the pair $(N_s,M_p)$ in [Super-Field-Speed Root Ledgers and Resonance Lock](../../../../markdown/aaa/dynamics/binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock). Within one ledger cell the underlying trajectory and $U(r)$ remain continuous. A visible $h$-like transaction occurs when a separator crossing changes the admissible integer ledger, for example by adding one grouped channel or, in the raw simple-root table, by a fold-pair jump satisfying $\Delta N\in 2\mathbb{Z}$ with $\Delta D=0$.

The mechanical event behind such a ledger change can be a caustic-grazing impulse. When a regularized branch crosses a $J=0$ caustic, the pointwise branch expression may become large while the integrated velocity change remains finite, as in [Caustic Transit and Finite Impulse](../../../../markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse):
$$
\Delta\mathbf{v}_{a,n}
=
\int_{t_n^-}^{t_n^+}
\mathbf{a}_a^{(\eta)}(t)\,dt.
$$
This finite impulse is a candidate substrate mechanism for changing the active causal-root ledger by a discrete amount without making primitive energy granular.

Thus the candidate quantum of action is geometric bookkeeping: it is the action scale assigned to a threshold crossing of the causal-root ledger. The energy shift appears in steps because the allowed causal intersections have changed discretely, even though the path-history geometry and the local potential slope remain continuous through the regularized fold layer. A closed branch chart must still expose the root-change energy, wake exchange, middle-channel adjustment, and any mismatch routed into unresolved modes.

Working bookkeeping hypothesis:

- Outer binary registers a single-step transaction ($h$-like unit), meaning one minimal admissible update of its active partner and self channel ledger.
- Middle binary adjusts to conserve total energy.
- Inner binary executes a two-step shift ($2h$-like unit), i.e., two discrete ledger updates rather than one. The "step" corresponds to the system crossing a separatrix between basins of attraction in the nonlinear delay dynamics. While the underlying trajectory is continuous, the energy redistribution stabilizes only at discrete resonances (winding numbers and causal-root multiplicities), making the effective energy transfer appear quantized.

This can read as an "amplified" response, but only because the inner binary is **releasing or reconfiguring retained internal energy** when the self-hit echo is engaged. It is **not** net energy creation; it is a redistribution between internal stores under a smooth $U(r)$.

#### Tri-Binary as Routing/Locking Circuit (Analogy)

It is useful (as a **bookkeeping analogy**) to think of the tri-binary as a **routing/locking circuit** rather than a simple reservoir. An incoming single-step transaction ($h$-like) couples most strongly to the **outer binary**, the **middle binary** acts as a buffer/fulcrum that maintains overall consistency, and the **inner binary** can respond with a two-step reconfiguration when the self-hit echo is engaged. The effective response can resemble a geared or ratcheted redistribution, but the mechanism is still deterministic energy routing, not creation.

In this language, a discrete input can **lock in** a new tri-binary configuration: a threshold-triggered, history-dependent update that selects one stable branch over another. This is a **collapse-like** event in the phenomenological sense (a sudden, discrete state update), but in $\mathbb{A}\mathbb{A}\mathbb{A}$ it is treated as a **deterministic, microstate-sensitive bifurcation**, not an intrinsically stochastic collapse.

#### Bookkeeping Table: One $h$ of Closed-Cycle Action (Outer $v < c_f$)

For the $h$ versus $\hbar$ convention used here, see [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md).

Assumptions for this bookkeeping pass:

- $f$ labels a discrete outer-binary orbital state (frequency index). The three rows are **pre-hit** ($f-1$), **action/transition** ($f_{\psi}$), and **post-redistribution** ($f$). There is **one** step in frequency. The $f_{\psi}$ label is a transient bookkeeping state, not a new frequency index or literal wave function.
- The transaction is a single closed-cycle action unit, $\Delta A_{\text{cycle}} = +h$, coupled first to the **outer** binary while $v_{\text{out}} < c_f$.
- The symbol $h$ labels action per full causal phase cycle. The associated radian-normalized rotational-action increment is $\hbar = h/(2\pi)$; in this local bookkeeping pass $\Delta I$ denotes that angular-momentum/action variable.
- Energy bookkeeping uses action-angle language: for a small discrete step, $\Delta E \approx \omega\,\Delta I = f\,\Delta A_{\text{cycle}}$. This is a **notation choice**, not a claim about the exact micro-law.
- The **inner binary** responds with a two-step reconfiguration. The **middle binary** adjusts to satisfy conservation of total energy and total angular momentum (including any causal-wake exchange).

Notation in the table:

- $K_o, U_o$ = outer-binary kinetic and potential energies.
- $K_m, U_m$ = middle-binary kinetic and potential energies.
- $K_i, U_i$ = inner-binary kinetic and potential energies.
- Superscripts $(f-1)$, $(f_{\psi})$, and $(f)$ denote the state index (one-step update).

Per-step increments (explicit, no deltas):

- Outer step energy: $\varepsilon_o \equiv \omega_o \hbar$ with
  $$k_o \equiv \chi_o\,\varepsilon_o,\quad u_o \equiv (1-\chi_o)\,\varepsilon_o,$$
  so $k_o + u_o = \varepsilon_o$.
- Inner step energy: $\varepsilon_i \equiv \omega_i \hbar$ with
  $$k_i \equiv \chi_i\,\varepsilon_i,\quad u_i \equiv (1-\chi_i)\,\varepsilon_i,$$
  so $k_i + u_i = \varepsilon_i$. Because the inner binary takes **two steps**, it adds $2k_i$ and $2u_i$.
- Middle adjustment energy: $\varepsilon_m$ is whatever is needed to close the ledger. Here $\varepsilon_w$ denotes the **causal-wake exchange energy** during the step:
  $$\varepsilon_m \equiv \varepsilon_w - 2\varepsilon_i,$$
  and we split it as
  $$k_m \equiv \chi_m\,\varepsilon_m,\quad u_m \equiv (1-\chi_m)\,\varepsilon_m.$$

| State | Outer (o) | Middle (m) | Inner (i) | Notes |
| --- | --- | --- | --- | --- |
| $f-1$ | $K_o^{f-1}$, $U_o^{f-1}$ | $K_m^{f-1}$, $U_m^{f-1}$ | $K_i^{f-1}$, $U_i^{f-1}$ | Baseline. No pending transaction. |
| $f_{\psi}$ | $K_o^{f_{\psi}} = K_o^{f-1} + k_o$<br>$U_o^{f_{\psi}} = U_o^{f-1} + u_o$ | $K_m^{f_{\psi}} = K_m^{f-1}$<br>$U_m^{f_{\psi}} = U_m^{f-1}$ | $K_i^{f_{\psi}} = K_i^{f-1}$<br>$U_i^{f_{\psi}} = U_i^{f-1}$ | Immediate post-hit. <br>Outer receives $\Delta I_o = +\hbar$ in the initial bookkeeping gauge. <br>Outer records a $(k_o,u_o)$ increment. |
| $f$ | $K_o^{f} = K_o^{f-1} + k_o$<br>$U_o^{f} = U_o^{f-1} + u_o$ | $K_m^{f} = K_m^{f-1} + k_m$<br>$U_m^{f} = U_m^{f-1} + u_m$ | $K_i^{f} = K_i^{f-1} + 2k_i$<br>$U_i^{f} = U_i^{f-1} + 2u_i$ | Post-redistribution. <br>Outer update is complete at $f_{\psi}$; <br>only middle/inner continue to settle. |

Constraints to apply across the $f-1 \to f$ transition (bookkeeping level):

- **Angular momentum / rotational action**: $\Delta I_{\text{out}} + \Delta I_{\text{mid}} + \Delta I_{\text{in}} + \Delta I_{\text{wake}} = +\hbar$. For a **net positive** transaction, all binaries should register **nonnegative** increments (no mixed signs): $\Delta I_{\text{out}}, \Delta I_{\text{mid}}, \Delta I_{\text{in}} \ge 0$ with $\Delta I_{\text{wake}} \approx 0$, and the distribution is left unspecified. For a **net negative** transaction, all three should be nonpositive. This preserves a consistent sign across the assemblies while still allowing arbitrary partitioning.
- **Energy**: $(k_o+u_o) + (k_m+u_m) + 2(k_i+u_i) = \varepsilon_o + \varepsilon_w$. This is the explicit version of conservation using the per-step increments defined above.
- **Root-ledger closure**: the transition must move from one admissible integer causal-root ledger to another and then close consistently over the full cycle. In a raw self-root table, separator crossings obey the parity rule $\Delta N\in 2\mathbb{Z}$ and $\Delta D=0$; in a grouped channel ledger, the same event may be recorded as one newly active channel.
- **Smooth slope**: $dU/dr$ remains continuous across the graft; the discrete behavior comes from **state updates**, not a kink in $U(r)$.

This table is intentionally explicit: every $h$ closed-cycle action transaction is represented by a radian-normalized $\hbar$ rotational-action increment, split into a kinetic part ($k$) and a potential part ($u$). The remaining freedom is **how** each binary partitions its step (the $\chi$ fractions) and how the middle, inner, and causal-wake channels redistribute the initial outer-binary coupling.

#### Comparison to Coulomb and Standard Conventions

In pure Coulomb,

$$V(r) = -\frac{k q^2}{r},$$

so there is no inner bound and no natural finite zero. Classical mechanics therefore chooses $V(\infty)=0$.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, a certified hard inner bound **supplies** a natural zero at $r_{\min}$, which is the lowest accessible state. The bookkeeping therefore switches from "energy relative to infinity" to "energy relative to the ground state."

#### Summary Table (Operational Meaning)

| Region | $K$ | $U$ | Meaning |
| --- | --- | --- | --- |
| $r = r_{\min}$ | max | 0 | Fully bound (ground) |
| $r > r_{\min}$ | $\downarrow$ | $\uparrow$ | Climbing out / rebound |
| escape limit | 0 | $B_{\max}$ | Free (unbound) |

#### One-Line Rule

If the model has a hard inner bound, **set the potential zero at that bound** and measure all energies outward from it.

**Adiabatic branch invariant target.** On a certified branch chart for binary layer $a$, suppose the reduced cycle admits a canonical pair $(Q_a,\Pi_a)$ and a slowly varying branch parameter $\lambda(t)$, such as a local Noether-Sea response variable, shielding parameter, or neighboring-layer phase parameter. Define the rotational action
$$
I_a(\lambda)
\equiv
\frac{1}{2\pi}
\oint_{\gamma_a(\lambda)}
\Pi_a\,dQ_a.
$$
If the parameter changes slowly compared with the cycle period $T_a(\lambda)$,
$$
\epsilon_{\mathrm{ad},a}
\equiv
\max_{t\in W}
\left(
T_a(\lambda(t))\,
\left\|\frac{d\lambda}{dt}\right\|\,
\ell_{\lambda}^{-1}
\right)
\ll1,
$$
and the path remains inside the same causal-root ledger cell, the theorem target is
$$
\frac{dI_a}{dt}
=
O(\epsilon_{\mathrm{ad},a})
+
\mathcal{R}_{\mathrm{branch},a}(t).
$$
Here $\ell_{\lambda}$ is the declared scale over which the reduced Hamiltonian changes appreciably, and $\mathcal{R}_{\mathrm{branch},a}$ records branch folds, omitted wake-history exchange, non-characteristic boundary leakage, or failure of the reduced symplectic chart. Thus the action variable is expected to drift only adiabatically between separator crossings, while a root-ledger transition may produce the discrete $\Delta I$ recorded above. This turns the $h$-like bookkeeping into a branch invariant target rather than an assumption that energy itself is quantized at the primitive level.

## Binary Dynamics

This chapter develops two-body architrino dynamics from the appearance of self-hit to candidate stable binaries and their conditional role as measurement standards. It then formalizes the maximum-curvature attractor analysis and closes with the state-space and conservation-law foundations needed for well-posed dynamics. **Status:** (1) self-hit makes the dynamics non-Markovian (path-history dependent), and (2) stability/attractor claims are conjectural unless explicitly established.

It is the foundational precursor to [Tri-Binary Dynamics](../../../../markdown/aaa/dynamics/tri-binary-dynamics.md), [Dyadic Resonance Lock](../../../../markdown/aaa/dynamics/dyadic-resonance-lock.md), [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md), and the assembly-level [Noether Core](../../../../markdown/aaa/spacetime/noether-swarm.md).

This chapter is the canonical home for two-body wake regimes, partner-hit versus self-hit behavior, spiral contraction, and maximum-curvature binary analysis. The primitive-entity ontology in [Architrino](../../../../markdown/aaa/foundations/architrino.md) should point here once the discussion becomes a behavioral regime or assembly-stability mechanism.

### The Spiral Orbiting Binary and the Contraction Phase

An orbiting binary is the simplest emergent assembly, consisting of two architrinos of opposite polarity: an Electrino and a Positrino. With polarities $-\epsilon$ and $+\epsilon$, the assembly is electrically neutral overall. This system is the first teaching case for delayed causal wakes, partner-hit contraction, and the self-hit onset boundary.

Consider the ideal case of a symmetric orbit in a universe with no other architrinos. In general, each architrino is subject to a superposition of external causal wake contributions from all other sources; the analysis below isolates the binary by setting those external contributions to zero.

Let the Electrino be architrino 1 and the Positrino be architrino 2.
-  **Positions:** $\mathbf{s}_1(t)$ and $\mathbf{s}_2(t)$
-  **Polarities:** $q_1 = -\epsilon$ and $q_2 = +\epsilon$

The motion of each architrino is determined by the wake emitted by the other at a delayed time. The acceleration of the Electrino (architrino 1) at time $t$ is caused by the Positrino's (architrino 2) wake emitted at an emission time $t_0$. This is governed by the interaction condition:
$$
\|\mathbf{s}_1(t) - \mathbf{s}_2(t_0)\| = c_f(t - t_0)
$$
The acceleration vector for the Electrino is attractive, pointing towards the Positrino's delayed position:
$$
\mathbf{a}_1(t) \propto -\hat{\mathbf{r}}_{21} = - \frac{\mathbf{s}_1(t) - \mathbf{s}_2(t_0)}{\|\mathbf{s}_1(t) - \mathbf{s}_2(t_0)\|}
$$
A symmetric set of equations governs the Positrino's motion based on the Electrino's emissions.

In the strictly sub-field-speed regime (no self-interaction, $\|\mathbf{v}\|\le c_f$), a stable, circular orbit is impossible. Because the attractive force on each architrino points to the *past* position of its partner, it is not a true central force. This delay motivates an **inward spiral modeled as exponential in angle** (a logarithmic spiral), consistent with a per-cycle angular-momentum increment $\Delta L_c$ in the partner-only regime. The radius shrinks geometrically per turn and speed increases until the self-interaction threshold ($\|\mathbf{v}\|>c_f$) is crossed.

Standard central-force mechanics conserves angular momentum because the force at time $t$ is collinear with the equal-time separation vector. The partner-hit branch does not have that geometry. Define the equal-time separation and delayed line of action by
$$
\mathbf{r}_{12}^{\mathrm{eq}}(t)
\equiv
\mathbf{s}_1(t)-\mathbf{s}_2(t),
\qquad
\widehat{\mathbf{r}}_{12}(t;t_0)
=
\frac{\mathbf{s}_1(t)-\mathbf{s}_2(t_0)}
{\|\mathbf{s}_1(t)-\mathbf{s}_2(t_0)\|}.
$$
The delayed partner branch carries the angular-momentum-change direction
$$
\mathbf{r}_{12}^{\mathrm{eq}}(t)
\times
\widehat{\mathbf{r}}_{12}(t;t_0),
$$
which is generically nonzero because $\mathbf{s}_2(t_0)$ is not the partner's equal-time position. Therefore the usual angular-momentum barrier and the instantaneous effective potential
$$
V_{\mathrm{eff}}(r)=V(r)+\frac{ml^2}{2r^2}
$$
cannot be imported as the binary's governing reduction. A conserved angular-momentum-like quantity, if present, must include the causal-wake history term that balances the delayed torque.

**Lemma (No stable circular orbit for $\|\mathbf{v}\| < c_f$).** In units with $c_f=1$, the circular speed is $s=R\omega$. In the partner-only regime, the per-hit tangential component satisfies
$$
T_p \propto \frac{\sin(\delta_p/2)}{\cos^2(\delta_p/2)} > 0 \quad (0<\delta_p<\pi),
$$
where $\delta_p$ is the partner delay angle. The time-averaged tangential acceleration cannot vanish; a constant-speed circular orbit is impossible.

-  The tangential component of the delayed force sustains the orbital motion.
-  The radial component continuously pulls the architrinos closer together.

With perfectly symmetric initial conditions (e.g., starting at rest), the paths of the electrino and positrino are distinct but perfect mirror images of each other. As they spiral inward, their speeds continuously increase. Emission cadence and intrinsic per-wavefront amplitude remain constant, but the **received** force is still velocity-dependent because the delayed Jacobian compresses or dilates the causal flux along each active branch. The evolution is therefore driven by delay geometry, branch bunching, and, once active, self-interaction.

Initially, and as long as the speeds of both architrinos are less than or equal to the wake propagation speed $c_f$, they are only influenced by their partner's attractive wake. The total acceleration is simply the attractive force:
$$
\mathbf{a}_{1, \text{total}}(t) = \mathbf{a}_{1,2}(t) \quad \text{and} \quad \mathbf{a}_{2, \text{total}}(t) = \mathbf{a}_{2,1}(t)
$$
During this phase, the system is purely contractile, with the architrinos accelerating and spiraling towards each other. The positive tangential component (see Lemma in the prior section) guarantees continued speed-up, so the spiral tightens until the self-hit regime is reached.

#### Ideal Symmetric Spiral Ansatz

The ideal binary spiral used in this opening analysis is not the same geometry as the later maximum-curvature circular benchmark. It is a **symmetric logarithmic-spiral ansatz**: the electrino and positrino follow two distinct planar curves related by the binary symmetry. At equal absolute time they remain opposite about the midpoint in the ideal center frame, but each architrino's path is the mirror-conjugate of the other's path rather than the same curve traced by both architrinos.

This matters because the ideal spiral is a **transient, scale-similar contraction model**. Within a fixed velocity regime and fixed active-root ledger, the local force geometry is assumed to repeat after a scale change and phase advance: radii shrink by a common factor, speeds rise according to the same delayed-geometry rule, and the partner/self branch structure is symmetric between the two architrinos. When the trajectory crosses a threshold such as $\|\mathbf{v}\|=c_f$ or a higher root-birth boundary, that scale-similar description must be re-matched on a new branch chart.

By contrast, the maximum-curvature binary section studies a **uniform circular benchmark**: fixed $R$, fixed $s$, and a single circular path geometry used to compute closed-form delay angles, branch Jacobians, and per-hit force components. That circular model is useful as a limiting or diagnostic case, but it should not be read as the actual inward spiral path before any final arrest. The detailed non-circular benchmark for the symmetric logarithmic spiral belongs in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#symmetric-delayed-logarithmic-spiral-advanced-non-circular-benchmark); this chapter uses it only as the conceptual two-body entry point.

### Spiral Momentum Budget Across the Hinge (Speculative)

This subsection records a modeling hypothesis rather than a derived law. The desired closure would link the spiral path, the per-hit force law, and the angular-momentum budget across the full velocity range. Below the wake speed, the binary feels only partner hits, yet the tangential component remains positive, so the spiral keeps tightening and the total orbital angular momentum of the **binary** grows each turn. We introduce a per-cycle gain parameter $\Delta L_c$ to track that growth (a **constant** increment per full revolution in this hypothesis).

**Speculative continuity assumption:** as $s\to1$, the per-cycle mechanical gain transitions smoothly from $\Delta L_\text{cycle} = \Delta L_c$ (sub-field-speed) to $\Delta L_\text{cycle} = 2\Delta L_c$ (self-hit active). This is not a claim that total angular momentum is created; the missing balance must be carried by a history-aware wake angular-momentum functional.

This section treats an exponential-in-angle spiral (logarithmic spiral) as a **modeling assumption** rather than a derived law. It simply sets the bookkeeping target: a path-history force sum that yields a smooth, finite increase in $\Delta L_\text{cycle}$ at the hinge. The detailed link between the summed per-hit forces and the spiral shape remains to be derived.

### Spiral Binary Symmetry-Breaking Point ($\|\mathbf{v}\| = c_f$)

The binary system's evolution is organized around the **field-speed symmetry point** $\|\mathbf{v}\|=c_f$. This is a **hinge** where the causal structure changes: below $c_f$ only partner-delay forces exist, while above $c_f$ self-hit roots appear. The hinge is not a hard barrier; it is the birth of the principal self branch. In the symmetric circular geometry the self-delay equation is
$$
\delta_s = 2s\sin(\delta_s/2), \qquad s=\frac{\|\mathbf{v}\|}{c_f}.
$$
Writing $s=1+\mu$ with $\mu>0$ small, the principal root satisfies
$$
\delta_s \sim \sqrt{24\mu},
\qquad
\sin(\delta_s/2)\sim \sqrt{6\mu}.
$$
The associated branch Jacobian is
$$
J_s = 1-s\cos(\delta_s/2)=1-\frac{\delta_s}{2}\cot(\delta_s/2)\sim 2\mu.
$$
Therefore the self radial and tangential magnitudes scale as
$$
\frac{1}{\sin(\delta_s/2)\,|J_s|}\sim \mu^{-3/2},
\qquad
\frac{1}{\sin^2(\delta_s/2)\,|J_s|}\sim \mu^{-2}.
$$
This is the first major consequence of restoring the causal Jacobian: the hinge is not merely a change in root count but a genuine **caustic onset**. The principal self branch turns on with a sharply amplified outward radial response and an even more singular tangential drive. Any candidate maximum-curvature balance must therefore confront a near-threshold Jacobian wall before appealing to higher-winding smoothing.

### Self-Hit: Definition and Diagnostics

Self-hit is the key non-Markovian feature of architrino dynamics. It occurs when an architrino interacts with potential it emitted earlier along its own worldline.

**Geometric condition (absolute coordinates):** For a given architrino with trajectory $\mathbf{x}(t)$, a self-hit event is a pair of times $(t_\text{emit}, t_\text{hit})$ with $t_\text{hit} > t_\text{emit}$ such that
$$
\|\mathbf{x}(t_\text{hit}) - \mathbf{x}(t_\text{emit})\| = c_f (t_\text{hit} - t_\text{emit}),
$$
and the architrino is the source of the causal wake surface emitted at $t_\text{emit}$.

**Terminology split:** Hit type is determined by **source identity**. A **self-hit** has the same source and receiver; a **partner hit** has a different source and receiver. Root count is a separate question: either source can contribute one active causal root or multiple active roots at the same reception time. Thus "self-hit" does not mean "multi-hit," and "partner hit" does not mean "single-hit."

**Dynamical role:**
- On any interval with strict sub-field-speed motion, self-hit is absent by the triangle-inequality root test, unless older path-history emissions from a prior super-field-speed interval remain active.
- As velocities exceed $c_f$ on curved histories, emission isochrons can catch up with the emitter's future positions, generating candidate nonlocal feedback and effective restoring or destabilizing forces depending on configuration.
- In generic trajectories, once an architrino has exceeded $c_f$ and emitted wakes in that regime, it can later slow below $c_f$ and still experience self-hits from those earlier emissions (see **Status** at top for the non-Markovian/path-history caveat).
- For binary and tri-binary assemblies, repeated self-hit events are the proposed mechanism that can prevent collapse, lock in stable radii and frequencies, and create new limit cycles and attractors.

For the circular-geometry details (principal angles, winding numbers, discrete self-hit branches), see **Setup and Notation (Symmetric Frame)** in **Maximum-Curvature Binary — Circular**.

### Spiral Binary Deflationary Phase

Once the circular branch admits same-source roots, the architrinos interact with their own earlier, repulsive wakes. The total acceleration on each architrino then becomes a superposition of attraction from its partner and self-repulsion. For the electrino:
$$
\mathbf{a}_{1, \text{total}}(t) = \mathbf{a}_{1,2}(t) + \mathbf{a}_{1,1}(t)
$$
In the circular benchmark, the principal self-hit branch ($m=0$) becomes available only on the super-field-speed side; at higher speeds, additional self-hit and partner-hit roots can turn on (see **Root Multiplicity vs. Speed**). The new self-repulsive term, $\mathbf{a}_{1,1}(t)$, grows rapidly as the path curvature increases, and it also adds tangential acceleration. In this regime the spiral typically tightens **more** each turn: the radius decreases faster while speed continues to rise. We still call this the **deflationary** phase, but in the sense that any radial arrest is a **late** effect—there is no soft landing early on. The balance that halts contraction is expected, if realized, only near the final turn where the orbit settles into the conjectured limiting circle; see **What "Maximum Curvature" Demands** for the balance mechanism.

### Maximum-Curvature Binary — Circular

Once self-hit turns on, the natural question is whether the dynamics converge to a limiting curvature. We call the candidate limit the **maximum-curvature binary (MCB)**. This section collects the full two-body, self-hit analysis for that candidate, including delay geometry, force components, and stability criteria. It is the canonical reference for MCB attractor status.

MCB stability claims rely on the well-posedness of the regularized SD-NDDE. In this chapter we treat $\eta > 0$ as fixed; any $\eta \to 0$ statement is outside the claims established here unless a weak-limit argument is explicitly supplied. The formal state-space framework appears in **State Space and Well-Posedness of the Two-Body Delay System**.

**Goal**: Characterize the circular, constant-speed, constant-radius configuration of two opposite-polarity architrinos and investigate where curvature $1/R$ is maximized. We work in units with field speed $c_f = 1$ and use the canonical delayed per-hit law with radial line of action and Jacobian-weighted magnitude.

**Plain language**: We seek the tightest (smallest-$R$) steady circle an opposite-polarity pair can trace when the only forces come from delayed, Jacobian-weighted line-of-action interactions with the partner (partner hits, possibly multiple at higher speed) and from each architrino's own past emissions (self-hits, accepted by same-source roots; in the circular branch these require the super-field-speed side).

#### Foundational Context (Ontological Clarification)

##### The Maximum-Curvature Binary (MCB) as Fundamental Unit

The architecture hypothesizes that the **maximum-curvature binary (MCB)** would be reachable first by the **inner binary** of a tri-binary assembly, stabilized by certified same-source self-hit roots on the super-field-speed circular branch. Contingent on Conjectures A/B, it would supply candidate **fundamental physical units** (length and time); see **Emergent Properties and Measurement Standards** below for the explicit definitions.

**Universal cap target (explicit):** If a stable MCB branch is certified, it would define a single limit state with one radius/speed pair. Binaries may sit below that limit, but the claim that no binary can exceed the MCB curvature or pass beyond its defining radius/speed remains conditional on the full signed-root ledger and stability certificate.

If realized, the MCB radius $r_{\text{min}}$ is expected to be determined by the balance of:
1. opposite-polarity causal-wake attraction, with the stripped inverse-square surrogate scaling as $\epsilon^2/r^2$,
2. self-hit repulsion (non-Markovian feedback when same-source roots exist; super-field-speed circular history is the relevant branch),
3. Centripetal requirement for stable circular orbit.

**Dynamical priority (attractor status):** The architecture hypothesizes the MCB is a **robust attractor**, not a finely tuned periodic orbit. Only if the multipliers lie strictly inside the unit circle and the basin is non-trivial do we have the attractor the architecture relies on. If neutrality or instability is found, the tri-binary ladder and Noether-core claims must be downgraded or the interaction law revised (e.g., additional damping/medium effects).

#### Setup and Notation (Symmetric Frame)

- **Two architrinos** with polarity bookkeeping labels $q_1 = -\epsilon$ and $q_2 = +\epsilon$ (where $\epsilon = |e|/6$).
- **Equal-time positions** (in absolute time $t$) are diametrically opposite on a circle of radius $R$ about the midpoint.
- **Uniform circular motion**: Angular speed $\omega$, constant tangential speed $s = R\omega$.
- **Non-translating binary**: Circle center (midpoint) is fixed in Euclidean 3D space; no net translation.

Let $C_i(t_\text{emit})$ denote the causal wake surface emitted by architrino $i$ at emission time $t_\text{emit}$. For uniform circular motion, self-hit events are discrete intersections between the worldline and its own wake surfaces. Define the **principal self-delay angle** $\tilde{\delta}_s \in (0, \pi]$ as the minimal angular separation between the current position and the emission point that yields a hit. Additional self-hits occur at longer delays indexed by winding number $m \ge 0$, giving a discrete family $\delta_s(m) = \tilde{\delta}_s + 2\pi m$.

##### Phase Angles and Delays

Let $\delta_s$ and $\delta_p$ denote the angular phase separations (measured along the circle) between:
- **Self** (same architrino): Current position -> its own past emission position that hits "now."
  - Delay time: $\tau_s$; angular separation: $\delta_s = \omega \tau_s$.
  - Chord length: $r_s = 2R \sin(\delta_s / 2)$.

- **Partner** (other architrino): Current position -> partner's past emission position that hits "now."
  - Delay time: $\tau_p$; angular separation: $\delta_p = \omega \tau_p$.
  - Chord length: $r_p = 2R \cos(\delta_p / 2)$.

##### Causal-Time Constraints (Field Speed $c_f = 1$)

For a signal to travel from emission point to reception point:
$$
r = c_f \cdot \tau \quad \Rightarrow \quad r = \tau \quad \text{(in units where } c_f = 1\text{)}.
$$

This yields two delay equations:

1. **Self-hit**:
  $$
  \delta_s = \omega \tau_s = \omega \cdot r_s = \omega \cdot 2R \sin(\delta_s / 2) = 2s \sin(\delta_s / 2).
  $$

2. **Partner hit**:
  $$
  \delta_p = \omega \tau_p = \omega \cdot r_p = \omega \cdot 2R \cos(\delta_p / 2) = 2s \cos(\delta_p / 2).
  $$

**These two transcendental equations determine** $(\delta_s, \delta_p)$ **as functions of speed** $s$.

**Circular-branch threshold**: On this uniform circular branch, self-hit roots exist only when $s > 1$ (i.e., $\|\mathbf{v}\| > c_f$). For $s \le 1$, no self-hit roots occur on the circular chart. This is a branch-specific root result, not a general speed-only criterion for arbitrary histories.

---

##### Terminology: Roots and Winding Numbers

**Root**: An emission time $t_0 < t$ (from either self or partner) that satisfies the causal constraint $r = c_f (t - t_0)$ and produces a hit at reception time $t$.

**Integer-indexed older roots (winding numbers)**:

Let $\tilde{\delta}_s \in (0, \pi]$ and $\tilde{\delta}_p \in (0, \pi]$ denote the **minimal (principal) angular separations** that determine the chord lengths and force directions.

In the same-sheet convention used for the first circular no-go, the full families of causal delays are:

- **Self**:
 $$
 \delta_s(m) = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2), \quad m = 0, 1, 2, \dots
 $$

- **Partner**:
 $$
 \delta_p(m) = \tilde{\delta}_p + 2\pi m = 2s \cos(\tilde{\delta}_p / 2), \quad m = 0, 1, 2, \dots
 $$

**Geometric interpretation**:
- The minimal separations $\tilde{\delta}_s$, $\tilde{\delta}_p$ determine the **same-sheet principal geometry** (chord lengths, force directions).
- The winding index $m$ affects **timing/ordering** of multiple hits inside that same-sheet convention.

**Signed-sheet caveat:** A full circular root certificate must also track whether the full delay angle is represented as $2\pi m+\alpha$ or $2\pi m-\alpha$ for a minimal chord angle $\alpha\in(0,\pi]$. Opposite signed sheets can reverse the tangential projection of a self-hit line of action. The sign-invariant statements below are therefore certified only on the same-sheet principal branch chart unless the signed sheet has been explicitly included in the root ledger.

For the full signed ledger, write
$$
\Delta_s^{\sigma,m}=2\pi m+\sigma\alpha_s,
\qquad
\Delta_p^{\sigma,m}=2\pi m+\sigma\alpha_p,
\qquad
\sigma\in\{+1,-1\},
$$
with $\sigma=-1$ requiring $m\ge1$. The signed circular root equations become
$$
2\pi m+\sigma\alpha_s=2s\sin(\alpha_s/2),
\qquad
2\pi m+\sigma\alpha_p=2s\cos(\alpha_p/2).
$$
The corresponding tangential signs are $\sigma\cos(\alpha_s/2)$ for self roots and $\sigma\sin(\alpha_p/2)$ for partner roots, up to positive branch weights. The first negative self sheet, $m=1,\sigma=-1$, obeys
$$
2\pi-\alpha=2s\sin(\alpha/2),
$$
and appears at $s=\pi/2$ with $\alpha=\pi$. For $s>\pi/2$ it contributes negative tangential drive. This does not prove circular closure, but it prevents the same-sheet no-go from being promoted to a full signed-ledger theorem.

---

#### Per-Hit Directions and Force Components

##### Local Coordinate Frame at Receiver

- **Radial outward**: $\hat{e}_r$ (from rotation center toward receiver).
- **Tangential**: $\hat{e}_t$ (direction of motion along circle).

##### Unit Directions of Lines of Action (Emission -> Reception)

**Self-hit**:
$$
\hat{u}_s = \sin(\delta_s / 2) \, \hat{e}_r + \cos(\delta_s / 2) \, \hat{e}_t.
$$

**Partner hit** (geometric chord across circle):
$$
\hat{u}_p = \cos(\delta_p / 2) \, \hat{e}_r - \sin(\delta_p / 2) \, \hat{e}_t.
$$

##### Canonical Per-Hit Accelerations

Using the delayed law with line-of-action direction and Jacobian-weighted magnitude (where $\kappa$ is a coupling constant and $\epsilon = |e|/6$), define branch Jacobians

$$
J_s \equiv 1-\frac{\mathbf{v}_{\text{self}}(t_0)\cdot \hat{u}_s}{c_f},
\qquad
J_p \equiv 1-\frac{\mathbf{v}_{\text{partner}}(t_0)\cdot \hat{u}_p}{c_f}.
$$

These encode the geometric bunching or dilation of the received causal flux along the active self and partner branches.

**Self-hit** (like polarities -> repulsive):
$$
\mathbf{a}_s = +\kappa \epsilon^2 \frac{1}{r_s^2\,|J_s|} \hat{u}_s.
$$

**Partner hit** (opposite polarities -> attractive):
$$
\mathbf{a}_p = -\kappa \epsilon^2 \frac{1}{r_p^2\,|J_p|} \hat{u}_p.
$$

---

##### Explicit Circular Jacobians

For the symmetric circular geometry, the emitter velocities can be resolved exactly against the line-of-action directions:
$$
\mathbf{v}_{\text{self}}(t_0)\cdot \hat{u}_s = s\cos(\delta_s/2),
\qquad
\mathbf{v}_{\text{partner}}(t_0)\cdot \hat{u}_p = -s\sin(\delta_p/2).
$$
Hence the branch Jacobians reduce to
$$
J_s = 1-s\cos(\delta_s/2),
\qquad
J_p = 1+s\sin(\delta_p/2).
$$
Using the delay constraints gives equivalent forms
$$
J_s = 1-\frac{\delta_s}{2}\cot(\delta_s/2),
\qquad
J_p = 1+\frac{\delta_p}{2}\tan(\delta_p/2).
$$
These formulas make the asymmetry between the two branch types explicit:

- The partner branch always satisfies $J_p > 1$, so delay geometry **dilutes** the received partner flux relative to the static inverse-square value.
- The self branch can satisfy $J_s \to 0^+$, producing the causal bunching that sharpens self-hit into a null-separatrix wall.

---

##### Radial and Tangential Components

Define **inward radial** as positive (toward center) and **tangential** as positive in direction of motion.

**Chord lengths**:
$$
r_s = 2R \sin(\delta_s / 2), \quad r_p = 2R \cos(\delta_p / 2).
$$

**Inward radial components**:

- **Self** (repulsive -> outward -> negative):
 $$
 A_{s,\text{rad}} = -\kappa \epsilon^2 \frac{\sin(\delta_s / 2)}{r_s^2\,|J_s|} = -\frac{\kappa \epsilon^2}{4R^2 \sin(\delta_s / 2)\,|J_s|}.
 $$

- **Partner** (attractive -> inward -> positive):
 $$
 A_{p,\text{rad}} = +\kappa \epsilon^2 \frac{\cos(\delta_p / 2)}{r_p^2\,|J_p|} = +\frac{\kappa \epsilon^2}{4R^2 \cos(\delta_p / 2)\,|J_p|}.
 $$

**Net inward radial acceleration**:
$$
A_{\text{rad}} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{1}{\cos(\delta_p / 2)\,|J_p|} - \frac{1}{\sin(\delta_s / 2)\,|J_s|} \right).
$$

**Tangential components** (both non-negative for $0 < \delta_s, \delta_p < \pi$):

- **Self**:
 $$
 T_s = +\kappa \epsilon^2 \frac{\cos(\delta_s / 2)}{r_s^2\,|J_s|} = \frac{\kappa \epsilon^2 \cos(\delta_s / 2)}{4R^2 \sin^2(\delta_s / 2)\,|J_s|}.
 $$

- **Partner**:
 $$
 T_p = +\kappa \epsilon^2 \frac{\sin(\delta_p / 2)}{r_p^2\,|J_p|} = \frac{\kappa \epsilon^2 \sin(\delta_p / 2)}{4R^2 \cos^2(\delta_p / 2)\,|J_p|}.
 $$

**Net tangential acceleration**:
$$
T = T_s + T_p \ge 0.
$$

---

##### Sub-Field-Speed Simplification ($s \le 1$; No Self-Hits)

When $s \le 1$, self-hits do not occur ($\delta_s$ has no solution). Only the partner contributes, so the tangential drive remains strictly positive, consistent with the lemma above:

$$
T(s < 1) = T_p = \frac{\kappa \epsilon^2}{4R^2} \frac{\sin(\delta_p / 2)}{\cos^2(\delta_p / 2)\,|J_p|}.
$$

Using the delay relation $\delta_p = 2s \cos(\delta_p / 2)$:

$$
T(s < 1) = \frac{\kappa \epsilon^2 s^2}{R^2} \frac{\sin(\delta_p / 2)}{\delta_p^2\,|J_p|} > 0.
$$

Because $J_p = 1+s\sin(\delta_p/2) > 1$, the delay geometry weakens the partner contribution relative to bare $1/r^2$, but it never changes its sign. Therefore even at sub-field speeds there is always a **net positive tangential force** (accelerating the binary), which prevents a truly stable, constant-speed circular orbit.

---

#### Requirements for True Circular Orbit (Working Hypothesis)

For uniform circular motion at fixed radius $R$ and constant speed $s$:

1. **Centripetal balance**:
  $$
  A_{\text{rad}} = \frac{s^2}{R}.
  $$

2. **Finite-window energy balance**:
  $$
  \left\langle
  \frac{dK_{\mu}}{dt}
  \right\rangle_W
  +
  \left\langle
  \Phi_{\mathrm{wake},\partial W}
  +
  P_{\mathrm{recoil}}
  \right\rangle_W
  =
  0.
  $$
  Here $K_{\mu}$ is the chosen quadratic kinetic proxy, $\Phi_{\mathrm{wake},\partial W}$ is the causal-wake energy flux through the boundary of the local window, and $P_{\mathrm{recoil}}$ is any retained local wake-emission resistance term. The older shorthand $\langle T\rangle=0$ is valid only for a particle-only closed window with no boundary wake flux and no recoil term.

---

##### Tangential Drive and Wake Escapement

**Theorem (Same-sheet no-go for constant-speed circular orbit in the bare two-body kernel).**
In the symmetric, non-translating circular binary with canonical delayed radial forces only, and with active roots restricted to the same-sheet principal branch chart defined above, the net tangential acceleration is strictly positive whenever at least one causal root contributes.

$$
T_{\mathrm{net}}
=
\sum_{m\in\mathcal{M}_p} w_{p,m} T_{p,m}
\;+\;
\sum_{m\in\mathcal{M}_s} w_{s,m} T_{s,m}
>0,
$$
where $w_{p,m},w_{s,m}\ge 0$ are branch weights induced by regularization/time averaging, and $\mathcal{M}_p,\mathcal{M}_s$ are active partner/self root sets.

*Proof.*
For any active partner branch, the tangential contribution is
$$
T_{p,m}
=
\frac{\kappa\epsilon^2}{4R^2}
\frac{\sin(\tilde{\delta}_{p,m}/2)}{\cos^2(\tilde{\delta}_{p,m}/2)\,|J_{p,m}|}
>0,
\qquad \tilde{\delta}_{p,m}\in(0,\pi),
$$
and for any active self branch (when present),
$$
T_{s,m}
=
\frac{\kappa\epsilon^2}{4R^2}
\frac{\cos(\tilde{\delta}_{s,m}/2)}{\sin^2(\tilde{\delta}_{s,m}/2)\,|J_{s,m}|}
>0,
\qquad \tilde{\delta}_{s,m}\in(0,\pi).
$$
The sign is branch-invariant on this same-sheet chart because winding changes timing, not chord orientation. Therefore each summand in $T_{\mathrm{net}}$ is nonnegative, and at least one is strictly positive whenever any hit exists. Hence $T_{\mathrm{net}}>0$ on the certified chart. $\square$

**Corollary.**
Within the same-sheet bare isolated two-body kernel, an exact constant-speed circular orbit
with no boundary wake flux and no recoil term is impossible. Any MCB-like steady state must therefore close a finite-window balance: signed-ledger cancellation may reduce the local tangential drive, but the remaining forward power must be assigned either to wake escapement through $\partial W$, to a local recoil term, or to genuinely multi-body tri-binary exchange.

**Interpretation.** The positive tangential component is not merely an obstruction to be erased. In a finite local window, partner and self wakes are continually emitted while only a subset of their causal isochrons later hit a local receiver. The unreceived portion exits the local window as wake-history flux. The same-sheet tangential drive is therefore the mechanical pump that can replace the interaction energy exported by those escaping causal wakes. A local binary can look particle-only conservative only if the outgoing wake record, recoil channel, and retained branch ledger are all included in the same balance law.

**Plain language**: On the same-sheet chart, the isolated pair shows persistent tangential drive at the per-hit level; cancellation is hard because every certified root pushes the same way. The stable-branch question is not "how can the drive disappear?" but "which wake flux, recoil, or multi-body channel balances the drive without destroying the retained branch?" This is a primary test of the MCB attractor hypothesis.

---

#### What "Maximum Curvature" Demands

**Mechanism summary (self-hit balance):** once $s>1$, each self-hit contributes a **repulsive acceleration away from its own past emission point**. In the symmetric circular geometry that repulsion has a **radial outward component** (opposing further contraction) and a **positive tangential component** (continuing to speed up the architrino). As the radius shrinks, both partner attraction and self-hit repulsion scale like $1/R^2$, while the decisive extra effect is the Jacobian weighting: the self-hit response can sharpen dramatically as an active branch approaches its null-separatrix geometry and because **new self-hit roots appear** at higher $s$. Maximum curvature would require the **outward self-hit radial component** to balance the inward partner pull without the still-positive tangential drive destroying constant-speed closure.

From the radial component formula:

$$
A_{\text{rad}} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{1}{\cos(\delta_p / 2)\,|J_p|} - \frac{1}{\sin(\delta_s / 2)\,|J_s|} \right).
$$

**Increasing curvature** ($1/R$ larger, so $R$ smaller) requires **stronger inward radial force**. This occurs when:

1. **$\delta_p$ increases** -> $\cos(\delta_p / 2)$ decreases -> partner term $1/\cos(\delta_p / 2)$ **increases** (stronger inward pull).
2. **$\delta_s$ increases** -> $\sin(\delta_s / 2)$ increases -> the geometric part of the self term decreases, while the full outward response still depends on how rapidly the Jacobian factor $|J_s|^{-1}$ grows along the active branch.

Two distinct balance mechanisms are now mathematically visible:

1. **Near-threshold Jacobian wall.**
   On the principal self branch, $|J_s|^{-1}$ turns on singularly as $s\downarrow 1^+$, with radial magnitude scaling like $(s-1)^{-3/2}$. This is the earliest possible obstruction to continued contraction.

2. **Higher-speed multi-branch redistribution.**
   At larger $s$, additional self branches turn on and redistribute the outward response across several winding sectors. In that regime the detailed balance depends on the full weighted sum over all active branches rather than on the principal branch alone.

**However**: Due to the same-sheet per-hit $T > 0$ result, this "maximum curvature" state remains unverified for the isolated two-body system. Its stability must be tested by the full, signed, multi-root time-averaged dynamics.

---

#### Emergent Properties and Measurement Standards

If a stable MCB exists, it provides a concrete **rod** and **clock** defined entirely by the two-body delay dynamics. Let
$$
d_0 := R_{\text{MCB}}, \qquad T_0 := \frac{2\pi}{\omega_{\text{MCB}}}.
$$
Then $d_0$ is the fundamental length scale of the architecture, and $T_0$ is the fundamental time scale. Their comparison with the wake propagation speed is the dimensionless MCB speed factor
$$
\beta_{\mathrm{MCB}}
=
\frac{R_{\mathrm{MCB}}\omega_{\mathrm{MCB}}}{c_f}
=
\frac{2\pi d_0}{c_fT_0},
$$
so the wake propagation speed is not an imposed architrino-speed limit. It is the propagation reference used to compare the MCB rod and clock, while individual architrinos may enter super-field-speed regimes with
$$
\|\mathbf{v}\|>c_f.
$$

In this view, any ruler or clock built from architrino assemblies ultimately reduces to multiples of $(d_0, T_0)$. Measurement standards are therefore **dynamical invariants** of the two-body attractor: they persist because the underlying limit cycle (if realized) is stable and reproducible across assemblies.

If the MCB does not exist as a stable attractor, these emergent standards must be replaced by whatever stable limit structure the dynamics actually support.

#### Root Multiplicity vs. Speed

This section separates the two terminology axes used throughout the chapter:

- **Source identity**: self-hit ($j=i$) or partner hit ($j\ne i$).
- **Root count**: single-root or multi-root on the current branch chart.

The self-hit onset is dynamically special because it introduces same-source feedback and an outward self-repulsive channel. Partner multi-hit is still part of the same super-field-speed root topology: at higher speeds, older partner wake surfaces can also satisfy the causal-root condition and contribute additional inward channels.

In the same-sheet uniform circular, non-translating geometry, admissible self-roots are indexed by winding number $m \ge 0$ and minimal angular separation $\tilde{\delta}_s \in (0, \pi]$:

$$
\delta_s = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2).
$$

##### Counting Self-Hits by Winding Index

For fixed winding $m \ge 0$, define
$$
f_m(\delta;s)=2s\sin(\delta/2)-\delta-2\pi m,
\qquad \delta\in(0,\pi].
$$
An $m$-branch same-sheet self-hit exists exactly when $f_m(\delta;s)=0$ has a solution in $(0,\pi]$.

- For the principal branch $m=0$, the threshold is sharp:
  $$
  s_0^\star = 1.
  $$
- For higher winding numbers $m\ge 1$, the appearance threshold is determined by the tangency condition at the interior maximizer $f_m'(\delta;s)=0$, namely
  $$
  \cos(\delta^\star_m/2)=\frac{1}{s},
  \qquad
  \sqrt{(s_m^\star)^2-1}-\arccos\!\left(\frac{1}{s_m^\star}\right)=\pi m.
  $$

Thus the higher same-sheet self branches do not turn on at equally spaced speeds. Their onset is governed by a nonlinear sequence of tangencies of the delayed self-intersection curve. A full signed-root ledger must add the $\sigma=-1$ sheets described above; the first such negative self sheet appears at $s=\pi/2$, earlier than the first higher same-sheet self branch.

For large winding number $m$, the threshold has the asymptotic form
$$
s_m^\star = \pi m + \frac{\pi}{2} + O\!\left(\frac{1}{m}\right),
$$
so the old equally spaced picture is recovered only as a high-speed approximation.

**Note**: Straight-line motion admits **no self-hits** even if $s > 1$; **curvature is required**. The above statements apply specifically to uniform circular, non-translating geometry.

---

#### Where Do Causal Hits Come From on the Circle? (Discrete Azimuth Pattern)

**Context**: Non-translating, uniform circular binary at fixed speed $s$. Receiver "now" at azimuth $\theta = 0$.

The emission points on the circle that can produce hits "now" form a **finite, discrete set** of azimuths determined by the delay equations--**not arbitrary locations**. Because roots are indexed by winding number $m$ and, in the full ledger, sheet sign $\sigma$, multiple hits at the same "now" can occur for different signed windings, but the admissible azimuths remain a finite comb and never fill the circle.

##### Partner Hits

- Minimal angular separation: $\tilde{\delta}_p \in (0, \pi]$.
- Causal delays:
 $$
 \delta_p(m) = \tilde{\delta}_p + 2\pi m = 2s \cos(\tilde{\delta}_p / 2), \quad m = 0, 1, 2, \dots
 $$

- **Emission azimuth** at reception:
 $$
 \varphi_p(m; s) = \pi - \tilde{\delta}_p(m; s).
 $$

- **Existence thresholds**: For each $m \ge 0$, a solution exists only if $s > m\pi$.
- As $m$ increases, $\tilde{\delta}_p$ decreases -> $\varphi_p$ drifts monotonically toward $\pi$ (diametrically opposite point).
- Partner multi-hit means $M_p(s)>1$: the base partner branch plus one or more older partner roots. These additional roots affect the inward partner-root ledger, but they do not create same-source feedback.

##### Self-Hits

- Minimal angular separation: $\tilde{\delta}_s \in (0, \pi]$.
- Causal delays:
 $$
 \delta_s(m) = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2), \quad m = 0, 1, 2, \dots
 $$

- **Emission azimuth** at reception:
 $$
 \varphi_s(m; s) = -\tilde{\delta}_s(m; s).
 $$

- **Existence windows**:
 - Principal branch ($m = 0$): exists for every $s>1$, with $\tilde{\delta}_s\to0^+$ as $s\downarrow1$.
 - For $m \ge 1$: the branch appears only when the self-delay equation develops an interior tangency. The exact threshold $s_m^\star$ is determined in **Counting Self-Hits by Winding Index** below.
 - Within each branch, $\tilde{\delta}_s$ initially enters at a tangency angle and then decreases with $s$, so $\varphi_s$ drifts toward $-\pi$ at high speed.

---

#### Super-Field-Speed Root Ledgers and Resonance Lock

The super-field-speed regime is not merely the same spiral at a larger speed. It changes the root topology of the binary. Once
$$
\|\mathbf{v}\|>c_f,
$$
the receiver can intersect multiple older causal wake surfaces from both its own path and its partner's path. In the circular reduced model, these intersections are counted by two integer ledgers:
$$
N_s(s)
\equiv
\#\{(m,\sigma):\text{self branch }(m,\sigma)\text{ is active at speed }s\},
$$
$$
M_p(s)
\equiv
\#\{(m,\sigma):\text{partner branch }(m,\sigma)\text{ is active at speed }s\}.
$$
The self-ledger
$$
N_s
$$
tracks outward self-hit channels. The partner-ledger
$$
M_p
$$
tracks inward partner-hit channels. Both are integer-valued because a causal root either exists or it does not. As
$$
s
$$
varies, these counts change only at branch birth/death thresholds where a causal delay equation develops a tangency.

A candidate stable super-field-speed bound state therefore cannot be described by a single smooth force curve alone. It must satisfy a finite root-ledger balance:
$$
\sum_{m\in\mathcal{M}_p(s)}
A_{p,m}^{\mathrm{rad}}(R,s)
-
\sum_{m\in\mathcal{M}_s(s)}
A_{s,m}^{\mathrm{rad}}(R,s)
=
\frac{s^2}{R},
$$
together with whatever tangential closure condition is supplied by the full regularized dynamics. The radial equation says that partner-root accumulation supplies inward pull while self-root accumulation supplies outward response. On a fixed signed branch ledger $b$, the corresponding constant-speed closure target has the form
$$
\left\langle
\sum_{\rho\in b} T_\rho(R,s;\eta)
\right\rangle_{P_b}
=0,
$$
where the average is taken over one candidate period $P_b$ of the regularized history. The tangential condition remains the hard part: in the same-sheet bare isolated two-body kernel, the no-go result above shows that every active branch contributes positive tangential drive; in the full signed ledger, negative sheets must be included before any global no-go or closure theorem is claimed.

This gives a precise, conditional meaning to binary resonance lock. A stable slot would be a region of history space in which the integer pair
$$
(N_s,M_p)
$$
is fixed, the branch Jacobians stay transversal, and perturbations that approach a root threshold are pushed back into the same ledger rather than escaping to a neighboring one. If such a self-map certificate exists, the discreteness of
$$
N_s
\quad\text{and}\quad
M_p
$$
would provide a deterministic mechanism for quantized bound-state geometry: allowed radii and frequencies would be selected by integer causal-root ledgers rather than by a continuum of arbitrary circular orbits.

This statement is deliberately conditional. The present chapter derives the discrete root ledgers and the radial balance target, but the stability and quantization claims require the missing full-history certificate: finite active branches, positive Jacobian floors, returned-history closure, and a monodromy or boundary-trapping argument. In practice, that certificate may close first in a collinear breather or tri-binary setting rather than in the bare circular two-body kernel.

##### Branch Stability Target (Hessian Bridge)

The standard equilibrium test in central-force mechanics uses the Hessian of an instantaneous effective potential. If $q_\star$ is an equilibrium, the matrix
$$
H_{ab}(q_\star)=\partial_a\partial_b V_{\mathrm{eff}}(q_\star)
$$
tests local stiffness in the non-symmetry directions. This is useful as comparison language, but it is not yet a stability proof for an architrino binary because the force law depends on path-history, the active signed causal-root ledger, and the branch Jacobian floors.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ branch-stability target is therefore a cycle-averaged stiffness matrix on a fixed branch chart. Let $b$ denote a fixed signed causal-root ledger and let $\mathbf{X}_b(t)$ be a candidate periodic history with period $P_b$. For reduced branch coordinates $y^a$ transverse to time-shift and rotation symmetries, define the diagnostic stiffness target
$$
K^{(b)}_{ab}
=
\frac{1}{P_b}\int_0^{P_b}
\left.
\frac{\delta^2 U_{\eta,b}^{\mathrm{hist}}}{\delta y^a\,\delta y^b}
\right|_{\mathbf{x}_t=\mathbf{X}_{b,t}}
dt,
$$
where $U_{\eta,b}^{\mathrm{hist}}$ is the action-compatible history potential, or the corresponding diagnostic reconstruction when the regularization has not yet been derived from the delayed action. Negative stiffness in this matrix is a local instability signal; positive stiffness is only a necessary reduced-coordinate check, not a certificate.

The actual branch certificate must be delayed-history and Floquet-style. Let
$$
\mathcal{P}_b:\mathcal{N}_b\subset\mathcal{H}\to\mathcal{H}
$$
advance an admissible history by one candidate cycle while the signed causal-root ledger remains fixed. A stable branch requires the return map to stay inside the same branch neighborhood,
$$
\mathcal{P}_b(\mathcal{N}_b)\subset\mathcal{N}_b,
\qquad
\inf_{\phi\in\mathcal{N}_b}|J(\phi)|\ge J_{\min}>0,
$$
and the non-symmetry Floquet multipliers of $D\mathcal{P}_b[\mathbf{X}_b]$ to satisfy
$$
|\mu_\alpha|<1.
$$
Only that return-map condition would upgrade the Hessian-style stiffness picture into branch stability. Until it is supplied, MCB stability remains a conditional target rather than a completed proof.

##### Finite-dimensional projection caveat

The circular formulas below use reduced coordinates; stability in the full history space remains a separate proof obligation.

### State Space and Well-Posedness of the Two-Body Delay System

#### Introduction and Scope

The master equation of motion for the architrino system constitutes a system of **State-Dependent Neutral Delay Differential Equations (SD-NDDEs)**. Unlike ordinary differential equations (ODEs) where the state is a point in $\mathbb{R}^{6N}$, the state of this system is a **function segment** representing the past history of the architrinos.

We denote the position of the $i$-th architrino as $\mathbf{x}_i(t) \in \mathbb{R}^3$. We work in the **Euclidean void** with fixed metric $\delta_{ij}$.

---

#### Functional Phase Space

To define the evolution at time $t$, we require knowledge of the trajectory over an interval $[t - \tau_{\max}, t]$, where $\tau_{\max}$ is the maximum causal lookback time relevant to the current dynamics.

##### Definition 1 (The History Space)
Let $h > 0$ be a history horizon (sufficiently large to capture all active causal roots). The **history space** $\mathcal{H}$ is defined as the Banach space of continuously differentiable functions mapping the delay interval to the configuration space:
$$
\mathcal{H} = C^1\left([-h, 0]; (\mathbb{R}^3)^N\right).
$$
For a trajectory $\mathbf{x}: [-h, \infty) \to (\mathbb{R}^3)^N$, the **state at time $t$**, denoted $\mathbf{x}_t$, is the element of $\mathcal{H}$ given by:
$$
\mathbf{x}_t(\theta) = \mathbf{x}(t + \theta), \quad \theta \in [-h, 0].
$$
The norm is the standard $C^1$ sup-norm: $\|\phi\|_\mathcal{H} = \sup_{\theta \in [-h,0]} (\|\phi(\theta)\| + \|\dot{\phi}(\theta)\|)$.

**Remark:** We require $C^1$ rather than $C^0$ because the delay $\tau$ depends on the state (state-dependent delay). In such systems, the vector field is typically not Lipschitz continuous in the $C^0$ topology, endangering uniqueness.

---

#### The Regularized Interaction Functional

We formalize the force term derived in the master equation.

##### Definition 2 (Causal Constraint Functional)
For a target architrino $i$ at time $t$ and source $j$, the delay $\tau_{ij}(t)$ is implicitly defined by the causal-isochron condition. Let $\phi \in \mathcal{H}$ be the history. A **causal root** is a value $\tau > 0$ satisfying:
$$
g_{ij}(\tau, \phi) \equiv \|\phi_i(0) - \phi_j(-\tau)\| - c_f \tau = 0.
$$

##### Lemma 1 (Regularity of the Delay Map)
*Assumption:* The velocities are sub-field-speed relative to the separation, i.e., $\|\mathbf{v}_j\| < c_f$ (single-root regime) OR we isolate a specific branch of the multi-root solution where the relative radial velocity is not $c_f$.

*Statement:* If $\phi \in \mathcal{H}$ and $\tau^*$ is a simple root of $g_{ij}(\tau, \phi) = 0$ (i.e., $\partial_\tau g_{ij} \neq 0$), then there exists a neighborhood $U \subset \mathcal{H}$ of $\phi$ and a continuously differentiable functional $\tau: U \to \mathbb{R}^+$ such that $\tau(\phi) = \tau^*$.

*Proof.*
Define
$$
g_{ij}(\tau,\phi)=\|\phi_i(0)-\phi_j(-\tau)\|-c_f\tau.
$$
Because $\phi\in C^1$, the evaluation maps $\phi\mapsto \phi_i(0)$ and
$(\tau,\phi)\mapsto \phi_j(-\tau)$ are $C^1$, hence $g_{ij}$ is $C^1$ on
$\mathbb{R}^+\times\mathcal{H}$. At a root $(\tau^*,\phi)$,
$$
\partial_\tau g_{ij}
=-\hat{\mathbf{r}}_{ij}\!\cdot\!\dot{\phi}_j(-\tau^*)-c_f,
\quad
\hat{\mathbf{r}}_{ij}
\equiv
\frac{\phi_i(0)-\phi_j(-\tau^*)}{\|\phi_i(0)-\phi_j(-\tau^*)\|}.
$$
The simple-root condition is exactly $\partial_\tau g_{ij}\neq 0$, i.e. no
delayed tangency/causal-shock degeneracy. Therefore, by the Banach-space
Implicit Function Theorem, there exist a neighborhood $U$ of $\phi$ and a
unique $C^1$ map $\tau:U\to\mathbb{R}^+$ with
$g_{ij}(\tau(\psi),\psi)=0$ and $\tau(\phi)=\tau^*$. $\square$

##### Definition 3 (Regularized Acceleration Functional)
To ensure the vector field is Lipschitz, we replace the distributional Dirac delta of the master equation with the mollifier $\delta_\eta$ (see [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md)). The acceleration functional $F_i: \mathcal{H} \to \mathbb{R}^3$ is:
$$
F_i(\phi) = \sum_{j} \kappa \sigma_{ij} |q_i q_j| \int_{-h}^0 \frac{\phi_i(0) - \phi_j(\theta)}{\|\phi_i(0) - \phi_j(\theta)\|^3} \, \delta_\eta\left( \|\phi_i(0) - \phi_j(\theta)\| + c_f \theta \right) \, d\theta.
$$
**Crucial Property:** For $\eta > 0$ and smooth $\delta_\eta$, this integral operator maps $C^1$ histories to continuous accelerations.

---

#### Local Well-Posedness

##### Theorem 1 (Local Existence and Uniqueness)
**Assumptions:**
1. $\eta > 0$, and $\delta_\eta$ is $C^1$ with bounded value and bounded derivative.
2. Initial history $\phi^0 \in \mathcal{H}$ is admissible: there exists $d_{\min}>0$ such that all interaction channels used by Definition 3 satisfy
   $$
   \|\phi_i(0)-\phi_j(\theta)\|\ge d_{\min},\qquad \theta\in[-h,0],
   $$
   on a neighborhood of $\phi^0$.
3. Delay roots used in channel construction are simple (transversal), i.e. no causal-shock degeneracy (Lemma 1).
4. Active branches are uniformly finite on the considered history neighborhood.
5. Couplings and polarity magnitudes are finite.
6. Optional higher-smoothness gluing condition at $t=0$ (needed for $C^2$ at the junction, not for $C^1$ well-posedness).

**Statement:**
Let $\mathbf{Y}=(\mathbf{x},\mathbf{v})$ and write the system in first-order form
$$
\dot{\mathbf{Y}}(t)=\mathcal{G}(\mathbf{Y}_t),\qquad
\mathbf{Y}_{t_0}=\phi^0.
$$
Then there exists $T>0$ and a unique $C^1$ solution on $[t_0-h,t_0+T)$.
Equivalently, there is a unique maximal solution interval
$$
[t_0-h,t_{\max}),\qquad t_{\max}>t_0.
$$
If the optional gluing condition holds, the solution is $C^2$ at $t_0$.

*Proof.*
Define
$$
\mathcal{G}(\phi)=(\phi_v(0),F(\phi)),
$$
with $F$ from Definition 3.

1. By Assumption 2, every denominator in the interaction kernel is bounded away from zero on the admissible neighborhood; therefore the map
   $$
   (\mathbf{u},\mathbf{w})\mapsto \frac{\mathbf{u}-\mathbf{w}}{\|\mathbf{u}-\mathbf{w}\|^3}
   $$
   is $C^1$ there with bounded derivative.
2. By Assumption 1, composition with $\delta_\eta$ preserves $C^1$ regularity and bounded derivatives.
3. By Lemma 1 and Assumption 3, delay branches (where used) depend $C^1$ on history; thus branch-evaluation maps are locally Lipschitz in $\phi$.
4. Finite sums over channels and integration over finite interval $[-h,0]$ preserve local Lipschitz continuity; hence $\mathcal{G}$ is locally Lipschitz on an open subset of $\mathcal{H}$ containing $\phi^0$.
5. Apply the standard Banach-space existence/uniqueness theorem for state-dependent DDEs: a unique local $C^1$ solution exists and extends uniquely to a maximal interval.

Therefore Theorem 1 holds. $\square$

---

#### Global Existence vs. Blow-Up

Unlike Newtonian gravity, global existence is **not guaranteed** simply by avoiding collisions, because the delay equation can harbor "runaway" modes where self-acceleration diverges.

##### Theorem 2 (Continuation Principle)
The solution $\mathbf{x}(t)$ can be extended as long as the state $\mathbf{x}_t$ remains within a compact subset of the phase space where causal roots are simple.

##### Definition 4 (Blow-Up Criteria)
The solution ceases to exist at finite time $T^*$ if:
1. **Collision:** $\inf_{i,j} \|\mathbf{x}_i(t) - \mathbf{x}_j(t')\| \to 0$ inside the regularization kernel support.
2. **Infinite Speed:** $\sup_i \|\mathbf{v}_i(t)\| \to \infty$.
3. **Causal Shock:** The derivative of the delay $\dot{\tau}(t)$ diverges (Doppler factor becomes singular). This occurs if an architrino moves directly toward a receiver at speed $\|\mathbf{v}\| = c_f$.

---

### Symmetry, Conservation, and Lyapunov Functionals

#### Introduction

Standard conservation laws (energy, momentum, angular momentum) rely on the application of Noether's theorem to local Lagrangian densities. In this delayed setting, the force at time $t$ depends on the phase-space trajectory over the interval $[t - h, t]$.

For an action-derived, symmetry-preserving delayed model, symmetries of the substrate (Euclidean void + absolute time) imply conservation laws, but the conserved quantities are no longer simple functions of the instantaneous state $(\mathbf{x}, \mathbf{v})$. Instead, they are **functionals on the history space** $\mathcal{H}$. For a working regularized kernel not yet derived from an action, the same expressions function as validation diagnostics rather than established Noether charges.

This section derives these functionals, establishes the exact symmetry group of the regularized dynamics ($\eta > 0$), and provides the *a priori* bounds required to ensure physical well-posedness (preventing unphysical runaway acceleration).

---

#### The Global Symmetry Group

We consider the regularized two-body system in the Euclidean void $\mathbb{R}^3$ with metric $\delta_{ij}$ and absolute time $t$.

##### Definition 1 (The Fundamental Symmetry Group)
The background substrate and the master equation interaction kernel
$$
\mathbf{a}_{ij}(t) \propto \frac{\mathbf{x}_i(t) - \mathbf{x}_j(t_0)}{\|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\|^2\,|J_{ij}(t;t_0)|}
$$
(regularized by $\eta$) respect the group:
$$
G_{\text{fund}} = E(3) \times \mathbb{R}_{\text{time}}
$$
where $E(3) = \mathbb{R}^3 \rtimes O(3)$ is the Euclidean group of spatial translations and rotations, and $\mathbb{R}_{\text{time}}$ denotes time translation.

##### Theorem 1 (Invariance of the Equations of Motion)
Let $\mathbf{x}(t)$ be a solution to the master equation.
1. **Time Translation:** For any $\tau \in \mathbb{R}$, $\mathbf{y}(t) = \mathbf{x}(t + \tau)$ is also a solution.
2. **Spatial Isometry:** For any $R \in O(3)$ and $\mathbf{b} \in \mathbb{R}^3$, $\mathbf{y}(t) = R\mathbf{x}(t) + \mathbf{b}$ is also a solution.

*Proof.*
For time translation, set $\mathbf{y}_i(t)=\mathbf{x}_i(t+\tau)$. If
$t_0\in\mathcal{C}_{ij}^x(t+\tau)$ for the original solution, then
$t_0-\tau\in\mathcal{C}_{ij}^y(t)$ because
$$
\|\mathbf{y}_i(t)-\mathbf{y}_j(t_0-\tau)\|
=\|\mathbf{x}_i(t+\tau)-\mathbf{x}_j(t_0)\|
=c_f[(t+\tau)-t_0]
=c_f[t-(t_0-\tau)].
$$
Hence the same branch contributions appear with shifted times, and
$\ddot{\mathbf{y}}_i(t)=\ddot{\mathbf{x}}_i(t+\tau)$ satisfies the same force law.

For spatial isometries, set $\mathbf{y}_i(t)=R\mathbf{x}_i(t)+\mathbf{b}$,
$R\in O(3)$. Distances are preserved:
$$
\|\mathbf{y}_i(t)-\mathbf{y}_j(t_0)\|
=\|R(\mathbf{x}_i(t)-\mathbf{x}_j(t_0))\|
=\|\mathbf{x}_i(t)-\mathbf{x}_j(t_0)\|,
$$
so causal-root times are unchanged. Unit directions transform covariantly:
$\hat{\mathbf{r}}_{ij}^y=R\hat{\mathbf{r}}_{ij}^x$. Therefore each force term
transforms as $\mathbf{a}_{ij}^y=R\mathbf{a}_{ij}^x$, and
$$
\ddot{\mathbf{y}}_i(t)=R\ddot{\mathbf{x}}_i(t)
=\sum_j\sum_{t_0\in\mathcal{C}_{ij}(t)}
\kappa\sigma_{ij}\frac{|q_iq_j|}{r_{ij}^2\,|J_{ij}(t;t_0)|}\,\hat{\mathbf{r}}_{ij}^y.
$$
Thus $\mathbf{y}$ solves the same equations. $\square$

**Implication:** In an action-derived regularization, these symmetries correspond to exact history-space integrals of motion. Because the interaction is non-local in time, those integrals must account for momentum and energy carried by causal wake surfaces rather than only by the instantaneous mechanical coordinates.

---

#### Conservation of Generalized Momentum

In a delay system, Newton's Third Law ($\mathbf{F}_{12}(t) = -\mathbf{F}_{21}(t)$) fails instantaneously because $\mathbf{F}_{12}(t)$ originates from architrino 2 at $t-\tau_1$, while $\mathbf{F}_{21}(t)$ originates from architrino 1 at $t-\tau_2$.

##### Definition 2 (Mechanical Momentum)
The instantaneous mechanical momentum is:
$$
\mathbf{P}_{\text{mech}}(t) = \sum_{i} \mu_{\text{arch}} \mathbf{v}_i(t).
$$
Because of the delay, $\frac{d}{dt}\mathbf{P}_{\text{mech}} \neq 0$ generally.

##### Conservation Target 2 (Total Momentum Functional)
For an action-derived delayed model with translation symmetry, there exists a functional $\mathbf{P}_{\text{wake}}[\mathbf{x}_t]$ representing the momentum flux encoded in the active causal wake surfaces such that the total momentum:
$$
\mathbf{P}_{\text{tot}} = \mathbf{P}_{\text{mech}}(t) + \mathbf{P}_{\text{wake}}[\mathbf{x}_t]
$$
is conserved. For working regularized models, this same expression is a validation diagnostic unless the chosen regularization preserves the translation symmetry of the underlying action.

**Explicit Form (Weak Coupling Limit):**
For $\eta \to 0$, the wake momentum can be approximated by integrating the force impulse over the delay time:
$$
\mathbf{P}_{\text{wake}} \approx \sum_{i \neq j} \int_{t - \tau_{ij}(t)}^{t} \mathbf{F}_{ij}^{\text{emit}}(s) \, ds.
$$
*Physical interpretation:* The "missing" momentum is accounted for by the causal wake surfaces currently traversing the space between sources and receivers in an action-derived model; otherwise this balance is the momentum diagnostic to verify.

**Corollary (Center of Mass Motion):**
For an isolated binary, the center of mass $\mathbf{x}_{\text{cm}}$ need not move at constant velocity in the mechanical coordinates alone. Instead, it can oscillate around a mean trajectory while wake momentum carries the compensating history term. A runaway center-of-mass self-acceleration is forbidden only in an action-derived model whose regularization preserves translation symmetry; in working regularized models this is a conservation diagnostic to be checked.

---

#### Energy and The Lyapunov Functional

Energy conservation is the critical constraint preventing runaway solutions (MCB-09).

##### Definition 3 (The History Hamiltonian)
For an action-derived delayed model with time-translation symmetry, the target conserved quantity $\mathcal{H}$ is a history functional. For state-dependent delays, the useful comparison object is a **Lyapunov-Krasovskii-style functional**:
$$
\mathcal{H}(\mathbf{x}_t) = K(\mathbf{v}(t)) + \mathcal{U}_{\text{history}}(\mathbf{x}_t).
$$

1. **Kinetic Energy:** $K(t) = \sum \frac{1}{2} \mu_{\text{arch}} \|\mathbf{v}_i(t)\|^2$.
2. **Potential Functional:** $\mathcal{U}_{\text{history}}$ accumulates the work done by the conservative forces. Unlike an instantaneous potential $V(r)$, this depends on the configuration of all active wake surfaces.

##### Theorem 3 (Energy Balance Equation)
$$
\frac{dK}{dt} = \sum_{i} \mathbf{v}_i(t) \cdot \mathbf{F}_i(t).
$$
We define the **Interaction Potential Functional** $\mathcal{W}(t)$ such that:
$$
\mathcal{W}(t) = -\int_{t_0}^t \sum_i \mathbf{v}_i(s) \cdot \mathbf{F}_i(s) \, ds.
$$
This functional is nonlocal in time: it accumulates deferred work along the path-history of wakes and is not an instantaneous potential $U(r)$.
Then, by construction along the realized trajectory, $\mathcal{E}_{\text{tot}} = K(t) + \mathcal{W}(t)$ is constant. It is an exact Noether charge only when $\mathcal{W}$ is the boundary term of the same symmetry-preserving delayed action; otherwise it is a diagnostic reconstruction.

##### Lemma 1 (Boundedness of the Potential)
**Assumption:** The interaction is regularized with width $\eta > 0$ such that the maximum force is bounded: $\|\mathbf{F}_{ij}\| \le F_{\max}(\eta)$.
**Statement:** For a bound system (architrinos confined to a finite volume $V$), the rate of work is bounded by $N F_{\max} v_{\max}$.

##### Theorem 4 (No-Runaway Criterion)
In an action-derived master-equation branch with fixed $\eta>0$, an isolated binary cannot undergo runaway acceleration ($\|\mathbf{v}\| \to \infty$) *unless* the action-compatible potential energy functional $\mathcal{W}(t)$ diverges to $-\infty$.

*Proof Logic:*
Since $\mathcal{E}_{\text{tot}}$ is constant:
$$
K(t) = \mathcal{E}_{\text{tot}} - \mathcal{W}(t).
$$
For $K(t)$ to diverge, $\mathcal{W}(t)$ must decrease without bound.
1. **Partner attraction:** $q_1 q_2 < 0$. The potential is negative (attractive). As $r \to 0$, $V \to -\infty$. Collapse leads to infinite kinetic energy in the standard Kepler singularity pattern; in this architecture, self-hit is the proposed counter-channel.
2. **Self-hit repulsion:** $q_1 q_1 > 0$. The force is **repulsive**. The potential contribution is **positive**.
  *  Work done by self-hit: If an architrino is pushed "from behind" by its own wake, it gains $K$.
  *  However, this energy must come from the $\mathcal{W}$ term.
  *  Since self-hit potential is repulsive (positive energy hill), converting it to kinetic energy lowers the total potential.
  *  **Crucial bound:** The deferred work encoded in a self-wake is finite when the emitted causal-wake budget is finite. An architrino cannot extract infinite energy from its own past unless the history functional has already assigned an infinite budget to that causal wake.

**Conclusion:** A self-acceleration runaway, where an architrino accelerates itself indefinitely using self-forces, is forbidden by the conservation of $\mathcal{H}$ in the symmetry-preserving action model. In other working models, the same statement is a validation target: the system can oscillate or settle, but an apparent explosion to $\|\mathbf{v}\|=\infty$ must be traced either to singular collapse, transversality loss, or a broken conservation diagnostic.

---

## Tri-Binary Dynamics

This chapter formulates tri-binary dynamics by extending the two-body delayed causal-wake system to a coupled three-binary Noether core. Its focus is the branch geometry, high-speed response, gradient response, and diagnostic quantities needed to assess stability and alignment in absolute substrate time.

It should be read together with [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md), [Dyadic Resonance Lock](../../../../markdown/aaa/dynamics/dyadic-resonance-lock.md), [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md), [Noether Core](../../../../markdown/aaa/spacetime/noether-swarm.md), and [Noether Core Geometry](../../../../markdown/aaa/spacetime/noether-core-geometry.md), since those notes supply the binary precursor, lock structure, alignment target, assembly carrier, and exclusion-envelope geometry.

This chapter is the canonical dynamics home for coupled three-binary speed regimes, alignment behavior, and assembly-stability mechanisms. Primitive architrino ontology supplies the transceivers, polarities, causal wakes, and causal-root law; coupled stability mechanisms belong here and in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md).

### Relation to Causal Closure

This chapter owns the dynamics baseline: the Noether-core roles, speed-regime conventions, delay-envelope geometry, gradient response, local cycle-period diagnostics, and stability tests that define the tri-binary mechanism. It does not try to close the full rest-mass, photon, or observer-inference proof program.

Proper time $\tau$ does not exist at this layer. The EOM is integrated exclusively over absolute substrate time $t$. A tri-binary branch may output absolute periods, causal-root ledgers, deformation tensors, and stability residuals; later observer-inference chapters may translate those outputs into clock, ruler, signal, and effective-geometry language.

The stronger causal-closure program uses the mechanism defined here as an input. In this chapter, those stronger claims are included only where they clarify the dynamics baseline, and they are marked as reconstruction targets rather than completed theorems.

### Claim Scope

The claims in this chapter define a canonical dynamics baseline. They do not yet constitute a completed derivation of rest mass, photon behavior, or general relativity from first principles. The claims are organized into three classes:

| Class | Treatment in this chapter |
| --- | --- |
| Dynamics baseline | Noether-core roles, speed-regime conventions, delay-envelope geometry, spiral-helical motion, cycle-period diagnostics, and stability tests. |
| Reconstruction target | Mass response, photon-channel behavior, observer-inference exports, and weak-field matching inputs as quantities to be derived from the dynamics before downstream interpretation. |
| Open proof burden | Tri-binary minimality, shielding extraction, momentum-skew derivation, Floquet stability, photon closure, equivalence-principle export bounds, and downstream observer-geometry closure. |

The chapter should therefore be read as the stable dynamics layer beneath the causal-closure program. It preserves the mechanism and the diagnostic quantities while leaving the full theorem burden explicit.

### Causal-Closure Certificate Target

The rest-mass, moving-deformation, photon, observer-export, and event-ledger rows should be populated by one retained branch record, not by separately tuned fits. For a retained tri-binary branch class $q$ over a test window $W$, the shared certificate target is

$$
\mathcal{C}_{\mathrm{tri}}^{(q)}(W)
=
\left(
\mathcal{A}_q,
\nu_J^{(q)},
g_{\mathrm{inactive}}^{(q)},
h_{\mathrm{mem}}^{(q)},
\Delta_{\mathbf{k}}^{(q)},
\mathcal{D}_{\beta,q}^{\mathrm{mov}},
T_q(\mathbf{w}),
\mathcal{M}_{\mathrm{sea},q}^{ab},
\mathcal{R}_{\mathrm{mov},q},
\theta_{\mathrm{obs}}^{(q)},
\mathfrak{S}^{(q)}(W),
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right).
$$

Here $\mathcal{A}_q$ is the active causal-root ledger, $\nu_J^{(q)}$ the active Jacobian floor, $g_{\mathrm{inactive}}^{(q)}$ the inactive-root gap, $h_{\mathrm{mem}}^{(q)}$ the finite memory depth, and $\Delta_{\mathbf{k}}^{(q)}$ the Floquet or branch-stability gap. The remaining rows record the moving deformation map, absolute branch period, medium-dressed mass-response tensor, moving-branch residual, observer-export packet, active sector residuals, and row-indexed event ledger. The observer-export packet is not an effective metric or clock law; it is the branch-certified data that later observer-inference chapters must consume.

The branch identity check is

$$
d_{\mathcal{A}}^{(q)}
=
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{per}}^{(q)},
\mathcal{A}_{\mathrm{env}}^{(q)}
\right)
+
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{env}}^{(q)},
\mathcal{A}_{\mathrm{sig}}^{(q)}
\right)
+
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{sig}}^{(q)},
\mathcal{A}_{\mathrm{event}}^{(q)}
\right).
$$

The certificate can support promotion only if the branch floors and stability gap stay positive and the normalized closure residual

$$
\mathcal{U}_{\mathrm{tri}}^{(q)}(W)
=
\max\left(
\frac{d_{\mathcal{A}}^{(q)}}{\epsilon_{\mathcal{A}}},
\frac{\left\|\mathcal{R}_{\mathrm{mov},q}\right\|_W}{\epsilon_{\mathrm{mov}}},
\frac{\left\|\mathcal{M}_{\mathrm{sea},q}^{ab}-h^{ab}/c_{\text{eff}}^2\right\|_W}{\epsilon_{\mathrm{mass}}},
\frac{R_{\mathrm{div}T}^{(q)}+R_{\mathrm{Pois}}^{(q)}+R_{\mathrm{EFE}}^{(q)}+R_{\mathrm{var}}^{(q)}}{\epsilon_{\mathrm{GR}}},
\sup_{S\in\mathfrak{S}^{(q)}(W)}
\frac{\left\|\mathcal{R}_S^{(q)}\right\|_W}{\epsilon_S},
\frac{\left\|\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}\right\|_W}{\epsilon_{\mathrm{led}}}
\right)
\le1.
$$

This is a certificate target, not an additional force law. It prevents a moving-deformation ratio, a mass-response average, a photon row, or an observer-export residual from being promoted unless the same causal-root branch supplies the period, envelope, signal, observer-export, mass, sector, and event-ledger data.

### Substrate and Effective Levels

Tri-binary dynamics uses four levels of description:

| Level | Meaning |
| --- | --- |
| Substrate ontology | Euclidean void, absolute substrate time $t$, architrinos, causal wakes, and causal-root branch structure. |
| Assembly dynamics | Noether cores, three coupled binary layers, self-hit multiplicity, shielding, phase closure, and root-ledger transitions. |
| Observer-inference exports | Rest mass, photon propagation, reconstructed kinematics, geodesics, and horizon behavior as later reconstructed by assembly-built observers. |
| Inference and closure status | Mathematical closures that remain to be derived before effective claims can be treated as proved rather than reconstructed. |

The distinction matters because the Euclidean void is not being curved at the substrate level. Curvature, geodesic motion, lapse, and horizon language enter only as observer-level bookkeeping reconstructed downstream from Noether-Sea state variables and assembly response.

### Speed Hierarchy

Several speed symbols must remain separated:

| Symbol or phrase | Meaning |
| --- | --- |
| $c_f$ | Primitive wake propagation speed in the substrate. |
| $c_{\text{eff}}(\mathbf{x},t)$ | Noether-Sea dressed assembly-channel propagation speed used only after a downstream observer-channel map has been declared. |
| $c_\gamma(\mathbf{x},t)$ | Local photon-channel speed; equality with $c_{\text{eff}}(\mathbf{x},t)$ is a photon-channel closure target for the working observer-level photon branch, not a definition. |
| Locally measured light speed | The operational speed reconstructed downstream from assembly periods, rulers, and photon synchronization. |

The primitive speed $c_f$ is used for wake-intersection and self-hit geometry. The effective speed $c_{\text{eff}}$ belongs to Noether-Sea dressed closure and observer-level comparisons. These are not interchangeable. Any diagnostic that moves from primitive wake geometry to observer-level periods, rulers, or photons must declare its dressing map outside the primitive branch calculation.

### Multi-Scale Layer Locking

The baseline Noether core is not a stack of three identical circular binaries. It is a nested causal lock whose layers operate in different speed regimes. Let $s_\ell$ denote the characteristic speed of one member of layer $\ell$ around that layer's center. In the ordinary weak-stress regime, the target ordering is

$$
s_I > c_f,
\qquad
s_M \approx c_f,
\qquad
s_O < c_f.
$$

The inner binary is therefore self-hit and history-supported, the middle binary is the $\|\mathbf{v}\| = c_f$ hinge where root branches are most sensitive, and the outer binary is the sub-field-speed interface that controls shielding and boundary coupling. Their radii, cycle times, and history-window depths may differ by orders of magnitude. A reduced derivation can start with a separated-scale hypothesis such as $R_I \ll R_M \ll R_O$ and $T_I \ll T_M \ll T_O$, but the branch must report the actual hierarchy rather than hiding it in the notation.

This is why ordinary circular or elliptic orbit language is limited. A circular carrier can expose useful geometry and a separable layer ansatz can diagnose missing forces, but a tangential residual in that ansatz does not by itself settle the tri-binary problem. In a coupled lock, inter-layer wakes, self-hit roots, and near-separator branch changes can supply phase corrections that are absent from a single isolated two-body chart.

The same distinction applies to compact tri-binary carriers. A finite-coordinate no-go for one compact carrier rejects that branch chart and its declared coordinates; it does not falsify the $A_0$ branch program. Raw root-key splits, observation-phase bins, and fitted residual bases remain diagnostic unless they belong to a branch-native coordinate declared before fitting. A checker-cleared coordinate may seed only a rerun candidate; it is not physical branch structure until the same branch identity survives root-ledger transport, residual checks, and stability continuation.

The perturbation status should therefore be sorted before simplification:

| Perturbation class | Dynamics role |
| --- | --- |
| Nonresonant fast terms | Average over the closed tri-binary cycle and mostly affect convergence or small far-field corrections. |
| Resonant and near-separator terms | Change phase closure, causal-root counts, Jacobians, or Floquet multipliers, so they remain part of the branch definition. |
| Leakage terms | May be small internally while surviving as far-field multipoles or anisotropy, so they control the shielding extraction. |

### Mass Thesis as a Dynamics Target

The conservative mass thesis is that rest mass is not primitive architrino substance. It is the externally measurable response of shielded, phase-locked internal causal history.

In roadmap form, the target relation is

$$
m_0(A)c_{\text{eff}}^2
\sim
\zeta(A)E_{\text{internal}}(A),
$$

where $E_{\text{internal}}(A)$ is the trapped internal causal-history ledger of assembly $A$, and $\zeta(A)$ is the shielding or leakage factor that controls how much of that ledger couples to external probes. This is not yet a derived mass formula. It becomes a theorem only after the shielding factor, the internal energy ledger, and the first-order momentum-skew response are derived from the closed tri-binary dynamics.

### Spiral-Helical Motion Picture

A resting Noether core is modeled as a nested, phase-locked tri-binary structure with three coupled binary planes. When the core moves with center-of-mass velocity $\mathbf{V}_{\text{cm}}$, the rest-state circular or near-circular binary motions are drawn into braided spiral-helical cable patterns through the Euclidean void.

The spiral-helical picture is not decorative. A causal wake sent between partners, or between the inner, middle, and outer layers, must now reach a receiver that has moved during the wake's travel time. The internal phase geometry must therefore retune its pitch, radius, tilt, and timing to preserve the same closure ledger. In dynamics language, bulk velocity is encoded as internal geometry.

This is the common mechanical basis for three later downstream readouts:

- branch-period stretch, because each completed internal cycle requires a different causal path in absolute time;
- longitudinal ruler contraction, because inter-assembly spacing must retune for forward and backward exchange;
- inertial response, because acceleration forces the internal causal ledger to re-close under a changing kinematic bias.

### All-Layer Translating Branch Response

A translating Noether core is not described by one outer radius alone. The hidden state includes all three layer radii, frequencies, characteristic speeds, axes, active causal roots, and wake exchange:
$$
B_q(v)
=
\left(
R_I,R_M,R_O;\,
\omega_I,\omega_M,\omega_O;\,
s_I,s_M,s_O;\,
\mathbf{A}_I,\mathbf{A}_M,\mathbf{A}_O;\,
\mathcal{L}_{\mathrm{root}};\,
\mathcal{L}_{\mathrm{wake}}
\right)_q.
$$

The moving-branch extraction starts with a primitive drift band
$$
\mathcal{D}_{\beta_f}=\{\,0\le \|\mathbf{v}_{\text{trans}}\|/c_f\le\beta_{\max}<1\,\}.
$$
All causal roots in the branch ledger are solved with $c_f$ and absolute time $t$. No dressed observer-channel speed is allowed inside this branch calculation.

For the same admitted branch $q$, extract semiaxes from the cycle-averaged tri-binary shape tensor
$$
Q_{ab}^{(q)}(\mathbf{v}_{\text{trans}})
=
\frac{1}{M_q}
\left\langle
\sum_i m_i\,r_{i,a}r_{i,b}
\right\rangle_{\mathrm{cyc},q},
\qquad
M_q=\sum_i m_i.
$$
With drift direction $\hat{\mathbf e}_{\parallel}$ and transverse projector $P_{\perp}^{ab}=\delta^{ab}-\hat e_{\parallel}^{a}\hat e_{\parallel}^{b}$, define
$$
R_{\parallel,q}(\mathbf{v}_{\text{trans}})
=
\sqrt{\hat e_{\parallel}^{a}Q_{ab}^{(q)}\hat e_{\parallel}^{b}},
\qquad
R_{\perp,q}(\mathbf{v}_{\text{trans}})
=
\sqrt{\frac{1}{2}P_{\perp}^{ab}Q_{ab}^{(q)}}.
$$
The physical branch period is extracted from a declared layer or composite phase on that same branch ledger:
$$
T_q(\mathbf{v}_{\text{trans}})
=
\frac{2\pi}{\langle\dot{\theta}_{q}\rangle_{\mathrm{cyc}}},
\qquad
T_{q,0}=T_q(\mathbf{0}),
$$
where the dot means $d/dt$ with respect to absolute substrate time.

#### Absolute Cycle-Stretch Theorem Target

Let
$$
N_{\text{hits},q}
=
\left(
N_{\ell\rho}^{(q)}
\right)_{\ell\in\{I,M,O\},\,\rho\in\{\mathrm{self},\mathrm{partner},\mathrm{inter}\}}
\in\mathbb{N}^{m_q}
$$
be the integer ledger of causal roots required to complete one primitive branch rotation. Its total hit count is
$$
|N_{\text{hits},q}|_1
=
\sum_{\ell,\rho}N_{\ell\rho}^{(q)}.
$$
Preserving the same branch means preserving this integer ledger, the source identities of the roots, their emission-order classes, the positive Jacobian floor, and the phase-return condition over the whole cycle.
Equivalently, let $\mathcal{H}_q$ be the ordered multiset of retained hit rows represented by $N_{\text{hits},q}$.

For a retained transverse closure row $a$ with rest closure length $\ell_a>0$, a translating receiver must intercept the wake after both the internal closure displacement and the center translation have occurred. In the reduced orthogonal row,
$$
c_f^2\left(\Delta t_a\right)^2
=
\ell_a^2
+
\|\mathbf{v}_{\text{trans}}\|^2\left(\Delta t_a\right)^2,
$$
so
$$
\Delta t_a(\mathbf{v}_{\text{trans}})
=
\frac{\ell_a}{\sqrt{c_f^2-\|\mathbf{v}_{\text{trans}}\|^2}}
=
\frac{\Delta t_a(\mathbf{0})}
{\sqrt{1-\|\mathbf{v}_{\text{trans}}\|^2/c_f^2}}.
$$
Thus any retained ledger that requires nonzero transverse closure rows has a larger absolute-time delay per such row when $\mathbf{v}_{\text{trans}}\ne\mathbf{0}$, unless the internal geometry retunes. A branch-period decomposition has the schematic form
$$
T_q(\mathbf{v}_{\text{trans}})
=
\sum_{a\in \mathcal{H}_q}
\Delta t_a(\mathbf{v}_{\text{trans}})
+
\mathcal{R}_{\mathrm{phase},q},
$$
where $\mathcal{R}_{\mathrm{phase},q}$ records finite-memory, inter-layer, and phase-return corrections on the same retained branch chart. The theorem target is:
$$
N_{\text{hits},q}(\mathbf{v}_{\text{trans}})=N_{\text{hits},q}(\mathbf{0}),
\quad
\nu_J^{(q)}>0,
\quad
\Delta_{\mathbf{k}}^{(q)}>0
\quad\Longrightarrow\quad
T_q(\mathbf{v}_{\text{trans}})\ge T_{q,0},
$$
with strict inequality for nonzero translation unless a compensating shape retuning changes the relevant $\ell_a$ rows. This is an absolute-time period theorem target, not a statement about observer clock time.

#### Mechanical Oblation From the Jacobian

The causal Jacobian is the dynamics-side mechanism behind the moving-source flux change that standard field language would otherwise hide inside a changing electric field. For a retained root row $a=(i,j,t_0)$,
$$
J_a
=
1-
\frac{\mathbf{v}_j(t_0)\cdot\hat{\mathbf r}_{ij}(t;t_0)}{c_f},
\qquad
w_a
=
\frac{1}{r_a^2|J_a|}.
$$
The branch force contribution is proportional to $w_a\hat{\mathbf r}_a$. Decompose the source velocity into center translation plus internal motion,
$$
\mathbf{v}_j(t_0)
=
\mathbf{v}_{\text{trans}}
+
\mathbf{u}_j(t_0).
$$
On a retained chart away from grazing, the translation part changes the received weight by
$$
|J_a|^{-1}
=
\left|
1-
\frac{\mathbf{v}_{\text{trans}}\cdot\hat{\mathbf r}_a}{c_f}
-
\frac{\mathbf{u}_j(t_0)\cdot\hat{\mathbf r}_a}{c_f}
\right|^{-1}.
$$
Cycle-paired longitudinal rows with $\hat{\mathbf r}_a=\pm\hat{\mathbf e}_{\parallel}$ acquire the symmetric translation weight
$$
\frac12
\left(
\frac{1}{1-\beta_f}
+
\frac{1}{1+\beta_f}
\right)
=
\frac{1}{1-\beta_f^2},
\qquad
\beta_f=\frac{\|\mathbf{v}_{\text{trans}}\|}{c_f},
$$
whereas ideal transverse rows with $\mathbf{v}_{\text{trans}}\cdot\hat{\mathbf r}_a=0$ do not receive this translation amplification at the same order. Therefore the same radial inverse-square law becomes anisotropic after the branch is translated:
$$
\langle w\rangle_{\parallel}
-
\langle w\rangle_{\perp}
\sim
\frac{1}{r^2}
\left(
\frac{1}{1-\beta_f^2}-1
\right)
+\mathcal{R}_{u,J}.
$$
Here $\mathcal{R}_{u,J}$ records internal-motion, unequal-radius, finite-memory, and unpaired-row corrections.

For attractive partner rows this larger longitudinal weight increases the cycle-averaged longitudinal restoring stiffness. If $K_{\parallel}^{(q)}$ and $K_{\perp}^{(q)}$ denote the Hessian projections of the retained branch potential reconstructed from the same Jacobian-weighted rows, the oblation target is
$$
K_{\parallel}^{(q)}
>
K_{\perp}^{(q)}
\quad\Longrightarrow\quad
\frac{R_{\parallel,q}}{R_{\perp,q}}
\sim
\sqrt{\frac{K_{\perp}^{(q)}}{K_{\parallel}^{(q)}}}
<1.
$$
The physical squash into an oblate $R_{\parallel}<R_{\perp}$ branch is therefore not imported from a relativistic metric. It is the mechanical response to the $1/|J|$ wake-flux asymmetry created by translating the same causal-root ledger through the Euclidean void.

A one-$h$ closed-cycle action transaction is a candidate map between stable branch states,
$$
B_q(\mathbf{v}_{\text{trans}})
\longrightarrow
B_{q'}(\mathbf{v}_{\text{trans}}+\Delta\mathbf{v}),
$$
subject to the all-layer action and energy ledgers
$$
\Delta A_{\mathrm{cyc}}\equiv\Delta A_{\text{cycle}}=\sigma h,
\qquad
\Delta I_I+\Delta I_M+\Delta I_O+\Delta I_{\text{wake}}=\sigma\hbar,
$$
$$
\sum_{\ell\in\{I,M,O\}}
\int_{B_q\to B_{q'}}\omega_\ell\,dI_\ell
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}}.
$$
Thus acceleration, absorption, or any accepted transaction can change all three $\omega_\ell$, all three $R_\ell$, and all three $s_\ell$. The outer binary is the leading envelope projector because it is the exposed boundary layer. The middle binary remains the separator-sensitive hinge, and the inner binary remains the self-hit/history-supported engine. Dropping the middle or inner layer is therefore a reduced observable model, not a proof of translating-branch closure.

### Cadence-Scale Retuning Closure

The retuning-map problem is the local dynamics version of the one-$h$ transaction. On a branch chart $q$, define

$$
\mathbf{y}_q
=
\left(
\ln\nu_I,\ln\nu_M,\ln\nu_O,\,
\ln R_I,\ln R_M,\ln R_O,\,
\ln\lambda,\ln\xi
\right)^{T},
\qquad
\omega_\ell=2\pi\nu_\ell.
$$

The layer-speed identities give the first kinematic constraint:

$$
\Delta\ln s_\ell
=
\Delta\ln R_\ell
+
\Delta\ln\nu_\ell,
\qquad
\ell\in\{I,M,O\}.
$$

The simple inverse rule $\Delta\ln R_\ell=-\Delta\ln\nu_\ell$ is therefore valid only on a sub-branch where $\Delta\ln s_\ell=0$. The ordinary tri-binary speed hierarchy instead imposes inequalities and hinge tolerances:

$$
s_I'>c_f,
\qquad
\left|s_M'-c_f\right|\le\epsilon_M c_f,
\qquad
s_O'<c_f,
$$

where primed quantities are evaluated after retuning and $\epsilon_M$ is the declared middle-hinge tolerance. A transaction that violates these conditions is not a smooth retuning inside the same regime; it is a branch event at the speed-regime boundary.

The first calculable closure can be written as a constrained compliance problem. Let $\mathcal{C}_q(\mathbf{y},\mathcal{G})=0$ collect the phase-closure, causal-root, separator, inter-layer exchange, and stability constraints. Let $\mathbf{K}^{\mathrm{ret}}_q$ be the positive semidefinite local compliance matrix for retuning costs on the declared branch chart. Then the candidate increment is

$$
\Delta\mathbf{y}_{q,\sigma}
=
\underset{\Delta\mathbf{y}}{\operatorname{arg\,min}}\;
\frac{1}{2}
\Delta\mathbf{y}^{T}
\mathbf{K}^{\mathrm{ret}}_q
\Delta\mathbf{y},
$$

subject to

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
\sigma h,
\qquad
D\mathcal{C}_q[\Delta\mathbf{y}]
+
\Delta\mathcal{C}_{\mathcal{G}}
=0,
$$

and to the post-retuning speed-regime inequalities above. The matrix $\mathbf{K}^{\mathrm{ret}}_q$ is not a new force law. It is the local second-variation record of how costly it is for the accepted branch to place the action increment into cadence, layer scale, envelope shape, orientation, or wake exchange. In a simulation, it should be estimated from the linearized return map or from finite retuning trials around an admitted branch.

The cadence-scale retuning map is then the projection

$$
\mathcal{R}_{\mathrm{cyc}}^{(q,\sigma)}
=
\Pi_{\mathrm{ret}}
\left(
\Delta\mathbf{y}_{q,\sigma},
\Delta\mathcal{G}_{q,\sigma}
\right),
$$

with

$$
\Pi_{\mathrm{ret}}
\left(
\Delta\mathbf{y},
\Delta\mathcal{G}
\right)
=
\left(
\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi
\right).
$$

This map is falsifiable at the branch level. It fails if no admissible minimizer exists, if the minimizer crosses a separator while being treated as same-branch drift, if the middle hinge leaves its declared tolerance, if the envelope projection and branch-period stretch come from different retained ledgers, or if the wake-ledger residual is large enough to survive hierarchy averaging. These are not bookkeeping nuisances; they are the diagnostics that decide whether the same one-$h$ transaction can become the Noether-Sea cadence current used in cosmology.

The first reduced validation model for this target is [Retuning-Map Toy Model](../../../../markdown/aaa/validation/simulations/retuning-map-toy-model.md), with runtime script `scripts/tri-binary/retuning-map-toy-model.mjs`. That model solves the linearized constrained compliance problem and reports the induced $J_\nu$ estimate. It is a branch-bookkeeping scaffold, not delayed-dynamics validation.

### Observer-Inference Export Boundary

This dynamics chapter exports branch-certified substrate records, not observer geometry. The reusable export packet is
$$
\mathcal{E}_{q}^{\mathrm{obs}}
=
\left(
N_{\text{hits},q},
T_q,
Q_{ab}^{(q)},
K_{\parallel}^{(q)},
K_{\perp}^{(q)},
\nu_J^{(q)},
\Delta_{\mathbf{k}}^{(q)},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right).
$$
Every entry is computed in absolute time from the retained causal-root chart. Later observer-inference chapters may ask whether this packet recovers clock behavior, ruler behavior, photon synchronization, or effective geometry. Those are downstream recovery tests. They are not definitions, assumptions, or integration variables in tri-binary dynamics.

### Terminal Alignment Label-Count Target

The black-hole entropy route requires a dynamics-side label calculation. Once a Noether-core branch is driven to terminal alignment, the dynamics should output the admissible alignment-restricted closure labels and their neighbor-compatibility rules. For a connected block $U$ of horizon-adjacent alignment patches, the object is
$$
\mathcal{L}_U(\theta)
=
\left\{
\left(\Lambda_{\text{NC},a}^{\mathrm{align}}\right)_{a\in U}
:
\text{all layer ledgers close, edge wake ledgers match, and } \theta \text{ is preserved}
\right\}
/
\sim_{O,\theta,W}.
$$

The first calculation route is a transfer-compatibility problem. Fix a local strip direction $\nu$ on the horizon-adjacent interface. Let $\Lambda_{\theta}^{\mathrm{loc}}$ be the set of one-patch labels $\lambda$ obtained from $\Lambda_{\text{NC}}^{\mathrm{align}}$ after imposing one-patch layer closure, terminal-alignment conditions, and the Physical Observer quotient for the declared record $\theta$. Each $\lambda\in\Lambda_{\theta}^{\mathrm{loc}}$ carries two edge projections $\mathcal{E}_{\nu}^{-}(\lambda)$ and $\mathcal{E}_{\nu}^{+}(\lambda)$: the active causal-root, winding, emission-order, Jacobian-branch, and wake-exchange data presented to the two neighboring patches in the $\nu$ direction.

Define the pair-compatibility predicate $\mathcal{C}_{\theta,\nu}(\lambda,\lambda')$ to hold exactly when:

- $\mathcal{E}_{\nu}^{+}(\lambda)=\mathcal{E}_{\nu}^{-}(\lambda')$ up to the declared observer tolerance,
- the edge balance satisfies $(\Delta E,\Delta\mathbf{p},\Delta\mathbf{J},\Delta q)_{\lambda,\lambda'}=(0,\mathbf{0},\mathbf{0},0)$,
- the chirality entry $\chi_c$ and axial-frame orientation remain compatible under the coplanar/co-linear terminal-alignment condition,
- and the combined pair projects to the same observer record, $\mathcal{R}_{O,W}(\lambda,\lambda')=\mathcal{R}_{O,W}^{\theta}$.

The first counting matrix is therefore
$$
\left(\mathsf{T}_{\theta,\nu}\right)_{\lambda\lambda'}
=
\begin{cases}
1, & \mathcal{C}_{\theta,\nu}(\lambda,\lambda'),\\
0, & \text{otherwise},
\end{cases}
\qquad
\lambda,\lambda'\in\Lambda_{\theta}^{\mathrm{loc}}.
$$
This is a counting matrix, not a thermodynamic weight. For an open strip of $N$ patches,
$$
\left|\mathcal{L}_{[1,N]}(\theta)\right|
=
\mathbf{1}^{T}
\mathsf{T}_{\theta,\nu}^{N-1}
\mathbf{1}
+
\mathcal{O}(\epsilon_{\mathrm{edge}}),
$$
while a periodic strip uses $\mathrm{Tr}(\mathsf{T}_{\theta,\nu}^{N})$. If the label set is finite and the transfer rule is local, the strip entropy density is
$$
s_{\mathrm{align}}(\theta;\nu)
=
\lim_{N\to\infty}
\frac{1}{N}
\log\left|\mathcal{L}_{[1,N]}(\theta)\right|
=
\log\rho(\mathsf{T}_{\theta,\nu}),
$$
where $\rho$ is the spectral radius. In a two-dimensional patch network the same target becomes the subadditive pressure
$$
s_{\mathrm{align}}(\theta)
=
\lim_{|U|\to\infty}
\frac{1}{|U|}
\log\left|\mathcal{L}_U(\theta)\right|,
$$
with the limit taken over blocks whose boundary-to-area ratio vanishes.

One algebraic obstruction fixes the status of the raw label-density target. A single finite unweighted or algebraic-weighted transfer matrix cannot by itself yield an exact raw coefficient $s_{\mathrm{align}}=1/4$: the spectral radius $\rho(\mathsf{T}_{\theta,\nu})$ is algebraic, while $\log\rho=1/4$ would require $\rho=e^{1/4}$, which is transcendental by Lindemann-Weierstrass. The black-hole coefficient is therefore the area-normalized density, not the raw label density by itself. If $A_{\theta}(U)$ is the effective observer-level area represented by a block and $A_{\text{align}}$ is the alignment-area scale from the Planck-alignment map, define
$$
a_{\theta}
=
\lim_{|U|\to\infty}
\frac{A_{\theta}(U)}
{|U|A_{\text{align}}},
\qquad
\bar{\alpha}_{\mathrm{align}}(\theta)
=
A_{\text{align}}
\lim_{|U|\to\infty}
\frac{\log|\mathcal{L}_U(\theta)|}{A_{\theta}(U)}
=
\frac{s_{\mathrm{align}}(\theta)}{a_{\theta}}.
$$
The horizon target is
$$
\bar{\alpha}_{\mathrm{align}}(\theta)
\longrightarrow
\frac{1}{4}.
$$
The special raw statement $s_{\mathrm{align}}\to1/4$ is valid only when the terminal branch also derives $a_{\theta}\to1$. Exact recovery can therefore come from an asymptotic transfer system, a weighted pressure, a block-density limit with derived area normalization, or an explicitly approximate tolerance target rather than one fixed counting matrix. A finite computation should report a convergence criterion of the form
$$
\left|
\frac{s_N(\theta)}{a_N(\theta)}
-
\frac{1}{4}
\right|
\le
C\frac{|\partial U_N|}{|U_N|}
+
\epsilon_{\mathrm{branch}}
+
\epsilon_{\mathrm{quot}},
$$
where $a_N(\theta)=A_{\theta}(U_N)/(|U_N|A_{\text{align}})$. This tests the area coefficient as a controlled limit rather than hiding it inside one finite count.

**Finite-block coefficient enumerator.** A reduced enumerator can now report the coefficient target without pretending to solve the full terminal dynamics. For a finite connected block $U_N$ of candidate labels, compute
$$
s_N(\theta)
=
\frac{1}{|U_N|}
\log|\mathcal{L}_{U_N}(\theta)|,
\qquad
a_N(\theta)
=
\frac{A_{\theta}(U_N)}
{|U_N|A_{\text{align}}},
\qquad
\bar{\alpha}_N(\theta)
=
\frac{s_N(\theta)}{a_N(\theta)}.
$$
The finite-block residual vector is
$$
\mathcal{R}_{\mathrm{coeff}}(U_N,\theta)
=
\left(
\left|\bar{\alpha}_N(\theta)-\frac{1}{4}\right|,
\frac{|\partial U_N|}{|U_N|},
\epsilon_{\mathrm{branch}},
\epsilon_{\mathrm{area}},
\epsilon_{\mathrm{quot}},
\epsilon_{\mathrm{cons}},
\epsilon_{\mathrm{var}}
\right).
$$
Here $\epsilon_{\mathrm{area}}$ records how much the patch-area assignment varies across the retained block, $\epsilon_{\mathrm{cons}}$ is the conservation-ledger residual, and $\epsilon_{\mathrm{var}}$ is the action-variation residual inherited from the terminal branch scaffold below. This object is the right simulation output: it can pass, fail, or converge under refinement without turning the coefficient into a definition.

**Current reduced-adapter status.** The present reduced circular packet family does not converge to the target coefficient. In the tested $3\le n\le5$ packets, the edge proxy gives
$$
\bar{\alpha}_8=0.22397,
\qquad
\bar{\alpha}_{16}=0.11198,
\qquad
\bar{\alpha}_{32}=0.05599,
$$
while the widened $3\le n\le6$ packet gives
$$
\bar{\alpha}_{16}=0.14391,
\qquad
\bar{\alpha}_{32}=0.07196.
$$
These values scale like a finite-label open-strip count divided by block length, with asymptotic proxy coefficient $0$, rather than trending toward $1/4$. Coarse and strict quotients coincide on these packets. The action-complete transfer has no accepted transfer edges, so its coefficient is undefined rather than near the target. This is a failure of the reduced adapter as a horizon-coefficient proof, not a failure of the coefficient target itself.

The next diagnostic transfer relation has now been made explicit. For each sampled terminal branch, pair the receiver impulse with the equal-and-opposite source recoil at the emission event and define
$$
\Delta\Pi_b^{\mathrm{pair}}
=
\Delta\Pi_{b,\mathrm{recv}}
+
\Delta\Pi_{b,\mathrm{src}},
\qquad
\Delta\Pi=(\Delta E,\Delta\mathbf{p},\Delta J,\Delta q).
$$
Also record the per-branch stationarity residual
$$
\epsilon_{\mathrm{stat}}(\lambda)
=
\max_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\left\|
\left.
\partial_{t_0}
\left[
\frac{\hat{\mathbf r}_b(t_b,t_0)}
{r_b(t_b,t_0)J_b(t_b,t_0)}
\right]
\right|_{t_0=t_b-\Delta_b}
\right\|.
$$
The executable now also records the branch-summed receiver residual after the direct inverse-square term is removed:
$$
\epsilon_{\mathrm{sum}}(\lambda)
=
\max_{\alpha}
\left\|
\sum_{b\to\alpha}
\frac{\operatorname{sign}(q_{j_b}q_{i_b})}{|J_b|}
\left.
\partial_{t_0}
\left[
\frac{\hat{\mathbf r}_b(t_b,t_0)}
{r_b(t_b,t_0)J_b(t_b,t_0)}
\right]
\right|_{t_0=t_b-\Delta_b}
\right\|,
$$
where $\alpha$ ranges over sampled receiver phase keys. The dynamics-backed transfer predicate is therefore the earlier edge-match condition plus closure of the paired source-recoil ledger, the cycle residual, and $\epsilon_{\mathrm{sum}}$; $\epsilon_{\mathrm{stat}}$ remains an obstruction diagnostic. In the current executable packet this `terminal_dynamic` transfer has zero accepted edges. With $3\le n\le5$, `phase-samples = 12`, and the layer-sum area proxy, the edge-only coefficient is $\bar{\alpha}_{16}=0.09174$, but the terminal-dynamic coefficient is undefined; $\epsilon_{\mathrm{stat}}^{\max}$ is about $166.83$ and $\epsilon_{\mathrm{sum}}^{\max}$ is about $607.78$. With $3\le n\le6$, the edge-only coefficient is $\bar{\alpha}_{16}=0.12120$, while the terminal-dynamic transfer remains empty; $\epsilon_{\mathrm{stat}}^{\max}$ rises to about $322.67$ and $\epsilon_{\mathrm{sum}}^{\max}$ rises to about $1729.02$. Thus the obstruction is not merely the observer quotient or area normalization. The reduced concentric terminal ansatz fails the action-variation and cycle-support tests before it can become a horizon-interface transfer system.

The first bounded branch-family variation gives the same conclusion. The executable phase-offset family keeps the centers concentric but changes the layer phases by
$$
\phi_I=-2\pi f,
\qquad
\phi_M=2\pi f,
\qquad
\phi_O=0,
$$
with tested offsets $f=1/8$ and $f=1/4$. These packets raise the delayed inter-layer root inventory to $288$ sampled roots per candidate, but the terminal-dynamic transfer still has zero accepted edges under both coarse and strict quotients. For $3\le n\le5$, the edge-only coefficient remains $\bar{\alpha}_{16}=0.09174$ while $\epsilon_{\mathrm{stat}}^{\max}$ is about $179.54$ at $f=1/8$ and about $166.83$ at $f=1/4$; the corresponding $\epsilon_{\mathrm{sum}}^{\max}$ values are about $608.87$ and $626.17$. For $3\le n\le6$, the edge-only coefficient remains $\bar{\alpha}_{16}=0.12120$, $\epsilon_{\mathrm{stat}}^{\max}$ reaches about $322.67$, and $\epsilon_{\mathrm{sum}}^{\max}$ reaches about $2067.83$. A bounded phase offset therefore does not rescue the reduced circular terminal ansatz.

The first shifted-center branch family is now also negative. The executable `shifted-center` family keeps the circular speeds and layer phases fixed, but places the three circular centers at
$$
\mathbf{c}_I=(-\epsilon_c R_O,0),
\qquad
\mathbf{c}_M=\left(\frac{\epsilon_c R_O}{2},\frac{\sqrt{3}\epsilon_c R_O}{2}\right),
\qquad
\mathbf{c}_O=\left(\frac{\epsilon_c R_O}{2},-\frac{\sqrt{3}\epsilon_c R_O}{2}\right),
$$
where $R_O=1/\omega_O$ is the outer alignment radius and $\epsilon_c$ is the tested center-shift fraction. Runs at $\epsilon_c=0.01$, $0.05$, and $0.10$ again raised the delayed inter-layer inventory to $288$ sampled roots per candidate, but they produced zero terminal-dynamic transfer edges. The $\epsilon_c=0.05$ and $\epsilon_c=0.10$ packets were empty even at the edge-proxy level for $3\le n\le5$ and $3\le n\le6$. The smaller $\epsilon_c=0.01$ packet produced only one widened edge-proxy edge at $3\le n\le6$, with zero finite-block coefficient and still no terminal-dynamic edge. The sampled stationarity residuals remained large: $\epsilon_{\mathrm{stat}}^{\max}$ was about $620.96$ to $1026.11$ for $\epsilon_c=0.01$, about $965.98$ to $1103.36$ for $\epsilon_c=0.05$, and about $693.97$ for $\epsilon_c=0.10$; the branch-summed residual was larger still, reaching about $9243.89$, $4569.36$, and $5941.09$ respectively. Thus small shifted centers make the reduced chart more brittle rather than more entropy-bearing. The next useful variation must change the action kernel, the wake-memory ledger, or the observer quotient, not merely the first-order circular geometry.

At the present derivation level, the admissible one-patch labels can be enumerated as a finite branch-ledger schema, not yet as a numerical table. For a primitive outer-period closure, the integer-lock notation gives
$$
(k_I,k_M,k_O)=(n,m,1),
\qquad
1<m<n,
$$
with longer closure periods represented by common integer multiples before reduction to the primitive label. For each layer $\ell\in\{I,M,O\}$, write $\sigma_\ell=s_\ell/c_f$ in the circular reduced root chart. The binary root vocabulary supplies finite active branch sets on any resolved terminal branch:
$$
\mathcal{M}_{s,\ell}
=
\left\{
r\in\mathbb{Z}_{\ge0}
:
\tilde{\delta}_{s,\ell}+2\pi r
=
2\sigma_\ell\sin(\tilde{\delta}_{s,\ell}/2)
\right\},
$$
$$
\mathcal{M}_{p,\ell}
=
\left\{
r\in\mathbb{Z}_{\ge0}
:
\tilde{\delta}_{p,\ell}+2\pi r
=
2\sigma_\ell\cos(\tilde{\delta}_{p,\ell}/2)
\right\}.
$$
Branch-birth or grazing cases, where a Jacobian ceases to be transversal, must be split into their own boundary class rather than silently folded into a smooth label.

Thus the current one-patch candidate has the form
$$
\lambda
=
\left(
(n,m,1);\,
(\mathcal{M}_{s,\ell},\mathcal{M}_{p,\ell},J_{\ell},\prec_{\ell})_{\ell=I,M,O};\,
\mathcal{G}_{IM}^{\mathrm{align}},\mathcal{G}_{IO}^{\mathrm{align}},\mathcal{G}_{MO}^{\mathrm{align}};\,
\chi_c;\,
\mathcal{E}_{\nu}^{-},\mathcal{E}_{\nu}^{+};\,
\mathcal{R}_{O,W}^{\theta}
\right),
$$
where $J_{\ell}$ collects the active branch Jacobians and $\prec_{\ell}$ records the emission-order relation within the layer. The finite candidate set is the subset of these labels satisfying exact one-patch phase closure, terminal-alignment conditions, edge conservation, inter-layer wake compatibility, and the observer quotient:
$$
\Lambda_{\theta}^{\mathrm{loc}}
\subseteq
\left\{
\lambda:
\Delta E=\Delta\mathbf{p}=\Delta\mathbf{J}=0,\;
\Delta q=0,\;
\mathcal{R}_{O,W}(\lambda)=\mathcal{R}_{O,W}^{\theta}
\right\}
/
\sim_{O,\theta,W}.
$$

This makes the next missing equations precise. To turn the schema into an actual transfer matrix, the dynamics must supply: first, the terminal branch equations fixing $(s_\ell,R_\ell,\omega_\ell,\mathbf{A}_\ell)$ under $v_M=c_f$, $v_O\to c_f$, and coplanar/co-linear alignment; second, the inter-layer maps that reduce $\mathcal{G}_{IM}^{\mathrm{align}},\mathcal{G}_{IO}^{\mathrm{align}},\mathcal{G}_{MO}^{\mathrm{align}}$ to boundary wake data; and third, the observer-record quotient that decides which edge distinctions remain visible in $\theta$.

An edge-map scaffold can be written before the terminal branch is numerically solved. Let $\mathbf{n}_{\nu}$ be the outward unit normal for the chosen local edge direction, and let $\mathcal{B}_{\mathrm{term}}(\lambda)$ be the finite set of active layer and inter-layer causal branches retained by the terminal one-patch label. Each branch $b\in\mathcal{B}_{\mathrm{term}}(\lambda)$ has a source $j_b$, receiver $o_b$, emission time $t_{0,b}$, reception time $t_b$, winding or root index $r_b$, root type $\tau_b\in\{\text{self},\text{partner},\text{inter-layer}\}$, line of action
$$
\hat{\mathbf{r}}_b
=
\frac{\mathbf{x}_{o_b}(t_b)-\mathbf{x}_{j_b}(t_{0,b})}
{\left\|\mathbf{x}_{o_b}(t_b)-\mathbf{x}_{j_b}(t_{0,b})\right\|},
$$
and branch Jacobian
$$
J_b
=
1
-
\frac{\mathbf{v}_{j_b}(t_{0,b})\cdot\hat{\mathbf{r}}_b}{c_f}.
$$
The branch is admissible only when its causal-root equation closes,
$$
\left\|\mathbf{x}_{o_b}(t_b)-\mathbf{x}_{j_b}(t_{0,b})\right\|
=
c_f(t_b-t_{0,b}),
\qquad
J_b\ne0,
$$
and the terminal label also satisfies the integer-lock and alignment constraints
$$
\omega_O T=2\pi,\qquad
\omega_M T=2\pi m,\qquad
\omega_I T=2\pi n,
$$
$$
s_M=c_f,\qquad
s_O\to c_f,\qquad
\max_{\ell,\ell'}\arccos(\hat{\mathbf{A}}_\ell\cdot\hat{\mathbf{A}}_{\ell'})\to0.
$$

For such a branch, define the boundary-facing datum
$$
\mathfrak{d}_{\nu}^{\pm}(b)
=
\left[
\tau_b,\,
\ell(j_b),\ell(o_b),\,
r_b,\,
t_{0,b}\bmod T,\,
\operatorname{sgn}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}),\,
J_b,\,
\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu},\,
\mathbf{a}_{o_b\leftarrow j_b}(t_b;t_{0,b})\cdot\mathbf{n}_{\nu}
\right]_{O,\theta,W}
$$
whenever $\pm(\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu})>0$. Here $[\cdot]_{O,\theta,W}$ means that distinctions erased by the Physical Observer quotient for record $\theta$ are already identified. The edge maps are then the multisets after the observer quotient:
$$
\mathcal{E}_{\nu}^{\pm}(\lambda)
=
\left\{
\mathfrak{d}_{\nu}^{\pm}(b)
:
b\in\mathcal{B}_{\mathrm{term}}(\lambda),\,
\pm(\hat{\mathbf{r}}_b\cdot\mathbf{n}_{\nu})>0
\right\}.
$$
This equation is the derived projection target: it reduces each terminal one-patch branch ledger to the wake data presented across one edge. The still-open numerical step is solving $\mathcal{B}_{\mathrm{term}}(\lambda)$ from the full three-layer state-dependent delayed equations, including the regularized action and energy ledger that assigns the conserved increments used in $\mathcal{C}_{\theta,\nu}$.

The reduced terminal branch system can be stated as a finite residual problem on the primitive outer period. Choose $T>0$ and integers $1<m<n$, set
$$
\omega_O=\frac{2\pi}{T},
\qquad
\omega_M=m\omega_O,
\qquad
\omega_I=n\omega_O,
$$
and represent the aligned circular branch by
$$
\mathbf{x}_{\ell,\alpha}(t)
=
\mathbf{c}_{\ell}
+
\alpha R_{\ell}
\mathbf{e}\!\left(\omega_\ell t+\phi_\ell\right),
\qquad
\ell\in\{I,M,O\},
\qquad
\alpha\in\{+1,-1\},
$$
where $\mathbf{e}(\psi)$ is the unit vector in the common terminal plane. The phase-lock and terminal-alignment constraints are
$$
\phi_M-m\phi_O=\phi_{MO}^{\ast},
\qquad
\phi_I-n\phi_O=\phi_{IO}^{\ast},
$$
$$
R_\ell\omega_\ell=s_\ell,
\qquad
s_M=c_f,
\qquad
s_O\to c_f,
\qquad
\mathbf{A}_I=\mathbf{A}_M=\mathbf{A}_O
$$
up to the declared terminal-alignment tolerance. The intra-layer branches use the self-hit and partner-hit equations above. The inter-layer candidates are the delayed roots
$$
F_b(\Delta_b)
\equiv
\left\|
\mathbf{x}_{\ell_o,\alpha_o}(t_b)
-
\mathbf{x}_{\ell_j,\alpha_j}(t_b-\Delta_b)
\right\|
-
c_f\Delta_b
=
0,
$$
with $0<\Delta_b\le H_{\lambda}$ for the finite history window assigned to $\lambda$, layer pair $(\ell_j,\ell_o)\in\{(I,M),(I,O),(M,O),(M,I),(O,I),(O,M)\}$, signs $\alpha_j,\alpha_o\in\{+1,-1\}$, and emission phase recorded modulo $T$. The branch is kept in $\mathcal{B}_{\mathrm{term}}(\lambda)$ only if it is transversal,
$$
J_b
=
1
-
\frac{\mathbf{v}_{\ell_j,\alpha_j}(t_b-\Delta_b)\cdot\hat{\mathbf{r}}_b}{c_f}
\ne0,
$$
and belongs to the same integer-lock, emission-order, and observer-record class as $\lambda$.

The remaining dynamics are not another gate; they are the equations that decide whether a proposed branch label exists. For each terminal branch label, the cycle-averaged squared residual must vanish:
$$
\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}(\lambda)
=
\frac{1}{T}
\int_0^T
\left\|
\ddot{\mathbf{x}}_{\ell,\alpha}(t)
-
\sum_{b:\,o_b=(\ell,\alpha)}
\mathbf{a}_{o_b\leftarrow j_b}(t;t-\Delta_b)
\right\|^2
dt
=
0,
$$
with the same branch set also satisfying the local conservation ledger
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\left(
\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b
\right)
=
(0,\mathbf{0},\mathbf{0},0).
$$
This defines the current reduced solve: $\mathcal{B}_{\mathrm{term}}(\lambda)$ is the finite set of intra-layer and inter-layer roots satisfying the terminal kinematics, transversality, cycle-averaged dynamics, conservation ledger, and observer quotient. A numerical enumeration can now target these equations directly; if no solution has $|J_b|$ bounded away from zero, the label must be reclassified as a grazing boundary case rather than counted as an interior transfer-matrix state.

In the symmetric common-center specialization, the inter-layer root problem reduces to scalar root curves over the outer phase. Set
$$
\mathbf{c}_I=\mathbf{c}_M=\mathbf{c}_O,
\qquad
q_I=n,\quad q_M=m,\quad q_O=1,
\qquad
u=\omega_O t\pmod{2\pi},
$$
and introduce dimensionless layer radii
$$
x_\ell
=
\frac{\omega_O R_\ell}{c_f}
=
\frac{s_\ell/c_f}{q_\ell}.
$$
For a branch from source layer $\ell_j$ and sign $\alpha_j$ to receiver layer $\ell_o$ and sign $\alpha_o$, write the outer-period delay as $\delta=\omega_O\Delta$. The phase separation is
$$
\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
(q_o-q_j)u
+
q_j\delta
+
\phi_o-\phi_j,
$$
and the causal-root equation becomes
$$
\delta
=
\left[
x_o^2+x_j^2
-
2\alpha_o\alpha_j x_o x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
\right]^{1/2},
\qquad
0<\delta\le \omega_O H_{\lambda}.
$$
The corresponding inter-layer Jacobian reduces to
$$
J_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
1
-
\alpha_o\alpha_j
\frac{(s_j/c_f)x_o}{\delta}
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta).
$$

Thus an inter-layer entry of $\mathcal{B}_{\mathrm{term}}(\lambda)$ is not an arbitrary phase sample. It is a smooth $2\pi$-periodic root curve $\delta_b(u)$ of the scalar equation above, with $|J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))|$ bounded away from zero and with the same emission-order class over the full outer period. The intra-layer pieces remain the self-hit and partner-hit equations already listed for each $\ell$. In this symmetric special case, the unknowns left for enumeration are therefore
$$
(m,n),\quad
(x_I,x_M,x_O),\quad
(\phi_{MO}^{\ast},\phi_{IO}^{\ast}),\quad
\{\delta_b(u)\}_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)},
$$
subject to $x_M=1/m$, $x_O\to1$, branch transversality, the cycle residual $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}=0$, and the conservation ledger. This is the first algebraic reduction of the terminal branch problem. It still does not select $(m,n)$ or prove existence; selection requires the residual and conservation equations to admit at least one branch set with a positive Jacobian floor.

The scalar reduction does, however, give an exact no-grazing certificate for a proposed inter-layer branch. Define the squared residual
$$
F_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
x_o^2+x_j^2
-
2\alpha_o\alpha_j x_o x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
-
\delta^2.
$$
The causal-root equation is equivalent to $F_{jo}^{\alpha_j\alpha_o}(u,\delta)=0$ with $\delta>0$, and, using $q_jx_j=s_j/c_f$, its delay derivative is
$$
\partial_{\delta}F_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
-2\delta\,
J_{jo}^{\alpha_j\alpha_o}(u,\delta).
$$
Thus the branch Jacobian is exactly the implicit-function denominator for the scalar root. Any nonzero root with $|J_{jo}^{\alpha_j\alpha_o}|>0$ continues locally as a smooth delay curve, and along such a curve
$$
\frac{d\delta_b}{du}
=
\frac{
\alpha_o\alpha_j x_o x_j(q_o-q_j)
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\delta_b(u)
J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}.
$$

This turns the symmetric terminal branch problem into a compact root-curve test before the force residual is evaluated. Any inter-layer root must lie in the geometric delay strip
$$
|x_o-x_j|
\le
\delta
\le
\min\{x_o+x_j,\omega_OH_{\lambda}\}.
$$
For fixed $(m,n)$, radii, and relative phases, an interior inter-layer ledger is admissible only if its initial roots at one outer phase continue around the full $2\pi$ period as closed curves $\delta_b(u)$ that remain inside this strip, satisfy a uniform floor
$$
\delta_b(u)\ge\epsilon_{\delta}>0,
\qquad
\left|
J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
\right|
\ge
\epsilon_J>0,
$$
and preserve the declared emission-order and observer-record class. Failure of the delay strip rejects the candidate kinematically; failure of the Jacobian floor places it in the grazing boundary class; failure of closed return changes the root ledger over one outer period. Passing this scalar certificate is still not terminal-branch existence, because $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}=0$ and the conservation ledger must still close, but it is the first finite rejection and continuation criterion for candidate $(m,n)$ branch labels.

The same chart projects the force residual once a certified root curve is supplied. Let $q_{\ell,\alpha}^{\mathrm{pol}}=\sigma_{\ell,\alpha}\epsilon$ denote the polarity bookkeeping unit carried by the architrino on layer $\ell$ and sign $\alpha$, distinguishing it from the layer frequency integer $q_\ell$. Write the signed coefficient inherited from the canonical per-hit law as
$$
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
=
\kappa\,
\operatorname{sign}(q_{\ell_j,\alpha_j}^{\mathrm{pol}}q_{\ell_o,\alpha_o}^{\mathrm{pol}})
\left|q_{\ell_j,\alpha_j}^{\mathrm{pol}}q_{\ell_o,\alpha_o}^{\mathrm{pol}}\right|
\frac{\omega_O^2}{c_f^2}.
$$
For a certified inter-layer curve $\delta_b(u)$, the circular-frame radial component, positive outward from the common center of the receiver layer, is
$$
a_{jo,r}^{\alpha_j\alpha_o}(u)
=
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
\frac{
x_o-\alpha_o\alpha_j x_j
\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\left(\delta_b(u)\right)^3
\left|J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))\right|
},
$$
and the tangential component, positive in the receiver's instantaneous direction of motion, is
$$
a_{jo,\tau}^{\alpha_j\alpha_o}(u)
=
\mathcal{K}_{jo}^{\alpha_j\alpha_o}
\frac{
\alpha_o\alpha_j x_j
\sin\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))
}{
\left(\delta_b(u)\right)^3
\left|J_{jo}^{\alpha_j\alpha_o}(u,\delta_b(u))\right|
}.
$$
These formulas are just the canonical line-of-action acceleration projected onto the two circular-frame basis vectors. The intra-layer self-hit and partner-hit pieces use the same projection after substituting their own certified delay roots from the binary branch chart.

For each receiver $(\ell_o,\alpha_o)$, sum all admitted branch contributions into
$$
\mathcal{A}_{\ell_o,\alpha_o}^{r}(u)
=
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
a_{b,r}(u),
\qquad
\mathcal{A}_{\ell_o,\alpha_o}^{\tau}(u)
=
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
a_{b,\tau}(u).
$$
On the symmetric terminal circle, with $\mathbf{e}_{\perp}(\psi)=d\mathbf{e}(\psi)/d\psi$, the target acceleration has only inward radial component,
$$
\ddot{\mathbf{x}}_{\ell_o,\alpha_o}(t)
\cdot
\alpha_o\mathbf{e}(q_{\ell_o}u+\phi_{\ell_o})
=
-R_{\ell_o}(q_{\ell_o}\omega_O)^2,
\qquad
\ddot{\mathbf{x}}_{\ell_o,\alpha_o}(t)
\cdot
\alpha_o\mathbf{e}_{\perp}(q_{\ell_o}u+\phi_{\ell_o})
=
0.
$$
Thus the vector residual $\mathcal{Q}_{\ell,\alpha}^{\mathrm{term}}$ reduces in this chart to the two scalar residual functions
$$
\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)
=
-R_{\ell_o}(q_{\ell_o}\omega_O)^2
-
\mathcal{A}_{\ell_o,\alpha_o}^{r}(u),
\qquad
\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)
=
-
\mathcal{A}_{\ell_o,\alpha_o}^{\tau}(u).
$$
Equivalently,
$$
\mathcal{Q}_{\ell_o,\alpha_o}^{\mathrm{term}}
=
\frac{1}{2\pi}
\int_0^{2\pi}
\left[
\left(\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)\right)^2
+
\left(\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)\right)^2
\right]
du.
$$
Since the integrand is non-negative on a smooth certified branch, $\mathcal{Q}_{\ell_o,\alpha_o}^{\mathrm{term}}=0$ is equivalent to $\mathcal{R}_{\ell_o,\alpha_o}^{r}(u)=0$ and $\mathcal{R}_{\ell_o,\alpha_o}^{\tau}(u)=0$ for the full outer period. This is the residual projection that can select or reject candidate integer locks after the scalar root curves are known. The remaining missing closure is the signed branch-strength and conservation assignment: without the polarity factors, regularized intra-layer branch weights, and conserved increments $(\Delta E_b,\Delta\mathbf{p}_b,\Delta\mathbf{J}_b,\Delta q_b)$, the chart can reject kinematic and force-residual failures but cannot yet prove that a particular $(m,n)$ is the terminal solution.

The branch-strength closure data can be stated without adding another gate. For every admitted branch $b$, the terminal ledger must record
$$
b
\mapsto
\left(
j_b,o_b,\tau_b,\delta_b(u),\hat{\mathbf{r}}_b(u),J_b(u),
q_{j_b}^{\mathrm{pol}},q_{o_b}^{\mathrm{pol}},w_b^{(\eta)}(u)
\right),
$$
where $j_b$ and $o_b$ are the source and receiver architrinos, $\tau_b$ is the hit type, and $w_b^{(\eta)}$ is the regularized inverse-square/Jacobian weight assigned to that branch. On a sharp transversal inter-layer branch,
$$
w_b^{(0)}(u)
=
\frac{\omega_O^2}{c_f^2}
\frac{1}{
\left(\delta_b(u)\right)^2
\left|J_b(u)\right|
},
$$
while intra-layer self-hit and partner-hit entries use the corresponding binary-root delay and Jacobian. The branch acceleration is then the canonical per-hit law in ledger form,
$$
\mathbf{a}_b^{(\eta)}(u)
=
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
w_b^{(\eta)}(u)
\hat{\mathbf{r}}_b(u).
$$
The sharp limit is acceptable only when the positive delay and Jacobian-floor certificate above holds; otherwise the branch must retain its regularized weight and remain a boundary case rather than an interior terminal label.

The conservation increments attached to a branch must separate mechanical exchange from wake-history bookkeeping. Over one outer period,
$$
\Delta E_{b}^{\mathrm{mech}}
=
\frac{\mu_{\text{arch}}}{\omega_O}
\int_0^{2\pi}
\mathbf{a}_b^{(\eta)}(u)\cdot\mathbf{v}_{o_b}(u)\,du,
$$
$$
\Delta\mathbf{p}_{b}^{\mathrm{mech}}
=
\frac{\mu_{\text{arch}}}{\omega_O}
\int_0^{2\pi}
\mathbf{a}_b^{(\eta)}(u)\,du,
\qquad
\Delta\mathbf{J}_{b}^{\mathrm{mech}}
=
\frac{\mu_{\text{arch}}}{\omega_O}
\int_0^{2\pi}
\mathbf{x}_{o_b}(u)\times\mathbf{a}_b^{(\eta)}(u)\,du.
$$
Because delayed momentum and energy are not purely instantaneous mechanical quantities, the full ledger entries are
$$
\Delta E_b
=
\Delta E_b^{\mathrm{mech}}
+
\Delta E_b^{\mathrm{wake}},
\qquad
\Delta\mathbf{p}_b
=
\Delta\mathbf{p}_b^{\mathrm{mech}}
+
\Delta\mathbf{p}_b^{\mathrm{wake}},
$$
$$
\Delta\mathbf{J}_b
=
\Delta\mathbf{J}_b^{\mathrm{mech}}
+
\Delta\mathbf{J}_b^{\mathrm{wake}}.
$$
For an internal causal-wake hit, $\Delta q_b=0$ because no architrino identity is created, destroyed, or transferred; nonzero charge-bookkeeping entries belong only to a declared provenance crossing of the patch boundary. The terminal conservation ledger is therefore the simultaneous closure condition
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta E_b
=
0,
\qquad
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta\mathbf{p}_b
=
\mathbf{0},
$$
$$
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta\mathbf{J}_b
=
\mathbf{0},
\qquad
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\Delta q_b
=
0.
$$
This completes the local bookkeeping needed for terminal enumeration: a candidate $(m,n)$ must pass scalar root continuation, force-residual cancellation, and the history-aware conservation ledger on the same branch set. What remains unsolved is not another requirement artifact but the derivation of $w_b^{(\eta)}$ and the wake-history increments from a time-translation- and Euclidean-invariant regularized action for the coupled three-layer branch.

The minimal action-level scaffold is the pullback of the exact causal-delay action in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian) to the certified terminal branch chart. For branch $b$, set
$$
t=\frac{u}{\omega_O},
\qquad
t_b^0(u)=t-\Delta_b(u),
\qquad
r_b(u)=\frac{c_f}{\omega_O}\delta_b(u).
$$
The sharp branch density inherited from the exact $1/r$ causal kernel is
$$
\mathcal{I}_b^{(0)}(u)
=
\frac{1}{c_f}
\frac{1}{r_b(u)|J_b(u)|}
=
\frac{\omega_O}{c_f^2}
\frac{1}{\delta_b(u)|J_b(u)|}.
$$
A regularized terminal action for the branch set should therefore have the form
$$
S_{\lambda}^{(\eta)}
=
\int_0^{2\pi}
\frac{du}{\omega_O}
\sum_o
\frac{1}{2}\mu_{\text{arch}}
\left\|\mathbf{v}_o(u)\right\|^2
-
\frac{1}{2}
\sum_{b\in\mathcal{B}_{\mathrm{term}}(\lambda)}
\int_0^{2\pi}
\frac{du}{\omega_O}
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\mathcal{I}_b^{(\eta)}(u),
$$
with $\mathcal{I}_b^{(\eta)}\to\mathcal{I}_b^{(0)}$ weakly on any branch satisfying the positive-delay and Jacobian-floor certificate. Its branch variation must reproduce the terminal acceleration weight,
$$
\left[
\frac{1}{\mu_{\text{arch}}}
\frac{\delta S_{\lambda}^{(\eta)}}{\delta\mathbf{x}_{o_b}}
\right]_{\!b}
\longrightarrow
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
w_b^{(0)}(u)
\hat{\mathbf{r}}_b(u),
$$
up to the sign convention fixed by writing the interaction term with a minus sign in the action. In other words, $w_b^{(\eta)}$ is not an independent fitting weight. It is the Euler-Lagrange pullback of the regularized causal kernel on a certified branch chart.

The strongest current action-kernel candidate is not the diagnostic same-support inverse-square adapter. Pull back the delayed-interior characteristic-tail kernel from [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian) before reducing to a one-period branch density. For the two-time branch, define the local characteristic coordinate
$$
u_b^{\mathrm{c}}(t_1,t_0)
=
g_b(t_1,t_0)
+
\frac{r_b(t_1,t_0)}{c_f}.
$$
After endpoint-clear normalization, the candidate branch kernel is
$$
K_{b,\mathrm{eff}}^{(\eta)}(t_1,t_0)
=
\int_{-\infty}^{g_b(t_1,t_0)}
\frac{\delta_\eta(s)}
{c_f\left(u_b^{\mathrm{c}}(t_1,t_0)-s\right)^2}
ds,
$$
or the finite-endpoint version with lower limit $-h_{+}$ when the endpoint-clearance term is cancelled by the characteristic gauge. Its receiver-gradient identity is
$$
\left(
\partial_{r_b}
-
\frac{1}{c_f}\partial_{g_b}
\right)
K_{b,\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g_b)}{r_b^2}.
$$
This is the action-level object that can replace the diagnostic inverse-square adapter once the Noether boundary terms below are computed from the same kernel. Until then, terminal enumerator rows using $w_b^{(\eta)}\hat{\mathbf{r}}_b$ remain diagnostic branch-force rows rather than a completed action derivation.

The sharp receiver-side variation can be separated before the root is integrated out. Write the two-time branch kernel as
$$
\mathcal{L}_b^{(0)}(t_1,t_0)
=
\frac{1}{c_f}
\Theta(t_1-t_0)
\frac{\delta(g_b(t_1,t_0))}{r_b(t_1,t_0)},
$$
with
$$
g_b(t_1,t_0)
=
t_1-t_0
-
\frac{r_b(t_1,t_0)}{c_f},
\qquad
r_b(t_1,t_0)
=
\|\mathbf{x}_{o_b}(t_1)-\mathbf{x}_{j_b}(t_0)\|.
$$
For a receiver variation at fixed source history,
$$
\delta r_b
=
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{o_b}(t_1),
\qquad
\delta g_b
=
-
\frac{1}{c_f}
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{o_b}(t_1).
$$
Therefore
$$
\delta\!\left(\frac{\delta(g_b)}{r_b}\right)
=
-
\left[
\frac{\delta(g_b)}{r_b^2}
+
\frac{\delta'(g_b)}{c_f r_b}
\right]
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{o_b}(t_1).
$$
The first term already gives the desired terminal branch weight after the causal root is selected:
$$
\int dt_0\,
\Theta(t_1-t_0)
\frac{\delta(g_b(t_1,t_0))}{r_b^2(t_1,t_0)}
=
\frac{1}{r_b^2(t_1,t_b^0)|J_b(t_1,t_b^0)|}
=
\frac{\omega_O^2}{c_f^2}
\frac{1}{\delta_b^2(u)|J_b(u)|}
=
w_b^{(0)}(u).
$$

The second term is the nontrivial root-constraint variation. It cannot be dropped after the branch has been pulled back to $\delta_b(u)$. The terminal-chart variation proof closes exactly when the regularized two-time action satisfies, for every compactly supported or period-matched receiver variation,
$$
\lim_{\eta\to0}
\left[
\int dt_0\,
\Theta(t_1-t_0)
\frac{\delta_\eta'(g_b(t_1,t_0))}{c_f r_b(t_1,t_0)}
\hat{\mathbf{r}}_b(t_1,t_0)
\right]_{\mathrm{int}}
=
\mathbf{0},
$$
where the subscript $\mathrm{int}$ means after the source-side variation, integration by parts on the root-selected chart, and the Noether boundary term have been accounted for. Equivalently, all interior force density left by varying the causal constraint must cancel into the boundary wake increments rather than adding a second independent line-of-action force. This is the exact missing identity for a complete terminal-chart variation proof. The direct $1/r$ variation supplies the scale coefficient $w_b^{(0)}$; the remaining proof burden is to show that the $\delta_\eta'(g_b)$ contribution is a boundary/source-side term, vanishes under a local stationarity condition, or is cancelled by a declared counterterm under the same symmetry-preserving regularization used for the conservation ledger.

This identity can be narrowed one step further. On a transversal branch,
$$
\partial_{t_0}g_b(t_1,t_0)
=
-J_b(t_1,t_0),
$$
so
$$
\delta_\eta'(g_b)
=
-
\frac{1}{J_b}
\partial_{t_0}\delta_\eta(g_b).
$$
Substituting this into the unresolved term and integrating by parts in $t_0$ gives
$$
\int dt_0\,
\Theta(t_1-t_0)
\frac{\delta_\eta'(g_b)}{c_f r_b}
\hat{\mathbf{r}}_b
=
\mathcal{B}_{b}^{(\eta)}(t_1)
+
\int dt_0\,
\delta_\eta(g_b)
\partial_{t_0}
\left[
\Theta(t_1-t_0)
\frac{\hat{\mathbf{r}}_b}{c_f r_b J_b}
\right],
$$
where $\mathcal{B}_{b}^{(\eta)}(t_1)$ is the endpoint contribution at the history-window, period, or excluded coincidence boundary. The coincidence term is removed by $H(0)=0$; the remaining endpoint term vanishes only for compactly supported variations or for period-matched terminal histories.

Thus the smallest unresolved object is no longer the raw $\delta_\eta'(g_b)$ term. It is the root-chart interior derivative
$$
\mathbf{C}_{b}^{(\eta)}(t_1)
=
\int dt_0\,
\delta_\eta(g_b)
\partial_{t_0}
\left[
\Theta(t_1-t_0)
\frac{\hat{\mathbf{r}}_b}{c_f r_b J_b}
\right].
$$
The terminal action derives the claimed line-of-action branch law exactly only if
$$
\lim_{\eta\to0}
\left[
\mathbf{C}_{b}^{(\eta)}
+
\mathbf{C}_{b,\mathrm{src}}^{(\eta)}
+
\mathbf{C}_{b,\mathrm{bdry}}^{(\eta)}
\right]
=
\mathbf{0},
$$
where $\mathbf{C}_{b,\mathrm{src}}^{(\eta)}$ is the source-side variation of the same two-time kernel and $\mathbf{C}_{b,\mathrm{bdry}}^{(\eta)}$ is the Noether boundary contribution assigned to the wake-history ledger. This is the precise local closure condition that would be needed for the pure scalar kernel to derive the terminal line-of-action force without an added term. If this cancellation fails, the action-derived terminal force law must include an additional regularized counterterm rather than using $w_b^{(\eta)}\hat{\mathbf{r}}_b$ alone.

The source-side calculation shows why this is a real condition rather than a notational cancellation. Holding the receiver history fixed and varying the emission point gives
$$
\delta r_b
=
-\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{j_b}(t_0),
\qquad
\delta g_b
=
\frac{1}{c_f}
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{j_b}(t_0),
$$
and therefore
$$
\delta_{\mathrm{src}}\!\left(\frac{\delta_\eta(g_b)}{r_b}\right)
=
\left[
\frac{\delta_\eta(g_b)}{r_b^2}
+
\frac{\delta_\eta'(g_b)}{c_f r_b}
\right]
\hat{\mathbf{r}}_b\cdot\delta\mathbf{x}_{j_b}(t_0).
$$
On a future-reception chart for the same branch,
$$
\partial_{t_1}g_b(t_1,t_0)
=
1-\frac{\hat{\mathbf{r}}_b(t_1,t_0)\cdot\mathbf{v}_{o_b}(t_1)}{c_f},
$$
so the source-side derivative-of-delta contribution becomes
$$
\int dt_1\,
\Theta(t_1-t_0)
\frac{\delta_\eta'(g_b)}{c_f r_b}
\hat{\mathbf{r}}_b
=
\widetilde{\mathcal{B}}_{b}^{(\eta)}(t_0)
-
\int dt_1\,
\delta_\eta(g_b)
\partial_{t_1}
\left[
\Theta(t_1-t_0)
\frac{\hat{\mathbf{r}}_b}
{c_f r_b\left(1-\hat{\mathbf{r}}_b\cdot\mathbf{v}_{o_b}/c_f\right)}
\right].
$$
This is the coefficient of $\delta\mathbf{x}_{j_b}(t_0)$, not the coefficient of $\delta\mathbf{x}_{o_b}(t_1)$. For arbitrary compactly supported interior variations, the source and receiver variations are independent. The source-side term therefore does not cancel $\mathbf{C}_{b}^{(\eta)}$ pointwise in the receiver Euler-Lagrange equation. Noether boundary terms can cancel endpoint contributions or enforce global time-translation, spatial-translation, and rotation charges, but they cannot remove an interior receiver coefficient for compactly supported variations.

In the sharp positive-delay, transversal limit, the receiver-side interior object reduces to
$$
\mathbf{C}_{b}^{(0)}(t_1)
=
\frac{1}{|J_b(t_1,t_b^0)|}
\left.
\partial_{t_0}
\left[
\frac{\hat{\mathbf{r}}_b(t_1,t_0)}
{c_f r_b(t_1,t_0)J_b(t_1,t_0)}
\right]
\right|_{t_0=t_b^0}.
$$
Thus the pure regularized $1/r$ causal kernel is promoted to an exact branch-weight derivation only under the sufficient local stationarity condition
$$
\left.
\partial_{t_0}
\left[
\frac{\hat{\mathbf{r}}_b(t_1,t_0)}
{r_b(t_1,t_0)J_b(t_1,t_0)}
\right]
\right|_{t_0=t_b^0}
=
\mathbf{0}
$$
on each admitted interior branch, or under an explicit action-level counterterm whose receiver Euler derivative is
$$
\left[
\frac{1}{\mu_{\text{arch}}}
\frac{\delta S_{b,\mathrm{ct}}^{(\eta)}}{\delta\mathbf{x}_{o_b}(t_1)}
\right]_{\!b}
=
-
\kappa\,
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\mathbf{C}_{b}^{(\eta)}(t_1)
$$
with the same endpoint convention used for the wake-history ledger. Such a counterterm is admissible only when derived from the same symmetry-preserving action-level mechanism, not when inserted as a fit to the accepted branch law. This is the smallest correction exposed by the variation: it preserves the direct inverse-square branch law when the stationarity condition holds, and otherwise records exactly the residual force density that the scalar kernel leaves behind.

For the same causal-surface local scalar class, this counterterm route is ruled out. A scalar term $a(r_b,J_b)\delta_\eta(g_b)$ must choose $a=-1/r_b$ to cancel the derivative-of-delta coefficient, but that same choice changes the direct $w_b^{(0)}$ scale contribution. The finite local delta-jet extension has the same obstruction. In the common-center inter-layer chart, the stationarity option is also ruled out by the lemma below. The terminal branch proof should therefore test branch-summed residual closure directly; otherwise the remaining action-level option is the nonlocal characteristic-tail repair target from [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian), or a richer velocity/history-dependent invariant mechanism. Neither option is a fitted scalar patch.

**Lemma (common-center inter-layer stationarity obstruction).** In the symmetric common-center terminal chart, no positive-delay, non-grazing inter-layer branch with nonzero layer radii and nonzero source speed satisfies the per-branch stationarity condition above. Define the dimensionless separation vector
$$
\mathbf{Y}_b(u,\delta)
=
\alpha_o x_o\mathbf{e}(q_o u+\phi_o)
-
\alpha_j x_j\mathbf{e}(q_j(u-\delta)+\phi_j),
\qquad
\rho_b(u,\delta)
=
\|\mathbf{Y}_b(u,\delta)\|.
$$
Since $r_b=(c_f/\omega_O)\rho_b$ and $\hat{\mathbf{r}}_b=\mathbf{Y}_b/\rho_b$, the branch stationarity condition is equivalent up to a nonzero scale to
$$
\left.
\partial_\delta
\left[
\frac{\mathbf{Y}_b(u,\delta)}
{\rho_b^2(u,\delta)J_b(u,\delta)}
\right]
\right|_{\delta=\delta_b(u)}
=
\mathbf{0}.
$$
The vector derivative can vanish only if $\partial_\delta\mathbf{Y}_b$ is parallel to $\mathbf{Y}_b$. But
$$
\partial_\delta\mathbf{Y}_b
=
\alpha_j q_j x_j\,
\mathbf{e}_{\perp}(q_j(u-\delta)+\phi_j),
$$
so parallelism forces the separation to be tangent to the source circle:
$$
\mathbf{Y}_b\cdot\mathbf{e}(q_j(u-\delta)+\phi_j)
=
0
\quad\Longleftrightarrow\quad
\alpha_o x_o\cos\Theta_{jo}^{\alpha_j\alpha_o}(u,\delta)
=
\alpha_j x_j.
$$
On this tangent subcase, $\rho_{b,\delta\delta}=0$ and $J_b=1-\rho_{b,\delta}$. The remaining scalar stationarity condition reduces to
$$
\partial_\delta(\rho_bJ_b)
=
\rho_{b,\delta}(1-\rho_{b,\delta})
=
0.
$$
The first factor would require $\rho_{b,\delta}=0$; with $q_jx_j=s_j/c_f\ne0$ and the tangent condition, that collapses the separation to $\rho_b=0$ and violates the positive-delay floor. The second factor gives $J_b=0$, which violates the Jacobian floor. Therefore per-branch stationarity is not the terminal inter-layer closure mechanism on this chart. The remaining action-level route is branch-summed residual closure over the signed admitted branch set, or a richer invariant action mechanism whose Euler derivative supplies the missing residual without fitting the force law.

**Branch-summed residual closure.** The terminal action scaffold can still close without per-branch stationarity if the receiver-side interior residual cancels across the signed admitted branch set. Define the dimensionless branch residual vector
$$
\mathbf{A}_b(u)
=
\left.
\partial_\delta
\left[
\frac{\mathbf{Y}_b(u,\delta)}
{\rho_b^2(u,\delta)J_b(u,\delta)}
\right]
\right|_{\delta=\delta_b(u)}.
$$
Using $t_0=t_1-\delta/\omega_O$, $r_b=(c_f/\omega_O)\rho_b$, and $\hat{\mathbf{r}}_b=\mathbf{Y}_b/\rho_b$, the sharp receiver-side interior term becomes
$$
\mathbf{C}_{b}^{(0)}(u)
=
-
\frac{\omega_O^2}{c_f^2}
\frac{\mathbf{A}_b(u)}{|J_b(u)|}.
$$
After the common nonzero scale is removed, the necessary pointwise receiver-side closure equation is
$$
\sum_{b:\,o_b=(\ell_o,\alpha_o)}
\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|
\frac{\mathbf{A}_b(u)}{|J_b(u)|}
=
\mathbf{0}
\qquad
\text{for all }u.
$$
This is a different equation from the force residuals $\mathcal{R}_{\ell_o,\alpha_o}^{r}=\mathcal{R}_{\ell_o,\alpha_o}^{\tau}=0$ and from the conservation-ledger sums. The force residual tests whether the accepted Master EOM supplies the terminal circular acceleration. The conservation ledger tests Noether bookkeeping over the same branch set. The branch-summed residual equation tests whether the scalar action scaffold has no leftover Euler derivative on that receiver after the direct inverse-square term has already been accounted for.

The regularization is admissible only if it preserves the symmetries that supply the conservation ledger. In action form this means
$$
\delta_{\tau}S_{\lambda}^{(\eta)}=0,
\qquad
\delta_{\mathbf{b}}S_{\lambda}^{(\eta)}=0,
\qquad
\delta_{\boldsymbol{\Omega}}S_{\lambda}^{(\eta)}=0
$$
for global time translations, spatial translations, and spatial rotations. A sufficient local form is to regularize only the causal scalar
$$
g_{ij}(t,t')
=
t-t'
-
\frac{\|\mathbf{x}_i(t)-\mathbf{x}_j(t')\|}{c_f}
$$
by a normalized $\delta_\eta(g_{ij})$, while keeping $H(0)=0$ and excluding the trivial coincidence self-branch. Such a regularizer depends on Euclidean distance and time difference, not on a coordinate origin, absolute phase convention, or observer record.

The wake-history increments are then the Noether boundary terms of this same action. For the time-translation channel, a branch contribution across a time boundary $t_\ast$ has the form
$$
E_{b}^{\mathrm{wake}}(t_\ast)
=
\frac{1}{2}
\int_{\{(t_1,t_0)\in b:\,t_0\le t_\ast<t_1\}}
\partial_{t_1}
\mathcal{K}_{b}^{(\eta)}(t_1,t_0)\,
dt_0\,dt_1,
$$
where $\mathcal{K}_{b}^{(\eta)}$ is the weighted regularized causal kernel restricted to branch $b$,
$$
\mathcal{K}_{b}^{(\eta)}(t_1,t_0)
=
\frac{\kappa\,\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|}{c_f}
\Theta(t_1-t_0)
\frac{\delta_\eta(g_b(t_1,t_0))}
{r_b(t_1,t_0)},
$$
for the pure scalar scaffold. For the delayed-interior characteristic-tail candidate, the branch kernel is instead
$$
\mathcal{K}_{b,\mathrm{eff}}^{(\eta)}(t_1,t_0)
=
\frac{\kappa\,\operatorname{sign}(q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}})
\left|q_{j_b}^{\mathrm{pol}}q_{o_b}^{\mathrm{pol}}\right|}{c_f}
\Theta(t_1-t_0)
K_{b,\mathrm{eff}}^{(\eta)}(t_1,t_0),
$$
with the trivial self-coincidence branch excluded in either case. Over one outer period,
$$
\Delta E_b^{\mathrm{wake}}
=
E_{b}^{\mathrm{wake}}(T)-E_{b}^{\mathrm{wake}}(0).
$$
The momentum and angular-momentum wake increments are the corresponding spatial-translation and rotation boundary terms:
$$
\Delta\mathbf{p}_b^{\mathrm{wake}}
=
\mathbf{P}_b^{\mathrm{wake}}(T)-\mathbf{P}_b^{\mathrm{wake}}(0),
\qquad
\Delta\mathbf{J}_b^{\mathrm{wake}}
=
\mathbf{J}_b^{\mathrm{wake}}(T)-\mathbf{J}_b^{\mathrm{wake}}(0).
$$
They are fixed by the coefficients of the boundary variations
$$
\delta_{\mathbf{b}}S_b^{(\eta)}
=
\mathbf{b}\cdot
\Delta\mathbf{p}_b^{\mathrm{wake}},
\qquad
\delta_{\boldsymbol{\Omega}}S_b^{(\eta)}
=
\boldsymbol{\Omega}\cdot
\Delta\mathbf{J}_b^{\mathrm{wake}},
$$
with the mechanical increments already written above. Therefore a terminal branch proof now has a precise action-level target: derive $\mathcal{I}_b^{(\eta)}$ from the normalized delayed-interior kernel, prove that its branch variation gives $w_b^{(\eta)}$ with the derivative-of-constraint residual cancelled by the receiver-gradient identity, and show that the Noether boundary terms close over the same certified branch set. Until those three steps are complete, the action scaffold supplies a constrained proof route and a rejection test, not a solved terminal $(m,n)$ selection.

The Master Equation now fixes the normalized delayed-interior kernel and its energy, momentum, and angular-momentum wake-history boundary increments. The terminal-alignment proof therefore no longer needs to invent the Noether terms; it must pull those increments back to the finite terminal branch chart, evaluate the resulting $\Delta E_b^{\mathrm{wake}}$, $\Delta\mathbf{p}_b^{\mathrm{wake}}$, and $\Delta\mathbf{J}_b^{\mathrm{wake}}$, and prove that the mechanical plus wake ledger closes on the same rows that pass the force-residual and root-ledger tests. Until that branch-summed evaluation passes, the terminal rows remain a diagnostic action packet rather than a solved terminal $(m,n)$ selection.

The concrete terminal-chart conservation test is the pullback of the Master Equation charges to $\mathcal{B}_{\mathrm{term}}(\lambda)$. Each retained row must emit
$$
\left(
j_b,o_b,\tau_b,\ell(j_b),\ell(o_b),t_{0,b},t_b,\Delta_b,
r_b,\hat{\mathbf r}_b,g_b,u_b,J_b,
K_{b,\mathrm{eff}}^{(\eta)},
\partial_{t_b}\mathcal{K}_{b,\mathrm{eff}}^{(\eta)},
\nabla_{\mathbf{x}_{o_b}(t_b)}\mathcal{K}_{b,\mathrm{eff}}^{(\eta)}
\right),
$$
using the action-level causal scalar
$$
g_b(t_b,t_{0,b})
=
t_b-t_{0,b}
-
\frac{r_b(t_b,t_{0,b})}{c_f}.
$$
The chart then reports the endpoint totals
$$
\mathcal{E}_{\mathrm{term}}^{(\eta)}
=
K_{\mu,\lambda}
+
E_{\mathrm{wake,eff},\lambda}^{(\eta)},
\qquad
\boldsymbol{\mathcal{P}}_{\mathrm{term}}^{(\eta)}
=
\mathbf{P}_{\mathrm{mech},\lambda}
+
\mathbf{P}_{\mathrm{wake,eff},\lambda}^{(\eta)},
$$
$$
\boldsymbol{\mathcal{J}}_{\mathrm{term}}^{(\eta)}
=
\mathbf{J}_{\mathrm{mech},\lambda}
+
\mathbf{J}_{\mathrm{wake,eff},\lambda}^{(\eta)}.
$$
The terminal label is conserved only when the increments of all three totals vanish within the declared branch tolerance, after subtracting the Euler-residual and endpoint-leakage terms. The projected action increment $\Delta I_{\mathrm{ME}}$ and any torque integral remain numerical diagnostics until these three totals close on the same $\mathcal{B}_{\mathrm{term}}(\lambda)$ rows.

This scaffold identifies the smallest missing dynamics. The delayed equations must enumerate $\Lambda_{\theta}^{\mathrm{loc}}$ and derive the edge maps $\mathcal{E}_{\nu}^{\pm}$ from the terminal aligned branch. [Dyadic Resonance Lock](../../../../markdown/aaa/dynamics/dyadic-resonance-lock.md) supplies the candidate integer phase lattice, and [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#self-hit-definition-and-diagnostics) supplies the self-hit and partner-hit root vocabulary, but neither document yet computes the terminal aligned edge projections from the full three-layer dynamics.

The local-horizon coefficient requires the area-normalized terminal density
$$
\bar{\alpha}_{\mathrm{align}}(\theta)
=
\frac{s_{\mathrm{align}}(\theta)}{a_{\theta}}
\longrightarrow
\frac{1}{4}
$$
in the equilibrium weak-field horizon-interface limit. This is the precise missing dynamics calculation. It fails if terminal alignment admits many inequivalent local labels with long-range constraints that restore volume or history-length scaling, if the observer quotient erases the labels needed for Page-compatible release accounting, or if the transfer rule must be retuned separately for entropy, flux, and downstream observer-geometry recovery.

### Dynamics-Side Roadmap

The dynamics chapter contributes the stable pieces needed by the larger theorem program:

1. Define the speed hierarchy and the causal-speed guardrails.
2. Model the tri-binary Noether core as inner engine, middle fulcrum, and outer shielding/interface layer.
3. Track how motion deforms the rest-state lock into braided spiral-helical geometry.
4. Derive local cycle-period diagnostics from the absolute cycle-stretch theorem target.
5. Solve all-layer branch updates for one-$h$ transactions and extract the branch-indexed period-stretch and envelope-oblation records.
6. Compute the terminal-alignment area-normalized label density $\bar{\alpha}_{\mathrm{align}}=s_{\mathrm{align}}/a_{\theta}$ from alignment-restricted closure labels, patch-area normalization, and edge wake compatibility.
7. Output alignment, closure, Floquet, grazing, branch-residual, and observer-export diagnostics.
8. Keep mass, photon, equivalence-principle, and full observer-geometry matching claims outside the primitive dynamics layer until their proof burdens close.

### Working Hypotheses

1. The formed Noether core has stable invariants ($R_{\text{core}}$, $\omega_{\text{core}}$, fixed phase offsets).
2. The outer-binary delay loop yields discrete plateaus and a terminal aligned mode under increasing stress.
3. High group velocity may produce an oblate causal envelope that drives planar alignment in the terminal rung; this remains a working hypothesis until the swept-volume and branch-stability tests close.
4. High gravitational gradient modifies phase closure through tidal or differential delay effects, shifting or destabilizing rungs.

---

### Regime Map for Speed Statements (CFT / Horizon / AdS)

To keep speed claims consistent across documents, all binary-speed statements should be read as **regime-qualified**:

| Regime | Inner binary | Middle binary | Outer binary | Operational meaning |
| --- | --- | --- | --- | --- |
| **Partner/exterior comparison regime** (CFT bridge label) | Typically in self-hit branch ($\|\mathbf{v}\| \gtrsim c_f$ history-supported) | Near the hinge scale ($\|\mathbf{v}\| \approx c_f$) in working models | Typically $\|\mathbf{v}\| < c_f$ | Hierarchical tri-binary operation and ordinary ladder behavior |
| **Terminal-alignment interface** (holographic bridge label) | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | 3D precessing structure collapses toward planar lock |
| **Self-hit interior comparison regime** (AdS bridge label) | Self-hit dominated; effective closure may involve super-field effective speed | Strongly coupled to inner/outer delay closure | Can participate in states where combined in-plane effective speed satisfies $v_{\text{eff}} > c_f$ | Mach-wedge-like causal geometry and interior recycling hypotheses |

**Notation guardrail:** "$\|\mathbf{v}\| < c_f$" or "$\|\mathbf{v}\| = c_f$" in role summaries refers to a component/regime statement, while $v_{\text{eff}} > c_f$ refers to the **combined in-plane effective motion** used in wake-geometry closure.

**Geometry speed guardrail:** Primitive envelope and closure diagnostics use the causal speed $c_f$. Downstream observer-channel dressing is not part of this branch scan. The corresponding kinematic parameter is
$$
\beta_f=\frac{v_{\text{trans}}}{c_f}.
$$
Primitive dynamics scans must not mix $c_f$ and $c_{\text{eff}}$ in the same diagnostic. Any $c_{\text{eff}}$ comparison belongs to a downstream observer-channel map.

---

### Geometry Focus

#### A) High Group Velocity Geometry (Oblate Spheroid)

**Assumption (testable):** The outer binary moving at translational speed $v_{\text{trans}}$ generates a causal interaction envelope that is oblate and flattens along the direction of motion as $v_{\text{trans}} \to c_f$ on the primitive branch chart.

**Geometry:** Let the motion define the $z$-axis. Model the envelope as an ellipsoid
$$
\frac{x^2 + y^2}{R_\perp^2} + \frac{z^2}{R_\parallel^2} = 1,
$$
with transverse radius $R_\perp$ and longitudinal radius $R_\parallel$.

Use the kinematic contraction law as a theorem target to be derived from branch dynamics:
$$
\beta_f = \frac{v_{\text{trans}}}{c_f},
\qquad
R_\parallel = R_\perp\sqrt{1-\beta_f^2}.
$$
As $\beta_f \to 1$, $R_\parallel \to 0$ and the envelope collapses toward a disk.
**Right-triangle link:** Treat $c_f$ as the primitive causal propagation speed and decompose it into orthogonal components: one leg is the group translation $v_{\text{trans}}$, the other leg is the longitudinal closure speed $v_\parallel$. Then
$$
c_f^2 = v_{\text{trans}}^2 + v_\parallel^2 \quad \Rightarrow \quad v_\parallel = c_f\sqrt{1-\beta_f^2}.
$$
Mapping causal speed to closure length gives $R_\parallel = R_\perp (v_\parallel/c_f) = R_\perp\sqrt{1-\beta_f^2}$, which is the triangle form of the ellipsoid theorem target rather than a completed recovery.

**Impact on delay locking:** The round-trip delay $\Delta t_{\text{rt}}$ is the time between an outer-binary architrino’s emission and the moment its wake returns to influence that same architrino, approximating the inner+middle as a compact core at the center. For a ray at polar angle $\theta$ relative to the $z$-axis, the intersection radius with the ellipsoid is
$$
R(\theta) = \left(\frac{\sin^2\theta}{R_\perp^2} + \frac{\cos^2\theta}{R_\parallel^2}\right)^{-1/2}.
$$
Then $\Delta t_{\text{rt}}(\theta) \approx 2 R(\theta)/c_f$, and the phase condition generalizes to
$$
\Phi_n(\theta, \mathbf{v}_{\text{trans}}) = \omega_n\,\Delta t_{\text{rt}}(\theta) + \phi_{\text{geom}}(n).
$$
**Conjecture (velocity convergence):** As translational speed increases, delay-closure constraints drive the orbital degree of freedom to adjust (e.g., by shrinking radius and raising $v_{\text{orb}}^{\text{tan}}$) so that both $v_{\text{trans}}$ and $v_{\text{orb}}^{\text{tan}}$ converge toward $c_f$ at the planar transition.

**Exclusion volume (instantaneous):**
$$
V(v_{\text{trans}}) = \frac{4\pi}{3} R_\perp^2 R_\parallel
= \frac{4\pi}{3} R_\perp^3 \sqrt{1-\left(\frac{v_{\text{trans}}}{c_f}\right)^2}.
$$
If the outer radius is infalling, treat $R_\perp = R_\perp(t)$ so
$$
V(t) = \frac{4\pi}{3} R_\perp(t)^3 \sqrt{1-\left(\frac{v_{\text{trans}}(t)}{c_f}\right)^2}.
$$
This expression belongs to the primitive branch chart; downstream dressed-channel variants must be rebuilt from an explicit observer-inference map.

---

#### B) High Gravitational Gradient Geometry

**Coupling caveat:** Whether $v_{\text{trans}}$ is independent of the radial infall speed $v_r$ is unresolved. Use the independent form by default, or adopt a coupling $v_{\text{trans}} = f(R_\perp)$ and substitute to test specific scenarios.

**Assumption (testable):** A strong external gradient (tidal field or effective curvature) perturbs the delay loop, altering phase closure and stability of rungs.

**Origin of the gradient (model definition):** Gravitation is implemented as an emergent Noether-Sea response gradient, not as fundamental curvature of the Euclidean void. Dense collections of standard-model assemblies perturb Noether-Sea density, compliance, stress, effective potential, and terminal-alignment state. The effective gravitational field in this delay-geometry model is the observer-level reconstruction of those coupled gradients.

**Geometry inputs:** Represent this gradient as a scalar control parameter $G_{\text{grad}}$ only in reduced scans, for example a magnitude extracted from Noether-Sea density/compliance/stress gradients, $\partial_r\Phi_{\text{eff}}$, or a tidal tensor. In simulations, treat $G_{\text{grad}}$ as a declared proxy around the outer-binary orbit and record which Noether-Sea response channel it compresses.

**Expected effects to test:**
- Differential path delays across the outer orbit (forward vs backward sector).
- Drift in precession cone angle and inter-plane tilt under increasing $G_{\text{grad}}$.
- Shifts in the stability sign $\partial \Phi_n/\partial r$ or loss of plateau behavior.
**Prediction:** Increasing $G_{\text{grad}}$ shifts stable $n$ values and narrows or removes plateaus; strong gradients can pull the terminal alignment inward or erase it.

#### C) Exclusion Volume Under Precession (Caveat)

**Implication:** Outer-binary precession sweeps an exclusion region that is larger than a static orbit. The effective exclusion volume is the union of the orbit's causal envelope over a precession cycle, not just a single instantaneous envelope.
This union geometry sets packing and overlap limits by construction, rather than relying on point-particle exclusion rules.

**Modeling at $v>0$:** Use the oblate envelope as a time-dependent exclusion region whose axis precesses. The exclusion volume becomes anisotropic and typically increases with precession cone angle.

**As $v_{\text{trans}} \to c_f$:** The envelope flattens toward a disk, so the exclusion volume becomes a thin, swept annulus dominated by the equatorial plane. This tends to amplify planar alignment constraints and reduce accessible 3D configurations.
At sufficiently high stress, this suggests the terminal-rung failure mode to test: further increases may fail to support a stable 3D mode and may force a planar aligned state.

**Status:** This precession-expanded exclusion volume is not explicitly modeled in the current minimal system; treat results as lower bounds until the swept-volume effect is added.

#### D) Local Cycle-Period Diagnostic

**Goal:** Define local cycle-period change as a geometric effect in the delay loop, not as distortion of substrate time or as a relativistic postulate.

**Reference cadence:** Use a declared reference assembly cadence $T_0$; the terminal-alignment normalization may specialize this to the outer-binary Planck cadence $T_0=1/f_P$.

The cadence $T_0$ is a reference assembly cadence, not the absolute substrate time itself. Absolute time $t$ remains the uniform ordering parameter for causal-hit evaluation. The local dynamics diagnostic compares assembly cycle counts to this reference cadence:
$$
C_{\text{cyc}}(\mathbf{x})
\equiv
\frac{T_0}{T_{\text{local}}(\mathbf{x})}
$$
in the rest branch of the local Noether-Sea cell. This quantity is a dynamics-side period ratio, not a time coordinate.

**Sector-delay diagnostic from delay geometry:** Define a reference round-trip delay $\Delta t_{\text{rt,ref}}$ and a local delay $\Delta t_{\text{rt}}(\theta, G_{\text{grad}})$. Then
$$
\alpha(\theta, G_{\text{grad}}) = \frac{\Delta t_{\text{rt}}(\theta, G_{\text{grad}})}{\Delta t_{\text{rt,ref}}}
$$
and, for the ellipsoid-only case with no gradient,
$$
\alpha(\theta) = \frac{R(\theta)}{R_{\text{ref}}}
$$
measures how one sector's phase-closure period compares to the reference cadence:
$$
T_{\text{local}}(\theta) = T_0 \, \alpha(\theta, G_{\text{grad}}).
$$
When $\alpha > 1$, local cycles are longer relative to $T_0$; when $\alpha < 1$, they are shorter. This sector-delay diagnostic remains an absolute-time branch-period record. It can be exported downstream only after the accepted branch functional $T_q(v,G_{\text{grad}})$ is derived from the full cycle and matched to the retained causal-root ledger.

**Geometric source of period shift:** The causal envelope shape sets $\Delta t_{\text{rt}}$. As the tri-binary tilts out of planar and loses energy, the envelope becomes less oblate (larger $R_\parallel/R_\perp$), increasing some path lengths and stretching $T_{\text{local}}$; as it flattens, $R_\parallel$ shrinks and the corresponding delays contract. Gradients ($G_{\text{grad}}$) further skew delays across the orbit.

**Primitive translation parameter:** For the branch scan, use
$$
\beta_f=\frac{v_{\text{trans}}}{c_f},
\qquad
R_\parallel = R_\perp \sqrt{1-\beta_f^2}.
$$
Geometrically, $\beta_f$ is the primitive axis-squash control: as $\beta_f \to 1$, the causal envelope collapses along the motion axis, shrinking longitudinal path lengths and altering the delay.

**Where it enters phase closure:** In scans, treat the local cycle frequency as $\omega_n/\alpha$ inside $\Phi_n$ for the sector under consideration. Longer causal loops (larger $\alpha$) yield lower cycle frequency at fixed absolute-time reference; any redshift interpretation belongs downstream.

---

### Minimal Models

#### Noether Core Baseline (Inner + Middle Fixed)

**Focus:** Treat inner + middle as a formed Noether core with fixed (or slowly varying) center of mass. Track convergence of phase relations and extract $R_{\text{core}}$, $\omega_{\text{core}}$, and stable phase offsets. Check repeatability across nearby initial conditions and whether any core element rides $\|\mathbf{v}\| = c_f$ continuously.

#### Outer-Binary Delay Loop Model with Formed Core

**Focus:** Characterize the discrete ladder / top-rung behavior in a minimal delay system and quantify geometry at high $v_{\text{trans}}$ and high $G_{\text{grad}}$.

**Model ingredients:**
- Inner + middle modeled as a rigid core with fixed timescales.
- Outer binary orbits the core with non-coplanar planes initially.
- Translational speed $\mathbf{v}_{\text{trans}}$ and gradient $G_{\text{grad}}$ are control parameters.
- Use ellipsoid-based $\Delta t_{\text{rt}}(\theta)$ for high-velocity geometry.

**Phase condition:**
$$
\Phi_n(\theta, \mathbf{v}_{\text{trans}}, G_{\text{grad}}) = \omega_n\,\Delta t_{\text{rt}}(\theta) + \phi_{\text{geom}}(n),
$$
and track when $\partial \Phi_n/\partial r$ changes sign.
Quantization here is emergent: only delay-locked, stable closures persist as discrete rungs, not imposed eigenmodes.

#### Alignment Invariants and Configuration Diagnostics

**Diagnostics (operational):**
- **Inter-plane angles:** $\theta_{ij} = \arccos(\hat{n}_i \cdot \hat{n}_j)$ for $(i,j)\in\{\text{inner, mid, outer}\}$. Track $\max(\theta_{ij})$ over an outer period.
- **Planarity threshold:** Declare “planar aligned” if $\max(\theta_{ij}) < \epsilon_\theta$ for $N$ consecutive outer periods.
- **Precession cone angle:** Let $\hat{n}_{\text{net}}$ be the normalized sum of plane normals. Define $\theta_{\text{cone}} = \max_t \arccos(\hat{n}_{\text{net}}(t)\cdot\langle\hat{n}_{\text{net}}\rangle)$ over one outer period.
- **Rotation test ($SU(2)$ vs $U(1)$):** Evolve the same state under an imposed $2\pi$ spatial rotation and compare the causal configuration $\mathcal{C}(t)$ to the unrotated one (e.g., phase-closure residuals and relative plane phases). If $\mathcal{C}(t)$ matches only after $4\pi$, treat as $SU(2)$-like; if after $2\pi$, treat as $U(1)$-like.
- **Diagnostic hypothesis:** As alignment strengthens, $\theta_{ij}$ and $\theta_{\text{cone}}$ should decrease monotonically; the rotation test should be checked for a possible transition from $4\pi$ to $2\pi$ return.
As alignment increases and planes coincide, the remaining degree of freedom may reduce to a single in-plane phase ($U(1)$-like), consistent with a boson-like terminal configuration only after the rotation test passes.

#### Floquet and Grazing Diagnostics

Two nonlinear-dynamics diagnostics extend the standard alignment invariants and connect this chapter to the broader causal-closure program.

**Floquet basin-robustness gap:** For a periodic tri-binary state $\mathcal{S}_{\mathbf{k}}$ with integer winding $\mathbf{k}$ and period $T_{\mathbf{k}}$, linearize the delay system around the periodic orbit and compute the leading Floquet multipliers $\{\mu_i\}$ off the symmetry directions. Define
$$
\Delta_{\mathbf{k}} = 1 - \max_{i\notin G}\|\mu_i(\mathbf{k})\|.
$$
Track $\Delta_{\mathbf{k}}$ along scans in declared $\beta_f = v_{\text{trans}}/c_f$ and $G_{\text{grad}}$. Stable rungs have $\Delta_{\mathbf{k}}>0$; rung termination, separator cycle-period divergence, and gradient-driven failure should all coincide with $\Delta_{\mathbf{k}}\to 0^+$.

**Grazing-bifurcation diagnostics at the separator:** Near $\|\mathbf{v}\|=c_f$, the post-crossing trajectory deviation is predicted to scale as $\sqrt{t-t_*}$ along the eigenvector of the newly activated self-hit root when the crossing parameter satisfies $s(t)-1\sim \dot{s}(t_*)(t-t_*)$ with $\dot{s}(t_*)\ne0$. Two simulation tests follow:

- log-log fit of phase-deviation versus time-since-crossing, expected to yield slope $1/2$;
- parameter sweep across the separator looking for a period-adding cascade in the integer ledger, with each adding event respecting $\Delta N\in 2\mathbb{Z}$.

These diagnostics belong here as observational quantities for the dynamics chapter. Their proof burdens include Floquet-spectrum discreteness for state-dependent self-hit path-history delays and grazing-normal-form derivation.

---

### Observer-Export Diagnostics

Each dynamics scan should output the substrate records needed by later reconstruction chapters without forming an effective line element in this file. The scan-level packet is
$$
\mathcal{D}_{\mathrm{tri}}(W)
=
\left(
N_{\text{hits},q},
T_q,
Q_{ab}^{(q)},
K_{\parallel}^{(q)},
K_{\perp}^{(q)},
\nu_J^{(q)},
\Delta_{\mathbf{k}}^{(q)},
G_{\text{grad}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right)_W.
$$
The spacetime and observer-inference chapters may convert this packet into lapse, ruler, signal, connection, and weak-field comparison variables. This chapter's obligation is narrower: certify that the packet comes from one retained causal-root branch chart in absolute time.

### Observables and Diagnostics (Summary)

- Core invariants: $R_{\text{core}}$, $\omega_{\text{core}}$, phase offsets.
- Ladder records: $R_{\text{out}}(t)$, $\omega_{\text{out}}(t)$, plateau stability.
- Geometry records: anisotropy ratio $A = R_\parallel/R_\perp$, forward vs backward delay ratio.
- Orientation records: inter-plane angles, precession cone angle.
- Stability records: sign of $\partial \Phi_n/\partial r$, phase-closure residuals.
- Gradient record: $G_{\text{grad}}$ and its effect on stability thresholds.
- Observer-export records: $N_{\text{hits},q}$, $T_q$, $Q_{ab}^{(q)}$, $K_{\parallel}^{(q)}$, $K_{\perp}^{(q)}$, $\nu_J^{(q)}$, $\Delta_{\mathbf{k}}^{(q)}$, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}$.

---

### Revision Triggers (Failure Modes)

1. **Core stability:** Unstable or non-repeatable invariants undermine outer-binary claims.
2. **Discrete rungs:** If plateaus do not exist or terminate, the top-rung thesis must be revised.
3. **High-velocity geometry:** If oblate geometry does not improve phase closure, the envelope model fails.
4. **High-gradient behavior:** If strong gradients erase alignment, record the boundary conditions and revise the alignment narrative.

---

### Acceleration-Gradient Branch Comparison

The local dynamics burden behind later equivalence-principle recovery is a substrate comparison, not an observer postulate. A uniformly accelerated assembly and a stationary assembly placed in a matched Noether-Sea gradient should output compatible delay-geometry records on the same kind of branch packet:
$$
\mathcal{D}_{\mathrm{tri}}^{\mathrm{accel}}(W)
\sim
\mathcal{D}_{\mathrm{tri}}^{\mathrm{grad}}(W),
$$
with the comparison made from phase-closure residuals, anisotropy ratios, branch-period records, stability thresholds, and cycle-averaged causal-work or phase-slip variance.

The ambient medium must participate in this comparison. Deforming the assembly alone is not enough, because the gradient-driven case changes the Noether-Sea response record while the accelerated case changes how the same retained causal-root ledger is transported through absolute time. The downstream observer-inference question is whether those exported packets recover the usual local equivalence behavior. This chapter only asks whether the substrate packets match before that translation.

---

### Routed Extensions

The following items are retained here only as dynamics-facing boundary conditions. Their full proof burdens belong to the broader causal-closure program, not to this chapter.

#### Tri-Binary Role Hypotheses

An electrino:positrino binary is the most primitive assembly considered in the current architecture. The $\mathbb{A}\mathbb{A}\mathbb{A}$ architecture posits that three binaries can become coupled into a Noether core, with each binary playing a distinct dynamical role.

Tri-binary minimality is a theorem target: the working claim is that three coupled binary layers are the minimal stable closure architecture capable of preserving inner memory, commensurability buffering, and boundary coupling under combined kinematic and gradient stress.

- **Inner binary** (MCB, partner/exterior comparison role): typically in/near self-hit branch ($v \gtrsim c_f$ by history), and would define fundamental units if MCB attractor is confirmed.
- **Middle binary** (partner/exterior comparison role): near the symmetry hinge ($v \approx c_f$) with variable radius/frequency; energy-storage fulcrum and coupling bridge.
- **Outer binary** (partner/exterior comparison role): typically $v < c_f$ with expansion/contraction modes; couples strongly to Noether-Sea gravitational/cosmological response.
At the terminal-alignment interface, the three binaries are treated as a different regime where forward-sector components approach $c_f$ together; in self-hit interior comparison hypotheses, wake-closure can be described with combined $v_{\text{eff}} > c_f$ without requiring every component speed to exceed $c_f$.

The stronger claim that this architecture supplies the basis for rest mass, observer clock behavior, photon behavior, and standard-model particle families remains a theorem burden for the broader causal-closure program.

#### Hinge Equation Sketch

**Equation of motion near the hinge ($v \approx c_f$)** For each architrino $i$ interacting with its partner $j$:
$$
\ddot{\mathbf{x}}_i(t)=\mathbf{a}_{i,j}(t;\{t_{p,k}\})+\mathbf{a}_{i,i}^{\mathrm{active}}(t;\{t_{s,m}\})+\mathbf{a}_{\text{ext}}(t),
$$
with delay constraints (causal roots):
$$
\|\mathbf{x}_j(t_{p,k})-\mathbf{x}_i(t)\|=c_f\,(t-t_{p,k}), \quad
\|\mathbf{x}_i(t_{s,m})-\mathbf{x}_i(t)\|=c_f\,(t-t_{s,m}),
$$
where $\mathbf{a}_{i,i}^{\mathrm{active}}$ is a shorthand for the sum over retained self-hit roots in $\mathcal{C}_{ii}(t)$, not an instantaneous switch $H(s-1)$. Self-hit remains path-history dependent: roots emitted during an earlier super-field-speed interval can stay active after the current speed has changed.
The second constraint is the native small-scale bridge-like causal structure in this sketch: the receiver at $\mathbf{x}_i(t)$ is linked to an earlier point on the same worldline by its own causal wake. The connectedness is path-history closure in the causal-root ledger, not a tunnel in the Euclidean void. Any connected-geometry translation belongs only after coarse-graining into an effective horizon-interface or metric description.

and $s=\|\mathbf{v}\|/c_f$. For symmetric, non-translating circular geometry, the delay angles satisfy
$$
\delta_p=2s\cos(\delta_p/2), \qquad \delta_s=2s\sin(\delta_s/2),
$$
with no self-hit solution for $s\le 1$ and a small-root branch $\tilde{\delta}_s\to 0^+$ for $s>1$. The radial/tangential split then reads
$$
\ddot r-r\dot\theta^2=A_{\text{rad}}(\delta_p,\delta_s), \qquad r\ddot\theta+2\dot r\dot\theta=T(\delta_p,\delta_s).
$$
The symmetry breaking at the hinge is geometric: as $\tilde{\delta}_s\to 0^+$ the self-hit radial factor scales like $1/\sin(\tilde{\delta}_s/2)$, turning on a large outward term while the state remains continuous.

The working guess that the self-hit regime may change the effective action-step scale from $\Delta L_c$ to $2\Delta L_c$ is a theorem burden for the broader causal-closure program. This chapter keeps only the local hinge geometry needed to state the dynamical branch condition.

#### Black-Hole Regime Note

The detailed black-hole treatment now lives in [../spacetime/black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md). For the purposes of this dynamics chapter, only the regime summary is needed:

- at the horizon interface, forward-sector components approach terminal alignment near $c_f$;
- in the interior, maximum-curvature and recycling dynamics dominate;
- outward release may later appear as jets, diffuse outflow, or dark-sector radiation channels.

This chapter therefore keeps only the tri-binary regime map and leaves the ontology, recycling logic, and observer-facing strong-field interpretation to the canonical spacetime chapters.

In the tri-binary picture, each Noether core is a nested stack of three coupled binaries whose internal frequencies and radii are locked by self-hit geometry. This chapter uses that mechanism to define the local dynamics and diagnostics. The coarse-grained metric, observer-clock, and strong-field ontology belong to the spacetime chapters and the causal-closure proof synthesis.

For the strong-field continuation of that story, see [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md) and [Horizon Chirality](../../../../markdown/aaa/spacetime/horizon-chirality.md).

## Dyadic Resonance Lock

This chapter studies resonance lock for the nested Outer, Middle, and Inner binaries. Its immediate goal is specific: identify the relationship between frequency, scalar tangential speed, and radius in a reduced branch where the middle binary caustic-grazes the field-speed hinge and the three rings form an exact integer phase-locked cycle.

It should be read together with [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md), [Tri-Binary Dynamics](../../../../markdown/aaa/dynamics/tri-binary-dynamics.md), [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md), and [Noether Core](../../../../markdown/aaa/spacetime/noether-swarm.md), which provide the assembly geometry and scale-setting context for the lock relations derived here.

The level distinctions matter throughout. Ontologically, the Outer, Middle, and Inner binaries are assembly layers built from architrino constituents. Dynamically, the reduced model replaces their full delayed causal-wake history by a finite-$\eta$ branch chart. Effectively, low-order multipoles and potentials are comparison summaries of that branch behavior. Inferentially, an integer lock is selected only after a cancellation score and a stability gap both favor it.

This chapter keeps the field speed $c_f$ explicit rather than setting it to one. We work with branch labels $k\in\{O,M,I\}$. Here $r_k$ is the characteristic layer radius and $v_k=\|\mathbf{v}_k\|$ is the scalar tangential speed of one member of layer $k$ around that layer's center.

### Status and Assumptions

The logic of the chapter is organized around one exact identity and four explicit assumptions. This separation prevents a kinematic formula from being mistaken for a dynamical selection principle.

#### Exact Kinematic Identity

For each ring,
$$
v_k = 2\pi f_k r_k = \beta_k c_f,
\qquad
0<\beta_k,
\qquad
c_f>0.
$$

Equivalently,
$$
f_k=\frac{v_k}{2\pi r_k},
\qquad
r_k=\frac{v_k}{2\pi f_k},
\qquad
v_k=2\pi f_k r_k.
$$

Plain language: for any one ring, if we know any two of frequency, tangential speed, and radius, then the third is fixed.

This identity is exact. It is not an assumption, and it does not select a lock by itself.

#### Assumption 1 (Middle Caustic-Grazing Closure)

In the reduced exterior and horizon-transition branch studied here, the middle binary is not pinned exactly on an infinite-force surface. It is modeled as a caustic-grazing carrier whose cycle-averaged hinge value is the field speed:
$$
v_M^{\mathrm{car}}=c_f,
\qquad
\beta_M^{\mathrm{car}}=1.
$$
For compact notation, the algebra below writes $v_M=c_f$ and $\beta_M=1$ for this carrier value.

The branch-level motion may have microscopic crossings
$$
v_M(t)=c_f+\delta v_M(t),
\qquad
\langle \delta v_M\rangle_W=0
$$
over the declared window $W$. Each regularized crossing of the $J=0$ boundary is a caustic transit with finite impulse
$$
\Delta\mathbf{v}_{M,n}
=
\int_{t_n^-}^{t_n^+}
\mathbf{a}_M^{(\eta)}(t)\,dt,
\qquad
\left\|\Delta\mathbf{v}_{M,n}\right\|<\infty,
$$
rather than an infinite-force constraint. These impulse events are candidate mechanical origins for the discrete causal-root ledger steps used in the [energy bookkeeping](../../../../markdown/aaa/dynamics/energy.md#self-hit-echo-and-discrete-steps-working-note).

This is the main regime assumption of the chapter. The speed $c_f$ is the propagation speed of causal isochrons in the reduced dynamics, not an observer-level claim about an effective metric.
It is not a claim that every Noether-core regime has the middle binary exactly at $c_f$; ordinary weak-stress operation may keep the middle layer only near the hinge scale, while the caustic-grazing carrier belongs to the reduced exterior/horizon-transition branch.

#### Assumption 2 (Exact Integer Phase Closure)

Let the outer period be $T_O=\frac{1}{f_O}$. Assume that when the outer ring completes one full cycle, the middle and inner rings also land exactly at the beginning of their own cycles. Equivalently, there exist integers
$$
m,n\in\mathbb{N},
\qquad
1<m<n,
$$
such that
$$
\theta_O(t+T_O)=\theta_O(t)+2\pi,
$$
$$
\theta_M(t+T_O)=\theta_M(t)+2\pi m,
$$
$$
\theta_I(t+T_O)=\theta_I(t)+2\pi n.
$$

Therefore $f_O:f_M:f_I = 1:m:n$, with $f_M=m f_O$ and $f_I=n f_O$.

Plain language: after one outer revolution, the middle and inner rings have completed whole numbers of revolutions as well, so the three-ring pattern closes exactly.

This is the reduced constant-frequency carrier model. It is a branch-level closure assumption, not a statement that the assembly has only three degrees of freedom. In the full Noether-core closure problem, the simple phases $\theta_k=q_k\Omega t+\phi_k$ are replaced by integrated winding, causal-root, and frame-phase ledgers over the accepted branch chart.

#### Assumption 3 (Fixed Relative Phase Lock)

The lock is not just commensurate in frequency. It also carries fixed relative phase offsets over time. One convenient formulation is
$$
\phi_{MO}(t)\equiv \theta_M(t)-m\theta_O(t)=\phi_{MO}^\ast,
$$
$$
\phi_{IO}(t)\equiv \theta_I(t)-n\theta_O(t)=\phi_{IO}^\ast,
$$
with constants $\phi_{MO}^\ast,\phi_{IO}^\ast$.

Plain language: the rings keep the same timing relationship cycle after cycle rather than drifting through one another.

#### Assumption 4 (Cancellation Selection Principle)

Among the admissible integer locks $(1:m:n)$, the physically selected lock is assumed to be the one that yields the strongest cycle-averaged cancellation of the relevant low-order causal-wake multipole or effective potential signal.

This is a selection principle, not yet a theorem. Its role is to explain why one exact integer lock might be preferred over nearby commensurate alternatives.
The admissible class must be declared before minimization: positive radii, $1 < m < n$, a fixed finite-$\eta$ branch chart, nonzero branch-Jacobian floors, and the speed bounds assigned to the exterior/horizon regime.

A minimal test functional can be written before committing to a particular lock. Let $q_O=1$, $q_M=m$, and $q_I=n$, with phase variables $\theta_k=q_k\Omega t+\phi_k$. For a low-order truncation depth $L$, define
$$
S_L(t)
=
\sum_{k\in\{O,M,I\}}\sum_{a=1}^{L}
A_{k,a}(\beta_k,r_k,\eta,J)\,
e^{ia(q_k\Omega t+\phi_k)}.
$$
The coefficients $A_{k,a}$ are not free fit parameters. They must be extracted from the same finite-$\eta$ branch-strength, branch-Jacobian, and causal-wake ledger used to test the candidate lock.
They therefore belong to the dynamics of the causal-wake branch chart, even when the resulting signal is later summarized as an effective potential.
The cycle-averaged cancellation score is
$$
C_L(m,n;\phi)
=
\frac{1}{T}\int_0^T |S_L(t)|^2\,dt
=
\sum_{\nu}
\left|
\sum_{(k,a):\,a q_k=\nu}
A_{k,a}e^{ia\phi_k}
\right|^2.
$$
The dyadic claim becomes a theorem target only if $(m,n)=(2,4)$ minimizes this score under the admissible branch equations and retains a positive stability gap.

**Harmonic-overlap lemma.** The score decomposes into resonance blocks labeled by $\nu$. A phase choice can affect cancellation between two layers only when their finite harmonic supports overlap:
$$
\nu\in q_k\{1,\ldots,L\}\cap q_j\{1,\ldots,L\}.
$$
If a block has no overlap, its contribution to $C_L$ is phase-independent and cannot select an integer lock. For the dyadic candidate $(m,n)=(2,4)$, the first Outer/Middle overlap is $\nu=2$ via $(O,a=2)$ and $(M,a=1)$; the first all-layer overlap is
$$
\nu=4
$$
via $(O,a=4)$, $(M,a=2)$, and $(I,a=1)$. Thus this functional can select $1:2:4$ only if $L\ge4$ and the $\nu=4$ block has nontrivial branch-derived amplitudes. A complete cancellation of that all-layer block additionally requires the amplitude magnitudes to satisfy the polygon condition
$$
\max(|A_{O,4}|,|A_{M,2}|,|A_{I,1}|)
\le
\text{sum of the other two}.
$$
The lemma is only a harmonic support statement. It shows where cancellation is possible; it does not show that the branch-derived amplitudes or the return-map stability actually select the dyadic lock.

#### Non-Assumptions

This chapter does **not** assume:

- common-speed closure $v_O=v_M=v_I$,
- self-similar radii $r_M=r_O/s$, $r_I=r_O/s^2$,
- or the specific frequency lock $1:2:4$ at the outset.

Those are possible special cases or later outcomes, not starting axioms here.
This chapter studies exact integer closure. Rational or self-similar locks can be compared only after clearing denominators or constructing a separate branch map.

### Immediate Consequences

This section is pure algebra from the exact identity and the first two assumptions. It does not use the cancellation principle.

From Assumptions 1-2 and the exact identity, the middle carrier radius is fixed by the outer frequency:
$$
r_M=\frac{c_f}{2\pi f_M}
=
\frac{c_f}{2\pi m f_O}.
$$

For the outer ring,
$$
r_O=\frac{v_O}{2\pi f_O}
=
\frac{\beta_O c_f}{2\pi f_O}.
$$
Hence
$$
\frac{r_M}{r_O}
=
\frac{1}{m\beta_O},
\qquad
r_M=\frac{r_O}{m\beta_O}.
$$

For the inner ring,
$$
r_I=\frac{v_I}{2\pi f_I}
=
\frac{\beta_I c_f}{2\pi n f_O},
$$
so
$$
\frac{r_I}{r_O}
=
\frac{\beta_I}{n\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O.
$$

These are the core radius relations of the chapter:
$$
r_M=\frac{r_O}{m\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O.
$$

They show that once the integer lock $(1:m:n)$ is fixed, the remaining geometry depends on the outer and inner speed factors $\beta_O$ and $\beta_I$. Thus a frequency hierarchy is not yet a radius hierarchy.

### Proposition 1 (Exterior Integer Lock Formulas)

Under Assumptions 1-2,
$$
f_O:f_M:f_I = 1:m:n,
$$
and
$$
r_O:r_M:r_I
=
1:\frac{1}{m\beta_O}:\frac{\beta_I}{n\beta_O}.
$$

**Proof.** The frequency ratio is exactly Assumption 2. The radius ratios follow from
$$
r_k=\frac{\beta_k c_f}{2\pi f_k}
$$
together with the carrier value $\beta_M=1$, $f_M=m f_O$, and $f_I=n f_O$. $\square$

The geometry is controlled by integer phase closure plus the middle caustic-grazing carrier condition. The proposition makes no claim about which integer pair is dynamically preferred.

### Could $1{:}2{:}4$ Be a Solution?

If one later chooses the dyadic integers
$$
m=2,
\qquad
n=4,
$$
then
$$
f_O:f_M:f_I = 1:2:4,
$$
but the radius ratios become
$$
r_O:r_M:r_I
=
1:\frac{1}{2\beta_O}:\frac{\beta_I}{4\beta_O}.
$$

So the dyadic frequency lock is a viable candidate pattern, but it does **not** by itself imply equal-speed geometry, and it does **not** by itself imply a self-similar radius law unless further assumptions are added.

### What Exact Periodicity Gives, and What It Does Not

Exact periodicity naturally supports rational or integer commensurability, but it does not by itself choose the integers $m,n$.

What exact lock gives:

- outer, middle, and inner frequencies lie on a commensurate lattice,
- the three-ring configuration repeats after one outer period,
- fixed relative phases become meaningful dynamical observables.

What exact lock does not give by itself:

- that the preferred lock is dyadic,
- that the branch speeds are equal,
- that the radii are self-similar,
- or that cancellation is actually maximal for one specific integer pair $(m,n)$.

The cancellation principle is the extra ingredient intended to select among the many admissible integer locks.

### Interpreting the Cancellation Principle

The motivation for Assumption 4 is that a cycle-closing integer lock can support persistent superposition over repeated outer periods. If the phase organization is favorable, the low-order causal-wake multipole or effective potential contribution can cancel more effectively over one full return cycle.

At the substrate level, the relevant quantity is exposed causal-wake leakage. At the effective level, the same organization may be reported as reduced low-order potential signal. At the inference level, the reduced model is allowed to select a lock only if the cancellation gap survives the declared truncation and stability tests.

In that sense, the selection principle is closer to a resonance-and-superposition argument than to a bare numerology of integer ratios. The intuition is that a physically preferred lock should minimize exposed wake leakage and phase-slip variance subject to the delayed dynamics.

This does not yet prove which pair $(m,n)$ wins. It states the criterion that the reduced model should test.

### RG-Style Truncation Test

The cancellation functional uses a finite harmonic depth
$$
L.
$$
That truncation must be certified rather than assumed. The useful analogy from renormalization-group reasoning is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ inherits a field-theory RG flow, but that discarded modes must be shown irrelevant for the decision being made.

For a candidate lock $(m,n)$, define the tail score
$$
T_L(m,n)
\equiv
\sum_{\nu>L_{\mathrm{eff}}}
\left|
\sum_{(k,a):\,a q_k=\nu}
A_{k,a}e^{ia\phi_k}
\right|^2,
$$
where
$$
L_{\mathrm{eff}}
$$
is the largest resonance block retained in the selection audit. The finite-depth proof must supply a bound
$$
T_L(m,n)\le \varepsilon_L
$$
uniformly over the admissible branch chart and then compare the winner gap
$$
\Delta C_L
\equiv
\min_{(m,n)\ne(m_\ast,n_\ast)}
\big(C_L(m,n)-C_L(m_\ast,n_\ast)\big)
$$
against the truncation error. A lock is selected by the finite calculation only if
$$
\Delta C_L>2\varepsilon_L.
$$

This turns "higher harmonics are small" into a checkable theorem target tied to the same branch-derived amplitudes used in
$$
C_L.
$$

### Reduced-Theorem Target

The right theorem target is not "prove $1:2:4$ from kinematics alone." The stronger target is a proof route that keeps kinematics, branch dynamics, effective cancellation, and inference separate:

1. classify the admissible integer locks $(1:m:n)$ under exact delayed phase closure,
2. compute the corresponding radius relations under $\beta_M=1$,
3. define a cycle-averaged cancellation functional for the low-order causal-wake multipole or effective potential,
4. determine which integer lock minimizes that functional in the exterior/horizon regime,
5. and verify the selected lock by a finite-$\eta$ return map with a positive Floquet gap.

Equivalently, for each candidate $(m,n)$ one should construct a return map
$$
P_{\eta,m,n}:\mathcal{S}_{m,n}\to\mathcal{S}_{m,n}
$$
on the retained branch chart and require
$$
\Delta_{m,n}
=
1-\max_{i\notin G}|\mu_i(P_{\eta,m,n})|
>0
$$
off the neutral symmetry directions $G$.

Here $\mathcal{S}_{m,n}$ is a finite-$\eta$ reduced phase-amplitude branch chart: it retains the layer phases, radii, speeds, active branch data, branch-Jacobian floors, and history variables needed to evaluate one outer-period return. The neutral directions $G$ are the symmetry directions removed before testing stability, such as global time shift, global spatial rotation, and any declared relabeling symmetry of the retained branch chart.

If the minimizer turns out to be $(1,2,4)$, then the dyadic hierarchy would be a derived selection result rather than a starting assumption.

#### Recurrence Diagnostic

The finite-$\eta$ return-map test should also reject transient near-locks. For a sampled returned-branch trajectory
$$
z_i=(\phi_i,a_i,\nu_i,\ell_i)\in\mathcal{S}_{m,n},
$$
define a recurrence matrix
$$
Q^{(\epsilon)}_{ij}
=
\mathbf{1}
\left[
d_{\mathcal{S}}(z_i,z_j)<\epsilon
\right],
$$
where $d_{\mathcal{S}}$ is the declared branch-chart distance after quotienting the neutral symmetries in $G$. A candidate $1{:}2$ row, or a chained $1{:}2{:}4$ row, is recurrence-positive only if returned-section hits recur at the declared outer-period multiples, the recurrence period agrees with the winding and active-branch ledger, the recurrence structure persists under timestep, history-resolution, and $\eta$ refinement, and nearby trials that fail the non-symmetry Floquet gap do not pass this recurrence check.

### Ancillary Symmetry Check

The older $\mathbb{Z}_3$ dipole-cancellation identity can still be kept as a separate symmetry test:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0.
$$

That identity may help characterize a radiative-stealth phase arrangement of an already-formed lock, but it should not be confused with the frequency-selection assumptions above.

For neighboring closure problems, see [Planar Bridge Closure](../../../../markdown/aaa/proof-programs/planar-bridge-closure.md) and [Horizon Chirality](../../../../markdown/aaa/spacetime/horizon-chirality.md).

## Causal Action Functional

This chapter develops the action-counting complement to the master-equation treatment of dynamics. Its job is to define a scalar causal-hit statistic that compares delayed worldline structures, labels candidate assembly classes, and supplies one geometric input to later mass, shielding, and medium-response closure. It is not the exact variational action for the Master EOM; action-derived dynamics require the variation residual to vanish under the test stated in [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md#regularized-nonlocal-action-and-variation) and [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian).

The current scope is mixed. Some statements are theorem-backed in the regularized setting, while the larger closure program remains open. The chapter therefore begins with the problem statement and core functional definitions, then separates the controlled theorem spine from benchmarks, implementation notes, and longer-range closure targets.

### Problem Statement and Goal
The broad objective is to explain why only certain assemblies are stable and discrete, and to treat observer-level mass as an exposed response of trapped causal history, shielding, and Noether-Sea coupling rather than an externally assigned input. The target in this chapter is narrower: a geometric causal-locus statistic derived from the causal-wake kernel that can be evaluated on periodic orbits, compared across topological classes, and tested against dynamical stability.
Canonical dynamics are defined in [The Master Equation (Canonical Form)](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form); this chapter provides the complementary action-functional lens.

The level separation is essential:

1. **Ontology:** architrino histories emit causal wakes in absolute time and the Euclidean void.
2. **Dynamics:** the master equation sums delayed, Jacobian-weighted line-of-action hits.
3. **Statistic:** the functional in this chapter removes direction and counts weighted causal intersections.
4. **Effective/inferential use:** mass response, effective geometry, and branch spectra are later reconstructions that must be checked against the actual delayed dynamics.

### Core Functional Definitions
**Scalar causal-hit counting functional:**
$$
\mathcal{A}_{\text{self}}[\gamma] = \iint_{\gamma \times \gamma}
\frac{\delta\!\big(\|\mathbf{x}(t)-\mathbf{x}(t')\| - c_f|t-t'|\big)}
{\|\mathbf{x}(t)-\mathbf{x}(t')\|^2\,J_\gamma(t,t')}\,dt\,dt'
$$
We introduce a scalar causal-hit counting functional to make stability searches comparable across trajectories. This is not the exact Fokker-type variational action of [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md); it is the branch-density statistic obtained after retaining the received inverse-square and Jacobian weights while discarding line-of-action direction. Its appropriate use is to nominate dynamically preferred worldline classes, then test those nominations with the master-equation flow before interpreting them as discrete observer-level particle states.

This integrates over all nontrivial pairs of points on a single worldline and counts only those pairs that are causally connected by a wake moving at speed $c_f$. The trivial diagonal $t=t'$ is excluded, either by a punctured domain or by a cutoff $|t-t'|\ge\tau_{\min}>0$. The inverse-square factor weights nearby self‑hits more strongly than distant ones, while $J_\gamma^{-1}$ accounts for the geometric bunching or dilation of the delayed flux along the active branch.
Convention: this document distinguishes the compact symmetric selector $|t-t'|$ from the lifted delayed selector $\Delta_m=t-t'+mT$. The symmetric form is useful on one-period charts; the lifted delayed form is required when multi-period causal roots are active.
Here $J_\gamma(t,t')$ denotes the absolute delay-map Jacobian induced by the causal constraint, namely $J_\gamma(t,t')=\left|\partial_{t'}\big(\|\mathbf{x}(t)-\mathbf{x}(t')\|-c_f|t-t'|\big)\right|$. When comparing to the dimensionless master-equation Jacobian $1-\mathbf{v}\cdot\hat{\mathbf{r}}/c_f$, divide this absolute Jacobian by $c_f$ and absorb any constant factor into the declared normalization.

**Interpretation:**
1. **Object:** The full worldline $\gamma$ is treated as a single geometric object.
2. **Constraint:** The delta function enforces the causal-isochron condition, selecting causally connected pairs.
3. **Measure:** The inverse-square weight emphasizes close self‑hits over distant ones, while the Jacobian factor converts constant source emission into the correct received causal flux.

**Lifted normalized periodic self‑action statistic:**
$$
\Delta_m(t,t')=t-t'+mT,
\qquad
F_m(t,t')=r(t,t')-c_f\Delta_m(t,t').
$$
For a $T$-periodic orbit, finite memory depth $h$, and nontrivial-branch cutoff $\tau_{\min}>0$, use
$$
\bar{\mathcal{A}}_{\text{self},\eta,h,\tau_{\min}}[\gamma]
=
\frac{1}{T}
\int_0^T\sum_{m\in\mathbb{Z}}\int_0^T
\mathbf{1}_{\tau_{\min}\le\Delta_m\le h}
\frac{\delta_\eta\!\big(F_m(t,t')\big)}
{r(t,t')^2\,J_m(t,t')}\,dt'\,dt.
$$
with $r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|$, $\delta_\eta$ a mollified delta, and $J_m(t,t')=\left|\partial_{t'}F_m(t,t')\right|$ on a simple delayed branch. This lifted form captures multi-period circular roots and avoids the trivial diagonal. A symmetric $|t-t'|$ selector is equivalent only after the diagonal is excluded and the delayed half-domain normalization is corrected; otherwise it misses high-winding branches or double-counts them.
Dimensional status depends on the chosen time/length units and normalization by $T$, $h$, and $c_f$; use a declared dimensionless rescaling before comparing this statistic to mass or action coefficients.

**Lifted finite-memory bound.** If the lifted statistic is restricted to $\tau_{\min}\le\Delta_m\le h$, the active support satisfies $r\ge r_{\min}>0$, and the simple-branch floor $J_m\ge J_{\min}>0$ holds, then
$$
0\le
\bar{\mathcal{A}}_{\text{self},\eta,h,\tau_{\min}}
\le
\frac{(h-\tau_{\min})\|\delta_\eta\|_\infty}
{r_{\min}^2J_{\min}}.
$$
The reason is that, for each fixed $t$, the lifted intervals selected by $m$ partition the delay line over the retained memory window:
$$
\sum_m\int_0^T
\mathbf{1}_{\tau_{\min}\le\Delta_m\le h}\,dt'
=
h-\tau_{\min}.
$$
Under transversality, the weak coarea limit becomes
$$
\frac{1}{T}\sum_m
\int_{\mathcal{L}_m}
\frac{1}{r^2J_m\|\nabla F_m\|}\,d\ell,
\qquad
\mathcal{L}_m=\{F_m=0,\ \tau_{\min}\le\Delta_m\le h\}.
$$
Therefore simulations comparing lifted action-density values must report $h$, $\tau_{\min}$, the retained $m$ range, $r_{\min}$, $J_{\min}$, the transversality floor, and inactive-root gaps.

**Total scalar action-counting statistic (multi‑assembly):**
$$
\bar{\mathcal{A}}_{\text{total}}[\{\gamma_i\}] =
\frac{1}{T^2}\left[
\sum_i \int_0^T\!\int_0^T
\frac{\delta_\eta\!\big(r_{ii}(t,t')-c_f|t-t'|\big)}{r_{ii}(t,t')^2\,J_{ii}(t,t')}\,dt\,dt'
\;+\;
\frac{1}{2}\sum_{i\ne j}\int_0^T\!\int_0^T
\frac{\delta_\eta\!\big(r_{ij}(t,t')-c_f|t-t'|\big)}{r_{ij}(t,t')^2\,J_{ij}(t,t')}\,dt\,dt'
\right]
$$
This single-period symmetric form aggregates self‑terms and cross‑terms between components, with the $\frac{1}{2}\sum_{i\ne j}$ convention ensuring unordered pairs are counted once. Self-terms inherit the same nontrivial-branch exclusion used above. When multi-period branches are active, replace each symmetric selector by the lifted finite-memory form before comparing totals across branch charts.

**Definitions:** $r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|$, $r_{ij}(t,t')=\|\mathbf{x}_i(t)-\mathbf{x}_j(t')\|$, $\Delta t = t-t'$, and $J_{ij}(t,t')=\left|\partial_{t'}\big(r_{ij}(t,t')-c_f|t-t'|\big)\right|$ is the branch Jacobian induced by the delayed causal constraint.

**Kernel comparison:**
$$
\text{Force kernel: } \left[ \frac{\hat{\mathbf{r}}(t,t')}{r^2\,J}, \delta\!\big(r-c_f\Delta t\big) \right]
\qquad
\text{Scalar statistic kernel: } \left[ \frac{1}{r^2\,J}, \delta\!\big(r-c_f\Delta t\big) \right]
$$
The force kernel retains direction via $\hat{\mathbf{r}}$, while the scalar statistic kernel keeps only the magnitude. This is the minimal change that turns a vector interaction into a scalar comparison functional while preserving the same causal Jacobian geometry as the master equation. It should not be read as the exact Fokker-type action whose variation derives the force law.

As a scalar, $\mathcal{A}_{\text{self}}$ summarizes the total strength of causal self‑hits along a worldline. It is derived directly from the interaction structure, but with the directional information removed.

For reference, the self‑interaction term in the master equation uses the same kernel:
$$
\mathbf{a}_{\text{self}}(t)
=\kappa q^2\int dt' \,
\frac{\hat{\mathbf{r}}(t,t')}{r^2(t,t')\,J_\gamma(t,t')}
\delta\!\big(r(t,t')-c_f(t-t')\big)
$$

### Regularized Mathematical Setting (Explicit Regime)

To separate what is already controlled from what remains conjectural, we work in the
regularized regime $\eta>0$ and state all claims on one period.

Define
$$
\phi_\eta(u)\equiv \delta_\eta(u),
\qquad
F_\gamma(t,t')\equiv r(t,t')-c_f|t-t'|,
\qquad
r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|.
$$

For a $T$-periodic $C^2$ trajectory $\mathbf{x}(t)$ with no collisions or trivial self-support on the sampled
domain ($r(t,t')\ge r_{\min}>0$, $|t-t'|\ge\tau_{\min}>0$ on self terms, and $J_\gamma(t,t')\ge J_{\min}>0$ on support of $\phi_\eta$), define
$$
\bar{\mathcal{A}}_{\text{self},\eta}[\gamma]
=\frac{1}{T^2}\int_0^T\!\!\int_0^T
\frac{\phi_\eta(F_\gamma(t,t'))}{r(t,t')^2\,J_\gamma(t,t')}\,dt\,dt'.
$$

This is the single-period symmetric object for proofs and numerics when one period contains the full relevant causal memory. It is therefore a controlled chart, not the most general causal-memory functional. When high-winding or multi-period branches are active, replace it by the lifted statistic above with the same lower-bound and Jacobian assumptions. The unregularized $\eta\to0^+$ limit is treated only after bounds are established.

### Axioms and Admissibility Assumptions

We use the following minimal assumption set for theorem-level statements:

- **(A1) Regularity:** $\mathbf{x}\in C^2(\mathbb{R};\mathbb{R}^3)$ and is $T$-periodic.
- **(A2) Finite-speed causality:** The causal selector is $F_\gamma(t,t')=0$ with field speed $c_f>0$.
- **(A3) Collision and trivial-diagonal exclusion on support:** $r(t,t')\ge r_{\min}>0$ whenever $\phi_\eta(F_\gamma(t,t'))\neq0$, with $|t-t'|\ge\tau_{\min}>0$ on self terms unless a separate core regularization is declared.
- **(A3b) Jacobian nondegeneracy on support:** $J_\gamma(t,t')\ge J_{\min}>0$ whenever $\phi_\eta(F_\gamma(t,t'))\neq0$.
- **(A4) Transversality (generic branch):** $\nabla F_\gamma\neq0$ along the selected causal set.
- **(A5) Fixed topological class:** Deformations are taken inside one homotopy class on $T^2$ unless a bifurcation condition is crossed.
- **(A6) Isolated system bookkeeping:** When connecting to dynamics, energy/momentum use the same $\eta$ and history window conventions as the master-equation diagnostics.

These assumptions are deliberately local and testable. If any assumption fails, the
corresponding theorem is not claimed.

### Rationale for the Functional
- **Action-like comparison candidate:** If a motion class is stationary or extremal for this statistic, the result gives a candidate branch label. It does not by itself prove attraction, rest mass, or a variational derivation of the master equation.
- **Bridge to geometric analysis and knot theory:** Showing that simple periodic motions, such as maximum-curvature self-hit orbits, locally minimize $\mathcal{A}_{\text{self}}$ within a topological class would give a geometric reason to test those orbits as preferred branches.
- **Simulation-friendly statistic:** Given any numerically computed orbit, one can sample $(t,t')$, test the causal-isochron condition, and estimate $\mathcal{A}_{\text{self}}[\gamma]$ to compare geometries. This makes the "stable = local minimum" heuristic a testable claim rather than a definition.
- **Statistical-invariant candidate:** Because the functional is built from the master-equation kernel and can be estimated from simulated histories, it is a candidate input to invariant-measure or basin-measure studies of attractor selection.

### Geometric/Topological Framework
**Causal locus on the torus:** For a periodic orbit the domain $(t,t')\in[0,T]^2$ is a torus. The causal locus
$$
\mathcal{L}_{\text{causal}} = \{(t,t')\in T^2 \mid \|\mathbf{x}(t)-\mathbf{x}(t')\| = c_f|t-t'|\}
$$
is the set of self-hits. Its winding numbers $(p,q)$ on $T^2$ are **discrete labels** for orbit families. As geometric control parameters change, the locus can undergo reconnection events; these are the bifurcations where families appear or disappear, giving a branch-topology mechanism for discrete self-hit patterns. In the circular benchmark below, sub-$c_f$ motion leaves $\mathcal{L}_{\text{causal}}$ empty after the trivial diagonal is removed, while super-$c_f$ motion creates branches whose closure determines the integer self-hit count per period.
The self‑action integral is the **weighted arc length** of $\mathcal{L}_{\text{causal}}$ with weight $1/(r^2 J_\gamma)$, so topology and metric weight enter together.

**Causal writhe (chirality):**
$$
Wr_c[\gamma] = \iint_{\mathcal{L}_{\text{causal}}} \text{sign}\!\big(\mathbf{v}(t)\times\mathbf{v}(t')\cdot\mathbf{r}(t,t')\big)\,d\ell
$$
where $\mathbf{r}(t,t')=\mathbf{x}(t)-\mathbf{x}(t')$ and $d\ell$ is the induced line measure on the causal locus. This is a candidate signed measure of handedness for the self‑interaction pattern. Nonzero $Wr_c$ is a possible topological handle for chirality/spin closure; it is not yet a proof that spin is fixed by the causal locus alone.

**Topological vs Noether data:** Continuous symmetries (time shifts, rotations) identify Noether-charge targets: energy from time-translation symmetry and total angular momentum from rotational symmetry. In a closed symmetry-preserving delayed action these would become conserved history functionals. The winding class of $\mathcal{L}_{\text{causal}}$ supplies **topological charge candidates**. A generation-level claim would require a branch that is both Noether-stationary and topologically locked; dissociation would then require changing the winding class, i.e., a reconnection of $\mathcal{L}_{\text{causal}}$.

**Topological charge as a comparison invariant:** The soliton comparison teaches a useful restraint: a topological charge labels a sector, while a dynamical or variational argument must still select a representative inside that sector. For this chapter the native invariant is the homology class of the causal locus. Write
$$
Q_{\mathrm{causal}}(\gamma)
=
\{[(\mathcal{L}_{\text{causal}})_a]\}_a
\subset H_1(T^2,\mathbb{Z}),
$$
the multiset of winding classes of connected causal-locus components, optionally refined by source identity and chirality sign. The comparison rule is:
$$
Q_{\mathrm{causal}}(\gamma_0)=Q_{\mathrm{causal}}(\gamma_1)
$$
means the two trajectories lie in the same branch-topology sector; it does not imply equal action, equal mass response, or stability. A stability claim additionally needs either a constrained critical-point test for
$$
\bar{\mathcal{A}}_{\text{total}}
$$
or a return-map spectrum for the actual delayed dynamics.

**Instanton-style path competition:** When two branch-topology sectors are connected only by passing through a transversality failure, the useful comparison object is not a new force law but a minimal regularized barrier in path space. For a one-parameter path of histories
$$
\Gamma:[0,1]\to \mathcal{H}_h,
\qquad
\Gamma(0)=\gamma_0,
\qquad
\Gamma(1)=\gamma_1,
$$
define the barrier proxy
$$
B_{\eta,h}(\gamma_0\to\gamma_1)
\equiv
\inf_{\Gamma}
\max_{s\in[0,1]}
\bar{\mathcal{A}}_{\text{total},\eta,h}[\Gamma(s)].
$$
The infimum is taken over paths whose endpoints lie in the declared sectors and whose intermediate histories obey the same regularization convention. This is an instanton-like comparison only in the variational sense: it measures the least regularized action-counting barrier between sectors. It does not assert tunneling, supersymmetry, or Euclidean field-theory ontology.

**Multi-component topology:** For assemblies, project the spatial trajectories over one period, classify the resulting link, and when hyperbolic, use the volume of the link complement as a comparison measure. Brunnian or highly knotted complements are evidence for strong causal interlocking; higher action density remains a dynamical/statistical claim to be measured with the same kernel.

### Theorem Spine (Provable Core under A1-A5)

In this section we also assume standard approximate-identity properties:
$\phi_\eta\ge0$, $\int_{\mathbb{R}}\phi_\eta(s)\,ds=1$, $\|\phi_\eta\|_\infty<\infty$ for fixed $\eta>0$, and $\phi_\eta\to\delta$ weakly as $\eta\to0^+$. Compact support or sufficient decay may be used; the estimates below require boundedness on the sampled domain.

#### Assumptions Checklist (Use Before Citing a Theorem)

| Claim | A1 | A2 | A3 | A3b | A4 | A5 |
| --- | --- | --- | --- | --- | --- | --- |
| Theorem 1 (finiteness/nonnegativity) | required | required | required | required | not required | not required |
| Theorem 2 (coarea limit) | required | required | required | required | required | not required |
| Corollary 2.1 (integer labels) | required | required | required | not required | required | required |
| Theorem 3 (bifurcation criterion) | required | required | required | not required | required (except at critical value) | required |
| Theorem 4 (two-sided bounds) | required | required | required | required | not required | not required |

#### Theorem 1 (Well-defined finite regularized action)
Under (A1)-(A3b), $\bar{\mathcal{A}}_{\text{self},\eta}[\gamma]$ is finite and nonnegative.

**Proof.** Write
$$
\bar{\mathcal{A}}_{\text{self},\eta}
=
\frac{1}{T^2}\int_{[0,T]^2}\frac{\phi_\eta(F_\gamma(t,t'))}{r(t,t')^2 J_\gamma(t,t')}\,dt\,dt'.
$$
The integrand is nonnegative because $\phi_\eta\ge0$, $r^{-2}>0$, and $J_\gamma^{-1}>0$, so $\bar{\mathcal{A}}_{\text{self},\eta}\ge0$.
By (A3) and (A3b), on the support of $\phi_\eta(F_\gamma)$ we have $r\ge r_{\min}>0$ and $J_\gamma\ge J_{\min}>0$, hence
$r^{-2}J_\gamma^{-1}\le r_{\min}^{-2}J_{\min}^{-1}$. Therefore
$$
0\le \bar{\mathcal{A}}_{\text{self},\eta}
\le
\frac{1}{T^2}\,r_{\min}^{-2}J_{\min}^{-1}\,\|\phi_\eta\|_\infty\,|[0,T]^2|
=
\frac{\|\phi_\eta\|_\infty}{r_{\min}^2 J_{\min}}<\infty.
$$
So the functional is finite and nonnegative.

#### Theorem 2 (Coarea reduction to causal locus)
Under (A1)-(A4), the $\eta\to0^+$ limit of
$\bar{\mathcal{A}}_{\text{self},\eta}$ is the weighted 1D measure of the causal locus:
$$
\lim_{\eta\to0^+}\bar{\mathcal{A}}_{\text{self},\eta}
=
\frac{1}{T^2}
\int_{\mathcal{L}_{\text{causal}}}
\frac{1}{r(t,t')^2\,J_\gamma(t,t')\,\|\nabla F_\gamma(t,t')\|}\,d\ell,
$$
where $\mathcal{L}_{\text{causal}}=\{(t,t')\in T^2: F_\gamma(t,t')=0\}$.

**Proof.** Apply the coarea formula on $[0,T]^2$ with level function $F_\gamma$:
$$
\int_{[0,T]^2}\frac{\phi_\eta(F_\gamma)}{r^2 J_\gamma}\,dt\,dt'
=
\int_{\mathbb{R}}\phi_\eta(s)\,
H(s)\,ds,
$$
with
$$
H(s)\equiv
\int_{F_\gamma^{-1}(s)}
\frac{1}{r^2\,J_\gamma\,\|\nabla F_\gamma\|}\,d\ell.
$$
By (A4), $\|\nabla F_\gamma\|$ is nonzero on $F_\gamma^{-1}(0)$, so in a small tubular neighborhood of the zero level the level sets are regular 1-manifolds and $H(s)$ is continuous near $s=0$. By (A3) and (A3b), both $r^{-2}$ and $J_\gamma^{-1}$ are bounded on the active support, so $H(s)$ is locally bounded. Since $\phi_\eta$ is an approximate identity, $\int \phi_\eta(s)H(s)\,ds\to H(0)$ as $\eta\to0^+$. Dividing by $T^2$ yields the claimed limit.

#### Corollary 2.1 (Discrete branch labels)
Connected components of $\mathcal{L}_{\text{causal}}$ carry winding numbers
$(p,q)\in\mathbb{Z}^2$ on $T^2$. These are unchanged under smooth deformations that
preserve (A4) and remain inside one homotopy class (A5).

**Proof.** Under (A4), each connected component of the level set $F_\gamma=0$ is a smooth embedded closed curve on $T^2$, hence defines a homology class in $H_1(T^2,\mathbb{Z})\cong\mathbb{Z}^2$. The coordinates of this class are the winding numbers $(p,q)$. Under a smooth deformation preserving regularity and homotopy class, components evolve by isotopy, so their homology classes are unchanged.

#### Theorem 3 (Bifurcation criterion for quantized branch changes)
For a smooth one-parameter family $\gamma_\lambda$ (equivalently $F_\lambda$), component count and winding labels can change only at parameter values $\lambda_*$ where transversality fails:
$$
F_{\lambda_*}(t,t')=0,\qquad \nabla F_{\lambda_*}(t,t')=0
$$
for some $(t,t')\in T^2$.

**Proof.** Fix $\lambda_0$ such that $F_{\lambda_0}^{-1}(0)$ is regular (A4). By the implicit function theorem, near every point of $F_{\lambda_0}^{-1}(0)$ the zero set is a smooth curve varying smoothly with $\lambda$. Compactness of $T^2$ gives a finite cover, so the full causal locus varies by isotopy for $\lambda$ in a neighborhood of $\lambda_0$. Isotopy preserves component count and homology labels. Therefore these quantities are locally constant on regular parameter intervals. Any change between two regular intervals must pass through a non-regular parameter where $\nabla F=0$ at a zero-level point.

#### Theorem 4 (Two-sided bounds useful for validation)
Under (A1)-(A3b), for any fixed $\eta>0$:
$$
0\le
\bar{\mathcal{A}}_{\text{self},\eta}
\le
\frac{\|\phi_\eta\|_\infty}{r_{\min}^2 J_{\min}}.
$$
If additionally $r\le r_{\max}$ and $J_\gamma\le J_{\max}$ on support, then
$$
\bar{\mathcal{A}}_{\text{self},\eta}
\ge
\frac{1}{r_{\max}^2 J_{\max} T^2}
\int_{[0,T]^2}\phi_\eta(F_\gamma)\,dt\,dt'.
$$

**Proof.** The upper bound is exactly the estimate used in Theorem 1. For the lower bound, if $r\le r_{\max}$ and $J_\gamma\le J_{\max}$ on support, then $r^{-2}\ge r_{\max}^{-2}$ and $J_\gamma^{-1}\ge J_{\max}^{-1}$ on support, hence
$$
\bar{\mathcal{A}}_{\text{self},\eta}
=
\frac{1}{T^2}\int_{[0,T]^2}\frac{\phi_\eta(F_\gamma)}{r^2 J_\gamma}\,dt\,dt'
\ge
\frac{1}{r_{\max}^2 J_{\max} T^2}\int_{[0,T]^2}\phi_\eta(F_\gamma)\,dt\,dt'.
$$

**Meaning:** numerical pipelines can assert hard pass/fail envelopes before any
physical interpretation is attempted.

### Analytic Benchmarks (Circular Orbit)
For a circular orbit of radius $R$ and speed $v=\beta c_f$:
$$
2R\left|\sin\left(\frac{\omega\Delta}{2}\right)\right| = c_f\Delta,
\quad \text{with } \omega=\frac{v}{R}
$$
Define $\xi=\frac{\omega\Delta}{2}$, giving the root condition:
$$
\sin\xi = \frac{\xi}{\beta}
$$

The nontrivial self-hit threshold is
$$
\beta^\star = 1.
$$
For $\beta \le 1$, the only solution is the trivial coincidence $\xi=0$, so the circular self-action vanishes. For $\beta>1$, each admissible root $\xi_n$ determines a concrete branch datum:
$$
\Delta_n = \frac{2\xi_n}{\omega},
\qquad
r_n = c_f\Delta_n = \frac{2R\xi_n}{\beta},
\qquad
J_n = 1-\beta\cos\xi_n = 1-\xi_n\cot\xi_n.
$$
The derivative of the root function is
$$
g_\beta'(\xi_n)=\cos\xi_n-\frac{1}{\beta}
=
\cos\xi_n-\frac{\sin\xi_n}{\xi_n},
$$
which is the additional coarea factor controlling branch weight when the two-time integral is collapsed onto the circular causal locus.

Near threshold, write $\beta=1+\mu$ with $\mu>0$ small. The principal root then satisfies
$$
\xi_0 \sim \sqrt{6\mu},
\qquad
r_0 \sim 2R\sqrt{6\mu},
\qquad
J_0 \sim 2\mu,
\qquad
g_\beta'(\xi_0)\sim -2\mu.
$$
Hence the principal branch contribution to the circular action density scales like
$$
\frac{1}{r_0^2\,|J_0|\,|g_\beta'(\xi_0)|}
\sim
\frac{1}{96R^2\,\mu^3}.
$$
This is the action-functional expression of the same circular caustic seen in the force law: the onset of self-hit is already singular once the Jacobian and coarea reduction are both kept.

At high speed, all admissible roots lie in $(0,\beta)$, so the branch count grows only linearly with $\beta$. The circular toy therefore gives a controlled benchmark: discrete branch creation, explicit near-threshold asymptotics, and a root-by-root action density that can be compared directly to numerical orbit scans.

### Circular Benchmark as a Branch-Count Theorem

Define
$$
g_\beta(\xi)=\sin\xi-\frac{\xi}{\beta}.
$$
Admissible circular self-hit branches are zeros of $g_\beta$ in $(0,\beta)$.

#### Proposition 5.1 (Discrete Root Count and Branch-Change Criterion)
Fix a compact admissible interval $I_{\text{branch}}=[a,b]\subset(0,\beta)$ with boundary regularity $g_\beta(a)\neq0$, $g_\beta(b)\neq0$.

1. For fixed $\beta>0$, the admissible root set
   $\{\xi\in I_{\text{branch}}:g_\beta(\xi)=0\}$ is finite.
2. In a smooth one-parameter scan $\beta=\beta(\lambda)$, the root count in
   $I_{\text{branch}}$ is locally constant except when
$$
g_\beta(\xi)=0,\qquad \partial_\xi g_\beta(\xi)=0
$$
at some interior point $\xi\in(a,b)$.

**Proof.** For fixed $\beta$, $g_\beta$ is real-analytic on $(0,\beta)$, hence zeros are isolated unless the function is identically zero on an interval. That cannot occur here because $g_\beta$ is not identically zero. A discrete subset of a compact interval is finite, proving (1).

For (2), if $\xi_*$ is a simple root ($\partial_\xi g_\beta(\xi_*)\neq0$), the implicit function theorem gives a unique smooth continuation of that root under small parameter changes, so simple roots cannot be created or destroyed locally. Root-count change can therefore occur only when simplicity fails, i.e. when $g_\beta=0$ and $\partial_\xi g_\beta=0$ simultaneously (multiple/tangent root). Boundary-root events are excluded by the boundary-regularity condition.

For the principal circular branch, the bifurcation point occurs at $(\beta,\xi)=(1,0)$ in the limiting sense. Higher branches appear at interior tangencies where both equations hold with $\xi>0$. This is the 1D analog of Theorem 3 and provides an explicit, checkable bifurcation condition for the circular toy model.

### Dynamical Interpretation
- Candidate stable periodic orbits should first appear as **critical points** of $\bar{\mathcal{A}}_{\text{total}}$ constrained within a winding class. The delay flow need not be a gradient flow of this functional, so extremality is a branch-selection test, not a proof of asymptotic stability.
- **Existence vs. stability:** Topology of $\mathcal{L}_{\text{causal}}$ constrains which families can exist by identifying bifurcations where branches reconnect. Linear spectra of the delay equation decide which of those families persist or attract. The causal locus gives the branch skeleton; Lyapunov exponents and return-map spectra test dynamical survival.
- **Discreteness:** Each winding class gives an integer self-hit count; moving between classes requires a reconnection event. This supplies a candidate mechanism for mass gaps and generation-like families, but the actual mass map still requires shielding, partner terms, and Noether-Sea response.
- **Conservation with memory:** In the symmetry-preserving delayed action, time-translation and rotational symmetry imply conserved total energy and total angular momentum as history functionals. In regularized working models, these same quantities become validation diagnostics. Energy includes the history contribution stored in active causal wakes.
- **Gradient vs. symplectic:** The master equation is conservative; critical points of $\bar{\mathcal{A}}$ should be compared with KAM-style persistence islands, not with dissipative sinks. If a separate Noether-Sea coupling introduces dissipation, minima could become attractors, but absent that extra channel, stability means orbital persistence rather than asymptotic convergence.

### Emergent Geometry Constraints
Define the coarse‑grained hit density
$$
\mathcal{I}(t,\mathbf{x})=\sum_j\int_{-\infty}^{t}\!\frac{\delta_\eta\!\big(\|\mathbf{x}-\mathbf{x}_j(t')\|-c_f(t-t')\big)}{\|\mathbf{x}-\mathbf{x}_j(t')\|^2\,J_j(t,\mathbf{x};t')}\,dt',
$$
where
$$
J_j(t,\mathbf{x};t')
=
\left|1-\frac{\mathbf{v}_j(t')\cdot\hat{\mathbf{n}}(t,\mathbf{x};t')}{c_f}\right|,
\qquad
\hat{\mathbf{n}}(t,\mathbf{x};t')
=
\frac{\mathbf{x}-\mathbf{x}_j(t')}{\|\mathbf{x}-\mathbf{x}_j(t')\|}.
$$
This scalar hit density is an effective coarse-grained summary of causal-wake intersections, not a substrate metric and not by itself the observer-level effective metric. At most, it supplies one provisional scalar channel feeding the ADM/Cartan effective-metric handoff. A restricted isotropic subcase may be written as
$$
g^{\text{eff}}_{\mu\nu}dx^\mu dx^\nu = -N^2(\mathcal{I})\,c_\star^2 dt^2 + \Omega_s^2(\mathcal{I})\,h_{ij}dx^i dx^j,
$$
with small couplings $N=1+\lambda_t\mathcal{I}$ and $\Omega_s=1+\lambda_s\mathcal{I}$ in the weak-field regime. Here $c_\star$ must be declared: primitive branch charts may set $c_\star=c_f$, while observer-level metric comparisons normally use the dressed asymptotic channel speed. The full geometry program must also include the Noether-Sea lapse, shift/medium velocity, spatial metric response, stress, and PPN decision variables used by the spacetime chapters. Bianchi identities and weak-equivalence demands constrain the admissible scalar subcase; otherwise the emergent geometry reduces to a scalar-tensor approximation with potentially observable fifth forces. Matching the long-range limit of test-assembly motion to geodesics in $g^{\text{eff}}_{\mu\nu}$ is the consistency check linking microscopic causal hits to macroscopic effective curvature.
Here, "fifth force" means an additional long-range interaction mediated by the scalar sector encoded in $\mathcal{I}$, on top of the shared effective-metric response. If that scalar coupling is not sufficiently constrained, test assemblies can acquire composition-dependent accelerations, producing weak-equivalence-principle violations and post-Newtonian deviations that are tightly bounded experimentally.
Numerical check: evolve two assemblies with different internal $\bar{\mathcal{A}}_{\text{total}}$ through the same prescribed $\mathcal{I}(t,\mathbf{x})$ background and verify their centers follow the same geodesic to numerical tolerance.
Mean-field view: in a dilute limit with many architrinos, the closure target is to derive a Vlasov equation for $f(t,\mathbf{x},\mathbf{v})$ whose force term is induced by the coarse-grained hit density. That derivation would provide the statistical bridge from causal-wake microdynamics to continuum geometry.

### Implementation Notes (Appendix)
- Use the same $\delta_\eta$ and $\eta$ for force and action estimators.
- For periodic orbits, normalize by $T^2$ and enforce periodic boundary conditions.
- For circular‑orbit calibration, compute $\xi_n$ roots numerically and sum with the Jacobian factor.
- Handle the $\beta=1$ onset caustic with care; the unregularized circular action is singular there once both Jacobian and coarea factors are retained.
- Keep $\eta>0$ during variation: $\nabla\delta$ terms appear in $\delta\mathcal{A}$; regularization makes the Euler–Lagrange equations well‑posed. Take $\eta\to0$ only after solving or bounding solutions.

### Simulation Protocol (Minimal Theorem-Backed Checks)

For each simulated orbit family:

1. Verify (A1)-(A4) numerically (regularity, no-support collisions, transversality).
2. Compute $\bar{\mathcal{A}}_{\text{self},\eta}$ at multiple $\eta$ and confirm boundedness
   by Theorem 4.
3. Extract $\mathcal{L}_{\text{causal}}$ and its winding labels $(p,q)$.
4. Scan one control parameter (e.g., $\beta$ or radius ratio) and confirm labels change
   only at detected transversality failures.
5. In the circular benchmark, verify Proposition 5.1 double-root condition at branch
   transitions.

### Limitations and Caveats
- **Rest mass is not just self-action:** $\mathcal{A}_{\text{self}}$ needs careful units; observer-level rest energy also depends on partner interactions, shielding, Noether-Sea coupling, and the medium-response tensor.
- **Minima ≠ stability without dynamics:** Stability depends on the full DDE flow; the functional must be windowed/normalized (e.g., one period) to avoid divergences and to compare orbits meaningfully.
- **Topology needs precision:** Time is monotone; periodic motion yields a spatially closed path but a helical curve in absolute timespace. Be explicit about which projection or linking notion defines the "topological class."
- **Cohomology language is aspirational:** A cochain complex over the moduli of periodic orbits is not yet constructed; treat “cohomology of causal interaction” as a research direction, not a result.

### Closure Extension: Spin Bundle and Confinement Energy Law

Two downstream theorem targets can be stated on top of the existing causal-locus spine. They are not used by the theorems above; they mark what would have to be proven before spin and confinement language becomes native rather than comparative.

#### (T5.1) Spinor lift target

Construct a framed configuration bundle for tri-binary ordered axes and prove that the relevant internal-orientation transport lifts through
$$
\widetilde{R}:SU(2)\simeq\mathrm{Spin}(3)\to SO(3),
$$
so the internal phase distinguishes 2$\pi$ and 4$\pi$ loops.

#### (T5.2) Open-vs-closed braid energy target

Define an effective color-braid energy law:
$$
E_{\mathrm{open}}(L)=\sigma_{\mathrm{eff}}L+E_0+\mathcal{O}(1/L),\qquad \sigma_{\mathrm{eff}}>0,
$$
$$
E_{\mathrm{closed}}(L)\to E_{\infty}<\infty\quad (L\to\infty).
$$
Combined with causal-locus class constraints, this would give a quantitative separation between confined open sectors and screened singlet sectors after the color-braid and singlet-sector proof is supplied. Until that proof is supplied, the equations are an effective closure target rather than a result of this chapter.

#### Integration map

- causal-locus topology and bifurcation class invariants: **this chapter**
- color-algebra and singlet braid structure: [assemblies/fermions/color-charge-su3.md](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md)
- gauge-covariant effective layer and failure criteria: [interactions/gauge-symmetries.md](../../../../markdown/aaa/interactions/gauge-symmetries.md)

### Reduced Branch-Certificate Targets

The theorem spine proves that the scalar statistic is finite, has a coarea limit, and carries branch labels that remain invariant under the stated deformations. The next question is stronger: whether a retained branch chart also behaves like a conservative reduced action system. The following residuals are therefore validation targets, not additional theorems of this chapter.

**Branch return-map symplectic residual.** The scalar statistic can identify candidate stationary branch classes, but a stationary value of $\bar{\mathcal{A}}$ is not yet a Hamiltonian closure claim. On a retained branch chart $\mathfrak{B}$ with reduced section coordinates $z=(Q^a,\Pi_a)$, let
$$
\mathcal{P}_{\mathfrak{B}}:z_n\mapsto z_{n+1}
$$
be the one-cycle return map and let
$$
M_{\mathfrak{B}}(z)=D\mathcal{P}_{\mathfrak{B}}(z)
$$
be its linearized monodromy. If the reduced chart is genuinely inherited from a symmetry-preserving delayed action, then after the retained constraints and section condition are solved there must be a pulled-back symplectic form $\Omega_{\mathfrak{B}}$ for which
$$
\mathcal{R}_{\Omega}(\mathfrak{B})
\equiv
\sup_{z\in U}
\left\|
M_{\mathfrak{B}}(z)^T
\Omega_{\mathfrak{B}}(z)
M_{\mathfrak{B}}(z)
-
\Omega_{\mathfrak{B}}(\mathcal{P}_{\mathfrak{B}}(z))
\right\|
$$
is small on the tested neighborhood $U$ of the branch. The companion phase-volume residual
$$
\mathcal{R}_{\mathrm{vol}}(\mathfrak{B})
\equiv
\sup_{z\in U}
\left|
\det M_{\mathfrak{B}}(z)-1
\right|
$$
is weaker but easier to compute. The closure direction is therefore:
$$
\nabla_{\gamma}\bar{\mathcal{A}}=0
\quad\text{within a winding class}
\qquad
\mathcal{R}_{\Omega}(\mathfrak{B})\le\epsilon_{\Omega}
\qquad
\lambda_{\mathrm{sec}}>0.
$$
The first condition marks a candidate branch class, the second tests whether the retained return map has the canonical structure expected of an action-derived conservative reduction, and the third checks local section persistence. A failure of $\mathcal{R}_{\Omega}$ does not falsify the Master EOM; it says that the scalar action-counting extremum has not yet been promoted to a reduced Hamiltonian branch certificate.

**Hamilton-Jacobi branch phase target.** If a retained branch chart passes the action-derived return-map tests, one can ask for a Hamilton-Jacobi description of the same reduced motion. This is only a comparison target until the delayed action residual closes. Let $H_{\mathfrak{B}}(Q,\Pi,t)$ be the reduced Hamiltonian on the certified chart. A branch principal function $W_{\mathfrak{B}}(Q,t)$ should satisfy
$$
\mathcal{R}_{\mathrm{HJ}}(Q,t)
\equiv
\partial_t W_{\mathfrak{B}}(Q,t)
+
H_{\mathfrak{B}}\!\left(Q,\partial_Q W_{\mathfrak{B}}(Q,t),t\right)
$$
with $\mathcal{R}_{\mathrm{HJ}}\to0$ on the retained window. The associated momentum reconstruction is
$$
\Pi_a=\partial_{Q^a}W_{\mathfrak{B}},
$$
and the first-order branch motion is
$$
\dot Q^a
=
\left.
\frac{\partial H_{\mathfrak{B}}}{\partial \Pi_a}
\right|_{\Pi=\partial_Q W_{\mathfrak{B}}}.
$$
For a time-independent reduced chart, the separated form
$$
W_{\mathfrak{B}}(Q,t)=W_{\mathfrak{B}}^{0}(Q)-E_{\mathfrak{B}}t
$$
turns the energy label $E_{\mathfrak{B}}$ into a branch-family parameter. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this would not replace the causal-root ledger; it would be a compact phase-function certificate that the retained ledger, wake-history charge, and reduced canonical coordinates are mutually consistent.

### Summary and Status

- The chapter defines causal self-hit and total action-counting statistics from the Jacobian-weighted inverse-square delayed kernel, plus normalized forms for periodic orbits.
- The causal locus $\mathcal{L}_{\text{causal}}\subset T^2$ supplies discrete branch labels such as winding class, writhe candidate, and link type; those labels segment orbit families but do not by themselves prove stability or mass.
- The circular-orbit benchmark gives an analytic threshold at $\beta=1$, explicit branchwise Jacobians, and controlled near-threshold asymptotics, anchoring numerical calibrations.
- Under explicit assumptions (A1-A5), the theorem spine establishes finiteness, coarea reduction, topological invariance away from critical points, and a bifurcation condition for branch changes.
- The emergent-metric ansatz from coarse-grained hit density $\mathcal{I}$ remains conjectural until weak-field, equivalence, and PPN constraints are met.
- Overall, the causal-locus action-counting route is theorem-level in the regularized regime, while mass mapping, asymptotic stability, branch Hamiltonian certification, and emergent metric closure remain open.

## Effective Lagrangian

This chapter formalizes the conditional variational scaffold used by $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to connect the exact, path-history-dependent microdynamics of discrete architrinos to coarse-grained effective descriptions of macroscopic assembly behavior in the Noether Sea.

The bridge is deliberately conditional. The Master EOM remains the primary dynamics at the substrate level; an action or Lagrangian chart becomes theorem-grade only after its variation, boundary, and conservation residuals close on the retained branch chart. Until then, the effective Lagrangian is a disciplined inference device rather than an independent ontology.

#### Regularized Nonlocal Action and Variation

The Master Equation of Motion for architrinos is non-Markovian, driven by intersections between receiver trajectories and past causal wake surfaces. Consequently, any action-level scaffold for this law cannot be a local integral over instantaneous states. It must be a multi-time functional over path history, and its variation residual must be identified before the scaffold is treated as an exact action derivation. A scale-only derivation requires that residual to vanish or become a boundary term; a recoil-inclusive derivation may instead retain it as a mechanical wake-emission resistance term.

For a finite, isolated set of architrinos parameterized by absolute time $t$ in the Euclidean void, use the $\eta>0$ regularized delayed action below. The exact causal wake kernel is recovered in the weak branch limit as $\eta\to0^+$. The admissible interaction sum excludes trivial self-coincidence: $i\ne j$ terms are retained, and $i=j$ terms are retained only on nontrivial self-hit branches with $t-t_0\ge\tau_{\min}>0$ or with an explicitly declared core regularization.

$$
S_\eta[\{\mathbf{x}_i\}]
=
\int dt \sum_i \frac{1}{2} \mu_{\text{arch}} \|\dot{\mathbf{x}}_i(t)\|^2
- \frac{1}{2}\sum_{i,j}^{\mathrm{adm}}\frac{\kappa \, \sigma_{ij} |q_i q_j|}{c_f}
\int dt \int_{-\infty}^{t} dt_0\,
\frac{\phi_\eta\!\big(g_{ij}(t,t_0)\big)}{r_{ij}(t;t_0)},
$$
$$
g_{ij}(t,t_0)\equiv t-t_0-\frac{r_{ij}(t;t_0)}{c_f},
\qquad
r_{ij}(t;t_0)=\|\mathbf{x}_i(t)-\mathbf{x}_j(t_0)\|,
\qquad
\phi_\eta\equiv\delta_\eta.
$$

Here:
- $\mathbf{x}_i(t)$ is the trajectory of architrino $i$.
- $\mu_{\text{arch}}$ is the universal force/energy bookkeeping constant, not a particle-specific inertial mass.
- $r_{ij}(t; t_0)$ is the Euclidean separation between reception and emission events.
- $\delta_\eta$ is a mollified delta function of width $\eta > 0$. It supports Lipschitz control only together with the collision floor, finite-branch, transversality, and integrability assumptions below.
- $\sigma_{ij} = \mathrm{sign}(q_i q_j)$ enforces attraction for opposite polarities and repulsion for like polarities.

##### Regularization and Admissibility Assumptions

The derivation below is valid under:

- **(EL1)** $\mathbf{x}_i\in C^2([t_a,t_b];\mathbb{R}^3)$ and variations $\boldsymbol{\xi}_i$ are $C^1$ with $\boldsymbol{\xi}_i(t_a)=\boldsymbol{\xi}_i(t_b)=0$.
- **(EL2)** $\phi_\eta\in C_c^1(\mathbb{R})$, $\phi_\eta\ge0$, $\int\phi_\eta(s)\,ds=1$.
- **(EL3)** Collision and trivial-self exclusion on active support: $r_{ij}(t;t_0)\ge r_{\min}>0$ whenever $\phi_\eta(g_{ij}(t,t_0))\neq0$, and for $i=j$ the active support also satisfies $t-t_0\ge\tau_{\min}>0$ unless a separate core regularization supplies the same lower-bound control.
- **(EL4)** Delay-root transversality on active branches: $\partial_{t_0}g_{ij}(t,t_0)\neq0$ when $g_{ij}(t,t_0)=0$.
- **(EL5)** Integrability on the chosen history window, either by finite support or sufficient tail falloff, so differentiation under the time integrals is justified.
- **(EL6)** Delayed branch convention: only $t_0\le t$ contributes (equivalently, the $\Theta(t-t_0)$ branch of the causal selector).

##### Kernel Variation and Branch Reduction

This subsection isolates the exact step at which a variational scaffold can fail. Set $\mathbf{x}_i^\varepsilon=\mathbf{x}_i+\varepsilon\boldsymbol{\xi}_i$ and differentiate at $\varepsilon=0$.

Kinetic term:
$$
\delta S_{\eta,\text{kin}}
=
\sum_i\int_{t_a}^{t_b} \mu_{\text{arch}}\dot{\mathbf{x}}_i\cdot\dot{\boldsymbol{\xi}}_i\,dt
=
-\sum_i\int_{t_a}^{t_b} \mu_{\text{arch}}\ddot{\mathbf{x}}_i\cdot\boldsymbol{\xi}_i\,dt.
$$

For the interaction kernel
$$
\mathcal{K}_{ij}(t,t_0)\equiv \frac{\phi_\eta(g_{ij}(t,t_0))}{r_{ij}(t;t_0)},
\qquad
\hat{\mathbf{r}}_{ij}\equiv\frac{\mathbf{x}_i(t)-\mathbf{x}_j(t_0)}{r_{ij}(t;t_0)},
$$
the receiver-coordinate gradient is
$$
\nabla_{\mathbf{x}_i(t)}\mathcal{K}_{ij}
=
-\hat{\mathbf{r}}_{ij}
\left[
\frac{\phi_\eta(g_{ij})}{r_{ij}^2}
+
\frac{\phi_\eta'(g_{ij})}{c_f\,r_{ij}}
\right].
$$

This receiver-side gradient is one ingredient in the full first variation, but it is not the complete Euler-Lagrange expression. In the double-time action, each varied worldline appears both as a receiver coordinate $\mathbf{x}_i(t)$ and as a source coordinate inside transposed kernels. The full branch-resolved variation is carried out in [master-equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian). The term proportional to $\phi_\eta'(g_{ij})$ is not an algebraic nuisance to discard: on a purely delayed branch it is the local signature of wake-emission recoil. If a chart proves that this term is boundary-only, the scale term below gives the scale-only Master EOM; if not, the same variation points to a recoil-inclusive force law.

On charts where the constraint-variation residual is boundary-only, or is cancelled by an explicitly declared regularized action-level term, the scale-only result is the delayed force law
$$
\mu_{\text{arch}}\ddot{\mathbf{x}}_i(t)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\sum_{t_0\in\mathcal{C}_{ij}(t)}
\frac{\hat{\mathbf{r}}_{ij}(t;t_0)}
{r_{ij}(t;t_0)^2\,\left|1-\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)/c_f\right|},
$$
including self-hit branches $j=i$ when the trivial coincidence root is excluded.

The branch collapse used here is an $\eta\to0^+$ simple-root statement, not an identity at arbitrary finite $\eta$. Since
$$
\partial_{t_0}g_{ij}(t,t_0)
=
-\left(1-\frac{\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)}{c_f}\right),
$$
any branch-local smooth $f$ satisfies
$$
\lim_{\eta\to0^+}\int_{-\infty}^{t} f(t_0)\phi_\eta\!\big(g_{ij}(t,t_0)\big)\,dt_0
=
\sum_{t_0\in\mathcal{C}_{ij}(t)}
\frac{f(t_0)}
\left|1-\hat{\mathbf{r}}_{ij}(t;t_0)\cdot\mathbf{v}_j(t_0)/c_f\right|}
$$
provided the active roots are simple and separated from collision support.

Equivalently, in the finite-$\eta$ branch-selector form one may write
$$
\mu_{\text{arch}}\ddot{\mathbf{x}}_i(t)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\int_{-\infty}^{t}dt_0\,
\frac{\hat{\mathbf{r}}_{ij}(t;t_0)}{r_{ij}(t;t_0)^2}\,
\phi_\eta\!\big(g_{ij}(t,t_0)\big),
$$
with the understanding that the displayed finite-$\eta$ integral is a branch-selector surrogate whose weak limit is the Jacobian-weighted branch law above. The derivative term in $\nabla_{\mathbf{x}_i}\mathcal{K}_{ij}$ is absorbed only after the full delayed variation is assembled and the branch reduction is performed. In a recoil-inclusive reading, this sentence is replaced by a stronger requirement: the derivative term is retained as $\mathbf{C}_{ij}^{(\eta)}$ and tested as part of the force and conservation ledger rather than being forced to zero.

A derivation, reduction, or simulation that claims action-derived dynamics must therefore report the variation residual
$$
\mathbf{R}_i^{(\eta)}(t)
=
\mu_{\text{arch}}\ddot{\mathbf{x}}_i(t)
-
\sum_j\kappa\,\sigma_{ij}|q_iq_j|
\left(
\mathbf{F}_{ij,\mathrm{scale}}^{(\eta)}(t)
+
\mathbf{C}_{ij}^{(\eta)}(t)
\right),
$$
using the scale term and constraint residual defined in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian). The dimensionless window diagnostic is
$$
\epsilon_{\mathrm{var}}^{(\eta)}(W)
=
\frac{
\sum_i\int_W\|\mathbf{R}_i^{(\eta)}(t)\|\,dt
}{
\sum_i\int_W
\left(
\mu_{\text{arch}}\|\ddot{\mathbf{x}}_i(t)\|
+
\|\mathbf{F}_{i,\mathrm{act}}^{(\eta)}(t)\|
\right)dt
+
\varepsilon
}.
$$
The scale-only branch law is theorem-grade on $W$ only when this residual tends to zero with the declared branch floors and boundary convention. The broader action-derived dynamics may instead be theorem-grade with nonzero $\mathbf{C}_{ij}^{(\eta)}$ if that term is retained as mechanical recoil and the same action closes the energy, momentum, and angular-momentum ledgers. If neither condition is reported, the local effective Lagrangian remains a fitted chart.

The current status is therefore a conditional theorem schema, not a universal action theorem. The pure scalar $1/r$ action is not a universal exact action for the scale-only Master EOM; it is valid as that derivation only on residual-closed charts. On charts where the interior residual survives, $\mathbf{C}_{ij}^{(\eta)}$ is the strict mechanical recoil (wake-emission resistance) required by a purely delayed action. It is the same bookkeeping channel that balances the positive tangential drive and wake escapement described in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#tangential-drive-and-wake-escapement) and [Kinetic and Potential Energy](../../../../markdown/aaa/dynamics/energy.md#wake-escapement).

The same-support local scalar route and its finite delta-jet extension are ruled out under the restricted assumptions in [master-equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian): cancelling the derivative residual forces the counterterm to change the accepted inverse-square scale term. The remaining minimal scale-only repair is the delayed-interior characteristic-tail kernel stated there. With
$$
u=g+\frac{r}{c_f},
$$
the endpoint-clear candidate is
$$
K_{\mathrm{eff}}^{(\eta)}(r,g)
=
\int_{-\infty}^{g}
\frac{\delta_\eta(s)}
{c_f(u-s)^2}
ds,
$$
or the finite-endpoint variant with lower limit $-h_{+}$ after the characteristic gauge has cancelled the endpoint-clearance term. It satisfies
$$
\left(
\partial_r-\frac{1}{c_f}\partial_g
\right)
K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g)}{r^2},
$$
so it cancels the derivative-of-constraint residual without changing the accepted inverse-square scale term. Effective Lagrangian reductions should still inherit the Master EOM directly unless they explicitly choose the normalized characteristic-tail kernel and carry its boundary-increment convention on the retained chart.

The normalized characteristic-tail kernel now carries explicit energy, momentum, and angular-momentum wake-history increments in [master-equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian). An effective Lagrangian reduction may therefore choose that kernel only when it also carries the same boundary-increment convention and reports the corresponding variation and conservation residuals on its branch chart. Without those residuals, the reduced Lagrangian remains a scaffold for the Master EOM rather than an independent proof of the branch force.

#### Symmetries and History-Aware Conservation Laws

The regularized action $S_\eta$ is invariant under the fundamental symmetry group of the substrate when the mollifier, history window, and self-branch cutoff preserve those symmetries: the Euclidean group $E(3)$ and absolute time translations $\mathbb{R}_{\text{time}}$; the exact statement is recovered in the $\eta\to0^+$ limit. If the regularization is inserted only at the equation-of-motion level or uses a non-invariant window, the associated energy, momentum, and angular-momentum expressions become diagnostics rather than proved Noether charges.

Because the Lagrangian is nonlocal in time, the corresponding Noether charges are path-history functionals tracking interactions that are still carried by causal wakes between emission and reception.

**Energy Functional:**
Invariance under absolute time translation yields a conserved total energy only for the symmetry-preserving action-derived model:
$$
E_{\text{tot}}(t)=K(t)+E_{\text{wake}}(t),
$$
where the action-level nonlocal Noether charge can be written with the weighted causal kernel from [master-equation](../../../../markdown/aaa/dynamics/master-equation.md#action-level-wake-energy-functional-at-time-boundary-t). To avoid confusing the receiver-gradient kernel above with the Noether-energy kernel, write
$$
\mathcal{K}_{ij}^{E}(t_1,t_0)
=
\frac{\kappa\,\sigma_{ij}\,|q_iq_j|}{c_f}
\Theta(t_1-t_0)
\frac{\delta\!\big(g_{ij}(t_1,t_0)\big)}
{r_{ij}(t_1,t_0)}.
$$
For the delayed-interior characteristic-tail candidate, the Noether-energy kernel must instead be built from the same normalized action kernel,
$$
\mathcal{K}_{ij,\mathrm{eff}}^{E}(t_1,t_0)
=
\frac{\kappa\,\sigma_{ij}\,|q_iq_j|}{c_f}
\Theta(t_1-t_0)
K_{\mathrm{eff}}^{(\eta)}
\!\left(
r_{ij}(t_1,t_0),
g_{ij}(t_1,t_0)
\right).
$$
The scalar $1/r$ expression remains the diagnostic scaffold only when this replacement has not been declared for the chart.
Then:

$$
E_{\text{wake}}(t)
=
\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{t} dt_0
\int_{t}^{\infty} dt_1\,
\partial_{t_1}\mathcal{K}_{ij}^{E}(t_1,t_0).
$$

For compatible trajectory reconstruction one may use the work-integral form
$$
U(t)=U_\ast-\int_{t_\ast}^{t}\sum_i \mu_{\text{arch}}\,\mathbf{a}_i(t')\cdot\mathbf{v}_i(t')\,dt',
$$
when it is derived from the same action-level force and boundary convention. Otherwise $U(t)$ is a diagnostic history functional, not an independently proved Noether charge.

The corresponding finite-window energy residual is
$$
\epsilon_E^{(\eta)}(W)
=
\frac{
\left|
\Delta_W\left(K+E_{\text{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf{v}_i\cdot\mathbf{R}_i^{(\eta)}\,dt
-
\int_W\mathcal{B}_E^{(\eta)}\,dt
\right|
}{
\left|\Delta_W K\right|
+
\left|\Delta_W E_{\text{wake}}^{(\eta)}\right|
+
\varepsilon
}.
$$
Here $\mathcal{B}_E^{(\eta)}$ is the declared endpoint or period-cut leakage. For isolated period-matched tests, $\epsilon_{\mathrm{var}}^{(\eta)}\to0$, $\mathcal{B}_E^{(\eta)}\to0$, and $\epsilon_E^{(\eta)}\to0$ are the minimal conservation checks before the effective Hamiltonian is promoted beyond a diagnostic fit.

For a branch chart that explicitly chooses the normalized delayed-interior characteristic-tail kernel, the conservation object is not the generic scalar $1/r$ scaffold above but the pullback
$$
K_{\mu,\mathfrak{B}}+E_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)},
\qquad
\mathbf{P}_{\mathrm{mech},\mathfrak{B}}+\mathbf{P}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)},
\qquad
\mathbf{J}_{\mathrm{mech},\mathfrak{B}}+\mathbf{J}_{\mathrm{wake,eff},\mathfrak{B}}^{(\eta)}
$$
defined on the same retained branch rows that enter the force residual. The energy residual above is theorem-level only after this chart declares the action-level $g$, endpoint convention, branch floors, and endpoint or period-cut leakage terms. The work-integral reconstruction $U(t)$ remains a trajectory diagnostic unless it is derived from that same normalized kernel and boundary convention.

**Generalized Momentum:**
Spatial translation invariance guarantees the conservation of total momentum, $\mathbf{P}_{\text{tot}} = \mathbf{P}_{\text{mech}}(t) + \mathbf{P}_{\text{wake}}(t)$, where the mechanical momentum of the architrinos is balanced by the momentum flux propagating within the causal wake surfaces. Boundedness of the history-aware energy is therefore the natural diagnostic against runaway behavior, not a separate postulate.

For an effective reduction to promote a retained chart rather than fit it, it must also report vector residuals for the same branch pullback:
$$
\epsilon_P^{(\eta)}(W)
=
\frac{
\left\|
\Delta_W\left(\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf{R}_i^{(\eta)}\,dt
-
\int_W\boldsymbol{\mathcal{B}}_P^{(\eta)}\,dt
\right\|
}{
\left\|\Delta_W\mathbf{P}_{\mathrm{mech}}\right\|
+
\left\|\Delta_W\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}\right\|
+
\varepsilon
},
$$
and
$$
\epsilon_J^{(\eta)}(W)
=
\frac{
\left\|
\Delta_W\left(\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf{x}_i(t)\times\mathbf{R}_i^{(\eta)}\,dt
-
\int_W\boldsymbol{\mathcal{B}}_J^{(\eta)}\,dt
\right\|
}{
\left\|\Delta_W\mathbf{J}_{\mathrm{mech}}\right\|
+
\left\|\Delta_W\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}\right\|
+
\varepsilon
}.
$$
Small $\epsilon_E^{(\eta)}$, $\epsilon_P^{(\eta)}$, and $\epsilon_J^{(\eta)}$ are conservation diagnostics when the regularization is inserted at the equation-of-motion level. They become Noether-charge tests only when the action regularization itself preserves time translation, spatial translation, and rotation symmetry on the retained chart.

#### Coarse-Graining: The Effective Continuum Lagrangian

The continuum Lagrangian belongs to the effective level. To describe emergent behavior of the Noether Sea and complex assemblies, the description passes from discrete trajectories to continuum densities. Define a coarse-grained architrino polarity density $\rho_q(\mathbf{x}, t)$ and current density $\mathbf{j}_q(\mathbf{x}, t)$, smoothed over a scale much larger than the tri-binary radius but smaller than macroscopic gradients. This notation is deliberately distinct from Noether-core density variables such as $\rho_{\text{core}}$ and $n$.

At the level of a branch-collapsed delayed causal action, the exact multi-time interaction double sum suggests the continuum delayed functional

$$
S_{\text{int}}^{\text{cg}} = - \frac{\kappa}{2c_f} \int dt \int d^3x \int d^3x' \,
\frac{\rho_q(\mathbf{x}, t) \rho_q(\mathbf{x}', t - \|\mathbf{x}-\mathbf{x}'\|/c_f)}
{\|\mathbf{x}-\mathbf{x}'\|\,J_{\mathrm{eff}}(\mathbf{x},t;\mathbf{x}',t')}
$$
with delayed source time
$$
t' = t - \frac{\|\mathbf{x}-\mathbf{x}'\|}{c_f},
$$
propagation direction
$$
\hat{\mathbf{n}}(\mathbf{x},\mathbf{x}')=
\frac{\mathbf{x}-\mathbf{x}'}{\|\mathbf{x}-\mathbf{x}'\|},
$$
coarse transport velocity
$$
\mathbf{u}(\mathbf{x}',t')
=
\frac{\mathbf{j}_q(\mathbf{x}',t')}{\rho_q(\mathbf{x}',t')}
\qquad (\rho_q\neq 0),
$$
and effective Jacobian
$$
J_{\mathrm{eff}}(\mathbf{x},t;\mathbf{x}',t')
=
\left|1-\frac{\mathbf{u}(\mathbf{x}',t')\cdot\hat{\mathbf{n}}(\mathbf{x},\mathbf{x}')}{c_f}\right|.
$$
This functional is the continuum inheritance of the discrete delayed causal $1/r$ action kernel together with the same Jacobian branch weight that appears in the Master EOM. Source emission remains isotropic at the microscopic level, but the received coarse flux is compressed or dilated by delayed transport geometry. Differentiating this delayed action with respect to receiver coordinates produces the corresponding Jacobian-weighted inverse-square force density plus velocity-dependent correction terms. In the quasi-static limit $\|\mathbf{u}\|/c_f\to0$, one recovers $J_{\mathrm{eff}}\to 1$ and the leading force law reduces to the familiar inverse-square form.

The continuum variables are admitted only through balance laws inherited from resolved histories. A coarse polarity density and current must satisfy
$$
\partial_t\rho_q+\nabla\cdot\mathbf{j}_q
=
R_{\rho}^{\mathrm{cg}},
$$
and the first two kinetic moments must close through a declared momentum-current tensor and energy-flux vector,
$$
\partial_t(\rho_q u^i)
+\partial_j\Pi_q^{ij}
=
f_q^i+R_{P,q}^i,
$$
$$
\partial_t e_q
+\nabla\cdot\mathbf{J}_{e,q}
=
\mathbf{f}_q\cdot\mathbf{u}
+R_{E,q}.
$$
Here $\Pi_q^{ij}$ and $\mathbf{J}_{e,q}$ are coarse-history summaries of the retained causal-wake record, not new substrate fields. The effective action is a promoted continuum chart only when $R_{\rho}^{\mathrm{cg}}$, $R_{P,q}^i$, and $R_{E,q}$ are small under history, spatial, and regulator refinement. Otherwise the chart has reproduced only low-order moments while leaving unresolved memory in the omitted kinetic hierarchy.

For near-equilibrium reductions, a constitutive response may be written schematically as
$$
\Pi_q^{ij}
=
\Pi_{\mathrm{rev}}^{ij}
-
2\eta_{\mathrm{cg}}
\left(
E^{ij}-\frac{1}{3}(\nabla\cdot\mathbf{u})h^{ij}
\right)
-
\zeta_{\mathrm{cg}}(\nabla\cdot\mathbf{u})h^{ij}
+\Pi_{\mathrm{mem}}^{ij},
$$
where $E^{ij}=\frac{1}{2}(\partial^iu^j+\partial^ju^i)$. This is a comparison form borrowed from continuum mechanics and kinetic theory. In $\mathbb{A}\mathbb{A}\mathbb{A}$ it becomes native only after $\eta_{\mathrm{cg}}$, $\zeta_{\mathrm{cg}}$, and $\Pi_{\mathrm{mem}}^{ij}$ are derived from the same delayed branch record that supplies the force law. The corresponding dissipation residual is
$$
\mathcal R_{\mathrm{diss}}(W)
=
\frac{
\left|
\Delta_W K_{\mathrm{cg}}
+\int_W
2\eta_{\mathrm{cg}}E_{ij}E^{ij}
+\zeta_{\mathrm{cg}}(\nabla\cdot\mathbf{u})^2\,dt\,dV
+\Delta_W E_{\mathrm{wake}}
\right|
}{
|\Delta_W K_{\mathrm{cg}}|
+\int_W
\left(
2\eta_{\mathrm{cg}}E_{ij}E^{ij}
+\zeta_{\mathrm{cg}}(\nabla\cdot\mathbf{u})^2
\right)dt\,dV
+|\Delta_W E_{\mathrm{wake}}|
+\varepsilon
}.
$$
This residual prevents ordinary viscous loss language from replacing the exact wake-history energy ledger. A nonzero positive quadratic term is allowed as a coarse channel for coherent-to-incoherent transfer, but the transferred content must appear in the retained wake, heat, or medium-response record.

By defining an effective scalar potential $\Phi_{\text{wake}}(\mathbf{x}, t)$ and a vector transport potential $\mathbf{A}_{\text{wake}}(\mathbf{x}, t)$ that track the integrated causal wakes of the continuous medium, the system maps locally onto an effective field theory. These potentials are bookkeeping variables for delayed transport, not additional ontological primitives. The resulting local Lagrangian density $\mathcal{L}_{\text{eff}}$ therefore belongs to a further closure step beyond the exact delayed causal action.

#### Effective Hamiltonian Domain Gate

A local Hamiltonian or local Lagrangian description is admissible only after the path-history law has been reduced to a finite set of coarse variables that preserve the relevant state-counting measure over the comparison window. This is an inference condition: it tests whether exact histories can be represented by local canonical coordinates without losing the invariants under comparison. Let $\mathcal{Q}$ be the coarse-graining from exact histories $\Gamma(t)$ to effective coordinates $z=(\rho_q,\mathbf{j}_q,\ldots)$, and let $\mathcal{P}_{\Delta t}^{\mathrm{eff}}$ be the induced effective flow. The local canonical approximation must supply a measure $\mu_{\mathcal{Q}}$ such that
$$
(\mathcal{P}_{\Delta t}^{\mathrm{eff}})_*\mu_{\mathcal{Q}}
=
\mu_{\mathcal{Q}}
+O(\epsilon_{\mathcal{Q}})
$$
on the retained regime. This measure condition is necessary but not sufficient for canonical mechanics. The same handoff must also control a bracket or symplectic residual, for example
$$
\left\|
(\mathcal{P}_{\Delta t}^{\mathrm{eff}})^*\omega_{\mathcal{Q}}
-
\omega_{\mathcal{Q}}
\right\|
\le
\epsilon_{\omega},
$$
for the retained two-form $\omega_{\mathcal{Q}}$, or an equivalent Poisson-bracket residual on the admitted observables. If $\epsilon_{\mathcal{Q}}$ or $\epsilon_{\omega}$ is not controlled, the local Hamiltonian is only a fitting chart, not a derived mechanics.

This gate keeps the exact and effective levels separate. The Master Equation owns the delayed causal dynamics; the effective Hamiltonian owns only those regimes where internal wake memory, branch changes, and unresolved Noether-Sea exchange have been compressed without losing the observer-level invariants being compared.

The same domain restriction applies before translating an effective Hamiltonian chart into quantum operators. The admissible observable set in [Quantum Operator Mapping](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md#admissible-quantization-domain-guardrail) must be derived from this retained coarse-graining and record window, not chosen afterward as a free quantization convention.

#### Topological Constraints and Assembly Stability

The delayed action, after branch reduction to causal-locus and root-ledger data, constrains the allowed topological configurations of architrino assemblies in the Noether Sea. Stable assemblies, such as nested maximal-curvature candidates inside tri-binaries, should therefore be treated as theorem targets for localized, phase-locked causal-locus classes rather than as already-proved vortices or knots of a continuum field.

The stability of these assemblies must be checked by the nonlinear self-hit feedback embedded in the interaction functional. When internal circulation velocities exceed $c_f$, the non-Markovian repulsion supplies a candidate branch-trapping mechanism; it becomes a robust geometric attractor only after a branch chart, Lyapunov or Floquet diagnostic, and history-aware energy bound are supplied. Likewise, mass-gap language is a closure target tied to discrete admissible branch classes, not an automatic consequence of writing the effective action.

#### Closure Interface: Action-to-Envelope Reduction

This chapter supplies the variational bridge used by the quantum closure chain. The bridge remains effective and comparative: it tests when a signed polarity/current history can be compressed into a nonnegative envelope without erasing memory terms.

From the regularized nonlocal action, the first step is to derive a continuum effective action in terms of coarse variables $(\rho_q,\mathbf{j}_q)$. The second step tests a phase-amplitude closure ansatz for the retained nonnegative envelope channel:
$$
\rho_{\mathrm{env}}=|\psi|^2,\qquad
\mathbf{j}_{\mathrm{env}}=\frac{\hbar_{\mathrm{eff}}}{m_{\mathrm{eff}}}\Im(\psi^*\nabla\psi).
$$
Here $m_{\mathrm{eff}}$ is the retained envelope mass parameter of the benchmark chart, not a primitive architrino mass. The projection from the signed polarity/current data $(\rho_q,\mathbf{j}_q)$ to the nonnegative envelope channel must be declared before $\rho_{\mathrm{env}}$ is interpreted as $|\psi|^2$.

The handoff must report the continuity residual
$$
R_{\mathrm{cg}}=\partial_t\rho_{\mathrm{env}}+\nabla\cdot\mathbf{j}_{\mathrm{env}},
\qquad
\epsilon_{\mathrm{cg}}=
\frac{\|R_{\mathrm{cg}}\|}
{\|\partial_t\rho_{\mathrm{env}}\|+\|\nabla\cdot\mathbf{j}_{\mathrm{env}}\|+\varepsilon},
$$
and keep the memory current
$$
\mathbf{j}_{\mathrm{mem}}
=
\mathbf{j}_q-\mathbf{j}_{\mathrm{env}}
$$
as an explicit residual rather than absorbing it into fitted constants. Equivalently, with $\Delta\rho=\rho_q-\rho_{\mathrm{env}}$,
$$
\partial_t\rho_q+\nabla\cdot\mathbf{j}_q
=
R_{\mathrm{cg}}
+
\partial_t\Delta\rho
+
\nabla\cdot\mathbf{j}_{\mathrm{mem}}.
$$
Thus a small $R_{\mathrm{cg}}$ by itself does not prove envelope closure; the projection mismatch and memory-current divergence must be controlled as well.

For the non-relativistic, fixed-particle-number benchmark, the same envelope must also admit a phase chart
$$
\psi=\sqrt{\rho_{\mathrm{env}}}\,e^{iS_{\mathrm{env}}/\hbar_{\mathrm{eff}}},
\qquad
\mathbf{j}_{\mathrm{env}}=\frac{\rho_{\mathrm{env}}}{m_{\mathrm{eff}}}\nabla S_{\mathrm{env}}.
$$
Define
$$
K_{\mathrm{env}}=\frac{\|\nabla S_{\mathrm{env}}\|^2}{2m_{\mathrm{eff}}},
\qquad
Q_{\mathrm{env}}
=
-\frac{\hbar_{\mathrm{eff}}^2}{2m_{\mathrm{eff}}}
\frac{\nabla^2\sqrt{\rho_{\mathrm{env}}}}{\sqrt{\rho_{\mathrm{env}}}},
$$
and test the corresponding Hamilton-Jacobi residual
$$
R_{\mathrm{HJ}}
=
\partial_t S_{\mathrm{env}}
+K_{\mathrm{env}}
+V_{\mathrm{eff}}
+Q_{\mathrm{env}}.
$$
The effective Schrödinger/Madelung chart is licensed on a retained window only when
$$
\mathcal{R}_{\mathrm{env}}
=
\max\!\left(
\epsilon_{\mathrm{cg}},
\frac{\|R_{\mathrm{HJ}}\|}
{\|\partial_t S_{\mathrm{env}}\|+\|K_{\mathrm{env}}\|+\|V_{\mathrm{eff}}\|+\|Q_{\mathrm{env}}\|+\varepsilon},
\frac{\|\mathbf{j}_{\mathrm{mem}}\|}{\|\mathbf{j}_q\|+\varepsilon}
\right)
\le\epsilon_{\mathrm{env}}.
$$
This is a comparison residual, not a new ontology. If it fails, the wave function and Hamiltonian remain useful fitting charts for that window rather than promoted quantum closure.

The interface is closed only when:
- the Euler-Lagrange equations of the coarse action reproduce the effective envelope equation used in [pilot-wave-character](../../../../markdown/aaa/philosophy-history/theory-bridges/pilot-wave-character.md);
- the phase-amplitude chart reports $\mathcal{R}_{\mathrm{env}}$ rather than assuming the Schrödinger limit;
- memory contributions $\mathbf{j}_{\mathrm{mem}}$ remain explicit as controlled correction terms rather than hidden parameter absorbs.
