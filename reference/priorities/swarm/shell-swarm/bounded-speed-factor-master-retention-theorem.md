# Bounded Speed Factor Master Retention Theorem

Promotion status: `priority-only`. This packet is the bounded-speed successor to the fixed-speed master theorem in [support-complete-m3-master-retention-theorem.md](support-complete-m3-master-retention-theorem.md). It defines what it would mean to retain a shell swarm branch when each architrino carries a bounded speed factor $\nu_i$ rather than the fixed-speed constraint $\nu_i\equiv1$.

It does not claim retention. It states the rows that must be recomputed on one live ledger before the bounded-speed model can replace the current exact-antipodal $M=3$ fixed-speed screens. The fixed-speed all-pairs root ledger can enter this stack only through [bounded-speed-factor-all-pairs-ledger-handoff-contract.md](bounded-speed-factor-all-pairs-ledger-handoff-contract.md), which records the bounded-speed clock, root, Jacobian, derivative, tail, force, and consumer-checksum rows that must be rebuilt before the coupled fixed-point row consumes the source ledger.

---

## 1. Bounded-Speed Certificate Tuple

A bounded-speed retained-branch certificate is the tuple

$$
\mathfrak{R}_{\nu}(B)
=
\left(
\mathsf{Geom},
\mathsf{Support}^{\nu},
\mathsf{Speed},
\mathsf{SpeedODE}^{\nu},
\mathsf{Clock},
\mathsf{Center}^{\nu},
\mathsf{Tail}^{\nu},
\mathsf{Root}^{\nu},
\mathsf{Sheet}^{\nu},
\mathsf{Dyn}^{\nu},
\mathsf{NormalRec}^{\nu},
\mathsf{CoupledFP}^{\nu},
\mathsf{Search}^{\nu},
\mathsf{Gauge}^{\nu},
\mathsf{Action}^{\nu},
\mathsf{Kraw}^{\nu},
\mathsf{Decision}^{\nu},
\mathsf{Limit}^{\nu},
\mathsf{Noether}^{\nu},
\mathsf{Event}^{\nu},
\mathsf{Anti}^{\nu},
\mathsf{Stability}^{\nu},
\mathsf{Inventory},
\mathsf{Ledger}^{\nu},
\mathsf{Status}
\right).
$$

The new rows are:

| Row | Bounded-speed meaning |
| --- | --- |
| $\mathsf{Support}^{\nu}$ | support descriptor, free-support or radial-sector status, support-band margins, and radial/support residual rows from [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md) |
| $\mathsf{Speed}$ | positive speed factors $\nu_i$ with declared band $0<\nu_-\le\nu_i\le\nu_+$, derivative bounds, and overspeed budget if self-hit intervals are present |
| $\mathsf{SpeedODE}^{\nu}$ | closed-period zero-mean tangential forcing, primitive excursion, clock/length speed, and speed-band feasibility rows from [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md) |
| $\mathsf{Clock}$ | equal physical period or declared winding relation using $H_i=\int_0^{L_i}d\lambda/\nu_i$ |
| $\mathsf{Center}^{\nu}$ | common center-time and event-time equations for $\chi_i$, $\Lambda_i$, velocity, acceleration, roots, and force projections from [bounded-speed-factor-center-time-dynamics.md](bounded-speed-factor-center-time-dynamics.md) |
| $\mathsf{Tail}^{\nu}$ | tail exclusion or assimilation for causal-time roots $G_{ij}(u,\eta)$ using [bounded-speed-factor-tail-krawczyk-certificate.md](bounded-speed-factor-tail-krawczyk-certificate.md) plus finite-cover completeness from [bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md) |
| $\mathsf{Root}^{\nu}$ | root ledger using $J_{ij}^{\nu}=1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}$, with fixed-speed source ledgers admitted only through [bounded-speed-factor-all-pairs-ledger-handoff-contract.md](bounded-speed-factor-all-pairs-ledger-handoff-contract.md) |
| $\mathsf{Sheet}^{\nu}$ | sheet slopes, coefficient variations, and force derivatives from [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md) |
| $\mathsf{Sheet2}^{\nu}$ | second root variations, second Jacobian variations, force-weight Hessians, and sheet Lipschitz constants from [bounded-speed-factor-second-root-variation-lemma.md](bounded-speed-factor-second-root-variation-lemma.md) |
| $\mathsf{Dyn}^{\nu}$ | tangential speed evolution and normal curvature rows |
| $\mathsf{NormalRec}^{\nu}$ | tangent holonomy, position closure, tangent-frame monodromy, support-radial compatibility, and root-ledger persistence from [bounded-speed-factor-normal-reconstruction-theorem.md](bounded-speed-factor-normal-reconstruction-theorem.md) |
| $\mathsf{CoupledFP}^{\nu}$ | live-ledger coupled fixed point over curves, speed factors, roots, support variables, action scale, and event rows from [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md) |
| $\mathsf{Search}^{\nu}$ | executable branch-search chart, residual, margin vector, trichotomy, execution order, and solver report schema from [bounded-speed-factor-branch-search-certificate.md](bounded-speed-factor-branch-search-certificate.md) and [bounded-speed-factor-finite-mode-branch-system.md](bounded-speed-factor-finite-mode-branch-system.md) |
| $\mathsf{Gauge}^{\nu}$ | symmetry quotient, gauge slice, neutral-mode projection, and bordered finite-mode Jacobian from [bounded-speed-factor-symmetry-gauge-reduction.md](bounded-speed-factor-symmetry-gauge-reduction.md) |
| $\mathsf{Action}^{\nu}$ | action scale, work-form curl, kinetic speed term, support work row, and fit/action compatibility from [bounded-speed-factor-action-stability-closure.md](bounded-speed-factor-action-stability-closure.md) and [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md) |
| $\mathsf{VarNoeth}^{\nu}$ | period variation mode, speed-factor Euler-Lagrange row, speed-ODE equivalence, storage/exchange, support work, and Noether-current envelope from [bounded-speed-factor-variational-noether-closure.md](bounded-speed-factor-variational-noether-closure.md) |
| $\mathsf{Kraw}^{\nu}$ | Krawczyk range, cokernel, chart radius, and obstruction rows including speed coefficients |
| $\mathsf{Decision}^{\nu}$ | interval/Krawczyk acceptance, event reset, certified rejection, and proof-budget taxonomy from [bounded-speed-factor-branch-krawczyk-decision-theorem.md](bounded-speed-factor-branch-krawczyk-decision-theorem.md) |
| $\mathsf{Noether}^{\nu}$ | conservation currents including speed-factor work and event exchange from the same bounded-speed action |
| $\mathsf{HitExch}^{\nu}$ | self-hit window exchange residuals, endpoint exits, event ledgers, and source provenance from [bounded-speed-factor-self-hit-exchange-closure.md](bounded-speed-factor-self-hit-exchange-closure.md) when self-hit intervals are active |
| $\mathsf{Anti}^{\nu}$ | exact-antipodal speed parity row $\nu_{\iota i}=\nu_i$ and $\chi_{\iota i}=\chi_i$, or an explicit exit to antipodal relaxation with independent speed factors |
| $\mathsf{Stability}^{\nu}$ | monodromy of the augmented shape-speed-delay system after neutral reduction |

The fixed-speed master theorem is recovered by setting

$$
\nu_i\equiv1,
\qquad
D\nu_i=0,
\qquad
\mathsf{Speed}=\mathsf{SpeedODE}^{\nu}=\mathsf{Clock}=\mathsf{NormalRec}^{\nu}=\mathsf{CoupledFP}^{\nu}=\texttt{fixed-speed-special-case}.
$$

---

## 2. Master Residual Vector

Let the branch variables be

$$
x=(a,b,\gamma),
$$

where $a$ are geometric coefficients, $b$ are speed-factor coefficients, and $\gamma$ is the fitted or action-derived dynamics scale. On one frozen bounded-speed ledger define

$$
\mathcal{R}_{\nu}^{\mathrm{master}}
=
\left(
\mathcal{R}_{\mathrm{geom}},
\mathcal{R}_{\mathrm{support}}^{\nu},
\mathcal{R}_{\nu\mathrm{band}},
\mathcal{R}_{\mathrm{speedODE}}^{\nu},
\mathcal{R}_{H},
\mathcal{R}_{\mathrm{tail}}^{\nu},
\mathcal{R}_{\mathrm{tail\text{-}cover}}^{\nu},
\mathcal{R}_{\mathrm{root}}^{\nu},
\mathcal{R}_{\mathrm{sheet}}^{\nu},
\mathcal{R}_{\mathrm{sheet2}}^{\nu},
\mathcal{R}_{\parallel}^{\nu},
\mathcal{R}_{\perp}^{\nu},
\mathcal{R}_{N\mathrm{rec}}^{\nu},
\mathcal{R}_{\mathrm{cpl}}^{\nu},
\mathcal{R}_{\mathrm{search}}^{\nu},
\mathcal{R}_{\mathrm{gauge\text{-}rank}}^{\nu},
\mathcal{R}_{\gamma}^{\nu},
\mathcal{R}_{\mathrm{curl}}^{\nu},
\mathcal{R}_{\mathrm{VN}}^{\nu},
\mathcal{R}_{\mathrm{exch}}^{\nu},
\mathcal{R}_{\mathrm{exch,hit}}^{\nu},
\mathcal{R}_{\mathrm{kraw}}^{\nu},
\mathcal{R}_{\mathrm{decision}}^{\nu},
\mathcal{R}_{\mathrm{lim}}^{\nu},
\mathcal{R}_{\mathrm{Noeth}}^{\nu},
\mathcal{R}_{\mathrm{event}}^{\nu},
\mathcal{R}_{\mathrm{stab}}^{\nu},
\mathcal{R}_{\mathrm{force\text{-}moment}}^{\nu},
\mathcal{R}_{\mathrm{inv}}
\right).
$$

The support row is inherited from the declared sector. In the free-support branch it includes the tangent, curve-normal, support-radial, and support-band rows of [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md). In the radial same-level sector it reduces to the corresponding radial support-band certificate. A fixed-radius proof packet is therefore a special case, not a proof of the free-support row.

The speed-band residual is an inequality row:

$$
\mathcal{R}_{\nu\mathrm{band}}
=
\max_i
\max
\left\{
\sup_\lambda(\nu_- - \nu_i(\lambda))_+,
\sup_\lambda(\nu_i(\lambda)-\nu_+)_+
\right\}.
$$

The speed-ODE solvability row is the scalar tangential compatibility packet

$$
\mathcal{R}_{\mathrm{speedODE}}^{\nu}
=
\left(
\int_0^{H_*}T_i(u)\cdot F_{i,\mathrm{tot}}^\nu(u)\,du,\,
A_{i,\max}-A_{i,\min}-(\nu_+-\nu_-),\,
\nu_{i,0}-\frac{L_i-\int_0^{H_*}A_i(u)\,du}{H_*}
\right)_i,
$$

with the obvious winding replacement. This row is certified by [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md). It records that nonzero pointwise tangent force has been absorbed into a closed, positive, band-limited speed factor rather than ignored.

The physical-period row is

$$
\mathcal{R}_{H,i}
=
\int_0^{L_i}
\frac{d\lambda}{\nu_i(\lambda)}
-H_*,
$$

or the corresponding winding row

$$
m_i
\int_0^{L_i}
\frac{d\lambda}{\nu_i(\lambda)}
-H_{\mathrm{com}}.
$$

The tail-cover row $\mathcal{R}_{\mathrm{tail\text{-}cover}}^{\nu}$ is zero only when the local tail predicates are assembled into the owned finite cover of [bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md). In particular, every causal-time tail point must have exactly one owner, every owner must have one terminal predicate, closed-hull overlaps must agree on boundary or root-tube identity, and the terminal predicates must persist on the coefficient box. If local tail Krawczyk cells pass but the global cover row is missing, the master status is

$$
\texttt{bounded-speed-tail-cover-incomplete}.
$$

The second sheet row $\mathcal{R}_{\mathrm{sheet2}}^{\nu}$ requires the implicit second root variations $D^2\eta^\nu$, second Jacobian variations $D^2J^\nu$, and force-weight Hessians of [bounded-speed-factor-second-root-variation-lemma.md](bounded-speed-factor-second-root-variation-lemma.md). It is optional for a first Newton step but mandatory before Hessian, monodromy, action-stability, or Krawczyk $Z$ rows are certified. If it is missing, those downstream rows inherit

$$
\texttt{bounded-speed-krawczyk-second-envelope-open}.
$$

The bounded-speed dynamics rows are

$$
\mathcal{R}_{\parallel,i}^{\nu}
=
\nu_i\nu_i'
-
\Gamma_B^{\nu}\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^{\nu},
$$

and

$$
\mathcal{R}_{\perp,i}^{\nu}
=
\nu_i^2\mathbf{K}_i
-
\Gamma_B^{\nu}P_i^\perp\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^{\nu}.
$$

Here $\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^{\nu}=\widetilde{\mathbf{F}}_i^{\nu}$ in the inactive-support sector. If free-support multipliers are active, it also includes $\widetilde{\mathbf{F}}_{i,\mathrm{supp}}^\nu$ from [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md), or the packet must declare a variational-inequality support row. The speed-ODE, normal reconstruction, action, and Noether rows must all consume this same convention.

The old fixed-speed tangential residual $\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0$ is no longer a closure row. It is the special case $\nu_i'=0$.

The normal reconstruction residual $\mathcal{R}_{N\mathrm{rec}}^{\nu}$ packages the curve-level closure rows

$$
\left(
\mathcal{R}_{T\mathrm{hol}},
\mathcal{R}_{Y\mathrm{close}},
\mathcal{R}_{\mathrm{frame}},
\mathcal{R}_{\mathrm{support}}^{\nu},
\mathcal{R}_{r}^{\nu},
\mathcal{R}_{\mathrm{root\text{-}persist}}^{\nu}
\right)
$$

from [bounded-speed-factor-normal-reconstruction-theorem.md](bounded-speed-factor-normal-reconstruction-theorem.md). It prevents a small sampled normal residual from being mistaken for a closed arclength branch.

The coupled fixed-point row $\mathcal{R}_{\mathrm{cpl}}^{\nu}$ is the live-ledger version of the bounded-speed dynamics packet. It contains the speed ODE, normal reconstruction, support rows, active roots, root persistence, action/support work, event rows, derivative blocks, Schur corrections, and Krawczyk budget defined in [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md). A packet may report separate speed, normal, root, support, and action diagnostics, but it is not a bounded-speed dynamics/action candidate until those rows close inside the same coupled chart.

The search row $\mathcal{R}_{\mathrm{search}}^\nu$ is the executable decision wrapper from [bounded-speed-factor-branch-search-certificate.md](bounded-speed-factor-branch-search-certificate.md). It requires one fixed branch class, one coefficient box, one residual vector, one margin vector, and one declared outcome: retained candidate, event reset, certified rejection, or proof-budget/refinement status. Without this row, a small residual or descent step is a solver diagnostic rather than a branch decision.

The gauge-rank row $\mathcal{R}_{\mathrm{gauge\text{-}rank}}^\nu$ comes from [bounded-speed-factor-symmetry-gauge-reduction.md](bounded-speed-factor-symmetry-gauge-reduction.md). It verifies that translation, rotation, phase, period, live-root labeling, and branch-family neutral directions have been quotiented or bordered before Krawczyk and cokernel rows are interpreted. A rank claim made before this quotient is a coordinate claim, not a branch claim.

The force-moment row $\mathcal{R}_{\mathrm{force\text{-}moment}}^{\nu}$ emits the attraction/repulsion split from [attraction-repulsion-force-moment-decomposition.md](attraction-repulsion-force-moment-decomposition.md). It checks that the $3$-$2$ source-site inventory has been converted into weighted tangent-power, normal-curvature-drive, and support-radial-moment diagnostics on the same root ledger. This row can certify a bias diagnostic; it cannot replace $\mathcal{R}_{\mathrm{speedODE}}^\nu$, $\mathcal{R}_{N\mathrm{rec}}^\nu$, or $\mathcal{R}_{\mathrm{cpl}}^\nu$.

The variational Noether row $\mathcal{R}_{\mathrm{VN}}^{\nu}$ requires one declared variation convention: fixed-period projection or period-constrained variation with multipliers. It includes the speed-factor Euler-Lagrange row, the calibrated identity $\Pi_H^{\nu,*}R_{\nu}^{\mathrm{EL}}=\mathcal{M}_{\nu}R_T^\nu$, the storage/exchange residual $\mathcal{R}_{\mathrm{exch}}^\nu$, support work, and the Noether-current conservation envelope from [bounded-speed-factor-variational-noether-closure.md](bounded-speed-factor-variational-noether-closure.md). If it is missing, a speed ODE is only dynamics bookkeeping, not an action or conservation proof.

If a self-hit interval is active, $\mathcal{R}_{\mathrm{exch,hit}}^{\nu}$ is the finite-window exchange residual from [bounded-speed-factor-self-hit-exchange-closure.md](bounded-speed-factor-self-hit-exchange-closure.md). It tracks speed energy, self-hit potential, partner/cross work, support work, constraint work, Noether-Sea/event work, endpoint speed exits, momentum, angular momentum, charge, and source provenance. Finite self-hit return without this exchange row remains `self-hit-exchange-residual-open`.

---

## 3. Action And Work Rows

The bounded-speed kinetic term is

$$
K_i^{\nu}
=
\frac12m_{\mathrm{car}}c_f^2\nu_i^2.
$$

The action row must specify whether $m_{\mathrm{car}}$ is held fixed or is a ledger-derived response. If $m_{\mathrm{car}}$ is held fixed, the dimensionful kinetic action over one causal-time period is

$$
S_{\mathrm{car}}^{\nu}
=
\frac{R_*}{c_f}
\sum_i
\int_0^{H_*}
\frac12m_{\mathrm{car}}c_f^2\nu_i(u)^2\,du.
$$

Equivalently, in arclength measure,

$$
S_{\mathrm{car}}^{\nu}
=
\frac{m_{\mathrm{car}}c_fR_*}{2}
\sum_i
\int_0^{L_i}
\nu_i(\lambda)\,d\lambda.
$$

This identity follows from $du=d\lambda/\nu_i(\lambda)$. If an action packet uses the fixed-speed kinetic term after $\nu_i$ varies, its status is

$$
\texttt{bounded-speed-action-kinetic-stale}.
$$

The virtual-work one-form is now defined on the augmented coefficient space $(a,b)$:

$$
W_p^{\nu,+}
=
\sum_i
\int_0^{H_*}
\widetilde{\mathbf{F}}_i^{\nu,+}(u)
\cdot
D_p\mathbf{Y}_i(\Lambda_i(u))
\,du,
$$

where $D_p\mathbf{Y}_i(\Lambda_i(u))$ includes the clock correction from $D_p\Lambda_i(u)$. The curl row is

$$
\mathcal{R}_{\mathrm{curl}}^{\nu}
=
\frac{
\left\|
D_pW_q^{\nu,+}-D_qW_p^{\nu,+}
\right\|_{\mathrm{F}}
}{
1+\|W^{\nu,+}\|_{\mathrm{F}}
}.
$$

Every derivative in this row must use the bounded-speed root-sheet formulas. A curl row computed with fixed-speed roots exits with

$$
\texttt{bounded-speed-curl-ledger-stale}.
$$

---

## 4. Krawczyk And Obstruction Rows

The weighted residual is

$$
F_{\nu}(x)
=
W_{\nu}^{1/2}
\mathcal{F}_{\nu}(x),
\qquad
x=(a,b,\gamma),
$$

with

$$
\mathcal{F}_{\nu}
=
\begin{bmatrix}
\mathcal{R}_{H}\\
\mathcal{R}_{\mathrm{support}}^{\nu}\\
\mathcal{R}_{\nu\mathrm{band}}\\
\mathcal{R}_{\mathrm{speedODE}}^{\nu}\\
\mathcal{R}_{\parallel}^{\nu}\\
\mathcal{R}_{\perp}^{\nu}\\
\mathcal{R}_{N\mathrm{rec}}^{\nu}\\
\mathcal{R}_{\mathrm{cpl}}^{\nu}\\
\mathcal{R}_{\gamma}^{\nu}
\end{bmatrix}
$$

by default. Certified variants may append $\mathcal{R}_{\mathrm{curl}}^{\nu}$ and action-isotropy rows only if their derivatives are enclosed on the same bounded-speed ledger.

The chart radius must include both geometry and speed-factor margins:

$$
\rho_{\mathrm{chart}}^{\nu}
=
\min
\left\{
\rho_{\mathrm{geom}},
\rho_{\nu\mathrm{band}},
\rho_H,
\rho_{\chi},
\rho_{\mathrm{root}}^{\nu},
\rho_J^{\nu},
\rho_{\mathrm{tail}}^{\nu},
\rho_{\mathrm{sheet}}^{\nu},
\rho_d,
\rho_{\Gamma}^{\nu},
\rho_{\mathrm{curl}}^{\nu},
\rho_{\mathrm{disc}}
\right\}.
$$

The derivative envelope is

$$
\left\|
DF_{\nu,R}(x_0+h)-DF_{\nu,R}(x_0)
\right\|
\le
L_R^{\nu}\|h\|,
$$

where

$$
L_R^{\nu}
=
L_R^{\mathrm{geom}}
+
L_R^{\mathrm{speed}}
+
L_R^{\mathrm{root},\nu}
+
L_R^{\mathrm{sheet},\nu}
+
L_R^{\mathrm{action},\nu}.
$$

The range Krawczyk inequalities keep their form:

$$
Z_{\nu}<1,
\qquad
Y_{\nu}+Z_{\nu}\rho<\rho,
\qquad
\rho\le\rho_{\mathrm{chart}}^{\nu}.
$$

The obstruction inequality also keeps its form after replacing every fixed-speed error term by a bounded-speed one:

$$
\|c_0^{\nu}\|
-
\frac12L_{\mathrm{cok}}^{\nu}\rho^2
-
\epsilon_{\mathrm{disc}}^{\nu}
-
\epsilon_{\mathrm{root}}^{\nu}
-
\epsilon_{\Gamma}^{\nu}
>
\tau_{\mathrm{dyn}}^{\nu}.
$$

If the old fixed-speed matrix is reused without the $b$ columns, the result is not a bounded-speed obstruction. The status is

$$
\texttt{bounded-speed-column-span-open}.
$$

The decision row $\mathcal{R}_{\mathrm{decision}}^\nu$ records which interval theorem actually fired. A successful range Krawczyk inclusion produces `bounded-speed-retained-branch-candidate` only after all margin rows are positive. A disjoint Krawczyk image, interval residual exclusion, or cokernel lower bound produces a certified rejection only on the same gauge-reduced chart. A first event produces `bounded-speed-event-reset`. Any missing tail cover, omitted derivative column, unclosed self-hit exchange, or incomplete variational Noether row produces a proof-budget status rather than rejection.

---

## 5. Stability And Event Rows

The bounded-speed variational state includes both shape and speed perturbations:

$$
\delta X^{\nu}
=
\left(
\delta\mathbf{Y},
\delta\mathbf{T},
\delta\nu,
\delta\eta,
\delta\Gamma,
\delta\mathcal{E}
\right).
$$

For $\rho_i=\delta\nu_i$, the first variations of the two dynamics rows are

$$
\delta R_{N,i}^{\nu}
=
\nu_i^2\delta\mathbf{K}_i
+
2\nu_i\rho_i\mathbf{K}_i
-
\delta\Gamma_B^{\nu}P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}
-
\Gamma_B^{\nu}\delta\!\left(P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}\right),
$$

and

$$
\delta R_{T,i}^{\nu}
=
\rho_i\nu_i'
+
\nu_i\rho_i'
-
\delta\Gamma_B^{\nu}\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
-
\Gamma_B^{\nu}
\left(
\delta\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}
+
\mathbf{T}_i\cdot\delta\widetilde{\mathbf{F}}_i^{\nu}
\right).
$$

Here $\delta\widetilde{\mathbf{F}}_i^{\nu}$ includes the clock, root, Jacobian, and source-speed variations from [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md). These two equations are the minimal augmented rows required by the Hessian, Floquet, Krawczyk-cokernel, and stability-handoff packets.

The monodromy operator must linearize the coupled system

$$
\nu_i\nu_i'
=
\Gamma_B^{\nu}\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu},
\qquad
\nu_i^2\mathbf{K}_i
=
\Gamma_B^{\nu}P_i^\perp\widetilde{\mathbf{F}}_i^{\nu}.
$$

A stability packet that freezes $\nu_i$ while using bounded-speed roots is a mixed-ledger calculation and exits with

$$
\texttt{bounded-speed-stability-ledger-mismatch}.
$$

If a self-hit interval is present, the event row must additionally emit:

$$
\operatorname{dur}_u(\mathcal{H}_i)\le\tau_{\mathrm{hit}}^u,
\qquad
\int_{\mathcal{H}_i}(\nu_i-1)_+\,d\lambda\le B_{\mathrm{hit}},
$$

where $\operatorname{dur}_u(\mathcal{H}_i)=|\chi_i(\mathcal{H}_i)|$ and $\operatorname{dur}_t=(R_*/c_f)\operatorname{dur}_u$ if a physical-time bound is reported. The row must also emit the positive $J_{\mathrm{self}}^{\nu}$ floor, the self-hit return certificate from [bounded-speed-factor-self-hit-return-lemma.md](bounded-speed-factor-self-hit-return-lemma.md), and the action/event exchange associated with entering and leaving the interval. Without these rows, the master status is

$$
\texttt{bounded-speed-self-hit-unledgered}.
$$

---

## 6. Theorem Target

**Theorem target: bounded speed factor master retention.** Fix one same-level tri-binary branch class, one source-pair policy, one same-source policy, one bounded-speed chart, one endpoint convention, one support-complete memory convention, one action/event convention, and one row-weight convention. Suppose:

1. the support descriptor, speed band, speed-ODE solvability row, and equal physical-period or winding rows hold;
2. the causal-time root ledger has positive delay, Jacobian, gap, support, and noncollision margins;
3. the support tail is either excluded or assimilated as differentiable bounded-speed root sheets on a complete owned finite cover;
4. the bounded-speed dynamics/action residual passes the gauge-reduced branch-search decision row, including the normal reconstruction rows, the coupled fixed-point row $\mathcal{R}_{\mathrm{cpl}}^\nu$, the search row $\mathcal{R}_{\mathrm{search}}^\nu$, and the interval/Krawczyk decision row $\mathcal{R}_{\mathrm{decision}}^\nu$;
5. the action row derives or identifies $\Gamma_B^{\nu}$ on the same ledger;
6. the variational Noether row closes the speed-factor Euler-Lagrange/speed-ODE equivalence, storage/exchange, support-work, and Noether-current envelope;
7. the Noether/event rows include speed-factor work, support work when support constraints are active, self-hit event exchange if present, and source provenance;
8. if the exact-antipodal chart is used, the branch emits $\nu_{\iota i}=\nu_i$, $\chi_{\iota i}=\chi_i$, and root-ledger closure under the antipodal involution; otherwise it declares an antipodal-relaxation branch;
9. the stability row classifies the augmented shape-speed-delay monodromy after neutral reduction;
10. the inventory ledger matches the same root/action/event ledger, including the $3$-$2$ attraction/repulsion source-site row from [attraction-repulsion-inventory-theorem.md](attraction-repulsion-inventory-theorem.md) and the weighted force-moment diagnostics from [attraction-repulsion-force-moment-decomposition.md](attraction-repulsion-force-moment-decomposition.md) when the branch is a neutral six-site same-level row;
11. the normalized master error satisfies $\mathfrak{E}_{\nu}(B)\le1$.

Then $B$ is a retained bounded-speed shell swarm branch candidate on the declared live ledger. That status remains priority-side until the emitted certificate rows and any downstream observer-export statuses needed by a reader-facing claim are recorded.

Proof route:

1. the positive speed band makes each $\chi_i$ invertible and gives causal-time roots;
2. root/Jacobian floors make the bounded-speed root sheets differentiable;
3. the first and second sheet derivative formulas propagate speed-factor variations into force, action, Hessian, monodromy, and Krawczyk rows;
4. the tangential dynamics row converts formerly forbidden work into speed-factor evolution;
5. the normal reconstruction row converts normal force balance into closed arclength curves rather than sampled residuals;
6. the coupled fixed-point row prevents frozen-root, stale-action, stale-support, or stale-event subsolves from being promoted as bounded-speed certificates;
7. the branch-search and gauge rows decide whether the computed object is a retained candidate, event reset, certified rejection, or proof-budget/refinement status on a quotient chart;
8. the variational Noether row decides whether the speed ODE is an Euler-Lagrange consequence with conserved currents rather than a fitted exchange row;
9. self-hit exchange closure turns short self-hit intervals into ledgered events rather than hidden energy or provenance leaks;
10. action and event rows decide whether the speed and support exchange are physical rather than fitted;
11. the augmented monodromy classifies stability on the same ledger;
12. the master inequality bundles the certified residual and error budgets.

---

## 7. Current Reading

The existing exact-antipodal $M=3$ packets remain fixed-speed evidence:

$$
\nu_i\equiv1.
$$

They are valuable as a limiting branch and as initial data for bounded-speed continuation. They do not certify the bounded-speed model until the root, tail, derivative, action, Krawczyk, Noether, event, and stability rows above are recomputed.

Current bounded-speed statuses:

$$
\texttt{finite-mode-branch-schema-open},
\qquad
\texttt{bounded-speed-ledger-handoff-contract-staged},
\qquad
\texttt{bounded-speed-symmetry-gauge-reduction-open},
\qquad
\texttt{bounded-speed-branch-search-certificate-open},
\qquad
\texttt{bounded-speed-branch-schema-open},
\qquad
\texttt{bounded-speed-root-sheet-open},
\qquad
\texttt{bounded-speed-tail-cover-incomplete},
\qquad
\texttt{bounded-speed-coupled-fixed-point-open},
\qquad
\texttt{force-moment-decomposition-open},
\qquad
\texttt{bounded-speed-factor-variational-noether-open},
\qquad
\texttt{self-hit-exchange-residual-open},
\qquad
\texttt{bounded-speed-action-row-open},
\qquad
\texttt{bounded-speed-krawczyk-envelope-open},
\qquad
\texttt{bounded-speed-stability-ledger-open},
\qquad
\texttt{not-retained}.
$$
