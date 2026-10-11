# Two architrinos below wake speed: exclusions that hold while the centre term stays below the mirror-like term (2026-10-10)

## Result

**The general question is still open. Every class excluded here is one in which a named term, the centre term, is controlled.** Two architrinos of opposite polarity, both below wake speed for all time, are considered under the unchanged Master Equation, with no symmetry assumed. The question is whether such a pair can have a history that repeats, either exactly or up to a rotation or a steady drift. This note reconstructs the earlier results, proves two new exclusions, and states the alternatives that a repeating history would have to satisfy. An [independent review](saturday-two-member-subwake-periodicity-codex-review-2026-10-10.md) by Codex rederived the wake-front bound, the split, the comparison lemma, Theorems A and B and Proposition C by a separate hand derivation and supports them; it did not rerun or certify any numerical result. Its four corrections of claim boundary are incorporated below.

1. **Reconstruction (derived again; algebra measured on prescribed paths).** Every exact rate and conditional exclusion of the [exploration of 2026-10-06](two-member-subwake-periodicity-exploration-2026-10-06.md), with the corrections of its [second reading](two-member-subwake-periodicity-second-reading-2026-10-06.md), was derived again from the row law and checked with a separately written script. No discrepancy was found. The items not rechecked are listed under [Reconstruction](#reconstruction).
2. **A wake-front bound (derived).** Over the delay window of any row, the direction from member 2 to member 1 stays within a quarter turn of the direction of that row. The earlier bound on the aberration angles and the half-turn bound on the pair's turning over a window both follow in one line.
3. **An exact split of the rate of angular momentum (derived).** The rate of the relative angular momentum $J$ is the sum of a *mirror-like term*, which depends only on how far the separation direction has turned over the two delay windows, and a *centre term*, which depends only on how far a chosen point between the members has moved over those windows. For a mirror pair the centre term is zero.
4. **Mirror pairs are excluded without any assumption on the sense of turning (derived).** A mirror pair of opposite polarity below wake speed has no periodic and no relative-periodic history at all. The earlier [mirror-pair statement](mirror-pair-angular-momentum-monotonicity.md) excluded only histories that turn in one sense; here one-sense turning is proved, not assumed.
5. **The same exclusion without mirror symmetry, when the centre term is the smaller one (derived).** If at every instant the centre term is at most a fixed fraction $\eta<1$ of the mirror-like term in size, no history exists whose separation vector repeats up to a rotation. This exclusion assumes no sense of turning and no symmetry. A separate statement concerns turning: if the bound holds with $0\le\eta\le1$ and the separation direction has wound counterclockwise without limit in the remote past, the direction never turns back and $J$ never decreases; for clockwise winding the mirror image holds, with $J$ never increasing. A signed version holds as well.
6. **Like polarity is excluded outright (derived).** For two architrinos of the same polarity below wake speed the squared separation is strictly convex in time, so no periodic, relative-periodic or bounded two-sided history exists.
7. **Slow wide pairs with a common velocity (a reduced leading-order model with no error bound; one relation of it measured on four releases).** For members far apart and slow relative to each other, a reduced model gives the change of the common speed $V$ as an end-point term plus an integral, and the part of that integral due to the direction-dependent attraction is negative for every $V$ below wake speed. This extends the second reading's small-$V$ estimate. It is asymptotic reasoning without an error estimate: slow pairs, very small $V$, and $V$ close to wake speed all remain in the unresolved class.
8. **A search (measured, discovery grade only).** A least-squares routine was run from 480 random starts in two nine-harmonic families of trial paths that repeat by construction, at mean separations from $0.8$ to $8$. None of the candidates it reached has a small acceleration mismatch at the 48 sampled instants: the smallest root-mean-square mismatch between the path's acceleration and the equation's, relative to the acceleration, was $0.22$. A second run of 240 starts at separations $0.5$, $0.65$ and $16$ to $128$ reached minima from $0.54$ down to $0.062$, falling at large separation as the inverse square root of the separation. The runs do not cover the two families and certify nothing between the sampled instants.
9. **What is still open.** For a repeating history with counterclockwise net turning the proofs leave three alternatives, and exclude none of them: $J$ is constant; or at some instant $J$ decreases although the separation direction has not turned back over either delay window; or the loss of $J$ is not bounded by any locally bounded multiple of the amount turned back. What holds for every repeating history, without alternatives, is weaker: no fixed fraction $\eta<1$ bounds the centre term by the mirror-like term at all times. Releases from prescribed pasts show that the equation does produce a centre term far larger than the mirror-like term when the common velocity is large (measured), so the hypothesis of item 5 is not automatic. Whether any of the three alternatives can be realised over a whole period is not decided here.

> Claim grade: derived for items 2 to 6 and for the identities of item 1, by the hand proofs below, which a separate hand derivation in the Codex review supports; measured for the algebra of items 1 to 3 on prescribed histories, for the releases of items 7 and 9, and for the search of item 8, each by the session instrument named under [Instruments](#instruments-and-what-they-can-establish); derived as algebra of a reduced leading-order model, with no error bound, for item 7; nothing is claimed at derived or inferred grade about the existence of slow repeating histories. Falsifier: a history of an opposite pair below wake speed, obeying the equation on its whole past, that repeats while the centre term stays within one fixed fraction $\eta<1$ of the mirror-like term at every instant, or that has wound counterclockwise without limit in its past and later turns back while the centre term never exceeds the mirror-like term, refutes item 5; a mirror pair below wake speed whose polar angle satisfies $\theta(u)\le\theta(t_0)$ for all $u<b$ with some $t_0<b$, without being constant before $b$, refutes item 4. Further falsifiers are listed at the end.

## Setting

Units are $c_f=1$ and unit coupling. Two architrinos move in a plane at $\mathbf x_1(t)$ and $\mathbf x_2(t)$, with velocities $\mathbf v_1,\mathbf v_2$ of size strictly below $1$ at every instant, and separation $r(t)=\lvert\mathbf x_1-\mathbf x_2\rvert>0$. The planar cross product is $\mathbf a\times\mathbf b=a_1b_2-a_2b_1$. The polarities are opposite unless stated.

**Rows.** A row is one causal contribution to an acceleration. Member 1 at time $t$ receives the wake that member 2 emitted at the earlier time $s_1(t)$ fixed by $t-s_1=\lvert\mathbf x_1(t)-\mathbf x_2(s_1)\rvert$. Write $\tau_1=t-s_1$ for this causal delay, $\mathbf n_1=(\mathbf x_1(t)-\mathbf x_2(s_1))/\tau_1$ for the unit vector from the emission point to the receiver, and $D_1=1-\mathbf n_1\cdot\mathbf v_2(s_1)$ for the transmitter factor. The [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) gives

$$
\ddot{\mathbf x}_1=-\frac{\mathbf n_1}{\tau_1^2D_1},\qquad \ddot{\mathbf x}_2=-\frac{\mathbf n_2}{\tau_2^2D_2},
$$

with $s_2,\tau_2,\mathbf n_2=(\mathbf x_2(t)-\mathbf x_1(s_2))/\tau_2$ and $D_2=1-\mathbf n_2\cdot\mathbf v_1(s_2)$ defined in the same way for member 2. Each acceleration points from the receiver toward the place where its partner was when the wake left. The interval $[s_i(t),t]$ is called the delay window of member $i$'s row. It is convenient to write $W_i=1/(\tau_i^3D_i)>0$, so that $\ddot{\mathbf x}_1=-W_1\,(\mathbf x_1(t)-\mathbf x_2(s_1))$.

**Row census.** Below wake speed a member receives no row from its own path and at most one from its partner, and $0<D_i<2$. The partner row exists at every instant for every history that is bounded apart from a uniform drift, which covers all the repeating histories considered here. For other histories its existence at every instant is assumed. These statements are those of the exploration and its second reading and were derived again.

**Complete history.** A complete history is a pair of twice continuously differentiable paths defined for all times before some end time, possibly infinite, that obeys the two equations at every instant with each member receiving its partner row. A prescribed path that does not obey the equations is called a prescribed history, and a path that obeys them only after a starting time is called a release.

**Relative quantities.** $\mathbf r=\mathbf x_1-\mathbf x_2$ is the separation vector, $\mathbf w=\mathbf v_1-\mathbf v_2$ the relative velocity, and $J=\mathbf r\times\mathbf w$ the relative angular momentum. The separation direction has a polar angle $\vartheta(t)$, taken as a continuous function of time, so that it keeps count of full turns, and $J=r^2\dot\vartheta$.

**Repeating histories.** A history is periodic when both positions repeat after a time $T$. It is relative periodic when the positions repeat after $T$ up to one fixed rotation about a fixed point, or up to one fixed translation; these are the only cases in which the history at $t+T$ is a copy of the history at $t$ under a symmetry of the equation. The exclusions below need less: they apply to every history defined for all time whose separation vector satisfies $\mathbf r(t+T)=R\,\mathbf r(t)$ for one fixed rotation $R$. Such a history is called $J$-periodic here, because $J(t+T)=J(t)$. Its net turning $\Theta_T=\vartheta(t+T)-\vartheta(t)$ is the same at every $t$. Periodic and relative-periodic histories, and histories that repeat in a frame that both rotates and drifts, are all $J$-periodic.

## Reconstruction

Each identity in this section was derived from the row law before the corresponding passage of the two earlier notes was reread, and then compared. The derivations that matter for the new results are given in full in the next section; the others are stated with the check that was made.

| Statement of the earlier notes | Outcome here |
| --- | --- |
| Rate of $J$: $dJ/dt=r\,[\sin\beta_1/(\tau_1^2D_1)+\sin\beta_2/(\tau_2^2D_2)]$, with $\beta_1$ the signed angle from $\mathbf n_1$ to $\mathbf r$ and $\beta_2$ the signed angle from $\mathbf n_2$ to $-\mathbf r$; displacement form $dJ/dt=\mathbf r\times(\boldsymbol\Delta_1W_2-\boldsymbol\Delta_2W_1)$ with $\boldsymbol\Delta_1=\mathbf x_1(t)-\mathbf x_1(s_2)$, $\boldsymbol\Delta_2=\mathbf x_2(t)-\mathbf x_2(s_1)$ | Derived again; the three forms agree to $1.3\times10^{-13}$ relative on 1494 prescribed histories |
| $\lvert\beta_i\rvert<\pi/2$, and the sharper $\lvert\sin\beta_1\rvert\le\lvert\boldsymbol\Delta_2\rvert/\tau_1$ | Derived again by a different argument (the wake-front bound below); the sharper bound held in every sample, largest value of the left side minus the right side $-1.2\times10^{-8}$ |
| Conditional exclusion: both $\beta_i\ge0$ throughout and not both identically zero implies no $J$-periodic history | Derived again; the proof needs only $J$ periodic and $dJ/dt\ge0$ |
| Velocity form of the sufficient condition, as corrected: $\mathbf n\times\mathbf v_1\ge0$ on $[s_2,t]$ and $\mathbf n\times\mathbf v_2\le0$ on $[s_1,t]$ | Confirmed from the displacement form |
| Rate of $K_1=(\mathbf x_1(t)-\mathbf x_2(s_1))\times\mathbf v_1(t)$: $\dot K_1=\dot s_1\,\mathbf v_1(t)\times\mathbf v_2(s_1)$, with $\dot s_1=(1-\mathbf n_1\cdot\mathbf v_1(t))/D_1>0$ | Derived again; kinematic identity measured to $1.2\times10^{-9}$ (finite differences) |
| Comparison quantity $e_1=\tfrac12\lvert\mathbf v_1\rvert^2-1/\tau_1$ with $\dot e_1=(D_1-1)/(\tau_1^2D_1)$ | Derived again, from the scalar form of the row given below |
| Mirror-pair rate $\dot\ell=\rho(t)\rho(s)\sin(\theta(t)-\theta(s))\,W$ and swept angle below a quarter turn | Derived again; rate measured to $7.8\times10^{-14}$ on 1447 prescribed mirror histories, largest swept angle $1.436<\pi/2$ |
| Polar identities of Corollary 2c | Algebra measured to $7.8\times10^{-14}$; the fixed-circle consequences and Corollary 2b were not rechecked |
| Straight uniform windows: $\tau_1D_1=rS_2$, $\tau_1=r(v_{2\parallel}+S_2)/(1-\lvert\mathbf v_2\rvert^2)$, and $r\,dJ/dt=J/r+v_{1\perp}v_{1\parallel}/S_1+v_{2\perp}v_{2\parallel}/S_2$ | Derived again; measured to $4\times10^{-15}$ on 1500 straight pairs, with $J\,dJ/dt<0$ in 113 of them |
| Common velocity $\mathbf V$ on straight windows: $\mathbf a_1-\mathbf a_2=-\nabla_{\mathbf r}U_{\mathbf V}$ with $U_{\mathbf V}=-2\sqrt{1-(\mathbf n\times\mathbf V)^2}/r$, and $\mathbf a_1+\mathbf a_2=(2/r^2)[2(\mathbf n\cdot\mathbf V)\mathbf n-\mathbf V]$ | Derived again; measured to $2.7\times10^{-9}$ (finite-difference gradient) and $2.5\times10^{-15}$ |
| Small-$V$ estimate $J\approx J_0(1+\tfrac14V^2\cos2\alpha)$ and loss of $\pi V^2/(4J_0)$ of the common speed per turn | Derived again; the corresponding torque term is written for all $V<1$, within a reduced model, in [Slow wide pairs](#slow-wide-pairs-with-a-common-velocity) |
| Rates of $\ell_i$, $M$, and Theorems 3 and Proposition 4 | The rate of $\ell_1$ about a point was derived again and measured to $1.1\times10^{-13}$; the rate of $M$, and the independence of the hypotheses of Theorems 2 and 3, were not rechecked |
| Release samples (400 pairs) | Not rerun. The new releases below use a separate integrator and different preparations |

In the last column, "measured" means a float comparison on prescribed histories by the identity script. It tests the algebra and geometry of a formula. It is not evidence about histories that obey the equation.

One correction of grade follows from the new releases. The exploration records that in its 400 releases $J$ never changed sign. In two of the five releases of [the last section](#the-centre-term-does-reverse-the-turning-on-releases) $J$ does change sign while both members are still below wake speed. The earlier observation therefore describes that sample, not releases in general.

## Exact structure used by the new results

### The row is the gradient of the reciprocal delay

Fix the path of member 2 and let $\tau(\mathbf x,t)$ be the causal delay from that path to an arbitrary point $\mathbf x$ at time $t$, so that $\tau(\mathbf x_1(t),t)=\tau_1(t)$. Differentiating $\tau=\lvert\mathbf x-\mathbf x_2(t-\tau)\rvert$ gives $\nabla\tau=\mathbf n/D$ and $\partial_t\tau=1-1/D$, so the delay field obeys $\partial_t\tau+\lvert\nabla\tau\rvert=1$ and the row is

$$
\ddot{\mathbf x}_1=\nabla\Bigl(\frac1\tau\Bigr)\Big|_{\mathbf x=\mathbf x_1(t)} .
$$

This is the corpus's [moving-single-root scalar representative](../../../../../content/markdown/aaa/dynamics/master-equation.md#superposition-and-local-wake-geometry) written for the present pair; nothing new is claimed for it. Its use here is the rate of the comparison quantity. Along member 1's path, $d(1/\tau_1)/dt=\partial_t(1/\tau)+\mathbf v_1\cdot\nabla(1/\tau)$, and with the two derivatives above

$$
\frac{de_1}{dt}=\frac1{\tau_1^2}-\lvert\ddot{\mathbf x}_1\rvert ,\qquad e_1=\tfrac12\lvert\mathbf v_1\rvert^2-\frac1{\tau_1}.
$$

The comparison quantity rises when the row is weaker than the bare inverse square of the delay, which is when the partner was moving away from the reception point at emission ($D_1>1$), and falls when the partner was approaching.

### The wake-front bound

**Lemma 1 (derived).** For every $u$ in the delay window $[s_1(t),t]$, $\mathbf n_1(t)\cdot\mathbf r(u)>0$. For every $u$ in $[s_2(t),t]$, $-\mathbf n_2(t)\cdot\mathbf r(u)>0$.

*Proof.* Picture the wake that member 2 emits at $s_1$. It is a circle that grows at unit speed and reaches member 1 exactly at $t$. Until then member 1 is outside it and member 2, which is slower than the wake, is inside it. Measure positions along $\mathbf n_1$ from the emission point: $\xi_i(u)=\mathbf n_1\cdot(\mathbf x_i(u)-\mathbf x_2(s_1))$. Member 1 has $\xi_1(t)=\tau_1$ and moves slower than $1$, so $\xi_1(u)>\tau_1-(t-u)=u-s_1$ for $u<t$. Member 2 has $\xi_2(s_1)=0$ and moves slower than $1$, so $\xi_2(u)<u-s_1$ for $u>s_1$. Hence $\xi_1(u)>\xi_2(u)$ on the whole window, which is the first claim. The second is the same statement with the members exchanged. $\qquad\blacksquare$

Three consequences are used below.

- **Aberration angles.** At $u=t$ the lemma gives $\cos\beta_1>0$ and $\cos\beta_2>0$, which is the bound $\lvert\beta_i\rvert<\pi/2$ of the exploration.
- **Turning over a window.** The separation direction stays inside one open half plane throughout each window, so its polar angle changes by less than a half turn: $\lvert\vartheta(t)-\vartheta(s_i(t))\rvert<\pi$ for $i=1,2$, as an inequality between the continuous angles and not only modulo a full turn. For a mirror pair this is the half-turn bound of the mirror-pair note.
- **Radial part.** $\mathbf r\cdot(\ddot{\mathbf x}_1-\ddot{\mathbf x}_2)=-r\,[\cos\beta_1/(\tau_1^2D_1)+\cos\beta_2/(\tau_2^2D_2)]<0$. The relative acceleration always has a strictly inward part.

The lemma does not use the plane; it holds in three dimensions as stated.

### The mirror-like term and the centre term

Choose a number $\lambda$ between $0$ and $1$ and the point $\mathbf c_\lambda=\lambda\mathbf x_1+(1-\lambda)\mathbf x_2$ on the segment joining the members; $\lambda=\tfrac12$ is the midpoint. Then $\mathbf x_1=\mathbf c_\lambda+(1-\lambda)\mathbf r$ and $\mathbf x_2=\mathbf c_\lambda-\lambda\mathbf r$. Substituting into $dJ/dt=\mathbf r\times(\ddot{\mathbf x}_1-\ddot{\mathbf x}_2)$ and using $\mathbf r(s)\times\mathbf r(t)=r(s)r(t)\sin(\vartheta(t)-\vartheta(s))$ gives the exact identity

$$
\frac{dJ}{dt}=G_\lambda+C_\lambda,
$$

$$
G_\lambda=\lambda\,W_1\,r(t)\,r(s_1)\sin\bigl(\vartheta(t)-\vartheta(s_1)\bigr)+(1-\lambda)\,W_2\,r(t)\,r(s_2)\sin\bigl(\vartheta(t)-\vartheta(s_2)\bigr),
$$

$$
C_\lambda=\mathbf r(t)\times\Bigl[W_2\bigl(\mathbf c_\lambda(t)-\mathbf c_\lambda(s_2)\bigr)-W_1\bigl(\mathbf c_\lambda(t)-\mathbf c_\lambda(s_1)\bigr)\Bigr].
$$

$G_\lambda$ is called the mirror-like term: it contains the two angles through which the separation direction has turned over the two delay windows and nothing else about the motion of the pair as a whole. $C_\lambda$ is called the centre term: it contains the displacement of the reference point over the two windows, taken across the present separation. Write $\hat G_\lambda$ for the sum of the absolute values of the two parts of $G_\lambda$. For a mirror pair $\mathbf x_2=-\mathbf x_1$ the midpoint is fixed, $C_{1/2}=0$, and $G_{1/2}$ is four times the mirror-pair rate of the angular momentum per member, in keeping with $J=4\ell$. The identity was measured to $7\times10^{-14}$ relative for $\lambda=0,\tfrac12,1$ on the 1494 prescribed histories.

Changing $\lambda$ moves a fixed amount between the two terms: with $g_i=W_i\,\mathbf r(s_i)\times\mathbf r(t)$, $G_\lambda=\lambda g_1+(1-\lambda)g_2$ and $C_\lambda=dJ/dt-G_\lambda$. The split holds at each instant separately, so a different $\lambda$ may be chosen at different observation times. The chosen value must then be held fixed in all three evaluations $\mathbf c_\lambda(t)$, $\mathbf c_\lambda(s_1)$ and $\mathbf c_\lambda(s_2)$ that enter $C_\lambda$ at that time; using the value selected at a delayed time inside the same expression would define a different quantity.

In the same variables each acceleration is a mirror-like attraction plus a pull of the reference point toward its own earlier position. For the midpoint $\mathbf c=\mathbf c_{1/2}$,

$$
\ddot{\mathbf x}_1=-\tfrac12W_1\bigl(\mathbf r(t)+\mathbf r(s_1)\bigr)-W_1\bigl(\mathbf c(t)-\mathbf c(s_1)\bigr),\qquad
\ddot{\mathbf x}_2=+\tfrac12W_2\bigl(\mathbf r(t)+\mathbf r(s_2)\bigr)-W_2\bigl(\mathbf c(t)-\mathbf c(s_2)\bigr),
$$

so that $2\ddot{\mathbf c}=\tfrac12W_2(\mathbf r+\mathbf r(s_2))-\tfrac12W_1(\mathbf r+\mathbf r(s_1))-W_1(\mathbf c-\mathbf c(s_1))-W_2(\mathbf c-\mathbf c(s_2))$ (measured to $6\times10^{-16}$). The last two terms always pull the midpoint back toward where it was; the first two drive it whenever the two weights or the two delays differ, which a common velocity produces.

## A comparison lemma

The new exclusions rest on one elementary fact about a function that touches zero from above.

**Lemma 2 (derived).** Let $\varphi$ be twice continuously differentiable and non-negative on an open interval $I$, and suppose $\ddot\varphi+b\,\dot\varphi\le k\,\varphi$ on $I$ with $b$ continuous and $k\ge0$ bounded on every closed subinterval. If $\varphi(t_0)=0$ for some $t_0$ in $I$, then $\varphi$ is zero on all of $I$.

*Proof.* At $t_0$ the function has an interior minimum, so $\dot\varphi(t_0)=0$. Let $\mu=\exp\int b$, so that $(\mu\dot\varphi)^{\cdot}=\mu(\ddot\varphi+b\dot\varphi)\le\mu k\varphi$. On a closed interval $[t_0,t_0+\delta]$ inside $I$ let $C$ bound $\mu k/\min\mu$, and let $m(t)$ be the largest value of $\varphi$ on $[t_0,t]$. Integrating once, $\dot\varphi(t)\le C\,m(t)(t-t_0)$, and once more, $\varphi(t)\le\tfrac12C\,m(t)(t-t_0)^2$. Since $m$ does not decrease, $m(t)\le\tfrac12C\,m(t)(t-t_0)^2$, so $m(t)=0$ while $(t-t_0)^2<2/C$. The same argument run backward from $t_0$ gives $\varphi=0$ on an interval to the left. The set where $\varphi=0$ is therefore open; it is closed because $\varphi$ is continuous; and $I$ is connected. $\qquad\blacksquare$

The lemma is a one-dimensional strong minimum principle. It says that a quantity whose curvature is bounded above by a multiple of itself cannot leave zero.

## Mirror pairs: no repeating history, with nothing assumed about the turning

Let the members be at $\pm\mathbf x(t)$ with $\mathbf x=\rho(\cos\theta,\sin\theta)$, $\rho>0$, and $\theta$ continuous. Both members receive rows with the same emission time $s(t)$ and weight $W$, and the angular momentum per member $\ell=\rho^2\dot\theta$ obeys $\dot\ell=\rho(t)\rho(s)\,W\sin(\theta(t)-\theta(s))$, which in terms of the angle is

$$
\ddot\theta+\frac{2\dot\rho}{\rho}\,\dot\theta=\frac{\rho(s)}{\rho(t)}\,W\,\sin\bigl(\theta(t)-\theta(s)\bigr).
$$

The right side pushes the angle forward when it is ahead of its own delayed value and backward when it is behind. The earlier statement used this only for a pair already known to turn in one sense. The step that removes that assumption is to look at the first instant at which the angle would fall below its own earlier maximum.

**Theorem A (derived).** Consider a complete history of a mirror pair of opposite polarity, both members below wake speed and never at the centre.

1. If for some time $b$ and some $t_0<b$ the angle satisfies $\theta(u)\le\theta(t_0)$ for all $u<b$, then $\theta$ is constant on all times before $b$. The same holds with the inequality reversed.
2. If $\theta\to-\infty$ in the remote past, then $\theta$ never decreases, and $\ell\ge0$ never decreases.
3. No periodic and no relative-periodic history exists.

*Proof.* (1) Put $\varphi(u)=\theta(t_0)-\theta(u)\ge0$ for $u<b$. For $t<b$ the emission time $s(t)$ is earlier than $t$, so $\varphi(s)\ge0$, and $\theta(t)-\theta(s)=\varphi(s)-\varphi(t)$ lies strictly between $-\pi$ and $\pi$ by the wake-front bound. If this number is non-negative its sine is non-negative. If it is negative it is at least $-\varphi(t)$, and $\sin y\ge y$ for $y\le0$, so its sine is at least $-\varphi(t)$. In both cases $\sin(\theta(t)-\theta(s))\ge-\varphi(t)$, and the equation for the angle gives $\ddot\varphi+(2\dot\rho/\rho)\dot\varphi\le(\rho(s)W/\rho(t))\,\varphi$. Lemma 2 applies with $\varphi(t_0)=0$. The reversed case follows by reflecting the plane in a line through the centre, which maps mirror histories to mirror histories and reverses $\theta$.

(2) Because $\theta\to-\infty$ in the past, the largest value $M(t)$ of $\theta$ up to time $t$ is attained. If $\theta(t_1)<M(t_1)$ for some $t_1$, the maximum is attained at some $t_0<t_1$, and part 1 with $b=t_1$ makes $\theta$ constant on the whole past, a contradiction. So $\theta(t)=M(t)$ for all $t$: the angle never decreases. Then $\theta(t)-\theta(s)$ lies in $[0,\pi)$, so $\dot\ell\ge0$, and $\ell=\rho^2\dot\theta\ge0$.

(3) A relative-periodic mirror history has $\rho(t+T)=\rho(t)$ and $\theta(t+T)=\theta(t)+\Theta$ for all $t$, and $\ell$ is periodic. If $\Theta>0$, part 2 applies; a periodic function that never decreases is constant, so $\dot\ell=0$ at all times, hence $\theta(t)=\theta(s(t))$ at all times, hence the non-decreasing angle is constant on every delay window and so everywhere, contradicting $\Theta>0$. If $\Theta<0$, reflect. If $\Theta=0$, $\theta$ is periodic and attains its maximum, and part 1 with no upper limit on $b$ makes it constant. The pair then moves on a fixed line through the centre, $\mathbf x=\rho(t)\,\mathbf e$, and $\ddot\rho=-(\rho(t)+\rho(s))W<0$ at every instant, so $\dot\rho$ is strictly decreasing and $\rho$ is not periodic. $\qquad\blacksquare$

Part 2 says more than the exclusion: a mirror pair that has wound around its centre without limit in the past has always turned in one sense and has always been gaining angular momentum. Part 1 says that a mirror pair's angle cannot reach, at one time, a value that it has never exceeded and does not exceed for some time afterwards, unless the pair has been on a fixed line throughout.

**A check on releases (measured).** The comparison argument also applies to a release whose prescribed past never exceeds the running maximum of the angle, because the delayed values it uses then lie on that past or on the released path. Sixty mirror pairs were released from straight mirror-symmetric pasts, at separations from $1.2$ to $30$, with transverse relative speed from $0.05$ to $1.6$ of the circular value and radial relative speed from $-1.2$ to $1.2$ of it, so that speeds of order one are included. In every run and at every step the angular momentum per member stayed at or above its starting value, and the scale-free rate $\dot\ell\,\rho^2/\ell$ stayed above $0.05$. Twelve runs ended at wake speed, twenty-four separated beyond twenty times their starting size, and twenty-four were still below wake speed after three nominal turns. This is a consistency check of the sign and of the mechanism on float releases; the theorem does not rest on it.

**Scope.** Theorem A covers every mirror history below wake speed, rigid or breathing, turning or swinging. It says nothing about a pair that reaches wake speed, where further rows appear, or about motion out of the plane.

## Without mirror symmetry: no repeating history while the centre term is the smaller one

For a general pair the separation direction obeys $\ddot\vartheta+(2\dot r/r)\dot\vartheta=(G_\lambda+C_\lambda)/r^2$. The mirror-like term has exactly the structure used in Theorem A, with the separation angle in place of the mirror angle. The centre term has no such structure. The theorem below is what the argument gives when the centre term is controlled.

**Theorem B (derived).** Consider a complete history of an opposite pair below wake speed.

1. **General form.** Suppose there is a locally bounded function $K\ge0$ with $dJ/dt\ge-K(t)\,\varrho(t)$ at every instant, where $\varrho(t)=\max\{0,\ \vartheta(s_1)-\vartheta(t),\ \vartheta(s_2)-\vartheta(t)\}$ is the amount by which the separation direction has turned back over a delay window. Then, if for some time $b$ and some $t_0<b$ the angle satisfies $\vartheta(u)\le\vartheta(t_0)$ for all $u<b$, the angle $\vartheta$ is constant on all times before $b$. The condition is attainment at an interior time: an angle that increases strictly has its largest value up to any time at that time itself, and is not constrained by this sentence. If in addition $\vartheta\to-\infty$ in the remote past, which is counterclockwise winding without limit, then $\vartheta$ never decreases and $dJ/dt\ge0$ at every instant. The one-sense turning is a consequence of that winding hypothesis and of this orientation; it is not claimed for every complete history. For clockwise winding the reflected hypothesis $dJ/dt\le K\varrho'$, with $\varrho'$ the amount turned forward over a window, gives $\vartheta$ never increasing and $dJ/dt\le0$.
2. **Centre term smaller than the mirror-like term.** Suppose that for some $0\le\eta\le1$ and at every instant there is a $\lambda$ in $[0,1]$ with $\lvert C_\lambda\rvert\le\eta\,\hat G_\lambda$. Then the hypothesis of part 1 holds, and so does its reflection. If in addition $\eta<1$, the history is not $J$-periodic, whatever its sense of turning. The value of $\lambda$ may differ from one observation time to another, each value being held fixed across the delayed evaluations at its own time.
3. **Signed version.** Suppose that for one fixed $\lambda$, $C_\lambda\ge0$ at every instant. Then the hypothesis of part 1 holds, and the history is not $J$-periodic with net turning $\Theta_T\ge0$. The same holds with $C_\lambda\le0$ and $\Theta_T\le0$.

*Proof.* (1) Fix $t_0<b$ with $\vartheta(u)\le\vartheta(t_0)$ for $u<b$ and put $\varphi=\vartheta(t_0)-\vartheta\ge0$ there. For $t<b$, $\vartheta(s_i)-\vartheta(t)=\varphi(t)-\varphi(s_i)\le\varphi(t)$, so $\varrho(t)\le\varphi(t)$ and $-r^2(\ddot\varphi+(2\dot r/r)\dot\varphi)=dJ/dt\ge-K\varphi$. Lemma 2 makes $\vartheta$ constant before $b$. As in Theorem A, if $\vartheta\to-\infty$ in the past this forbids any instant at which $\vartheta$ is below its earlier maximum, so $\vartheta$ never decreases. Then $\varrho=0$ and $dJ/dt\ge0$.

(2) Write $y_i=\vartheta(t)-\vartheta(s_i)$, which lies in $(-\pi,\pi)$ by the wake-front bound, and $\kappa_1=\lambda W_1r(t)r(s_1)$, $\kappa_2=(1-\lambda)W_2r(t)r(s_2)$. Then $dJ/dt=G_\lambda+C_\lambda\ge\sum_i\kappa_i(\sin y_i-\eta\lvert\sin y_i\rvert)$. A term with $y_i\ge0$ is $(1-\eta)\kappa_i\sin y_i\ge0$. A term with $y_i<0$ is $(1+\eta)\kappa_i\sin y_i\ge(1+\eta)\kappa_iy_i\ge-(1+\eta)\kappa_i\varrho$. So part 1 applies with $K=(1+\eta)(\kappa_1+\kappa_2)$, which is at most $2\,[W_1r(t)r(s_1)+W_2r(t)r(s_2)]$ whatever $\lambda$ is chosen and is therefore locally bounded. Now let the history be $J$-periodic with $\eta<1$. If $\Theta_T>0$, part 1 gives $y_i\ge0$ and $dJ/dt\ge(1-\eta)G_\lambda\ge0$; a periodic $J$ then forces $G_\lambda=0$ at every instant for the $\lambda$ used there, so at every instant $\vartheta(t)=\vartheta(s_i(t))$ for at least one $i$. The non-decreasing $\vartheta$ is then constant on a delay window ending at each instant, hence constant near every instant, hence constant, contradicting $\Theta_T>0$. If $\Theta_T<0$, reflect the plane; the hypothesis is unchanged because it involves only absolute values. If $\Theta_T=0$, $\vartheta$ is periodic, attains its maximum, and is constant by the first step. The separation then keeps a fixed direction $\mathbf n$, and by the radial part of the wake-front bound $\ddot r=\mathbf n\cdot(\ddot{\mathbf x}_1-\ddot{\mathbf x}_2)<0$ at every instant, which a periodic $r$ cannot satisfy.

(3) With $C_\lambda\ge0$, $dJ/dt\ge G_\lambda\ge-(\kappa_1+\kappa_2)\varrho$ by the same two cases with $\eta=0$. For $\Theta_T>0$ the argument of part 2 gives $G_\lambda+C_\lambda=0$ with both terms non-negative, hence $G_\lambda=0$ and the same contradiction; $\Theta_T=0$ is as before. The last sentence follows by reflection, which reverses the signs of both $C_\lambda$ and $\Theta_T$. $\qquad\blacksquare$

**What the hypotheses mean.** In part 2 the quantity compared is, on each window, the distance the reference point has moved across the present line of the pair against the distance the tip of the separation vector has moved across that line. For the midpoint the comparison has a direct reading. Over a window the members' displacements are those of the midpoint plus and minus half that of the separation vector, so the midpoint has moved across the present axis by less than half as far as the separation vector exactly when the two members have moved to opposite sides of that axis. A sufficient condition for part 2 with $\lambda=\tfrac12$ is therefore that, over each of the two delay windows, the members' displacements across the present axis are opposite in sense and their sum is at most $\eta$ times their difference in size. For the midpoint and straight windows the condition reads, to leading order, $2\lvert V_\perp V_\parallel\rvert\le\eta\,\lvert w_\perp\rvert$, where $\mathbf V$ is the common velocity and the subscripts denote the parts along and across the pair's axis: the product of the two parts of the common velocity must be below half the transverse relative speed. Mirror pairs satisfy it with $\eta=0$, so Theorem A is the special case $\lambda=\tfrac12$, $\eta=0$. The condition does not fix a sense of turning in advance, and it does not require symmetry. A pair that departs from mirror symmetry is covered only if it satisfies the inequality, with one $\eta<1$, at every instant of its history. Closeness to a mirror pair has not been shown to imply that.

**Relation to the earlier conditional exclusion.** The exploration's Theorem 2 assumes both aberration angles non-negative, which makes $dJ/dt\ge0$ directly and satisfies part 1 with $K=0$. In the present variables its hypothesis reads $\hat{\mathbf r}\times(\mathbf c_\lambda(t)-\mathbf c_\lambda(s_2))\ge-(1-\lambda)\,\hat{\mathbf r}\times(\mathbf r(t)-\mathbf r(s_2))$ and $\hat{\mathbf r}\times(\mathbf c_\lambda(t)-\mathbf c_\lambda(s_1))\le\lambda\,\hat{\mathbf r}\times(\mathbf r(t)-\mathbf r(s_1))$. It is one-sided and presupposes the sense of turning; part 2 is two-sided and does not. Neither contains the other.

**A history with a fixed separation direction.** The last step of the proof shows more than it needs: an opposite pair whose separation keeps one direction has $\ddot r<0$ throughout, so on a complete history its separation has never increased. Such a pair has always been closing. This covers motion along one line.

## Like polarity

**Proposition C (derived).** For two architrinos of the same polarity, both below wake speed, each receiving its partner row, $r^2$ is a strictly convex function of time. No $J$-periodic history exists, and on a history defined for all time the separation is unbounded.

*Proof.* The rows change sign, so by the radial part of the wake-front bound $\mathbf r\cdot(\ddot{\mathbf x}_1-\ddot{\mathbf x}_2)>0$, and $\tfrac12(r^2)^{\cdot\cdot}=\lvert\mathbf w\rvert^2+\mathbf r\cdot\ddot{\mathbf r}>0$. A strictly convex function on the whole line is neither periodic nor bounded. $\qquad\blacksquare$

This needs no symmetry and holds in three dimensions. It is consistent with the lane's [like-polarity mirror theorem](like-polarity-mirror-global-continuation.md), which treats existence and the limiting velocity of the slow mirror case in detail.

## What a repeating history would have to do

Let a $J$-periodic history of an opposite pair below wake speed be given, with net turning $\Theta_T\ge0$ after a reflection if necessary. The following are necessary (derived).

1. **Three alternatives.** At least one of the following holds: (a) $dJ/dt$ is identically zero, so $J$ is constant; (b) there is an instant at which the separation direction has not turned back over either delay window ($\vartheta(t)\ge\vartheta(s_1)$ and $\vartheta(t)\ge\vartheta(s_2)$) and yet $dJ/dt<0$; (c) there is no locally bounded $K$ with $dJ/dt\ge-K\varrho$, so the loss of $J$ is not bounded by a multiple of the amount turned back. This is the contrapositive of Theorem B, part 1, and none of the three is excluded here. The logical structure is that (b) is one way for (c) to hold, and that if (c) fails then (a) holds; when the net turning is zero, (a) would force a fixed separation direction, which is excluded, so (c) is then necessary. At an instant of kind (b), $G_\lambda\ge0$ for every $\lambda$, so $C_\lambda<-G_\lambda\le0$ for every $\lambda$ in $[0,1]$. In case (a) with one-sense turning the split requires only $C_\lambda=-G_\lambda$ at every instant: the centre term then equals the mirror-like term in size and never exceeds it, and there is no loss of $J$ at all. A constant-$J$ repeating history is a logical possibility that the proofs leave open; none has been constructed.
2. **No uniform fraction.** For every $\eta<1$ there is an instant at which $\lvert C_\lambda\rvert>\eta\,\hat G_\lambda$ for every $\lambda$ in $[0,1]$ at once. This is the contrapositive of Theorem B, part 2, and it holds for every $J$-periodic history of either sense of turning. It is the one consequence that needs no alternatives.
3. **Balance over a period.** $\oint C_\lambda\,dt=-\oint G_\lambda\,dt$ for every fixed $\lambda$. If the separation turns counterclockwise in one sense with positive net turning the right side is negative; for clockwise one-sense turning it is positive; if the turning is not of one sense its sign is not determined.
4. **Turning identity.** Since $J/r^2=\dot\vartheta$, $\oint(dJ/dt-J/r^2)\,dt=-\Theta_T$. The part of the rate of $J$ beyond its first-order value $J/r^2$ must cancel the net turning exactly.
5. **Virial balance.** Since $r^2$ is periodic, $\oint\lvert\mathbf w\rvert^2dt=\oint r\,[\cos\beta_1/(\tau_1^2D_1)+\cos\beta_2/(\tau_2^2D_2)]\,dt$.
6. **Rows and delays.** If the velocities are periodic, which holds for periodic histories and for histories periodic up to a drift, each member's mean acceleration is zero, $\oint\mathbf n_i/(\tau_i^2D_i)\,dt=\mathbf 0$ (second reading), and each comparison quantity is periodic, so $\oint\lvert\ddot{\mathbf x}_i\rvert\,dt=\oint\tau_i^{-2}\,dt$: the length of the curve traced by member $i$'s velocity over a period equals the integral of the inverse square of its delay. The second equality also holds for rotation about a fixed centre.
7. **Earlier conditions.** Proposition 4 of the exploration as corrected, and items A(i) to A(iii) of the second reading, continue to hold.

Conditions 1 and 2 state what the proofs leave. Every argument in this note that excludes a class does so by assuming a bound on the centre term, and no argument here derives such a bound from the equation alone.

## Slow wide pairs with a common velocity

This section concerns pairs whose relative speed $\varepsilon$ is small, whose separation is of order $2/\varepsilon^2$, and which carry a common velocity $\mathbf V=\tfrac12(\mathbf v_1+\mathbf v_2)$ of any size below wake speed. Over a delay window each path then departs from a straight line by a relative amount of order $\varepsilon^2$, so the straight-window formulas of the reconstruction describe the accelerations to that accuracy. Everything here is algebra within reduced models, followed by measurements of one reduced relation on releases. No error estimate is established, and nothing in this section removes a class of histories from the open question.

**The model at leading order (second reading, derived again).** With $\alpha$ the angle from $\mathbf V$ to the pair's axis $\mathbf n=\mathbf r/r$ and $S=\sqrt{1-V^2\sin^2\alpha}$, the relative motion is an inverse-square attraction whose strength depends on direction, $\ddot{\mathbf r}=-\nabla U_{\mathbf V}$ with $U_{\mathbf V}=-2S(\alpha)/r$, and the common velocity changes by $\dot{\mathbf V}=(1/r^2)[2(\mathbf n\cdot\mathbf V)\mathbf n-\mathbf V]$. The attraction is strongest when the axis lies along $\mathbf V$. The second equation gives $d\ln V/dt=\cos2\alpha/r^2$ for the common speed, and it turns the direction of $\mathbf V$ at the rate $\sin2\alpha/r^2$. In this coupled model the angle between the axis and the common velocity therefore changes at the rate $\dot\alpha=(J-\sin2\alpha)/r^2$.

**A further reduction.** In the slow regime $J$ is of order $1/\varepsilon$, so $\sin2\alpha$ is small beside it. Replacing $\dot\alpha$ by $J/r^2$ is an additional leading-order reduction, made here and named as such. It gives $d\ln V/d\alpha=\cos2\alpha/J$: within this reduction the change of the common speed depends on the motion only through $J$ as a function of the angle. Without the reduction the denominator is $J-\sin2\alpha$, and the steps below acquire further terms that are not written out.

**An identity of the reduced relation (derived as algebra).** Integrating $\cos2\alpha/J$ by parts over a stretch of turning on which $J>0$,

$$
\int\frac{\cos2\alpha}{J}\,d\alpha=\Bigl[\frac{\sin2\alpha}{2J}\Bigr]+\int\frac{\sin2\alpha}{2J^2}\,\frac{dJ}{d\alpha}\,d\alpha .
$$

At this order two things change $J$, and they enter the last integral separately.

- *The torque of the direction-dependent attraction.* $dJ/dt=-\partial U_{\mathbf V}/\partial\alpha=-V^2\sin2\alpha/(rS)$ contributes $-V^2r\sin2\alpha/(SJ)$ to $dJ/d\alpha$, and so contributes to the integral the amount $-\int V^2r\sin^22\alpha/(2SJ^3)\,d\alpha$, which is negative for every $0<V<1$ whatever the radial motion. $J$ is smallest when the axis lies across the common velocity, so the pair spends more of its turning there, and that is where the common velocity is being reduced. For small $V$ and a near-circular orbit this term is the second reading's $-\pi V^2/(8J_0)$ per half turn.
- *The first-order gain.* The term $J/r^2$ in the rate of $J$ contributes $1$ to $dJ/d\alpha$, and so contributes $\int\sin2\alpha/(2J^2)\,d\alpha$. This vanishes over a half turn when $J$ is constant across it. For varying $J$ it does not vanish identically; it is smaller than the torque term when the variation of $J$ over the half turn is small, which is an estimate and not an identity.

The end-point term in brackets is zero over a stretch at whose two ends both $J$ and $\sin2\alpha$ take the same values. For that the direction of the common velocity must repeat as well as the separation. This holds over a period of a history that is periodic, periodic up to a drift, or periodic up to a rotation about a fixed centre. It does not follow from $J$-periodicity alone.

**What this suggests, and what it does not establish (asymptotic reasoning, no error bound).** For a repeating history of one of the three kinds just named, in the regime where both reductions are good and the gain term is small beside the torque term, the reduced relation gives a common speed that is smaller after a period than before it, which a repeating history cannot have. That would exclude such histories when $V^2$ is well above $\varepsilon$. For smaller $V$ the terms neglected here compete, and a different order-of-magnitude argument, the first-order gain of about $2\pi$ in $J$ per turn, would apply. Neither argument has an error estimate, the omitted terms of the coupled model have not been bounded, and the limit of $V$ near wake speed has not been examined. Slow pairs with any common speed therefore remain in the unresolved class.

**Measured on releases: the reduced relation only.** Four releases were integrated with the full delayed equation: a pair on the $x$ axis at separation $r_0$ with transverse relative speed $\sqrt{2/r_0}$ and common velocity of size $V$ at angle $\alpha_0$ to the axis, each member on a straight line at its initial velocity before $t=0$. Only samples whose rows were emitted after $t=0$ are used. The quantities compared are the measured change of $\ln V$ over each half turn of the axis relative to $\mathbf V$, and three quantities built from the computed $J(\alpha)$ of the same path: the end-point term, the by-parts integral $\int\sin2\alpha\,(dJ/d\alpha)/(2J^2)\,d\alpha$ with $dJ/d\alpha$ taken numerically from the path, and the torque term $-\int V^2r\sin^22\alpha/(2SJ^3)\,d\alpha$. The sum of the first two is the reduced relation $\int\cos2\alpha\,d\alpha/J$; it is not an exact identity for the delayed release, because the release obeys neither reduction exactly. The difference between the by-parts integral and the torque term is everything else that changes $J$ on the path, the first-order gain included.

| $r_0$ | $V$ | Half turn | $\Delta\ln V$ measured | End-point term | By-parts integral | Torque term | $J$ at start and end |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2000 | 0.3 | 1 | $-2.36\times10^{-4}$ | $+3.60\times10^{-4}$ | $-5.75\times10^{-4}$ | $-5.79\times10^{-4}$ | 63.4, 66.5 |
| 2000 | 0.3 | 2 | $-2.64\times10^{-4}$ | $+3.04\times10^{-4}$ | $-5.57\times10^{-4}$ | $-5.60\times10^{-4}$ | 66.5, 69.4 |
| 2000 | 0.3 | 3 | $-2.45\times10^{-4}$ | $+2.94\times10^{-4}$ | $-5.24\times10^{-4}$ | $-5.27\times10^{-4}$ | 69.4, 72.5 |
| 2000 | 0.6 | 1 | $-2.79\times10^{-3}$ | $+2.64\times10^{-4}$ | $-3.03\times10^{-3}$ | $-3.03\times10^{-3}$ | 64.2, 66.5 |
| 2000 | 0.6 | 2 | $-2.30\times10^{-3}$ | $+2.99\times10^{-4}$ | $-2.59\times10^{-3}$ | $-2.59\times10^{-3}$ | 66.5, 69.4 |
| 2000 | 0.6 | 3 | $-2.66\times10^{-3}$ | $+1.70\times10^{-4}$ | $-2.81\times10^{-3}$ | $-2.82\times10^{-3}$ | 69.4, 71.2 |
| 2000 | 0.8 | 1 | $-1.02\times10^{-2}$ | $-1.9\times10^{-4}$ | $-9.96\times10^{-3}$ | $-9.91\times10^{-3}$ | 64.8, 55.3 |
| 2000 | 0.8 | 2 | $-7.05\times10^{-3}$ | $+2.7\times10^{-4}$ | $-7.31\times10^{-3}$ | $-7.35\times10^{-3}$ | 55.3, 66.8 |
| 2000 | 0.8 | 3 | $-2.39\times10^{-2}$ | $-9.7\times10^{-4}$ | $-2.28\times10^{-2}$ | $-2.25\times10^{-2}$ | 66.8, 32.9 |
| 2000 | 0.8 | 4 | $-8.50\times10^{-3}$ | $-2.0\times10^{-4}$ | $-8.26\times10^{-3}$ | $-8.39\times10^{-3}$ | 32.9, 42.9 |
| 8000 | 0.6 | 1 | $-1.48\times10^{-3}$ | $+5.1\times10^{-5}$ | $-1.53\times10^{-3}$ | $-1.53\times10^{-3}$ | 127.4, 129.0 |
| 8000 | 0.6 | 2 | $-1.22\times10^{-3}$ | $+1.05\times10^{-4}$ | $-1.32\times10^{-3}$ | $-1.32\times10^{-3}$ | 129.0, 132.7 |
| 8000 | 0.6 | 3 | $-1.48\times10^{-3}$ | $+1.5\times10^{-5}$ | $-1.49\times10^{-3}$ | $-1.49\times10^{-3}$ | 132.7, 133.3 |
| 8000 | 0.6 | 4 | $-1.13\times10^{-3}$ | $+1.18\times10^{-4}$ | $-1.25\times10^{-3}$ | $-1.25\times10^{-3}$ | 133.3, 137.7 |

On these fourteen half turns the torque term and the by-parts integral differ by at most $2$ percent, so on these paths the first-order gain and all other changes of $J$ contributed that little to the integral. The end-point term plus the by-parts integral reproduces the directly integrated $\int\cos2\alpha\,d\alpha/J$ to within $0.4$ percent, which checks the arithmetic of the integration by parts. The measured change of $\ln V$ agrees with the reduced relation to within $1$ percent for $V\ge0.6$ and to within $9$ percent for $V=0.3$, where the change itself is small; the residual has not been attributed to a particular neglected term. The common speed fell on every half turn, but for $V=0.3$ the end-point term is more than half the size of the torque term and of the opposite sign, so the sign of a single half turn depends on its starting angle when $V$ is small. The instantaneous relation $\dot{\mathbf V}=(1/r^2)[2(\mathbf n\cdot\mathbf V)\mathbf n-\mathbf V]$ held with median relative error between $0.8$ and $1.6$ percent, which is the size of the relative speed. For $V=0.3$ the gain of $J$ per half turn is close to the first-order value $\pi$; for $V=0.8$ the relative orbit is strongly eccentric and $J$ falls by $9.5$ and by $34$ over two of its half turns.

These are float measurements on four releases from one family of prescribed pasts, with one integrator. They show that the reduced relation and its torque term describe these paths to the stated accuracy. They do not test repeating histories, they do not bound the neglected terms in general, and they are not independent evidence for the theorems.

## The centre term does reverse the turning on releases

Theorem B would be an unconditional exclusion if the centre term could never exceed the mirror-like term on a history that obeys the equation. It can. Five releases were run with the same integrator, at separation $2000$ or $500$, common speed between $0.6$ and $0.9$, and a transverse relative speed of $0.15$ to $0.3$ of the circular value, so that the pair has too little angular momentum to hold its separation.

| $r_0$, $V$, $\alpha_0$, fraction of circular speed | Outcome | $J$ changes sign | $\lvert C_{1/2}\rvert/\hat G_{1/2}$ at the change | Largest speed up to the change |
| --- | --- | --- | --- | --- |
| 2000, 0.8, 0.3, 0.2 | closes to separation 24 | once | 41 | 0.90 |
| 2000, 0.9, 0.5, 0.3 | closes to separation 42 | once | 197 | 0.96 |
| 2000, 0.8, 0.6, 0.3 | separates | no | | |
| 2000, 0.6, 0.4, 0.15 | separates | no | | |
| 500, 0.8, 0.3, 0.2 | reaches speed 0.998 | no | | |

In two releases the relative angular momentum passes through zero and the separation direction turns back while both members are below wake speed, with the centre term tens to hundreds of times the mirror-like term at that instant. In all five the centre term exceeds the mirror-like term in size on more than 93 percent of the usable samples. So a large common velocity does produce a centre term that outweighs the mirror-like term and a loss of $J$ (measured on releases; that the same occurs on histories obeying the equation on their whole past is inferred). None of these releases is bound: each ends by separating, or by closing toward wake speed. The measurement shows that the hypothesis of Theorem B is not automatic. It does not show that a repeating history exists, and it does not show which of the three alternatives listed under [What a repeating history would have to do](#what-a-repeating-history-would-have-to-do), if any, a repeating history would realise.

## A search for a repeating history

**Method.** Two families of trial histories were used, written with the plane as the complex numbers. Family R is $z_i(t)=\sum_{k=-4}^{4}c_{ik}\,e^{i(\Omega+k\nu)t}$, which is periodic with period $2\pi/\nu$ in a frame rotating at rate $\Omega$ about a fixed centre. Family D is $z_i(t)=u\,t+\sum_kc_{ik}\,e^{ik\nu t}$, periodic up to a drift $u$. The unknowns are the eighteen complex coefficients, $\nu$, and $\Omega$ or $u$. At 48 instants spread over one period the acceleration of each trial path was compared with the row computed from the trial paths themselves, and the mismatch divided by the size of the row. A least-squares routine reduced the sum of squares from each random start. The starts were breathing pairs on unequal circles with a random lead angle, as the exploration suggested. The mean separation was held near a chosen value $r_0$, because without that the routine drifts to ever wider pairs, where the mismatch tends slowly to zero for a reason unrelated to repetition. Speeds above $0.97$ were penalised so that the one-row form of the equation remains valid, and results with any speed above $0.999$ or an unconverged root were discarded.

**Outcome (measured).** All 480 starts returned; 451 results were admissible. The smallest root-mean-square relative mismatch in each cell was:

| Mean separation $r_0$ | 0.8 | 1.2 | 2 | 3 | 5 | 8 |
| --- | --- | --- | --- | --- | --- | --- |
| Family R (40 starts each) | 0.398 | 0.288 | 0.253 | 0.293 | 0.283 | 0.232 |
| Family D (40 starts each) | 0.398 | 0.294 | 0.284 | 0.316 | 0.273 | 0.223 |

The mean separation of the results lay between $7$ percent below and $11$ percent above the chosen value. In eleven of the twelve cells the median over starts is within $7$ percent of the minimum, so the routine reaches the same floor from different starts. In family R every result with $r_0\le1.2$, and 72 percent of those with $r_0=2$, sits at the speed limit of $0.97$; in family D every result with $r_0\le3$ does. There the routine is asking for faster motion than the one-row domain allows. A mismatch of a fifth to two fifths of the acceleration is far from a solution.

**A second run at smaller and larger separations (measured).** The same routine, with its root-convergence test made relative to the size of the time values so that long periods terminate, was run from 20 starts per cell at six further mean separations. All 240 starts returned and 221 results were admissible. The smallest root-mean-square relative mismatch among the candidates reached was:

| Mean separation $r_0$ | 0.5 | 0.65 | 16 | 32 | 64 | 128 |
| --- | --- | --- | --- | --- | --- | --- |
| Family R | 0.537 | 0.460 | 0.170 | 0.123 | 0.088 | 0.062 |
| Family D | 0.537 | 0.460 | 0.169 | 0.123 | 0.088 | 0.062 |

At the two small separations every admissible result sits at the speed limit. From $16$ to $128$ the minimum times $\sqrt{r_0}$ is $0.68$, $0.69$, $0.70$ and $0.70$: the reached minimum falls as the inverse square root of the separation. A falling mismatch at large separation is therefore not a sign of approach to a repeating history in these runs. It is the behaviour expected if the mismatch of a slowly turning trial path is of the order of its relative speed, which is how the delay enters at first order; that reading is inferred from the scaling and was not tested further.

**What this establishes.** The trial paths repeat by construction; the question the routine addresses is whether any of them nearly obeys the equation. Among the candidates it reached from these 480 starts, with both members below $0.97$, none has a small acceleration mismatch at the 48 sampled instants. That is all the run shows. It does not cover either nine-harmonic family, since a local routine from random starts visits only the basins it happens to enter. It does not certify the roots, the speeds or the mismatch between the sampled instants. It is not an exclusion: a repeating history with strong higher harmonics, a different symmetry class, a mean separation outside the range, or a basin the starts missed, would not have been found.

## Instruments and what they can establish

All scripts were written in this session, run on the shared environment (Python 3.13.2, numpy 2.2.4, scipy 1.15.2) in double precision, and are retained in the ignored scratch directory `.tmp/saturday-serial/i1/` with their outputs. They are not repository instruments and have no independent review.

- **`identity_check.py`** solves each causal root by bracketing on prescribed analytic paths and compares formulas. Known cases run first and passed before any target check: a static pair (error $7\times10^{-18}$), the rigid mirror circle with $R=1$, $\omega=0.5$, where $\tau=1.800734445179$ and $\beta=\omega\tau/2=0.450183611295$ (error $3\times10^{-14}$), and a uniformly moving partner against the closed form for $\tau$ (error zero to round-off). It establishes agreement of algebra on prescribed histories and nothing about solutions.
- **`theoremB_inequality_check.py`** tests the one inequality that Theorem B, part 2, takes from the split: whenever $\lvert C_\lambda\rvert\le\eta\hat G_\lambda$, $dJ/dt\ge-(1+\eta)(\kappa_1+\kappa_2)\varrho$, with the angles taken as continuous functions over each window. Known case, run first: the rigid mirror circle, where the centre term and the turning back are zero and $dJ/dt>0$. On 3990 prescribed histories with random $\lambda$, 3510 met the hypothesis, 1847 of them with some turning back, and the inequality held in all, with smallest normalised margin $8\times10^{-5}$; the largest change of the separation angle within a window was $1.09$, below a half turn. This tests algebra on prescribed histories only.
- **`slow_release.py`** integrates the full delayed equation with fixed-step fourth-order Runge–Kutta, cubic Hermite interpolation of the stored paths and Newton solution of the single partner root. Known cases: the initial accelerations on straight pasts against the straight-window closed form (scaled error $4\times10^{-16}$), run first; halving the step changed the position after one turn by $1.3\times10^{-7}$ and the velocity by $2.5\times10^{-12}$. It establishes what a release does at float accuracy.
- **`half_turn_decomposition.py`** reads the stored paths of the four slow releases and evaluates the end-point term, the by-parts integral and the torque term of the reduced relation by the trapezoidal rule. Its check is internal: the end-point term plus the by-parts integral must reproduce the direct integral of $\cos2\alpha/J$, which it does to within $0.4$ percent.
- **`mirror_release_check.py`** uses the same integration scheme with mirror-symmetric starts. Known case, run first: on a wide slow release the ratio of $dJ/dt$ to its first-order value $J/r^2$ stayed between $0.998$ and $1.001$.
- **`reversal_release.py`** uses the same integrator and evaluates the split of the rate of $J$ on the stored path. Known case, run first: on a mirror release the centre term is zero to round-off and $dJ/dt>0$ throughout. On the target runs the split closes to between $3\times10^{-5}$ and $2.5\times10^{-2}$ relative, limited by linear interpolation of the subsampled record; the ratios quoted exceed that error by three orders of magnitude.
- **`collocation_search.py`** is the search. The first run's outputs are retained as `collocation_search_run1.out` and `collocation_search_results_run1.json`, the second's as `collocation_search_run2.out` and `collocation_search_results_run2.json`; between the two runs the root-convergence test was changed from an absolute to a relative tolerance and the worker count from seven to five, and nothing else. Known case, run first: its Newton roots agree with an independent bracketing solve to $4\times10^{-15}$. It establishes the mismatch of the trial paths it reached from the recorded starts, at 48 instants, in the one-row form of the equation, and nothing about paths it did not reach or about times between those instants.

## Limits

Planar motion, opposite polarity except in Proposition C, both members strictly below wake speed, positive separation, and a partner row at every instant are assumed throughout. Theorems A and B and Proposition C are hand proofs written in one session; the Codex review supports them by a separate hand derivation, and no numerical result has been independently certified. They are exclusions of classes that, for all that is shown here, may contain no complete history at all. Theorem B does not decide the question, because its hypotheses constrain the centre term and nothing here derives such a constraint from the equation. The slow-pair statements are algebra within reduced leading-order models, with no error bounds, and exclude nothing. All numerical results are float measurements; the releases start from prescribed straight pasts and are not solutions on their whole past.

Three approaches were tried and did not give an unconditional result. First, the comparison argument at an interior time where a member's polar angle about a fixed point attains its largest value over the past gives only that the leading member's angle never retreats, under an added half-turn hypothesis; it does not stop the two members from exchanging the lead, which a repeating history needs. Second, for exactly periodic histories the freedom to take angular momentum about any point of the plane gives one balance condition per point, but each is an average and none conflicts with attraction. Third, a pointwise bound of the centre term by the mirror-like term from speed alone fails, because the centre term is of second order in the common speed while the mirror-like term is of first order in the relative speed, and the two speeds are independent.

## Falsifiers

- A prescribed history below wake speed with $\mathbf n_1(t)\cdot\mathbf r(u)\le0$ at some $u$ in $[s_1(t),t]$ refutes Lemma 1.
- A history at which $dJ/dt\ne G_\lambda+C_\lambda$ refutes the split.
- A complete mirror history below wake speed whose polar angle satisfies $\theta(u)\le\theta(t_0)$ for all $u<b$ with some $t_0<b$ without being constant before $b$, or which winds counterclockwise without limit in the past and later turns back, refutes Theorem A.
- A complete history with $\lvert C_\lambda\rvert\le\eta\,\hat G_\lambda$ throughout for some fixed $\lambda$ and $\eta<1$ that is $J$-periodic, or one with $0\le\eta\le1$ that has wound counterclockwise without limit in the past and later turns back, refutes Theorem B.
- A like-polarity pair below wake speed with $(r^2)^{\cdot\cdot}\le0$ at some instant refutes Proposition C.
- For the slow-pair measurement only: a rerun of one of the four tabulated releases with a finer step or a different integrator in which the measured change of $\ln V$ over a half turn differs from the reduced relation $\int\cos2\alpha\,d\alpha/J$ on the same path by much more than the relative speed, or in which the torque term and the by-parts integral differ by much more than the tabulated $2$ percent, withdraws that measurement. Such a result would not bear on Theorems A and B, and the section makes no claim that a release or a solution outside those four runs must satisfy the reduced relation.
- For the search only: a rerun of the recorded 480 starts with the retained script that does not reproduce the tabulated minima withdraws the table. A trial path with a smaller mismatch found by any other run would be a better candidate for a repeating history and worth pursuing; it would not contradict the minimum observed in this fixed run.
- Any certified repeating history of an opposite pair below wake speed answers the question; it should be checked first against conditions 1 and 2.

## Next steps suggested by this note

Three alternatives remain for a repeating history: constant $J$, a loss of $J$ at an instant with no turning back, or a loss not bounded by the amount turned back. Each requires failure of every uniform centre-term bound with a fixed fraction below one. In the constant-$J$ case with one-sense turning the centre term equals the mirror-like term in size at every instant, and at an instant of loss with no turning back it strictly exceeds it; for the remaining alternative no instant of equality or excess has been proved, and the ratio could approach one without reaching it. Three routes follow. The first is to decide the constant-$J$ alternative separately: it requires $C_\lambda=-G_\lambda$ at every instant for every $\lambda$, which is a strong functional condition and may be excludable on its own. The second is a rigorous treatment of slow pairs, an averaging theorem with error bounds for the coupled common-velocity model, which the reduced relation above suggests but does not supply. The third is a certified search at relative speeds that are not small, with more harmonics, the symmetry classes that the centre term favours, and enclosure of the mismatch between sampled instants, aimed at a candidate or at a bounded negative with a stated coverage.
