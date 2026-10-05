# Cartesian robustness of the finite-width planar unit event

## Fixed cases and proposed conclusion

Keep each of the four separately fixed triangular reception laws $K_{ij}=c_f=1$, $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$, with the full self and opposite-polarity partner time integrals. The base is the complete compatible planar preparation in the [independently assessed unit-event construction](alternatives-screen-2026-10-05-width-planar-independent-assessment.md): half-separation $R=100$, tangential past speed $b=1/2$ and cubic patch width $\delta=2^{-24}$. Its actual unrestricted solution has a transverse first unit event before $1/6$ at separation greater than $199$.

**Derived candidate, pending independent review:** that first-event conclusion is open under sufficiently small complete compatible Cartesian perturbations, including perturbations that break mirror symmetry and leave the base plane. For every such perturbation, the earliest member unit event is finite, remains at separation greater than $198$, and is an upward transverse crossing. Both members have a transverse unit crossing close to the original event, though their crossing times need not agree. The complete supplied past remains separated and uniformly subfield. Constants and neighborhood radius are existential. This is robustness of a finite event, not robustness of binding or a statement about later fate.

No equation, length, self channel or boundary rule is changed. A strict-domain ceiling still stops at the first boundary; the unrestricted positive-core law supplies the continuation used to detect crossing. An inclusive ceiling has no selected equality response. The argument uses finite-time continuous dependence and the actual transversality theorem, rather than a spectrum about a prescribed circle.

## Complete-history topology and functional estimate

Let $X^0_i$ denote the base complete history and its actual future. Consider separated complete $C^{2,1}$ histories $\phi_i$ with

$$
\sup_{S\le0}\sum_{k=0}^2|\phi_i^{(k)}(S)-(X_i^0)^{(k)}(S)|<\epsilon,
$$

and exact endpoint acceleration compatibility for their own full law. Bounded differences are required; neither affine tail itself is bounded. The two particle perturbations are independent Cartesian functions. In particular no reflection, common center or invariant plane is imposed on the class. Release velocities are the histories' endpoint derivatives.

The complete positive-core bounds already derived for the fixed laws are, per source channel,

$$
B=\frac4{3\sqrt3\rho^2}+\frac2{h^2},\qquad
L=\frac2{\rho^3}+\frac4{3\sqrt3 h\rho^2}+\frac4{h^3}.
$$

They bound the full acceleration magnitude and the spatial Lipschitz integral over all source ages, including the remote affine tails. For clarity, split ages at $2h$. On the finite part, $\|D[z/(|z|^2+\rho^2)^{3/2}]\|\le\rho^{-3}$, the vector magnitude is at most $2/(3\sqrt3\rho^2)$, and the triangular window has height $1/h$ and Lipschitz constant $1/h^2$. On the infinite part, a nonzero window requires range at least age minus $h$, and the spatial derivative is bounded by $2/R^3$ while the magnitude is at most $1/R^2$. These integrable majorants supply $L$. Corners of the window are handled by its Lipschitz inequality, with no derivative at a corner assumed. Interpolating two position histories retains these same global estimates.

With two source channels per receiver, a conservative complete-history estimate is

$$
|\mathcal A_i(X)_T-\mathcal A_i(Y)_T|
\le\Lambda\max_j\sup_{S\le T}|X_j(S)-Y_j(S)|,\qquad \Lambda=4L.
$$

The full vector integral is defined at spatial coincidence as well, so this estimate does not need a root denominator or event cutoff. The already admitted global existence theorem gives both futures on every finite interval. The coupled integral equation and Gronwall therefore bound position and velocity differences uniformly through any fixed $T_1$ by $C(T_1)\epsilon$. One way to see this without assuming a first-order history norm is to combine the maximum past position difference and maximum current velocity difference into one scalar envelope; its integral inequality has coefficient $1+\Lambda$. The same functional estimate then bounds acceleration differences by $C'(T_1)\epsilon$. Thus actual positions, velocities and accelerations are uniformly close on every fixed finite interval. These are estimates for the two actual coupled futures, not an input comparison on shared prescribed histories.

## Localization and transverse first crossing

Let $T_*$ be the base first event, common to its two mirror members. The base proof supplies $T_*<1/6$, separation greater than $199$ and $d|V_i^0|/dT>1$ at $T_*$. The unrestricted solution has continuous acceleration. Choose $0<t_-<T_*<t_+$ sufficiently close that both base speeds are nonzero and strictly increasing on $[t_-,t_+]$, their derivatives exceed $3/4$, their endpoint speeds straddle one, and separation exceeds $198$ throughout $[0,t_+]$. The separation condition is possible because the base proof gives the stronger large-separation bound before the first event, and continuity extends it slightly afterward.

On the compact interval $[0,t_-]$, the base speed has a strict margin below one, since $T_*$ is its first event. Finite-time closeness preserves that margin and the two strict endpoint inequalities for every sufficiently small perturbation. It also preserves separation greater than $198$. For nonzero speed,

$$
\frac{d}{dT}|V_i|=\frac{V_i\cdot A_i}{|V_i|}.
$$

Uniform velocity and acceleration closeness therefore keeps this derivative above $1/2$ on $[t_-,t_+]$. Each member has exactly one unit crossing in that interval, and none earlier. The earlier of those two crossings is the pair's first boundary event, with the stated positive separation and upward derivative. The simultaneous mirror event may split, so simultaneity is not claimed to be open.

The neighborhoods can be intersected across the four fixed laws if desired, since the list is finite. This gives an existential common perturbation size, without a numerical estimate. The laws and their separate base solutions are not identified with one another by this observation.

## The compatible class contains nonsymmetric perturbations

Endpoint compatibility is a constraint, but it does not make the asserted neighborhood empty outside mirror symmetry. Start with any sufficiently small complete $C^{2,1}$ Cartesian perturbations $\psi_i$ of the base past, with bounded first two jets; they may have compact support and independent out-of-plane components. Define the fixed patch

$$
C_\delta(S)=\frac{(S+\delta)_+^3}{6\delta},\qquad S\le0,
$$

and histories $\phi_i^B=X_i^0+\psi_i+C_\delta B_i$, with independent vectors $B_1,B_2$. The patch is zero before $-\delta$, has maximum magnitude $\delta^2/6$ and endpoint second derivative one. Compatibility is exactly the six-dimensional fixed-point equation

$$
B_i=\mathcal A_i(\phi^B)_0-A_i^0(0)-\psi_i''(0).
$$

The preceding complete-history bound gives contraction constant at most $\Lambda\delta^2/6<1/2$ for every selected fixed law. For example, the worst fixed parameters have $L<2^{20}$ and $\Lambda<2^{22}$, whereas $\delta^2=2^{-48}$. The map at zero tends to zero with the size of $\psi$, and its Lipschitz constant is uniform. A small closed vector ball is therefore invariant and has a unique fixed point, with $B\to0$ as $\psi\to0$. The resulting histories converge to the base in the stated complete $C^2$ norm and match the actual release acceleration exactly.

Choose a perturbation supported before $-\delta$ on just one member, with a nonzero component normal to the base plane, and with a separate in-plane or normal pulse on an independent earlier interval if needed. The endpoint correction vanishes on those intervals and cannot restore the original mirror relation or impose one common plane. Smallness preserves complete past separation and its strict speed margin. This exhibits nontrivial nonsymmetric compatible histories within the proved relative neighborhood; it is not merely a rigid translation or rotation of the base.

## Scope and falsifiers

The theorem concerns robustness of the finite transverse unit event of these exact fixed large-separation preparations. It does not prove the same event for all near-circular data, determine subsequent planar or Cartesian fate, establish a stable or persistent binary, or transfer the collinear passage/escape result to three dimensions. It uses the global softened law only where explicitly selected. Falsifiers include failure of the complete-age Lipschitz bound, a compatible sequence converging in the stated history norm whose first crossings fail to approach the base event, loss of the positive separation or work margin despite the finite-time bounds, or a noncontractive compatibility correction under the displayed constants.

This new analytical source is frozen before separate review. No new numerical target or instrument is required, and no earlier source is overwritten. Mathematical assumptions and coefficient choices are fixed above, so any future numerical neighborhood estimate would be a distinct, prospectively specified calculation.
