# EQ-26A Theta-Alpha Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parents:
  - [EQ-12 Theta-Gamma Packet Source Shell](eq-12-theta-gamma-packet-source-shell.md)
  - [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source runner: [planck-alpha-braid-residual.mjs](../../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs)
- Source fixture: [planck-alpha-braid-attempt.v1.json](../../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json)
- Source-attempt fixture: [planck-alpha-braid-theta-alpha-source-attempt.v1.json](../../../../scripts/equation-mapping/planck-alpha-braid-theta-alpha-source-attempt.v1.json)
- Coordination-source negative control: [planck-alpha-braid-theta-gamma-coordination-source-negative-control.v1.json](../../../../scripts/equation-mapping/planck-alpha-braid-theta-gamma-coordination-source-negative-control.v1.json)
- Review synthesis: [Planck Action Period, Blackbody, and Fine-Structure Coupling](../../../research-office/research-history/review-packets/planck-action-period-blackbody-alpha-reconciliation-2026-07-29.md)
- Integration map: [Fine-Structure Coupling Map](../../mapping-electromagnetism/analysis/fine-structure.md)
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

## Mathematical Contract Ownership

The [Fine-Structure Coupling Map](../../mapping-electromagnetism/analysis/fine-structure.md) owns the mathematical factorization, shared carrier, required-row semantics, benchmark ladder, Direct Geometry and Evidence Map, and multi-anchor falsifier. This file retains the exact source-attempt field ids, checker contract, blocker order, and `EQ-26A` advancement controls.

The source-attempt fixture names the first local alpha surface without claiming accepted evidence:

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

Plainly: these ids describe the present attempt surface and expected blocker. They do not mark any row accepted or supply the source evidence themselves.

Checker-contract finding: [planck-alpha-braid-theta-alpha-source-attempt.v1.json](../../../../scripts/equation-mapping/planck-alpha-braid-theta-alpha-source-attempt.v1.json) already exercises this contract. The current run is score-neutral: it reports `status=blocked_missing_rows`, `nextBlocker=missing_accepted_theta_gamma_packet`, `scoreDecision=no_score_increase`, `alphaRunningPass=true`, and `15/15` negative controls passing. The local charge exposure, alpha coupling, wake/dressing, running, source-provenance, and no-hidden-retune rows remain `attempt`, so no score change follows from the alpha arithmetic or the source-attempt shape.

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

Expected result: `blocked_missing_rows`, `nextBlocker=missing_accepted_theta_gamma_packet`, `scoreDecision=no_score_increase`, `alphaRunningPass=true`, and all 15 negative controls passing. The same command with `--require-populated` must exit nonzero.

Until parent photon/action support and local charge/coupling rows are accepted, the correct result remains no score change.

The shared Planck/alpha runner now rejects priority packets, authored AAA prose, generated files, attempt files, toy files, probe files, source-evidence-probe files, mock files, negative-control files, and temporary paths as accepted retained evidence. The coordination-source control marks `theta_gamma_packet` accepted-looking while sourcing it only to the theta-gamma priority packet; it must remain blocked at `missing_accepted_theta_gamma_packet` with the row reason `source_not_durable`. The sibling probe-source control points the same accepted-looking parent at a `source-evidence-probe` JSON and must fail the same way. Probe files can sharpen blockers, but they cannot be the retained source object for $\Theta_\gamma$.
