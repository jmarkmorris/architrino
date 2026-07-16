# Bounded Speed Factor Branch Search Certificate

Promotion status: `priority-only`. This packet converts the bounded speed factor proof stack into a branch-search decision object. It sits between [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md), [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md), [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md), and the detailed finite-mode, gauge, and Krawczyk packets:

- [bounded-speed-factor-finite-mode-branch-system.md](bounded-speed-factor-finite-mode-branch-system.md)
- [bounded-speed-factor-symmetry-gauge-reduction.md](bounded-speed-factor-symmetry-gauge-reduction.md)
- [bounded-speed-factor-branch-krawczyk-decision-theorem.md](bounded-speed-factor-branch-krawczyk-decision-theorem.md)

It does not retain a branch. Its purpose is to define exactly what an executable run must output before the architecture can say whether a bounded-speed same-level or hybrid-sector branch has been retained, rejected, or redirected to an event/reset chart.

---

## 1. Search Chart

Fix one branch class:

$$
\mathfrak{B}
=
\left(
N=6,\,
\sigma,\,
\Pi_{\mathrm{src}},\,
\Pi_{\mathrm{same}},\,
\Pi_{\mathrm{end}},\,
\mathsf{Supp},\,
\mathsf{Event},\,
\mathsf{Action},\,
\mathsf{Gauge}
\right),
$$

where $\sigma_i\in\{+1,-1\}$ is the neutral polarity ledger, $\Pi_{\mathrm{src}}$ is the source-pair policy, $\Pi_{\mathrm{same}}$ is the same-source policy, $\Pi_{\mathrm{end}}$ is the endpoint ownership convention, $\mathsf{Supp}$ is the support descriptor, $\mathsf{Event}$ is the allowed first-event class, $\mathsf{Action}$ declares fitted or action-derived scale rows, and $\mathsf{Gauge}$ declares the neutral-mode slice.

The finite chart is

$$
z
=
(a,b,r,s,\gamma,e,\ell).
$$

The components are:

| Block | Meaning |
| --- | --- |
| $a$ | curve coefficients for closed arclength curves $\mathbf{Y}_i$ and their tangent/curvature fields |
| $b$ | bounded speed factor coefficients for $\nu_i$ and derivative envelopes for $\chi_i,\Lambda_i$ |
| $r$ | active causal-root sheet variables, tail-root tube variables, and root-label data when not Schur-eliminated |
| $s$ | support center, support-radius functionals, support bands, support multipliers, and support-sector data |
| $\gamma$ | fitted scale or action-derived $\Gamma_B^\nu$ variable |
| $e$ | event-window endpoints, self-hit windows, root-fold contacts, and endpoint exchange variables |
| $\ell$ | live ledger labels: root signs, tail ownership, source provenance, polarity inventory, and action convention |

The label block $\ell$ is discrete. A Newton or Krawczyk certificate is always computed on one fixed label stratum. If $\ell$ changes, the run has reached an event or a new branch attempt rather than proving the same chart.

The search map is therefore not only a residual function. It is a tuple

$$
\mathfrak{S}_\nu(z_0,B)
=
\left(
\mathfrak{B},
z_0,
B,
\mathcal{R}_\nu,
D\mathcal{R}_\nu,
\mathcal{M}_\nu,
\mathcal{D}_\nu,
\mathsf{Decision}
\right),
$$

where $B$ is a coefficient box around $z_0$, $\mathcal{M}_\nu$ contains all positive margins, and $\mathcal{D}_\nu$ contains derivative and tail enclosures.

---

## 2. Physical-Time And Root Sheet Rows

For every curve site,

$$
\chi_i(\lambda)
=
\int_0^\lambda\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i=\chi_i^{-1},
\qquad
0<\nu_-\le\nu_i(\lambda)\le\nu_+<\infty.
$$

The physical-period row is

$$
H_i
=
\int_0^{L_i}\frac{d\lambda}{\nu_i(\lambda)}.
$$

The executable run declares either an equal-period row

$$
\mathcal{R}_{H,i}=H_i-H_*,
$$

or a winding row

$$
\mathcal{R}_{H,i}^{\mathrm{wind}}=m_iH_i-H_{\mathrm{com}}.
$$

For a root label $r=(i,j,\alpha)$,

$$
G_r^\nu(u,\eta;z)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
-\eta.
$$

The active sheet row is

$$
\mathcal{R}_{\mathrm{root},r}^\nu(u)
=
G_r^\nu(u,\eta_r(u);z),
$$

with Jacobian

$$
J_r^\nu
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_r.
$$

The root-sheet margin row is the vector inequality

$$
\mathcal{M}_{\mathrm{root}}^\nu
=
\left(
\eta_r-\eta_0,\,
\zeta_rJ_r^\nu-J_0,\,
g_q^\nu-g_0,\,
d_{ij}-d_0
\right)>0,
$$

where $g_q^\nu$ ranges over inactive-cell gaps and $d_{ij}$ ranges over noncollision floors. A branch-search certificate is invalid if it solves the projected dynamics while this root-sheet margin is uncertified.

---

## 3. Single Residual Used For Decisions

The decision residual is the weighted coupled residual

$$
F_\nu(z)
=
W_\nu^{1/2}\mathcal{R}_\nu(z),
$$

where

$$
\mathcal{R}_\nu
=
\begin{bmatrix}
\mathcal{R}_{\mathrm{gauge}}\\
\mathcal{R}_{H}\\
\mathcal{R}_{\nu\mathrm{band}}\\
\mathcal{R}_{\mathrm{speed\text{-}mean}}^\nu\\
\mathcal{R}_{\mathrm{speed\text{-}prim}}^\nu\\
\mathcal{R}_{\parallel}^\nu\\
\mathcal{R}_{\perp}^\nu\\
\mathcal{R}_{T\mathrm{unit}}\\
\mathcal{R}_{T\mathrm{hol}}\\
\mathcal{R}_{Y\mathrm{close}}\\
\mathcal{R}_{\mathrm{support\text{-}rad}}^\nu\\
\mathcal{R}_{\mathrm{support\text{-}band}}^\nu\\
\mathcal{R}_{\mathrm{support\text{-}radius}}^\nu\\
\mathcal{R}_{\mathrm{root}}^\nu\\
\mathcal{R}_{\mathrm{tail}}^\nu\\
\mathcal{R}_{\mathrm{tail\text{-}cover}}^\nu\\
\mathcal{R}_{\mathrm{VN}}^\nu\\
\mathcal{R}_{\mathrm{exch}}^\nu\\
\mathcal{R}_{\mathrm{exch,hit}}^\nu\\
\mathcal{R}_{\mathrm{Noeth}}^\nu\\
\mathcal{R}_{\mathrm{event}}^\nu\\
\mathcal{R}_{\mathrm{force\text{-}moment}}^\nu
\end{bmatrix}.
$$

The two dynamics rows are

$$
\mathcal{R}_{\parallel,i}^{\nu}
=
\nu_i\nu_i'
-
\Gamma_B^\nu\mathbf{T}_i\cdot F_{i,\mathrm{tot}}^\nu,
$$

and

$$
\mathcal{R}_{\perp,i}^{\nu}
=
\nu_i^2\mathbf{K}_i
-
\Gamma_B^\nu P_i^\perp F_{i,\mathrm{tot}}^\nu.
$$

The speed primitive row is

$$
A_i(u)
=
\Gamma_B^\nu
\int_0^u\mathbf{T}_i(s)\cdot F_{i,\mathrm{tot}}^\nu(s)\,ds,
\qquad
\mathcal{R}_{\mathrm{speed\text{-}prim},i}^{\nu}(u)
=
\nu_i(\Lambda_i(u))-\nu_{i,0}-A_i(u),
$$

with the mean row

$$
\mathcal{R}_{\mathrm{speed\text{-}mean},i}^\nu
=
\int_0^{H_*}\mathbf{T}_i(u)\cdot F_{i,\mathrm{tot}}^\nu(u)\,du.
$$

The primitive excursion must obey

$$
A_{i,\max}-A_{i,\min}\le\nu_+-\nu_-.
$$

The support-radius row consumes the support descriptor as a functional, not as a fixed spherical assumption:

$$
\mathcal{R}_{\mathrm{support\text{-}radius}}^\nu
=
R_a-\mathscr{R}_a(\mathbf{Y},\nu,\mathsf{Supp}).
$$

The force-moment row records the $3$ attractive and $2$ repulsive source-site inventory through weighted projections:

$$
F_{i,\mathrm{tot}}^\nu
=
F_{i,\mathrm{attr}}^\nu
+F_{i,\mathrm{rep}}^\nu
+F_{i,\mathrm{self}}^\nu
+F_{i,\mathrm{supp}}^\nu
+F_{i,\mathrm{med}}^\nu.
$$

The count by itself is not a force-balance proof; the residual consumes the delayed directions, delays, source-normal root-chart diagnostics, receiver-normal branch strengths, support work, and event terms.

---

## 4. Derivative Audit

The derivative matrix used for any branch decision is

$$
DF_\nu(z)
=
W_\nu^{1/2}D\mathcal{R}_\nu(z).
$$

It must include the columns

$$
D_a,\quad D_b,\quad D_r,\quad D_s,\quad D_\gamma,\quad D_e
$$

whenever the corresponding block is active. The required clock derivatives are

$$
D_b\chi_i(\lambda)
=
-
\int_0^\lambda
\frac{D_b\nu_i(\xi)}{\nu_i(\xi)^2}\,d\xi,
\qquad
D_b\Lambda_i(u)
=
-\nu_i(\Lambda_i(u))D_b\chi_i(\Lambda_i(u)).
$$

For an implicit root sheet,

$$
D\eta_r[v]
=
-
\frac{D_zG_r^\nu[v]}{\partial_\eta G_r^\nu}
=
\frac{D_zG_r^\nu[v]}{J_r^\nu},
$$

using $\partial_\eta G_r^\nu=-J_r^\nu$. The second derivative needed for Krawczyk, Hessian, and monodromy rows is the symmetric bilinear form

$$
D^2\eta_r[v,w]
=
-
(G_\eta)^{-1}
\left(
G_{zz}[v,w]
+G_{z\eta}[v]D\eta_r[w]
+G_{z\eta}[w]D\eta_r[v]
+G_{\eta\eta}D\eta_r[v]D\eta_r[w]
\right).
$$

If the solver eliminates $r$ by an inner root corrector, it must use the Schur derivative

$$
\widehat R_{X,Y}
=
R_{X,Y}
-
R_{X,r}R_{r,r}^{-1}R_{r,Y}
$$

for every non-root row block $X$ and active variable block $Y$. Frozen-root derivatives are diagnostic only.

---

## 5. Margin Vector And Chart Radius

The executable run exports one margin vector

$$
\mathcal{M}_\nu(B)
=
\left(
m_{\nu},
m_H,
m_{\chi},
m_{\eta},
m_J,
m_g,
m_d,
m_{\mathrm{supp}},
m_{\mathrm{tail}},
m_{\mathrm{VN}},
m_{\mathrm{hit}},
m_{\mathrm{event}},
m_{\mathrm{disc}}
\right).
$$

Each component is a certified lower bound on the corresponding positive row inside $B$. The branch chart radius is

$$
\rho_{\mathrm{chart}}^\nu
=
\min
\left\{
\rho_{\nu},
\rho_H,
\rho_\chi,
\rho_\eta,
\rho_J,
\rho_g,
\rho_d,
\rho_{\mathrm{supp}},
\rho_{\mathrm{tail}},
\rho_{\mathrm{VN}},
\rho_{\mathrm{hit}},
\rho_{\mathrm{event}},
\rho_{\mathrm{disc}}
\right\}.
$$

The support-tail entry is valid only if the finite owned cover is complete. The self-hit entry is valid only if every active self-hit window has a dwell-time row, endpoint row, and exchange residual. The variational Noether entry is valid only if the speed-factor Euler-Lagrange row and speed ODE are calibrated under one declared period convention.

---

## 6. Branch-Search Trichotomy

The branch search must return one of four mathematical outcomes.

### 6.1 Retained Candidate

A box $B$ is a retained bounded-speed branch candidate only if:

$$
\|F_\nu(z_*)\|\le\epsilon_{\mathrm{res}},
$$

for the certified zero $z_*\in B$, every margin in $\mathcal{M}_\nu(B)$ is positive, the Krawczyk inclusion is strict on the gauge-reduced range, and the normalized master error satisfies

$$
\mathfrak{E}_\nu(B)\le1.
$$

The resulting status is

$$
\texttt{bounded-speed-retained-branch-candidate}.
$$

This is still a priority-side retained candidate until the live-ledger certificate is recorded and observer exports and corpus-facing comparison rows are explicitly statused.

### 6.2 Event Reset

If a first-event surface is reached before the proof ball closes, the run returns

$$
\texttt{bounded-speed-event-reset}.
$$

The event reset is not a failure of the theory. It changes the label stratum $\ell$ and starts a new chart. Event-reset causes include:

| Event | Trigger |
| --- | --- |
| speed-band event | $\nu_i=\nu_-$ or $\nu_i=\nu_+$ with a certified crossing or tangency |
| period event | equal-period or winding row leaves its tolerance before Newton inclusion |
| root-fold event | $G_r^\nu=0$ and $J_r^\nu=0$ with fold normal-form data |
| tail-assimilation event | a tail cell contains a unique root tube that must enter $\mathcal{A}_\nu$ |
| self-hit event | a self-hit window opens, closes, or violates its dwell/exchange row |
| support-boundary event | a support boundary or multiplier complementarity row changes active set |
| action-event exchange | storage/exchange or Noether-current convention changes ledger stratum |

### 6.3 Certified Rejection

A box is rejected only when an interval or obstruction theorem proves that no admissible root of the same chart exists. The rejection statuses are:

| Status | Mathematical certificate |
| --- | --- |
| `bounded-speed-no-root-in-box` | interval residual/Krawczyk exclusion proves $0\notin F_\nu(B)$ or the Krawczyk image is disjoint |
| `bounded-speed-cokernel-obstruction` | a left-null obstruction lower bound exceeds all residual, tail, root, discretization, and action errors |
| `bounded-speed-root-sheet-singular` | $J_r^\nu$ or delay floors cannot remain positive on $B$ |
| `bounded-speed-tail-cover-impossible` | the tail domain cannot be excluded or assimilated without an unledgered event on the declared chart |
| `bounded-speed-speed-band-impossible` | the speed primitive excursion or period row cannot fit inside $[\nu_-,\nu_+]$ |
| `bounded-speed-self-hit-exchange-impossible` | a self-hit return exists but no exchange ledger can close energy, momentum, angular momentum, charge, and provenance |
| `bounded-speed-variational-noether-impossible` | speed ODE, storage/exchange, and Noether-current rows cannot arise from one declared action convention |

Certified rejection is stronger than a failed solver iteration. A failed iteration without an interval or obstruction proof returns a proof-budget status.

### 6.4 Proof-Budget Or Refinement Status

If the residual decreases but a margin, derivative enclosure, or tail/event row is not certified, the correct output is not rejection. It is one of:

$$
\texttt{bounded-speed-proof-budget-open},
\qquad
\texttt{bounded-speed-refinement-required},
\qquad
\texttt{bounded-speed-ledger-reset-required}.
$$

This distinction matters because the exact-antipodal $M=3$ evidence currently sits in this class: it has useful descent and root-window information, but it lacks a support-complete bounded-speed live-ledger certificate.

---

## 7. Execution Order

The branch-search run should proceed in this order:

1. choose a seed chart from fixed-speed exact-antipodal $M=3$, antipodal relaxation, same-level free-support, or hybrid-sector data;
2. freeze one source-pair policy, same-source policy, support descriptor, event convention, and action convention;
3. build the gauge slice and finite-mode variables;
4. solve or bracket the causal root sheets and emit root/Jacobian/gap/noncollision floors;
5. assemble the full residual $\mathcal{R}_\nu$ and the derivative matrix with clock, root, support, action, and event columns;
6. run damped Newton or pseudo-arclength continuation only while margins remain positive;
7. on every candidate box, run interval/Krawczyk inclusion or exclusion;
8. if the tail cover is incomplete, resolve every owned tail cell before using the Krawczyk budget;
9. if a self-hit window opens, close the return and exchange rows before promotion;
10. classify the output by the trichotomy above.

The earliest mathematically decisive current run is therefore not a broader architecture rewrite. It is an executable finite-mode branch search with all bounded-speed live-ledger rows present.

---

## 8. Certificate Schema

An executable branch-search report must emit:

| Field | Payload |
| --- | --- |
| `branch_class` | polarity ledger, source-pair policy, same-source policy, support descriptor, action convention, event convention |
| `finite_mode_chart` | coefficient basis, mode counts, node counts, gauge slice, variable block dimensions |
| `speed_band` | $\nu_-$, $\nu_+$, speed coefficients, speed derivative bounds, primitive excursion, period row |
| `support_radius_functional` | $\mathscr{R}_a$, $R_a$, spread/gap/transition rows, derivative envelopes |
| `root_sheet_rows` | active roots, brackets, $\eta$ floors, $J^\nu$ floors, inactive gaps, noncollision floors, first and second variations |
| `residual_vector` | all rows of $\mathcal{R}_\nu$ with row weights and norms |
| `derivative_audit` | active columns, Schur complements, omitted-column status, derivative and Hessian envelopes |
| `tail_cover` | ownership map, terminal predicates, overlap consistency, coefficient-box persistence, exported $\rho_{\mathrm{tail}}^\nu$ |
| `self_hit_exchange` | absent or window endpoints, dwell row, endpoint jumps, speed energy, self-hit potential, work splits, conservation/provenance ledger |
| `variational_noether` | period convention, speed-factor Euler-Lagrange row, speed-ODE equivalence, storage/exchange, support work, Noether-current envelope |
| `krawczyk_decision` | preconditioner, $Y_\nu$, $Z_\nu$, inclusion/exclusion, chart radius, range/cokernel status |
| `first_event` | `none` or classified event-reset surface with normal-form data |
| `decision` | retained candidate, event reset, certified rejection, or proof-budget/refinement status |
| `promotion_decision` | `priority-only`, `defer with blocker`, or later corpus promotion target |

Current status:

$$
\texttt{bounded-speed-branch-search-certificate-open}.
$$

First failure expected before an executable run:

$$
\texttt{bounded-speed-finite-mode-system-open},
\qquad
\texttt{bounded-speed-gauge-slice-open},
\qquad
\texttt{bounded-speed-krawczyk-decision-open}.
$$
