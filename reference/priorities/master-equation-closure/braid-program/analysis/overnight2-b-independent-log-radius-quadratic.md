# Independent full-distance logarithmic quadratic review

## Scope and known-first record

This review independently adjudicates the [frozen logarithmic-radius subject](overnight2-b-log-radius-quadratic.md) and its symbolic companion. It concerns the normalized simultaneous limiting equation, its already derived mathematical first integral and necessary canonical quadratic mean, with $K=c_f=1$. No physical energy premise, numerical candidate membership or finite-speed threshold is introduced. The parent owns integration; frozen subjects, previous oracles and shared owners remain read-only.

The [independent polynomial companion](overnight2-b-independent-log-radius-quadratic.py) uses finite coefficient lists and exact standard-library `Fraction` arithmetic, with explicit addition, scalar multiplication and convolution. It imports neither SymPy nor the subject nor an earlier instrument. Before target use, its known stage passed signed polynomial multiplication, rational cancellation in addition, an independently specified binomial cube and negative rational scaling. That pass exited zero at 2026-10-07 04:50:49 UTC under the shared venv with one numerical thread, in 0.000121 internal seconds. Its instrument SHA-256 is `423cf0da5f1146557f60f5469ffaa0c7bca5274dc78ff9cbd3e81b2648780397`. The original known receipt remains under `.local-data/master-equation-closure/overnight2-b/independent-log-radius-quadratic/known.json`. This pass is recorded before the target calculation.

## Verdict and exact identity

**Derived and independently accepted without repair.** The exact period identity, positive definiteness for every real height ratio, global zero-angular-constant positivity, sufficient nonzero-angular criterion and enlarged period/height domain all follow within the stated regular periodic normalized limiting equation. The scalar-domain margin and positivity of $W_\chi$ are distinct claims; the enlarged result does not retain the earlier theorem's numerical lower bound for $W_\chi$.

Let $u=\dot r$, $v=\dot z$, $w=\ell/r$, $h=z/r$, $x=h^2$, $e=1+x$, and let dots denote normalized time. Use the independently reconstructed coefficients $P,Q,S,C$ in
$$
W_\chi=\left\langle\frac{Pu^2+2Quv+Sv^2+Cw^2}{r^2}\right\rangle.
$$
The acceleration is $A^{(0)}=-\nabla U$ for the degree-minus-one primitive $U$, so $rA_r^{(0)}+zA_z^{(0)}=U$. The mathematical first integral satisfies
$$
\mathcal I=\frac12(u^2+v^2+w^2)+U<0
$$
on every regular periodic radial/axial orbit, as independently proved previously. This property is invoked only for the normalized limiting equation.

Set $a=4/3$ and $\Phi=(a/2)\log(r^2+z^2)$. Direct Cartesian differentiation in the meridional variables gives
$$
\Phi_r=\frac{ar}{r^2+z^2},\quad \Phi_z=\frac{az}{r^2+z^2},
$$
$$
\Phi_{rr}=\frac{a(z^2-r^2)}{(r^2+z^2)^2},\quad
\Phi_{rz}=-\frac{2arz}{(r^2+z^2)^2},\quad
\Phi_{zz}=\frac{a(r^2-z^2)}{(r^2+z^2)^2}.
$$
Equivalently, $r\Phi_r=a/e$ and the three Hessian entries multiplied by $r^2$ are $a(x-1)/e^2$, $-2ah/e^2$, and $a(1-x)/e^2$. These remain smooth for all $z$ since $r>0$.

For a full radial/axial period, $\langle\ddot\Phi\rangle=0$ because both coordinates and velocities are periodic. Along the limiting equation,
$$
\ddot\Phi=\Phi_{rr}u^2+2\Phi_{rz}uv+\Phi_{zz}v^2+\Phi_r w^2/r+\nabla\Phi\cdot A^{(0)}.
$$
Subtracting this zero mean from $W_\chi$ subtracts the Hessian quadratic form and $a/e$ from the angular coefficient. The remaining acceleration term is
$$
-\nabla\Phi\cdot A^{(0)}=-\frac{a(rA_r^{(0)}+zA_z^{(0)})}{r^2+z^2}
=-\frac{aU}{er^2}
=\frac{a(u^2+v^2+w^2)}{2er^2}-\frac{a\mathcal I}{er^2}.
$$
The homogeneity sign is positive in $rA_r^{(0)}+zA_z^{(0)}=U$ and negative in the subtracted gradient term. Thus the angular change after substituting the first integral is $-a/e+a/(2e)=-2/(3e)$, while each meridional diagonal gains $2/(3e)$. This proves exactly
$$
W_\chi=\left\langle
\frac{Au^2+2hBuv+Dv^2}{r^2}
+\left(C-\frac{2}{3e}\right)\frac{\ell^2}{r^4}
-\frac{4\mathcal I}{3er^2}
\right\rangle,
$$
$$
A=P-\frac{4(x-1)}{3e^2}+\frac{2}{3e},\quad
hB=Q+\frac{8h}{3e^2},\quad
D=S-\frac{4(1-x)}{3e^2}+\frac{2}{3e}.
$$
No expansion in $h$, approximation to the orbit, or additional modification of the canonical equation was introduced.

## Independent polynomial certificate

Put $d=1+4x$ and use the common positive denominator $L=12e^2d^2$ for $A,D,B$. Substitution of the independently reconstructed $P,Q,S$ gives the following polynomial numerators before expansion:
$$
A_N=-12e^2d-12e^2+8e^2d^2-13(x-1)d^2+8ed^2,
$$
$$
D_N=24(1-4x)e^2+8e^2d^2-13(1-x)d^2+8ed^2,
\qquad B_N=-48e^2+26d^2.
$$
The new instrument expands these expressions by rational coefficient convolution. Its independent target confirms
$$
A_N=5+147x+440x^2+192x^3+128x^4,
$$
$$
D_N=27+13x+184x^2+560x^3+128x^4,\qquad
B_N=-22+112x+368x^2.
$$
Thus $A=A_N/L$, $D=D_N/L$, and $B=B_N/L$, agreeing with the subject's equivalent denominator $6e^2d^2$ for half of $B_N$.

The determinant numerator before cancellation is $A_ND_N-xB_N^2$. In ascending powers of $x$ its independently computed coefficient list is
$$
(135,3550,19639,44400,87440,166784,187392,96256,16384).
$$
Multiplying the independently specified factors gives exactly this same polynomial:
$$
A_ND_N-xB_N^2=(5+100x+32x^2)(27+8x+64x^2+128x^3)e^2d.
$$
Since $L^2=144e^4d^4$, cancellation gives
$$
AD-xB^2=\frac{(5+100x+32x^2)(27+8x+64x^2+128x^3)}{144e^2d^3}.
$$
All coefficients of $A_N$ and both determinant factors are positive, as are the denominators for $x\ge0$. The real symmetric matrix with entries $A,hB,D$ therefore has positive leading principal minors $A$ and $AD-h^2B^2$ for every real $h$. It is strictly positive definite. The off-diagonal coefficient need not have a fixed sign. No division by $h$ is required at $h=0$; there the diagonal is $(5/12,9/4)$ and the determinant is $15/16$.

The target passed at 2026-10-07 04:51:01 UTC after the recorded known stage, in 0.000443 internal seconds. It also checked the angular rational identity and every stated scalar constant below. It used no symbolic factorization engine: the proof certificate is equality of explicitly multiplied finite polynomials plus the displayed positive coefficients. The unchanged original target receipt retains all checks and coefficients, including the off-diagonal polynomial's negative constant.

## Global zero-angular-constant result and nonzero criterion

When $\ell=0$, the meridional contribution is nonnegative and
$$
-\frac{4\mathcal I}{3er^2}>0
$$
at every phase, because $\mathcal I<0$, $e>0$ and $r>0$. The continuous positive integrand has positive average on a full positive period, so $W_\chi>0$. This is a theorem about every regular periodic zero-angular-constant limiting orbit, conditional on such an orbit existing. It does not assert existence. Positive-mean-rotation compact exact families already have $\ell>0$, so this case does not silently broaden that reduction's hypotheses.

For the other case, direct common-denominator multiplication verifies
$$
C+\frac34=\frac{(4x-5)^2}{12(1+4x)^2}+\frac1{4e}>0.
$$
For example, multiplying by $12ed^2$ reduces the identity to $12e(2-4x)+ed^2+3d^2=e(4x-5)^2+3d^2$; the first two terms combine because $12(2-4x)+d^2=(4x-5)^2$.

Denote the scalar part of the new integrand by $S_0$. For $\ell\ne0$, replacing $C$ by its strict lower bound gives
$$
S_0=\left(C-\frac2{3e}\right)\frac{\ell^2}{r^4}+\frac{4|\mathcal I|}{3er^2}
>\frac4{3er^4}\left[|\mathcal I|r^2-\left(\frac{9e}{16}+\frac12\right)\ell^2\right].
$$
The accepted pointwise confinement $|h|<h_U<9/8$ implies $e<145/64$, hence
$$
\frac{9e}{16}+\frac12<\frac9{16}\frac{145}{64}+\frac12=\frac{1817}{1024}.
$$
On a regular periodic orbit $r_{\min}>0$ exists. The sufficient condition
$$
|\mathcal I|r_{\min}^2\ge\frac{1817}{1024}\ell^2
$$
therefore makes the bracket strictly positive at every phase for $\ell\ne0$, including equality at the displayed domain boundary. The strict height inequality and nonzero $\ell$ already provide strictness; the strict bound on $C$ is additional. Together with the positive-definite meridional form, this proves $W_\chi>0$. No imposed period bound or radius ceiling is needed for this criterion.

## Enlarged period/height region

Suppose a regular periodic limiting orbit has $r\ge1$, $|\ell|\le3/20$, a positive full radial/axial period $T\le7$, and $\max z\ge37/50$, $\min z\le-37/50$. The two cyclic arcs joining a maximum and minimum have total variation at least twice their height difference. Thus $\int_0^T|v|\,d\chi\ge4(37/50)$. Cauchy–Schwarz yields
$$
\langle v^2\rangle\ge\frac{16(37/50)^2}{T^2}\ge\frac{5476}{30625}.
$$
The independently proved periodic first-integral identity is $|\mathcal I|=\langle(u^2+v^2+w^2)/2\rangle$. Since $r_{\min}\ge1$,
$$
|\mathcal I|r_{\min}^2\ge\frac{2738}{30625}>\frac2{25},\qquad
\frac{1817}{1024}\ell^2\le\frac{16353}{409600}<\frac1{25}.
$$
The exact difference of these two bounding constants is
$$
\frac{2738}{30625}-\frac{16353}{409600}=\frac{24826967}{501760000}>\frac1{25}.
$$
Hence every such orbit meets the sufficient criterion, with a strict scalar-domain margin. The $\ell=0$ case is covered separately above. Consequently $W_\chi>0$ throughout this region.

No external radius ceiling or special ceiling $|h|\le77/100$ is used. Each individual regular periodic orbit is bounded on its period; the general first-integral confinement remains valid. The domain has therefore been enlarged relative to the earlier bounded-region theorem. However, the new proof asserts positivity of $W_\chi$, not a uniform value $W_\chi>1/25$ over this enlarged domain: the displayed margin concerns $|\mathcal I|r_{\min}^2-(1817/1024)\ell^2$, and its pointwise contribution to $W_\chi$ has the factor $4/(3er^4)$. The previous quantitative theorem and its narrower hypotheses remain intact.

## Scope, falsifiers and retained evidence

All conclusions concern regular $C^2$ periodic radial/axial solutions of the normalized simultaneous limiting equation with $r>0$ and constant real $\ell$. They require periodic positions and velocities for both total-derivative identities. Relative periodicity suffices; absolute azimuthal closure is unnecessary. The first integral is an algebraic consequence of that equation, and is not asserted for arbitrary finite-speed causal-delay histories. To exclude limits of exact canonical slow families, retain the convergence and complete-root hypotheses under which the necessary zero mean was derived. No finite-speed threshold or numerical candidate membership is established here.

Operator-checkable falsifiers include an erroneous Hessian or homogeneity sign, failure of the first-integral substitution, a mismatch of one explicitly multiplied polynomial, a nonpositive leading principal minor for $x\ge0$, an incorrect angular comparison, or failure of the cyclic total-variation estimate. A regular periodic limiting orbit in one of the declared domains with $W_\chi\le0$ would falsify the associated positivity claim. A finite-speed causal-delay orbit outside the limiting hypotheses would not. Every consequential derivative, factorization and rational constant appears above or in the retained independent receipt.

Known and target commands ran synchronously with shared-venv Python and `OPENBLAS_NUM_THREADS=OMP_NUM_THREADS=MKL_NUM_THREADS=1`, both exited zero and launched no background job. Peak memory was not profiled and no empirical memory claim is made. Both original receipts remain in `.local-data/master-equation-closure/overnight2-b/independent-log-radius-quadratic/`; no deletion, relocation, replacement, replay or remote-backup claim is made. The only reviewer-authored deliverables are this report and its separate polynomial companion. Subject source, prior reports/oracles and receipts, parent report and shared owners were not edited. No regular tests, production solver, generator, Git mutation or recursive agent was used. Parent integration remains the receiving disposition step.

Final scoped validation: shared-venv built-in `compile` accepted the independent companion without writing bytecode. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for either new deliverable; exit one denotes a new-file difference. Native `shasum -a 256` measured the identities below, including the unchanged independent instrument identity recorded before target use and the subject instrument identity stated in the frozen subject. By `wc -lc`, the original known receipt is 13 lines and 339 bytes, and target is 52 lines and 1,049 bytes.

| Item | SHA-256 |
| --- | --- |
| Frozen subject Markdown | `c32ab99131afef1109973b014d3825342c5dabab4cde21e02f8f9b020ac88ddb` |
| Frozen subject instrument | `0c38b7075b464ec82020eb4f2af9f46679c16ebbd711f6bf5686ca968b379840` |
| Independent instrument | `423cf0da5f1146557f60f5469ffaa0c7bca5274dc78ff9cbd3e81b2648780397` |
| Independent known receipt | `e4ff4ee150ee6d333a743659da8e2f19685d208ee7657f9663247ac4d63e113c` |
| Independent target receipt | `3519af984de3f9b5b4049bedd7f2871378aaab12ff8dc5a7f9525ec3bb8a932a` |
