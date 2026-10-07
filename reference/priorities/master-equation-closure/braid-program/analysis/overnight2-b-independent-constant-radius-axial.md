# Independent constant-radius axial obstruction review

## Verdict and required qualification

Claim grade: independently reconstructed analytical derivation. The [frozen subject](overnight2-b-constant-radius-axial-obstruction.md) correctly excludes every fixed nonconstant $C^2$ periodic height profile at fixed positive radius, with arbitrary fixed $C^2$ periodic phase modulation, for sufficiently small positive slow parameter and every overall scale $R>0$. Its instantaneous axial term, five-partner first-order coefficient, exact period identity and global positive coefficient bound are correct. This is an exclusion of prescribed profiles from exact canonical acceleration balance, not a stability or actual-evolution result.

For a common threshold across a family, make the radius hypothesis explicit as $0<r_{\min}\le r_0\le r_{\max}<\infty$. The subject's phrase “bounded profiles/rates” is ambiguous because the named profiles are $p$ and $\zeta$, while $r_0$ is separately introduced as a constant. A radius upper bound is needed by this proof for both the common source-speed/diameter bound and a positive lower bound on $k/r_0^2$. If the intended bounded profiles already include the constant-radius profile, this is a clarification; otherwise it is a missing premise of the uniform-family statement. The fixed-$r_0$ result needs no repair. The frozen subject remains unmodified.

The subject identity at review was `9c0c08c5d3fd077cb66cadb90f17cd2ab9631e84999861267fb28b7d8c50df5b` by native `shasum -a 256`. The present check derives the axial terms directly from the prescribed paths and canonical first-order row. It uses no subject instrument, numerical root search or new arithmetic program. The complete derivation below is the retained scientific evidence; no numerical target was run, so there is no target-stage receipt or new instrument requiring a known-case run. The parent researcher owns integration into the second-allocation report. The Ramon E. Moore role supplies an analytical lens only.

## Exact paths and the axial period identity

Fix $r_0>0$, $b,k>0$, overall scale $R>0$ and slow parameter $\epsilon>0$. Put $\tau=t/R$, $\phi=\epsilon k\tau$ and $\theta_j=\epsilon b\tau+j\pi/3+p(\phi)$. The six complete histories are

$$
X_j(t)=R\big(r_0\cos\theta_j,r_0\sin\theta_j,(-1)^j\zeta(\phi)\big),\qquad j=0,\ldots,5,
$$

where $p,\zeta$ are real $C^2$, $2\pi$-periodic profiles and $\zeta$ is nonconstant. These profiles and the base rates are held fixed as $\epsilon\to0^+$. The canonical law has $K=c_f=1$ and includes every positive ordinary causal root. Let $A_z/R^2$ denote its physical axial acceleration on receiver zero. The prescribed physical axial acceleration is $\epsilon^2k^2\zeta''/R$, so exact balance implies

$$
A_z=R\epsilon^2k^2\zeta'',\qquad
\langle\zeta'A_z\rangle
=R\epsilon^2k^2\langle\zeta'\zeta''\rangle=0.
$$

Here a prime is a phase derivative, and $\langle f\rangle=(2\pi)^{-1}\int_0^{2\pi}f(\phi)\,d\phi$. The last equality follows from integrating $[(\zeta')^2/2]'$ over a period. It is a necessary consequence of exact acceleration balance, independent of any imported energy or momentum law. The identity does not require the planar positions to close after one height cycle: relative periodicity already supplies the periodic axial factors. The complete positions close after an integer number of cycles if $b/k$ is rational; no such rationality is needed here.

## Complete causal geometry and uniform expansion

Write $x_j=X_j/R$. Its physical velocity equals $\partial_\tau x_j$ and has cylindrical components

$$
\epsilon\big(0,r_0\omega,(-1)^jk\zeta'\big),\qquad \omega=b+kp'.
$$

The derivative of this velocity with respect to $\tau$ has components

$$
\epsilon^2\big(-r_0\omega^2,r_0k^2p'',(-1)^jk^2\zeta''\big).
$$

For fixed profiles these furnish finite constants $V_*,A_*$ bounding velocity divided by $\epsilon$ and its $\tau$ derivative divided by $\epsilon^2$. Each path lies in the ball of radius $\sqrt{r_0^2+\|\zeta\|_\infty^2}$ and every present partner separation is at least $r_0$. Once $\epsilon V_*<1$, the complete source path is slower than the unit-speed causal distance. Its unsquared partner gap is strictly decreasing from a positive value at delay zero to a negative value beyond the enclosing diameter. Each partner channel therefore has exactly one positive root. The self gap is negative at every positive delay, so no self root is omitted. The transmitter divisor is uniformly positive, $D\ge1-\epsilon V_*$.

For a partner, let $Q_0$ be simultaneous separation, $s=|Q_0|$, $n=Q_0/s$, and $\epsilon V_1$ its simultaneous source velocity. On a bounded delay interval, the position and velocity estimates are

$$
Q=Q_0+\epsilon\delta V_1+O(\epsilon^2),\qquad
V_s=\epsilon V_1+O(\epsilon^2),\qquad
\delta=s+\epsilon s(n\cdot V_1)+O(\epsilon^2).
$$

The first two follow by integrating the bounded $\tau$ derivative of velocity, and the third follows from $\delta=|Q|$ with $s\ge r_0>0$. The constants are uniform in reception phase. Expanding the source-side divisor $D=1-\widehat Q\cdot V_s$ and the canonical row gives

$$
\sigma\frac{Q}{\delta^3D}
=\sigma\frac{Q_0}{s^3}
+\frac{\epsilon\sigma}{s^2}\big[V_1-2n(n\cdot V_1)\big]+O(\epsilon^2).
$$

This uses only two profile derivatives, as in the [independent slow-mean review](overnight2-b-independent-slow-mean.md#uniform-first-order-row-under-only-two-profile-derivatives). The coefficient minus two combines the minus three from the inverse-cube distance with the plus one from the divisor. A finite sum over five rows preserves the uniform quadratic error. No second slow-parameter derivative of delayed velocity is invoked.

## Independent reconstruction of all five axial rows

For receiver zero define $\alpha=j\pi/3$ and $\sigma=(-1)^j$. The simultaneous geometry and source base velocity are

$$
Q_0=\big(r_0(1-\cos\alpha),-r_0\sin\alpha,(1-\sigma)\zeta\big),\qquad
s^2=2r_0^2(1-\cos\alpha)+(1-\sigma)^2\zeta^2,
$$

$$
V_1=\big(-r_0\omega\sin\alpha,r_0\omega\cos\alpha,\sigma k\zeta'\big).
$$

The zeroth-order same-polarity rows have zero axial component. Each neighboring opposite-polarity row contributes $-2\zeta/(r_0^2+4\zeta^2)^{3/2}$, and the diametric row contributes $-\zeta/[4(r_0^2+\zeta^2)^{3/2}]$. Therefore

$$
F(\zeta)=A_z^{(0)}
=-\frac{4\zeta}{(r_0^2+4\zeta^2)^{3/2}}
-\frac{\zeta}{4(r_0^2+\zeta^2)^{3/2}}.
$$

An explicit primitive, providing a direct check of both coefficients, is

$$
U(z)=\frac1{\sqrt{r_0^2+4z^2}}+\frac1{4\sqrt{r_0^2+z^2}},\qquad U'(z)=F(z).
$$

Thus $\langle\zeta'F(\zeta)\rangle=\langle[U(\zeta)]'\rangle=0$ for every periodic profile. Constant radius is essential to this step: the primitive has one varying argument. No instantaneous balance assumption enters it.

The angular part of $V_1$ obeys $Q_0\cdot V_1^{\rm ang}=-r_0^2\omega\sin\alpha$. Its axial-row correction is proportional to $\sigma(1-\sigma)\zeta\sin\alpha/s^4$. Sources $j$ and $6-j$ have the same parity and distance but opposite sine, so their angular terms cancel. The diametric sine is zero. This cancellation is pointwise for arbitrary phase modulation, regardless of the sign of $\omega$.

The vertical part is $V_1^{\rm vert}=(0,0,\sigma k\zeta')$. Including the outer row polarity, its axial correction is

$$
k\zeta'\left[\frac1{s^2}-\frac{2(1-\sigma)^2\zeta^2}{s^4}\right].
$$

This is equivalent to the subject's expression with $+2\sigma(1-\sigma)^2$, because for $\sigma=+1$ the square vanishes and for $\sigma=-1$ both signs are negative. It avoids division by $\zeta'$ and remains meaningful when $\zeta'=0$. Set $h=\zeta/r_0$. The complete coefficient table is

| Channels | Coefficient of $k\zeta'/r_0^2$ |
| --- | --- |
| Neighboring opposite-polarity pair $j=1,5$ | $2(1-4h^2)/(1+4h^2)^2$ |
| Same-polarity pair $j=2,4$ | $2/3$ |
| Diametric opposite-polarity source $j=3$ | $(1-h^2)/[4(1+h^2)^2]$ |

Hence all five partners give

$$
A_z=F(\zeta)+\epsilon\frac{k}{r_0^2}S(h)\zeta'+\mathcal R_\epsilon,
\qquad \|\mathcal R_\epsilon\|_\infty\le C_*\epsilon^2,
$$

$$
S(h)=\frac{2(1-4h^2)}{(1+4h^2)^2}+\frac23+\frac{1-h^2}{4(1+h^2)^2}.
$$

The finite constant $C_*$ depends on the fixed profiles, rates and dimensionless radius, but not on $R$. Its existence follows from the complete-chart and second-derivative bounds above; no numerical value is asserted.

## Global positive coefficient and exclusion

The full coefficient admits the direct exact decomposition

$$
S(h)=\frac{37}{96}
+\frac{(4h^2-3)^2}{4(1+4h^2)^2}
+\frac{(h^2-3)^2}{32(1+h^2)^2}.
$$

This follows by applying $(1-x)/(1+x)^2+1/8=(x-3)^2/[8(1+x)^2]$ with $x=4h^2$ and $x=h^2$. The denominators are positive for every real $h$, so $S(h)\ge37/96$. The two squares cannot vanish simultaneously, giving strict inequality as well, although the non-strict floor suffices. As simple exact algebra checks, $S(0)=35/12$ and $S(1)=32/75$ agree with both the original expression and this decomposition.

Multiplying the full expansion by $\zeta'$ and averaging eliminates $F$ by its primitive. Write $E_\zeta=\langle(\zeta')^2\rangle$ and $L_\zeta=\langle|\zeta'|\rangle$. Then

$$
\langle\zeta'A_z\rangle
\ge\epsilon\frac{37k}{96r_0^2}E_\zeta
-C_*L_\zeta\epsilon^2.
$$

A nonconstant $C^2$ periodic function has $E_\zeta>0$: its continuous derivative is nonzero on some interval. Define $a_*=37kE_\zeta/(96r_0^2)>0$. Within the small-parameter chart, choosing $\epsilon<a_*/(2C_*L_\zeta)$ makes the displayed average positive when $C_*L_\zeta>0$; if that error coefficient is zero, no additional restriction is needed. This contradicts the exact period identity. The resulting threshold is positive for each fixed preparation and independent of $R$, including scales $R$ that diverge as $\epsilon\to0$.

For $\zeta=H\cos\phi$ with fixed $H>0$, $E_\zeta=H^2/2$ and the coefficient of $\epsilon$ is at least $37kH^2/(192r_0^2)$. In particular, the [tangential compatibility ratio](overnight2-b-independent-slow-mean.md#certified-compatibility-height) $H/r_0\approx0.818437823$ does not supply a slow exact constant-radius history. The nonzero tangential compatibility height cancels one necessary coefficient; it cannot cancel this positive axial period coefficient.

## Uniform-family hypotheses

For a common threshold, assume explicit bounds

$$
0<r_{\min}\le r_0\le r_{\max}<\infty,\qquad
0<k_{\min}\le k\le k_{\max},\qquad 0<b\le b_{\max},
$$

uniform bounds on $|\zeta|,|\zeta'|,|\zeta''|,|p'|,|p''|$, and $E_\zeta\ge E_{\min}>0$. Bounding $p$ itself is harmless but unnecessary for the derivative and separation estimates. If $Z_0,Z_1,Z_2,P_1,P_2$ denote the listed profile bounds, the common dimensionless diameter can be taken as $2\sqrt{r_{\max}^2+Z_0^2}$. A common base-speed bound follows from

$$
V_*^2=r_{\max}^2(b_{\max}+k_{\max}P_1)^2+k_{\max}^2Z_1^2,
$$

and a common base second-derivative bound follows from the squared sum

$$
A_*^2=r_{\max}^2(b_{\max}+k_{\max}P_1)^4
+r_{\max}^2k_{\max}^4P_2^2+k_{\max}^4Z_2^2.
$$

Together with the simultaneous separation floor $r_{\min}$ these furnish one sufficiently small chart interval, one nonzero divisor floor, one separation-segment floor and one quadratic row-remainder constant. The leading coercive coefficient is uniformly at least $37k_{\min}E_{\min}/(96r_{\max}^2)>0$, while the weighted remainder is at most $C_*Z_1\epsilon^2$. Thus the same domination argument gives a common positive threshold. A radius floor without a radius upper bound does not supply this proof's uniform constants; the subject should state the upper bound explicitly.

## Validation, preservation and handoff

This review is analytical. Its evidence consists of the complete derivation in this file and the immutable subject identity above. There is no new numerical receipt or claimed numerical remainder threshold. No Python target, heavy computation, background job, recursive reviewer, regular test, generator or Git mutation was used. No existing subject or evidence was changed or deleted. The only new authored file is `overnight2-b-independent-constant-radius-axial.md`. This retained proof requires no ignored runtime payload to reconstruct its conclusion; no remote backup or historical-byte recovery is claimed.

Scoped validation: native `git diff --no-index --check /dev/null` emitted no whitespace diagnostic for this new file; direct source review checked the displayed derivative and coefficient identities, and a final native `shasum -a 256` read matched the frozen subject identity. The linked independent slow-mean proof and compatibility-height section were already read in the same bounded review sequence. These are analytical and source-format checks, not a numerical rerun or independent certification of other histories.

An incorrect axial canonical row, a surviving angular paired term, failure of the explicit primitive, failure of the sum-of-squares identity, or an exact sufficiently slow history satisfying the fixed-preparation premises would overturn the corresponding result. A family lacking a common radius upper bound, losing uniform derivative bounds, having $E_\zeta\to0$, or having $k\to0$ does not satisfy the common-threshold theorem as accepted here. Radial modulation and finite speeds beyond a justified threshold remain outside this exclusion. Small residuals and finite observation windows cannot establish or refute this exact period obstruction.

The parent owns integration of the accepted fixed-preparation theorem, the explicit radius upper-bound qualification for uniform families, and the continuing open coupled-radius question. No other mathematical blocker remains for this bounded review. The broader allocation continues after this reviewer stops.
