# Constraint Ledger

This ledger collects observational constraints and proposed recovery requirements that can reject $\mathbb{A}\mathbb{A}\mathbb{A}$: measured bounds that any model version must satisfy, together with diagnostics whose interpretation must be established before comparison. It keeps measurable limits separate from general research priorities so each model version can be tested against experimental scrutiny. A model version is one shared record, written $\theta$ where an entry needs it: the retained assembly branches, the state of the [Noether sea](../spacetime/noether-sea.md) (the population of neutral assemblies that fills the fixed [Euclidean void](../foundations/euclidean-void.md)), and the observer maps that turn substrate histories in [absolute time](../foundations/absolute-time.md) into clock, ruler, and signal readouts.

## Experimental Constraint Ledger and Falsification Criteria

Each entry connects an observational comparison or proposed recovery requirement with a mechanism and a failure condition so that calibrated experimental results can shape or reject the model.

The entries use a fixed vocabulary. A **Constraint** states either a measured observer-level bound or a proposed acceptance requirement. A measured bound names its instrument, comparison regime and source; a proposed requirement identifies the recovery or diagnostic needed before evaluation. Numerical ledger thresholds are declared comparison choices, distinguished from source measurements. An **Observable** lists the data products the comparison consumes. A mechanism, requirement, target, residual, check, or interpretation entry states what the same shared record must produce; these are closure targets at effective grade, not derived results, and the standard-physics formulas inside them enter only as recovery targets, never as substrate premises. A **Failure Condition** is the falsifier: the observation that rejects the model version. Claim grade: measured for source-supported bounds; guessed or inferred for proposed requirements, benchmark thresholds, mechanisms and targets until their owning chapters supply the relevant derivation or calibration.

### Lorentz Invariance & Preferred Frame Effects (Tier 1)

An absolute frame, the rest frame of the Euclidean void in which the primitive wake speed $c_f$ is isotropic, remains hidden only if the required experimental isotropy and observational invariance hold together; [Detecting the Absolute Frame](../foundations/detecting-the-absolute-frame.md) develops what a physical observer inside the Noether sea can and cannot reconstruct. The entries below identify the observables, state the emergent timing and ruler behavior attributed to the Noether sea, and define the tolerance beyond which the preferred frame would become detectable.

* **Constraint** – Michelson–Morley-type resonator experiments constrain the orientation-dependent fractional frequency change $\Delta\nu/\nu$. The cited rotating-resonator measurement reaches the $10^{-18}$ scale; $10^{-17}$ is this ledger's conservative comparison threshold for that calibrated channel. Interpreting frequency change as two-way light-speed anisotropy requires the same apparatus record's ruler response. Atomic-clock sidereal comparisons form a separate channel: the inherited $10^{-16}$ scale is a provisional benchmark without a source-verified transition, reference clock and nuisance model here, and is not a measured pass/fail bound or evidence for a $10^{-17}$ clock limit.
* **Consolidated Requirement** – prove preferred-frame hiding: architrino assemblies must acquire Lorentz-compatible deformation and clock behavior in the Euclidean-void rest frame so no local observer can detect the Noether sea's rest frame.
* **Observable** – local Lorentz invariance is preserved.
* **Mechanism** – assembly-based clocks/rulers must emerge with derived clock time $\tau$, the readout of a physical assembly clock, rather than absolute time $T$; the clock map from $T$ to $\tau$ is a recovery target, not a substrate premise.
* **Shared Residual** – the structural-integrity common-limit closure in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure) couples this row to photon and gravitational-wave speed gates: the same branch record must make $c_{\mathrm{mat}}^{\mathrm{lim}}$, $c_{\text{eff}}$, $c_\gamma$, and $c_0$ agree within $O(\epsilon_{\text{LV}})$ while also producing clock/ruler deformation and two-way photon synchronization.
* **Failure Condition** – the shared record fails a calibrated comparison when its predicted orientation-dependent observable exceeds that experiment's declared bound. The resonator row uses the $10^{-17}$ ledger threshold; a clock row requires its own source-verified tolerance before evaluation. In the longitudinal ruler target $L_{\parallel}=L_0(\gamma_\star^{-1}+\delta)$, $L_0$ is rest length, $L_{\parallel}$ is length along the motion, $\gamma_\star$ is the Lorentz factor in the declared comparison channel, and $\delta$ is the ruler residual, as in the [kinematic closure target](../spacetime/lorentz-kinematics.md#kinematic-closure-target). A cavity frequency is proportional to two-way signal speed divided by length: to first order its fractional change is the fractional speed change minus the fractional length change. The bound constrains that combination from one branch record, not $\delta$ separately; cancellation must be derived from the common response rather than fitted independently for each channel.

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

[View →](../../../../equation-mapping.html#corpus-equation-cfbc53f331d1f5c8)

Here $\Gamma_z$ is the observer-level path used by the comparison, $d\ell$ its calibrated spatial length element, $c_0$ the asymptotic observer-sector speed calibration, and $\chi_\gamma$ the photon-channel delay factor from the same branch record used for photon synchronization, written with an explicit frequency argument. It is evaluated at the native position $\mathbf X$ and absolute time $T$ that the declared effective chart assigns to each path element, and at the local phase frequency that element carries after its redshift evolution along the path. On a nondispersive branch it reduces to the canonical $\chi_\gamma(\mathbf X,T)=c_0/c_\gamma$, the two terms cancel, and the model delay vanishes. A useful residual is
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

[View →](../../../../equation-mapping.html#corpus-equation-1abb38f3751b71cb)

where $\mathcal{E}$ is the declared transient catalog, $\Delta t_{\mathrm{src}}$ is the modeled source lag, and $\sigma_{\Delta t}$ is the adopted timing uncertainty.

* **Constraint** – the same photon branch that recovers local Lorentz synchronization must keep $\mathcal{R}_{\gamma\mathrm{disp}}$ below the declared catalog threshold without per-source retuning.
* **Observable** – measured arrival-time differences across photon energy or frequency bands, source-lag model, redshift, instrument timing uncertainty, and event-selection rule.
* **Validation Target** – Gate A in [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) must derive a nondispersive weak homogeneous photon branch rather than assume it after the fact.
* **Shared Residual** – this is the photon-channel component of the same common-limit residual defined in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure); the $\chi_\gamma$ record cannot be repaired independently of the clock/ruler $c_{\text{eff}}$ record.
* **Failure Condition** – a photon closure branch fails if its accumulated delay disagrees with the observed-minus-source delay outside the declared timing tolerance, violates the allocated nondispersive-branch tolerance where that branch is claimed, hides disagreement by changing the source-lag model event by event, or uses a different $c_\gamma$ / $\chi_\gamma$ record from the one used in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md).

### The Absolute-Frame Group-Velocity Check (Lorentz Contraction Enforcement)

This entry frames the requirement that the underlying Noether sea affords a dynamical contraction mechanism to assemblies moving through the Euclidean void; without such a mechanism, assemblies would reveal their motion relative to the sea and the preferred frame would manifest.

* **Constraint** – the Noether sea must supply a dynamical closure that yields Lorentz-compatible contraction of assemblies; otherwise the model is equivalent to an untested preferred frame.
* **Failure Condition** – without contraction enforced by the Noether sea, preferred frame effects become measurable and falsify the theory.

### Noether Sea Drag

This entry catalogues how coupling between macroscopic bodies and the Noether sea can influence orbital dynamics. The constraint ensures any additional dissipation or effective drag remains below the levels already constrained by binary-pulsar orbital-period timing, whose measured orbital decay matches the gravitational-wave emission predicted by general relativity.

* **Constraint** – interactions with the Noether sea must not induce orbital decay that outpaces GR’s gravitational-wave emission bounds, as measured by binary-pulsar orbital-period timing.
* **Validation Target** – match observed orbital stability and perihelion advance within GR limits while modeling any extra coupling as a conserving medium-dressed response rather than ordinary dissipative drag.

### Condensed-Matter Response Gate

Ordinary materials supply a broad recovery surface for the same assembly, electron-envelope, and Noether sea response variables. The gate is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ adopts band theory as ontology. The gate is that periodic material branches recover the benchmark mathematics of bands, lattice scattering, phonons, and Hall response without per-probe retuning.

* **Constraint** – one material-branch record $\theta_{\mathrm{mat}}=(\mathcal B_e,\mathcal B_{\mathrm{lat}},\rho_{\text{NS}},n,\chi_{\text{sea}},\mathcal M_{\text{sea}}^{ab})$ must recover Bloch-form bands $E_\alpha(\mathbf k)$ indexed by band $\alpha$ and crystal momentum $\mathbf k$, the effective mass tensor $(m_{\alpha,*}^{-1})^{ij}=\hbar^{-2}\,\partial^2E_\alpha/\partial k_i\partial k_j$ (the band curvature with respect to crystal momentum, with $\hbar$ the reduced observer-level action quantum), Fermi-surface or band-gap classification, reciprocal-lattice scattering $\mathbf q\in\Lambda^*$ with structure factor $S(\mathbf q)$, and phonon dispersion from one declared lattice branch.
* **Hall / Topology Target** – for two-dimensional gapped branches with an effective U(1) connection, the same record must recover the Hall conductance $\sigma_{xy}=(e^2/2\pi\hbar)C$, with $e$ the elementary-charge magnitude and $C$ the integer Chern number, and the longitudinal resistivity $\rho_{xx}$ below tolerance on the plateau. Fractional Hall, anyon, and Chern-Simons descriptions are recovery/comparison structures unless a local branch derivation consumes them directly.
* **No-Drag Consistency** – the ideal periodic branch must not require ordinary dissipative drag; a finite transport relaxation rate $\tau_{\mathrm{rel}}^{-1}$ must be routed to disorder, vacancies, phonons, boundary exchange, heating, radiation-like shedding, or branch transition.
* **Failure Condition** – the condensed-matter branch fails if it fits band curvature, phonon stiffness, scattering peaks, Hall conductance, and transport relaxation with independent material records, if a filled band carries unlogged current or heat, if a topological plateau changes without a gap closure or branch change, or if ordinary Noether sea drag is used to explain resistance below the transport threshold in [Condensed Matter](../nuclear-atomic/condensed-matter.md).

### GW Speed

The propagation speed of gravitational-wave disturbances in the Noether sea must align with the measured gravitational-wave velocity, so this section records the tolerance within which new physics can coexist with GW timing data without contradicting the LIGO/Virgo baseline. The benchmark is multi-messenger: the arrival-time comparison between the gravitational-wave event GW170817 and the gamma-ray burst GRB 170817A constrained the gravity-channel and photon-channel speed difference at roughly the $10^{-15}$ level.

* **Constraint** – gravitational waves, modeled as collective Noether sea disturbances, must satisfy the multi-messenger speed gate. In the standard comparison form quoted from that analysis, with $v_{\mathrm{GW}}$ the gravitational signal speed and $c_0$ standing for the quoted light speed in the same calibration, GW170817/GRB 170817A gives the reference scale
  $$
  -3\times10^{-15}
  \lesssim
  \frac{v_{\mathrm{GW}}-c_0}{c_0}
  \lesssim
  7\times10^{-16}
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-e5dc0f030c4b58dc)

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

  [View →](../../../../equation-mapping.html#corpus-equation-1a57d4fecb90841c)

  is the order-of-magnitude ledger tolerance. The symbol map from the quoted form is $v_{\mathrm{GW}}\mapsto c_{\mathrm{GW}}$, the gravitational-wave effective transport speed, and $c_0\to c_\gamma$ on that branch; the second form is the layer-explicit ledger row, and its symmetric scale is a rounding of the asymmetric published interval, not that interval. Any tighter ledger tolerance adopted for a specific validation band should be stated explicitly rather than inferred from ontology.
* **Shared-Channel Requirement** – the effective gravitational-wave channel and photon channel must be derived from one Noether sea state record in the weak-field branch, as required by [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure). A medium-based gravity model fails this row if it lets gravitational waves and photons acquire independently tunable dressed speeds in the same region.
* **Mode and Dispersion Gate** – finite-range or medium-compliance corrections must keep accumulated dispersion, false-alarm residuals, calibration residuals, and any scalar, vector, or longitudinal gravitational-wave detector response below the residual bounds for the validated band.
* **Low-Frequency Extension** – if a cosmological-scale weakening channel claims finite-range behavior, it must also report the low-frequency residual $\mathcal{R}_{\mathrm{GW,low}}(\theta)$ from [Gravitational Waves](../spacetime/gravitational-waves.md#linear-wave-equation) for the declared pulsar-timing or space-interferometer band. A band not yet measured may be listed as a forecast, but it cannot be used to override the existing high-frequency speed, polarization, and dispersion gates.
* **Failure Condition** – a cosmological-scale weakening channel fails if it predicts measurable gravitational-wave dispersion, an unsuppressed non-TT mode, or a speed offset in the same regime where the weak-field metric map is supposed to recover GR.

### Euclidean vs. Metric Pathing (The Refraction Mapping)

This constraint explains how apparent metric deviations (Shapiro delay and light bending) emerge from a Euclidean signalling framework endowed with a varying Noether sea delay factor $\chi_{\text{sea}}=c_f/c_{\text{eff}}$, the ratio of the primitive wake speed to the dressed signal speed, which allows the emergent delay to be compared with the standard GR potential.

* **Constraint** – Shapiro delay and light bending must match GR within the Cassini-scale PPN bound. The Cassini radio-link measurement gives $\gamma_{\mathrm{PPN}}-1=(2.1\pm2.3)\times10^{-5}$, where $\gamma_{\mathrm{PPN}}$ is the parameterized post-Newtonian space-curvature parameter, equal to one in general relativity, and both the delay and the bending are proportional to $1+\gamma_{\mathrm{PPN}}$; the ledger tolerance is a few $\times10^{-5}$.
* **Architrino Interpretation** – signals propagate through Euclidean space, but observer-level paths are effective travel-time extremals in the Noether sea delay map. The perceived delay or curvature arises from $\chi_{\text{sea}}$ responding to spatial variations in the Noether braid density $\rho_{\text{NS}}$ and related Noether sea state variables.
* **Validation Target** – in the corpus-wide $(-,+,+,+)$ convention, the lapse entry $g_{00}^{\mathrm{eff}} \approx -(1+2\Phi_N/c_0^2)$, with $\Phi_N<0$ the Newtonian benchmark potential, fixes only the clock-channel half of the signal delay. The refractive slowing of photon-channel signals moving through the Noether sea must recover the full first-order delay factor $c_0/c_{\text{eff}}=1-(1+\gamma_{\mathrm{PPN}})\Phi_N/c_0^2$ of the [explicit weak-field delay map](../spacetime/ppn-parameters.md#explicit-weak-field-noether-sea-delay-map-ppn-gamma), whose other half is the spatial-compliance (ruler) response; a lapse-only map reproduces half the observed bending and delay and fails the Cassini constraint.

### Gravitational Time Dilation

This entry requires that the proposed mechanical slowing induced by Noether braid density aligns quantitatively with satellite-clock and redshift observations such as GPS offsets and the Pound–Rebka experiment, offering a concrete mapping between the new microphysics and the classical time-dilation effects.

* **Constraint** – reproduce GPS clock offsets ($38\,\mu\mathrm{s/day}$, the net relativistic rate offset of an orbiting GPS clock relative to a ground clock), the Pound–Rebka redshift, and height-resolved optical-clock redshift with $\Delta\nu/\nu\approx gL/c_0^2$, where $g$ is the local gravitational acceleration and $L$ the height difference; this includes the approximate scales $1.1\times10^{-19}$ across $1\,\mathrm{mm}$ and $3.6\times10^{-17}$ across $33\,\mathrm{cm}$ near Earth's surface, the scales of the [finite-height clock benchmark](../spacetime/proper-time-and-time-dilation.md#finite-height-clock-benchmark).
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

  [View →](../../../../equation-mapping.html#corpus-equation-ad599d5e1bd52189)

  with $\Delta h_A(t_{\mathrm{eff}})=h_A(t_{\mathrm{eff}};\rho_1,\theta)-h_A(t_{\mathrm{eff}};\rho_2,\theta)$, must remain below the declared which-path threshold when an independently calibrated information-to-visibility map requires that bound for the same unconditioned branch ensemble and coherence window. A later record or a postselected interference pattern does not pass this same-ensemble comparison. A claimed record instead requires a derived reduced response-threshold crossing or a boundary moved by driving, plus persistence and record autonomy; an invariant basin boundary of an autonomous full flow cannot be crossed by that same flow. Here $h_A$ is the gravitational response in resolved detector channel $A$ under the shared effective-metric record $\theta$, $t_{\mathrm{eff}}$ is effective observer time, $T_W$ is the record window over which the readout is formed, and $N_{AB}$ is the observer-level noise covariance between channels, whose operator inverse weights the response difference on a declared finite-bandwidth readout space where the covariance is positive definite; it is not an entrywise reciprocal. A singular covariance requires an explicit supported-subspace or regularized model and treatment of signal components in null directions before evaluation. On that domain the diagnostic is a squared noise-weighted response distance; its interpretation as accessible information or interference loss additionally requires the calibrated response and likelihood model.
* **Observable** – the data products are massive-superposition coherence time, branch separation and mass-displacement history, precision-gravity response, detector noise covariance, any two-probe entanglement witness, non-gravitational coupling residuals, and the absence or presence of a durable which-path record.
* **Validation Target** – combine long-coherence interferometry with Cavendish-like, atom-interferometric, or gravitational-wave-instrument precision bounds to constrain $\mathcal{D}_{\mathrm{grav}}$ using one effective-metric constitutive record $\theta$; the concrete scaffold is [Massive-Superposition Gravity Validation Packet](massive-superposition-gravity.md).
* **Mediated-Entanglement Target** – for gravitationally induced entanglement comparisons, the same $\theta$ must generate the branch interaction phase $\Delta\Phi_{\mathrm{ent}}$ needed for the observed witness $C_{\mathrm{obs}}$ while keeping $\mathcal{R}_{\mathrm{nongrav}}$ below the isolation threshold and satisfying the which-path bound when the same-ensemble visibility calibration requires it.
* **Failure Condition** – the shared response record fails when its independently calibrated information-to-visibility map predicts suppression incompatible with the observed interference on the same unconditioned ensemble and coherence window. A large $\mathcal{D}_{\mathrm{grav}}$ alone proves neither interference loss nor record formation. Any claimed apparatus/environment record must separately satisfy the threshold, persistence and record-autonomy conditions in [Measurement Ontology](../quantum/measurement-ontology.md).

### CMB Scalar/Tensor Gate

The cosmology branch must recover the CMB scalar and tensor observables as data products before any source interpretation is promoted.

* **Constraint** – one Noether sea and assembly record must recover TT/TE/EE spectra, damping, CMB-lensing reconstruction, blackbody preservation, scalar amplitude $A_s$, scalar tilt $n_s$, acoustic phase coherence, vector-mode suppression, and the bound $r\le r_{\max}$ on the tensor-to-scalar ratio without changing Noether sea state variables between the CMB, BBN, expansion, and growth modules.
* **Observable** – the CMB comparison residual $\mathcal{R}_{\mathrm{CMB}}(\theta)$ defined in [CMB](../cosmology/CMB.md) must remain within the declared tolerance for the data release being used, and the added $\mathcal{R}_{\mathrm{phase}}(\theta)$, $\mathcal{R}_{V}(\theta)$, and $\mathcal{R}_{\mathrm{lens}}(\theta)$ gates must not require a separate medium history.
* **Smoothness Check** – the same record must also bound the effective smoothness residual $\mathcal{R}_{\mathrm{smooth}}(\theta)$, so early-universe smoothness is tested as low observer-level gravitational free-mode content rather than assumed from an imported origin story.
* **Failure Condition** – if the framework can fit the source story only by retuning scalar power, acoustic phase, vector-mode content, CMB-lensing reconstruction, tensor contribution, blackbody recovery, or TT/TE/EE transfer independently, the cosmology closure fails at the observational layer.

### Compact Dark-Sector Local-Detection Gate

Compact neutral-assembly or primordial-defect branches must face local gravitational searches as data products, not only cosmological abundance fits. For a branch record $\theta_A$ with representative mass $M_A$, local fraction $f_A$ of the local dark-matter mass density $\rho_{\mathrm{DM}}$, and relative-speed distribution $p(v_{\mathrm{rel}})$ with mean $\langle v_{\mathrm{rel}}\rangle_{\theta_A}$, the first estimate of the rate of passages within impact parameter $b_{\max}$ of a tracked body is
$$
\Gamma_{\mathrm{flyby}}(b_{\max},M_A;\theta_A)
=
\frac{f_A\rho_{\mathrm{DM}}}{M_A}\,
\pi b_{\max}^2\,
\langle v_{\mathrm{rel}}\rangle_{\theta_A}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8fbef462600b538c)

The corresponding impulse scale on a tracked body, in the observer-level Newtonian comparison form used only as an effective-grade estimate, is
$$
\Delta v_{\mathrm{test}}
\simeq
\frac{2GM_A}{b\,v_{\mathrm{rel}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d00c040262a64977)

where $G$ is the observer-level gravitational constant, $b$ the impact parameter of one passage, and $v_{\mathrm{rel}}$ its relative speed; the velocity change is the momentum transfer of a single distant flyby, and the accepted comparison uses the full ephemeris covariance rather than this estimate alone.

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
| Topological spin/confinement closure | [dynamics/causal-action-functional.md](../dynamics/causal-action-functional.md), [assemblies/fermions/color-charge-su3.md](../assemblies/fermions/color-charge-su3.md) | $4\pi$ spin structure and open-vs-closed color-energy scaling |

For each program $P$ in the table, let $\mathcal{C}_P$ be its acceptance set: the set of shared records $\theta$ that pass that program's ledger gate within its declared tolerance after uncertainty propagation. The six sets are program-level views of one record; the sector acceptance sets of [Failure Criteria](failure-criteria.md#sector-acceptance-sets) partition the same record by physical sector and remain in force alongside them. The cross-program acceptance principle is that one record must lie in every program's set:
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

[View →](../../../../equation-mapping.html#corpus-equation-b6a0379c548612df)

If the intersection is empty after uncertainty propagation, the integrated model version is rejected.

## Sources

The quoted bounds in this ledger are observer-level measurements; each source below supports the passage named and enters as a constraint, never as a substrate premise.

- M. Nagel et al., *Direct Terrestrial Test of Lorentz Symmetry in Electrodynamics to $10^{-18}$*, Nature Communications 6, 8174 (2015), [arXiv:1412.6954](https://arxiv.org/abs/1412.6954), DOI: 10.1038/ncomms9174. Supports the resonator anisotropy bound in the Lorentz-invariance entry: orientation-dependent relative frequency changes constrained to $(9.2\pm10.7)\times10^{-19}$ at 95% confidence, which the ledger rounds to the conservative $10^{-17}$ threshold.
- B. P. Abbott et al., *Gravitational Waves and Gamma-rays from a Binary Neutron Star Merger: GW170817 and GRB 170817A*, Astrophysical Journal Letters 848, L13 (2017), [arXiv:1710.05834](https://arxiv.org/abs/1710.05834), DOI: 10.3847/2041-8213/aa920c. Supports the GW Speed entry: the observed $(+1.74\pm0.05)\,\mathrm{s}$ delay constrains the gravity-to-light speed difference to between $-3\times10^{-15}$ and $+7\times10^{-16}$ of the speed of light under the analysis's distance and emission-lag assumptions.
- B. Bertotti, L. Iess, and P. Tortora, *A test of general relativity using radio links with the Cassini spacecraft*, Nature 425, 374–376 (2003), DOI: [10.1038/nature01997](https://doi.org/10.1038/nature01997). Supports the refraction-mapping entry: $\gamma_{\mathrm{PPN}}=1+(2.1\pm2.3)\times10^{-5}$ from the frequency shift of radio signals passing near the Sun, with bending and delay proportional to $1+\gamma_{\mathrm{PPN}}$.
- N. Ashby, *Relativity in the Global Positioning System*, Living Reviews in Relativity 6, 1 (2003), DOI: [10.12942/lrr-2003-1](https://doi.org/10.12942/lrr-2003-1). Supports the GPS figure in the time-dilation entry: the net constant fractional rate offset of $-4.4647\times10^{-10}$ in its equation (35) corresponds to about $38\,\mu\mathrm{s}$ per day.
- C. W. Chou, D. B. Hume, T. Rosenband, and D. J. Wineland, *Optical Clocks and Relativity*, Science 329, 1630–1633 (2010), DOI: [10.1126/science.1192720](https://doi.org/10.1126/science.1192720). Supports the $33\,\mathrm{cm}$ scale: a height change of $33\,\mathrm{cm}$ between two optical clocks produced a fractional frequency change of $(4.1\pm1.6)\times10^{-17}$, against the $gL/c^2$ expectation of about $1.1\times10^{-16}$ per meter.
- T. Bothwell et al., *Resolving the gravitational redshift within a millimeter atomic sample*, Nature 602, 420–424 (2022), [arXiv:2109.12238](https://arxiv.org/abs/2109.12238), DOI: 10.1038/s41586-021-04349-7. Supports the $1\,\mathrm{mm}$ scale: a linear frequency gradient consistent with the gravitational redshift was resolved within a single millimeter-scale atomic sample.
