# The twisted helix has a fold in the twist: an interval certificate

## Result

At $R=1000$ the balances of the twisted rotating and translating helix (conventions as in the [main certificate](rotating-ladder-claude-2026-10-20-twisted-certificate.md)) form a continuous ($C^1$) curve along which the twist $\alpha$ has a strict interior minimum: a turning point (fold) in $\alpha$. This is certified by switching the continuation parameter.

- **Parametrization.** The spacing $\delta=d/R$ is the parameter, and the unknowns are $y=(\varepsilon,u,\alpha)$, where $\varepsilon=\omega R$.
- **Continuous curve.** Over $\delta\in[2.8835,\,2.91075]$, 109 consecutive spacing pieces are certified and joined: for every $\delta$ there is exactly one solution $y(\delta)$ in each piece's box, and it depends continuously ($C^1$) on $\delta$.
- **Sign change.** On the curve, $d\alpha/d\delta\in[-0.03204,\,-0.01700]$ (rounded outward) on a sub-piece at $\delta\approx2.886$, and $d\alpha/d\delta\in[0.01639,\,0.03091]$ on a sub-piece at $\delta\approx2.908$.
- **Consequence.** $\alpha$ restricted to $[2.886,2.908]$ attains its minimum at an interior point, where $d\alpha/d\delta=0$.

The minimum satisfies

$$
\alpha_{\min}\in[0.877746339\,\pi,\ 0.877753479\,\pi],
$$

with both ends rounded outward. The float worker's reported fold $0.8777498847\pi$ lies inside this enclosure; that is a comparison only.

**Claim grade:** derived, for the statements above. They rest on the lemmas and the frozen instrument of the main note (SHA-256 `75885d17…9722`, mpmath 1.3.0 `iv` as declared dependency), the parametric Krawczyk theorem, and the interval fixed-point enclosure of Section 3. Other questions remain open:

- **Two-sided structure.** That the fold is quadratic and that exactly two balances exist for $\alpha$ slightly above $\alpha_{\min}$ near the fold is not certified. The second derivative of $\alpha$ was not enclosed.
- **The two $0.878\pi$ balances.** Each one's box lies inside a certified spacing piece: the lower in the piece centred at $\delta=2.870375$, the upper in the piece centred at $2.924125$. The pieces between the chain and those two pieces are not yet joined, so the two balances are not proved to lie on the joined curve. That was not completed before the deadline.
- **α-parametrized branch.** The gluing of this curve to the α-parametrized branch at $\delta\approx2.98$ was not attempted.

## 1. Formulation

For a spacing piece $\Delta=[c-r,c+r]$ and a box $Y$ around $\hat y$, the Krawczyk image is

$$
K=\hat y-C\,F(\hat y,c)-(C F_\delta)(\Delta-c)+(I-CJ_y)(Y-\hat y).
$$

The ingredients are as follows.

- $J_y$ encloses $\partial F/\partial(\varepsilon,u,\alpha)$ over $Y\times\Delta$, tails included. Its $\alpha$-column uses the twist-derivative tail bound evaluated at the worst corner of the box.
- $F_\delta$ encloses $\partial F/\partial\delta$ over $Y\times\Delta$.
- $C\approx(\operatorname{mid}J_y)^{-1}$.

The product $CF_\delta$ is formed before multiplying by $\Delta-c$. This is valid by the row-wise mean-value theorem, and it keeps the cancellation that makes $\alpha$ nearly stationary near the fold. A first version multiplied $F_\delta$ by $\Delta-c$ first and failed on every piece; those records are kept.

If $K\subset\operatorname{int}Y$, then for every $\delta\in\Delta$ exactly one solution lies in $Y$, and every matrix in $J_y$ is nonsingular. By the implicit-function theorem, $y(\delta)$ is $C^1$.

## 2. Joins

Consecutive pieces were built from float linspace edges with a common radius. This left exact gaps of up to $4.4\times10^{-16}$ between neighbours: 106 of 217 pairs. A join point placed at such an edge then lies in neither piece. This defect of the driver was found by the exact containment check `fold_check.py`.

It is repaired by gap patches (`fold_patch.py`). Each patch is a certified piece of radius $10^{-12}$ centred on the gap. It overlaps both neighbours, and its box lies strictly inside both neighbouring boxes, so the three certified curves coincide on the overlaps by uniqueness.

The patch run ended at its deadline after 108 pairs, all certified. They form the contiguous chain of pieces 54 to 162, covering $\delta\in[2.8835,2.91075]$. The remaining pairs, toward $\delta=2.8700$ and $2.9245$, are unjoined local certificates.

## 3. The sign of $d\alpha/d\delta$

Along the curve, $d\alpha/d\delta=-[J_y^{-1}F_\delta]_\alpha$. Write $D=\operatorname{diag}(\text{radii of }Y)$, $g=D^{-1}CF_\delta$ and $\rho=\lVert D^{-1}(I-CJ_y)D\rVert_\infty$. If $\rho<1$, every solution $z'$ satisfies $\lvert z'\rvert\le\lvert g\rvert/(1-\rho)$, and therefore lies in $g+D^{-1}(I-CJ_y)D\,Z$. Iterating and intersecting gives an enclosure.

Over a full piece of width $2.5\times10^{-4}$ this enclosure was too wide: $\pm0.06$. Small sub-pieces were therefore certified at $\delta=2.886\pm10^{-6}$ and $2.908\pm10^{-6}$, with $N=20000$ and $\rho\approx0.012$.

| Sub-piece | Certified | $d\alpha/d\delta$ |
| --- | --- | --- |
| $\delta=2.886\pm10^{-6}$ | yes | $[-0.0320325,\,-0.0170062]$ |
| $\delta=2.908\pm10^{-6}$ | yes | $[0.0163911,\,0.0309022]$ |

Each sub-piece box lies strictly inside the boxes of the two chain pieces it overlaps, so its solutions are those of the chain. The same was done at $\delta=2.8706$, giving $[-0.0779,-0.0401]$, and at $2.924$, giving $[0.0407,0.0755]$. Those points lie in unjoined pieces, so they are not used for the theorem.

The minimum enclosure is obtained as follows. The lower bound is the least lower endpoint of the $\alpha$-enclosures over the chain. The upper bound is the upper endpoint of the $\alpha$-enclosure of the piece $[2.89675,2.89700]$, which lies inside $[2.886,2.908]$.

## 4. Controls (run first; `fold-controls-receipt.json`)

| Control | Check | Outcome |
| --- | --- | --- |
| F1 | Toy turning point $x^2+a$: the enclosure routine gives $da/dx\in[-0.4,-0.2]$ for $x\in[0.1,0.2]$ and $[0.2,0.4]$ for $x\in[-0.2,-0.1]$ | correct signs |
| F2 | A $3\times3$ interval linear system against a 200-bit solve | solution enclosed |
| F3 | The $0.9\pi$ balance rerun through the new parametrization, at the spacing of the $0.9\pi$ centre | certified; $\alpha$-enclosure $[2.8274329,2.8274339]$ contains $0.9\pi$; $(\omega R,u)$ inside the $0.9\pi$ box |

The first F2 run failed. Its reference was a float solve, not exact, and that record is kept. The first controls run also lacked a main-module guard: process spawning recursed, and the command was moved to the background by the shell timeout and then killed by me.

## 5. Provenance

- **New drivers:** `fold.py` (`1f91e80a…`), `fold_controls.py`, `fold_check.py`, `fold_patch.py`, `fold_final.py`.
- **Receipts:** `fold-final-receipt.json` (`0c196987…`), `fold-patches.json`, `fold-sign-*-inner.json`, `fold-check-receipt.json`. Full piece records and join records are in `.local-data/…/twisted-certificate/fold-*.json`.
- **Supervision.** All runs used the owned supervisor with 60 s heartbeat and hard deadlines. The gap-patch run (697 s) exceeded the shell tool's 600 s limit and was moved to the background by the tool. It finished within its supervisor deadline at 02:41Z; no process remains.

**Falsifier:** a certified piece or patch whose box holds no solution or two solutions at some $\delta$ in it, or an outward re-evaluation of either sub-piece giving an $\alpha$-derivative enclosure that contains 0.


## Independent review disposition and corrections

Codex reviewed this note as frozen (SHA-256 `f9c70a85df933268cdf2c9d4bbaadf5443d01f5b546f2abdd6bcbeba729d7b94`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-21T02:57:29Z, and accepted the joined $C^1$ curve on $[2.8835,2.91075]$, the two uniform derivative-sign enclosures and the minimum enclosure $[0.877746339\pi,0.877753479\pi]$ (also using all 108 patch images for the lower bound). It accepted the mean-value form with $CF_\delta$ formed first, the 108 patches (exactly pairs 54 to 161) and the regularity argument. Corrections that supersede the body: (1) the conclusion is **an interior minimum of the twist strictly below both endpoint values**, at a point where $d\alpha/d\delta=0$, not a strict, isolated or nondegenerate (quadratic) fold, which would need second-order bounds; a $C^1$ function with a flat interval of minimizers satisfies the same hypotheses; (2) the derivative solver's norm sums used round-to-nearest arithmetic and must be outward-rounded; the reviewer's rerun with outward sums returns the same intervals $[-0.03204,-0.01700]$ and $[0.01639,0.03091]$, with norm bounds below $0.00542$; (3) the frozen chain's outer float endpoints miss the literal decimals $2.8835$ and $2.91075$ by about $4\times10^{-16}$; the reviewer's endpoint reruns cover them and are the completion. Derived in review: for every twist in $[0.87776\pi,0.87778\pi]$ there are at least two distinct balances on this curve. At a minimizing point the fixed-twist Jacobian in $(\delta,\varepsilon,u)$ has rank exactly two with $F_\alpha$ outside its range. The later joins addendum was not part of this review.
