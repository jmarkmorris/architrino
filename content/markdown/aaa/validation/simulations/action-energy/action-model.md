# Action Model Comparison

This note compares three modeling options for the emission-propagation-interaction pipeline and recommends a primary approach, with supporting roles for the others. We work in units with field speed $v=1$ unless stated otherwise; emission cadence and per-wavefront amplitude are constant at the source; per-hit actions are directed along $\hat{\mathbf{r}}$ with inverse-square geometric decay and receiver-normal branch strength $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$; $H(0)=0$ excludes the coincident-time self-kick; no cross products or right-hand-rule terms appear.

---

**Setup / assumptions**

* The emitter is at position $\mathbf X_s(T)$ in 3-D space (it can move).
* The emitter emits **thin causal wake surfaces**. Each wake surface is created at a single instant $T_{\mathrm{em}}$ and then expands outward **spherically** from the creation point.
* The wake surface radius after emission time $T_{\mathrm{em}}$ is

  $$
  r(T,T_{\mathrm{em}}) = c_f\,(T-T_{\mathrm{em}}) \quad \text{for } T\ge T_{\mathrm{em}}
  $$

  where $c_f$ is the constant **field speed**.
* Each emitted wake surface carries a **strength** $Q$, interpreted here as wake-surface amplitude. Its physical bookkeeping role depends on the comparison target: polarity, potential impulse, energy, or another declared quantity.
* Continuous source (preferred): model the emitter as a moving point injection with time-density $q(T)$ (amplitude per unit time) at its instantaneous position, i.e., $S(\mathbf X,T)=q(T)\,\delta\!\big(\mathbf X-\mathbf X_s(T)\big)$. Each instant $T_{\mathrm{em}}$ contributes a causal wake surface; we do not count “wake surfaces per second” (pulse trains are merely numerical surrogates).
* The diagnostic target is the effective scalar potential $\phi(\mathbf X,T)$ produced at any point $\mathbf X$ and time $T$.
* Global neutrality (working hypothesis): on large scales the total architrino polarity inventory sums to zero (equal counts of $\pm\epsilon$); use this as the default boundary condition in PDE/Green’s-function comparisons.

We compare three frameworks: (1) a time-domain PDE/source, (2) an integral/Green’s-function (path history) solution, and (3) an event-driven radial-transport plus per-hit EOM. For each, we define symbols, show how the expanding causal wake surfaces appear, discuss how slowing or stopping the emitter is handled, and weigh trade-offs to inform a recommendation.

---

## Time-based PDE (wave equation with a moving point source)

**Physical idea:** keep the source as “something injected per unit time at the emitter location,” put that into a PDE surrogate for causal wake propagation at speed $c_f$, and let the PDE produce expanding spherical causal wake surfaces automatically. Numerically this is usually the easiest and most robust approach.

### PDE model

Use the scalar wave equation as a continuum comparison surrogate for finite-speed causal-wake reconstruction:

$$
\boxed{\;\frac{\partial^2 \phi}{\partial T^2}(\mathbf X,T) - c_f^2 \,\nabla^2 \phi(\mathbf X,T) \;=\; S(\mathbf X,T)\;}
$$

**Symbols**

* $\phi(\mathbf X,T)$: scalar potential surrogate at position $\mathbf X\in\mathbb{R}^3$ and time $T$.
* $c_f$: field propagation speed (units length/time).
* $\nabla^2$: Laplacian operator in space (sums second spatial derivatives).
* $S(\mathbf X,T)$: source term (right-hand side) — this is how the emitter injects wake surfaces into the field.

### Point (moving) source form

Use a continuous time-density of emission at the moving point:

$$
S(\mathbf X,T) \;=\; q(T)\,\delta\!\big(\mathbf X-\mathbf X_s(T)\big)
$$

Here $q(T)$ has units “amplitude per unit time.” The finite-speed wave operator then generates outgoing spherical causal wake surfaces automatically; no discrete wake surface count is assumed.

**How expanding causal wake surfaces appear**

* The source term does not explicitly insert a radius into the right-hand side. Instead, the PDE and the finite speed $c_f$ cause any instantaneous injection at the point $\mathbf X_s(T_{\mathrm{em}})$ to produce an outgoing spherical causal wake surface whose front moves outward at speed $c_f$. That is the built-in behavior of the wave-equation surrogate.
* The Green’s function ensures that, at $(\mathbf X,T)$, only the path history emission $q(T_{\mathrm{em}})$ with $T_{\mathrm{em}} = T - r/c_f$ contributes, producing an outgoing spherical wave with amplitude $q(T_{\mathrm{em}})/(4\pi r)$ supported on $r=c_f(T-T_{\mathrm{em}})$. Thus Method 1 with $S(\mathbf X,T)=q(T)\delta(\mathbf X-\mathbf X_s(T))$ naturally yields expanding causal wake surfaces at speed $c_f$.

**Why $\|\mathbf V\|$ (emitter speed) does not cause blow-ups**

* If the emitter slows or stops, $S(\mathbf X,T)$ remains nonzero at the same spatial location; the wave equation spreads each injection outward at speed $c_f$. No $1/\|\mathbf V\|$ singularity appears because the formulation does not convert from per-time emission to per-distance emission.
* Numerically, represent the point delta by a small, smooth kernel when avoiding grid artifacts. For example, instead of $\delta(\mathbf X-\mathbf X_s)$ use a small Gaussian of width $\sigma$ comparable to grid spacing.

**Numerical recipe (simple)**

* Choose spatial grid $\mathbf X_i$ and time step $\Delta T$ satisfying CFL stability (roughly $c_f\Delta T/\Delta X \le \text{const}$).
* Use a standard finite-difference time stepping for the wave equation (centered difference in time and space).
* At each time step $T_n$ add the source contribution $S(\cdot,T_n)$ to the RHS at the grid cells nearest $\mathbf X_s(T_n)$. If the emitter stops, it remains injecting at that grid location — the solver propagates outgoing wake surfaces.
* To avoid a numerical spike, spread the delta over a few cells with a mollifier, representing a thin wake surface of finite thickness.

**Summary for Method 1**

* Model is explicit, straightforward, numerically robust.
* Emission is naturally time-based; wake surfaces expand automatically at speed $c_f$.
* No division by the emitter speed appears; stopping the emitter is handled simply by keeping the source at the same location.

---

## Integral (Green’s function / path-history potential) approach

**Physical idea:** instead of evolving a PDE in time, write the solution as the sum of contributions from every past emission. For the wave equation the contribution from an impulse emitted at time $T_{\mathrm{em}}$ and place $\mathbf X_s(T_{\mathrm{em}})$ arrives at a field point $\mathbf X$ only at the **path-history time** when the causal wake surface reaches $\mathbf X$. The Green’s function neatly encodes the expanding causal wake surface.

### Fundamental formula (general)

If the wave equation is

$$
\frac{\partial^2 \phi}{\partial T^2} - c_f^2 \nabla^2 \phi = S(\mathbf X,T)
$$

then the solution may be written as the space–time convolution with the Green’s function $G$:

$$
\boxed{\;\displaystyle \phi(\mathbf X,T)
\;=\;
\iint G\big(\mathbf X,T;\mathbf Y,T_{\mathrm{em}}\big)\;S(\mathbf Y,T_{\mathrm{em}})\;dT_{\mathrm{em}}\,d^3Y\;}
$$

* $G(\mathbf X,T;\mathbf Y,T_{\mathrm{em}})$ is the response at $(\mathbf X,T)$ to an instantaneous unit impulse at $(\mathbf Y,T_{\mathrm{em}})$.

### The 3-D free-space wave Green’s function

For three spatial dimensions (the usual case for causal wake surfaces), the causal Green’s function is

$$
G(\mathbf X,T;\mathbf Y,T_{\mathrm{em}})
\;=\;
\frac{\delta\!\big(T-T_{\mathrm{em}} - \tfrac{\|\mathbf X-\mathbf Y\|}{c_f}\big)}{4\pi\,\|\mathbf X-\mathbf Y\|},
\qquad T>T_{\mathrm{em}}
$$

**Interpretation:** a unit impulse at location $\mathbf Y$ and time $T_{\mathrm{em}}$ influences $\mathbf X$ at time $T$ only when the travel time $\|\mathbf X-\mathbf Y\|/c_f$ has elapsed; the $1/(4\pi r)$ factor is the usual geometric decay of an outgoing spherical wave in 3D.

### Plugging in a moving point source

If the emitter is a moving point source with a time-dependent source amplitude $q(T_{\mathrm{em}})$ at location $\mathbf X_s(T_{\mathrm{em}})$, then $S(\mathbf Y,T_{\mathrm{em}})= q(T_{\mathrm{em}})\,\delta(\mathbf Y-\mathbf X_s(T_{\mathrm{em}}))$. Plugging this into the convolution gives (integral over $T_{\mathrm{em}}$ only):

$$
\boxed{\;\displaystyle
\phi(\mathbf X,T) \;=\; \int_{-\infty}^{T}
\frac{q(T_{\mathrm{em}})\;
\delta\!\big(T-T_{\mathrm{em}} - \tfrac{\|\mathbf X-\mathbf X_s(T_{\mathrm{em}})\|}{c_f}\big)}
{4\pi\,\|\mathbf X-\mathbf X_s(T_{\mathrm{em}})\|}\; dT_{\mathrm{em}}\;}
$$

* $q(T_{\mathrm{em}})$ is the continuous emission density per unit time at the emission instant $T_{\mathrm{em}}$. For a steady source, $q(T_{\mathrm{em}})=q_0$ (constant); more generally, $q$ may vary smoothly with $T_{\mathrm{em}}$.

### Evaluating the integral — the path-history time

The $\delta$-function in the integrand enforces the *path-history-time condition*:

$$
T-T_{\mathrm{em}}=\frac{r(T_{\mathrm{em}})}{c_f}, \qquad r(T_{\mathrm{em}})\equiv\|\mathbf X-\mathbf X_s(T_{\mathrm{em}})\|
$$

So the contribution to $\phi(\mathbf X,T)$ comes only from times $T_{\mathrm{em}}$ such that the expanding causal wake surface emitted at $T_{\mathrm{em}}$ has just reached $\mathbf X$ at time $T$.

Mathematically, use the identity $\delta(g(T_{\mathrm{em}}))=\sum_i \delta(T_{\mathrm{em}}-T_{\mathrm{em},i})/|g'(T_{\mathrm{em},i})|$ where $T_{\mathrm{em},i}$ are simple roots of $g$. With $g(T_{\mathrm{em}})=T-T_{\mathrm{em}} - r(T_{\mathrm{em}})/c_f$ we find (after algebra) the standard path-history solution:

$$
\boxed{\;
\phi(\mathbf X,T) \;=\; \sum_{T_{\mathrm{em},i}}
\frac{q(T_{\mathrm{em},i})}{4\pi\,r(T_{\mathrm{em},i})\,\big|1 + \tfrac{1}{c_f}\,r'(T_{\mathrm{em},i})\big|}
\;=\;
\sum_{T_{\mathrm{em},i}}
\frac{q(T_{\mathrm{em},i})}{4\pi\,r(T_{\mathrm{em},i})\,\big|1 - \tfrac{\mathbf{n}(T_{\mathrm{em},i})\cdot\mathbf V_s(T_{\mathrm{em},i})}{c_f}\big|}\;}
$$

where:

* the sum runs over **path-history times** $T_{\mathrm{em},i}$ solving $T-T_{\mathrm{em},i}=r(T_{\mathrm{em},i})/c_f$ (usually there is a single relevant root).
* $r(T_{\mathrm{em},i})=\|\mathbf X-\mathbf X_s(T_{\mathrm{em},i})\|$.
* $r'(T_{\mathrm{em}})=\dfrac{d}{dT_{\mathrm{em}}}\|\mathbf X-\mathbf X_s(T_{\mathrm{em}})\|=-\,\mathbf{n}(T_{\mathrm{em}})\cdot\mathbf V_s(T_{\mathrm{em}})$.
* $\mathbf V_s(T_{\mathrm{em}})=\dfrac{d\mathbf X_s}{dT_{\mathrm{em}}}$ is the source velocity at emission time $T_{\mathrm{em}}$.
* $\mathbf{n}(T_{\mathrm{em}}) = \dfrac{\mathbf X-\mathbf X_s(T_{\mathrm{em}})}{r(T_{\mathrm{em}})}$ is the unit vector pointing from source (at emission) to the field point.

In standard wave-equation solutions, a Jacobian factor $|1 - \mathbf{n}\!\cdot\!\mathbf V_s/c_f|$ arises from the change of variables used to evaluate the path history time delta. In this project’s canonical per-hit law, emission cadence and per-wavefront amplitude are constant and do not depend on emitter speed. The corresponding source-normal denominator is the root-transversality field, while the active received branch strength is the receiver-normal factor $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$ rather than an extra source-amplitude modulation.

### Special simple case — stationary emitter

If $\mathbf X_s(T_{\mathrm{em}})=\mathbf X_0$ (emitter fixed) and $q(T_{\mathrm{em}})=Q\,\delta(T_{\mathrm{em}}-T_{\mathrm{em},0})$ (single wake surface at $T_{\mathrm{em},0}$), then the formula reduces to the intuitive result:

* The field at $(\mathbf X,T)$ is nonzero only when $T-T_{\mathrm{em},0}=\|\mathbf X-\mathbf X_0\|/c_f$, i.e., when the causal wake surface of radius $r=c_f(T-T_{\mathrm{em},0})$ reaches $\mathbf X$.
* The amplitude is $\displaystyle \phi(\mathbf X,T) = \frac{Q}{4\pi\,r}$ (no extra Jacobian factor because $v_s=0$).

### How wake surfaces show up here

* Each emitted wake surface corresponds to one emission time $T_{\mathrm{em}}$. The delta in the Green’s function selects the observation times $T$ at which the wake surface reaches $\mathbf X$.
* The shape of the contribution is the $1/(4\pi r)$ geometric factor for wave amplitude; the wake surface is thin in time if $q(T_{\mathrm{em}})$ is a delta in $T_{\mathrm{em}}$, so the receiver gets a short impulse when the wavefront passes.

### Handling an emitter that stops / $\|\mathbf V_s\|\to 0$

* If the emitter slows or stops, the Jacobian factor $1 - \mathbf{n}\cdot\mathbf V_s/c_f$ tends to 1 and nothing singular happens. The path-history equation still has a solution and each wake surface arrives at the predicted time.
* If the emitter sits still and emits many wake surfaces (continuous $q(T_{\mathrm{em}})$), the field is the time integral (or sum) of all wake surface contributions evaluated at their respective causal times. No $1/\|\mathbf V_s\|$ blowup occurs.

---





## Event-driven Radial-Transport + Per-Hit EOM (Canonical Method)

Physical idea: represent emission as a conserved, razor-thin causal wake surface (a measure on the causal isochron), then drive particle motion by summing line-of-action per-hit accelerations with receiver-normal branch strength at causal intersection times. We work in units with field speed $v=1$ unless noted; replace $v$ by $c_f$ otherwise.

Field representation (transport/continuity form)
- Source impulse at $(T_{\mathrm{em}},\mathbf X_0)$ creates a wake surface supported on $r = v(T-T_{\mathrm{em}})$ with surface density that conserves a constant per-wake surface amplitude $q$:
  $$
  \rho(T,\mathbf X) \;=\; \frac{q}{4\pi r^2}\,\delta\!\big(r - v(T-T_{\mathrm{em}})\big)\,H(T-T_{\mathrm{em}}),\quad r=\|\mathbf X-\mathbf X_0\|
  $$
- This solves the radial continuity (transport) equation
  $$
  \partial_T \rho + \nabla_{\mathbf X}\!\cdot\!\big(v\,\hat{\mathbf{r}}\,\rho\big) \;=\; q\,\delta(T-T_{\mathrm{em}})\,\delta^{(3)}(\mathbf X-\mathbf X_0)
  $$
- Emission is continuous with constant time-density $q(T)\equiv q_0$.

Per-hit equation of motion (EOM)
- For a receiver $o'$ at time $T$ and a source $j$, causal emission times satisfy
  $$
  \|\mathbf X_{o'}(T) - \mathbf X_j(T_{\mathrm{em}})\| = v\,(T-T_{\mathrm{em}}),\qquad T_{\mathrm{em}}<T
  $$
- Each root contributes a line-of-action acceleration
  $$
  \mathbf A_{o'\leftarrow j}(T;T_{\mathrm{em}})
  \;=\;
  \kappa\,\sigma_{q_j q_{o'}}\,\frac{|q_j q_{o'}|}{r^2}\,
  W_{o'j}^{\mathrm{rec}}(T;T_{\mathrm{em}})\,\hat{\mathbf{r}},
  \quad
  \hat{\mathbf{r}}=\frac{\mathbf X_{o'}(T)-\mathbf X_j(T_{\mathrm{em}})}{r},\ r>0
  $$
  with $W_{o'j}^{\mathrm{rec}}=\lvert D_{T,o'j}/D_{s,o'j}\rvert$, $D_{s,o'j}=c_f-\mathbf V_j(T_{\mathrm{em}})\cdot\hat{\mathbf{r}}$, and $D_{T,o'j}=c_f-\mathbf V_{o'}(T)\cdot\hat{\mathbf{r}}$.
  with total acceleration the sum over sources and roots. Convention $H(0)=0$ removes the instantaneous self-kick at $T_{\mathrm{em}}=0$. Optional mollification replaces $\delta(\cdot)$ by $\delta_\eta(\cdot)$ to produce smooth pushes.

Implementation checklist
- Root finding: solve $F(T_{\mathrm{em}};T)=\|\mathbf X_{o'}(T)-\mathbf X_j(T_{\mathrm{em}})\|-v(T-T_{\mathrm{em}})=0$ for all $j$ (including $j=o'$ for self-hits when kinematics permit).
- Accumulation: compute $r,\hat{\mathbf{r}}$, $D_s$, $D_T$, and $W^{\mathrm{rec}}$, apply $W^{\mathrm{rec}}/r^2$, then superpose.
- Time stepping: impulsive mode (events) or mollified mode ($\eta>0$) with standard ODE integrators.
- Self-interaction: appears when the worldline outruns recent wake surfaces ($\|\mathbf V\|>v$ for some emissions); self-hits are repulsive (like-on-like).

Relation to Methods 1 and 2
- This is a transport/continuity model, not the scalar wave equation. The $1/r^2$ factor is a surface-density normalization (Gauss-like on the spherically expanding causal wake surfaces); it is compatible with conserving total emission per wake surface. In Method 2 the $\!1/(4\pi r)$ factor appears for a wave amplitude; taking gradients connects these scalings when mapping to forces.
- The Doppler-type Jacobian $1-\mathbf{n}\!\cdot\!\mathbf V_s/c_f$ from Method 2 is the source-normal branch-transversality factor. Geometric constants are absorbed into $\kappa$ by convention, but the canonical per-hit strength uses the receiver-normal branch factor $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$; no additional source-speed amplitude factor is introduced.
- Numerically, this method targets particle dynamics directly (per-hit ODEs) rather than evolving a full field (Method 1) or evaluating fields at sparse probes (Method 2).

Operator diagnostics (finite-window checks)
- Use vector-calculus identities only on declared, reconstructed diagnostic channels such as $\nabla\Phi_\eta$ or the mollified transport current $\mathbf{J}_\eta=v\,\hat{\mathbf{r}}\,\rho_\eta$. These channels are validation objects, not new substrate ontology.
- For any finite control volume $V\subset\Sigma_T$ with outward unit normal $\hat{\mathbf{n}}$, define the Gauss residual
  $$
  R_G[V,T;\mathbf{Y}_\eta]\equiv
  \frac{\left|\int_{\partial V}\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\,dS-\int_V\nabla\!\cdot\!\mathbf{Y}_\eta\,dV\right|}
  {\int_{\partial V}\left|\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\int_V\left|\nabla\!\cdot\!\mathbf{Y}_\eta\right|\,dV+\varepsilon_G}
  $$
- For any oriented smooth surface $S\subset\Sigma_T$ with boundary $\partial S$, define the Stokes residual
  $$
  R_S[S,T;\mathbf{Y}_\eta]\equiv
  \frac{\left|\oint_{\partial S}\mathbf{Y}_\eta\!\cdot d\mathbf X-\int_S(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\,dS\right|}
  {\oint_{\partial S}\left|\mathbf{Y}_\eta\!\cdot d\mathbf X\right|+\int_S\left|(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\varepsilon_S}
  $$
- PDE and event-root simulations should agree not only pointwise after resampling, but also as operators on finite windows. If $\Delta\mathbf{Y}_\eta=\mathbf{Y}^{\mathrm{PDE}}_\eta-R(\mathbf{Y}^{\mathrm{root}}_\eta)$, use
  $$
  E_{\mathrm{op}}(V,S,T)\equiv
  \max\!\left\{R_G[V,T;\Delta\mathbf{Y}_\eta],\,R_S[S,T;\Delta\mathbf{Y}_\eta]\right\}
  $$
  For the conservative potential channel $\mathbf{Y}_\eta=\nabla\Phi_\eta$, nonzero circulation is a numerical, boundary, or coordinate-operator error unless a non-gradient effective channel has been explicitly declared.

Plain language: treat the potential contribution as a conserved amount spread over a growing causal wake surface. When a wake surface reaches a receiver, the receiver gets a straight-line push that falls off like $1/r^2$; the calculation may treat it as a sharp kick or as a short, smooth nudge.

## Cross-Method Guidance

### Cross-Method Selection
- Method 1 (PDE): whole-field grid simulations, visualization, and complex media/boundaries. Deposit a smeared source each step; robust when an emitter slows or stops. Aggregate particle data to coarse-grained densities $n(\mathbf X,T)$, $\rho(\mathbf X,T)$, and $\mathcal E(\mathbf X,T)$ as inputs/targets for PDE runs and validation.
- Method 2 (Green’s function / path-history integral): closed forms and sparse probe evaluation. Enforce the path-history condition $T-T_{\mathrm{em}}=\|\mathbf X-\mathbf X_s(T_{\mathrm{em}})\|/c_f$ and handle the geometric factor $1-\mathbf{n}\cdot\mathbf V_s/c_f$ during evaluation; root-solve one or more $T_{\mathrm{em}}$ values per observer-time pair.
- Method 3 (Event-driven canonical): production many-body dynamics. Find causal roots and sum per-hit $W^{\mathrm{rec}}/r^2$ pushes; prefer $\eta$-mollified mode for smooth ODEs when needed.

Short worked example — stationary emitter, continuous source (consistent across methods)
- Setup: emitter at origin $\mathbf X_s=0$ with $q(T)\equiv q_0$ (constant).
- Method 1: solving the wave PDE with $S(\mathbf X,T)=q_0\,\delta(\mathbf X)$ reproduces the same spherical profile $\phi(r,T)=q_0/(4\pi r)$ on the outgoing wavefront.
- Method 2: the path-history formula gives $\displaystyle \phi(r,T)=\frac{q_0}{4\pi r}$ with the path-history time $T_{\mathrm{em}}=T-r/c_f$.
- Method 3: the path-history condition selects the single causal time $T_{\mathrm{em}}=T-r/c_f$; the per-hit EOM yields one radial push along $\hat{\mathbf{r}}$ with $1/r^2$ scaling, consistent with taking spatial gradients of the $1/r$ potential to connect amplitude to force.

Practical implementation notes (concise)
- PDE: smear $\delta(\mathbf X-\mathbf X_s)$ to grid scale; enforce CFL ($c_f\,\Delta T/\Delta X$ within the scheme’s bound).
- Path-history: robust root-finding for $T_{\mathrm{em}}$ from $T-T_{\mathrm{em}}=r(T_{\mathrm{em}})/c_f$; take care near grazing geometries where $1-\mathbf{n}\cdot\mathbf V_s/c_f$ is small.
- Event-driven: bracket causal roots for continuity, optionally use $\delta_\eta$ for smooth pushes, and limit step sizes so only a controlled number of mollified wake surfaces overlap.

### Operational Summary
- Model sources as $S(\mathbf X,T)=q(T)\,\delta\!\big(\mathbf X-\mathbf X_s(T)\big)$ (time-based emission density).
- Use Method 3 as the primary dynamics engine; use Method 2 for calibration/spot checks; use Method 1 for whole-field/media studies.
- All three agree on simple stationary cases; they differ mainly in computational scope: grids (1), closed-form probes (2), and event-driven ODEs (3).

---

## Differential analysis (criteria-by-criteria)

Axiomatic fidelity (delayed-only, line-of-action, constant source emission)
- Method 1: Partially aligned. The PDE yields $1/(4\pi r)$ wave amplitudes; mapping to $1/r^2$ per-hit accelerations requires gradients and conventions. Radial-only action is not built-in.
- Method 2: Causality and superposition are exact; amplitudes are $1/(4\pi r)$ with a source-normal Jacobian $\left|1-\mathbf{n}\cdot\mathbf V_s/c_f\right|^{-1}$ when evaluating the path-history time delta. The canonical law keeps the corresponding source-normal denominator as root-transversality data, while received force magnitude uses $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$ and overall geometric normalizations are absorbed into $\kappa$ when comparing accelerations.
- Method 3: Exact match. Delayed-only, line-of-action per-hit with constant source emission is native, and the receiver-normal branch strength appears explicitly in the received force magnitude. Geometric normalizations are conventionally absorbed into $\kappa$.

Causal root structure, self-interaction, multiplicity
- Method 1: Self-hits and multiple roots are implicit in the evolving field; they are not directly enumerated as discrete events.
- Method 2: Causal roots arise via solving $T-T_{\mathrm{em}}=r(T_{\mathrm{em}})/c_f$; multiple roots and tangencies are explicit but require robust root-finding.
- Method 3: Roots are primitive; multi-hit and self-hit regimes are treated natively. Conventions H(0)=0 and exclusion of $r=0$ beyond $T_{\mathrm{em}}=0$ are explicit.

Energetics and work
- Method 1: Continuum energy bookkeeping is natural ($\phi$, $\partial_T\phi$, $\nabla_{\mathbf X}\phi$). Mapping to radial per-hit work needs careful averaging and alignment with the EOM.
- Method 2: Exact potentials in free space; gradients give forces; care is needed near $\left|1-\mathbf{n}\cdot\mathbf V_s/c_f\right|\to0$ geometries.
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
- Method 1: Natural—modify PDE coefficients (inhomogeneous $c_f$, damping, boundaries).
- Method 2: Natural only in homogeneous free space; complex media/boundaries require bespoke Green’s functions.
- Method 3: Natural in free space. Media/boundaries need additional modeling (e.g., corridor-level effective rules); not PDE-native.

### Observables and Inference
- Method 1: Full-field pictures aid intuition and corridor studies but obscure per-hit ambiguity without extra processing.
- Method 2: Clarifies causal timing and geometry at probes; good for inference templates and surrogate-location recasts.
- Method 3: Directly aligned with hit histories {A(T_k), L(T_k)}; best substrate for event-driven inference and assembly dynamics.

Summary (one line each)
- Method 1: Best for whole-field, media, and visualization; poorest fit to per-hit radial-only axioms without translation layers.
- Method 2: Best for exact, pointwise, causal analysis in free space; good for calibration and sparsely sampled validation.
- Method 3: Best for dynamics of many particles/assemblies under the canonical law; scales and matches axioms directly.

Operational guidance — when to use which method
- Method 1 (PDE): use this for whole-field grid simulations, visualization, and complex media or boundaries; step the wave PDE forward with a smeared source. Robust when an emitter slows or stops.
- Method 2 (Path history integral): use this for closed forms, analytic insight, or sparse probe evaluation; enforce the path-history condition $T-T_{\mathrm{em}}=\|\mathbf X-\mathbf X_s(T_{\mathrm{em}})\|/c_f$ and handle the geometric factor $1-\mathbf{n}\cdot\mathbf V_s/c_f$ in evaluation; solve one root per observer-time pair in slow-motion, more if sources move fast.
- Method 3 (Event-driven canonical): use this for production many-body dynamics; find causal roots and sum per-hit $W^{\mathrm{rec}}/r^2$ pushes; prefer $\eta$-mollified mode for smooth ODEs when needed.

## Pros and cons (comparative)

Method 1 — Time-based PDE (wave equation)
- Pros
- Physically standard propagation at fixed speed $c_f$; expanding causal wake surfaces emerge automatically.
  - Robust on grids; handles inhomogeneous media, damping, and boundaries.
  - Good for full-field visualization and energy bookkeeping in continuum form.
- Cons
  - Computationally heavy for many-particle dynamics (3D grids, CFL constraints).
  - Requires careful numerics to avoid dispersion/reflection; mesh choices can bias results.
  - Mapping grid fields to the radial-only per-hit ODE can add another modeling layer.

Method 2 — Green’s function (path-history integral)
- Pros
  - Exact in homogeneous free space; no grid or time stepping for the field.
  - Makes causality explicit via path-history times; captures Doppler/Jacobian $1-\mathbf{n}\!\cdot\!\mathbf V_s/c_f$ automatically.
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
  - Must retain the source-normal denominator and receiver-normal branch strength from the Master EOM; a reduced test harness that omits either one is a noncanonical approximation rather than a calibration of $\kappa$.
  - Accuracy depends on robust causal-root finding and regularization choices in complex multi-hit scenarios.

---

## Recommendation

- Use Method 3 as the primary engine for particle dynamics and assemblies. It matches the model’s axioms (radial-only action, constant emission cadence) and scales well.
- Adopt Method 2 as the analytic reference for calibration and validation. Calibrate $\kappa$ so simple benchmarks (stationary/slow sources, symmetric binaries) agree between Methods 2 and 3 at the per-hit level; do not introduce any per-hit emitter-speed weighting.
- Baseline formula (stationary emitter at origin): with $q(T)\equiv q_0$, $\displaystyle \phi(r,T)=\frac{q_0}{4\pi r}$ since the path history condition selects $T_{\mathrm{em}}=T-r/c_f$; if $q$ varies, $\displaystyle \phi(r,T)=\frac{q(T-r/c_f)}{4\pi r}$.
- Reserve Method 1 for full-field studies (visualization, media, boundary effects) and for end-to-end tests of numerical stability; it is valuable but unnecessary for routine ODE-based assembly simulations.
- Documentation/actionables: keep the continuity-form field definition and per-hit EOM as the canonical statement; add a brief appendix mapping densities (Method 3) to potentials (Method 2) to clarify when $1/r$ vs $1/r^2$ factors appear and how calibration preserves totals.
- Numerical cautions:
  - Always smear $\delta(\mathbf X-\mathbf X_s)$ to a normalized kernel of width $\sigma$ comparable to the grid spacing in PDE runs to avoid grid-scale artifacts.
  - Enforce CFL: choose $\Delta T$ so that $c_f\,\Delta T/\Delta X$ meets the stability bound for the chosen stencil to prevent instability.
  - Path history solving: solve $T-T_{\mathrm{em}}=r(T_{\mathrm{em}})/c_f$ carefully; near $\|\mathbf V_s\|\approx c_f$, root finding and the factor $1-\mathbf{n}\cdot\mathbf V_s/c_f$ require extra care.
  - Finite temporal thickness: if wake surfaces have duration, replace $\delta(T-T_{\mathrm{em}})$ with a smooth profile to model finite-width wavefronts.

Plain language: use the event-driven, radial-only method for dynamics, check it against the path-history integral to calibrate parameters, and use the PDE only when the calculation needs whole-field pictures or complex media.

Recap (in three lines)
- Model sources as $S(\mathbf X,T)=q(T)\,\delta\!\big(\mathbf X-\mathbf X_s(T)\big)$ (time-based emission density).
- Method 1: easiest for grid-based whole-field runs; wake surfaces emerge at speed $c_f$.
- Method 2: exact path-history formula; contributions occur only when $T-T_{\mathrm{em}}=\|\mathbf X-\mathbf X_s(T_{\mathrm{em}})\|/c_f$, with amplitude decaying as $1/(4\pi r)$ and a geometric $1-\mathbf{n}\cdot\mathbf V_s/c_f$ factor in evaluation.

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
