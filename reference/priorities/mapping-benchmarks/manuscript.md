# Mapping Benchmarks: From Measured Records to Shared Physical Explanations

## 1. What a benchmark can establish

### 1.1. Observations, equations, and mechanisms

A benchmark is a specified comparison whose outcome can contradict a proposed explanation. It can be an experiment, an astronomical observation, or a solved mathematical case. Those three forms supply different evidence. A clock comparison measures a frequency ratio through an apparatus; a reconstructed astronomical image depends on a source and instrument model; an exact mathematical solution checks a calculation under stated assumptions. Agreement with one does not automatically establish agreement with the others.

The benchmark program for $\mathbb{A}\mathbb{A}\mathbb{A}$ asks how one physical description can reproduce the tested behavior summarized by relativity, quantum theory, electromagnetic theory, and statistical physics. It separates the measured record, the effective equation describing that record, and the interpretation attached to the equation. The first two constrain a recovery argument. An inherited interpretation becomes a premise only if an independent argument establishes that it belongs at the level being studied.

An architrino is a primitive constituent carrying one of two polarities and following a trajectory in the Euclidean void, the theory's fixed three-dimensional spatial background. Absolute time, denoted by $T$, orders those trajectories. An assembly is an organized collection of constituents. A wake is the outward-propagating causal structure emitted along a constituent's past trajectory; the path history records which emissions can reach a receiver. The master equation assigns acceleration directly from those arriving contributions. It does not start with primitive mass, a magnetic force, quantum probabilities, or a curved spacetime background. The Noether sea is the ambient population of Noether braid assemblies whose collective response must supply the effective environment seen by matter and signals.

The distinction matters because a successful observer-level formula is often easiest to reproduce by inserting it into the microscopic calculation. That procedure tests an implementation of the formula. Physical recovery requires the formula to arise from the admitted histories, assembly dynamics, collective response, and observation map. The shared [mapping method](../mapping/contracts/mapping-method.md#bidirectional-mapping-and-mathematical-reframing) therefore works in both directions: observations restrict possible constructions, while the construction must independently produce the quantities being compared.

### 1.2. One record and several projections

Let $\Theta$ denote a declared physical record containing assembly states, causal roots, wake histories, medium state, boundary exchanges, and relevant detector information. A causal root is a past emission instant whose wake reaches a specified receiver at the observation instant. Its associated Jacobian records how emission and reception times change along that arrival branch. These histories matter because present positions alone generally do not determine delayed interactions.

For benchmark $b$, let $\Pi_b$ convert the physical record into the comparison variables. Let $\mathcal R_b$ measure their disagreement with the independently specified reference, $\epsilon_b$ be its allowed tolerance, and $\mathcal G_b$ collect the source, identity, conservation-account, and evidence conditions. The method defines

$$
\mathfrak A_b(\epsilon_b)=\left\{\Theta:\mathcal R_b[\Pi_b(\Theta)]\le\epsilon_b,\quad\mathcal G_b(\Theta)=1\right\},\qquad
\mathfrak A_D=\bigcap_{b\in\mathcal B_D}\mathfrak A_b(\epsilon_b)
$$

The set $\mathcal B_D$ contains the comparisons required for a declared domain. Its intersection contains records that satisfy all those comparisons together. Separate best fits do not establish that the intersection is nonempty: a clock fit and a lensing fit can each succeed while requiring incompatible medium parameters. Conversely, a nonempty intersection establishes compatibility at the stated tolerance; it does not prove that the underlying assembly exists dynamically, remains stable, or uniquely describes nature.

This is an inferred organization of the recovery problem, rather than a physical law. Its practical falsifier is a pair of required projections that cannot be obtained from the same record without changing a coefficient, source identity, boundary condition, or detector rule separately for each observable. A retained record means a record supported at its owner's declared acceptance level; naming a tuple does not supply that evidence.

### 1.3. Coordinates, speeds, and present evidential reach

Native trajectories use $T$ and $\mathbf X$. Effective observer coordinates use $t_{\mathrm{eff}}$ and $\mathbf x_{\mathrm{eff}}$. The clock readout $\tau$ is produced by a physical clock. A relation between these coordinates is itself part of the recovery problem. Numerical substrate examples use $c_f=1$, where $c_f$ is the primitive wake speed. The photon-channel speed $c_\gamma$ and asymptotic effective signal speed $c_0$ retain their separate meanings; normalization does not prove their equality to $c_f$.

The developed benchmark specifications below contain several useful conditional calculations, constraints, and falsifiers. They contain no accepted end-to-end physical recovery of the whole suite. The finite-height optical-clock case has a complete source-bound specification, but its physical prediction is unevaluated because the required clock, medium, and transfer histories are missing. Other cases require their own accepted carriers. The [coverage record](analysis/manuscript-source-coverage.md) preserves source reading, contradictions, historical status, and review limits outside the scientific exposition.

## 2. Clock comparisons and the meaning of a tick

### 2.1. A finite-height optical-clock measurement

A clock measures accumulated repetitions of a physical process. Changing its environment can change that process while leaving the parameter that orders the underlying evolution unchanged. Gravitational redshift therefore provides a direct test of the connection between assembly dynamics and an operational clock rate.

Chou, Hume, Rosenband, and Wineland compared two aluminum-ion optical clocks through a 75 m phase-stabilized fiber. One clock was raised by 33 cm after starting 17 cm below the other. About 100,000 s of lower-position data and 40,000 s of raised-position data gave a fractional-frequency change of $(4.1\pm1.6)\times10^{-17}$. These are measured apparatus quantities, not a microscopic prediction. The paper's stated near-laboratory comparison slope, approximately $1.1\times10^{-16}$ per meter, gives $3.63\times10^{-17}$ for that displacement, a difference of about $0.29$ reported standard uncertainties. The height inferred from the clock shift was $37\pm15$ cm. These historical values are supported by the paper's height-comparison passage and Figure 3 in [*Optical Clocks and Relativity*](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=905055), *Science* 329 (2010), DOI 10.1126/science.1192720.

The benchmark's value is the combination of a small controlled displacement, independent survey, two clock histories, and a transfer link. An explanation must predict the changed ratio and demonstrate that an unmeasured fiber or receiver contribution has not absorbed a wrong clock shift.

### 2.2. Cadence stretch and clock rate are reciprocal

For a representative Noether sea cadence $\Omega_N$, define its period $P_N=2\pi/\Omega_N$ and compare it with a reference period $P_{N0}$. The cadence-stretch factor and rate factor are

$$
\Gamma_N=\frac{P_N}{P_{N0}}=\frac{\Omega_{N0}}{\Omega_N},\qquad
C_N=\frac{\Omega_N}{\Omega_{N0}}=\Gamma_N^{-1}
$$

A larger period means fewer ticks per unit absolute time. This reciprocal relation is derived from the definitions. It does not show that a material clock follows the representative sea cadence. For a particular clock assembly $\mathcal A$, the remaining mismatch is

$$
\Delta_{\mathrm{clk\text{-}sea},\mathcal A}
=\ln\!\left(\frac{\Omega_{\mathcal A}}{\Omega_{\mathcal A}^{(0)}}\right)-\ln C_N
$$

Here $\Omega_{\mathcal A}^{(0)}$ is that assembly's reference tick rate. The sea factor can replace the material clock factor only when this mismatch is bounded independently for the clock and environment being used. The [clock account](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md#noether-sea-braid-cadence) makes that condition explicit. A mismatch cannot be hidden in a propagation correction merely because both change the final measured frequency.

### 2.3. The source-bound comparison

Let $H$ and $L$ label the raised and lower configurations. The modeled logarithmic change in clock ratio is

$$
y_{\mathbb{A}\mathbb{A}\mathbb{A}}
=\left[\ln\frac{\nu_{\mathrm{AlMg}}}{\nu_{\mathrm{AlBe}}}\right]_H
-\left[\ln\frac{\nu_{\mathrm{AlMg}}}{\nu_{\mathrm{AlBe}}}\right]_L
=\Delta\ln C_N+\Delta\ln Y_{\mathrm{fiber}}+\Delta\ln D_{\mathrm{recv}}+\mathcal R_{\mathrm{unresolved}}
$$

The first term is the endpoint clock contribution after the clock-to-sea mismatch is exposed. The next two describe transfer through the fiber and receiver response; the final term contains unresolved contributions. At the tiny fractional shifts of this case, the logarithmic ratio agrees with the fractional-frequency comparison to the stated measurement precision. Every term must come from the same two apparatus configurations and measurement windows.

The [clock specification](analysis/gravitational-redshift-clock-tests.md#prediction-and-acceptance-residual) defines

$$
r_{\mathrm{NIST}}=\frac{y_{\mathbb{A}\mathbb{A}\mathbb{A}}-4.1\times10^{-17}}{1.6\times10^{-17}}
$$

Its predeclared comparison envelope is $|r_{\mathrm{NIST}}|\le2$, accompanied by the observed raised-clock sign, a null matched zero-height control, sign reversal on exchanging the configurations, and independently bounded transfer and receiver terms. The two-uncertainty envelope is specific to this packet. It is not a universal test of sufficient evidence.

The physical result remains blocked on missing native clock and transport records. Neither $y_{\mathbb{A}\mathbb{A}\mathbb{A}}$ nor $r_{\mathrm{NIST}}$ has been evaluated from an accepted carrier. A fitted environmental clock factor would not remove that blocker, because it would leave the assembly, transfer, and receiver mechanism untested.

## 3. Inertial motion, rotation, and moving materials

### 3.1. Why three Lorentz comparisons are needed

Lorentz behavior is the observer-level relationship among moving clocks, rulers, and signals. In the standard comparison, the Lorentz factor is $\gamma=(1-\beta^2)^{-1/2}$ for $\beta=v/c$. In a physical recovery calculation the ratio must identify its channel, for example $\beta_\gamma=v/c_\gamma$. The square-root law is a target until a moving assembly and its signal channel produce it.

Michelson–Morley comparisons constrain the orientation dependence of round-trip signal measurements. Kennedy–Thorndike comparisons test their dependence on laboratory motion, and Ives–Stilwell comparisons constrain moving-clock frequency behavior. The [Lorentz suite](analysis/lorentz-invariance-test-suite.md) uses Robertson–Mansouri–Sexl comparison offsets $\bar\alpha,\bar\beta,\bar\delta$, which vanish in the special-relativistic limit. Its three combinations are

$$
R_{\mathrm{IS}}=\bar\alpha,\qquad R_{\mathrm{KT}}=\bar\beta-\bar\alpha,\qquad R_{\mathrm{MM}}=\bar\delta-\bar\beta
$$

These comparisons prevent a deformation chosen to hide one optical anisotropy from being counted as a full recovery of moving clocks and rulers. All three residuals must be small on the same moving-assembly record.

A round-trip measurement is also different from a one-way speed assignment. A one-way assignment requires synchronized separated clocks, and the physical implementation of that synchronization belongs in the record. A conditional calculation can show that assumed longitudinal contraction and assumed clock slowing make a moving clock record the expected round-trip duration. It does not derive those assumptions or prove that the assembly relaxes to the contracted state. The existing contraction-selection argument has precisely that boundary: a compatible axial law has been selected within a specified closed-return comparison, while dynamical attraction and shared clock/ruler/signal recovery remain open.

### 3.2. Residuals must remain visible by channel

For a closed-path period $P_{\circlearrowleft}$ measured by one physical clock, define

$$
\Delta_{\mathrm{tw}}(\beta_\gamma,\hat{\mathbf n})
=\frac{P_{\circlearrowleft}(\beta_\gamma,\hat{\mathbf n})-\langle P_{\circlearrowleft}(\beta_\gamma,\hat{\mathbf n})\rangle_{\hat{\mathbf n}}}{\langle P_{\circlearrowleft}(\beta_\gamma,\hat{\mathbf n})\rangle_{\hat{\mathbf n}}}
$$

The direction $\hat{\mathbf n}$ sets the apparatus orientation; the average is over the declared orientation sample. A tolerance must be tied to the selected cavity or clock experiment. It cannot be borrowed indiscriminately from a bound on a different coefficient or unit system.

Matter-clock orientation effects, daily and annual modulation, photon dispersion and polarization splitting, weak-field preferred-frame terms, Bell record ordering, and gravitational-wave/photon speed differences add independent observable rows. A single small summary number can conceal a failed row. The coefficient tables in the source packet are historical comparison targets whose experiment, frame, units, and expansion order must be re-established for any execution. The stronger proposed test is whether one medium response predicts a correlated pattern among those coefficients, rather than assigning one free parameter to each null experiment.

### 3.3. Rotation and material transport

The [Sagnac effect](analysis/sagnac-effect.md) compares two beams traveling in opposite directions around a rotating loop. In the leading observer-level limit,

$$
\Delta t_{\mathrm{eff}}=\frac{4\boldsymbol\Omega\cdot\mathbf A_{\mathrm{loop}}}{c_\gamma^2},\qquad \Delta\phi=\omega\Delta t_{\mathrm{eff}}
$$

The angular velocity $\boldsymbol\Omega$, oriented enclosed area $\mathbf A_{\mathrm{loop}}$, and measured angular frequency $\omega$ determine the comparison. The receiver changes position during the two traversals, so rotation produces a path-history difference. Recovering that area law does not permit an otherwise forbidden dependence on uniform inertial motion. Both beams still require tracked histories, and their signal-speed convention must agree with the inertial suite.

The [Fizeau comparison](analysis/fizeau-moving-medium.md) instead concerns propagation through moving material. Let $\chi_{\gamma,\mathrm{mat}}=c_0/c_{\gamma,\mathrm{mat}}$ be its rest-frame optical delay factor and $v_{\mathrm{mat}}$ the material speed along propagation. The low-speed effective target is

$$
u_{\gamma,\mathrm{obs}}\approx\frac{c_0}{\chi_{\gamma,\mathrm{mat}}}+v_{\mathrm{mat}}\left(1-\chi_{\gamma,\mathrm{mat}}^{-2}\right)
$$

This translates the conventional Fresnel coefficient into a notation that does not confuse optical refractive index with normalized Noether braid density $n$. Its physical derivation needs the material rest-frame propagation law, the observer velocity map, and recoil, heating, dispersion, and boundary exchange. It supplies no premise that the Noether sea is mechanically dragged by matter.

## 4. One weak-field geometry and its deformation candidates

### 4.1. Clocks, paths, and orbits constrain different parts

An effective metric summarizes the measured relation among time intervals, spatial distances, and propagation. A lapse describes clock-rate scaling; a drift describes motion of the effective chart relative to its medium; spatial compliance describes how physical rulers and distances respond. A scalar delay alone cannot determine all those components.

For a static weak-field comparison, let $\Phi_{\mathrm{eff}}<0$ be the attractive effective potential and $\gamma_{\mathrm{PPN}}$ the parameter measuring the spatial response relative to the time response. A standard comparison written in observer coordinates is

$$
ds_{\mathrm{eff}}^2=-\left(1+\frac{2\Phi_{\mathrm{eff}}}{c_0^2}\right)c_0^2dt_{\mathrm{eff}}^2
+\left(1-\frac{2\gamma_{\mathrm{PPN}}\Phi_{\mathrm{eff}}}{c_0^2}\right)d\ell_{\mathrm{eff}}^2
$$

Only first-order weak-potential terms are retained. This is an effective recovery target. Scott Hughes's [MIT 8.962 Lecture 14, equation 14.39](https://web.mit.edu/sahughes/www/8.962/lec14.pdf) gives the general-relativistic specialization with matching temporal and spatial potential coefficients. It does not derive an Architrino medium response.

Setting the line element to zero and expanding its square root gives the derived comparison delay factor

$$
\bar\chi_{\mathrm{sea}}=\frac{c_0}{c_{\mathrm{eff}}}\approx1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_{\mathrm{eff}}}{c_0^2},\qquad
\Delta t_{\mathrm{eff}}=\frac1{c_0}\int_{\Gamma_0}(\bar\chi_{\mathrm{sea}}-1)\,ds_{\mathrm{eff}}
$$

The path $\Gamma_0$ is the declared comparison ray and $c_{\mathrm{eff}}$ its local effective speed. The subtraction removes the far-field baseline. This conditional algebra connects the [Shapiro delay](analysis/shapiro-time-delay.md) to [lensing](analysis/gravitational-lensing.md): the same spatially varying optical path controls both travel time and bending. The actual one-way or round-trip path and endpoints determine the numerical prefactor of a Shapiro comparison.

### 4.2. A point-mass check exposes a source inconsistency

The lensing source's displayed gradient integral contains an extra factor of two relative to its own stated point-mass limit. The issue can be checked without a simulation. On a straight comparison ray with longitudinal coordinate $s$ and impact parameter $b>0$, take $\Phi_{\mathrm{eff}}=-GM/\sqrt{b^2+s^2}$. Then

$$
\int_{-\infty}^{\infty}\partial_b\Phi_{\mathrm{eff}}\,ds
=GM\int_{-\infty}^{\infty}\frac{b\,ds}{(b^2+s^2)^{3/2}}=\frac{2GM}{b}
$$

Here $G$ and $M$ belong to the point-mass comparison, not primitive architrino properties. The optical-path equation therefore gives bending magnitude $2(1+\gamma_{\mathrm{PPN}})GM/(bc_0^2)$, which becomes $4GM/(bc_0^2)$ when $\gamma_{\mathrm{PPN}}=1$. Retaining the source's additional factor would give twice that magnitude. This is a derived normalization check under the stated weak-field assumptions; a different declared potential normalization or integration path would require a new comparison. The original source is preserved and the conflicting equation is not used as an accepted result.

Shear, the directional distortion of an image, and convergence, its focusing, involve transverse second derivatives of that same potential. Lensing time delays must use it too. A source model cannot insert a separate unseen mass distribution solely to repair one optical output while leaving the exposed assembly response and dynamical mass map unrelated.

The [perihelion comparison](analysis/perihelion-precession.md) adds orbital phase. Its leading general-relativistic target is $\Delta\varpi=6\pi GM/[a(1-e^2)c_0^2]$ per orbit, with semi-major axis $a$ and eccentricity $e$. It tests further weak-field coefficients and long-term phase consistency. Dissipative drag that happens to move the perihelion is not a substitute for the conservative effective orbital behavior being compared.

### 4.3. What shape and scale do, and do not, explain

The [deformation proposal](analysis/effective-metric-deformation.md) separates the envelope ratio $\xi=R_\parallel/R_\perp$ from scale $\lambda=R_\perp/R_{\perp,0}$. A change in shape, a change in size, number density, and orientation distribution can affect different signal and clock projections. Keeping those variables distinct is useful. Their constitutive relationships and their identification with a full metric remain guessed or conditional.

The proposed microscopic sequence runs from approximately spherical assemblies through oblate shapes toward a planar limit, accompanied by size changes. Its suggested clock estimate is $P_{\mathrm{core}}\sim R_\perp f(\xi)/c_f$, where $f$ is an unspecified geometric factor. Even this estimate does not fix a clock law until the returning motion and its cadence are demonstrated. A normalized tick rate scales as $P_0/P_{\mathrm{core}}$, not as the period itself. The source's inverse-frequency expression for a proper-time rate conflicts with that operational definition and cannot support a redshift conclusion.

Kerr coordinates, rotating-fluid ellipsoids, optical-metric templates, and the Petrov classification are proposed comparison tools in the source. Coordinates and the algebraic classification of curvature do not prove a universal material deformation sequence. In particular, no derivation here connects a proposed sphere–oblate–plane sequence to a sequence of Petrov types. Nor do the proposed simultaneous planar and minimum-size limits establish horizon formation, photon formation, or a cosmological expansion law. Those claims require actual geometry, dynamics, and observer projections; the analogies cannot supply them.

The associated pro/anti population proposal also remains open. Its useful questions concern an explicit exchange law, bounded relaxation of population imbalance, and whether a suggested two-plus-two assembly cluster is a stable or metastable arrangement. Visual symmetry supplies no energy minimum. These candidate mechanisms retain a place in the account precisely as alternatives to be derived and distinguished by observables.

### 4.4. Conditional coefficient reduction

The clock and cosmology sources provide a more controlled weak-field statement. Let the first-order static responses of $\ln n$, $\ln\chi_{\mathrm{sea}}$, $\ln\lambda$, and the logarithmic representative braid radius be $a_n,a_\chi,a_\lambda,a_R$ times $U/c_0^2$, with $U=-\Phi_{\mathrm{eff}}>0$. Let $b_n,b_\chi,b_\lambda,b_R$ map those responses into $\ln\Gamma_N$. The endpoint clock target fixes only

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1
$$

One observed clock law fixes a combination, not four separate response mechanisms. Identifying the clock delay with the signal delay additionally requires $a_\chi=1+\gamma_{\mathrm{PPN}}$ under the shared-channel assumptions. A minimal specialization assigns the response entirely to this delay channel, giving $b_\chi=(1+\gamma_{\mathrm{PPN}})^{-1}$ and zero contributions from the other three coordinates. The more general compensated family remains

$$
b_\chi=\frac{1-b_n a_n-b_\lambda a_\lambda-b_R a_R}{1+\gamma_{\mathrm{PPN}}}
$$

These are conditional algebraic constraints, not measured coefficients or a proof that density and radius responses vanish. Inverse clock-rate consistency, pressure response, hydrogen spectral conversion, and shared path delay can further constrain the family. Their retained physical input is still required.

## 5. Cosmological transfer without expanding the substrate

### 5.1. Separating emission, endpoints, launch, and path

Cosmological redshift compares an observed spectral frequency with a source transition reference. An effective scale factor $a(t_{\mathrm{eff}})$ summarizes this comparison in standard cosmology. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the Euclidean void remains fixed; any recovered scale-factor description must arise from medium evolution, source behavior, path transport, and physical clock comparison.

The [redshift and distance-ladder source](analysis/cosmological-redshift-distance-ladder.md) develops a candidate factorization for spectral family $X$:

$$
1+z_X\approx\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\frac{\exp Y_{X,E\to R}}{B_X(E)D_v}
$$

The subscripts $E$ and $R$ identify emission and reception. $B_X$ records a real change in the source transition; $D_v$ is directional phase compression from relative motion; $Y$ is logarithmic path stretching. The endpoint sea factors can stand for material clocks only after the mismatch in Section 2.2 is bounded. Thus this expression is a closure target with explicit conditions, not a general identity that excludes propagation or source effects by definition.

Taking logarithms yields a useful additive accounting rule. The endpoint-subtracted quantity

$$
Z_{\mathrm{prop},X}=\ln(1+z_X)-\ln\Gamma_{N,E}+\ln\Gamma_{N,R}+\ln B_X(E)+\ln D_v
$$

equals $Y_{X,E\to R}$ within the factorization's residual. Splitting the route into source environment, intervening regions, lens or plasma regions, and receiver environment gives $Y=\sum_sY_s$, with $Y_s=\int_{\gamma_s}\alpha_{\mathrm{prop},X}\,ds$. The coefficient $\alpha_{\mathrm{prop},X}$ is a path-rate functional to derive. A sum over segments is bookkeeping; it does not demonstrate a physical cause of redshift.

The source and photon energy account must remain visible when an observer reports $E_{\mathrm{obs}}=h\nu_{\mathrm{obs}}$. The effective action scale $h$ is part of the recovery interface, not a newly installed architrino-level quantization rule. Relative-motion, endpoint, and long-path cases must use one extraction law with different physical input records, rather than different explanatory mechanisms selected after fitting the data.

### 5.2. The cadence-transport hypothesis

The source proposes a distribution $f_N(\nu,\mathbf X,T)$ over local braid cadence states. A cadence-space current $J_\nu$ describes movement of the population between those states, while a spatial velocity $\mathbf u_{\mathrm{sea}}$ transports the population through the void. Its provisional continuity form is

$$
\partial_T f_N+\nabla_{\mathbf X}\cdot(\mathbf u_{\mathrm{sea}}f_N)+\partial_\nu J_\nu
=S_{\mathrm{BH}}+S_{\mathrm{GW}}-R_{\mathrm{eq}}[f_N]
$$

The right side names proposed strong-field loading, gravitational-wave perturbation, and neighbor-equilibration terms. These are guessed constitutive components whose identities and conservation accounts must be derived. The source's proposed discrete action transactions and cadence/scale retuning map are likewise hypotheses requiring accepted branch transitions; they are not permission to assume $h$-sized microscopic steps.

This hypothesis has a substantive negative test. If coarse-graining gives zero signed cadence current, or the loading and equilibration cancel without producing the required propagation term, local equilibration alone supplies no expansion-like redshift slope. A discrete branch change also cannot be relabeled smooth single-core drift when the candidate transition is inadmissible. The failed transition or rejected branch belongs in the record.

The path-rate proposal must consume the continuity-balanced combination $(S_{\mathrm{BH}}+S_{\mathrm{GW}}-R_{\mathrm{eq}}-\partial_\nu J_\nu)/(f_N+\epsilon_f)$ together with declared gradient, flow-divergence, and anisotropic response terms. The small positive $\epsilon_f$ regularizes that diagnostic's denominator; it supplies no physical population. Treating these terms as independent fitting knobs would break the relation to one evolving medium.

### 5.3. The distance ladder is a joint comparison

Luminosity distance $D_L$ is inferred from calibrated emitted and received brightness. Angular-diameter distance $D_A$ relates a transverse physical scale to an angle. Baryon acoustic oscillation comparisons use an inferred acoustic scale $r_d$ and distances such as $D_M=(1+z)D_A$, $D_H=c_0/H$, and $D_V=(zD_M^2D_H)^{1/3}$. These remain effective comparison quantities. Recovering a fitted Hubble slope alone does not recover their relationship.

Supernova calibration, source evolution, peculiar motion, dust, selection, and instrument response must remain distinct from the physical redshift factors. A candidate must recover the relation between light-curve duration and spectral redshift, preserve image sharpness, and test distance duality $D_L=(1+z)^2D_A$ in its declared transparent regime. Generic scattering-loss explanations that blur images or fail duration stretching do not satisfy that comparison.

The cosmic microwave background adds its thermal spectrum, acoustic angular scale, polarization, damping, and lensing. Large-scale growth adds clustering spectra and the rate at which structure develops. CMB lensing appears in both descriptions and must agree on their overlap. Quasar counts require luminosity functions, classification, obscuration, survey selection, lensing, and source evolution before they can constrain a distance map. A count histogram alone cannot select a cosmological ontology.

Directional and frequency-dependent residuals are equally necessary. A dipole cannot be hidden in an isotropic Hubble parameter, and a band-dependent transport error cannot be absorbed into source calibration without evidence. The same medium record must also produce nearby matter-assembly cadence and growth projections; photon redshift and matter evolution cannot be fitted from different restrictions of the universe history. The proposed dark-energy transfer coefficients, static response scans, and cadence-retuning tools remain conditional diagnostics described in the source, not physical measurements reproduced by this manuscript.

## 6. Radiation, compact binaries, and what a detector records

### 6.1. One loss account from pulsar timing to wave strain

[Binary pulsar timing](analysis/binary-pulsar-orbital-decay.md) compares an orbital-period derivative with a radiation model after proper-motion and Galactic-acceleration corrections. A pulsar is a periodically emitting rotating star; its pulse arrival times allow orbital behavior to be inferred. The comparison therefore combines source motion, clock behavior, propagation, and timing reconstruction. It does not directly measure a microscopic loss mechanism.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, orbital energy and angular-momentum changes must appear in an account including emitted disturbances, medium change, recoil, and remnants. The slow-motion limit of that radiation account must agree with the account used for directly detected compact-binary waves. Separate radiation coefficients for the timing and waveform cases would fail the proposed shared explanation.

### 6.2. Propagating strain, tidal response, and energy

[Gravitational-wave benchmarks](analysis/gravitational-waves.md) concern an effective propagating disturbance, not a ripple of the fixed Euclidean void. In the linear weak-wave comparison, the transverse-traceless strain $h_{ij}^{TT}$ is the part perpendicular to propagation with its trace removed. It isolates the two tensor deformation channels relevant to the standard radiation target. With effective source quadrupole $I_{ij}$ and source distance $R$, the target relations include

$$
h_{ij}^{TT,\mathrm{bench}}=\frac{2G_{\mathrm{eff}}}{Rc_0^4}P_{ij,kl}^{TT}\frac{d^2 I_{kl}}{dt_{\mathrm{eff}}^2},\qquad
P_{\mathrm{quad}}^{\mathrm{bench}}=\frac{G_{\mathrm{eff}}}{5c_0^5}\left\langle\frac{d^3 I_{ij}}{dt_{\mathrm{eff}}^3}\frac{d^3 I_{ij}}{dt_{\mathrm{eff}}^3}\right\rangle
$$

The projector $P^{TT}$ removes the nonradiative components. The brackets denote a declared scale-separated average. These formulas are inherited comparison equations in observer time; they are not the source law of the Noether sea. A proposed recovery must derive the delayed source map, detector response, and quadratic flux from its physical record.

The detector responds to relative tidal motion. For detector separation $Y^i$, the weak-wave comparison is $d^2Y^i/dt_{\mathrm{eff}}^2=(1/2)(d^2h_{ij}^{TT}/dt_{\mathrm{eff}}^2)Y^j$. Coordinate motion alone does not establish strain. Likewise, wave energy requires a separation between wavelength and background variation, plus a finite averaging region; labeling every metric perturbation as radiated energy would include gauge artifacts.

The source record stages public compact-binary examples and their strain, phase, energy, angular-momentum, sky-position, timing, and provenance residuals. It explicitly describes them as document-level manifests, with no downloaded artifact set or replayed residual. Waveform parameters reconstructed using a standard model are useful comparisons but are not an independent direct measurement of every inferred source quantity. Model choice, whitening, calibration, data-quality masks, and posterior uncertainty remain part of the experiment.

### 6.3. Multimessenger timing and apparatus limits

A photon/gravitational-wave arrival offset contains both propagation and intrinsic emission delay. A speed comparison is therefore conditional on a bounded source-lag model; setting the source lag to zero without evidence can manufacture a false propagation result. The source packet's distance-normalized timing expression is an effective comparison diagnostic, requiring the event's distance convention and uncertainty treatment. It does not identify primitive $c_f$ with either observed channel.

The same caution applies to idealized measurement compensation. A thought experiment that cancels detector recoil must provide an admitted apparatus energy and momentum account. A negative-mass compensator invoked in a comparison argument cannot become an Architrino assembly by notation. This boundary preserves the question about measurement limitations without importing its hypothetical apparatus into the substrate.

## 7. Statistical access, entropy, and temperature

### 7.1. What is being counted

Entropy is not one interchangeable quantity. Thermodynamic entropy relates reversible heat exchange to temperature; Boltzmann entropy counts states compatible with a macrostate; Gibbs or Shannon entropy measures a probability distribution; von Neumann entropy applies to a quantum density operator. Each requires its own state description and licensed process class. The [entropy analysis](analysis/entropy.md) preserves those distinctions before proposing a common physical origin.

For a coarse-graining $\mathcal Q$, which declares retained and forgotten variables, and an access region $W(T)$, a proposed state-count entropy is

$$
S_{\mathcal Q,W}=k_B\ln\mu(\Gamma_{\mathcal Q,W})
$$

The set $\Gamma_{\mathcal Q,W}$ contains histories compatible with the observed record, admissible wakes, the event account, and boundary conditions. The measure $\mu$ must have a declared dimensionless normalization before its logarithm is taken. Its existence and physical appropriateness remain closure obligations. Complete deterministic history and coarse-grained statistical entropy describe different levels.

A finite-region balance must distinguish production, outward entropy flux, and approximation error:

$$
\frac{dS_{\mathcal Q,W}}{dT}=\sigma_W-\int_{\partial W}\mathbf J_S\cdot\hat{\mathbf n}\,dA+\mathcal R_{\mathcal Q}
$$

The source proposes $\sigma_W$ for unresolved mixing, thermalization, and record formation, $\mathbf J_S$ for exchange across the boundary, and $\mathcal R_{\mathcal Q}$ for coarse-graining error. For a moving boundary, the flux convention must include transport relative to that boundary. Positivity of production in a claimed dissipative regime must be derived there; it does not follow merely from writing the balance.

### 7.2. Records and horizon comparisons

A durable measurement record occupies an apparatus state that persists over a stated duration. The entropy source proposes a positive apparatus-plus-environment entropy change as a diagnostic of that locking. This is a proposed property of a class of recording devices, not a new collapse law. Cyclic memory reset must export the displaced alternatives into an environment or consume a finite prepared memory resource; information is not a cost-free external controller.

Horizon entropy poses a different counting problem. The source proposes admissible labels on horizon-interface assemblies, constrained by total effective energy, angular momentum, polarity, and local compatibility. The global state count must be related to area through large connected blocks, not inferred from one patch. If $s_{\mathrm{align}}^H$ is the limiting logarithmic label count per patch and $a_H$ is the limiting area per patch in alignment-area units, the comparison target is

$$
\frac{s_{\mathrm{align}}^H}{a_H}\longrightarrow\frac14
$$

Boundary corrections must vanish in the limit. Counting the labels, deriving the coefficient, and connecting outgoing release channels remain open. Minimal-surface entropy comparisons also require a distinction between an access-region boundary and an actual horizon: only the source's limit in which the comparison surface wraps the horizon supports the thermal horizon specialization. General minimal-surface or Page-curve ideas are comparison tools or conditional consistency targets, not independent substrate axioms.

### 7.3. When a temperature exists

[Temperature](analysis/temperature.md) requires an ensemble and a stable energy/entropy or distributional relation. With physical entropy units,

$$
\frac1{T_{\mathrm{ens}}}=\left(\frac{\partial S_{\mathrm{ens}}}{\partial E_{\mathrm{ens}}}\right)_{\mathcal N,\mathcal V}
$$

The subscripted temperature is distinct from absolute time $T$; $\mathcal N$ and $\mathcal V$ name the fixed inventory and volume-like variables. If entropy is instead dimensionless, $s=S/k_B$, its derivative is $1/(k_BT_{\mathrm{ens}})$. Mixing these conventions introduces a spurious factor of $k_B$.

A kinetic temperature can describe the width of a thermalized distribution. It cannot be assigned to a single excited braid simply from its internal energy. The useful nonequilibrium test compares coupling time with cooling time, $\mathcal R_{\mathrm{LTE}}=\tau_{\mathrm{couple}}/\tau_{\mathrm{cool}}$. When coupling is not fast relative to change, additional distributional variables are needed instead of one scalar temperature.

Stored configuration energy, accessible kinetic width, a photon-bath spectrum, and a medium emissive temperature are separate records. This remains true in a high-energy reaction stage or a packed compact interior. A narrow accessible distribution does not prove zero total entropy or a unique microstate. A root-mean-square wake-loading coordinate can describe excitation or constitutive response, but it is not a Kelvin thermometer without an ensemble bridge. Deriving an energy–temperature conversion therefore belongs to collective statistical dynamics, not to primitive mass or heat assigned to an architrino.

## 8. Thermal radiation and finite electromagnetic corrections

### 8.1. A spectrum requires modes and occupations

[Blackbody radiation](analysis/blackbody-radiation.md) is the equilibrium photon spectrum. In the comparison limit, the energy density per frequency is the product of energy per photon, mode density, and mean occupation:

$$
u_\nu=h\nu\,g_\gamma(\nu)\bar n_\gamma(\nu),\qquad
g_\gamma(\nu)\to\frac{8\pi\nu^2}{c_\gamma^3},\qquad
\frac{\bar n_\gamma}{1+\bar n_\gamma}\to e^{-h\nu/(k_BT_{\mathrm{ens}})}
$$

The last relation yields $\bar n_\gamma=[e^{h\nu/(k_BT_{\mathrm{ens}})}-1]^{-1}$ by algebra. Its physical origin remains the difficult part: the source requires admissible photon assemblies, transverse polarization, emission and capture, an ensemble measure, detailed balance, and zero effective photon chemical potential. The photon candidate is a coaxial contra-rotating polarity-conjugate planar pair, meaning two planar components sharing an axis, rotating oppositely, and exchanged by polarity conjugation. The named photon requirements separate its kinematics, polarization, and emission/capture behavior. This benchmark does not establish those requirements merely by naming the candidate.

Removing a high-frequency divergence by an arbitrary cutoff would not recover the spectrum. Nor does detailed balance in an unspecified rate system by itself establish the required occupation ratio. The rates, allowed modes, and population factors must produce that ratio together. A cosmic application further needs large thermalization depth before decoupling and sufficiently weak later coupling to preserve anisotropy and polarization.

### 8.2. Peaks, high occupation, and the binary precursor

The frequency and wavelength peaks test different density representations. For $x=h\nu/(k_BT_{\mathrm{ens}})$, differentiating the Planck frequency density gives the stationarity equation $3(1-e^{-x})=x$, whose positive peak is near $2.821439$. Transforming density with its Jacobian to wavelength gives $5(1-e^{-x})=x$ and a peak near $4.965114$. Thus the wavelength of the frequency peak is not the wavelength-density peak. This derived comparison explains why a qualitative hump or a tuned peak location is insufficient.

Large occupation also requires geometric, phase, and material-response capacity in the same photon carrier. The source's factorized headroom estimate separates those contributions as a proposed diagnostic. It must not be mistaken for a derived unlimited Bose occupation law, or for a universal hard cap before the factors are calculated. Pair formation, scattering, or medium loading at high preparation strength must preserve the weak thermal regime where the comparison applies.

The proposed opposite-polarity binary speed sweep is only a precursor. It would track kinetic bookkeeping, branch work, wakes, sea exchange, and planar-mode drive on one history family across admitted below-, near-, and above-wake-speed regimes. It also requires root counts, Jacobian bounds, the transmitter acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$, and the distinct signed playback $D_r/D_t$. A field-speed event in a binary is neither a demonstrated photon source nor the Wien peak of an ensemble. An arbitrary jump between history branches cannot close that gap.

### 8.3. Radiative corrections and material boundaries

The [Lamb-shift and anomalous-moment analysis](analysis/radiative-corrections-lamb-shift-g-minus-2.md) asks for finite precision observables from wake dressing, medium response, atomic structure, spin response, and photon interactions. The Lamb shift is a shift in atomic transition energies; the magnetic anomaly $a$ is conventionally defined by $g=2(1+a)$. Their agreement with quantum electrodynamics is a demanding effective recovery target, rather than proof that loop diagrams are literal microscopic paths.

Regularization gives singular mathematical objects a controlled finite-width representation. A finite answer requires a justified limiting procedure and declared physical reference, not a cutoff fitted independently to each observable. The proposed common correction record joins Lamb shift, magnetic anomaly, polarization response, pair provenance, and boundary-sensitive effects. A weighted summary can organize comparisons, but cannot supply a missing carrier or certify every member from a successful subset.

The [Casimir comparison](analysis/casimir-effect.md) is specifically boundary-sensitive. Its ideal conducting parallel-plate pressure is $F/A=-\pi^2\hbar c_\gamma/(240a^4)$ at separation $a$, within that ideal effective limit. Real comparisons require conductivity, geometry, temperature, and surface corrections. The force here is an assembly-level measured response, with effective energy derivative $F=-\partial E_{\mathrm{eff}}/\partial a$. Its source must include recoil and medium exchange. A boundary-dependent difference in energy does not measure an arbitrary absolute empty-space energy density.

## 9. A coupled nonlinear electromagnetic benchmark

### 9.1. Changing a physical source

The [strong-field electromagnetic analysis](analysis/strong-field-electromagnetic-response.md) requires five behaviors together: elastic photon–photon scattering, strong-background birefringence, amplitude-dependent propagation, electron–positron pair production, and pair backreaction. Birefringence means that two transverse polarizations acquire different phase propagation. Backreaction means that products continue to change the source and medium that formed them.

The preparation parameter $\zeta$ changes the physical source history while the master-equation coefficients and projection rules remain fixed. The same source family passes through a null configuration, weak positive and negative preparations, stronger sub-threshold configurations, and pair-active configurations. Effective electric and magnetic quantities are outputs of a projection, not extra microscopic driving terms.

For a declared observable $Y(\zeta)$, the nonlinear departure from its weak tangent is

$$
R_{\mathrm{amp}}(\zeta)=\frac{\|Y(\zeta)-Y(0)-\zeta\partial_\zeta Y(0)\|}{\|\zeta\partial_\zeta Y(0)\|+\epsilon}
$$

The tolerance and numerical denominator protection $\epsilon$ are fixed by the comparison. A nonzero departure establishes physical nonlinearity only after refinement attributes it to a resolved change in the history or medium. An amplitude-specific fitted coefficient supplies no such evidence.

### 9.2. Distinguishing the five behaviors

Elastic light-by-light scattering must preserve two incoming and two outgoing photon packets with their identities, polarizations, angular statistics, and event account. It is distinct from a two-photon process that produces a charged pair. Both use the same photon and branch-outcome description.

Strong-background polarization splitting must vanish in the declared homogeneous isotropic control and arise from the same constitutive response at stronger loading. Polarization eigenvalues, eigenvectors, phase and group delay, absorption, and Stokes quantities—the measured polarization components—must remain compatible. Effective causal relations between dispersion and loss are comparison tests, not permission to fit independent real and imaginary response functions.

Pair production requires retained charge-conjugate electron and positron assemblies, exact routing of pre-existing architrino identities, and opposite protected polarity inventories. A transient signed signal, generic breakup, or ionization does not satisfy it. The source does not assume whether the charged constituent sites are axial, external, exposed, or internal. That geometry is part of the result to derive. The familiar strong-electric rate dependence $w(E)\propto E^2e^{-\pi E_S/E}$ is a comparison target with effective field $E$ and comparison scale $E_S$; installing it as a threshold would bypass the required capture measure over initial histories.

After capture, source, sea, products, remnants, radiation, and boundary exchanges must evolve together. The resulting effective field change can screen, redistribute, enhance locally, oscillate, or radiate. The sign cannot be imposed in advance as universal screening. A frozen-background yield calculation cannot establish backreaction.

### 9.3. Joint acceptance and the missing records

Each behavior has an independent residual and tolerance. All five must pass on one versioned physical source family, with the same event history wherever the effects coexist. Exact identity and polarity routing, energy, momentum, angular momentum, wake history, and boundary accounting accompany the observer outputs. Null, sign-reversal, refinement, deliberately split-record, frozen-sea, frozen-backreaction, and hidden-retuning controls prevent a successful-looking scalar summary from masking failure.

The present source supplies a specification, not an executed result. Accepted source and medium branches, photon carriers, conjugate pair basins, polarization response, and continuing event accounts remain missing. Excellent agreement in one polarization comparison would leave that combined physical result open.

## 10. Phase, interference, and internal-state transport

### 10.1. Two paths and an apparatus

The [two-path interference comparison](analysis/double-slit-mach-zehnder.md) concerns phase-dependent detection frequencies after paths recombine. The familiar expression $P(x)=|\psi_1(x)+\psi_2(x)|^2$ contains an interference term, $2\operatorname{Re}(\overline{\psi_1}\psi_2)$, which changes when relative phase changes. The complex amplitudes are effective comparison objects. A localized assembly plus distributed wake history must produce the corresponding detector statistics without inserting that probability formula into the detector.

A basin is a set of initial records that evolve toward the same declared outcome. A proposed interference account requires path histories, a phase functional, a partition into detector basins, a measure on those basins, and a material response kernel. Which-path detection must change the physical apparatus/history record that determines those outcomes. It cannot erase fringes through an unexplained probability update.

The source also retains a comparison with Bohmian trajectory patterns. A quantum-potential description is a tool for comparing trajectory flow, screen density, disturbance, and record formation. Reproducing it would not license a separate configuration-space field as primitive ontology, nor permit a different detector ensemble from the interference calculation.

### 10.2. A loop phase around a shielded source

The [Aharonov–Bohm comparison](analysis/aharonov-bohm-effect.md) sharpens the role of history and boundaries. In the standard effective description, a loop surrounding magnetic flux $\Phi_B$ produces phase $\Delta\phi=q\Phi_B/\hbar$ even where the local magnetic field on the path vanishes. The charge $q$, flux, and action scale belong to the observer description.

The native requirement is a path-history holonomy, meaning a phase or transformation accumulated around the complete loop, with explicit shielded-source and boundary provenance. An account based only on the local field magnitude would miss the comparison. An account that simply installs a vector potential as a primitive cause would bypass it. The same phase map must also agree with ordinary interference and its detector measure.

### 10.3. Oscillations and source/detector projections

[Neutrino oscillations](analysis/neutrino-oscillations.md) compare changing flavor-detection frequencies with propagation distance and energy. Flavor names the type of weak reaction through which a source prepares or detector identifies the neutral lepton. In the two-flavor standard approximation, with conventional natural units $\hbar=c=1$, the comparison is

$$
P_{\alpha\to\beta}=\sin^2(2\theta)\sin^2\!\left(\frac{\Delta m^2L}{4E}\right)
$$

Here $\theta$ is the mixing angle, $\Delta m^2$ the effective squared-mass difference, $L$ the observer baseline, and $E$ the measured energy. These natural units belong solely to the imported comparison; they do not identify any channel with the primitive wake speed. The full mixing matrix and matter effects extend this target.

The required physical account has an internal evolution map and distinct source and detector weak-exposure projections. Exposure describes which part of an assembly response contributes to an observed sector. Effective mixing must arise from that structure rather than an imported parameter table. Matter propagation can alter the environment while preserving the same underlying vacuum/source/detector construction. Failure to recover baseline–energy dependence or to close source and detection reactions defeats the comparison even if an internal oscillation has been drawn.

## 11. Polarization, spin, and Bell constraints

### 11.1. A local analyzer before a two-wing experiment

[Malus' law](analysis/malus-law.md) compares transmitted intensity or single-photon pass frequency with the square of the cosine of the angle between linear input polarization and analyzer axis. The geometric part can be separated from the statistical part. Represent the transverse input by a column vector $a_\perp$ in an orthonormal basis for its positive action norm. For a real unit analyzer axis $\hat{\mathbf a}$ and accepted rank-one projector $A=\hat{\mathbf a}\hat{\mathbf a}^{T}$, its accepted action fraction is

$$
\rho=\frac{\overline{a_\perp}^{T}Aa_\perp}{\overline{a_\perp}^{T}a_\perp}
$$

Here the bar denotes complex conjugation and superscript $T$ denotes transpose. For normalized real linear polarization this expression is $\cos^2\theta$ by the Euclidean projection identity. That conditional geometric result does not establish the frequency of actual captures. The analyzer dynamics must derive both the projector and an unresolved-material measure whose threshold coordinate $\eta$ is uniform on $[0,1]$. Then, and only then, the measure of $\eta<\rho$ equals $\rho$. A nonuniform threshold measure creates a detector-bias residual rather than automatically a new photon law.

The rejected component must have a local route through reflection, absorption, scattering, heating, or another material response. A physical longitudinal free-photon mode, an imported analyzer probability rule, or missing rejected action would leave the polarization recovery incomplete.

### 11.2. Magnetic spectra and discrete spin outcomes

The [Zeeman benchmark](analysis/zeeman-effect.md) measures magnetic-environment splitting of atomic lines. In the weak effective comparison, $\Delta E_Z=g_J\mu_Bm_JB$, with magnetic readout $B$, Bohr magneton $\mu_B$, angular-momentum projection label $m_J$, and response factor $g_J$. A transition compares the upper and lower shifts. The normal pattern is a central line plus symmetric side lines when viewed transversely, and two circularly polarized shifted components when viewed along the magnetic axis.

The normal orbital coefficient must share its exposed mass-response convention with the corresponding cyclotron comparison. More complicated multiplets test an internal angular-momentum and spin account beyond the normal triplet. Their positions, polarizations, and source reconstruction cannot be recovered through independently fitted factors for each line. Laboratory calibration and stellar inference must use the same physical magnetic-state map with declared environmental differences.

[Stern–Gerlach measurements](analysis/stern-gerlach.md) add discrete beam outcomes for spin-bearing assemblies in an inhomogeneous effective magnetic environment. An ordered-frame spinor lift is a proposed map from an assembly's ordered orientation history to the two-component representation used in the standard spin comparison. That map, the apparatus impulse, the boundary between outcome basins, and the measure yielding the half-angle probabilities all remain required. A pair of paths drawn by hand would establish neither discrete dynamical outcomes nor their weights, and apparatus momentum and angular momentum must be accounted for.

### 11.3. Why common-source history does not solve Bell

The [Bell benchmark](analysis/bell-test-violations.md) concerns correlations between two separated apparatuses with independently chosen settings. For outcomes $a,b\in\{-1,+1\}$, correlation $E(\alpha,\beta)$ is the mean product at settings $\alpha,\beta$. The CHSH combination is a signed sum of four such correlations. If a setting-independent source variable $\lambda$ supports factorized local probabilities,

$$
P(a,b\mid\alpha,\beta)=\int P_A(a\mid\alpha,\lambda)P_B(b\mid\beta,\lambda)\,d\mu(\lambda)
$$

the CHSH magnitude is bounded by two. Writing that combination as $S$, the standard quantum comparison also imposes the Tsirelson bound $|S|\le2\sqrt2$: recovery must reproduce the observed violations of the local bound while remaining within this upper comparison and preserving no-signaling. This is an observer-level recovery target, not a derived native correlation law. A shared pair history alone remains inside the factorized form when it merely enlarges $\lambda$. The program must identify a precise failure of the factorization assumptions that recovers the tested correlations while preserving the required controls. It cannot claim a solution from determinism or absolute time alone.

No-signaling requires the local outcome distribution to be independent of the remote controllable setting. The source demands this through a symmetry of the derived joint basin measure, not a cancellation added after fitting. It also excludes hidden dependence of the source preparation on later detector settings as a generic escape. Its measurement-independence residual tests exactly that dependence.

### 11.4. Absolute ordering and wake reach

For record windows $[T_A,T_A+\tau_A]$ and $[T_B,T_B+\tau_B]$ separated by distance $d_{AB}$ in the void, the source defines

$$
\Delta_{\mathrm{reach}}^{A\to B}=T_B+\tau_B-T_A-\frac{d_{AB}}{c_f},\qquad
\Delta_{\mathrm{reach}}^{B\to A}=T_A+\tau_A-T_B-\frac{d_{AB}}{c_f}
$$

Negative margins mean no wake emitted at the start of one window reaches the other before its closure under this geometric diagnostic. If either is nonnegative, wake-reach exposure must be considered. Earlier common history is a separate issue; these margins do not erase it.

Observer-level spacelike separation defined through the photon channel need not equal separation by the primitive wake relation unless the speed identification has been established. The joint correlation tables must therefore be compared under reversed absolute ordering, with timing, analyzer calibration, and coincidence selection held to the same physical contract. A normalized illustration with $c_f=1$, simultaneous starts, $d_{AB}=3$, and window durations one gives both margins $-2$. This arithmetic establishes only that window diagnostic. It proves neither Bell correlations nor their independence from hidden earlier history.

A complete Bell result would require the pair record, apparatus response, basin measure, correlation comparison, no-signaling, measurement independence, ordering bound, and Lorentz leakage control together. None is supplied merely by a local Malus-law calculation or by a symbolic spinor representation.

## 12. Transport and probes of effective spacetime structure

### 12.1. Robust transport and fluctuations

The [quantum Hall effect](analysis/quantum-hall-effect.md) tests conductance plateaus, including integer and fractional values, that remain stable under declared material perturbations. The effective relation $\sigma_{xy}=\nu e^2/h$ uses Hall conductance $\sigma_{xy}$ and filling factor $\nu$. A microscopic explanation needs a stable topological or basin invariant, edge/bulk transport, localization, and material response. Matching a few plateau values without their robustness or fractional structure is insufficient.

[Brownian motion](analysis/brownian-motion.md) provides a simpler statistical comparison. In an appropriate one-dimensional overdamped thermal limit, $\langle x_{\mathrm{eff}}^2\rangle=2Dt_{\mathrm{eff}}$ and $D=k_BT_{\mathrm{ens}}/\zeta$, with diffusion coefficient $D$ and dissipative drag coefficient $\zeta$. A deterministic microscopic ensemble can produce random-looking coarse motion, but the fluctuation and response coefficients must arise from the same material and temperature record. Ordinary dissipative drag in this comparison is distinct from the proposed reversible mass response of an assembly.

### 12.2. Different instruments see different projections

The [spacetime experiment suite](analysis/spacetime-structure-experiment-suite.md) separates metric reconstruction, propagation, correlated displacement searches, global topology, and gravity-mediated entanglement. These are distinct questions. A reconstructed ring near a compact object does not directly image a substrate; a null correlated-noise channel does not exclude every possible medium; a proposed entanglement experiment is not a detection.

For experiment $a$, let $\mathcal P_a$ project the shared record into an effective channel, $\mathcal D_a$ describe its detector, and $\nu_a$ carry calibrated nuisance quantities. The predicted data are $\mathbf y_a=\mathcal D_a[\mathcal P_a(\Theta),\nu_a]$. Distinct physical records can produce the same projected data. Exact equality across an experiment set defines an observational equivalence class. With finite uncertainties it is safer to retain the admissible sets of Section 1: pairwise closeness within tolerance need not be transitive and therefore need not define a mathematical equivalence relation.

This is a derived logical limit on identification, not a claim that all physical models fit equally well. Independent projections can eliminate candidates or distinguish previously indistinguishable records. A claim of unique substrate identification would be falsified by a distinct admissible record that produces the same measured outputs across the declared suite.

### 12.3. Correlated interferometers

Two interferometers can compare a cross-spectrum, the frequency-dependent correlation between their readouts. If $H_i^A$ is the independently calibrated response of instrument $i$ to effective channel $A$, and $K_{AB}^{\mathrm{sea}}$ is a candidate medium cross-spectral kernel, the proposed prediction is

$$
S_{12}^{\mathbb{A}\mathbb{A}\mathbb{A}}(f)=H_1^A(f)K_{AB}^{\mathrm{sea}}(f)H_2^{B*}(f)
$$

The star denotes complex conjugation. The kernel can describe a finite-window ensemble of deterministic histories; it need not represent primitive randomness. It must nevertheless be derived from a declared medium state, while the apparatus kernels come from independent geometry and calibration. Freely co-fitting both sides to the same spectrum would make the comparison uninformative.

The source distinguishes the Holometer's completed shear-correlation measurements from the GQuEST design and forecast. Its scientific proposal is to test a candidate kernel against the relevant existing Holometer channel before forecasting the other apparatus with that same kernel. Environmental witnesses, orientation, overlap geometry, calibration injections, accidental-correlation controls, and the analysis band determine what that comparison can exclude. A null applies to the projected model family, not every microscopic theory. The source's dated project and publication statuses are retained in the coverage record; they are not refreshed measurements in this manuscript.

### 12.4. Weak and strong propagation, imaging, topology, and entanglement

The suite proposes an effective propagation operator whose roots determine mode wave numbers $k_r(\omega)$. Its group speed is $(\partial k_r/\partial\omega)^{-1}$, and relative phase between modes accumulates as $\int(k_r-k_s)\,d\ell_{\mathrm{eff}}$. One constitutive family must pass weak photon and gravitational-wave dispersion, polarization, and speed bounds, while allowing any strong-background polarization split only through a declared physical state change. A speculative microscopic correlation is inadmissible if the same response predicts forbidden clock, ruler, or propagation leakage.

Horizon-scale imaging adds visibility amplitudes, closure phases, and closure amplitudes before image reconstruction. The bright emission ring is distinguished from the comparison shadow. Its scale depends jointly on mass-to-distance inference, effective exterior geometry, emissivity, scattering, plasma, and reconstruction calibration. An attractive-looking ring cannot replace visibility-domain agreement, and an emissivity adjustment cannot silently repair a failed metric scale.

Cosmic-topology searches instead ask whether the observer's reconstructed chart contains repeated access paths or global identifications. A local metric measurement cannot settle that question. Any bound is specific to topology family and observer position, and cannot directly change the assumed topology of the Euclidean void.

Gravity-mediated entanglement tests whether a controlled effective interaction can carry correlations incompatible with the selected separable mediator model. Their interpretation requires sufficient coupling, decoherence control, and exclusion of nongravitational interactions. A positive witness would constrain mediator classes without uniquely identifying microscopic constituents. A null experiment lacking adequate sensitivity would not adjudicate them.

## 13. Reconstruction, shared evidence, and the remaining boundary

### 13.1. Detector objects are inferred outputs

Collider comparisons extend the same discipline to reconstructed tracks, showers, jets, vertices, heavy-flavor tags, and missing transverse momentum. These are outputs of detector response and reconstruction. Missing transverse momentum is an imbalance in the transverse plane,

$$
\mathbf p_T^{\mathrm{miss}}=-\left(\sum_{o\in\mathcal O_{\mathrm{hard}}}\mathbf p_{T,o}+\mathbf p_T^{\mathrm{soft}}\right)
$$

The set $\mathcal O_{\mathrm{hard}}$ contains selected reconstructed objects; the soft term accounts for the remaining accepted low-momentum contribution. A physical inference must retain calibration, reconstruction, vertex and tagging information, angular selection, and statistical fit conventions. The imbalance is not itself an identified microscopic product. Cross sections and upper limits require the source ensemble, prepared flux, detection efficiency, and statistical model as well as event-level conservation.

The lane's [shared closure record](priorities.md#shared-closure-record) names this detector projection but contains no focused executed collider case. Its source bibliography and routing are retained as support rather than converted into a claimed collider recovery. The scientific requirement is clear: the event account and the detector account must describe the same case.

### 13.2. What the synthesis establishes

The combined benchmark program provides a structured way to make a proposed physical account answer to independent observations. Its strongest current results are conditional identities and explicit distinctions: clock rate is inverse period stretch; one weak-field optical path connects delay and bending; one weak endpoint law fixes a coefficient combination rather than a unique medium; frequency and wavelength spectral peaks differ by their density transformation; local projection geometry does not by itself supply detector probabilities; and a shared source variable does not evade a factorizable Bell bound.

The same analysis preserves unfavorable evidence. Missing carriers leave residuals unevaluated. Source normalization errors cannot be carried into a recovery claim. A scalar delay is not a full metric, a shape analogy is not a constitutive derivation, a thermal cutoff is not Planck occupation, a pair yield is not backreaction, and a reconstructed image is not a substrate photograph. These limits identify which additional observation, derivation, or accepted physical record would change each conclusion.

What remains is the construction of records capable of satisfying these comparisons together. That construction must preserve the declared microscopic law, physical histories, boundary exchanges, observation maps, and independent references across the regimes claimed. The benchmark specifications define how to recognize success or failure. They do not supply the missing physical dynamics through their own completeness.
