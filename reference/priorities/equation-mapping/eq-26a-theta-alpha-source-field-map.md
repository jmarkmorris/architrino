# EQ-26A Theta-Alpha Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parents:
  - [EQ-12 Theta-Gamma Packet Source Shell](eq-12-theta-gamma-packet-source-shell.md)
  - [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source runner: [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs)
- Source fixture: [planck-alpha-braid-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json)
- Source-attempt fixture: [planck-alpha-braid-theta-alpha-source-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-theta-alpha-source-attempt.v1.json)
- Coordination-source negative control: [planck-alpha-braid-theta-gamma-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-theta-gamma-coordination-source-negative-control.v1.json)
- Review synthesis: [Planck Action Period, Blackbody, and Fine-Structure Coupling](../../research-office/research-lead/review-packets/planck-action-period-blackbody-alpha-reconciliation-2026-07-29.md)
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
| Primary $\mathbb{A}\mathbb{A}\mathbb{A}$ carrier | $\Theta_\alpha=(q_{\mathrm{obs}},h_\vartheta,c_\gamma,\mathcal E_S,\mathcal K_{\mathrm{EM}},I_\mu)$ with fixed action period, charge exposure, photon speed, gauge domain, and Noether sea state across low-energy, atomic, and running anchors. |
| Smallest accepted evidence object | One accepted source-backed `theta_alpha` packet rooted in a scheme-pinned `charge_exposure_row`, then `alpha_coupling_row`, photon speed, gauge covariance, threshold inventory, running row, source provenance, and no-hidden-retune rows. |
| Exact first blocker | Parent: `missing_accepted_theta_gamma_packet`; current checker-order alpha child: `missing_accepted_alpha_coupling_row`; source-field first row: `missing_accepted_charge_exposure_row`. |
| Existing scripts/fixtures/packets found | The Planck/alpha runner and fixture listed above; [EQ-16 Weak-Visible Branch Ledger Source-Field Map](eq-16-weak-visible-branch-ledger-source-field-map.md); `EQ-26` hydrogen source-field route. |
| Candidate breakthrough angle | Reuse the `EQ-16` weak-visible exposure-domain contract as a source clue, not a substitute. Pin $q_{\mathrm{obs}}$, place scale dependence in $\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}})$ and $I_\mu$, and let the single-period $h_\vartheta$ test catch circular alpha-fitting. |
| Negative control required for advancement | `eq26a.alpha_hidden_retune`: changing $h_\vartheta$, $c_\gamma$, charge exposure, gauge domain, or Noether sea state between anchors must fail. |
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

The source-attempt fixture names the first local alpha surface without claiming
accepted evidence:

| Field | Source-attempt value |
| --- | --- |
| `commonCarrierId` | `theta_alpha_source_attempt_0001` |
| `chargeExposureRowId` | `charge_exposure_row_theta_alpha_source_attempt_row` |
| `alphaCouplingRowId` | `alpha_coupling_row_theta_alpha_source_attempt_row` |
| `localPhotonSpeedRowId` | `local_photon_speed_row_theta_alpha_source_attempt_row` |
| `wakeDressingRowId` | `vacuum_polarization_wake_dressing_row_theta_alpha_source_attempt_row` |
| `runningRowId` | `energy_scale_running_row_theta_alpha_source_attempt_row` |
| `chargedThresholdInventoryId` | `I_mu_theta_alpha_source_attempt_0001` |
| `expectedFirstBlocker` | `missing_accepted_theta_gamma_packet` |
| `localFirstChildBlocker` | `missing_accepted_charge_exposure_row` |

Checker-contract finding: [planck-alpha-braid-theta-alpha-source-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-theta-alpha-source-attempt.v1.json) already exercises this contract. The current run is score-neutral: it reports `status=blocked_missing_rows`, `nextBlocker=missing_accepted_theta_gamma_packet`, `scoreDecision=no_score_increase`, `alphaRunningPass=true`, and `15/15` negative controls passing. The local charge exposure, alpha coupling, wake/dressing, running, source-provenance, and no-hidden-retune rows remain `attempt`, so no score change follows from the alpha arithmetic or the source-attempt shape.

## Source-Mined Alpha Anchors

PBS Space Time's 2022 fine-structure overview is useful as a source lead, not
accepted retained evidence. It packages the same external constraints that
`EQ-26A` must keep bound to one carrier: low-energy
$\alpha(0)\approx 1/137.035999$ ([03:41]-[03:45]), spectral fine-structure
splitting ([02:21]-[03:15]), the Coulomb-to-photon energy ratio ([03:54]-[04:17]),
the Bohr ground-state speed ratio $v/c\sim\alpha$ ([04:17]-[04:22]), the hydrogen
binding-to-rest-energy scale $\sim\alpha^2$ ([04:26]-[04:34]), electromagnetic
coupling language ([05:14]-[06:46]), and energy-scale running ([07:00]-[07:40]).
The equation-mapping use is a multi-anchor consistency check: all of these
readouts may consume the same $\Theta_\alpha^{(\mu,W)}$ only if
$q_{\mathrm{obs}}$, $h_\vartheta$, $c_\gamma$, the gauge domain, and
$\theta_{\mathrm{sea}}$ remain fixed while scale dependence is routed through
$\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}})$ and $I_\mu$.

Disposition: priority-only source lead; no score change. The source does not
supply accepted retained evidence for `charge_exposure_row`,
`alpha_coupling_row`, or `theta_gamma_packet`, and its anthropic/multiverse
speculation ([08:33]-[09:08]) is ignored for equation mapping.

## Direct Geometry Layer

This layer keeps $\alpha(\mu)$ as a same-domain electromagnetic exposure readout. It does not allow fixed alpha fitting, action-period inversion, or scale running detached from charge exposure and the photon/action parent chain.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Negative control required for advancement | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Parent $\Theta_\gamma$ and retained action period | Photon/action support supplying fixed $h_\vartheta$ and $c_\gamma$ to the coupling row. | `theta_gamma_packet`, `retained_orbit_reduction_row`, `geometry_derived_action_period_row`, `local_photon_speed_row` | Photon packet, retained action period, local photon speed, and alpha carrier use one parent support chain. | Theta-gamma source controls reject priority packets, attempt fixtures, and probe files as parent evidence. | Accepted `theta_gamma_packet` plus retained action-period and photon-speed rows. |
| $q_{\mathrm{obs}}$ and electromagnetic exposure domain | Scheme-pinned charge-exposure readout before alpha is interpreted. | `charge_exposure_row`, `planck_braid_carrier`, `source_provenance` | Charge exposure, scheme, gauge domain, source provenance, and carrier id stay fixed across all anchors. | `eq26a.alpha_hidden_retune` rejects changing charge exposure or domain between anchors. | Accepted `theta_alpha` packet rooted in accepted `charge_exposure_row`. |
| $\alpha=e^2/(4\pi\epsilon_0\hbar c_\gamma)$ | Low-energy coupling readout from charge exposure, action period, and photon speed. | `alpha_coupling_row`, `charge_exposure_row`, `local_photon_speed_row`, `geometry_derived_action_period_row` | Alpha row consumes the same $q_{\mathrm{obs}}$, $h_\vartheta$, $c_\gamma$, gauge domain, and Noether sea state. | `eq26a.alpha_fitted_action_period` rejects deriving $h_\vartheta$ by inverting observed alpha. | Accepted alpha-coupling row bound to accepted charge, action, and photon-speed rows. |
| Threshold inventory $I_\mu$ | Charged-particle threshold readout for the declared running interval. | `energy_scale_running_row`, `vacuum_polarization_wake_dressing_row`, `source_provenance` | Scale anchors, charged thresholds, wake/dressing response, and source provenance share one exposure domain. | `scale_independent_alpha` rejects frozen coupling when threshold/wake response is declared. | Accepted running row plus accepted threshold/wake-dressing row. |
| $\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}})$ | Noether sea wake/dressing contribution to electromagnetic coupling response. | `vacuum_polarization_wake_dressing_row`, `sea_state_fibration_row`, `no_hidden_retune_witness` | Wake/dressing, sea-state fibration, gauge covariance, and retune witness stay on one carrier. | Hidden-retune controls reject moving scale dependence into $h_\vartheta$, $c_\gamma$, or private sea-state rows. | Accepted wake/dressing row with accepted sea-state fibration and retune witness. |
| $\mathcal S_{\mathrm{retune}}$ across anchors | Same-record witness across low-energy, atomic, and running alpha anchors. | `no_hidden_retune_witness`, all `theta_alpha` child rows | Every child row cites the same carrier id, source path, scheme, domain, action-period support, and photon-speed support. | Source controls reject priority/source-map prose as accepted charge, alpha, or running evidence. | A source-backed $\Theta_\alpha^{(\mu,W)}$ packet whose child rows are accepted, same-domain bound, and checker consumable. |

## Verification Required for Advancement Controls

- `eq26a.alpha_hidden_retune`: catches hidden changes to $h_\vartheta$, $c_\gamma$, charge exposure, gauge domain, or Noether sea state between anchors.
- `eq26a.alpha_fitted_action_period`: catches extracting $h_\vartheta$ by inverting observed $\alpha$ instead of deriving it from the retained action-period carrier.
- `scale_independent_alpha`: catches a frozen coupling where the declared running interval requires threshold/wake response.

## Next Action

Create one durable `theta_alpha` source report beginning with `charge_exposure_row`, then run:

```sh
node scripts/equation-mapping/planck-alpha-braid-residual.mjs --summary --pretty
```

To check the current source-attempt fixture, run:

```sh
node scripts/equation-mapping/planck-alpha-braid-residual.mjs --input scripts/equation-mapping/planck-alpha-braid-theta-alpha-source-attempt.v1.json --summary --pretty
```

Expected result: `blocked_missing_rows`, `nextBlocker=missing_accepted_theta_gamma_packet`,
`scoreDecision=no_score_increase`, `alphaRunningPass=true`, and all 15 negative controls
passing. The same command with `--require-populated` must exit nonzero.

Until parent photon/action support and local charge/coupling rows are accepted, the correct result remains no score change.

The shared Planck/alpha runner now rejects priority packets, authored AAA prose,
generated files, attempt files, toy files, probe files, source-evidence-probe
files, mock files, negative-control files, and temporary paths as accepted
retained evidence. The coordination-source control marks `theta_gamma_packet`
accepted-looking while sourcing it only to the theta-gamma priority packet; it
must remain blocked at `missing_accepted_theta_gamma_packet` with the row reason
`source_not_durable`. The sibling probe-source control points the same
accepted-looking parent at a `source-evidence-probe` JSON and must fail the same
way. Probe files can sharpen blockers, but they cannot be the retained source
object for $\Theta_\gamma$.
