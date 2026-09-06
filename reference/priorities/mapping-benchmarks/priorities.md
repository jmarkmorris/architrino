# Mapping Benchmarks Priority Candidates

For the overall program and the distinction between benchmark, equation, and domain work, start with the [Mapping overview](../mapping/README.md#what-mapping-benchmarks-means).

## Workstream Metadata

- Kind: `priority-candidate`
- Rank: `9`
- Value: `6.95`
- Cost: `4.6`
- ROI: `1.51`
- Status: `draft`

## Work Queue

The locally ranked benchmark mappings, dependencies, and acceptance boundaries live in [work-queue.md](work-queue.md).

## Current

XTM-001 is complete at benchmark-specification grade in [Gravitational Redshift And Clock Tests](analysis/gravitational-redshift-clock-tests.md). The source-bound NIST optical-clock packet names the measured record, required native carrier, normalized residual, controls, and failure predicates; its current physical result is `blocked_missing_native_clock_transport_record`. The remaining queue objects are deferred behind their named native carriers.

## Scope

This directory is a priority-candidate lane for observational and experimental cases whose standard-theory mathematics can sharpen $\mathbb{A}\mathbb{A}\mathbb{A}$ development. Each draft starts from the standard-theory concept, then maps the benchmark into existing corpus signals, the central execution queue, closure objects, promotion maps, and failure modes.

The lane is not authored AAA canon. It is source material for later promotion into validation gates, spacetime closure, radiation closure, quantum closure, angular-momentum closure, cosmology closure, and related proof programs.

The [Shared Equation And Mapping Architecture](../mapping/contracts/mapping-method.md) governs the boundary between equation-first, benchmark-first, domain-integration, and native-evidence work. Case-local candidate steps decompose a benchmark at draft grade; only [work-queue.md](work-queue.md) owns executable rows for Mapping Benchmarks.

## Lane Map

| Lane | Draft cases | Primary AAA pressure |
| --- | --- | --- |
| Effective spacetime structure | [spacetime-structure-experiment-suite](analysis/spacetime-structure-experiment-suite.md) | Separates metric reconstruction, propagation, correlated displacement searches, global topology, and mediated-entanglement witnesses; constrains one shared Noether-sea record through independent instrument projections. |
| Redshift, clock, and transport | [gravitational-redshift-clock-tests](analysis/gravitational-redshift-clock-tests.md), [cosmological-redshift-distance-ladder](analysis/cosmological-redshift-distance-ladder.md) | Clock-rate comparison, Noether sea delay, cosmology transfer functions, effective observer variables. |
| Lorentz and preferred-frame tests | [lorentz-invariance-test-suite](analysis/lorentz-invariance-test-suite.md) | Moving-assembly deformation, clock/ruler retuning, two-way signal synchronization, preferred-frame leakage. |
| Rotating and moving media | [sagnac-effect](analysis/sagnac-effect.md), [fizeau-moving-medium](analysis/fizeau-moving-medium.md) | Path-history phase, rotation, medium transport, moving-medium effective velocity addition. |
| Weak-field metric and PPN | [shapiro-time-delay](analysis/shapiro-time-delay.md), [gravitational-lensing](analysis/gravitational-lensing.md), [perihelion-precession](analysis/perihelion-precession.md) | Effective metric recovery, PPN coefficients, one Noether sea response object across clocks, rulers, and null paths. |
| Compact radiation and gravity waves | [binary-pulsar-orbital-decay](analysis/binary-pulsar-orbital-decay.md), [gravitational-waves](analysis/gravitational-waves.md) | Radiation reaction, event ledgers, waveform phase, chirp mass, propagation speed, strong-field continuity. |
| Thermal, statistical, radiative, and QED corrections | [entropy](analysis/entropy.md), [temperature](analysis/temperature.md), [blackbody-radiation](analysis/blackbody-radiation.md), [radiative-corrections-lamb-shift-g-minus-2](analysis/radiative-corrections-lamb-shift-g-minus-2.md), [strong-field-electromagnetic-response](analysis/strong-field-electromagnetic-response.md), [casimir-effect](analysis/casimir-effect.md) | Entropy and temperature mapping, ensemble measures, radiation Gate C, continuum excess, regularization, mode sums, boundary-sensitive response, and same-record nonlinear electromagnetic scattering, propagation, pair production, and backreaction. |
| Quantum phase and oscillation | [double-slit-mach-zehnder](analysis/double-slit-mach-zehnder.md), [aharonov-bohm-effect](analysis/aharonov-bohm-effect.md), [neutrino-oscillations](analysis/neutrino-oscillations.md) | Path-history phase, gauge-like holonomy, internal-state rotation, basin-measure closure. |
| Atomic magnetic spectroscopy | [zeeman-effect](analysis/zeeman-effect.md) | Atomic line splitting, effective magnetic-state recovery, polarization selection, ordered-frame spinor response, and shared laboratory/stellar source reconstruction. |
| Spin, measurement, and Bell | [malus-law](analysis/malus-law.md), [stern-gerlach](analysis/stern-gerlach.md), [bell-test-violations](analysis/bell-test-violations.md) | Photon-analyzer response, ordered-frame spinor closure, detector response, pair provenance, no-signaling, Tsirelson-compatible correlations. |
| Topological and statistical emergence | [quantum-hall-effect](analysis/quantum-hall-effect.md), [brownian-motion](analysis/brownian-motion.md) | Robust invariants, transport coefficients, fluctuation-dissipation, micro-to-macro coarse graining. |
| Collider reconstruction provenance | CERN Academic Training detector lectures; CERN Yellow Reports LHC Run-2, flavor, neutrino, cosmology/dark matter, and Higgs records; ATLAS/CMS reconstruction notes | Object reconstruction, missing transverse momentum, heavy-flavor tagging, boosted substructure, invisible-channel limits, and statistical fit conventions remain observer evidence tied to event-ledger closure. |

## Shared Closure Record

The benchmark cases should be promoted only when their variables can be expressed through a shared closure record

$$
\Theta_{\mathrm{map}}
=
\left(
\Gamma,
\mathcal{H},
\mathcal{C}_{o'j},
J_{o'j},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{M}_{\mathrm{sea}}^{ab},
\rho_{\text{NS}}(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t),
\mathcal{D}_{\mathrm{det}},
\{B_i\},
\mu_*
\right).
$$

Here $\Gamma$ is the assembly state, $\mathcal{H}$ is the path-history and causal-wake ledger, $\mathcal{C}_{o'j}$ and $J_{o'j}$ are causal-root and Jacobian records, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event ledger, $\mathcal{M}_{\mathrm{sea}}^{ab}$ is the Noether sea response object, $\rho_{\text{NS}}(\mathbf{x},t)$ and $\chi_{\text{sea}}(\mathbf{x},t)$ are medium variables, $\mathcal{D}_{\mathrm{det}}$ is the detector-response and reconstruction record when an experimental case depends on reconstructed objects, and $\{B_i\},\mu_*$ are basin and measure objects when quantum or statistical outcomes enter.

For collider cases, the minimum detector-response projection is

$$
\mathcal{D}_{\mathrm{det}}
=
\left(
\mathcal{O}_{\mathrm{reco}},
\mathbf{p}_T^{\mathrm{miss}},
\mathcal{V}_{\mathrm{prim/sec}},
T_{b/c},
\Delta R,
\mathcal{C}_{\mathrm{fit}}
\right),
\qquad
\mathbf{p}_T^{\mathrm{miss}}
=
-
\left(
\sum_{o\in\mathcal{O}_{\mathrm{hard}}}
\mathbf{p}_{T,o}
+
\mathbf{p}_T^{\mathrm{soft}}
\right).
$$

This projection is a provenance channel from detector signals to benchmark variables. It is not an additional substrate object and should not be promoted into ontology.

## Promotion Map

| Draft case family | Candidate promotion target | Promotion gate |
| --- | --- | --- |
| Redshift and cosmology | [mapping-cosmology](../dormant-deferred/mapping-cosmology/priorities.md), [validation-gates](../dormant-deferred/validation-gates/priorities.md) | Redshift, clock, CMB, supernova, BAO, and $H(z)$ records consume the same Noether sea variables without tired-light image or time-dilation failure. |
| Lorentz, Sagnac, and Fizeau | braid, [master-equation-closure](../master-equation-closure/priorities.md) | Two-way light speed, time dilation, length contraction, rotation, and moving-medium transport recover observer-level formulas while bounding preferred-frame leakage. |
| Weak-field metric | [validation-gates](../dormant-deferred/validation-gates/priorities.md), mass-map | One $\mathcal{M}_{\mathrm{sea}}^{ab}$ maps to redshift, Shapiro delay, lensing, precession, and PPN coefficients. |
| Radiation and gravitational waves | [Radiation](../../../content/markdown/aaa/reactions/radiation.md), [mapping-strong-field](../mapping-strong-field/priorities.md) | Energy, momentum, angular momentum, recoil, medium updates, and waveform phase close in one event-ledger grammar. |
| Atomic magnetic spectroscopy, quantum phase, spin, and Bell | [mapping-quantum](../mapping-quantum/priorities.md), angular-momentum-spin, [Mapping Electromagnetism](../mapping-electromagnetism/priorities.md) | Zeeman splitting, polarization selection, phase, spin, photon-analyzer response, detector basins, Born weights, no-signaling, and Bell correlations derive from shared retained records rather than imported field or probability postulates. |
| Topological and statistical emergence | [validation-gates](../dormant-deferred/validation-gates/priorities.md), mass-map | Robust integer/fractional invariants and fluctuation-dissipation limits emerge from stable basins and transport maps. |
| Collider reconstruction provenance | [mapping-standard-model](../mapping-standard-model/priorities.md), angular-momentum-spin, [validation-gates](../dormant-deferred/validation-gates/priorities.md) | Reconstructed objects, missing transverse momentum, heavy-flavor tags, boosted substructure, fiducial cross sections, and upper limits are compared as observer-level projections of one event-ledger and detector-response record. |

## Failure Modes

| Failure code | Meaning |
| --- | --- |
| `cross_map.hidden_tuning` | A case requires coefficients or medium variables that differ from sibling cases without a recorded state variable. |
| `cross_map.benchmark_fit_only` | A validated formula is used as an input instead of being recovered from $\Theta_{\mathrm{map}}$. |
| `cross_map.level_collapse` | Standard-theory effective language is promoted as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology without a substrate closure object. |
| `cross_map.no_event_ledger` | Energy, momentum, angular momentum, recoil, source, remnant, or medium-update rows are missing. |
| `cross_map.no_shared_limit` | Two accepted case mappings require incompatible effective limits. |
| `cross_map.no_failure_test` | A draft identifies a useful analogy but has no benchmark variable, tolerance, or falsifier. |
| `cross_map.detector_ontology_blend` | Reconstructed detector objects, tags, missing momentum, or fit categories are treated as substrate products rather than observer-level provenance. |

## Related Priorities

- [validation-gates](../dormant-deferred/validation-gates/priorities.md)
- braid
- [master-equation-closure](../master-equation-closure/priorities.md)
- mass-map
- [mapping-quantum](../mapping-quantum/priorities.md)
- angular-momentum-spin
- [mapping-cosmology](../dormant-deferred/mapping-cosmology/priorities.md)
- [mapping-strong-field](../mapping-strong-field/priorities.md)
