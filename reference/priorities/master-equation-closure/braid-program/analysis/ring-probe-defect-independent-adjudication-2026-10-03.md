# Independent adjudication of prescribed probes and one-member defects

## Decision and immutable subject

**Accept the bounded axis identities, fixed-probe mean signs, T02/T04 complete removal and flip residuals, and exact-reference radial displacement derivatives. Grade: independently checked derived identities with measured outward finite-reference vectors.** The independent construction imports no subject acceleration tensor, linearization matrix, root oracle or subject implementation. The frozen subject needs no repair. Its inherited Fourier quadratures retain their measured grade; this adjudication does not independently certify those sixteen coefficients or their displayed digits.

The subject is [Prescribed ring fields, axis probes and one-member defects](ring-probe-and-defect-response-2026-10-03.md), SHA-256 `0bd9b9cd9f5c8aaa60dfb427fc0de7eb9cdd6609c2385379792a80cf4ca736b0`; subject script SHA-256 `dc058ec39c53193ad6b81028ce3f29c722b45d588def4a45ed6cbc34a1b41a0a`; subject target receipt SHA-256 `bbce24d32a4fecf52babc31d8f8a1646790ebaba0c1e9ba177f54d421865abf0`. These remain frozen.

The new [independent Cartesian instrument](../../../../../scripts/braid-program/ring_probe_defect_independent_20261003.py), SHA-256 `f29d501124387d8035ada6d3b350862de5752807fc2bb299fdd91817113710c9`, uses $K=c_f=1$, 110 point digits and 85 interval digits. Its `known` receipt SHA-256 is `e21e2211660248c2e7650ae0aab359a880eafcfb5884681cb204fb4d77914dcb`; its `target` receipt SHA-256 is `cd7e3d472b07b99aece76a1241c7a4e1995fffe4cab1d8a6d9ad243396347f0d`. They live in `.local-data/ring-exploration/probe-defect-independent/`. Binary endpoints, rather than decimal diagnostics, are authoritative.

## 1. Analytical controls before the target

The same new Cartesian row and derivative routine passed a stationary source at the origin, receiver $(2,0)$: raw acceleration $(1/4,0)$, receiver radial derivative $(-1/4,0)$ and source radial derivative $(1/4,0)$. It then passed a genuinely signed negative-$D$ control: receiver $(1,0)$, source $(0,-1)$, angular frequency $2\sqrt2$, source velocity $(2\sqrt2,0)$ and source acceleration $(0,8)$. Here $D=-1$ and the receiver radial derivative is $(-5/(4\sqrt2),-3/(4\sqrt2))$. This checks the differentiation of $|D|$ without replacing $D$ by $|D|$ inside its logarithmic derivative.

A static alternating square on an axis point cancelled componentwise, and the independently constructed reciprocal-distance coefficients returned $a_0=1$, $a_1=1/4$, $a_2=9/64$. These passes were recorded first. The initial target attempt stopped before producing any receipt because the interval library lacks `acos`; it was replaced by the equivalent interval `atan2(sqrt(beta^2-1),1)`. All known controls were rerun under the final instrument identity before the successful target.

## 2. Exact reference and complete ordinary roots admitted first

The independent computation consumes only the frozen binary $\beta,R,\Omega$ and root-location proposals from the exact-reference certificates used by the subject. It does not read their $C,F,H$ matrices. The two certificate digests are `3f44600259557b9736b860a904dc986193b7ca21f33cdbbaeb45f8bc0a440c50` (T02) and `17b41d073a1aeec059e292b6696ad2fe54c60b27c46d54976848d29062debc4a` (T04). Exact existence is inherited from the accepted balance owner; a residual interval containing zero is used as an independent consistency check, not as a replacement existence proof.

For equal-radius circular geometry write $x\in(0,\pi)$ for the positive chord half-angle. Every ordinary root obeys

$$
F_\beta(x)=\beta\sin x-x=m\pi/6.
$$

Strict concavity gives one descending root for each $m=-5,\ldots,0$, and a rising/descending pair for each $m=1,\ldots,t-1$ at rung T$t$. The independent interval maximum satisfies $(t-1)\pi/6<F_{\max}<t\pi/6$. Levels outside this list cannot give a root; $x=0$ is the excluded reception self event and $x=\pi$ has zero chord and cannot be a positive-delay hit. The circular distance bound excludes physical delay beyond $2R$.

Each binary root proposal is enlarged outward by $10^{-24}$, then recertified with opposite uniform endpoint signs and a nonzero monotone-branch derivative over the entire inherited $\beta$ uncertainty. This deliberate enclosure enlargement avoids substituting printed root precision for actual reference uncertainty. The rebuilt Cartesian $D$ agrees with $1-\beta\cos x$ on each row. The ordinary floors are greater than $0.195547$ at T02 and $0.116806$ at T04. There are respectively 8 and 12 roots per receiver, 48 and 72 directed hits in the full ring, and one positive-delay self root per receiver at both references. The independently summed Cartesian acceleration agrees with $(-\Omega^2R,0)$ in the receiver frame. All these admissions precede displacement differentiation.

## 3. Separate fixed-emission Cartesian derivative

At an admitted emission write $q=X_i(T)-X_j(S)$, $\ell=|q|$, $n=q/\ell$, $D=1-n\cdot v$, and $w=\sigma/(\ell^2|D|)$. Let $u_i$ and $Q u_j$ be the receiver displacement and the source displacement at the fixed emission, where $Q$ rotates the source's member frame to the receiver frame. The fixed-emission source-velocity change is $\Omega QJu_j$, with $J(x,y)=(-y,x)$. Differentiating $T-S-|q|=0$ gives

$$
dS=-\frac{n\cdot(u_i-Qu_j)}{D},\qquad
dq=u_i-Qu_j-v\,dS,
$$

$$
d\ell=n\cdot dq,\qquad
dn=\frac{dq-n\,d\ell}{\ell},\qquad
dv=\Omega QJu_j+a\,dS,
$$

$$
dD=-dn\cdot v-n\cdot dv,\qquad
dA=w\left[dn-n\left(\frac{2d\ell}{\ell}+\frac{dD}{D}\right)\right].
$$

This is a direct causal-chain derivative, separately constructed from the subject's matrices. At each ring hit the source emission angle relative to the receiver frame is $-2x$, so the instrument builds $Q$, separation, velocity and acceleration from this Cartesian angle. To displace actual member zero, it sets $u_i=e_1$ only for receiver zero and $u_j=e_1$ only when the actual source label is zero. The source-label map is $j=(i+m)\bmod6$, hence source zero has $m\equiv-i\pmod6$. Summing by $m\equiv0$ for every receiver would check the wrong member.

The prescribed centripetal path changes only at receiver zero, with derivative $-\Omega^2e_1$. Accordingly its acceleration-residual derivative includes $+\Omega^2e_1$. Every independent component interval overlaps the subject's interval, and every receiver has a certified nonzero displacement derivative at both references. For orientation, receiver zero's radial/tangential derivatives are about $(89.7547714730,57.5425394975)$ at T02 and $(7222.38250852,2582.87489761)$ at T04. These are measured exact-reference derivatives. Ordinary-root continuation and continuity imply a nonzero residual for sufficiently small nonzero prescribed displacement; no numerical finite-displacement radius, new finite root chart, spectrum or later trajectory is asserted.

## 4. Independent removal and flip algebra

Removal preserves every geometric root of each surviving ordered channel and subtracts the complete actual-source-zero channel. Thus $\mathcal R_i=-A_{i0}$ for $i\ne0$. Flipping member zero gives $\mathcal R_i=-2A_{i0}$ for $i\ne0$; its own self polarity product remains positive, so

$$
\mathcal R_0=2(A_{00}-A_0^{\rm path}).
$$

The independently rebuilt raw Cartesian channels verify all subject removal and flip component intervals, including the flipped receiver's self treatment. A full two-component comparison is retained for every surviving receiver. At the flipped member itself the residual is approximately $(7.22297606377,-0.0841092183821)$ at T02 and $(32.2077752378,-0.600163462485)$ at T04.

For equal radii, each hit has strictly positive geometric radial numerator $\ell/(2R)$, so its radial acceleration sign is exactly $\sigma$. A distinct circular member always has at least one positive-delay hit by the bounded-distance gap argument, and the complete admitted channel therefore cannot have a zero radial sum. Removing opposite polarity leaves an outward residual; removing equal polarity leaves an inward one. The flipped receiver has positive self radial acceleration and a negative inward path acceleration, so its radial residual is strictly outward. These are derived ordinary-chart signs, independently confirmed by the interval vectors at T02/T04. None supplies a stability spectrum about the defective unbalanced configurations.

## 5. Independent prescribed-axis identity and fixed-probe means

At fixed reception $T$, an arbitrary prescribed axis position $(0,0,z(T))$ has the same source distance $L=\sqrt{R^2+z(T)^2}$ at every emission phase. Therefore each source has exactly one positive delay $L$, its transmitter factor is one, and its source velocity is perpendicular to separation. The receiver velocity does not enter this transmitter factor. The phase sums are

$$
\sum_{j=0}^{M-1}(-1)^j=0,\qquad
\sum_{j=0}^{M-1}(-1)^je^{2\pi i j/M}=0\quad(M\ge4\text{ even}).
$$

Thus the prescribed intact ring contribution vanishes pointwise on every axis path for even $M\ge4$. The second sum equals two at $M=2$, leaving the stated rotating transverse binary field. Removing source $j$ negates its former single contribution, giving $p q_jK(R\cos\theta_j,R\sin\theta_j,-z)/L^3$; flipping doubles it. At fixed $z$ the transverse mean vanishes and the axial mean is $-p q_jKz/L^3$. Arbitrary axis motion does not alter pointwise cancellation of the intact ring, but does alter the defective field through $z(T)$ and its phase.

For a fixed clearance-valid probe, let a single source's arrival map be $H(S)=S+|x-X(S)|$. On each ordinary branch $H'=D$. The full acceleration sum uses $1/|D|$, so changing variables across every arrival branch cancels the absolute Jacobian and gives the circular mean of $(x-X)/|x-X|^3$. The periodic arrival map satisfies $H(S+P)=H(S)+P$, ensuring that a reception-period integral covers one emission period with all branches counted. Isolated folds are integrable in this pushforward identity; it gives no instantaneous continuation through the fold. Alternating source means cancel, while removal and flip give respectively $-p q_jK G(x)$ and $-2p q_jK G(x)$.

Independently expand both analytic factors of $(1-2t\cos\eta+t^2)^{-1/2}$ for $|t|<1$. Uniform absolute convergence on each compact subinterval permits phase averaging and differentiation, leaving

$$
a_\ell=\left[\binom{2\ell}{\ell}/4^\ell\right]^2>0.
$$

Inside the circle, $U=R^{-1}\sum a_\ell(\rho/R)^{2\ell}$, so $G_\rho=-U'<0$ for $0<\rho<R$. Outside, $U=\rho^{-1}\sum a_\ell(R/\rho)^{2\ell}$, so $G_\rho>0$ for $\rho>R$. The central zero and excluded contact circle follow directly. The first terms give $G_\rho=-\rho/(2R^3)+O(\rho^3/R^5)$ inside and $G_\rho=\rho^{-2}+3R^2/(4\rho^4)+O(R^4/\rho^6)$ outside. These establish signs analytically, not by sampled quadrature.

As a separate outward numerical check, the new instrument evaluates 61 exact positive binomial coefficients and bounds the remaining derivative series by $a_\ell\le1$ with closed geometric-series tails. At $R=1$, $G_\rho(1/2)$ lies near $-0.34487720614845556$ and $G_\rho(2)$ near $0.31140515255589804$, with signed binary intervals in the receipt. This checks the analytic mean construction independently of the inherited oscillating-field quadrature.

## Reproduction, limits and falsifiers

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_probe_defect_independent_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_probe_defect_independent_20261003.py --stage target
```

A missing admitted root, wrong actual-source map, reversed self-product treatment, failed endpoint or $D$ guard, or a separately differentiated Cartesian component outside the retained intervals falsifies the finite-reference conclusion. An extra source root or non-unit transmitter factor on the prescribed axis falsifies its pointwise identity. A wrong binomial sign or a complete arrival-period integral disagreeing with the pushforward construction falsifies the fixed-probe mean result.

The inherited sixteen Fourier quadratures, moving in-plane probe dynamics, coupled backreaction, finite displaced-member census, contact/caustic continuation and the defective ring's later fate remain outside this independent acceptance. No shared owner, queue, manuscript, log, cross-geometry index, rank, score, scenario, solver or Git publication file is edited here; the coordinator owns integration.
