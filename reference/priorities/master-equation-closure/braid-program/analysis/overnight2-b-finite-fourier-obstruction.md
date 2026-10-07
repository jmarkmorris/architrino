# Finite Fourier radius and phase cannot support a compact exact slow family

## Result and significance

Claim grade: derived, initially self-reviewed. Consider the canonical six-member slow histories under the common bounds of the [independently accepted compact-family theorem](overnight2-b-independent-compact-slow-scale.md): positive radius floor, bounded real periodic $C^2$ profiles, and base rotation and deformation rates in fixed compact subsets of $(0,\infty)$. Suppose additionally that the radius profile $\rho$ and periodic angular correction $p$ are trigonometric polynomials of fixed finite maximal degrees. The coefficients may vary with the small speed parameter. The height profile may be any real periodic function satisfying the common $C^2$ bound; no finite Fourier assumption on height is needed.

There is then a positive $\epsilon_0$, depending on the common bounds and degree limits, such that no exact member exists for $0<\epsilon<\epsilon_0$, at any scale $R>0$. This is a uniform asymptotic exclusion of the prescribed finite-degree class. It supplies no numerical threshold and does not exclude finite-speed solutions, increasing-degree representations, or profiles with the nonpolynomial phase modulation required by a varying radius.

The argument identifies a structural restriction in the earlier proposal parameterizations: the limiting angular equation requires $\rho^2(b+kp')$ to be constant. Two finite trigonometric polynomials cannot satisfy that reciprocal relationship with nonconstant positive radius. The resulting constant-radius limit is planar and has a strictly positive necessary torque mean.

## Extracting the limiting orbit

Suppose the conclusion fails. Then there are exact members with $\epsilon_n\to0$. The accepted compact-family theorem supplies a subsequence with
$$
R_n\epsilon_n^2\to\lambda\in(0,\infty),\qquad
b_n\to b>0,\qquad k_n\to k>0,
$$
and profiles converging in $C^2$. Exact balance supplies the derivative-convergence upgrade. The limit is a regular periodic radial/axial orbit of the normalized simultaneous equation and must satisfy the first-order necessary torque mean.

Fixed finite-degree trigonometric-polynomial spaces are closed under uniform convergence. For example each Fourier coefficient is a continuous integral of the profile, and every coefficient outside the fixed allowed frequencies is identically zero along the sequence. Hence the limiting $\rho$ and $p$ remain finite trigonometric polynomials of the declared maximal degrees. Their actual degrees may decrease, which causes no problem below.

The limiting tangential equation and positive mean rotation give
$$
\rho^2(b+kp')=\frac{\ell}{\sqrt\lambda}>0,
\qquad
\ell=\frac{\sqrt\lambda\,b}{\langle\rho^{-2}\rangle}>0.
$$
The phase correction $p$ is a real periodic function, so $\langle p'\rangle=0$.

## The finite-degree product forces constant radius and phase

Write $\omega=b+kp'$. This is a real trigonometric polynomial with positive mean $b$, so it is not the zero polynomial. If $\rho$ has actual positive degree $m$, its highest positive-frequency coefficient $c_m$ is nonzero; reality ensures that nonconstancy entails such a positive degree. Then $\rho^2$ has degree $2m$ and highest coefficient $c_m^2\ne0$.

If $\omega$ has positive degree $n$, let its highest coefficient be $d_n\ne0$. The coefficient of frequency $2m+n$ in $\rho^2\omega$ is exactly $c_m^2d_n\ne0$, because no lower pair of frequencies can reach that sum. If $\omega$ is constant, it equals $b>0$, and the coefficient at frequency $2m$ is $bc_m^2\ne0$. Either case contradicts the positive constant product.

Therefore $\rho=r_0$ is constant. The product relation then forces $\omega$ constant, and its mean makes $\omega=b$. It follows that $p'=0$. This elementary Fourier argument concerns exact functions, not cancellation within a sampled or truncated numerical product.

## Constant radius leaves only the planar circular limit

In normalized time the constant-radius radial equation is
$$
0=\frac{\ell^2}{r_0^3}+\frac{a_r(h)}{r_0^2},\qquad
h=z/r_0,
$$
where
$$
a_r(h)=\frac1{\sqrt3}-\frac1{(1+4h^2)^{3/2}}-\frac1{4(1+h^2)^{3/2}}.
$$
As a function of $x=h^2\ge0$ its derivative is
$$
\frac{d a_r}{dx}
=\frac6{(1+4x)^{5/2}}+\frac3{8(1+x)^{5/2}}>0.
$$
Since $\ell$ and $r_0$ are constant, the radial equation forces $h^2$ constant. Continuity then makes $z$ constant: a nonzero constant magnitude cannot change sign, while zero magnitude is identically zero. The axial equation
$$
\ddot z=-\frac{4z}{(r_0^2+4z^2)^{3/2}}
-\frac{z}{4(r_0^2+z^2)^{3/2}}
$$
forces that constant to be $z=0$. Thus the limiting orbit is planar with constant radius and phase rate. Its radial equation gives the familiar derived balance $\ell^2=(5/4-1/\sqrt3)r_0$; this does not make it an exact delayed orbit.

The independently established leading torque condition for an exact slow sequence is
$$
M_\chi=\ell\left\langle\frac{C(z/r)}{r^2}\right\rangle_\chi=0,
\qquad C(0)=\frac{19}{12}.
$$
At the only possible limiting shape, however,
$$
M_\chi=\frac{19\ell}{12r_0^2}>0.
$$
This contradiction proves that an exact sequence with $\epsilon_n\to0$ does not exist. If no uniform positive threshold existed, selecting an exact member with $\epsilon_n<1/n$ would give precisely such a sequence. Hence the stated existential $\epsilon_0$ follows.

## Application to the declared proposal classes

The original admitted box uses second harmonics for radius and phase; the wider box does likewise. The higher-harmonic proposal uses second and fourth harmonics for both. Their coefficients, positive radius floors and positive base-rate bounds are compact, so the theorem applies to each class when both physical rates are scaled to zero by the same positive $\epsilon$. The entire compact finite-degree class is excluded asymptotically, including the part left by the earlier rate-ratio corollary. No numerical value of “sufficiently slow” is asserted, and the theorem does not retroactively classify a particular finite-speed failed search as lying below that unknown threshold.

For a nonconstant admissible limiting radius, the exact angular relation instead requires
$$
p'=\frac bk\left(\frac{\rho^{-2}}{\langle\rho^{-2}\rangle}-1\right).
$$
This derivative has zero mean and defines a real periodic phase correction by integration. When $\rho$ is a nonconstant positive trigonometric polynomial, the preceding product argument proves that this derivative cannot itself be a finite trigonometric polynomial. The relation is a necessary representation choice for further slow-limit candidate work; it is not sufficient for either radial/axial balance or the two necessary delay means.

## Verification boundary and falsifiers

Independent review is pending. A failure of compact-family extraction, failure of finite-degree closure under uniform convergence, a cancellation defeating the displayed highest-frequency coefficient, a nonconstant regular axial motion with constant $h^2$, or a zero torque mean for the planar limiting circle would defeat the respective step. Every claim concerns exact equations and a fixed degree bound. Increasing the number of Fourier modes as $\epsilon\to0$, abandoning the common bounds, allowing a nonperiodic phase correction, or letting the mean rotation rate vanish changes the hypotheses. Finite Fourier approximations accompanied by controlled infinite tails are not exact finite-degree profiles and are not excluded by this theorem.

No new numerical target or instrument was needed. The failed searches and prior theorem subjects remain unchanged. The receiving account is the second-allocation report; independent disposition must be integrated there before this is reported as an accepted exclusion.
