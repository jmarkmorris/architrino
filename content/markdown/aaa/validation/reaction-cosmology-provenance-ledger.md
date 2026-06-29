# Reaction-Cosmology Provenance Ledger

This ledger connects local reaction provenance to cosmology-facing radiation, thermalization, and source-history claims. It is the bridge record for channels where synchrotron cascades, bremsstrahlung, pair production, BBN photon loading, and CMB thermalization all depend on the same underlying bookkeeping.

Use it with [Reaction Ledger](reaction-ledger.md), [Radiation](../reactions/radiation.md#radiation-event-record-schema), [Synchrotron](../reactions/synchrotron.md), [Bremsstrahlung](../reactions/bremsstrahlung.md), [BBN Constraints](../cosmology/BBN-constraints.md), and [CMB](../cosmology/CMB.md).

## Purpose

Cosmology-facing reaction claims need more than a source story. They need a record of what enters and exits each channel at the substrate level, and how those local channels become observer-level background quantities such as photon bath temperature, $N_{\text{eff}}$, light-element yields, redshift, and TT/TE/EE spectra.

This ledger separates four levels:

- **Ontology:** architrinos, Noether braids, axial layers, photon assemblies, and Noether sea state variables.
- **Reaction mechanics:** association, dissociation, planar-mode nucleation, pair production, recoil, and medium excitation.
- **Transport and thermalization:** opacity, scattering, cascade depth, diffusion, cooling, path-history redshift, and signed photon-frequency exchange.
- **Effective observables:** emissivity, light-element yield, blackbody spectrum, anisotropy, polarization, and inferred cosmological parameters.

## Leap Opportunity Record

The opportunity tracked here is a possible unification of four previously separate bookkeeping problems: radiative planar-mode nucleation, pair-production provenance, BBN photon loading, and CMB thermalization. The shared claim is not that these channels are already derived from one equation. The disciplined claim is that they may need one common provenance ledger because each asks the same question at a different scale: which assemblies, Noether braid material, energy-momentum terms, and Noether sea state variables enter and exit the channel?

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

The minimal useful first path is BBN photon loading: identify a source-zone radiation channel, record its event-level provenance, propagate it through the local thermalization assumptions, and show whether it can support effective $\eta\approx6\times10^{-10}$ during the deuterium bottleneck window.

## Shared Provenance Fields

| Field | What must be recorded | Why it matters |
| --- | --- | --- |
| Architrino inventory | $E/P$ counts, braid/axial-layer separation, and identity routing for recruited or returned substrate content | Prevents creation-from-nothing wording in pair and weak channels |
| Noether sea state | $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, and excitation state | Keeps density, delay, and transport variables distinct |
| Noether sea recruitment and return | Neutral Noether braid content recruited into a reaction, returned to the ambient population, reclassified into another branch, or left as local excitation | Treats the Noether sea as a participant in vertices that change apparent inventory, not as a passive background |
| Radiation event record | Source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, and closure status | Provides the local event schema that can be propagated into source-zone, transport, and observer-level cosmology claims |
| Photon assembly channel | Planar-mode nucleation threshold, emitted energy, direction, polarization basis, and transverse angular-momentum ledger | Links bremsstrahlung, synchrotron, and CMB photon-bath claims |
| Pair channel | Incoming photon assemblies, identity-routed recruited Noether braid content, final $e^+e^-$ assemblies, and recoil/medium excitation | Keeps pair production as association from local substrate content, not ex nihilo creation |
| Energy-momentum ledger | Internal energy, kinetic energy, recoil, emitted assemblies, and medium excitation | Required for observer-rate and spectrum recovery |
| Thermalization path | scattering depth, coupling time, cooling time, and escape time | Determines when local reactions can feed BBN or CMB background claims |
| Observer handoff | emissivity, opacity, redshift kernel, effective temperature, $N_{\text{eff}}$, and $C_\ell$ inputs | Keeps standard comparison variables useful without treating them as ontology |

## Photon Closure Gates

Photon-channel records should be sorted into three gates before they are used in cosmology-facing arguments.

The chapter-level source for the photon ontology and Gate A theorem scaffold is [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md#photon-closure-interface). This ledger records what a reaction or cosmology channel must carry forward from that scaffold before it uses photon propagation, polarization, pair production, or thermal radiation as settled input. Gate B is downstream of [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md); the fields below are acceptance records, not an independent derivation of photon spin or polarization statistics. Photon-pair Bell/CHSH claims and CMB polarization-transfer claims must therefore inherit Gate B and the pair-provenance measure rather than being closed by cosmology bookkeeping alone.

| Gate | Claim bucket | What the ledger must track | Closure test |
| --- | --- | --- | --- |
| Gate A: kinematics and optics | Derivation-closure target | $c_f$, $c_\gamma$, $\delta_\gamma\equiv1-c_\gamma/c_f$, planar-pair spacing $d$, phase frequency $\omega$, geometric phase, and medium delay state | Recover $E_\gamma=h\nu$, $p=h/\lambda$, masslessness, no rest proper-time branch, nondispersion, and no unacceptable preferred-frame leakage |
| Gate B: polarization and spin | Derivation-closure target | transverse ledger orientation, analyzer basis, helicity, projection/capture geometry, accepted/rejected channel outcomes, source depletion, recoil, causal-wake, handoff, and event-balance rows | Recover exactly two transverse modes, no longitudinal mode, Malus' law, helicity $\pm1$, single-photon statistics, no-signaling constraints, and $\mathcal R_{\gamma B}^{\mathrm{event}}$ below tolerance |
| Gate C: vertices and transitions | Derivation-closure target | emission, absorption, pair production, recoil, medium excitation, transition rates, and overlap/capture probabilities | Recover QED/Maxwell limits, Breit-Wheeler thresholds and rates, blackbody behavior, Compton-like scattering, photon-photon limits, and the effective coupling scale $\alpha$ |

These gates are not separate ontologies. They are bookkeeping filters that prevent a local photon-source story from being used as cosmology doctrine before the same event record also closes photon transport, polarization, pair conversion, and observer-level comparison variables. The shared radiation event record is the carrier for those gate handoffs; Gate B remains inherited and is not re-derived by this cosmology ledger.

## Channel Map

| Channel | Source document | Provenance target | Status |
| --- | --- | --- | --- |
| Bremsstrahlung planar-mode nucleation | [Bremsstrahlung](../reactions/bremsstrahlung.md) | Record electron assembly energy loss, target recoil, photon assembly output, and medium excitation | Provisional map |
| Synchrotron planar-mode nucleation | [Synchrotron](../reactions/synchrotron.md) | Derive photon output from curved charged-assembly transport in anisotropic Noether sea states | Provisional map |
| Breit-Wheeler pair channel | [Synchrotron](../reactions/synchrotron.md) | Record incoming photon assemblies, recruited Noether braid content, and final $e^+e^-$ assemblies | Derivation target |
| BBN photon bath | [BBN Constraints](../cosmology/BBN-constraints.md) | Show that pair, bremsstrahlung, synchrotron, and related channels maintain effective $\eta\approx6\times10^{-10}$ during the bottleneck window | Closure target |
| CMB thermal spectrum | [CMB](../cosmology/CMB.md) | Show that source emission, transport, and thermalization produce a near-blackbody photon bath with allowed anisotropy and damping structure | Closure target |
| Horizon-interface photon release | [Black Holes](../spacetime/black-holes.md#horizon-adjacent-photon-channel) and [CMB](../cosmology/CMB.md#horizon-interface-photon-release-candidate) | Record photon-channel or photon-channel-adjacent packets processed near the symmetry-breaking threshold, including interior blueshift, exterior redshift, thermalization, and release-channel selection | Candidate strong-field source row |
| Intergalactic pair/reaction production | [CMB](../cosmology/CMB.md), [Expansion Mechanism](../cosmology/expansion-mechanism.md), and [Dark Matter](../cosmology/dark-matter.md) | Inventory photon, neutrino, plasma, cosmic-ray, neutral-assembly, and Noether sea source components before using sparse visible matter as an ontology argument | Source-component target |
| Redshift and clock handoff | [Expansion Mechanism](../cosmology/expansion-mechanism.md) | Map photon transport through $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, and clock-rate comparison | Effective summary with open derivation |
| Sunyaev-Zeldovich / Compton-like frequency exchange | [CMB](../cosmology/CMB.md#sunyaev-zeldovich-path-history-calibration) and [Radiation](../reactions/radiation.md#path-frequency-exchange) | Record incoming photon packet, intervening electron or medium state, outgoing frequency, recoil, medium energy change, and thermalization side effects | Calibration row and closure target |

## Minimum Records by Channel

Each minimum record below specializes the shared event schema in [Radiation](../reactions/radiation.md#radiation-event-record-schema). Additional cosmology variables may be added, but the source assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, photon Gate B event residual when $E_\gamma\ne0$, causal-wake ledger, identity routing, and closure status fields remain required.

### Bremsstrahlung

The minimum event record is:

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

The provenance record must also include the source electron assembly, target assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, local $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, planar-mode threshold status, emitted photon assembly direction, recoil, medium excitation, causal-wake ledger, identity routing, closure status, and whether the event occurs in a regime where standard free-free emissivity remains the observer-level scaffold. Its polarization handoff inherits photon Gate B rather than deriving photon spin locally, and the record remains provisional until the event residual routes source, recoil, medium, wake, handoff, and remnant rows.

### Synchrotron Emission

The event record must connect charged-assembly curvature, the effective magnetic-field map, source depletion, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, photon assembly output $E_\gamma$, recoil, medium excitation, causal-wake ledger, identity routing, and photon Gate B event residual. The closure target is to derive the standard $\nu_c \propto \gamma^2 B$ and $P_{\mathrm{syn}}\propto U_B\gamma^2$ scalings from Noether sea anisotropy and wake-strain threshold conditions rather than fitting a separate emission rule. Synchrotron polarization records inherit Gate B, so this ledger carries the transverse handoff without proving photon helicity locally.

### Pair Production

The event record must avoid creation-from-nothing wording. Incoming photon assemblies trigger association of local substrate content into $e^+e^-$ assemblies when the observer-level threshold is satisfied. The incoming photons supply energy, momentum, polarization handoff, and trigger geometry; they do not supply new architrino identities. The incoming photons should preserve their radiation event records through the pair vertex. The pair-channel record must include:

- incoming photon assembly energies and directions,
- incoming photon polarization handoffs as inherited Gate B records,
- local Noether braid material recruited or reconfigured, including identity routing for the architrinos assigned to the final charged assemblies,
- final charged assembly inventories,
- recoil and medium-excitation terms,
- causal-wake ledger and closure status,
- and the standard-limit cross-section target.

This is the ledger distinction that ordinary absorption does not need: atomic or material capture closes the photon ledger into an existing target or medium record, while pair production closes the photon ledger and separately recruits identity-routed substrate content into new charged assemblies.

### Intergalactic Pair And Reaction Source Components

Sparse visible matter between galaxies is not enough to close a cosmology source inventory. A reaction-cosmology packet should include a component row
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
for a declared window $W$. Here $N_A$ records neutral or dark assembly candidates, $S_{\mathrm{pair}}$ records pair or reaction production inside the window, and $S_{\mathrm{return}}$ records content returned to the Noether sea or reclassified after reactions. This row is a source-component inventory, not a proof of a specific production rate; it prevents "empty intergalactic space" from replacing the actual component ledger.

### BBN Photon Loading

The BBN module needs a source-zone photon ledger. It must identify which radiation channels supply the effective photon-dominated environment and whether they preserve deuterium survival, helium clustering, and $N_{\text{eff}}$ compatibility without per-source retuning.

### Matter-Asymmetry Provenance

The observed baryon-to-photon ratio is a data-product constraint, not permission to import an external baryogenesis mechanism as doctrine. Any matter-asymmetry story used by the cosmology program must be rewritten as a reaction provenance record over a declared source window $W$. Let $N_B(W)$, $N_{\bar B}(W)$, and $N_\gamma(W)$ be the baryon, antibaryon, and photon counts after the event records have been transported to the BBN comparison surface. Define
$$
\eta_B^{\mathrm{ledger}}(W)
=
\frac{N_B(W)-N_{\bar B}(W)}{N_\gamma(W)}
$$
For leptogenesis-like source routes, the ledger must also carry a neutrino/antineutrino CP-asymmetry comparison term rather than assuming the external mechanism. Source leads for this row are primary neutrino-oscillation and leptogenesis sources: long-baseline $\nu/\bar\nu$ transition measurements, PMNS CP-phase summaries, and baryogenesis/leptogenesis rate calculations. The comparison term is
$$
\Delta_{\nu\bar\nu}^{\mathrm{CP}}(E,L;\alpha,\beta)
=
P_{\nu_\alpha\to\nu_\beta}(E,L)
-
P_{\bar\nu_\alpha\to\bar\nu_\beta}(E,L)
$$
where $E$ is neutrino energy, $L$ is baseline, and $\alpha,\beta$ label flavor channels. The source-window ledger may report $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}(W)$ as the event-record-weighted version of this comparison over $W$, but that reported value is only an input constraint on the matter-asymmetry closure. It is not an established $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation of baryon excess.

The acceptance residual should be reported as
$$
\mathcal{R}_{B/\gamma}(W)
=
\max\left(
\frac{|\eta_B^{\mathrm{ledger}}(W)-\eta_B^{\mathrm{obs}}|}{\varepsilon_\eta},
\frac{|\Delta_{\nu\bar\nu}^{\mathrm{ledger}}(W)-\Delta_{\nu\bar\nu}^{\mathrm{obs}}(W)|}{\varepsilon_{\nu\bar\nu}},
\frac{|\Delta B_{\mathrm{unrec}}(W)|}{\varepsilon_B},
\frac{|\Delta Q_{\mathrm{unrec}}(W)|}{\varepsilon_Q},
\frac{|\Delta E_{\mathrm{unrec}}(W)|}{\varepsilon_E}
\right)
$$
Here $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}$, $\Delta B_{\mathrm{unrec}}$, $\Delta Q_{\mathrm{unrec}}$, and $\Delta E_{\mathrm{unrec}}$ are not new ontology. They are comparison or failure counters for CP-asymmetric neutrino/antineutrino transition rates, baryon-number bookkeeping, electric-charge bookkeeping, and energy balance after all declared reaction, recoil, medium, and escape channels have been included. A leptogenesis-like source model may remain in the comparison ledger only when $\mathcal{R}_{B/\gamma}\le1$ and the same event record also passes the BBN photon-loading and CMB thermalization checks below.

### CMB Thermalization

The CMB module needs a source-to-transport-to-decoupling ledger. It must track:

- source-channel selection from SMBH-local release, medium relaxation, and conversion/dissociation pathways,
- thermalization depth and blackbody recovery,
- anisotropy and polarization transfer, with the polarization handoff inherited from Gate B,
- redshift and clock-rate handoff,
- and separation between source interpretation and the shared prediction target $C_\ell$.

The thermalization-depth record is a diagnostic field, not a new substrate entity. For each modeled source-to-decoupling path, the ledger should record

$$
\mathcal{D}_{\mathrm{th}}(\nu;t_a,t_b)
=
\int_{t_a}^{t_b}\tau_{\mathrm{th}}^{-1}(\nu,t)\,dt
$$

with $\tau_{\mathrm{th}}^{-1}$ decomposed into the specific event-recorded channels being used: planar-mode capture/release, Compton-like redistribution, pair channels, and non-radiative medium exchange. A CMB blackbody claim requires $\mathcal{D}_{\mathrm{th}}\gg1$ before decoupling, effective photon chemical potential driven to zero, and a post-decoupling transport map that preserves the already-generated spectrum while carrying anisotropy, polarization, damping, and redshift information.

### Horizon-Interface Photon Release

The strong-field photon-release row is the black-hole version of source-to-transport provenance. It applies when a photon-channel packet, or a photon-channel-adjacent dark-sector mode, is processed near the horizon-interface symmetry-breaking threshold before contributing to an exterior radiative, jet, diffuse, or CMB-facing channel.

The minimum record must include:

- the selected horizon-interface label ensemble $\mathcal{B}_H$ or finite strong-field branch record;
- incoming and outgoing photon-channel frequencies $\nu_{\gamma}^{-}$ and $\nu_{\gamma}^{+}$ for every retained strong-field segment;
- whether each segment is blueshift, redshift, trapping, conversion, thermalization, or release;
- the horizon-interface energy row $\Delta E_H$ together with medium, recoil, remnant, and returned Noether sea rows;
- the Gate A and Gate B handoffs for any packet still treated as a photon after the segment;
- the release selector that routes the output into jet, diffuse radiative, dark-sector, CMB thermalization, or later visible-conversion channels.

The strong-field exchange residual is inherited from the black-hole chapter:
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

This row is a candidate source mechanism, not a completed CMB derivation. It becomes cosmology-facing only after the emitted or converted packet is propagated through the CMB thermalization, distortion, anisotropy, polarization, and redshift handoff checks. A high-energy interior photon population that cannot be routed through those checks may remain a black-hole release-channel hypothesis, but it cannot be used as a CMB source.

### Path Frequency Exchange

Post-emission photon frequency changes are not automatically new photon emission events. A photon packet may exchange energy with an intervening electron population, plasma, or Noether sea state and continue as the same transported packet. For each such event or coarse segment, the ledger must record incoming frequency $\nu^-$, outgoing frequency $\nu^+$, the local medium state, recoil or target momentum, and the residual

$$
\mathcal{R}_{\nu\text{-}\mathrm{ex}}
=
\frac{
\left|
h(\nu^+-\nu^-)
+\Delta E_{\mathrm{med}}
+\Delta E_{\mathrm{recoil}}
+\Delta E_{\mathrm{rem}}
\right|
}{\epsilon_E}
$$

The same row must state whether the exchange is thermalizing, spectrally distorting, or coherently transported. A Sunyaev-Zeldovich-type boost is admissible only when the electron or medium record supplies the photon energy increase and when the side effects remain compatible with the CMB spectrum, anisotropy, polarization, and kSZ/tSZ observable rows. A depletion row is admissible only when the lost photon energy is routed into a named medium, recoil, remnant, or thermalization channel.

For coherent redshift transport, the exchange row should also expose the response curve rather than treating frequency change as a fitted scalar. For a path segment $s$ and photon packet $\gamma$, write
$$
\Delta\ln\nu_{\gamma,s}
=
-\mathcal{Y}_{\gamma,s},
\qquad
\mathcal{Y}_{\gamma,s}
=
\int_{\gamma_s}
\mathcal{K}_{\nu}
\!\left(
\Theta_{\gamma},
\theta_{\mathrm{sea}},
\nabla\theta_{\mathrm{sea}},
\Theta_{\mathrm{med}}
\right)\,ds.
$$
The segment-level energy closure remains
$$
\Delta E_{\gamma,s}
+
\Delta E_{\mathrm{sea,path},s}
+
\Delta E_{\mathrm{recoil/rem},s}
=0.
$$
The kernel $\mathcal{K}_{\nu}$ is a derivation target, not a free redshift law. It must state whether the segment is coherent transparent transport, thermalizing exchange, spectral distortion, capture, or carrier exit, and it must preserve the same photon packet identity unless a reaction or remnant row explicitly terminates it.

## Closure Targets

1. **Planar-mode threshold closure:** derive a shared threshold condition for bremsstrahlung and synchrotron photon assembly output.
2. **Pair-production provenance closure:** prove that local Noether sea recruitment can satisfy architrino inventory, energy-momentum, and Breit-Wheeler rate constraints in the same event record.
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
| Frequency-exchange ledger failure | A path segment changes photon frequency without a closed medium, recoil, remnant, or side-effect row | Redshift, blueshift, SZ, or distance-ladder claims are being used without photon provenance |
