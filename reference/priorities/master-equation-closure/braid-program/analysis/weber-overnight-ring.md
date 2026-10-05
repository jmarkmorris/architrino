# Four-member alternating ring under the instantaneous Weber-inspired law

Status: subject derivation written 2026-10-05 (about 12:55Z–13:10Z sandbox clock) by the weber-overnight ring worker, under the continuation run's common brief. Every closed form below was spot-checked by an in-session Node instrument that first passed a known case; nothing here is independently adjudicated, no measured perturbation run has been made, and no comparison with the delayed canonical Master Equation or with any Maxwell-shaped law is made. Claims concern one geometry under one frozen law.

This document derives the four-member alternating ring under the fixed instantaneous Weber-inspired acceleration law whose pair reduction, invariants and planar binary classes are developed in the [pair analysis](../../binary-research/analysis/weber-overnight-investigation.md). It gives the full acceleration matrix of the four-member system and its determinant in closed form, proves that an exactly balanced uniformly rotating ring exists at every radius, and reduces the linearized dynamics about that ring to seven small blocks by the ring's fourfold symmetry. The main result is negative for persistence: the balanced ring exists but is linearly unstable at every radius, in two independent symmetry-breaking sectors, and the Weber velocity terms neither create nor remove that instability.

## Contents

1. [Law, geometry and conventions](#1-law-geometry-and-conventions)
2. [The acceleration matrix of the four-member system](#2-the-acceleration-matrix-of-the-four-member-system)
3. [Reduction by the ring symmetry and the determinant](#3-reduction-by-the-ring-symmetry-and-the-determinant)
4. [Exact balance of the rotating ring](#4-exact-balance-of-the-rotating-ring)
5. [Linearization about the balanced ring](#5-linearization-about-the-balanced-ring)
6. [Invariants and the reduced breathing problem](#6-invariants-and-the-reduced-breathing-problem)
7. [Validation record](#7-validation-record)
8. [Claims, grades and falsifiers](#8-claims-grades-and-falsifiers)
9. [Instructions for the instrument](#9-instructions-for-the-instrument)
10. [Measured perturbations (subject instrument, 2026-10-05)](#measured-perturbations-subject-instrument-2026-10-05)

## Notation

| Symbol | Meaning |
| --- | --- |
| $T$ | absolute time; dots denote $d/dT$ |
| $\mathbf X_j,\mathbf V_j,\mathbf A_j$ | position, velocity, acceleration of member $j\in\{0,1,2,3\}$ in the void frame |
| $q_j=(-1)^j$ | polarity of member $j$; $\sigma_{ij}=\operatorname{sign}(q_iq_j)$ |
| $r_{ij},\ \mathbf e_{ij}=(\mathbf X_i-\mathbf X_j)/r_{ij}$ | present separation and unit direction of pair $(i,j)$ |
| $K>0$, $c_f$ | equal fixed coupling; wake speed, set to $1$ in every numerical value |
| $\rho,\ \Omega$ | ring radius and uniform angular rate |
| $x=\rho c_f^2/K$ | dimensionless ring radius |
| $\hat{\mathbf r}_j,\hat{\mathbf t}_j,\hat{\mathbf z}$ | local radial, tangential and axial unit vectors at member $j$ |
| $\mathbf u_{ij}\in\mathbb R^{12}$ | stacked pair direction: $\mathbf e_{ij}$ in block $i$, $-\mathbf e_{ij}$ in block $j$ |
| $\alpha_{ij}=\sigma_{ij}K\mu_{\mathrm W}/(c_f^2r_{ij})$ | pair coefficient of the acceleration matrix |
| $M$ | the $12\times12$ acceleration matrix (velocity Hessian of $L$) |
| $U=\sum_{i<j}\sigma_{ij}K/r_{ij}$ | inverse-square pair potential sum |
| $J$ | block-diagonal in-plane rotation generator, $J\hat{\mathbf r}_j=\hat{\mathbf t}_j$, $J\hat{\mathbf t}_j=-\hat{\mathbf r}_j$, $J\hat{\mathbf z}=0$ |
| $\Pi=-J^2$ | projector onto the in-plane components |
| $k\in\{0,1,2,3\}$ | character of the fourfold rotation; $\omega=i$ |

## 1. Law, geometry and conventions

The law is the boxed family of [Section 9 of the equation-variant manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response), frozen at $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$:

$$
\mathbf A_{i\leftarrow j}=\frac{\sigma_{ij}K}{r_{ij}^2}\left[1+\lambda_{\mathrm W}\frac{\dot r_{ij}^2}{c_f^2}+\mu_{\mathrm W}\frac{r_{ij}\ddot r_{ij}}{c_f^2}\right]\mathbf e_{ij},\qquad \mathbf A_i=\sum_{j\ne i}\mathbf A_{i\leftarrow j}.
\tag{1.1}
$$

Every member receives the full acceleration (architrinos have no mass; unit integration weights). Support is instantaneous; no causal delay, clamp, softening or boundary response is used. The law is implicit because $\ddot r_{ij}$ contains the unknown accelerations; the kinematic identity $\ddot r_{ij}=\|\mathbf w_{ij,\perp}\|^2/r_{ij}+\mathbf e_{ij}\cdot(\mathbf A_i-\mathbf A_j)$, with $\mathbf w_{ij}$ the relative velocity and $\mathbf w_{ij,\perp}$ its transverse part, is [eq. (2.2) of the pair analysis](../../binary-research/analysis/weber-overnight-investigation.md#2-present-separation-kinematics).

The alternating ring places four members on a circle of radius $\rho$ in one plane at $90^\circ$ spacing with polarities $+,-,+,-$, rotating uniformly about the centre:

$$
\mathbf X_j(T)=\rho\,\big(\cos\theta_j,\ \sin\theta_j,\ 0\big),\qquad \theta_j=\Omega T+j\pi/2,\qquad q_j=(-1)^j .
\tag{1.2}
$$

Adjacent pairs $(j,j+1)$ have opposite polarity, $\sigma=-1$, at separation $\sqrt2\rho$; the two opposite pairs $(0,2)$ and $(1,3)$ have like polarity, $\sigma=+1$, at separation $2\rho$. The sum of velocities vanishes by symmetry, so the centre of velocity is at rest and speed comparisons are made in that frame. Numerical values use $K=c_f=1$, so $x=\rho$.

The frozen law is the Euler–Lagrange system of the unit-weight function ([pair analysis, Section 4.2](../../binary-research/analysis/weber-overnight-investigation.md#42-the-frozen-law-is-exactly-eulerlagrange))

$$
L=\sum_j\tfrac12\|\mathbf V_j\|^2-\sum_{i<j}\Phi_{ij},\qquad \Phi_{ij}=\frac{\sigma_{ij}K}{r_{ij}}\left(1+\frac{\dot r_{ij}^2}{2c_f^2}\right),
\tag{1.3}
$$

and the variational structure organizes everything that follows: the acceleration matrix is the velocity Hessian of $L$, the balanced ring is a critical point of the rotating-frame Lagrangian, and the perturbation problem is the second variation of that Lagrangian. This use of a Lagrangian is a mathematical property of the adapted law; it imports no physical energy or mass.

## 2. The acceleration matrix of the four-member system

Collect the twelve acceleration components in $\mathbf a\in\mathbb R^{12}$. Inserting the kinematic identity into (1.1) for every pair and moving the unknowns to the left gives the linear system of [eq. (4.7) of the pair analysis](../../binary-research/analysis/weber-overnight-investigation.md#43-the-many-member-acceleration-matrix),

$$
M\mathbf a=\sum_{i<j}b_{ij}\,\mathbf u_{ij},\qquad M=I_{12}-\sum_{i<j}\alpha_{ij}\,\mathbf u_{ij}\mathbf u_{ij}^{\mathsf T},\qquad b_{ij}=\frac{\sigma_{ij}K}{r_{ij}^2}\left[1+\lambda_{\mathrm W}\frac{\dot r_{ij}^2}{c_f^2}+\mu_{\mathrm W}\frac{\|\mathbf w_{ij,\perp}\|^2}{c_f^2}\right].
\tag{2.1}
$$

Three facts about $M$ are used throughout. First, $M$ depends on positions only: the velocities enter the right side $b_{ij}$ but not the matrix, because the only acceleration-bearing term of the law is $\mu_{\mathrm W}r\ddot r$ and its coefficient is a function of $r$ alone. Second, $M$ is the velocity Hessian $\partial^2L/\partial\mathbf V\partial\mathbf V$ of (1.3): differentiating $\Phi_{ij}$ twice in the velocities gives $\Phi_{ij,\dot r\dot r}\,\mathbf u_{ij}\mathbf u_{ij}^{\mathsf T}$ with $\Phi_{ij,\dot r\dot r}=\sigma_{ij}K/(c_f^2r_{ij})=\alpha_{ij}$, and the kinetic term gives the identity. So a singular $M$ is a failure of the Legendre condition of $L$, and $M$ positive definite means $L$ is strictly convex in the velocities. Third, $M$ is symmetric, so it is invertible exactly when no eigenvalue vanishes, and the two-member scalar denominator $1-a/r$ of the pair is not transferred: the ring's determinant is computed from (2.1) directly.

The instrument assembles $M$ by a route independent of the closed form: it treats the law's right side as an affine map of the trial accelerations and reads $M$ off column by column from exact differences, then compares with (2.1). The two agree entrywise to $5\times10^{-15}$ at 60 random four-member states, and $M$ agrees with the finite-difference velocity Hessian of $L$ to $5\times10^{-8}$ (Section 7).

## 3. Reduction by the ring symmetry and the determinant

### 3.1 Local frames and characters

Write each member's displacement, velocity or acceleration in its own local frame, $\boldsymbol\xi_j=a_j\hat{\mathbf r}_j+b_j\hat{\mathbf t}_j+c_j\hat{\mathbf z}$. The rotation by $90^\circ$ that sends member $j$ to member $j+1$ preserves every pair's polarity product and separation, so it commutes with $M$, with the Hessian of $U$, and with the whole linearized problem of Section 5. In the local frames this symmetry is a cyclic shift of the index $j$, and its eigenvectors are the discrete Fourier modes $a_j=A\,\omega^{jk}$, $b_j=B\,\omega^{jk}$, $c_j=C\,\omega^{jk}$ with $\omega=i$ and character $k\in\{0,1,2,3\}$. Reflection through the ring plane decouples the axial components $c_j$ from the in-plane ones. Each character therefore carries a $2\times2$ in-plane block and a $1\times1$ axial block; characters $k=1$ and $k=3$ are complex conjugates and together form a real six-dimensional sector.

For the ring geometry the pair projections are, for adjacent pairs $(j,j+1)$ with $\mathbf e_{j,j+1}=(\hat{\mathbf r}_j-\hat{\mathbf t}_j)/\sqrt2$, and for opposite pairs $(j,j+2)$ with $\mathbf e_{j,j+2}=\hat{\mathbf r}_j$,

$$
\mathbf e_{j,j+1}\cdot(\boldsymbol\xi_j-\boldsymbol\xi_{j+1})=\frac{a_j-b_j+a_{j+1}+b_{j+1}}{\sqrt2},\qquad
\mathbf e_{j,j+2}\cdot(\boldsymbol\xi_j-\boldsymbol\xi_{j+2})=a_j+a_{j+2},
\tag{3.1}
$$

using $\hat{\mathbf r}_{j+1}=\hat{\mathbf t}_j$, $\hat{\mathbf t}_{j+1}=-\hat{\mathbf r}_j$, $\hat{\mathbf r}_{j+2}=-\hat{\mathbf r}_j$, $\hat{\mathbf t}_{j+2}=-\hat{\mathbf t}_j$.

### 3.2 The quadratic form of $M$ by character

With $\alpha_{\mathrm a}=-K/(c_f^2\sqrt2\rho)=-1/(\sqrt2x)$ for the four adjacent pairs and $\alpha_{\mathrm o}=K/(2c_f^2\rho)=1/(2x)$ for the two opposite pairs, the quadratic form $\mathbf a^{\mathsf T}M\mathbf a=\|\mathbf a\|^2-\sum\alpha_{ij}[\mathbf e_{ij}\cdot(\boldsymbol\xi_i-\boldsymbol\xi_j)]^2$ evaluated on a Fourier mode and normalized per member is

$$
q_k=|A|^2+|B|^2+|C|^2-\frac{\alpha_{\mathrm a}}2\left|A(1+\omega^k)+B(\omega^k-1)\right|^2-\frac{\alpha_{\mathrm o}}2\left(1+(-1)^k\right)^2|A|^2 .
\tag{3.2}
$$

Reading off the blocks:

| Character | Mode (local amplitudes) | Name | Eigenvalue of $M$ |
| --- | --- | --- | --- |
| $k=0$ | $a_j=1$ | breathing | $1+(\sqrt2-1)/x$ |
| $k=0$ | $b_j=1$ | rigid rotation | $1$ |
| $k=0$ | $c_j=1$ | axial translation | $1$ |
| $k=2$ | $a_j=(-1)^j$ | elliptic (opposite diameters stretch and compress) | $1-1/x$ |
| $k=2$ | $b_j=(-1)^j$ | shear (sublattices counter-rotate) | $1+\sqrt2/x$ |
| $k=2$ | $c_j=(-1)^j$ | warp (saddle) | $1$ |
| $k=1\oplus3$ | $(a_j,b_j)=(\cos\theta_j,-\sin\theta_j)$ and $(\sin\theta_j,\cos\theta_j)$ | in-plane translations (2) | $1,1$ |
| $k=1\oplus3$ | $(a_j,b_j)=(\cos\theta_j,\sin\theta_j)$ and $(\sin\theta_j,-\cos\theta_j)$ | sublattice separation: the $+$ and $-$ members translate oppositely (2) | $1+\sqrt2/x$ each |
| $k=1\oplus3$ | $c_j=\cos\theta_j$ and $\sin\theta_j$ | tilts (2) | $1,1$ |

The modes that change no separation to first order (rotation, translations, tilts, axial translation, warp) have eigenvalue one. For $k=1$ the in-plane block is $I-\alpha_{\mathrm a}H$ with $H=\begin{pmatrix}1&i\\-i&1\end{pmatrix}$, whose eigenvalues are $0$ (translation line $(A,B)\propto(1,i)$) and $2$ (sublattice line $(1,-i)$). The elliptic eigenvalue $1-1/x$ is the like-pair determinant $1-2K/(c_f^2\cdot2\rho)$ of the pair analysis: the antisymmetric combination $\mathbf u_{02}-\mathbf u_{13}$ of the two disjoint like pairs is orthogonal to every adjacent $\mathbf u_{j,j+1}$, so it is an exact eigenvector, which is the situation anticipated by criterion 3 of the pair analysis. The symmetric combination mixes with the adjacent pairs and gives the breathing eigenvalue instead.

### 3.3 Determinant and invertibility domain

Multiplying the twelve eigenvalues,

$$
\det M=\left(1+\frac{\sqrt2-1}{x}\right)\left(1-\frac1x\right)\left(1+\frac{\sqrt2}{x}\right)^{3},\qquad x=\frac{\rho c_f^2}{K}.
\tag{3.3}
$$

The matrix is invertible for every $x\ne1$, that is every ring radius except $\rho=K/c_f^2$. For $x>1$ it is positive definite, so the Legendre condition holds and $L$ is strictly convex in the velocities. For $0<x<1$ exactly one eigenvalue, the elliptic one, is negative: $M$ is indefinite but still invertible, and the acceleration solve is regular. At $x=1$ the kernel is the elliptic direction $a_j\propto(-1)^j$; by Fredholm's alternative the law then has no solution unless the right side is orthogonal to that direction, and infinitely many when it is. The trace $\operatorname{tr}M=12+2(2\sqrt2-1)/x$ and the pair-space formula $\det(I_6-DG)$ of the pair analysis give the same value (Section 7). Because $M$ depends on positions only and the ring's positions rotate rigidly, (3.3) holds at every phase and for every $\Omega$.

> Claim grade: derived. Falsifier: a ring state at which the matrix assembled directly from (1.1) has a determinant differing from (3.3), or a Rayleigh quotient on one of the listed modes differing from the table. Instrument: [ring-checks.mjs](../../binary-research/evidence/weber-overnight-promoted/round2/ring/ring-checks.mjs), Section D; agreement to $10^{-14}$ absolute at twelve radii from $x=0.2$ to $x=100$ including $x=0.999,1,1.001$, and to $3\times10^{-16}$ on every listed mode.

## 4. Exact balance of the rotating ring

### 4.1 The velocity terms cancel on any rigid rotation

On the uniformly rotating ring every separation is constant, so $\dot r_{ij}=0$ and $\ddot r_{ij}=0$ for every pair. The kinematic identity does not contradict this: the transverse term $\|\mathbf w_{ij,\perp}\|^2/r_{ij}=\Omega^2r_{ij}$ is exactly cancelled by $\mathbf e_{ij}\cdot(\mathbf A_i-\mathbf A_j)=-\Omega^2r_{ij}$ once the accelerations are the centripetal ones. The question is whether the implicit solve returns those centripetal accelerations. Insert the candidate $\mathbf a^\ast=-\Omega^2\mathbf X$ into (2.1). Since $\mathbf u_{ij}\cdot\mathbf X=\mathbf e_{ij}\cdot(\mathbf X_i-\mathbf X_j)=r_{ij}$,

$$
M\mathbf a^\ast=-\Omega^2\mathbf X+\Omega^2\sum_{i<j}\alpha_{ij}r_{ij}\mathbf u_{ij}=-\Omega^2\mathbf X+\sum_{i<j}\frac{\sigma_{ij}K\mu_{\mathrm W}\Omega^2}{c_f^2}\mathbf u_{ij},
$$

while the right side, with $\dot r_{ij}=0$ and $\|\mathbf w_{ij,\perp}\|^2=\Omega^2r_{ij}^2$, is $\sum b_{ij}\mathbf u_{ij}=\sum\frac{\sigma_{ij}K}{r_{ij}^2}\mathbf u_{ij}+\sum\frac{\sigma_{ij}K\mu_{\mathrm W}\Omega^2}{c_f^2}\mathbf u_{ij}$. The $\mu_{\mathrm W}$ terms are identical on both sides and cancel; the $\lambda_{\mathrm W}$ term is absent because $\dot r=0$. So $\mathbf a^\ast$ solves the system exactly when

$$
-\Omega^2\mathbf X_i=\sum_{j\ne i}\frac{\sigma_{ij}K}{r_{ij}^2}\mathbf e_{ij}\qquad\text{for every }i,
\tag{4.1}
$$

which is the balance condition of the instantaneous inverse-square control. For $x\ne1$ the solve is unique, so (4.1) is necessary and sufficient. The cancellation used only $\mathbf u_{ij}\cdot\mathbf X=r_{ij}$ and $\|\mathbf w_{ij,\perp}\|=\Omega r_{ij}$, so it holds for any configuration in uniform rigid rotation about an axis through the origin in its plane, for every $\mu_{\mathrm W}$ and $\lambda_{\mathrm W}$: the Weber velocity terms are invisible to the exact balance of any rigidly rotating planar configuration, exactly as they were for the circular pair.

### 4.2 Tangential and radial balance

Member $0$ at $\rho(1,0,0)$ receives, from the two adjacent opposite-polarity members at $\sqrt2\rho$, $-K(1,-1,0)/(2\sqrt2\rho^2)$ and $-K(1,1,0)/(2\sqrt2\rho^2)$, and from the opposite like-polarity member at $2\rho$, $+K(1,0,0)/(4\rho^2)$. The tangential components of the two adjacent contributions are equal and opposite, so the tangential balance holds identically: the reflection through member $0$'s diameter exchanges members $1$ and $3$, which carry the same polarity, so the configuration is reflection symmetric and the net acceleration on each member lies along its own radius. This is true for any $\Omega$ and any radius, under any law that depends on present separations only. The radial sum is

$$
\sum_{j\ne0}\frac{\sigma_{0j}K}{r_{0j}^2}\mathbf e_{0j}\cdot\hat{\mathbf r}_0=\frac{K}{\rho^2}\left(\frac14-\frac1{\sqrt2}\right)=-\frac{(2\sqrt2-1)K}{4\rho^2}\approx-0.4571\,\frac{K}{\rho^2},
\tag{4.2}
$$

inward: the two attracting neighbours win over the one repelling partner. Equating with $-\Omega^2\rho$,

$$
\boxed{\ \Omega^2=\frac{(2\sqrt2-1)K}{4\rho^3}>0\quad\text{for every }\rho>0.\ }
\tag{4.3}
$$

The exact balanced ring family therefore exists at every radius. The member speed and its equality with the wake speed are

$$
v=\Omega\rho=c_f\sqrt{\frac{2\sqrt2-1}{4x}},\qquad v=c_f\ \text{ at }\ x_\ast=\frac{2\sqrt2-1}{4}\approx0.45711 .
\tag{4.4}
$$

Rings with $x>x_\ast$ are subfield, $x=x_\ast$ is the equality ring and $x<x_\ast$ is superfield; all are exact solutions in the unrestricted domain, the inclusive ceiling admits $x\ge x_\ast$, the strict ceiling $x>x_\ast$. The speed at the singular radius $x=1$ is $v=c_f\sqrt{(2\sqrt2-1)/4}\approx0.676c_f$, so the singular radius lies inside the subfield part of the family, and the equality ring at $x_\ast<1$ has an indefinite but invertible $M$. At $x=1$ the centripetal accelerations still satisfy the law, but they are one solution among infinitely many because the right side is orthogonal to the kernel; the law does not determine the evolution there, and the ring at $x=1$ is excluded from the family as a well-posed history.

### 4.3 Static ring control

With $\Omega=0$ all velocities vanish, so $\dot r_{ij}=0$ and $b_{ij}=\sigma_{ij}K/r_{ij}^2$, but the members accelerate inward, so $\ddot r_{ij}\ne0$ and the implicit solve matters. By symmetry the solution is the breathing mode, on which $M$ has eigenvalue $1+(\sqrt2-1)/x$, and the right side is the inverse-square value (4.2). The net radial acceleration on each member of a static ring is

$$
A_{\mathrm{static}}=-\frac{(2\sqrt2-1)K}{4\rho^2}\cdot\frac{x}{x+\sqrt2-1},
\tag{4.5}
$$

inward at every radius and smaller in magnitude than the inverse-square value by the factor $x/(x+\sqrt2-1)$; at $x=1/2$ the solved value is $-K/\rho^2$ against $-1.828K/\rho^2$ for inverse square. The $\mu_{\mathrm W}$ term thus opposes the collapse of a static ring without stopping it. The distinction with Section 4.1 is exact: on the rotating balanced ring $\ddot r_{ij}=0$ and the velocity terms cancel; on the static ring $\ddot r_{ij}\ne0$ and they do not.

> Claim grade: derived. Falsifier: a ring state with $\Omega$ from (4.3) at which the twelve solved accelerations differ from $-\Omega^2\mathbf X$, or a tangential component, or a nonzero $\ddot r_{ij}$ on the solved state; or a static-ring solve differing from (4.5). Instrument: ring-checks.mjs, Section E; residuals $\le10^{-14}$ at six radii including $x_\ast$ and both sides of $x=1$, every $|\ddot r_{ij}|\le1.6\times10^{-14}$, the control with $1.1\,\Omega$ leaves residuals of order $10^{-1}$ to $10^{-3}$, and (4.5) agrees to ten digits at three radii.

## 5. Linearization about the balanced ring

The balance of Section 4 is an exact solution of the full selected equation, so linearizing about it is legitimate. This section sets up the complete first-order system, reduces it by symmetry, and derives the sector equations in closed form.

### 5.1 The rotating-frame second variation

Write $\mathbf X_j=Q(\Omega T)\mathbf Y_j$ with $Q$ the rotation about the axis. Because $L$ is rotation invariant, the rotating-frame Lagrangian $L_{\mathrm{rot}}(\mathbf Y,\dot{\mathbf Y})=L(\mathbf Y,\dot{\mathbf Y}+\Omega J\mathbf Y)$ is autonomous, and the balanced ring is its equilibrium $(\mathbf Y^\ast,\mathbf 0)$. The second variation gives the linear system $A\ddot{\boldsymbol\xi}+(B-B^{\mathsf T})\dot{\boldsymbol\xi}-C\boldsymbol\xi=0$ with $A=L_{\dot Y\dot Y}$, $B=L_{\dot YY}$, $C=L_{YY}$ at the equilibrium. Two simplifications are exact at the ring. First, $A=M$, the same velocity Hessian. Second, on the slice $\dot{\mathbf Y}=\mathbf 0$ every pair has $\dot r_{ij}=\mathbf e_{ij}\cdot\Omega J(\mathbf Y_i-\mathbf Y_j)=0$ identically in $\mathbf Y$, since $J$ rotates the separation vector perpendicular to itself. Hence all $\mathbf Y$-derivatives of $\dot r_{ij}$ vanish on that slice, $\Phi_{\dot r}=\Phi_{\dot rr}=0$ there, and the Weber part of $\Phi$ contributes nothing to $B$ or $C$: $B=\Omega J$ from the kinetic term and $C=\Omega^2\Pi-\nabla^2U$. The linearized dynamics in the rotating frame is therefore

$$
\boxed{\ M\ddot{\boldsymbol\xi}+2\Omega J\dot{\boldsymbol\xi}+\mathcal K\boldsymbol\xi=0,\qquad \mathcal K=\nabla^2U(\mathbf Y^\ast)-\Omega^2\Pi,\ }
\tag{5.1}
$$

a gyroscopic system whose only difference from the linearization of the instantaneous inverse-square control is the matrix $M$ in place of the identity. The 24-state first-order form is $\dot{\boldsymbol\xi}=\boldsymbol\eta$, $\dot{\boldsymbol\eta}=-M^{-1}(2\Omega J\boldsymbol\eta+\mathcal K\boldsymbol\xi)$, and the eigenvalues $z$ are the roots of $\det(z^2M+2\Omega zJ+\mathcal K)=0$. The pair Hessian of $\sigma K/r$ is $(\sigma K/r^3)(3\mathbf e\mathbf e^{\mathsf T}-I)$ on the diagonal blocks and its negative off the diagonal. The instrument confirms (5.1) against a finite-difference Jacobian of the full nonlinear rotating-frame vector field to $2\times10^{-11}$ (Section 7).

### 5.2 Sector blocks

In the symmetry-adapted modes of Section 3.1, $M$, $J$ and $\mathcal K$ are all block diagonal; in fact $\mathcal K$ is diagonal in that basis (largest off-diagonal entry $10^{-16}$). The gyroscopic block is $2\Omega\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ on every in-plane $(a,b)$ pair and zero on the axial components. In units of $K/\rho^3$, with $\Omega^2=(2\sqrt2-1)/4$ in those units, the stiffness entries are:

| Sector | Mode | $M$ entry | $\mathcal K$ entry (units $K/\rho^3$) |
| --- | --- | --- | --- |
| $k=0$ in-plane | breathing $a$ | $m_a=1+(\sqrt2-1)/x$ | $-3\Omega^2$ |
| $k=0$ in-plane | rotation $b$ | $1$ | $0$ |
| $k=0$ axial | axial translation $c$ | $1$ | $0$ |
| $k=2$ in-plane | elliptic $a$ | $m_A=1-1/x$ | $k_A=3/4$ |
| $k=2$ in-plane | shear $b$ | $m_B=1+\sqrt2/x$ | $k_B=-3\sqrt2/2$ |
| $k=2$ axial | warp $c$ | $1$ | $\sqrt2$ |
| $k=1$ in-plane | translation $(1,i)$ | $1$ | $-\Omega^2$ |
| $k=1$ in-plane | sublattice $(1,-i)$ | $m_s=1+\sqrt2/x$ | $k_s=(1-4\sqrt2)/4$ |
| $k=1$ axial | tilt $c$ | $1$ | $\Omega^2$ |

The breathing entry follows from Euler's theorem: $U$ is homogeneous of degree $-1$, so $\nabla^2U\,\mathbf Y^\ast=-2\nabla U=-2\Omega^2\mathbf Y^\ast$ and $\mathcal K\mathbf Y^\ast=-3\Omega^2\mathbf Y^\ast$. The rotation entry vanishes by rotation invariance of the amended potential. In the $k=1$ block the generator $J$ is diagonal, $J(1,i)=-i(1,i)$ and $J(1,-i)=+i(1,-i)$, so translation and sublattice decouple into scalar equations.

### 5.3 Sector equations and their roots

**Symmetry-restricted sector ($k=0$).** In-plane: $m_a\ddot a-2\Omega\dot b-3\Omega^2a=0$, $\ddot b+2\Omega\dot a=0$. Eliminating $\dot b$ gives $m_a\ddot a+\Omega^2a=0$, so

$$
\omega_{\mathrm{br}}^2=\frac{\Omega^2}{m_a}=\frac{\Omega^2\,x}{x+\sqrt2-1},
\tag{5.2}
$$

with the remaining two roots $z=0$ forming one Jordan block: the rotation generator is a null vector of $\mathcal K$, and its generalized eigenvector is the breathing direction, which is the change of radius within the family (a neighbouring ring rotates at a different rate, so the phase drifts linearly). The breathing oscillation is slower than the rotation at every finite $x$ and tends to $\Omega$ as $x\to\infty$, which is the closed-orbit epicyclic rate of the inverse-square control; the ring's breathing therefore precesses forward. Axial: $\ddot c=0$, a second Jordan block of size two (axial translation and axial boost).

**Translation and tilt ($k=1\oplus3$).** Translation: $(z\mp i\Omega)^2=0$, so $z=\pm i\Omega$ each with a Jordan block of size two: a uniformly moving centre appears in the rotating frame as a rotating, linearly growing displacement. Tilt: $\ddot c+\Omega^2c=0$, $z=\pm i\Omega$ with multiplicity two, semisimple: a rigid tilt of the ring plane, which is a neighbouring exact solution with a tilted angular-momentum direction.

**Warp ($k=2$ axial).** $\ddot c+\sqrt2(K/\rho^3)c=0$, $\omega_{\mathrm w}^2=\sqrt2K/\rho^3=\frac{4\sqrt2}{2\sqrt2-1}\Omega^2\approx3.094\,\Omega^2$, neutrally stable: the warp lengthens the attracting adjacent separations and leaves the like separations unchanged to first order.

**Sublattice separation ($k=1\oplus3$ in-plane).** $m_sz^2+2i\Omega z+k_s=0$ for $k=1$ and its conjugate for $k=3$, with roots

$$
z=\frac{-i\Omega\pm\sqrt{-(\Omega^2+m_sk_s)}}{m_s},\qquad -(\Omega^2+m_sk_s)=\frac{K}{4\rho^3}\left[2\sqrt2+\frac{8-\sqrt2}{x}\right]>0 .
\tag{5.3}
$$

The square root is real and positive for every $x>0$, so this sector has a root with positive real part at every radius: the relative translation of the $+$ and $-$ sublattices is unstable, and the gyroscopic coupling cannot stabilize it. In the control limit $x\to\infty$ the growth rate is $\sqrt{\sqrt2/2}\,\sqrt{K/\rho^3}\approx1.243\,\Omega$; at $x=1.7$ it is $1.045\,\Omega$; at $x_\ast$ it is $0.750\,\Omega$.

**Elliptic and shear ($k=2$ in-plane).** With $s=z^2$,

$$
m_Am_B\,s^2+\left(m_Ak_B+m_Bk_A+4\Omega^2\right)s+k_Ak_B=0 .
\tag{5.4}
$$

Since $k_Ak_B=-9\sqrt2/8<0$: for $x>1$, $m_Am_B>0$ and the product of the roots is negative, so one root $s$ is real and positive and $z=\sqrt s$ is a real positive growth rate; for $0<x<1$, $m_A<0<m_B$, so the product of the roots is positive and their sum $-(m_Ak_B+m_Bk_A+4\Omega^2)/(m_Am_B)$ is positive (each term in the bracket is positive), hence both roots have positive real part and again some $z$ has positive real part. The $k=2$ in-plane sector is therefore unstable at every $x\ne1$. The growing mode is dominated by the shear component, whose negative stiffness has a plain origin: counter-rotating the two sublattices brings pairs $(0,1)$ and $(2,3)$ closer while separating $(1,2)$ and $(3,0)$, and the strengthened attraction of the closing pairs runs away, which is the ring pairing off into two opposite-polarity binaries. In the control limit the growth rate is $1.517\,\Omega$; at $x=1.7$ it is $1.122\,\Omega$ (the instrument's nonlinear check reproduces this value to six digits); at $x_\ast$ the two $s$-roots are both positive and the rates are $0.752\,\Omega$ and $1.665\,\Omega$. As $x\to1^-$ the faster rate diverges with $m_A\to0^-$; as $x\to1^+$ that root becomes a fast oscillation.

### 5.4 Summary of the 24 eigenvalues

| Sector | States | Rotating-frame eigenvalues | Character |
| --- | --- | --- | --- |
| In-plane translation and boost | 4 | $\pm i\Omega$, each a Jordan block of size 2 | neutral, symmetry |
| Axial translation and boost | 2 | $0$, Jordan block of size 2 | neutral, symmetry |
| Rotation phase and family radius | 2 | $0$, Jordan block of size 2 | neutral, symmetry and family |
| Tilts | 4 | $\pm i\Omega$, multiplicity 2 | neutral, symmetry |
| Breathing | 2 | $\pm i\omega_{\mathrm{br}}$, (5.2) | elliptic for all $x>0$ |
| Warp | 2 | $\pm i\omega_{\mathrm w}$ | elliptic for all $x>0$ |
| Sublattice separation | 4 | (5.3): real parts $\pm\sqrt{-(\Omega^2+m_sk_s)}/m_s$ | unstable for all $x>0$ |
| Elliptic and shear | 4 | $\pm\sqrt{s_{1,2}}$ from (5.4) | unstable for all $x\ne1$ |

Twelve of the 24 states are symmetry or family directions and are neutral by construction; of the twelve nontrivial states, four are elliptic and eight lie in two independent unstable sectors. The balanced ring is linearly unstable at every radius, in both speed regimes, with $e$-folding times of order one radian of rotation. The instability is already present in the instantaneous inverse-square control and the Weber terms only rescale it through $M$; since the balance condition and the stiffness matrix $\mathcal K$ are those of the control, this law cannot stabilize the alternating four-ring by its velocity dependence.

> Claim grade: derived (closed-form sector polynomials) with in-session spot checks; the stability verdict is a linear statement about an exact solution and says nothing about finite survival time or the nonlinear fate beyond the first $e$-foldings. Falsifier: a finite-difference Jacobian of the full rotating-frame vector field at the balanced ring disagreeing with (5.1); a value of $\det(z^2M+2\Omega zJ+\mathcal K)$ at some complex $z$ differing from the product of the sector polynomials; or a Cartesian evolution of ring plus $10^{-6}$ times the shear or sublattice eigenvector whose early growth rate differs from (5.3)–(5.4). Instrument: ring-checks.mjs, Section F; the polynomial identity holds to $1.7\times10^{-15}$ relative at twelve random complex $z$ at $x=1.7$, and the nonlinear growth check gives $0.342339$ measured against $0.342339$ predicted (RK4, step $0.002$, one time unit) with energy drift $3\times10^{-13}$.

## 6. Invariants and the reduced breathing problem

The invariants are mathematical properties of the adapted law with unit weights; they are not primitive physical energy, momentum or angular-momentum accounts of architrinos. Along every regular history, the energy function of (1.3),

$$
E=\sum_j\tfrac12\|\mathbf V_j\|^2+\sum_{i<j}\frac{\sigma_{ij}K}{r_{ij}}\left(1-\frac{\dot r_{ij}^2}{2c_f^2}\right),
\tag{6.1}
$$

the sum of velocities $\sum_j\mathbf V_j$, and the total moment $\sum_j\mathbf X_j\times\mathbf V_j$ are constant ([pair analysis, Sections 4.1–4.2](../../binary-research/analysis/weber-overnight-investigation.md#4-invariants-and-variational-structure)). On the balanced ring $\sum\mathbf V_j=\mathbf 0$, $E=2\Omega^2\rho^2-(2\sqrt2-1)K/\rho=-\tfrac12(2\sqrt2-1)K/\rho<0$, and the moment is $4\rho^2\Omega\,\hat{\mathbf z}$. The instrument finds $|dE/dT|$ below $7\times10^{-8}$ of the natural scale of its terms (finite differences) and the sum of accelerations and total moment of accelerations below $10^{-14}$ at random four-member states.

The symmetric sector has a reduced one-degree-of-freedom description. The fixed-point set of the fourfold symmetry is the family of concentric alternating rings $\mathbf X_j=\rho(T)\,(\cos(\varphi(T)+j\pi/2),\ \sin(\varphi(T)+j\pi/2),\ 0)$, and because the symmetry preserves $L$ and the acceleration solve is unique for $x\ne1$, a history starting in this set with symmetric velocities stays in it, and its equations are the Euler–Lagrange equations of $L$ restricted to the set. With $\dot r_{\mathrm{adj}}=\sqrt2\dot\rho$ and $\dot r_{\mathrm{opp}}=2\dot\rho$,

$$
L_{\mathrm{red}}=2\left(1+\frac{(\sqrt2-1)K}{c_f^2\rho}\right)\dot\rho^2+2\rho^2\dot\varphi^2+\frac{(2\sqrt2-1)K}{\rho},
\tag{6.2}
$$

so $\ell=4\rho^2\dot\varphi$ is conserved and

$$
E_{\mathrm{red}}=2\,m_a(\rho)\,\dot\rho^2+\frac{\ell^2}{8\rho^2}-\frac{(2\sqrt2-1)K}{\rho},\qquad m_a(\rho)=1+\frac{(\sqrt2-1)K}{c_f^2\rho}.
\tag{6.3}
$$

This is a one-degree-of-freedom energy with a positive, position-dependent radial weight, exactly the structure of the pair's reduced radial equation. The effective potential is that of the inverse-square control, its minimum sits at the balanced radius ($\ell^2=4(2\sqrt2-1)K\rho_0$ reproduces (4.3)), and $V_{\mathrm{eff}}''(\rho_0)=4\Omega^2$ gives back (5.2). Since $m_a>0$ for all $\rho>0$, a symmetric breathing history with $\ell\ne0$ and $E_{\mathrm{red}}<0$ oscillates for all time between the turning points of the control with the same $(E_{\mathrm{red}},\ell)$; the breathing mode is Lyapunov stable within the symmetric sector, by the first integral and not only by linearization. That stability is confined to the symmetric sector: the unstable directions of Section 5 all break the symmetry.

> Claim grade: derived. Falsifier: a symmetric four-member history along which (6.3) is not constant, or whose turning points differ from the roots of $\ell^2/(8\rho^2)-(2\sqrt2-1)K/\rho=E_{\mathrm{red}}$. Not yet checked by evolution; this is the first item for the instrument.

## 7. Validation record

Instrument: [ring-checks.mjs](../../binary-research/evidence/weber-overnight-promoted/round2/ring/ring-checks.mjs) (Node 22, no packages), output in [ring-checks-output.txt](../../binary-research/evidence/weber-overnight-promoted/round2/ring/ring-checks-output.txt). The matrix and right side are assembled from the law as an affine residual map in the trial accelerations, not from the closed form (2.1). The known case was run and recorded first: two-member determinant against $1-a/r$ of the pair analysis, both polarities, 50 random states, relative agreement $6\times10^{-15}$.

| Check | Result |
| --- | --- |
| A. $M$ from the law vs (2.1), 60 random four-member states | entrywise $5\times10^{-15}$; determinant $10^{-12}$ relative; $M$ unchanged under a change of velocities at fixed positions to $2\times10^{-15}$ |
| B. $M$ vs finite-difference velocity Hessian of $L$, 20 states | $5\times10^{-8}$ (central differences, step $10^{-4}$) |
| C. Euler–Lagrange residual of $L$ with the solved accelerations; $dE/dT$; sum and moment of accelerations | $1.9\times10^{-6}$; $7\times10^{-8}$ of the term scale; $5\times10^{-15}$; $7\times10^{-15}$ |
| D. Ring determinant: direct $12\times12$, closed form (3.3), pair-space $\det(I_6-DG)$ | agreement $\le10^{-11}$ absolute at $x\in\{0.2,0.4142,0.4571,0.7,0.999,1,1.001,1.5,2,3,10,100\}$; trace to twelve digits; all twelve mode eigenvalues to $3\times10^{-16}$ |
| E. Balance at (4.3), six radii; tangential; $\ddot r_{ij}$ on the solved state; wrong-$\Omega$ control; static ring (4.5) | residual $\le10^{-14}$; $\le10^{-14}$; $\le1.6\times10^{-14}$; $10^{-1}$–$10^{-3}$; ten digits |
| F. Rotating-frame Jacobian vs (5.1); cross-sector entries; $\mathcal K$ diagonal entries; polynomial identity; nonlinear growth | $2\times10^{-11}$; $\le2\times10^{-16}$; all nine entries to twelve digits; $1.7\times10^{-15}$; $0.342339$ vs $0.342339$ |

One correction made during this work: a first hand derivation gave the sublattice stiffness as $(1-\sqrt2)/4$; the finite-difference Hessian returned $(1-4\sqrt2)/4$, the hand derivation was rechecked and found to have halved the adjacent-pair projection twice, and the corrected value is the one used in (5.3). With the wrong value the sublattice sector would have appeared gyroscopically stabilized for $x>\sqrt2-1$; with the correct value it is unstable at every radius. The polynomial identity of check F failed before the correction (relative difference $1.1$) and passes after it, which is what identified the error.

## 8. Claims, grades and falsifiers

1. **Acceleration matrix.** $M=I_{12}-\sum\alpha_{ij}\mathbf u_{ij}\mathbf u_{ij}^{\mathsf T}$ equals the velocity Hessian of (1.3), depends on positions only, and on the ring has the twelve eigenvalues of Section 3.2 and determinant (3.3). Derived; spot-checked. Falsifier in Section 3.3.
2. **Invertibility domain.** Every $x\ne1$; positive definite for $x>1$, one negative eigenvalue for $x<1$, kernel equal to the elliptic mode at $x=1$. Derived.
3. **Exact balance.** The velocity terms cancel identically on any uniform rigid rotation; the ring is balanced if and only if $\Omega^2=(2\sqrt2-1)K/(4\rho^3)$; tangential balance is identical by reflection symmetry; member speed $c_f\sqrt{(2\sqrt2-1)/(4x)}$, equal to $c_f$ at $x_\ast=(2\sqrt2-1)/4$. Derived; spot-checked. This is an existence result, not an exclusion; the NO GO branch of the assignment does not arise. Falsifier in Section 4.
4. **Static control.** Inward acceleration (4.5), reduced relative to inverse square by $x/(x+\sqrt2-1)$. Derived; spot-checked.
5. **Linearization.** The rotating-frame second variation is (5.1) with the control's stiffness and the Weber matrix $M$; the spectrum is the union of the sector roots of Section 5.3. Derived; spot-checked against the finite-difference Jacobian and by the polynomial identity.
6. **Linear instability at every radius.** Two independent unstable sectors (sublattice separation for all $x>0$; elliptic–shear for all $x\ne1$), growth rates of order $\Omega$. Derived at the linear level; the nonlinear growth check at one radius is a spot check, not a survival measurement. This claim does not establish the nonlinear fate, the time to pairing, or the behaviour near the singular radius; it does establish that no stability verdict in favour of the ring is available under this law. Falsifier in Section 5.4.
7. **Invariants and reduced breathing.** (6.1) and (6.3); breathing Lyapunov stable within the symmetric sector. Derived; the reduced energy is not yet checked by evolution.
8. **Not claimed.** Anything about the delayed canonical Master Equation, about Maxwell-shaped laws, about other member counts or inventories, about the law's behaviour at $x=1$ beyond non-uniqueness, or about independent adjudication, which is pending.

## 9. Instructions for the instrument

Evolve the full 24-state Cartesian system $\dot{\mathbf X}=\mathbf V$, $\dot{\mathbf V}=M(\mathbf X)^{-1}\mathbf B(\mathbf X,\mathbf V)$ with $K=c_f=1$, assembling $M$ and $\mathbf B$ from the law and refusing to continue if $|\det M|$ falls below a declared threshold. Record $E$, $\sum\mathbf V_j$, $\sum\mathbf X_j\times\mathbf V_j$, all six separations, the twelve speeds and $\det M$ at every output.

**Balanced state to evolve.** At $T=0$: $\mathbf X_0=(\rho,0,0)$, $\mathbf X_1=(0,\rho,0)$, $\mathbf X_2=(-\rho,0,0)$, $\mathbf X_3=(0,-\rho,0)$; $\mathbf V_j=\Omega\rho\,\hat{\mathbf t}_j$ with $\hat{\mathbf t}_0=(0,1,0)$, $\hat{\mathbf t}_1=(-1,0,0)$, $\hat{\mathbf t}_2=(0,-1,0)$, $\hat{\mathbf t}_3=(1,0,0)$; $q_j=(-1)^j$; $\Omega=\sqrt{(2\sqrt2-1)/(4\rho^3)}$. Suggested radii: $\rho=1.7$ (subfield, $M$ positive definite), $\rho=0.8$ (subfield, $M$ indefinite), $\rho=x_\ast=(2\sqrt2-1)/4$ (equality), $\rho=0.3$ (superfield). Expected: separations constant to integrator tolerance for several rotations, with departure governed by round-off amplified at the rates of Section 5.3 (at $\rho=1.7$ about $1.12\,\Omega$).

**Perturbation vectors** (apply as $\mathbf X_j\to\mathbf X_j+\epsilon\,\boldsymbol\delta_j$ with $\epsilon=10^{-6}\rho$; for a pure eigenmode also add the velocity $\epsilon(z\boldsymbol\delta_j+\Omega J\boldsymbol\delta_j)$ in the inertial frame, otherwise add no velocity and expect a mixture):

| Name | $\boldsymbol\delta_0,\boldsymbol\delta_1,\boldsymbol\delta_2,\boldsymbol\delta_3$ | Expected |
| --- | --- | --- |
| breathing | $\hat{\mathbf r}_j$ for all $j$ | oscillation at $\omega_{\mathrm{br}}$ of (5.2); reduced energy (6.3) constant |
| elliptic | $(1,0,0),(0,-1,0),(-1,0,0),(0,1,0)$ | growth at the real root of (5.4) |
| shear | $(0,1,0),(1,0,0),(0,-1,0),(-1,0,0)$ | growth at the real root of (5.4); pairs $(0,1)$ and $(2,3)$ close |
| sublattice $x$ | $(1,0,0),(-1,0,0),(1,0,0),(-1,0,0)$ | growth at the real part of (5.3) |
| warp | $(0,0,1),(0,0,-1),(0,0,1),(0,0,-1)$ | oscillation at $\omega_{\mathrm w}$ |
| tilt | $(0,0,1),(0,0,0),(0,0,-1),(0,0,0)$ | oscillation at $\Omega$ (rigid tilt) |
| random | uniform in $[-1,1]^{12}$ | growth at the fastest rate present |

Measure the early growth rate by fitting $\ln$ of the projection of $\mathbf X-\mathbf X_{\mathrm{ring}}(T)$ onto the applied direction in the rotating frame over the first $e$-folding, and compare with Section 5.3. Then continue each unstable run to its first event (a separation below a declared minimum, $|\det M|$ below threshold, or a speed crossing $c_f$) and report the event, the time, and the separations at the event; the derived expectation is pairing into two opposite-polarity binaries, which is an inference to be tested, not a result.

## Measured perturbations (subject instrument, 2026-10-05)

Status: measured section written 2026-10-05 (about 14:10Z–15:25Z sandbox clock) by the weber-overnight ring instrument worker. This section records what the subject instrument measured when it evolved the balanced ring and the perturbations prescribed in Section 9. It keeps four things separate, as the common brief requires: the exact solution (Section 4, derived), the local linear stability (Section 5, derived), the finite numerical survival measured here, and the measured fate after the ring breaks. Nothing here is an independent adjudication of Sections 3–6: the instrument and this derivation share no code, but the predictions compared against were written in the same lane as this section, so the agreements below are evidence that the instrument and the closed forms describe the same dynamics, not evidence from a second author. The blind independent check is a separate lane and is not reported here.

### 10.1 Instrument, settings and record

The instrument is the [weber-overnight pair instrument](../../binary-research/evidence/weber-overnight-pair-instrument.md) (Node 22, double precision, Gragg–Bulirsch–Stoer extrapolation with event location), used unmodified; its eleven known-case controls are recorded in its own receipt. A helper, [weber-overnight-ring-runner.mjs](../evidence/weber-overnight-ring-runner.mjs), imports the instrument and does only what the instrument does not: it builds ring states, applies the Section 9 displacement vectors, projects the displacement from the unperturbed ring $\mathbf X_{\mathrm{ring}}(T)$ onto the symmetry-adapted sectors of Section 3.1 in the rotating local frames, fits rates, detects pairing, and writes the machine record [weber-overnight-ring-runs.json](../evidence/weber-overnight-ring-runs.json). Trajectories and instrument summaries are under `.local-data/master-equation-closure/weber-overnight/ring/`.

Settings, frozen in the record before any run: $K=c_f=1$, $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$; GBS with relative tolerance $10^{-12}$ and absolute tolerance $10^{-14}$, and a refinement run of every case at relative tolerance $10^{-10}$; maximum step one fiftieth of the rotation period $P=2\pi/\Omega$; stopping events at contact $r_{ij}<10^{-6}$, escape $r_{ij}>10^{3}$, and obstruction ($|\det M|<10^{-8}$, smallest pivot $<10^{-10}$, or condition number $>10^{10}$, exact 1-norm condition number on); speed crossings of $c_f$ recorded but not stopping. Turning points were not recorded, because on the balanced ring every $\dot r_{ij}$ is zero to round-off and the locator would report a round-off turning point at every step; separation extremes are taken from the recorded states instead. The ring at $x_\ast$ has every member exactly at $c_f$ and would likewise report a round-off speed crossing at every step, so for that one case speed recording was off and the speed range is reported from the states. Each run also stops at a step cap (40,000 accepted steps for the first three $10^{-3}$ cases at $x=1.7$, 15,000 thereafter after the sandbox's per-call time limit was discovered); a `max-steps` termination is a cost stop and is never read as a physical event.

Known cases, run and recorded before any target (all passed; machine record, `knownCases`):

| Known case | Reference | Result |
| --- | --- | --- |
| K1 balance at $x\in\{1.7,0.8,x_\ast,0.3\}$ | solved accelerations equal $-\Omega^2\mathbf X$ with (4.3); tangential component zero; $\det M$ equals (3.3) | residual $\le2.7\times10^{-15}$, tangential $\le8.4\times10^{-16}$, determinant to $1.8\times10^{-15}$ relative |
| K1b wrong-rate control | speeds scaled by $1.1$ must leave a residual of order $10^{-2}$ | residual $6.5\times10^{-3}$ |
| K2a–c rate fitter | synthetic signals with two known roots ($s=0.37$ and $s=-2.1$), a known $\lvert S\rvert^2$ growth ($\gamma=0.3423$), and a known offset oscillation ($\omega=0.2719$) | recovered to $2.1\times10^{-14}$, $2.0\times10^{-14}$, $1.7\times10^{-14}$ relative |
| K3 pairing diagnosis | two synthetic opposite-polarity binaries of separation $0.1$ receding as $1+T$; the exact ring | labelled separating binaries; labelled not paired |
| K4 sector projection | each Section 9 vector projects onto its own sector with unit amplitude and nothing elsewhere | amplitude $1$ (tilt $1/2$ by the complex $k=1$ normalization), leakage $\le10^{-13}$ |
| K5 reduced energy | $E_{\mathrm{red}}$ of (6.3) equals the energy function (6.1) on a symmetric breathing state with $\dot\rho\ne0$ | agreement $2.2\times10^{-16}$ |

The fitter is a variable-projection least-squares fit of the projected sector amplitude: nonlinear root parameters $s$ found by a grid search then Nelder–Mead, linear coefficients by least squares, with the basis $\{\cosh\sqrt s\,T,\ \sinh\sqrt s\,T/\sqrt s\}$ continued analytically to $\{\cos,\sin\}$ for $s<0$. For the $k=1$ sublattice sector the fitted quantity is $|S(T)|^2=Pe^{2\gamma T}+Q+Re^{-2\gamma T}$, which is exact in the linear regime for a position-only start because the two $k=1$ roots share the imaginary part $-\Omega/m_s$; for the $k=2$ sector the model carries the four roots $\pm\sqrt{s_1},\pm\sqrt{s_2}$ of (5.4). Every perturbation was applied as a position displacement $\epsilon\boldsymbol\delta_j$ with no velocity change (Section 9's "mixture" option), except the boost, which adds $\epsilon\rho\Omega\,\hat{\mathbf x}$ to every velocity.

### 10.2 WR-0: the unperturbed balanced ring

| $x$ | regime | rtol | termination | periods | radius drift | $H$ drift | $\min\lvert\det M\rvert$ | member speed (initial, max) | symmetry breaking $>10^{-8}$, $>10^{-3}$ (periods) | seeded growth rate / predicted fastest | first event |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $1.7$ | subfield, $M>0$ | $10^{-12}$ | final time | $20$ | ring lost (see text) | $1.4\times10^{-8}$ | $2.65$ | $0.5185$, $4.23$ | $2.46$, $4.10$ | $0.34234$ / $0.342339$ | speed, member 1 rising through $c_f$ at $T=102.4$ ($4.97$ periods) |
| $1.7$ | | $10^{-10}$ | escape $(2,3)$ | $19.92$ | | $1.3\times10^{-4}$ | $2.67$ | $0.5185$, $11.98$ | $2.55$, $4.19$ | $0.34234$ / $0.342339$ | speed, member 3 at $T=104.5$ |
| $0.8$ | subfield, $M$ indefinite | $10^{-12}$ | step underflow | $1.646$ | ring lost | $0.16$ at the stop | $8.05$ (never small) | $0.7559$, $4.5\times10^{4}$ | $0.82$, $1.32$ | $3.4315$ / $3.4311$ | speed, member 0 at $T=10.45$ ($1.57$ periods) |
| $0.8$ | | $10^{-10}$ | step underflow | $1.866$ | | large at the stop | $8.05$ | $0.7559$, $1.8\times10^{5}$ | $1.03$, $1.55$ | $3.4309$ / $3.4311$ | speed at $T=11.91$ |
| $x_\ast$ | equality, inclusive | $10^{-12}$ | step underflow | $3.325$ | ring lost | $0.07$ at the stop | $66.8$ | $1$ exactly, $4.8\times10^{4}$ | $1.05$, $1.77$ | $3.6429$ / $3.6430$ | none recorded (speed recording off) |
| $x_\ast$ | | $10^{-10}$ | step underflow | $3.712$ | | large at the stop | $65.3$ | $1$, $2.7\times10^{5}$ | $1.30$, $2.02$ | $3.6450$ / $3.6430$ | none |
| $0.3$ | superfield, unrestricted | $10^{-12}$ | step underflow | $4.793$ | ring lost | $0.06$ at the stop | $136$ | $1.2344$, $6.6\times10^{4}$ | $0.96$, $1.57$ | $4.8913$ / $4.8866$ | speed, member 0 falling through $c_f$ at $T=7.28$ |
| $0.3$ | | $10^{-10}$ | step underflow | $4.897$ | | large at the stop | $133$ | $1.2344$, $3.0\times10^{5}$ | $1.00$, $1.61$ | $4.8804$ / $4.8866$ | speed at $T=7.44$ |

Reading the table. At every radius the ring, started exactly on the balanced state, holds its shape only while round-off has not yet been amplified: the radii, the six separations and $\det M$ stay at their balanced values to the integrator's accuracy, and the sum of velocities and total moment are conserved to $10^{-11}$ and $10^{-9}$. The symmetry-breaking amplitude (largest of the elliptic, shear, sublattice, warp and tilt sector amplitudes, in units of $\rho$) climbs from round-off at a clean exponential rate measured by linear regression of its logarithm between $10^{-12}$ and $10^{-5}$; the measured rate agrees with the fastest growth rate of Section 5.3 to $2\times10^{-5}$ at $x=1.7$ (shear–elliptic root, $1.122\,\Omega$) and to $10^{-4}$–$10^{-3}$ at the three smaller radii (the fast $k=2$ root, which for $x<1$ is real and large: $3.63\,\Omega$ at $x=0.8$). The ring is therefore lost after about $2.5$ periods at $x=1.7$ (amplitude $10^{-8}$) and after $0.8$–$1$ period at $x\le0.8$, in both tolerances. The $H$ drift column reports the instrument's monitored energy function (6.1): it is conserved to $10^{-8}$ before and through the breakup at $x=1.7$, and is lost only in the final approach to the collapse described next at $x<1$, where the integrator is no longer accurate.

> Claim grade: measured, by the subject instrument on exactly these eight runs. Survival of the balanced ring as a ring is a finite interval of about $2.5$ rotation periods at $x=1.7$ and about one period at $x\le0.8$, set by round-off amplified at the Section 5.3 rate; this is not persistence and not its absence as a statement about the exact solution, which is a solution at every radius (Section 4). Falsifier: rerunning WR-0 with the recorded settings and obtaining a symmetry-breaking amplitude that stays below $10^{-8}$ for more than five periods at $x=1.7$, or a seeded growth rate differing from $0.3423$ by more than $10^{-3}$.

### 10.3 Rate comparison at amplitude $10^{-6}\rho$

Each run was integrated for three periods or to its first stopping event; the fit window is the early part in which the applied sector amplitude stays below $10\epsilon$ (first column) or $100\epsilon$ (second column), or, for the stable sectors, until the round-off-seeded unstable sectors reach $10^{-3}$ of the applied amplitude. Rates are in units of $c_f^3/K$; relative differences are (measured $-$ predicted)/predicted at rtol $10^{-12}$, with the rtol $10^{-10}$ refinement in brackets where it differs materially.

| Case | $x$ | sector, quantity | predicted (Sections 4–5) | measured, window $10\epsilon$ | relative difference | window $100\epsilon$ |
| --- | --- | --- | --- | --- | --- | --- |
| WR-6 sublattice | $1.7$ | $k=1$ growth $\sqrt{-(\Omega^2+m_sk_s)}/m_s$ | $0.3187960589$ | $0.3187960588$ | $-2.2\times10^{-10}$ [$-6\times10^{-11}$] | $+2.8\times10^{-9}$ |
| | | phase rate $\Omega/m_s$ | $0.166508$ | $0.1783$ (late half of window) | $7\%$ (window too short for the phase) | $0.1678$, $0.75\%$ |
| WR-7a elliptic | $1.7$ | $k=2$ growth $\sqrt{s_1}$ | $0.3423386901$ | $0.3423386901$ | $-5.5\times10^{-12}$ | $-1.9\times10^{-9}$ |
| | | $k=2$ oscillation $\sqrt{-s_2}$ | $0.8634888159$ | $0.8634888159$ | $+5.6\times10^{-12}$ | $-6\times10^{-10}$ |
| WR-7b shear | $1.7$ | $k=2$ growth | $0.3423386901$ | $0.3423386910$ | $+2.5\times10^{-9}$ [$-9\times10^{-11}$] | $+2.0\times10^{-9}$ |
| | | $k=2$ oscillation | $0.8634888159$ | $0.8634887490$ | $-7.7\times10^{-8}$ | $+1.7\times10^{-7}$ |
| WR-6 sublattice | $0.8$ | $k=1$ growth | $0.8396456240$ | $0.8396455883$ | $-4.2\times10^{-8}$ | $+2.6\times10^{-4}$ (window already nonlinear) |
| WR-7a elliptic | $0.8$ | $k=2$ fast growth $\sqrt{s_2}$ | $3.431079319$ | $3.431079309$ | $-3.1\times10^{-9}$ | $-1.9\times10^{-7}$ |
| | | $k=2$ slow growth $\sqrt{s_1}$ | $0.8631738541$ | $0.8631744044$ | $+6.4\times10^{-7}$ (14 samples) | $+1.2\times10^{-4}$ |
| WR-7b shear | $0.8$ | $k=2$ fast growth | $3.431079319$ | $3.431079333$ | $+3.9\times10^{-9}$ | $-1.6\times10^{-8}$ |
| | | $k=2$ slow growth | $0.8631738541$ | $0.8631738603$ | $+7.2\times10^{-9}$ | $-5.2\times10^{-8}$ |
| WR-2 warp | $1.7$ / $0.8$ | $\omega_{\mathrm w}=\sqrt{\sqrt2K/\rho^3}$ | $0.5365177775$ / $1.6619674678$ | $0.5365177775$ / $1.6619674678$ | $-4.3\times10^{-12}$ / $-4.4\times10^{-12}$ | — |
| WR-3 tilt | $1.7$ / $0.8$ | $\Omega$ | $0.3050250100$ / $0.9448738974$ | $0.3050250100$ / $0.9448738970$ | $+1.2\times10^{-11}$ / $-4.0\times10^{-10}$ | — |
| WR-4a translation | $1.7$ / $0.8$ | phase rate of the $k=1$ translation amplitude, $\Omega$; modulus constant | $0.3050250100$ / $0.9448738974$ | $0.3050250100$ / $0.9448738976$; modulus $1\pm3\times10^{-9}$ | $+2.6\times10^{-10}$ / $+1.9\times10^{-10}$ | — |
| WR-4b boost | $1.7$ / $0.8$ | linear growth of the modulus at $\epsilon\rho\Omega$ (Jordan block) | $5.185425169\times10^{-7}$ / $7.558991179\times10^{-7}$ | $5.185425172\times10^{-7}$ / $7.558991179\times10^{-7}$ | $+5.9\times10^{-10}$ / $-2.6\times10^{-12}$ | — |
| WR-5 rotation phase | $1.7$ / $0.8$ | breathing component oscillates at $\omega_{\mathrm{br}}$ (5.2) | $0.2735177300$ / $0.7669575116$ | $0.2735177287$ / $0.7669608505$ | $-4.6\times10^{-9}$ / $+4.4\times10^{-6}$ | — |
| WR-1 breathing | $1.7$ / $0.8$ | $\omega_{\mathrm{br}}$ (5.2), offset $2\epsilon$ | $0.2735177300$ / $0.7669575116$ | $0.2735235363$ / $0.7669737252$ | $+2.1\times10^{-5}$ / $+2.1\times10^{-5}$ | — |

Every growth and oscillation rate of the two unstable sectors is reproduced to better than $10^{-7}$ relative on the $10\epsilon$ window at both radii (to $10^{-9}$ or better at $x=1.7$), the one exception being the slow elliptic root at $x=0.8$ fitted on only 14 samples ($6\times10^{-7}$, still inside the target); the fast root there, $3.63\,\Omega$, is recovered to $3\times10^{-9}$; the oscillatory and neutral sectors are reproduced to $10^{-10}$–$10^{-12}$. The one case that misses the target is the position-only breathing displacement, at $2\times10^{-5}$: that start changes the family radius by $2\epsilon$ and the rotation phase then drifts linearly (the Jordan block of Section 5.3), and the radial projection carries the second-order term $-\rho\,\delta\varphi^2/2$ of that drift, which over two periods reaches $10^{-4}$ of the signal and is not in the fitted model (fit residual $1.1\times10^{-4}$, against $10^{-10}$ or better for every other fit). The rotation-phase case excites the same breathing frequency through a radial velocity instead and recovers (5.2) to $5\times10^{-9}$, so the breathing frequency itself is confirmed; a quadratic term in the model would remove the residual and was not added within this round. The sublattice phase rate $\Omega/m_s$ is recovered only to $0.75\%$, because the phase of a two-root mixture settles to the growing root's value only after several $e$-foldings and the window ends before that; it is reported as a weak check of the imaginary part of (5.3), not as a disagreement. The sign of the phase rate is $-\Omega/m_s$ in the runner's Fourier convention $a_j=A\,\omega^{jk}$, which is the convention of Section 3.1.

> Claim grade: measured, by the subject instrument with the runner's fitter on exactly these runs. What it establishes: the rotating-frame linearization (5.1) and the sector roots of Section 5.3 describe the instrument's early-time dynamics to the stated precision at $x=1.7$ and $x=0.8$, including the indefinite-$M$ radius where the elliptic sector has two real growth rates. Same-lane caveat: the predicted numbers were computed in this lane from this document's closed forms; the instrument shares no code with the derivation, but an independent derivation is the separate blind lane. Falsifier: a rerun at the recorded settings whose $10\epsilon$-window growth rate differs from the Section 5.3 value by more than $10^{-6}$ relative, or a fit residual above $10^{-8}$ for an unstable-sector case.

### 10.4 First events and fate at amplitude $10^{-3}\rho$

Each run went to its first stopping event, to 20 periods, or to the step cap. The first recorded event in every run at $x=1.7$ is a member of the forming tight pair rising through $c_f$; no contact, obstruction or escape event occurred before it, and $\det M$ never fell below $2.6$ at $x=1.7$ or below $7.9$ at $x=0.8$, so the acceleration solve was never obstructed. Times are in units of $K/c_f^3$; $P=20.60$ at $x=1.7$ and $6.65$ at $x=0.8$.

| Case | $x$ | first event (rtol $10^{-12}$), time | refinement agreement on that time | termination | minimum pair separation (pair, time) | final configuration, rtol $10^{-12}$ / $10^{-10}$ |
| --- | --- | --- | --- | --- | --- | --- |
| WR-1 breathing | $1.7$ | speed, member 1, $T=103.9$ (5.0 periods) | $5.2$ (round-off seeded) | escape $(2,3)$ at 19.3 periods / final time | $0.028$ $(0,1)$ at $T=387$ | binary $(0,1)$ at $0.15$, members 2 and 3 unbound at $900$ / binary $(2,3)$ at $0.42$ with $(0,1)$ at $122$: not two bounded binaries |
| WR-2 warp | $1.7$ | speed, member 0, $T=109.0$ | $2\times10^{-12}$ | final time, 20 periods | $0.041$ $(0,1)$ at $T=117$ | two opposite-polarity binaries $(0,1)$, $(2,3)$ at $0.06$–$4.8$, centres $466$ apart and receding (same in both tolerances) |
| WR-3 tilt | $1.7$ | speed, member 1, $T=48.0$ (2.3 periods) | $2.5\times10^{-8}$ | step cap at 7.9 / 5.8 periods | $0.011$ $(0,1)$ at $T=108$ | binary $(0,1)$ at $0.06$; $(2,3)$ at $516$: not paired (both tolerances) |
| WR-4a translation | $1.7$ | speed, member 1, $T=107.1$ | $1.4$ (round-off seeded) | step cap at 13.9 / 18.6 periods | $0.019$ $(2,3)$ at $T=258$ | binary $(2,3)$ at $0.04$, the rest at $280$–$650$: not paired / binary $(0,1)$, not paired |
| WR-4b boost | $1.7$ | speed, member 3, $T=103.2$ | $2.8$ (round-off seeded) | final time, 20 periods | $0.067$ $(0,3)$ at $T=104$ | two binaries $(0,3)$ at $26$ and $(1,2)$ at $0.10$, centres $380$ apart and receding / two binaries $(0,1)$, $(2,3)$ |
| WR-5 rotation phase | $1.7$ | speed, member 2, $T=106.5$ | $3.7$ (round-off seeded) | final time, 20 periods | $0.054$ $(2,3)$ at $T=107$ | two binaries $(0,1)$ at $2.5$ and $(2,3)$ at $0.49$, centres $511$ apart / two binaries $(0,3)$, $(1,2)$ |
| WR-6 sublattice | $1.7$ | speed, member 0, $T=21.4$ (1.04 periods) | $3\times10^{-11}$ | step cap at 13.1 periods / final time | $0.024$ $(0,1)$ at $T=217$ | binary $(0,1)$ at $0.025$–$0.05$; $(2,3)$ at $591$–$933$: not paired (both) |
| WR-7a elliptic | $1.7$ | speed, member 2, $T=27.7$ (1.35 periods) | $4\times10^{-9}$ | step cap at 1.85 periods / escape $(0,2)$ at 16.9 periods | $0.0020$ $(1,2)$ at $T=38$ (speed $25\,c_f$) | binary $(1,2)$ at $0.006$ with $(0,3)$ at $57$ / binary $(0,3)$ at $0.2$ with $(1,2)$ at $960$: not paired |
| WR-7b shear | $1.7$ | speed, member 1, $T=20.5$ (1.0 period) | $5\times10^{-10}$ | step cap at 13.7 periods / final time | $0.0026$ $(2,3)$ at $T=33$ (speed $20\,c_f$) | two binaries $(0,1)$ at $0.6$ and $(2,3)$ at $0.8$, centres $390$ apart and receding (both tolerances) |
| all nine | $0.8$ | speed, one member rising through $c_f$, at $0.3$–$1.7$ periods ($T=1.9$–$11.1$) | $10^{-12}$–$10^{-9}$ for unstable-sector starts; $0.04$–$0.33$ for stable-sector starts | step underflow or step cap at $0.36$–$1.75$ periods | a like-polarity pair, $(0,2)$ or $(1,3)$, at $3\times10^{-5}$ (rtol $10^{-12}$) and $7\times10^{-6}$ (rtol $10^{-10}$), still closing | one like-polarity pair collapsing with member speeds $4\times10^{4}$–$2\times10^{5}\,c_f$; the other like pair at $1.6$–$1.96$; adjacent pairs at $0.85$–$0.98$; not paired |

Pairing diagnosis. The rule, fixed in the record before the runs, labels a final window as two opposite-polarity binaries when the matching with the smallest sum of pair separations is the same at every state of the window, both pairs are opposite polarity, the larger pair separation is at most a quarter of the smallest pair-centre distance, and the pair-centre distance grows across the window. At $x=1.7$ the label is identical in the two tolerances for every case; four of nine cases (warp, boost, rotation phase, shear) end as two opposite-polarity binaries receding from one another, and five end as one tight opposite-polarity binary (separation $0.01$–$0.15$, member speeds $4$–$25\,c_f$) with the other two members unbound and hundreds of length units apart, in two of them with one escape event at $r=10^3$ recorded. The partition into pairs is not reproducible across tolerances in the round-off-seeded cases (boost and rotation phase pair $(0,3),(1,2)$ at one tolerance and $(0,1),(2,3)$ at the other), which is the expected signature of a dynamics that is deterministic but exponentially sensitive after the linear stage. At $x=0.8$ no case pairs: the elliptic direction, which is the direction of the negative eigenvalue of $M$ for $x<1$ and the direction of the fast real root $3.63\,\Omega$ of (5.4), drives one like-polarity pair together, that pair's separation falls through $10^{-5}$ with member speeds above $10^{4}\,c_f$, and the integrator underflows before the contact threshold $10^{-6}$ is reached; the first recorded event is the speed crossing shortly before. The like pair at $x=0.8$ starts at separation $2\rho=1.6$, inside the radius $r=2K/c_f^2$ at which the pair determinant $1-2K/(c_f^2r)$ of the instrument note changes sign, which is where the like pair's radial response reverses; the measured collapse is consistent with that reversal, and the same collapse ended the WR-0 runs at $x_\ast$ and $x=0.3$.

> Claim grade: measured, by the subject instrument on exactly these 36 runs, each to its recorded stop; the refinement at rtol $10^{-10}$ reproduces every first-event time to better than $10^{-8}$ when the perturbation lies in an unstable sector and to $1$–$5$ time units when the breakup is seeded by round-off. What is established: within 20 periods at $x=1.7$ the ring under this law does not persist and does not reliably pair into two bounded opposite-polarity binaries; the measured fates are either two receding binaries or one tight binary with two unbound members. The derived expectation of Section 9, pairing into two opposite-polarity binaries, is confirmed as the first stage (a tight opposite-polarity pair always forms first, at the closing pair selected by the shear or sublattice growth) and not confirmed as the end state. At $x<1$ the fate is a like-polarity pair collapse with unbounded speeds, not pairing. Inferred: that the step underflow at $x<1$ marks a finite-time singularity of the law rather than an integrator limitation; the evidence is the monotone fall of the separation through $10^{-5}$ with speeds rising past $10^{5}\,c_f$ at both tolerances. Falsifier: a rerun at $x=0.8$ in which the like-pair separation turns around above $10^{-4}$, or an $x=1.7$ rerun in which the ring survives 20 periods at amplitude $10^{-3}$. Not established: anything about times beyond the recorded stops, about the delayed canonical Master Equation, or about other member counts.

### 10.5 WR-8: breathing at amplitude $10^{-2}\rho$ and the reduced energy

The ring at $x=1.7$ was started with every radius scaled by $1.01$ and the velocities unchanged, and integrated for 20 periods at both tolerances. While the motion remained in the symmetric sector, which lasted until $T=56.9$ ($2.76$ periods, rtol $10^{-12}$) when the largest symmetry-breaking sector amplitude first exceeded $10^{-8}\rho$ (round-off seeded, as in WR-0), the reduced energy $E_{\mathrm{red}}$ of (6.3), computed by the runner from the mean radius, mean radial speed and $\ell=\sum_j(\mathbf X_j\times\mathbf V_j)_z$, was constant to $1.4\times10^{-14}$ relative and $\ell$ to $7\times10^{-15}$; the four radii agreed to $3.5\times10^{-8}$ throughout that interval. The radius oscillated between $1.7170$ and $1.7517$; the turning points predicted from (6.3) as the roots of $\ell^2/(8\rho^2)-(2\sqrt2-1)K/\rho=E_{\mathrm{red}}$ are $1.717000$ and $1.751687$, matched to $10^{-14}$ at the inner turning point and to $2\times10^{-8}$ at the outer one, the latter being the spacing of the recorded states near the maximum. The breathing frequency fitted on the symmetric interval is $0.26596$, which is $2.8\%$ below the linear value (5.2) at $\rho=1.7$ and $1.2\times10^{-4}$ below the linear value at the family radius $\rho_0=\ell^2/(4(2\sqrt2-1)K)=1.7342$ about which this orbit actually oscillates, the remainder being the finite-amplitude shift. After the symmetry-breaking amplitude passed $10^{-3}$ at $T=92.7$ the run followed the WR-0 pattern (first speed crossing at $T=111$, one tight binary and two unbound members at 20 periods); $E_{\mathrm{red}}$ is not defined off the symmetric sector and its later values are not reported as a drift.

> Claim grade: measured, by the subject instrument and the runner's projection on these two runs. It confirms by evolution the two items Section 6 left unchecked: the first integral (6.3) is conserved along a symmetric breathing history, and the turning points are those of the control with the same $(E_{\mathrm{red}},\ell)$. The Lyapunov stability within the symmetric sector is confirmed only for as long as the history stays symmetric, which numerically is about three periods; the symmetric sector is invariant for the exact dynamics but is left by round-off at the Section 5.3 rate. Falsifier: a symmetric start along which $E_{\mathrm{red}}$ drifts by more than $10^{-10}$ relative before the symmetry-breaking amplitude reaches $10^{-8}$.

### 10.6 Anomalies and limits

1. The breathing-displacement fit (WR-1) misses the $10^{-6}$ rate target by the second-order phase-drift term described in 10.3; the rotation-phase case recovers the same frequency to $5\times10^{-9}$.
2. Several $10^{-3}$ runs at $x=1.7$ ended at the step cap between $1.85$ and $14$ periods rather than at 20 periods, because a tight binary with members above $c_f$ crosses the speed boundary on every orbit and each crossing is located by re-stepping; the caps are recorded per run. The cap was lowered from 40,000 to 15,000 after the first three cases when the sandbox's per-call time limit was found; this changes where those runs stop, not what they measure before stopping.
3. The $x=0.8$, $x_\ast$ and $x=0.3$ runs end in step underflow rather than at a declared event; the instrument's contact threshold $10^{-6}$ was not reached because the step fell below its minimum first. The approach is reported with its last recorded separation and speed, and its interpretation as a finite-time singularity is graded inferred.
4. At $x=0.8$ the $100\epsilon$ windows of the $k=1$ and elliptic fits are already nonlinear (residuals $10^{-4}$), because the fast root reaches $100\epsilon$ in $1.3$ time units; the $10\epsilon$ windows carry the comparison there.
5. The instrument summaries' $H$ drift for the $x=1.7$ runs is $10^{-8}$–$10^{-5}$ and up to $1.3\times10^{-4}$ in the WR-0 refinement, dominated by the tight-binary phase; the sector fits use only the early windows, where the drift is below $10^{-10}$.

Resume point for a later round: add a quadratic column to the breathing fit, rerun the three capped $x=1.7$ cases with speed recording off for the long-time fate, and hand the sector roots to the blind lane for the independent check that this section does not provide.


## Evidence path promotion, 2026-10-05

The linked scratch files `.tmp/weber-overnight/round2/ring/ring-checks.mjs`, `.tmp/weber-overnight/round2/ring/ring-checks-output.txt` were moved byte-identically to the durable paths now linked above. The [closeout promotion map](../../binary-research/analysis/weber-overnight-closeout-verification.md#part-3--promotion-map) records each old path, new path and SHA-256. Historical command text and receipt content retain their recorded paths; ignored scratch aliases preserve those provenance-bound paths without making them the durable owner.


### Durable copies of recorded scratch inputs

Recorded command and provenance text retain their original paths. Byte-identical durable owners are [ring-checks.mjs](../../binary-research/evidence/weber-overnight-promoted/round2/ring/ring-checks.mjs), [ring-checks-output.txt](../../binary-research/evidence/weber-overnight-promoted/round2/ring/ring-checks-output.txt). The [promotion map](../../binary-research/analysis/weber-overnight-closeout-verification.md#part-3--promotion-map) records hashes and the retained scratch aliases.
