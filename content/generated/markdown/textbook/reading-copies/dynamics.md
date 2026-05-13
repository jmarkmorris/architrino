# Dynamics

## Master Equation of Motion

This chapter is the canonical statement of the delayed dynamical law used throughout the dynamics branch. It defines what counts as a causal hit, how the receiver-local force law is assembled from path history, and which exact or regularized structures are firm enough to support later work on binaries, tri-binaries, effective geometry, and quantum closure.

For the primitive-entity ontology, see [Architrino](../../../../markdown/aaa/foundations/architrino.md). This chapter begins where ontology stops: once continuous transceiver status is turned into a delay-root law, causal-hit branch sum, Jacobian-weighted acceleration, or regularized simulation equation.

The chapter is long because it plays several roles at once: foundational law, theorem spine, analytic benchmark source, and numerical reference. The opening establishes the causal geometry and canonical equation; later sections develop DDE form, self-hit structure, analytic regimes, and the energy-symmetry-conservation interface.

### Foundations and Causal Geometry

#### Purpose and Scope

This document presents the **Master Equation of Motion (EOM)** governing the lawful evolution of all architrinos in the Euclidean void + absolute time substrate. This is the **fundamental dynamical law** of the Architrino Theory, from which all emergent phenomena (particles, fields, spacetime, quantum behavior, gravity) ultimately derive.

The Master EOM is:

- **Deterministic**: Given complete initial conditions at $t_0$, the future is determined, with **deterministic multistability** at threshold regimes.
- **Non-Markovian**: Depends on full path history, not just instantaneous state.
- **Event-local at the receiver**: Only delayed causal intersections at the receiver event contribute to acceleration (no action-at-a-distance).
- **Causal**: All influences propagate at finite field speed $c_f$.
- **Self-consistent**: Includes self-interaction (self-hit) when $v > c_f$ at past emission times.

#### Overview and Key Principle

##### The Central Idea

**Fundamental Principle:**

> *Potential at all other points in time and space is irrelevant.*

At time $t$, the acceleration of architrino $i$ at position $\mathbf{x}_i(t)$ depends **only** on causal wake surfaces that **intersect its current location**. 

- **Not relevant**: Potential at other spatial locations $\mathbf{x} \neq \mathbf{x}_i(t)$
- **Not relevant**: Potential at other times $t' \neq t$ (except as encoded in the causal history that arrives "now")
- **Only relevant**: The **intersection events** (causal hits) where $\mathbf{x}_i(t)$ coincides with an expanding wake surface from some source at some past emission time $t_0 < t$

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

(The per-hit acceleration $\mathbf{a}_{ij}(t; t_0)$ is defined rigorously in Section 2.1.1. The substrate law is acceleration-first. If a force-like bookkeeping symbol is desired, introduce one universal conversion constant $\mu_{\text{arch}}$ and define $\mathbf{F}_{ij} \equiv \mu_{\text{arch}} \mathbf{a}_{ij}$.)

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

##### Dual-Mollified Absolute-Time Evolution Law

For proof work, branch sums should be derived from one regularized absolute-time law rather than treated as the primary definition through every causal fold. Fix a memory horizon
$$
h>0,
$$
a shell width
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

This equation is the certification-level law for the dual-mollified problem. The shell mollifier
$$
\delta_\eta
$$
selects causal surfaces with finite width, while
$$
\epsilon_c
$$
caps the near-collision inverse-square amplitude. Branch-resolved formulas with Jacobian factors are local reductions of this equation on finite simple-root charts. They should not be used as the global definition across causal folds, caustic transit, or chart-boundary verification.

---

##### Regularized Evaluation of the Exact Energy Charge

For computation with finite shell width $\eta>0$, it is useful to introduce an $\eta$-regularized representation of the same history-aware energy charge tracked by the exact nonlocal action. When one wants a quadratic kinetic bookkeeping proxy, use a single universal conversion constant $\mu_{\text{arch}}$ rather than particle-specific substrate masses. This smooth expression is used for numerical evaluation of the conserved quantity:
$$
E_{\text{tot}}^{(\eta)}(t)
= \sum_i \frac{1}{2} \mu_{\text{arch}} \left|\dot{\mathbf{x}}_i(t)\right|^2
+ E_{\text{wake}}^{(\eta)}(t).
$$
For the regularized interaction term, a convenient working expression is:
$$
E_{\text{wake}}^{(\eta)}(t) =
\frac{1}{2}\sum_{i,j} \kappa\,\sigma_{ij}\,|q_i q_j|
\int_{t-\tau_{\max}}^{t} dt_0\;
\frac{1}{r_{ij}^2(t; t_0)\,\left|J_{ij}(t;t_0)\right|}\,
\delta_\eta\!\big(r_{ij}(t; t_0) - c_f(t - t_0)\big).
$$
where $\tau_{\max}$ bounds the causal memory depth used in analysis and simulation. In the $\eta \to 0$ limit, this smoothed expression is intended to recover the exact nonlocal Noether charge derived later in the chapter.

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
If there exists $v_*<c_f$ such that $|\mathbf{v}_j(t_0)|\le v_*$ for all $t_0\in I_t$, then
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

This delay-map theorem pack is foundational rather than merely model-specific. It should eventually be promoted or mirrored into the foundations layer as the general fold-geometry reference for every delayed-root construction in the theory.

##### Single-Hit Regime (Unique $t_0$)

In the **sub-field-speed regime** ($|\mathbf{v}_j(t_0)| < c_f$ locally), Proposition 2 applies, and the map is strictly monotone:

$$
\frac{dF_t^{(ij)}}{dt_0}
\ge
1-\frac{|\mathbf{v}_j(t_0)|}{c_f}
>0,
$$

so $f_t^{(ij)}$ is a diffeomorphic time map on $I_t$, and the causal set is generically a singleton:

$$
N_{ij}(t)=1,\qquad D_{ij}(t)=+1.
$$

**Intuition:** If the source is moving slower than the field speed, its past emissions form a non-overlapping family of concentric (or nearly concentric) isochrons. Any given receiver location lies on exactly one of those causal surfaces.

##### Multi-Hit Regime (Multiple $t_0$)

In the **super-field-speed regime** ($|\mathbf{v}_j| > c_f$ at some past times), the delay map can fold when
$\hat{\mathbf{r}}_{ij}\cdot\mathbf{v}_j > c_f$, i.e. when $dF_t^{(ij)}/dt_0$ changes sign. Then $\mathcal{C}_{ij}(t)$ can contain multiple solutions:

$$
\mathcal{C}_{ij}(t) = \{t_{0,1}, t_{0,2}, \ldots, t_{0,m}\}.
$$

Fold bifurcations create/annihilate roots in pairs. The signed degree $D_{ij}$ stays topologically fixed between folds, while the unsigned branch count $N_{ij}$ jumps by even integers.

For the first folded branch used in the tri-binary closure mechanism, one obtains the geometric doubling

$$
N_O=1 \;\longrightarrow\; N_I=2,
$$

which is the root-count counterpart of the action-partition doubling used later ($w_I=2w_O$) and the associated $1:2:4$ frequency-lock discussion.

**Intuition:** If the source outruns its own emissions, it can emit multiple wake surfaces that later converge and intersect the same receiver location simultaneously (or nearly so, within regularization width $\eta$).

**Example:** In uniform circular motion at $v > c_f$, a receiver can be hit by wake surfaces from multiple points on the source's orbit (different "winding numbers" $m$ due to self-hit dynamics).

##### Self-Hit (Source = Receiver, $j = i$)

When $j = i$ (source and receiver are the same architrino), the causal set $\mathcal{C}_{ii}(t)$ represents **self-hits**: times when architrino $i$ intersects its own past emissions.

**Self-hit condition:**

$$
\|\mathbf{x}_i(t) - \mathbf{x}_i(t_0)\| = c_f(t - t_0), \quad t_0 < t.
$$

**Critical requirements for self-hit:**

1. **Curvature**: Straight-line motion admits no self-hits (the worldline never intersects its own past light cones).
2. **Super-field-speed history**: At some emission time $t_0$, the architrino must have exceeded $c_f$ (otherwise, it remains inside all past wake surfaces and never catches up).

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

##### Reduced Lorentz-Suppression Derivation from Delay Geometry

To obtain a nontrivial analytic checkpoint from the same causal constraint, consider a moving phase-locked two-leg internal loop (one leg parallel to motion, one transverse), center speed $v$, and field speed $c_f$.
Define
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
C(v)=\sqrt{1-\beta^2}=\gamma^{-1},\qquad
T(v)=T_0\gamma,\quad T_0=\frac{2L_0}{c_f}.
$$

This gives a derived target for Lorentz suppression. The full unresolved step is proving the same scaling for the complete multi-hit NFDE tri-binary dynamics without reducing to a two-leg closure model.

The two-leg loop is only a checkpoint. It has two phase points and one chosen orientation relative to the absolute motion. A real assembly has an effective internal phase cloud distributed over a finite three-dimensional volume, and operational isotropy has to hold for all loop orientations at once. The closure target is therefore a full ellipsoid-to-sphere reduction in the internal tri-binary phase space, not just the equality
$$
T_\parallel=T_\perp
$$
for one leg pair.

Accelerated motion adds a second burden. Even if the inertial moving-frame scaling is recovered, orbital or gravitational acceleration requires a transport law for the internal phase of the assembly through the Noether Sea. This is the substrate analogue of Thomas-precession bookkeeping: without a controlled transport rule, moving atomic clocks in gravitational fields would accumulate orientation-dependent phase errors.

> **Target Proposition (Lorentz suppression under acceleration).**
> For a stable tri-binary assembly of rest size
> $$
> L_0
> $$
> moving through the Noether Sea with center speed
> $$
> v(t)
> $$
> and small acceleration scale
> $$
> a(t),
> $$
> the internal phase-locking law transports all admissible loop orientations so that the observer-level proper-time increment satisfies
> $$
> d\tau
> =
> \sqrt{1-\frac{v^2}{c_f^2}}\,
> \left(1+\frac{\Phi}{c_f^2}\right)dt
> +
> O\!\left(\frac{a^2L_0^2}{c_f^2}\right)dt.
> $$
> Here
> $$
> \Phi
> $$
> is the weak Noether-Sea potential experienced by the assembly. The residual term is the finite-loop-size, non-Markovian correction caused by acceleration during one internal phase cycle.
>
> The Tier-1 Lorentz ledger requires that this residual remain below the preferred-frame leakage bounds recorded in [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md). Thus the reduced derivation is not complete until both the all-orientation inertial phase-locking problem and this accelerated-transport problem are closed.

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

**Charge sign factor:**

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
- $q_i, q_j$: charges of receiver and source ($\pm \epsilon$ for electrinos/positrinos)
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

The Master EOM is **linear in sources**:

$$
\mathbf{F}_{\text{total}} = \sum_j \mathbf{F}_j.
$$

Potentials from distinct sources **superpose** without mutual interference. The total potential at any location is the linear sum of all individual contributions.

**Consequence:** The problem of $N$ interacting architrinos reduces to solving $N$ coupled delay differential equations (DDEs), one per architrino, with each depending on the full history of all others.

---

#### Terms and Conventions (Detailed Breakdown)

##### Direction and Sign

**Direction of $\hat{\mathbf{r}}_{ij}$:**

$\hat{\mathbf{r}}_{ij}$ points **from the source's historical position** $\mathbf{x}_j(t_0)$ **to the receiver's current position** $\mathbf{x}_i(t)$.

**Sign of the force:**

- **Like charges** ($\sigma_{ij} = +1$): Force along $+\hat{\mathbf{r}}_{ij}$ (repulsion; pushes receiver away from emission point)
- **Unlike polarities** ($\sigma_{ij} = -1$): Force along $-\hat{\mathbf{r}}_{ij}$ (attraction; pulls receiver toward emission point)

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
[\kappa] = \frac{[\text{Length}]^3}{[\text{Time}]^2 [\text{Charge}]^2}, \quad [\mathbf{F}] = \frac{[\text{Length}]}{[\text{Time}]^2}.
$$

In natural units with $c_f = 1$, $[\text{Length}] = [\text{Time}]$, and $\kappa$ has dimensions of $[\text{Length}]/[\text{Charge}]^2$.

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

**Lorentz-suppression closure requirement:** The receiver kinematics described here must mechanically produce the moving-assembly deformation, clock/ruler retuning, and two-way signal synchronization needed for Lorentz-consistent behavior. If tri-binaries do not contract along the direction of motion and do not preserve the matching clock law when coupled to the Noether Sea, the closure program fails. The intended leakage scale is below current preferred-frame bounds.

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

The receiver's velocity $\mathbf{v}_i(t)$ does **not** appear as a separate source-strength factor in $|\mathbf{F}_{ij}|$ itself (at fixed $r_{ij}$, $\hat{\mathbf{r}}_{ij}$, and $J_{ij}$). It influences:

1. The **instantaneous power** through $\mathbf{F} \cdot \mathbf{v} = |\mathbf{F}| v_r$.
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

##### Regularization (Mollified Shells, Finite $\eta$)

The ideal model uses **surface-delta causal isochrons**, which yield **impulsive forces** at isolated hit times $t_0 \in \mathcal{C}_{ij}(t)$. One may treat the dynamics as a **measure-driven ODE** in $t$ (with velocity of bounded variation), or regularize by replacing the surface delta with a narrow wake surface of thickness $\eta > 0$:

$$
\delta(r - \tau) \longrightarrow \delta_\eta(r - \tau) = \frac{1}{\sqrt{2\pi}\,\eta} \exp\!\Big(-\frac{(r - \tau)^2}{2\eta^2}\Big),
$$

while preserving total emission $q$.

**Effect:** This produces **continuous-in-time forces** and classical $C^1$ solutions for $\mathbf{x}_i(t)$ given $C^1$ initial data.

**In the super-field-speed regime** ($|\mathbf{v}_a| > c_f$), multiple self-roots can occur; summing over all causal times with an integrable regularization ensures finite total impulse.

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

Therefore the regularized delayed dynamics are locally well-posed, with global existence whenever those failure modes are excluded. This conditional statement applies to the finite-$\eta$ regularized model; the ideal $\eta\to 0$ shell limit still requires separate control of root accumulation and Jacobian-degenerate branches. $\square$

### Operational Principles, Self-Interaction, and Examples

#### Core Principles (Operational Summary)

##### Superposition

**Statement:** The potential fields from all sources **superpose linearly**. The net potential at any point is the sum of the individual potentials:

$$
\Phi_{\text{net}}(\mathbf{x}, t) = \sum_{i} \Phi_i(\mathbf{x}, t).
$$

The total acceleration on a particle at any instant is the **vector sum** of the contributions from every causal entry in its path history.

**Operational implication:** Every architrino is continuously immersed in the superposed wakes of all others (and, when kinematics permit, its own). Tractability comes from treating each causal emission independently with $1/r^2$ distance weighting, which makes **local sources dominate** (distant contributions dilute over large causal surfaces and largely cancel).

##### Velocity Dependence

**Statement:** The dynamics are **delayed** and **radial in direction**. Because the source moves while emitting, both the emitted wake pattern and the received force are velocity dependent through causal geometry. The received force magnitude is modulated by the causal Jacobian $\left|J_{ij}\right|^{-1}$, while the receiver's speed affects the **work rate** and branch sampling via $\mathbf{F} \cdot \mathbf{v} = |\mathbf{F}| v_r$.

**Self-interaction requirement:** Self-hit requires $|\mathbf{v}_a| > c_f$ at some emission times (super-field-speed), so the worldline outruns its recent wake surfaces. Curvature alone is insufficient if $|\mathbf{v}_a| < c_f$ everywhere (a curved sub-field-speed trajectory never intersects its own past light cones).

**Persistent memory:** Once an architrino has exceeded $v > c_f$ in its past and emitted wake surfaces, it can **later slow down** to $v < c_f$ and **still receive self-hits** from those earlier emissions. The self-hit regime is **not instantaneously tied to current velocity**; it is a **path-history memory effect**.

##### Causality and Locality

**Causal structure:** Event $A$ at $(t_A, \mathbf{x}_A)$ can influence event $B$ at $(t_B, \mathbf{x}_B)$ only if:

$$
t_B > t_A \quad \text{and} \quad \|\mathbf{x}_B - \mathbf{x}_A\| \leq c_f(t_B - t_A).
$$

This defines a **field-speed light cone** (or "causal cone") centered at each event.

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
2. **Super-field-speed history**: At emission time $t_0$, the speed must have been $|\mathbf{v}_i(t_0)| > c_f$ (otherwise, the architrino never outruns its wake surfaces).

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

Self-hit is **not** instantaneously tied to current velocity. An architrino that has **previously** exceeded $v > c_f$ and emitted wake surfaces can **later slow down** to $v < c_f$ and **still receive self-hits** from those earlier emissions.

**Scenario:**

1. At time $t_1$: Architrino accelerates to $v > c_f$ and emits wake surfaces while in super-field-speed regime.
2. At time $t_2 > t_1$: Architrino slows down to $v < c_f$ (e.g., due to partner attraction or external forces).
3. At time $t_3 > t_2$: The architrino's trajectory curves such that it intersects one of the wake surfaces emitted at $t_1$ (when $v > c_f$).

**Result:** Self-hit occurs at $t_3$ even though current velocity $|\mathbf{v}(t_3)| < c_f$.

**Implication:** Self-hit is a **path-history memory effect**. The architrino's current acceleration depends on **whether it ever exceeded $c_f$ in the past and curved**, not just on its instantaneous state.

**Non-Markovian nature:** Knowing $\mathbf{x}_i(t)$ and $\mathbf{v}_i(t)$ is insufficient to determine $\mathbf{a}_i(t)$. You need the **full past worldline** $\{\mathbf{x}_i(t') : t' < t\}$ to identify all causal self-hit times $t_0 \in \mathcal{C}_{ii}(t)$.

##### Self-Hit as Stabilization Mechanism

**Role in binary formation:** Self-hit provides a **repulsive radial contribution** that opposes the attractive pull of opposite-charge partners. This competition produces:

- **Maximum-curvature candidates**: the circular toy model identifies where a minimum-radius barrier must be analyzed.
- **Null-separatrix protection**: the Jacobian-degenerate boundary $J=0$ acts as a geometric wall against collapse in the exact kernel.
- **A closure test, not a closure proof**: the same $1/|J|$ amplification multiplies tangential as well as radial projections, so a Jacobian-null branch does not by itself prove vanishing tangential power or an exact locked orbit.

**Connection to quantum behavior:** The non-Markovian memory and deterministic-but-complex self-hit dynamics are the **seed** of quantum-like phenomena:

- Pilot-wave guidance (self-interference creates effective "guiding field")
- Discrete stable states (attractors in phase space)
- Measurement uncertainty (informational ambiguity at receiver; see Section 3.4)

An important open problem is to map the phase-space attractor landscape for self-hit binaries, including basin size for maximum-curvature orbits, escape conditions, and the existence of secondary attractors such as long-lived elliptical families.

#### Worked Examples (Analytic Baselines)

##### Stationary Opposite Charges (Radial Fall)

**Setup:**
- Two architrinos: Electrino at $\mathbf{x}_1(t)$, Positrino at $\mathbf{x}_2(t)$
- Initial conditions: Both at rest, separated by distance $d_0$
- No self-hits (speeds remain $< c_f$ if $d_0$ is not too small)

**Symmetry:** By charge symmetry, both fall toward their common center of mass.

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

**Conclusion within this circular benchmark:** No stable circular orbit appears in the sub-field-speed regime for isolated opposite-charge binaries.

##### Maximum-Curvature Orbit (Self-Hit Stabilization)

**Setup:**
- Opposite-charge binary spirals inward (as in 8.2) until speed crosses $v = c_f$
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

with approach from the admissible side $J_{ii}>0$. Geometrically, this is the state where the receiver trajectory is tangent to the causal cone of its own past emission (the “riding-the-shock” limit).

**Why this is a hard wall in the exact theory:**
In the exact branch-resolved force, the self-hit contribution carries the factor

$$
\frac{1}{r_{ii}^2(t;t_0)\,\left|J_{ii}(t;t_0)\right|}.
$$

Hence as $J_{ii}\to 0^+$ the ideal (unregularized) response diverges, producing a restoring barrier that blocks continuation into a collapsing branch. With finite numerical regularization $\eta>0$, this appears as a very large but finite restoring force and must sharpen as $\eta\to 0$.

This null-separatrix is therefore an **amplitude wall** for the self branch. It is not, by itself, a theorem of circular closure. The same branch weight multiplies every projection of the self-hit force, including the tangential component, so contact with $J_{ii}=0$ obstructs collapse but does not by itself establish a periodic orbit or zero net cycle-averaged power.

**Operational characterization of MCB:**
- The inner branch evolves near $J_{ii}=0$ without crossing it.
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

1. The **net strength** of the potential at the point of intersection (through the acceleration magnitude $|\mathbf{F}|$).
2. The **unoriented line of action** through its current position (the line along which the force points).

The receiver does **not** have direct knowledge of:
- The source's identity (which architrino $j$?)
- The source's precise distance $r_{ij}$ (without additional assumptions)
- The source's velocity at emission $\mathbf{v}_j(t_0)$

##### Ambiguity: Electrino vs Positrino on Opposite Sides

A particularly important ambiguity: the receiver cannot distinguish between:

- A **negative potential** due to an Electrino (charge $-\epsilon$) on one side of the line of action, and
- A **positive potential** due to a Positrino (charge $+\epsilon$) on the **opposite side** of the same line,

if the resulting radial acceleration is the same.

**Example:** An acceleration **towards** a point along the line of action could be interpreted as:
- Attraction to a Positrino at that point, **or**
- Repulsion from an Electrino located at the diametrically opposite point on the same line.

##### Rest-Frame Recast (Useful Inference Device)

Any single hit can be **equivalently described** with a **stationary emitter** ($|\mathbf{v}| = 0$) placed somewhere along the same unoriented line of action, with the emitter's actual speed at emission accounted for by an adjusted emission time and, if desired, a surrogate location along that line.

**Key property:** The same emission law is preserved in this recast; the velocity dependence is transferred into the adjusted emission geometry and the matched Jacobian-weighted flux.

**Utility:** This recast simplifies some analytic calculations and provides intuition for the receiver's "inference problem" (what source configurations are consistent with a given hit?).

##### Superposition Complicates Inference

The ambiguity is compounded by **superposition**: The net potential at any instant is the sum of all intersecting expanding causal wake surfaces. A measured potential along a single radial can be the consequence of a **complex confluence of wakes** from many different emitters located along that line of action, arriving from both directions.

**Consequence:** The receiver experiences a **deterministic acceleration** (given full microstate knowledge, as known to the $\mathbb{U}_{\text{now}}$ universe-state perspective), but has **incomplete local information** about the source configuration.

##### Connection to Quantum Measurement Uncertainty

This limited, unoriented, and source-ambiguous information at the hit level is a **key ingredient** for the emergence of effective quantum-like behavior and measurement uncertainty from deterministic micro-dynamics:

- **Wavefunction as potential distribution**: The "wavefunction" $\psi$ may be interpreted as a **coarse-grained representation** of the superposed wake-defined potential landscape.
- **Measurement as interaction**: "Measurement" is simply a complex assembly interaction; the "outcome" is determined by which causal hits occur.
- **Uncertainty**: Not fundamental indeterminacy, but **informational ambiguity** from the receiver's limited perspective.

### Parameters and Numerical Implementation

#### Parameter Definitions

The core parameters entering the Master Equation are:

| **Parameter** | **Symbol** | **Working convention** | **Dimensional** | **Comment** |
|:--------------|:-----------|:----------------------|:----------------|:------------|
| Wake speed | $c_f$ | Set to 1 in natural units unless otherwise stated | $\mathrm{L}\,\mathrm{T}^{-1}$ | Propagation speed in the causal constraint |
| Coupling constant | $\kappa$ | Universal coupling parameter | $\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2}$ | Controls the strength of the inverse-square interaction |
| Architrino charge unit | $\epsilon$ | $\lvert e \rvert / 6$ | $\mathrm{Q}$ | Fundamental charge magnitude |
| Shell thickness (regularization) | $\eta$ | Positive regularization width used in analysis and simulation | $\mathrm{L}$ | Mollifies delta singularities |

In this document, $c_f$ is treated primarily as a unit-setting convention, $\kappa$ as the universal coupling scale of the delayed interaction law, $\epsilon$ as the fundamental charge unit, and $\eta$ as a regularization parameter used only when a smooth surrogate of the exact shell dynamics is required.

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

- Visualize causal light cones and causal isochrons
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
4. **Self-hit**: Repulsive self-interaction when $v > c_f$ at past emission times; persists even after slowing down.
5. **Radial line of action with Jacobian flux weighting**: No magnetic or velocity-cross-product terms; all forces point along $\hat{\mathbf{r}}_{ij}$, with magnitude modulated by $\left|J_{ij}\right|^{-1}$.

##### Implications for Emergent Phenomena

**From this single equation:**

- **Stable binaries** form via self-hit stabilization at maximum curvature.
- **Tri-binaries (Noether cores)** emerge as nested binary configurations.
- **Particles** are tri-binary assemblies with axial layers.
- **Quantum behavior** arises from non-Markovian memory + informational ambiguity.
- **Spacetime curvature** emerges from Noether-Sea density gradients.
- **Cosmological expansion** is local energy dissipation in the Noether Sea.

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

- All particles move slowly: $|\mathbf{v}_j| \ll c_f$,
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

For the local origin-crossing theorem program in that reduced note, the working 1D model is dual-mollified rather than merely shell-regularized: the shell mollifier $\delta_\eta$ still selects delayed roots, while a separate core mollifier $\epsilon_c$ is imposed on the inverse-square amplitude so the post-crossing local vector field remains finite. That dual-mollified local model is the one used for the first recapture lemmas there.

---

##### Two‑body uniform circular orbit, sub‑$c_f$ (no self‑hit)

Consider the symmetric opposite-charge circular ansatz
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
Therefore an isolated opposite-charge binary cannot realize an exact constant-speed circular orbit from partner delay alone.

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

For large winding index, the tangency points lie near the poles of $\tan\xi$, so if
$$
\xi_m^\star \in \left(\left(m+\frac{1}{2}\right)\pi-\varepsilon,\ \left(m+\frac{1}{2}\right)\pi\right),
$$
then
$$
\xi_m^\star
=
\left(m+\frac{1}{2}\right)\pi + O\!\left(\frac{1}{m}\right),
\qquad
\beta_m^\star
=
\left(m+\frac{1}{2}\right)\pi + O\!\left(\frac{1}{m}\right).
$$
Consequently the number of admissible self branches below speed $\beta$ grows only linearly:
$$
N_{\text{self}}(\beta)=\frac{\beta}{\pi}+O(1),
\qquad \beta\to\infty.
$$
This branch-count law is enough to control the combinatorics of the circular self-hit sum even before one has a full closed-form force series.

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

However, the circular benchmark also already exposes a serious obstruction in the bare two-body kernel. In the symmetric isolated binary, every active partner branch contributes a positive tangential component, and every active self branch also contributes a positive tangential component. Therefore the branchwise tangential sum is strictly positive whenever any branch is active. Within the bare circular two-body ansatz, exact constant-speed closure cannot come from cancellation among the delayed branches alone.

This sharpens the maximum-curvature program into a concrete fork:

- either the isolated two-body MCB does **not** exist as an exact constant-speed circular orbit of the bare kernel, or
- closure requires additional structure beyond the bare circular two-body ansatz, such as medium coupling, genuine tri-binary multi-body locking, or a more subtle non-circular periodic balance.

So:

- Analytically: we can reduce the existence question to algebraic conditions and asymptotic expansions, and in the bare circular ansatz we can already identify the tangential no-cancellation obstruction.
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
> For any candidate bare two-body maximum-curvature binary, compute the linearized delay operator on radial and tangential perturbations. The null-separatrix self-hit wall may stabilize or block the radial collapse channel, but the sign-definite tangential partner contribution generically leaves a transverse unstable direction unless an additional medium, tri-binary, or multi-body locking mechanism cancels it. Thus a bare MCB should be treated as a saddle-type organizing orbit in
> $$
> (R,v)
> $$
> space, not as the stable particle assembly itself.

This is the intended dynamical interpretation. Stable particles in the present architecture are tri-binary assemblies; a bare MCB, if it exists, is a high-curvature component or limiting scaffold whose instability explains why additional locking structure is needed.

This would be an “analytic scaffold + numerical check” situation, not full closed forms.

---

##### Symmetric delayed logarithmic spiral (advanced non-circular benchmark)

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

For a receiver event at angle $\theta$ and a partner emission at $\theta_0=\theta-\Delta$ with $\Delta>0$, define
$$
\rho\equiv e^{a\Delta},
\qquad
\Lambda(\Delta;a)\equiv \sqrt{1+\rho^2+2\rho\cos\Delta}.
$$
Then
$$
\mathbf{r}_{12}(\theta;\theta_0)
=
r(\theta)\Big[(1+\rho\cos\Delta)\mathbf{e}_r(\theta)-\rho\sin\Delta\,\mathbf{e}_\theta(\theta)\Big],
$$
so the exact delayed-hit condition becomes
$$
r(\theta)\,\Lambda(\Delta;a)=c_f\,\frac{\Delta}{\Omega}.
$$
Equivalently, with the local circular-speed ratio
$$
b(\theta)\equiv \frac{\Omega r(\theta)}{c_f},
$$
the admissible delay angles solve
$$
\Lambda(\Delta;a)=\frac{\Delta}{b(\theta)}.
$$
This is the non-circular analogue of the circular partner equation $\cos\xi=\xi/\beta$.

The spiral Frenet frame is
$$
\hat{\mathbf{T}}
=
\frac{-a\,\mathbf{e}_r(\theta)+\mathbf{e}_\theta(\theta)}{\sqrt{1+a^2}},
\qquad
\hat{\mathbf{N}}
=
\frac{-\mathbf{e}_r(\theta)-a\,\mathbf{e}_\theta(\theta)}{\sqrt{1+a^2}},
$$
with speed
$$
\|\dot{\mathbf{x}}_1\|=\Omega r(\theta)\sqrt{1+a^2}.
$$
Using the branch unit vector
$$
\hat{\mathbf{r}}_{12}
=
\frac{(1+\rho\cos\Delta)\mathbf{e}_r(\theta)-\rho\sin\Delta\,\mathbf{e}_\theta(\theta)}
{\Lambda(\Delta;a)},
$$
the source-velocity projection entering the Jacobian is
$$
\mathbf{v}_2(\theta_0)\cdot\hat{\mathbf{r}}_{12}
=
\frac{\Omega r(\theta)\rho}{\Lambda(\Delta;a)}
\Big[\sin\Delta-a(\cos\Delta+\rho)\Big].
$$
Hence
$$
J_{12}
=
1-\frac{\Omega r(\theta)\rho}{c_f\,\Lambda(\Delta;a)}
\Big[\sin\Delta-a(\cos\Delta+\rho)\Big].
$$

For opposite polarities, the branch acceleration is
$$
\mathbf{a}_{12}
=
-\frac{\kappa |q_1q_2|}{r(\theta)^2\Lambda^2 |J_{12}|}\,
\hat{\mathbf{r}}_{12}.
$$
Projecting onto the spiral Frenet frame gives
$$
a_T
=
\frac{\kappa |q_1q_2|}{r(\theta)^2\Lambda^3 |J_{12}|\,\sqrt{1+a^2}}
\Big[a(1+\rho\cos\Delta)+\rho\sin\Delta\Big],
$$
$$
a_N
=
\frac{\kappa |q_1q_2|}{r(\theta)^2\Lambda^3 |J_{12}|\,\sqrt{1+a^2}}
\Big[1+\rho\cos\Delta-a\rho\sin\Delta\Big].
$$

The power sign is controlled by $a_T$, since the velocity is tangent to the spiral. In the circular limit $a\to0$, one recovers the sign-definite numerator $\rho\sin\Delta>0$ and therefore the circular instability result above. For $a>0$, however, the tangential numerator
$$
S_T(\Delta,a)\equiv a(1+\rho\cos\Delta)+\rho\sin\Delta
$$
is no longer sign-definite from geometry alone. The spiral benchmark therefore reopens the braking question: admissible delayed roots could, in principle, yield $S_T<0$ on some branches even though the circular ansatz cannot.

At the same time, the fixed-pitch logarithmic spiral cannot itself realize a true turning point, because
$$
\dot r=-a\Omega r<0,
\qquad
\ddot r=a^2\Omega^2 r>0
$$
for all finite $\theta$. A genuine minimum-radius event with $\dot r=0$ therefore requires at least a variable-pitch spiral $a=a(\theta)$ or another non-circular periodic ansatz. The present calculation advances the spiral track by giving the exact delayed-root equation and branchwise Frenet projections, but it does not yet solve the turning-point problem.

---

#### Emergent‑field / continuum limits

There’s another class of “analytic solutions” that matter:

##### Homogeneous, isotropic Noether Sea

Assume:

- Very large number of architrinos,
- Statistically homogeneous and isotropic distribution,
- Global neutrality.

Then, at coarse‑grained level:

- Symmetry dictates the net force on a test particle at rest is zero.
- Small perturbations can be analyzed by linearizing around the homogeneous background.

We can:

- Derive an effective **wave equation** for small perturbations in density/potential,
- Show that disturbances propagate at some emergent speed (likely tied to $c_f$ and medium properties),
- Recover Maxwell‑like or acoustic‑like behavior analytically.

These are field‑theory‑style analytic solutions (plane waves, Green’s functions) of the **coarse‑grained** equations, not of the micro DDEs. But they are derived from the master equation via continuum methods.

That’s analytically tractable and important for:

- Emergent electromagnetism,
- Emergent metric propagation (gravitational‑wave analogues),
- Stability of the Noether Sea itself.

---

#### Natural analytic targets

The most natural targets for further analytic closure are:

1. **Uniform circular self‑hit (single particle, v>c_f)**  
   - Solve the transcendental equation  
     $2R|\sin(\omega\Delta/2)| = c_f\Delta$  
     asymptotically, analyze the self‑force series.
   - Deliver: explicit formulas + asymptotics for self‑force vs $v/c_f$.

2. **Partner‑only circular orbit with causal delay (v<c_f)**  
   - Derive exact expressions for radial and tangential forces.
   - Prove tangential component >0 → analytic demonstration of spiral‑in instability.

3. **Algebraic equilibrium conditions for the maximum‑curvature binary**  
   - Combine 1 & 2 to write down the two averaged balance equations (radial, tangential).
   - Even if they’re solved numerically, they give a **precise definition** of $R_\text{min}$ and equilibrium speed.

4. **Continuum limit around homogeneous Noether Sea**  
   - Coarse‑grain master equation,
   - Derive linearized wave equation for small perturbations,
   - Extract dispersion relation $\omega(k)$.

These four targets are analytically accessible enough to serve as the main bridge between the formal law and the broader closure program.

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

In this section we outline how **energy** and **variational structure** are handled in the Architrino Assembly Architecture, given the Master Equation of Motion:

$$
\frac{d^2 \mathbf{x}_i}{dt^2} =
\sum_{j} \sum_{t_0 \in \mathcal{C}_{ij}(t)}
\kappa\,\sigma_{ij}\,\frac{|q_i q_j|}{r_{ij}^2(t;t_0)\,\left|J_{ij}(t;t_0)\right|}\,\hat{\mathbf{r}}_{ij}(t;t_0),
$$

where each contribution comes from a **causal wake intersection** at time $t$ between architrino $i$ and a wake emitted by architrino $j$ at earlier time $t_0$. The set $\mathcal{C}_{ij}(t)$ encodes all such emission times selected by the causal constraint

$$
\|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\| = c_f (t - t_0),\quad t_0 < t.
$$

Once any internal binary reaches the $v>c_f$ regime at some stage in its history, **self‑hit** is generically present thereafter and must be included in all realistic energy accounting. There is no physically relevant “no self‑hit” regime for completed assemblies.

We organize the discussion into four pieces:

1. Aggregate kinetic energy for a finite, isolated set of architrinos,
2. An exact nonlocal Noether energy charge compatible with path‑history dynamics,
3. A nonlocal Lagrangian whose variations reproduce the Master Equation,
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

##### Exact Nonlocal Noether Energy

With finite-speed causal wakes and path-history dependence, an instantaneous position-only potential is not fundamental. Time-translation symmetry of the exact causal action supplies the corresponding nonlocal Noether charge. The formulas in this subsection therefore belong to the exact delayed theory itself.

For the dual-mollified local 1D model used later in [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md), the same conservation language should be read more carefully: the shell mollifier $\delta_\eta$ and core mollifier $\epsilon_c$ support a finite local vector field and a tractable return-map theorem program, but exact Noether-charge statements transfer automatically only if that dual mollification is itself derived from a time-translation-invariant action-level regularization of the causal kernel.

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

###### Exact wake-energy functional at time boundary $t$

Let $\mathcal{K}_{ij}(t_1,t_0)$ denote the causal-delay interaction kernel appearing in the exact causal action below:

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

###### Equivalent work-integral form

For direct trajectory evaluation, one may compute the same interaction contribution through the accumulated power exchange:

$$
U(t)=U_\ast-\int_{t_\ast}^{t}\sum_i \mu_{\text{arch}}\,\mathbf{a}_i(t')\cdot\mathbf{v}_i(t')\,dt'.
$$

This work-integral form differs from $E_{\text{wake}}(t)$ at most by a reference constant and the explicit choice of time boundary. It is therefore a practical reconstruction of the same conserved quantity, not a separate energy concept.

In short-delay effective limits, $E_{\text{wake}}$ reduces to an approximate instantaneous pair form

$$
E_{\text{wake}}(t)\approx\sum_{i<j}U_{ij}\big(\mathbf{x}_i(t),\mathbf{x}_j(t)\big),
$$

with leading $1/r_{ij}$ behavior plus geometry-dependent self-hit corrections.

---

##### Exact Nonlocal Lagrangian

To connect with variational methods and with later continuum approximations, it is useful to exhibit the **action principle** for the delayed dynamics. Because the interactions depend on path history via causal wakes, the action is necessarily nonlocal in time.

###### Exact causal-delay Fokker-type interaction term

For the focused action-functional development (definitions, theorem spine, and circular branch-count benchmark), see [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md#core-functional-definitions).

Let the worldline of architrino $i$ be $\mathbf{x}_i(t)$. For the exact action-functional discussion, the same universal bookkeeping constant may be inserted in the quadratic kinetic term:
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
- $\delta(g_{ij})$ restricts support to the characteristic causal cone $r_{ij}=c_f(t-t')$.
- The exact action contains no mollifier: $\eta$ is not a fundamental parameter.

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

###### Variation and line‑of‑action forces

Varying $S$ with respect to $\mathbf{x}_i(t)$ yields:

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

The inverse-square factor follows from the variation of the scale-invariant kernel. On a simple-root chart, the interaction density is
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
contributes the same causal-root Jacobian factor after integration by parts on the root-selected chart, while preserving the line-of-action direction. Therefore the branch-resolved Euler-Lagrange term is proportional to
$$
\frac{\hat{\mathbf r}_{ij}}{r_{ij}^2|J_{ij}|}.
$$
This $1/r^2$ scaling is not an added ansatz: it is the unique pull-back of a scale-invariant causal-cone constraint in 3D when varying a $1/r$ Fokker kernel.

Self‑interaction ($i=j$) is included by adding $S_{ii}$ with the same kernel, but explicitly excluding the trivial coincidence $t'=t$ (no instantaneous self‑push at the moment of emission). Self‑hit corresponds to nontrivial roots $t_0<t$ where the worldline re‑intersects its own causal isochrons, which are captured naturally by the same double‑integral structure.

Thus:

- The action above is the exact nonlocal action for the delayed dynamics,
- Its branch-resolved variation reproduces the Master EOM with the same Jacobian-weighted inverse-square law used everywhere else in this chapter,
- Any $\delta_\eta$ replacement is a numerical regularization of this same delayed theory.

---

##### Total Energy for an Isolated Set

Given the kinetic energy definition, we now address the most useful history-aware total energy for an isolated architrino set.

###### General structure

We define a functional $H_{\text{tot}}$ such that:

- $H_{\text{tot}}$ is constant in $t$ for isolated exact trajectories,
- $H_{\text{tot}}$ reduces to $K_{\mu}+U$ in regimes where an effective potential description is adequate.

Formally, for an isolated system,

$$
H_{\text{tot}}[\{\mathbf{x}_i(\cdot)\},\{\mathbf{v}_i(\cdot)\}; t]
\equiv
K_{\mu}(t) + U(t),
$$

with $U(t)$ defined via:

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
- An **exact nonlocal action principle** exists: a multi-time Lagrangian whose kernel enforces the causal isochron geometry and reproduces the Master EOM with its Jacobian-weighted inverse-square law.
- The **total energy** for an isolated trajectory is history-aware; in suitable limits it reduces to a canonical $H_\text{eff} = \sum \mathbf{P}^2/2M + U_\text{eff}$ for effective assemblies, with no separate “field energy” ontology.

All energy accounting remains localized to **architrinos and their assemblies** and is only updated at the instants when **causal wake surfaces intersect receivers** at $t = \text{now}$. The exact conserved charge may be written as $K_{\mu}(t)+E_{\text{wake}}(t)$ or, equivalently up to reference choice, as $K_{\mu}(t)+U(t)$ along realized trajectories.

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
where $K_{\mu}$ is the quadratic kinetic bookkeeping proxy and $E_{\text{wake}}$ denotes the exact nonlocal interaction charge. In direct trajectory evaluation, $U$ may be used as an equivalent reconstruction up to a constant offset.

This statement is exact for the action-based delayed theory discussed in this section. For regularized working models, especially the dual-mollified local recapture model of [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md), it should be interpreted as exact only when the regularization preserves the same symmetry structure; otherwise it is the natural history-aware bookkeeping candidate rather than a proved invariant.

**Lemma (Bounded work rate under regularization).** If $\eta>0$ and the mollified kernel bounds the per-hit force, then there exists $F_{\max}(\eta)$ such that
$$
\bigg|\frac{dK_{\mu}}{dt}\bigg| \le \sum_i \|\mathbf{F}_i\|\,\|\mathbf{v}_i\|
\le N\,F_{\max}(\eta)\,v_{\max}(t).
$$

**Theorem (No-runaway criterion).** For an isolated system with fixed $\eta>0$, if the interaction functional $U(t)$ is bounded below on the admissible history class (for example, by enforcing a minimum separation within the regularized kernel support), then $K_{\mu}(t)$ is bounded for all times where the solution exists. In particular, a runaway $v_{\max}(t)\to\infty$ is only possible if $U(t)\to -\infty$, which requires a collapse toward the singular regime or a breakdown of the regularized assumptions.

*Interpretation.* Self-hit repulsion can transfer energy between $U$ and $K$, but it cannot generate unbounded kinetic energy without a corresponding unbounded decrease in $U$. This is the core conservation argument for excluding unphysical runaway acceleration in the regularized model.

##### Simulation Diagnostics (Symmetry and Conservation)

In addition to the convergence checks in Section 4.2, track these conserved functionals in any isolated run:

- **Total energy**: $H_{\text{tot}}(t) = K_{\mu}(t) + U(t)$ (equivalently $K_{\mu}+E_{\text{wake}}$) should remain constant within the chosen numerical tolerance.
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

---

**End of Master Equation of Motion Document**

---

## Kinetic and Potential Energy

In this model, all energy is fundamentally tied to architrinos and the causal wakes they generate. Architrinos are the sole primitive carriers of kinetic energy through their motion and the sole primitive sources of potential energy through their interactions. There is no standalone wake substance or vacuum energy independent of architrinos and their assemblies. A **wake** is the causal-isochron imprint of an architrino's emissions; motion affects the geometry, not the existence, of the wake. `Wake` is the architrino-native description of what appears as a field at the effective level.

This chapter underwrites [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), [Tri-Binary Dynamics](../../../../markdown/aaa/dynamics/tri-binary-dynamics.md), [Noether Core](../../../../markdown/aaa/assemblies/noether-core.md), [Spacetime Assemblies](../../../../markdown/aaa/spacetime/spacetime-assemblies.md), and [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

All such dynamics unfold on a fixed ontological background: absolute time plus the Euclidean void. Forces and motion arise from **delayed causal hits from causal isochrons**, with line-of-action direction and Jacobian-weighted magnitude, on this fixed background. We work in units with wake speed $c_f=1$.

Crucially, `spacetime` in this framework belongs to the effective level, not the ontological one. The underlying substrate is a **dense sea of scalable high-energy tri-binary assemblies** occupying the Euclidean void. These tri-binaries are extremely small compared to ordinary Standard Model particles and constitute the Noether Sea through which all other assemblies move and interact. The energetic state and configuration of this tri-binary sea control how energy, inertia, and effective geometry appear at larger scales.

---

### Kinetic Energy and Momentum of a Single Architrino

An architrino in motion possesses kinetic energy and momentum.

- **Kinetic Energy $E_k$**
  
  A scalar quantity representing the energy of motion. For a single architrino $a$ with velocity $\mathbf{v}_a(t)$, we write
  
  $$E_{k,a}(t) = K\big(|\mathbf{v}_a(t)|\big),$$
  
  where $K$ is a strictly convex, monotonically increasing function with $K(0)=0$ and $K'(v)\to\infty$ as effective saturation is reached (if applicable), or growing unboundedly in the primitive limit. $K$ is left unspecified because mass is emergent from interactions between assemblies, especially the Noether-Sea tri-binaries. Strict convexity ensures a one-to-one mapping between kinetic energy and speed magnitude. Because a free Architrino has no intrinsic speed limit in the micro-model, $E_k$ is, in principle, unbounded as $|\mathbf{v}_a|\to\infty$.

- **Momentum $\mathbf{p}_a$**
  
  The vector counterpart of kinetic energy:
  
  $$\mathbf{p}_a(t) = P\big(|\mathbf{v}_a(t)|\big)\,\hat{\mathbf{v}}_a(t), \quad \hat{\mathbf{v}}_a = \frac{\mathbf{v}_a}{|\mathbf{v}_a|},$$
  
  where $P$ is a speed-dependent magnitude. Its detailed form is not postulated at the architrino level; it emerges from matching to assembly behavior.

**No fundamental mass:**

In this model, there is no **particle-specific substrate mass** assigned to individual architrinos. We do **not** assume $E_k = \frac{1}{2}m v^2$ or $\mathbf{p} = m \mathbf{v}$ at the substrate level for distinct architrino species. Instead:

- Kinetic energy and momentum are **primitive kinematic quantities** of architrinos.
- The substrate law is written in **acceleration-first** form.
- If force-like or quadratic-kinetic bookkeeping is needed, one may introduce a single universal conversion constant $\mu_{\text{arch}}$, but this is not a particle-specific inertial mass.
- "Mass" in the usual observer sense appears **only at the assembly level** as a derived property of how a large internal energy distribution responds to external forcing in the tri-binary sea.

---

### Work–Energy Relation and Per-Hit Power

Regardless of the explicit form of $K(v)$, kinetic-energy accounting is controlled by the acceleration-first master law. If one introduces the optional universal bookkeeping constant $\mu_{\text{arch}}$ and defines $\mathbf{F}_a \equiv \mu_{\text{arch}}\mathbf{a}_a$, then the quadratic bookkeeping proxy satisfies the familiar **work–energy theorem**:

$$\frac{dE_{k,a}}{dt} = \mathbf{F}_a(t)\cdot\mathbf{v}_a(t),$$

where $\mathbf{F}_a$ is the optional force-like bookkeeping quantity associated with the net acceleration from all causal hits.

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

decompose the receiver's velocity into radial and transverse components:

$$\mathbf{v}_{o'} = v_r \hat{\mathbf{r}} + \mathbf{v}_\perp, \quad v_r=\mathbf{v}_{o'}\cdot\hat{\mathbf{r}}.$$

Because $\mathbf{a}_{o'\leftarrow o}\parallel\hat{\mathbf{r}}$:

- The **instantaneous work rate** from this hit is
  
  $$
  \frac{dE_k}{dt}\bigg|_{\text{hit}}
  =
  \mathbf{a}_{o'\leftarrow o}\cdot\mathbf{v}_{o'}
  =
  \frac{\kappa\,\sigma_{q_o q_{o'}}\,|q_o q_{o'}|}{r^2\,|J_{o'\leftarrow o}(t;t_0)|}\,v_r.
  $$
  
  Only $v_r$ contributes to instantaneous power.

- A hit only changes the **along-the-line** component of velocity; sideways motion $\mathbf{v}_\perp$ is unchanged instantaneously.

---

### Potential Energy and Net Potential

Potential energy arises from the interaction of an architrino with the **net potential wake landscape** generated by all architrinos (including, in some regimes, its own past emissions).

#### Net Potential Field

At a point $\mathbf{s}$ and time $t$, the net potential is the **superposition** of contributions from all sources:

$$\Phi_{\text{net}}(\mathbf{s},t) = \sum_o \Phi_o(\mathbf{s},t).$$

Each $\Phi_o$ is built from the expanding causal isochrons emitted by source $o$, using the measure-valued or mollified emission density described in the architrino section. In the mollified representation with causal-surface width $\eta>0$, $\Phi_{\text{net}}$ is a smooth function of $(\mathbf{s},t)$; in the ideal limit $\eta\to 0$ it becomes measure-valued ("paint on isochrons").

#### Potential Availability Is Geometric

The phrase "an architrino emits potential" should not be read as a source continually spending an internal fuel. The emission is the causal-wake geometry of the architrino itself: at each emission time, an expanding causal isochron is added to the source's path history. That causal structure can later participate in work, but it is not a material energy substance stored inside the Euclidean void.

Potential energy is therefore relational. It is assigned when a receiver is placed in a source's path-history wake landscape and its trajectory intersects the relevant causal wake surfaces. The receiver's energy accounting depends on the active causal roots, their inverse-square distance factors, their polarity signs, the branch Jacobians, and the receiver's radial motion through the line of action. In the general per-hit law the source-side branch factor is

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

For a particle $o'$ with charge $q_{o'}$ at position $\mathbf{s}_{o'}(t)$, the potential energy $U_{o'}(t)$ is defined as the work required to assemble the current configuration against the causal path-history wake landscape:

$$U_{o'}(t) = q_{o'}\,\Phi_{\text{net}}[\text{history}]\big(\mathbf{s}_{o'}(t),t\big).$$

Unlike electrostatics, $\Phi_{\text{net}}$ is not a function of instantaneous source positions but a functional of their past worldlines intercepted by the backward causal cone of $\mathbf{s}_{o'}(t)$. The gradient $\nabla\Phi_{\text{net}}$ is taken with respect to the receiver's spatial coordinates on the fixed background, holding the causal history fixed. In the idealized picture, $\Phi$ is a distribution supported on causal isochrons, not a smooth continuum field.

When we work with the mollified effective potential $\Phi_\eta$, we can also write:

$$\mathbf{F}_{o'}(t) = -\nabla_{\mathbf{s}_{o'}}U_{o'}(t) = -q_{o'} \nabla_{\mathbf{s}_{o'}} \Phi_{\text{net}}[\text{history}]\big(\mathbf{s}_{o'}(t),t\big),$$

and this is equivalent to the Master Equation in the quasi-static, resolved-in-time limit.
The force-as-gradient identity is valid only when taking the gradient at fixed causal history; the fundamental force law remains the per-hit sum of the Master EOM.

#### Macroscopic Cancellation and Localized Resonance

Constant causal emission by many architrinos does not imply a large random macroscopic force. The net potential wake landscape is a superposition, and in a large, incoherent population the leading gradients arrive with many signs, distances, phases, and line-of-action directions. For a receiver sampling such a population, positive and negative gradient influences cancel statistically:

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

In practice, for finite systems or simulation domains, we verify conservation by monitoring $E_{\text{total}}(t)$ and checking convergence as $\eta$ and $\Delta t$ are reduced.

---

### Noether Sea, Effective Spacetime, and Energy Storage

At the fundamental level, the Euclidean void is an empty container. **Effective spacetime** is the observer-level summary of a **sea of high-energy tri-binary assemblies**:

- These tri-binaries are extremely small compared to ordinary particles (electrons, protons, etc.).
- Each tri-binary is itself a tightly bound architrino assembly with very high internal kinetic and potential energy.
- As a sea, they form a **dense manifold of coupled assemblies** that fills the Euclidean void. This ambient Noether-Sea content carries non-zero assembly density and internal stress. It provides the constitutive relations (permittivity, permeability, and medium-dressed inertial response) that deform the primitive architrino dynamics into effective relativistic kinematics, providing the bridge-level spacetime medium for:
  - Emergent inertia and mass,
  - Emergent light cones and Lorentz-like behavior,
  - Effective gravitational coupling (emergent geometry at large scales).

Energy in this picture is distributed across:

1. **Unbound Architrinos** (rare at low energies),
2. **Standard Model assemblies** (electrons, nucleons, etc.),
3. The **tri-binary sea** that constitutes the Noether Sea and, in bridge prose, the spacetime medium.

---

### Assemblies: Internal vs Apparent Energy

For composite systems—Standard Model particles, nuclei, composite bound states—formed from architrinos and embedded in the tri-binary sea, we distinguish:

- **Total internal energy**: what's stored inside the assembly and in its immediate tri-binary environment,
- **Apparent energy**: what leaks out as a long-range wake signature and governs how the assembly interacts with the outside world.

#### Internal Energy of an Assembly

For an assembly $A$ (e.g., tri-binary or higher structure), let $i\in A$ run over its constituent architrinos. Then:

$$E_{\text{internal}}(A) = \sum_{i\in A} E_{k,i} + \frac{1}{2} \sum_{\substack{i,j\in A \\ i\neq j}} U_{ij} + E_{\text{coupling to sea}}(A),$$

where:

- $E_{k,i}$ is the kinetic energy of architrino $i$,
- $U_{ij}$ is mutual potential energy of pair $(i,j)$,
- $E_{\text{coupling to sea}}$ accounts for how the assembly deforms and polarizes the surrounding tri-binary sea, that is, the local Noether-Sea environment (or in bridge prose, the local spacetime medium).

This internal energy can be **very large**: tri-binaries and more complex assemblies may store Planck-scale or higher internal energy, even when the assembly appears as a low-mass particle externally.

#### Apparent Energy and Shielding

The surrounding tri-binary sea, and the arrangement of pro/anti architrinos inside an assembly, can **shield** internal energy from the external world through:

- **Charge cancellation**: positive and negative architrinos within the assembly (and in surrounding tri-binaries) emit wakes that interfere destructively at larger distances.
- **Sphere-stream structuring**: the geometry of internal orbits and tri-binary polarization patterns generates cancellation of most multipoles at scales $r \gg$ assembly size (multipole cancellation in the far field).
- **Nested shielding**: in multi-binary fermion cores, outer binaries partially screen the deeper binaries from the surrounding sea. Generation shifts can therefore be read as loss of shielding tiers, not only as loss of constituent count.

Define a **shielding (leakage) factor** $\zeta(A)\in[0,1]$ for an assembly $A$ as:

$$\zeta(A) \equiv \frac{\text{measured external field amplitude (or effective coupling)}}{\text{naive sum of constituent contributions}},$$

evaluated in a regime where the assembly appears as an effective point source. For a strongly shielded, neutral tri-binary in the tri-binary sea, we expect $\zeta\ll 1$.
Operationally, extract $\zeta(A)$ from a far-field fit of $\Phi_{\text{net}}$ (or hit amplitude) at $r \gg \text{size}(A)$: $\zeta \equiv A_{\text{measured}}/A_{\text{naive}}$, the ratio of the leading $1/r^2$ (or multipole) coefficient to the naive constituent sum.

The **apparent energy** that influences other assemblies at large distances is then roughly:

$$E_{\text{apparent}}(A) \sim \zeta(A)\,E_{\text{internal}}(A),$$

up to proportionality constants fixed by matching to effective low-energy theory (e.g. mapping to $mc^2$).

---

### Emergent Inertia (Mass) from Shielded Energy

**Inertia** is not fundamental; it is the externally exposed response of an assembly's trapped internal causal history, shielding factor, and Noether-Sea coupling to changes in bulk motion.

#### Operational Definition of Inertial Mass

For an assembly $A$, define its inertial mass $m_{\text{inertial}}(A)$ operationally via:

- Apply a small external potential field (from a distant test source) that exerts a known net force $\mathbf{F}_{\text{ext}}$ on $A$,
- Measure the resulting acceleration of its center of mass $\mathbf{a}_{\text{cm}}$ in the tri-binary sea,
- Define:

$$m_{\text{inertial}}(A) \equiv \frac{|\mathbf{F}_{\text{ext}}|}{|\mathbf{a}_{\text{cm}}|}.$$

Because the external field couples mainly to the **apparent energy**, not the full internal storm, we expect:

$$m_{\text{inertial}}(A) \approx \alpha\,\frac{\zeta(A)\,E_{\text{internal}}(A)}{c_{\text{eff}}^2}.$$

Here $E_{\text{internal}}$ names the large internal energy circulation, while $\zeta(A)$ names the small external leakage that survives cancellation and Noether-Sea shielding. The formula therefore explains weak long-range gravitational and inertial footprints without making the internal energy small: ordinary probes couple to the leaked pattern, not to every internal exchange branch.

This is the same shielding-based logic developed more directly in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md). The matching factor $\alpha$ should be fixed only after a calibration-free reference attractor has supplied $E_{\text{internal}}$, $\zeta$, and the medium-response map; it should not be fitted separately to each particle species.

The immediate hand-off is the $A_0$ reference attractor gate. The energy chapter owns the internal-energy and apparent-energy definitions that $A_0$ must report: layer energies, interaction and wake terms, total $E_{\text{internal}}(A_0)$, far-field wake coefficients, and the exposed-energy combination $\zeta(A_0)E_{\text{internal}}(A_0)$. Those outputs are still closure targets until a stable branch, shielding extraction, and response tensor are computed.

The multi-scale status of $A_0$ matters for this accounting. Fast internal corrections should not be removed until they are classified. Nonresonant inner-layer motion may average out of the leading apparent-energy fit, but corrections that change self-hit counts, the branch Jacobian near $c_f$, or the leakage tensor can change $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, or both. Apparent energy is therefore downstream of closure and stability, not an input used to force a convenient branch.

---

#### Noether Sea and Effective Relativistic Behavior

The tri-binary Noether Sea adds an additional layer:

- Moving assemblies must retune their internal causal ledger and reorganize local Noether-Sea coupling.
- The effective resistance to high center-of-mass speed (near the internal tri-binary field speed) increases steeply, producing an emergent "speed of light" scale $c_{\text{eff}}$ at which assemblies effectively saturate.

Thus:

- At low speeds $v\ll c_{\text{eff}}$, we recover $E_k \approx \frac{1}{2}m_{\text{inertial}} v^2$ for assemblies.
- At high speeds approaching $c_{\text{eff}}$, internal coupling to the tri-binary sea and self-hit effects yield a relativistic-like $E_k \sim m_{\text{inertial}}(\gamma-1)$, with $\gamma = 1/\sqrt{1-v^2/c_{\text{eff}}^2}$, as an **effective law**.
- Near $c_{\text{eff}}$, axial architrinos would likely be stripped off, and the assembly may undergo other changes as it oblates.

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
- $c_{\text{eff}}$ is the emergent signal speed of the local medium; in weak-field isotropic conditions, $c_{\text{eff}}\to c_f$.

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

In the **super-field-speed** regime ($|\mathbf{v}_a|>1$ at some emission times), architrinos and assemblies can intersect their own past isochrons (self-hit). In the presence of the tri-binary sea:

- Self-hit repulsion acts as an internal **stiffening mechanism** for tri-binaries and more complex assemblies, contributing to their stability.
- Energy that an architrino (or assembly) emitted into its local Noether-Sea environment can be partially re-absorbed through delayed self-interaction. At the bookkeeping level, this is an exchange between internal kinetic energy and wake/medium energy associated with the local tri-binary configuration.

At the exact causal-action level, global energy is conserved: self-hit just routes energy along more complex paths (architrino → causal isochron → local Noether Sea → back to architrino/assembly). In dual-mollified local theorem models, the same statement should be read conditionally unless the mollified kernel is explicitly tied to an action-level regularization.

---

### Intuition (Plain Language)

Inside an assembly there is a huge storm of energy. Outside, you only see a faint ripple whose amplitude is set by how imperfect the internal cancellations and sea shielding are.

Architrinos and their assemblies are where all the energy lives. The tri-binary sea is a dense, high-energy ocean in which a few special assemblies (electrons, quarks, nucleons) are like boats. The boats' mass and inertia are not just in the hull; they live in how the hull is built and how it pulls on the water. In nested fermion cores, the outer binaries also act like energy screens around the deeper engine. Most of the ocean's energy never shows up in long-range effective fields, because the waves from different directions cancel almost exactly and the deeper layers are partly hidden behind those screening shells. The tiny leftover ripples are what we call gravity and particle masses.

### Summary and Role in the Larger Theory

- **At the architrino level:**
  
  Kinetic energy and potential energy are defined via the Master EOM. Exact global conservation belongs to the exact causal-action theory; in mollified working models it is the target bookkeeping structure and is exact only when the regularization preserves the underlying time-translation symmetry. The substrate law is acceleration-first; no particle-specific fundamental mass is assigned to architrinos, and speeds are unbounded in principle.
  Potential availability is geometric rather than fuel-like: causal wakes are emitted as path-history structure, while work appears only when a receiver intersects active wake branches with nonzero radial power.

- **At the assembly level:**
  
  Large internal energies, plus coupling to the tri-binary sea, generate:
  - Effective inertia (mass),
  - Shielded external wake signatures (tiny apparent energy compared to internal),
  - Generation dependence through how many outer screening shells still surround the deepest core,
  - An emergent speed scale $c_{\text{eff}}$ and relativistic-like behavior.
  Macroscopic quietness follows from superposition and shielding: incoherent populations cancel statistically, while phase-locked assemblies such as collinear breathers preserve localized, non-canceling wake structure.

- **For spacetime and gravity:**
  
  The sea of small, high-energy tri-binaries forms the Noether Sea and, at coarse-grained level, the effective spacetime medium whose energy density and stress give rise to an emergent metric. The shielding factors and internal energies of both Noether-Sea tri-binaries and "matter" assemblies will determine:
  - The effective Newton constant $G$,
  - The cosmological Noether-Sea energy density,
  - How strongly spacetime curvature responds to different kinds of energy.
  
  Density-driven oblation: as the tri-binary sea encounters denser matter, local tri-binaries scale down and oblate, creating a compliance gradient that contributes directly to the effective gravitational coupling $G$.

---

### Appendix A: Energy Zero and Bookkeeping

$\mathbb{A}\mathbb{A}\mathbb{A}$ uses a **binding-energy convention** that fixes the zero of potential energy at the **inner turning point** of a bound pair (the self-hit / max-curvature radius). This choice is both physical and operational: the system has a **hard inner cutoff** (no further compression), so the deepest accessible state is unique and history-independent.

#### Physical Setup and Why a New Zero is Needed

For an attractive two-body system (opposite polarities), the inward motion accelerates until it reaches a **minimum radius** $r_{\min}$ where self-hit dynamics and curvature limits prevent further collapse. The motion then rebounds or orbits. Unlike a pure Coulomb potential, this system **does** have a lower bound on radius (and hence on accessible energy states).

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

$$V_{\text{eff}}(r) = V(r) + \frac{L^2}{2 q_{\text{inertia}} r^2} + V_{\text{self-hit}}(r).$$

Here $q_{\text{inertia}}$ is an **effective inertial scale** (a bookkeeping proxy for mass in the coarse-grained description), not the architrino charge $q$ used in $U=q\Phi$ above.

The convention above fixes:

$$V_{\text{eff}}(r_{\min}) = 0.$$

This does **not** change dynamics; it sets a physically meaningful reference.

#### Self-Hit Echo and Discrete Steps (Working Note)

In the current picture, the self-hit region is **not** assumed to change the local force law. The radial slope remains smooth:

$$\frac{dU}{dr} \text{ is continuous, and both spirals start with slope } 1.$$

So the transition between the $v=c_f$ regime and the self-hit regime is a **gentle grafting**, not a kink in the potential. The distinction shows up in **how energy is discretized and routed** between binaries, not in a new macroscopic slope.

The discrete step is a causal-root ledger effect, not an assumption that energy itself is made of independent chunks. On a fixed branch chart, the active causal intersections have an integer multiplicity: a self-hit count $N$ and an analogous partner-hit or channel count $M$ in the root-ledger language developed in the [closed-form collinear breather ansatz](../../../../markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md). In the circular binary notation this same idea appears as the pair $(N_s,M_p)$ in [Super-Field-Speed Root Ledgers and Resonance Lock](../../../../markdown/aaa/dynamics/binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock). Within one ledger cell the underlying trajectory and $U(r)$ remain continuous. A visible $h$-like transaction occurs when a separator crossing changes the admissible integer ledger, for example by adding one grouped channel or, in the raw simple-root table, by a fold-pair jump satisfying $\Delta N\in 2\mathbb{Z}$ with $\Delta D=0$.

Thus the candidate quantum of action is geometric bookkeeping: it is the action scale assigned to a threshold crossing of the causal-root ledger. The energy shift appears in steps because the allowed causal intersections have changed discretely, even though the path-history geometry and the local potential slope remain continuous through the regularized fold layer.

Working bookkeeping hypothesis:

- Outer binary registers a single-step transaction ($h$-like unit), meaning one minimal admissible update of its active partner and self channel ledger.
- Middle binary adjusts to conserve total energy.
- Inner binary executes a two-step shift ($2h$-like unit), i.e., two discrete ledger updates rather than one. The "step" corresponds to the system crossing a separatrix between basins of attraction in the nonlinear delay dynamics. While the underlying trajectory is continuous, the energy redistribution stabilizes only at discrete resonances (winding numbers and causal-root multiplicities), making the effective energy transfer appear quantized.

This can read as an "amplified" response, but only because the inner binary is **releasing or reconfiguring stored energy** when the self-hit echo is engaged. It is **not** net energy creation; it is a redistribution between internal stores under a smooth $U(r)$.

#### Tri-Binary as Routing/Locking Circuit (Analogy)

It is useful (as a **bookkeeping analogy**) to think of the tri-binary as a **routing/locking circuit** rather than a simple reservoir. An incoming single-step transaction ($h$-like) couples most strongly to the **outer binary**, the **middle binary** acts as a buffer/fulcrum that maintains overall consistency, and the **inner binary** can respond with a two-step reconfiguration when the self-hit echo is engaged. This makes the response feel like a **gear or ratchet**, but the mechanism is still deterministic energy routing, not creation.

In this language, a discrete input can **lock in** a new tri-binary configuration: a threshold-triggered, history-dependent update that selects one stable branch over another. This is a **collapse-like** event in the phenomenological sense (a sudden, discrete state update), but in $\mathbb{A}\mathbb{A}\mathbb{A}$ it is treated as a **deterministic, microstate-sensitive bifurcation**, not an intrinsically stochastic collapse.

#### Bookkeeping Table: One $h$ of Closed-Cycle Action (Outer $v < c_f$)

For the $h$ versus $\hbar$ convention used here, see [Angular Momentum and Spin](../../../../markdown/aaa/theory-bridges/angular-momentum-and-spin.md).

Assumptions for this bookkeeping pass:

- $f$ labels a discrete outer-binary orbital state (frequency index). The three rows are **pre-hit** ($f-1$), **action/transition** ($f_{\psi}$), and **post-redistribution** ($f$). There is **one** step in frequency. The $f_{\psi}$ label is a transient bookkeeping state, not a new frequency index or literal wavefunction.
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

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the hard inner cutoff **creates** a natural zero at $r_{\min}$, which is the lowest accessible state. The bookkeeping therefore switches from "energy relative to infinity" to "energy relative to the ground state."

#### Summary Table (Operational Meaning)

| Region | $K$ | $U$ | Meaning |
| --- | --- | --- | --- |
| $r = r_{\min}$ | max | 0 | Fully bound (ground) |
| $r > r_{\min}$ | $\downarrow$ | $\uparrow$ | Climbing out / rebound |
| escape limit | 0 | $B_{\max}$ | Free (unbound) |

#### One-Line Rule

If the model has a hard inner bound, **set the potential zero at that bound** and measure all energies outward from it.

## Binary Dynamics

This chapter develops two-body architrino dynamics from the appearance of self-hit to stable binaries and their role as measurement standards. It then formalizes the maximum-curvature attractor analysis and closes with the state-space and conservation-law foundations that make the dynamics well-posed. **Status:** (1) self-hit makes the dynamics non-Markovian (path-history dependent), and (2) stability/attractor claims are conjectural unless explicitly established.

It is the foundational precursor to [Tri-Binary Dynamics](../../../../markdown/aaa/dynamics/tri-binary-dynamics.md), [Dyadic Resonance Lock](../../../../markdown/aaa/dynamics/dyadic-resonance-lock.md), [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md), and the assembly-level [Noether Core](../../../../markdown/aaa/assemblies/noether-core.md).

This chapter is the canonical home for two-body wake regimes, partner-hit versus self-hit behavior, spiral contraction, and maximum-curvature binary analysis. The primitive-entity ontology in [Architrino](../../../../markdown/aaa/foundations/architrino.md) should point here once the discussion becomes a behavioral regime or assembly-stability mechanism.

### The Spiral Orbiting Binary and the Contraction Phase

An orbiting binary is the simplest emergent assembly, consisting of two architrinos of opposite polarity: an electrino and a positrino. With polarities $-\epsilon$ and $+\epsilon$, the assembly is electrically neutral overall. This system demonstrates the fundamental principles of interaction, including the consequences of delayed potential and the role of the wake-speed symmetry point.

Consider the ideal case of a symmetric orbit in a universe with no other architrinos. In general, each architrino is subject to a superposition of external potential waves from all other sources; the analysis below isolates the binary by setting those external contributions to zero.

Let the electrino be particle 1 and the positrino be particle 2.
-  **Positions:** $\mathbf{s}_1(t)$ and $\mathbf{s}_2(t)$
-  **Polarities:** $q_1 = -\epsilon$ and $q_2 = +\epsilon$

The motion of each particle is determined by the wake emitted by the other at a delayed time. The acceleration of the electrino (particle 1) at time $t$ is caused by the positrino's (particle 2) wake emitted at an emission time $t_0$. This is governed by the interaction condition:
$$
\|\mathbf{s}_1(t) - \mathbf{s}_2(t_0)\| = c_f(t - t_0)
$$
The acceleration vector for the electrino is attractive, pointing towards the positrino's delayed position:
$$
\mathbf{a}_1(t) \propto -\hat{\mathbf{r}}_{21} = - \frac{\mathbf{s}_1(t) - \mathbf{s}_2(t_0)}{\|\mathbf{s}_1(t) - \mathbf{s}_2(t_0)\|}
$$
A symmetric set of equations governs the positrino's motion based on the electrino's emissions.

In the strictly sub-field-speed regime (no self-interaction, $|\mathbf{v}|\le c_f$), a stable, circular orbit is impossible. Because the attractive force on each particle points to the *past* position of its partner, it is not a true central force. This delay yields an **inward spiral that is naturally modeled as exponential in angle** (a logarithmic spiral), consistent with a per-cycle angular-momentum increment $\Delta L_c$ in the partner-only regime. The radius shrinks geometrically per turn and speed increases until the self-interaction threshold ($|\mathbf{v}|>c_f$) is crossed.

**Lemma (No stable circular orbit for $v < c_f$).** In circular motion, $v=s=R\omega$. In the partner-only regime, the per-hit tangential component satisfies
$$
T_p \propto \frac{\sin(\delta_p/2)}{\cos^2(\delta_p/2)} > 0 \quad (0<\delta_p<\pi),
$$
where $\delta_p$ is the partner delay angle. The time-averaged tangential acceleration cannot vanish; a constant-speed circular orbit is impossible.

-  The tangential component of the delayed force sustains the orbital motion.
-  The radial component continuously pulls the particles closer together.

With perfectly symmetric initial conditions (e.g., starting at rest), the paths of the electrino and positrino are distinct but perfect mirror images of each other. As they spiral inward, their speeds continuously increase. Emission cadence and intrinsic per-wavefront amplitude remain constant, but the **received** force is still velocity-dependent because the delayed Jacobian compresses or dilates the causal flux along each active branch. The evolution is therefore driven by delay geometry, branch bunching, and, once active, self-interaction.

Initially, and as long as the speeds of both particles are less than or equal to the wake speed $c_f$, they are only influenced by their partner's attractive wake. The total acceleration is simply the attractive force:
$$
\mathbf{a}_{1, \text{total}}(t) = \mathbf{a}_{1,2}(t) \quad \text{and} \quad \mathbf{a}_{2, \text{total}}(t) = \mathbf{a}_{2,1}(t)
$$
During this phase, the system is purely contractile, with the particles accelerating and spiraling towards each other. The positive tangential component (see Lemma in the prior section) guarantees continued speed-up, so the spiral tightens until the self-hit regime is reached.

#### Ideal Symmetric Spiral Ansatz

The ideal binary spiral used in this opening analysis is not the same geometry as the later maximum-curvature circular benchmark. It is a **symmetric logarithmic-spiral ansatz**: the electrino and positrino follow two distinct planar curves related by the binary symmetry. At equal absolute time they remain opposite about the midpoint in the ideal center frame, but each particle's path is the mirror-conjugate of the other's path rather than the same curve traced by both particles.

This matters because the ideal spiral is a **transient, scale-similar contraction model**. Within a fixed velocity regime and fixed active-root ledger, the local force geometry is assumed to repeat after a scale change and phase advance: radii shrink by a common factor, speeds rise according to the same delayed-geometry rule, and the partner/self branch structure is symmetric between the two particles. When the trajectory crosses a threshold such as $v=c_f$ or a higher root-birth boundary, that scale-similar description must be re-matched on a new branch chart.

By contrast, the maximum-curvature binary section studies a **uniform circular benchmark**: fixed $R$, fixed $s$, and a single circular path geometry used to compute closed-form delay angles, branch Jacobians, and per-hit force components. That circular model is useful as a limiting or diagnostic case, but it should not be read as the actual inward spiral path before any final arrest. The detailed non-circular benchmark for the symmetric logarithmic spiral belongs in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#symmetric-delayed-logarithmic-spiral-advanced-non-circular-benchmark); this chapter uses it only as the conceptual two-body entry point.

### Spiral Momentum Budget Across the Hinge (Speculative)

We want a single story that links the spiral path, the per-hit force law, and the angular-momentum budget across the full velocity range. Below the wake speed, the binary feels only partner hits, yet the tangential component remains positive, so the spiral keeps tightening and the total orbital angular momentum of the **binary** grows each turn. We introduce a per-cycle gain parameter $\Delta L_c$ to track that growth (a **constant** increment per full revolution in this hypothesis).

**Speculative continuity assumption:** as $v \to c_f$, the per-cycle gain transitions smoothly from $\Delta L_\text{cycle} = \Delta L_c$ (sub-field-speed) to $\Delta L_\text{cycle} = 2\Delta L_c$ (self-hit active). 

This section treats an exponential-in-angle spiral (logarithmic spiral) as a **modeling assumption** rather than a derived law. It simply sets the bookkeeping target: a path-history force sum that yields a smooth, finite increase in $\Delta L_\text{cycle}$ at the hinge. The detailed link between the summed per-hit forces and the spiral shape remains to be derived.

### Spiral Binary Symmetry-Breaking Point ($v = c_f$)

The binary system's evolution is organized around the **field-speed symmetry point** $v=c_f$. This is a **hinge** where the causal structure changes: below $c_f$ only partner-delay forces exist, while above $c_f$ self-hit roots appear. The hinge is not a hard barrier; it is the birth of the principal self branch. In the symmetric circular geometry the self-delay equation is
$$
\delta_s = 2s\sin(\delta_s/2), \qquad s=\frac{v}{c_f}.
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
|\mathbf{x}(t_\text{hit}) - \mathbf{x}(t_\text{emit})| = c_f (t_\text{hit} - t_\text{emit}),
$$
and the architrino is the source of the causal wake surface emitted at $t_\text{emit}$.

**Terminology split:** Hit type is determined by **source identity**. A **self-hit** has the same source and receiver; a **partner hit** has a different source and receiver. Root count is a separate question: either source can contribute one active causal root or multiple active roots at the same reception time. Thus "self-hit" does not mean "multi-hit," and "partner hit" does not mean "single-hit."

**Dynamical role:**
- At low velocities ($v < c_f$), self-hit is absent, unless previously in the self-hit region ($v > c_f$).
- As velocities exceed $c_f$, emission isochrons catch up with the emitter's future positions, generating nonlocal feedback and effective restoring or destabilizing forces depending on configuration.
- In generic trajectories, once a particle has exceeded $c_f$ and emitted wakes in that regime, it can later slow below $c_f$ and still experience self-hits from those earlier emissions (see **Status** at top for the non-Markovian/path-history caveat).
- For binary and tri-binary assemblies, repeated self-hit events are the proposed mechanism that can prevent collapse, lock in stable radii and frequencies, and create new limit cycles and attractors.

For the circular-geometry details (principal angles, winding numbers, discrete self-hit branches), see **Setup and Notation (Symmetric Frame)** in **Maximum-Curvature Binary — Circular**.

### Spiral Binary Deflationary Phase

Once the architrinos' speeds exceed the field speed $c_f$, they cross the symmetry point and begin to interact with their own recently emitted, repulsive wakes. The total acceleration on each particle now becomes a superposition of attraction from its partner and self-repulsion. For the electrino:
$$
\mathbf{a}_{1, \text{total}}(t) = \mathbf{a}_{1,2}(t) + \mathbf{a}_{1,1}(t)
$$
At $|\mathbf{v}| > c_f$, a principal self-hit branch ($m=0$) becomes available; at higher speeds, additional self-hit and partner-hit roots can turn on (see **Root Multiplicity vs. Speed**). The new self-repulsive term, $\mathbf{a}_{1,1}(t)$, grows rapidly as the path curvature increases, and it also adds tangential acceleration. In this regime the spiral typically tightens **more** each turn: the radius decreases faster while speed continues to rise. We still call this the **deflationary** phase, but in the sense that any radial arrest is a **late** effect—there is no soft landing early on. The balance that halts contraction is expected, if realized, only near the final turn where the orbit settles into the conjectured limiting circle; see **What "Maximum Curvature" Demands** for the balance mechanism.

### Maximum-Curvature Binary — Circular

Once self-hit turns on, the natural question is whether the dynamics converge to a limiting curvature. We call the candidate limit the **maximum-curvature binary (MCB)**. This section collects the full two-body, self-hit analysis for that candidate, including delay geometry, force components, and stability criteria. It is the canonical reference for MCB attractor status.

MCB stability claims rely on the well-posedness of the regularized SD-NDDE. In this chapter we treat $\eta > 0$ as fixed and defer the $\eta \to 0$ limit to future work. The formal state-space framework appears in **State Space and Well-Posedness of the Two-Body Delay System**.

**Goal**: Characterize the circular, constant-speed, constant-radius configuration of two opposite-charge architrinos and investigate where curvature $\kappa = 1/R$ is maximized. We work in units with field speed $c_f = 1$ and use the canonical delayed per-hit law with radial line of action and Jacobian-weighted magnitude.

**Plain language**: We seek the tightest (smallest-$R$) steady circle an opposite-charge pair can trace when the only forces come from delayed, Jacobian-weighted line-of-action interactions with the partner (partner hits, possibly multiple at higher speed) and from one's own past emissions (self-hits, active only when speed exceeds field speed).

#### Foundational Context (Ontological Clarification)

##### The Maximum-Curvature Binary (MCB) as Fundamental Unit

The architecture hypothesizes that the **maximum-curvature binary (MCB)** would be reachable first by the **inner binary** of a tri-binary assembly, stabilized by self-hit dynamics when $v > c_f$. Contingent on Conjectures A/B, it would supply the **fundamental physical units** (length and time); see **Emergent Properties and Measurement Standards** below for the explicit definitions.

**Universal cap (explicit):** The MCB is treated as a single, universal limit state (one defining radius/speed). Binaries may sit below this limit, but no binary can exceed the MCB curvature or pass beyond its defining radius/speed.

If realized, the MCB radius $r_{\text{min}}$ is expected to be determined by the balance of:
1. Coulomb-like attraction between opposite polarities ($\propto |e/6|^2 / r^2$),
2. Self-hit repulsion (non-Markovian feedback when $v > c_f$),
3. Centripetal requirement for stable circular orbit.

**Dynamical priority (attractor status):** The architecture hypothesizes the MCB is a **robust attractor**, not a finely tuned periodic orbit. Only if the multipliers lie strictly inside the unit circle and the basin is non-trivial do we have the attractor the architecture relies on. If neutrality or instability is found, the tri-binary ladder and Noether-core claims must be downgraded or the interaction law revised (e.g., additional damping/medium effects).

#### Setup and Notation (Symmetric Frame)

- **Two architrinos** with charges $q_1 = -\epsilon$ and $q_2 = +\epsilon$ (where $\epsilon = |e/6|$).
- **Equal-time positions** (in absolute time $t$) are diametrically opposite on a circle of radius $R$ about the midpoint.
- **Uniform circular motion**: Angular speed $\omega$, constant tangential speed $s = R\omega$.
- **Non-translating binary**: Circle center (midpoint) is fixed in Euclidean 3D space; no net translation.

Let $C_i(t_\text{emit})$ denote the causal wake surface emitted by architrino $i$ at emission time $t_\text{emit}$. For uniform circular motion, self-hit events are discrete intersections between the worldline and its own wake surfaces. Define the **principal self-delay angle** $\tilde{\delta}_s \in (0, \pi]$ as the minimal angular separation between the current position and the emission point that yields a hit. Additional self-hits occur at longer delays indexed by winding number $m \ge 0$, giving a discrete family $\delta_s(m) = \tilde{\delta}_s + 2\pi m$.

##### Phase Angles and Delays

Let $\delta_s$ and $\delta_p$ denote the angular phase separations (measured along the circle) between:
- **Self** (same particle): Current position -> its own past emission position that hits "now."
  - Delay time: $\tau_s$; angular separation: $\delta_s = \omega \tau_s$.
  - Chord length: $r_s = 2R \sin(\delta_s / 2)$.
 
- **Partner** (other particle): Current position -> partner's past emission position that hits "now."
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

**Critical threshold**: Self-hits exist only when $s > 1$ (i.e., $v > c_f$). For $s \le 1$, no self-hits occur.

---

##### Terminology: Roots and Winding Numbers

**Root**: An emission time $t_0 < t$ (from either self or partner) that satisfies the causal constraint $r = c_f (t - t_0)$ and produces a hit at reception time $t$.

**Integer-indexed older roots (winding numbers)**:

Let $\tilde{\delta}_s \in (0, \pi]$ and $\tilde{\delta}_p \in (0, \pi]$ denote the **minimal (principal) angular separations** that determine the chord lengths and force directions.

The full families of causal delays are:

- **Self**: 
 $$
 \delta_s(m) = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2), \quad m = 0, 1, 2, \dots
 $$
 
- **Partner**: 
 $$
 \delta_p(m) = \tilde{\delta}_p + 2\pi m = 2s \cos(\tilde{\delta}_p / 2), \quad m = 0, 1, 2, \dots
 $$

**Geometric interpretation**:
- The minimal separations $\tilde{\delta}_s$, $\tilde{\delta}_p$ determine the **geometry** (chord lengths, force directions).
- The winding index $m$ affects **timing/ordering** of multiple hits but does not change the **sign** or **direction** of force components (all derived from principal geometry).

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

Using the delayed law with line-of-action direction and Jacobian-weighted magnitude (where $\kappa$ is a coupling constant and $\epsilon = |e/6|$), define branch Jacobians

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

2. **Net-zero tangential power** (constant speed on average):
  $$
  \langle T \rangle = 0.
  $$

---

##### Apparent Obstruction: Non-Negativity of Tangential Components

**Theorem (No-go for constant-speed circular orbit in the bare two-body kernel).**  
In the symmetric, non-translating circular binary with canonical delayed radial forces only, the net tangential acceleration is strictly positive whenever at least one causal root contributes.

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
The sign is branch-invariant because winding changes timing, not chord orientation in this symmetric geometry. Therefore each summand in $T_{\mathrm{net}}$ is nonnegative, and at least one is strictly positive whenever any hit exists. Hence $T_{\mathrm{net}}>0$. $\square$

**Corollary.**  
Within the bare isolated two-body kernel, an exact constant-speed circular orbit
($\langle T\rangle=0$) is impossible. Any MCB-like steady state must therefore come from terms outside this kernel, e.g. medium coupling/dissipation, radiation-reaction-like closure, or genuinely multi-body tri-binary effects.

**Plain language**: The isolated pair shows persistent tangential drive at the per-hit level; cancellation is hard because every root pushes the same way. A steady circle must come from exceptional multi-root averaging or from extra physics beyond the bare kernel. This is a primary test of the MCB attractor hypothesis.

---

#### What "Maximum Curvature" Demands

**Mechanism summary (self-hit balance):** once $s>1$, each self-hit contributes a **repulsive acceleration away from its own past emission point**. In the symmetric circular geometry that repulsion has a **radial outward component** (opposing further contraction) and a **positive tangential component** (continuing to speed up the architrino). As the radius shrinks, both partner attraction and self-hit repulsion scale like $1/R^2$, while the decisive extra effect is the Jacobian weighting: the self-hit response can sharpen dramatically as an active branch approaches its null-separatrix geometry and because **new self-hit roots appear** at higher $s$. Maximum curvature would require the **outward self-hit radial component** to balance the inward partner pull without the still-positive tangential drive destroying constant-speed closure.

From the radial component formula:

$$
A_{\text{rad}} = \frac{\kappa \epsilon^2}{4R^2} \left( \frac{1}{\cos(\delta_p / 2)\,|J_p|} - \frac{1}{\sin(\delta_s / 2)\,|J_s|} \right).
$$

**Increasing curvature** ($\kappa = 1/R$ larger -> $R$ smaller) requires **stronger inward radial force**. This occurs when:

1. **$\delta_p$ increases** -> $\cos(\delta_p / 2)$ decreases -> partner term $1/\cos(\delta_p / 2)$ **increases** (stronger inward pull).
2. **$\delta_s$ increases** -> $\sin(\delta_s / 2)$ increases -> the geometric part of the self term decreases, while the full outward response still depends on how rapidly the Jacobian factor $|J_s|^{-1}$ grows along the active branch.

Two distinct balance mechanisms are now mathematically visible:

1. **Near-threshold Jacobian wall.**  
   On the principal self branch, $|J_s|^{-1}$ turns on singularly as $s\downarrow 1^+$, with radial magnitude scaling like $(s-1)^{-3/2}$. This is the earliest possible obstruction to continued contraction.

2. **Higher-speed multi-branch redistribution.**  
   At larger $s$, additional self branches turn on and redistribute the outward response across several winding sectors. In that regime the detailed balance depends on the full weighted sum over all active branches rather than on the principal branch alone.

**However**: Due to the per-hit $T > 0$ result, this "maximum curvature" state remains unverified for the isolated two-body system. Its stability must be tested by the full, multi-root time-averaged dynamics.

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
so the wake propagation speed is not an imposed particle-speed limit. It is the propagation reference used to compare the MCB rod and clock, while individual architrinos may enter super-field-speed regimes with
$$
v>c_f.
$$

In this view, any ruler or clock built from architrino assemblies ultimately reduces to multiples of $(d_0, T_0)$. Measurement standards are therefore **dynamical invariants** of the two-body attractor: they persist because the underlying limit cycle (if realized) is stable and reproducible across assemblies.

If the MCB does not exist as a stable attractor, these emergent standards must be replaced by whatever stable limit structure the dynamics actually support.

#### Root Multiplicity vs. Speed

This section separates the two terminology axes used throughout the chapter:

- **Source identity**: self-hit ($j=i$) or partner hit ($j\ne i$).
- **Root count**: single-root or multi-root on the current branch chart.

The self-hit onset is dynamically special because it introduces same-source feedback and an outward self-repulsive channel. Partner multi-hit is still part of the same super-field-speed root topology: at higher speeds, older partner wake surfaces can also satisfy the causal-root condition and contribute additional inward channels.

In uniform circular, non-translating geometry, admissible self-roots are indexed by winding number $m \ge 0$ and minimal angular separation $\tilde{\delta}_s \in (0, \pi]$:

$$
\delta_s = \tilde{\delta}_s + 2\pi m = 2s \sin(\tilde{\delta}_s / 2).
$$

##### Counting Self-Hits by Winding Index

For fixed winding $m \ge 0$, define
$$
f_m(\delta;s)=2s\sin(\delta/2)-\delta-2\pi m,
\qquad \delta\in(0,\pi].
$$
An $m$-branch self-hit exists exactly when $f_m(\delta;s)=0$ has a solution in $(0,\pi]$.

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

Thus the higher self branches do not turn on at equally spaced speeds. Their onset is governed by a nonlinear sequence of tangencies of the delayed self-intersection curve.

For large winding number $m$, the threshold has the asymptotic form
$$
s_m^\star = \pi m + \frac{\pi}{2} + O\!\left(\frac{1}{m}\right),
$$
so the old equally spaced picture is recovered only as a high-speed approximation.

**Note**: Straight-line motion admits **no self-hits** even if $s > 1$; **curvature is required**. The above statements apply specifically to uniform circular, non-translating geometry.

---

#### Where Do Causal Hits Come From on the Circle? (Discrete Azimuth Pattern)

**Context**: Non-translating, uniform circular binary at fixed speed $s$. Receiver "now" at azimuth $\theta = 0$.

The emission points on the circle that can produce hits "now" form a **finite, discrete set** of azimuths determined by the delay equations--**not arbitrary locations**. Because roots are indexed by winding number $m$, multiple hits at the same "now" can occur for different windings, but the admissible azimuths remain a finite comb and never fill the circle.

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
v>c_f,
$$
the receiver can intersect multiple older causal wake surfaces from both its own path and its partner's path. In the circular reduced model, these intersections are counted by two integer ledgers:
$$
N_s(s)
\equiv
\#\{m\ge0:\text{self branch }m\text{ is active at speed }s\},
$$
$$
M_p(s)
\equiv
\#\{m\ge0:\text{partner branch }m\text{ is active at speed }s\}.
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
together with whatever tangential closure condition is supplied by the full regularized dynamics. The radial equation says that partner-root accumulation supplies inward pull while self-root accumulation supplies outward response. The tangential condition remains the hard part: in the bare isolated two-body kernel, the no-go result above shows that every active branch contributes positive tangential drive, so exact circular closure is not yet proved.

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

##### Finite-dimensional projection caveat

The circular formulas below use reduced coordinates; stability in the full history space remains a separate proof obligation.

### State Space and Well-Posedness of the Two-Body Delay System

#### Introduction and Scope

The master equation of Motion for the architrino system constitutes a system of **State-Dependent Neutral Delay Differential Equations (SD-NDDEs)**. Unlike ordinary differential equations (ODEs) where the state is a point in $\mathbb{R}^{6N}$, the state of this system is a **function segment** representing the past history of the particles.

We denote the position of the $i$-th architrino as $\mathbf{x}_i(t) \in \mathbb{R}^3$. We work in the **Euclidean Void** with fixed metric $\delta_{ij}$.

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
For a target particle $i$ at time $t$ and source $j$, the delay $\tau_{ij}(t)$ is implicitly defined by the light-cone condition. Let $\phi \in \mathcal{H}$ be the history. A **causal root** is a value $\tau > 0$ satisfying:
$$
g_{ij}(\tau, \phi) \equiv \|\phi_i(0) - \phi_j(-\tau)\| - c_f \tau = 0.
$$

##### Lemma 1 (Regularity of the Delay Map)
*Assumption:* The velocities are sub-field-speed relative to the separation, i.e., $|\mathbf{v}_j| < c_f$ (single-root regime) OR we isolate a specific branch of the multi-root solution where the relative radial velocity is not $c_f$.

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

##### Definition 3 (Regularized Force Field)
To ensure the vector field is Lipschitz, we replace the distributional Dirac delta of the master equation with the mollifier $\rho_\eta$ (see [dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md)). The acceleration functional $F_i: \mathcal{H} \to \mathbb{R}^3$ is:
$$
F_i(\phi) = \sum_{j} \kappa \sigma_{ij} q_i q_j \int_{-h}^0 \frac{\phi_i(0) - \phi_j(\theta)}{\|\phi_i(0) - \phi_j(\theta)\|^3} \, \rho_\eta\left( \|\phi_i(0) - \phi_j(\theta)\| + c_f \theta \right) \, d\theta.
$$
**Crucial Property:** For $\eta > 0$ and smooth $\rho_\eta$, this integral operator maps $C^1$ histories to continuous accelerations.

---

#### Local Well-Posedness

##### Theorem 1 (Local Existence and Uniqueness)
**Assumptions:**
1. $\eta > 0$, and $\rho_\eta$ is $C^1$ with bounded value and bounded derivative.
2. Initial history $\phi^0 \in \mathcal{H}$ is admissible: there exists $d_{\min}>0$ such that all interaction channels used by Definition 3 satisfy
   $$
   \|\phi_i(0)-\phi_j(\theta)\|\ge d_{\min},\qquad \theta\in[-h,0],
   $$
   on a neighborhood of $\phi^0$.
3. Delay roots used in channel construction are simple (transversal), i.e. no causal-shock degeneracy (Lemma 1).
4. Couplings/charges are finite.
5. Optional higher-smoothness gluing condition at $t=0$ (needed for $C^2$ at the junction, not for $C^1$ well-posedness).

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
2. By Assumption 1, composition with $\rho_\eta$ preserves $C^1$ regularity and bounded derivatives.  
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
3. **Causal Shock:** The derivative of the delay $\dot{\tau}(t)$ diverges (Doppler factor becomes singular). This occurs if a particle moves directly toward a receiver at speed $v = c_f$.

---

### Symmetry, Conservation, and Lyapunov Functionals

#### Introduction

Standard conservation laws (energy, momentum, angular momentum) rely on the application of Noether's Theorem to local Lagrangian densities. In this delayed setting, the force at time $t$ depends on the phase-space trajectory over the interval $[t - h, t]$.

Symmetries of the substrate (Euclidean Void + Absolute Time) still imply conservation laws, but the conserved quantities are no longer simple functions of the instantaneous state $(\mathbf{x}, \mathbf{v})$. Instead, they are **functionals on the history space** $\mathcal{H}$.

This section derives these functionals, establishes the exact symmetry group of the regularized dynamics ($\eta > 0$), and provides the *a priori* bounds required to ensure physical well-posedness (preventing unphysical runaway acceleration).

---

#### The Global Symmetry Group

We consider the regularized two-body system in the Euclidean Void $\mathbb{R}^3$ with metric $\delta_{ij}$ and absolute time $t$.

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

**Implication:** There exist exact integrals of motion corresponding to these symmetries. However, because the interaction is non-local in time, these integrals must account for "momentum and energy in flight" (stored in the wake surfaces).

---

#### Conservation of Generalized Momentum

In a delay system, Newton's Third Law ($\mathbf{F}_{12}(t) = -\mathbf{F}_{21}(t)$) fails instantaneously because $\mathbf{F}_{12}(t)$ originates from particle 2 at $t-\tau_1$, while $\mathbf{F}_{21}(t)$ originates from particle 1 at $t-\tau_2$.

##### Definition 2 (Mechanical Momentum)
The instantaneous mechanical momentum is:
$$
\mathbf{P}_{\text{mech}}(t) = \sum_{i} \mu_{\text{arch}} \mathbf{v}_i(t).
$$
Because of the delay, $\frac{d}{dt}\mathbf{P}_{\text{mech}} \neq 0$ generally.

##### Theorem 2 (Conservation of Total Momentum Functional)
There exists a functional $\mathbf{P}_{\text{wake}}[\mathbf{x}_t]$ representing the momentum flux encoded in the active causal wake surfaces such that the total momentum:
$$
\mathbf{P}_{\text{tot}} = \mathbf{P}_{\text{mech}}(t) + \mathbf{P}_{\text{wake}}[\mathbf{x}_t]
$$
is strictly conserved ($\frac{d}{dt}\mathbf{P}_{\text{tot}} = 0$).

**Explicit Form (Weak Coupling Limit):**
For $\eta \to 0$, the wake momentum can be approximated by integrating the force impulse over the delay time:
$$
\mathbf{P}_{\text{wake}} \approx \sum_{i \neq j} \int_{t - \tau_{ij}(t)}^{t} \mathbf{F}_{ij}^{\text{emit}}(s) \, ds.
$$
*Physical Interpretation:* The "missing" momentum is strictly accounted for by the wake surfaces currently traversing the space between sources and receivers.

**Corollary (Center of Mass Motion):**
For an isolated binary, the center of mass $\mathbf{x}_{\text{cm}}$ does not move at constant velocity. Instead, it oscillates around a mean trajectory. However, **self-acceleration of the center of mass to infinity is forbidden** by the exact translation invariance of the Lagrangian. The system cannot "bootstrap" itself to arbitrary speeds without external interaction.

---

#### Energy and The Lyapunov Functional

Energy conservation is the critical constraint preventing runaway solutions (MCB-09).

##### Definition 3 (The History Hamiltonian)
Since the system is time-translation invariant, there exists a conserved quantity $\mathcal{H}$. For state-dependent delays, this is a **Lyapunov-Krasovskii Functional**:
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
Then, by construction, $\mathcal{E}_{\text{tot}} = K(t) + \mathcal{W}(t)$ is constant.

##### Lemma 1 (Boundedness of the Potential)
**Assumption:** The interaction is regularized with width $\eta > 0$ such that the maximum force is bounded: $\|\mathbf{F}_{ij}\| \le F_{\max}(\eta)$.
**Statement:** For a bound system (particles confined to a finite volume $V$), the rate of work is bounded by $N F_{\max} v_{\max}$.

##### Theorem 4 (No-Runaway Criterion)
In the master equation dynamics, an isolated binary cannot undergo runaway acceleration ($v \to \infty$) *unless* the potential energy functional $\mathcal{W}(t)$ diverges to $-\infty$.

*Proof Logic:*
Since $\mathcal{E}_{\text{tot}}$ is constant:
$$
K(t) = \mathcal{E}_{\text{tot}} - \mathcal{W}(t).
$$
For $K(t)$ to diverge, $\mathcal{W}(t)$ must decrease without bound.
1. **Partner Attraction:** $q_1 q_2 < 0$. The potential is negative (attractive). As $r \to 0$, $V \to -\infty$. Collapse leads to infinite kinetic energy (standard Kepler singularity, resolved by self-hit).
2. **Self-Hit Repulsion:** $q_1 q_1 > 0$. The force is **repulsive**. The potential contribution is **positive**.
  *  Work done by self-hit: If a particle is pushed "from behind" by its own wake, it gains $K$.
  *  However, this energy must come from the $\mathcal{W}$ term.
  *  Since self-hit potential is repulsive (positive energy hill), converting it to kinetic energy lowers the total potential.
  *  **Crucial Bound:** The deferred work encoded in a self-wake is finite (determined by emission charge). A particle cannot extract infinite energy from its own past unless it puts infinite energy *into* the field first.

**Conclusion:** The "free lunch" runaway, where a particle accelerates itself indefinitely using self-forces, is forbidden by the conservation of $\mathcal{H}$. The system can oscillate or settle, but it cannot explode to $v=\infty$ without singular collapse of the radius.

---

## Tri-Binary Dynamics

This chapter develops a working draft of tri-binary dynamics by extending the two-body delay system to a coupled three-binary core. The focus is the geometric response at high group velocity and under strong gravitational gradients, along with the diagnostic quantities used to assess stability and alignment.

It should be read together with [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md), [Dyadic Resonance Lock](../../../../markdown/aaa/dynamics/dyadic-resonance-lock.md), [Mapping the Planck Scale](../../../../markdown/aaa/theory-bridges/planck-scale-tri-binary-alignment.md), [Noether Core](../../../../markdown/aaa/assemblies/noether-core.md), [Noether Core Geometry](../../../../markdown/aaa/assemblies/noether-core-geometry.md), and [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md), since those notes supply the binary precursor, lock structure, alignment target, assembly carrier, exclusion-envelope geometry, and effective geometric bridge.

This chapter is the canonical dynamics home for coupled three-binary speed regimes, alignment behavior, and assembly-stability mechanisms. Primitive architrino ontology should not carry those mechanisms; it should route them here and to [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md).

### Relation to the Causal Closure Workstream

This chapter owns the dynamics baseline: the Noether-core roles, speed-regime conventions, delay-envelope geometry, gradient response, local clock diagnostics, and stability tests that define the tri-binary mechanism. It does not try to close the full rest-mass, proper-time, photon, or relativistic-limit proof program.

The stronger causal-closure program uses the mechanism defined here as an input. In this chapter, those stronger claims are included only where they clarify the dynamics baseline, and they are marked as reconstruction targets rather than completed theorems.

### Publication Status and Claim Scope

This chapter is publishable as a canonical dynamics baseline. It is not a completed derivation of rest mass, photon behavior, or general relativity from first principles. Its claims are organized into three classes:

| Class | Treatment in this chapter |
| --- | --- |
| Dynamics baseline | Noether-core roles, speed-regime conventions, delay-envelope geometry, spiral-helical motion, clock diagnostics, and stability tests. |
| Reconstruction target | Mass response, proper time, observer-level metric data, photon-channel behavior, and weak-field matching as quantities to be derived from the dynamics. |
| Open proof burden | Tri-binary minimality, shielding extraction, momentum-skew derivation, Floquet stability, photon closure, equivalence-principle residual bounds, and ADM/Cartan closure. |

The chapter should therefore be read as the stable dynamics layer beneath the causal-closure program. It preserves the mechanism and the diagnostic quantities while leaving the full theorem burden explicit.

### Substrate and Effective Levels

Tri-binary dynamics uses four levels of description:

| Level | Meaning |
| --- | --- |
| Substrate ontology | Euclidean void, absolute substrate time $t$, architrinos, causal wakes, and causal-root branch structure. |
| Assembly dynamics | Noether cores, three coupled binary layers, self-hit multiplicity, shielding, phase closure, and root-ledger transitions. |
| Effective physics | Rest mass, proper time, photon propagation, Lorentz kinematics, geodesics, and horizon behavior as reconstructed by assembly-built observers. |
| Theorem roadmap | Mathematical closures that remain to be derived before the effective claims can be treated as proved. |

The distinction matters because the Euclidean void is not being curved at the substrate level. Curvature, geodesic motion, lapse, and horizon language enter as observer-level bookkeeping reconstructed from Noether-Sea state variables and assembly response.

### Speed Hierarchy

Several speed symbols must remain separated:

| Symbol or phrase | Meaning |
| --- | --- |
| $c_f$ | Primitive wake propagation speed in the substrate. |
| $c_{\text{eff}}(\mathbf{x},t)$ | Noether-Sea dressed assembly-channel propagation speed used for clock/ruler closure and observer-sector metric comparisons. |
| $c_\gamma(\mathbf{x})$ | Local photon-channel speed; in the working observer-level photon branch, $c_\gamma(\mathbf{x})\equiv c_{\text{eff}}(\mathbf{x})$. |
| Locally measured light speed | The operational speed reconstructed by assembly clocks, rulers, and photon synchronization. |

The primitive speed $c_f$ is used for wake-intersection and self-hit geometry. The effective speed $c_{\text{eff}}$ is used for Noether-Sea dressed closure and observer-level comparisons. These are not interchangeable. Any diagnostic that moves from primitive wake geometry to observer-level clocks, rulers, or photons must declare its dressing map.

### Multi-Scale Layer Locking

The baseline Noether core is not a stack of three identical circular binaries. It is a nested causal lock whose layers operate in different speed regimes. Let $s_\ell$ denote the characteristic speed of one member of layer $\ell$ around that layer's center. In the ordinary weak-stress regime, the target ordering is

$$
s_I > c_f,
\qquad
s_M \approx c_f,
\qquad
s_O < c_f.
$$

The inner binary is therefore self-hit and history-supported, the middle binary is the $v = c_f$ hinge where root branches are most sensitive, and the outer binary is the sub-field-speed interface that controls shielding and boundary coupling. Their radii, cycle times, and history-window depths may differ by orders of magnitude. A reduced derivation can start with a separated-scale hypothesis such as $R_I \ll R_M \ll R_O$ and $T_I \ll T_M \ll T_O$, but the branch must report the actual hierarchy rather than hiding it in the notation.

This is why ordinary circular or elliptic orbit language is limited. A circular carrier can expose useful geometry and a separable layer ansatz can diagnose missing forces, but a tangential residual in that ansatz does not by itself settle the tri-binary problem. In a coupled lock, inter-layer wakes, self-hit roots, and near-separator branch changes can supply phase corrections that are absent from a single isolated two-body chart.

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

This is the common mechanical basis for three later effective readouts:

- clock-rate change, because each completed internal cycle requires a different causal path;
- longitudinal ruler contraction, because inter-assembly spacing must retune for forward and backward exchange;
- inertial response, because acceleration forces the internal causal ledger to re-close under a changing kinematic bias.

### Transverse Causal Budget Lemma

Proper time $\tau$ is the cycle count of a stable Noether-core clock, not the absolute substrate time $t$ itself. The reusable dynamics target behind that clock law is the transverse causal budget lemma.

Work in the local rest frame of the relevant medium or branch chart, and declare one causal speed $c_\star$ before forming the budget:

| Use case | Declared speed |
| --- | --- |
| Primitive wake-intersection or self-hit branch chart | $c_\star=c_f$ |
| Noether-Sea dressed assembly clock or ruler comparison | $c_\star=c_{\text{eff}}(\mathbf{x})$ |
| Photon-channel synchronization or Gate A tests | $c_\star=c_\gamma(\mathbf{x})$ |

These choices are not interchangeable. The primitive equation of motion uses $c_f$; observer-level clock, ruler, and photon comparisons must use the dressed speed appropriate to the channel being tested. The photon-channel identification $c_\gamma(\mathbf{x})\equiv c_{\text{eff}}(\mathbf{x})$ is therefore a closure target, not a notation shortcut.

For a moving assembly with center-of-mass velocity $\mathbf{V}_{\text{cm}}$ relative to the declared local frame, define

$$
\beta_\star
=\frac{\|\mathbf{V}_{\text{cm}}\|}{c_\star}.
$$

The causal budget decomposes into an axial part used to keep pace with the translated receiver and a transverse part available for internal closure:

$$
c_{\parallel}=\|\mathbf{V}_{\text{cm}}\|,
\qquad
c_{\perp}
=
c_\star
\sqrt{1-\frac{\|\mathbf{V}_{\text{cm}}\|^2}{c_\star^2}}.
$$

The lemma target is that a stable tri-binary clock preserving the same integer root-ledger branch extracts its clock-rate diagnostic from the remaining transverse budget:

$$
\frac{\Delta\tau}{\Delta t}
=
\frac{c_{\perp}}{c_\star}
=
\sqrt{1-\frac{\|\mathbf{V}_{\text{cm}}\|^2}{c_\star^2}},
$$

up to branch-change, leakage, anisotropy, gradient, and finite-stability residuals that must be measured by the Floquet and Cartan diagnostics below. In a homogeneous Noether-Sea clock/ruler cell this specializes to $c_\star=c_{\text{eff}}$, giving the usual effective dilation target. In a primitive branch scan the same algebra may be tested with $c_\star=c_f$, but that does not by itself prove the observer-level clock law.

This is the causal-budget route to the standard effective dilation law. It is a derivation/closure target: moving assembly clocks tick more slowly because less transverse causal capacity remains for closing their internal tri-binary cycles. The same lemma is the local source for [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md), the operational compensation program in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md), photon Gate A in [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-closure-interface), and the ADM/Cartan reconstruction target below.

### ADM/Cartan Reconstruction Target

For observer-level comparison with effective geometry, tri-binary dynamics should reconstruct three local fields from Noether-Sea state variables and assembly response:

$$
N(\mathbf{x},t),
\qquad
u^i_{\text{sea}}(\mathbf{x},t),
\qquad
\gamma_{ij}(\mathbf{x},t)=\delta_{ab}e^a{}_i e^b{}_j.
$$

Here $N$ is the effective clock-rate or lapse field, $u^i_{\text{sea}}$ is medium drift, and $\gamma_{ij}$ is the spatial compliance metric. The observer-level bookkeeping metric target is

$$
ds_{\rm eff}^2
=
-N^2c_0^2dt^2
+
\gamma_{ij}
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right).
$$

This metric is not substrate ontology. It is the effective clock, ruler, and null-path bookkeeping induced by the Noether-Sea state. The open reconstruction task is to show that the resulting connection reproduces Newtonian acceleration, redshift, Shapiro delay, lensing, and the required weak-field PPN coefficients while keeping torsion, nonmetricity, dispersion, birefringence, and preferred-frame residuals below observational limits.

### Dynamics-Side Roadmap

The dynamics chapter contributes the stable pieces needed by the larger theorem program:

1. Define the speed hierarchy and the causal-speed guardrails.
2. Model the tri-binary Noether core as inner engine, middle fulcrum, and outer shielding/interface layer.
3. Track how motion deforms the rest-state lock into braided spiral-helical geometry.
4. Derive local clock diagnostics from the transverse causal budget lemma.
5. Output alignment, closure, Floquet, grazing, and Cartan reconstruction diagnostics.
6. Keep mass, photon, equivalence-principle, and full GR matching claims at the level of reconstruction targets until their proof burdens close.

### Working Hypotheses

1. The formed Noether core has stable invariants ($R_{\text{core}}$, $\omega_{\text{core}}$, fixed phase offsets).
2. The outer-binary delay loop yields discrete plateaus and a terminal aligned mode under increasing stress.
3. High group velocity produces an oblate causal envelope that drives planar alignment in the terminal rung.
4. High gravitational gradient modifies phase closure through tidal or differential delay effects, shifting or destabilizing rungs.

---

### Regime Map for Speed Statements (CFT / Horizon / AdS)

To keep speed claims consistent across documents, all binary-speed statements should be read as **regime-qualified**:

| Regime | Inner binary | Middle binary | Outer binary | Operational meaning |
| --- | --- | --- | --- | --- |
| **CFT exterior** (sub-horizon, weak/medium stress) | Typically in self-hit branch ($v \gtrsim c_f$ history-supported) | Near the hinge scale ($v \approx c_f$) in working models | Typically $v < c_f$ | Hierarchical tri-binary operation and ordinary ladder behavior |
| **Holographic horizon transition** (terminal alignment) | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | 3D precessing structure collapses toward planar lock |
| **AdS / self-hit interior** (post-transition, strongly nonlocal memory) | Self-hit dominated; effective closure may involve super-field effective speed | Strongly coupled to inner/outer delay closure | Can participate in states where combined in-plane effective speed satisfies $v_{\text{eff}} > c_f$ | Mach-wedge-like causal geometry and interior recycling hypotheses |

**Notation guardrail:** "$v < c_f$" or "$v = c_f$" in role summaries refers to a component/regime statement, while $v_{\text{eff}} > c_f$ refers to the **combined in-plane effective motion** used in wake-geometry closure.

**Geometry speed guardrail:** Use a declared causal speed $c_\star$ in envelope and closure diagnostics. For primitive architrino wake intersections, set $c_\star=c_f$. For observer-level Noether-Sea dressed closure, set $c_\star=c_{\text{eff}}(\mathbf{x})$. The corresponding kinematic parameter is
$$
\beta_\star=\frac{v_{\text{trans}}}{c_\star},
\qquad
\gamma_\star=\frac{1}{\sqrt{1-\beta_\star^2}}.
$$
Primitive dynamics scans and effective-metric comparisons must not mix $c_f$ and $c_{\text{eff}}$ in the same diagnostic without an explicit dressing map.

---

### Geometry Focus

#### A) High Group Velocity Geometry (Oblate Spheroid)

**Assumption (testable):** The outer binary moving at translational speed $v_{\text{trans}}$ generates a causal interaction envelope that is oblate and flattens along the direction of motion as $v_{\text{trans}} \to c_f$.

**Geometry:** Let the motion define the $z$-axis. Model the envelope as an ellipsoid
$$
\frac{x^2 + y^2}{R_\perp^2} + \frac{z^2}{R_\parallel^2} = 1,
$$
with transverse radius $R_\perp$ and longitudinal radius $R_\parallel$.

Adopt a kinematic contraction law (to be validated by dynamics):
$$
\beta = \frac{v_{\text{trans}}}{c_f}, \quad \gamma = \frac{1}{\sqrt{1-\beta^2}}, \quad R_\parallel = \frac{R_\perp}{\gamma}.
$$
As $\beta \to 1$, $R_\parallel \to 0$ and the envelope collapses toward a disk.
**Right-triangle link:** Treat $c_f$ as the fixed causal propagation speed and decompose it into orthogonal components: one leg is the group translation $v_{\text{trans}}$, the other leg is the longitudinal closure speed $v_\parallel$. Then
$$
c_f^2 = v_{\text{trans}}^2 + v_\parallel^2 \quad \Rightarrow \quad v_\parallel = c_f\sqrt{1-\beta^2}.
$$
Mapping causal speed to closure length gives $R_\parallel = R_\perp (v_\parallel/c_f) = R_\perp\sqrt{1-\beta^2} = R_\perp/\gamma$, recovering the ellipsoid law from the triangle geometry.

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

---

#### B) High Gravitational Gradient Geometry

**Coupling caveat:** Whether $v_{\text{trans}}$ is independent of the radial infall speed $v_r$ is unresolved. Use the independent form by default, or adopt a coupling $v_{\text{trans}} = f(R_\perp)$ and substitute to test specific scenarios.

**Assumption (testable):** A strong external gradient (tidal field or effective curvature) perturbs the delay loop, altering phase closure and stability of rungs.

**Origin of the gradient (model definition):** Gravitation is implemented as an emergent spatial gradient in Noether core volume. As energy accumulates in dense collections of standard-model assemblies (protons, neutrons, electrons), the local Noether core volume contracts, and surrounding regions experience a gradient in available core volume. This gradient is the effective gravitational field in the delay-geometry model.

**Geometry inputs:** Represent this gradient as a scalar control parameter $G_{\text{grad}}$ (e.g., $|\partial \Phi/\partial r|$ or a tidal tensor magnitude) applied to the outer-binary environment. In simulations, treat $G_{\text{grad}}$ as the local radial derivative of Noether core volume (or its proxy) around the outer-binary orbit.

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
At sufficiently high stress, this implies a terminal rung: further increases cannot support a stable 3D mode, only a planar aligned state.

**Status:** This precession-expanded exclusion volume is not explicitly modeled in the current minimal system; treat results as lower bounds until the swept-volume effect is added.

#### D) Time Distortion: Spacetime Time vs Absolute Time

**Goal:** Define "time in spacetime" as a geometric effect in the delay loop, not a relativistic postulate.

**Absolute clock:** Use the outer-binary Planck cadence as a reference cadence: $T_0 = 1/f_P$.

The cadence $T_0=1/f_P$ is a reference assembly cadence, not the absolute substrate time itself. Absolute time $t$ remains the uniform ordering parameter for causal-hit evaluation. The local clock diagnostic compares assembly cycle counts to this reference cadence:
$$
N_{\text{clock}}(\mathbf{x})
\equiv
\frac{d\tau}{dt}
=
\frac{T_0}{T_{\text{local}}(\mathbf{x})}
$$
in the rest branch of the local Noether-Sea cell. This quantity is the dynamics-side precursor of the effective lapse field used in the emergent-metric construction.

**Local clock from delay geometry:** Define a reference round-trip delay $\Delta t_{\text{rt,ref}}$ and a local delay $\Delta t_{\text{rt}}(\theta, G_{\text{grad}})$. Then
$$
\alpha(\theta, G_{\text{grad}}) = \frac{\Delta t_{\text{rt}}(\theta, G_{\text{grad}})}{\Delta t_{\text{rt,ref}}}
$$
and, for the ellipsoid-only case with no gradient,
$$
\alpha(\theta) = \frac{R(\theta)}{R_{\text{ref}}}
$$
measures how the local phase-closure period compares to the invariant clock:
$$
T_{\text{local}}(\theta) = T_0 \, \alpha(\theta, G_{\text{grad}}).
$$
When $\alpha > 1$, local cycles are longer relative to $T_0$; when $\alpha < 1$, they are shorter. This is the penultimate definition of time distortion in this model.

**Geometric source of distortion:** The causal envelope shape sets $\Delta t_{\text{rt}}$. As the tri-binary tilts out of planar and loses energy, the envelope becomes less oblate (larger $R_\parallel/R_\perp$), increasing some path lengths and stretching $T_{\text{local}}$; as it flattens, $R_\parallel$ shrinks and the corresponding delays contract. Gradients ($G_{\text{grad}}$) further skew delays across the orbit.

**Lorentz beta in geometric form:** In Lorentz kinematics, $\beta = v/c$ and $\gamma = 1/\sqrt{1-\beta^2}$. In this model, use $\beta = v_{\text{trans}}/c_f$ and the oblate ellipsoid relation
$$
R_\parallel = R_\perp \sqrt{1-\beta^2} = \frac{R_\perp}{\gamma}.
$$
Geometrically, $\beta$ is the axis-squash control: as $\beta \to 1$, the causal envelope collapses along the motion axis, shrinking longitudinal path lengths and altering the delay.

**Where it enters phase closure:** In scans, treat the local clock as an effective frequency $\omega_n/\alpha$ inside $\Phi_n$ for the sector under consideration. Redshift follows because emitted periodicity inherits the local clock rate: longer causal loops (larger $\alpha$) yield lower observed frequency at fixed absolute-time reference.

---

### Minimal Models

#### Noether Core Baseline (Inner + Middle Fixed)

**Focus:** Treat inner + middle as a formed Noether core with fixed (or slowly varying) center of mass. Track convergence of phase relations and extract $R_{\text{core}}$, $\omega_{\text{core}}$, and stable phase offsets. Check repeatability across nearby initial conditions and whether any core element rides $v = c_f$ continuously.

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
- **Prediction:** As alignment strengthens, $\theta_{ij}$ and $\theta_{\text{cone}}$ should decrease monotonically; the rotation test should transition from $4\pi$ to $2\pi$ return.
As alignment increases and planes coincide, the remaining degree of freedom is a single in-plane phase ($U(1)$-like), consistent with a boson-like terminal configuration.

#### Floquet and Grazing Diagnostics

Two nonlinear-dynamics diagnostics extend the standard alignment invariants and connect this chapter to the broader causal-closure program.

**Floquet basin-robustness gap:** For a periodic tri-binary state $\mathcal{S}_{\mathbf{k}}$ with integer winding $\mathbf{k}$ and period $T_{\mathbf{k}}$, linearize the delay system around the periodic orbit and compute the leading Floquet multipliers $\{\mu_i\}$ off the symmetry directions. Define
$$
\Delta_{\mathbf{k}} = 1 - \max_{i\notin G}\|\mu_i(\mathbf{k})\|.
$$
Track $\Delta_{\mathbf{k}}$ along scans in $\beta = v_{\text{trans}}/c_f$ and $G_{\text{grad}}$. Stable rungs have $\Delta_{\mathbf{k}}>0$; rung termination, separator clock-freeze, and gradient-driven failure should all coincide with $\Delta_{\mathbf{k}}\to 0^+$.

**Grazing-bifurcation diagnostics at the separator:** Near $\|\mathbf{v}\|=c_f$, the post-crossing trajectory deviation is predicted to scale as $\sqrt{t-t_*}$ along the eigenvector of the newly activated self-hit root. Two simulation tests follow:

- log-log fit of phase-deviation versus time-since-crossing, expected to yield slope $1/2$;
- parameter sweep across the separator looking for a period-adding cascade in the integer ledger, with each adding event respecting $\Delta N\in 2\mathbb{Z}$.

These diagnostics belong here as observational quantities for the dynamics chapter. Their proof burdens include Floquet-spectrum discreteness for state-dependent self-hit path-history delays and grazing-normal-form derivation.

---

### Metric and Connection Reconstruction Diagnostics

For comparison with the emergent-metric chapters, each dynamics scan should output the local Cartan data reconstructed from the Noether-core response:
$$
N(\mathbf{x},t),\qquad
u^i_{\text{sea}}(\mathbf{x},t),\qquad
e^a{}_i(\mathbf{x},t),
\qquad
\gamma_{ij}=\delta_{ab}e^a{}_i e^b{}_j.
$$
The effective bookkeeping line element is
$$
ds_{\rm eff}^2
=
-N^2c_0^2dt^2
+
\gamma_{ij}
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right).
$$
The corresponding connection diagnostic is the Levi-Civita connection of $g^{\rm eff}_{\mu\nu}$ in the GR-matching regime, with any torsion or nonmetricity treated as a deviation observable:
$$
\Gamma^\mu{}_{\nu\rho}
=
\frac12 g_{\rm eff}^{\mu\sigma}
\left(
\partial_\nu g^{\rm eff}_{\rho\sigma}
+
\partial_\rho g^{\rm eff}_{\nu\sigma}
-
\partial_\sigma g^{\rm eff}_{\nu\rho}
\right).
$$
Simulation output should therefore include geodesic residuals
$$
\mathcal{R}^\mu
=
\frac{d^2x^\mu}{d\lambda^2}
+
\Gamma^\mu{}_{\nu\rho}
\frac{dx^\nu}{d\lambda}
\frac{dx^\rho}{d\lambda},
$$
evaluated on coarse-grained assembly trajectories and photon planar-mode rays.

### Observables and Diagnostics (Summary)

- Core invariants: $R_{\text{core}}$, $\omega_{\text{core}}$, phase offsets.
- Ladder metrics: $R_{\text{out}}(t)$, $\omega_{\text{out}}(t)$, plateau stability.
- Geometry metrics: anisotropy ratio $A = R_\parallel/R_\perp$, forward vs backward delay ratio.
- Orientation metrics: inter-plane angles, precession cone angle.
- Stability metrics: sign of $\partial \Phi_n/\partial r$, phase-closure residuals.
- Gradient metric: $G_{\text{grad}}$ and its effect on stability thresholds.
- Cartan reconstruction metrics: lapse $N$, drift $u^i_{\text{sea}}$, spatial compliance $\gamma_{ij}$, frame fields $e^a{}_i$, effective connection $\Gamma^\mu{}_{\nu\rho}$, and geodesic residual $\mathcal{R}^\mu$.
- Weak-field matching metrics: Newtonian acceleration residual, redshift residual, Shapiro-delay residual, lensing residual, and extracted PPN coefficients $\gamma_{\rm PPN}$ and $\beta_{\rm PPN}$.

---

### Revision Triggers (Failure Modes)

1. **Core stability:** Unstable or non-repeatable invariants undermine outer-binary claims.
2. **Discrete rungs:** If plateaus do not exist or terminate, the top-rung thesis must be revised.
3. **High-velocity geometry:** If oblate geometry does not improve phase closure, the envelope model fails.
4. **High-gradient behavior:** If strong gradients erase alignment, record the boundary conditions and revise the alignment narrative.

---

### Equivalence Principle (Working Constraint)

The current framework should treat the equivalence principle as a closure constraint rather than as already-derived microphysics. The requirement is local: a uniformly accelerated assembly and a stationary assembly placed in a matched Noether-Sea gradient should exhibit the same local delay-geometry diagnostics to the order probed by observer-built clocks and rulers.

In current language, the comparison is:

- **Gravity case:** the surrounding Noether Sea carries a local gradient that skews the assembly's delay structure.
- **Acceleration case:** the assembly is externally driven, but the experienced delay pattern must reorganize so that the same local constitutive observables are recovered.

The important point is that the comparison cannot be made by deforming the assembly alone. The ambient medium must participate. Otherwise the framework would fail to explain why locally constructed observers infer equivalence between gravitational and inertial response.

The practical diagnostics are the same in both cases:

- phase-closure residuals,
- anisotropy ratios of the internal geometry,
- clock-rate shifts,
- stability thresholds for aligned and oblate states.

For resonance questions, one additional diagnostic is worth tracking explicitly: a cycle-averaged causal-work or phase-slip variance. The working intuition is that non-commensurate drift samples the large-$1/|J|$ region irregularly, producing large cycle-to-cycle swings in delayed work, whereas a true lock should compress that variance and make the return map locally contractive.

In connection language, the local equivalence-principle test is a first-jet matching condition. At a reference event $x_0$, compare the reconstructed Cartan data for an accelerated assembly in a homogeneous Noether-Sea cell with the data for a stationary assembly in a matched Noether-Sea gradient:
$$
\mathcal{J}_1(e,\omega)_{\rm accel}(x_0)
=
\mathcal{J}_1(e,\omega)_{\rm grad}(x_0)
+
O(L^2\nabla R_{\rm eff}),
$$
where $\mathcal{J}_1$ denotes the frame and connection through first order over a laboratory scale $L$. The residual is tidal: it depends on second gradients of the effective metric data and therefore cannot be removed by a local acceleration comparison.

If those quantities cannot be matched between the gradient-driven and acceleration-driven cases in the local limit, then the observer-level recovery of the equivalence principle fails and the constitutive map must be revised.

---

### Routed Extensions

The following items are retained here only as dynamics-facing boundary conditions. Their full proof burdens belong to the broader causal-closure program, not to this chapter.

#### Tri-Binary Role Hypotheses

An electrino:positrino binary is the most primitive assembly considered in the current architecture. Architrino assembly architecture posits that three binaries can become coupled into a Noether core, with each binary playing a distinct dynamical role.

Tri-binary minimality is a theorem target: the working claim is that three coupled binary layers are the minimal stable closure architecture capable of preserving inner memory, commensurability buffering, and boundary coupling under combined kinematic and gradient stress.

- **Inner binary** (MCB, CFT-exterior role): typically in/near self-hit branch ($v \gtrsim c_f$ by history), and would define fundamental units if MCB attractor is confirmed.
- **Middle binary** (CFT-exterior role): near the symmetry hinge ($v \approx c_f$) with variable radius/frequency; energy-storage fulcrum and coupling bridge.
- **Outer binary** (CFT-exterior role): typically $v < c_f$ with expansion/contraction modes; couples strongly to Noether-Sea gravitational/cosmological response.
At the holographic horizon, the three binaries are treated as a different regime where forward-sector components approach $c_f$ together; in interior AdS-like hypotheses, wake-closure can be described with combined $v_{\text{eff}} > c_f$ without requiring every component speed to exceed $c_f$.

The stronger claim that this architecture supplies the basis for rest mass, proper time, photon behavior, and standard-model particle families remains a theorem burden for the broader causal-closure program.

#### Hinge Equation Sketch

**Equation of motion near the hinge ($v \approx c_f$)** For each architrino $i$ interacting with its partner $j$:
$$
\ddot{\mathbf{x}}_i(t)=\mathbf{a}_{i,j}(t;\{t_{p,k}\})+H(s-1)\,\mathbf{a}_{i,i}(t;\{t_{s,m}\})+\mathbf{a}_{\text{ext}}(t),
$$
with delay constraints (causal roots):
$$
\|\mathbf{x}_j(t_{p,k})-\mathbf{x}_i(t)\|=c_f\,(t-t_{p,k}), \quad
\|\mathbf{x}_i(t_{s,m})-\mathbf{x}_i(t)\|=c_f\,(t-t_{s,m}),
$$
and $s=|\mathbf{v}|/c_f$. For symmetric, non-translating circular geometry, the delay angles satisfy
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
- outward release may later appear as jets, diffuse outflow, or dark-sector / dark-photon-like channels.

This chapter therefore keeps only the tri-binary regime map and leaves the ontology, recycling logic, and observer-facing strong-field interpretation to the canonical spacetime chapters.

In the tri-binary picture, each Noether core is a nested stack of three coupled binaries whose internal frequencies and radii are locked by self-hit geometry. This chapter uses that mechanism to define the local dynamics and diagnostics. The coarse-grained metric, observer-clock, and strong-field ontology belong to the spacetime chapters and the causal-closure proof synthesis.

For the strong-field continuation of that story, see [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md) and [Horizon Chirality](../../../../markdown/aaa/spacetime/horizon-chirality.md).

## Dyadic Resonance Lock

This document studies resonance lock for the nested Outer, Middle, and Inner binaries. The goal is to identify the relationship between frequency, tangential speed, and radius under a regime where the middle binary is pinned at the field speed and the three rings form an exact integer phase-locked cycle.

It should be read together with [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md), [Tri-Binary Dynamics](../../../../markdown/aaa/dynamics/tri-binary-dynamics.md), [Mapping the Planck Scale](../../../../markdown/aaa/theory-bridges/planck-scale-tri-binary-alignment.md), and [Noether Core](../../../../markdown/aaa/assemblies/noether-core.md), which provide the assembly geometry and scale-setting context for the lock relations derived here.

We work with branch labels $k\in\{O,M,I\}$.

### Status and Assumptions

The logic of this note is organized around one exact identity and four explicit assumptions.

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

This identity is exact. It is not an assumption.

#### Assumption 1 (Middle-Pinned Closure)

Outside the black-hole event horizon, and in the horizon-transition regime itself, the middle binary is pinned at the field speed:
$$
v_M=c_f,
\qquad
\beta_M=1.
$$

This is the main regime assumption of the document.

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

Among the admissible integer locks $(1:m:n)$, the physically selected lock is assumed to be the one that yields the strongest cycle-averaged cancellation of the relevant low-order far-field or effective potential signal.

This is a selection principle, not yet a theorem. Its role is to explain why one exact integer lock might be preferred over nearby commensurate alternatives.

#### Non-Assumptions

This document does **not** assume:

- common-speed closure $v_O=v_M=v_I$,
- self-similar radii $r_M=r_O/s$, $r_I=r_O/s^2$,
- or the specific frequency lock $1:2:4$ at the outset.

Those are possible special cases or later outcomes, not starting axioms here.

### Immediate Consequences

From Assumptions 1-2 and the exact identity, the middle radius is fixed by the outer frequency:
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

These are the core radius relations of the note:
$$
r_M=\frac{r_O}{m\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O.
$$

They show that once the integer lock $(1:m:n)$ is fixed, the remaining geometry depends on the outer and inner speed factors $\beta_O$ and $\beta_I$.

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
together with $\beta_M=1$, $f_M=m f_O$, and $f_I=n f_O$. $\square$

The geometry is controlled by integer phase closure plus the middle-pinned condition.

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

The motivation for Assumption 4 is that a cycle-closing integer lock can support persistent superposition over repeated outer periods. If the phase organization is favorable, the low-order far-field or potential contribution can cancel more effectively over one full return cycle.

In that sense, the selection principle is closer to a resonance-and-superposition argument than to a bare numerology of integer ratios. The intuition is that a physically preferred lock should make the assembly as stealthy or self-canceling as possible subject to the delayed dynamics.

This does not yet prove which pair $(m,n)$ wins. It states the criterion that the reduced model should test.

### Reduced-Theorem Target

The right theorem target is not "prove $1:2:4$ from kinematics alone." The stronger target is:

1. classify the admissible integer locks $(1:m:n)$ under exact delayed phase closure,
2. compute the corresponding radius relations under $\beta_M=1$,
3. define a cycle-averaged cancellation functional for the low-order field or effective potential,
4. and determine which integer lock minimizes that functional in the exterior/horizon regime.

If the minimizer turns out to be $(1,2,4)$, then the dyadic hierarchy would be a derived selection result rather than a starting assumption.

### Ancillary Symmetry Check

The older $\mathbb{Z}_3$ dipole-cancellation identity can still be kept as a separate symmetry test:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0.
$$

That identity may help characterize a radiative-stealth phase arrangement of an already-formed lock, but it should not be confused with the frequency-selection assumptions above.

For neighboring closure problems, see [Planar Bridge Closure](../../../../markdown/aaa/proof-programs/planar-bridge-closure.md) and [Horizon Chirality](../../../../markdown/aaa/spacetime/horizon-chirality.md).

## Causal Action Functional

This chapter develops the variational complement to the master-equation treatment of dynamics. Its job is to define a causal action functional that can compare delayed worldline structures, separate stable from unstable assembly classes, and turn emergent mass claims into a geometric quantity that can be evaluated, bounded, and tested.

The current scope is mixed. Some statements are theorem-backed in the regularized setting, while the larger closure program remains open. The chapter therefore begins with the problem statement and core functional definitions, then separates the controlled theorem spine from benchmarks, implementation notes, and longer-range closure targets.

### Problem Statement and Goal
The objective is to explain why only certain assemblies are stable and discrete, and to interpret emergent “mass” as a consequence of causal interaction structure: intrinsic self‑action of each worldline plus coupling to the ambient tri-binary sea (effective spacetime), rather than an externally assigned input. The target is a geometric/variational functional derived from the causal‑wake kernel that can be evaluated on periodic orbits, compared across topological classes, and tested against dynamical stability.
Canonical dynamics are defined in [The Master Equation (Canonical Form)](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form); this chapter provides the complementary action-functional lens.

### Core Functional Definitions
**Self‑action functional:**
$$
\mathcal{A}_{\text{self}}[\gamma] = \iint_{\gamma \times \gamma}
\frac{\delta\!\big(\|\mathbf{x}(t)-\mathbf{x}(t')\| - c_f|t-t'|\big)}
{\|\mathbf{x}(t)-\mathbf{x}(t')\|^2\,J_\gamma(t,t')}\,dt\,dt'
$$
We introduce a functional to replace ad‑hoc stability searches with a single quantity that can be compared across trajectories. The goal is to identify which worldlines are dynamically preferred and to connect that preference to discrete, reproducible particle‑like states.

This integrates over all pairs of points on a single worldline and counts only those pairs that are causally connected by a wake moving at speed $c_f$. The inverse-square factor weights nearby self‑hits more strongly than distant ones, while $J_\gamma^{-1}$ accounts for the geometric bunching or dilation of the delayed flux along the active branch.
Convention: this document uses the symmetric selector $|t-t'|$ in action integrals; the equivalent delayed form uses $(t-t')$ with an explicit $\Theta(t-t')$.
Here $J_\gamma(t,t')$ denotes the absolute delay-map Jacobian induced by the causal constraint, namely $J_\gamma(t,t')=\left|\partial_{t'}\big(\|\mathbf{x}(t)-\mathbf{x}(t')\|-c_f|t-t'|\big)\right|$.

**Interpretation:**
1. **Object:** The full worldline $\gamma$ is treated as a single geometric object.
2. **Constraint:** The delta function enforces the light‑cone condition, selecting causally connected pairs.
3. **Measure:** The inverse-square weight emphasizes close self‑hits over distant ones, while the Jacobian factor converts constant source emission into the correct received causal flux.

**Normalized (periodic) self‑action:**
$$
\bar{\mathcal{A}}_{\text{self}}[\gamma] =
\frac{1}{T^2}\int_0^T\!\int_0^T
\frac{\delta_\eta\!\big(r(t,t')-c_f|t-t'|\big)}{r(t,t')^2\,J_\gamma(t,t')}\,dt\,dt'
$$
with $r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|$ and $\delta_\eta$ a mollified delta.
This version is defined for periodic orbits. The $T^2$ normalization makes values comparable across different periods, while $\delta_\eta$ regularizes the causal constraint for numerical evaluation.
Dimensional check: $[\bar{\mathcal{A}}_{\text{self}}]=1/\text{Length}^2$ (inverse area), consistent with a surface‑density measure over causal intersections.

**Total action (multi‑assembly):**
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
This aggregates self‑terms and cross‑terms between components, with the $\frac{1}{2}\sum_{i\ne j}$ convention ensuring unordered pairs are counted once.

**Definitions:** $r(t,t')=\|\mathbf{x}(t)-\mathbf{x}(t')\|$, $r_{ij}(t,t')=\|\mathbf{x}_i(t)-\mathbf{x}_j(t')\|$, $\Delta t = t-t'$, and $J_{ij}(t,t')=\left|\partial_{t'}\big(r_{ij}(t,t')-c_f|t-t'|\big)\right|$ is the branch Jacobian induced by the delayed causal constraint.

**Kernel comparison:**
$$
\text{Force kernel: } \left[ \frac{\hat{\mathbf{r}}(t,t')}{r^2\,J}, \delta\!\big(r-c_f\Delta t\big) \right]
\qquad
\text{Action kernel: } \left[ \frac{1}{r^2\,J}, \delta\!\big(r-c_f\Delta t\big) \right]
$$
The force kernel retains direction via $\hat{\mathbf{r}}$, while the action kernel keeps only the scalar magnitude. This is the minimal change that turns a vector interaction into a scalar functional suitable for variational comparisons while preserving the same causal Jacobian geometry as the master equation.

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

For a $T$-periodic $C^2$ trajectory $\mathbf{x}(t)$ with no collisions on the sampled
domain ($r(t,t')\ge r_{\min}>0$ and $J_\gamma(t,t')\ge J_{\min}>0$ on support of $\phi_\eta$), define
$$
\bar{\mathcal{A}}_{\text{self},\eta}[\gamma]
=\frac{1}{T^2}\int_0^T\!\!\int_0^T
\frac{\phi_\eta(F_\gamma(t,t'))}{r(t,t')^2\,J_\gamma(t,t')}\,dt\,dt'.
$$

This is the primary object for proofs and numerics. The unregularized
$\eta\to0^+$ limit is treated only after bounds are established.

### Axioms and Admissibility Assumptions

We use the following minimal assumption set for theorem-level statements:

- **(A1) Regularity:** $\mathbf{x}\in C^2(\mathbb{R};\mathbb{R}^3)$ and is $T$-periodic.
- **(A2) Finite-speed causality:** The causal selector is $F_\gamma(t,t')=0$ with field speed $c_f>0$.
- **(A3) Collision exclusion on support:** $r(t,t')\ge r_{\min}>0$ whenever $\phi_\eta(F_\gamma(t,t'))\neq0$.
- **(A3b) Jacobian nondegeneracy on support:** $J_\gamma(t,t')\ge J_{\min}>0$ whenever $\phi_\eta(F_\gamma(t,t'))\neq0$.
- **(A4) Transversality (generic branch):** $\nabla F_\gamma\neq0$ along the selected causal set.
- **(A5) Fixed topological class:** Deformations are taken inside one homotopy class on $T^2$ unless a bifurcation condition is crossed.
- **(A6) Isolated system bookkeeping:** When connecting to dynamics, energy/momentum use the same $\eta$ and history window conventions as the master-equation diagnostics.

These assumptions are deliberately local and testable. If any assumption fails, the
corresponding theorem is not claimed.

### Rationale for the Functional
- **Natural Lyapunov/action‑like candidate:** If certain motion classes monotonically reduce a single functional, that quantity can label attractors and discrete minima that look like “mass levels” or particle configurations.
- **Bridge to geometric analysis / knot theory:** Showing that simple periodic motions (e.g., maximum‑curvature self‑hit orbits) locally minimize $\mathcal{A}_{\text{self}}$ within a topological class would give a clean geometric explanation for why some orbits are preferred over nearby perturbations.
- **Simulation‑friendly statistic:** Given any numerically computed orbit, we can Monte‑Carlo sample $(t,t')$, test the causal condition, and estimate $\mathcal{A}_{\text{self}}[\gamma]$ to compare shapes. This makes the “stable = local minimum” heuristic empirically testable.
- **Kolmogorov‑style appeal:** The functional is built directly from the microscopic law, convertible to empirical statistics, and a candidate for invariant measures that could explain attractor selection.

### Geometric/Topological Framework
**Causal locus on the torus:** For a periodic orbit the domain $(t,t')\in[0,T]^2$ is a torus. The causal locus
$$
\mathcal{L}_{\text{causal}} = \{(t,t')\in T^2 \mid \|\mathbf{x}(t)-\mathbf{x}(t')\| = c_f|t-t'|\}
$$
is the set of self‑hits. Its winding numbers $(p,q)$ on $T^2$ are **discrete labels** for orbit families. As $R$ or $v$ change, the locus undergoes reconnection events; these are the bifurcations where families appear or disappear, giving a natural quantization of admissible self‑hit patterns. Sub‑$c_f$ motion leaves $\mathcal{L}_{\text{causal}}$ empty; super‑$c_f$ creates branches whose closure determines the integer self‑hit count per period.
The self‑action integral is the **weighted arc length** of $\mathcal{L}_{\text{causal}}$ with weight $1/(r^2 J_\gamma)$, so topology and metric weight enter together.

**Causal writhe (chirality):**
$$
Wr_c[\gamma] = \iint_{\mathcal{L}_{\text{causal}}} \text{sign}\!\big(\mathbf{v}(t)\times\mathbf{v}(t')\cdot\mathbf{r}\big)\,d\tau
$$
is a signed measure of handedness for the self‑interaction pattern. Nonzero $Wr_c$ ties intrinsic chirality/spin to the geometry of the wake rather than an imposed quantum number; changing $Wr_c$ requires tearing the causal locus.

**Topological vs Noether data:** Continuous symmetries (time shifts, rotations) identify Noether-charge targets: energy from time-translation symmetry and total angular momentum from rotational symmetry. In the symmetry-preserving delayed action these become conserved history functionals. The winding class of $\mathcal{L}_{\text{causal}}$ supplies **topological charges**. Stable “generations” live where a Noether-stationary orbit is also topologically locked; dissociation would require changing the winding class, i.e., a reconnection of $\mathcal{L}_{\text{causal}}$.

**Multi‑component topology:** For assemblies, project the spatial trajectories over one period, classify the resulting link, and when hyperbolic, use the volume of the link complement as a complexity measure. Brunnian or highly knotted complements signal strong causal interlocking and higher action density.

### Theorem Spine (Provable Core under A1-A5)

In this section we also assume the standard mollifier properties:
$\phi_\eta\in C_c^\infty(\mathbb{R})$, $\phi_\eta\ge0$, $\int_{\mathbb{R}}\phi_\eta(s)\,ds=1$, and $\phi_\eta\to\delta$ weakly as $\eta\to0^+$.

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
- Stable periodic orbits are **critical points** of $\bar{\mathcal{A}}_{\text{total}}$ constrained within a winding class. The delay flow need not be a gradient flow of this functional, so extremality is a selection principle, not a proof of asymptotic stability.
- **Existence vs. stability:** Topology of $\mathcal{L}_{\text{causal}}$ dictates which families can exist (via bifurcations when branches reconnect). Linear spectra of the delay equation decide which of those families attract. The causal locus is the combinatorial skeleton; Lyapunov exponents tell who survives.
- **Discreteness:** Each winding class gives an integer self‑hit count; moving between classes requires a reconnection event, explaining mass gaps and “generations” without adding quantization by hand.
- **Conservation with memory:** In the symmetry-preserving delayed action, time-translation and rotational symmetry imply conserved total energy and total angular momentum as history functionals. In regularized working models, these same quantities become validation diagnostics. Energy includes the history contribution stored in active causal wakes.
- **Gradient vs. symplectic:** The master equation is conservative; critical points of $\bar{\mathcal{A}}$ correspond to KAM‑style islands, not sinks. If any dissipation couples to the Noether Sea, minima could become attractors, but absent that, stability means orbital persistence, not asymptotic convergence.

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
and map it to an effective metric
$$
g_{\mu\nu}dx^\mu dx^\nu = -\alpha^2(\mathcal{I})\,c_f^2 dt^2 + \beta^2(\mathcal{I})\,\delta_{ij}dx^i dx^j,
$$
with small couplings $\alpha=1+\lambda_t\mathcal{I}$, $\beta=1+\lambda_s\mathcal{I}$ in the weak field. Bianchi identities and weak‑equivalence demands constrain the admissible $\lambda_{t,s}$; otherwise the emergent geometry reduces to a scalar‑tensor theory with potentially observable fifth forces. Matching the long‑range limit of test‑assembly motion to geodesics in $g_{\mu\nu}[\mathcal{I}]$ is the consistency check linking microscopic causal hits to macroscopic curvature.
Here, "fifth force" means an additional long-range interaction mediated by the scalar sector encoded in $\mathcal{I}$ (or equivalently in $\alpha,\beta$), on top of the usual spin-2 metric response. If that scalar coupling is not sufficiently constrained, test assemblies can acquire composition-dependent accelerations, producing weak-equivalence-principle violations and post-Newtonian deviations that are tightly bounded experimentally.
Numerical check: evolve two assemblies with different internal $\bar{\mathcal{A}}_{\text{total}}$ through the same prescribed $\mathcal{I}(t,\mathbf{x})$ background and verify their centers follow the same geodesic to numerical tolerance.
Mean‑field view: in a dilute limit with many architrinos, coarse‑graining the hit process should yield a Vlasov equation for $f(t,\mathbf{x},\mathbf{v})$ with force derived from $\mathcal{I}$, providing the statistical bridge to continuum geometry.

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
- **Rest mass is not just self-action:** $\mathcal{A}_{\text{self}}$ needs careful units; true rest energy also depends on partner interactions, Noether-Sea coupling, and external wakes.
- **Minima ≠ stability without dynamics:** Stability depends on the full DDE flow; the functional must be windowed/normalized (e.g., one period) to avoid divergences and to compare orbits meaningfully.
- **Topology needs precision:** Time is monotone; periodic motion yields a spatially closed path but a helical spacetime curve. Be explicit about which projection/linking notion defines the “topological class.”
- **Cohomology language is aspirational:** A cochain complex over the moduli of periodic orbits is not yet constructed; treat “cohomology of causal interaction” as a research direction, not a result.

### Closure Extension: Spin Bundle and Confinement Energy Law

To complete the topological closure program, add two theorem targets on top of the existing causal-locus spine.

#### (T5.1) Spinor lift target

Construct a framed configuration bundle for tri-binary ordered axes and prove that physical orientation transport lifts through
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
Combined with causal-locus class constraints, this gives a quantitative separation between confined open sectors and screened singlet sectors.

#### Integration map

- causal-locus topology and bifurcation class invariants: **this chapter**
- color-algebra and singlet braid structure: [assemblies/fermions/color-charge-su3.md](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md)
- gauge-covariant effective layer and failure criteria: [interactions/gauge-symmetries.md](../../../../markdown/aaa/interactions/gauge-symmetries.md)

### Summary and Status
- We defined a causal self-action and total-action functional directly from the Jacobian-weighted inverse-square delayed kernel, plus its normalized form for periodic orbits.
- Topology of the causal locus $\mathcal{L}_{\text{causal}}\subset T^2$ supplies discrete labels (winding, writhe, link type) that naturally segment orbit families.
- The circular-orbit benchmark gives an analytic threshold at $\beta=1$, explicit branchwise Jacobians, and controlled near-threshold asymptotics, anchoring numerical calibrations.
- Under explicit assumptions (A1-A5), we now have a compact theorem spine:
  finiteness, coarea reduction, topological invariance away from critical points,
  and a precise bifurcation condition for branch changes.
- An emergent-metric ansatz from coarse-grained hit density $\mathcal{I}$ is proposed but must satisfy weak-field and equivalence constraints; this remains conjectural.
- Overall: the geometric quantization mechanism is now partly formalized (theorem-level
  in the regularized regime), while mass mapping, asymptotic stability, and emergent
  metric closure remain open.

## Effective Lagrangian

This document formalizes the variational foundation of the Architrino Assembly Architecture. It bridges the exact, path-history-dependent microdynamics of discrete architrinos with the coarse-grained, effective field theories that govern macroscopic assembly behavior in the Noether Sea.

#### Regularized Nonlocal Action and Variation

The Master Equation of motion for architrinos is non-Markovian, driven by the intersection of trajectories with past causal wake surfaces. Consequently, the fundamental action principle cannot be a local integral over instantaneous states. It must be a multi-time functional that evaluates the entire path history.

For a finite, isolated set of architrinos parameterized by absolute time $t$ in the Euclidean void, use the $\eta>0$ regularized delayed action (the exact kernel is recovered as $\eta\to0^+$).

$$
S_\eta[\{\mathbf{x}_i\}]
=
\int dt \sum_i \frac{1}{2} \mu_{\text{arch}} |\dot{\mathbf{x}}_i(t)|^2
- \frac{1}{2}\sum_{i,j}\frac{\kappa \, \sigma_{ij} |q_i q_j|}{c_f}
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

where:
*   $\mathbf{x}_i(t)$ is the trajectory of architrino $i$.
*   $\mu_{\text{arch}}$ is the universal force/energy bookkeeping constant, not a particle-specific inertial mass.
*   $r_{ij}(t; t_0)$ is the Euclidean separation between reception and emission events.
*   $\delta_\eta$ is a mollified delta function of width $\eta > 0$, regularizing the causal wake surface to ensure a Lipschitz-continuous vector field.
*   $\sigma_{ij} = \mathrm{sign}(q_i q_j)$ enforces attraction for opposite polarities and repulsion for like polarities.

##### Regularization and Admissibility Assumptions

The derivation below is valid under:

- **(EL1)** $\mathbf{x}_i\in C^2([t_a,t_b];\mathbb{R}^3)$ and variations $\boldsymbol{\xi}_i$ are $C^1$ with $\boldsymbol{\xi}_i(t_a)=\boldsymbol{\xi}_i(t_b)=0$.
- **(EL2)** $\phi_\eta\in C_c^1(\mathbb{R})$, $\phi_\eta\ge0$, $\int\phi_\eta(s)\,ds=1$.
- **(EL3)** Collision exclusion on active support: $r_{ij}(t;t_0)\ge r_{\min}>0$ whenever $\phi_\eta(g_{ij}(t,t_0))\neq0$.
- **(EL4)** Delay-root transversality on active branches: $\partial_{t_0}g_{ij}(t,t_0)\neq0$ when $g_{ij}(t,t_0)=0$.
- **(EL5)** Integrability on the chosen history window (finite window or decay) so differentiation under the time integrals is justified.
- **(EL6)** Delayed branch convention: only $t_0\le t$ contributes (equivalently, the $\Theta(t-t_0)$ branch of the causal selector).

##### Kernel Variation and Branch Reduction

Set $\mathbf{x}_i^\varepsilon=\mathbf{x}_i+\varepsilon\boldsymbol{\xi}_i$ and differentiate at $\varepsilon=0$.

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

This receiver-side gradient is one ingredient in the full first variation, but it is not the whole story: in the double-time action each varied worldline appears both as a receiver coordinate $\mathbf{x}_i(t)$ and as a source coordinate inside transposed kernels. The full branch-resolved variation is carried out in [master-equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-nonlocal-lagrangian). The result is the exact delayed force law
$$
\mu_{\text{arch}}\ddot{\mathbf{x}}_i(t)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\sum_{\tau\in\mathcal{C}_{ij}(t)}
\frac{\hat{\mathbf{r}}_{ij}(t;\tau)}
{r_{ij}(t;\tau)^2\,\left|1-\hat{\mathbf{r}}_{ij}(t;\tau)\cdot\mathbf{v}_j(\tau)/c_f\right|},
$$
including self-hit branches $j=i$ when the trivial coincidence root is excluded.

Equivalently, in the regularized integral form one may write
$$
\mu_{\text{arch}}\ddot{\mathbf{x}}_i(t)
=
\sum_j \kappa \, \sigma_{ij}|q_i q_j|
\int_{-\infty}^{t}dt_0\,
\frac{\hat{\mathbf{r}}_{ij}(t;t_0)}{r_{ij}(t;t_0)^2}\,
\phi_\eta\!\big(g_{ij}(t,t_0)\big),
$$
with the understanding that $\phi_\eta$ converges weakly to the causal selector on simple branches as $\eta\to0^+$. This is the regularized form consistent with the branch law above; the derivative term in $\nabla_{\mathbf{x}_i}\mathcal{K}_{ij}$ is absorbed only after the full delayed variation is assembled and the branch reduction is performed.

#### Symmetries and History-Aware Conservation Laws

The regularized action $S_\eta$ is invariant under the fundamental symmetry group of the substrate: the Euclidean group $E(3)$ and absolute time translations $\mathbb{R}_{\text{time}}$; the exact statement is recovered in the $\eta\to0^+$ limit.

Because the Lagrangian is nonlocal in time, the corresponding Noether charges are path-history functionals tracking "in-flight" interactions encoded in the causal wakes.

**Energy Functional:**
Invariance under absolute time translation yields a conserved total energy
$$
E_{\text{tot}}(t)=K(t)+E_{\text{wake}}(t),
$$
where the exact nonlocal Noether charge can be written as in [master-equation](../../../../markdown/aaa/dynamics/master-equation.md#exact-wake-energy-functional-at-time-boundary-t):

$$
E_{\text{wake}}(t)
=
\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{t} dt_0
\int_{t}^{\infty} dt_1\,
\partial_{t_1}\mathcal{K}_{ij}(t_1,t_0).
$$

For trajectory reconstruction one may equivalently use the work-integral form
$$
U(t)=U_\ast-\int_{t_\ast}^{t}\sum_i \mu_{\text{arch}}\,\mathbf{a}_i(t')\cdot\mathbf{v}_i(t')\,dt',
$$
which differs from $E_{\text{wake}}(t)$ at most by a reference constant and boundary convention.

**Generalized Momentum:**
Spatial translation invariance guarantees the conservation of total momentum, $\mathbf{P}_{\text{tot}} = \mathbf{P}_{\text{mech}}(t) + \mathbf{P}_{\text{wake}}(t)$, where the mechanical momentum of the architrinos is balanced by the momentum flux propagating within the causal wake surfaces. Boundedness of the history-aware energy is therefore the natural diagnostic against runaway behavior, not a separate postulate.

#### Coarse-Graining: The Effective Continuum Lagrangian

To describe the emergent dynamics of the Noether Sea and complex matter assemblies, we transition from discrete trajectories to continuum densities. We define a coarse-grained architrino charge density $\rho(\mathbf{x}, t)$ and current density $\mathbf{j}(\mathbf{x}, t)$, smoothed over a scale much larger than the tri-binary radius but smaller than macroscopic gradients.

At the level of a branch-collapsed delayed causal action, the exact multi-time interaction double sum suggests the continuum delayed functional

$$
S_{\text{int}}^{\text{cg}} = - \frac{\kappa}{2c_f} \int dt \int d^3x \int d^3x' \,
\frac{\rho(\mathbf{x}, t) \rho(\mathbf{x}', t - \|\mathbf{x}-\mathbf{x}'\|/c_f)}
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
\frac{\mathbf{j}(\mathbf{x}',t')}{\rho(\mathbf{x}',t')}
\qquad (\rho\neq 0),
$$
and effective Jacobian
$$
J_{\mathrm{eff}}(\mathbf{x},t;\mathbf{x}',t')
=
\left|1-\frac{\mathbf{u}(\mathbf{x}',t')\cdot\hat{\mathbf{n}}(\mathbf{x},\mathbf{x}')}{c_f}\right|.
$$
This is the continuum inheritance of the discrete delayed causal $1/r$ action kernel together with the same Jacobian branch weight that appears in the master equation. Source emission remains isotropic at the microscopic level, but the received coarse flux is compressed or dilated by the delayed transport geometry. Differentiating this delayed action with respect to receiver coordinates produces the corresponding Jacobian-weighted inverse-square force density plus velocity-dependent correction terms. In the quasi-static limit $\|\mathbf{u}\|/c_f\to0$, one recovers $J_{\mathrm{eff}}\to 1$ and the leading force law reduces to the familiar inverse-square form.

By defining an effective scalar potential $\Phi(\mathbf{x}, t)$ and a vector flow potential $\mathbf{A}(\mathbf{x}, t)$ that track the integrated causal wakes of the continuous medium, the system maps locally onto an effective field theory. These potentials are bookkeeping fields for delayed transport, not additional ontological primitives. The resulting local Lagrangian density $\mathcal{L}_{\text{eff}}$ therefore belongs to a further closure step beyond the exact delayed causal action.

#### Topological Constraints and Assembly Stability

The effective Lagrangian restricts the allowed topological configurations of the architrino medium. Stable assemblies—such as the nested maximal-curvature orbits of tri-binaries—manifest as localized, phase-locked topological defects (vortices or knots) within the continuous flow fields.

The stability of these assemblies is governed by the nonlinear self-hit feedback embedded in the interaction functional. When the internal circulation velocities exceed $c_f$, the resulting non-Markovian repulsion establishes a robust geometric attractor, providing a mass gap and fixing the spatial extent of the assembly. The effective Lagrangian thus isolates the discrete parameter space (e.g., $e/6$ polar site decorations) where these geometric attractors minimize the time-averaged path-history action.

#### Closure Interface: Action-to-Envelope Reduction

This chapter supplies the variational bridge used by the quantum closure chain.

From the regularized nonlocal action, derive a continuum effective action in terms of coarse fields $(\rho,\mathbf{j})$, then test a phase-amplitude closure ansatz of the form
$$
\rho=|\psi|^2,\qquad
\mathbf{j}=\frac{\hbar_{\mathrm{eff}}}{m}\Im(\psi^*\nabla\psi)+\mathbf{j}_{\mathrm{mem}}.
$$

Closure requirement for this interface:
- the Euler-Lagrange equations of the coarse action reproduce the effective envelope equation used in [pilot-wave-character](../../../../markdown/aaa/theory-bridges/pilot-wave-character.md),
- memory contributions $\mathbf{j}_{\mathrm{mem}}$ remain explicit as controlled correction terms rather than hidden parameter absorbs.
