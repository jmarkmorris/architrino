# Constraint Ledger

Notes collected here document the falsification criteria, ordering priorities, and supporting mechanisms for the architrino framework. Keep this page focused on observable constraints so each model version can be checked against experimental scrutiny.

## Experimental Constraint Ledger and Falsification Criteria

This ledger crystallizes the measurable thresholds and theoretical guardrails that could falsify the architrino proposal. Each numbered entry combines the empirical bound, the proposed mechanism, and the explicit failure condition so that we can track how discrete experimental results shape or reject the model.

### Lorentz Invariance & Preferred Frame Effects (Tier 1)

The purpose of this section is to define the combination of experimental isotropy and observational invariance that must hold if a putative absolute frame is to remain hidden. We identify the observables, derive the emergent timing/ruler behavior implied by the Noether sea, and explicitly state the tolerance beyond which the preferred frame would become perceivable.

* **Constraint** – isotropy from Michelson–Morley and resonator experiments constrains $|\Delta c/c| < 10^{-17}$ while atomic clock sidereal drift stays below $10^{-16}$, keeping Lorentz-invariance leakage under the $10^{-17}$ falsification threshold.
* **Consolidated Requirement** – prove preferred-frame hiding: architrino assemblies must acquire Lorentz-compatible deformation and clock behavior in the Euclidean-void rest frame so no local observer can detect the Noether sea's rest frame.
* **Observable** – local Lorentz invariance is preserved.
* **Mechanism** – assembly-based clocks/rulers must emerge with proper time $\tau$ rather than absolute time $t$.
* **Shared Residual** – the structural-integrity common-limit closure in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure) couples this row to photon and gravitational-wave speed gates: the same branch record must make $c_{\mathrm{mat}}^{\mathrm{lim}}$, $c_{\text{eff}}$, $c_\gamma$, and $c_0$ agree within $O(\epsilon_{\text{LV}})$ while also producing clock/ruler deformation and two-way photon synchronization.
* **Failure Condition** – any detectable preferred-frame orientation above $10^{-17}$ or residual $\delta$ in $L_{moving} = L_{rest} (\gamma^{-1} + \delta)$ that exceeds $10^{-17}$ invalidates the theory.

### Photon Time-of-Flight Dispersion Gate

High-energy transient events at cosmological distance test whether photon-channel propagation accumulates a frequency-dependent delay. The observable is a time-of-arrival residual after source-intrinsic emission lag has been modeled; it is not direct evidence for or against microscopic spatial grains by itself.

For two photon phase frequencies $\omega_a$ and $\omega_b$ emitted by the same source at redshift $z$, a candidate photon-channel delay is
$$
\Delta t_{\gamma}^{\mathrm{model}}(\omega_a,\omega_b;z)
=
\int_{\Gamma_z}
\frac{
\chi_\gamma(\omega_a,\mathbf X,T)
-
\chi_\gamma(\omega_b,\mathbf X,T)
}{c_0}\,d\ell
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-cfbc53f331d1f5c8)
Here $\Gamma_z$ is the observer-level path used by the comparison, and $\chi_\gamma$ is the photon-channel delay factor from the same branch record used for photon synchronization. A useful residual is
$$
\mathcal{R}_{\gamma\mathrm{disp}}
=
\sup_{\mathcal{E}}
\frac{
\left|
\Delta t_{\mathrm{obs}}
-
\Delta t_{\mathrm{src}}
-
\Delta t_{\gamma}^{\mathrm{model}}
\right|
}{\sigma_{\Delta t}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1abb38f3751b71cb)
where $\mathcal{E}$ is the declared transient catalog, $\Delta t_{\mathrm{src}}$ is the modeled source lag, and $\sigma_{\Delta t}$ is the adopted timing uncertainty.

* **Constraint** – the same photon branch that recovers local Lorentz synchronization must keep $\mathcal{R}_{\gamma\mathrm{disp}}$ below the declared catalog threshold without per-source retuning.
* **Observable** – measured arrival-time differences across photon energy or frequency bands, source-lag model, redshift, instrument timing uncertainty, and event-selection rule.
* **Validation Target** – Gate A in [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) must derive a nondispersive weak homogeneous photon branch rather than assume it after the fact.
* **Shared Residual** – this is the photon-channel component of the same common-limit residual defined in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure); the $\chi_\gamma$ record cannot be repaired independently of the clock/ruler $c_{\text{eff}}$ record.
* **Failure Condition** – a photon closure branch fails if it predicts an accumulated frequency-dependent delay in the validated band, hides that delay by changing the source-lag model event by event, or uses a different $c_\gamma$ / $\chi_\gamma$ record from the one used in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md).

### The Absolute-Frame Group-Velocity Check (Lorentz Contraction Enforcement)

This entry frames the requirement that the underlying Noether sea affords a dynamical contraction mechanism to assemblies moving through the Euclidean void; without such a mechanism, assemblies would reveal their motion relative to the sea and the preferred frame would manifest.

* **Constraint** – the Noether sea must supply a dynamical closure that yields Lorentz-compatible contraction of assemblies; otherwise the model is equivalent to an untested preferred frame.
* **Failure Condition** – without contraction enforced by the Sea, preferred frame effects become measurable and falsify the theory.

### Noether Sea Drag

Here we catalogue how coupling between macroscopic bodies and the Noether sea can influence orbital dynamics. The constraint ensures any additional dissipation or effective drag remains below the levels already constrained by gravitational-wave-based orbital decay measurements in general relativity.

* **Constraint** – interactions with the Noether sea must not induce orbital decay that outpaces GR’s gravitational-wave emission bounds.
* **Validation Target** – match observed orbital stability and perihelion advance within GR limits while modeling any extra coupling as a conserving medium-dressed response rather than ordinary dissipative drag.

### Condensed-Matter Response Gate

Ordinary materials supply a broad recovery surface for the same assembly, electron-envelope, and Noether sea response variables. The gate is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ adopts band theory as ontology. The gate is that periodic material branches recover the benchmark mathematics of bands, lattice scattering, phonons, and Hall response without per-probe retuning.

* **Constraint** – one material-branch record $\theta_{\mathrm{mat}}=(\mathcal B_e,\mathcal B_{\mathrm{lat}},\rho_{\text{NS}},n,\chi_{\text{sea}},\mathcal M_{\text{sea}}^{ab})$ must recover Bloch-form bands $E_\alpha(\mathbf k)$, effective mass tensor $(m_{\alpha,*}^{-1})^{ij}=\hbar^{-2}\partial_i\partial_jE_\alpha$, Fermi-surface or band-gap classification, reciprocal-lattice scattering $\mathbf q\in\Lambda^*$ with structure factor $S(\mathbf q)$, and phonon dispersion from one declared lattice branch.
* **Hall / Topology Target** – for two-dimensional gapped branches with an effective U(1) connection, the same record must recover $\sigma_{xy}=(e^2/2\pi\hbar)C$ with integer Chern number $C$ and $\rho_{xx}$ below tolerance on the plateau. Fractional Hall, anyon, and Chern-Simons descriptions are recovery/comparison structures unless a local branch derivation consumes them directly.
* **No-Drag Consistency** – the ideal periodic branch must not require ordinary dissipative drag; finite $\tau^{-1}$ must be routed to disorder, vacancies, phonons, boundary exchange, heating, radiation-like shedding, or branch transition.
* **Failure Condition** – the condensed-matter branch fails if it fits band curvature, phonon stiffness, scattering peaks, Hall conductance, and transport relaxation with independent material records, if a filled band carries unlogged current or heat, if a topological plateau changes without a gap closure or branch change, or if ordinary Noether sea drag is used to explain resistance below the transport threshold in [Condensed Matter](../nuclear-atomic/condensed-matter.md).

### GW Speed

The propagation speed of gravitational-wave disturbances in the Noether sea must align with the measured gravitational-wave velocity, so this section records the tolerance within which new physics can coexist with GW timing data without contradicting the LIGO/Virgo baseline. The relevant benchmark is now multi-messenger rather than merely assumed: GW170817/GRB 170817A constrained the gravity-channel and photon-channel speed difference at roughly the $10^{-15}$ level.

* **Constraint** – gravitational waves, modeled as collective Noether sea disturbances, must satisfy the multi-messenger speed gate, with GW170817/GRB 170817A giving the reference scale
  $$
  -3\times10^{-15}
  \lesssim
  \frac{v_{\mathrm{GW}}-c_0}{c_0}
  \lesssim
  7\times10^{-16}
  $$

  [Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e5dc0f030c4b58dc)
  Equivalently, for the weak homogeneous observer branch in which $c_\gamma\to c_0$,
  $$
  \left|
  \frac{c_{\mathrm{GW}}}{c_\gamma}
  -
  1
  \right|
  \lesssim
  10^{-15}
  $$

  [Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1a57d4fecb90841c)
  is the order-of-magnitude ledger tolerance. Any tighter ledger tolerance adopted for a specific validation band should be stated explicitly rather than inferred from ontology.
* **Shared-Channel Requirement** – the effective gravitational-wave channel and photon channel must be derived from one Noether sea state record in the weak-field branch, as required by [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure). A medium-based gravity model fails this row if it lets gravitational waves and photons acquire independently tunable dressed speeds in the same region.
* **Mode and Dispersion Gate** – finite-range or medium-compliance corrections must keep accumulated dispersion, false-alarm residuals, calibration residuals, and any scalar, vector, or longitudinal gravitational-wave detector response below the residual bounds for the validated band.
* **Low-Frequency Extension** – if a cosmological-scale weakening channel claims finite-range behavior, it must also report the low-frequency residual $\mathcal{R}_{\mathrm{GW,low}}(\theta)$ from [Gravitational Waves](../spacetime/gravitational-waves.md#linear-wave-equation) for the declared pulsar-timing or space-interferometer band. A band not yet measured may be listed as a forecast, but it cannot be used to override the existing high-frequency speed, polarization, and dispersion gates.
* **Failure Condition** – a cosmological-scale weakening channel fails if it predicts measurable gravitational-wave dispersion, an unsuppressed non-TT mode, or a speed offset in the same regime where the weak-field metric map is supposed to recover GR.

### Euclidean vs. Metric Pathing (The Refraction Mapping)

This constraint explains how apparent metric deviations (Shapiro delay and light bending) emerge from a Euclidean signalling framework endowed with a varying Noether sea delay factor $\chi_{\text{sea}}$, which allows us to compare the emergent delay with the standard GR potential.

* **Constraint** – Shapiro delay and light bending must match GR within the Cassini-scale PPN bound, conventionally summarized as $\gamma-1=(2.1\pm2.3)\times10^{-5}$ or a few $\times10^{-5}$.
* **Architrino Interpretation** – signals propagate through Euclidean space, but observer-level paths are effective travel-time extremals in the Noether sea delay map. The perceived delay or curvature arises from $\chi_{\text{sea}}$ responding to spatial variations in $\rho_{\text{NS}}$ and related Noether sea state variables.
* **Validation Target** – in the corpus-wide $(-,+,+,+)$ convention, map $g_{00}^{\mathrm{eff}} \approx -(1+2\Phi_N/c_0^2)$ onto the refractive slowing experienced by Noether sea signals moving through the Euclidean void with Noether sea delay.

### Gravitational Time Dilation

We require that the proposed mechanical slowing induced by Noether braid density aligns quantitatively with geodetic and redshift observations such as GPS offsets and the Pound–Rebka experiment, offering a concrete mapping between the new microphysics and the classical time-dilation effects.

* **Constraint** – reproduce GPS clock offsets ($38\,\mu\mathrm{s/day}$), the Pound–Rebka redshift, and height-resolved optical-clock redshift with $\Delta\nu/\nu\approx gL/c_0^2$; this includes the approximate scales $1.1\times10^{-19}$ across $1\,\mathrm{mm}$ and $3.6\times10^{-17}$ across $33\,\mathrm{cm}$ near Earth's surface.
* **Mechanism** – mechanical slowing of Noether braid orbital frequencies couples to the local Noether braid density and Noether sea delay factor, generating the observed dilation without changing the constitutive map used for other weak-field observables.

### Massive-Superposition Gravitational Distinguishability

Massive-interference experiments and precision gravity readouts jointly test whether the effective-metric channel carries enough branch information to become a which-path record. The observable is not whether spacetime is declared classical or quantum. The observable is whether two mass-density histories produce a distinguishable gravitational response before the apparatus has formed a durable record.

* **Constraint** – for two branch-level mass-density histories $\rho_1$ and $\rho_2$, the gravitational distinguishability diagnostic
  $$
  \mathcal{D}_{\mathrm{grav}}(T_W;\theta)
  =
  \int_0^{T_W}\!\!\int_0^{T_W}
  \Delta h_A(t_{\mathrm{eff}})\,
  N^{-1}_{AB}(t_{\mathrm{eff}},t'_{\mathrm{eff}})\,
  \Delta h_B(t'_{\mathrm{eff}})\,dt_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
  $$

  [Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ad599d5e1bd52189)
  with $\Delta h_A(t_{\mathrm{eff}})=h_A(t_{\mathrm{eff}};\rho_1,\theta)-h_A(t_{\mathrm{eff}};\rho_2,\theta)$, must remain below the declared which-path threshold for any interference-preserving run unless a record-forming separatrix crossing and persistence window are also derived.
* **Observable** – the data products are massive-superposition coherence time, branch separation and mass-displacement history, precision-gravity response, detector noise covariance, any two-probe entanglement witness, non-gravitational coupling residuals, and the absence or presence of a durable which-path record.
* **Validation Target** – combine long-coherence interferometry with Cavendish-like, atom-interferometric, or gravitational-wave-instrument precision bounds to constrain $\mathcal{D}_{\mathrm{grav}}$ using one effective-metric constitutive record $\theta$; the concrete scaffold is [Massive-Superposition Gravity Validation Packet](massive-superposition-gravity.md).
* **Mediated-Entanglement Target** – for gravitationally induced entanglement comparisons, the same $\theta$ must generate the branch interaction phase $\Delta\Phi_{\mathrm{ent}}$ needed for the observed witness $C_{\mathrm{obs}}$ while keeping $\mathcal{R}_{\mathrm{nongrav}}$ below the isolation threshold and $\mathcal{D}_{\mathrm{grav}}$ below the which-path threshold.
* **Failure Condition** – the measurement and spacetime branches fail jointly if the same parameter record predicts $\mathcal{D}_{\mathrm{grav}}\gg1$ for an interference-preserving experiment while no apparatus/environment record satisfies the record-autonomy condition in [Measurement Ontology](../quantum/measurement-ontology.md).

### CMB Scalar/Tensor Gate

The cosmology branch must recover the CMB scalar and tensor observables as data products before any source interpretation is promoted.

* **Constraint** – one Noether sea and assembly record must recover TT/TE/EE spectra, damping, CMB-lensing reconstruction, blackbody preservation, scalar amplitude $A_s$, scalar tilt $n_s$, acoustic phase coherence, vector-mode suppression, and the tensor bound $r\le r_{\max}$ without changing Noether sea state variables between the CMB, BBN, expansion, and growth modules.
* **Observable** – the CMB comparison residual $\mathcal{R}_{\mathrm{CMB}}(\theta)$ defined in [CMB](../cosmology/CMB.md) must remain within the declared tolerance for the data release being used, and the added $\mathcal{R}_{\mathrm{phase}}(\theta)$, $\mathcal{R}_{V}(\theta)$, and $\mathcal{R}_{\mathrm{lens}}(\theta)$ gates must not require a separate medium history.
* **Smoothness Check** – the same record must also bound the effective smoothness residual $\mathcal{R}_{\mathrm{smooth}}(\theta)$, so early-universe smoothness is tested as low observer-level gravitational free-mode content rather than assumed from an imported origin story.
* **Failure Condition** – if the framework can fit the source story only by retuning scalar power, acoustic phase, vector-mode content, CMB-lensing reconstruction, tensor contribution, blackbody recovery, or TT/TE/EE transfer independently, the cosmology closure fails at the observational layer.

### Compact Dark-Sector Local-Detection Gate

Compact neutral-assembly or primordial-defect branches must face local gravitational searches as data products, not only cosmological abundance fits. For a branch record $\theta_A$ with representative mass $M_A$, local fraction $f_A$, and relative-speed distribution $p(v_{\mathrm{rel}})$, the first rate estimate is
$$
\Gamma_{\mathrm{flyby}}(b_{\max},M_A;\theta_A)
=
\frac{f_A\rho_{\mathrm{DM}}}{M_A}\,
\pi b_{\max}^2\,
\langle v_{\mathrm{rel}}\rangle_{\theta_A}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8fbef462600b538c)
The corresponding impulse scale on a tracked body is
$$
\Delta v_{\mathrm{test}}
\simeq
\frac{2GM_A}{b\,v_{\mathrm{rel}}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d00c040262a64977)
with the accepted comparison using the full ephemeris covariance rather than this estimate alone.

* **Constraint** – any claimed local compact dark-sector signal must produce an ephemeris residual $\Delta x_{\mathrm{ephem,eff}}^{i,\theta}(t_{\mathrm{eff}})$ above the declared ranging and model-error floor while remaining inconsistent with ordinary catalogued bodies under the same orbit-reconstruction covariance.
* **Co-Signature Check** – if the branch predicts high-energy particles, radiation, or gravitational-wave sidebands, those observables must use the same trajectory, mass, and abundance record as the ephemeris perturbation.
* **Failure Condition** – a compact dark-sector branch fails locally if it explains cosmological abundance with one mass or population record but requires a different record for ephemerides, visible-object exclusions, or high-energy null results.

### Closure Program Tracking Hooks

Use this ledger as the acceptance layer for the six integrated closure programs:

| Program | Primary chapters | Ledger gate |
| --- | --- | --- |
| CKM holonomy closure | [theory-bridges/weak-mixing-ckm.md](../philosophy-history/theory-bridges/weak-mixing-ckm.md) | CKM hierarchy and CP-phase consistency with propagated uncertainty |
| PMNS neutral braid closure | [assemblies/fermions/neutrinos.md](../assemblies/fermions/neutrinos.md) | Oscillation pattern consistency across $L/E$ and medium regimes |
| Emergent metric / PPN closure | [spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md), [spacetime/proper-time-and-time-dilation.md](../spacetime/proper-time-and-time-dilation.md) | Lorentz leakage, PPN, redshift, Shapiro, GW-speed bounds |
| Non-relativistic Schrödinger + Born closure | [theory-bridges/pilot-wave-character.md](../philosophy-history/theory-bridges/pilot-wave-character.md), [quantum/wavefunction-ontology.md](../quantum/wavefunction-ontology.md), [theory-bridges/superposition-mechanism.md](../philosophy-history/theory-bridges/superposition-mechanism.md) | Effective fixed-particle-number wave equation + statistical outcome consistency |
| Photon Gate A/B/C closure | [assemblies/bosons/electroweak-bosons.md](../assemblies/bosons/electroweak-bosons.md), [theory-bridges/angular-momentum-and-spin.md](../philosophy-history/theory-bridges/angular-momentum-and-spin.md), [validation/reaction-cosmology-provenance-ledger.md](reaction-cosmology-provenance-ledger.md), [spacetime/lorentz-kinematics.md](../spacetime/lorentz-kinematics.md) | Gate A massless nondispersive photon kinematics, Gate B polarization and squared-amplitude capture as a downstream spin/helicity ledger, and Gate C Maxwell/QED vertices, pair/radiation provenance, and $\alpha$ recovery |
| Topological spin/confinement closure | [dynamics/causal-action-functional.md](../dynamics/causal-action-functional.md), [assemblies/fermions/color-charge-su3.md](../assemblies/fermions/color-charge-su3.md) | 4$\pi$ spin structure and open-vs-closed color-energy scaling |

Cross-program acceptance principle:
$$
\mathcal{C}_{\mathrm{CKM}}
\cap
\mathcal{C}_{\mathrm{PMNS}}
\cap
\mathcal{C}_{\mathrm{PPN/GR}}
\cap
\mathcal{C}_{\mathrm{QM}}
\cap
\mathcal{C}_{\mathrm{Photon}}
\cap
\mathcal{C}_{\mathrm{Topo}}
\neq \varnothing
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b6a0379c548612df)
If the intersection is empty after uncertainty propagation, the integrated model version is rejected.
