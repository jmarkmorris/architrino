# A sharper bound for the stationary lattice acceleration

## Mathematical result

The stationary contribution is the acceleration produced by the reference lattice when the receiver has moved away from its lattice anchor. It is part of the unchanged Master Equation. A small value of this contribution must be established from the original infinite sum; deleting it from a numerical construction does not delete it from the equation being checked.

Use the dimensionless alternating cubic lattice, with spacing one and $c_f=1$. Let $\sigma_n=(-1)^{n_1+n_2+n_3}$, and define

$$
\mathbf S(\mathbf y)=\sum_{n\ne0}^{\mathrm{blocks}}\sigma_n\frac{\mathbf y-n}{\|\mathbf y-n\|^3}.
$$

The blocks are the original eight-source blocks. The [accepted stationary argument](smooth-two-particle-pulse-continuation.md#2-the-stationary-reference-has-a-cubic-displacement-bound) establishes equality of this block limit with centered cube limits, cubic symmetry, oddness, and $\mathbf S(0)=D\mathbf S(0)=D^2\mathbf S(0)=0$. These facts concern the verified stationary equilibrium. They do not constitute a stability conclusion.

For $\|\mathbf y\|\leq B<1$, the following cubic approximation and fifth-order remainder hold:

$$
\begin{aligned}
\mathbf S(\mathbf y)&=a\mathbf T(\mathbf y)+\mathbf R(\mathbf y),\\
T_i(\mathbf y)&=y_i^3-\frac32 y_i\sum_{j\ne i}y_j^2,\\
\|\mathbf R(\mathbf y)\|&\leq \frac{7995}{(1-B)^7}\|\mathbf y\|^5,\\
\|D\mathbf R(\mathbf y)\|&\leq \frac{39975}{(1-B)^7}\|\mathbf y\|^4.
\end{aligned}
$$

The coefficient has the absolutely convergent representation

$$
a=-\frac12\sum_{n\ne0}\sigma_n
\frac{35n_1^4-30n_1^2\|n\|^2+3\|n\|^4}{\|n\|^9}.
$$

An outward finite sum and analytic tail, described below, give $14.2309<a<14.3977$. Consequently, on $B=1/64$, conservative bounds sufficient for the continuation proof are

$$
\boxed{\|\mathbf S(\mathbf y)\|<25\|\mathbf y\|^3,
\qquad \|D\mathbf S(\mathbf y)\|<100\|\mathbf y\|^2.}
$$

The coupling $g=16$ multiplies these bounds when they enter the acceleration. These bounds are derived for the original sum. A finite numerical coefficient calculation contributes only its explicitly bounded arithmetic enclosure; it does not replace the infinite lattice.

## Derivation

Signed coordinate reflections require the cubic part of component $i$ to have the form $a y_i^3+b y_i\sum_{j\ne i}y_j^2$. Coordinate permutations make $a,b$ common to all three components. The divergence of every source row vanishes away from its anchor, and absolute convergence permits three or more receiver derivatives. The cubic part therefore has divergence $(3a+2b)\|\mathbf y\|^2=0$, giving $b=-3a/2$. Differentiating a source row three times along the first axis at zero gives the displayed coefficient.

For clarity, a scalar function $1/\|\mathbf x\|$ is used here solely as an algebraic antiderivative of the kernel: $\mathbf K=-\nabla(1/\|\mathbf x\|)$. It introduces no additional physical law. Its sixth derivative has terms containing zero, one, two or three pair contractions. Their numbers and coefficient magnitudes give the Euclidean multilinear bound

$$
\|D^5\mathbf K(\mathbf x)\|\leq
(10395+15\cdot945+45\cdot105+15\cdot15)\|\mathbf x\|^{-7}
=29520\|\mathbf x\|^{-7}.
$$

The sup-norm shell with radius $m$ has $24m^2+2$ integer labels. Integrating decreasing tails gives

$$
\sum_{n\ne0}\|n\|^{-7}
\leq24\left(1+\frac14\right)+2\left(1+\frac16\right)
=\frac{97}{3}<\frac{65}{2}.
$$

Thus $\|D^5\mathbf S(\mathbf y)\|\leq29520(65/2)/(1-B)^7$. Oddness removes the fourth derivative at zero. Taylor's integral formula to degree four, and its derivative version to degree three, give the remainder constants $29520(65/2)/5!=7995$ and $29520(65/2)/4!=39975$.

A deliberately simple norm estimate is enough: $T_i=y_i(5y_i^2/2-3\|\mathbf y\|^2/2)$ implies $\|\mathbf T\|\leq(3/2)\|\mathbf y\|^3$. Also

$$
D\mathbf T=\frac{15}{2}\operatorname{diag}(y_i^2)-\frac32\|\mathbf y\|^2I-3\mathbf y\mathbf y^\mathsf T.
$$

Its Rayleigh quotient lies between $-9\|\mathbf y\|^2/2$ and $6\|\mathbf y\|^2$, so its operator norm is at most $6\|\mathbf y\|^2$. Substitution of $|a|<14.3977$ and $B=1/64$ proves the two boxed bounds. Sharper estimates are possible but are not needed for those constants.

## Finite arithmetic and independent check

The coefficient series is absolutely convergent, so its finite cube truncation does not change the summation prescription of the original conditionally convergent field. On $0\leq u\leq1$, the quadratic $35u^2-30u+3$ has absolute value at most eight. A coefficient summand therefore has magnitude at most $4\|n\|^{-5}$. Outside a cube of sup-norm radius $N$, the coefficient tail is at most

$$
4\sum_{m>N}(24m^2+2)m^{-5}
\leq\frac{48}{N^2}+\frac{2}{N^4}.
$$

The parent calculation first enclosed the exact coefficient $14$ of the six nearest neighbors. Only after that known case passed did it sum the cube $N=24$ with outward interval arithmetic. It obtained $[14.314329625404055,14.314329625617388]$ before adding the tail $0.08333936149691362$. An independently authored reference uses exact integer shell weights, rational square-root brackets, a larger cube and a different remainder derivation; its comparison belongs in the [independent assessment](smooth-two-particle-post-restart-independent-adjudication.md).

The arithmetic receipts are retained as local evidence at `.local-data/master-equation-closure/post-restart/check/stationary-known.json` and `.local-data/master-equation-closure/post-restart/check/stationary-coefficient.json`. The task-specific arithmetic entry point is `.tmp/mec-008-post-restart/stationary-control.py`; the complete mathematical argument is in this document and does not depend on that disposable entry point.

A missing tensor contraction, failure of the accepted cube/block equality, failure of the known coefficient control, or a coefficient outside the tail-enlarged enclosure would falsify the corresponding bound. No claim about the next maximum follows from this bound alone.
