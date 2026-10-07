# Finite Fourier radius and height in the simultaneous limiting equation

## Proposed result and scope

Claim grade: derived, pending independent reconstruction. In the normalized simultaneous limiting equation for the six-member class, a regular periodic orbit whose radius $r>0$ and height $z$ are both real trigonometric polynomials in time must be the planar constant-radius circle. This assertion places no finite-degree assumption on the angular phase. Combined with the independently accepted compact-family extraction and positive planar torque mean, it excludes compact exact slow families with fixed maximal Fourier degrees for radius and height, even when their periodic angular correction has a nonzero infinite Fourier tail.

The scenario is unchanged: $K=c_f=1$ and the canonical equation. Complex continuation below is a mathematical test of a proposed exact trigonometric identity, not a complex-valued physical path. No standard-physics law or finite-delay first integral is imported. The result concerns the simultaneous limit; no specified positive-speed search member is classified without an explicit small-speed threshold.

## Limiting axial equation

Let $\chi$ denote the normalized limiting time, and write $\phi=\Omega\chi$ for a fixed $\Omega>0$. Suppose $r(\phi)$ and $z(\phi)$ are real finite trigonometric polynomials, with $r(\phi)>0$ for every real phase. The axial equation is
$$
\Omega^2 z_{\phi\phi}=-\frac{4z}{(r^2+4z^2)^{3/2}}-\frac{z}{4(r^2+z^2)^{3/2}}.
$$
Both radicands are strictly positive on the real phase circle. The physical square roots there select analytic germs uniquely.

We first prove that any nonconstant pair $(r,z)$ with positive radius makes each radicand nonconstant. This removes an apparent exception in the growth argument at complex infinity.

## A constant sum of two squares forces constant positive radius

For any fixed $c>0$, suppose $r^2+cz^2=C$ is constant. Positivity of $r$ gives $C>0$. Put $w=e^{i\phi}$ and regard $r,z$ as Laurent polynomials in $w$. Factor
$$
(r+i\sqrt c\,z)(r-i\sqrt c\,z)=C.
$$
If two nonzero Laurent polynomials multiply to a nonzero constant, each is a monomial. To see this directly, let the lowest and highest exponents of the first be $a,A$ and of the second $b,B$. The product has nonzero extreme terms at $a+b$ and $A+B$, so both equal zero. Thus $(A-a)+(B-b)=0$; both nonnegative widths vanish. Consequently
$$
r+i\sqrt c\,z=\alpha w^j,\qquad r-i\sqrt c\,z=\gamma w^{-j},\qquad\alpha\gamma=C.
$$
Reality on the unit circle makes the second factor the conjugate of the first, hence $\gamma=\overline\alpha$. It follows that
$$
r(\phi)=\operatorname{Re}(\alpha e^{ij\phi}).
$$
If $j\ne0$, this radius changes sign and cannot remain positive. Therefore $j=0$ and both $r$ and $z$ are constant. This proves the claim for $c=4$ and $c=1$ separately.

## Nonconstant height contradicts growth at complex infinity

Assume $z$ is nonconstant and let its highest positive Fourier degree be $n\ge1$. Reality guarantees a nonzero coefficient $z_n$ at that exponent. Both radicands
$$
Q_4(w)=r(w)^2+4z(w)^2,\qquad Q_1(w)=r(w)^2+z(w)^2
$$
are nonconstant by the preceding lemma. Each is a real trigonometric polynomial on the unit circle; therefore each has a highest positive degree $d_4,d_1\ge1$, respectively. Their leading coefficients need not be positive or real, but are nonzero. On a ray to infinity away from all finite zeros,
$$
z(w)=z_nw^n(1+O(w^{-1})),\quad
Q_j(w)=q_jw^{d_j}(1+O(w^{-1})).
$$
With $\partial_\phi=iw\partial_w$,
$$
\frac{z_{\phi\phi}(w)}{z(w)}\longrightarrow-n^2.
$$
Meanwhile each analytically continued inverse square power $Q_j^{-3/2}$ tends to zero in magnitude, at rate $|w|^{-3d_j/2}$. Its branch sign has no effect on this decay.

For precision about continuation, start at a point of the unit circle where $z\ne0$. The real-phase axial identity extends to a holomorphic germ there by the identity theorem. Remove zero and the finitely many zeros of $z,Q_1,Q_4$ from the complex plane. A path from the starting point to an unbounded ray can avoid this finite set. Continue the two square-root germs along that path, then along a simply connected thin sector about the ray beyond every finite zero. The same axial identity continues there. No globally single-valued square root on the punctured plane is required.

Divide the continued equation by $z$ on the sector and take $|w|\to\infty$. Its left side tends to $-\Omega^2n^2\ne0$, while its right side tends to zero. This contradiction rules out nonconstant trigonometric-polynomial height.

## Constant height and the remaining planar radius

If $z$ is constant, the real axial equation becomes
$$
0=-z\left[\frac4{(r^2+4z^2)^{3/2}}+\frac1{4(r^2+z^2)^{3/2}}\right].
$$
The bracket is strictly positive, so $z=0$. The limiting radial equation is then
$$
\Omega^2r_{\phi\phi}=\frac{\ell^2}{r^3}-\frac{c_0}{r^2},\qquad c_0=\frac54-\frac1{\sqrt3}>0.
$$
If the real positive trigonometric polynomial $r$ has positive degree $m$, then at complex infinity $r\sim r_mw^m$ and $r_{\phi\phi}\sim-m^2r_mw^m$, while both rational terms on the right decay. This rational identity has no square-root branch issue; continue it away from the finite zeros of $r$. The growth contradiction forces $r=r_0$ constant. The equation then gives $\ell^2=c_0r_0$. In particular $\ell\ne0$. The limiting angular equation gives constant angular rate $\ell/r_0^2$.

Thus the only regular periodic limiting orbit in the stated finite radius/height class is planar and circular. This does not assert that it is an exact delayed solution.

## Uniform compact slow-family consequence

Take the hypotheses of the [independent compact slow-family theorem](overnight2-b-independent-compact-slow-scale.md), including positive radius floor, common $C^2$ profile bounds, and compact positive base rotation/deformation rates. Require only radius and height to have fixed finite maximal Fourier degrees; the phase correction may be arbitrary periodic $C^2$ within the common bound. If exact members existed with $\epsilon\to0$, compact extraction and exact balance would give a regular $C^2$ limiting orbit. Fixed finite-degree spaces are closed under this convergence, so its radius and height satisfy the theorem above.

Positive limiting mean rotation gives $\ell>0$. The only possible circle has necessary leading torque mean
$$
M_\chi=\ell\left\langle\frac{C(z/r)}{r^2}\right\rangle=\frac{19\ell}{12r_0^2}>0,
$$
contradicting the required zero. Therefore some positive, presently nonnumerical $\epsilon_0$ excludes all exact members of this compact class for $0<\epsilon<\epsilon_0$ at every scale $R>0$.

This applies to the new reciprocal-phase parameterization under common scaling of both positive physical rates: its ratio is fixed, its exact primitive and derivatives are uniformly bounded on the compact coordinate box, and its radius/height degrees are fixed. The phase repair resolves the earlier angular polynomial incompatibility, but finite radius and height still cannot supply the exact slow limit. A bounded finite-speed proposal experiment remains mathematically distinct, because neither theorem gives a numerical threshold. Further slow-limit construction must permit a nonzero infinite tail in at least one of radius or height as well as the required phase relationship. Approximations whose tails vanish toward a fixed finite-degree limiting pair retain this obstruction.

## Verification boundary

Independent reconstruction is required before acceptance. Falsifiers are a nonconstant positive-radius finite Laurent pair with a constant positive sum of squares, a failure of real finite Fourier nonconstancy to imply a positive degree, an invalid continuation of the exact axial germ to a ray avoiding the finitely many zeros, or a nonzero limiting inverse square power despite positive degree. A regular nonplanar limiting orbit with both finite radius and height would directly falsify the theorem. Smooth nonpolynomial periodic profiles and finite-speed delayed paths outside the asymptotic conclusion are not counterexamples.

This proof uses exact polynomial algebra and analytic continuation only. No new numerical experiment or instrument was needed. Existing subjects and receipts remain frozen. The receiving account is the second-allocation B report; parent integration must include the independent verdict and its scope before this is used to redirect the research.
