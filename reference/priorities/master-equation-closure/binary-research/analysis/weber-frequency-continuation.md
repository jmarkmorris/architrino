# Frequency dependence of the opposite-polarity binary circle under the instantaneous Weber comparison law

Status: lane "weber-frequency derivation" of the [Weber binding-sphere continuation](../../braid-program/analysis/weber-binding-sphere-preregistration.md), written 2026-10-05T23:42Z to 2026-10-06 (elapsed time in Section 9). The law, the frequency conventions and the known cases are those frozen in Sections 1, 3, 4, 6 and 8 of that preregistration. The frozen [overnight pair investigation](weber-overnight-investigation.md) with its two addenda is the control for every statement here and is not edited by this lane. The instrument is [weber-frequency-continuation.mjs](../evidence/weber-frequency-continuation.mjs) with its receipt [weber-frequency-continuation.json](../evidence/weber-frequency-continuation.json); it imports nothing from any other instrument. Every claim is graded derived, measured, inferred or open where it is made, with a falsifier. Nothing here is a claim about the six-body sphere.

## Contents

1. [Definitions and conventions](#1-definitions-and-conventions)
2. [The circular balance and its closed forms](#2-the-circular-balance-and-its-closed-forms)
3. [Monotonicity, limits, the equality frequency and the admissible intervals](#3-monotonicity-limits-the-equality-frequency-and-the-admissible-intervals)
4. [Three frequencies: orbital, radial and tilt; resonances](#4-three-frequencies-orbital-radial-and-tilt-resonances)
5. [The integer ladder and the same-radius question](#5-the-integer-ladder-and-the-same-radius-question)
6. [Known-case passes](#6-known-case-passes)
7. [Measured table and perturbation checks](#7-measured-table-and-perturbation-checks)
8. [Plots](#8-plots)
9. [Claims, falsifiers, what this lane did not do, and elapsed time](#9-claims-falsifiers-what-this-lane-did-not-do-and-elapsed-time)

## 1. Definitions and conventions

The law is the selected instantaneous Weber comparison of [Section 9 of the equation-variants manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response). For members $i\ne j$ with polarities $q_i\in\{+1,-1\}$, polarity product $\sigma_{ij}=q_iq_j$, present separation $d_{ij}=\|\mathbf X_i-\mathbf X_j\|>0$ and separation direction $\mathbf e_{ij}=(\mathbf X_i-\mathbf X_j)/d_{ij}$, the acceleration of member $i$ is

$$
\mathbf A_i=\sum_{j\ne i}\frac{\sigma_{ij}K}{d_{ij}^{2}}\left[1-\frac{\dot d_{ij}^{2}}{2c_f^{2}}+\frac{d_{ij}\ddot d_{ij}}{c_f^{2}}\right]\mathbf e_{ij},
\tag{1.1}
$$

with coupling $K>0$ (dimension $L^3T^{-2}$), wake speed $c_f$, response coefficients $\lambda_{\mathrm W}=-1/2$ and $\mu_{\mathrm W}=1$ already inserted, unit integration weights (architrinos have no mass; the law gives acceleration, never force), instantaneous distinct-partner support, no self term, no boundary response, no softening and no speed ceiling enforced. Dots are derivatives with respect to absolute time $T$. In every numerical value $K=c_f=1$; in every derivation $K$ and $c_f$ stay symbolic. The second derivative of the separation contains the unknown accelerations through $\ddot d_{ij}=\mathbf e_{ij}\cdot(\mathbf A_i-\mathbf A_j)+\|\mathbf w_{ij,\perp}\|^2/d_{ij}$, where $\mathbf w_{ij}=\mathbf V_i-\mathbf V_j$ is the relative velocity and $\mathbf w_{ij,\perp}=\mathbf w_{ij}-(\mathbf e_{ij}\cdot\mathbf w_{ij})\mathbf e_{ij}$ its transverse part, so (1.1) is implicit and every evaluation is a linear solve. For an isolated pair the solve has six unknowns and its determinant is $\Delta=1-2\sigma K\mu_{\mathrm W}/(c_f^2d)$ (overnight Section 3.2, derived there and independently adjudicated); for opposite polarity, $\sigma=-1$, this is $\Delta=1+2K/(c_f^2d)>1$ at every $d>0$.

This document concerns the opposite-polarity pair, $\sigma=-1$, with $d=d_{12}$ and $\mathbf e=\mathbf e_{12}$. A uniform circular history is one in which both members move on a common circle of radius $\rho$ about a fixed centre, diametrically opposite each other, at constant angular rate. Its primitive orbital period $P$ is the least positive time after which the configuration repeats exactly in absolute time; the cyclic frequency is $f=1/P$ and the angular frequency is $\Omega=2\pi f$. The member orbital radius $\rho$ is the distance of each member from the centre, the pair separation is $d=2\rho$, and the individual centre-rest speed is $v=\Omega\rho$.

Speed labels depend on the motion of the centre. Because each pair contribution to (1.1) is antisymmetric in $i\leftrightarrow j$, the sum of accelerations vanishes, $\mathbf A_1+\mathbf A_2=\mathbf 0$, so the sum of velocities $\mathbf V_1+\mathbf V_2$ is an invariant of the law (overnight Section 4.1). The centre-rest frame is the frame in which this invariant is zero; in it both members have the same speed $v=\|\mathbf w\|/2$, and the labels strict ($v<c_f$), equality ($v=c_f$) and superfield ($v>c_f$) are assigned in that frame. In any other frame the two members' speeds differ and the labels change (overnight addendum item 3, eq. (A.4)); the accelerations do not. A label never modifies an acceleration.

> Claim grade: derived (the invariant $\mathbf V_1+\mathbf V_2$ from the antisymmetry of (1.1)). Falsifier: a solved pair state with $\mathbf A_1+\mathbf A_2\ne\mathbf 0$; the receipt's K1 and grid rows have $\mathbf A_1=-\mathbf A_2$ to $10^{-16}$.

## 2. The circular balance and its closed forms

On a uniform circle the separation is constant, so $\dot d=0$ and $\ddot d=0$ and the bracket in (1.1) is exactly $1$ regardless of the values of $\lambda_{\mathrm W}$ and $\mu_{\mathrm W}$. The law reduces on this history to the instantaneous inverse-square acceleration $\mathbf A_1=-(K/d^2)\,\mathbf e$, directed toward the partner. A member on a circle of radius $\rho$ at angular rate $\Omega$ has acceleration $-\Omega^2\mathbf X_1$ with $\mathbf X_1=\rho\,\mathbf e$ (the centre is the origin and $\mathbf e$ points from member 2 to member 1, that is, outward from the centre through member 1), so balance requires

$$
\Omega^2\rho=\frac{K}{d^2}=\frac{K}{4\rho^2}\qquad\Longleftrightarrow\qquad \Omega^2\rho^3=\frac K4 .
\tag{2.1}
$$

The same balance follows from the implicit pair identity without first setting the bracket to one. Write $\mathbf A_1=f\,\mathbf e$, $\mathbf A_2=-f\,\mathbf e$ (radiality is a consequence of the solve, overnight Section 3.2). Substituting $\ddot d=2f+\|\mathbf w_\perp\|^2/d$ into (1.1) with $\sigma=-1$ gives

$$
\left(1+\frac{2K}{c_f^2d}\right)f=-\frac{K}{d^2}\left(1-\frac{\dot d^2}{2c_f^2}+\frac{\|\mathbf w_\perp\|^2}{c_f^2}\right).
\tag{2.2}
$$

On the circle $\dot d=0$, $f=-\Omega^2\rho$ and the transverse relative speed is $\|\mathbf w_\perp\|=\|\mathbf w\|=2v=\Omega d$. Then the left side is $-\Omega^2\rho-2K\Omega^2\rho/(c_f^2d)=-\Omega^2\rho-K\Omega^2/c_f^2$, using $d=2\rho$, and the right side is $-K/d^2-K\Omega^2/c_f^2$. The two $K\Omega^2/c_f^2$ terms cancel identically, leaving $\Omega^2\rho=K/d^2$, which is (2.1). The two routes agree because the $\mu_{\mathrm W}$ term contributes $\mu_{\mathrm W}d\ddot d/c_f^2$ to the bracket, and on the circle $\ddot d=0$ is exactly the statement that the unknown part $2f\,d/c_f^2$ and the known part $\|\mathbf w_\perp\|^2/c_f^2$ cancel.

Solving (2.1) for the geometry as a function of the angular frequency, and using $d=2\rho$ and $v=\Omega\rho$,

$$
\rho(\Omega)=\left(\frac{K}{4\Omega^2}\right)^{1/3},\qquad d(\Omega)=\left(\frac{2K}{\Omega^2}\right)^{1/3},\qquad v(\Omega)=\left(\frac{K\Omega}{4}\right)^{1/3}.
\tag{2.3}
$$

Verification of each: $\Omega^2\rho^3=\Omega^2\cdot K/(4\Omega^2)=K/4$; $d^3=8\rho^3=8K/(4\Omega^2)=2K/\Omega^2$; $v^3=\Omega^3\rho^3=\Omega^3K/(4\Omega^2)=K\Omega/4$. Dimensions: $K/\Omega^2$ has dimension $L^3$ and $K\Omega$ has dimension $L^3T^{-3}$, as required. With $\Omega=2\pi f$ the cyclic forms are

$$
\rho(f)=\left(\frac{K}{16\pi^2f^2}\right)^{1/3},\qquad d(f)=\left(\frac{K}{2\pi^2f^2}\right)^{1/3},\qquad v(f)=\left(\frac{\pi Kf}{2}\right)^{1/3}.
\tag{2.4}
$$

Equivalently, the balance condition (2.1) can be written as $\Omega^2=K/(4\rho^3)=2K/d^3$, which is the preregistration's K1 form, and the orbital period is $P=2\pi/\Omega=\pi\sqrt{d^3/(2K)}$.

The overnight record states the circular family as $h^2=2Kd$, where $h=\|(\mathbf X_1-\mathbf X_2)\times\mathbf w\|$ is the relative angular momentum per unit weight (overnight Section 7.1 writes it as $h^2=kr$ with $k=2K$ and $r=d$). On the circle $h=d\|\mathbf w_\perp\|=d\cdot\Omega d=\Omega d^2$, so $h^2=2Kd$ becomes $\Omega^2d^4=2Kd$, that is $\Omega^2d^3=2K$, which is (2.3) for $d$. The frequency form (2.3) therefore reproduces the checked overnight identity exactly; nothing new is asserted about the family, only its parametrization by frequency.

> Claim grade: derived. Equations (2.1)–(2.4) are exact consequences of (1.1) on a uniform circular history with $\sigma=-1$, for every $K>0$, $c_f>0$ and $\Omega>0$. Falsifier: a state $\mathbf X_{1,2}=\pm\rho\hat{\mathbf x}$, $\mathbf V_{1,2}=\pm\Omega\rho\hat{\mathbf y}$ with $\Omega^2\rho^3=K/4$ whose solved accelerations differ from $-\Omega^2\mathbf X_i$ by more than rounding. The receipt's grid rows (Section 7) have relative residual $\le4.3\times10^{-16}$ at all eighteen frequencies, and K1 passes at $\rho\in\{0.25,1,3\}$ (Section 6).

## 3. Monotonicity, limits, the equality frequency and the admissible intervals

From (2.3), $\rho$ and $d$ are strictly decreasing in $\Omega$ (as $\Omega^{-2/3}$) and $v$ is strictly increasing (as $\Omega^{1/3}$); the same holds in $f$. As $f\to0$ the circle grows without bound, $\rho,d\to\infty$, while $v\to0$: slow, wide, slow-moving circles. As $f\to\infty$ the circle shrinks to a point, $\rho,d\to0$, while $v\to\infty$: fast, tight, fast-moving circles. Every $\Omega>0$ gives exactly one circle, every $\rho>0$ gives exactly one $\Omega>0$, and the map $\Omega\mapsto\rho$ is a bijection of $(0,\infty)$ onto itself. Coverage of the unrestricted law is therefore complete: there is no gap and no accumulation of circular frequencies anywhere in $(0,\infty)$.

The individual centre-rest speed reaches the wake speed where $v(\Omega)=c_f$, that is $K\Omega/4=c_f^3$:

$$
\Omega_{=}=\frac{4c_f^3}{K},\qquad f_{=}=\frac{2c_f^3}{\pi K},\qquad d_{=}=\frac{K}{2c_f^2},\qquad \rho_{=}=\frac{K}{4c_f^2}.
\tag{3.1}
$$

With $K=c_f=1$ these are $\Omega_{=}=4$, $f_{=}=2/\pi=0.636620$, $d_{=}=1/2$ and $\rho_{=}=1/4$, which is the overnight statement that equality is touched at dimensionless separation $x=dc_f^2/K=1/2$ (overnight Section 7.1). Because $v$ is strictly increasing in $f$, the strict admissible frequency interval, on which $v<c_f$, is $0<f<2c_f^3/(\pi K)$, and the inclusive interval, on which $v\le c_f$, is $0<f\le2c_f^3/(\pi K)$; the superfield circles occupy $f>2c_f^3/(\pi K)$. Nothing in the law changes at $f_{=}$: the balance (2.1) is independent of $c_f$, so the superfield circles are exact solutions of the unrestricted law and are labelled, not excluded. No ceiling is enforced.

The implicit solve is regular at every frequency. On the circle of frequency $\Omega$ the determinant is

$$
\Delta(\Omega)=1+\frac{2K}{c_f^2d(\Omega)}=1+\frac{(2K\Omega)^{2/3}}{c_f^2}=1+\frac{(4\pi Kf)^{2/3}}{c_f^2}\ \ge1,
\tag{3.2}
$$

using $2K/d=2K(\Omega^2/2K)^{1/3}=(2K)^{2/3}\Omega^{2/3}$. It is strictly increasing in $f$, equals $1$ only in the limit $f\to0$, and equals $5$ at the equality frequency. Since $\Delta\ge1$ at every $d>0$ the six-unknown solve is invertible along the entire family and along every history that stays at positive separation (overnight Section 3.3).

> Claim grade: derived. Falsifier: a circular history at some $f$ with $v$ not equal to $(\pi Kf/2)^{1/3}$, or a solved determinant on the circle differing from (3.2); the receipt reports $\det M-\Delta$ at every grid frequency to $\le1.8\times10^{-15}$ and $v=1$ exactly at $\Omega=4$.

## 4. Three frequencies: orbital, radial and tilt; resonances

Three distinct frequencies belong to the circle and are kept apart throughout. The orbital frequency $\Omega$ is the rate at which the configuration turns. The radial perturbation frequency $\omega_r$ is the rate of small oscillations of the separation about its circular value, at fixed relative angular momentum. The tilt frequency is the rate of small out-of-plane oscillation of the orbital plane.

The radial frequency follows from the reduced radial equation. In the centre-rest frame the relative motion of an opposite-polarity pair has the first integral (overnight eq. (5.4), with $k=2K$ and $\kappa=2K/c_f^2$)

$$
\varepsilon=\tfrac12\left(1+\frac{2K}{c_f^2d}\right)\dot d^2+\frac{h^2}{2d^2}-\frac{2K}{d},
\tag{4.1}
$$

whose radial weight is exactly the determinant $\Delta(d)$ and whose effective potential $V_{\mathrm{eff}}(d)=h^2/(2d^2)-2K/d$ is the same as that of the zero-coefficient inverse-square control. Differentiating (4.1) along the flow and dividing by $\dot d$ gives the reduced radial equation (overnight eq. (5.2) with $\sigma=-1$),

$$
\ddot d=\frac{h^2-2Kd+Kd\dot d^2/c_f^2}{d^2\,(d+\kappa)},\qquad \kappa=\frac{2K}{c_f^2}.
\tag{4.2}
$$

Its equilibrium at fixed $h$ is $d_0=h^2/(2K)$, the circle. Linearizing at $(d_0,\dot d=0)$, the $\dot d^2$ term is second order and drops out, the numerator $h^2-2Kd$ has derivative $-2K$, and the denominator is $d_0^2(d_0+\kappa)$, so $\delta\ddot d=-\omega_r^2\,\delta d$ with

$$
\omega_r^2=\frac{2K}{d_0^2(d_0+\kappa)}=\frac{2K/d_0^3}{1+\kappa/d_0}=\frac{\Omega^2}{1+2K/(c_f^2d_0)}=\frac{\Omega^2}{\Delta},
\tag{4.3}
$$

using $\Omega^2=2K/d_0^3$ from (2.1). This is overnight eq. (7.1) and the preregistration's K7 value $\omega_r^2=\Omega^2/2$ at $\rho=1$ ($d=2$, $\Delta=2$). As a function of frequency, by (3.2),

$$
\omega_r(f)=\frac{2\pi f}{\sqrt{1+(4\pi Kf)^{2/3}/c_f^2}},\qquad \frac{\omega_r}{\Omega}=\Delta^{-1/2}\in(0,1).
\tag{4.4}
$$

The radial oscillation is always slower than the orbital turning, so the line of apsides advances. At linear order in the eccentricity the apsidal angle from pericentre to apocentre is $\Phi_{\mathrm{lin}}=\pi\Omega/\omega_r=\pi\sqrt\Delta$ and the precession per radial period is

$$
\delta\varpi(f)=2\pi\left(\frac{\Omega}{\omega_r}-1\right)=2\pi\left(\sqrt{1+\frac{(4\pi Kf)^{2/3}}{c_f^2}}-1\right)>0 .
\tag{4.5}
$$

It vanishes as $f\to0$ (the wide, slow circles precess little) and grows without bound as $f\to\infty$; at the equality frequency $\delta\varpi=2\pi(\sqrt5-1)=7.76644$. The frozen checkpoint's addendum (item 1 of the [second addendum](weber-overnight-investigation.md#addendum-corrections-to-the-frozen-checkpoint-2026-10-05t1550z)) records the distinction between $\Phi_{\mathrm{lin}}$ and $\delta\varpi$; both are tabulated separately in Section 7.

The tilt frequency equals $\Omega$. Let the circle lie in the plane $z=0$ and perturb the relative vector by a small out-of-plane component $\delta z$. The separation changes only at second order, $d^2=d_0^2+\delta z^2$, so to first order $\dot d=\ddot d=0$, the bracket in (1.1) stays $1$, and the $z$-component of the relative acceleration is $-(2K/d_0^2)(\delta z/d_0)=-\Omega^2\,\delta z$. Hence $\delta\ddot z=-\Omega^2\delta z$: a rigid tilt of the orbital plane, with Floquet multiplier $1$ over one orbital period (overnight Section 7.3 and addendum item 1). It is not an independent frequency of the family; it coincides with $\Omega$ at every radius.

The ratio $\Omega/\omega_r=\sqrt\Delta$ is rational, $\Omega/\omega_r=p/q$ with integers $p>q\ge1$, exactly when $\Delta=(p/q)^2$, that is

$$
d_{p:q}=\frac{2K}{c_f^2\left((p/q)^2-1\right)},\qquad \Omega_{p:q}=\sqrt{\frac{2K}{d_{p:q}^3}}=\frac{\left(c_f^2\left((p/q)^2-1\right)\right)^{3/2}}{2K},\qquad f_{p:q}=\frac{\Omega_{p:q}}{2\pi}.
\tag{4.6}
$$

Since $\sqrt\Delta>1$ only ratios greater than one occur. With $K=c_f=1$ the first few are, from the receipt:

| $p:q$ | $d_{p:q}$ | $\Omega_{p:q}$ | $f_{p:q}$ | $v$ | label |
| --- | --- | --- | --- | --- | --- |
| 4:3 | $18/7=2.571429$ | $0.342968$ | $0.0545850$ | $0.440959$ | strict |
| 3:2 | $8/5=1.6$ | $0.698771$ | $0.111213$ | $0.559017$ | strict |
| 2:1 | $2/3$ | $3\sqrt3/2=2.598076$ | $0.413497$ | $\sqrt3/2=0.866025$ | strict |
| 3:1 | $1/4$ | $8\sqrt2=11.313708$ | $1.800633$ | $\sqrt2=1.414214$ | superfield |

At a $p:q$ resonance a slightly eccentric history closes after $q$ radial periods and $p$ orbital turns: it is a periodic rosette rather than a dense one. Whether such a closure changes the stability of the circle is settled by the structure of the reduced problem. The circle is an exact solution at every radius (Section 2). At fixed $h$ the reduced motion conserves (4.1), in which the weight $\Delta(d)\ge1$ is positive and $V_{\mathrm{eff}}$ has a strict minimum $-2K^2/h^2$ at $d_0$. The function $L(d,\dot d)=\varepsilon(d,\dot d)-V_{\mathrm{eff}}(d_0)$ is therefore continuous, vanishes only at $(d_0,0)$, is positive elsewhere near it (it dominates $\tfrac12\dot d^2+V_{\mathrm{eff}}(d)-V_{\mathrm{eff}}(d_0)$), and is constant along every history. Its sublevel sets near $(d_0,0)$ are compact neighbourhoods, so a history that starts close to the circle stays close for all time: Lyapunov stability of the reduced radial motion (overnight Section 7.2, re-derived here as the key step). This argument uses only that $\Delta>0$ and that $d_0$ is a strict minimum of $V_{\mathrm{eff}}$; the value of $\Omega/\omega_r$ enters nowhere. In the full relative plane the angle is obtained by the quadrature $\dot\theta=h/d^2$, which cannot grow a radial perturbation, and the full pair separates exactly into free centre motion and relative motion (overnight Section 4.1 and Theorem 7.4, bound class with turning radii fixed by $(\varepsilon,h)$). There is no coupling through which a rational $\Omega/\omega_r$ could produce parametric growth. Resonances therefore mark distinguished rosette closures, not stability changes; the circle is orbitally stable at every frequency, resonant or not.

> Claim grade: derived for (4.3)–(4.6) and for the stability statement, which rests on the first integral (4.1) (overnight (5.4), derived there and checked to $1.6\times10^{-8}$ relative drift in its check D) and on the separated structure of the pair. Measured support: the perturbed-circle integrations of Section 7 oscillate at $\omega_r$ to $\le1.4\times10^{-8}$ relative at all eighteen frequencies, including the $3:2$ neighbourhood ($f=0.1$) and the $2:1$ neighbourhood ($f=0.5$), with no growth of the radial amplitude over four radial periods ($d$ stays within $[d_0(1-10^{-4}),d_0(1+10^{-4})]$ to rounding). Falsifier: a Cartesian history started within relative distance $10^{-4}$ of a resonant circle whose separation leaves $[d_p,d_a]$ of the overnight (7.3) for its $(\varepsilon,h)$, or a radial oscillation frequency differing from (4.4) in the small-amplitude limit.

## 5. The integer ladder and the same-radius question

The preregistration fixes the reference angular frequency $\Omega_0=c_f^3/K$, so that $f_0=c_f^3/(2\pi K)=1/(2\pi)$, and the integer ladder $\Omega_n=n\Omega_0$, $n=1,\dots,8$. From (2.3) with $K=c_f=1$,

$$
\rho_n=(4n^2)^{-1/3},\qquad d_n=(2/n^2)^{1/3},\qquad v_n=(n/4)^{1/3},\qquad L_n=2\pi\rho_n,\qquad P_n=\frac{2\pi}{n},
\tag{5.1}
$$

where $L_n$ is the path length of one member over one primitive period. The identity $L_n=v_nP_n$ holds because $v_nP_n=(n/4)^{1/3}\cdot2\pi/n=2\pi(4n^2)^{-1/3}=2\pi\rho_n$. The strict label holds for $n<4$ since $v_n<1\iff n<4$; $n=4$ is the equality circle (3.1); $n\ge5$ is superfield. The determinant is $\Delta_n=1+(2n)^{2/3}$.

| $n$ | $\rho_n$ | $d_n$ | $v_n$ | $L_n=2\pi\rho_n$ | $P_n=2\pi/n$ | $L_n-v_nP_n$ | $\omega_r$ | $\Delta_n$ | label |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.629961 | 1.259921 | 0.629961 | 3.958147 | 6.283185 | $0$ to rounding | 0.621682 | 2.587401 | strict |
| 2 | 0.396850 | 0.793701 | 0.793701 | 2.493480 | 3.141593 | $0$ to rounding | 1.066028 | 3.519842 | strict |
| 3 | 0.302853 | 0.605707 | 0.908560 | 1.902884 | 2.094395 | $0$ to rounding | 1.446404 | 4.301927 | strict |
| 4 | 0.250000 | 0.500000 | 1.000000 | 1.570796 | 1.570796 | $0$ to rounding | 1.788854 | 5.000000 | equality |
| 5 | 0.215443 | 0.430887 | 1.077217 | 1.353670 | 1.256637 | $0$ to rounding | 2.105083 | 5.641589 | superfield |
| 6 | 0.190786 | 0.381571 | 1.144714 | 1.198745 | 1.047198 | $0$ to rounding | 2.401637 | 6.241483 | superfield |
| 7 | 0.172153 | 0.344306 | 1.205071 | 1.081670 | 0.897598 | $0$ to rounding | 2.682645 | 6.808786 | superfield |
| 8 | 0.157490 | 0.314980 | 1.259921 | 0.989543 | 0.785398 | $0$ to rounding | 2.950924 | 7.349604 | superfield |

The receipt's `ladder` rows carry each value to full double precision together with the solved $6\times6$ balance residual ($\le4.3\times10^{-16}$ relative) and $L_n-v_nP_n$; the column above reports the latter as zero to rounding because the receipt values are $0$ or $2.2\times10^{-16}$.

The ladder is a sampling, not a selection. The circular family is a continuously adjustable one-parameter family: by Section 3 every $\Omega>0$ belongs to exactly one circle and nothing in the law prefers integer multiples of $\Omega_0$ or any other frequency. The integers are the preregistration's reporting convention. Repeated traversal of a circle (reporting the configuration after $m$ primitive periods) does not create a new state, since the state after $mP$ equals the state after $P$; a change of time unit rescales every frequency in the table by the same factor and preserves every ratio; and the Fourier harmonics $m\Omega$ of the periodic coordinates $\mathbf X_i(T)$ are properties of the one history, not frequencies of other histories (for a uniform circle the coordinates are pure sinusoids at $\Omega$ and the harmonics vanish identically). None of these produces a second binding state.

At a given member radius $\rho$, the balance (2.1) fixes $\Omega^2$ uniquely, so exactly one circular frequency exists there. The two circulation senses ($\pm\Omega$) and the choice of orbital plane are related to one another by reflection and rotation, which are symmetries of (1.1), and they share $\rho$, $d$, $v$, $\Omega$, $\omega_r$ and $\Delta$; they are one circle up to symmetry, not distinct binding states. No two distinct circular binding states share a radius. Non-circular bound histories exist at every $(\varepsilon,h)$ in the bound class of overnight Theorem 7.4; they oscillate between $d_p<d_0<d_a$ and are rosettes (periodic exactly at the resonances of Section 4, otherwise quasi-periodic), not additional circles, and none of them has constant radius.

> Claim grade: derived for (5.1), the identity $L_n=v_nP_n$, the uniqueness of $\Omega$ at given $\rho$ and the symmetry relation of the senses and planes; measured for the table values (instrument of Section 7). Falsifier: a uniform circular pair history with $\sigma=-1$ at radius $\rho$ whose angular rate is not $\sqrt{K/(4\rho^3)}$, or a second constant-separation bound history at the same $\rho$ not obtained from the first by a rotation or reflection.

## 6. Known-case passes

The instrument [weber-frequency-continuation.mjs](../evidence/weber-frequency-continuation.mjs) assembles the $3N\times3N$ linear system directly from (1.1) (the unknown accelerations enter only through $\ddot d_{ij}$, and their coefficients are moved to the left side pair by pair), solves it by its own Gaussian elimination with partial pivoting, and integrates the full twelve-state Cartesian pair with its own fixed-step classical Runge–Kutta integrator, solving the system at every stage. It does not import or copy the overnight pair instrument, the reduction scripts or the reference lane's files. It was run on the known cases before any target use; the run order inside the script is fixed (known cases first), and the receipt records each pass with its UTC time. Command: `node reference/priorities/master-equation-closure/binary-research/evidence/weber-frequency-continuation.mjs` on Node 26.3.0, 2026-10-05T23:54:22Z, total wall time $33.9\,\mathrm s$.

- K1 (circle balance, $\rho\in\{0.25,1,3\}$, $\Omega^2=K/(4\rho^3)$): PASS at 2026-10-05T23:54:22Z. Residuals $\max_i\|\mathbf A_i+\Omega^2\mathbf X_i\|$ were $8.9\times10^{-16}$, $5.6\times10^{-17}$ and $1.0\times10^{-17}$ against tolerances $10^{-13}\Omega^2\rho=4.0\times10^{-13}$, $2.5\times10^{-14}$ and $2.8\times10^{-15}$; solved determinants $5$, $2$ and $4/3$ against $1+1/\rho$, to $4\times10^{-16}$.
- K5 (wrong-law sensitivity): PASS at 2026-10-05T23:54:22Z. With $\mu_{\mathrm W}$ changed to $0$ the circle at $\rho=1$ keeps balance with residual $0$; the static pair at $d=2$ ($v=0$) gives $\mathbf A_1=(-0.125,0,0)$, magnitude exactly $1/8=1/(d^2\Delta)$ toward the partner, with solved determinant $2=1+2/d$.
- K6 (integrator, zero-coefficient Kepler ellipse $a=3$, $e=0.5$, relative coupling $k=2K$, period $2\pi\sqrt{a^3/2}=23.085897$): PASS at 2026-10-05T23:54:24Z. Started at pericentre and integrated with the full Cartesian solve at $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$; the relative position was compared with the solution of Kepler's equation (Newton iteration to $10^{-16}$) at $P/4$, $P/2$, $3P/4$ and $P$. Maximum position error $6.4\times10^{-13}$ at $40\,000$ steps and $1.8\times10^{-12}$ at $80\,000$ steps (rounding-dominated at both), against the tolerance $10^{-9}$.
- K7 (linearization) is used in its reduced form: the measured radial frequency of the perturbed circle at $\rho=1$ is not on the preregistered grid, but the grid row $f=0.1$ ($d=1.717$) and the ladder row $n=1$ ($d=1.260$) bracket it and both reproduce $\omega_r^2=\Omega^2/(1+2/d)$ to $\le1.2\times10^{-8}$ relative (Section 7). No rotating-frame spectrum was computed by this lane.

> Claim grade: measured (instrument named above, receipt `known_cases`). Falsifier: rerunning the command and obtaining a `pass: false` in any known-case entry, or a residual above the stated tolerance.

## 7. Measured table and perturbation checks

The preregistered frequency grid and the integer ladder were tabulated from the closed forms (2.3)–(2.4), (3.2), (4.3) and (4.5), and at every row the circular state was handed to the $6\times6$ solve and the solved accelerations compared with $-\Omega^2\mathbf X_i$. All eighteen rows have relative residual $\max_i\|\mathbf A_i+\Omega^2\mathbf X_i\|/(\Omega^2\rho)\le4.3\times10^{-16}$ and solved determinant equal to $\Delta$ of (3.2) to $\le1.8\times10^{-15}$. Units: $K=c_f=1$; lengths in $K/c_f^2$, times in $K/c_f^3$, speeds in $c_f$. The ladder rows are in Section 5; the grid rows are:

| $f$ | $\Omega$ | $\rho$ | $d$ | $v$ | $\omega_r$ | $\Phi_{\mathrm{lin}}=\pi\Omega/\omega_r$ | $\delta\varpi$ | $\Delta$ | label |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0.01 | 0.0628319 | 3.985903 | 7.971807 | 0.250442 | 0.0561787 | 3.513649 | 0.744113 | 1.250884 | strict |
| 0.05 | 0.314159 | 1.363160 | 2.726320 | 0.428249 | 0.238603 | 4.136405 | 1.989624 | 1.733590 | strict |
| 0.1 | 0.628319 | 0.858737 | 1.717474 | 0.539560 | 0.427072 | 4.621988 | 2.960790 | 2.164501 | strict |
| $1/(2\pi)=0.159155$ | 1 | 0.629961 | 1.259921 | 0.629961 | 0.621682 | 5.053378 | 3.823570 | 2.587401 | strict |
| 0.2 | 1.256637 | 0.540970 | 1.081941 | 0.679803 | 0.744560 | 5.302251 | 4.321317 | 2.848530 | strict |
| 0.5 | 3.141593 | 0.293684 | 0.587368 | 0.922635 | 1.496842 | 6.593620 | 6.904055 | 4.405022 | strict |
| $2/\pi=0.636620$ | 4 | 0.250000 | 0.500000 | 1.000000 | 1.788854 | 7.024815 | 7.766444 | 5.000000 | equality |
| 1 | 6.283185 | 0.185009 | 0.370018 | 1.162447 | 2.482651 | 7.950859 | 9.618532 | 6.405135 | superfield |
| 2 | 12.566371 | 0.116549 | 0.233097 | 1.464592 | 4.059985 | 9.723784 | 13.164382 | 9.580118 | superfield |
| 10 | 62.831853 | 0.039859 | 0.079718 | 2.504417 | 12.301442 | 16.046256 | 25.809328 | 26.088416 | superfield |

The perturbation check was run at every grid and ladder frequency, not only the four required. Each run starts from the circular state with the member radius stretched by the relative amount $\delta=10^{-4}$ and the speed divided by $1+\delta$, so that the relative angular momentum $h$ is that of the nominal circle and the history oscillates about it with eccentricity $e\approx\delta$. The full twelve-state Cartesian pair is integrated with the implicit solve at every stage, $4000$ steps per orbital period, for $4.6$ radial periods. Pericentres are located as upward zero crossings of $\dot d=\mathbf e\cdot\mathbf w$, refined by a cubic Hermite root using $\ddot d$ from the solve at the bracketing samples; the measured radial period is the mean spacing of the five pericentres found, and the measured advance is the mean pericentre-to-pericentre change of the relative azimuth minus $2\pi$. The results at the three frequencies singled out by the preregistration are

| $f$ | $T_r$ measured | $2\pi/\omega_r$ | relative difference | $T_r$ from the exact quadrature at the run's $(\varepsilon,h)$ | relative difference | advance measured | $\delta\varpi$ linear | difference | advance from the exact quadrature | difference |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $1/(2\pi)$ | 10.10675525 | 10.10675513 | $1.2\times10^{-8}$ | 10.10675525 | $2.3\times10^{-12}$ | 3.8235698 | 3.8235698 | $-2.3\times10^{-9}$ | 3.8235698 | $2.9\times10^{-11}$ |
| $2/\pi$ | 3.512407403 | 3.512407366 | $1.1\times10^{-8}$ | 3.512407403 | $5.7\times10^{-12}$ | 7.7664441 | 7.7664442 | $-5.5\times10^{-9}$ | 7.7664441 | $9.1\times10^{-11}$ |
| $1$ | 2.530836919 | 2.530836893 | $1.0\times10^{-8}$ | 2.530836919 | $1.1\times10^{-11}$ | 9.6185319 | 9.6185319 | $-7.2\times10^{-9}$ | 9.6185319 | $-1.6\times10^{-10}$ |

Across all eighteen runs the measured radial period agrees with $2\pi/\omega_r$ to between $9.6\times10^{-9}$ and $1.4\times10^{-8}$ relative, inside the required $10^{-6}$, and the measured advance agrees with $\delta\varpi$ to between $1.7\times10^{-10}$ and $1.8\times10^{-8}$ absolute. The residual offset of order $10^{-8}$ is the expected second-order amplitude effect, $O(\delta^2)$: against the exact finite-amplitude quadratures of overnight (7.4)–(7.5), re-implemented in this instrument as a midpoint rule on $4096$ nodes at the run's own $(\varepsilon,h)$, the agreement is $\le1.9\times10^{-11}$ relative for the period and $\le5\times10^{-10}$ absolute for the advance. Step refinement at $2000$, $4000$ and $8000$ steps per orbit (receipt `step_refinement`) leaves the measured period unchanged to $10^{-11}$ relative and the advance to $10^{-9}$, so the comparison is not limited by the integrator. The first integral (4.1) drifts by at most $4.7\times10^{-13}$ over any run and $h$ by at most rounding. An earlier run of this instrument that perturbed the radius without rescaling the speed gave a $2.4\times10^{-4}$ relative offset in the period, which is the first-order shift of $\omega_r$ between the nominal circle and the circle of the perturbed $h$ ($d_0'=d_0(1+\delta)^2$), not a disagreement with (4.3); the fixed-$h$ preparation removes it, as the table shows.

> Claim grade: measured (instrument of Section 6; receipt fields `grid`, `ladder`, `perturbation`, `step_refinement`); the quadrature comparison is a second independent closed form, not a replay. Falsifier: rerunning the command and finding a grid row with `balance_pass: false`, a perturbation row with `radial_pass: false`, or a period or advance differing from the values above beyond $10^{-7}$ relative.

## 8. Plots

Three scientific plots were written by the instrument as SVG (own writer, no library), each with labelled axes in the units $K=c_f=1$ and logarithmic axes where the quantity spans decades.

- [Radius and separation versus frequency](../evidence/weber-frequency-continuation-radius.svg): $\rho(f)$ and $d(f)$ on log–log axes, closed-form lines with the preregistered grid points marked, and the equality frequency $f=2/\pi$ marked.
- [Member speed versus frequency](../evidence/weber-frequency-continuation-speed.svg): $v(f)$ on log–log axes with the equality line $v=c_f$, the strict/inclusive boundary at $f=2/\pi$, and the grid points coloured by label.
- [Radial frequency ratio and apsidal precession versus frequency](../evidence/weber-frequency-continuation-radial.svg): $\omega_r/\Omega=\Delta^{-1/2}$ and $\delta\varpi/(2\pi)=\sqrt\Delta-1$ against $\log f$, with the resonances $4{:}3$, $3{:}2$, $2{:}1$, $3{:}1$ and $4{:}1$ marked on the precession curve.

## 9. Claims, falsifiers, what this lane did not do, and elapsed time

| Claim | Grade | Falsifier |
| --- | --- | --- |
| The opposite-polarity circle exists at every $\Omega>0$ with $\rho=(K/(4\Omega^2))^{1/3}$, $d=(2K/\Omega^2)^{1/3}$, $v=(K\Omega/4)^{1/3}$, equivalent to the overnight $h^2=2Kd$ | derived | a circular state satisfying these with solved accelerations $\ne-\Omega^2\mathbf X_i$ |
| $\rho,d$ decrease and $v$ increases strictly with $f$; coverage of $(0,\infty)$ is complete; $\Delta=1+(4\pi Kf)^{2/3}/c_f^2\ge1$ at every $f$ | derived | a frequency with two circles, or a singular circular solve |
| Equality $v=c_f$ at $\Omega=4c_f^3/K$, $f=2c_f^3/(\pi K)$ ($f=2/\pi$, $d=1/2$); strict interval $f<2/\pi$, inclusive $f\le2/\pi$; superfield circles are exact solutions, labelled not excluded | derived | a circle at $f<2/\pi$ with centre-rest $v\ge c_f$ |
| $\omega_r=\Omega/\sqrt\Delta$, $\Phi_{\mathrm{lin}}=\pi\sqrt\Delta$, $\delta\varpi=2\pi(\sqrt\Delta-1)$; tilt frequency $=\Omega$ | derived; measured at eighteen frequencies to $\le1.4\times10^{-8}$ | a small-amplitude radial oscillation at another frequency |
| Resonances $\Omega/\omega_r=p/q$ at $d=2K/(c_f^2((p/q)^2-1))$ (first four at $f=0.0546, 0.1112, 0.4135, 1.8006$) mark rosette closures and do not change the stability of the circle | derived (Lyapunov stability from the first integral; no coupling channel) | growth of the radial amplitude of a history started within $10^{-4}$ of a resonant circle |
| The integer ladder is a sampling of a continuous family; $L_n=v_nP_n$; one circular frequency per radius; no two distinct circular binding states share a radius | derived; table measured | a second constant-separation bound history at a given $\rho$ not related by symmetry |
| Known cases K1, K5, K6 pass; grid and ladder balance to $\le4.3\times10^{-16}$; perturbation periods and advances as tabulated | measured (this lane's instrument and receipt) | a rerun with any `pass: false` |

No disagreement with the overnight record was found. Every value this lane compared against it, the circular family, the determinant, $\omega_r$, $\Phi_{\mathrm{lin}}$ and $\delta\varpi$, the equality point $x=1/2$, the radial period and apsidal quadratures, agrees; the only item worth noting is that the checkpoint's original row conflated $\Phi_{\mathrm{lin}}$ with $\delta\varpi$, and the second addendum already corrects it.

This lane did not do the following. It makes no claim about the six-body sphere, about any candidate family F0–F3, or about phase locking. It makes no persistence claim beyond the overnight record: the integrations here cover $4.6$ radial periods at amplitude $10^{-4}$ and establish the small-amplitude frequencies, not long-time survival, for which the overnight persistence record remains the only evidence. It computed no rotating-frame spectrum (K7 is used in its reduced radial form only). It did not compute the exact nonlinear apsidal function at large eccentricity beyond the quadrature comparison at $e\approx10^{-4}$. The reference lane's files were not read.

Elapsed time of this lane: first clock read 2026-10-05T23:42:32Z (the team clock started at 23:32:34Z); instrument first run 23:47:37Z, final run 2026-10-05T23:54:22Z (after three SVG label fixes that changed no number); document completed at the time in the final line below. Files written by this lane: this document; [weber-frequency-continuation.mjs](../evidence/weber-frequency-continuation.mjs) (SHA-256 `20902a9f339b36b1778494fb2690e133dfb68228019cbaa230c39c7cd06f9dbe`); [weber-frequency-continuation.json](../evidence/weber-frequency-continuation.json); the three SVG plots named in Section 8. No other file was written.

Completion line: document and instrument complete at 2026-10-05T23:54:57Z; lane elapsed time from the first clock read at 23:42:32Z is about 13 min, about one hour before the scheduled 00:55Z finish; measured from the team clock start at 23:32:34Z it is about 23 min. Status: complete; nothing open in this lane.
