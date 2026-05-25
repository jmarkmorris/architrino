# Bounded Speed Factor Symmetry Gauge Reduction

Promotion status: `priority-only`. This packet develops the symmetry quotient, gauge slice, neutral projection, and block decomposition needed by the bounded speed factor branch search. It refines [symmetry-block-decomposition-theorem.md](symmetry-block-decomposition-theorem.md), [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md), [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md), [unit-speed-chart-reparameterization.md](unit-speed-chart-reparameterization.md), [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md), [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md), and [finite-mode-branch-convergence-theorem.md](finite-mode-branch-convergence-theorem.md).

The packet is local to one bounded speed factor finite-mode chart, one causal root sheet ledger, one support descriptor, one period or winding convention, one event convention, one live ledger, one row-weight convention, and one declared symmetry group. It does not retain a branch.

---

## 1. Augmented Branch Coordinates

Use site labels

$$
i=(a,\sigma),
\qquad
a\in\mathbb{Z}_3,
\qquad
\sigma\in\{+,-\}.
$$

A bounded speed factor live-ledger chart is

$$
z=
\left(
Y,\nu,\eta,\zeta,C,\rho,H,\Gamma,s,e,\ell
\right),
$$

where:

| Symbol | Role |
| --- | --- |
| $Y_i$ | arclength curve for architrino $i$ |
| $\nu_i$ | positive bounded speed factor |
| $\eta_r$ | causal root sheet for live root label $r=(i,j,\alpha)$ |
| $\zeta_r$ | fixed Jacobian-sign label |
| $C$ | branch center in the center-gauge chart |
| $\rho$ | support radius, support band, or free-support radius function |
| $H$ | physical period or common winding period |
| $\Gamma$ | action-derived or diagnostic dynamics scale |
| $s$ | support variables, including multipliers when active |
| $e$ | event variables, endpoint data, self-hit windows, and exchange rows |
| $\ell$ | finite-mode length or scale coordinate when the chart keeps one |

The causal-time maps are

$$
\chi_i(\lambda)
=
\int_0^\lambda \frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i(u)=\chi_i^{-1}(u),
\qquad
H_i=\chi_i(L_i).
$$

The coupled bounded speed factor residual is

$$
\mathcal{R}_{\mathrm{cpl}}^\nu(z)
=
\left(
\mathcal{R}_S,\mathcal{R}_N,\mathcal{R}_R,
\mathcal{R}_A,\mathcal{R}_E
\right),
$$

with the row groups of [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md). Gauge rows are written separately as

$$
\mathcal{G}(z)=0.
$$

They select one representative of a symmetry orbit. They are not dynamics, action, Noether sea, support, self-hit, or event residuals.

---

## 2. Declared Group Actions

Let the continuous declared group be

$$
\mathsf{G}_{\mathrm{cont}}
=
\mathbb{R}^3_{\mathrm{trans}}
\times
SO(3)_{\mathrm{rot}}
\times
S^1_{\mathrm{phase}}
\times
\mathbb{R}_{+,\mathrm{scale}},
$$

with only the factors actually free in the branch chart included. The discrete part is

$$
\mathsf{G}_{\mathrm{disc}}
\subset
\left(
S_3^{\mathrm{bin}}
\times
\mathbb{Z}_2^{\mathrm{pair}}
\times
\mathsf{Perm}(\mathcal{A}_{\nu})
\right),
$$

where $\mathsf{Perm}(\mathcal{A}_{\nu})$ is restricted to live-root relabelings that preserve receiver site, source site, root-sign stratum, same-source policy, delay order, event windows, and ledger provenance. The full declared group is

$$
\mathsf{G}
=
\mathsf{G}_{\mathrm{cont}}
\rtimes
\mathsf{G}_{\mathrm{disc}}.
$$

### 2.1 Translation

For $q\in\mathbb{R}^3$,

$$
(\tau_qY)_i(\lambda)=Y_i(\lambda)+q,
\qquad
\tau_q C=C+q.
$$

The quantities

$$
\nu_i,\quad
\chi_i,\quad
\Lambda_i,\quad
H_i,\quad
\eta_r,\quad
\zeta_r
$$

are unchanged. Support radii are invariant because

$$
\|(\tau_qY)_i-(\tau_qC)\|=\|Y_i-C\|.
$$

Event times, self-hit durations, causal root sheet delays, and scalar live ledger rows are unchanged. Vector ledger rows such as momentum position moments translate by their declared tensor rule; the invariant residuals must be expressed in center-gauge variables before certification.

### 2.2 Rotation

For $Q\in SO(3)$,

$$
(QY)_i(\lambda)=QY_i(\lambda),
\qquad
QC=Q C,
$$

and

$$
T_i\mapsto QT_i,
\qquad
K_i\mapsto QK_i,
\qquad
\widetilde F_i^\nu\mapsto Q\widetilde F_i^\nu.
$$

The speed factors, clocks, periods, delays, root signs, support radii, and scalar event variables are unchanged. The normal row is equivariant:

$$
\nu_i^2K_i-\Gamma P_i^\perp \widetilde F_i^\nu
\mapsto
Q\left(
\nu_i^2K_i-\Gamma P_i^\perp \widetilde F_i^\nu
\right).
$$

The speed row is invariant:

$$
\nu_i\nu_i'
-\Gamma T_i\cdot\widetilde F_i^\nu
\mapsto
\nu_i\nu_i'
-\Gamma T_i\cdot\widetilde F_i^\nu.
$$

Angular-momentum and Noether-current ledger variables rotate in their tensor representation. The certificate must store whether the row uses invariant norms or full equivariant vector components.

### 2.3 Common Phase

For a common phase $\varphi\in S^1$, write

$$
\Delta_\lambda(\varphi)=\frac{\varphi}{2\pi}L_i
$$

when all sites have the same arclength period. In the equal physical-period bounded speed factor chart, the cleaner action is the common causal-time shift

$$
u\mapsto u+\Delta_u(\varphi),
\qquad
\Delta_u(\varphi)=\frac{\varphi}{2\pi}H_*.
$$

Then

$$
(\theta_\varphi Y)_i(u)=Y_i(\Lambda_i(u+\Delta_u)),
\qquad
(\theta_\varphi \nu)_i(u)=\nu_i(\Lambda_i(u+\Delta_u)).
$$

For a live root sheet,

$$
(\theta_\varphi\eta)_r(u)
=
\eta_r(u+\Delta_u).
$$

Event variables shift by the same common causal-time origin:

$$
u_e\mapsto u_e-\Delta_u
\quad
\text{mod }H_*.
$$

Relative phase offsets, winding integers, self-hit dwell times, and source provenance are not gauge unless the branch packet explicitly declares them as common-origin data.

### 2.4 Scale And Period

For $\kappa>0$, the homogeneous scale action is

$$
Y_i(\lambda)\mapsto
\kappa Y_i(\lambda/\kappa),
\qquad
L_i\mapsto \kappa L_i,
\qquad
\eta_r(u)\mapsto\kappa\eta_r(u/\kappa),
$$

with

$$
C\mapsto\kappa C,
\qquad
\rho\mapsto\kappa\rho,
\qquad
H_i\mapsto\kappa H_i,
\qquad
\Gamma\mapsto\kappa\Gamma,
$$

and

$$
\nu_i(\lambda)\mapsto\nu_i(\lambda/\kappa).
$$

This action preserves the root equation because both distance and delay scale by $\kappa$. It also preserves the bounded speed factor dynamics rows:

$$
\nu\nu'\mapsto\kappa^{-1}\nu\nu',
\qquad
K\mapsto\kappa^{-1}K,
\qquad
\widetilde F^\nu\mapsto\kappa^{-2}\widetilde F^\nu,
\qquad
\Gamma\mapsto\kappa\Gamma.
$$

If $R_*$, $H_*$, or an action-derived physical scale is fixed by the packet, this is no longer a gauge freedom. It becomes a period/scale residual row.

### 2.5 Binary And Pair Actions

For $\pi\in S_3^{\mathrm{bin}}$,

$$
(\pi Y)_{a,\sigma}=Y_{\pi^{-1}a,\sigma},
\qquad
(\pi\nu)_{a,\sigma}=\nu_{\pi^{-1}a,\sigma},
$$

and every root label transforms as

$$
\pi(i,j,\alpha)
=
(\pi i,\pi j,\alpha).
$$

The pair involution is

$$
\iota(a,\sigma)=(a,-\sigma).
$$

The exact-antipodal action on curves is

$$
(\mathcal{A}Y)_{a,\sigma}=-Y_{a,-\sigma},
$$

and the speed factor action is

$$
(\mathcal{A}\nu)_{a,\sigma}=\nu_{a,-\sigma}.
$$

The exact-antipodal fixed subspace is therefore

$$
Y_{a,-}=-Y_{a,+},
\qquad
\nu_{a,-}=\nu_{a,+}.
$$

Relaxed-antipodal branches use

$$
Y_{a,\sigma}=m_a+\sigma r_a,
\qquad
\nu_{a,\sigma}=\nu_a^E+\sigma\nu_a^O.
$$

The exact chart sets $m_a=0$ and $\nu_a^O=0$. A relaxed chart opens $m_a$ and may open $\nu_a^O$ only if the clock, root, action, and event rows are recomputed on the live ledger.

### 2.6 Live-Root Labeling

For a root relabeling $\pi_{\mathcal A}$,

$$
(\pi_{\mathcal A}\eta)_r=\eta_{\pi_{\mathcal A}^{-1}r},
\qquad
(\pi_{\mathcal A}\zeta)_r=\zeta_{\pi_{\mathcal A}^{-1}r}.
$$

The force sum is invariant only when $\pi_{\mathcal A}$ preserves source identity, polarity product, same-source status, event-window identity, self-hit status, and support-tail owner. A permutation that changes any of these is not gauge. It is a live ledger change.

---

## 3. Gauge Slice Equations

Let $z_0$ be the base branch point and let $\langle\cdot,\cdot\rangle_W$ be the weighted finite-mode inner product on all active curve, speed, root, support, period, event, and ledger variables. Let $v_\xi(z_0)$ denote the infinitesimal generator for a continuous symmetry $\xi$.

### 3.1 Translation Slice

The default center gauge is

$$
\mathcal{G}_{\mathrm{trans}}(z)
=
\sum_i w_i\frac{1}{L_i}\int_0^{L_i}
\left(Y_i(\lambda)-C\right)d\lambda
=0,
$$

with $\sum_iw_i=1$. In a synchronized exact-antipodal or relaxed-antipodal chart, the stronger mode-by-mode row may be used:

$$
\sum_{a,\sigma}Y_{a,\sigma}(\lambda)=0
\qquad
\text{for every collocation node}.
$$

For relaxed antipodality this becomes

$$
\sum_{a=0}^{2}m_a(\lambda)=0,
\qquad
\sum_{a=0}^{2}m_a'(\lambda)=0,
\qquad
\sum_{a=0}^{2}m_a''(\lambda)=0.
$$

### 3.2 Rotation Slice

Choose three infinitesimal rotations $\Omega_\ell\in\mathfrak{so}(3)$. The rotation slice is

$$
\mathcal{G}_{\mathrm{rot},\ell}(z)
=
\sum_i\frac{1}{L_i}\int_0^{L_i}
\left(Y_i-Y_{0,i}\right)\cdot
\Omega_\ell\left(Y_{0,i}-C_0\right)
d\lambda
=0,
\qquad
\ell=1,2,3.
$$

Rows whose generator vector is dependent because the base point has an isotropy are dropped. The certificate must report the retained rotation-slice rank

$$
r_{\mathrm{rot}}
=
\operatorname{rank}
\left[
D\mathcal{G}_{\mathrm{rot}}v_{\Omega_1}\,
D\mathcal{G}_{\mathrm{rot}}v_{\Omega_2}\,
D\mathcal{G}_{\mathrm{rot}}v_{\Omega_3}
\right].
$$

### 3.3 Phase Slice

Let

$$
v_\phi
=
\left(
\partial_uY_i,\partial_u\nu_i,\partial_u\eta_r,
0,0,\partial_u e
\right)
$$

be the common causal-time phase generator. The phase row is

$$
\mathcal{G}_{\mathrm{phase}}(z)
=
\left\langle z-z_0,v_\phi(z_0)\right\rangle_W
=0.
$$

In a Fourier coefficient implementation this may be replaced by one nondegenerate coefficient pin, but the certificate must emit the equivalent value of

$$
D\mathcal{G}_{\mathrm{phase}}\,v_\phi\ne0.
$$

### 3.4 Scale And Period Slice

If scale is gauge, use the generator

$$
v_{\mathrm{sc}}
=
\left(
Y-\lambda Y',
0,
\eta-u\eta',
C,\rho,H,\Gamma,s_{\mathrm{sc}},e_{\mathrm{sc}},\ell
\right)
$$

and impose

$$
\mathcal{G}_{\mathrm{scale}}(z)
=
\left\langle z-z_0,v_{\mathrm{sc}}(z_0)\right\rangle_W
=0.
$$

If the physical period is fixed, replace the scale gauge by the period row

$$
\mathcal{R}_{H,i}=H_i-H_*=0
$$

or by the winding row

$$
m_iH_i-H_{\mathrm{com}}=0.
$$

The chart must not impose both a free scale quotient and an independent fixed physical period unless one row is declared redundant and removed from the rank audit.

### 3.5 Live-Root Label Slice

Live-root labels are discrete, so their slice is an ordering and provenance convention rather than a linear row. For each ordered source pair and event window, require

$$
\eta_{(i,j,k)}(u_*)<
\eta_{(i,j,k+1)}(u_*),
$$

with fixed

$$
\zeta_{(i,j,k)}J_{(i,j,k)}^\nu(u)\ge J_0>0.
$$

The label map

$$
r\mapsto(i(r),j(r),k(r),\zeta_r,\mathrm{event}(r),\mathrm{tailOwner}(r))
$$

is part of the gauge slice. If two live roots cross in this ordering, the branch exits the current chart with a root event or relabel status. It is not a Newton failure inside the same chart.

---

## 4. Neutral-Mode Projection And Bordered Jacobian

Let

$$
U=
\begin{bmatrix}
v_{\xi_1}&\cdots&v_{\xi_g}
\end{bmatrix}
$$

be the matrix of declared continuous neutral generators that preserve the live ledger. Let

$$
B=D\mathcal{G}(z_0)
$$

be the gauge-row derivative. The gauge slice is usable only when

$$
\operatorname{rank}(BU)=g.
$$

With the domain weight $W_X$, the neutral projector is

$$
P_{\mathcal{G}}
=
U\left(U^*W_XU\right)^{-1}U^*W_X,
\qquad
\Pi_{\mathrm{ng}}=I-P_{\mathcal{G}}.
$$

This projector removes pure gauge variations only. Branch-family tangents and physical Noether neutral modes are not removed unless their rows are explicitly declared as quotient directions.

Let

$$
A=D\mathcal{R}_{\mathrm{cpl}}^\nu(z_0)
$$

and let $N_G$ be a basis of

$$
\ker B.
$$

The gauge-reduced derivative used by range, cokernel, and block tests is

$$
A_G
=
P_E A N_G,
$$

where $P_E$ is the residual-space projector that removes only duplicated invariant rows and applies row weights. Equivalently, the Newton correction can use the augmented least-squares KKT system

$$
\begin{bmatrix}
A^*W_EA & B^*\\
B & 0
\end{bmatrix}
\begin{bmatrix}
\delta z\\
\lambda_G
\end{bmatrix}
=
-
\begin{bmatrix}
A^*W_E\mathcal{R}_{\mathrm{cpl}}^\nu\\
\mathcal{G}
\end{bmatrix}.
$$

For a square quotient certificate, the bordered derivative is the augmented row matrix

$$
\mathcal{J}_{\mathrm{aug}}
=
\begin{bmatrix}
P_EA\\
B
\end{bmatrix}.
$$

It is valid only if

$$
\ker(P_EA)=\operatorname{span}U
\qquad
\text{and}
\qquad
\operatorname{rank}(BU)=g.
$$

If root sheets are Schur-eliminated, the same construction is applied after

$$
\delta r
=
-R_{R,r}^{-1}
\left(
R_R+R_{R,a}\delta a+R_{R,b}\delta b
+R_{R,s}\delta s+R_{R,\gamma}\delta\gamma+R_{R,e}\delta e
\right),
$$

and the Schur-corrected derivative must still include the gauge columns induced through $r(a,b,s,\gamma,e)$.

---

## 5. Block Decomposition By Branch Sector

Let

$$
C(a,\sigma)=(a+1,\sigma),
\qquad
\omega=e^{2\pi i/3},
$$

and

$$
P_k=\frac{1}{3}\sum_{\ell=0}^{2}\omega^{-k\ell}C^\ell,
\qquad
k=0,1,2.
$$

Pair projectors are

$$
E_{\mathrm{pair}}Q_{a,\sigma}
=
\frac12(Q_{a,\sigma}+Q_{a,-\sigma}),
\qquad
O_{\mathrm{pair}}Q_{a,\sigma}
=
\frac12(Q_{a,\sigma}-Q_{a,-\sigma}).
$$

### 5.1 Exact-Antipodal $M=3$

The exact-antipodal bounded speed factor chart is

$$
Y\in O_{\mathrm{pair}}X_Y,
\qquad
\nu\in E_{\mathrm{pair}}X_\nu,
\qquad
\eta_{\iota r}=\eta_r,
\qquad
\rho_{\iota i}=\rho_i,
\qquad
H_{\iota i}=H_i.
$$

The row sectors are

$$
\mathcal{R}_{\parallel}^\nu\in E_{\mathrm{pair}}\mathcal{E}_{\parallel},
\qquad
\mathcal{R}_{\perp}^\nu\in O_{\mathrm{pair}}\mathcal{E}_{\perp},
$$

and

$$
\mathcal{R}_{H},
\mathcal{R}_{\nu\mathrm{band}},
\mathcal{R}_{\mathrm{support\text{-}rad}},
\mathcal{R}_{\mathrm{root}},
\mathcal{R}_{\mathrm{root\text{-}persist}}
\in
E_{\mathrm{pair}}\mathcal{E}
$$

after paired labels are identified. Action, event, self-hit, and Noether sea exchange rows must declare their pair sector because endpoint exchange can be pair-even, pair-odd, or mixed depending on the event convention.

If every row is also $C_3$-equivariant, then

$$
P_\ell^\mathcal{E}A_GP_k^X=0
\qquad
\text{for }k\ne\ell
$$

up to the emitted block leakage. The $k=0$ pair-even speed block contains common period, common scale, and speed-mean rows. The $k=1,2$ standard block contains binary-asymmetric speed and geometry corrections. Pair-midpoint columns are absent in exact antipodality.

### 5.2 Relaxed-Antipodal

Use

$$
Y_{a,\sigma}=m_a+\sigma r_a,
\qquad
\nu_{a,\sigma}=\nu_a^E+\sigma\nu_a^O.
$$

Then

$$
m\in E_{\mathrm{pair}}X_Y,
\qquad
r\in O_{\mathrm{pair}}X_Y,
\qquad
\nu^E\in E_{\mathrm{pair}}X_\nu,
\qquad
\nu^O\in O_{\mathrm{pair}}X_\nu.
$$

The center gauge removes the binary-uniform midpoint block:

$$
P_0m=0.
$$

Consequently the useful internal midpoint relaxation lies in

$$
P_1m\oplus P_2m.
$$

The pair-even normal row can now receive direct midpoint curvature:

$$
E_{\mathrm{pair}}\mathcal{R}_{\perp}^\nu
\supset
\nu_E^2m''
-\Gamma E_{\mathrm{pair}}
\left(P^\perp\widetilde F^\nu\right),
$$

while the pair-odd row keeps the half-separation curvature. Pair-odd speed $\nu^O$ is not a harmless relaxation: it changes

$$
\chi_{a,+}-\chi_{a,-},
\qquad
\Lambda_{a,+}-\Lambda_{a,-},
\qquad
G_{\iota r}^\nu-G_r^\nu,
$$

at first order. Thus a relaxed-antipodal certificate must report the block leakage from $\nu^O$ into root, action, period, and event rows before claiming a pair-even obstruction has been repaired.

### 5.3 Free-Support Bounded-Speed

A free-support branch has no exact pair constraint unless declared. The default domain is the full site space

$$
X=
X_Y\oplus X_\nu\oplus X_\rho\oplus X_s\oplus X_\eta\oplus X_e.
$$

If the support descriptor and live ledger are $C_3$ or $S_3$ equivariant, decompose only by the binary representation:

$$
X=X_{k=0}\oplus X_{\mathrm{std}},
\qquad
X_{\mathrm{std}}=X_{k=1}\oplus X_{k=2}
$$

over complex coordinates, or as the real two-dimensional standard representation. Pair-even and pair-odd projections may still be emitted as diagnostics, but they are not block-protection claims unless the support, root, event, and action rows are closed under $\iota$.

For free support, support-radius variables transform as scalar site rows:

$$
\rho_i(u)=\|Y_i(\Lambda_i(u))-C\|,
\qquad
\rho_i\mapsto\rho_{\pi^{-1}i}
$$

under site permutations, and remain invariant under translation and rotation. Support multipliers transform in the same site representation as their active support-band side. The support-radial row belongs to the same binary block as $\rho_i$.

---

## 6. Invariant Residual Rows In The Finite-Mode System

The finite-mode branch system is

$$
\mathcal{H}_{\nu}(z)
=
\begin{bmatrix}
W_E^{1/2}\mathcal{R}_{\mathrm{cpl}}^\nu(z)\\
W_G^{1/2}\mathcal{G}(z)
\end{bmatrix}
=0,
$$

with inequality certificates appended as first-failure rows:

$$
\mathcal{I}_{\nu}(z)\ge0.
$$

The rows

$$
\mathcal{R}_{\nu\mathrm{band}},
\mathcal{R}_{H},
\mathcal{R}_{\mathrm{root\text{-}persist}},
\mathcal{R}_{\mathrm{support\text{-}band}},
\mathcal{R}_{\mathrm{event}},
\mathcal{R}_{\mathrm{exch}},
\mathcal{R}_{\mathrm{Noeth}}
$$

are invariant or equivariant under $\mathsf{G}$ only when they use the transformed curve, speed, causal root sheet, support-radius, period, event, and live ledger variables from the same group action. A row evaluated on frozen roots or frozen support data is not an invariant row of the bounded speed factor branch system.

Gauge rows enter the finite-mode matrix through $D\mathcal{G}$ and the bordered rank test, but they are excluded from physical obstruction norms. Thus the cokernel obstruction is computed from

$$
c_0
=
P_{\mathrm{cok}}^E
W_E^{1/2}\mathcal{R}_{\mathrm{cpl}}^\nu(z_0),
$$

not from the augmented vector including $\mathcal{G}$. The augmented vector is used for Newton, Krawczyk range, and representative uniqueness.

---

## 7. Gauge-Slice Equivalence Theorem

**Theorem target: bounded speed factor symmetry gauge reduction.** Fix one bounded speed factor finite-mode chart with live causal root sheet labels, support descriptor, period convention, event convention, row weights, and declared symmetry group $\mathsf{G}$. Suppose:

1. $\mathsf{G}$ acts $C^1$ on the branch chart and preserves the live ledger stratum, including delay order, Jacobian signs, support-tail owners, self-hit windows, event variables, and source provenance;
2. the coupled residual is equivariant,

$$
\mathcal{R}_{\mathrm{cpl}}^\nu(gz)
=
\rho_E(g)\mathcal{R}_{\mathrm{cpl}}^\nu(z),
$$

with $\rho_E(g)$ orthogonal for the residual weights;
3. the gauge rows satisfy $\mathcal{G}(z_0)=0$ and the slice matrix is nonsingular,

$$
\operatorname{rank}D\mathcal{G}(z_0)U
=
\dim\mathsf{G}_{\mathrm{cont}};
$$

4. discrete root-label gauges are fixed by strict delay ordering, fixed sign labels, and fixed provenance;
5. the chart has no undeclared isotropy except the discrete symmetries explicitly retained as block symmetries.

Then in a neighborhood of $z_0$, every root of

$$
\mathcal{R}_{\mathrm{cpl}}^\nu(z)=0
$$

modulo $\mathsf{G}$ has a unique representative satisfying

$$
\mathcal{G}(z)=0
$$

and the live-root label slice. Conversely, every zero of

$$
\mathcal{H}_{\nu}(z)=0
$$

represents one symmetry orbit of bounded speed factor branch roots.

Moreover, the quotient derivative is invertible exactly when the augmented derivative has full rank:

$$
D\mathcal{R}_{\mathrm{cpl}}^\nu:
T_{z_0}X/\operatorname{span}U
\to
T_0E
$$

is an isomorphism onto the gauge-reduced range if and only if

$$
\mathcal{J}_{\mathrm{aug}}
=
\begin{bmatrix}
P_E D\mathcal{R}_{\mathrm{cpl}}^\nu\\
D\mathcal{G}
\end{bmatrix}
$$

has full column rank after duplicated invariant rows and declared physical Noether neutral modes are removed.

Proof route:

1. use equivariance to show that a group translate of a root is again a root on the transformed live ledger;
2. apply the finite-dimensional slice theorem to the continuous generators using $\operatorname{rank}D\mathcal{G}U=g$;
3. use strict root-order and provenance inequalities to remove local live-root relabeling degeneracy;
4. identify the tangent quotient with $\ker D\mathcal{G}$;
5. compare the kernel of the augmented derivative with the kernel of the quotient derivative;
6. apply the block projectors only after verifying row-wise equivariance and block leakage bounds.

---

## 8. Certificate Schema

A bounded speed factor branch search using this reduction must emit:

| Field | Required content |
| --- | --- |
| `declared_group` | translation, rotation, phase, scale/period, binary, pair, and live-root relabeling factors actually treated as symmetries |
| `group_actions` | action on $Y$, $\nu$, $\eta$, $\zeta$, support radius, $H$, event variables, and live ledger variables |
| `gauge_rows` | translation, rotation, phase, scale/period, and root-label slice equations or inequalities |
| `generator_matrix` | $U$, generator names, removed duplicate generators, and branch variables each generator moves |
| `slice_rank` | $\operatorname{rank}D\mathcal{G}U$, singular values, tolerance, and first missing generator |
| `neutral_projection` | $P_{\mathcal G}$, $\Pi_{\mathrm{ng}}$, weights, and whether branch-family or physical Noether modes were kept |
| `bordered_jacobian` | $\mathcal{J}_{\mathrm{aug}}$ or KKT matrix, Schur corrections, rank, and condition estimate |
| `root_label_slice` | delay ordering node, sign labels, provenance labels, self-hit/event labels, and strict margins |
| `block_projectors` | $P_k$, $E_{\mathrm{pair}}$, $O_{\mathrm{pair}}$, $S_3$ standard/trivial projectors when declared |
| `row_block_map` | pair and binary block of speed, normal, root, support, action, Noether sea, self-hit, and event rows |
| `block_leakage` | $\delta_A$, $\delta_{\mathrm{off}}$, and row-wise equivariance defects |
| `gauge_residuals` | numeric values of every gauge row after solve and after retraction |
| `physical_residuals` | residual norms excluding gauge rows |
| `cokernel_after_gauge` | $P_{\mathrm{cok}}^E$, block cokernel components, and obstruction margins |
| `status` | first failing status or `bounded-speed-gauge-reduced-branch-candidate` |

Gauge pass criteria are

$$
\|\mathcal{G}(z)\|\le\tau_G,
\qquad
\sigma_{\min}(D\mathcal{G}U)\ge\sigma_G,
\qquad
\operatorname{rank}\mathcal{J}_{\mathrm{aug}}=n_{\mathrm{quot}},
$$

and

$$
\delta_A+\delta_{\mathrm{off}}
\le
\tau_{\mathrm{block}}
$$

for every block decision.

Failure/status codes:

$$
\texttt{bounded-speed-symmetry-gauge-reduction-open},
\qquad
\texttt{symmetry-action-ledger-mismatch},
\qquad
\texttt{gauge-row-rank-defect},
$$

$$
\texttt{rotation-slice-isotropy-undeclared},
\qquad
\texttt{phase-slice-singular},
\qquad
\texttt{scale-period-row-conflict},
$$

$$
\texttt{live-root-label-slice-failed},
\qquad
\texttt{root-relabel-event-reached},
\qquad
\texttt{neutral-projection-singular},
$$

$$
\texttt{bordered-jacobian-rank-defect},
\qquad
\texttt{gauge-row-in-physical-cokernel},
\qquad
\texttt{binary-fourier-block-leakage},
$$

$$
\texttt{pair-sector-ledger-mismatch},
\qquad
\texttt{bounded-speed-free-support-block-open},
\qquad
\texttt{bounded-speed-gauge-reduced-branch-candidate}.
$$

Current first-failure statuses:

$$
\texttt{bounded-speed-symmetry-gauge-reduction-open},
\qquad
\texttt{bounded-speed-coupled-fixed-point-open},
\qquad
\texttt{bounded-speed-root-sheet-open},
$$

$$
\texttt{bounded-speed-tail-cover-incomplete},
\qquad
\texttt{bounded-speed-action-row-open},
\qquad
\texttt{bounded-speed-stability-ledger-open},
\qquad
\texttt{not-retained}.
$$

Promotion decision: `priority-only`. The packet is a concrete proof target and certificate specification for the bounded speed factor branch search, but it should not be promoted into `content/markdown/aaa` until at least one executable bounded speed factor solve emits the group actions, gauge residuals, slice rank, bordered Jacobian rank, block leakage, and live-root label status on a single live ledger.
