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
| Dedicated checker first blocker | `missing_accepted_retained_orbit_reduction_row` |
| Shared photon-support blocker | `missing_accepted_theta_gamma_packet` |
| Positive evidence object | One source-backed retained equal-frequency tri-binary branch with integer winding plateau, same-branch four-readout coincidence, and positive Floquet margin. |
| Score-moving condition | Accepted retained rows, durable source paths, no `attempt` row identities, no carrier split, and no hidden retune. |

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

## Next Action

Create one durable source-backed retained action-period object, then run:

```sh
node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs --summary --pretty
node scripts/equation-mapping/planck-alpha-braid-residual.mjs --summary --pretty
```

Until accepted retained rows exist beyond the retained-reduction probe, the correct dedicated blocker is `missing_accepted_constant_delay_self_hit_model_row`, with no score change.
