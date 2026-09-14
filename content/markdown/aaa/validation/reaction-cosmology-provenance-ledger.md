# Reaction-Cosmology Provenance Ledger

This ledger connects local reaction provenance to cosmology-facing radiation, thermalization, and source-history claims. It is the bridge record for channels where synchrotron cascades, bremsstrahlung, pair production, BBN photon loading, and CMB thermalization all depend on the same underlying bookkeeping.

Use it with [Reaction Ledger](reaction-ledger.md), [Radiation](../reactions/radiation.md#radiation-event-record-schema), [Synchrotron](../reactions/synchrotron.md), [Bremsstrahlung](../reactions/bremsstrahlung.md), [BBN Constraints](../cosmology/BBN-constraints.md), and [CMB](../cosmology/CMB.md).

## Purpose

Cosmology-facing reaction claims need more than a source story. They need a record of what enters and exits each channel at the substrate level, and how those local channels become observer-level background quantities such as photon bath temperature, $N_{\text{eff}}$ (the effective number of light relativistic species inferred from the radiation energy budget), light-element yields, redshift, and TT/TE/EE spectra (the angular power spectra of the CMB temperature and polarization and their cross-correlation).

This ledger separates four levels:

- **Ontology:** architrinos, Noether braids, axial layers, photon assemblies, and the Noether sea itself; the Noether sea state variables used below, the braid density $\rho_{\text{NS}}$, its normalized form $n$, and the delay factor $\chi_{\text{sea}}$, are coarse-grained descriptors of that content rather than additional primitives.
- **Reaction mechanics:** association, dissociation, planar-mode nucleation, pair production, recoil, and medium excitation.
- **Transport and thermalization:** opacity, scattering, cascade depth, diffusion, cooling, path-history redshift, and signed photon-frequency exchange.
- **Effective observables:** emissivity, light-element yield, blackbody spectrum, anisotropy, polarization, and inferred cosmological parameters.

## Leap Opportunity Record

The ledger tests a possible unification of four related bookkeeping problems: radiative planar-mode nucleation, pair-production provenance, BBN photon loading, and CMB thermalization. The shared claim is not that these channels are already derived from one equation. The disciplined claim is that they may need one common provenance ledger because each asks the same question at a different scale: which assemblies, Noether braid material, energy-momentum terms, and Noether sea state variables enter and exit the channel?

### Claim Status

| Claim | Bucket | Status | Decision gate |
| --- | --- | --- | --- |
| Bremsstrahlung and synchrotron both require planar-mode nucleation from assembly stress or wake concentration | Derivation-closure target | Provisional map | A common threshold condition must recover standard emissivity scalings in validated regimes |
| Pair production reorganizes local substrate content rather than creating charged assemblies from nothing | Ontology plus derivation-closure target | Accepted as ontology framing, open as quantitative derivation | Event records must balance architrino inventory, energy-momentum, and Breit-Wheeler rate behavior |
| BBN photon loading can be supplied by the same radiation and pair channels used in high-energy transport | Speculation promoted to closure target | Open | The source-zone photon ledger must preserve D, $^4$He, Li, and $N_{\text{eff}}$ constraints without per-source retuning |
| CMB blackbody recovery can be treated as source-to-transport-to-decoupling provenance rather than as an isolated source story | Derivation-closure target | Open | Thermalization depth, damping, anisotropy, polarization, and redshift handoff must all survive one shared parameter map |

### Discussion Gate

Before this bridge is promoted from ledger opportunity to mainline cosmology doctrine, the corpus needs a first quantitative record for at least one full path:

$$
\text{source channel}
\rightarrow
\text{photon or pair assembly output}
\rightarrow
\text{thermalization path}
\rightarrow
\text{observer-level background variable}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1a80b835ef4ef7cf)

The minimal useful first path is BBN photon loading: identify a source-zone radiation channel, record its event-level provenance, propagate it through the local thermalization assumptions, and show whether it can support an effective baryon-to-photon number ratio $\eta_B\approx6\times10^{-10}$ during the deuterium bottleneck window. The bottleneck window is the interval in which the photon bath is still energetic enough to dissociate newly formed deuterium faster than it forms, so that nucleosynthesis waits until the bath cools; because photons outnumber baryons by roughly $10^{9}$ to one, even the high-energy tail of the bath matters, and the reference value is the post-annihilation ratio fixed by the present CMB photon density, as recorded in [BBN Constraints](../cosmology/BBN-constraints.md).

## Shared Provenance Fields

| Field | What must be recorded | Why it matters |
| --- | --- | --- |
| Architrino inventory | $\epsilon_+/\epsilon_-$ counts, braid/axial-layer separation, and identity routing for recruited or returned substrate content | Prevents creation-from-nothing wording in pair and weak channels |
| Noether sea state | $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy, and excitation state | Keeps density, delay, and transport variables distinct |
| Noether sea recruitment and return | Neutral Noether braid content recruited into a reaction, returned to the ambient population, reclassified into another branch, or left as local excitation | Treats the Noether sea as a participant in vertices that change apparent inventory, not as a passive background |
| Radiation event record | Source assembly, trigger geometry, the phase-closure mismatch $\delta\Theta_a$ of each active binary index $a$, the excess excitation energy $E_{\text{exc}}$ above the nearest stable rung, the photon energy $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, and closure status | Provides the local event schema that can be propagated into source-zone, transport, and observer-level cosmology claims |
| Photon assembly channel | Planar-mode nucleation threshold, emitted energy, direction, polarization basis, and transverse angular-momentum ledger | Links bremsstrahlung, synchrotron, and CMB photon-bath claims |
| Pair channel | Incoming photon assemblies, the declared provenance fork (direct rearrangement of the photon constituents, or recruited and returned neutral Noether braid content), identity routing under that fork, final $e^+e^-$ assemblies, and recoil/medium excitation | Keeps pair production as association from local substrate content, not ex nihilo creation |
| Energy-momentum ledger | Internal energy, kinetic energy, recoil, emitted assemblies, and medium excitation | Required for observer-rate and spectrum recovery |
| Thermalization path | scattering depth, coupling time, cooling time, and escape time | Determines when local reactions can feed BBN or CMB background claims |
| Observer handoff | emissivity, opacity, redshift kernel, effective temperature, $N_{\text{eff}}$, and $C_\ell$ inputs | Keeps standard comparison variables useful without treating them as ontology |

## Photon Closure Gates

Photon-channel records should be sorted into three gates before they are used in cosmology-facing arguments.

The chapter-level source for the photon ontology and Gate A theorem scaffold is [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md#photon-closure-interface). This ledger records what a reaction or cosmology channel must carry forward from that scaffold before it uses photon propagation, polarization, pair production, or thermal radiation as settled input. Gate B is downstream of [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md); the fields below are acceptance records, not an independent derivation of photon spin or polarization statistics. Photon-pair Bell/CHSH claims (correlation tests between the polarization outcomes of two photons, whose bounds depend on the single-photon statistics that Gate B must recover) and CMB polarization-transfer claims must therefore inherit Gate B and the pair-provenance measure rather than being closed by cosmology bookkeeping alone.

| Gate | Claim bucket | What the ledger must track | Closure test |
| --- | --- | --- | --- |
| Gate A: kinematics and optics | Derivation-closure target | $c_f$, $c_\gamma$, $\delta_\gamma\equiv1-c_\gamma/c_f$, planar-pair spacing $d$, phase frequency $\omega$, phase wavelength $\lambda_\gamma$, geometric phase, and medium delay state | Recover $E_\gamma=h\nu$, $p_\gamma=h/\lambda_\gamma$, masslessness, no rest proper-time branch, nondispersion, and no unacceptable preferred-frame leakage without identifying phase wavelength with carrier radius, pair spacing, or packet extent |
| Gate B: polarization and spin | Derivation-closure target | transverse ledger orientation, analyzer basis, helicity, projection/capture geometry, accepted/rejected channel outcomes, source depletion, recoil, causal-wake, handoff, and event-balance rows | Recover exactly two transverse modes, no longitudinal mode, Malus' law, helicity $\pm1$, single-photon statistics, no-signaling constraints, and the photon Gate B event residual $\mathcal R_{\gamma B}^{\mathrm{event}}$ below tolerance |
| Gate C: vertices and transitions | Derivation-closure target | emission, absorption, pair production, recoil, medium excitation, transition rates, and overlap/capture probabilities | Recover QED/Maxwell limits, Breit-Wheeler thresholds and rates, blackbody behavior, Compton-like scattering, photon-photon limits, and the effective electromagnetic coupling scale $\alpha_{\mathrm{EM}}$ (written $\alpha$ in Electroweak Bosons; this ledger reserves bare $\alpha$ for a neutrino flavor label below) |

These gates are not separate ontologies. They are bookkeeping filters that prevent a local photon-source story from being used as cosmology doctrine before the same event record also closes photon transport, polarization, pair conversion, and observer-level comparison variables. The shared radiation event record is the carrier for those gate handoffs; Gate B remains inherited and is not re-derived by this cosmology ledger.

## Channel Map

| Channel | Source document | Provenance target | Status |
| --- | --- | --- | --- |
| Bremsstrahlung planar-mode nucleation | [Bremsstrahlung](../reactions/bremsstrahlung.md) | Record electron assembly energy loss, target recoil, photon assembly output, and medium excitation | Provisional map |
| Synchrotron planar-mode nucleation | [Synchrotron](../reactions/synchrotron.md) | Derive photon output from curved charged-assembly transport in anisotropic Noether sea states | Provisional map |
| Breit-Wheeler pair channel | [Synchrotron](../reactions/synchrotron.md) | Record incoming photon assemblies, the declared provenance fork with its recruited or returned Noether braid content, and final $e^+e^-$ assemblies | Derivation target |
| BBN photon bath | [BBN Constraints](../cosmology/BBN-constraints.md) | Show that pair, bremsstrahlung, synchrotron, and related channels maintain effective $\eta_B\approx6\times10^{-10}$ during the bottleneck window | Closure target |
| CMB thermal spectrum | [CMB](../cosmology/CMB.md) | Show that source emission, transport, and thermalization produce a near-blackbody photon bath with allowed anisotropy and damping structure | Closure target |
| Horizon-interface photon release | [Black Holes](../spacetime/black-holes.md#horizon-adjacent-photon-channel) and [CMB](../cosmology/CMB.md#horizon-interface-photon-release-candidate) | Record photon-channel or photon-channel-adjacent packets processed near the symmetry-breaking threshold, including interior blueshift, exterior redshift, thermalization, and release-channel selection | Candidate strong-field source record |
| Intergalactic pair/reaction production | [CMB](../cosmology/CMB.md), [Expansion Mechanism](../cosmology/expansion-mechanism.md), and [Dark Matter](../cosmology/dark-matter.md) | Inventory photon, neutrino, plasma, cosmic-ray, neutral-assembly, and Noether sea source components before using sparse visible matter as an ontology argument | Source-component target |
| Redshift and clock handoff | [Expansion Mechanism](../cosmology/expansion-mechanism.md) | Map photon transport through $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, and clock-rate comparison | Effective summary with open derivation |
| Sunyaev-Zeldovich / Compton-like frequency exchange | [CMB](../cosmology/CMB.md#sunyaev-zeldovich-path-history-calibration) and [Radiation](../reactions/radiation.md#path-frequency-exchange) | Record incoming photon packet, intervening electron or medium state, outgoing frequency, recoil, medium energy change, and thermalization side effects | Calibration entry and closure target |

## Minimum Records by Channel

Each minimum record below specializes the shared event schema in [Radiation](../reactions/radiation.md#radiation-event-record-schema). Additional cosmology variables may be added, but the source assembly, source-depletion row, trigger geometry, the phase-closure mismatch $\delta\Theta_a$ of each active binary index $a$, the excess excitation energy $E_{\text{exc}}$ above the nearest stable rung, the photon energy $E_\gamma$ (recorded separately for incoming and outgoing photons when the event captures or scatters), recoil, medium excitation, polarization handoff, photon Gate B event residual when $E_\gamma\ne0$, causal-wake ledger, identity routing, and closure status fields remain required. Throughout this ledger, an energy entry written $\Delta E$ with a counterparty subscript is the final-minus-initial gain of that counterparty over the event window, in one declared frame, so that a photon energy loss is balanced by equal recorded gains elsewhere.

### Bremsstrahlung

The minimum event record carries the reduced relaxation budget of [Bremsstrahlung](../reactions/bremsstrahlung.md):

$$
E_{\text{exc}}^{\mathrm{br}}
=
E_\gamma
+
\Delta E_{\text{recoil}}
+
\Delta E_{\text{med}}
+
\Delta E_{\text{rem}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b9cc5364cea8d5e3)

Here $E_{\text{exc}}^{\mathrm{br}}$ is the bremsstrahlung excitation energy prepared by the deceleration event, $E_\gamma$ is the emitted photon energy, and $\Delta E_{\text{recoil}}$, $\Delta E_{\text{med}}$, and $\Delta E_{\text{rem}}$ are the gains of the target recoil account, the Noether sea excitation account, and the excitation retained above the chosen final reference. This reduced budget is the minimum record only under the conditions its owner states: external driving has ended, the wake and handoff energy changes vanish within the declared tolerance, and no reaction product carries energy away. Otherwise the wake, handoff, and reaction terms of the general schema remain explicit, and the reduced equation is not a substitute for the full source-depletion balance. The provenance record must also include the source electron assembly, target assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, local $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, planar-mode threshold status, emitted photon assembly direction, recoil, medium excitation, causal-wake ledger, identity routing, closure status, and whether the event occurs in a regime where standard free-free emissivity remains the observer-level scaffold. Its polarization handoff inherits photon Gate B rather than deriving photon spin locally, and the record remains provisional until the event residual routes source, recoil, medium, wake, handoff, and remnant rows.

### Synchrotron Emission

The event record must connect charged-assembly curvature, the effective magnetic-field map, source depletion, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, photon assembly output $E_\gamma$, recoil, medium excitation, causal-wake ledger, identity routing, and photon Gate B event residual. The closure target is to derive the standard $\nu_c \propto \gamma^2 B$ and $P_{\mathrm{syn}}\propto U_B\gamma^2$ scalings from Noether sea anisotropy and wake-strain threshold conditions rather than fitting a separate emission rule. In these standard comparison forms, $\nu_c$ is the characteristic emitted frequency, $P_{\mathrm{syn}}$ the emitted power, $\gamma$ the Lorentz factor of the emitting charged assembly (a quoted benchmark symbol, distinct from the photon label $\gamma$ used elsewhere in this ledger), $B$ the effective magnetic-field magnitude, and $U_B$ the corresponding effective field energy density. Synchrotron polarization records inherit Gate B, so this ledger carries the transverse handoff without proving photon helicity locally.

### Pair Production

The event record must avoid creation-from-nothing wording. Incoming photon assemblies trigger association of local substrate content into $e^+e^-$ assemblies when the observer-level threshold is satisfied; in the standard comparison form that threshold requires the center-of-momentum energy of the photon pair to reach twice the electron rest energy, $\sqrt{s}\ge2m_ec^2$, where $s$ is the invariant with units of energy squared, so $s\ge4m_e^2c^4$ in the convention recorded in [Synchrotron](../reactions/synchrotron.md). The incoming photons supply energy, momentum, polarization handoff, and trigger geometry; no architrino identity is created at the vertex. Which existing identities become the charged assemblies is the provenance fork of [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md#pair-production-note): in the direct-rearrangement fork the constituents of the two photon ledgers alone supply the outgoing Noether braid and axial inventories, with no net Noether sea requisition; in the recruited-source fork a declared neutral two-braid source assembly from the Noether sea supplies or receives braid content while the photons provide the energy and the trigger. The record must declare which fork it uses, and the fork is decided by closure, not by wording. The incoming photons preserve their radiation event records through the pair vertex. The pair-channel record must include:

- incoming photon assembly energies and directions,
- incoming photon polarization handoffs as inherited Gate B records,
- the declared provenance fork, with the local Noether braid material recruited, returned, or reconfigured under it and identity routing for the architrinos assigned to the final charged assemblies,
- final charged assembly inventories,
- recoil and medium-excitation terms,
- causal-wake ledger and closure status,
- and the standard-limit cross-section target.

This is the ledger distinction that ordinary absorption does not need: atomic or material capture closes the photon ledger into an existing target or medium record, while pair production closes the photon ledger and separately routes identity-tracked substrate content, from the photon constituents or from a recruited source, into new charged assemblies.

### Intergalactic Pair And Reaction Source Components

Sparse visible matter between galaxies is not enough to close a cosmology source inventory. A reaction-cosmology packet should include a component inventory
$$
\mathcal{I}_{\mathrm{IGM}}
=
\left(
N_\gamma,
N_\nu,
N_{\mathrm{CR}},
N_{\mathrm{plasma}},
N_{\mathrm{dust}},
N_A,
\rho_{\text{NS}},
S_{\mathrm{pair}},
S_{\mathrm{return}}
\right)_W
$$

[View →](../../../../equation-mapping.html#corpus-equation-eea86edc186d76ca)

for a declared window $W$. Here $N_\gamma$, $N_\nu$, $N_{\mathrm{CR}}$, $N_{\mathrm{plasma}}$, and $N_{\mathrm{dust}}$ count the photon, neutrino, cosmic-ray, plasma, and dust content of the window, $N_A$ records neutral or dark assembly candidates, $\rho_{\text{NS}}$ is the local Noether braid density, $S_{\mathrm{pair}}$ records pair or reaction production inside the window, and $S_{\mathrm{return}}$ records content returned to the Noether sea or reclassified after reactions. This inventory is a source-component record, not a proof of a specific production rate; it prevents "empty intergalactic space" from replacing the actual component ledger.

### BBN Photon Loading

The BBN module needs a source-zone photon ledger. It must identify which radiation channels supply the effective photon-dominated environment and whether they preserve deuterium survival, helium clustering, and $N_{\text{eff}}$ compatibility without per-source retuning.

### Matter-Asymmetry Provenance

The observed baryon-to-photon ratio is a data-product constraint, not permission to import an external baryogenesis mechanism as doctrine. Any matter-asymmetry story used by the cosmology program must be rewritten as a reaction provenance record over a declared source window $W$. Let $N_B(W)$, $N_{\bar B}(W)$, and $N_\gamma(W)$ be the baryon, antibaryon, and photon counts after the event records have been transported to the BBN comparison surface. The comparison surface must name its epoch, because photon number is not conserved through the source-to-BBN history: in the standard comparison calculation, electron-positron annihilation alone raises the comoving photon count by the entropy-transfer factor $11/4$, and the reference value $\eta_B\approx6\times10^{-10}$ is the post-annihilation value fixed by the present CMB photon density. A ledger evaluated earlier must carry the photon-number-changing channels forward to that surface. Define
$$
\eta_B^{\mathrm{ledger}}(W)
=
\frac{N_B(W)-N_{\bar B}(W)}{N_\gamma(W)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4174fcb7e432fb8f)

This is the net baryon number per photon in the transported window; it is dimensionless and reduces to the standard $\eta$ when surviving antibaryons are negligible. For leptogenesis-like source routes, meaning routes in which an asymmetry between leptons and antileptons is generated first and later converted into the baryon asymmetry, the ledger must also carry a neutrino/antineutrino CP-asymmetry comparison term rather than assuming the external mechanism. CP asymmetry here means a difference between the behavior of a process and that of its charge-conjugate, mirror-image process; in neutrino oscillations it appears as a difference between the flavor-transition probabilities of neutrinos and antineutrinos. The comparison inputs are measured long-baseline neutrino and antineutrino transition probabilities and the summaries of the CP-violating phase of the lepton mixing (PMNS) matrix built from them. The comparison term is
$$
\Delta_{\nu\bar\nu}^{\mathrm{CP}}(E,L;\alpha,\beta)
=
P_{\nu_\alpha\to\nu_\beta}(E,L)
-
P_{\bar\nu_\alpha\to\bar\nu_\beta}(E,L)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8a12867edd3ecb8c)

where $E$ is neutrino energy, $L$ is baseline, $\alpha,\beta$ label flavor channels, and $P_{\nu_\alpha\to\nu_\beta}$ is the probability that a neutrino produced in flavor $\alpha$ is detected in flavor $\beta$ after traveling $L$. Two restrictions come with this term. First, it carries intrinsic CP information only in appearance channels, $\alpha\ne\beta$: for $\alpha=\beta$ the vacuum transition probabilities of neutrino and antineutrino coincide, so the survival-channel difference is zero by construction. Second, the ordinary-matter contributions to the neutrino and antineutrino propagation potentials have opposite signs and can produce a transition-probability asymmetry even when no intrinsic CP violation is present; opposite potential signs do not require opposite probability shifts, so a measured long-baseline difference is an intrinsic CP input only after that matter-induced part has been separated with the declared density profile. The source-window ledger may report $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}(W)$ as the event-record-weighted version of this comparison over $W$, with $\Delta_{\nu\bar\nu}^{\mathrm{obs}}(W)$ the measured probabilities propagated through the same weighting, but that reported value is only an input constraint on the matter-asymmetry closure. The low-energy oscillation phase constrains the lepton-sector CP violation without by itself fixing the asymmetry a high-scale source route would need, and the term is not an established $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation of baryon excess.

The acceptance residual should be reported as
$$
\mathcal{R}_{B/\gamma}(W)
=
\max\left(
\frac{|\eta_B^{\mathrm{ledger}}(W)-\eta_B^{\mathrm{obs}}|}{\epsilon_\eta},
\frac{|\Delta_{\nu\bar\nu}^{\mathrm{ledger}}(W)-\Delta_{\nu\bar\nu}^{\mathrm{obs}}(W)|}{\epsilon_{\nu\bar\nu}},
\frac{|\Delta B_{\mathrm{unrec}}(W)|}{\epsilon_B},
\frac{|\Delta Q_{\mathrm{unrec}}(W)|}{\epsilon_Q},
\frac{|\Delta E_{\mathrm{unrec}}(W)|}{\epsilon_E}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-01a825d10e240729)

Here $\eta_B^{\mathrm{obs}}$ is the observed baryon-to-photon ratio (the $\eta_{\mathrm{obs}}$ of BBN Constraints), and $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}$, $\Delta B_{\mathrm{unrec}}$, $\Delta Q_{\mathrm{unrec}}$, and $\Delta E_{\mathrm{unrec}}$ are not new ontology. They are comparison or failure counters for CP-asymmetric neutrino/antineutrino transition rates, baryon-number bookkeeping, electric-charge bookkeeping, and energy balance after all declared reaction, recoil, medium, and escape channels have been included. Each $\epsilon$ in the denominators is a positive tolerance declared before the comparison, in the units of its numerator; the energy tolerance $\epsilon_E$ is the same declared energy allowance used by the exchange residuals below. A leptogenesis-like source model may remain in the comparison ledger only when $\mathcal{R}_{B/\gamma}\le1$ and the same event record also passes the BBN photon-loading and CMB thermalization checks below. The condition $\mathcal{R}_{B/\gamma}\le1$ is a componentwise bound, not a joint confidence level: correlated inputs such as $\eta_B^{\mathrm{obs}}$ and the light-element yields require a covariance or joint-likelihood treatment before a pass is read as statistical agreement.

### CMB Thermalization

The CMB module needs a source-to-transport-to-decoupling ledger. It must track:

- source-channel selection from supermassive black hole (SMBH) local release, medium relaxation, and conversion/dissociation pathways,
- thermalization depth and blackbody recovery,
- anisotropy and polarization transfer, with the polarization handoff inherited from Gate B,
- redshift and clock-rate handoff,
- and separation between source interpretation and the shared prediction target $C_\ell$.

The thermalization-depth record is a diagnostic field, not a new substrate entity. For each modeled source-to-decoupling path, the ledger should record

$$
\mathcal{D}_{\mathrm{th}}(\nu;t_{\mathrm{eff},a},t_{\mathrm{eff},b})
=
\int_{t_{\mathrm{eff},a}}^{t_{\mathrm{eff},b}}\tau_{\mathrm{th}}^{-1}(\nu,t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cd03fb5593128be0)

Here $\nu$ is the photon frequency at which the depth is evaluated, $t_{\mathrm{eff}}$ is effective observer coordinate time along the path, with $t_{\mathrm{eff},a}$ and $t_{\mathrm{eff},b}$ the start and end of the modeled segment, and $\tau_{\mathrm{th}}$ is the relaxation duration in that same time, so that its inverse is a relaxation rate and the integral is the dimensionless number of relaxation times the path accumulates. The same clock must be used for the rate and the interval; a calculation in absolute time $T$ must include the clock-map Jacobian rather than relabel the variable. The rate $\tau_{\mathrm{th}}^{-1}$ is decomposed into the specific event-recorded channels being used: planar-mode capture/release, Compton-like redistribution, pair channels, and non-radiative medium exchange. A CMB blackbody claim requires $\mathcal{D}_{\mathrm{th}}\gg1$ before decoupling, an effective photon chemical potential driven to zero (the parameter that measures a photon-number surplus or deficit relative to a Planck spectrum at the same temperature, which number-conserving scattering alone cannot remove), and a post-decoupling transport map that preserves the already-generated spectrum while carrying anisotropy, polarization, damping, and redshift information.

### Horizon-Interface Photon Release

The strong-field photon-release record is the black-hole version of source-to-transport provenance. It applies when a photon-channel packet, or a photon-channel-adjacent dark-sector mode, is processed near the horizon-interface symmetry-breaking threshold before contributing to an exterior radiative, jet, diffuse, or CMB-facing channel.

The minimum record must include:

- the selected horizon-interface label ensemble $\mathcal{B}_H$ or finite strong-field branch record;
- incoming and outgoing photon-channel frequencies $\nu_{\gamma}^{-}$ and $\nu_{\gamma}^{+}$ for every retained strong-field segment;
- whether each segment is blueshift, redshift, trapping, conversion, thermalization, or release;
- the horizon-interface energy entry $\Delta E_H$ together with the medium, recoil, remnant, and returned Noether sea entries;
- the Gate A and Gate B handoffs for any packet still treated as a photon after the segment;
- the release selector that routes the output into jet, diffuse radiative, dark-sector, CMB thermalization, or later visible-conversion channels.

The strong-field exchange residual is inherited from [Black Holes](../spacetime/black-holes.md#horizon-adjacent-photon-channel), and like its owner it applies only in a validated effective photon regime where the calibration $E_\gamma=h\nu$ holds:
$$
\mathcal{R}_{H\gamma\text{-}\mathrm{ex}}
=
\sum_{j\in\Gamma_H}
\frac{
\left|
h(\nu_{\gamma,j}^{+}-\nu_{\gamma,j}^{-})
+\Delta E_{H,j}
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{\epsilon_{E,j}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0a95eb11f08bb1b6)

Here $\Gamma_H$ is the retained horizon-adjacent path and $j$ indexes its strong-field segments; $\nu_{\gamma,j}^{-}$ and $\nu_{\gamma,j}^{+}$ are the photon-channel frequencies entering and leaving segment $j$ on a common comparison clock; $h$ is Planck's constant; $\Delta E_{H,j}$ is the gain of the horizon-interface or interior strong-field account; the medium, recoil, and remnant entries are the gains of those counterparties; and $\epsilon_{E,j}>0$ is the declared energy tolerance of the segment. Because every summand is nonnegative, the residual closes only when each segment closes separately: a blueshift segment, $\nu^{+}>\nu^{-}$, must be paid for by an equal recorded loss in the interface or medium accounts, and a redshift segment must deposit its loss in a named account. This record is a candidate source mechanism, not a completed CMB derivation. It becomes cosmology-facing only after the emitted or converted packet is propagated through the CMB thermalization, distortion, anisotropy, polarization, and redshift handoff checks. A high-energy interior photon population that cannot be routed through those checks may remain a black-hole release-channel hypothesis, but it cannot be used as a CMB source.

### Path Frequency Exchange

Post-emission photon frequency changes are not automatically new photon emission events. A photon packet may exchange energy with an intervening electron population, plasma, or Noether sea state and continue as the same transported packet. For each such event or coarse segment, the ledger must record incoming frequency $\nu^-$, outgoing frequency $\nu^+$, the local medium state, recoil or target momentum, and the residual of [Radiation](../reactions/radiation.md#path-frequency-exchange)

$$
\mathcal{R}_{\nu\text{-}\mathrm{ex}}
=
\frac{
\left|
h(\nu^+-\nu^-)
+\Delta E_{\mathrm{target}}
+\Delta E_{\mathrm{med}}
+\Delta E_{\mathrm{recoil}}
+\Delta E_{\mathrm{rem}}
\right|
}{\epsilon_E}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7ee4a4cb676933c1)

Here $h$ is Planck's constant, both frequencies are read on the same local observer clock and energy calibration so that $h(\nu^+-\nu^-)$ is the photon's energy change in the validated $E_\gamma=h\nu$ regime, $\Delta E_{\mathrm{target}}$ is the change in the internal energy of the scattering target, $\Delta E_{\mathrm{med}}$ the gain of the Noether sea or intervening medium, $\Delta E_{\mathrm{recoil}}$ the kinetic gain of the recoiling target or medium component, $\Delta E_{\mathrm{rem}}$ any excitation retained above the final reference, and $\epsilon_E>0$ the declared energy tolerance. Target internal energy and target recoil are disjoint accounts and must not be counted twice. The residual is dimensionless, and a frequency boost therefore requires an equal recorded loss from the target or medium, while a depletion requires an equal recorded gain. The same exchange record must state whether the exchange is thermalizing, spectrally distorting, or coherently transported. A Sunyaev-Zeldovich-type boost is admissible only when the electron or medium record supplies the photon energy increase and when the side effects remain compatible with the CMB spectrum, anisotropy, polarization, and the kSZ/tSZ observables, the kinetic and thermal Sunyaev-Zeldovich signatures in which bulk electron motion Doppler-shifts, and hot electrons spectrally distort, the CMB seen through a cluster. A depletion entry is admissible only when the lost photon energy is routed into a named medium, recoil, remnant, or thermalization channel.

For coherent redshift transport, the exchange record should also expose the response curve rather than treating frequency change as a fitted scalar. For a path segment $s$ traversed by photon packet $\gamma$ along the Euclidean path $\Gamma_s$ with arclength element $d\ell$, write
$$
\Delta\ln\nu_{\gamma,s}
=
-\mathcal{Y}_{\gamma,s},
\qquad
\mathcal{Y}_{\gamma,s}
=
\int_{\Gamma_s}
\mathcal{K}_{\nu}
\!\left(
\Theta_{\gamma},
\theta_{\mathrm{sea}},
\nabla\theta_{\mathrm{sea}},
\Theta_{\mathrm{med}}
\right)\,d\ell.
$$

[View →](../../../../equation-mapping.html#corpus-equation-8badadff6a6a3f3b)

Here $\Delta\ln\nu_{\gamma,s}$ is the change in the logarithm of the packet frequency across the segment, so that a positive $\mathcal{Y}_{\gamma,s}$ is a redshift and a negative value a blueshift, matching the sign convention of the strong-field frequency entry in Black Holes; $\mathcal{K}_{\nu}$ is the per-length response kernel; $\Theta_{\gamma}$ is the transported packet record, including its Gate A and Gate B state; $\theta_{\mathrm{sea}}$ is the local Noether sea state record and $\nabla\theta_{\mathrm{sea}}$ its spatial gradient along the path; and $\Theta_{\mathrm{med}}$ is the state of any intervening non-sea medium such as an electron population or plasma. In the validated $E_\gamma=h\nu$ regime the packet energy change across the segment is $\Delta E_{\gamma,s}=h\nu_s^{-}\,(e^{-\mathcal{Y}_{\gamma,s}}-1)$, where $\nu_s^{-}$ is the entering frequency; for example, $\mathcal{Y}_{\gamma,s}=\ln 2$ halves the frequency and the counterparties below must together gain $h\nu_s^{-}/2$. The segment-level energy closure remains
$$
\Delta E_{\gamma,s}
+
\Delta E_{\mathrm{sea,path},s}
+
\Delta E_{\mathrm{recoil/rem},s}
=0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-5cc26baa2c07808b)

Here $\Delta E_{\mathrm{sea,path},s}$ is the gain of the Noether sea along the segment and $\Delta E_{\mathrm{recoil/rem},s}$ the combined recoil and remnant gains, with disjoint account definitions. For exact reduction, target internal-energy change and non-sea medium-energy change vanish, so $\Delta E_{\mathrm{med}}=\Delta E_{\mathrm{sea,path},s}$ and $\Delta E_{\mathrm{recoil}}+\Delta E_{\mathrm{rem}}=\Delta E_{\mathrm{recoil/rem},s}$ in the full exchange residual. Under those restrictions it is equivalent to $\mathcal{R}_{\nu\text{-}\mathrm{ex}}=0$ for the segment; If those changes are only bounded by a declared allowance, carry their bound into the total exchange error; exact zero residual is no longer implied. Otherwise the target and non-sea medium entries remain explicit in the full balance. All accounts and both photon frequencies use one local clock, frame, and energy calibration. The kernel $\mathcal{K}_{\nu}$ is a derivation target, not a free redshift law. It must state whether the segment is coherent transparent transport, thermalizing exchange, spectral distortion, capture, or carrier exit, and it must preserve the same photon packet identity unless a reaction or remnant row explicitly terminates it.

## Closure Targets

1. **Planar-mode threshold closure:** derive a shared threshold condition for bremsstrahlung and synchrotron photon assembly output.
2. **Pair-production provenance closure:** prove that one declared provenance fork, direct rearrangement of the photon constituents or local Noether sea recruitment and return, satisfies architrino inventory, energy-momentum, and Breit-Wheeler rate constraints in the same event record.
3. **Photon-bath closure:** show that the relevant radiation channels can maintain BBN-compatible photon loading during the deuterium bottleneck window.
4. **Matter-asymmetry closure:** derive $\eta_B^{\mathrm{ledger}}$ from event-level reaction provenance without hidden baryon inventory, charge, or energy sources; for leptogenesis-like routes, also recover $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}$ from primary-source neutrino CP-asymmetry comparisons without promoting leptogenesis to doctrine.
5. **Detailed-balance closure:** derive the rate symmetry and ensemble weight relation that make emission, absorption, and stimulated terms recover Planck occupation with zero effective photon chemical potential.
6. **Blackbody closure:** show that distributed source channels plus Noether sea transport can generate and preserve the CMB blackbody spectrum within observational limits.
7. **Clock/redshift closure:** use one Noether sea state map for photon propagation, endpoint clock comparison, and redshift-distance inference.

## Failure Modes

The provenance program fails for a channel if a source story cannot survive the same ledger used for reaction, transport, thermalization, and observer handoff.

| Failure mode | What fails | Diagnostic consequence |
| --- | --- | --- |
| Single Noether braid temperature mistake | A single excited Noether braid is treated as thermodynamically hot rather than internally excited, closure-mismatched, or metastable | Temperature is being used before an ensemble distribution or entropy-energy relation has been established |
| Inventory gap | Architrino inventory, Noether braid recruitment, recoil, or returned medium content cannot be balanced without unrecorded substrate creation | Pair and radiation channels cannot be promoted beyond provisional maps |
| Per-observable refit | The same Noether sea state variables must be re-fit independently for photon loading, blackbody recovery, damping, redshift, or growth observables | The cosmology interpretation loses its shared Noether sea state map |
| Standard-limit violation | Pair, Compton-like, bremsstrahlung, synchrotron, or photon propagation channels violate validated limits in regimes where those limits are already measured | The proposed substrate route fails before it can claim new deviations |
| Insufficient thermalization depth | $\mathcal{D}_{\mathrm{th}}$ is too small, or its channel decomposition is not tied to event records | Source photons need not relax to a Planck bath, and a nonzero effective photon chemical potential or spectral distortion remains |
| Matter-asymmetry ledger failure | $\eta_B^{\mathrm{ledger}}$ cannot match the observed baryon-to-photon ratio, or $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}$ is imported without event-record support; the source route then relies on unrecorded baryon inventory, charge imbalance, or energy imbalance | A baryogenesis-like or leptogenesis-like source story cannot be promoted into cosmology provenance |
| BBN photon-loading failure | Source-zone photon production cannot preserve deuterium survival, helium clustering, lithium constraints, and $N_{\text{eff}}$ compatibility | The BBN local-reactor mapping cannot replace the standard photon-to-baryon environment |
| CMB handoff failure | Blackbody precision, damping behavior, anisotropy, polarization, or TT/TE/EE coherence cannot be carried through the same transport and redshift map | CMB thermalization cannot be treated as a successful source-to-observer provenance path |
| Frequency-exchange ledger failure | A path segment changes photon frequency without a closed target, medium, recoil, remnant, or side-effect entry | Redshift, blueshift, SZ, or distance-ladder claims are being used without photon provenance |

## Sources

The following sources were inspected as observer-level constraints on the comparison variables named above; they are not premises of any $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

- B. D. Fields, P. Molaro, and S. Sarkar, "Big-Bang Nucleosynthesis," in *Review of Particle Physics*, Particle Data Group, revised August 2025, [PDG review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-bbang-nucleosynthesis.pdf), §24.2 and equations (24.5) and (24.8). Supports the definition of the baryon-to-photon ratio as $\eta\equiv n_b/n_\gamma$ with $n_\gamma$ fixed by the present CMB temperature, and the reference value $\eta\approx6\times10^{-10}$ used in the Discussion Gate, Channel Map, and Matter-Asymmetry Provenance sections.
- M. C. Gonzalez-Garcia and R. Wendell, "Neutrino Masses, Mixing, and Oscillations," in *Review of Particle Physics*, Particle Data Group, revised August 2025, [PDG review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-neutrino-mixing.pdf), §14.4 equation (14.39) and §14.5 equation (14.58). Supports the two restrictions stated for the CP-asymmetry comparison term: the CP-odd part of the vacuum transition probability changes sign between neutrinos and antineutrinos and is absent from survival channels, and the matter potential enters with opposite sign for neutrinos and antineutrinos.
