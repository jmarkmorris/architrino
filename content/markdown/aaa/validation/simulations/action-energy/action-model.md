# Action Model Comparison

This note compares three modeling options for the emission-propagation-interaction pipeline and recommends a primary approach, with supporting roles for the others. We work in units with field speed $v=1$ unless stated otherwise; emission cadence and per-wavefront amplitude are constant at the source; per-hit actions are directed along $\hat{\mathbf{r}}$ with inverse-square geometric decay and receiver-normal branch strength $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$; $H(0)=0$ excludes the coincident-time self-kick; no cross products or right-hand-rule terms appear.

---

**Setup / assumptions**

* The emitter is at position $\mathbf{x}_s(t)$ in 3-D space (it can move).
* The emitter emits **thin causal wake surfaces**. Each wake surface is created at a single instant $\tau$ and then expands outward **spherically** from the creation point.
* The wake surface radius after emission time $\tau$ is

  $$
  r(t,\tau) = c\,(t-\tau) \quad \text{for } t\ge\tau
  $$

  where $c$ is the constant **field speed**.
* Each emitted wake surface carries a **strength** $Q$, interpreted here as wake-surface amplitude. Its physical bookkeeping role depends on the comparison target: polarity, potential impulse, energy, or another declared quantity.
* Continuous source (preferred): model the emitter as a moving point injection with time-density $q(t)$ (amplitude per unit time) at its instantaneous position, i.e., $S(\mathbf{x},t)=q(t)\,\delta\!\big(\mathbf{x}-\mathbf{x}_s(t)\big)$. Each instant $t_0$ contributes a causal wake surface; we do not count “wake surfaces per second” (pulse trains are merely numerical surrogates).
* The diagnostic target is the effective scalar potential $\phi(\mathbf{x},t)$ produced at any point $\mathbf{x}$ and time $t$.
* Global neutrality (working hypothesis): on large scales the total architrino polarity inventory sums to zero (equal counts of $\pm\epsilon$); use this as the default boundary condition in PDE/Green’s-function comparisons.

We compare three frameworks: (1) a time-domain PDE/source, (2) an integral/Green’s-function (path history) solution, and (3) an event-driven radial-transport plus per-hit EOM. For each, we define symbols, show how the expanding causal wake surfaces appear, discuss how slowing or stopping the emitter is handled, and weigh trade-offs to inform a recommendation.

---

## Time-based PDE (wave equation with a moving point source)

**Physical idea:** keep the source as “something injected per unit time at the emitter location,” put that into a PDE surrogate for causal wake propagation at speed $c$, and let the PDE produce expanding spherical causal wake surfaces automatically. Numerically this is usually the easiest and most robust approach.

### PDE model

Use the scalar wave equation as a continuum comparison surrogate for finite-speed causal-wake reconstruction:

$$
\boxed{\;\frac{\partial^2 \phi}{\partial t^2}(\mathbf{x},t) - c^2 \,\nabla^2 \phi(\mathbf{x},t) \;=\; S(\mathbf{x},t)\;}
$$

**Symbols**

* $\phi(\mathbf{x},t)$: scalar potential surrogate at position $\mathbf{x}\in\mathbb{R}^3$ and time $t$.
* $c$: field propagation speed (units length/time).
* $\nabla^2$: Laplacian operator in space (sums second spatial derivatives).
* $S(\mathbf{x},t)$: source term (right-hand side) — this is how the emitter injects wake surfaces into the field.

### Point (moving) source form

Use a continuous time-density of emission at the moving point:

$$
S(\mathbf{x},t) \;=\; q(t)\,\delta\!\big(\mathbf{x}-\mathbf{x}_s(t)\big)
$$

Here $q(t)$ has units “amplitude per unit time.” The finite-speed wave operator then generates outgoing spherical causal wake surfaces automatically; no discrete wake surface count is assumed.

**How expanding causal wake surfaces appear**

* The source term does not explicitly insert a radius into the right-hand side. Instead, the PDE and the finite speed $c$ cause any instantaneous injection at the point $\mathbf{x}_s(\tau)$ to produce an outgoing spherical causal wake surface whose front moves outward at speed $c$. That is the built-in behavior of the wave-equation surrogate.
* The Green’s function ensures that, at $(\mathbf{x},t)$, only the path history emission $q(\tau)$ with $\tau = t - r/c$ contributes, producing an outgoing spherical wave with amplitude $q(\tau)/(4\pi r)$ supported on $r=c(t-\tau)$. Thus Method 1 with $S(\mathbf{x},t)=q(t)\delta(\mathbf{x}-\mathbf{x}_s(t))$ naturally yields expanding causal wake surfaces at speed $c$.

**Why $\|\mathbf{v}\|$ (emitter speed) does not cause blow-ups**

* If the emitter slows or stops, $S(\mathbf{x},t)$ remains nonzero at the same spatial location; the wave equation spreads each injection outward at speed $c$. No $1/\|\mathbf{v}\|$ singularity appears because the formulation does not convert from per-time emission to per-distance emission.
* Numerically, represent the point delta by a small, smooth kernel when avoiding grid artifacts. For example, instead of $\delta(\mathbf{x}-\mathbf{x}_s)$ use a small Gaussian of width $\sigma$ comparable to grid spacing.

**Numerical recipe (simple)**

* Choose spatial grid $\mathbf{x}_i$ and time step $\Delta t$ satisfying CFL stability (roughly $c\Delta t/\Delta x \le \text{const}$).
* Use a standard finite-difference time stepping for the wave equation (centered difference in time and space).
* At each time step $t_n$ add the source contribution $S(\cdot,t_n)$ to the RHS at the grid cells nearest $\mathbf{x}_s(t_n)$. If the emitter stops, it remains injecting at that grid location — the solver propagates outgoing wake surfaces.
* To avoid a numerical spike, spread the delta over a few cells with a mollifier, representing a thin wake surface of finite thickness.

**Summary for Method 1**

* Model is explicit, straightforward, numerically robust.
* Emission is naturally time-based; wake surfaces expand automatically at speed $c$.
* No division by the emitter speed appears; stopping the emitter is handled simply by keeping the source at the same location.

---

## Integral (Green’s function / path-history potential) approach

**Physical idea:** instead of evolving a PDE in time, write the solution as the sum of contributions from every past emission. For the wave equation the contribution from an impulse emitted at time $\tau$ and place $\mathbf{x}_s(\tau)$ arrives at a field point $\mathbf{x}$ only at the **path-history time** when the causal wake surface reaches $\mathbf{x}$. The Green’s function neatly encodes the expanding causal wake surface.

### Fundamental formula (general)

If the wave equation is

$$
\frac{\partial^2 \phi}{\partial t^2} - c^2 \nabla^2 \phi = S(\mathbf{x},t)
$$

then the solution may be written as the space–time convolution with the Green’s function $G$:

$$
\boxed{\;\displaystyle \phi(\mathbf{x},t)
\;=\;
\iint G\big(\mathbf{x},t;\mathbf{y},\tau\big)\;S(\mathbf{y},\tau)\;d\tau\,d^3y\;}
$$

* $G(\mathbf{x},t;\mathbf{y},\tau)$ is the response at $(\mathbf{x},t)$ to an instantaneous unit impulse at $(\mathbf{y},\tau)$.

### The 3-D free-space wave Green’s function

For three spatial dimensions (the usual case for causal wake surfaces), the causal Green’s function is

$$
G(\mathbf{x},t;\mathbf{y},\tau)
\;=\;
\frac{\delta\!\big(t-\tau - \tfrac{\|\mathbf{x}-\mathbf{y}\|}{c}\big)}{4\pi\,\|\mathbf{x}-\mathbf{y}\|},
\qquad t>\tau
$$

**Interpretation:** a unit impulse at location $\mathbf{y}$ and time $\tau$ influences $\mathbf{x}$ at time $t$ only when the travel time $\|\mathbf{x}-\mathbf{y}\|/c$ has elapsed; the $1/(4\pi r)$ factor is the usual geometric decay of an outgoing spherical wave in 3D.

### Plugging in a moving point source

If the emitter is a moving point source with a time-dependent source amplitude $q(\tau)$ at location $\mathbf{x}_s(\tau)$, then $S(\mathbf{y},\tau)= q(\tau)\,\delta(\mathbf{y}-\mathbf{x}_s(\tau))$. Plugging this into the convolution gives (integral over $\tau$ only):

$$
\boxed{\;\displaystyle
\phi(\mathbf{x},t) \;=\; \int_{-\infty}^{t}
\frac{q(\tau)\;
\delta\!\big(t-\tau - \tfrac{\|\mathbf{x}-\mathbf{x}_s(\tau)\|}{c}\big)}
{4\pi\,\|\mathbf{x}-\mathbf{x}_s(\tau)\|}\; d\tau\;}
$$

* $q(\tau)$ is the continuous emission density per unit time at the emission instant $\tau$. For a steady source, $q(\tau)=q_0$ (constant); more generally, $q$ may vary smoothly with $\tau$.

### Evaluating the integral — the path-history time

The $\delta$-function in the integrand enforces the *path-history-time condition*:

$$
t-\tau=\frac{r(\tau)}{c}, \qquad r(\tau)\equiv\|\mathbf{x}-\mathbf{x}_s(\tau)\|
$$

So the contribution to $\phi(\mathbf{x},t)$ comes only from times $\tau$ such that the expanding causal wake surface emitted at $\tau$ has just reached $\mathbf{x}$ at time $t$.

Mathematically, use the identity $\delta(g(\tau))=\sum_i \delta(\tau-\tau_i)/|g'(\tau_i)|$ where $\tau_i$ are simple roots of $g$. With $g(\tau)=t-\tau - r(\tau)/c$ we find (after algebra) the standard path-history solution:

$$
\boxed{\;
\phi(\mathbf{x},t) \;=\; \sum_{\tau_i}
\frac{q(\tau_i)}{4\pi\,r(\tau_i)\,\big|1 + \tfrac{1}{c}\,r'(\tau_i)\big|}
\;=\;
\sum_{\tau_i}
\frac{q(\tau_i)}{4\pi\,r(\tau_i)\,\big|1 - \tfrac{\mathbf{n}(\tau_i)\cdot\mathbf{v}_s(\tau_i)}{c}\big|}\;}
$$

where:

* the sum runs over **path-history times** $\tau_i$ solving $t-\tau_i=r(\tau_i)/c$ (usually there is a single relevant root).
* $r(\tau_i)=\|\mathbf{x}-\mathbf{x}_s(\tau_i)\|$.
* $r'(\tau)=\dfrac{d}{d\tau}\|\mathbf{x}-\mathbf{x}_s(\tau)\|=-\,\mathbf{n}(\tau)\cdot\mathbf{v}_s(\tau)$.
* $\mathbf{v}_s(\tau)=\dfrac{d\mathbf{x}_s}{d\tau}$ is the source velocity at emission time $\tau$.
* $\mathbf{n}(\tau) = \dfrac{\mathbf{x}-\mathbf{x}_s(\tau)}{r(\tau)}$ is the unit vector pointing from source (at emission) to the field point.

In standard wave-equation solutions, a Jacobian factor $|1 - \mathbf{n}\!\cdot\!\mathbf{v}_s/c|$ arises from the change of variables used to evaluate the path history time delta. In this project’s canonical per-hit law, emission cadence and per-wavefront amplitude are constant and do not depend on emitter speed. The corresponding source-normal denominator is the root-transversality field, while the active received branch strength is the receiver-normal factor $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ rather than an extra source-amplitude modulation.

### Special simple case — stationary emitter

If $\mathbf{x}_s(\tau)=\mathbf{x}_0$ (emitter fixed) and $q(\tau)=Q\,\delta(\tau-\tau_0)$ (single wake surface at $\tau_0$), then the formula reduces to the intuitive result:

* The field at $\mathbf{x},t$ is nonzero only when $t-\tau_0=\|\mathbf{x}-\mathbf{x}_0\|/c$, i.e., when the causal wake surface of radius $r=c(t-\tau_0)$ reaches $\mathbf{x}$.
* The amplitude is $\displaystyle \phi(\mathbf{x},t) = \frac{Q}{4\pi\,r}$ (no extra Jacobian factor because $v_s=0$).

### How wake surfaces show up here

* Each emitted wake surface corresponds to one emission time $\tau$. The delta in the Green’s function selects the observation times $t$ at which the wake surface reaches $\mathbf{x}$.
* The shape of the contribution is the $1/(4\pi r)$ geometric factor for wave amplitude; the wake surface is thin in time if $q(\tau)$ is a delta in $\tau$, so the receiver gets a short impulse when the wavefront passes.

### Handling an emitter that stops / $\|\mathbf{v}_s\|\to 0$

* If the emitter slows or stops, the Jacobian factor $1 - \mathbf{n}\cdot\mathbf{v}_s/c$ tends to 1 and nothing singular happens. The path-history equation still has a solution and each wake surface arrives at the predicted time.
* If the emitter sits still and emits many wake surfaces (continuous $q(\tau)$), the field is the time integral (or sum) of all wake surface contributions evaluated at their respective causal times. No $1/\|\mathbf{v}_s\|$ blowup occurs.

---





## Event-driven Radial-Transport + Per-Hit EOM (Canonical Method)

Physical idea: represent emission as a conserved, razor-thin causal wake surface (a measure on the causal isochron), then drive particle motion by summing line-of-action per-hit accelerations with receiver-normal branch strength at causal intersection times. We work in units with field speed $v=1$ unless noted; replace $v$ by $c$ otherwise.

Field representation (transport/continuity form)
- Source impulse at $(t_0,\mathbf{s}_0)$ creates a wake surface supported on $r = v(t-t_0)$ with surface density that conserves a constant per-wake surface amplitude $q$:
  $$
  \rho(t,\mathbf{s}) \;=\; \frac{q}{4\pi r^2}\,\delta\!\big(r - v(t-t_0)\big)\,H(t-t_0),\quad r=\|\mathbf{s}-\mathbf{s}_0\|
  $$
- This solves the radial continuity (transport) equation
  $$
  \partial_t \rho + \nabla\!\cdot\!\big(v\,\hat{\mathbf{r}}\,\rho\big) \;=\; q\,\delta(t-t_0)\,\delta^{(3)}(\mathbf{s}-\mathbf{s}_0)
  $$
- Emission is continuous with constant time-density $q(t)\equiv q_0$.

Per-hit equation of motion (EOM)
- For a receiver $o'$ at time $t$ and a source $j$, causal emission times satisfy
  $$
  \|\mathbf{s}_{o'}(t) - \mathbf{s}_j(t_0)\| = v\,(t-t_0),\qquad t_0<t
  $$
- Each root contributes a line-of-action acceleration
  $$
  \mathbf{a}_{o'\leftarrow j}(t;t_0)
  \;=\;
  \kappa\,\sigma_{q_j q_{o'}}\,\frac{|q_j q_{o'}|}{r^2}\,
  W_{o'j}^{\mathrm{rec}}(t;t_0)\,\hat{\mathbf{r}},
  \quad
  \hat{\mathbf{r}}=\frac{\mathbf{s}_{o'}(t)-\mathbf{s}_j(t_0)}{r},\ r>0
  $$
  with $W_{o'j}^{\mathrm{rec}}=\lvert D_{t,o'j}/D_{s,o'j}\rvert$, $D_{s,o'j}=c_f-\mathbf{v}_j(t_0)\cdot\hat{\mathbf{r}}$, and $D_{t,o'j}=c_f-\mathbf{v}_{o'}(t)\cdot\hat{\mathbf{r}}$.
  with total acceleration the sum over sources and roots. Convention $H(0)=0$ removes the instantaneous self-kick at $\tau=0$. Optional mollification replaces $\delta(\cdot)$ by $\delta_\eta(\cdot)$ to produce smooth pushes.

Implementation checklist
- Root finding: solve $F(t_0;t)=\|\mathbf{s}_{o'}(t)-\mathbf{s}_j(t_0)\|-v(t-t_0)=0$ for all $j$ (including $j=o'$ for self-hits when kinematics permit).
- Accumulation: compute $r,\hat{\mathbf{r}}$, $D_s$, $D_t$, and $W^{\mathrm{rec}}$, apply $W^{\mathrm{rec}}/r^2$, then superpose.
- Time stepping: impulsive mode (events) or mollified mode ($\eta>0$) with standard ODE integrators.
- Self-interaction: appears when the worldline outruns recent wake surfaces ($\|\mathbf{v}\|>v$ for some emissions); self-hits are repulsive (like-on-like).

Relation to Methods 1 and 2
- This is a transport/continuity model, not the scalar wave equation. The $1/r^2$ factor is a surface-density normalization (Gauss-like on the spherically expanding causal wake surfaces); it is compatible with conserving total emission per wake surface. In Method 2 the $\!1/(4\pi r)$ factor appears for a wave amplitude; taking gradients connects these scalings when mapping to forces.
- The Doppler-type Jacobian $1-\mathbf{n}\!\cdot\!\mathbf{v}_s/c$ from Method 2 is the source-normal branch-transversality factor. Geometric constants are absorbed into $\kappa$ by convention, but the canonical per-hit strength uses the receiver-normal branch factor $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$; no additional source-speed amplitude factor is introduced.
- Numerically, this method targets particle dynamics directly (per-hit ODEs) rather than evolving a full field (Method 1) or evaluating fields at sparse probes (Method 2).

Operator diagnostics (finite-window checks)
- Use vector-calculus identities only on declared, reconstructed diagnostic channels such as $\nabla\Phi_\eta$ or the mollified transport current $\mathbf{J}_\eta=v\,\hat{\mathbf{r}}\,\rho_\eta$. These channels are validation objects, not new substrate ontology.
- For any finite control volume $V\subset\Sigma_t$ with outward unit normal $\hat{\mathbf{n}}$, define the Gauss residual
  $$
  R_G[V,t;\mathbf{Y}_\eta]\equiv
  \frac{\left|\int_{\partial V}\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\,dS-\int_V\nabla\!\cdot\!\mathbf{Y}_\eta\,dV\right|}
  {\int_{\partial V}\left|\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\int_V\left|\nabla\!\cdot\!\mathbf{Y}_\eta\right|\,dV+\varepsilon_G}
  $$
- For any oriented smooth surface $S\subset\Sigma_t$ with boundary $\partial S$, define the Stokes residual
  $$
  R_S[S,t;\mathbf{Y}_\eta]\equiv
  \frac{\left|\oint_{\partial S}\mathbf{Y}_\eta\!\cdot d\mathbf{x}-\int_S(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\,dS\right|}
  {\oint_{\partial S}\left|\mathbf{Y}_\eta\!\cdot d\mathbf{x}\right|+\int_S\left|(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\varepsilon_S}
  $$
- PDE and event-root simulations should agree not only pointwise after resampling, but also as operators on finite windows. If $\Delta\mathbf{Y}_\eta=\mathbf{Y}^{\mathrm{PDE}}_\eta-R(\mathbf{Y}^{\mathrm{root}}_\eta)$, use
  $$
  E_{\mathrm{op}}(V,S,t)\equiv
  \max\!\left\{R_G[V,t;\Delta\mathbf{Y}_\eta],\,R_S[S,t;\Delta\mathbf{Y}_\eta]\right\}
  $$
  For the conservative potential channel $\mathbf{Y}_\eta=\nabla\Phi_\eta$, nonzero circulation is a numerical, boundary, or coordinate-operator error unless a non-gradient effective channel has been explicitly declared.

Plain language: treat the potential contribution as a conserved amount spread over a growing causal wake surface. When a wake surface reaches a receiver, the receiver gets a straight-line push that falls off like $1/r^2$; the calculation may treat it as a sharp kick or as a short, smooth nudge.

## Cross-Method Guidance

### Cross-Method Selection
- Method 1 (PDE): whole-field grid simulations, visualization, and complex media/boundaries. Deposit a smeared source each step; robust when an emitter slows or stops. Aggregate particle data to coarse-grained densities n(x,t), $\rho$(x,t), and ℰ(x,t) as inputs/targets for PDE runs and validation.
- Method 2 (Green’s function / path-history integral): closed forms and sparse probe evaluation. Enforce the path-history condition $t-\tau=\|\mathbf{x}-\mathbf{x}_s(\tau)\|/c$ and handle the geometric factor $1-\mathbf{n}\cdot\mathbf{v}_s/c$ during evaluation; root-solve one (or more) $\tau$ per (observer, time) pair.
- Method 3 (Event-driven canonical): production many-body dynamics. Find causal roots and sum per-hit $W^{\mathrm{rec}}/r^2$ pushes; prefer $\eta$-mollified mode for smooth ODEs when needed.

Short worked example — stationary emitter, continuous source (consistent across methods)
- Setup: emitter at origin $\mathbf{x}_s=0$ with $q(t)\equiv q_0$ (constant).
- Method 1: solving the wave PDE with $S(\mathbf{x},t)=q_0\,\delta(\mathbf{x})$ reproduces the same spherical profile $\phi(r,t)=q_0/(4\pi r)$ on the outgoing wavefront.
- Method 2: the path-history formula gives $\displaystyle \phi(r,t)=\frac{q_0}{4\pi r}$ with the path-history time $\tau=t-r/c$.
- Method 3: the path-history condition selects the single causal time $t_0=t-r/c$; the per-hit EOM yields one radial push along $\hat{\mathbf{r}}$ with $1/r^2$ scaling, consistent with taking spatial gradients of the $1/r$ potential to connect amplitude to force.

Practical implementation notes (concise)
- PDE: smear $\delta(\mathbf{x}-\mathbf{x}_s)$ to grid scale; enforce CFL ($c\,\Delta t/\Delta x$ within the scheme’s bound).
- Path-history: robust root-finding for $\tau$ from $t-\tau=r(\tau)/c$; take care near grazing geometries where $1-\mathbf{n}\cdot\mathbf{v}_s/c$ is small.
- Event-driven: bracket causal roots for continuity, optionally use $\delta_\eta$ for smooth pushes, and limit step sizes so only a controlled number of mollified wake surfaces overlap.

### Operational Summary
- Model sources as $S(\mathbf{x},t)=q(t)\,\delta\!\big(\mathbf{x}-\mathbf{x}_s(t)\big)$ (time-based emission density).
- Use Method 3 as the primary dynamics engine; use Method 2 for calibration/spot checks; use Method 1 for whole-field/media studies.
- All three agree on simple stationary cases; they differ mainly in computational scope: grids (1), closed-form probes (2), and event-driven ODEs (3).

---

## Differential analysis (criteria-by-criteria)

Axiomatic fidelity (delayed-only, line-of-action, constant source emission)
- Method 1: Partially aligned. The PDE yields $1/(4\pi r)$ wave amplitudes; mapping to $1/r^2$ per-hit accelerations requires gradients and conventions. Radial-only action is not built-in.
- Method 2: Causality and superposition are exact; amplitudes are $1/(4\pi r)$ with a source-normal Jacobian $\left|1-\mathbf{n}\cdot\mathbf{v}_s/c\right|^{-1}$ when evaluating the path-history time delta. The canonical law keeps the corresponding source-normal denominator as root-transversality data, while received force magnitude uses $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ and overall geometric normalizations are absorbed into $\kappa$ when comparing accelerations.
- Method 3: Exact match. Delayed-only, line-of-action per-hit with constant source emission is native, and the receiver-normal branch strength appears explicitly in the received force magnitude. Geometric normalizations are conventionally absorbed into $\kappa$.

Causal root structure, self-interaction, multiplicity
- Method 1: Self-hits and multiple roots are implicit in the evolving field; they are not directly enumerated as discrete events.
- Method 2: Causal roots arise via solving $t-\tau=r(\tau)/c$; multiple roots and tangencies are explicit but require robust root-finding.
- Method 3: Roots are primitive; multi-hit and self-hit regimes are treated natively. Conventions H(0)=0 and exclusion of $r=0$ beyond $\tau=0$ are explicit.

Energetics and work
- Method 1: Continuum energy bookkeeping is natural ($\phi$, ∂t$\phi$, ∇$\phi$). Mapping to radial per-hit work needs careful averaging and alignment with the EOM.
- Method 2: Exact potentials in free space; gradients give forces; care is needed near $\left|1-\mathbf{n}\cdot\mathbf{v}_s/c\right|\to0$ geometries.
- Method 3: Energetics are validated via $\eta$-mollified potentials $\Phi_\eta$ and work–energy on resolved windows; impulses are recovered as $\eta$→0 in the weak sense.

Numerical stability and well-posedness
- Method 1: CFL constraints; dispersion/reflection control needed; robust under regularized sources; well posed on grids.
- Method 2: Stable as an evaluation formula; computational issues concentrate in robust, multi-root solving and handling near-tangency Jacobians.
- Method 3: Well posed with event handling or $\eta$-regularization; stability governed by root-tracking and step control; lightweight for many-body ODEs.

Computational cost and scalability
- Method 1: Heavy (3D grid + CFL time stepping). Cost grows with volume, resolution, and duration—independent of number of receivers.
- Method 2: Moderate to heavy depending on receivers × times × sources × roots; efficient for few probes, costly for dense sampling.
- Method 3: Light for particle dynamics. Cost scales with sources × average roots per step; independent of any spatial grid.

Boundaries, media, and heterogeneity
- Method 1: Natural—modify PDE coefficients (inhomogeneous c, damping, boundaries).
- Method 2: Natural only in homogeneous free space; complex media/boundaries require bespoke Green’s functions.
- Method 3: Natural in free space. Media/boundaries need additional modeling (e.g., corridor-level effective rules); not PDE-native.

### Observables and Inference
- Method 1: Full-field pictures aid intuition and corridor studies but obscure per-hit ambiguity without extra processing.
- Method 2: Clarifies causal timing and geometry at probes; good for inference templates and surrogate-location recasts.
- Method 3: Directly aligned with hit histories {A(t_k), L(t_k)}; best substrate for event-driven inference and assembly dynamics.

Summary (one line each)
- Method 1: Best for whole-field, media, and visualization; poorest fit to per-hit radial-only axioms without translation layers.
- Method 2: Best for exact, pointwise, causal analysis in free space; good for calibration and sparsely sampled validation.
- Method 3: Best for dynamics of many particles/assemblies under the canonical law; scales and matches axioms directly.

Operational guidance — when to use which method
- Method 1 (PDE): use this for whole-field grid simulations, visualization, and complex media or boundaries; step the wave PDE forward with a smeared source. Robust when an emitter slows or stops.
- Method 2 (Path history integral): use this for closed forms, analytic insight, or sparse probe evaluation; enforce the path-history condition $t-\tau=\|\mathbf{x}-\mathbf{x}_s(\tau)\|/c$ and handle the geometric factor $1-\mathbf{n}\cdot\mathbf{v}_s/c$ in evaluation; solve one root per (observer, time) pair in slow-motion, more if sources move fast.
- Method 3 (Event-driven canonical): use this for production many-body dynamics; find causal roots and sum per-hit $W^{\mathrm{rec}}/r^2$ pushes; prefer $\eta$-mollified mode for smooth ODEs when needed.

## Pros and cons (comparative)

Method 1 — Time-based PDE (wave equation)
- Pros
- Physically standard propagation at fixed speed $c$; expanding causal wake surfaces emerge automatically.
  - Robust on grids; handles inhomogeneous media, damping, and boundaries.
  - Good for full-field visualization and energy bookkeeping in continuum form.
- Cons
  - Computationally heavy for many-particle dynamics (3D grids, CFL constraints).
  - Requires careful numerics to avoid dispersion/reflection; mesh choices can bias results.
  - Mapping grid fields to the radial-only per-hit ODE can add another modeling layer.

Method 2 — Green’s function (path-history integral)
- Pros
  - Exact in homogeneous free space; no grid or time stepping for the field.
  - Makes causality explicit via path-history times; captures Doppler/Jacobian $1-\mathbf{n}\!\cdot\!\mathbf{v}_s/c$ automatically.
  - Efficient for field evaluation at a few observation points; excellent for analysis and cross-checks.
- Cons
  - Requires root-finding for each (observer, time) pair; multiple roots possible when sources outrun wake surfaces.
  - Costly when many receivers/sources are present; bookkeeping grows quickly.
  - Needs careful handling near tangencies (small Jacobians) and in multi-hit/self-hit regimes.

Method 3 — Event-driven radial-transport + per-hit EOM (canonical)
- Pros
  - Directly implements the project’s delayed, radial-only interaction law with constant emission cadence.
  - Natural support for self-hits and superposition; local $1/r^2$ weighting makes nearby coherent roots dominate once the far-field cutoff, screening, cancellation, or summation prescription is declared.
  - Numerically lightweight for particle dynamics; works cleanly with impulsive or mollified ODE integration.
- Cons
  - Not derived from the scalar wave equation; global field-energy accounting is indirect (via mollified potentials).
  - Must retain the causal-root Jacobian factor from the master equation; a reduced test harness that omits it is a noncanonical approximation rather than a calibration of $\kappa$.
  - Accuracy depends on robust causal-root finding and regularization choices in complex multi-hit scenarios.

---

## Recommendation

- Use Method 3 as the primary engine for particle dynamics and assemblies. It matches the model’s axioms (radial-only action, constant emission cadence) and scales well.
- Adopt Method 2 as the analytic reference for calibration and validation. Calibrate $\kappa$ so simple benchmarks (stationary/slow sources, symmetric binaries) agree between Methods 2 and 3 at the per-hit level; do not introduce any per-hit emitter-speed weighting.
- Baseline formula (stationary emitter at origin): with $q(t)\equiv q_0$, $\displaystyle \phi(r,t)=\frac{q_0}{4\pi r}$ since the path history condition selects $\tau=t-r/c$; if $q$ varies, $\displaystyle \phi(r,t)=\frac{q(t-r/c)}{4\pi r}$.
- Reserve Method 1 for full-field studies (visualization, media, boundary effects) and for end-to-end tests of numerical stability; it is valuable but unnecessary for routine ODE-based assembly simulations.
- Documentation/actionables: keep the continuity-form field definition and per-hit EOM as the canonical statement; add a brief appendix mapping densities (Method 3) to potentials (Method 2) to clarify when $1/r$ vs $1/r^2$ factors appear and how calibration preserves totals.
- Numerical cautions:
  - Always smear $\delta(\mathbf{x}-\mathbf{x}_s)$ to a normalized kernel of width $\sigma$ comparable to the grid spacing in PDE runs to avoid grid-scale artifacts.
  - Enforce CFL: choose $\Delta t$ so that $c\,\Delta t/\Delta x$ meets the stability bound for the chosen stencil to prevent instability.
  - Path history solving: solve $t-\tau=r(\tau)/c$ carefully; near $\|\mathbf{v}_s\|\approx c$, root finding and the factor $1-\mathbf{n}\cdot\mathbf{v}_s/c$ require extra care.
  - Finite temporal thickness: if wake surfaces have duration, replace $\delta(t-\tau)$ with a smooth profile to model finite-width wavefronts.

Plain language: use the event-driven, radial-only method for dynamics, check it against the path-history integral to calibrate parameters, and use the PDE only when the calculation needs whole-field pictures or complex media.

Recap (in three lines)
- Model sources as $S(\mathbf{x},t)=q(t)\,\delta\!\big(\mathbf{x}-\mathbf{x}_s(t)\big)$ (time-based emission density).
- Method 1: easiest for grid-based whole-field runs; wake surfaces emerge at speed $c$.
- Method 2: exact path-history formula; contributions occur only when $t-\tau=\|\mathbf{x}-\mathbf{x}_s(\tau)\|/c$, with amplitude decaying as $1/(4\pi r)$ and a geometric $1-\mathbf{n}\cdot\mathbf{v}_s/c$ factor in evaluation.

---

## Layered penetration diagram (molecules → cores)

A qualitative “onion” sketch to visualize which excitations typically penetrate which structural layers. This helps readers see what’s excluded and what isn’t.

Legend: [+] passes, [~] depends (energy/frequency/geometry), [x] mostly blocked/strongly attenuated

| Layer | Photons | Neutrinos | Charged ±$\epsilon$ | Dark-matter-like neutral |
| --- | --- | --- | --- | --- |
| L4: Bulk molecular wake surface (solids/liquids; many-body opacity) | [~] material window; optical opaque, IR/UV/X/$\gamma$ vary | [+] nearly transparent | [x] bind/deflect; do not traverse as free particles | [+] very weak coupling |
| L3: Atomic electron distribution (bound electrons) | [~] photoelectric/Compton; X/$\gamma$ penetrate better | [+] | [x] Coulomb-coupled; captured/scattered | [+] |
| L2: Nuclear layer (nucleons; femtoscopic scale) | [~] $\gamma$ can interact; strong attenuation in bulk | [+] weak interaction; mostly pass | [x] excluded as free traversers | [+] |
| L1: Nested shell braid shielding (nested shell binaries; shielded) | [x] far-field cancels; no corridor capture | [~] tiny axial coupling only | [x] self/partner couplings dominate; no transit | [+] by hypothesis: minimal coupling |
| L0: Axial corridors / flux-tube loci (coherent geometry) | [+] guided along corridor | [~] weak corridor coupling; alignment matters | [x] no cross-product forces; not a transit channel | [~] minimal, geometry-dependent |


Notes (interpretation):
- “Dark-matter-like neutral” denotes very weakly coupled, neutral meta-assemblies consistent with this framework; included here as a hypothesis for qualitative comparison.
- Entries marked [~] depend on spectrum, thickness, coherence, and alignment (e.g., $\gamma$ vs optical photons; corridor alignment for neutrinos).
- The diagram is about penetration (transit). Local interactions, capture, or re-binding are separate processes governed by geometry and delay.
