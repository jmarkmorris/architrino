# Bounded Speed Factor Finite-Mode Branch System

Promotion status: `priority-only`. This packet refines the finite-mode solver row of [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md) into a single algebraic branch system for the bounded speed factor same-level tri-binary model. It is the executable finite-mode version of the coupled live ledger in [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md), with root-sheet derivatives from [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md), second sheet envelopes from [bounded-speed-factor-second-root-variation-lemma.md](bounded-speed-factor-second-root-variation-lemma.md), radial support rows from [nested-shell-swarm-radial-support-functional.md](../nested-shell-swarm/nested-shell-swarm-radial-support-functional.md), variational rows from [bounded-speed-factor-variational-noether-closure.md](bounded-speed-factor-variational-noether-closure.md), self-hit exchange rows from [bounded-speed-factor-self-hit-exchange-closure.md](bounded-speed-factor-self-hit-exchange-closure.md), branch-search reporting from [bounded-speed-factor-branch-search-certificate.md](bounded-speed-factor-branch-search-certificate.md), gauge reduction from [bounded-speed-factor-symmetry-gauge-reduction.md](bounded-speed-factor-symmetry-gauge-reduction.md), Krawczyk decisions from [bounded-speed-factor-branch-krawczyk-decision-theorem.md](bounded-speed-factor-branch-krawczyk-decision-theorem.md), and retention status from [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md).

It does not retain a branch. It states the finite-mode unknown vector, residual rows, dimension count, gauge handling, tail split, solver artifact schema, and first-failure statuses required before any numerical bounded speed factor run can be read as a branch candidate rather than as a diagnostic descent.

---

## 1. Finite Chart And Unknown Vector

Fix one branch class, one source-pair policy, one same-source policy, one radial-support convention, one period or winding convention, one event endpoint convention, one polarity/inventory ledger, one residual weighting, and one finite-mode truncation

$$
M=(M_Y,M_\nu,K,\mathcal{A}_{\nu}^{\mathrm{act}},Q_{\mathrm{tail}}).
$$

The receiver collocation nodes are common center-time nodes

$$
u_n=\frac{nH_*}{K},
\qquad n=0,\ldots,K-1,
$$

or the winding analogue with $H_{\mathrm{com}}$. Site labels are

$$
i=(a,\sigma),
\qquad
a\in\{1,2,3\},
\qquad
\sigma\in\{+,-\},
$$

so the neutral Noether-core inventory has six architrinos and polarity signs $\sigma_i\in\{+1,-1\}$ with three positive and three negative sites.

The finite unknown is

$$
\boxed{
z_M
=
\left(
a,\ell,c,\theta,
b,\kappa,
r,j,
s,\mu,
h,e,
\gamma,\Theta,
p,q,
g
\right).
}
$$

The entries are:

| Block | Dimension symbol | Meaning |
| --- | ---: | --- |
| $a$ | $N_Y$ | curve coefficients for $\mathbf{Y}_i(\lambda)$ in the chosen arclength Fourier, arclength-inverse, or free-support basis |
| $\ell$ | $N_L$ | curve lengths $L_i$ or independent length/winding variables not fixed by the chart |
| $c$ | $3$ | branch center $\mathbf{C}$ for radial support and center gauge rows |
| $\theta$ | $N_\theta$ | phase offsets, period cuts, winding phases, or branch-continuation phase variables |
| $b$ | $N_\nu$ | bounded speed factor coefficients for $\nu_i(\lambda)$ |
| $\kappa$ | $N_H$ | common period variables such as $H_*$ or $H_{\mathrm{com}}$ |
| $r$ | $N_r$ | active causal root sheet values $\eta_{r,n}$ or local root corrector variables |
| $j$ | $N_j$ | fixed Jacobian-sign slots $\zeta_r$ and numerical Jacobian floor witnesses $J_{r,n}^{\nu}$ when the augmented chart stores them |
| $s$ | $N_s$ | support variables: support bands, partition-indexed radii $R_a$, radius-spread variables, transition margins, and radial-support slack variables |
| $\mu$ | $N_\mu$ | support multipliers or variational-inequality complementarity variables |
| $h$ | $N_h$ | self-hit windows, endpoint times, endpoint speeds, potential parameters, and event-reset variables |
| $e$ | $N_e$ | event ledgers for root folds, speed-band contacts, support-boundary contacts, tail assimilation, endpoint jumps, and Noether-Sea exchange |
| $\gamma$ | $1$ | action-derived dynamics scale $\Gamma_B^{\nu}$ or diagnostic fitted scale |
| $\Theta$ | $N_\Theta$ | period multipliers for period-constrained variation |
| $p$ | $N_p$ | polarity and attraction/repulsion ledger slots, including source-site inventory witnesses |
| $q$ | $N_q$ | live ledger provenance variables for source labels, charge, momentum, angular momentum, and branch exchange |
| $g$ | $N_g$ | gauge-fixing slots and neutral-mode coordinates used only to impose slices or report null directions |

The curve and speed factors are represented as

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
\right),
$$

and

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

The chart is admissible only if

$$
\|\mathbf{Y}_i'(\lambda)\|=1,
\qquad
0<\nu_-\le\nu_i(\lambda)\le\nu_+,
$$

on the certified coefficient box. If arclength is built into the basis, the unit row becomes a chart certificate rather than a Newton residual.

The causal clock and inverse map are

$$
\chi_i(\lambda)
=
\int_0^\lambda\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i=\chi_i^{-1},
\qquad
H_i=\chi_i(L_i).
$$

For each retained root label $\alpha=(i,j,\beta,n)$, the finite active root value $\eta_{\alpha}$ represents a point on a causal root sheet:

$$
G_\alpha^\nu(z_M)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u_n))
-
\mathbf{Y}_j(\Lambda_j(u_n-\eta_\alpha))
\right\|
-
\eta_\alpha.
$$

The bounded-speed root Jacobian is

$$
J_\alpha^\nu
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_\alpha,
\qquad
\widehat{\mathbf{R}}_\alpha
=
\frac{
\mathbf{Y}_i(\Lambda_i(u_n))
-
\mathbf{Y}_j(\Lambda_j(u_n-\eta_\alpha))
}{\eta_\alpha}.
$$

The finite chart is a live ledger only when $r$, $s$, $h$, $e$, $\gamma$, $p$, and $q$ are solved or Schur-complemented with derivative columns. A solve over only $(a,b,\gamma)$ is diagnostic unless it emits the Schur corrections from the coupled fixed-point packet.

---

## 2. Residual Vector

The executable finite-mode branch system is

$$
\boxed{
\mathcal{B}_M^\nu(z_M)
=
\begin{bmatrix}
R_{\mathrm{chart}}\\
R_{\mathrm{gauge}}\\
R_{\mathrm{unit}}\\
R_{\nu\mathrm{band}}\\
R_H\\
R_{\mathrm{root}}^\nu\\
R_{\mathrm{sheet}}^\nu\\
R_{\mathrm{tail}}^\nu\\
R_{\mathrm{force}}^\nu\\
R_T^\nu\\
R_N^\nu\\
R_{\mathrm{support}}^\nu\\
R_{\mathrm{slotR}}^\nu\\
R_{\mathrm{inventory}}\\
R_{\mathrm{event}}^\nu\\
R_{\mathrm{hit}}^\nu\\
R_{\gamma}^\nu\\
R_{\mathrm{VN}}^\nu\\
R_{\mathrm{Noeth}}^\nu\\
R_{\mathrm{kraw}}^\nu
\end{bmatrix}.
}
$$

The weighted residual is

$$
F_M^\nu(z_M)=W_M^{1/2}\mathcal{B}_M^\nu(z_M).
$$

Every row must use the same force convention

$$
F_{i,\mathrm{tot}}^\nu
=
\sum_{\alpha\in\mathcal{A}_{i,n}^{\nu}}
\sigma_i\sigma_j
\frac{\widehat{\mathbf{R}}_\alpha}
{\eta_\alpha^2|J_\alpha^\nu|}
+
F_{i,\mathrm{self}}^\nu
+
F_{i,\mathrm{med}}^\nu
+
F_{i,\mathrm{supp}}^\nu,
$$

where $F_{i,\mathrm{med}}^\nu$ includes coherent response of the Noether Sea and $F_{i,\mathrm{supp}}^\nu$ is present only when support multipliers or variational-inequality support rows are active.

### 2.1 Chart, Gauge, And Speed Rows

The chart row is

$$
R_{\mathrm{chart}}
=
\left(
R_{\mathrm{basis}},
R_{\mathrm{domain}},
R_{\mathrm{ledger\text{-}identity}},
R_{\mathrm{row\text{-}weights}}
\right),
$$

requiring the declared coefficient basis, node set, source-pair policy, same-source policy, support convention, and row weights to agree with the live ledger.

The gauge row fixes neutral modes:

$$
R_{\mathrm{gauge}}
=
\left(
\sum_i\int_0^{L_i}(\mathbf{Y}_i-\mathbf{C})\,d\lambda,\,
\sum_i\int_0^{L_i}\mathbf{Y}_i\times\mathbf{Y}_{i,\mathrm{ref}}\,d\lambda,\,
\langle z_M-z_{\mathrm{ref}},\tau_{\mathrm{cont}}\rangle-\Delta s,\,
g-\mathcal{G}(a,b,s,e)
\right).
$$

The first two entries remove translation and rotation, the third is optional pseudo-arclength continuation, and the last records any additional phase, antipodal, or period-cut slice. Gauge rows do not assert physics; they choose a transverse slice through the neutral orbit.

The arclength row is

$$
R_{\mathrm{unit},i,n}
=
\|\mathbf{Y}_i'(\lambda_{i,n})\|^2-1,
$$

when not built into the chart. The speed-band inequality row is

$$
R_{\nu\mathrm{band}}
=
\max_i
\max
\left\{
\sup_\lambda(\nu_--\nu_i(\lambda))_+,\,
\sup_\lambda(\nu_i(\lambda)-\nu_+)_+
\right\}.
$$

The period row is

$$
R_{H,i}=H_i-H_*,
\qquad
H_i=\int_0^{L_i}\frac{d\lambda}{\nu_i(\lambda)},
$$

or, for winding,

$$
R_{H,i}^{\mathrm{wind}}=m_iH_i-H_{\mathrm{com}}.
$$

### 2.2 Causal Root Sheet Rows

The active causal root sheet row is

$$
R_{\mathrm{root},\alpha}^\nu=G_\alpha^\nu(z_M).
$$

The Jacobian and sign-stratum row is

$$
R_{\mathrm{sheet},\alpha}^{\nu,J}
=
\min\{0,\zeta_\alpha J_\alpha^\nu-J_0\},
\qquad
\zeta_\alpha\in\{+1,-1\}.
$$

The sheet-slope row compares the stored finite difference or spectral derivative $D_u^M\eta_\alpha$ against

$$
\dot\eta_\alpha
=
\frac{
\widehat{\mathbf{R}}_\alpha\cdot
\left(
\nu_i\mathbf{T}_i-\nu_j^-\mathbf{T}_j^-
\right)
}{J_\alpha^\nu}.
$$

Thus

$$
R_{\mathrm{sheet},\alpha}^{\nu,\dot\eta}
=
D_u^M\eta_\alpha-\dot\eta_\alpha.
$$

The first-variation export row requires, for every active finite direction $v$,

$$
D_v\eta_\alpha
-
\frac{
\widehat{\mathbf{R}}_\alpha\cdot
\left(
\Xi_{v,i}-\Xi_{v,j}^-
\right)
}{J_\alpha^\nu}
=0,
$$

where

$$
\Xi_{v,i}
=
\xi_{v,i}
-
\nu_i\mathbf{T}_iD_v\chi_i,
\qquad
D_v\chi_i(\lambda)
=
-
\int_0^\lambda
\frac{D_v\nu_i(\xi)}{\nu_i(\xi)^2}
d\xi.
$$

The second-sheet row is not a collocation equation; it is an interval certificate:

$$
R_{\mathrm{sheet2}}^\nu
=
\left(
\Lambda_{\eta}^{(2)},
\Lambda_J^{(2)},
\Lambda_n^{(2)},
L_R^{\mathrm{sheet},\nu}
\right)
\ \text{emitted on the coefficient box}.
$$

If $R_{\mathrm{sheet2}}^\nu$ is missing, Newton diagnostics may run, but Krawczyk, Hessian, action-stability, and monodromy rows are not certified.

### 2.3 Tail Split

The full root ledger is split into

$$
\mathcal{A}_{\nu}^{\mathrm{full}}
=
\mathcal{A}_{\nu}^{\mathrm{act}}
\sqcup
\mathcal{A}_{\nu}^{\mathrm{tail}}
\sqcup
\mathcal{A}_{\nu}^{\mathrm{excl}},
$$

where active roots enter $r$, assimilated tail roots enter the same root-sheet formulas, and excluded cells enter an interval proof. The tail row is

$$
R_{\mathrm{tail}}^\nu
=
\left(
R_{\mathrm{owner}},
R_{\mathrm{terminal}},
R_{\mathrm{overlap}},
R_{\mathrm{nogap}},
R_{\mathrm{persist}},
R_{\mathrm{tail\text{-}force}}
\right).
$$

The ownership row requires every causal-time tail cell

$$
C=(U_n,Q_q,i,j)
$$

to have exactly one owner:

$$
\sum_{\omega\in\Omega(C)}\mathbf{1}_{\omega\ \mathrm{owns}\ C}=1.
$$

Each owned cell must satisfy one terminal predicate:

$$
P_C\in
\left\{
\texttt{excluded-gap},
\texttt{unique-root-tube},
\texttt{event-reset}
\right\}.
$$

The finite residual embeds into the full proof stack by defining

$$
F_{i,\mathrm{full}}^\nu
=
F_{i,\mathrm{act}}^\nu
+
F_{i,\mathrm{tail\text{-}assim}}^\nu
+
E_{i,\mathrm{tail\text{-}excl}}^\nu,
$$

with

$$
\|E_{\mathrm{tail\text{-}excl}}^\nu\|
\le
\epsilon_{\mathrm{tail}}^\nu.
$$

No finite branch system is promotion-eligible unless either $\epsilon_{\mathrm{tail}}^\nu=0$ by exclusion or the remaining tail error is included in every Krawczyk, Noether, event, and master residual bound.

### 2.4 Force-Balance And Tangential Speed-Factor Rows

At each site and node, set

$$
\mathbf{T}_{i,n}=\mathbf{T}_i(\Lambda_i(u_n)),
\qquad
\mathbf{K}_{i,n}=\mathbf{Y}_i''(\Lambda_i(u_n)).
$$

The force row stores both total force and projection split:

$$
R_{\mathrm{force},i,n}^\nu
=
F_{i,\mathrm{stored},n}^\nu-F_{i,\mathrm{tot}}^\nu(u_n).
$$

The tangential bounded speed factor ODE row is

$$
\boxed{
R_{T,i,n}^\nu
=
\nu_i(u_n)\frac{d\nu_i}{d\lambda_i}(u_n)
-
\gamma\,\mathbf{T}_{i,n}\cdot F_{i,\mathrm{tot}}^\nu(u_n).
}
$$

Equivalently, in center time,

$$
\frac{d\nu_i}{du}
=
\gamma\,\mathbf{T}_{i}\cdot F_{i,\mathrm{tot}}^\nu.
$$

The closed-period speed-ODE solvability subrow is

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
A_i(u)=\gamma\int_0^u\mathbf{T}_i(s)\cdot F_{i,\mathrm{tot}}^\nu(s)\,ds.
$$

The normal force-balance row is

$$
\boxed{
R_{N,i,n}^\nu
=
\nu_i(u_n)^2\mathbf{K}_{i,n}
-
\gamma P_{i,n}^{\perp}F_{i,\mathrm{tot}}^\nu(u_n).
}
$$

The old fixed-speed tangent row $\mathbf{T}_i\cdot F_i=0$ is recovered only in the special subspace $\nu_i\equiv1$.

### 2.5 Support-Radius Rows

The support row contains free-support or case-specific boundary residuals:

$$
R_{\mathrm{support}}^\nu
=
\left(
R_{\mathrm{supp\text{-}band}},
R_{\mathrm{supp\text{-}rad}},
R_{\mathrm{supp\text{-}comp}},
R_{\mathrm{supp\text{-}work}}
\right).
$$

For support bands $B_i^\pm(\lambda)\ge0$ with multipliers $\mu_i^\pm\ge0$,

$$
R_{\mathrm{supp\text{-}comp},i}^{\pm}
=
\mu_i^\pm B_i^\pm,
\qquad
\mu_i^\pm\ge0,
\qquad
B_i^\pm\ge0.
$$

The radial compatibility row compares the support-normal force convention with the radial projection:

$$
R_{\mathrm{supp\text{-}rad},i,n}^\nu
=
\mathbf{n}_{i,n}\cdot
\left(
\nu_i^2\mathbf{K}_{i,n}
-
\gamma P_{i,n}^{\perp}F_{i,\mathrm{tot}}^\nu(u_n)
\right)
-
\mathcal{M}_{i,n}^{\mathrm{supp}}.
$$

The radial support block is

$$
R_{\mathrm{slotR}}^\nu
=
\left(
R_{\mathrm{conv}},
R_{R\mathrm{def}},
R_{R\mathrm{gap}},
R_{R\mathrm{spread}},
R_{R\mathrm{der}},
R_{R\mathrm{mix}}
\right).
$$

For the arclength-mean convention,

$$
R_{R\mathrm{def},a}
=
R_a
-
\frac12
\sum_{\sigma=\pm}
\frac{1}{L_{a,\sigma}}
\int_0^{L_{a,\sigma}}
\|\mathbf{Y}_{a,\sigma}(\lambda)-\mathbf{C}\|
d\lambda.
$$

The shell swarm spread row is

$$
R_{R\mathrm{spread}}
=
\max_a
\frac{|R_a-\bar R|}{\bar R}
-
\epsilon_{\mathrm{same}},
\qquad
\bar R=\frac13\sum_aR_a.
$$

Nested shell or transition runs replace this by the corresponding gap and transversality rows. A finite-mode solve may not treat $R_a$ as primitive unless $R_{R\mathrm{def}}=0$ and $R_{R\mathrm{der}}$ supplies first and second derivatives.

### 2.6 Attraction, Repulsion, Polarity, And Live Ledger Rows

The polarity inventory row is

$$
R_{\mathrm{polarity}}
=
\left(
\sum_i\mathbf{1}_{\sigma_i=+1}-3,\,
\sum_i\mathbf{1}_{\sigma_i=-1}-3,\,
\epsilon\sum_i\sigma_i
\right).
$$

For every receiver architrino $i$, the source-site count row is

$$
R_{\mathrm{AR},i}
=
\left(
N_{\mathrm{attr},i}-3,\,
N_{\mathrm{rep},i}-2
\right),
$$

where

$$
N_{\mathrm{attr},i}
=
\#\{j\ne i:\sigma_i\sigma_j=-1\},
\qquad
N_{\mathrm{rep},i}
=
\#\{j\ne i:\sigma_i\sigma_j=+1\}.
$$

The weighted force inventory row reports, but does not replace dynamics closure:

$$
R_{\mathrm{FM},i,n}
=
\left(
\mathbf{T}_{i,n}\cdot(F_{i,\mathrm{attr}}^\nu+F_{i,\mathrm{rep}}^\nu)-\mathbf{T}_{i,n}\cdot F_{i,\mathrm{pc}}^\nu,\,
P_{i,n}^{\perp}(F_{i,\mathrm{attr}}^\nu+F_{i,\mathrm{rep}}^\nu)-P_{i,n}^{\perp}F_{i,\mathrm{pc}}^\nu
\right).
$$

The live ledger provenance row is

$$
R_{\mathrm{src},a}^\nu
=
\mu_a^{\mathrm{out}}
-
\mu_a^{\mathrm{in}}
-
s_a^{\mathrm{sea}\to\mathrm{branch}}
+
s_a^{\mathrm{branch}\to\mathrm{sea}},
$$

with charge, momentum, and angular-momentum ledger rows appended when an event changes branch state.

### 2.7 Event And Self-Hit Exchange Rows

The event row is

$$
R_{\mathrm{event}}^\nu
=
\left(
R_{\nu\mathrm{band\text{-}event}},
R_{H\mathrm{event}},
R_{\mathrm{fold}},
R_{\mathrm{support\text{-}event}},
R_{\mathrm{tail\text{-}event}},
R_{\mathrm{endpoint}},
R_{\mathrm{src}},
R_{\mathbf{p}},
R_{\mathbf{J}},
R_Q
\right).
$$

A simple bounded-speed root fold event has

$$
R_{\mathrm{fold}}
=
\left(
G_\alpha^\nu,\,
J_\alpha^\nu,\,
\partial_{\eta\eta}G_\alpha^\nu-\omega_\alpha
\right),
\qquad
\omega_\alpha\ne0.
$$

If a same-source self-hit window $W=[u_-,u_+]$ is active, the self-hit row is

$$
R_{\mathrm{hit}}^\nu(W)
=
\left(
z(u_-),
z(u_+),
\dot z(u_-)-v_{\mathrm{in}},
\dot z(u_+)+v_{\mathrm{out}},
R_{\mathrm{return}},
R_{\mathrm{overspeed}},
R_{\mathrm{exch,hit}}^\nu,
R_{\mathbf{p},\mathrm{hit}}^\nu,
R_{\mathbf{J},\mathrm{hit}}^\nu,
R_{Q,\mathrm{hit}}^\nu,
R_{\mathrm{src},\mathrm{hit}}^\nu
\right).
$$

The exchange residual is

$$
R_{\mathrm{exch,hit}}^\nu(W)
=
\sum_{i\in I_W}
\left(
\Delta E_{\mathrm{spd},i}^{\nu}
+
\Delta U_{\mathrm{hit},i}^{\nu}
-
\mathcal{W}_{\mathrm{pc},i}^{\nu}
-
\mathcal{W}_{\mathrm{supp},i}^{\nu}
-
\mathcal{W}_{\mathrm{constr},i}^{\nu}
-
\mathcal{W}_{\mathrm{med/event},i}^{\nu}
\right).
$$

The finite branch system cannot hide a self-hit excursion inside a force residual. If $W$ is active, the exchange, endpoint, conservation, and source-provenance rows are part of $\mathcal{B}_M^\nu$.

### 2.8 Action, Noether, And Variational Rows

The scale row is

$$
R_{\gamma}^\nu=\gamma-\Gamma_B^\nu(z_M).
$$

If $\Gamma_B^\nu$ is not action-derived, the row may be replaced by a diagnostic fit row, but the solver status must include `gamma-fitted-not-derived`.

The finite variational Noether row is

$$
R_{\mathrm{VN}}^\nu
=
\left(
R_{\mathrm{period\text{-}mode}},
R_{\nu}^{\mathrm{EL}},
R_{\mathrm{EL\text{-}speed}},
R_{\mathrm{exch}}^\nu,
R_{\mathrm{supp\text{-}work}},
R_{\mathrm{curl}}^\nu
\right),
$$

where

$$
R_{\nu,i}^{\mathrm{EL}}
=
\frac{\delta}{\delta\nu_i}
\left(
\mathcal{S}_{\mathrm{car}}^\nu
+
\mathcal{S}_{\mathrm{hist}}^\nu
+
\mathcal{S}_{\mathrm{speed}}^\nu
+
\mathcal{S}_{\mathrm{root}}^\nu
+
\mathcal{S}_{\mathrm{supp}}^\nu
+
\mathcal{S}_{\mathrm{band/gauge}}^\nu
+
\mathcal{S}_{\mathrm{sea/event}}^\nu
\right)
-
\frac{\Theta_i}{\nu_i^2},
$$

with the winding replacement $-\Theta_i/\nu_i^2\mapsto-m_i\Theta_i/\nu_i^2$.

The speed Euler-Lagrange row is calibrated to the tangential ODE only if

$$
\Pi_{H,i}^{\nu,*}R_{\nu,i}^{\mathrm{EL}}
-
\mathcal{M}_{\nu,i}R_{T,i}^{\nu}
=0.
$$

The finite Noether-current row is

$$
R_{\mathrm{Noeth},\zeta}^\nu
=
\left[
\mathcal{J}_\zeta^\nu
\right]_{0}^{H_*}
+
R_{\zeta,\mathrm{supp}}^\nu
+
R_{\zeta,\mathrm{exch}}^\nu
+
R_{\zeta,\mathrm{sea/event}}^\nu
+
R_{\zeta,\mathrm{boundary}}^\nu,
$$

for each retained symmetry generator $\zeta$ after gauge slicing. Its envelope must satisfy

$$
|R_{\mathrm{Noeth},\zeta}^\nu|
\le
C_{\zeta,Y}\|R_N^\nu\|
+
C_{\zeta,\nu}\|\Pi_H^{\nu,*}R_{\nu}^{\mathrm{EL}}\|
+
C_{\zeta,\eta}\|R_{\mathrm{root}}^\nu\|
+
C_{\zeta,\mathrm{exch}}\|R_{\mathrm{exch}}^\nu\|
+
\epsilon_{\mathrm{tail}}^\nu
+
\epsilon_{\mathrm{disc}}^\nu.
$$

---

## 3. Dimensions, Counting, And Neutral Modes

Let

$$
N_z
=
N_Y+N_L+3+N_\theta+N_\nu+N_H+N_r+N_j+N_s+N_\mu+N_h+N_e+1+N_\Theta+N_p+N_q+N_g.
$$

The row count is

$$
N_R
=
N_{\mathrm{chart}}
+N_{\mathrm{gauge}}
+N_{\mathrm{unit}}
+N_{\nu\mathrm{band}}
+N_H
+N_{\mathrm{root}}
+N_{\mathrm{sheet}}
+N_{\mathrm{tail}}
+N_{\mathrm{force}}
+N_T
+N_N
+N_{\mathrm{support}}
+N_{\mathrm{slotR}}
+N_{\mathrm{inventory}}
+N_{\mathrm{event}}
+N_{\mathrm{hit}}
+N_\gamma
+N_{\mathrm{VN}}
+N_{\mathrm{Noeth}}
+N_{\mathrm{kraw}}.
$$

A concrete run must emit the table:

| Count | Formula | Required interpretation |
| --- | --- | --- |
| unknown dimension | $N_z$ | full finite chart before gauge quotient |
| gauge row dimension | $N_{\mathrm{gauge}}$ | translation, rotation, phase, period-cut, and continuation slices |
| expected neutral dimension | $N_{\mathrm{neut}}$ | infinitesimal symmetries before slicing |
| reduced unknown dimension | $N_z-N_{\mathrm{gauge}}$ | Newton/Krawczyk domain dimension |
| equality residual dimension | $N_R^{=}$ | rows treated as equations |
| inequality/complementarity count | $N_R^{\le}$ | band, support, margin, and event inequalities |
| overdetermined cokernel dimension | $N_{\mathrm{cok}}$ | $N_R^{=}-\operatorname{rank}D\mathcal{B}_M^\nu$ after gauge reduction |
| Schur-eliminated root/support/event dimension | $N_{\mathrm{Schur}}$ | variables eliminated by invertible local blocks |
| certified rank | $\operatorname{rank}D F_M^\nu$ | interval or SVD rank with tolerance |

The neutral-mode quotient is part of the proof object. If $S_\alpha z_M$ are infinitesimal symmetry directions, the gauge matrix

$$
G_{\alpha\beta}
=
D R_{\mathrm{gauge},\alpha}[S_\beta z_M]
$$

must satisfy

$$
\sigma_{\min}(G)\ge g_0>0.
$$

The finite Hessian, monodromy, and Krawczyk rows are computed on the gauge-reduced slice

$$
\mathcal{X}_{M,\mathrm{red}}
=
\ker D R_{\mathrm{gauge}}
\cap
\ker D R_H
$$

in fixed-period mode, or on the period-multiplier extension in period-constrained mode. A missing neutral-mode quotient has status `neutral-mode-quotient-open`.

---

## 4. Krawczyk Block And Full-Stack Embedding

Let $P_{\mathrm{red}}$ be the gauge-reduced projector and let

$$
\widehat F_M^\nu=F_M^\nu\circ P_{\mathrm{red}}.
$$

For an approximate inverse $C_M$ on the selected range, the finite Krawczyk quantities are

$$
Y_M^\nu=\|C_M\widehat F_M^\nu(z_0)\|,
$$

and

$$
Z_M^\nu
=
\sup_{\|h\|\le\rho}
\left\|
I-C_MD\widehat F_M^\nu(z_0+h)
\right\|.
$$

The range row is

$$
R_{\mathrm{kraw,range}}^\nu
=
\left(
Z_M^\nu-1,\,
Y_M^\nu+Z_M^\nu\rho-\rho
\right),
$$

and the chart row is

$$
\rho
\le
\rho_{\mathrm{chart},M}^\nu
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
\rho_{\mathrm{root}}^\nu,
\rho_\eta^\nu,
\rho_J^\nu,
\rho_{\mathrm{gap}}^\nu,
\rho_{\mathrm{tail}}^\nu,
\rho_{\mathrm{sheet}}^\nu,
\rho_{\mathrm{support}}^\nu,
\rho_{\mathrm{slotR}}^\nu,
\rho_{\mathrm{action}}^\nu,
\rho_{\mathrm{event}}^\nu,
\rho_{\mathrm{disc}}
\right\}.
$$

For an overdetermined system, the cokernel row is

$$
\sup_{\|h\|\le\rho}
\left\|
P_{\mathrm{cok}}
\mathcal{B}_M^\nu(z_0+h)
\right\|
+
\epsilon_{\mathrm{tail}}^\nu
+
\epsilon_{\mathrm{disc}}^\nu
\le
\tau_{\mathrm{cok}}.
$$

The finite residual embeds into the full branch stack by exporting

$$
\mathsf{Embed}_M^\nu
=
\left(
z_M,
\mathcal{A}_{\nu}^{\mathrm{full}},
\epsilon_{\mathrm{tail}}^\nu,
\epsilon_{\mathrm{disc}}^\nu,
L_R^{\mathrm{sheet},\nu},
L_R^{\mathrm{action},\nu},
Y_M^\nu,
Z_M^\nu,
\rho_{\mathrm{chart},M}^\nu,
P_{\mathrm{cok}},
E_{\mathrm{Noeth}}^\nu,
E_{\mathrm{event}}^\nu
\right).
$$

This export is the input to finite-mode convergence, master retention, Noether/event handoff, and stability. A single passing finite system is only a local finite-mode candidate. Curve-level promotion requires a refinement sequence $M_k$ with uniform floors and

$$
\epsilon_{\mathrm{disc}}^{\nu}(M_k)\to0,
\qquad
\epsilon_{\mathrm{tail}}^{\nu}(M_k)\to0,
\qquad
\sup_u\|R_T^\nu(M_k,u)\|+\|R_N^\nu(M_k,u)\|\to0,
$$

with stable root labels, radial-support convention, action scale, and event ledger.

---

## 5. Solver Artifact Schema

A finite-mode bounded speed factor solver artifact must emit:

| Field | Required payload |
| --- | --- |
| `solver_space` | `bounded-speed-factor-finite-mode` or `fixed-speed-special-case` |
| `branch_scope` | branch class, source-pair policy, same-source policy, radial-support convention, period/winding convention, endpoint convention, row weights, and truncation $M$ |
| `unknown_vector` | block vector $z_M=(a,\ell,c,\theta,b,\kappa,r,j,s,\mu,h,e,\gamma,\Theta,p,q,g)$ with dimensions |
| `curve_coefficients` | basis, coefficients, arclength rows, length variables, phase variables, center $\mathbf{C}$, and gauge slice |
| `speed_coefficients` | speed basis, $b$, $\nu_-$, $\nu_+$, speed derivative bounds, speed-band margins, and fixed-speed-special-case flag |
| `clock_period` | $\chi_i$, $\Lambda_i$, $H_i$, $H_*$ or $H_{\mathrm{com}}$, clock derivatives, and period residual |
| `root_sheet_rows` | $G_\alpha^\nu$, $\eta_\alpha$, $J_\alpha^\nu$, sign labels, sheet slopes, first variations, second variation envelopes, and root floors |
| `tail_split` | active roots, assimilated tail roots, excluded tail cells, ownership map, terminal predicates, overlap consistency, persistence radius, and $\epsilon_{\mathrm{tail}}^\nu$ |
| `force_rows` | total force convention, partner/cross force, self-hit force, support force, Noether-Sea force, force projections, and force derivative envelopes |
| `dynamics_rows` | $R_T^\nu$, $R_{\mathrm{speedODE}}^\nu$, $R_N^\nu$, normal reconstruction status, and force-balance norms |
| `radial_support_rows` | support descriptor, support multipliers or variational inequality, partition-indexed radii $R_a$, spread/gap rows, derivative rows, and mixing residual |
| `inventory_rows` | polarity count, $3$ attractive / $2$ repulsive source-site row for each architrino, weighted attraction/repulsion force-moment split, and live ledger status |
| `event_rows` | speed-band events, period events, root folds, support-boundary events, tail events, endpoint jumps, conservation ledgers, and source provenance |
| `self_hit_exchange` | absent status or $W=[u_-,u_+]$, return row, overspeed row, energy/potential/work split, endpoint status, conservation rows, and post-hit ledger |
| `variational_noether` | variation mode, period multipliers, $R_{\nu}^{\mathrm{EL}}$, speed-ODE equivalence, exchange residual, support work, action curl, and Noether-current envelope |
| `neutral_modes` | expected symmetry directions, gauge matrix, neutral quotient, removed modes, and residual modes |
| `dimension_table` | all counts from Section 3, certified rank, cokernel dimension, and Schur-eliminated blocks |
| `derivative_matrix` | columns in all active blocks, Schur complements, omitted-column audit, and derivative envelope constants |
| `krawczyk_budget` | $Y_M^\nu$, $Z_M^\nu$, $\rho$, $\rho_{\mathrm{chart},M}^\nu$, range/cokernel rows, and pass/fail status |
| `branch_search_decision` | branch box, margin vector, gauge-reduced interval decision, event-reset status, rejection taxonomy, and first open proof-budget row |
| `full_stack_embedding` | $\mathsf{Embed}_M^\nu$, finite-mode convergence handoff status, master-retention compatibility status, and remaining full-stack errors |
| `status` | first failed status or `bounded-speed-finite-mode-branch-candidate` |

---

## 6. Acceptance, Rejection, And First-Failure Statuses

A finite-mode branch system returns exactly one primary status. If the run intentionally imposes $\nu_i\equiv1$, the primary status is `fixed-speed-special-case`, not a bounded speed factor candidate.

First-failure ordering:

1. `finite-mode-branch-schema-open`
2. `ledger-convention-mismatch`
3. `curve-chart-open`
4. `neutral-mode-quotient-open`
5. `gauge-slice-singular`
6. `unit-arclength-row-open`
7. `speed-band-failure`
8. `clock-period-failure`
9. `bounded-speed-time-map-derivatives-open`
10. `root-equation-open`
11. `root-jacobian-floor-failure`
12. `root-sheet-derivatives-open`
13. `bounded-speed-krawczyk-second-envelope-open`
14. `bounded-speed-tail-cover-incomplete`
15. `tail-force-error-unbounded`
16. `force-ledger-mismatch`
17. `speed-ode-mean-fails`
18. `speed-primitive-band-fails`
19. `speed-clock-length-fails`
20. `tangential-speed-row-open`
21. `normal-equation-open`
22. `radial-support-convention-open`
23. `partition-radius-definition-mismatch`
24. `partition-radius-derivatives-open`
25. `support-radial-compatibility-open`
26. `support-action-work-open`
27. `polarity-inventory-open`
28. `attraction-repulsion-inventory-open`
29. `force-moment-decomposition-open`
30. `event-matching-open`
31. `self-hit-exchange-residual-open`
32. `action-scale-mismatch`
33. `gamma-fitted-not-derived`
34. `period-variation-mode-undeclared`
35. `speed-el-ode-equivalence-open`
36. `bounded-speed-factor-exchange-open`
37. `action-curl-open`
38. `noether-current-open`
39. `derivative-block-stale`
40. `coupled-cokernel-open`
41. `coupled-krawczyk-open`
42. `finite-mode-convergence-open`
43. `bounded-speed-finite-mode-branch-candidate`

Acceptance as a finite-mode bounded speed factor branch candidate requires:

$$
\mathcal{B}_M^\nu(z_M)=0
\quad
\text{within declared row tolerances},
$$

all inequality margins positive on the coefficient box,

$$
Z_M^\nu<1,
\qquad
Y_M^\nu+Z_M^\nu\rho<\rho,
\qquad
\rho\le\rho_{\mathrm{chart},M}^\nu,
$$

and the Noether/event/cokernel envelope

$$
E_{\mathrm{Noeth}}^\nu
+
E_{\mathrm{event}}^\nu
+
\left\|
P_{\mathrm{cok}}\mathcal{B}_M^\nu
\right\|
+
\epsilon_{\mathrm{tail}}^\nu
+
\epsilon_{\mathrm{disc}}^\nu
\le
\tau_M.
$$

Rejection as a model obstruction requires more than a failed finite run. The solver may report `bounded-speed-finite-mode-obstruction` only if higher-mode columns, chart changes, tail assimilation, radial-support convention changes, and antipodal relaxation columns have certified range/cokernel tests showing that the failed row is not a truncation artifact. Otherwise the status remains the first failed row above.

---

## 7. Theorem Target

**Theorem target: bounded speed factor finite-mode branch system.** Fix one bounded-speed shell swarm branch class, one finite-mode chart $M$, one radial-support convention, one source-pair policy, one same-source policy, one period/winding convention, one action/event convention, one polarity/live ledger, and one row-weight convention. Suppose:

1. $z_M$ declares every active curve, bounded speed factor, root, support, phase, period, polarity, event, action, Noether, and gauge variable used by the residual;
2. the gauge matrix is transverse to the neutral symmetry directions and all finite chart floors persist on a coefficient box;
3. active and assimilated causal root sheets satisfy $G^\nu=0$, positive delay floors, fixed Jacobian-sign floors, first derivative rows, and second derivative envelopes;
4. excluded tail cells form a complete owned finite cover or the assimilated tail sheets are included in the same force and derivative rows;
5. the speed ODE, normal force-balance, radial support, attraction/repulsion inventory, event/self-hit exchange, and variational Noether rows use the same total force convention;
6. the derivative matrix includes all active curve, speed, clock, root, force, support, event, action, scale, polarity, and gauge columns, or includes certified Schur complements for eliminated variables;
7. the finite Krawczyk and cokernel inequalities pass on the gauge-reduced chart.

Then the artifact is a local finite-mode bounded speed factor branch candidate on that live ledger. It may feed the bounded-speed coupled fixed-point, finite-mode convergence, Noether/event, stability, and master-retention packets through $\mathsf{Embed}_M^\nu$.

It is not a retained architrino branch until a refinement sequence or direct curve-level certificate removes truncation and tail errors and the master retention theorem passes on the same ledger.

Proof route:

1. positive speed-band margins make $\chi_i$ invertible and define common causal-time roots;
2. root and Jacobian floors apply the implicit-function theorem to active and assimilated causal root sheets;
3. first and second root variations propagate finite coefficient changes into force, action, Noether, and Krawczyk derivative envelopes;
4. the tangential row stores admissible tangent work in bounded speed factor evolution instead of forcing pointwise tangent force to vanish;
5. the normal row gives curvature force balance with the $\nu_i^2$ factor required by center-time dynamics;
6. radial support rows convert visual shell swarm or transition claims into differentiable residuals;
7. inventory rows separate the structural $3$ attractive / $2$ repulsive source-site count from weighted force closure;
8. self-hit and event rows prevent speed, source provenance, charge, momentum, angular momentum, or Noether-Sea exchange from being hidden in the force residual;
9. the variational Noether rows decide whether the speed ODE and support work are action-derived rather than fitted diagnostics;
10. the gauge-reduced Krawczyk row supplies the local finite-mode existence certificate, while the full-stack embedding records the remaining continuum obligations.

---

## 8. Current Status And Promotion Decision

Current first-failure statuses for the bounded speed factor finite-mode branch system are:

$$
\texttt{finite-mode-branch-schema-open},
\qquad
\texttt{bounded-speed-tail-cover-incomplete},
\qquad
\texttt{bounded-speed-krawczyk-second-envelope-open},
\qquad
\texttt{force-moment-decomposition-open},
\qquad
\texttt{bounded-speed-factor-variational-noether-open},
\qquad
\texttt{self-hit-exchange-residual-open},
\qquad
\texttt{finite-mode-convergence-open},
\qquad
\texttt{not-retained}.
$$

Promotion decision: `priority-only`. The packet is mathematically concrete enough to guide an executable solver artifact, but it is not ready for `content/markdown/aaa` because no finite-mode bounded speed factor run has emitted the full unknown vector, residual, derivative matrix, tail split, Noether/event rows, Krawczyk proof budget, and refinement handoff on one live ledger.
