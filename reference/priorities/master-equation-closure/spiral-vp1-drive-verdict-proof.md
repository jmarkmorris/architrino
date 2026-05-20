# Spiral VP-1 Drive Verdict Proof

Status. Worker proof packet for the VP-1 radial-turn and weighted tangential-drive rows. This packet does not mark `spiral_branch_chart_test` complete, does not edit the active-root or inactive-gap packets, and does not promote VP-1 into authored AAA prose.

Claim level. Computed verdict target, not yet a theorem-grade interval certificate. The arithmetic below consumes the nominal VP-1 chart from [spiral-branch-chart-certificate](spiral-branch-chart-certificate.md): three partner roots and one nontrivial self root on
$$
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right].
$$
The tangential sign has a stable positive computed margin. Therefore VP-1 is a computed fail of the bare isolated spiral tangential-drive test on the declared chart. A formal fail verdict requires the executable certificate to replace the sampled root continuation, Jacobian floors, inactive gaps, and quadrature value with outward intervals on the same active ledger.

## Inputs And Normalization

The candidate history is
$$
p(\theta)=-a\sin\theta,\qquad a=\frac{1}{10},
$$
with
$$
r(\theta)=R_\ast\exp(a(1-\cos\theta)),
\qquad
t(\theta)=\frac{\theta}{\Omega},
\qquad
b_\ast=\frac{\Omega R_\ast}{c_f}=\frac{7}{2}.
$$
For branch offset $\Delta>0$,
$$
\rho(\theta,\Delta)=\exp(a(\cos\theta-\cos(\theta-\Delta))),
\qquad
b(\theta)=b_\ast\exp(a(1-\cos\theta)).
$$
The partner and self root functions, Jacobians, and tangential numerators are those in the source packet. Equal-magnitude opposite charges are used, and the common positive force factor is removed. Thus only the signed normalized branch sums decide the radial threshold and tangential verdict.

The branch-continuation computation used the fixed root brackets

| Branch | Computation bracket |
| --- | ---: |
| Partner $P_1$ | $[2.45,2.55]$ |
| Partner $P_2$ | $[4.25,4.50]$ |
| Partner $P_3$ | $[6.75,6.95]$ |
| Self $S_1$ | $[4.75,4.95]$ |

A 101-point corridor sign check found a sign change in every bracket at every sampled $\theta$ and no sampled loss of the $3+1$ active count. The optimized sampled root ranges were
$$
\Delta_{P_1}\in[2.4837835659,2.5132106855],
\quad
\Delta_{P_2}\in[4.3145452586,4.4464617353],
$$
$$
\Delta_{P_3}\in[6.7945161699,6.9084040355],
\quad
\Delta_{S_1}\in[4.8164693618,4.8817394075].
$$
These ranges are computation supports only; the root-Jacobian packet owns the active-root interval enclosures and the certified $\nu_J$ floor.

## Radial-Turn Threshold

At $\theta=0$, define the normalized radial branch sum
$$
B_r(0)
=
-
\sum_{\Delta_p\in\mathcal{P}(0)}
\frac{1+\rho_p\cos\Delta_p}
{\Lambda_{p}^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(0)}
\frac{1-\rho_s\cos\Delta_s}
{\Lambda_{s}^3 |J_{11,s}|}.
$$
The recomputed center rows are:

| Branch | $\Delta$ | Radial contribution |
| --- | ---: | ---: |
| Partner $P_1$ | $2.502775826237740$ | $-0.024231036344904$ |
| Partner $P_2$ | $4.385887226263674$ | $-0.181892021406446$ |
| Partner $P_3$ | $6.806959743894224$ | $-0.146624871951705$ |
| Self $S_1$ | $4.840212128311296$ | $+0.081315349200877$ |

Therefore
$$
B_r(0)=-0.27143258050217867.
$$
With
$$
\Gamma\equiv\frac{r_\ast^3\Omega^2}{\kappa q_1^2},
$$
the normalized radial-turn row is
$$
\frac{r_\ast^2}{\kappa q_1^2}\mathcal{T}_r(0)
=
\Gamma+B_r(0).
$$
The computed admissible force-ratio threshold is
$$
\Gamma_{\mathrm{turn}}
=0.27143258050217867.
$$
Thus the radial row is conditionally admissible exactly when
$$
\Gamma>\Gamma_{\mathrm{turn}}+\varepsilon_r,
\qquad
\varepsilon_r>0,
$$
after the executable certificate replaces $\Gamma_{\mathrm{turn}}$ by an outward upper bound. If $\Gamma\le\Gamma_{\mathrm{turn}}$ in the same normalization, VP-1 fails the radial-turn row. If $\Gamma$ is not declared or the interval row touches equality, the radial-turn verdict is blocked by lack of strict margin rather than by the branch sum itself.

## Weighted Tangential-Drive Diagnostic

Let
$$
T(\theta)
=
\sum_{\Delta_p\in\mathcal{P}(\theta)}
\frac{S_T^p(\theta,\Delta_p)}
{\Lambda_p^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(\theta)}
\frac{S_T^s(\theta,\Delta_s)}
{\Lambda_s^3 |J_{11,s}|}.
$$
The diagnostic is
$$
\mathcal{D}_T(I_\ast)
=
\int_{-\pi/6}^{\pi/6}\cos^2(3\theta)\,T(\theta)\,d\theta.
$$
The pointwise sampled tangential checks are:

| $\theta$ | $T(\theta)$ |
| ---: | ---: |
| $-\pi/6$ | $0.083465087409934$ |
| $0$ | $0.075451140636219$ |
| $\pi/6$ | $0.084204887430428$ |

Bounded scalar minimization on the nominal branch continuation gave the sampled floor
$$
\min_{\theta\in I_\ast}T(\theta)
\approx
0.07533930778292029
$$
at
$$
\theta\approx-0.05580580397326822.
$$
Since the declared weight is nonnegative and positive in the corridor interior, this pointwise sampled floor is consistent with a strictly positive weighted diagnostic.

The quadrature value is
$$
\mathcal{D}_T(I_\ast)
\approx
0.04013001776065915.
$$
Adaptive quadrature reported absolute error $4.5\times10^{-16}$ in double precision. Gauss-Legendre checks on the same branch continuation were:

| Order | $\mathcal{D}_T(I_\ast)$ |
| ---: | ---: |
| $16$ | $0.04013001776065907$ |
| $32$ | $0.04013001776065907$ |
| $64$ | $0.04013001776065907$ |
| $256$ | $0.04013001776065904$ |

Computed margin. The nominal VP-1 chart has positive tangential drive by about
$$
+0.040130017760659.
$$
A conservative executable target is to prove an outward lower bound such as
$$
\mathcal{D}_T(I_\ast)\ge0.04012>0
$$
on the certified active root tubes. Proving merely $\mathcal{D}_T(I_\ast)\ge0$ is already enough to reject VP-1 for the bare isolated spiral test, because the pass condition is
$$
\mathcal{D}_T(I_\ast)\le-\varepsilon_T,
\qquad
\varepsilon_T>0.
$$

## Verdict Conditions

Radial-turn row. The branch sum is negative and gives the admissible force-ratio threshold
$$
\Gamma_{\mathrm{turn}}\approx0.271432580502179.
$$
VP-1 passes the radial-turn row only for $\Gamma$ strictly above the certified outward threshold. It fails the radial-turn row for $\Gamma$ at or below that threshold, and it remains blocked if no strict interval margin is declared.

Tangential-drive row. On the nominal $3+1$ chart, the tangential-drive verdict is fail: the computed diagnostic is positive, while a pass requires a strictly negative interval. The formal theorem-grade status is interval-pending, not sign-ambiguous. If the executable certificate proves a nonnegative lower interval bound on the same chart, VP-1 is certified as a failed candidate. If the interval encloses zero because root tubes, inactive gaps, or Jacobian floors are not certified, the tangential row is blocked. A negative value may not be accepted if it appears only by adding roots outside the certified active ledger, entering a Jacobian-null window, or changing the VP-1 candidate history.

## Integration Notes For The Executable Certificate

- Consume the active branches in the order $P_1,P_2,P_3,S_1$ and verify that the interval root enclosures remain inside the computation brackets above.
- Report the radial branch interval as $B_r(0)\in[B_r^-,B_r^+]$. The certified force-ratio threshold is then $-B_r^-$, not the midpoint.
- Report $\mathcal{D}_T(I_\ast)$ as an outward quadrature interval. Verdict rule: if the lower endpoint is nonnegative, VP-1 fails the tangential-drive row; if the upper endpoint is at most $-\varepsilon_T$, VP-1 passes the tangential row; otherwise the row is blocked.
- Gate the drive verdict behind positive active Jacobian floors, positive inactive gaps, self-coincidence clearance, and finite memory depth. The positive computed $\mathcal{D}_T$ should not be promoted while those chart rows are unresolved.
- Do not mark `spiral_branch_chart_test` complete from this packet alone. This packet supplies the drive verdict target consumed by the executable certificate.

## Claim Map

- Ontology: none added.
- Derivation/closure target: VP-1 radial-turn threshold and weighted tangential-drive verdict on the declared branch chart.
- Effective summary: the computed positive $\mathcal{D}_T(I_\ast)$ is a strong numerical failure signal that still requires outward interval certification before theorem-grade promotion.
- Speculation: none promoted.
