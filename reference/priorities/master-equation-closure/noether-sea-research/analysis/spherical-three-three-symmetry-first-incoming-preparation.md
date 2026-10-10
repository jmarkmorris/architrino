# The first arriving preparation and an ordinary continuation through it

## Result and claim boundary

The symmetric normally constrained release can be continued analytically to its first incoming nonstationary preparation. The first source class to leave the stationary past is the pair of non-antipodal opposite-polarity partners. Their common boundary time $T_B$ is uniquely determined by

$$
\boxed{d_O(\alpha(T_B))=T_B+\frac14,
\qquad
\frac34<T_B<\frac{\sqrt7}{2}-\frac14.}
$$

Here $\alpha(T)$ is the actual stationary-source constrained solution up to that boundary, and $d_O$ is its distance to either of those two old source sites. The proof below establishes reachability of the boundary, not merely a condition that an unverified later trajectory would have to satisfy. The release remains below wake speed through the boundary, every partner root is ordinary, and no positive-delay self root occurs. A further explicit time interval of $1/2000$ has a unique normal-only continuation with all emissions still in the known pre-release history.

This result is derived and self-reviewed, pending independent adjudication. It strengthens the [first-turn result](spherical-three-three-symmetry-first-turn.md) by a new continuation argument; its old numerical upper time bound is not treated as a previously proved solution horizon. The initial history remains externally prepared. No numerical evolution, new solver, smoothing, event rule, deleted root, tangential control or physical energy functional is introduced. This slice stops at the first incoming-preparation boundary and its local continuation.

## Exact reduction before the boundary

Use the unchanged symmetric preparation with $R=K_{\mathrm{int}}=c_f=1$, $\alpha_0=\pi/6$, initial meridional speed $1/4$ and stationary history through emission time $-1/4$. Reflection preserves zero azimuthal motion while the sources are stationary. Put $z=\alpha-\alpha_0$, $\rho_0=\sqrt3/2$, and

$$
q=\rho_0\cos\alpha-\sin\alpha,
\qquad
B=\rho_0\sin\alpha+\cos\alpha,
\qquad B^2+q^2=7/4.
$$

The old chord lengths and scalar acceleration are

$$
d_L^2=2+q,
\quad d_O^2=2-q,
\quad d_A^2=2+2\cos z,
\qquad
\ddot\alpha=f(\alpha)=-B\left[(2+q)^{-3/2}+(2-q)^{-3/2}\right]+\frac{\sin z}{d_A^3}.
$$

The labels denote the like-polarity pair, the non-antipodal opposite-polarity pair and the own antipode. These are retained old source positions, not moving source locations substituted into a stationary formula. Each old-source root is $S_j=T-d_j$ with transmitter factor one. The first boundary must therefore occur when the shortest of these distances equals $T+1/4$.

## A controlled return to the initial latitude

The earlier proof gives a first turn $T_*<2/7$ and maximum rise $0<z_*<1/28$. A sharper upper bound on deceleration over its ascent is useful here. For $0\le z\le1/8$, one has $0<q\le1/4$, $B<4/3$ and

$$
S(q)=(2+q)^{-3/2}+(2-q)^{-3/2}\le S(1/4)<3/4.
$$

Since $\sin z\ge0$, it follows that $-f<1$ on this upward strip. Together with the established $-f>7/8$, this improves the turning-time bracket to $1/4<T_*<2/7$.

The autonomous scalar equation is reversible about a zero-velocity point by uniqueness: $\alpha(T_*+u)=\alpha(T_*-u)$ for the returning segment. This is a mathematical property of the reduced equation, not time-reversal invariance of the full causal law. It remains legitimate here because every proposed arrival on the entire returning arc stays within the stationary past. Indeed that arc has $d_j>9/8$, speed at most $1/4$, and ends at $T_R=2T_*<4/7$, giving $d_j-T_R-1/4>17/56>0$. The complete root and no-self arguments therefore keep the reduction exact through the return. Consequently

$$
\frac12<T_R<\frac47,
\qquad
\alpha(T_R)=\alpha_0,
\qquad
\dot\alpha(T_R)=-\frac14.
$$

This explicit margin is why the return can be used; it is not inferred solely from an equation beyond its admitted history domain.

## Extending the deceleration bound to lower latitude

To reach the first arriving preparation, continue downward while $0\le\alpha\le\alpha_0$. The acceleration is negative because $B>0$, $S>0$ and $\sin z\le0$. A conservative but strictly sub-wake continuation bound follows from $-f<5/4$ over $0\le\alpha\le\alpha_0+1/8$.

Here is an explicit algebraic check of that upper bound. On this interval $0<q\le\rho_0$, $B=\sqrt{7/4-q^2}$, and $S(q)$ increases with $q$. The following rational bounds follow by squaring positive quantities in the displayed expressions for $B$ and $S$:

| Interval for $q$ | Upper bound for $B$ | Upper bound for $S(q)$ | Upper bound for $BS$ |
| --- | --- | --- | --- |
| $0\le q\le1/4$ | $4/3$ | $3/4$ | $1$ |
| $1/4\le q\le1/2$ | $13/10$ | $4/5$ | $26/25$ |
| $1/2\le q\le3/4$ | $5/4$ | $15/16$ | $75/64$ |
| $3/4\le q\le\sqrt3/2$ | $11/10$ | $21/20$ | $231/200$ |

For reproducibility, $S(1/4)=8/27+8/(7\sqrt7)<3/4$. At $q=1/2$, its two terms are less than $253/1000$ and $545/1000$, whose sum is below $4/5$. At $q=3/4$, they are less than $11/50$ and $179/250$, whose sum is below $15/16$. At $q=\sqrt3/2$, use $6/7<\sqrt3/2<7/8$ to bound the two terms by $21/100$ and $21/25$, respectively, with sum $21/20$. Each bound is an exact comparison of positive rational powers; no sampled maximization is involved.

Throughout the latitude interval, $|\sin z|\le1/2$ and $d_A^2\ge2+\sqrt3$, so $|\sin z|/d_A^3<1/14$. The largest table bound is $75/64$, and $75/64+1/14=557/448<5/4$. Thus $-f<5/4$, as claimed. On the descending part the deceleration is also strictly positive; no stop or upward re-turn occurs before the root boundary.

## Reachability and identity of the first boundary

Let $\overline T=\sqrt7/2-1/4<43/40$. After $T_R$, while the old-source reduction remains in the stated positive-latitude domain, put $u=T-T_R$. The deceleration bound gives

$$
|\dot\alpha|<\frac14+\frac54u,
\qquad
\alpha(T)>\alpha_0-\frac14u-\frac58u^2.
$$

For $T\le\overline T$, the strict lower bound $T_R>1/2$ makes $u<23/40$. Therefore

$$
|\dot\alpha|<\frac{31}{32}<1,
\qquad
\alpha(T)>\frac\pi6-\frac{4485}{12800}>\frac7{50}>0.
$$

These estimates prevent loss of positive latitude or the sub-wake-speed root census before either the first incoming-preparation event or $\overline T$. Smooth bounded acceleration prevents an earlier ordinary ODE breakdown. They close a continuation bootstrap; they do not assert continued validity of stationary sources after a source has left their stationary domain.

Over this motion $q>0$. Hence $d_O<d_L$. Also $d_A^2-d_L^2=\rho_0\cos\alpha+2\sin\alpha>0$, so the opposite non-antipodal pair is strictly the shortest class. Define its stationary-emission margin

$$
b(T)=d_O(\alpha(T))-T-\frac14.
$$

It starts positive. It decreases strictly because a receiver speed below one gives $|\dot d_O|<1$ and hence $b'<0$. Were no boundary reached by $\overline T$, the solution would already be descending below $\alpha_0$, making $d_O<d_O(\alpha_0)=\sqrt7/2$ and $b(\overline T)<0$, a contradiction. Thus there is exactly one first zero $T_B<\overline T$. Since positive latitude implies $q\le\rho_0<1$, one has $d_O>1$, and the boundary equality gives $T_B>3/4$. In particular it occurs after the return to $\alpha_0$.

Both members of the non-antipodal opposite-polarity pair have the same distance and cross the preparation boundary simultaneously for a representative receiver. The same event repeats for all receivers by the full-history symmetry. This is a tie between distinct source identities, not a double root for one source. The remaining three partners retain a strict old-source margin. For example, $q>1/16$ throughout the relevant upper strip and grows on descent, so

$$
d_L-d_O=\frac{2q}{d_L+d_O}>\frac1{32}.
$$

The own-antipode distance is larger still. Before $T_B$, all five partner roots are stationary-source roots and are the complete ledger: the entire history speed is below one, so each partner delay function is strictly increasing and no self root can occur. At $T_B$ the old-source acceleration formula still agrees with the canonical value; immediately afterward the arriving histories of the shortest pair must be evaluated from the actual preparation. The stationary-source description is no longer licensed for those roots.

## Regularity of the incoming preparation

Write an emission just after the preparation boundary as $S=-1/4+h$, $h\ge0$. The original cubic-start preparation is exactly

$$
\alpha_{\rm prep}(S)-\alpha_0=16h^4-4h^3,
\qquad
\dot\alpha_{\rm prep}(S)=64h^3-12h^2.
$$

The position and its first two time derivatives match the stationary past at $h=0$. The third latitude derivative jumps from zero to $-24$. Thus the prescribed source position is $C^2$ there, its velocity is $C^1$, and the source position and velocity changes are respectively $O(h^3)$ and $O(h^2)$. The canonical per-hit law reads only position and velocity, so its ordinary-root right-hand side is at least $C^1$ across this incoming-history boundary. No impulse, discontinuous kick, smoothing or new event prescription is needed.

At $T_B$, every incoming transmitter is still instantaneously at rest, so $D_t=1$. The root-playback derivative is

$$
\frac{dS}{dT}=\frac{D_r}{D_t}=1-\mathbf V_{\rm receiver}\cdot\hat{\mathbf r}>\frac1{32}>0.
$$

Each root crosses $S=-1/4$ transversely into the prepared portion. This is a regular history boundary, not a transmitter caustic. The acceleration's correction relative to continuing the fictitious stationary source begins at order at least $(T-T_B)^2$, from the source velocity term; this order statement does not set that correction to zero or license continued use of the stationary field.

## An explicit method-of-steps interval through the boundary

At $T_B$ all roots have delay greater than one, all source emissions are at or before $-1/4$, and all receiver speeds are less than $31/32$. Consider the full canonical normal-constrained equation over an additional interval $0\le T-T_B\le1/2000$, with a bootstrap assumption that speeds remain below one, continued partner delays exceed $1/2$, and emissions remain below zero. In that regime every source value is already supplied by the complete initial history; no newly evolved source value is needed.

The prepared source speeds are at most $1/4$, so $D_t\ge3/4$ and $W^{\mathrm{acc}}\le4/3$. Ordinary implicit-root continuation gives $0<dS/dT<8/3$, because the receiver speed is below one. Hence emission times advance by less than $1/750$ and remain strictly negative. Delay changes are bounded below by $-5/3$ per unit reception time, so their values remain greater than $1-1/1200>1/2$.

With five partner roots, the acceleration satisfies $|\mathbf A|<5(4)(4/3)=80/3$. The sphere equation bounds the complete acceleration by $|P\mathbf A|+|\mathbf V|^2<83/3<28$. Its speed change over the interval is less than $28/2000=7/500$, leaving the speed below $31/32+7/500<1$. These estimates close all three bootstrap assumptions. Positions remain on the sphere with tangent velocities by the exact constraint equation. The originally distinct member positions cannot collide in this short interval: their simultaneous separation at the boundary is at least one, and each moves less than $1/2000$.

The root maps are locally unique and smooth enough for a locally Lipschitz time-dependent ordinary equation in each receiver's position and velocity, with source functions known from $S<0$. Standard local existence and uniqueness therefore supply an actual extension through the entire explicit interval. Global strict sub-wake motion through the current event keeps each partner root unique and rules out every positive-delay self root; there is no hidden extra root beyond those continued. The other three source classes retain their stationary margins since their initial emission gap exceeds $1/32$, much larger than the possible advance $1/750$. Only the two shortest-class roots have begun reading nonstationary preparation in this interval.

The continued equation remains the selected normal-only law,

$$
\ddot{\mathbf X}_i=P_i\mathbf A_i-|\mathbf V_i|^2\mathbf X_i,
\qquad
\lambda_i=-|\mathbf V_i|^2-\mathbf X_i\cdot\mathbf A_i,
$$

on the unit sphere. The rough local bound also gives $|\lambda_i|<83/3$. A stronger support sign after the boundary is not asserted here. Reflection and the transitive full-history symmetry continue to hold, but the field now depends explicitly on the evolving emission times within the supplied preparation; the old autonomous scalar formula must not be reused after $T_B$.

## Evidence, falsifiers and preservation

The endpoint of this result is the event-defined interval $[0,T_B+1/2000]$. The upper bracket $\overline T$ is used to prove the boundary must occur; it is not claimed as an independently reached stationary-source endpoint. Continuation beyond this local method-of-steps interval, later post-release emissions, eventual speed crossings and global fate remain outside scope.

The mathematical evidence consists of the fixed-source inequalities, monotone boundary function, exact cubic preparation regularity and explicit root/velocity bootstrap above. A wrong chord ordering, failed rational table bound, loss of the sub-wake margin before $T_B$, or failure of the implicit-root hypotheses would falsify the result. The argument does not require quadrature, a target scan or a new computational instrument. It is not a physical energy account or proof of free confinement.

The previously read live `AGENTS.md` and Emmy Noether role were checked by `shasum -a 256` and retain their dispatch identities. Only this new symmetry-prefixed companion is authored. Earlier frozen reports and all dynamics/reviewer subjects are preserved, and the coordinator owns synthesis and trackers. All small evidence is retained in this derivation; no bulky output, compute job or lease was created. Independent review and coordinator integration are the remaining dependencies. This slice stops at the requested first incoming-preparation boundary and its certified local continuation.

Document checks: `git diff --no-index --check /dev/null` on this companion emitted no whitespace diagnostics (exit 1 records the file difference); scoped `rg` confirmed the linked first-turn source. `shasum -a 256` over the symmetry-prefixed Markdown files confirmed that the seven earlier artifacts retain their frozen identities. A scoped `rg` for carriage returns and accidental replacement characters in this new companion returned no matches after an authoring typo was repaired. These are document and preservation checks, not independent verification of the new continuation proof.
