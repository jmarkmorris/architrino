# Spiral VP-1 Sidecar Schema Review

Status. Worker C team-agent review packet for the VP-1 theorem-grade rejection path. This packet reviews the current interval sidecar schema and theorem-readiness logic without editing the runner, current sidecar, generated report, or priority list.

Claim level. Schema and test review. The aggregate theorem-readiness formula is aligned with the approved VP-1 rejection route, but the sidecar row schema needs row-specific evidence checks before a future `certified_fail` or `passed` drive row should be allowed to carry theorem-grade weight.

Coordinator follow-up. The main lane subsequently implemented drive-row semantic validators, explicit `evidence_kind` checks for radial and tangential rows, and the `--require-tangential-pass` contract fix in [spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py). Structural row hardening remains a later schema-hardening task.

## Files Inspected

- [spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py)
- [spiral-vp1-current-interval-rows.json](spiral-vp1-current-interval-rows.json)
- [spiral-vp1-interval-integration-plan.md](spiral-vp1-interval-integration-plan.md)
- [spiral-branch-chart-interval-report.md](spiral-branch-chart-interval-report.md)

## Current Readiness Contract

The implemented readiness rule has the right outer form for the approved path:

- `structural_rows_passed` requires `candidate_history`, active roots, `jacobian_floor`, `inactive_gaps`, `self_coincidence_clearance`, `finite_memory`, `root_transport`, and `dependency_status` to be `passed`.
- `candidate_passed` requires structural rows plus `radial_turn == passed` and `tangential_drive == passed`.
- `candidate_rejected` requires structural rows plus either `radial_turn == certified_fail` or `radial_turn == passed` with `tangential_drive == certified_fail`.
- `theorem_grade` is exactly `candidate_passed or candidate_rejected`.

This matches the integration-plan invariant for a theorem-grade VP-1 tangential rejection: structural rows pass, the radial-turn row is strictly resolved as `passed` for a declared $\Gamma$, and the tangential-drive row is `certified_fail` because an outward interval proves $D_T^-\ge 0$.

The current sidecar correctly keeps VP-1 blocked:

- `radial_turn` is `blocked` because the branch sum reports $\Gamma_{\mathrm{turn}}=0.271432580502\ldots$ but no strict force-ratio $\Gamma$ is declared.
- `tangential_drive` is `blocked` because the pointwise reduction target is not yet backed by an outward interval evaluator.
- The generated report therefore shows `theorem_grade: false`, `candidate_rejected: false`, and first nonpassing obligation `radial_turn`.

## Schema Gaps

1. Row statuses are accepted without row-specific evidence fields. `parse_interval_rows(...)` validates row name, status, source, claim level, and that `data` is an object. `apply_interval_rows(...)` then promotes the obligation status directly. This means a future sidecar could set `radial_turn: passed` and `tangential_drive: certified_fail` with empty `data`, and the aggregate readiness logic would treat it as theorem-grade if the structural rows are also marked `passed`.

2. Drive rows need explicit decision intervals. A safe `radial_turn` row should carry at least `gamma`, `gamma_source`, `branch_sum_interval`, `decision_interval`, and the strict rule used: pass if $\Gamma+B_r^- > 0$, certify fail if $\Gamma+B_r^+ \le 0$, block otherwise. A safe `tangential_drive` row should carry at least `D_T_interval`, the pass tolerance $\varepsilon_T$, the failure rule $D_T^- \ge 0$, and the active-label ledger used by the evaluator.

3. Reduction-only evidence is not machine-distinguished from interval evidence. The current `tangential_drive` sidecar row is safely `blocked`, but its `data` contains a pointwise target and sampled integral. The schema should make the distinction explicit with an evidence tag such as `evidence_kind: reduction_only`, `outward_interval`, `analytic_interval`, or `dependency_handoff`, and the runner should accept theorem-grade drive statuses only from `outward_interval` or an equally strict analytic row.

4. Structural rows need minimal row-specific compatibility fields. Candidate-level compatibility checks catch $a$, $b_\ast$, $I_\ast$, $\Delta_{\mathrm{co}}$, $D_{\mathrm{cert}}$, and active-label order. They do not yet check that each structural row uses the same active windows, root labels, active tube cover, Jacobian floor, inactive complement cover, or root-transport residual target. For theorem-grade acceptance, the runner should require lightweight row data such as active windows for root rows, `nu_cert` for `jacobian_floor`, `g_inactive` and cover provenance for `inactive_gaps`, and a residual upper bound for `root_transport`.

5. `candidate_history`, `self_coincidence_clearance`, and `finite_memory` can remain runner-certified analytic rows, but the contract should state that explicitly. At present they become structural `passed` rows even without sidecar rows. That is reasonable for the current analytic evidence, but tests should lock this intended exception so future structural rows do not accidentally inherit the same implicit-pass behavior.

6. The integration plan names `candidate_verdict`, while the runner emits `certificate_status`. That is not a mathematical blocker, but the fixture expectations and JSON contract should use one field name or deliberately support both. Otherwise downstream checks may test the wrong field.

7. `--require-tangential-pass` is still tied to `certificate["tangential_drive"]["sampled_tangential_pass"]`. The integration plan says this flag should pass only when the interval tangential row has `passed` and should continue to fail for a theorem-grade tangential rejection. The current implementation would fail even for a synthetic interval sidecar with `tangential_drive: passed` because the sampled VP-1 diagnostic remains positive.

## Test Gaps

The current validation plan is directionally right, but the runner needs adversarial schema fixtures before any theorem-grade row is accepted.

Required tests:

1. Empty-evidence overpromotion fixture. A sidecar with all structural rows `passed`, `radial_turn: passed`, and `tangential_drive: certified_fail`, but empty drive `data`, must leave `theorem_grade: false` with a row-specific validation error.

2. Radial interval boundary fixtures. A row with $\Gamma+B_r^- > 0$ should pass; a row with $\Gamma+B_r^+ \le 0$ should certify fail; a row whose decision interval touches or crosses zero should block. The test should also require `gamma_source`.

3. Tangential interval boundary fixtures. A row with $D_T^+\le-\varepsilon_T$ should pass; a row with $D_T^-\ge0$ should certify fail; a row with $D_T^-<0<D_T^+$ should block. A sampled-positive or reduction-only row must never become `certified_fail`.

4. Row-level compatibility fixture. A sidecar whose global candidate matches VP-1 but whose tangential row names a changed active ledger, changed branch labels, or missing Jacobian-floor dependency should be rejected for theorem-grade use.

5. Dependency absence fixture. Even if local interval rows pass, `dependency_status` absent or blocked must keep `theorem_grade: false`.

6. CLI contract fixture for `--require-tangential-pass`. A synthetic interval sidecar with `tangential_drive: passed` should make this flag exit `0`; a theorem-grade tangential rejection should still exit nonzero.

7. Contract-name fixture. Tests should assert the emitted verdict field actually used by downstream consumers. Either standardize on `certificate_status` or add a `candidate_verdict` alias and test both deliberately.

## Safe Recommendations

1. Add row-specific validators before applying interval rows. Keep the sidecar compact, but route each accepted row through a validator that checks the minimal evidence fields for that row. If validation fails, do not promote that row; keep the sampled/blocker obligation and report the validation error.

2. Treat drive-row statuses as derived, not trusted. For `radial_turn` and `tangential_drive`, the sidecar may supply intervals and provenance, but the runner should compute `passed`, `certified_fail`, or `blocked` from those intervals. This avoids turning a status label into the proof.

3. Add an explicit `evidence_kind` field for each row. This lets the report keep reduction packets and sampled diagnostics visible without allowing them to satisfy theorem grade.

4. Add a `validate_interval_row_data(row, certificate)` layer without parsing proof markdown. The runner should continue consuming only JSON, but the JSON should contain enough typed numerical evidence to support the row status.

5. Update the test plan before loading the tangential evaluator output. The highest-value tests are the empty-evidence overpromotion fixture, radial/tangential boundary fixtures, and the `--require-tangential-pass` fixture.

## Promotion Decision

Priority-only. This review is an implementation and certificate-contract packet for `reference/priorities/master-equation-closure/`; it is not reader-facing AAA prose and should not be promoted into `content/markdown/aaa` until the VP-1 rejection proof is theorem-grade and the accepted mathematical result can be stated with assumptions and remaining obligations.
