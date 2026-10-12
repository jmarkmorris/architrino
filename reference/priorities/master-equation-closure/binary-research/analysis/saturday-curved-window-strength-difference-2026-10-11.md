# The difference of the two row strengths on curved delay windows: an explicit bound (2026-10-11)

## Result

**The requested bound is proved, with an explicit constant, for every separation.** The task, set in the [quantitative round](../../../../op/agent-chats/2026-10-11-saturday-quantitative-followups/chat.md), was the estimate called S1 in the [accepted non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md#what-m2-would-need): how far the difference of the two members' row strengths can depart from the value it would have if each member had moved in a straight line at its present velocity. Everything is planar, for two architrinos of opposite polarity, under the unchanged [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) with $c_f=1$ and unit reduced coupling.

Terms used below. A *row* is the acceleration one member receives from one earlier emission of its partner; below wake speed (speed $c_f=1$) each member receives exactly one. The *row strength* $a_i$ is its magnitude. The *delay window* of a row is the stretch of the transmitter's path between the emission and the present instant. The *straight comparison row* is the row the receiver would get, at its actual present position, if the transmitter had always moved along the tangent line to its path at the present instant, with its present velocity.

1. **Pointwise bound (derived).** Let both speeds be at most $w<\tfrac13$ over the whole past of a solution. With $\delta=\tfrac12(a_2-a_1)$, $P_\parallel=v_{1\parallel}+v_{2\parallel}$, $\zeta=2r^2\delta-P_\parallel$, $S_i=\sqrt{1-v_{i\perp}^2}$ at the present instant and $\zeta_0=v_{1\parallel}(1/S_1-1)+v_{2\parallel}(1/S_2-1)$,

   $$
   \lvert\zeta-\zeta_0\rvert\le\frac{c(w)}{r},\qquad
   c(w)=\frac{(1+w)^3}{(1-w)(1-3w)^2}\Bigl[1+\frac{3+2w}{\sqrt{1-w^2}}\Bigr],
   $$

   at every instant and for every separation $r>0$ (Theorem S1). No smallness of $1/r$ and no lower bound on $r$ is needed. Each row strength separately satisfies $\lvert a_i-a_i^0\rvert\le c(w)/(2r^3)$, where $a_i^0$ is the strength of the straight comparison row. $c$ is increasing, $c(0)=4$, and $c\to\infty$ as $w\to\tfrac13$; outward-rounded values are $c\le4.952$, $6.922$, $12.725$, $17.812$, $22.086$ for $w=\tfrac1{50},\tfrac1{20},\tfrac1{10},\tfrac18,\tfrac7{50}$.
2. **Kinematic core (derived; holds for any pair of paths, checked on prescribed paths).** Before the equation is used, the statement is: each row strength differs from its straight comparison value by at most an explicit multiple of $\tau^2\bar a$, the square of the delay times the transmitter's largest acceleration over the window (Proposition S.5). The equation enters only to bound that acceleration.
3. **Consequence for one period (derived).** For a rigidly repeating solution with speeds at most $w<\tfrac13$ and $J\ge J_{\min}>0$, the curved-window part of the strength-difference term $Z$ of the accepted note's Proposition I satisfies $\lvert Z_{\rm curved}\rvert\le(\rho_Z(w)/J_{\min})\oint\mu J\,dt$ with $\rho_Z(w)=w\,c(w)\,(1+w)/(1-w)^2$, and the curvature term satisfies $\lvert\oint r\,e_J\,dt\rvert\le(\rho_e(w)/J_{\min})\oint\mu J\,dt$ with $\rho_e(w)=(1+w)^4/((1-w)^2(1-3w)^2)$ (Corollary S1.1). Hence the three terms not controlled here, $\Lambda+B-Z_0$, must equal the first-order gain to within the fraction $(\rho_Z+\rho_e)/J_{\min}$ (Corollary S1.2).
4. **Not achieved.** S1 does not establish the missing proposition M2. The straight part $Z_0$ is kept as an explicit integral and is not bounded against the gain without an upper bound on the separation; the breathing term $B$ (S2), the comparison of $\Lambda$ with the gain (S3), the sign of $\Lambda$ and non-mirror periodicity in general remain open. The fractions in item 3 are small only when $J_{\min}$ is large beside $\rho_Z+\rho_e$, which is $1.39$ at $w=\tfrac1{50}$ and $5.42$ at $w=\tfrac1{10}$. Whether $c(w)$ is the best constant is not established. A hand example on a prescribed path, which is not a solution, shows a cancellation that the proof does not use and so motivates a possible improvement; none is proved (see [Sharpness](#sharpness)).

**Claim grade.** Items 1 to 3 are hand derivations of one session. The [Codex review](saturday-curved-window-strength-difference-codex-review-2026-10-11.md) reconstructs the theorem, its constants and the period consequences separately from the equation's row, and requested the three corrections C1 to C3 of scope and evidence wording incorporated here. A session instrument that first passed known cases checked, in floating point and within stated allowances, the closed forms of the straight comparison rows, the kinematic core on prescribed curved paths, and the transcription of the constants; separately, in exact rational arithmetic, it produced the outward-rounded table. Prescribed paths do not obey the equation. Nothing here is measured on solutions, and agreement of the instrument with these derivations is not independent evidence for them.

**Reading for this note.** Read in full on 2026-10-11 for this task: the accepted non-mirror note (SHA-256 `874fb446…3ad8`, reread from the file), and its [Codex review](saturday-nonmirror-periodicity-codex-review-2026-10-11.md) including the final M2 disposition. Of the Master Equation source, the transmitter-side factor, the acceleration weight, the per-hit acceleration and its term list, and the direction and sign conventions were reread; the rest of that file was not. Of the [exploration](two-member-subwake-periodicity-exploration-2026-10-06.md) and its [second reading](two-member-subwake-periodicity-second-reading-2026-10-06.md), only the straight-window passages were reread (the exploration's straight-window paragraph and Proposition 5; the second reading's Item 4 and Consequence 2); both were read in full earlier the same day. Of the binary README, the Scope, Current work and Boundaries sections were reread and the Documents section only in part; the [queued question](../work-queue.md#decide-whether-two-members-below-wake-speed-can-have-a-periodic-history) was reread in full. That queue entry does not yet mention the 2026-10-11 notes and was not edited. The accepted 2026-10-10 note and its review are not relied on here and were not reread.

## Setting and hypotheses

The setting and notation are those of the [accepted note](saturday-nonmirror-periodicity-2026-10-11.md#setting-and-hypotheses). Two architrinos of opposite polarity move in a plane on twice continuously differentiable paths $\mathbf x_1$, $\mathbf x_2$ with positive separation. $\mathbf r=\mathbf x_1-\mathbf x_2$, $r=\lvert\mathbf r\rvert$, $\hat{\mathbf r}=\mathbf r/r$, $\hat{\boldsymbol\theta}$ is $\hat{\mathbf r}$ turned a quarter turn counterclockwise, and $v_\parallel=\hat{\mathbf r}\cdot\mathbf v$, $v_\perp=\hat{\boldsymbol\theta}\cdot\mathbf v$, all taken at the present instant $t$.

*The row, read from the live law.* The per-hit acceleration is $\kappa\,\sigma_{ij}\,\lvert q_iq_j\rvert\,r_{ij}^{-2}\,(c_f/\lvert D_{t,ij}\rvert)\,\hat{\mathbf r}_{ij}$, with $\hat{\mathbf r}_{ij}$ from the emission point to the reception point, $r_{ij}$ the distance between those points, and $D_{t,ij}=c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij}$ evaluated with the transmitter's velocity at emission; unlike polarities have $\sigma_{ij}=-1$. With $c_f=1$, $\kappa\lvert q_iq_j\rvert=1$ and one partner root, member $i$ at time $t$ receives the row emitted by the other member $j$ at $s_i(t)<t$:

$$
\ddot{\mathbf x}_i(t)=-\frac{\mathbf n_i}{\tau_i^2D_i},\qquad
\tau_i=t-s_i=\lvert\mathbf R_i\rvert,\quad
\mathbf R_i=\mathbf x_i(t)-\mathbf x_j(s_i),\quad
\mathbf n_i=\frac{\mathbf R_i}{\tau_i},\quad
D_i=1-\mathbf n_i\cdot\mathbf v_j(s_i),
$$

and $a_i=1/(\tau_i^2D_i)$. Throughout, $i$ is the receiver and $j$ the other member: for $i=1$ the transmitter is member $2$, and the reverse.

Further notation. $\boldsymbol\rho_i=\mathbf x_i(t)-\mathbf x_j(t)$ is the present separation as seen from the transmitter, so $\boldsymbol\rho_1=\mathbf r$ and $\boldsymbol\rho_2=-\mathbf r$. $E_i=\tau_iD_i=\tau_i-\mathbf R_i\cdot\mathbf v_j(s_i)$, so that $a_i=1/(\tau_iE_i)$. As in the accepted note, $\bar a_j$ is the largest acceleration of member $j$ over the window of the row its partner is receiving: $\bar a_2=\max_{[s_1,t]}\lvert\ddot{\mathbf x}_2\rvert$ and $\bar a_1=\max_{[s_2,t]}\lvert\ddot{\mathbf x}_1\rvert$. $\mu=\tfrac12(a_1+a_2)$ and $\delta=\tfrac12(a_2-a_1)$.

*Class for the theorem.* A complete solution of the equation in this setting on which both speeds are at most $w$, with $0<w<\tfrac13$, at every time up to the present instant. With that bound the partner roots exist (accepted note, Setting). Nothing is assumed about mirror symmetry, the separation or its rate, $J$, the common velocity, the exterior, or the shape of either window. The class may contain no solution for some values of $r$ and $w$; the theorem is conditional on membership.

## The straight comparison rows

**Lemma S.1 (closed forms; derived).** Fix the present positions and a velocity $\mathbf v$ with $\lvert\mathbf v\rvert<1$ for transmitter $j$, and let the transmitter's history be the tangent line $\mathbf x_j(t)-(t-u)\,\mathbf v$. The function $g(y)=y-\lvert\boldsymbol\rho_i+\mathbf v\,y\rvert$ has exactly one zero $T_i>0$, and for $y_2>y_1\ge0$, $g(y_2)-g(y_1)\ge(1-\lvert\mathbf v\rvert)(y_2-y_1)$. The comparison row has delay $T_i$, and with $E_i^0=T_i-(\boldsymbol\rho_i+\mathbf vT_i)\cdot\mathbf v$ its strength is $a_i^0=1/(T_iE_i^0)$. Explicitly, with the present velocities,

$$
T_1=\frac{r\,(v_{2\parallel}+S_2)}{1-\lvert\mathbf v_2\rvert^2},\quad E_1^0=r\,S_2,\quad r^2a_1^0=1-\frac{v_{2\parallel}}{S_2};
\qquad
T_2=\frac{r\,(S_1-v_{1\parallel})}{1-\lvert\mathbf v_1\rvert^2},\quad E_2^0=r\,S_1,\quad r^2a_2^0=1+\frac{v_{1\parallel}}{S_1}.
$$

Consequently $r^2(a_2^0-a_1^0)-P_\parallel=\zeta_0$, and $\zeta-\zeta_0=r^2\,[(a_2-a_2^0)-(a_1-a_1^0)]$.

*Proof.* $\bigl\lvert\lvert\boldsymbol\rho_i+\mathbf vy_2\rvert-\lvert\boldsymbol\rho_i+\mathbf vy_1\rvert\bigr\rvert\le\lvert\mathbf v\rvert(y_2-y_1)$ gives the monotonicity; $g(0)=-r<0$ and $g\to\infty$, so there is one zero. Row $1$: $T^2=\lvert\mathbf r+\mathbf v_2T\rvert^2=r^2+2r\,v_{2\parallel}T+\lvert\mathbf v_2\rvert^2T^2$, whose positive root is the stated $T_1$, since $v_{2\parallel}^2+1-\lvert\mathbf v_2\rvert^2=S_2^2$. Then $E_1^0=T_1(1-\lvert\mathbf v_2\rvert^2)-r\,v_{2\parallel}=r\,S_2$, and with $1-\lvert\mathbf v_2\rvert^2=(S_2-v_{2\parallel})(S_2+v_{2\parallel})$, $r^2a_1^0=r^2/(T_1\,rS_2)=(S_2-v_{2\parallel})/S_2$. Row $2$: $\boldsymbol\rho_2=-\mathbf r$, so $T^2=r^2-2r\,v_{1\parallel}T+\lvert\mathbf v_1\rvert^2T^2$, $T_2=r\,(S_1-v_{1\parallel})/(1-\lvert\mathbf v_1\rvert^2)$, $E_2^0=T_2(1-\lvert\mathbf v_1\rvert^2)+r\,v_{1\parallel}=r\,S_1$ and $r^2a_2^0=(S_1+v_{1\parallel})/S_1$. $\qquad\blacksquare$

*Index and sign check.* These agree with the exploration's straight-window paragraph ($\tau_1D_1=rS_2$, $\tau_1=r(v_{2\parallel}+S_2)/(1-\lvert\mathbf v_2\rvert^2)$) and the second reading's Item 4. Four cases were worked by hand in exact fractions and are in the instrument: a stationary pair at $r=2$ ($\tau=2$, $D=1$, $a=\tfrac14$); transmitter $2$ approaching along the axis at $\tfrac35$, $r=1$ ($T=1+\tfrac35T$, so $T=\tfrac52$, $D=\tfrac25$, $a=\tfrac25=1-\tfrac35$); transmitter $2$ moving across the axis at $\tfrac35$ ($T=\tfrac54$, $\mathbf n=(\tfrac45,\tfrac35)$, $D=\tfrac{16}{25}$, $a=1$); and transmitter $1$ receding along the axis at $\tfrac35$, row received by member $2$ ($T=1-\tfrac35T$, so $T=\tfrac58$, $D=\tfrac85$, $a=\tfrac85=1+\tfrac35$). A transmitter approaching its receiver gives the weaker row, and one receding gives the stronger, which is the sign of both closed forms. These comparison rows live on tangent histories and are not solutions.

## The kinematic core

**Lemma S.2 (departure of a window from its tangent line; derived, kinematic).** $\mathbf x_j(s_i)=\mathbf x_j(t)-\tau_i\mathbf v_j(t)+\mathbf e_j$ and $\mathbf v_j(s_i)=\mathbf v_j(t)+\boldsymbol\sigma_j$ with $\lvert\mathbf e_j\rvert\le\tfrac12\tau_i^2\bar a_j$ and $\lvert\boldsymbol\sigma_j\rvert\le\tau_i\bar a_j$. Hence $\mathbf R_i=\boldsymbol\rho_i+\tau_i\mathbf v_j(t)-\mathbf e_j$.

*Proof.* $\mathbf v_j(u)=\mathbf v_j(t)-\int_u^t\ddot{\mathbf x}_j$ for $u$ in the window, so $\boldsymbol\sigma_j=-\int_{s_i}^t\ddot{\mathbf x}_j$, and integrating once more $\mathbf e_j=\int_{s_i}^t(u-s_i)\,\ddot{\mathbf x}_j(u)\,du$. $\qquad\blacksquare$

**Lemma S.3 (delay; derived, kinematic).** If $\lvert\mathbf v_j(t)\rvert<1$, then $\lvert\tau_i-T_i\rvert\le\lvert\mathbf e_j\rvert/(1-\lvert\mathbf v_j(t)\rvert)\le\tau_i^2\bar a_j/(2(1-\lvert\mathbf v_j(t)\rvert))$.

*Proof.* The actual delay satisfies $\tau_i=\lvert\mathbf R_i\rvert=\lvert\boldsymbol\rho_i+\mathbf v_j(t)\tau_i-\mathbf e_j\rvert$, so with $g$ of Lemma S.1 for $\mathbf v=\mathbf v_j(t)$, $\lvert g(\tau_i)\rvert=\bigl\lvert\lvert\boldsymbol\rho_i+\mathbf v\tau_i-\mathbf e_j\rvert-\lvert\boldsymbol\rho_i+\mathbf v\tau_i\rvert\bigr\rvert\le\lvert\mathbf e_j\rvert$. Since $g(T_i)=0$ and $g$ increases at rate at least $1-\lvert\mathbf v\rvert$, $(1-\lvert\mathbf v\rvert)\lvert\tau_i-T_i\rvert\le\lvert g(\tau_i)-g(T_i)\rvert\le\lvert\mathbf e_j\rvert$. $\qquad\blacksquare$

The rate $1-\lvert\mathbf v\rvert$ is the transversality of the tangent-history causal residual: it cannot be crossed slowly by a transmitter below wake speed. No differentiability of $g$ is used, so the point where $\boldsymbol\rho_i+\mathbf vy$ could vanish needs no separate treatment. The actual root is used only as a number that nearly solves the tangent equation; no second, later or equal-delay root is introduced.

**Lemma S.4 (delay times transmitter factor; derived, kinematic).** With $\mathbf v=\mathbf v_j(t)$,

$$
E_i-E_i^0=(\tau_i-T_i)(1-\lvert\mathbf v\rvert^2)+\mathbf e_j\cdot\mathbf v-\mathbf R_i\cdot\boldsymbol\sigma_j,
\qquad
\lvert E_i-E_i^0\rvert\le\tfrac12\,\tau_i^2\,\bar a_j\,(3+2\lvert\mathbf v\rvert).
$$

*Proof.* $E_i=\tau_i-(\boldsymbol\rho_i+\mathbf v\tau_i-\mathbf e_j)\cdot(\mathbf v+\boldsymbol\sigma_j)=\tau_i(1-\lvert\mathbf v\rvert^2)-\boldsymbol\rho_i\cdot\mathbf v+\mathbf e_j\cdot\mathbf v-\mathbf R_i\cdot\boldsymbol\sigma_j$, and $E_i^0=T_i(1-\lvert\mathbf v\rvert^2)-\boldsymbol\rho_i\cdot\mathbf v$. For the bound, Lemma S.3 gives $\lvert\tau_i-T_i\rvert(1-\lvert\mathbf v\rvert^2)\le\lvert\mathbf e_j\rvert(1+\lvert\mathbf v\rvert)$; $\lvert\mathbf e_j\cdot\mathbf v\rvert\le\lvert\mathbf v\rvert\lvert\mathbf e_j\rvert$; and $\lvert\mathbf R_i\cdot\boldsymbol\sigma_j\rvert\le\tau_i\cdot\tau_i\bar a_j$ because $\lvert\mathbf R_i\rvert=\tau_i$. The total is $\lvert\mathbf e_j\rvert(1+2\lvert\mathbf v\rvert)+\tau_i^2\bar a_j$. $\qquad\blacksquare$

The three pieces are the change of delay, the displacement of the emission point along the present velocity, and the difference between the transmitter's velocity at emission and now. The last is the largest.

**Proposition S.5 (row strength against its straight comparison value; derived, kinematic).** For any pair of twice continuously differentiable planar paths, at an instant at which the partner root exists, $\lvert\mathbf v_j(t)\rvert<1$ and $\lvert\mathbf v_j(s_i)\rvert<1$,

$$
\lvert a_i-a_i^0\rvert\le\tau_i^2\,\bar a_j\Bigl[\frac{1}{2\,(1-\lvert\mathbf v_j(t)\rvert)\,\tau_iE_iT_i}+\frac{3+2\lvert\mathbf v_j(t)\rvert}{2\,E_iT_iE_i^0}\Bigr].
$$

If moreover both speeds are at most $w<1$ on the two windows, then

$$
\lvert a_i-a_i^0\rvert\le K(w)\,\frac{\bar a_j}{r},\qquad
K(w)=\frac{1+w}{2\,(1-w)^2}\Bigl[1+\frac{3+2w}{\sqrt{1-w^2}}\Bigr],
\qquad
\lvert\zeta-\zeta_0\rvert\le K(w)\,r\,(\bar a_1+\bar a_2).
$$

On prescribed paths $a_i$ is the strength of the formal row computed from the paths, and $\bar a_j$ is the paths' own largest acceleration over the window.

*Proof.* $a_i-a_i^0=1/(\tau_iE_i)-1/(T_iE_i^0)=[(T_i-\tau_i)E_i^0+\tau_i(E_i^0-E_i)]/(\tau_iE_iT_iE_i^0)=(T_i-\tau_i)/(\tau_iE_iT_i)+(E_i^0-E_i)/(E_iT_iE_i^0)$; insert Lemmas S.3 and S.4. All four denominators are positive: $\tau_i>0$; $E_i=\tau_iD_i$ with $D_i\ge1-\lvert\mathbf v_j(s_i)\rvert>0$; $T_i>0$; $E_i^0=rS_j>0$. For the second statement use these lower bounds, each valid when the transmitter's speed is at most $w$ on its window: $T_i\ge r/(1+w)$, because $T_i=\lvert\boldsymbol\rho_i+\mathbf vT_i\rvert\ge r-wT_i$; $D_i\ge1-w$; $\tau_i\le r/(1-w)$, because $\tau_i=\lvert\mathbf R_i\rvert\le r+w\tau_i$; and $S_j\ge\sqrt{1-w^2}$. Then the first term is $\bar a_j/(2(1-\lvert\mathbf v\rvert)D_iT_i)\le\bar a_j\,(1+w)/(2(1-w)^2r)$ and the second is $\tau_i\,\bar a_j\,(3+2\lvert\mathbf v\rvert)/(2D_iT_i\,rS_j)\le\bar a_j\,(3+2w)(1+w)/(2(1-w)^2\sqrt{1-w^2}\,r)$. The statement for $\zeta$ follows from Lemma S.1. $\qquad\blacksquare$

## The bound for solutions

**Theorem S1 (derived).** On a solution in the class above (both speeds at most $w$, $0<w<\tfrac13$, at all times up to $t$), at the instant $t$ and for every value $r>0$ of the separation,

$$
\lvert a_i-a_i^0\rvert\le\frac{c(w)}{2\,r^3}\quad(i=1,2),\qquad
\lvert\zeta-\zeta_0\rvert\le\frac{c(w)}{r},\qquad
c(w)=\frac{(1+w)^3}{(1-w)(1-3w)^2}\Bigl[1+\frac{3+2w}{\sqrt{1-w^2}}\Bigr].
$$

Equivalently $\bigl\lvert2r^2\delta-v_{1\parallel}/S_1-v_{2\parallel}/S_2\bigr\rvert\le c(w)/r$.

*Proof.* By Proposition S.5 it remains to bound $\bar a_j$, and this is the only place the equation is used. Take $i=1$; the window is $[s_1(t),t]$ and the transmitter is member $2$. Fix $u$ in the window. Because the path is a solution, $\lvert\ddot{\mathbf x}_2(u)\rvert$ is the strength at time $u$ of the row member $2$ receives, which was emitted by member $1$ at $s_2(u)\le u$: $\lvert\ddot{\mathbf x}_2(u)\rvert=1/(\tau_2(u)^2D_2(u))$. That earlier row is bounded with the accepted note's (B1) and (B2) applied at time $u$ to the *other* member's incoming delay: $\tau_2(u)\ge r(u)/(1+w)$, which uses member $1$'s speed on $[s_2(u),u]$, and $D_2(u)\ge1-w$, which uses member $1$'s speed at $s_2(u)$. Both times may lie before the window $[s_1(t),t]$, which is why the speed bound is assumed over the whole past and not only on the window. So $\lvert\ddot{\mathbf x}_2(u)\rvert\le(1+w)^2/((1-w)\,r(u)^2)$. By (B3), $r(u)\ge r-2w(t-u)\ge r-2w\tau_1\ge r\,(1-3w)/(1-w)$, using both speeds on $[u,t]$ and $\tau_1\le r/(1-w)$; this is positive because $w<\tfrac13$. Hence, as in (B4),

$$
\bar a_2\le\frac{(1+w)^2(1-w)}{(1-3w)^2\,r^2},
$$

and the same holds for $\bar a_1$ with the members exchanged. Multiplying by $K(w)/r$ gives $c(w)/(2r^3)$ with $c(w)=2K(w)\,(1+w)^2(1-w)/(1-3w)^2$, which is the stated expression. The bound for $\zeta$ is $r^2$ times the sum of the two. $\qquad\blacksquare$

*Denominators.* $1-w$, $1-3w$ and $\sqrt{1-w^2}$ are positive on $0<w<\tfrac13$; $r>0$; and the four denominators of Proposition S.5 are bounded below by $r/(1+w)$, $r\,(1-w)/(1+w)$, $r/(1+w)$ and $r\sqrt{1-w^2}$. Nothing in the proof divides by a quantity that can vanish in the class.

*Domain.* The bound holds for all $r>0$ because every step is a comparison of lengths with $r$; no invariant smallness threshold is needed. It degenerates only as $w\to\tfrac13$, where (B3) no longer keeps the separation positive across a window. The theorem is stated only under the speed bound over the whole past. No version with a bound on a finite stretch of the past is claimed. Such a version would need more than the existence of the roots: the setting of one partner row and no own-path row at every earlier receiver time concerned, the roots used lying inside the stretch, and the ordering of the nested emission times. None of that is established here.

*Monotonicity and values.* Each factor of $c$ is positive and increasing on $[0,\tfrac13)$, so $c$ is increasing and a history with bound $w$ satisfies the estimate with $c(w')$ for every $w'\ge w$. $c(0)=4$. Values below were computed in exact rational arithmetic with a rational enclosure of the square root and rounded upward; they are upper bounds for $c(w)$, $\rho_Z(w)$, $\rho_e(w)$, their sum and $\rho_0(w)$ as defined in the next section.

| $w$ | $c(w)\le$ | $\rho_Z(w)\le$ | $\rho_e(w)\le$ | $\rho_Z+\rho_e\le$ | $\rho_0(w)\le$ |
| --- | --- | --- | --- | --- | --- |
| $1/100$ | $4.447$ | $0.0459$ | $1.1285$ | $1.1743$ | $0.00000002$ |
| $1/50$ | $4.952$ | $0.1052$ | $1.2756$ | $1.3808$ | $0.00000017$ |
| $1/20$ | $6.922$ | $0.4027$ | $1.8642$ | $2.2668$ | $0.00000729$ |
| $1/10$ | $12.725$ | $1.7281$ | $3.6889$ | $5.4170$ | $0.00013683$ |
| $1/8$ | $17.812$ | $3.2715$ | $5.3560$ | $8.6274$ | $0.00036300$ |
| $7/50$ | $22.086$ | $4.7659$ | $6.7884$ | $11.5543$ | $0.00060099$ |
| $1/5$ | $60.347$ | $22.6300$ | $20.2500$ | $42.8800$ | $0.00309311$ |
| $1/4$ | $192.283$ | $106.8238$ | $69.4445$ | $176.2682$ | $0.00910988$ |
| $3/10$ | $1498.300$ | $1192.5239$ | $582.8776$ | $1775.4015$ | $0.02305848$ |

*A consequence at each instant (derived).* By the accepted note's Proposition H(4), $A_\parallel=2\delta-\chi=(P_\parallel+\zeta)/r^2-\chi$ with $\lvert\chi\rvert\le a_+w^2$. Hence on a solution in the class the component along the axis of the sum of the two rows satisfies $\lvert A_\parallel-(P_\parallel+\zeta_0)/r^2\rvert\le c(w)/r^3+(1+w)^2w^2/((1-w)\,r^2)$.

## Consequence for one period

Let the solution be rigidly repeating in the accepted note's sense, $\mathbf x_i(t+T)=R\,\mathbf x_i(t)+\mathbf d$, with both speeds at most $w<\tfrac13$ and $J$ without zeros; after a reflection $J>0$, and $J_{\min}>0$ is its smallest value. All integrals are over one period. Write $G=\oint\mu J\,dt$ for the first-order gain, which is positive, and split the strength-difference term of Proposition I,

$$
Z=\oint\frac{\zeta\,P_\perp}{2r}\,dt=Z_0+Z_{\rm curved},\qquad
Z_0=\oint\frac{\zeta_0\,P_\perp}{2r}\,dt,\qquad
Z_{\rm curved}=\oint\frac{(\zeta-\zeta_0)\,P_\perp}{2r}\,dt .
$$

**Corollary S1.1 (derived).**

$$
\lvert Z_{\rm curved}\rvert\le w\,c(w)\oint\frac{dt}{r^2}\le\frac{\rho_Z(w)}{J_{\min}}\,G,\qquad
\Bigl\lvert\oint r\,e_J\,dt\Bigr\rvert\le\frac{(1+w)^3}{(1-3w)^2}\oint\frac{dt}{r^2}\le\frac{\rho_e(w)}{J_{\min}}\,G,
$$

$$
\rho_Z(w)=\frac{w\,c(w)\,(1+w)}{(1-w)^2},\qquad\rho_e(w)=\frac{(1+w)^4}{(1-w)^2(1-3w)^2}.
$$

*Proof.* $\lvert P_\perp\rvert\le2w$ and Theorem S1 give $\lvert(\zeta-\zeta_0)P_\perp/(2r)\rvert\le w\,c(w)/r^2$. For the curvature term, the accepted note has $\lvert e_J\rvert\le a_2\epsilon_1+a_1\epsilon_2$ and $r^3(a_2\epsilon_1+a_1\epsilon_2)\le(1+w)^3/(1-3w)^2$. For the gain, (B2) gives $\mu\ge(1-w)^2/((1+w)\,r^2)$, so $G\ge\frac{(1-w)^2}{1+w}\oint J\,r^{-2}\,dt\ge\frac{(1-w)^2}{1+w}\,J_{\min}\oint r^{-2}\,dt$. $\qquad\blacksquare$

Since $J/r^2=\dot\vartheta$, the middle expressions can also be read against the angle $\Theta=\oint\dot\vartheta\,dt$ turned by the axis in a period: $\oint r^{-2}dt\le\Theta/J_{\min}$ and $G\ge\Theta\,(1-w)^2/(1+w)$.

**Corollary S1.2 (what S1 leaves of the residual; derived).** By Proposition I(4), $0=G-\Lambda-B+Z_0+Z_{\rm curved}+\oint r\,e_J\,dt$. Therefore

$$
\bigl\lvert\Lambda+B-Z_0-G\bigr\rvert\le\frac{\rho_Z(w)+\rho_e(w)}{J_{\min}}\;G .
$$

In words: in a rigidly repeating solution of this class, the three terms not controlled here must together reproduce the first-order gain to within the stated fraction. When $J_{\min}>\rho_Z(w)+\rho_e(w)$ this forces $\Lambda+B-Z_0>0$. It excludes nothing, because neither the sign nor the size of $\Lambda$ and $B$ is known. For orientation only, the threshold $\rho_Z+\rho_e$ is $1.39$, $2.27$, $5.42$ and $11.56$ at $w=\tfrac1{50},\tfrac1{20},\tfrac1{10},\tfrac7{50}$, against the accepted note's $j_F=1.18$, $1.53$, $2.47$, $3.86$; the leading-order no-delay circular comparison $J\approx1/w$ would be $50$, $20$, $10$ and about $7.1$. That comparison is of sizes and admits no history.

**The straight part $Z_0$ stays explicit.** Its integrand is known from present velocities alone: $\zeta_0P_\perp/(2r)=[v_{1\parallel}(1/S_1-1)+v_{2\parallel}(1/S_2-1)]\,(v_{1\perp}+v_{2\perp})/(2r)$, of fourth order in speed. A bound by size alone is $\lvert\zeta_0\rvert\le z_0(w)=2w\,(1/\sqrt{1-w^2}-1)$, hence $\lvert Z_0\rvert\le w\,z_0(w)\oint dt/r\le\rho_0(w)\,(r_{\max}/J_{\min})\,G$ with $\rho_0(w)=w\,z_0(w)(1+w)/(1-w)^2$ and $r_{\max}$ the largest separation (derived). This carries one power of $r$ more than the gain, so it is small only for $r_{\max}\ll J_{\min}/\rho_0(w)$; for wide pairs $Z_0$ cannot be discarded by size and would have to be averaged together with the leading term, as the accepted note said. No sign is claimed for $Z_0$, and no sign is transferred from Proposition K, whose weight differs.

## Sharpness

Whether $c(w)$ is the best constant for solutions is not established: no solution is shown to come near the bound, and no smaller bound is proved. The following hand example motivates a possible improvement (inferred; a formal calculation on a prescribed path, which is not a solution of the equation and proves nothing about solutions). Put the receiver at distance $r$ from a transmitter that is at rest now and has had constant acceleration $g=1/r^2$ toward the receiver, the leading size of the attraction it would feel. On one line, $\tau=r-\tfrac12g\tau^2$ and $D=1+g\tau$. With $\tau=r-\eta$, $\eta=\tfrac12(1-\eta/r)^2=\tfrac12-\tfrac1{2r}+\cdots$, so $\tau^2=r^2-r+\tfrac54+\cdots$, $D=1+\tfrac1r-\tfrac1{2r^2}+\cdots$ and $\tau^2D=r^2-\tfrac14+\cdots$. The delay is shorter by about $\tfrac12$ and the transmitter factor larger by about $1/r$, and the two changes cancel at relative order $1/r$: $r^2(a-a^0)=1/(4r^2)+\cdots$, whereas the bound allows more than $c(0)/(2r)=2/r$. In the proof these are the two terms of Proposition S.5, bounded separately in absolute value, so the proof cannot see this cancellation. If the same cancellation holds on solutions, an estimate in which the acceleration over the window is replaced by its leading value along the axis, and only the departure from it is bounded, might give a constant that vanishes with $w$ plus a term of order $1/r^2$. That was not attempted. The example does not show that solutions have a smaller constant, and no improvement is claimed.

## Instrument

[`strength_difference_check.py`](../evidence/saturday-curved-window-strength-difference-2026-10-11/strength_difference_check.py), described in the [evidence README](../evidence/saturday-curved-window-strength-difference-2026-10-11/README.md), was written in this session and uses the Python standard library only. It ran once, through the owned-compute supervisor, in $1.16$ seconds with exit code $0$. Paths are prescribed (a constant drift plus uniform circular motion, so each path's acceleration magnitude is one exactly known constant) and do not obey the equation. Every row it computes is the formal row of the paths.

**Known cases, run first; a failure stops the run before any target.** K1: the closed-form $T_i$, $E_i^0$, $a_i^0$ of Lemma S.1 against an independent bisection of the tangent root, 400 states with speeds up to $0.95$ (largest scaled error $5.1\times10^{-14}$). K2: the four hand values in exact fractions listed after Lemma S.1, against both the path-root solver and the closed forms (largest error $8.9\times10^{-16}$). K3: 400 pairs of straight uniform prescribed paths, formal rows against the closed forms and $\zeta$ against $\zeta_0$, for which the lemmas give equality (largest scaled errors $1.3\times10^{-14}$ for the delay and $6.5\times10^{-15}$ for $\zeta$). K4: eleven exact arithmetic controls of the rational evaluator and the rounding, among them $c(0)=4$, the formula's value $100$ at $w=\tfrac35$ (outside the theorem's range, an arithmetic control only), $\rho_e(\tfrac15)=\tfrac{81}4$ and upward rounding of $\tfrac13$ to $0.3334$. All passed. K1 to K3 are floating-point comparisons with acceptance thresholds $10^{-10}$, $10^{-12}$ and $10^{-9}$; K4 is exact.

**Target T1, what passed.** On 2999 pairs of curved prescribed paths with speed bounds up to $0.9$ and 3000 with bounds up to $0.32$, both rows: Lemma S.2 (both parts), Lemma S.3, Lemma S.4, the first inequality of Proposition S.5 and its sum for $\zeta$ showed no failure beyond the instrument's allowances, with each path's constant acceleration magnitude $\rho\,\omega^2$ as $\bar a_j$. The allowances are: for each row check, $10^{-9}$ times the right side plus $10^{-12}\,(1+r^{-2}+r)$; for the $\zeta$ check, $10^{-9}$ times the right side plus $10^{-11}$. The roots are found by floating-point bisection, and the path values, the acceleration magnitudes and both sides of each inequality are floating-point numbers with no certified enclosure of the rounding error. So this is an observation that no sample failed beyond those allowances, not a certified inequality on each sampled exact path. The largest ratios of left to right side over both groups were $0.99999996$ for Lemma S.2, $0.99966$ for Lemma S.3, $0.398$ for Lemma S.4, $0.324$ for the row strength and $0.229$ for $\zeta$. So Lemmas S.2 and S.3 are nearly attained on these samples, and the slack is in Lemma S.4 and in adding the terms of Proposition S.5 in absolute value. $\tau^2\bar a/r$ ranged from $4\times10^{-6}$ to $2.8\times10^{4}$, and $r$ from $0.06$ to $64$.

**Target T2, what passed.** On 2999 states with one speed bound $w$ between $0.020$ and $0.320$ for both members: (B1), $T_i\ge r/(1+w)$ and $E_i^0\ge r\sqrt{1-w^2}$ showed no failure beyond an allowance of $10^{-12}\,r$, and (B2) none beyond an absolute $10^{-12}$; and the right side of Proposition S.5, with $\bar a_j$ replaced by the (B4) majorant, did not exceed $c(w)/(2r^3)$ for each row or $c(w)/r$ for $\zeta$ by more than a relative $10^{-12}$ (largest ratios $0.9551$ and $0.9454$). These too are floating-point evaluations without a certified rounding enclosure; here $c(w)$ is the float evaluation, not the exact-rational table. Because that right side is linear in $\bar a_j$, this is a check of the step from the first to the second statement of Proposition S.5, that is of $K(w)$, and of the transcription of $c(w)$. It is conditional on (B4), which holds for solutions and cannot be tested on prescribed paths.

**What this can and cannot establish.** It can show that the closed forms carry the right indices and signs, that no sampled state contradicted the kinematic lemmas beyond the stated floating-point allowances, and that on the samples the constants are consistent with the stated bounds and algebra. It certifies no inequality: T1 and T2 are finite floating-point samples. It establishes nothing about solutions, tests no derivative and no period average, and is not independent evidence for the hand derivations. The table is separate from those samples: its values are exact-rational upper bounds for the displayed formulas, not measurements, and do not depend on any floating-point allowance.

## Limits

Planar motion, opposite polarity, unit reduced coupling, $c_f=1$, positive separation, twice continuously differentiable complete paths and one partner row at each instant are assumed. Theorem S1 needs the speed bound $w<\tfrac13$ over the whole past; no finite-past version is claimed. It says nothing for speeds of $\tfrac13$ or more, and nothing for a history with no uniform bound. The class may be empty for some $r$ and $w$, and no solution is shown to lie in it. Corollaries S1.1 and S1.2 are for rigidly repeating solutions with $J$ of one sign; they are not claimed for $J$-periodic histories that are not rigidly repeating. The constants are not shown to be the best possible, and no smaller constant is shown either. No candidate repeating history was constructed or searched for, no solution was integrated, and no production code was changed or run. The earlier frozen notes, instruments and outputs are untouched, including the withdrawn leading-loss statement of the M2 continuation.

## Falsifiers

- A pair of twice differentiable planar paths below wake speed at which one of Lemmas S.2 to S.4 or the first inequality of Proposition S.5 fails, with $\bar a_j$ the true largest acceleration over the window and formal rows for $a_i$, refutes that statement. Prescribed paths suffice.
- A pair of straight uniform paths whose formal rows differ from $r^2a_1^0=1-v_{2\parallel}/S_2$ or $r^2a_2^0=1+v_{1\parallel}/S_1$ refutes Lemma S.1; so does a hand evaluation of one of the four fraction cases that differs.
- A pair of paths with speeds at most $w<1$ on the windows at which $\lvert a_i-a_i^0\rvert>K(w)\,\bar a_j/r$ refutes the second statement of Proposition S.5.
- A complete solution with both speeds at most $w<\tfrac13$ at all earlier times and an instant at which $\lvert\zeta-\zeta_0\rvert>c(w)/r$ refutes Theorem S1. A prescribed path with that property refutes nothing, since (B4) need not hold on it.
- A rigidly repeating solution in the class with $\lvert\Lambda+B-Z_0-G\rvert>(\rho_Z+\rho_e)\,G/J_{\min}$ refutes Corollary S1.2 or Proposition I.
- An exact evaluation of $c$, $\rho_Z$, $\rho_e$ or $\rho_0$ at a tabulated $w$ that exceeds the tabulated number refutes that table entry.

## What remains

S1 is settled in the form stated, for the class stated. For M2 the residual of the accepted note is now $\Lambda+B-Z_0$ against the gain, with the explicit margin of Corollary S1.2. Still open: control of the breathing term $B$ (S2); the comparison of $\Lambda$ with the gain, and the sign of $\Lambda$ (S3); the averaging of the straight part $Z_0$ for wide pairs; M2 itself; constant $J$ outside the class of Theorem F (M1); and non-mirror periodicity in general. A sharper form of S1, if one holds along the lines of [Sharpness](#sharpness), would lower the thresholds on $J_{\min}$ but would not by itself touch $\Lambda$, $B$ or $Z_0$. None of these is commissioned by this note.
