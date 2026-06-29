# EQ-12A Retained Action-Period Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-12 Through EQ-16A Photon, Quantum, Gauge, And Neutrino Packet](eq-12-16a-photon-quantum-gauge-neutrino-packet.md)
- Dedicated source runner: [constant-delay-retained-orbit-certificate.mjs](../../../scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs)
- Shared source runner: [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs)
- Row served: `EQ-12A`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It keeps the retained action-period carrier distinct from `theta_gamma_packet`. The photon packet can support photon/action consumers, but it cannot derive $h_\vartheta$ or satisfy the retained action-period row by itself.

No score changes.

## Equation Attack Card

| Field | Recommendation |
| --- | --- |
| Row | `EQ-12A` |
| Current score | `2` |
| Carrier | Retained action-period carrier: $\gamma_0\to\mathcal U\to h_\vartheta$, refined by locked equal-frequency `S_eq` tri-binary evidence. |
| Distinct support | `theta_gamma_packet` remains photon support, not the action-period carrier. |
| Exact first blocker | `missing_accepted_retained_orbit_reduction_row` |
| Shared photon-support blocker | `missing_accepted_theta_gamma_packet` |
| Smallest accepted evidence object | One source-backed retained equal-frequency tri-binary branch with integer winding plateau, same-branch four-readout coincidence, and positive Floquet margin. |
| Accepted-evidence condition | Accepted retained rows, durable source paths, no `attempt` row identities, no carrier split, and no hidden retune. |

## Smallest Accepted-Object Contract

Use one accepted retained action-period carrier with a `commonCarrierId` distinct from any `theta_gamma_packet` id.

| Field group | Required content |
| --- | --- |
| Branch identity | Accepted `S_eq` retained branch id, finite window `W`, durable `sourcePath`, non-`attempt` row ids. |
| Equal-frequency row | $(f_1,f_2,f_3)=(f,f,f)$ and $\omega_1=\omega_2=\omega_3=\omega_f$ on the same branch. |
| Role assignment | Source-backed middle-binary role plus speed pinning $s_M=\rho_M\omega_f=c_f$; no post hoc role label unless the source certifies it. |
| Return map | Finite-memory return map, declared neutral symmetry quotient, exactly one time-shift unit multiplier, positive non-symmetry Floquet margin. |
| Winding plateau | Sweep parameter `K`, plateau interval, integer winding $n(K)$ constant inside, and readout splitting at boundary. |
| Four readouts | $h_E=E_\gamma/\nu$, $h_\Phi=\int p\,dq$, $h_p=2\pi |p|/|k|$, and $h_J=2\pi J/n$, all equal inside the plateau. |
| Source discipline | Source-backed row map into `retained_orbit_reduction_row`, `monodromy_floquet_certificate`, `poincare_cartan_orbit_integral_row`, `energy_clock_readout_row`, `phase_loop_area_readout_row`, `geometry_derived_action_period_row`, `source_provenance`, and `no_hidden_retune_witness`. |
| Photon support | Optional consumer link to accepted `theta_gamma_packet`; never a substitute for the action carrier. |

Accepted-looking `retained_orbit_reduction_row` rows must also declare explicit support metadata for `EQ-12A`, `retained_orbit_reduction_row`, the retained action-period carrier, and the `S_eq` equal-frequency tri-binary route. A durable file path is not enough by itself.

Accepted-looking `constant_delay_self_hit_model_row` rows must likewise declare explicit support metadata for `EQ-12A`, `constant_delay_self_hit_model_row`, the retained action-period carrier, the constant-delay self-hit model, the finite-memory return map, and the `S_eq` equal-frequency tri-binary route. This keeps the source object from smuggling in a generic delay equation or a durable-but-unbound source path.

## Direct Geometry Layer

This layer keeps $h_\vartheta$ as a retained action-period readout from one same-branch orbit certificate. It does not let photon energy, alpha fitting, thermal rows, or a `theta_gamma_packet` substitute for the retained action-period carrier.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $E=h\nu$ and $h_E=E_\gamma/\nu$ | Energy-clock action-period readout from the retained branch, optionally consumed by photon rows. | `retained_orbit_reduction_row`, `energy_clock_readout_row`, `history_energy_throughput_row` | One retained `S_eq` branch id, finite window, and common carrier bind $E_\gamma$, $\nu$, and energy-throughput rows. | Photon-support controls reject `theta_gamma_packet` as the action carrier. | Accepted retained-orbit reduction row plus accepted energy-clock readout on the same branch. |
| $\mathbf p=\hbar\mathbf k$ and $h_p=2\pi |p|/|k|$ | Momentum-wavevector action-period readout from the same retained branch geometry. | `geometry_derived_action_period_row`, `readout_refinement_independence_row` | Momentum and wavevector readouts share the same branch identity, refinement path, and common action period. | `carrier_split` and `action_readout_projection_artifact` reject action integrals taken from a different return section or branch. | Accepted geometry-derived action-period row with refinement-independence evidence. |
| $\oint p\,dq=nh$ and $h_\Phi=\int p\,dq$ | Poincare-Cartan orbit-integral readout on the finite-memory return map. | `poincare_cartan_orbit_integral_row`, `poincare_section_reduction_row` | The orbit integral, section reduction, and branch period use one Poincare section and one retained orbit. | `carrier_split` and `action_readout_projection_artifact` reject action integrals taken from a different return section or branch. | Accepted Poincare-Cartan row plus Poincare-section reduction row. |
| Equal-frequency tri-binary $(f_1,f_2,f_3)=(f,f,f)$ | Same-branch retained reduction and locked equal-frequency support for the action-period carrier. | `retained_orbit_reduction_row`, `constant_delay_self_hit_model_row`, `hopf_retained_orbit_birth_row` | Equal-frequency identity, retained reduction, constant-delay self-hit model, and Hopf birth row share one `S_eq` branch id. | [constant-delay-retained-orbit-retained-reduction-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-retained-reduction-metadata-missing-negative-control.v1.json) and [constant-delay-retained-orbit-self-hit-model-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-self-hit-model-metadata-missing-negative-control.v1.json) reject durable source paths without `EQ-12A`, row, carrier, and `S_eq` support metadata. | Accepted retained-reduction row with explicit `S_eq` equal-frequency support metadata. |
| Monodromy, one time-shift unit multiplier, and positive Floquet margin | Stability and neutral-symmetry quotient readout for the retained orbit. | `monodromy_floquet_certificate`, `first_lyapunov_coefficient_row`, `non_resonance_certificate` | Monodromy, Floquet margin, first Lyapunov coefficient, and non-resonance certificate share one orbit and parameter point. | `floquet_extra_neutral_multiplier`, `hopf_degeneracy_bautin`, and `small_divisor_resonance` reject zero or negative Floquet margin or resonance-collapsed action periods. | Accepted monodromy/Floquet certificate plus first-Lyapunov and non-resonance rows. |
| Winding plateau and $h_J=2\pi J/n$ | Integer winding and angular-action readout over a stable sweep interval. | `parameter_sweep_action_invariance_row`, `geometry_derived_action_period_row` | Sweep parameter, plateau interval, integer winding, and angular readout stay on the same branch and carrier. | `parameter_sweep_fitted_action` rejects moving or mu-dependent action periods. | Accepted sweep-invariance row plus accepted geometry-derived action-period row. |
| $\mathcal S_{\mathrm{retune}}$ and source discipline | No-hidden-retune witness for all four action readouts and retained branch rows. | all required rows, source provenance, and no-hidden-retune witness | Every row uses durable non-priority evidence, non-`attempt` identities, one common carrier, and one retained branch. | [constant-delay-retained-orbit-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-coordination-source-negative-control.v1.json), [constant-delay-retained-orbit-retained-reduction-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-retained-reduction-metadata-missing-negative-control.v1.json), and [constant-delay-retained-orbit-self-hit-model-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-self-hit-model-metadata-missing-negative-control.v1.json) reject priority packets, source maps, attempt/probe files, and durable paths without `EQ-12A` row-support metadata. | A retained action-period packet whose required rows are accepted, source-backed, same-branch bound, and checker consumable. |

## Fail-Closed Control

Use `mu_dependent_action_period`: extracted action periods such as `[1, 1.01, 1]` must fail `period_uniqueness_residual_failed` or the equivalent Planck/alpha no-hidden-retune path. This protects the rule that $h_\vartheta$ is geometry-derived and locally constant on the accepted branch, not fitted from alpha, thermal, or photon observations.

## Coordination-Source Negative Control

The retained action-period source-evidence guard is [constant-delay-retained-orbit-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-coordination-source-negative-control.v1.json):

```sh
node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs --input scripts/equation-mapping/constant-delay-retained-orbit-coordination-source-negative-control.v1.json --summary --pretty
```

This control marks every required retained action-period row as accepted-looking while pointing each `sourcePath` back to this priority packet. The intended result is `status: blocked_missing_rows`, `nextBlocker: missing_accepted_retained_orbit_reduction_row`, and row reason `accepted_without_evidence_source`. A source-field map can name the retained action-period contract and carry attempt arithmetic, but it cannot satisfy accepted retained evidence.

The retained-reduction metadata-missing control is [constant-delay-retained-orbit-retained-reduction-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-retained-reduction-metadata-missing-negative-control.v1.json):

```sh
node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs --input scripts/equation-mapping/constant-delay-retained-orbit-retained-reduction-metadata-missing-negative-control.v1.json --summary --pretty
```

This control marks only `retained_orbit_reduction_row` accepted-looking, points it at a durable file, and omits the required retained-orbit support metadata. The expected result is `status: blocked_missing_rows`, `nextBlocker: missing_accepted_retained_orbit_reduction_row`, and `rowStatuses.retained_orbit_reduction_row.reason=retained_orbit_reduction_source_contract_mismatch`. The same command with `--require-populated` must exit nonzero.

## Retained `S_eq` Source-Attempt Fixture

The score-neutral source-attempt fixture is [eq12a-retained-action-period-source-attempt.v1.json](../../../scripts/equation-mapping/eq12a-retained-action-period-source-attempt.v1.json):

```sh
node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs --input scripts/equation-mapping/eq12a-retained-action-period-source-attempt.v1.json --summary --pretty
node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs --input scripts/equation-mapping/eq12a-retained-action-period-source-attempt.v1.json --summary --pretty --require-populated
```

The fixture names the retained `S_eq` branch identity, finite window, equal-frequency tri-binary support, winding plateau, positive Floquet margin, four action readouts, and no-hidden-retune witness target. Every required checker row remains `attempt`, so the expected result is `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_retained_orbit_reduction_row`. The `--require-populated` form must exit nonzero until accepted retained rows with durable evidence sources exist.

The one-row retained-reduction source-evidence probe is [constant-delay-retained-orbit-retained-reduction-source-evidence-probe.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-retained-reduction-source-evidence-probe.v1.json):

```sh
node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs --input scripts/equation-mapping/constant-delay-retained-orbit-retained-reduction-source-evidence-probe.v1.json --summary --pretty
```

The probe marks only `retained_orbit_reduction_row` accepted-looking with explicit `EQ-12A`, `retained_orbit_reduction_row`, retained action-period carrier, and `S_eq` equal-frequency support metadata. It remains score-neutral and advances only to `nextBlocker: missing_accepted_constant_delay_self_hit_model_row`; the `--require-populated` form must exit nonzero.

The two-row constant-delay self-hit source-evidence probe is [constant-delay-retained-orbit-self-hit-model-source-evidence-probe.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-self-hit-model-source-evidence-probe.v1.json):

```sh
node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs --input scripts/equation-mapping/constant-delay-retained-orbit-self-hit-model-source-evidence-probe.v1.json --summary --pretty
```

This probe marks both `retained_orbit_reduction_row` and `constant_delay_self_hit_model_row` accepted-looking with explicit retained action-period support metadata. It remains score-neutral and advances only to `nextBlocker: missing_accepted_hopf_retained_orbit_birth_row`; the `--require-populated` form must exit nonzero.

The constant-delay self-hit metadata-missing control is [constant-delay-retained-orbit-self-hit-model-metadata-missing-negative-control.v1.json](../../../scripts/equation-mapping/constant-delay-retained-orbit-self-hit-model-metadata-missing-negative-control.v1.json):

```sh
node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs --input scripts/equation-mapping/constant-delay-retained-orbit-self-hit-model-metadata-missing-negative-control.v1.json --summary --pretty
```

This control marks `constant_delay_self_hit_model_row` accepted-looking and points it at a durable file, but omits the required row support metadata. The expected result is `status: blocked_missing_rows`, `nextBlocker: missing_accepted_constant_delay_self_hit_model_row`, and `rowStatuses.constant_delay_self_hit_model_row.reason=constant_delay_self_hit_model_source_contract_mismatch`.

## Next Action

Create one durable source-backed retained action-period object, then run:

```sh
node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs --summary --pretty
node scripts/equation-mapping/planck-alpha-braid-residual.mjs --summary --pretty
```

Until accepted retained rows exist beyond the two-row constant-delay self-hit probe, the correct dedicated blocker is `missing_accepted_hopf_retained_orbit_birth_row`, with no score change.
