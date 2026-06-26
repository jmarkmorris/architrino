# EQ-25 Theta-Therm CMB Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent: [EQ-06, EQ-24, And EQ-25 Continuum, Medium, And Thermodynamic Closure Packet](eq-06-24-25-continuum-medium-thermo-packet.md)
- Source runner: [eq25-thermodynamic-record-residual.mjs](../../../scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs)
- Source fixtures:
  - [eq25-thermodynamic-record-attempt.v1.json](../../../scripts/equation-mapping/eq25-thermodynamic-record-attempt.v1.json)
  - [eq25-thermodynamic-record-cmb-source-chain-attempt.v1.json](../../../scripts/equation-mapping/eq25-thermodynamic-record-cmb-source-chain-attempt.v1.json)
  - [eq25-thermodynamic-record-source-window-split-negative-control.v1.json](../../../scripts/equation-mapping/eq25-thermodynamic-record-source-window-split-negative-control.v1.json)
  - [eq25-thermodynamic-record-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/eq25-thermodynamic-record-coordination-source-negative-control.v1.json)
- Row served: `EQ-25`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows the `EQ-25` first blocker to one source-backed `theta_therm` CMB thermalization record compatible with `Theta_obs` / `Theta_therm/prov` work. The live fixture already uses `theta_therm_CMB_attempt_0001`, so CMB thermalization is the primary source window. Measurement-record entropy remains a viable later route, but it needs a separate apparatus/environment carrier and record-locking row.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-25` |
| Current score and closure driver | Score `3`; derive Boltzmann-like operator, entropy production, fluctuation, and thermalization from deterministic finite-window coarse-grained pushforward. |
| Primary AAA carrier | Accepted `theta_therm`, specifically the CMB window candidate `theta_therm_CMB_attempt_0001`; not `W` alone and not a generic entropy carrier. |
| Smallest score-moving evidence object | One source-backed accepted `theta_therm` finite-window record with state space, coarse-graining, measure, pushforward, projection, collision operator, entropy balance, thermalization depth, fluctuation, event ledger, shared Noether sea row, source provenance, and no-hidden-retune witness on one carrier. |
| Exact first blocker | `missing_accepted_theta_therm`. |
| Existing scripts, fixtures, and packets found | The `EQ-25` thermodynamic record runner and fixture listed above, the continuum-medium packet, the shared-observation packet, and the recombination/acoustic suffix packet as an adjacent thermal/provenance consumer. |
| Candidate breakthrough angle | Use CMB, BBN, recombination, and local-radiation thermal/provenance records as inverse clues for `theta_therm` row fields, especially event ledger, channel-decomposed thermalization depth, zero effective photon chemical potential, and shared Noether sea keys. |
| Fail-closed negative control | `boltzmann_postulate_import`: a collision operator imported as a postulate must fail even when arithmetic residuals look clean. |
| Smaller-than-report next action | Bind `theta_therm_CMB_attempt_0001` to one source-to-decoupling event-chain skeleton and list the required CMB source fields without changing row statuses. |

## Current Fixture Inventory

The live attempt fixture declares:

| Field | Attempt value |
| --- | --- |
| `commonCarrierId` | `theta_therm_CMB_attempt_0001` |
| `theta_therm.status` | `attempt` |
| `theta_therm.sourcePath` | `reference/priorities/equation-mapping/eq-06-24-25-continuum-medium-thermo-packet.md` |
| `stateSpace.regionId` | `W_CMB_attempt` |
| `stateSpace.coarseGrainingId` | `Q_CMB_attempt` |
| `stateSpace.measureMass` | `1` |
| `thermalizationDepth.D_th` | `12` |
| `thermalizationDepth.minimum` | `10` |
| `thermalizationDepth.photon_chemical_potential` | `0` |
| `sharedKeys` | `theta_therm_id`, `rho_NS`, `chi_sea`, `Gamma_N` |

The normal checker run reports `status=blocked_missing_rows`, `scoreDecision=no_score_increase`, and `nextBlocker=missing_accepted_theta_therm`. Carrier binding, shared keys, numeric thermodynamic diagnostics, and all four negative controls pass, but every required evidence row remains attempt-level.

The CMB source-chain attempt fixture [eq25-thermodynamic-record-cmb-source-chain-attempt.v1.json](../../../scripts/equation-mapping/eq25-thermodynamic-record-cmb-source-chain-attempt.v1.json) binds every required row to `theta_therm_CMB_attempt_0001`, one `theta_src`, one source family, one source-to-decoupling window, one coarse-graining id, one thermal-provenance id, one event ledger, and one transport path. It still keeps every row `attempt`, so the checker preserves `missing_accepted_theta_therm`; its value is source-chain shape, not evidence.

## Source Inventory

| Required row | Candidate source path | Current status | Same-carrier id | First reason not accepted | Smaller next action |
| --- | --- | --- | --- | --- | --- |
| `theta_therm` | [eq-06-24-25-continuum-medium-thermo-packet.md](eq-06-24-25-continuum-medium-thermo-packet.md) | `attempt` | `theta_therm_CMB_attempt_0001` | `row_not_accepted`; first blocker `missing_accepted_theta_therm` | Bind this row to existing `Theta_therm/prov` fields in the shared-observation packet. |
| `state_space_row` | [entropy.md](../../../content/markdown/aaa/dynamics/entropy.md) | `attempt` | same | General entropy minimum spec exists, but no accepted CMB `W`, `Q`, `mu` row exists. | Name one source-to-decoupling window `W_CMB` and its retained variables. |
| `coarse_graining_row` | [entropy.md](../../../content/markdown/aaa/dynamics/entropy.md) | `attempt` | same | Coarse-graining rule exists, but no accepted projection exists for this CMB carrier. | Declare `Q_CMB` against spectrum, anisotropy, damping, and BBN handoff. |
| `measure_row` | [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs) | `attempt` | same | Existing carrier logic is score-neutral or toy unless retained rows are accepted. | Reuse its schema to list actual CMB measure fields, not values. |
| `deterministic_pushforward_row` | [eq-06-24-25-continuum-medium-thermo-packet.md](eq-06-24-25-continuum-medium-thermo-packet.md) | `attempt` | same | Formula exists, but no accepted $\Phi$ / $\Pi$ exists for the chosen path. | Choose the source-to-decoupling path and define pushforward map names. |
| `coarse_projection_row` | [eq-06-24-25-continuum-medium-thermo-packet.md](eq-06-24-25-continuum-medium-thermo-packet.md) | `attempt` | same | Projection is named only abstractly. | Map CMB observables to retained record variables without adding fitted knobs. |
| `collision_operator_row` | [CMB.md](../../../content/markdown/aaa/cosmology/CMB.md) | `attempt` | same | $C_{\mathrm{eff}}$ is not yet derived from event-recorded channels. | Inventory capture/release, Compton-like, pair, and medium-exchange channel candidates. |
| `entropy_balance_row` | [entropy.md](../../../content/markdown/aaa/dynamics/entropy.md) | `attempt` | same | Balance equation exists, but no CMB $\sigma_W$, boundary flux, or residual row exists. | Pull CMB energy-budget terms into entropy-balance slots. |
| `thermalization_depth_row` | [reaction-cosmology-provenance-ledger.md](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) | `attempt` | same | $\mathcal D_{\mathrm{th}}$ target exists, but channel decomposition is not populated. | Make a path-channel list for $\tau_{\mathrm{th}}^{-1}$ before any numeric estimate. |
| `fluctuation_row` | [entropy.md](../../../content/markdown/aaa/dynamics/entropy.md) | `attempt` | same | Finite-window fluctuation allowance exists, not CMB covariance rows. | Identify the first fluctuation residual: spectrum, opacity, or boundary flux. |
| `event_ledger_row` | [reaction-ledger.md](../../../content/markdown/aaa/validation/reaction-ledger.md) | `attempt` | same | Ledger contract exists, but no selected CMB event chain closes. | Select one event chain and list energy/recoil/medium/remnant fields. |
| `shared_noether_sea_row` | [noether-sea.md](../../../content/markdown/aaa/spacetime/noether-sea.md) | `attempt` | same | Variables are canonical, but no accepted same-window row exists. | Require `rho_NS`, `n`, `chi_sea`, and `Gamma_N` to point to one source record. |
| `source_provenance` | [reaction-cosmology-provenance-ledger.md](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) | `attempt` | same | Provenance fields are defined, not populated for one path. | Fill a source-to-transport-to-decoupling path skeleton. |
| `no_hidden_retune_witness` | [eq-21-23-32-shared-observation-residual-packet.md](eq-21-23-32-shared-observation-residual-packet.md) | `attempt` | same | Retune residual exists, but no accepted cross-projection witness exists. | Compare the same keys across CMB, BBN, recombination, and local-radiation rows. |

## Source-To-Decoupling Skeleton

The first source-backed CMB thermalization object should list, without fitting new values:

- one retained source window `W_CMB`;
- one coarse-graining `Q_CMB` over spectrum, anisotropy, damping, and BBN/recombination handoff variables;
- one measure row for `W_CMB`;
- deterministic pushforward maps from source loading through transport and decoupling;
- channel-decomposed $\tau_{\mathrm{th}}^{-1}$ rows for capture/release, Compton-like redistribution, pair channels, and non-radiative medium exchange;
- entropy balance rows for $\sigma_W$, boundary flux, and $\mathcal R_{\mathcal Q}$;
- event-ledger rows for energy, momentum, angular momentum, recoil, medium, remnant, identity, and boundary updates;
- shared Noether sea keys `rho_NS`, `n`, `chi_sea`, and `Gamma_N`;
- a no-hidden-retune witness across CMB, BBN, recombination, and local-radiation rows.

## Fail-Closed Controls

- `boltzmann_postulate_import`: a collision operator imported as a postulate fails even if residual arithmetic passes.
- `insufficient_thermalization_depth`: $\mathcal D_{\mathrm{th}}$ below the declared minimum fails the CMB thermalization claim.
- `entropy_without_boundary_balance`: entropy production without boundary flux and coarse-graining residual fails the balance row.
- `hidden_thermo_retune`: changing Noether sea keys between CMB, BBN, recombination, and local-radiation rows fails no-retune.
- `theta_therm_private_W`: a CMB thermal row that does not embed or reference the same accepted finite-window family headed by `W` cannot be treated as the `EQ-25` carrier.
- `theta_therm_CMB_source_window_split`: accepted-looking rows may pass numeric thermodynamic residuals, but if one row changes `sourceWindowId`, `eventLedgerId`, `thermalProvenanceId`, or transport identity, the checker must return `blocked_source_window_split` before any populated result.
- `theta_therm_CMB_coordination_source`: accepted-looking rows may share carrier, source identity, shared keys, and numeric residuals, but if their `sourcePath` values point only to priority packets, attempt fixtures, mock fixtures, or negative-control fixtures, the checker must return `blocked_source_evidence` with `accepted_without_evidence_source` before any populated result.

## 2026-06-26 Source-Evidence Guard

The checker now separates resolving source paths from retained evidence paths. A row can still report `sourceReferenceExists=true` when its path exists in the repository, but accepted rows also need `sourceEvidenceReferenceExists=true` before the packet can populate. Priority packets and attempt/control fixtures are coordination material, not retained thermodynamic evidence.

The coordination-source negative control verifies the new gate:

```sh
node scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs --input scripts/equation-mapping/eq25-thermodynamic-record-coordination-source-negative-control.v1.json --summary --pretty
```

Expected result: `status=blocked_source_evidence`, `nextBlocker=accepted_without_evidence_source`, `sourceIdentityAccepted=true`, `thermodynamicNumericPass=true`, and `sourceEvidenceFailureCount=14`. Running the same fixture with `--require-populated` must exit nonzero.

## Next Action

Create one durable source-backed `theta_therm` CMB carrier row, then run:

```sh
node scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs --input scripts/equation-mapping/eq25-thermodynamic-record-cmb-source-chain-attempt.v1.json --summary --pretty
node scripts/equation-mapping/eq25-thermodynamic-record-residual.mjs --summary --pretty
```

Until that row exists, the correct result remains `missing_accepted_theta_therm`.
