# PPN Parameters

This chapter is the canonical home for weak-field/PPN expansion details used by
the spacetime constitutive map.

### Canonical Symbols

- $n$: normalized Noether-core density, with $\rho_{\text{core}}=\rho_{\text{core},0}n$.
- $\chi_{\text{sea}}$: Noether-Sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$.
- $\Phi_N$: Newtonian benchmark potential.
- $\Phi_{\text{eff}}$: constitutive effective potential from the clock channel.
- $U\equiv -\Phi_N>0$: positive PPN expansion variable (default).
- $U_{\Phi}\equiv -\Phi_{\text{eff}}>0$: constitutive-channel variant used when expanding directly in $\Phi_{\text{eff}}$.

### Mapping to PPN Constraints

1. **Shapiro Delay**: Map the GR time-delay (longer path in curved space) to the Architrino time-delay (slower $c_{eff}$ in a dense medium).
2. **Light Bending**: Calculate the refraction of tri-binary signals through the Noether-Sea density gradient around the Sun.
3. **Geodetic Precession**: Derived from the interaction of the assembly's angular momentum with the gradient of the Noether-Sea potential.


### Testing the Euclidean Anchor (Shapiro Delay)

1. **The Test**: Calculate travel time of a signal from Earth to a probe behind the Sun using the $\mathbb{U}_{\text{now}}$ universe-state grid.
2. **Architrino Model**: Signal follows a straight Euclidean line. Delay is caused by increased Noether-Sea response near the Sun, expressed by the Noether-Sea delay factor $\chi_{\text{sea}}$.
3. **Comparison**: Contrast $\Delta t_{architrino}$ with the GR weak-field form.
4. **$\mathbb{U}_{\text{now}}$ Role**: $\mathbb{U}_{\text{now}}$ provides the "straight line" benchmark against which the "curved path" of GR is compared.

### Explicit Weak-Field Noether-Sea Delay Map (PPN $\gamma$)

Adopt a weak-field Noether-Sea delay-factor ansatz for signal propagation in the Noether-core medium:
$$
\chi_{\text{sea}}(\mathbf{x}) \equiv \frac{c_f}{c_{\text{eff}}(\mathbf{x})}
= 1 - (1+\gamma_{\text{eff}})\frac{\Phi_N(\mathbf{x})}{c_f^2}
+ \mathcal{O}\!\left(\frac{\Phi_N^2}{c_f^4}\right),
$$
with $\Phi_N<0$ near a mass source. For a point mass $M$,
$$
\Phi_N(r)=-\frac{GM}{r}
\quad\Rightarrow\quad
\chi_{\text{sea}}(r)=1+(1+\gamma_{\text{eff}})\frac{GM}{c_f^2 r}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_f^4 r^2}\right).
$$

For a one-way signal along a Euclidean straight path $\Gamma$ (the $\mathbb{U}_{\text{now}}$ anchor),
$$
t_{\text{arch}}=\frac{1}{c_f}\int_\Gamma \chi_{\text{sea}}(\mathbf{x})\,ds
=\frac{R}{c_f}+\Delta t_{\text{arch}},
$$
where $R=\int_\Gamma ds$ is Euclidean path length and
$$
\Delta t_{\text{arch}}
=\frac{1}{c_f}\int_\Gamma (\chi_{\text{sea}}-1)\,ds
=\frac{(1+\gamma_{\text{eff}})GM}{c_f^3}\int_\Gamma \frac{ds}{r(s)}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_f^5}\right).
$$

Evaluating the line integral for endpoint radii $r_1,r_2$ and Euclidean endpoint separation $R$ gives
$$
\Delta t_{\text{arch}}
=\frac{(1+\gamma_{\text{eff}})GM}{c_f^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+\mathcal{O}\!\left(\frac{G^2M^2}{c_f^5}\right),
$$
which is the standard 1PN Shapiro form with $\gamma\to\gamma_{\text{eff}}$ and $c\to c_f$.

So the operational estimator is
$$
\gamma_{\text{eff}}
=
\frac{c_f^3\,\Delta t_{\text{obs}}}
{GM\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)}
-1,
$$
with $\Delta t_{\text{obs}}=t_{\text{obs}}-R/c_f$.

In the weak-field solar-system regime, $\gamma_{\text{eff}}$ is the direct refractive-space-curvature map parameter.

### PPN Parameters and the Euclidean Anchor

#### Parameter $\gamma$ (Space Curvature / Refraction)
* **GR Context:** Measures the amount of space curvature produced by unit rest mass.
* **Architrino Interpretation:** Measures the refractive response of the [Noether Sea](noether-sea.md). A massive body increases local assembly density, slowing the effective speed of light $c$ relative to the wake speed $c_f$.
* **Observable:** Shapiro-delay coefficient in the explicit refractive integral above.

#### Parameter $\beta$ (Non-linearity of Gravity)
* **GR Context:** Measures the non-linearity in the superposition of gravitational fields.
* **Architrino Interpretation:** Captures second-order (in potential) clock/medium response from self-hit and Noether-Sea constitutive nonlinearity.
* **Explicit map from constitutive expansion:** Let $U\equiv-\Phi_N>0$ and expand the static clock law
$$
\frac{d\tau}{dt}\bigg|_{v=0}
=
1-\frac{U}{c_f^2}
+C_2(a,k)\frac{U^2}{c_f^4}
+\mathcal{O}\!\left(\frac{U^3}{c_f^6}\right).
$$
Since $-g_{00}=(d\tau/dt)^2$ for a static observer,
$$
g_{00}
=
-1
+2\frac{U}{c_f^2}
-\bigl[1+2C_2(a,k)\bigr]\frac{U^2}{c_f^4}
+\mathcal{O}\!\left(\frac{U^3}{c_f^6}\right).
$$
Match to the PPN form
$$
g_{00}^{\mathrm{PPN}}
=
-1+2\frac{U}{c_f^2}-2\beta_{\mathrm{eff}}\frac{U^2}{c_f^4}+\cdots
$$
to obtain
$$
\boxed{\beta_{\mathrm{eff}}(a,k)=\frac{1+2C_2(a,k)}{2}}.
$$
Equivalently, if $\alpha(\mathcal{I})=1+\lambda_t\mathcal{I}+\frac{1}{2}\lambda_{tt}\mathcal{I}^2$ and
$\mathcal{I}=\chi_1(a,k)\,U/c_f^2+\chi_2(a,k)\,U^2/c_f^4+\cdots$, then
$$
\beta_{\mathrm{eff}}(a,k)
=
\frac{1}{2}
+\lambda_t\chi_2(a,k)
+\frac{1}{2}\lambda_{tt}\chi_1(a,k)^2.
$$
* **Observable:** Perihelion precession and other 1PN nonlinear-potential tests.

#### Exponential clock-law subclass (direct map)

If the constitutive clock channel is exactly
$$
\Omega\xi=e^{-\Phi_{\text{eff}}/c_f^2},
\qquad
g_{00}=-(\Omega\xi)^{-2},
$$
then with $U_{\Phi}\equiv -\Phi_{\text{eff}}$:
$$
g_{00}
=
-e^{2\Phi_{\text{eff}}/c_f^2}
=
-1+2\frac{U_{\Phi}}{c_f^2}-2\frac{U_{\Phi}^2}{c_f^4}+O(c_f^{-6}),
$$
so this subclass yields
$$
\boxed{\beta_{\text{PPN}}=1}
$$
without additional fit freedom.

The general $C_2(a,k)$ map above remains the umbrella constitutive form; the exponential channel is the closure-special case where it collapses to GR's $\beta=1$ exactly.
When $\Phi_{\text{eff}}=\Phi_N+O(\Phi_N^2/c_f^2)$, one has $U_{\Phi}=U+O(U^2/c_f^2)$ at weak field.

#### Preferred Frame Parameters ($\alpha_1, \alpha_2, \alpha_3$)
* **Crucial test:** In the effective relativistic limit these must vanish (no measurable preferred-frame leakage).
* **Constitutive leakage ansatz:** Let $\mathbf{w}$ be the medium drift velocity relative to the barycentric frame. Write the lowest-order drift terms as
$$
g_{0i}^{\text{leak}}
=
-\frac{1}{2}\Xi_1(a,k)\frac{w_i U}{c_f^3}
-\Xi_2(a,k)\frac{w^j U_{ij}}{c_f^3},
$$
$$
g_{00}^{\text{leak}}
=
-\Xi_3(a,k)\frac{w^2 U}{c_f^4}
-\Xi_2(a,k)\frac{w^i w^j U_{ij}}{c_f^4}
+\Xi_4(a,k)\frac{w^i V_i}{c_f^3}.
$$
Matching to standard PPN preferred-frame structure gives
$$
\boxed{\alpha_1(a,k)=\Xi_1(a,k)},\qquad
\boxed{\alpha_2(a,k)=\Xi_2(a,k)},
$$
$$
\boxed{\alpha_3(a,k)=\Xi_1(a,k)-\Xi_2(a,k)-\Xi_3(a,k)},
$$
with consistency relation
$$
\Xi_4(a,k)=2\alpha_3-\alpha_1=\Xi_1-2\Xi_2-2\Xi_3.
$$

### Zero-Leakage Conditions (Preferred-Frame Closure)

The effective theory is preferred-frame safe iff all drift couplings vanish:
$$
\Xi_1=\Xi_2=\Xi_3=\Xi_4=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0.
$$

Equivalent constitutive conditions:
$$
\left.\frac{\partial g_{\mu\nu}}{\partial w_i}\right|_{\mathbf{w}=0}=0,
\qquad
\left.\frac{\partial^2 g_{00}}{\partial w_i\partial w_j}\right|_{\mathbf{w}=0}
\propto \delta_{ij}
\ \text{with zero traceless part},
$$
and no momentum-density coupling term $w^iV_i$ at the retained PN order.

The coefficients $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ parameterize preferred-frame leakage terms in the weak-field constitutive expansion.

### Weak-Field Constraint Table (Decision Layer)

Use this table to close the constitutive loop against modern benchmarks.

| Channel | Model estimator | GR/PPN target | Closure requirement |
| --- | --- | --- | --- |
| Time nonlinearity | $\beta_{\text{PPN}}$ from $g_{00}$ expansion | $\beta_{\text{PPN}}=1$ | Residual inside ledger tolerance |
| Space curvature/refraction | $\gamma_{\text{eff}}$ from Shapiro estimator | $\gamma_{\text{PPN}}=1$ | Residual inside ledger tolerance |
| Preferred-frame leakage | $(\alpha_1,\alpha_2,\alpha_3)$ from $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ | all $\approx 0$ | No significant nonzero leakage |
| Newtonian limit | $\mathbf{a}=-\nabla\Phi_{\text{eff}}$ (weak field) | exact leading-order recovery | No constitutive contradiction |
| Cross-observable consistency | same constitutive coefficients across delay, redshift, precession, lensing | single-parameter-set closure | No per-observable re-fit |

Numeric pass/fail thresholds are taken from [validation/constraint-ledger.md](../validation/constraint-ledger.md).

### Closure Program Interface (observable decision layer)

This chapter is the observable-side gate for the emergent-metric closure.

Define the PPN decision vector:
$$
\mathbf{p}_{\mathrm{PPN}}=
\bigl(\gamma_{\mathrm{eff}}-1,\ \beta_{\mathrm{eff}}-1,\ \alpha_1,\ \alpha_2,\ \alpha_3\bigr).
$$
The weak-field closure target is
$$
\mathbf{p}_{\mathrm{PPN}}\approx \mathbf{0}
$$
within the benchmark tolerances listed in the validation ledger.

Cross-chapter integration:
- constitutive map source: [spacetime/emergent-metric.md](./emergent-metric.md)
- clock-law coefficient extraction: [spacetime/proper-time-and-time-dilation.md](./proper-time-and-time-dilation.md)
- threshold enforcement: [validation/constraint-ledger.md](../validation/constraint-ledger.md)

### Numeric Closure Pipeline and Global Objective

To enforce cross-observable closure without parameter bloat, use a single constitutive vector and a fixed projection to the PPN decision manifold.

Define
$$
\mathbf{\theta}
\equiv
\begin{pmatrix}
\gamma_{\text{eff}}\\
C_2\\
\Xi_1\\
\Xi_2\\
\Xi_3
\end{pmatrix},
\qquad
\mathbf{p}_{\mathrm{PPN}}
\equiv
\begin{pmatrix}
\gamma_{\mathrm{PPN}}-1\\
\beta_{\mathrm{PPN}}-1\\
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix}.
$$
Using
$$
\beta_{\mathrm{PPN}}-1=\left(\frac{1+2C_2}{2}\right)-1=C_2-\frac12,
\qquad
\alpha_1=\Xi_1,\ \alpha_2=\Xi_2,\ \alpha_3=\Xi_1-\Xi_2-\Xi_3,
$$
the map is the exact linear projection
$$
\mathbf{p}_{\mathrm{PPN}}=\mathbf{J}\mathbf{\theta}-\mathbf{p}_0,
$$
with
$$
\mathbf{p}_0=
\begin{pmatrix}
1\\[2pt]
\frac12\\[2pt]
0\\
0\\
0
\end{pmatrix},
\qquad
\mathbf{J}
=
\begin{pmatrix}
1 & 0 & 0 & 0 & 0\\
0 & 1 & 0 & 0 & 0\\
0 & 0 & 1 & 0 & 0\\
0 & 0 & 0 & 1 & 0\\
0 & 0 & 1 & -1 & -1
\end{pmatrix}.
$$

If $\Sigma_\theta$ is the covariance of the constitutive fit from micro-simulations, propagate uncertainty by
$$
\Sigma_{\mathrm{PPN}}=\mathbf{J}\Sigma_\theta\mathbf{J}^{\mathsf T}.
$$

Define the single Tier-1 weighted closure objective
$$
\mathcal{L}(\mathbf{\theta})=\mathbf{p}_{\mathrm{PPN}}^{\mathsf T}\mathbf{W}\,\mathbf{p}_{\mathrm{PPN}},
$$
where $\mathbf{W}$ is the precision matrix from ledger tolerances.
With representative Tier-1 bounds
$|\gamma_{\mathrm{PPN}}-1|,\ |\beta_{\mathrm{PPN}}-1|\lesssim 10^{-5}$ and
$|\alpha_i|\lesssim 10^{-17}$,
$$
\mathbf{W}
=
\operatorname{diag}\!\left(10^{10},\,10^{10},\,10^{34},\,10^{34},\,10^{34}\right).
$$

Forward-only evaluation rule:
1. Calibrate $\mathbf{\theta}$ and $\Sigma_\theta$ from micro-scale clock/refraction simulations.
2. Project once to $(\mathbf{p}_{\mathrm{PPN}},\Sigma_{\mathrm{PPN}})$ and evaluate $\mathcal{L}(\mathbf{\theta})$.
3. Predict macroscopic observables (Shapiro, precession, redshift, lensing) with this fixed parameter set.
4. If any observable fails its ledger gate, reject the constitutive map; do not refit per observable.

### Forward Observable Projection (Weak-Field Classical Set)

To force cross-observable closure in a single forward pass, define
$$
\mathbf{O}(\mathbf{\theta})
\equiv
\begin{pmatrix}
\Delta t_{\text{Shap}}\\
\Delta\phi_{\text{Def}}\\
\Delta\omega_{\text{Prec}}\\
z_{\text{Red}}
\end{pmatrix}.
$$
Using the weak-field constitutive map of $\mathbb{A}\mathbb{A}\mathbb{A}$:

1. Shapiro delay:
$$
O_1(\mathbf{\theta})=K_{\text{Shap}}(1+\gamma_{\text{eff}}),
\qquad
K_{\text{Shap}}=
\frac{GM}{c_f^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right).
$$
For two-way radar-style Shapiro measurements, apply the same kernel on each leg and sum the two one-way contributions.
2. Light deflection:
$$
O_2(\mathbf{\theta})=K_{\text{Def}}(1+\gamma_{\text{eff}}),
\qquad
K_{\text{Def}}=\frac{2GM}{b\,c_f^2}.
$$
3. Perihelion precession per orbit:
$$
O_3(\mathbf{\theta})
=
K_{\text{Prec}}\left(2+2\gamma_{\text{PPN}}-\beta_{\text{PPN}}\right)
=
K_{\text{Prec}}\left(1.5+2\gamma_{\text{eff}}-C_2\right),
$$
$$
K_{\text{Prec}}=\frac{2\pi GM}{a(1-e^2)c_f^2}.
$$
4. Gravitational redshift (to retained order):
$$
O_4(\mathbf{\theta})
=
K_{\text{Red1}}-K_{\text{Red2}}C_2,
\qquad
K_{\text{Red1}}=\frac{\Delta U}{c_f^2},
\quad
K_{\text{Red2}}=\frac{\Delta(U^2)}{c_f^4}.
$$

First-order observable sensitivities are
$$
\mathbf{J}_O
\equiv
\frac{\partial\mathbf{O}}{\partial\mathbf{\theta}}
=
\begin{pmatrix}
K_{\text{Shap}} & 0 & 0 & 0 & 0\\
K_{\text{Def}} & 0 & 0 & 0 & 0\\
2K_{\text{Prec}} & -K_{\text{Prec}} & 0 & 0 & 0\\
0 & -K_{\text{Red2}} & 0 & 0 & 0
\end{pmatrix},
$$
and the propagated covariance is
$$
\Sigma_O=\mathbf{J}_O\Sigma_\theta\mathbf{J}_O^{\mathsf T}.
$$
For this spherically symmetric classical set, preferred-frame channels $(\Xi_1,\Xi_2,\Xi_3)$ decouple at leading order; they are constrained by dedicated drift/leakage observables.

### Worked Solar-System Reference Projection (Synthetic Calibration Example)

Use
$$
\frac{GM_\odot}{c_f^2}=1.4766\times 10^3\ \mathrm{m},
\qquad
\frac{GM_\odot}{c_f^3}=4.925\times 10^{-6}\ \mathrm{s},
$$
with reference kernels
$$
K_{\text{Shap}}=70.4\ \mu\mathrm{s},
\quad
K_{\text{Def}}=0.875'' ,
\quad
K_{\text{Prec}}=14.3''/\mathrm{cy},
\quad
K_{\text{Red1}}=2.12\times 10^{-6},
\quad
K_{\text{Red2}}=4.50\times 10^{-12}.
$$
Take a synthetic constitutive fit
$$
\mathbf{\theta}
=
\begin{pmatrix}
1+1.2\times 10^{-5}\\
0.5+0.8\times 10^{-5}\\
10^{-18}\\
-0.5\times 10^{-18}\\
0.2\times 10^{-18}
\end{pmatrix},
$$
$$
\Sigma_\theta=
\operatorname{diag}\!\left(
0.25\times 10^{-10},
0.16\times 10^{-10},
10^{-36},
10^{-36},
10^{-36}
\right).
$$
This block is an internal consistency projection example, not a claim of experimental pass/fail by itself.

Projection to decision space gives
$$
\gamma_{\mathrm{PPN}}-1=1.2\times 10^{-5},
\quad
\beta_{\mathrm{PPN}}-1=0.8\times 10^{-5},
\quad
(\alpha_1,\alpha_2,\alpha_3)=\left(10^{-18},-0.5\times 10^{-18},1.3\times 10^{-18}\right).
$$
Forward observables are
$$
\Delta t_{\text{Shap}}=140.80084\ \mu\mathrm{s},
\quad
\Delta\phi_{\text{Def}}=1.75001'',
\quad
\Delta\omega_{\text{Prec}}=42.9002''/\mathrm{cy},
$$
$$
z_{\text{Red}}\approx 2.119997\times 10^{-6}.
$$
Propagated $1\sigma$ scales (diagonal approximation) are
$$
\sigma_{\text{Shap}}\approx 3.5\times 10^{-4}\ \mu\mathrm{s},
\quad
\sigma_{\text{Def}}\approx 4.3\times 10^{-6}'',
\quad
\sigma_{\text{Prec}}\approx 1.5\times 10^{-4}''/\mathrm{cy},
\quad
\sigma_{\text{Red}}\approx 1.8\times 10^{-17}.
$$

Failure rule for this closure layer:
if any observed value lies outside
$$
\mathbf{O}(\mathbf{\theta})\pm 3\sqrt{\operatorname{diag}(\Sigma_O)},
$$
the constitutive map fails this gate and must be replaced rather than re-fit per observable.

### Real-Data Joint Likelihood (Benchmark Inputs)

Using the forward map above, define the joint likelihood
$$
\ln \mathcal{L}(\mathbf{\theta})
=
-\frac{1}{2}
\bigl(\mathbf{O}(\mathbf{\theta})-\mathbf{O}_{\text{obs}}\bigr)^{\mathsf T}
\Sigma_{\text{obs}}^{-1}
\bigl(\mathbf{O}(\mathbf{\theta})-\mathbf{O}_{\text{obs}}\bigr),
$$
with
$$
\mathbf{\theta}=
\left(\gamma_{\text{eff}},C_2,\Xi_1,\Xi_2,\Xi_3\right)^{\mathsf T}.
$$

Benchmark observable inputs for the classical weak-field suite are:
1. Cassini Shapiro: $\gamma_{\text{obs}}-1=(2.1\pm2.3)\times 10^{-5}$.
2. VLBI solar deflection: $\gamma_{\text{obs}}-1=(-0.8\pm1.2)\times 10^{-4}$.
3. Mercury precession combination: $(2\gamma_{\text{obs}}-\beta_{\text{obs}})=1\pm 3.0\times 10^{-5}$.
4. Galileo/GPA redshift channel: first-order limit $\sim 2.5\times 10^{-5}$ with weak second-order sensitivity to $C_2$.

For this spherical classical set, the Jacobian structure satisfies
$$
\frac{\partial \mathbf{O}}{\partial \Xi_1}
=
\frac{\partial \mathbf{O}}{\partial \Xi_2}
=
\frac{\partial \mathbf{O}}{\partial \Xi_3}
=
\mathbf{0},
$$
so the Fisher matrix is rank-2 in this fit and $(\Xi_1,\Xi_2,\Xi_3)$ remain unconstrained by this subset alone.

Reducing to $\mathbf{\theta}_{\text{red}}=(\gamma_{\text{eff}},C_2)^{\mathsf T}$, the inferred covariance is
$$
\Sigma_{\theta_{\text{red}}}
=
\begin{pmatrix}
5.1\times 10^{-10} & 1.02\times 10^{-9}\\
1.02\times 10^{-9} & 2.94\times 10^{-9}
\end{pmatrix},
$$
with maximum-likelihood point
$$
\gamma_{\text{eff}}=1+(2.03\pm2.26)\times 10^{-5},
\qquad
C_2=0.5+(4.06\pm5.42)\times 10^{-5},
$$
and correlation
$$
\rho(\gamma_{\text{eff}},C_2)=+0.83.
$$

Interpretation for closure:
1. A single constitutive vector can fit the selected classical observables without per-observable retuning.
2. Preferred-frame channels require additional drift-sensitive observables (LLR, pulsar timing, dedicated anisotropy tests) to close $(\Xi_1,\Xi_2,\Xi_3)$.
3. The positive $\gamma_{\text{eff}}$-$C_2$ covariance defines the accepted trade-off direction when matching precession jointly with refractive observables.

### Preferred-Frame Parameter Degeneracy Resolution (Augmented Likelihood)

Define the preferred-frame constitutive vector
$$
\boldsymbol{\Xi}\equiv(\Xi_1,\Xi_2,\Xi_3)^{\mathsf T}.
$$
For the spherical classical set above, $\boldsymbol{\Xi}$ is unconstrained. For an expanded drift-sensitive baseline (ephemerides + LLR + anisotropy channels), treat the preferred-frame Fisher block as
$$
\mathcal{I}_{\Xi,\text{base}}
=
-\mathbb{E}\!\left[
\nabla_{\boldsymbol{\Xi}}
\nabla_{\boldsymbol{\Xi}}^{\mathsf T}
\ln \mathcal{L}_{\text{base}}
\right],
$$
with rank-2 degeneracy and null direction $\hat n$:
$$
\mathcal{I}_{\Xi,\text{base}}\hat n=\mathbf{0}.
$$

Minimal augmentation:
1. Binary-pulsar eccentricity drift channel $\dot e$ (orbital polarization sensitivity).
2. Solitary millisecond-pulsar spin channel $\dot P$ (self-acceleration sensitivity).

Use joint likelihood
$$
\ln \mathcal{L}_{\text{joint}}(\boldsymbol{\Xi}\mid\mathcal{D})
=
\ln \mathcal{L}_{\text{base}}
+\ln \mathcal{L}_{\dot e}
+\ln \mathcal{L}_{\dot P}.
$$
The augmented Fisher matrix is
$$
\mathcal{I}_{\Xi,\text{total}}
=
\mathcal{I}_{\Xi,\text{base}}
+\frac{1}{\sigma_{\dot e}^2}
\left(\nabla_{\boldsymbol{\Xi}}\dot e\right)\!
\left(\nabla_{\boldsymbol{\Xi}}\dot e\right)^{\mathsf T}
+\frac{1}{\sigma_{\dot P}^2}
\left(\nabla_{\boldsymbol{\Xi}}\dot P\right)\!
\left(\nabla_{\boldsymbol{\Xi}}\dot P\right)^{\mathsf T}.
$$

Degeneracy-lift criterion:
$$
\det\!\left(\mathcal{I}_{\Xi,\text{total}}\right)>0
$$
which is equivalent to nonzero projection of the added gradient span onto the null direction $\hat n$.

Operational closure consequence:
if this criterion is met with real timing data, the posterior over $(\Xi_1,\Xi_2,\Xi_3)$ closes to a bounded ellipsoid instead of a flat valley.

Failure mode for the constitutive cosmology map:
if the inferred $\boldsymbol{\Xi}$ is significantly nonzero and incompatible with the independently inferred medium-drift direction from the CMB dipole, the single preferred-frame mapping in $\mathbb{A}\mathbb{A}\mathbb{A}$ is broken.

Simulation-to-data interface requirement:
populate
$$
\nabla_{\boldsymbol{\Xi}}\dot e,\qquad
\nabla_{\boldsymbol{\Xi}}\dot P
$$
from tri-binary continuum simulations before final numerical acceptance testing.
