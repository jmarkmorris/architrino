# Bounded Speed Factor Executable Solver Protocol

Promotion status: `priority-only`. This packet turns the bounded speed factor equations into an executable finite-mode solve target. It specializes [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md), [bounded-speed-factor-center-time-dynamics.md](bounded-speed-factor-center-time-dynamics.md), [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), [bounded-speed-factor-speed-ode-zero-mean-correction-target.md](bounded-speed-factor-speed-ode-zero-mean-correction-target.md), [bounded-speed-factor-proof-stack-impact-map.md](bounded-speed-factor-proof-stack-impact-map.md), [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md), [bounded-speed-factor-all-pairs-ledger-handoff-contract.md](bounded-speed-factor-all-pairs-ledger-handoff-contract.md), [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md), [bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md), [bounded-speed-factor-variational-noether-closure.md](bounded-speed-factor-variational-noether-closure.md), [bounded-speed-factor-self-hit-exchange-closure.md](bounded-speed-factor-self-hit-exchange-closure.md), [attraction-repulsion-force-moment-decomposition.md](attraction-repulsion-force-moment-decomposition.md), [bounded-speed-factor-branch-search-certificate.md](bounded-speed-factor-branch-search-certificate.md), and [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md).

It does not retain a branch. It defines the minimal numerical object that can test whether the old fixed-speed exact-antipodal $M=3$ row opens into a nearby bounded speed factor dynamics/action candidate. The fixed-speed all-pairs root-ledger certificate is now a staged intake object through [bounded-speed-factor-all-pairs-ledger-handoff-contract.md](bounded-speed-factor-all-pairs-ledger-handoff-contract.md), not an executable bounded-speed schema by itself. The branch-search decision layer is now stated in [bounded-speed-factor-branch-search-certificate.md](bounded-speed-factor-branch-search-certificate.md), with finite-mode details, gauge reduction, and interval decisions assigned to [bounded-speed-factor-finite-mode-branch-system.md](bounded-speed-factor-finite-mode-branch-system.md), [bounded-speed-factor-symmetry-gauge-reduction.md](bounded-speed-factor-symmetry-gauge-reduction.md), and [bounded-speed-factor-branch-krawczyk-decision-theorem.md](bounded-speed-factor-branch-krawczyk-decision-theorem.md).

---

## 1. Unknowns

Keep the geometric curves arclength-parametrized:

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda_i)\|=1.
$$

Use a finite coefficient vector

$$
x=(a,b,\gamma),
$$

where $a$ are geometric Fourier or arclength-inverse coefficients, $b$ are speed-factor coefficients, and $\gamma$ is the numerical scale variable. A convenient speed basis is

$$
\nu_i(\lambda)
=
1+p_{i,0}+
\sum_{m=1}^{M_\nu}
\left(
p_{i,m}\cos\frac{2\pi m\lambda}{L_i}
+
q_{i,m}\sin\frac{2\pi m\lambda}{L_i}
\right),
$$

with coefficient vector

$$
b=\{p_{i,0},p_{i,m},q_{i,m}\}_{i,m\ge1}.
$$

The speed band is not optional:

$$
0<\nu_-\le\nu_i(\lambda)\le\nu_+.
$$

The fixed-speed subspace is

$$
b=0,
\qquad
\nu_i\equiv1.
$$

Every solver report must declare whether it is solving on the full bounded-speed space or on this fixed-speed subspace.

For a live-ledger certificate, this minimal vector must be expanded or internally Schur-complemented to the coupled variables of [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md):

$$
z=(a,b,r,\gamma,s,e),
$$

where $r$ are active root variables or certified root sheets, $s$ are support variables, and $e$ are event/reset variables. A solve that updates $(a,b,\gamma)$ while freezing $r$, $s$, or $e$ is diagnostic only.

---

## 2. Clock Rows

Define

$$
\chi_i(\lambda)
=
\int_0^\lambda
\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i(u)=\chi_i^{-1}(u).
$$

The equal physical-period row is

$$
H_i
=
\chi_i(L_i),
\qquad
\mathcal{R}_{H,i}=H_i-H_*.
$$

If a winding relation is declared, replace this by

$$
\mathcal{R}_{H,i}^{\mathrm{wind}}
=
m_iH_i-H_{\mathrm{com}}.
$$

The speed-band residual is the inequality row

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

The speed-ODE solvability row must also emit the tangent-force primitive

$$
A_i(u)=\Gamma\int_0^uT_i(s)\cdot F_i^\nu(s)\,ds,
$$

the zero-mean row $\int_0^{H_*}T_i\cdot F_i^\nu\,du=0$, the initial-speed interval $[\nu_- - A_{i,\min},\nu_+ - A_{i,\max}]$, and the clock/length value $\nu_{i,0}=(L_i-\int A_i\,du)/H_*$. These are the executable fields required by [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md).

After a frozen source ledger reports a nonzero mean, the solver must also emit a `zero_mean_correction_target` row from [bounded-speed-factor-speed-ode-zero-mean-correction-target.md](bounded-speed-factor-speed-ode-zero-mean-correction-target.md): the source integral vector, source vector normalization, source diagnostic schema, the `source_mean_split_certificate` provenance from the frozen diagnostic when available, the live variables allowed to move, the range-condition target $-\mathbf{m}_{\mathrm{frz}}\in\operatorname{Range}B$, and either the nonlinear target

$$
\mathcal{M}_i^\nu(z)
=
\int_0^{H_*}T_i(u;z)\cdot F_i^\nu(u;z)\,du
=0
$$

or the first-order correction target

$$
D_z\mathcal{M}_i^\nu(z_0)\delta z
=
-\mathcal{M}_i^\nu(z_0).
$$

This row is diagnostic until it consumes the same live roots, Jacobians, force checksum, support convention, action/event convention, and Schur-complemented derivative columns as the bounded-speed ledger handoff.

If this row includes a candidate range/cokernel checker, the candidate matrix must be named separately as $B_{\mathrm{cand}}$ or `candidate_B`. It must be reported with `certifies_live_derivative_matrix=false` unless it is exactly the same-ledger live derivative matrix required by the bounded-speed ledger handoff.

If `live_derivative_matrix_certificate` reports `certified-live-rhs-in-range`, `zero_mean_correction_target` may emit `linear_system_intake.alpha_B`, residual $r_B$, $\delta z_B$, solution-set policy, and same-ledger identifiers. It must still keep `not_retained` until the correction-direction margin row and downstream branch rows close.

After a same-ledger `speed_ode_clock_length_certificate` passes, `zero_mean_correction_target` may also emit a `normal_reconstruction_handoff` row. This row carries $\widehat{\nu}_i(u)=\nu_{i,0}+A_i(u;z_0+\delta z_B)$, the inverse-clock pullback into $\nu_i(\lambda_i)$, and supplied normal residual, tangent holonomy, position closure, unit-tangent, and support-margin receiver rows. It must report `normal-reconstruction-handoff-staged`, keep `certifies_normal_reconstruction=false`, keep `certifies_bounded_speed_live_ledger=false`, and leave the next failed row at `normal-reconstruction-open`.

If the normal packet closes the same-ledger normal rows, `zero_mean_correction_target` may emit `bounded_speed_normal_reconstruction_candidate`. This packet must consume the handoff, check the normal equation, tangent holonomy, position closure, unit-tangent, support-margin, noncollision, root-persistence, and normal Krawczyk rows, and report `bounded-speed-normal-reconstruction-candidate`. It must still keep `certifies_bounded_speed_live_ledger=false`, `retention=not_retained`, and `retained_branch=false`.

The derivative rows consumed by Newton and Krawczyk are

$$
D_b\chi_i(\lambda)
=
-\int_0^\lambda
\frac{D_b\nu_i(\xi)}{\nu_i(\xi)^2}
d\xi,
$$

and

$$
D_b\Lambda_i(u)
=
-\nu_i(\Lambda_i(u))D_b\chi_i(\Lambda_i(u)).
$$

If these derivatives are not emitted, the solver status is

$$
\texttt{bounded-speed-time-map-derivatives-open}.
$$

---

## 3. Root Solve

Use common causal-time nodes

$$
u_n=\frac{nH_*}{K},
\qquad
n=0,\ldots,K-1.
$$

At receiver node $u_n$, define

$$
\lambda_i^n=\Lambda_i(u_n),
\qquad
\lambda_j^-(u_n,\eta)=\Lambda_j(u_n-\eta).
$$

The bounded speed factor root function is

$$
G_{ij,n}^{\nu}(\eta;x)
=
\left\|
\mathbf{Y}_i(\lambda_i^n;a)
-
\mathbf{Y}_j(\lambda_j^-(u_n,\eta);a)
\right\|
-\eta.
$$

The root Jacobian is

$$
J_{ij,n}^{\nu}
=
1-\nu_j(\lambda_j^-;b)\mathbf{T}_j(\lambda_j^-;a)\cdot\widehat{\mathbf{R}}_{ij,n}^{\nu}.
$$

The retained ledger must include isolating brackets, excluded gaps, positive delay floors, fixed source-normal and receiver-normal signs, noncollision floors, and the same source-pair policy used by the force row.

For a root sheet $\eta_r(u)$, the causal-time slope is

$$
\frac{d\eta_r}{du}
=
\frac{
\widehat{\mathbf{R}}_r\cdot
\left(
\nu_i\mathbf{T}_i-\nu_j^-\mathbf{T}_j^-
\right)
}{
J_r^{\nu}
}.
$$

If the implementation samples receiver arclength instead, use

$$
\frac{d\eta_r}{d\lambda_i}
=
\frac{
\widehat{\mathbf{R}}_r\cdot
\left(
\mathbf{T}_i-\frac{\nu_j^-}{\nu_i}\mathbf{T}_j^-
\right)
}{
J_r^{\nu}
}.
$$

---

## 4. Residual Vector

On the bounded-speed ledger, compute the delayed force

$$
\widetilde{\mathbf{F}}_i^{\nu}(u_n)
=
\sum_{r\in\mathcal{A}_{i,n}^{\nu}}
\sigma_i\sigma_j
\frac{W_{r,\nu}^{\mathrm{rec}}}{\eta_r^2}
\widehat{\mathbf{R}}_r^{\nu}
+
\widetilde{\mathbf{F}}_{i,\mathrm{self}}^{\nu}
+
\widetilde{\mathbf{F}}_{i,\mathrm{med}}^{\nu}.
$$

If free-support multipliers are active, the solver must also compute

$$
\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu
=
\widetilde{\mathbf{F}}_i^\nu
+
\widetilde{\mathbf{F}}_{i,\mathrm{supp}}^\nu,
$$

or declare a variational-inequality support row. The tangent, normal, speed-ODE, and support-radial residuals must all consume the same force convention.

The executable residual is

$$
\mathcal{F}_{\nu}(x)
=
\begin{bmatrix}
\mathcal{R}_{\mathrm{gauge}}\\
\mathcal{R}_{H}\\
\mathcal{R}_{\mathrm{support}}^{\nu}\\
\mathcal{R}_{\nu\mathrm{band}}\\
\mathcal{R}_{\mathrm{speedODE}}^{\nu}\\
\mathcal{R}_{\parallel}^{\nu}\\
\mathcal{R}_{\perp}^{\nu}\\
\mathcal{R}_{N\mathrm{rec}}^\nu\\
\mathcal{R}_{\gamma}^{\nu}
\end{bmatrix},
$$

where

$$
\mathcal{R}_{\parallel,i}^{\nu}
=
\nu_i\nu_i'
-
\gamma\,\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^{\nu},
$$

and

$$
\mathcal{R}_{\perp,i}^{\nu}
=
\nu_i^2\mathbf{K}_i
-
\gamma\,P_i^\perp\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^{\nu}.
$$

The scale row is

$$
\mathcal{R}_{\gamma}^{\nu}
=
\gamma-\Gamma_B^{\nu},
$$

when an action-derived scale is available. If the solve is diagnostic only, it may use $\gamma$ as a fit variable, but the packet must emit

$$
\texttt{gamma-fitted-not-derived}.
$$

The fixed-speed solver is recovered by setting $\nu_i\equiv1$. Then $\mathcal{R}_{\parallel}^{\nu}=0$ becomes the old tangential closure row and $\mathcal{R}_{\perp}^{\nu}=0$ becomes the old curvature row.

The live-ledger certificate uses $\mathcal{F}_{\nu}$ as the dynamics projection of the coupled residual $\mathcal{R}_{\mathrm{cpl}}^\nu$. If active roots, root derivatives, support variables, action scale, or event rows are solved in an outer loop without the derivative columns and Schur corrections, the first status is

$$
\texttt{coupled-fixed-point-stale}.
$$

---

## 5. Newton And Krawczyk Rows

The weighted residual is

$$
F_{\nu}(x)=W_{\nu}^{1/2}\mathcal{F}_{\nu}(x).
$$

Every derivative column must include:

1. geometric derivatives of $\mathbf{Y}_i$, $\mathbf{T}_i$, and $\mathbf{K}_i$;
2. speed derivatives of $\nu_i$, $\nu_i'$, $\chi_i$, and $\Lambda_i$;
3. root derivatives $D\eta_r$, $DJ_r^{\nu}$, and $D\widehat{\mathbf{R}}_r^{\nu}$;
4. force derivatives through $W_{r,\nu}^{\mathrm{rec}}$ and $\eta_r^{-2}$;
5. scale/action derivatives if $\Gamma_B^{\nu}$ is active.

The chart radius is

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

The range Krawczyk row passes only if

$$
Z_\nu<1,
\qquad
Y_\nu+Z_\nu\rho<\rho,
\qquad
\rho\le\rho_{\mathrm{chart}}^{\nu}.
$$

If the derivative matrix omits the speed columns $b$, the result is a fixed-speed proof budget, not a bounded-speed certificate:

$$
\texttt{bounded-speed-column-span-open}.
$$

---

## 6. Continuation And First Events

Use a pseudo-arclength continuation parameter $s$ on the augmented coefficient space:

$$
x(s)=(a(s),b(s),\gamma(s)).
$$

The first-event surfaces include the old geometric/root events and the new speed events:

| Event surface | Equation or inequality |
| --- | --- |
| lower speed band | $\min_{i,\lambda}\nu_i(\lambda)=\nu_-$ |
| upper speed band | $\max_{i,\lambda}\nu_i(\lambda)=\nu_+$ |
| physical-period event | $\max_i|\mathcal{R}_{H,i}|=\tau_H$ |
| root fold | $G_{ij}^{\nu}=0$ and $J_{ij}^{\nu}=0$ |
| same-source self-hit onset | $\mathcal{A}_i=\mathcal{D}_i$ with positive $J_{\mathrm{self}}^{\nu}$ floor |
| overspeed budget exhaustion | $\int_{\mathcal{H}_i}(\nu_i-1)_+\,d\lambda=B_{\mathrm{hit}}$ |
| self-hit return failure | nontrapping or dwell-time row from [bounded-speed-factor-self-hit-return-lemma.md](bounded-speed-factor-self-hit-return-lemma.md) fails |
| tail event | tail exclusion fails or a new bounded-speed root sheet must be assimilated |
| action event | speed-factor storage or exchange row is missing or changes sign convention |

The normal form for a simple speed-band event is a scalar crossing

$$
e_{\nu}(s)=\nu_i(\lambda_*;s)-\nu_{\pm},
\qquad
\frac{de_{\nu}}{ds}\ne0.
$$

The normal form for a simple bounded-speed root fold is

$$
G_{ij}^{\nu}=0,
\qquad
J_{ij}^{\nu}=0,
\qquad
\partial_{\eta\eta}G_{ij}^{\nu}\ne0.
$$

At either event the correct outcome is a ledger reset, not a retained-branch claim.

---

## 7. Output Schema

A bounded speed factor executable solve must emit:

| Field | Payload |
| --- | --- |
| `solver_space` | `bounded-speed-factor` or `fixed-speed-special-case` |
| `all_pairs_ledger_handoff` | fixed-speed source-ledger reference, bounded-speed clock lift, root-label handoff, derivative columns, force checksum, and consumer checksum from [bounded-speed-factor-all-pairs-ledger-handoff-contract.md](bounded-speed-factor-all-pairs-ledger-handoff-contract.md) |
| `geometry_coefficients` | curve coefficients $a$, arclength floors, support descriptor, gauge rows |
| `finite_mode_branch_system` | full finite-mode vector $z_M$, truncation $M$, residual $\mathcal{B}_M^\nu$, dimension table, neutral-mode quotient, and full-stack embedding from [bounded-speed-factor-finite-mode-branch-system.md](bounded-speed-factor-finite-mode-branch-system.md) |
| `gauge_reduction` | declared symmetry group, gauge slice, generator matrix, neutral projection, bordered Jacobian rank, block leakage, and first failed gauge status from [bounded-speed-factor-symmetry-gauge-reduction.md](bounded-speed-factor-symmetry-gauge-reduction.md) |
| `support_descriptor` | support sector, support functional or band, support margins, and fixed-radius-special-case status |
| `support_rows_nu` | support-radial and support-band residuals from [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md), including total-force or variational-inequality convention |
| `speed_coefficients` | speed coefficients $b$, $\nu_-$, $\nu_+$, $\nu_i'$, band margins |
| `speed_ode_solvability` | tangent forcing $T_i\cdot F_i^\nu$, zero-mean row, primitive excursion $A_i$, initial-speed interval, clock/length speed, and feasibility status |
| `zero_mean_correction_target` | source diagnostic schema, source integral vector, source vector normalization, source mean-split certificate, active live variables, $\mathcal{M}_i^\nu(z)=0$ or $D_z\mathcal{M}_i^\nu(z_0)\delta z=-\mathcal{M}_i^\nu(z_0)$, range-condition target $-\mathbf{m}_{\mathrm{frz}}\in\operatorname{Range}B$, optional `candidate_range_cokernel_check` with candidate matrix provenance, dimensions, column labels, $\delta_{\mathrm{cand}}$, cokernel projection, tolerance, status, and explicit `not_certified_live_derivative_matrix`, optional `live_derivative_column_intake` with per-column parameter provenance, baseline/plus/minus artifact identifiers, same-ledger guards, matrix preview, and explicit `certifies_live_derivative_matrix=false`, optional `live_derivative_column_preview_range_probe` with provenance `live_derivative_column_intake.column_matrix_preview`, preview residual, optional `least_squares_preview` with $\alpha_{\mathrm{preview}}$, preview residual, and explicit `certifies_correction_direction=false`, optional `preview_cokernel_witness` with normalized $q_{\mathrm{preview}}$, $B_{\mathrm{preview}}^Tq_{\mathrm{preview}}=0$, $q_{\mathrm{preview}}^T(-\mathbf{m}_{\mathrm{frz}})$, and explicit `certifies_live_derivative_matrix=false` and `certifies_correction_direction=false`, optional `live_derivative_matrix_certificate` with same ledger id, certified $B$, rank, range projection/residual, live cokernel projection $q_B$, `certified-live-rhs-in-range` or `certified-live-rhs-out-of-range`, and explicit `certifies_correction_direction=false` and `not_retained`, optional `live_correction_direction_certificate` with $\alpha_B$, $r_B=B\alpha_B+\mathbf{m}_0$, $\delta z_B$, margin guards, same-ledger identifiers, `correction-direction-found`, and explicit `certifies_bounded_speed_live_ledger=false` and `not_retained`, optional `speed_ode_primitive_feasibility_certificate` with $A_i(u;z_0+\delta z_B)$ return residuals, corrected-speed intervals, speed-band margins, `speed-primitive-feasibility-certified`, first failed row `clock-length-return-open`, and explicit `certifies_bounded_speed_live_ledger=false` and `not_retained`, optional `speed_ode_clock_length_certificate` with $\int_0^{H_*}\nu_i(u)\,du-L_i$ or winding residuals, `speed-clock-length-return-certified`, first failed row `normal-reconstruction-open`, and explicit `certifies_bounded_speed_live_ledger=false` and `not_retained`, optional `normal_reconstruction_handoff` with corrected speed pullback, receiver normal residual, tangent holonomy, position closure, unit-tangent, and support-margin rows, `normal-reconstruction-handoff-staged`, explicit `certifies_normal_reconstruction=false`, explicit `certifies_bounded_speed_live_ledger=false`, and `not_retained`, optional `bounded_speed_normal_reconstruction_candidate` with same-ledger normal equation, tangent holonomy, position closure, unit-tangent, support-margin, noncollision, root-persistence, and normal Krawczyk rows, `bounded-speed-normal-reconstruction-candidate`, explicit `certifies_bounded_speed_live_ledger=false`, and `not_retained`, derivative-column audit, rank or range status, and first failed correction status |
| `normal_reconstruction` | normal equation, tangent holonomy, position closure, support-radial compatibility, and Krawczyk status from [bounded-speed-factor-normal-reconstruction-theorem.md](bounded-speed-factor-normal-reconstruction-theorem.md) |
| `coupled_fixed_point` | $\mathcal{R}_{\mathrm{cpl}}^\nu$, variable blocks $(a,b,r,\gamma,s,e)$, Schur eliminations, omitted-column audit, coupled Krawczyk status, and fixed-speed-special-case status |
| `force_moment_decomposition` | attraction/repulsion force split, tangent-power split, normal-drive split, support-radial moment split, and count-to-bias status from [attraction-repulsion-force-moment-decomposition.md](attraction-repulsion-force-moment-decomposition.md) |
| `clock_rows` | $\chi_i$, $\Lambda_i$, $H_i$, winding/equal-period status, and derivative envelopes |
| `root_ledger_nu` | $G^\nu$, $J^\nu$, brackets, excluded gaps, sign labels, and positive floors |
| `tail_status_nu` | bounded-speed tail exclusion, assimilation, or unresolved-tail status |
| `tail_cover_nu` | finite ownership map, terminal predicates, overlap consistency, no-gap residual, coefficient-box persistence, and $\rho_{\mathrm{cover}}^\nu$ from [bounded-speed-factor-tail-cover-completeness-lemma.md](bounded-speed-factor-tail-cover-completeness-lemma.md) |
| `residual_vector_nu` | $\mathcal{R}_{H}$, $\mathcal{R}_{\mathrm{support}}^{\nu}$, $\mathcal{R}_{\nu\mathrm{band}}$, $\mathcal{R}_{\mathrm{speedODE}}^{\nu}$, $\mathcal{R}_{\parallel}^{\nu}$, $\mathcal{R}_{\perp}^{\nu}$, $\mathcal{R}_{N\mathrm{rec}}^\nu$, and $\mathcal{R}_{\gamma}^{\nu}$ |
| `derivative_matrix_nu` | derivative columns in $a$, $b$, and $\gamma$ with clock/root-force terms included |
| `krawczyk_budget_nu` | $Y_\nu$, $Z_\nu$, $\rho_{\mathrm{chart}}^{\nu}$, cokernel audit, and obstruction status |
| `branch_search_certificate` | branch box, margin vector, residual enclosure, derivative enclosure, interval/Krawczyk decision, event reset, and rejection taxonomy from [bounded-speed-factor-branch-search-certificate.md](bounded-speed-factor-branch-search-certificate.md) and [bounded-speed-factor-branch-krawczyk-decision-theorem.md](bounded-speed-factor-branch-krawczyk-decision-theorem.md) |
| `action_status_nu` | diagnostic fit, action-derived scale, curl, inertia, variational Noether convention, speed storage/exchange, support-action work, and total-force convention |
| `variational_noether_status` | fixed-period or period-constrained variation mode, period multiplier row, speed-factor EL row, speed-ODE equivalence, exchange residual, Noether-current envelope, and first failed status |
| `event_status_nu` | first bounded-speed event or `none` |
| `self_hit_status` | absent, fixed-speed-excluded, regularized-fold-layer, bounded-speed-self-hit candidate, or unledgered |
| `self_hit_exchange_status` | self-hit exchange window, speed-energy change, self-hit potential, work splits, endpoint exit, conservation/provenance ledgers, and first failed status |
| `status` | first failed row or `bounded-speed-dynamics-action-candidate`; a live-ledger candidate additionally requires `bounded-speed-coupled-fixed-point-candidate` |

Current status:

$$
\texttt{bounded-speed-executable-solve-open}.
$$

Immediate successor statuses before an executable artifact are:

$$
\texttt{finite-mode-branch-schema-open},
\qquad
\texttt{bounded-speed-ledger-handoff-contract-staged},
\qquad
\texttt{bounded-speed-symmetry-gauge-reduction-open},
\qquad
\texttt{bounded-speed-branch-schema-open}.
$$
