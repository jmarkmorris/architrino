# A mirror pair below wake speed: angular momentum changes in one direction

## Result

For two architrinos that move as mirror images through a centre, with every speed below wake speed, the unchanged Master Equation gives an exact sign for the rate of change of angular momentum. For opposite polarity, a pair that turns in one sense gains angular momentum per member at every instant. For like polarity it loses it, for as long as the pair keeps turning in the same sense. No periodic history of a mirror opposite pair that turns in one sense exists below wake speed, rigid or breathing.

**Claim grade:** derived, accepted with corrections by a [second reading](mirror-pair-angular-momentum-second-reading-2026-10-05.md), with a numerical check on 400 random histories. The derivation and its consequences are set out in the Braid Program's [release and search analysis](../../braid-program/analysis/released-balances-and-nonrigid-search-2026-10-05.md#a-mirror-opposite-pair-below-wake-speed-gains-angular-momentum-at-every-instant), which also records the release of this owner's [closed-form pair](asymmetric-opposite-pair-closed-form.md). This note exists so that the binary owner indexes the statement.

## Statement

Let the members be at $\pm\mathbf x(t)$ with $\mathbf x=\rho(\cos\theta,\sin\theta)$, let $\sigma=-1$ for opposite and $+1$ for like polarity, and let $s=t-\tau$ be the emission time of the single causal root each member receives from its partner. Then, with $\ell=\rho^2\dot\theta$ the angular momentum per member and $D$ the transmitter factor,

$$
\frac{d\ell}{dt}=-\sigma\,\frac{\rho(t)\,\rho(s)\,\sin\bigl(\theta(t)-\theta(s)\bigr)}{\tau^3\lvert D\rvert},\qquad\lvert\theta(t)-\theta(s)\rvert<\frac{\pi}{2} .
$$

Here $\theta(t)-\theta(s)$ is the angle swept along the path. The bound holds for two reasons. The chord $\lvert\mathbf x(t)-\mathbf x(s)\rvert$ is shorter than the delay $\tau=\lvert\mathbf x(t)+\mathbf x(s)\rvert$, since a member below wake speed travels less than $\tau$ during the delay, and that gives $\mathbf x(t)\cdot\mathbf x(s)>0$. And a path that swept half a turn would be at least $\rho(s)+\rho(t)\ge\tau$ long. The root exists for any history that satisfies the equation on its whole past, and the transmitter factor lies between $0$ and $2$.

## Consequences and limits

- At small speed the identity reduces to the [encounter map](slow-mirror-encounter-first-order-map.md)'s rate of $K/(4c_f)$ per radian.
- The [equal-radius circle](../../braid-program/analysis/ring-arbitrary-inventory-low-speed-independent-adjudication-2026-10-03.md#verdict-and-scope) below wake speed is excluded again as a special case.
- A history whose sense of rotation reverses is not covered; neither is a pair without mirror symmetry, nor any motion with a member at or above wake speed, where further rows appear.

A mirror opposite pair below wake speed, turning in one sense, whose angular momentum decreases at some instant would refute the statement.
