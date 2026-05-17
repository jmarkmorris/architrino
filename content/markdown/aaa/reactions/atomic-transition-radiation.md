# Atomic Transition Radiation

Atomic transition radiation is the line-emission and line-absorption channel in which an electron-assembly envelope moves between effective atomic resonance basins and the excess action is routed through a photon planar-mode channel, recoil, medium excitation, or residual atomic energy.

This page specializes the shared routing skeleton in [Radiation](radiation.md). The envelope energies and spectral labels are inherited from [Atomic Spectra](../nuclear-atomic/atomic-spectra.md), while photon ontology and Gate A/B/C closure requirements are inherited from [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md#photon-closure-interface). Reaction provenance follows [Reaction Ledger](../validation/reaction-ledger.md), and cosmology-facing photon records remain downstream of [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md).

This chapter is not a completed derivation of atomic transition rates. Its role is to state the first event record for the Gate C vertex: how a bound atomic envelope sheds or captures a coaxial contra-rotating pro/anti planar pair while preserving energy, momentum, angular momentum, local Noether-Sea state, and path-history provenance.

## Basin Transition

Atomic spectra describe effective electron-assembly envelope basins around a nuclear causal-wake envelope. Let $a$ and $b$ denote two such basins for the same atomic assembly, with $a$ the higher-energy basin in an emission event. The local envelope gap is

$$
\Delta E_{a\to b}^{\mathrm{env}}
=
E_{\mathrm{env}}\!\left(a;\mathcal W_{\mathrm{nuc}},\rho_{\text{core}},n,\chi_{\text{sea}}\right)
-
E_{\mathrm{env}}\!\left(b;\mathcal W_{\mathrm{nuc}},\rho_{\text{core}},n,\chi_{\text{sea}}\right)
>0.
$$

Here $\mathcal W_{\mathrm{nuc}}$ is the effective nuclear causal-wake envelope, $\rho_{\text{core}}(\mathbf{x},t)$ is the physical Noether-core density, $n(\mathbf{x},t)$ is the normalized Noether-core density, and $\chi_{\text{sea}}(\mathbf{x},t)$ is the Noether-Sea delay factor. The gap is an effective atomic quantity, not a proof that the underlying Noether-core ledgers of the nucleus or electron have already been derived.

The observer-level line frequency is recovered only after local clock/rate conversion:

$$
h\nu_{a\to b}^{\mathrm{loc}}
\simeq
\Delta E_{a\to b}^{\mathrm{env}}
-
\Delta E_{\mathrm{recoil}}
-
\Delta E_{\mathrm{med}}
-
\Delta E_{\mathrm{core remnant}}.
$$

In the ideal isolated line limit, the non-photon terms are negligible and $E_\gamma\simeq h\nu_{a\to b}^{\mathrm{loc}}$. In dense media, strong gradients, or unresolved recoil regimes, those terms must remain in the ledger rather than being silently absorbed into the line frequency.

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
\Delta E_{\mathrm{core remnant}},
$$

with $\Delta E_{\mathrm{med}}$ and $\Delta E_{\mathrm{core remnant}}$ bounded by the declared isolated-line tolerance rather than hidden in the fitted line frequency. A compact event residual is

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
\Delta E_{\mathrm{core remnant}}
\right|
}{
\left|
\Delta E_{a\to b}^{\mathrm{env}}
\right|
+
\varepsilon_{\mathrm{evt}}
}
\le
\Delta_{\mathrm{evt}}^{\mathrm{tol}}.
$$

The frequency readout must then agree with the local photon record:

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
\Delta_{\gamma}^{\mathrm{tol}}.
$$

The benchmark fails if a Rydberg-consistent line can be obtained only by dropping recoil, medium excitation, or residual atomic energy from the ledger; if the planar-mode gate is changed between hydrogen lines; if the photon-channel speed used by the spectral comparison differs from the emitted photon record; or if path-history provenance is not sufficient to replay which envelope transition produced the coaxial contra-rotating pro/anti planar pair.

## Planar-Mode Gate

A basin transition is not automatically photon emission. It becomes atomic transition radiation only when the available gap and the local channel geometry cross the planar-mode nucleation gate inherited from the radiation program:

$$
\mathcal S_{\gamma}^{\mathrm{at}}
\!\left(
\Gamma_a,\Gamma_b,\mathcal W_{\mathrm{nuc}},
\rho_{\text{core}},n,\chi_{\text{sea}},J_{\mathrm{loc}}
\right)
\ge
\mathcal S_{\gamma,*},
\qquad
\Delta E_{a\to b}^{\mathrm{env}}\ge E_{\gamma,\min}.
$$

The symbol $\mathcal S_{\gamma}^{\mathrm{at}}$ denotes the atomic-transition specialization of the photon-channel drive. Its arguments record the pre/post atomic microstates $\Gamma_a,\Gamma_b$, the nuclear causal-wake envelope, local Noether-Sea density and delay state, and the local causal-root/Jacobian data. This is a derivation target: the completed Gate C account must compute this drive from the assembly return map and delayed causal-wake ledger, not fit it separately for each line.

If the gate is not crossed, the same basin transition may still route energy into recoil, medium excitation, internal remnant energy, or a non-radiative material update. The channel distinction is therefore:

$$
\text{envelope basin transition}
\longrightarrow
\begin{cases}
\text{planar-mode photon output}, & \mathcal S_{\gamma}^{\mathrm{at}}\ge\mathcal S_{\gamma,*},\\
\text{non-radiative shedding or retained excitation}, & \mathcal S_{\gamma}^{\mathrm{at}}<\mathcal S_{\gamma,*}.
\end{cases}
$$

## Event Ledger

A resolved emission event should close the local energy record

$$
\Delta E_{a\to b}^{\mathrm{env}}
=
E_\gamma
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{med}}
+
\Delta E_{\mathrm{core remnant}}.
$$

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
\mathbf 0.
$$

Angular momentum and wake-carried angular momentum must close at the same vertex:

$$
\Delta \mathcal J_{\mathrm{atom}}
+
\mathcal J_{\gamma}^{\perp}
+
\Delta \mathcal J_{\mathrm{wake}}
+
\Delta \mathcal J_{\mathrm{med}}
=
0.
$$

The photon term $\mathcal J_{\gamma}^{\perp}$ is a Gate B handoff. This page records that an emitted or absorbed photon assembly must carry the transverse angular-momentum ledger, polarization basis, helicity label where applicable, and no-longitudinal-mode status. It does not locally prove photon spin, Malus' law, or the squared-amplitude capture rule.

The minimum event record is:

| Field | Required content |
| --- | --- |
| Atomic state | Pre/post atomic envelope basins $a,b$, nuclear causal-wake envelope $\mathcal W_{\mathrm{nuc}}$, and closure status of the orbital labels used |
| Local Noether-Sea state | $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy if relevant, and local causal-root/Jacobian data |
| Transition gap | $\Delta E_{a\to b}^{\mathrm{env}}$ and the clock/rate conversion used for observer comparison |
| Channel decision | Planar-mode gate status, non-radiative alternatives, and whether $E_{\gamma,\min}$ is active in the chosen model |
| Photon output or capture | $E_\gamma$, $\mathbf p_\gamma$, direction, phase frequency, local photon-channel speed $c_\gamma$, and Gate A null-branch status |
| Polarization handoff | Transverse basis, helicity label where applicable, accepted/rejected capture channel, and Gate B closure status |
| Recoil and medium terms | $\Delta E_{\mathrm{recoil}}$, $\Delta \mathbf p_{\mathrm{recoil}}$, $\Delta E_{\mathrm{med}}$, $\Delta \mathbf p_{\mathrm{med}}$, and any residual atomic excitation |
| Path-history provenance | Source identities, emission times, active causal-root branches, branch Jacobians, and delayed wake history needed for deterministic replay |
| Closure status | Baseline, provisional map, derivation target, failed map, or inherited gate |

## Absorption and Stimulated Channels

Absorption is the inverse Gate C vertex: an incoming coaxial contra-rotating pro/anti planar pair is captured by the atomic assembly and folded into a higher envelope basin when the capture geometry and gap condition match. In compact form,

$$
b+\gamma \to a,
\qquad
E_\gamma+\Delta E_{\mathrm{med}}+\Delta E_{\mathrm{recoil}}
\simeq
\Delta E_{a\to b}^{\mathrm{env}}.
$$

The same event record must decide whether the photon is absorbed, re-emitted, scattered, reflected, or routed into medium excitation. A failed capture is not an ontology failure; it is a channel-routing outcome whose energy and momentum must still close.

The material-surface version replaces a single isolated atomic pair of basins with a resolved surface cell. For a cell with electron-envelope branch $\mathcal B_e$, nuclear assembly ledger $\mathcal A_{\mathrm{nuc}}^{Z,N}$, bonding or lattice branch $\mathcal B_{\mathrm{lat}}$, local Noether-Sea record $\Theta_E^{(\ell)}$, and incoming photon ledger $\gamma_{\mathrm{in}}$, the capture question is whether the material return map sends the local state into an absorbed, re-emitted, scattered, reflected, heated, or retained-excitation basin. Its energy row is

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
\Delta E_{\mathrm{rem}}.
$$

This is the same Gate C vertex as atomic absorption, but with the final state distributed over the material branch rather than one isolated envelope label. A Vantablack-like branch is a high-depth repeated-capture limit with $E_{\gamma,\mathrm{out}}\approx0$ after many cells. A metal-like branch is a coherent re-release limit in which the conduction-electron response carries most of the incoming ledger back into an outgoing planar-pair mode. Both limits remain provisional until the same basin-measure and event-ledger program recovers standard absorption, reflection, scattering, and thermalization behavior.

Stimulated emission and absorption belong to the same Gate C rate program. In the weak homogeneous validated limit, the coarse-grained transition ledger must recover the usual detailed-balance relation:

$$
\Gamma_{a\to b+\gamma}\,f_a\,(1+\bar n_\gamma)
=
\Gamma_{b+\gamma\to a}\,f_b\,\bar n_\gamma.
$$

Here $f_a$ and $f_b$ are ensemble occupation weights for the atomic basins and $\bar n_\gamma$ is the effective photon occupation. This is an observer-level recovery target, not a substrate postulate.

## Gate C Rate Target

The native rate target should be a basin-measure statement over deterministic atomic, photon, and local Noether-Sea microstates. For a record window $T$, a schematic form is

$$
\Gamma_{a\to b+\gamma}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{T}\,
\mu_T\!\left\{
\zeta\in\mathcal B_a:
\Phi_T(\zeta)\in\mathcal B_{b+\gamma}
\right\}.
$$

The set $\mathcal B_a$ denotes the resolved microstate basin corresponding to the effective atomic state $a$, $\mathcal B_{b+\gamma}$ denotes the basin in which the lower atomic state and outgoing photon assembly are accepted, $\Phi_T$ is the deterministic return map across the record window, and $\mu_T$ is the unresolved-material measure induced by the local ensemble and path-history distribution.

In the validated weak-coupling limit, this rate must reduce to the familiar transition-rate structure:

$$
\Gamma_{a\to b+\gamma}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\longrightarrow
\frac{2\pi}{\hbar}
\left|
\langle b;\gamma|\widehat V_{\mathrm{eff}}|a;0\rangle
\right|^2
\rho_\gamma(\Delta E).
$$

The operator $\widehat V_{\mathrm{eff}}$ is only an effective comparison object. The foundation-up burden is to show that its matrix-element behavior emerges from overlap and capture probabilities between the atomic assembly and the photon planar-mode branch. The same passage must recover the effective electromagnetic coupling scale $\alpha$ without treating $\alpha$ as a separate ontology.

Selection rules should be carried as Gate C closure targets. In this framing, an allowed line corresponds to a nonzero basin measure for the accepted photon channel after energy, momentum, transverse angular momentum, parity-like geometry, and local medium constraints are applied. A forbidden or suppressed line corresponds to zero or small basin measure in the leading channel, with possible recovery through higher-order routing, medium coupling, or multi-photon channels only when the event ledger closes.

## Observer-Level Recovery

The benchmark recoveries for this page are:

- spectral line frequencies after local clock/rate conversion;
- absorption and emission rates in the Fermi's Golden Rule limit;
- Einstein coefficient relations and detailed balance in thermalized ensembles;
- natural line widths as a recovery target for transition-time and basin-escape statistics;
- recoil, Doppler, pressure, Zeeman, Stark, fine-structure, and hyperfine corrections only after the relevant transport, medium, and spin-ledger dependencies are supplied.

Spin-sensitive line structure remains downstream of the angular-momentum proof program. This page may record the event ledger for such lines, but fine-structure, spin-orbit, Zeeman, and hyperfine interpretations must inherit the completed internal spinor ledger and measurement-response model rather than being derived from atomic spectra alone.

Cosmology-facing use of any line should keep source-branch changes separate from propagation. In the redshift factorization of [Expansion Mechanism](../cosmology/expansion-mechanism.md#observable-frequency-form), an altered transition gap belongs in $B_X(E)$, while endpoint cadence, launch motion, and Noether-Sea path accumulation belong in their own factors. The [21 cm hydrogen line example](../cosmology/expansion-mechanism.md#21-cm-hydrogen-line-example) applies this rule to hyperfine emission without treating the hyperfine splitting as closed here.

## Closure Status

Accepted ontology: a photon emitted or captured in this channel is a coaxial contra-rotating pro/anti planar pair, and atomic line radiation is a routed assembly-level transition rather than excitation of a separate fundamental electromagnetic field.

Derivation targets: compute $\mathcal S_{\gamma}^{\mathrm{at}}$, recover the weak-coupling transition-rate limit, derive selection-rule basin measures, close recoil and medium ledgers, and recover detailed balance without changing the Noether-Sea state map between emission, absorption, and thermal ensembles.

Effective summaries: orbital labels, line frequencies, Einstein coefficients, oscillator strengths, and effective operators remain useful comparison objects when their closure status is stated.

Speculative extensions: minimum stable photon energy, Noether-Sea-dependent line deviations, and basin-escape explanations of linewidths should remain provisional until the standard isolated-atom limits are recovered.
