# Optimizing the constant full-distance logarithmic multiplier

## Question and fixed proof family

Claim grade: self-derived extension under verification. The [accepted full-distance quadratic identity](overnight2-b-independent-log-radius-quadratic.md) used $\Phi=(4/3)\log\sqrt{r^2+z^2}$. This document varies only that proof multiplier, not the canonical equation or a physical response parameter. For a constant $a>0$, set $\Phi=a\log\sqrt{r^2+z^2}$ and repeat the same exact first-integral substitution. It gives
$$
W_\chi=\left\langle
\frac{A_a u^2+2hB_a uv+D_a v^2}{r^2}
+\left(C-\frac{a}{2e}\right)\frac{\ell^2}{r^4}
-\frac{a\mathcal I}{er^2}
\right\rangle,
$$
where $x=h^2$, $e=1+x$ and
$$
A_a=P-\frac{a(x-1)}{e^2}+\frac{a}{2e},\qquad
hB_a=Q+\frac{2ah}{e^2},\qquad
D_a=S-\frac{a(1-x)}{e^2}+\frac{a}{2e}.
$$
All symbols, regularity, periodicity and limiting-equation premises are unchanged from the accepted identity. The mathematical first integral remains negative only under those declared premises.

The proposed improved choice is $a=5/2$. A direct hand calculation at $x=1/2$ gives
$$
A_a=\frac16+\frac{5a}{9},\qquad
D_a=\frac12+\frac a9,\qquad
B_a=-\frac23+\frac{8a}{9},
$$
$$
A_aD_a-\frac12B_a^2=-\frac{(6a-1)(2a-5)}{36}.
$$
Hence no $a>5/2$ makes this meridional form positive semidefinite throughout all real height ratios. If the candidate $a=5/2$ is globally positive semidefinite, it is the largest admissible constant within this specific proof family. This is not optimality among all possible multipliers or all exclusion methods.

## Known-first arithmetic record

Before target use, the [new exact symbolic companion](overnight2-b-sharp-log-radius.py) passed its known stage under the shared venv with one numerical thread. Controls checked $(2x-1)^2$, the factorization of $x^2-1$, and the previous independently certified $a=4/3$, zero-height diagonal $(5/12,9/4)$ and determinant $15/16$. The known receipt identity is 1d728e359132e0fefc6d983f946018d4e9a57de0335a0b13d632ab59adebc1ba, retained under sharp-log-radius. This record precedes the target algebra.

The target exited zero in 0.039958 internal seconds and retained exact factorizations. Its receipt identity is 8c4e25f98b79417626f7c7aa30b7dee6a67b54f51c0ff12198063cbf46f588ae; the instrument identity is 3841ddb0a844c50ac0e607c0fdae1a7b2685b17c9ea5816cd2ef050f88c047c5. It gives
$$
A_{5/2}=\frac{64x^4+40x^3+360x^2+154x+13}{6(1+x)^2(1+4x)^2},
$$
$$
B_{5/2}=\frac{136x^2+56x+1}{2(1+x)^2(1+4x)^2},\qquad
D_{5/2}=\frac{64x^4+448x^3+120x^2-11x+10}{6(1+x)^2(1+4x)^2},
$$
$$
A_{5/2}D_{5/2}-xB_{5/2}^2
=\frac{(2x-1)^2(8x+5)(16x^2+92x+13)}{18(1+x)^2(1+4x)^3}.
$$
For $x\ge0$, $A_{5/2}>0$ and the determinant is nonnegative. Completing a square therefore proves the meridional form positive semidefinite everywhere, including $x=1/2$ where it has rank one. The negative coefficient in the expanded numerator of $D_{5/2}$ is preserved; positivity does not follow from a claim that every displayed coefficient is positive. The determinant and positive leading entry suffice. At $x=1/2$ the null direction is $u=-hv$. The same target independently returns the displayed general determinant at $x=1/2$, proving that every $a>5/2$ fails pointwise semidefiniteness within this constant-multiplier family. No numerical orbit or sampled radius minimum was used.

## Intended criterion and scope

The accepted inequality $C>-3/4$ makes the scalar part strictly greater, for $\ell\ne0$, than
$$
\frac{a}{er^4}\left[
|\mathcal I|r^2-\left(\frac{3e}{4a}+\frac12\right)\ell^2
\right].
$$
At $a=5/2$, the general confinement $e<145/64$ gives
$$
\frac{3e}{4a}+\frac12=\frac{3e}{10}+\frac12<\frac{151}{128}.
$$
Thus global semidefiniteness establishes the sufficient condition
$$
|\mathcal I|r_{\min}^2\ge\frac{151}{128}\ell^2
\quad\Longrightarrow\quad W_\chi>0.
$$
The old criterion used $1817/1024$. A still better bound retains the exact angular coefficient rather than replacing it by $-3/4$. The scalar part at $a=5/2$ is exactly
$$
\frac{5}{2er^4}\left[|\mathcal I|r^2-F(x)\ell^2\right],\qquad
F(x)=\frac12-\frac25(1+x)C(\sqrt x).
$$
Put $N(x)=19-72x-192x^2-128x^3$, so $(1+x)C=N/[12(1+4x)^2]$. Direct differentiation gives
$$
\frac{d}{dx}\bigl[(1+x)C\bigr]
=-\frac{8(7+3x+12x^2+16x^3)}{3(1+4x)^3}<0.
$$
Hence $F$ is strictly increasing for $x\ge0$. The confinement $x<81/64$ gives the exact upper comparison
$$
F(x)<F(81/64)=\frac{2438089}{2258160}<\frac{27}{25}.
$$
The final rational comparison has positive cross-product difference $2258160\cdot27-2438089\cdot25=18095$. Consequently the simpler and stronger final sufficient condition is
$$
|\mathcal I|r_{\min}^2\ge\frac{27}{25}\ell^2
\quad\Longrightarrow\quad W_\chi>0.
$$
For $\ell\ne0$ the scalar part is strictly positive even at the displayed criterion boundary; for $\ell=0$ it is positive because $\mathcal I<0$. The meridional form need only be semidefinite. These constants are exact proof bounds, not fitted parameters of a model. The optimality statement concerns the largest admissible constant $a$ in this multiplier family; $27/25$ is a convenient sufficient scalar bound and is not claimed globally optimal. No finite-speed threshold, orbit membership, exact reference or stability claim follows.

The polynomial signs and scalar comparisons are now self-verified and require independent adjudication. A faulty multiplier identity, a negative principal minor, an incorrect determinant factorization or scalar comparison would defeat the corresponding claim. Frozen earlier subjects and references remain unchanged.
