# Spiral Branch-Chart Certificate

Status. Dependency-aware proof packet for `spiral_branch_chart_test`. This packet prepares the first concrete variable-pitch spiral branch-chart certification target, but it does not close or advance the queue item because `circular_asymptotics` still owns the theorem-grade circular tail constants.

Claim level. Candidate VP-1 below is a branch-chart certification target, not a promoted master-equation closure claim. A passing certificate would show that the chosen isolated variable-pitch spiral has a replayable finite causal-root chart and a negative weighted tangential drive on a radial-turn corridor. A failing certificate would falsify this candidate only; it would become a stronger bare-kernel obstruction only after the circular dependency and the interval proof rows close.

## Source Equations Consumed

The Master EOM supplies the branch-resolved acceleration law
$$
\frac{d^2 \mathbf{x}_i}{dt^2}
=
\sum_j \sum_{t_0\in\mathcal{C}_{ij}(t)}
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}
{r_{ij}^2(t;t_0)\,\left|J_{ij}(t;t_0)\right|}
\hat{\mathbf{r}}_{ij}(t;t_0),
$$
with
$$
J_{ij}(t;t_0)
\equiv
1-\frac{\mathbf{v}_j(t_0)\cdot\hat{\mathbf{r}}_{ij}(t;t_0)}{c_f}.
$$
The branch-chart object is usable only when its active roots are simple, its inactive complements have positive gaps, and its memory depth is finite:
$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
=
\left(
\mathcal{R}^{\mathrm{act}},
\mathcal{G}^{\mathrm{inact}},
\nu_J,
h_{\mathrm{mem}},
\mathcal{R}_{\mathrm{return}},
\lambda_{\mathrm{sec}}
\right),
$$
with
$$
\nu_J>0,\qquad
\inf_{\mathcal{G}^{\mathrm{inact}}}g_a^{ij}>0,\qquad
0<h_{\mathrm{mem}}<h<\infty.
$$
The dyadic-lock priority note supplies the discipline used here: a root ledger is only a branch label until a finite-$\eta$ return or certificate reports finite active branches, positive Jacobian floors, a closed returned section, and a non-symmetry stability gap. VP-1 therefore reports branch-chart data first and does not use an integer branch count as proof of stability.

## Candidate History VP-1

Use the symmetric isolated pair
$$
\mathbf{x}_1(\theta)=r(\theta)\mathbf{e}_r(\theta),
\qquad
\mathbf{x}_2(\theta)=-r(\theta)\mathbf{e}_r(\theta),
$$
with
$$
p(\theta)=-\frac{r'(\theta)}{r(\theta)}=-a\sin\theta,
\qquad
a=\frac{1}{10},
$$
$$
r(\theta)=R_\ast\exp(a(1-\cos\theta)),
\qquad
t(\theta)=\frac{\theta}{\Omega},
\qquad
b_\ast=\frac{\Omega R_\ast}{c_f}=\frac{7}{2}.
$$
The radial-turn corridor is
$$
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
\qquad
\theta_\ast=0,
$$
so
$$
p(0)=0,
\qquad
p'(0)=-a<0.
$$
This is the smallest paper-executable variable-pitch target because it has one controlled pitch reversal, a finite memory domain below, and the circular tangential sign at the turn point remains visible.

For any candidate branch offset $\Delta>0$, define
$$
\rho(\theta,\Delta)
=
\frac{r(\theta-\Delta)}{r(\theta)}
=
\exp(a(\cos\theta-\cos(\theta-\Delta))),
$$
$$
p_0=p(\theta-\Delta),
\qquad
b(\theta)=\frac{\Omega r(\theta)}{c_f}
=b_\ast\exp(a(1-\cos\theta)).
$$

## Partner And Self Root Equations

The partner geometry is
$$
\Lambda_p(\theta,\Delta)
=
\sqrt{1+\rho^2+2\rho\cos\Delta},
$$
with root equation
$$
F_p(\theta,\Delta)
\equiv
\Lambda_p(\theta,\Delta)-\frac{\Delta}{b(\theta)}
=0.
$$
The self geometry is
$$
\Lambda_s(\theta,\Delta)
=
\sqrt{1+\rho^2-2\rho\cos\Delta},
$$
with nontrivial self-root equation
$$
F_s(\theta,\Delta)
\equiv
\Lambda_s(\theta,\Delta)-\frac{\Delta}{b(\theta)}
=0,
\qquad
\Delta>0.
$$
The certification domain is
$$
D_h=(0,4\pi],
\qquad
h=\frac{4\pi}{\Omega}.
$$
The interval proof must choose a coincidence clearance $0<\Delta_{\mathrm{co}}<1$ and certify active roots only on
$$
D_{\mathrm{cert}}=[\Delta_{\mathrm{co}},4\pi],
$$
while separately proving the excluded-coincidence row
$$
\inf_{\theta\in I_\ast,\ 0<\Delta<\Delta_{\mathrm{co}}}
\frac{|F_s(\theta,\Delta)|}{\Delta}>0.
$$

## Jacobian-Floor Checks

The VP-1 partner Jacobian is
$$
J_{12}
=
1+
\frac{b(\theta)\rho}{\Lambda_p}
\left[\sin\Delta-p_0(\cos\Delta+\rho)\right],
$$
and the VP-1 self Jacobian is
$$
J_{11}
=
1-
\frac{b(\theta)\rho}{\Lambda_s}
\left[\sin\Delta+p_0(\rho-\cos\Delta)\right].
$$
The active floor is
$$
\nu_J
=
\min\left\{
\inf_{\theta\in I_\ast,\ \Delta_p\in\mathcal{P}(\theta)}
|J_{12}(\theta,\Delta_p)|,
\inf_{\theta\in I_\ast,\ \Delta_s\in\mathcal{S}(\theta)}
|J_{11}(\theta,\Delta_s)|
\right\}.
$$
Acceptance requires an explicit interval lower bound
$$
\nu_J\ge\nu_{\mathrm{cert}}>0.
$$
Failure occurs immediately if an active row touches $J=0$, if a negative tangential contribution appears only inside a Jacobian-null window, or if the root labels cannot be continued across $I_\ast$ without branch exchange.

## Inactive Complements And Finite Memory

The active root tubes must be removed from $I_\ast\times D_{\mathrm{cert}}$. Every remaining partner box $Q_a^p$ and self box $Q_a^s$ must satisfy
$$
g_a^p=\inf_{Q_a^p}|F_p(\theta,\Delta)|>0,
\qquad
g_a^s=\inf_{Q_a^s}|F_s(\theta,\Delta)|>0.
$$
The finite-memory estimate is already explicit:
$$
\rho\le e^{2a},
\qquad
\Lambda_{p,s}\le1+e^{2a},
\qquad
b(\theta)\le b_\ast e^{2a}.
$$
Therefore every retained root obeys
$$
\Delta\le b_\ast e^{2a}(1+e^{2a})
=9.497\ldots<4\pi,
$$
so
$$
h_{\mathrm{mem}}
\le
\frac{b_\ast e^{2a}(1+e^{2a})}{\Omega}
<
\frac{4\pi}{\Omega}=h.
$$
The finite-memory ledger row is accepted only if the computed active root enclosures all lie below the displayed bound and the inactive boxes cover the rest of $D_{\mathrm{cert}}$.

## Radial-Turn Inequality

At the turn point, define
$$
\mathcal{T}_r(0)
\equiv
r_\ast\Omega^2
-
\sum_{\Delta_p\in\mathcal{P}(0)}
\frac{\kappa |q_1q_2|\,(1+\rho_p\cos\Delta_p)}
{r_\ast^2\Lambda_{p}^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(0)}
\frac{\kappa q_1^2\,(1-\rho_s\cos\Delta_s)}
{r_\ast^2\Lambda_{s}^3 |J_{11,s}|}.
$$
For equal-magnitude opposite charges, write
$$
\Gamma
\equiv
\frac{r_\ast^3\Omega^2}{\kappa q_1^2}.
$$
The sampled VP-1 center rows below give the normalized branch sum
$$
-
\sum_{\Delta_p\in\mathcal{P}(0)}
\frac{1+\rho_p\cos\Delta_p}
{\Lambda_{p}^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(0)}
\frac{1-\rho_s\cos\Delta_s}
{\Lambda_{s}^3 |J_{11,s}|}
=-0.2714325805\ldots.
$$
Thus the interval radial-turn acceptance condition for this equal-charge normalization is
$$
\Gamma>0.2714325805\ldots+\varepsilon_r,
\qquad
\varepsilon_r>0,
$$
with the decimal replaced by an outward interval upper bound in the final certificate.

## Weighted Tangential-Drive Verdict

The branch tangential numerators are
$$
S_T^p(\theta,\Delta)
=
p(\theta)(1+\rho\cos\Delta)+\rho\sin\Delta,
$$
$$
S_T^s(\theta,\Delta)
=
-p(\theta)(1-\rho\cos\Delta)+\rho\sin\Delta.
$$
Use the declared quadrature weight
$$
w(\theta)=\cos^2(3\theta),
\qquad
\theta\in I_\ast.
$$
The diagnostic is
$$
\mathcal{D}_T(I_\ast)
\equiv
\int_{I_\ast}w(\theta)
\left[
\sum_{\Delta_p\in\mathcal{P}(\theta)}
\frac{|q_1q_2|\,S_T^p(\theta,\Delta_p)}
{\Lambda_p^3 |J_{12,p}|}
+
\sum_{\Delta_s\in\mathcal{S}(\theta)}
\frac{q_1^2\,S_T^s(\theta,\Delta_s)}
{\Lambda_s^3 |J_{11,s}|}
\right]d\theta.
$$
VP-1 passes the bare isolated spiral test only if the interval certificate proves
$$
\mathcal{D}_T(I_\ast)\le-\varepsilon_T,
\qquad
\varepsilon_T>0,
$$
while preserving $\nu_J>0$, positive inactive gaps, and finite memory depth. VP-1 fails this route if
$$
\mathcal{D}_T(I_\ast)\ge0
$$
on the certified chart, or if a negative value appears only by adding roots outside the certified active ledger.

## Paper Root Rows For The First Certificate

The following rows are a reproducibility target for the interval proof. They are not theorem-grade bounds; each decimal must be replaced by an outward enclosure before promotion.

At $\theta=0$, the sampled active ledger on $D_h=(0,4\pi]$ is:

| Class | $\Delta$ | $J$ | $\Lambda$ | $S_T$ | $S_T/(\Lambda^3|J|)$ |
| --- | ---: | ---: | ---: | ---: | ---: |
| Partner | $2.502775826$ | $4.356934994$ | $0.715078807$ | $0.714036100$ | $0.448205692$ |
| Partner | $4.385887226$ | $-1.771316799$ | $1.253110636$ | $-1.080902793$ | $-0.310114554$ |
| Partner | $6.806959744$ | $1.740787379$ | $1.944845641$ | $0.506902428$ | $0.039584324$ |
| Self | $4.840212128$ | $4.003062376$ | $1.382917751$ | $-1.082270060$ | $-0.102224321$ |

Endpoint sample checks preserve the same active count:

| $\theta$ | Partner roots | Self roots | Minimum sampled $|J|$ | Tangential sample sum |
| ---: | ---: | ---: | ---: | ---: |
| $-\pi/6$ | $3$ | $1$ | $1.669656880$ | $0.083465087$ |
| $0$ | $3$ | $1$ | $1.740787379$ | $0.075451141$ |
| $\pi/6$ | $3$ | $1$ | $1.912151342$ | $0.084204887$ |

A trapezoidal scratch quadrature over the same chart gives
$$
\mathcal{D}_T(I_\ast)\approx0.0401300178
$$
for equal-magnitude charges after the common positive factor is removed. This sampled sign points toward a VP-1 failure of the bare isolated spiral test, but the formal verdict is reserved for the interval certificate because root tubes, inactive gaps, and Jacobian floors must be certified on the whole corridor.

## Acceptance Ledger

The first executable certificate passes only if every row below is supplied.

| Row | Required certificate | Pass condition |
| --- | --- | --- |
| Candidate history | $a=1/10$, $b_\ast=7/2$, $I_\ast=[-\pi/6,\pi/6]$, $D_h=(0,4\pi]$. | Same history used in all rows. |
| Partner active roots | Interval enclosures for all roots of $F_p=0$ on $I_\ast\times D_{\mathrm{cert}}$. | Exactly the certified root tubes are retained; no unlisted partner root remains. |
| Self active roots | Interval enclosures for all nontrivial roots of $F_s=0$ on $I_\ast\times D_{\mathrm{cert}}$. | Exactly the certified root tubes are retained; near-coincidence row is excluded by $|F_s|/\Delta$ clearance. |
| Jacobian floor | Outward lower bound for $|J_{12}|$ and $|J_{11}|$ on active tubes. | $\nu_J\ge\nu_{\mathrm{cert}}>0$. |
| Inactive gaps | Box cover of inactive complements with lower bounds for $|F_p|$ and $|F_s|$. | Every gap bound is positive. |
| Finite memory | Root upper bound and active maximum $\Delta_{\max}$. | $\Delta_{\max}<b_\ast e^{2a}(1+e^{2a})<4\pi$. |
| Root transport | Interval residual for the simple-root transport equation on each active tube. | $\sup\mathcal{R}_{\mathrm{tr},\alpha}\le\varepsilon_{\mathrm{tr}}$. |
| Radial turn | Outward interval for $\mathcal{T}_r(0)$. | $\mathcal{T}_r(0)>0$, equivalently $\Gamma$ exceeds the branch bound in the equal-charge normalization. |
| Tangential drive | Outward interval for $\mathcal{D}_T(I_\ast)$. | Pass if $\mathcal{D}_T\le-\varepsilon_T$; fail VP-1 if $\mathcal{D}_T\ge0$. |
| Dependency status | Circular obstruction handoff from `circular_asymptotics`. | Do not mark `spiral_branch_chart_test` complete until circular tail constants close. |

## Failure Modes

VP-1 is rejected as a certified branch-chart target if any of the following occurs:

- an active partner or self row loses the Jacobian floor;
- an inactive complement gap closes, exposing an unlisted causal root;
- the self-coincidence interval cannot be separated from the nontrivial self roots;
- the finite-memory bound reaches or exceeds $h=4\pi/\Omega$;
- the root-transport residual fails on a retained tube;
- $\mathcal{T}_r(0)\le0$ for the declared force ratio, so the candidate is not a radial-turn corridor;
- $\mathcal{D}_T(I_\ast)\ge0$, so the bare isolated spiral does not beat the tangential obstruction;
- $\mathcal{D}_T(I_\ast)<0$ only after adding uncertified roots, using a Jacobian-null window, or changing the candidate history;
- the result depends on an unresolved regulator or memory-window refinement;
- the circular dependency remains open and the packet is mistaken for priority completion rather than a dependency-aware certificate target.

## Claim Map

- Ontology: none added. The packet uses the existing delayed causal-root law and does not add a new substrate entity.
- Derivation/closure target: certify or falsify VP-1 as a local branch-chart candidate with positive floors, finite memory, a radial turn, and a tangential-drive verdict.
- Effective summary: the sampled positive $\mathcal{D}_T$ is only a guide for the interval proof.
- Speculation: none promoted. If later work varies $a$, $b_\ast$, $I_\ast$, or the candidate history to hunt for a negative tangential chart, that is a new parameter-search packet rather than a VP-1 conclusion.
