# From sampled growth matrices to a validated comparison

## Scope

The refined positive diagnostic reaches time 67 within its nominal allowance, but it samples both the acceleration residual and the error-growth coefficients. This note defines the next validation step. It applies the previously reviewed [geometry-preserving comparison](overnight-d-finite-geometry-enclosure.md) to the declared increment-defined reference. It changes neither the preparation nor the equation. Every statement below is conditional on complete root and source-piece coverage, initialization, interval residuals and the explicitly separate source-zero jump allowance. It is a proposal for validation, not a completed finite-history result.

## A verified matrix norm without trusting an eigenvalue seed

Let $A$ be a real matrix with three rows. An interval matrix encloses its entries. Choose an encoded midpoint matrix $A_0$ and let $R$ bound each entry of $A-A_0$ in absolute value. The triangle inequality and Frobenius bound give

$$
\|A\|_2\le\|A_0\|_2+\|R\|_F.
$$

A floating singular-value calculation may propose a positive number $b$, but it does not establish that bound. Form the exact symmetric three-by-three matrix $b^2I-A_0A_0^\top$. If outward arithmetic proves that its three leading principal minors are positive, Sylvester's criterion makes it positive definite. Therefore every eigenvalue of $A_0A_0^\top$ is below $b^2$, and $\|A_0\|_2<b$. Interval products and determinant evaluation certify this condition for the exact encoded midpoint. The proposed value is increased if verification fails. The matrix norm result is falsified by an admitted matrix whose norm exceeds the returned bound, or by a claimed positive minor whose exact value is not positive.

The instrument `overnight2-d-interval-matrix-norm.py` implements that calculation with the unchanged outward arithmetic primitives. It passed diagonal, rank-one, rectangular Gram, interval-box and subnormal controls before any scientific target. The singular-value routine supplies a candidate only. The exact zero midpoint has a separate mathematical zero branch. A coordinate absolute-sum bound replaces the square root when squared norms are subnormal, preserving a valid upper bound rather than changing the frozen square-root oracle.

## Receiver cancellation and delayed blocks

In the strict interior, with a constant weight $\alpha>0$, the receiver growth matrix is

$$
M_i=\begin{pmatrix}0&\alpha I\\B_i/\alpha&0\end{pmatrix},
\qquad B_i=\sum_{j\ne i}\overline B_{ij}.
$$

Its symmetric part has off-diagonal block $(\alpha I+B_i^\top/\alpha)/2$. The eigenvalues of a symmetric off-diagonal block matrix are the positive and negative singular values of that block. Thus its largest eigenvalue is exactly

$$
\mu_i=\frac12\left\|\alpha I+\frac{B_i^\top}{\alpha}\right\|_2.
$$

Enclose the signed sum $B_i$ before applying the verified norm. This preserves the cancellation in the reviewed energy inequality. The same norm instrument applies to the three-by-six delayed block $[-\overline B_{ij}/\alpha\ \ \overline C_{ij}]$. Interval matrices must cover the entire reception cell, its source-time range and the admitted receiver-translation and source-velocity additions. A midpoint matrix does not establish those premises. Receiver acceleration knots and source acceleration knots require complete one-sided or almost-everywhere coverage; source velocity jumps require the separate finite-jump treatment.

## Method-of-steps upper barrier

On a reception cell of width $h$, suppose verified nonnegative constants $m_i,f_i$ bound the receiver logarithmic norm and the sum of residual and delayed forcing. If the complete source brackets lie before the cell's left endpoint, the delayed envelope is already known. The scalar equation $E_i'=m_iE_i+f_i$ gives

$$
E_i(t+h)=e^{m_ih}E_i(t)+h\,\varphi(m_ih)f_i,
\qquad
\varphi(x)=\sum_{k=0}^{\infty}\frac{x^k}{(k+1)!}.
$$

Outward series bounds can enclose both factors without subtracting nearly equal exponentials. For $0\le x<1$, the tail after term $N$ is bounded by its first omitted term divided by $1-x/(N+2)$ for the exponential, with the analogous shifted denominator for $\varphi$. This follows because every later term ratio is no greater than the first omitted ratio. Positive coefficients give monotone upper barriers. A conservative endpoint of an already validated past cell can bound an accessible delayed envelope; interpolating an unvalidated numerical history cannot.

The coefficient region may be selected through a local upper trial allowance. If the complete matrix bounds on that region produce an endpoint strictly below the trial value, the first-contact argument admits the cell. If the bound exceeds the trial, enlarge it and recompute or subdivide; do not accept the guessed region by circular reasoning. All initialization, source-zero mismatch and reference-residual contributions remain in the budget. Positive root margins and continuation premises must hold jointly with the resulting envelope.

## Outstanding work

The matrix norm implementation awaits independent review. Whole-cell matrix construction, adaptive source-piece coverage, residual integration and the event allowance are not yet implemented in a complete application. The main [research account](overnight2-d-followup-and-research-2026-10-07.md) owns the measured reference results, clock, independent dispositions and retained evidence. No sampled comparison is promoted by this proposed construction alone.

## Root and source boxes for the matrix region

For a nominal reference delay candidate $\widehat\tau$, let $\delta_0$ be the already derived gap-based bound on its exact reference root error. A receiver translation of norm at most $P$ changes the causal gap by at most $P$. The same strong-monotonicity constant $1-L$ therefore bounds the translated root's displacement from the candidate by

$$
\delta=\delta_0+\frac{P}{1-L}.
$$

If $\widehat{\mathbf R}$ is the candidate source-to-receiver vector, the translated vector differs from it by at most $P+L\delta$. Divide its enclosing coordinate box by the positive delay interval to enclose the actual unit normal. The complete root theorem supplies positive-root existence when the present reference separation exceeds $P$, together with the delay lower bound $(d-P)/(1+L)$. These analytic bounds may tighten interval factors: the actual unit normal gives $\gamma\ge1-L$ and $D\ge1-L-Z$ for a source-velocity addition of norm at most $Z$. Coordinate boxes need not themselves consist of unit normals; the intersection is justified by the actual admitted root geometry.

The entire source-time interval enlarged by $\delta$ must be covered. On the negative branch, the literal analytic velocity and acceleration are enclosed directly. On positive time, every intersected reference polynomial contributes its velocity and acceleration enclosure, and their union is retained. A source-zero crossing is rejected for separate finite-jump handling. Candidate source-polynomial composition also rejects an unresolved piece crossing rather than silently choosing a midpoint piece. The resulting boxes are substituted into the reviewed $B,C$ formulas, summed with their polarity signs and passed to the verified norm upper-bound calculation.

The new `overnight2-d-interval-variation.py` implements a one-cell pilot of this construction. Its static-source control encloses $B=\operatorname{diag}(-1/4,1/8,1/8)$ and $C=\operatorname{diag}(1/4,0,0)$ at delay two. At weight one half its receiver logarithmic norm is exactly $3/8$ and delayed block norm squared is $5/16$; these controls passed before a target. The implementation and its provenance guards still require independent review before use in a propagated certificate.
