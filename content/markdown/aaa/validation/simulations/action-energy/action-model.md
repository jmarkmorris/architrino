# Action Model Comparison

This note compares three modeling options for the emission-propagation-interaction pipeline and recommends a primary approach, with supporting roles for the others. We work in normalized wake-speed units with $c_f=1$ unless stated otherwise; emission cadence and per-wavefront amplitude are constant at the transmitter; per-hit accelerations are directed along $\hat{\mathbf{r}}$ with inverse-square geometric decay and transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$; $H(0)=0$ excludes the coincident-time self-kick; no cross products or right-hand-rule terms appear.

---

**Setup / assumptions**

* The transmitter is at position $\mathbf X_t(T)$ in 3-D space and may move.
* The transmitter emits **thin causal wake surfaces**. Each wake surface is created at a single instant $T_t$ and then expands outward **spherically** from the creation point.
* The wake surface radius after emission time $T_t$ is

  $$
  r(T,T_t) = c_f\,(T-T_t) \quad \text{for } T\ge T_t
  $$

  where $c_f$ is the constant **field speed**.
* Each emitted wake surface carries a **strength** $Q$, interpreted here as wake-surface amplitude. Its physical bookkeeping role depends on the comparison target: polarity, potential impulse, energy, or another declared quantity.
* Continuous source term (preferred): model the transmitter as a moving point injection with time-density $q(T)$ (amplitude per unit time) at its instantaneous position, i.e., $S(\mathbf X,T)=q(T)\,\delta\!\big(\mathbf X-\mathbf X_t(T)\big)$. Each instant $T_t$ contributes a causal wake surface; we do not count “wake surfaces per second” (pulse trains are merely numerical surrogates).
* The diagnostic target is the effective scalar potential $\phi(\mathbf X,T)$ produced at any point $\mathbf X$ and time $T$.
* Global neutrality (working hypothesis): on large scales the total architrino polarity inventory sums to zero (equal counts of $\pm\epsilon$); use this as the default boundary condition in PDE/Green’s-function comparisons.

We compare three frameworks: (1) a time-domain PDE source term, (2) an integral/Green's-function path-history solution, and (3) event-driven radial transport plus the per-hit EOM. For each, we define symbols, show how the expanding causal wake surfaces appear, discuss how slowing or stopping the transmitter is handled, and weigh trade-offs to inform a recommendation.

---

## Time-based PDE (wave equation with a moving point source term)

**Physical idea:** keep the mathematical source term as an injection per unit time at the transmitter location, put that into a PDE surrogate for causal wake propagation at speed $c_f$, and let the PDE produce expanding spherical causal wake surfaces. This is a standard grid formulation; its cost and accuracy still have to be measured for the declared domain and resolution.

### PDE model

Use the scalar wave equation as a continuum comparison surrogate for finite-speed causal-wake reconstruction. The source normalization below is chosen so its free-space Green function has the $1/(4\pi r)$ convention used later:

$$
\boxed{\;\frac{\partial^2 \phi}{\partial T^2}(\mathbf X,T) - c_f^2 \,\nabla^2 \phi(\mathbf X,T) \;=\; c_f^2 S(\mathbf X,T)\;}
$$

**Symbols**

* $\phi(\mathbf X,T)$: scalar potential surrogate at position $\mathbf X\in\mathbb{R}^3$ and time $T$.
* $c_f$: field propagation speed (units length/time).
* $\nabla^2$: Laplacian operator in space (sums second spatial derivatives).
* $S(\mathbf X,T)$: source term (right-hand side) — this is how the transmitter injects wake surfaces into the field.

### Moving point source-term form

Use a continuous time-density of emission at the moving point:

$$
S(\mathbf X,T) \;=\; q(T)\,\delta\!\big(\mathbf X-\mathbf X_t(T)\big)
$$

Here $q(T)$ has units “amplitude per unit time.” The finite-speed wave operator then generates outgoing spherical causal wake surfaces automatically; no discrete wake surface count is assumed.

**How expanding causal wake surfaces appear**

* The source term does not explicitly insert a radius into the right-hand side. Instead, the PDE and the finite speed $c_f$ cause any instantaneous injection at the point $\mathbf X_t(T_t)$ to produce an outgoing spherical causal wake surface whose front moves outward at speed $c_f$. That is the built-in behavior of the wave-equation surrogate.
* The Green’s function ensures that, at $(\mathbf X,T)$, only simple causal roots satisfying $T-T_t=r(T_t)/c_f$ contribute. A moving or super-field-speed transmitter can supply more than one such root. Thus Method 1 with $S(\mathbf X,T)=q(T)\delta(\mathbf X-\mathbf X_t(T))$ yields finite-speed outgoing support, while the root multiplicity remains part of the path-history geometry.

**Why $\|\mathbf V\|$ (transmitter speed) does not cause blow-ups**

* If the transmitter slows or stops, $S(\mathbf X,T)$ remains nonzero at the same spatial location; the wave equation spreads each injection outward at speed $c_f$. No $1/\|\mathbf V\|$ singularity appears because the formulation does not convert from per-time emission to per-distance emission.
* Numerically, represent the point delta by a small, smooth kernel when avoiding grid artifacts. For example, instead of $\delta(\mathbf X-\mathbf X_t)$ use a small Gaussian of width $\sigma$ comparable to grid spacing.

**Numerical recipe (simple)**

* Choose spatial grid $\mathbf X_i$ and time step $\Delta T$ satisfying CFL stability (roughly $c_f\Delta T/\Delta X \le \text{const}$).
* Use a standard finite-difference time stepping for the wave equation (centered difference in time and space).
* At each time step $T_n$ add the source contribution $S(\cdot,T_n)$ to the right-hand side at the grid cells nearest $\mathbf X_t(T_n)$. If the transmitter stops, it remains injecting at that grid location—the solver propagates outgoing wake surfaces.
* To avoid a numerical spike, spread the delta over a few cells with a mollifier, representing a thin wake surface of finite thickness.

**Summary for Method 1**

* Model is explicit, straightforward, numerically robust.
* Emission is naturally time-based; wake surfaces expand automatically at speed $c_f$.
* No division by transmitter speed appears; stopping the transmitter is handled simply by keeping the source term at the same location.

---

## Integral (Green’s function / path-history potential) approach

**Physical idea:** instead of evolving a PDE in time, write the solution as the sum of contributions from every past emission. For the wave equation the contribution from an impulse emitted at time $T_t$ and place $\mathbf X_t(T_t)$ arrives at a field point $\mathbf X$ only at the **path-history time** when the causal wake surface reaches $\mathbf X$. The Green’s function neatly encodes the expanding causal wake surface.

### Fundamental formula (general)

If the wave equation is

$$
\frac{\partial^2 \phi}{\partial T^2} - c_f^2 \nabla^2 \phi = c_f^2 S(\mathbf X,T)
$$

then the solution may be written as the space–time convolution with the Green’s function $G$:

$$
\boxed{\;\displaystyle \phi(\mathbf X,T)
\;=\;
\iint G\big(\mathbf X,T;\mathbf Y,T_t\big)\;S(\mathbf Y,T_t)\;dT_t\,d^3Y\;}
$$

* $G(\mathbf X,T;\mathbf Y,T_t)$ is the response at $(\mathbf X,T)$ to an instantaneous unit impulse at $(\mathbf Y,T_t)$.

### The 3-D free-space wave Green’s function

For three spatial dimensions (the usual case for causal wake surfaces), the causal Green’s function is

$$
G(\mathbf X,T;\mathbf Y,T_t)
\;=\;
\frac{\delta\!\big(T-T_t - \tfrac{\|\mathbf X-\mathbf Y\|}{c_f}\big)}{4\pi\,\|\mathbf X-\mathbf Y\|},
\qquad T>T_t
$$

**Interpretation:** a unit impulse at location $\mathbf Y$ and time $T_t$ influences $\mathbf X$ at time $T$ only when the travel time $\|\mathbf X-\mathbf Y\|/c_f$ has elapsed; the $1/(4\pi r)$ factor is the usual geometric decay of an outgoing spherical wave in 3D.

### Plugging in a moving point source term

If the transmitter supplies a moving point source term with time-dependent amplitude $q(T_t)$ at location $\mathbf X_t(T_t)$, then $S(\mathbf Y,T_t)= q(T_t)\,\delta(\mathbf Y-\mathbf X_t(T_t))$. Plugging this into the convolution gives an integral over $T_t$ only:

$$
\boxed{\;\displaystyle
\phi(\mathbf X,T) \;=\; \int_{-\infty}^{T}
\frac{q(T_t)\;
\delta\!\big(T-T_t - \tfrac{\|\mathbf X-\mathbf X_t(T_t)\|}{c_f}\big)}
{4\pi\,\|\mathbf X-\mathbf X_t(T_t)\|}\; dT_t\;}
$$

* $q(T_t)$ is the continuous emission density per unit time at the emission instant $T_t$. For a steady transmitter, $q(T_t)=q_0$ (constant); more generally, $q$ may vary smoothly with $T_t$.

### Evaluating the integral — the path-history time

The $\delta$-function in the integrand enforces the *path-history-time condition*:

$$
T-T_t=\frac{r(T_t)}{c_f}, \qquad r(T_t)\equiv\|\mathbf X-\mathbf X_t(T_t)\|
$$

So the contribution to $\phi(\mathbf X,T)$ comes only from times $T_t$ such that the expanding causal wake surface emitted at $T_t$ has just reached $\mathbf X$ at time $T$.

Mathematically, use the identity $\delta(g(T_t))=\sum_i \delta(T_t-T_{t,i})/|g'(T_{t,i})|$ where $T_{t,i}$ are simple roots of $g$. With $g(T_t)=T-T_t - r(T_t)/c_f$ we find (after algebra) the standard path-history solution:

$$
\boxed{\;
\phi(\mathbf X,T) \;=\; \sum_{T_{t,i}}
\frac{q(T_{t,i})}{4\pi\,r(T_{t,i})\,\big|1 + \tfrac{1}{c_f}\,r'(T_{t,i})\big|}
\;=\;
\sum_{T_{t,i}}
\frac{q(T_{t,i})}{4\pi\,r(T_{t,i})\,\big|1 - \tfrac{\mathbf{n}(T_{t,i})\cdot\mathbf V_t(T_{t,i})}{c_f}\big|}\;}
$$

where:

* the sum runs over **path-history times** $T_{t,i}$ solving $T-T_{t,i}=r(T_{t,i})/c_f$ (usually there is a single relevant root).
* $r(T_{t,i})=\|\mathbf X-\mathbf X_t(T_{t,i})\|$.
* $r'(T_t)=\dfrac{d}{dT_t}\|\mathbf X-\mathbf X_t(T_t)\|=-\,\mathbf{n}(T_t)\cdot\mathbf V_t(T_t)$.
* $\mathbf V_t(T_t)=\dfrac{d\mathbf X_t}{dT_t}$ is the transmitter velocity at emission time $T_t$.
* $\mathbf{n}(T_t) = \dfrac{\mathbf X-\mathbf X_t(T_t)}{r(T_t)}$ is the unit vector pointing from the transmitter at emission to the field point.

In standard wave-equation solutions, a Jacobian factor $|1 - \mathbf{n}\!\cdot\!\mathbf V_t/c_f|$ arises from the change of variables used to evaluate the path-history-time delta. In this project's canonical per-hit law, emission cadence and per-wavefront amplitude are constant and do not depend on transmitter speed. The same transmitter-side factor controls root transversality, while the active acceleration weight is $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$. The receiver-side factor $D_r$ is retained separately for signed root playback; it does not multiply the instantaneous acceleration.

### Special simple case — stationary transmitter

If $\mathbf X_t(T_t)=\mathbf X_0$ (transmitter fixed) and $q(T_t)=Q\,\delta(T_t-T_{t,0})$ (single wake surface at $T_{t,0}$), then the formula reduces to the intuitive result:

* The field at $(\mathbf X,T)$ is nonzero only when $T-T_{t,0}=\|\mathbf X-\mathbf X_0\|/c_f$, i.e., when the causal wake surface of radius $r=c_f(T-T_{t,0})$ reaches $\mathbf X$.
* The amplitude is $\displaystyle \phi(\mathbf X,T) = \frac{Q}{4\pi\,r}$ (no extra Jacobian factor because $v_s=0$).

### How wake surfaces show up here

* Each emitted wake surface corresponds to one emission time $T_t$. The delta in the Green’s function selects the observation times $T$ at which the wake surface reaches $\mathbf X$.
* The shape of the contribution is the $1/(4\pi r)$ geometric factor for wave amplitude; the wake surface is thin in time if $q(T_t)$ is a delta in $T_t$, so the receiver gets a short impulse when the wavefront passes.

### Handling a transmitter that stops / $\|\mathbf V_t\|\to 0$

* If the transmitter slows or stops, the Jacobian factor $1-\mathbf n\cdot\mathbf V_t/c_f$ tends to $1$ and nothing singular happens. The path-history equation still has a solution and each wake surface arrives at the predicted time.
* If the transmitter sits still and emits many wake surfaces (continuous $q(T_t)$), the field is the time integral or sum of all wake-surface contributions evaluated at their respective causal times. No $1/\|\mathbf V_t\|$ blowup occurs.

---





## Event-driven Radial-Transport + Per-Hit EOM (Canonical Method)

Physical idea: represent emission as a conserved, razor-thin causal wake surface (a measure on the causal isochron), then drive particle motion by summing line-of-action per-hit accelerations with transmitter-side acceleration weight at causal intersection times. Numerical instantiations use $c_f=1$; symbolic derivations retain $c_f$ where its dependence matters.

Field representation (transport/continuity form)
- Source impulse at $(T_t,\mathbf X_0)$ creates a wake surface supported on $r = c_f(T-T_t)$ with surface density that conserves a constant per-wake surface amplitude $q$:
  $$
  \rho(T,\mathbf X) \;=\; \frac{q}{4\pi r^2}\,\delta\!\big(r - c_f(T-T_t)\big)\,H(T-T_t),\quad r=\|\mathbf X-\mathbf X_0\|
  $$
- This solves the radial continuity (transport) equation
  $$
  \partial_T \rho + \nabla_{\mathbf X}\!\cdot\!\big(c_f\,\hat{\mathbf{r}}\,\rho\big) \;=\; q\,\delta(T-T_t)\,\delta^{(3)}(\mathbf X-\mathbf X_0)
  $$
- A continuous emission density is obtained by integrating these impulse responses over $T_t$ with $q(T_t)\equiv q_0$.

Per-hit equation of motion (EOM)
- For a receiver $o'$ at reception time $T_r$ and a transmitter $j$, causal emission times satisfy
  $$
  \|\mathbf X_{o'}(T_r) - \mathbf X_j(T_t)\| = c_f\,(T_r-T_t),\qquad T_t<T_r
  $$
- Each root contributes a line-of-action acceleration
  $$
  \mathbf A_{o'\leftarrow j}(T_r;T_t)
  \;=\;
  \kappa\,\sigma_{q_j q_{o'}}\,\frac{|q_j q_{o'}|}{r^2}\,
  W_{o'j}^{\mathrm{acc}}(T_r;T_t)\,\hat{\mathbf{r}},
  \quad
  \hat{\mathbf{r}}=\frac{\mathbf X_{o'}(T_r)-\mathbf X_j(T_t)}{r},\ r>0
  $$
  with $W_{o'j}^{\mathrm{acc}}=c_f/\lvert D_{t,o'j}\rvert$, $D_{t,o'j}=c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf{r}}$, and $D_{r,o'j}=c_f-\mathbf V_{o'}(T_r)\cdot\hat{\mathbf{r}}$. Total acceleration is the sum over transmitters and roots. Convention $H(0)=0$ removes the instantaneous self-kick at zero delay. Optional mollification replaces $\delta(\cdot)$ by $\delta_\eta(\cdot)$ to produce smooth acceleration contributions.

Implementation checklist
- Root finding: solve $F(T_t;T_r)=\|\mathbf X_{o'}(T_r)-\mathbf X_j(T_t)\|-c_f(T_r-T_t)=0$ for all transmitters $j$ (including $j=o'$ for self-hits when kinematics permit).
- Accumulation: compute $r,\hat{\mathbf{r}}$, $D_t$, $D_r$, and $W^{\mathrm{acc}}$, apply $W^{\mathrm{acc}}/r^2$, then superpose.
- Time stepping: impulsive mode (events) or mollified mode ($\eta>0$) with a delayed-history integrator that retains and interpolates the required path segment.
- Self-interaction: a super-field-speed history interval nominates the channel, but an admitted self-hit still requires a nonzero-delay same-transmitter root and the declared branch floors; accepted self-hits are repulsive (like-on-like).

Relation to Methods 1 and 2
- This is a transport/continuity model, not the scalar wave equation. The $1/r^2$ factor is a surface-density normalization (Gauss-like on the spherically expanding causal wake surfaces); it is compatible with conserving total emission per wake surface. In Method 2 the $\!1/(4\pi r)$ factor appears for a wave amplitude; taking gradients connects these scalings when mapping to accelerations.
- The Doppler-type Jacobian $1-\mathbf{n}\!\cdot\!\mathbf V_t/c_f$ from Method 2 is the transmitter-side branch-transversality factor. Geometric constants are absorbed into $\kappa$ by convention, but the canonical per-hit strength uses the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$; no additional transmitter-speed amplitude factor is introduced.
- Numerically, this method targets particle dynamics directly (per-hit ODEs) rather than evolving a full field (Method 1) or evaluating fields at sparse probes (Method 2).

Operator diagnostics (finite-window checks)
- Use vector-calculus identities only on declared, reconstructed diagnostic channels such as $\nabla\Phi_\eta$ or the mollified transport current $\mathbf{J}_\eta=c_f\,\hat{\mathbf{r}}\,\rho_\eta$. These channels are validation objects, not new substrate ontology.
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
- A PDE surrogate and event-root reconstruction are comparable only after a common observable map, normalization, boundary condition, and regulator have been declared. Their agreement then tests the implementations of that declared map; it is not independent evidence for the canonical acceleration law. If $\Delta\mathbf{Y}_\eta=\mathbf{Y}^{\mathrm{PDE}}_\eta-R(\mathbf{Y}^{\mathrm{root}}_\eta)$, use
  $$
  E_{\mathrm{op}}(V,S,T)\equiv
  \max\!\left\{R_G[V,T;\Delta\mathbf{Y}_\eta],\,R_S[S,T;\Delta\mathbf{Y}_\eta]\right\}
  $$
  For the conservative potential channel $\mathbf{Y}_\eta=\nabla\Phi_\eta$, nonzero circulation is a numerical, boundary, or coordinate-operator error unless a non-gradient effective channel has been explicitly declared.

Plain language: treat the potential contribution as a conserved amount spread over a growing causal wake surface. When a wake surface reaches a receiver, the receiver gets a straight-line push that falls off like $1/r^2$; the calculation may treat it as a sharp kick or as a short, smooth nudge.

## Cross-Method Guidance

### Cross-Method Selection
- Method 1 (PDE): whole-field grid simulations, visualization, and complex media/boundaries. Deposit a smeared source term each step; robust when a transmitter slows or stops. Aggregate particle data to coarse-grained densities $n(\mathbf X,T)$, $\rho(\mathbf X,T)$, and $\mathcal E(\mathbf X,T)$ as inputs/targets for PDE runs and validation.
- Method 2 (Green’s function / path-history integral): closed forms and sparse probe evaluation. Enforce the path-history condition $T-T_t=\|\mathbf X-\mathbf X_t(T_t)\|/c_f$ and handle the geometric factor $1-\mathbf{n}\cdot\mathbf V_t/c_f$ during evaluation; root-solve one or more $T_t$ values per observer-time pair.
- Method 3 (Event-driven canonical): production many-body dynamics. Find causal roots and sum per-hit $W^{\mathrm{acc}}/r^2$ pushes; prefer $\eta$-mollified mode for smooth ODEs when needed.

Short worked example — stationary transmitter, continuous source term (consistent across methods)
- Setup: transmitter at origin $\mathbf X_t=0$ with $q(T)\equiv q_0$ (constant).
- Method 1: for a source active since $T_0$, solving the wave PDE with $S(\mathbf X,T)=q_0\,\delta(\mathbf X)H(T-T_0)$ gives $\phi(r,T)=q_0H(T-T_0-r/c_f)/(4\pi r)$ under the declared normalization.
- Method 2: the path-history formula gives the same switched-on profile, with the path-history time $T_t=T-r/c_f$ admitted only when $T_t\ge T_0$.
- Method 3: the path-history condition selects the single causal time $T_t=T-r/c_f$; the per-hit EOM yields one radial push along $\hat{\mathbf{r}}$ with $1/r^2$ scaling, consistent with taking spatial gradients of the $1/r$ potential to connect amplitude to acceleration.

Practical implementation notes (concise)
- PDE: smear $\delta(\mathbf X-\mathbf X_t)$ to grid scale; enforce CFL ($c_f\,\Delta T/\Delta X$ within the scheme’s bound).
- Path-history: robust root-finding for $T_t$ from $T-T_t=r(T_t)/c_f$; take care near grazing geometries where $1-\mathbf{n}\cdot\mathbf V_t/c_f$ is small.
- Event-driven: bracket causal roots for continuity, optionally use $\delta_\eta$ for smooth pushes, and limit step sizes so only a controlled number of mollified wake surfaces overlap.

### Operational Summary
- Model the transmitter through the source term $S(\mathbf X,T)=q(T)\,\delta\!\big(\mathbf X-\mathbf X_t(T)\big)$ (time-based emission density).
- Use Method 3 as the primary dynamics engine; use Method 2 for declared-normalization and implementation spot checks; use Method 1 for whole-field or comparison-media studies.
- After the normalization and observable map are fixed, all three coincide on the declared stationary comparison case. That shared construction checks implementation parity, not the truth of the common rule.

---

## Differential analysis (criteria-by-criteria)

Axiomatic fidelity (delayed-only, line-of-action, constant transmitter emission)
- Method 1: Partially aligned. The PDE yields $1/(4\pi r)$ wave amplitudes; mapping to $1/r^2$ per-hit accelerations requires gradients and conventions. Radial-only action is not built-in.
- Method 2: Causality and superposition are exact; amplitudes are $1/(4\pi r)$ with a transmitter-side Jacobian $\left|1-\mathbf{n}\cdot\mathbf V_t/c_f\right|^{-1}$ when evaluating the path-history time delta. The canonical law keeps the corresponding transmitter-side factor as root-transversality data, while received acceleration magnitude uses $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ and overall geometric normalizations are absorbed into $\kappa$ when comparing accelerations.
- Method 3: Exact match. Delayed-only, line-of-action per-hit with constant transmitter emission is native, and the transmitter-side acceleration weight appears explicitly in the received acceleration magnitude. Geometric normalizations are conventionally absorbed into $\kappa$.

Causal root structure, self-interaction, multiplicity
- Method 1: Self-hits and multiple roots are implicit in the evolving field; they are not directly enumerated as discrete events.
- Method 2: Causal roots arise via solving $T-T_t=r(T_t)/c_f$; multiple roots and tangencies are explicit but require robust root-finding.
- Method 3: Roots are primitive; multi-hit and self-hit regimes are treated natively. Conventions H(0)=0 and exclusion of $r=0$ beyond $T_t=0$ are explicit.

Energetics and work
- Method 1: Continuum energy bookkeeping is natural ($\phi$, $\partial_T\phi$, $\nabla_{\mathbf X}\phi$). Mapping to radial per-hit work needs careful averaging and alignment with the EOM.
- Method 2: Exact potentials in free space; gradients give acceleration contributions; care is needed near $\left|1-\mathbf{n}\cdot\mathbf V_t/c_f\right|\to0$ geometries.
- Method 3: Energetics are tested via $\eta$-mollified potentials $\Phi_\eta$ and work–energy residuals on resolved windows. An impulsive $\eta\to0$ claim requires a separate weak-convergence result with stable root identity.

Numerical stability and well-posedness
- Method 1: CFL constraints; dispersion/reflection control needed; robust under regularized sources; well posed on grids.
- Method 2: Stable as an evaluation formula; computational issues concentrate in robust, multi-root solving and handling near-tangency Jacobians.
- Method 3: Event handling or $\eta$-regularization supplies a candidate numerical chart. Well-posedness still requires the declared history class, root floors, continuation bounds, and regulator-refinement checks.

Computational scaling
- Method 1: Work and storage scale with grid volume, spatial resolution, duration, and the CFL-limited step count.
- Method 2: Work scales with receivers × sample times × transmitters × causal roots, plus the cost of root solving.
- Method 3: Work scales with receivers × transmitters × active roots per step and with retained-history reconstruction. Actual wall time and memory must be profiled for the declared implementation.

Boundaries, media, and heterogeneity
- Method 1: Natural for comparison media and boundaries—modify effective coefficients such as $c_{\mathrm{eff}}(\mathbf X,T)$, damping, and boundary data without changing the primitive wake speed $c_f$.
- Method 2: Natural only in homogeneous free space; complex media/boundaries require bespoke Green’s functions.
- Method 3: Natural in free space. Media/boundaries need additional modeling (e.g., corridor-level effective rules); not PDE-native.

### Observables and Inference
- Method 1: Full-field pictures aid intuition and corridor studies but obscure per-hit ambiguity without extra processing.
- Method 2: Clarifies causal timing and geometry at probes; good for inference templates and surrogate-location recasts.
- Method 3: Directly aligned with hit histories $\{A(T_k),L(T_k)\}$ and therefore the most direct substrate representation among these three options.

Summary (one line each)
- Method 1: Best for whole-field, media, and visualization; poorest fit to per-hit radial-only axioms without translation layers.
- Method 2: Best for exact, pointwise analysis of the scalar-wave surrogate in free space; useful for declared-normalization and sparsely sampled implementation checks.
- Method 3: Native choice for many-architrino and assembly dynamics under the canonical law.

Operational guidance — when to use which method
- Method 1 (PDE): use this for whole-field grid simulations, visualization, and complex media or boundaries; step the wave PDE forward with a smeared source term. Robust when a transmitter slows or stops.
- Method 2 (Path history integral): use this for closed forms, analytic insight, or sparse probe evaluation; enforce the path-history condition $T-T_t=\|\mathbf X-\mathbf X_t(T_t)\|/c_f$ and handle the geometric factor $1-\mathbf{n}\cdot\mathbf V_t/c_f$ in evaluation; solve one root per observer-time pair in slow-motion, more if transmitters move fast.
- Method 3 (Event-driven canonical): use this for production many-body dynamics; find causal roots and sum per-hit $W^{\mathrm{acc}}/r^2$ pushes; prefer $\eta$-mollified mode for smooth ODEs when needed.

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
  - Exact for the declared scalar-wave comparison problem in homogeneous free space; no grid or time stepping for that surrogate field.
  - Makes causality explicit via path-history times; captures Doppler/Jacobian $1-\mathbf{n}\!\cdot\!\mathbf V_t/c_f$ automatically.
  - Efficient for field evaluation at a few observation points; excellent for analysis and cross-checks.
- Cons
  - Requires root-finding for each receiver-time pair; multiple roots are possible when transmitters outrun wake surfaces.
  - Costly when many receivers and transmitters are present; bookkeeping grows quickly.
  - Needs careful handling near tangencies (small Jacobians) and in multi-hit/self-hit regimes.

Method 3 — Event-driven radial-transport + per-hit EOM (canonical)
- Pros
  - Directly implements the project’s delayed, radial-only interaction law with constant emission cadence.
  - Natural support for self-hits and superposition; local $1/r^2$ weighting makes nearby coherent roots dominate once the far-field cutoff, screening, cancellation, or summation prescription is declared.
  - Numerically lightweight for particle dynamics; works cleanly with impulsive or mollified ODE integration.
- Cons
  - Not derived from the scalar wave equation; global field-energy accounting is indirect (via mollified potentials).
  - Must retain the transmitter-side factor and transmitter-side acceleration weight from the Master EOM; a reduced test harness that omits either one is a noncanonical approximation rather than a calibration of $\kappa$.
  - Accuracy depends on robust causal-root finding and regularization choices in complex multi-hit scenarios.

---

## Recommendation

- Use Method 3 as the primary engine for architrino and assembly dynamics. It directly implements radial-only action and constant emission cadence.
- Adopt Method 2 as an analytic comparison instrument for the scalar-wave surrogate. Fix normalization on the stationary-transmitter case, then verify that the moving-source Jacobian maps once, and only once, to $W^{\mathrm{acc}}$ under the declared observable map. Because both methods share that map, their agreement is implementation parity rather than an independent oracle.
- Baseline formula (stationary transmitter at origin): with $q(T)\equiv q_0$, $\displaystyle \phi(r,T)=\frac{q_0}{4\pi r}$ since the path-history condition selects $T_t=T-r/c_f$; if $q$ varies, $\displaystyle \phi(r,T)=\frac{q(T-r/c_f)}{4\pi r}$.
- Reserve Method 1 for full-field studies (visualization, media, boundary effects) and for end-to-end tests of numerical stability; it is valuable but unnecessary for routine ODE-based assembly simulations.
- Keep the continuity-form wake definition and per-hit EOM as the canonical statement. Any density-to-potential comparison must declare the operator that maps the $1/r^2$ surface measure to the $1/r$ scalar surrogate, including normalization and boundary conditions.
- Numerical cautions:
  - Always smear $\delta(\mathbf X-\mathbf X_t)$ to a normalized kernel of width $\sigma$ comparable to the grid spacing in PDE runs to avoid grid-scale artifacts.
  - Enforce CFL: choose $\Delta T$ so that $c_f\,\Delta T/\Delta X$ meets the stability bound for the chosen stencil to prevent instability.
  - Path history solving: solve $T-T_t=r(T_t)/c_f$ carefully; near $\|\mathbf V_t\|\approx c_f$, root finding and the factor $1-\mathbf{n}\cdot\mathbf V_t/c_f$ require extra care.
  - Finite temporal thickness: if wake surfaces have duration, replace $\delta(T-T_t)$ with a smooth profile to model finite-width wavefronts.

Plain language: use the event-driven, radial-only method for dynamics, use the path-history integral to check the declared comparison map, and use the PDE when the calculation needs whole-field pictures or explicitly modeled comparison media.

Recap
- Model the transmitter through the source term $S(\mathbf X,T)=q(T)\,\delta\!\big(\mathbf X-\mathbf X_t(T)\big)$ (time-based emission density).
- Method 1: easiest for grid-based whole-field runs; wake surfaces emerge at speed $c_f$.
- Method 2: exact path-history formula; contributions occur only when $T-T_t=\|\mathbf X-\mathbf X_t(T_t)\|/c_f$, with amplitude decaying as $1/(4\pi r)$ and a geometric $1-\mathbf{n}\cdot\mathbf V_t/c_f$ factor in evaluation.

The comparison ends at propagation and acceleration-method selection. Particle-penetration, shielding, neutrino, photon, and dark-sector claims require their own assembly records and observer-level instruments; this method note does not assign those outcomes.
