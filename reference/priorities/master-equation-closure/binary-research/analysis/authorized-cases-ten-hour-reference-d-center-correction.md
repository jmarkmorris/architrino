# Blind nonlinear center correction and rotating account

Frozen before the new nonlinear center-correction subject. Claim grade: exact affine identities and conditional error structure, not all-future region admission. Keep the canonical pair, $d,N,U,W$ and the even affine kernel $E(N,W)=gN-ab/g$, with $a=N\cdot W$, $b=W-aN$, $g=(1-|b|^2)^{1/2}$. The already assessed actual anisotropic account is available; no new source or response is selected.

## A state primitive for the relative-velocity midpoint term

The affine midpoint correction is

$$
 \Delta=\frac K{2d^2}\{E(N,W+U/2)-E(N,W-U/2)\}.
$$

Its linear part in $U$ is $K D_WE(N,W)[U]/(2d^2)$. Define the vector state correction

$$
 P(Z,W)=\frac K{2d}\frac b g,\qquad Z=dN.
$$

Holding $W$ fixed, direct differentiation along $Z'=U=uN+v$ gives

$$
 D_ZP[U]=\frac K{2d^2}\left[
 -\frac{u b+(b\cdot v)N+a v}{g}
 -\frac{a b(b\cdot v)}{g^3}\right]
 =\frac K{2d^2}D_WE[U].
$$

Thus the corrected midpoint velocity $\widetilde W=W-P$ removes precisely this potentially nonintegrable affine linear term. Its exact derivative is

$$
 \widetilde W'=W'-\Delta_{\rm lin}-D_WP\,W',
 \qquad
 D_WP=\frac K{2d}\left[\frac{I-NN^{\mathsf T}}g+\frac{bb^{\mathsf T}}{g^3}\right].
$$

The latter derivative is symmetric positive transverse, with norm at most $K/(2dg^3)$. The correction itself obeys $|P|\le K|W|/(2dg)$. These are exact state identities and retain the derivative of the changing center velocity.

Since $E$ is even in $W$, its third derivative is odd and bounded by a constant times $|W|$ on a fixed small-speed ball. The symmetric Taylor remainder consequently gives $|\Delta-\Delta_{\rm lin}|\le C(K/d^2)|W||U|^3$. This statement follows either by fourth-derivative bounds and symmetry about zero, or by the paired integral third-derivative formula; using a uniform third-derivative norm alone would lose the factor $|W|$. A numerical constant still requires explicit derivative estimates.

For the actual delay row the remaining midpoint error must be estimated from the full sampled history and both clocks. It cannot be replaced by an instantaneous $|W|$ when the current center velocity vanishes but earlier center velocity does not. The natural remainder uses $M=\sup_{\mathcal W}|W|$, and source acceleration and center acceleration estimates on the complete union of sampled windows. A bound $C(K^2/d^3)M$ would leave only the integrable account weight on the negative-account region, because $|U|^2\le C_0K/d$. Its derivation is a separate actual-history obligation, including any supplied seam. The state primitive alone does not prove it.

## Exact planar leading account

For the leading affine system, put $k=K/d^2$, $H=d^2\theta'>0$, and write $W=aN+bT$ in the relative plane. The leading midpoint and angular rows are

$$
 W'=k(aN-bT),\qquad
 H'=kH+\frac{2K ab}{dg},\qquad g=(1-b^2)^{1/2}.
$$

The rotating components satisfy $a'=ka+(H/d^2)b$ and $b'=-kb-(H/d^2)a$. Therefore

$$
 \mathcal C=|W|^2+\frac{2K}{H}ab,
 \qquad
 \mathcal C'=-\frac{2K^2}{d^2H}ab
 -\frac{4K^2}{dgH^2}(ab)^2. \tag{1}
$$

The anisotropic angular term produces a negative square and must not be estimated in absolute value. Completing that square gives $\mathcal C'\le K^2g/(4d^3)$. Thus even without a lower bound on $H'$ the leading planar account has an additive bound controlled by the scalar account weight. If $H>K$, the account is positive definite and comparable to $|W|^2$. Whether the actual corrected system maintains that angular floor and absorbs its history remainders is still unresolved here.

## The three-dimensional frame term

Let $B$ be the unit relative angular direction, $T=B\times N$, and write $W=aN+bT+cB$. Then $g=(1-b^2-c^2)^{1/2}$. The leading torque gives

$$
 H'=kH+\frac{2Kab}{dg},\qquad
 B'=-\tau T,\qquad \tau=\frac{2Kac}{dgH}.
$$

The frame equation $T'=-(H/d^2)N+\tau B$ adds $a\tau c$ to $(ab)'$. Consequently the same account now has, in addition to (1),

$$
 -2kc^2+\frac{4K^2a^2c^2}{dgH^2}.
$$

The second term is positive. It prevents automatic extension of the planar negative-square estimate to arbitrary three-dimensional perturbations. A claim that it is absorbed needs its own relation between $a,H,d$; a speed bound alone does not provide that relation. No fixed-plane assumption may be silently imposed on the general nonmirror family.

The affine primitive is checked by the constant-center and radial-relative-velocity limits; the rotating account reduces to the planar oscillatory tangent when the nonlinear anisotropic torque is removed. Falsifiers are an omitted $D_WP\,W'$ term, loss of the history supremum, failure of the $|W||U|^3$ factor, or omission of the positive three-dimensional frame term. No subject or numerical target was read, and only this new reference is written.
