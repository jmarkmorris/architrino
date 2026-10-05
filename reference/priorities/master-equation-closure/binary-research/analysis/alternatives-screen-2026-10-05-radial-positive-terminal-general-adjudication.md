# Assessment of both terminal alternatives for every fixed power between one and three

**Accepted derived result:** for every separately fixed $1<p<3$, both positive-terminal-speed and zero-terminal-speed parameters accumulate at zero in the unchanged complete compatible slow mirror circle-tail family. Each positive member escapes linearly at late time; each zero-speed member has the separately proved $T^{2/(p+1)}$ radius law. All have a global separated uniformly subfield future and finite total angle. No individual parameter, uniform threshold, ordering, density or discreteness is established.

The coordinator read the [general positive-speed proof](alternatives-screen-2026-10-05-radial-positive-terminal-general-independent.md), SHA-256 `9c18b4efec99eda3d7ec62503f95fb409590b549c1bc3813d9878a04b26ae08e`, and independently reconstructed the local coordinate approximation and partition argument below. The earlier [three-halves assessment](alternatives-screen-2026-10-05-radial-positive-terminal-existence-adjudication.md) establishes the endpoint mechanism in a smooth comparison case. The general proof requires a new bounded-gradient construction; it is not admitted by formal substitution or agent agreement.

## Unchanged law, history and inherited global domain

The sharp radial law has $K=R_*=c_f=1$, opposite mirror labels and the same complete circle-tail endpoint patch at $r_0=(2^p\epsilon^2)^{-1/(p-1)}$. The patch preserves release position and velocity while making its acceleration exactly equal to the complete received source contribution. The old release source precedes the patch. The [fixed-power assessment](alternatives-screen-2026-10-05-radial-power-family-adjudication.md), [zero-speed selection assessment](alternatives-screen-2026-10-05-radial-power-family-zero-speed-adjudication.md) and [above-two assessment](alternatives-screen-2026-10-05-radial-power-above-two-adjudication.md) supply the global future and diverging winding integer in their respective domains.

These premises include complete uniform subfield speed, exactly one partner root and no positive-delay self root, finite-source regularity on every finite reception interval, and finite-time continuity in the fixed launch parameter. They also supply the full post-transition compact annulus, including the last bounded comparison segment. The new argument does not prove these inherited conclusions a second time and does not extend them to arbitrary histories.

## A bounded-gradient comparison function without false smoothness

Put $\beta=p-1$, $m=3-p$, $k=2/m$, $d=\beta/m$, $c=\beta(p-2)/m$, $\gamma=p\beta/m>0$ and $\nu=m/\beta>0$. The actual weighted rows are

$$
z_\chi=-\beta y+\beta k\delta z+O_p(\delta^2z),\quad
y_\chi=z^\nu-1+c\delta y+O_p(\delta^2),\quad
\delta_\chi=-d\delta^2+O_p(\delta^3).
$$

Their errors retain the complete delayed source windows and are not differentiated. The mathematical central comparison on real $z$ uses

$$
W(z)=\tfrac12|z|^{2/\beta}-z/\beta,\quad
e=y^2/2+W(z),\quad
F_0=(-\beta y,g(z)),\quad g(z)=\operatorname{sgn}(z)|z|^\nu-1.
$$

Here $W$ is $C^1$ and $W'=g/\beta$. On the compact annulus away from the sole equilibrium, at least one of $g$ and $y$ is nonzero. This proves local uniqueness even at the fractional point: use $z$ as time when $y\ne0$, and use the local inverse of $W$ with $y$ as time near $(0,0)$, where $g=-1$. Compactness and uniqueness give continuous dependence. The regular oval periods $Q(e)$ are continuous; a turning-point change of variable leaves a continuous coefficient against an integrable square-root kernel. The action $I(e)=\oint y^2d\chi$ is $C^1$ and $I'=Q$ by direct differentiation of its vanishing-endpoint integral.

The first-order scalar input is $F=cy^2+k(|z|^{2/\beta}-z)$. Integrating $(zy)_\chi$ around an oval gives $\oint Fd\chi=\gamma I$. Thus $G=QF-\gamma I$ has zero orbit integral and admits a continuous orbit primitive $B$ with continuous derivative $G$ along the flow. Bounded full first derivatives of this exact primitive have not been assumed.

The coordinator's direct local reconstruction is as follows. Where $g\ne0$, the map $(z,y)\mapsto(e,y)$ is a $C^1$ coordinate chart and $F_0$ becomes $(0,g)$. In these coordinates $B$ has the continuous partial derivative $B_y=G/g$. Where $y\ne0$, use $(e,z)$ and the continuous partial derivative $B_z=-G/(\beta y)$. Mollifying on slightly larger coordinate rectangles approximates both the continuous function and this existing flow-coordinate derivative uniformly on interior compact sets. Pullback by the $C^1$ chart gives a $C^1$ function in the original coordinates; no derivative of the fractional $g$ is taken.

On a finite cover, choose a $C^1$ partition of unity $\rho_j$ and local approximations $B_j$. The patched function $\widetilde B=\sum\rho_jB_j$ satisfies the exact error identity

$$
F_0\cdot\nabla\widetilde B-G
=\sum_j\rho_j(F_0\cdot\nabla B_j-G)
+\sum_j(F_0\cdot\nabla\rho_j)(B_j-B).
$$

The second sum is small because the function itself is uniformly approximated and the finite partition derivatives are bounded. Therefore the transport error can be made smaller than any fixed $\eta>0$, while $\widetilde B$ has a finite full-gradient bound. That bound need not remain uniform as $\eta$ tends to zero. Choose and freeze $\eta<\gamma\min I/4$ before reducing the launch threshold. This order is what makes the construction sufficient.

The subject also provides a useful adverse control. For $7/3\le p<3$, the zero-level period has an unbounded derivative from below: the local inverse density has derivative proportional to $-|w|^{\nu-1}$, whose square-root period convolution diverges when $\nu\le1/2$. Integrating the exact transport equation along a smooth arc with nonzero integral of $F$ would force an exact $C^1$ primitive to inherit that divergence, a contradiction. The coordinator reconstructed this calculation. The approximate primitive is therefore necessary to this proof form in that range; the previously admitted above-two proof uses its own continuous-flow/period arguments and is not replaced by a nonexistent differentiable-flow premise.

## Exact terminal normalization and occurrence

Define

$$
\mathcal A=I(e)-I(0)-\delta[\widetilde B(z,y)-\widetilde B(0,0)].
$$

The ordinary chain rule now applies because both $I$ and $\widetilde B$ are $C^1$. Along the actual delayed rows,

$$
\mathcal A_\chi=\delta[\gamma I-r_\eta]+O_{p,\widetilde B}(\delta^2)\ge c_A\delta>0,
\qquad |r_\eta|\le\eta.
$$

The positive first-order drift absorbs the fixed transport error; a sufficiently small launch absorbs the quadratic term with its fixed gradient bound. At every zero-speed endpoint, $z,y\to0$ and $\delta\to\delta_\infty>0$, so the terminal value of $\mathcal A$ is exactly zero. With $\delta_\chi\ge-C_\delta\delta^2$, the remaining weighted duration of any zero-speed member obeys

$$
L\le\frac{\exp[C_\delta(-\mathcal A_0)/c_A]-1}{C_\delta\delta_0}.
$$

As a fixed zero-speed member is observed later, this upper bound tends to zero. Finite-time parameter continuity makes it uniformly small for nearby zero-speed members. A bound on $|z_\chi|$ then keeps their whole remaining paths in a small-$z$ region where the admitted winding coordinate has positive real part. The finite-prefix lifted phase varies continuously, so the terminal winding integer is locally constant relative to the zero-speed set.

If a whole interval $(0,\epsilon_1)$ contained only zero-speed members, the integer would be locally constant throughout that connected interval and hence constant. Its independently admitted divergence as $\epsilon\downarrow0$ contradicts this. Thus positive-speed parameters occur arbitrarily close to zero. Their previously proved transverse terminal strips make the positive set open. The separate zero-speed accumulation theorem remains intact, establishing both alternatives without locating or ordering them.

The statement is fixed-exponent and excludes $p=1,3$. It gives no nonmirror zero-speed theorem, numerical launch threshold, memory transfer or canonical adoption. Falsifiers include a missing comparison chart, failure of uniform approximation of the continuous flow-coordinate derivative, an uncancelled partition term, failure of the post-transition annulus or winding premise, or violation of the displayed zero-speed duration bound. No target computation supports this result; the new mathematical evidence is the explicitly reconstructed approximation and endpoint argument.
