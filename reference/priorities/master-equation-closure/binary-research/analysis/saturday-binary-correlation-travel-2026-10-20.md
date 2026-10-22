# The radial–anisotropy correlation bounded by the relative radial excursion (2026-10-20)

## Result

**Centring the turning weight at the closest approach bounds the remaining common-motion correlation by the relative radial excursion of the pair instead of by its radial speed. At a speed bound where the accepted coefficient condition $D>m$ holds, every repeating two-member history in the subwake class whose closest approach lies below an explicit cutoff must therefore breathe with a minimum amplitude, not only with a minimum mean radial speed. Small-amplitude histories that the accepted mean-speed lines admit are excluded when their amplitude is below this requirement; at speed bound one tenth the cutoff is about four million and the requirement reaches about ten thousand. Strongly eccentric wide histories remain open.** The setting is the periodicity question of the [binary manuscript, Section 9](../manuscript.md#9-curved-delay-windows-and-the-unresolved-period-average), in the class of the accepted [actual-correlation note](saturday-actual-common-motion-correlations-2026-10-17.md):

- complete planar pairs of opposite unit polarity under the unchanged [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), with unit reduced coupling and wake speed $c_f=1$;
- twice continuously differentiable paths, positive separation $r$, and both speeds at most $w<1/3$ over the whole history;
- at every instant one ordinary partner root per member and no positive-delay root from the member's own past.

The accepted note reduces the sign-free correlation $K_2=-\frac12\oint d\,P_\parallel P_\perp\,dt$ to a nonnegative loss, a third-order remainder and the radial–anisotropy correlation $\tfrac18\oint\dot rQ\,dt$, which it bounds by size, $\tfrac{w^2}2\oint|\dot r|\,dt$. Here $d=J/r$ is the relative transverse speed, $P_\parallel,P_\perp$ are the components of the velocity sum $\mathbf P=\mathbf v_1+\mathbf v_2$ along and across the separation axis, and $Q=P_\parallel^2-P_\perp^2$. This note carries out the centred-excursion route that the accepted note proposed (its Section 5) and makes the excursion explicit.

1. **An exact split about any reference separation (derived).** For every constant $r_*$, $K_2=-\tfrac18r_*[Q]+\tfrac14r_*\oint H\,dt-\tfrac12\oint(r-r_*)\dot\vartheta P_\parallel P_\perp\,dt$, where $H=A_\parallel P_\parallel-A_\perp P_\perp$ is the actual acceleration–velocity product of the common motion and $\vartheta$ is the polar angle of the separation vector. The identity is regular through zeros of the relative angular momentum $J$ (Lemma E.1).
2. **The correlation is bounded by the relative excursion (derived).** Take $r_*=r_{\min}$ and write $\varepsilon_r=1-r_{\min}/r_{\max}$ for the relative radial excursion. Under rigid recurrence the radial–anisotropy correlation obeys $\tfrac18\oint\dot rQ\le-\tfrac14\oint(r-r_{\min})(P_\parallel^2+r^2\mu P_\perp^2)r^{-2}dt+\tfrac14\oint(r-r_{\min})|\mathcal R|\,dt+w^2\varepsilon_r\oint|d|\,dt$, with a nonpositive principal term. Under relative periodicity alone, where the common velocity need not recur, the integral $K_2^{(N)}$ of the correlation over $N$ periods obeys $K_2^{(N)}\le w^2r_{\min}+N\bigl[m\oint d^2dt+w^2\varepsilon_r\oint|d|\,dt\bigr]$, so the bound holds per period after averaging over many periods. The coefficient $m$ is the accepted note's $\mathcal M/c_-$. The relative excursion $\varepsilon_r$ replaces the size bound's factor one (Theorem E.2).
3. **Repeating histories need a minimum radial amplitude (derived; constants evaluated exactly).** Every relative-periodic history at a speed bound with $D>m$ satisfies $w^2\Delta r+wz_0r_{\max}\ge(D-m)\sqrt{c_-r_{\min}}$, where $\Delta r=r_{\max}-r_{\min}$ (Corollary E.3). At $w=1/10$ this forces $\Delta r>121$ when $r_{\min}$ is at the accepted floor, $\Delta r>1906$ when $r_{\min}=10^4$, and $\Delta r>10083$ when $r_{\min}=10^6$. The requirement is positive only for closest approach below $r_{\min}\approx4.04\times10^6$, the accepted constant-separation cutoff of the same balance; above it Corollary E.3 forces no amplitude.
4. **Complementarity and what remains (derived for the comparison; inferred for its reading).** The accepted lines $c_-\langle1/r\rangle\le a_f\langle|\dot r|\rangle+b_f$ constrain the mean radial speed; Corollary E.3 constrains the amplitude. The two conditions are logically separate: for example, separations between $10^4$ and $1.1\times10^4$ with mean radial speed $0.001$ satisfy all three accepted lines at $w=1/10$ but violate Corollary E.3. This compares scalar necessary conditions and constructs no solution. Neither result reaches wide histories whose relative excursion is of order one, where the centred bound returns the size bound, nor small-excursion histories whose closest approach exceeds the cutoff above; both remain open (Section 4).

> Claim grade: derived for Lemma E.1, Theorem E.2 and Corollary E.3, by the hand proofs below from the accepted pointwise row bounds on the stated class; the decimals are exact-rational evaluations by a same-author instrument that passed six known cases first, which is arithmetic verification and not independent evidence. Nothing is measured on a history. Falsifier: a complete relative-periodic history in the class, at a speed bound with $D>m$, with $w^2\Delta r+wz_0r_{\max}<(D-m)\sqrt{c_-r_{\min}}$, refutes Corollary E.3; a valid solution violating one of the accepted pointwise inputs invalidates that input and withdraws the proof support of every statement that uses it.

## Setting and accepted inputs

**Class and recurrence.** The class $\mathcal C_w$ is that of the [low-angular-momentum theorem](saturday-low-angular-momentum-2026-10-14.md#setting-and-accepted-inputs). A history is *relative-periodic* (called J-periodic in the accepted notes) when $\mathbf r(t+T)=R\,\mathbf r(t)$ for one period $T>0$ and one rotation $R$ of the motion plane that preserves its orientation, where $\mathbf r=\mathbf x_1-\mathbf x_2$; an orientation-reversing return is handled by doubling the period. Relative periodicity makes $r$, $\dot r$, $J$ and $d$ periodic. It does not make $P_\parallel$, $P_\perp$ or $Q$ periodic, because the common velocity may drift or turn independently of the relative vector. *Rigid recurrence*, $\mathbf x_i(t+T)=R\mathbf x_i(t)+\mathbf b$ for both members with one rotation and one vector, does make them periodic. Every statement below is proved under relative periodicity; rigid recurrence is used only where it is named, to remove a boundary term in a one-period version.

**Notation.** $\hat{\mathbf r}$ and $\hat{\boldsymbol\theta}$ are the unit vectors along and across the separation axis and $\vartheta$ is the continuous polar angle of $\mathbf r$, so $\dot\vartheta=J/r^2=d/r$; every quantity below is regular wherever $r>0$, including at zeros of $J$, and nothing divides by $J$. $\mathbf A=\ddot{\mathbf x}_1+\ddot{\mathbf x}_2$ has components $A_\parallel,A_\perp$ along $\hat{\mathbf r},\hat{\boldsymbol\theta}$. Over one period: $Q_d=\oint d^2dt$ (transverse kinetic budget), $L_d=\oint|d|\,dt$ (transverse travel), $R_1=\oint|\dot r|\,dt$ (radial travel), $I_n=\oint r^{-n}dt$. Time means are $\langle f\rangle=T^{-1}\oint f\,dt$; $r_{\min}$, $r_{\max}$ are the least and greatest separations, $\Delta r=r_{\max}-r_{\min}$ is the radial excursion and $\varepsilon_r=\Delta r/r_{\max}\in[0,1)$ is the relative radial excursion.

**Accepted inputs, each pointwise and valid for any sign of J.**

- (I1)–(I5) of the low-J theorem: row strengths $\alpha/r^2\le a_i\le c_1/r^2$, with mean $\mu=(a_1+a_2)/2$ and half-difference $\delta=(a_2-a_1)/2$; inward relative acceleration $c_-/r^2\le A_r\le c_+/r^2$; $\dot J=\mu J+r\delta P_\perp+re_J$ with $|re_J|\le c_3/r^2$; $2r^2\delta=P_\parallel+\zeta$ with $|\zeta|\le z_0+c/r$; $\ddot r=d^2/r-A_r$.
- (I6) The actual-row decomposition of the [signed-breathing note](saturday-signed-breathing-radial-travel-2026-10-14.md) (Lemma W.2, Theorem W.3), as used in the accepted correlation note:

  $$H=A_\parallel P_\parallel-A_\perp P_\perp=\frac{P_\parallel^2+r^2\mu P_\perp^2}{r^2}+\mathcal R,\qquad|\mathcal R|\le\frac{4k_1}{r^2}+\frac{k_A'}{r^3},\qquad 0\le P_\parallel^2+r^2\mu P_\perp^2\le4w^2c_1.$$

- (I7) The kinematic identity of the correlation note's Lemma C.1: $\dot Q=2H+4\dot\vartheta P_\parallel P_\perp$.
- From the low-J theorem: $\oint J\dot J\,dt=0$ and $\oint A_r\,dt=\oint d^2r^{-1}dt$ (Lemma 0), the floor $r_{\min}\ge c_-/(4w^2)$, the primitive balance $\alpha Q_d\le K_2+wz_0L_d+e\oint|d|r^{-1}dt$ from the proof of Theorem Z, and the estimate $\oint|d|r^{-1}dt\le Q_d/\sqrt{c_-r_{\min}}\le(2w/c_-)Q_d$.

The constants $\alpha,c_1,c_\pm,c_3,c,z_0,e=c_3+wc,D=\alpha-2we/c_-$ are those of the low-J theorem; $k_1,k_A'$ are those of the signed-breathing note; and $\mathcal M=w^2c_1+k_1+w^2k_A'/c_-$, $m=\mathcal M/c_-$ are those of the correlation note. All inputs are derived from the whole-history speed bound and the canonical per-hit row, whose transmitter factor is evaluated at emission and summed over the admitted roots; they are accepted in the cited reviews. No conserved energy, force, mass or angular momentum enters.

## 1. An exact split about any reference separation

The accepted reduction integrated $r\dot Q$ by parts with the weight $r$ itself. The same correlation can be split at any constant separation $r_*$: a part with the constant weight $r_*$, whose turning correlation is fixed by the common-motion equation, and a part with the weight $r-r_*$, which vanishes where the pair passes the reference separation.

**Lemma E.1 (derived).** On every history in $\mathcal C_w$, for every constant $r_*$ and every interval $[0,T']$,

$$
-\frac12\int_0^{T'}d\,P_\parallel P_\perp\,dt
=-\frac{r_*}8\bigl[Q\bigr]_0^{T'}+\frac{r_*}4\int_0^{T'}H\,dt-\frac12\int_0^{T'}(r-r_*)\,\dot\vartheta\,P_\parallel P_\perp\,dt .
$$

*Proof.* Since $d=r\dot\vartheta=r_*\dot\vartheta+(r-r_*)\dot\vartheta$, the left side equals $-\frac{r_*}2\int\dot\vartheta P_\parallel P_\perp-\frac12\int(r-r_*)\dot\vartheta P_\parallel P_\perp$. By (I7), $\dot\vartheta P_\parallel P_\perp=\tfrac14\dot Q-\tfrac12H$, so $\int\dot\vartheta P_\parallel P_\perp=\tfrac14[Q]-\tfrac12\int H$. $\blacksquare$

The identity is kinematic until $H$ is replaced by its actual-row form (I6). No factor $1/J$ and no measure $d\vartheta$ appears, so it holds through zeros and sign changes of J. With $r_*=0$ it is the definition of $K_2$; integrating its turning term by parts with (I7) gives the correlation note's identity $K_2=\tfrac18\oint\dot rQ+\tfrac14\oint rH$ under rigid recurrence. A choice $r_*\ne0$ moves part of the turning correlation into the constant-weight term, whose integral (I7) fixes exactly; that is what makes the next step possible.

## 2. The correlation bounded by the relative excursion

The useful choice is $r_*=r_{\min}$. The constant-weight part then carries the weight $r_{\min}$, which is at most $r$ everywhere, so it is bounded by the accepted loss. The remaining weight $(r-r_{\min})\dot\vartheta=(1-r_{\min}/r)\,d$ is at most $\varepsilon_r|d|$ in size.

**Theorem E.2 (derived).** Let a relative-periodic history in $\mathcal C_w$ be given, and let $K_2^{(N)}=-\frac12\int_0^{NT}d\,P_\parallel P_\perp\,dt$ over $N$ consecutive periods. Then

$$
K_2^{(N)}\le w^2r_{\min}+N\Bigl[m\,Q_d+w^2\varepsilon_rL_d\Bigr].
$$

Under rigid recurrence the term $w^2r_{\min}$ is absent and the one-period form reads $K_2\le mQ_d+w^2\varepsilon_rL_d$. In terms of the radial–anisotropy correlation, under rigid recurrence,

$$
\frac18\oint\dot rQ\,dt\le-\frac14\oint\frac{(r-r_{\min})(P_\parallel^2+r^2\mu P_\perp^2)}{r^2}\,dt+\frac14\oint(r-r_{\min})|\mathcal R|\,dt+w^2\varepsilon_rL_d,
$$

whose first term is nonpositive. Under relative periodicity alone the same integration by parts over $N$ periods adds the boundary term $\tfrac18(r(0)-r_{\min})[Q]_0^{NT}$, of size at most $w^2(r(0)-r_{\min})$, which vanishes on division by $N$ or when the interval starts at a closest approach.

*Proof.* Apply Lemma E.1 on $[0,NT]$ with $r_*=r_{\min}$.

*Boundary.* $|Q|\le|\mathbf P|^2\le4w^2$, so $|[Q]_0^{NT}|\le8w^2$ and $\tfrac{r_{\min}}8|[Q]|\le w^2r_{\min}$. Under rigid recurrence $Q$ is periodic and the term vanishes.

*Constant-weight part.* By (I6), $\tfrac{r_{\min}}4H\le\tfrac{r_{\min}}4\bigl(4w^2c_1+4k_1\bigr)r^{-2}+\tfrac{r_{\min}}4k_A'r^{-3}$. Lemma 0 and (I2) give $c_-I_2\le\oint A_r\,dt=\oint d^2r^{-1}dt\le Q_d/r_{\min}$, so $r_{\min}I_2\le Q_d/c_-$. Also $r_{\min}I_3\le I_2\le Q_d/(c_-r_{\min})\le(4w^2/c_-^2)Q_d$ by the floor. Hence one period contributes at most $[(w^2c_1+k_1)/c_-+w^2k_A'/c_-^2]\,Q_d=mQ_d$.

*Turning part.* $|P_\parallel P_\perp|\le\tfrac12|\mathbf P|^2\le2w^2$ and $0\le(r-r_{\min})/r\le1-r_{\min}/r_{\max}=\varepsilon_r$, so $\tfrac12|(r-r_{\min})\dot\vartheta P_\parallel P_\perp|\le w^2\varepsilon_r|d|$. One period contributes at most $w^2\varepsilon_rL_d$. The integrands themselves need not be periodic, because $P_\parallel P_\perp$ need not be; but both bounds are integrals of periodic functions of $r$ and $d$, so every period obeys the same bound.

*Correlation form.* Under rigid recurrence, $\tfrac18\oint\dot rQ=-\tfrac18\oint(r-r_{\min})\dot Q=-\tfrac14\oint(r-r_{\min})H-\tfrac12\oint(r-r_{\min})\dot\vartheta P_\parallel P_\perp$ by parts and (I7). Insert (I6) in the first integral and the turning bound in the second. $\blacksquare$

**Reading.** The accepted proof of the sign-free balance bounded the whole correlation $K_2$ by $w^2L_d$. The accepted reduction replaced that by the radial travel, $\tfrac{w^2}2R_1$, plus the loss. Theorem E.2 replaces it by $w^2\varepsilon_rL_d$ plus the same loss. Since $\varepsilon_r<1$, the new bound is never worse than the size bound on the turning part, and it is small when the separation varies little relative to its largest value, whatever the radial speed. The principal part of $H$ enters with a nonpositive sign in the correlation form because the centre $r_{\min}$ lies at or below every value of $r$: centring at the closest approach is what turns the sign-definite common-motion term into help rather than hindrance.

## 3. Mean bounds and a necessary radial amplitude

**Corollary E.3 (derived).** Let a relative-periodic history in $\mathcal C_w$ be given at a speed bound with $D>m$, and put $k_\varepsilon=(w^2\varepsilon_r+wz_0)/(D-m)$. Then

$$
Q_d\le k_\varepsilon L_d,\qquad\langle|d|\rangle\le k_\varepsilon,\qquad\langle d^2\rangle\le k_\varepsilon^2,\qquad r_{\max}\ge\frac{\sqrt{c_-r_{\min}}}{k_\varepsilon},
$$

and the last inequality is equivalent to

$$
w^2\Delta r+wz_0\,r_{\max}\ \ge\ (D-m)\sqrt{c_-r_{\min}} .
$$

Equivalently, a history whose closest approach is $r_{\min}$ needs the radial excursion $\Delta r\ge\bigl[(D-m)\sqrt{c_-r_{\min}}-wz_0r_{\min}\bigr]/(w^2+wz_0)$. This requirement is positive exactly for $r_{\min}<c_-(D-m)^2/(wz_0)^2$. As a function of $r_{\min}>0$ its largest value is $(D-m)^2c_-/[4wz_0(w^2+wz_0)]$, attained at $r_{\min}=c_-(D-m)^2/(4(wz_0)^2)$; that point lies above the accepted floor $c_-/(4w^2)$, and so is admissible, exactly when $D-m\ge z_0$, which holds at the three tabulated speeds.

*Proof.* The primitive balance over $N$ periods reads $N\alpha Q_d\le K_2^{(N)}+Nwz_0L_d+Ne\oint|d|r^{-1}dt$, because $\int_0^{NT}J\dot J\,dt=0$ for every $N$. Insert Theorem E.2 and $\oint|d|r^{-1}dt\le(2w/c_-)Q_d$, divide by $N$ and let $N\to\infty$: $(D-m)Q_d\le(w^2\varepsilon_r+wz_0)L_d$. The Cauchy–Schwarz inequality gives $L_d^2\le TQ_d\le Tk_\varepsilon L_d$, and $L_d>0$ by the accepted Proposition U, so $\langle|d|\rangle\le k_\varepsilon$ and $\langle d^2\rangle\le k_\varepsilon^2$. Lemma 0 and (I2) give $c_-\langle r^{-2}\rangle\le\langle d^2r^{-1}\rangle\le k_\varepsilon^2/r_{\min}$, and $\langle r^{-2}\rangle\ge r_{\max}^{-2}$. Multiplying $r_{\max}\ge\sqrt{c_-r_{\min}}/k_\varepsilon$ by $k_\varepsilon$ and using $\varepsilon_rr_{\max}=\Delta r$ gives the displayed form; substituting $r_{\max}=r_{\min}+\Delta r$ and solving for $\Delta r$ gives the excursion requirement. The function $(D-m)\sqrt{c_-\rho}-wz_0\rho$ of $\rho$ is positive below $c_-(D-m)^2/(wz_0)^2$ and largest at $\sqrt\rho=(D-m)\sqrt{c_-}/(2wz_0)$. $\blacksquare$

**Two limits.** With $\varepsilon_r=0$ (constant separation) the requirement reads $r\ge c_-(D-m)^2/(wz_0)^2$, which is the accepted form-(B) constant-separation cutoff $c_-/b'$ of the correlation note. With $\varepsilon_r\to1$ the coefficient $k_\varepsilon$ exceeds the accepted Theorem Z constant $k=(w^2+wz_0)/D$, and Corollary E.3 adds nothing to Theorem Z's bound $r_{\max}\ge\sqrt{c_-r_{\min}}/k$. The new content lies between: it ties the forced separation to the amplitude of the breathing.

The exact-rational evaluation gives the following conservative values. Each lower bound is rounded down and each upper bound up; the excursion requirement is computed from lower bounds of $D-m$, $c_-$ and the square root and upper bounds of $wz_0$.

| $w$ | $D-m\ge$ | $wz_0\le$ | $w^2+wz_0\le$ | positive below $r_{\min}=$ | largest requirement $\Delta r\ge$ |
| --- | --- | --- | --- | --- | --- |
| $1/10$ | $0.16737$ | $1.0076\times10^{-4}$ | $0.010101$ | $4.0436\times10^6$ | $10084$ (near $r_{\min}\approx1.01\times10^6$) |
| $1/20$ | $0.74353$ | $6.2618\times10^{-6}$ | $0.0025063$ | $2.4207\times10^{10}$ | $1.5120\times10^7$ |
| $1/100$ | $0.95859$ | $1.0001\times10^{-8}$ | $1.0002\times10^{-4}$ | $1.7830\times10^{16}$ | $4.4575\times10^{11}$ |

| $r_{\min}$ | required $\Delta r$ at $w=1/10$ | at $w=1/20$ | at $w=1/100$ |
| --- | --- | --- | --- |
| accepted floor $c_-/(4w^2)$ | $>121.04$ (floor $36.63$) | $>5093.0$ (floor $171.68$) | $>930078$ (floor $4851.7$) |
| $10^3$ | $>624.34$ | $>12290$ | below floor |
| $10^4$ | $>1906.1$ | $>38847$ | $>1.3352\times10^6$ |
| $10^5$ | $>5345.6$ | $>1.2267\times10^5$ | $>4.2225\times10^6$ |
| $10^6$ | $>10083$ | $>3.8622\times10^5$ | $>1.3352\times10^7$ |

**Worked reading at speed bound one tenth.** A relative-periodic history whose closest approach is $r_{\min}=10^4$ must reach at least $r_{\max}>11906$: its relative excursion exceeds $0.16$. One with $r_{\min}=10^6$ must reach beyond $1.01\times10^6$. Consider separations confined between $10^4$ and $1.1\times10^4$ with mean radial speed $\langle|\dot r|\rangle=0.001$. Then $c_-\langle1/r\rangle<1.4654\times10^{-4}$, while every accepted line has slope at least $0.2$ and so a right side at least $2\times10^{-4}$: all three accepted lines are satisfied. Corollary E.3 is violated, because the amplitude $10^3$ is below $1906$. This shows the two necessary conditions are logically separate; it constructs no solution. Since each of the three tabulated speed bounds also bounds every slower history, the first row applies to the whole class $w\le1/10$.

## 4. Relation to the mean radial-speed lines, and the remaining obstruction

Both the accepted Corollary C.4 and Corollary E.3 are necessary conditions on the same class, derived from the same primitive balance with different bounds on $K_2$; a repeating history must satisfy both. Since both bounds on $K_2$ are valid, any convex combination of them is valid too, but this note claims no combination beyond the two separate statements.

The two conditions measure different things. The accepted lines involve the mean radial speed $\langle|\dot r|\rangle$, which counts every in-and-out passage; Corollary E.3 involves only the extreme separations. A small-amplitude history whose mean radial speed is large enough, relative to $\langle1/r\rangle$, satisfies the first and can violate the second, as in the worked reading above. Conversely, Corollary E.3 says nothing about how fast the breathing is, and it forces no amplitude once the closest approach exceeds its cutoff: wide small-excursion histories beyond $4.04\times10^6$ at $w=1/10$ are left to the [companion note](saturday-binary-correlation-travel-2026-10-20-inverse-weight.md).

**The remaining obstruction on this route (derived for the bound; inferred for its reading).** As $\varepsilon_r\to1$ the turning bound $w^2\varepsilon_rL_d$ returns to the size bound $w^2L_d$. For large $r_{\max}/r_{\min}$ no other constant centre rescues this technique, which takes $|P_\parallel P_\perp|\le2w^2$ and the supremum of the turning weight $|r-r_*|/r$. With $a=r_{\min}$ and $b=r_{\max}$ that supremum is $\max\{|1-r_*/a|,|1-r_*/b|\}$, smallest at $r_*=2ab/(a+b)$, where it equals $(b-a)/(a+b)$; this tends to one as $b/a\to\infty$, while the bound on the constant-weight part scales like $r_*/r_{\min}$, up to a factor two. At finite ratios a different centre improves the turning factor modestly, which this note does not use. The accepted signed-breathing note's auxiliary frozen ellipse, an eccentric relative orbit with a common velocity at $45^\circ$ to its apsidal line, meets its scalar balance in this regime, and also at small eccentricity once its angular momentum is large enough. That auxiliary model is not a solution, and nothing here shows that such a history exists. On this route an exclusion of the eccentric regime needs actual information about how the common velocity and the relative orbit co-evolve over many orbits, not a sharper size estimate. A separate balance that bypasses the common-velocity correlation altogether is treated in the [companion note on the inverse-separation-weighted balance](saturday-binary-correlation-travel-2026-10-20-inverse-weight.md).

## Limits

Planar, opposite-polarity, unit-coupling, complete histories below wake speed with positive separation are assumed throughout, together with relative periodicity after an orientation-preserving rotation (or a doubled period). The proofs use the accepted pointwise bounds (I1)–(I7), the accepted Lemma 0, floor, primitive balance and Proposition U; any defect there propagates. Corollary E.3 needs $D>m$, which holds at the three tabulated speeds; monotonicity of $D-m$ in $w$ is not proved, so no continuous speed interval is claimed beyond the nesting of the classes. The bound on the turning part uses only the size $|P_\parallel P_\perp|\le2w^2$; its correlation with $(r-r_{\min})\dot\vartheta$ is not used. No history was integrated, no prescribed path was used, and no repeating solution is shown to exist. The constants are not claimed optimal. Mirror symmetry, constant common velocity, conserved J and observer-level physics are not assumed. Nothing here changes BP-001, production gates or canonical scores.

## Instrument

The tables come from [`correlation_travel_constants.py`](../evidence/saturday-binary-correlation-travel-2026-10-20/correlation_travel_constants.py), described in the [evidence README](../evidence/saturday-binary-correlation-travel-2026-10-20/README.md). It evaluates the closed forms of this note and of the companion note in exact rational arithmetic, with integer-square-root enclosures proved by squaring. Before any target it passes six known cases: two square-root enclosures, the exact zero-speed limits of the constants, four hand values at $w=1/10$, and accepted values of the curved-window, signed-breathing, low-J and correlation notes, including the accepted $D-m\ge0.16737$ and $c_-/b'\ge4043686$. That is the author's arithmetic verification, not independent evidence; the derivations are hand proofs.

## Falsifiers

- A history in $\mathcal C_w$ and an interval on which the identity of Lemma E.1 fails refutes it; the identity is kinematic once $H$ is the actual product.
- A relative-periodic history in $\mathcal C_w$ violating the inequality of Theorem E.2, or, at a speed bound with $D>m$, one with $Q_d>k_\varepsilon L_d$ or with $w^2\Delta r+wz_0r_{\max}<(D-m)\sqrt{c_-r_{\min}}$, refutes the corresponding statement.
- A valid solution violating one of (I1)–(I7) invalidates that input and withdraws the proof support of every statement that uses it; it refutes such a statement only if it also violates that statement's conclusion.
- An exact re-evaluation in which a tabulated decimal is not conservative withdraws that entry.

## Reading record (operational)

Read in full before the derivation, on 2026-10-20 between 20:50Z and 21:07Z by the clock: AGENTS.md, the generated startup router, the operator explanation standard, the academic style guide, the Saturday ownership handover of 2026-10-18, manuscript Sections 8 through 9.7, the periodicity queue entry, the ten accepted Saturday binary subjects named in the brief with their final reviews (the October 17 note at its accepted SHA-256 `80b307d9…2886`, rechecked live), and the canonical Master Equation passages on the per-hit row, the transmitter factor at emission, the all-root sum, the partner and self-hit split, the zero-delay exclusion and the self-hit interval-speed lemma. The derivation followed that reading. This record is development provenance and not part of the academic treatment.
