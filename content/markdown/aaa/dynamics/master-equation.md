# Master Equation of Motion

This chapter is the canonical statement of the delayed dynamical law used throughout the dynamics branch. It defines what counts as a causal hit, how the receiver-local force law is assembled from path history, and which exact or regularized structures are firm enough to support later work on binaries, tri-binaries, effective geometry, and quantum closure.

The chapter is long because it plays several roles at once: foundational law, theorem spine, analytic benchmark source, and numerical reference. The opening establishes the causal geometry and canonical equation; later sections develop DDE form, self-hit structure, analytic regimes, and the energy-symmetry-conservation interface.

## Foundations and Causal Geometry

### Purpose and Scope

This document presents the **Master Equation of Motion (EOM)** governing the lawful evolution of all architrinos in the Euclidean void + absolute time substrate. This is the **fundamental dynamical law** of the Architrino Theory, from which all emergent phenomena (particles, fields, spacetime, quantum behavior, gravity) ultimately derive.

The Master EOM is:

- **Deterministic**: Given complete initial conditions at $t_0$, the future is determined, with **deterministic multistability** at threshold regimes.
- **Non-Markovian**: Depends on full path history, not just instantaneous state.
- **Event-local at the receiver**: Only delayed causal intersections at the receiver event contribute to acceleration (no action-at-a-distance).
- **Causal**: All influences propagate at finite field speed $c_f$.
- **Self-consistent**: Includes self-interaction (self-hit) when $v > c_f$ at past emission times.

### Overview and Key Principle

#### The Central Idea

**Fundamental Principle:**

> *Potential at all other points in time and space is irrelevant.*

At time $t$, the acceleration of architrino $i$ at position $\mathbf{x}_i(t)$ depends **only** on causal wake surfaces that **intersect its current location**. 

- **Not relevant**: Potential at other spatial locations $\mathbf{x} \neq \mathbf{x}_i(t)$
- **Not relevant**: Potential at other times $t' \neq t$ (except as encoded in the causal history that arrives "now")
- **Only relevant**: The **intersection events** (causal hits) where $\mathbf{x}_i(t)$ coincides with an expanding wake surface from some source at some past emission time $t_0 < t$

This is an **event-local delayed interaction rule**: the acceleration is evaluated at the receiver event, but depends on path history through the delayed causal roots.

In the absence of any causal hits, an architrino follows inertial motion: straight-line, constant-velocity trajectories in the fixed Euclidean background.

Operationally, the expanding causal wake is also the theory's minimal bridge between time and space. Absolute time orders emissions, Euclidean distance sets the propagation delay, and the receiver event is where those two inputs are rejoined into one physical interaction. The wake law is therefore not just a force prescription; it is the mechanism that turns temporal ordering plus spatial separation into concrete dynamics.

#### Abstract Form

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

#### Path-History Sum and Integral Representation

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

---

#### Regularized Evaluation of the Exact Energy Charge

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

### Causal Interaction Set (The Geometry of Delay)

#### Definition of Causal Emission Times

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

#### Causal-Time Map and Root Topology

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

#### Delay-Map Theorem Pack (Formalized)

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

#### Single-Hit Regime (Unique $t_0$)

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

#### Multi-Hit Regime (Multiple $t_0$)

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

#### Self-Hit (Source = Receiver, $j = i$)

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

#### Geometric Interpretation

**Visualize the causal constraint as:**

- Receiver at $\mathbf{x}_i(t)$ "now"
- Source worldline $\{\mathbf{x}_j(t'): t' < t\}$ in the past
 - Field-speed causal wake surface: the expanding isochron at radius $c_f(t - t_0)$ centered at $\mathbf{x}_j(t_0)$
 - **Causal emission times**: where this wake surface **intersects** the receiver's current location

For each $t_0 \in \mathcal{C}_{ij}(t)$, draw a line from $\mathbf{x}_j(t_0)$ to $\mathbf{x}_i(t)$; this is the **line of action** $\hat{\mathbf{r}}_{ij}$ for the force.

This geometry should be read in terms of the source worldline, the expanding causal isochrons centered on past emission points, and the receiver event at which one or more of those isochrons are intersected.

#### Reduced Lorentz-Suppression Derivation from Delay Geometry

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

---

## Master Equation and DDE Formulation

### The Master Equation (Canonical Form)

#### Per-Hit Acceleration

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

**Implication for emergent forces**: All "magnetic" or velocity-dependent forces (e.g., Lorentz force $\mathbf{v} \times \mathbf{B}$) must arise from **delay geometry**, **Jacobian-modulated flux**, and **superposition of radial hits**, not from intrinsic cross-product terms in the fundamental law. This places the burden of magnetic-field emergence on the assembly structure, Noether Sea dynamics, and the finite-speed causal geometry itself.

#### Total Acceleration (Sum Over All Causal Hits)

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

#### Conventions and Exclusions

**Heaviside Convention ($H(0) = 0$):**

The emission at $t_0 = t$ (instantaneous self-force) is **excluded**. Formally, this is enforced by writing:

$$
\mathcal{C}_{ij}(t) = \Big\{ t_0 < t \;\Big|\; \|\mathbf{x}_i(t) - \mathbf{x}_j(t_0)\| = c_f(t - t_0) \Big\}.
$$

(Strict inequality $t_0 < t$; no $t_0 = t$ allowed.)

**Physical justification:** The causal wake surface at the instant of emission ($r = 0$, $\tau = 0$) has not yet expanded; it cannot exert a force on the emitter "now." Under symmetric regularization (mollification), the $r \to 0$ limit yields zero net push.

**No $r = 0$ causal roots beyond $\tau = 0$:**

Because $r = c_f(t - t_0)$, $r = 0$ implies $\tau = t - t_0 = 0$. This case is excluded by $H(0) = 0$. There are no "collision singularities" in the causal set (architrinos can pass through each other; forces are mediated by expanding wake surfaces, not by contact).

#### Superposition Principle

The Master EOM is **linear in sources**:

$$
\mathbf{F}_{\text{total}} = \sum_j \mathbf{F}_j.
$$

Potentials from distinct sources **superpose** without mutual interference. The total potential at any location is the linear sum of all individual contributions.

**Consequence:** The problem of $N$ interacting architrinos reduces to solving $N$ coupled delay differential equations (DDEs), one per architrino, with each depending on the full history of all others.

---

### Terms and Conventions (Detailed Breakdown)

#### Direction and Sign

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

#### Scaling and Normalization

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

#### Receiver Kinematics (Radial vs Orthogonal Components)

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

**Lorentz-suppression closure requirement:** The receiver kinematics described here must mechanically produce Lorentz-like contraction for moving assemblies. If tri-binaries do not contract along the direction of motion when coupled to the Noether Sea, the closure program fails. The intended leakage scale is below current preferred-frame bounds.

#### Work and Power

The **instantaneous power** (rate of kinetic energy change) from a single hit is:

$$
\frac{dE_k}{dt}\Big|_{\text{hit}} = \mathbf{F}_{ij} \cdot \mathbf{v}_i = \big(\mu_{\text{arch}} \mathbf{a}_{ij} \cdot \hat{\mathbf{r}}_{ij}\big) v_r = \mu_{\text{arch}}\,\kappa \, \sigma_{ij} \, \frac{|q_i q_j|}{r_{ij}^2\,\left|J_{ij}(t;t_0)\right|} \, v_r.
$$

**Key insight:** There is **no instantaneous work** on the orthogonal component. Power depends only on the radial velocity $v_r$.

**Radial motion and the $1/r^2$ factor (local trend):**

- **Inward motion** ($v_r < 0$, receiver moving toward the emission point): decreases $r_{ij}$ between close successive hits, tending to **increase** subsequent per-hit strengths via $1/r^2$ (all else equal).
- **Outward motion** ($v_r > 0$): increases $r_{ij}$, tending to **decrease** subsequent per-hit strengths.

**Important caveat:** Path-history delay shifts both the causal root $t_0$ and $\hat{\mathbf{r}}_{ij}$ over finite intervals, so these are strictly **local** statements about infinitesimal time evolution. The global trajectory depends on the full history of all sources.

#### Moving-Source Geometry and Received Flux

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

### Delay Differential Equation (DDE) Formulation

#### State Vector and Evolution

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

#### Causal Functional Form

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

#### Regularization (Mollified Shells, Finite $\eta$)

The ideal model uses **surface-delta causal isochrons**, which yield **impulsive forces** at isolated hit times $t_0 \in \mathcal{C}_{ij}(t)$. One may treat the dynamics as a **measure-driven ODE** in $t$ (with velocity of bounded variation), or regularize by replacing the surface delta with a narrow wake surface of thickness $\eta > 0$:

$$
\delta(r - \tau) \longrightarrow \delta_\eta(r - \tau) = \frac{1}{\sqrt{2\pi}\,\eta} \exp\!\Big(-\frac{(r - \tau)^2}{2\eta^2}\Big),
$$

while preserving total emission $q$.

**Effect:** This produces **continuous-in-time forces** and classical $C^1$ solutions for $\mathbf{x}_i(t)$ given $C^1$ initial data.

**In the super-field-speed regime** ($|\mathbf{v}_a| > c_f$), multiple self-roots can occur; summing over all causal times with an integrable regularization ensures finite total impulse.

**Convergence requirement:** As $\eta \to 0$, numerical solutions must converge to a well-defined limit. 

#### Conditional Well-Posedness for the Regularized Exact Model

To make the existence/uniqueness claim precise for the finite-$\eta$ regularization used in this chapter, we formalize the dynamics as a state-dependent delay system in first-order form:
$$
\dot{\mathbf{Y}}(t)=\mathcal{G}(\mathbf{Y}_t),\qquad
\mathbf{Y}_t(\theta)=\mathbf{Y}(t+\theta),\ \theta\in[-h,0],
$$
with phase space $\mathcal{H}=C^1([-h,0],\mathbb{R}^{6N})$.

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
then $t_{\max}=\infty$.
Here $r_{ij,\ell}(t)$ denotes the source-receiver distance on branch $\ell$.

**Proof.**

1. By (W3), each active delay branch is simple; the Implicit Function Theorem gives $\tau_{ij,\ell}(\phi)\in C^1$ on a neighborhood of $\phi^0$.
2. Each per-branch acceleration term is a composition of $C^1$ maps (evaluation, subtraction, norm, mollifier, and unit-direction projection). By (W4), denominators stay away from zero; by (W5), coefficients are bounded. Hence each branch term is locally Lipschitz in $\phi$.
3. By (W2), only finitely many branches contribute, so their sum $\mathcal{G}$ is locally Lipschitz on an open subset of $\mathcal{H}$ where (W3)-(W4) hold.
4. Standard state-dependent DDE existence/uniqueness theory on Banach spaces applies, yielding a unique local $C^1$ solution and a maximal extension.
5. Continuation follows from the same theorem: finite-time breakdown can occur only by leaving every bounded subset of the admissible set, i.e. via unbounded speed, vanishing separation on active support, or transversality loss/root accumulation.

Therefore the regularized delayed dynamics are locally well-posed, with global existence whenever those failure modes are excluded. This conditional statement applies to the finite-$\eta$ regularized model; the ideal $\eta\to 0$ shell limit still requires separate control of root accumulation and Jacobian-degenerate branches. $\square$

## Operational Principles, Self-Interaction, and Examples

### Core Principles (Operational Summary)

#### Superposition

**Statement:** The potential fields from all sources **superpose linearly**. The net potential at any point is the sum of the individual potentials:

$$
\Phi_{\text{net}}(\mathbf{x}, t) = \sum_{i} \Phi_i(\mathbf{x}, t).
$$

The total acceleration on a particle at any instant is the **vector sum** of the contributions from every causal entry in its path history.

**Operational implication:** Every architrino is continuously immersed in the superposed wakes of all others (and, when kinematics permit, its own). Tractability comes from treating each causal emission independently with $1/r^2$ distance weighting, which makes **local sources dominate** (distant contributions dilute over large causal surfaces and largely cancel).

#### Velocity Dependence

**Statement:** The dynamics are **delayed** and **radial in direction**. Because the source moves while emitting, both the emitted wake pattern and the received force are velocity dependent through causal geometry. The received force magnitude is modulated by the causal Jacobian $\left|J_{ij}\right|^{-1}$, while the receiver's speed affects the **work rate** and branch sampling via $\mathbf{F} \cdot \mathbf{v} = |\mathbf{F}| v_r$.

**Self-interaction requirement:** Self-hit requires $|\mathbf{v}_a| > c_f$ at some emission times (super-field-speed), so the worldline outruns its recent wake surfaces. Curvature alone is insufficient if $|\mathbf{v}_a| < c_f$ everywhere (a curved sub-field-speed trajectory never intersects its own past light cones).

**Persistent memory:** Once an architrino has exceeded $v > c_f$ in its past and emitted wake surfaces, it can **later slow down** to $v < c_f$ and **still receive self-hits** from those earlier emissions. The self-hit regime is **not instantaneously tied to current velocity**; it is a **path-history memory effect**.

#### Causality and Locality

**Causal structure:** Event $A$ at $(t_A, \mathbf{x}_A)$ can influence event $B$ at $(t_B, \mathbf{x}_B)$ only if:

$$
t_B > t_A \quad \text{and} \quad \|\mathbf{x}_B - \mathbf{x}_A\| \leq c_f(t_B - t_A).
$$

This defines a **field-speed light cone** (or "causal cone") centered at each event.

**No action-at-a-distance:** All influences propagate at finite speed $c_f$. There are no instantaneous interactions across spatial separation.

**Event-locality at the receiver:** The Master EOM is evaluated **at the receiver event**: only the causal wake surfaces intersecting $\mathbf{x}_i(t)$ contribute to the acceleration there and then. However, it is **path-history dependent**: the active branches depend on the **entire past worldline** of all sources.

---

### Self-Interaction (Self-Hit Dynamics)

#### Self-Hit Condition

An architrino $i$ experiences self-hit at time $t$ if there exists $t_0 < t$ such that:

$$
\|\mathbf{x}_i(t) - \mathbf{x}_i(t_0)\| = c_f(t - t_0).
$$

**Geometric interpretation:** The architrino's current position $\mathbf{x}_i(t)$ lies on the causal isochron emitted from its past position $\mathbf{x}_i(t_0)$.

**Requirements:**

1. **Curvature**: The worldline must curve (straight-line motion admits no self-hits).
2. **Super-field-speed history**: At emission time $t_0$, the speed must have been $|\mathbf{v}_i(t_0)| > c_f$ (otherwise, the architrino never outruns its wake surfaces).

#### Multiple Self-Hits (Plural)

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

#### Persistent Memory (Self-Hit After Slowing Down)

**Critical clarification:**

Self-hit is **not** instantaneously tied to current velocity. An architrino that has **previously** exceeded $v > c_f$ and emitted wake surfaces can **later slow down** to $v < c_f$ and **still receive self-hits** from those earlier emissions.

**Scenario:**

1. At time $t_1$: Architrino accelerates to $v > c_f$ and emits wake surfaces while in super-field-speed regime.
2. At time $t_2 > t_1$: Architrino slows down to $v < c_f$ (e.g., due to partner attraction or external forces).
3. At time $t_3 > t_2$: The architrino's trajectory curves such that it intersects one of the wake surfaces emitted at $t_1$ (when $v > c_f$).

**Result:** Self-hit occurs at $t_3$ even though current velocity $|\mathbf{v}(t_3)| < c_f$.

**Implication:** Self-hit is a **path-history memory effect**. The architrino's current acceleration depends on **whether it ever exceeded $c_f$ in the past and curved**, not just on its instantaneous state.

**Non-Markovian nature:** Knowing $\mathbf{x}_i(t)$ and $\mathbf{v}_i(t)$ is insufficient to determine $\mathbf{a}_i(t)$. You need the **full past worldline** $\{\mathbf{x}_i(t') : t' < t\}$ to identify all causal self-hit times $t_0 \in \mathcal{C}_{ii}(t)$.

#### Self-Hit as Stabilization Mechanism

**Role in binary formation:** Self-hit provides a **repulsive radial contribution** that opposes the attractive pull of opposite-charge partners. This competition produces:

- **Maximum-curvature candidates**: the circular toy model identifies where a minimum-radius barrier must be analyzed.
- **Null-separatrix protection**: the Jacobian-degenerate boundary $J=0$ acts as a geometric wall against collapse in the exact kernel.
- **A closure test, not a closure proof**: the same $1/|J|$ amplification multiplies tangential as well as radial projections, so a Jacobian-null branch does not by itself prove vanishing tangential power or an exact locked orbit.

**Connection to quantum behavior:** The non-Markovian memory and deterministic-but-complex self-hit dynamics are the **seed** of quantum-like phenomena:

- Pilot-wave guidance (self-interference creates effective "guiding field")
- Discrete stable states (attractors in phase space)
- Measurement uncertainty (informational ambiguity at receiver; see Section 3.4)

An important open problem is to map the phase-space attractor landscape for self-hit binaries, including basin size for maximum-curvature orbits, escape conditions, and the existence of secondary attractors such as long-lived elliptical families.

### Worked Examples (Analytic Baselines)

#### Stationary Opposite Charges (Radial Fall)

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

#### Sub-Field-Speed Circular Orbit (Instability)

**Setup:**
- Two opposite polarities in symmetric circular orbit at radius $R$, speed $v < c_f$
- No self-hits (sub-field-speed regime)

**Partner contribution:**
- Provides inward radial force (centripetal)
- Also provides **tangential force** (always positive, i.e., in direction of motion)

**Result:** Net tangential power $T > 0$ → continuous acceleration → orbit tightens (spiral inward) → speed increases.

**Conclusion within this circular benchmark:** No stable circular orbit appears in the sub-field-speed regime for isolated opposite-charge binaries.



#### Maximum-Curvature Orbit (Self-Hit Stabilization)

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

### Informational Ambiguity at the Receiver

#### Limited Information Per Hit

From the perspective of the receiving architrino, the information carried by an intersecting causal isochron is **limited**. The receiver only knows:

1. The **net strength** of the potential at the point of intersection (through the acceleration magnitude $|\mathbf{F}|$).
2. The **unoriented line of action** through its current position (the line along which the force points).

The receiver does **not** have direct knowledge of:
- The source's identity (which architrino $j$?)
- The source's precise distance $r_{ij}$ (without additional assumptions)
- The source's velocity at emission $\mathbf{v}_j(t_0)$

#### Ambiguity: Electrino vs Positrino on Opposite Sides

A particularly important ambiguity: the receiver cannot distinguish between:

- A **negative potential** due to an Electrino (charge $-\epsilon$) on one side of the line of action, and
- A **positive potential** due to a Positrino (charge $+\epsilon$) on the **opposite side** of the same line,

if the resulting radial acceleration is the same.

**Example:** An acceleration **towards** a point along the line of action could be interpreted as:
- Attraction to a Positrino at that point, **or**
- Repulsion from an Electrino located at the diametrically opposite point on the same line.

#### Rest-Frame Recast (Useful Inference Device)

Any single hit can be **equivalently described** with a **stationary emitter** ($|\mathbf{v}| = 0$) placed somewhere along the same unoriented line of action, with the emitter's actual speed at emission accounted for by an adjusted emission time and, if desired, a surrogate location along that line.

**Key property:** The same emission law is preserved in this recast; the velocity dependence is transferred into the adjusted emission geometry and the matched Jacobian-weighted flux.

**Utility:** This recast simplifies some analytic calculations and provides intuition for the receiver's "inference problem" (what source configurations are consistent with a given hit?).

#### Superposition Complicates Inference

The ambiguity is compounded by **superposition**: The net potential at any instant is the sum of all intersecting expanding causal wake surfaces. A measured potential along a single radial can be the consequence of a **complex confluence of fields** from many different emitters located along that line of action, arriving from both directions.

**Consequence:** The receiver experiences a **deterministic acceleration** (given full microstate knowledge, as known to the $\mathbb{U}_{\text{now}}$ universe-state perspective), but has **incomplete local information** about the source configuration.

#### Connection to Quantum Measurement Uncertainty

This limited, unoriented, and source-ambiguous information at the hit level is a **key ingredient** for the emergence of effective quantum-like behavior and measurement uncertainty from deterministic micro-dynamics:

- **Wavefunction as potential distribution**: The "wavefunction" $\psi$ may be interpreted as a **coarse-grained representation** of the superposed potential field.
- **Measurement as interaction**: "Measurement" is simply a complex assembly interaction; the "outcome" is determined by which causal hits occur.
- **Uncertainty**: Not fundamental indeterminacy, but **informational ambiguity** from the receiver's limited perspective.

## Parameters and Numerical Implementation

### Parameter Definitions

The core parameters entering the Master Equation are:

| **Parameter** | **Symbol** | **Working convention** | **Dimensional** | **Comment** |
|:--------------|:-----------|:----------------------|:----------------|:------------|
| Field speed | $c_f$ | Set to 1 in natural units unless otherwise stated | $\mathrm{L}\,\mathrm{T}^{-1}$ | Propagation speed in the causal constraint |
| Coupling constant | $\kappa$ | Universal coupling parameter | $\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2}$ | Controls the strength of the inverse-square interaction |
| Architrino charge unit | $\epsilon$ | $\lvert e \rvert / 6$ | $\mathrm{Q}$ | Fundamental charge magnitude |
| Shell thickness (regularization) | $\eta$ | Positive regularization width used in analysis and simulation | $\mathrm{L}$ | Mollifies delta singularities |

In this document, $c_f$ is treated primarily as a unit-setting convention, $\kappa$ as the universal coupling scale of the delayed interaction law, $\epsilon$ as the fundamental charge unit, and $\eta$ as a regularization parameter used only when a smooth surrogate of the exact shell dynamics is required.

### Numerical Implementation Notes

#### Delay Root-Finding Algorithms

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

##### Spatial Hashing for History Buffers

**Efficiency requirement:** Naïve all-pairs history search scales as $O(N^2 T_{\text{history}})$, intractable for $N > 100$ particles. 

**Required optimization:** Implement spatial hash grid with cell size $\sim c_f \Delta t_{\max}$; only search cells within causal range of receiver. Expected scaling: $O(N \log N)$.

**Implementation notes:**
- Partition spatial domain into cubic cells of side length $\Delta_{\text{cell}} \approx c_f T_{\text{history,max}}$
- At each time step, bin all architrino positions into cells
- For receiver at $\mathbf{x}_i(t)$, only search cells within causal radius $r_{\text{max}} = c_f T_{\text{history}}$
- Update hash grid incrementally (not from scratch each step)


#### Time-Stepping Schemes for DDEs

The Master EOM is a **state-dependent DDE** (delay depends on the solution itself). Standard ODE integrators (e.g., RK4) must be adapted:

**Recommended methods:**

- **Fixed-point iteration** with predictor-corrector (for implicit delays)
- **Adaptive time-stepping** (small $\Delta t$ when roots are close or numerous)
- **Event detection** for exact root crossings (optional; improves accuracy in sharp-hit regime)

**Stability:** Ensure $\Delta t < \eta / c_f$ (resolve mollified wake surface width); adjust $\eta$ and $\Delta t$ together in convergence tests.

#### Provenance Tracking (Emission Event → Receiver → Response)

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

## Analytic Regimes and Research Roadmap

### Summary and Key Takeaways

#### What This Document Establishes

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

#### Implications for Emergent Phenomena

**From this single equation:**

- **Stable binaries** form via self-hit stabilization at maximum curvature.
- **Tri-binaries (Noether cores)** emerge as nested binary configurations.
- **Particles** are tri-binary assemblies with axial layers.
- **Quantum behavior** arises from non-Markovian memory + informational ambiguity.
- **Spacetime curvature** emerges from Noether Sea density gradients.
- **Cosmological expansion** is local energy dissipation in the Noether Sea.

---

### Fully general case (arbitrary N, arbitrary trajectories)

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

### Ideal / symmetric cases where analytic work is realistic

The most tractable cases are the highly symmetric regimes in which closed forms or controlled approximations remain plausible.

#### Static / quasi‑static limit (Coulomb analogue)

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

#### Two‑body, 1D radial motion (head‑on, no angular momentum)

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

For the self-hit-capable reduced problem that goes beyond the sub-$c_f$ perturbative regime and sets up a return-map breather question, see [collinear-breather.md](./collinear-breather.md).

For the local origin-crossing theorem program in that reduced note, the working 1D model is dual-mollified rather than merely shell-regularized: the shell mollifier $\delta_\eta$ still selects delayed roots, while a separate core mollifier $\epsilon_c$ is imposed on the inverse-square amplitude so the post-crossing local vector field remains finite. That dual-mollified local model is the one used for the first recapture lemmas there.

---

#### Two‑body uniform circular orbit, sub‑$c_f$ (no self‑hit)

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

#### Proposition (Unique partner branch and exact delay equation)

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

#### Proposition (Exact partner-only circular force decomposition)

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

#### Corollary (Tangential positivity and circular instability)

Within the isolated partner-only circular ansatz, the tangential power is strictly positive:
$$
\mathbf{a}_{12}\cdot\mathbf{v}_1(t)=v\,a_\theta^{(\mathrm{part})}>0.
$$
Therefore an isolated opposite-charge binary cannot realize an exact constant-speed circular orbit from partner delay alone.

**Interpretation.**
These are the exact partner-only circular formulas needed elsewhere in the chapter. They show that the delayed partner branch supplies the desired inward radial pull, but it also drives the motion forward along $\mathbf{e}_\theta$. The circular ansatz therefore spirals inward instead of closing unless some additional structure changes the tangential balance.

---

#### Self‑hit for uniform circular motion, $v > c_f$ (single particle)

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

#### Maximum‑curvature binary (inner binary idealization)

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

This would be an “analytic scaffold + numerical check” situation, not full closed forms.

---

#### Symmetric delayed logarithmic spiral (advanced non-circular benchmark)

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

### Emergent‑field / continuum limits

There’s another class of “analytic solutions” that matter:

#### Homogeneous, isotropic Noether Sea

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

### Natural analytic targets

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

### Bottom line

- **General N‑body analytic solution:** No; the structure is too complex (DDE with state‑dependent delays and self‑hit multiplicity).
- **Idealized / symmetric cases:** Yes, in several important classes:
  - 1D radial two‑body,
  - sub‑$c_f$ circular orbit,
  - uniform circular self‑hit,
  - algebraic maximum‑curvature conditions,
  - continuum/wave limits of the Noether Sea.

---

## Energy, Symmetry, and Conservation

### Energy, Lagrangian, and Hamiltonian Structure of the Architrino Dynamics

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

#### Aggregate Kinetic Energy

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

#### Exact Nonlocal Noether Energy

With finite-speed causal wakes and path-history dependence, an instantaneous position-only potential is not fundamental. Time-translation symmetry of the exact causal action supplies the corresponding nonlocal Noether charge. The formulas in this subsection therefore belong to the exact delayed theory itself.

For the dual-mollified local 1D model used later in [collinear-breather.md](./collinear-breather.md), the same conservation language should be read more carefully: the shell mollifier $\delta_\eta$ and core mollifier $\epsilon_c$ support a finite local vector field and a tractable return-map theorem program, but exact Noether-charge statements transfer automatically only if that dual mollification is itself derived from a time-translation-invariant action-level regularization of the causal kernel.

##### Energy exchange per causal hit

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

##### Exact wake-energy functional at time boundary $t$

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

##### Equivalent work-integral form

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

#### Exact Nonlocal Lagrangian

To connect with variational methods and with later continuum approximations, it is useful to exhibit the **action principle** for the delayed dynamics. Because the interactions depend on path history via causal wakes, the action is necessarily nonlocal in time.

##### Exact causal-delay Fokker-type interaction term

For the focused action-functional development (definitions, theorem spine, and circular branch-count benchmark), see [Causal Action Functional](causal-action-functional.md#core-functional-definitions).

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

##### Variation and line‑of‑action forces

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

This $1/r^2$ scaling is not an added ansatz: it is the unique pull-back of a scale-invariant causal-cone constraint in 3D when varying a $1/r$ Fokker kernel.

Self‑interaction ($i=j$) is included by adding $S_{ii}$ with the same kernel, but explicitly excluding the trivial coincidence $t'=t$ (no instantaneous self‑push at the moment of emission). Self‑hit corresponds to nontrivial roots $t_0<t$ where the worldline re‑intersects its own causal isochrons, which are captured naturally by the same double‑integral structure.

Thus:

- The action above is the exact nonlocal action for the delayed dynamics,
- Its branch-resolved variation reproduces the Master EOM with the same Jacobian-weighted inverse-square law used everywhere else in this chapter,
- Any $\delta_\eta$ replacement is a numerical regularization of this same delayed theory.

---

#### Total Energy for an Isolated Set

Given the kinetic energy definition, we now address the most useful history-aware total energy for an isolated architrino set.

##### General structure

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

##### Local canonical form in effective limits

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

#### Summary

- **Kinetic energy** is defined in the usual way at the architrino level, with internal kinetic energy of tightly bound self‑hit binaries contributing to assembly rest masses.
- **Interaction energy** is not primitive as an instantaneous position function; it is encoded in the nonlocal causal charge $E_{\text{wake}}$ and may be reconstructed from the work-integral form $U$.
- An **exact nonlocal action principle** exists: a multi-time Lagrangian whose kernel enforces the causal isochron geometry and reproduces the Master EOM with its Jacobian-weighted inverse-square law.
- The **total energy** for an isolated trajectory is history-aware; in suitable limits it reduces to a canonical $H_\text{eff} = \sum \mathbf{P}^2/2M + U_\text{eff}$ for effective assemblies, with no separate “field energy” ontology.

All energy accounting remains localized to **architrinos and their assemblies** and is only updated at the instants when **causal wake surfaces intersect receivers** at $t = \text{now}$. The exact conserved charge may be written as $K_{\mu}(t)+E_{\text{wake}}(t)$ or, equivalently up to reference choice, as $K_{\mu}(t)+U(t)$ along realized trajectories.

---

### Symmetry, Conservation, and Lyapunov Functionals

#### Introduction

The Master Equation is a state-dependent delay system: acceleration at time $t$ depends on the path-history segment over $[t-h,t]$. In this setting, conservation laws are not functions of the instantaneous state $(\mathbf{x},\mathbf{v})$ alone. Instead, they are **functionals on path history** that track "in-flight" wake contributions.

This section makes the symmetry group explicit and states the corresponding conserved functionals for isolated systems with $\eta > 0$.

#### Fundamental Symmetry Group

**Definition (Fundamental symmetry group).** The substrate and interaction kernel are invariant under
$$
G_{\text{fund}} = E(3) \times \mathbb{R}_{\text{time}},
$$
where $E(3)=\mathbb{R}^3 \rtimes O(3)$ acts by spatial translations and rotations, and $\mathbb{R}_{\text{time}}$ acts by time translation.

**Theorem (Invariance of the Master Equation).** If $\mathbf{x}(t)$ is a solution, then:

1. **Time translation:** $\mathbf{y}(t)=\mathbf{x}(t+\tau)$ is a solution for any $\tau \in \mathbb{R}$.
2. **Spatial isometry:** $\mathbf{y}(t)=R\mathbf{x}(t)+\mathbf{b}$ is a solution for any $R\in O(3)$ and $\mathbf{b}\in\mathbb{R}^3$.

*Proof sketch.* The causal constraint depends only on Euclidean distances and time differences. Both are invariant under $G_{\text{fund}}$. The line-of-action vector $\hat{\mathbf{r}}_{ij}$ transforms covariantly under rotations, so the per-hit acceleration retains the same form.

#### Generalized Momentum and Angular Momentum

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

**Conservation law (total angular momentum).**
$$
\mathbf{L}_{\text{tot}}(t) \equiv \mathbf{L}_{\text{mech}}(t) + \mathbf{L}_{\text{wake}}(t)
$$
is constant in time for isolated solutions. It is the angular-momentum decomposition associated with rotational invariance of the nonlocal causal action.

**Remark.** These definitions mirror the energy decomposition used earlier: the "missing" momentum and angular momentum are attributed to in-flight wake geometry, so the total quantities are functionals of the path history.

#### Energy Functional and No-Runaway Criterion

Time-translation invariance implies a conserved history functional, which we write as
$$
E_{\text{tot}}(t) = K_{\mu}(t) + E_{\text{wake}}(t),
$$
where $K_{\mu}$ is the quadratic kinetic bookkeeping proxy and $E_{\text{wake}}$ denotes the exact nonlocal interaction charge. In direct trajectory evaluation, $U$ may be used as an equivalent reconstruction up to a constant offset.

This statement is exact for the action-based delayed theory discussed in this section. For regularized working models, especially the dual-mollified local recapture model of [collinear-breather.md](./collinear-breather.md), it should be interpreted as exact only when the regularization preserves the same symmetry structure; otherwise it is the natural history-aware bookkeeping candidate rather than a proved invariant.

**Lemma (Bounded work rate under regularization).** If $\eta>0$ and the mollified kernel bounds the per-hit force, then there exists $F_{\max}(\eta)$ such that
$$
\bigg|\frac{dK_{\mu}}{dt}\bigg| \le \sum_i \|\mathbf{F}_i\|\,\|\mathbf{v}_i\|
\le N\,F_{\max}(\eta)\,v_{\max}(t).
$$

**Theorem (No-runaway criterion).** For an isolated system with fixed $\eta>0$, if the interaction functional $U(t)$ is bounded below on the admissible history class (for example, by enforcing a minimum separation within the regularized kernel support), then $K_{\mu}(t)$ is bounded for all times where the solution exists. In particular, a runaway $v_{\max}(t)\to\infty$ is only possible if $U(t)\to -\infty$, which requires a collapse toward the singular regime or a breakdown of the regularized assumptions.

*Interpretation.* Self-hit repulsion can transfer energy between $U$ and $K$, but it cannot generate unbounded kinetic energy without a corresponding unbounded decrease in $U$. This is the core conservation argument for excluding unphysical runaway acceleration in the regularized model.

#### Simulation Diagnostics (Symmetry and Conservation)

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

#### Closure Interface: Coarse-Graining Gate to Effective Quantum Envelope

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
- the same coarse-graining window that preserves validated dynamical invariants must recover the effective Schrödinger limit in the non-relativistic weak-field regime;
- residual non-Markovian terms must be explicitly retained as correction operators, not absorbed into uncontrolled fitting.

---

**End of Master Equation of Motion Document**

---
