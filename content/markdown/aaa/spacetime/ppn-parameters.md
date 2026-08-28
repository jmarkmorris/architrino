# PPN Parameters

This chapter is the canonical home for weak-field/PPN expansion details used by the spacetime constitutive map.

## Canonical Symbols

- $n$: normalized Noether braid density, with $\rho_{\text{NS}}=\rho_{\text{NS},0}n$.
- $\chi_{\text{sea}}$: Noether sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$.
- $c_0\equiv c_{\text{eff}}(\infty)$: asymptotic homogeneous observer-channel speed used in weak-field PPN comparisons.
- $\Phi_N$: Newtonian benchmark potential.
- $\Phi_{\text{eff}}$: constitutive effective potential from the clock channel.
- $U\equiv -\Phi_N>0$: positive PPN expansion variable (default).
- $U_{\Phi}\equiv -\Phi_{\text{eff}}>0$: constitutive-channel variant used when expanding directly in $\Phi_{\text{eff}}$.
- $C_2^{(U)}$ and $C_2^{(\Phi)}$: second-order clock coefficients in expansions using $U$ and $U_{\Phi}$, respectively. The undecorated $C_2$ in the numerical reduced-fit sections means $C_2^{(U)}$.
- $a_\chi$: first-order clock-channel response defined by $\ln\chi_{\text{sea}}=a_\chi U/c_0^2+O(U^2/c_0^4)$; the signal-channel value is $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$.
- $U_{ij}$: standard PPN anisotropic potential, with $U_{ij}=G\int \rho' (x-x')_i(x-x')_j/|\mathbf x-\mathbf x'|^3\,d^3x'$ in the comparison chart.
- $V_i$: standard PPN matter-current potential, with $V_i=G\int \rho'v_i'/|\mathbf x-\mathbf x'|\,d^3x'$; it has units of potential times velocity.

## Mapping to PPN Constraints

1. **Shapiro Delay**: Map the GR time-delay (longer path in curved space) to the $\mathbb{A}\mathbb{A}\mathbb{A}$ time-delay (slower $c_{\text{eff}}$ in the Noether sea).
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b3e6e1ba275c9b6e)
For a central source this becomes
$$
\boldsymbol\Omega_{\mathrm{dS}}
=
\frac{1+2\gamma_{\mathrm{PPN}}}{2}
\frac{GM}{c_0^2r^3}
\mathbf r\times\mathbf v,
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-68826ec78add1bfe)
giving the GR coefficient $3/2$ when $\gamma_{\mathrm{PPN}}=1$. The closure residual must compare the transported assembly-orientation frame with this estimator using the same effective metric record as Shapiro delay and lensing.


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
= 1 - (1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(\mathbf X,T)}{c_0^2}
+ \mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3cc63b1fc4ebd63d)
with $\Phi_N<0$ near a mass source. For a point mass $M$,
$$
\Phi_N(r)=-\frac{GM}{r}
\quad\Rightarrow\quad
\bar{\chi}_{\text{sea}}(r)=1+(1+\gamma_{\mathrm{PPN}})\frac{GM}{c_0^2 r}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_0^4 r^2}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-01a35d5ca30f9f21)

For a one-way signal along a Euclidean straight path $\Gamma$ (the $\mathbb{U}_{\text{now}}$ anchor),
$$
t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{1}{c_0}\int_\Gamma \bar{\chi}_{\text{sea}}(\mathbf X,T)\,ds
=\frac{R}{c_0}+\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e40463434fdc8ebb)
where $R=\int_\Gamma ds$ is Euclidean path length and
$$
\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{1}{c_0}\int_\Gamma (\bar{\chi}_{\text{sea}}-1)\,ds
=\frac{(1+\gamma_{\mathrm{PPN}})GM}{c_0^3}\int_\Gamma \frac{ds}{r(s)}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_0^5}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c4d819a3eb58620c)

Evaluating the line integral for endpoint radii $r_1,r_2$ and Euclidean endpoint separation $R$ gives
$$
\Delta t_{\mathrm{eff}}^{(\mathbb{A}\mathbb{A}\mathbb{A})}
=\frac{(1+\gamma_{\mathrm{PPN}})GM}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+\mathcal{O}\!\left(\frac{G^2M^2}{c_0^5}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-dbfc1c9db0dff320)
which is the standard 1PN Shapiro form with $\gamma\to\gamma_{\mathrm{PPN}}$ and $c\to c_0$. The primitive wake speed $c_f$ remains in the unnormalized delay factor $\chi_{\text{sea}}=c_f/c_{\text{eff}}$; observer-facing PPN timing uses the asymptotic dressed speed $c_0$.

So the operational estimator is
$$
\gamma_{\mathrm{PPN}}
=
\frac{c_0^3\,\Delta t_{\text{obs}}}
{GM\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)}
-1
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-394ab260d9cf36f8)
with $\Delta t_{\text{obs}}=t_{\text{obs}}-R/c_0$.

In the weak-field solar-system regime, $\gamma_{\mathrm{PPN}}$ is the direct refractive-space-curvature map parameter.

The same Shapiro map also fixes the first-order signal-delay response coefficient

$$
a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c407f0f6053a262a)

This is not automatically the clock coefficient $a_\chi$ used in the static $\Gamma_N$ endpoint row. The shared clock/signal delay branch is the additional condition

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
\equiv
a_\chi-a_\chi^{\mathrm{sig}}
=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-32a5bcc20a9cc9cc)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4f4bf9018b059731)
while the full GR-matching target is
$$
\Delta\theta_{\mathrm{GR}}
=
\frac{4GM}{b\,c_0^2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-cbafbd2358fc044f)
In the forward projection below, the missing half is precisely the $\gamma_{\mathrm{PPN}}$ spatial-compliance contribution. Therefore a constitutive map cannot claim PPN closure by matching Shapiro delay with a scalar delay factor while leaving the ruler/spatial-compliance row undefined.

### Parameter $\beta$ (Non-linearity of Gravity)
* **GR Context:** Measures the non-linearity in the superposition of gravitational fields.
* **$\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation:** Captures second-order (in potential) clock/medium response from self-hit and Noether sea constitutive nonlinearity.
* **Explicit map from constitutive expansion:** Let $U\equiv-\Phi_N>0$. For a declared weak-field branch — conditional, like every weak-field expansion in this chapter, on the homogeneous quiescent Noether sea being an equilibrium of the constitutive dynamics, an open closure item of the [Noether sea program](noether-sea.md) — expand the static clock law with branch-local constitutive coefficient $C_2^{(U)}$:
$$
\frac{d\tau}{dt_{\mathrm{eff}}}\bigg|_{v=0}
=
1-\frac{U}{c_0^2}
+C_2^{(U)}\frac{U^2}{c_0^4}
+\mathcal{O}\!\left(\frac{U^3}{c_0^6}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1f1003778f3355c4)
Since $-g_{00}=(d\tau/dt_{\mathrm{eff}})^2$ for a static observer,
$$
g_{00}
=
-1
+2\frac{U}{c_0^2}
-\bigl[1+2C_2^{(U)}\bigr]\frac{U^2}{c_0^4}
+\mathcal{O}\!\left(\frac{U^3}{c_0^6}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8adef2f758c430a0)
In the static isolated-source subclass where the remaining standard PPN potentials already take their GR values or vanish, match to the PPN form
$$
g_{00}^{\mathrm{PPN}}
=
-1+2\frac{U}{c_0^2}-2\beta_{\mathrm{PPN}}\frac{U^2}{c_0^4}+\cdots
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-85274609a807572d)
to obtain
$$
\boxed{\beta_{\mathrm{PPN}}=\frac{1+2C_2^{(U)}}{2}}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b8a077bae49e26bd)
The superscript is essential: $C_2^{(U)}$ is the coefficient after the clock law has been expanded in the Newtonian comparison potential $U$. Reading $\beta_{\mathrm{PPN}}$ from this coefficient alone is not valid in a general source where $\Phi_{\mathrm W}$, $\Phi_1,\ldots,\Phi_4$, $\mathcal A$, or preferred-frame potentials carry independent non-GR coefficients. No cosmological $(a,k)$ dependence is implied here; those arguments are reserved for effective cosmology transfer variables such as $\mu(a,k)$ and $G_{\mathrm{eff}}(a,k)$.
* **Observable:** Perihelion precession and other 1PN nonlinear-potential tests.

### Exponential clock-law subclass (direct map)

The identity
$$
\Omega\xi=e^{\Phi_{\text{eff}}/c_0^2},
\qquad
g_{00}=-(\Omega\xi)^2
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0ab0711bd8da118c)
follows from the observer-side definition $\Phi_{\text{eff}}\equiv c_0^2\ln(\Omega\xi)$; it does not by itself determine a PPN parameter. With $U_{\Phi}\equiv -\Phi_{\text{eff}}$, it gives
$$
g_{00}
=
-e^{2\Phi_{\text{eff}}/c_0^2}
=
-1+2\frac{U_{\Phi}}{c_0^2}-2\frac{U_{\Phi}^2}{c_0^4}+O(c_0^{-6})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a88d33a14eb1bf3d)
and therefore fixes only the coefficient in the constitutive-potential expansion:
$$
\boxed{C_2^{(\Phi)}=\frac12}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-57ad27cf2d94d353)

Write the second-order potential conversion as
$$
\frac{U_{\Phi}}{c_0^2}
=
\frac{U}{c_0^2}
+D_2\frac{U^2}{c_0^4}
+O\!\left(\frac{U^3}{c_0^6}\right).
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e9bfca514dd9b1b4)
Then
$$
C_2^{(U)}=C_2^{(\Phi)}-D_2,
\qquad
\beta_{\mathrm{PPN}}=1-D_2.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e39c6c4aa467af09)
Thus the exponential clock-coordinate identity yields $\beta_{\mathrm{PPN}}=1$ if and only if $D_2=0$, equivalently $U_{\Phi}/c_0^2=U/c_0^2+O(U^3/c_0^6)$. Deriving or bounding $D_2$ from the shared Noether sea response is the actual nonlinear-potential obligation.

Here $\Omega\xi$ is the local clock-rate factor $d\tau/dt_{\mathrm{eff}}$. The Noether sea cadence-stretch factor used in redshift bookkeeping is its inverse, $\Gamma_N=(\Omega\xi)^{-1}$, when the same local clock channel is being compared.

### Preferred Frame Parameters ($\alpha_1, \alpha_2, \alpha_3$)
* **Crucial test:** In the effective relativistic limit these must vanish (no measurable preferred-frame leakage).
* **Constitutive leakage ansatz:** Let $\mathbf{w}=\mathbf V_{\mathrm{cm}}-\mathbf u_{\mathrm{sea}}$ be the barycentric laboratory or source-frame group velocity through the local Noether sea, matching the clock convention in which the material assembly moves relative to the sea. Write the lowest-order group velocity terms as
$$
g_{0i}^{\text{leak}}
=
-\frac{1}{2}\Xi_1\frac{w_i U}{c_0^3}
-\Xi_2\frac{w^j U_{ij}}{c_0^3}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8cb86fceb5fd8b4b)
$$
g_{00}^{\text{leak}}
=
-\Xi_3\frac{w^2 U}{c_0^4}
-\Xi_2\frac{w^i w^j U_{ij}}{c_0^4}
+\Xi_4\frac{w^i V_i}{c_0^4}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-24e18fe96029530c)
Matching to standard PPN preferred-frame structure gives
$$
\boxed{\alpha_1=\Xi_1},\qquad
\boxed{\alpha_2=\Xi_2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9340d57c293b7e8a)
$$
\boxed{\alpha_3=\Xi_1-\Xi_2-\Xi_3}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-629e98e67354d9ae)
with consistency relation
$$
\Xi_4=2\alpha_3-\alpha_1=\Xi_1-2\Xi_2-2\Xi_3
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-705843eb80c0c2ab)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a5b907b2895d6fc0)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-15aef2459df8cfa8)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a0bbe59396df590f)

The non-entrained comparison is $(f_{\mathrm{tr}},f_{\mathrm{rot}})=(0,0)$. Ignoring the smaller annual, daily, and apparatus contributions, the [measured CMB dipole](https://lambda.gsfc.nasa.gov/education/lambda_graphics/cmb_dipole.html) gives $|\mathbf w_\oplus|\approx369\,\mathrm{km\,s^{-1}}$ and therefore $\beta_{0,\oplus}\approx1.23\times10^{-3}$. Translational entrainment uses $f_{\mathrm{tr}}\to1$ while leaving the rotational row independently testable; local co-rotation also takes $f_{\mathrm{rot}}\to1$. These are evaluation profiles, not derived constitutive solutions.

The existing preferred-motion bundle separates the profiles through their predicted annual and sidereal phase and amplitude. Ground-to-orbit clock and resonator comparisons add the radial discriminator: a profile that becomes less entrained with altitude changes $\mathbf w_A^{(f)}$ across the trajectory, whereas a CMB-comoving profile preserves the leading dipole-scale drift. The same $(f_{\mathrm{tr}},f_{\mathrm{rot}})$ values must be used in clock, interferometer, matter-sector, and PPN rows; fitting a different terrestrial drift profile to each channel would not close the preferred-frame map.

### Rotating-Source Frame Dragging

Preferred-frame leakage and physical source-current response are different $g_{0i}$ channels. Setting $\alpha_1=\alpha_2=\alpha_3=0$ must remove dependence on a laboratory's group velocity through the Noether sea without removing the positive weak-field response to a rotating source. For source angular momentum $\mathbf J$ and $\mathbf r=r\hat{\mathbf r}$, the standard comparison row in the declared $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$ convention is
$$
g_{0i}^{\mathrm{drag}}
=
-\frac{2G_N}{c_0^3}
\frac{(\mathbf J\times\mathbf r)_i}{r^3}
+
O(c_0^{-5}).
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ad32f1cf32b319b0)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-08f89be880e48c87)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-37d90cf341114be3)
for a rotating source. Lense-Thirring and geodetic precession must therefore be recovered from one effective metric but remain distinct observable projections.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-314de0287c83f753)
Here $\xi_{\mathrm W}$ tests preferred-location leakage, while nonzero $\zeta_i$ would signal failure of the effective momentum/conservation bookkeeping. A wake-ledger theory cannot infer these zeros from notation: the same architrino-plus-wake-plus-medium record that closes total energy and momentum must project them below their observer-level bounds.

The missing decision rows are not equally well measured. Representative Will-style comparison pressures are

| Parameter | Representative bound or relation | Required estimator |
| --- | --- | --- |
| $\xi_{\mathrm W}$ | $|\xi_{\mathrm W}|\lesssim4\times10^{-9}$ from strong-field preferred-location torque tests | orientation precession relative to the external-potential direction |
| $\zeta_1$ | $|\zeta_1|\lesssim2\times10^{-2}$, mainly indirect | Nordtvedt/self-acceleration combination after the other PPN rows are fixed |
| $\zeta_2$ | $|\zeta_2|\lesssim4\times10^{-5}$ | binary-center-of-mass acceleration and pulsar timing |
| $\zeta_3$ | $|\zeta_3|\lesssim10^{-8}$ | active/passive mass and momentum-balance residual |
| $\zeta_4$ | no comparably direct standalone bound; $6\zeta_4=3\alpha_3+2\zeta_1-3\zeta_3$ under the standard pressure-gravity consistency assumption | pressure contribution to the same full PPN metric |

The pulsar-derived rows are strong-field analogues, not solar-system measurements. They remain legitimate closure pressure only if the model declares how its weak-field PPN parameters export into self-gravitating bodies. In particular, $\zeta_3$ is not automatically zero in a delayed pairwise interaction: the native estimator must cycle-average the complete matter-plus-wake-plus-Noether-sea momentum ledger before projecting the observer-level active/passive-mass residual.

## Zero-Leakage Conditions (Preferred-Frame Closure)

The effective theory is preferred-frame safe at the retained order if and only if all laboratory group-velocity couplings vanish:
$$
\Xi_1=\Xi_2=\Xi_3=\Xi_4=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-51a274a461d28d14)

Equivalent constitutive conditions:
$$
\left.\frac{\partial g_{\mu\nu}}{\partial w_i}\right|_{\mathbf{w}=0}=0,
\qquad
\left.\frac{\partial^2 g_{00}}{\partial w_i\partial w_j}\right|_{\mathbf{w}=0}
\propto \delta_{ij}
\ \text{with zero traceless part}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3040cd0f79d7e23c)
and no momentum-density coupling term $w^iV_i$ at the retained PN order.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2fdc9cbf8c9cf7d6)
Here $\mathbf{s}_A$ is the PPN sensitivity row for the channel, $\zeta_A$ is an allowed apparatus-calibration nuisance fixed by the instrument model, $n_A$ is detector/environment noise, and $y_A^\theta$ is the model readout projected from the retained record tuple $\theta$. The shared preferred-frame residual is
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-69f82830af0f2f6b)
The bundle fails if one clock or material channel requires a nonzero $\alpha_i$ that another channel excludes, or if the orientation/annual term is hidden in $\zeta_A$ rather than projected through $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$.

## Weak-Field Constraint Table (Decision Layer)

Use this table to close the constitutive loop against modern benchmarks.

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

The current Will-style numerical comparison is not a single "GR matches" flag. It is a reduced five-row bound vector on the channels already carried by the numerical fit:
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a2bf8068e72d1145)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-44f6f782ffd68e68)
The first row is the Cassini time-delay bound on $\gamma_{\mathrm{PPN}}-1$; the second uses the perihelion-shift row for $\beta_{\mathrm{PPN}}-1$; the preferred-frame rows use the best listed weak-field/strong-field analogue bounds, namely the $\alpha_1$ row from lunar-laser-ranging plus binary-pulsar bounds, the $\alpha_2$ row from the solar-spin-axis alignment bound, and the $\alpha_3$ row from pulsar-population $\dot p$ statistics, per the Will PPN living-review compilation. Strong-field pulsar bounds should not be silently reclassified as solar-system PPN measurements, but they are valid closure pressure: any $\mathbb{A}\mathbb{A}\mathbb{A}$ group-velocity-leakage that survives in ordinary clocks, orbits, or pulsar timing must project below the corresponding row unless a separate strong-field screening mechanism is derived.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-6eada48e5e333e47)
Weak-field closure requires
$$
\|\mathbf{q}_{\mathrm{PPN}}\|_\infty \le 1
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a95190bb18540d83)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7d3f70259b490fe2)
with $\tilde\kappa_{\bullet}^{\mathrm{eff}}$ used as photon-sector comparison coefficients and $\bar{s}^{\mu\nu}_{\mathrm{eff}}$ used as a gravity-sector comparison coefficient. These are observer-level projection diagnostics; they are not substrate coefficients added to the Euclidean void.

## Closure Program Interface (Observable Decision Layer)

This chapter is the observable-side gate for the emergent-metric closure.

Define the PPN decision vector:
$$
\mathbf{p}_{\mathrm{PPN}}=
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1b977b605cbf14fe)
The weak-field closure target is
$$
\mathbf{p}_{\mathrm{PPN}}\approx \mathbf{0}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c2a65ff49642965e)
within the benchmark tolerances listed in the validation ledger.

The synthetic calibration and likelihood sections below remain explicitly reduced fits over $(\gamma_{\mathrm{PPN}},C_2,\Xi_1,\Xi_2,\Xi_3)$. They do not numerically evaluate $\xi_{\mathrm W}$, $\zeta_i$, or the Lense-Thirring source-current row, so passing those reduced examples is not full PPN closure.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7c1521e0a983e8d8)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-19c2cccc2a2a1bbf)

In the local Noether sea rest weak-field row, write
$$
N
=
1-\frac{U_{\Phi}}{c_0^2}
+C_2^{(\Phi)}\frac{U_{\Phi}^2}{c_0^4}
+O(c_0^{-6},\epsilon_{\mathrm{LV}})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2bc4bb418f65a5c3)
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
\beta_{\mathrm{PPN}}-1=C_2^{(U)}-\frac12
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-126fe46ea130e20a)
The preferred-frame coefficients are the retained group velocity coefficients in $g_{0i}^{\mathrm{eff}}$ and $g_{00}^{\mathrm{eff}}$ under the $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ expansion above, with
$$
\alpha_1=\Xi_1,\qquad
\alpha_2=\Xi_2,\qquad
\alpha_3=\Xi_1-\Xi_2-\Xi_3
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5b0443421239c8c3)

This extraction is the dictionary for the coefficient scaffold in [Emergent Metric](./emergent-metric.md#admcartan-reconstruction-surface). If
$$
\delta n=a_n\frac{U}{c_0^2},\qquad
\delta\chi=a_\chi\frac{U}{c_0^2},\qquad
\varphi=-\frac{U}{c_0^2}+O(U^2/c_0^4),
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4b16a5feda96d58a)
then its scalar and spatial first-order rows must satisfy
$$
A_N^n a_n+A_N^\chi a_\chi-A_N^\Phi=-1,
\qquad
2\gamma_{\mathrm{PPN}}
=
A_\gamma^n a_n+A_\gamma^\chi a_\chi-A_\gamma^\Phi.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3d031d3d6a5836bf)
The coefficient $C_2^{(U)}$ is the complete coefficient of $(U/c_0^2)^2$ after $Q_N$ and the second-order pieces of $\delta n$, $\delta\chi$, and $\varphi$ are combined. It cannot be read from $Q_N$ alone.

The group velocity row must contain both scalar and anisotropic PPN potentials:
$$
u^i_{\mathrm{sea,eff}}
=
D_U w^i\frac{U}{c_0^2}
+D_{\mathrm{aniso}} w^j\frac{U^i{}_j}{c_0^2}
+O(c_0^{-4},\epsilon_{\mathrm{LV}}).
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1b11df1a936ad0d1)
At leading order in $g_{0i}^{\mathrm{eff}}=-\gamma_{ij}^{\mathrm{eff}}u^j_{\mathrm{sea,eff}}/c_0$, this gives
$$
D_U=\frac{\Xi_1}{2},
\qquad
D_{\mathrm{aniso}}=\Xi_2.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-285e45aa68e32bb5)
The remaining $\Xi_3$ and $\Xi_4$ require the quadratic group velocity terms in the lapse scaffold together with the shift-squared contribution to $g_{00}^{\mathrm{eff}}$. A scalar-only group velocity row has no $\Xi_2$ slot and therefore cannot be tested against the tight $\alpha_2$ channel.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c648ba8893f9e4d2)
with
$$
R_{\mathrm{acc}}
=
\frac{\left\|\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}+(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W}
{\left\|(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W+\varepsilon}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e1f1412704f76337)
The other residuals are the redshift, Shapiro, and lensing differences computed from the same retained record tuple $\theta$ and the forward projection below. This strengthens the existing decision layer; it is not a separate gate.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4975357010f06213)
Using
$$
\beta_{\mathrm{PPN}}-1=\left(\frac{1+2C_2}{2}\right)-1=C_2-\frac12,
\qquad
\alpha_1=\Xi_1,\ \alpha_2=\Xi_2,\ \alpha_3=\Xi_1-\Xi_2-\Xi_3
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-cbe38ebcbeea53fb)
the map is the exact linear projection
$$
\mathbf{p}_{\mathrm{PPN}}=\mathbf{J}\boldsymbol{\vartheta}_{\mathrm{PPN}}-\mathbf{p}_0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-30fd903420954368)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-74a697c00643ff13)

If $\Sigma_{\vartheta}$ is the covariance of the constitutive fit from micro-simulations, propagate uncertainty by
$$
\Sigma_{\mathrm{PPN}}=\mathbf{J}\Sigma_{\vartheta}\mathbf{J}^{\mathsf T}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-27282666c071ea37)

Define the single Tier-1 weighted closure objective
$$
\mathcal{L}(\boldsymbol{\vartheta}_{\mathrm{PPN}})=\mathbf{p}_{\mathrm{PPN}}^{\mathsf T}\mathbf{W}\,\mathbf{p}_{\mathrm{PPN}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-94599078355f0e1e)
where $\mathbf{W}$ is the precision matrix from ledger tolerances. With the source-mined benchmark vector above,
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-543cc1b21431fe17)

Forward-only evaluation rule:
1. Calibrate $\boldsymbol{\vartheta}_{\mathrm{PPN}}$ and $\Sigma_{\vartheta}$ from micro-scale clock/refraction simulations.
2. Project once to $(\mathbf{p}_{\mathrm{PPN}},\Sigma_{\mathrm{PPN}})$ and evaluate $\mathcal{L}(\boldsymbol{\vartheta}_{\mathrm{PPN}})$.
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9765a56f27b2fa0d)
Using the weak-field constitutive map of $\mathbb{A}\mathbb{A}\mathbb{A}$:

1. Shapiro delay:
$$
O_1(\boldsymbol{\vartheta}_{\mathrm{PPN}})=K_{\text{Shap}}(1+\gamma_{\mathrm{PPN}}),
\qquad
K_{\text{Shap}}=
\frac{GM}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-123a47b0bb2b95c1)
For two-way radar-style Shapiro measurements, apply the same kernel on each leg and sum the two one-way contributions.
2. Light deflection:
$$
O_2(\boldsymbol{\vartheta}_{\mathrm{PPN}})=K_{\text{Def}}(1+\gamma_{\mathrm{PPN}}),
\qquad
K_{\text{Def}}=\frac{2GM}{b\,c_0^2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d19742985691a82c)
3. Perihelion precession per orbit:
$$
O_3(\boldsymbol{\vartheta}_{\mathrm{PPN}})
=
K_{\text{Prec}}\left(2+2\gamma_{\text{PPN}}-\beta_{\text{PPN}}\right)
=
K_{\text{Prec}}\left(1.5+2\gamma_{\mathrm{PPN}}-C_2\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c5973d4fbefb8e3f)
$$
K_{\text{Prec}}=\frac{2\pi GM}{a(1-e^2)c_0^2}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-44732eb0483d4e3f)
4. Gravitational redshift (to retained order):
$$
O_4(\boldsymbol{\vartheta}_{\mathrm{PPN}})
=
K_{\text{Red1}}-K_{\text{Red2}}C_2,
\qquad
K_{\text{Red1}}=\frac{\Delta U}{c_0^2},
\quad
K_{\text{Red2}}=\frac{\Delta(U^2)}{c_0^4}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-60b5a1b9dbf68ce8)

First-order observable sensitivities are
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-fdc30f37212861d7)
and the propagated covariance is
$$
\Sigma_O=\mathbf{J}_O\Sigma_{\vartheta}\mathbf{J}_O^{\mathsf T}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3b36a186884b546a)
For this spherically symmetric classical set, preferred-frame channels $(\Xi_1,\Xi_2,\Xi_3)$ decouple at leading order; they are constrained by dedicated group velocity/leakage observables.

## Worked Solar-System Reference Projection (Synthetic Calibration Example)

Use
$$
\frac{GM_\odot}{c_0^2}=1.4766\times 10^3\ \mathrm{m},
\qquad
\frac{GM_\odot}{c_0^3}=4.925\times 10^{-6}\ \mathrm{s}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-976c7205bbf9ab2f)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-52252920a430478d)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e85ed6c8925ba8ef)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d8396d65f7345b2e)
This block is an internal consistency projection example, not a claim of experimental pass/fail by itself.

Projection to decision space gives
$$
\gamma_{\mathrm{PPN}}-1=1.2\times 10^{-5},
\quad
\beta_{\mathrm{PPN}}-1=0.8\times 10^{-5},
\quad
(\alpha_1,\alpha_2,\alpha_3)=\left(10^{-18},-0.5\times 10^{-18},1.3\times 10^{-18}\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-104d8de3bee654e7)
Forward observables are
$$
\Delta t_{\text{Shap}}=140.80084\ \mu\mathrm{s},
\quad
\Delta\phi_{\text{Def}}=1.75001\,\mathrm{arcsec},
\quad
\Delta\omega_{\text{Prec}}=42.9002\,\mathrm{arcsec}/\mathrm{cy}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-93df7884565949aa)
$$
z_{\text{Red}}\approx 2.119997\times 10^{-6}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2c7788c527cfeea2)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9c4d39dd2a0e51a4)

Failure rule for this closure layer: if any observed value lies outside
$$
\mathbf{O}(\boldsymbol{\vartheta}_{\mathrm{PPN}})\pm 3\sqrt{\operatorname{diag}(\Sigma_O)}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-14517e5f6c9a6b35)
the constitutive map fails this gate and must be replaced rather than re-fit per observable.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b7c02cfd6b2ac26c)
with
$$
\boldsymbol{\vartheta}_{\mathrm{PPN}}=
\left(\gamma_{\mathrm{PPN}},C_2,\Xi_1,\Xi_2,\Xi_3\right)^{\mathsf T}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-bcadb607c738319d)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d8c34c634287effe)
so the Fisher matrix is rank-2 in this fit and $(\Xi_1,\Xi_2,\Xi_3)$ remain unconstrained by this subset alone.

The following is an inline reduced-fit example using the first three declared rows above. The Galileo/GPA row is not included because no second-order central value and covariance are specified here.

Reducing to $\boldsymbol{\vartheta}_{\mathrm{red}}=(\gamma_{\mathrm{PPN}},C_2)^{\mathsf T}$, the inferred covariance is
$$
\Sigma_{\mathrm{red}}
=
\begin{pmatrix}
5.1\times 10^{-10} & 1.02\times 10^{-9}\\
1.02\times 10^{-9} & 2.94\times 10^{-9}
\end{pmatrix}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-dea4d6aef888f9c5)
with maximum-likelihood point
$$
\gamma_{\mathrm{PPN}}=1+(1.74\pm2.26)\times 10^{-5},
\qquad
C_2=0.5+(3.48\pm5.42)\times 10^{-5}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b87c0650e73c26bb)
and correlation
$$
\rho(\gamma_{\mathrm{PPN}},C_2)=+0.83
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7499eca0d2948665)

Interpretation for closure:
1. A single constitutive vector can fit the selected classical observables without per-observable retuning; read this as consistency of the projection algebra, not independent evidence for the constitutive map.
2. Preferred-frame channels require additional group-velocity-sensitive observables (LLR, pulsar timing, dedicated anisotropy tests) to close $(\Xi_1,\Xi_2,\Xi_3)$.
3. The positive $\gamma_{\mathrm{PPN}}$-$C_2$ covariance defines the accepted trade-off direction when matching precession jointly with refractive observables.

## Preferred-Frame Parameter Degeneracy Resolution (Augmented Likelihood)

Define the preferred-frame constitutive vector
$$
\boldsymbol{\Xi}\equiv(\Xi_1,\Xi_2,\Xi_3)^{\mathsf T}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4bbcf405465c674e)
For the spherical classical set above, $\boldsymbol{\Xi}$ is unconstrained. For an expanded group-velocity-sensitive baseline (ephemerides + LLR + anisotropy channels), treat the preferred-frame Fisher block as
$$
\mathcal{I}_{\Xi,\text{base}}
=
-\mathbb{E}\!\left[
\nabla_{\boldsymbol{\Xi}}
\nabla_{\boldsymbol{\Xi}}^{\mathsf T}
\ln \mathcal{L}_{\text{base}}
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f5254ca7845d50ce)
with rank-2 degeneracy and null direction $\hat n$:
$$
\mathcal{I}_{\Xi,\text{base}}\hat n=\mathbf{0}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5ffaf1982db92845)

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-76efce7a837881a6)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2e1587a5a29865a8)

Degeneracy-lift criterion:
$$
\det\!\left(\mathcal{I}_{\Xi,\text{total}}\right)>0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3707e632855e6e07)
which is equivalent to nonzero projection of the added gradient span onto the null direction $\hat n$.

Operational closure consequence: if this criterion is met with real timing data, the posterior over $(\Xi_1,\Xi_2,\Xi_3)$ closes to a bounded ellipsoid instead of a flat valley.

Failure mode for the constitutive cosmology map: if the inferred $\boldsymbol{\Xi}$ is significantly nonzero and incompatible with the independently inferred medium-drift direction from the CMB dipole, the single preferred-frame mapping in $\mathbb{A}\mathbb{A}\mathbb{A}$ is broken.

The acceptance record for this layer requires Noether sea continuum simulations to supply
$$
\nabla_{\boldsymbol{\Xi}}\dot e,\qquad
\nabla_{\boldsymbol{\Xi}}\dot P
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-94047a5df9087f85)
for the group-velocity-sensitive channels that lift the preferred-frame degeneracy.
