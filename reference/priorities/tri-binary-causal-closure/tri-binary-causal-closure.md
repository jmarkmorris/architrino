# Tri-Binary Causal Closure: Rest Mass, Proper Time, and Relativistic Limits

## Workstream Metadata

- Kind: `priority`
- Rank: `5`
- Value: `29.90`
- Cost: `5.4`
- ROI: `5.54`
- Status: `active-development`

## Task Queue

1. `photon_qed_gate` — Build the three photon/QED stress-test packets for kinematics and optics, polarization and spin, and vertices and transitions. Status: `pending`. Depends on: none.
2. `residual_routing_event_ledger` — Advance the promoted residual-to-channel contract into worked sector cases for radiation, transport, weak reactions, nuclear binding, measurement records, and strong-field release. Status: `worked-cases-pending`. Depends on: none.
3. `radiation_gate_c_benchmarks` — Build the radiation Gate C benchmark ledger for atomic transitions, bremsstrahlung, synchrotron, Compton-like scattering, pair channels, and blackbody recovery. Status: `pending`. Depends on: `photon_qed_gate`, `residual_routing_event_ledger`.
4. `lorentz_residual_packet` — Export moving-assembly deformation, clock retuning, and two-way signal timing into RMS/PPN/SME-style residual rows. Status: `pending`. Depends on: none.

## Completed State

- `tri_binary_dependency_map` completed the proof-dependency map and deployment handoff table.
- `continuity_pass` walked the synthesis against the dependency map, especially shielding, momentum skew, and transverse-budget root-finding jumps.
- `deployment_handoff` routed unresolved synthesis claims through theorem-roadmap tags and priority-table handoff rows before deployment.

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

Completed map-cleanup items are recorded in `Completed State` above. The live promotion map now lists only active or downstream queue items.

| Task | Detailed file | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `photon_qed_gate` | [rest-mass-proper-time-relativity-synthesis.md](rest-mass-proper-time-relativity-synthesis.md) | [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md), [bell-theorem](../../../content/markdown/aaa/theory-bridges/bell-theorem.md), and downstream Standard Model closure material. | Photon gates A-C are separated into kinematics/optics, polarization/spin, and vertices/transitions with explicit null-test burdens before deployment. |
| `residual_routing_event_ledger` | [residual-routing-event-ledger.md](residual-routing-event-ledger.md) | [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md), [reaction-cosmology-provenance-ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), [energy](../../../content/markdown/aaa/dynamics/energy.md), and [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md) | A named residual routes through admissible channels into a complete $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ event ledger before any transition, radiation event, measurement record, reaction, transport excitation, or strong-field release is promoted. |
| `radiation_gate_c_benchmarks` | [radiation-gate-c-benchmarks.md](radiation-gate-c-benchmarks.md) | [radiation](../../../content/markdown/aaa/reactions/radiation.md), [atomic-transition-radiation](../../../content/markdown/aaa/reactions/atomic-transition-radiation.md), [bremsstrahlung](../../../content/markdown/aaa/reactions/bremsstrahlung.md), [synchrotron](../../../content/markdown/aaa/reactions/synchrotron.md), and [reaction-ledger](../../../content/markdown/aaa/validation/reaction-ledger.md) | One closure-residual event ledger recovers the benchmark electromagnetic/QED-like channels without per-observable retuning and without bypassing photon Gate A/B. |
| `lorentz_residual_packet` | [lorentz-invariance-test-suite.md](../cross-theory-mapping/lorentz-invariance-test-suite.md) | [lorentz-kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md), [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), and [ppn-parameters](../../../content/markdown/aaa/spacetime/ppn-parameters.md) | A single tri-binary branch record produces $\xi$, $\omega_{\text{clk}}/\omega_0$, $\Delta_{\mathrm{tw}}$, $(R_{\mathrm{MM}},R_{\mathrm{KT}},R_{\mathrm{IS}})$, and $(\alpha_1,\alpha_2,\alpha_3)$ without separately tuned clock, ruler, photon, or preferred-frame coefficients. |

## Lorentz-Test Residual Interface

The Living Reviews and SME source family sharpens the tri-binary relativity burden. A branch that visually produces the Lorentz envelope ratio is insufficient unless the same causal-root ledger also retunes clocks and closed signal paths. The export object for this workstream is
$$
\mathcal{E}_{\mathrm{tri\text{-}Lor}}^{(q)}(\beta)
=
\left(
\xi^{(q)}(\beta)-\gamma^{-1},
\frac{\omega_{\text{clk}}^{(q)}(\beta)}{\omega_0}-\gamma^{-1},
\Delta_{\mathrm{tw}}^{(q)}(\beta,\hat{\mathbf n}),
R_{\mathrm{MM}}^{(q)},
R_{\mathrm{KT}}^{(q)},
R_{\mathrm{IS}}^{(q)}
\right),
$$
where $q$ labels the retained tri-binary branch class. The first two entries test moving-assembly deformation and clock retuning; the third tests two-way synchronization; the final three entries are the RMS decomposition that prevents a Michelson-Morley-only cancellation from being mistaken for full Lorentz closure.

The residual packet must carry its provenance:
$$
q\mapsto
\left(
\mathcal{A}_{q},
\nu_J^{(q)},
h_{\mathrm{mem}}^{(q)},
\mathcal{R}_{\mathrm{tr}}^{(q)},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right),
$$
with active root ledger $\mathcal{A}_{q}$, Jacobian floor $\nu_J^{(q)}$, memory depth $h_{\mathrm{mem}}^{(q)}$, root-transport residual $\mathcal{R}_{\mathrm{tr}}^{(q)}$, and the event ledger $\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}$. A Lorentz residual below bound is not promotable if the branch identity changes between the clock, ruler, and signal rows.

Failure modes:

- `tri_lorentz.branch_split`: $\xi$ closes on one branch while $\omega_{\text{clk}}/\omega_0$ or $\Delta_{\mathrm{tw}}$ closes on another branch.
- `tri_lorentz.mm_only`: the two-way orientation residual cancels but $R_{\mathrm{KT}}$ or $R_{\mathrm{IS}}$ remains nonzero.
- `tri_lorentz.photon_gate_split`: photon Gate A requires a $c_\gamma$ or $\chi_\gamma$ row not derived from the same branch record.
- `tri_lorentz.ppn_leakage`: the branch exports nonzero $(\alpha_1,\alpha_2,\alpha_3)$ above the PPN preferred-frame bounds.

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
