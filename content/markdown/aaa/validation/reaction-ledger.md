# Reaction Ledger: Architrino Provenance

This ledger records how reaction channels should account for constituent architrinos, Noether cores, axial layers, energy, momentum, charge, polarity, and path-history provenance. Its purpose is not to replace Standard Model reaction notation. Its purpose is to state what an $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation must conserve before a reaction map can be treated as more than a provisional diagram.

For cosmology-facing radiation and thermalization channels, use this ledger together with [Reaction-Cosmology Provenance Ledger](reaction-cosmology-provenance-ledger.md).

## Scope and Status

Reaction provenance is a closure target. A channel may use standard observer notation such as $d \to u + W^-$ or $\gamma+\gamma\to e^+ + e^-$, but the $\mathbb{A}\mathbb{A}\mathbb{A}$ map is not closed until the underlying constituent ledger is explicit.

The conservative status is:

- Architrino count and polarity conservation are required constraints.
- Noether Sea participation is allowed, but it must be recorded as a reactant, product reservoir, or medium-excitation channel rather than left implicit.
- W, Z, photon, and pair-production language may be retained at observer level, while the substrate map must identify the transient assembly, exchanged payload, or planar-mode nucleation event being invoked.
- Any weak-channel ledger that depends on chirality, axial-frame orientation, CKM/PMNS mixing, or antineutrino routing remains provisional until the corresponding geometry is derived.
- Any reaction-level spin, helicity, polarization, or vector-channel angular-momentum entry is a downstream consumer of the angular-momentum and spin workstream. It should record what must close, not function as a local proof of that closure.

## Provenance Protocol

Each reaction record should state:

1. **Observer channel:** the standard reaction label, including historical labels such as `beta decay` only when immediately translated into native reaction language.
2. **Active assemblies:** which incoming assemblies actually reconfigure, and which are spectators.
3. **Noether-Sea participation:** whether local Noether cores, neutral binaries, axial layers, or medium excitations are consumed, split, reconfigured, or returned.
4. **Constituent inventory:** total $E$ and $P$ counts before and after, separated into core and axial-layer contributions where the distinction matters.
5. **Polarity and charge accounting:** how observer-level charge bookkeeping emerges from the $E/P$ routing.
6. **Energy-momentum and angular-momentum accounting:** where kinetic energy, internal binding energy, photon assemblies, recoil, medium excitation, spin/vector ledger terms, and wake-carried angular momentum enter and exit.
7. **Path-history provenance:** which emitted causal wakes, source identities, and delayed interactions are needed to make the reaction deterministic in absolute time.
8. **Closure status:** baseline, provisional map, derivation target, or failed map.

## Record Template

| Field | Required content |
| --- | --- |
| Observer channel | Standard reaction notation and native reaction label |
| Active assembly change | Core and axial-layer changes for the transformed assembly |
| Noether-Sea input/output | Neutral cores, axial material, or medium excitations recruited or returned |
| Conserved inventory | $E/P$ totals and charge/polarity balance |
| Energy-momentum and angular-momentum ledger | Internal energy, recoil, emitted assemblies, spin/vector ledger terms, wake-carried angular momentum, and medium excitation |
| Provenance data | Source identity, emission time, causal-root branch, and local medium state |
| Closure status | What is established, what is assumed, and what remains to derive |

## Weak-Corridor Provenance Gate

Weak reactions now require an explicit corridor-provenance stance. The current corpus supports two live possibilities:

1. **Transaction-payload corridor:** $W^\pm$ carries the charged triad payload and phase relation, while final-state pro/anti Noether core material is supplied by the local Noether Sea or by explicitly identified incoming assemblies.
2. **Provenance-carrying corridor:** $W^\pm$ carries not only the charged transaction payload but also enough pro/anti Noether core provenance to seed some final-state lepton or antilepton core content.

The ledger should not choose between these silently. For each serious weak record, add a row or note that states which stance is being used, which Noether core material enters and exits, and what would falsify the accounting. This gate is coupled to the weak-coupling-triad exposure problem: the same geometry that permits left-handed charged-current docking must also determine which corridor payload can be transferred and where the outgoing lepton cores come from.

Minimum weak-channel records should therefore include:

- the active weak-coupling-triad swap,
- the corridor provenance stance,
- all Noether-Sea or incoming-assembly core material used for charged lepton and neutrino outputs,
- the CKM/PMNS overlap weight when a flavor or generation branch is selected,
- and the energy, angular momentum, polarity, and path-history terms needed for deterministic replay.

## Weak Reaction Case: $t \to b + W^+$ Channel

Observer-level notation:

$$
t \to b + W^+,\qquad W^+ \to e^+ + \nu_e.
$$

Native status: provisional weak-reaction provenance map.

The active quark change is an axial-layer reconfiguration. In the current assembly catalog, the top-to-bottom transition is represented as a shift from the top axial pattern to the bottom axial pattern:

$$
(1E,5P)_{\text{axial}} \to (4E,2P)_{\text{axial}}.
$$

Equivalently, the active quark sector requires a $+3E,-3P$ axial exchange. In observer language this is the $W^+$ channel. In substrate language it is a transient payload and coupling event whose geometry, chirality selection, and energy routing still need closure.

The lepton products cannot be asserted as creation from nothing. Their core and axial-layer material must be drawn from a local Noether-Sea reservoir or from explicitly identified incoming assemblies. The provisional ledger target is:

| Component | Ledger requirement | Status |
| --- | --- | --- |
| Top-to-bottom axial exchange | Route the $+3E,-3P$ change through a weak-channel coupling event | Provisional |
| Positron assembly | Identify the Noether-core and axial material used to form the charged lepton output | Provisional |
| Electron-neutrino assembly | Identify neutral core and axial-layer routing, including chirality/orientation | Provisional |
| Energy-momentum | Account for quark mass difference, lepton energies, recoil, and medium excitation | Derivation target |
| Weak geometry | Derive the left-handed selection rule and allowed coupling operator | Derivation target |

This channel should not be presented as a completed architrino derivation until the inventory table balances $E/P$ counts, core orientation, axial-layer routing, and energy-momentum in one consistent record.

## Free Neutron Beta Reaction

Observer-level notation:

$$
n \to p + e^- + \bar{\nu}_e,
$$

with the active quark-level comparison

$$
d \to u + W^-,\qquad W^- \to e^- + \bar{\nu}_e.
$$

Native label: free-neutron beta reaction.

The spectator structure is straightforward: one $u$ and one $d$ in the neutron pass through the reaction unchanged. The active channel is the second down-like assembly reconfiguring into an up-like assembly.

The axial-layer comparison is:

$$
(4E,2P)_{\text{axial}} \to (1E,5P)_{\text{axial}}.
$$

So the active quark assembly sheds three $E$-type axial units and receives three $P$-type axial units. The natural provenance hypothesis is that local neutral Noether-Sea material supplies the compensating polarity units while the ejected $E$-type material participates in electron axial-layer formation.

### Exposure-operator record

The controlled beta channel now has a first finite-state exposure operator in [Weak-Mixing CKM](../theory-bridges/weak-mixing-ckm.md). The ledger record for this channel should use that operator as the geometry gate before any rate or provenance claim is made.

This gate inherits the unresolved spinor/helicity proof in [Angular Momentum and Spin](../theory-bridges/angular-momentum-and-spin.md). The blocked right-handed branch, antineutrino orientation, and weak-channel angular-momentum balance remain provisional until the weak-coupling-triad exposure geometry and the reaction-level angular-momentum ledger are derived from the same substrate proof.

| Gate field | Beta-reaction record |
| --- | --- |
| Active assembly | One generation-I down-like quark inside the neutron |
| Spectators | One $u$ and one $d$ assembly pass through by identity |
| Exposure domain | $\Sigma_{\mathrm{WCT}}^{(L)}$ on the leading, phase-matched weak-coupling triad |
| Gate condition | Left-handed charged-current docking with $\lvert\Sigma_{\mathrm{WCT}}^{(L)}\rvert=3$ and active inventory $3E$ |
| Blocked condition | Right-handed $d$ channel has no charged-corridor docking in the finite-state model |
| Quark-side action | $A_{\Sigma}=3E\to3P$, with shielded inventory $A_{\mathrm{sh}}=(1E,2P)$ unchanged |
| Corridor payload | $W^-$ carries the opposite transaction $\Delta A_W=3(E-P)$, net charge $-e$ |
| CKM weight | $V_{ud}$, interpreted as the same-tier weak-basis to shielding-eigenstate overlap |
| Provenance stance | Transaction-payload corridor unless a later derivation proves provenance-carrying corridor content is required |

This record keeps the beta reaction from becoming two separate stories. The same exposed triad must explain the left-handed selection rule, supply the $V_{ud}$ overlap domain, and identify what the $W^-$ corridor transfers. The remaining open work is to identify the electron and antineutrino core provenance and then attach the energy, angular momentum, recoil, and path-history terms.

The conservative ledger is:

| Component | Required provenance statement | Closure status |
| --- | --- | --- |
| Active $d \to u$ assembly | Route $3E$ out of the active axial layer and route $3P$ into it | Provisional map |
| Electron assembly | Combine the ejected $3E$ contribution with additional local Noether-Sea material and a suitable core | Provisional map |
| Antineutrino assembly | Identify neutral core orientation, axial-layer routing, and weak-channel phase relation | Open derivation target |
| Noether Sea | Record every neutral core, axial layer, or medium excitation consumed or returned | Required |
| Energy and angular momentum | Track mass difference, recoil, electron kinetic energy, antineutrino energy, and medium response | Required |

This map supports a strong but bounded claim: beta reaction charge bookkeeping can be interpreted as local separation and rerouting of neutral Noether-Sea material plus active quark axial reconfiguration. It does not yet establish a full weak-interaction derivation, because chirality selection, antineutrino routing, and quantitative rate closure still belong to the weak-sector closure program.

## Closure Targets

The reaction ledger needs four tables for each serious channel:

1. **Constituent inventory table:** core and axial-layer $E/P$ counts for every input, output, Noether-Sea contribution, and returned medium product.
2. **Energy-momentum table:** internal energy changes, kinetic output, recoil, photon assemblies, neutrino channel, and medium excitation.
3. **Geometry table:** axial frame, core orientation, chirality, polarity routing, and allowed coupling/docking geometry.
4. **Path-history table:** causal-root branches, source identities, emission times, and local Noether-Sea state variables needed for deterministic replay.

## Validation Links

- Weak-sector geometry and chirality closure remain tied to [Quantum Number Mapping](../assemblies/fermions/quantum-number-mapping.md), [Weak Mixing Angle](../assemblies/fermions/weak-mixing-angle.md), and [Weak-Mixing CKM](../theory-bridges/weak-mixing-ckm.md).
- Radiative and pair-production provenance should use [Synchrotron Cascades](../reactions/synchrotron.md), [Bremsstrahlung](../reactions/bremsstrahlung.md), and [Reaction-Cosmology Provenance Ledger](reaction-cosmology-provenance-ledger.md).
- Parameter closure belongs in [Parameter Ledger](parameter-ledger.md).
