# A functional neighborhood of the fast-height exclusion

## Conditional result

Claim grade: derived subject, conditional on independent acceptance of the complete finite fast-height cover. This argument converts that finite parameter cover into an exclusion for sufficiently small smooth perturbations of its complete histories. The perturbations may be aperiodic and may alter radius, phase and height within the selected six-member class. The existence of a neighborhood is proved; no numerical neighborhood radius is asserted.

Use $K=c_f=1$, all ordinary positive-delay self and partner roots and absolute source divisors. The normalized reference histories are

$$
x_j^\lambda(\tau)=
\left(\cos(\beta\tau+j\pi/3),\sin(\beta\tau+j\pi/3),(-1)^jHf(\kappa\tau)\right),
\qquad f(\phi)=\cos\phi-\frac18\sin3\phi,
$$

where $\lambda=(\beta,H,\kappa)$ lies in the closed domain

$$
\beta\in[182643/100000,182644/100000],\quad
H\in[49/1000,51/1000]\cup[99/1000,101/1000],\quad
\kappa\in[8,32].
$$

The [complete-cover subject](overnight2-b-fast-height-final-phase.md) assigns each fixed parameter cell a deciding phase $\theta\in\{0,\pi/2,\pi/4\}$ and a reception $\tau_\theta=\theta/\kappa$. At that reception it supplies a complete ordinary eight-root census and a strictly nonzero radial/axial determinant. Earlier portions have separate independent acceptance; the last eighteen cells and their combined inventory remain pending independent review when this subject is written.

There exist constants $\eta_0>0$ and $\epsilon_0>0$, uniform over the declared parameter domain, with the following property. For each reference parameter triple, select any covering cell and its certified deciding phase. Let $y_j$ be complete $C^2$ normalized paths in the existing common-radius/common-phase/alternating-height class. If

$$
\sup_{\tau\le\tau_\theta}\max_{j=0,\ldots,5}
\left\{
|y_j-x_j^\lambda|,
|\dot y_j-\dot x_j^\lambda|,
|\ddot y_j-\ddot x_j^\lambda|
\right\}\le\eta_0,
$$

then the perturbed positive-delay census at $\tau_\theta$ is complete and ordinary, and for every proposed scale $R>0$,

$$
\left|R\ddot y_0(\tau_\theta)-A_0[y](\tau_\theta)\right|
\ge\epsilon_0.
$$

The displayed norm is Cartesian and uses normalized time. It is not a claim about profiles close only at the reception, a finite past segment, or phase values modulo $2\pi$. There is no future norm assumption. Physical paths are $Y_j(t)=Ry_j(t/R)$, so their physical acceleration residual is the displayed normalized residual divided by $R^2$.

## Uniform bounds and deciding determinants

The reference positions, velocities and accelerations have finite uniform bounds on the entire real line because their parameter domain is compact and their trigonometric profiles have finitely many terms. For example,

$$
|x_j^\lambda|\le P_*:=\sqrt{1+(909/8000)^2},
$$

and one may use finite bounds

$$
V_*=\frac{182644}{100000}+\frac{101}{1000}\,32\,\frac{11}{8},
\qquad
L_*=\left(\frac{182644}{100000}\right)^2+
\frac{101}{1000}\,32^2\,\frac{17}{8}.
$$

The triangle inequality justifies these deliberately loose speed and acceleration bounds. The constants are mathematical bounds, not resource-cost estimates.

In each deciding chart, let $A^0$ be the complete normalized acceleration and $L^0=\ddot x_0^\lambda$. Use the reference radial direction and the fixed axial direction at that reception. Write

$$
\Delta^0=A_r^0L_z^0-A_z^0L_r^0.
$$

Every parameter cell is compact and its interval certificate gives a strict sign for $\Delta^0/H$. Since $H\ge49/1000>0$, every cell has a positive lower bound for $|\Delta^0|$. The minimum of these finitely many positive certified bounds is a number $\delta_*>0$. Shared cell boundaries do not affect the argument: each adjoining certificate is valid on its closed cell, and either assigned phase may be used.

Complete ordinary root and divisor bounds at those finitely many deciding charts likewise give a finite common acceleration bound $M_A$. The quantities $\delta_*$ and $M_A$ can be calculated from the certificates, but this theorem requires only their strictly positive or finite character. It does not present uncomputed numerical values as measured margins.

## Uniform persistence of the complete deciding charts

First consider recent self delays. For every reference and $0<d\le1/4$, its planar chord satisfies

$$
\frac{|Q_{\mathrm{planar}}^0|}{d}
=\beta\frac{\sin(\beta d/2)}{\beta d/2}
>\frac{57}{32}.
$$

Uniform velocity closeness implies that the actual self chord differs from the reference chord by at most $\eta d$, by integration over the segment ending at the reception. Hence its full secant norm exceeds $57/32-\eta>1$ for sufficiently small $\eta$. This argument works all the way to zero delay; a fixed position-error bound alone would not suffice there.

For distinct sources, the reference recent range-minus-delay is greater than $9/32$. The two position errors change the separation by at most $2\eta$, preserving strict positivity when $2\eta<9/32$. All reference paths lie in the ball of radius $P_*<3/2$. Complete-past position closeness confines the perturbed past to the ball of radius $P_*+\eta$. For sufficiently small $\eta$, its diameter is less than three, so no remote root enters. These guards leave the same compact interval $[1/4,3]$.

On that compact interval, write $Q^0=x_0^\lambda(\tau_\theta)-x_j^\lambda(\tau_\theta-d)$ and $Q=y_0(\tau_\theta)-y_j(\tau_\theta-d)$. Then

$$
|Q-Q^0|\le2\eta,\qquad |V_s-V_s^0|\le\eta.
$$

With $|Q^0|\le Q_*:=2P_*$ and $|V_s^0|\le V_*$, direct algebra gives

$$
\big||Q|^2-|Q^0|^2\big|\le4Q_*\eta+4\eta^2,
$$

$$
|2Q\cdot V_s-2Q^0\cdot V_s^0|
\le(2Q_*+4V_*)\eta+4\eta^2.
$$

These are uniform errors for the squared gap and its delay derivative. Every protected reference bracket has opposite strict endpoint signs and a derivative bounded away from zero. Each complementary interval either has a strictly signed gap enclosure or a strict derivative together with same-sign endpoint gaps. In the latter case monotonicity bounds the absolute actual gap below by the smaller endpoint magnitude. Across the finite certificate collection, the needed strict endpoint, complement and derivative margins have a positive minimum.

Choose $\eta$ sufficiently small to preserve all these inequalities. The intermediate-value theorem and strict monotonicity then retain exactly one actual root per protected bracket. Every complement remains root-free. The recent and remote guards exclude every other positive delay. Therefore each deciding census stays complete and ordinary, without an assumption about the number of roots.

The same argument applies to every straight interpolation between a reference and its perturbed paths. The interpolation need not preserve the common-radius parameterization; it is only an auxiliary family of close Cartesian histories for proving persistence and continuity. It does not alter the physical equation or extend the scope of the final class.

## Uniform continuity of the complete acceleration

Within each fixed protected chart, the implicit root function is continuous in the history's uniform position/velocity data. This can also be seen directly: the uniform nonzero gap derivative bounds a root displacement by a fixed multiple of the gap perturbation. Thus all eight root displacements tend uniformly to zero as $\eta\to0$.

At a moved source time, the actual velocity differs from the reference velocity at the corresponding reference source time by at most its direct error $\eta$ plus $L_*$ times the root displacement. The analogous position error is bounded by $\eta+V_*$ times the root displacement. The reference acceleration bound supplies the required uniform continuity of source velocity; no third derivative is needed.

Positive delay floors and nonzero divisor floors persist uniformly. Hence every complete row

$$
\frac{\sigma_bQ_b}{d_b^3|D_b|}
$$

depends uniformly continuously on the permitted perturbation at the deciding reception. Finite summation and the finite parameter-cell cover give a common modulus $\omega_A(\eta)\to0$ with

$$
|A[y]-A^0|\le\omega_A(\eta).
$$

No signed-divisor row is removed. This continuity concerns only the complete chart at the selected reception, not ordinary continuation through every other phase of the reference history.

The demanded acceleration satisfies $|L-L^0|\le\eta$ directly from the norm hypothesis. Components are projected onto the same reference radial and axial directions for both histories. Thus there is no unaccounted change of basis.

## Scale-independent normalized residual

Let

$$
\Delta=A_rL_z-A_zL_r.
$$

The two-dimensional determinant bound gives

$$
|\Delta-\Delta^0|
\le\omega_A(\eta)L_*+[M_A+\omega_A(\eta)]\eta.
$$

Choose a common $0<\eta_0\le1$ small enough both to preserve the charts and to make the right side at most $\delta_*/2$. This is possible because the right side tends to zero. Then

$$
|\Delta|\ge\delta_*/2,\qquad |L|\le L_*+1.
$$

For any proposed $R>0$, define the full normalized residual $E=RL-A[y]$. Since $A[y]=RL-E$,

$$
\Delta=\det(A_{rz},L_{rz})=-\det(E_{rz},L_{rz}),
$$

and consequently

$$
|E|\ge\frac{|\Delta|}{|L|}
\ge\frac{\delta_*}{2(L_*+1)}=:\epsilon_0>0.
$$

The radial component of $L$ stays close to $-\beta^2$, so $|L|$ is nonzero; alternatively the strict determinant already implies that fact. The scale cancels algebraically. The bound therefore excludes every positive proposed scale, without first bounding $R$ or assuming a small residual.

## Meaning and verification boundary

The conclusion enlarges the finite trigonometric family to an open neighborhood in complete-past $C^2$ history space. It allows arbitrary higher harmonics and aperiodic perturbations inside that norm neighborhood. It does not exclude all finite-amplitude profiles, establish a numerical maximum perturbation size, or prove that trajectories enter or stay in the neighborhood.

The argument is analytical. Its finite numerical premises are exactly the complete deciding charts and strict determinants in the original parameter cover. Separate acceptance of the last eighteen certificates and independent review of this transfer are required. No new numerical target has been run for $\eta_0$, $\epsilon_0$ or $\omega_A$.

A missing reference cell or causal root, a nonstrict deciding determinant, failure of uniform recent or remote guards, loss of the protected derivative margins, discontinuity of a row despite the stated floors, or an exact perturbed history satisfying the asserted sufficiently small norm would defeat the corresponding result. A physical residual tending to zero as $R$ grows does not contradict the normalized residual statement. The [current research account](overnight2-b-followup-and-research-2026-10-07.md) owns integration and all acceptance status.
