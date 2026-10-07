# Independent review of projected comparison velocities

## Disposition and scope

**Derived disposition:** the frozen [projected-reference comparison](overnight2-d-projected-reference-comparison.md) has the correct almost-everywhere projection derivative, residual signs, exactly vanishing complementarity allowances, and damped receiver logarithmic norm. No mathematical correction is required under its stated absolute-continuity and ordinary-region hypotheses. The independent controls below check exterior rotation, a projection crossing, and a nonsymmetric receiver coupling against exact rational identities.

This review concerns a conditional mathematical component only. It supplies no later reference, numerical residual, complete causal-root region, or actual-history extension. It does not change the current strict-interior runner or the original balance-1 seed-1 preparation, negative history, kick, or selected ceiling law. Units remain $c_f=1$. The live Ramon E. Moore role and Specialist charter supplied an analytical lens; the equations and independently determined controls supply the evidence. Parent integration belongs to the [existing research account](overnight2-d-followup-and-research-2026-10-07.md).

## Projection regularity and the level set

Let $Q$ be continuously differentiable on a compact interval away from a genuine prescribed velocity jump, and let $u=Q'$ be absolutely continuous. Put $r=|u|$ and $W=\Pi_B(u)$ for the closed Euclidean unit ball. Nonexpansiveness of projection gives, for disjoint subintervals,

$$
\sum_k|W(b_k)-W(a_k)|\le\sum_k|u(b_k)-u(a_k)|.
$$

The defining absolute-continuity criterion therefore transfers directly from $u$ to $W$. This is stronger than almost-everywhere differentiability and rules out a hidden singular-continuous contribution. On the open regions $r<1$ and $r>1$, ordinary differentiation gives

$$
W'=u'\quad(r<1),
\qquad
W'=\frac{u'}r-\frac{u(u\cdot u')}{r^3}
=\frac{(I-nn^\top)u'}r\quad(r>1),\qquad n=u/r.
$$

The scalar function $r$ is absolutely continuous. Its derivative vanishes almost everywhere on its level set $\{r=1\}$, including a level set of positive measure. At points where the derivatives exist there, $r'=n\cdot u'=0$. Thus the two formulas agree almost everywhere on the boundary. The proof does not require finitely many projection crossings or a positive crossing rate. At exceptional crossing points the classical derivative may fail to exist, but $W$ still has its absolutely continuous integral representation.

Consequently, crossing $r=1$ produces no atomic velocity increment or impulse. A finite piecewise polynomial reference with continuous first derivative meets the stated hypothesis on each compact ordinary chart. If $u$ instead has a genuine jump, that chart must be split and the actual comparison trace difference $\Delta W$ treated separately. Projection can reduce or even remove a particular comparison jump; it does not alter the physical kick or excuse an initialization discrepancy. No impulse budget should be added merely because a continuous $u$ crosses the projection boundary.

The kinematic defect is exactly $\rho^x=u-W$, with norm $(r-1)_+$. The formula $(r-1)_+n$ is interpreted as zero for $r\le1$ and therefore has no singularity at $u=0$. It remains present in the position-error equation and in the integrated-defect root-exclusion argument.

## Diagnostic reaction and acceleration residual

Let $a$ be the complete ordinary comparison acceleration evaluated with the declared reference positions and feasible source velocities. Suppose it is measurable and locally bounded on an admitted ordinary region. Define $\lambda=0$ for $r<1$ and $\lambda=(n\cdot a)_+$ for $r\ge1$. Then $\lambda\ge0$, and

$$
\lambda(1-|W|^2)=0,
\qquad \lambda |W|(1-|W|)=0
$$

pointwise by the mathematical branch definition. Both earlier complementarity allowances vanish exactly. This is a correlated identity, not an inference from a rounded norm or a product of unrelated interval estimates.

On the sphere or exterior, $W=n$ and $W'\cdot n=0$ almost everywhere. Decomposing $a$ into tangent and radial parts gives

$$
\rho^v=W'-a+\lambda W
=(I-nn^\top)\left(\frac{u'}r-a\right)
+\bigl[\lambda-n\cdot a\bigr]n
=(I-nn^\top)\left(\frac{u'}r-a\right)+(-n\cdot a)_+n.
$$

The radial sign is correct: an inward $a$ leaves an outward residual, because the comparison remains on the unit sphere. For $n\cdot a\ge0$, the diagnostic reaction removes that outward radial part from the residual. Interior points use $\rho^v=u'-a$ and $\lambda=0$. At boundary points, the identity is asserted almost everywhere, using $r=1$ and the tangency established above.

For a fixed sphere point at which $W'$ exists, the tangent residual is independent of the nonnegative scalar $\lambda$ and the radial squared residual is $(\lambda-n\cdot a)^2$. Its constrained minimum occurs at $(n\cdot a)_+$. This proves the stated local residual minimization, not optimization of delayed growth, root conditioning, or the final physical error bound.

The [existing geometry comparison](overnight-d-finite-geometry-enclosure.md#weighted-member-errors-and-the-ceiling-reaction) provides the damping sign independently. For actual feasible $V$, $e^v=V-W$, and $|W|=1$ when $\lambda>0$,

$$
\lambda e^v\cdot W
=\frac\lambda2\left(|V|^2-|W|^2-|e^v|^2\right)
\le-\frac\lambda2|e^v|^2.
$$

The actual normal-cone reaction contributes another nonpositive term against feasible $W$. Thus the lower velocity block $-(\lambda/2)I$ in the error-energy comparison has the correct sign and coefficient. No derivative of $\lambda$ is taken; a jump of this algebraic diagnostic or of an acceleration residual does not create a jump in the absolutely continuous comparison velocity.

## Crossing intervals and remaining numerical hypotheses

A reception or source box crossing the projection boundary must enclose both derivative branches, with the exterior formula restricted to $r\ge1$ before division. The general estimate $|W'|\le|u'|$ almost everywhere follows directly from the two branch formulas and remains valid on the level set. It supplies a coarse norm enclosure even when crossing locations are unresolved.

A box admitting $u=0$ cannot use $u/r$ without branch restriction. A midpoint branch classification or isolated speed sample supplies no complete enclosure. On an interval containing a nonempty interior branch, the available pointwise reaction includes zero; a positive uniform damping floor cannot be inferred from an exterior sample. Exact zero complementarity nevertheless remains valid because the branch relation holds pointwise even when separate interval bounds lose it.

The reference root derivative continues to use $Q'=u$. The acceleration denominator uses $W+z$, and its source derivative uses $W'$. Their distinct interval regions and lower factors must be checked separately. The [feasible-proxy exclusion](overnight2-d-feasible-proxy-root-exclusion.md) can establish complete root exclusion under its defect and endpoint hypotheses, but cannot supply a positive acceleration denominator or bounded source derivative by itself. Source-zero jumps, original negative-history binding, initial right trace, residual integrals, and the selected normal-cone existence argument remain independent obligations.

Any future physical velocity allowance relative to $Q'$ must add $|\rho^x|$ to the error relative to $W$. A zero acceleration residual in the projected comparison therefore need not mean a zero total defect. The current accepted strict-interior receipts are not retroactively changed by this construction.

## Receiver logarithmic norm

For constant scalar $\alpha>0$, let $B$ denote the signed receiver matrix sum in the error equation, and put

$$
M=\begin{pmatrix}0&\alpha I\\B/\alpha&-(\lambda/2)I\end{pmatrix},
\qquad H=\alpha I+B^\top/\alpha.
$$

Its symmetric part is $\tfrac12\left(\begin{smallmatrix}0&H\\H^\top&-\lambda I\end{smallmatrix}\right)$. Orthogonal left/right singular-vector changes reduce it to independent symmetric blocks with singular value $s$:

$$
\begin{pmatrix}0&s/2\\s/2&-\lambda/2\end{pmatrix}.
$$

Their characteristic equation is $4\mu^2+2\lambda\mu-s^2=0$, so the larger eigenvalue is $(\sqrt{\lambda^2+4s^2}-\lambda)/4$. It increases with $s$. With $\sigma=\|H\|_2$, the exact largest eigenvalue is consequently

$$
\mu=\frac{\sqrt{\lambda^2+4\sigma^2}-\lambda}{4}
=\frac{\sigma^2}{\sqrt{\lambda^2+4\sigma^2}+\lambda}.
$$

The rationalized expression applies when its denominator is positive; the separate case $\lambda=\sigma=0$ gives zero. When $\sigma=0$ and $\lambda>0$, the position block has zero eigenvalues and the velocity block has negative eigenvalues, so the largest eigenvalue is still zero. No negative overall logarithmic norm is implied merely by increasing the reaction with this constant position weight.

For positive denominator, $\partial\mu/\partial\sigma=\sigma/\sqrt{\lambda^2+4\sigma^2}\ge0$ and $\partial\mu/\partial\lambda=(\lambda/\sqrt{\lambda^2+4\sigma^2}-1)/4\le0$. Continuity supplies the endpoint cases. Therefore an outward upper bound on $\sigma$ and a lower bound on $\lambda$ give a valid upper growth bound. Using a reaction upper bound in that substitution would be unsafe. The required $B$ is the signed sum entering the error identity, including its homotopy averages; a nominal sampled matrix cannot replace a complete region enclosure. Pointwise region bounds may cover averages by convexity of the norm, provided all of the relevant matrices are covered. Source blocks and residual/event contributions must still be retained.

## Exact independent controls

The shared-venv control run used exact rational arithmetic and completed exit zero after a known dot-product check, with no scientific target or subject imports:

- **Exterior rotation:** at $n=(3/5,4/5,0)$, tangent $v=(-4/5,3/5,0)$, radius $r=3/2$, and $u'=rv$, the projected derivative is exactly $v$. For $a=v+\beta n$ with $\beta=2,0,-3$, the chosen reaction gives residual $(-\beta)_+n$, exact zero complementarity, and the minimum radial squared residual against independently selected nonnegative trial scalars. The symbolic rotation through these vectors establishes the full-time control stated in the note.
- **Crossing without impulse:** for $u(t)=(1+t,0,0)$ on $[-1/4,1/4]$, the projected endpoint difference is exactly $1/4$. The integrated derivative is $(1/4)\cdot1+(1/4)\cdot0=1/4$, with continuous value 1 at zero. No additional jump term occurs.
- **Full receiver symmetric part:** take $H=\left(\begin{smallmatrix}0&2&0\\-1&0&0\\0&0&1/2\end{smallmatrix}\right)$ and $\lambda=3$. Its singular values are exactly $2,1,1/2$. The full six-dimensional symmetric part has eigenvector $(2e_1,e_2)$ with eigenvalue $1/2$, verified directly by rational matrix products. The norm bound $|x^\top Hy|\le2|x||y|$ gives $\tfrac12|x|^2-x^\top Hy+2|y|^2\ge\tfrac12(|x|-2|y|)^2\ge0$, proving no larger eigenvalue exists. The exact leading two-dimensional roots are $1/2$ and $-2$, and the rationalized formula is $4/(5+3)=1/2$.

These are independent closed-form controls, not a spectrum around an alleged target equilibrium or numerical parity with an implementation.

## Identity, preservation and falsifiers

The frozen subject SHA-256 is `c0e028da69499582f74ae167dbfc4aad9bbd2e5a303c2d3f227e75111cc53394`, measured before review and checked again at closure. Only this new companion is written for the projected-reference task. The pending third-prefix residual-input companion, source files, scientific receipts and shared parent account remain untouched by it.

The derivation would be falsified by an absolutely continuous $u$ violating the derivative or integral identities, a nonzero complementarity product under the exact branch definition, or a symmetric-part eigenvalue exceeding the closed expression. A proposed interval application fails its hypotheses if it misses a derivative branch, divides through a box containing zero, discards $\rho^x$, omits a genuine comparison trace jump, substitutes $W$ for $Q'$ in root geometry, or uses an unproved positive reaction lower bound. This bounded mathematical review is complete. Complete interval construction and any later actual-history admission remain separate and unperformed here.
