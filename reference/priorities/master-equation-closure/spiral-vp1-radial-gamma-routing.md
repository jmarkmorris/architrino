# VP-1 Radial Gamma Routing

Status. Worker routing packet for the VP-1 radial-turn force-ratio row. This packet searches for an accepted $\Gamma$ convention and does not edit the executable runner, sidecar, generated report, priority list, or authored AAA prose.

Claim level. Routing result, not a theorem-grade radial-turn certificate.

## Search Result

No accepted VP-1 force-ratio value or interval was found.

The local priority material does define the normalization used by the radial-turn row. In [spiral-vp1-drive-verdict-proof](spiral-vp1-drive-verdict-proof.md) and [spiral-branch-chart-certificate](spiral-branch-chart-certificate.md), the equal-magnitude opposite-charge VP-1 normalization is
$$
\Gamma\equiv\frac{r_\ast^3\Omega^2}{\kappa q_1^2}.
$$
In that normalization, the computed branch sum at the turn center is
$$
B_r(0)=-0.27143258050217867,
$$
so the sampled threshold is
$$
\Gamma_{\mathrm{turn}}=0.27143258050217867.
$$
The accepted interval-ingestion rule in [spiral-vp1-interval-integration-plan](spiral-vp1-interval-integration-plan.md) is stricter than this sampled decimal: with an outward branch interval $B_r(0)\in[B_r^-,B_r^+]$ and a declared force-ratio interval $\Gamma\in[\Gamma^-,\Gamma^+]$, the radial-turn row passes only if $\Gamma^-+B_r^->0$ and certifies failure only if $\Gamma^++B_r^+\le0$.

The narrow corpus search found the radial-turn inequality in [../../../content/markdown/aaa/dynamics/master-equation.md](../../../content/markdown/aaa/dynamics/master-equation.md) and a related radial-turnaround proof target in [../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md](../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md). Neither source declares a VP-1 force-ratio value, interval, or convention that can fill the sidecar row. The parameter $b_\ast=\Omega R_\ast/c_f=7/2$ fixes the causal-delay scale used by the VP-1 root chart; it does not by itself declare $\kappa q_1^2$ or $\Gamma$.

## Exact Operator Decision Row Needed

The radial-turn blocker should remain active until the operator or an accepted theory packet supplies this row:

| Field | Required content |
| --- | --- |
| `row` | `radial_turn` |
| `gamma_normalization` | $\Gamma=r_\ast^3\Omega^2/(\kappa q_1^2)$ for the equal-magnitude opposite-charge VP-1 kernel. |
| `gamma_interval` | A declared outward interval $[\Gamma^-,\Gamma^+]$ or a declared exact value with an outward uncertainty bound. |
| `gamma_source` | The operator decision, derivation packet, or accepted convention that fixes $\kappa q_1^2$ relative to $r_\ast^3\Omega^2$. |
| `branch_sum_interval` | The outward VP-1 branch interval $B_r(0)\in[B_r^-,B_r^+]$ from the same active labels $P_1,P_2,P_3,S_1$. |
| `status` | `passed` only if $\Gamma^-+B_r^->0$; `certified_fail` only if $\Gamma^++B_r^+\le0$; otherwise `blocked`. |
| `strict_margin` | The positive pass margin $\Gamma^-+B_r^-$, or the nonpositive fail margin $\Gamma^++B_r^+$. |

Paste-ready sidecar-shaped row:

```json
{
  "row": "radial_turn",
  "status": "passed",
  "claim_level": "operator-declared strict VP-1 force-ratio interval",
  "source": "operator decision or accepted derivation packet",
  "evidence": {
    "summary": "Gamma is declared in the equal-magnitude opposite-charge VP-1 normalization Gamma=r_*^3 Omega^2/(kappa q_1^2), and the outward radial branch interval gives a strict positive turn margin.",
    "gamma_normalization": "Gamma = r_*^3 Omega^2/(kappa q_1^2)",
    "gamma_interval": ["<Gamma_minus>", "<Gamma_plus>"],
    "branch_sum_interval": ["<B_r_minus>", "<B_r_plus>"],
    "strict_margin": "<Gamma_minus + B_r_minus > 0>"
  }
}
```

For a theorem-grade VP-1 rejection by radial-turn failure instead, the same row must use `status: certified_fail` and replace `strict_margin` with a verified inequality $\Gamma^++B_r^+\le0$. If neither strict inequality is declared, the correct status is still `blocked`.

## Routing Verdict

- Accepted normalization exists: $\Gamma=r_\ast^3\Omega^2/(\kappa q_1^2)$.
- Accepted VP-1 force-ratio value or interval does not exist in the searched material.
- The runner and sidecar should not infer $\Gamma$ from $b_\ast$ or from the sampled branch threshold.
- The next unblock is an operator or derivation decision that supplies $[\Gamma^-,\Gamma^+]$ in the accepted normalization and proves one strict radial-turn inequality against the outward branch interval.

## Promotion Decision

Priority-only. This packet is a routing and blocker artifact for `spiral_branch_chart_test`; it is not reader-facing corpus material until a force-ratio convention or derivation is accepted.
