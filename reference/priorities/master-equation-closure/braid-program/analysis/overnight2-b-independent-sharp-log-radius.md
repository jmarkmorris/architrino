# Independent sharp constant logarithmic multiplier review

## Scope and known-first record

This review independently adjudicates the [frozen sharp logarithmic-multiplier subject](overnight2-b-sharp-log-radius.md) and companion. It varies an auxiliary proof function, not the canonical law or a physical parameter. The setting remains the normalized simultaneous limiting equation, $K=c_f=1$, regular periodic radial/axial motion at positive radius, its derived negative mathematical first integral, and the independently reconstructed quadratic mean. The previous [full-distance logarithmic review](overnight2-b-independent-log-radius-quadratic.md) remains frozen.

The [new independent companion](overnight2-b-independent-sharp-log-radius.py) uses separately authored rational coefficient-array arithmetic with standard-library `Fraction`, including convolution, differentiation and evaluation. It imports neither SymPy nor any subject or earlier instrument. Before target use, its known stage passed $(1+2x)(3-x)=3+5x-2x^2$, evaluation of that polynomial at $x=1/2$ giving $5$, differentiation of $1+2x+3x^2$, and exact fractional coefficient addition. The shared-venv one-thread command exited zero at 2026-10-07 04:59:18 UTC in 0.000111 internal seconds. The instrument SHA-256 is `ab380810674cdc6c4af91542cd6d3b56dffbdea1de0121596242e8551c6e63ed`; its original known receipt is retained under `.local-data/master-equation-closure/overnight2-b/independent-sharp-log-radius/known.json`. This pass is recorded before the target calculation.

## Verdict and general identity

**Derived and independently accepted without repair.** The choice $a=5/2$ yields a globally positive-semidefinite meridional quadratic form, with rank one precisely at $h^2=1/2$. No larger constant $a$ has this global pointwise property within the same full-distance logarithmic proof family. The scalar calculation gives the stated sufficient condition
$$
|\mathcal I|r_{\min}^2\ge\frac{27}{25}\ell^2\quad\Longrightarrow\quad W_\chi>0.
$$
It is strict at equality and also valid for $\ell=0$. This accepts the largest admissible constant multiplier, not a globally optimal exclusion threshold or a result for arbitrary finite-speed causal-delay paths.

For completeness, let $x=h^2$, $h=z/r$, $e=1+x$, and use meridional velocities $u=\dot r$, $v=\dot z$ and angular velocity component $w=\ell/r$. For $\Phi=(a/2)\log(r^2+z^2)$, direct differentiation gives
$$
r\Phi_r=\frac ae,\quad
r^2\Phi_{rr}=\frac{a(x-1)}{e^2},\quad
r^2\Phi_{rz}=-\frac{2ah}{e^2},\quad
r^2\Phi_{zz}=\frac{a(1-x)}{e^2}.
$$
The primitive identity $rA_r^{(0)}+zA_z^{(0)}=U$ and $U=\mathcal I-(u^2+v^2+w^2)/2$ give
$$
-\nabla\Phi\cdot A^{(0)}=-\frac{aU}{er^2}
=\frac{a(u^2+v^2+w^2)}{2er^2}-\frac{a\mathcal I}{er^2}.
$$
Subtracting the zero mean of $\ddot\Phi$ subtracts the Hessian quadratic form and $a/e$ from the angular coefficient. The displayed substitution then adds $a/(2e)$ to both meridional diagonals and to that angular coefficient. Consequently
$$
W_\chi=\left\langle\frac{A_au^2+2hB_auv+D_av^2}{r^2}
+\left(C-\frac a{2e}\right)\frac{\ell^2}{r^4}-\frac{a\mathcal I}{er^2}\right\rangle,
$$
$$
A_a=P-\frac{a(x-1)}{e^2}+\frac a{2e},\quad
hB_a=Q+\frac{2ah}{e^2},\quad
D_a=S-\frac{a(1-x)}{e^2}+\frac a{2e}.
$$
This identity is exact along the normalized limiting equation. Regular periodic positions and velocities justify the zero total derivative; $r>0$ makes $\Phi$ smooth. No first integral of the arbitrary finite-speed causal-delay law is being assumed.

## Independent polynomial reconstruction at the endpoint multiplier

Put $d=1+4x$ and use the common denominator $L=12e^2d^2$. At $a=5/2$, direct collection from $P,Q,S$ gives
$$
A_N=-12e^2d-12e^2+8e^2d^2-27(x-1)d^2+15ed^2,
$$
$$
D_N=24(1-4x)e^2+8e^2d^2-27(1-x)d^2+15ed^2,
\qquad B_N=-48e^2+54d^2.
$$
Here $A_{5/2}=A_N/L$, $D_{5/2}=D_N/L$, $B_{5/2}=B_N/L$. The independent convolution instrument gives ascending coefficient arrays
$$
A_N:(26,308,720,80,128),\qquad
D_N:(20,-22,240,896,128),\qquad
B_N:(6,336,816).
$$
Dividing the first two by two and the last by six yields exactly the rational expressions in the subject. The negative coefficient in $D_N$ was retained.

The determinant numerator is $A_ND_N-xB_N^2$. Direct convolution independently verifies
$$
A_ND_N-xB_N^2=8(2x-1)^2(8x+5)(16x^2+92x+13)e^2d.
$$
Its fully expanded ascending coefficients are
$$
(520,5552,9832,-39712,-95456,35072,194560,124928,16384).
$$
The negative expanded coefficients were retained as well; positivity is proved from the factorization, not from an incorrect coefficient-sign test. Division by $L^2=144e^4d^4$ gives
$$
A_{5/2}D_{5/2}-xB_{5/2}^2
=\frac{(2x-1)^2(8x+5)(16x^2+92x+13)}{18e^2d^3}.
$$
For all $x\ge0$, the denominator and both nonsquared factors are positive. Also every coefficient of $A_N$ is positive, so $A_{5/2}>0$. Writing the meridional form as
$$
A_{5/2}\left(u+\frac{hB_{5/2}}{A_{5/2}}v\right)^2
+\frac{A_{5/2}D_{5/2}-h^2B_{5/2}^2}{A_{5/2}}v^2
$$
therefore proves it positive semidefinite everywhere, positive definite except at $x=1/2$.

At that exceptional value, independently evaluated entries are
$$
(A_{5/2},B_{5/2},D_{5/2})=(14/9,14/9,7/9).
$$
Since $h^2=1/2$, the form is $(14/9)(u+hv)^2$. It has rank one and null direction $u=-hv$, with either sign of $h$. This does not make the complete period identity inconclusive because its scalar part will be strictly positive under the stated criterion.

## Largest admissible constant in the fixed proof family

At $x=1/2$, direct substitution before fixing $a$ gives
$$
A_a=\frac16+\frac{5a}{9},\quad D_a=\frac12+\frac a9,\quad B_a=-\frac23+\frac{8a}{9}.
$$
Multiplication and subtraction yield
$$
A_aD_a-\frac12B_a^2=-\frac5{36}+\frac89a-\frac13a^2
=-\frac{(6a-1)(2a-5)}{36}.
$$
The independent polynomial companion verifies both expressions as polynomials in $a$. For every $a>5/2$, both factors in the numerator product are positive, so the determinant is negative. A real symmetric positive-semidefinite matrix cannot have negative determinant. Thus no such larger constant works pointwise for all height ratios, while $a=5/2$ does by the preceding global proof. This establishes the stated maximality without needing to classify all smaller constants.

This optimality is confined to subtracting the second derivative of a constant multiple of $\log\sqrt{r^2+z^2}$ with the same first-integral substitution and demanding pointwise meridional semidefiniteness. It does not exclude another function as multiplier, a proof using period-averaged compensation of an indefinite form, or a sharper scalar estimate. In particular it is not a proof that $27/25$ is an optimal orbital threshold.

## Exact scalar bound and strict criterion

For general $a>0$, the scalar part can be written exactly as
$$
\frac{a}{er^4}\left[|\mathcal I|r^2-\left(\frac12-\frac eaC\right)\ell^2\right].
$$
For $a=5/2$, define $F(x)=1/2-(2/5)eC$. The independently reconstructed coefficient is
$$
eC=\frac{N(x)}{12d^2},\qquad N(x)=19-72x-192x^2-128x^3.
$$
Direct rational differentiation gives numerator $N'd-8N$ over denominator $12d^3$. Polynomial expansion is
$$
N'd-8N=-224-96x-384x^2-512x^3=-32(7+3x+12x^2+16x^3).
$$
Hence
$$
\frac d{dx}(eC)=-\frac{8(7+3x+12x^2+16x^3)}{3d^3}<0\quad(x\ge0),
$$
so $F$ is strictly increasing there. No differentiation with respect to $h$ at zero is needed; the variable here is $x=h^2$.

The accepted first-integral confinement gives $x<h_U^2<81/64$. Exact rational evaluation and comparison, reproduced by the independent companion, give
$$
F(x)<F(81/64)=\frac{2438089}{2258160},
$$
$$
\frac{27}{25}-F(81/64)=\frac{3619}{11290800}>0.
$$
Equivalently the unreduced positive cross-product difference is $18095$. This verifies both the endpoint value and comparison without a numerical root estimate or sampled angular coefficient.

Suppose $|\mathcal I|r_{\min}^2\ge(27/25)\ell^2$. Since $r^2\ge r_{\min}^2$ and $\mathcal I<0$, the exact scalar bracket satisfies, for $\ell\ne0$,
$$
|\mathcal I|r^2-F(x)\ell^2
\ge\left(\frac{27}{25}-F(x)\right)\ell^2>0.
$$
The prefactor $5/(2er^4)$ is positive. Thus the scalar term is strictly positive at every phase, even at equality of the criterion. The nonnegative meridional form cannot cancel it, so $W_\chi>0$. For $\ell=0$, the scalar part is $-5\mathcal I/(2er^2)>0$ directly, including points where the meridional form has its null direction.

The intermediate weaker bound is also correct: $C>-3/4$ and $e<145/64$ imply $3e/10+1/2<151/128$. It gives the intermediate sufficient constant in the subject, while retaining exact $C$ gives the better $27/25$. The endpoint rational $2438089/2258160$ itself is smaller than $27/25$; the latter is a convenient stated sufficient bound, with no sharpness claim for that scalar constant.

## Scope, falsifiers and evidence preservation

The result assumes regular periodic radial/axial motion in the normalized simultaneous limiting equation with positive radius, fixed real angular constant, and the derived negative first integral. Relative periodicity is sufficient; the absolute azimuth need not close. The multiplier does not alter the canonical equation. Applying positivity as an exclusion of exact slow-family limits retains the independently proved limiting/convergence and necessary-zero-mean hypotheses. No numerical candidate membership, physical energy premise, stability conclusion or finite-speed threshold follows.

Operator-checkable falsifiers include a wrong general multiplier coefficient or Hessian sign, a mismatch in either explicit determinant polynomial identity, failure of the positive leading entry for $x\ge0$, a null direction different from the one displayed at $x=1/2$, a sign error in $N'd-8N$, an incorrect rational endpoint comparison, or a regular periodic limiting orbit satisfying the criterion but with $W_\chi\le0$. A different successful multiplier would not contradict the limited maximality statement. A finite-speed causal-delay example outside the limiting hypotheses would not falsify this theorem.

The independent target followed the recorded known pass and exited zero at 2026-10-07 04:59:31 UTC in 0.000511 internal seconds by `time.perf_counter()`. Both commands used shared-venv Python with `OPENBLAS_NUM_THREADS=OMP_NUM_THREADS=MKL_NUM_THREADS=1`, ran synchronously, and launched no background process. Peak memory was not measured; no empirical memory claim is made. The original known and target receipts remain under `.local-data/master-equation-closure/overnight2-b/independent-sharp-log-radius/`. No receipt was removed, moved or replaced, and no replay or remote-backup claim is made.

This report and its independent companion are the only authored deliverables. The frozen subject, previous instruments/reports/receipts, parent account and shared owners were not edited. No regular tests, production orbit run, recursive agent, generator or Git mutation was used. Parent integration is the receiving disposition step for this bounded review.

Final scoped validation: shared-venv built-in `compile` accepted the companion without creating bytecode. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for either new deliverable; exit one denotes the new-file difference. Native `shasum -a 256` measured the following identities, including the unchanged independent instrument identity recorded before target use and the subject instrument identity stated by the frozen subject. By `wc -lc`, the original known receipt is 13 lines and 344 bytes, and target is 56 lines and 1,070 bytes.

| Item | SHA-256 |
| --- | --- |
| Frozen subject Markdown | `73108e152fad72e7db4cd7fa512f8fdd359ab8178e074324e62ad3ef9a99f631` |
| Frozen subject instrument | `3841ddb0a844c50ac0e607c0fdae1a7b2685b17c9ea5816cd2ef050f88c047c5` |
| Independent instrument | `ab380810674cdc6c4af91542cd6d3b56dffbdea1de0121596242e8551c6e63ed` |
| Independent known receipt | `cd5a520e4030f51c38c4774915de9ebc210508b42dbda90f10d2c1b355bc6fb1` |
| Independent target receipt | `f17fa3ba692e084d7ef09711009b2cbf346bf9383f28733f0c9974902358ed0b` |
