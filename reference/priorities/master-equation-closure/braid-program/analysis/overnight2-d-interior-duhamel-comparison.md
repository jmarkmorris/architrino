# Exact free transport in a strict-interior delayed comparison

## Question and scope

The [reciprocal-weight comparison](overnight2-d-reciprocal-weight-comparison.md) proves that free position–velocity errors have a uniformly bounded propagator in its weighted coordinates. Its local logarithmic-norm estimate nevertheless grows as a power of elapsed time. This note asks whether the exact free propagator can instead carry the interacting error equation on a strict-interior interval, where the selected ceiling reaction vanishes. It gives a conditional bound whose amplification depends only on the interaction coefficients and accumulated defects.

This conditional analytical component is accepted by the [independent derivation and adversarial controls](overnight2-d-interior-duhamel-independent-review.md). It uses the original inclusive ceiling law, unchanged complete histories, partner weights and zero self acceleration, with normalized wake speed one. Strict interior is a hypothesis to be justified by a first-exit application; the ceiling is not removed from the selected equation. No current trajectory receipt implements this comparison, and no later membership, tail entry or escape follows from it.

## Error equation and admissible histories

Choose a switching time $a$ with an independently admitted complete earlier history. Let $Q_i$ be a continuously differentiable, piecewise twice differentiable reference, and let $X_i$ be an existing actual trajectory on an ordinary strict-interior interval $[a,b]$. Write $e_i^x=X_i-Q_i$ and $e_i^v=\dot X_i-\dot Q_i$. The kinematic reference is exact: its comparison velocity is $\dot Q_i$, so $\dot e_i^x=e_i^v$. A separate feasible-velocity proxy with a nonzero kinematic defect needs an additional term and is outside the displayed theorem.

Assume the complete-root and homotopy construction of the [delayed comparison](overnight2-d-delayed-admission.md) is valid throughout the declared trial domain. On smooth portions, sum its signed receiver matrices before taking any norm:

$$
B_i(t)=\sum_{j\ne i}\overline B_{ij}(t).
$$

The bars denote the actual mean-value coefficients along the admissible homotopy, not nominal matrices evaluated only at the reference. Finite source-zero crossings are separated into an integrable remainder, using the complete support and jump allowances already derived there. Thus almost everywhere the exact error equation has the form

$$
\dot e_i^v(t)=B_i(t)e_i^x(t)
+\sum_{j\ne i}\left[-\overline B_{ij}(t)e_j^x(S_{ij}(t))+\overline C_{ij}(t)e_j^v(S_{ij}(t))\right]+g_i(t).
$$

Here $S_{ij}(t)<t$ is the actual source time. The integrable vector $g_i$ includes the reference acceleration residual and the bounded finite homotopy-crossing remainder, with their signs before estimation. No physical impulse or additional velocity reset is introduced. Ordinary acceleration knots are covered by both traces. All actual errors are continuous on $[a,b]$, and their derivatives have the absolute continuity required for the integral identity. The prescribed initialization velocity jump lies in the earlier history; its source receptions still require the stated remainder bound.

Retain the old constant weight $\alpha_*>0$ for $s\le a$, and use

$$
\alpha(t)=\frac{\alpha_*}{1+\alpha_*(t-a)},\qquad t\ge a,
\qquad z_i(t)=\begin{pmatrix}\alpha(t)e_i^x(t)\\e_i^v(t)\end{pmatrix}.
$$

Let $E_0$ bound every member's weighted error over the complete history $s\le a$, including both initialization velocity traces where relevant. A finite complete-history bound is a premise; a final endpoint bound alone cannot replace it. Earlier accepted nondecreasing envelopes and the complete prescribed negative-history discrepancy can supply it without changing their old weight.

## Exact free transport

For $a\le s\le t$, define $\theta=\alpha(t)/\alpha(s)$. The reciprocal identity $\alpha(t)(t-s)=1-\theta$ gives the exact free propagator

$$
P(t,s)=\begin{pmatrix}\theta I&(1-\theta)I\\0&I\end{pmatrix},
\qquad 0<\theta\le1.
$$

The accepted free-transport proof gives $\|P(t,s)\|_2\le\sqrt2$. For an acceleration input $f$, the sharper injection formula is

$$
P(t,s)\begin{pmatrix}0\\f\end{pmatrix}
=\begin{pmatrix}(1-\theta)f\\f\end{pmatrix},
\qquad
\left|P(t,s)\begin{pmatrix}0\\f\end{pmatrix}\right|
=\sqrt{1+(1-\theta)^2}\,|f|\le\sqrt2\,|f|.
$$

Put $F_i$ equal to the complete right-hand side of the acceleration error equation above. Variation of constants is then an exact identity:

$$
z_i(t)=P(t,a)z_i(a)+\int_a^tP(t,s)\begin{pmatrix}0\\F_i(s)\end{pmatrix}\,ds.
$$

The free drift remains inside $P$; it does not enter the coefficient used for Grönwall comparison. This distinction is useful only if one fixed origin $a$ is retained over the comparison block. Restarting a bound with a factor $\sqrt2$ at every small cell would introduce a new artificial repeated amplification.

## An interaction-only scalar bound

Choose measurable, nonnegative, locally integrable upper bounds $k_i(t)$ satisfying throughout the trial domain

$$
k_i(t)\ge\frac{\|B_i(t)\|_2}{\alpha(t)}
+\sum_{j\ne i}\left\|\left[-\frac{\overline B_{ij}(t)}{\alpha(S_{ij}(t))}\quad\overline C_{ij}(t)\right]\right\|_2.
$$

The source weight is evaluated at the actual source time. A source bracket crossing $a$ must enclose both weight branches. The signed receiver sum is retained inside its single norm. Taking separate nonnegative source norms remains conservative and does not claim preservation of all delayed cancellation. Set $k(t)=\max_i k_i(t)$.

Suppose a known nondecreasing function $G(t)$ bounds the cumulative defect of every receiver:

$$
\int_a^t|g_i(s)|\,ds\le G(t),\qquad a\le t\le b.
$$

For any fixed constant $c\ge\sqrt2$, define

$$
E(t)=\max\left(E_0,\max_i\sup_{a\le u\le t}|z_i(u)|\right).
$$

Every source value is bounded by $E(s)$ at reception $s$: an older source uses the complete bound $E_0$, while a later source has $S_{ij}(s)<s$. The acceleration equation therefore gives $|F_i(s)|\le k(s)E(s)+|g_i(s)|$. Applying the exact identity at each $u\le t$, using nonnegativity to enlarge the integration interval, and then taking the supremum yields

$$
E(t)\le c\bigl(E_0+G(t)\bigr)+c\int_a^t k(s)E(s)\,ds.
$$

The first term also dominates $E_0$. For each fixed $t$, monotonicity gives $G(u)\le G(t)$ for all $u\le t$. The ordinary scalar integral argument with this fixed upper forcing gives

$$
\boxed{\quad E(t)\le\Phi(t):=c\bigl(E_0+G(t)\bigr)
\exp\left(c\int_a^t k(s)\,ds\right).\quad}
$$

This proof does not require $G$ to be differentiable. An integrated interval budget can be made nondecreasing by placing each nonnegative cell budget at its cell's beginning, provided the resulting bound covers every prefix. It cannot place a budget at the end of a cell and claim interior coverage. Negative-history error is already included in $E_0$; a sharper construction could retain its separately known forcing instead.

Physical bounds remain

$$
|e_i^v(t)|\le\Phi(t),\qquad |e_i^x(t)|\le\frac{\Phi(t)}{\alpha(t)}.
$$

For free motion with zero defect, $k=G=0$ and $\Phi=cE_0$ is independent of elapsed time. If the interaction integral and total defect remain bounded on an existing infinite interval, the weighted error remains bounded by the displayed constant. Its physical position bound still grows at most linearly through $1/\alpha(t)$; this is not a fixed-radius position tube or proof of infinite continuation.

## First-exit use and the ceiling boundary

For a finite proposed block, choose a constant weighted trial radius $R>E_0$. Every coefficient, root and defect bound must cover that whole trial domain, with physical position radius $R/\alpha(t)$ and source-time weights as above. If $\Phi(b)<R$, then monotonicity of $\Phi$ excludes a first weighted-error exit on the block, subject to the independent local-existence and continuation hypotheses. Strict-interior use additionally needs a complete reference-speed upper bound $L$ with $L+R<1$. Root completeness, positive ordinary factors, positive separation and full history availability remain separate simultaneous conditions. The error inequality alone supplies none of them.

The selected ceiling reaction is zero before any such first exit because actual speed is at most $L+R<1$. This is why the exact Duhamel argument applies. At an active ceiling, the normal-cone reaction may not retain its favorable sign after multiplication by $P(t,s)$, as the earlier independent review demonstrates. One must then return to a separately justified dissipative comparison or derive an additional valid reaction estimate; dropping it is invalid.

The global-history supremum permits the mathematical inequality to include delayed times within the proposed block. It does not authorize bypassing the present implementation's source-before-cell checks or its existence construction. A future application must either retain the independently admitted method of steps or separately establish continuation on the whole trial domain.

## Verification and deciding application question

This note extends the free-transport control to a conditional interacting strict-interior estimate. It does not implement it or establish smallness of the original trajectory's coefficient integral. Separate exact controls and independent review passed the free propagator, constant-acceleration injection, source-time weighting and scalar integral argument, with explicit counterexamples to end-loaded budgets and transported reaction signs. The reviewed-stage subject is preserved locally as `interior-duhamel-before-status.md`, SHA-256 `73456f29fc5ebfcafa7975a2da823afe10a0241ba834db594570b84cc78645ba`. The current fixed-weight trajectory calculation remains unchanged.

The deciding question is whether complete interval bounds make $\Phi(b)$ and $\Phi(b)/\alpha(b)$ small enough on the needed finite-history bridge. The estimate may still be too large because source norms discard cancellation, the receiver interaction integral may be large, or physical position error may exceed the intended allowance. Any of these is a limitation of this estimate, not a physical obstruction. A missing complete-history bound, incorrect source weight, omitted defect or ceiling reaction, invalid interaction enclosure, or an exact admissible error exceeding the displayed inequality would overturn the corresponding conditional claim.
