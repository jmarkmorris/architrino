# Multiple-period resonance and a continuously differentiable bifurcation route

**Derived candidate, frozen before the independently assigned multiple-period report.** Fix the equal-past/future canonical radial law with $K=c_f=1$, an opposite-polarity mirror pair and the complete exactly balanced circles. This source concerns periodic boundary solutions; it supplies no causal release or stability. The independently admitted [all-speed real-frequency classification](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-complete-adjudication.md) is an antecedent, not re-proved here.

## 1. Frozen resonance case

Let $k$ be any sufficiently large integer and prescribe the rotating frequency $m_k=(k-1)/k$. The circle's simple opposite root is analytic and even near zero speed, with $m_*(\beta)=1-\beta^2/2+O(\beta^4)$ and $m_*'(\beta)=-\beta+O(\beta^3)<0$. Analytic inversion in $b=\beta^2$ gives a unique sufficiently small speed

$$
m_*(\beta_k)=1-\frac1k,\qquad \beta_k=\sqrt{\frac2k}\,[1+O(k^{-1})].
$$

The threshold integer is existential; no numeric k is admitted. On the period $2\pi k$ in rotating time $\theta=\omega(\beta)T$, the non-Euclidean pair becomes periodic. The complete real-frequency classification gives full Cartesian fixed-multiple-period kernel dimension eight at resonance and six when $km_*(\beta)$ is not an integer. These are six Euclidean directions plus the two real opposite oscillations; generalized chains are not periodic. Since the null vector has both circular components nonzero, this is a genuine resonance, not a zero displacement under the physical rotation.

## 2. A one-dimensional reversible kernel

For existence, restrict to the exact nonlinear invariant class $X_2=-X_1$ in a fixed plane. Reflection in the first coordinate axis together with $T\mapsto-T$ preserves the equal past/future law, interchanging the two root directions. In rotating coordinates write

$$
X_1(T)=R(\beta)Q(\theta)[e_R+u(\theta)],\qquad u(\theta+2\pi k)=u(\theta),\qquad u_r(-\theta)=u_r(\theta),\quad u_t(-\theta)=-u_t(\theta).
$$

Mirror symmetry removes common translations; the fixed plane removes tilts; reversibility removes the constant opposite phase direction. At $\beta_k$ the two real resonant directions reduce to one, of the form $\phi=(a\cos m_k\theta,-b\sin m_k\theta)$, with nonzero radial coefficient. The other quadrature violates the stated parity. The zero phase mode and all other real frequencies are excluded by the same parity and complete frequency census.

The parameter-dependent nonlinear acceleration residual, normalized by $R\omega^2$, is denoted $\mathcal F(\beta,u)$. Its domain is the reversible $C^2$ periodic space and codomain the corresponding reversible $C^0$ space. The circle is $\mathcal F(\beta,0)=0$. A sufficiently small complete $C^2$ neighborhood retains positive separation, speed below one, exactly one partner root in each time direction and no positive-age self root. Thus the periodic ansatz specifies the entire history, including every future and past source.

## 3. Why only one derivative is needed

For each root direction the implicit root has denominator bounded away from zero in this neighborhood. The root map from $C^2$ paths to continuous source times is continuously differentiable. Its derivative is the full source-clock variation, and differentiating the source velocity gives $\delta X_j'(S)+X_j''(S)\delta S$. Composition into $C^0$ is continuously differentiable for $C^2$ paths: the remainder follows from uniform continuity of the second derivative on the compact periodic domain. No actual third derivative is required for this first derivative. The same estimates hold jointly in $\beta$. Consequently $\mathcal F:C^2\to C^0$ is jointly $C^1$. A global $C^2$ map assertion is deliberately not used.

The linear operator $L_\beta=\mathcal F_u(\beta,0)$ has second-derivative principal part and lower-order constant-shift terms involving at most one derivative. The embedding from periodic $C^2$ to periodic $C^1$ is compact, so those lower-order terms are compact into $C^0$. The periodic second derivative restricted to the displayed even/odd subspaces is Fredholm of index zero; hence so is $L_\beta$. Its Fourier matrices are the previously derived Hermitian symbols. At resonance its one-dimensional kernel is spanned by $\phi$ and its range is the $L^2$ orthogonal complement of $\phi$: orthogonality follows on trigonometric polynomials and by periodic approximation, while index zero gives exact codimension one. Projection onto $\phi$ is bounded in both spaces.

Split $u=a\phi+w$, with $w\perp\phi$. The range equation $(I-P)\mathcal F(\beta,a\phi+w)=0$ has a unique local $C^1$ solution $w=w(\beta,a)$ by the Banach implicit-function theorem applied to the bounded inverse of the range restriction. Here $w(\beta,0)=0$ and $w_a(\beta_k,0)=0$. The remaining scalar equation is

$$
g(\beta,a)=\langle\phi,\mathcal F(\beta,a\phi+w(\beta,a))\rangle=0.
$$

It is $C^1$ and vanishes for $a=0$. The function

$$
h(\beta,a)=\begin{cases}g(\beta,a)/a,&a\ne0,\\g_a(\beta,0),&a=0\end{cases}
=\int_0^1g_a(\beta,ta)\,dt
$$

is continuous. This division needs only one derivative, not a twice-differentiable nonlinear operator.

## 4. Transversality and the scalar sign argument

Along the zero branch, $L_\beta$ is analytic in $\beta$, so $g_a(\beta,0)$ is analytic even if the full nonlinear map has only the asserted first derivative. At resonance its derivative is $\langle\phi,L_{\beta}'\phi\rangle$. The correction from $w_{a\beta}$ lies in the range and is annihilated by the left null vector. The simple Fourier determinant zero and $m_*'(\beta_k)\ne0$ imply this quantity is nonzero: at fixed $m_k$, differentiating $F_-(m_*(\beta),\beta)=0$ gives $F_{-,\beta}=-F_{-,m}m_*'\ne0$, and the other matrix eigenvalue is nonzero.

Choose sufficiently close fixed parameters on either side of $\beta_k$. Their values of $h(\beta,0)$ have opposite signs. Uniform continuity preserves those signs for every sufficiently small nonzero amplitude a. The intermediate-value theorem then gives at least one parameter $\beta(a)$ between them with $h(\beta(a),a)=0$. Shrinking the enclosing interval and using the isolated zero of $h(\beta,0)$ shows that all such local zero selections satisfy $\beta(a)\to\beta_k$ as $a\to0$. This establishes nontrivial periodic solutions at every sufficiently small prescribed amplitude, with no assertion that the selection is unique or differentiable. Since $w_a(\beta_k,0)=0$, their leading displacement is $a\phi+o(a)$.

The nonzero radial coefficient makes the radius nonconstant for sufficiently small nonzero amplitudes. The complete paths are thus noncircular periodic mirror-planar boundary solutions at positive separation and uniformly subfield speed. Their period is the prescribed $k$-fold circle period evaluated at the selected nearby parameter. Minimal period, nonlinear branch smoothness, multiplicity and stability remain separate questions. In particular the solutions need not be stable to perturbations outside the invariant class; no stability calculation is made here.

## 5. Assessment boundary

This argument is a candidate until independent assessment checks the full root-map $C^1$ estimates in the exact spaces, compactness/Fredholm claim, reversible parity and range identification. Kernel counting alone would not prove the nonlinear assertion. Failure of any of those steps leaves only the already derived linear resonance. An unproved second derivative must not be supplied by invoking a named bifurcation theorem. The explicit scalar intermediate-value argument is intended to avoid that regularity gap.

Falsifiers include loss of complete roots in the uniform periodic neighborhood, an omitted source-acceleration term, a failure of continuous Fréchet differentiability into $C^0$, a nonclosed or incorrectly identified range, an extra reversible kernel, zero parameter transversality, or a scalar sign argument that does not yield actual zeros. No standard-physics action, energy conservation or causal evolution is used.
