# EQ-02 Through EQ-04 S_eq Retained-Domain Evidence Object

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Score ladder: [Equation Score-5 Closure Ladder](equation-score-5-closure-ladder.md)
- Common architecture: [Equation Common Architecture 2026-06-23 C](equation-common-architecture-2026-06-23-c.md)
- Prior merge: [Equation Closure Pass 2026-06-25 A](equation-closure-pass-2026-06-25-a.md)
- Claim level: smallest accepted retained-domain evidence object for `EQ-02` through `EQ-04`
- Promotion status: priority-only

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

Here $B_N\subset\Sigma_N$ must be a positive-width invariant cell in the truncated delay-state space, not a single sampled crossing. The retained-domain packet is score-moving only when all accepted row bindings, witnesses, and coframe extraction rows resolve to durable source evidence on the same `domainId`, `commonCarrierId`, `supportId`, and `retainedRowSetId: "S_eq"`.

## Bucket Merge

| Bucket | Smallest proposed evidence object | First blocker | Coordinator disposition |
| --- | --- | --- | --- |
| A | Source-backed `S_eq` retained-domain fixture for `EQ-02` through `EQ-04`. | `missing_accepted_raw_labeled_rows_preserved_on_retained_history` | Chosen. This is the highest-priority score-moving carrier and tests the common retained-domain acceptance vector directly. |
| B | Retained $\Theta_{\mathrm{sea}}^{(\ell,W)}$ density-compression coefficient bundle with $\delta c_X^2$ and stress/strain output first. | `missing_accepted_theta_sea_rho_NS` | Defer. Safe as a packet, but lower priority than the retained-domain carrier and currently score-moving first only for `EQ-24` review. |
| C | Native Compton/recoil event packet on `eventId: "e_gamma_e_0"`. | `missing_accepted_photon_gate_A_input_output` | Defer. Strong second target; it should follow Bucket A unless the solver lane produces native event rows first. |
| D | Finite-window statistical carrier $\mathcal C_{\mathrm{stat}}^{W,T}$ for probability, entropy, scattering, and resonance rows. | `missing_accepted_W` | Defer. Safe as a packet, but it still needs a retained window and refinement/cocycle source evidence. |
| E | Shared observation record $\mathcal R_{\mathrm{obs}}(\Theta_{\mathrm{obs}})$. | `missing_accepted_theta_obs` plus upstream `missing_accepted_theta_sea_rho_NS` | Blocked on Bucket B. Do not create a private observation ledger before the Noether sea coefficient extraction exists. |

No scores change. None of the bucket reports supplied accepted retained evidence.

## Exact First Blocker

The first score-moving blocker is:

```text
missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

This row is first because the accepted support and row identity must be proven before the clock, envelope, energy, momentum, shell, phase, or Noether sea rows can be read as common-carrier evidence. The row cannot be accepted as a label list by itself. It is accepted only as a raw-label identity row on the certified positive-width invariant cell.

The current score-neutral executable state is:

| Evaluator | Current status | Reason no score moves |
| --- | --- | --- |
| [check-same-branch-chart-identity.mjs](../../../scripts/equation-mapping/check-same-branch-chart-identity.mjs) | `blocked_missing_retained_event_or_domain` | The direct retained-domain attempt has no accepted retained identity requirements. |
| [eq02-04-translating-binary-retained-record.mjs](../../../scripts/equation-mapping/eq02-04-translating-binary-retained-record.mjs) | `blocked_same_branch_identity` | The retained-record rows and witnesses remain attempt-level, and `coframeExtraction` is not evaluated. |
| [produce-eq02-04-coframe-extraction-certificate.mjs](../../../scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs) | fail-closed producer | The current source report is attempt-level and lacks accepted invariant-cell, refinement, source, and connection evidence. |

The first concrete artifact for this lane is the blocked source-backed shell:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs \
  --input scripts/equation-mapping/same-branch-retained-domain-blocked-source-shell.v1.json \
  --summary --pretty
```

It returns `schemaOk: true`, `status: blocked_missing_retained_event_or_domain`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_raw_labeled_rows_preserved_on_retained_history`. All retained identity row bindings in that shell are explicitly `blocked`, not accepted. The fixture path is [same-branch-retained-domain-blocked-source-shell.v1.json](../../../scripts/equation-mapping/same-branch-retained-domain-blocked-source-shell.v1.json).

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

## Score-Moving Evidence

The first score-moving event is not the creation of this packet. It is a future source-backed fixture that makes both commands pass on the same carrier:

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

The minimum score-moving result must report:

- accepted invariant support, raw row identity, row bindings, overlap preimage, zero split witness, zero hidden-retune witness, and lane residual on one retained domain;
- accepted gamma-free coframe extraction and $W_{\mathrm{hol}}=0$ on the same support;
- calibrated negative controls that fail above the declared accept band;
- no private speed convention, branch label, Noether sea state, exposure coefficient, detector/readout kernel, or fitted residual per row.

Only then should `EQ-02`, `EQ-03`, or `EQ-04` be reviewed for score movement. `EQ-04A` remains downstream and cannot use Koide as an input to this acceptance object.

## No-Score-Change Statement

This packet changes no scores and promotes no reader-facing corpus prose. It defines the smallest accepted evidence object for the retained-domain lane and keeps every current attempt, toy, comparison-only, and checker-only row score-neutral until durable source-backed retained evidence lands.

## Ranked Next Actions

1. Populate a source-backed positive-width invariant-cell certificate for `S_eq` with $B_N$, $\Sigma_N$, $P_N$, $\mathcal K_{P_N}$, refinement persistence, calibrated evidence scale, and durable per-step sources.
2. Attach `raw_labeled_rows_preserved_on_retained_history` to that cell as the first accepted row binding, with matching `domainId`, `commonCarrierId`, `supportId`, and `retainedRowSetId: "S_eq"`.
3. Populate the remaining `S_eq` row bindings on the same support, ending with `Noether_sea_record_bound_to_S_eq` and `binary_to_binary_phase_row_set_identity`.
4. Run the same-branch checker with `--require-accepted`; do not edit scores unless the accepted-support and row-binding coordinates pass.
5. Only after same-branch identity passes, populate the matching retained-record file for `EQ-02` through `EQ-04` and run the retained-record evaluator with `--require-populated`.
