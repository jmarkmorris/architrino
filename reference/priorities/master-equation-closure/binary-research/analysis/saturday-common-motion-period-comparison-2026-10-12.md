# The common-motion term against the gain: a nonnegative loss, an exact balance, and an exclusion in a quantified class (2026-10-12)

## Result

**In words.** For a rigidly repeating opposite pair, the relative angular momentum $J$ gains over each period an amount close to the angle $\Theta$ turned by the pair's axis. A repeating history needs that gain cancelled. The earlier notes wrote what could cancel it as one integral $C_0$, split into a term $\Lambda$ and a breathing integral, with no sign and no size. This note treats $C_0$ directly and finds a different split in which the main term has a sign. Apart from a remainder $R$ that is explicitly bounded, what can cancel the gain is a *loss* $M_+$ whose integrand is never negative and is proportional to the square of $P_\perp$, the sum of the two members' velocities across the axis, together with a breathing integral whose weight is also proportional to $P_\perp^2$. Both are then bounded by quantities of the solution, and the comparison gives an exclusion in a class defined by one inequality (item 3). That inequality joins three things: the size of $r/J^2$, the variation of $r/J$ per radian, and an allowance $\eta$ for the remainder that is below one only when the angular momentum is not small. A rigidly repeating solution in the speed class must violate it: large $r/J^2$ somewhere, or strong variation, or small angular momentum with $\eta$ near or above one.

1. **Exact balance (derived).** For every rigidly repeating solution with $J>0$, in the ordinary setting below wake speed (one partner row for each member, positive row strengths, no own-path row),
   $$
   M_+-B_S=\Theta+M_{\rm rel}+R,\qquad M_+=\oint\frac{r\,P_\perp^2}{4J}\Bigl(\frac{a_1}{S_1}+\frac{a_2}{S_2}\Bigr)dt\ \ge0,\qquad M_{\rm rel}=\oint\frac{J}{4r}\Bigl(\frac{a_1}{S_1}+\frac{a_2}{S_2}\Bigr)dt\ \ge0,
   $$
   where $B_S=\oint W_S\,d(r/J)$ is a breathing integral with $\tfrac14P_\perp^2\le W_S\le\tfrac14(1+\varphi_2(w))P_\perp^2$, and $R$ collects three curvature remainders (Theorem C.2). Under a whole-past speed bound $w<\tfrac13$ and $J\ge J_{\min}>0$, $\lvert R\rvert\le\eta\,\Theta$ with $\eta=e_1(w)/J_{\min}+e_2(w)/J_{\min}^2$; at $w=\tfrac1{10}$, $e_1\le3.989$ and $e_2\le0.2731$.
2. **Necessary condition (derived).** For such a solution,
   $$
   (1-\eta)\,\Theta\le\kappa_M(w)\oint P_\perp^2\,\frac r{J^2}\,d\vartheta+\kappa_S(w)\oint P_\perp^2\,\Bigl\lvert d\frac rJ\Bigr\rvert\le P_{\perp\max}^2\bigl[\kappa_M\,\Xi\,\Theta+\kappa_S\,\mathcal V\bigr]
   $$
   (Theorem C.3), with $\kappa_M=(1+w)^2/(2(1-w)\sqrt{1-w^2})$, $\kappa_S=\tfrac14(1-w^2)^{-3/2}$, $\Xi=\sup r/J^2$ and $\mathcal V$ the total variation of $r/J$ over a period.
3. **Exclusion in a quantified class (derived).** There is no rigidly repeating solution with both speeds at most $w<\tfrac13$ over the whole past, $J\ge J_{\min}>0$, and
   $$
   4w^2\Bigl[\kappa_M(w)\,\Xi+\kappa_S(w)\,\frac{\mathcal V}{\Theta}\Bigr]<1-\eta(w,J_{\min})
   $$
   (Corollary C.4). The class is empty when $\eta\ge1$, that is for small $J_{\min}$, and nothing is excluded there. At $w=\tfrac1{10}$ a conservative sufficient test is $0.02703\,\Xi+0.01016\,\mathcal V/\Theta<1-3.989/J_{\min}-0.2731/J_{\min}^2$: its coefficients and error constants are the exact ones rounded upward, so it implies the exact inequality and is not equivalent to it. In particular no such solution with $\eta<1$ has its velocity sum along the axis at all times ($P_\perp\equiv0$). For orientation only: the leading no-delay relation for a circular relative orbit gives $r/J^2\approx\tfrac12$ and no variation, for which the left side is $0.0136$; that relation is a comparison and admits no history.
4. **What this is and is not.** It is the comparison the accepted note called M2, proved in the class defined by the inequality of item 3. It is not M2 in general: $\Xi$ and $\mathcal V/\Theta$ are properties of the solution that the equations are not shown to bound, so a repeating solution with large $r/J^2$ somewhere, or with strong variation of $r/J$, is not excluded. The smallest new statement that would complete it is an a-priori bound, from the delayed law, on the two integrals in item 2 (or on $\Xi$ and $\mathcal V/\Theta$) below the stated threshold.
5. **Relation to $\Lambda$ and $C_0$ (derived, exact).** $\oint\tau_0\,dt=G_0+C_0$ with $\tau_0$ the torque of the straight comparison rows and $G_0=\oint\mu^0J\,dt$; and $\Lambda+\tilde B=M_+-M_{\rm rel}-B_S-R_M+(G_0-\Theta)+T_1+T_3$ (Proposition C.5). No separate bound or sign for $\Lambda$ is obtained or needed.

**Claim grade.** Items 1 to 3 and 5 are hand derivations of one session. The [Codex review](saturday-common-motion-period-comparison-codex-review-2026-10-12.md) reconstructs Theorem C.1, every sign and factor of Theorem C.2, the three remainder bounds, the direction of each inequality in Theorem C.3 and Corollary C.4, and Proposition C.5 separately, audits the table in exact fractions, and requested the three corrections CM1 to CM3 incorporated here. A session instrument that passed known cases first checked the kinematic identity behind item 1 and its algebra on prescribed paths, and evaluated the constants in exact rational arithmetic. Prescribed paths do not obey the equation; the bounds of items 1 to 3 use the rows of a solution and are not tested. Nothing is measured on solutions.

Everything is for the unchanged Master Equation, planar motion, opposite polarity, unit reduced coupling, $c_f=1$, complete histories, positive separation and rigid repetition. No mirror symmetry, fixed $r/J$, external driver, moving-frame invariance or conservation law is assumed, and no sign is taken from Proposition K.

## 1. Setting, sources and reading

This is the last stage of the [continuation round](../../../../op/agent-chats/2026-10-12-saturday-lattice-and-period-averages/chat.md): the comparison of the common-motion contribution with the gain, with direct treatment of $C_0$ permitted.

**Reading (2026-10-12), with its order.** At 19:25Z, on release: the digests of the accepted non-mirror note and review, the curved-window note and review, the straight-term note and review, the breathing note and review, the manuscript, the queue, the priorities and the lane README were recomputed; all equal the values at their full readings earlier the same day (18:41Z to 19:01Z), except the breathing review, whose earlier sections had been read in full at 19:16Z and whose final disposition, which was new, was read at 19:26Z. The corrected breathing note (`d43d49a9…af05`) was read from the file: its Result and Sections 1 to 5 at 19:26Z, and its remaining sections (tried approaches, instrument, limits, falsifiers, propagation) at 19:28Z. *Order, stated exactly:* the identity of Theorem C.1 was worked out in thought between those two readings; nothing was written and nothing was run until after 19:28Z. Parts of the manuscript's Section 9, of the queue entry and of the priorities paragraph were displayed again at 19:25Z; their files' digests are unchanged since the full readings. Nothing of the Master Equation source beyond the passages read earlier the same day is used. The queue and priorities still list $\Lambda$ as unassigned; they were not edited.

**Notation** is that of the [straight-term note](saturday-straight-strength-period-average-2026-10-12.md) and the [breathing note](saturday-combined-breathing-period-average-2026-10-12.md), which rest on the [accepted non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md) and the [curved-window note](saturday-curved-window-strength-difference-2026-10-11.md): $u_i$, $b_i$ the members' velocity components along and across the axis; $q_i=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_i$; $S_i=\sqrt{1-b_i^2}$; $\Omega=J/r^2$; $J=r\,(b_1-b_2)>0$; $P_\perp=b_1+b_2$; $x=r/J$; $d=J/r$; $\varphi_2(b)=(1-b^2)^{-3/2}-1$. $a_i$ are the row strengths, $\beta_i$ the aberration angles, $\epsilon_i$ the allowances of the accepted note, $a_i^0$ the strengths of the straight comparison rows, $r^2a_1^0=1-u_2/S_2$, $r^2a_2^0=1+u_1/S_1$, and $c(w)$ the constant of the curved-window theorem. $\Theta=\oint\Omega\,dt$ is the angle turned by the axis in a period; $\oint f\,d\vartheta$ means $\oint f\,\Omega\,dt$. New here:

$$
\tau_0=r\,(a_2^0b_1-a_1^0b_2)=\frac1r\Bigl[b_1\Bigl(1+\frac{u_1}{S_1}\Bigr)-b_2\Bigl(1-\frac{u_2}{S_2}\Bigr)\Bigr],\qquad\sigma(b)=1-\sqrt{1-b^2},
$$

the torque the straight comparison rows would exert, and an even convex function with $\sigma''=(1-b^2)^{-3/2}=1+\varphi_2$. All integrals are over one period.

## 2. The straight-row torque over a period

**Theorem C.1 (derived, kinematic).** For any rigidly repeating twice continuously differentiable planar pair with $r>0$, speeds below one and $J>0$,

$$
\oint\tau_0\,dt=\Theta+\oint\frac rJ\Bigl(\frac{b_1q_1}{S_1}+\frac{b_2q_2}{S_2}\Bigr)dt-\oint(S_1+S_2)\,\frac{d}{dt}\Bigl(\frac rJ\Bigr)dt .
$$

*Proof.* $\tau_0=(b_1-b_2)/r+(u_1b_1/S_1+u_2b_2/S_2)/r=\Omega+\frac rJ\,\Omega\,(u_1b_1/S_1+u_2b_2/S_2)$. By the kinematic relation $\dot b_i=q_i-\Omega u_i$ (Lemma Z.1 of the straight-term note), $\dot S_i=-(b_i/S_i)\dot b_i=-(b_i/S_i)q_i+\Omega\,u_ib_i/S_i$, so $\Omega\,u_ib_i/S_i=(b_i/S_i)q_i+\dot S_i$. Integrate, and integrate $\frac rJ\dot S_i$ by parts; the boundary term is periodic. $\qquad\blacksquare$

This is the device of the straight-term note applied to the whole straight-row torque at once instead of to its fourth-order part.

**Theorem C.2 (exact balance on solutions; derived).** Let the pair be a rigidly repeating solution in the setting of the accepted notes: complete planar histories, positive separation, both speeds below wake speed with the uniform margin that rigid repetition gives, so that each member receives exactly one partner row with positive strength and none from its own path; and let $J>0$. ($J>0$ alone would not define the rows or the $S_i$.) Then

$$
M_+-B_S=\Theta+M_{\rm rel}+R,
$$

$$
M_+=\oint\frac{r\,P_\perp^2}{4J}\Bigl(\frac{a_1}{S_1}+\frac{a_2}{S_2}\Bigr)dt,\qquad
M_{\rm rel}=\oint\frac{J}{4r}\Bigl(\frac{a_1}{S_1}+\frac{a_2}{S_2}\Bigr)dt,\qquad
B_S=\oint W_S\,\frac{dx}{dt}\,dt,\quad W_S=\sigma(b_1)+\sigma(b_2)-2\sigma\Bigl(\frac d2\Bigr),
$$

$$
R=R_M+\oint r\,e_J\,dt+\oint r\,\bigl[(a_2-a_2^0)\,b_1-(a_1-a_1^0)\,b_2\bigr]dt,\qquad
R_M=\oint\frac rJ\Bigl[\frac{b_1}{S_1}\,a_1\,(\sin\beta_1+b_2)-\frac{b_2}{S_2}\,a_2\,(\sin\beta_2-b_1)\Bigr]dt .
$$

$M_+$ and $M_{\rm rel}$ are nonnegative, and $\tfrac14P_\perp^2\le W_S\le\tfrac14(1+\varphi_2(w_t))P_\perp^2$ with $w_t=\max\{\lvert b_1\rvert,\lvert b_2\rvert\}$.

*Proof.* On a solution $q_1=a_1\sin\beta_1$ and $q_2=-a_2\sin\beta_2$ (accepted Proposition D). Write $\sin\beta_1=-b_2+(\sin\beta_1+b_2)$ and $\sin\beta_2=b_1+(\sin\beta_2-b_1)$. Then

$$
\frac{b_1q_1}{S_1}+\frac{b_2q_2}{S_2}=-b_1b_2\Bigl(\frac{a_1}{S_1}+\frac{a_2}{S_2}\Bigr)+\frac{b_1}{S_1}a_1(\sin\beta_1+b_2)-\frac{b_2}{S_2}a_2(\sin\beta_2-b_1),
$$

and $b_1b_2=\tfrac14[(b_1+b_2)^2-(b_1-b_2)^2]=\tfrac14(P_\perp^2-J^2/r^2)$. Multiplying by $r/J$ and integrating gives $\oint\frac rJ(\cdots)\,dt=-M_++M_{\rm rel}+R_M$. Next, $-\oint(S_1+S_2)\,dx=\oint(\sigma(b_1)+\sigma(b_2))\,dx$ because $\oint dx=0$, and subtracting the null weight $2\sigma(d/2)$ (Lemma B.1 of the breathing note) gives $B_S$. So Theorem C.1 reads $\oint\tau_0\,dt=\Theta-M_++M_{\rm rel}+R_M+B_S$. Finally the actual rate is $\dot J=r\,(a_1\sin\beta_1+a_2\sin\beta_2)$, and

$$
\dot J-\tau_0=r\,[a_1(\sin\beta_1+b_2)+a_2(\sin\beta_2-b_1)]+r\,[(a_2-a_2^0)b_1-(a_1-a_1^0)b_2]=r\,e_J+r\,[(a_2-a_2^0)b_1-(a_1-a_1^0)b_2],
$$

with $e_J$ as in the accepted note. Since $J$ is periodic, $0=\oint\dot J\,dt$, which is the stated balance. For $W_S$: with $m=\tfrac12P_\perp$ and $c=\tfrac d2$, $b_1=c+m$ and $b_2=m-c$, and $\sigma$ is even, so $W_S=\sigma(c+m)+\sigma(c-m)-2\sigma(c)=m^2\int_{-1}^1(1-\lvert s\rvert)\,\sigma''(c+sm)\,ds$, and $1\le\sigma''\le1+\varphi_2(w_t)$ on the segment between $-b_2$ and $b_1$. $\qquad\blacksquare$

*Reading.* The gain $\Theta$ is what the first-order term $J/r^2$ of the rate contributes. $M_{\rm rel}$ is a further gain, positive and of relative size about $1/(2r)$. Against them stand a loss $M_+$, which is never negative and exists only when the pair has a velocity sum across its axis, and a breathing integral with a nonnegative weight of the same origin. $R$ is small when $J_{\min}$ is large. The loss $M_+$ is the exact form of the accepted note's formal one-turn coefficient: with a prescribed circle, a fixed common velocity $\mathbf V$ and leading row strengths, $M_+\to\oint(2V^2r/J^2)\sin^2\alpha\,d\vartheta=2\pi V^2r/J^2$, the number found there (a comparison in that auxiliary model only).

## 3. Bounds, the necessary condition and the exclusion

**Proposition C.3a (remainders; derived).** For a rigidly repeating solution with both speeds at most $w<\tfrac13$ at all times and $J\ge J_{\min}>0$,

$$
\lvert R\rvert\le\eta\,\Theta,\qquad\eta=\frac{e_1(w)}{J_{\min}}+\frac{e_2(w)}{J_{\min}^2},\qquad e_1=c_3(w)+w\,c(w),\quad e_2=\frac{w\,c_3(w)}{\sqrt{1-w^2}},\quad c_3=\frac{(1+w)^3}{(1-3w)^2}.
$$

*Proof.* Accepted bounds: $\lvert\sin\beta_1+b_2\rvert\le\epsilon_2$, $\lvert\sin\beta_2-b_1\rvert\le\epsilon_1$, $r^3(a_2\epsilon_1+a_1\epsilon_2)\le c_3$, $\lvert a_i-a_i^0\rvert\le c(w)/(2r^3)$, $\lvert b_i\rvert\le w$, $\lvert b_i\rvert/S_i\le w/\sqrt{1-w^2}$. So the integrand of $R_M$ is at most $\frac rJ\cdot\frac{w}{\sqrt{1-w^2}}\cdot\frac{c_3}{r^3}$, and $\oint dt/(Jr^2)=\oint d\vartheta/J^2\le\Theta/J_{\min}^2$. $\lvert r\,e_J\rvert\le c_3/r^2$ and $\lvert r[(a_2-a_2^0)b_1-(a_1-a_1^0)b_2]\rvert\le w\,c(w)/r^2$, and $\oint dt/r^2=\oint d\vartheta/J\le\Theta/J_{\min}$. $\qquad\blacksquare$

**Theorem C.3 (necessary condition; derived).** Under the same hypotheses,

$$
(1-\eta)\,\Theta\ \le\ M_+-B_S\ \le\ \kappa_M(w)\oint P_\perp^2\,\frac r{J^2}\,d\vartheta+\kappa_S(w)\oint P_\perp^2\,\Bigl\lvert\frac{dx}{dt}\Bigr\rvert dt\ \le\ P_{\perp\max}^2\,\bigl[\kappa_M(w)\,\Xi\,\Theta+\kappa_S(w)\,\mathcal V\bigr],
$$

$$
\kappa_M(w)=\frac{(1+w)^2}{2\,(1-w)\sqrt{1-w^2}},\qquad\kappa_S(w)=\frac{1}{4\,(1-w^2)^{3/2}},\qquad P_{\perp\max}=\sup\lvert P_\perp\rvert\le2w .
$$

*Proof.* The left inequality is Theorem C.2 with $M_{\rm rel}\ge0$ and Proposition C.3a. For the right: $a_i\le a_+=(1+w)^2/((1-w)r^2)$ and $S_i\ge\sqrt{1-w^2}$ give $\frac{r}{4J}(a_1/S_1+a_2/S_2)\le\kappa_M/(rJ)$, and $dt/(rJ)=(r/J^2)\,d\vartheta$; and $-B_S\le\lvert B_S\rvert\le\oint W_S\lvert\dot x\rvert\,dt$ with $W_S\le\kappa_SP_\perp^2$. $\qquad\blacksquare$

**Corollary C.4 (exclusion; derived).** No rigidly repeating solution of the setting of Theorem C.2 with both speeds at most $w<\tfrac13$ over the whole past and $J\ge J_{\min}>0$ satisfies

$$
P_{\perp\max}^2\Bigl[\kappa_M(w)\,\Xi+\kappa_S(w)\,\frac{\mathcal V}{\Theta}\Bigr]<1-\eta(w,J_{\min}).
$$

Since $P_{\perp\max}\le2w$, none satisfies $4w^2[\kappa_M\Xi+\kappa_S\mathcal V/\Theta]<1-\eta$. The inequality can hold only when $\eta<1$; for $\eta\ge1$ the class is empty. In particular, when $\eta<1$: $P_\perp$ does not vanish identically; and $\sup\lvert P_\perp\rvert^2\ge(1-\eta)/(\kappa_M\Xi+\kappa_S\mathcal V/\Theta)$. With the breathing note's Proposition B.3, $\mathcal V/\Theta\le R_{\rm var}/(J_{\min}\Theta)+\Xi\,[c_1+c_2P_{\perp\max}X+c_3/J_{\min}]$, which expresses the class through the radial travel per radian, $\Xi$, $X=\sup r/J$ and $J_{\min}$.

*Proof.* Theorem C.3, divided by $\Theta>0$. $\qquad\blacksquare$

**Values** (exact rational arithmetic with a rational enclosure of the square root, rounded up; $c(w)$ is the accepted declared bound of the curved-window note):

| $w$ | $\kappa_M\le$ | $\kappa_S\le$ | $4w^2\kappa_M\le$ | $4w^2\kappa_S\le$ | $e_1\le$ | $e_2\le$ |
| --- | --- | --- | --- | --- | --- | --- |
| $1/100$ | $0.5153$ | $0.2501$ | $2.061\times10^{-4}$ | $1.001\times10^{-4}$ | $1.14$ | $0.01096$ |
| $1/50$ | $0.531$ | $0.2502$ | $8.495\times10^{-4}$ | $4.003\times10^{-4}$ | $1.301$ | $0.02403$ |
| $1/20$ | $0.581$ | $0.251$ | $5.81\times10^{-3}$ | $2.51\times10^{-3}$ | $1.949$ | $0.08022$ |
| $1/10$ | $0.6757$ | $0.2538$ | $0.02703$ | $0.01016$ | $3.989$ | $0.2731$ |
| $1/8$ | $0.729$ | $0.256$ | $0.04556$ | $0.016$ | $5.872$ | $0.4593$ |
| $7/50$ | $0.7631$ | $0.2576$ | $0.05983$ | $0.0202$ | $7.497$ | $0.6228$ |
| $1/5$ | $0.9186$ | $0.2658$ | $0.147$ | $0.04253$ | $22.87$ | $2.205$ |
| $1/4$ | $1.076$ | $0.2755$ | $0.269$ | $0.06886$ | $79.33$ | $8.069$ |
| $3/10$ | $1.266$ | $0.288$ | $0.4556$ | $0.1037$ | $669.2$ | $69.1$ |

**What the class is.** The inequality compares the geometry of the solution with a threshold of order $1/(4w^2)$. With no variation of $r/J$ and $\eta$ neglected, existence requires $\Xi=\sup r/J^2\ge1/(4w^2\kappa_M)$: at least about $37$ for $w=\tfrac1{10}$, $17$ for $w=\tfrac7{50}$, $6.8$ for $w=\tfrac15$, $2.2$ for $w=\tfrac3{10}$ (float quotients of the table, orientation only). The leading no-delay value for a circular relative orbit is $\tfrac12$. So a repeating solution in the speed class must violate the joint inequality: through $r/J^2$ far above that value somewhere, through a large variation of $r/J$ per radian, through an angular momentum small enough that $\eta$ is not small, or through a combination of these. The accepted note described the same boundary qualitatively, as states whose common speed is comparable with the square root of their relative speed; here it has constants.

**What is and is not supplied.** The constants and $P_{\perp\max}\le2w$ are supplied. $\Xi$, $\mathcal V$, $\Theta$, $J_{\min}$ are properties of the solution. Rigid repetition with $J>0$ makes $\Xi$ and $\Theta$ finite and positive and $J_{\min}$ positive; $\mathcal V$ is finite and nonnegative and can be zero. They are not bounded further by the equations in this note or in the accepted ones. The corollary is therefore an exclusion of a class of hypothetical solutions, defined by an inequality that can be checked on any candidate. It is not a proof that no rigidly repeating solution exists. The class may be empty for other reasons, and a solution outside it is not shown to exist.

## 4. Relation to $C_0$, $\Lambda$ and the earlier forms

**Proposition C.5 (derived, exact).** With $\mu^0=\tfrac12(a_1^0+a_2^0)$, $\delta^0=\tfrac12(a_2^0-a_1^0)$ and $G_0=\oint\mu^0J\,dt$: $\tau_0=\mu^0J+r\,\delta^0P_\perp$, so $\oint\tau_0\,dt=G_0+C_0$, and

$$
C_0=\Theta-G_0-M_++M_{\rm rel}+B_S+R_M,\qquad
\Lambda+\tilde B=M_+-M_{\rm rel}-B_S-R_M+(G_0-\Theta)+T_1+T_3 .
$$

*Proof.* $r\,(a_2^0b_1-a_1^0b_2)=r\mu^0(b_1-b_2)+r\delta^0(b_1+b_2)$ and $r\,(b_1-b_2)=J$. The first display is Theorem C.1 with the decomposition in the proof of Theorem C.2; the second is the breathing note's Theorem B.5, $\Lambda+\tilde B=-C_0+T_1+T_3$. $\qquad\blacksquare$

So the accepted balance $\lvert G+C_0\rvert\le(\rho_Z+\rho_e)G/J_{\min}$ and the balance of Theorem C.2 are the same statement, $\oint\dot J\,dt=0$, written with different groupings. The earlier grouping kept the row strengths in a gain $G=\oint\mu J\,dt$ and left $C_0$ without structure. The present one moves everything except $\Theta$ to the other side and finds that what remains is a nonnegative loss, a nonnegative-weight breathing integral and small remainders. $\Lambda$ is not bounded separately: by the second display it equals $M_+$ minus breathing integrals and bounded terms, and nothing here needs it alone. No sign is claimed for $C_0$, $\Lambda$, $\tilde B$ or $B_S$.

## 5. What was tried, and where this stops

- *Bounding $\Lambda$ directly from its definition.* With the accepted bounds its integrand is at most a multiple of $w/(rJ)$, of first order in speed, which loses the structure and gives nothing useful. Not pursued.
- *Keeping the accepted split $\Lambda+\tilde B$.* The breathing weight there has no sign ($Q=P_\parallel^2-P_\perp^2$). Regrouping through $\tau_0$ replaces it by the nonnegative $W_S$ and makes the acceleration term the nonnegative $M_+$. This is the route taken.
- *A sign for $B_S$.* Its weight is nonnegative but $d(r/J)$ changes sign over a period, so the weight's sign does not sign the integral. The breathing note's exact prescribed family does not bear on this: it has $P_\perp=0$, so $W_S=0$ and $B_S=0$ there for both signs of its parameter, and it is used here only as a control with zero loss. The [Codex review](saturday-common-motion-period-comparison-codex-review-2026-10-12.md#the-old-prescribed-family-does-not-test-the-new-breathing-sign) supplies a separate exact prescribed family for $B_S$, repeated here by hand: $r=1$, $J(t)=1/[10(1+\tfrac1{10}\cos t)]$, an axis turning at the rate $J$, members at $\mathbf C\pm\tfrac12\hat{\mathbf r}$ with $\dot{\mathbf C}=m_\epsilon\hat{\boldsymbol\theta}$, $m_\epsilon(t)=\tfrac1{100}\sqrt{1+\epsilon\sin t}$, $\epsilon=\pm\tfrac1{10}$. Then $u_1=u_2=0$, $b_{1,2}=m_\epsilon\pm\tfrac12J$, both speeds are below $0.07$, the pair repeats rigidly, $x=10+\cos t$ and $c=\tfrac12J$ is even about $t=\pi$, so $B_S=-\int_0^\pi\sin t\,[D_\sigma(c(t),m_\epsilon(t))-D_\sigma(c(t),m_\epsilon(2\pi-t))]\,dt$ with $D_\sigma(c,m)=\sigma(c+m)+\sigma(c-m)-2\sigma(c)$. Since $\partial_mD_\sigma=\sigma'(c+m)-\sigma'(c-m)>0$ for $m>0$ by strict convexity, and $m_\epsilon(t)>m_\epsilon(2\pi-t)$ on $(0,\pi)$ exactly when $\epsilon>0$, $B_S<0$ for $\epsilon=+\tfrac1{10}$ and $B_S>0$ for $\epsilon=-\tfrac1{10}$. This is derived, for prescribed paths: it is the review's construction, it is not a solution of the equation, and it shows only that kinematics permits either sign of $B_S$. No sign of $B_S$ on solutions is claimed.
- *Removing the conditions.* An a-priori bound on $\oint P_\perp^2(r/J^2)\,d\vartheta$ and on $\oint P_\perp^2\lvert dx\rvert$ from the delayed law would turn Corollary C.4 into an unconditional exclusion in the speed class. I derived none. In particular I have no bound on $\sup r/J^2$: the radial equation was not shown to prevent $r/J^2$ from being large near a far turning point. This is unresolved on this route; it is not shown impossible, and it is not shown that a solution with large $\Xi$ exists.

**The smallest new statement that would suffice.** For rigidly repeating solutions with whole-past speed bound $w<\tfrac13$ and $J\ge J_{\min}$: $\kappa_M\oint P_\perp^2(r/J^2)\,d\vartheta+\kappa_S\oint P_\perp^2\lvert dx\rvert<(1-\eta)\,\Theta$. A sufficient form is $\Xi<(1-\eta)/(4w^2\kappa_M)-(\kappa_S/\kappa_M)\,\mathcal V/\Theta$.

## 6. Instrument, evidence and the reference boundary

[`common_motion_balance_check.py`](../evidence/saturday-common-motion-period-comparison-2026-10-12/common_motion_balance_check.py), described in the [evidence README](../evidence/saturday-common-motion-period-comparison-2026-10-12/README.md), uses the Python standard library only and imports the frozen instrument of the straight-term note, unchanged, for its prescribed paths and helpers. It ran once, through the owned-compute supervisor, in $1.35$ seconds with exit code $0$; every known case passed at the first attempt. Its paths are prescribed and do not obey the equation.

**Known cases, run first; a failure stops the run.** The algebra $\tau_0=r(a_2^0b_1-a_1^0b_2)$ and the split into the $P_\perp^2$ and $J^2/r^2$ parts, in exact fractions at two states with rational square roots (the first giving $\tau_0=\tfrac38$ by hand); $\sigma(\tfrac35)=\tfrac15$ and $\sigma''=(1-b^2)^{-3/2}$ by second differences; the trapezoid rule on $\oint\cos^2=\pi$ and $\oint dt/(1+\tfrac1{10}\cos t)=2\pi/\sqrt{0.99}$; drift plus rigid rotation, on which $\oint\tau_0=\Theta=2\pi$ and the other terms vanish; and the exact prescribed family of the breathing review (velocity sum along the axis, $r=1$), on which $\tau_0=J$ exactly, so $\oint\tau_0=\Theta=0.2\pi/\sqrt{0.99}$, the loss term vanishes and the acceleration term cancels the $S$ term.

**Targets, what passed (floating point, with the stated thresholds; no certified rounding enclosure).** On 40 prescribed breathing pairs with 4096 quadrature points: Theorem C.1 held to $4.6\times10^{-15}$ of the sum of the term sizes (threshold $10^{-9}$); the full decomposition $\oint\tau_0=\Theta-M_+^0+M_{\rm rel}^0+B_S+\oint\frac rJ\sum(b_i/S_i)(q_i-q_i^0)$, with the straight strengths $a_i^0$ and $q_1^0=-a_1^0b_2$, $q_2^0=-a_2^0b_1$ in place of rows, held to $2.7\times10^{-15}$ (threshold $10^{-9}$); $\oint(2-S_1-S_2)\,dx=\oint W_S\,dx$ to $2.3\times10^{-16}$ of the variation (threshold $10^{-11}$). At 800 sampled states: the two algebraic identities held to $2.2\times10^{-14}$ and $7.1\times10^{-16}$ relative (threshold $10^{-11}$), and the bounds on $W_S$, with an absolute allowance of $10^{-14}$ and $\varphi_2$ at the state's own larger transverse speed, showed an excess of $0$. The quadrature value of $\lvert B_S\rvert/(\kappa_S\oint P_\perp^2\lvert dx\rvert)$ was at most $0.564$ against an acceptance of at most $1+10^{-12}$, with $\kappa_S$ at the largest transverse speed among 1024 sampled instants, which may be below the true largest by an amount not bounded here.

**What this can and cannot establish.** It checks Theorem C.1 and the algebra of Theorem C.2 on samples, as kinematics, and that signs and factors were transcribed correctly. It tests none of Proposition C.3a, Theorem C.3 or Corollary C.4, which use the rows of a solution and the accepted solution-only bounds. The ranges of $M_+^0/\Theta$ printed in the output are properties of the prescribed paths with formal straight strengths and say nothing about solutions. Paths are admitted by a filter sampled at 400 instants. The table is exact rational arithmetic. Agreement of a same-session instrument with the hand derivation is not independent evidence; the independent elements are the hand values, the classical integrals and the two hand-known families.

## 7. Limits

Planar motion, opposite polarity, unit reduced coupling, $c_f=1$, twice continuously differentiable complete paths, positive separation, rigid repetition, $J$ without zeros and taken positive. Theorem C.1 is kinematic. Theorem C.2 needs a solution. Theorem C.2 needs the ordinary setting below wake speed, with one partner row of positive strength for each member and no own-path row. Proposition C.3a, Theorem C.3 and Corollary C.4 need the speed bound $w<\tfrac13$ over the whole past, through the accepted bounds and the curved-window theorem. Proposition C.3a and Theorem C.3 hold for every value of $\eta$; when $\eta\ge1$ the left side of Theorem C.3 is not positive and the strict exclusion class of Corollary C.4 is empty, so nothing is excluded for small $J_{\min}$. The class of Corollary C.4 may contain no history for other reasons. Nothing is claimed for histories that repeat only up to a rotation about a drifting centre, for $J$ with zeros, or for speeds of $\tfrac13$ or more. No repeating history was constructed or searched for, no solution was integrated, and no accepted file was changed.

## 8. Falsifiers

- A rigidly repeating pair of paths, prescribed or not, with $r>0$, speeds below one, $J>0$ and $\oint\tau_0\,dt$ different from the right side of Theorem C.1 refutes it.
- A rigidly repeating solution with $J>0$ on which $M_+-B_S\ne\Theta+M_{\rm rel}+R$ refutes Theorem C.2; so does a state at which $W_S$ lies outside $[\tfrac14P_\perp^2,\tfrac14(1+\varphi_2(w_t))P_\perp^2]$.
- A rigidly repeating solution in the speed class with $\lvert R\rvert>\eta\,\Theta$ refutes Proposition C.3a or the accepted bounds it uses.
- A rigidly repeating solution with both speeds at most $w<\tfrac13$ over the whole past, $J\ge J_{\min}>0$ and $P_{\perp\max}^2[\kappa_M\Xi+\kappa_S\mathcal V/\Theta]<1-\eta$ refutes Corollary C.4. A prescribed path with these properties refutes nothing.
- An exact evaluation above a table entry refutes that entry.

## 9. What remains, and proposed propagation (not applied)

Open: an a-priori bound on $\sup r/J^2$, or on the two integrals of Theorem C.3, for solutions in the speed class; the same for the variation of $r/J$ (radial travel); small $J_{\min}$, where $\eta\ge1$; constant $J$ outside the class of Theorem F (M1); non-mirror periodicity in general. No shared tracker, manuscript or queue was edited. Suggested text for the coordinator, for the periodicity queue entry: "Common-motion comparison (Saturday continuation round, 2026-10-12, derived): for a rigidly repeating solution with $J>0$, $M_+-B_S=\Theta+M_{\rm rel}+R$ exactly, where $M_+=\oint(rP_\perp^2/(4J))(a_1/S_1+a_2/S_2)\,dt\ge0$, $B_S$ is a breathing integral with weight between $P_\perp^2/4$ and $(1+\varphi_2)P_\perp^2/4$, and, under a whole-past speed bound $w<1/3$ and $J\ge J_{\min}$, $\lvert R\rvert\le(e_1/J_{\min}+e_2/J_{\min}^2)\Theta$. Hence no such solution has $4w^2[\kappa_M\sup(r/J^2)+\kappa_S\mathcal V/\Theta]<1-\eta$; at $w=0.1$ a conservative sufficient test, with upward-rounded constants, is $0.02703\sup(r/J^2)+0.01016\,\mathcal V/\Theta<1-3.989/J_{\min}-0.2731/J_{\min}^2$. The class is empty when $\eta\ge1$ (small $J_{\min}$). This is M2 in that class only; the solutions considered are complete, below wake speed, with one partner row and no own-path row. Open: bounds from the delayed law on $\sup r/J^2$ and on the variation of $r/J$, and the case of small $J_{\min}$."
