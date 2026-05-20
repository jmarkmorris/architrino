# VP-1 Gamma Decision Row Template

Status. Sidecar-compatible decision-row template for the VP-1 `radial_turn` row. This packet does not choose a $\Gamma$ value and does not certify the radial row by itself.

Claim level. Template and ingestion rule for a future operator decision or accepted derivation packet.

## Accepted Normalization

The accepted VP-1 force-ratio normalization is

$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}.
$$

The row must compare a declared outward interval $\Gamma\in[\Gamma^-,\Gamma^+]$ against an outward VP-1 branch-sum interval $B_r(0)\in[B_r^-,B_r^+]$ computed from the same active labels `P_1`, `P_2`, `P_3`, and `S_1`.

The current retained-chart branch interval from [spiral-vp1-radial-branch-interval-proof](spiral-vp1-radial-branch-interval-proof.md) is
$$
B_r(0)\in[-0.27143260470972164,\ -0.27143255629407625].
$$
Thus a `passed` row needs $\Gamma^->0.27143260470972164$, and a `certified_fail` row needs $\Gamma^+\le0.27143255629407625$.

## Current Runner Contract

The current sidecar schema is `spiral_vp1_interval_rows.v1`, and the row is the value of `rows.radial_turn`.

For a non-blocked `radial_turn` row, `spiral_branch_chart_certificate.py` requires:

| Key | Requirement |
| --- | --- |
| `status` | `passed` or `certified_fail`. Use `blocked` only when the intervals do not decide the row. |
| `data.evidence_kind` | Exactly `radial_force_ratio_interval`. |
| `data.gamma_normalization` | Exactly `Gamma = r_*^3 Omega^2/(kappa q_1^2)`. |
| `data.gamma_interval` | Numeric JSON pair `[Gamma_minus, Gamma_plus]` with `Gamma_minus <= Gamma_plus`. |
| `data.branch_sum_interval` | Numeric JSON pair `[B_r_minus, B_r_plus]` with `B_r_minus <= B_r_plus`, no narrower than `[-0.27143260470972164,-0.27143255629407625]` unless a separately accepted wider retained-chart interval is supplied. |
| `data.gamma_source` | Nonempty source string naming the operator decision or accepted derivation packet. |
| `data.active_labels` | Exactly `["P_1","P_2","P_3","S_1"]`. |
| `data.theta_star` | Exactly `0.0`. |
| `data.root_boundary_sign_verified` | Exactly `true`. |
| `data.min_active_j_abs_lower` | Finite positive numeric lower bound. |
| `data.strict_margin` | Numeric strict margin matching the status rule below. |

Decision rule:

| Status | Required strict margin |
| --- | --- |
| `passed` | `strict_margin = Gamma_minus + B_r_minus`, with `strict_margin > 0`. |
| `certified_fail` | `strict_margin = Gamma_plus + B_r_plus`, with `strict_margin <= 0`. |
| `blocked` | Use this if neither strict inequality is available. This keeps theorem grade false. |

## Replace-And-Paste Row

Paste the following object as the value of `rows.radial_turn` after replacing the placeholders with numeric JSON values and a concrete source string. The placeholder version is a template; it is not an ingestible certificate until `gamma_interval`, `branch_sum_interval`, and `strict_margin` are numeric.

```json
"radial_turn": {
  "status": "<passed | certified_fail | blocked>",
  "source": "<operator decision or accepted derivation packet>",
  "claim_level": "operator-declared strict VP-1 force-ratio interval",
  "data": {
    "evidence_kind": "radial_force_ratio_interval",
    "gamma_normalization": "Gamma = r_*^3 Omega^2/(kappa q_1^2)",
    "gamma_interval": [
      "<Gamma_minus numeric>",
      "<Gamma_plus numeric>"
    ],
    "gamma_source": "<operator decision or accepted derivation packet>",
    "branch_sum_interval": [
      -0.27143260470972164,
      -0.27143255629407625
    ],
    "branch_sum_source": "spiral-vp1-radial-branch-interval-proof.md",
    "active_labels": [
      "P_1",
      "P_2",
      "P_3",
      "S_1"
    ],
    "theta_star": 0.0,
    "root_boundary_sign_verified": true,
    "min_active_j_abs_lower": 1.7407873578063426,
    "max_root_interval_width": 2.000000165480742e-8,
    "strict_margin": "<Gamma_minus + B_r_minus for passed, or Gamma_plus + B_r_plus for certified_fail>",
    "decision_rule": "passed iff Gamma^- + B_r^- > 0; certified_fail iff Gamma^+ + B_r^+ <= 0; otherwise blocked",
    "summary": "Gamma is declared in the equal-magnitude opposite-charge VP-1 normalization Gamma=r_*^3 Omega^2/(kappa q_1^2), and the outward radial branch interval decides the radial_turn row by the stated strict-margin rule."
  }
}
```

## Use Notes

- Do not infer $\Gamma$ from $b_\ast=7/2$ or from the sampled threshold $\Gamma_{\mathrm{turn}}=0.271432580502\ldots$.
- Do not mark `status: passed` unless the lower endpoint inequality $\Gamma^-+B_r^->0$ is proved from the declared intervals.
- Do not mark `status: certified_fail` unless the upper endpoint inequality $\Gamma^++B_r^+\le0$ is proved from the declared intervals.
- If the interval straddles the decision boundary, keep `status: blocked`; the existing tangential failure certificate will then remain blocked from theorem-grade rejection because `radial_turn` is undecided.

## Promotion Decision

Priority-only. This is a sidecar decision-row template for `spiral_branch_chart_test`, not reader-facing corpus material.
