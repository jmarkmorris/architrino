# A growing planar mode of the sharp capped circular binary

**Date:** 2026-09-16; analytic confinement integrated 2026-09-26. **Grade:** derived existence of a positive real characteristic root and confinement of every nonnegative-real-part root to $|z|<3$; measured floating-point location only. **Scope:** isolated antipodal opposite-polarity pair, zero self response, $c_f=c_a=1$, complete sharp partner row, active ceiling projection. This is linear instability of the stated variational system, not by itself a nonlinear instability theorem or an evolved trajectory. The exact root count and positive-root multiplicity remain unproved.

## 1. Rotating coordinates and the speed constraint

The base circle is the exact solution of radius $R_\ast=K/[4D(1+\sin D)]$, where $D=\cos D$. Its complete capped acceleration balances its curvature. Use dimensionless time $\tau=t/R_\ast$, and write an antipodal position variation as

$$
\mathbf u_A=R_\ast[a(\tau)\mathbf e_r+b(\tau)\mathbf e_\theta],\qquad \mathbf u_B=-\mathbf u_A.
$$

Primes below mean $d/d\tau$. The velocity variation is $(a'-b)\mathbf e_r+(a+b')\mathbf e_\theta$. Tangency to the unit-speed boundary requires $a+b'=0$. Thus for a characteristic mode $b=e^{z\tau}$, choose $a=-z e^{z\tau}$ and radial velocity coefficient $q=-(1+z^2)$. This restriction is a first-order speed constraint, not a claim that the finite-amplitude linear path has exactly unit speed. General speed-interior and non-antipodal disturbances are not included.

The base angular delay is $2D$. Put $C=\cos D=D$, $S=\sin D$, $J=1+S$, and $E=e^{-2Dz}$. In the receiver's rotating basis, the partner separation direction is $(C,-S)$. Inserting the exponential mode into the [sharp row variation](planar-circle-sharp-first-variation.md) yields the two displacement components along that direction and its perpendicular:

$$
N=-Cz-S+E(-Cz+S),\qquad M=-Sz+C+E(Sz+C).
$$

The emission-time shift is $\delta s/R_\ast=-N/J$. The resulting dimensionless radial raw-acceleration variation is

$$
B(z)=\frac{1-2S}{2C^2}M+\frac{3}{2CJ}N+\frac{ECq}{J}.
$$

This includes changed emission time, source velocity at the changed time, direction, range and transmitter weight. The ceiling's radial variation subtracts $qS/C$. The acceleration of the perturbed position has radial coefficient $-z(1+z^2)$. Therefore the characteristic equation is

$$
F(z):=-z(1+z^2)-B(z)+q\frac SC=0.
$$

The tangential equation is automatically the derivative of the speed constraint: its two sides equal $q$. No additional independent tangential equation has been dropped. The antipodal subspace excludes common translations; $z=0$ represents the remaining circular phase shift.

## 2. Existence of a growing mode without numerical root certification

Direct substitution gives $F(0)=0$. At zero, $N=0$, $M=2C$, $q=-1$, and

$$
N'=-2CJ,\qquad M'=-2C^2,\qquad q'=0,\qquad B'(0)=-2.
$$

Consequently $F'(0)=1$. Thus $F(z)>0$ for sufficiently small positive real $z$. At large positive $z$, $E\to0$ and

$$
F(z)=-z^3-\frac SCz^2+O(z)\longrightarrow-\infty.
$$

Continuity therefore proves at least one strictly positive real characteristic root. This is a growing mode of the actual sharp delayed linearization, distinct from the phase mode. It is not inferred from the earlier initial-radius response or from a prescribed oscillation.

## 3. Reproducible arithmetic witness

The explicit-use [Node instrument](../../../../../scripts/field-speed-ceiling/planar-circle-growing-mode.mjs) first passed an independent bisection known case at $\sqrt2$, then recovered the exact neutral phase mode to $1.12\times10^{-16}$ before evaluating the positive root. Running `node scripts/field-speed-ceiling/planar-circle-growing-mode.mjs` gave

$$
z_+\approx0.4101718079817861,\qquad F(0.2)\approx0.1062785735,\qquad F(0.5)\approx-0.1205892704.
$$

Its physical growth rate in normalized units is $z_+/R_\ast$. Over one base period $2\pi R_\ast$, the linear mode's amplitude multiplier is approximately $e^{2\pi z_+}=13.1600$. This multiplier concerns the linear mode while the small-variation description is valid. It is neither a finite-amplitude orbit prediction nor a validated nonlinear simulation. The instrument uses ordinary floating point, not directed-rounding certification. Analytic sign and continuity arguments above establish existence; the instrument supplies an approximate location and does not prove uniqueness or survey the complex spectrum.

### 3.1. Analytic confinement of nonnegative-real-part roots

The characteristic equation itself confines the relevant spectrum to a bounded region. For $\operatorname{Re}z\ge0$, put $r=|z|$. Since $D>0$, the delay factor obeys $|E|\le1$, and the definitions in §1 give

$$
|q|\le1+r^2,\qquad |M|\le2Sr+2C,\qquad |N|\le2Cr+2S
$$

These estimates bound each term of $F+z^3$ separately. In particular,

$$
\begin{aligned}
|F(z)+z^3|
&\le r+\frac{|1-2S|}{2C^2}(2Sr+2C)
+\frac{3}{2CJ}(2Cr+2S)
+\left(\frac CJ+\frac SC\right)(1+r^2)\\
&=a_2r^2+a_1r+a_0
\end{aligned}
$$

Here the three positive coefficients are

$$
a_2=\frac CJ+\frac SC,\qquad
a_1=1+\frac{|1-2S|S}{C^2}+\frac3J,\qquad
a_0=\frac CJ+\frac SC+\frac{|1-2S|}{C}+\frac{3S}{CJ}
$$

Rational enclosures suffice to control these coefficients, so no sampled coefficient or root search is needed. Alternating Taylor bounds give

$$
\cos(0.73)\ge1-\frac{0.73^2}{2}>0.73,\qquad
\cos(0.75)\le1-\frac{0.75^2}{2}+\frac{0.75^4}{24}<0.75
$$

Since $x-\cos x$ is strictly increasing on this interval, its root satisfies $0.73<C=D<0.75$. Sine is increasing there, and the same Taylor bounds imply

$$
\sin(0.73)\ge0.73-\frac{0.73^3}{6}>0.66,\qquad
\sin(0.75)\le0.75-\frac{0.75^3}{6}+\frac{0.75^5}{120}<0.69
$$

Thus $0.66<S<0.69$, $J>1.66$, and $|1-2S|<0.38$. Every terminating decimal in the following inequalities denotes its exact rational value:

$$
a_2<\frac{0.75}{1.66}+\frac{0.69}{0.73}<1.40,\qquad
a_1<1+\frac{0.38\cdot0.69}{0.73^2}+\frac3{1.66}<3.31
$$

$$
a_0<1.40+\frac{0.38}{0.73}+\frac{3\cdot0.69}{0.73\cdot1.66}<3.64
$$

Define $P(r)=r^3-1.40r^2-3.31r-3.64$. Direct rational arithmetic gives $P(3)=0.83>0$ and $P'(3)=15.29>0$, while $P''(r)=6r-2.80>0$ for $r\ge3$. Therefore $P$ stays positive on that interval, and $r^3>a_2r^2+a_1r+a_0$. A zero of $F$ would instead require $|F+z^3|=r^3$, contradicting the bound above. Consequently **every characteristic root with $\operatorname{Re}z\ge0$ satisfies $|z|<3$**.

This derived exclusion closes the outer-domain question. It does not count the roots inside the disk. The [review reassessment](planar-circle-instability-review-reassessment.md#33-an-analytic-spectral-bound-and-an-uncertified-numerical-count) records a previously reported winding near two on a rectangle containing this region. Its scratch instruments are retained with their control gaps in the [instrument retention receipt](../evidence/planar-circle-review-instrument-retention.md). Their floating-point samples do not prove a complete count, uniqueness or simplicity of the positive root, absence of other center roots, or a one-dimensional unstable manifold. The exact spectral conclusions remain a simple phase root, because $F'(0)=1$, at least one positive real root, and the confinement just proved. A complete count would additionally need a justified nonvanishing enclosure along an entire contour and a validated total argument change, including control between sample points.

## 4. Consequence and remaining proof boundary

The [heading-coordinate nonlinear proof](planar-circle-nonlinear-instability.md) owns the realization of the growing tangent by admissible histories and the transfer to local nonlinear instability. Its checked theorem applications and their hypotheses are stated there. The linear calculation here neither determines nonlinear continuation after local departure nor asserts that every nearby history departs. It supplies an expanding direction without requiring a complete spectrum count or a claim about the dimension of the unstable manifold.

The exact circular configuration is not linearly restoring in every admitted boundary-tangent direction: its sharp delayed variational system has an antipodal planar growing mode. Because the base forward component is strictly positive, sufficiently small smooth boundary-preserving perturbations keep the same projection branch locally; root floors likewise persist locally. These facts support the relevance of the branch calculation but do not by themselves establish a differentiable constrained solution map on a compatible history space.

A nonlinear instability claim requires compatible finite-amplitude histories realizing this tangent and a justified local solution or growth argument, as developed in the linked proof. Any claimed quantitative growth over a prescribed time interval also requires control over that interval. Eventual separation, collision, elliptical motion, saturation, or departure from the ceiling is not determined by this spectrum calculation.

**Verification and falsifiers:** the derivation differentiates the exact balanced circular solution, preserves its full partner row, and includes both source-time and projection variations. The phase root, the explicit derivative $F'(0)=1$, the large-positive-$z$ sign, and the rational coefficient bounds supply checkable analytical tests. A missing term in the delayed or cap derivative would overturn the characteristic equation; a root of the stated $F$ with nonnegative real part and modulus at least 3 would contradict the confinement proof. Failure to realize the tangent in admissible nonlinear histories would block transfer to nonlinear instability without changing the stated linear-system result. No smoothing or additional reception rule enters.
