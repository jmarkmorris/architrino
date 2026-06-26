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

The first `EQ-31` accepted-looking source-missing control is [finite-window-statistical-carrier-eq31-pion-source-missing-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-source-missing-negative-control.v1.json). It marks the charged-pion finite-window carrier rows as accepted-looking and numerically passing, but points the parent `W` row at a missing source path. The checker must stop at `missing_accepted_W` with `reason: row_source_not_found` before interpreting the width, lifetime, branching fractions, or corridor additivity as accepted evidence.

The companion `W` source-evidence probe is [finite-window-statistical-carrier-eq31-pion-w-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-w-source-evidence-probe.v1.json). It marks only the parent charged-pion `W` row as accepted-looking with the guard-passing PDG reaction source, leaving `Phi_T`, `mu_star_T`, `Q`, `K_det`, `B`, `S_retune`, and corridor rows at `attempt`. The expected result is still `no_score_increase`, with the blocker advancing only to `missing_accepted_Phi_T`; that proves the checker can distinguish a source-bearing `W` probe from a closed retained finite-window carrier.

The next one-row probe is [finite-window-statistical-carrier-eq31-pion-phi-t-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-phi-t-source-evidence-probe.v1.json). It marks `W` and `Phi_T` as accepted-looking against the same guard-passing charged-pion source while leaving `mu_star_T`, `Q`, `K_det`, `B`, `S_retune`, and corridor rows at `attempt`. The expected result remains `no_score_increase`, with the blocker advancing only to `missing_accepted_mu_star_T`. This proves the parent-carrier ladder can be advanced one accepted-evidence row at a time without closing the retained finite-window carrier.

The next finite-measure probe is [finite-window-statistical-carrier-eq31-pion-mu-star-t-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-mu-star-t-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, and `mu_star_T` as accepted-looking against the same guard-passing charged-pion source while leaving `Q`, `K_det`, `B`, `S_retune`, and corridor rows at `attempt`. The expected result remains `no_score_increase`, with the blocker advancing only to `missing_accepted_Q`. This isolates the finite-measure acceptance step from the quotient, detector-kernel, outcome-partition, no-retune, and corridor-family obligations.

The next quotient probe is [finite-window-statistical-carrier-eq31-pion-q-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-q-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, `mu_star_T`, and `Q` as accepted-looking against the same guard-passing charged-pion source while leaving `K_det`, `B`, `S_retune`, and corridor rows at `attempt`. The expected result remains `no_score_increase`, with the blocker advancing only to `missing_accepted_K_det`. This isolates the quotient acceptance step from the detector-kernel, outcome-partition, no-retune, and corridor-family obligations.

The next detector-kernel probe is [finite-window-statistical-carrier-eq31-pion-k-det-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-k-det-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, `mu_star_T`, `Q`, and `K_det` as accepted-looking against the same guard-passing charged-pion source while leaving `B`, `S_retune`, and corridor rows at `attempt`. The expected result remains `no_score_increase`, with the blocker advancing only to `missing_accepted_B`. This isolates detector/readout classification from the outcome partition, no-retune witness, and corridor-family obligations.

The next outcome-partition probe is [finite-window-statistical-carrier-eq31-pion-b-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-b-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, `mu_star_T`, `Q`, `K_det`, and `B` as accepted-looking against the same guard-passing charged-pion source while leaving `S_retune` and corridor rows at `attempt`. The expected result remains `no_score_increase`, with the blocker advancing only to `missing_accepted_S_retune`. This isolates the outcome partition from the no-hidden-retune witness and corridor-family obligations.

The next no-retune probe is [finite-window-statistical-carrier-eq31-pion-s-retune-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-s-retune-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, `mu_star_T`, `Q`, `K_det`, `B`, and `S_retune` as accepted-looking against the same guard-passing charged-pion source while leaving the corridor family `C` at `attempt`. The expected result remains `no_score_increase`, with the blocker advancing only to `missing_accepted_C`. This isolates the no-hidden-retune witness from the first-exit corridor-family obligation.

The corridor-family probe is [finite-window-statistical-carrier-eq31-pion-c-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-c-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, `mu_star_T`, `Q`, `K_det`, `B`, `S_retune`, and both charged-pion corridor rows as accepted-looking against the same guard-passing source. The checker reports `scoreDecision: no_score_increase`, `status: blocked_carrier_not_retained`, `acceptedCarrierRows: true`, and no remaining parent-row `nextBlocker`; `--require-accepted` still exits nonzero because the top finite-window carrier remains `attempt`. This isolates the parent-row ladder from the separate retained-carrier acceptance burden.

The top-carrier coordination-source control is [finite-window-statistical-carrier-eq31-pion-c-top-carrier-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-c-top-carrier-coordination-source-negative-control.v1.json). It marks the top finite-window carrier accepted-looking while pointing `carrier.sourcePath` back to this priority map. The checker now reports `status: blocked_carrier_source_evidence`, `scoreDecision: no_score_increase`, and `nextBlocker: accepted_without_evidence_source`. This prevents accepted parent rows and corridor rows from satisfying the retained carrier unless the carrier itself has a durable evidence source.

The top-carrier generic durable-source control is [finite-window-statistical-carrier-eq31-pion-c-top-carrier-generic-durable-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-c-top-carrier-generic-durable-source-negative-control.v1.json). It marks the top carrier accepted-looking and gives it a durable source path, but the carrier metadata declares only a generic reaction listing rather than EQ-31 retained finite-window support. The checker reports `status: blocked_carrier_source_evidence`, `scoreDecision: no_score_increase`, `carrierSourceReason: carrier_source_contract_mismatch`, and `nextBlocker: carrier_source_contract_mismatch`. This prevents generic durable files from becoming retained top-carrier evidence unless the carrier-level source contract names the supported row and carrier role.

The top-carrier row-name-only durable-source control is [finite-window-statistical-carrier-eq31-pion-c-top-carrier-row-name-only-durable-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-c-top-carrier-row-name-only-durable-source-negative-control.v1.json). It marks the top carrier accepted-looking and points it to the same durable source path, but the metadata says only `EQ-31` resonance benchmark rather than retained top-carrier support. The checker reports `carrierSourceReason: carrier_source_contract_mismatch`, proving row identity alone is not enough; the accepted top carrier must declare both `EQ-31` and retained/top finite-window carrier support.

The `mu_star_T` coordination-source control is [finite-window-statistical-carrier-eq31-pion-mu-star-t-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-mu-star-t-coordination-source-negative-control.v1.json). It keeps `W` and `Phi_T` source-backed, marks `mu_star_T` accepted-looking, and points `mu_star_T.sourcePath` back to this priority map. The expected result is `no_score_increase`, with the blocker staying at `missing_accepted_mu_star_T` and `reason: accepted_without_evidence_source`. This prevents a finite-measure row from being promoted by a coordination note.

The `K_det` coordination-source control is [finite-window-statistical-carrier-eq31-pion-k-det-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq31-pion-k-det-coordination-source-negative-control.v1.json). It keeps `W`, `Phi_T`, `mu_star_T`, and `Q` source-backed, marks `K_det` accepted-looking, and points `K_det.sourcePath` back to this priority map. The expected result is `no_score_increase`, with the blocker staying at `missing_accepted_K_det` and `reason: accepted_without_evidence_source`. This prevents a detector-kernel row from being promoted by a coordination note.

The first `EQ-30` one-row source-evidence probe is [finite-window-statistical-carrier-eq30-elastic-w-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-w-source-evidence-probe.v1.json). It marks only the parent elastic-scattering `W` row as accepted-looking with a guard-passing evidence source, leaving `Phi_T`, `mu_star_T`, `Q`, `K_det`, `B`, `S_retune`, and all `EQ-30` projection rows at `attempt`. The expected result is `no_score_increase`, with the blocker advancing only to `missing_accepted_Phi_T`. This probe is not retained scattering evidence; it only proves the `EQ-30` finite-window ladder can be advanced one source-backed row at a time.

The next `EQ-30` transition-map source-evidence probe is [finite-window-statistical-carrier-eq30-elastic-phi-t-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-phi-t-source-evidence-probe.v1.json). It marks `W` and `Phi_T` accepted-looking against the same guard-passing evidence source while leaving `mu_star_T`, `Q`, `K_det`, `B`, `S_retune`, and all `EQ-30` projection rows at `attempt`. The expected result is `no_score_increase`, with the blocker advancing only to `missing_accepted_mu_star_T`. This isolates the transition-map acceptance step from finite-measure and projection-row obligations.

The next finite-measure probe is [finite-window-statistical-carrier-eq30-elastic-mu-star-t-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-mu-star-t-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, and `mu_star_T` accepted-looking against the same guard-passing evidence source while leaving `Q`, `K_det`, `B`, `S_retune`, and all `EQ-30` projection rows at `attempt`. The expected result is `no_score_increase`, with the blocker advancing only to `missing_accepted_Q`. This isolates the finite-measure acceptance step from quotient, detector-kernel, outcome-partition, no-retune, and projection-row obligations.

The next quotient probe is [finite-window-statistical-carrier-eq30-elastic-q-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-q-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, `mu_star_T`, and `Q` accepted-looking against the same guard-passing evidence source while leaving `K_det`, `B`, `S_retune`, and all `EQ-30` projection rows at `attempt`. The expected result is `no_score_increase`, with the blocker advancing only to `missing_accepted_K_det`. This isolates the quotient acceptance step from detector/readout classification and the scattering projection rows.

The detector-kernel probe is [finite-window-statistical-carrier-eq30-elastic-k-det-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-k-det-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, `mu_star_T`, `Q`, and `K_det` accepted-looking against the same guard-passing evidence source while leaving `B`, `S_retune`, and all `EQ-30` projection rows at `attempt`. The expected result remains `no_score_increase`, with the blocker advancing only to `missing_accepted_B`. This isolates detector/readout classification from the outcome-partition, no-retune, and scattering projection-row obligations.

The outcome-partition probe is [finite-window-statistical-carrier-eq30-elastic-b-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-b-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, `mu_star_T`, `Q`, `K_det`, and `B` accepted-looking against the same guard-passing evidence source while leaving `S_retune` and all `EQ-30` projection rows at `attempt`. The expected result remains `no_score_increase`, with the blocker advancing only to `missing_accepted_S_retune`. This isolates the outcome partition from the no-hidden-retune witness and scattering projection-row obligations.

The `B` coordination-source control is [finite-window-statistical-carrier-eq30-elastic-b-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-b-coordination-source-negative-control.v1.json). It keeps rows through `K_det` source-backed, marks `B` accepted-looking, and points `B.sourcePath` back to this priority map. The expected result is `no_score_increase`, with the blocker staying at `missing_accepted_B` and `reason: accepted_without_evidence_source`.

The no-hidden-retune probe is [finite-window-statistical-carrier-eq30-elastic-s-retune-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-s-retune-source-evidence-probe.v1.json). It marks `W`, `Phi_T`, `mu_star_T`, `Q`, `K_det`, `B`, and `S_retune` accepted-looking against the same guard-passing evidence source while leaving the top carrier and all `EQ-30` projection rows at `attempt`. The checker reports `scoreDecision: no_score_increase`, `acceptedCarrierRows: true`, `hiddenRetunePassed: true`, and `nextBlocker: missing_accepted_Gamma_a`. This isolates the parent finite-window carrier from the first scattering projection-row obligation.

The `S_retune` coordination-source control is [finite-window-statistical-carrier-eq30-elastic-s-retune-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-s-retune-coordination-source-negative-control.v1.json). It keeps rows through `B` source-backed, marks `S_retune` accepted-looking, and points `S_retune.sourcePath` back to this priority map. The expected result is `no_score_increase`, with the blocker staying at `missing_accepted_S_retune` and `reason: accepted_without_evidence_source`.

The prepared-ensemble probe is [finite-window-statistical-carrier-eq30-elastic-gamma-a-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-gamma-a-source-evidence-probe.v1.json). It keeps the parent finite-window rows accepted-looking and marks `Gamma_a` accepted-looking while leaving `Phi_in`, detected class measures, cross-section comparisons, $\rho_{\mathrm{exp}}$, form-factor samples, and the elastic-regime row at `attempt`. The checker reports `scoreDecision: no_score_increase` and `nextBlocker: missing_accepted_Phi_in`. The companion [finite-window-statistical-carrier-eq30-elastic-gamma-a-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-gamma-a-coordination-source-negative-control.v1.json) keeps accepted-looking `Gamma_a` sourced only to this priority map blocked at `missing_accepted_Gamma_a` with `accepted_without_evidence_source`.

The flux-calibration probe is [finite-window-statistical-carrier-eq30-elastic-phi-in-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-phi-in-source-evidence-probe.v1.json). It marks `Gamma_a` and `Phi_in` accepted-looking while leaving detected class measures, cross-section comparisons, $\rho_{\mathrm{exp}}$, form-factor samples, and the elastic-regime row at `attempt`. The checker reports `scoreDecision: no_score_increase` and `nextBlocker: missing_accepted_detected_class_measures`. The companion [finite-window-statistical-carrier-eq30-elastic-phi-in-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-phi-in-coordination-source-negative-control.v1.json) keeps accepted-looking `Phi_in` sourced only to this priority map blocked at `missing_accepted_Phi_in` with `accepted_without_evidence_source`.

The detected-class-measures probe is [finite-window-statistical-carrier-eq30-elastic-detected-class-measures-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-detected-class-measures-source-evidence-probe.v1.json). It marks the `elastic_ep`, `inelastic_ep`, and `lost` detected class measures accepted-looking while leaving cross-section comparisons, $\rho_{\mathrm{exp}}$, form-factor samples, and the elastic-regime row at `attempt`. The checker reports `scoreDecision: no_score_increase` and `nextBlocker: missing_accepted_cross_section_comparisons`. The companion [finite-window-statistical-carrier-eq30-elastic-detected-class-measures-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-detected-class-measures-coordination-source-negative-control.v1.json) keeps accepted-looking detected class measures sourced only to this priority map blocked at `missing_accepted_detected_class_measures` with `accepted_without_evidence_source`.

The cross-section-comparisons probe is [finite-window-statistical-carrier-eq30-elastic-cross-section-comparisons-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-cross-section-comparisons-source-evidence-probe.v1.json). It marks the `elastic_ep` cross-section comparison accepted-looking while leaving $\rho_{\mathrm{exp}}$, form-factor samples, and the elastic-regime row at `attempt`. The checker reports `scoreDecision: no_score_increase` and `nextBlocker: missing_accepted_rho_exp`. The companion [finite-window-statistical-carrier-eq30-elastic-cross-section-comparisons-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-cross-section-comparisons-coordination-source-negative-control.v1.json) keeps the accepted-looking cross-section comparison sourced only to this priority map blocked at `missing_accepted_cross_section_comparisons` with `accepted_without_evidence_source`.

The exposure-distribution probe is [finite-window-statistical-carrier-eq30-elastic-rho-exp-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-rho-exp-source-evidence-probe.v1.json). It marks $\rho_{\mathrm{exp}}$ accepted-looking while leaving form-factor samples and the elastic-regime row at `attempt`. The checker reports `scoreDecision: no_score_increase` and `nextBlocker: missing_accepted_form_factor_samples`. The companion [finite-window-statistical-carrier-eq30-elastic-rho-exp-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-rho-exp-coordination-source-negative-control.v1.json) keeps accepted-looking $\rho_{\mathrm{exp}}$ sourced only to this priority map blocked at `missing_accepted_rho_exp` with `accepted_without_evidence_source`.

The form-factor-samples probe is [finite-window-statistical-carrier-eq30-elastic-form-factor-samples-source-evidence-probe.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-form-factor-samples-source-evidence-probe.v1.json). It marks the `q_low` and `q_mid` form-factor sample family accepted-looking while leaving the elastic-regime row at `attempt`. The checker reports `scoreDecision: no_score_increase`, `eq30FormFactorCovariancePassed: true`, and `nextBlocker: missing_accepted_elastic_regime`. The companion [finite-window-statistical-carrier-eq30-elastic-form-factor-samples-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-form-factor-samples-coordination-source-negative-control.v1.json) keeps accepted-looking form-factor samples sourced only to this priority map blocked at `missing_accepted_form_factor_samples` with `accepted_without_evidence_source`.

The probe-source negative control is [finite-window-statistical-carrier-eq30-elastic-phi-t-probe-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-phi-t-probe-source-negative-control.v1.json). It keeps `W` source-backed but points accepted-looking `Phi_T.sourcePath` at an existing `source-evidence-probe` fixture. The expected result is `no_score_increase`, with the blocker staying at `missing_accepted_Phi_T` and `reason: accepted_without_evidence_source`. This prevents toy files or source-evidence probes from becoming retained evidence sources.

The first accepted-looking source-missing control is [finite-window-statistical-carrier-eq30-elastic-source-missing-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-source-missing-negative-control.v1.json). It marks the `EQ-30` scattering and form-factor rows as accepted-looking and numerically passing, but points `W` at a missing source path. The checker must stop at `missing_accepted_W` with `reason: row_source_not_found`.

The coordination-source control is [finite-window-statistical-carrier-eq30-elastic-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/finite-window-statistical-carrier-eq30-elastic-coordination-source-negative-control.v1.json). It marks the same finite-window carrier rows as accepted-looking and numerically passing, but points `W` at this coordination map. The checker must still stop at `missing_accepted_W`, now with `reason: accepted_without_evidence_source`, `sourceReferenceExists=true`, and `sourceEvidenceReferenceExists=false`.

## Fail-Closed Controls

| Control | Expected failure |
| --- | --- |
| `finite_window.toy_status_import` | A toy fixture with passing numeric residuals remains blocked at `missing_accepted_W`. |
| `finite_window.source_missing` | Accepted-looking `W` with missing or non-durable source path fails at `row_source_not_found`; the `EQ-30` source-missing fixture exercises this control. |
| `eq31.pion_W_source_missing` | Accepted-looking charged-pion `W` with a missing parent source fails at `row_source_not_found` before width, lifetime, or branching fractions are interpreted. |
| `finite_window.coordination_source` | Accepted-looking `W` with a source path that resolves only to a priority/source-field map fails at `accepted_without_evidence_source`; the `EQ-30` coordination-source fixture exercises this control. |
| `eq31.K_det_coordination_source` | Accepted-looking detector-kernel row sourced only to this priority map fails at `accepted_without_evidence_source`; the `EQ-31` `K_det` coordination-source fixture exercises this control. |
| `eq31.top_carrier_coordination_source` | Accepted-looking top finite-window carrier sourced only to this priority map fails at `accepted_without_evidence_source`; accepted parent/corridor rows alone cannot retain the carrier. |
| `eq31.top_carrier_generic_durable_source` | Accepted-looking top finite-window carrier sourced to a durable generic reaction file fails at `carrier_source_contract_mismatch` unless carrier metadata declares retained top-carrier support. |
| `eq31.top_carrier_row_name_only_durable_source` | Accepted-looking top finite-window carrier sourced to a durable EQ-31 benchmark file fails at `carrier_source_contract_mismatch` unless carrier metadata declares both row identity and retained top-carrier support. |
| `eq30.B_coordination_source` | Accepted-looking outcome-partition row sourced only to this priority map fails at `accepted_without_evidence_source`; the `EQ-30` `B` coordination-source fixture exercises this control. |
| `eq30.S_retune_coordination_source` | Accepted-looking no-hidden-retune row sourced only to this priority map fails at `accepted_without_evidence_source`; the `EQ-30` `S_retune` coordination-source fixture exercises this control. |
| `eq30.Gamma_a_coordination_source` | Accepted-looking prepared-ensemble row sourced only to this priority map fails at `accepted_without_evidence_source`; the `EQ-30` `Gamma_a` coordination-source fixture exercises this control. |
| `eq30.Phi_in_coordination_source` | Accepted-looking flux-calibration row sourced only to this priority map fails at `accepted_without_evidence_source`; the `EQ-30` `Phi_in` coordination-source fixture exercises this control. |
| `eq30.detected_class_measures_coordination_source` | Accepted-looking detected-class-measures rows sourced only to this priority map fail at `accepted_without_evidence_source`; the `EQ-30` detected-class-measures coordination-source fixture exercises this control. |
| `eq30.cross_section_comparisons_coordination_source` | Accepted-looking cross-section comparison sourced only to this priority map fails at `accepted_without_evidence_source`; the `EQ-30` cross-section-comparisons coordination-source fixture exercises this control. |
| `eq30.rho_exp_coordination_source` | Accepted-looking exposure-distribution row sourced only to this priority map fails at `accepted_without_evidence_source`; the `EQ-30` $\rho_{\mathrm{exp}}$ coordination-source fixture exercises this control. |
| `eq30.form_factor_samples_coordination_source` | Accepted-looking form-factor sample rows sourced only to this priority map fail at `accepted_without_evidence_source`; the `EQ-30` form-factor-samples coordination-source fixture exercises this control. |
| `finite_window.probe_source` | Accepted-looking `Phi_T` with a source path that resolves only to a toy or source-evidence-probe file fails at `accepted_without_evidence_source`; the `EQ-30` `Phi_T` probe-source fixture exercises this control. |
| `eq14.measure_flow_split` | Density and current rows use different measure or flow ids; projection rows fail before continuity is interpreted. |
| `eq30.amplitude_import` | Imported amplitude or form factor passes comparison numbers without one finite-window pushforward; elastic projection fails. |
| `eq31.fitted_width` | Width, lifetime, or branching fractions are fitted independently of corridor measures; resonance projection fails. |

## Current Disposition

The next implementation should either add an `EQ-30` elastic-regime source-evidence probe or continue sharpening the retained top-carrier source contract for `EQ-31` before any accepted top-carrier fixture exists. The `EQ-31` parent-carrier ladder now advances through `C`; an accepted-looking top carrier sourced only to this map fails at `accepted_without_evidence_source`, and generic or row-name-only durable sources fail at `carrier_source_contract_mismatch` until metadata declares both row identity and retained top-carrier support. The `EQ-30` ladder advances through form-factor samples and stops at `missing_accepted_elastic_regime`. No retained finite-window carrier is closed until all parent carrier rows, the top carrier, and row-specific projection rows are accepted from durable evidence sources.

No score changes.
