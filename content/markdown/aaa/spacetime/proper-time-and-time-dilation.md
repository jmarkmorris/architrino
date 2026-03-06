# Proper Time and Time Dilation

**Goal:** Derive the relation between **absolute time** $t$ (used to index $\mathbb{U}_{\text{now}}$, the universe-now state, in the Euclidean void) and the **proper time** $\tau$ measured by physical clocks built from tri‑binary assemblies, and show how GR‑like time dilation and gravitational redshift arise as effective behavior.

We seek a map
$$
\frac{d\tau}{dt} = F\big(\mathbf{v}, n(\mathbf{x}), \Phi_{\text{eff}}(\mathbf{x}), \text{clock geometry}\big)
$$
that reproduces, in the appropriate regime,
$$
\frac{d\tau}{dt} \approx \sqrt{1+\frac{2\Phi_N}{c^2} - \frac{v^2}{c^2}}
$$
and generalizes to strong‑field / high‑velocity conditions.

Notation convention used in this chapter: $n(\mathbf{x})\equiv \rho_{\text{core}}(\mathbf{x})/\rho_{\text{core},0}$ is the canonical medium-density variable.

---

## Conceptual Setup

### Absolute Time vs Proper Time

- **Absolute time $t$** 
 - Fundamental evolution parameter of the architrino universe. 
 - Global, universal, non‑dynamical; used by the $\mathbb{U}_{\text{now}}$ universe-state perspective (simulation clock). 
 - All worldlines are parametrized directly by $t$.

- **Proper time $\tau$** 
 - Time read by a **physical clock**: a bound tri‑binary assembly (e.g., atomic transition, binary oscillation) interacting with the Noether Sea. 
 - Encodes how many internal oscillation cycles occur per unit $dt$.

The fundamental claim is:

> Time “dilation” is not a change in the rate of $t$; it is a change in how fast internal dynamics of assemblies proceed **relative to** $t$, due to motion and medium coupling.

### Clocks as Dynamical Systems

A clock is any assembly with a **stable, countable internal cycle**:

- Minimal model: a tri‑binary Noether core where one binary (typically the middle) serves as the “pendulum.”
- Base frequency $\omega_0$ (or period $T_0 = 2\pi/\omega_0$) is defined for:
 - Clock **at rest** in the absolute frame,
 - In a region of homogeneous Noether Sea density $n=1$ and negligible external gradients.

Proper time is then defined operationally as:
$$
d\tau = \frac{\omega(\text{state})}{\omega_0}\, dt
$$
where $\omega(\text{state})$ is the instantaneous internal oscillation frequency in the actual kinematic and environmental state.

The central problem is to compute $\omega(\mathbf{v},n,\Phi_{\text{eff}})$ from the master dynamics.

---

## Mechanisms for Time Dilation

Two coupled mechanisms change the internal frequency of a tri‑binary clock:

### Kinematic Effect (Velocity Dependence)

When the clock moves with velocity $\mathbf{v}$ relative to the Noether Sea:

1. **Path‑length elongation:** 
 Internal architrinos must traverse longer spatial paths per cycle because the clock’s center of mass is in motion. Even in the clock’s own rest frame, the underlying wake interactions are evaluated in the absolute frame where the worldline is slanted in spacetime.

2. **Finite field speed ($c_f$):** 
 All internal forces are mediated by delayed, radial path‑history interactions at speed $c_f$. Relative motion modifies the set of causal intersection times for self‑hits and partner hits between constituents, stretching the effective interaction delays.

3. **Shape deformation (Lorentz‑link hypothesis):** 
 To remain dynamically stable under increased $|\mathbf{v}|$, the tri‑binary’s outer exclusion surface becomes **oblate**, flattened along the direction of motion:
 - At low $v$, the outer orbit is nearly spherical.
 - As $v\to c_f$, the orbit contracts along $\hat{\mathbf{v}}$ while maintaining transverse dimensions, yielding an ellipsoid with semi‑axes $(a_\perp, a_\perp, a_\parallel)$ and $a_\parallel < a_\perp$.
 - This geometric dilation changes internal path lengths and curvature, lowering $\omega$.

**Kinematic hypothesis:**
$$
\omega(v, n=1) \approx \omega_0 \sqrt{1 - \frac{v^2}{c_f^2}}
\quad \Rightarrow\quad
\frac{d\tau}{dt}\bigg|_{\text{kin}} \approx \sqrt{1 - \frac{v^2}{c_f^2}}
$$
in the regime where the clock’s motion does not significantly disturb the local Noether Sea. We take $c_f = c$ in SI units when comparing to experiments.

### Gravitational Effect (Medium Dependence)

Massive assemblies polarize and densify the surrounding Noether Sea. A clock deeper in this polarized region experiences:

1. **Higher local Noether density $n(\mathbf{x})$ (equivalently higher $\rho_{\text{core}}$):** 
 Interaction delays with the medium (and between internal architrinos via the medium) increase. This acts like an **index of refraction** for all internal processes.

2. **Effective field speed reduction $c_{\text{eff}}(\mathbf{x}) < c_f$:**
 - The propagation of wake influences is slowed in dense regions (more frequent encounters with Noether cores).
 - From the clock’s perspective, every internal force arrives “later” in $t$.

3. **Tidal distortion of tri‑binary geometry:** 
 Gradients in $n$ and the effective potential $\Phi_{\text{eff}}$ compress the tri‑binary differently along radial vs tangential directions. This modifies binary radii and thus frequencies.

**Gravitational hypothesis:**
To first order in the Newtonian potential $\Phi_N(\mathbf{x})$,
$$
\omega(\Phi_N) \approx \omega_0\left(1 + \frac{\Phi_N}{c^2}\right)
\quad \Rightarrow \quad
\frac{d\tau}{dt}\bigg|_{\text{grav}} \approx 1 + \frac{\Phi_N}{c^2},
$$
with the sign convention chosen so that $\Phi_N < 0$ (deeper potential) yields **slower** clocks ($d\tau/dt < 1$), consistent with GR.

### Combined Dilation

In a region with potential $\Phi_N(\mathbf{x})$ and clock velocity $v$ relative to the Noether Sea, we conjecture:
$$
\frac{d\tau}{dt} 
= \frac{\omega(v,\Phi_N,n)}{\omega_0}
\approx \sqrt{1 + \frac{2\Phi_N}{c_f^2} - \frac{v^2}{c_f^2}}
$$
in the weak‑field, low‑velocity limit, with higher‑order corrections ($v^4/c_f^4$, $\Phi_N^2/c_f^4$, cross‑terms) determined by the detailed tri‑binary response. We set $c_f = c$ (SI) when matching to GR benchmarks.

Outside that limit, $F$ will in general deviate from the GR expression and define the theory’s distinctive strong‑field / high‑velocity predictions.

### Effective Energy-Momentum Closure Test

In the same weak-field regime where the clock law is expected to be Lorentz-like, the center-of-mass kinematics should satisfy the effective mass-shell closure
$$
E_{\text{CM}}^2 = p_{\text{CM}}^2 c_{\text{eff}}^2 + M_0^2 c_{\text{eff}}^4,
$$
with $d\tau/dt=\gamma_{\text{eff}}^{-1}$ and
$$
E_{\text{CM}}=\gamma_{\text{eff}}M_0c_{\text{eff}}^2,\qquad
p_{\text{CM}}=\gamma_{\text{eff}}M_0v.
$$
This is a cross-check on the emergent clock model, not an independent axiom at the architrino substrate level.
For definitions and interpretation, see [Effective Energy-Momentum Closure](../dynamics/energy.md#effective-energy-momentum-closure).

### Strong-Field / Horizon Alignment Note

For strong-field interpretation, use the canonical event-horizon alignment condition from
[singularity-resolution](./singularity-resolution.md#canonical-strong-field-alignment-condition).
In this chapter, Planck-scale references inherit that same alignment definition.

---

## Clock Model and Equations of Motion

To close the derivation gap, we now fix an explicit clock model and an explicit observable-extraction map.

### Concrete Tri-Binary Clock State

Use one neutral tri-binary core with six constituent architrinos:
$$
\mathcal{A}=\{i_+,i_-,m_+,m_-,o_+,o_-\},
$$
with charges $q_a=\pm|e/6|$, effective inertial parameters $m_a$, and trajectories $\mathbf{x}_a(t)$.

Define pair-separation vectors
$$
\mathbf{r}_i=\mathbf{x}_{i+}-\mathbf{x}_{i-},\quad
\mathbf{r}_m=\mathbf{x}_{m+}-\mathbf{x}_{m-},\quad
\mathbf{r}_o=\mathbf{x}_{o+}-\mathbf{x}_{o-},
$$
with radii $R_b=|\mathbf{r}_b|$ for $b\in\{i,m,o\}$ and nested ordering
$$
R_i<R_m<R_o.
$$

### Microscopic Evolution Equation (Regularized)

For each $a\in\mathcal{A}$ evolve
$$
m_a\ddot{\mathbf{x}}_a(t)=
\sum_{b\in\mathcal{A}}
\kappa\,\sigma_{ab}|q_aq_b|
\int_{-\infty}^{t}\!dt_0\;
\frac{\hat{\mathbf{r}}_{ab}(t;t_0)}{r_{ab}(t;t_0)^2}\,
\delta_\eta\!\big(r_{ab}(t;t_0)-c_f(t-t_0)\big),
$$
$$
r_{ab}(t;t_0)=\|\mathbf{x}_a(t)-\mathbf{x}_b(t_0)\|,
\qquad
\hat{\mathbf{r}}_{ab}=\frac{\mathbf{x}_a(t)-\mathbf{x}_b(t_0)}{r_{ab}(t;t_0)}.
$$
This is the same $\eta>0$ regularized kernel used in the dynamical chapters.

### Clock Observable and Proper-Time Map

Take the middle binary as the clock channel. Let $\mathbf{e}_1,\mathbf{e}_2$ be an orthonormal basis of the mean orbital plane of $\mathbf{r}_m$, and define phase
$$
\theta_m(t)=\operatorname{atan2}\!\big(\mathbf{r}_m\!\cdot\!\mathbf{e}_2,\mathbf{r}_m\!\cdot\!\mathbf{e}_1\big).
$$
On a window $[t_1,t_2]$, define measured frequency
$$
\omega_{\text{clk}}
=
\frac{\theta_m(t_2)-\theta_m(t_1)}{t_2-t_1}.
$$
For the reference run $(v=0,\Phi_N=0)$, set $\omega_0=\omega_{\text{clk}}^{\text{ref}}$ and define
$$
\frac{d\tau}{dt}\equiv\frac{\omega_{\text{clk}}}{\omega_0}.
$$

### Controlled Perturbation Family

Run the same core under controlled backgrounds:

1. Uniform center-of-mass drift speed $v=|\mathbf{V}_{\text{CM}}|$ through homogeneous medium.
2. Weak static potential background $\Phi_N(\mathbf{x})$ (or $U\equiv-\Phi_N>0$).
3. Weak-field regime constraints: $v^2/c_f^2\ll1$ and $|U|/c_f^2\ll1$.

For each run $j$, record
$$
\left(U_j,\;v_j,\;\omega_j\right),
\qquad
y_j\equiv\frac{\omega_j}{\omega_0}-1.
$$

---

## Derivation Interface and Coefficient Map

This chapter keeps only the symbolic/numeric coefficient interface needed to bridge clock microdynamics to PPN observables.

### Perturbative Expansion (Weak‑field, Low‑velocity)

Linearize each trajectory as $\mathbf{x}_a(t)=\mathbf{x}_a^{(0)}(t)+\delta\mathbf{x}_a(t)$ around the periodic rest solution and expand the extracted clock ratio in
$$
\epsilon_U\equiv U/c_f^2,\qquad \epsilon_v\equiv v^2/c_f^2.
$$

Use the regression model
$$
\frac{\omega}{\omega_0}
=
1-A_U\,\epsilon_U-A_v\,\epsilon_v
+C_2\,\epsilon_U^2
+C_{Uv}\,\epsilon_U\epsilon_v
+C_{v4}\,\epsilon_v^2
+\mathcal{O}(\epsilon^3).
$$

Coefficient extraction from simulation ensemble $\{(U_j,v_j,\omega_j)\}_{j=1}^N$:
$$
\mathbf{y}=X\mathbf{c}+\boldsymbol{\varepsilon},
\qquad
\hat{\mathbf{c}}=(X^\top W X)^{-1}X^\top W\mathbf{y},
$$
with
$$
\mathbf{c}=(A_U,A_v,C_2,C_{Uv},C_{v4})^\top,\quad
y_j=\frac{\omega_j}{\omega_0}-1,
$$
and design row
$$
X_j=\left(-\epsilon_{U,j},\,-\epsilon_{v,j},\,\epsilon_{U,j}^2,\,
\epsilon_{U,j}\epsilon_{v,j},\,\epsilon_{v,j}^2\right).
$$

Estimated covariance:
$$
\mathrm{Cov}(\hat{\mathbf{c}})
=
\hat{s}^2(X^\top W X)^{-1},
\qquad
\hat{s}^2=\frac{\sum_j w_j(y_j-(X\hat{\mathbf{c}})_j)^2}{N-5}.
$$

### Coefficient Targets and PPN Map

In the GR-matching weak-field limit ($c_f=c$), first-order targets are
$$
A_U^\star=1,\qquad A_v^\star=\frac{1}{2}.
$$

For the static branch ($v=0$),
$$
\frac{\omega}{\omega_0}=1-\frac{U}{c_f^2}+C_2\frac{U^2}{c_f^4}+\cdots,
$$
and the PPN map used in `spacetime/ppn-parameters.md` is
$$
\beta_{\mathrm{eff}}=\frac{1+2C_2}{2}.
$$
So the GR target $\beta_{\mathrm{eff}}=1$ implies
$$
C_2^\star=\frac{1}{2}.
$$

The mixed coefficient $C_{Uv}$ is treated as a leakage diagnostic at this order.

Execution protocols, benchmark catalogs, and numeric pass/fail thresholds are defined in:

1. `validation/experiments/*`
2. `validation/constraint-ledger.md`

---

## Failure Conditions and Red Flags

This program fails—and the emergent‑metric project is likely untenable—if any of the following hold:

1. **Incorrect velocity dependence:** 
 - If $T(v)$ cannot be made to fit $\propto \gamma(v)$ without fine‑tuning internal clock geometry or Noether Sea parameters.

2. **Wrong sign or magnitude of gravitational dilation:** 
 - Clocks deeper in a potential must tick slower. Any prediction of faster ticks, or gross magnitude mismatch, is fatal.

3. **Directional anisotropy:** 
 - If $T(v)$ depends measurably on direction in the absolute frame, violating isotropy bounds ($<10^{-16}$ sidereal modulation), the theory contradicts precision Lorentz tests.

4. **Clock‑dependence:** 
 - If different reasonable clock designs (different internal assemblies) yield different $d\tau/dt$ at the same $(v,\Phi_N)$ beyond experimental bounds, the emergent Equivalence Principle fails.

5. **Parameter bloat:** 
 - If matching these effects requires introducing many independent medium parameters ($n$ profiles, ad hoc drag coefficients), the theory’s naturalness score collapses (see).

---

**Deliverable of this document:** 
A concrete definition of **how** to compute $\omega(v,\Phi_{\text{eff}},n)$ for a tri‑binary clock, and a clear expression for $d\tau/dt$ in terms of those quantities.

### Closure Program Interface (clock-to-PPN bridge)

This chapter supplies the fitted coefficient bridge between microscopic clock dynamics and PPN observables.

Given extracted coefficients
$$
\hat{\mathbf{c}}=(\hat A_U,\hat A_v,\hat C_2,\hat C_{Uv},\hat C_{v4}),
$$
map to
$$
\hat\beta_{\mathrm{eff}}=\frac{1+2\hat C_2}{2},
$$
and forward to the PPN decision vector in `spacetime/ppn-parameters.md`.

A compact closure statistic is:
$$
\chi^2_{\mathrm{closure}}=
(\hat{\mathbf{q}}-\mathbf{q}_\star)^\top
\Sigma_q^{-1}
(\hat{\mathbf{q}}-\mathbf{q}_\star),
$$
with
$$
\hat{\mathbf{q}}=(\hat A_U,\hat A_v,\hat\beta_{\mathrm{eff}},\hat C_{Uv}),\qquad
\mathbf{q}_\star=(1,\tfrac12,1,0).
$$
Low $\chi^2_{\mathrm{closure}}$ with no preferred-direction leakage is the acceptance condition for the clock-law sector.
