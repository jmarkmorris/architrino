# PPN Parameters

This chapter is the canonical home for weak-field/PPN expansion details used by
the spacetime constitutive map.

## Canonical Symbols

- $n$: normalized Noether braid density, with $\rho_{\text{NS}}=\rho_{\text{NS},0}n$.
- $\chi_{\text{sea}}$: Noether sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$.
- $c_0\equiv c_{\text{eff}}(\infty)$: asymptotic homogeneous observer-channel speed used in weak-field PPN comparisons.
- $\Phi_N$: Newtonian benchmark potential.
- $\Phi_{\text{eff}}$: constitutive effective potential from the clock channel.
- $U\equiv -\Phi_N>0$: positive PPN expansion variable (default).
- $U_{\Phi}\equiv -\Phi_{\text{eff}}>0$: constitutive-channel variant used when expanding directly in $\Phi_{\text{eff}}$.

## Mapping to PPN Constraints

1. **Shapiro Delay**: Map the GR time-delay (longer path in curved space) to the $\mathbb{A}\mathbb{A}\mathbb{A}$ time-delay (slower $c_{\text{eff}}$ in the Noether sea).
2. **Light Bending**: Calculate Noether sea signal propagation through the density gradient around the Sun.
3. **Geodetic Precession**: Match the transport of an assembly's spin-orientation frame through the same weak-field effective metric used for clock, signal, and orbital tests.

Here, geodetic precession means the de Sitter precession of a carried gyroscope: after the gyroscope moves through a weak gravitational field, its spin axis is rotated relative to a distant reference frame. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this should not be introduced as a separate torque law between angular momentum and a potential gradient. It is a closure target for the effective metric: the Noether sea-induced clock, ruler, and signal-response map must make transported assembly orientations precess by the same amount that GR predicts in the validated weak-field regime. Frame dragging from a rotating source is a separate test channel.


## Testing the Euclidean Anchor (Shapiro Delay)

1. **The Test**: Calculate travel time of a signal from Earth to a probe behind the Sun using the Euclidean straight-line anchor supplied by the $\mathbb{U}_{\text{now}}$ state record.
2. **$\mathbb{A}\mathbb{A}\mathbb{A}$ Model**: Signal follows a straight Euclidean line. Delay is caused by increased Noether sea response near the Sun, expressed by the Noether sea delay factor $\chi_{\text{sea}}$.
3. **Comparison**: Contrast $\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}$ with the GR weak-field form.
4. **$\mathbb{U}_{\text{now}}$ Role**: $\mathbb{U}_{\text{now}}$ provides the "straight line" benchmark against which the "curved path" of GR is compared.

## Explicit Weak-Field Noether Sea Delay Map (PPN $\gamma$)

Adopt a weak-field PPN-normalized Noether sea delay-factor ansatz for signal propagation in the Noether braid medium:
$$
\bar{\chi}_{\text{sea}}(\mathbf X,T)
\equiv
\frac{c_0}{c_{\text{eff}}(\mathbf X,T)}
=
\frac{c_0}{c_f}\chi_{\text{sea}}(\mathbf X,T)
= 1 - (1+\gamma_{\text{eff}})\frac{\Phi_N(\mathbf X,T)}{c_0^2}
+ \mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$
with $\Phi_N<0$ near a mass source. For a point mass $M$,
$$
\Phi_N(r)=-\frac{GM}{r}
\quad\Rightarrow\quad
\bar{\chi}_{\text{sea}}(r)=1+(1+\gamma_{\text{eff}})\frac{GM}{c_0^2 r}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_0^4 r^2}\right)
$$

For a one-way signal along a Euclidean straight path $\Gamma$ (the $\mathbb{U}_{\text{now}}$ anchor),
$$
t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{1}{c_0}\int_\Gamma \bar{\chi}_{\text{sea}}(\mathbf X,T)\,ds
=\frac{R}{c_0}+\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
$$
where $R=\int_\Gamma ds$ is Euclidean path length and
$$
\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{1}{c_0}\int_\Gamma (\bar{\chi}_{\text{sea}}-1)\,ds
=\frac{(1+\gamma_{\text{eff}})GM}{c_0^3}\int_\Gamma \frac{ds}{r(s)}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_0^5}\right)
$$

Evaluating the line integral for endpoint radii $r_1,r_2$ and Euclidean endpoint separation $R$ gives
$$
\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{(1+\gamma_{\text{eff}})GM}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+\mathcal{O}\!\left(\frac{G^2M^2}{c_0^5}\right)
$$
which is the standard 1PN Shapiro form with $\gamma\to\gamma_{\text{eff}}$ and $c\to c_0$. The primitive wake speed $c_f$ remains in the unnormalized delay factor $\chi_{\text{sea}}=c_f/c_{\text{eff}}$; observer-facing PPN timing uses the asymptotic dressed speed $c_0$.

So the operational estimator is
$$
\gamma_{\text{eff}}
=
\frac{c_0^3\,\Delta t_{\text{obs}}}
{GM\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)}
-1
$$
with $\Delta t_{\text{obs}}=t_{\text{obs}}-R/c_0$.

In the weak-field solar-system regime, $\gamma_{\text{eff}}$ is the direct refractive-space-curvature map parameter.

The same Shapiro map also fixes the first-order signal-delay response coefficient

$$
a_\chi^{\mathrm{sig}}=1+\gamma_{\text{eff}}
$$

This is not automatically the clock coefficient $a_\chi$ used in the static $\Gamma_N$ endpoint row. The shared clock/signal delay branch is the additional condition

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
\equiv
a_\chi-a_\chi^{\mathrm{sig}}
=0
$$

When this residual vanishes, Shapiro delay and gravitational clock redshift are using the same first-order Noether sea delay response. When it does not vanish, PPN delay, redshift, lensing, pressure-response, and cosmological redshift comparisons must carry the residual explicitly rather than refitting $\chi_{\text{sea}}$ per observable.

## PPN Parameters and the Euclidean Anchor

### Parameter $\gamma$ (Space Curvature / Refraction)
* **GR Context:** Measures the amount of space curvature produced by unit rest mass.
* **$\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation:** Measures the refractive response of the [Noether sea](noether-sea.md). A massive body increases local assembly density, slowing the effective signal speed $c_{\text{eff}}(\mathbf X,T)$ relative to the asymptotic observer speed $c_0$, while $c_f$ remains the primitive wake speed.
* **Observable:** Shapiro-delay coefficient in the explicit refractive integral above.

The light-bending half-test makes the same point numerically. A lapse-only weak-field map gives the Newtonian-scale deflection
$$
\Delta\theta_{\mathrm{half}}
=
\frac{2GM}{b\,c_0^2}
$$
while the full GR-matching target is
$$
\Delta\theta_{\mathrm{GR}}
=
\frac{4GM}{b\,c_0^2}
$$
In the forward projection below, the missing half is precisely the $\gamma_{\text{eff}}$ spatial-compliance contribution. Therefore a constitutive map cannot claim PPN closure by matching Shapiro delay with a scalar delay factor while leaving the ruler/spatial-compliance row undefined.

### Parameter $\beta$ (Non-linearity of Gravity)
* **GR Context:** Measures the non-linearity in the superposition of gravitational fields.
* **$\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation:** Captures second-order (in potential) clock/medium response from self-hit and Noether sea constitutive nonlinearity.
* **Explicit map from constitutive expansion:** Let $U\equiv-\Phi_N>0$ and expand the static clock law
$$
\frac{d\tau}{dt_{\mathrm{eff}}}\bigg|_{v=0}
=
1-\frac{U}{c_0^2}
+C_2(a,k)\frac{U^2}{c_0^4}
+\mathcal{O}\!\left(\frac{U^3}{c_0^6}\right)
$$
Since $-g_{00}=(d\tau/dt_{\mathrm{eff}})^2$ for a static observer,
$$
g_{00}
=
-1
+2\frac{U}{c_0^2}
-\bigl[1+2C_2(a,k)\bigr]\frac{U^2}{c_0^4}
+\mathcal{O}\!\left(\frac{U^3}{c_0^6}\right)
$$
Match to the PPN form
$$
g_{00}^{\mathrm{PPN}}
=
-1+2\frac{U}{c_0^2}-2\beta_{\mathrm{eff}}\frac{U^2}{c_0^4}+\cdots
$$
to obtain
$$
\boxed{\beta_{\mathrm{eff}}(a,k)=\frac{1+2C_2(a,k)}{2}}
$$
Equivalently, if $\alpha(\mathcal{I})=1+\lambda_t\mathcal{I}+\frac{1}{2}\lambda_{tt}\mathcal{I}^2$ and
$\mathcal{I}=\chi_1(a,k)\,U/c_0^2+\chi_2(a,k)\,U^2/c_0^4+\cdots$, then
$$
\beta_{\mathrm{eff}}(a,k)
=
\frac{1}{2}
+\lambda_t\chi_2(a,k)
+\frac{1}{2}\lambda_{tt}\chi_1(a,k)^2
$$
* **Observable:** Perihelion precession and other 1PN nonlinear-potential tests.

### Exponential clock-law subclass (direct map)

If the constitutive clock channel is exactly
$$
\Omega\xi=e^{\Phi_{\text{eff}}/c_0^2},
\qquad
g_{00}=-(\Omega\xi)^2
$$
then with $U_{\Phi}\equiv -\Phi_{\text{eff}}$:
$$
g_{00}
=
-e^{2\Phi_{\text{eff}}/c_0^2}
=
-1+2\frac{U_{\Phi}}{c_0^2}-2\frac{U_{\Phi}^2}{c_0^4}+O(c_0^{-6})
$$
so this subclass yields
$$
\boxed{\beta_{\text{PPN}}=1}
$$
without additional fit freedom.

Here $\Omega\xi$ is the local clock-rate factor $d\tau/dt_{\mathrm{eff}}$ in this subclass. The Noether sea cadence-stretch factor used in redshift bookkeeping is its inverse, $\Gamma_N=(\Omega\xi)^{-1}$, when the same local clock channel is being compared.

The general $C_2(a,k)$ map above remains the umbrella constitutive form; the exponential channel is the closure-special case where it collapses to GR's $\beta=1$ exactly.
When $\Phi_{\text{eff}}=\Phi_N+O(\Phi_N^2/c_0^2)$, one has $U_{\Phi}=U+O(U^2/c_0^2)$ at weak field.

### Preferred Frame Parameters ($\alpha_1, \alpha_2, \alpha_3$)
* **Crucial test:** In the effective relativistic limit these must vanish (no measurable preferred-frame leakage).
* **Constitutive leakage ansatz:** Let $\mathbf{w}$ be the Noether sea drift velocity relative to the barycentric frame. Write the lowest-order drift terms as
$$
g_{0i}^{\text{leak}}
=
-\frac{1}{2}\Xi_1(a,k)\frac{w_i U}{c_0^3}
-\Xi_2(a,k)\frac{w^j U_{ij}}{c_0^3}
$$
$$
g_{00}^{\text{leak}}
=
-\Xi_3(a,k)\frac{w^2 U}{c_0^4}
-\Xi_2(a,k)\frac{w^i w^j U_{ij}}{c_0^4}
+\Xi_4(a,k)\frac{w^i V_i}{c_0^3}
$$
Matching to standard PPN preferred-frame structure gives
$$
\boxed{\alpha_1(a,k)=\Xi_1(a,k)},\qquad
\boxed{\alpha_2(a,k)=\Xi_2(a,k)}
$$
$$
\boxed{\alpha_3(a,k)=\Xi_1(a,k)-\Xi_2(a,k)-\Xi_3(a,k)}
$$
with consistency relation
$$
\Xi_4(a,k)=2\alpha_3-\alpha_1=\Xi_1-2\Xi_2-2\Xi_3
$$

## Zero-Leakage Conditions (Preferred-Frame Closure)

The effective theory is preferred-frame safe iff all drift couplings vanish:
$$
\Xi_1=\Xi_2=\Xi_3=\Xi_4=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0
$$

Equivalent constitutive conditions:
$$
\left.\frac{\partial g_{\mu\nu}}{\partial w_i}\right|_{\mathbf{w}=0}=0,
\qquad
\left.\frac{\partial^2 g_{00}}{\partial w_i\partial w_j}\right|_{\mathbf{w}=0}
\propto \delta_{ij}
\ \text{with zero traceless part}
$$
and no momentum-density coupling term $w^iV_i$ at the retained PN order.

The coefficients $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ parameterize preferred-frame leakage terms in the weak-field constitutive expansion.

## Preferred-Motion Null-Test Bundle

Historical clock, interferometer, Zeeman-splitting, and gravimeter tests show how many different apparatus types can search for the same preferred-frame leakage without sharing the same dominant nuisance. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this becomes a bundle test on the same drift coefficients, not a set of independent fit parameters. For an apparatus channel $A$ with orientation $\hat{\mathbf{n}}_A(t)$ and laboratory velocity $\mathbf{w}(t)$ relative to the Noether sea rest comparison frame, write the leading fractional readout as
$$
y_A(t)
=
y_{A,0}
+\mathbf{s}_A^{\mathsf T}
\begin{pmatrix}
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix}
\frac{w^2(t)}{c_0^2}
+\zeta_A
\frac{
\left(\mathbf{w}(t)\cdot\hat{\mathbf{n}}_A(t)\right)^2
-w^2(t)/3
}{c_0^2}
+n_A(t)
$$
Here $\mathbf{s}_A$ is the PPN sensitivity row for the channel, $\zeta_A$ is an allowed apparatus-calibration nuisance fixed by the instrument model, and $n_A$ is detector/environment noise. The shared preferred-frame residual is
$$
\mathcal{R}_{\mathrm{PF\text{-}bundle}}
=
\sum_A
\left\|
y_A^{\mathrm{obs}}-y_A^{\theta}
\right\|_{C_A^{-1}}^2
+
\lambda_{\mathrm{PF}}
\left(\alpha_1^2+\alpha_2^2+\alpha_3^2\right)
$$
The bundle fails if one clock or material channel requires a nonzero $\alpha_i$ that another channel excludes, or if the orientation/annual term is hidden in $\zeta_A$ rather than projected through $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$.

## Weak-Field Constraint Table (Decision Layer)

Use this table to close the constitutive loop against modern benchmarks.

| Channel | Model estimator | GR/PPN target | Closure requirement |
| --- | --- | --- | --- |
| Time nonlinearity | $\beta_{\text{PPN}}$ from $g_{00}$ expansion | $\beta_{\text{PPN}}=1$ | Residual inside ledger tolerance |
| Space curvature/refraction | $\gamma_{\text{eff}}$ from the shared spatial-compliance row, with Shapiro and lensing as projections | $\gamma_{\text{PPN}}=1$ | Residual inside ledger tolerance |
| Preferred-frame leakage | $(\alpha_1,\alpha_2,\alpha_3)$ from $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ | all $\approx 0$ | No significant nonzero leakage |
| Newtonian limit | $\mathbf{a}=-\nabla\Phi_{\text{eff}}$ (weak field) | exact leading-order recovery | No constitutive contradiction |
| Cross-observable consistency | same constitutive coefficients across delay, redshift, precession, lensing, acceleration, and preferred-frame tests | single-parameter-set closure | No per-observable re-fit |

Numeric pass/fail thresholds are taken from [validation/constraint-ledger.md](../validation/constraint-ledger.md).

## Source-Mined Benchmark Bound Vector

The Will-style weak-field comparison is not a single "GR matches" flag. It is a bound vector on distinct leakage channels:
$$
\mathbf{b}_{\mathrm{Will}}
=
\begin{pmatrix}
2.3\times 10^{-5}\\
8\times 10^{-5}\\
4\times 10^{-5}\\
2\times 10^{-9}\\
4\times 10^{-20}
\end{pmatrix}
$$
ordered as
$$
\left(
|\gamma_{\mathrm{PPN}}-1|,
|\beta_{\mathrm{PPN}}-1|,
|\alpha_1|,
|\alpha_2|,
|\alpha_3|
\right)
$$
The first row is the Cassini time-delay bound on $\gamma_{\mathrm{PPN}}-1$; the second uses the perihelion-shift row for $\beta_{\mathrm{PPN}}-1$; the preferred-frame rows use the best listed weak-field/strong-field analogue bounds. Strong-field pulsar bounds should not be silently reclassified as solar-system PPN measurements, but they are valid closure pressure: any $\mathbb{A}\mathbb{A}\mathbb{A}$ drift leakage that survives in ordinary clocks, orbits, or pulsar timing must project below the corresponding row unless a separate strong-field screening mechanism is derived.

The decision residual is therefore the componentwise normalized vector
$$
\mathbf{q}_{\mathrm{PPN}}
=
\operatorname{diag}(\mathbf{b}_{\mathrm{Will}})^{-1}
\begin{pmatrix}
\gamma_{\mathrm{PPN}}-1\\
\beta_{\mathrm{PPN}}-1\\
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix}
$$
Weak-field closure requires
$$
\|\mathbf{q}_{\mathrm{PPN}}\|_\infty \le 1
$$
before any strong-field deviation is advertised as a prediction. This is stricter than matching Shapiro delay alone because it forces the same constitutive metric row to suppress preferred-frame terms in $g_{0i}^{\mathrm{eff}}$ and $g_{00}^{\mathrm{eff}}$.

The SME-style Lorentz-test family supplies a second, non-PPN layer. Photon-sector cavity tests constrain two-way orientation-dependent frequency shifts at the $\Delta\nu/\nu\sim10^{-18}$ level, while the SME data tables organize photon, matter, neutrino, and gravity coefficients in the standard Sun-centered frame. For this chapter the safe import is not a new ontology. It is the validation rule that any effective metric or clock/ruler channel must report which SME-like residual it would excite:
$$
\epsilon_{\mathrm{SME}}^{\mathrm{eff}}
=
\max\left(
\|\tilde\kappa_{e-}^{\mathrm{eff}}\|,
\|\tilde\kappa_{o+}^{\mathrm{eff}}\|,
|\tilde\kappa_{\mathrm{tr}}^{\mathrm{eff}}|,
\|\bar{s}^{\mu\nu}_{\mathrm{eff}}\|
\right)
$$
with $\tilde\kappa_{\bullet}^{\mathrm{eff}}$ used as photon-sector comparison coefficients and $\bar{s}^{\mu\nu}_{\mathrm{eff}}$ used as a gravity-sector comparison coefficient. These are observer-level projection diagnostics; they are not substrate coefficients added to the Euclidean void.

## Closure Program Interface (Observable Decision Layer)

This chapter is the observable-side gate for the emergent-metric closure.

Define the PPN decision vector:
$$
\mathbf{p}_{\mathrm{PPN}}=
\bigl(\gamma_{\mathrm{eff}}-1,\ \beta_{\mathrm{eff}}-1,\ \alpha_1,\ \alpha_2,\ \alpha_3\bigr)
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

## ADM/Cartan Extraction Equations

The PPN vector must be extracted from the same ADM/Cartan fields used by the effective metric map, not from observable-specific fits. With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the line element
$$
ds_{\mathrm{eff}}^2
=
-N^2c_0^2dt_{\mathrm{eff}}^2
+
\gamma_{ij}^{\mathrm{eff}}
\left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
\left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
$$
gives the observer-sector metric components
$$
g_{00}^{\mathrm{eff}}
=
-N^2+\frac{\gamma_{ij}^{\mathrm{eff}}u^i_{\mathrm{sea,eff}}u^j_{\mathrm{sea,eff}}}{c_0^2},
\qquad
g_{0i}^{\mathrm{eff}}
=
-\frac{\gamma_{ij}^{\mathrm{eff}}u^j_{\mathrm{sea,eff}}}{c_0},
\qquad
g_{ij}^{\mathrm{eff}}=\gamma_{ij}^{\mathrm{eff}}
$$

In the local Noether sea rest weak-field row, write
$$
N
=
1-\frac{U_{\Phi}}{c_0^2}
+C_2\frac{U_{\Phi}^2}{c_0^4}
+O(c_0^{-6},\epsilon_{\mathrm{LV}})
$$
and extract
$$
\gamma_{\mathrm{PPN}}
=
\frac{c_0^2}{2U_{\Phi}}
\left(
\frac{h^{ij}\gamma_{ij}^{\mathrm{eff}}}{3}-1
\right)
+O(U_{\Phi}/c_0^2,\epsilon_{\mathrm{LV}}),
\qquad
\beta_{\mathrm{PPN}}-1=C_2-\frac12
$$
The preferred-frame coefficients are the retained drift coefficients in $g_{0i}^{\mathrm{eff}}$ and $g_{00}^{\mathrm{eff}}$ under the $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ expansion above, with
$$
\alpha_1=\Xi_1,\qquad
\alpha_2=\Xi_2,\qquad
\alpha_3=\Xi_1-\Xi_2-\Xi_3
$$

For a declared observation window $W$, the shared weak-field residual can be recorded as
$$
\mathbf{r}_{\mathrm{weak}}(\theta;W)
=
\begin{pmatrix}
R_{\mathrm{red}}\\
R_{\mathrm{Shap}}\\
R_{\mathrm{lens}}\\
R_{\mathrm{acc}}\\
\gamma_{\mathrm{PPN}}-1\\
\beta_{\mathrm{PPN}}-1\\
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix}
$$
with
$$
R_{\mathrm{acc}}
=
\frac{\left\|\frac{d^2\mathbf x_{\mathrm{eff}}}{dt_{\mathrm{eff}}^2}+\nabla\Phi_{\text{eff}}\right\|_W}
{\left\|\nabla\Phi_{\text{eff}}\right\|_W+\varepsilon}
$$
The other residuals are the redshift, Shapiro, and lensing differences computed from the same $\theta$ and the forward projection below. This strengthens the existing decision layer; it is not a separate gate.

## Numeric Closure Pipeline and Global Objective

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
\end{pmatrix}
$$
Using
$$
\beta_{\mathrm{PPN}}-1=\left(\frac{1+2C_2}{2}\right)-1=C_2-\frac12,
\qquad
\alpha_1=\Xi_1,\ \alpha_2=\Xi_2,\ \alpha_3=\Xi_1-\Xi_2-\Xi_3
$$
the map is the exact linear projection
$$
\mathbf{p}_{\mathrm{PPN}}=\mathbf{J}\mathbf{\theta}-\mathbf{p}_0
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
\end{pmatrix}
$$

If $\Sigma_\theta$ is the covariance of the constitutive fit from micro-simulations, propagate uncertainty by
$$
\Sigma_{\mathrm{PPN}}=\mathbf{J}\Sigma_\theta\mathbf{J}^{\mathsf T}
$$

Define the single Tier-1 weighted closure objective
$$
\mathcal{L}(\mathbf{\theta})=\mathbf{p}_{\mathrm{PPN}}^{\mathsf T}\mathbf{W}\,\mathbf{p}_{\mathrm{PPN}}
$$
where $\mathbf{W}$ is the precision matrix from ledger tolerances.
With the source-mined benchmark vector above,
$$
\mathbf{W}
=
\operatorname{diag}\!\left(
(2.3\times10^{-5})^{-2},
(8\times10^{-5})^{-2},
(4\times10^{-5})^{-2},
(2\times10^{-9})^{-2},
(4\times10^{-20})^{-2}
\right)
$$

Forward-only evaluation rule:
1. Calibrate $\mathbf{\theta}$ and $\Sigma_\theta$ from micro-scale clock/refraction simulations.
2. Project once to $(\mathbf{p}_{\mathrm{PPN}},\Sigma_{\mathrm{PPN}})$ and evaluate $\mathcal{L}(\mathbf{\theta})$.
3. Predict macroscopic observables (Shapiro, precession, redshift, lensing) with this fixed parameter set.
4. If any observable fails its ledger gate, reject the constitutive map; do not refit per observable.

## Forward Observable Projection (Weak-Field Classical Set)

To force cross-observable closure in a single forward pass, define
$$
\mathbf{O}(\mathbf{\theta})
\equiv
\begin{pmatrix}
\Delta t_{\text{Shap}}\\
\Delta\phi_{\text{Def}}\\
\Delta\omega_{\text{Prec}}\\
z_{\text{Red}}
\end{pmatrix}
$$
Using the weak-field constitutive map of $\mathbb{A}\mathbb{A}\mathbb{A}$:

1. Shapiro delay:
$$
O_1(\mathbf{\theta})=K_{\text{Shap}}(1+\gamma_{\text{eff}}),
\qquad
K_{\text{Shap}}=
\frac{GM}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
$$
For two-way radar-style Shapiro measurements, apply the same kernel on each leg and sum the two one-way contributions.
2. Light deflection:
$$
O_2(\mathbf{\theta})=K_{\text{Def}}(1+\gamma_{\text{eff}}),
\qquad
K_{\text{Def}}=\frac{2GM}{b\,c_0^2}
$$
3. Perihelion precession per orbit:
$$
O_3(\mathbf{\theta})
=
K_{\text{Prec}}\left(2+2\gamma_{\text{PPN}}-\beta_{\text{PPN}}\right)
=
K_{\text{Prec}}\left(1.5+2\gamma_{\text{eff}}-C_2\right)
$$
$$
K_{\text{Prec}}=\frac{2\pi GM}{a(1-e^2)c_0^2}
$$
4. Gravitational redshift (to retained order):
$$
O_4(\mathbf{\theta})
=
K_{\text{Red1}}-K_{\text{Red2}}C_2,
\qquad
K_{\text{Red1}}=\frac{\Delta U}{c_0^2},
\quad
K_{\text{Red2}}=\frac{\Delta(U^2)}{c_0^4}
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
\end{pmatrix}
$$
and the propagated covariance is
$$
\Sigma_O=\mathbf{J}_O\Sigma_\theta\mathbf{J}_O^{\mathsf T}
$$
For this spherically symmetric classical set, preferred-frame channels $(\Xi_1,\Xi_2,\Xi_3)$ decouple at leading order; they are constrained by dedicated drift/leakage observables.

## Worked Solar-System Reference Projection (Synthetic Calibration Example)

Use
$$
\frac{GM_\odot}{c_0^2}=1.4766\times 10^3\ \mathrm{m},
\qquad
\frac{GM_\odot}{c_0^3}=4.925\times 10^{-6}\ \mathrm{s}
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
K_{\text{Red2}}=4.50\times 10^{-12}
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
\end{pmatrix}
$$
$$
\Sigma_\theta=
\operatorname{diag}\!\left(
0.25\times 10^{-10},
0.16\times 10^{-10},
10^{-36},
10^{-36},
10^{-36}
\right)
$$
This block is an internal consistency projection example, not a claim of experimental pass/fail by itself.

Projection to decision space gives
$$
\gamma_{\mathrm{PPN}}-1=1.2\times 10^{-5},
\quad
\beta_{\mathrm{PPN}}-1=0.8\times 10^{-5},
\quad
(\alpha_1,\alpha_2,\alpha_3)=\left(10^{-18},-0.5\times 10^{-18},1.3\times 10^{-18}\right)
$$
Forward observables are
$$
\Delta t_{\text{Shap}}=140.80084\ \mu\mathrm{s},
\quad
\Delta\phi_{\text{Def}}=1.75001\,\mathrm{arcsec},
\quad
\Delta\omega_{\text{Prec}}=42.9002\,\mathrm{arcsec}/\mathrm{cy}
$$
$$
z_{\text{Red}}\approx 2.119997\times 10^{-6}
$$
Propagated $1\sigma$ scales (diagonal approximation) are
$$
\sigma_{\text{Shap}}\approx 3.5\times 10^{-4}\ \mu\mathrm{s},
\quad
\sigma_{\text{Def}}\approx 4.3\times 10^{-6}\,\mathrm{arcsec},
\quad
\sigma_{\text{Prec}}\approx 1.5\times 10^{-4}\,\mathrm{arcsec}/\mathrm{cy},
\quad
\sigma_{\text{Red}}\approx 1.8\times 10^{-17}
$$

Failure rule for this closure layer:
if any observed value lies outside
$$
\mathbf{O}(\mathbf{\theta})\pm 3\sqrt{\operatorname{diag}(\Sigma_O)}
$$
the constitutive map fails this gate and must be replaced rather than re-fit per observable.

## Real-Data Joint Likelihood (Benchmark Inputs)

Using the forward map above, define the joint likelihood
$$
\ln \mathcal{L}(\mathbf{\theta})
=
-\frac{1}{2}
\bigl(\mathbf{O}(\mathbf{\theta})-\mathbf{O}_{\text{obs}}\bigr)^{\mathsf T}
\Sigma_{\text{obs}}^{-1}
\bigl(\mathbf{O}(\mathbf{\theta})-\mathbf{O}_{\text{obs}}\bigr)
$$
with
$$
\mathbf{\theta}=
\left(\gamma_{\text{eff}},C_2,\Xi_1,\Xi_2,\Xi_3\right)^{\mathsf T}
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
\mathbf{0}
$$
so the Fisher matrix is rank-2 in this fit and $(\Xi_1,\Xi_2,\Xi_3)$ remain unconstrained by this subset alone.

Reducing to $\mathbf{\theta}_{\text{red}}=(\gamma_{\text{eff}},C_2)^{\mathsf T}$, the inferred covariance is
$$
\Sigma_{\theta_{\text{red}}}
=
\begin{pmatrix}
5.1\times 10^{-10} & 1.02\times 10^{-9}\\
1.02\times 10^{-9} & 2.94\times 10^{-9}
\end{pmatrix}
$$
with maximum-likelihood point
$$
\gamma_{\text{eff}}=1+(2.03\pm2.26)\times 10^{-5},
\qquad
C_2=0.5+(4.06\pm5.42)\times 10^{-5}
$$
and correlation
$$
\rho(\gamma_{\text{eff}},C_2)=+0.83
$$

Interpretation for closure:
1. A single constitutive vector can fit the selected classical observables without per-observable retuning.
2. Preferred-frame channels require additional drift-sensitive observables (LLR, pulsar timing, dedicated anisotropy tests) to close $(\Xi_1,\Xi_2,\Xi_3)$.
3. The positive $\gamma_{\text{eff}}$-$C_2$ covariance defines the accepted trade-off direction when matching precession jointly with refractive observables.

## Preferred-Frame Parameter Degeneracy Resolution (Augmented Likelihood)

Define the preferred-frame constitutive vector
$$
\boldsymbol{\Xi}\equiv(\Xi_1,\Xi_2,\Xi_3)^{\mathsf T}
$$
For the spherical classical set above, $\boldsymbol{\Xi}$ is unconstrained. For an expanded drift-sensitive baseline (ephemerides + LLR + anisotropy channels), treat the preferred-frame Fisher block as
$$
\mathcal{I}_{\Xi,\text{base}}
=
-\mathbb{E}\!\left[
\nabla_{\boldsymbol{\Xi}}
\nabla_{\boldsymbol{\Xi}}^{\mathsf T}
\ln \mathcal{L}_{\text{base}}
\right]
$$
with rank-2 degeneracy and null direction $\hat n$:
$$
\mathcal{I}_{\Xi,\text{base}}\hat n=\mathbf{0}
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
+\ln \mathcal{L}_{\dot P}
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
\left(\nabla_{\boldsymbol{\Xi}}\dot P\right)^{\mathsf T}
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
from Noether sea continuum simulations before final numerical acceptance testing.
