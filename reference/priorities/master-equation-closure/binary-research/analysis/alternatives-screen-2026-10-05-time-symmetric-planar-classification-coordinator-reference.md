# Coordinator reference for the complete small-speed real planar frequencies

**Derived candidate, frozen before the worker's complete classification report.** The case remains the exactly balanced equal-past/future circle and complete Cartesian derivative in the [continuous-frequency source](alternatives-screen-2026-10-05-time-symmetric-planar-frequency-independent.md). The coordinator received the worker's observation that the common translation determinant has a double root before constructing this reference; the algebraic check and completeness argument below are reconstructed independently. The opposite simple branch was already independently derived and assessed.

Write $H_\chi(m,x)$ for the Hermitian planar matrix and $F_\chi=\det H_\chi$, with $x=\beta\cos x$. At zero speed in the normalized analytic continuation,

$$
F_+(m,0)=(m^2-1)^2,\qquad F_-(m,0)=m^2(m^2-1).
$$

The physical radius diverges at that limiting point; no finite zero-speed circle is asserted. All normalized coefficient matrices remain analytic near it.

## No real frequency can escape to infinity at small speed

For real m the rotations and exponential source phases have norm one. At x zero, each normalized source-position tensor has norm one, and each source-velocity tensor vanishes. By continuity, choose a positive neighborhood in which every normalized source-position tensor has norm below two and every source-velocity tensor has norm below one-fifth. The complete two-sided source operator on the right of $(imI+J)^2$ then has norm below $4+(|m|+1)/5$, including both receiving and source-position contributions and the rotated physical source derivative. The smallest singular value of $(imI+J)^2$ is $(|m|-1)^2$. For $|m|\ge4$,

$$
(|m|-1)^2>4+\frac{|m|+1}{5}.
$$

Thus the characteristic matrix is invertible there. This uses no small-delay Taylor approximation at large frequency: the exact oscillating factors keep norm one. Compact uniform convergence on $|m|\le4$ then confines all real zeros to arbitrarily small fixed neighborhoods of the zeros of the limiting polynomials.

## Symmetry roots and their multiplicities

The opposite phase direction gives $F_-(0,x)=0$ exactly. Evenness in m gives an analytic factor $m^2$, whose complementary factor is minus one at $(m,x)=(0,0)$. It stays nonzero nearby. The opposite roots near plus and minus one are the already proved simple branches $\pm m_*(x)$, with $m_*=1-x^2/2+O(x^4)$.

For the common sector a constant physical translation gives the exact root m one. At that point the matrix has the form $h\begin{pmatrix}1&i\\-i&1\end{pmatrix}$, with $h\to-2$. Its determinant derivative is $h(a_m+d_m-2f_m)$. With $C_2=\cos2x$, $S_2=\sin2x$, the coefficient identities

$$
U+V=(\alpha+\zeta)C_2+2\kappa cs,
\qquad
2W=(\alpha+\zeta)S_2-\kappa C_2
$$

give $a_m+d_m-2f_m=0$ exactly at m one. To see the cancellation directly, the terms without x are $\kappa C_2S_2-2\kappa csC_2=0$. The coefficient identities give $(U+V)S_2-2WC_2=2\kappa csS_2+\kappa C_2^2=\kappa$. The terms containing x are therefore $-2x\kappa+2x\kappa C_2^2+4x\kappa csS_2=0$, since $S_2=2cs$ and $C_2^2+S_2^2=1$. Equivalently this identity can be checked from the three displayed elementary matrix entries before any truncation.

Analytic division therefore factors $F_+$ by $(m-1)^2$ near one; the complementary factor tends to four and remains nonzero. Reflection gives the same double root at minus one. There is no nearby splitting into a new real frequency. The rank at each common root is one for sufficiently small positive x. The opposite rank at zero is likewise one and its determinant multiplicity is two. All remaining real frequencies have been excluded by the compact and tail arguments.

Consequently the complete real planar frequency set at sufficiently small positive speed is common $\{\pm1\}$ and opposite $\{0,\pm m_*\}$. Algebraic multiplicities are two, two, two and one respectively, counting the two signs separately. This statement does not classify complex frequencies or confer stability.

## Bounded versus polynomially growing variations

A bounded whole-line solution defines a tempered distribution. Fourier multiplication by the analytic matrix confines its transform to the finite real zero set. Near a rank-one double determinant zero, elementary analytic row and column operations reduce the symbol to an invertible scalar and a scalar with a double zero. The inverse transform therefore consists of exponential modes and their degree-one polynomial companions. Simple roots have only ordinary exponential modes. Boundedness removes every nonzero polynomial term: distinct real frequencies cannot cancel their leading polynomial coefficients on the whole line. Rank one leaves one complex eigenvector at a nonzero root and one real eigenvector at zero.

The bounded common sector is precisely the two real translations. The bounded opposite planar sector is the phase direction plus the two real components of the already admitted noninteger branch. Hence its bounded real dimension is five. Adding the independently classified three bounded normal Euclidean directions gives full Cartesian bounded dimension eight: six Euclidean directions and two non-Euclidean planar directions. This is a linear whole-line classification, not a nonlinear family or a causal initial-value stability claim. Polynomial companions may exist but their physical interpretation requires a separate chain calculation; no Galilean symmetry or nonlinear boost is assumed.

Falsifiers are failure of the exact common derivative cancellation, the uniform large-frequency norm inequality, analytic rank or multiplicity at a limiting root, the matrix-distribution reduction, or the previously admitted normal classification. The explicitly chosen tensor bounds are existential continuity bounds; no numerical speed cutoff is claimed. No numerical target or external physical law is used.

The initial freeze `92f066ad…` contained a transcription error in the displayed explanation of the common derivative cancellation. The expanded derivative above was corrected by direct differentiation before receipt of the worker classification; no conclusion or input changed.
