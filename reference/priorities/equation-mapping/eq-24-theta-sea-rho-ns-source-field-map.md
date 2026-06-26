# EQ-24 Theta-Sea Rho-NS Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-06, EQ-24, And EQ-25 Continuum, Medium, And Thermodynamic Closure Packet](eq-06-24-25-continuum-medium-thermo-packet.md)
- Source runner: [noether-sea-density-compression-surface-slice.mjs](../../../scripts/spacetime/noether-sea-density-compression-surface-slice.mjs)
- Source fixture: [noether-sea-density-compression-surface-slice-retained-attempt.v1.json](../../../scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json)
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It names the smallest source-backed object that could move `EQ-24` beyond the current score `3` state and preserves the live checker blocker `missing_accepted_theta_sea_rho_NS`.

The retained-attempt fixture already supplies the arithmetic shape of the density-compression slice, but every retained row remains attempt-level with `sourcePath=pending-retained-source`. Changing a status field, pointing a row back to this packet, or pointing a row back to the attempt fixture does not count as accepted evidence.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-24` |
| Current score and closure driver | Score `3`; acoustic, elastic, stress-strain, and medium equations must be derived as low-moment Noether sea response projections. |
| Primary AAA carrier | $\Theta_{\mathrm{sea}}^{(\ell,W)}$ for one retained density-compression window, with `theta_sea_rho_NS` as the first source-backed row. |
| Smallest score-moving evidence object | A source-backed same-window density-compression bundle: accepted $\rho_{\text{NS}}$, $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, $\boldsymbol\theta_{\mathrm{sea}}$, $f_N$, event ledger, channel declaration, speed row, stress/strain row, delayed-support or $\mathcal R_{\mathrm{KK}}$ row, correlation row, acoustic/elastic agreement row, refinement family, and zero-retune witness. |
| Exact first blocker | `missing_accepted_theta_sea_rho_NS`. |
| Existing scripts, fixtures, and packets found | The Noether sea density-compression surface-slice runner, retained-attempt fixture, and continuum-medium packet listed above. |
| Candidate breakthrough angle | `EQ-24` is the narrowest Noether sea coefficient discriminator because it can accept speed plus bulk stress/strain without first claiming metric, pressure, or low-acceleration outputs. A retained `theta_sea_rho_NS` source row would also become the first concrete input for `EQ-20` and `EQ-32`, and a later consumer for `EQ-11`. |
| Fail-closed negative control | A numerically agreeing acoustic/elastic row with pending, missing, directory, generated-reading-copy, temp, or self-referential source evidence must remain blocked even when $c_{X,\mathrm{disp}}^2$ and $C_{1111}^X/\rho_{\text{NS}}$ agree. |
| Smaller-than-report next action | Build one durable source-backed `rho_NS` retained-window row with `windowId`, `ell`, `rowId`, source file, event ledger, and refinement-family identifiers, then rerun the retained-attempt checker before adding other rows. |

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

The smallest blocker-moving object is not the full metric or pressure recovery. It is one source-backed `theta_sea_rho_NS` row on the same retained window:

$$
\rho_{\text{NS}}(\mathbf x,t)
=
\sum_{k\in\mathcal I_{\mathrm{sea}}}
m_{N,k}
W_\ell(\mathbf x-\mathbf X_k(t)),
$$

with a durable source file that identifies the retained Noether braid inventory, the smoothing window, the event ledger, and the refinement family. That row can then anchor the accepted $n$, $\mathbf u_{\mathrm{sea}}$, $e_{\mathrm{sea}}$, $\boldsymbol\theta_{\mathrm{sea}}$, and $f_N$ rows without splitting the carrier.

The smallest score-moving bundle adds speed plus stress/strain from the same window:

$$
\left|
c_{X,\mathrm{disp}}^2
-
\frac{C_{1111}^{X}}{\rho_{\text{NS}}}
\right|
\le
\varepsilon_{\mathrm{ref}}(\ell),
$$

with $\varepsilon_{\mathrm{ref}}(\ell)$ tied to the declared refinement family. Until that bundle is source-backed, the current arithmetic agreement is only a diagnostic.

## Cross-Row Use

The most direct downstream consumer is `EQ-20`, because its pressure and effective-$\Lambda$ checker already blocks at `missing_accepted_theta_sea_rho_NS`. `EQ-32` can only consume the row after `delta_a_star` is actually projected from the same retained window. `EQ-11` and `EQ-07A` may consume later metric or compact-region outputs, but they should not be treated as the first accepted object for `EQ-24`.

## Fail-Closed Controls

- `status_flip`: an accepted-looking row with the same pending source path must continue to fail at source concreteness.
- `self_reference`: this map, the retained-attempt fixture, and the continuum-medium packet are coordination artifacts, not retained evidence for $\rho_{\text{NS}}$.
- `attempt_source_copy`: copying the fixture fields into a new source note without retained-window derivation must not satisfy the source-backed requirement.
- `missing_output_substitution`: using `delta_N`, `delta_gamma_ij`, `delta_G_eff`, `delta_P_eff`, or `delta_a_star` as if they were derived must fail until those outputs are projected from the same row.
- `speed_without_stress`: a speed row without a same-window stress/strain or metric-compliance row must remain below score-moving evidence.

## Next Action

Create one durable source-backed `rho_NS` retained-window row, then run:

```sh
node scripts/spacetime/noether-sea-density-compression-surface-slice.mjs --input scripts/spacetime/noether-sea-density-compression-surface-slice-retained-attempt.v1.json --summary --pretty
```

If the row is only a status relabel or a placeholder source, the correct outcome remains `missing_accepted_theta_sea_rho_NS`.
