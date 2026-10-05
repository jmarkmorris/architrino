# Complete finite-width antipodal-circle search protocol

Status: frozen before any numerical circle target in this assignment, 2026-10-05. The four equations are fixed: $K_{ij}=c_f=1$, triangular reception $\delta_h(z)=h^{-1}(1-|z|/h)_+$, $h\in\{1/16,1/32\}$, $\rho\in\{1/32,1/64\}$, self sign $+1$ and partner sign $-1$. No coefficients are fitted. The question is existence of complete all-time antipodal circles for these equations beyond the already proved exclusion $0<\beta\le\pi/2$. It is a boundary-solution question, with no incoming subfield preparation, causal capture or stability claim.

## Complete integral and balance equations

At a receiver $(R,0)$, put $\omega=\beta/R$, $\theta=\omega\tau$ and

$$
d_s(\tau)=R(1-\cos\theta,\sin\theta),\qquad
d_p(\tau)=R(1+\cos\theta,-\sin\theta).
$$

For channel $j=s,p$, let $r_j=|d_j|$, $\sigma_s=1$, $\sigma_p=-1$. The complete acceleration is

$$
(A_r,A_\theta)=\sum_{j=s,p}\sigma_j\int_0^{2R+h}\frac{d_j(\tau)}{(r_j(\tau)^2+\rho^2)^{3/2}}\delta_h(r_j(\tau)-\tau)\,d\tau.
$$

All older ages contribute zero because $r_j\le2R$ and $\tau>2R+h$ lies outside the triangular window. This finite endpoint is an exact complete-history support bound. A circle requires $A_\theta=0$ and $A_r=-\beta^2/R<0$. Diagnostic residuals are $F_1=R^2A_\theta$ and $F_2=RA_r+\beta^2$; simultaneous zeros, not a small tangential residual alone, define a candidate.

## Analytical exclusion before targets

Claim grade: derived. No circle in any of the four fixed laws can have $\beta\ge\pi/2$ and $0<R\le1/512$. The self radial contribution is nonnegative. The partner radial numerator is $R(1+\cos\theta)=r_p^2/(2R)\le2R$, its core denominator is at least $\rho^3$, the window is at most $1/h$, and the entire support has length $2R+h$. Therefore radial balance necessarily implies

$$
\beta^2\le\frac{2R^2}{\rho^3}\left(1+\frac{2R}{h}\right).
$$

The right side increases with $R$ and is largest among the selected laws at $\rho=1/64$, $h=1/32$. At $R=1/512$ it equals $9/4$. But $\beta^2\ge\pi^2/4>9/4$. This excludes the entire smallest-radius part of the assigned rectangle by an inequality, without quadrature. The general necessary inequality may also flag inadmissible target points; it does not otherwise prove tangential exclusion.

## Complete corner partition

The initial assigned rectangle is $\pi/2\le\beta\le8$, $2^{-16}\le R\le2$. The analytical result removes $R\le2^{-9}$. A diagnostic integrator on the remaining rectangle must split both channels at every chord cusp, every stationary point of $g_j(\theta)=r_j(\theta)-R\theta/\beta$, and every solution of $g_j=-h,0,h$, over $0\le\theta\le2\beta+\beta h/R$. These are the triangular support boundaries and its central corner as well as every chord cusp.

Each chord lobe has the exact form $r_j(\theta)=2R\sin((\theta-a)/2)$ on $[a,a+2\pi]$. Self lobes have $a=2\pi k$ and partner lobes have $a=(2k-1)\pi$. Their interiors satisfy $g_j''=-r_j/4<0$, with derivative $g_j'=R\cos((\theta-a)/2)-R/\beta$. For $\beta>1$ each lobe has exactly one stationary point at $a+2\arccos(1/\beta)$; for $0<\beta\le1$ it is monotone. Thus cusp and stationary splits produce monotone intervals on which each level $-h,0,h$ has at most one root. Bracketing endpoint signs on every such interval enumerates all level crossings; a level touching at a stationary endpoint is retained as that endpoint. The integration uses the union of these partitions. Root tolerances and quadrature estimates remain floating diagnostic quantities; complete analytical coverage of possible corners does not turn floating evaluations into interval proof.

## Known controls before targets

The new instrument must write a successful known-control receipt before a grid or root target can run. Controls are: a stationary distinct source at separation at least $h$, whose exact acceleration is its softened radial row; the zero-speed circle, whose self contribution and tangent are exactly zero and whose partner is stationary; and complete affine self motion at speeds $1/2$ and $2$, compared with the independently integrated closed form from the frozen binary source. The affine input has support $[0,h/|v-1|]$ and the antiderivatives of $\tau(v^2\tau^2+\rho^2)^{-3/2}$ and $\tau^2(v^2\tau^2+\rho^2)^{-3/2}$ supply the reference. These controls check normalization, polarity, both vector components and finite-width self inclusion. A monotone-circle corner control at $\beta=1,R=1$ must find one nonendpoint self support crossing and the partner's three levels in order; the previous analytic theorem also requires its tangent to be positive.

The instrument runs only under the mandatory shared virtual environment. It preserves old subjects and references and writes disjoint ignored receipts under `.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-width-circle-`.

## Frozen diagnostic target and candidate handling

The first grid uses 33 linearly spaced speeds from $\pi/2$ through $8$ and 33 geometrically spaced radii from $2^{-9}$ through $2$, separately for all four fixed laws. The lowest radius line is already analytically excluded but may be evaluated as a numerical control. Adaptive scalar quadrature integrates each Cartesian component on every partition interval, with requested absolute and relative tolerance $2\times10^{-9}$. Full self and partner sums, estimated errors, partition counts and residuals are retained. No grid finding is a global exclusion.

For each law, bounded two-variable searches may start at centers of grid cells whose corner residuals straddle zero in both components and at up to 24 grid nodes with the smallest residual norm. Searches use $(\beta,\log R)$, remain inside the declared rectangle, and use tolerances at most $10^{-10}$ for parameter convergence. A candidate requires both normalized residual magnitudes below $10^{-7}$ and independent quadrature refinement at requested tolerance $2\times10^{-12}$; these thresholds are diagnostic, not existence certificates. Duplicate candidates are consolidated by their parameter distance, retaining all seeds and failures.

Any apparent candidate is frozen and sent to the coordinator for independent method review before expensive certification. Existence requires complete integral enclosures and a two-dimensional inclusion or boundary-sign argument on a positive-radius parameter box, using a separately authored reference. If the numerical search finds no candidate, the result is a bounded diagnostic non-finding, not an exclusion. No perturbation spectrum or fate analysis begins before balance is independently certified and assessed.

Falsifiers of the analytical exclusion are a negative self radial term, a failure of the complete support bound, or a balanced circle violating the displayed necessary inequality. Falsifiers of the diagnostic partition are a missed lobe, cusp, stationary point or triangular level crossing. Numerical roots without enclosure, quadrature warnings or unresolved corner arithmetic must remain visible rather than become existence or exclusion claims.
