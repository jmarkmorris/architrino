# VP-1 Radial Branch Interval Proof

Status. Worker proof packet for the VP-1 radial branch-sum interval at $\theta_\ast=0$ on the retained $P_1,P_2,P_3,S_1$ chart. This packet does not edit the executable runner, sidecar, generated report, priority list, or authored AAA prose.

Claim level. Outward interval branch-sum review for the fixed chart, not a force-ratio decision. The radial-turn row remains blocked until a declared $\Gamma$ interval is supplied in the accepted normalization.

## Inputs

The retained VP-1 chart is the fixed active ledger
$$
P_1,\ P_2,\ P_3,\ S_1
$$
with
$$
a=\frac{1}{10},
\qquad
b_\ast=\frac{7}{2},
\qquad
\theta_\ast=0.
$$
At the turn center,
$$
b(0)=b_\ast,
\qquad
\rho(0,\Delta)=\exp(a(1-\cos\Delta)).
$$
The partner and self root equations are
$$
F_p(0,\Delta)=\Lambda_p(0,\Delta)-\frac{\Delta}{b(0)}=0,
\qquad
\Lambda_p=\sqrt{1+\rho^2+2\rho\cos\Delta},
$$
and
$$
F_s(0,\Delta)=\Lambda_s(0,\Delta)-\frac{\Delta}{b(0)}=0,
\qquad
\Lambda_s=\sqrt{1+\rho^2-2\rho\cos\Delta}.
$$
The branch windows are the accepted fixed tubes:

| Label | Class | Fixed tube |
| --- | --- | ---: |
| $P_1$ | partner | $[2.48,2.52]$ |
| $P_2$ | partner | $[4.30,4.46]$ |
| $P_3$ | partner | $[6.78,6.92]$ |
| $S_1$ | self | $[4.80,4.90]$ |

## Branch Contribution Formula

For a retained partner root $\Delta_p$,
$$
R_p(0,\Delta_p)
=
-
W_p^{\mathrm{rec}}(0,\Delta_p)
\frac{1+\rho(0,\Delta_p)\cos\Delta_p}
{\Lambda_p(0,\Delta_p)^3}.
$$
For a retained self root $\Delta_s$,
$$
R_s(0,\Delta_s)
=
W_s^{\mathrm{rec}}(0,\Delta_s)
\frac{1-\rho(0,\Delta_s)\cos\Delta_s}
{\Lambda_s(0,\Delta_s)^3}.
$$
Thus the VP-1 radial branch sum at the turn center is
$$
B_r(0)
=
R_p(0,\Delta_{P_1})
+R_p(0,\Delta_{P_2})
+R_p(0,\Delta_{P_3})
+R_s(0,\Delta_{S_1}).
$$

The interval rule is ordinary outward interval composition: enclose each simple root by endpoint sign rows, evaluate the matching $R_p$ or $R_s$ interval on that root enclosure with $|J|$ bounded away from zero, and sum the four contribution intervals outward.

## Reviewed Outward Interval

Using the runner's nextafter-directed double interval backend with trigonometric critical-point enclosures and a conservative $10^{-8}$ root enclosure seed, the point $\theta_\ast=0$ root rows verify endpoint sign changes and nonzero active Jacobians:

| Label | Root interval | Left $F$ interval | Right $F$ interval | $J$ interval |
| --- | ---: | ---: | ---: | ---: |
| $P_1$ | $[2.502775816237631,2.502775836237632]$ | $[1.2448497899164577{\times}10^{-8},1.2448542641152473{\times}10^{-8}]$ | $[-1.2448272856957489{\times}10^{-8},-1.2448229225192618{\times}10^{-8}]$ | $[4.356934884385099,4.356935103389805]$ |
| $P_2$ | $[4.385887216262131,4.385887236262133]$ | $[-5.061697727626325{\times}10^{-9},-5.061672636585967{\times}10^{-9}]$ | $[5.060112107102554{\times}10^{-9},5.060137420187517{\times}10^{-9}]$ | $[-1.7713168378653525,-1.7713167603899593]$ |
| $P_3$ | $[6.806959733895566,6.806959753895567]$ | $[4.97300067792139{\times}10^{-9},4.973020217846625{\times}10^{-9}]$ | $[-4.974355816145249{\times}10^{-9},-4.974336276220014{\times}10^{-9}]$ | $[1.7407873578063429,1.740787399435831]$ |
| $S_1$ | $[4.8402121183113955,4.840212138311397]$ | $[1.1437195412966615{\times}10^{-8},1.14372171733379{\times}10^{-8}]$ | $[-1.1437446545414788{\times}10^{-8},-1.1437424785043502{\times}10^{-8}]$ | $[4.0030623470143825,4.003062404848289]$ |

The corresponding radial contribution intervals are:

| Label | Radial contribution interval |
| --- | ---: |
| $P_1$ | $[-0.024231043013976206,-0.02423102967591669]$ |
| $P_2$ | $[-0.1818920328900357,-0.1818920099225133]$ |
| $P_3$ | $[-0.1466248748351787,-0.146624869067937]$ |
| $S_1$ | $[0.08131534602946912,0.0813153523722906]$ |

Therefore the reviewed outward branch interval is
$$
B_r(0)\in
[-0.27143260470972164,\ -0.27143255629407625].
$$
This interval contains the previously reported center value
$$
B_r(0)\approx -0.27143258050217867.
$$

## Exact Gamma Inequality

The accepted normalization is
$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}.
$$
Given a declared outward force-ratio interval
$$
\Gamma\in[\Gamma^-,\Gamma^+]
$$
and the reviewed branch interval
$$
B_r(0)\in[B_r^-,B_r^+],
$$
the normalized radial-turn interval is
$$
\Gamma+B_r(0)
\in
[\Gamma^-+B_r^-,\ \Gamma^+ + B_r^+].
$$
The radial-turn row has exactly three interval outcomes:

| Outcome | Required strict interval inequality |
| --- | --- |
| `passed` | $\Gamma^-+B_r^->0$ |
| `certified_fail` | $\Gamma^+ + B_r^+\le0$ |
| `blocked` | neither inequality is proved |

With the reviewed VP-1 branch interval, this becomes:
$$
\text{pass if }\Gamma^- > 0.27143260470972164,
$$
and
$$
\text{certify radial failure if }\Gamma^+\le0.27143255629407625.
$$
If the declared $\Gamma$ interval overlaps the gap between those two thresholds, or if no $\Gamma$ interval is declared, the correct radial-turn status remains `blocked`.

## Sidecar-Ready Data

This packet supplies the branch interval needed by a future `radial_turn` sidecar row:

```json
{
  "evidence_kind": "radial_force_ratio_interval",
  "gamma_normalization": "Gamma = r_*^3 Omega^2/(kappa q_1^2)",
  "branch_sum_interval": [
    -0.27143260470972164,
    -0.27143255629407625
  ],
  "gamma_pass_threshold": 0.27143260470972164,
  "gamma_fail_threshold": 0.27143255629407625,
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
  "decision_rule": {
    "passed": "Gamma^- + B_r^- > 0",
    "certified_fail": "Gamma^+ + B_r^+ <= 0",
    "blocked": "otherwise"
  }
}
```

No `radial_turn` sidecar row should be promoted from this packet alone because the force-ratio interval and its accepted source are still absent.

## Promotion Decision

Priority-only. The packet is a branch-interval proof artifact for `spiral_branch_chart_test`; it is not reader-facing corpus material until the VP-1 force-ratio row is declared or derived and one strict radial-turn inequality is resolved.
