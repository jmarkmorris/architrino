# A decreasing position weight for later finite-history comparison

## Purpose and boundary

The [geometry-preserving error comparison](overnight-d-finite-geometry-enclosure.md#weighted-member-errors-and-the-ceiling-reaction) already permits a positive time-dependent position weight. The current interval runner instead uses the constant weight $\alpha=1/5$. That choice is useful on its admitted early prefix, but its local growth estimate introduces exponential amplification even in the exact free-motion control. This note specializes the existing variable-weight comparison to a reciprocal weight, derives its receiver logarithmic norm, and states how a future application must retain the meaning of saved delayed errors.

The [independent review](overnight2-d-reciprocal-weight-independent-review.md) accepts this conditional derivation after a separately verified delayed-contribution display correction. It does not assert that the original release is free, that its later receiver matrices are small, or that a later certificate succeeds. It changes no physical preparation, equation, source selection or current numerical receipt. The selected inclusive ceiling and units $c_f=1$ remain fixed. A decreasing analysis weight is not a new response factor in the equation of motion.

## Growth estimate with a variable weight

Let $e^x=X-Q$ and $e^v=V-W$, with the feasible comparison velocity and complete defects defined in the [projected-reference construction](overnight2-d-projected-reference-comparison.md). Set

$$
Y(t)=\bigl(\alpha(t)^2|e^x(t)|^2+|e^v(t)|^2\bigr)^{1/2},
\qquad \beta(t)=\frac{\alpha'(t)}{\alpha(t)}.
$$

Assume $\alpha$ is positive and locally absolutely continuous, with reciprocal bounded on each finite interval and bounded piecewise derivative for the proposed application. A finite corner in $\alpha'$ produces no jump in $Y$ when $\alpha$ is continuous. The earlier energy argument holds almost everywhere and integrates across such corners. The exact receiver comparison matrix is

$$
M=\begin{pmatrix}\beta I&\alpha I\\B/\alpha&-(\lambda/2)I\end{pmatrix},
\qquad H=\alpha I+B^\top/\alpha,
\qquad \sigma=\|H\|_2,
$$

where $B$ is the signed receiver sum over the complete admitted homotopy and $\lambda\ge0$ is the diagnostic reaction. Singular-vector changes reduce its symmetric part to the blocks

$$
\begin{pmatrix}\beta&s/2\\s/2&-\lambda/2\end{pmatrix}.
$$

The larger eigenvalue increases with singular value $s$. Therefore the exact receiver logarithmic norm is

$$
\mu(\beta,\lambda,\sigma)
=\frac{\beta-\lambda/2+\sqrt{(\beta+\lambda/2)^2+\sigma^2}}2.
$$

This expression is nondecreasing in $\beta$ and $\sigma\ge0$ and nonincreasing in $\lambda\ge0$, by direct differentiation where the square root is positive and continuity at its zero. Thus verified upper bounds on $\beta,\sigma$ and a lower bound on $\lambda$ give an upper growth bound. At $\sigma=0$ it gives $\max(\beta,-\lambda/2)$; at $\beta=0$ it reduces to the [constant-weight damped formula](overnight2-d-projected-reference-comparison.md#exact-receiver-logarithmic-norm-with-boundary-damping). A negative upper bound is possible here, but a consumer retaining only nondecreasing envelopes may conservatively replace it by zero.

This statement concerns the exact logarithmic norm of the displayed comparison matrix. It does not remove source blocks, kinematic defects, acceleration residuals, source-kick terms, or a nonzero complementarity term for a different diagnostic construction. With the reviewed projected-reference choice, the complementarity term is exactly zero by its branch identity.

## Reciprocal continuation from an accepted weight

Choose an admitted switching time $T_*$ and retain the existing positive constant weight $\alpha_*$ at all earlier source times. For $t\ge T_*$ choose

$$
\alpha(t)=\frac{\alpha_*}{1+\alpha_*(t-T_*)}.
$$

The weight is continuous at $T_*$ and positive on every finite future interval. For later times $\alpha'=-\alpha^2$ and $\beta=-\alpha$. No transformation of the initial physical state occurs. Previously accepted values of $Y$ keep exactly their original meaning because the old weight is retained on their time domain, and the new weight agrees at the switch. The derivative corner changes neither the state nor the error allowance.

For the exact free comparison $B=0$, $\lambda=0$ and no forcing or defects, $\sigma=\alpha$ and

$$
\mu=c\alpha,\qquad c=\frac{\sqrt2-1}{2},
\qquad
Y(t)\le Y(T_*)\bigl[1+\alpha_*(t-T_*)\bigr]^c.
$$

The integral is explicit because $\int_{T_*}^t\alpha(s)\,ds=\log[1+\alpha_*(t-T_*)]$. In contrast, the constant-weight local comparison has $\mu=\alpha_*/2$ and gives $Y(t)\le Y(T_*)\exp[\alpha_*(t-T_*)/2]$. These are exact statements about the two comparison bounds on free motion, not measured costs or conclusions about the interacting release.

Physical position error must still be recovered by dividing by the current weight:

$$
|e^x(t)|\le\frac{Y(T_*)}{\alpha_*}\bigl[1+\alpha_*(t-T_*)\bigr]^{1+c},
\qquad
|e^v(t)|\le Y(T_*)\bigl[1+\alpha_*(t-T_*)\bigr]^c.
$$

Reducing artificial weighted amplification does not guarantee that the required physical position tolerance survives. If the tail compares velocity to $Q'$ instead of $W$, its velocity bound additionally pays $|Q'-W|$. Every nonzero interaction and defect remains in the actual application.

## Exact free propagator as an independent control

For two times $T_*\le s\le t$, free errors satisfy $e^x(t)=e^x(s)+(t-s)e^v(s)$ and $e^v(t)=e^v(s)$. In weighted coordinates $z=(\alpha e^x,e^v)$, this gives

$$
z(t)=\begin{pmatrix}aI&(1-a)I\\0&I\end{pmatrix}z(s),
\qquad a=\frac{\alpha(t)}{\alpha(s)}\in(0,1].
$$

The equality $\alpha(t)(t-s)=1-a$ follows from the reciprocal weight. Convexity of the squared norm gives

$$
|ax+(1-a)v|^2+|v|^2
\le a|x|^2+(2-a)|v|^2
\le2(|x|^2+|v|^2).
$$

Thus the exact free propagator has norm at most $\sqrt2$ on every such interval. This independently checks the absence of intrinsic exponential free growth and also shows that the integrated local logarithmic norm remains conservative. For $a=1/2$, the nontrivial two-dimensional propagator has squared singular values $(3\pm\sqrt5)/4$; these follow directly from the Gram matrix $\left(\begin{smallmatrix}1/4&1/4\\1/4&5/4\end{smallmatrix}\right)$.

The free propagator is only a control here. Multiplying a normal-cone reaction by a general propagator need not preserve its favorable energy sign. Its bounded norm therefore cannot replace the reviewed local energy inequality in the interacting ceiling problem without a separate proof.

## Requirements for a weight-aware delayed application

At an actual source time $S$, the delayed contribution and its scalar allowance are the already derived

$$
H_{ij}z_j(S),\qquad
H_{ij}=\left[-\frac{\overline B_{ij}}{\alpha(S)}\quad\overline C_{ij}\right],\qquad
z_j(S)=\begin{pmatrix}\alpha(S)e_j^x(S)\\e_j^v(S)\end{pmatrix},\qquad
|H_{ij}z_j(S)|\le\|H_{ij}\|_2Y_j(S),
$$

with the source's weight at the source time. Reception matrices and receiver position conversion use $\alpha(t)$. Substituting the reception weight for a saved source weight changes the comparison and is not permitted silently. A source bracket crossing $T_*$ must cover both parts of the declared weight function.

If a future consumer chooses nondecreasing $E_j$ and nonincreasing $\alpha$, then $E_j/\alpha$ is nondecreasing. A complete source bracket ending at $b$ may therefore use the admitted endpoint envelope covering $b$ and the lower weight $\alpha(b)$ to bound its physical position error. Its weighted source norm must still enclose all $\alpha(S)$ on the bracket. This simplifies lookup only after the bracket lies wholly in admitted history; it does not replace the source-before-cell or refined-containment checks.

On a reception cell, receiver position trials use the smallest weight on that complete cell. The logarithmic norm must enclose the complete signed $B$ region, the complete weight range, its derivative ratio and any reaction lower bound. Residuals contain the weight-dependent kinematic term. Source jumps and every initial representation allowance remain accounted for. A future implementation can retain the current outward scalar propagation after taking nonnegative whole-cell coefficient bounds, but it requires separate review of all these changed inputs; the current constant-weight runner cannot be relabeled as such an implementation.

## Falsifiers and status

A real matrix whose symmetric-part largest eigenvalue differs from the displayed closed form would refute the norm derivation. A free error pair violating the exact reciprocal propagator would refute the weight calculation. A delayed application that divides a saved error by the wrong time's weight, omits physical conversion or bypasses complete root and residual obligations fails this contract. No target computation has used the reciprocal weight, and no later admission follows from this note.
