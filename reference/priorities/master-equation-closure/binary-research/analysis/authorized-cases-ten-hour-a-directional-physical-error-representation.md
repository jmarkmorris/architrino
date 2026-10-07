# Direct original-E error propagation with separate position and velocity blocks

**Status: derived prospective representation, not an implemented target or event claim.** This note identifies an exact way to evade the assumptions of the [scalar Cartesian norm obstruction](authorized-cases-ten-hour-a-cartesian-norm-obstruction.md). It preserves the original Section7 E equation, complete compatible preparation, original residual and every delayed source-acceleration contribution. It makes no stability claim about a nonequilibrium comparison curve.

## Exact current error equation

Fix one receiving slab with complete source support strictly before its left face. Let xc be the unchanged prescribed comparison and let x be the actual solution on the admitted incoming branch. Write xi=x−xc, eta=x'−xc'. Denote by Fc(t,z) the original E response at current positionz using the fixed prescribed comparison source history and its complete incoming partner root. This response is independent of current receiving velocity.

First subtract the nominal-source response at the actual receiving position from the actual response. Call the resulting exact vector gs(t). Then use the fundamental theorem of calculus only in current position:

$$
A(t)=\int_0^1 \partial_zF_c(t,x_c(t)+\theta\xi(t))\,d\theta.
$$

For the original residual d=xc''−Fc(t,xc), the exact error equation is

$$
\xi'=\eta,\qquad \eta'=A(t)\xi+g(t),\qquad g=g_s-d.
$$

A complete nominal-source position family enclosesA. The separately admitted source-family difference supplies a boundG≥|g| that retains complete sourceX,V,A and the original residual, for example G=Cx,source sX+Hv sV+B sA+delta under the existing full mean-value hypotheses. Nominal comparison jerk can enter the prescribed spatial-clock derivative; actual source jerk is not required. The source family, original residual and exact root census must remain paired with the same comparison and physical support.

The strongest inherited original rows supply Cartesian norm bounds X0,V0,A0. Direct inspection of their final row keys finds no signed endpoint component or cross-covariance certificate. Thus this representation starts from the product of the admitted position and velocity balls unless an independent stronger initializer is proved. It cannot infer a directional initial error from a numerical curve or from the transverse initializer.

## Exact variation of constants with a chosen comparison matrix

Choose a predetermined continuous2×2 matrix C(t) on the slab, and define its4×4 fundamental matrix Phi(t,s) by

$$
\partial_t\Phi(t,s)=\begin{pmatrix}0&I\\C(t)&0\end{pmatrix}\Phi(t,s),
\qquad \Phi(s,s)=I.
$$

This is a mathematical comparison instrument. ChoosingC does not alter the physical E response. Set e=(xi,eta). Variation of constants gives the exact identity

$$
e(t)=\Phi(t,L)e(L)+\int_L^t\Phi(t,s)
\binom{0}{g(s)+(A(s)-C(s))\xi(s)}\,ds.
$$

Write Phi in2×2 blocks Phi_xx,Phi_xv,Phi_vx,Phi_vv. If a separately valid whole-cell position boundX(s) is available and epsilon(s)≥||A(s)−C(s)||, then

$$
|\eta(t)|\le
\|\Phi_{vx}(t,L)\|X_0+\|\Phi_{vv}(t,L)\|V_0
+\int_L^t\|\Phi_{vv}(t,s)\|[G(s)+\epsilon(s)X(s)]\,ds.
$$

The corresponding position bound is

$$
|\xi(t)|\le
\|\Phi_{xx}(t,L)\|X_0+\|\Phi_{xv}(t,L)\|V_0
+\int_L^t\|\Phi_{xv}(t,s)\|[G(s)+\epsilon(s)X(s)]\,ds.
$$

These row-block bounds preserve conversion between position and velocity. Replacing all four blocks by one full-state logarithmic-norm exponential would lose that property and return to the earlier obstruction. Bounds for all t in the receiving cell are needed for geometry/source admission; an endpoint contraction alone cannot supply those whole-cell bounds. One may start with the frozen physical trialXstar in the integral, prove strict whole-cell containment, and use only already proven smaller X in a fixed finite refinement.

A piecewise constant or polynomialC is admissible if its fundamental matrix and both time arguments in the convolution kernels are enclosed rigorously, including every interface. Any numerical approximation must carry a separately bounded matrix residual and an independently controlled correction. A sampled matrix exponential or nominal eigenspectrum does not prove these inequalities. The original residuald is still present; a second residual for computingPhi must not be confused with it.

## Why the representation can reduce a velocity bound

As an analytically known mathematical control, take C=−kappa I, kappa>0, A=C andg=0. Direct differentiation gives

$$
\Phi_{vv}(t,L)=\cos(\sqrt\kappa h)I,
\qquad
\Phi_{vx}(t,L)=-\sqrt\kappa\sin(\sqrt\kappa h)I.
$$

At h=pi/(2sqrt(kappa)), the velocity bound is sqrt(kappa)X0, which is strictly belowV0 when sqrt(kappa)X0<V0. The full current-variable determinant is still1: reduced uncertainty in velocity can accompany increased uncertainty in position. This is an exact linear differential-equation control, not a proposed physical acceleration law or an import from standard physics.

Conversely, the equally elementary control C=+kappa I has Phi_vv=cosh(sqrt(kappa)h)I and cannot reduce the product-ball velocity bound. Thus the representation is not automatically useful merely because it avoids a scalar norm. The target must prove enough signed matrix structure, a sufficiently small mismatch epsilon and source forcingG, and a viable whole-position domain. Existing first-cell broad coefficient intervals alone have not established those premises.

## Decisive next test and limits

Before any receiving target, independently derive this identity and controls, then freeze a bounded signed matrix family over a fixed slab of the original comparison. The first useful test is whether the independently bounded right-hand side for endpointV is strictly below the inheritedV0 while every whole-cell position/source/root premise remains valid. If even the initial-ball contribution ||Phi_vx||X0+||Phi_vv||V0 is at leastV0, or the source/mismatch integral destroys the strict gain, record that exact failed bound. A longer endpoint sweep would not repair an unproved transition matrix.

This prospective route uses the existing old physical history without modifying it and may be formulated under the separate incoming-only stopping hypothesis because no current-u singular coordinate appears. It still cannot replace strict old-source speed margins by a non-strict value1, omit delayed source-A, change the original preparation, or turn an arbitrary comparison extension into an actual future. It supplies a concrete error representation and a decisive contraction test, not evidence that this original E case meets that test.
