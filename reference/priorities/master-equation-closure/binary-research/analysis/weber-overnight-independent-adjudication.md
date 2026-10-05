# Independent reference for the isolated Weber-inspired pair

## Status

**Reference fixed at 2026-10-05T03:00Z (UTC) before exposure to subject outputs; blind withheld values fixed at 13:03Z (Section 10); adjudication of the subject written at about 14:30Z in [Section 8](#8-adjudication-of-the-subject-2026-10-05), with the resulting corrections to this reference in [Section 12](#12-addendum-corrections-arising-from-the-adjudication-2026-10-05).**

- Author lens: independent enclosure and reference construction (`ramon-e-moore`), weber-overnight run.
- Independence: written without opening any subject file of this run (no `weber-overnight-investigation.md`, no collinear approach file, no `weber-overnight-pair-instrument*`, nothing under `.tmp/weber-overnight/reduction/` or `.tmp/weber-overnight/instrument/`). The derivation below was completed before Section 9 of the [equation-variants manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response) was read; the comparison with its displayed pair identity is in [Section 6](#6-comparison-with-the-section-9-pair-identity).
- Instrument: [weber-overnight-independent-reference.mjs](../evidence/weber-overnight-independent-reference.mjs) (Node 22 ESM, no dependencies; SHA-256 at fixing `feeffd7e8986d6fa695dfc1a35777891ba7ef65728f3aeda5e9a1631440d23c3`). Known cases: [weber-overnight-independent-reference-controls.json](../evidence/weber-overnight-independent-reference-controls.json), 24 of 24 pass, recorded before any benchmark run. Benchmark output: `.local-data/master-equation-closure/weber-overnight/review/independent-reference-benchmarks.json` (ignored runtime output).
- Claim boundary: an independent mathematical reference for the isolated pair under the frozen instantaneous law only. Nothing here bears on the four-member ring, on any delayed law, or on physical binding. The invariants below are mathematical invariants of an adapted law, not primitive physical energy or momentum accounts.

## 1. Case specification

The law is the frozen Section 9 instantaneous Weber-inspired response. For two members $i\ne j$ at present separation $r=\|\mathbf X_i(T)-\mathbf X_j(T)\|>0$, with unit vector $\mathbf e=(\mathbf X_i-\mathbf X_j)/r$, polarity product sign $\sigma=\operatorname{sign}(q_iq_j)$ and coupling $K>0$,

$$
\mathbf A_{i\leftarrow j}=\frac{\sigma K}{r^2}\Big[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}+\mu_{\mathrm W}\frac{r\ddot r}{c_f^2}\Big]\mathbf e,\qquad \mathbf A_{j\leftarrow i}=-\mathbf A_{i\leftarrow j},\qquad \mathbf X_i''=\mathbf A_{i\leftarrow j}.
$$

Here $\dot r$ and $\ddot r$ are absolute-time derivatives of the present separation, $c_f$ is the wake speed, and the frozen coefficients are $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$. Positive $\sigma$ (same polarity) makes the leading term push the members apart; negative $\sigma$ (opposite polarity) pulls them together. Every member receives the full acceleration: architrinos carry no mass, so there are no integration weights other than one. Support is the present instant; no causal delay is inserted and there is no self term. Numerical work sets $K=1$ and $c_f=1$, so lengths are in units of $K/c_f^2$, times in units of $K/c_f^3$, speeds in units of $c_f$, and the dimensionless separation is $x=rc_f^2/K$. The zero-coefficient case $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$ is the instantaneous inverse-square control; it is not the delayed canonical Master Equation.

The scaling $x=rc_f^2/K$, $\tau=tc_f^3/K$ maps the law to itself with $K=c_f=1$ (each term of the bracket is dimensionless and $\sigma K/r^2$ becomes $\sigma/x^2$ in the new units), so every dimensionless result below holds for all $K>0$ and $c_f>0$.

Speed comparisons are made in the absolute (void) frame with the **centre of velocity at rest**, an assumption stated wherever a speed is reported. Three admissibility labels are tracked: unrestricted, inclusive ceiling $\|\mathbf V_i\|\le c_f$, strict ceiling $\|\mathbf V_i\|<c_f$. They are labels only; no clamp, projection or boundary response is selected.

## 2. Derivation

The route avoids direct Cartesian differentiation of the pair acceleration. It uses the relative coordinate in polar form, a Lagrangian that is checked against the law by direct computation, and an integrating factor for the radial equation. A separate numerical Cartesian evaluation of the law (Section 3.4) checks the result.

### 2.1 Centre and relative coordinates

Adding the two member equations gives $\mathbf X_1''+\mathbf X_2''=\mathbf A_{1\leftarrow2}+\mathbf A_{2\leftarrow1}=0$. The velocity sum $\mathbf V_1+\mathbf V_2$ is therefore constant: the midpoint (the "centre of velocity", which is the midpoint because the weights are equal) moves uniformly. Subtracting gives the relative equation for $\mathbf R=\mathbf X_1-\mathbf X_2=r\mathbf e$:

$$
\mathbf R''=2\mathbf A_{1\leftarrow2}=\frac{G}{r^2}\Big[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}+\mu_{\mathrm W}\frac{r\ddot r}{c_f^2}\Big]\mathbf e,\qquad G=2\sigma K.
$$

The factor $2$ appears because both members receive the full acceleration; $G$ is called the relative coupling. With the centre of velocity at rest, $\mathbf X_{1,2}=\pm\mathbf R/2$, so each member's speed is half the relative speed $\|\mathbf R'\|$. Claim grade: derived.

### 2.2 The implicit acceleration solve and its singular coefficient

The bracket contains $\ddot r$, which depends on the unknown accelerations, so the law is implicit. Picture the six unknown acceleration components $\mathbf a=(\mathbf A_1,\mathbf A_2)$. Kinematics gives $\ddot r=\mathbf e\cdot(\mathbf A_1-\mathbf A_2)+\|\mathbf w_\perp\|^2/r$, where $\mathbf w=\mathbf V_1-\mathbf V_2$ and $\mathbf w_\perp$ is its component perpendicular to $\mathbf e$. Writing $\mathbf u=(\mathbf e,-\mathbf e)\in\mathbb R^6$, so that $\mathbf u\cdot\mathbf a=\mathbf e\cdot(\mathbf A_1-\mathbf A_2)$ and $\|\mathbf u\|^2=2$, the law becomes the linear system

$$
\big(\mathbb I_6-\alpha\,\mathbf u\mathbf u^{\mathsf T}\big)\mathbf a=\frac{\sigma K}{r^2}\Big[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}+\mu_{\mathrm W}\frac{\|\mathbf w_\perp\|^2}{c_f^2}\Big]\mathbf u,\qquad \alpha=\frac{\sigma K\mu_{\mathrm W}}{r\,c_f^2}.
$$

A rank-one update of the identity has determinant $1-\alpha\|\mathbf u\|^2$, so

$$
\det=D(r)=1-\frac{2\sigma\mu_{\mathrm W}K}{c_f^2\,r}=1-\frac{b}{r},\qquad b=\frac{\mu_{\mathrm W}G}{c_f^2},
$$

and whenever $D\ne0$ the inverse is $\mathbb I_6+\alpha\mathbf u\mathbf u^{\mathsf T}/D$. The singular coefficient is independent of $\lambda_{\mathrm W}$ and of every velocity. For the frozen $\mu_{\mathrm W}=1$:

- $\sigma=-1$ (attraction): $D=1+2K/(c_f^2r)>1$ for every $r>0$. The solve is never singular.
- $\sigma=+1$ (repulsion control): $D=1-2K/(c_f^2r)$ vanishes at the **critical radius** $r_c=b=2K/c_f^2$ ($x=2$), is positive outside it and negative inside it.

Claim grade: derived. Falsifier: a state with $r\ne r_c$ at which the 6×6 matrix is singular, or a $\sigma=+1$ state at $x=2$ where it is regular. The instrument's direct Cartesian evaluation reproduces $\det=1-2\sigma/r$ at generic three-dimensional states to $10^{-12}$ (controls file).

### 2.3 Polar reduction

The relative acceleration is parallel to $\mathbf e$, so $\mathbf R\times\mathbf R'$ is constant: the motion is planar and $h=r^2\dot\theta$ is constant, where $\theta$ is the polar angle of $\mathbf R$. The radial component of $\mathbf R''$ is $\ddot r-r\dot\theta^2=\ddot r-h^2/r^3$. Substituting into Section 2.1 and collecting the $\ddot r$ terms gives the reduced radial equation

$$
\Big(1-\frac{b}{r}\Big)\ddot r=\frac{h^2}{r^3}+\frac{G}{r^2}+\lambda_{\mathrm W}\frac{G\,\dot r^2}{c_f^2r^2}.
$$

The coefficient of $\ddot r$ is exactly the determinant $D$ of Section 2.2, as it must be. Claim grade: derived. Falsifier: the instrument compares this $\ddot r$ with the radial component of the Cartesian implicit solve at generic states (Section 3.4).

### 2.4 Lagrangian and first integrals

Try the polar Lagrangian $\mathcal L=\tfrac12(\dot r^2+r^2\dot\theta^2)-\dfrac{G}{r}-\beta\dfrac{G}{c_f^2r}\dot r^2$. Its radial Euler-Lagrange equation is

$$
\Big(1-\frac{2\beta G}{c_f^2r}\Big)\ddot r=r\dot\theta^2+\frac{G}{r^2}-\beta\frac{G\dot r^2}{c_f^2r^2}.
$$

This coincides with Section 2.3 exactly when $2\beta=\mu_{\mathrm W}$ and $-\beta=\lambda_{\mathrm W}$, that is, on the family $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$. The frozen pair $(-1/2,1)$ lies on it with $\beta=1/2$, and so does the zero-coefficient control. In member coordinates, using $\mathbf X_{1,2}=\mathbf X_c\pm\mathbf R/2$, the equivalent two-member Lagrangian is

$$
\mathcal L_2=\tfrac12\|\mathbf V_1\|^2+\tfrac12\|\mathbf V_2\|^2-\frac{\sigma K}{r}\Big(1+\frac{\dot r^2}{2c_f^2}\Big),
$$

since $\mathcal L_2=\|\mathbf V_c\|^2+\tfrac12\mathcal L$. The instrument evaluates the Euler-Lagrange residual of $\mathcal L_2$ by central finite differences at a generic three-dimensional state, with accelerations taken from the direct Cartesian solve of the law; the residual is $1.2\times10^{-9}$ ($\sigma=-1$) and $5.8\times10^{-8}$ ($\sigma=+1$), at the finite-difference noise level. Claim grade: derived (polar computation above), with a measured numerical confirmation.

The Lagrangian has three consequences, each a mathematical invariant of the adapted law:

1. Uniform motion of the centre of velocity (translation invariance).
2. Constant relative angular rate integral $h=r^2\dot\theta$ (rotation invariance).
3. The Jacobi (energy-function) integral. In relative variables it is $C=2\big(\dot r\,\partial\mathcal L/\partial\dot r+\dot\theta\,\partial\mathcal L/\partial\dot\theta-\mathcal L\big)$, namely

$$
C=\dot r^2\Big(1-\frac{b}{r}\Big)+\frac{h^2}{r^2}+\frac{2G}{r}.
$$

For the members with the centre of velocity at rest, the two-member energy function is $C/4$. Direct time differentiation of $C$ along Section 2.3 gives $\dot C=\dot r\,[2D\ddot r+G\mu_{\mathrm W}\dot r^2/(c_f^2r^2)-2h^2/r^3-2G/r^2]$, which vanishes when $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$. These quantities are bookkeeping invariants of this instantaneous law; they are not architrino-level energy or momentum accounts.

**A route that does not need the Lagrangian.** With $u=\dot r^2$ as a function of $r$, $du/dr=2\ddot r$, and Section 2.3 becomes linear and first order in $u$. Since $dD/dr=b/r^2$, an integrating factor $D^{p}$ with $p=-2\lambda_{\mathrm W}/\mu_{\mathrm W}$ gives, for every $\mu_{\mathrm W}\ne0$,

$$
\frac{d}{dr}\big(u\,D^{p}\big)=2D^{p-1}\Big(\frac{h^2}{r^3}+\frac{G}{r^2}\Big).
$$

For $p=1$ the right side does not involve $D$ and integrates at once to $uD=C-h^2/r^2-2G/r$, which is the same $C$. Outside the family a first integral still exists in quadrature, but the instrument does not use it. Claim grade: derived.

### 2.5 The radial velocity function and turning points

Solving $C$ for $\dot r^2$ gives the central formula of this reference:

$$
\dot r^2=\frac{Cr^2-2Gr-h^2}{r\,(r-b)}.
$$

Turning points ($\dot r=0$ at a regular point) are the positive roots of the quadratic $Q(r)=Cr^2-2Gr-h^2$. The zero-coefficient control has exactly the same quadratic. For a preparation released at a turning point, $C=h^2/r_0^2+2G/r_0$ is the same in both laws, so **the Weber law and the inverse-square control share their turning radii**. The Weber terms change only the rate at which the orbit is traversed: on the same $(C,h)$ level, $\dot r_{\mathrm W}^2=\dot r_{\mathrm K}^2/D$. This changes the elapsed time and the swept angle, but not where the motion turns. It is a surprising and easily checked identity. Claim grade: derived. Falsifier: a released orbit whose turning radii differ between the two laws.

### 2.6 Uniform circular histories

A circle needs $\dot r=0$ and $\ddot r=0$. Both Weber terms then vanish, and Section 2.3 reduces to $h^2/r^3+G/r^2=0$, i.e. $h^2=-Gr$. Circles therefore exist only for attraction ($\sigma=-1$, $G=-2K$), at every radius, with

$$
\dot\theta^2=\frac{2K}{r^3},\qquad v_{\mathrm{rel}}=r\dot\theta=\sqrt{\frac{2K}{r}},\qquad v_{\mathrm{member}}=\tfrac12v_{\mathrm{rel}}=\sqrt{\frac{K}{2r}}\quad(\text{centre of velocity at rest}).
$$

These are identical to the inverse-square control, independent of $\lambda_{\mathrm W}$, $\mu_{\mathrm W}$ and $c_f$. Each member reaches $c_f$ at $r=K/(2c_f^2)$, i.e. $x=1/2$. The relative speed reaches $c_f$ at $x=2$. Circles with $x<1/2$ are superfield (member speed above $c_f$) and belong only to the unrestricted domain; $x=1/2$ belongs to the inclusive but not the strict ceiling. Claim grade: derived (exact solution of the full law, since $D>0$ for $\sigma=-1$).

### 2.7 Small radial oscillation and apsidal angle about the circle

Hold $h$ fixed and write $\ddot r=F(r,\dot r)$ from Section 2.3. $F$ is even in $\dot r$, so $\partial F/\partial\dot r=0$ on the circle. The numerator $N(r)=h^2/r^3+G/r^2$ vanishes at the circle radius $r_0$, so $\partial F/\partial r=N'(r_0)/D(r_0)$, where $N'(r_0)=-3h^2/r_0^4-2G/r_0^3=G/r_0^3$. The radial angular frequency is therefore

$$
\omega_r^2=-\frac{G}{r_0^2\,(r_0-b)}=\frac{2K}{r_0^2\,(r_0+2K/c_f^2)}\quad(\sigma=-1,\ \mu_{\mathrm W}=1),
$$

for every $\lambda_{\mathrm W}$. Compared with $\dot\theta^2=2K/r_0^3$, the ratio is $\omega_r/\dot\theta=(1+2K/(c_f^2r_0))^{-1/2}<1$. The apsidal angle is the polar angle swept from pericentre to apocentre, $\Delta\theta=\pi\dot\theta/\omega_r$. In the small-oscillation limit it is

$$
\Delta\theta_{\mathrm{circ}}=\pi\sqrt{1+\frac{2}{x}}\qquad(\text{peri to apo});\qquad\text{advance per radial period}=2\pi\Big(\sqrt{1+2/x}-1\Big).
$$

The control gives $\omega_r=\dot\theta$ and $\Delta\theta=\pi$ exactly. Within the planar reduced radial direction at fixed $h$, these circles are linearly neutral: real $\omega_r$, so radial perturbations oscillate. This is local linear information about an exact solution. It says nothing about common-centre, out-of-plane or finite-amplitude behaviour, although the finite-amplitude planar orbits are in fact periodic in $r$ (Section 2.8). Claim grade: derived. Falsifier: the certified quadrature apsidal angle of a slightly eccentric orbit failing to approach $\pi\sqrt{1+2/x}$; the controls test this at $x=4$.

### 2.8 Bound planar orbits

For $\sigma=-1$ ($G=-2K$, $b=-2K/c_f^2<0$), $D>0$ everywhere. With $C<0$ and $G^2+Ch^2>0$, $Q$ has two positive roots $r_-<r_+$, and $\dot r^2=|C|(r_+-r)(r-r_-)/(r(r-b))>0$ strictly between them. The radius therefore oscillates periodically between $r_-$ and $r_+$, and contact never occurs while $h>0$. Introduce the angle variable $r=m-w\cos\phi$, where $m=(r_++r_-)/2=G/C$, $w=(r_+-r_-)/2=\sqrt{G^2+Ch^2}/|C|$, and $\phi\in[0,\pi]$ runs from pericentre to apocentre. The substitution absorbs both square-root endpoint singularities, $dr/\sqrt{(r_+-r)(r-r_-)}=d\phi$, so

$$
T_r=\frac{2}{\sqrt{|C|}}\int_0^\pi\sqrt{r(r-b)}\,d\phi,\qquad
\Delta\theta=\frac{h}{\sqrt{|C|}}\int_0^\pi\frac{\sqrt{r(r-b)}}{r^2}\,d\phi .
$$

Both integrands are even, $2\pi$-periodic and analytic in $\phi$. With $b=0$ these reduce to $T_r=2\pi a^{3/2}/\sqrt{|G|}$ with $a=m$, and $\Delta\theta=\pi h/\sqrt{|C|r_+r_-}=\pi$, using $r_+r_-=h^2/|C|$. These are the Kepler control values.

**Maximum member speed.** On a level $(C,h)$, the squared relative speed is $v^2=\dot r^2+h^2/r^2=(Cr^3-2Gr^2-h^2b)/(r^2(r-b))$. For $\sigma=-1$ in units $K=c_f=1$ this is $(Cr^3+4r^2+2h^2)/(r^2(r+2))$, whose derivative has numerator $r[(2C-4)r^3-6h^2r-8h^2]$. That numerator is negative for all $r>0$ whenever $C<2$, which includes every bound orbit. The relative speed is therefore strictly decreasing in $r$, and the maximum member speed (centre of velocity at rest) is $h/(2r_-)$, at pericentre. Claim grade: derived.

**No bound orbits for $\sigma=+1$.** Outside $r_c$ the denominator $r(r-b)$ is positive. If $C>0$, $Q$ has one positive root and is positive beyond it, so the motion is unbounded. If $C\le0$, $Q<0$ for all $r>0$ and no motion is possible there. Inside $r_c$ the denominator is negative, so motion requires $Q<0$. That set is an interval adjacent to $r=0$, and there is no second turning point. Claim grade: derived.

### 2.9 Radial motion ($h=0$)

Dividing numerator and denominator by $r$ gives $\dot r^2=(Cr-2G)/(r-b)$. With the frozen $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$ and $c_f=1$, Section 2.3 simplifies to $\ddot r=G(1-\dot r^2/2)/(r(r-b))$. **The leading acceleration reverses direction when the relative radial speed exceeds $\sqrt2\,c_f$.** At that speed a repelling pair accelerates toward each other, and an attracting pair away from each other.

**Opposite polarity ($\sigma=-1$).** Starting inward, or from rest, the pair always reaches contact $r\to0$. If $C<0$ the motion is bounded by the apocentre $r^\ast=2G/C$. As $r\to0$,

$$
\dot r^2\to\frac{2G}{b}=\frac{2c_f^2}{\mu_{\mathrm W}}=2c_f^2,
$$

whatever the preparation. The contact relative speed is therefore $\sqrt2\,c_f$ and each member's speed is $c_f/\sqrt2$. Substituting $\dot r^2$ shows that $1-\dot r^2/2=(2-C)r/(2(r-b))$, so $\ddot r=G(2-C)/(2(r-b)^2)$ remains finite at contact (it is $-(2-C)/4$ for $K=c_f=1$). Contact is reached in finite time with finite speed and finite acceleration. It ends the defined history, because the self pair $r=0$ lies outside the law; no continuation through it is selected. For release from rest at $r_0$ ($C=-4K/r_0$), the substitution $r=\tfrac{r_0-b'}{2}-\tfrac{r_0+b'}{2}\cos\phi$ with $b'=-b=2K/c_f^2$ turns the integrand into $\tan(\phi/2)$ and gives the closed form

$$
t_{\mathrm{contact}}=\sqrt{\frac{r_0}{4K}}\;\frac{r_0+b'}{2}\big(\pi-\phi_0+\sin\phi_0\big),\qquad \cos\phi_0=\frac{r_0-b'}{r_0+b'}.
$$

For $x_0=4$ this is $3\pi-3\arccos(1/3)+2\sqrt2$. With $b'=0$ it reduces to the inverse-square value $\pi r_0^{3/2}/(4\sqrt K)$, at which point the contact speed is unbounded. Throughout the infall from rest $\dot r^2=(4K/r_0)(r_0-r)/(r+b')$ increases monotonically toward $2c_f^2$, so the member speed stays below $c_f/\sqrt2$. The whole history lies in the strict-ceiling domain. Claim grade: derived.

**Same polarity ($\sigma=+1$), outside $r_c$.** Write $e=Cb-2G$. In units $K=c_f=1$, $e>0$ is equivalent to $C>2c_f^2/\mu_{\mathrm W}=2$; for a pair arriving from far away, $C$ is the square of the relative speed at infinity.

- Released at rest at $r_0>r_c$ (then $C=4K/r_0$): the pair moves monotonically outward and escapes, with relative speed tending to $\sqrt C$.
- Inward with $e<0$: the pair turns at $r^\ast=2G/C>r_c$ and then escapes.
- Inward with $e>0$: the pair reaches $r_c$ in finite time, with $|\dot r|\to\infty$ and $\ddot r\to-\infty$, while the implicit-solve determinant $D\to0^+$. The member speed passes $c_f$ at $r=(2G-4c_f^2b)/(C-4c_f^2)$ before $r_c$. At $r_c$ the acceleration matrix is singular and no continuation is defined.
- The boundary case $e=0$ ($C=2c_f^2$) gives $\dot r^2\equiv2c_f^2$: uniform approach that reaches $r_c$ with finite speed and an indeterminate $0/0$ acceleration.

Closed forms, with $u$ defined through $\sinh^2u$:

- For $e>0$ (reaching $r_c$), from $r$ to $r_c$: $t=\dfrac{e}{C^{3/2}}(\sinh u\cosh u-u)$ with $\sinh^2u=C(r-b)/e$.
- For $e<0$ (turning), from $r$ to $r^\ast$: $t=\dfrac{|e|}{C^{3/2}}(u+\sinh u\cosh u)$ with $\sinh^2u=(Cr-2G)/|e|$.

The inverse-square control has $b=0$, hence $e=-2G<0$: it always turns. Claim grade: derived.

**Same polarity inside $r_c$** (not a benchmark). Here $D<0$, and the leading repulsion produces acceleration toward the partner. A pair released from rest at $x<2$ falls into contact, again with contact relative speed $\sqrt2\,c_f$ when $h=0$. Claim grade: derived.

### 2.10 Zero-coefficient control in closed form

With $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$, $b=0$, the relative motion is the Kepler problem with coupling $G=2\sigma K$ and unit weights: $\dot r^2=C-h^2/r^2-2G/r$, radial period $2\pi a^{3/2}/\sqrt{2K}$, apsidal angle $\pi$, and contact time from rest $\pi r_0^{3/2}/(4\sqrt K)$ with unbounded contact speed. For $\sigma=+1$ the turning point is $2G/C$. Claim grade: derived.

## 3. The reference instrument

### 3.1 What it computes

Given an initial pair state $(r_0,\dot r_0,h)$, polarity, coefficients on the family $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$, $K$ and $c_f$, [the instrument](../evidence/weber-overnight-independent-reference.mjs) computes the following:

- the invariant $C$ and the singular coefficient $D$;
- turning points from the quadratic $Q$;
- for bound orbits: radial period, apsidal angle and precession, and maximum member speed with the centre of velocity at rest;
- for circular histories: the closed forms of Sections 2.6–2.7;
- for radial preparations: fate, contact time and contact speed, time to the critical radius, turning time, asymptotic speed, and the point at which a member speed equals $c_f$.

It is not a Cartesian time-stepper.

### 3.2 Arithmetic and certification method

All primary outputs are outward-rounded interval enclosures:

- Every IEEE-754 $+,-,\times,\div,\sqrt{}$ result is widened by one unit in the last place on each side. This encloses the exact result whenever the operation is correctly rounded, or merely faithful.
- $\pi$ is enclosed as $[\mathtt{Math.PI},\,\mathrm{nextUp}(\mathtt{Math.PI})]$.
- $\cos$, $\sin$ and $\exp$ are Taylor series with explicit remainder enclosures; $\exp$ uses power-of-two argument reduction.
- $\log$ and $\arccos$ are interval-Newton enclosures, and a run fails unless the Newton image contracts strictly inside the starting box.
- Benchmark inputs are exact rationals (for example $h^2=128/25$), enclosed by interval division.

**Bound-orbit integrals.** The $\phi$-integrals are evaluated with the trapezoid rule on $N$ equispaced points of $[0,2\pi]$, halved by evenness. The remainder is bounded by the theorem of Trefethen and Weideman (SIAM Review 56 (2014) 385, Theorem 3.2): if a $2\pi$-periodic integrand is analytic with $|f|\le M$ in the strip $|\operatorname{Im}\phi|<a$, then the error is at most $4\pi M/(e^{aN}-1)$. Three steps make this bound computable:

1. **Analyticity.** On the strip, $\operatorname{Re}r=m-w\cos(\operatorname{Re}\phi)\cosh(\operatorname{Im}\phi)\ge m-w\rho$ with $\rho=\cosh a$. If $m-w\rho>\max(0,b)$, then $r$ and $r-b$ both lie in the open right half-plane with equal imaginary parts, so $r(r-b)\notin(-\infty,0]$ and the principal square root is analytic.
2. **Bounds.** $|f|$ and $|g|$ are bounded with $|\cos\phi|\le\rho$: $M_f\le\sqrt{(|m|+w\rho)(|m-b|+w\rho)}$ and $M_g\le M_f/(m-w\rho)^2$.
3. **Strip width without an exponential.** The instrument chooses $\rho=(1+\kappa)/2$, where $\kappa=(m-\max(0,b))/w$ is the left endpoint of its enclosure, and uses $e^{a}=\rho+\sqrt{\rho^2-1}$.

Radial times use the closed forms of Section 2.9 evaluated in interval arithmetic.

**Certification status.** The enclosures are certified for the stated formulas, conditional on two named assumptions: (a) the Trefethen–Weideman theorem as cited (an imported mathematical theorem, not re-proved here), and (b) the host's basic operations being correctly rounded or faithful (V8 on x86-64 uses hardware IEEE operations). The closed forms and integral representations are derived by hand in Section 2. The interval evaluation certifies the numbers given those formulas; it does not machine-check the derivation. The derivation is checked separately by the independent routes in Section 3.4. Floating-point outputs (the tanh-sinh quadrature, the reduced-ODE evaluator and the Cartesian/Lagrangian checks) are measured, not certified.

### 3.3 Domain of the instrument

The quadrature and closed-form routines require $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$, which covers the frozen law and the zero-coefficient control. The certified bound-orbit path requires $C<0$, two positive turning points and pericentre above $\max(0,b)$. The radial closed forms cover these cases:

- $\sigma=-1$ with $C<0$;
- $\sigma=+1$ outside $r_c$, moving inward with $e\gtrless0$;
- $\sigma=+1$ released from rest.

Other preparations fall back to the floating tanh-sinh quadrature (measured), or are reported as unclassified. Circular-orbit values are interval evaluations of the closed forms.

### 3.4 Second checks written separately from the quadrature

- **Reduced-ODE evaluator.** A classical RK4 integration of Section 2.3 for general $(\lambda_{\mathrm W},\mu_{\mathrm W})$, which does not use the invariant $C$. It locates events by bisection on the sub-step.
- **Direct Cartesian law evaluation.** The law is coded with $\ddot r$ from generic kinematics, $\ddot r=(\Delta\mathbf a\cdot\Delta\mathbf x+\|\Delta\mathbf v\|^2)/r-(\Delta\mathbf v\cdot\Delta\mathbf x)^2/r^3$. Its affine dependence on the six accelerations is assembled numerically, and the system is solved by Gaussian elimination. This checks the determinant of Section 2.2 and the polar reduction of Section 2.3 without passing through them.
- **Lagrangian residual.** The finite-difference Euler-Lagrange residual of $\mathcal L_2$ (Section 2.4).
- **Tanh-sinh quadrature** of the radial time integral, with exact endpoint distances.

These share an author with the interval paths. They are separately coded routes, not independent evidence in the sense of the repository's evidence-independence rule. The independent party for the subject is this whole instrument.

## 4. Known-case passes (recorded first)

The controls were run, and passed 24 of 24, before any benchmark computation. The record is [weber-overnight-independent-reference-controls.json](../evidence/weber-overnight-independent-reference-controls.json).

| Control | Known answer | Instrument result | Pass |
| --- | --- | --- | --- |
| Interval $\cos(\pi/3)$, $\cos(2\pi/3)$, $\log2$, $\arccos(1/2)$ | $1/2$, $-1/2$, $0.693147180559945\ldots$, $\pi/3$ | enclosures of width $4\times10^{-15}$ to $2\times10^{-14}$ containing each value | yes |
| Kepler control, ellipse $r\in[1,3]$, $G=-2$: invariant | $C=-|G|/a=-1$ | $[-1.0000000000000013,-0.9999999999999991]$ | yes |
| Same: turning points | $1$, $3$ | enclosures of width $1.6\times10^{-14}$ | yes |
| Same: radial period | $2\pi a^{3/2}/\sqrt{|G|}=4\pi$ | $[12.566370614359062,12.566370614359284]$ | yes |
| Same: apsidal angle | $\pi$ exactly | $[3.141592653589717,3.141592653589868]$ | yes |
| Kepler control, $a=5$ ($r\in[2,8]$): period | $2\pi\,5^{3/2}/\sqrt2=49.672941329\ldots$ | $49.67294133$ (width $8.5\times10^{-13}$) | yes |
| Same: apsidal angle | $\pi$ | $3.141592654$ | yes |
| Kepler contact time from rest, $x_0=4$ | $\pi r_0^{3/2}/(4\sqrt K)=2\pi$ | $[6.28318530717957,6.283185307179603]$ | yes |
| Weber identity: $C$ at a turning point, $r_0=4$, $h^2=128/25$ | $-17/25$ | $-0.6800000000$ | yes |
| Weber identity: turning points equal the roots of $Cr^2+4r-h^2$ | $\{32/17,\,4\}$ | $1.882352941$, $4.000000000$ | yes |
| Weber identity: $\dot r^2>0$ between the turning points | positive | $0.05066666667$ at $r=3$ | yes |
| Weber contact time from rest, $x_0=4$, two enclosures | $3\pi-3\arccos(1/3)+2\sqrt2$ | the interval-closed-form and $\phi$-route enclosures overlap: $8.560326833$ | yes |
| Floating tanh-sinh against the same closed form | agreement within $10^{-12}$ | $8.560326833493239$ | yes |
| Near-circular quadrature apsidal angle at $x=4$ (0.1% tangential deficit) | tends to $\pi\sqrt{1+2/x}=3.847649\ldots$ | $3.848933645$ (difference of order the deficit) | yes |
| Lagrangian $\mathcal L_2$ generates the law, $\sigma=\pm1$ | residual $\approx0$ | $1.2\times10^{-9}$, $5.8\times10^{-8}$ | yes |
| Cartesian implicit-solve determinant, $\sigma=\pm1$ | $1-2\sigma/r$ | agreement within $10^{-12}$ | yes |
| Polar $\ddot r$ against direct Cartesian law, $\sigma=\pm1$ | $\mathbf e\cdot(\mathbf A_1-\mathbf A_2)=\ddot r-h^2/r^3$ | agreement within $10^{-12}$ | yes |
| Reduced-ODE evaluator on the Kepler control | $\Delta\theta=\pi$, $T_r=4\pi$ | $3.141592653589852$, $12.56637061435782$ | yes |

**Instrument log (first-run failures, retained).** Each failure below was in the instrument, not in a derived result.

1. The first control run passed 22 of 24. The interval $\log2$ enclosure had width $5.9\times10^{-13}$ against a preset width target of $10^{-14}$. Six fixed squarings in $\exp$ amplified rounding. Adaptive power-of-two reduction brought the width to $1.8\times10^{-14}$. The width target was then relaxed to $5\times10^{-14}$, and containment of the true value held throughout.
2. The tanh-sinh check missed the closed form by $8\times10^{-8}$, because nodes that rounded onto the singular endpoint were dropped. Passing exact endpoint distances to the integrand and evaluating $Q$ in factored form fixed it.
3. An interval-Newton logarithm failed at a zero-length time interval, at release from rest exactly at a turning point. Those times are now set to their exact value $0$.

## 5. Reference values for the benchmark preparations

All values: $K=1$, $c_f=1$, centre of velocity at rest, lengths in $K/c_f^2$, times in $K/c_f^3$. Unless marked otherwise, each value is the first 10 significant digits shared by both ends of a certified enclosure. Enclosure widths were $\le10^{-12}$ in every listed case. Claim grade: measured by `weber-overnight-independent-reference.mjs`, certified in the sense of Section 3.2, over exactly these preparations. "Apsidal angle" means pericentre to apocentre; the advance per radial period is $2\Delta\theta-2\pi$.

### (i) Circular histories, $\sigma=-1$

| $x$ | angular rate $\dot\theta$ | member speed | radial frequency $\omega_r$ | radial period $2\pi/\omega_r$ | apsidal angle $\Delta\theta$ | advance per radial period | speed domains |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 4 | 0.1767766953 | 0.3535533906 | 0.1443375673 | 43.53118474 | 3.847649490 | 1.412113674 | all three |
| 1 | 1.414213562 | 0.7071067812 | 0.8164965809 | 7.695298981 | 5.441398093 | 4.599610878 | all three |
| 0.25 | 11.31370850 | 1.414213562 | 3.771236166 | 1.666081102 | 9.424777961 ($=3\pi$) | 12.56637061 ($=4\pi$) | unrestricted only (superfield) |

Exact forms: $\dot\theta=\sqrt{2/x^3}$, member speed $\sqrt{1/(2x)}$, $\omega_r=\sqrt{2/(x^2(x+2))}$, $\Delta\theta=\pi\sqrt{1+2/x}$. Member speed equals $c_f$ at $x=0.5000000000$. Zero-coefficient control at the same radii: same $\dot\theta$ and member speed, $\omega_r=\dot\theta$, $\Delta\theta=\pi$, no advance.

### (ii) Eccentric release, $\sigma=-1$

The preparation: $x_0=4$, $\dot r_0=0$, tangential relative speed $0.8\sqrt{1/2}$, hence $h=\sqrt{128/25}=2.262741700$ and $C=-17/25$.

| Quantity | Weber (frozen) | Zero-coefficient control |
| --- | --- | --- |
| turning points $r_-$, $r_+$ | 1.882352941 ($=32/17$), 4.000000000 | identical: 1.882352941, 4.000000000 |
| radial period $T_r$ | 29.00582560 | 22.41023935 |
| apsidal angle $\Delta\theta$ | 4.186307003 | 3.141592654 ($\pi$) |
| advance per radial period | 2.089428698 | 0 |
| maximum member speed (at pericentre) | 0.6010407640 | 0.6010407640 |
| speed domains | all three | all three |

Second checks (measured; floating, not certified):

- With $N=256$ trapezoid points the period and apsidal angle are unchanged to 10 digits.
- The reduced-ODE evaluator gives $T_r=29.0058256048$ and $\Delta\theta=4.1863070026$ at RK4 steps $2\times10^{-3}$ and $10^{-3}$.
- A dense scan of $v^2$ peaks at $r_-$, as the monotonicity theorem of Section 2.8 requires.

### (iii) Radial release from rest at $x_0=4$

| Case | Fate | Times and speeds |
| --- | --- | --- |
| Weber, $\sigma=-1$ | contact $r\to0$ (end of the defined history); $D>1$ throughout | contact time 8.560326833 $=3\pi-3\arccos(1/3)+2\sqrt2$; contact relative speed 1.414213562 ($\sqrt2$); member speed at contact 0.7071067812; strict ceiling holds throughout; $\ddot r(0)=-3/4$, finite |
| Weber, $\sigma=+1$ | monotone escape; never approaches $r_c=2$; no singular event | asymptotic relative speed 1.000000000, member speed 0.5000000000; time to $x=8$: 7.191411155, to $x=16$: 16.21809535; all three domains |
| Control, $\sigma=-1$ | contact with unbounded speed (collision singularity) | contact time 6.283185307 ($2\pi$) |
| Control, $\sigma=+1$ | monotone escape | asymptotic relative speed 1.000000000; time to $x=8$: 9.182348598 |

Second check for the Weber $\sigma=-1$ contact time: the reduced-ODE evaluator, run to $r=10^{-3}$ and closed with a quadratic Taylor tail, gives 8.56032683353 (measured).

### (iv) Same-polarity radial approach from $x_0=8$ (Weber)

| Inward relative speed | $C$ | Fate | Singular event, times and speeds |
| --- | --- | --- | --- |
| 1.6 | 2.42 ($e=0.84>0$) | reaches the critical radius $x=2$, where the implicit-solve determinant vanishes, at finite time with $|\dot r|\to\infty$ and $\ddot r\to-\infty$; no continuation defined | time to $x=2$: 3.491175960. Member speed (0.8 initially) reaches $c_f$ at $x=2.531645570$ ($=4/(4-C)$), at $t=3.283813842$; the strict and inclusive ceilings are left there. The initial acceleration is already toward the partner ($\ddot r_0=-0.01166666667$) because $\dot r^2>2$ |
| 1.2 | 1.58 ($e=-0.84<0$) | turns at $x=2.531645570$ ($=4/C$), then escapes; no singular event | time to turning point: 5.352958001 (back at $x=8$ at twice that, by reversibility); asymptotic relative speed 1.256980509, member speed 0.6284902545 (supremum, not attained); all three domains |

Second checks (measured):

- For speed 1.6: tanh-sinh gives 3.491175959604. The reduced-ODE evaluator, run to $x=2.01$ and closed with a binomial tail series, gives 3.491175959701.
- For speed 1.2: tanh-sinh gives 5.352958001245, and the ODE turning event gives 5.352958001246 at $r=2.53164557$.

Threshold (derived): with $h=0$, an incoming same-polarity pair reaches $r_c$ if and only if $C>2c_f^2$. From $x_0=8$ this means an inward relative speed above $\sqrt2$.

### (v) Same preparations under the zero-coefficient control

| Preparation | Fate | Values |
| --- | --- | --- |
| $\sigma=+1$, from $x_0=8$ inward at 1.6 | turns at $x=1.307189542$ ($=4/C$, $C=3.06$), escapes | time to turn 5.345251812; asymptotic relative speed 1.749285568 (member 0.8746427842) |
| $\sigma=+1$, from $x_0=8$ inward at 1.2 | turns at $x=2.061855670$ ($C=1.94$), escapes | time to turn 6.871881188; asymptotic relative speed 1.392838828 (member 0.6964194139) |
| $\sigma=\pm1$ release from rest at $x_0=4$ | see (iii) | contact $2\pi$ with unbounded speed; escape |
| circular and eccentric | see (i), (ii) | |

The control has no critical radius and no singular coefficient.

## 6. Comparison with the Section 9 pair identity

After the derivation above was complete, Section 9 of the [equation-variants manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response) was read. For $\mathbf A_i=f\mathbf e=-\mathbf A_j$ it displays

$$
\Big(1-\frac{2\sigma K\mu_{\mathrm W}}{c_f^2r}\Big)f=\frac{\sigma K}{r^2}\Big[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}+\mu_{\mathrm W}\frac{\|\mathbf w_\perp\|^2}{c_f^2}\Big],\qquad \ddot r=\frac{\|\mathbf w_\perp\|^2}{r}+2f.
$$

In this reference, the radial component of $\mathbf R''$ is $2f$, $\|\mathbf w_\perp\|^2=h^2/r^2$, and the singular coefficient is $D=1-2\sigma\mu_{\mathrm W}K/(c_f^2r)$. Multiplying the manuscript's identity by 2 gives $D\cdot(2f)=(G/r^2)[\ldots]$. That is the projection of the system in Section 2.2 onto $\mathbf u$, and substituting $\ddot r=h^2/r^3+2f$ recovers the radial equation of Section 2.3 term by term. **There is no disagreement.** The manuscript's identity is confirmed by an independent route (the rank-one determinant and the polar reduction), and numerically by the direct Cartesian evaluation. The manuscript calls $D$ a "possible singular coefficient". This reference sharpens that: for the frozen coefficients, the coefficient is identically positive for opposite polarity and vanishes only at $x=2$ for same polarity, and it is reached in finite time by incoming same-polarity pairs with $C>2c_f^2$. Claim grade: derived. Falsifier: any state where the two expressions for $\ddot r$ differ. As the manuscript also notes, the two-member scalar denominator does not transfer to many-member systems.

## 7. Principal claims and falsifiers

> Claim grade: derived. For $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$, the isolated pair has the first integral $C=\dot r^2(1-b/r)+h^2/r^2+2G/r$. Turning radii are the positive roots of $Cr^2-2Gr-h^2$, shared with the inverse-square control for equal $(C,h)$. Falsifier: a reduced-ODE trajectory along which $C$ drifts beyond integration error, or a turning radius off those roots.

> Claim grade: derived. Opposite polarity: the implicit solve is never singular. Circles exist at every radius with inverse-square angular rates. Small radial oscillations have $\omega_r^2=2K/(r_0^2(r_0+2K/c_f^2))$ and apsidal angle $\pi\sqrt{1+2K/(c_f^2r_0)}$. Every $h>0$ orbit with $C<0$ is radially periodic and never reaches contact. Falsifier: a $\sigma=-1$ bound preparation reaching $r=0$, or a quadrature apsidal angle not approaching $\pi\sqrt{1+2/x}$ as eccentricity tends to zero.

> Claim grade: derived. Opposite-polarity radial motion reaches contact in finite time with relative speed $\sqrt{2/\mu_{\mathrm W}}\,c_f$, independent of the preparation, and with finite acceleration. Falsifier: a radial $\sigma=-1$ history whose contact speed differs from $\sqrt2$.

> Claim grade: derived. Same polarity: the singular coefficient vanishes at $x=2$. An incoming radial pair reaches it in finite time with divergent speed if and only if $C>2c_f^2$, and otherwise turns at $2G/C$. Falsifier: a radial $\sigma=+1$ preparation with $C>2$ that turns outside $x=2$, or one with $C<2$ that reaches it.

> Claim grade: measured (instrument `weber-overnight-independent-reference.mjs`, certified interval enclosures, conditional on Section 3.2 (a) and (b)). The tables in Section 5. Falsifier: a correct independent computation, from the same frozen law and preparations, that lands outside an enclosure. The ODE and tanh-sinh second checks already agree to $10^{-10}$ or better.

> Claim grade: inferred. Within these isolated-pair preparations, the frozen law shows three things. It admits regular, bounded planar opposite-polarity histories, exactly periodic in $r$ with apsidal advance, in every speed domain covered by their member speeds. It sends radial opposite-polarity pairs to contact at finite speed. It produces a genuine acceleration-matrix obstruction only for same-polarity pairs. The extra inference is that the reduced planar picture captures the full pair dynamics. That holds exactly for the isolated pair, because the motion is planar and the centre of velocity decouples, but it does not extend to perturbations by third members. Falsifier: a full Cartesian two-member integration of the law departing from these reduced histories beyond its error bound.

## 8. Adjudication of the subject (2026-10-05)

**Scope and method.** This section adjudicates the frozen subject of the weber-overnight run against the reference fixed in Sections 1–7 (03:00Z) and the blind withheld values of Section 10 (13:03Z), after the blind phase ended. The subject files read for it, all after 13:58Z, were the [subject derivation](weber-overnight-investigation.md) with its addendum and PI sections, the [collinear approach analysis](../../collinear-research/analysis/weber-overnight-collinear-approach.md) with its addendum, the [preregistration](weber-overnight-preregistration.md), the [target-run report](weber-overnight-target-runs.md) with its [machine summary](../evidence/weber-overnight-target-runs.json), and the [instrument note](../evidence/weber-overnight-pair-instrument.md); the instrument source was consulted only for how it assembles the law, and it was not run. Where a number is at stake the comparison value is the certified enclosure of Section 5 or Section 10, or a value from the new check script [weber-overnight-independent-adjudication-checks.mjs](../evidence/weber-overnight-independent-adjudication-checks.mjs) (SHA-256 `d2057c2579e5221c448fca9fd7bee583b4a4a7f48bdd657c028b38ca9edeacaf`), which re-codes the level formulas of Sections 2.9, 10.1 and 11.2 in plain floating point without importing either fixed source. Its known cases K1–K6c (closed-form contact time, a quadrature with the endpoint substitution, the Section 5(iv) critical-radius time, two Kepler times, and the two-member determinant by the full and Gram routes) passed 8 of 8 and were printed before any target check; every target check then passed; the record is `.local-data/master-equation-closure/weber-overnight/review/adjudication-checks.json`. The two fixed reference sources still hash to `feeffd7e…23c3` and `fe08198a…40a3` and were not modified. Values below are measured by that script unless marked certified; the subject's own numbers are quoted from its files. The reference in Sections 1–7 and 10 was not edited; the corrections to it that this adjudication produced are in [Section 12](#12-addendum-corrections-arising-from-the-adjudication-2026-10-05).

### 8.1 Verdict table

| Item | Subject claim | Verdict | Basis |
| --- | --- | --- | --- |
| 1a | Kinematics (2.1)–(2.2) | admitted | identical to the kinematic identity of Section 2.2 |
| 1b | Six-unknown system (3.3), determinant (3.4), Sherman–Morrison inverse, radiality and uniqueness of (3.5) | admitted | rank-one determinant of Section 2.2; the inverse $\mathbb I+\alpha\mathbf u\mathbf u^{\mathsf T}/D$ gives $\mathbf a\parallel\mathbf u$; known cases K6a–c |
| 1c | Invertibility domain (3.3) and singular case (3.4) | admitted | Section 2.2; the "no solution unless the bracket vanishes" statement is the $e=0$ level of Section 2.9 |
| 1d | Invariants (4.1) for any member count | admitted | pair part in Sections 2.1 and 2.3; the $N$-member statement follows from antisymmetric radial pair contributions, checked by inspection |
| 1e | Lagrangian (4.2) with (4.5), energy function (4.6), uniqueness (4.4) within unit-weight pair functions of $(r,\dot r)$ | admitted | Section 2.4 finds the same family $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$ by the polar route; the Euler–Lagrange computation (4.3) was rederived by hand here and is correct; $E=C/4+\|\mathbf V_c\|^2$ reproduces the instrument's $H_0$ on WB-7 exactly |
| 1f | $N$-member matrix (4.7), Sylvester reduction (4.8), invertibility criteria 1–3 | admitted | check T8: $12\times12$ determinant equals $\det(I_P-DG)$ to $3.4\times10^{-15}$ over 50 random four-member states; criteria rederived by hand; T8b: the alternating square's determinant vanishes when its diagonal equals $2$ |
| 1g | General first integral (4.9), with the addendum's $\lvert\Delta\rvert$ and chart caveat (item 5) | admitted | same exponent as the integrating factor $D^{p}$, $p=-2\lambda_{\mathrm W}/\mu_{\mathrm W}$, of Section 2.4; the caveat is correct and applies to Section 2.4 as well (Section 12.1) |
| 1h | Reduced equation (5.1)–(5.2), first integral (5.4)–(5.5), radial invariant (5.6) | admitted | Sections 2.3–2.5; $\varepsilon=C/2$; (5.6) verified to be a first integral by differentiation |
| 2a | Section 6 zero-coefficient closed forms | admitted | Sections 2.10, 5(iii), 5(v); the like-polarity time formula gives $9.182348$ at $x=8$ by hand |
| 2b | 7.1 circular histories, no like-polarity circle | admitted | Section 2.6 |
| 2c | 7.2 reduced radial stability (7.1), apsidal angle (7.2), Lyapunov stability of the reduced motion | admitted | Section 2.7 |
| 2d | 7.3 full-phase-space spectrum, with the addendum's frame-labelled table (item 1) | admitted; reasoning checked by hand, multiplicities not recomputed numerically here | the in-plane centre block $\mathbf y''+2\Omega J\mathbf y'-\Omega^2\mathbf y=0$ has solution $e^{-i\Omega T}(c_0+c_1T)$, hence $\pm i\Omega$ with size-two blocks; tilt $\delta\ddot z=-\Omega^2\delta z$ follows from the law at the circle; multiplicities $4,3,3,1,1$ follow |
| 2e | Theorem 7.4 bound class, dispersal class with the addendum's corrected $\varepsilon=0$ proof (item 2), collision class | admitted | Section 2.8 (bound), Section 11.2 A1–A7 (radial); the corrected monotonicity argument is sound; the reference's own Section 2.8 did not state the $h>0$, $C\ge0$ fate (Section 12.2) |
| 2f | 7.5 quadratures (7.4)–(7.5), maximum speed (7.6), with the addendum's supremum argument (item 6) | admitted | the integrals are those of Section 2.8 under $\psi\leftrightarrow\phi$, $A=m$, $Ae=w$, $\kappa=-b$; $q(u)$ is strictly increasing for $u>0$, so at most one sign change |
| 2g | 7.6 same invariants versus same preparation, (7.7) | admitted | Section 2.5 |
| 2h | Theorem 8.1 with the addendum's complete branch table (item 4), saddle eigenvalues | admitted | matches Section 11.2 B1–B11 at $h=0$; the $h>0$ threshold $V_{\mathrm{eff}}(\kappa)$ equals $C=2+h^2/\kappa^2$; the interior contact rate $\dot r^2\approx h^2/(\kappa r)$ and the triangular Jacobian were rederived |
| 2i | Section 9 speed coverage as corrected (addendum item 3), including (A.4) | admitted | the corrected radial row is A1–A7 read for member speed; (A.4) is the per-instant form of the Section 10.1 supremum formula |
| 3a | Collinear shifted-separation form (2.4), sign chart (2.5), contact speed and acceleration (2.6) | admitted | Section 2.9 and 11.1: $G_\sigma$ and $\ddot r=\sigma(2-C)/s^2$ agree term by term; (2.6) gives $-(2-C)/4$ |
| 3b | Equality radius (2.7); Section 3 opposite-polarity table; Section 4 like-polarity tables | admitted | $r_\times=4/(4-C)$; A1–A7 and B1–B11 |
| 3c | Critical-radius approach (4.1), the $(T_*-T)^{-1/3}$ speed law, indeterminate level, saddle | admitted | check T12: the leading-order law reproduces the WB-8 stop speed $2500.0046$ to $2.4\times10^{-7}$ relative at $T_*-T=3.6\times10^{-11}$ |
| 3d | Contact time (3.1), predictions of Section 7 | admitted | checks T11, T9, T10 |
| 4a | Comparisons done as preregistered | admitted | see 8.5 |
| 4b | Integration-error estimates | admitted; conservative where checkable | every measured value lies inside the enclosure or within its own two-tolerance estimate of it (T13) |
| 4c | Predicted-case numbers | admitted | reference table in 8.5 |
| 4d | Withheld cases against the blind Section 10 values | admitted | differences in 8.5 |
| 4e | WB-7 supremum treatment | admitted with correction | sampled maxima are correctly below the supremum; the report's "supremum" column holds run maxima, and the WB-7 value is member 2's |
| 4f | Stepped-over contact at `rtol` $10^{-10}$ | admitted with correction | the steps do shrink near contact; the catch is tolerance-dependent |
| 4g | WB-8 stop by step underflow before the determinant threshold | admitted | stop time plus the level tail lies inside the enclosure (T1) |
| 4h | WC-3 extrapolated contact time | admitted with correction | the quadratic extrapolation overshoots $2\pi$ by $1.7\times10^{-10}$; the Kepler tail gives $2\pi$ to $7\times10^{-14}$ (T4) |
| 4i | Report-to-summary transcription of the WB-4 period | admitted with correction | report $29.005825604845$, machine summary $29.005825604848408$ |
| 4j | "GO" at the preregistered level | supported | 8.5(h) |
| 5 | Claims unsupported by the reference, or contradicting it | none substantive | 8.6 |
| 6 | Five re-examination points | each resolved; two produce reference addenda (12.1, 12.2) | 8.7 |

### 8.2 Item 1: Sections 2–5 of the subject

The subject's six-unknown system is the system of Section 2.2 written with $\alpha=\sigma K\mu_{\mathrm W}/(c_f^2r)$ and the stacked direction $\mathbf u$; its determinant $1-2\alpha$ is the singular coefficient $D$, and its Sherman–Morrison inverse is the inverse quoted there. The subject's geometric reason for radiality (the matrix is the identity on the orthogonal complement of $\mathbf u$, where the right side has no component) is correct and is the same fact that makes the reference's inverse map $\mathbf u$ to a multiple of itself. The invertibility table and the singular-case discussion agree with Sections 2.2 and 2.9: at $D=0$ the system is solvable only when the known bracket vanishes, and on the radial level that is the case $e=0$, i.e. $C=2c_f^2$, where the reference also reports an indeterminate acceleration.

The Lagrangian claim was checked by repeating the Euler–Lagrange computation (4.3). With $\partial\dot r/\partial\mathbf V_1=\mathbf e$ and $\partial\dot r/\partial\mathbf X_1=\mathbf w_\perp/r$, the two $\Phi_{\dot r}\dot{\mathbf e}$ terms cancel and $\mathbf A_1=[\Phi_{\dot r\dot r}\ddot r+\Phi_{\dot rr}\dot r-\Phi_r]\mathbf e$; matching the $\ddot r$ coefficient forces $\Phi_{\dot r\dot r}=\sigma K\mu_{\mathrm W}/(c_f^2r)$, after which the remaining terms are $-\sigma K\mu_{\mathrm W}\dot r^2/(2c_f^2r^2)-\phi'$, and matching them to the law forces $\phi=\sigma K/r$ and $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$. The uniqueness statement (4.4) is therefore correct within its stated class, and the subject correctly says that the class (unit weights, dependence on $r$ and $\dot r$ only) is a restriction. The reference's $\mathcal L_2$ of Section 2.4 is the subject's $L$ for two members. The energy function (4.6) equals $C/4+\|\mathbf V_c\|^2$ with $C$ from Section 2.4; on WB-7 this gives $-0.124965625+0.00278125=-0.122184375$, which is the instrument's recorded $H_0$ to every digit. The subject's $\varepsilon$ is $C/2$ throughout.

The $N$-member matrix (4.7) is what one obtains by stacking the pair rows; the Gram entries in (4.8) were rederived (block $i$ of $\mathbf u_{ij}$ against block $i$ of $\mathbf u_{il}$ gives $\mathbf e_{ij}\cdot\mathbf e_{il}$; block $j$ of $\mathbf u_{ij}$, which is $-\mathbf e_{ij}$, against block $j$ of $\mathbf u_{jl}$ gives $-\mathbf e_{ij}\cdot\mathbf e_{jl}$). Check T8 assembled the $12\times12$ matrix from (4.7) and the $6\times6$ matrix $I_P-DG$ from (4.8) at fifty random four-member states with random polarities and found the determinants equal to $3.4\times10^{-15}$ relative; the known cases K6a–c confirm that the same code reproduces the pair determinant $1-2\sigma\mu_{\mathrm W}/r$ by both routes. The three invertibility criteria follow from $M_N\succeq I-\sum_{\alpha_{ij}>0}\alpha_{ij}\mathbf u_{ij}\mathbf u_{ij}^{\mathsf T}$ and the trace bound; for an alternating square with side $s$ the two like pairs are the diagonals, and T8b finds $\det M_{12}=-5.04$ at diagonal $1.697$, $3\times10^{-15}$ at diagonal $2$, and $1.81$ at diagonal $2.263$, consistent with criterion 3's threshold at the pair critical radius. That is a statement about the matrix at one geometry; it is not a ring result and the ring lane owns the question. The general first integral (4.9) has the integrating factor $\lvert1-a/r\rvert^{-2\lambda_{\mathrm W}/\mu_{\mathrm W}}$, which is the reference's $D^{p}$ with $p=-2\lambda_{\mathrm W}/\mu_{\mathrm W}$ up to the absolute value; the subject's addendum is right that the absolute value is needed where $\Delta<0$ and that the constant is chart-specific, and the same caveat applies to Section 2.4 (Section 12.1). The radial invariant (5.6) was verified directly: $\frac{d}{dr}\big[(1+\lambda_{\mathrm W}u)\lvert D\rvert^{p}\big]=\lvert D\rvert^{p-1}(1+\lambda_{\mathrm W}u)\,G(2\lambda_{\mathrm W}+p\mu_{\mathrm W})/r^2=0$ with $u=\dot r^2$ and $b=\mu_{\mathrm W}G$. Claim grade for this item: derived (hand rederivation) with measured spot checks (T8).

### 8.3 Item 2: Sections 6–9 of the subject

**Control and circles.** Section 6's closed forms are those of Section 2.10 with $k=2K$; the like-polarity time from rest, $\sqrt{r_0/(2k)}[\sqrt{r(r-r_0)}+r_0\ln((\sqrt r+\sqrt{r-r_0})/\sqrt{r_0})]$, gives $9.182348$ for $x_0=4$ to $x=8$, the Section 5(iii) control value. Section 7.1 is Section 2.6; Section 7.2's $\omega_r^2=\Omega^2/(1+\mu_{\mathrm W}k/(c_f^2r_0))$ is Section 2.7's $2K/(r_0^2(r_0+2K\mu_{\mathrm W}/c_f^2))$; the Lyapunov argument for the reduced motion (positive radial weight, strict minimum of the effective potential) is sound and is stronger than the reference's linear statement.

**Full spectrum (7.3 as corrected).** The reference did not compute a twelve-state spectrum; its Section 2.7 is explicitly confined to the reduced radial direction. The addendum's frame-labelled table was checked by reasoning. In the frame rotating at $\Omega$, the in-plane centre coordinates obey (A.1), whose general solution is $e^{-i\Omega T}(c_0+c_1T)$ in complex form, so the four-state real block has eigenvalues $\pm i\Omega$ each of algebraic multiplicity two and geometric multiplicity one; the out-of-plane centre coordinate keeps a zero eigenvalue with a size-two block; the relative tilt satisfies $\delta\ddot z=-\Omega^2\delta z$ because the radial law linearized about the circle gives $\ddot z=(G/r_0^3)z=-\Omega^2z$; the phase-and-family direction is a zero eigenvalue with a size-two block; the radial direction is $\pm i\omega_r$. The characteristic polynomial $s^4(s^2+\Omega^2)^3(s^2+\omega_r^2)$ and the multiplicities $4,3,3,1,1$ follow. The subject's numerical confirmation (its check T1) was not reproduced here; the verdict rests on the derivation. No eigenvalue has positive real part, and the reference's own neutral-radial statement is a special case.

**Theorem 7.4.** The bound class $\{h>0,\varepsilon<0\}$ is Section 2.8's $\{h>0,C<0\}$; the subject's lower bound $-k^2/(2h^2)\le\varepsilon$ is automatic on every level with $h>0$ (it is $G^2+Ch^2\ge0$ in the reference's notation, with equality on the circle), so the two class descriptions coincide. The addendum's corrected dispersal proof is correct: on $\varepsilon\ge0$ the turning radius lies on the decreasing branch of $V_{\mathrm{eff}}$, $\dot r^2>0$ beyond it, $r$ is monotone after at most one minimum, and a finite limit would contradict $\dot r\to\sqrt{2(\varepsilon-V_{\mathrm{eff}}(r_\infty))/\Delta}>0$. Section 2.8 of the reference did not state the fate of $h>0$ levels with $C\ge0$ at all, and its same-polarity remark "the motion is unbounded" for $C>0$ used the lower bound $\dot r^2\to C>0$, which is valid there but would fail at $C=0$; both are recorded in Section 12.2. The collision class is A1–A3 of Section 11.2.

**Section 7.5 and the supremum.** Under $\psi\leftrightarrow\phi$, $A=m$, $Ae=w$ and $\kappa=-b$, (7.4)–(7.5) are the integrals of Section 2.8 (the subject integrates over $[0,2\pi]$ once with prefactor $1/\sqrt{2\lvert\varepsilon\rvert}=1/\sqrt{\lvert C\rvert}$; the reference integrates over $[0,\pi]$ with prefactor $2/\sqrt{\lvert C\rvert}$). The addendum's item 6 is right: $q(u)=2k-2\kappa\varepsilon+3\kappa h^2u^2+2\kappa^2h^2u^3$ has $q'(u)=6\kappa h^2u(1+\kappa u)>0$, so $q$ changes sign at most once, the only interior critical point of $\|\mathbf w\|^2$ is a minimum, and the pericentre value exceeds $2\varepsilon$. The reference's Section 2.8 proved the pericentre supremum only for $C<2$, which covers every bound level and WB-7; the subject's extension to all dispersal levels is admitted.

**Theorem 8.1 with the complete table.** At $h=0$ the addendum's table is B1–B11 of Section 11.2 row for row: exterior approaching with $\varepsilon>c_f^2$ is B1, the threshold level is B2 and B10, exterior turning is B3, the receding exterior branches are B5–B7, interior approaching is B8, interior receding with $\varepsilon>c_f^2$ is B9 and with $\varepsilon<c_f^2$ is B11. For $h>0$ the threshold $V_{\mathrm{eff}}(\kappa)=c_f^2+h^2/(2\kappa^2)$ is $C=2+h^2/\kappa^2$ in the reference's variables, the interior contact rate follows from $\dot r^2=2(\varepsilon-V_{\mathrm{eff}})/\Delta$ with $\Delta\approx-\kappa/r$ and $\varepsilon-V_{\mathrm{eff}}\approx-h^2/(2r^2)$, and the Jacobian of the desingularized field at the indeterminate point is lower triangular with diagonal $(\kappa^2\dot r_*,-2K\kappa\dot r_*/c_f^2)=(\kappa^2\dot r_*,-\kappa^2\dot r_*)$ whatever $\partial N/\partial r$ is, so the saddle and its eigenvalues stand. The subject grades the choice of the level continuation as a formulation decision; the reference agrees and selects no continuation.

**Section 9 as corrected.** The corrected radial row is the member-speed reading of A1–A7: supremum $c_f/\sqrt2$ for $\varepsilon\le c_f^2$ (approached at contact), $\sqrt{\varepsilon/2}$ for $\varepsilon>c_f^2$ (approached at infinity), strict pointwise for $\varepsilon\le2c_f^2$ with zero margin at $\varepsilon=2c_f^2$, equality at $r_\times=k/(\varepsilon-2c_f^2)$ for $\varepsilon>2c_f^2$. The bound-row condition $h>k/(2c_f)$, $\varepsilon<2c_f^2-2c_fk/h$ follows from $h/(2r_p)<c_f$. The drift formula (A.4) is the per-instant form of the Section 10.1 supremum: $\mathbf V_c\cdot\mathbf w\le p\|\mathbf w\|$ with equality in the plane, and the supremum over phase is attained at the aligned pericentre. Claim grade for this item: derived.

### 8.4 Item 3: the collinear document

The shifted form (2.4) was checked against the level formulas of Section 11.2. For $\sigma=-1$, $\dot r^2=(Cr+4)/(r+2)=C+(4-2C)/s$ with $s=r+2$, so $G_-=2-2\varepsilon\cdot1=k(1-\varepsilon/c_f^2)$; for $\sigma=+1$, $\dot r^2=(Cr-4)/(r-2)=C+(2C-4)/s$ with $s=r-2$, so $G_+=k(\varepsilon/c_f^2-1)$; and $\ddot r=\sigma(2-C)/s^2=-G_\sigma/s^2$ in both cases, which is (2.5). The contact acceleration (2.6), $-\sigma c_f^2(\varepsilon-c_f^2)/k$, is $-(2-C)/4$ for $\sigma=-1$, the value of Section 11.1. The equality radius (2.7) is $4/(4-C)$. The Section 3 table is A1–A7 and the Section 4 tables are B1–B11; the collinear document already listed the receding exterior branches that the planar Theorem 8.1 omitted, as its addendum says. The arrival law (4.1) was tested where it matters: at the WB-8 stop state the leading-order expression $\tfrac23(\tfrac92\lvert G_+\rvert)^{1/3}(T_*-T)^{-1/3}$ with $\lvert G_+\rvert=C-2=0.42$ and $T_*-T=3.58\times10^{-11}$ gives $2500.005$ against the recorded relative speed $2500.0046$ (T12, $2.4\times10^{-7}$ relative; the exact level value is $2500.0055$, T2). The contact-time closed form (3.1) agrees with the reference's angle-variable form at $x_0=4$ and $x_0=2.5$ to $10^{-15}$ (T11; the identity behind it is $\pi-\arccos\tfrac13=2\arctan\sqrt2$). The Section 7 predictions were recomputed: time from rest at $x=4$ to $x=2$ is $6.521305376768513$ with relative speed $1/\sqrt2$ there (T10); the supplementary probe from $x=4$ with $\dot r=-1.6$ has $C=2.28$, reaches $r_c$ at $1.1154191636304$ by the closed form and by quadrature (T9b, T9d), and crosses member speed $c_f$ at $4/(4-C)=2.3255813953488$ (T9c). The indeterminate level and the saddle are as in item 2h. The collinear addendum items 5a–5c (sign of the separated constant on the interior chart, the two exclusions at $r=0$, the chart-specific constant) are correct; the reference's wording at contact in Section 2.9 ("because the self pair $r=0$ lies outside the law") has the same conflation and is corrected in Section 12.3. Claim grade: derived, with measured checks T9–T12.

### 8.5 Item 4: the target-run report

**(a) As preregistered.** The fifteen cases, their preparations, the integrator settings (`rtol` $10^{-12}$, `atol` $10^{-14}$, `hmax` at most one fiftieth of the shortest expected period, exact condition number), the events and thresholds, the refinement rerun at $10^{-10}$, and the tolerances are those of the preregistration; the WB-7 case file sets `hmax` $=0.7109=T_{\mathrm{orb}}/50$. The predicted cases were compared against the preregistration's printed values with the preregistered tolerances and no tolerance was widened. The withheld cases were written to disk at 13:01:06Z (machine summary) and 13:03:02Z (blind reference) and compared by the PI at 13:58Z; neither side was rerun. The probe runs (reading a state at a located event time; using the escape radius as a measuring stop) change no preparation or tolerance and are a legitimate way to read quantities the event records do not carry. One procedural note: the report's "supremum of individual speed" column, which the preregistration asks every case to report, is filled with sampled run maxima (item (e)).

**(b) Integration-error estimates.** The two-tolerance difference is a heuristic, and the report says so. It can be tested against the certified enclosures, which are independent of the instrument. Check T13 places each measured value against its enclosure: WB-4's mean radial period $29.005825604848408$ lies $4.3\times10^{-12}$ above the enclosure $[29.005825604843427,\,29.0058256048441]$ against the report's estimate $2.9\times10^{-10}$; WB-5's $23.804646541153055$ lies $2.0\times10^{-12}$ below $[23.804646541155037,\,23.804646541155712]$ against the estimate $9.7\times10^{-11}$; WB-11's period lies $7.3\times10^{-12}$ above its enclosure against $1.9\times10^{-11}$; every other offset is at most $3\times10^{-14}$ or zero. In every case the measured value lies inside its enclosure or within its own estimate of it, and where the estimate can be checked it is conservative by one to two orders of magnitude. The estimates are credible. Claim grade: measured (T13), with the enclosures certified.

**(c) Predicted cases against the reference's own table.** Certified enclosures from Sections 5 and 10; measured values from the machine summary; "offset" is the signed distance outside the enclosure, $0$ when inside.

| Case and quantity | Certified enclosure | Measured | Offset |
| --- | --- | --- | --- |
| WB-1/2/3 circles: member speeds $\sqrt{1/(2x)}$, periods | 5(i) | radii constant to $2.5\times10^{-13}$; ten and five turns | consistent |
| WB-4 pericentre, apocentre | $[1.88235294117645,\,1.88235294117649]$, $4$ | $1.8823529411765227$, $4.000000000000181$ | $3\times10^{-14}$, $2\times10^{-13}$ |
| WB-4 radial period | $[29.005825604843427,\,29.0058256048441]$ | $29.005825604848408$ | $+4.3\times10^{-12}$ |
| WB-4 apsidal angle | $[4.18630700263561,\,4.1863070026358375]$ | $4.186307002635596$ | $-1.4\times10^{-14}$ |
| WB-4 maximum member speed | $[0.6010407640085592,\,0.6010407640085712]$ | $0.6010407640085623$ | $0$ |
| WB-11 period, apsidal angle | $[22.410239348468902,\,22.410239348469474]$, $\pi$ | $22.410239348476807$, $3.1415926535896714$ | $+7.3\times10^{-12}$, $-3\times10^{-14}$ |
| WB-8 speed-equality radius, time | $[2.53164556962024,\,2.5316455696202693]$, $[3.2838138418328335,\,3.283813841833143]$ | $2.531645569620068$, $3.2838138418331257$ | $-1.7\times10^{-13}$, $0$ |
| WB-8 time to $x=2$ | $[3.491175959603409,\,3.491175959603661]$ | stop $3.4911759595677783$ at $x=2+1.344\times10^{-7}$; plus the level tail $3.584\times10^{-11}$: $3.491175959603618$ | $0$ (inside) |
| WB-9 turning radius, time | $[2.531645569620249,\,2.531645569620258]$, $[5.3529580012447004,\,5.352958001244969]$ | $2.5316455696202698$, $5.352958001244807$ | $+1.2\times10^{-14}$, $0$ |
| WB-9 asymptotic relative speed | $[1.2569805089976525,\,1.2569805089976545]$ | $1.2569805089976465$ (from $H$) | $-6\times10^{-15}$ |
| WB-10 turning radius | root of $Cr^2-4r-h^2$, $C=4H_0=1.71\overline6$: $2.966358275503731$ (T5b) | $2.966358275503735$ | $4\times10^{-15}$ |
| WC-1 contact time | $[8.560326833493185,\,8.560326833493303]$ | event $8.560326126386325$ at $r=10^{-6}$ plus the level tail $7.071069\times10^{-7}$: $8.560326833493239$ | $0$; the report's extrapolation $8.560326833493372$ is $7\times10^{-14}$ above the enclosure |
| WC-1 contact speed, acceleration | $\sqrt2$; $\lim\ddot r=-3/4$ | $1.4142135623729293$ (extrapolated); $-0.7499988$ at $r=10^{-6}$ | $1.2\times10^{-13}$; the finite-radius offset $(2-C)[1/(r+2)^2-1/4]$ is $-1.6\times10^{-6}$ relative, as the report says |
| WC-2 time to $x=8$ | $[7.1914111551274384,\,7.191411155127629]$ | $7.191411155127552$ | $0$ |
| WC-3 contact time | $2\pi$ | event $6.283185306846325$ plus the Kepler tail $3.3333\times10^{-10}$: $6.283185307179658$ | $7\times10^{-14}$; see (h) |

**(d) Withheld cases against the blind Section 10 values.** WB-5: first pericentre $2.042016806722691$ inside $[2.0420168067226627,\,2.0420168067227156]$ (exact $243/119$); radial period $23.804646541153055$ against $[23.804646541155037,\,23.804646541155712]$, $2.0\times10^{-12}$ below (relative $8\times10^{-14}$; the report's own estimate is $9.7\times10^{-11}$); apsidal angle $4.239830417084846$ inside $[4.239830417084668,\,4.239830417084943]$; maximum member speed $0.5397949618355531$ inside $[0.5397949618355449,\,0.5397949618355595]$; $H_0=-0.198\overline3=C/4$ exactly. WB-6: the contact event at $r=10^{-6}$, $t=4.759920496914469$, plus the level tail $7.071069\times10^{-7}$ gives $4.759921204021409$, inside $[4.759921204021379,\,4.759921204021448]$ (T3); the recorded relative speed at the stop, $1.4142129259781$, equals the level value $\sqrt{(4-1.6\times10^{-6})/(2+10^{-6})}$ to the printed digits, and the extrapolated contact speed $1.4142135624$ is $\sqrt2$; the instrument's $\ddot r=-0.8999977$ at the stop against the contact limit $-9/10$ of Section 10.4. WB-12: period $17.78387145387988$ inside $[17.783871453879566,\,17.783871453880128]$; apsidal angle $3.1415926535897567$ inside $[3.141592653589685,\,3.1415926535899006]$; pericentre $2\times10^{-14}$ above its enclosure. WB-7: the recorded preparation is $\mathbf X_1=(2,0,0)$, $\mathbf V_1=(0.055,\sqrt{1/8},0.01)$, $\mathbf X_2=(-2,0,0)$, $\mathbf V_2=(0.05,-\sqrt{1/8},0)$, which is exactly the Section 10.5 assumption under reading A ($\mathbf V_c=(0.0525,0,0.005)$), so the inferred-grade caveat of Section 10.6 is discharged; pericentre $3.9664370546605823$, apocentre $4.035763550505911$, radial period $43.547128791553206$ and apsidal angle $3.847519254156188$ all lie inside their enclosures; the plane normal $(0,-0.0141407,0.9999000)$ and $h\in[2.82870995331790,\,2.82870995331877]$ match; $H_0=-0.122184375=C/4+\|\mathbf V_c\|^2$ exactly; the sampled maxima $0.40906365$ (member 1) and $0.40909085$ (member 2) lie $4.8\times10^{-5}$ and $2.0\times10^{-5}$ below the certified supremum $0.4091113156$, as required. Claim grade: measured and blind-matched on these four preparations.

**(e) WB-7 supremum treatment.** Correct in substance: a sampled run maximum is a lower bound on the supremum over phase, and the run maximum lies below the certified supremum, which is the consistency condition stated in Section 10.5. Two corrections to the report's wording. First, the value $0.4090908$ that the report attributes to member 1 is the machine summary's index-1 entry, which by the report's own convention is member 2; member 1's sampled maximum is $0.4090637$. Second, the "supremum individual speed" column of the report's Section 3 holds sampled run maxima for every case, which for the dispersal cases are not suprema: WB-9's supremum is $\sqrt C/2=0.6284902545$ (approached at infinity; the run maximum $0.6229$ is the value at $t=30$), and WB-10's is $\sqrt C/2=0.6551081336$ with $C=1.71\overline6$ (T5d; the relative speed is increasing in $r$ on this level because $2\kappa(\varepsilon-1)-3\kappa h^2u^2+2\kappa^2h^2u^3<0$ for $u\le1/r_p$), against the run maximum $0.6519$. No label changes: all three remain strict. The PI's comparison table in the subject derivation says the WB-7 sample lies "$5\times10^{-5}$ below" the supremum; the shortfall is $2.0\times10^{-5}$ for the value quoted.

**(f) Stepped-over contact at `rtol` $10^{-10}$.** The report's reading, that the event locator assumes one sign change per step and that the frozen law's finite contact speed does not force the step to shrink, is correct in its first part and incomplete in its second. The trajectory of the `rtol` $10^{-12}$ run shows the accepted steps shrinking geometrically on the approach to contact, from $0.05$ at $r=0.08$ to $6.3\times10^{-5}$ at $r=7.7\times10^{-6}$ over nine accepted steps, which is why that run bracketed the window $r<10^{-6}$ and located the event. The step controller shrinks because the bracket $1-\dot r^2/(2c_f^2)$ nearly cancels near contact (it equals $(2-C)r/(2(r+2))$ on the level) and is divided by $r(r+2)$, so a level error $\delta$ in $\dot r^2$ produces a relative error of order $\delta/r$ in the acceleration; this is also the mechanism behind the $10^{-6}$ drift of $H$ in the last steps, which the report attributes correctly to the $1/r$ terms. At `rtol` $10^{-10}$ the same mechanism shrinks the steps less, and one step cleared the window. The corrected characterisation is therefore: the contact event as designed ($r<10^{-6}$ at a step end) is caught only when the tolerance-driven step shrinkage happens to resolve a window of width $\sqrt2\times10^{-6}$ in time, so a catch at one tolerance does not establish that the event design is robust; the report's conclusion that nothing beyond the pass-through is a history of the law stands, and its falsifier is well posed. The located pass-through time of the coarser run agrees with the finer run's contact time to $4\times10^{-13}$, which is consistent with the enclosure.

**(g) WB-8 stop and the time to $x=2$.** The characterisation is correct: the speed diverges as $(T_*-T)^{-1/3}$, the field's stiffness outruns the controller, and the run stops at $x=2+1.344\times10^{-7}$ with $\det M=6.7\times10^{-8}$, above the $10^{-8}$ threshold, so no obstruction event fires. The report compares the stop time with the predicted time of reaching $x=2$ and finds agreement to $1.2\times10^{-10}$; the sharper statement is that the stop time plus the remaining time along the level, $\int_2^{r_{\mathrm{stop}}}dr/\lvert\dot r\rvert=3.584\times10^{-11}$ by the closed form of Section 2.9, is $3.491175959603618$, inside the certified enclosure $[3.491175959603409,\,3.491175959603661]$ (T1). The coarser `rtol` $10^{-10}$ run stops at $3.4911759596101826$ with $x=2+2.06\times10^{-8}$; its tail is $2.15\times10^{-12}$ and its implied arrival time lies $8.7\times10^{-12}$ above the enclosure, inside the report's termination-time difference of $4.2\times10^{-11}$. The recorded relative speed at the stop, $2500.0046$, equals the level value $\sqrt{(Cr-4)/(r-2)}$ at the stop radius to $4\times10^{-7}$ relative (T2), so the state at the stop, although uncertified by the instrument, lies on the level to that accuracy. Nothing here establishes a continuation; the reference defines none.

**(h) WC-3 extrapolation.** The report extrapolates the control's contact time from the stop state at $r=10^{-6}$ with the measured $\dot r$ and $\ddot r$ and obtains $6.283185307346325$, which it compares with $2\pi$ (relative difference $2.7\times10^{-11}$, inside the $10^{-8}$ tolerance). For a contact with divergent speed that extrapolation is biased: the remaining time is $\int_0^{10^{-6}}dr/\sqrt{4(1/r-1/4)}=3.333\times10^{-10}$, and the event time plus that tail is $6.283185307179658$, equal to $2\pi$ to $7\times10^{-14}$ (T4). The verdict does not change; the method note is that a quadratic extrapolation is adequate for the frozen law's finite-speed contact and not for the control's.

**(i) GO decision.** The preregistered rule makes the binary target GO if the derived bound class $\{h>0,\varepsilon<0\}$ survives adjudication and WB-1, WB-2, WB-4, WB-5 and WB-7 remain regular and bounded with invariant drift inside tolerance. The class theorem survives: it is Section 2.8 of this reference, derived independently and agreeing with the subject in statement and boundary, and its one gap (the subject's original $\varepsilon=0$ argument) concerned the dispersal class and has been repaired. The five runs are regular (smallest $\lvert\det M\rvert$ at least $1.4956$, largest condition number $2.75$), bounded (separations inside $[r_-,r_+]$ to $10^{-12}$), and their invariant drifts are at most $5.9\times10^{-13}$ against the $10^{-9}$ tolerance. The GO is supported at the preregistered level. What it means is bounded by the preregistration: it is a statement about an isolated pair under this instantaneous adapted law, with finite numerical survival for five to twenty periods and persistence for all time derived from the invariants, not measured; it says nothing about the delayed canonical Master Equation, about binding in nature, or about systems of more than two members, and the ring question remains with its own lane and its own rule.

### 8.6 Item 5: claims and contradictions in either direction

**Subject claims not supported by the reference.** None that survive the subject's own addendum. The original Section 7.3 table (frame mixing), the original Section 9 radial row (undefined for $\varepsilon<0$, boundary level omitted), the original Theorem 8.1 class list (receding exterior branches omitted) and the original Section 4.4 sentence ($I=\Delta$) were all defective as the subject's addendum says, and the reference's Sections 2.7, 11.2 and 2.4 did not share the first three; the fourth it shared (Section 12.1). Two statements in the target-run report are corrected above without changing a verdict: the "supremum" column (8.5(e)) and the WC-3 extrapolation (8.5(h)); one transcription differs between the report and the machine summary (WB-4 period $29.005825604845$ against $29.005825604848408$; the apocentre-to-apocentre and pericentre-to-pericentre means are $29.005825604848344$ and $29.005825604848457$, so the report's digits are not either sub-mean), and the report's own falsifier names such a difference, so it is recorded here; it changes nothing at the preregistered tolerance.

**Reference statements the subject contradicts.** None. The only tension found is one of completeness in the reference: Section 7's fourth claim compressed the same-polarity branches and Section 2.9 compressed the inside-$r_c$ remark, both already corrected in Section 11.2 and both noted by the subject's addendum as "overcompressed in the reference's summary"; Section 2.4's integrating factor lacks the absolute value on the interior chart (Section 12.1); Section 2.8 does not state the $h>0$, $C\ge0$ fate (Section 12.2); Section 2.9's contact sentence conflates the two exclusions at $r=0$ (Section 12.3). Where the reference was wrong in a labelled number, it was in Sections 11.1 and 11.2, already superseded before this adjudication; no further labelled number was found wrong.

### 8.7 Item 6: the five re-examination points

1. **Frame label of the spectrum.** The reference reports no twelve-state spectrum; Section 2.7 states a reduced radial frequency at fixed $h$ in the plane, which is frame-independent (it is a Floquet exponent of the inertial-frame periodic system and an eigenvalue of the rotating-frame autonomous one). No correction. The subject's multiplicities $4,3,3,1,1$ were verified by reasoning in 8.3 and are adopted as the statement to compare any future numerical spectrum against.
2. **Dispersal proof at $\varepsilon=0$.** Section 2.8 does not treat $\sigma=-1$, $h>0$, $C\ge0$; its $\sigma=+1$ "unbounded" sentence for $C>0$ is valid because $\dot r^2\to C>0$ there. Correction recorded as Section 12.2: the $\sigma=-1$, $h>0$, $C\ge0$ levels disperse, with $\dot r^2\to C$, by the monotonicity argument; at $C=0$ the escape is $r\simeq(9k/2)^{1/3}T^{2/3}$ (checked: $\dot r^2\approx2k/r$ integrates to that).
3. **Speed statements at $\varepsilon=2c_f^2$, for $\varepsilon<0$, under drift.** Section 11.2 states the radial branches in terms of relative speed, with the member-speed crossing in B1 for $2<C<4$ and "above $c_f$ throughout" for $C\ge4$; it never uses an expression undefined for $C<0$; A7 covers $C>2$ (the member speed reaches $c_f$ only when $C>4$, i.e. $\varepsilon>2c_f^2$), and at $C=4$ the member speed tends to $c_f$ from below without attaining it, which is the subject's zero-margin level. Under drift, Section 10.1 gives the exact supremum over phase, and the subject's (A.4) is its per-instant form. No correction; one clarification is folded into Section 12.2 for the level $C=4$.
4. **Like-polarity exterior receding branches.** Present in Section 11.2 as B5–B7, including $C\ge2+h^2/\kappa^2$ at $h=0$; the $h>0$ generalisation of the threshold is stated in 8.3. No further correction.
5. **Sign of the separated constant on the interior chart.** Section 2.4 writes the integrating factor as $D^{p}$; for $p=1$ this is the signed form, whose first integral $C$ is single-valued across charts, and nothing in Sections 2.5–2.9 or 10–11 uses a power other than $p=1$. For general $p$ the factor must be $\lvert D\rvert^{p}$ on an interval where $D<0$, and the constant is chart-specific, as the subject says. Correction recorded as Section 12.1.

### 8.8 What is now established, and at which grade

**Derived and independently confirmed** (two separately authored derivations, polar-and-integrating-factor against Cartesian-and-Lagrangian, agreeing in statement and boundary): the pair acceleration solve is a rank-one perturbation of the identity with determinant $1-2\sigma K\mu_{\mathrm W}/(c_f^2r)$, regular at every separation for opposite polarity and singular exactly at $x=2$ for same polarity; the frozen law is the Euler–Lagrange system of a unit-weight pair function exactly on $\lambda_{\mathrm W}=-\mu_{\mathrm W}/2$, with the first integral $C$ (the subject's $2\varepsilon$) and shared turning radii with the inverse-square control; circles exist at every radius with inverse-square rates and are neutrally stable in the reduced radial direction with apsidal angle $\pi\sqrt{1+2/x}$, and the full linearization has no growing direction; every opposite-polarity level with $h>0$ and $C<0$ is radially periodic and never reaches contact (the bound class), every opposite-polarity level with $h>0$ and $C\ge0$ disperses, and every radial opposite-polarity approach reaches contact at relative speed $\sqrt2c_f$ with finite acceleration $-(2-C)/4$; same polarity has no bound history, reaches $x=2$ in finite time with divergent speed when $C>2+h^2/\kappa^2$ on approach from outside, turns at the root of $Cr^2-4r-h^2$ when below that level, and is indeterminate on it; the frozen collinear motion is an inverse-square motion in the shifted separation. **Measured and blind-matched** (certified enclosures against a separately authored Cartesian integrator, with the withheld preparations unseen by either side): WB-5, WB-6, WB-12 and WB-7 as listed in 8.5(d), and every predicted case in 8.5(c), with each measured value inside its enclosure or within the instrument's own error estimate of it. **Measured** (subject instrument only, not enclosed): finite numerical survival of the circles for ten periods and of the perturbed circle for twenty, with drifts below $10^{-12}$; the WB-8 stop state lying on its level to $4\times10^{-7}$. **Inferred:** that the level continuation through the indeterminate same-polarity point is the one a formulation would select (no continuation is selected by either lane); that bound-orbit timing and apsidal advance, rather than binding itself, discriminate this law from the control. **Open:** invertibility and balance of any configuration with more than two members, including the alternating ring (the Gram test (4.8) is the exact tool, and T8b shows the matrix of the alternating square passing through zero at diagonal $2$); the behaviour of the bound class under perturbation by a third member; any statement about the delayed canonical Master Equation, which this run does not touch.

**Falsifiers, operator-checkable.** (i) A rerun of `node weber-overnight-independent-adjudication-checks.mjs` printing a `FAIL` line or an `OUTSIDE` line other than `T1-refine`. (ii) A regular opposite-polarity history with $h>0$ and $C<0$ whose separation leaves $[r_-,r_+]$ of Section 2.5, found by any integrator that shares no code with either lane. (iii) A radial opposite-polarity contact at a relative speed other than $\sqrt2c_f$. (iv) A same-polarity approach with $C>2$ that turns outside $x=2$, or one with $C<2$ that reaches it. (v) A correct independent evaluation of any Section 5 or Section 10 quantity landing outside its enclosure. (vi) A wholly co-rotating Jacobian of the exact law at a circle whose minimal polynomial is not $s^2(s^2+\Omega^2)^2(s^2+\omega_r^2)$.

## 9. Reproduction

From the evidence directory, `node weber-overnight-independent-reference.mjs controls` regenerates the controls record, and `node weber-overnight-independent-reference.mjs benchmarks` regenerates the benchmark JSON under `.local-data/master-equation-closure/weber-overnight/review/`. Python is not used. The run takes under one second of compute on Node v22.23.2.

## 10. Blind reference values for the withheld cases (fixed 2026-10-05T13:03:02Z)

**Status.** Appended after Sections 1–9, which are unchanged. The values below were computed without opening any subject file of the continuation run (no `weber-overnight-investigation.md`, no collinear approach file, no `weber-overnight-pair-instrument*`, no `weber-overnight-target-runs*`, nothing under `.local-data/master-equation-closure/weber-overnight/binary/` or `collinear/`). The only subject-side document consulted was the "Cases" and "Tolerances" sections of the [preregistration](weber-overnight-preregistration.md#cases), for the case specifications of WB-5, WB-6, WB-7 and WB-12. Controls of the fixed instrument were rerun first at 2026-10-05T12:49:49Z and passed 24 of 24 (receipt: [weber-overnight-independent-reference-controls.json](../evidence/weber-overnight-independent-reference-controls.json)); the fixed source [weber-overnight-independent-reference.mjs](../evidence/weber-overnight-independent-reference.mjs) still hashes to `feeffd7e8986d6fa695dfc1a35777891ba7ef65728f3aeda5e9a1631440d23c3` and was not modified. The new routines live in [weber-overnight-independent-reference-withheld.mjs](../evidence/weber-overnight-independent-reference-withheld.mjs) (SHA-256 `fe08198a7410600db2b1d614fa26eea14f89fe14041490451ca17c00427c40a3`), which imports the fixed module. Its known cases (12 of 12) were recorded at 2026-10-05T13:03:01Z in `.local-data/master-equation-closure/weber-overnight/review/withheld-reference-known-cases.json`, in the same invocation and before the targets; the target record is `.local-data/master-equation-closure/weber-overnight/review/withheld-reference-v1.json` (UTC timestamp and both SHA-256 values inside). Claim boundary: this lane's reference only; nothing here is a statement about the subject.

Units throughout: $K=c_f=1$, lengths $K/c_f^2$, times $K/c_f^3$, speeds $c_f$; $\sigma=-1$, so $G=-2$, $b=-2$ and $D=1+2/r$. Each number marked "certified" is the first ten significant digits shared by both ends of an outward-rounded interval enclosure (Section 3.2 conditions (a) and (b)); each number marked "measured" is a floating second check and is not certified. "Apsidal angle" is pericentre to apocentre; the full apsidal angle per radial period is twice that; the advance per radial period is the full angle minus $2\pi$.

### 10.1 New routines and their derivations

**Time from rest to an interior radius (WB-6).** Section 2.9 gives, for release from rest at $r_0$ with $h=0$, the level $C=2G/r_0$ and the angle variable $r=m'-w'\cos\phi$ with $m'=(r_0+b)/2$, $w'=(r_0-b)/2$, in which $dt=(w'/\sqrt{|C|})(1-\cos\phi)\,d\phi$, so that $t(\phi)=(w'/\sqrt{|C|})(\phi-\sin\phi)$ measured from $\phi=0$. Release is at $\phi=\pi$ and contact at $\cos\phi_0=m'/w'$. The time from release down to any radius $r\in[0,r_0]$ is therefore

$$
t(r_0\to r)=\frac{w'}{\sqrt{|C|}}\Big[\pi-\big(\phi_r-\sin\phi_r\big)\Big],\qquad \cos\phi_r=\frac{m'-r}{w'},
$$

which reduces to the Section 2.9 contact formula at $r=0$. The routine `timeFromRestTo` evaluates this in interval arithmetic; where the enclosure of $\cos\phi_r$ straddles zero exactly (the Kepler known case N3) it uses $\arccos x=\pi/2-\arcsin x$ with the bound $|\arcsin x|\le|x|(1+x^2)$ for $|x|<1/2$, because the fixed `iacos` refuses a straddling argument. Known cases: at $r=0$, $x_0=4$ it reproduces the printed contact time $8.560326833$ and overlaps the fixed `radialFate` enclosure (N1); at $r=r_0$ it encloses $0$ (N2); on the zero-coefficient control from $x_0=4$ to $x=2$ it encloses the cycloid value $\pi+2$ (N3), and $\dot r^2$ there encloses $1$ (N3b). Claim grade: derived (formula), certified (evaluation).

**Cartesian state to relative invariants (WB-7).** For interval vectors $\mathbf X_{1,2},\mathbf V_{1,2}$, with $\mathbf R=\mathbf X_1-\mathbf X_2$ and $\mathbf w=\mathbf V_1-\mathbf V_2$: $r=\|\mathbf R\|$, $\dot r=\mathbf R\cdot\mathbf w/r$, $\mathbf h=\mathbf R\times\mathbf w$, $h=\|\mathbf h\|$, $C$ from Section 2.4, and $\mathbf V_c=(\mathbf V_1+\mathbf V_2)/2$, which is constant (Section 2.1). The relative motion stays in the plane normal to $\hat{\mathbf h}=\mathbf h/h$ (Section 2.3). The inclination to the original orbital plane (normal $\hat{\mathbf z}$) is $i$ with $\sin i=\|\hat{\mathbf h}\times\hat{\mathbf z}\|$, evaluated as $i=\pi/2-\arccos(\sin i)$, which is well conditioned for small $i$. Known cases: the unperturbed $x=4$ circle gives $h^2=8$, $C=-1/2$, $\dot r=0$, $D=3/2$, $i=0$, $\|\mathbf V_c\|=0$ (N4, N4b); WB-4 rebuilt as a Cartesian state reproduces $C=-17/25$, $r_-=32/17$, $r_+=4$ and the printed $29.00582560$, $4.186307003$, $0.6010407640$ (N5, N5b). Claim grade: derived, certified.

**Supremum of a member's absolute speed over orbital phase (WB-7).** Each member's velocity is $\mathbf V_{1,2}=\mathbf V_c\pm\mathbf w/2$, so

$$
\|\mathbf V_1\|^2=\|\mathbf V_c\|^2+\tfrac14\|\mathbf w\|^2+\mathbf V_c\cdot\mathbf w .
$$

Decompose $\mathbf V_c=\mathbf p+V_{c,n}\hat{\mathbf h}$ with $\mathbf p$ its projection onto the orbital plane, $p=\|\mathbf p\|=\|\mathbf V_c\times\hat{\mathbf h}\|$. Since $\mathbf w$ lies in the plane, $\mathbf V_c\cdot\mathbf w=\mathbf p\cdot\mathbf w\le p\|\mathbf w\|$, with equality exactly when $\mathbf w\parallel\mathbf p$. The right side $\|\mathbf V_c\|^2+\|\mathbf w\|^2/4+p\|\mathbf w\|$ increases with $\|\mathbf w\|$, and by the monotonicity theorem of Section 2.8 (valid since $C<2$) the relative speed $\|\mathbf w\|$ is largest at pericentre, $v_{\max}=h/r_-$. Hence, for either member,

$$
\sup_{\text{phase}}\|\mathbf V_{1,2}\|=\sqrt{\|\mathbf V_c\|^2+p\,v_{\max}+\tfrac14v_{\max}^2},\qquad v_{\max}=\frac{h}{r_-}.
$$

The supremum is attained at a pericentre whose tangent direction is parallel to $\mathbf p$ (for member 1) or antiparallel (for member 2). Successive pericentres advance by the full apsidal angle $2\Delta\theta$, so the pericentre tangent sweeps the plane; the supremum is approached arbitrarily closely over time and is attained exactly only if some pericentre aligns. It lies below the triangle-inequality bound $\|\mathbf V_c\|+v_{\max}/2$ unless $\mathbf V_c$ lies in the orbital plane, and the corresponding infimum is $\sqrt{\|\mathbf V_c\|^2-p\,v_{\min}+v_{\min}^2/4}$ with $v_{\min}=h/r_+$. Known cases: WB-4 with an in-plane drift $(0.1,0,0)$ gives $0.1+17\sqrt{128}/320$ and equals the triangle bound (N6); with an out-of-plane drift $(0,0,0.1)$ it gives $\sqrt{0.37125}$, strictly below the triangle bound (N6b). A floating scan of $\|\mathbf V_{1,2}\|$ along the fixed reduced-ODE evaluator (`odeMemberSpeedScan`, using the in-plane basis $\hat{\mathbf a}=\mathbf R(0)/r_0$, $\hat{\mathbf b}=\hat{\mathbf h}\times\hat{\mathbf a}$) reproduces the WB-4 maximum $0.6010407640$ from below within $1.2\times10^{-8}$ at step $2\times10^{-3}$, the expected one-sided sampling bias (N7). Claim grade: derived (formula), certified (evaluation), measured (scan).

**Instrument log (first-run failures, retained).** (1) At the release radius the enclosure of $\dot r^2$ straddled zero by rounding and `isqrt` refused it; $\dot r^2\ge0$ is known, so the enclosure is clamped at zero. (2) The Kepler known case lands exactly on $\cos\phi=0$, which the fixed `iacos` refuses; handled by the $\arcsin$ bound above. (3) An exactly zero sum of squares acquired a lower bound of $-5\times10^{-324}$ from outward rounding; sums of squares are clamped at zero. (4) The in-plane projection was first computed as $\sqrt{\|\mathbf V_c\|^2-V_{c,n}^2}$, which for an exactly normal drift inflated to width $10^{-9}$; it is now $\|\mathbf V_c\times\hat{\mathbf h}\|$. (5) N7's tolerance was set at $10^{-8}$ before the sampling bias was quantified; it is $10^{-7}$ with the bias direction recorded. Each was a defect of the new routines or their tests, not of a derived result.

### 10.2 WB-5: apocentre release at $x=3$, tangential relative speed $0.9$ of circular, $\sigma=-1$

The circular relative speed at $x=3$ is $\sqrt{2/3}$, so the tangential relative speed is $0.9\sqrt{2/3}$, $h=2.7\sqrt{2/3}$, $h^2=243/50$ exactly, and $C=h^2/9-4/3=-119/150$. The turning points are the roots of $Cr^2+4r-h^2$: exactly $243/119$ and $3$, with semi-axis $a=300/119$. Centre of velocity at rest; the two-member energy function (Section 2.4) is $C/4$.

| Quantity | Value | Status |
| --- | --- | --- |
| $h$ | 2.204540769 ($=\sqrt{243/50}$) | certified, width $9\times10^{-16}$ |
| $C$ | $-0.7933333333$ ($=-119/150$); $C/4=-0.1983333333$ | certified, width $3\times10^{-15}$ |
| pericentre $r_-$ | 2.042016807 ($=243/119$) | certified, width $5\times10^{-14}$ |
| apocentre $r_+$ | 3.000000000 | certified, width $5\times10^{-14}$ |
| radial period $T_r$ | 23.80464654 | certified, width $7\times10^{-13}$; $N=256$ agrees |
| apsidal angle (peri to apo) | 4.239830417 | certified, width $3\times10^{-13}$ |
| full apsidal angle per radial period | 8.479660834 | certified, width $6\times10^{-13}$ |
| advance per radial period | 2.196475527 | certified, width $6\times10^{-13}$ |
| relative speed at pericentre | 1.079589924 | certified, width $3\times10^{-14}$ |
| maximum individual speed (at pericentre) | 0.5397949618 | certified, width $1.5\times10^{-14}$ |
| five radial periods | 119.0232327 | certified, width $3\times10^{-12}$ |
| $D$ at release | 1.666666667 ($=5/3$) | certified |
| speed domains | all three | derived from the maximum above |

Measured second checks (reduced-ODE evaluator, RK4): at step $10^{-3}$, $T_r=23.80464654116$, apsidal angle $4.239830417085$, pericentre $2.04201680672$; at step $5\times10^{-4}$, $T_r=23.80464654115$, apsidal $4.239830417085$. Both agree with the enclosures to $10^{-11}$ or better. The trapezoid remainder bounds are below $10^{-99}$ at $N=128$ ($\rho=\cosh a=3.13$).

### 10.3 WB-12: zero-coefficient control of WB-5

Same $h$ and release. The turning points are identical to WB-5 (shared quadratic, Section 2.5). The apsidal angle is $\pi$ exactly and the radial period is the Kepler value $2\pi a^{3/2}/\sqrt{2}$ with $a=300/119$.

| Quantity | Value | Status |
| --- | --- | --- |
| turning points | 2.042016807, 3.000000000 | certified, identical enclosures to WB-5 |
| radial period | 17.78387145 | certified, width $6\times10^{-13}$; the closed form $2\pi a^{3/2}/\sqrt2$ gives an overlapping enclosure 17.78387145 |
| apsidal angle (peri to apo) | 3.141592654 ($\pi$) | certified, width $2\times10^{-13}$ |
| advance per radial period | 0 (enclosure $[-2.2\times10^{-13},2.2\times10^{-13}]$) | certified |
| maximum individual speed | 0.5397949618 | certified, identical to WB-5 |
| five radial periods | 88.91935727 | certified |

### 10.4 WB-6: radial release from rest at $x=2.5$, $\sigma=-1$

Here $C=2G/r_0=-8/5$, $D(r_0)=9/5$, $m'=1/4$, $w'=9/4$, $\cos\phi_0=1/9$, and at $x=1.25$, $\cos\phi_1=-4/9$. In closed form $t_{\mathrm{contact}}=\sqrt{5/8}\,\tfrac94\big(\pi-\arccos\tfrac19+\tfrac{4\sqrt5}{9}\big)$ and $t(x{=}1.25)=\sqrt{5/8}\,\tfrac94\big(\pi-\arccos(-\tfrac49)+\tfrac{\sqrt{65}}{9}\big)$. On this level $\ddot r=-(2-C)/(r+2)^2$ (Section 11.1 below), so the launch acceleration is $-(18/5)/(81/4)=-8/45$ and the contact limit is $-(2-C)/4=-9/10$.

| Quantity | Value | Status |
| --- | --- | --- |
| $C$ | $-1.600000000$ | certified |
| contact time | 4.759921204 | certified, width $7\times10^{-14}$; two routes (fixed `radialFate`, new `timeFromRestTo`) overlap |
| relative speed at contact | 1.414213562 ($\sqrt2$) | certified; derived exact value |
| individual speed at contact | 0.7071067812 | certified |
| time to reach $x=1.25$ | 3.568321773 | certified, width $6\times10^{-14}$ |
| $\dot r^2$ at $x=1.25$; relative speed | 0.6153846154 ($=8/13$); 0.7844645406 | certified |
| individual speed at $x=1.25$ | 0.3922322703 | certified |
| radial acceleration at launch | $-0.1777777778$ ($=-8/45$) | certified |
| radial acceleration limit at contact | $-0.9000000000$ | certified |
| speed domains | strict ceiling throughout | derived: $\dot r^2=(8/5)(r_0-r)/(r+2)$ increases monotonically to $2$ |

Measured second checks (reduced-ODE evaluator, step $10^{-4}$): time to $x=1.25$ is $3.5683217732087$ (enclosure $3.56832177320556$–$3.56832177320561$, difference $3\times10^{-12}$), $\dot r$ there $-0.78446454055274$; contact time with a quadratic tail from $r=10^{-3}$ is $4.7599212040767$ (difference $5.5\times10^{-11}$).

### 10.5 WB-7: reference statement for the perturbed, drifting circle

**Assumed preparation.** WB-1 is taken as $\mathbf X_1=(2,0,0)$, $\mathbf X_2=(-2,0,0)$, $\mathbf V_1=(0,\sqrt{1/8},0)$, $\mathbf V_2=-\mathbf V_1$ (centre of velocity at rest, relative speed $\sqrt{1/2}$, orbit in the $xy$-plane). Member 1's velocity is then kicked by $(0.005,0,0.01)$. The phrase "whole pair given centre velocity $(0.05,0,0)$" admits two readings, which differ only in $\mathbf V_c$ and therefore only in the absolute speeds: **reading A** adds $(0.05,0,0)$ to both members after the kick, giving $\mathbf V_c=(0.0525,0,0.005)$; **reading B** sets $\mathbf V_c=(0.05,0,0)$ exactly. Every relative-motion quantity below is common to both. If the subject's WB-1 orientation differs from the one assumed (for instance $\mathbf R$ along $y$), the kick's split into radial, tangential and normal parts changes and the relative invariants must be re-evaluated from the subject's actual initial state with `pairStateInvariants`; that is a mechanical re-evaluation with no new formula, and it must be done before comparison rather than after.

**Relative invariants and motion** (exact: $\dot r_0=+1/200$, $h^2=8+0.0016=5001/625$, $C=3/80000+5001/10000-1=-39989/80000$, $D(r_0)=3/2$; the inclination satisfies $\tan i=0.04/\sqrt8=\sqrt2/100$):

| Quantity | Value | Status |
| --- | --- | --- |
| $h$ | 2.828709953 | certified, width $10^{-14}$ |
| $C$; $C/4$ | $-0.4998625000$; $-0.1249656250$ | certified |
| pericentre $r_-$ | 3.966437055 | certified, width $6.5\times10^{-12}$ |
| apocentre $r_+$ | 4.035763551 | certified, width $6.5\times10^{-12}$ |
| radial period $T_r$ | 43.54712879 | certified, width $4\times10^{-11}$; $N=256$ agrees |
| apsidal angle (peri to apo) | 3.847519254 | certified, width $1.1\times10^{-11}$ |
| full apsidal angle per radial period | 7.695038508 | certified |
| advance per radial period | 1.411853201 | certified (the circular limit at $x=4$ is 1.412113674) |
| relative speed at pericentre; at apocentre | 0.7131614379; 0.7009107243 | certified, width $10^{-12}$ |
| inclination of the new relative-motion plane to the original plane | 0.01414119293 rad $=0.8102306720^\circ$ ($\sin i=0.01414072162$) | certified, width $3\times10^{-15}$ rad |
| orbit normal $\hat{\mathbf h}$ | $(0,\,-0.01414072162,\,0.9999000150)$: the plane is tilted about the $x$-axis | certified |
| WB-1 orbital period; 20 periods; radial periods in 20 orbital periods | 35.54306351; 710.8612701; 16.32395269 | certified |

Measured second check (reduced-ODE evaluator, step $10^{-3}$, start just past pericentre): apocentre at $t=11.1568$, $r=4.03576355051$; pericentre at $r=3.96643705466$; radial period $43.5471287915$ (within $1.3\times10^{-11}$ of the enclosure); apsidal angle apocentre to pericentre $3.84751925416$ (inside the enclosure).

**Centre velocity and absolute speeds.** The centre of velocity moves uniformly (Section 2.1).

| Quantity | Reading A ($\mathbf V_c=(0.0525,0,0.005)$) | Reading B ($\mathbf V_c=(0.05,0,0)$) | Status |
| --- | --- | --- | --- |
| centre speed $\|\mathbf V_c\|$ | 0.05273755777 | 0.05000000000 | certified |
| in-plane projection $p$; normal component | 0.05250004761; 0.004999500075 | 0.05000000000; 0 ($\mathbf V_c$ lies in the tilted plane, which contains the $x$-axis) | certified |
| supremum of each member's absolute speed | 0.4091113156 | 0.4065807190 | certified, width $6\times10^{-13}$ |
| triangle bound $\|\mathbf V_c\|+v_{\max}/2$ (for comparison) | 0.4093182767 | 0.4065807190 (equal, drift in-plane) | certified |
| infimum of each member's absolute speed | 0.2979972558 | 0.3004553622 | certified |
| member speed at $t=0$ | 0.3579455266 | 0.3574650333 | measured |
| maximum sampled over 20 WB-1 orbital periods (step $2\times10^{-3}$) | member 1: 0.4090769 at $t=382.3$; member 2: 0.4090947 at $t=293.5$ | member 1: 0.4065469 at $t=382.3$; member 2: 0.4065638 at $t=293.5$ | measured; both below the supremum, as required |
| maximum sampled over the first radial period | member 1: 0.4080253; member 2: 0.4054882 | member 1: 0.4054937; member 2: 0.4029939 | measured |
| speed domains | all three | all three | derived from the supremum |

The sampled run maxima fall short of the supremum by $3\times10^{-5}$ because no pericentre within the first 16.3 radial periods aligns exactly with $\mathbf p$; the shortfall shrinks as the pericentre direction precesses through the plane. The supremum is the correct comparison quantity for an absolute-frame speed-ceiling statement: a run maximum above the enclosure falsifies this reference (or the preparation assumed here); a run maximum below it is consistent.

### 10.6 Principal claims of this section

> Claim grade: derived. The supremum of a member's absolute speed on a bound level with uniform centre drift is $\sqrt{\|\mathbf V_c\|^2+p\,h/r_-+h^2/(4r_-^2)}$, with $p$ the in-plane projection of $\mathbf V_c$. Falsifier: a full Cartesian two-member integration of the law whose member speed exceeds this value beyond its error bound.

> Claim grade: measured (instrument `weber-overnight-independent-reference-withheld.mjs` importing the fixed reference; certified interval enclosures conditional on Section 3.2 (a) and (b); known cases 12 of 12 recorded first). The tables of Sections 10.2–10.5 over exactly these preparations. Falsifier: a correct independent computation from the same frozen law and preparations that lands outside an enclosure.

> Claim grade: inferred. WB-7's preparation is as assumed in Section 10.5. Falsifier: the subject's recorded WB-1 initial state; if it differs, the relative invariants here are void and must be recomputed from the recorded state before any comparison.

## 11. Addendum: labelling corrections (2026-10-05)

Sections 1–10 are unchanged. This addendum quotes two passages, states what each actually denotes, and supersedes the wording. It changes no computed number and no conclusion.

### 11.1 Section 5(iii): "$\ddot r(0)=-3/4$, finite"

Quoted from the Weber $\sigma=-1$ row of the table in Section 5(iii): "contact time 8.560326833 $=3\pi-3\arccos(1/3)+2\sqrt2$; contact relative speed 1.414213562 ($\sqrt2$); member speed at contact 0.7071067812; strict ceiling holds throughout; $\ddot r(0)=-3/4$, finite".

The argument $0$ in "$\ddot r(0)$" is a radius, not a time, and the label does not say so. On a radial level ($h=0$) with $\sigma=-1$, $\mu_{\mathrm W}=1$, $K=c_f=1$, Section 2.9 gives $\ddot r=G(1-\dot r^2/2)/(r(r-b))$ and, after substituting $\dot r^2=(Cr-2G)/(r-b)$, $\ddot r=G(2-C)/(2(r-b)^2)$. With $G=b=-2$ this is the closed expression

$$
\ddot r=-\frac{2-C}{(r+2)^2}\qquad(\sigma=-1,\ h=0,\ K=c_f=1),
$$

valid at every radius on the level, on both the incoming and the receding branch. For release from rest at $r_0=4$, $C=-1$, so the **launch value is $\ddot r|_{t=0}=\ddot r|_{r=4}=-3/36=-1/12$** and the **contact limit is $\lim_{r\to0}\ddot r=-3/4$**. The fixed instrument confirms both: `radialAccel` at $(r,\dot r)=(4,0)$ encloses $-0.08333333333$, and along the level it gives $-0.3333$ at $r=1$, $-0.6803$ at $r=0.1$, $-0.7426$ at $r=0.01$ and $-0.74999$ at $r=10^{-4}$. The same formula gives WB-6's launch value $-8/45$ and contact limit $-9/10$ (Section 10.4). Verdict: the number $-3/4$ is correct and is the incoming contact limit on the level $C=-1$; the label "$\ddot r(0)$" is superseded by "$\lim_{r\to0}\ddot r=-3/4$ (launch value $\ddot r|_{t=0}=-1/12$)". Section 2.9's sentence "$\ddot r=G(2-C)/(2(r-b)^2)$ remains finite at contact (it is $-(2-C)/4$ for $K=c_f=1$)" was already correct. Claim grade: derived, with a certified evaluation.

### 11.2 Section 7: "otherwise turns at $2G/C$"

Quoted from the fourth claim of Section 7: "Same polarity: the singular coefficient vanishes at $x=2$. An incoming radial pair reaches it in finite time with divergent speed if and only if $C>2c_f^2$, and otherwise turns at $2G/C$."

This summary is incomplete in two ways. First, it omits the threshold level $C=2c_f^2$, at which $\dot r^2\equiv2c_f^2$: the pair approaches at uniform relative speed $\sqrt2\,c_f$, reaches $r_c$ in the finite time $(r_0-r_c)/(\sqrt2c_f)$ with finite speed, and the acceleration there is the indeterminate form $0/0$ (Section 2.9 states this case correctly in its list; the summary dropped it). Second, the summary speaks only of incoming same-polarity pairs outside $r_c$, and the parallel opposite-polarity claim in Section 7 ("opposite-polarity radial motion reaches contact in finite time") speaks only of the incoming branch; neither mentions the receding branches, in particular the receding opposite-polarity branch with $C\ge0$, which never returns and never reaches contact. The complete radial branch list follows. It is derived from the level formulas $\dot r^2=(Cr-2G)/(r-b)$ and $\ddot r=G(2-C)/(2(r-b)^2)$, in units $K=c_f=1$ with $\mu_{\mathrm W}=1$, so that $G=b=2\sigma$. "Monotone to $\sqrt C$" means the relative speed tends to $\sqrt C$ without turning; whether it does so from above or below is fixed by $\dot r^2-C=(Cb-2G)/(r-b)=2\sigma(C-2)/(r-2\sigma)$.

**Opposite polarity ($\sigma=-1$): $\dot r^2=(Cr+4)/(r+2)$, $D=1+2/r>0$, $\ddot r=-(2-C)/(r+2)^2$.** Motion exists wherever $Cr+4>0$.

| Branch | Fate | Notes |
| --- | --- | --- |
| A1 incoming, any $C$ | contact in finite time | contact relative speed $\sqrt2$, contact acceleration $-(2-C)/4$; the speed rises to $\sqrt2$ if $C<2$, is constant if $C=2$, falls to $\sqrt2$ if $C>2$ |
| A2 released from rest at $r_0$ ($C=-4/r_0$) | contact | A1 after launch; closed-form times in Sections 2.9 and 10.1 |
| A3 receding, $C<0$ | rises to the apocentre $4/|C|$, returns, contact | the time to the apocentre is the Section 2.9 angle-variable integral; the return is A1 |
| A4 receding, $C=0$ | escapes, never returns, never reaches contact | $\dot r^2=4/(r+2)\to0$; $t(r_0\to r)=\tfrac13[(r+2)^{3/2}-(r_0+2)^{3/2}]$ |
| A5 receding, $0<C<2$ | escapes | speed decreases monotonically to $\sqrt C$ |
| A6 receding, $C=2$ | escapes at uniform relative speed $\sqrt2$ | $\ddot r\equiv0$ |
| A7 receding, $C>2$ | escapes | speed increases monotonically to $\sqrt C$: the acceleration points apart (the reversal above $\sqrt2\,c_f$ noted in Section 2.9) |

**Same polarity ($\sigma=+1$): $\dot r^2=(Cr-4)/(r-2)$, $D=1-2/r$, $\ddot r=(2-C)/(r-2)^2$.** Outside $r_c=2$ motion requires $C>4/r>0$; inside it requires $Cr<4$. The sign of $\ddot r$ is the sign of $2-C$ on both sides of $r_c$: the "leading repulsion produces acceleration toward the partner" remark in Section 2.9 describes the inside-$r_c$ case $C>2$ (which includes release from rest there), not every inside history.

| Branch | Fate | Notes |
| --- | --- | --- |
| B1 incoming, $r_0>2$, $C>2$ | reaches $r_c$ in finite time with $\dot r^2\to\infty$, $\ddot r\to-\infty$, $D\to0^+$; no continuation defined | the member speed crosses $c_f$ at $r=4/(4-C)$ when $2<C<4$; for $C\ge4$ it is above $c_f$ throughout, since $\dot r^2>C$ on this branch |
| B2 incoming, $r_0>2$, $C=2$ | uniform approach at $\sqrt2$, reaches $r_c$ at $t=(r_0-2)/\sqrt2$ with finite speed | acceleration $0/0$ at $r_c$: indeterminate, no continuation selected |
| B3 incoming, $r_0>2$, $4/r_0<C<2$ | turns at $4/C\in(2,r_0)$, then B5 | the "otherwise turns" case |
| B4 released from rest at $r_0>2$ ($C=4/r_0<2$) | B5 | Section 5(iii) benchmark |
| B5 receding, $r>2$, $C<2$ | escapes | speed increases monotonically to $\sqrt C$ |
| B6 receding, $r>2$, $C=2$ | escapes at uniform $\sqrt2$ | |
| B7 receding, $r>2$, $C>2$ | escapes | speed decreases monotonically to $\sqrt C$; acceleration toward the partner but no turn, since $\dot r^2>C>0$ |
| B8 incoming, $r_0<2$, any admissible $C$ | contact in finite time at relative speed $\sqrt2$ | acceleration limit $(2-C)/4$: decelerating infall if $C<2$, accelerating if $C>2$ |
| B9 receding, $r_0<2$, $C>2$ | turns at $4/C<2$, returns, contact (B8) | includes release from rest inside $r_c$ |
| B10 receding, $r_0<2$, $C=2$ | uniform $\sqrt2$ outward, reaches $r_c$ with finite speed | indeterminate at $r_c$ |
| B11 receding, $r_0<2$, $C<2$ | reaches $r_c$ from inside in finite time with $\dot r^2\to+\infty$, $\ddot r\to+\infty$, $D\to0^-$ | the inside counterpart of B1 |

Measured spot checks with the fixed reduced-ODE evaluator (scratch `.tmp/weber-overnight/round2/reference/branch-checks.mjs`): B11 from $(r,\dot r)=(1,+1.6)$, $C=1.44$, reaches $r=1.999$ at $t=0.48047217$ with $\dot r=33.4879$ against the level value $33.4879$ and a midpoint-rule time $0.48047217$; B9 from $(1,+0.5)$, $C=3.75$, turns at $r=1.0666667=4/3.75$; A4 from $(1,\sqrt{4/3})$ reaches $r=10$ at $t=12.124356$ against the closed form $12.124356$; A7 from $(1,+1.5)$, $C=2.75$, has $\dot r=1.64959$ at $r=50$, rising toward $\sqrt{2.75}$; B7 from $(3,+2)$, $C=8/3$, has $\dot r=1.64148$ at $r=50$, falling toward $\sqrt{8/3}$. The superseding summary sentence is: **an incoming same-polarity pair outside $r_c$ reaches $r_c$ with divergent speed if $C>2c_f^2$, reaches it at uniform speed $\sqrt2\,c_f$ with an indeterminate acceleration if $C=2c_f^2$, and turns at $2G/C$ if $C<2c_f^2$; every receding same-polarity pair outside $r_c$ escapes; an incoming opposite-polarity pair always reaches contact at relative speed $\sqrt2\,c_f$, and a receding opposite-polarity pair returns to contact if $C<0$ and escapes without ever reaching contact if $C\ge0$.** Claim grade: derived (branch list), measured (spot checks).

### 11.3 Other entries checked for label-versus-value status

Every numerical entry in the Section 5 tables was traced to an instrument output or an exact derived form: the circular closed forms of 5(i); the quadratic roots, quadrature values and pericentre speed of 5(ii); the closed-form times, $\sqrt C$ asymptotes and `timeToReach` values of 5(iii) and 5(v); and in 5(iv) the values $C=2.42$, $e=0.84$, $4/(4-C)=2.531645570$, $\ddot r_0=-0.01166666667$, $C=1.58$, $4/C=2.531645570$ and $\sqrt{1.58}=1.256980509$, each recomputed by hand from the level formulas and matching. The coincidence that the two 5(iv) rows share the radius $2.531645570$ is exact ($4-2.42=1.58$) and is not a copy error. The qualitative words in the tables ("all three", "strict ceiling holds throughout", "supremum, not attained", "$D>1$ throughout", "unrestricted only (superfield)") are consequences of the adjacent computed values and are correctly derived labels. The Section 5 sentence "Enclosure widths were $\le10^{-12}$ in every listed case" was re-measured from the benchmark JSON: the largest width is $9.0\times10^{-13}$ (the $N=256$ eccentric period), so the sentence holds. No other label-in-place-of-value was found; the only two defects are those superseded in 11.1 and 11.2, and the one incompleteness carried from 11.2 into Section 2.9's inside-$r_c$ remark, noted there.

## 12. Addendum: corrections arising from the adjudication (2026-10-05)

Sections 1–11 are unchanged. Each item below quotes the passage it supersedes, states what is correct, and names what depends on it. None changes a computed number, an enclosure, or a conclusion of Sections 5, 7 or 10.

### 12.1 Section 2.4: the integrating factor on a chart where $D<0$

Quoted: "an integrating factor $D^{p}$ with $p=-2\lambda_{\mathrm W}/\mu_{\mathrm W}$ gives, for every $\mu_{\mathrm W}\ne0$, $\frac{d}{dr}(uD^{p})=2D^{p-1}(h^2/r^3+G/r^2)$." On an interval where $D<0$ (same polarity inside $r_c$) a non-integer power $D^{p}$ is not real. The correct statement uses $\lvert D\rvert^{p}$ there: since $d\lvert D\rvert/dr=\operatorname{sign}(D)\,b/r^2$, the identity $\frac{d}{dr}(u\lvert D\rvert^{p})=2\lvert D\rvert^{p}\,\ddot r+p\,u\lvert D\rvert^{p-1}\operatorname{sign}(D)\,b/r^2$ reduces, after substituting Section 2.3, to $2\operatorname{sign}(D)\lvert D\rvert^{p-1}(h^2/r^3+G/r^2)$, and the resulting constant of integration is specific to the chart (the interval between consecutive singular points $r=0$ and $r=b$). For the frozen law $p=1$, the signed factor $D$ is real on both charts, and the first integral $C$ of Section 2.4 is one single-valued quantity across the critical radius; every use of the integrating factor in Sections 2.5–2.9 and 10–11 has $p=1$. The subject's addendum item 5 and the collinear addendum item 5a say the same for their forms. Claim grade: derived. Falsifier: a radial same-polarity history crossing no singular point along which $C$ from Section 2.4 is not constant.

### 12.2 Section 2.8: the fate of opposite-polarity levels with $h>0$ and $C\ge0$, and the level $C=4$

Section 2.8 treats bound levels ($C<0$) and states for same polarity that "if $C>0$, $Q$ has one positive root and is positive beyond it, so the motion is unbounded"; it does not state the fate of opposite-polarity levels with $h>0$ and $C\ge0$. The complete statement, derived from Section 2.5: for $\sigma=-1$, $h>0$ and $C\ge0$, $Q(r)=Cr^2+4r-h^2$ has exactly one positive root $r_-$, and $\dot r^2=Q/(r(r+2))>0$ for all $r>r_-$; a history is therefore monotone in $r$ after at most one pericentre passage, and it cannot converge to a finite limit $r_\infty>r_-$ because $\dot r$ would then tend to the positive value $\sqrt{Q(r_\infty)/(r_\infty(r_\infty+2))}$; hence $r\to\infty$ with $\dot r^2\to C$, which is $0$ on the level $C=0$, where $\dot r^2\approx4/r$ gives $r\simeq(9k/2)^{1/3}T^{2/3}=9^{1/3}T^{2/3}$ in units $K=c_f=1$. The same-polarity sentence is valid as written because $\dot r^2\to C>0$ there. For the record, the level $C=4$ with $h=0$ and $\sigma=-1$ (branch A7 of Section 11.2) has member speed $\sqrt C/2\to c_f$ from below as $r\to\infty$ without attaining it; it is the zero-margin level of the subject's corrected Section 9 table. Claim grade: derived. Falsifier: an opposite-polarity history with $h>0$ and $C\ge0$ whose separation stays bounded.

### 12.3 Section 2.9: the two exclusions at $r=0$

Quoted: contact "ends the defined history, because the self pair $r=0$ lies outside the law; no continuation through it is selected." The absence of a self term (no $j=i$ in the sum) and the undefinedness of the law for two distinct members at coincident positions (no unit direction and no inverse-square factor at $r=0$) are different exclusions, and only the second ends the history at contact. Superseded by: contact ends the defined history because the law defines no acceleration for a distinct pair at $r=0$; no continuation through it is selected. The collinear addendum item 5b makes the same correction to the subject. No number depends on the wording.

### 12.4 Record of the adjudication checks

The check script of Section 8 ran on Node v22.23.2 at 14:15Z; known cases K1–K6c passed first (8 of 8), all target checks passed, and the `T1-refine` line is the only `OUTSIDE` entry, by $8.7\times10^{-12}$ for the coarser `rtol` $10^{-10}$ run as discussed in 8.5(g). The fixed reference sources were verified unchanged by SHA-256 after the run. The record is `.local-data/master-equation-closure/weber-overnight/review/adjudication-checks.json`.

## 13. Adjudication of the persistence theorems and long runs (2026-10-05)

**Scope and method.** Sections 1–12 are unchanged. This section adjudicates the [persistence document](weber-overnight-persistence.md) (Theorems 2.1, 2.2 and 3.1, the integrability statement of its Section 4, the long runs WP-1, WP-2, WP-3 of its Sections 5–6 with the machine results in [weber-overnight-persistence-runs.json](../evidence/weber-overnight-persistence-runs.json), and the contact-step obligation of its Section 7) against the reference fixed in Sections 1–7 and 10, read at 15:08Z after the subject document was complete. The subject document was written without reading this reference (its status line says so); the two sides are therefore separately authored. Three instruments were used, all run after their known cases passed. (i) The fixed reference module and the withheld module's `pairStateInvariants`, `boundOrbit` and `absoluteSpeedSupremum` (both sources unmodified; SHA-256 still `feeffd7e…23c3` and `fe08198a…40a3` after the run), driven by the scratch script `.tmp/weber-overnight/round3/persistence-adjudication/persistence-enclosures.mjs`, which computes certified enclosures from each run's **recorded** initial state (the case files under `.local-data/master-equation-closure/weber-overnight/binary/persistence/cases/`) and compares them with the subject's located turning radii, periods, apsidal angles, step-end extremes, sampled speed maxima, determinant minima and plane normals; known cases N1–N1e (WB-5 exact rationals $243/119$, $3$, $-119/150$ and the Section 10.2 period and apsidal angle; the Theorem 2.1 radii overlapping the quadratic roots) and N2 (the exact $x=4$ circle gives an excess enclosing $0$) passed first; record `.local-data/master-equation-closure/weber-overnight/review/persistence-adjudication-enclosures.json` with its console output beside it. (ii) The fixed reduced-ODE evaluator `reducedOdeEvolve` (floating RK4, no use of the first integral) for the Theorem 2.1 spot checks, in the same scratch script. (iii) The P-series appended to [weber-overnight-independent-adjudication-checks.mjs](../evidence/weber-overnight-independent-adjudication-checks.mjs) (now SHA-256 `4a5c411270ca8e7fc6526df56a79a55c444001ef0f95fe2628a1d11057e15807`): fresh floating-point code that imports neither fixed source, with known cases K7a–K7c (the excess-form turning radii on the Kepler ellipse $r\in[1,3]$ and on WB-5, and the excess vanishing on the $x=4$ circle) run and printed before the targets P1–P9c; all 44 numeric checks of the script pass, and the record `.local-data/master-equation-closure/weber-overnight/review/adjudication-checks.json` was rewritten by that run. Instrument log for (i): a first version of the Theorem 2.2 counter-case perturbed $h$ at fixed $r=1/2$, which is its own pericentre with speed $1+\eta$ above $c_f$ and is not a counter-case; the corrected construction is in 13.3; and a known-case tolerance of $10^{-15}$ on the excess of the exact circle was below its rounding width $4\times10^{-15}$ and was relaxed to $10^{-14}$ with containment of $0$ holding. The subject's notation maps to this reference by $k=2K=2$, $\kappa=2$, $\Delta=D=1+2/r$, $\varepsilon=C/2$, $\Lambda=C/2+2/h^2$, $r_h=h^2/2$, $e=(h/2)\sqrt{2\Lambda}$, in units $K=c_f=1$. Values below are measured by these instruments unless marked certified or derived; the subject's own numbers are quoted from its files.

### 13.1 Verdict table

| Item | Subject claim | Verdict | Basis |
| --- | --- | --- | --- |
| 1a | Identity (2.2) for the excess $\Lambda=\varepsilon+k^2/(2h^2)$; positivity; zero set | admitted | rederived from Section 2.4's $C$ (13.2); P1: residual $1.4\times10^{-15}$ at 5000 random states, both weights; N2 |
| 1b | Quadratic part (2.3) $=\operatorname{diag}(k^4/h^6,\Delta(r_h))$ and its ratio $\omega_r^2=\Omega^2/(1+2/x)$ | admitted | hand Hessian (13.2); P2a–d at $x=4$ and $x=1$ to the finite-difference floor $10^{-7}$; agrees with Section 2.7 |
| 1c | Neighbourhood estimate (2.5): $r_h/(1+e)\le r\le r_h/(1-e)$, $\lvert\dot r\rvert\le ke/h$ | admitted | derivation (13.2); P3: excess-form radii equal the roots of $Cr^2+4r-h^2$ to $9\times10^{-15}$; P4a; spot checks S-x4-0…S-x1-3 along the fixed reduced-ODE evaluator, bounds held and attained to $10^{-6}$ relative over six radial periods |
| 1d | Tilt bound and distance-to-family bound (2.6), Theorem 2.1 item 3, orbital stability | admitted | derivation (13.2); P4b: sampled distance at most $0.84$ of the bound |
| 2a | Theorem 2.2 items 1–2 (relative stability; uniform centre drift the only unbounded direction) | admitted | Section 2.1 decomposition; Section 8.3's size-two centre blocks |
| 2b | Theorem 2.2 item 3, boundary circle: "every perturbation with $e>0$ … exceeds $c_f$" | admitted with correction | the inequality holds only for perturbations that do not raise $h$ enough; counter-case P6, T22 (13.3); the conclusion that the inclusive label is not preserved under all perturbations survives |
| 2c | Stated non-claims (no Lyapunov stability of an individual circle, no asymptotic stability, nothing about the delayed law) | admitted | $\Lambda$ conserved; angular rate depends on $r_h$ |
| 3a | Theorem 3.1: Picard on $U$, conservation, confinement to the compact set $Q$, continuation to all time | admitted | 13.4; the vector field is a rational function of $(\boldsymbol\rho,\mathbf w)$ with denominators $r^2$, $r(r+\kappa)$, smooth on $\boldsymbol\rho\ne\mathbf0$ |
| 3b | Items 2, 4, 5: determinant range, supremum relative speed $h/r_p$, acceleration bound | admitted | $D=1+2/r$ decreasing; Section 2.8 monotonicity ($C<2$ holds on the bound class); P5: $\lvert f\rvert/\text{bound}\le1$ along sampled levels; run minima of $\det M$ lie above the certified $1+2/r_a$ (13.5) |
| 3c | Integrability: six commuting integrals, regular Legendre map, Liouville–Arnold; $T_r$, $\Phi$ functions of $(h,\varepsilon)$ alone, hence no drift and no KAM question | admitted | 13.4; the quadratures of Section 2.8 depend on $(C,h)$ only |
| 4a | WP-1, WP-2, WP-3 located turning radii inside the Theorem 2.1 interval to within the two-tolerance estimate | admitted | 13.5: every located mean, minimum and maximum lies inside its certified enclosure or outside it by at most $6.4\times10^{-11}$, against estimates of $4.8\times10^{-10}$, $2.5\times10^{-10}$, $8.8\times10^{-12}$ |
| 4b | Apsidal angles and periods match the quadratures; zero secular trend | admitted | 13.5: period means inside or within $1.8\times10^{-10}$ (WP-1), $2.8\times10^{-11}$ (WP-2), inside (WP-3); apsidal means inside (WP-1, WP-3) or $6.8\times10^{-13}$ above (WP-2); trends below the estimates |
| 4c | WP-1 "exact from (A.4)" supremum $0.4091112741$ | admitted with correction | the certified supremum from the recorded state is $0.4091113156$ (width $4\times10^{-13}$); the subject's value is a $1^\circ$ phase-grid scan maximum $4.15\times10^{-8}$ below it, reproduced by P9b; the sampled run maximum $0.4091088856$ lies below both (13.5) |
| 4d | The `rMin`/`rMax` remark (step-end extremes) | admitted | both step-end extremes of every run lie inside the certified $[r_p,r_a]$, as they must (13.5) |
| 5a | Contact-step obligation $h_n\le\theta r_n/W$: sufficiency argument | admitted | 13.6; $W=\sqrt2c_f$ on radial levels $C\le2$ by A1 of Section 11.2 |
| 5b | WB-6 staged verification | admitted with correction | staged event time lies $2.0\times10^{-12}$ above the certified time to $r=10^{-6}$, $[4.759920496914449,\,4.759920496914496]$, and $2.06\times10^{-12}$ above the `rtol` $10^{-12}$ event (the subject quotes $1.7\times10^{-11}$ against a rounded value); staged speed inside the level enclosure to $8\times10^{-14}$ |
| 6 | Defects in the subject or in this reference | two subject corrections (2b, 4c), two subject precision notes (5b, 13.7.3), one note on this reference (13.7.4); no verdict changes | 13.7 |

### 13.2 Item 1: Theorem 2.1

**The identity.** From Section 2.4, $C=\dot r^2(1+2/r)+h^2/r^2-4/r$, so $\varepsilon=C/2=\tfrac12\Delta\dot r^2+h^2/(2r^2)-2/r$, which is the subject's (1.2) with $k=2$. Adding $k^2/(2h^2)=2/h^2$: $h^2/(2r^2)-2/r+2/h^2=\tfrac12(h/r-2/h)^2=\tfrac12(2/h)^2(h^2/(2r)-1)^2=(2/h^2)(r_h/r-1)^2$ with $r_h=h^2/2$, which is the reference's circle condition $h^2=-Gr=2r$ of Section 2.6. Hence $\Lambda=\tfrac12\Delta\dot r^2+(k^2/(2h^2))(r_h/r-1)^2$, nonnegative because $\Delta=D>0$ for $\sigma=-1$ (Section 2.2), and zero exactly on the circles. The identity is algebraic in the state and does not use the equations of motion; its usefulness comes from $\Lambda$ being conserved, which is Section 2.4. P1 confirms it at 5000 random states for both weights to $1.4\times10^{-15}$. Claim grade: derived.

**The quadratic part.** At $(r_h,0)$ the Hessian at fixed $h$ is diagonal: $\partial^2_{\dot r}=\Delta(r_h)$, and with $g(r)=r_h/r-1$, $g(r_h)=0$, $g'(r_h)=-1/r_h$, $\partial^2_r\big[(k^2/(2h^2))g^2\big]=(k^2/h^2)g'^2=k^2/(h^2r_h^2)=k^4/h^6$, which equals $k/r_h^3=\Omega^2$ because $r_h^3=h^6/k^3$. The ratio $\Omega^2/\Delta(r_h)=(2/r_h^3)/(1+2/r_h)=2/(r_h^2(r_h+2))$ is exactly Section 2.7's $\omega_r^2=2K/(r_0^2(r_0+2K/c_f^2))$. P2a–d reproduce $\operatorname{diag}(2/x^3,\,1+2/x)$ and the ratio $2/(x^2(x+2))$ at $x=4$ ($0.03125$, $1.5$, $0.0208333$) and $x=1$ ($2$, $3$, $0.6667$) to the finite-difference floor. One wording note: the subject calls the ratio "the radial frequency (7.1)"; it is the square of the frequency, as its own (7.1) states. Claim grade: derived.

**The neighbourhood estimate.** From the identity, $(k^2/(2h^2))(r_h/r-1)^2\le\Lambda$ gives $\lvert r_h/r-1\rvert\le(h/k)\sqrt{2\Lambda}=e$, so $r_h/(1+e)\le r\le r_h/(1-e)$ when $e<1$, which is $\Lambda<k^2/(2h^2)$, which is $\varepsilon<0$; and $\tfrac12\Delta\dot r^2\le\Lambda$ gives $\lvert\dot r\rvert\le\sqrt{2\Lambda/\Delta}\le\sqrt{2\Lambda}=ke/h$, with the intermediate bound $\sqrt{2\Lambda/(1+\kappa/r_a)}$ valid because $\Delta$ decreases in $r$ and $r\le r_a$. The excess-form radii are the quadratic roots of Section 2.5: with $m=2/\lvert C\rvert$ and $w=\sqrt{4+Ch^2}/\lvert C\rvert$ one has $w/m=\tfrac12\sqrt{4+Ch^2}=e$ and $m(1-e^2)=m\lvert C\rvert h^2/4=h^2/2=r_h$, so $m\mp w=r_h(1\mp e)/(1-e^2)=r_h/(1\pm e)$; P3 confirms this to $9\times10^{-15}$ at 2000 random bound states, and N1e in interval arithmetic on WB-5. The tilt bound is $\sin\phi=\lVert\hat{\mathbf h}_0\times\mathbf h\rVert/h=\lVert\hat{\mathbf h}_0\times\delta\mathbf h\rVert/h\le\lVert\delta\mathbf h\rVert/h$. For the distance bound (2.6), the comparison point on $\mathcal C_{\mathbf h}$ with the same direction $\mathbf e$ has position $r_h\mathbf e$ and velocity $(h/r_h)\hat{\mathbf h}\times\mathbf e=(k/h)\hat{\mathbf h}\times\mathbf e$; the position difference is $r\lvert r_h/r-1\rvert\le r_ae$ and the velocity difference is $\lVert\dot r\mathbf e+(h/r-h/r_h)\hat{\mathbf h}\times\mathbf e\rVert\le\lvert\dot r\rvert+(k/h)\lvert r_h/r-1\rvert\le2ke/h$; the Euclidean norm on $\mathbb R^6$ is at most the sum, giving $e(r_h/(1-e)+2k/h)$. The second half of item 3 (distance between $\mathcal C_{\mathbf h}$ and $\mathcal C_0$ at corresponding azimuths from the line of nodes) uses $\lVert\mathbf a-\mathbf a_0\rVert=2\sin(\phi/2)\le\phi$ for a unit vector rotated by $\phi$ about an axis perpendicular to neither, and the triangle inequality; it is correct. The $\varepsilon$–$\delta$ consequence follows from continuity of $\mathbf h$ and $\varepsilon$ on $\{r>0\}$ and $\Lambda=0$, $\varepsilon<0$ on $\mathcal C_0$. P4a and P4b sample fifty points on each of about 200 random bound levels: no violation of $\lvert\dot r\rvert\le ke/h$, and the distance to $\mathcal C_{\mathbf h}$ is at most $0.84$ of the bound. The spot checks S-x4-0 to S-x1-3 integrate eight random perturbed states (2% in $h$, 3% in $r$, radial kicks up to 1.5% of the circular speed) about the $x=4$ and $x=1$ circles for six radial periods with the fixed reduced-ODE evaluator (step $T_r/4000$): in every case the extreme radii equal $r_p$ and $r_a$ to $10^{-6}$ relative, and $\max\lvert\dot r\rvert$ is $0.82$ of $ke/h$ at $x=4$ and $0.58$ at $x=1$, which are $1/\sqrt{\Delta(r_h)}=1/\sqrt{1.5}$ and $1/\sqrt3$: the bound $\sqrt{2\Lambda}$ drops the factor $1/\sqrt\Delta$ and is attained only as $\Delta\to1$. The sharpness remark (the $r$ bounds are attained at the turning points) is correct, and the measured turning radii of 13.5 sit on them. Claim grade: derived (the theorem), measured (spot checks).

### 13.3 Item 2: Theorem 2.2 and the non-claims

Items 1 and 2 are the decomposition of Section 2.1 ($\mathbf V_1+\mathbf V_2$ constant, $\mathbf X_{1,2}=\mathbf C\pm\boldsymbol\rho/2$) combined with Theorem 2.1; the only unbounded direction is $\delta\mathbf V_cT$, exactly linear, and it corresponds to the size-two centre blocks verified in Section 8.3. Admitted.

Item 3 contains an overstatement. For the boundary circle at $x=1/2$ ($h_0=1$, member speed exactly $c_f$ with the centre at rest) the subject argues that "every perturbation with $e>0$ has pericentre speed $h/(2r_p)>h/(2r_h)$, which exceeds $c_f$". The first inequality is right, but $h/(2r_h)=k/(2h)=1/h$ equals $c_f$ only when $h=h_0$; a perturbation that raises $h$ lowers it. Counter-case (P6, and T22 in the scratch record): take $h=1+\eta$, place the state at its own circle radius $r_h=(1+\eta)^2/2$, and add the radial speed $\dot r_0=2e/(h\sqrt{\Delta(r_h)})$ that makes $e=\eta/2$; this is an $O(\eta)$ perturbation of the boundary circle (size $2.3\times10^{-3}$ for $\eta=10^{-3}$) with $e>0$, and its pericentre member speed is $(1+e)/(1+\eta)=0.99950$ for $\eta=10^{-3}$ and $0.99505$ for $\eta=10^{-2}$, strictly below $c_f$; such a history keeps the strict label. The correct statement is: a perturbation with $e>0$ has pericentre member speed $(k/(2h))(1+e)$, which exceeds $c_f$ exactly when $h<h_0(1+e)$; so the inclusive label at the boundary is lost by every perturbation with $h<h_0(1+e)$ (including all that do not raise $h$), kept with equality at $h=h_0(1+e)$, and replaced by the strict label when $h>h_0(1+e)$; it is not preserved under all small perturbations. The subject's conclusion (the label is not stable at the boundary although the dynamics is unchanged) survives in this weaker form; nothing else depends on the sentence. The non-claims are correct: the angular rate of a perturbed history depends on its own $r_h$, so phases separate linearly and no individual circle is Lyapunov stable; $\Lambda$ is conserved, so no history approaches the family; the delayed law has none of these invariants. Claim grade: derived, with the correction.

### 13.4 Item 3: Theorem 3.1 and integrability

**Existence and continuation.** The first-order field on $U=\{\mathbf X_1\ne\mathbf X_2\}$ is $(\mathbf V_1,\mathbf V_2,f\mathbf e,-f\mathbf e)$ with $f$ from the subject's (1.1), which this reference rederives from Section 2.3: $D\ddot r=h^2/r^3+G/r^2+\lambda_{\mathrm W}G\dot r^2/r^2$ with $\ddot r=h^2/r^3+2f$ gives $2fD=(h^2/r^3)(b/r)+(G/r^2)(1-\dot r^2/2)$, i.e. $f=-\big[1-\dot r^2/2+h^2/r^2\big]/(r(r+2))$ for $G=b=-2$. Since $\dot r=\mathbf e\cdot\mathbf w$ and $h^2=r^2\lVert\mathbf w\rVert^2-(\boldsymbol\rho\cdot\mathbf w)^2$ are polynomial in $(\boldsymbol\rho,\mathbf w)$ once $r$ and $\mathbf e$ are, the field is $C^\infty$ on $U$; Picard–Lindelöf gives a unique maximal solution, and uniqueness for the law follows because (1.1) is the unique solution of the acceleration system whenever $D\ne0$ (Section 2.2). Conservation of $\mathbf h$ ($\boldsymbol\rho\times2f\mathbf e=\mathbf0$), of $\mathbf V_c$ and of $C$ (Section 2.4, direct differentiation) holds on the whole maximal interval. The a priori bounds then confine $(\boldsymbol\rho,\mathbf w)$ to the compact set $Q$ and $\mathbf C$ to a bounded set on any finite interval, so the standard continuation theorem forces $T_\pm=\pm\infty$. Admitted; this is the argument Section 2.8 of this reference left implicit when it said the radius "oscillates periodically" and "contact never occurs while $h>0$".

**Items 2, 4, 5.** $D=1+2/r$ is decreasing, so its range on $[r_p,r_a]$ is $[1+2/r_a,1+2/r_p]$; the run minima of $\det M$ in 13.5 lie above the certified lower endpoint by $1.8\times10^{-11}$ (WP-1), $0$ within the enclosure (WP-2) and $4.3\times10^{-10}$ (WP-3), as sampled minima must. The supremum $\lVert\mathbf w\rVert=h/r_p$ at pericentre is Section 2.8's monotonicity theorem, whose hypothesis $C<2$ holds on the bound class ($C<0$); the closed form $h/(2r_p)=\tfrac12\big(k/h+\sqrt{k^2/h^2+2\varepsilon}\big)$ follows from $h/r_p=(k/h)(1+e)$ and $(k/h)e=\sqrt{2\Lambda}$. Item 5 uses $\dot r^2/2\le\Lambda/\Delta\le\Lambda$ and the decreasing prefactor $1/(r(r+\kappa))$; it needs no sign of the bracket, as the subject says; P5 finds $\lvert f\rvert/\text{bound}\le1$ along sampled levels, with the ratio approaching $1$ at pericentre on nearly circular levels. Admitted.

**Periodicity and integrability.** The reduced level curve is compact and, for $\Lambda>0$, a smooth simple closed curve because $\Lambda(r,\dot r)$ has the nondegenerate minimum of 13.2 and no other critical point; the reduced field has no zero on it; so the motion is periodic with the period of Section 2.8's quadrature. The Legendre map is regular because $\partial^2L/\partial\mathbf V^2=\mathbb I_6-\alpha\mathbf u\mathbf u^{\mathsf T}$ with $\alpha=-K/r<0$ for $\sigma=-1$ (Section 2.2's matrix), so $\succeq\mathbb I_6$. The canonical momenta $\mathbf p_{1,2}=\mathbf V_{1,2}\mp\Phi_{\dot r}\mathbf e$ give $\mathbf P=\mathbf p_1+\mathbf p_2=\mathbf V_1+\mathbf V_2$ and $\mathbf p_\rho=\tfrac12(\mathbf p_1-\mathbf p_2)=\tfrac12\mathbf w-\Phi_{\dot r}\mathbf e$, so $\boldsymbol\rho\times\mathbf p_\rho=\tfrac12\mathbf h$ exactly; $(\mathbf C,\mathbf P)$ and $(\boldsymbol\rho,\mathbf p_\rho)$ are canonical pairs, $H=\lVert\mathbf P\rVert^2/4+H_{\mathrm{rel}}(\boldsymbol\rho,\mathbf p_\rho)$ with $H_{\mathrm{rel}}$ rotation-invariant, so $\mathbf P$, $\lVert\mathbf h\rVert^2$, $h_z$ and $H$ are pairwise in involution and independent where $h>0$ and $\mathbf h$ is not along $z$; Liouville–Arnold applies after the centre is quotiented, the joint level sets of $(\varepsilon,\lVert\mathbf h\rVert^2,h_z)$ on the bound class are compact (13.4 above) and are three-tori with the frequencies the subject lists. The statement that matters for persistence does not even need this: $T_r$ and $\Phi$ are the quadratures of Section 2.8, functions of $(C,h)$ through $m$, $w$ and $b$ alone, and $C$ and $h$ are constant, so neither can drift along a history; a measured trend is integration error by construction. Asymptotic stability is excluded by the conservation of $\Lambda$ alone. Admitted. Claim grade: derived.

### 13.5 Item 4: the long runs against the certified enclosures

Enclosures were computed from the recorded initial states (full-double values such as $0.3535533905932738$, $0.3674234614174767$, $0.0007071067811865476$) with the fixed modules, trapezoid $N=128$, remainder bounds below $10^{-99}$ in every case; "offset" is the signed distance outside the enclosure, $0$ when inside; "est." is the subject's two-tolerance estimate for that quantity. For WP-3 the invariants were derived from the kicked state: $h\in[1.4142142694796982,\,1.4142142694797009]$, $C\in[-1.9999920000000138,\,-1.9999919999999876]$, $\Lambda=3.0000010\times10^{-6}$, $e=0.0017320520$, plane normal enclosing $(0,-0.0009999995,0.9999995)$.

| Run and quantity | Certified enclosure | Located (mean; min; max) or value | Offsets | est. |
| --- | --- | --- | --- | --- |
| WP-1 pericentre | $[3.9664370546584347,\,3.96643705466267]$ | $3.966437054643349$; $3.96643705459449$; $3.9664370546625602$ | $-1.5\times10^{-11}$; $-6.4\times10^{-11}$; $0$ | $4.8\times10^{-10}$ |
| WP-1 apocentre | $[4.03576355050375,\,4.035763550507986]$ | $4.035763550493438$; $4.035763550464968$; $4.035763550525298$ | $-1.0\times10^{-11}$; $-3.9\times10^{-11}$; $+1.7\times10^{-11}$ | $4.8\times10^{-10}$ |
| WP-1 radial period | $[43.54712879152819,\,43.54712879155376]$ | $43.54712879134778$ | $-1.8\times10^{-10}$ | $3.7\times10^{-9}$ |
| WP-1 apsidal angle | $[3.8475192541517806,\,3.847519254159275]$ | $3.8475192541588155$ | $0$ | $1.2\times10^{-11}$ |
| WP-1 supremum member speed (void frame, $\mathbf V_c=(0.0525,0,0.005)$) | $[0.40911131563137293,\,0.40911131563175496]$ | subject "exact" $0.40911127413594567$; sampled $0.40910888563705433$ | $-4.15\times10^{-8}$; $-2.43\times10^{-6}$ (both below, as required) | — |
| WP-2 pericentre | $[2.0420168067226245,\,2.0420168067227555]$ ($243/119$) | $2.0420168067208393$; $2.0420168067190936$; $2.042016806722736$ | $-1.8\times10^{-12}$; $-3.5\times10^{-12}$; $0$ | $2.5\times10^{-10}$ |
| WP-2 apocentre | $[2.9999999999999325,\,3.0000000000000635]$ ($3$) | $2.9999999999962768$; $2.9999999999931486$; $2.9999999999999516$ | $-3.7\times10^{-12}$; $-6.8\times10^{-12}$; $0$ | $2.5\times10^{-10}$ |
| WP-2 radial period | $[23.8046465411548,\,23.804646541155954]$ | $23.804646541127077$ | $-2.8\times10^{-11}$ | $6.2\times10^{-10}$ |
| WP-2 apsidal angle | $[4.239830417084522,\,4.23983041708509]$ | $4.23983041708577$ | $+6.8\times10^{-13}$ | $9.5\times10^{-12}$ |
| WP-2 supremum member speed | $[0.5397949618355337,\,0.5397949618355702]$ | subject $0.5397949618355525$; sampled $0.5397949451881914$ | $0$; $-1.7\times10^{-8}$ (below) | — |
| WP-3 pericentre | $[0.9982719411228608,\,0.998271941128227]$ | $0.9982719411254031$; $0.9982719411252619$; $0.9982719411255637$ | $0$; $0$; $0$ | $8.8\times10^{-12}$ |
| WP-3 apocentre | $[1.0017360589037725,\,1.0017360589091389]$ | $1.0017360589066047$; $1.0017360589064335$; $1.0017360589067479$ | $0$; $0$; $0$ | $8.8\times10^{-12}$ |
| WP-3 radial period | $[7.695334251242296,\,7.695334251260007]$ | $7.695334251250099$ | $0$ | $2.5\times10^{-11}$ |
| WP-3 apsidal angle | $[5.441395825429787,\,5.441395825479552]$ | $5.441395825454906$ | $0$ | $4.8\times10^{-11}$ |
| WP-3 supremum member speed | $[0.7083311727069983,\,0.7083311727108083]$ | subject $0.7083311727089284$; sampled $0.7083311727089109$ | $0$; $0$ (inside, below the subject value by $1.8\times10^{-14}$) | — |

The subject's own predicted $r_p$, $r_a$, $T_r$ and $\Phi$ for all three runs lie inside the enclosures (its floating quadrature agrees with the certified one), its recorded initial plane normals lie inside the $\hat{\mathbf h}$ enclosures, and the step-end extremes `rMin`/`rMax` of every run lie inside $[r_p,r_a]$: $3.9664370549$ to $4.0357635504$ (WP-1), $2.0420168752$ to $3$ (WP-2), $0.9982719411$ to $1.0017360587$ (WP-3), which is what the subject's remark predicts, since a step end can only lie inside the true extremes. Reading: every located turning radius, period and apsidal angle lies inside its certified enclosure or outside it by less than the instrument's own two-tolerance estimate, by a factor of $7$ (WP-1 pericentre minimum, $6.4\times10^{-11}$ against $4.8\times10^{-10}$) to $70$; the offsets are systematic in sign (pericentres and apocentres slightly low for WP-1 and WP-2) at the $10^{-11}$ level, consistent with accumulated integrator error over $7000$ and $4800$ time units and absent in the shorter WP-3. The drift and trend numbers are therefore credible as finite numerical survival: the apsidal-angle trends ($2.3\times10^{-11}$, $1.6\times10^{-12}$, $-3.4\times10^{-12}$) and radial-period trends ($-9.7\times10^{-11}$, $-4.9\times10^{-11}$, $-8.7\times10^{-12}$) are below the respective two-tolerance differences, and the invariant drifts ($\le9.4\times10^{-12}$) are at the level the WB-7 run already showed over twenty periods. The subject correctly classifies this agreement as same-lane consistency; the comparison here is against the separately authored certified enclosures and is the independent half.

One correction. The WP-1 supremum labelled "exact from (A.4)" is not exact. From the recorded state the certified supremum (Section 10.1 formula, `absoluteSpeedSupremum`) is $0.4091113156$, the Section 10.5 reading-A value; the subject's $0.4091112741$ is $4.15\times10^{-8}$ lower. P9b explains it exactly: the in-plane projection $\mathbf p$ of $\mathbf V_c$ makes an angle of $1.347\times10^{-3}$ rad with the $x$ axis (its $y$ component is $(\mathbf V_c\cdot\hat{\mathbf h})\hat h_y\approx7.1\times10^{-5}$), and the subject's torus scan evaluated the aligned pericentre at $\theta=\pi/2$ exactly, on what its `supAt` fields show to be a one-degree phase grid; evaluating the formula with the tangent exactly along $x$ reproduces $0.40911127414$ to $7.6\times10^{-12}$. The scan value is a lower bound on the supremum, as every sampled value is, and the comparison "sampled run maximum below the supremum" holds against both numbers ($2.4\times10^{-6}$ below the scan value, $2.43\times10^{-6}$ below the certified supremum). For WP-2 and WP-3 the centre is at rest, the supremum is attained at every pericentre, and the subject's values are inside the enclosures. Claim grade: measured (the comparisons), certified (the enclosures).

### 13.6 Item 5: the contact-step obligation

The argument is right. On a radial opposite-polarity level with $C\le2$ the relative speed rises monotonically to $\sqrt2c_f$ at contact (A1 of Section 11.2), so $W=\sqrt2c_f$ bounds $\lvert\dot r\rvert$ on the approach; if an accepted step from separation $r_n$ has length $h_n\le\theta r_n/W$, the exact separation at its end is at least $r_n-Wh_n\ge(1-\theta)r_n>0$, and the numerical one is at least that minus the step's position error, positive when the error is below $(1-\theta)r_n$; so no accepted step ends beyond $r=0$, step-end separations decrease at worst geometrically, and the first step end with $r<r_{\mathrm{contact}}$ brackets a sign change of $r-r_{\mathrm{contact}}$ because the previous step end had $r\ge r_{\mathrm{contact}}$. The bound is sufficient and not necessary, and the cost count is right: $\lceil\log_2(2.5/10^{-6})\rceil=22$ stages, $21$ beyond the first (P7). The remark that the control's divergent contact speed protects it through the error controller, while the frozen law's finite speed removes that protection, agrees with Section 8.5(f). The variant using the current $\lvert\dot r_n\rvert$ needs the bounded-$\ddot r$ condition the subject states; $\ddot r=-(2-C)/(r+2)^2$ is bounded by $(2-C)/4$ on the level (Section 11.1).

The verification agrees with the WB-6 enclosures. The certified time from rest at $x_0=2.5$ to $r=10^{-6}$ is $[4.759920496914449,\,4.759920496914496]$ (withheld module, `timeFromRestTo`, derived from the Section 10.1 closed form), and the level relative speed there is $[1.4142129259771652,\,1.4142129259771687]$. The `rtol` $10^{-12}$ single run's event, $4.759920496914469$ with $\lvert\dot r\rvert=1.4142129259781444$, lies inside the time enclosure and $9.8\times10^{-13}$ above the speed enclosure; the staged `rtol` $10^{-10}$ capture, $4.759920496916527$ with $\lvert\dot r\rvert=1.4142129259772505$, lies $2.0\times10^{-12}$ above the time enclosure and $8\times10^{-14}$ above the speed enclosure, and its stage-0 stop at $x=1.25$, $3.5683217732069568$ with $\dot r=-0.7844645405524364$, lies $1.3\times10^{-12}$ above the certified $[3.568321773205559,\,3.5683217732056147]$ with the speed matching $\sqrt{8/13}$ to $3\times10^{-13}$. Adding the certified tail $[7.0710689\times10^{-7},\,7.0710699\times10^{-7}]$ to the staged event gives a contact time $2.0\times10^{-12}$ above the Section 10.4 enclosure $[4.759921204021389,\,4.759921204021437]$, as expected at the coarser tolerance. One precision note: the subject reports the staged event as agreeing with the fine run "to $1.7\times10^{-11}$ in time", but that figure is the difference from the rounded value $4.7599204969$ stored in its script's `expected` field; the difference from the fine run's recorded event time is $2.06\times10^{-12}$ (P8e), so the agreement is better than stated. Claim grade: derived (the argument), measured and matched (the capture).

### 13.7 Item 6: numbered addendum

1. **Subject, Theorem 2.2 item 3.** "Every perturbation with $e>0$ … exceeds $c_f$" is superseded by: a perturbation of the boundary circle with $e>0$ leaves the inclusive domain at pericentre exactly when $h<h_0(1+e)$ and stays inside it when $h\ge h_0(1+e)$, so the inclusive label is not preserved under all small perturbations (13.3). No other statement depends on it.
2. **Subject, Section 5 predictions and Section 6 table, WP-1.** The value $0.4091112741$ labelled "exact from (A.4)" is a one-degree phase-grid scan maximum; the exact supremum from the recorded state is the certified $0.4091113156$, and the explanation and both shortfalls are in 13.5. The verdict on the run does not change.
3. **Subject, Section 7.** The staged WB-6 capture agrees with the `rtol` $10^{-12}$ event time to $2.06\times10^{-12}$, not $1.7\times10^{-11}$; the latter compares with a rounded value (13.6).
4. **This reference, Section 8.5(d).** The WB-6 tail from $r=10^{-6}$ to contact was printed as $7.071069\times10^{-7}$; the value used in the sum was $7.0710694\times10^{-7}$ (P8d), whose certified enclosure is $[7.0710689\times10^{-7},\,7.0710699\times10^{-7}]$; the printed sum $4.759921204021409$ and the verdict are unchanged.
5. **This reference, Section 2.8.** Its "oscillates periodically between $r_-$ and $r_+$" and "contact never occurs while $h>0$" assumed without saying so that the history exists for all time; the subject's Theorem 3.1 supplies the continuation argument, and 13.4 adopts it. No number depends on it.

No defect was found in Theorem 2.1, Theorem 3.1, the integrability statement, the obligation (7.1), or any located run number; no statement of Sections 1–12 is contradicted by the persistence document.

### 13.8 Closing grades and falsifiers

**Derived and independently confirmed** (the subject's derivation against this reference's first integral, polar reduction, monotonicity theorem and quadratures, agreeing in statement and boundary): the excess identity $\Lambda=\tfrac12\Delta\dot r^2+(k^2/(2h^2))(r_h/r-1)^2\ge0$ with the circles as its zero set and quadratic part $\operatorname{diag}(\Omega^2,\Delta(r_h))$ whose ratio is $\omega_r^2$ of Section 2.7; the all-time bounds $r_h/(1+e)\le r\le r_h/(1-e)$, $\lvert\dot r\rvert\le ke/h$, the fixed plane, and the distance bound $e(r_h/(1-e)+2k/h)$ to the circular orbit, hence orbital stability of the circular family (Theorem 2.1); Theorem 2.2 items 1–2 and the corrected item 3; global regular existence on the bound class with the determinant in $[1+\kappa/r_a,1+\kappa/r_p]$, relative speed at most $h/r_p$ and the acceleration bound (Theorem 3.1); Liouville integrability of the pair and the consequence that $T_r$ and $\Phi$ are functions of $(h,\varepsilon)$ alone and cannot drift; the sufficiency of the contact-step bound $h_n\le\theta r_n/W$. **Measured and matched** (subject instrument against certified enclosures from the recorded initial states): WP-1, WP-2 and WP-3 turning radii, radial periods and apsidal angles over 114–199 radial periods, each inside its enclosure or outside it by less than the instrument's own error estimate; sampled speed maxima below the certified suprema; step-end extremes and determinant minima on the correct side of the certified bounds; the staged WB-6 capture at `rtol` $10^{-10}$ within $2\times10^{-12}$ of the certified time to $r=10^{-6}$. **Measured only** (subject instrument, not enclosed): the secular trends and invariant drifts, credible as finite survival over 200 periods because they lie below two-tolerance differences that 13.5 shows to be conservative. **Open:** unchanged from Section 8.8 (three or more members, the delayed law, perturbations of the law rather than the state); and whether the systematic $10^{-11}$ low bias of the located WP-1 and WP-2 turning radii is integrator error alone, which a run at `rtol` $10^{-13}$ or in extended precision would settle.

**Falsifiers, operator-checkable.** (i) `node weber-overnight-independent-adjudication-checks.mjs` printing a `FAIL` line in K7a–P9c, or `node .tmp/weber-overnight/round3/persistence-adjudication/persistence-enclosures.mjs` printing a `FAIL` line or an `OUTSIDE` line whose offset exceeds the subject estimate printed beside it. (ii) A regular opposite-polarity history with $h>0$, $C<0$, computed by an integrator sharing no code with either lane, whose separation leaves $[r_h/(1+e),r_h/(1-e)]$ or whose $\lvert\dot r\rvert$ exceeds $ke/h$ beyond that integrator's error. (iii) A bound history whose measured radial period or apsidal angle changes along the run by more than that instrument's two-tolerance difference. (iv) A member speed in any WP run exceeding the certified supremum of 13.5. (v) A staged run under $h_n\le\theta r_n/\sqrt2$ on a radial opposite-polarity level with $C\le2$ that ends beyond $r=0$ without raising the contact event. (vi) A small perturbation of the $x=1/2$ circle with $e>0$ and $h<h_0(1+e)$ whose member speed stays at or below $c_f$, or one with $h>h_0(1+e)$ whose member speed reaches $c_f$ (either would contradict 13.3).


### Durable copies of recorded scratch inputs

Recorded command and provenance text retain their original paths. Byte-identical durable owners are [branch-checks.mjs](../evidence/weber-overnight-promoted/round2/reference/branch-checks.mjs), [persistence-enclosures.mjs](../evidence/weber-overnight-promoted/round3/persistence-adjudication/persistence-enclosures.mjs). The [promotion map](weber-overnight-closeout-verification.md#part-3--promotion-map) records hashes and the retained scratch aliases.
