# A growing planar mode of the sharp capped circular binary

**Date:** 2026-09-16. **Grade:** derived positive real characteristic root of the boundary-branch delayed linearization; measured floating-point location only. **Scope:** isolated antipodal opposite-polarity pair, zero self response, $c_f=c_a=1$, complete sharp partner row, active ceiling projection. This is linear instability of the stated variational system, not yet a nonlinear instability theorem or an evolved trajectory.

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

The explicit-use [Node instrument](../../../../scripts/field-speed-ceiling/planar-circle-growing-mode.mjs) first passed an independent bisection known case at $\sqrt2$, then recovered the exact neutral phase mode to $1.12\times10^{-16}$ before evaluating the positive root. Running `node scripts/field-speed-ceiling/planar-circle-growing-mode.mjs` gave

$$
z_+\approx0.4101718079817861,\qquad F(0.2)\approx0.1062785735,\qquad F(0.5)\approx-0.1205892704.
$$

Its physical growth rate in normalized units is $z_+/R_\ast$. Over one base period $2\pi R_\ast$, the linear mode's amplitude multiplier is approximately $e^{2\pi z_+}=13.1600$. This multiplier concerns the linear mode while the small-variation description is valid. It is neither a finite-amplitude orbit prediction nor a validated nonlinear simulation. The instrument uses ordinary floating point, not directed-rounding certification. Analytic sign and continuity arguments above establish existence; the instrument supplies an approximate location and does not prove uniqueness or survey the complex spectrum.

## 4. Consequence and remaining proof boundary

**Subsequent result, 2026-09-16:** the [heading-coordinate nonlinear bridge](planar-circle-nonlinear-instability.md) addresses the requirements below and derives local nonlinear instability in the active-boundary antipodal class using the state-dependent-delay solution and unstable-manifold theorems. It does not establish nonlinear continuation after local departure or a result for every nearby history. This earlier packet remains the linear calculation; the additional theorem application is owned by the linked proof, with the independent review and corrections now linked there.

The exact circular configuration is not linearly restoring in every admitted boundary-tangent direction: its sharp delayed variational system has an antipodal planar growing mode. Because the base forward component is strictly positive, sufficiently small smooth boundary-preserving perturbations keep the same projection branch locally; root floors likewise persist locally. These facts support the relevance of the branch calculation but do not by themselves establish a differentiable constrained solution map on a compatible history space.

A nonlinear instability claim still requires compatible finite-amplitude histories realizing this tangent, local differentiability or a direct nonlinear growth estimate, and control through the period over which the claimed growth is measured. Eventual separation, collision, elliptical motion, saturation, or departure from the ceiling is not determined here. The next useful investigation is that admissibility and nonlinear bridge, rather than assuming the circle is a stable binary or searching for Kepler-like ellipses by analogy.

**Verification and falsifiers:** the derivation differentiates the exact balanced circular solution, preserves its full partner row, and includes both source-time and projection variations. The phase root, the explicit derivative $F'(0)=1$, and the large-positive-$z$ sign supply checkable analytical tests. A missing term in the delayed or cap derivative would overturn the characteristic equation; failure to realize the tangent in admissible nonlinear histories would block transfer to nonlinear instability without changing the stated linear-system result. No smoothing or additional reception rule enters.
