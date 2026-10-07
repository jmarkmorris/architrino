# Independent coupled period-condition review

## Verdict and precise scope

Claim grade: independently reconstructed analytical derivation. The [frozen subject](overnight2-b-coupled-period-conditions.md) has the correct simultaneous acceleration, algebraic primitive, first-order cylindrical matrix, symmetric radial/axial coefficient, exact quadratic period identity and necessary leading conditions $M=W=0$. Its finite-positive-scale time normalization is correct. Its quarter-orbit reflection is valid for a regular limiting-equation segment satisfying the exact endpoint conditions, and both diagnostic integrands have the required reflection parity.

Three scope points should remain explicit in the receiving account. First, profile convergence must control derivatives: uniform $C^2$ bounds and $C^1$ convergence suffice for the two means, while $C^2$ convergence is a sufficient hypothesis for the displayed limiting differential equation. Rates must converge to the declared finite positive limits. Second, four reflected quarters close radius, height and their derivatives, while the full positions are generally only relatively periodic; genuine positional periodicity requires a rational accumulated rotation in units of $2\pi$. Third, choosing a simultaneous radial and axial turning point is a selected shooting family, not a consequence of spatial scaling or a representation of every periodic orbit.

The subject identity by `shasum -a 256` is `63bc8f0b1ced5daa5648c1936fd9ef7511543f5868f5e8b56a78200077fda8ec`. The numerical shooting instrument, its outputs and its claimed controls were not used as evidence for this review. No subject, prior oracle or shared owner was modified. The parent researcher owns integration into the ongoing second-allocation account. This review retains a complete analytical derivation; no new numerical target or program was needed, so no target receipt or instrument-validation sequence is claimed.

## Paths, base velocity and two exact identities

For $R>0$, $\epsilon>0$, $b,k>0$, put $\tau=t/R$, $\phi=\epsilon k\tau$ and $\theta_j=\epsilon b\tau+j\pi/3+p(\phi)$. The prescribed complete six paths are

$$
X_j(t)=R\big(\rho(\phi)\cos\theta_j,\rho(\phi)\sin\theta_j,(-1)^j\zeta(\phi)\big),\qquad j=0,\ldots,5.
$$

The real $C^2$ profiles $\rho,p,\zeta$ have phase period $2\pi$, and $\rho$ has a common positive lower bound. A prime denotes phase differentiation. Define

$$
\omega=b+kp',\qquad u=k\rho',\qquad w=\rho\omega,\qquad v=k\zeta'.
$$

Thus the physical velocity of receiver zero, in its instantaneous cylindrical frame, is $\epsilon(u,w,v)$. The prescribed dimensionless acceleration is

$$
L=\epsilon^2\big(k^2\rho''-\rho\omega^2,
2k\rho'\omega+\rho k^2p'',k^2\zeta''\big).
$$

Its physical value is $L/R$, whereas the unchanged canonical sum gives $A/R^2$. Exact balance therefore requires $A=RL$. The tangential component gives

$$
\rho L_t=\epsilon^2k(\rho^2\omega)',\qquad
\langle\rho A_t\rangle=0,
$$

where $\langle f\rangle=(2\pi)^{-1}\int_0^{2\pi}f\,d\phi$. For the second identity, direct multiplication and collection gives

$$
uL_r+wL_t+vL_z
=\epsilon^2\big[k^3\rho'\rho''+k\rho\rho'\omega^2
+k^2\rho^2\omega p''+k^3\zeta'\zeta''\big]
=\frac{\epsilon^2k}{2}(u^2+w^2+v^2)'.
$$

The negative radial centripetal product combines with one of the two positive tangential products, leaving exactly the derivative of $w^2/2$. Period integration then yields

$$
\langle uA_r+wA_t+vA_z\rangle=0.
$$

Both are geometric consequences of the acceleration equation and periodic profiles. They assume no physical mass or imported conservation law and hold for relative-periodic shapes as well as fully closed positions.

## Simultaneous acceleration and primitive

For source $j$, let $\alpha=j\pi/3$ and $\sigma=(-1)^j$. Simultaneous separation from receiver zero is

$$
Q_0=\big(\rho(1-\cos\alpha),-\rho\sin\alpha,(1-\sigma)\zeta\big),\qquad s=|Q_0|.
$$

The pair $j=2,4$ has $s^2=3\rho^2$ and contributes $1/(\sqrt3\rho^2)$ radially and zero axially. The opposite-polarity neighbor pair has $s^2=\rho^2+4\zeta^2$ and contributes $(-\rho,-4\zeta)/(\rho^2+4\zeta^2)^{3/2}$ in radial/axial coordinates. The diametric source has $s^2=4(\rho^2+\zeta^2)$ and contributes $(-\rho,-\zeta)/[4(\rho^2+\zeta^2)^{3/2}]$. Reflection cancels the simultaneous tangential acceleration. Consequently

$$
A_r^{(0)}=\frac1{\sqrt3\rho^2}-\frac{\rho}{(\rho^2+4\zeta^2)^{3/2}}
-\frac{\rho}{4(\rho^2+\zeta^2)^{3/2}},
$$

$$
A_z^{(0)}=-\frac{4\zeta}{(\rho^2+4\zeta^2)^{3/2}}
-\frac{\zeta}{4(\rho^2+\zeta^2)^{3/2}}.
$$

For the purely algebraic primitive

$$
U(\rho,\zeta)=\frac1{\sqrt3\rho}-\frac1{\sqrt{\rho^2+4\zeta^2}}
-\frac1{4\sqrt{\rho^2+\zeta^2}},
$$

direct differentiation gives $(A_r^{(0)},A_z^{(0)})=-\nabla U$. Therefore $uA_r^{(0)}+vA_z^{(0)}=-kU'$, whose average is zero. Constant radius is unnecessary for this combined radial/axial identity. The primitive follows from the simultaneous canonical sum; it is not selected as an alternative substrate interaction.

## Independent first-order matrix

The simultaneous source base velocity is

$$
V_1=(u\cos\alpha-w\sin\alpha,\;u\sin\alpha+w\cos\alpha,\;\sigma v).
$$

Write $a=1-\cos\alpha$. Direct multiplication, using $\sigma(1-\sigma)=-(1-\sigma)$, gives

$$
Q_0\cdot V_1=-\rho a u-\rho\sin\alpha\,w-(1-\sigma)\zeta v.
$$

The independently reconstructed first-order canonical row is $\sigma[V_1-2Q_0(Q_0\cdot V_1)/s^2]/s^2$. Let $h=\zeta/\rho$ and $L_\alpha=s^2/\rho^2=2a+(1-\sigma)^2h^2$. Before pairing, the radial coefficient of $u$ is $\sigma[\cos\alpha/L_\alpha+2a^2/L_\alpha^2]$. The radial coefficient of $v$ and axial coefficient of $u$ are both

$$
\frac{2\sigma a(1-\sigma)h}{L_\alpha^2}.
$$

This direct equality establishes the symmetry of the mixed coefficient without assuming a general reciprocity principle. All radial/tangential and axial/tangential cross terms are odd in $\sin\alpha$ and cancel between $j$ and $6-j$; the diametric sine vanishes. The remaining tangential coefficient is $\sigma[\cos\alpha/L_\alpha-2\sin^2\alpha/L_\alpha^2]$, and the axial coefficient is $1/L_\alpha+2\sigma(1-\sigma)^2h^2/L_\alpha^2$.

Put $x=1+4h^2$ and $y=1+h^2$. Summing each group of source channels gives the following dimensionless coefficients, with a common prefactor $1/\rho^2$:

| Sources | Radial $P$ | Mixed $Q$ | Tangential $C$ | Axial $S$ |
| --- | --- | --- | --- | --- |
| $j=1,5$ | $-1/x-1/x^2$ | $-4h/x^2$ | $-1/x+3/x^2$ | $2/x-16h^2/x^2$ |
| $j=2,4$ | $2/3$ | $0$ | $-2/3$ | $2/3$ |
| $j=3$ | $(h^2-1)/(4y^2)$ | $-h/(2y^2)$ | $1/(4y)$ | $(1-h^2)/(4y^2)$ |

Thus the exact first-order coefficient is

$$
A^{(1)}=\frac1{\rho^2}
\begin{pmatrix}P&0&Q\\0&C&0\\Q&0&S\end{pmatrix}
\begin{pmatrix}u\\w\\v\end{pmatrix},
$$

with

$$
P=-\frac1{1+4h^2}-\frac1{(1+4h^2)^2}+\frac23+\frac{h^2-1}{4(1+h^2)^2},
\qquad Q=-\frac{4h}{(1+4h^2)^2}-\frac{h}{2(1+h^2)^2},
$$

$$
C=\frac{2-4h^2}{(1+4h^2)^2}-\frac23+\frac1{4(1+h^2)},
\qquad S=\frac{2(1-4h^2)}{(1+4h^2)^2}+\frac23+\frac{1-h^2}{4(1+h^2)^2}.
$$

As direct algebra checks, at $h=0$ the table gives $(P,Q,C,S)=(-19/12,0,19/12,35/12)$. In particular $P(0)<0$, so the quadratic form is not globally positive definite. No stability interpretation follows from these coefficients of prescribed delayed-history acceleration.

## Necessary slow-limit means and uniformity

For a bounded profile family with common positive radius floor, common upper bounds on the profiles and their first two derivatives, and bounded base rates, sufficiently small $\epsilon$ gives a uniform complete-past chart: five ordinary partner roots and no positive self roots. Bounded path diameter controls all delays, and the common speed bound $O(\epsilon)$ gives a positive transmitter divisor. Separate Taylor estimates for position and delayed velocity, using the $O(\epsilon^2)$ trajectory second derivative, yield the uniform expansion $A=A^{(0)}+\epsilon A^{(1)}+O(\epsilon^2)$ under only $C^2$ regularity. This is the same independently checked row construction used above, not a sampled census or source truncation.

Multiply by $\rho$ in the tangential identity, and use $w/\rho=\omega$. In the quadratic identity the entire zeroth-order contribution integrates to zero through $U$. The two identities therefore imply

$$
0=\epsilon M+O(\epsilon^2),\qquad
M=\langle\omega C(h)\rangle,
$$

$$
0=\epsilon W+O(\epsilon^2),\qquad
W=\left\langle\frac{Pu^2+2Quv+Sv^2+Cw^2}{\rho^2}\right\rangle.
$$

The multiplying profiles and base velocities are uniformly bounded, so averaging preserves the error order. Either nonzero mean excludes sufficiently slow members of a fixed preparation. For exact sequences with uniform $C^2$ bounds, $C^1$ profile convergence, a common positive radius floor and convergent positive rates, $M,W$ converge continuously. Dividing by $\epsilon$ then forces both limiting means to vanish. $C^2$ convergence is also sufficient. Mere unspecified pointwise convergence should not be substituted for these derivative-control hypotheses. These two necessary means do not require any particular limit of $R\epsilon^2$ and do not establish sufficiency.

## Finite-positive-scale limiting equation and its normalization

Now impose the additional hypothesis $R\epsilon^2\to\lambda\in(0,\infty)$ and sufficient convergence to pass the acceleration equation to the limit, for example $C^2$ profile convergence with rates converging to positive limits. Let $\eta=\epsilon t/R$ be the base slow time, so the phase is $k\eta$. Dividing the prescribed acceleration by $\epsilon^2$ gives the ordinary cylindrical acceleration in $\eta$. The limiting equation is therefore

$$
\lambda\big(r_{\eta\eta}-r\theta_\eta^2,\;
2r_\eta\theta_\eta+r\theta_{\eta\eta},\;z_{\eta\eta}\big)
=(A_r^{(0)},0,A_z^{(0)}).
$$

Define $\chi=\eta/\sqrt\lambda=\epsilon t/(R\sqrt\lambda)$. Then $d/d\chi=\sqrt\lambda\,d/d\eta$; this removes the factor $\lambda$ from every acceleration component. The zero tangential equation yields $(r^2\dot\theta)^{\cdot}=0$ while $r>0$. Calling the constant $\ell$, the normalized equations are

$$
\ddot r=\frac{\ell^2}{r^3}+A_r^{(0)}(r,z),\qquad
\ddot z=A_z^{(0)}(r,z),\qquad
\dot\theta=\frac\ell{r^2}.
$$

Dots denote $\chi$ derivatives. The constant is a geometric first integral of this derived limit, not primitive angular momentum. Neither a zero nor an infinite limit of $R\epsilon^2$ is covered by this normalization.

When diagnosing a normalized orbit, its velocities obey $(\dot r,r\dot\theta,\dot z)=\sqrt\lambda(u,w,v)$. Accordingly the normalized torque integrand $\dot\theta C(z/r)$ has mean $\sqrt\lambda M$, and its normalized quadratic integrand has mean $\lambda W$. Their zeros and signs are unchanged, but their numerical values depend on the normalization. If a normalized radial/axial orbit has period $T$ and angle advance $\Delta\theta$, representation by phase period $2\pi$ requires $k\sqrt\lambda T=2\pi$ and $b/k=\Delta\theta/(2\pi)$. Freely chosen rates can be defined this way; preselected rates must satisfy these matching conditions.

The instantaneous acceleration is homogeneous of degree minus two. Thus spatial scaling can set a positive starting radius to one: for $a=r(0)$, define $\widetilde r(\chi)=r(a^{3/2}\chi)/a$, $\widetilde z(\chi)=z(a^{3/2}\chi)/a$ and $\widetilde\ell=\ell/\sqrt a$. These obey the same normalized equations. Scaling preserves zero initial velocities but cannot make nonzero radial and axial velocities vanish together. The simultaneous-turning-point initial data in the shooting proposal are consequently a restricted shape family.

## Quarter-orbit reflection and diagnostic parity

Suppose a regular normalized trajectory stays at positive radius, starts at $(r,z,\dot r,\dot z)=(1,H,0,0)$ with $H>0$, and reaches its first descending $z=0$ event at $\chi=q>0$ with $\dot r(q)=0$. Require an exact event and exact radial-velocity zero for the following construction. The reduced radial acceleration is even in $z$, the axial acceleration is odd in $z$, and the radial/axial system is reversible in time with fixed $\ell^2$. Define its second quarter by

$$
r(q+s)=r(q-s),\qquad z(q+s)=-z(q-s),\qquad 0\le s\le q.
$$

The endpoint conditions make the position and velocity continuous. Both reflected functions solve the same smooth differential equation, so uniqueness supplies the continuation; this is not a new event rule. At $2q$ the state is $(1,-H,0,0)$. Ordinary radial/axial time reversal about that turning point constructs the next two quarters and returns $(1,H,0,0)$ at $4q$. The radius remains positive on the reflected path because it retraces the first-quarter values. A first descending crossing identifies the selected quarter; it does not prove every periodic orbit has this form. The full angle is reconstructed separately with the chosen fixed $\ell$.

The functions $P,S,C$ are even in $h$ and $Q$ is odd. Under the first reflection, $(h,\dot r,\dot z)$ maps to $(-h,-\dot r,\dot z)$, while $r$ and $\dot\theta=\ell/r^2$ retain their values. Therefore $\dot\theta C(h)$ is unchanged, and every term of

$$
\mathcal W(\chi)=\frac{P(h)\dot r^2+2Q(h)\dot r\dot z+S(h)\dot z^2+C(h)(r\dot\theta)^2}{r^2}
$$

is unchanged. Under radial/axial time reversal both $\dot r$ and $\dot z$ change sign; the mixed product and all squares are again unchanged. Thus both diagnostic integrands have identical integrals on all four quarters. Their quarter average equals their full radial/axial period average. This parity argument applies to the normalized limiting equation; it does not assert time-reversal symmetry of the original finite-delay law.

After $4q$, radius, height and their velocities are periodic, while the planar angle has advanced by $\Delta\theta=\int_0^{4q}\ell/r^2\,d\chi$. Every member is rotated by this same angle. The complete six-path configuration is therefore relatively periodic; it is genuinely periodic after finitely many cycles when $\Delta\theta/(2\pi)$ is rational. A floating shooting zero, a near-return or repeated integration with the same solver proves neither the exact reflected orbit nor its continuation to finite-delay balance.

## Falsifiers, preservation and handoff

An incorrect simultaneous source contribution, mismatch of the two mixed coefficients, incorrect derivative of $U$, failed exact period identity, or wrong time-scale conversion would overturn the corresponding accepted formula. Failure of the endpoint symmetry conditions or loss of positive radius defeats the reflected-orbit construction. Derivative convergence and uniform bounds are premises of the limiting claims. A reduced periodic orbit satisfying both means remains a candidate: finite-delay exactness, complete residual control and any stability claim are separate obligations.

The complete analytical evidence is retained in this new file. No numerical shooting target, arithmetic checker, ignored runtime payload or background process was created, and no remote backup or replay is claimed. The only reviewer-owned authored change is `overnight2-b-independent-coupled-period.md`. The parent owns integration of the accepted formulas and the stated scope clarifications, while numerical candidate outputs remain separately unadjudicated. This bounded review stops after source and whitespace validation; the parent investigation continues.

Scoped validation: direct mathematical source review reconstructed the three source groups, the two period derivatives, the primitive, both time conversions and the reflection parities shown above. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostic for the new review file, and a final native `shasum -a 256` read matched the frozen subject identity. No regular tests, generator writes, Git mutations or recursive reviewers were introduced. These checks support the analytical review and file formatting only; they do not certify the numerical shooting experiment.
