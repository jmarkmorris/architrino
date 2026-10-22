# Slow opposite pairs cannot stay bound: every complete history separates without limit at small speed bounds (2026-10-21)

## Result

**Every complete history of two opposite-polarity architrinos whose speeds never exceed $81/1000$ of the wake speed comes in from unbounded separation and returns to unbounded separation: the separation tends to infinity both as time increases and as time decreases. No such history keeps its separation bounded on any half-line, so there is no bound pair, periodic or not, in this class.** The note extends the [balance-function note](saturday-binary-inout-asymmetry-2026-10-21.md), which excludes relative-periodic histories, from repeating histories to every complete history. Two facts make the extension work. The separation floor that the accepted notes proved for repeating histories holds for every complete history, because below the floor the separation is concave in time and would reach zero in finite time in one of the two time directions. And the balance function $\mathcal L$ of the companion note is bounded above and below on every complete history once the floor holds, while over every finite interval its change is at least $\Gamma(w)\int r^{-3}dt$ minus a term growing only like the square root of that integral and a bounded allowance; an unbounded accumulated weight $\int r^{-3}dt$ would therefore force an unbounded increase of $\mathcal L$, so the weight is finite over the whole time line. The proof does not show that $\mathcal L$ increases at every instant.

The setting is the class $\mathcal C_w$ of the companion note and of the [low-angular-momentum theorem](saturday-low-angular-momentum-2026-10-14.md#setting-and-accepted-inputs):

- complete planar pairs of opposite unit polarity, defined for all times, under the unchanged [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), with unit reduced coupling and $c_f=1$;
- twice continuously differentiable paths, positive separation $r$, and both speeds at most $w<1/3$ over the whole history;
- at every instant one ordinary partner root per member and no positive-delay root from the member's own past.

No recurrence of any kind is assumed.

1. **The separation floor holds for every complete history (derived).** Every complete history in $\mathcal C_w$ has $r(t)\ge c_-/(4w^2)$ at all times, with $c_-=2(1-w)^2\sqrt{1-w^2}/(1+w)$ (Lemma Y.5). The accepted floor of the low-angular-momentum theorem was proved for relative-periodic histories only.
2. **The inverse-cube time integral is finite (derived).** If the certificate $\Gamma(w)$ of the companion note's Theorem Y is positive, every complete history in $\mathcal C_w$ satisfies $\int_{-\infty}^{\infty}r^{-3}dt\le X_w^2$ with an explicit $X_w$ (Theorem Y.6).
3. **The separation tends to infinity at both ends (derived).** Under the same condition $r(t)\to\infty$ as $t\to+\infty$ and as $t\to-\infty$, and the total time that the pair spends at separations at most $R$ is at most $R^3X_w^2$ (Corollary Y.7). Since $\Gamma(81/1000)>0$, this holds for every complete history whose speeds stay at or below $81/1000$.

> Claim grade: derived for Lemma Y.5, Theorem Y.6 and Corollary Y.7, by the hand proofs below from the companion note's Lemma Y.3, its certificate and the accepted pointwise inputs. The positivity of $\Gamma(81/1000)$ is the companion note's exact-rational evaluation by a same-author instrument, which is arithmetic verification and not independent evidence; no new computation was run for this note. Nothing is measured on a history. Falsifier: a complete history in $\mathcal C_w$ with $r<c_-/(4w^2)$ at some instant refutes Lemma Y.5; one with $w\le81/1000$ and $\int r^{-3}dt>X_w^2$, or whose separation stays bounded on some half-line, refutes Theorem Y.6 or Corollary Y.7; a valid solution violating an accepted input invalidates that input and withdraws the proof support of the statements that use it, refuting one of them only if it also violates that statement's conclusion.

## Setting and inputs

The notation is that of the companion note: $\dot r$ is the radial speed, $d=J/r$ the relative transverse speed, $b_i$ member $i$'s velocity across the axis, $S_i=\sqrt{1-b_i^2}$, $t_i=b_i/S_i$, $S_w=\sqrt{1-w^2}$, $\hat t=w/S_w$, and $A_r$ the actual inward relative acceleration. The balance function is

$$
\mathcal L=\frac12\dot r^2+\frac12d^2-\frac{S_1+S_2+\dot r}{r}.
$$

The inputs are:

- (C1) the companion note's Lemma Y.3: on every history in $\mathcal C_w$, at every instant,
  $$
  \dot{\mathcal L}\ \ge\ \frac{2S_w+\dot r-2\hat t^{\,2}(1+w)}{r^3}-\Bigl(|\dot r|+\frac1r\Bigr)\frac{C_A}{r^3}-\Bigl(|d|+\frac{\hat t}r\Bigr)\frac e{r^3},
  $$
  with $C_A=c(w)+2(1+w)w\hat\epsilon/S_w$, $\hat\epsilon=(1+w)^2/(2(1-3w)^2)$, $e=c_3+wc(w)$, $c(w)$ the accepted curved-window constant and $c_3=(1+w)^3/(1-3w)^2$. Lemma Y.3 is pointwise and uses no recurrence;
- (C2) the accepted pointwise relations $\ddot r=d^2/r-A_r$ and $A_r\ge c_-/r^2$ (inputs I5 and I2 of the low-angular-momentum theorem), and $|\dot r|\le2w$, $|d|\le2w$, $|b_i|\le w$ from the speed bound;
- (C3) the companion note's certificate
  $$
  \Gamma(w)=2S_w-2\hat t^{\,2}(1+w)-2w\sqrt{C_A^2+2e^2}-\frac{4w^2(C_A+\hat te)}{c_-},
  $$
  with $\Gamma(81/1000)>0$ by exact evaluation.

## 1. The floor holds for every complete history

**Lemma Y.5 (derived).** Every complete history in $\mathcal C_w$ satisfies $r(t)\ge\rho_w:=c_-/(4w^2)$ for all $t$.

*Proof.* By (C2), wherever $r<\rho_w$,

$$
\ddot r=\frac{d^2}r-A_r\le\frac{4w^2}r-\frac{c_-}{r^2}=\frac{4w^2r-c_-}{r^2}<0 .
$$

Suppose $r(t_*)<\rho_w$ for some $t_*$.

*Case $\dot r(t_*)\le0$.* Let $t_+=\sup\{t>t_*:r<\rho_w\text{ on }[t_*,t]\}$. On $[t_*,t_+)$ the radial speed is strictly decreasing, so $\dot r(t)<\dot r(t_*)\le0$ for $t_*<t<t_+$; then $r$ decreases there and stays below $r(t_*)<\rho_w$, so $t_+$ cannot be finite (at a finite $t_+$ continuity would give $r(t_+)\le r(t_*)<\rho_w$ and the interval would extend). Hence $r<\rho_w$ and $\dot r(t)\le\dot r(t_*+1)<0$ for all $t\ge t_*+1$, so $r(t)\le r(t_*+1)+\dot r(t_*+1)(t-t_*-1)$ becomes negative at a finite time. That contradicts positive separation at all times.

*Case $\dot r(t_*)>0$.* Let $t_-=\inf\{t<t_*:r<\rho_w\text{ on }[t,t_*]\}$. On $(t_-,t_*]$ the radial speed is strictly decreasing in time, so $\dot r(t)>\dot r(t_*)>0$ for $t_-<t<t_*$; then $r(t)<r(t_*)<\rho_w$ there, and as before $t_-=-\infty$. Hence $r(t)\le r(t_*)-\dot r(t_*)(t_*-t)$ for all $t<t_*$, which becomes negative at a finite earlier time, again a contradiction. $\blacksquare$

The mechanism is the same as at the closest approach of a repeating history, where $\ddot r\ge0$ forces $J^2\ge c_-r$: below the floor the largest transverse budget the speed bound allows, $d^2\le4w^2$, cannot balance the inward acceleration, so the separation is strictly concave there. A complete history cannot enter that region, because concavity would carry it to zero separation either later (if it is approaching) or earlier (if it is receding). The accepted floor of the low-angular-momentum theorem's Lemma 0 is the special case of a relative-periodic history.

## 2. The inverse-cube time integral is finite

**Theorem Y.6 (derived).** Let $\Gamma(w)>0$. Every complete history in $\mathcal C_w$ satisfies

$$
\int_{-\infty}^{\infty}\frac{dt}{r^3}\ \le\ X_w^2,\qquad
X_w=\frac{B_w+\sqrt{B_w^2+4\Gamma(w)\,K_w}}{2\Gamma(w)},
$$

$$
B_w=\frac{2\sqrt w}{\rho_w}\sqrt{\frac{C_A^2}2+e^2},\qquad
K_w=2w^2+\frac{2+2w}{\rho_w}+\frac1{2\rho_w^2},\qquad\rho_w=\frac{c_-}{4w^2}.
$$

*Proof.* Fix $t_0<t_1$ and put $I=\int_{t_0}^{t_1}r^{-3}dt$. Integrate (C1) over $[t_0,t_1]$.

*Left side.* Since $S_1+S_2+\dot r\ge2S_w-2w>0$, $\mathcal L<\tfrac12(\dot r^2+d^2)=\tfrac12|\mathbf v_1-\mathbf v_2|^2\le2w^2$; and $\mathcal L\ge-(S_1+S_2+\dot r)/r\ge-(2+2w)/\rho_w$ by Lemma Y.5. Hence $\mathcal L(t_1)-\mathcal L(t_0)\le2w^2+(2+2w)/\rho_w$.

*The radial-speed term.* $\int_{t_0}^{t_1}\dot r\,r^{-3}dt=\tfrac12\bigl(r(t_0)^{-2}-r(t_1)^{-2}\bigr)\ge-1/(2\rho_w^2)$.

*The curvature terms.* From $\tfrac{d}{dt}(\dot r/r^2)=\ddot r/r^2-2\dot r^2/r^3$ and (C2), $2\dot r^2/r^3=d^2/r^3-A_r/r^2-\tfrac{d}{dt}(\dot r/r^2)$. Since $A_r>0$, $|d|\le2w$ and $|\dot r/r^2|\le2w/\rho_w^2$ at both ends,

$$
\int_{t_0}^{t_1}\frac{2\dot r^2+d^2}{r^3}dt\le2\int_{t_0}^{t_1}\frac{d^2}{r^3}dt+\frac{4w}{\rho_w^2}\le8w^2I+\frac{4w}{\rho_w^2}.
$$

By the Cauchy–Schwarz inequality, with $C_A|\dot r|+e|d|\le\sqrt{C_A^2/2+e^2}\,\sqrt{2\dot r^2+d^2}$ and $\sqrt{a+b}\le\sqrt a+\sqrt b$,

$$
\int_{t_0}^{t_1}\frac{C_A|\dot r|+e|d|}{r^3}dt\le\sqrt{\frac{C_A^2}2+e^2}\,\Bigl(2\sqrt2\,w\sqrt I+\frac{2\sqrt w}{\rho_w}\Bigr)\sqrt I=2w\sqrt{C_A^2+2e^2}\,I+B_w\sqrt I .
$$

*The terms with a factor $1/r$.* By Lemma Y.5, $\int_{t_0}^{t_1}(C_A+\hat te)\,r^{-4}dt\le(C_A+\hat te)\,I/\rho_w=4w^2(C_A+\hat te)\,I/c_-$.

*Assembly.* The lower bound of (C1) integrates to at least $[2S_w-2\hat t^{\,2}(1+w)]I-1/(2\rho_w^2)-2w\sqrt{C_A^2+2e^2}\,I-B_w\sqrt I-4w^2(C_A+\hat te)I/c_-$, so

$$
\Gamma(w)\,I-B_w\sqrt I\le2w^2+\frac{2+2w}{\rho_w}+\frac1{2\rho_w^2}=K_w .
$$

With $x=\sqrt I\ge0$ this reads $\Gamma x^2-B_wx-K_w\le0$, whose solutions satisfy $x\le X_w$. The bound does not depend on $t_0$ or $t_1$; letting $t_0\to-\infty$ and $t_1\to\infty$ gives the theorem. $\blacksquare$

The proof is the companion note's Theorem Y with the period replaced by an arbitrary interval. In the periodic case the change of $\mathcal L$ over $N$ periods was bounded by a term involving only the members' velocities across the axis; here the whole of $\mathcal L$ is bounded, because the floor bounds $1/r$ and the speed bound bounds the velocity terms. The boundary terms that the period removed exactly, $[r^{-2}]$ and $[\dot r/r^2]$, are now bounded by the floor instead.

## 3. The separation tends to infinity

**Corollary Y.7 (derived).** Let $\Gamma(w)>0$ and let a complete history in $\mathcal C_w$ be given. Then:

1. for every $R>0$ the set of times with $r(t)\le R$ has total length at most $R^3X_w^2$;
2. $r(t)\to\infty$ as $t\to+\infty$ and as $t\to-\infty$;
3. no half-line $[t_0,\infty)$ or $(-\infty,t_0]$ carries a bounded separation; in particular the history is not relative-periodic, not periodic, and not bound in any weaker sense of bounded separation.

Since $\Gamma(81/1000)>0$ and a history with speed bound $w'\le81/1000$ belongs to $\mathcal C_{81/1000}$, the three statements hold for every complete history whose speeds stay at or below $81/1000$.

*Proof.* (1) On the set where $r\le R$, $r^{-3}\ge R^{-3}$, so its length $\ell$ satisfies $\ell R^{-3}\le\int r^{-3}dt\le X_w^2$. (2) Suppose $r$ does not tend to infinity as $t\to+\infty$. Then there are $R>0$ and times $t_k\to\infty$ with $r(t_k)\le R$; pass to a subsequence with $t_{k+1}-t_k>R/w$. Because $|\dot r|\le2w$, $r\le2R$ on each interval $[t_k-R/(2w),t_k+R/(2w)]$, and these intervals are disjoint. Each contributes at least $(R/w)(2R)^{-3}$ to $\int r^{-3}dt$, so the integral is infinite, contradicting Theorem Y.6. The case $t\to-\infty$ is the same. (3) follows from (2). $\blacksquare$

**Reading.** The pair cannot remain bound because, over every finite interval, the delayed rows make the change of $\mathcal L$ at least $\Gamma(w)\int r^{-3}dt-B_w(\int r^{-3}dt)^{1/2}-1/(2\rho_w^2)$, while the speed bound and the floor keep $\mathcal L$ between $-(2+2w)/\rho_w$ and $2w^2$. A pair that stayed within a bounded separation would accumulate an unbounded weight $\int r^{-3}dt$ and hence, by that estimate, an unbounded increase of $\mathcal L$. The estimate need not be positive on a short interval, so it does not say that $\mathcal L$ increases at every instant. What the pair can do is pass through a close encounter, whose total weight $\int r^{-3}dt$ is finite, and separate again. Whether the relative speed after the encounter must exceed the relative speed before it is not decided here: the integrated lower bound of Theorem Y.6 bounds the encounter's weight, but it does not sign the net change of $\mathcal L$.

## Limits

The class is the companion note's: planar, opposite unit polarities, unit coupling, $c_f=1$, complete twice continuously differentiable histories defined for all times, positive separation, and the speed bound $w$ at every time. Histories that exceed the speed bound at some time, releases from prescribed pasts, and histories defined only on a half-line are not covered, because the accepted curved-window and aberration bounds need the speed bound over the whole past. The threshold $81/1000$ is a property of the present constants and is not a speed above which bound pairs are known to exist. The class may contain no history at all; nothing here shows that a complete history in $\mathcal C_w$ exists. Mirror symmetry, constant common velocity, any conserved quantity and observer-level physics are not assumed, and $\mathcal L$ is not assumed to be conserved. Nothing here changes BP-001, production gates or canonical scores.

## Falsifiers

- A complete history in $\mathcal C_w$ with $r(t_*)<c_-/(4w^2)$ at some instant refutes Lemma Y.5.
- A complete history in $\mathcal C_w$ with $w\le81/1000$ and $\int_{-\infty}^\infty r^{-3}dt>X_w^2$ refutes Theorem Y.6; one whose separation stays bounded on a half-line, or spends more than $R^3X_w^2$ total time at separations at most $R$, refutes Corollary Y.7.
- A valid solution violating an accepted input, or the companion note's Lemma Y.3, invalidates it and withdraws the proof support of every statement that uses it; it refutes such a statement only if it also violates that statement's conclusion.
- An exact evaluation with $\Gamma(81/1000)\le0$ withdraws the threshold.

## Reading record (operational)

The reading recorded in the companion note covers this note. The extension was found after the companion note was submitted for review at 02:48:46Z on 2026-10-21 and first recorded in the working log at 02:50:32Z; this note was written between 02:50Z and 02:53Z by the clock. No instrument was written or run for this note. This record is development provenance and not part of the academic treatment.
