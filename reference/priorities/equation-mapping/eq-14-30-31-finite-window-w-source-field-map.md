# EQ-14/EQ-30/EQ-31 Finite-Window W Source-Field Map

## Status

- Kind: `priority`
- Scope: shared source-field map for `missing_accepted_W`
- Rows served: `EQ-14`, `EQ-30`, and `EQ-31`
- Claim level: candidate source map; not accepted retained evidence
- Score disposition: no score changes

This map narrows the shared first blocker in the finite-window statistical carrier. The live carrier evaluator reports `missing_accepted_W` for the `EQ-14` Born-current toy, the `EQ-30` elastic-scattering toy, the `EQ-31` resonance toy, and the refined `EQ-31` first-exit/null-separatrix/refinement toy. Those toys are useful grammar, but none supplies accepted retained evidence.

## Equation Attack Cards

| Row | Current score | Primary carrier | Exact first blocker | Smallest blocker-moving object |
| --- | --- | --- | --- | --- |
| `EQ-14` | `3` | $\mathcal C_{\mathrm{stat}}^{W,T}$ plus $\Theta_{\rho J}$ record-current projection | `missing_accepted_W` | One source-backed retained window `W` with the same measure/flow later used by density and current rows. |
| `EQ-30` | `2` | $\mathcal C_{\mathrm{stat}}^{W,T}$ specialized to scattering/form-factor rows | `missing_accepted_W` | One source-backed retained scattering window `W` with prepared ensemble, detector support, and exposure provenance. |
| `EQ-31` | `2` | $\mathcal C_{\mathrm{stat}}^{W,T}$ specialized to metastable branch/corridor rows | `missing_accepted_W` | One source-backed retained metastable branch window `W` with corridor or detector-classification support. |

The smallest score-moving object is larger than `W`: it must include accepted parent carrier rows `W`, `Phi_T`, `mu_star_T`, `Q`, `K_det`, `B`, and `S_retune`, plus row-specific projection rows. This map starts with `W` because the checker blocks there first.

## Shared Carrier Contract

The parent carrier is

$$
\mathcal C_{\mathrm{stat}}^{W,T}
=
\left(
W,
T,
\Phi_T,
\mu_{*,T},
\mathcal Q,
K_{\mathrm{det}},
\mathcal B,
\mathcal C,
\mathcal S_{\mathrm{retune}}
\right).
$$

The accepted `W` candidate must be a positive finite window with:

- concrete `id`, `sourcePath`, and `carrierId`;
- explicit window kind: measurement, scattering, or metastable branch;
- finite support and support provenance;
- event or branch-window boundary;
- declared relation to the transition map $\Phi_T$ and measure $\mu_{*,T}$;
- detector/apparatus context when $K_{\mathrm{det}}$ is active;
- source path that resolves to a durable source/evidence file, not a toy fixture, temp file, generated reading copy, or coordination note alone.

The existing toy fixtures are not accepted `W` candidates even though they are durable repo files: their `status` values are `toy`, their windows are source-less or toy-sourced, and their numeric residuals are grammar checks rather than retained evidence.

## Source-Field Map

| Parent row | Required content | Current blocker |
| --- | --- | --- |
| `W` | Retained finite-window id, support, source path, window kind, carrier id, event/branch boundary, and durable evidence source. | Missing accepted row; current fixtures use `toy` windows with no source evidence. |
| `Phi_T` | Same-window transition map or deterministic branch flow with source-backed row id. | Blocked behind accepted `W`; toy maps cannot be promoted by status edits. |
| `mu_star_T` | Finite measure on the same support, total mass, invariance residual, and source-backed construction. | Current toy measures are not accepted and may have toy-only invariance diagnostics. |
| `Q` | Coarse graining or projection quotient tied to the same support and measure. | Needs source-backed quotient, not a comparison chart. |
| `K_det` | Detector/readout kernel reused across density/current, scattering, or resonance readouts. | Needs apparatus or classification source row. |
| `B` | Outcome partition or final-state classes on the same window. | Needs accepted class rows before observed probabilities/rates count. |
| `C` | Exit-corridor family when the row is metastable/resonant. | Required for `EQ-31` when first-exit/corridor additivity is active. |
| `S_retune` | One no-hidden-retune witness tying source, measure, detector, and projection rows together. | Current toy residuals are not source-backed witnesses. |

## Row-Specific Projection Requirements

| Row | Projection rows required after parent `W` exists |
| --- | --- |
| `EQ-14` | Accepted $\Theta_{\rho J}$ row, record-current samples, same `densityMeasureId=currentMeasureId=mu_star_T`, same `densityFlowId=currentFlowId=Phi_T`, continuity residual, density-reference row, and current-reference row. |
| `EQ-30` | Accepted `Gamma_a`, `Phi_in`, detected class measures, cross-section comparisons, $\rho_{\mathrm{exp}}$, form-factor samples, elastic-regime row, and no amplitude/form-factor import. |
| `EQ-31` | Accepted branch-energy/stability row, corridor admissibility, first-exit preimage rows, null-separatrix evidence, refinement-cocycle evidence, width/lifetime/branching rows, detector classification, and corridor identity/conservation ledgers. |

## Breakthrough Candidate

The best shared route is not to import one toy into another row. It is to choose one real retained finite window that can be inspected as a source object:

- a measurement-window candidate for `EQ-14`;
- an elastic scattering-window candidate for `EQ-30`;
- or a metastable branch-window candidate for `EQ-31`.

The highest cross-row payoff comes from a scattering or resonance window whose detector/readout kernel can also support a record-current projection. The row still fails if the `EQ-14` density/current projection, `EQ-30` form-factor projection, or `EQ-31` corridor projection is missing or separately tuned.

The first checker-consumable source-shaped candidate is [finite-window-statistical-carrier-eq31-pion-free-decay-attempt.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-free-decay-attempt.v1.json). It uses the free charged-pion weak-dissociation record as a candidate `EQ-31` branch window with concrete corridor, null-separatrix, refinement, and no-retune fields, while every retained row remains `attempt`. The finite-window checker computes the corridor rows and still reports `nextBlocker: missing_accepted_W`; `--require-accepted` exits nonzero as intended.

The first accepted-looking source-missing control is [finite-window-statistical-carrier-eq30-elastic-source-missing-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-source-missing-negative-control.v1.json). It marks the `EQ-30` scattering and form-factor rows as accepted-looking and numerically passing, but points `W` at a missing source path. The checker must stop at `missing_accepted_W` with `reason: row_source_not_found`.

The coordination-source control is [finite-window-statistical-carrier-eq30-elastic-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-coordination-source-negative-control.v1.json). It marks the same finite-window carrier rows as accepted-looking and numerically passing, but points `W` at this coordination map. The checker must still stop at `missing_accepted_W`, now with `reason: accepted_without_evidence_source`, `sourceReferenceExists=true`, and `sourceEvidenceReferenceExists=false`.

## Fail-Closed Controls

| Control | Expected failure |
| --- | --- |
| `finite_window.toy_status_import` | A toy fixture with passing numeric residuals remains blocked at `missing_accepted_W`. |
| `finite_window.source_missing` | Accepted-looking `W` with missing or non-durable source path fails at `row_source_not_found`; the `EQ-30` source-missing fixture exercises this control. |
| `finite_window.coordination_source` | Accepted-looking `W` with a source path that resolves only to a priority/source-field map fails at `accepted_without_evidence_source`; the `EQ-30` coordination-source fixture exercises this control. |
| `eq14.measure_flow_split` | Density and current rows use different measure or flow ids; projection rows fail before continuity is interpreted. |
| `eq30.amplitude_import` | Imported amplitude or form factor passes comparison numbers without one finite-window pushforward; elastic projection fails. |
| `eq31.fitted_width` | Width, lifetime, or branching fractions are fitted independently of corridor measures; resonance projection fails. |

## Current Disposition

The next implementation should either populate the charged-pion candidate with a genuinely accepted `W` row or create the corresponding accepted-looking source-missing negative control. If a real source-backed `W` is found, rerun the finite-window checker with `--require-accepted` and expect the first blocker to advance to `missing_accepted_Phi_T` or the relevant row-specific projection blocker.

No score changes.
