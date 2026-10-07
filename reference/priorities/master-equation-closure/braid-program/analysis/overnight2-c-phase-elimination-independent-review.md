# Independent review of the phase-eliminated pair response

## Verdict and fixed verification boundary

**Derived verdict: supported; no mathematical defect found.** The reciprocal rotation, its real-linear norm, the exact static characterization on the nonzero branch, both finite-error inequalities and the $b=\sqrt3$ static limitation reconstruct correctly. This establishes a necessary-condition formulation and an exact method limitation. It establishes no new moving exclusion, exact reference or computational performance result.

The frozen subject is [the phase-eliminated response note](overnight2-c-phase-eliminated-response.md), supplied SHA-256 `7a3314abc772d47f79c80de2602506e56d250b10be046f33c2c4dc4fcbf53a44`. The checked class has radii $1,1,b$, $b>1$, positive phases $0,-\beta,\chi$ with $0<\beta<\pi$, common $\omega\ge0$ and $\omega b\le1$. The law remains $K_{\log}=c_f=1$, unchanged transmitter weighting, persistent unit polarities and complete circular histories with thirty ordinary positive partner roots and no positive self roots.

The live Ramon E. Moore role file and Specialist charter were read, and the live role directories were listed. The analytical lens supplies no independent acceptance authority beyond the scoped reconstruction. The clock tool returned 2026-10-07 13:46:52 UTC at review start; the allocation retains launch 03:25:15 UTC, exploration stop 13:55:15 UTC and hard deadline 15:25:15 UTC. This review writes only the present new file and performs no numerical calculation, target, delegation or additional scientific investigation.

## Independent reciprocal rotation and norm

For the static radius-$b$ neutral pair, encode radial plus $i$ times tangential response and write

$$
F(s)=\frac1{G_b^{(0)}(s)}=-u\cos s+iw\sin s,\qquad
u=\frac{b^2-1}{2b}>0,\quad w=\frac{b^2+1}{2b}>u,\quad k=w/u.
$$

Let $F(s)=x+iy$, so $\cos s=-x/u$ and $\sin s=y/w$. Trigonometric addition gives the real coordinate map

$$
\begin{pmatrix}\operatorname{Re}F(s+\beta)\\\operatorname{Im}F(s+\beta)\end{pmatrix}
=\begin{pmatrix}\cos\beta&k^{-1}\sin\beta\\-k\sin\beta&\cos\beta\end{pmatrix}
\begin{pmatrix}x\\y\end{pmatrix}.
$$

This fixes the sign of both off-diagonal entries and has determinant $\cos^2\beta+\sin^2\beta=1$. Expressing it as $\mathcal L(z)=Az+B\bar z$ yields precisely

$$
A=\cos\beta-\frac i2(k+k^{-1})\sin\beta,\qquad
B=\frac i2(k^{-1}-k)\sin\beta.
$$

For $|z|=1$, the triangle inequality gives $|\mathcal L(z)|\le|A|+|B|$. Choosing the input phase to align $Az$ and $B\bar z$ attains that bound; when $B=0$ it is immediate. With $q=(k-k^{-1})/2>0$, $|B|=q|\sin\beta|$ and $|A|=\sqrt{1+q^2\sin^2\beta}$. Thus the operator norm is the proposed $\kappa_\beta$, between one and $\sqrt{1+q^2}+q=k$.

The map used in the polynomial is $T(z)=A\bar z+Bz=\mathcal L(\bar z)$. Conjugation is a Euclidean isometry and invertible, so $T$ has the same norm and maps nonzero arguments to nonzero values. Its determinant need not be called one: that determinant statement concerns $\mathcal L$; composing with conjugation changes its sign but not invertibility or the norm. The subject uses precisely these valid implications.

## Exact static characterization and the artificial zero branch

For linked static responses $z_1=G_b^{(0)}(s)$ and $z_2=G_b^{(0)}(s+\beta)$, the reciprocal rotation says $1/z_2=A/z_1+B/\bar z_1$. Multiplying by $z_2|z_1|^2$ gives

$$
H_\beta(z_1,z_2)=|z_1|^2-z_2T(z_1)=0.
$$

Writing $z_1=x+iy$ and $r=|z_1|$, the reciprocal is $(x-iy)/r^2$. Its ellipse equation is $(x/r^2)^2/u^2+(-y/r^2)^2/w^2=1$. Multiplication by $r^4$ gives exactly

$$
J(z_1)=|z_1|^4-x^2/u^2-y^2/w^2=0.
$$

Conversely, if $z_1\ne0$ and $J=0$, then $1/z_1$ lies on the nondegenerate ellipse parametrized by $F$, hence equals $F(s)$ for some phase $s$. The nonzero vector $T(z_1)$ makes $H=0$ determine $z_2=|z_1|^2/T(z_1)$. Since $F(s+\beta)=T(z_1)/|z_1|^2$, this is exactly $1/F(s+\beta)$. Thus $H=J=0$ with $z_1\ne0$ characterizes the linked static pair values, not just a necessary superset.

If $z_1=0$, both polynomials vanish for every $z_2$. This is an artificial branch introduced by clearing denominators. It cannot be admitted in the exact static characterization. The finite-error tests below do not divide by $W_1$, so retaining their validity at $W_1=0$ is a separate statement and causes no contradiction.

## Independent perturbation estimates

At exact moving balance, the previously checked centered comparison supplies one common static pair $z_1,z_2$ with $|W_j-z_j|\le E$, where $E=2\omega(2b-1)/[(b-1)^2(1-\omega)]$. The denominator is positive because $\omega\le1/b<1$. This bound comes from the actual complete source rows; it does not alter their factors or delays.

Let $r_j=|W_j|$. Squared-norm expansion gives $||W_1|^2-|z_1|^2|\le2r_1E+E^2$. Real linearity of $T$ gives the exact product decomposition

$$
W_2T(W_1)-z_2T(z_1)=(W_2-z_2)T(W_1)+z_2T(W_1-z_1).
$$

Its modulus is at most $\kappa_\beta E r_1+\kappa_\beta(|W_2|+E)E$. Since $H(z_1,z_2)=0$, summing the two errors proves

$$
|H_\beta(W_1,W_2)|\le E\{(2+\kappa_\beta)r_1+\kappa_\beta r_2\}+(1+\kappa_\beta)E^2.
$$

All cross terms are present, including the product of the two possible response errors. The estimate holds for arbitrary error directions and does not presume statistical independence or independently selectable phases.

For the quartic term of $J$, $||z_1|-r_1|\le E$ gives the absolute difference bound $(r_1+E)^4-r_1^4$. To check the inward side, if $r_1\ge E$, the outward difference exceeds $r_1^4-(r_1-E)^4$ by $12r_1^2E^2+2E^4\ge0$. If $r_1<E$, the inward change is at most $r_1^4$, while the outward change is at least $E^4\ge r_1^4$. Thus the bound is valid even when the error ball contains zero.

The weighted quadratic form is represented by the real symmetric matrix $M=\operatorname{diag}(u^{-2},w^{-2})$, with Euclidean operator norm $u^{-2}$. Expanding at $W_1$ gives $|z_1^{\mathsf T}Mz_1-W_1^{\mathsf T}MW_1|\le u^{-2}(2r_1E+E^2)$, where complex arguments are interpreted as real two-vectors. Since $J(z_1)=0$, the proposed ellipse restriction follows:

$$
|J(W_1)|\le(r_1+E)^4-r_1^4+\frac{2r_1E+E^2}{u^2}.
$$

Both inequalities are necessary for a shared static pair within the actual moving comparison errors. They do not assert that all error vectors satisfying the scalar inequalities arise from such a pair, and do not impose the two outer-receiver balance equations. They are therefore not sufficient for full exactness when $E>0$.

## Exact analytical controls and the omitted-ellipse limitation

At static phase $s=0$ and gap $\beta=\pi/2$, take $z_1=-1/u$ and $z_2=-i/w$. Here $T(z_1)=ik/u$ and $z_2T(z_1)=k/(uw)=1/u^2=|z_1|^2$, so $H=0$. Also $J=1/u^4-(1/u^2)/u^2=0$. This verifies the rotation orientation and signed axes. At the algebraic control $\beta=0$, $A=1$, $B=0$, and $H=(z_1-z_2)\bar z_1$; its nonzero branch has $z_2=z_1$. That coincident-gap control is not an admissible distinct-member target. At $E=0$, both perturbation bounds vanish exactly.

For the stated limitation, $b=\sqrt3$ gives $u=1/\sqrt3$, $w=2/\sqrt3$, $k=2$. At $\omega=0$, $\beta=\pi/2$, the complete inner chart gives $W_1=1/2-i$, $W_2=1/2+i$. The reciprocal-map coefficients are $A=-5i/4$, $B=-3i/4$. Independently multiplying gives

$$
A\bar W_1=\frac54-\frac58i,\qquad
BW_1=-\frac34-\frac38i,\qquad
T(W_1)=\frac12-i.
$$

Thus $W_2T(W_1)=5/4=|W_1|^2$, so $H=0$. But

$$
J(W_1)=\left(\frac54\right)^2-3\left(\frac12\right)^2-\frac34
=\frac{25-12-12}{16}=\frac1{16}>0.
$$

At this static control $E=0$, the ellipse test rejects the required values while the phase polynomial alone does not. This precisely supports the claimed limitation of omitting $J$. It is not a moving-domain exclusion or an exact static reference.

## Complete histories, scope and falsifiers

The original linked response equations retain the three inner and two outer source rows at each selected receiver, with the same common outer phase. The centered comparison bounds each source's actual ordinary positive root separately. In the stated distinct closed-subfield circular class, the existing root theorem supplies thirty positive partner roots and no positive self roots across the complete history. The algebraic phase elimination changes neither that census nor the remaining outer-receiver equations. Its static comparison is an analytical reference, not a replacement history for the moving target.

The result is restricted to this phase-free necessary test, exact nonzero static characterization and quantified omitted-ellipse limitation. No moving parameter box has been tested, and no exclusion gain, practical cost, exact state, stability or trajectory conclusion follows. Failure of the reciprocal matrix signs, its norm, the nonzero qualification, an omitted perturbation term or causal root, or an exact moving configuration violating either necessary inequality would falsify the corresponding assertion. Passing both inflated tests does not establish existence. Only this new independent review was written; the frozen subject, all prior evidence, main report and shared owners were preserved. Parent integration remains separate. This completes the assigned verification.
