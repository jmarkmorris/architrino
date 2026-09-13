# Synthetic Observables and $\mathbb{U}_{\text{now}}$ Logging

The virtual $\mathbb{U}_{\text{now}}$ perspective provides a canonical log of the [complete modeled state](../../foundations/ontology.md), meaning every modeled entity and its history at the same absolute time $T$, the one universal clock that orders the [Euclidean void](../../foundations/euclidean-void.md). The entities are [architrinos](../../foundations/architrino.md), point transceivers of fixed polarity, each of whose past positions emits a causal wake, an expanding spherical disturbance that travels outward at the wake speed $c_f$; the complete state $\mathbb{U}_{\text{now}}\equiv S(T)$ therefore holds every architrino's position, velocity, polarity, and the retained path history that the delayed acceleration law of the [Master Equation](../../dynamics/master-equation.md) reads. Detector-like synthetic observables are post-processed from that log through a declared model of a [Physical Observer](../../spacetime/observer-framework.md#physical-observers), an assembly-built clock or detector embedded in the [Noether sea](../../spacetime/noether-sea.md), so exact simulation bookkeeping remains distinct from the quantities that stand in for measurements. We work in normalized wake-speed units with $c_f=1$; the definitions below keep $c_f$ symbolic so that the dimensions of each quantity stay visible.

## $\mathbb{U}_{\text{now}}$ Logging Standard

The canonical $\mathbb{U}_{\text{now}}$ universe-state perspective is used across all simulation tiers of the [Simulation Run Protocols](run-protocols.md) for logging, diagnostics, and synthetic datasets. It is not a physical device: the perspective is the complete ledger $\mathbb{U}_{\text{now}}\equiv S(T)$ itself, and logging it is a bookkeeping operation on the full microstate, carried out by the $\mathbb{U}_{\text{now}}$ sensors defined next rather than by any observer inside the simulated universe.

### Definition
A $\mathbb{U}_{\text{now}}$ log is produced by an array of **$\mathbb{U}_{\text{now}}$ sensors**: fixed virtual probes that read the complete universe state $\mathbb{U}_{\text{now}}$ directly at declared sample points, as the [Master Simulation Protocol](run-protocols.md#master-simulation-protocol-absolute-frame) requires. A sensor is a simulation instrument, not a Physical Observer: it is not an architrino, it emits no wake, receives no acceleration, and carries no clock of its own. The log is defined by:
- Fixed Euclidean sample points or declared sensor worldlines $\{\mathbf X_k\}$ in a declared coordinate scaffold on $\mathbb{R}^3$; for a moving sensor every condition below uses its position at the reception time
- Access to the full state $S(T) = \{(\mathbf X_i(T), \mathbf V_i(T), q_i, \dots)\}$ for all architrinos, where the ellipsis stands for the retained path-history and provenance data that the delayed dynamics require
- Output channels:
  - Local potential $\Phi(\mathbf X_k,T)$: the mollified bookkeeping potential $\Phi_\eta$ reconstructed from the superposed causal wakes of the run at its declared causal-wake-surface width $\eta$, as the [Master Simulation Protocol](run-protocols.md#master-simulation-protocol-absolute-frame) defines it; an evaluation channel for comparison, not the substrate law
  - Local gradient $\nabla_{\mathbf X}\Phi(\mathbf X_k,T)$ (a potential-gradient channel, read as an acceleration proxy only under the declared calibration; the substrate acceleration is the per-hit sum of the [Master Equation](../../dynamics/master-equation.md#the-master-equation-canonical-form), which enters the log through the provenance table's contribution strength and the retained worldlines in $S(T)$)
  - Optional local Noether sea state variables (e.g., the Noether braid density $\rho_{\text{NS}}$, alignment/orientation metrics)
  - Causal wake surface provenance/event tags: for each received contribution at $(\mathbf X_k,T_r)$, record `transmitter_id` together with the emission time $T_t$, satisfying $\| \mathbf X_k - \mathbf X_{\text{transmitter}}(T_t)\| = c_f (T_r - T_t)$, the causal-time condition that the wake surface emitted at $T_t$ has expanded exactly to the sensor by the reception time $T_r$; each such $T_t$ is a causal root of that reception event
  - Photon packet provenance when a radiation channel is declared: transmitter event, path segment, before/after frequency, recoil or medium-energy exchange, remnant entry, and signed exchange residual
  - Optional finite-window operator diagnostics for declared reconstructed channels $\mathbf{Y}_\eta$, including the Gauss, Stokes, and wake-surface normalization residuals defined under the validation checks below

### Minimal synthetic products
- Time series: $\Phi(T)$, $\nabla_{\mathbf X}\Phi(T)$ at fixed points ("stationary detectors")
- Snapshot potential maps: $\Phi(\mathbf X,T_\ast)$, $\nabla_{\mathbf X}\Phi(\mathbf X,T_\ast)$ over grids at a fixed evaluation time $T_\ast$
- Provenance tables: `receiver_id`, $T_r$, `transmitter_id`, $T_t$, `contribution_strength`; the emission-time column is also carried as the compatibility field `t_emit` declared in the [run protocol](run-protocols.md#runtime-instantiation)
- Propagation diagnostics: arrival-time distributions, dispersion tests, effective $c_{\text{eff}}$ estimates. Primitive wakes propagate at exactly $c_f$ by construction, so at the sensors their arrival times are checked against the causal-time condition above, which for a transmitter at rest and a sensor at distance $r_k$ from it is the closed form $T_r=T_t+r_k$ used by [Architrino Simulation Tests](architrino.md); a dispersion test or an estimate of the dressed assembly-channel speed $c_{\text{eff}}$ applies only to a declared assembly-level signal propagating through a retained Noether sea population
- Coarse kinetic moments when a continuum reduction is claimed: density, current, momentum-current tensor, energy-flux vector, and memory-current residuals derived from the same event-root records, meaning the per-hit records of solved causal roots
- Stochastic summaries when a noise model is claimed: drift vector, diffusion tensor, first two distribution moments, and direct ensemble comparison against event-root histories
- Reaction-diffusion probes when pattern or front language is claimed: front speed, unstable-mode band, selected wavelength, and conservation or source ledger for each reaction term
- Jet/outflow source products when a collimated release or working surface is claimed: beam radius, head radius, bow-shock speed, Mach number, jet-to-ambient density ratio, knot spacing, cooling ratio, synthetic line map, synthetic synchrotron map, inverse-Compton map, polarization fraction, and polarization angle
- Cosmology-facing photon products when redshift is inferred: total $Z_X$, endpoint/source/launch/path decomposition, signed path-frequency exchange $Y_{X,\mathrm{path}}$, packet-cadence stretch, flux factors, and image-sharpness diagnostics, in the logarithmic redshift-budget convention of the [Redshift-Budget Toy Model](redshift-budget-toy-model.md#replay-equation)

### Mapping: $\mathbb{U}_{\text{now}}$ data → Physical observables
Synthetic observables must be generated by post-processing $\mathbb{U}_{\text{now}}$ logs with a model of a *physical* observer (assembly clock/detector), a [Physical Observer](../../spacetime/observer-framework.md#physical-observers) in the sense of the Observer Framework. This post-processing is the observer projection described in [Ontology](../../foundations/ontology.md), a deliberate sequence of losses from the complete state to an accessible record, so a synthetic observable is a finite-precision record rather than a second copy of the state:
1. Extract local Noether sea state along the detector worldline $\mathbf X_{\text{det}}(T)$
2. Compute derived detector clock time $\tau_{\text{det}}$ via the declared clock map $d\tau = F(\text{Noether sea state}, \mathbf V_{\text{det}}, \Phi, \nabla_{\mathbf X}\Phi, \dots)\,dT$, the shorthand for the counted-phase clock channel $d\tau_{\mathcal A}=(\Omega_{\mathcal A}/\Omega_{\mathcal A}^{(0)})\,dT$ declared in [Proper Time and Time Dilation](../../spacetime/proper-time-and-time-dilation.md); here $\mathbf V_{\text{det}}$ is the detector's group velocity, and an observer comparison projects the result to the observer-chart rate $d\tau/dt_{\mathrm{eff}}$ as that chapter requires
3. Generate detector-like outputs:
   - clock readings $\tau(T)$
   - photon arrival times and frequency shifts, with signed exchange entries separated from endpoint cadence and launch geometry
   - inferred "geodesics" (effective paths) from travel-time minimization through the Noether sea effective signal speed $c_{\text{eff}}$, an observer-level comparison construct whose effective-metric closure remains a recovery target

Synthetic observables are envelope-limited: each is valid only within the scope envelope that the [Master Simulation Protocol](run-protocols.md#master-simulation-protocol-absolute-frame) declares for the run, its spatial domain, absolute-time span, entity count, resolution, history depth, output channels, and feedback mode. A detector-like output should carry the sampling cadence, aperture or worldline, sensitivity threshold, and intervention context that generated it. A reduced channel, such as a kinetic moment or a drift-diffusion surrogate, is justified for a declared observable only after that observable's dependence on the retained information has been derived and the effect of the discarded information bounded; agreement of a summary statistic with the direct ensemble on the compared moments does not by itself establish that the summary suffices for other claims. When a near-threshold branch, reaction, or record-forming event can flip under unresolved perturbations, the packet should report a threshold margin and alternate-outcome band instead of promoting one microhistory as uniquely observed.

### Validation checks (must pass)
- **Causality residual (per record $m$):**
  $$
  \rho_m \equiv
  \frac{\left|\|\mathbf X_k-\mathbf X_{i_m}(T_{t,m})\|-c_f\,(T_m-T_{t,m})\right|}
  {\max(c_f\Delta T,\varepsilon_r)}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-6ff7273d4e81cb6c)

  where $\mathbf X_k$ is the sensor position, $i_m$ is the transmitter identity of record $m$, $T_{t,m}$ its solved emission time, $T_m$ its reception time (the $T_r$ of the provenance table), $\Delta T$ the absolute-time step, and $\varepsilon_r>0$ is a predeclared floor with units of length. The numerator is the defect of the causal-time condition for the logged root, the transmitter-to-sensor distance at emission minus the distance the wake has travelled, measured against one step's wake travel; this residual is a dimensionless root-condition defect and is unrelated to the wake-surface density $\rho_{m,\eta}$ of the normalization check below. Pass if at least $99.9\%$ of records satisfy $\rho_m\le 10^{-2}$ and $\max_m \rho_m \le 5\times 10^{-2}$.

- **Temporal ordering check:**
  $$
  \theta_m \equiv \frac{T_{t,m}-T_m}{\Delta T}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-7ac22ecc1b685464)

  Here $\theta_m$ is the emission time minus the reception time of record $m$ in units of the step, so a legal hit has $\theta_m<0$ and a positive value would mean a wake received before it was emitted. Pass if fraction with $\theta_m>10^{-9}$ is $\le 10^{-6}$. A record with $\theta_m=0$ within the same tolerance is a coincident-time root, which the convention $H(0)=0$ of the [Master Equation](../../dynamics/master-equation.md#conventions-and-exclusions) excludes; such records are reported as excluded rather than counted as passing hits.

- **Cross-integrator parity:** For any channel $Y$ logged by two integrators $A$ and $B$ at matched resolution, use a predeclared floor $\varepsilon_{0,Y}$ with the same units as the norm of $Y$:
  $$
  E_{\mathrm{rel}}(Y;A,B)\equiv
  \frac{\|R(Y_B)-Y_A\|_{L^2}}{\|R(Y_B)\|_{L^2}+\varepsilon_{0,Y}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-45d921bacfcb3108)

  Here $R$ restricts run $B$ to run $A$'s sampling grid, and $\|\cdot\|_{L^2}$ is the normalized root-mean-square norm over the window and sensor set defined in [Convergence Tests](convergence-tests.md#comparison-metrics-required), so that the floor keeps one meaning whatever the sample count. Pass if $E_{\mathrm{rel}}(\Phi)\le 0.03$ and $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05$. Passing shows implementation parity on the declared channels; it is not an independent correctness oracle.

- **Finite-window Gauss/Stokes residuals:** for any declared reconstructed vector channel $\mathbf{Y}_\eta$ on $\Sigma_T$, use
  $$
  R_G[V,T;\mathbf{Y}_\eta]\equiv
  \frac{\left|\int_{\partial V}\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\,dS-\int_V\nabla\!\cdot\!\mathbf{Y}_\eta\,dV\right|}
  {\int_{\partial V}\left|\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\int_V\left|\nabla\!\cdot\!\mathbf{Y}_\eta\right|\,dV+\varepsilon_G}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-de36de38c8014c6a)

  and
  $$
  R_S[S,T;\mathbf{Y}_\eta]\equiv
  \frac{\left|\oint_{\partial S}\mathbf{Y}_\eta\!\cdot dX^i-\int_S(\nabla_{\mathbf X}\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\,dS\right|}
  {\oint_{\partial S}\left|\mathbf{Y}_\eta\!\cdot dX^i\right|+\int_S\left|(\nabla_{\mathbf X}\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\varepsilon_S}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-71bcfdb75185b2f8)

  Here $V$ is a declared volume with closed boundary surface $\partial V$, $S$ a declared surface with boundary loop $\partial S$, $\hat{\mathbf n}$ the unit normal (outward on $\partial V$, oriented consistently with the traversal of $\partial S$ on $S$), $dS$ and $dV$ the surface and volume elements, and the line element of $R_S$ is $dX^i$ contracted with the components of $\mathbf Y_\eta$. Gauss's theorem states that the outward flux of a smooth vector field through a closed surface equals the volume integral of its divergence, and Stokes's theorem states that the circulation of a smooth field around a closed loop equals the flux of its curl through any spanning surface; both hold exactly on the flat slice $\Sigma_T$, so each numerator vanishes for the continuum channel and a nonzero residual measures the discretization or reconstruction defect. $\varepsilon_G$ and $\varepsilon_S$ are predeclared floors with the units of their respective integral channels. Pass if both residuals are $\le 2\times10^{-2}$ on resolved windows and decrease under spatial refinement. These are diagnostics on reconstructed continuum channels, not claims that the channel is substrate ontology.

- **Distributional wake-surface normalization:** for emitted wake surface $m$ with source strength $q_m$, causal delay $\Delta_m=T-T_{t,m}$, and radial annulus $R_-\le r_m\le R_+$ around the emission point, use
  $$
  Q^{\mathrm{ann}}_{m,\eta}=
  q_mH(\Delta_m)\int_{R_-}^{R_+}\delta_\eta(r_m-c_f\Delta_m)\,dr_m
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-68fb0e6740be2980)

  and
  $$
  R_{N,m}\equiv
  \frac{\left|\int_{R_-\le r_m\le R_+}\rho_{m,\eta}(T,\mathbf X)\,dV-Q^{\mathrm{ann}}_{m,\eta}\right|}
  {|q_m|+\varepsilon_q}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-16c23eb963833104)

  Here $r_m$ is the distance from the emission point, $\delta_\eta$ is the Gaussian mollifier of width $\eta$, $H$ is the Heaviside step with $H(0)=0$, and $\rho_{m,\eta}(T,\mathbf X)=q_m\,\delta_\eta(r_m-c_f\Delta_m)H(\Delta_m)/(4\pi r_m^2)$ is the mollified wake-surface density of the [mathematics style guide](../../archie/mathematics-style-guide.md#distributions-and-regularization-causal-wake-surfaces). The check holds because the $1/(4\pi r_m^2)$ surface density cancels the shell volume element $4\pi r_m^2\,dr_m$, so the volume integral of the continuum density over any annulus equals $Q^{\mathrm{ann}}_{m,\eta}$ exactly, whether or not the annulus contains the whole surface; a nonzero residual therefore measures the discretized reconstruction, not the definition. $\varepsilon_q$ is a predeclared source-strength floor with the same units as $q_m$. Pass if at least $99.9\%$ of emitted wake surfaces satisfy $R_{N,m}\le 10^{-2}$ and the maximum resolved-window residual is $\le 5\times10^{-2}$.

- **Photon-frequency exchange closure:** when a photon packet changes frequency during transport, the logged before/after frequencies must close with medium, recoil, and remnant entries:
  $$
  R_{\nu\text{-}\mathrm{ex},m}
  =
  \frac{
  \left|
  E_\gamma(\nu_m^{+})-E_\gamma(\nu_m^{-})
  +\Delta E_{\mathrm{med},m}
  +\Delta E_{\mathrm{recoil},m}
  +\Delta E_{\mathrm{rem},m}
  \right|
  }
  {\varepsilon_{\nu\text{-}\mathrm{ex}}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-052bcc73fc3ef5ff)

  Here $E_\gamma(\nu)$ is the declared photon-channel energy map, $\nu_m^{-}$ and $\nu_m^{+}$ are the logged frequencies before and after exchange event $m$, each $\Delta E$ is the energy gained by the named reservoir (the intervening medium, the recoiling assembly, and the remnant), so the bracketed sum vanishes exactly when the exchange conserves energy, and $\varepsilon_{\nu\text{-}\mathrm{ex}}>0$ is a predeclared photon-exchange tolerance with units of energy, the tolerance the toy model writes $E_{\mathrm{tol}}$; it is distinct from the normalized energy-drift observable $\epsilon_E$ in [Convergence Tests](convergence-tests.md). Pass if $R_{\nu\text{-}\mathrm{ex},m}\le1$. The medium, recoil, and remnant entries use the same signed balance equation and outcome-neutral ledger convention defined in the [Redshift-Budget Toy Model](redshift-budget-toy-model.md#replay-equation). The observer-level comparison $E_\gamma=h\nu$ may be used only as a labeled recovery calibration after the $\mathbb{A}\mathbb{A}\mathbb{A}$ map is declared; it is not an architrino-level premise. A cosmology-facing redshift or blueshift product may consume this entry only after the residual is reported with the same photon provenance used for arrival-time, flux, and image-sharpness outputs.

- **Operator consistency across PDE and event-root runs:** when the same reconstructed channel is produced both by a partial-differential-equation (PDE) reduction on a grid and by direct event-root evaluation, resample the event-root reconstruction onto the PDE grid and define
  $$
  \Delta\mathbf{Y}_\eta\equiv
  \mathbf{Y}^{\mathrm{PDE}}_\eta-R(\mathbf{Y}^{\mathrm{root}}_\eta),
  \qquad
  E_{\mathrm{op}}(W)\equiv
  \frac{\left\|\Delta\mathbf{Y}_\eta\right\|_{L^2(W)}}
  {\left\|R(\mathbf{Y}^{\mathrm{root}}_\eta)\right\|_{L^2(W)}+\varepsilon_{0,Y}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-7ed20edd08550fc8)

  Here $R$ is that resampling, $W$ is the declared validation window, the norm is the same normalized root-mean-square norm as in the cross-integrator check, and $\varepsilon_{0,Y}$ is the floor for that channel; the Gauss and Stokes residuals $R_G$ and $R_S$ are reported for each of the two channels separately on the same $V$ and $S$, because those residuals test whether a channel satisfies the integral identities, not how far two channels lie apart. Pass if $E_{\mathrm{op}}\le0.03$ on the declared validation windows and decreases under temporal/history/spatial refinement, with both channels' own Gauss/Stokes residuals passing. This is a parity check on the common observable map, not independent evidence for that map or the canonical law.

- **Curvilinear-coordinate hygiene:** finite-window residuals must use the coordinate weights and operator formulas of the declared Euclidean scaffold. In spherical coordinates $(r,\theta,\varphi)$,
  $$
  w_V=r^2\sin\theta\,\Delta r\,\Delta\theta\,\Delta\varphi,\qquad
  w_{S_R}=R^2\sin\theta\,\Delta\theta\,\Delta\varphi
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-e4643ea121b6bf2e)

  and a radial channel must evaluate $\nabla\!\cdot(F_r\hat{\mathbf{r}})$ as
  $$
  \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2F_r\right)
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-abc15d6ef5fa2b06)

  not as $\partial_rF_r$. Here $w_V$ is the volume weight of a cell of extents $(\Delta r,\Delta\theta,\Delta\varphi)$, $w_{S_R}$ is the surface weight on the sphere $S_R$ of radius $R$ (a radius, unrelated to the resampling operator $R(\cdot)$, which always appears with its argument), and $F_r$ is the radial component of the channel; the second form is the divergence of a radial field in spherical coordinates, and the bare radial derivative omits the $2F_r/r$ term that the change of shell area with radius contributes. Fail the run if the coordinate scaffold does not declare these weights.

- **Provenance distribution agreement:** for `t_emit` distributions, require
  $$
  D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+\varepsilon_T} \le 0.08,
  \qquad
  D_{JS}\equiv \mathrm{JSD}(P_A\|P_B)\le 0.03
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-1c462490bd67bf21)

  Here $P_A$ and $P_B$ are the distributions of solved emission times over the provenance records of the two compared runs, $W_1$ is the 1-Wasserstein distance, the smallest average displacement of emission-time mass that turns one distribution into the other, $\mathrm{IQR}(P_B)$ is the interquartile range of the finer run's distribution, $\varepsilon_T$ is a predeclared absolute-time floor, and $\mathrm{JSD}$ is the Jensen–Shannon divergence with logarithm base $2$, evaluated on the discretization declared before the run and shared by both runs, as [Convergence Tests](convergence-tests.md#comparison-metrics-required) requires, because raw continuous samples have disjoint support and would give $D_{JS}=1$ whatever the agreement. The letters $P_A$ and $P_B$ name distributions; the period of a pulsed inlet below is written $P$ as a cycle period.

- **Kinetic-moment closure:** for any promoted continuum observable, compute the direct event-root moments
  $$
  \rho_{\mathrm{dir}},\quad
  \mathbf{j}_{\mathrm{dir}},\quad
  \Pi_{\mathrm{dir}}^{ij},\quad
  \mathbf{J}_{e,\mathrm{dir}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-a3a1b083c3f39089)

  and compare them with the reduced continuum reconstruction. Here $\rho_{\mathrm{dir}}$ is the direct density of the declared kind (architrino count or polarity-weighted), $\mathbf{j}_{\mathrm{dir}}$ its velocity-weighted current, $\Pi_{\mathrm{dir}}^{ij}$ the second velocity moment, and $\mathbf{J}_{e,\mathrm{dir}}$ the flux of the declared energy bookkeeping; the names momentum-current and energy-flux belong to assembly-level bookkeeping through the declared bulk conversion, since architrinos carry no mass. The reduced channel must report
  $$
  R_{\mathrm{mom}}
  =
  \max_Y
  \frac{
  \left\|Y_{\mathrm{cg}}-R(Y_{\mathrm{dir}})\right\|_{L^2(W)}
  }{
  \left\|R(Y_{\mathrm{dir}})\right\|_{L^2(W)}+\varepsilon_{0,Y}
  }
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-4417dca37385cf10)

  where $Y$ ranges over the retained density, current, momentum-current, and energy-flux channels, $Y_{\mathrm{cg}}$ is the reduced continuum channel, and $R(Y_{\mathrm{dir}})$ is the direct moment resampled onto its grid. Pass if $R_{\mathrm{mom}}\le0.05$ and the omitted memory-current residual, the contribution of unresolved path history that the reduced moment equations drop, decreases under refinement.

- **Drift-diffusion reconstruction:** if a Fokker-Planck or Langevin surrogate is emitted, a reduced description in which unresolved architrino history enters a reduced variable $z$ as noise, estimate drift and diffusion from increments over a declared coarse-graining interval $\Delta T_{\mathrm{cg}}$,
  $$
  u^a(z)
  =
  \frac{\langle\Delta z^a\rangle_z}{\Delta T_{\mathrm{cg}}},
  \qquad
  D^{ab}(z)
  =
  \frac{\langle\Delta z^a\Delta z^b\rangle_z}{2\Delta T_{\mathrm{cg}}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-fd952a25a000734c)

  Here $\Delta z$ is the increment of $z$ over $\Delta T_{\mathrm{cg}}$ and $\langle\cdot\rangle_z$ is the average over direct event-root histories passing through $z$. The interval cannot be sent to zero: the substrate increments are deterministic and smooth, so $\Delta z$ scales as the interval and the second-moment quotient vanishes linearly with it; diffusion is a property of the coarse-grained description and exists only for $\Delta T_{\mathrm{cg}}$ longer than the correlation time of the unresolved history and shorter than the evolution time of $z$. The packet declares that interval and reports the estimates as stable across a declared range of it. The synthetic distribution must match direct event-root ensembles in $\langle z\rangle$ and $\operatorname{Cov}(z)$ before higher stochastic claims are trusted. Higher cumulants may differ from the surrogate unless a separate closure entry has been declared.

- **Reaction-diffusion and pattern probes:** when a reduced scalar or multi-channel field $y$ obeys
  $$
  \partial_T y^a
  =
  D^{ab}\nabla^2 y_b
  +
  F^a(y)
  +
  R_{\mathrm{rd}}^a
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-934747a7edb23032)

  with $y^a$ the reduced channels, $D^{ab}$ their diffusion matrix, $\nabla^2$ the Euclidean Laplacian on $\Sigma_T$, $F^a(y)$ the local reaction term, and $R_{\mathrm{rd}}^a$ the residual the reduction leaves unmodeled, the packet must report the fixed points, the linearized growth matrix, the unstable wavenumber band if one exists, and the front-speed estimate if a traveling-front claim is made. For two-channel pattern claims, the Turing-style gate, a diffusion-driven instability, is that the homogeneous fixed point is stable before diffusion and that the diffusion-shifted linear operator has a declared finite unstable band. Without those entries, visual pattern formation is not a validated synthetic observable.

- **Jet/outflow head and radiation probes:** when a simulation claims an astrophysical jet, outflow, knot chain, or working surface, the synthetic packet must compare the logged event-root dynamics to the observer-level jet-head and radiation benchmarks of [Synchrotron](../../reactions/synchrotron.md#jet-and-outflow-source-benchmarks). For a supersonic head with jet speed $v_j$, beam radius $R_j$, head radius $R_h$, density ratio $\eta_j=\rho_j/\rho_a$ (the jet-to-ambient mass-density ratio, unrelated to the regularization width $\eta$), and $a_h=(R_j/R_h)^2$, the bow-shock speed target is
  $$
  v_{\mathrm{bs,std}}
  =
  v_j
  \left[
  1+(\eta_j a_h)^{-1/2}
  \right]^{-1}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-0dedd040f9d66e89)

  This is the advance speed of the jet head, the working surface at which the beam's ram pressure balances the ambient medium's, obtained by solving that balance, $\rho_j(v_j-v_{\mathrm{bs,std}})^2R_j^2=\rho_a v_{\mathrm{bs,std}}^2R_h^2$, for the head speed: a light jet with $\eta_ja_h\ll1$ advances slowly and a heavy one at nearly $v_j$. The bow shock itself runs ahead of that surface by a shock-jump factor, so the mapped speed $v_{\mathrm{bs,map}}$ must be measured as the same head-advance speed, and the packet states which surface it tracks. The head residual is
  $$
  R_{\mathrm{head}}
  =
  \left|
  \frac{v_{\mathrm{bs,map}}}{v_{\mathrm{bs,std}}}
  -1
  \right|
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-1a782a336acb1682)

  For radiative shocks, also report
  $$
  \mathcal{R}_{\mathrm{cool}}
  =
  \frac{t_{\mathrm{cool}}}{t_{\mathrm{dyn}}},
  \qquad
  t_{\mathrm{dyn}}\sim\frac{\ell_j}{v_j}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-8a0d4df15f3b9d02)

  where $t_{\mathrm{cool}}$ is the radiative cooling time of the shocked gas and $t_{\mathrm{dyn}}$ the flow time across the jet length scale $\ell_j$, both observer-level comparison timescales, and route the synthetic emission to thermal line/free-free entries when $\mathcal{R}_{\mathrm{cool}}\ll1$ (the gas cools before it flows away), or to adiabatic, particle-acceleration, synchrotron, inverse-Compton, cocoon, and lobe entries when $\mathcal{R}_{\mathrm{cool}}\gg1$. If a pulsed inlet is declared with period $P$, the knot spacing should report
  $$
  R_{\mathrm{knot}}
  =
  \left|
  \frac{\Delta x_{\mathrm{knot}}}{v_jP}
  -1
  \right|
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-a616e48e6d3fc870)

  up to projection, cooling, and deceleration corrections named in the packet, where $\Delta x_{\mathrm{knot}}$ is the measured spacing of successive knots along the jet and $v_jP$ is the spacing a pulse train advancing at $v_j$ lays down. For synchrotron-bearing jets, the same run must emit $I_\nu^{\mathrm{syn}}$, $I_\nu^{\mathrm{IC}}$, $\Pi_\nu$, and $\psi_\nu$ maps (synthetic synchrotron and inverse-Compton intensities and the linear-polarization fraction and angle) from one effective $B_{\mathrm{eff}}\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ reconstruction, the provisional map from anisotropic Noether sea response to an observer-level magnetic amplitude that the Synchrotron chapter owns. These are observer-level comparison variables; passing them does not promote magnetohydrodynamic (MHD) fields into substrate ontology.

- **Convergence triad:** must pass temporal/history/spatial gates from [convergence-tests.md](./convergence-tests.md), including null-test failure.

### Failure mode
If any of the quantitative checks above fail (or if the null test does not fail), treat $\mathbb{U}_{\text{now}}$ outputs as numerically unreliable for any promoted claim, including claims about self-hit, an architrino's encounter with its own earlier wake, until thresholds are met.


### $\mathbb{U}_{\text{now}}$ as Standard Probe

1. **Definition**: The $\mathbb{U}_{\text{now}}$ universe-state perspective is the complete ontic state $\mathbb{U}_{\text{now}}\equiv S(T)$ on one absolute-time slice; reading it is a non-physical bookkeeping operation on the full microstate, performed by $\mathbb{U}_{\text{now}}$ sensors rather than by any assembly inside the simulation.
2. **Synthetic Observables**:
    - **Raw Data**: Time series of $\Phi(\mathbf X,T)$ at fixed points.
    - **Post-Processing**: To simulate a physical detector, we act on the raw data by integrating the derived clock time $\tau$ of a "clock assembly" moving through the $\mathbb{U}_{\text{now}}$ grid.
3. **Separation of Concerns**: This explicitly separates Ontology (simulation state/$\mathbb{U}_{\text{now}}$ data) from Phenomenology (synthetic detector data).


### Virtual Sensor & Data Extraction

* **Virtual Sensor:** A $\mathbb{U}_{\text{now}}$ sensor, the fixed virtual probe defined above, implements the $\mathbb{U}_{\text{now}}$ universe-state perspective for a run. It samples potential/gradient at fixed coordinates and is a simulation instrument, not a Physical Observer.
* **Post-Processing:** Convert $\mathbb{U}_{\text{now}}$ sensor data (Ground Truth) into Physical Observer data (what a moving clock measures).
* **Provenance:** Track transmitter identity and emission time for every potential contribution at a grid point.
