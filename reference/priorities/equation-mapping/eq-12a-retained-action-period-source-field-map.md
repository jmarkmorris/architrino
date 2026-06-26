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

## Fail-Closed Control

Use `mu_dependent_action_period`: extracted action periods such as `[1, 1.01, 1]` must fail `period_uniqueness_residual_failed` or the equivalent Planck/alpha no-hidden-retune path. This protects the rule that $h_\vartheta$ is geometry-derived and locally constant on the accepted branch, not fitted from alpha, thermal, or photon observations.

## Next Action

Create one durable source-backed retained action-period object, then run:

```sh
node scripts/equation-mapping/constant-delay-retained-orbit-certificate.mjs --summary --pretty
node scripts/equation-mapping/planck-alpha-braid-residual.mjs --summary --pretty
```

Until accepted retained rows exist, the correct dedicated blocker remains `missing_accepted_retained_orbit_reduction_row`.
