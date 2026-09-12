# PPN Parameters

The **parameterized post-Newtonian (PPN) framework** is an observer-level weak-field expansion that assigns dimensionless coefficients to the ways a gravity model may differ from general relativity. This chapter is the canonical home for the PPN comparison used by the spacetime constitutive map. It treats the standard PPN formulas and measured bounds as recovery targets: the Noether sea clock, ruler, signal, orbital, and orientation channels must reproduce them from one constitutive record rather than importing metric spacetime as substrate ontology.

The native starting point is the [Master Equation](../dynamics/master-equation.md): each architrino, a polarity-bearing point transceiver, receives acceleration contributions from all admitted past emissions whose causal wakes reach it. Those emissions propagate through the fixed [Euclidean void](../foundations/euclidean-void.md) in [absolute time](../foundations/absolute-time.md). The [Noether sea](noether-sea.md) is the ambient assembly population. Its response and physical clock and ruler records must determine the observer chart through the open map $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)=\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record})$ described in [Emergent Metric](emergent-metric.md). Fitting PPN coefficients does not derive this map.

The comparisons assume a stationary, weak, slowly moving source system in the near zone, a standard PPN gauge, and common asymptotic clock and length calibration. Let $\epsilon_{\mathrm{PN}}\ll1$ be the dimensionless ordering scale, with $U/c_0^2=O(\epsilon_{\mathrm{PN}})$ and source or frame speeds divided by $c_0$ of order $\epsilon_{\mathrm{PN}}^{1/2}$. Scalar optical formulas also assume isotropic, nondispersive propagation and the stated zero-shift branch. Homogeneous Noether sea equilibrium and a shared clock/ruler/signal response remain recovery hypotheses. New numerical work uses $c_f=1$; dimensional observer benchmarks are reporting-unit conversions and do not set $c_f=c_0$.

## Canonical Symbols

- $n$: normalized Noether braid density, with $\rho_{\text{NS}}=\rho_{\text{NS},0}n$.
- $\chi_{\text{sea}}$: Noether sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$.
- $c_0\equiv c_{\text{eff}}(\infty)$: asymptotic homogeneous observer-channel speed used in weak-field PPN comparisons.
- $\Phi_N$: Newtonian benchmark potential.
- $\Phi_{\text{eff}}$: constitutive effective potential from the clock channel.
- $U\equiv -\Phi_N>0$: positive PPN expansion variable (default).
- $U_{\Phi}\equiv -\Phi_{\text{eff}}>0$: constitutive-channel variant used when expanding directly in $\Phi_{\text{eff}}$.
- $C_2^{(U)}$ and $C_2^{(\Phi)}$: second-order clock coefficients in expansions using $U$ and $U_{\Phi}$, respectively. The undecorated $C_2$ in the numerical reduced-fit sections means $C_2^{(U)}$.
- $a_\chi$: first-order clock-channel response defined by $\ln[\chi_{\text{sea}}/\chi_{\text{sea}}(\infty)]=a_\chi U/c_0^2+O(U^2/c_0^4)$; the signal-channel value is $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$.
- $U_{ij}$: standard PPN anisotropic potential, $U_{ij}=G\int\rho' s_i s_j/\|\mathbf s\|^3\,d^3x'_{\mathrm{eff}}$, with $\mathbf s=\mathbf x_{\mathrm{eff}}-\mathbf x'_{\mathrm{eff}}$.
- $V_i$: standard PPN matter-current potential, $V_i=G\int\rho'v_i'/\|\mathbf s\|\,d^3x'_{\mathrm{eff}}$; it has units of potential times velocity.

Here $G=G_N$ is the observer-calibrated Newtonian coupling, $M$ is effective source mass, and $\rho'$ is comparison matter mass density, distinct from Noether braid number density $\rho_{\mathrm{NS}}$. Primed matter positions and velocities belong to the same effective chart and comparison epoch. These instantaneous PPN potentials summarize an effective expansion, not primitive instantaneous interactions. Spatial indices run from 1 to 3. The reference metric $h_{ij}$ and its inverse $h^{ij}$ are the Euclidean reference metric carried into that chart; $U$, $U_\Phi$, and $U_{ij}$ have speed-squared units. Identifying native fields with their observer projections requires the declared map even when their symbols are shared.

## Mapping to PPN Constraints

1. **Shapiro Delay**: Compare the GR coordinate travel-time excess, which depends on temporal and spatial metric coefficients, with the projected Noether sea signal delay.
2. **Light Bending**: Calculate Noether sea signal propagation through the density gradient around the Sun.
3. **Geodetic Precession**: Match the transport of an assembly's spin-orientation frame through the same weak-field effective metric used for clock, signal, and orbital tests.

Here, geodetic precession means the de Sitter precession of a carried gyroscope: after the gyroscope moves through a weak gravitational field, its spin axis is rotated relative to a distant reference frame. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this should not be introduced as a separate torque law between angular momentum and a potential gradient. It is a closure target for the effective metric: the Noether sea-induced clock, ruler, and signal-response map must make transported assembly orientations precess by the same amount that GR predicts in the validated weak-field regime. Frame dragging from a rotating source is a separate test channel.

For a slowly moving gyroscope in the stationary weak-field comparison chart, the PPN estimator is
$$
\boldsymbol\Omega_{\mathrm{dS}}
=
\frac{1+2\gamma_{\mathrm{PPN}}}{2c_0^2}
\mathbf v\times\nabla U.
$$

[View →](../../../../equation-mapping.html#corpus-equation-b3e6e1ba275c9b6e)

For a central source this becomes
$$
\boldsymbol\Omega_{\mathrm{dS}}
=
\frac{1+2\gamma_{\mathrm{PPN}}}{2}
\frac{GM}{c_0^2r^3}
\mathbf r\times\mathbf v,
$$

[View →](../../../../equation-mapping.html#corpus-equation-68826ec78add1bfe)

Here $\mathbf r$ points from the central source to the gyroscope, $\mathbf v=d\mathbf x_{\mathrm{eff}}/dt_{\mathrm{eff}}$ is its comparison-chart velocity, and $\nabla$ differentiates that chart's Euclidean reference coordinates. The cross product describes observer-level orientation transport, not an architrino acceleration term. Substituting $\nabla U=-GM\mathbf r/r^3$ gives the second expression and the GR comparison coefficient $3/2$ when $\gamma_{\mathrm{PPN}}=1$. The closure residual must compare the transported assembly-orientation frame with this estimator using the same effective metric record as Shapiro delay and lensing.


## Testing the Euclidean Anchor (Shapiro Delay)

1. **The Test**: Calculate travel time of a signal from Earth to a probe behind the Sun using the Euclidean straight-line anchor supplied by the $\mathbb{U}_{\text{now}}$ state record.
2. **Signal-path approximation**: Evaluate the first-order fixed-endpoint delay on the unperturbed straight path in the Euclidean reference chart. A spatially varying signal response generally bends the ray; its trajectory must be recovered from the same medium response. Straightness of the reference path does not establish straightness of the physical signal.
3. **Comparison**: Contrast $\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}$ with the GR weak-field form.
4. **$\mathbb{U}_{\text{now}}$ Role**: This complete state includes positions and retained histories needed by delayed dynamics. It supplies substrate geometry; observer endpoints and timing require its clock, ruler, and signal projection.

## Explicit Weak-Field Noether Sea Delay Map (PPN $\gamma$)

On the stationary isotropic branch, adopt the following observer-level recovery ansatz. The effective coordinate speed is measured per Euclidean reference length and effective coordinate time. Identifying it with the projected dressed signal channel requires a common calibration and the lapse and ruler response from the same record:
$$
\bar{\chi}_{\text{sea}}(\mathbf x_{\mathrm{eff}})
\equiv
\frac{c_0}{c_{\text{eff}}(\mathbf x_{\mathrm{eff}})}
=
\frac{c_0}{c_f}\chi_{\text{sea}}(\mathbf x_{\mathrm{eff}})
= 1 - (1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(\mathbf x_{\mathrm{eff}})}{c_0^2}
+ \mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3cc63b1fc4ebd63d)

with $\Phi_N<0$ near a mass source. For a point mass $M$,
$$
\Phi_N(r)=-\frac{GM}{r}
\quad\Rightarrow\quad
\bar{\chi}_{\text{sea}}(r)=1+(1+\gamma_{\mathrm{PPN}})\frac{GM}{c_0^2 r}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_0^4 r^2}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-01a35d5ca30f9f21)

For fixed emitter and receiver endpoints, let $\Gamma$ be the unperturbed straight path in the effective chart's Euclidean reference metric. To first order,
$$
t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{1}{c_0}\int_\Gamma \bar{\chi}_{\text{sea}}(\mathbf x_{\mathrm{eff}})\,ds
=\frac{R}{c_0}+\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e40463434fdc8ebb)

where $ds^2=h_{ij}dx_{\mathrm{eff}}^idx_{\mathrm{eff}}^j$ and $R=\int_\Gamma ds$ is the reference endpoint separation. These equalities retain only first-order delay. For fixed geometry away from a caustic or occultation, the omitted path and index corrections are $O((R/c_0)\epsilon_{\mathrm{PN}}^2)$. The leading delay is
$$
\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{1}{c_0}\int_\Gamma (\bar{\chi}_{\text{sea}}-1)\,ds
=\frac{(1+\gamma_{\mathrm{PPN}})GM}{c_0^3}\int_\Gamma \frac{ds}{r(s)}
+\mathcal{O}\!\left(\frac{R}{c_0}\epsilon_{\mathrm{PN}}^2\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-c4d819a3eb58620c)

For emitter and receiver radii $r_1,r_2$, respectively, and $0<R<r_1+r_2$, with the ray outside the source and weak field everywhere, evaluating the line integral gives
$$
\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{(1+\gamma_{\mathrm{PPN}})GM}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+\mathcal{O}\!\left(\frac{R}{c_0}\epsilon_{\mathrm{PN}}^2\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-dbfc1c9db0dff320)

which is the standard 1PN Shapiro form with $\gamma\to\gamma_{\mathrm{PPN}}$ and $c\to c_0$. The primitive wake speed $c_f$ remains in the unnormalized delay factor $\chi_{\text{sea}}=c_f/c_{\text{eff}}$; observer-facing PPN timing uses the asymptotic dressed speed $c_0$.

So the operational estimator is
$$
\gamma_{\mathrm{PPN}}
=
\frac{c_0^3\,\Delta t_{\text{obs}}}
{GM\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)}
-1
$$

[View →](../../../../equation-mapping.html#corpus-equation-394ab260d9cf36f8)

Here $t_{\text{obs}}$ is the one-way observation converted to the declared coordinate-time calibration, with motion, plasma, and instrument corrections accounted for; $\Delta t_{\text{obs}}=t_{\text{obs}}-R/c_0$. This is a leading-order estimator, not a raw stopwatch reading.

In the weak-field solar-system regime, $\gamma_{\mathrm{PPN}}$ is the direct refractive-space-curvature map parameter.

The same Shapiro map also fixes the first-order signal-delay response coefficient

$$
a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c407f0f6053a262a)

This is not automatically the clock coefficient $a_\chi$ used in the static $\Gamma_N$ endpoint row. The shared clock/signal delay branch is the additional condition

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
\equiv
a_\chi-a_\chi^{\mathrm{sig}}
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-32a5bcc20a9cc9cc)

When this residual vanishes, Shapiro delay and gravitational clock redshift are using the same first-order Noether sea delay response. When it does not vanish, PPN delay, redshift, lensing, pressure-response, and cosmological redshift comparisons must carry the residual explicitly rather than refitting $\chi_{\text{sea}}$ per observable.

## PPN Parameters and the Euclidean Anchor

### Parameter $\gamma$ (Space Curvature / Refraction)
* **GR Context:** Measures the amount of space curvature produced by unit rest mass.
* **$\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation:** Measures the refractive response of the [Noether sea](noether-sea.md). A massive body increases local assembly density, slowing the effective signal speed $c_{\text{eff}}(\mathbf X,T)$ relative to the asymptotic observer speed $c_0$ — the declared response-sign assumption of the weak-field branch, required for recovery rather than derived — while $c_f$ remains the primitive wake speed.
* **Observable:** Shapiro-delay coefficient in the explicit refractive integral above.

The light-bending half-test makes the same point numerically. A lapse-only weak-field map gives the Newtonian-scale deflection
$$
\Delta\theta_{\mathrm{half}}
=
\frac{2GM}{b\,c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4f4bf9018b059731)

while the full GR-matching target is
$$
\Delta\theta_{\mathrm{GR}}
=
\frac{4GM}{b\,c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cbafbd2358fc044f)

In the forward projection below, the missing half is precisely the $\gamma_{\mathrm{PPN}}$ spatial-compliance contribution. Therefore a constitutive map cannot claim PPN closure by matching Shapiro delay with a scalar delay factor while leaving the ruler/spatial-compliance row undefined.

### Parameter $\beta$ (Non-linearity of Gravity)
* **GR Context:** Measures the non-linearity in the superposition of gravitational fields.
* **$\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation:** Parameterizes second-order clock/medium response. Attribution to self-hit or a particular Noether sea mechanism remains an unproved constitutive interpretation.
* **Explicit map from constitutive expansion:** Let $U\equiv-\Phi_N>0$. For a declared weak-field branch — conditional, like every weak-field expansion in this chapter, on the homogeneous quiescent Noether sea being an equilibrium of the constitutive dynamics, an open closure item of the [Noether sea program](noether-sea.md) — expand the static clock law with branch-local constitutive coefficient $C_2^{(U)}$:
$$
\frac{d\tau}{dt_{\mathrm{eff}}}\bigg|_{v=0}
=
1-\frac{U}{c_0^2}
+C_2^{(U)}\frac{U^2}{c_0^4}
+\mathcal{O}\!\left(\frac{U^3}{c_0^6}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1f1003778f3355c4)

Since $-g_{00}=(d\tau/dt_{\mathrm{eff}})^2$ for a static observer,
$$
g_{00}
=
-1
+2\frac{U}{c_0^2}
-\bigl[1+2C_2^{(U)}\bigr]\frac{U^2}{c_0^4}
+\mathcal{O}\!\left(\frac{U^3}{c_0^6}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8adef2f758c430a0)

In the static isolated-source subclass where the remaining standard PPN potentials already take their GR values or vanish, match to the PPN form
$$
g_{00}^{\mathrm{PPN}}
=
-1+2\frac{U}{c_0^2}-2\beta_{\mathrm{PPN}}\frac{U^2}{c_0^4}+\cdots
$$

[View →](../../../../equation-mapping.html#corpus-equation-85274609a807572d)

to obtain
$$
\boxed{\beta_{\mathrm{PPN}}=\frac{1+2C_2^{(U)}}{2}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-b8a077bae49e26bd)

The superscript is essential: $C_2^{(U)}$ is the coefficient after the clock law has been expanded in the Newtonian comparison potential $U$. Reading $\beta_{\mathrm{PPN}}$ from this coefficient alone is not valid in a general source where $\Phi_{\mathrm W}$, $\Phi_1,\ldots,\Phi_4$, $\mathcal A$, or preferred-frame potentials carry independent non-GR coefficients. No cosmological $(a,k)$ dependence is implied here; those arguments are reserved for effective cosmology transfer variables such as $\mu(a,k)$ and $G_{\mathrm{eff}}(a,k)$.
* **Observable:** Perihelion precession and other 1PN nonlinear-potential tests.

### Exponential clock-law subclass (direct map)

The identity
$$
\Omega\xi=e^{\Phi_{\text{eff}}/c_0^2},
\qquad
g_{00}=-(\Omega\xi)^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-0ab0711bd8da118c)

follows from the observer-side definition $\Phi_{\text{eff}}\equiv c_0^2\ln(\Omega\xi)$; it does not by itself determine a PPN parameter. With $U_{\Phi}\equiv -\Phi_{\text{eff}}$, it gives
$$
g_{00}
=
-e^{2\Phi_{\text{eff}}/c_0^2}
=
-1+2\frac{U_{\Phi}}{c_0^2}-2\frac{U_{\Phi}^2}{c_0^4}+O(c_0^{-6})
$$

[View →](../../../../equation-mapping.html#corpus-equation-a88d33a14eb1bf3d)

and therefore fixes only the coefficient in the constitutive-potential expansion:
$$
\boxed{C_2^{(\Phi)}=\frac12}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-57ad27cf2d94d353)

Write the second-order potential conversion as
$$
\frac{U_{\Phi}}{c_0^2}
=
\frac{U}{c_0^2}
+D_2\frac{U^2}{c_0^4}
+O\!\left(\frac{U^3}{c_0^6}\right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-e9bfca514dd9b1b4)

Then
$$
C_2^{(U)}=C_2^{(\Phi)}-D_2,
\qquad
\beta_{\mathrm{PPN}}=1-D_2.
$$

[View →](../../../../equation-mapping.html#corpus-equation-e39c6c4aa467af09)

Thus the exponential clock-coordinate identity yields $\beta_{\mathrm{PPN}}=1$ if and only if $D_2=0$, equivalently $U_{\Phi}/c_0^2=U/c_0^2+O(U^3/c_0^6)$. Deriving or bounding $D_2$ from the shared Noether sea response is the actual nonlinear-potential obligation.

Here $\Omega\xi$ is the local clock-rate factor $d\tau/dt_{\mathrm{eff}}$. The Noether sea cadence-stretch factor used in redshift bookkeeping is its inverse, $\Gamma_N=(\Omega\xi)^{-1}$, when the same local clock channel is being compared.

### Preferred Frame Parameters ($\alpha_1, \alpha_2, \alpha_3$)
* **Crucial test:** In the effective relativistic limit these must vanish (no measurable preferred-frame leakage).
* **Constitutive leakage ansatz:** Let $\mathbf w$ be the velocity of the barycentric comparison chart relative to the selected preferred frame. Identifying that frame with a locally uniform Noether sea frame is a hypothesis; it requires projecting the native difference $\mathbf V_{\mathrm{cm}}-\mathbf u_{\mathrm{sea}}$ into the observer chart. Individual matter velocities in that chart remain separate. Standard PPN coefficient extraction treats $\mathbf w$ as constant on the comparison window; spatially varying entrainment requires a separate extension. Write the retained preferred-frame terms as
$$
g_{0i}^{\text{leak}}
=
-\frac{1}{2}\Xi_1\frac{w_i U}{c_0^3}
-\Xi_2\frac{w^j U_{ij}}{c_0^3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8cb86fceb5fd8b4b)

$$
g_{00}^{\text{leak}}
=
-\Xi_3\frac{w^2 U}{c_0^4}
-\Xi_2\frac{w^i w^j U_{ij}}{c_0^4}
+\Xi_4\frac{w^i V_i}{c_0^4}
$$

[View →](../../../../equation-mapping.html#corpus-equation-24e18fe96029530c)

In the standard PPN gauge, the coefficient of $-w_iU/(2c_0^3)$ is $\alpha_1-2\alpha_2$. Matching this and the independent anisotropic and $g_{00}$ terms gives
$$
\boxed{\alpha_1=\Xi_1+2\Xi_2},\qquad
\boxed{\alpha_2=\Xi_2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9340d57c293b7e8a)

$$
\boxed{\alpha_3=\Xi_1+\Xi_2-\Xi_3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-629e98e67354d9ae)

with consistency relation
$$
\Xi_4=2\alpha_3-\alpha_1=\Xi_1-2\Xi_3
$$

[View →](../../../../equation-mapping.html#corpus-equation-705843eb80c0c2ab)

These are coefficient comparisons with Will's [standard PPN metric](https://arxiv.org/pdf/1403.7377v1), Box 2; the other potential coefficients must also match before this reduced dictionary establishes a full metric export. An independently extracted $\Xi_4$ violating the displayed relation rejects this preferred-frame reduction.

If a comparison source instead defines $\mathbf w_{\mathrm{sea}}=-\mathbf w$, all odd-in-$\mathbf w$ preferred-frame terms must be sign-translated before reading off the $\Xi_i\to\alpha_i$ map.

### Terrestrial Working Drift Profiles

Terrestrial preferred-frame rows need a declared $\mathbf u_{\mathrm{sea}}$ profile before their $\beta_{0,\oplus}\equiv|\mathbf w_\oplus|/c_0$ dependence can be evaluated numerically. Use the CMB dipole only as an observer-level comparison direction, not as proof that the CMB frame is the substrate's absolute rest frame. In that comparison chart, decompose a laboratory velocity as

$$
\mathbf V_{\mathrm{lab}}(t_{\mathrm{eff}})
=
\mathbf V_{\mathrm{CMB}}
+
\mathbf V_{\mathrm{orb}}(t_{\mathrm{eff}})
+
\mathbf V_{\mathrm{rot}}(t_{\mathrm{eff}})
+
\mathbf v_A(t_{\mathrm{eff}}),
$$

[View →](../../../../equation-mapping.html#corpus-equation-a5b907b2895d6fc0)

where $\mathbf V_{\mathrm{CMB}}$ is the Solar-system motion inferred from the CMB dipole, $\mathbf V_{\mathrm{orb}}$ and $\mathbf V_{\mathrm{rot}}$ are the terrestrial orbital and rotational contributions, and $\mathbf v_A$ is the apparatus motion relative to the laboratory. A two-coefficient working family brackets the unresolved Noether sea response:

$$
\mathbf u_{\mathrm{sea}}^{(f)}(t_{\mathrm{eff}})
=
f_{\mathrm{tr}}
\left[
\mathbf V_{\mathrm{CMB}}
+
\mathbf V_{\mathrm{orb}}(t_{\mathrm{eff}})
\right]
+
f_{\mathrm{rot}}\mathbf V_{\mathrm{rot}}(t_{\mathrm{eff}}),
\qquad
0\le f_{\mathrm{tr}},f_{\mathrm{rot}}\le1,
$$

[View →](../../../../equation-mapping.html#corpus-equation-15aef2459df8cfa8)

so that

$$
\mathbf w_A^{(f)}
=
(1-f_{\mathrm{tr}})
\left(
\mathbf V_{\mathrm{CMB}}
+
\mathbf V_{\mathrm{orb}}
\right)
+
(1-f_{\mathrm{rot}})\mathbf V_{\mathrm{rot}}
+
\mathbf v_A.
$$

[View →](../../../../equation-mapping.html#corpus-equation-a0bbe59396df590f)

The non-entrained comparison is $(f_{\mathrm{tr}},f_{\mathrm{rot}})=(0,0)$. Ignoring the smaller annual, daily, and apparatus contributions, the [measured CMB dipole](https://lambda.gsfc.nasa.gov/education/lambda_graphics/cmb_dipole.html) gives $|\mathbf w_\oplus|\approx369\,\mathrm{km\,s^{-1}}$ and therefore $\beta_{0,\oplus}\approx1.23\times10^{-3}$. Translational entrainment uses $f_{\mathrm{tr}}\to1$ while leaving the rotational row independently testable; local co-rotation also takes $f_{\mathrm{rot}}\to1$. These are evaluation profiles, not derived constitutive solutions.

The preferred-motion bundle separates the profiles through their predicted annual and sidereal phase and amplitude. Ground-to-orbit clock and resonator comparisons add the radial discriminator: a profile that becomes less entrained with altitude changes $\mathbf w_A^{(f)}$ across the trajectory, whereas a CMB-comoving profile preserves the leading dipole-scale drift. The same $(f_{\mathrm{tr}},f_{\mathrm{rot}})$ values must be used in clock, interferometer, matter-sector, and PPN rows; fitting a different terrestrial drift profile to each channel would not close the preferred-frame map.

### Rotating-Source Frame Dragging

Preferred-frame leakage and physical source-current response are different $g_{0i}$ channels. Setting $\alpha_1=\alpha_2=\alpha_3=0$ must remove dependence on a laboratory's group velocity through the Noether sea without removing the positive weak-field response to a rotating source. For source angular momentum $\mathbf J$ and $\mathbf r=r\hat{\mathbf r}$, the GR-matching stationary far-field comparison row in the declared $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$ convention is
$$
g_{0i}^{\mathrm{drag}}
=
-\frac{2G_N}{c_0^3}
\frac{(\mathbf J\times\mathbf r)_i}{r^3}
+
O(c_0^{-5}).
$$

[View →](../../../../equation-mapping.html#corpus-equation-ad32f1cf32b319b0)

The corresponding carried-gyroscope target is the Lense-Thirring precession
$$
\boldsymbol\Omega_{\mathrm{LT}}
=
\frac{G_N}{c_0^2r^3}
\left[
3\hat{\mathbf r}(\mathbf J\cdot\hat{\mathbf r})
-\mathbf J
\right].
$$

[View →](../../../../equation-mapping.html#corpus-equation-08f89be880e48c87)

In the constitutive map, this row must be projected from the same rotating-source angular-momentum ledger and Noether sea vorticity response that supply $u^i_{\mathrm{sea,eff}}$. The separation requirement is
$$
g_{0i}^{\mathrm{eff}}
=
g_{0i}^{\mathrm{drag}}(\mathbf J)
+
g_{0i}^{\mathrm{leak}}(\mathbf w)
+
O(c_0^{-5}),
\qquad
g_{0i}^{\mathrm{leak}}\to0
\ \text{while}\
g_{0i}^{\mathrm{drag}}\not\to0
$$

[View →](../../../../equation-mapping.html#corpus-equation-37d90cf341114be3)

for a rotating source with the source-current coefficients fixed to their GR comparison values. A general PPN current sector has additional parameter dependence. Lense-Thirring and geodetic precession must therefore be recovered from one effective metric but remain distinct observable projections.

### Remaining PPN Parameters

The five-parameter rows used in the numerical examples below are a reduced subset, not the full PPN space. The full observer-level decision layer also contains the preferred-location parameter $\xi_{\mathrm W}$ and the conservation-law parameters $\zeta_1,\zeta_2,\zeta_3,\zeta_4$. The subscript on $\xi_{\mathrm W}$ is mandatory because the undecorated $\xi=R_\parallel/R_\perp$ is the Noether braid envelope shape ratio. Likewise, the PPN $\zeta_i$ must not be confused with the apparatus-calibration nuisance $\zeta_A$ used in the preferred-motion bundle.

For a GR-matching branch, the additional targets are
$$
\xi_{\mathrm W}
=
\zeta_1
=
\zeta_2
=
\zeta_3
=
\zeta_4
=0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-314de0287c83f753)

Here $\xi_{\mathrm W}$ tests preferred-location leakage, while nonzero $\zeta_i$ would signal failure of the effective momentum/conservation bookkeeping. A wake-ledger theory cannot infer these zeros from notation: the same architrino-plus-wake-plus-medium record that closes total energy and momentum must project them below their observer-level bounds.

The additional parameters have different observational coverage. Historical comparison scales from [Will (2014), Table 4 and equation (71)](https://arxiv.org/pdf/1403.7377v1) are

| Parameter | Representative bound or relation | Required estimator |
| --- | --- | --- |
| $\xi_{\mathrm W}$ | $|\xi_{\mathrm W}|\lesssim4\times10^{-9}$ from strong-field preferred-location torque tests | orientation precession relative to the external-potential direction |
| $\zeta_1$ | $|\zeta_1|\lesssim2\times10^{-2}$, mainly indirect | Nordtvedt/self-acceleration combination after the other PPN rows are fixed |
| $\zeta_2$ | $|\zeta_2|\lesssim4\times10^{-5}$ | binary-center-of-mass acceleration and pulsar timing |
| $\zeta_3$ | $|\zeta_3|\lesssim10^{-8}$ | active/passive mass and momentum-balance residual |
| $\zeta_4$ | no comparably direct standalone bound; $6\zeta_4=3\alpha_3+2\zeta_1-3\zeta_3$ under the standard pressure-gravity consistency assumption | pressure contribution to the same full PPN metric |

The pulsar-derived rows are strong-field analogues, not solar-system measurements. They remain legitimate closure pressure only if the model declares how its weak-field PPN parameters export into self-gravitating bodies. In particular, $\zeta_3$ is not automatically zero in a delayed pairwise interaction: the native estimator must cycle-average the complete matter-plus-wake-plus-Noether-sea momentum ledger before projecting the observer-level active/passive-mass residual.

## Zero-Leakage Conditions (Preferred-Frame Closure)

Within the displayed polynomial ansatz, with its PPN consistency relation enforced and source potentials independently resolved, preferred-frame leakage vanishes at the retained order precisely when
$$
\Xi_1=\Xi_2=\Xi_3=\Xi_4=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-51a274a461d28d14)

The corresponding derivative conditions remove both linear velocity terms and all quadratic speed dependence:
$$
\left.\frac{\partial g_{\mu\nu}}{\partial w_i}\right|_{\mathbf{w}=0}=0,
\qquad
\left.\frac{\partial^2 g_{00}}{\partial w_i\partial w_j}\right|_{\mathbf{w}=0}
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-3040cd0f79d7e23c)

with no momentum-density coupling term $w^iV_i$ at the retained PN order. A merely isotropic Hessian is insufficient: a nonzero $w^2U$ term changes clocks with speed even if its traceless part vanishes. The conditions must hold across the source-potential family, not just where a potential happens to vanish.

The coefficients $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ parameterize preferred-frame leakage terms in the weak-field constitutive expansion. This condition does not set the rotating-source row $g_{0i}^{\mathrm{drag}}(\mathbf J)$ to zero.

## Preferred-Motion Null-Test Bundle

Historical clock, interferometer, Zeeman-splitting, and gravimeter tests show how many different apparatus types can search for the same preferred-frame leakage without sharing the same dominant nuisance. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this becomes a bundle test on the same group velocity coefficients, not a set of independent fit parameters. For an apparatus channel $A$ with orientation $\hat{\mathbf{n}}_A(t_{\mathrm{eff}})$ and laboratory group velocity $\mathbf{w}(t_{\mathrm{eff}})$ through the local Noether sea, write the leading fractional readout as
$$
y_A(t_{\mathrm{eff}})
=
y_{A,0}
+\mathbf{s}_A^{\mathsf T}
\begin{pmatrix}
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix}
\frac{w^2(t_{\mathrm{eff}})}{c_0^2}
+\zeta_A
\frac{
\left(\mathbf{w}(t_{\mathrm{eff}})\cdot\hat{\mathbf{n}}_A(t_{\mathrm{eff}})\right)^2
-w^2(t_{\mathrm{eff}})/3
}{c_0^2}
+n_A(t_{\mathrm{eff}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-2fdc9cbf8c9cf7d6)

This readout is a phenomenological apparatus ansatz, not a derived universal response of clocks, resonators, and matter. Here $\mathbf{s}_A$ is a channel sensitivity row that must be supplied by an independent apparatus projection and may depend on orientation and time, $\zeta_A$ is an allowed apparatus-calibration nuisance fixed by the instrument model, $n_A$ is detector/environment noise, and $y_A^\theta$ is the model readout projected from the retained record tuple $\theta$. The shared preferred-frame residual is
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

[View →](../../../../equation-mapping.html#corpus-equation-69f82830af0f2f6b)

Here $\|r\|_{C_A^{-1}}^2=r^{\mathsf T}C_A^{-1}r$, with $C_A$ the positive-definite covariance of the channel's sampled residuals, and $\lambda_{\mathrm{PF}}\ge0$ is a declared regularization weight. The sum assumes independent channel errors; shared noise requires a joint covariance. Incompatibility is assessed with the full uncertainty and nuisance model. An orientation or annual response absorbed by a freely fitted $\zeta_A$ cannot establish absence of physical leakage.

## Weak-Field Constraint Table (Decision Layer)

Use this table to compare the constitutive map with declared observational benchmarks; an actual test also needs source data, covariance, nuisance models, and a domain.

| Channel | Model estimator | GR/PPN target | Closure requirement |
| --- | --- | --- | --- |
| Time nonlinearity | $\beta_{\text{PPN}}$ from $g_{00}$ expansion | $\beta_{\text{PPN}}=1$ | Residual inside ledger tolerance |
| Space curvature/refraction | $\gamma_{\mathrm{PPN}}$ from the shared spatial-compliance row, with Shapiro and lensing as projections | $\gamma_{\text{PPN}}=1$ | Residual inside ledger tolerance |
| Preferred-frame leakage | $(\alpha_1,\alpha_2,\alpha_3)$ from $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ | all $\approx 0$ | No significant nonzero leakage |
| Geodetic precession | $\boldsymbol\Omega_{\mathrm{dS}}$ from transported assembly orientation in the shared metric | $(1+2\gamma_{\mathrm{PPN}})\mathbf v\times\nabla U/(2c_0^2)$ | GP-B/LLR residual inside the declared covariance |
| Rotating-source frame dragging | $g_{0i}^{\mathrm{drag}}(\mathbf J)$ and $\boldsymbol\Omega_{\mathrm{LT}}$ from the source-current row | Lense-Thirring comparison | Recover the nonzero source response without preferred-frame leakage |
| Preferred-location leakage | $\xi_{\mathrm W}$ from the same effective metric record | $\xi_{\mathrm W}=0$ | No significant nonzero leakage |
| Conservation-law leakage | $(\zeta_1,\zeta_2,\zeta_3,\zeta_4)$ from the full architrino-plus-wake-plus-medium ledger | all $=0$ | No observer-level nonconservation residual |
| Newtonian limit | $\mathbf{a}=-\nabla\Phi_{\text{eff}}$ (weak field) | exact leading-order recovery | No constitutive contradiction |
| Cross-observable consistency | same constitutive coefficients across delay, redshift, precession, lensing, acceleration, and preferred-frame tests | single-parameter-set closure | No per-observable re-fit |

Numeric pass/fail thresholds are taken from [validation/constraint-ledger.md](../validation/constraint-ledger.md).

## Source-Mined Benchmark Bound Vector

The following historical comparison scales form a reduced five-row vector for the numerical illustration. They mix uncertainty scales and confidence bounds and are not a joint confidence region or an inventory of the latest measurements:
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

[View →](../../../../equation-mapping.html#corpus-equation-a2bf8068e72d1145)

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

[View →](../../../../equation-mapping.html#corpus-equation-44f6f782ffd68e68)

The first scale is Cassini's reported $1\sigma$ uncertainty; its central estimate is not zero. The second and last two scales follow the perihelion, millisecond-pulsar spin-precession, and pulsar-period-statistics rows of [Will (2014), Table 4](https://arxiv.org/pdf/1403.7377v1). The $\alpha_1$ scale is a rounded envelope of the strong-field result $\hat\alpha_1=(-0.4^{+3.7}_{-3.1})\times10^{-5}$ at 95% confidence from [Shao and Wex (2012)](https://arxiv.org/abs/1209.4503). The $2\times10^{-9}$ scale is a pulsar result, not solar-spin-axis alignment. Pulsar rows constrain strong-field analogues under the source analysis's frame and body assumptions; their application to weak-field parameters requires a derived compact-body export.

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

[View →](../../../../equation-mapping.html#corpus-equation-6eada48e5e333e47)

The illustrative componentwise screening rule is
$$
\|\mathbf{q}_{\mathrm{PPN}}\|_\infty \le 1
$$

[View →](../../../../equation-mapping.html#corpus-equation-a95190bb18540d83)

only after declaring the relevant weak-to-strong-field export. This screen is not statistical acceptance: it neglects central offsets, confidence-level differences, and correlations. Physical comparison uses each experiment's likelihood and tests the same constitutive metric across all channels.

The SME-style Lorentz-test family supplies a second, non-PPN layer. The cavity experiment of [Nagel and collaborators (2015)](https://arxiv.org/abs/1412.6954) reported orientation-dependent fractional frequency sensitivity of order $10^{-18}$; [Kostelecký and Russell's data tables](https://arxiv.org/abs/0801.0287) organize photon, matter, neutrino, and gravity coefficients in specified comparison frames, conventionally the Sun-centered frame for terrestrial results. For this chapter the safe import is not a new ontology. It is the validation rule that any effective metric or clock/ruler channel must report which SME-like residual it would excite:
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

[View →](../../../../equation-mapping.html#corpus-equation-7d3f70259b490fe2)

with $\tilde\kappa_{\bullet}^{\mathrm{eff}}$ used as photon-sector comparison coefficients and $\bar{s}^{\mu\nu}_{\mathrm{eff}}$ used as a gravity-sector comparison coefficient. These are observer-level projection diagnostics; they are not substrate coefficients added to the Euclidean void.

## Closure Program Interface (Observable Decision Layer)

This chapter is the observable-side gate for the emergent-metric closure.

Define the PPN decision vector:
$$
\mathbf{p}_{\mathrm{PPN}}^{\mathrm{full}}=
\bigl(
\gamma_{\mathrm{PPN}}-1,\,
\beta_{\mathrm{PPN}}-1,\,
\xi_{\mathrm W},\,
\alpha_1,\,
\alpha_2,\,
\alpha_3,\,
\zeta_1,\,
\zeta_2,\,
\zeta_3,\,
\zeta_4
\bigr)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1b977b605cbf14fe)

The weak-field closure target is
$$
\mathbf{p}_{\mathrm{PPN}}^{\mathrm{full}}\approx \mathbf{0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c2a65ff49642965e)

within the benchmark tolerances listed in the validation ledger.

The synthetic calibration and likelihood sections below remain explicitly reduced fits over $(\gamma_{\mathrm{PPN}},C_2,\Xi_1,\Xi_2,\Xi_3)$. They do not numerically evaluate $\xi_{\mathrm W}$, $\zeta_i$, or the Lense-Thirring source-current row, so passing those reduced examples is not full PPN closure.

Cross-chapter integration:
- constitutive map source: [spacetime/emergent-metric.md](./emergent-metric.md)
- clock-law coefficient extraction: [spacetime/proper-time-and-time-dilation.md](./proper-time-and-time-dilation.md)
- threshold enforcement: [validation/constraint-ledger.md](../validation/constraint-ledger.md)

## ADM/Cartan Extraction Equations

The PPN vector must be extracted from the same Arnowitt–Deser–Misner (ADM) clock/shift/spatial decomposition and Cartan ruler coframe used by the effective metric map. Here $N>0$ is the lapse, $u^i_{\mathrm{sea,eff}}$ is the effective shift with speed units, and $\gamma_{ij}^{\mathrm{eff}}$ is the positive-definite spatial metric. Metric components are dimensionless in length coordinates with signature $(-,+,+,+)$. With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the line element
$$
ds_{\mathrm{eff}}^2
=
-N^2c_0^2dt_{\mathrm{eff}}^2
+
\gamma_{ij}^{\mathrm{eff}}
\left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
\left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-7c1521e0a983e8d8)

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

[View →](../../../../equation-mapping.html#corpus-equation-19c2cccc2a2a1bbf)

In the stationary zero-shift weak-field row, where $N=d\tau/dt_{\mathrm{eff}}$ for a coordinate-static clock, write
$$
N
=
1-\frac{U_{\Phi}}{c_0^2}
+C_2^{(\Phi)}\frac{U_{\Phi}^2}{c_0^4}
+O(c_0^{-6},\epsilon_{\mathrm{LV}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-2bc4bb418f65a5c3)

and extract the isotropic first-order spatial coefficient, after verifying that independent anisotropic contributions are absent or separately retained,
$$
\gamma_{\mathrm{PPN}}
=
\frac{c_0^2}{2U_{\Phi}}
\left(
\frac{h^{ij}\gamma_{ij}^{\mathrm{eff}}}{3}-1
\right)
+O(U_{\Phi}/c_0^2,\epsilon_{\mathrm{LV}}c_0^2/U_{\Phi}),
\qquad
\beta_{\mathrm{PPN}}-1=C_2^{(U)}-\frac12
$$

[View →](../../../../equation-mapping.html#corpus-equation-126fe46ea130e20a)

The preferred-frame coefficients are the retained group velocity coefficients in $g_{0i}^{\mathrm{eff}}$ and $g_{00}^{\mathrm{eff}}$ under the $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ expansion above, with
$$
\alpha_1=\Xi_1+2\Xi_2,\qquad
\alpha_2=\Xi_2,\qquad
\alpha_3=\Xi_1+\Xi_2-\Xi_3
$$

[View →](../../../../equation-mapping.html#corpus-equation-5b0443421239c8c3)

Here $\epsilon_{\mathrm{LV}}$ bounds an additive dimensionless metric departure; division by $U_\Phi$ amplifies it, so extraction requires a resolved nonzero potential and $\epsilon_{\mathrm{LV}}\ll U_\Phi/c_0^2$. A trace cannot establish absence of anisotropic spatial response. The conversion $U_\Phi=U+O(U^2/c_0^2)$ is declared above.

This extraction is the dictionary for the coefficient scaffold in [Emergent Metric](./emergent-metric.md#admcartan-reconstruction-surface). Adopt the first-order expansions
$$
\delta n=a_n\frac{U}{c_0^2},\qquad
\delta\chi=a_\chi\frac{U}{c_0^2},\qquad
\varphi=-\frac{U}{c_0^2}+O(U^2/c_0^4),
$$

[View →](../../../../equation-mapping.html#corpus-equation-4b16a5feda96d58a)

Here $\delta n=n-1$, $\delta\chi=\chi_{\mathrm{sea}}/\chi_{\mathrm{sea}}(\infty)-1$, and $\varphi=\Phi_{\mathrm{eff}}/c_0^2$. The common $a_\chi$ requires the shared clock/signal branch $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$; otherwise separate responses must be retained. The dimensionless $A$ coefficients weight these density, delay, and potential changes. The scalar and spatial first-order rows must satisfy
$$
A_N^n a_n+A_N^\chi a_\chi-A_N^\Phi=-1,
\qquad
2\gamma_{\mathrm{PPN}}
=
A_\gamma^n a_n+A_\gamma^\chi a_\chi-A_\gamma^\Phi.
$$

[View →](../../../../equation-mapping.html#corpus-equation-3d031d3d6a5836bf)

The coefficient $C_2^{(U)}$ is the complete coefficient of $(U/c_0^2)^2$ after the quadratic lapse-response term $Q_N$ and the second-order pieces of $\delta n$, $\delta\chi$, and $\varphi$ are combined. It cannot be read from $Q_N$ alone.

The preferred-motion part of the shift must contain scalar and anisotropic PPN potentials. To compare directly with Emergent Metric's scaffold, use $w_{\mathrm{sea}}^i=-w^i$, the sea velocity relative to the comparison frame:
$$
u^i_{\mathrm{sea,eff}}
=
D_U w_{\mathrm{sea}}^i\frac{U}{c_0^2}
+D_{\mathrm{aniso}} w_{\mathrm{sea}}^j\frac{U^i{}_j}{c_0^2}
+O(c_0\epsilon_{\mathrm{PN}}^{5/2},c_0\epsilon_{\mathrm{LV}}).
$$

[View →](../../../../equation-mapping.html#corpus-equation-1b11df1a936ad0d1)

At leading order in $g_{0i}^{\mathrm{eff}}=-\gamma_{ij}^{\mathrm{eff}}u^j_{\mathrm{sea,eff}}/c_0$, this gives
$$
D_U=-\frac{\Xi_1}{2},
\qquad
D_{\mathrm{aniso}}=-\Xi_2.
$$

[View →](../../../../equation-mapping.html#corpus-equation-285e45aa68e32bb5)

With $U/c_0^2=O(\epsilon_{\mathrm{PN}})$ and $w/c_0=O(\epsilon_{\mathrm{PN}}^{1/2})$, this shift is $O(c_0\epsilon_{\mathrm{PN}}^{3/2})$ and its square in $g_{00}^{\mathrm{eff}}$ is $O(\epsilon_{\mathrm{PN}}^3)$. It cannot supply the retained $O(\epsilon_{\mathrm{PN}}^2)$ coefficients $\Xi_3$ and $\Xi_4$; these require the lapse response at that order. The rotating-source shift is a separate contribution. A scalar-only group velocity row has no $\Xi_2$ slot and therefore cannot be tested against the tight $\alpha_2$ channel.

For a declared observation window $W$ and retained record tuple $\theta$, the shared weak-field residual can be recorded as
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

[View →](../../../../equation-mapping.html#corpus-equation-c648ba8893f9e4d2)

with
$$
R_{\mathrm{acc}}
=
\frac{\left\|\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}+(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W}
{\left\|(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W+\varepsilon}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e1f1412704f76337)

The norm $\|\cdot\|_W$ is a declared norm over the observation window; $\varepsilon>0$ has the same units as the acceleration norm in its denominator. This is a leading stationary slow-motion comparison, not the full geodesic equation with shift and velocity terms. The other residuals are redshift, Shapiro, and lensing differences from the same record $\theta$, retaining source histories, medium state, observer response, calibration, and boundary data. Each residual needs declared units and covariance before combination into a scalar test.

## Numeric Closure Pipeline and Global Objective

To enforce cross-observable closure without parameter bloat, use a single constitutive vector and a fixed projection to the PPN decision manifold.

Define the PPN constitutive vector
$$
\boldsymbol{\vartheta}_{\mathrm{PPN}}
\equiv
\begin{pmatrix}
\gamma_{\mathrm{PPN}}\\
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

[View →](../../../../equation-mapping.html#corpus-equation-4975357010f06213)

Using
$$
\beta_{\mathrm{PPN}}-1=\left(\frac{1+2C_2}{2}\right)-1=C_2-\frac12,
\qquad
\alpha_1=\Xi_1+2\Xi_2,\ \alpha_2=\Xi_2,\ \alpha_3=\Xi_1+\Xi_2-\Xi_3
$$

[View →](../../../../equation-mapping.html#corpus-equation-cbe38ebcbeea53fb)

the map is the exact affine projection within this reduced coefficient ansatz
$$
\mathbf{p}_{\mathrm{PPN}}=\mathbf{J}\boldsymbol{\vartheta}_{\mathrm{PPN}}-\mathbf{p}_0
$$

[View →](../../../../equation-mapping.html#corpus-equation-30fd903420954368)

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
0 & 0 & 1 & 2 & 0\\
0 & 0 & 0 & 1 & 0\\
0 & 0 & 1 & 1 & -1
\end{pmatrix}
$$

[View →](../../../../equation-mapping.html#corpus-equation-74a697c00643ff13)

If $\Sigma_{\vartheta}$ is the covariance of the constitutive fit from micro-simulations, propagate uncertainty by
$$
\Sigma_{\mathrm{PPN}}=\mathbf{J}\Sigma_{\vartheta}\mathbf{J}^{\mathsf T}
$$

[View →](../../../../equation-mapping.html#corpus-equation-27282666c071ea37)

Define the single Tier-1 weighted closure objective
$$
\mathcal E_{\mathrm{PPN}}(\boldsymbol{\vartheta}_{\mathrm{PPN}})=\mathbf{p}_{\mathrm{PPN}}^{\mathsf T}\mathbf{W}\,\mathbf{p}_{\mathrm{PPN}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-94599078355f0e1e)

where $\mathbf W$ contains reciprocal squared screening scales. These tolerance weights are not an inverse covariance or a chi-squared statistic. With the historical benchmark vector above,
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

[View →](../../../../equation-mapping.html#corpus-equation-543cc1b21431fe17)

Forward-only evaluation rule:
1. Calibrate $\boldsymbol{\vartheta}_{\mathrm{PPN}}$ and $\Sigma_{\vartheta}$ from micro-scale clock/refraction simulations.
2. Project once to $(\mathbf{p}_{\mathrm{PPN}},\Sigma_{\mathrm{PPN}})$ and evaluate $\mathcal E_{\mathrm{PPN}}(\boldsymbol{\vartheta}_{\mathrm{PPN}})$.
3. Predict macroscopic observables (Shapiro, precession, redshift, lensing) with this fixed parameter set.
4. If any observable fails its ledger gate, reject the constitutive map; do not refit per observable.

## Forward Observable Projection (Weak-Field Classical Set)

To force cross-observable closure in a single forward pass, define
$$
\mathbf{O}(\boldsymbol{\vartheta}_{\mathrm{PPN}})
\equiv
\begin{pmatrix}
\Delta t_{\text{Shap}}\\
\Delta\phi_{\text{Def}}\\
\Delta\omega_{\text{Prec}}\\
z_{\text{Red}}
\end{pmatrix}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9765a56f27b2fa0d)

These are observer-level PPN comparison projections, conditional on the constitutive map recovering a common metric and matter/signal propagation. Use a stationary, nonrotating isolated source, a test body, and a preferred-frame-free comparison ($\mathbf w=0$); account separately for quadrupole, many-body, and instrument effects. Spherical source geometry alone does not remove preferred-frame dependence. Here $b$ is the ray impact parameter for endpoints effectively at infinity, $a$ and $e$ are the orbit's semimajor axis and eccentricity with $0\le e<1$, and $r_1,r_2,R$ retain the endpoint convention above.

1. Shapiro delay:
$$
O_1(\boldsymbol{\vartheta}_{\mathrm{PPN}})=K_{\text{Shap}}(1+\gamma_{\mathrm{PPN}}),
\qquad
K_{\text{Shap}}=
\frac{GM}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-123a47b0bb2b95c1)

For two-way radar-style Shapiro measurements, apply the same kernel on each leg and sum the two one-way contributions.
2. Light deflection:
$$
O_2(\boldsymbol{\vartheta}_{\mathrm{PPN}})=K_{\text{Def}}(1+\gamma_{\mathrm{PPN}}),
\qquad
K_{\text{Def}}=\frac{2GM}{b\,c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d19742985691a82c)

3. Perihelion precession per orbit:
$$
O_3(\boldsymbol{\vartheta}_{\mathrm{PPN}})
=
K_{\text{Prec}}\left(2+2\gamma_{\text{PPN}}-\beta_{\text{PPN}}\right)
=
K_{\text{Prec}}\left(1.5+2\gamma_{\mathrm{PPN}}-C_2\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-c5973d4fbefb8e3f)

$$
K_{\text{Prec}}=\frac{2\pi GM}{a(1-e^2)c_0^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-44732eb0483d4e3f)

4. Gravitational redshift for stationary transmitter and receiver clocks. Define $z_{\mathrm{Red}}=\nu_t/\nu_r-1=N_r/N_t-1$, where $\nu_t$ is the emitted proper frequency and $\nu_r$ the received proper frequency, with identical clock calibration and stationary metric transport. Set $\Delta U=U_t-U_r$ and $\Delta(U^2)=U_t^2-U_r^2$. Expanding the ratio of the two clock rates gives
$$
O_4(\boldsymbol{\vartheta}_{\mathrm{PPN}})
=
K_{\text{Red1}}-K_{\text{Red2}}C_2,
\qquad
K_{\text{Red1}}=\frac{\Delta U}{c_0^2}+\frac{U_t\Delta U}{c_0^4},
\quad
K_{\text{Red2}}=\frac{\Delta(U^2)}{c_0^4}
$$

[View →](../../../../equation-mapping.html#corpus-equation-60b5a1b9dbf68ce8)

The $U_t\Delta U/c_0^4$ term comes from expanding the denominator $N_t$; subtracting clock rates alone misses it. Omitted redshift terms are $O(\epsilon_{\mathrm{PN}}^3)$. At fixed geometry and endpoint potentials, observable sensitivities to the retained parameters are
$$
\mathbf{J}_O
\equiv
\frac{\partial\mathbf{O}}{\partial\boldsymbol{\vartheta}_{\mathrm{PPN}}}
=
\begin{pmatrix}
K_{\text{Shap}} & 0 & 0 & 0 & 0\\
K_{\text{Def}} & 0 & 0 & 0 & 0\\
2K_{\text{Prec}} & -K_{\text{Prec}} & 0 & 0 & 0\\
0 & -K_{\text{Red2}} & 0 & 0 & 0
\end{pmatrix}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fdc30f37212861d7)

and the propagated covariance is
$$
\Sigma_O=\mathbf{J}_O\Sigma_{\vartheta}\mathbf{J}_O^{\mathsf T}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3b36a186884b546a)

For this restricted zero-preferred-frame projection, the three $\Xi_i$ columns vanish by construction. Measurements sensitive to nonzero $\mathbf w$ and their compact-body or apparatus maps are needed to constrain them.

## Worked Solar-System Reference Projection (Synthetic Calibration Example)

This synthetic observer-level calculation uses normalized wake-speed units, $c_f=1$, with results displayed using reference metre, second, and angular conversions. It does not calibrate the native coupling or determine $c_0/c_f$. The rounded solar comparison scales are
$$
\frac{GM_\odot}{c_0^2}=1.4766\times 10^3\ \mathrm{m},
\qquad
\frac{GM_\odot}{c_0^3}=4.925\times 10^{-6}\ \mathrm{s}
$$

[View →](../../../../equation-mapping.html#corpus-equation-976c7205bbf9ab2f)

Use these prescribed, rounded reference kernels. The precession kernel includes the number of orbits per century (cy), so it reports a century rate rather than the per-orbit angle above. For redshift take $U_t/c_0^2=2.12\times10^{-6}$ and $U_r=0$, giving $\Delta(U^2)/c_0^4=(2.12\times10^{-6})^2$:
$$
K_{\text{Shap}}=70.4\ \mu\mathrm{s},
\quad
K_{\text{Def}}=0.875'' ,
\quad
K_{\text{Prec}}=14.3''/\mathrm{cy},
\quad
K_{\text{Red1}}=2.12\times 10^{-6}+4.4944\times10^{-12},
\quad
K_{\text{Red2}}=4.4944\times 10^{-12}
$$

[View →](../../../../equation-mapping.html#corpus-equation-52252920a430478d)

Take a synthetic constitutive fit
$$
\boldsymbol{\vartheta}_{\mathrm{PPN}}
=
\begin{pmatrix}
1+1.2\times 10^{-5}\\
0.5+0.8\times 10^{-5}\\
10^{-18}\\
-0.5\times 10^{-18}\\
0.2\times 10^{-18}
\end{pmatrix}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e85ed6c8925ba8ef)

$$
\Sigma_{\vartheta}=
\operatorname{diag}\!\left(
0.25\times 10^{-10},
0.16\times 10^{-10},
10^{-36},
10^{-36},
10^{-36}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-d8396d65f7345b2e)

This block is an internal consistency projection example, not a claim of experimental pass/fail by itself.

Projection to decision space gives
$$
\gamma_{\mathrm{PPN}}-1=1.2\times 10^{-5},
\quad
\beta_{\mathrm{PPN}}-1=0.8\times 10^{-5},
\quad
(\alpha_1,\alpha_2,\alpha_3)=\left(0,-0.5\times 10^{-18},0.3\times 10^{-18}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-104d8de3bee654e7)

Forward observables are
$$
\Delta t_{\text{Shap}}=140.80084\ \mu\mathrm{s},
\quad
\Delta\phi_{\text{Def}}=1.75001\,\mathrm{arcsec},
\quad
\Delta\omega_{\text{Prec}}=42.9002\,\mathrm{arcsec}/\mathrm{cy}
$$

[View →](../../../../equation-mapping.html#corpus-equation-93df7884565949aa)

$$
z_{\text{Red}}\approx 2.120002247\times 10^{-6}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2c7788c527cfeea2)

Propagated marginal $1\sigma$ scales for the stipulated diagonal parameter covariance are
$$
\sigma_{\text{Shap}}\approx 3.5\times 10^{-4}\ \mu\mathrm{s},
\quad
\sigma_{\text{Def}}\approx 4.4\times 10^{-6}\,\mathrm{arcsec},
\quad
\sigma_{\text{Prec}}\approx 1.5\times 10^{-4}\,\mathrm{arcsec}/\mathrm{cy},
\quad
\sigma_{\text{Red}}\approx 1.8\times 10^{-17}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9c4d39dd2a0e51a4)

This synthetic vector has $|\alpha_3|/(4\times10^{-20})=7.5$ and fails the illustrative componentwise screen; the example demonstrates projection arithmetic, not a passing calibration. These uncertainty scales propagate only the stipulated parameter covariance, holding the rounded kernels fixed. Observable covariance is not diagonal: Shapiro delay and deflection depend on the same parameter and their predicted errors are fully correlated here.

For a real comparison, form the residual covariance $\Sigma_{\mathrm{res}}=\operatorname{Cov}(\mathbf O-\mathbf O_{\mathrm{obs}})$ including measurement, parameter, geometry, calibration, and model-discrepancy uncertainty with their correlations. For independent prediction and observation errors it reduces to their covariance sum. A marginal three-standard-deviation diagnostic uses
$$
\mathbf{O}(\boldsymbol{\vartheta}_{\mathrm{PPN}})\pm 3\sqrt{\operatorname{diag}(\Sigma_{\mathrm{res}})}
$$

[View →](../../../../equation-mapping.html#corpus-equation-14517e5f6c9a6b35)

as a discrepancy flag. Joint rejection requires a declared likelihood, systematic-error model, and multiple-comparison rule. An uncertain observation outside a parameter-only interval does not by itself falsify the constitutive map. Retuning separately for each observable still does not constitute cross-observable recovery.

## Benchmark-Input Joint Likelihood (Reduced Fit)

This reduced likelihood uses benchmark rows as inputs to test internal projection consistency; it is not an archived end-to-end reprocessing of the raw experiments. Using the forward map above, define the joint likelihood
$$
\ln \mathcal{L}(\boldsymbol{\vartheta}_{\mathrm{PPN}})
=
-\frac{1}{2}
\bigl(\mathbf{O}(\boldsymbol{\vartheta}_{\mathrm{PPN}})-\mathbf{O}_{\text{obs}}\bigr)^{\mathsf T}
\Sigma_{\text{obs}}^{-1}
\bigl(\mathbf{O}(\boldsymbol{\vartheta}_{\mathrm{PPN}})-\mathbf{O}_{\text{obs}}\bigr)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b7c02cfd6b2ac26c)

with
$$
\boldsymbol{\vartheta}_{\mathrm{PPN}}=
\left(\gamma_{\mathrm{PPN}},C_2,\Xi_1,\Xi_2,\Xi_3\right)^{\mathsf T}
$$

[View →](../../../../equation-mapping.html#corpus-equation-bcadb607c738319d)

For the illustrative reduced fit, take these compressed inputs. The first two reproduce historical reported estimates; the third is a stipulated synthetic precession-combination uncertainty, not an independently verified Mercury measurement:
1. Cassini Shapiro: $\gamma_{\text{obs}}-1=(2.1\pm2.3)\times 10^{-5}$, as summarized by [Will (2014), section 4.1.2](https://arxiv.org/pdf/1403.7377v1).
2. VLBI solar deflection: $\gamma_{\text{obs}}-1=(-0.8\pm1.2)\times 10^{-4}$, from [Lambert and Le Poncin-Lafitte's 2011 analysis](https://syrte.obspm.fr/jsr/journees2011/pdf/lambert1.pdf).
3. Synthetic Mercury-like precession combination: $(2\gamma_{\text{obs}}-\beta_{\text{obs}})=1\pm 3.0\times 10^{-5}$.
4. Galileo redshift comparison: [Delva and collaborators (2018)](https://arxiv.org/abs/1812.03711) report a fractional deviation from the first-order GR redshift of $(0.19\pm2.48)\times10^{-5}$ at $1\sigma$. This concerns a fractional violation parameter, not the redshift itself or directly $C_2$; Gravity Probe A is a separate earlier experiment.

For this restricted zero-preferred-frame classical set, the Jacobian structure satisfies
$$
\frac{\partial \mathbf{O}}{\partial \Xi_1}
=
\frac{\partial \mathbf{O}}{\partial \Xi_2}
=
\frac{\partial \mathbf{O}}{\partial \Xi_3}
=
\mathbf{0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d8c34c634287effe)

so the Fisher matrix is rank-2 in this fit and $(\Xi_1,\Xi_2,\Xi_3)$ remain unconstrained by this subset alone.

This algebraic fit uses only the first three rows, treated as independent Gaussian $1\sigma$ inputs, with source and apparatus nuisance parameters held fixed. It fits $(\gamma_{\mathrm{PPN}}-1,\gamma_{\mathrm{PPN}}-1,2\gamma_{\mathrm{PPN}}-\beta_{\mathrm{PPN}})$ to those compressed measurements, rather than inserting dimensionless coefficients into the mixed-unit observable tuple unchanged. The Galileo row is excluded because a second-order clock-channel likelihood is not supplied.

Reducing to $\boldsymbol{\vartheta}_{\mathrm{red}}=(\gamma_{\mathrm{PPN}},C_2)^{\mathsf T}$, the inferred covariance is
$$
\Sigma_{\mathrm{red}}
=
\begin{pmatrix}
5.1\times 10^{-10} & 1.02\times 10^{-9}\\
1.02\times 10^{-9} & 2.94\times 10^{-9}
\end{pmatrix}
$$

[View →](../../../../equation-mapping.html#corpus-equation-dea4d6aef888f9c5)

with maximum-likelihood point
$$
\gamma_{\mathrm{PPN}}=1+(1.74\pm2.26)\times 10^{-5},
\qquad
C_2=0.5+(3.48\pm5.42)\times 10^{-5}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b87c0650e73c26bb)

and correlation
$$
\rho(\gamma_{\mathrm{PPN}},C_2)=+0.83
$$

[View →](../../../../equation-mapping.html#corpus-equation-7499eca0d2948665)

Interpretation for closure:
1. A single constitutive vector can fit the selected classical observables without per-observable retuning; read this as consistency of the projection algebra, not independent evidence for the constitutive map.
2. Preferred-frame channels require additional group-velocity-sensitive observables (LLR, pulsar timing, dedicated anisotropy tests) to close $(\Xi_1,\Xi_2,\Xi_3)$.
3. The positive $\gamma_{\mathrm{PPN}}$-$C_2$ covariance defines the conditional trade-off direction when matching precession jointly with refractive observables.

## Preferred-Frame Parameter Degeneracy Resolution (Augmented Likelihood)

Define the preferred-frame constitutive vector
$$
\boldsymbol{\Xi}\equiv(\Xi_1,\Xi_2,\Xi_3)^{\mathsf T}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4bbcf405465c674e)

For the zero-preferred-frame classical set above, $\boldsymbol{\Xi}$ is unconstrained. For a proposed expanded group-velocity-sensitive baseline (ephemerides, lunar laser ranging, and anisotropy channels), define the preferred-frame Fisher block, the expected local curvature of its log likelihood, by
$$
\mathcal{I}_{\Xi,\text{base}}
=
-\mathbb{E}\!\left[
\nabla_{\boldsymbol{\Xi}}
\nabla_{\boldsymbol{\Xi}}^{\mathsf T}
\ln \mathcal{L}_{\text{base}}
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-f5254ca7845d50ce)

For this conditional illustration, assume this positive-semidefinite block has rank two and unit null direction $\hat n$. No data-derived rank or null direction is supplied here:
$$
\mathcal{I}_{\Xi,\text{base}}\hat n=\mathbf{0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5ffaf1982db92845)

Candidate additional observables:
1. Binary-pulsar eccentricity drift channel $\dot e$ (orbital polarization sensitivity).
2. Solitary millisecond-pulsar spin channel $\dot P$ (self-acceleration sensitivity).

For statistically independent channel data conditional on the same parameters and nuisance model, use the joint likelihood
$$
\ln \mathcal{L}_{\text{joint}}(\boldsymbol{\Xi}\mid\mathcal{D})
=
\ln \mathcal{L}_{\text{base}}
+\ln \mathcal{L}_{\dot e}
+\ln \mathcal{L}_{\dot P}
$$

[View →](../../../../equation-mapping.html#corpus-equation-76efce7a837881a6)

For independent Gaussian scalar readouts with parameter-independent positive variances, the augmented Fisher matrix is
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

[View →](../../../../equation-mapping.html#corpus-equation-2e1587a5a29865a8)

Degeneracy-lift criterion:
$$
\det\!\left(\mathcal{I}_{\Xi,\text{total}}\right)>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-3707e632855e6e07)

Under the rank-two and positive-variance assumptions, this is equivalent to at least one added gradient having nonzero projection onto $\hat n$: its outer product supplies positive information in the sole previously null direction. Correlated data require the full joint covariance; shared nuisance parameters must be retained or profiled before assessing rank.

Positive-definite Fisher information establishes local identifiability and, under a valid local Gaussian approximation, a finite covariance ellipsoid near that fit. It does not establish global posterior boundedness, uniqueness, or proper normalization; nonlinear degeneracies and prior or nuisance tails remain separate questions.

A joint preferred-frame map fails when the same declared sea-velocity profile and coefficients cannot reproduce independent clock, orbital, and timing records within their complete uncertainty model. The CMB dipole supplies an observer-level comparison direction; it does not independently measure Noether sea motion. Incompatibility with it rejects only an explicitly adopted CMB-linked profile, not every possible medium-frame mapping.

The acceptance record for this layer requires Noether sea continuum simulations to supply
$$
\nabla_{\boldsymbol{\Xi}}\dot e,\qquad
\nabla_{\boldsymbol{\Xi}}\dot P
$$

[View →](../../../../equation-mapping.html#corpus-equation-94047a5df9087f85)

for the group-velocity-sensitive channels that lift the preferred-frame degeneracy.
