# Causal logarithmic continuation: a nonintegrable self arrival

## Result and the continuation class

**Claim grade: derived for the specified inverse-distance causal-root law and the established collinear incoming histories.** No labeled collinear continuation can retain finite continuous velocity through the first wake-speed event, satisfy the full ordinary-root equation almost everywhere afterward, and have locally absolutely continuous velocity on intervals strictly after that event. This excludes classical motion and the usual integral interpretation of acceleration. The outgoing motion is not assumed to preserve mirror symmetry. The theorem supplies a failure of continuation at positive separation, not a passage, a bounce, or a speed ceiling.

Here “locally absolutely continuous velocity” means that, on every closed interval strictly after the event, its change equals the integral of its acceleration. The interval may approach the event arbitrarily closely; integrability across the event is not assumed. Only a finite continuous velocity trace there is required. This distinction prevents the conclusion from being built into the hypotheses.

The [incoming theorem](causal-collinear-first-event.md) supplies a complete past for each $a,K>0$ and prepared inward speed $0\le u_0<1$, in normalized wake-speed units $c_f=1$. It ends at a finite time $T_*$ with

$$
X_+(T_*)=x_*>0,\qquad X_-(T_*)=-x_*,\qquad
\dot X_+(T_*)=-1,\qquad \dot X_-(T_*)=1.
$$

Each receiver then has one simple partner root $S_*<T_*$, a finite positive inward partner acceleration, and no positive-delay self root. All earlier individual speeds are below one. The [candidate formulation](causal-logarithmic-formulation.md) includes every simple positive-delay root with positive coupling and absolute transmitter weight $1/|D_t|$. It excludes the exact zero-delay diagonal and supplies no impulse, cap, signed subtraction, or extra event update.

The proof below first derives the outgoing direction and speed crossing from the equation. Only then does it determine the newborn root and its integral. It therefore removes the extra monotone-crossing assumption of the [earlier conditional calculation](inverse-distance-collinear-obstructions.md).

## An inward sign before any assumption about acceleration

Allow the two labels to have different outgoing motions along their original line. Define positive distances from the original midpoint by

$$
y_+(T)=X_+(T),\qquad y_-(T)=-X_-(T),\qquad
u_i(T)=-\dot y_i(T),\qquad i\in\{+,-\}.
$$

These coordinates do not impose a fixed future midpoint: the two $y_i$ need not remain equal. By continuity of positions and velocities, a sufficiently short proposed outgoing interval has $y_i>0$ and $u_i>0$. Every label still moves inward, even though its acceleration and whether its speed rises have not yet been determined.

Consequently each right-hand self emission point lies to the right of its current receiver, so same-polarity self repulsion accelerates that receiver leftward. Every opposite-polarity source point lies on the left, so attraction also accelerates it leftward. The left receiver has the reflected sign argument. Every admitted contribution is therefore inward for its own receiver. Absolute transmitter weighting is essential: changing the source denominator's sign cannot reverse a contribution.

There is at least one regular partner contribution throughout this short interval. On the incoming past, put $P_j(S)=S+y_j(S)$; it increases strictly because $P_j'=1-u_j>0$. A partner root for receiver $i$ satisfies

$$
P_j(S)=T-y_i(T),\qquad j\ne i.
$$

At $T_*$ the right-hand side lies below $P_j(T_*)$ by $2x_*>0$. For sufficiently short future time that gap persists, so the equation has exactly one root in the incoming past, near $S_*$. It is simple, and its range and source denominator stay bounded away from zero. No source time between $T_*$ and reception can be a partner root: on a short enough interval the partner distance $y_i(T)+y_j(S)$ exceeds the entire elapsed time $T-T_*$. This excludes recent partner emissions without assuming any future monotonicity of $P_j$.

The surviving partner acceleration $A_{p,i}$ is continuous, finite, and positive. Shrinking the interval if necessary gives constants $0<m_i\le A_{p,i}(T)\le M_i<\infty$. Wherever the full ordinary equation is defined,

$$
\dot u_i(T)=A_{p,i}(T)+\sum_{\text{self roots}} A_{s,i}(T)
\ge m_i>0.
$$

If the full sum is undefined on a set of positive measure, it already fails the stated solution class. Otherwise, integrate this inequality from $T_*+\delta$ to $T$ and send $\delta\downarrow0$, using the finite trace $u_i(T_*)=1$. It follows that

$$
\boxed{u_i(T)\ge1+m_i(T-T_*)>1\quad(T>T_*).}
$$

Thus every proposed continuation in this class must cross above wake speed and must have increasing inward speed. A constant-speed segment, braking, reversal, or waiting interval cannot avoid the crossing while retaining the same equation. This conclusion holds separately for both labels; future mirror symmetry was not used.

## The complete immediately outgoing root inventory

For each label, $P_i(S)=S+y_i(S)$ increases throughout its incoming past and tends to minus infinity in the affine remote past. After the event, the forced inequality $u_i>1$ gives $P_i'=1-u_i<0$. Thus $P_i$ has a strict maximum at $T_*$.

A same-label self root has distance $y_i(\tau)-y_i(T)$ because its path moves inward. Its causal condition becomes

$$
y_i(\tau)-y_i(T)=T-\tau,
\qquad P_i(\tau)=P_i(T),\qquad \tau<T.
$$

The rising incoming part of $P_i$ supplies exactly one root $\tau_i(T)<T_*$. Its decreasing outgoing part supplies none before $T$; the equal-time diagonal is excluded. The new source time approaches $T_*$ from below as $T\downarrow T_*$. Hence the entire immediately outgoing inventory would be one older simple partner root and one newborn simple self root per receiver, with no other roots in the complete past.

The self root is ordinary at every strictly later reception time. Its delay $\rho_i=T-\tau_i$ and transmitter factor $1-u_i(\tau_i)$ are positive there. Their approach to zero at birth, rather than an undefined row at each later time, causes the problem.

## The self contribution cannot be integrated from birth

Suppress the label temporarily. Define the positive speed gaps

$$
w_-(T)=1-u(\tau(T)),\qquad
w_+(T)=u(T)-1,\qquad
\rho(T)=T-\tau(T).
$$

Differentiating $P(\tau)=P(T)$ uses only the continuous velocities and the simple incoming source root. It gives

$$
\dot\tau=-\frac{w_+}{w_-},\qquad
\dot\rho=\frac{w_-+w_+}{w_-}>0.
$$

The self root therefore reads progressively earlier emissions as reception advances. Negative playback does not reverse its acceleration. For self coefficient $K_s>0$ (equal to $K$ for this equal-magnitude pair), the inward acceleration and its time integral obey

$$
A_s(T)=\frac{K_s}{\rho w_-},\qquad
\boxed{A_s(T)\,dT
=\frac{K_s}{\rho(w_-+w_+)}\,d\rho.}
$$

Finite continuous velocity makes $w_-+w_+$ bounded above by some finite positive $B$ in a short interval. In fact this sum tends to zero at the event, but boundedness alone suffices. For $T_0>T_*$ and $0<\delta<T_0-T_*$,

$$
\int_{T_*+\delta}^{T_0} A_s(T)\,dT
\ge\frac{K_s}{B}
\log\!\left(\frac{\rho(T_0)}{\rho(T_*+\delta)}\right)
\longrightarrow+\infty
\quad(\delta\downarrow0).
$$

Meanwhile the full equation and the inward signs imply

$$
u(T_0)-u(T_*+\delta)
\ge\int_{T_*+\delta}^{T_0} A_s(T)\,dT.
$$

The left side has a finite limit and the right side diverges. This contradiction rules out the proposed continuation. A merely unbounded pointwise acceleration could have a finite integral; the displayed lower bound proves that this particular divergence is nonintegrable and therefore incompatible with finite velocity.

The two receivers cannot cancel this obstruction by having opposite coordinate accelerations. It occurs in each receiver's own velocity equation. Under mirror symmetry the coordinate-vector sum may vanish, but their inward accelerations add in the relative approach: $\ddot d=-(\dot u_++\dot u_-)$ for separation $d=y_++y_-$. Nor can a symmetric subtraction across a later contact cancel a one-sided positive divergence at this earlier positive-separation event.

## What is finite at the endpoint

| Quantity | At the incoming endpoint | Under a hypothetical ordinary outgoing continuation |
| --- | --- | --- |
| Positions and equal-time separation | Finite; separation $2x_*>0$ | Remain separated for sufficiently short time by continuity |
| Individual velocity | Finite; inward speed one | Cannot remain finite and satisfy the complete equation |
| Partner contribution | One simple root; finite positive inward acceleration | Exactly one persistent, bounded positive contribution |
| Positive-delay self contribution | No root at that exact instant | Exactly one inward root per receiver, with divergent integral from birth |
| Same-time emission | Excluded by the root rule | Its exclusion does not remove nearby positive-delay roots |
| Full receiver sum | Finite at the endpoint itself | No locally integrable acceleration extension matching finite velocity |

This is not a predicted instantaneous jump to infinite speed. It is an inconsistency in the requirements for a finite-velocity outgoing solution of the stated law. Stopping the proof at the endpoint does not install a physical stopping rule. Holding speed at one would also contradict the strictly positive partner acceleration unless the law were changed.

## A bounded-variation interpretation and its limit

A velocity of bounded variation is one whose total accumulated change on the interval is finite; its derivative may include an ordinary density and concentrated or singular changes. The ordinary-root equation does not specify such an additional derivative measure. An equation asserted only almost everywhere cannot control arbitrary singular changes of velocity, so the preceding argument is not a claim about every conceivable weak extension.

There is nevertheless a useful precisely scoped negative result. Suppose one seeks a nonnegative inward acceleration measure with finite mass on a right neighborhood including $T_*$, preserving the incoming velocity trace and including every ordinary partner and self contribution with its stated positive density. Finiteness only on the open interval after $T_*$ would not control divergence toward its boundary; finite total variation up to the event is required. This class allows more general accumulation than an ordinary integrable acceleration, while forbidding undeclared negative cancellation. Its cumulative inward velocity obeys

$$
du_i\ge A_{p,i}(T)\,dT\ge m_i\,dT.
$$

It must therefore increase above one. Positions are absolutely continuous, the outgoing $P_i$ decreases strictly, and the same one-partner/one-self root inventory follows. The incoming $P_i$ is continuously differentiable, with positive derivative at every sampled source time; its inverse makes $\tau_i$ absolutely continuous on every interval away from birth. The delay identity and its change of variables hold almost everywhere there. Bounded variation gives bounded speed gaps, and the positive self density still has the infinite integral derived above. No nonnegative acceleration measure finite up to the birth endpoint can contain it. A finite positive endpoint atom cannot cancel an infinite positive density.

This extension is a test of that expressly stated measure interpretation, not adoption of a weak solution law. A signed impulse, negative singular derivative, root deletion, subtraction rule, finite core, or changed response adds data absent from the candidate. No result is claimed for transverse departures from the line, other preparations, or a newly specified event law.

## Completion boundary and falsifiers

The continuation question for the declared collinear approach is settled negatively in the finite-velocity solution class above. The incoming derivation remains valid through the first event. What fails is a same-law outgoing continuation, so contact passage and repeated approach cannot be obtained by extending that incoming branch with this operator. The failure persists for every preparation covered by the incoming theorem; weakening inverse-square radial acceleration to inverse-distance does not resolve this self-reception obstruction.

The result is refuted by a collinear continuation satisfying the exact retained past, finite matching velocity, the stated integral regularity, complete root sum, and the proposed acceleration equation. More locally, a missed root of opposite inward sign, loss of the positive partner lower bound despite the declared separation, a failure of the self-root identity, or a finite value of its positive improper integral would break a specified proof step. A transverse trajectory or a newly imposed boundary update requires a different analysis and does not satisfy these hypotheses.
