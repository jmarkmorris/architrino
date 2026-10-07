# Excluding birth crossings in the translated-receiver comparison

## The particular comparison that must be covered

The [delayed-admission argument](overnight2-d-delayed-admission.md#exact-auxiliary-endpoints-and-the-delayed-interval) compares a channel by translating its reference receiver at a fixed reception time and shifting its source-velocity argument. Its intermediate receiver is $Q_i(t)+\theta p$, its geometric source is the fixed complete path $Q_j$, and its velocity argument is $\dot Q_j+\theta z$, with $0\le\theta\le1$. This is different from the constant complete-path mixtures covered by the [birth-comparison corollary](overnight2-d-birth-comparison-nonreturn.md). The following pointwise estimate addresses the actual translated-receiver construction. The [independent derivation and exact checks](overnight2-d-birth-translation-independent-review.md) accept this conditional extension and its explicit-radius application. No producer, source reference or event budget is changed.

## Pointwise source-time floor

Assume the complete reference source is $L$-Lipschitz, where $0\le L\le1$. At a reception time $t>0$, suppose its fixed-birth margin satisfies

$$
G^Q_{ij}(t):=t-|Q_i(t)-Q_j(0)|\ge g>0.
$$

For any receiver translation $\delta$ with $|\delta|\le P<g$, set $x=Q_i(t)+\delta$. Its fixed-birth margin obeys $t-|x-Q_j(0)|\ge g-P$. If $s$ is any causal source time for this translated receiver, the causal equation and source speed bound give

$$
t-s=|x-Q_j(s)|\le |x-Q_j(0)|+L|s|\le t-(g-P)+L|s|,
$$

so $g-P\le s+L|s|$. A nonpositive $s$ would make the right side $(1-L)s\le0$, which is impossible. For $s>0$ the inequality becomes

$$
s\ge\frac{g-P}{1+L}>0.
$$

This proof uses no time derivative of the translated receiver. It applies separately at each reception time, even when the translation varies irregularly with reception time. It depends on the complete source path, including its negative history; no past cutoff is imposed. The source-velocity shift $z$ does not change this geometric root equation. Bounds on its size and on the ordinary denominator remain necessary for evaluating acceleration, and are not supplied by the source-time floor.

## Uniform interval and application boundary

Suppose the reference receiver also has speed at most one from an endpoint $T$ onward. Then $G^Q_{ij}(t)\ge G^Q_{ij}(T)$ for every later reception in that reference interval. The [accepted birth output](overnight2-d-birth-nonreturn-output-independent-review.md) establishes at $T=14.713681572972876$ the stronger triangle bounds

$$
T-|Q_i(T)-Q_j(0)|-a_i-b_j\ge2.492573310924761
$$

for all 56 ordered pairs. The allowances $a_i,b_j$ are nonnegative, so the same lower bound applies to the reference margin itself. The [complete mesh domain](overnight2-d-adaptive-residual-independent-review.md) supplies $L=0.724250801106246$ through time 67, including its translated negative rigid history.

Consequently, every translated-receiver channel at $T\le t\le67$ with $|\delta|\le11/1000$ has strictly positive source time. A conservative exact decimal lower bound follows without rounding a quotient: use $g\ge249/100$, $L\le29/40$, and $P\le11/1000$. Then

$$
s\ge\frac{249/100-11/1000}{1+29/40}
=\frac{2479}{1725}>\frac{143}{100}=1.43.
$$

The exact cross-product check is $247900>246675$. These deliberately weakened constants leave the interval endpoints and division rounding out of the conclusion. The displayed encoded domain and birth values must still be checked against the conservative rational constants and their accepted receipt identities.

For the current channel homotopy, $\delta=\theta p$ and its recorded position radius $P_{ij}$ bounds $|p|$. The conclusion therefore applies to any later candidate record with $P_{ij}\le11/1000$, regardless of whether the surrounding source-time enclosure still conservatively overlaps zero. The intended scalar weight remains $\alpha=1/5$ and the trial velocity allowance remains 0.001. Their mathematical position allowances suggest $P_{ij}$ near or below 0.01, but this note does not replace checking the actual outward position radius by that decimal heuristic. The explicit $P_{ij}\le11/1000$ condition is the application contract.

Thus the original source-zero jump is absent along each such translated-receiver homotopy after $T$. This neither removes the velocity-shift denominator obligation nor covers arbitrary source-position modifications. It does not establish actual continuation beyond the accepted prefix, actual time-67 membership, ordinary interpolation-knot regularity, or tail entry. The frozen runner retains its existing complete jump calculation; a later change to that calculation would need its own implementation and application review.

## Independent controls and falsifiers

For an exact sharp control, fix $x=0$, take $Q_j(s)=1$ for $s\le0$ and $Q_j(s)=1+Ls$ for $s\ge0$, and let $t=2$. The fixed-birth margin is one and the root is $s=1/(1+L)$, attaining the bound. Translating the receiver to $x=-P$, with $0\le P<1$, changes the margin to $1-P$ and the root to $(1-P)/(1+L)$, again attaining the bound. This is a kinematic control, not another selected physical preparation. At $L=1/2$ and $P=1/4$, the exact root is $s=1/2$ and the delay is $3/2$. At the excluded limit $P=1$, the root reaches zero, demonstrating why a strict margin is required.

A causal root below the displayed lower bound on a complete $L$-Lipschitz source with the stated receiver margin and translation allowance would falsify the derivation. A source-position modification, missing past, wrong reference identity, violated speed bound or position radius larger than the declared allowance invalidates this application. Failure to prove ordinary denominators or later existence is a separate limitation and does not contradict this geometric exclusion.
