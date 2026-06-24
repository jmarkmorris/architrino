# Spiral A1 Kinematic-Balance Corpus Recommendation

Status. Promoted corpus recommendation for `spiral_branch_chart_test`. The separate A1 radial and tangential proof packets are accepted, and the recommended [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) user-facing update has been applied. The executable sidecar/report now also consume the kinematic radial row and tangential compatibility no-go.

Claim level. Corpus-impact promotion record, not a proof packet and not a branch certificate. The mathematical proof burden belongs to [spiral-a1-kinematic-gamma-closure](spiral-a1-kinematic-gamma-closure.md) and [spiral-a1-tangential-compatibility-no-go](spiral-a1-tangential-compatibility-no-go.md). This packet maps their combined documentation consequence.

## Current Reader-Facing State

[master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) currently presents A1 as a retained-chart benchmark that passes the weighted tangential-drive row while leaving radial turn blocked. The promoted paragraph states
$$
D_T(I_\ast)\in[-0.0015572472070875527,-0.00023480430280344085],
$$
and it keeps the radial row blocked because the branch chart only supplies
$$
B_r(0)\in[-0.005994791326773983,-0.005994715991872956]
$$
without an independently derived interval for
$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2}.
$$

That wording remains correct unless the new proof packets are accepted. The retained branch chart alone still does not determine $\Gamma$; the stronger result uses the additional prescribed-history datum that A1 is a constant-$\Omega$ curve with a specified radial acceleration at $\theta_\ast=0$.

## Combined Source Signal

If the radial packet is accepted, the prescribed A1 radial kinematics fix the exact turn-center force-ratio row:
$$
B_r(C_{\mathrm{A1}};0)=(a_{\mathrm{A1}}-1)\Gamma,
\qquad
a_{\mathrm{A1}}=0.204,
$$
so
$$
\Gamma
\in
[0.007531050241046427,\ 0.007531144882881889].
$$
This interval strictly passes the minimum-turn inequality, with the reported margin
$$
\Gamma^-+B_r^-
\ge
0.001536258914272444>0.
$$

If the tangential packet is accepted, the exact prescribed-curve tangential compatibility row fails at the same turn center. Because constant $\Omega$, $p(0)=0$, and $\dot r(0)=0$ make the kinematic tangential acceleration vanish, the exact turn-center force row must satisfy
$$
T_0(C_{\mathrm{A1}})=0.
$$
The retained chart instead gives
$$
T_0(C_{\mathrm{A1}})
\in
[-0.007585901776635041,\ -0.007585740886803276],
$$
so zero is excluded. This is stronger than the existing weighted-drive row: $D_T(I_\ast)<0$ is a corridor diagnostic, while $T_0(C_{\mathrm{A1}})=0$ is the exact turn-center compatibility condition for the prescribed constant-$\Omega$ history.

## Recommended User-Facing Update

Recommendation: one scoped update in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), after both proof packets are accepted. Replace the current A1 retained-chart paragraph and its analytic-foothold summary. Do not update broader consumer pages yet.

Suggested replacement for the A1 benchmark paragraph:

```markdown
A fixed retained-chart benchmark illustrates a sharper prescribed-history failure. For the $a_{\mathrm{A1}}=0.204$, $b_\ast=7/2$ constant-$\Omega$ variable-pitch spiral on $I_\ast=[-\pi/6,\pi/6]$, the retained $3+1$ chart has certified active-root, inactive-gap, Jacobian-floor, finite-memory, and root-transport rows. Its exact radial kinematics at $\theta_\ast=0$ fix the force-ratio row by
$$
B_r(C_{\mathrm{A1}};0)=(a_{\mathrm{A1}}-1)\Gamma,
\qquad
\Gamma\in[0.007531050241046427,\ 0.007531144882881889],
$$
which strictly passes the minimum-turn inequality. The same prescribed history fails exact tangential compatibility at the turn center: constant $\Omega$ and $p(0)=0$ require the normalized pointwise tangential force sum $T_0(C_{\mathrm{A1}})$ to vanish, while the retained chart gives
$$
T_0(C_{\mathrm{A1}})
\in[-0.007585901776635041,\ -0.007585740886803276].
$$
Thus A1 is a constant-$\Omega$ kinematic-balance no-go for this prescribed isolated two-body history. It remains a replayable retained-chart benchmark, not a closed isolated spiral certificate and not a rejection of variable-angular-rate, medium-supplemented, tri-binary, or other non-circular histories.
```

Suggested replacement for analytic foothold item 3:

```markdown
3. **Variable-pitch spiral retained-chart benchmarks** now expose both branch-chart rows and prescribed-history compatibility rows. The fixed A1 constant-$\Omega$ history has certified active-root, inactive-gap, Jacobian-floor, finite-memory, and root-transport rows; its exact radial kinematics fix $\Gamma$ in the accepted normalization and pass the minimum-turn inequality, while the exact turn-center tangential residual excludes zero. A1 is therefore a replayable constant-$\Omega$ kinematic-balance no-go for that prescribed isolated two-body history, not a closure result and not a global no-go for non-circular histories.
```

The remaining-target item can stay unchanged. It already asks for a maximum-curvature branch certificate from active roots, inactive gaps, Jacobian floors, finite memory, root transport, returned-section residuals, radial/tangential balance, and the independent force-ratio row.

## Defer From Authored Corpus Prose

Do not promote A1 into [dyadic-lock](../braid-dyadic-lock/braid-dyadic-lock.md), tri-binary stability, particle-mass, black-hole, cosmology, or maximum-curvature-binary prose as a physical closure result. The combined result rejects one prescribed constant-$\Omega$ isolated two-body history at the turn center; it does not close the broader stability or assembly program.

Do not add a new validation gate, checker, ledger, or requirement. The result belongs under the existing `spiral_branch_chart_test` branch-chart method as a concrete no-go result. Adding another obligation artifact would duplicate the current route and would not improve the native derivation.

Do not use the weighted tangential interval $D_T(I_\ast)$ as a substitute for exact tangential compatibility. The user-facing update should name the pointwise turn-center residual $T_0(C_{\mathrm{A1}})$ or reuse the notation from the accepted tangential proof packet.

Do not state that the retained branch chart alone determines $\Gamma$. The exact $\Gamma$ interval comes from the prescribed constant-$\Omega$ A1 radial kinematics plus the retained branch interval; the earlier chart-only non-identifiability result remains true.

## Claim Map And Promotion Decision

| Signal | Claim bucket | Recommendation |
| --- | --- | --- |
| Exact A1 radial kinematics fix $\Gamma$ at $\theta_\ast=0$. | Derivation/closure target | Promote only after the radial packet is accepted, using the accepted interval and source. |
| Exact A1 turn-center tangential residual excludes zero. | Derivation/closure target | Promote with the radial row as the decisive constant-$\Omega$ kinematic-balance no-go. |
| A1 weighted tangential drive remains negative. | Effective summary / diagnostic | Keep as supporting context only; do not let it replace the exact compatibility row. |
| A1 as a stable isolated spiral, bare maximum-curvature binary, or downstream tri-binary mechanism. | Speculation if stated now | Defer. The no-go rejects this prescribed constant-$\Omega$ history rather than establishing a closed physical assembly. |
| New ontology or new terminology. | Ontology | None. Reuse retained chart, branch certificate, radial/tangential balance, and prescribed-history terminology. |

Promotion decision. Promoted into authored AAA prose in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md). A1 has moved from `tangential-pass/radial-blocked benchmark` to `constant-$\Omega$ kinematic-balance no-go for the prescribed isolated two-body history`. No other user-facing corpus page should change from this result alone.
