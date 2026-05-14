# Tri-Binary Causal Closure: Rest Mass, Proper Time, and Relativistic Limits

## Workstream Metadata

- Kind: `priority`
- Rank: `6`
- Value: `16.00`
- Cost: `5.4`
- ROI: `2.96`
- Status: `active-development`

## Task Queue

1. `tri_binary_dependency_map` — Maintain the proof-dependency map and deployment handoff table. Status: `done`. Depends on: none.
2. `continuity_pass` — Walk the synthesis section by section against the dependency map, especially shielding, momentum skew, and transverse-budget root-finding jumps. Status: `done`. Depends on: `tri_binary_dependency_map`.
3. `photon_qed_gate` — Build the three photon/QED stress-test packets for kinematics and optics, polarization and spin, and vertices and transitions. Status: `pending`. Depends on: `continuity_pass`.
4. `residual_routing_event_ledger` — Advance the promoted residual-to-channel contract into worked sector cases for radiation, transport, weak reactions, nuclear binding, measurement records, and strong-field release. Status: `contract-promoted`; worked theorem cases pending. Depends on: `continuity_pass`.
5. `radiation_gate_c_benchmarks` — Build the radiation Gate C benchmark ledger for atomic transitions, bremsstrahlung, synchrotron, Compton-like scattering, pair channels, and blackbody recovery. Status: `pending`. Depends on: `photon_qed_gate`, `residual_routing_event_ledger`.
6. `deployment_handoff` — Route unresolved synthesis claims through inline theorem-roadmap tags and priority-table handoff rows before deployment. Status: `done`. Depends on: `continuity_pass`.

## Scope

This workstream owns the synthesis bridge from tri-binary Noether-core closure to rest mass, proper time, effective Lorentz/GR behavior, photon propagation, and measurement. It is a proof-architecture and routing surface: active-development claims can live here while the dependency ladder is being built, but unresolved claims must be closed, retained as explicit roadmap items, routed to another priority workstream, or cut before deployment.

The deployed dynamics baseline is [Tri-Binary Dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md). That chapter owns the Noether-core roles, speed-regime conventions, delay-envelope geometry, gradient response, local clock diagnostics, and stability tests. This priority document should import those mechanisms rather than re-defining them, then test whether they support the mass, time, relativity, photon, and measurement claims in the sibling synthesis file.

## Detailed Priority Files

| File | Role | Primary promotion targets |
| --- | --- | --- |
| [tri-binary-dependency-map.md](tri-binary-dependency-map.md) | Active proof-dependency map and deployment handoff table for open claims. | [tri-binary-dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md), [energy](../../../content/markdown/aaa/dynamics/energy.md), [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) |
| [rest-mass-proper-time-relativity-synthesis.md](rest-mass-proper-time-relativity-synthesis.md) | Full active-development synthesis and theorem roadmap for rest mass, proper time, effective relativity, photons, measurement, and strong-field limits. | [energy](../../../content/markdown/aaa/dynamics/energy.md), [tri-binary-dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md), [special-relativity-noether-core](../../../content/markdown/aaa/theory-bridges/special-relativity-noether-core.md), [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), [gr-phenomenology](../../../content/markdown/aaa/spacetime/gr-phenomenology.md) |
| [plain-language-relativity-bridge.md](plain-language-relativity-bridge.md) | Reader-orientation appendix that explains time dilation, length contraction, speed limits, and equivalence-principle motivation in plain language. | [special-relativity-noether-core](../../../content/markdown/aaa/theory-bridges/special-relativity-noether-core.md), [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| [residual-routing-event-ledger.md](residual-routing-event-ledger.md) | Shared theorem packet for residual-to-channel routing and event-ledger closure across radiation, transport, weak reactions, nuclear binding, measurement records, and strong-field release. | [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md), [reaction-cosmology-provenance-ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), [energy](../../../content/markdown/aaa/dynamics/energy.md), [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md) |
| [radiation-gate-c-benchmarks.md](radiation-gate-c-benchmarks.md) | Gate C benchmark packet for radiation as routed closure residual rather than primitive acceleration emission. | [radiation](../../../content/markdown/aaa/reactions/radiation.md), [atomic-transition-radiation](../../../content/markdown/aaa/reactions/atomic-transition-radiation.md), [bremsstrahlung](../../../content/markdown/aaa/reactions/bremsstrahlung.md), [synchrotron](../../../content/markdown/aaa/reactions/synchrotron.md), [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md), [reaction-cosmology-provenance-ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) |

## Promotion Map

| Task | Detailed file | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `tri_binary_dependency_map` | [tri-binary-dependency-map.md](tri-binary-dependency-map.md) | All tri-binary causal-closure promotion targets. | Every unresolved claim has a `closed`, `roadmap`, `priority`, or `cut` disposition before textbook-facing deployment. |
| `continuity_pass` | [rest-mass-proper-time-relativity-synthesis.md](rest-mass-proper-time-relativity-synthesis.md) | [energy](../../../content/markdown/aaa/dynamics/energy.md), [tri-binary-dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md), [special-relativity-noether-core](../../../content/markdown/aaa/theory-bridges/special-relativity-noether-core.md), and [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) | The synthesis is walked against the dependency map, theorem-roadmap tags stay attached to open burdens, and unsupported theorem prose is routed or cut. |
| `photon_qed_gate` | [rest-mass-proper-time-relativity-synthesis.md](rest-mass-proper-time-relativity-synthesis.md) | [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md), [bell-theorem](../../../content/markdown/aaa/theory-bridges/bell-theorem.md), and downstream Standard Model closure material. | Photon gates A-C are separated into kinematics/optics, polarization/spin, and vertices/transitions with explicit null-test burdens before deployment. |
| `residual_routing_event_ledger` | [residual-routing-event-ledger.md](residual-routing-event-ledger.md) | [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md), [reaction-cosmology-provenance-ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), [energy](../../../content/markdown/aaa/dynamics/energy.md), and [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md) | A named residual routes through admissible channels into a complete $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ event ledger before any transition, radiation event, measurement record, reaction, transport excitation, or strong-field release is promoted. |
| `radiation_gate_c_benchmarks` | [radiation-gate-c-benchmarks.md](radiation-gate-c-benchmarks.md) | [radiation](../../../content/markdown/aaa/reactions/radiation.md), [atomic-transition-radiation](../../../content/markdown/aaa/reactions/atomic-transition-radiation.md), [bremsstrahlung](../../../content/markdown/aaa/reactions/bremsstrahlung.md), [synchrotron](../../../content/markdown/aaa/reactions/synchrotron.md), and [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md) | One closure-residual event ledger recovers the benchmark electromagnetic/QED-like channels without per-observable retuning and without bypassing photon Gate A/B. |
| `deployment_handoff` | [tri-binary-dependency-map.md](tri-binary-dependency-map.md) and [rest-mass-proper-time-relativity-synthesis.md](rest-mass-proper-time-relativity-synthesis.md) | Target AAA dynamics, spacetime, quantum, and theory-bridge docs. | Each promotion claim is either integrated into the target document or retained as an explicit priority task. |

## Related Priorities

- [proof-programs](../proof-programs/proof-programs.md)
- [mass-map](../mass-map/mass-map.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)
- [simulations](../simulations/simulations.md)
- [strong-field-closure](../strong-field-closure/strong-field-closure.md)
- [standard-model-closure](../standard-model-closure/standard-model-closure.md)
- [validation-gates](../validation-gates/validation-gates.md)

## Related AAA Notes

- [tri-binary-dynamics](../../../content/markdown/aaa/dynamics/tri-binary-dynamics.md)
- [energy](../../../content/markdown/aaa/dynamics/energy.md)
- [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md)
- [noether-core](../../../content/markdown/aaa/spacetime/noether-core.md)
- [noether-core-geometry](../../../content/markdown/aaa/spacetime/noether-core-geometry.md)
- [lorentz-kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md)
- [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md)
- [special-relativity-noether-core](../../../content/markdown/aaa/theory-bridges/special-relativity-noether-core.md)
- [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md)
- [gr-phenomenology](../../../content/markdown/aaa/spacetime/gr-phenomenology.md)
- [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md)
- [bell-theorem](../../../content/markdown/aaa/theory-bridges/bell-theorem.md)
- [radiation](../../../content/markdown/aaa/reactions/radiation.md)
- [atomic-transition-radiation](../../../content/markdown/aaa/reactions/atomic-transition-radiation.md)
- [bremsstrahlung](../../../content/markdown/aaa/reactions/bremsstrahlung.md)
- [synchrotron](../../../content/markdown/aaa/reactions/synchrotron.md)
- [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md)
- [reaction-cosmology-provenance-ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md)
