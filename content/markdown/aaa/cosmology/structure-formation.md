# Structure Formation

This chapter translates structure-formation language into medium and assembly evolution inside a fixed Euclidean void. An overdensity is a region whose matter density exceeds the spatial mean; its growth connects the early distribution of matter to galaxies and clusters. The chapter develops observer-level comparison equations and a conditional medium-response model. Their coefficients and their connection to architrino dynamics remain to be derived. The growth-side foundations are [Cosmology Ontology](./cosmology-ontology.md), [Expansion Mechanism](./expansion-mechanism.md), and [Dark Matter](./dark-matter.md).

## Scope and Physical Picture

Structure formation describes how the nearly homogeneous early universe developed the web of galaxies, clusters, filaments, and voids observed today. In standard $\Lambda$CDM this story unfolds through gravitational instability of small density perturbations in an expanding Friedmann–Robertson–Walker metric, seeded during inflation and amplified by pressureless cold dark matter that decouples early from the photon–baryon plasma. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ comparison map, the inflation-side predecessor is [Inflation Model](./inflation-model.md).

The standard term **cosmological void** should be read as a low-galaxy-density region, not as ontological emptiness. Such regions still contain the Noether sea, photon and neutrino transport, sparse hydrogen, and possible rare reaction channels seeded by high-energy photons or other local sources.

In Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$, the same phenomenology is assigned to **Noether sea and assembly co-evolution inside a fixed Euclidean void with absolute time**. The [Euclidean void](../foundations/euclidean-void.md) is the fixed spatial container, and [absolute time](../foundations/absolute-time.md) orders events universally. An [architrino](../foundations/architrino.md) is a point entity with polarity whose emitted causal wakes record its earlier motion. A Noether braid is a neutral assembly of coupled architrino paths; the [Noether sea](../spacetime/noether-sea.md) is the ambient population of such assemblies. Selection of complementary pro/anti orientations is a population hypothesis, distinct from polarity conjugation. Baryonic composites and candidate neutral dark-sector assemblies interact with this medium. Recovering gravitational growth and a dark-energy-like observer history from that interaction requires an assembly population, its constitutive response, and a map to observer clocks and rulers; the equations below do not establish those physical inputs.

An additional filamentary contribution from Noether sea response is a hypothesis. Two mass concentrations supply a useful test geometry, but overlapping influences alone do not imply axial accumulation, extra lensing, or a reduced growth residual. A candidate mechanism must predict the sign and size of those effects from the same medium history that describes surrounding low-density regions and clusters.

No metric expansion of space occurs. The Euclidean void is static. What changes is the **internal state of the Noether sea**: assembly radii, oscillation frequencies, local number density, the Noether sea delay factor $\chi_{\text{sea}}$, and the resulting medium-dressed inertial response. All standard cosmological observables—power spectra, correlation functions, lensing maps—are recast as probes of this Noether sea and assembly history at different scales and epochs.

---

## Effective Perturbation Theory

### Background Noether Sea State

Define a spatially averaged Noether sea state at absolute time $T$:

- $u_{\text{sea}}(T)$: mean energy density of the Noether sea,
- $\rho_m(T)$: mean assembly mass density in a declared effective mass assignment (baryonic + neutral/dark); individual architrinos have no mass,
- $\bar{\rho}_{\text{NS}}(T)$: mean Noether braid number density, distinct from both energy density and assembly mass density,
- $\bar{R}_{\text{braid}}(T)$: declared mean binary-radius statistic for Noether braid assemblies in the Noether sea.

An effective scale variable $a_{\mathrm{eff}}(t_{\mathrm{eff}})$ and rate $H_{\mathrm{eff}}=d\ln a_{\mathrm{eff}}/dt_{\mathrm{eff}}$ summarize a homogeneous observer reconstruction. The time $t_{\mathrm{eff}}$ is an observer coordinate, distinct from absolute time $T$. A redshift history admits $1+z=a_{\mathrm{eff,obs}}/a_{\mathrm{eff,emit}}$ only when emission, path transfer, and receiver-clock effects factor into that common epoch function. This factorization does not identify $a_{\mathrm{eff}}$ with inter-assembly separations or determine a density dilution law. Those maps require separate derivations from the same medium history. Below, $x_{\mathrm{eff}}^i$ are comoving coordinates of the comparison chart, $k$ is their Fourier wavenumber, and $a\equiv a_{\mathrm{eff}}$, $H\equiv H_{\mathrm{eff}}$ are compact aliases only in explicitly effective equations. Projecting densities from native volume into this chart also requires a declared volume map. Use $c_0$ for a fixed observer speed calibration and energy-to-mass conversion; it is not identified with primitive wake speed $c_f$. Every new numerical instantiation uses normalized wake-speed units $c_f=1$.

### Density Contrast and the Growth Equation

Let $\delta_{\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}}) = (\rho_m(x_{\mathrm{eff}}^i,t_{\mathrm{eff}}) - \bar{\rho}_m(t_{\mathrm{eff}}))/\bar{\rho}_m(t_{\mathrm{eff}})$ be the observer-level matter density contrast. The following pressureless, subhorizon linear comparison equation acts separately on each Fourier amplitude $\delta_{\mathrm{eff}}(k,t_{\mathrm{eff}})$. A $k$-dependent coupling cannot multiply a real-space contrast pointwise. In the standard comparison form, dots denote derivatives with respect to $t_{\mathrm{std}}$:

$$
\ddot{\delta}_{\mathrm{std}} + 2H_{\mathrm{std}}(t_{\mathrm{std}})\,\dot{\delta}_{\mathrm{std}} - 4\pi G_{\text{eff,std}}(t_{\mathrm{std}}, k)\,\bar{\rho}_{m,\mathrm{std}}(t_{\mathrm{std}})\,\delta_{\mathrm{std}} = 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-2700ac5bdc03bb3c)

The layer-explicit recovery target is
$$
\frac{d^2\delta_{\mathrm{eff}}}{dt_{\mathrm{eff}}^2}
+2H_{\mathrm{eff}}(t_{\mathrm{eff}})\frac{d\delta_{\mathrm{eff}}}{dt_{\mathrm{eff}}}
-4\pi G_{\text{eff}}(t_{\mathrm{eff}}, k)\,\bar{\rho}_m(t_{\mathrm{eff}})\,\delta_{\mathrm{eff}}
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-29408ed41d012c05)

Each symbol carries a specific medium-level meaning:

- **$H_{\mathrm{eff}}(t_{\mathrm{eff}})$**: the background comparison rate. The coefficient $2H_{\mathrm{eff}}$ follows when pressureless continuity and Euler equations hold in a common comoving chart with conserved matter and the stated Poisson response. Medium relaxation or increasing braid radii alone does not derive this coefficient. Source exchange, drag, pressure, and time-dependent mass assignments can change the perturbation equation.

- **$G_{\text{eff}}(t_{\mathrm{eff}}, k)$**: the effective gravitational coupling to be extracted from the response to a matter overdensity. Candidate constitutive inputs include:
  - the Noether braid density $\bar{\rho}_{\text{NS}}(T)$ and its relation to Noether sea stiffness,
  - the declared binary-radius statistic $\bar{R}_{\text{braid}}(T)$ and its relation to assembly compliance,
  - potentially the wavenumber $k$, if the Noether sea response becomes scale-dependent at wavelengths comparable to internal assembly scales or at the transition between linear and self-hit regimes. The weak-field constitutive map behind this is the same one organized in [Emergent Metric](../spacetime/emergent-metric.md).

- **$\bar{\rho}_m(t_{\mathrm{eff}})$**: the observer-level mean matter density, including baryonic assemblies and any weakly coupled neutral assemblies (the dark-matter sector; see interface with [dark-matter.md](./dark-matter.md)).

**Mechanism for the growth term.** The proposed feedback is that an overdensity changes Noether sea response, creating an effective acceleration that attracts further matter. Its sign is a constitutive question, not a consequence of adding neutral assemblies. At substrate level, wakes are emitted by the constituent architrinos. The [Master Equation](../dynamics/master-equation.md) sums causal-root accelerations with transmitter weight $c_f/|D_t|$, where $D_t=c_f-\mathbf V_t\cdot\hat{\mathbf r}_t$, $\mathbf V_t$ is emission velocity, and $\hat{\mathbf r}_t$ points from emission to reception. Receiver motion changes root playback and subsequent paths, but does not multiply this arriving acceleration. Recovering an attractive bulk potential and a clock/signal response from that sum remains necessary before assigning the growth term to the Noether sea.

**Where the equation is valid.** Applying this comparison to a physical medium requires all of the following:
- perturbations are small ($|\delta| \ll 1$),
- the wavelength of perturbations is much larger than the Noether braid scale,
- the Noether sea response is quasi-static (perturbation timescale $\gg$ internal Noether braid oscillation period),
- the coarse perturbation preserves the admitted constituent causal-root domain; internal speed alone neither certifies nor excludes self-hit, which requires a same-transmitter causal root,
- a self-consistent homogeneous background history and the required pressureless continuity, Euler, and Poisson limits; any use of a frozen quiescent equilibrium additionally requires its acceleration balance and response stability. The [Noether sea](../spacetime/noether-sea.md) chapter does not supply those physical conditions for this ansatz.

**What breaks outside that regime.** At $|\delta|\sim1$ nonlinear terms become important; this criterion is not itself a turnaround or collapse certificate. A continuum treatment also loses justification near the assembly size or mean spacing. That is a limit of the approximation, not a derived cutoff in physical power. Dense regions require explicit causal-root and constitutive checks; density alone proves neither self-hit onset nor a qualitative change in $G_{\mathrm{eff}}$.

### The Growth Factor

Define $D(k,t_{\mathrm{eff}})$ by $\delta_{\mathrm{eff}}(k,t_{\mathrm{eff}})=D(k,t_{\mathrm{eff}})\delta_{\mathrm{eff}}(k,t_{\mathrm{eff},0})$, with $D(k,t_{\mathrm{eff},0})=1$ and the growing-mode initial derivative specified. A common real-space factor $D(t_{\mathrm{eff}})$ exists only when growth is scale independent. In the pressureless general-relativistic comparison with conserved matter, constant $G_N$, curvature and a cosmological constant, and negligible radiation, the growing solution has the integral form below. Here $a$ and $H$ carry the effective-chart meaning already declared:

$$
D(a) \propto H(a) \int_0^a \frac{da'}{[a' H(a')]^3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6654c50f206f6ee3)

This integral follows by reduction of order only when $H$ itself solves the homogeneous growth equation: for $D=Hv$, one obtains $\dot v\propto a^{-2}H^{-2}$ and then $v\propto\int da/(a^3H^3)$. A general Noether sea equation of state or variable $G_{\mathrm{eff}}$ does not preserve that premise. In those cases solve the mode equation with its actual coefficients. The growth rate $f(k,a)=d\ln D(k,a)/d\ln a$ is inferred from galaxy redshift-space distortions, which require a velocity, bias, distance, and selection model and commonly constrain $f\sigma_8$ rather than $f$ alone:

- In the matching general-relativistic matter-plus-cosmological-constant background, with $G_{\mathrm{eff}}=G_N$ and the same conserved matter inventory, $f(a)\approx\Omega_m(a)^{0.55}$ is an approximation. Here $\Omega_m=8\pi G_N\bar\rho_m/(3H^2)$; equality of an equation of state alone does not fix this background.
- Scale-dependent $G_{\mathrm{eff}}$ generally produces scale-dependent growth. Neutrino streaming and pressure can also produce scale dependence within standard gravity, so that feature alone does not identify a medium modification.

The comparison should also preserve the standard linear-regime milestones. During matter domination, the growing mode satisfies $D(a)\propto a$ in the GR/CDM limit, while the decaying mode falls as $a^{-3/2}$. During radiation domination, subhorizon matter growth is strongly slowed, so the transfer function retains an equality-scale break. A compact benchmark is
$$
P(k,z)
=
P_{\mathrm{seed}}(k)\,\mathcal T^2(k)\,D^2(z),
\qquad
\mathcal T(k)\to1\ \text{for }k\ll k_{\mathrm{eq}},
\qquad
\mathcal T(k)\propto\frac{\ln(k/k_{\mathrm{eq}})}{(k/k_{\mathrm{eq}})^2}\ \text{for }k\gg k_{\mathrm{eq}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-61c91d955cd3ead3)

Here $P$ is the matter-contrast power spectrum, $P_{\mathrm{seed}}$ is the seed spectrum in the corresponding matter normalization, $\mathcal T$ is the dimensionless transfer function, and $k_{\mathrm{eq}}$ is the equality wavenumber. The large-$k$ form is the cold-matter asymptotic envelope; baryon acoustic oscillations, neutrino streaming, and nonlinear evolution require their own transfer treatment. The factorization uses scale-independent subsequent growth; otherwise replace $D(z)$ by $D(k,z)$ or use a full time-dependent transfer function. This is an observer-level recovery target, not a derivation from the fixed Euclidean void.

### Component Transfer and Free-Streaming Interface

Linear perturbation theory is useful only when its variables are kept at the effective observer level. For each component $x$ in the comparison packet, use
$$
\mathbf{y}_x^\theta(k,z)
=
\left(
\delta_x^\theta,\,
\theta_x^\theta,\,
\sigma_x^\theta,\,
\delta p_x^\theta
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9c7129902b2d41dd)

Here the superscript $\theta$ labels a candidate cosmological history and is not a velocity divergence. The component variables are density contrast $\delta_x$, velocity divergence $\theta_x$, anisotropic stress $\sigma_x$, and pressure perturbation $\delta p_x$, all in one declared effective gauge and normalization. A transfer matrix $\mathsf T_x^\theta$ maps the initial perturbation vector to that component. For a single stochastic seed, the density transfer amplitudes $T_x^\theta$ give
$$
\mathbf{y}_x^\theta(k,z)
=
\mathsf{T}_x^\theta(k,z;\theta_{\mathrm{sea}})
\,\mathbf{y}_{\mathrm{init}}^\theta(k),
\qquad
P_{xy}^\theta(k,z)
=
T_x^\theta(k,z)T_y^{\theta *}(k,z)P_{\mathrm{seed}}^\theta(k)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2b281c6178c9dc12)

The star denotes complex conjugation; it may be omitted only for real transfer amplitudes. With multiple correlated initial modes, the covariance is $\mathsf T_x\mathbf C_{\mathrm{init}}\mathsf T_y^\dagger$, not a product of two scalar transfers. The sea history $\theta_{\mathrm{sea}}$ is shared with cosmic microwave background (CMB) lensing, baryon acoustic oscillations (BAO), big-bang nucleosynthesis (BBN), and late growth. For noninteracting components with $\dot{\bar\rho}_x=-3H(\bar\rho_x+\bar p_x/c_0^2)$, adiabatic initial conditions are a common local time shift and imply
$$
\frac{\delta\rho_x^\theta}
{\bar\rho_x^\theta+\bar p_x^\theta/c_0^2}
=
\frac{\delta\rho_y^\theta}
{\bar\rho_y^\theta+\bar p_y^\theta/c_0^2},
\qquad
\delta_b^\theta
=
\delta_{\mathrm{dm}}^\theta
=
\frac{3}{4}\delta_\nu^\theta
=
\frac{3}{4}\delta_\gamma^\theta
$$

[View →](../../../../equation-mapping.html#corpus-equation-4de833ac52f80e51)

Here all $\rho_x$ are mass-equivalent densities; the second chain applies initially to pressureless baryons and dark matter and relativistic neutrinos and photons, where $p/(\rho c_0^2)=1/3$. These are initial conditions, not equalities preserved through horizon entry or neutrino mass transitions. If components exchange energy or matter, adiabaticity must instead be formulated with their actual background derivatives, $\delta\rho_x/\dot{\bar\rho}_x=\delta\rho_y/\dot{\bar\rho}_y$ where those derivatives are nonzero. An isocurvature mode, a relative perturbation not generated by that common time shift, must be propagated through the joint observables.

Neutrino and warm-dark-sector signals sharpen the small-scale transfer test. For standard thermally populated relic neutrinos that are nonrelativistic today, a useful comparison is
$$
f_\nu^\theta
\equiv
\frac{\Omega_\nu^\theta}{\Omega_m^\theta}
\approx
\frac{\Sigma m_\nu^\theta c_0^2}
{94\,\mathrm{eV}\,\Omega_m^\theta h_\theta^2},
\qquad
\frac{\Delta P_\delta^\theta}{P_\delta^\theta}
\approx
-8f_\nu^\theta
$$

[View →](../../../../equation-mapping.html#corpus-equation-5870b21b4b669e6d)

The rounded $94\,\mathrm{eV}$ coefficient assumes the standard relic number density; $h_\theta$ is the dimensionless Hubble normalization and $f_\nu$ the neutrino matter fraction. The $-8f_\nu$ rule is an approximate small-fraction, late-time linear power suppression on wavelengths well below the free-streaming length, relative to a specified matched massless-neutrino comparison. It is not a general nonlinear or arbitrary-production result; the assumptions and limits are developed by [Lesgourgues and Pastor](https://arxiv.org/abs/astro-ph/0603494). For a warm neutral-assembly population produced at $t_{\mathrm{eff,prod}}^\theta$, retain the propagation history explicitly:
$$
\lambda_{\mathrm{FS}}^\theta
=
\int_{t_{\mathrm{eff,prod}}^\theta}^{t_{\mathrm{eff,eq}}^\theta}
\frac{\langle v^\theta(t_{\mathrm{eff}})\rangle}{a_\theta(t_{\mathrm{eff}})}\,dt_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f26dcb882346e448)

This is a comoving mean travel length up to matter-radiation equality, with the mean physical speed taken over the produced momentum distribution. Continuous production requires an additional average over production times. Mass alone does not fix the integral: the scale history, distribution, and endpoints matter. A universal $1.2\,\mathrm{Mpc}$ prefactor cannot be assigned without those inputs. Temperature is $T_{\mathrm{temp}}$; a dimensionless momentum-to-temperature ratio is $pc_0/(k_B T_{\mathrm{temp}})$. The abundance and travel length must follow the same production history used for BBN and CMB comparisons.

Cosmological neutrino-mass bounds also depend on the late matter-source accounting used by the expansion fit. A DESI-era matter-conversion comparison can relax or shift $\Sigma m_\nu$ constraints because converting part of the late matter budget into an effective dark-energy component changes the nonrelativistic matter inventory sampled by BAO, CMB, and growth. For $\mathbb{A}\mathbb{A}\mathbb{A}$, the lesson is not that the neutrino branch has changed ontology. The lesson is that any bound on $\Sigma m_\nu^\theta$ must be read together with the same late-time source term, baryon-accounting record, and Noether sea transport history used for expansion and structure formation.

### Linear and Nonlinear Dark-Sector Split

Hybrid dark-sector comparisons distinguish linear growth from nonlinear rotation curves. A candidate cold component needs small pressure and a sound speed small enough that pressure does not compete with gravitational growth on the tested scales. Small equation of state $w_{\mathrm{lin}}=p/(\rho c_0^2)$ and small sound-speed ratio are necessary cold-limit diagnostics,

$$
|w_{\mathrm{lin}}|\ll1,
\qquad
c_{s,\mathrm{lin}}^2/c_0^2\ll1
$$

[View →](../../../../equation-mapping.html#corpus-equation-bf6fe768596d32b3)

but they do not establish the correct abundance, initial spectrum, interaction rate, or acoustic loading. In particular, a finite $c_s$ can matter at sufficiently large $k$: compare $c_s^2 k^2/a^2$ with $4\pi G\bar\rho_m$. A modified Newtonian dynamics (MOND) comparison changes the low-acceleration relation inferred from galaxy motion; success there does not establish the CMB transfer function. Both projections must be supplied by one history:

$$
\theta_{\mathrm{sea}}
\longmapsto
\left(
\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}},
\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-04fe49326bb84f3b)

where $\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}}$ supplies $P(k,z)$, $D(z,k)$, $C_L^{\phi\phi}$, and $f\sigma_8$, while $\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}}$ supplies the radial-acceleration relation, the local missing-baryon benchmark, cluster hydrostatic profiles, and rotation-curve residuals. A compact split residual is

$$
\mathcal{R}_{\mathrm{lin/nl}}(\theta_{\mathrm{sea}})
=
\mathcal{R}_{P,D,C_L,f\sigma_8}(\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}})
+
\mathcal{R}_{\mathrm{RAR/local\ baryon/cl/rot}}(\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}})
+
\lambda_{\mathrm{split}}
d_{\mathrm{shared}}\!\left(
\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}},
\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-e048e84e03be5bc6)

Here $\Pi_{\mathrm{lin}}$ and $\Pi_{\mathrm{nl}}$ project one history into the two calculations. The residuals and the discrepancy $d_{\mathrm{shared}}$ must be dimensionless with stated covariance or tolerance normalization; $\lambda_{\mathrm{split}}\ge0$ is a declared weight. A finite penalty discourages inconsistent independently fitted states but cannot prohibit them. Shared physical quantities must actually agree, with $d_{\mathrm{shared}}=0$ in an exact formulation or within a predeclared numerical tolerance. Correlated observations also require joint covariance rather than double counting. These are consistency conditions; no fitted residual is reported here.

### Cluster Assembly and Intracluster-Light Accounting

High-redshift cluster and protocluster comparisons also need a luminous-component split. The central brightest cluster galaxy, the diffuse intracluster-light component, and the total cluster potential are different observer data products. Moving stellar mass from the central galaxy into a diffuse intracluster component can repair one BCG growth curve while creating a new obligation: the same source-history branch must predict the diffuse fraction, radial profile, concentration, surface-brightness selection, and mass-to-light conversion as functions of redshift and cluster mass.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, intracluster light is not dark matter and not Noether sea mass. It is luminous, collisionless stellar matter whose low-surface-brightness distribution can trace the cluster potential and therefore test the same effective metric and halo record used for lensing, X-ray gas, and galaxy dynamics. A cluster packet that uses BCG mass for stellar assembly history, intracluster light for diffuse stellar accounting, and lensing or dynamics for total mass must keep those rows separate until one Noether sea response record ties them together.

---

## Matter Content and the Dark Sector

### Baryonic Assemblies

Baryons (protons, neutrons, and their composites) are Noether braid assemblies with specific axial patterns. Their clustering behavior is governed by the effective growth equation above, modified by pressure support (thermal motion) and radiative cooling. In this effective growth comparison, pre-recombination baryonic assemblies are modeled as tightly coupled to photon-channel packets represented by the referent-pending coaxial contra-rotating polarity-conjugate planar-pair construction, producing acoustic oscillations. After decoupling, baryons fall into potential wells attributed by the working comparison to the candidate dark sector.

### Neutral Assemblies (Dark-Matter Candidates)

$\mathbb{A}\mathbb{A}\mathbb{A}$ admits multiple dark-matter scenarios (detailed in [dark-matter.md](./dark-matter.md)). For structure formation the relevant properties are:

- **Coupling to the Noether sea**: a candidate must supply the required gravitational response while satisfying bounds on electromagnetic interactions. Net neutrality alone does not bound dipole, polarizability, or scattering channels; a balanced axial inventory does not establish a stable dark-matter branch.
- **Thermal history**: abundance, momentum distribution, production history, and interaction rates determine clustering. CDM-like behavior requires sufficiently short free streaming on the tested scales; being nonrelativistic at one epoch is not sufficient. Warm populations can suppress small-scale power, but mass alone does not determine their velocities.
- **Self-interaction**: if neutral assemblies interact among themselves through residual short-range forces (e.g., van der Waals-like wake overlap at close range), this modifies halo profiles at small scales—a potential handle on the core-cusp and too-big-to-fail problems.

Pressure, viscosity, and collision terms must be supplied explicitly when relevant. A replacement of $G_{\mathrm{eff}}$ alone does not describe scattering, heat transport, or nonlinear halo evolution.

### Medium Energy (Dark-Energy Role)

The Noether sea energy density $u_{\mathrm{sea}}$ is a candidate carrier for a dark-energy-like observer response. Its projected pressure and coupling must come from the same history. An equation of state $w_{\mathrm{sea}}=p_{\mathrm{sea}}/u_{\mathrm{sea}}\approx-1$ is not alone an acceleration criterion: even in the general-relativistic comparison, acceleration requires sufficiently negative total energy-plus-three-pressure after all components are included. Here acceleration means $d^2a_{\mathrm{eff}}/dt_{\mathrm{eff}}^2>0$ and requires the actual scale and clock map. Its recovery from medium evolution remains open.

---

## Observational Readout Domains

Structure formation in this framework is a single coupled medium-and-assembly history. Different observational probes sample different scales and epochs of that history:

### Galaxy Rotation Curves

Flat rotation curves require either a dark-matter halo or a modified gravitational response at low accelerations. In the Noether sea picture:
- A neutral-assembly halo must produce its density profile through formation and evolution; neutrality alone does not imply the Navarro–Frenk–White profile familiar from collisionless dark-matter simulations.
- Scale dependence in $G_{\mathrm{eff}}$ alone does not derive MOND-like acceleration scaling or flat rotation curves. The specific spatial response and baryonic source distribution must reproduce the measured relation.
- The Bullet Cluster and related systems compare gas, galaxies, and reconstructed lensing mass. An offset rejects a specified medium-only model only when that model cannot reproduce the full observations with its declared response and history. It does not exclude every possible medium theory or independently identify a neutral architrino assembly. The light-deflection map must be tested separately from matter acceleration.

### Local Missing-Baryon Benchmark

The local missing-baryon benchmark in [Dark Matter](./dark-matter.md#local-missing-baryon-benchmark) connects condensed stellar and gas mass $M_b=M_\star+M_g$, flat-equivalent velocity $V_f$, and the inferred halo mass $M_{200}$. Specify whether the enclosing mean density is 200 times the critical or mean matter density, and use that convention throughout. With $f_b$ the adopted cosmic baryon fraction, the deficit relative to that reference is

$$
M_X = f_bM_{200} - M_b
$$

[View →](../../../../equation-mapping.html#corpus-equation-1bd44cf36c3eac2f)

The quantity $M_X$ is a bookkeeping deficit, not a detected component or an automatically positive mass. Uncertainties in $f_b$, the halo convention, and the dynamical inference propagate into it. Tests of a smooth, low-scatter trend in $m_b=M_b/M_{200}$ require the actual sample, selection, and covariance, including the distinction between stellar and gas-dominated systems.

For the growth module, the retained data packet is

$$
D_{\mathrm{local\ baryon}}^{\mathrm{obs}}(E)
=
\{M_b,V_f,M_{200},m_b,M_X,\Sigma_{\mathrm{gas/lens}}\}_E,
$$

[View →](../../../../equation-mapping.html#corpus-equation-d16516cecaf232ee)

where $E$ labels the environment class and $\Sigma_{\mathrm{gas/lens}}$ records the gas and lensing reconstruction used for groups and clusters. A branch cannot explain this packet by feedback, circumgalactic retention, ejection to the intergalactic medium, or a velocity-factor recalibration unless the same source-history record also recovers the baryonic Tully-Fisher relation, group weak-lensing velocities, rich-cluster baryon closure, and cluster-offset behavior. The group-to-X-ray-cluster transition is therefore a high-value structure-formation band: it decides where Noether sea medium response, observed hot gas, and collisionless neutral-assembly loading must separate or couple.

### Cluster Mass Profiles

Clusters probe the intermediate regime ($\sim1$–$10$ Mpc). X-ray gas profiles and lensing supply distinct instruments, but inferred masses depend on hydrostatic support, nonthermal pressure, geometry, calibration, and the gravity model. Their agreement tests a joint matter-motion and light-deflection model; it is not automatically an independent measurement of the same $G_{\mathrm{eff}}$.

### Cosmic Shear and $S_8$

Weak lensing measures correlated image distortions. Inferring matter power requires a distance kernel, a map from matter to the lensing potential, and foreground and intrinsic-alignment modeling. The combination $S_8=\sigma_8\sqrt{\Omega_m/0.3}$ summarizes an amplitude degeneracy in particular survey fits:
- $\sigma_8$ is the rms linear matter contrast smoothed with a spherical top-hat of comoving radius $8h^{-1}\,\mathrm{Mpc}$. It depends on the initial spectrum, transfer, and $D(k,t_{\mathrm{eff}})$; $h$ is the observer Hubble normalization.
- CMB predictions evolved to low redshift and late-time shear inferences must use compatible models. The [Hubble/S8 Tensions](hubble-s8-tensions.md) benchmark table specifies historical Planck, DES-Y3, and KiDS-class comparisons; their significance is dataset- and model-dependent, not a timeless $2$–$3\sigma$ fact.
- Weaker late-time coupling can reduce growth relative to a matched model with stronger coupling. Whether it lowers inferred $S_8$ enough depends on the full background, source, and lensing history. The sign result below concerns a specified static susceptibility and does not itself predict $S_8$.

### CMB Lensing and Acoustic Peaks

The CMB power spectrum constrains initial perturbations processed through the photon–baryon system. Peak positions constrain the angular acoustic scale, a ratio of the sound horizon to the corresponding distance, rather than the absolute sound horizon alone. Heights also depend on matter, radiation, initial perturbations, and recombination. Lensing smooths peaks and produces higher-order correlations; predicting it requires the light-deflection potential along the path, not matter power alone when the gravitational response is modified.

The growth module provides:
- the matter power spectrum $P(k,z)$ and the response and distance kernels needed to predict $C_\ell^{\phi\phi}$,
- the growth history $D(k,z)$, with $k$ omitted only when growth is scale independent,
- the matter-acceleration and light-deflection responses that determine departures from a matched $\Lambda$CDM prediction (interface with [CMB.md](./CMB.md)).

This is an inference interface, not a direct ontology map. ACT/Planck-style CMB-lensing reconstructions first supply a lensing data product, compactly represented by $C_L^{\phi\phi}$. A valid medium-and-assembly growth model must then produce the same $C_L^{\phi\phi}$ from the same matter power spectrum, growth history, neutral-assembly loading, and Noether sea response variables used for galaxy clustering and low-redshift weak lensing. If the CMB-lensing fit requires one growth record while late-time shear or cluster offsets require another, the structure-formation branch has split the shared cosmology state rather than closed it.

The kinematic Sunyaev-Zeldovich effect probes halo motion through CMB temperature shifts from scattering by moving electrons. The [ACT/SDSS halo-pair analysis](https://arxiv.org/abs/2604.14327) fits an effective radial acceleration kernel $g(r)\propto r^{-n}$ using microwave maps and a galaxy catalogue, obtaining $n_{\mathrm{kSZ}}^{\mathrm{obs}}=2.1\pm0.3$ over physical separations $30$–$230\,\mathrm{Mpc}$. The kernel must be integrated against spatial correlations and projected into the pairwise kSZ estimator; it is not identical to the mean pairwise acceleration or a direct substrate-law measurement.

For a candidate history $\theta$, parameterize the effective interaction kernel to be passed through that forward model by
$$
g_\theta(r)\big|_{W_{\mathrm{kSZ}}}
\propto
r^{-n_\theta},
\qquad
W_{\mathrm{kSZ}}=[30,230]\,\mathrm{Mpc}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4c5aaaf80578ac1f)

For the same estimator, fitted exponent, scale convention, and nuisance treatment, a Gaussian summary diagnostic is
$$
\mathcal{R}_{\mathrm{kSZ}\text{-}force}(\theta)
=
\left(
\frac{n_\theta-2.1}{0.3}
\right)^2
+
\lambda_{\mathrm{shared}}
d_{\mathrm{shared}}\!\left(
\Pi_{\mathrm{kSZ}}\theta_{\mathrm{sea}},
\Pi_{\mathrm{WL/RSD}}\theta_{\mathrm{sea}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-45ff932993554856)

The $0.3$ uncertainty belongs to the published exponent fit; the Gaussian expression is not the full data likelihood. The physical-separation window and the correlation, optical-depth, and background assumptions of [Gallardo et al. (2026)](https://arxiv.org/html/2604.14327v1) must be carried into a comparison. The residual subscript labels an observer-level effective acceleration comparison. A finite shared-state penalty does not enforce exact history consistency. The same model must also predict CMB lensing, weak lensing, redshift-space distortions, and matter power.

The Lyman-$\alpha$ forest supplies a small-scale transfer gate on the same branch. Let $P_F^\theta(k,z)$ be the transmitted-flux power spectrum projected from the matter, thermal, ionization, and photon-transfer record. Then
$$
\mathcal R_{\mathrm{Ly}\alpha}(\theta)
=
\sum_z
\left\|
\mathbf C_{F,z}^{-1/2}
\left[
P_F^\theta(k,z)-P_F^{\mathrm{obs}}(k,z)
\right]
\right\|^2.
$$

[View →](../../../../equation-mapping.html#corpus-equation-ef499dbcee5e6c46)

Here $\mathbf C_{F,z}$ is the positive-definite covariance of the flux-power bins at redshift $z$. The sum assumes independent redshift blocks; correlated blocks require the full covariance. This is a flux-data recovery target, not a direct matter-power measurement. The thermal, ionization, and growth history must remain consistent with that used for the CMB optical depth.

Pre-BBN comparison branches enter structure formation only through the transfer record they leave behind. For any branch $X$ retained by [Inflation Model](./inflation-model.md#pre-bbn-comparison-gate) and [BBN Constraints](./BBN-constraints.md#pre-bbn-handoff-gate), the growth-side observable is
$$
\Delta P_X(k,z)
=
P(k,z\mid \theta_{\mathrm{sea}},\theta_X)
-
P(k,z\mid \theta_{\mathrm{sea}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-54d06df6116df70e)

This quantity must be evaluated with the same $\theta_{\mathrm{sea}}$ used for BBN, CMB, cluster offsets, weak lensing, and redshift-space distortions. If a weakly coupled component is invisible to light elements only by acquiring a free-streaming length, abundance, or interaction history that later changes independently in $P(k,z)$, $C_L^{\phi\phi}$, or halo statistics, the comparison branch fails the shared-record gate.

### High-Redshift Structure

Reports of massive, mature galaxies at $z > 10$ (from JWST and successors) test whether the growth history permits sufficient structure formation by early times. In the Noether sea framework:
- A larger effective coupling can enhance growth with background and initial conditions held fixed; a hotter or denser medium alone does not fix the coupling's sign or magnitude.
- Constant $G_{\mathrm{eff}}$ does not force the same high-redshift abundance as standard cosmology. Background history, initial power, baryonic processes, selection, and mass inference also matter. A discrepancy must be established for a specified dataset and model before invoking an altered growth law.

High-redshift quasars add the compact-source side of the same test. A massive quasar at large inferred redshift is not only a point on a distance curve; it is a joint record of seed inventory, feeding history, radiative efficiency, obscuration and selection, line-of-sight transfer, and the redshift extraction itself. A useful comparison object is
$$
\mathcal{R}_{\mathrm{QSO\text{-}grow}}(\theta)
=
d_M\!\left(
M_{\mathrm{BH}}^{\mathrm{obs}},
M_{\mathrm{BH}}^\theta[
\mathcal{H}_{\mathrm{seed}},
\mathcal{H}_{\mathrm{feed}},
\epsilon_{\mathrm{rad}},
\theta_{\mathrm{sea}}
]
\right)
+
d_z\!\left(
z_{\mathrm{QSO}}^{\mathrm{obs}},
Z^\theta[
\mathcal{S}_{E\to R},
\Theta_{\mathrm{sel}},
\Theta_{\mathrm{line}}
]
\right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-3e148cfbdad91ebb)

Here the first term tests whether the shared source history can grow the compact object, while the second tests whether the same source-to-receiver and selection records support the reported redshift. A branch fails this row if quasar growth is repaired by changing the age, redshift-transfer, or Noether sea state independently of the growth, CMB, lensing, and source-history records.

Little red dots are compact sources with red optical spectra. In [GLIMPSE-17775, studied by Kokorev et al. (2025)](https://arxiv.org/abs/2511.07515), JWST spectroscopy supports a dense-gas interpretation through line wings, absorption, and fluorescence. If electron scattering contributes to broad lines, a black-hole mass estimate based on orbital line broadening depends on the gas model. The structure-formation comparison must therefore connect the compact source, host light, and line-formation environment through one source history.

Abell 2744-QSO1 supplies a complementary host constraint. [Juodžbalis et al. (2026)](https://www.nature.com/articles/s41586-026-10579-4) use gravitational lensing and JWST/NIRSpec integral-field spectroscopy of narrow hydrogen emission to infer a central point mass and limit stellar mass at $z=7.04$. This is a dynamical inference conditioned on lensing, inclination, and gas-motion models. Its small inferred host contribution, together with the separately inferred low metallicity, constrains compact-object and host assembly histories; it does not uniquely determine their temporal order or the seed mechanism. Direct-collapse, heavy-seed, super-Eddington, and primordial-black-hole scenarios remain comparison routes.

For [MRG-M0138, studied by Newman et al.](https://arxiv.org/abs/2503.17478), JWST integral-field spectroscopy resolves stellar kinematics in a lensed quiescent galaxy at $z\simeq1.95$. The inferred inactive black-hole mass depends on the foreground lens and stellar dynamical model. The comparison connects black-hole growth, stellar buildup, and suppressed star formation; it does not independently identify the process that quenched the host.

### Top-Down vs Bottom-Up Discriminator

The framework should be evaluated on whether early-time growth behaves predominantly as hierarchical buildup (bottom-up), fragmentation-dominant assembly (top-down), or a mixed regime across scale and epoch. In practice, this is read from the joint evolution of the high-$z$ halo mass function, merger statistics, and large-scale filament maturity under one calibrated $G_{\text{eff}}(a,k)$ history.

### Largest Structures

Reports of connected structures on scales $\gtrsim200\,\mathrm{Mpc}$ test a specified clustering model only after accounting for selection, the structure-finding algorithm, and the number of possible searches. A statistically homogeneous distribution can contain large connected structures. Eternal background time does not establish an old, dynamically connected material population:
- A long material history must specify initial correlations, causal evolution, and population persistence before extra formation time can explain a structure.
- Finite-age scenarios must demonstrate that the observed structures are statistically compatible with the growth rate permitted by $D(z)$ and $P(k)$.

The scale-neutral homogeneity residual $\mathcal R_{\mathrm{hom}}$ in [Cosmology Ontology](./cosmology-ontology.md#inference-dependency-ledger) compares declared dimensionless statistics with survey-matched predictions. It belongs alongside $P(k,z)$, $D(k,z)$, lensing, and halo statistics. Differences between environments or source populations can be physical; a model fails when its predicted differences disagree with observations beyond the declared covariance and selection tolerance, not merely when the populations differ.

### Source-History Inversion

Galaxy and AGN environments are also records of source history, not only forward outputs of a growth model. Jet knots, lobes, host-galaxy structure, metallicity gradients, lensing maps, redshift residuals, and the surrounding Noether sea state should constrain the same formation, feeding, and release histories that enter the SMBH source term in [Dark Energy](./dark-energy.md#population-history-matters).

For a candidate shared medium-and-source record $\theta$, define a source-history inversion residual
$$
\mathcal{R}_{\mathrm{hist}}(\theta)
=
d_{\mathrm{obs}}\!\left(
Y_{\mathrm{gal/AGN}}^{\mathrm{obs}},
\Pi_{\mathrm{gal/AGN}}\,
\mathcal{F}\!\left[
\mathcal{H}_{\mathrm{form}},
\mathcal{H}_{\mathrm{feed}},
\mathcal{H}_{\mathrm{release}},
\theta_{\mathrm{sea}}
\right]
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-7e000792d8d28181)

where $Y_{\mathrm{gal/AGN}}^{\mathrm{obs}}$ denotes the chosen galaxy or AGN observable packet and $\Pi_{\mathrm{gal/AGN}}$ projects the shared history model onto the observables being compared. The same $\theta_{\mathrm{sea}}$ must also supply the growth, redshift, CMB, lensing, and dark-sector rows. If jet morphology or host evolution can be fit only by changing the Noether sea state independently of the cosmology packet, the branch is a local fit rather than a shared history.

---

## Scale Dependence of $G_{\text{eff}}$: Mechanism and Regime Map

A key distinguishing feature of the Noether sea-based framework is that $G_{\text{eff}}$ may carry genuine scale (and epoch) dependence arising from the constitutive properties of the Noether sea.

### Physical Origin

The effective gravitational coupling must be extracted from a specified medium history. The following regimes organize candidate mechanisms; their scale labels are comparison windows, not measured transitions or established response laws. The symbol $\bar R_{\mathrm{braid}}$ is the declared braid-radius statistic; the mean spacing also limits continuum validity.

| Scale regime | Candidate medium description | Response to establish |
|:---|:---|:---|
| $\lambda \gg \bar R_{\mathrm{braid}}$ and mean spacing | Linear elastic comparison | Whether $G_N$ is recovered in the weak-field limit |
| $\lambda \sim 1$–$10$ Mpc, moderate $\rho$ | Weakly nonlinear compliance | Small corrections; cluster-scale tests |
| $\lambda \lesssim$ kpc, low acceleration | Nonlinear stiffening or softening | Possible MOND-like behavior |
| $\lambda$ near braid size or mean spacing | Discrete population description | Domain where continuum error becomes significant |
| High density | Full constituent path history | Causal-root occupancy and any effective response change |

### Parameterization

For phenomenological work, write:

$$
G_{\text{eff}}(a, k) = G_N \bigl[1 + \mu(a, k)\bigr]
$$

[View →](../../../../equation-mapping.html#corpus-equation-858a7b7670c0d31a)

where $\mu(a, k)$ is a dimensionless modification function.

### Linear Constitutive Derivation of $\mu(a,k)$

The following is a conditional continuum calculation, not a linearization of an established physical Noether sea equilibrium. Applying it to the sea requires a realized background with acceleration balance and validated coefficients. Freeze the background over a local response window, use the effective comoving coordinates already declared, and let $\mathbf u$ be a physical displacement. Its fractional volume change is
$$
\vartheta_L \equiv a^{-1}\nabla_{\mathbf x_{\mathrm{eff}}}\cdot\mathbf u
$$

[View →](../../../../equation-mapping.html#corpus-equation-14c64e3d2934eb29)

Negative $\vartheta_L$ means compression. Define strain $u_{ij}=(\partial_{x_{\mathrm{eff}}^i}u_j+\partial_{x_{\mathrm{eff}}^j}u_i)/(2a)$, whose trace is $\vartheta_L$. This symbol is distinct from history label $\theta$ and component velocity divergence $\theta_x$. A Kelvin-Voigt comparison combines stress proportional to strain with stress proportional to strain rate:
$$
\delta \sigma_{ij}
=
K(a)\,\delta_{ij}\,\vartheta_L
+2S(a)\!\left(u_{ij}-\frac{1}{3}\delta_{ij}\vartheta_L\right)
+\zeta_{\text{bulk}}(a)\,\delta_{ij}\,\dot{\vartheta}_L
+2\eta_{\mathrm{vis}}(a)\!\left(\dot{u}_{ij}-\frac{1}{3}\delta_{ij}\dot{\vartheta}_L\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-500a4a13cf59a017)

Here $\delta\sigma_{ij}$ is stress perturbation, $K$ and $S$ are bulk and shear moduli with pressure units, and $\zeta_{\mathrm{bulk}}$ and $\eta_{\mathrm{vis}}$ are viscosities with pressure-times-time units. Dots use $t_{\mathrm{eff}}$. Subscripts distinguish these coefficients from shielding $\zeta(A)$ and causal-wake regularizer $\eta$. Passive elastic and viscous comparisons require positive elastic moduli and nonnegative viscosities; those signs do not establish stability of the coupled gravitational system.

Stress alone does not determine the scalar response. Additionally assume a longitudinal source coupling $g_m$, a restoring coefficient denoted $m_L^2$, and an overdamped equation with negligible inertia. At fixed background and spatial Fourier wavenumber $k$, the assumed response is
$$
\left[M_L(a)k^2/a^2 + m_L^2(a) - i\omega\,\Gamma_L(a)k^2/a^2\right]\vartheta_L(a,k,\omega)
=
g_m(a)\,\delta\rho_m(a,k,\omega)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ab273ab17ca69d13)

where
$$
M_L(a)\equiv K(a)+\frac{4}{3}S(a),
\qquad
\Gamma_L(a)\equiv \zeta_{\text{bulk}}(a)+\frac{4}{3}\eta_{\mathrm{vis}}(a)
$$

[View →](../../../../equation-mapping.html#corpus-equation-6624ca6af422330f)

The physical wavenumber is $k/a$, so the factors $a^{-2}$ are required. The symbol $m_L^2$ has units of pressure per squared length, not particle mass squared, and $g_m\delta\rho_m$ has those same units. The source, finite-range restoration, and neglect of inertia are extra assumptions beyond the stress law. A mechanical completion with inertia requires its kinetic response and additional initial data.

Use $e^{-i\omega t_{\mathrm{eff}}}$ for temporal Fourier modes. Define $A_L=M_Lk^2/a^2+m_L^2>0$ and $B_L=\Gamma_Lk^2/a^2\ge0$. The response equation is $B_L\dot\vartheta_L+A_L\vartheta_L=g_m\delta\rho_m$ with frozen coefficients. For $B_L>0$, its unforced mode is $\exp(-A_Lt_{\mathrm{eff}}/B_L)$; for $B_L=0$ it is an algebraic constraint. This proves a relaxation property of the assumed scalar equation only. An overdensity produces static compression when $g_m<0$. Increasing the positive restoring terms reduces the response magnitude without changing its sign.

For a minimal additional ansatz, suppose each displaced material element retains fixed carried energy over this response window. Linearizing its volume Jacobian gives $\delta u_{\mathrm{sea}}=-\bar u_{\mathrm{sea}}\vartheta_L$. This assumption is not general sea thermodynamics: an adiabatic fluid with pressure has $\delta u=-(\bar u+\bar p)\vartheta_L$, and source exchange adds further terms. Define the dimensionless susceptibility using mass-equivalent energy density:
$$
\delta u_{\text{sea}}(a,k,\omega)/c_0^2
=
-\frac{\bar{u}_{\text{sea}}(a)}{c_0^2}\,\vartheta_L(a,k,\omega)
=
\mu_{\text{sea}}(a,k,\omega)\,\delta\rho_m(a,k,\omega)
$$

[View →](../../../../equation-mapping.html#corpus-equation-19ee86226b43db38)

with susceptibility
$$
\mu_{\text{sea}}(a,k,\omega)
=
-\frac{\bar{u}_{\text{sea}}(a)\,g_m(a)/c_0^2}
{M_L(a)k^2/a^2+m_L^2(a)-i\omega\,\Gamma_L(a)k^2/a^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f75dcf676aa58c1d)

Finally assume that this mass-equivalent perturbation sources the same effective potential as matter with unit relative coupling and negligible additional pressure or anisotropic-stress source. This is an observer-level Poisson closure to recover, not a consequence of the substrate acceleration law:
$$
-k^2\Phi_{\mathrm{eff}}(a,k)=4\pi G_N a^2\bigl[\delta\rho_m+\delta u_{\text{sea}}/c_0^2\bigr]
=
4\pi G_N a^2\bigl[1+\mu_{\text{sea}}(a,k,\omega)\bigr]\delta\rho_m
$$

[View →](../../../../equation-mapping.html#corpus-equation-db5c7368c777da5e)

The potential $\Phi_{\mathrm{eff}}$ has squared-speed units. Under these additional assumptions,
$$
G_{\text{eff}}(a,k,\omega)=G_N\bigl[1+\mu_{\text{sea}}(a,k,\omega)\bigr],
\qquad
\mu(a,k,\omega)=\mu_{\text{sea}}(a,k,\omega)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f2d3519b7d633fc7)

A growing mode is not sinusoidal. Locally write $\delta\rho_m\propto e^{s_\rho t_{\mathrm{eff}}}$, so $\omega=i s_\rho$ and the denominator is $A_L+s_\rho B_L$. The source rate is $s_\rho=d\ln|\delta\rho_m|/dt_{\mathrm{eff}}=Hf+\dot{\bar\rho}_m/\bar\rho_m$, which becomes $H(f-3)$ for conserved pressureless matter; $Hf$ alone is the contrast growth rate. When coefficients vary slowly over the response time and the homogeneous transient is negligible, the local particular response is
$$
\mu_{\mathrm{grow}}(a,k;s_\rho)
=
-\frac{\bar u_{\mathrm{sea}}(a)g_m(a)/c_0^2}
{M_L(a)k^2/a^2+m_L^2(a)+s_\rho\Gamma_L(a)k^2/a^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-002befecb3fc00bd)

This expression requires a nonzero denominator and the stated local exponential approximation; if source evolution competes with relaxation, solve the time-dependent response with its history. Taking the real part at real $\omega=Hf$ computes an in-phase oscillatory response and does not solve the growth problem. In the strictly quasi-static limit $|s_\rho|B_L\ll A_L$, with background variations also slow compared with $B_L/A_L$, the response reduces to
$$
\mu(a,k)
\approx
-\frac{\bar u_{\mathrm{sea}}(a)\,g_m(a)/c_0^2}
{m_L^2(a)+M_L(a)k^2/a^2}
=
\frac{\mu_0(a)}{1+\bigl(k/k_\ast(a)\bigr)^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3dc324e5bcd8ddaf)

$$
\mu_0(a)\equiv-\frac{\bar u_{\mathrm{sea}}(a)\,g_m(a)}{c_0^2m_L^2(a)},
\qquad
k_\ast(a)^2\equiv\frac{a^2m_L^2(a)}{M_L(a)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9eafb824ea09421e)

The finite-range parameterization requires $m_L^2>0$ and $M_L>0$; otherwise retain the preceding denominator without dividing by $m_L^2$. Setting $g_m=0$ removes this driven correction when independent sea transients are absent. General-relativistic growth is recovered only if the background, matter inventory, initial conditions, and other perturbation equations also match. There is no universal observational bound $|\mu|\lesssim0.1$ for an arbitrary function of scale and epoch: a bound requires a parameterization, survey likelihood, priors, and a specification of how both matter acceleration and light deflection respond.

A finite-range or screening comparison adds one useful local-recovery gate without importing massive-gravity ontology. If a local constitutive invariant $\mathcal{I}_{\mathrm{loc}}$ suppresses the response in dense or strongly tested regimes, write
$$
G_{\text{eff}}(a,k,\mathcal{I}_{\mathrm{loc}})
=
G_N\left[1+\mu(a,k)S_{\mathrm{loc}}(\mathcal{I}_{\mathrm{loc}})\right],
\qquad
0\leq S_{\mathrm{loc}}\leq 1
$$

[View →](../../../../equation-mapping.html#corpus-equation-059cf9517a79ca91)

For a record $r$ whose observable has been mapped to this scalar response, let $\epsilon_r$ be its dimensionless tolerance. A necessary scalar condition is
$$
\left|\mu(a_r,k_r)S_{\mathrm{loc}}(\mathcal{I}_r)\right|<\epsilon_r
$$

[View →](../../../../equation-mapping.html#corpus-equation-f7d6c88b62143c87)

This inequality alone does not certify solar-system, binary-pulsar, lensing, or gravitational-wave recovery. Those observations can depend on additional metric potentials, radiative modes, and time-dependent response. Cosmological deviations must satisfy their actual observables as well as BAO, CMB lensing, supernova distances, and $f\sigma_8$, using one coefficient record without channel-specific retuning.

For the same $G_N$, background, matter inventory, and initial conditions, suppressing the instantaneous gravitational source below its general-relativistic value requires $\mu<0$. In the static fixed-carried-energy ansatz with $\bar u_{\mathrm{sea}}>0$, that sign requires $g_m>0$, opposite to the compression branch, or another response contribution. Cooling and stiffness changes alone do not establish it. A lower final $S_8$ can also arise through the initial spectrum, expansion history, free streaming, or suppression relative to an earlier enhanced coupling; it does not universally require $\mu<0$. Any proposed explanation must compute the full shared growth and lensing history. None of these algebraic comparisons certifies a physical Noether sea branch.

---

## Growth-Module Interface

In the modular cosmology architecture, this document provides:

**Physical history and required projections**:
- native medium and constituent histories in $T,\mathbf X$,
- projected Noether sea equation of state $w_{\mathrm{sea}}(t_{\mathrm{eff}})$ and energy density $u_{\mathrm{sea}}(t_{\mathrm{eff}})$,
- projected neutral-assembly density $\rho_{\mathrm{dm}}(t_{\mathrm{eff}})$ and interaction rates,
- effective gravitational response $G_{\mathrm{eff}}(t_{\mathrm{eff}},k)$ and the light-deflection response,
- initial perturbation spectrum $P_0(k)$ and component transfer data. These statistical and constitutive summaries are outputs to derive or explicit comparison inputs, not primitive ontology.

**Effective outputs** (to observational modules):
- linear growth factor $D(k,z)$ and growth rate $f(k,z)$, with $k$ omitted only in a scale-independent limit,
- matter power spectrum $P(k, z)$,
- $\sigma_8(z)$ and $S_8(z)$ for comparison with survey data,
- lensing convergence power spectrum $C_\ell^{\kappa\kappa}$ for CMB and cosmic-shear analyses.

**Bridge variables** shared with:
- [dark-matter.md](./dark-matter.md): neutral-assembly properties, relic abundance, interaction rates,
- [hubble-s8-tensions.md](./hubble-s8-tensions.md): $H(z)$, $f\sigma_8(z)$, and tension-resolution diagnostics,
- [CMB.md](./CMB.md): primordial spectrum inputs, lensing amplitude, acoustic-peak constraints,
- [spacetime/emergent-metric.md](../spacetime/emergent-metric.md): the Noether sea state variables from which $G_{\text{eff}}$ is computed.

---

## Synthesis

Structure formation supplies a coupled recovery problem for matter clustering, medium response, and observer inference in a fixed Euclidean void. The chapter derives a susceptibility only within an explicitly assumed continuum model, distinguishes its oscillatory and evolving-source responses, and states the additional source, density, and chart maps needed to use it. Deriving those maps and the coefficients $\{K,S,\zeta_{\mathrm{bulk}},\eta_{\mathrm{vis}},m_L,g_m\}(a)$ from realized architrino histories remains open. A successful account must then recover the joint growth, lensing, abundance, and source-history observations without treating the assumed model as evidence for its own physical realization.
