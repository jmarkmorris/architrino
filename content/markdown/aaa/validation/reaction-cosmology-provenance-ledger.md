# Reaction-Cosmology Provenance Ledger

This ledger connects local reaction provenance to cosmology-facing radiation, thermalization, and source-history claims. It is the bridge record for channels where synchrotron cascades, bremsstrahlung, pair production, BBN photon loading, and CMB thermalization all depend on the same underlying bookkeeping.

Use it with [Reaction Ledger](reaction-ledger.md), [Synchrotron Cascades](../reactions/synchrotron.md), [Bremsstrahlung](../reactions/bremsstrahlung.md), [BBN Constraints](../cosmology/BBN-constraints.md), and [CMB](../cosmology/CMB.md).

## Purpose

Cosmology-facing reaction claims need more than a source story. They need a record of what enters and exits each channel at the substrate level, and how those local channels become observer-level background quantities such as photon bath temperature, $N_{\text{eff}}$, light-element yields, redshift, and TT/TE/EE spectra.

This ledger separates four levels:

- **Ontology:** architrinos, Noether cores, axial layers, photon assemblies, and Noether-Sea state variables.
- **Reaction mechanics:** association, dissociation, planar-mode nucleation, pair production, recoil, and medium excitation.
- **Transport and thermalization:** opacity, scattering, cascade depth, diffusion, cooling, and path-history redshift.
- **Effective observables:** emissivity, light-element yield, blackbody spectrum, anisotropy, polarization, and inferred cosmological parameters.

## Leap Opportunity Record

The opportunity tracked here is a possible unification of four previously separate bookkeeping problems: radiative planar-mode nucleation, pair-production provenance, BBN photon loading, and CMB thermalization. The shared claim is not that these channels are already derived from one equation. The disciplined claim is that they may need one common provenance ledger because each asks the same question at a different scale: which assemblies, Noether-core material, energy-momentum terms, and Noether-Sea state variables enter and exit the channel?

### Current Claim Status

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
\text{observer-level background variable}.
$$

The minimal useful first path is BBN photon loading: identify a source-zone radiation channel, record its event-level provenance, propagate it through the local thermalization assumptions, and show whether it can support effective $\eta\approx6\times10^{-10}$ during the deuterium bottleneck window.

## Shared Provenance Fields

| Field | What must be recorded | Why it matters |
| --- | --- | --- |
| Architrino inventory | $E/P$ counts and core/axial-layer separation | Prevents creation-from-nothing wording in pair and weak channels |
| Noether-Sea state | $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, and excitation state | Keeps density, delay, and transport variables distinct |
| Photon assembly channel | Planar-mode nucleation threshold, emitted energy, direction, and polarization basis | Links bremsstrahlung, synchrotron, and CMB photon-bath claims |
| Pair channel | Incoming photon assemblies, recruited Noether-core content, final $e^+e^-$ assemblies, and recoil/medium excitation | Keeps pair production as association from local substrate content, not ex nihilo creation |
| Energy-momentum ledger | Internal energy, kinetic energy, recoil, emitted assemblies, and medium excitation | Required for observer-rate and spectrum recovery |
| Thermalization path | scattering depth, coupling time, cooling time, and escape time | Determines when local reactions can feed BBN or CMB background claims |
| Observer handoff | emissivity, opacity, redshift kernel, effective temperature, $N_{\text{eff}}$, and $C_\ell$ inputs | Keeps standard comparison variables useful without treating them as ontology |

## Photon Closure Gates

Photon-channel records should be sorted into three gates before they are used in cosmology-facing arguments.

The chapter-level source for the photon ontology and Gate A theorem scaffold is [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md#photon-closure-interface). This ledger records what a reaction or cosmology channel must carry forward from that scaffold before it uses photon propagation, polarization, pair production, or thermal radiation as settled input. Gate B is downstream of [Angular Momentum and Spin](../theory-bridges/angular-momentum-and-spin.md); the fields below are acceptance records, not an independent derivation of photon spin or polarization statistics.

| Gate | Claim bucket | What the ledger must track | Closure test |
| --- | --- | --- | --- |
| Gate A: kinematics and optics | Derivation-closure target | $c_f$, $c_\gamma$, $\delta_\gamma\equiv1-c_\gamma/c_f$, planar-pair spacing $d$, phase frequency $\omega$, geometric phase, and medium delay state | Recover $E_\gamma=h\nu$, $p=h/\lambda$, masslessness, no rest proper-time branch, nondispersion, and no unacceptable preferred-frame leakage |
| Gate B: polarization and spin | Derivation-closure target | transverse ledger orientation, analyzer basis, helicity, projection/capture geometry, and accepted/rejected channel outcomes | Recover exactly two transverse modes, no longitudinal mode, Malus' law, helicity $\pm1$, single-photon statistics, and no-signaling constraints |
| Gate C: vertices and transitions | Derivation-closure target | emission, absorption, pair production, recoil, medium excitation, transition rates, and overlap/capture probabilities | Recover QED/Maxwell limits, Breit-Wheeler thresholds and rates, blackbody behavior, Compton-like scattering, photon-photon limits, and the effective coupling scale $\alpha$ |

These gates are not separate ontologies. They are bookkeeping filters that prevent a local photon-source story from being used as cosmology doctrine before the same event record also closes photon transport, polarization, pair conversion, and observer-level comparison variables.

## Channel Map

| Channel | Source document | Provenance target | Current status |
| --- | --- | --- | --- |
| Bremsstrahlung planar-mode nucleation | [Bremsstrahlung](../reactions/bremsstrahlung.md) | Record electron assembly energy loss, target recoil, photon assembly output, and medium excitation | Provisional map |
| Synchrotron planar-mode nucleation | [Synchrotron Cascades](../reactions/synchrotron.md) | Derive photon output from curved charged-assembly transport in anisotropic Noether-Sea states | Provisional map |
| Breit-Wheeler pair channel | [Synchrotron Cascades](../reactions/synchrotron.md) | Record incoming photon assemblies, recruited Noether-core content, and final $e^+e^-$ assemblies | Derivation target |
| BBN photon bath | [BBN Constraints](../cosmology/BBN-constraints.md) | Show that pair, bremsstrahlung, synchrotron, and related channels maintain effective $\eta\approx6\times10^{-10}$ during the bottleneck window | Closure target |
| CMB thermal spectrum | [CMB](../cosmology/CMB.md) | Show that source emission, transport, and thermalization produce a near-blackbody photon bath with allowed anisotropy and damping structure | Closure target |
| Redshift and clock handoff | [Expansion Mechanism](../cosmology/expansion-mechanism.md) | Map photon transport through $\rho_{\text{core}}$, $n$, $\chi_{\text{sea}}$, and clock-rate comparison | Effective summary with open derivation |

## Minimum Records by Channel

### Bremsstrahlung

The minimum event record is:

$$
\Delta E_e = E_\gamma + \Delta E_{\mathrm{recoil}} + \Delta E_{\mathrm{med}}.
$$

The provenance record must also include the target assembly, local $\rho_{\text{core}}(\mathbf{x},t)$, the planar-mode threshold status, emitted photon assembly direction, and whether the event occurs in a regime where standard free-free emissivity remains the observer-level scaffold.

### Synchrotron Emission

The event record must connect charged-assembly curvature, the effective magnetic-field map, and photon assembly output. The closure target is to derive the standard $\nu_c \propto \gamma^2 B$ and $P_{\mathrm{syn}}\propto U_B\gamma^2$ scalings from Noether-Sea anisotropy and wake-strain threshold conditions rather than fitting a separate emission rule.

### Pair Production

The event record must avoid creation-from-nothing wording. Incoming photon assemblies trigger association of local substrate content into $e^+e^-$ assemblies when the observer-level threshold is satisfied. The record must include:

- incoming photon assembly energies and directions,
- local Noether-core material recruited or reconfigured,
- final charged assembly inventories,
- recoil and medium-excitation terms,
- and the standard-limit cross-section target.

### BBN Photon Loading

The BBN module needs a source-zone photon ledger. It must identify which radiation channels supply the effective photon-dominated environment and whether they preserve deuterium survival, helium clustering, and $N_{\text{eff}}$ compatibility without per-source retuning.

### CMB Thermalization

The CMB module needs a source-to-transport-to-decoupling ledger. It must track:

- source-channel selection from SMBH-local release, medium relaxation, and conversion/dissociation pathways,
- thermalization depth and blackbody recovery,
- anisotropy and polarization transfer,
- redshift and clock-rate handoff,
- and separation between source interpretation and the shared prediction target $C_\ell$.

## Closure Targets

1. **Planar-mode threshold closure:** derive a shared threshold condition for bremsstrahlung and synchrotron photon assembly output.
2. **Pair-production provenance closure:** prove that local Noether-Sea recruitment can satisfy architrino inventory, energy-momentum, and Breit-Wheeler rate constraints in the same event record.
3. **Photon-bath closure:** show that the relevant radiation channels can maintain BBN-compatible photon loading during the deuterium bottleneck window.
4. **Blackbody closure:** show that distributed source channels plus Noether-Sea transport can generate and preserve the CMB blackbody spectrum within observational limits.
5. **Clock/redshift closure:** use one medium-state map for photon propagation, endpoint clock comparison, and redshift-distance inference.

## Failure Modes

The provenance program fails for a channel if:

- the architrino inventory cannot be balanced without unrecorded substrate creation,
- the same Noether-Sea state variables must be re-fit independently for each observable,
- pair or radiation channels violate validated standard limits in regimes where those limits are already measured,
- source-zone photon loading cannot preserve BBN light-element constraints,
- or CMB thermalization cannot recover blackbody precision, damping behavior, and TT/TE/EE coherence.
