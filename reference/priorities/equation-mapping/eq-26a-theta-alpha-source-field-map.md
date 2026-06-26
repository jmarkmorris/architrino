# EQ-26A Theta-Alpha Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parents:
  - [EQ-12 Theta-Gamma Packet Source Shell](eq-12-theta-gamma-packet-source-shell.md)
  - [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source runner: [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs)
- Source fixture: [planck-alpha-braid-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json)
- Rows served: `EQ-26A`, with support from `EQ-12A`, `EQ-16`, and `EQ-26`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows the local `EQ-26A` child route under the shared `theta_gamma_packet` and retained action-period parent. The checker currently blocks first at `missing_accepted_theta_gamma_packet`; after parent photon/action support exists, the source-field route should begin by pinning `charge_exposure_row`, because an `alpha_coupling_row` is meaningful only after $q_{\mathrm{obs}}$ is scheme-pinned.

Findability note: QFT ultraviolet divergence or renormalization belongs here only as a scale-dependent coupling, exposure, threshold-inventory, or wake-dressing benchmark. It is not the Planck blackbody ultraviolet catastrophe handled by `EQ-22A`.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-26A` |
| Current score and closure driver | Score `2`; derive $\alpha(\mu)$ as a scale-dependent coupling projection from one electromagnetic exposure domain rather than a fixed fitted constant. |
| Primary AAA carrier | $\Theta_\alpha=(q_{\mathrm{obs}},h_\vartheta,c_\gamma,\mathcal E_S,\mathcal K_{\mathrm{EM}},I_\mu)$ with fixed action period, charge exposure, photon speed, gauge domain, and Noether sea state across low-energy, atomic, and running anchors. |
| Smallest score-moving evidence object | One accepted source-backed `theta_alpha` packet rooted in a scheme-pinned `charge_exposure_row`, then `alpha_coupling_row`, photon speed, gauge covariance, threshold inventory, running row, source provenance, and no-hidden-retune rows. |
| Exact first blocker | Parent: `missing_accepted_theta_gamma_packet`; current checker-order alpha child: `missing_accepted_alpha_coupling_row`; source-field first row: `missing_accepted_charge_exposure_row`. |
| Existing scripts/fixtures/packets found | The Planck/alpha runner and fixture listed above; [EQ-16 Weak-Visible Branch Ledger Source-Field Map](eq-16-weak-visible-branch-ledger-source-field-map.md); `EQ-26` hydrogen source-field route. |
| Candidate breakthrough angle | Reuse the `EQ-16` weak-visible exposure-domain contract as a source clue, not a substitute. Pin $q_{\mathrm{obs}}$, place scale dependence in $\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}})$ and $I_\mu$, and let the single-period $h_\vartheta$ test catch circular alpha-fitting. |
| Fail-closed negative control | `eq26a.alpha_hidden_retune`: changing $h_\vartheta$, $c_\gamma$, charge exposure, gauge domain, or Noether sea state between anchors must fail. |
| Smaller next action | Create a `theta_alpha` source report that starts with `charge_exposure_row`, declares the $q_{\mathrm{obs}}$ scheme, and binds `alpha_coupling_row`, `vacuum_polarization_wake_dressing_row`, and `energy_scale_running_row`. |

## Accepted-Object Contract

The smallest useful object is:

$$
\Theta_\alpha^{(\mu,W)}
=
\left(
q_{\mathrm{obs}},
h_\vartheta,
c_\gamma,
\mathcal E_S,
\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}}),
I_\mu,
\mathcal R_{\alpha},
\mathcal S_{\mathrm{retune}}
\right).
$$

Required rows:

| Row | Minimum source-field content |
| --- | --- |
| `charge_exposure_row` | Scheme-pinned $q_{\mathrm{obs}}$, exposure domain, durable source path, and relation to the weak-visible/gauge exposure domain. |
| `alpha_coupling_row` | Low-energy coupling readout using the same $q_{\mathrm{obs}}$, $h_\vartheta$, $c_\gamma$, and $\theta_{\mathrm{sea}}$. |
| `local_photon_speed_row` | Photon-channel speed row shared with photon and atomic consumers. |
| `gauge_covariance_row` | Gauge-domain covariance witness; no change to the physical branch ledger. |
| `charged_threshold_inventory` | Charged-particle threshold inventory $I_\mu$ for the running interval. |
| `vacuum_polarization_wake_dressing_row` | Wake/dressing contribution carried by $\mathcal K_{\mathrm{EM}}$, not by retuning $h_\vartheta$. |
| `energy_scale_running_row` | Running $\alpha(\mu)$ readout with declared scale anchors. |
| `source_provenance`, `no_hidden_retune_witness` | Same $h_\vartheta$, $c_\gamma$, charge exposure, gauge domain, and Noether sea state across low-energy, atomic, and running anchors. |

## Fail-Closed Controls

- `eq26a.alpha_hidden_retune`: catches hidden changes to $h_\vartheta$, $c_\gamma$, charge exposure, gauge domain, or Noether sea state between anchors.
- `eq26a.alpha_fitted_action_period`: catches extracting $h_\vartheta$ by inverting observed $\alpha$ instead of deriving it from the retained action-period carrier.
- `scale_independent_alpha`: catches a frozen coupling where the declared running interval requires threshold/wake response.

## Next Action

Create one durable `theta_alpha` source report beginning with `charge_exposure_row`, then run:

```sh
node scripts/equation-mapping/planck-alpha-braid-residual.mjs --summary --pretty
```

Until parent photon/action support and local charge/coupling rows are accepted, the correct result remains no score movement.
