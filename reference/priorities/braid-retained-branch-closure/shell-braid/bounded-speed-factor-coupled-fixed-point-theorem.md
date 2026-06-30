# Bounded Speed Factor Coupled Fixed-Point Theorem

Promotion status: `priority-only`. This packet combines [bounded-speed-factor-all-pairs-ledger-handoff-contract.md](bounded-speed-factor-all-pairs-ledger-handoff-contract.md), [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), [bounded-speed-factor-normal-reconstruction-theorem.md](bounded-speed-factor-normal-reconstruction-theorem.md), the tail-cover row of [bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md), the variational/action rows of [bounded-speed-factor-variational-noether-closure.md](bounded-speed-factor-variational-noether-closure.md), and the branch-search decision layer of [bounded-speed-factor-branch-search-certificate.md](bounded-speed-factor-branch-search-certificate.md) into one coupled live-ledger fixed-point theorem target.

It does not retain a branch. It records the mathematical reason the speed ODE and normal reconstruction cannot be certified as independent rows once the root ledger is live: the roots, Jacobians, delayed directions, force normalization, support descriptor, event rows, and action scale all depend on both the arclength curves $\mathbf{Y}$ and the bounded speed factors $\nu$.

---

## 1. Coupled Unknown

Work on one same-level tri-binary branch chart, one source-pair policy, one same-source policy, one support descriptor, one action/event convention, one period/winding convention, and one row-weight convention.

The coupled unknown is

$$
\mathfrak{Z}_{\nu}
=
\left(
\mathbf{Y},
\nu,
\mathcal{A}_{\nu},
\eta,
\zeta,
\Gamma_B^{\nu},
\mathsf{Support}^{\nu},
\mathsf{Action}^{\nu},
\mathsf{Event}^{\nu}
\right).
$$

Here:

| Component | Meaning |
| --- | --- |
| $\mathbf{Y}$ | closed arclength curves $\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3$ with $\mathbf{T}_i=\mathbf{Y}_i'$ and $\mathbf{K}_i=\mathbf{Y}_i''$ |
| $\nu$ | positive bounded speed factors $0<\nu_-\le\nu_i(\lambda_i)\le\nu_+<\infty$ |
| $\mathcal{A}_{\nu}$ | retained causal-root ledger, including root labels, source identity, sign labels, excluded gaps, memory depth, and same-source policy |
| $\eta$ | active causal-delay root sheets $\eta_r(u)$ and event-window endpoint roots |
| $\zeta$ | fixed Jacobian-sign labels $\zeta_r\in\{+1,-1\}$ |
| $\Gamma_B^{\nu}$ | action-derived or diagnostic dynamics scale on the same bounded-speed ledger |
| $\mathsf{Support}^{\nu}$ | support center, support radii or band functions, support margins, support multipliers when active, and fixed-radius/free-support sector labels |
| $\mathsf{Action}^{\nu}$ | history work, speed-factor storage/exchange, support-work, curl, and scale rows |
| $\mathsf{Event}^{\nu}$ | self-hit windows, root-fold surfaces, band contacts, tail assimilations, endpoint jumps, and matching rows |

A finite chart coordinate may be written as

$$
z=(a,b,r,\gamma,s,e),
$$

where $a$ are curve coefficients, $b$ are speed-factor coefficients, $r$ are root-sheet or root-corrector variables, $\gamma$ represents $\Gamma_B^{\nu}$ when it is solved rather than consumed, $s$ contains support/action variables, and $e$ contains event variables. The decomposition is only a chart choice. The theorem target is for $\mathfrak{Z}_{\nu}$ as a coupled branch object.

For every site $i$,

$$
\chi_i(\lambda_i)
=
\int_0^{\lambda_i}\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i(u)=\chi_i^{-1}(u),
\qquad
\frac{d\Lambda_i}{du}
=
\nu_i(\Lambda_i(u)).
$$

For a root label $r=(i,j,\alpha)$,

$$
G_r^{\nu}(u,\eta_r;\mathbf{Y},\nu)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta_r))
\right\|
-\eta_r
=0.
$$

The bounded-speed root Jacobian is

$$
J_r^{\nu}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r,
$$

where all delayed source quantities are evaluated at $\lambda_j^-=\Lambda_j(u-\eta_r)$. The force ledger is

$$
F_i^{\nu}(u)
=
\sum_{r\in\mathcal{A}_{i}^{\nu}(u)}
\sigma_i\sigma_j
\frac{W_{r,\nu}^{\mathrm{rec}}(u)}{\eta_r(u)^2}
\widehat{\mathbf{R}}_r(u)
+
F_{i,\mathrm{self}}^{\nu}(u)
+
F_{i,\mathrm{med}}^{\nu}(u)
+
F_{i,\mathrm{supp}}^{\nu}(u),
$$

with $F_{i,\mathrm{supp}}^{\nu}$ present only when the support action or variational inequality assigns a support multiplier force. This force is a function of both $\mathbf{Y}$ and $\nu$ through $\Lambda_i$, $\Lambda_j$, $\eta_r$, the receiver-normal $W_{r,\nu}^{\mathrm{rec}}$ row, root-sheet sensitivity data, support variables, and event conventions.

---

## 2. Single Coupled Residual Operator

Define the weighted finite residual

$$
F_{\mathrm{cpl}}^{\nu}(z)
=
W_{\mathrm{cpl}}^{1/2}
\mathcal{R}_{\mathrm{cpl}}^{\nu}(z),
$$

with

$$
\mathcal{R}_{\mathrm{cpl}}^{\nu}
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
\mathcal{R}_{\mathrm{action/support}}^{\nu}\\
\mathcal{R}_{\mathrm{event}}^{\nu}
\end{bmatrix}.
$$

The Krawczyk data are emitted by the same packet as certificate rows

$$
\mathcal{K}_{\mathrm{cpl}}^{\nu}
=
\left(
Y_{\mathrm{cpl}},
Z_{\mathrm{cpl}},
\rho,
\rho_{\mathrm{chart},\mathrm{cpl}}^{\nu},
\epsilon_{\mathrm{tail}}^{\nu},
\epsilon_{\mathrm{disc}}^{\nu},
\epsilon_{\mathrm{cok}}^{\nu}
\right),
$$

not as a separate theorem. The derivative matrix used in $\mathcal{K}_{\mathrm{cpl}}^{\nu}$ must be the derivative of the whole coupled residual above.

### 2.0 Coupled Residual Object

The residual consumed by a branch search, implicit-function reduction, or Krawczyk certificate is not the row vector alone. The proof object is the coupled residual object

$$
\boxed{
\mathfrak{C}_{\mathrm{cpl}}^{\nu}
=
\left(
\mathfrak{Z}_{\nu},
\mathcal{R}_{\mathrm{cpl}}^{\nu},
W_{\mathrm{cpl}},
\mathcal{L}_{\mathrm{live}}^{\nu},
\mathcal{D}_{\mathrm{cpl}}^{\nu},
\mathcal{K}_{\mathrm{cpl}}^{\nu},
\mathcal{S}_{1}
\right).
}
$$

Here $\mathfrak{Z}_{\nu}$ is the full coupled unknown vector from Section 1, $\mathcal{R}_{\mathrm{cpl}}^{\nu}$ is the full row vector above, $W_{\mathrm{cpl}}$ fixes the row weights, $\mathcal{L}_{\mathrm{live}}^{\nu}$ records ledger consistency, $\mathcal{D}_{\mathrm{cpl}}^{\nu}$ records the full derivative or certified Schur derivative, $\mathcal{K}_{\mathrm{cpl}}^{\nu}$ records the Krawczyk budget, and $\mathcal{S}_{1}$ records the fixed-speed slice. A small residual norm without these companion rows is only a diagnostic residual.

The ledger consistency component is the conjunction

$$
\mathcal{L}_{\mathrm{live}}^{\nu}
=
\left(
\mathcal{L}_{\mathrm{chart}},
\mathcal{L}_{\mathrm{clock}},
\mathcal{L}_{\mathrm{root}},
\mathcal{L}_{\mathrm{force}},
\mathcal{L}_{\mathrm{support}},
\mathcal{L}_{\mathrm{action}},
\mathcal{L}_{\mathrm{event}},
\mathcal{L}_{\mathrm{der}}
\right),
$$

with the following meanings:

| Ledger row | Consistency condition |
| --- | --- |
| $\mathcal{L}_{\mathrm{chart}}$ | same branch chart, source-pair policy, same-source policy, period/winding convention, support sector, event convention, and row weights in every residual row |
| $\mathcal{L}_{\mathrm{clock}}$ | one set of $\nu_i$, $\chi_i$, $\Lambda_i$, $H_i$, winding rows, and clock derivative columns used by dynamics, roots, support, action, and events |
| $\mathcal{L}_{\mathrm{root}}$ | one retained $\mathcal{A}_{\nu}$ with fixed labels, fixed $\zeta_r$, positive delay and Jacobian floors, inactive gaps, noncollision floors, and a complete tail exclusion or assimilation cover |
| $\mathcal{L}_{\mathrm{force}}$ | one $F_i^{\nu}$ convention, including active roots, assimilated tail roots, excluded-tail error, self-hit terms, medium response, and support multiplier forces when active |
| $\mathcal{L}_{\mathrm{support}}$ | one support descriptor, support-band convention, support multipliers or variational inequality, support margins, radial row, and support-work assignment |
| $\mathcal{L}_{\mathrm{action}}$ | one action scale $\Gamma_B^{\nu}$ or declared fitted-scale status, one history-work row, one speed storage/exchange row, one support-work row, and one Noether sea/event exchange convention |
| $\mathcal{L}_{\mathrm{event}}$ | one set of first-event surfaces, endpoint roots, self-hit windows, root folds, speed-band contacts, support-boundary events, tail resets, and endpoint exchange rows |
| $\mathcal{L}_{\mathrm{der}}$ | derivative columns for every active curve, speed, clock, inverse-clock, root, Jacobian, force, support, action, scale, monodromy, and event variable, or a certified Schur replacement |

The derivative component $\mathcal{D}_{\mathrm{cpl}}^{\nu}$ may use implicit-function consumption only on a block with positive persistence margins. If $x$ denotes the retained outer variables and $y$ denotes an eliminated root, support, or event block, the eliminated equations must have

$$
\mathcal{R}_{\mathrm{ift}}^{\nu}(x,y)=0,
\qquad
D_y\mathcal{R}_{\mathrm{ift}}^{\nu}
\text{ is invertible on the proof ball}.
$$

Every residual row that consumes this elimination must use

$$
D\widehat{\mathcal{R}}_{\mathrm{out}}^{\nu}
=
D_x\mathcal{R}_{\mathrm{out}}^{\nu}
-
D_y\mathcal{R}_{\mathrm{out}}^{\nu}
\left(
D_y\mathcal{R}_{\mathrm{ift}}^{\nu}
\right)^{-1}
D_x\mathcal{R}_{\mathrm{ift}}^{\nu}.
$$

Thus a Krawczyk calculation may consume either the full derivative $D\mathcal{R}_{\mathrm{cpl}}^{\nu}$ or a reduced derivative with the displayed implicit derivative. It may not consume frozen roots, frozen support multipliers, frozen action scale, fixed-speed clock maps, or frozen event endpoints after the outer variables move.

The fixed-speed slice is the restriction

$$
\mathcal{S}_{1}:
\quad
\iota_1(a,r,\gamma,s,e)=(a,0,r,\gamma,s,e),
\qquad
\nu_i\equiv1,
\qquad
\chi_i=\Lambda_i=\mathrm{id}.
$$

The fixed-speed residual is the pulled-back and projected object

$$
\mathcal{R}_{\mathrm{fix}}
=
\Pi_1
\mathcal{R}_{\mathrm{cpl}}^{\nu}
\circ
\iota_1,
$$

where $\Pi_1$ removes free-speed coefficient rows that become tautologies and keeps their constrained consequences: $H_i=L_i$, the fixed-speed causal-root ledger, $\mathbf{T}_i\cdot F_i^1=0$, $\mathbf{K}_i=\Gamma_B^1P_i^\perp F_i^1$, and the corresponding support, action, event, derivative, cokernel, and Krawczyk rows. A fixed-speed calculation reports `fixed-speed-special-case`; bounded-speed continuation starts only after rebuilding $\mathfrak{C}_{\mathrm{cpl}}^{\nu}$ with active $b$ columns. If the seed is a certified fixed-speed all-pairs root ledger, the intake is governed by [bounded-speed-factor-all-pairs-ledger-handoff-contract.md](bounded-speed-factor-all-pairs-ledger-handoff-contract.md); fixed-speed root labels may seed the live ledger but may not replace bounded-speed clock, root, Jacobian, derivative, tail, or checksum rows.

If the packet cannot form $\mathfrak{C}_{\mathrm{cpl}}^{\nu}$, the first status is `coupled-residual-object-open`. If the rows exist but use inconsistent ledger conventions, the first status is `ledger-convention-mismatch`. If an implicit or Schur consumer omits the displayed derivative correction, the first status is `implicit-consumer-stale` unless an earlier row has already failed.

### 2.1 Speed Band

The inequality row is

$$
\mathcal{R}_{\nu\mathrm{band}}
=
\max_i
\max
\left\{
\sup_{\lambda}(\nu_- - \nu_i(\lambda))_+,\,
\sup_{\lambda}(\nu_i(\lambda)-\nu_+)_+
\right\}.
$$

Its margin contributes to the chart radius through $\rho_{\nu_-}$ and $\rho_{\nu_+}$. A speed-band pass is not enough by itself; the same $\nu$ must also satisfy the clock, speed ODE, normal, root, support, action, and event rows.

### 2.2 Clock And Period

The physical period is

$$
H_i
=
\int_0^{L_i}\frac{d\lambda}{\nu_i(\lambda)}.
$$

The equal-period row is

$$
\mathcal{R}_{H,i}
=
H_i-H_*,
$$

or, for rational winding,

$$
\mathcal{R}_{H,i}^{\mathrm{wind}}
=
m_iH_i-H_{\mathrm{com}}.
$$

The derivative columns must include

$$
D_b\chi_i(\lambda)
=
-\int_0^\lambda
\frac{D_b\nu_i(\xi)}{\nu_i(\xi)^2}
d\xi,
\qquad
D_b\Lambda_i(u)
=
-\nu_i(\Lambda_i(u))D_b\chi_i(\Lambda_i(u)).
$$

If these clock derivatives are absent, the coupled matrix is stale even when the sampled residual is small.

### 2.3 Speed ODE Mean And Primitive

The tangential dynamics row is

$$
\mathcal{R}_{\parallel,i}^{\nu}(\lambda_i)
=
\nu_i(\lambda_i)\nu_i'(\lambda_i)
-
\Gamma_B^{\nu}
\mathbf{T}_i(\lambda_i)\cdot
F_i^{\nu}(\chi_i(\lambda_i)).
$$

Equivalently, in center time,

$$
\frac{d\nu_i}{du}
=
\Gamma_B^{\nu}
T_i(u)\cdot F_i^{\nu}(u).
$$

The closed-period mean row is

$$
\mathcal{R}_{\mathrm{speed\text{-}mean},i}^{\nu}
=
\int_0^{H_*}
T_i(u)\cdot F_i^{\nu}(u)\,du,
$$

with the lifted period replacement when $m_iH_i=H_{\mathrm{com}}$. The primitive row is

$$
A_i(u)
=
\Gamma_B^{\nu}
\int_0^uT_i(s)\cdot F_i^{\nu}(s)\,ds,
\qquad
\mathcal{R}_{\mathrm{speed\text{-}prim},i}^{\nu}(u)
=
\nu_i(\Lambda_i(u))-\nu_{i,0}-A_i(u).
$$

The clock/length value of $\nu_{i,0}$ must agree with

$$
\nu_{i,0}
=
\frac{L_i-\int_0^{H_*}A_i(u)\,du}{H_*},
$$

or with the winding analogue. The primitive excursion must also obey

$$
A_{i,\max}-A_{i,\min}
\le
\nu_+-\nu_-.
$$

These rows are evaluated on the live force ledger, not on a frozen diagnostic force sampled before $\mathbf{Y}$, $\nu$, roots, or support variables moved.

### 2.4 Normal Reconstruction

The normal dynamics row is

$$
\mathcal{R}_{\perp,i}^{\nu}(\lambda_i)
=
\nu_i(\lambda_i)^2\mathbf{K}_i(\lambda_i)
-
\Gamma_B^{\nu}
P_i^\perp(\lambda_i)
F_i^{\nu}(\chi_i(\lambda_i)),
$$

where

$$
P_i^\perp
=
I-\mathbf{T}_i\mathbf{T}_i^T.
$$

Curve reconstruction also requires the closure rows

$$
\mathcal{R}_{T\mathrm{unit},i}
=
\|\mathbf{T}_i\|^2-1,
\qquad
\mathcal{R}_{T\mathrm{hol},i}
=
\int_0^{L_i}\mathbf{K}_i(\lambda)\,d\lambda,
$$

and

$$
\mathcal{R}_{Y\mathrm{close},i}
=
\int_0^{L_i}\mathbf{T}_i(\lambda)\,d\lambda.
$$

If a tangent frame or rotation class belongs to the support descriptor, the monodromy row is

$$
\mathcal{R}_{\mathrm{frame},i}
=
M_i-R_{\mathbf{e}_1}(2\pi q_i)
$$

in the declared frame gauge. If the branch is curve-only, this frame row reduces to tangent return and does not introduce a new rotation label.

### 2.5 Support-Radial Compatibility

Let the support descriptor supply a center $\mathbf{C}$ and

$$
r_i(\lambda)=\|\mathbf{Y}_i(\lambda)-\mathbf{C}\|,
\qquad
\mathbf{n}_i(\lambda)
=
\frac{\mathbf{Y}_i(\lambda)-\mathbf{C}}{r_i(\lambda)}.
$$

The support-radial compatibility row is the combined tangent-plus-normal radial identity

$$
\mathcal{R}_{\mathrm{support\text{-}rad},i}^{\nu}
=
\nu_i\nu_i'r_i'
+
\nu_i^2
\left(
r_i''
-
\frac{1-(r_i')^2}{r_i}
\right)
-
\Gamma_B^{\nu}\mathbf{n}_i\cdot F_i^{\nu}
=0.
$$

If support multipliers are included in $F_i^{\nu}$, this is the full radial dynamics row. If support multipliers are kept as separate constraint forces, replace the last term by

$$
\Gamma_B^{\nu}
\mathbf{n}_i\cdot
\left(
F_i^{\nu}+F_{i,\mathrm{supp}}^{\nu}
\right).
$$

The support-band row records either

$$
R_i^-(u)\le r_i(\Lambda_i(u))\le R_i^+(u),
$$

with positive margin or boundary viability, or a fixed-radius special sector

$$
r_i(\lambda)\equiv R_i.
$$

A fixed-radius row does not prove the free-support row unless the support action or variational inequality is also closed on the same support descriptor.

### 2.6 Root Persistence

The active root equation row is

$$
\mathcal{R}_{\mathrm{root}}^{\nu}
=
\left(
G_r^{\nu}(u,\eta_r;\mathbf{Y},\nu)
\right)_{r\in\mathcal{A}_{\nu}}.
$$

Persistence requires the inequalities

$$
\eta_r(u)\ge\eta_0,
\qquad
\zeta_rJ_r^{\nu}(u)\ge J_0>0,
$$

plus inactive-cell exclusions

$$
|G_q^{\nu}(u,\eta)|\ge g_0
$$

on every excluded causal-time cell, noncollision floors, tail exclusions or assimilations, and unchanged same-source policy. The tail exclusions or assimilations must be organized as the finite owned cover of [bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md); local cell predicates do not by themselves close persistence. These inequalities define $\mathcal{R}_{\mathrm{root\text{-}persist}}^{\nu}$ as a first-failure row. If any retained sign, root count, source policy, excluded gap, tail owner, or terminal tail predicate changes inside the proof ball, the output is a new branch attempt rather than a coupled reconstruction of the same ledger.

### 2.7 Action And Support Work

The action/support block contains at least the scale row

$$
\mathcal{R}_{\Gamma}^{\nu}
=
\gamma-\Gamma_B^{\nu}
$$

when an action-derived $\Gamma_B^{\nu}$ is consumed. If $\gamma$ is only fitted, the packet must emit `gamma-fitted-not-derived`.

The speed-factor storage is

$$
E_{\mathrm{spd},i}^{\nu}(u)
=
\frac12m_{\mathrm{car}}c_f^2
\left(
\nu_i(\Lambda_i(u))^2-1
\right),
$$

and the storage/exchange row is

$$
\mathcal{R}_{\mathrm{exch},i}^{\nu}
=
\frac{dE_{\mathrm{spd},i}^{\nu}}{du}
-
E_\epsilon(R_*)
\nu_i
\mathbf{T}_i\cdot F_i^{\nu}
-
\mathcal{P}_{\mathrm{constr},i}^{\nu}
-
\mathcal{P}_{\mathrm{sea/event},i}^{\nu}.
$$

For a free-support branch, $\mathcal{P}_{\mathrm{constr},i}^{\nu}$ must include the support multiplier power unless that power is explicitly assigned to $\mathcal{P}_{\mathrm{sea/event},i}^{\nu}$. The support complementarity rows are

$$
\mu_i^+(u)\ge0,
\qquad
\mu_i^-(u)\ge0,
\qquad
\mu_i^+B_i^+=0,
\qquad
\mu_i^-B_i^-=0.
$$

The history-work curl, support-work one-form, speed storage, event exchange, and scale row must all use the same $\chi_i$, $\Lambda_i$, $\mathcal{A}_{\nu}$, $\eta_r$, $J_r^{\nu}$, and support descriptor as the dynamics rows.

### 2.8 Event Rows

The event row contains every declared first-event or event-window equation:

| Event row | Required data |
| --- | --- |
| speed-band contact | $\nu_i(\lambda_*)=\nu_-$ or $\nu_i(\lambda_*)=\nu_+$ with crossing or tangency status |
| root fold | $G_r^{\nu}=0$, $J_r^{\nu}=0$, and the local fold normal form |
| self-hit window | entry/exit roots, endpoint speed jump, dwell-time, return crossing, and overspeed budget |
| tail assimilation | new causal-time root sheet, sign label, delay floor, and ledger reset status |
| support boundary event | active boundary, multiplier or variational-inequality row, and endpoint impulse if nonsmooth |
| action/event exchange | storage or Noether sea exchange row carrying any nonzero endpoint jump |

The coupled fixed-point theorem certifies a retained chart only away from unassimilated first events. If an event is reached before the proof ball closes, the correct output is the event status, not a retained coupled fixed point.

---

## 3. Schur/Block Structure

Use the variable ordering

$$
z=(b,a,r,s,\gamma,e),
$$

and the row grouping

$$
\mathcal{R}_{\mathrm{cpl}}^{\nu}
=
\left(
\mathcal{R}_S,\,
\mathcal{R}_N,\,
\mathcal{R}_R,\,
\mathcal{R}_A,\,
\mathcal{R}_E
\right),
$$

where:

| Block | Rows |
| --- | --- |
| $S$ | speed-band, clock/period, speed-ODE mean, primitive, and tangential dynamics rows |
| $N$ | normal equation, unit tangent, tangent holonomy, position closure, and tangent-frame rows |
| $R$ | active roots, root-sheet derivatives, Jacobian signs, inactive gaps, tail exclusions, and noncollision floors |
| $A$ | support-radial, support-band, action scale, speed storage/exchange, curl, support work, and complementarity rows |
| $E$ | first-event surfaces, event-window matching, self-hit, root-fold, support-boundary, and endpoint exchange rows |

The full derivative has the block form

$$
D\mathcal{R}_{\mathrm{cpl}}^{\nu}
=
\begin{bmatrix}
R_{S,b} & R_{S,a} & R_{S,r} & R_{S,s} & R_{S,\gamma} & R_{S,e}\\
R_{N,b} & R_{N,a} & R_{N,r} & R_{N,s} & R_{N,\gamma} & R_{N,e}\\
R_{R,b} & R_{R,a} & R_{R,r} & R_{R,s} & R_{R,\gamma} & R_{R,e}\\
R_{A,b} & R_{A,a} & R_{A,r} & R_{A,s} & R_{A,\gamma} & R_{A,e}\\
R_{E,b} & R_{E,a} & R_{E,r} & R_{E,s} & R_{E,\gamma} & R_{E,e}
\end{bmatrix}.
$$

This block display is organizational, not a claim of independence. The essential off-diagonal columns are:

1. $R_{S,a}$ and $R_{S,r}$, because the speed forcing $T_i\cdot F_i^{\nu}$ changes with curves, roots, receiver-normal branch weights, and support forces;
2. $R_{N,b}$ and $R_{N,r}$, because the normal row contains $\nu_i^2$, $\chi_i$, $\Lambda_i$, root sheets, and force derivatives;
3. $R_{R,a}$ and $R_{R,b}$, because roots and Jacobians are functions of both geometry and speed clocks;
4. $R_{A,a}$, $R_{A,b}$, and $R_{A,r}$, because action scale, history work, speed storage, support work, and curl are computed on the same live ledger;
5. $R_{E,a}$, $R_{E,b}$, and $R_{E,r}$, because event surfaces are defined by the same speeds, roots, support variables, and endpoint conventions.

When root sheets are solved by an inner corrector, the admissible Schur complement first eliminates only the root equation block on a fixed sign/gap stratum:

$$
\delta r
=
-R_{R,r}^{-1}
\left(
R_R
+R_{R,b}\delta b
+R_{R,a}\delta a
+R_{R,s}\delta s
+R_{R,\gamma}\delta\gamma
+R_{R,e}\delta e
\right).
$$

Substitution gives reduced derivatives such as

$$
\widehat R_{S,b}
=
R_{S,b}
-
R_{S,r}R_{R,r}^{-1}R_{R,b},
$$

and

$$
\widehat R_{N,a}
=
R_{N,a}
-
R_{N,r}R_{R,r}^{-1}R_{R,a}.
$$

This Schur reduction is valid only while $R_{R,r}$ is invertible with retained delay, Jacobian, inactive-gap, tail, and noncollision margins. A frozen-root solve that omits the Schur correction is diagnostic, not a live-ledger fixed-point certificate.

---

## 4. Coupled Krawczyk Theorem Target

**Theorem target: bounded speed factor coupled fixed-point certificate.** Fix one bounded-speed branch chart, one root-sign stratum, one source-pair policy, one same-source policy, one support descriptor, one action/event convention, one period/winding convention, and one row-weight convention. Let $z_0$ be a finite chart point representing

$$
(\mathbf{Y}_0,\nu_0,\mathcal{A}_{\nu,0},\eta_0,\Gamma_{B,0}^{\nu},\mathsf{Support}_0^{\nu},\mathsf{Action}_0^{\nu},\mathsf{Event}_0^{\nu}).
$$

Suppose:

1. $\mathcal{R}_{\mathrm{cpl}}^{\nu}(z)$ is defined on a closed chart ball $\|z-z_0\|\le\rho$ with fixed gauge, fixed root labels, fixed Jacobian signs, fixed same-source policy, fixed support sector, and fixed event convention;
2. the speed band, delay floors, Jacobian floors, inactive-root gaps, noncollision floors, support margins, action-scale margins, event margins, and discretization/tail bounds remain positive on the ball;
3. the derivative matrix includes all curve, speed, clock, inverse-clock, root-sheet, Jacobian, force, support, action, scale, monodromy, and event columns in the active variables;
4. the weighted coupled residual $F_{\mathrm{cpl}}^{\nu}$ has an approximate inverse $C_{\mathrm{cpl}}$ on the gauge-reduced range;
5. the Krawczyk quantities

$$
Y_{\mathrm{cpl}}
=
\|C_{\mathrm{cpl}}F_{\mathrm{cpl}}^{\nu}(z_0)\|,
$$

and

$$
Z_{\mathrm{cpl}}
=
\sup_{\|h\|\le\rho}
\left\|
I-C_{\mathrm{cpl}}
DF_{\mathrm{cpl}}^{\nu}(z_0+h)
\right\|
$$

satisfy

$$
\boxed{
Z_{\mathrm{cpl}}<1,
\qquad
Y_{\mathrm{cpl}}+Z_{\mathrm{cpl}}\rho<\rho,
\qquad
\rho\le\rho_{\mathrm{chart},\mathrm{cpl}}^{\nu}.
}
$$

Then there is a unique coupled solution in the chart ball satisfying the speed ODE, clock/period, normal reconstruction, support-radial, root persistence, action/support work, and event-matching rows on the same live bounded-speed ledger.

The chart radius is

$$
\rho_{\mathrm{chart},\mathrm{cpl}}^{\nu}
=
\min
\left\{
\rho_{\mathrm{geom}},
\rho_{\mathrm{unit}},
\rho_{\nu_-},
\rho_{\nu_+},
\rho_{\nu'},
\rho_H,
\rho_{\chi},
\rho_{\mathrm{root}}^{\nu},
\rho_{\eta}^{\nu},
\rho_J^{\nu},
\rho_{\mathrm{gap}}^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\rho_{\mathrm{sheet}}^{\nu},
\rho_d,
\rho_{\mathrm{support}}^{\nu},
\rho_{\mathrm{supp\text{-}work}}^{\nu},
\rho_{\Gamma}^{\nu},
\rho_{\mathrm{curl}}^{\nu},
\rho_{\mathrm{event}}^{\nu},
\rho_{\mathrm{disc}}
\right\}.
$$

For an overdetermined residual, the range/cokernel split must also close:

$$
\sup_{\|h\|\le\rho}
\left\|
P_{\mathrm{cok},\mathrm{cpl}}
\mathcal{R}_{\mathrm{cpl}}^{\nu}(z_0+h)
\right\|
+
\epsilon_{\mathrm{tail}}^{\nu}
+
\epsilon_{\mathrm{disc}}^{\nu}
\le
\tau_{\mathrm{cok}}.
$$

The theorem target yields a bounded-speed dynamics/action candidate, not a retained branch. Master retention still requires the remaining tail, Noether/event exchange, action curl, inventory, stability, observer export, and refinement-persistence rows.

---

## 5. First-Failure Ordering

A coupled packet must report the first failed row in this order:

1. `coupled-residual-object-open`
2. `coupled-unknown-schema-open`
3. `ledger-convention-mismatch`
4. `speed-band-failure`
5. `clock-period-failure`
6. `speed-ode-mean-fails`
7. `speed-primitive-mismatch`
8. `speed-clock-length-fails`
9. `normal-equation-open`
10. `normal-holonomy-open`
11. `position-closure-open`
12. `tangent-frame-monodromy-open`
13. `support-radial-compatibility-open`
14. `support-margin-failure`
15. `root-equation-open`
16. `root-ledger-persistence-failure`
17. `root-jacobian-floor-failure`
18. `inactive-root-gap-failure`
19. `tail-persistence-open`
20. `bounded-speed-tail-cover-incomplete`
21. `action-scale-mismatch`
22. `support-action-work-open`
23. `bounded-speed-factor-exchange-open`
24. `speed-el-ode-equivalence-open`
25. `action-curl-open`
26. `self-hit-exchange-residual-open`
27. `event-matching-open`
28. `implicit-consumer-stale`
29. `derivative-block-stale`
30. `bounded-speed-gauge-slice-open`
31. `bounded-speed-finite-mode-system-open`
32. `coupled-cokernel-open`
33. `coupled-krawczyk-open`
34. `bounded-speed-branch-decision-open`
35. `bounded-speed-coupled-fixed-point-candidate`

If the calculation deliberately stays in the fixed-speed subspace, the status is `fixed-speed-special-case` rather than a failure. If it leaves the fixed-speed subspace but retains fixed-speed roots, forces, derivatives, action scale, or event rows, the first relevant stale-row status must be reported before any candidate status.

---

## 6. Fixed-Speed Special Case

The fixed-speed special case is recovered by imposing

$$
\nu_i\equiv1,
\qquad
b=0,
\qquad
D\nu_i=0,
\qquad
\chi_i(\lambda)=\lambda,
\qquad
\Lambda_i(u)=u.
$$

Then

$$
H_i=L_i,
$$

the bounded-speed root function becomes the fixed-speed causal-root equation, and

$$
J_r^{\nu}
=
1-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r.
$$

The tangential speed row reduces to the old pointwise fixed-speed tangent closure

$$
\mathbf{T}_i\cdot F_i^1=0,
$$

and the normal row becomes

$$
\mathbf{K}_i
=
\Gamma_B^1P_i^\perp F_i^1.
$$

Therefore a fixed-speed proof budget is exactly the constrained subspace of the coupled theorem where all speed columns are removed and all clock maps are the identity.

Leaving the fixed-speed subspace requires recomputing:

1. $\chi_i$, $\Lambda_i$, $H_i$, winding rows, and their derivative columns;
2. active roots $G_r^{\nu}=0$, delays $\eta_r$, Jacobian signs $J_r^{\nu}$, inactive gaps, tail slabs, and noncollision floors;
3. forces $F_i^{\nu}$ and their derivatives through $\eta_r^{-2}$, $W_{r,\nu}^{\mathrm{rec}}$, delayed directions, self-hit terms, medium-response terms, and support multipliers;
4. the speed primitive $A_i$, zero-mean tangent forcing, speed-band feasibility, clock/length speed, and tangential residual;
5. the normal row with the $\nu_i^2$ curvature factor and bounded-speed projector/force derivatives;
6. support-radial compatibility, support work, speed-factor storage/exchange, action curl, and action-derived $\Gamma_B^{\nu}$;
7. event surfaces for speed-band contacts, bounded-speed root folds, self-hit windows, support-boundary contacts, and endpoint exchange;
8. the whole Krawczyk matrix, Schur complement, chart radius, and cokernel row.

An old fixed-speed normal reconstruction certificate cannot be promoted to a bounded-speed coupled certificate by adding speed samples after the fact. Once $\nu$ is active, the ledger itself changes.

---

## 7. Output Schema

A bounded speed factor coupled fixed-point packet must emit:

| Field | Required payload |
| --- | --- |
| `solver_space` | `bounded-speed-coupled-fixed-point` or `fixed-speed-special-case` |
| `unknown_tuple` | $\mathbf{Y}$, $\nu$, root sheets, sign labels, $\Gamma_B^{\nu}$, support variables, action rows, and event variables |
| `finite_chart` | coefficient vector $z=(a,b,r,\gamma,s,e)$, gauge rows, basis, collocation grid, and row weights |
| `coupled_residual_object` | $\mathfrak{C}_{\mathrm{cpl}}^{\nu}$, including $\mathfrak{Z}_{\nu}$, $\mathcal{R}_{\mathrm{cpl}}^{\nu}$, $W_{\mathrm{cpl}}$, $\mathcal{L}_{\mathrm{live}}^{\nu}$, $\mathcal{D}_{\mathrm{cpl}}^{\nu}$, $\mathcal{K}_{\mathrm{cpl}}^{\nu}$, and $\mathcal{S}_1$ |
| `ledger_consistency` | chart, clock, root, force, support, action, event, and derivative consistency rows from $\mathcal{L}_{\mathrm{live}}^{\nu}$ |
| `all_pairs_ledger_handoff` | source fixed-speed ledger reference, bounded-speed clock lift, pair-policy handoff, root-label handoff, inactive-gap cover, tail interface, derivative columns, force checksum, and consumer checksum from [bounded-speed-factor-all-pairs-ledger-handoff-contract.md](bounded-speed-factor-all-pairs-ledger-handoff-contract.md) |
| `branch_search_certificate` | branch class, coefficient box, search residual, margin vector, execution order, trichotomy, and report fields from [bounded-speed-factor-branch-search-certificate.md](bounded-speed-factor-branch-search-certificate.md) |
| `gauge_reduction` | symmetry generators, gauge slice, neutral projection, bordered matrix, and rank status from [bounded-speed-factor-symmetry-gauge-reduction.md](bounded-speed-factor-symmetry-gauge-reduction.md) |
| `clock_period` | $\chi_i$, $\Lambda_i$, $H_i$, $H_*$ or $m_iH_i=H_{\mathrm{com}}$, clock derivatives, and period residuals |
| `speed_rows` | speed band, $T_i\cdot F_i^{\nu}$, zero-mean row, primitive $A_i$, initial-speed value, clock/length row, and tangential residual |
| `normal_rows` | $\nu_i^2\mathbf{K}_i-\Gamma_B^{\nu}P_i^\perp F_i^{\nu}$, unit tangent, tangent holonomy, position closure, and frame monodromy |
| `root_ledger_live` | $G_r^{\nu}$, $\eta_r$, $J_r^{\nu}$, sign labels, active brackets, inactive gaps, root derivatives, tail cover, and noncollision floors |
| `tail_cover` | finite ownership map, terminal predicates, overlap consistency, no-gap residual, coefficient-box persistence, and event-reset status |
| `support_rows` | support descriptor, fixed/free sector, support-radial compatibility, support margins, support multipliers or variational inequality, and support-work status |
| `action_rows` | action-derived or fitted $\Gamma_B^{\nu}$, history-work curl, speed storage/exchange, support work, Noether sea/event exchange, and scale status |
| `variational_noether_rows` | period variation mode, speed-factor EL row, speed-ODE equivalence, exchange residual, support work, and Noether-current envelope |
| `event_rows` | first-event surfaces, self-hit windows, self-hit exchange rows, root folds, band contacts, support-boundary events, endpoint jumps, and ledger-reset status |
| `block_structure` | row/variable block order, active Schur eliminations, omitted-column audit, and stale-block status |
| `implicit_function_consumption` | eliminated root, support, or event blocks, inverse floors, implicit derivative correction, and consumer rows |
| `derivative_matrix_coupled` | columns in $a$, $b$, $r$, $s$, $\gamma$, and $e$, including clock/root/force/support/action/event derivatives |
| `krawczyk_budget_coupled` | $Y_{\mathrm{cpl}}$, $Z_{\mathrm{cpl}}$, $\rho$, $\rho_{\mathrm{chart},\mathrm{cpl}}^{\nu}$, range/cokernel split, tail/discretization bounds, and obstruction status |
| `branch_krawczyk_decision` | inclusion, exclusion, event-reset, certified-rejection, or proof-budget status from [bounded-speed-factor-branch-krawczyk-decision-theorem.md](bounded-speed-factor-branch-krawczyk-decision-theorem.md) |
| `fixed_speed_recovery` | whether $\nu_i\equiv1$ is imposed, which bounded-speed columns are absent, and which rows must be recomputed before bounded-speed continuation |
| `status` | first failed status or `bounded-speed-coupled-fixed-point-candidate` |

---

## 8. Status Codes

| Status | Meaning |
| --- | --- |
| `coupled-residual-object-open` | the packet does not emit $\mathfrak{C}_{\mathrm{cpl}}^{\nu}$ as a single consumed residual object with unknowns, rows, weights, ledger consistency, derivative data, Krawczyk data, and fixed-speed slice |
| `coupled-unknown-schema-open` | the packet does not declare the coupled $\mathbf{Y}$, $\nu$, root, scale, support, action, and event unknowns |
| `ledger-convention-mismatch` | residual rows use different branch charts, clock maps, root ledgers, force conventions, support descriptors, action scales, event conventions, or row weights |
| `speed-band-failure` | $\nu$ leaves the declared positive speed band |
| `clock-period-failure` | equal physical period or winding compatibility fails |
| `speed-ode-mean-fails` | the tangent forcing does not have zero closed-period mean on the live ledger |
| `speed-primitive-mismatch` | emitted $\nu$ does not equal the live-ledger primitive solution |
| `speed-clock-length-fails` | initial speed or clock/length row is inconsistent with the primitive |
| `normal-equation-open` | $\nu_i^2\mathbf{K}_i-\Gamma_B^{\nu}P_i^\perp F_i^{\nu}$ does not close |
| `normal-holonomy-open` | $\int\mathbf{K}_i\,d\lambda$ fails on the declared cover |
| `position-closure-open` | $\int\mathbf{T}_i\,d\lambda$ fails on the declared cover |
| `tangent-frame-monodromy-open` | tangent-frame return or declared rotation row fails |
| `support-radial-compatibility-open` | radial projection disagrees with the combined tangent-plus-normal support identity |
| `support-margin-failure` | support margins or boundary viability fail |
| `root-equation-open` | active root equations $G_r^{\nu}=0$ are not solved |
| `root-ledger-persistence-failure` | root count, sign label, same-source policy, or retained ledger changes inside the proof ball |
| `root-jacobian-floor-failure` | $\zeta_rJ_r^{\nu}\ge J_0$ fails |
| `inactive-root-gap-failure` | excluded root cells lose their gap floor |
| `tail-persistence-open` | causal-time tail exclusion or assimilation is unresolved |
| `bounded-speed-tail-cover-incomplete` | local tail predicates exist but the finite ownership map, no-gap row, overlap consistency, or coefficient-box persistence is missing |
| `action-scale-mismatch` | $\Gamma_B^{\nu}$ is imported from a different ledger or fitted without action compatibility |
| `support-action-work-open` | support multiplier work or variational inequality is missing for an active free-support row |
| `bounded-speed-factor-exchange-open` | speed storage/exchange is not closed |
| `speed-el-ode-equivalence-open` | the speed-factor Euler-Lagrange row is not calibrated to the tangential speed ODE on the declared period convention |
| `self-hit-exchange-residual-open` | a finite self-hit interval lacks speed-energy, potential, work, endpoint, conservation, or provenance exchange closure |
| `action-curl-open` | history/support/action work one-form is not closed within tolerance |
| `event-matching-open` | event endpoint, self-hit, fold, band-contact, support-boundary, or exchange matching fails |
| `implicit-consumer-stale` | an implicit-function or Schur-reduced consumer uses eliminated roots, support variables, action scale, or event variables without the required derivative correction |
| `derivative-block-stale` | derivative matrix omits active curve, speed, clock, root, force, support, action, scale, or event columns |
| `bounded-speed-gauge-slice-open` | the symmetry quotient, gauge rows, neutral projection, or bordered rank certificate is missing |
| `bounded-speed-finite-mode-system-open` | the finite-mode variable blocks, row dimensions, truncation split, or solver artifact schema is incomplete |
| `coupled-cokernel-open` | overdetermined cokernel residual is not enclosed |
| `coupled-krawczyk-open` | $Z_{\mathrm{cpl}}<1$, $Y_{\mathrm{cpl}}+Z_{\mathrm{cpl}}\rho<\rho$, or $\rho\le\rho_{\mathrm{chart},\mathrm{cpl}}^{\nu}$ fails |
| `bounded-speed-branch-decision-open` | the branch box has not been classified by interval inclusion, event reset, certified rejection, or proof-budget/refinement status |
| `fixed-speed-special-case` | $\nu_i\equiv1$ is imposed; result is not a bounded-speed certificate |
| `bounded-speed-coupled-fixed-point-candidate` | all coupled residual and Krawczyk rows close on the same live bounded-speed ledger |

Current status:

$$
\texttt{bounded-speed-factor-coupled-fixed-point-open}.
$$
