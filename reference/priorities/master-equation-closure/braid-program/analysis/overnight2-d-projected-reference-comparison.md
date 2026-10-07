# Projected comparison velocities at the field-speed ceiling

## Purpose and claim boundary

The [finite-history comparison](overnight-d-finite-history-error.md) already permits a numerical position path whose derivative differs from a feasible comparison velocity. The [geometry comparison](overnight-d-finite-geometry-enclosure.md) retains the resulting kinematic defect and the dissipative ceiling reaction. This note makes one such construction explicit: project the position derivative onto the unit ball, differentiate that projection almost everywhere, and choose a diagnostic reaction that has exactly zero complementarity defect. It also gives a closed expression for the resulting receiver logarithmic norm when the position weight is constant.

The [independent review](overnight2-d-projected-reference-independent-review.md) accepts these conditional derivations, including separate exact-rational rotation, crossing-integral and full-matrix eigenpair controls. They do not establish a later numerical reference, complete root margins, or actual trajectory membership. The unchanged original preparation and selected inclusive projected ceiling remain the physical problem, with $c_f=1$. Projection here constructs a comparison velocity; it does not reset the original release, smooth a source kick, or change the acceleration law. The current strict-interior interval application does not use this construction.

## Feasibility, derivatives and defects

Work on a compact time interval away from the prescribed initial kick. Let $Q$ be a continuously differentiable position reference whose derivative $u=Q'$ is absolutely continuous. Piecewise polynomial references with continuous first derivative satisfy this hypothesis. Write $r=|u|$, and define

$$
W=\Pi_B(u)=\begin{cases}u,&r\le1,\\u/r,&r>1,\end{cases}
\qquad B=\{v:|v|\le1\}.
$$

Euclidean projection is nonexpansive. Its composition with an absolutely continuous function is absolutely continuous, and $|W|\le1$ everywhere. On the open interior and exterior regions its derivative is

$$
W'=u'\quad(r<1),\qquad
W'=\frac{(I-nn^\top)u'}r\quad(r>1),\qquad n=u/r.
$$

On the level set $r=1$, the derivative of the absolutely continuous scalar $r$ is zero almost everywhere. Hence $n\cdot u'=0$ almost everywhere on that set, and the two displayed formulas agree there. At isolated or other null-set crossing points the derivative need not exist; an almost-everywhere identity suffices because $W$ is absolutely continuous. No velocity-jump budget is created by crossing $r=1$. A genuine jump already present in $u$, such as the prescribed initial kick, remains a separate trace obligation.

The kinematic defect is explicit:

$$
\rho^x=Q'-W=(r-1)_+n,\qquad |\rho^x|=(r-1)_+,
$$

where the vector expression is set to zero for $r\le1$ and needs no definition of $n$ at $u=0$. This is the same defect whose integral enters the [complete reference-root exclusion](overnight2-d-feasible-proxy-root-exclusion.md). In particular, feasible $W$ does not imply that $Q$ itself is a feasible position history.

Let $a$ denote the complete ordinary reference acceleration evaluated using reference positions and the feasible source velocities $W_j$ at their admitted source times. Assume it is measurable and locally bounded on the ordinary region. Define a diagnostic scalar, separately for each receiver,

$$
\lambda=\begin{cases}0,&r<1,\\(n\cdot a)_+,&r\ge1,\end{cases}
\qquad \rho^v=W'-a+\lambda W.
$$

The boundary case uses $n=u$ because $r=1$. By construction, $\lambda\ge0$ and $\lambda(1-|W|^2)=0$ pointwise. Thus both complementarity allowances in the earlier comparisons vanish exactly. This equality follows from the mathematical branch definition, not a floating norm rounded to one. Inside the ball, $\rho^v=u'-a$. On the exterior and almost everywhere on the boundary,

$$
\rho^v=(I-nn^\top)\left(\frac{u'}r-a\right)+(-n\cdot a)_+n.
$$

For inward reference acceleration, its remaining radial residual is positive in the outward direction; the formula does not erase that discrepancy. At $r=1$, use $r=1$ in the exterior formula and the almost-everywhere tangency just proved. Among nonnegative radial scalars on $|W|=1$, this choice minimizes $|W'-a+\lambda W|$ because $W'\cdot W=0$ and the radial squared term is $(\lambda-n\cdot a)^2$. It does not claim to optimize the entire delayed error comparison.

## Interval treatment of a crossing

A whole reference interval may contain both $r<1$ and $r>1$. A valid enclosure takes the union of both derivative formulas, restricting the exterior branch to $r\ge1$ before division. It must not evaluate $u/r$ on a box admitting zero, use an interior formula on every point of a crossing interval, or infer a branch from midpoint speed. The elementary bound $|W'|\le|u'|$ almost everywhere supplies a coarse safe enclosure; the matrix formula supplies sharper component information when the branch geometry is resolved.

For a polynomial reference, interval evaluation or verified root subdivision of $|u|^2-1$ can establish complete branch coverage. Exact isolation of every crossing is not required if the union enclosure covers the entire interval and both one-sided derivatives. The pointwise branch identity still proves zero complementarity defect on an unresolved interval. Multiplying separate broad interval enclosures of $\lambda$ and $1-|W|^2$ would lose that correlation and introduce an artificial positive allowance.

Root geometry uses $Q'=u$, while the acceleration denominator uses $W+z$ and the source derivative matrix uses $W'$. These quantities remain distinct in every interval calculation. Complete root exclusion, positive local geometric factor, positive acceleration denominator, source-piece coverage, residual bounds and kick discrepancies remain independent obligations.

## Exact receiver logarithmic norm with boundary damping

For a constant scalar position weight $\alpha>0$, let $B$ be the signed sum of the receiver derivative matrices at a fixed point of the admitted comparison region. The [existing energy inequality](overnight-d-finite-geometry-enclosure.md#weighted-member-errors-and-the-ceiling-reaction) uses

$$
M=\begin{pmatrix}0&\alpha I\\B/\alpha&-(\lambda/2)I\end{pmatrix},
\qquad H=\alpha I+B^\top/\alpha,
\qquad \sigma=\|H\|_2.
$$

Its symmetric part is $\tfrac12\begin{pmatrix}0&H\\H^\top&-\lambda I\end{pmatrix}$. Apply orthogonal left and right singular-vector changes to $H$. Each singular value $s$ produces the symmetric two-dimensional block $\begin{pmatrix}0&s/2\\s/2&-\lambda/2\end{pmatrix}$, whose larger eigenvalue increases with $s$. Consequently the exact largest eigenvalue is

$$
\mu=\frac{\sqrt{\lambda^2+4\sigma^2}-\lambda}{4}
=\frac{\sigma^2}{\sqrt{\lambda^2+4\sigma^2}+\lambda}.
$$

The rationalized form applies when the denominator is positive; define $\mu=0$ when $\lambda=\sigma=0$. The expression increases with $\sigma\ge0$ and decreases with $\lambda\ge0$. Therefore a verified upper bound $\bar\sigma$ and lower bound $\underline\lambda\ge0$ give an upper bound by substitution, followed by outward arithmetic. If only $\lambda\ge0$ is known, this reduces to the current $\bar\sigma/2$. An interval containing an interior branch generally has only this zero lower bound; a positive exterior point sample cannot supply a positive whole-interval reaction floor. A positive verified reaction lower bound can retain additional damping without a six-dimensional eigenvalue enclosure. Source blocks, kinematic residuals and all event terms remain unchanged. This is an error-growth bound about a time-dependent reference, not a stability spectrum or an equilibrium claim.

## Exact controls and falsifiers

For a symbolic exterior rotation, take $u=r(\cos t,\sin t,0)$ with constant $r>1$, $n=(\cos t,\sin t,0)$ and $a=(-\sin t,\cos t,0)+\beta n$. Then $W=n$, $W'=(-\sin t,\cos t,0)$, $|\rho^x|=r-1$, $\lambda=\max(\beta,0)$ and $\rho^v=-\min(\beta,0)n$. For $\beta\ge0$ the acceleration residual vanishes while the nonzero kinematic defect remains. For $\beta<0$ the inward discrepancy remains. This is a constructed exact check, not a target trajectory or imported physical mechanism.

For the scalar crossing $u(t)=(1+t,0,0)$ on $|t|<1/2$, $W'=e_1$ for $t<0$ and $W'=0$ for $t>0$, with continuous $W$ at zero. This verifies why a crossing requires both derivative branches but no jump impulse. For the matrix expression, $\sigma=0$ gives $\mu=0$ for every nonnegative reaction, and $\lambda=0$ gives $\mu=\sigma/2$. With $\lambda=3$ and $\sigma=2$, the exact block eigenvalues are $1/2$ and $-2$; the displayed formula gives $1/2$.

An absolutely continuous reference violating the displayed derivative or residual identities would refute the construction. A point with $\lambda(1-|W|^2)>0$ would refute the zero-complementarity claim. A real matrix with a larger symmetric-part eigenvalue than the expression would refute the norm formula. Numerical applicability remains open until complete branch, source and interval bounds are produced for the original preparation; these controls do not supply them.
