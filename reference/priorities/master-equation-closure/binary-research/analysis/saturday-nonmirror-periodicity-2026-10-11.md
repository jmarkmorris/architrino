# Two members below wake speed without mirror symmetry: the constant-angular-momentum alternative and a curved-window rate bound (2026-10-11)

## Result

**The general question stays open.** No proof was found that two architrinos of opposite polarity, both below wake speed, have no repeating history, and no repeating history was found. This note answers a narrower question set by the [successor round](../../../../op/agent-chats/2026-10-11-saturday-serial-followups/chat.md): what can be said about the three alternatives that the [accepted note of 2026-10-10](saturday-two-member-subwake-periodicity-2026-10-10.md) left for a repeating history, starting with the alternative in which the relative angular momentum $J$ never changes. Everything is planar and under the unchanged [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) with $c_f=1$ and unit coupling.

1. **A rate bound that holds on curved paths (derived).** The rate of $J$ equals a first-order gain proportional to $J$, plus a term proportional to the pair's common velocity across its own axis, to within an explicit allowance for the curvature of the two paths over the two delay windows (Theorem E). The 2026-10-06 exploration had this only for straight windows and listed the curved case as a failed attempt with no error bound. For speeds never above $w<\tfrac13$ the allowance is explicit: $J$ is increasing at every instant at which $J>j_E(w,r)$, with $j_E$ given below.
2. **The constant-$J$ alternative is excluded in one declared class (derived).** The class has three conditions, all required: both speeds are at most $w\le0.14$ over the whole history; the separation is bounded; and $J$ stays strictly above $j_F(w)=(1+w)^2/(1-3w)^2\le3.87$. In it, $J$ is strictly increasing at some instant of every sufficiently long stretch of time (Theorem F). No periodicity is assumed. In particular no repeating history that stays in this class has constant $J$. As a leading-order comparison only, a circular relative orbit at relative speed $\varepsilon$ has $J$ near $2/\varepsilon$, above the threshold; whether any complete delayed history lies in the class is not shown.
3. **What a repeating pair in that class would have to do (derived).** For a repeating history that stays in the class of item 2 at all times, the separation direction never turns back, so the three alternatives collapse to one: the pair must lose $J$ at some instant with no turning back. At such an instant $J\le j_E(w,r)$, exactly one member fails to move across the axis in the sense of the turning by more than the allowance, the row received by its partner is the stronger of the two, and that member's term outweighs the other's.
4. **Each member's balance along the axis (derived).** In any history that repeats up to a fixed rotation and shift, each member must, on an average weighted by the turning rate, move across the axis in the sense of the pair's turning (Proposition D). A history in which one member never does is excluded.
5. **Why the route through "cancellation for every reference point" stops (derived).** The split of the rate of $J$ into a mirror-like term and a centre term holds for every reference point between the members, but the sum of the two terms is the same number for every such point. Requiring cancellation for every reference point, both endpoints included, is therefore one scalar equation at each instant, not a family of equations. It says exactly that the two members have the same acceleration across the axis (Proposition G).
6. **Not achieved.** Constant $J$ is not excluded outside the class of item 2: for speeds above $0.14$, for histories whose $J$ reaches $j_F(w)$ or less at some instant however slow they are, for unbounded separation, and for histories with no uniform speed bound. A loss of $J$ with no turning back is not excluded for any pair. The loss-to-turnback bound was not advanced except through item 3. The smallest missing propositions are stated under [What is missing](#what-is-missing).

**Continuation (added 2026-10-11, after the checkpoint review).** An attempt at the missing proposition M2 is recorded in the last section, [M2 continuation](#m2-continuation-the-averaged-common-velocity-term). It does not prove M2. It gives exact averaged identities for the common velocity of rigidly repeating solutions and an exact decomposition of the common-velocity term's period integral, whose residual has no established sign. A formal one-turn calculation in an auxiliary model, with no error bound, suggests that M2 would be a comparison of sizes; that is not established for the law.

**Claim grade.** Items 1 to 5 are hand derivations written in one session; the [Codex review](saturday-nonmirror-periodicity-codex-review-2026-10-11.md) reconstructs them separately from the equation's row and requested the six corrections N1 to N6 incorporated here. A session instrument that passed two known cases first checked, on prescribed paths, the kinematic inequalities and the transcription of the constants behind items 1 and 2. Prescribed paths do not obey the equation, the quantity the instrument calls the rate is the torque of the formal rows and not the rate of those paths' own $J$, and the explicit forms were checked only through an algebraic substitute; see [Instrument](#instrument). Nothing here is measured on solutions.

**Reading limits.** The [accepted note](saturday-two-member-subwake-periodicity-2026-10-10.md), its [Codex review](saturday-two-member-subwake-periodicity-codex-review-2026-10-10.md), the [exploration](two-member-subwake-periodicity-exploration-2026-10-06.md), its [second reading](two-member-subwake-periodicity-second-reading-2026-10-06.md) and this owner's README were read in full on 2026-10-11. Of the Master Equation source, the canonical-form section (per-hit acceleration, total acceleration, conventions and exclusions) and the direction, sign and normalization conventions were read on 2026-10-11 before the corrected version of this note was returned; the rest of that file was not. The row used here is that law for one partner root with $c_f=1$, unit reduced coupling $\kappa\lvert q_iq_j\rvert=1$, unlike polarity $\sigma=-1$ and positive transmitter-side factor. Of the priorities, queue, work log and manuscript, only the passages on this question were read: the 2026-10-10 priorities paragraph, the [queued question](../work-queue.md#decide-whether-two-members-below-wake-speed-can-have-a-periodic-history), the work-log headings of 2026-10-10, and the manuscript's Section 8 headings. The [rigid unequal-circle exclusion](asymmetric-opposite-pair-closed-form.md) is cited from the exploration and was not reread.

## Setting and hypotheses

Two architrinos move in a plane on twice continuously differentiable paths $\mathbf x_1(t)$, $\mathbf x_2(t)$ defined for all time, with opposite polarities, positive separation and speeds strictly below $1$ at every instant. Each member is assumed to receive its partner row at every instant; below wake speed that row is unique and there is no own-path row (exploration, row census). Existence of the partner root is a hypothesis for a general history. Speeds strictly below $1$ at each instant do not supply it, even for motion that is a constant drift plus a bounded part: on one line, $x_2(t)=t-\arctan t$ and $x_1(t)=x_2(t)+2$ have speeds $t^2/(1+t^2)<1$ and separation $2$, yet at $t=0$ the root function of receiver $1$ is $-s-\lvert2-s+\arctan s\rvert=-2-\arctan s<0$ for every $s<0$, so there is no root (Codex review, N1; these paths are a kinematic example and do not obey the equation). The root does exist when the transmitter's speed is at most some $w<1$ over the whole past, because then $\lvert\mathbf x_i(t)-\mathbf x_j(s)\rvert\le r(t)+w\,(t-s)$ and the root function tends to $+\infty$ as $s\to-\infty$; and when the motion is a constant drift of speed strictly below $1$ plus a bounded part. Every result below that assumes a uniform speed bound therefore has its roots; elsewhere root existence stays an explicit assumption.

Notation follows the earlier notes. $\mathbf r=\mathbf x_1-\mathbf x_2$, $r=\lvert\mathbf r\rvert$, $\hat{\mathbf r}=\mathbf r/r=(\cos\vartheta,\sin\vartheta)$ with $\vartheta$ continuous, and $\hat{\boldsymbol\theta}=(-\sin\vartheta,\cos\vartheta)$. For a velocity $\mathbf v$, $v_\parallel=\hat{\mathbf r}\cdot\mathbf v$ is its part along the axis and $v_\perp=\hat{\boldsymbol\theta}\cdot\mathbf v$ its part across the axis, counterclockwise positive. Then $v_{1\parallel}-v_{2\parallel}=\dot r$, $v_{1\perp}-v_{2\perp}=r\dot\vartheta$ and $J=\mathbf r\times(\mathbf v_1-\mathbf v_2)=r^2\dot\vartheta$. Member $1$ at $t$ receives the row emitted by member $2$ at $s_1(t)$, with delay $\tau_1=t-s_1$, unit vector $\mathbf n_1$ from the emission point to the receiver and transmitter factor $D_1=1-\mathbf n_1\cdot\mathbf v_2(s_1)$; likewise $s_2$, $\tau_2$, $\mathbf n_2$, $D_2$ for member $2$. The equation gives $\ddot{\mathbf x}_i=-\mathbf n_i/(\tau_i^2D_i)$. Write $a_i=\lvert\ddot{\mathbf x}_i\rvert=1/(\tau_i^2D_i)$ for the row strength and $\beta_i$ for the aberration angles of the exploration, so that $\hat{\mathbf r}\cdot\mathbf n_1=\cos\beta_1$, $-\hat{\mathbf r}\cdot\mathbf n_2=\cos\beta_2$, both positive by the wake-front bound of the accepted note. The window displacements are $\boldsymbol\Delta_1=\mathbf x_1(t)-\mathbf x_1(s_2)$ and $\boldsymbol\Delta_2=\mathbf x_2(t)-\mathbf x_2(s_1)$, and $\tau_2\sin\beta_2=\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_1$, $\tau_1\sin\beta_1=-\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_2$ (second reading, displacement form).

Three kinds of repetition are distinguished, because they are not equivalent.

- **$J$-periodic:** $\mathbf r(t+T)=R\,\mathbf r(t)$ for a fixed rotation $R$. Then $r$, $\dot r$, $\dot\vartheta$ and $J$ are periodic. Nothing is implied about the individual velocities. This is the class of the accepted note and includes a rotating frame whose centre drifts.
- **Rigidly repeating:** $\mathbf x_i(t+T)=R\,\mathbf x_i(t)+\mathbf d$ for a fixed rotation $R$ and fixed vector $\mathbf d$, the same for both members. This covers periodic histories, histories periodic up to a constant drift ($R$ the identity), and histories periodic in a frame rotating about a fixed centre. Then $\mathbf v_i(t+T)=R\,\mathbf v_i(t)$, so the speeds, $v_{i\parallel}$, $v_{i\perp}$, the delays and the row strengths are all periodic, the speeds have a largest value below $1$ because they are continuous and periodic, and with that uniform margin the partner roots exist. It does not cover a rotating frame whose centre drifts; there $v_{i\parallel}$ is not periodic.
- **Uniform speed bound $w$:** $\lvert\mathbf v_i(t)\rvert\le w<1$ for both members and all $t$. Speeds strictly below $1$ at each instant do not imply this for a general or a $J$-periodic history. It is stated wherever it is used.

Nothing below licenses a statement about motion in three dimensions. The identities of Proposition D do not use the plane in their derivation, but every sign and repetition argument here is planar, and no spatial claim is made.

## Components along and across the axis

**Proposition D (derived).** Along any history of the setting,

$$
\dot v_{1\parallel}=-a_1\cos\beta_1+\dot\vartheta\,v_{1\perp},\qquad
\dot v_{2\parallel}=+a_2\cos\beta_2+\dot\vartheta\,v_{2\perp},
$$

$$
\dot v_{1\perp}=a_1\sin\beta_1-\dot\vartheta\,v_{1\parallel},\qquad
\dot v_{2\perp}=-a_2\sin\beta_2-\dot\vartheta\,v_{2\parallel},
$$

with $a_i\cos\beta_i>0$. Consequently: (i) in a rigidly repeating history, $\oint\dot\vartheta\,v_{1\perp}\,dt=\oint a_1\cos\beta_1\,dt>0$ and $\oint\dot\vartheta\,v_{2\perp}\,dt=-\oint a_2\cos\beta_2\,dt<0$; (ii) no rigidly repeating history has $\dot\vartheta\,v_{1\perp}\le0$ at every instant, and none has $\dot\vartheta\,v_{2\perp}\ge0$ at every instant; (iii) on any history, for all $t_0<t_1$, $\bigl\lvert\int_{t_0}^{t_1}(\dot\vartheta\,v_{1\perp}-a_1\cos\beta_1)\,dt\bigr\rvert<2$ and $\bigl\lvert\int_{t_0}^{t_1}(\dot\vartheta\,v_{2\perp}+a_2\cos\beta_2)\,dt\bigr\rvert<2$.

*Proof.* $d\hat{\mathbf r}/dt=\dot\vartheta\,\hat{\boldsymbol\theta}$ and $d\hat{\boldsymbol\theta}/dt=-\dot\vartheta\,\hat{\mathbf r}$, so $\dot v_{i\parallel}=\hat{\mathbf r}\cdot\ddot{\mathbf x}_i+\dot\vartheta\,v_{i\perp}$ and $\dot v_{i\perp}=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_i-\dot\vartheta\,v_{i\parallel}$. With $\ddot{\mathbf x}_i=-a_i\mathbf n_i$: $\hat{\mathbf r}\cdot\ddot{\mathbf x}_1=-a_1\cos\beta_1$, $\hat{\mathbf r}\cdot\ddot{\mathbf x}_2=a_2\cos\beta_2$, and, from $\tau_1\mathbf n_1=\mathbf r+\boldsymbol\Delta_2$ and $\tau_2\mathbf n_2=-\mathbf r+\boldsymbol\Delta_1$, $\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_1=-a_1\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_2/\tau_1=a_1\sin\beta_1$ and $\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_2=-a_2\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_1/\tau_2=-a_2\sin\beta_2$. Positivity of $\cos\beta_i$ is the wake-front bound. For (i), $v_{i\parallel}$ is periodic, so the first line integrates to zero over a period. (ii) follows from the signs in (i). For (iii), $\lvert v_{i\parallel}\rvert<1$ at both ends. $\qquad\blacksquare$

*Check against a known identity.* Subtracting the second line's two equations and using $J=r(v_{1\perp}-v_{2\perp})$ gives $dJ/dt=r\,(a_1\sin\beta_1+a_2\sin\beta_2)$, the exploration's Theorem 1. Subtracting the first line's gives $\ddot r=r\dot\vartheta^2-a_1\cos\beta_1-a_2\cos\beta_2$.

*Reading.* Member $1$ is pulled along the axis toward its partner at every instant. Its velocity along the axis can stay bounded only because the axis turns while the member moves across it. Statement (i) says this must happen for each member separately, with a definite sign: averaged with the turning rate as weight, member $1$ moves across the axis in the sense of the turning, and member $2$ does so about member $1$ (which is $v_{2\perp}$ of the opposite sign). The difference of the two statements in (i), the first minus the second, is $\oint r\dot\vartheta^2\,dt=\oint(a_1\cos\beta_1+a_2\cos\beta_2)\,dt$, which is the statement that $\ddot r$ has zero period average. The identity $\dot v_{i\parallel}=\hat{\mathbf r}\cdot\ddot{\mathbf x}_i+\dot\vartheta\,v_{i\perp}$ appears in passing in the exploration's list of failed corrected quantities; its member-wise averages and the exclusion (ii) are not stated there. The accepted note's condition 6 (zero mean acceleration of each member) is the fixed-frame counterpart and does not hold for rotation about a fixed centre, whereas (i) does.

## The rate of the relative angular momentum on curved windows

Define the largest acceleration of each member over the window of the row its partner is receiving, and the corresponding allowance:

$$
\bar a_1(t)=\max_{s_2(t)\le u\le t}\lvert\ddot{\mathbf x}_1(u)\rvert,\quad
\bar a_2(t)=\max_{s_1(t)\le u\le t}\lvert\ddot{\mathbf x}_2(u)\rvert,\qquad
\epsilon_1=\tfrac12\tau_2\,\bar a_1,\quad\epsilon_2=\tfrac12\tau_1\,\bar a_2 .
$$

**Lemma 3 (aberration and present velocity; derived).** $\lvert\sin\beta_2-v_{1\perp}\rvert\le\epsilon_1$ and $\lvert\sin\beta_1+v_{2\perp}\rvert\le\epsilon_2$.

*Proof.* For $u$ in $[s_2,t]$, $\mathbf v_1(u)=\mathbf v_1(t)-\int_u^t\ddot{\mathbf x}_1$, so $\boldsymbol\Delta_1=\int_{s_2}^t\mathbf v_1(u)\,du=\tau_2\mathbf v_1(t)-\int_{s_2}^t(u'-s_2)\,\ddot{\mathbf x}_1(u')\,du'$, and the last integral has length at most $\tfrac12\tau_2^2\bar a_1$. Take the component along $\hat{\boldsymbol\theta}(t)$ and divide by $\tau_2$. The second statement is the same with the members exchanged and $\tau_1\sin\beta_1=-\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_2$. $\qquad\blacksquare$

In words: the sine of the aberration angle at a member equals the partner's present velocity across the axis, taken in the sense of motion about the receiver, to within half the delay times the partner's largest acceleration over the window. For straight windows the allowance is zero and the statement is exact. The lemma is kinematic: it holds for every twice differentiable pair of paths below wake speed.

**Theorem E (rate bound; derived).** Along any history of the setting that obeys the equation,

$$
\Bigl\lvert\frac{dJ}{dt}-\frac{a_1+a_2}{2}\,J-\frac{r\,(a_2-a_1)}{2}\,(v_{1\perp}+v_{2\perp})\Bigr\rvert\le r\,(a_2\,\epsilon_1+a_1\,\epsilon_2).
$$

Equivalently $r\,[a_2(v_{1\perp}-\epsilon_1)+a_1(-v_{2\perp}-\epsilon_2)]\le dJ/dt\le r\,[a_2(v_{1\perp}+\epsilon_1)+a_1(-v_{2\perp}+\epsilon_2)]$.

*Proof.* For a solution $dJ/dt=r\,(a_1\sin\beta_1+a_2\sin\beta_2)$. Insert Lemma 3 and use $a_2v_{1\perp}-a_1v_{2\perp}=\tfrac12(a_1+a_2)(v_{1\perp}-v_{2\perp})+\tfrac12(a_2-a_1)(v_{1\perp}+v_{2\perp})$ with $v_{1\perp}-v_{2\perp}=J/r$. $\qquad\blacksquare$

*Kinematic core.* On an arbitrary pair of prescribed paths the same inequality holds with $dJ/dt$ replaced by the torque of the formal rows, $r\,(a_1\sin\beta_1+a_2\sin\beta_2)$, where $a_i$ is the row strength computed from the paths and $\bar a_i$ is the paths' own largest acceleration over the window. Prescribed paths' accelerations need not equal the rows, so for them this torque is not the rate of their own $J$. The instrument tests this kinematic core and nothing more.

The three pieces have separate meanings. The first is the first-order gain, close to $J/r^2$ for a slow pair. The second is the common-velocity term: it is the product of the difference of the two row strengths, which the pair's motion along its axis produces, and the pair's common velocity across its axis; it does not vanish with $J$ and takes either sign. This is the second-order term of the exploration's straight-window form. The third is the allowance for curvature, and it is the new part.

**Explicit form for a uniform speed bound.** Let both speeds be at most $w<\tfrac13$ at all times. The following are elementary (derived; each was checked on prescribed paths).

- (B1) $r/(1+w)\le\tau_i\le r/(1-w)$, because $\tau_1=\lvert\mathbf r+\boldsymbol\Delta_2\rvert$ and $\lvert\boldsymbol\Delta_2\rvert\le w\tau_1$.
- (B2) $1-w\le D_i\le1+w$, hence $a_-\le a_i\le a_+$ with $a_-=(1-w)^2/((1+w)r^2)$ and $a_+=(1+w)^2/((1-w)r^2)$.
- (B3) For $u$ in either window, $r(u)\ge r-2w(t-u)\ge r\,(1-3w)/(1-w)$.
- (B4) By (B2) applied at time $u$ and (B3), $\bar a_i\le(1+w)^2(1-w)/((1-3w)^2r^2)$, hence $\epsilon_i\le(1+w)^2/(2(1-3w)^2r)$.
- (B5) $\lvert\sin\beta_i\rvert\le w$ (second reading, Correction 2), hence $\cos\beta_i\ge\sqrt{1-w^2}$.

Step (B4) is the only one that uses the equation: it identifies each member's acceleration at every instant of the window with the strength of the row it receives then. Inserting (B1) to (B4) in Theorem E, with $\lvert a_2-a_1\rvert\le a_+-a_-=(6w+2w^3)/((1-w^2)r^2)$, $\lvert v_{1\perp}+v_{2\perp}\rvert\le2w$ and $a_j\epsilon_i=\bar a_i/(2\tau_jD_j)$, gives for $J>0$

$$
r^2\,\frac{dJ}{dt}\ \ge\ \frac{(1-w)^2}{1+w}\,J-\frac{(6w^2+2w^4)\,r}{1-w^2}-\frac{(1+w)^3}{(1-3w)^2},
$$

and the mirror statement for $J<0$.

**Corollary E1 (derived).** With speeds at most $w<\tfrac13$ at all times, $dJ/dt>0$ at every instant at which $J>j_E(w,r)$, and $dJ/dt<0$ at every instant at which $J<-j_E(w,r)$, where

$$
j_E(w,r)=\frac{1+w}{(1-w)^2}\Bigl[\frac{(6w^2+2w^4)\,r}{1-w^2}+\frac{(1+w)^3}{(1-3w)^2}\Bigr].
$$

No history with that speed bound and $\lvert J\rvert>j_E(w,r)$ at every instant is $J$-periodic, and every $J$-periodic history with that speed bound has an instant with $\lvert J\rvert\le j_E(w,r)$.

Values (float evaluation): $j_E=0.0026\,r+1.28$ for $w=0.02$; $0.0175\,r+1.86$ for $w=0.05$; $0.0826\,r+3.69$ for $w=0.1$; $0.1407\,r+5.36$ for $w=\tfrac18$. For orientation only: the leading-order, no-delay relation for a circular relative orbit with no common velocity and relative speed $2w$ is $r=1/(2w^2)$, $J=1/w$; for $w=0.1$ that is $J=10$ against $j_E=7.8$, and for $w=\tfrac18$ it is $J=8$ against $j_E=9.9$. This compares sizes. It is not a statement that any complete delayed history has those values or satisfies the hypothesis at every instant. On that comparison, states with little common velocity fall on the covered side when slow enough, and states whose common speed is comparable with the square root of their relative speed do not. That boundary is the one the exploration named; Corollary E1 turns the covered side into a statement with an error bound. It is an exclusion of a class that may contain no complete history.

## Constant relative angular momentum

**Proposition G (structure of the alternative, and the obstruction; derived).** Let $J$ be constant on a $J$-periodic history. Then:

1. $J\ne0$, $\vartheta$ is strictly monotone, and after a reflection $J>0$. Over each delay window the separation direction advances by an angle strictly between $0$ and a half turn, the two mirror-like terms $g_i$ of the accepted note are strictly positive, and for every reference point $\lambda$ in $[0,1]$ the centre term is $C_\lambda=-G_\lambda<0$.
2. The condition $dJ/dt=0$ is the single scalar equation $a_1\sin\beta_1+a_2\sin\beta_2=0$ at each instant. Equivalently the two members have the same acceleration across the axis, $\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_1=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_2=:q$. Equivalently the two aberration angles are of opposite sign, or both zero, at every instant, with $a_1\lvert\sin\beta_1\rvert=a_2\lvert\sin\beta_2\rvert$. Equivalently $W_2\,\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_1=W_1\,\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_2$ with $W_i=1/(\tau_i^3D_i)$: over the two windows the two members have moved to the same side of the present axis.
3. With $\mathbf c=\tfrac12(\mathbf x_1+\mathbf x_2)$ the midpoint and $\mathbf c^*=\tfrac12(\mathbf x_1(s_2)+\mathbf x_2(s_1))$ the midpoint of the two emission points, $q=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf c}=-2\,\frac{W_1W_2}{W_1+W_2}\,\hat{\boldsymbol\theta}\cdot(\mathbf c-\mathbf c^*)$.
4. By Theorem E, at every instant $\lvert a_2v_{1\perp}-a_1v_{2\perp}\rvert\le a_2\epsilon_1+a_1\epsilon_2$.
5. **Obstruction.** For every $\lambda$, $G_\lambda+C_\lambda=dJ/dt$ by the definition of the split. The requirement that the cancellation hold for every $\lambda$, both endpoints included, with the instant-selected $\lambda$ frozen across the delayed evaluations, is therefore the one equation of statement 2 and carries no further information. The family of reference points yields the strict signs of statement 1 and nothing else.

*Proof.* (1) If $J\equiv0$ then $\vartheta$ is constant and the last step of the accepted note's Theorem A gives $\ddot r<0$ throughout, which a periodic $r$ cannot have. So $J$ is a nonzero constant and $\dot\vartheta=J/r^2$ has one sign. With $J>0$, $\vartheta(t)-\vartheta(s_i)>0$, and it is below a half turn by the wake-front bound, so $g_i=W_i\,r(t)\,r(s_i)\sin(\vartheta(t)-\vartheta(s_i))>0$, $G_\lambda=\lambda g_1+(1-\lambda)g_2>0$ and $C_\lambda=dJ/dt-G_\lambda=-G_\lambda$. (2) The first form is Theorem 1 of the exploration; the second is Proposition D, second line; the third and fourth restate it, using $a_i>0$ and $\tau_2\sin\beta_2=\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_1$, $\tau_1\sin\beta_1=-\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_2$. (3) From $q=-W_1\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_2=-W_2\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_1$, $\hat{\boldsymbol\theta}\cdot(\boldsymbol\Delta_1+\boldsymbol\Delta_2)=-q\,(W_1+W_2)/(W_1W_2)$, and $\boldsymbol\Delta_1+\boldsymbol\Delta_2=2(\mathbf c-\mathbf c^*)$; $\hat{\boldsymbol\theta}\cdot\ddot{\mathbf c}$ is the mean of two equal numbers. (4) is Theorem E with $dJ/dt=0$. (5) $C_\lambda$ was defined in the accepted note as the remainder of the exact rate after $G_\lambda$. $\qquad\blacksquare$

Statement 2 in its third form is the case that the second reading's Correction 6 pointed out as not excluded: two aberration angles of opposite signs. Statement 3 says that in a constant-$J$ history the pair's midpoint is accelerated across the axis toward the side from which the two rows were emitted, in proportion to how far it has moved across. No contradiction was derived from it.

**Theorem F (no constant $J$ in the declared class; derived).** Consider a history of the setting on which, for all times, both speeds are at most $w$ with $w\le0.14$, and on a half-line $t\ge t_0$ the separation is at most $r_{\max}$ and $J>j_F(w)$, where

$$
j_F(w)=\frac{(1+w)^2}{(1-3w)^2},\qquad
\kappa(w)=\frac{(1-w)^2\sqrt{1-w^2}}{1+w}-\frac{w\,(1+w)^2}{(1-3w)^2}>0 .
$$

Then every interval of length greater than $2w\,r_{\max}^2/\kappa(w)$ in that half-line contains an instant at which both aberration angles are positive and $dJ/dt>0$. In particular $J$ is not constant on any such interval, and no $J$-periodic history satisfying these conditions at all times has constant $J$. The mirror statement holds for $J<-j_F(w)$.

*Proof.* Put $\Phi=v_{1\perp}-\epsilon_1$ and $\Psi=-v_{2\perp}-\epsilon_2$. Both are continuous, because $s_i$ and the accelerations are continuous. By Lemma 3, $\sin\beta_2\ge\Phi$ and $\sin\beta_1\ge\Psi$. By (B4), $\Phi+\Psi=J/r-\epsilon_1-\epsilon_2\ge(J-j_F(w))/r>0$ on the half-line, so at each instant $\Phi>0$ or $\Psi>0$.

Let $I$ be an interval of the half-line of length $L$, and suppose there is no instant of $I$ at which both are positive. The sets $\{\Phi>0\}$ and $\{\Psi>0\}$ are then disjoint, relatively open in $I$, and cover $I$; since $I$ is connected, one of them is empty.

If $\Phi\le0$ throughout $I$, then $v_{1\perp}\le\epsilon_1$, and since $\dot\vartheta>0$, Proposition D gives $\dot v_{1\parallel}\le-(a_1\cos\beta_1-\dot\vartheta\,\epsilon_1)$. By (B2) and (B5), $a_1\cos\beta_1\ge(1-w)^2\sqrt{1-w^2}/((1+w)r^2)$. By (B4) and $\dot\vartheta=(v_{1\perp}-v_{2\perp})/r\le2w/r$, $\dot\vartheta\,\epsilon_1\le w\,(1+w)^2/((1-3w)^2r^2)$. Hence $\dot v_{1\parallel}\le-\kappa(w)/r^2\le-\kappa(w)/r_{\max}^2$ on $I$, and $v_{1\parallel}$ falls by at least $\kappa L/r_{\max}^2$ across $I$. But $\lvert v_{1\parallel}\rvert\le w$, so $L\le2w\,r_{\max}^2/\kappa$.

If $\Psi\le0$ throughout $I$, then $v_{2\perp}\ge-\epsilon_2$ and $\dot v_{2\parallel}\ge a_2\cos\beta_2-\dot\vartheta\,\epsilon_2\ge\kappa(w)/r_{\max}^2$, with the same conclusion.

So an interval longer than $2w\,r_{\max}^2/\kappa$ contains an instant with $\Phi>0$ and $\Psi>0$, where both aberration sines are positive and $dJ/dt=r\,(a_1\sin\beta_1+a_2\sin\beta_2)>0$. It remains to show $\kappa(w)>0$ for $0\le w\le\tfrac7{50}$. The function $\kappa$ is decreasing on $[0,\tfrac13)$: its first term is a product of decreasing positive factors divided by an increasing one, and its second term, $w(1+w)^2/(1-3w)^2$, is increasing. Since $\sqrt{1-w^2}\ge1-w^2$, the first term is at least $(1-w)^2(1-w^2)/(1+w)=(1-w)^3$. At $w=\tfrac7{50}$ this gives

$$
\kappa\bigl(\tfrac7{50}\bigr)\ \ge\ \Bigl(\frac{43}{50}\Bigr)^3-\frac{7}{50}\cdot\frac{57^2}{29^2}=\frac{79507}{125000}-\frac{22743}{42050}=\frac{10007887}{105125000}>\frac{9}{100}.
$$

Hence $\kappa(w)\ge\kappa(\tfrac7{50})>0$ on the stated range (exact rational arithmetic, as in the Codex review's N3; the float value $\kappa(0.14)=0.1015$ is a comparison only). $\qquad\blacksquare$

Values: $j_F=1.18$, $1.53$, $2.47$, $3.24$, $3.86$ for $w=0.02$, $0.05$, $0.1$, $\tfrac18$, $0.14$. The zero of $\kappa$ is near $w=0.1476$ (bisection in floats, a measured comparison and not part of the proof); the theorem is stated only up to $0.14$.

*What the proof uses.* If member $1$ never moved across the axis in the sense of the turning by more than the allowance, nothing would offset the pull along the axis, and its velocity along the axis would decrease without bound. So each member must at times move forward across the axis by more than the allowance. Since the two forward margins $\Phi$ and $\Psi$ always sum to something positive, the times at which each is positive cannot be kept apart, and at a common time both rows turn the pair forward. The threshold on $J$ is what makes the sum positive; the speed bound is what makes the allowance small beside the pull.

*Reach.* The conclusion is conditional on the whole history staying in the declared class: speeds at most $w\le0.14$ at all times, and bounded separation with $J>j_F(w)$ strictly on the half-line. The theorem places no condition on the common velocity other than the speed bound, so the class admits a common velocity that is large beside the relative velocity. Corollary E1 does not cover such states, and the hypothesis of the accepted note's Theorem B was measured to fail on releases with a large common velocity. For orientation only, the leading-order no-delay relation for a circular relative orbit at relative speed $\varepsilon$ gives $r\approx2/\varepsilon^2$ and $J\approx2/\varepsilon\ge1/w$, above $j_F(w)$ for every $w\le0.14$; this is a comparison of sizes and not a proof that a complete delayed history lies in the class. The theorem does not reach: any history with a speed above $0.14$ at some time; any history whose $J$ reaches $j_F(w)$ or less at some instant of the half-line, whatever its speeds, so slow histories of low $J$ are open; unbounded separation; and histories with no uniform speed bound. A small $J$ does not by itself mean a close or fast pair. With $\int^\infty r^{-2}dt=\infty$ in place of bounded separation the proof still gives non-constancy on the half-line, without the interval length.

**Corollary F1 (the alternatives inside the declared class; derived).** Let a $J$-periodic history have both speeds at most $w\le0.14$ at all times and $J>j_F(w)$ at all times. Then the separation direction never turns back, $J$ is not constant, and there is an instant at which $dJ/dt<0$. At every such instant: $J\le j_E(w,r)$; exactly one of $v_{1\perp}<\epsilon_1$, $-v_{2\perp}<\epsilon_2$ holds; and if it is the first, then $a_2\,(\epsilon_1-v_{1\perp})>a_1\,(-v_{2\perp}-\epsilon_2)>0$ and $a_2>a_1$, with the mirror statement for the second.

*Proof.* $\dot\vartheta=J/r^2>0$, so there is no turning back; the separation is bounded because $r$ is periodic, so Theorem F applies and $dJ/dt>0$ somewhere; a periodic $J$ must then decrease somewhere. At an instant with $dJ/dt<0$, Corollary E1 gives $J\le j_E$, and Theorem E gives $a_2\Phi+a_1\Psi<0$ with $\Phi+\Psi>0$ in the notation of Theorem F's proof: one of $\Phi$, $\Psi$ is negative, not both, and if $\Phi<0$ then $\Psi>-\Phi>0$, so $a_2(-\Phi)>a_1\Psi$ forces $a_2>a_1$. $\qquad\blacksquare$

In the accepted note's terms, and only for $J$-periodic histories that satisfy the three conditions at every instant: alternative (a), constant $J$, is excluded; the amount turned back is zero at every instant, so alternative (c), a loss not bounded by the amount turned back, holds exactly when alternative (b) does; and (b), a loss with no turning back, is forced. The earlier logical structure is unchanged outside this class, and failure of every uniform fraction below one still does not imply attainment of the ratio one.

## What is missing

1. **Constant $J$ outside the class of Theorem F.** *Missing proposition M1:* there is no complete history of the setting, of bounded separation, on which $\vartheta$ is strictly increasing and $W_2\,\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_1=W_1\,\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_2$ at every instant of a half-line. Theorem F proves M1 when $w\le0.14$ and $J>j_F(w)$. The proof needs the sign of each window displacement across the axis to be the sign of the member's present velocity across the axis. Exactly, $\hat{\boldsymbol\theta}(t)\cdot\boldsymbol\Delta_1=\int_{s_2}^t[v_{1\perp}(u)\cos\psi-v_{1\parallel}(u)\sin\psi]\,du$ with $\psi=\vartheta(t)-\vartheta(u)$ in $[0,\pi)$, and the second term, the member's motion along the earlier axis seen across the present one, is not controlled when the axis turns appreciably during a window. The proof of Theorem F controls it only through the allowance, which requires $J>j_F(w)$ and $w\le0.14$. Outside those conditions, which includes slow histories whose $J$ is at or below the threshold as well as fast ones, the two window displacements can vanish together and change sign together while $v_{1\perp}-v_{2\perp}=J/r$ stays positive, and nothing here prevents it. Unbounded separation and histories without a uniform speed bound are also outside.
2. **Loss with no turning back.** *Missing proposition M2:* for a rigidly repeating history, $\oint r\,(a_2-a_1)(v_{1\perp}+v_{2\perp})\,dt>-\oint(a_1+a_2)\,J\,dt+2\oint r\,(a_2\epsilon_1+a_1\epsilon_2)\,dt$, or any averaged inequality with the same effect. By Theorem E this would give $\oint(dJ/dt)\,dt>0$ and exclude the history. It is the averaged control of the common-velocity term, and it is open for every rigidly repeating history, inside the class of Corollary F1 and outside it. The second reading showed that at leading order for slow pairs this term is the direction-dependent part of a gradient and exchanges $J$ back and forth; M2 is the statement that the exchange cannot cancel the first-order gain over a period. Theorem E supplies a pointwise error term that an averaging proof under a uniform speed bound could use; the averaging itself is not done here, and no claim is made that it succeeds.
3. **The loss-to-turnback bound.** Outside the class of Corollary F1 this avenue was not advanced. The counterexample to a universal centre-dominance bound stands, and no estimate of the form $dJ/dt\ge-K\varrho$ was derived from the coupled equations.

## Approaches that did not give a result

- **Using the whole family of reference points.** Stops at Proposition G, statement 5.
- **Excluding the sub-case $q\equiv0$ of constant $J$, in which neither member is accelerated across the axis.** Then $\dot v_{i\perp}=-\dot\vartheta\,v_{i\parallel}$ and every row lies along the present axis, so both aberration angles vanish identically. The exploration's Theorem 2 does not apply, because it needs the angles not both identically zero. Lemma 3 gives $\lvert v_{1\perp}\rvert\le\epsilon_1$ and $\lvert v_{2\perp}\rvert\le\epsilon_2$, hence $J/r\le\epsilon_1+\epsilon_2$, which under a uniform speed bound $w<\tfrac13$ excludes it when $J>j_F(w)$ but not otherwise. No general exclusion was found.
- **A sign for $q$.** From Proposition D, $\oint q\,dt=\tfrac12\oint\dot\vartheta\,(v_{1\parallel}+v_{2\parallel})\,dt$ in a rigidly repeating constant-$J$ history, and $d(\tfrac12\lvert\mathbf v_1\rvert^2)/dt=-a_1\cos\beta_1\,v_{1\parallel}+q\,v_{1\perp}$. Neither has a sign.
- **An exact form of the connectedness argument.** Replacing present velocities by window displacements removes the allowance, but the difference of the two window-mean velocities across the axis is then not a multiple of $J$, because the two windows have different lengths and the axis turns within them; the sum that is positive in Theorem F is lost.
- **Averaging Theorem E over a period without further input.** The common-velocity term has no sign and is of second order in the common speed, against a gain of first order in the relative speed; this is the exploration's obstruction, unchanged.

## Instrument

[`window_bounds_check.py`](../evidence/saturday-nonmirror-periodicity-2026-10-11/window_bounds_check.py), described in the [evidence README](../evidence/saturday-nonmirror-periodicity-2026-10-11/README.md), was written in this session and uses the standard library only. It solves the single partner root by bisection on prescribed analytic paths and evaluates the row formulas. The paths are prescribed and do not obey the equation. The quantity the script calls `rate` is the torque of the formal rows, $r\,(a_1\sin\beta_1+a_2\sin\beta_2)$ with $a_i$ computed from the paths; it is not the rate of change of those paths' own $J$.

**Known cases, run first, passed before any target.** 400 pairs of straight uniform paths: the formal row torque against the exploration's closed form, and against the zero-curvature case of Theorem E's kinematic core, which is an equality (largest scaled error $5\times10^{-15}$). The rigid mirror circle of radius $1$ and rate $0.5$, against the recorded $\tau=1.800734445179$ and $\beta=0.450183611295$ (errors below $10^{-11}$).

**Target T1, what passed.** On 2399 pairs of curved prescribed paths: Lemma 3, with each path's own acceleration evaluated at 41 sample points of the window, and both sides of the kinematic core of Theorem E with the same sampled accelerations, held in every sample (smallest normalised margins $0.006$, $0.083$, $0.094$; the formal torque was positive in 1659 samples and negative in 740). A maximum over 41 sample points is a finite check, not an enclosure of the maximum over the window. Replacing the true maximum by a sampled value that cannot exceed it makes the tested inequality stricter than the lemma, so a pass is consistent with the lemma but certifies nothing between sample points.

**Target T2, what passed.** On the 2033 of those pairs with analytic speed bound below $0.32$: the kinematic bounds (B1), (B2), (B3) and (B5) held; the row strength at 13 sample points of each window stayed below the bound of (B4), which is a finite check of the row-strength form of (B4) and says nothing about the paths' own accelerations. The explicit inequality was not tested against the formal torque or against any rate. What was tested is an algebraic substitute: the linear part $r\,(a_2v_{1\perp}-a_1v_{2\perp})$, less the allowance computed with the (B4) bound put in place of the window's actual curvature, against the explicit right side (held in every sample; right side positive in 724). The lower bound for $J/r-\epsilon_1-\epsilon_2$ and the pointwise inequality used in the proof of Theorem F, on 1730 samples with $w\le0.1476$, were tested with the same substitution. These checks confirm that the constants follow from (B1) to (B5) by the stated algebra. They are conditional on (B4), which holds for solutions and was not, and could not be, tested on prescribed paths.

**What this can and cannot establish.** It can show that the kinematic inequalities are not contradicted at the sampled points of these prescribed paths and that the constants were transcribed consistently. It establishes nothing about solutions. It does not test Proposition D (i) and (ii), Corollary E1, Theorem F or Corollary F1. It is not independent evidence for the hand derivations.

**Provenance.** The final instrument ran once, in 1.967 seconds of wall time by the supervisor's record. Two earlier attempts preceded it: an import failure after 0.404 seconds, and a first complete version that ran 1.139 seconds. Their sources were not kept as files at the time. Both were recovered afterwards from the session transcript; applying the two recorded edits in order to the recovered first source reproduces the final instrument byte for byte, and a rerun of the recovered second source reproduces the retained second-attempt output byte for byte. The README gives identities. The import failure was a dynamic-loader error in SciPy's `_spropack` module on this host; its cause was not investigated and is unresolved, and no conclusion about other SciPy use is drawn.

## Limits

Planar motion, opposite polarity, speeds strictly below wake speed, positive separation, twice continuously differentiable complete paths and a partner row at every instant are assumed throughout. Root existence is automatic only under a uniform speed bound or a strictly subwake drift plus bounded motion; otherwise it is assumed. Corollary E1, Theorem F and Corollary F1 need a speed bound that holds uniformly over the whole history, and Theorem F and Corollary F1 also need bounded separation (or the stated integral condition) and $J$ strictly above $j_F(w)$ at every instant concerned. A history that leaves any of these conditions at some time is outside them, however slow it is: slow histories of low $J$, unbounded separation and histories without a uniform margin are unresolved. The leading-order circular comparison is not an admission theorem; no complete delayed history is shown to lie in any class named here. Proposition D (i) and (ii) hold for rigidly repeating histories and are not claimed for a rotating frame whose centre drifts. The excluded classes may contain no complete history at all. No candidate repeating history was constructed or searched for; no solution was integrated. The explicit constants are not sharp. Theorems E and F are single-session hand proofs with one separate reconstruction by the Codex review; the instrument tests neither on solutions.

## Falsifiers

- A pair of twice differentiable planar paths below wake speed at which $\lvert\sin\beta_2-v_{1\perp}\rvert>\epsilon_1$, with $\bar a_1$ the true largest acceleration over the window, refutes Lemma 3, and one at which the formal row torque $r\,(a_1\sin\beta_1+a_2\sin\beta_2)$ lies outside the bounds refutes the kinematic core of Theorem E. Prescribed paths suffice for these two only. A prescribed path whose own $dJ/dt$ lies outside the bounds refutes nothing, because it need not obey the equation; Theorem E itself is refuted only by a solution.
- A pair of paths with speeds at most $w<\tfrac13$ at all times violating one of (B1), (B2), (B3), (B5), or a solution of the equation violating (B4), refutes the explicit form and with it Corollary E1 and Theorem F as stated.
- A complete solution with speeds at most $w<\tfrac13$ and an instant at which $J>j_E(w,r)$ and $dJ/dt\le0$ refutes Corollary E1.
- A complete solution with speeds at most $w\le0.14$, separation at most $r_{\max}$ and $J>j_F(w)$ on a half-line, with $dJ/dt\le0$ throughout an interval of that half-line longer than $2w\,r_{\max}^2/\kappa(w)$, refutes Theorem F.
- A rigidly repeating solution with $\oint\dot\vartheta\,v_{1\perp}\,dt\le0$ or $\oint\dot\vartheta\,v_{2\perp}\,dt\ge0$ refutes Proposition D.
- A $J$-periodic solution with constant $J$ on which the two aberration angles have the same strict sign at some instant, or on which $\vartheta$ is not strictly monotone, refutes Proposition G.
- Any certified repeating history of an opposite pair below wake speed answers the question. It should be checked first against Proposition D (i), against Corollary E1 at its instants of loss, and against the alternatives of the accepted note.

## Next steps suggested by this note

For repeating histories that stay inside the class of Corollary F1 at all times, one alternative remains: a loss of $J$ with no turning back. The slow regime as a whole is not reduced to that alternative, because slow histories whose $J$ reaches the threshold, histories of unbounded separation and histories without a uniform speed bound are outside the class. A possible continuation is M2 for rigidly repeating histories under a uniform speed bound: bound the period average of the common-velocity term using the equations for the common velocity, in the way the second reading's reduced model suggests, with Theorem E's allowance as the error term. Outside the class the open item for constant $J$ is M1; a certified search for a constant-$J$ candidate would be guided by Proposition G, statements 2 to 4, which are cheap to test on a trial path. Neither continuation is commissioned by this note.

## M2 continuation: the averaged common-velocity term

This section was added after the checkpoint above was reviewed and its statements accepted; it changes none of them. It records the continuation released at 20:04Z on 2026-10-11: an attempt at the missing proposition M2 for complete rigidly repeating solutions, $\mathbf x_i(t+T)=R\,\mathbf x_i(t)+\mathbf d$ with one fixed rotation $R$ and one fixed vector $\mathbf d$. It is not a statement about $J$-periodic histories in general or about rotation about a drifting centre, for which the common velocity's components along and across the axis do not repeat. No invariance of the law under a moving or rotating frame is used. The section was corrected after the [Codex review](saturday-nonmirror-periodicity-codex-review-2026-10-11.md) of the continuation (findings A1 to A3), which reconstructs Propositions H, I and K separately.

### Result of the continuation

**M2 is not proved. The result is a set of exact identities and a residual with no established sign.**

1. **Exact equations for the common velocity (derived).** The pair's velocity sum, resolved along and across the turning axis, obeys two exact equations driven by the corresponding components of the sum of the two rows (Proposition H).
2. **Exact averaged identities (derived).** Over a period of a rigidly repeating solution, three averages of the common velocity are fixed exactly, and the period integral of the common-velocity term in the rate of $J$ is written exactly as minus a term $\Lambda$, minus a breathing term $B$, plus a strength-difference term $Z$ (Proposition I). None of $\Lambda$, $B$, $Z$ has an established sign or size.
3. **One weighted average with an exact expression (derived).** The product of the common velocity's two components, integrated with the weight $\dot\vartheta\,(1+1/(2r))$, equals minus the integral of $\tfrac12(a_1+a_2)$ times the square of the common velocity across the axis, plus two remainders (Proposition K). The identity is exact. It does not establish the sign of that weighted average, because the remainders are not bounded, and it does not establish the sign of the common-velocity term, which carries a different weight.
4. **A formal comparison, not a result about the law (inferred within a declared auxiliary approximation).** If the relative orbit is prescribed as a circle with fixed $r$ and $J$, the leading quadratic torque is used, and the common velocity evolves by its leading equation to first order in $1/J$, the common-velocity term removes $2\pi V_0^2r/J^2$ per turn against a gain of $2\pi$. This suggests that M2, if true, is a comparison of sizes and not a cancellation. No error bound connects this to the delayed law.
5. **Smallest additional propositions (stated, not proved):** a curved-window bound for the difference of the two row strengths (S1), control of the breathing term (S2), and a bound on the term $\Lambda$ against the gain (S3).

Claim grade: Propositions H, I and K are hand derivations of one session, supported by the separate reconstruction in the Codex review. Item 4 is a formal calculation in an auxiliary model that is not a solution of the coupled equations; it carries no error bound and excludes nothing. No instrument was written or run for this section.

### Definitions

All quantities are evaluated along a solution of the setting. The velocity sum is $\mathbf P=\mathbf v_1+\mathbf v_2$ (twice the common velocity $\mathbf V$), with parts $P_\parallel=v_{1\parallel}+v_{2\parallel}$ along the axis and $P_\perp=v_{1\perp}+v_{2\perp}$ across it, and $Q=P_\parallel^2-P_\perp^2$. Write $\mathbf A_i=-a_i\mathbf n_i$ for the row received by member $i$; along a solution $\ddot{\mathbf x}_i=\mathbf A_i$. The sum of the two rows has the parts

$$
A_\parallel=\hat{\mathbf r}\cdot(\mathbf A_1+\mathbf A_2)=a_2\cos\beta_2-a_1\cos\beta_1,\qquad
A_\perp=\hat{\boldsymbol\theta}\cdot(\mathbf A_1+\mathbf A_2)=a_1\sin\beta_1-a_2\sin\beta_2 .
$$

The mean and half-difference of the row strengths are $\mu=\tfrac12(a_1+a_2)$ and $\delta=\tfrac12(a_2-a_1)$. Four remainders are defined exactly:

$$
e_J=a_1(\sin\beta_1+v_{2\perp})+a_2(\sin\beta_2-v_{1\perp}),\qquad
e_P=a_1(\sin\beta_1+v_{2\perp})-a_2(\sin\beta_2-v_{1\perp}),
$$

$$
\chi=a_2(1-\cos\beta_2)-a_1(1-\cos\beta_1),\qquad
\zeta=2r^2\delta-P_\parallel .
$$

$e_J$ and $e_P$ are curvature remainders: by Lemma 3, $\lvert e_J\rvert\le a_2\epsilon_1+a_1\epsilon_2$ and $\lvert e_P\rvert\le a_2\epsilon_1+a_1\epsilon_2$, and both vanish for straight windows. $\chi$ is of second order in speed: under a uniform bound $w$, each of its two terms lies between $0$ and $a_+w^2$ by (B2) and (B5), so $\lvert\chi\rvert\le a_+w^2$. $\zeta$ compares the difference of the two row strengths with the common velocity along the axis; no bound for it on curved windows is established here.

### Exact relations at each instant

**Proposition H (derived).** Along any solution of the setting:

1. $\dot P_\parallel=A_\parallel+\dot\vartheta\,P_\perp$ and $\dot P_\perp=A_\perp-\dot\vartheta\,P_\parallel$.
2. $dJ/dt=\mu\,J+r\,\delta\,P_\perp+r\,e_J$.
3. $A_\perp=-\mu\,P_\perp-\delta\,J/r+e_P$.
4. $A_\parallel=2\delta-\chi$.
5. $\dot Q=2\,(A_\parallel P_\parallel-A_\perp P_\perp)+4\,\dot\vartheta\,P_\parallel P_\perp$, and $\tfrac{d}{dt}\lvert\mathbf P\rvert^2=2\,(A_\parallel P_\parallel+A_\perp P_\perp)$.

*Proof.* (1) is the sum of the two members' equations in Proposition D, which use $\ddot{\mathbf x}_i=\mathbf A_i$. (2) and (3): by the definitions of $e_J$ and $e_P$, $a_1\sin\beta_1+a_2\sin\beta_2=a_2v_{1\perp}-a_1v_{2\perp}+e_J$ and $a_1\sin\beta_1-a_2\sin\beta_2=-a_1v_{2\perp}-a_2v_{1\perp}+e_P$; and $a_2v_{1\perp}-a_1v_{2\perp}=\mu(v_{1\perp}-v_{2\perp})+\delta(v_{1\perp}+v_{2\perp})$, $-a_1v_{2\perp}-a_2v_{1\perp}=-\mu(v_{1\perp}+v_{2\perp})-\delta(v_{1\perp}-v_{2\perp})$, with $v_{1\perp}-v_{2\perp}=J/r$. Statement (2) is Theorem E before its remainder is bounded. (4) is the definition of $\chi$. (5) follows from (1) by differentiating: the terms $\pm2\dot\vartheta P_\parallel P_\perp$ add in $\dot Q$ and cancel in the derivative of $\lvert\mathbf P\rvert^2$. $\qquad\blacksquare$

Relations (2), (3) and (4) are algebra among the rows, the present velocities and the remainders; on prescribed paths they hold with the formal row torque $r\,(a_1\sin\beta_1+a_2\sin\beta_2)$ in place of $dJ/dt$. Relations (1) and (5) are evolution equations and hold only for solutions.

*Algebra check on a known kinematic case, done before the identities were used. It covers relations (2), (3) and (4) only.* Take two prescribed straight paths with the same constant velocity $\mathbf V$. These paths do not obey the equation: their actual accelerations are zero, so $\ddot{\mathbf x}_1+\ddot{\mathbf x}_2=\mathbf 0$, while the sum of the formal rows evaluated on them is not zero. The second reading's exact straight-window formulas give that sum as $\mathbf A_1+\mathbf A_2=(2/r^2)[2V_\parallel\hat{\mathbf r}-\mathbf V]$, so $A_\parallel=2V_\parallel/r^2=P_\parallel/r^2$ and $A_\perp=-2V_\perp/r^2=-P_\perp/r^2$; the straight-window strengths are $a_1=(1-V_\parallel/S)/r^2$, $a_2=(1+V_\parallel/S)/r^2$ with $S=\sqrt{1-V_\perp^2}$, so $\mu=1/r^2$, $\delta=V_\parallel/(Sr^2)$; and $\cos\beta_1=\cos\beta_2=S$, $e_J=e_P=0$, $J=0$. Then relation (3) reads $-P_\perp/r^2=-\mu P_\perp$, which holds; relation (4) reads $2V_\parallel/r^2=2V_\parallel/(Sr^2)-\chi$ with $\chi=2\delta(1-S)$, which holds; and relation (2), read for the formal row torque, gives $r\,\delta\,P_\perp=2V_\parallel V_\perp/(Sr)$, the exploration's closed form for a common velocity. In this case $\zeta=2V_\parallel(1/S-1)$, of third order in speed. This check does not test the evolution relations (1) and (5), which these paths violate, and it tests no period average.

### Exact averages over a period

**Proposition I (derived).** For a rigidly repeating solution, with all integrals over one period:

1. $\oint(A_\parallel P_\parallel+A_\perp P_\perp)\,dt=0$.
2. $\oint\dot\vartheta\,P_\parallel P_\perp\,dt=\oint A_\perp P_\perp\,dt=-\oint A_\parallel P_\parallel\,dt$.
3. $\oint\dot\vartheta\,Q\,dt=\oint(A_\parallel P_\perp+A_\perp P_\parallel)\,dt$.
4. If in addition $J$ has no zero, the period integral of the common-velocity term of Proposition H(2) is

$$
\mathcal C:=\oint r\,\delta\,P_\perp\,dt=-\Lambda-B+Z,
$$

$$
\Lambda=\oint\frac{r}{4J}\,(A_\parallel P_\parallel-A_\perp P_\perp)\,dt,\qquad
B=\oint\frac{Q}{8}\,\frac{d}{dt}\Bigl(\frac rJ\Bigr)dt,\qquad
Z=\oint\frac{\zeta\,P_\perp}{2r}\,dt ,
$$

and therefore $0=\oint\mu\,J\,dt-\Lambda-B+Z+\oint r\,e_J\,dt$.

*Proof.* In a rigidly repeating solution $\mathbf v_i(t+T)=R\,\mathbf v_i(t)$ and $\hat{\mathbf r}(t+T)=R\,\hat{\mathbf r}(t)$, so $P_\parallel$, $P_\perp$, $Q$ and $\lvert\mathbf P\rvert^2$ are periodic, as are $r$ and $J$. These recurrences are what make every boundary term below vanish; they fail for a rotating frame whose centre drifts. (1) is the period integral of the second relation in Proposition H(5). The first relation gives $\oint\dot\vartheta P_\parallel P_\perp=-\tfrac12\oint(A_\parallel P_\parallel-A_\perp P_\perp)$, and with (1) this is (2). For (3), $\tfrac{d}{dt}(P_\parallel P_\perp)=A_\parallel P_\perp+A_\perp P_\parallel-\dot\vartheta\,Q$ by Proposition H(1). For (4): by the definition of $\zeta$, $r\,\delta\,P_\perp=P_\parallel P_\perp/(2r)+\zeta P_\perp/(2r)$. With $\dot\vartheta=J/r^2$ and Proposition H(5), $P_\parallel P_\perp/(2r)=(r/(2J))\,\dot\vartheta P_\parallel P_\perp=(r/(8J))\,\dot Q-(r/(4J))(A_\parallel P_\parallel-A_\perp P_\perp)$. Integrate over a period: $\oint(r/(8J))\dot Q=-\oint(Q/8)\,\tfrac{d}{dt}(r/J)$ by parts, with no boundary term because $rQ/J$ is periodic. The last equation is the period integral of Proposition H(2), with $\oint dJ/dt=0$ because $J$ is periodic. $\qquad\blacksquare$

The last equation is M2 rewritten, not M2 proved. A repeating solution with $J$ of one sign exists only if the gain $\oint\mu J$, the terms $-\Lambda$, $-B$, $Z$ and the curvature term $\oint r\,e_J$ sum to zero; it is excluded if the gain can be shown to exceed the sum of the other four in size. The exact condition for the common-velocity term to remove $J$ over a period, $\mathcal C<0$, is $\Lambda+B>Z$. None of the three is bounded here, and in particular the breathing term $B$ is not shown to be of higher order than $\Lambda$.

**Proposition K (one weighted average of the product; derived).** For a rigidly repeating solution,

$$
\oint\dot\vartheta\,P_\parallel P_\perp\Bigl(1+\frac1{2r}\Bigr)dt=-\oint\mu\,P_\perp^2\,dt\;-\;\oint\dot\vartheta\,\frac{\zeta\,P_\perp}{2r}\,dt\;+\;\oint e_P\,P_\perp\,dt .
$$

*Proof.* By Proposition I(2) and Proposition H(3), $\oint\dot\vartheta P_\parallel P_\perp=\oint A_\perp P_\perp=-\oint\mu P_\perp^2-\oint\delta\,(J/r)\,P_\perp+\oint e_PP_\perp$. Since $J/r=r\dot\vartheta$ and $r\,\delta=(P_\parallel+\zeta)/(2r)$, $\delta\,(J/r)\,P_\perp=\dot\vartheta\,P_\parallel P_\perp/(2r)+\dot\vartheta\,\zeta P_\perp/(2r)$. Move the first of these to the left. $\qquad\blacksquare$

*What Proposition K does and does not give.* The first term on the right is never positive. The left side is negative if the absolute total of the two remainder integrals is smaller than $\oint\mu P_\perp^2\,dt$; that is not established. Even where it holds, it signs the product $P_\parallel P_\perp$ under the weight $\dot\vartheta\,(1+1/(2r))=(J/r^2)(1+1/(2r))$, whereas the leading part of the common-velocity term, $P_\parallel P_\perp/(2r)$, carries the weight $1/(2r)$. When $r$ and $J$ vary over the period a sign under one positive weight does not transfer to the other; the difference between the two weights is what the breathing term $B$ measures. Proposition K alone therefore does not establish the sign of $\mathcal C$.

### A formal one-turn comparison in an auxiliary model

This subsection is a formal calculation. It is not a statement about solutions of the Master Equation, it has no error bound, and it excludes nothing. Its purpose is to show what size the terms of Proposition I(4) might have, and so what kind of statement M2 would need to be.

*The auxiliary model and its choices.* (i) The relative orbit is prescribed, not solved for: a circle with constant $r$ and constant $J>0$, turning at the rate $\dot\vartheta=J/r^2$. (ii) The common-velocity term is replaced by its leading quadratic form for straight windows and small common speed, $r\,\delta\,P_\perp\to P_\parallel P_\perp/(2r)=-V^2\sin2\alpha/r$, where $\alpha$ is the angle from $\mathbf V$ to the axis; this drops $\zeta$, the factor $1/S$ and all curvature. (iii) The common velocity evolves by the leading form of Proposition H(1), $A_\parallel\to P_\parallel/r^2$, $A_\perp\to-P_\perp/r^2$, which is the accepted note's reduced relation $d\ln V/dt=\cos2\alpha/r^2$, $\dot\alpha=(J-\sin2\alpha)/r^2$. (iv) Everything is expanded to first order in $1/J$. Because $r$ and $J$ are held fixed while the term being computed would change $J$, the model is not a self-consistent solution even of the reduced coupled system.

*The calculation.* With $dt=r^2\,d\alpha/(J-\sin2\alpha)$ and $\alpha=0$ at the start, $d\ln V^2/d\alpha=2\cos2\alpha/(J-\sin2\alpha)=2\cos2\alpha/J+\cdots$, so $V^2=V_0^2\,(1+\sin2\alpha/J+\cdots)$. The integral of the leading torque over one turn of $\alpha$ is

$$
-\int_0^{2\pi}\frac{V^2r\sin2\alpha}{J-\sin2\alpha}\,d\alpha
=-V_0^2\,r\int_0^{2\pi}\Bigl[\frac{\sin2\alpha}{J}+\frac{2\sin^22\alpha}{J^2}+\cdots\Bigr]d\alpha
=-\frac{2\pi V_0^2\,r}{J^2}+\cdots ,
$$

using $\int_0^{2\pi}\sin2\alpha\,d\alpha=0$ and $\int_0^{2\pi}\sin^22\alpha\,d\alpha=\pi$. Half of the coefficient comes from the term $\sin2\alpha$ in $\dot\alpha$ and half from the change of $V^2$ during the turn. Over the same turn the first-order gain $J/r^2$ integrates to $2\pi$. The Codex review obtains the same coefficient, $-2\pi V_0^2r/J^2$, by a separate formal expansion in the angle of the axis. If the separately chosen no-delay circular relation $J^2\approx2r$ is inserted, the removal is $V_0^2/2$ of the gain.

*Relation to the second reading.* The second reading's Consequence 1 holds the common velocity fixed, and in that model its statement that the direction-dependent terms exchange $J$ back and forth with no net change is correct; nothing here contradicts it. With $\mathbf V$ fixed and $\dot\alpha=J/r^2$ the integral above is zero. The nonzero value arises only when the common velocity is allowed to evolve by its leading equation, and it enters at first order in $1/J$ relative to the oscillating torque.

*What the calculation does not supply.* The common velocity at the end of the turn equals its starting value only to the computed order, so the exact periodic boundary cancellations of Proposition I may not be applied to this auxiliary path. No remainder is bounded: breathing of the relative orbit, the change of $J$ within the turn, the strength-difference remainder $\zeta$ and window curvature may each contribute at the order of the coefficient obtained. The calculation is therefore a comparison of formal sizes only. In the terms of Proposition I(4) it corresponds to $B=0$ and $Z=0$ by construction and to $\Lambda\to\oint\lvert\mathbf P\rvert^2/(4rJ)\,dt=\oint(V^2r/J^2)\,\dot\vartheta\,dt$.

### What M2 would need

The missing proposition was stated above as an averaged lower bound for the common-velocity term against the first-order gain. Proposition I(4) gives its exact form: $\oint\mu J\,dt>\Lambda+B-Z-\oint r\,e_J\,dt$ would exclude a rigidly repeating solution with $J$ of one sign. The formal comparison suggests, without establishing, that $\Lambda$ is positive and not small beside the gain, so that M2 would be a comparison of sizes and could not come from showing that the common-velocity term averages to zero. Three propositions stand between Proposition I(4) and a bound. They are the smallest additional ones I can state; none is proved.

- **S1, a curved-window bound for the strength difference.** An estimate $\lvert\zeta-\zeta_0\rvert\le c(w)/r$, with $\zeta_0=v_{1\parallel}(1/S_1-1)+v_{2\parallel}(1/S_2-1)$ the straight-window value, would control the curved-window part of $Z$ and turn $A_\parallel$ into $P_\parallel/r^2$ plus bounded remainders. The route is the one used for Lemma 3, applied to the delay and the transmitter factor instead of the aberration: each window path departs from its tangent line by at most $\tfrac12\tau^2\bar a$, which is bounded independently of $r$ under a uniform speed bound, so $\tau_i$ and $\tau_iD_i$ depart from their straight-window values by bounded amounts and $a_i$ by a relative amount of order $1/r$. This was not carried through to constants. By the sizes in Theorem E it would make the curved-window part of $Z$, and the curvature term, of relative size about $w/J$ and $1/J$ beside the gain, small only when $J$ is large, not merely above $j_F$. The straight-window part $\zeta_0$ could not be handled by its size: bounded in absolute value its term is of relative size about $w^4r/J$ beside the gain, which is not small for wide pairs, so it would have to be averaged together with the leading term. These size statements are order-of-magnitude estimates, not bounds.
- **S2, control of breathing.** $B=\oint(Q/8)\,\tfrac{d}{dt}(r/J)\,dt$ has no sign. It vanishes when $r/J$ is constant and is bounded by $\tfrac18\max\lvert Q\rvert$ times the total variation of $r/J$ over a period. A useful bound requires information on how far the relative orbit departs from a circle and how much $J$ varies, which neither the class of Theorem F nor rigid repetition supplies. It is not known to be of higher order than $\Lambda$.
- **S3, the comparison itself.** Even with S1 and S2, exclusion needs $\Lambda$ below the gain by a margin. In the formal comparison that is the statement that the turning-weighted average of $V^2r/J^2$ is below one. The class of Theorem F gives $J>j_F(w)$ and $V\le w$ but leaves $r$ free above, so $V^2r/J^2$ exceeds one wherever $r>J^2/V^2$, and the class does not supply the comparison instant by instant. Whether it holds on the weighted average would need an energy-type bound for the relative motion, and the delayed law has supplied none.

*The residual, stated exactly.* Any proof of M2 for rigidly repeating solutions with $J>0$ must bound

$$
\mathcal R=-\Lambda-B+Z+\oint r\,e_J\,dt
$$

from below by more than $-\oint\mu J\,dt$. $\mathcal R$ has no established sign and none of its four terms has an established sign or size. A failed attempt at a bound is not evidence that a repeating solution exists.

### Approaches tried in the continuation that did not help

- **Eliminating the strength difference between the rate of $J$ and the transverse common equation.** Multiplying Proposition H(2) by $J/r^2$ and H(3) by $P_\perp$ and adding removes $\delta$ exactly, but the result is $2\,(\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_1\,v_{1\perp}+\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_2\,v_{2\perp})$, whose period average is tied only to the periodicity of each member's speed, $\oint\ddot{\mathbf x}_i\cdot\mathbf v_i\,dt=0$. It carries no information about $J$ beyond that.
- **Substituting the longitudinal common equation for the strength difference.** $2\delta=\dot P_\parallel-\dot\vartheta P_\perp+\chi$ is exact, but every rearrangement that uses only Proposition H(1) returns an identity $0=0$. The link between the strength difference and the common velocity along the axis is a property of the delay and transmitter factor, not of the common-velocity equations; that is S1.
- **Other multipliers.** Multiplying the rate of $J$ by a function of $J$ keeps the left side a total derivative; multiplying by $2J/r$ instead removes $B$ but leaves $\oint J^2\dot r/r^2\,dt$ on the left, also without a sign. One sign-indefinite breathing term survives either choice.
- **Transferring the sign of Proposition K to the common-velocity term.** Fails for the reason given after Proposition K: the weights differ, and the difference is the breathing term.
- **Emission-time change of variables.** Since $ds_i/dt=(1-\mathbf n_i\cdot\mathbf v_i)/D_i>0$, each $s_i$ is a strictly increasing map with $s_i(t+T)=s_i(t)+T$ in a rigidly repeating solution, and a period integral over $t$ can be rewritten over $s_i$. The two terms of $A_\parallel$ and of $A_\perp$ then live on two different maps, $s_1$ and $s_2$, as the exploration found, and I obtained no common integrand for $\Lambda$.

### Limits and falsifiers of the continuation

Everything in this section is for complete rigidly repeating planar solutions of opposite polarity below wake speed; Proposition I(4) also needs $J$ without zeros, and the bounds on $e_J$, $e_P$ and $\chi$ need a uniform speed bound. Nothing is claimed for $J$-periodic histories that are not rigidly repeating. The sign of the common-velocity term over a period is not established, in general or at leading order for the law; the one-turn figure belongs to the auxiliary model only. The whole slow regime is not closed, the class of Theorem F is not closed against loss with no turning back, and M2 remains unproved.

- A solution at which one of the five relations of Proposition H fails refutes it. For relations 2, 3 and 4 with the formal row torque in place of $dJ/dt$, prescribed paths suffice; for relations 1 and 5 only a solution counts.
- A rigidly repeating solution on which one of the four statements of Proposition I, or the identity of Proposition K, fails refutes it.
- A pair of straight paths with equal constant velocity whose formal rows give $\zeta\ne2V_\parallel(1/S-1)$ refutes the known-case algebra check.
- For the auxiliary model only: an evaluation of the stated one-turn integral, with the stated equations and to the stated order, that differs from $-2\pi V_0^2r/J^2$ withdraws the coefficient. It would not bear on Propositions H, I and K.
