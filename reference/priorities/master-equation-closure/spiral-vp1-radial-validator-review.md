# Spiral VP-1 Radial Validator Review

Status. Worker C team-agent review packet for the VP-1 radial-turn sidecar validator. This packet reviews the runner contract and proposes adversarial fixtures only; it does not edit the runner, current sidecar, generated report, priority list, or authored AAA prose.

Claim level. Validator and fixture review. The radial row validator has the right endpoint inequality for ordinary finite rows. This worker packet was written before the coordinator patch that added `--radial-root-pad`, finite-number checks, exact Gamma-normalization checks, retained active-label and turn-center checks, root-boundary and $|J|$ provenance checks, and the no-narrower-than-reference branch-interval guard.

## Files Inspected

- [spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py)
- [spiral-vp1-current-interval-rows.json](spiral-vp1-current-interval-rows.json)
- [spiral-vp1-sidecar-schema-review.md](spiral-vp1-sidecar-schema-review.md)
- [spiral-vp1-radial-gamma-routing.md](spiral-vp1-radial-gamma-routing.md)
- [spiral-vp1-tangential-evaluator-review.md](spiral-vp1-tangential-evaluator-review.md)
- [spiral-vp1-drive-verdict-proof.md](spiral-vp1-drive-verdict-proof.md)
- [spiral-vp1-interval-integration-plan.md](spiral-vp1-interval-integration-plan.md)

## Current Validator Contract

For a non-blocked `radial_turn` sidecar row, `validate_radial_turn_row(...)` requires:

- `data.evidence_kind == "radial_force_ratio_interval"`;
- a numeric `gamma_interval=[Gamma^-, Gamma^+]`;
- a numeric `branch_sum_interval=[B_r^-, B_r^+]`;
- a nonempty string `gamma_source`;
- `status == "passed"` only when $\Gamma^-+B_r^- > 0$;
- `status == "certified_fail"` only when $\Gamma^++B_r^+ \le 0$.

That endpoint rule matches the radial-turn proof packet: the bare VP-1 radial condition is strict positivity of $\Gamma+B_r(0)$. A pass row therefore needs a strict positive lower margin, while a fail row may certify $\Gamma+B_r(0)\le0$ from the upper endpoint.

The current sidecar keeps `radial_turn` blocked. That is still the correct theorem-grade status because no accepted VP-1 force-ratio interval exists in the normalization $\Gamma=r_\ast^3\Omega^2/(\kappa q_1^2)$.

## Safety Issues

1. Historical coordinator issue now patched. The worker review originally found a CLI wiring regression in which `build_certificate(...)` called `radial_turn_summary(..., root_pad=args.radial_root_pad)` before the parser defined `--radial-root-pad`. The main-lane runner now supplies a default `RADIAL_ROOT_PAD` argument, so fixtures can execute through the CLI.

2. Historical hardening issue now patched. `numeric_pair(...)` now rejects booleans, `NaN`, `Infinity`, and overflowed non-finite endpoints before interval arithmetic.

3. Historical normalization issue now patched. The validator now requires `gamma_normalization` to match the accepted VP-1 normalization exactly:
$$
\Gamma=r_\ast^3\Omega^2/(\kappa q_1^2).
$$

4. Historical retained-chart provenance issue now patched. The validator now requires compatible `active_labels`, `theta_star`, `root_boundary_sign_verified=true`, `min_active_j_abs_lower>0`, and a `branch_sum_interval` no narrower than the retained-chart reference interval.

5. `blocked` rows bypass semantic validation. That is safe for theorem grade because a blocked row does not promote the proof obligation, but it can make malformed blocked evidence look clean in the interval-support section. A reasonable compromise is to keep missing-Gamma blocked rows valid, while warning or rejecting blocked rows that claim `evidence_kind=radial_force_ratio_interval` but have malformed intervals, wrong normalization, or changed active labels.

## Recommended Fixture Pattern

Use the current sidecar as the full-packet template and replace only the `radial_turn` row. Each fixture should also run with the current structural and tangential rows so the theorem-readiness result is meaningful. Run each fixture through:

```bash
python3 reference/priorities/master-equation-closure/spiral_branch_chart_certificate.py \
  --format json \
  --interval-proof-rows /tmp/<fixture>.json
```

For theorem-grade fixtures, also run `--require-theorem-grade` and check the exit code.

## Pass Fixture

Purpose. Prove that a strict positive lower endpoint upgrades `radial_turn` to `passed`.

Row body:

```json
{
  "status": "passed",
  "source": "synthetic radial validator fixture",
  "claim_level": "strict finite VP-1 force-ratio interval",
  "data": {
    "evidence_kind": "radial_force_ratio_interval",
    "gamma_normalization": "Gamma = r_*^3 Omega^2/(kappa q_1^2)",
    "gamma_interval": [0.272, 0.273],
    "gamma_source": "synthetic fixture declaration in the accepted VP-1 normalization",
    "branch_sum_interval": [-0.27143260470972164, -0.27143255629407625],
    "branch_sum_source": "spiral-vp1-radial-branch-interval-proof.md",
    "active_labels": ["P_1", "P_2", "P_3", "S_1"],
    "theta_star": 0.0,
    "root_boundary_sign_verified": true,
    "min_active_j_abs_lower": 1.7407873578063426,
    "max_root_interval_width": 2.000000165480742e-8,
    "strict_margin": 0.000567395290278383
  }
}
```

Expected result. The row is accepted, the proof obligation matrix reports `radial_turn: passed`, and the full current sidecar becomes theorem-grade rejected by tangential drive because `tangential_drive` is already `certified_fail`. `--require-theorem-grade` should exit `0`, and `certificate_status` should be `theorem_grade_rejected_tangential_drive`.

Boundary companion. Change `gamma_interval` to `[0.27143260470972164, 0.272]` while keeping the same branch interval and `strict_margin: 0.0`. A `passed` row at $\Gamma^-+B_r^- = 0$ must be rejected and must not promote theorem grade.

## Fail Fixture

Purpose. Prove that a nonpositive upper endpoint upgrades `radial_turn` to `certified_fail`.

Row body:

```json
{
  "status": "certified_fail",
  "source": "synthetic radial validator fixture",
  "claim_level": "nonpositive finite VP-1 force-ratio interval",
  "data": {
    "evidence_kind": "radial_force_ratio_interval",
    "gamma_normalization": "Gamma = r_*^3 Omega^2/(kappa q_1^2)",
    "gamma_interval": [0.270, 0.271],
    "gamma_source": "synthetic fixture declaration in the accepted VP-1 normalization",
    "branch_sum_interval": [-0.27143260470972164, -0.27143255629407625],
    "branch_sum_source": "spiral-vp1-radial-branch-interval-proof.md",
    "active_labels": ["P_1", "P_2", "P_3", "S_1"],
    "theta_star": 0.0,
    "root_boundary_sign_verified": true,
    "min_active_j_abs_lower": 1.7407873578063426,
    "max_root_interval_width": 2.000000165480742e-8,
    "strict_margin": -0.0004325562940762362
  }
}
```

Expected result. The row is accepted, the proof obligation matrix reports `radial_turn: certified_fail`, and the candidate is theorem-grade rejected by the radial-turn row regardless of the tangential row. `--require-theorem-grade` should exit `0`, and `certificate_status` should be `theorem_grade_rejected_radial_turn`.

Boundary companion. Use an exact-upper fixture with $\Gamma^++B_r^+=0$. Because the radial pass condition is strict positivity, `certified_fail` should remain accepted at equality. A `certified_fail` row with $\Gamma^++B_r^+>0$ must be rejected and must not promote theorem grade.

## Blocked Fixtures

Purpose. Prove that unresolved Gamma or a straddling decision interval stays blocked.

Missing-Gamma row:

```json
{
  "status": "blocked",
  "source": "synthetic radial validator fixture",
  "claim_level": "force ratio absent",
  "data": {
    "summary": "No accepted Gamma interval is declared in the VP-1 force-ratio normalization."
  }
}
```

Straddling row:

```json
{
  "status": "blocked",
  "source": "synthetic radial validator fixture",
  "claim_level": "radial decision interval crosses zero",
  "data": {
    "evidence_kind": "radial_force_ratio_interval",
    "gamma_normalization": "Gamma = r_*^3 Omega^2/(kappa q_1^2)",
    "gamma_interval": [0.2713, 0.2716],
    "gamma_source": "synthetic fixture declaration in the accepted VP-1 normalization",
    "branch_sum_interval": [-0.27143260470972164, -0.27143255629407625],
    "branch_sum_source": "spiral-vp1-radial-branch-interval-proof.md",
    "active_labels": ["P_1", "P_2", "P_3", "S_1"],
    "theta_star": 0.0,
    "root_boundary_sign_verified": true,
    "min_active_j_abs_lower": 1.7407873578063426,
    "max_root_interval_width": 2.000000165480742e-8
  }
}
```

Expected result. Both fixtures leave `radial_turn: blocked`, keep `theorem_grade: false`, and keep `--require-theorem-grade` nonzero. The straddling fixture should be accepted only as blocked; changing its status to `passed` or `certified_fail` must produce a validation error.

## Adversarial Rejection Fixtures

These fixtures should be added after or alongside the pass/fail/blocked fixtures:

| Fixture | Row mutation | Expected behavior |
| --- | --- | --- |
| Wrong evidence kind | `evidence_kind: "outward_radial_branch_sum_interval"` on a non-blocked row | Validation error; row not promoted. |
| Missing source | omit `gamma_source` | Validation error; row not promoted. |
| Inverted interval | `gamma_interval: [0.3, 0.2]` | Validation error; row not promoted. |
| Boolean endpoints | `gamma_interval: [true, true]` | Validation error; row not promoted. |
| NaN endpoints | `gamma_interval: [NaN, NaN]` | Validation error; row not promoted. |
| Infinite endpoints | `gamma_interval: [1e309, 1e309]` or `[Infinity, Infinity]` | Validation error; row not promoted. |
| Wrong normalization | omit `gamma_normalization` or use a different force-ratio definition | Validation error; row not promoted. |
| Changed active ledger | `active_labels: ["P_1", "P_2", "S_1"]` with favorable `branch_sum_interval` | Validation error; row not promoted. |
| No root/J provenance | omit `root_boundary_sign_verified` and `min_active_j_abs_lower` | Validation error; row not promoted. |
| Forged narrow branch interval | supply a favorable `branch_sum_interval` not containing the runner's outward branch interval | Validation error; row not promoted. |

## Priority Recommendation

The highest-value next implementation is the adversarial fixture run against the now-hardened runner. The CLI wiring, finite-number checks, Gamma-normalization check, retained-label checks, and no-narrower-than-reference branch interval check are patched; pass/fail/boundary fixtures now protect the live VP-1 theorem-grade boundary without adding a new proof obligation.

## Promotion Decision

Priority-only. This packet is an executable-certificate review artifact for `reference/priorities/master-equation-closure/`; it is not reader-facing AAA prose and should not be promoted into `content/markdown/aaa` until the VP-1 radial row receives an accepted $\Gamma$ interval or a theorem-grade rejection is ready to state with assumptions and remaining obligations.
