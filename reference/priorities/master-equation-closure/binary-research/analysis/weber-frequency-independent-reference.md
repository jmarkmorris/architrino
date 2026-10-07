# Weber binary circle: independent frequency reference (blind reference lane, 2026-10-05)

Status: independent reference for the binary frequency lane of the [Weber binding-sphere continuation](../../braid-program/analysis/weber-binding-sphere-preregistration.md). This document was written blind: nothing in it was read from, compared with, or adjusted toward the subject lane's `weber-frequency-continuation` files, and the freeze block in Section 9 fixes its content before any subject output is seen. Section 10, the adjudication, is empty until the Principal Investigator announces subject exposure; after exposure, nothing above Section 10 changes. The law is Section 9 of the [equation-variants manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response), and the frozen overnight [pair investigation](weber-overnight-investigation.md) is used only as a control, in the sense that its closed forms are prior art against which the derivation below was checked after it was written.

## Contents

1. [Law, notation and the reduced relative equation](#1-law-notation-and-the-reduced-relative-equation)
2. [The exact circular family and its frequency relations](#2-the-exact-circular-family-and-its-frequency-relations)
3. [Equality speed, admissible intervals and solve regularity](#3-equality-speed-admissible-intervals-and-solve-regularity)
4. [Radial perturbation frequency, apsidal precession and tilt](#4-radial-perturbation-frequency-apsidal-precession-and-tilt)
5. [Resonances and whether they alter stability](#5-resonances-and-whether-they-alter-stability)
6. [Instrument and known-case record](#6-instrument-and-known-case-record)
7. [Grid results and the frozen table](#7-grid-results-and-the-frozen-table)
8. [Claims, grades and falsifiers](#8-claims-grades-and-falsifiers)
9. [Validation record and freeze block](#9-validation-record-and-freeze-block)
10. [Adjudication (after exposure)](#10-adjudication-after-exposure)
11. [Run record (append-only)](#11-run-record-append-only)

## 1. Law, notation and the reduced relative equation

Two members $i\in\{1,2\}$ carry polarities $q_1=+1$, $q_2=-1$, so the polarity product is $\sigma=q_1q_2=-1$. Their positions and velocities in the void frame are $\mathbf X_i(T)$ and $\mathbf V_i(T)$, with $T$ absolute time and dots denoting $d/dT$. The relative vector is $\boldsymbol\rho=\mathbf X_1-\mathbf X_2$ with present separation $d=\|\boldsymbol\rho\|$ and unit direction $\mathbf e=\boldsymbol\rho/d$; the relative velocity is $\mathbf w=\mathbf V_1-\mathbf V_2$, its radial part is $\dot d=\mathbf e\cdot\mathbf w$ and its transverse part is $\mathbf w_\perp=\mathbf w-\dot d\,\mathbf e$. The relative angular momentum per unit weight is $\mathbf h=\boldsymbol\rho\times\mathbf w$ with magnitude $h=d\,\|\mathbf w_\perp\|$. The coupling is $K>0$ and the wake speed is $c_f$; both are kept symbolic in this section and in Sections 2 to 5, and every number in Sections 6 and 7 uses $K=c_f=1$.

The selected law is the instantaneous Weber-inspired pair contribution with frozen coefficients $\lambda_{\mathrm W}=-1/2$ and $\mu_{\mathrm W}=1$, unit integration weights (an architrino has no mass, so each member's acceleration is the whole contribution it receives), distinct present-time partners, no self term, no softening and no speed ceiling:

$$
\mathbf A_1=\frac{\sigma K}{d^2}\left[1-\frac{\dot d^2}{2c_f^2}+\frac{d\,\ddot d}{c_f^2}\right]\mathbf e,\qquad \mathbf A_2=-\mathbf A_1 .
$$

The second derivative of the separation is a kinematic identity, obtained by differentiating $d\dot d=\boldsymbol\rho\cdot\mathbf w$ once more: $\ddot d=\mathbf e\cdot(\mathbf A_1-\mathbf A_2)+\|\mathbf w_\perp\|^2/d$. Because it contains the accelerations, the law is implicit. Writing $\mathbf A_1=f\mathbf e$ (the law makes both accelerations radial, and the general $6\times6$ solve of Section 6 confirms that the radial ansatz is the unique solution rather than an assumption) gives $\ddot d=2f+\|\mathbf w_\perp\|^2/d=2f+h^2/d^3$. Substituting into the law and collecting the terms in $f$,

$$
\left(1+\frac{2K}{c_f^2d}\right)f=-\frac{K}{d^2}\left[1-\frac{\dot d^2}{2c_f^2}+\frac{h^2}{c_f^2d^2}\right]\qquad(\sigma=-1).
$$

The coefficient $\Delta(d)=1+2K/(c_f^2d)$ is the determinant of the pair acceleration matrix for opposite polarity; it exceeds one at every positive separation, so the pair solve is regular everywhere. The reduced radial equation follows by inserting $f$ into $\ddot d=2f+h^2/d^3$ and clearing the common denominator $d^3(d+\kappa)$ with $\kappa=2K/c_f^2$; the terms in $h^2/(c_f^2d^4)$ cancel identically and

$$
\ddot d=\frac{h^2-2Kd}{d^2(d+\kappa)}+\frac{K\dot d^2}{c_f^2d(d+\kappa)} .
\tag{1.1}
$$

The same equation is the Euler–Lagrange equation of the relative Lagrangian $\mathcal L_{\mathrm{rel}}=\tfrac14\|\dot{\boldsymbol\rho}\|^2+(K/d)\big(1+\dot d^2/(2c_f^2)\big)$, which is the centre-rest reduction of the two-member Lagrangian $\tfrac12\sum\|\mathbf V_i\|^2-(\sigma K/d)(1+\dot d^2/(2c_f^2))$ recorded in the manuscript for $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$: in polar coordinates $(d,\theta)$ the azimuth is cyclic with conserved $h=d^2\dot\theta$, and the radial equation $\tfrac{d}{dT}\big[(\tfrac12+K/(c_f^2d))\dot d\big]=\tfrac12d\dot\theta^2-K/d^2-K\dot d^2/(2c_f^2d^2)$ rearranges to (1.1). The two routes agree, which is the first internal check of the derivation.

## 2. The exact circular family and its frequency relations

A uniform circle has $\dot d=\ddot d=0$. Equation (1.1) then requires $h^2=2Kd$, independently of $\lambda_{\mathrm W}$ and $\mu_{\mathrm W}$, because the velocity-dependent terms vanish on the circle: the bracket in the law equals one and the Weber terms are invisible to the balance. The relative angular rate is $\Omega=\dot\theta=h/d^2$, so $\Omega^2=2K/d^3$. In the centre-rest frame (the sum of velocities is invariant because the pair contributions are antisymmetric, so this frame exists and is inertial) each member moves on a circle of radius $\rho=d/2$ at speed $v=\Omega\rho$. Solving for the geometry as a function of the angular frequency,

$$
\rho(\Omega)=\left(\frac{K}{4\Omega^2}\right)^{1/3},\qquad d(\Omega)=2\rho=\left(\frac{2K}{\Omega^2}\right)^{1/3},\qquad v(\Omega)=\Omega\rho=\left(\frac{K\Omega}{4}\right)^{1/3},
\tag{2.1}
$$

equivalently $\Omega^2=K/(4\rho^3)$ and $v^2=K/(4\rho)$. With the cyclic frequency $f=\Omega/(2\pi)$,

$$
\rho(f)=\left(\frac{K}{16\pi^2f^2}\right)^{1/3},\qquad d(f)=\left(\frac{K}{2\pi^2f^2}\right)^{1/3},\qquad v(f)=\left(\frac{\pi Kf}{2}\right)^{1/3}.
\tag{2.2}
$$

The family is continuously adjustable: every $\Omega>0$ is attained by exactly one radius, so the integer ladder $\Omega_n=n\Omega_0$ with $\Omega_0=c_f^3/K$ samples a continuum and is not dynamically selected. The orbital period is $P=2\pi/\Omega$, the path length of one member per period is $2\pi\rho$, and $P=2\pi\rho/v$ is consistent with (2.1).

## 3. Equality speed, admissible intervals and solve regularity

The member speed equals the wake speed, $v=c_f$, when $K\Omega/4=c_f^3$, that is at

$$
\Omega_\ast=\frac{4c_f^3}{K},\qquad f_\ast=\frac{2c_f^3}{\pi K},\qquad \rho_\ast=\frac{K}{4c_f^2},\qquad d_\ast=\frac{K}{2c_f^2},
\tag{3.1}
$$

so the equality circle sits at dimensionless separation $x_\ast=d_\ast c_f^2/K=1/2$ and at $\Omega_\ast=4\Omega_0$: it is the fourth rung of the integer ladder, and in the cyclic grid it is $f=2/\pi$. Since $v$ increases monotonically with $\Omega$ by (2.1), the strict admissible interval ($v<c_f$) is $0<\Omega<4c_f^3/K$, equivalently $0<f<2c_f^3/(\pi K)$, and the inclusive interval ($v\le c_f$) adds the single endpoint $\Omega=\Omega_\ast$. Circles with $\Omega>\Omega_\ast$ are exact solutions of the unrestricted law and carry the speed label "unrestricted only"; a label never modifies an acceleration.

The solve determinant on the circle, expressed through the frequency with $d$ from (2.1), is

$$
\Delta(\Omega)=1+\frac{2K}{c_f^2d(\Omega)}=1+\frac{(2K\Omega)^{2/3}}{c_f^2},
\tag{3.2}
$$

which equals $1+(2\Omega)^{2/3}$ in units $K=c_f=1$; it is $2$ at $\Omega=1/2$, $1+2^{2/3}\approx2.5874$ at $\Omega_0=1$ and exactly $5$ at the equality circle. It is finite and greater than one for every $\Omega>0$, so the circular family is regular at every frequency; the determinant grows without bound as $\Omega\to\infty$ but never vanishes.

## 4. Radial perturbation frequency, apsidal precession and tilt

Linearize (1.1) about the circular radius $d_0=h^2/(2K)$ at fixed $h$. The $\dot d^2$ term is second order and drops out, and the numerator $h^2-2Kd$ of the first term vanishes at $d_0$, so only its derivative survives: $\delta\ddot d=-\omega_r^2\,\delta d$ with

$$
\omega_r^2=\frac{2K}{d_0^2(d_0+\kappa)}=\frac{\Omega^2}{\Delta(d_0)}=\frac{\Omega^2}{1+2K/(c_f^2d_0)}=\frac{\Omega^2}{1+(2K\Omega)^{2/3}/c_f^2}.
\tag{4.1}
$$

The radial frequency is strictly below the orbital frequency at every radius because $\Delta>1$; the ratio $\Omega/\omega_r=\sqrt{\Delta}$ tends to one for wide circles and grows like $(2K\Omega)^{1/3}/c_f$ for tight ones. To first order in the eccentricity the azimuth advanced between pericentre and apocentre is $\Phi_{\mathrm{lin}}=\pi\Omega/\omega_r=\pi\sqrt{\Delta}$, and the precession of the line of apsides per radial period $2\pi/\omega_r$ is

$$
\delta\varpi=2\Phi_{\mathrm{lin}}-2\pi=2\pi\left(\sqrt{\Delta}-1\right)>0,
\tag{4.2}
$$

prograde at every radius. In the Weber-free control ($\mu_{\mathrm W}=0$) the determinant is one, $\omega_r=\Omega$ and the orbit closes; the entire precession is the Weber acceleration term through $\Delta$.

The out-of-plane tilt is obtained from the full relative vector $\boldsymbol\rho=(d\cos\theta,d\sin\theta,z)$ with small $z$. The three-dimensional separation is $\sqrt{d^2+z^2}=d+O(z^2)$, so to first order the magnitude $f$ of the radial acceleration is unchanged and only its direction acquires a $z$ component: $\ddot z=2f\,z/d$. On the circle $2f=-h^2/d^3=-\Omega^2d$, hence $\ddot z=-\Omega^2z$: the tilt frequency equals the orbital frequency $\Omega$ in the void frame, which is the statement that a tilted circle is itself an exact solution (a neighbouring member of the family with a rotated angular-momentum direction). In the frame co-rotating at $\Omega$ the tilt also appears at $\pm i\Omega$ because the rotation leaves the axial coordinate unchanged.

## 5. Resonances and whether they alter stability

A linear resonance between the orbital and radial motions occurs where $\Omega/\omega_r=\sqrt{\Delta}$ is rational, $\sqrt\Delta=p/q$ with coprime integers $p>q\ge1$. From $\Delta=1+2/x$ with $x=dc_f^2/K$,

$$
x_{p:q}=\frac{2q^2}{p^2-q^2},\qquad \rho_{p:q}=\frac{q^2K}{(p^2-q^2)c_f^2},\qquad \Omega_{p:q}=\sqrt{\frac{2K}{d^3}}=\frac{c_f^3}{2K}\left(\frac{p^2-q^2}{q^2}\right)^{3/2},\qquad v_{p:q}=\frac{c_f\sqrt{p^2-q^2}}{2q}.
\tag{5.1}
$$

The member speed at a resonance is therefore algebraic in $(p,q)$, and $v=c_f$ would need $p^2=5q^2$, impossible for integers, so the equality circle is never resonant; its ratio is $\sqrt5$. On the integer ladder $\Omega_n=n$ the determinant is $1+(2n)^{2/3}$; this is rational only when $2n$ is a perfect cube, $n=4m^3$, giving $\Delta=1+4m^2$, which is never a perfect square (since $(2m)^2<1+4m^2<(2m+1)^2$), so no ladder member and no point of the cyclic grid lies on a resonance. In units $K=c_f=1$ the first resonances are: $2{:}1$ at $\rho=1/3$, $\Omega=\sqrt{27/4}\approx2.598076$, $v=\sqrt3/2$; $3{:}2$ at $\rho=0.8$, $\Omega\approx0.698771$, $v=\sqrt5/4$; $4{:}3$ at $\rho=9/7$, $\Omega\approx0.342968$; $5{:}3$ at $\rho=9/16$, $\Omega=32/27\approx1.185185$; $5{:}4$ at $\rho=16/9$, $\Omega\approx0.210938$; and $3{:}1$ at $\rho=1/8$, $\Omega=8\sqrt2\approx11.313708$, $v=\sqrt2$, already superfield. A resonant circle is strict-subfield exactly when $p^2<5q^2$ (which includes every $p\le2q$) and superfield when $p^2>5q^2$; equality is excluded.

Whether a resonance changes stability is answered by the structure of the reduced problem, not by the linear spectrum. The relative motion separates exactly into the cyclic azimuth, with $h$ conserved, and the one-degree-of-freedom radial motion (1.1), which has the first integral $\varepsilon=\tfrac12\Delta(d)\dot d^2+h^2/(2d^2)-2K/d$ (the derivative of $\varepsilon$ along (1.1) vanishes identically, as direct substitution shows). Because $\Delta(d)>0$ and the effective potential $h^2/(2d^2)-2K/d$ has a strict minimum at $d_0$, the level sets of $\varepsilon$ near $(d_0,0)$ are closed curves surrounding it: the radial motion is Lyapunov stable at every radius, resonant or not. The ratio $\Omega/\omega_r$ enters only the azimuthal quadrature $\theta=\int h\,dT/d^2$, where it decides whether the rosette closes: at a $p{:}q$ resonance the small-eccentricity orbit closes after $q$ radial periods and $p$ revolutions, while elsewhere it is quasi-periodic and dense in the annulus between its turning radii. A resonance can produce a secular instability only when energy is exchanged between coupled degrees of freedom; here the azimuth carries no energy of its own beyond the conserved $h$, so there is no channel. The one spectral event that could change the linear picture, a collision of $\pm i\omega_r$ with $\pm i\Omega$ (a $1{:}1$ resonance), requires $\Delta=1$, which (3.2) excludes at every finite radius. The tilt and the radial pair are therefore always distinct, the circle is orbitally stable in the full relative phase space at every $\Omega>0$, and the only effect of a resonance is closure of the perturbed relative path. This is a derived statement about the frozen instantaneous law; it says nothing about the delayed adaptation of Section 9a, where no first integral is available.

## 6. Instrument and known-case record

The instrument is two files authored in this lane from the law alone, with no code taken from any other script in the repository. [weber-frequency-reference-law.mjs](../evidence/weber-frequency-reference-law.mjs) assembles, for any number $N$ of members, the $3N\times3N$ system $M\mathbf A=\mathbf b$ by looping over ordered pairs and splitting the law into the part that does not contain accelerations, $\beta_{ij}=(\sigma_{ij}K/d_{ij}^2)[1+\lambda_{\mathrm W}\dot d_{ij}^2/c_f^2+\mu_{\mathrm W}\|\mathbf w_{ij,\perp}\|^2/c_f^2]$, and the part that does, $\alpha_{ij}\mathbf e_{ij}\mathbf e_{ij}^{\mathsf T}(\mathbf A_i-\mathbf A_j)$ with $\alpha_{ij}=\sigma_{ij}K\mu_{\mathrm W}/(c_f^2d_{ij})$; it solves the system by its own Gaussian elimination with partial pivoting (returning the determinant from the pivots), and it carries an independent residual evaluator that inserts a trial acceleration directly into the law with the full $\ddot d$ identity and reports $\max_i\|\mathbf A_i-\mathrm{RHS}_i(\mathbf A)\|$ without using the matrix. The integrator is a classical fixed-step RK4 of the $6N$-state system in which every stage performs a full solve. [weber-frequency-reference-pair.mjs](../evidence/weber-frequency-reference-pair.mjs) runs the known cases, refuses to continue if any fails, and then evaluates the grid.

The preregistration requires every new instrument to pass known cases before any target use, and the passes are recorded here, each with the line of the script output that produced it (command and UTC time in Section 9).

K1, opposite-polarity circle at $\rho\in\{0.25,1,3\}$ with $\Omega^2=K/(4\rho^3)$: solved $\mathbf A_i$ against $-\Omega^2\mathbf X_i$, tolerance $10^{-13}\Omega^2\rho$, and $\det M$ against $1+1/\rho$. Output lines: `rho=0.25 Omega=4 residual=8.882e-16 tol=4.000e-13 det=5 expected=5 lawRes=8.882e-16 PASS`; `rho=1 Omega=0.5 residual=5.551e-17 tol=2.500e-14 det=2 expected=2 lawRes=5.551e-17 PASS`; `rho=3 Omega=0.09622504486493763 residual=1.041e-17 tol=2.778e-15 det=1.3333333333333337 expected=1.3333333333333333 lawRes=3.469e-18 PASS`. The `lawRes` value is the matrix-free residual of the solved accelerations against the law, which checks the assembler against the law rather than against itself.

K5, wrong-law sensitivity: the circle at $\rho=1$ with $\mu_{\mathrm W}$ set to $0$ keeps balance with determinant $1$ (`mu=0 circle residual=0.000e+0 det=1 PASS`), and the static pair at $d=2$, $v=0$ returns $|\mathbf A_i|=1/(d^2\Delta)=1/8$ with $\Delta=2$, member $0$ accelerating toward member $1$ (`static pair d=2: |A0|=0.125 |A1|=0.12500000000000003 det=2 err=0.000e+0 PASS`).

K6, integrator: the zero-coefficient two-member system started at the pericentre of the relative Kepler ellipse $a=3$, $e=0.5$ (relative coupling $2K$, period $2\pi\sqrt{a^3/2}\approx23.0859$) was integrated with $40\,000$ RK4 steps over one radial period and compared at sixteen equally spaced times with the Kepler-equation solution (Newton iteration to $10^{-16}$): `period=23.085896942913553 steps=40000 worst relative-position error=6.355e-13 PASS` against the tolerance $10^{-9}$.

K7 is a linearization case and belongs to the six-body reference, where the rotating-frame Jacobian is built; it is recorded in the [binding-sphere reference](../../braid-program/analysis/weber-binding-sphere-independent-reference.md). One remark on its statement is recorded here because it concerns the pair: the preregistration lists the twelve-state spectrum as "$0$ (four), $\pm i\Omega$ (four each), and the radial pair", which counts fourteen; the correct multiplicities from the frozen addendum (item 1) of the pair investigation, and from the derivation of Sections 4 and 5 here (two centre blocks at $\pm i\Omega$, one tilt pair at $\pm i\Omega$, four zeros, one radial pair), are $0$ with algebraic multiplicity four, $\pm i\Omega$ with algebraic multiplicity three each, and $\pm i\omega_r$ once each.

## 7. Grid results and the frozen table

(a) At every point of the preregistered grid, $f\in\{0.01,0.05,0.1,0.2,1/(2\pi),0.5,2/\pi,1,2,10\}$ and $\Omega_n=n$ for $n=1,\dots,8$, the $6\times6$ solve on the circular state of radius $\rho(\Omega)$ from (2.1) returned $\mathbf A_i=-\Omega^2\mathbf X_i$ with relative residual $\max_i\|\mathbf A_i+\Omega^2\mathbf X_i\|/(\Omega^2\rho)\le3.7\times10^{-16}$ at all eighteen points, and the determinant from the pivots agreed with the closed form (3.2) to fifteen printed digits at every point (values in the JSON file, field `gridSolve`).

(b) The radial frequency was measured by integrating a circle whose separation was scaled by $1+10^{-4}$ at fixed $h$ (velocities scaled by $(1+10^{-4})^{-1}$), so that the unperturbed circle is the reference orbit of the perturbed history and the start is a turning point, over six predicted radial periods with $4000$ RK4 steps per orbital period, and taking the mean spacing of the interior maxima of $d(T)$ (parabolic interpolation). The measured against predicted values are: $f=0.1$: $0.4270718595$ against $0.4270718647$ (relative difference $1.2\times10^{-8}$); $f=1/(2\pi)$: $0.6216817518$ against $0.6216817591$ ($1.2\times10^{-8}$); $f=2/\pi$: $1.7888543629$ against $1.7888543820$ ($1.1\times10^{-8}$); $f=1$: $2.4826511963$ against $2.4826512226$ ($1.1\times10^{-8}$). A relative difference of order $10^{-8}$ at amplitude $10^{-4}$ is the expected second-order anharmonic shift, so the measurement confirms (4.1) to the limit this amplitude permits. A first attempt that scaled positions at unchanged velocities measured a systematic $2.4\times10^{-4}$ deficit; that was the first-order shift of the reference circle under the change of $h$, not a defect of (4.1), and the fixed-$h$ preparation removed it (run record, Section 11).

(c) The frozen table is [weber-frequency-reference-table.json](../evidence/weber-frequency-reference-table.json), field `table`, every number at fifteen significant digits. Its content, in units $K=c_f=1$:

| Point | $\Omega$ | $\rho$ | $d$ | $v$ | $\omega_r$ | $\Phi_{\mathrm{lin}}$ | $\delta\varpi$ | $\Delta$ | Speed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $f=0.01$ | 0.0628318530717959 | 3.98590329106848 | 7.97180658213697 | 0.250441689942803 | 0.056178652987799 | 3.51364935831867 | 0.744113409457756 | 1.25088416024563 | strict |
| $f=0.05$ | 0.314159265358979 | 1.36315975070132 | 2.72631950140264 | 0.428249265847256 | 0.238603444746469 | 4.1364048249917 | 1.98962434280382 | 1.73358973479485 | strict |
| $f=0.1$ | 0.628318530717959 | 0.85873683213902 | 1.71747366427804 | 0.539560264642983 | 0.427071864704616 | 4.62198764037789 | 2.96078997357619 | 2.16450111672642 | strict |
| $f=0.2$ | 1.25663706143592 | 0.540970305565996 | 1.08194061113199 | 0.679803335110543 | 0.744559556951451 | 5.30225114106374 | 4.32131697494789 | 2.84853029770967 | strict |
| $f=1/(2\pi)$, $\Omega_1$ | 1 | 0.629960524947437 | 1.25992104989487 | 0.629960524947437 | 0.621681759073169 | 5.05337756454914 | 3.82356982191869 | 2.5874010519682 | strict |
| $f=0.5$ | 3.14159265358979 | 0.293683865496614 | 0.587367730993227 | 0.922635074322014 | 1.49684156960869 | 6.59361992710393 | 6.90405454702828 | 4.40502192147675 | strict |
| $f=2/\pi$, $\Omega_4$ | 4 | 0.25 | 0.5 | 1 | 1.78885438199983 | 7.02481473104073 | 7.76644415490187 | 5 | equality, inclusive only |
| $f=1$ | 6.28318530717959 | 0.185009242076839 | 0.370018484153678 | 1.16244735150963 | 2.48265122260175 | 7.95085859120098 | 9.61853187522237 | 6.40513538012698 | unrestricted only |
| $f=2$ | 12.5663706143592 | 0.116548519258853 | 0.233097038517706 | 1.46459188756152 | 4.05998514131227 | 9.72378376527684 | 13.1643822233741 | 9.5801175884441 | unrestricted only |
| $f=10$ | 62.8318530717959 | 0.0398590329106848 | 0.0797180658213697 | 2.50441689942803 | 12.3014416981118 | 16.0462564361123 | 25.809327565045 | 26.0884160245628 | unrestricted only |
| $\Omega_2$ | 2 | 0.39685026299205 | 0.7937005259841 | 0.7937005259841 | 1.06602749198442 | 5.89401807591599 | 5.5048508446524 | 3.51984209978975 | strict |
| $\Omega_3$ | 3 | 0.30285343213869 | 0.60570686427738 | 0.90856029641607 | 1.44640436547195 | 6.51600491933951 | 6.74882453149943 | 4.30192724889463 | strict |
| $\Omega_5$ | 5 | 0.215443469003188 | 0.430886938006377 | 1.07721734501594 | 2.10508331404856 | 7.46191999296168 | 8.64065467874377 | 5.64158883361278 | unrestricted only |
| $\Omega_6$ | 6 | 0.190785707092222 | 0.381571414184444 | 1.14471424255333 | 2.40163697791238 | 7.84862828766223 | 9.41407126814487 | 6.24148278841779 | unrestricted only |
| $\Omega_7$ | 7 | 0.172153018869659 | 0.344306037739319 | 1.20507113208761 | 2.68264500535749 | 8.19756193279775 | 10.1119385584159 | 6.8087857335637 | unrestricted only |
| $\Omega_8$ | 8 | 0.157490131236859 | 0.314980262473718 | 1.25992104989487 | 2.95092390787058 | 8.51690589570451 | 10.7506264842294 | 7.3496042078728 | unrestricted only |

Three closed-form identities are visible in the table and serve as hand checks: at $\Omega_1=1$, $\rho=v=2^{-2/3}=0.629960524947437$ and $d=2^{1/3}$; at $\Omega_4=4$, $\rho=1/4$, $d=1/2$, $v=1$, $\Delta=5$ and $\omega_r=4/\sqrt5$; at $\Omega_8=8$, $v=2^{1/3}=1.25992104989487$ equals the separation at $\Omega_1$. The strict interval covers $\Omega_1$ to $\Omega_3$ and the cyclic points up to $f=0.5$; the inclusive interval adds $\Omega_4$; $\Omega_5$ to $\Omega_8$ and $f\in\{1,2,10\}$ are unrestricted only.

## 8. Claims, grades and falsifiers

Derived: the circular family (2.1)–(2.2) exists at every $\Omega>0$ with $h^2=2Kd$, and its balance is independent of $\lambda_{\mathrm W},\mu_{\mathrm W}$. Falsifier: a $6\times6$ solve on a circular state of radius $\rho(\Omega)$ whose solved acceleration differs from $-\Omega^2\mathbf X_i$ beyond $10^{-13}\Omega^2\rho$; Section 7(a) found none on the grid.

Derived: the equality point (3.1) at $\Omega_\ast=4c_f^3/K$, $f_\ast=2c_f^3/(\pi K)$, $x_\ast=1/2$; the strict interval $\Omega<\Omega_\ast$ and the inclusive interval $\Omega\le\Omega_\ast$; the determinant (3.2), positive and greater than one for every $\Omega$. Falsifier: a circular state whose pivot determinant differs from $1+(2K\Omega)^{2/3}/c_f^2$, or a speed at $\Omega_4$ different from $c_f$ to fifteen digits.

Derived: the radial frequency (4.1), the apsidal angle and precession (4.2), the tilt frequency $\Omega$, and the location of every linear resonance (5.1). Measured (this instrument, RK4 at $4000$ steps per orbit, amplitude $10^{-4}$): $\omega_r$ at four grid points to $1.2\times10^{-8}$ relative. Falsifier: a radially perturbed circle at fixed $h$ whose small-amplitude radial period differs from $2\pi\sqrt{\Delta}/\Omega$ by more than the second-order shift, or a tilted circle that fails to be an exact solution.

Derived: resonances do not alter stability; the circle is orbitally stable at every radius through the first integral $\varepsilon$ with positive weight $\Delta$, and a $p{:}q$ resonance only closes the small-eccentricity rosette. Falsifier: a perturbed circle at a resonant radius such as $\rho=0.8$ ($3{:}2$) whose separation leaves the interval predicted by $\varepsilon$ and $h$, or a rotating-frame spectrum of the full twelve-state law with a positive real part at any regular radius. This claim is about the frozen instantaneous law only.

Inferred, from the derivations above: no grid point and no integer-ladder circle is resonant, since $1+(2n)^{2/3}$ is never a rational square. Falsifier: integers $n,p,q$ with $1+(2n)^{2/3}=p^2/q^2$.

Open: nothing in this document concerns six or more members, the delayed law, or any speed-ceiling dynamics; those are outside its scope by construction.

## 9. Validation record and freeze block

Commands, run from `reference/priorities/master-equation-closure/binary-research/evidence/` with Node v26.3.0 on the host, no Python used:

- 2026-10-05T23:46:13Z `node weber-frequency-reference-pair.mjs --out weber-frequency-reference-table.json`: K1, K5, K6 pass as recorded in Section 6; grid (a) passes; the first $\omega_r$ measurement used the wrong extremum bookkeeping and then the wrong preparation (see run record) and was corrected in the script before the frozen run.
- 2026-10-05T23:46:57Z `node weber-frequency-reference-pair.mjs --out weber-frequency-reference-table.json` (frozen run, 1.2 s wall): K1, K5, K6 PASS; (a) relative residual $\le3.7\times10^{-16}$ at eighteen points; (b) $\omega_r$ relative differences $1.2\times10^{-8}$, $1.2\times10^{-8}$, $1.1\times10^{-8}$, $1.1\times10^{-8}$; (c) table written.

Freeze block (Part 1). Recorded with `date -u` and `shasum -a 256` immediately after the frozen run and before any subject file was opened; the hashes below are of the files as they exist at the freeze and must match a fresh `shasum -a 256` of each file. The hash of this document at the freeze is recorded in the run record of the [binding-sphere reference](../../braid-program/analysis/weber-binding-sphere-independent-reference.md) and in the lane's report, since a file cannot carry its own hash.

```
Part 1 freeze: 2026-10-05T23:50:48Z (date -u), shasum -a 256, run in binary-research/evidence/
52c9bda909b86ca80757ca6396965b3580753f876bfd9e31063671e1cb4c121c  weber-frequency-reference-law.mjs
2742a7ce1d18270fc151d14ab77edf2663f6f3f08a4ba7944d10651490014a91  weber-frequency-reference-pair.mjs
baccf9e5d01c1e0a1ba9195493787ba7e378994a33c30d720e5a462a49bb0156  weber-frequency-reference-table.json
```

The law module is shared with the six-body reference by import and is not modified after this freeze; any Part 2 extension lives in a separate `weber-binding-sphere-reference-*` module.

## 10. Adjudication (after exposure)

Not yet written. This section is filled only after the Principal Investigator announces subject exposure; every entry will name the subject value, the reference value, the classification (independently confirmed, measured same-lane, disagreement, not comparable), the grade and the falsifier. Nothing above this heading changes after the freeze.

### 10.1 Round 1 (exposure announced by the PI at 2026-10-06T00:58Z; written 01:05Z–01:20Z)

Subject: [weber-frequency-continuation.md](weber-frequency-continuation.md) with its receipt [weber-frequency-continuation.json](../evidence/weber-frequency-continuation.json) (instrument SHA-256 `20902a9f…9dbe` as the subject records it). The comparison script is [weber-binding-sphere-reference-adjudication.mjs](../../braid-program/evidence/weber-binding-sphere-reference-adjudication.mjs) for the six-body items; for the binary items the comparison was a direct read of the subject receipt against the frozen [reference table](../evidence/weber-frequency-reference-table.json) (command in the run record). Classification vocabulary: *independently confirmed* means the two lanes' separately authored derivations or instruments agree within the stated tolerance; *measured same-lane* means the value exists on one side only or both sides used the same instrument; *disagreement* means the two sides differ beyond tolerance; *not comparable* means no overlapping quantity exists.

| Item | Subject value | Reference value | Classification | Grade and falsifier |
| --- | --- | --- | --- | --- |
| Circular closed forms $\rho(\Omega),d(\Omega),v(\Omega)$ and cyclic forms (subject (2.3)–(2.4); reference (2.1)–(2.2)) | identical expressions, derived by the inverse-square reduction and by the implicit pair identity | identical, derived by the reduced relative equation and the Lagrangian | independently confirmed (two derivation routes on each side) | derived; falsifier as in Section 8 |
| Table at all 18 frequencies, seven fields ($\rho,d,v,\Delta,\omega_r,\Phi_{\mathrm{lin}},\delta\varpi$) | receipt `grid` and `ladder` | frozen `table` | independently confirmed: worst relative difference $4.1\times10^{-15}$ over $18\times7$ entries; speed labels agree row by row (the subject writes "superfield" where the reference writes "unrestricted only") | measured by two independently authored closed-form evaluators and $6\times6$ solvers; falsifier: any entry differing beyond $10^{-13}$ |
| Balance residual on the circle at the 18 points | $\le4.3\times10^{-16}$ | $\le3.7\times10^{-16}$ | independently confirmed | measured; both solvers independent |
| Equality point | $\Omega_{=}=4$, $f=2/\pi$, $d=1/2$, $\rho=1/4$, $v=1$ | $\Omega_\ast=4$, $f_\ast=2/\pi$, $d_\ast=1/2$, $\rho_\ast=1/4$ | independently confirmed, exact | derived |
| Strict and inclusive intervals; superfield circles exact and labelled | $f<2/\pi$, $f\le2/\pi$ | same | independently confirmed | derived |
| Determinant $\Delta(\Omega)=1+(2K\Omega)^{2/3}/c_f^2$ | subject (3.2), equals $5$ at equality | reference (3.2), same | independently confirmed, exact | derived |
| $\omega_r$, $\Phi_{\mathrm{lin}}$, $\delta\varpi$, tilt frequency $\Omega$ | subject (4.3)–(4.5) | reference (4.1)–(4.2) and Section 4 | independently confirmed, exact | derived |
| Measured $\omega_r$ from perturbed circles | 18 frequencies, relative difference $9.6\times10^{-9}$–$1.4\times10^{-8}$, plus the exact quadrature to $10^{-11}$ | 4 frequencies, $1.1$–$1.2\times10^{-8}$ | independently confirmed at the four common points (two independent integrators, same fixed-$h$ preparation, same second-order offset); the quadrature comparison and the other 14 points are measured same-lane | measured; falsifier: a small-amplitude radial period differing from $2\pi\sqrt\Delta/\Omega$ beyond $O(\delta^2)$ |
| Resonance list | $4{:}3,3{:}2,2{:}1,3{:}1$ in the document; eight ratios in the receipt including $5{:}4,5{:}3,5{:}2,4{:}1$ | (5.1) with the same eight ratios in Section 5 | independently confirmed: every $d,\Omega,f,v$ agrees to all printed digits (e.g. $2{:}1$: $\Omega=2.598076211$, $v=\sqrt3/2$) | derived |
| Stability at a resonance | not altered; Lyapunov stability of the reduced radial motion from the first integral with positive weight $\Delta$, no coupling channel | same argument, plus the remark that a $1{:}1$ collision of $\pm i\omega_r$ with $\pm i\Omega$ is impossible because $\Delta>1$ | independently confirmed (same conclusion by the same structural argument, written separately) | derived; falsifier: growth of the radial amplitude near a resonant circle |
| Equality circle never resonant; no grid or ladder point resonant | not stated | derived in Section 5 | measured same-lane (reference only) | derived |
| K7 twelve-state spectrum | not computed by the subject (reduced form only) | computed in the six-body reference: $0^{(4)},\pm i\Omega^{(3)},\pm i\omega_r$ | not comparable | measured (reference) |
| Known cases K1, K5, K6 | pass, same residual digits ($8.9\times10^{-16}$, $5.6\times10^{-17}$, $1.0\times10^{-17}$; $6.4\times10^{-13}$) | pass, same digits | independently confirmed (identical digits are expected for identical exact arithmetic on the same states; the two instruments are separately authored) | measured |

No disagreement was found in the binary lane. One observation that is not a disagreement: the subject's document states the subject did not read the reference files and the reference did not read the subject files before its freeze; the agreement of the $18\times7$ table to $4\times10^{-15}$ is therefore evidence under the independence rule, and so is the agreement of the two independently prepared perturbation measurements at the four common frequencies. The one point where the lanes' texts differ in content, the subject's eight-ratio resonance receipt against the document's four-row table, is a presentation difference, not a value difference.

## 11. Run record (append-only)

- 2026-10-05T23:42Z lane start (shared clock 23:32:34Z); AGENTS.md, operator explanation standard, preregistration, manuscript Section 9, pair investigation Sections 3, 5, 7 and addendum item 1, ring analysis Sections 2–5 read. No `weber-frequency-continuation`, `weber-binding-sphere-investigation`, `weber-binding-sphere-known-cases`, non-reference `weber-binding-sphere-*` evidence, `.local-data/master-equation-closure/weber-binding-sphere/` or `.tmp/weber-binding-sphere/geometry/` path was opened, grepped or listed (the evidence directories were listed by `ls | grep reference` only, which names no subject file).
- 2026-10-05T23:45Z law module and pair script written from the law; derivation of Sections 1–5 completed on paper before the first run.
- 2026-10-05T23:46:13Z first run: K1, K5, K6 pass; (b) returned a uniform $9.07\%$ excess because the script divided by the count of maxima rather than the count of intervals; corrected to the mean interval between interior maxima.
- 2026-10-05T23:46:30Z second run: (b) returned a uniform $2.4\times10^{-4}$ deficit; traced to the preparation (positions scaled at unchanged velocities changes $h$ by $10^{-4}$ and the reference radius by $2\times10^{-4}$, so the measured frequency belonged to a wider circle); preparation changed to fixed $h$.
- 2026-10-05T23:46:57Z frozen run; results in Sections 6–7.
- 2026-10-05T23:51:01Z Part 1 freeze recorded in Section 9; document hash at freeze: 269683c412ec743a10d127b9576d68f3e6bf944fb3ae43569b56b647bd098d5b (computed after the freeze block was written, before this line was appended; the hash of the file including this line is recorded in the Part 2 document).
- 2026-10-06T01:05:59Z Part 3a round-1 adjudication appended as Section 10.1 after the PI exposure message (00:58Z); subject files read: weber-frequency-continuation.md and .json (the .mjs and SVGs were not needed and not opened). Comparison command: node -e script reading both receipts (run record of the six-body reference, 01:00Z); no frozen text above Section 10 changed.
