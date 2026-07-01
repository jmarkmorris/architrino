# Nuclear Atomic Molecular Closure

## Workstream Metadata

- Kind: `priority-candidate`
- Rank: `unscored-discussion`
- Value: `unscored`
- Cost: `unscored`
- ROI: `unscored`
- Status: `active-discussion`

## Task Queue

1. `nuclear_binding_packet_ownership` — Keep the nuclear benchmark ladder and first $V_{NN}$ row discoverable here while preserving its dependency on Standard Model confinement energetics. Status: `active`. Depends on: `confinement_energetics`.
2. `nuclear_radiation_worked_examples` — Track alpha, beta, gamma, radioisotope, and heat-channel worked examples as nuclear reaction provenance before routing photon-source details to `EQ-29`. Status: `next`. Depends on: `nuclear_binding_packet_ownership`.
3. `atomic_orbital_import` — Triage the deferred electron-orbitals note into a cleaner atomic-structure and spectra bridge. Status: `queued`. Depends on: none.
4. `molecular_bonding_bridge` — Define the first molecular bonding and geometry targets from atomic ledger, electron-envelope, Noether sea response, and reaction-provenance rows. Status: `queued`. Depends on: `atomic_orbital_import`.

## Scope

This workstream is the discussion and staging bucket for topics above elementary Standard Model closure and below full biological explanation: nuclear binding, nuclear radiation, isotopes, atomic structure, electron orbitals, spectra, periodic-table behavior, condensed matter handoffs, molecules, biomolecules, enzymes, DNA/RNA, conformational switching, and information-bearing molecular geometry.

The bucket does not replace [Standard Model Closure](../standard-model-closure/standard-model-closure.md), [braid-mass-response-map](../braid-mass-response-map/braid-mass-response-map.md), [quantum-closure](../quantum-closure/quantum-closure.md), [equation-mapping](../equation-mapping/equation.md), or [source-mining](../source-mining/source-mining.md). It owns the repeated higher-assembly conversation layer and points hard derivation dependencies back to those parent workstreams.

Use this bucket when the question is naturally about a physical assembly above the particle sector: a nucleus, isotope, atom, orbital family, bond, molecule, enzyme pocket, DNA/RNA structure, reaction pathway, or molecular record. Keep claims at priority-candidate level until the underlying branch, event-ledger, exposure, Noether sea response, or source-carrier rows are accepted.

## Ownership Rules

- Nuclear binding, isotope stability, alpha/beta/gamma examples, and nuclear heat-channel accounting belong here as discussion and staging material.
- QCD confinement, quark masses, weak-sector provenance, Higgs/scalar benchmarks, and detector-provenance records remain under [standard-model-closure](../standard-model-closure/standard-model-closure.md).
- Generic radiation-source carrier evidence remains under [equation-mapping/EQ-29](../equation-mapping/eq-29-radiation-source-carrier-source-field-map.md). Nuclear radiation examples should route to `EQ-29` only when the photon source carrier, channel family, mechanism, and source branch rows become the active blocker.
- Condensed-matter transport and pressure-response packets remain under [braid-mass-response-map](../braid-mass-response-map/braid-mass-response-map.md) while their main job is mass, pressure, medium response, or transport-threshold extraction.
- Quantum measurement, basin measure, Born-rule, Bell, and spin-biology stress tests remain under [quantum-closure](../quantum-closure/quantum-closure.md) unless the active question is an atomic, molecular, or biomolecular assembly mechanism.

## Adjacent Ownership Audit

| Existing priority item | Decision | Reason |
| --- | --- | --- |
| [EQ-29 Radiation Source Carrier Source-Field Map](../equation-mapping/eq-29-radiation-source-carrier-source-field-map.md) | Keep in `equation-mapping`. | It owns the accepted carrier/source-field blocker for generic radiation-source evidence; this bucket owns nuclear worked examples that may later consume that row. |
| [Electron Orbitals](../deferred/electron-orbitals/electron-orbitals.md) | Keep in `deferred` for now; track through `atomic_orbital_import`. | It is still a merged note rather than a clean priority packet. The next move is triage into an atomic-structure/spectra bridge, not a blind directory move. |
| [Xenon Isotope Spin-Biology Validation Watch](../quantum-closure/xenon-isotope-spin-biology.md) | Keep in `quantum-closure`. | Its active role is a blocked external validation watch for spin-sensitive biological response and measurement-response closure, not molecule-level mechanism yet. |
| [Nuclear Atomic Image Intake](../source-mining/archive-analysis/nuclear-atomic-image-intake.md) | Keep in `source-mining/archive-analysis`. | It is an asset-provenance record for imported images, not a theory or closure packet. |
| [Orbital Quantization Recovery Packet](../braid-angular-momentum-spin/orbital-quantization-recovery-packet.md) | Keep in `braid-angular-momentum-spin`. | It proves observer-level orbital-label recovery as a contrast gate for spinor closure; atomic and molecular spin remain downstream consumers. |

## Detailed Priority Files

| File | Role | Primary promotion targets |
| --- | --- | --- |
| [nuclear-binding-closure.md](nuclear-binding-closure.md) | First hadronic-to-nuclear benchmark ladder, effective $V_{NN}$ target, branch-interface exchange residual, and Pu-238 reaction-provenance worked-example target. | [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md), [nucleon-structure](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md), and [mesons](../../../content/markdown/aaa/assemblies/mesons/mesons.md). |
| [nn-corridor-overlap-first-evaluation.md](nn-corridor-overlap-first-evaluation.md) | First reduced numerical evaluation of $\Delta E_{\mathrm{corr}}^{NN}(r)$ for $p+n$ and $p+p$ channels, including orientation, branch-interface mismatch, Coulomb rows, and native $\mathcal B_{ij}^{\mathrm{int}}$ channel extraction. | [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md) after accepted proton/neutron interface ledgers and native scale/range extraction exist. |
| [brainstorming.md](brainstorming.md) | Candidate idea parking for nuclear radiation, orbitals, molecular bonding, enzymes, DNA/RNA, and related discussion topics. | Priority-only until a concrete equation, ledger row, simulation target, or corpus promotion route is selected. |

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `nuclear_binding_packet_ownership` | [nuclear-binding-closure.md](nuclear-binding-closure.md) and [nn-corridor-overlap-first-evaluation.md](nn-corridor-overlap-first-evaluation.md) | [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md) | A derived or constrained $V_{NN}$ binds $p+n$, avoids unphysical $p+p$ binding, explains saturation or alpha-like enhancement, and keeps residual channels in one event ledger. |
| `nuclear_radiation_worked_examples` | [nuclear-binding-closure.md](nuclear-binding-closure.md) and [brainstorming.md](brainstorming.md) | [radiation](../../../content/markdown/aaa/reactions/radiation.md) and [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md) | A nuclear event ledger names parent assembly, daughter assembly, emitted products, recoil, heat, photon rows when present, Noether sea update, and path-history provenance without hidden loss. |
| `atomic_orbital_import` | [deferred/electron-orbitals](../deferred/electron-orbitals/electron-orbitals.md) and [brainstorming.md](brainstorming.md) | [atomic-structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md), [atomic-spectra](../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md), and [wavefunction-ontology](../../../content/markdown/aaa/quantum/wavefunction-ontology.md) | Orbitals are restated as effective occupancy/readout patterns for localized assemblies with explicit claim level and without importing probability clouds as ontology. |
| `molecular_bonding_bridge` | [brainstorming.md](brainstorming.md) | Future molecular or chemistry-facing corpus target after selection | A molecule-level target identifies participating nuclei, electron-envelope rows, bond geometry, reaction/path ledger, stability margin, and failure mode. |

## Related Priorities

- [standard-model-closure](../standard-model-closure/standard-model-closure.md)
- [braid-mass-response-map](../braid-mass-response-map/braid-mass-response-map.md)
- [residual-routing event ledger](../braid-nested-shell-causal-closure/residual-routing-event-ledger.md)
- [equation-mapping/EQ-29](../equation-mapping/eq-29-radiation-source-carrier-source-field-map.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)
- [source-mining](../source-mining/source-mining.md)

## Related AAA Notes

- [nuclear-binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md)
- [nucleon-structure](../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md)
- [atomic-structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md)
- [atomic-spectra](../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md)
- [condensed-matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md)
- [radiation](../../../content/markdown/aaa/reactions/radiation.md)
- [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md)
