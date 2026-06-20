# Cross-Theory Mapping Priority Candidates

## Workstream Metadata

- Kind: `priority-candidate`
- Rank: `unranked`
- Value: `candidate`
- Cost: `candidate`
- ROI: `candidate`
- Status: `draft`

## Task Queue

1. `redshift_clock_transport` — Map redshift observations into clock-rate, transport, and Noether sea evolution gates. Status: `draft`. Depends on: none.
2. `lorentz_preferred_frame` — Use Lorentz-invariance experiments as a preferred-frame leakage and two-way synchronization gate. Status: `draft`. Depends on: none.
3. `rotating_moving_media` — Use Sagnac and Fizeau cases to separate rotation, moving media, drag-like effective language, and Noether sea transport. Status: `draft`. Depends on: `lorentz_preferred_frame`.
4. `weak_field_metric_ppn` — Use weak-field GR benchmarks to force one effective-metric response object rather than observable-by-observable tuning. Status: `draft`. Depends on: `redshift_clock_transport`.
5. `radiation_gravity_waves` — Use compact-binary radiation and gravitational-wave propagation as event-ledger and effective-metric stress tests. Status: `draft`. Depends on: `weak_field_metric_ppn`.
6. `thermal_statistical_radiative_qed` — Use entropy, temperature, blackbody, radiative-correction, and boundary-vacuum cases to discipline statistical emergence, radiation Gate C, and regularization language. Status: `draft`. Depends on: `radiation_gravity_waves`.
7. `quantum_phase_measure` — Use interference, gauge phase, and oscillation cases to test path-history phase and basin-measure maps. Status: `draft`. Depends on: `thermal_statistical_radiative_qed`.
8. `spin_bell_measurement` — Use Malus' law, Stern-Gerlach, and Bell tests as hard gates for angular-momentum, photon-analyzer, detector-kernel, pair-provenance, and no-signaling closure. Status: `draft`. Depends on: `quantum_phase_measure`.
9. `topological_transport_statistical_emergence` — Use quantum Hall and Brownian cases to test robust invariants, transport closure, and micro-to-macro emergence. Status: `draft`. Depends on: `quantum_phase_measure`.
10. `collider_reconstruction_provenance` — Use CERN detector, LHC Run-2, Higgs, flavor, neutrino, and invisible-channel source signals to keep reconstructed objects, missing transverse momentum, flavor tags, boosted substructure, and statistical limits at observer/provenance level. Status: `draft`. Depends on: `quantum_phase_measure`, `spin_bell_measurement`.

## Scope

This directory is a priority-candidate lane for observational and experimental cases whose standard-theory mathematics can sharpen $\mathbb{A}\mathbb{A}\mathbb{A}$ development. Each draft starts from the standard-theory concept, then maps the benchmark into existing corpus signals, task queues, closure objects, promotion maps, and failure modes.

The lane is not authored AAA canon. It is source material for later promotion into validation gates, spacetime closure, radiation closure, quantum closure, angular-momentum closure, cosmology closure, and related proof programs.

## Lane Map

| Lane | Draft cases | Primary AAA pressure |
| --- | --- | --- |
| Redshift, clock, and transport | [gravitational-redshift-clock-tests](gravitational-redshift-clock-tests.md), [cosmological-redshift-distance-ladder](cosmological-redshift-distance-ladder.md) | Clock-rate comparison, Noether sea delay, cosmology transfer functions, effective observer variables. |
| Lorentz and preferred-frame tests | [lorentz-invariance-test-suite](lorentz-invariance-test-suite.md) | Moving-assembly deformation, clock/ruler retuning, two-way signal synchronization, preferred-frame leakage. |
| Rotating and moving media | [sagnac-effect](sagnac-effect.md), [fizeau-moving-medium](fizeau-moving-medium.md) | Path-history phase, rotation, medium transport, moving-medium effective velocity addition. |
| Weak-field metric and PPN | [shapiro-time-delay](shapiro-time-delay.md), [gravitational-lensing](gravitational-lensing.md), [perihelion-precession](perihelion-precession.md) | Effective metric recovery, PPN coefficients, one Noether sea response object across clocks, rulers, and null paths. |
| Compact radiation and gravity waves | [binary-pulsar-orbital-decay](binary-pulsar-orbital-decay.md), [gravitational-waves](gravitational-waves.md) | Radiation reaction, event ledgers, waveform phase, chirp mass, propagation speed, strong-field continuity. |
| Thermal, statistical, radiative, and QED corrections | [entropy](entropy.md), [temperature](temperature.md), [blackbody-radiation](blackbody-radiation.md), [radiative-corrections-lamb-shift-g-minus-2](radiative-corrections-lamb-shift-g-minus-2.md), [casimir-effect](casimir-effect.md) | Entropy and temperature mapping, ensemble measures, radiation Gate C, continuum excess, regularization, mode sums, boundary-sensitive vacuum or medium response. |
| Quantum phase and oscillation | [double-slit-mach-zehnder](double-slit-mach-zehnder.md), [aharonov-bohm-effect](aharonov-bohm-effect.md), [neutrino-oscillations](neutrino-oscillations.md) | Path-history phase, gauge-like holonomy, internal-state rotation, basin-measure closure. |
| Spin, measurement, and Bell | [malus-law](malus-law.md), [stern-gerlach](stern-gerlach.md), [bell-test-violations](bell-test-violations.md) | Photon-analyzer response, ordered-frame spinor closure, detector response, pair provenance, no-signaling, Tsirelson-compatible correlations. |
| Topological and statistical emergence | [quantum-hall-effect](quantum-hall-effect.md), [brownian-motion](brownian-motion.md) | Robust invariants, transport coefficients, fluctuation-dissipation, micro-to-macro coarse graining. |
| Collider reconstruction provenance | CERN Academic Training detector lectures; CERN Yellow Reports LHC Run-2, flavor, neutrino, cosmology/dark matter, and Higgs records; ATLAS/CMS reconstruction notes | Object reconstruction, missing transverse momentum, heavy-flavor tagging, boosted substructure, invisible-channel limits, and statistical fit conventions remain observer evidence tied to event-ledger closure. |

## Shared Closure Record

The cross-theory mapping cases should be promoted only when their benchmark variables can be expressed through a shared closure record

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
| Redshift and cosmology | [cosmology-closure](../cosmology-closure/cosmology-closure.md), [validation-gates](../validation-gates/validation-gates.md) | Redshift, clock, CMB, supernova, BAO, and $H(z)$ records consume the same Noether sea variables without tired-light image or time-dilation failure. |
| Lorentz, Sagnac, and Fizeau | [swarm](../swarm/swarm.md), [master-equation-closure](../master-equation-closure/master-equation-closure.md) | Two-way light speed, time dilation, length contraction, rotation, and moving-medium transport recover observer-level formulas while bounding preferred-frame leakage. |
| Weak-field metric | [validation-gates](../validation-gates/validation-gates.md), [mass-map](../mass-map/mass-map.md) | One $\mathcal{M}_{\mathrm{sea}}^{ab}$ maps to redshift, Shapiro delay, lensing, precession, and PPN coefficients. |
| Radiation and gravitational waves | [Radiation](../../../content/markdown/aaa/reactions/radiation.md), [strong-field-closure](../strong-field-closure/strong-field-closure.md) | Energy, momentum, angular momentum, recoil, medium updates, and waveform phase close in one event-ledger grammar. |
| Quantum phase, spin, and Bell | [quantum-closure](../quantum-closure/quantum-closure.md), [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md) | Phase, spin, photon-analyzer response, detector basins, Born weights, no-signaling, and Bell correlations derive from path history and measure closure rather than postulated probabilities. |
| Topological and statistical emergence | [validation-gates](../validation-gates/validation-gates.md), [mass-map](../mass-map/mass-map.md) | Robust integer/fractional invariants and fluctuation-dissipation limits emerge from stable basins and transport maps. |
| Collider reconstruction provenance | [standard-model-closure](../standard-model-closure/standard-model-closure.md), [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md), [validation-gates](../validation-gates/validation-gates.md) | Reconstructed objects, missing transverse momentum, heavy-flavor tags, boosted substructure, fiducial cross sections, and upper limits are compared as observer-level projections of one event-ledger and detector-response record. |

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

- [validation-gates](../validation-gates/validation-gates.md)
- [swarm](../swarm/swarm.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [mass-map](../mass-map/mass-map.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)
- [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md)
- [cosmology-closure](../cosmology-closure/cosmology-closure.md)
- [strong-field-closure](../strong-field-closure/strong-field-closure.md)
