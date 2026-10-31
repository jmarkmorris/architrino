# A balance-function obstruction to repeating two-member histories at small speed bounds (2026-10-21)

## Result

**For two architrinos of opposite polarity whose speeds never exceed $81/1000$ of the wake speed, no history repeats, even up to a rotation of the separation vector and with any drift or turning of the pair as a whole. The proof uses a function $\mathcal L$ of the separation, its rate and the two members' velocities across the separation axis. It is not conserved and nothing is assumed conserved. Over each period of a hypothetical repeating history, the delayed rows make its accumulated change at least a fixed positive multiple of $\oint r^{-3}dt$, while its change over any number of periods stays bounded; the two requirements are incompatible. The proof does not show that $\mathcal L$ increases at every instant. The in-and-out asymmetry of the radial motion, which the inverse-weighted angular balance left as the only unknown, is not needed for this conclusion.** The setting is the periodicity question of the [binary manuscript, Section 9](../manuscript.md#9-curved-delay-windows-and-the-unresolved-period-average), in the class of the accepted [inverse-weight note](saturday-binary-correlation-travel-2026-10-20-inverse-weight.md):

- complete planar pairs of opposite unit polarity under the unchanged [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), with unit reduced coupling and wake speed $c_f=1$;
- twice continuously differentiable paths, positive separation $r$, and both speeds at most $w<1/3$ over the whole history;
- at every instant one ordinary partner root per member and no positive-delay root from the member's own past;
- relative periodicity: $\mathbf r(t+T)=R\,\mathbf r(t)$ for one period $T$ and one orientation-preserving rotation $R$, with no rigid recurrence assumed.

**Why a new balance is needed.** The accepted period balances integrate the rate of the relative angular momentum $J$ with a weight, and each leaves a correlation between the pair's common velocity and its relative orbit that no accepted estimate controls by sign. The inverse-separation weight of Theorem R removes that correlation but leaves the relative-orbit quantity $\tfrac12\oint\dot r\,d^2\,dt$, the excess of transverse speed on the outward legs over the inward legs, which must be at least a positive multiple of $\oint r^{-2}dt$. This note uses a different balance. It combines the weight $1/r^2$ on the rate of $J^2$, whose common-motion correlation has the non-constant weight $1/r$, with the radial equation weighted by the radial speed $\dot r$. A third piece, the derivative of a separation term built from the members' velocities across the axis, completes the balance. When each delayed row is replaced by its straight-window comparison (the row the receiver would get if the transmitter had always moved along its present tangent line), two exact cancellations occur: the common-motion correlation of the first balance cancels against the part of that separation term's derivative that comes from the turning of the axis, and the aberration-reduced radial row in the second, weighted by $-\dot r$, cancels against the term $(S_1+S_2)\dot r/r^2$ in that derivative. The remaining term of the separation term's derivative, $(t_1q_1^0+t_2q_2^0)/r$, combines with $A_r^0/r$ to give the straight radial row divided by $r$ times $1-t_1t_2$. What remains is therefore a positive delayed gain of size about $2/r^3$, not a correlation.

1. **A kinematic derivative (derived).** For any two twice continuously differentiable planar paths with $r>0$ and speeds below one, the function $\mathcal L=\tfrac12\dot r^2+\tfrac12d^2-(S_1+S_2+\dot r)/r$, with $d=J/r$ the relative transverse speed and $S_i=\sqrt{1-b_i^2}$ built from member $i$'s velocity $b_i$ across the axis, has an explicit derivative in terms of the actual inward acceleration $A_r$ and the actual transverse accelerations $q_i$ (Lemma Y.1).
2. **On straight comparison rows the derivative is positive (derived).** With the straight-window rows of the accepted curved-window note the derivative is exactly $(1-t_1t_2)(S_1+S_2+\dot r)/r^3$, with $t_i=b_i/S_i$, which is at least $(2\sqrt{1-w^2}-2w)(1-w^2/(1-w^2))/r^3>0$ below speed one third (Lemma Y.2).
3. **The curved-window corrections enter multiplied by a velocity (derived).** On solutions the actual derivative differs from the straight value by terms bounded by $(|\dot r|+1/r)\,C_A/r^3$ and $(|d|+\hat t/r)\,e/r^3$, with explicit constants from the accepted curved-window and aberration bounds (Lemma Y.3).
4. **No repeating history at speed bounds up to $81/1000$ (derived; certificate evaluated exactly).** If the explicit number $\Gamma(w)$ of Theorem Y is positive, no relative-periodic history exists in the class. Exact rational evaluation gives $\Gamma(81/1000)>0$, $\Gamma(1/20)>1.198$ and $\Gamma(1/100)>1.903$; by nesting of the classes, every pair whose speeds stay at or below $81/1000$ is covered, whatever its separation, eccentricity, sign pattern of $J$ or common velocity (Theorem Y). On the grid of steps $1/1000$ the certificate is positive up to $81/1000$ and first fails at $82/1000$; it is negative at $w=1/12$ and $w=1/10$. Since $\Gamma$ is strictly decreasing in $w$, its positive range is an interval whose upper end lies between $81/1000$ and $82/1000$ (it is still positive at $811/10000$ by the review's evaluation); larger speed bounds up to $1/10$ stay open on this route with these constants.

> Claim grade: derived for Lemmas Y.1–Y.3 and Theorem Y, by the hand proofs below from accepted pointwise row bounds and kinematic identities on the stated class; the certificate values are exact-rational evaluations by a same-author instrument that passed three known cases first, which is arithmetic verification and not independent evidence. The kinematic identity of Lemma Y.1 and the straight-window algebra of Lemma Y.2 were also compared in floating point with the same instrument on prescribed paths and root-solved straight rows, after three known cases; those comparisons check algebra only and are not evidence about solutions. Nothing is measured on a history. Falsifier: a complete relative-periodic history in the class with speed bound at most $81/1000$ refutes Theorem Y; two $C^2$ planar paths at which the derivative formula of Lemma Y.1 fails refute that lemma; a pair of straight comparison rows for which Lemma Y.2's value fails refutes it; a valid solution violating one of the accepted inputs invalidates that input and withdraws the proof support of each statement that uses it, refuting such a statement only if it also violates that statement's conclusion; an exact evaluation with $\Gamma(81/1000)\le0$ withdraws the threshold.

## Setting and accepted inputs

**Class and recurrence.** The class $\mathcal C_w$ is that of the [low-angular-momentum theorem](saturday-low-angular-momentum-2026-10-14.md#setting-and-accepted-inputs): two architrinos of opposite unit polarity move in a plane on twice continuously differentiable paths $\mathbf x_1,\mathbf x_2$ defined for all times, obey the unchanged Master Equation with unit reduced coupling and $c_f=1$, keep positive separation, keep both speeds at most $w$ at every time for one fixed $0<w<1/3$, and at every instant each receives exactly one ordinary partner row and none from its own past. A history is *relative-periodic* (J-periodic in the accepted notes) when $\mathbf r(t+T)=R\,\mathbf r(t)$, $\mathbf r=\mathbf x_1-\mathbf x_2$, for one $T>0$ and one rotation $R$ of the motion plane that preserves its orientation; an orientation-reversing return is handled by doubling the period. Relative periodicity makes $r$, $\dot r$, $J$ and $d$ periodic. It does not make the members' velocity components periodic, because the common velocity may drift or turn independently of the relative vector. Rigid recurrence is not assumed anywhere below.

**Notation.** $\hat{\mathbf r}=\mathbf r/r$ and $\hat{\boldsymbol\theta}$ are the unit vectors along and across the separation axis, and $\vartheta$ is the continuous polar angle of $\mathbf r$, so $\dot{\hat{\mathbf r}}=\dot\vartheta\,\hat{\boldsymbol\theta}$, $\dot{\hat{\boldsymbol\theta}}=-\dot\vartheta\,\hat{\mathbf r}$ and $\dot\vartheta=J/r^2=d/r$. Member $i$ has velocity components $u_i=\hat{\mathbf r}\cdot\mathbf v_i$ along and $b_i=\hat{\boldsymbol\theta}\cdot\mathbf v_i$ across the axis, so $\dot r=u_1-u_2$ and $d=b_1-b_2$. Define

$$
S_i=\sqrt{1-b_i^2},\qquad t_i=\frac{b_i}{S_i},\qquad q_i=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_i,\qquad A_r=-\hat{\mathbf r}\cdot(\ddot{\mathbf x}_1-\ddot{\mathbf x}_2).
$$

Here $q_i$ is member $i$'s actual acceleration across the axis and $A_r$ is the actual inward relative acceleration along it. Under the speed bound, $|b_i|\le w$, $S_i\ge S_w:=\sqrt{1-w^2}$, $|t_i|\le\hat t:=w/S_w$, $|\dot r|\le2w$ and $|d|\le2w$. Over one period $I_n=\oint r^{-n}dt$. Nothing below divides by $J$.

**Accepted inputs, each pointwise and valid for any sign of J.** On a solution member $i$ receives the row $\ddot{\mathbf x}_i=-a_i\mathbf n_i$ of strength $a_i$ along the unit vector $\mathbf n_i$ from the partner's emission point to the receiver, with aberration angles $\beta_i$ as in the [non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md).

- (N1) Proposition D of the non-mirror note: $q_1=a_1\sin\beta_1$, $q_2=-a_2\sin\beta_2$ and $A_r=a_1\cos\beta_1+a_2\cos\beta_2$; and the kinematic relations $\ddot r=d^2/r-A_r$ and $\dot b_i=q_i-\dot\vartheta u_i$.
- (N2) Lemma 3 and bounds (B4), (B5) of the non-mirror note: $|\sin\beta_1+b_2|\le\epsilon_2$ and $|\sin\beta_2-b_1|\le\epsilon_1$ with $\epsilon_i\le\hat\epsilon/r$, $\hat\epsilon=(1+w)^2/(2(1-3w)^2)$; $|\sin\beta_i|\le w$; and $r^3(a_1\epsilon_2+a_2\epsilon_1)\le c_3=(1+w)^3/(1-3w)^2$ (manuscript Section 9.2 and the curved-window note's Corollary S1.1).
- (N3) Lemma S.1 and Theorem S1 of the [curved-window note](saturday-curved-window-strength-difference-2026-10-11.md): the straight comparison strengths are $r^2a_1^0=1-u_2/S_2$ and $r^2a_2^0=1+u_1/S_1$, and $|a_i-a_i^0|\le c(w)/(2r^3)$ with $c(w)=\frac{(1+w)^3}{(1-w)(1-3w)^2}\bigl[1+\frac{3+2w}{\sqrt{1-w^2}}\bigr]$.
- (N4) From the low-J theorem: $c_-/r^2\le A_r$ with $c_-=2(1-w)^2\sqrt{1-w^2}/(1+w)$, and the floor $r_{\min}\ge c_-/(4w^2)$ on relative-periodic histories (Lemma 0).

All inputs are derived from the whole-history speed bound and the canonical per-hit row, whose transmitter factor is evaluated at emission, and are accepted in the cited reviews. No conserved energy, force, mass or angular momentum enters, and $\mathcal L$ below is not assumed to be conserved or bounded by any law.

**The straight comparison row.** For a receiver at its actual present position, the straight comparison row is the row it would receive if the transmitter had always moved along the tangent line to its path at the present instant, with its present velocity. For that row the transmitter's displacement over the delay window is exactly its present velocity times the delay, so Lemma 3 of the non-mirror note holds with zero allowance: $\sin\beta_1^0=-b_2$ and $\sin\beta_2^0=b_1$, hence $\cos\beta_1^0=S_2$ and $\cos\beta_2^0=S_1$ (both cosines are positive by the wake-front bound). With (N3) the straight values of the three accelerations used below are

$$
A_r^0=\frac{S_1+S_2+\dot r}{r^2},\qquad q_1^0=-\frac{(S_2-u_2)\,t_2}{r^2},\qquad q_2^0=-\frac{(S_1+u_1)\,t_1}{r^2}.
$$

For the first, $a_1^0S_2+a_2^0S_1=[(S_2-u_2)+(S_1+u_1)]/r^2$; for the others, $q_1^0=a_1^0\sin\beta_1^0=-(1-u_2/S_2)b_2/r^2$ and $q_2^0=-a_2^0\sin\beta_2^0=-(1+u_1/S_1)b_1/r^2$. These are functions of the present state only.

## 1. The balance function and its derivative

The balance function collects three pieces: the relative kinetic budget $\tfrac12\dot r^2+\tfrac12d^2=\tfrac12|\mathbf v_1-\mathbf v_2|^2$, a separation term $-(S_1+S_2)/r$ that the straight rows make close to $-2/r$, and the term $-\dot r/r$, whose derivative converts the difference of transverse and radial budgets into the inward acceleration. Define

$$
\mathcal L=\frac12\dot r^2+\frac12d^2-\frac{S_1+S_2+\dot r}{r}.
$$

**Lemma Y.1 (derived; kinematic).** For any two twice continuously differentiable planar paths with $r>0$ and $|b_i|<1$,

$$
\dot{\mathcal L}=-\dot r\,A_r+\frac{A_r}r+d\,(q_1-q_2)+\frac{t_1q_1+t_2q_2}r+\frac{(S_1+S_2)\,\dot r}{r^2}-\frac{d}{r^2}\,(u_1t_1+u_2t_2)-\frac{d^2}{r^2}+\frac{\dot r^2}{r^2}.
$$

*Proof.* Differentiating $|\mathbf r|$ twice gives $\ddot r=d^2/r-A_r$. Since $J=\mathbf r\times(\mathbf v_1-\mathbf v_2)$, $\dot J=\mathbf r\times(\ddot{\mathbf x}_1-\ddot{\mathbf x}_2)=r(q_1-q_2)$, and with $d=J/r$, $d\dot d=J\dot J/r^2-d^2\dot r/r=d(q_1-q_2)-d^2\dot r/r$. So $\tfrac{d}{dt}(\tfrac12\dot r^2+\tfrac12d^2)=\dot r(d^2/r-A_r)+d(q_1-q_2)-d^2\dot r/r=-\dot rA_r+d(q_1-q_2)$. Next $\tfrac{d}{dt}(-\dot r/r)=-\ddot r/r+\dot r^2/r^2=-d^2/r^2+A_r/r+\dot r^2/r^2$. Finally $\dot b_i=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_i+\mathbf v_i\cdot\dot{\hat{\boldsymbol\theta}}=q_i-\dot\vartheta u_i$, so $\dot S_i=-b_i\dot b_i/S_i=-t_iq_i+\dot\vartheta u_it_i$ and $\tfrac{d}{dt}(-(S_1+S_2)/r)=(S_1+S_2)\dot r/r^2+(t_1q_1+t_2q_2)/r-(d/r^2)(u_1t_1+u_2t_2)$, using $\dot\vartheta=d/r$. Add the three parts. $\blacksquare$

The identity is kinematic: $A_r$ and $q_i$ are the actual accelerations of the two paths, whatever produced them. Nothing divides by $J$, and the identity holds through zeros and sign changes of $J$. It uses only the present state and present accelerations.

## 2. The straight-window value

**Lemma Y.2 (derived).** If $A_r$, $q_1$, $q_2$ in Lemma Y.1 are replaced by their straight comparison values $A_r^0$, $q_1^0$, $q_2^0$, the right side equals

$$
\dot{\mathcal L}^0=(1-t_1t_2)\,\frac{S_1+S_2+\dot r}{r^3}.
$$

Under the speed bound, $\dot{\mathcal L}^0\ge(1-\hat t^{\,2})(2S_w-2w)/r^3>0$ for every $w<1/3$.

*Proof.* Group the right side of Lemma Y.1 in three parts. The radial part is $-\dot rA_r^0+(S_1+S_2)\dot r/r^2+\dot r^2/r^2=-\dot r(S_1+S_2+\dot r)/r^2+(S_1+S_2)\dot r/r^2+\dot r^2/r^2=0$. The transverse part is

$$
d(q_1^0-q_2^0)-\frac{d}{r^2}(u_1t_1+u_2t_2)-\frac{d^2}{r^2}
=\frac d{r^2}\bigl[-b_2+u_2t_2+b_1+u_1t_1\bigr]-\frac d{r^2}(u_1t_1+u_2t_2)-\frac{d^2}{r^2}=0,
$$

because $(S_2-u_2)t_2=b_2-u_2t_2$, $(S_1+u_1)t_1=b_1+u_1t_1$ and $b_1-b_2=d$. The remaining part is

$$
\frac{A_r^0}r+\frac{t_1q_1^0+t_2q_2^0}r=\frac{S_1+S_2+\dot r}{r^3}-\frac{t_1t_2\,[(S_2-u_2)+(S_1+u_1)]}{r^3}=(1-t_1t_2)\frac{S_1+S_2+\dot r}{r^3}.
$$

For the bound, $|t_1t_2|\le\hat t^{\,2}=w^2/(1-w^2)<1/8$ and $S_1+S_2+\dot r\ge2S_w-2w>0$ when $w<1/3$. $\blacksquare$

**Reading.** The two cancellations carry the mechanism. In the transverse part, the straight torque term $d(q_1^0-q_2^0)=(d/r^2)\,[d+u_1t_1+u_2t_2]$ contains the common-motion term $(d/r^2)(u_1t_1+u_2t_2)$, which at second order in speed is $(d/2r^2)(P_\parallel P_\perp+\dot r\,d)$, with $P_\parallel,P_\perp$ the components of the velocity sum $\mathbf P=\mathbf v_1+\mathbf v_2$. This is the straight-window form of the common-motion correlation in the $1/r^2$-weighted balance of $J^2$. The separation term contributes exactly its negative, through the part $\dot\vartheta u_it_i$ of $\dot S_i$, which records how the members' velocities across the axis change as the axis turns. In the radial part, the straight radial row is $(S_1+S_2+\dot r)/r^2$: an aberration-reduced part $(S_1+S_2)/r^2$, which depends on the common velocity across the axis through $b_1$ and $b_2$, and a part $\dot r/r^2$, by which the attraction is stronger while the pair separates. Weighted by $-\dot r$, the first is cancelled by the derivative $(S_1+S_2)\dot r/r^2$ of the separation term and the second by the term $\dot r^2/r^2$ from the derivative of $-\dot r/r$. What survives is the straight radial row divided by $r$, multiplied by $1-t_1t_2$. The common transverse velocity enters the surviving term through $S_1+S_2$, which lies between $2S_w$ and $2$, and through $t_1t_2$, of size at most $w^2/(1-w^2)$; neither can change its sign. Over a period, $\oint\dot r/r^3\,dt=0$, so the surviving term integrates, to leading order in the speed bound, to $2I_3$: with straight rows the accumulated change of $\mathcal L$ over a period is close to $2\oint r^{-3}dt$ whatever the shape of the relative orbit.

For orientation only, a static inverse-square comparison with inward acceleration $2/r^2$ would make $\tfrac12\dot r^2+\tfrac12d^2-2/r$ constant; the comparison is not a solution of the delayed law and is not used. The terms of $\mathcal L$ beyond that comparison, $-(S_1+S_2-2)/r-\dot r/r$, are what turn the first-order delay terms of the straight rows into an exact derivative plus a positive remainder.

## 3. The curved-window corrections

On a solution the rows are not straight; the accepted curved-window and aberration bounds limit the difference. Write $\Delta A_r=A_r-A_r^0$ and $\Delta q_i=q_i-q_i^0$. Since the right side of Lemma Y.1 is affine in $(A_r,q_1,q_2)$,

$$
\dot{\mathcal L}=\dot{\mathcal L}^0+\Bigl(\frac1r-\dot r\Bigr)\Delta A_r+\Bigl(d+\frac{t_1}r\Bigr)\Delta q_1+\Bigl(-d+\frac{t_2}r\Bigr)\Delta q_2 .
$$

**Lemma Y.3 (derived).** On a history in $\mathcal C_w$, at every instant,

$$
|\Delta A_r|\le\frac{C_A}{r^3},\qquad|\Delta q_1|+|\Delta q_2|\le\frac e{r^3},\qquad
C_A=c(w)+\frac{2(1+w)\,w\,\hat\epsilon}{S_w},\qquad e=c_3+w\,c(w),
$$

and consequently

$$
\dot{\mathcal L}\ \ge\ \frac{2S_w+\dot r-2\hat t^{\,2}(1+w)}{r^3}-\Bigl(|\dot r|+\frac1r\Bigr)\frac{C_A}{r^3}-\Bigl(|d|+\frac{\hat t}r\Bigr)\frac e{r^3}.
$$

*Proof.* *Radial.* $\Delta A_r=(a_1-a_1^0)\cos\beta_1+a_1^0(\cos\beta_1-S_2)+(a_2-a_2^0)\cos\beta_2+a_2^0(\cos\beta_2-S_1)$. By (N3), the first and third terms total at most $c/r^3$. For the second, $|\cos\beta_1-S_2|=|\sin^2\beta_1-b_2^2|/(\cos\beta_1+S_2)\le|\sin\beta_1+b_2|\,(|\sin\beta_1|+|b_2|)/(2S_w)\le w\epsilon_2/S_w$, using (N2) and $\cos\beta_1\ge S_w$; and $r^2a_1^0=1-u_2/S_2\le1+w$, because $u_2^2\le w^2-b_2^2$ gives $u_2^2/S_2^2\le(w^2-b_2^2)/(1-b_2^2)\le w^2$. The fourth term is bounded in the same way with $\epsilon_1$ and $r^2a_2^0=1+u_1/S_1\le1+w$. With $\epsilon_i\le\hat\epsilon/r$ the second and fourth terms total at most $2(1+w)w\hat\epsilon/(S_wr^3)$.

*Transverse.* $\Delta q_1=a_1(\sin\beta_1+b_2)-(a_1-a_1^0)b_2$ and $\Delta q_2=-a_2(\sin\beta_2-b_1)-(a_2-a_2^0)b_1$. By (N2) and (N3), $|\Delta q_1|+|\Delta q_2|\le a_1\epsilon_2+a_2\epsilon_1+wc/r^3\le(c_3+wc)/r^3$.

*Consequence.* $(1-t_1t_2)(S_1+S_2+\dot r)=(S_1+S_2+\dot r)-t_1t_2(S_1+S_2+\dot r)\ge2S_w+\dot r-\hat t^{\,2}(2+2w)$, since $0<S_1+S_2+\dot r\le2+2w$ and $t_1t_2\le\hat t^{\,2}$. The coefficients satisfy $|1/r-\dot r|\le|\dot r|+1/r$, $|d+t_1/r|\le|d|+\hat t/r$ and $|-d+t_2/r|\le|d|+\hat t/r$. $\blacksquare$

Every curvature correction carries a factor $|\dot r|$, $|d|$ or $1/r$. This is the structural reason the argument closes at small speed: the corrections are first order in the speed bound relative to the straight-window gain, while that gain is of order one.

## 4. No relative-periodic history at small speed bounds

**Theorem Y (derived).** Define

$$
\Gamma(w)=2S_w-2\hat t^{\,2}(1+w)-2w\sqrt{C_A^2+2e^2}-\frac{4w^2\,(C_A+\hat t\,e)}{c_-}.
$$

If $\Gamma(w)>0$, no history in $\mathcal C_w$ is relative-periodic. Exact rational evaluation gives $\Gamma(81/1000)>0$. Hence no complete planar opposite-unit pair whose speeds stay at or below $81/1000$ has a relative-periodic history, and in particular none has a periodic, rigidly repeating or rotating-and-drifting repeating history.

*Proof.* Let a relative-periodic history in $\mathcal C_w$ with period $T$ be given, and integrate the inequality of Lemma Y.3 over $[0,NT]$ for an integer $N\ge1$.

*Left side.* $\int_0^{NT}\dot{\mathcal L}\,dt=\mathcal L(NT)-\mathcal L(0)$. The terms $\tfrac12\dot r^2$, $\tfrac12d^2$ and $\dot r/r$ are periodic, and $r(NT)=r(0)$, so $\mathcal L(NT)-\mathcal L(0)=-[S_1+S_2]_0^{NT}/r(0)$. Each $S_i$ lies in $[S_w,1]$, so $|\mathcal L(NT)-\mathcal L(0)|\le2(1-S_w)/r(0)$, a bound independent of $N$. The members' velocities need not recur; only this bounded boundary term involves them.

*Right side.* Every term on the right of Lemma Y.3 is a function of $r$, $\dot r$ and $d$ alone, hence periodic, so its integral over $[0,NT]$ is $N$ times its integral over one period. Over one period $\oint\dot r\,r^{-3}dt=-\tfrac12[r^{-2}]=0$. The function $\dot r/r^2$ is periodic and $\tfrac{d}{dt}(\dot r/r^2)=\ddot r/r^2-2\dot r^2/r^3=d^2/r^3-A_r/r^2-2\dot r^2/r^3$, so $2\oint\dot r^2r^{-3}dt=\oint d^2r^{-3}dt-\oint A_rr^{-2}dt\le\oint d^2r^{-3}dt\le4w^2I_3$, using $A_r>0$ from (N4) and $|d|\le2w$. By the Cauchy–Schwarz inequality, with $C_A|\dot r|+e|d|\le\sqrt{C_A^2/2+e^2}\,\sqrt{2\dot r^2+d^2}$,

$$
\oint\frac{C_A|\dot r|+e|d|}{r^3}\,dt\le\sqrt{\frac{C_A^2}2+e^2}\,\Bigl(\oint\frac{2\dot r^2+d^2}{r^3}dt\Bigr)^{1/2}I_3^{1/2}\le\sqrt{\frac{C_A^2}2+e^2}\,\sqrt{8w^2}\,I_3=2w\sqrt{C_A^2+2e^2}\,I_3 .
$$

The floor (N4) gives $\oint r^{-4}dt\le I_3/r_{\min}\le(4w^2/c_-)I_3$, which bounds the two terms with the factor $1/r$. Therefore the integral of the right side over one period is at least $\Gamma(w)\,I_3$.

*Conclusion.* $N\,\Gamma(w)\,I_3\le2(1-S_w)/r(0)$ for every $N$. Since $I_3>0$, dividing by $N$ and letting $N\to\infty$ gives $\Gamma(w)\le0$. So $\Gamma(w)>0$ excludes the history. A history whose speeds stay at or below some $w'\le w$ belongs to $\mathcal C_w$, so the exclusion at $w=81/1000$ covers every smaller speed bound without any monotonicity of $\Gamma$. Periodic, rigidly repeating and rotating-and-drifting repeating histories are relative-periodic. $\blacksquare$

The exact evaluation gives the following conservative values; each lower bound is rounded down from the exact rational enclosure, which uses the lower end of every square-root bracket in the positive terms and the upper end in the subtracted ones.

| speed bound $w$ | straight gain $2S_w-2\hat t^{\,2}(1+w)>$ | curvature term $2w\sqrt{C_A^2+2e^2}<$ | floor term $<$ | $\Gamma(w)>$ |
| --- | --- | --- | --- | --- |
| $1/100$ | $1.9996$ | $0.09480$ | $0.000922$ | $1.9039$ |
| $1/50$ | $1.9987$ | $0.21219$ | $0.004251$ | $1.7823$ |
| $1/20$ | $1.9922$ | $0.75244$ | $0.041350$ | $1.1984$ |
| $1/16$ | $1.9877$ | $1.0946$ | $0.078214$ | $0.81497$ |
| $3/40$ | $1.9822$ | $1.5349$ | $0.13697$ | $0.31041$ |
| $2/25$ | $1.9796$ | $1.7446$ | $0.16876$ | $0.066389$ |
| $81/1000$ | | | | positive (exact sign) |

At $w=1/12$ the exact lower enclosure of $\Gamma$ is about $-0.112$ and at $w=1/10$ about $-1.23$, and the scan over $j/1000$ stops at $82/1000$, where the lower enclosure is not positive. The scan does not by itself locate the end of the positive range: $\Gamma$ is strictly decreasing, because $2S_w$ decreases while $\hat t$, $c$, $C_A$ and $e$ increase and $c_-$ decreases, so the end lies between $81/1000$ and $82/1000$, and the review's independent evaluation gives $\Gamma(811/10000)>0.0089$. A non-positive certificate says only that this proof gives nothing there; it is not a statement that a repeating history exists. The dominant subtracted term is the radial curvature allowance $2wC_A$ with $C_A\approx c(w)$, and $c(1/10)$ exceeds $12.7$.

**Worked reading at speed bound one twentieth.** A pair whose speeds never exceed $0.05$ gains, over every relative period, at least $1.19\oint r^{-3}dt$ in $\mathcal L$, while $\mathcal L$ can change over any whole number of periods by at most $2(1-\sqrt{0.9975})/r(0)<0.0026/r(0)$. The accumulated gain grows in proportion to the number of periods and the allowed change does not, so after enough periods, a number set by the history's own $r(0)$ and $\oint r^{-3}dt$, the two are incompatible and the history cannot be relative-periodic. The argument does not depend on how eccentric the orbit is, on how $J$ changes sign, or on what the common velocity does.

## 5. Relation to the in-and-out asymmetry route

The inverse-weight note's Theorem R states that a relative-periodic history needs $\tfrac12\oint\dot rd^2dt\ge G(w,r_{\min})\,I_2$ with $G>0$ at $w\le1/10$: the transverse speed must on balance be larger on the outward legs. The present note does not bound that quantity. For speed bounds at or below $81/1000$ the question is closed instead, because no relative-periodic history exists there; Theorem R's requirement and the accepted amplitude and excursion requirements are then statements about an empty class. For speed bounds above the end of the positive range of $\Gamma$ (between $81/1000$ and $82/1000$) and up to $1/10$, Theorem R, its corollaries and the open asymmetry estimate stand as before, and the certificate of Theorem Y is not positive with the present curvature constants.

The two balances differ in where the common-motion correlation goes. With the weight $1/r$ on $J^2$, the correlation is the turning correlation $\oint\dot\vartheta P_\parallel P_\perp dt$, which the common-motion equation fixes, and the remainder is the kinematic asymmetry $\tfrac12\oint\dot rd^2dt$, whose sign is the open question. With the weight $1/r^2$ the correlation has the non-constant weight $1/r$ and no accepted estimate controls it alone. Lemma Y.2 shows that, at straight-window level, it is cancelled exactly by the part $\dot\vartheta u_it_i$ of the derivative of the separation term $-(S_1+S_2)/r$, the part that records how the members' transverse velocities change as the axis turns. Separately, the aberration-reduced radial row weighted by $-\dot r$ is cancelled by the term $(S_1+S_2)\dot r/r^2$ of the same derivative, and its radial-speed part by the derivative of $-\dot r/r$. The last term of the separation term's derivative, $(t_1q_1^0+t_2q_2^0)/r$, is not cancelled: it combines with $A_r^0/r$ to give the remainder, the straight radial row divided by $r$ times $1-t_1t_2$, which is positive. Two exact identities of the same relative orbit, $\oint J\dot J\,r^{-2}dt=\oint\dot rA_r\,dt$ and $\oint(d^2-\dot r^2)r^{-2}dt=\oint A_rr^{-1}dt$, both from periodicity of $r$, $\dot r$ and $d$, are what Lemma Y.1 packages into one derivative; they are exact consequences of relative periodicity and of the radial equation, not conservation laws.

## Limits

Planar, opposite-polarity, unit-coupling, complete histories with positive separation and the whole-history speed bound are assumed throughout, together with relative periodicity after an orientation-preserving rotation (or a doubled period). The proofs use the accepted inputs (N1)–(N4); any defect there propagates. The threshold $81/1000$ is a property of the present constants, chiefly the curved-window constant $c(w)$; it is not a speed above which repeating histories are known to exist, and a sharper curved-window estimate would move it. The theorem excludes relative-periodic histories only; bounded histories that never recur, and histories that exceed the speed bound at some time, are not treated. The separation floor (N4), which itself rests on relative periodicity, is used only for the terms carrying a factor $1/r$. No history was integrated, no prescribed path was used as a solution, and no repeating solution is shown to exist. Mirror symmetry, constant common velocity, conserved $J$, conserved $\mathcal L$, rigid recurrence and observer-level physics are not assumed. Nothing here changes BP-001, production gates or canonical scores.

## Instrument

The certificate and the two algebra checks come from [`balance_function_check.py`](../evidence/saturday-binary-inout-asymmetry-2026-10-21/balance_function_check.py), described in the [evidence README](../evidence/saturday-binary-inout-asymmetry-2026-10-21/README.md). Part A, in floating point, first reproduces the accepted curved-window note's four hand values of straight-row strength by its own bisection root solver, the value $\dot{\mathcal L}=0$ for a rigid rotation about a fixed centre, and the exact value $(4v+4v^2)/r^2$ for free radial motion; it then compares the derivative formula of Lemma Y.1 with central differences of $\mathcal L$ on 400 prescribed smooth paths (largest scaled difference $2.9\times10^{-8}$, a finite-difference discrepancy that includes floating-point rounding as well as truncation; the chunk-1 review's 70-digit evaluation of the same samples puts the truncation part near $6.4\times10^{-10}$) and the value of Lemma Y.2 with the formula evaluated on root-solved straight rows in 2000 random states (largest relative difference $1.3\times10^{-12}$). Prescribed paths do not obey the equation; these comparisons check algebra and transcription, not any statement about solutions. Part B evaluates $\Gamma$ in exact rational arithmetic with integer-square-root brackets, after the exact zero-speed values and accepted hand values at $w=1/10$. This is the author's arithmetic verification, not independent evidence; the derivations are hand proofs.

## Falsifiers

- Two $C^2$ planar paths with $r>0$ and $|b_i|<1$ at which the derivative of $\mathcal L$ differs from the formula of Lemma Y.1 refute it; prescribed paths suffice.
- Present positions and velocities whose straight comparison rows give a value other than $(1-t_1t_2)(S_1+S_2+\dot r)/r^3$ in Lemma Y.1's formula refute Lemma Y.2.
- A solution in $\mathcal C_w$ at which $|\Delta A_r|>C_A/r^3$ or $|\Delta q_1|+|\Delta q_2|>e/r^3$ refutes Lemma Y.3, or one of the accepted inputs it uses.
- A complete relative-periodic history in $\mathcal C_w$ with $w\le81/1000$ refutes Theorem Y.
- A valid solution violating one of (N1)–(N4) invalidates that input and withdraws the proof support of every statement that uses it; it refutes such a statement only if it also violates that statement's conclusion.
- An exact evaluation with $\Gamma(81/1000)\le0$ withdraws the threshold, and one showing a tabulated decimal non-conservative withdraws that entry.

## Reading record (operational)

Read in full on 2026-10-21 between 02:25Z and 02:36Z by the clock: the common brief, AGENTS.md, the generated startup router, the operator explanation standard, the three accepted October 20 binary subjects, the evidence README and both instruments, the chunk-2 review replies of all three rounds and the first and final review replies of chunks 1 and 3 (their second-round replies were not read), the low-angular-momentum note, the non-mirror note with its M2 continuation, and the canonical Master Equation passages on the transmitter-side root floor, acceleration weight, causal emission times, per-hit acceleration, total acceleration, partner and self-hit split and the zero-delay exclusion. The straight-window form of the balance function was found during that reading, after the non-mirror note and before the curved-window note; it was first recorded in the working log at 02:36:37Z, the curved-window note was then read in full at 02:36Z, Lemma Y.3 was derived after it, and the instrument checked the algebra at 02:40:13Z. Between 02:41Z and 02:46Z the remaining sources named in the brief were read in full: the October 17 note and its review; the signed-breathing note and review; the reviews of the low-angular-momentum, curved-window and non-mirror notes; the radial-period note, with its review's derivation, corrections and final disposition; the October 10 note, with its review's derivation, corrections and final disposition (the intermediate delivery receipts were skimmed); manuscript Sections 9 through 9.7; the periodicity queue entry; and the academic style guide's audience, explanation, claim-grade, avoidance and checklist sections. No consequence for the derivation was found in that later reading. This record is development provenance and not part of the academic treatment.
