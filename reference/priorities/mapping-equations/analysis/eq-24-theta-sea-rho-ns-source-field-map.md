# EQ-24 Theta-Sea Rho-NS Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-06, EQ-24, And EQ-25 Continuum, Medium, And Thermodynamic Closure Packet](eq-06-24-25-continuum-medium-thermo-packet.md)
- Source runner: [noether-sea-density-compression-surface-slice.mjs](../../../../scripts/spacetime/noether-sea-density-compression-surface-slice.mjs)
- Source fixture: [noether-sea-density-compression-surface-slice-retained-attempt.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json)
- Accepted provider: [noether-sea-density-compression-provider.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-provider.v1.json)
- Provider-backed slice: [noether-sea-density-compression-provider-surface-slice.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-provider-surface-slice.v1.json)
- Downstream output projection: [noether-sea-density-compression-provider-output-projection.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-provider-output-projection.v1.json)
- Output-projection slice: [noether-sea-density-compression-provider-surface-slice-output-projection.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-provider-surface-slice-output-projection.v1.json)
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map now has one accepted non-priority provider object for the density-compression `theta_sea_rho_NS` row family. The priority packet remains coordination material and does not itself raise any equation score. The provider-backed surface slice is populated for the `EQ-24` density-compression coefficients. The downstream `EQ-20` route supplies a retained `delta_P_eff` pressure projection and accepted `theta_cos` handoff, while the output-projection slice now supplies accepted score-neutral `delta_N`, `delta_gamma_ij`, `delta_G_eff`, and `delta_a_star` rows from the same provider window. Growth, CMB, and broader low-acceleration consumers remain downstream.

The retained-attempt fixture already supplies the arithmetic shape of the density-compression slice, but every retained row remains attempt-level with `sourcePath=pending-retained-source`. Changing a status field, pointing a row back to this packet, or pointing a row back to the attempt fixture does not count as accepted evidence.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-24` |
| Current score and closure driver | Score `3`; acoustic, elastic, stress-strain, and medium equations must be derived as low-moment Noether sea response projections. |
| Primary AAA carrier | $\Theta_{\mathrm{sea}}^{(\ell,W)}$ for one retained density-compression window, with `theta_sea_rho_NS` as the first source-backed row. |
| Smallest accepted evidence object | [noether-sea-density-compression-provider.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-provider.v1.json), with accepted $\rho_{\text{NS}}$, $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, $\boldsymbol\theta_{\mathrm{sea}}$, $f_N$, event ledger, channel declaration, speed row, stress/strain row, causality row, correlation row, acoustic/elastic agreement row, refinement family, and zero-retune witness. |
| Exact first blocker | Provider-backed route: `nextBlocker=null` for the `EQ-24` density-compression slice. Output-projection route: `nextBlocker=null` for accepted `delta_N`, `delta_gamma_ij`, `delta_G_eff`, and `delta_a_star`. Retained-attempt and source-attempt routes still block at `missing_accepted_theta_sea_rho_NS`. Growth, CMB, and broader low-acceleration consumers remain downstream. |
| Existing scripts, fixtures, and packets found | The Noether sea density-compression surface-slice runner, retained-attempt fixture, accepted provider, provider-backed slice, provider-intake runner, and continuum-medium packet listed above. |
| Candidate breakthrough angle | `EQ-24` is the narrowest Noether sea coefficient discriminator because it can accept speed plus bulk stress/strain without first claiming metric, pressure, or low-acceleration outputs. The accepted `theta_sea_rho_NS` provider now gives `EQ-20`, `EQ-11`, `theta_W`, and `EQ-32` a concrete density carrier. `EQ-20` consumes it through a retained pressure projection report and accepted `theta_cos` handoff; the output-projection slice now supplies the weak-gravity and `delta_a_star` outputs without changing the provider. |
| Negative control required for advancement | A numerically agreeing acoustic/elastic row with pending, missing, directory, generated-reading-copy, temp, or self-referential source evidence must remain blocked even when $c_{X,\mathrm{disp}}^2$ and $C_{1111}^X/\rho_{\text{NS}}$ agree. |
| Smaller-than-report next action | Use the accepted provider-backed and output-projection slices as upstream carriers for growth, CMB, and broader low-acceleration no-retune consumers without changing the provider record. |

## Retained Fixture Inventory

The current retained-attempt fixture declares:

| Field | Fixture value |
| --- | --- |
| `windowId` | `theta-sea-density-compression-retained-0001` |
| `ell` | `ell_retained_attempt` |
| `channel.id` | `X_density_compression_acoustic_retained_0001` |
| `channel.type` | `acoustic` |
| `delta_ln_n` | `0.001` |
| `delta_c_X_squared` | `2.5` |
| `delta_C_ij_kl.bulk` | `1` |
| missing outputs | `delta_N`, `delta_gamma_ij`, `delta_G_eff`, `delta_P_eff`, `delta_a_star` |

The retained $\Theta_{\mathrm{sea}}$ rows are all attempt-level:

| Retained row | Row id | Source path | Event reference |
| --- | --- | --- | --- |
| `rho_NS` | `rho-NS-retained-0001` | `pending-retained-source` | `event-ledger-retained-0001` |
| `n` | `n-retained-0001` | `pending-retained-source` | `event-ledger-retained-0001` |
| `u_sea` | `u-sea-retained-0001` | `pending-retained-source` | `event-ledger-retained-0001` |
| `e_sea` | `e-sea-retained-0001` | `pending-retained-source` | `event-ledger-retained-0001` |
| `theta_sea` | `theta-sea-retained-0001` | `pending-retained-source` | `event-ledger-retained-0001` |
| `f_N` | `f-N-retained-0001` | `pending-retained-source` | `event-ledger-retained-0001` |
| `event_ledger_ref` | `event-ledger-retained-0001` | `pending-retained-source` | `eventId=event-ledger-retained-0001` |

The response rows are also attempt-level except for the metric output declaration:

| Response row | Row id | Current state |
| --- | --- | --- |
| `channel_declaration_row` | `channel-row-retained-0001` | attempt; binds `X_density_compression_acoustic_retained_0001` |
| `speed_row` | `speed-row-retained-0001` | attempt; outputs `delta_c_X_squared` |
| `stress_strain_row` | `stress-strain-row-retained-0001` | attempt; outputs `delta_C_ij_kl` |
| `causality_row` | `causality-row-retained-0001` | attempt; residual `0` |
| `correlation_row` | `correlation-row-retained-0001` | attempt; `sameWindow=true` |
| `metric_embedding_row` | `metric-embedding-row-retained-0001` | declared missing output `delta_gamma_ij` |

The acoustic/elastic agreement diagnostic is:

| Coordinate | Fixture value |
| --- | --- |
| `rowId` | `acoustic-elastic-agreement-retained-0001` |
| `windowId` | `theta-sea-density-compression-retained-0001` |
| `ell` | `ell_retained_attempt` |
| `channelId` | `X_density_compression_acoustic_retained_0001` |
| `responseKernelId` | `chi-AB-density-compression-retained-0001` |
| `speedRowId` | `speed-row-retained-0001` |
| `stressStrainRowId` | `stress-strain-row-retained-0001` |
| `rhoRowId` | `rho-NS-retained-0001` |
| `retuneWitnessId` | `retune-witness-retained-0001` |
| `c_X_disp_squared` | `2.5` |
| `C1111_X` | `2.49` |
| `rho_NS` | `1` |
| `epsilon_ref` | `0.02` |
| `refinementFamilyId` | `density-compression-refinement-family-retained-0001` |
| `sourcePath` | `pending-retained-source` |

The retune witness remains attempt-level:

| Field | Fixture value |
| --- | --- |
| `status` | `attempt` |
| `witnessId` | `retune-witness-retained-0001` |
| `residual` | `0` |
| `changedRows` | `[]` |

## Smallest Accepted Object

The smallest blocker-moving object is not the full metric or pressure recovery. It is the accepted source-backed `theta_sea_rho_NS` row on the same retained window:

$$
\rho_{\text{NS}}(\mathbf x,t)
=
\sum_{k\in\mathcal I_{\mathrm{sea}}}
m_{N,k}
W_\ell(\mathbf x-\mathbf X_k(t)),
$$

with a durable source file that identifies the retained Noether braid inventory, the smoothing window, the event ledger, and the refinement family. The accepted provider now supplies that row and anchors accepted $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, $\boldsymbol\theta_{\mathrm{sea}}$, and $f_N$ rows without splitting the carrier.

The accepted evidence bundle adds speed plus stress/strain from the same window:

$$
\left|
c_{X,\mathrm{disp}}^2
-
\frac{C_{1111}^{X}}{\rho_{\text{NS}}}
\right|
\le
\varepsilon_{\mathrm{ref}}(\ell),
$$

with $\varepsilon_{\mathrm{ref}}(\ell)$ tied to the declared refinement family. The current provider-backed density-compression slice reports this bundle as populated for `EQ-24` density-compression review; output rows still require their own accepted projection object.

## Accepted Provider Object

The current accepted provider is [noether-sea-density-compression-provider.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-provider.v1.json). It carries `schema=aaa-noether-sea-density-compression-provider/v1`, `providerStatus=accepted`, `authorization.acceptedProvider=true`, and `authorization.downstreamConsumerAuthorization=true`.

The provider binds one retained window:

| Field | Provider value |
| --- | --- |
| `windowId` | `theta-sea-density-compression-provider-0001` |
| `ell` | `ell_theta_sea_rho_ns_provider_0001` |
| `retainedInventoryId` | `noether-sea-retained-inventory-provider-0001` |
| `smoothingKernelId` | `W_ell_theta_sea_rho_ns_provider_0001` |
| `eventLedgerId` | `event-ledger-theta-sea-rho-ns-provider-0001` |
| `refinementFamilyId` | `density-compression-refinement-family-provider-0001` |

The accepted provider-backed surface slice is [noether-sea-density-compression-provider-surface-slice.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-provider-surface-slice.v1.json):

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-provider-surface-slice.v1.json --summary --pretty --require-populated
```

The expected result is `status=populated`, `nextBlocker=null`, no missing retained theta rows, no missing required response rows, and `consumerReadiness.EQ24_density_compression.readiness=ready_for_consumer_review`. Within the original density surface slice itself, the downstream outputs `delta_N`, `delta_gamma_ij`, `delta_G_eff`, `delta_P_eff`, and `delta_a_star` remain declared missing; that preserved route proves density-compression readiness does not silently imply downstream outputs.

The downstream output-projection slice is [noether-sea-density-compression-provider-surface-slice-output-projection.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-provider-surface-slice-output-projection.v1.json):

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-provider-surface-slice-output-projection.v1.json --summary --pretty --require-populated
```

The expected result is `status=populated`, `nextBlocker=null`, `outputProjectionEvidenceStatus=accepted`, accepted `delta_N`, `delta_gamma_ij`, `delta_G_eff`, and `delta_a_star` rows, `consumerReadiness.EQ11_weak_gravity.readiness=ready_for_consumer_review`, and `consumerReadiness.EQ32_low_acceleration.readiness=ready_for_consumer_review`. The separate `EQ-20` pressure report supplies a retained `delta_P_eff` projection from the same provider window, and the accepted `theta_cos` handoff lets the provider-backed `EQ-20` slice populate with `nextBlocker=null`.

## Direct Geometry Layer

This layer keeps the continuum comparison as one retained-window Noether sea response. It does not let acoustic/elastic arithmetic, authored Noether sea prose, a pressure row, or a metric consumer stand in for the source-backed `theta_sea_rho_NS` row.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Negative control required for advancement | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $\rho_{\text{NS}}(\mathbf x,t)$ | Retained Noether braid density row over one smoothing window. | `theta_sea_rho_NS`, `rho_NS`, retained inventory, smoothing kernel, event ledger | `windowId`, `ell`, retained inventory id, smoothing kernel id, and event-ledger id stay fixed across the density row and all response rows. | `status_flip`, `self_reference`, and `authored_prose_source` reject accepted-looking rows with pending, priority-packet, fixture, or authored-prose sources. | One source-backed `rho_NS` row with retained-window, event-ledger, and refinement-family identifiers. |
| $c_{X,\mathrm{disp}}^2$ | Channel speed projection from the same density-compression window. | `channel_declaration_row`, `speed_row`, `rho_NS` | Channel id, channel type, `windowId`, $\ell$, and density row bind the speed projection to the retained carrier. | `speed_without_stress` rejects speed-only evidence before a same-window stress/strain or metric-compliance row exists. | Accepted channel declaration and speed row on the accepted `theta_sea_rho_NS` window. |
| $C_{1111}^{X}/\rho_{\text{NS}}$ | Stress/strain projection read against the same retained density row. | `stress_strain_row`, `acousticElasticAgreement`, `rho_NS` | $C_{1111}^{X}$, $\rho_{\text{NS}}$, $\varepsilon_{\mathrm{ref}}(\ell)$, speed row, and agreement row share one response kernel and refinement family. | Numeric agreement without an accepted same-window agreement row remains `attempt_numeric_passed`. | Accepted stress/strain row plus accepted acoustic/elastic agreement row. |
| Delayed-support or $\mathcal R_{\mathrm{KK}}$ response | Causal support and correlation readout for the coefficient extraction. | `causality_row`, `correlation_row`, delayed-support or $\mathcal R_{\mathrm{KK}}$ row | Causality, correlation, channel declaration, speed, and stress/strain rows use the same retained window and event ledger. | Missing delayed-support/correlation evidence keeps the same-theta-sea-record gate failed. | Accepted causality and correlation rows tied to the same response kernel. |
| $\delta_N$, $\delta\gamma_{ij}$, $\delta G_{\mathrm{eff}}$, $\delta P_{\mathrm{eff}}$, $\delta a_\star$ | Downstream metric, pressure, and low-acceleration projections from the same surface slice. | metric embedding, pressure/effective-$\Lambda$, and low-acceleration output rows | Declared missing outputs cannot be consumed by `EQ-11`, `EQ-20`, or `EQ-32` until projected from the same accepted density-compression slice. `EQ-20` has the retained $\delta P_{\mathrm{eff}}$ projection report plus accepted `theta_cos` handoff; the output-projection slice now supplies `delta_N`, `delta_gamma_ij`, `delta_G_eff`, and `delta_a_star`. | `missing_output_substitution` rejects treating declared missing outputs as derived rows outside an accepted downstream projection report. | [noether-sea-density-compression-provider-output-projection.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-provider-output-projection.v1.json) for the metric/low-acceleration outputs, plus the retained `EQ-20` pressure report for $\delta P_{\mathrm{eff}}$. |
| $\mathcal S_{\mathrm{retune}}$ and source provenance | No-hidden-retune witness for density, speed, stress/strain, support, and output rows. | retune witness, durable source references, all required rows | All rows cite durable non-priority evidence with one `windowId`, one $\ell$, one channel, one response kernel, and one event ledger. | `attempt_source_copy` and coordination-source controls reject copied fixtures and priority packets as retained-window evidence. | A retained density-compression bundle whose required rows are accepted, source-backed, same-window bound, and checker consumable. |

## Cross-Row Use

The most direct downstream consumer is `EQ-20`, because its pressure and effective-$\Lambda$ checker consumes the accepted density provider, retained $\delta P_{\mathrm{eff}}$ pressure report, and accepted `theta_cos` handoff. `EQ-11` and `EQ-32` now have accepted output-projection rows from the same retained window, ready for consumer review. Broader growth, CMB, low-acceleration, and compact-region consumers remain downstream and should not be treated as first accepted objects for `EQ-24`.

## Verification Required for Advancement Controls

- `status_flip`: an accepted-looking row with the same pending source path must continue to fail at source concreteness.
- `self_reference`: this map, the retained-attempt fixture, and the continuum-medium packet are coordination artifacts, not retained evidence for $\rho_{\text{NS}}$.
- `authored_prose_source`: authored Noether sea prose defines variables and doctrine, but it is not retained-window coefficient evidence for $\rho_{\text{NS}}$.
- `attempt_source_copy`: copying the fixture fields into a new source note without retained-window derivation must not satisfy the source-backed requirement; this is a design/falsifier requirement until a standalone fixture exists.
- `missing_output_substitution`: using `delta_N`, `delta_gamma_ij`, `delta_G_eff`, `delta_P_eff`, or `delta_a_star` as if they were derived must fail until those outputs are projected from the same row; the accepted downstream exceptions are the `EQ-20` $\delta P_{\mathrm{eff}}$ pressure report plus `theta_cos` handoff and the output-projection evidence for `delta_N`, `delta_gamma_ij`, `delta_G_eff`, and `delta_a_star`.
- `speed_without_stress`: a speed row without a same-window stress/strain or metric-compliance row must remain below accepted evidence; this is a design/falsifier requirement until a standalone fixture exists.

The coordination-source and authored-prose controls are executable:

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-coordination-source-negative-control.v1.json --summary --pretty
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-authored-prose-source-negative-control.v1.json --summary --pretty
```

Both must keep `nextBlocker=missing_accepted_theta_sea_rho_NS` with `nextBlockerDetails.status=accepted_without_evidence_source`.

## Retained-Window Source-Attempt Fixture

The score-neutral `rho_NS` source-attempt fixture is [noether-sea-density-compression-rho-ns-source-attempt.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-rho-ns-source-attempt.v1.json):

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-rho-ns-source-attempt.v1.json --summary --pretty
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-rho-ns-source-attempt.v1.json --summary --pretty --require-populated
```

The fixture names `theta-sea-density-compression-rho-ns-source-attempt-0001`, `ell_rho_ns_source_attempt`, the retained inventory id, smoothing kernel id, projection formula, event ledger id, and refinement-family id for `theta_sea_rho_NS`. It also carries same-window row ids for the speed row, stress/strain row, acoustic/elastic agreement row, and retune witness. Every retained row remains `attempt`, so the expected result is still `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_theta_sea_rho_NS`. The priority-map `sourcePath` is a contract pointer, not accepted retained evidence.

## Provider Intake Boundary

The retained-window provider search is now executable in [noether-sea-density-compression-provider-intake.mjs](../../../../scripts/spacetime/noether-sea-density-compression-provider-intake.mjs), with the current candidate manifest [noether-sea-density-compression-provider-candidates.v1.json](../../../../scripts/spacetime/noether-sea-density-compression-provider-candidates.v1.json):

```sh
node scripts/spacetime/noether-sea-density-compression-provider-intake.mjs --summary --pretty
node scripts/spacetime/noether-sea-density-compression-provider-intake.mjs --summary --pretty --require-accepted
```

The current report is `verdict=accepted_theta_sea_rho_NS_provider_found`, `firstFailure=null`, `acceptedProviderCount=1`, `theta_sea_rho_NS_provider_ready=true`, and `scoreDecision=no_score_increase`. This is stronger than a path-existence check: the accepted candidate parses as `aaa-noether-sea-density-compression-provider/v1`, carries accepted same-window $\rho_{\text{NS}}$, $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, $\boldsymbol\theta_{\mathrm{sea}}$, $f_N$, event-ledger, channel, speed, causality, correlation, stress/metric, acoustic/elastic agreement, and zero-retune rows, and projects the speed and stress outputs before downstream consumers can treat the provider as ready. The attempt fixtures and negative controls remain rejected as `control_or_attempt_source_path` or `coordination_source_path`.

## Next Action

Use the accepted provider-backed slice as the upstream density-compression carrier, then run the retained-attempt, source-attempt, provider, and source-guard routes:

```sh
node scripts/spacetime/noether-sea-density-compression-provider-intake.mjs --summary --pretty
node scripts/spacetime/noether-sea-density-compression-provider-intake.mjs --summary --pretty --require-accepted
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-provider-surface-slice.v1.json --summary --pretty --require-populated
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-provider-surface-slice-output-projection.v1.json --summary --pretty --require-populated
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json --summary --pretty
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-rho-ns-source-attempt.v1.json --summary --pretty
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-coordination-source-negative-control.v1.json --summary --pretty
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-authored-prose-source-negative-control.v1.json --summary --pretty
```

The provider-backed route must remain populated for `EQ-24` density-compression review, and the output-projection route must remain populated for `EQ-11` weak-gravity outputs and `EQ-32` `delta_a_star` readiness. The retained-attempt and source-attempt routes must remain blocked at `missing_accepted_theta_sea_rho_NS`; they prove that copied attempt rows still do not count as accepted retained-window evidence. Coordination and authored-prose controls must report `accepted_without_evidence_source`; if a future row is only a status relabel or a placeholder source, the correct outcome remains `missing_accepted_theta_sea_rho_NS`. The next mathematical additions are growth, CMB, broader low-acceleration, and compact-region consumers, all derived from the same provider window rather than a private record.
