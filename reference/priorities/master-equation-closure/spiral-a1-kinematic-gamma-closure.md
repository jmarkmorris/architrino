# Spiral A1 Kinematic Gamma Closure

Status. Invalidated old-law proof packet for the A1 `radial_turn` row. This
packet consumed [spiral-a1-gamma-force-ratio-decision](spiral-a1-gamma-force-ratio-decision.md),
[spiral-a1-drive-interval-target](spiral-a1-drive-interval-target.md),
[spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json), and
the variable-pitch spiral normalization in
[master-equation](../../../content/markdown/aaa/dynamics/master-equation.md)
before the receiver-normal Master EOM correction. It is retained as provenance
and topology context only; it must not be consumed as a live radial-turn
certificate until redriven with same-box $D_t/D_s$ bounds.

Claim level. Old-law radial-balance derivation for the prescribed
constant-$\Omega$ A1 candidate history. Under the current Master EOM, it is a
restart target, not closure evidence.

## Inputs

The A1 candidate history is
$$
r(\theta)=r_\ast\exp(a(1-\cos\theta)),
\qquad
t(\theta)=\frac{\theta}{\Omega},
\qquad
a=0.204,
\qquad
\theta_\ast=0.
$$
The retained A1 active labels are
$$
P_1,\ P_2,\ P_3,\ S_1,
$$
and the outward radial branch interval at the turn center is
$$
B_r(C_{\mathrm{A1}};0)
\in[-0.005994791326773983,\ -0.005994715991872956].
$$
The accepted radial force-ratio normalization is
$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}.
$$

## Exact Radial Balance

For the prescribed A1 curve,
$$
\frac{r'(\theta)}{r(\theta)}=a\sin\theta,
\qquad
\frac{r''(\theta)}{r(\theta)}
=a\cos\theta+a^2\sin^2\theta.
$$
At $\theta_\ast=0$ this gives
$$
r'(0)=0,
\qquad
\frac{r''(0)}{r_\ast}=a.
$$
Because $t(\theta)=\theta/\Omega$, one has $\dot\theta=\Omega$ and $\ddot\theta=0$. Therefore
$$
\dot r(0)=0,
\qquad
\frac{\ddot r(0)}{r_\ast}=a\Omega^2.
$$
The polar radial acceleration is
$$
a_r=\ddot r-r\Omega^2,
$$
so the prescribed A1 history requires
$$
a_r(0)=r_\ast\Omega^2(a-1)
=-0.796\,r_\ast\Omega^2.
$$
The sign is inward, as it must be: the curve is at a minimum-radius event, but its radial acceleration component is still less inward than the circular centripetal value.

For the equal-magnitude opposite-polarity retained chart, the radial branch force at $\theta_\ast=0$ is
$$
a_r(0)
=
\frac{\kappa q_1^2}{r_\ast^2}B_r(C_{\mathrm{A1}};0).
$$
Exact radial balance therefore gives
$$
\frac{\kappa q_1^2}{r_\ast^2}B_r(C_{\mathrm{A1}};0)
=
r_\ast\Omega^2(a-1).
$$
Multiplying by $r_\ast^2/(\kappa q_1^2)$ yields the normalized equality
$$
B_r(C_{\mathrm{A1}};0)=(a-1)\Gamma.
$$
Equivalently,
$$
\Gamma=-\frac{B_r(C_{\mathrm{A1}};0)}{1-a}.
$$

## Gamma Interval

Since $1-a=0.796$, the retained branch interval converts to
$$
\Gamma
\in
\left[
\frac{-B_r^+}{0.796},
\frac{-B_r^-}{0.796}
\right],
$$
where
$$
B_r^-=-0.005994791326773983,
\qquad
B_r^+=-0.005994715991872956.
$$
Thus the A1 kinematic radial-balance interval is
$$
\Gamma
\in
[0.007531050241046427,\ 0.007531144882881889].
$$

This interval is not inferred from $b_\ast=7/2$, from delayed-root offsets, or from the branch threshold. It is inferred from the prescribed constant-$\Omega$ radial acceleration of the candidate history together with the retained A1 branch interval.

## Older Radial-Turn Inequality

The older radial-turn row tested
$$
\Gamma+B_r(C_{\mathrm{A1}};0)>0.
$$
Using the independent interval endpoint rule, the lower margin is
$$
\Gamma^-+B_r^-
\ge
0.007531050241046427-0.005994791326773983
=0.001536258914272444>0.
$$
Equivalently, the kinematic lower endpoint satisfies
$$
\Gamma^-
>
G_{\mathrm{pass}}
=0.005994791326773983.
$$
Therefore the kinematic A1 force-ratio interval strictly passes the older `radial_turn` inequality.

With the exact balance correlation retained, the same statement is
$$
\Gamma+B_r(C_{\mathrm{A1}};0)=a\Gamma,
$$
so
$$
\Gamma+B_r(C_{\mathrm{A1}};0)
\in
[0.001536334249173471,\ 0.001536353556107906],
$$
again strictly positive.

## Sidecar Implication

This proof packet supplies a concrete candidate source for a future non-blocked A1 `radial_turn` row:

| Field | Value |
| --- | --- |
| `gamma_normalization` | `Gamma = r_*^3 Omega^2/(kappa q_1^2)` |
| `gamma_interval` | `[0.007531050241046427, 0.007531144882881889]` |
| `gamma_source` | `spiral-a1-kinematic-gamma-closure.md` |
| `branch_sum_interval` | `[-0.005994791326773983, -0.005994715991872956]` |
| `decision_rule` | `passed iff Gamma^- + B_r^- > 0; certified_fail iff Gamma^+ + B_r^+ <= 0; otherwise blocked` |
| `strict_margin` for `passed` | `0.001536258914272444` |

Integration note. The sidecar and A1 interval report now consume this row. The table above records the row shape and interval source used by that integration.

## Claim Map And Promotion Decision

- Ontology: none added.
- Derivation/closure target: the prescribed A1 radial kinematics fix the exact radial-balance equality $B_r(C_{\mathrm{A1}};0)=(a-1)\Gamma$ at $\theta_\ast=0$.
- Effective summary: the retained A1 branch interval and constant-$\Omega$ A1 history imply a strict positive radial-turn margin in the accepted normalization.
- Speculation: none promoted.

Promotion decision. Promoted into the A1 benchmark paragraph in the variable-pitch spiral section of [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) and consumed by the A1 executable sidecar/report. The later tangential compatibility row rejects the prescribed constant-$\Omega$ history, so this packet is a radial-balance success marker rather than a standalone closed spiral certificate.
