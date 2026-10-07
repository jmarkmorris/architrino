# Passage and tail audit for the fixed Package B history

**Status: derived audit submitted for independent review; quantitative admission remains with the coordinator.** This supplies the initial-condition comparison for a zero crossing already inside the compact part of the [frozen candidate](authorized-cases-ten-hour-b-direct-release-candidate.md), and checks the tail factors. It changes no frozen source or case parameter.

## A compact crossing has a specified comparison point

At a zero crossing of the actual account, let $C=(w-1,u)$. The exact identity, including both corrections, is

$$
|C|^2=1+\delta^2w^3+\frac83\delta^3uw^2.
$$

On the compact crossing portion $1\le w\le2+o(1)$, with $|u|\le2$, this implies $||C|-1|\le16\delta_c^2$. The central comparison point is explicitly $C/|C|$, rather than a prescribed replacement orbit. Write it as $(\sin\theta_0,-\cos\theta_0)$ with $0\le\theta_0\le\pi$. Inward, stationary and outward crossings correspond respectively to the first half, midpoint and second half of that interval. Its central continuation reaches $w=1/2$ outward at phase $7\pi/6$; the remaining angular duration is at most $7\pi/6<4$. The initial discrepancy is at most $16\delta_c^2$.

For a crossing starting inward at $w_c<1$, the candidate's small-$w$ estimate first reaches $w=1$. The exact completed square

$$
\left(u-\frac43\delta^3w^2\right)^2
=2w-w^2+\delta^2w^3+2A_E+\frac{16}{9}\delta^6w^4
$$

shows $\sqrt w\le|u|\le2\sqrt w$ on the provisional region $0\le A_E\le w/16$. For the lower inequality, subtract $(\sqrt w+(4/3)\delta^3w^2)^2$. The remaining quantity is

$$
w(1-w)+\delta^2w^3-\frac83\delta^3w^{5/2}+2A_E\ge0.
$$

For $w\ge1/2$ the quadratic correction dominates the cubic term; for $w<1/2$ the first term does. Inward $u<0$ gives $k>0$ for the candidate's remainder margin, so $w_\theta\ge|u|$ and $|d\log h/dw|\le2\delta^2$. These inequalities imply the looser constants already displayed in the candidate. At $w=1$, its bound $A_E\le40\delta_c^3$ gives an initial discrepancy from $(w,u)=(1,-1)$ below $16\delta_c^2$, the same bound as the compact case.

On $1/4\le w\le3$, $|u|\le2$, provisionally $\delta/\delta_c\in[100/101,101/100]$. The exact polar equations give $|k|\le(9/4)\delta^2$, so four units of angle change $\log h$ by less than $10\delta_c^2$. Together with the incoming part this improves the provisional ratio. The perturbation of the two-component central linear field is bounded by $64\delta_c^2$. Including the initial discrepancy gives a comparison error below

$$
\{16e^4+64(e^4-1)\}\delta_c^2<2^{13}\delta_c^2.
$$

To make persistence of the receiving section explicit, bracket the central phase $7\pi/6$ by $\pm1/16$. Both phases occur before four elapsed angular units. On that bracket the central $u$ is above $3/4$, so the two central $w$ values differ from $1/2$ by more than $3/64$. The actual comparison error is far below $1/128$ under the proposed parameter bound. Hence continuity gives an actual outward crossing of $w=1/2$, and its $u>1/2$. The circle comparison stays inside the enlarged box until that section, with strict room in every boundary inequality.

The account equation is

$$
(A_E)_\theta=2kA_E+\frac43\delta^3w^2(1+\eta_E),\qquad |\eta_E|<1/4.
$$

Thus its scaled change over the compact part is below $2^{12}\delta_c^3$. Combined with $w\ge1/4$, this keeps $r\mathcal E=A_E/w<1$, strictly below the tail-transition cutoff $128$. The account itself is strictly positive after the first zero because its time derivative is positive. A crossing already outward with $w\le1$ enters that same outward region after any sufficiently short positive time; it does not require the compact comparison.

## Exact outward and tail factors

The useful distinction is $r\mathcal E=A_E/w$, not $A_E$ alone. The exact radial identity is

$$
rp^2=2(r\mathcal E+1)-w+\frac{\epsilon^2h^2}{r^2}+\frac{2\gamma p}{r}.
$$

For $p>0$, $w\le1$ and $\mathcal E>0$, this yields $rp^2\ge1$. In the exact logarithmic derivative of $w$,

$$
\frac{w'}w=-\frac pr-\frac{2\epsilon^2p}{r^2}
+\frac{2\gamma}{r^3}+\frac{2rQ_\theta}{h},
$$

the two negative terms are retained. Relative to $p/r$, the positive cubic term is at most $(8/3)(\epsilon/\sqrt r)^3$ and the remainder is at most $2C_Q\epsilon^4/(h r^{3/2})$. Both are strictly smaller than $1/4$ under the candidate's margins. Thus $w$ continues to decrease, and an outward turn back through $p=0$ is excluded by $rp^2\ge1$.

At the actual transition $r_t\mathcal E_t=128$, the same identity yields $r_tp_t^2\ge257$. The speed identity instead yields $r_t|v_t|^2<259$, so $|v_t|<17/\sqrt{r_t}$. These are distinct inequalities. With exact acceleration constant $C_A=16$, the provisional radial cone gives a total vector-speed change below

$$
\frac{2C_A}{p_tr_t}\le\frac{32}{\sqrt{257}\sqrt{r_t}}<\frac2{\sqrt{r_t}}.
$$

Consequently the complete future speed is below $19/\sqrt{r_t}<2^{13}$ in the dimensionless normalization, while radial integration of $r''\ge-16/r^2$ gives $p^2\ge p_t^2-32/r_t>p_t^2/2$. This closes both the speed margin and the outward cone.

The ballistic source inventory must include the whole sampled segment at transition. Every point on that segment already satisfies its parabolic bound and the global lower radius $r_*=2^{-13}$. Therefore

$$
r^m|y^{(m)}|\le M_m\max\{1,r_*^{1-m/2}\},\qquad 2\le m\le6.
$$

The factor can be greater than one when $r_t<1$; it has not been discarded. The explicit enlarged ballistic constants in the [majorant addendum](authorized-cases-ten-hour-b-majorant-addendum.md#5-finite-tail-constants-and-arithmetic-evidence) cover those factors. No new past is supplied at transition. Bounded vector acceleration is then integrable on the linear-radius tail, producing a vector velocity limit with norm at least $p_t/\sqrt2$.

Falsifiers are a zero-account crossing outside the stated projected comparison circle bound, failure of the perturbed section bracket under the explicit error estimate, confusion of $A_E$ with $r\mathcal E$, or a sampled tail jet outside the displayed entry inequality. The audit does not determine whether the frozen preparation's account ever crosses zero.
