# Neutral Braid Finite-Mode Search

Promotion status: `priority-only`. This packet closes the priority-specification gap for
`neutral_braid_finite_mode_search` in [Braid](../braid-retained-branch-closure.md). It defines the first
executable finite-mode search target for a free-support neutral braid with hollow
support, bounded speed factors, and all-pairs delayed force rows.

It refines [Neutral Braid Model](neutral-braid-model.md),
[bounded-speed-factor-executable-solver-protocol.md](../shell-braid/bounded-speed-factor-executable-solver-protocol.md),
and
[bounded-speed-factor-finite-mode-branch-system.md](../shell-braid/bounded-speed-factor-finite-mode-branch-system.md).
It does not retain a branch, does not promote material into `content/markdown/aaa`,
and does not define runnable code. Its output is a mathematical search specification:
unknowns, residual rows, root-ledger consumption, decision statuses, and the minimal
artifact schema needed by future executable code.

---

## 1. Scope And Status

The search target is a general six-site neutral braid before binary partition, common
support band, exact antipodality, shell braid, or nested shell braid assumptions are
imposed. Let

$$
I=\{1,\ldots,6\},
$$

and fix a polarity map

$$
\sigma:I\to\{+1,-1\},
\qquad
\#\{i:\sigma_i=+1\}=3,
\qquad
\#\{i:\sigma_i=-1\}=3.
$$

The inventory row is

$$
Q_{\mathrm{core}}
=
\epsilon\sum_{i\in I}\sigma_i
=0.
$$

No binary index $i=(a,\sigma)$ is available in this packet. The active source-pair
policy is the all-pairs distinct-site policy

$$
\Pi_{\mathrm{all}}
=
\{(i,j)\in I\times I:i\ne j\},
\qquad
|\Pi_{\mathrm{all}}|=30.
$$

The same-source policy is separate:

$$
\Pi_{\mathrm{same}}
\in
\{
\texttt{ordinary-same-source-excluded},
\texttt{self-hit-event-ledgered},
\texttt{regularized-fold-layer}
\}.
$$

Thus "all-pairs" in this packet means every ordered distinct source row $i\ne j$.
Same-source roots, self-hit windows, or fold-layer representatives cannot be hidden
inside the ordinary force row; if present, they must enter event and exchange rows.

Fix one finite-mode chart

$$
M_{\mathrm{NS}}
=
\left(
M_Y,
M_\nu,
K,
Q_{\mathrm{tail}},
\mathcal{Q}_{\mathrm{occ}},
\mathcal{W}
\right),
$$

where $M_Y$ is the curve truncation, $M_\nu$ is the speed-factor truncation, $K$ is
the center-time collocation count, $Q_{\mathrm{tail}}$ is the root-tail cover,
$\mathcal{Q}_{\mathrm{occ}}$ is the optional occupancy quadrature or mesh, and
$\mathcal{W}$ declares residual weights. The receiver nodes are

$$
u_n=\frac{nH_*}{K},
\qquad
n=0,\ldots,K-1,
$$

or the declared winding analogue with $H_{\mathrm{com}}$.

The branch scope is the tuple

$$
\mathsf{Scope}_{\mathrm{NS},M}^{\nu}
=
\left(
I,
\sigma,
\Pi_{\mathrm{all}},
\Pi_{\mathrm{same}},
\Pi_{\mathrm{end}},
\mathsf{Supp}_{\mathrm{hollow}},
\mathsf{Action},
\mathsf{Event},
M_{\mathrm{NS}}
\right).
$$

Every row below must consume this same scope. A row computed after changing the
source-pair policy, support convention, endpoint convention, action convention, row
weights, root labels, or period convention has status

$$
\texttt{neutral-ledger-convention-mismatch}.
$$

Current status:

$$
\texttt{neutral-braid-finite-mode-search-open}.
$$

Promotion decision: `priority-only`. The packet is an executable simulation/proof
target, not a retained branch and not reader-facing corpus prose.

---

## 2. Finite-Mode Unknowns

For each site $i\in I$, the search represents a closed arclength curve

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda)\|=1,
$$

and a positive bounded speed factor

$$
0<\nu_-\le\nu_i(\lambda)\le\nu_+<\infty.
$$

The causal-time map and inverse are

$$
\chi_i(\lambda)
=
\int_0^\lambda\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i=\chi_i^{-1},
\qquad
H_i=\chi_i(L_i).
$$

The physical trajectory in the normalized center-time chart is

$$
\mathbf{x}_i(u)=\mathbf{Y}_i(\Lambda_i(u)).
$$

The equal-period row is

$$
R_{H,i}=H_i-H_*,
$$

or, for a winding search,

$$
R_{H,i}^{\mathrm{wind}}=m_iH_i-H_{\mathrm{com}}.
$$

The finite curve chart is indexed directly by $i\in I$:

$$
\mathbf{Y}_i(\lambda)
=
\mathbf{C}
+
\mathbf{Y}_{i,0}(\lambda;\theta,\ell)
+
\sum_{m=1}^{M_Y}
\left(
A_{i,m}\cos\frac{2\pi m\lambda}{L_i}
+
B_{i,m}\sin\frac{2\pi m\lambda}{L_i}
\right).
$$

The speed factor chart is

$$
\nu_i(\lambda)
=
1+p_{i,0}
+
\sum_{m=1}^{M_\nu}
\left(
p_{i,m}\cos\frac{2\pi m\lambda}{L_i}
+
q_{i,m}\sin\frac{2\pi m\lambda}{L_i}
\right).
$$

The finite unknown is

$$
\boxed{
z_{\mathrm{NS},M}^{\nu}
=
\left(
a,\ell,c,\theta,
b,\kappa,
r,j,w,
s,\mu,
o,
h,e,
\gamma,\Theta,
p,q,
g
\right).
}
$$

The blocks are:

| Block | Meaning |
| --- | --- |
| $a$ | all six curve coefficient families $A_{i,m},B_{i,m}$ and any chart-specific base coefficients |
| $\ell$ | curve lengths $L_i$ or independent length/winding variables |
| $c$ | center $\mathbf{C}$ used for gauge, hollow support, and occupancy rows |
| $\theta$ | phase cuts, continuation phases, and branch-chart phase variables |
| $b$ | speed coefficients $p_{i,0},p_{i,m},q_{i,m}$ for all six sites |
| $\kappa$ | common period variables $H_*$ or $H_{\mathrm{com}}$ |
| $r$ | active all-pairs causal root values $\eta_{ij,\beta,n}$ for $i\ne j$ |
| $j$ | root-sign labels, Jacobian-floor witnesses, and stored $J_{ij,\beta,n}^{\nu}$ values when augmented |
| $w$ | same-record receiver-normal branch-strength rows $W_{ij,\beta,n}^{\mathrm{rec},\nu}$ for every force, action, or wake-history root consumed downstream |
| $s$ | hollow support variables $R_{\mathrm{in}}$, $R_{\mathrm{out}}$, support slacks, and support-margin witnesses |
| $\mu$ | support multipliers or variational-inequality complementarity variables |
| $o$ | occupancy mesh summaries, smoothing-scale metadata, and derived density witnesses when occupancy is claimed |
| $h$ | self-hit windows, endpoint times, endpoint speeds, or fold-layer representatives |
| $e$ | event rows for root folds, speed-band contacts, support-boundary contacts, tail resets, and endpoint exchange |
| $\gamma$ | action-derived scale $\Gamma_B^\nu$ or diagnostic fitted scale |
| $\Theta$ | period multipliers for period-constrained variation |
| $p$ | polarity, attraction/repulsion, and source-site inventory witnesses |
| $q$ | live ledger provenance variables for charge, momentum, angular momentum, and branch exchange |
| $g$ | gauge-fixing slots and neutral-mode coordinates |

Discrete data such as the polarity map $\sigma$, source-pair policy, same-source
policy, endpoint convention, winding integers, smoothing kernel, and row weights are
branch metadata. They are not continuous Newton variables, but they must be emitted in
the artifact because changing them changes the search problem.

The admissible finite chart requires the unit and speed rows

$$
R_{\mathrm{unit},i,n}
=
\|\mathbf{Y}_i'(\lambda_{i,n})\|^2-1,
$$

and

$$
R_{\nu\mathrm{band}}
=
\max_i
\max
\left\{
\sup_\lambda(\nu_- - \nu_i(\lambda))_+,\,
\sup_\lambda(\nu_i(\lambda)-\nu_+)_+
\right\}.
$$

If arclength is built into the coefficient basis, $R_{\mathrm{unit}}$ becomes a chart
certificate rather than a residual row. If $\nu_i\equiv1$ is imposed, the output must
declare

$$
\texttt{fixed-speed-special-case}.
$$

---

## 3. Hollow Support And Occupancy Rows

The support descriptor is an annular hollow support band

$$
\mathsf{Supp}_{\mathrm{hollow}}
=
\left(
\mathbf{C},
R_{\mathrm{in}},
R_{\mathrm{out}},
\mathcal{S}_{\mathrm{case}},
\mathcal{Q}_{\mathrm{occ}}
\right),
$$

with

$$
0<R_{\mathrm{in}}<R_{\mathrm{out}}.
$$

Define

$$
r_i(\lambda)=\|\mathbf{Y}_i(\lambda)-\mathbf{C}\|,
$$

and the band inequalities

$$
B_i^-(\lambda)=r_i(\lambda)-R_{\mathrm{in}}\ge0,
\qquad
B_i^+(\lambda)=R_{\mathrm{out}}-r_i(\lambda)\ge0.
$$

The finite hollow-support residual is

$$
R_{\mathrm{hollow}}^{M}
=
\max_i
\max_n
\left(R_{\mathrm{in}}-r_i(\lambda_{i,n})\right)_+
+
\epsilon_{\mathrm{hollow,disc}},
$$

and the outer-support residual is

$$
R_{\mathrm{outer}}^{M}
=
\max_i
\max_n
\left(r_i(\lambda_{i,n})-R_{\mathrm{out}}\right)_+
+
\epsilon_{\mathrm{outer,disc}}.
$$

The band-width witness is

$$
\beta_{\mathrm{band}}
=
\frac{R_{\mathrm{out}}}{R_{\mathrm{in}}}.
$$

This search does not require $\beta_{\mathrm{band}}\approx1$. A shell braid or nested
shell braid reduction may later add radius-spread or ordered-radius rows, but failure
of those optional rows is not rejection of the general neutral braid search.

If support multipliers are active, the complementarity rows are

$$
\mu_i^-(\lambda)B_i^-(\lambda)=0,
\qquad
\mu_i^+(\lambda)B_i^+(\lambda)=0,
$$

with

$$
\mu_i^\pm(\lambda)\ge0,
\qquad
B_i^\pm(\lambda)\ge0.
$$

The support-normal force convention enters the same total force used by the dynamics:

$$
F_{i,\mathrm{tot}}^\nu
=
F_{i,\mathrm{all}}^\nu
+
F_{i,\mathrm{self}}^\nu
+
F_{i,\mathrm{med}}^\nu
+
F_{i,\mathrm{supp}}^\nu.
$$

The support row is

$$
R_{\mathrm{support,NS}}^\nu
=
\left(
R_{\mathrm{hollow}}^{M},
R_{\mathrm{outer}}^{M},
R_{\mathrm{supp\text{-}comp}},
R_{\mathrm{supp\text{-}rad}}^\nu,
R_{\mathrm{supp\text{-}work}}^\nu
\right).
$$

The hollow row only says that the six neutral braid architrinos do not enter the
central hollow. If a charged branch, central inventory, or other inner occupant is
declared, it must carry a separate noncollision, charge, root, action, event, and
provenance ledger.

For occupancy, define the finite causal-time measure

$$
\mu_i^{\nu,M}(A)
=
\frac1{H_i}
\sum_{n=0}^{K-1}
w_n
\mathbf{1}_A(\mathbf{Y}_i(\Lambda_i(u_n)))
+
\epsilon_{\mathrm{occ,quad}}(A),
$$

where the quadrature error must be bounded on the declared coefficient box. With a
smoothing kernel $K_\delta$, the unsigned and signed finite occupancy densities are

$$
n_{\mathrm{occ},\delta}^{M}(\mathbf{x}_q)
=
\sum_{i\in I}
\frac1{H_i}
\sum_{n=0}^{K-1}
w_n
K_\delta(\mathbf{x}_q-\mathbf{Y}_i(\Lambda_i(u_n)))
+
\epsilon_{\mathrm{occ},q},
$$

and

$$
n_{\mathrm{sgn},\delta}^{M}(\mathbf{x}_q)
=
\sum_{i\in I}
\sigma_i
\frac1{H_i}
\sum_{n=0}^{K-1}
w_n
K_\delta(\mathbf{x}_q-\mathbf{Y}_i(\Lambda_i(u_n)))
+
\epsilon_{\mathrm{sgn},q}.
$$

Occupancy is not a probability claim unless a separate normalization and observer rule
is declared. The default branch search may emit occupancy as diagnostic. If the branch
claims support-distribution containment, shielding, or near-neutral coarse exposure,
then it must include the coverage and signed-balance rows

$$
R_{\mathrm{cover},\delta}^{M}
=
\max_{\mathbf{x}_q\in\mathcal{Q}_{\mathrm{occ}}}
\left(
n_{\min}-n_{\mathrm{occ},\delta}^{M}(\mathbf{x}_q)
\right)_+
+
\epsilon_{\mathrm{cover,mesh}},
$$

and

$$
R_{\mathrm{sgn},\delta}^{M}
=
\max_{\mathbf{x}_q\in\mathcal{Q}_{\mathrm{occ}}}
|n_{\mathrm{sgn},\delta}^{M}(\mathbf{x}_q)|
+
\epsilon_{\mathrm{sgn,mesh}}.
$$

The occupancy row is therefore

$$
R_{\mathrm{occ}}^{M}
=
\left(
\texttt{occupancy-claim},
R_{\mathrm{cover},\delta}^{M},
R_{\mathrm{sgn},\delta}^{M},
\epsilon_{\mathrm{occ,quad}},
\epsilon_{\mathrm{occ,mesh}}
\right),
$$

with status `not_claimed` when no support-distribution containment claim is made.

---

## 4. All-Pairs Root-Ledger Consumption

For each ordered distinct source pair $(i,j)\in\Pi_{\mathrm{all}}$, receiver node
$u_n$, and retained root label $\beta$, define

$$
\lambda_i^n=\Lambda_i(u_n),
\qquad
\lambda_j^-(u_n,\eta)=\Lambda_j(u_n-\eta),
$$

and

$$
G_{ij,\beta,n}^{\nu}(z_{\mathrm{NS},M}^{\nu})
=
\left\|
\mathbf{Y}_i(\lambda_i^n)
-
\mathbf{Y}_j(\lambda_j^-(u_n,\eta_{ij,\beta,n}))
\right\|
-
\eta_{ij,\beta,n}.
$$

The unit delay vector and bounded-speed root Jacobian are

$$
\widehat{\mathbf{R}}_{ij,\beta,n}^{\nu}
=
\frac{
\mathbf{Y}_i(\lambda_i^n)
-
\mathbf{Y}_j(\lambda_j^-(u_n,\eta_{ij,\beta,n}))
}{
\eta_{ij,\beta,n}
},
$$

and

$$
J_{ij,\beta,n}^{\nu}
=
1
-
\nu_j(\lambda_j^-)
\mathbf{T}_j(\lambda_j^-)
\cdot
\widehat{\mathbf{R}}_{ij,\beta,n}^{\nu}.
$$

The active root rows are

$$
R_{\mathrm{root},ij,\beta,n}^{\nu}
=
G_{ij,\beta,n}^{\nu},
$$

and

$$
R_{\mathrm{sheet},ij,\beta,n}^{\nu,J}
=
\min\{0,\zeta_{ij,\beta}J_{ij,\beta,n}^{\nu}-J_0\},
\qquad
\zeta_{ij,\beta}\in\{+1,-1\}.
$$

Every ordered pair must have a complete finite ledger split:

$$
\mathcal{A}_{ij,n}^{\mathrm{full},\nu}
=
\mathcal{A}_{ij,n}^{\mathrm{act},\nu}
\sqcup
\mathcal{A}_{ij,n}^{\mathrm{tail\text{-}assim},\nu}
\sqcup
\mathcal{A}_{ij,n}^{\mathrm{tail\text{-}excl},\nu}.
$$

The all-pairs tail row requires a finite cover of every tail cell

$$
C=(i,j,U_n,Q_q),
\qquad
(i,j)\in\Pi_{\mathrm{all}},
$$

with exactly one terminal predicate:

$$
P_C\in
\left\{
\texttt{excluded-gap},
\texttt{unique-root-tube},
\texttt{event-reset}
\right\}.
$$

The full delayed force consumed by every row is

$$
F_{i,\mathrm{all}}^\nu(u_n)
=
\sum_{j\ne i}
\sum_{\beta\in\mathcal{A}_{ij,n}^{\mathrm{act},\nu}
\cup
\mathcal{A}_{ij,n}^{\mathrm{tail\text{-}assim},\nu}}
\sigma_i\sigma_j
W_{ij,\beta,n}^{\mathrm{rec},\nu}
\frac{\widehat{\mathbf{R}}_{ij,\beta,n}^{\nu}}
{(\eta_{ij,\beta,n})^2}
+
E_{i,\mathrm{tail\text{-}excl}}^\nu(u_n),
$$

where $W_{ij,\beta,n}^{\mathrm{rec},\nu}$ is the same-record receiver-normal
branch strength. The $|J_{ij,\beta,n}^{\nu}|$ floor remains a root-chart
diagnostic, not receiver-normal branch strength.
If a derivative-consuming force/action packet cannot emit this row and its
required first derivative on the same root record, the branch search exits as
`receiver-normal-restart-required` or diagnostic-only.

with

$$
\|E_{\mathrm{tail\text{-}excl}}^\nu\|
\le
\epsilon_{\mathrm{tail,all}}^\nu.
$$

For each receiver $i$, the structural source-site inventory is

$$
N_{\mathrm{attr},i}
=
\#\{j\ne i:\sigma_i\sigma_j=-1\}
=3,
$$

and

$$
N_{\mathrm{rep},i}
=
\#\{j\ne i:\sigma_i\sigma_j=+1\}
=2.
$$

Root multiplicity and root weight may vary by pair and node. They do not replace the
source-site inventory. The inventory row is

$$
R_{\mathrm{inv,NS}}
=
\left(
\sum_i\mathbf{1}_{\sigma_i=+1}-3,
\sum_i\mathbf{1}_{\sigma_i=-1}-3,
\epsilon\sum_i\sigma_i,
\{N_{\mathrm{attr},i}-3\}_{i\in I},
\{N_{\mathrm{rep},i}-2\}_{i\in I}
\right).
$$

The ledger consumption row is

$$
R_{\mathrm{ledger,all}}^\nu
=
\left(
\Pi_{\mathrm{force}}-\Pi_{\mathrm{all}},
\mathcal{A}_{\mathrm{force}}^\nu
\triangle
\mathcal{A}_{\mathrm{root}}^\nu,
\mathsf{Conv}_{\mathrm{force}}
-
\mathsf{Conv}_{\mathrm{root}},
\mathsf{Conv}_{\mathrm{action}}
-
\mathsf{Conv}_{\mathrm{root}},
\mathsf{Conv}_{\mathrm{event}}
-
\mathsf{Conv}_{\mathrm{root}}
\right).
$$

Here $\triangle$ denotes symmetric difference of retained root labels. A solve that
uses all-pairs roots for diagnostics but a reduced pair set for force, action, support,
Noether, or event rows is not a neutral braid finite-mode candidate.

---

## 5. Residual Vector And Objective Hierarchy

The neutral braid finite-mode residual is

$$
\boxed{
\mathcal{B}_{\mathrm{NS},M}^{\nu}
(z_{\mathrm{NS},M}^{\nu})
=
\begin{bmatrix}
R_{\mathrm{scope}}\\
R_{\mathrm{chart}}\\
R_{\mathrm{gauge}}\\
R_{\mathrm{unit}}\\
R_{\nu\mathrm{band}}\\
R_H\\
R_{\mathrm{support,NS}}^\nu\\
R_{\mathrm{occ}}^{M}\\
R_{\mathrm{root,all}}^\nu\\
R_{\mathrm{sheet,all}}^\nu\\
R_{\mathrm{tail,all}}^\nu\\
R_{\mathrm{ledger,all}}^\nu\\
R_{\mathrm{force,all}}^\nu\\
R_T^\nu\\
R_{\mathrm{speedODE}}^\nu\\
R_N^\nu\\
R_{\mathrm{inv,NS}}\\
R_{\mathrm{supp\text{-}work}}^\nu\\
R_{\mathrm{event}}^\nu\\
R_{\mathrm{hit}}^\nu\\
R_\gamma^\nu\\
R_{\mathrm{VN}}^\nu\\
R_{\mathrm{Noeth}}^\nu\\
R_{\mathrm{optional\text{-}reduction}}\\
R_{\mathrm{kraw}}^\nu
\end{bmatrix}.
}
$$

The total force row stores

$$
F_{i,\mathrm{tot}}^\nu(u_n)
=
F_{i,\mathrm{all}}^\nu(u_n)
+
F_{i,\mathrm{self}}^\nu(u_n)
+
F_{i,\mathrm{med}}^\nu(u_n)
+
F_{i,\mathrm{supp}}^\nu(u_n),
$$

and the dynamics rows are

$$
R_{T,i,n}^\nu
=
\nu_i(u_n)\frac{d\nu_i}{d\lambda_i}(u_n)
-
\gamma\,\mathbf{T}_{i,n}\cdot F_{i,\mathrm{tot}}^\nu(u_n),
$$

$$
R_{\mathrm{speedODE},i}^\nu
=
\left(
\int_0^{H_*}\mathbf{T}_i\cdot F_{i,\mathrm{tot}}^\nu\,du,\,
A_{i,\max}-A_{i,\min}-(\nu_+-\nu_-),\,
\nu_{i,0}-\frac{L_i-\int_0^{H_*}A_i(u)\,du}{H_*}
\right),
$$

where

$$
A_i(u)
=
\gamma
\int_0^u
\mathbf{T}_i(s)\cdot F_{i,\mathrm{tot}}^\nu(s)
\,ds,
$$

and

$$
R_{N,i,n}^\nu
=
\nu_i(u_n)^2\mathbf{K}_{i,n}
-
\gamma P_{i,n}^{\perp}F_{i,\mathrm{tot}}^\nu(u_n).
$$

The scale row is

$$
R_\gamma^\nu=\gamma-\Gamma_B^\nu(z_{\mathrm{NS},M}^{\nu}).
$$

If $\Gamma_B^\nu$ is not action-derived, the search may run as a diagnostic fit, but
the primary status must include

$$
\texttt{gamma-fitted-not-derived}.
$$

For Newton, Krawczyk, or obstruction decisions, use the weighted residual

$$
F_{\mathrm{NS},M}^{\nu}
=
W_{\mathrm{NS},M}^{1/2}
\mathcal{B}_{\mathrm{NS},M}^{\nu}.
$$

The objective hierarchy is lexicographic. A lower level must be admissible before a
higher-level reduction in norm has mathematical meaning:

| Level | Objective block | Passing meaning |
| ---: | --- | --- |
| 0 | $\Phi_0=(R_{\mathrm{scope}},R_{\mathrm{chart}},R_{\mathrm{gauge}},R_{\mathrm{unit}},R_{\nu\mathrm{band}},R_H,R_{\mathrm{inv,NS}})$ | valid six-site bounded-speed chart with neutral inventory and period data |
| 1 | $\Phi_1=(R_{\mathrm{support,NS}}^\nu,R_{\mathrm{root,all}}^\nu,R_{\mathrm{sheet,all}}^\nu,R_{\mathrm{tail,all}}^\nu,R_{\mathrm{ledger,all}}^\nu)$ | hollow support and all-pairs root ledger are live on one convention |
| 2 | $\Phi_2=(R_{\mathrm{force,all}}^\nu,R_T^\nu,R_{\mathrm{speedODE}}^\nu,R_N^\nu,R_{\mathrm{supp\text{-}work}}^\nu)$ | delayed all-pairs force, speed ODE, normal balance, and support work close together |
| 3 | $\Phi_3=(R_{\mathrm{event}}^\nu,R_{\mathrm{hit}}^\nu,R_\gamma^\nu,R_{\mathrm{VN}}^\nu,R_{\mathrm{Noeth}}^\nu)$ | action, event, self-hit, and Noether rows consume the same live ledger |
| 4 | $\Phi_4=(R_{\mathrm{occ}}^{M},R_{\mathrm{optional\text{-}reduction}},R_{\mathrm{kraw}}^\nu)$ | declared occupancy claims, optional reductions, and interval proof budget are statused |

Equivalently, a scalar merit function may be emitted only as a reporting convenience:

$$
\Psi_{\mathrm{NS},M}
=
\sum_{\ell=0}^{4}
\omega_\ell\|\Phi_\ell\|^2,
\qquad
0<\omega_{\ell+1}\ll\omega_\ell.
$$

The scalar value cannot override the lexicographic first-failure row.

Optional binary partition, shell braid, and nested shell braid reductions enter only
through

$$
R_{\mathrm{optional\text{-}reduction}}
=
\left(
R_{\mathrm{partition}},
R_{\mathrm{anti}},
R_{\nu\mathrm{pair}},
R_{R\mathrm{def}},
R_{R\mathrm{spread}},
R_{R\mathrm{gap}},
R_{\mathrm{reduction\text{-}ledger}}
\right),
$$

with status `not_claimed` unless the branch scope declares the reduction. Failure of
an optional reduction does not reject a general neutral braid candidate.

---

## 6. Acceptance, Rejection, And Trichotomy

The search returns exactly one primary trichotomy status:

$$
\mathsf{Decision}_{\mathrm{NS},M}
\in
\left\{
\texttt{neutral-braid-finite-mode-candidate},
\texttt{neutral-braid-finite-mode-rejected},
\texttt{neutral-braid-finite-mode-open}
\right\}.
$$

### Candidate

The status is `neutral-braid-finite-mode-candidate` only if:

1. the scope row fixes the six-site neutral inventory, all-pairs distinct-site policy,
   same-source policy, hollow support convention, period convention, action/event
   convention, and row weights;
2. the finite curve and speed chart is admissible on a coefficient box;
3. $R_{\mathrm{support,NS}}^\nu$ has positive hollow and outer support margins or a
   closed support complementarity row;
4. every ordered pair $(i,j)\in\Pi_{\mathrm{all}}$ has active, assimilated, or
   excluded root coverage with positive delay and Jacobian floors;
5. the tail error $\epsilon_{\mathrm{tail,all}}^\nu$ is zero by exclusion or included
   in every dynamics, action, event, Noether, and Krawczyk bound;
6. all dynamics rows use the same $F_{i,\mathrm{tot}}^\nu$ and satisfy the declared
   residual tolerances;
7. action-derived scale, variational Noether, support work, and event exchange rows
   close, or the output explicitly downgrades to diagnostic status;
8. declared occupancy claims pass $R_{\mathrm{cover},\delta}^{M}$ and
   $R_{\mathrm{sgn},\delta}^{M}$, while undeclared occupancy remains `not_claimed`;
9. the gauge-reduced Krawczyk and cokernel budget passes:

$$
Z_{\mathrm{NS},M}^{\nu}<1,
\qquad
Y_{\mathrm{NS},M}^{\nu}
+
Z_{\mathrm{NS},M}^{\nu}\rho
<\rho,
\qquad
\rho\le\rho_{\mathrm{chart,NS},M}^{\nu},
$$

and

$$
E_{\mathrm{Noeth}}^\nu
+
E_{\mathrm{event}}^\nu
+
\left\|
P_{\mathrm{cok}}
\mathcal{B}_{\mathrm{NS},M}^{\nu}
\right\|
+
\epsilon_{\mathrm{tail,all}}^\nu
+
\epsilon_{\mathrm{disc}}^\nu
\le
\tau_{\mathrm{NS},M}.
$$

This candidate is a finite-mode live-ledger candidate only. It is not a retained
architrino branch until a refinement sequence or direct curve-level certificate removes
truncation and tail errors and the master retention rows close on the same ledger.

### Rejection

The status is `neutral-braid-finite-mode-rejected` only if the search proves a
certified obstruction in the declared finite chart. A failed Newton descent, large
residual, missing root bracket, optional-reduction failure, or fitted $\gamma$ row is
not enough.

A finite-chart rejection may be reported when an interval or Krawczyk exclusion proves
that no $z_{\mathrm{NS},M}^{\nu}$ in the declared coefficient box can satisfy the
required rows after allowed Schur complements and event resets. A stronger model-level
obstruction requires additional certified checks showing that nearby higher-mode
columns, alternative hollow-support parameters, tail assimilation, source-pair ledger
completion, and optional binary/shell relaxations cannot remove the failed row. Without
those checks, the status remains open.

### Open

The status is `neutral-braid-finite-mode-open` when the search lacks a proof-quality
candidate or proof-quality rejection. The first-failure row should be the earliest
applicable status in this ordering:

1. `neutral-braid-finite-mode-schema-open`
2. `neutral-ledger-convention-mismatch`
3. `neutral-inventory-open`
4. `six-curve-chart-open`
5. `neutral-mode-quotient-open`
6. `unit-arclength-row-open`
7. `speed-band-failure`
8. `clock-period-failure`
9. `bounded-speed-time-map-derivatives-open`
10. `hollow-support-band-open`
11. `support-complementarity-open`
12. `all-pairs-root-ledger-open`
13. `root-jacobian-floor-failure`
14. `all-pairs-tail-cover-incomplete`
15. `tail-force-error-unbounded`
16. `all-pairs-force-ledger-mismatch`
17. `speed-ode-mean-fails`
18. `speed-primitive-band-fails`
19. `tangential-speed-row-open`
20. `normal-equation-open`
21. `support-action-work-open`
22. `occupancy-claim-open`
23. `event-matching-open`
24. `self-hit-exchange-residual-open`
25. `action-scale-mismatch`
26. `gamma-fitted-not-derived`
27. `speed-el-ode-equivalence-open`
28. `noether-current-open`
29. `derivative-block-stale`
30. `coupled-cokernel-open`
31. `coupled-krawczyk-open`
32. `finite-mode-convergence-open`
33. `not-retained`

---

## 7. Minimal Output Schema

A future executable search artifact for this packet must emit at least:

| Field | Required payload |
| --- | --- |
| `packet_id` | `neutral_braid_finite_mode_search` |
| `promotion_status` | `priority-only` |
| `branch_scope` | $I$, $\sigma$, $\Pi_{\mathrm{all}}$, $\Pi_{\mathrm{same}}$, endpoint convention, hollow support convention, action/event convention, row weights, and truncation $M_{\mathrm{NS}}$ |
| `site_inventory` | three positive and three negative architrinos, $Q_{\mathrm{core}}=0$, and receiver-wise $3$ attractive / $2$ repulsive source-site row |
| `unknown_vector` | $z_{\mathrm{NS},M}^{\nu}$ with block dimensions and discrete metadata |
| `curve_speed_chart` | six closed curves, arclength status, $L_i$, $\nu_i$, speed-band margins, $\chi_i$, $\Lambda_i$, $H_i$, and time-map derivatives |
| `hollow_support` | $\mathbf{C}$, $R_{\mathrm{in}}$, $R_{\mathrm{out}}$, $\beta_{\mathrm{band}}$, hollow and outer support margins, support multipliers or variational-inequality status, and central-inventory status |
| `occupancy_rows` | `not_claimed` or smoothing scale, occupancy mesh, $n_{\mathrm{occ},\delta}^{M}$, $n_{\mathrm{sgn},\delta}^{M}$, coverage row, signed-balance row, and quadrature/mesh error bounds |
| `all_pairs_root_ledger` | all $30$ ordered source rows, active roots, assimilated tail roots, excluded tail cells, delay floors, Jacobian floors, sign labels, inactive gaps, and same-source policy |
| `tail_split` | ownership map for every all-pairs tail cell, terminal predicates, persistence radius, and $\epsilon_{\mathrm{tail,all}}^\nu$ |
| `force_rows` | $F_{i,\mathrm{all}}^\nu$, $F_{i,\mathrm{self}}^\nu$, $F_{i,\mathrm{med}}^\nu$, $F_{i,\mathrm{supp}}^\nu$, $F_{i,\mathrm{tot}}^\nu$, force projections, and force derivative envelopes |
| `residual_vector` | $\mathcal{B}_{\mathrm{NS},M}^{\nu}$, row weights, row norms, and first-failure row |
| `objective_hierarchy` | $\Phi_0,\ldots,\Phi_4$, scalar merit value if used, and proof that scalar weighting did not override first-failure ordering |
| `derivative_matrix` | derivative columns in curve, speed, clock, root, support, occupancy-claim, event, action, Noether, provenance, and gauge blocks, with omitted-column audit |
| `krawczyk_budget` | $Y_{\mathrm{NS},M}^{\nu}$, $Z_{\mathrm{NS},M}^{\nu}$, $\rho$, $\rho_{\mathrm{chart,NS},M}^{\nu}$, range/cokernel rows, and pass/fail status |
| `optional_reductions` | binary partition, exact-antipodal, shell braid, and nested shell braid rows as `not_claimed`, `failed`, or `passed`; these do not drive base neutral braid rejection |
| `decision` | one of the trichotomy statuses plus first-failure status and rejection scope if applicable |
| `not_retained_reason` | retained-branch blockers: finite-mode convergence, full root/tail closure, action-derived scale, Noether/event closure, stability, or master-retention rows |

Minimal artifacts may omit observer exports. If observer rows are emitted, their only
valid base statuses are `not_computed`, `diagnostic`, `failed`, or `passed`; observer
exports must not drive this base finite-mode search.

---

## 8. Theorem Target

**Theorem target: neutral braid finite-mode search trichotomy.** Fix one six-site
neutral braid scope $\mathsf{Scope}_{\mathrm{NS},M}^{\nu}$, one finite chart
$M_{\mathrm{NS}}$, one hollow support convention, one all-pairs distinct-site root
policy, one same-source policy, one action/event convention, and one residual-weight
convention. Suppose:

1. $z_{\mathrm{NS},M}^{\nu}$ declares every curve, speed factor, root, support,
   occupancy-claim, event, action, Noether, provenance, and gauge variable used by
   $\mathcal{B}_{\mathrm{NS},M}^{\nu}$;
2. the six curves are closed and arclength-parametrized on the coefficient box, and
   all speed factors remain in $[\nu_-,\nu_+]$;
3. hollow support margins and support-work rows are certified on the same
   center-gauge point $\mathbf{C}$;
4. every ordered pair $i\ne j$ has a complete active, assimilated, or excluded
   causal-root ledger with positive delay and Jacobian floors;
5. every force, dynamics, action, Noether, event, and support row consumes that same
   all-pairs root ledger;
6. declared occupancy claims include quadrature and mesh error bounds;
7. the derivative matrix includes active columns or certified Schur complements for
   roots, support, event, action, Noether, provenance, and gauge blocks;
8. the gauge-reduced Krawczyk range, cokernel, and chart-radius inequalities pass or
   an interval exclusion proves no solution in the declared finite chart.

Then the search returns exactly one of the trichotomy statuses in Section 6. A
candidate is a finite-mode live-ledger candidate, not a retained branch. A rejection is
local to the declared finite chart unless higher-mode, support, tail, and policy
relaxation exclusions are also certified. An open result records the first missing row
without rejecting the neutral braid model.

Proof route:

1. the neutral inventory and direct site labels prevent hidden binary assumptions;
2. the speed band makes each $\chi_i$ invertible and defines center-time root equations;
3. all-pairs root completion makes every delayed force term consume the same ordered
   source rows;
4. Jacobian floors and root-sheet derivatives propagate finite coefficient changes into
   force and action derivatives;
5. hollow support rows separate central exclusion from any central-inventory claim;
6. occupancy rows convert support-distribution claims into checkable finite density
   rows without changing the primitive six-curve ontology;
7. the tangent speed row and normal curvature row test bounded-speed dynamics using
   the same total force;
8. action, Noether, and event rows decide whether a dynamics candidate is action-derived
   or only diagnostic;
9. optional binary, shell braid, and nested shell braid rows classify reductions without
   controlling base neutral braid acceptance;
10. the Krawczyk or interval exclusion block supplies the finite-mode proof decision,
   while the output schema preserves the blockers for retained-branch closure.

Current successor status:

$$
\texttt{neutral-braid-finite-mode-artifact-open}.
$$
