# Bounded Speed Factor Branch Krawczyk Decision Theorem

Promotion status: `priority-only`. This packet turns the bounded speed factor root-sheet, tail-cover, self-hit exchange, Noether-Sea exchange, and Krawczyk proof-budget rows into one branch-box decision theorem. It refines [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md), [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md), [bounded-speed-factor-tail-krawczyk-certificate.md](bounded-speed-factor-tail-krawczyk-certificate.md), [bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md), [bounded-speed-factor-second-root-variation-lemma.md](bounded-speed-factor-second-root-variation-lemma.md), [root-jacobian-barrier-lemma.md](root-jacobian-barrier-lemma.md), [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md), and [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md).

It does not retain a branch. Its purpose is to state a solver-checkable theorem for accepting, rejecting, or refusing to decide a finite bounded-speed branch box without confusing proof-budget failure with a physical obstruction.

---

## 1. Branch Box And Live Root-Sheet Domain Box

Fix one same-level architrino branch chart, source-pair policy, same-source policy, endpoint convention, support descriptor, period or winding convention, event convention, row-weight convention, and live ledger identity. A finite bounded-speed chart vector is

$$
z=(a,b,r,\gamma,s,e),
$$

where $a$ are curve coefficients, $b$ are bounded speed factor coefficients, $r$ are active root-sheet or root-corrector variables, $\gamma$ contains $\Gamma_B^{\nu}$ or inertia-scale variables when solved, $s$ contains support and action variables, and $e$ contains event variables.

A **branch box** is the interval product

$$
B
=
A\times B_{\nu}\times R\times G_{\Gamma}\times S\times E
\subset\mathbb{R}^{N_z},
$$

with center $z_0$ and radii $\rho_k$ in a declared norm. Its scalar proof radius is

$$
\rho_B
=
\sup_{z\in B}\|z-z_0\|.
$$

The box is chart-admissible only if every $z\in B$ keeps:

$$
0<\nu_-\le\nu_i(\lambda_i;z)\le\nu_+<\infty,
$$

the declared period row

$$
H_i^{\nu}(z)
=
\int_0^{L_i}\frac{d\lambda}{\nu_i(\lambda;z)}
$$

or its winding version, the support descriptor, the event convention, and the live ledger labels.

The causal-time clock and inverse clock are

$$
\chi_i(\lambda;z)
=
\int_0^\lambda\frac{d\xi}{\nu_i(\xi;z)},
\qquad
\Lambda_i(u;z)=\chi_i^{-1}(u;z).
$$

A live root-sheet domain box is a finite family

$$
\mathcal{U}_B^{\nu}
=
\{U_{\ell}\times I_{\ell}\}_{\ell\in\mathcal{L}_{\mathrm{root}}},
\qquad
U_{\ell}=[u_{\ell}^-,u_{\ell}^+],
\qquad
I_{\ell}=[\eta_{\ell}^-,\eta_{\ell}^+],
$$

where each label $\ell=(i,j,\alpha,p)$ names one ordered source pair, one root label, and one causal-time cell. On $U_{\ell}\times I_{\ell}$ define

$$
G_{\ell}^{\nu}(u,\eta;z)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u;z);z)
-
\mathbf{Y}_j(\Lambda_j(u-\eta;z);z)
\right\|
-\eta.
$$

The retained sheet condition is

$$
G_{\ell}^{\nu}(u,\eta_{\ell}(u;z);z)=0,
\qquad
\eta_{\ell}(u;z)\in I_{\ell}.
$$

The bounded-speed root-sheet Jacobian is

$$
J_{\ell}^{\nu}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_{\ell},
\qquad
\partial_{\eta}G_{\ell}^{\nu}=-J_{\ell}^{\nu},
$$

with

$$
\lambda_i=\Lambda_i(u;z),
\qquad
\lambda_j^-=\Lambda_j(u-\eta;z),
\qquad
\nu_j^-=\nu_j(\lambda_j^-;z),
$$

and

$$
\widehat{\mathbf{R}}_{\ell}
=
\frac{
\mathbf{Y}_i(\lambda_i;z)-\mathbf{Y}_j(\lambda_j^-;z)
}{
\left\|
\mathbf{Y}_i(\lambda_i;z)-\mathbf{Y}_j(\lambda_j^-;z)
\right\|
}.
$$

For every retained root label the interval packet must emit a fixed sign $\zeta_{\ell}\in\{+1,-1\}$ and positive floors

$$
\eta_{\ell}\ge\eta_0,
\qquad
\zeta_{\ell}J_{\ell}^{\nu}\ge J_0,
\qquad
J_0>\epsilon_J,
\qquad
\eta_0>\epsilon_{\eta}.
$$

---

## 2. Interval Residual And Interval Derivative Enclosures

Let the weighted coupled residual be

$$
F_B(z)
=
W_B^{1/2}
\mathcal{R}_B^{\nu}(z),
$$

where

$$
\mathcal{R}_B^{\nu}
=
\begin{bmatrix}
\mathcal{R}_{\mathrm{gauge}}\\
\mathcal{R}_{\nu\mathrm{band}}\\
\mathcal{R}_{H\mathrm{wind}}\\
\mathcal{R}_{\mathrm{speed\text{-}mean}}^{\nu}\\
\mathcal{R}_{\mathrm{speed\text{-}prim}}^{\nu}\\
\mathcal{R}_{\parallel}^{\nu}\\
\mathcal{R}_{\perp}^{\nu}\\
\mathcal{R}_{T\mathrm{unit}}\\
\mathcal{R}_{T\mathrm{hol}}\\
\mathcal{R}_{Y\mathrm{close}}\\
\mathcal{R}_{\mathrm{frame}}\\
\mathcal{R}_{\mathrm{support\text{-}rad}}^{\nu}\\
\mathcal{R}_{\mathrm{support\text{-}band}}^{\nu}\\
\mathcal{R}_{\mathrm{root}}^{\nu}\\
\mathcal{R}_{\mathrm{root\text{-}persist}}^{\nu}\\
\mathcal{R}_{\mathrm{tail\text{-}cover}}^{\nu}\\
\mathcal{R}_{\mathrm{self\text{-}hit\text{-}exchange}}^{\nu}\\
\mathcal{R}_{\mathrm{action/support}}^{\nu}\\
\mathcal{R}_{\mathrm{Noether\text{-}Sea}}^{\nu}\\
\mathcal{R}_{\mathrm{event}}^{\nu}
\end{bmatrix}.
$$

The interval residual enclosure is an outward-rounded interval vector

$$
F(B)
\supset
\{F_B(z):z\in B\}.
$$

The interval derivative enclosure is an outward-rounded interval matrix

$$
DF(B)
\supset
\{DF_B(z):z\in B\}.
$$

The derivative enclosure must include clock, inverse-clock, root-sheet, force-weight, support, action, self-hit, event, and Noether-Sea columns. In particular, for every speed-factor direction $v$ the packet must account for

$$
D_v\chi_i(\lambda)
=
-\int_0^\lambda
\frac{D_v\nu_i(\xi)}
{\nu_i(\xi)^2}
d\xi,
\qquad
D_v\Lambda_i(u)
=
-\nu_i(\Lambda_i(u))D_v\chi_i(\Lambda_i(u)).
$$

For a retained sheet the derivative rows must include

$$
D_v\eta_{\ell}
=
\frac{
\widehat{\mathbf{R}}_{\ell}\cdot
\left(
\Xi_{v,i}-\Xi_{v,j}^-
\right)
}{
J_{\ell}^{\nu}
},
$$

and the derivative-Lipschitz row must include the second-root and second-Jacobian envelopes from the bounded-speed second root-variation packet. First root-sheet derivatives alone are not enough for a Krawczyk decision.

---

## 3. Preconditioned Krawczyk Map

Let $C$ be a declared preconditioner for the square decision rows. It may be the inverse of $DF_B(z_0)$, an interval-certified inverse, or the SVD range inverse after projecting onto the certified range. For a square full-rank decision row, define the interval Krawczyk map

$$
K(B)
=
z_0-CF_B(z_0)
+
\left(I-CDF(B)\right)(B-z_0).
$$

For a range-projected row with $F_R=U_R^TF_B$ and $C=V\Sigma^{-1}$, use

$$
K_R(B)
=
z_0-CF_R(z_0)
+
\left(I-CDF_R(B)\right)(B-z_0).
$$

The range proof quantities are

$$
Y=\|CF_R(z_0)\|,
\qquad
Z=\sup_{z\in B}\|I-CDF_R(z)\|.
$$

When the derivative-Lipschitz envelope is emitted as

$$
\|DF_R(z_0+h)-DF_R(z_0)\|\le L_R\rho_B,
$$

and $C$ is exact on the certified range at $z_0$, a sufficient bound is

$$
Z\le\|C\|L_R\rho_B.
$$

The inclusion test is

$$
K_R(B)\subset\operatorname{int}B,
$$

or, equivalently in radius form,

$$
Z<1,
\qquad
Y+Z\rho_B<\rho_B,
\qquad
\rho_B\le\rho_{\mathrm{chart}}^{\nu}.
$$

The enclosed range-zero radius is

$$
\rho_*=\frac{Y}{1-Z},
\qquad
\rho_*<\rho_B.
$$

The interval exclusion test is

$$
0\notin F(B)
$$

for at least one mandatory scalar row, or a certified separating functional

$$
\ell(F(B))\cap\{0\}=\varnothing.
$$

For a range-projected system, root-free rejection inside $B$ also requires a cokernel obstruction or an interval residual row not removed by the range projection. A failed range inclusion without a separating residual is not a rejection.

Nonunique-root rejection is allowed only when the interval Newton or Krawczyk image proves that more than one zero of the same live ledger lies in $B$, or when two accepted subboxes with the same branch identity have disjoint interiors and overlapping physical labels without an event or symmetry quotient. Otherwise the status is undecided, not nonunique.

---

## 4. Chart Preservation And Side Conditions

The chart radius used by the decision theorem is

$$
\rho_{\mathrm{chart}}^{\nu}
=
\min
\left\{
\rho_{\nu\mathrm{band}},
\rho_H,
\rho_{\chi},
\rho_{\mathrm{root}}^{\nu},
\rho_J^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\rho_{\mathrm{sheet}}^{\nu},
\rho_{\mathrm{support}}^{\nu},
\rho_{\mathrm{action}}^{\nu},
\rho_{\mathrm{self\text{-}hit}}^{\nu},
\rho_{\mathrm{Noether\text{-}Sea}}^{\nu},
\rho_{\mathrm{event}}^{\nu},
\rho_{\mathrm{disc}}
\right\}.
$$

Every entry must be positive and must refer to the same live ledger. The root and Jacobian entries require

$$
\Lambda_G(B)
<
\min\{\gamma_{\mathrm{end}},\gamma_{\mathrm{gap}}\},
$$

$$
\Lambda_J(B)
<
J_0-\epsilon_J,
$$

and

$$
\frac{\Lambda_G(B)}
{J_0-\Lambda_J(B)}
<
\Delta_{\eta}.
$$

The bounded speed factor band entry requires

$$
m_{\nu}^{-}(B)
=
\inf_{i,\lambda,z\in B}
\left(\nu_i(\lambda;z)-\nu_-\right)
>0,
$$

and

$$
m_{\nu}^{+}(B)
=
\inf_{i,\lambda,z\in B}
\left(\nu_+-\nu_i(\lambda;z)\right)
>0.
$$

The period or winding entry requires an interval row enclosing $H_i^{\nu}$ and its derivative columns through $\nu_i^{-2}$. If $H_i^{\nu}$ leaves the declared equal-period or winding chart inside $B$, the branch box is rejected for speed-band or period-chart failure only when the violated row is mandatory; otherwise the box is undecided with a chart-open status.

The tail entry requires the coefficient-box finite cover

$$
\mathcal{D}_{\mathrm{tail}}^{\nu}
=
\bigsqcup_{(i,j)}
\{(i,j)\}\times U_i^{\mathrm{per}}\times
(\eta_{\mathrm{mem}},B_{\mathrm{sup}}+m_{\eta}]
$$

with terminal owners `excluded`, `assimilated-root-tube`, `boundary-owned`, or `event-reset`. The no-gap cover residual must satisfy

$$
\mathcal{R}_{\mathrm{cover}}^{\nu}=0,
\qquad
\operatorname{persist}(\Omega_{\mathrm{tail}}^{\nu})=\texttt{coefficient-box}.
$$

Every self-hit window intersecting $B$ must be assigned to an event partition. For a self-hit window $W=[u_-,u_+]$, the branch box may pass only if the finite return row, speed excursion row, endpoint convention, potential-work identity, work split, exchange residual, momentum ledger, angular-momentum ledger, charge ledger, source-provenance ledger, and post-hit ledger all use the same bounded-speed live ledger. The energy exchange row is

$$
\left|
\mathcal{R}_{\mathrm{exch,hit}}^{\nu}(W)
\right|
\le
\tau_{\mathrm{exch,hit}}.
$$

The Noether-Sea row must close the same symmetry and exchange convention as the action row. For each declared generator $\zeta$ the conservation envelope must include

$$
|\mathcal{R}_{\zeta}^{\nu}|
\le
C_{\zeta,Y}\|\mathrm{EL}_{Y}^{\nu}\|
+
C_{\zeta,\nu}\|\Pi_H^{\nu,*}\mathrm{EL}_{\nu}^{\nu}\|
+
C_{\zeta,\eta}\|\mathrm{EL}_{\eta}^{\nu}\|
+
C_{\zeta,\mathrm{exch}}\|R_{\mathrm{exch}}^{\nu}\|
+
C_{\zeta,\mathrm{supp}}\|\mathcal{R}_{\zeta,\mathrm{supp}}^{\nu}\|
+
\epsilon_{\mathrm{curl}}^{\nu}
+
\epsilon_{\mathrm{root}}^{\nu}
+
\epsilon_{\mathrm{tail}}^{\nu}
+
\epsilon_{\mathrm{disc}}^{\nu}
+
\epsilon_{\mathrm{endpoint}}^{\nu}.
$$

If any side condition is checked pointwise but not on the whole branch box, it cannot support acceptance or rejection.

---

## 5. Decision Theorem

**Theorem target: bounded speed factor branch Krawczyk decision.** Fix a branch box $B$ with center $z_0$, live root-sheet domain box $\mathcal{U}_B^{\nu}$, interval residual enclosure $F(B)$, interval derivative enclosure $DF(B)$, preconditioner $C$, chart radius $\rho_{\mathrm{chart}}^{\nu}$, tail-cover certificate, self-hit/event partition, and Noether-Sea exchange rows as above.

Assume:

1. $B$ is contained in one declared bounded-speed branch chart with positive speed band, invertible causal clocks, and the declared period or winding convention;
2. every active causal root sheet has an isolating bracket, positive delay floor, fixed root-sheet Jacobian sign, and positive Jacobian floor throughout $B$;
3. excluded root intervals, inactive gaps, memory endpoints, support collars, period-cut faces, and event-window faces have owned finite-cover status throughout $B$;
4. the tail cover is coefficient-box persistent and either excludes tail roots or assimilates them as unique root tubes with fixed sign strata;
5. every self-hit window has a closed event partition and exchange ledger, or the box explicitly rejects because that partition fails;
6. the bounded speed factor positivity and band constraints persist throughout $B$;
7. the action, support, event, and Noether-Sea rows consume the same live ledger as the residual and derivative enclosures;
8. $DF(B)$ encloses the derivative of the whole residual map used by the Krawczyk row, including second-root derivative-Lipschitz contributions;
9. $C$ is a certified inverse or range inverse for the declared decision rows;
10. $\rho_B\le\rho_{\mathrm{chart}}^{\nu}$.

Then:

- If $K(B)\subset\operatorname{int}B$ for a square row, or $K_R(B)\subset\operatorname{int}B$ together with the cokernel/action/Noether-Sea audit passes for a range row, there exists a unique zero of the declared bounded-speed branch residual in $B$. The solver may emit `bounded-speed-branch-krawczyk-accepted`.
- If $0\notin F(B)$ for a mandatory row, or a certified separating cokernel or adjoint obstruction excludes zero on the range enclosure, then no zero of the declared branch residual exists in $B$. The solver may emit `bounded-speed-branch-rejected-no-root`.
- If the interval root-sheet chart proves more than one zero on the same live ledger inside $B$ without a symmetry quotient, event reset, or ledger split, the solver may emit `bounded-speed-branch-rejected-nonunique-root`.
- If a root-sheet Jacobian floor, tail-cover owner, bounded speed factor band, self-hit exchange row, or Noether-Sea exchange row fails as a mandatory side condition, the solver may reject with the corresponding taxonomy below.
- If none of the acceptance or rejection predicates passes, the solver must emit a first-failure open status rather than a retained or rejected branch.

Proof route:

1. Use the speed band to make each $\chi_i$ a monotone causal clock and each $\Lambda_i$ well-defined on the branch box.
2. Apply the root/Jacobian barrier inequalities to preserve the live root count, labels, isolating brackets, and fixed Jacobian sign strata.
3. Use the coefficient-box tail cover to make every tail point either root-free, assimilated into one differentiable root tube, boundary-owned, or event-reset owned.
4. Use the self-hit/event partition to remove same-source excursions from ordinary root persistence unless their exchange ledgers close.
5. Use the Noether Sea and action rows to ensure speed-factor storage, support work, event exchange, and current leakage are part of the same residual.
6. Apply the interval Krawczyk theorem to the square residual, or to the certified range residual plus cokernel audit, using $DF(B)$ and $C$.
7. For rejection, use interval separation of a mandatory residual row, certified obstruction in the cokernel, or failure of a mandatory chart side condition.
8. Uniqueness follows from the Krawczyk self-map contraction on the declared box and does not extend outside $B$.

---

## 6. Rejection Taxonomy

| Rejection | Required proof |
| --- | --- |
| `no-root` | $0\notin F(B)$ for a mandatory row, or certified cokernel/adjoint obstruction excludes the residual zero on $B$ |
| `nonunique-root` | two or more zeros of the same live ledger are certified inside $B$ without symmetry quotient, event reset, or ledger split |
| `singular-root-sheet` | some retained or assimilated sheet has $\eta_{\ell}\le\epsilon_{\eta}$, $\zeta_{\ell}J_{\ell}^{\nu}\le\epsilon_J$, or no fixed sign stratum on $B$ |
| `tail-leak` | the tail cover has unowned points, duplicate owners, an uncertified cell, a nonpersistent owner, or a tail root not excluded or assimilated |
| `speed-band-failure` | $\nu_i$ violates positivity, the declared lower/upper band, inverse-clock admissibility, or period/winding chart persistence on $B$ |
| `self-hit-exchange-failure` | a self-hit window has finite return without closed speed excursion, endpoint convention, potential-work identity, exchange residual, event ledger, or post-hit ledger |
| `Noether-exchange-failure` | action, support, event, speed-storage, or Noether-Sea rows fail to close the declared conservation envelope on the same live ledger |

A proof-budget failure is not automatically one of these rejections. Missing derivative envelopes, missing second-root variations, missing row weights, missing preconditioner certification, or missing cokernel audit produce open statuses unless an explicit separating residual or mandatory side-condition failure is certified.

---

## 7. Certificate Schema

A solver report for this theorem must emit:

| Field | Payload |
| --- | --- |
| `packet_id` | branch chart, source-pair policy, same-source policy, endpoint convention, period/winding convention, support descriptor, event convention, row weights, and live ledger hash |
| `branch_box` | $B$, $z_0$, coordinate names, interval endpoints, norm, $\rho_B$, and owned subbox identifiers |
| `root_sheet_domain_box` | $\mathcal{U}_B^{\nu}$, root labels, causal-time cells, delay brackets, endpoint owners, and event splits |
| `clock_and_speed_band` | $\chi_i$, $\Lambda_i$, $H_i^{\nu}$, $\nu_-$, $\nu_+$, $m_{\nu}^-$, $m_{\nu}^+$, inverse-clock margins, and limiting speed row |
| `root_jacobian_floors` | $G_{\ell}^{\nu}$, $J_{\ell}^{\nu}$, $\zeta_{\ell}$, $\eta_0$, $J_0$, $\gamma_{\mathrm{end}}$, $\gamma_{\mathrm{gap}}$, $\Delta_{\eta}$, $\Lambda_G$, and $\Lambda_J$ |
| `tail_cover` | $\Omega_{\mathrm{tail}}^{\nu}$, terminal owner list, no-gap residual, overlap consistency, coefficient-box persistence, $\rho_{\mathrm{tail}}^{\nu}$, and tail status |
| `self_hit_event_partition` | self-hit windows, finite-return rows, endpoint convention, speed excursion, potential-work identity, exchange residuals, event reset owners, and post-hit ledgers |
| `Noether_Sea_exchange` | action functional identity, speed-storage exchange, support work, event/Noether-Sea powers, symmetry generators, current envelope, and first failed exchange row |
| `residual_enclosure` | residual row list, row weights, interval vector $F(B)$, center residual $F_B(z_0)$, and mandatory-row flags |
| `derivative_enclosure` | interval matrix $DF(B)$, derivative method, clock/root/speed/support/action/event columns, second-root derivative-Lipschitz constants, and stale-derivative checks |
| `preconditioner` | square inverse or range inverse, SVD rank, singular values, cutoff, $\|C\|$, inverse certification, and projector convention |
| `krawczyk_budget` | $Y$, $Z$, $L_R$, $\rho_B$, $\rho_{\mathrm{chart}}^{\nu}$, $\rho_*$, inclusion result, cokernel audit, and obstruction lower bound if used |
| `decision` | `accepted`, `rejected`, or `open` |
| `rejection_taxonomy` | one of `no-root`, `nonunique-root`, `singular-root-sheet`, `tail-leak`, `speed-band-failure`, `self-hit-exchange-failure`, `Noether-exchange-failure`, or `none` |
| `first_failure_status` | first status from Section 8 |
| `promotion_decision` | `priority-only`, `promote-after-executable-certificate`, `not-retained`, or `rejected-local-box` |

---

## 8. First-Failure Statuses

Report the first failed row in this order:

1. `bounded-speed-branch-schema-open`
2. `bounded-speed-branch-box-open`
3. `bounded-speed-live-ledger-mismatch`
4. `bounded-speed-clock-open`
5. `bounded-speed-period-chart-open`
6. `bounded-speed-band-failure`
7. `bounded-speed-root-domain-box-open`
8. `bounded-speed-root-jacobian-floor-failure`
9. `bounded-speed-root-gap-failure`
10. `bounded-speed-tail-cover-incomplete`
11. `bounded-speed-tail-leak`
12. `bounded-speed-self-hit-event-partition-open`
13. `bounded-speed-self-hit-exchange-failure`
14. `bounded-speed-action-ledger-mismatch`
15. `bounded-speed-Noether-exchange-failure`
16. `bounded-speed-residual-enclosure-open`
17. `bounded-speed-derivative-enclosure-open`
18. `bounded-speed-second-root-envelope-open`
19. `bounded-speed-preconditioner-open`
20. `bounded-speed-krawczyk-range-rank-open`
21. `bounded-speed-krawczyk-inclusion-failed`
22. `bounded-speed-cokernel-audit-open`
23. `bounded-speed-branch-rejected-no-root`
24. `bounded-speed-branch-rejected-nonunique-root`
25. `bounded-speed-branch-rejected-singular-root-sheet`
26. `bounded-speed-branch-rejected-tail-leak`
27. `bounded-speed-branch-rejected-speed-band-failure`
28. `bounded-speed-branch-rejected-self-hit-exchange-failure`
29. `bounded-speed-branch-rejected-Noether-exchange-failure`
30. `bounded-speed-branch-krawczyk-accepted`

Current status before an executable solver report is

$$
\texttt{bounded-speed-branch-schema-open},
\qquad
\texttt{bounded-speed-derivative-enclosure-open},
\qquad
\texttt{not-retained}.
$$

Promotion decision:

$$
\texttt{priority-only}
\quad\to\quad
\texttt{promote-after-executable-certificate}
$$

only after a solver report emits the full schema above with a positive chart radius, coefficient-box tail persistence, self-hit/event exchange closure, Noether-Sea exchange closure, certified derivative enclosure, certified preconditioner, and either a Krawczyk acceptance or a rigorous local rejection.
