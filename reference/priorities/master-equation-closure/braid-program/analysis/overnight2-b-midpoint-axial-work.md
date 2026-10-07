# Positive axial work from midpoint reflection at finite speed

## Proposed theorem

Claim grade: derived, pending independent reconstruction. Consider complete six-member prescribed histories
$$
X_j(t)=R\bigl(\rho(\phi)\cos[\beta t/R+j\pi/3+p(\phi)],\rho(\phi)\sin[\beta t/R+j\pi/3+p(\phi)],(-1)^jH\cos\phi\bigr),
\qquad \phi=\kappa t/R,
$$
with $R,H,\kappa>0$, real $\beta$, and real $2\pi$-periodic $C^2$ functions satisfying
$$
\rho(-\phi)=\rho(\phi),\qquad p(-\phi)=-p(\phi),\qquad
0<\rho_-\le\rho\le\rho_+.
$$
Suppose every physical path speed is bounded by one common $v_*<1$. Suppose also every normalized partner delay $\Delta=d/R$ satisfies
$$
0<\kappa\Delta<\pi.
$$
A sufficient explicit geometric condition for the latter is $2\kappa\sqrt{\rho_+^2+H^2}<\pi$. The equation remains canonical with $K=c_f=1$, all ordinary positive-delay partner and self roots, and no new multiplier, truncation or event rule.

Then the exact axial work mean of receiver zero is strictly positive:
$$
\left\langle V_zA_z\right\rangle_\phi>0,
\qquad V_z=-\kappa H\sin\phi.
$$
Here $A_z$ is the dimensionless canonical acceleration sum; physical acceleration is $A_z/R^2$. Exact acceleration balance would instead make this mean zero, because $A_z=R\kappa^2\zeta''$ with $\zeta=H\cos\phi$ and $\langle\zeta'\zeta''\rangle=0$. Thus no exact canonical history lies in this entire finite-speed reflection class, at any positive scale. No small-speed limit, finite Fourier degree, torque-zero assumption or numerical quadrature enters the claim.

The parity hypotheses include arbitrary smooth even radius modulation and arbitrary smooth odd phase correction. They are substantial restrictions: a general radius/phase pair with no common reflection center is outside the theorem. A shift of the phase origin is harmless if it makes the height a cosine and the other two parity conditions hold about that same origin.

## Ordinary complete-past roots

The positive radius floor keeps every present-time partner separation positive. Below-wake-speed source motion makes the causal gap strictly decreasing, with secant slope at most $-(1-v_*)$. Bounded complete positions force a crossing by normalized delay $2\sqrt{\rho_+^2+H^2}$ and exclude all more ancient roots. Thus there is one positive ordinary root per partner, no positive self root, and transmitter divisor $D_s\ge1-v_*>0$. This is the existing complete-past chart argument, applied to the stated bounded smooth profiles.

The forthcoming midpoint construction does not add or remove a root. It parameterizes the same unique roots using the midpoint height phase rather than the receiver height phase.

## Midpoint parameterization and reflection

Fix partner index $j\in\{1,\ldots,5\}$ and put $\sigma=(-1)^j$. Write
$$
\theta=\phi-\kappa\Delta/2,\qquad a=\kappa\Delta/2,
\qquad \phi_+=\theta+a,\quad \phi_-=\theta-a.
$$
The receiver and source radii are $\rho_+=\rho(\theta+a)$ and $\rho_-=\rho(\theta-a)$ in this paragraph; these local symbols are distinct from the global radius bounds. Their relative planar angle is
$$
\alpha_j=j\pi/3-\beta\Delta+p(\theta-a)-p(\theta+a).
$$
The squared dimensionless distance is
$$
S_j(\theta,\Delta)=\rho_+^2+\rho_-^2-2\rho_+\rho_-\cos\alpha_j
+H^2[\cos(\theta+a)-\sigma\cos(\theta-a)]^2.
$$
Evenness of radius swaps $\rho_+$ and $\rho_-$ when $\theta$ changes sign. Oddness of $p$ leaves the difference $p(\theta-a)-p(\theta+a)$ unchanged. For $\sigma=+1$ the axial difference is $-2H\sin\theta\sin a$; for $\sigma=-1$ it is $2H\cos\theta\cos a$. Their squares are even in $\theta$. Therefore $S_j(-\theta,\Delta)=S_j(\theta,\Delta)$.

For fixed midpoint time, increasing physical delay moves the receiver forward by half the increment and the source backward by half. The derivative of their separation vector is one half the sum of their physical velocities; its norm is at most $v_*$. Accordingly the midpoint gap $\sqrt{S_j}-\Delta$ is strictly decreasing with the same positive divisor floor. It has one positive root $\Delta_j(\theta)$ by the same endpoint bounds. Uniqueness and the even squared distance give
$$
\Delta_j(-\theta)=\Delta_j(\theta).
$$
The midpoint divisor
$$
D_m=1-\partial_\Delta\sqrt{S_j}(\theta,\Delta_j(\theta))
$$
is positive and even in $\theta$. At a root the separation is nonzero, so smooth implicit differentiation is valid. The derivative bound concerns the norm of the actual endpoint velocities; it is unaffected by the choice of rotating coordinates for displaying the squared distance.

## Exact change of phase measure

Let $g(\phi,\Delta)$ be the receiver-phase causal gap, and write $g_\phi$ for its partial derivative with fixed delay. Its delay derivative is $g_\Delta=-D_s$. The midpoint gap is $g(\theta+\kappa\Delta/2,\Delta)$, so
$$
D_m=D_s-\frac\kappa2g_\phi,\qquad
\frac{d\Delta}{d\theta}=\frac{g_\phi}{D_m}.
$$
It follows that
$$
\frac{d\phi}{d\theta}=1+\frac\kappa2\frac{d\Delta}{d\theta}
=\frac{D_s}{D_m}>0,
\qquad \frac{d\phi}{D_s}=\frac{d\theta}{D_m}.
$$
The unique midpoint root is $2\pi$-periodic, hence $\phi(\theta+2\pi)=\phi(\theta)+2\pi$. This strictly increasing lift covers one receiver phase period exactly. Integrating any periodic receiver-phase quantity over a full cycle therefore permits this change of variables without a missing interval or multiplicity factor. The transmitter weighting is essential to the displayed cancellation; replacing it by another law would require a different proof.

## Positive contribution from each partner

The axial contribution of source $j$ is $\sigma Q_z/(\Delta^3D_s)$, where $Q_z=H[\cos\phi-\sigma\cos(\phi-\kappa\Delta)]$. Multiply by $V_z=-\kappa H\sin\phi$ and change variables using the exact phase measure above.

For a same-parity source, $\sigma=+1$ and $Q_z=-2H\sin\theta\sin a$. The numerator becomes
$$
\sigma V_zQ_z
=2\kappa H^2\left[\sin^2\theta\sin a\cos a
+\sin\theta\cos\theta\sin^2a\right].
$$
For an opposite-parity source, $\sigma=-1$ and $Q_z=2H\cos\theta\cos a$, giving
$$
\sigma V_zQ_z
=2\kappa H^2\left[\sin\theta\cos\theta\cos^2a
+\cos^2\theta\sin a\cos a\right].
$$
For each source separately, $a(\theta)$, $\Delta_j(\theta)$ and $D_m(\theta)$ are even and periodic. The mixed terms proportional to $\sin\theta\cos\theta$ therefore integrate to zero over a symmetric full period. The remaining exact mean is
$$
\left\langle V_zA_{z,j}\right\rangle
=\frac{\kappa H^2}{2\pi}\int_{-\pi}^{\pi}
\frac{f_\sigma(\theta)\sin[\kappa\Delta_j(\theta)]}
{\Delta_j(\theta)^3D_m(\theta)}\,d\theta,
$$
where $f_{+1}=\sin^2\theta$ and $f_{-1}=\cos^2\theta$. Every denominator is positive and every sine of the delay phase is strictly positive by hypothesis. Each $f_\sigma$ is nonnegative and positive on an interval. Thus each of the five source means is strictly positive, and so is their sum.

This is not a positive pointwise axial acceleration claim: the sign proof is a full-period identity after exact reflection cancellation. It depends on including the correct transmitter divisor, and on ordinary complete-past root uniqueness.

## Verification boundary and falsifiers

Independent reconstruction is required. Check the endpoint-velocity sign in the midpoint gap, the identity $d\phi/D_s=d\theta/D_m$, the parity of the relative phase difference, both polarity-dependent axial numerators, and the factor in the final integral. A missing root, zero divisor, failure of the shared reflection center, or a delay phase reaching or exceeding $\pi$ removes a stated hypothesis. A history satisfying all hypotheses with nonpositive axial work would directly falsify the theorem.

The theorem applies at specified finite speeds subject to the stated inequalities. It does not require a numerical speed threshold, but it also does not cover arbitrary rapid height oscillations or arbitrary phase/radius asymmetry. The ongoing interval experiment permits small parity-breaking coefficients and third height harmonics, so it remains a separate broader coefficient-box target. Its result is not used as evidence for this analytical proof.

No numerical instrument or target was required for this derivation. Previous subjects and all runtime evidence remain frozen. The receiving account is the second overnight B report; independent adjudication and parent integration remain before acceptance.

## A uniform positive margin on compact subdomains

The identity supplies a quantitative margin when a common delay interval is available. Set
$$
d_- = \frac{\rho_-}{1+v_*},\qquad
d_+=2\sqrt{\rho_+^2+H^2},\qquad
0<\kappa d_-\le\kappa d_+<\pi.
$$
Here $\rho_-,\rho_+$ again denote the global radius bounds. Present-time separation and the below-wake-speed gap estimate give $\Delta_j\ge d_-$, while the bounded diameter gives $\Delta_j\le d_+$. Since $D_m\le1+v_*$, and the sine on an interval inside $(0,\pi)$ has minimum at an endpoint, put
$$
s_* = \min\{\sin(\kappa d_-),\sin(\kappa d_+)\}>0.
$$
Each integral of $f_\sigma$ over $[-\pi,\pi]$ is $\pi$, hence
$$
\left\langle V_zA_z\right\rangle
\ge\frac{5\kappa H^2s_*}{2d_+^3(1+v_*)}>0.
$$
This is a true mean lower bound, not a scalar criterion margin or a numerical estimate.

A sharper elementary form is available when $\kappa d_+\le1$. For $0\le x\le1$, $\sin x\ge x-x^3/6$; this follows, for example, by differentiating the remainder repeatedly from zero and using $1-\cos x\ge0$. Therefore
$$
\frac{\sin(\kappa\Delta_j)}{\Delta_j^3}
\ge\frac{\kappa[1-(\kappa d_+)^2/6]}{d_+^2}.
$$
The same integration gives
$$
\left\langle V_zA_z\right\rangle
\ge\frac{5\kappa^2H^2}{2d_+^2(1+v_*)}
\left[1-\frac{(\kappa d_+)^2}{6}\right]>0.
$$
If a family has a common positive height and deformation-rate floor and common strict chart/lag bounds, these formulas give a uniform margin across that family. Continuity alone then implies some nearby admissible histories retain the sign, but no numerical size of a parity-breaking neighborhood is asserted without a separate perturbation bound or interval certificate.
