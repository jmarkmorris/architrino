# Independent review of interval matrix norms and local comparison

## Disposition

**Derived verdict:** the [matrix instrument](overnight2-d-interval-matrix-norm.py) supplies a valid spectral-norm upper bound whenever its verification succeeds, under the frozen outward-arithmetic contract. The [comparison proposal](overnight2-d-interval-comparison.md) has the correct constant-weight interior logarithmic norm, method-of-steps solution and series-tail argument. The local trial bootstrap is valid when the entire trial region, past envelope and continuation premises are jointly admitted.

**Concrete limitation:** the instrument fails closed for some very small nonzero midpoint matrices because the third principal minor underflows. The coordinate-sum fallback handles the radius norm, not this determinant problem. Also, the returned interval's upper endpoint is the norm upper bound; the interval itself need not contain the true norm. Neither qualification invalidates successful upper-bound verification, but both belong in the consumer contract.

Built-in and independent analytical controls passed as recorded below. No scientific target or heavy computation ran. Only this new companion was authored; the matrix source, imported primitive and earlier reviews remain unchanged. During closeout the parent appended “Root and source boxes for the matrix region” to the comparison note and explicitly notified this review. That added section and its new variation instrument are excluded from this disposition. The reviewed original prefix was verified byte-for-byte by its hash, as recorded below. The parent owns integration in the [research account](overnight2-d-followup-and-research-2026-10-07.md). The Ramon E. Moore role and shared Specialist charter supply a review lens, not theory or acceptance authority.

## 1. Midpoint, radius and verified singular-value bound

Let $\mathcal A$ be the supplied interval matrix and choose the encoded matrix $A_0$ computed by `lo/2+hi/2`. It need not be the exact real midpoint, or even belong to a very narrow interval after underflow. The proof only requires a fixed encoded matrix and an entrywise bound $R_{kl}\ge\sup_{A\in\mathcal A}|A_{kl}-(A_0)_{kl}|$. The outward subtraction and endpoint absolute maxima in `spectral` provide that bound. Thus, for every admitted matrix,

$$
\|A\|_2\le\|A_0\|_2+\|A-A_0\|_F
\le\|A_0\|_2+\left(\sum_{kl}R_{kl}^2\right)^{1/2}.
$$

`product` encloses each scalar product by summing all interval products. For the exact encoded midpoint, it therefore encloses $G=A_0A_0^\top$. The exact matrix $M=b^2I-G$ is symmetric, independently of any asymmetry in its interval representation. Its leading principal minors are $M_{11}$, $M_{11}M_{22}-M_{12}M_{21}$ and the full determinant. The implemented determinant expansion has the correct signs and indices.

Positive lower bounds for all three minors prove positive definiteness by Sylvester's criterion. Consequently all eigenvalues of $G$ lie below $b^2$, so $\|A_0\|_2<b$ for the positive proposed $b$. The floating SVD result is only a proposal; inaccurate seeds can cause extra retries or failure, but cannot certify a norm through this test without the required interval inequalities.

The helper `positive` is valid for this symmetric exact matrix. Positive leading minors alone are not a positive-definiteness test for arbitrary nonsymmetric matrices. For example, a triangular matrix with diagonal entries one and a large off-diagonal entry has positive leading minors while its symmetric part can be indefinite. The internal use has the necessary symmetry, so this is a helper-domain qualification rather than an internal defect.

Each returned upper endpoint encloses $b+\|R\|_F$, or a conservative replacement for the radius norm. It is not generally a two-sided enclosure of $\|A\|_2$. For instance, an interval box containing the zero matrix may produce a strictly positive lower endpoint. A consumer must use `.hi` as the upper bound and carry subsequent scaling, including the factor $1/2$ in the logarithmic norm, through outward arithmetic.

## 2. Small magnitudes and failure modes

For small squared norms, `frobenius` uses

$$
\left(\sum_{kl}R_{kl}^2\right)^{1/2}\le\sum_{kl}|R_{kl}|.
$$

The latter sum avoids taking a square root of an underflow-scale accumulated square. The threshold `1e-290` is conservative and need not identify only genuinely subnormal values. The fallback preserves an upper bound, including when exact-zero operations have acquired adjacent-float interval widths. Finite IEEE operations with gradual underflow and working `nextafter` remain assumptions; flush-to-zero behavior would invalidate the underlying arithmetic contract.

The fallback does not cover midpoint determinant underflow. Independent controls found that `spectral(I(1e-100*np.eye(3)))` and `spectral(I(1e-160*np.eye(3)))` each raised `ArithmeticError('midpoint spectral bound failed verification')` after the bounded attempts. Their exact norms are respectively the positive encoded diagonal values. Products forming the third minor are too small for strict positivity to survive enclosure. This is an availability limitation and unresolved norm calculation, not a scientific negative or an underestimated returned bound.

A safe subsequent repair could rescale by an exactly controlled power of two before verification, or return a direct coordinate-sum/Frobenius upper bound for the whole input when midpoint verification fails. Such a repair is not present or accepted here. The existing zero-midpoint branch does cover inputs whose encoded midpoint becomes zero: for the interval box from zero to the minimum positive subnormal $u$ in every entry, the returned upper bound covered the exact witness $u\mathbf1_{3\times3}$ of norm $3u$.

The source calculates the SVD seed before checking `mid==0`, despite the comment saying zero needs no eigenvalue computation. This affects only unnecessary work and the unsupported empty-column edge case; the mathematical zero branch itself is sound. The useful entry domain should state a positive number of columns. Overflow, failed square-root verification and failed principal-minor verification must remain explicit failures, never substituted by the unverified SVD seed.

## 3. Interior logarithmic norm and signed blocks

For constant $\alpha>0$ and vanishing ceiling reaction on an admitted strict-interior region, the weighted error matrix is

$$
M_i=\begin{pmatrix}0&\alpha I\\B_i/\alpha&0\end{pmatrix}.
$$

Its symmetric part has the form $\begin{pmatrix}0&H\\H^\top&0\end{pmatrix}$ with $H=(\alpha I+B_i^\top/\alpha)/2$. If $Hv=\sigma u$ and $H^\top u=\sigma v$, then $(u,v)$ and $(u,-v)$ are eigenvectors with eigenvalues $\sigma$ and $-\sigma$. Zero singular values contribute zero eigenvalues. This proves

$$
\mu_i=\lambda_{\max}\!\left(\frac{M_i+M_i^\top}{2}\right)
=\frac12\left\|\alpha I+\frac{B_i^\top}{\alpha}\right\|_2\ge0.
$$

The signed sum $B_i=\sum_{j\ne i}\overline B_{ij}$ must be enclosed before taking the norm. For $B_i=-\alpha^2I$, the exact expression is zero; replacing signed entries by magnitudes first destroys that cancellation. The delayed block $[-\overline B_{ij}/\alpha\ \overline C_{ij}]$ acts on the source's weighted position/velocity error and has three rows, so the same norm proof applies to its six columns.

This is a constant-weight, strict-interior identity. A varying weight adds $\alpha'/\alpha$ to the receiver matrix; a nonzero reaction changes the relevant comparison. Neither modification is covered by the displayed identity. Complete homotopy/source domains, source velocity-jump contributions and one-sided or almost-everywhere knot bounds remain necessary, as the proposal states. A successful norm calculation alone establishes none of them.

## 4. Scalar step and exact series tails

For $m,f\ge0$, incoming upper allowance $E_0\ge0$, and step width $h\ge0$, the constant-coefficient scalar solution is

$$
U(s)=e^{ms}E_0+s\varphi(ms)f,\qquad
\varphi(x)=\sum_{k=0}^\infty\frac{x^k}{(k+1)!}.
$$

The $m=0$ case gives $U(s)=E_0+sf$ without division by $m$ or cancellation of exponentials. Define truncations through index $N\ge0$. For $0\le x<1$, the exact remainders satisfy

$$
0\le e^x-\sum_{k=0}^N\frac{x^k}{k!}
\le \frac{x^{N+1}}{(N+1)!}\frac1{1-x/(N+2)},
$$

$$
0\le \varphi(x)-\sum_{k=0}^N\frac{x^k}{(k+1)!}
\le \frac{x^{N+1}}{(N+2)!}\frac1{1-x/(N+3)}.
$$

After the first omitted term, successive exponential terms have ratio at most $x/(N+2)$; the shifted series has ratio at most $x/(N+3)$. Summing the dominating geometric series proves both bounds. These explicit indices agree with the proposal's stated exponential denominator and its analogous shifted denominator. The restriction $x<1$ is sufficient; any broader domain needs its own positive-ratio-denominator check. A future implementation must outwardly evaluate the terms, tail and $x=mh$, including a positive lower bound for each denominator. No such full scalar application is implemented by this matrix-only module.

## 5. Local trial bootstrap

Assume each incoming bound covers the exact error, every accessible source bracket lies in already validated history, and the proposed trial region supplies all root, factor, matrix, residual and continuation bounds up to possible first contact. Let $m_i,f_i$ be valid nonnegative constants on that whole region, including the delayed-envelope supremum over every source bracket. Scalar comparison gives $Y_i(t+s)\le U_i(s)$ until any first contact.

Since $m_i,f_i,E_i(t)$ are nonnegative, $U_i(s)$ is nondecreasing. Therefore strict endpoint inequalities $U_i(h)<R_i$ for every member's trial radius exclude all contacts with those radii anywhere in the cell. Local continuation then admits the cell. This is the proposed first-contact argument with its necessary joint hypotheses made explicit. It is not a proof when matrices were checked only on a smaller sampled path, a source bracket reaches unfinished history, or the trial radius is assumed to contain the solution without the strict barrier test.

A past-cell right endpoint bounds that cell only if its saved comparison barrier is proved nondecreasing there, as this nonnegative scalar construction is. An arbitrary validated but nonmonotone past envelope needs its supremum, not just its endpoint. An integrated source-front contribution must be placed with a justified bound for every possible injection time; it cannot silently become a pointwise forcing constant. With nonnegative growth, assigning a certified total impulse at the cell's beginning is conservative, provided the allowance and localization are themselves valid. Receiver/reference knots and possible event orderings require the coverage already stipulated by the proposal.

## 6. Executed controls, identities and falsifiers

The shared-venv command `overnight2-d-interval-matrix-norm.py`, with one-thread BLAS settings and bytecode output disabled, returned exit zero and both built-in control groups reported `PASS`. These include the imported primitive controls. Additional inline checks began with a known interval-containment inclusion/exclusion and used independent exact analytical answers:

- A nonnormal matrix with nonzero entries $A_{12}=2,A_{33}=1$ has norm two; a rank-one row $(1,2,2,0)$ has norm three. Both were covered.
- The positivity helper rejected diagonal matrices $(1,1,-1)$ and $(1,-1,-1)$ and accepted the known positive definite matrix with leading block $\begin{pmatrix}2&1\\1&2\end{pmatrix}$ and final diagonal one.
- A rectangular interval box $[-\epsilon,\epsilon]^{3\times4}$, $\epsilon=2^{-20}$, contains the all-positive matrix with squared norm $12\epsilon^2$. The squared returned upper endpoint was checked against that exact rational witness.
- The subnormal box $[0,u]^{3\times3}$ returned `[4.4e-323, 1.33e-322]`; its upper endpoint exceeds the exact norm witness $3u$. This is stronger than the built-in control's nonnegativity assertion and also demonstrates why the lower endpoint is not a lower bound on all admitted matrix norms.
- The two tiny nonzero diagonal midpoint cases above failed closed. A diagonal with the minimum subnormal value returned an upper bound through the encoded zero-midpoint branch.
- Exact rational checks at $x=0,1/2,99/100$ and $N=0,1,8$ confirmed that the explicit exponential and shifted-series geometric bounds dominate finite tail sums through index 59. The full infinite-tail proof is the ratio argument above; these finite controls are not its replacement.

Direct `shasum -a 256` reads at review entry measured the matrix source as `c026c2689ee0b222f00cbfeb7beb56f42f3423a39b13dae82588cb8def978775`, the comparison note as `e5f3495cc090be88bb1d4e92612da3ae206ed9c5acca27d68dfda57516da7f0c`, and the unchanged imported primitive as `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff`. Inline controls wrote no files. No target output or previous review was changed.

At closeout the matrix and primitive identities remained unchanged. The full comparison note now hashes to `2ce1f7a02012b8afff330f4bf02887e2087aadbc925b3d4784f4b3eb91d91449`. A prefix extractor, first checked on a known synthetic prefix-and-heading case, split the bytes immediately before the appended heading. The extracted prefix hashes exactly to the entry identity `e5f3495cc090be88bb1d4e92612da3ae206ed9c5acca27d68dfda57516da7f0c`. Thus the original reviewed material is preserved; the full document did not stay frozen, and the added section is not accepted by this review. Explicit `test -f` checks passed for the three distinct relative-link destinations, none with fragments. Scoped `git diff --no-index --check /dev/null` on this new review emitted no whitespace diagnostics; its difference exit status is expected for a new file.

The successful norm claim is falsified by an admitted matrix whose exact norm exceeds the returned upper endpoint, or by a verified positive minor whose exact value is nonpositive. The logarithmic identity is falsified by a constant-weight strict-interior matrix with a different largest symmetric-part eigenvalue. The series bounds fail if their infinite tails exceed the proved geometric dominators. The local bootstrap fails if a first contact occurs despite all joint domain, delay-coverage, incoming-bound and strict-endpoint hypotheses. Missing hypotheses or an arithmetic rejection remain unresolved application conditions; they establish no actual-history result.
