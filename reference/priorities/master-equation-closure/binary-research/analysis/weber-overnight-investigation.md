# Instantaneous Weber-inspired pair: reduction, invariants and orbit classes

Status: subject derivation drafted by the weber-overnight reduction worker, with PI sections and a corrections addendum added in the continuation run of 2026-10-05. Independently adjudicated (Sections 8 and 13 of the [adjudication document](weber-overnight-independent-adjudication.md)). The [frozen checkpoint synthesis](#frozen-checkpoint-synthesis-pi-2026-10-05t1531z) of 15:31Z carries the verdicts: binary GO, four-member ring NO GO; it is the integration source for Codex. Original sections are superseded in part by the closing [addendum](#addendum-corrections-after-the-final-hour-assessment-2026-10-05) as marked.

This document is the subject derivation for the isolated pair under one fixed, instantaneous, Weber-inspired acceleration law. It derives the implicit acceleration solve, the mathematical invariants of the law, the zero-coefficient control in closed form, the exact circular histories with their stability, and a global classification of planar pair histories by their invariants. The radial (collinear) part is developed in its own focused source, the [collinear approach analysis](../../collinear-research/analysis/weber-overnight-collinear-approach.md), which relies on Sections 2–5 here. Section 10 lists closed-form predictions for a separately written Cartesian instrument. Every claim concerns this one adapted law and an isolated pair; nothing here is a claim about the delayed canonical Master Equation, about binding in nature, or about the historical Weber law.

## Contents

1. [The law and the case specification](#1-the-law-and-the-case-specification)
2. [Present-separation kinematics](#2-present-separation-kinematics)
3. [The implicit acceleration solve for an isolated pair](#3-the-implicit-acceleration-solve-for-an-isolated-pair)
4. [Invariants and variational structure](#4-invariants-and-variational-structure)
5. [The reduced radial equation and its first integral](#5-the-reduced-radial-equation-and-its-first-integral)
6. [Zero-coefficient control in closed form](#6-zero-coefficient-control-in-closed-form)
7. [Opposite polarity in the plane](#7-opposite-polarity-in-the-plane)
8. [Like polarity in the plane](#8-like-polarity-in-the-plane)
9. [Speed-domain coverage](#9-speed-domain-coverage)
10. [Closed-form predictions for a Cartesian instrument](#10-closed-form-predictions-for-a-cartesian-instrument)
11. [Validation record](#11-validation-record)
12. [Claims, falsifiers, inferences and open questions](#12-claims-falsifiers-inferences-and-open-questions)
13. [Source attribution (PI)](#source-attribution-pi)
14. [Measured runs (continuation run)](#measured-runs-continuation-run-2026-10-05)
15. [Independent adjudication](#independent-adjudication-reference-fixed-at-0300z-subject-adjudicated-1520z)
16. [Frozen checkpoint synthesis (PI)](#frozen-checkpoint-synthesis-pi-2026-10-05t1531z)
17. [Run record (PI)](#run-record-pi)
18. [Addendum: corrections after the final-hour assessment](#addendum-corrections-after-the-final-hour-assessment-2026-10-05)
19. [Addendum: corrections to the frozen checkpoint](#addendum-corrections-to-the-frozen-checkpoint-2026-10-05t1550z)

## Notation

| Symbol | Meaning |
| --- | --- |
| $T$ | absolute time; dots denote $d/dT$ |
| $\mathbf X_i,\ \mathbf V_i,\ \mathbf A_i$ | position, velocity and acceleration of member $i$ in the void (absolute) frame |
| $\boldsymbol\rho=\mathbf X_1-\mathbf X_2$, $r=\|\boldsymbol\rho\|$, $\mathbf e=\boldsymbol\rho/r$ | relative position, present separation and unit separation direction of a pair |
| $\mathbf w=\mathbf V_1-\mathbf V_2$ | relative velocity |
| $\dot r,\ \ddot r$ | first and second absolute-time derivatives of the present separation |
| $\mathbf w_\perp=\mathbf w-\dot r\,\mathbf e$ | transverse part of the relative velocity |
| $\mathbf h=\boldsymbol\rho\times\mathbf w$, $h=\|\mathbf h\|=r\|\mathbf w_\perp\|$ | relative angular momentum per unit weight and its magnitude |
| $\mathbf V_c=(\mathbf V_1+\mathbf V_2)/2$ | centre-of-velocity velocity (unit weights) |
| $\sigma=\operatorname{sign}(q_1q_2)$ | polarity sign: $-1$ opposite polarity (attraction target), $+1$ like polarity (control) |
| $K>0$ | equal fixed coupling, dimension $L^3T^{-2}$ |
| $c_f$ | wake speed, set to $1$ in every numerical value |
| $\lambda_{\mathrm W},\ \mu_{\mathrm W}$ | response coefficients; frozen at $-1/2$ and $1$ |
| $k=2K$ | effective coupling of the relative motion |
| $\kappa=2K/c_f^2=k/c_f^2$ | the length at which the frozen like-polarity solve fails |
| $a=2\sigma K\mu_{\mathrm W}/c_f^2$ | signed singular length of the general pair solve; $a=\sigma\kappa$ when $\mu_{\mathrm W}=1$ |
| $x=rc_f^2/K$ | dimensionless separation |
| $\Delta(r)=1-a/r$ | determinant of the pair acceleration matrix |
| $\varepsilon$ | first integral of the frozen relative motion, eq. (5.4) |
| $V_{\mathrm{eff}}(r)=h^2/(2r^2)+\sigma k/r$ | effective potential of the relative motion |
| $R=r/2$ | half-separation used in the [binary manuscript](../manuscript.md) mirror frame |

## 1. The law and the case specification

The law changes the strength of a radial inverse-square acceleration according to how the present separation is changing. It acts instantaneously: each member responds to the other member's present position, with no causal delay. For members $i\ne j$ with present separation $r>0$,

$$
\mathbf A_{i\leftarrow j}=\frac{\sigma_{ij}K_{ij}}{r^2}\left[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}+\mu_{\mathrm W}\frac{r\ddot r}{c_f^2}\right]\mathbf e_{ij},\qquad
\mathbf A_{j\leftarrow i}=-\mathbf A_{i\leftarrow j},\qquad
\mathbf X_i''=\sum_{j\ne i}\mathbf A_{i\leftarrow j}
\tag{1.1}
$$

where $\mathbf e_{ij}=(\mathbf X_i-\mathbf X_j)/r$. This is the boxed family of [Section 9 of the equation-variant manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response). The case examined here has $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$, normalized $c_f=1$ in numerical values, equal coupling $K_{ij}=K$ (numerically $K=1$, so lengths are in units of $K/c_f^2$), two members, no self term, and unit integration weights: every member receives the full acceleration, because architrinos have no mass. Opposite polarity is the attraction target and like polarity is a control. The zero-coefficient case $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$ is the instantaneous inverse-square control; it is not the delayed canonical Master Equation. Speed domains (unrestricted, inclusive ceiling $\|\mathbf V_i\|\le c_f$, strict ceiling $\|\mathbf V_i\|<c_f$) are admissibility labels only. No clamp, projection, braking multiplier, softened core or boundary response is used, and no branch is selected past a singular acceleration matrix. Derivations keep $K$, $c_f$, $\lambda_{\mathrm W}$ and $\mu_{\mathrm W}$ symbolic where that is cheap and specialize afterwards.

The law is *implicit*. The factor $\ddot r$ contains the accelerations being computed, so the accelerations must be found by solving a linear system at every instant. Sections 2 and 3 set that system up and solve it.

## 2. Present-separation kinematics

The separation $r=\|\boldsymbol\rho\|$ changes because the members move relative to each other. Only the component of relative velocity along the separation changes its length; the transverse component turns the separation direction. Differentiating $r^2=\boldsymbol\rho\cdot\boldsymbol\rho$ once gives $r\dot r=\boldsymbol\rho\cdot\mathbf w$, so

$$
\dot r=\mathbf e\cdot\mathbf w .
\tag{2.1}
$$

The direction changes at the rate $\dot{\mathbf e}=(\mathbf w-\dot r\,\mathbf e)/r=\mathbf w_\perp/r$. Differentiating (2.1) once more,

$$
\ddot r=\dot{\mathbf e}\cdot\mathbf w+\mathbf e\cdot(\mathbf A_1-\mathbf A_2)=\frac{\|\mathbf w\|^2-\dot r^2}{r}+\mathbf e\cdot(\mathbf A_1-\mathbf A_2)=\frac{h^2}{r^3}+\mathbf e\cdot(\mathbf A_1-\mathbf A_2).
\tag{2.2}
$$

The first term is the familiar centripetal contribution of transverse relative motion; the second is the unknown. For several members the same identity holds pair by pair, with $\mathbf A_i-\mathbf A_j$ in place of $\mathbf A_1-\mathbf A_2$.

> Claim grade: derived. Equations (2.1)–(2.2) are exact for any twice-differentiable pair of paths with $r>0$. Falsifier: a smooth pair of paths for which the finite-difference second derivative of $r(T)$ disagrees with (2.2) beyond discretization error; check A in [checks.mjs](../evidence/weber-overnight-promoted/reduction/checks.mjs) found agreement to $1.5\times10^{-7}$ (central differences, step $10^{-4}$) on 20 random trigonometric-polynomial paths.

## 3. The implicit acceleration solve for an isolated pair

### 3.1 The six-unknown linear system

For an isolated pair the unknowns are the six components of $(\mathbf A_1,\mathbf A_2)$. Insert (2.2) into (1.1). Everything that does not involve the unknowns collects into the *known bracket*

$$
b=\frac{\sigma K}{r^2}\left[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}+\mu_{\mathrm W}\frac{h^2}{c_f^2r^2}\right],
\tag{3.1}
$$

and the remaining part of the $\mu_{\mathrm W}$ term is $(\sigma K\mu_{\mathrm W}/(c_f^2r))\,\mathbf e\,[\mathbf e\cdot(\mathbf A_1-\mathbf A_2)]$. Write the stacked unknown $\mathbf a=(\mathbf A_1,\mathbf A_2)\in\mathbb R^6$ and the stacked direction $\mathbf u=(\mathbf e,-\mathbf e)\in\mathbb R^6$, so that $\mathbf u\cdot\mathbf a=\mathbf e\cdot(\mathbf A_1-\mathbf A_2)$ and $\mathbf u\cdot\mathbf u=2$. With

$$
\alpha=\frac{\sigma K\mu_{\mathrm W}}{c_f^2r},
\tag{3.2}
$$

the two vector equations $\mathbf A_1=\mathbf A_{1\leftarrow2}$ and $\mathbf A_2=-\mathbf A_{1\leftarrow2}$ become

$$
M\mathbf a=b\,\mathbf u,\qquad M=I_6-\alpha\,\mathbf u\mathbf u^{\mathsf T}=
\begin{pmatrix} I_3-\alpha\,\mathbf e\mathbf e^{\mathsf T} & \alpha\,\mathbf e\mathbf e^{\mathsf T}\\ \alpha\,\mathbf e\mathbf e^{\mathsf T} & I_3-\alpha\,\mathbf e\mathbf e^{\mathsf T}\end{pmatrix}.
\tag{3.3}
$$

### 3.2 Determinant, inverse and radiality

$M$ is the identity plus a rank-one matrix, so the matrix determinant lemma, $\det(I+\mathbf p\mathbf q^{\mathsf T})=1+\mathbf q^{\mathsf T}\mathbf p$, gives

$$
\Delta\equiv\det M=1-\alpha\,\mathbf u\cdot\mathbf u=1-\frac{2\sigma K\mu_{\mathrm W}}{c_f^2r}=1-\frac{a}{r},\qquad a=\frac{2\sigma K\mu_{\mathrm W}}{c_f^2}.
\tag{3.4}
$$

When $\Delta\ne0$ the Sherman–Morrison formula gives $M^{-1}=I_6+\alpha\,\mathbf u\mathbf u^{\mathsf T}/\Delta$, hence $\mathbf a=b\,\mathbf u\,(1+2\alpha/\Delta)=(b/\Delta)\,\mathbf u$. Written per member,

$$
\mathbf A_1=f\,\mathbf e,\qquad \mathbf A_2=-f\,\mathbf e,\qquad
f=\frac{b}{\Delta}=\frac{\sigma K}{r(r-a)}\left[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}+\mu_{\mathrm W}\frac{h^2}{c_f^2r^2}\right].
\tag{3.5}
$$

This reproduces the pair identity stated in the equation-variant manuscript and is now derived as the unique solution of the full six-unknown system. Radiality and equal-and-opposite accelerations are *consequences*, not assumptions. The reason is geometric: $M$ acts as the identity on every direction orthogonal to $\mathbf u$, which includes all transverse components and the common direction $(\mathbf e,\mathbf e)$, and the right-hand side has no component there. So any solution has $\mathbf a$ parallel to $\mathbf u$.

> Claim grade: derived. For $r>0$ and $\Delta\ne0$, the isolated-pair solve has the unique solution (3.5); it is radial and satisfies $\mathbf A_1+\mathbf A_2=\mathbf 0$. Falsifier: a state for which the $6\times6$ matrix assembled directly from (1.1) has determinant different from $1-a/r$ or a solution not of the form $(f\mathbf e,-f\mathbf e)$. Check B assembled the matrix from the law as an affine residual map (not from (3.3)) at 400 random states with random $K$, both polarities, frozen and random $(\lambda_{\mathrm W},\mu_{\mathrm W})$: determinant agreement $4\times10^{-14}$ relative, solution agreement $5\times10^{-14}$, law residual $9\times10^{-14}$.

### 3.3 The invertibility domain

The determinant depends only on the sign of $\sigma\mu_{\mathrm W}$ and on $r$:

| Case | $\Delta(r)$ | Invertibility domain |
| --- | --- | --- |
| $\sigma\mu_{\mathrm W}<0$ (frozen opposite polarity: $\sigma=-1,\ \mu_{\mathrm W}=1$) | $1+2K\lvert\mu_{\mathrm W}\rvert/(c_f^2r)>1$ | every $r>0$; $\Delta\to+\infty$ as $r\to0$ |
| $\mu_{\mathrm W}=0$ | $1$ | every $r>0$ |
| $\sigma\mu_{\mathrm W}>0$ (frozen like polarity: $\sigma=+1,\ \mu_{\mathrm W}=1$) | $1-2K\lvert\mu_{\mathrm W}\rvert/(c_f^2r)$ | every $r\ne a=2K\lvert\mu_{\mathrm W}\rvert/c_f^2$; $\Delta<0$ for $0<r<a$ |

For the frozen coefficients the opposite-polarity pair is invertible at every positive separation, with $\Delta=1+\kappa/r\ge1$. The like-polarity pair fails at the single *critical radius* $r_c=\kappa=2K/c_f^2$, that is $x=2$, and its determinant is negative inside. If the sign of $\mu_{\mathrm W}$ were reversed the roles of the polarities would exchange.

### 3.4 The singular case and the approach to it

At $\Delta=0$ the vector $\mathbf u$ spans the kernel of $M$ and the range of $M$ is the orthogonal complement of $\mathbf u$. Then $M\mathbf a=b\mathbf u$ has *no* solution when $b\ne0$ and infinitely many, $\mathbf a=t\,\mathbf u$ for every real $t$, when $b=0$. In the second case the acceleration is radial and equal and opposite, but its magnitude is undetermined by the law. As $\Delta\to0$ along a state sequence with $b$ bounded away from zero, $|f|=|b|/|\Delta|\to\infty$. Section 8 and the [collinear analysis](../../collinear-research/analysis/weber-overnight-collinear-approach.md#4-like-polarity-the-critical-radius) show that actual like-polarity histories approaching $r_c$ have $b\to\pm\infty$ as well, with $|\dot r|\to\infty$ and $|f|\to\infty$ in finite time, except on one energy level where $b\to0$ and the limit is the indeterminate case.

> Claim grade: derived. The frozen opposite-polarity pair solve is regular at every $r>0$; the frozen like-polarity solve is singular exactly at $r=2K/c_f^2$, with no solution there unless $1-\dot r^2/(2c_f^2)+h^2/(c_f^2r^2)=0$, in which case every radial magnitude solves it. Falsifier: a regular solution of the like-polarity system at $r=2K/c_f^2$ with $b\ne0$, or a vanishing determinant for opposite polarity at some $r>0$.

## 4. Invariants and variational structure

The invariants in this section are mathematical properties of an adapted law with unit weights. They are not primitive physical energy, momentum or angular-momentum accounts of architrinos, and they carry no claim about what is conserved in nature or in the delayed canonical equation.

### 4.1 Sum of velocities, centre of velocity and angular momentum

Because every pair contribution satisfies $\mathbf A_{j\leftarrow i}=-\mathbf A_{i\leftarrow j}$ and is parallel to $\mathbf X_i-\mathbf X_j$, for any number of members and any $(\lambda_{\mathrm W},\mu_{\mathrm W})$, wherever the solve is regular,

$$
\frac{d}{dT}\sum_i\mathbf V_i=\sum_i\mathbf A_i=\mathbf 0,\qquad
\frac{d}{dT}\sum_i\mathbf X_i\times\mathbf V_i=\sum_{i<j}(\mathbf X_i-\mathbf X_j)\times\mathbf A_{i\leftarrow j}=\mathbf 0.
\tag{4.1}
$$

So the sum of velocities is constant and the centre of velocity $\frac1N\sum_i\mathbf X_i$ moves uniformly. For the pair, $\mathbf V_c$ is constant, and the relative angular momentum $\mathbf h=\boldsymbol\rho\times\mathbf w$ is constant because $\ddot{\boldsymbol\rho}=2f\mathbf e$ is parallel to $\boldsymbol\rho$. Relative motion is therefore planar whenever $\mathbf h\ne\mathbf 0$ and collinear when $\mathbf h=\mathbf 0$. The relative law depends only on relative variables, so it is invariant under Galilean boosts of the whole pair; the speed-domain labels, which use absolute velocities, are not (Section 9).

> Claim grade: derived. Falsifier: a regular state of any member count at which the solved accelerations have nonzero sum or nonzero total moment $\sum_i\mathbf X_i\times\mathbf A_i$. Check E found both below $4\times10^{-16}$ (relative) for 60 random four-member states with random polarities.

### 4.2 The frozen law is exactly Euler–Lagrange

Consider a velocity-dependent pair function $\Phi(r,\dot r)$ and the unit-weight function

$$
L=\sum_i\tfrac12\|\mathbf V_i\|^2-\sum_{i<j}\Phi_{ij}(r_{ij},\dot r_{ij}).
\tag{4.2}
$$

For one pair, $\partial\dot r/\partial\mathbf V_1=\mathbf e$ and $\partial\dot r/\partial\mathbf X_1=\mathbf w_\perp/r=\dot{\mathbf e}$. The Euler–Lagrange equation for $\mathbf X_1$ is $\frac{d}{dT}(\mathbf V_1-\Phi_{\dot r}\mathbf e)=-\Phi_r\mathbf e-\Phi_{\dot r}\dot{\mathbf e}$, and the two $\Phi_{\dot r}\dot{\mathbf e}$ terms cancel:

$$
\mathbf A_1=\left[\frac{d}{dT}\Phi_{\dot r}-\Phi_r\right]\mathbf e=\left[\Phi_{\dot r\dot r}\,\ddot r+\Phi_{\dot rr}\,\dot r-\Phi_r\right]\mathbf e.
\tag{4.3}
$$

Every such pair function yields a radial, equal-and-opposite acceleration linear in $\ddot r$. Matching (4.3) to (1.1) requires $\Phi_{\dot r\dot r}=\sigma K\mu_{\mathrm W}/(c_f^2r)$, so $\Phi=\frac{\sigma K\mu_{\mathrm W}}{2c_f^2r}\dot r^2+g(r)\dot r+\phi(r)$. Then $\Phi_{\dot rr}\dot r-\Phi_r=-\frac{\sigma K\mu_{\mathrm W}}{2c_f^2r^2}\dot r^2-\phi'(r)$; the $g$ terms cancel because $g(r)\dot r$ is a total derivative. Matching the remaining terms to $\frac{\sigma K}{r^2}(1+\lambda_{\mathrm W}\dot r^2/c_f^2)$ forces $\phi=\sigma K/r$ (up to a constant) and

$$
\lambda_{\mathrm W}=-\tfrac12\mu_{\mathrm W}.
\tag{4.4}
$$

The frozen pair $(\lambda_{\mathrm W},\mu_{\mathrm W})=(-1/2,1)$ satisfies (4.4), with

$$
\Phi(r,\dot r)=\frac{\sigma K}{r}\left(1+\frac{\dot r^2}{2c_f^2}\right).
\tag{4.5}
$$

Because each $\Phi_{ij}$ involves only members $i$ and $j$, the Euler–Lagrange equation of member $i$ under (4.2) is $\mathbf A_i=\sum_{j\ne i}[\ldots]\mathbf e_{ij}$ with each bracket the pair expression (4.3), in which $\ddot r_{ij}$ contains $\mathbf A_i$ and $\mathbf A_j$. That is exactly the summed law (1.1). So for every member count the frozen law is the Euler–Lagrange system of (4.2) with (4.5), and off the line (4.4) no pair function of $(r,\dot r)$ with unit weights reproduces it.

The associated energy function $E=\sum_i\mathbf V_i\cdot\partial L/\partial\mathbf V_i-L$ is

$$
E=\sum_i\tfrac12\|\mathbf V_i\|^2+\sum_{i<j}\frac{\sigma_{ij}K}{r_{ij}}\left(1-\frac{\dot r_{ij}^2}{2c_f^2}\right),
\tag{4.6}
$$

and it is constant along every regular history of the frozen law. The canonical momenta are $\mathbf P_i=\mathbf V_i-\sum_j\Phi_{ij,\dot r}\mathbf e_{ij}$; their sum is $\sum_i\mathbf V_i$ and their total moment is $\sum_i\mathbf X_i\times\mathbf V_i$, because the pair terms cancel. Translation, rotation and boost invariance of (4.2) therefore give back (4.1), and time-translation invariance gives (4.6).

> Claim grade: derived. The frozen law is exactly the Euler–Lagrange system of (4.2) with (4.5) for every member count; within pair functions of $(r,\dot r)$ with unit weights, that holds if and only if $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$. Falsifier: a regular four-member state at which (4.6) has nonzero time derivative under the frozen law, or at which the finite-difference Euler–Lagrange residual of (4.2) does not vanish. Check E: $dE/dT$ vanished to $4\times10^{-16}$ relative in 40 frozen four-member states, and the Euler–Lagrange residual to $1.3\times10^{-6}$ (second-order finite differences, step $10^{-4}$); at $\lambda_{\mathrm W}=-0.3$ the same $dE/dT$ was at least $10^{-3}$ relative, as expected off (4.4). The theorem does not exclude Lagrangians outside the stated class (non-unit weights, dependence on $\|\mathbf w\|$, multiplier forms); that broader inverse problem is not addressed.

### 4.3 The many-member acceleration matrix

The ring study needs the general solve, so it is stated here without analysing any ring. Collect all $3N$ acceleration components in $\mathbf a$. For each unordered pair $(i,j)$ let $\mathbf u_{ij}\in\mathbb R^{3N}$ hold $\mathbf e_{ij}$ in block $i$, $-\mathbf e_{ij}$ in block $j$ and zeros elsewhere, and let $\alpha_{ij}=\sigma_{ij}K\mu_{\mathrm W}/(c_f^2r_{ij})$. Repeating Section 3.1 pair by pair gives

$$
M_N\mathbf a=\sum_{i<j}b_{ij}\mathbf u_{ij},\qquad M_N=I_{3N}-\sum_{i<j}\alpha_{ij}\,\mathbf u_{ij}\mathbf u_{ij}^{\mathsf T}=I_{3N}-UDU^{\mathsf T},
\tag{4.7}
$$

with $b_{ij}$ the pair bracket (3.1) evaluated on pair $(i,j)$, $U$ the $3N\times P$ matrix of columns $\mathbf u_{ij}$ ($P=N(N-1)/2$) and $D=\operatorname{diag}(\alpha_{ij})$. Sylvester's determinant identity reduces the determinant to the pair space,

$$
\det M_N=\det\!\left(I_P-DG\right),\qquad G=U^{\mathsf T}U,\quad G_{(ij),(ij)}=2,\ \ G_{(ij),(il)}=\mathbf e_{ij}\cdot\mathbf e_{il},\ \ G_{(ij),(jl)}=-\mathbf e_{ij}\cdot\mathbf e_{jl},\ \ G=0\text{ for disjoint pairs}.
\tag{4.8}
$$

For the frozen law, $M_N$ is exactly the velocity Hessian $\partial^2L/\partial\mathbf V\partial\mathbf V$ of (4.2). Singularity of $M_N$ is therefore the failure of the Legendre condition, and positive definiteness of $M_N$ is strict convexity of $L$ in the velocities. $M_N$ is symmetric, so it is invertible exactly when it has no zero eigenvalue. Three criteria follow.

1. If every $\alpha_{ij}\le0$ (every pair has $\sigma_{ij}\mu_{\mathrm W}\le0$), then $UDU^{\mathsf T}$ is negative semidefinite, $M_N\succeq I$ and $\det M_N\ge1$. With three or more members this cannot hold for $\mu_{\mathrm W}\ne0$, because three members cannot be pairwise opposite in polarity.
2. In general $M_N\succeq I-\sum_{\alpha_{ij}>0}\alpha_{ij}\mathbf u_{ij}\mathbf u_{ij}^{\mathsf T}$, so $M_N$ is positive definite (hence invertible) whenever the largest eigenvalue of the like-pair part is below one. Since $\|\mathbf u_{ij}\|^2=2$, a sufficient condition is $2\sum_{\alpha_{ij}>0}\alpha_{ij}<1$.
3. If the pairs with $\alpha_{ij}>0$ share no member (their $\mathbf u_{ij}$ are mutually orthogonal), the like-pair part has eigenvalues $2\alpha_{ij}$, and a sufficient condition is that every such pair is separated by more than $2K\mu_{\mathrm W}/c_f^2$, the pair critical radius. An alternating four-member arrangement, whose two like pairs are disjoint, falls under this criterion; whether a given ring configuration meets it is left to the ring study.

The two-member scalar denominator $\Delta$ must not be transferred to a larger system: off these sufficient conditions the exact test is (4.8).

> Claim grade: derived. Falsifier: a four-member state at which the matrix assembled from (1.1) differs from (4.7), or whose determinant differs from (4.8). Check E: entrywise agreement $8\times10^{-16}$, determinant agreement $1.2\times10^{-14}$ relative, velocity-Hessian agreement $5\times10^{-8}$ (finite differences) over 60 random states.

### 4.4 A first integral for general coefficients

*Superseded in part by the addendum, item 5.*

Away from (4.4) the many-member law has no energy function of the form (4.6), but the isolated pair still has a first integral of its reduced radial motion. Section 5 shows the reduced equation has the form $\ddot r=\mathcal A(r)+\mathcal B(r)\dot r^2$. Treating $p=\dot r^2$ as a function of $r$ gives the linear equation $dp/dr=2\mathcal A+2\mathcal Bp$, which is integrable by quadrature with the integrating factor $I(r)=\exp(-\int2\mathcal B\,dr)$:

$$
I(r)\,\dot r^2-\int 2I(r)\mathcal A(r)\,dr=\text{const},\qquad I(r)=\left|1-\frac ar\right|^{-2\lambda_{\mathrm W}/\mu_{\mathrm W}}\ (\mu_{\mathrm W}\ne0),\qquad I(r)=e^{4\sigma K\lambda_{\mathrm W}/(c_f^2r)}\ (\mu_{\mathrm W}=0),
\tag{4.9}
$$

on any interval not containing $r=a$. For the frozen coefficients $I=\Delta=1-a/r$ and (4.9) reduces to (5.4). For radial motion ($h=0$) the integral takes the closed form (5.6).

> Claim grade: derived. Falsifier: a state at which $d(I\dot r^2)/dT\ne2I\mathcal A\dot r$ along the reduced flow. Check D: agreement to $1.4\times10^{-8}$ (finite differences) at 200 random states with random $(\lambda_{\mathrm W},\mu_{\mathrm W})$.

## 5. The reduced radial equation and its first integral

Substituting (3.5) into (2.2) with $\mathbf A_1-\mathbf A_2=2f\mathbf e$ gives $\ddot r=h^2/r^3+2f$. Over the common denominator $r^2(r-a)$ the terms in $\mu_{\mathrm W}h^2/r^3$ cancel exactly, leaving

$$
\ddot r=\frac{h^2+2\sigma Kr}{r^2(r-a)}+\frac{2\sigma K\lambda_{\mathrm W}}{c_f^2}\,\frac{\dot r^2}{r(r-a)}.
\tag{5.1}
$$

This is the form $\ddot r=\mathcal A(r)+\mathcal B(r)\dot r^2$ used in Section 4.4. The azimuth in the plane of motion obeys $\dot\theta=h/r^2$, and the relative path is $\boldsymbol\rho=r(\cos\theta,\sin\theta,0)$ in a frame with $\mathbf h$ along the third axis. For the frozen coefficients, with $k=2K$ and $\kappa=k/c_f^2$, the equation becomes

$$
\ddot r=\frac{h^2+\sigma kr-\sigma K r\dot r^2/c_f^2}{r^2(r-\sigma\kappa)}.
\tag{5.2}
$$

The frozen first integral is found from (4.6) in the centre-of-velocity frame, where $\mathbf V_1=\mathbf w/2=-\mathbf V_2$, or directly from (4.9). Define

$$
\Delta(r)=1-\frac{\sigma\kappa}{r},\qquad V_{\mathrm{eff}}(r)=\frac{h^2}{2r^2}+\frac{\sigma k}{r},
\tag{5.3}
$$

$$
\varepsilon=\tfrac12\Delta(r)\,\dot r^2+V_{\mathrm{eff}}(r)=2\left(E-\|\mathbf V_c\|^2\right).
\tag{5.4}
$$

Equation (5.4) is a one-degree-of-freedom energy with a *position-dependent radial weight* $\Delta(r)$, which is exactly the pair determinant (3.4). The effective potential $V_{\mathrm{eff}}$ is identical to that of the zero-coefficient control. The radial equation (5.2) is the Euler–Lagrange equation of $\tfrac12\Delta(r)\dot r^2-V_{\mathrm{eff}}(r)$, so turning points satisfy $V_{\mathrm{eff}}(r)=\varepsilon$, as in the control, while the speed at which the separation changes is rescaled:

$$
\dot r^2=\frac{2\left(\varepsilon-V_{\mathrm{eff}}(r)\right)}{\Delta(r)}.
\tag{5.5}
$$

For radial motion with general coefficients, setting $h=0$ in (5.1) gives $d(\dot r^2)/dr=4\sigma K(1+\lambda_{\mathrm W}\dot r^2/c_f^2)/(r(r-a))$, which separates:

$$
\left(1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}\right)\left|1-\frac ar\right|^{-2\lambda_{\mathrm W}/\mu_{\mathrm W}}=\text{const}.
\tag{5.6}
$$

The radial consequences of (5.4)–(5.6) are developed in the [collinear approach analysis](../../collinear-research/analysis/weber-overnight-collinear-approach.md).

> Claim grade: derived. Falsifier: a regular state at which (5.1) disagrees with $h^2/r^3+\mathbf e\cdot(\mathbf A_1-\mathbf A_2)$ computed from the full $6\times6$ solve, or at which (5.4) has nonzero derivative along the frozen flow. Check C: (5.1) agreed with the full solve to $10^{-13}$ relative at 400 states. Check D: $d\varepsilon/dT$ vanished to $1.6\times10^{-8}$ relative (finite differences) and $\varepsilon=2(E-\|\mathbf V_c\|^2)$ held to $4\times10^{-15}$; (5.6) was conserved to $8\times10^{-8}$.

## 6. Zero-coefficient control in closed form

With $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$ the solve is explicit ($\Delta=1$) and $\ddot{\boldsymbol\rho}=2\sigma K\mathbf e/r^2$. The relative motion with unit weights is an inverse-square central problem with effective coupling $k=2K$: each member receives $\sigma K/r^2$, so the separation receives twice that. The invariants are $\mathbf h$ and $\varepsilon_0=\tfrac12\|\mathbf w\|^2+\sigma k/r$. For opposite polarity ($\sigma=-1$) the standard closed forms of this control are:

- **Circular relation.** $\|\mathbf w\|^2=k/r$; individual speed in the centre-of-velocity frame $\|\mathbf V_i\|=\tfrac12\sqrt{k/r}=c_f/\sqrt{2x}$; angular rate $\Omega^2=k/r^3$.
- **Turning points from $(\varepsilon_0,h)$.** The roots of $\varepsilon_0r^2+kr-h^2/2=0$: for $-k^2/(2h^2)\le\varepsilon_0<0$, $r_{p,a}=A(1\mp e)$ with semi-major axis $A=k/(2|\varepsilon_0|)$ and eccentricity $e=\sqrt{1+2\varepsilon_0h^2/k^2}$; for $\varepsilon_0\ge0$, only the pericentre $r_p=\big(\sqrt{k^2+2\varepsilon_0h^2}-k\big)/(2\varepsilon_0)$ (and $r_p=h^2/(2k)$ at $\varepsilon_0=0$).
- **Radial period and semi-major axis.** $T_r=2\pi\sqrt{A^3/k}$, equal to the azimuthal period; apsidal angle exactly $\pi$; no precession.
- **Radial infall from rest at $r_0$.** Contact $r=0$ is reached at $t_0=\frac{\pi}{2}\sqrt{r_0^3/(2k)}$ with $|\dot r|\to\infty$; more generally the time to reach $r_1$ is $\sqrt{r_0^3/(2k)}\,\big[\arccos\sqrt{r_1/r_0}+\sqrt{(r_1/r_0)(1-r_1/r_0)}\big]$.
- **Maximum individual speed** on a bound orbit (centre of velocity at rest): $\tfrac12 h/r_p$ at pericentre.

For like polarity ($\sigma=+1$) every history disperses, with turning point $r_t=k/\varepsilon_0$ if $h=0$ and $\dot r<0$; from rest at $r_0$ the time to reach $r$ is $\sqrt{r_0/(2k)}\big[\sqrt{r(r-r_0)}+r_0\ln\big((\sqrt r+\sqrt{r-r_0})/\sqrt{r_0}\big)\big]$.

> Claim grade: derived (standard closed forms of the inverse-square central problem, rederived for unit weights; they enter only as the control). Falsifier: a Cartesian integration of the zero-coefficient pair from the Section 10 preparations that misses these values beyond its error bound. The predictions script reproduces $T_r=2\pi\sqrt{A^3/k}$ and apsidal angle $\pi$ to round-off by the same quadrature used for the frozen law (its recorded known case).

## 7. Opposite polarity in the plane

Throughout this section $\sigma=-1$ and the coefficients are frozen, so $\Delta(r)=1+\kappa/r\ge1$, $V_{\mathrm{eff}}=h^2/(2r^2)-k/r$ and the solve is regular at every $r>0$.

### 7.1 Exact uniform circular histories

On a circular history $\dot r=\ddot r=0$, so the bracket in (1.1) equals one and the law reduces to the inverse-square acceleration. Setting $\dot r=0$ and $\ddot r=0$ in (5.1) requires $h^2+2\sigma Kr=0$, independently of $\lambda_{\mathrm W}$ and $\mu_{\mathrm W}$. Hence:

- Opposite polarity has an exact uniform circular history at *every* separation $r>0$, with relative speed $\|\mathbf w\|=\sqrt{k/r}$, individual speed (centre of velocity at rest) $v_\circ=\tfrac12\sqrt{k/r}=c_f/\sqrt{2x}$ and angular rate $\Omega=\sqrt{k/r^3}$. These are identical to the zero-coefficient control. In half-separation form, $v_\circ^2=K/(4R)$.
- Individual speed equals $c_f$ at $x=1/2$ ($r=K/(2c_f^2)$); the relative speed equals $c_f$ at $x=2$. Circular histories with $x<1/2$ are superfield.
- Like polarity has no circular history at any $r\ne a$, for any $(\lambda_{\mathrm W},\mu_{\mathrm W})$, because $h^2+2Kr>0$. Inside its critical radius the like-polarity acceleration at $\dot r=0$ points toward the partner, by (3.5) with $r-a<0$, but (5.1) shows it is never strong enough to balance the transverse motion.

> Claim grade: derived. Falsifier: a uniform circular pair history at some separation whose angular rate differs from $\sqrt{2K/r^3}$, or a like-polarity uniform circle. This is an exact solution of the full selected equation (both members, full solve), so linearizing about it is legitimate.

### 7.2 Linear stability in the reduced radial degree of freedom

Linearize (5.1) about the circular radius $r_0=h^2/k$ at fixed $h$. The $\dot r^2$ term is second order, so $\lambda_{\mathrm W}$ drops out, and since the numerator of $\mathcal A$ vanishes at $r_0$, $\mathcal A'(r_0)=2\sigma K/(r_0^2(r_0-a))$. For $\sigma=-1$ and general $\mu_{\mathrm W}$,

$$
\delta\ddot r=-\omega_r^2\,\delta r,\qquad \omega_r^2=\frac{\Omega^2}{1+\mu_{\mathrm W}k/(c_f^2r_0)},\qquad\text{frozen: }\ \omega_r^2=\frac{\Omega^2}{1+2/x}.
\tag{7.1}
$$

The circle is linearly neutrally stable (elliptic) in the radial degree of freedom whenever $1+\mu_{\mathrm W}k/(c_f^2r_0)>0$, which always holds for $\mu_{\mathrm W}\ge0$. The radial oscillation is slower than the orbital rotation, so the line of apsides advances. To first order in the eccentricity the apsidal angle (pericentre to apocentre) and the precession per radial period are

$$
\Phi_{\mathrm{lin}}=\pi\frac{\Omega}{\omega_r}=\pi\sqrt{1+\frac2x},\qquad \delta\varpi=2\pi\left(\sqrt{1+\frac2x}-1\right)>0 .
\tag{7.2}
$$

The precession is prograde and grows without bound as $x\to0$. At $x=4$, $\Phi_{\mathrm{lin}}=\pi\sqrt{3/2}$; at $x=1$, $\pi\sqrt3$.

Nonlinearly, the reduced system (5.4) at fixed $h$ has a positive radial weight and an effective potential with a strict minimum at $r_0$, so $(r,\dot r)$ stays close to $(r_0,0)$ for all time when it starts close. This is Lyapunov stability of the reduced relative motion, derived from the first integral, not merely linear neutrality.

> Claim grade: derived. Falsifier: a finite-difference derivative of (5.1) at $(r_0,\dot r=0)$ differing from $-\Omega^2/(1+\mu_{\mathrm W}k/(c_f^2r_0))$; check F agreed to $1.3\times10^{-10}$ at 50 random $(K,\mu_{\mathrm W},\lambda_{\mathrm W},r_0)$. The quadrature limit $e\to0$ of Section 7.5 reproduces (7.2) to $10^{-11}$ at $x=4$ and $x=1$.

### 7.3 Linear stability in the full pair phase space

*Superseded in part by the addendum, item 1.*

The full pair has twelve state variables. The motion separates exactly into free centre-of-velocity motion and relative motion, so the linearization about a circular history separates the same way. Describing the relative part in the frame co-rotating at $\Omega$, in which the reference is an equilibrium, the linear spectrum is:

| Direction | Dimension | Linear behaviour | Origin |
| --- | --- | --- | --- |
| Centre translation and boost | 6 | eigenvalue 0, three Jordan blocks of size 2: the centre drifts linearly under a boost | $\sum\mathbf V_i$ conserved; Galilean invariance |
| Rotation phase and change of radius within the circular family | 2 | eigenvalue 0, one Jordan block of size 2: a radius change alters $\Omega$ and the phase drifts linearly | rotation invariance and the one-parameter family $r_0$ |
| Plane tilt | 2 | $\pm i\Omega$ in the co-rotating frame, that is, Floquet multipliers 1: a rigid tilt of the orbital plane | conservation of the direction of $\mathbf h$ |
| Radial oscillation | 2 | $\pm i\omega_r$ with $\omega_r$ from (7.1) | the reduced radial degree of freedom |

The out-of-plane equation is $\delta\ddot z=-\Omega^2\delta z$ because the separation changes only at second order in $\delta z$. No eigenvalue has positive real part. The only linear growth is along the symmetry and family directions, which correspond to moving to a neighbouring exact history. With the conserved $\mathbf V_c$, $\mathbf h$ and $\varepsilon$, the circle is orbitally stable in the full relative phase space: nearby histories stay near the family of circles of nearby radius and orientation for all time, with secular drift only in phase and centre position.

> Claim grade: derived (linear spectrum from the separated structure; orbital stability from the conserved quantities). Falsifier: a Cartesian perturbation of an exact circle showing exponential growth, or radial oscillation at a frequency other than (7.1) in the small-amplitude limit. Separation of exact solution, local stability, finite survival and persistence: the circle is exact (derived); local stability is derived; no finite numerical survival run was performed by this worker; global persistence follows from Theorem 7.4.

### 7.4 Global classification of opposite-polarity histories

*Superseded in part by the addendum, item 2.*

The first integral and the angular momentum classify every opposite-polarity pair history. The key structural facts are that $\Delta\ge1$, so the solve never fails, and that $V_{\mathrm{eff}}$ is the control's potential.

For $h>0$ and $-k^2/(2h^2)\le\varepsilon<0$ define the turning radii, semi-major axis and eccentricity

$$
r_p=A(1-e),\qquad r_a=A(1+e),\qquad A=\frac{k}{2|\varepsilon|},\qquad e=\sqrt{1-\frac{2|\varepsilon|h^2}{k^2}}\in[0,1).
\tag{7.3}
$$

**Theorem 7.4.** Let $\sigma=-1$, frozen coefficients, and a pair state with $r>0$, invariants $h$ and $\varepsilon$ from (5.4). Exactly one of the following holds.

1. **Bound class** $\mathcal B=\{h>0,\ -k^2/(2h^2)\le\varepsilon<0\}$. The separation oscillates periodically between $r_p$ and $r_a$ of (7.3), the same turning points as the control with the same $(\varepsilon,h)$. The solve determinant lies in $[1+\kappa/r_a,\,1+\kappa/r_p]$; the separation is bounded away from zero and infinity; $\dot r^2\le2(\varepsilon-\min V_{\mathrm{eff}})$ and $\|\mathbf w\|\le h/r_p$; the solution exists and stays in this class for all $T\in\mathbb R$. The radial period and apsidal angle are given by the quadratures (7.4)–(7.5). The circular histories are the case $e=0$.
2. **Dispersal class** $\mathcal D=\{h>0,\ \varepsilon\ge0\}\cup\{h=0,\ \varepsilon\ge0,\ \dot r>0\}$. The separation has at most one minimum and $r\to\infty$ as $T\to+\infty$, with $\dot r^2\to2\varepsilon$. With $h=0$ and $\varepsilon=c_f^2$ the motion is uniform at $\dot r=\sqrt2c_f$.
3. **Collision class** $\mathcal C=\{h=0,\ \varepsilon<0\}\cup\{h=0,\ \dot r<0\}\cup\{h=0,\ \dot r=0\}$. The pair reaches contact $r=0$ in finite time, with $|\dot r|\to\sqrt2c_f$ and finite acceleration; the law is undefined at contact and no continuation is selected. The [collinear analysis](../../collinear-research/analysis/weber-overnight-collinear-approach.md#3-opposite-polarity-contact-at-finite-speed) gives the radial details.

*Proof.* With $h>0$, $V_{\mathrm{eff}}\to+\infty$ as $r\to0$ and $\to0^-$ as $r\to\infty$, with unique minimum $-k^2/(2h^2)$ at $r_0=h^2/k$. Since $\Delta>0$, (5.5) confines $r$ to $\{V_{\mathrm{eff}}\le\varepsilon\}$, which is $[r_p,r_a]$ for $\varepsilon<0$ and $[r_p,\infty)$ for $\varepsilon\ge0$. On $[r_p,r_a]$ the reduced vector field is smooth and bounded, turning points are simple ($V_{\mathrm{eff}}'\ne0$ there unless $e=0$), so the motion is periodic and global; $\theta$ is then obtained by quadrature and the Cartesian state from $\mathbf V_c$, $\mathbf h$ and $(r,\theta)$. For $\varepsilon\ge0$, $\dot r^2$ is bounded below away from the single turning point, so $r\to\infty$. With $h=0$ the radial analysis of the collinear source applies: the motion is a shifted inverse-square radial motion (its eq. (2.4)) that reaches $r=0$ unless it recedes with $\varepsilon\ge0$. $\square$

The bound class is regular in every sense requested: the solve is invertible with determinant at least one, the separation is bounded away from zero and infinity, speeds are bounded, and existence is global in both time directions. Every opposite-polarity history with nonzero angular momentum and negative $\varepsilon$ is of this kind; no fine tuning is involved.

> Claim grade: derived. Falsifier: a regular opposite-polarity history with $h>0$ and $\varepsilon<0$ whose separation leaves $[r_p,r_a]$ from (7.3), or one with $h>0$ that reaches $r=0$. A Cartesian instrument checks this by monitoring $r(T)$, $\varepsilon$ and $h$ against (7.3).

### 7.5 Radial period, apsidal angle and maximum speed of bound histories

*Superseded in part by the addendum, item 6.*

Using (5.5) and the factorization $2\varepsilon r^2+2kr-h^2=2|\varepsilon|(r_a-r)(r-r_p)$, the substitution $r=A(1-e\cos\psi)$ removes the turning-point singularities:

$$
T_r=\frac{1}{\sqrt{2|\varepsilon|}}\int_0^{2\pi}\sqrt{r(\psi)\big(r(\psi)+\kappa\big)}\,d\psi,
\tag{7.4}
$$

$$
\Phi=\frac{h}{2\sqrt{2|\varepsilon|}}\int_0^{2\pi}\frac{1}{r(\psi)}\sqrt{1+\frac{\kappa}{r(\psi)}}\,d\psi,\qquad \text{precession per radial period}=2\Phi-2\pi .
\tag{7.5}
$$

With $\kappa=0$ these return $2\pi\sqrt{A^3/k}$ and $\pi$. Both integrands are smooth and periodic in $\psi$, so the trapezoid rule converges geometrically. Since $\sqrt{1+\kappa/r}>1$, the frozen law has a longer radial period and a larger apsidal angle than the control with the same $(\varepsilon,h)$. The relative orbit is a prograde rosette, quasi-periodic and dense in the annulus $r_p\le r\le r_a$ when $\Phi/\pi$ is irrational.

The squared relative speed along the orbit, written in $u=1/r$, is $\|\mathbf w\|^2=(2\varepsilon+2ku+\kappa h^2u^3)/(1+\kappa u)$. Its $u$-derivative has the sign of $2k-2\kappa\varepsilon+3\kappa h^2u^2+2\kappa^2h^2u^3$, which is positive when $\varepsilon<c_f^2$. So for every bound history the maximum relative speed occurs at pericentre:

$$
\sup\|\mathbf V_i\|=\frac{h}{2r_p}=\frac12\left(\frac kh+\sqrt{\frac{k^2}{h^2}+2\varepsilon}\right)\qquad\text{(centre of velocity at rest)}.
\tag{7.6}
$$

This is again the control's value for the same $(\varepsilon,h)$. For dispersal histories with $h>0$, (7.6) is still the supremum, because the pericentre value exceeds the asymptotic value $\sqrt{2\varepsilon}$.

> Claim grade: derived for (7.4)–(7.6); the numerical values in Section 10 are measured by [predictions.mjs](../evidence/weber-overnight-promoted/reduction/predictions.mjs) (periodic trapezoid quadrature to $10^{-15}$ convergence, cross-checked by RK4 on the reduced ODE (5.2)). Falsifier: a bound history whose maximum individual speed occurs away from pericentre; check H found the maximum at the pericentre grid point in all 200 random bound cases.

### 7.6 Same invariants versus same preparation

The comparison with the control depends on what is held fixed. For the same $(\varepsilon,h)$ the two laws share turning points (7.3) and maximum speed (7.6); only the radial period and apsidal angle differ. For the same *preparation* $(r_0,\dot r_0,h)$ the invariants differ:

$$
\varepsilon=\varepsilon_0+\frac{\kappa\,\dot r_0^2}{2r_0}\qquad(\sigma=-1),
\tag{7.7}
$$

so the frozen law has the larger $\varepsilon$ whenever $\dot r_0\ne0$. A preparation with $\varepsilon_0<0<\varepsilon$ is bound under the control and disperses under the frozen law. A release at a turning point ($\dot r_0=0$), such as the apocentre release of Section 10, has the same invariants, the same turning points and the same maximum speed under both laws. That is a sharp, falsifiable equality for the Cartesian instrument.

> Claim grade: derived. Falsifier: an apocentre release whose Cartesian pericentre under the frozen law differs from the control's beyond the integrator's error.

## 8. Like polarity in the plane

*Superseded in part by the addendum, item 4.*

Here $\sigma=+1$, $\Delta(r)=1-\kappa/r$ vanishes at $r_c=\kappa$ and is negative inside, and $V_{\mathrm{eff}}=h^2/(2r^2)+k/r$ is positive and strictly decreasing.

**Theorem 8.1 (no regular bound like-polarity history).** For $\sigma=+1$ and frozen coefficients, no history that is regular for all time has separation bounded away from zero and infinity. Every history falls into one of these classes:

1. **Outside, turning and dispersal** ($r>\kappa$, $\varepsilon<V_{\mathrm{eff}}(\kappa)=c_f^2+h^2/(2\kappa^2)$). The separation has at most one minimum, at $V_{\mathrm{eff}}(r_t)=\varepsilon$ with $r_t>\kappa$, and $r\to\infty$.
2. **Outside, finite-time arrival at the critical radius** ($r>\kappa$, $\varepsilon>V_{\mathrm{eff}}(\kappa)$, approaching). By (5.5), $\dot r^2\to+\infty$ as $r\to\kappa^+$; the critical radius is reached in finite time with divergent speed and divergent acceleration, and the regular solution ends there.
3. **Inside** ($0<r<\kappa$). With $\Delta<0$, (5.4) reads $\tfrac12|\Delta|\dot r^2-V_{\mathrm{eff}}=-\varepsilon$, a motion with positive radial weight in the strictly increasing potential $-V_{\mathrm{eff}}$, which has no minimum. Inward motion reaches contact $r=0$ in finite time; with $h>0$ the speed diverges there as $\dot r^2\approx h^2/(\kappa r)$, and with $h=0$ it tends to $\sqrt2c_f$. Outward motion either turns (if $\varepsilon>V_{\mathrm{eff}}(\kappa)$) and then falls to contact, or reaches $r_c$ in finite time with divergent speed.
4. **The indeterminate level** $\varepsilon=V_{\mathrm{eff}}(\kappa)$. A history on this level reaches $r=\kappa$ in finite time with finite speed $\dot r^2\to2c_f^2+2h^2/\kappa^2$, where the bracket (3.1) vanishes along with $\Delta$ and the solve admits every radial magnitude. Desingularizing time by $d\tau=dT/(r^2(r-\kappa))$ turns (5.2) into a smooth planar field with a saddle at this point, eigenvalues $\pm\kappa^2|\dot r|$. Its two invariant curves are the line $r=\kappa$, along which no physical time elapses, and the energy level itself. So the unique continuously differentiable continuation passes along the level, from outside to inside or the reverse. It ends in contact at one end and dispersal at the other, so even this crossing history is not bound.

*Proof.* Outside, $\Delta>0$ and $V_{\mathrm{eff}}$ is strictly decreasing, so $\{V_{\mathrm{eff}}\le\varepsilon\}\cap(\kappa,\infty)$ is a half-line $[r_t,\infty)$ or all of $(\kappa,\infty)$. Inside, the reduced Lagrangian $\tfrac12|\Delta|\dot r^2+V_{\mathrm{eff}}$ has positive weight and potential $-V_{\mathrm{eff}}$ with derivative $h^2/r^3+k/r^2>0$, so there is no equilibrium and at most one turning point. Finite-time arrival follows from the integrability of $dr/|\dot r|$ near $r=\kappa$ ($|\dot r|\sim|r-\kappa|^{-1/2}$) and near $r=0$. The saddle eigenvalues follow from the Jacobian of $(r',\dot r')=(\dot r(r-\kappa)r^2,\ h^2+kr-Kr\dot r^2/c_f^2)$ at $(\kappa,\dot r_*)$, which is triangular with diagonal $(\kappa^2\dot r_*,\ -2K\kappa\dot r_*/c_f^2)=(\kappa^2\dot r_*,-\kappa^2\dot r_*)$. $\square$

The radial ($h=0$) version, including explicit arrival times and the asymptotic rates $|\dot r|\sim(T_*-T)^{-1/3}$ and $|\ddot r|\sim(T_*-T)^{-4/3}$, is in the [collinear analysis](../../collinear-research/analysis/weber-overnight-collinear-approach.md#4-like-polarity-the-critical-radius).

> Claim grade: derived (classes 1–3, the saddle structure and its eigenvalues); inferred (that the continuously differentiable continuation through the indeterminate point is the one the law should use). The law itself defines no acceleration at that instant, so selecting the level continuation is a formulation decision, not a consequence. Falsifier: a like-polarity history that stays regular for all time with separation in a compact subset of $(0,\infty)$; check J confirmed the saddle eigenvalues to $3\times10^{-10}$ at 50 random states.

## 9. Speed-domain coverage

*Superseded in part by the addendum, item 3.*

Speeds here are individual member speeds in the absolute frame. Unless stated, the centre of velocity is at rest, so $\|\mathbf V_1\|=\|\mathbf V_2\|=\|\mathbf w\|/2$. The labels are admissibility labels; they do not alter the acceleration, and a regular unrestricted crossing of $\|\mathbf V_i\|=c_f$ does not provide continuation within a ceiling domain.

| Class | Supremum of individual speed | Strict ($<c_f$) | Equality touched | Superfield |
| --- | --- | --- | --- | --- |
| Opposite polarity, circular at $x$ | $c_f/\sqrt{2x}$ | $x>1/2$ | $x=1/2$ | $x<1/2$ |
| Opposite polarity, bound, $h>0$ | $\tfrac12\big(k/h+\sqrt{k^2/h^2+2\varepsilon}\big)$ at pericentre | $h>k/(2c_f)$ and $\varepsilon<2c_f^2-2c_fk/h$ | $\varepsilon=2c_f^2-2c_fk/h$ | otherwise |
| Opposite polarity, dispersal, $h>0$ | same pericentre formula | same condition | same | otherwise |
| Opposite polarity, radial ($h=0$) | $\max(c_f/\sqrt2,\ \sqrt{\varepsilon/2})$ over the full history; $c_f/\sqrt2$ is the contact limit | $\varepsilon<2c_f^2$ | not attained for $\varepsilon<2c_f^2$ | $\varepsilon>2c_f^2$, with the equality crossing at $r_\times=k/(\varepsilon-2c_f^2)$ |
| Like polarity, dispersal | at most $\sqrt{\varepsilon/2}$ when $\varepsilon<c_f^2$; otherwise the maximum of the speed function over the history | $\varepsilon<c_f^2$ suffices | case by case | case by case |
| Like polarity, arrival at $r_c$ or contact with $h>0$ | unbounded | never | crossed in finite time | yes, before the end |

The bound-class condition follows from (7.6): $k/h+\sqrt{k^2/h^2+2\varepsilon}<2c_f$ holds exactly when $k/h<2c_f$ and $\varepsilon<2c_f^2-2c_fk/h$. When $h>k/c_f$ every bound history is strictly subfield, since then $2c_f^2-2c_fk/h>0>\varepsilon$. On the circular family this reduces to $x>1/2$.

**Centre-of-velocity drift.** The law depends only on relative variables and is invariant under a common boost, while the speed labels use absolute velocities. With drift $\mathbf V_c\ne\mathbf 0$, $\mathbf V_{1,2}=\mathbf V_c\pm\mathbf w/2$. Because $\max(\|\mathbf V_1\|,\|\mathbf V_2\|)\ge\|\mathbf V_c\|$, every history with $\|\mathbf V_c\|\ge c_f$ violates the strict ceiling whatever its relative motion. Conversely, $\|\mathbf V_c\|+\sup\|\mathbf w\|/2<c_f$ suffices for the strict domain. One relative history is therefore strict, at equality or superfield depending only on a boost that leaves its dynamics unchanged. Domain membership is a property of the absolute-frame preparation, not of the orbit class.

> Claim grade: derived (table entries from (7.6), (5.5) and the collinear analysis; drift statements from the triangle inequality). Falsifier: a bound opposite-polarity history meeting the strict condition of the table whose Cartesian individual speed reaches $c_f$.

## 10. Closed-form predictions for a Cartesian instrument

All values use $K=c_f=1$ (so $k=\kappa=2$ and $x=r$), opposite polarity unless marked, centre of velocity at rest, and $r$ the full separation; the half-separation is $r/2$. The values are measured evaluations of the closed forms of Sections 5–8 by [predictions.mjs](../evidence/weber-overnight-promoted/reduction/predictions.mjs), with output in [predictions.out.txt](../evidence/weber-overnight-promoted/reduction/predictions.out.txt). The script first reproduced the control's known values ($T_r=2\pi\sqrt{A^3/k}$, apsidal angle $\pi$) to round-off with the same quadrature. Each periodic quantity was computed twice: by periodic trapezoid quadrature of (7.4)–(7.5), and by RK4 on the reduced ODE (5.2) (step $2\times10^{-4}$), which agreed to about $10^{-12}$ relative. That agreement is internal consistency between two numerical routes from the same derivation, not independent evidence for the derivation. An independent Cartesian instrument is required for that.

**Circular histories.**

| Quantity | $x=4$ | $x=1$ |
| --- | --- | --- |
| relative speed | 0.7071067811865 | 1.414213562373 |
| individual speed | 0.3535533905933 | 0.7071067811865 |
| angular rate $\Omega$ | 0.1767766952966 | 1.414213562373 |
| orbital period | 35.54306350527 | 4.442882938158 |
| radial frequency $\omega_r$ | 0.1443375672974 | 0.8164965809277 |
| small-oscillation radial period | 43.53118474162 | 7.695298980971 |
| linear apsidal angle (rad) | 3.847649490486 | 5.441398092703 |
| precession per radial period (rad) | 1.412113673792 | 4.599610878226 |

**Apocentre release at $x=4$ with tangential speed 0.8 of circular.** Relative tangential speed $0.5656854249492$ (individual $0.2828427124746$), $h=2.262741699797$, $\varepsilon=-0.34$ exactly, identical under both laws.

| Quantity | Frozen law | Zero-coefficient control |
| --- | --- | --- |
| pericentre $r_p$ | 1.882352941176 | 1.882352941176 |
| apocentre $r_a$ | 4.000000000000 | 4.000000000000 |
| semi-major axis, eccentricity | 2.941176470588, 0.36 | 2.941176470588, 0.36 |
| radial period $T_r$ | 29.00582560484 | 22.41023934847 |
| apsidal angle $\Phi$ (rad) | 4.186307002636 | 3.141592653590 |
| precession per radial period (rad) | 2.089428698092 | 0 |
| maximum individual speed (at pericentre) | 0.6010407640086 | 0.6010407640086 |

**Radial release from rest at $x=4$.**

| Case | Frozen law | Zero-coefficient control |
| --- | --- | --- |
| $\sigma=-1$: contact time | 8.560326833493 | 6.283185307180 ($2\pi$) |
| $\sigma=-1$: relative / individual speed at contact | $\sqrt2=1.414213562373$ / 0.7071067811865 | divergent |
| $\sigma=-1$: $\ddot r$ at contact | $-0.75$ (each member $-0.375$ along $\mathbf e$) | divergent |
| $\sigma=-1$: time to $r=2$; relative speed there | 6.521305376769; 0.7071067811865 | 5.141592653590; 1.0 |
| $\sigma=+1$ (outside $r_c=2$): fate | no contact, no further turning; escapes with relative speed $\to1$ (individual $\to0.5$) | escapes, relative speed $\to1$ |
| $\sigma=+1$: time to $r=8$; relative speed there | 7.191411155128; 0.8164965809277 | 9.182348597571; 0.7071067811865 |

**Supplementary like-polarity probe.** Launched inward at $x=4$ with $\dot r=-1.6$ (individual speed 0.8): $\varepsilon=1.14>c_f^2$, the critical radius $r_c=2$ is reached at $T=1.115419163630$ with $\dot r\to-\infty$, and individual speed equals $c_f$ at $r_\times=k/(2c_f^2-\varepsilon)=2.325581395349$. A Cartesian instrument that implements the solve faithfully must report its first event at or before this time and must not continue past it.

## 11. Validation record

The algebraic identities were checked numerically in Node v22 by [checks.mjs](../evidence/weber-overnight-promoted/reduction/checks.mjs), output in [checks.out.txt](../evidence/weber-overnight-promoted/reduction/checks.out.txt), seeded and reproducible with `node .tmp/weber-overnight/reduction/checks.mjs`. All matrices are assembled from the boxed law (1.1) as an affine residual map, not from the closed forms they test. All runs use $c_f=1$; $K$ is randomized to expose coupling dependence. The worst observed discrepancies are:

| Check | Identity | Worst discrepancy |
| --- | --- | --- |
| A1, A2 | (2.1), (2.2) against finite differences of $r(T)$ | $6\times10^{-8}$, $1.5\times10^{-7}$ (absolute; finite-difference limited) |
| B1 | $\det M=1-a/r$, eq. (3.4) | $4\times10^{-14}$ relative |
| B2–B4 | radial solution (3.5); law residual | $\le9\times10^{-14}$ relative |
| C1 | reduced equation (5.1) vs full solve | $1\times10^{-13}$ relative |
| D1, D2 | $d\varepsilon/dT=0$; $\varepsilon=2(E-\|\mathbf V_c\|^2)$ | $1.6\times10^{-8}$; $4\times10^{-15}$ |
| D3, D4 | general integrating factor (4.9); radial invariant (5.6) | $1.4\times10^{-8}$; $8\times10^{-8}$ |
| E1, E2 | four-member matrix (4.7); Sylvester determinant (4.8) | $8\times10^{-16}$; $1.2\times10^{-14}$ |
| E3, E4 | $\sum\mathbf A_i=0$, $\sum\mathbf X_i\times\mathbf A_i=0$ | $3\times10^{-16}$ |
| E5, E6 | $dE/dT=0$ (frozen); nonzero at $\lambda_{\mathrm W}=-0.3$ | $4\times10^{-16}$; minimum $1.0\times10^{-3}$ (nonzero as stated) |
| E7, E8 | velocity Hessian of $L$ equals $M_N$; Euler–Lagrange residual | $5\times10^{-8}$; $1.3\times10^{-6}$ (finite-difference limited) |
| F0, F1 | circular balance; radial frequency (7.1) | $2\times10^{-16}$; $1.3\times10^{-10}$ |
| G1, G2 | radial shifted inverse-square form; equality radius | $7\times10^{-15}$; $9\times10^{-15}$ |
| H1, H2 | maximum speed at pericentre (7.6) | exact on grid; $4\times10^{-16}$ |
| I0, I1 | known case: control infall time; frozen contact-time closed form vs quadrature | $7\times10^{-16}$; $3\times10^{-15}$ |
| J0, J1 | indeterminate point is a saddle with eigenvalues $\pm\kappa^2\lvert\dot r_*\rvert$ | $7\times10^{-15}$; $3\times10^{-10}$ |

These checks confirm the identities at random states. They are spot checks, not proofs; the proofs are the derivations above. They share no code with any Cartesian instrument written by another worker, but they were written by the same author as the derivations, so they do not replace independent adjudication.

## 12. Claims, falsifiers, inferences and open questions

**Derived results.**

1. The pair solve (3.3) has determinant $1-2\sigma K\mu_{\mathrm W}/(c_f^2r)$; its solution is necessarily radial and equal and opposite (Section 3).
2. Frozen opposite polarity is regular at every $r>0$; frozen like polarity fails only at $r_c=2K/c_f^2$ (Section 3.3).
3. Sum of velocities and total angular momentum are conserved for all coefficients and member counts; the frozen law is exactly Euler–Lagrange for (4.2) with (4.5) for every member count, with energy function (4.6), and within unit-weight pair functions of $(r,\dot r)$ only when $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$ (Section 4).
4. The many-member matrix is (4.7), equal to the velocity Hessian of $L$, with exact determinant test (4.8) and sufficient invertibility criteria (Section 4.3).
5. The reduced radial equation always has a first integral (4.9); for the frozen law it is (5.4), with radial weight equal to the pair determinant and effective potential equal to the control's.
6. Opposite-polarity circles exist at every separation and match the control; they are linearly and nonlinearly (orbitally) stable, with radial frequency (7.1) and prograde apsidal advance (7.2).
7. Theorem 7.4: the opposite-polarity bound class is exactly $\{h>0,\ \varepsilon<0\}$, and it is regular and global; radial histories collide at finite speed $\sqrt2c_f$.
8. Theorem 8.1: no regular bound like-polarity history exists, inside or outside the critical radius.

**Inferences.** The continuously differentiable continuation through the like-polarity indeterminate point is the energy-level curve, but adopting it is a formulation decision (Section 8). The frozen law binds opposite-polarity pairs in an open set of preparations with the same turning points as the control. That is inferred to make bound-orbit timing and apsidal advance, not binding itself, the discriminating observables between this law and the control.

**Proposals.** The Cartesian instrument should be preregistered against the Section 10 tables: equality of turning points and maximum speed for the apocentre release, radial period $29.00582560484$ and apsidal angle $4.186307002636$, contact time $8.560326833493$ with finite contact speed $\sqrt2$, and the like-polarity first event at $T=1.115419163630$.

**Unresolved questions.** The law at contact ($r=0$) and at the like-polarity critical radius is undefined; no continuation is proposed. Lagrangian structure outside the class of unit-weight pair functions of $(r,\dot r)$ is not examined. Invertibility of specific many-member configurations, including the four-member ring, is not examined here.

**Falsifiers in operator-checkable terms.** (a) A separately written Cartesian integration of the apocentre release that finds a pericentre other than $1.882352941176$ or a maximum individual speed other than $0.6010407640086$, beyond its error bound. (b) A frozen opposite-polarity history with $h>0$ that reaches $r=0$ or escapes with $\varepsilon<0$. (c) A drift in $\varepsilon$ from (5.4), or in $h$, beyond integrator error along any regular history. (d) A like-polarity history that stays regular for all time and bounded.

## Source attribution (PI)

The bracket structure is verified from Weber's own text; the identification that turns it into $(\lambda_{\mathrm W},\mu_{\mathrm W})=(-1/2,1)$ is verified from a secondary source only. Read from page images (not OCR) by the source-check worker on 2026-10-05:

- Weber's 1846 treatise, as reprinted in [Wilhelm Weber's Werke, vol. III, p. 157](https://archive.org/details/wilhelmweberswe02fiscgoog/page/157/mode/1up), Art. 21, gives the interaction as $(ee'/r^2)\big(1-\tfrac{a^2}{16}\dot r^2+\tfrac{a^2}{8}r\ddot r\big)$. Weber and Kohlrausch, [Werke III, p. 651](https://archive.org/details/wilhelmweberswe02fiscgoog/page/651/mode/1up), restate it as $(ee'/r^2)\big[1-c_{\mathrm W}^{-2}(\dot r^2-2r\ddot r)\big]$, so $c_{\mathrm W}=4/a$. [p. 652](https://archive.org/details/wilhelmweberswe02fiscgoog/page/652/mode/1up) gives $c_{\mathrm W}=439\,450\times10^6$ mm/s and says it considerably exceeds the speed of light. Weber does not state $c_{\mathrm W}=\sqrt2\,c$.
- [Assis (1995)](https://www.ifi.unicamp.br/~assis/gravitation-4th-order-p314-331%281995%29.pdf), p. 317, Eq. (9), writes the bracket $1-\dot r^2/(2c^2)+r\ddot r/c^2$ with $c=1/\sqrt{\mu_0\varepsilon_0}$ (p. 318), and p. 318, Eq. (15), the velocity-dependent potential $(1/r)(1-\dot r^2/(2c^2))$.

In Weber's own constant the coefficients are $\lambda=-1$, $\mu=2$. With the modern identification $c_{\mathrm W}=\sqrt2\,c$ (Assis's form; secondary), they become $-1/2$ and $1$. In this run the normalizing speed is $c_f$, so calling the benchmark "historical Weber normalization" adds a further identification of light speed with $c_f$. That identification is a comparison choice, not a source fact. Suggested wording for Section 9 of the variant manuscript: "in Weber's constant $c_{\mathrm W}$ the coefficients are $\lambda=-1$, $\mu=2$; with $c_{\mathrm W}=\sqrt2\,c$ (modern identification, Assis 1995 Eq. 9) they become $-1/2$ and $1$."

## Measured runs (continuation run, 2026-10-05)

The first run was interrupted before any target run (see the run record below). In the continuation run the PI wrote the [preregistration](weber-overnight-preregistration.md) at 12:46Z, after the subject, the reference and the instrument controls were fixed, and the subject instrument then ran all fifteen cases at 12:50Z–13:10Z. The complete measured account is the [target-run report](weber-overnight-target-runs.md) with its [machine summary](../evidence/weber-overnight-target-runs.json). In brief, measured by the subject instrument at `rtol` $10^{-12}$ with a refinement run at $10^{-10}$:

- Every predicted case agrees with its printed prediction inside the preregistered tolerance; the largest relative difference is $1.7\times10^{-10}$ (the WB-4 radial period against the reference's ten printed digits). No tolerance was widened and no case altered.
- The circles WB-1, WB-2 and the equality circle WB-3 survive their ten or five periods with radius drift below $3\times10^{-13}$; the first integral and angular momentum drift below $10^{-13}$ on every regular run.
- The general perturbation WB-7 stays bounded in $3.9664\le r\le4.0358$ for twenty periods, with the plane normal fixed to the arccosine floor, the centre uniform to $10^{-12}$, radial period $43.5471288$ and apsidal angle $3.8475193$.
- The like-polarity approach WB-8 crosses individual speed $c_f$ at $x=2.5316455696$, $t=3.2838138418$, and stops at $x=2+1.3\times10^{-7}$, $t=3.4911759596$, by step underflow with speed $1250$: the integrator lost resolution before $|\det|$ reached the $10^{-8}$ threshold. The time agrees with the reference's $3.491175960$. WB-9 turns at $x=2.5316455696$ and escapes; WB-10 has one pericentre and disperses.
- The collinear contact WC-1 ends at $t=8.5603268335$ (extrapolated to $r=0$) with relative speed $1.4142135624$ and finite $\ddot r\approx-0.75$; the zero-coefficient control WC-3 reaches contact at $2\pi$ with speed above $10^{3}$.
- Two instrument limits were found and recorded: at `rtol` $10^{-10}$ one accepted step carried WB-6 and WC-1 across $r=0$ without raising the contact event, because the frozen law reaches contact at finite speed and nothing forces the step to shrink; the located pass-through time agrees with the finer run to $6\times10^{-13}$. Anything integrated beyond $r=0$ is an artifact and is not used.

**Withheld cases, compared by the PI at 13:58Z after both sides were on disk.** The reference lane computed blind enclosures (`.local-data/master-equation-closure/weber-overnight/review/withheld-reference-v1.json`, Section 10 of the [adjudication document](weber-overnight-independent-adjudication.md)) without seeing instrument output; the instrument lane ran the cases without seeing the reference.

| Case | Quantity | Instrument (measured) | Blind reference (enclosure) | Relative difference | Within tolerance |
| --- | --- | --- | --- | --- | --- |
| WB-5 | pericentre | $2.0420168067227$ | $243/119=2.042016807$ | $<10^{-12}$ | yes |
| WB-5 | radial period | $23.8046465412$ | $23.80464654$ | $5\times10^{-11}$ | yes |
| WB-5 | apsidal angle | $4.2398304171$ | $4.239830417$ | $2\times10^{-11}$ | yes |
| WB-5 | maximum individual speed | $0.53979496183555$ | $0.5397949618$ | $7\times10^{-11}$ | yes |
| WB-6 | contact time | $4.7599212040$ | $4.759921204$ | $<10^{-11}$ | yes |
| WB-6 | relative speed at contact | $1.4142135624$ | $\sqrt2$ | $<10^{-10}$ | yes |
| WB-12 | radial period; apsidal angle | $17.7838714539$; $3.1415926536$ | $17.78387145$; $\pi$ | $3\times10^{-11}$; $<10^{-11}$ | yes |
| WB-7 | turning points | $3.9664373$, $4.0357635$ | $3.966437055$, $4.035763551$ | $<10^{-8}$ (printed digits) | yes |
| WB-7 | radial period; apsidal angle | $43.5471288$; $3.8475193$ | $43.54712879$; $3.847519254$ | $2\times10^{-9}$; $10^{-8}$ | yes |
| WB-7 | supremum individual speed | sampled maximum $0.4090908$ | exact supremum over phase $0.4091113156$ | sampled value (member 2) lies $2.0\times10^{-5}$ below the supremum, as corrected in adjudication Section 8 | consistent: a twenty-period sample need not reach the aligning phase |

The withheld radial and mildly eccentric cases therefore agree with the blind reference to the printed digits. This is the first comparison in the run in which the two sides share neither code nor derivation nor foreknowledge of each other's numbers; it is measured evidence for Sections 5–7 on these preparations, not a proof of them.

**Decision at the preregistered level: GO for the binary target.** The bound class $\{h>0,\varepsilon<0\}$ (Theorem 7.4) is a derived result confirmed by the independent derivation; WB-1, WB-2, WB-4, WB-5 and WB-7 remained regular and bounded with invariant drift inside tolerance. Separately: exact circular solutions exist at every separation (derived, two routes); they are linearly stable in the reduced radial degree of freedom and have no growing direction in the full pair phase space (derived; frame labels corrected in the addendum, item 1); finite numerical survival is measured for up to twenty periods; global persistence for all time is derived from the invariants in Theorem 7.4, not from the runs. Falsifier: any regular opposite-polarity history with $h>0$ and $\varepsilon<0$ that reaches contact, escapes, or changes its turning points, found by a separately written integrator.

## Independent adjudication (reference fixed at 03:00Z; subject adjudicated 15:20Z)

The [independent reference](weber-overnight-independent-adjudication.md) was derived blind and fixed at 2026-10-05T03:00Z. It uses a polar-coordinate and integrating-factor route and interval-enclosed quadrature. Its Section 8 adjudicates this document, the collinear treatment and the target runs: every item is admitted, four with corrections that change no verdict (the "supremum" column of the target-run report holds sampled run maxima, with the exact suprema $0.4091113156$ for WB-7, $0.6284902545$ for WB-9 and $0.6551081336$ for WB-10; the finer run caught the WB-6 contact window because its steps shrank through the cancelling bracket, so the catch is tolerance-dependent rather than robust; the WC-3 extrapolation overshoots $2\pi$ by $1.7\times10^{-10}$; one transcription of the WB-4 period). Its Section 13 adjudicates the [persistence theorems and long runs](weber-overnight-persistence.md): Theorems 2.1, 3.1 and the integrability statement are admitted as derived and independently confirmed; Theorem 2.2's item 3 is corrected (a perturbation of the equality circle leaves the inclusive label only when $h<h_0(1+e)$, not always); the WP-1 supremum printed as exact was a one-degree phase-grid maximum, with the certified value $0.4091113156$. The PI comparison of the earlier overlapping numbers, which the adjudication confirms, was:

- **Circle at $x=4$:** individual speed $0.3535533906$, apsidal angle $3.847649490$. The radial frequency $0.1443375673$ matches the radial period $43.53118474$.
- **Circle at $x=1$:** apsidal angle $5.441398093$.
- **Apocentre release:** turning points $32/17$ and $4$, radial period $29.00582560$, apsidal angle $4.186307003$, maximum speed $0.6010407640$.
- **Radial cases:** contact time $8.560326833$ at relative speed $\sqrt2$; the like-polarity run from rest reaches $x=8$ at $7.191411155$.

Both sides also state the same invertibility domain, the same first integral (up to normalization), the same bound class $\{h>0,\ \varepsilon<0\}$ and the absence of regular bound like-polarity histories. This agreement is measured. It compares two separately authored derivations at the PI level, not a completed adversarial adjudication. The independent worker's sharper probes (shared turning points with the control, universal contact speed $\sqrt2\,c_f$) are met by Sections 7.6 and the collinear treatment.

## Frozen checkpoint synthesis (PI, 2026-10-05T15:31Z)

This section is the checkpoint that Codex integrates. It is frozen; any later correction goes in a separate, dated addendum below it and does not rewrite it. The sources it summarizes are this document with its addendum, the [collinear approach](../../collinear-research/analysis/weber-overnight-collinear-approach.md), the [preregistration](weber-overnight-preregistration.md), the [target-run report](weber-overnight-target-runs.md), the [persistence theorems and long runs](weber-overnight-persistence.md), the [independent adjudication](weber-overnight-independent-adjudication.md), the [ring analysis](../../braid-program/analysis/weber-overnight-ring.md) and its [independent ring adjudication](../../braid-program/analysis/weber-overnight-ring-independent-adjudication.md).

### Case specification shared by every row

The law is the Section 9 family of the [variation manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response) with $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$, $c_f=1$, every $|K_{ij}|=K=1$, present-time (instantaneous) support, no self term, unit integration weights, no causal delay, no boundary response, no softening. Numerical lengths are in units of $K/c_f^2$ ($x=rc_f^2/K$). The three speed labels (unrestricted, inclusive $\le c_f$, strict $<c_f$) are domain labels; the acceleration is identical under all three, and a history supports a label on an interval where its speeds satisfy that label's clause. Instruments: the subject Cartesian integrator ([note](../evidence/weber-overnight-pair-instrument.md), controls 11/11 before every target use); the fixed independent reference (reduced quadrature with outward-rounded interval enclosures, controls 24/24, fixed blind at 03:00Z); the blind ring reference ([document](../../braid-program/analysis/weber-overnight-ring-independent-adjudication.md), fixed 14:18Z). Measured values are floating-point unless marked certified, where the reference's enclosure applies under the conditions it states (cited trapezoid remainder theorem, faithful host arithmetic).

### Case table

| Case | Geometry and preparation | Speed coverage | Well-posed | Balance / solution | Stability domain | Retained evolution | Decisive result | Grade | Independent reference |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pair, opposite polarity, class level | Isolated pair, any $r>0$ | All three labels where the supremum speed allows; supremum $\|\mathbf V_c\|+h/(2r_-)$ for bound histories | Solve invertible for every $r>0$ ($\det=1+2K/(c_f^2r)$) | Exact circles at every $x$ ($h^2=2Kr$, individual speed $c_f/\sqrt{2x}$, equal to $c_f$ at $x=1/2$) | Orbitally stable in the full relative phase space (Theorem 2.1 of the persistence source); no growing direction in the twelve-state spectrum (addendum item 1 gives the frame-labelled multiplicities) | Not applicable (class) | Bound class is exactly $\{h>0,\varepsilon<0\}$: regular, global, turning points identical to the inverse-square control, prograde precession $\pi\sqrt{1+2/x}$ at small amplitude; $h=0$ collides; $\varepsilon\ge0$ disperses | Derived; independently confirmed (Sections 8 and 13 of the adjudication) | Fixed reference, different route |
| WB-1, WB-2 | Circles at $x=4$, $x=1$ | Strict ($0.354$, $0.707$) | Yes | Exact solution | Stable | 10 periods, radius drift $<3\times10^{-13}$ | Survival of the exact circle | Measured | Predicted values matched to $10^{-10}$ |
| WB-3 | Circle at $x=1/2$ | Inclusive only (speed exactly $c_f$) | Yes | Exact solution | Stable within the law; a perturbation keeps the inclusive label only when $h<h_0(1+e)$ | 5 periods, drift $2\times10^{-14}$ | Equality circle evolves without incident under the unrestricted law; no ceiling continuation is implied | Measured | Same |
| WB-4, WB-11 | Apocentre release $x=4$, $0.8$ of circular; and its zero-coefficient control | Strict ($0.601$) | Yes | Bound history | Stable | 5 radial periods | Same turning points $32/17$, $4$ as the control; period $29.00582560$ vs $22.41023935$; apsidal angle $4.186307003$ vs $\pi$ | Measured, matching certified values | Certified enclosures |
| WB-5, WB-12 (withheld) | Apocentre release $x=3$, $0.9$ of circular; control | Strict ($0.540$) | Yes | Bound history | Stable | 6 radial periods; WP-2 extends to 200 | Pericentre $243/119$, period $23.80464654$, apsidal $4.239830417$: blind match to printed digits | Measured, blind-matched | Blind certified enclosures |
| WB-6, WC-1, WC-3 (WB-6 withheld) | Radial release from rest at $x=2.5$ and $x=4$; control at $x=4$ | Strict up to contact (contact-limit individual speed $c_f/\sqrt2$); control crosses $c_f$ | Yes until $r=0$, where the law is undefined | Collision | Not applicable | To contact: $t=4.759921204$, $8.560326833$; control $2\pi$ | Contact at relative speed exactly $\sqrt2c_f$ with finite acceleration; the control reaches contact with unbounded speed. No continuation is defined | Derived (speed) and measured (times), blind-matched | Certified |
| WB-7, WP-1 | WB-1 circle, member 1 kicked $(0.005,0,0.01)$, centre velocity $(0.0525,0,0.005)$ | Strict (certified supremum $0.4091113156$) | Yes | Bound history | Stable | 200 orbital periods, no secular trend above $10^{-10}$ | General perturbation outside the plane with centre drift stays within the theorem's interval $[3.96643705,4.03576355]$; plane fixed; centre uniform | Measured; interval derived and certified | Certified |
| WP-3 | Circle at $x=1$ with $10^{-3}$ radial and out-of-plane kicks | Strict ($0.708$) | Yes | Bound history | Stable | 200 periods | Bounds $[0.99827194,1.00173606]$ as the theorem predicts | Measured, inside enclosures | Certified |
| Pair, like polarity, class level | Isolated pair | Unrestricted only on approaches that reach the critical radius | Solve singular at $r=2K/c_f^2$ ($x=2$); indeterminate on the level $\varepsilon=c_f^2$ | No circle at any radius | No reference | Not applicable | No regular bound history exists (Theorem 8.1 with the complete branch table of the addendum) | Derived; independently confirmed | Fixed reference |
| WB-8 | Radial approach from $x=8$, $\dot r=-1.6$ | Unrestricted: crosses $c_f$ at $x=2.5316455696$ | Lost at $x=2$ | Collision with the singular radius | No reference | To $t=3.4911759596$ (stop by step underflow at $x=2+10^{-7}$, speed $1250$) | Reaches the singular radius in finite time with speed growing like $(T_*-T)^{-1/3}$ | Measured, matching certified $3.491175960$ | Certified |
| WB-9, WC-2 | Radial approach $\dot r=-1.2$ from $x=8$; release from rest at $x=4$ | Strict ($0.628$, $0.436$) | Yes | Dispersal | No reference | To $t=30$, $t=10$ | Turns at $x=2.5316455696$ and escapes; reaches $x=8$ at $7.191411155$ | Measured, matching certified | Certified |
| WB-10 | Planar approach $x=6$, $\dot r=-1.2$, tangential $0.3$ | Strict ($0.655$) | Yes | Dispersal | No reference | To $t=30$ | One pericentre, then dispersal | Measured | Class theorem |
| Ring, class level | Four members, alternating polarity, radius $\rho$, rigid rotation | Strict for $x>x_\ast=(2\sqrt2-1)/4$; inclusive at $x_\ast$; unrestricted below | $12\times12$ matrix $\det=(1+(\sqrt2-1)/x)(1-1/x)(1+\sqrt2/x)^3$: invertible for $x\ne1$; singular at $x=1$ (null vector: alternating radial mode) | Exact balance at every $x$: $\Omega^2=(2\sqrt2-1)K/(4\rho^3)$, identical to the inverse-square ring because the velocity terms cancel on any rigid rotation | **Linearly unstable at every regular radius**: the $k=2$ pairing sector has a real positive root for every $x\ne1$ and the $k=1,3$ polarization sector for every $x$; rates $0.3423386901$ and $0.3187960589$ at $x=1.7$, $3.431079319$ and $0.8396456240$ at $x=0.8$ | See WR rows | **NO GO for a persistent ring under this law** | Derived; independently confirmed to all printed digits | Blind ring reference, separate route |
| WR-0 at $x\in\{1.7,0.8,x_\ast,0.3\}$ | Exact balanced ring, no perturbation | As above | Yes | Exact solution | Unstable | 20 periods at $1.7$; step underflow at $1.6$–$4.9$ periods below $x=1$ | Round-off grows at the predicted fastest rate ($0.34234$ measured vs $0.342339$); ring breaks into one tight binary plus two unbound members at $1.7$; like-polarity pair collapse with speeds $>10^4c_f$ below $x=1$ | Measured, same lane; rates anchored to the reference at $\le6\times10^{-7}$ | Reference rates |
| WR-1…WR-7 at $x=1.7$ and $0.8$ | Seven sector perturbations at $10^{-6}$ and $10^{-3}$ | Every $10^{-3}$ history crosses $c_f$ within $1.0$–$5.4$ periods, so it is inadmissible under either ceiling label before any fate | Yes until the fate | Not applicable | Measured rates agree with the sector closed forms to $10^{-8}$–$10^{-12}$ (breathing displacement $2\times10^{-5}$, explained by the Jordan drift of the family radius) | To first event or 20 periods | Pairing into two opposite-polarity binaries is the first stage, not the end state: fates are two receding bound binaries or one tight binary plus two unbound members | Measured, same lane; fates classified by a pair invariant in the adjudication | Reference closed forms |
| WR-8 | Symmetric breathing, amplitude $10^{-2}$, $x=1.7$ | Strict | Yes | Reduced one-degree-of-freedom motion | Confined within the symmetric sector; symmetry breaks at $2.76$ periods from round-off | To 20 periods | Reduced energy conserved to $10^{-14}$; turning points match the reduced potential | Measured | Reference reduced energy |

### Counts

Measured by reading the case tables of the preregistration, the persistence source and the ring runs: 15 preregistered binary and collinear cases, 3 long runs, 4 unperturbed ring radii, 14 ring perturbation cases and 1 symmetric breathing case, so 37 newly specified cases, plus 3 class-level statements (opposite pair, like pair, ring). Checked positive conclusions: 3 (bound class exists and is global; circles orbitally stable; ring exactly balanced at every radius). Checked negative conclusions: 3 (no regular bound like-polarity history; ring linearly unstable at every regular radius; no persistent ring in evolution). Undefined cases: 2 (continuation past contact $r=0$; continuation past the like-polarity singular radius $x=2$ and the ring's $x=1$). Corrected prior claims: 7 within the run's own sources (addendum items 1–6 and the persistence Theorem 2.2 item 3), none in the variant manuscript's displayed Section 9 identity, which both references confirm. Unresolved branches: 3 (a $10^{-11}$ low bias of long-run turning radii, presumed integrator error; the long-time fate of the three step-capped ring runs; the nonlinear bounded recurrent ring fate, which nothing shows and which alone could reopen the ring NO GO).

### Verdicts and falsifiers

**Binary: GO, checked.** The fixed law admits regular, robust bound binary histories: exactly the opposite-polarity class $\{h>0,\varepsilon<0\}$. They are distinguished from radial collision ($h=0$, contact at relative speed $\sqrt2c_f$) and dispersal ($\varepsilon\ge0$) by the invariants alone, and from an acceleration-matrix obstruction by polarity: the opposite-polarity solve is never singular, the like-polarity solve is singular at $x=2$ and no like-polarity history is bound. Falsifier: a separately written integrator finding a history with $h>0$, $\varepsilon<0$ that reaches contact, escapes or changes its turning points.

**Ring: NO GO, checked.** The four-member alternating ring has an exact balanced rotation at every radius but is linearly unstable at every regular radius, by two independent derivations agreeing to all printed digits and by measured growth from round-off at the predicted rate. The Weber velocity terms neither change the balance nor the stiffness; only the acceleration matrix differs from the inverse-square ring, so the instability is the inverse-square square's own. Falsifier: a rotating-frame Jacobian about the balanced ring with no positive real part, or an evolved ring whose six separations return to within $10^{-2}$ after a $10^{-1}$ departure.

**Speed-regime restrictions.** No binary result depends on a ceiling: the bound class lies in the strict domain whenever $\|\mathbf V_c\|+h/(2r_-)<c_f$, touches equality on the $x=1/2$ circle, and exceeds it otherwise; the acceleration is the same in every case. The like-polarity approach that reaches the singular radius crosses $c_f$ first, so under either ceiling label it is inadmissible before the obstruction; a regular unrestricted crossing provides no continuation within a ceiling domain. Every perturbed ring history crosses $c_f$ before its fate.

**Elapsed time.** First run 02:31Z–12:15Z, of which about 35 minutes were productive before the coordinator stalled on a browser approval prompt. Continuation run 12:50Z–15:31Z (2 h 41 min), closed early under the operator's stopping rule on the ring NO GO. No computation was detached; nothing is running at the checkpoint.

**Next decisive follow-up.** Within this law nothing remains in the authorized scope. The decisive next question is outside it: whether a delayed adaptation of the relative-motion law (a separately defined equation) changes the sign of the ring's pairing-sector root, since the instantaneous law shows the instability is inherited from the inverse-square interaction and not altered by velocity dependence.

### Propagation list for Codex

- **Variant manuscript, Section 9:** replace the attribution sentence by the wording in "Source attribution (PI)" above; add that the pair identity is now independently adjudicated; add the invertibility domain, the Lagrangian structure for $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$ with its energy-like invariant, the bound class, the contact speed $\sqrt2c_f$, and the ring verdict, all at the grades above.
- **Binary manuscript:** a section on the instantaneous Weber-inspired pair summarizing the class theorem, circles, orbital stability, the withheld blind matches and the 200-period runs, linking this document.
- **Collinear manuscript:** the radial classification (shifted-separation form, contact at $\sqrt2c_f$, like-polarity critical radius and $(T_*-T)^{-1/3}$ law, sign chart), linking the collinear source.
- **Braid-program manuscript:** the ring balance and instability, linking the ring source and its adjudication.
- **Geometry registry:** new rows under a new equation label "Weber-inspired (instantaneous, $\lambda=-1/2$, $\mu=1$)": one BIN row for the opposite-polarity bound class with the circle family (Solution, derived, independently checked; stable; 200 periods retained), one BIN row for the like-polarity pair (Excluded), one COL row (radial contact at $\sqrt2c_f$; like-polarity critical radius), one BRD row for the four-member ring (Solution, balanced at every radius; unstable at every radius, derived and independently checked; no persistent evolution).
- **Findings ledger:** entries for the bound-class theorem, the universal contact speed, the ring instability, and the source attribution finding (Weber's own coefficients are $-1$ and $2$ in his constant).
- **Trackers:** `binary-research`, `collinear-research`, `braid-program` and master-equation-closure `priorities.md` and `work-log.md`: one closing sentence each with the GO/NO GO verdicts and links; `brainstorming.md` "Proposed ten-hour Maxwell and Weber investigations": disposition of the Claude Weber prompt changed to executed, interrupted and completed in continuation.

## Run record (PI)

The ten-hour run started 2026-10-05T02:31Z. The three mathematical workers finished by about 03:05Z. The coordinator then stayed blocked until about 12:10Z because the source-check worker's browser use waited on approval prompts; this document was assembled at 12:15Z with no preregistration, target runs, adjudication or ring work. One worker accidentally started system `python3` on malformed input and another ran `python3 --version`; no result came from either. The operator relaunched at 12:50Z with an eight-hour clock, a stopping rule of eight hours or a checked NO GO, Fable 5.1 for every agent, and a prohibition on browser use. Rounds: 12:50Z–13:55Z (target runs, corrections addendum, blind withheld references, ring derivation); 13:58Z–15:07Z (subject adjudication, ring runs, blind ring reference, persistence theorems and long runs); 15:08Z–15:25Z (ring and persistence adjudications). The checkpoint above was frozen at 15:31Z. Codex integration of the propagation list had not been applied at the freeze.

## Addendum: corrections after the final-hour assessment (2026-10-05)

This addendum records the disposition of the corrections raised against this document in the final-hour assessment's section "Corrections and unreviewed scope" ([maxwell-shaped-overnight-weber-checkpoint-assessment.md](maxwell-shaped-overnight-weber-checkpoint-assessment.md)), together with one further defect found while rederiving. Each item was rederived from the law (1.1) and the reduced equation (5.1)–(5.5) without taking the assessment's statement as a premise. Where a number or a spectrum is at stake, the item was spot-checked in Node v22 by [corrections-checks.mjs](../evidence/weber-overnight-promoted/round2/corrections/corrections-checks.mjs), output in [corrections-checks.out.txt](../evidence/weber-overnight-promoted/round2/corrections/corrections-checks.out.txt); every instrument in that script passed a known case (checks K1–K6) before its target use (checks T1–T5c), and all 19 checks passed. The original sections above are unchanged; each item quotes the superseded wording and names its section. The corrections concern this subject derivation only; they make no new target claim and do not alter the derived conclusions of Theorems 7.4 and 8.1 or the predictions of Section 10. The companion corrections to the collinear source are recorded in [its own addendum](../../collinear-research/analysis/weber-overnight-collinear-approach.md#addendum-corrections-after-the-final-hour-assessment-2026-10-05).

### Item 1. Section 7.3: the centre spectrum is frame-dependent and the table mixes frames

**Verdict: accepted.** The table in Section 7.3 describes the relative part in the frame co-rotating at $\Omega$ but describes the centre part in the inertial (void) frame. Both descriptions are correct in their own frame, but the table does not say so, and the centre row cannot be read as part of the spectrum of a wholly co-rotating twelve-state Jacobian, which is the object a Cartesian linearization helper computes.

*Derivation.* Let $\mathbf C=(\mathbf X_1+\mathbf X_2)/2$ be the centre of velocity. By (4.1), $\mathbf C''=\mathbf 0$ exactly, so in the inertial frame the centre block of the linearization is $(\delta\mathbf C,\delta\mathbf C')\mapsto(\delta\mathbf C',\mathbf 0)$: eigenvalue $0$ with three Jordan blocks of size two, one per axis. Now pass to the frame rotating at $\Omega$ about the orbital normal: $\mathbf C=R(\Omega T)\mathbf y$ for the in-plane components, with $R$ the planar rotation. Differentiating twice and using $R'=\Omega JR$ with $J$ the quarter-turn,

$$
\mathbf C''=R(\Omega T)\left[\mathbf y''+2\Omega J\mathbf y'-\Omega^2\mathbf y\right]=\mathbf 0 .
\tag{A.1}
$$

Its general solution is $\mathbf y=R(-\Omega T)(\mathbf c_0+\mathbf c_1T)$, which in complex form reads $y=e^{-i\Omega T}(c_0+c_1T)$. The secular factor $T$ multiplies an oscillation at $\Omega$, so the real four-state in-plane centre block has eigenvalues $\pm i\Omega$, each with algebraic multiplicity two and geometric multiplicity one: one Jordan block of size two at $+i\Omega$ and one at $-i\Omega$. Equivalently, $(A^2+\Omega^2I)\ne0$ but $(A^2+\Omega^2I)^2=0$ on that block. The out-of-plane centre coordinate is untouched by the rotation and keeps its zero eigenvalue with a size-two block. The relative rows of the table (phase and family, tilt, radial) are already stated in the rotating frame and are unchanged. The corrected spectrum, labelled by frame, is:

| Direction | Dim. | Inertial frame | Wholly co-rotating frame (autonomous Jacobian) |
| --- | --- | --- | --- |
| Centre, in-plane translation and boost | 4 | eigenvalue $0$, two Jordan blocks of size 2 | eigenvalues $\pm i\Omega$, one Jordan block of size 2 at each |
| Centre, out-of-plane translation and boost | 2 | eigenvalue $0$, one Jordan block of size 2 | eigenvalue $0$, one Jordan block of size 2 |
| Rotation phase and change of radius within the circular family | 2 | Floquet multiplier $1$ with a size-2 block (secular phase drift) | eigenvalue $0$, one Jordan block of size 2 |
| Plane tilt | 2 | $\pm i\Omega$ ($\delta\ddot z=-\Omega^2\delta z$ is autonomous in either frame); Floquet multipliers $1$ | $\pm i\Omega$, simple |
| Radial oscillation | 2 | Floquet multipliers $e^{\pm2\pi i\omega_r/\Omega}$ | $\pm i\omega_r$, simple |

In the inertial frame the relative part is a time-periodic linear system, so its invariants are Floquet multipliers over the orbital period $2\pi/\Omega$, not eigenvalues; the centre block is autonomous in both frames. The wholly co-rotating twelve-state Jacobian therefore has characteristic polynomial $s^4(s^2+\Omega^2)^3(s^2+\omega_r^2)$ and minimal polynomial $s^2(s^2+\Omega^2)^2(s^2+\omega_r^2)$: the eigenvalue $\pm i\Omega$ has algebraic multiplicity three (a size-two centre block plus the simple tilt eigenvalue), and the zero eigenvalue has algebraic multiplicity four (the out-of-plane centre block plus the phase-and-family block). A numerical spectrum comparison must use these multiplicities. No eigenvalue has positive real part in either frame, and the linear growth remains confined to the symmetry and family directions, so the stability conclusion of Section 7.3 is unchanged.

*Spot check.* Check K3 verified the analytic block (A.1): characteristic polynomial $(s^2+\Omega^2)^2$ to $10^{-16}$, $(A^2+\Omega^2I)\ne0$ with $(A^2+\Omega^2I)^2=0$ to $2\times10^{-16}$. Check T1 assembled the full twelve-state Cartesian law in the wholly rotating frame at the circular histories $x=1$ and $x=4$ (equilibrium residual $\le2\times10^{-16}$), took a Richardson-extrapolated finite-difference Jacobian, and found the characteristic polynomial above with coefficient error $\le6\times10^{-12}$ after time rescaling by $1/\Omega$; the minimal polynomial annihilated the Jacobian to $5\times10^{-12}$ while dropping one factor $s$ or one factor $(s^2+\Omega^2)$ left residuals of order one, which establishes the size-two Jordan blocks at $0$ and at $\pm i\Omega$. Grade: derived (A.1) and measured (T1, finite-difference Jacobian of the exact law). Falsifier: a wholly co-rotating Jacobian of the exact law whose minimal polynomial has $(s^2+\Omega^2)$ to the first power.

*Superseded.* Section 7.3, table row "Centre translation and boost | 6 | eigenvalue 0, three Jordan blocks of size 2: the centre drifts linearly under a boost", read as part of a co-rotating description. It is correct only as an inertial-frame statement. The sentence "Describing the relative part in the frame co-rotating at $\Omega$, in which the reference is an equilibrium, the linear spectrum is:" is superseded by the labelled table above.

### Item 2. Section 7.4: the dispersal proof's lower speed bound fails at $\varepsilon=0$

**Verdict: accepted.** The proof of Theorem 7.4 asserts, for $\varepsilon\ge0$, that "$\dot r^2$ is bounded below away from the single turning point". On the level $\varepsilon=0$ with $h>0$, (5.5) gives

$$
\dot r^2=\frac{2kr-h^2}{r(r+\kappa)}\qquad(\varepsilon=0,\ \sigma=-1),
\tag{A.2}
$$

which tends to zero like $2k/r$ as $r\to\infty$; the same holds at $h=0$, where $\dot r^2=2k/(r+\kappa)$. There is no positive lower bound on the unbounded interval, so the stated reason does not prove that $r\to\infty$. The conclusion is nevertheless true, and the corrected argument is the following.

*Corrected proof of the dispersal class.* Let $h>0$ and $\varepsilon\ge0$. Since $\Delta\ge1$, (5.5) confines $r$ to $\{V_{\mathrm{eff}}\le\varepsilon\}=[r_p,\infty)$, and $\dot r^2>0$ on $(r_p,\infty)$ because $V_{\mathrm{eff}}<\varepsilon$ there: for $\varepsilon\ge0$ the turning radius $r_p$ lies on the decreasing branch of $V_{\mathrm{eff}}$ (left of its minimum at $r_0=h^2/k$), $V_{\mathrm{eff}}$ decreases from $\varepsilon$ on $(r_p,r_0]$, and it is negative on $(r_0,\infty)$. The turning point $r_p$ is simple ($V_{\mathrm{eff}}'(r_p)<0$), so a history with $\dot r<0$ reaches it in finite time and leaves it with $\dot r>0$, and thereafter $\dot r$ cannot vanish. Hence $r$ is strictly increasing after at most one minimum. Suppose $r$ stayed bounded; then $r\to r_\infty\in(r_p,\infty)$ and, by continuity of (5.5), $\dot r\to\sqrt{2(\varepsilon-V_{\mathrm{eff}}(r_\infty))/\Delta(r_\infty)}>0$, which contradicts convergence of $r$. So $r\to\infty$, and (5.5) gives $\dot r^2\to2\varepsilon$, which is $0$ when $\varepsilon=0$. Global forward existence holds because $r\ge r_p>0$ keeps the solve regular and $\|\mathbf w\|^2=\dot r^2+h^2/r^2\le2(\varepsilon-\min V_{\mathrm{eff}})+h^2/r_p^2$ is bounded. The escape takes infinite time in every case; on $\varepsilon=0$ it is slow, $r\simeq(9k/2)^{1/3}T^{2/3}$ asymptotically. The case $h=0$, $\varepsilon\ge0$, $\dot r>0$ follows from the collinear source's shifted inverse-square form in the same way. The bound class and the collision class are untouched. $\square$

*Spot check.* Check T2 evaluated (A.2) with $K=c_f=1$, $h=1$ at $r=2,10,10^2,\ldots,10^6$: $\dot r^2$ decreased monotonically from $0.875$ to $4\times10^{-6}$, and the quadrature time to reach $8\times10^3$ divided by the time to reach $10^3$ was $22.56$ against the asymptotic $8^{3/2}=22.63$. Check T2b found $\dot r^2>0$ at every sampled $r>r_p$. Grade: derived (proof) and measured (T2, quadrature of (5.5)). Falsifier: an opposite-polarity history with $h>0$, $\varepsilon\ge0$ whose separation converges to a finite limit.

*Superseded.* Section 7.4, proof of Theorem 7.4, the sentence "For $\varepsilon\ge0$, $\dot r^2$ is bounded below away from the single turning point, so $r\to\infty$." The theorem statement itself stands.

### Item 3. Section 9: the speed-domain table

**Verdict: accepted on all three points** (the omitted boundary level $\varepsilon=2c_f^2$, the undefined $\sqrt{\varepsilon/2}$ for $\varepsilon<0$, and the centre-rest-frame restriction of the contact-speed statement). The radial row of the table is rewritten here; the other rows are confirmed with one clarification.

*Derivation of the radial speed function.* With $\sigma=-1$, $h=0$ and the centre of velocity at rest, the individual speed $v=|\dot r|/2$ on the level $\varepsilon$ is, from (5.5),

$$
v(r)^2=\frac{\varepsilon r+k}{2(r+\kappa)},\qquad \frac{d(v^2)}{dr}=\frac{\kappa(\varepsilon-c_f^2)}{2(r+\kappa)^2},
\tag{A.3}
$$

using $k=\kappa c_f^2$. So $v$ is strictly decreasing in $r$ when $\varepsilon<c_f^2$, constant when $\varepsilon=c_f^2$ and strictly increasing when $\varepsilon>c_f^2$; $v\to c_f/\sqrt2$ as $r\to0$ for every $\varepsilon$, and $v\to\sqrt{\varepsilon/2}$ as $r\to\infty$ when $\varepsilon\ge0$. For $\varepsilon<0$ the history is confined to $r\le k/|\varepsilon|$, where $v=0$, so the expression $\sqrt{\varepsilon/2}$ never enters. The supremum over the maximal history (both time directions; contact ends it) is therefore $c_f/\sqrt2$ for $\varepsilon\le c_f^2$ and $\sqrt{\varepsilon/2}$ for $\varepsilon>c_f^2$, the latter approached only as $r\to\infty$ and never attained. Equality $v=c_f$ at finite $r$ requires $\varepsilon r+k=2c_f^2(r+\kappa)$, that is $r_\times=k/(\varepsilon-2c_f^2)$, which is positive only for $\varepsilon>2c_f^2$. At $\varepsilon=2c_f^2$ the speed is below $c_f$ at every finite separation with supremum exactly $c_f$ at infinity: the strict label holds pointwise but with no uniform margin.

*Corrected radial row* (opposite polarity, $h=0$, centre of velocity at rest, maximal history):

| Level | Supremum of individual speed | Where | Strict pointwise ($<c_f$ everywhere) | Uniform margin $c_f-\sup v$ | Equality touched | Superfield |
| --- | --- | --- | --- | --- | --- | --- |
| $\varepsilon<c_f^2$ (including every $\varepsilon<0$) | $c_f/\sqrt2$ | approached at contact, not attained | yes | $c_f(1-1/\sqrt2)>0$ | no | no |
| $\varepsilon=c_f^2$ | $c_f/\sqrt2$ | attained throughout (uniform motion) | yes | $c_f(1-1/\sqrt2)$ | no | no |
| $c_f^2<\varepsilon<2c_f^2$ | $\sqrt{\varepsilon/2}$ | approached at infinity, not attained | yes | $c_f-\sqrt{\varepsilon/2}>0$ | no | no |
| $\varepsilon=2c_f^2$ | $c_f$ | approached only at infinity | yes | $0$ (no margin) | not at any finite $r$ | no |
| $\varepsilon>2c_f^2$ | $\sqrt{\varepsilon/2}$ | approached at infinity | no | none | at $r_\times=k/(\varepsilon-2c_f^2)$ | for $r>r_\times$ |

*The remaining rows.* The bound and dispersal rows with $h>0$ stand: their square root $\sqrt{k^2/h^2+2\varepsilon}$ is real because $\varepsilon\ge\min V_{\mathrm{eff}}=-k^2/(2h^2)$ on every level with $h>0$. For the dispersal row the argument of Section 7.5 is completed in Item 6 below. The like-polarity dispersal row's bound $\sqrt{\varepsilon/2}$ for $\varepsilon<c_f^2$ is a supremum approached at infinity, hence strict with a uniform margin. For every row, "strict" in the sense of a uniform margin coincides with strict pointwise except on the radial level $\varepsilon=2c_f^2$, where the supremum is not attained and the margin is zero.

*Common centre velocity.* The law is boost-invariant, the labels are not. With $\mathbf V_{1,2}=\mathbf V_c\pm\mathbf w/2$,

$$
\max\big(\|\mathbf V_1\|^2,\|\mathbf V_2\|^2\big)=\|\mathbf V_c\|^2+\tfrac14\|\mathbf w\|^2+\big|\mathbf V_c\cdot\mathbf w\big| ,
\tag{A.4}
$$

so the exact strict-domain condition for a history is $\sup_T\big[\|\mathbf V_c\|^2+\tfrac14\|\mathbf w\|^2+|\mathbf V_c\cdot\mathbf w|\big]<c_f^2$. The sufficient condition $\|\mathbf V_c\|+\tfrac12\sup\|\mathbf w\|<c_f$ of Section 9 follows from (A.4) by the Cauchy–Schwarz inequality, and it is also necessary for a circular history with $\mathbf V_c$ in the orbital plane, because $\mathbf w$ then sweeps every in-plane direction at constant magnitude. The statement that every collinear contact occurs at individual speed $c_f/\sqrt2$ (Section 7.4 class 3 and the collinear source) holds only with the centre of velocity at rest. The boost-invariant statement is that the relative speed at contact is $\sqrt2c_f$; the individual speeds at contact are $\|\mathbf V_c\pm(c_f/\sqrt2)\mathbf e\|$. For a drift $V_c$ along the line they are $|V_c\pm c_f/\sqrt2|$, and the faster member reaches $c_f$ at contact once $|V_c|\ge c_f(1-1/\sqrt2)\approx0.293c_f$, well below the drift $c_f$ at which every history leaves the strict domain. A Cartesian instrument must evaluate the speed labels from its actual centre velocity and the exact speed function, not from the centre-rest table.

*Spot check.* Check T3 tabulated (A.3) with $K=c_f=1$ on the levels $\varepsilon\in\{-0.5,0,0.5,1,1.5,2,3\}$: $v\to0.707107$ at contact on every level, monotone in the direction (A.3) predicts, $v(10^6)=0.9999995<1$ on $\varepsilon=2$, and $v(r_\times)=1$ to $10^{-14}$ at $r_\times=2$ on $\varepsilon=3$. Check T3c verified (A.4) at 200 random velocity pairs to $2\times10^{-15}$. Grade: derived. Falsifier: a radial opposite-polarity history on $\varepsilon=2c_f^2$ whose individual speed reaches $c_f$ at finite separation with the centre at rest.

*Superseded.* Section 9, table row "Opposite polarity, radial ($h=0$) | $\max(c_f/\sqrt2,\ \sqrt{\varepsilon/2})$ over the full history; $c_f/\sqrt2$ is the contact limit | $\varepsilon<2c_f^2$ | not attained for $\varepsilon<2c_f^2$ | $\varepsilon>2c_f^2$, with the equality crossing at $r_\times=k/(\varepsilon-2c_f^2)$", replaced by the corrected radial row above. The sentence "Unless stated, the centre of velocity is at rest, so $\|\mathbf V_1\|=\|\mathbf V_2\|=\|\mathbf w\|/2$" stands as the table's frame declaration, and every speed value in the table and in Section 7.4 class 3 is to be read under it.

### Item 4. Theorem 8.1: the omitted exterior outward branch and the complete branch list

**Verdict: accepted.** Class 2 of Theorem 8.1 covers only an *approaching* exterior history with $\varepsilon>V_{\mathrm{eff}}(\kappa)$; the receding exterior history on the same levels, which disperses without ever turning, is missing, and class 4 states finite-time arrival at $r=\kappa$ for the threshold level without distinguishing the direction. The theorem's conclusion, that no like-polarity history is regular for all time with separation bounded away from zero and infinity, survives, because every branch below ends in dispersal, arrival at the critical radius or contact.

*Derivation.* For $\sigma=+1$, $V_{\mathrm{eff}}=h^2/(2r^2)+k/r$ is strictly decreasing on $(0,\infty)$, from $+\infty$ to $0$, with $V_{\mathrm{eff}}(\kappa)=c_f^2+h^2/(2\kappa^2)$. By (5.5), the exterior $r>\kappa$ (where $\Delta>0$) is accessible where $V_{\mathrm{eff}}(r)\le\varepsilon$, and the interior $0<r<\kappa$ (where $\Delta<0$) where $V_{\mathrm{eff}}(r)\ge\varepsilon$. Exterior histories therefore require $\varepsilon>0$; if $0<\varepsilon<V_{\mathrm{eff}}(\kappa)$ the accessible exterior set is $[r_t,\infty)$ with $r_t=V_{\mathrm{eff}}^{-1}(\varepsilon)>\kappa$ and $\dot r$ vanishes only at $r_t$; if $\varepsilon\ge V_{\mathrm{eff}}(\kappa)$ the accessible exterior set is all of $(\kappa,\infty)$ with $\dot r^2>0$ throughout, so $\dot r$ keeps its sign and there is no exterior turning point. Interior histories with $\varepsilon\le V_{\mathrm{eff}}(\kappa)$ have $\dot r^2>0$ on all of $(0,\kappa)$ (no interior turning point); with $\varepsilon>V_{\mathrm{eff}}(\kappa)$ the accessible interior set is $(0,r_t]$ with $r_t<\kappa$. Arrival at $r=\kappa$ from either side has $\dot r^2\to\infty$ when $\varepsilon\ne V_{\mathrm{eff}}(\kappa)$ and $\dot r^2\to2c_f^2+2h^2/\kappa^2$ on the threshold level, where (3.1) vanishes with $\Delta$ and the solve is indeterminate; arrival at contact has $\dot r^2\approx h^2/(\kappa r)$ for $h>0$ and $\dot r^2\to2c_f^2$ for $h=0$. Finite-time arrival follows as in the original proof. The dispersal branches have $r$ strictly increasing with $\dot r^2\to2\varepsilon$, by the argument of Item 2 applied with $\Delta\to1$. The complete list, by region, level and direction of motion, is:

| Region | Level | Approaching ($\dot r<0$) | Receding ($\dot r>0$) |
| --- | --- | --- | --- |
| Exterior $r>\kappa$ | $0<\varepsilon<V_{\mathrm{eff}}(\kappa)$ | turns once at $r_t>\kappa$, then disperses (original class 1) | disperses, no turning point (original class 1) |
| Exterior | $\varepsilon=V_{\mathrm{eff}}(\kappa)$ | reaches $r=\kappa$ in finite time at the finite speed $\sqrt{2c_f^2+2h^2/\kappa^2}$; indeterminate solve (original class 4) | disperses, no turning point (**omitted**; the time reverse of the approaching branch through the level continuation) |
| Exterior | $\varepsilon>V_{\mathrm{eff}}(\kappa)$ | reaches $r=\kappa$ in finite time with divergent speed and acceleration (original class 2) | disperses, no turning point, $\dot r^2\to2\varepsilon$ (**omitted**) |
| Interior $0<r<\kappa$ | $\varepsilon<V_{\mathrm{eff}}(\kappa)$ (including $\varepsilon\le0$) | contact in finite time (original class 3) | reaches $r=\kappa$ in finite time with divergent speed (original class 3) |
| Interior | $\varepsilon=V_{\mathrm{eff}}(\kappa)$ | contact in finite time (original class 3) | reaches $r=\kappa$ at the finite threshold speed; indeterminate solve (original class 4) |
| Interior | $\varepsilon>V_{\mathrm{eff}}(\kappa)$ | contact in finite time (original class 3) | turns once at $r_t<\kappa$, then contact (original class 3) |

Each branch is a maximal regular history in forward time; the omitted exterior receding branches are the time reverses of the exterior approaching branches on the same level, so adding them changes no fate already listed. The saddle structure at the indeterminate point and its eigenvalues $\pm\kappa^2|\dot r_*|$ are unchanged; the level continuation connects the threshold-level exterior approaching branch to the interior approaching branch (and the interior receding branch to the exterior receding branch), ending in contact at one end and dispersal at the other, as the original class 4 says.

*Spot check.* Check T4 integrated the reduced equation (5.2) by RK4 with $K=c_f=1$, $h=1$ ($V_{\mathrm{eff}}(\kappa)=1.125$) for all twelve region–level–direction cases of the table and found the listed fate and turning-point count in every case; the omitted exterior receding branch on $\varepsilon=1.5$ dispersed with no turning point and $\dot r^2=3.005$ against $2\varepsilon=3$ at $r=400$, the threshold-level arrivals had $|\dot r|=1.581$ against $\sqrt{2+2h^2/\kappa^2}=1.581$, and the interior contacts with $h=1$ had $|\dot r|\approx71$ at $r=10^{-4}$ against $\sqrt{h^2/(\kappa r)}=70.7$. Check T4b found $\dot r^2>0$ at every sampled exterior $r$ on $\varepsilon=1.5$. Known case K5 (an opposite-polarity bound history returning to its closed-form turning points to $6\times10^{-8}$) preceded the target runs. Grade: derived (table) and measured (T4, RK4 on (5.2)). Falsifier: a like-polarity exterior history with $\varepsilon>V_{\mathrm{eff}}(\kappa)$ that turns.

*Superseded.* Section 8, Theorem 8.1, the sentence "Every history falls into one of these classes" together with class 2 "Outside, finite-time arrival at the critical radius ($r>\kappa$, $\varepsilon>V_{\mathrm{eff}}(\kappa)$, approaching)" read as exhaustive, and class 4's "A history on this level reaches $r=\kappa$ in finite time with finite speed", which holds for the exterior approaching and interior receding directions only. The theorem's first sentence, its conclusion and its proof are unchanged.

### Item 5. Section 4.4: the integrating factor is $|\Delta|$, and the constant is chart-specific

**Verdict: partially accepted.** The displayed formulas (4.9) and (5.6) already carry the absolute value $|1-a/r|$ and the restriction "on any interval not containing $r=a$", so they are correct as written. Two sentences are nonetheless imprecise. First, "For the frozen coefficients $I=\Delta=1-a/r$ and (4.9) reduces to (5.4)" holds only where $\Delta>0$; on the interior chart of a like-polarity history $I=|\Delta|=-\Delta$, and (4.9) there equals $-(\Delta\dot r^2-\int2\Delta\mathcal A\,dr)$, that is $-2\varepsilon$ up to a constant, so the invariant of (4.9) is $-2\varepsilon$ rather than $2\varepsilon$ on that chart. Since a constant multiple of an invariant is an invariant, the signed rational form (5.4) remains the correct frozen-law first integral on each regular chart, and it is the form used throughout Sections 5–8. Second, the constant on the right of (4.9), (5.6) and the collinear source's (2.1) is specific to the chart (the interval between consecutive singular points $r=0$ and $r=a$) on which it is evaluated; it need not agree between the exterior and interior charts of one like-polarity history, and for the frozen law it changes sign between them (collinear addendum, item 5a). A general real power $\Delta^p$ with $p=-2\lambda_{\mathrm W}/\mu_{\mathrm W}$ is not real where $\Delta<0$, which is why the absolute value is required; a chart-specific signed normalization is an equivalent alternative when $p$ is an integer.

*Spot check.* Check T5c verified the signed identity $\Delta\,(1-\dot r^2/(2c_f^2))=1-\varepsilon/c_f^2$ at 200 random radial states on both charts and both polarities to $9\times10^{-16}$; T5 and T5b are reported in the collinear addendum. Grade: derived. Falsifier: a regular interior like-polarity radial history along which $\varepsilon$ from (5.4) is not constant.

*Superseded.* Section 4.4, the sentence "For the frozen coefficients $I=\Delta=1-a/r$ and (4.9) reduces to (5.4)", replaced by: for the frozen coefficients $I=|\Delta|$, and (4.9) reduces to $\pm2\varepsilon$ with the sign of $\Delta$ on each chart, so that (5.4) is the first integral on every regular chart.

### Item 6. Further defect found while rederiving: the dispersal supremum argument in Section 7.5 is incomplete

**Verdict: defect in the argument, conclusion confirmed.** Section 7.5 states that the $u$-derivative of $\|\mathbf w\|^2$ has the sign of $q(u)=2k-2\kappa\varepsilon+3\kappa h^2u^2+2\kappa^2h^2u^3$, "which is positive when $\varepsilon<c_f^2$", and then extends the pericentre supremum to dispersal histories by comparing only the pericentre and asymptotic values. For $\varepsilon>c_f^2$ the sign of $q$ is negative near $u=0$, so the comparison of the two endpoint values does not by itself exclude an interior maximum. The missing step is that $q$ is strictly increasing on $u>0$, so $q$ changes sign at most once, from negative to positive; hence $\|\mathbf w\|^2$ has at most one interior critical point on $(0,u_p]$, and that point is a minimum. The supremum is therefore at an endpoint, and since the pericentre value $h^2/r_p^2=(k/h+\sqrt{k^2/h^2+2\varepsilon})^2$ exceeds the asymptotic value $2\varepsilon$ for every $k>0$, it is at pericentre, as (7.6) states, for every $\varepsilon\ge0$ and $h>0$. The Section 9 dispersal row stands.

*Spot check.* Check T3b scanned $\|\mathbf w\|^2(u)$ on $(0,u_p]$ for 300 random $(h,\varepsilon)$ including $\varepsilon>c_f^2$: at most one interior critical point and the supremum at the pericentre end in all 300 cases. Grade: derived. Falsifier: a dispersal history with $h>0$ whose relative speed exceeds $h/r_p$ at some finite separation.

No further defect was found in Sections 2–6, 7.1–7.2, 7.5–7.6 or 10 on rederivation; the closed forms (3.1)–(3.5), (5.1)–(5.6), (7.1)–(7.7), the saddle eigenvalues of Section 8 and the numerical values of Section 10 were reconfirmed by hand where they were used above.

### Consequences for the independent reference lane

The independent reference should re-examine, against this addendum rather than the original sections: the frame label of any linear spectrum it reports about the circular history (Item 1: multiplicities $4$, $3$, $3$, $1$, $1$ at $0$, $+i\Omega$, $-i\Omega$, $\pm i\omega_r$ in the wholly rotating frame); its own dispersal proof at $\varepsilon=0$ (Item 2); its speed-domain statements at the radial boundary level $\varepsilon=2c_f^2$, for $\varepsilon<0$, and under centre drift (Item 3); its like-polarity classification for the exterior receding branches with $\varepsilon\ge V_{\mathrm{eff}}(\kappa)$ (Item 4), which the final-hour assessment also found overcompressed in the reference's own summary; and the sign of its separated-invariant constant on the interior like-polarity chart (Item 5).

## Addendum: corrections to the frozen checkpoint (2026-10-05T15:50Z)

The [closeout verification](weber-overnight-closeout-verification.md) checked every number in the frozen checkpoint against its sources. The checkpoint is not rewritten; the following corrections supersede the stated values. None changes a verdict.

1. Case table, opposite-polarity class row: "$\pi\sqrt{1+2/x}$" is the small-amplitude apsidal angle (pericentre to apocentre); the precession per radial period is $2\pi(\sqrt{1+2/x}-1)$.
2. WR-0 row: the measured early rates are anchored to the reference at $\le6.4\times10^{-7}$, not $\le6\times10^{-7}$.
3. WR-1…WR-7 row: the $c_f$ crossings occur within $1.0$–$5.4$ periods at $x=1.7$ and within $0.3$–$1.7$ periods at $x=0.8$. The rate agreement "$10^{-8}$–$10^{-12}$" omits three fits: sublattice at $x=0.8$ ($4\times10^{-8}$), the slow $k=2$ root from the elliptic start at $x=0.8$ ($6.4\times10^{-7}$, fourteen samples) and the rotation-phase start at $x=0.8$ ($4.4\times10^{-6}$).
4. Counts: the ring perturbation cases number $9$ vectors $\times$ $2$ radii $\times$ $2$ amplitudes $=36$, not 14, so the newly specified cases are $15+3+4+36+1=59$, not 37. Five ring runs were step-capped at the preregistered tolerance (WR-3, WR-4a, WR-6, WR-7a, WR-7b), two of them at both tolerances, not three. The undefined cases listed are three (contact; the like-polarity singular radius; the ring's $x=1$), not two. The corrected prior claims within the run's own sources number at least eight by the checkpoint's own citations (addendum items 1–6, persistence Theorem 2.2 item 3, the WP-1 supremum label), and about twenty-one if every recorded labelling or wording correction in the adjudication documents is counted; the stated "7" undercounts.
5. Verification limits recorded by the closeout: the sandbox cannot see host processes, and `node scripts/dev/owned-compute-supervisor.mjs list --active` fails there over the number of lease files, so the "nothing is running" claim rests on the fact that no launch in this lane used detachment (every run was a foreground `node` call that returned) and should be closed on the host with that command. Adjudication Section 8 records the checks script hash before its Section 13 appendix; the current file hash is `4a5c4112…5807`. Twenty-three links from five committed documents point into ignored `.tmp/weber-overnight/` scratch; those validation scripts and outputs should be promoted to `evidence/` or `.local-data/` before publication, an integration step outside this frozen record.


## Evidence path promotion, 2026-10-05

The linked scratch files `.tmp/weber-overnight/reduction/checks.mjs`, `.tmp/weber-overnight/reduction/predictions.mjs`, `.tmp/weber-overnight/reduction/predictions.out.txt`, `.tmp/weber-overnight/reduction/checks.out.txt`, `.tmp/weber-overnight/round2/corrections/corrections-checks.mjs`, `.tmp/weber-overnight/round2/corrections/corrections-checks.out.txt` were moved byte-identically to the durable paths now linked above. The [closeout promotion map](weber-overnight-closeout-verification.md#part-3--promotion-map) records each old path, new path and SHA-256. Historical command text and receipt content retain their recorded paths; ignored scratch aliases preserve those provenance-bound paths without making them the durable owner.


### Durable copies of recorded scratch inputs

Recorded command and provenance text retain their original paths. Byte-identical durable owners are [checks.mjs](../evidence/weber-overnight-promoted/reduction/checks.mjs), [predictions.mjs](../evidence/weber-overnight-promoted/reduction/predictions.mjs), [predictions.out.txt](../evidence/weber-overnight-promoted/reduction/predictions.out.txt), [checks.out.txt](../evidence/weber-overnight-promoted/reduction/checks.out.txt), [corrections-checks.mjs](../evidence/weber-overnight-promoted/round2/corrections/corrections-checks.mjs), [corrections-checks.out.txt](../evidence/weber-overnight-promoted/round2/corrections/corrections-checks.out.txt). The [promotion map](weber-overnight-closeout-verification.md#part-3--promotion-map) records hashes and the retained scratch aliases.
