# EQ-02 Through EQ-04 S_eq Retained-Domain Evidence Object

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Score ladder: [Equation Score-5 Closure Ladder](equation-score-5-closure-ladder.md)
- Common architecture: [Equation Common Architecture 2026-06-23 C](equation-common-architecture-2026-06-23-c.md)
- Prior merge: [Equation Closure Pass 2026-06-25 A](equation-closure-pass-2026-06-25-a.md)
- Claim level: smallest accepted retained-domain evidence object for `EQ-02` through `EQ-04`
- Promotion status: priority-only

## Equation Attack Card

- Current score effect: no score change; this is a priority-only retained-domain evidence-object contract.
- Exact first blocker: `missing_accepted_raw_labeled_rows_preserved_on_retained_history`.
- First accepted route: source-backed positive-width invariant-cell source report for `S_eq`, with matching `domainId`, `commonCarrierId`, `supportId`, and `retainedRowSetId: "S_eq"` across support, row bindings, witnesses, coframe extraction, and retained-record consumption.
- Smallest accepted evidence object: one durable retained-geometry evidence object whose raw-row, invariant-cell, refinement-step, connection, residual, and negative-control provenance is accepted by the producer, same-branch checker, and retained-record evaluator on the same carrier.
- Score-neutral exclusions: priority prose, generated files, mocks, attempt fixtures, source-contract shells, negative controls, synthetic provenance shells, and accepted-looking row labels are not accepted retained evidence.

## Coordinator Decision

The 2026-06-25 bucket review chose Bucket A as the single implementation target. The chosen object is not another checker, score row, or broad report. It is the minimum source-backed retained-domain packet that can replace the attempt fixture for `S_eq` and make the existing same-branch and retained-record evaluators consume accepted evidence without changing their acceptance rules.

The packet target is:

$$
\left(
B_N,\Sigma_N,P_N,\mathcal K_{P_N}
\right)
\longrightarrow
\mathfrak D_{S_{\mathrm{eq}}}^{02\text{-}04}
\longrightarrow
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u_k)
\longrightarrow
\Theta_{02\text{-}04}^{\mathrm{bin}}(u_k).
$$

Here $B_N\subset\Sigma_N$ must be a positive-width invariant cell in the truncated delay-state space, not a single sampled crossing. The retained-domain packet becomes score-review eligible only when all accepted row bindings, witnesses, and coframe extraction rows resolve to durable source evidence on the same `domainId`, `commonCarrierId`, `supportId`, and `retainedRowSetId: "S_eq"`.

## Bucket Merge

| Bucket | Smallest proposed evidence object | First blocker | Coordinator disposition |
| --- | --- | --- | --- |
| A | Source-backed `S_eq` retained-domain fixture for `EQ-02` through `EQ-04`. | `missing_accepted_raw_labeled_rows_preserved_on_retained_history` | Chosen. This is the highest-priority accepted-evidence carrier and tests the common retained-domain acceptance vector directly. |
| B | Retained $\Theta_{\mathrm{sea}}^{(\ell,W)}$ density-compression coefficient bundle with $\delta c_X^2$ and stress/strain output first. | Accepted provider-backed density and output-projection route; predictive downstream child physics open. | Already consumed by downstream Noether sea and shared-observation routes; still lower priority than the retained-domain carrier for this packet. |
| C | Native Compton/recoil event packet on `eventId: "e_gamma_e_0"`. | `missing_accepted_photon_gate_A_input_output` | Defer. Strong second target; it should follow Bucket A unless the solver lane produces native event rows first. |
| D | Finite-window statistical carrier $\mathcal C_{\mathrm{stat}}^{W,T}$ for probability, entropy, scattering, and resonance rows. | `missing_accepted_W` | Defer. Safe as a packet, but it still needs a retained window and refinement/cocycle source evidence. |
| E | Shared observation record $\mathcal R_{\mathrm{obs}}(\Theta_{\mathrm{obs}})$. | Accepted score-neutral parent with populated growth, matter-power, lensing, shear/RSD, halo/cluster, nonlinear, and galaxy-response children. | Consumed after Bucket B populated. The next work is score-review transfer, CMB transfer/blackbody/acoustic, or BBN source-window physics without creating a private observation ledger. |

No scores change. This packet still does not supply the Bucket A retained-domain evidence object; later Bucket B and Bucket E artifacts are downstream score-neutral successes, not score movement for this packet.

## Exact First Blocker

The first score-review blocker is:

```text
missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

This row is first because the accepted support and row identity must be proven before the clock, envelope, energy, momentum, shell, phase, or Noether sea rows can be read as common-carrier evidence. The row cannot be accepted as a label list by itself. It is accepted only as a raw-label identity row on the certified positive-width invariant cell.

The current score-neutral executable state is:

| Evaluator | Current status | Reason no score changes |
| --- | --- | --- |
| [check-same-branch-chart-identity.mjs](../../../scripts/equation-mapping/check-same-branch-chart-identity.mjs) | `blocked_missing_retained_event_or_domain` | The direct retained-domain attempt has no accepted retained identity requirements. |
| [eq02-04-translating-binary-retained-record.mjs](../../../scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs) | `blocked_same_branch_identity` | The retained-record rows and witnesses remain attempt-level, and `coframeExtraction` is not evaluated. |
| [produce-eq02-04-coframe-extraction-certificate.mjs](../../../scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs) | fail-closed producer | The current source report is attempt-level and lacks accepted invariant-cell, refinement, source, and connection evidence. |

The producer summary now reports `nextBlockerDetails` and the first eight `leadingFailedCheckDetails`. This does not change the acceptance contract. It makes the current first source-backed gaps explicit:

```sh
node scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs \
  --input scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-attempt.v1.json \
  --summary --pretty --no-retained-record
```

The all-attempt source still reports `status: blocked`, `scoreDecision: no_score_increase`, and `nextBlocker: source_status`. Its leading failed details show `sourceStatus: attempt`, missing calibrated evidence-scale fields, placeholder-like carrier/domain/support ids, and the first row binding with `statusAccepted: false` and `rowIdConcrete: false`.

```sh
node scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs \
  --input scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-row-binding-negative-control.v1.json \
  --summary --pretty --no-retained-record
```

The accepted-looking row-binding negative control still reports `status: blocked`, `scoreDecision: no_score_increase`, and `nextBlocker: row_binding_raw_labeled_rows_preserved_on_retained_history`. Its `nextBlockerDetails` gives `reason: row_binding_not_source_bound_object`, so the first accepted row cannot be a bare `accepted` label. It must be a structured source-bound row object with accepted status, concrete non-placeholder `rowId`, matching `retainedRowSetId`, `commonCarrierId`, `domainId`, `supportId`, and a durable source reference.

### First Row Object Contract

The first score-review-eligible row object is eligible only if both the source producer and same-branch checker accept the same row identity. For `raw_labeled_rows_preserved_on_retained_history`, that means the row object must satisfy the current executable checks below; satisfying only the prose meaning of the row is not enough.

| Check | Required value |
| --- | --- |
| Object form | A structured object, not the string `accepted`, `passed`, or `populated`. |
| Accepted status | `status` is one of `accepted`, `passed`, or `populated`. |
| Row identity | `rowId` is concrete and does not include `attempt`, `pending`, `placeholder`, `mock`, `toy`, `/tmp/`, `/private/tmp/`, or `content/generated/`. |
| Retained row set | `retainedRowSetId` equals `S_eq`. |
| Carrier binding | `commonCarrierId` equals the retained-domain packet `commonCarrierId`. |
| Domain binding | `domainId` equals the retained-domain packet `domainId`. |
| Support binding | `supportId` equals the certified invariant support id. |
| Source reference | `sourcePath` or `source` resolves to an existing durable retained-evidence file in the repository; priority prose, review packets, authored AAA prose, attempts, mocks, probes, source-contract shells, and negative controls do not count as evidence sources. |

The same-branch checker then reads that row as accepted only if its accepted status, source-evidence reference, retained-row-set identity, support identity, and common-carrier identity all match the retained-domain packet. Therefore the first accepted row must be emitted from the same positive-width invariant-cell source report that emits the support; it cannot be copied from priority prose, a review packet, a generated reading copy, a temp file, an attempt fixture, a source-contract shell, a negative control, or a row-only fixture.

## Direct Geometry Layer

This layer maps the first retained-domain evidence object to the geometry that must be source-backed before any `EQ-02` through `EQ-04` score review. It does not let current solver-proxy rows, a row-only accepted label, or a reciprocal coframe arithmetic fixture replace the positive-width invariant-cell source report.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Positive-width invariant support $B_N\subset\Sigma_N$ with $\mathcal K_{P_N}(B_N)\subset B_N$ | Retained support cell for the whole `S_eq` row set. | `domain`, `supportId`, invariant-cell certificate, refinement family | `domainId`, `commonCarrierId`, `supportId`, and `retainedRowSetId: "S_eq"` are shared by every row binding and witness. | `window_length`, `section_relocation`, and `transverse_displacement` reject sampled crossings or unstable section choices. | Source-backed positive-width invariant-cell report with calibrated support and refinement persistence. |
| Raw generator labels before `I:M:O` role mapping | `raw_labeled_rows_preserved_on_retained_history` identity readout on the retained history. | first accepted row binding, retained raw labels, source producer output | Raw labels, retained domain, support id, common carrier, and source path are emitted by the same source report. | `row_binding_raw_labeled_rows_preserved_on_retained_history` rejects bare `accepted` labels and row-only fixtures. | Structured accepted first-row object with concrete `rowId`, matching ids, and durable source reference. |
| Six-body polarity-neutral inventory and role/quotient policy | Inventory and role-policy readout before downstream carrier rows are interpreted. | `six_body_polarity_neutral_inventory_preserved`, `role_map_selected_or_quotient_policy_declared` | Inventory rows, role policy, raw labels, and retained-domain support share one `S_eq` packet identity. | `phase_permutation` rejects label or phase permutations that change the retained row set. | Accepted inventory and role-policy rows on the same positive-width domain. |
| Path-history, causal-root, wake-tail, energy/action, momentum/angular-momentum, and phase rows | Retained row-family readout that later feeds the translating-binary residual. | row bindings for path history, causal roots, wake tail, energy/action, momentum/angular momentum, and phase | Every row family cites the same retained domain, event/history support, source report, split witness, and retune witness. | Current-proxy and source-copy controls reject solver row alignment without retained accepted row bindings. | Accepted row-family bindings emitted from the same invariant-cell source report. |
| Retained plane orientation, response center, group velocity, and Noether sea record | Geometric orientation and local medium readouts for the retained carrier. | orientation rows, response-center/group-velocity rows, `Noether_sea_record_bound_to_S_eq` | Plane orientation, response center, group velocity, and Noether sea rows bind to the same support and cannot be imported from a separate response fit. | `medium_response_compensator` rejects Noether sea response used as a compensating fit. | Accepted orientation, response-center/group-velocity, and Noether sea row bindings. |
| Gamma-free coframe and connection source | Extracted coframe and connection readout from causal-root and wake-return rows, not from Lorentz targets. | coframe source, `extractionBasis`, connection source, $W_{\mathrm{hol}}$ handoff | Coframe legs, connection, support transport, holonomy transport, and row bindings all cite the same invariant support. | `reciprocal_unextracted_coframe`, `gamma_inserted_coframe`, and `holonomy_retune` reject reciprocal or target-inserted coframes. | Accepted gamma-free coframe extraction plus connection source on the same support. |
| $\mathcal S_{\mathrm{root}}=0$, $\mathcal S_{\mathrm{retune}}=0$, and overlap-preimage identity | Same-root, no-hidden-retune, and overlap-preimage witnesses for the retained-domain packet. | `split_witness_zero`, `retune_witness_zero`, `overlap_preimage_identity`, calibrated negative controls | Witnesses, negative controls, accept band, noise floors, and refinement steps use the same source report and support id. | Margin/refinement/connection negative controls must fail above the declared accept band. | Source-backed retained-domain packet whose producer, same-branch checker, and retained-record evaluator all consume the same accepted carrier. |

The first concrete artifact for this lane is the blocked source-backed shell:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs \
  --input scripts/equation-mapping/same-branch-retained-domain-blocked-source-shell.v1.json \
  --summary --pretty
```

It returns `schemaOk: true`, `status: blocked_missing_retained_event_or_domain`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_raw_labeled_rows_preserved_on_retained_history`. All retained identity row bindings in that shell are explicitly `blocked`, not accepted. The fixture path is [same-branch-retained-domain-blocked-source-shell.v1.json](../../../scripts/equation-mapping/same-branch-retained-domain-blocked-source-shell.v1.json).

The compact summary also reports the first retained-domain blocker details:

```json
{
  "id": "raw_labeled_rows_preserved_on_retained_history",
  "status": "blocked",
  "reason": "row_not_accepted",
  "rowId": "raw_labeled_rows_preserved_on_retained_history_blocked_source_shell",
  "sourcePath": "reference/priorities/equation-mapping/eq-02-04-s-eq-retained-domain-evidence-object.md",
  "sourceReferenceExists": true,
  "sourceEvidenceReferenceExists": false
}
```

The older direct attempt reports the same blocker with `status: attempt`, `reason: row_not_accepted`, `rowId: raw_labeled_rows_attempt`, and source path [eq-02-04-translating-binary-shared-record-instantiation.md](eq-02-04-translating-binary-shared-record-instantiation.md). This confirms that neither the blocked source shell nor the direct attempt has crossed the first accepted-retained-row boundary.

The accepted-looking coordination-source negative control makes the source-evidence boundary explicit:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs \
  --input scripts/equation-mapping/same-branch-retained-domain-coordination-source-negative-control.v1.json \
  --summary --pretty
```

It reports `status: blocked_missing_retained_event_or_domain`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_raw_labeled_rows_preserved_on_retained_history` even though every retained row and witness in the fixture is marked `accepted`. The first blocker detail is:

```json
{
  "id": "raw_labeled_rows_preserved_on_retained_history",
  "status": "accepted",
  "reason": "accepted_without_evidence_source",
  "rowId": "raw_labeled_rows_preserved_on_retained_history_coordsrc_0001",
  "sourcePath": "reference/priorities/equation-mapping/eq-02-04-s-eq-retained-domain-evidence-object.md",
  "sourceReferenceExists": true,
  "sourceEvidenceReferenceExists": false
}
```

This proves that a priority coordination file can document the target but cannot satisfy the first retained-domain row.

The retained-record evaluator now exposes that same first blocker at top-level `summary.nextBlockerDetails`, so the retained-record target and the same-branch checker identify the same missing accepted row:

```sh
node scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs \
  --input scripts/equation-mapping/eq02-04-translating-binary-retained-record-blocked-source-shell.v1.json \
  --summary --pretty
```

```json
{
  "id": "same_branch_identity",
  "status": "blocked_missing_retained_event_or_domain",
  "reason": "missing_accepted_raw_labeled_rows_preserved_on_retained_history",
  "blocker": "missing_accepted_raw_labeled_rows_preserved_on_retained_history",
  "blockerDetails": {
    "id": "raw_labeled_rows_preserved_on_retained_history",
    "status": "blocked",
    "reason": "row_not_accepted",
    "rowId": "raw_labeled_rows_preserved_on_retained_history_blocked_source_shell",
    "sourcePath": "reference/priorities/equation-mapping/eq-02-04-s-eq-retained-domain-evidence-object.md",
    "sourceReferenceExists": true,
    "sourceEvidenceReferenceExists": false
  }
}
```

The fixture [eq02-04-translating-binary-retained-record-blocked-source-shell.v1.json](../../../scripts/equation-mapping/eq02-04-translating-binary-retained-record-blocked-source-shell.v1.json) deliberately leaves retained-record rows, witnesses, diagnostics, and negative controls unpopulated. Its only job is to make the retained-record evaluator consume the existing blocked same-branch shell and fail closed at the first accepted-row boundary. The same command with `--require-populated` exits nonzero because the status remains `blocked_same_branch_identity`.

The repo-local source search found review material that defines the needed object, but no dormant accepted source report that can be wired directly. The invariant-cell source review packet [andrey-kolmogorov-eq02-04-invariant-cell-source-report-2026-06-24.md](../../entourage/review-packets/andrey-kolmogorov-eq02-04-invariant-cell-source-report-2026-06-24.md) and retained-evidence response [andrey-kolmogorov-eq02-04a-retained-evidence-response-2026-06-24.md](../../entourage/review-packets/andrey-kolmogorov-eq02-04a-retained-evidence-response-2026-06-24.md) both identify the next accepted object as a positive-width return-map certificate $B_N\subset\Sigma_N$ with $\mathcal K_{P_N}(B_N)\subset B_N$, refinement persistence, calibrated negative controls, and the retained rows evaluated only on that enclosed support. The coframe review packet [henri-poincare-eq02-04-invariant-cell-coframe-certificate-2026-06-24.md](../../entourage/review-packets/henri-poincare-eq02-04-invariant-cell-coframe-certificate-2026-06-24.md) likewise treats the current reciprocal coframe arithmetic as insufficient until it is replaced by accepted wake-return extraction evidence on the same invariant support. Those files are source-contract and review material, not retained-domain evidence objects.

### 2026-06-26 Bucket A Worker Constraint

A Bucket A worker rerun on 2026-06-26 found no existing durable source or evidence file that can safely populate the first accepted `raw_labeled_rows_preserved_on_retained_history` object under the current executable contract. The same-branch attempt and blocked-source shell both remain `blocked_missing_retained_event_or_domain`; their `--require-accepted` forms exit nonzero with `nextBlocker: missing_accepted_raw_labeled_rows_preserved_on_retained_history`. The retained-record attempt and blocked-source shell both remain `blocked_same_branch_identity`; their `--require-populated` forms exit nonzero with the same inherited blocker.

The coframe-source attempt still fails first at `source_status`, and its leading raw-row detail reports `statusAccepted: false` and `rowIdConcrete: false`. The accepted-looking row-binding negative control still fails first at `row_binding_raw_labeled_rows_preserved_on_retained_history` with `reason: row_binding_not_source_bound_object`; a bare string `accepted` is therefore not a retained row object. A sweep of all `eq02-04-invariant-cell-coframe-source-*.v1.json` fixtures found only blocked producer outputs:

| Fixture family | First producer blocker |
| --- | --- |
| `attempt` | `source_status` |
| `connection-holonomy-transport-negative-control` | `connection_holonomy_transport_residual_bound` |
| `connection-phase-holonomy-negative-control` | `connection_phase_holonomy_bound` |
| `connection-torsion-negative-control` | `connection_torsion_bound` |
| `durable-source-shell` | `source_support_field_evidence_sources` |
| `external-provider-shell` | `source_support_field_evidence_sources` |
| `extraction-basis-gamma-negative-control` | `extraction_basis_gamma_free` |
| `margin-negative-control` | `negative_control_window_length_margin_calibrated` |
| `refinement-negative-control` | `refinement_persistence` |
| `refinement-step-negative-control` | `refinement_persistence_step_sources` |
| `refinement-support-id-negative-control` | `refinement_persistence_support_id_stability` |
| `row-binding-negative-control` | `row_binding_raw_labeled_rows_preserved_on_retained_history` |
| `shell-negative-control` | `support_B_N_certified` |
| `source-evidence-negative-control` | `source_path_evidence` |

The inventory found `status: accepted` raw-row-looking objects only inside fixtures whose `claimLevel` explicitly says negative control, score-neutral, and not evidence. Those objects cannot be transplanted into the retained-domain shell because they do not supply an accepted positive-width invariant support with the same `domainId`, `commonCarrierId`, `supportId`, and `retainedRowSetId: "S_eq"`, and each fixture is already caught by a deliberate fail-closed producer check.

The next concrete implementation target is unchanged and narrower than a generic gate: produce one source-backed positive-width invariant-cell source report whose first row binding is a structured accepted object for `raw_labeled_rows_preserved_on_retained_history`, with concrete non-placeholder `rowId`, matching `domainId`, `commonCarrierId`, `supportId`, `retainedRowSetId: "S_eq"`, and a durable source path. That object is eligible only after the same source report also supplies calibrated support, refinement, evidence-scale, connection, residual, and negative-control fields strong enough for the producer to pass.

### 2026-06-26 Overnight Coordinator Merge

The 2026-06-26 overnight team-agent run found no accepted retained evidence object in any bucket. The coordinator keeps Bucket A as the single evidence implementation target for this cycle because it is first in priority order and because the retained-domain row is the earliest accepted-support boundary shared by `EQ-02` through `EQ-04`.

| Bucket | Smallest accepted evidence object proposed | Current first blocker | Coordinator result |
| --- | --- | --- | --- |
| A | Source-backed positive-width `S_eq` invariant-cell source report with accepted `raw_labeled_rows_preserved_on_retained_history`. | `missing_accepted_raw_labeled_rows_preserved_on_retained_history` | Chosen evidence target. The current packet records the closure contract; the source report still has to be built from durable retained-domain evidence. |
| C | Native Compton/recoil event ledger on `eventId: "e_gamma_e_0"` with accepted Gate A photon input/output rows. | `missing_accepted_photon_gate_A_input_output` | Defer as second target. The comparison replay closes numerically, but Gate A remains attempt-level and source-backed photon packet rows are not accepted. |
| B | Retained Noether sea density-compression bundle with accepted `rho_NS`, `n`, `u_sea`, `e_sea`, `theta_sea`, `f_N`, support, agreement, and zero-retune rows. | Accepted provider-backed density and output-projection route; predictive downstream child physics open. | Consumed by downstream `EQ-24`, `EQ-20`, `EQ-11`, `theta_W`, `delta_a_star`, and shared-observation routes without changing this packet's Bucket A priority. |
| D | Source-backed finite-window statistical carrier family headed by accepted `W`. | `missing_accepted_W`; `EQ-25` also reports `missing_accepted_theta_therm` | Defer. The existing finite-window fixtures are toy or attempt carriers, even where numeric diagnostics pass. |
| E | Shared observation record $\Theta_{\mathrm{obs}}$ with accepted projection families and shared keys. | Accepted score-neutral parent with populated growth, matter-power, lensing, shear/RSD, halo/cluster, nonlinear, and galaxy-response children. | Consumed after Bucket B populated. The next work is score-review transfer, CMB transfer/blackbody/acoustic, or BBN source-window physics without creating a private observation ledger. |

The implemented artifact in this pass is this precise closure packet, not a score row. The first accepted-retained-evidence implementation remains the Bucket A source report described below: one durable source-backed positive-width invariant-cell evidence object whose accepted row bindings satisfy the executable producer, same-branch checker, and retained-record evaluator on the same carrier.

## Required Source-Backed Fields

The accepted retained-domain fixture must include these top-level fields:

| Field family | Required accepted content |
| --- | --- |
| Carrier identity | Concrete `commonCarrierId`, `domainId`, `supportId`, and `retainedRowSetId: "S_eq"` shared by every accepted row binding and witness. |
| Domain support | `domain.status` in `accepted`, `passed`, or `populated`; concrete `domain.id`, `domain.kind`, `domain.rowId`; durable `sourcePath` or `source`; positive transverse width; return inclusion data. |
| Invariant-cell certificate | $B_N$, $\Sigma_N$, $P_N$, $\mathcal K_{P_N}$, memory depth $N$, truncation error, transversality margin, return time, and map norm or inclusion bound. |
| Refinement persistence | At least three source-backed refinement steps with decreasing $h$, increasing $N$, stable `supportId`, bounded support-set drift, and convergent scalar residuals. |
| Evidence scale | `acceptBand`, `arithmeticNoiseFloor`, `truncationNoiseFloor`, and `negativeMarginFactor > 1`, with the accept band above the combined noise floor and negative-control margins above the declared threshold. |
| Gamma-free coframe source | `extractionBasis` using only $c_f$, $u$, causal-root rows, wake-return rows, and retained boundary history; extracted legs $e^0_u$, $e^\parallel_u$, and $e^\perp_u$; no $\gamma_f$, Lorentz target, mass-shell target, or fitted row inputs. |
| Connection source | $\omega^A{}_{B,u}$ status, torsion bound, phase holonomy $\Phi_{T^2}(u)$, support-transport residual, and holonomy-transport residual on the same support. |

Every accepted row binding must include concrete `rowId`, `status`, matching `retainedRowSetId`, matching `commonCarrierId`, matching `domainId`, matching `supportId`, and a durable source reference that resolves to an evidence file in the repository.

The producer now distinguishes a durable source reference from an evidence source reference. A retained-domain source path is not evidence if it lives under `reference/priorities/`, `reference/entourage/`, or `content/markdown/aaa/`, or if the basename marks an attempt, toy, probe, mock, or negative control. It is also not evidence when a support field, row binding, or refinement step points back to the source report being evaluated; self-referential source shells fail with `source_path_is_input_report` rather than counting their own accepted-looking fields as retained geometry. Separate JSON files are not enough either: backing sources for support fields, row bindings, and refinement steps must be retained-geometry evidence records with their own raw-row, invariant-cell, and refinement-step provenance records rather than arbitrary durable provider shells, syntactic payloads, or provenance records that identify themselves as synthetic, fixture, shell, attempt, toy, probe, mock, negative-control, score-neutral, or not evidence. This preserves focused negative-control fixtures while preventing an accepted-looking shell from passing merely because its JSON file exists.

## Missing Accepted Rows

The `S_eq` identity packet is not populated until these row bindings are accepted on the same retained domain:

| Row binding | Role in the evidence object |
| --- | --- |
| `raw_labeled_rows_preserved_on_retained_history` | Current first blocker; proves raw generator labels are preserved before any `I:M:O` role map or quotient policy is imposed. |
| `six_body_polarity_neutral_inventory_preserved` | Preserves six-body polarity-neutral inventory on the same support. |
| `role_map_selected_or_quotient_policy_declared` | Declares the retained nested-role map or the quotient policy that keeps raw labels role-neutral. |
| `shared_retained_event_or_positive_width_domain` | Binds every row to the same retained event or positive-width domain. |
| `path_history_rows_bound_to_S_eq` | Binds path-history rows to `S_eq`. |
| `causal_root_ledger_rows_bound_to_S_eq` | Binds causal-root ledger rows to the same support. |
| `wake_tail_rows_bound_to_S_eq` | Binds wake-tail rows to the same support. |
| `energy_action_rows_bound_to_S_eq` | Binds energy/action rows to the same support. |
| `momentum_and_angular_momentum_rows_bound_to_S_eq` | Binds momentum and angular-momentum rows to the same support. |
| `phase_rows_bound_to_S_eq` | Binds phase rows, including equal-frequency common-clock rows where present, to the same support. |
| `retained_plane_orientation_rows_bound_to_S_eq` | Binds oriented-bivector sector rows, Gram data, conditioning, and derived normals when needed. |
| `response_center_and_group_velocity_rows_bound_to_S_eq` | Binds response-center and group-velocity rows to the same support. |
| `Noether_sea_record_bound_to_S_eq` | Binds the local Noether sea row to the same retained domain. |
| `binary_to_binary_phase_row_set_identity` | Preserves binary-to-binary phase row-set identity on the same retained domain. |

After those identity rows are accepted, the retained-record evaluator still needs accepted rows for `common_carrier`, `retained_branch_chart`, `root_starvation_row`, `same_root_conservation_row`, `same_branch_chart_identity`, `gamma_free_coframe_row`, `clock_row`, `envelope_row`, `two_way_signal_row`, `energy_row`, `exposure_row`, `momentum_row`, `rest_mass_row`, `mass_shell_row`, and `medium_response_row`.

## Fail-Closed Negative Controls

The retained-domain fixture must fail closed against these controls:

| Control | Required failure mode |
| --- | --- |
| `window_length` | A sampled crossing must not masquerade as retained support when the return window changes. |
| `section_relocation` | Support must not pass if the section placement is moved outside the certified cell. |
| `transverse_displacement` | Off-cell perturbation must escape or violate the inclusion unless it remains inside the certified invariant cell. |
| `phase_permutation` | Binary label or phase permutation must break row identity when it changes the retained row set. |
| `reciprocal_unextracted_coframe` | Reciprocal coframe legs without accepted wake-return extraction source must fail. |
| `holonomy_retune` | Reciprocal row sections that are not parallel transports of one reference section must fail. |
| `gamma_inserted_coframe` | Any coframe constructed from $\gamma_f$, Lorentz targets, shell residuals, or fitted clock/envelope rows must fail. |
| `clock_only_retune` and `envelope_only_retune` | A private clock or envelope fit must not satisfy same-carrier closure. |
| `velocity_dependent_rest_mass` | Velocity-dependent rest mass cannot close `EQ-04`. |
| `medium_response_compensator` | Noether sea response may not be used as a compensating fit for a failed coframe. |

The current source-producer sweep keeps every accepted-looking source fixture fail-closed. The replay command runs [produce-eq02-04-coframe-extraction-certificate.mjs](../../../scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs) with `--summary --no-retained-record` over each `eq02-04-invariant-cell-coframe-source-*.v1.json` fixture:

```text
node scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs \
  --input scripts/equation-mapping/<source-fixture>.v1.json \
  --summary --no-retained-record
```

| Fixture | Status | First blocker |
| --- | --- | --- |
| `eq02-04-invariant-cell-coframe-source-attempt.v1.json` | `blocked` | `source_status` |
| `eq02-04-invariant-cell-coframe-source-connection-holonomy-transport-negative-control.v1.json` | `blocked` | `connection_holonomy_transport_residual_bound` |
| `eq02-04-invariant-cell-coframe-source-connection-phase-holonomy-negative-control.v1.json` | `blocked` | `connection_phase_holonomy_bound` |
| `eq02-04-invariant-cell-coframe-source-connection-torsion-negative-control.v1.json` | `blocked` | `connection_torsion_bound` |
| `eq02-04-invariant-cell-coframe-source-extraction-basis-gamma-negative-control.v1.json` | `blocked` | `extraction_basis_gamma_free` |
| `eq02-04-invariant-cell-coframe-source-margin-negative-control.v1.json` | `blocked` | `negative_control_window_length_margin_calibrated` |
| `eq02-04-invariant-cell-coframe-source-refinement-negative-control.v1.json` | `blocked` | `refinement_persistence` |
| `eq02-04-invariant-cell-coframe-source-refinement-step-negative-control.v1.json` | `blocked` | `refinement_persistence_step_sources` |
| `eq02-04-invariant-cell-coframe-source-refinement-support-id-negative-control.v1.json` | `blocked` | `refinement_persistence_support_id_stability` |
| `eq02-04-invariant-cell-coframe-source-row-binding-negative-control.v1.json` | `blocked` | `row_binding_raw_labeled_rows_preserved_on_retained_history` |
| `eq02-04-invariant-cell-coframe-source-shell-negative-control.v1.json` | `blocked` | `support_B_N_certified` |
| `eq02-04-invariant-cell-coframe-source-durable-source-shell.v1.json` | `blocked` | `source_support_field_evidence_sources` |
| `eq02-04-invariant-cell-coframe-source-external-provider-shell.v1.json` | `blocked` | `source_support_field_evidence_sources` |
| `eq02-04-invariant-cell-coframe-source-source-evidence-negative-control.v1.json` | `blocked` | `source_path_evidence` |

Historical false-positive replay: before the content-aware source/provenance guards, [eq02-04-invariant-cell-coframe-source-source-evidence-negative-control.v1.json](../../../scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-source-evidence-negative-control.v1.json) returned accepted-looking checker statuses even though every support, row-binding, and refinement-step source path pointed at a negative-control file. Current hardened behavior is blocked, with the producer blocker propagated; these shells are fail-closed controls, not retained evidence.

The next producer loophole was a rename/self-source shell: [eq02-04-invariant-cell-coframe-source-durable-source-shell.v1.json](../../../scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-durable-source-shell.v1.json) used accepted statuses, concrete ids, populated invariant-cell fields, accepted row bindings, accepted refinement steps, zero connection residuals, and source paths that all pointed back to the same source report. Before the self-reference guard, the producer returned `status: accepted`, `failedChecks: []`, and `nextBlocker: null`. After the guard, it returns `status: blocked`, `nextBlocker: source_support_field_evidence_sources`, with support-field source details reporting `sourceSelfReference: true` and `reason: source_path_is_input_report`.

The next shell class was a non-self external provider: [eq02-04-invariant-cell-coframe-source-external-provider-shell.v1.json](../../../scripts/equation-mapping/eq02-04-invariant-cell-coframe-source-external-provider-shell.v1.json) points all support fields, row bindings, and refinement steps to [eq02-04-retained-geometry-provider-shell.v1.json](../../../scripts/equation-mapping/eq02-04-retained-geometry-provider-shell.v1.json). Before content-aware source validation, the producer returned `status: accepted`, `failedChecks: []`, and `nextBlocker: null`; [same-branch-retained-domain-external-provider-shell.v1.json](../../../scripts/equation-mapping/same-branch-retained-domain-external-provider-shell.v1.json) also returned `status: accepted`, `retainedBranchClaim: true`, and `nextBlocker: null`. The provider was then sharpened to use the retained-geometry source schema, accepted identity fields, accepted-looking raw retained rows, positive-width invariant-cell fields, and three refinement steps. Before the provenance guard, that syntactic payload again made the producer and same-branch checker accept the route. The provider was then pointed at [eq02-04-retained-geometry-provenance-shell.v1.json](../../../scripts/equation-mapping/eq02-04-retained-geometry-provenance-shell.v1.json), which uses the retained-geometry provenance schema and accepted identity fields. An empty version of that provenance shell failed at `source_retained_geometry_provenance_payload_missing`; after the shell was sharpened with accepted-looking target-specific provenance records, the producer again returned `status: accepted`, `failedChecks: []`, and `nextBlocker: null`, and the same-branch packet again returned `status: accepted`, `retainedBranchClaim: true`, and `nextBlocker: null`. After disclaimed/synthetic provenance hardening, the producer returns `status: blocked`, `nextBlocker: source_support_field_evidence_sources`, and source details report `reason: source_provenance_payload_disclaimed_or_synthetic`. The same-branch packet now returns `status: blocked_missing_retained_event_or_domain`, `nextBlocker: missing_accepted_raw_labeled_rows_preserved_on_retained_history`, and propagates the producer blocker `source_support_field_evidence_sources`.

This sweep confirms that the accepted-looking row objects inside the negative controls are not retained evidence. They remain useful only as fail-closed controls for the future positive-width `S_eq` invariant-cell fixture.

The same-branch source-evidence guardrail is separate from the producer sweep. The fixture [same-branch-retained-domain-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/same-branch-retained-domain-coordination-source-negative-control.v1.json) proves that accepted-looking `S_eq` rows and witnesses still fail when their source path is a priority coordination file rather than retained evidence. Its first blocker is still `missing_accepted_raw_labeled_rows_preserved_on_retained_history`, with `reason: accepted_without_evidence_source`.

The sibling fixture [same-branch-retained-domain-durable-source-shell.v1.json](../../../scripts/equation-mapping/same-branch-retained-domain-durable-source-shell.v1.json) proves that the same-branch checker cannot accept an otherwise accepted-looking `S_eq` packet merely because its rows point to a JSON source report under `scripts/equation-mapping/`. Before the producer-backed source check, that fixture returned `status: accepted`, `retainedBranchClaim: true`, and `nextBlocker: null`. After hardening, it returns `status: blocked_missing_retained_event_or_domain` and `nextBlocker: missing_accepted_raw_labeled_rows_preserved_on_retained_history`; the blocker detail reports `sourceEvidenceReason: source_report_not_producer_accepted` and `sourceEvidenceProducerNextBlocker: source_support_field_evidence_sources`.

## Accepted Retained Evidence Route

The first score-review-eligible event is not the creation of this packet. It is a future source-backed fixture that makes both commands pass on the same carrier:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs \
  --input scripts/equation-mapping/<source-backed-S_eq-fixture>.json \
  --summary --pretty --require-accepted
```

```sh
node scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs \
  --input scripts/equation-mapping/<matching-retained-record>.json \
  --summary --pretty --require-populated
```

The minimum accepted-retained-evidence result must report:

- accepted invariant support, raw row identity, row bindings, overlap preimage, zero split witness, zero hidden-retune witness, and lane residual on one retained domain;
- accepted gamma-free coframe extraction and $W_{\mathrm{hol}}=0$ on the same support;
- calibrated negative controls that fail above the declared accept band;
- no private speed convention, branch label, Noether sea state, exposure coefficient, detector/readout kernel, or fitted residual per row.

Only then should `EQ-02`, `EQ-03`, or `EQ-04` be reviewed for score review. `EQ-04A` remains downstream and cannot use Koide as an input to this acceptance object.

## No-Score-Change Statement

This packet changes no scores and promotes no reader-facing corpus prose. It defines the smallest accepted evidence object for the retained-domain lane and keeps every current attempt, toy, comparison-only, and checker-only row score-neutral until durable source-backed retained evidence lands.

## Ranked Next Actions

1. Populate a source-backed positive-width invariant-cell certificate for `S_eq` with $B_N$, $\Sigma_N$, $P_N$, $\mathcal K_{P_N}$, refinement persistence, calibrated evidence scale, and durable per-step sources.
2. Attach `raw_labeled_rows_preserved_on_retained_history` to that cell as the first accepted row binding, satisfying the first-row object contract above with matching `domainId`, `commonCarrierId`, `supportId`, and `retainedRowSetId: "S_eq"`.
3. Populate the remaining `S_eq` row bindings on the same support, ending with `Noether_sea_record_bound_to_S_eq` and `binary_to_binary_phase_row_set_identity`.
4. Run the same-branch checker with `--require-accepted`; do not edit scores unless the accepted-support and row-binding coordinates pass.
5. Only after same-branch identity passes, populate the matching retained-record file for `EQ-02` through `EQ-04` and run the retained-record evaluator with `--require-populated`.
