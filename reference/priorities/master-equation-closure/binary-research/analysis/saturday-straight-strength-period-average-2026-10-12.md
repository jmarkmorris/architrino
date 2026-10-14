# The straight strength-difference term over a period: an exact reduction to a breathing term (2026-10-12)

## Result

**In words.** For a pair of opposite architrinos that repeats rigidly, the period balance of the relative angular momentum contains a term $Z_0$ built from the two members' present velocities alone. Until now it was bounded only by its size, and that bound grows with the width of the pair. This note shows more about its structure. Almost all of its integrand is an exact rate of change, and what survives over a period is a *breathing term*, of the same form as the term $B$ already in the balance, plus two remainders that are bounded against the first-order gain. The bound on one of them depends on the pair's geometry through $\sup r/J^2$, a quantity of the solution that is not evaluated here, in place of the earlier $r_{\max}/J_{\min}$; the other depends on $1/J_{\min}$.

Terms. $u_i$ and $b_i$ are member $i$'s velocity along and across the pair's axis. $J$ is the relative angular momentum, $r$ the separation. The *first-order gain* is $G=\oint\mu J\,dt>0$. A *breathing term* is a period integral of some bounded weight against the rate of change of $r/J$; it vanishes when $r/J$ does not change over the period.

1. **Exact identity (derived).** For every rigidly repeating solution with $J$ of one sign,
   $$
   Z_0=B_\Phi+T_1+T_3,\qquad B_\Phi=\oint\bigl[\Phi(b_1)+\Phi(b_2)\bigr]\frac{d}{dt}\Bigl(\frac rJ\Bigr)dt,
   $$
   with $\Phi(b)=1-\sqrt{1-b^2}-\tfrac12b^2=b^4/(2(1+\sqrt{1-b^2})^2)$, and $T_1$, $T_3$ explicit integrals of the members' accelerations across the axis (Theorem Z). No speed bound, and no smallness, is used for the identity.
2. **The two remainders are bounded through $\sup r/J^2$ and $1/J_{\min}$ (derived).** If both speeds are at most $w<\tfrac13$ over the whole past and $J\ge J_{\min}>0$,
   $$
   \lvert T_1\rvert\le\tau_1(w)\,\Xi\,G,\qquad\lvert T_3\rvert\le\frac{\tau_3(w)}{J_{\min}}\,G,\qquad\Xi=\sup\frac r{J^2},
   $$
   with $\tau_1=2w^2g(w)(1+w)^3/(1-w)^3$, $\tau_3=w\,g(w)(1+w)^3/(1-w)^3$ and $g(w)=1/\sqrt{1-w^2}-1$. At $w=\tfrac1{10}$: $\tau_1\le1.84\times10^{-4}$, $\tau_3\le9.198\times10^{-4}$. The earlier size bound carried $r_{\max}/J_{\min}$; the bound on $T_1$ carries $\Xi=\sup r/J^2$ instead, and the bound on $T_3$ carries $1/J_{\min}$. $\Xi$ is finite for each such solution but is not bounded here: it is a property of the solution's geometry and can be large. For orientation only, and not as a bound on $\Xi$ for any solution: the leading-order no-delay relation for a circular relative orbit is $J^2\approx2r$, for which $r/J^2\approx\tfrac12$ whatever the width.
3. **The breathing part (derived).** $\lvert B_\Phi\rvert\le\Phi(w)\,\mathcal V$, where $\mathcal V$ is the total variation of $r/J$ over one period and $\Phi(w)\le1.257\times10^{-5}$ at $w=\tfrac1{10}$. Together with item 2, $\lvert Z_0\rvert/G\le\tau_1(w)\,\Xi+\tau_3(w)/J_{\min}+\Phi(w)\,\mathcal V/G$. $Z_0$ is small beside the gain when all three of these are small; little variation of $r/J$ is not enough by itself, and none of $\Xi$, $J_{\min}$, $\mathcal V/G$ is bounded here.
4. **What this does to the balance (derived).** $Z_0$ can be removed from the residual of the [curved-window note](saturday-curved-window-strength-difference-2026-10-11.md) exactly, at the price of changing the weight of the breathing term: with $\tilde B=\oint\bigl[\tfrac18Q-\Phi(b_1)-\Phi(b_2)\bigr]\tfrac{d}{dt}(r/J)\,dt$,
   $$
   \bigl\lvert\Lambda+\tilde B-G\bigr\rvert\le\Bigl[\frac{\rho_Z(w)+\rho_e(w)+\tau_3(w)}{J_{\min}}+\tau_1(w)\,\Xi\Bigr]G .
   $$
   Two unknown terms remain, $\Lambda$ and one breathing term, in place of three.
5. **Not achieved.** $Z_0$ is not bounded against the gain in general. The one size estimate tried for the breathing part, a pointwise bound on the rate of $r/J$, brings back the factor $r/J$ and so does not control it (Section 6). That is where this attempt stops; it does not show that no other estimate, or no cancellation supplied by the equations, could. The breathing term (S2), the size and sign of $\Lambda$ (S3), the missing proposition M2 and non-mirror periodicity in general remain open. Nothing here excludes a repeating history.

**Claim grade.** Items 1 to 4 are hand derivations of one session. The [Codex review](saturday-straight-strength-period-average-codex-review-2026-10-12.md) reconstructs Lemma Z.2, the identity, its integration by parts, the constants and the combined residual separately, audits the table in exact fractions, and requested the four corrections ZR1 to ZR4 of scope, provenance and coverage incorporated here. A session instrument that passed known cases first checked the identity pointwise and over a period on prescribed paths, where it is a statement of kinematics, and evaluated the constants in exact rational arithmetic. Prescribed paths do not obey the equation; nothing is measured on solutions.

Everything is for the unchanged Master Equation, planar motion, opposite polarity, unit reduced coupling, $c_f=1$, complete histories and positive separation. No mirror symmetry, fixed separation, constant $J$, exterior or prescribed circle is assumed.

## 1. Setting, sources and reading

This is phase 2 of the [continuation round](../../../../op/agent-chats/2026-10-12-saturday-lattice-and-period-averages/chat.md); only $Z_0$ is released. The setting and notation are those of the [accepted non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md) and the [curved-window note](saturday-curved-window-strength-difference-2026-10-11.md).

**Reading for this note (2026-10-12).** Read in full on this date, before this note was returned: the accepted non-mirror note (SHA-256 `874fb446…3ad8`), including Propositions D, H, I and K, the bounds (B1) to (B5) and the M2 continuation; its [Codex review](saturday-nonmirror-periodicity-codex-review-2026-10-11.md) through the A1 to A3 findings and the final M2 disposition, with lines longer than 1,800 characters seen to that length; the curved-window note (SHA-256 `5f7ca156…da36`); and its [Codex review](saturday-curved-window-strength-difference-codex-review-2026-10-11.md) through its final disposition. Also read: the binary manuscript's Section 9 in full; of the [queued question](../work-queue.md#decide-whether-two-members-below-wake-speed-can-have-a-periodic-history), the two paragraphs on accepted progress and remaining obligation in full and the older entry to 2,200 characters; of the priorities, the 2026-10-11 paragraph to 500 characters; the lane README was read in part on 2026-10-11 and has the same digest today. Of the Master Equation source (SHA-256 `a3fa7047…5267`, unchanged since 2026-10-11), the per-hit acceleration, the total-acceleration section, the Heaviside convention and the scaling passage were read earlier on this date for the lattice task, and the transmitter-side factor and direction-and-sign passages on 2026-10-11 from the same bytes. The order was: the derivation and the instrument first, from the statements of the two accepted notes as read in full on 2026-10-11 from the same bytes, then the four full rereads, which changed nothing in the derivation. The governance files were checked by digest at the release (protocol `9f9856bb…`, read in full earlier on this date). The queue and priorities still list $Z_0$ as unassigned; they were not edited.

**Additional reading after the review (2026-10-12, 18:55Z; finding ZR4).** The paragraph above records the coverage and the order as they were when the note was first returned, and is left as it was. Completed afterwards, without truncation: the whole current periodicity entry of the queue (no line of it exceeds the 2,200 characters shown earlier, so that reading had in fact been complete), the 2026-10-11 paragraph of the priorities in full, and the lane README in full. The review notes that no line of the non-mirror review exceeds 1,800 characters, so that display limit had cut nothing either. *Consequence:* none for the mathematics. The priorities paragraph and the queue entry state the same residual, $Z_0$, $B$ and $\Lambda$ unresolved, that this note starts from; the README's boundaries are unaffected. *On order:* the release asked for the live sources to be read before the derivation; here the derivation and the run came first and the full rereads second. For the next stage the reading comes first.

**Notation.** $\mathbf r=\mathbf x_1-\mathbf x_2$, $r=\lvert\mathbf r\rvert$, $\hat{\mathbf r}=\mathbf r/r$, $\hat{\boldsymbol\theta}$ its counterclockwise perpendicular, $\vartheta$ the angle of $\hat{\mathbf r}$ and $\Omega=\dot\vartheta$. For member $i$: $u_i=\hat{\mathbf r}\cdot\mathbf v_i$, $b_i=\hat{\boldsymbol\theta}\cdot\mathbf v_i$ (the earlier notes' $v_{i\parallel}$, $v_{i\perp}$), and $q_i=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_i$, the acceleration across the axis. Then $\dot r=u_1-u_2$, $J=r\,(b_1-b_2)=r^2\Omega$, $P_\parallel=u_1+u_2$, $P_\perp=b_1+b_2$, $Q=P_\parallel^2-P_\perp^2$. On a solution, with $a_i$ the row strengths and $\beta_i$ the aberration angles of the accepted note, $q_1=a_1\sin\beta_1$ and $q_2=-a_2\sin\beta_2$ (its Proposition D). Three functions of one variable on $\lvert b\rvert<1$:

$$
g(b)=\frac1{\sqrt{1-b^2}}-1,\qquad\Phi(b)=1-\sqrt{1-b^2}-\frac{b^2}2,\qquad\Gamma(b)=\arcsin b-b,
$$

so that $\Phi'(b)=b\,g(b)$ and $\Gamma'(b)=g(b)$. All three vanish at $0$; $g$ and $\Phi$ are even, nonnegative and increasing in $\lvert b\rvert$. With $S=\sqrt{1-b^2}$, $1-S=b^2/(1+S)$ gives the closed form $\Phi(b)=b^4/(2(1+S)^2)$, so $\Phi(b)\le b^4/2$ and $\Phi(b)=b^4/8+O(b^6)$. In this notation $\zeta_0=u_1g(b_1)+u_2g(b_2)$ and

$$
Z_0=\oint\frac{\zeta_0\,P_\perp}{2r}\,dt .
$$

*Rigidly repeating* means $\mathbf x_i(t+T)=R\,\mathbf x_i(t)+\mathbf d$ with one rotation and one vector for both members; then $u_i$, $b_i$, $r$, $J$ are periodic. All integrals are over one period.

## 2. The identity

**Lemma Z.1 (kinematics; derived).** For any twice continuously differentiable planar paths with $r>0$: $\dot b_i=q_i-\Omega\,u_i$.

*Proof.* $d\hat{\boldsymbol\theta}/dt=-\Omega\,\hat{\mathbf r}$, so $\dot b_i=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_i-\Omega\,\hat{\mathbf r}\cdot\mathbf v_i$. This is the second line of the accepted note's Proposition D before the equation is used. $\qquad\blacksquare$

**Lemma Z.2 (algebra; derived).** $\zeta_0P_\perp=2\,[u_1b_1g(b_1)+u_2b_2g(b_2)]-\dfrac Jr\,[u_1g(b_1)-u_2g(b_2)]$.

*Proof.* $b_1+b_2=2b_1-J/r=2b_2+J/r$, because $J/r=b_1-b_2$. Use the first form in the term with $u_1g(b_1)$ and the second in the term with $u_2g(b_2)$. $\qquad\blacksquare$

The point of the split is that a product $u_i\,F(b_i)$ of one member's two components, multiplied by the turning rate, is an exact rate of change up to an acceleration term, by Lemma Z.1; a mixed product $u_1F(b_2)$ is not. The relative angular momentum converts the mixed products into unmixed ones.

**Theorem Z (derived).** Let the paths be twice continuously differentiable with $r>0$, speeds below one and $J\ne0$ on an interval. Then at each instant

$$
\frac{\zeta_0P_\perp}{2r}=\frac rJ\,\bigl[b_1g(b_1)q_1+b_2g(b_2)q_2\bigr]-\frac12\bigl[g(b_1)q_1-g(b_2)q_2\bigr]-\frac rJ\,\frac{d}{dt}\bigl[\Phi(b_1)+\Phi(b_2)\bigr]+\frac12\,\frac{d}{dt}\bigl[\Gamma(b_1)-\Gamma(b_2)\bigr].
$$

If the pair is rigidly repeating and $J$ has no zero, then

$$
Z_0=T_1+B_\Phi+T_3,
$$

$$
T_1=\oint\frac rJ\,\bigl[b_1g(b_1)q_1+b_2g(b_2)q_2\bigr]dt,\qquad
B_\Phi=\oint\bigl[\Phi(b_1)+\Phi(b_2)\bigr]\frac{d}{dt}\Bigl(\frac rJ\Bigr)dt,\qquad
T_3=-\frac12\oint\bigl[g(b_1)q_1-g(b_2)q_2\bigr]dt .
$$

On a solution, $q_1=a_1\sin\beta_1$ and $q_2=-a_2\sin\beta_2$, so $T_1=\oint\frac rJ[b_1g(b_1)\,a_1\sin\beta_1-b_2g(b_2)\,a_2\sin\beta_2]\,dt$ and $T_3=-\tfrac12\oint[g(b_1)\,a_1\sin\beta_1+g(b_2)\,a_2\sin\beta_2]\,dt$.

*Proof.* Divide Lemma Z.2 by $2r$ and use $J/r^2=\Omega$: $\zeta_0P_\perp/(2r)=\frac rJ\,\Omega\,[u_1b_1g_1+u_2b_2g_2]-\tfrac12\Omega\,[u_1g_1-u_2g_2]$, with $g_i=g(b_i)$. By Lemma Z.1, $\tfrac{d}{dt}\Phi(b_i)=b_ig_i\,(q_i-\Omega u_i)$ and $\tfrac{d}{dt}\Gamma(b_i)=g_i\,(q_i-\Omega u_i)$, so $\Omega\,u_ib_ig_i=b_ig_iq_i-\tfrac{d}{dt}\Phi(b_i)$ and $\Omega\,u_ig_i=g_iq_i-\tfrac{d}{dt}\Gamma(b_i)$. Substituting gives the pointwise identity. For the period statement, $b_i$, $r$ and $J$ are periodic, so $\oint\tfrac{d}{dt}\Gamma(b_i)\,dt=0$ and $-\oint\frac rJ\tfrac{d}{dt}\Phi(b_i)\,dt=\oint\Phi(b_i)\tfrac{d}{dt}(r/J)\,dt$ by parts, the boundary term $\frac rJ\Phi(b_i)$ being periodic. The last sentence is Proposition D of the accepted note. $\qquad\blacksquare$

*What kind of statement this is.* The pointwise identity is kinematic. It holds on prescribed paths with their own accelerations across the axis, and the instrument checks it there. The equation enters only when $q_i$ is identified with the rows, and in the bounds of the next section. The identity needs $J\ne0$ but no speed bound beyond speeds below one.

*Check on a family worked by hand.* Let both members share a drift $\mathbf V$ and turn rigidly at one rate about a common centre on circles of radii $A_1$, $A_2$, on opposite sides. Then $r$ and $J$ are constant and both accelerations point along the axis, so $q_i=0$ and $T_1=B_\Phi=T_3=0$. Directly, $u_1=u_2=V\cos\alpha$ and $b_i=-V\sin\alpha\pm A_i\omega$ with $\alpha$ the angle from $\mathbf V$ to the axis, so the integrand of $Z_0$ is $\cos\alpha$ times a function of $\sin\alpha$ and integrates to zero over a turn, though it is not zero pointwise. Both sides vanish. This is the exact form of the earlier observation that at leading order the direction-dependent terms only exchange $J$ back and forth.

## 3. Bounds for the two remainders

**Proposition Z.3 (derived).** Let the solution be rigidly repeating, with both speeds at most $w<\tfrac13$ at all times and $J\ge J_{\min}>0$. Put $\Xi=\sup_t r/J^2$ and $G=\oint\mu J\,dt$. Then

$$
\lvert T_1\rvert\le\tau_1(w)\,\Xi\,G,\qquad\lvert T_3\rvert\le\frac{\tau_3(w)}{J_{\min}}\,G,\qquad
\tau_1(w)=\frac{2w^2g(w)\,(1+w)^3}{(1-w)^3},\quad\tau_3(w)=\frac{w\,g(w)\,(1+w)^3}{(1-w)^3}.
$$

*Proof.* From the accepted note: $a_i\le a_+=(1+w)^2/((1-w)r^2)$ (B2), $\lvert\sin\beta_i\rvert\le w$ (B5), and $\mu\ge(1-w)^2/((1+w)r^2)$, so that $\oint J\,r^{-2}dt\le\frac{1+w}{(1-w)^2}\,G$. Since $\lvert b_i\rvert\le w$ and $g$ is increasing in $\lvert b\rvert$, $g(b_i)\le g(w)$ and $\lvert b_ig(b_i)\rvert\le w\,g(w)$; and $\lvert q_i\rvert=a_i\lvert\sin\beta_i\rvert\le(1+w)^2w/((1-w)r^2)$. Hence the integrand of $T_1$ is at most $\frac rJ\cdot2w\,g(w)\cdot\frac{(1+w)^2w}{(1-w)r^2}=\frac{2w^2g(w)(1+w)^2}{1-w}\cdot\frac1{Jr}$, and $\frac1{Jr}=\frac r{J^2}\cdot\frac J{r^2}\le\Xi\,\frac J{r^2}$. The integrand of $T_3$ is at most $g(w)\cdot\frac{(1+w)^2w}{(1-w)r^2}$, and $\frac1{r^2}\le\frac1{J_{\min}}\frac J{r^2}$. Integrate and use the bound on $\oint Jr^{-2}dt$. $\qquad\blacksquare$

The supremum $\Xi$ is finite for every rigidly repeating solution with $J>0$, because $r$ and $J$ are continuous and periodic; it is a number belonging to the solution, like $J_{\min}$. Finite is not small: nothing here bounds $\Xi$ uniformly over solutions, and it can grow with the separation. The improvement over the earlier bound is the replacement of $r_{\max}/J_{\min}$ by $\sup r/J^2$ for $T_1$, with a separate dependence on $1/J_{\min}$ for $T_3$; it is not independence of the geometry. Since $\Xi\le r_{\max}/J_{\min}^2$, the bound on $T_1$ is never worse than $\tau_1\,r_{\max}/J_{\min}^2$, which is the earlier size bound's $\rho_0\,r_{\max}/J_{\min}$ multiplied by $(1+w)^2/((1-w)J_{\min})$; it is better whenever $J$ is large where $r$ is.

**Values** (exact rational arithmetic with a rational enclosure of the square root, rounded up; $\rho_Z+\rho_e$ is the accepted value of the curved-window note):

| $w$ | $g(w)\le$ | $\Phi(w)\le$ | $\tau_1(w)\le$ | $\tau_3(w)\le$ | $\rho_Z+\rho_e+\tau_3\le$ |
| --- | --- | --- | --- | --- | --- |
| $1/100$ | $5.001\times10^{-5}$ | $1.251\times10^{-9}$ | $1.062\times10^{-8}$ | $5.31\times10^{-7}$ | |
| $1/50$ | $2.001\times10^{-4}$ | $2.001\times10^{-8}$ | $1.805\times10^{-7}$ | $4.512\times10^{-6}$ | $1.3809$ |
| $1/20$ | $1.253\times10^{-3}$ | $7.823\times10^{-7}$ | $8.455\times10^{-6}$ | $8.455\times10^{-5}$ | $2.2669$ |
| $1/10$ | $5.038\times10^{-3}$ | $1.257\times10^{-5}$ | $1.84\times10^{-4}$ | $9.198\times10^{-4}$ | $5.418$ |
| $1/8$ | $7.906\times10^{-3}$ | $3.076\times10^{-5}$ | $5.251\times10^{-4}$ | $2.101\times10^{-3}$ | $8.6296$ |
| $7/50$ | $9.947\times10^{-3}$ | $4.85\times10^{-5}$ | $9.082\times10^{-4}$ | $3.244\times10^{-3}$ | $11.5576$ |
| $1/5$ | $2.063\times10^{-2}$ | $2.042\times10^{-4}$ | $5.568\times10^{-3}$ | $1.392\times10^{-2}$ | |
| $1/4$ | $3.28\times10^{-2}$ | $5.042\times10^{-4}$ | $1.898\times10^{-2}$ | $3.796\times10^{-2}$ | |
| $3/10$ | $4.829\times10^{-2}$ | $1.061\times10^{-3}$ | $5.567\times10^{-2}$ | $9.279\times10^{-2}$ | |

## 4. The breathing part

**Proposition Z.4 (derived).** For a rigidly repeating solution with $J$ of one sign and both speeds at most $w<1$, $\lvert B_\Phi\rvert\le\Phi(w)\,\mathcal V$, where $\mathcal V=\oint\lvert\tfrac{d}{dt}(r/J)\rvert\,dt$ is the total variation of $r/J$ over a period. In particular $B_\Phi=0$ when $r/J$ is constant, and then $Z_0=T_1+T_3$. Under the hypotheses of Proposition Z.3,

$$
\frac{\lvert Z_0\rvert}{G}\le\tau_1(w)\,\Xi+\frac{\tau_3(w)}{J_{\min}}+\frac{\Phi(w)\,\mathcal V}{G}.
$$

All three terms must be controlled before $Z_0$ can be called small beside the gain; none of $\Xi$, $J_{\min}$ and $\mathcal V/G$ is bounded in this note.

*Proof.* $0\le\Phi(b_1)+\Phi(b_2)\le2\Phi(w)$, and $\oint\tfrac{d}{dt}(r/J)\,dt=0$, so $B_\Phi=\oint[\Phi(b_1)+\Phi(b_2)-\Phi(w)]\,\tfrac{d}{dt}(r/J)\,dt$ with a bracket of absolute value at most $\Phi(w)$. $\qquad\blacksquare$

*Comparison with the size bound (inferred; orientation, not a bound).* The curved-window note had $\lvert Z_0\rvert\le2w^2g(w)\oint dt/r$, and $\oint dt/r=\oint(r/J)\,d\vartheta$, which is about the angle turned times a typical $r/J$. Proposition Z.4 replaces the angle turned by the relative variation of $r/J$ over the period, and $2w^2g(w)\approx w^4$ by $\Phi(w)\approx w^4/8$. For a wide pair on a nearly circular relative orbit the first is large and the second small. This compares two bounds on one term; whether $Z_0$ is small beside the gain is the three-term statement of Proposition Z.4.

*What $B_\Phi$ is beside $B$.* The accepted note's breathing term is $B=\oint\tfrac18Q\,\tfrac{d}{dt}(r/J)\,dt$, with a weight of second order in speed, $\lvert Q\rvert\le4w^2$. $B_\Phi$ has the same form with a weight of fourth order, $0\le\Phi(b_1)+\Phi(b_2)\le2\Phi(w)$. This compares the orders of the two weights' largest possible sizes, $2\Phi(w)$ against $\tfrac12w^2$. It is not a bound of $B_\Phi$ relative to $B$, nor of $\Phi(b_1)+\Phi(b_2)$ relative to $Q$: $Q$ can vanish or change sign where the other weight does not, and $B$ can vanish. What is established is the exact statement that $Z_0$ enters the balance as $B_\Phi$ plus $T_1$ and $T_3$.

## 5. The balance with $Z_0$ removed

**Corollary Z.5 (derived).** For a rigidly repeating solution with both speeds at most $w<\tfrac13$ at all times and $J\ge J_{\min}>0$, put

$$
\tilde B=B-B_\Phi=\oint\Bigl[\frac Q8-\Phi(b_1)-\Phi(b_2)\Bigr]\frac{d}{dt}\Bigl(\frac rJ\Bigr)dt .
$$

Then $\Lambda+\tilde B-G=Z_{\rm curved}+\oint r\,e_J\,dt+T_1+T_3$ exactly, and

$$
\bigl\lvert\Lambda+\tilde B-G\bigr\rvert\le\Bigl[\frac{\rho_Z(w)+\rho_e(w)+\tau_3(w)}{J_{\min}}+\tau_1(w)\,\Xi\Bigr]\,G .
$$

*Proof.* The accepted note's Proposition I(4) with the curved-window note's split $Z=Z_0+Z_{\rm curved}$ reads $0=G-\Lambda-B+Z_0+Z_{\rm curved}+\oint r\,e_J\,dt$. Insert Theorem Z and move $B_\Phi$ to $B$. The bound is Corollary S1.1 of the curved-window note with Proposition Z.3. $\qquad\blacksquare$

In words: in a rigidly repeating solution of the class, $\Lambda$ and one breathing term must together reproduce the first-order gain to within the stated fraction, and that fraction depends on the solution through $J_{\min}$ and $\Xi=\sup r/J^2$, in place of $J_{\min}$ and $r_{\max}/J_{\min}$ before; it is not shown small. This excludes nothing, because neither the sign nor the size of $\Lambda$ or of $\tilde B$ is known. It does not establish M2. No sign is claimed for $Z_0$, $B_\Phi$, $T_1$ or $T_3$, and none is transferred from Proposition K.

## 6. What was tried and did not work, and where this attempt stops

- **Bounding the rate of $r/J$ pointwise.** $\tfrac{d}{dt}(r/J)=\dot r/J-r\dot J/J^2$. With $\lvert\dot J\rvert=r\lvert q_1-q_2\rvert\le2w(1+w)^2/((1-w)r)$, the second part contributes at most $\frac{4w\,\Phi(w)(1+w)^2}{1-w}\oint dt/J^2$ to $\lvert B_\Phi\rvert$, and $1/J^2=(r/J^2)(r/J)\cdot J/r^2$: the factor $r/J$ returns, with a coefficient of fifth order in $w$ in place of fourth. The first part, with only $\lvert\dot r\rvert\le2w$, is worse. So this pointwise majorant does not control $B_\Phi/G$. Control of how much $r/J$ actually varies, the open breathing estimate S2, would; whether some other estimate or a cancellation in the equations would is not known.
- **Treating $B_\Phi$ separately from $B$.** They are integrals against the same rate with weights of different order and no common sign; nothing gained. The useful statement is the combined $\tilde B$.
- **Using only the common velocity.** Writing $\zeta_0P_\perp$ in terms of $P_\parallel$, $P_\perp$ leaves terms in the velocity difference that are not exact rates; the member-by-member form of Lemma Z.2 is what makes every term exact.
- **A sign.** $T_1$ contains $b_1b_2$ at leading order (by the accepted note's Lemma 3, $\sin\beta_1\approx-b_2$ and $\sin\beta_2\approx b_1$) and has no sign; $T_3$ and $B_\Phi$ have none either.

**What is and is not established.** The equality $Z_0-T_1-T_3=B_\Phi$ is exact: what is left of $Z_0$ after the two bounded remainders is a breathing integral. The estimates tried here control it only through the total variation of $r/J$ (Proposition Z.4), which rigid repetition under a speed bound is not known to supply, and the pointwise route above fails. This is an unresolved estimate on this route. It is not a proof that control of the total variation is necessary, or that the solution equations supply no other cancellation.

## 7. Instrument, evidence and the reference boundary

[`straight_strength_identity_check.py`](../evidence/saturday-straight-strength-period-average-2026-10-12/straight_strength_identity_check.py), described in the [evidence README](../evidence/saturday-straight-strength-period-average-2026-10-12/README.md), uses the Python standard library only. Its paths are prescribed: a common drift plus a few circular harmonics for each member, rigidly repeating by construction. A drawn pair is admitted when $r\ge0.2$, $J\ge0.02\,r$ and both speeds are at most $0.9$ at 400 sampled instants of the period; that is a sampled filter, not a certificate that those conditions hold at every instant. They do not obey the equation, and $q_i$ is the paths' own acceleration across the axis.

**Known cases, run first; a failure stops the run.** Hand values $g(\tfrac35)=\tfrac14$, $\Phi(\tfrac35)=\tfrac1{50}$; $\Phi'=b\,g$ and $\Gamma'=g$ by five-point differences at 200 points; the closed form of $\Phi$ against its series and against the direct form; Lemma Z.2 in exact fractions on two hand cases (one giving $\tfrac3{100}$ on both sides); the periodic trapezoid rule on $\oint\cos^2=\pi$ and $\oint e^{\cos t}dt=2\pi I_0(1)$; and the hand-worked family of Section 2, on which $Z_0$, $T_1$, $B_\Phi$, $T_3$ must all vanish while the integrand is not zero (largest relative value $1.6\times10^{-16}$ with integrand up to $3.3\times10^{-3}$). **The first attempt failed a known case** and ran no target: it compared the direct form of $\Phi$ with its series at $b=0.01$ to $10^{-17}$, and the direct form cancels to rounding error of that order there (difference $1.15\times10^{-17}$). The comparison was corrected to use the cancellation-free closed form. Two controls were added with it: the closed form's value at $\tfrac35$, and the direct form against the closed form at 200 random points to $5\times10^{-16}$. The target routines and the formulas they evaluate were not changed. The 200 added draws come from the same generator before the later known case and the targets, so the final run's random paths differ from those attempt 1 would have drawn; attempt 1 ran no target, so there is no target output to compare. Both sources and both outputs are retained.

**Targets, what passed (floating point, with the stated acceptance thresholds; no certified rounding enclosure).** Pointwise identity at 1000 states of 40 breathing pairs, with the rates of $\Phi(b_i)$ and $\Gamma(b_i)$ taken by five-point differences of the paths' own $b_i(t)$ and so independently of Lemma Z.1: largest defect $1.1\times10^{-13}$ in absolute value and $6.7\times10^{-8}$ of the sum of the term sizes, against a threshold of $10^{-7}$; the defect is at the level of the finite-difference error and the margin to the threshold is small. Period identity on 40 breathing pairs, by the periodic trapezoid rule with 4096 points: largest defect $9.8\times10^{-15}$ of the sum of the term sizes, against a threshold of $10^{-9}$, with the four integrals changing by at most $9\times10^{-17}$ between 2048 and 4096 points in the rows printed. In those rows the three terms are of comparable size and of either sign.

**What this can and cannot establish.** It checks that Theorem Z's identity is not contradicted on these samples and that its signs, factors and the integration by parts were transcribed correctly. It tests no bound of Section 3, which needs the rows of a solution, and nothing about solutions. The table is exact rational arithmetic and is separate from the samples. Agreement of a same-session instrument with the hand derivation is not independent evidence; the independent elements are the hand values, the classical integrals and the hand-worked family.

## 8. Limits

Planar motion, opposite polarity, unit reduced coupling, $c_f=1$, twice continuously differentiable complete paths, positive separation. Theorem Z's period statement needs rigid repetition and $J$ without zeros; it is not claimed for histories that repeat only up to a rotation about a drifting centre. Proposition Z.3 and Corollary Z.5 need the speed bound $w<\tfrac13$ over the whole past, through the accepted bounds (B2), (B5) and the curved-window theorem. The class may contain no solution. $\Xi$, $J_{\min}$ and $\mathcal V$ are properties of the solution and are not bounded here. No candidate repeating history was constructed or searched for, no solution was integrated, and no accepted file was changed.

## 9. Falsifiers

- A pair of twice differentiable planar paths with $r>0$, speeds below one and $J\ne0$ at which the pointwise identity of Theorem Z fails, with $q_i$ the paths' own accelerations across the axis, refutes it. Prescribed paths suffice.
- A rigidly repeating pair of paths, prescribed or not, with $J$ of one sign and $Z_0\ne T_1+B_\Phi+T_3$ refutes the period statement.
- A rigidly repeating solution with both speeds at most $w<\tfrac13$ and $\lvert T_1\rvert>\tau_1(w)\,\Xi\,G$ or $\lvert T_3\rvert>\tau_3(w)\,G/J_{\min}$ refutes Proposition Z.3; a prescribed path does not, since the bounds use the rows.
- A rigidly repeating solution in the class violating the inequality of Corollary Z.5 refutes it, the curved-window note's Corollary S1.1 or the accepted Proposition I.
- An exact evaluation of $g$, $\Phi$, $\tau_1$ or $\tau_3$ at a tabulated $w$ above the tabulated number refutes that entry.

## 10. What remains, and proposed propagation (not applied)

Open: the breathing term in its combined form $\tilde B$ (S2); the size and sign of $\Lambda$ against the gain (S3); M2; constant $J$ outside the class of Theorem F (M1); non-mirror periodicity in general. None is started here. No shared tracker, manuscript or queue was edited. Suggested text for the coordinator, for the periodicity queue entry: "Straight term (Saturday continuation round, 2026-10-12, derived): $Z_0=B_\Phi+T_1+T_3$ exactly for rigidly repeating solutions with $J$ of one sign, where $B_\Phi=\oint[\Phi(b_1)+\Phi(b_2)]\,d(r/J)$ is a breathing integral with a fourth-order weight and, under a whole-past speed bound $w<1/3$, $\lvert T_1\rvert\le\tau_1(w)\sup(r/J^2)\,G$ and $\lvert T_3\rvert\le\tau_3(w)G/J_{\min}$. The residual becomes $\lvert\Lambda+\tilde B-G\rvert\le[(\rho_Z+\rho_e+\tau_3)/J_{\min}+\tau_1\sup(r/J^2)]G$ with one breathing term $\tilde B$. $Z_0$ is not bounded for strongly breathing pairs; remaining obligations are the breathing term and $\Lambda$."
