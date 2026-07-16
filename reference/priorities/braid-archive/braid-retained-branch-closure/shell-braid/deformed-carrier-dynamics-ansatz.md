# Deformed Carrier Dynamics Ansatz

Promotion status: `priority-only`. This packet develops low-order deformed support-band carrier ansatzes after the rigid zero-offset octahedral row in [octahedral-carrier-worked-example.md](octahedral-carrier-worked-example.md) fails the neutral tangential-residual screen. It is theorem-target material only. It does not promote a retained shell braid branch, a spinor proof, a mass map, observer exports, or a migration path into `content/markdown/aaa`.

Claim level: deformation search packet. A candidate row becomes retention material only if the same branch data close the support-band, speed, phase-lock, noncollision, active causal-root, Jacobian-floor, tangential-residual, energy/action, angular-momentum, exposure, and event-ledger rows required in [Shell Braid Branch Mathematics](shell-braid-branch-mathematics.md) and [topological-carrier-and-spin-targets.md](topological-carrier-and-spin-targets.md).

---

## 1. Baseline And Deformation Margins

Use the rigid octahedral row as the reference trajectory:

$$
\mathbf{x}_{a,\sigma}^{0}(t)
=
\sigma R\mathbf{p}_a(\theta),
\qquad
\theta=\omega t,
\qquad
\omega=\frac{c_f}{R},
\qquad
\sigma\in\{+1,-1\}.
$$

The reference directions are

$$
\begin{aligned}
\mathbf{p}_1(\theta)&=(\cos\theta,\sin\theta,0),\\
\mathbf{p}_2(\theta)&=(0,\cos\theta,\sin\theta),\\
\mathbf{p}_3(\theta)&=(\sin\theta,0,\cos\theta).
\end{aligned}
$$

Let $i=(a,\sigma)$ and write a deformed row as

$$
\mathbf{x}_i(t)
=
\mathbf{C}(t)+\mathbf{y}_i(t),
\qquad
\mathbf{y}_i(t)
=
\mathbf{y}_i^{0}(t)+\varepsilon\boldsymbol{\xi}_i(t)+O(\varepsilon^2).
$$

When center-gauge motion is included, write its first-order part as

$$
\mathbf{C}(t)
=
\varepsilon\mathbf{Z}(t)+O(\varepsilon^2),
$$

and use the full position perturbation

$$
\boldsymbol{\chi}_i(t)
=
\mathbf{Z}(t)+\boldsymbol{\xi}_i(t)
$$

inside causal-root and force variations. In the center-gauge branch-existence chart, $\mathbf{Z}=\mathbf{0}$ and $\boldsymbol{\chi}_i=\boldsymbol{\xi}_i$.

In the radial same-level sector, the deformation is admissible only inside the common support band

$$
R-\delta
\le
\|\mathbf{y}_i(t)\|
\le
R+\delta,
$$

and only while the Euclidean noncollision and active-root floors remain open:

$$
d_{\min}
=
\inf_{i\ne j,t}\|\mathbf{x}_i(t)-\mathbf{x}_j(t)\|
>
\epsilon_x,
\qquad
J_{\min}
=
\inf_{(i,j,\alpha,t)\in\mathcal{A}}
|J_{ij}^{\alpha}(t)|
>
\epsilon_J.
$$

For perturbation work, define the reference margins

$$
m_x=d_{\min}^{0}-\epsilon_x,
\qquad
m_J=J_{\min}^{0}-\epsilon_J.
$$

A first-order deformation is floor-preserving if

$$
\varepsilon
\sup_{i\ne j,t}
\|\boldsymbol{\xi}_i(t)-\boldsymbol{\xi}_j(t)\|
<m_x
$$

and

$$
\varepsilon
\sup_{(i,j,\alpha,t)\in\mathcal{A}^{0}}
|\delta J_{ij}^{\alpha}(t)|
<m_J,
$$

with every new, removed, or near-zero root assigned a certificate status. These inequalities are sufficient screening conditions, not sharp optimal bounds.

---

## 2. Common Residual Equations

For a retained causal root $s_{ij}^{\alpha}(t)<t$, define

$$
\mathbf{r}_{ij}^{\alpha}(t)
=
\mathbf{x}_i(t)-\mathbf{x}_j(s_{ij}^{\alpha}(t)),
\qquad
r_{ij}^{\alpha}(t)
=
\|\mathbf{r}_{ij}^{\alpha}(t)\|,
\qquad
\hat{\mathbf{r}}_{ij}^{\alpha}
=
\frac{\mathbf{r}_{ij}^{\alpha}}{r_{ij}^{\alpha}}.
$$

The active-root equation is

$$
G_{ij}(t,s)
=
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s)
=0,
$$

with Jacobian

$$
J_{ij}(t,s)
=
1-
\frac{\mathbf{v}_j(s)\cdot\hat{\mathbf{r}}_{ij}(t,s)}{c_f}.
$$

The retained causal-wake force row is

$$
\mathbf{F}_{ij}^{\alpha}(t)
=
\kappa\,\mathrm{sign}(q_iq_j)
\frac{|q_iq_j|W_{ij}^{\mathrm{rec},\alpha}(t)}
{\left(r_{ij}^{\alpha}(t)\right)^2}
\hat{\mathbf{r}}_{ij}^{\alpha}(t).
$$

Here $J_{ij}^{\alpha}$ is the source-normal root transversality denominator. The force/action weight is the receiver-normal wake crossing factor $W_{ij}^{\mathrm{rec},\alpha}$.

Let

$$
\mathbf{F}_i(t)
=
\sum_{(j,\alpha)\in\mathcal{A}_i(t)}
\mathbf{F}_{ij}^{\alpha}(t),
\qquad
\mathbf{u}_i(t)
=
\dot{\mathbf{x}}_i(t)-\dot{\mathbf{C}}(t).
$$

The two carrier residuals that the deformation must close are

$$
\mathcal{R}_{\mathrm{speed},i}(t)
=
\|\mathbf{u}_i(t)\|-c_f
$$

and

$$
\mathcal{R}_{\mathrm{tan},i}(t)
=
\mathbf{u}_i(t)\cdot
\left[
\mathbf{F}_i(t)-\ddot{\mathbf{C}}(t)
\right].
$$

In the center-gauge branch-existence chart, $\ddot{\mathbf{C}}=\mathbf{0}$. A moving-assembly export may keep $\ddot{\mathbf{C}}$, but it must not use gauge acceleration to hide an internal residual without a momentum and boundary-exchange ledger.

### 2.1 Linearized Root And Force Rows

For a reference root $s_{ij}^{0,\alpha}(t)$, write

$$
s_{ij}^{\alpha}(t)
=
s_{ij}^{0,\alpha}(t)
+\varepsilon\eta_{ij}^{\alpha}(t)
+O(\varepsilon^2).
$$

The first-order root shift is

$$
\eta_{ij}^{\alpha}(t)
=
-
\frac{
\hat{\mathbf{r}}_{ij}^{0,\alpha}(t)
\cdot
\left[
\boldsymbol{\chi}_i(t)
-
\boldsymbol{\chi}_j(s_{ij}^{0,\alpha}(t))
\right]
}
{c_fJ_{ij}^{0,\alpha}(t)}.
$$

Let

$$
\delta\mathbf{r}_{ij}^{\alpha}
=
\boldsymbol{\chi}_i(t)
-
\boldsymbol{\chi}_j(s_{ij}^{0,\alpha})
-
\mathbf{v}_j^{0}(s_{ij}^{0,\alpha})
\eta_{ij}^{\alpha}.
$$

The source-velocity variation at the shifted root is

$$
\delta\mathbf{v}_{j,*}^{\alpha}
=
\dot{\boldsymbol{\chi}}_j(s_{ij}^{0,\alpha})
+
\dot{\mathbf{v}}_j^{0}(s_{ij}^{0,\alpha})
\eta_{ij}^{\alpha}.
$$

Then

$$
\delta\hat{\mathbf{r}}_{ij}^{\alpha}
=
\frac{
\left(I-\hat{\mathbf{r}}_{ij}^{0,\alpha}
\hat{\mathbf{r}}_{ij}^{0,\alpha T}\right)
\delta\mathbf{r}_{ij}^{\alpha}
}
{r_{ij}^{0,\alpha}},
$$

and

$$
\delta J_{ij}^{\alpha}
=
-
\frac{
\delta\mathbf{v}_{j,*}^{\alpha}
\cdot\hat{\mathbf{r}}_{ij}^{0,\alpha}
+
\mathbf{v}_j^{0}(s_{ij}^{0,\alpha})
\cdot\delta\hat{\mathbf{r}}_{ij}^{\alpha}
}
{c_f}.
$$

The first-order force variation is

$$
\delta\mathbf{F}_{ij}^{\alpha}
=
\kappa\,\mathrm{sign}(q_iq_j)|q_iq_j|
\left[
W_{ij}^{\mathrm{rec},0,\alpha}
\frac{
\left(I-3\hat{\mathbf{r}}_{ij}^{0,\alpha}
\hat{\mathbf{r}}_{ij}^{0,\alpha T}\right)
\delta\mathbf{r}_{ij}^{\alpha}
}
{\left(r_{ij}^{0,\alpha}\right)^3}
+
\frac{\delta W_{ij}^{\mathrm{rec},\alpha}}
{\left(r_{ij}^{0,\alpha}\right)^2}
\hat{\mathbf{r}}_{ij}^{0,\alpha}
\right].
$$

Therefore a low-order deformation variable $\lambda$ must satisfy the linearized residual system

$$
\mathcal{R}_{\mathrm{tan},i}^{0}(t)
+
\varepsilon
\left[
\dot{\boldsymbol{\xi}}_i(t)\cdot\mathbf{F}_i^{0}(t)
+
\mathbf{u}_i^{0}(t)\cdot
\sum_{(j,\alpha)\in\mathcal{A}_i^{0}(t)}
\delta\mathbf{F}_{ij}^{\alpha}(t)
-
\mathbf{u}_i^{0}(t)\cdot\delta\ddot{\mathbf{C}}(t)
\right]
=
O(\varepsilon^2),
$$

and

$$
\frac{\mathbf{u}_i^{0}(t)}{c_f}
\cdot
\dot{\boldsymbol{\xi}}_i(t)
=0
$$

The first equation closes the tangential force residual. The second keeps internal fixed-speed motion at leading order in the exact-speed row. If a controlled speed tolerance is declared, replace the equality by the corresponding $\epsilon_v$ bound. If these equations cannot be solved while preserving $d_{\min}>\epsilon_x$ and $J_{\min}>\epsilon_J$, the deformation family inherits the failure code `tangential-residual-open` or `jacobian-floor-violation`.

---

## 3. Ansatz A: Radial Breathing

### Variables

Use slot-wise radial amplitudes $b_{a,\sigma}(t)$:

$$
\mathbf{y}_{a,\sigma}(t)
=
\sigma R
\left[
1+\varepsilon b_{a,\sigma}(t)
\right]
\mathbf{p}_a(\theta)
.
$$

The exact-antipodal subfamily sets

$$
b_{a,+}(t)=b_{a,-}(t)=b_a(t),
$$

so that

$$
\mathbf{y}_{a,+}(t)+\mathbf{y}_{a,-}(t)=\mathbf{0}.
$$

A low-order search should use a finite Fourier row

$$
b_{a,\sigma}(t)
=
\sum_{m=0}^{M_b}
\left[
B_{a,\sigma,m}^{c}\cos(m\theta)
+
B_{a,\sigma,m}^{s}\sin(m\theta)
\right],
$$

with the mean mode separated from the support-radius gauge.

### Constraints

The support band gives

$$
\varepsilon R
\sup_{a,\sigma,t}|b_{a,\sigma}(t)|
\le
\delta.
$$

At first order, radial breathing with fixed $\theta=\omega t$ changes the carrier speed by

$$
\mathcal{R}_{\mathrm{speed},a,\sigma}^{(b)}(t)
=
\varepsilon c_f b_{a,\sigma}(t)
+O(\varepsilon^2).
$$

Therefore pure radial breathing cannot close an exact fixed-speed row unless $b_{a,\sigma}=0$ at first order. A viable radial breathing ansatz must be coupled to phase modulation, frequency modulation, or an explicitly declared speed tolerance:

$$
b_{a,\sigma}(t)
+
\frac{\dot{\psi}_{a,\sigma}(t)}{\omega}
=
0
\qquad
\text{for leading-order fixed-speed coupling.}
$$

The noncollision floor is screened by

$$
\varepsilon R
\sup_{i\ne j,t}
\left\|
\sigma_i b_i(t)\mathbf{p}_{a_i}(\theta)
-
\sigma_j b_j(t)\mathbf{p}_{a_j}(\theta)
\right\|
<m_x.
$$

The root floor is screened by the linearized $\delta J$ row in Section 2.1.

### Residual Equations

For $\boldsymbol{\xi}_{a,\sigma}^{(b)}=\sigma Rb_{a,\sigma}\mathbf{p}_a$, require

$$
\mathcal{R}_{\mathrm{tan},a,\sigma}^{0}
+
\varepsilon
\mathcal{L}_{\mathrm{tan},a,\sigma}^{(b)}
\left[b,\dot{b}\right]
=0
$$

on the retained window, together with the coupled speed row

$$
b_{a,\sigma}
+
\frac{\dot{\psi}_{a,\sigma}}{\omega}
=0
$$

if exact fixed speed is retained.

### Leading-Order Linearization Route

1. Freeze the active-root labels from the screened rigid row.
2. Insert $\boldsymbol{\xi}^{(b)}$ into the root-shift equation for $\eta_{ij}^{\alpha}$.
3. Build the linear operator $\mathcal{L}_{\mathrm{tan}}^{(b)}$ from $\delta\mathbf{F}_{ij}^{\alpha}$ and $\dot{\boldsymbol{\xi}}^{(b)}\cdot\mathbf{F}^{0}$.
4. Solve the finite Fourier least-squares problem for $b$ and the coupled $\psi$ row, then reject any solution that violates $d_{\min}$, $J_{\min}$, support-band, or winding constraints.

### Simulation Observables

Emit:

1. `radial_breathing_modes`: $B_{a,\sigma,m}^{c}$ and $B_{a,\sigma,m}^{s}$.
2. `support_band_margin`: $\delta-\varepsilon R\sup|b_{a,\sigma}|$.
3. `speed_coupling_gap`: $b_{a,\sigma}+\dot{\psi}_{a,\sigma}/\omega$.
4. `radial_residual_gain`: reduction of $\operatorname{rms}(\mathcal{R}_{\mathrm{tan}})$ relative to the rigid row.
5. `root_floor_after_breathing`: $J_{\min}$ and retained root counts after deformation.

---

## 4. Ansatz B: Phase Modulation

### Variables

Use low-order phase corrections

$$
\theta_{a,\sigma}(t)
=
\omega t+\phi_{a,\sigma}^{0}
+\varepsilon\psi_{a,\sigma}(t).
$$

The exact-antipodal subfamily uses

$$
\theta_{a,-}(t)=\theta_{a,+}(t)+\pi,
\qquad
\psi_{a,-}(t)=\psi_{a,+}(t).
$$

For the octahedral basis, the deformation is

$$
\boldsymbol{\xi}_{a,\sigma}^{(\psi)}(t)
=
\sigma R\psi_{a,\sigma}(t)
\mathbf{p}_a'(\theta),
$$

where prime means derivative with respect to $\theta$.

### Constraints

The winding row requires

$$
\psi_{a,\sigma}(t+T)-\psi_{a,\sigma}(t)=0
$$

for a period-preserving search. The phase-lock residual is

$$
\mathcal{R}_{\mathrm{phase}}
=
\max_{a<b}
\sup_{t\in W}
\frac{
\left|
\operatorname{wrap}_{(-\pi,\pi]}
\left(
\theta_b(t)-\theta_a(t)-\Delta_{ab}^{*}
\right)
\right|
}
{\epsilon_{\phi}}.
$$

At fixed radius, first-order speed preservation gives

$$
\mathcal{R}_{\mathrm{speed},a,\sigma}^{(\psi)}(t)
=
\varepsilon R\dot{\psi}_{a,\sigma}(t)
+O(\varepsilon^2).
$$

Thus a pure phase modulation with exact fixed speed has only constant first-order $\psi$ modes. Nontrivial phase modulation must be coupled to radial breathing, plane-normal precession, or a controlled speed residual.

Node clearance must be rescreened because phase modulation changes temporal separation at octahedral nodes:

$$
\inf_n\chi_t^n>\epsilon_t,
\qquad
\inf_n\chi_J^n>\epsilon_J.
$$

### Residual Equations

The tangential closure equation is

$$
\mathcal{R}_{\mathrm{tan},a,\sigma}^{0}
+
\varepsilon
\mathcal{L}_{\mathrm{tan},a,\sigma}^{(\psi)}
\left[\psi,\dot{\psi}\right]
=0,
$$

with the speed-coupled radial condition

$$
\dot{\psi}_{a,\sigma}
=
-\omega b_{a,\sigma}
$$

when paired with Ansatz A.

### Leading-Order Linearization Route

1. Use $\boldsymbol{\xi}^{(\psi)}=\sigma R\psi\mathbf{p}_a'$ in the common root-shift formula.
2. Expand $\psi$ in harmonics whose period matches the candidate branch period.
3. Project the rigid tangential residual onto the span of $\mathcal{L}_{\mathrm{tan}}^{(\psi)}$ and the coupled radial operator.
4. Check whether the solution improves phase-lock closure without sacrificing node clearance or Jacobian floors.

### Simulation Observables

Emit:

1. `phase_modes`: Fourier coefficients of $\psi_{a,\sigma}$.
2. `phase_lock_residual`: $\mathcal{R}_{\mathrm{phase}}$ and winding residuals.
3. `node_clearance_after_phase`: $\chi_x^n$, $\chi_t^n$, and $\chi_J^n$.
4. `phase_return_map`: sampled map for phase offsets over one period.
5. `speed_phase_gap`: $\sup|\dot{\psi}_{a,\sigma}+\omega b_{a,\sigma}|$ when coupled to radial breathing.

---

## 5. Ansatz C: Plane Normal Precession

### Variables

Let each carrier plane be rotated by a small time-dependent vector $\boldsymbol{\mu}_a(t)$:

$$
Q_a(t)
=
\exp\!\left(\varepsilon[\boldsymbol{\mu}_a(t)]_{\times}\right),
\qquad
\mathbf{p}_a(t)
=
Q_a(t)\mathbf{p}_a^{0}(\theta).
$$

The deformed position row is

$$
\mathbf{y}_{a,\sigma}(t)
=
\sigma RQ_a(t)\mathbf{p}_a^{0}(\theta),
$$

so

$$
\boldsymbol{\xi}_{a,\sigma}^{(\mu)}(t)
=
\sigma R
\boldsymbol{\mu}_a(t)\times\mathbf{p}_a^{0}(\theta).
$$

The plane normal is

$$
\mathbf{n}_a(t)=Q_a(t)\mathbf{n}_a^{0}.
$$

In this local precession chart, $\mathbf n_a(t)$ is the Hodge-dual normal of the oriented plane bivector. Retained sector certification is carried by $\mathcal B_a$ and its Gram matrix, not by the normal alone.

### Constraints

The $Q_a$ row preserves radius exactly to first order:

$$
\mathbf{p}_a^{0}\cdot
\left(
\boldsymbol{\mu}_a\times\mathbf{p}_a^{0}
\right)
=0.
$$

A common rigid rotation of all three planes is an orientation gauge unless a branch export declares it. Fix the internal precession gauge by imposing

$$
\sum_{a=1}^{3}\boldsymbol{\mu}_a(t)=\mathbf{0}
$$

or by pinning one carrier frame.

The first-order speed residual is

$$
\mathcal{R}_{\mathrm{speed},a,\sigma}^{(\mu)}(t)
=
\varepsilon
\mathbf{u}_{a,\sigma}^{0}(t)\cdot
\left[
\sigma R\dot{\boldsymbol{\mu}}_a(t)\times\mathbf{p}_a^{0}(\theta)
\right]
/c_f
+O(\varepsilon^2).
$$

Therefore admissible precession must either satisfy

$$
\mathbf{u}_{a,\sigma}^{0}\cdot
\left(
\dot{\boldsymbol{\mu}}_a\times\mathbf{p}_a^{0}
\right)
=0
$$

at leading order or be coupled to radial and phase modulation.

Noncollision is screened by

$$
\varepsilon R
\sup_{i\ne j,t}
\left\|
\sigma_i\boldsymbol{\mu}_{a_i}\times\mathbf{p}_{a_i}^{0}
-
\sigma_j\boldsymbol{\mu}_{a_j}\times\mathbf{p}_{a_j}^{0}
\right\|
<m_x.
$$

### Residual Equations

Require

$$
\mathcal{R}_{\mathrm{tan},a,\sigma}^{0}
+
\varepsilon
\mathcal{L}_{\mathrm{tan},a,\sigma}^{(\mu)}
\left[\boldsymbol{\mu},\dot{\boldsymbol{\mu}}\right]
=0,
$$

with center-gauge and orientation-gauge constraints enforced before fitting.

### Leading-Order Linearization Route

1. Parameterize $\boldsymbol{\mu}_a(t)$ by low Fourier harmonics and remove the common rotation mode.
2. Insert $\boldsymbol{\xi}^{(\mu)}$ into the root-shift and force-variation rows.
3. Use the Gram matrix

   $$
   G_{ab}^{(n)}(t)=\mathbf{n}_a(t)\cdot\mathbf{n}_b(t)
   $$

   to track whether the deformed planes remain a controlled perturbation of the octahedral row.
4. Solve the coupled speed and tangential equations. Reject any row in which normal precession creates a node-adjacent Jacobian graze.

### Simulation Observables

Emit:

1. `plane_normal_modes`: Fourier coefficients of $\boldsymbol{\mu}_a$.
2. `plane_normal_gram`: $G_{ab}^{(n)}(t)$ and its deviation from the rigid row.
3. `precession_speed_gap`: leading-order speed residual from $\dot{\boldsymbol{\mu}}_a$.
4. `node_jacobian_after_precession`: node-adjacent $J_{\min}$ and root counts.
5. `precession_residual_gain`: tangential residual reduction attributable to $\boldsymbol{\mu}$ modes.

---

## 6. Ansatz D: Antipodal Relaxation

### Variables

Let each binary have a central carrier vector $\mathbf{r}_a(t)$ and a small antipodal error $\mathbf{e}_a(t)$:

$$
\mathbf{y}_{a,+}(t)
=
\mathbf{r}_a(t)+\frac{1}{2}\mathbf{e}_a(t),
\qquad
\mathbf{y}_{a,-}(t)
=
-\mathbf{r}_a(t)+\frac{1}{2}\mathbf{e}_a(t).
$$

The exact-antipodal row is $\mathbf{e}_a=\mathbf{0}$. The relaxed row has certificate residual

$$
\mathcal{R}_{\mathrm{anti}}
=
\max_a\sup_{t\in W}
\frac{\|\mathbf{e}_a(t)\|}{\epsilon_{\mathrm{anti}}}
\le1.
$$

The low-order perturbation is

$$
\boldsymbol{\xi}_{a,+}^{(e)}
=
\frac{1}{2}\mathbf{e}_a,
\qquad
\boldsymbol{\xi}_{a,-}^{(e)}
=
\frac{1}{2}\mathbf{e}_a,
$$

plus any chosen deformation of $\mathbf{r}_a$ from the radial, phase, or precession rows.

### Constraints

For equal center-gauge weights, the center gauge imposes

$$
\sum_{a=1}^{3}\mathbf{e}_a(t)=\mathbf{0},
\qquad
\sum_{a=1}^{3}\dot{\mathbf{e}}_a(t)=\mathbf{0}.
$$

The partner separation remains bounded below by

$$
\|\mathbf{y}_{a,+}(t)-\mathbf{y}_{a,-}(t)\|
=
2\|\mathbf{r}_a(t)\|
>
\epsilon_x.
$$

The support-band constraints are

$$
R-\delta
\le
\left\|
\pm\mathbf{r}_a(t)+\frac{1}{2}\mathbf{e}_a(t)
\right\|
\le
R+\delta.
$$

Because exact antipodality supplied the clean partner-root floor in the rigid row, every relaxed row must recompute partner delays and Jacobians. A row with $\mathbf{e}_a\ne\mathbf{0}$ cannot inherit the partner-root result

$$
y_*\approx1.4781702664,
\qquad
J_{\mathrm{partner}}\approx1.6736120292
$$

without a new active-root screen.

### Residual Equations

The tangential residual splits into pair-even and pair-odd components:

$$
\mathcal{R}_{\mathrm{tan},a}^{+}
=
\frac{1}{2}
\left(
\mathcal{R}_{\mathrm{tan},a,+}
+
\mathcal{R}_{\mathrm{tan},a,-}
\right),
\qquad
\mathcal{R}_{\mathrm{tan},a}^{-}
=
\frac{1}{2}
\left(
\mathcal{R}_{\mathrm{tan},a,+}
-
\mathcal{R}_{\mathrm{tan},a,-}
\right).
$$

Antipodal relaxation is useful only if the linearized operator

$$
\mathcal{R}_{\mathrm{tan},a,\sigma}^{0}
+
\varepsilon
\mathcal{L}_{\mathrm{tan},a,\sigma}^{(e)}
\left[\mathbf{e},\dot{\mathbf{e}}\right]
=0
$$

has range in residual modes that radial breathing, phase modulation, and plane normal precession cannot reach.

The antipodal residual must stay controlled:

$$
\|\mathbf{e}_a(t)\|\le\epsilon_{\mathrm{anti}},
\qquad
\|\dot{\mathbf{e}}_a(t)\|\le\epsilon_{\dot{e}}.
$$

### Leading-Order Linearization Route

1. Decompose the rigid tangential residual into pair-even and pair-odd rows.
2. Fit $\mathbf{e}_a(t)$ only to residual modes not closed by exact-antipodal deformations.
3. Recompute partner roots, cross-binary roots, and Jacobians after each fit; no inherited partner-root floor is allowed.
4. Measure whether $\mathbf{e}_a$ is dynamically restoring by perturbing transverse to the $\mathbf{e}_a=\mathbf{0}$ manifold and extracting Lyapunov exponents.

### Simulation Observables

Emit:

1. `antipodal_error`: $\mathbf{e}_a(t)$, $\dot{\mathbf{e}}_a(t)$, and $\mathcal{R}_{\mathrm{anti}}$.
2. `pair_residual_split`: $\mathcal{R}_{\mathrm{tan},a}^{+}$ and $\mathcal{R}_{\mathrm{tan},a}^{-}$.
3. `partner_root_after_relaxation`: partner delays, Jacobians, and status labels.
4. `center_gauge_antipodal_gap`: $\sum_a\mathbf{e}_a$ and $\sum_a\dot{\mathbf{e}}_a$.
5. `transverse_antipodal_spectrum`: Lyapunov exponents for return to or departure from the exact-antipodal manifold.

---

## 7. Ansatz E: Center-Gauge Motion

### Variables

Center-gauge motion uses

$$
\mathbf{x}_i(t)=\mathbf{C}(t)+\mathbf{y}_i(t)
$$

with the internal gauge constraints

$$
\sum_i\omega_i\mathbf{y}_i(t)=\mathbf{0},
\qquad
\sum_i\omega_i\dot{\mathbf{y}}_i(t)=\mathbf{0}.
$$

Let

$$
\mathbf{C}(t)
=
\varepsilon\mathbf{Z}(t)
+O(\varepsilon^2).
$$

This ansatz is useful only for distinguishing a true internal tangential residual from a common translational or boundary-exchange mode. It is not a branch-existence shortcut.

### Constraints

The center drift must obey the finite-memory bound hypothesis:

$$
\|\dot{\mathbf{C}}(t)\|\le V_C<c_f.
$$

Then every retained root has memory depth bounded by

$$
\tau_{ij}^{\alpha}(t)
\le
\frac{2R_+}{c_f-V_C}.
$$

Simultaneous Euclidean separations are unchanged by a common translation, but causal roots depend on $\mathbf{C}(t)-\mathbf{C}(s)$. Therefore $J_{\min}$ and active-root counts must be recomputed under $\mathbf{Z}$.

### Residual Equations

At each time, define the six-row velocity matrix

$$
U(t)
=
\begin{bmatrix}
\mathbf{u}_1^{T}(t)\\
\vdots\\
\mathbf{u}_6^{T}(t)
\end{bmatrix},
\qquad
\mathbf{f}_{\mathrm{tan}}(t)
=
\begin{bmatrix}
\mathbf{u}_1(t)\cdot\mathbf{F}_1(t)\\
\vdots\\
\mathbf{u}_6(t)\cdot\mathbf{F}_6(t)
\end{bmatrix}.
$$

The center-acceleration row can cancel only the component of $\mathbf{f}_{\mathrm{tan}}$ lying in the column space of $U$:

$$
U(t)\ddot{\mathbf{C}}(t)
=
\mathbf{f}_{\mathrm{tan}}(t).
$$

The least-squares gauge acceleration is

$$
\ddot{\mathbf{C}}_{\mathrm{ls}}(t)
=
\left(U^T U\right)^{\dagger}U^T\mathbf{f}_{\mathrm{tan}}(t),
$$

and the internal residual left after any center-gauge motion is

$$
\mathbf{g}_{\mathrm{int}}(t)
=
\left[
I-U\left(U^TU\right)^{\dagger}U^T
\right]
\mathbf{f}_{\mathrm{tan}}(t).
$$

Center-gauge motion is admissible as a closure aid only if

$$
\|\mathbf{g}_{\mathrm{int}}(t)\|
\le
\epsilon_{\mathrm{tan}}
$$

and the momentum, energy/action, and boundary-exchange ledgers explain the nonzero $\ddot{\mathbf{C}}$.

### Leading-Order Linearization Route

1. Compute $\mathbf{g}_{\mathrm{int}}$ on the rigid row before fitting other deformations.
2. If $\mathbf{g}_{\mathrm{int}}$ is large, reject center-gauge motion as the primary closure mechanism and fit internal deformation variables first.
3. If $\mathbf{g}_{\mathrm{int}}$ is small, solve for $\mathbf{Z}$ under $\|\dot{\mathbf{Z}}\|\le V_C/\varepsilon$ and recompute active roots.
4. Require the event ledger to decide whether the row is isolated, boundary-driven, or an observer-export motion.

### Simulation Observables

Emit:

1. `center_motion`: $\mathbf{C}$, $\dot{\mathbf{C}}$, and $\ddot{\mathbf{C}}$.
2. `center_gauge_constraints`: $\sum_i\omega_i\mathbf{y}_i$ and $\sum_i\omega_i\dot{\mathbf{y}}_i$.
3. `gauge_solvability_residual`: $\|\mathbf{g}_{\mathrm{int}}\|$.
4. `memory_depth_with_center_drift`: $2R_+/(c_f-V_C)$ and measured delays.
5. `momentum_boundary_status`: isolated, boundary-driven, or `not_computed`.

---

## 8. Coupled Low-Order Search System

The minimal useful deformation vector is

$$
\lambda
=
\left(
b,\psi,\boldsymbol{\mu},\mathbf{e},\mathbf{Z}
\right).
$$

The coupled first-order closure target is

$$
\mathcal{R}_{\mathrm{tan}}^{0}
+
\varepsilon
\left(
\mathcal{L}_{\mathrm{tan}}^{(b)}b
+
\mathcal{L}_{\mathrm{tan}}^{(\psi)}\psi
+
\mathcal{L}_{\mathrm{tan}}^{(\mu)}\boldsymbol{\mu}
+
\mathcal{L}_{\mathrm{tan}}^{(e)}\mathbf{e}
-
U\ddot{\mathbf{Z}}
\right)
=0,
$$

subject to

$$
\mathcal{R}_{\mathrm{speed}}
\le
\epsilon_v,
\qquad
\mathcal{R}_{\mathrm{phase}}
\le1,
\qquad
\mathcal{R}_{\mathrm{anti}}
\le1,
\qquad
d_{\min}>\epsilon_x,
\qquad
J_{\min}>\epsilon_J.
$$

The recommended search order is:

1. Fit radial breathing and phase modulation together, because first-order fixed speed couples them directly.
2. Add plane normal precession to change cross-binary force projections without breaking exact antipodality.
3. Add antipodal relaxation only for residual modes unreachable inside the exact-antipodal submanifold.
4. Use center-gauge motion only as a diagnostic for common translational or boundary-exchange residuals.
5. Recompute active roots, root counts, Jacobian floors, and node clearances after every accepted fit.

The finite-mode numerical problem is a constrained residual minimization:

$$
\min_{\lambda}
\left\|
\mathcal{R}_{\mathrm{tan}}(\lambda)
\right\|_{L^2(W)}
$$

with hard rejection if any certificate floor fails. A successful theorem-target row should also report the stronger supremum result

$$
\sup_{i,t}
\frac{
|\mathcal{R}_{\mathrm{tan},i}(t)|
}
{\epsilon_{\mathrm{tan}}}
\le1.
$$

---

## 9. Acceptance And Failure Tests

A deformed carrier ansatz remains `priority-only` unless it supplies all rows below on the same retained window:

| Row | Required output |
| --- | --- |
| Support descriptor | radial sector: $R-\delta\le\|\mathbf{y}_i\|\le R+\delta$ and support-band margins; free-support sector: declared support functional and equivalent margins |
| Speed | $\mathcal{R}_{\mathrm{speed}}\le\epsilon_v$ or declared controlled tolerance |
| Phase and winding | $\mathcal{R}_{\mathrm{phase}}\le1$ and winding residuals |
| Antipodal status | exact row or $\mathcal{R}_{\mathrm{anti}}\le1$ with partner-root rescreen |
| Noncollision | $d_{\min}>\epsilon_x$ and node clearances |
| Active roots | finite root count, status labels, and memory depth |
| Jacobian floor | $J_{\min}>\epsilon_J$ across partner, cross-binary, node-adjacent, and same-source rows |
| Tangential closure | $\mathcal{R}_{\mathrm{tan}}\le\epsilon_{\mathrm{tan}}$ |
| Event ledgers | energy/action, momentum, angular momentum, charge provenance, and Noether sea medium update marked `passed`, `failed`, or `not_computed` |

Immediate rejection codes:

1. `support-band-escape` if any $\|\mathbf{y}_i\|$ leaves the declared band.
2. `projection-collision` if $d_{\min}\le\epsilon_x$.
3. `jacobian-floor-violation` if $J_{\min}\le\epsilon_J$.
4. `near-zero-self-root-unresolved` if a same-source row enters a tangent or near-zero layer without retained-positive-delay or regularized-fold-layer status.
5. `phase-lock-drift` if phase or winding rows fail.
6. `tangential-residual-open` if the deformation lowers but does not close $\mathcal{R}_{\mathrm{tan}}$.
7. `energy-ledger-open` or `angular-momentum-ledger-open` if the deformation changes the force row without closing the matching ledgers.
8. `lorentz-export-overclaim` if moving-center or moving-branch data are exported before observer residuals pass.

---

## 10. Simulation Output Schema

A deformed support-band search should emit one record per candidate:

| Field | Contents |
| --- | --- |
| `candidate_id` | deformation family, harmonic cutoff, polarity row, and retained-root convention |
| `deformation_variables` | $b$, $\psi$, $\boldsymbol{\mu}$, $\mathbf{e}$, $\mathbf{C}$ and their coefficient tables |
| `state_vector` | $\mathbf{x}_i$, $\mathbf{u}_i$, polarities, support descriptor, center gauge |
| `speed_residuals` | $\mathcal{R}_{\mathrm{speed}}$ by site and aggregate norms |
| `tangential_residuals` | rigid baseline, deformed value, gain, supremum, and rms |
| `noncollision` | $d_{\min}$, node clearances, and closest-pair provenance |
| `root_ledger` | active roots, delays, root counts, Jacobians, memory depth, and root statuses |
| `phase_lock` | $\theta_a$, offsets, winding rows, and return map |
| `antipodal_status` | exact, relaxed, $\mathcal{R}_{\mathrm{anti}}$, partner-root rescreen |
| `center_gauge` | gauge constraints, $\mathbf{g}_{\mathrm{int}}$, and center-motion status |
| `event_action_status` | energy/action, momentum, angular momentum, and medium-response statuses |
| `failure_code` | first failed row, or `not_retained_yet` if required ledgers are still open |

Priority decision: this document contributes a theorem-target deformation basis and linearized closure route. It is not promotion-ready until at least one deformed support-band row closes the tangential residual while preserving noncollision, active-root finiteness, positive Jacobian floors, same-source status, support-band control, and the required event ledgers on the same data.
