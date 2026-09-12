# Atomic Transition Radiation

Atomic transition radiation is an exploratory mapping of atomic line emission and absorption into Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$. A line is a narrow range of emitted or absorbed frequencies. An assembly is a collection of [architrinos](../foundations/architrino.md), point transceivers whose past emissions supply delayed acceleration contributions; an envelope basin is a candidate persistent atomic response pattern. In this mapping an electron-assembly envelope changes basin, and the released energy is partitioned among a photon channel, recoil, medium excitation, and residual atomic energy. Action, which has energy-times-time units, requires its own derived ledger and is not interchangeable with the energy entries below. The atomic labels and transition mechanism remain recovery targets.

This page specializes the shared routing skeleton in [Radiation](radiation.md). The envelope energies and spectral labels are inherited from [Atomic Spectra](../nuclear-atomic/atomic-spectra.md), while photon ontology and Gate A/B/C closure requirements are inherited from [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md#photon-closure-interface). Reaction provenance follows [Reaction Ledger](../validation/reaction-ledger.md), and cosmology-facing photon records remain downstream of [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md).

The proposed photon carrier is a coaxial contra-rotating polarity-conjugate planar pair: two planar braid configurations sharing an axis, circulating oppositely, and related by reversal of constituent polarities. Gate A tests its propagation and energy-frequency relation; Gate B tests its polarization and angular-momentum content; Gate C tests its emission and capture transitions. These are inherited proof requirements. This chapter specifies the atomic event record and the balances that a completed derivation must establish. The local [Noether sea](../spacetime/noether-sea.md), the proposed ambient population of neutral assemblies, can change during the event; its pre/post state must be accounted for rather than assumed unchanged.

## Basin Transition

Atomic spectra describe effective electron-assembly envelope basins around a nuclear causal-wake envelope. Let $a$ and $b$ denote two such basins for the same atomic assembly, with $a$ the higher-energy basin in an emission event. The local envelope gap is

$$
\Delta E_{a\to b}^{\mathrm{env}}
=
E_{\mathrm{env}}\!\left(a;\mathcal W_{\mathrm{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}}\right)
-
E_{\mathrm{env}}\!\left(b;\mathcal W_{\mathrm{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}}\right)
>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-b9be97b2cf002651)

Here $\mathcal W_{\mathrm{nuc}}$ summarizes the nuclear constituents' delayed wakes, $\rho_{\text{NS}}(\mathbf X,T)$ is the physical Noether braid density, $n(\mathbf X,T)=\rho_{\text{NS}}(\mathbf X,T)/\rho_{\text{NS},0}$ is its normalization by a fixed reference density, and $\chi_{\text{sea}}(\mathbf X,T)$ is the Noether sea delay factor. Positions $\mathbf X$ lie in the fixed Euclidean void and $T$ is absolute time. Both envelope energies use one common environment and energy calibration. For a changing environment, the reference gap minus the actual pre/post envelope-energy drop must be included exactly once in the resolved environment correction. The gap is an effective atomic quantity; existence and stability of its candidate basins remain dynamical obligations.

In the one-photon comparison, $h$ is the observer-level Planck energy-frequency calibration and $\nu_{a\to b}^{\mathrm{loc}}$ is the local phase frequency before observer clock/rate conversion. With all energy entries in that same calibration, the target line energy is

$$
h\nu_{a\to b}^{\mathrm{loc}}
\simeq
\Delta E_{a\to b}^{\mathrm{env}}
-
\Delta E_{\mathrm{recoil}}
-
\Delta E_{\mathrm{med}}
-
\Delta E_{\mathrm{rem}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-85d921c8becb36d5)

The changes $\Delta E_{\mathrm{recoil}}$, $\Delta E_{\mathrm{med}}$, and $\Delta E_{\mathrm{rem}}$ mean final minus initial center-of-mass kinetic energy, medium/environment energy, and residual internal energy not already included in the envelope labels. The partition must allocate interactions and environmental corrections without overlap. These changes can be negative; nonnegative shares describe the restricted case of an initially resting atom and passive channels taking up energy. An excitation already contained in $E_{\mathrm{env}}(b)$ cannot also be charged to $\Delta E_{\mathrm{rem}}$.

The observer-level frequency comparison then applies the $\left(\Gamma_N^{(\ell)}\right)^{-1}$ clock-rate conversion owned by [Atomic Spectra](../nuclear-atomic/atomic-spectra.md) and [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), where $\Gamma_N^{(\ell)}$ is the cadence-stretch diagnostic at the declared coarse-graining length $\ell$. Its physical derivation remains open. Gate A supplies the separate recovery target $E_\gamma\simeq h\nu_\gamma^{\mathrm{loc}}$; negligible non-photon terms additionally give $E_\gamma\simeq\Delta E_{a\to b}^{\mathrm{env}}$. In dense media, strong gradients, or unresolved recoil regimes, the non-photon terms remain explicit.

## Hydrogen Line Benchmark Record

The hydrogen Rydberg benchmark in [Atomic Spectra](../nuclear-atomic/atomic-spectra.md#hydrogen-rydberg-benchmark-target) supplies the line-gap side of the test. This page supplies the event-record side. For an isolated weak-homogeneous hydrogen transition $a\to b$, the same envelope gap must close as a routed event:

$$
\Delta E_{a\to b}^{\mathrm{env}}
=
E_\gamma
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{med}}
+
\Delta E_{\mathrm{rem}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2f406f80f0996c17)

with $\Delta E_{\mathrm{med}}$ and $\Delta E_{\mathrm{rem}}$ bounded by the declared isolated-line tolerance rather than hidden in the fitted line frequency. A compact event residual is

$$
\mathcal E_{ab}^{\mathrm{evt}}
=
\frac{
\left|
\Delta E_{a\to b}^{\mathrm{env}}
-
E_\gamma
-
\Delta E_{\mathrm{recoil}}
-
\Delta E_{\mathrm{med}}
-
\Delta E_{\mathrm{rem}}
\right|
}{
\left|
\Delta E_{a\to b}^{\mathrm{env}}
\right|
+
\varepsilon_{\mathrm{evt}}
}
\le
\Delta_{\mathrm{evt}}^{\mathrm{tol}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2e0c9ac5db9d4b6b)

For this residual, $\varepsilon_{\mathrm{evt}}>0$ is a fixed energy normalization floor and $\Delta_{\mathrm{evt}}^{\mathrm{tol}}>0$ is a dimensionless tolerance declared with the measurement or computation uncertainty. Neither may be retuned to make an event pass. Each balance entry must be extracted independently of the equality being tested: defining the remnant as the missing balance would make the residual identically zero.

The frequency readout must then agree with the local photon record through a separately evaluated Gate A relation:

$$
\mathcal E_{ab}^{\gamma}
=
\frac{
\left|
E_\gamma
-
h\nu_{\gamma}^{\mathrm{loc}}
\right|
}{
\left|
E_\gamma
\right|
+
\varepsilon_{\gamma}
}
\le
\Delta_{\gamma}^{\mathrm{tol}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4bd962be19ab37c8)

Here $\varepsilon_\gamma>0$ has energy units and $\Delta_\gamma^{\mathrm{tol}}>0$ is dimensionless. The phase frequency must be measured from the photon record with an independently fixed $h$ calibration, rather than defined by $E_\gamma/h$. A small residual tests the declared readouts and uncertainty budget; it does not derive energy conservation or establish a photon branch.

The benchmark fails if a Rydberg-consistent line can be obtained only by dropping recoil, medium excitation, or residual atomic energy from the ledger; if the planar-mode gate is changed between hydrogen lines; if the photon-channel speed used by the spectral comparison differs from the emitted photon record; or if path-history provenance is not sufficient to replay which envelope transition produced the candidate pair. The leading Rydberg comparison also inherits Atomic Spectra's line-dependent correction budget; a common fitted scale alone does not predict its absolute value.

## Planar-Mode Gate

A basin transition is not automatically photon emission. The proposed planar-mode nucleation criterion in the radiation program includes the following necessary tests in the passive energy-sharing case:

$$
\mathcal S_{\gamma}^{\mathrm{at}}
\!\left(
\Gamma_a,\Gamma_b,\mathcal W_{\mathrm{nuc}},
\rho_{\text{NS}},n,\chi_{\text{sea}},J_{\mathrm{loc}}
\right)
\ge
\mathcal S_{\gamma,*},
\qquad
\Delta E_{a\to b}^{\mathrm{env}}\ge E_{\gamma,\min}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0d48d686f1b59903)

The symbol $\mathcal S_{\gamma}^{\mathrm{at}}$ denotes the proposed photon-channel drive, and $\mathcal S_{\gamma,*}$ its threshold in the same units. Its arguments record the pre/post atomic microstates $\Gamma_a,\Gamma_b$, the nuclear causal-wake envelope, local Noether sea state, and causal-root/Jacobian data $J_{\mathrm{loc}}$ including the transmitter-side acceleration weight. A causal root pairs a receiver event with a past transmitter emission whose wake reaches it; the Jacobian records how that root changes with time. The completed Gate C account must compute the drive from the delayed dynamics, not fit it separately for each line. The energy scale $E_{\gamma,\min}$ is a speculative minimum stable photon energy, not an established positive threshold.

The usable photon energy is the gap after all signed non-photon changes above have been included. It must be positive and, if the chosen model has an active minimum, at least $E_{\gamma,\min}$. Thus the displayed raw-gap test is insufficient: a gap larger than the minimum can still leave too little energy after recoil. Dynamic accessibility, constituent inventory, momentum and angular-momentum compatibility, and inherited Gate A/B acceptance are separate requirements.

The following two-case sketch is restricted to transitions for which those other requirements have already been established. Its photon-output case assumes the usable-energy test, and its non-radiative case assumes an accessible alternative channel. Outside that restricted domain a threshold comparison alone decides neither outcome; the event can remain unresolved or the transition can fail to occur:

$$
\text{envelope basin transition}
\longrightarrow
\begin{cases}
\text{planar-mode photon output}, & \mathcal S_{\gamma}^{\mathrm{at}}\ge\mathcal S_{\gamma,*},\\
\text{non-radiative shedding or retained excitation}, & \mathcal S_{\gamma}^{\mathrm{at}}<\mathcal S_{\gamma,*}.
\end{cases}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cbca9f1eaffa2e4e)

## Event Ledger

A resolved emission event is tested against the following effective energy balance over one declared event boundary and time window. All entries share a reference frame, calibration, and disjoint allocation of stored and exchanged energy:

$$
\Delta E_{a\to b}^{\mathrm{env}}
=
E_\gamma
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{med}}
+
\Delta E_{\mathrm{rem}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2f406f80f0996c17-2)

The corresponding momentum ledger is

$$
\Delta \mathbf p_{\mathrm{atom}}
+
\mathbf p_{\gamma}
+
\Delta \mathbf p_{\mathrm{recoil}}
+
\Delta \mathbf p_{\mathrm{med}}
=
\mathbf 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-24c602bf263c5241)

Here $\Delta \mathbf p_{\mathrm{atom}}$ is the internal envelope-redistribution entry and $\Delta \mathbf p_{\mathrm{recoil}}$ is the center-of-mass recoil entry. In a declared center-of-mass decomposition the internal momentum sums to zero and the recoil entry is the atom's whole momentum change; this is a bookkeeping convention whose effective momentum map must be supplied. The medium entry must include the remaining boundary and wake-associated momentum exchange. If that partition has not been established, the displayed four-term balance is incomplete.

Angular momentum is tested component by component about one common origin and over the same event window. The following compact ledger requires a disjoint decomposition: the atomic term excludes center-of-mass recoil and any remnant or handoff contribution listed separately:

$$
\Delta \mathcal J_{\mathrm{atom}}
+
\mathcal J_{\gamma}^{\perp}
+
\Delta \mathcal J_{\mathrm{recoil}}
+
\Delta \mathcal J_{\mathrm{wake}}
+
\Delta \mathcal J_{\mathrm{handoff}}
+
\Delta \mathcal J_{\mathrm{med}}
+
\Delta \mathcal J_{\mathrm{rem}}
=
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-92574b5038daf361)

The photon term $\mathcal J_{\gamma}^{\perp}$ is a Gate B handoff from the two-transverse-polarization sector. To use it in this balance, that handoff must supply the complete photon angular-momentum contribution, including orbital contribution about the declared origin; a polarization projection alone is insufficient. The superscript does not assert that the total angular-momentum vector is perpendicular to propagation. Recoil, wake, material handoff, medium, and remnant entries must also be independently defined and may not count the same transfer twice. A photon record carries its transverse polarization basis, helicity label where applicable, capture outcome, and no-longitudinal-polarization status. Photon spin, Malus' polarization-intensity law, and the squared-amplitude capture rule remain inherited derivations.

The minimum event record is:

| Field | Required content |
| --- | --- |
| Atomic state | Pre/post atomic envelope basins $a,b$, nuclear causal-wake envelope $\mathcal W_{\mathrm{nuc}}$, and closure status of the orbital labels used |
| Local Noether sea state | $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy if relevant, and local causal-root/Jacobian data including the same-record transmitter-side acceleration weight |
| Transition gap | $\Delta E_{a\to b}^{\mathrm{env}}$ and the clock/rate conversion used for observer comparison |
| Channel decision | Planar-mode gate status, non-radiative alternatives, and whether $E_{\gamma,\min}$ is active in the chosen model |
| Photon output or capture | $E_\gamma$, $\mathbf p_\gamma$, direction, phase frequency, local photon-channel speed $c_\gamma$, and Gate A null-branch status |
| Polarization handoff | Transverse basis, helicity label where applicable, accepted/rejected capture channel, Gate B event-residual status, and closure status |
| Recoil and medium terms | $\Delta E_{\mathrm{recoil}}$, $\Delta \mathbf p_{\mathrm{recoil}}$, $\Delta E_{\mathrm{med}}$, $\Delta \mathbf p_{\mathrm{med}}$, and any residual atomic excitation |
| Path-history provenance | Source identities, emission times, active causal-root branches, branch Jacobians, and delayed wake history needed for deterministic replay |
| Constituent routing | Before/after identities and $\epsilon_+/\epsilon_-$ polarity counts for atom, candidate photon, and participating Noether sea content, including any material returned after capture |
| Accounting and statistics | Common boundary, frame, time window, energy calibration, signed disjoint energy/momentum/angular-momentum entries, ensemble preparation, normalized source-basin measure, and declared uncertainties |
| Closure status | Baseline, provisional map, derivation target, failed map, or inherited gate |

## Absorption and Stimulated Channels

Absorption is the opposite energy-transfer channel to emission: an incoming candidate photon is captured while the atom enters a higher envelope basin. This channel description does not establish a literal time reversal of the full delayed history or a capture probability. For a matched environment and negligible remnant change, its compact energy target is

$$
b+\gamma \to a,
\qquad
E_\gamma
\simeq
\Delta E_{a\to b}^{\mathrm{env}}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{med}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8e7a69364d20e9b9)

where the changes are evaluated for this absorption event, not copied from an emission event. If the remnant changes, $\Delta E_{\mathrm{rem}}$ must also be added to the right-hand side. For an initially resting atom in a passive environment, the photon supplies the gap plus recoil and any other uptake. This produces the recoil contribution to an emission/absorption line offset in the effective comparison. A moving atom or an excited medium can supply energy, so its change need not be positive.

In the momentum and angular-momentum balances, replace the outgoing photon contribution by the negative of the incoming contribution for absorption, and use the actual absorption pre/post atomic and medium states. The same event boundary and sign convention apply to every entry.

This is a proposed account of ordinary photon capture by the same atomic assembly. Atomic identity does not remove the constituent-routing obligation: the incoming pair's architrinos must remain explicitly assigned to the post-event atom, medium, or outgoing content. If the event has different outgoing Standard Model assemblies, the channel must additionally identify the target or Noether sea content supplying those inventories.

The same event record must decide whether the photon is absorbed, re-emitted, scattered, reflected, or routed into medium excitation. A failed capture is not an ontology failure; it is a channel-routing outcome whose energy and momentum must still close.

The material-surface version replaces a single isolated atomic pair of basins with a resolved surface cell. For a cell with electron-envelope branch $\mathcal B_e$, nuclear assembly ledger $\mathcal A_{\mathrm{nuc}}^{Z,N}$, bonding or lattice branch $\mathcal B_{\mathrm{lat}}$, local Noether sea record $\Theta_E^{(\ell)}$, and incoming photon ledger $\gamma_{\mathrm{in}}$, the capture question is whether the material return map sends the local state into an absorbed, re-emitted, scattered, reflected, heated, or retained-excitation basin. Its energy row is

$$
E_{\gamma,\mathrm{in}}
=
E_{\gamma,\mathrm{out}}
+
\Delta E_{e\text{-env}}
+
\Delta E_{\mathrm{lat}}
+
\Delta E_{\mathrm{sea}}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{rem}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-44c7979f1ff98aac)

Here $\Delta E_{e\text{-env}}$, $\Delta E_{\mathrm{lat}}$, and $\Delta E_{\mathrm{sea}}$ are signed changes in electron-envelope, lattice, and Noether sea energy; the remnant excludes them. The equation assumes no unlisted external work or boundary flux. This extends the Gate C target to a distributed material final state. A Vantablack-like branch is the proposed limit of little escaping light after repeated interactions; small $E_{\gamma,\mathrm{out}}$ in a finite window alone does not distinguish absorption from delayed escape or storage. A metal-like branch is a proposed coherent outgoing-light channel. Neither limit is established by its name or energy balance; absorption, reflection, scattering, and thermalization require the corresponding response and transport histories.

Stimulated emission and absorption belong to the same Gate C rate program. In the weak homogeneous thermal-equilibrium comparison, pairwise detailed balance means equal forward and reverse ensemble fluxes. For resolved atomic sublevels and a matched photon mode, the target is:

$$
\Gamma_{a\to b+\gamma}\,f_a\,(1+\bar n_\gamma)
=
\Gamma_{b+\gamma\to a}\,f_b\,\bar n_\gamma
$$

[View →](../../../../equation-mapping.html#corpus-equation-2036c6f12a4f721e)

Here $f_a$ and $f_b$ are occupation weights of resolved atomic sublevels, and $\bar n_\gamma$ is the mean occupation of the matched photon mode. The two $\Gamma$ coefficients exclude the explicit occupation factors; $1+\bar n_\gamma$ separates spontaneous and stimulated emission in this comparison. If $a,b$ group degenerate sublevels, the coefficients must include the consistent sublevel sums and averages. An arbitrary weak homogeneous ensemble need not obey this equality: when $f_a>0$ and $\bar n_\gamma=0$, the emission flux can be positive while the absorption flux vanishes. Away from equilibrium their difference governs population change. The equilibrium condition and occupation factors remain observer-level recovery targets.

Optical dispersion adds the line-strength version of the same target. In the old Lorentz-Drude comparison, anomalous dispersion and absorption were summarized by an effective population of resonant oscillators for each line. The quantum correction was to read that measured coefficient through Einstein transition probabilities rather than as a literal count of independently vibrating electrons. In this chapter that coefficient belongs with Einstein coefficients and oscillator strengths as an observer-level comparison object. It must be recovered from the same Gate C rate ledger that supplies emission, absorption, stimulated channels, and detailed balance.

Matrix mechanics is the algebraic face of this Gate C target. Heisenberg's replacement of classical Fourier modes by indexed transition amplitudes is safe here only as observer-level comparison: the indices label pre/post atomic basins, the intensities project from Gate C rates, and the noncommutative product records how sequential transition quantities compose through intermediate basin labels. The multiplication rule is a recovery target for effective operator algebra, not a substrate postulate.

The practical rule is that a line may not use incompatible models for its frequency and strength. For a transition pair $a,b$, the gap, emission and absorption rates, dispersion response, and stimulated coefficients must share one event family, environment, photon branch, recoil convention, and ensemble preparation. A single deterministic event supplies neither an ensemble rate nor a complex transition amplitude. Dispersion and matrix composition additionally need the phase-sensitive response: magnitudes alone do not determine interference or the product of effective operators. A separate resonator population unrelated to the Gate C ensemble would be a fit rather than the stated recovery.

## Gate C Rate Target

The native rate target uses an ensemble of atomic, photon, and local Noether sea histories. First define a finite-window transition probability divided by its duration $T_W>0$, measured in absolute time. The symbol $\Gamma_{a\to b+\gamma}^{\mathbb{A}\mathbb{A}\mathbb{A}}$ in this schematic expression denotes that window-dependent diagnostic, not an established constant transition rate:

$$
\Gamma_{a\to b+\gamma}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{T_W}\,
\mu_{T_W}\!\left\{
\zeta\in\mathcal B_a:
\Phi_{T_W}(\zeta)\in\mathcal B_{b+\gamma}
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-241c2b2b9867e389)

The set $\mathcal B_a$ denotes the prepared source basin, $\zeta$ includes the admissible delayed history and boundary data, and $\mu_{T_W}$ is a dimensionless probability measure conditioned on that preparation, with $\mu_{T_W}(\mathcal B_a)=1$. Its window restrictions must come from one declared ensemble rather than separate fits. The map $\Phi_{T_W}$ evolves that history over the window on a domain where existence and uniqueness hold. The target set $\mathcal B_{b+\gamma}$ includes a durable record that the specified transition occurred. If it records only the endpoint atomic state, an emission followed by recapture can be missed. Repeated events require an event count and source-basin residence time, not this single-event indicator.

For a normalized indicator probability $P_{ab}(T_W)$, the displayed diagnostic satisfies $0\le P_{ab}(T_W)/T_W\le1/T_W$. Hence its limit at fixed preparation as $T_W\to\infty$ is zero. For example, a comparison process with constant escape rate $\lambda>0$ has $P_{ab}(T_W)=1-\exp(-\lambda T_W)$: division by the window approximates $\lambda$ only while $\lambda T_W\ll1$. A survival probability $S_a(T_W)$ instead defines the conditional escape rate $-d\ln S_a/dT_W$ where differentiable; channel-specific rates additionally resolve the competing exits. These identities constrain how a rate is estimated; they do not supply the physical ensemble or transition law.

The weak-coupling recovery target is a rate extracted in a scale-separated window, long compared with the relevant correlation time but short compared with source depletion and finite-system recurrence. A plateau of the finite-window diagnostic in that domain, together with a justified continuum approximation, must recover the following observer-level structure:

$$
\Gamma_{a\to b+\gamma}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\longrightarrow
\frac{2\pi}{\hbar}
\left|
\langle b;\gamma|\widehat V_{\mathrm{eff}}|a;0\rangle
\right|^2
\rho_\gamma(\Delta E)
$$

[View →](../../../../equation-mapping.html#corpus-equation-56ce8a6c189f5810)

Here $\hbar=h/(2\pi)$, $\widehat V_{\mathrm{eff}}$ is an effective interaction operator, and $\rho_\gamma(\Delta E)$ is the density of available final states per unit energy under the same photon-mode normalization. The states $|a;0\rangle$ and $|b;\gamma\rangle$ label the initial atom with no photon in the selected mode and the final atom with one photon. The photon energy and available final states must include the recoil and other corrections already present in the event ledger; using the bare envelope gap is the ideal zero-correction limit. A density-only factorization further assumes that matrix-element variation over the summed states is controlled. Otherwise the squared matrix element belongs inside the state sum or integral. This formula uses one declared clock convention; any comparison with an observer rate requires the corresponding duration conversion.

The operator remains a comparison object. Its amplitudes, relative phases, state normalization, and coupling scale $\alpha$ must emerge from the same assembly and photon histories. Neither capture probabilities alone nor writing a squared-amplitude formula establishes that recovery.

For a general final channel $f$, the same scale-separated, consistently normalized comparison target is
$$
\Gamma_{a\to f}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\rightarrow
\frac{2\pi}{\hbar}
\left|\mathcal{M}_{a\to f}^{\mathrm{eff}}\right|^2
\rho_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-542b0eccb2bd0902)

Here $\mathcal M_{a\to f}^{\mathrm{eff}}$ is the effective transition matrix element and $\rho_f$ the final-state density per unit energy, with the same sum-or-integral qualification. The arrows denote a recovery obligation, not an infinite-window limit of a bounded probability divided by time. Discrete atomic labels and continuum photon or recoil states must be derived and counted under one compatible ensemble and normalization.

Selection rules are Gate C closure targets for which channels have zero, small, or appreciable transition weight after the full event constraints are applied. Each statement names its approximation, ensemble, and channel; a forbidden leading contribution can coexist with higher-order, medium-assisted, or multi-photon transitions. Observing no events in a finite sample does not prove zero measure. Exact exclusion needs a symmetry or dynamical argument, while suppression requires an uncertainty bound relative to a declared rate scale.

## Observer-Level Recovery

The benchmark recoveries for this page are:

- spectral line frequencies after local clock/rate conversion;
- absorption and emission rates in the Fermi's Golden Rule limit;
- Einstein coefficient relations and detailed balance in thermalized ensembles;
- the hydrogen $2s\to1s$ two-photon continuum, with one vertex closing a shared ledger $E_{\gamma,1}+E_{\gamma,2}=\Delta E_{2s\to1s}^{\mathrm{env}}-\Delta E_{\mathrm{recoil}}-\Delta E_{\mathrm{med}}-\Delta E_{\mathrm{rem}}$ and both photons carrying separate Gate A/B rows;
- Lyman-$\alpha$ resonant trapping and escape as a coupled emission-capture-transport recovery, not as a modified local line gap;
- natural line widths as a recovery target for transition-time and basin-escape statistics;
- recoil, Doppler, pressure, Zeeman, Stark, fine-structure, and hyperfine corrections only after the relevant transport, medium, and spin-ledger dependencies are supplied.

Spin-sensitive line structure remains downstream of the angular-momentum proof program. This page may record the event ledger for such lines, but fine-structure, spin-orbit, Zeeman, and hyperfine interpretations must inherit the completed internal spinor ledger and measurement-response model rather than being derived from atomic spectra alone.

Cosmology-facing use of any line should keep source-branch changes separate from propagation. In the redshift factorization of [Expansion Mechanism](../cosmology/expansion-mechanism.md#observable-frequency-form), an altered transition gap belongs in $B_X(E)$, while endpoint cadence, launch motion, and Noether sea path accumulation belong in their own factors. The [21 cm hydrogen line example](../cosmology/expansion-mechanism.md#21-cm-hydrogen-line-example) applies this rule to hyperfine emission without treating the hyperfine splitting as closed here.

## Closure Status

Proposed ontology (referent-pending): a photon emitted or captured in this channel is modeled as a coaxial contra-rotating polarity-conjugate planar pair (the planar-pair acceleration-balance closure is still open), and atomic line radiation is a routed assembly-level transition rather than excitation of a separate fundamental electromagnetic field.

Derivation targets: compute $\mathcal S_{\gamma}^{\mathrm{at}}$, recover the weak-coupling transition-rate limit, derive selection-rule basin measures, close recoil and medium ledgers, recover the hydrogen $2s\to1s$ two-photon and Lyman-$\alpha$ escape bottlenecks, and recover detailed balance without changing the Noether sea state map between emission, absorption, and thermal ensembles. The named single-record closure requires frequency, emission and absorption strength, dispersion strength, stimulated coefficients, and continuum inverse channels to project from the same event family.

Effective summaries: orbital labels, line frequencies, Einstein coefficients, oscillator strengths, and effective operators remain useful comparison objects when their closure status is stated.

Speculative extensions: minimum stable photon energy, Noether sea-dependent line deviations, and basin-escape explanations of linewidths should remain provisional until the standard isolated-atom limits are recovered.

If the mapping reproduces standard line data only by preserving the same independent fit inputs and supplies no new cross-channel consistency constraint, its remaining value is interpretive rather than a derived reduction of the atomic-radiation description.

## Comparison Source

MIT OpenCourseWare, *8.06 Quantum Physics III* (Spring 2016), [Chapter 2: Time-Dependent Approximation Methods](https://www.ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2016/0c27511c09675d8d385577023328248b_MIT8_06S16_chap2.pdf), §§2.1–2.3, supplies the observer-level transition-rate, spontaneous/stimulated-emission, and thermal-equilibrium comparisons. Its quantum operators and photon occupation factors are comparison targets here. The bounded-probability argument above is a separate mathematical check on the proposed basin-measure definition.
