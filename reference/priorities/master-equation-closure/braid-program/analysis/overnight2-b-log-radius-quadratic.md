# A quadratic period identity using the full radial distance

## Proposed result and scope

Claim grade: self-derived, awaiting algebraic and independent verification. For the normalized simultaneous limiting equation, put $u=\dot r$, $v=\dot z$, $w=\ell/r$, $h=z/r$, $x=h^2$, $e=1+x$, and retain the previously derived mathematical first integral $\mathcal I<0$ of a regular periodic orbit. The first-order canonical quadratic period mean is
$$
W_\chi=\left\langle\frac{Pu^2+2Quv+Sv^2+Cw^2}{r^2}\right\rangle.
$$
The coefficients are the ones in the [independent coupled-period derivation](overnight2-b-independent-coupled-period.md); $K=c_f=1$. This document changes no law and imports no physical energy premise.

The proposed exact identity is
$$
W_\chi=\left\langle
\frac{A(x)u^2+2hB(x)uv+D(x)v^2}{r^2}
+\left(C(h)-\frac{2}{3e}\right)\frac{\ell^2}{r^4}
-\frac{4\mathcal I}{3e r^2}
\right\rangle,
$$
where
$$
A=P-\frac{4(x-1)}{3e^2}+\frac{2}{3e},\qquad
hB=Q+\frac{8h}{3e^2},\qquad
D=S-\frac{4(1-x)}{3e^2}+\frac{2}{3e}.
$$
The known-controlled exact symbolic calculation below verifies positive definiteness of the meridional matrix with entries $A,hB,D$ for all $x\ge0$. The identity therefore gives a self-derived global positive quadratic mean for every regular periodic orbit with $\ell=0$ and a sufficient small-angular-constant exclusion with $\ell\ne0$. Independent reconstruction of the complete argument remains pending.

## Deriving the identity

Let $a=4/3$ and
$$
\Phi(r,z)=a\log\sqrt{r^2+z^2}
=a\log r+\frac a2\log(1+h^2).
$$
Its derivatives are
$$
r\Phi_r=\frac a e,\qquad
r^2\Phi_{rr}=\frac{a(x-1)}{e^2},\qquad
r^2\Phi_{rz}=-\frac{2ah}{e^2},\qquad
r^2\Phi_{zz}=\frac{a(1-x)}{e^2}.
$$
The homogeneity identity for the derived primitive $U=u_{\rm sh}(h)/r$ gives $rA_r^{(0)}+zA_z^{(0)}=U$. Consequently
$$
-\nabla\Phi\cdot A^{(0)}
=-\frac{a u_{\rm sh}(h)}{e r^3}.
$$
Periodicity implies $\langle\ddot\Phi\rangle=0$. Substituting the limiting radial and axial equations removes the Hessian quadratic form from $W_\chi$, contributes $-a/e$ to its angular coefficient, and contributes the displayed negative gradient term. The first integral gives
$$
2\mathcal I=u^2+v^2+w^2+\frac{2u_{\rm sh}(h)}r.
$$
Therefore
$$
-\frac{a u_{\rm sh}(h)}{e r^3}
=\frac{a}{2e r^2}(u^2+v^2+w^2)-\frac{a\mathcal I}{e r^2}.
$$
Combining coefficients gives the proposed identity without approximation. The first integral is used only within this derived limiting equation, where its conservation was proved separately.

## Known-first arithmetic record

The new [exact symbolic companion](overnight2-b-log-radius-quadratic.py) uses rational SymPy algebra and imports no earlier instrument. Before target use, its known stage exited zero under the shared venv with one numerical thread. It checked the independently specified coefficients of $(x+1)^3$, the cancellation $(x^2-1)/(x-1)=x+1$, and the exact zero-height diagonal $(5/12,9/4)$ and determinant $15/16$. The known receipt identity is 069d1e55515ad0c4510bc5bd2ea59f9c2c98e3f85dfacea3da92c15d2f96b9cb, retained under log-radius-quadratic. This pass is recorded before the rational target is run.

The target is a small synchronous exact algebra calculation, not a numerical orbit search. It records all rational expressions and expanded numerator/denominator coefficients without changing them to force positivity. A negative or inconclusive coefficient result remains preserved. No regular test suite, production solver or generated artifact is involved.

## Prospective consequences and falsifiers

The exact target exited zero in 0.031979 internal seconds. Its receipt identity is 0912e6b6f00f008c32368cb938af313311ec41e172064df34965ec2cd7b265d2, and the instrument identity is 0c38b7075b464ec82020eb4f2af9f46679c16ebbd711f6bf5686ca968b379840. It gives
$$
A=\frac{128x^4+192x^3+440x^2+147x+5}{12(1+x)^2(1+4x)^2},
$$
$$
D=\frac{128x^4+560x^3+184x^2+13x+27}{12(1+x)^2(1+4x)^2},\qquad
B=\frac{184x^2+56x-11}{6(1+x)^2(1+4x)^2},
$$
$$
AD-xB^2=\frac{(32x^2+100x+5)(128x^3+64x^2+8x+27)}{144(1+x)^2(1+4x)^3}.
$$
For $x\ge0$, the denominator factors and every coefficient in the numerator of $A$ and of the determinant are positive. Thus $A>0$ and $AD-xB^2>0$, proving positive definiteness of the real symmetric two-by-two form. The target also independently records the expanded coefficients; the proof uses these exact rational identities, not floating eigenvalues.

Positive definiteness makes the meridional contribution nonnegative. When $\ell=0$, the remaining term $-4\mathcal I/(3er^2)$ is strictly positive at every phase. Thus $W_\chi>0$ for every regular periodic zero-angular-constant limiting orbit, whether or not such an orbit exists. For exact compact families with positive mean rotation, the accepted reduction already forces $\ell>0$; the zero-angular statement principally tests the limiting equation and a possible boundary regime.

For nonzero $\ell$, the elementary identity
$$
C(h)+\frac34
=\frac{(4x-5)^2}{12(1+4x)^2}+\frac1{4(1+x)}>0
$$
would give a sufficient positive margin when the negative first integral dominates the angular term. The accepted height bound gives $e<145/64$. If $r_{\min}$ is the orbit's minimum radius, the sufficient condition is
$$
|\mathcal I|\,r_{\min}^2\ge\frac{1817}{1024}\ell^2.
$$
Indeed $9e/16+1/2<1817/1024$, and rearranging the scalar lower bound in the proposed identity then makes its scalar contribution strictly positive. This is an orbit-domain criterion with no period bound or imposed radius ceiling. It does not certify that any floating shooting proposal satisfies its exact hypotheses.

As a consequence, the earlier period/height region can be enlarged without imposing its radius ceiling or its special height-ratio ceiling. Suppose a regular periodic limiting orbit has $r\ge1$, $|\ell|\le3/20$, full radial/axial period $T\le7$, and heights reaching both $37/50$ and $-37/50$. Periodic total variation and Cauchy–Schwarz give $\langle v^2\rangle\ge16(37/50)^2/49$. The accepted first-integral identity $|\mathcal I|=\langle(u^2+v^2+w^2)/2\rangle$ therefore implies
$$
|\mathcal I|r_{\min}^2\ge\frac{2738}{30625}>\frac2{25},\qquad
\frac{1817}{1024}\ell^2\le\frac{16353}{409600}<\frac1{25}.
$$
Thus the sufficient condition holds with a strict margin larger than $1/25$. The new identity gives $W_\chi>0$ throughout this enlarged orbit domain. No bound $r\le6/5$ or $|h|\le77/100$ is needed; each individual regular periodic orbit has finite maxima, and the general first-integral height confinement remains available. The old independently checked theorem and its arithmetic receipts remain preserved. Neither theorem establishes that a sampled numerical proposal is an exact member of the stated domain.

Wrong Hessian entries, a homogeneity sign error, a misuse of the first integral, a false positive-definiteness claim, or an incorrect rational scalar bound would defeat the corresponding conclusion. Any accepted version will require independent reconstruction; no present numerical proposal or unsuccessful search is used as evidence for a continuous exclusion.
