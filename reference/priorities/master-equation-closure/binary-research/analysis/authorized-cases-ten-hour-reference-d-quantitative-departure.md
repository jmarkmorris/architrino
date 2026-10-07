# Independent quantitative N02 neighborhood reference

**Derived, conditional on the accepted exact reference and physical flow.** This note is frozen before reading a new quantitative subject. Its inputs are the [accepted circle-flow assessment](authorized-cases-ten-hour-reference-d-circle-adjudication.md) and its independently checked eight-root reference. It adds no spectral or numerical evidence. The physical preparations retain the same complete remote circular past, the existing cutoff, and exact endpoint compatibility repair. The growing tangent is in the mirror sector; the preparations themselves are nonmirror.

## Constants and a cone

Fix a time step $T>H$ and a physical-compatible manifold chart centered at the circle. Use the accepted outer spectral splitting $E_u\oplus E_c$, including every faster mode, and the maximum of adapted norms. Write $z=(u,s)$ and the local time map as $P(z)=Az+R(z)$, where

$$
\|A_u u\|\ge a\|u\|,\qquad \|A_c s\|\le b\|s\|,
\qquad a>\max(1,b),\qquad
\|R(z)\|\le\omega(r)\|z\|\quad(\|z\|\le r).
$$

Here $\omega(r)\to0$ follows from $C^1$ differentiability; no quadratic flow remainder is assumed. Select $r$ with $2\omega(r)<a-b$ and $\omega(r)<a-1$, and put $\gamma=a-\omega(r)>1$. On the closed cone $\|s\|\le\|u\|$, the next unstable norm is at least $\gamma\|u\|$, whereas the next complementary norm is at most $(b+\omega(r))\|u\|<\gamma\|u\|$. Thus the cone is forward invariant as long as the local map applies. Put $M=\|A\|+\omega(r)$ for an upper step bound.

The chart and finite-time flow have local comparison/Lipschitz constants $L_c,L_P,L_f$. These are finite after restricting to a sufficiently small chart. Choose a threshold $\rho>0$ with $M\rho<r$ and with $L_fM\rho$ strictly inside the physical root chart, including its compact root-free complement, signed denominator bounds and fixed remote-tail exclusion. This ensures existence and the entire eight-root census through every intermediate time of the step on which the cone first reaches $\rho$.

## The prepared curve and open balls

Let $h_\eta$ be the accepted physical-compatible curve with common endpoint velocity $\eta^2d$, $d\ne0$. Its full-window tangent is truncated. The accepted variational argument says that after the first time step its chart image is

$$
P(h_\eta)=\eta q_T+o(|\eta|),\qquad
q_T=e^{\lambda T}q\in E_u,\qquad m=\|q_T\|>0.
$$

This statement uses the fact that the truncated-minus-full tangent vanishes on the entire sampled initial delay interval; it is not an eigenvector assertion about the original full window. For sufficiently small nonzero $\eta$, require the remainder norm to be at most $m|\eta|/8$. These are explicit modulus requirements, not an unproved $O(\eta^2)$ estimate.

Define balls using the physical-history norm and take them relative to the exactly compatible, kinematically physical histories with the prescribed remote past fixed. Endpoint common velocity is a bounded linear functional with norm $L_e$. Choose any constant

$$
0<c<\frac{\|d\|}{2L_e}.
$$

Every member of the relative open ball $B(h_\eta,c\eta^2)$ has nonzero common endpoint velocity, of norm at least $\eta^2\|d\|/2$, so it is genuinely nonmirror even after any fixed spatial translation. This assertion is about the initial history; asymmetry need not persist forever.

Also require $L_cL_Pc\eta^2\le m|\eta|/8$. The first returned chart state of every history in this ball then obeys

$$
\frac{3m}{4}|\eta|\le\|u_0\|\le\frac{5m}{4}|\eta|,
\qquad \|s_0\|\le\frac m4|\eta|\le\frac13\|u_0\|.
$$

Each ball is nonempty because it contains its center; openness is relative to the physical compatibility set with fixed remote past, not to independent arbitrary position/velocity functions. The complete-root chart must also contain the initial ball and its first time step, which is another smallness condition on $\eta$ supplied by continuity.

## Uniform orbital departure and time

Let $N$ be the first step with $\|u_N\|\ge\rho$, assuming $5m|\eta|/4<\rho$. The cone estimate gives

$$
N\le\left\lceil
\frac{\log\bigl(4\rho/(3m|\eta|)\bigr)}{\log\gamma}
\right\rceil,
\qquad \rho\le\|u_N\|\le M\rho,
\qquad t_{\rm exit}\le T(1+N).
$$

The initial extra $T$ is the tangent-recovery step. This is an $O(\log(1/|\eta|))$ upper bound uniformly over each indicated ball. It does not compute a numerical departure time.

To convert chart size into orbital distance, use the accepted fact that every rigid symmetry tangent has zero unstable projection. In a merely $C^1$ chart the unstable projection of the nearby symmetry orbit satisfies $\|u_{\rm orb}\|\le\alpha(\|z_{\rm orb}\|)\|z_{\rm orb}\|$ with $\alpha(r)\to0$. A chart obtained by linear projection gives the stronger quadratic estimate, but it is unnecessary. Choose $\rho$ smaller if needed so that $\alpha((M+1)\rho)(M+1)<1/2$. An orbit point within chart distance $\rho/2$ of the exit would have norm at most $(M+1)\rho$, unstable projection below $\rho/2$, and hence unstable difference greater than $\rho/2$, a contradiction. Local chart comparison supplies a fixed positive physical orbital departure distance. Far orbit representatives cannot approach this neighborhood by the accepted compact-rotation/bounded-translation argument. This uses no boost symmetry.

## Remaining quantitative obligations

The theorem is conditional quantitative mathematics, with all constants explicitly located but not numerically evaluated. A numerical history radius or departure-time certificate still requires a certified spectral cutoff and projection norms, adapted $a,b$, $m$, the compatibility-chart and first-step constants, a usable derivative modulus $\omega$, the curve's first-step remainder modulus, the symmetry-orbit modulus, and a common finite-time chart radius protecting all root brackets and their complement. Existing exact balance and one positive root do not provide those numbers automatically.

Falsifiers are failure of any displayed modulus or root-chart inequality, a symmetry tangent entering $E_u$, treating the truncated tangent as a full-window eigenvector, or replacing the $C^1$ remainder by a quadratic estimate without proof. No target computation was run and no process was launched for this note.
