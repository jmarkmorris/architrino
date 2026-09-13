# Cosmology Reconstruction

Start with the thing a telescope actually gives us. It gives us changed light. It gives spectra, colors, line shifts, fluxes, angular images, polarization, arrival times, correlations, and maps. It does not hand us distance, age, expansion, dark energy, or a metric. Those are reconstructions.

This chapter states the reconstruction problem between standard Lambda-CDM cosmology and Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$. Lambda-CDM combines a cosmological constant, Lambda, with cold dark matter, a gravitating component whose random speeds are small in the structure-formation regime. The cosmic microwave background (CMB) is the nearly thermal microwave sky; baryon acoustic oscillations (BAO) are a characteristic clustering scale used as a calibrated ruler; weak lensing measures small correlated distortions of source images. These and galaxy spectra, supernova light curves, cluster catalogs, and abundance measurements constrain the reconstruction. Their source and propagation interpretations require explicit models.

Lambda-CDM predicts photon observables from a metric expansion history together with source, transport, and instrument models, then constrains their parameters with data. $\mathbb{A}\mathbb{A}\mathbb{A}$ seeks a deeper implementation through the [Noether sea](../spacetime/noether-sea.md), the ambient population of coupled neutral architrino assemblies, inside the [Euclidean void](../foundations/euclidean-void.md), the fixed three-dimensional spatial container. An [architrino](../foundations/architrino.md) is a polarity-bearing point entity whose emitted causal wake carries its past influence; received wake contributions determine acceleration through the [Master Equation](../dynamics/master-equation.md). A photon-channel packet is the proposed assembly and wake structure that must reproduce detected light. The ledger accounts for that transported record; it is not an additional substance carried through space.

The central ontological rule is that the Euclidean void does not expand. Assemblies and their causal histories evolve in [absolute time](../foundations/absolute-time.md), the universal ordering parameter $T$, while physical clocks provide derived readouts. Expansion variables are recovery targets for effective summaries of this evolution. The transfer decomposition below supplies accounting definitions and conditional comparisons; its terms still require a common dynamical source, transport, and clock model before they constitute a cosmological prediction.

For surrounding context, see [Cosmology Ontology](./cosmology-ontology.md), [Expansion Mechanism](./expansion-mechanism.md), [Dark Energy](./dark-energy.md), [Dark Matter](./dark-matter.md), [Structure Formation](./structure-formation.md), [CMB](./CMB.md), and [Hubble and S8 Tensions](./hubble-s8-tensions.md).

## The Simple Picture

Imagine receiving a message after it crossed a very large, changing ocean. The sender, receiver, and trip all affect what is received. The analogy illustrates inference through a transport channel; it does not establish a fluid-like light mechanism, scattering loss, or cosmological frequency shift.

Cosmology is mostly like that, except the message is a photon record. The record carries information about the emitting source, but it also carries information about the environment near the source, the path through the Noether sea, the receiver clock, and the receiver apparatus.

Standard cosmology is powerful because it found a compact way to organize those records. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not throw that organization away. It asks whether the compact variables are being mistaken for the machinery that produced them.

The difference can be stated as a layer split:

| Layer | What is received or fitted | What must be explained |
| --- | --- | --- |
| Photon record | Calibrated spectra, flux, polarization, arrival times, angular images, CMB maps, lensing correlations. | How the light channel and apparatus produce these records; maps and correlations also require foreground and instrument reconstruction. |
| Effective variables | Redshift $z$, luminosity distance $d_L$, angular-diameter distance $d_A$, $H(z)$, $\Omega_m$, $\Omega_\Lambda$, $w(z)$. | Why these variables compress the received record so well. |
| Ontology | Expanding metric space, fundamental spacetime, fundamental photon field, dark energy, dark matter. | Which parts are real assemblies, which parts are Noether sea response, and which parts are reconstruction bookkeeping. |

The first layer is the observation. The second layer is a disciplined map. The third layer is where $\mathbb{A}\mathbb{A}\mathbb{A}$ relocates the physical explanation.

## Why Lambda-CDM Is Strong

Lambda-CDM is strong because it compresses many observation channels into a small effective model. Its standard comparison form uses a homogeneous and isotropic metric background, with perturbations describing departures from that average. The scale factor $a_{\mathrm{std}}(t)$ measures relative separation of comoving locations at standard cosmic time $t$. Its contents include baryons, meaning ordinary nuclear matter, cold dark matter, radiation, and neutrinos, with a cosmological constant as the Lambda term. A variable dark-energy equation of state is an extension of this model. The layer-explicit $\mathbb{A}\mathbb{A}\mathbb{A}$ bridge uses $a_{\mathrm{eff}}(t_{\mathrm{eff}})$ only after the observer-era clock map has been declared.

Its recovery targets include the following observations, with source astrophysics, foregrounds, selection, and measurement uncertainty included where needed:

- the Hubble redshift-distance relation;
- supernova dimming and time dilation;
- the CMB blackbody spectrum and anisotropy peaks;
- BAO distance ladders;
- weak-lensing correlations;
- large-scale structure growth;
- primordial light-element abundances;
- cluster and galaxy population histories.

That success is the recovery target. $\mathbb{A}\mathbb{A}\mathbb{A}$ cannot replace Lambda-CDM by refusing its data products. It must explain why the Lambda-CDM compression works over the domains where it works, and where its inferred ontology has gone beyond what the photon record alone establishes.

The clean way to read Lambda-CDM is therefore:

1. It is an excellent effective fit pipeline.
2. It is not a final implementation of photons.
3. It is not a final implementation of spacetime.
4. It uses photons traveling through spacetime to infer source objects and source reactions.
5. Therefore the physical implementation of photon, effective spacetime, source, and transport cannot be skipped.

This is not a small technical quibble. Precision cosmology is mostly photon-mediated. Supernovae, galaxies, quasars, BAO tracers, the CMB, lensing shear maps, metallicity estimates, reionization histories, and star-formation histories are reconstructed primarily from light received after long propagation.

Lambda-CDM borrows the photon abstraction from quantum field theory and the metric abstraction from general relativity. That is valid as an effective pipeline when the abstractions are stable enough. $\mathbb{A}\mathbb{A}\mathbb{A}$ says the same pipeline becomes incomplete when its borrowed photon and spacetime layers are treated as finished physical implementations.

## What Redshift Is

Redshift is the main handle. A spectral line has a calibrated rest frequency. When we receive it at a lower frequency, the received light is redshifted. In ordinary observational language,

$$
1+z
=
\frac{\lambda_{\mathrm{obs}}}{\lambda_{\mathrm{emit}}}
=
\frac{\nu_{\mathrm{emit}}}{\nu_{\mathrm{obs}}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-40debe224727b7d9)

Here $\nu_{\mathrm{emit}}$ and $\lambda_{\mathrm{emit}}$ denote the adopted source-line reference, not an independent measurement made at the distant emission event. The wavelength and inverse-frequency ratios agree when both use the same nondispersive speed calibration. In a transport model with different endpoint phase speeds, $\lambda_{\mathrm{obs}}/\lambda_{\mathrm{emit}}=(c_{\gamma,R}/c_{\gamma,E})(\nu_{\mathrm{emit}}/\nu_{\mathrm{obs}})$; the frequency definition remains the relevant one below. The photon-channel speed $c_\gamma$ is distinct from the primitive wake speed $c_f$.

For comoving emission and reception in a homogeneous isotropic metric, after peculiar-motion and local gravitational shifts have been separated, the standard comparison relation is:

$$
1+z
=
\frac{\lambda_{\mathrm{obs}}}{\lambda_{\mathrm{emit}}}
=
\frac{\nu_{\mathrm{emit}}}{\nu_{\mathrm{obs}}}
=
\frac{a(t_{\mathrm{obs}})}{a(t_{\mathrm{emit}})}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-425758b6e3c675ca)

In this standard comparison equation $a=a_{\mathrm{std}}$ and $t$ is cosmic time. Its effective-layer recovery target is $1+z_{\mathrm{cos}}=a_{\mathrm{eff}}(t_{\mathrm{eff,obs}})/a_{\mathrm{eff}}(t_{\mathrm{eff,emit}})$, where $z_{\mathrm{cos}}$ denotes the cosmological component. The ratio follows from the assumed metric propagation law; it is not an identity for every measured line shift. The following standard distance and time formulas use $z=z_{\mathrm{cos}}$ and constrain cosmological parameters only together with a fitted model and independent source calibrations.

In the standard comparison with separately conserved pressureless matter and radiation, together with spatial curvature and a cosmological constant,

$$
H(z)
=
H_0
\left[
\Omega_m(1+z)^3
+
\Omega_r(1+z)^4
+
\Omega_k(1+z)^2
+
\Omega_\Lambda
\right]^{1/2},
$$

[View →](../../../../equation-mapping.html#corpus-equation-c4b7dfeedc2b8eec)

Here $H_0=H(0)$ is the present expansion rate. The $\Omega$ parameters are present-day density fractions for matter, radiation, and Lambda, together with the curvature coefficient, normalized so their sum is one. The powers assume the stated component laws; a species changing from relativistic to nonrelativistic behavior needs its own evolution, so this compact expression is not a precision massive-neutrino calculation. For a separately conserved dark-energy component, the extension with pressure-to-energy-density ratio $w(z)$ replaces the constant term by $\Omega_{\mathrm{de}}\exp[3\int_0^z(1+w(z'))\,dz'/(1+z')]$. These are observer-level comparison laws, not premises for architrino motion. With $c_0$ the calibrated observer light speed and present scale factor normalized to one, the line-of-sight comoving distance is

$$
\chi(z)
=
c_0
\int_0^z
\frac{dz'}{H(z')},
$$

[View →](../../../../equation-mapping.html#corpus-equation-0f4ecab8abce4709)

and the lookback time by

$$
t_L(z)
=
\int_0^z
\frac{dz'}{(1+z')H(z')}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-7a04a0fbe7e97db5)

In a flat, transparent comparison model with metric photon propagation and conserved photon number, luminosity distance is summarized by

$$
d_L(z)
=
(1+z)\chi(z),
$$

[View →](../../../../equation-mapping.html#corpus-equation-6e0e0e9b24a6ba30)

while the relation between bolometric luminosity $L$, the total emitted energy per source-clock interval, and bolometric flux $F$, received energy per area per receiver-clock interval, is

$$
F
=
\frac{L}{4\pi d_L^2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-12c6b174942e554b)

This is why redshift is so important. A measured line shift becomes $z$. The model turns $z$ into $H(z)$, $d_L(z)$, $d_A(z)$, lookback time, source volume, and population history. The fitted parameters then support statements about cosmic acceleration, dark energy, matter density, curvature, neutrino masses, and cosmic age.

A joint fit to redshift, source luminosity, selection, and distance is not circular merely because those quantities depend on common data. The inference must retain that dependence. Circularity or double counting arises if a luminosity inferred using a chosen distance model is then treated as an independent calibration validating that same model. Source calibration, shared errors, and selection must therefore appear in the joint likelihood, the probability assigned to the observations under the fitted model. The same requirement applies to Noether sea reconstruction.

## What Redshift Means In $\mathbb{A}\mathbb{A}\mathbb{A}$

In $\mathbb{A}\mathbb{A}\mathbb{A}$, redshift is not first a scale-factor ratio. It is a signed frequency-transfer ledger between an emission event $E$ and a reception event $R$:

$$
Z_X^{E\to R}
=
\ln
\frac{\nu_{X,0}}{\nu_{\mathrm{obs},X}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-18e80cb7ac250754)

Here $X$ labels an identified spectral feature with reference frequency $\nu_{X,0}>0$ and received frequency $\nu_{\mathrm{obs},X}>0$. A light-curve class or broad CMB band needs a separately specified spectral or temporal template before it supplies such a frequency ratio. The exponential gives one plus the observed redshift:

$$
1+z_X
=
\exp Z_X^{E\to R}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-c013e880f634ab91)

The factorization target of [Expansion Mechanism](./expansion-mechanism.md#noether-sea-braid-factorization-target) is written as an exact ledger identity by defining $Y_{X,E\to R}$ as the residual after the other factors are specified:

$$
Z_X^{E\to R}
=
\ln\Gamma_{N,E}
-
\ln\Gamma_{N,R}
+
Y_{X,E\to R}
-
\ln B_X(E)
-
\ln D_v.
$$

[View →](../../../../equation-mapping.html#corpus-equation-6a88827a144da6cd)

All logarithm arguments are positive dimensionless ratios in one declared calibration. Their meanings fix the signs:

- $\Gamma_{N,E}=\Omega_{N0}/\Omega_N(E)$ is the inverse cadence ratio at emission: a value above one means a slower local cycle rate than the reference $\Omega_{N0}$.
- $\Gamma_{N,R}=\Omega_{N0}/\Omega_N(R)$ is the corresponding inverse ratio at reception. A common multiplication of both endpoint factors cancels from the redshift.
- $Y_{X,E\to R}$ is the signed logarithmic path factor: positive values redshift the channel. Its interpretation as accumulated transport requires an independent extraction from the path history, beyond defining a residual.
- $B_X(E)$ is the source-transition frequency divided by its reference frequency before endpoint cadence, launch, and propagation effects. A real source-branch change is not necessarily a calibration error; increasing this factor decreases the redshift.
- $D_v$ is the frequency multiplier from launch and reception motion in the declared homogeneous-reference replay. Moving-clock effects assigned to the endpoint factors must not be counted again in this multiplier.

For a numerical illustration use normalized wake-speed units $c_f=1$. With all other factors equal to one, $\Gamma_{N,E}=2$ gives $z=1$, while $\Gamma_{N,R}=2$ gives $z=-1/2$. These are algebraic calibration examples, not derived clock branches. A single measured $Z_X$ does not identify the separate contributions: replacing $\ln\Gamma_{N,E}$ by $\ln\Gamma_{N,E}+u$ and $Y_X$ by $Y_X-u$ leaves the observation unchanged for any dimensionless $u$. Independent endpoint, source, motion, and transport constraints are required to remove this ambiguity.

The corresponding propagation residual is

$$
Z_{\mathrm{prop},X}
=
Z_X^{E\to R}
-
\ln\Gamma_{N,E}
+
\ln\Gamma_{N,R}
+
\ln B_X(E)
+
\ln D_v.
$$

[View →](../../../../equation-mapping.html#corpus-equation-d7eaa172d7bb9813)

This subtraction gives $Z_{\mathrm{prop},X}=Y_{X,E\to R}$ under the declared factorization. It has not also subtracted the path term. For a family of calibrated lines of sight, let $r_{\mathrm{los}}$ be the declared source-distance coordinate increasing outward from a fixed reception event, and $\hat{\mathbf k}$ the sightline direction. If the residual is differentiable along that family, define the diagnostic coefficient

$$
H_{\mathrm{eff},X}(r_{\mathrm{los}},\hat{\mathbf k})
=
c_0\,\partial_{r_{\mathrm{los}}} Z_{\mathrm{prop},X}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-d18ea9ad793b67e6)

This $H_{\mathrm{eff}}$ has units of inverse time, but is a spatial slope of the corrected transfer ledger, not yet a temporal expansion rate. The derivative requires a specified distance coordinate and how emission epochs and source properties vary along the sample; it is not determined by one received spectrum. Even in the flat standard comparison, choosing $r_{\mathrm{los}}=\chi$ and $Z=\ln(1+z)$ gives $c_0\,dZ/d\chi=H(z)/(1+z)$, since $d\chi/dz=c_0/H(z)$. Thus equality with $H(z)$ away from zero redshift needs an additional map.

Redshift alone therefore fixes neither distance nor elapsed time. Both reconstructions need a transport law and calibrated source and receiver records; the fixed-void account must derive those maps from assembly histories.

## Noether Sea Evolution Is Not Universal Expansion

The universe-level container does not stretch in $\mathbb{A}\mathbb{A}\mathbb{A}$. The Euclidean void remains the fixed setting. The Noether sea inside it can still evolve.

The proposed mechanism assigns changes of assembly radii, frequencies, collective stiffness, and local density to Noether sea evolution. A relaxing region whose indexed binary radii grow and characteristic frequencies decrease is a candidate history. Those changes alone do not determine the observed redshift: source transitions and receiving clocks may change together, and common factors can cancel. The mechanism needs a retained dynamical history and its source, path, and clock response to establish a net expansion-like trend.

The cosmos is also not one uniform clock. A galaxy cluster, a low-density void, a filament, a young star-forming region, a strong-field environment, and the line of sight between them can have different Noether sea histories. Many subassemblies can have repeatable motion. Repeatable motion gives phase histories. A photon-channel packet crossing the cosmos samples many such histories before it is received.

Smooth averaging alone does not supply one effective scale factor. A common scale description requires the same corrected transfer between the same effective epochs across channels and sightlines, within observational tolerances. On a homogeneous history with $t_{\mathrm{eff},1}<t_{\mathrm{eff},2}<t_{\mathrm{eff},3}$, its logarithmic transfers must compose as $Z_{13}=Z_{12}+Z_{23}$ and take the form $Z_{ij}=\ln a_{\mathrm{eff}}(t_{\mathrm{eff},j})-\ln a_{\mathrm{eff}}(t_{\mathrm{eff},i})$. Residual channel dependence or path dependence beyond the modeled perturbations obstructs this representation. Establishing these conditions is part of recovering the successful effective description.

The effective scale factor is therefore a compression of Noether sea state history, not a fundamental coordinate of the Euclidean void. It is useful when the averaged ledger is close to homogeneous and isotropic. It becomes misleading when source evolution, endpoint clock-rate differences, anisotropic path histories, or late Noether sea relaxation are forced into one global expansion variable.

## Source Claims Are Reconstructed

Every cosmological source claim should be read as a chain:

1. A source reaction or assembly transition emits a photon-channel packet with a channel-dependent initial record.
2. The source environment modifies the outgoing packet through local fields, plasma, density, motion, composition, and branch history.
3. The packet propagates through the Noether sea and accumulates path-history response.
4. The receiver samples the packet through a local Noether sea clock-rate factor, apparatus calibration, and observer motion.
5. The observer reconstructs a source label, redshift, distance, luminosity, and physical interpretation.

The last step is an inverse problem in either framework. Standard source and propagation models already perform such reconstruction; the additional $\mathbb{A}\mathbb{A}\mathbb{A}$ obligation is to derive a compatible physical implementation from the underlying assembly history.

A spectral line is still a powerful source identifier, but its received frequency is not only a source property. A supernova light curve is still a powerful standardization channel, but its inferred distance depends on source-branch calibration, endpoint clock rates, and path transport. CMB temperature anisotropy is a reconstructed sky observable, not a direct photograph of metric scale factor; its attribution to an early source state and subsequent transport must be tested in the chosen model.

The source claim is licensed only after the photon record, effective spacetime assumption, and source calibration have been accounted for.

## Why The Lambda-CDM Age Is Not The Same Question

In the standard Lambda-CDM comparison, elapsed cosmic time from the hot expansion history's initial boundary to the present is tied to the expansion integral:

$$
t_0
=
\int_0^\infty
\frac{dz}{(1+z)H(z)}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-d36ffebfb0d45ba0)

This follows by differentiating the cosmological relation $1+z=a(t_0)/a(t)$ at fixed reception epoch, which gives $dz/dt=-(1+z)H(z)$. The infinite upper limit assumes that the fitted history extends to arbitrarily large redshift and that the integral converges. The layer-explicit recovery would use $dt_{\mathrm{eff}}/dz=-1/[(1+z)H_{\mathrm{exp,eff}}(z)]$, where $H_{\mathrm{exp,eff}}=d\ln a_{\mathrm{eff}}/dt_{\mathrm{eff}}$ is a temporal rate. It must be distinguished from the spatial transfer coefficient defined above.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, inserting an arbitrary $H_{\mathrm{eff}}(z)$ into this integral supplies only a formal number with time units. It becomes an observer-era interval only after the differential clock relation, domain, and initial boundary above are recovered. An absolute-time interval additionally needs a derived clock map, such as $dt_{\mathrm{eff}}=A(T)\,dT$ along the declared history, with positive calibrated rate $A(T)$. No such integral assigns a creation time to the Euclidean void.

That is why redshift in $\mathbb{A}\mathbb{A}\mathbb{A}$ does not automatically lead to the same age as Lambda-CDM. Lambda-CDM first says, "this redshift is scale-factor history." $\mathbb{A}\mathbb{A}\mathbb{A}$ first says, "this redshift is a total frequency-transfer ledger." Those are different questions.

If redshift contains endpoint clock-rate terms, source-branch terms, relative-motion terms, and path-history transport terms, then the mapping from $z$ to absolute time is not unique without the native ledger. A recovered 13-14 billion year observer-era scale, if recovered, would have a narrower meaning: it would mark the calibrated history of the photon-accessible effective cosmological state. It would not be a primitive creation time for the Euclidean void, and it would not prove that all Noether sea regions share one global expansion clock.

## Distance Is Also A Ledger

Redshift alone is not distance. Lambda-CDM can treat redshift as distance because the model supplies a global relation between $z$, $H(z)$, and metric distance functions. $\mathbb{A}\mathbb{A}\mathbb{A}$ reconstructs distance after the channel budget is declared.

For positive intrinsic luminosity calibration $L_X(E)$ and received flux $F_X(R)$, integrated over matched spectral bands or consistently converted to bolometric quantities, the observer can define an effective luminosity distance:

$$
d_{L,X}^{\mathrm{eff}}
=
\left(
\frac{L_X(E)}{4\pi F_X(R)}
\right)^{1/2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-9291eb71cf443f52)

This definition uses isotropic emission or a declared isotropic-equivalent luminosity, with compatible energy and clock units. Uncorrected band shifts, absorption, lensing magnification, beaming, or receiver response change the inferred value; they are not automatically a geometric radius. A band-limited measurement needs the source spectrum and the correction for the difference between emitted and received bands.

Standard cosmology distinguishes the background $d_L(z)$ from source and observational corrections. $\mathbb{A}\mathbb{A}\mathbb{A}$ likewise needs a model separating geometry, source branch, Noether sea transport, and endpoint clock comparison before an inferred $d_{L,X}^{\mathrm{eff}}$ can constrain a physical history.

The same caution applies to angular-diameter distance, BAO scales, lensing kernels, and inferred comoving volume. They are not discarded. They become cross-checks on whether one Noether sea state history can recover all effective distance ladders without treating the Euclidean void as expanding.

## Redshift And Distance: A Worked Comparison

A useful first table compares the standard Lambda-CDM luminosity distance with a constant-slope fixed-void benchmark. The Lambda-CDM column uses a flat Planck-like comparison model with $H_0=67.4\ \mathrm{km\,s^{-1}\,Mpc^{-1}}$, $\Omega_m=0.315$, $\Omega_r=9.2\times10^{-5}$, and $\Omega_\Lambda=1-\Omega_m-\Omega_r$. The first two parameters match rounded central values inferred under the base model in Planck 2018; the radiation term and fixed component powers define this simplified comparison, not a reproduction of the full Planck likelihood or neutrino treatment. Distances are in megaparsecs (Mpc), with the observer calibration $c_0/H_0=4447.9593\ \mathrm{Mpc}$. Numerical checks use normalized primitive wake-speed units $c_f=1$; this observer-unit conversion does not identify $c_0$ with $c_f$.

$$
d_L^{\Lambda\mathrm{CDM}}(z)
=
(1+z)c_0
\int_0^z
\frac{dz'}{H_0\left[\Omega_r(1+z')^4+\Omega_m(1+z')^3+\Omega_\Lambda\right]^{1/2}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-72f5db2649607b23)

The $\mathbb{A}\mathbb{A}\mathbb{A}$ column is a conditional benchmark. With endpoint, source, and launch factors set to their calibrated reference values, write $z$ for the remaining propagation redshift. A constant residual slope $H_{\mathrm{eff},0}=H_0$ and zero residual at zero distance give $r_{\mathrm{los}}=(c_0/H_0)\ln(1+z)$. A luminosity distance requires further transport assumptions: isotropic Euclidean beam spreading, no absorption or magnification, received energy per photon reduced by $1+z$, and arrival intervals stretched by $1+z$. Under these assumptions,

$$
d_{L,\mathrm{bench}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(z)
=
(1+z)\frac{c_0}{H_{\mathrm{eff},0}}\ln(1+z).
$$

[View →](../../../../equation-mapping.html#corpus-equation-64b2002e83b09c0e)

The two separate transfer factors give $F=L/[4\pi r_{\mathrm{los}}^2(1+z)^2]$ and hence $d_L=(1+z)r_{\mathrm{los}}$. More generally, if $g_E=E_{\mathrm{emit}}/E_{\mathrm{recv}}$ and $g_t=\Delta\tau_{\mathrm{recv}}/\Delta\tau_{\mathrm{emit}}$ are the energy and arrival-interval ratios in calibrated endpoint units, this beam model gives $d_L=r_{\mathrm{los}}\sqrt{g_Eg_t}$. A frequency shift alone does not establish $g_t=1+z$ or the energy-frequency map. Those remain physical recovery conditions, as does the angular-distance relation needed for a surface-brightness test.

The percent difference is

$$
\Delta_{\%}
=
100\,
\frac{
d_{L,\mathrm{bench}}^{\mathbb{A}\mathbb{A}\mathbb{A}}
-
d_L^{\Lambda\mathrm{CDM}}
}{
d_L^{\Lambda\mathrm{CDM}}
}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-5a58ce43c20eb651)

| Redshift $z$ | Lambda-CDM $d_L$ (Mpc) | $\mathbb{A}\mathbb{A}\mathbb{A}$ benchmark $d_L$ (Mpc) | $\Delta_{\%}$ |
| ---: | ---: | ---: | ---: |
| $0.01$ | $45$ | $45$ | $-0.3\%$ |
| $0.05$ | $231$ | $228$ | $-1.2\%$ |
| $0.10$ | $478$ | $466$ | $-2.3\%$ |
| $0.25$ | $1{,}305$ | $1{,}241$ | $-4.9\%$ |
| $0.50$ | $2{,}927$ | $2{,}705$ | $-7.6\%$ |
| $1$ | $6{,}802$ | $6{,}166$ | $-9.3\%$ |
| $2$ | $15{,}934$ | $14{,}660$ | $-8.0\%$ |
| $3$ | $26{,}018$ | $24{,}665$ | $-5.2\%$ |
| $5$ | $47{,}661$ | $47{,}818$ | $0.3\%$ |
| $10$ | $105{,}922$ | $117{,}323$ | $10.8\%$ |
| $20$ | $229{,}867$ | $284{,}380$ | $23.7\%$ |
| $1100$ | $15{,}266{,}752$ | $34{,}299{,}885$ | $124.7\%$ |

The distances are arithmetic evaluations of the two displayed models, rounded to the nearest Mpc; percentages use the unrounded values. Composite Simpson quadrature in $x=\ln(1+z)$ at 8,192 and 16,384 subintervals reproduces the listed rounding. This checks the numerical comparison, not either physical model. The first rows approach the same local slope, while the middle rows differ nonuniformly. At $z=1100$, the listed $d_L$ is a formal distance-function evaluation, not a direct CMB standard-candle measurement; CMB observations constrain angular scales and spectra through additional source and transport physics.

The intermediate-redshift difference is significant for matching this particular comparison curve: the ratios at $z=0.5$ and $z=1$ give distance-modulus differences $5\log_{10}(d_{L,\mathrm{bench}}/d_L^{\Lambda\mathrm{CDM}})$ of about $-0.17$ and $-0.21$ magnitude. They do not, by themselves, establish statistical rejection by supernova data. That verdict requires the measured sample, uncertainties, covariance, selection, and source calibration. With all other benchmark assumptions fixed, matching this Lambda-CDM curve would require a nonconstant transfer slope; the table alone cannot identify which physical assumption must change.

A physical $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology must calculate the source, clock, transport, beam, and population responses from a common admissible history and test them against the observations. Adjusting a free transfer function to match a chosen distance curve is a fit, not an independent derivation. The table quantifies a difference between specified distance functions; it does not measure the amount or form of Noether sea evolution needed to recover the data.

## Dark-Sector Reclassification

The fixed-void program proposes the following dark-sector mappings. A new accounting decomposition does not establish the physical identifications; each requires a constitutive response and independent observational tests.

| Lambda-CDM object | Standard role | $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation |
| --- | --- | --- |
| $a_{\mathrm{std}}(t)$ | Standard comparison scale factor of the metric universe. | Maps to $a_{\mathrm{eff}}(t_{\mathrm{eff}})$ after the observer-era clock map is declared. |
| $H(z)$ | Temporal expansion rate at cosmological redshift $z$. | A temporal effective rate after a clock/scale map is recovered; the spatial transfer slope alone is insufficient. |
| $\Omega_\Lambda$ | Density fraction of the cosmological constant. | Proposed effective pressure and energy projection of Noether sea state and relaxation history; its constant-density behavior needs recovery. |
| $w(z)$ | Pressure-to-energy-density ratio for dark energy; $w=-1$ for Lambda. | Proposed constitutive response assigned to the effective expansion account, with pressure and energy derived together. |
| Cold dark matter | Collisionless matter component sourcing gravity and growth. | Candidate neutral assemblies and medium response, to be distinguished by lensing, growth, cluster offsets, and matter inventory. |
| Curvature $k$ | Spatial curvature parameter of the metric background. | Effective geometry coefficient in the observer reconstruction, not curvature of the Euclidean void. |
| Cosmic age | Integral over the fitted temporal expansion history. | Conditional observer-era interval requiring the differential clock map and initial boundary; it does not date the Euclidean void. |

The standard dark sector encodes successful gravitational and cosmological inferences, even while the microscopic nature of its components remains open. Reinterpreting the photon record does not remove constraints from galaxy and cluster dynamics, lensing, structure growth, or the CMB. Those observations must distinguish any proposed assembly and medium contributions.

Some components may correspond to real neutral assemblies. Some may be Noether sea response. Some may be source-history or propagation bookkeeping that was forced into a global expansion fit. The task is to sort those contributions without losing the observational successes that made the Lambda-CDM fit powerful.

## Required Recovery Tests

$\mathbb{A}\mathbb{A}\mathbb{A}$ is not free to call every redshift a medium effect. It must recover the constraints that make naive tired-light models fail. In particular, the native ledger must preserve or explain:

- supernova time dilation;
- spectral-line coherence and line-ratio consistency;
- image sharpness over cosmological baselines;
- Tolman surface-brightness scaling, the bolometric $(1+z)^{-4}$ comparison at fixed intrinsic surface luminosity, with source evolution and band corrections modeled;
- the CMB blackbody spectrum and anisotropy structure;
- BAO distance-scale consistency;
- lensing kernels and shear correlations;
- large-scale growth and $S_8$ behavior, where $S_8=\sigma_8\sqrt{\Omega_m/0.3}$ combines matter-density normalization with the amplitude $\sigma_8$ of fluctuations smoothed over the standard $8h^{-1}\,\mathrm{Mpc}$ scale, and $h=H_0/(100\ \mathrm{km\,s^{-1}\,Mpc^{-1}})$;
- primordial abundance constraints;
- source-population evolution across galaxy, quasar, and supernova catalogs.

These tests constrain different parts of the proposed history. A spectral redshift does not establish light-curve stretching, beam-area transport, or thermal-spectrum preservation. Recovery requires joint agreement with the observations within their uncertainties using one compatible history and source and receiver models. Residual channel-dependent line shifts, excessive blurring, incorrect arrival-time stretching, or incompatible distance and growth predictions would falsify the corresponding proposed transport model.

## Summary

Lambda-CDM turns photon redshift into scale-factor history and then uses that history to infer distances, ages, dark-sector densities, and source evolution. $\mathbb{A}\mathbb{A}\mathbb{A}$ keeps the photon record but reopens the implementation.

A received photon-channel packet is not direct source access. It is a transported record whose frequency, phase, polarization, intensity, and arrival profile have passed through a changing Noether sea and a receiver clock environment.

The following chain is a sequence of reconstruction targets. Its last arrow is an inverse problem, not a demonstrated unique recovery of the microscopic history:

$$
\text{photon data}
\to
\text{redshift-distance-source ledger}
\to
\text{effective Lambda-CDM variables}
\to
\text{native Noether sea and assembly history}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-06bc75825ef1607d)

Lambda-CDM supplies a tested effective expansion description. $\mathbb{A}\mathbb{A}\mathbb{A}$ seeks to recover its successful observable predictions through deeper medium, source, and clock histories. A fit to effective variables alone does not prove that such a history exists, is dynamically stable, or is uniquely inferred. The burden is to reproduce the underlying observations with their calibration and uncertainty, rather than require every model-dependent inferred parameter to retain its old interpretation.

## Sources and Comparison Scope

David W. Hogg, *Distance measures in cosmology* (1999, revised 2000), [arXiv:astro-ph/9905116](https://arxiv.org/abs/astro-ph/9905116), sections 3–7 and 10, supplies the standard redshift, distance, band-correction, and lookback-time conventions used for comparison. These are effective metric formulas; they do not derive the fixed-void transport model.

Planck Collaboration, N. Aghanim and collaborators, *Planck 2018 results. VI. Cosmological parameters* (2020), [doi:10.1051/0004-6361/201833910](https://doi.org/10.1051/0004-6361/201833910), [arXiv:1807.06209](https://arxiv.org/abs/1807.06209), supplies the base-model inference context for the rounded $H_0$ and $\Omega_m$ values. The table here remains a simplified arithmetic comparison, not a Planck analysis or an observational fit of $\mathbb{A}\mathbb{A}\mathbb{A}$.
