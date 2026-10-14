# The weighted geometry integral from the radial equation: a delayed virial identity, a floor on the separation, and an exclusion without the supremum of $r/J^2$ (2026-10-12)

## Result

**In words.** The [common-motion note](saturday-common-motion-period-comparison-2026-10-12.md) showed that a rigidly repeating opposite pair must cancel the gain $\Theta$ of its angular momentum by a nonnegative loss $M_+$ and a breathing integral $B_S$, and that this is impossible when two properties of the solution are small: the largest value $\Xi$ of $r/J^2$ and the variation of $r/J$ per radian. Neither was bounded by the equation. This note uses the radial equation of the pair, which the earlier notes had not used over a period, and removes the first of them. The largest value of $r/J^2$ is replaced by its *average over the turning angle*, and that average is controlled by an exact identity: it lies between $(\Theta-wc_+R_2)/c_+$ and $(\Theta+2wR_1+wc_+R_2)/c_-$ per period (item 2), which is near the circular value $\tfrac12$ per radian only when the speed bound is small, so that $c_\pm$ are near $2$, and the radial-travel terms $R_1$, $R_2$ are small against $\Theta$; the bounds themselves are the statement. What remains uncontrolled is that radial travel, together with the largest value $X$ of $r/J$, which enters with the coefficient $8w^3\kappa_S(w)\,c_2(w)/c_-(w)$ times the radial factor (of fourth order in the speed bound at fixed $X$, $\rho_r$ and $J_{\min}$, because $c_2=O(w)$), and the smallness of $J_{\min}$ as before.

1. **A radial period identity (derived, exact on solutions).** With $A_r=a_1\cos\beta_1+a_2\cos\beta_2>0$ the sum of the two row components along the axis,
   $$
   \oint\frac{r\,A_r}{J}\,dt=\Theta+\oint\frac{\dot r^2}{J}\,dt-\oint\frac{r\,\dot r\,\dot J}{J^2}\,dt
   $$
   (Theorem G.1). It is the period average of the derivative of $r\dot r/J$, a virial identity for the delayed law.
2. **The angle average of $r/J^2$ (derived).** Under the whole-past speed bound $w<\tfrac13$, with $R_1=\oint\lvert\dot r\rvert\,dt/J$ and $R_2=\oint\lvert\dot r\rvert\,dt/J^2$,
   $$
   \frac{\Theta-w\,c_+R_2}{c_+}\ \le\ \oint\frac r{J^2}\,d\vartheta\ \le\ \frac{\Theta+2w\,R_1+w\,c_+R_2}{c_-},\qquad c_+=\frac{2(1+w)^2}{1-w},\quad c_-=\frac{2(1-w)^2\sqrt{1-w^2}}{1+w}
   $$
   (Theorem G.2). Both constants tend to $2$ as $w\to0$.
3. **A floor on the separation (derived).** Every rigidly repeating solution in the speed class has $r\ge c_-/(4w^2)$ at all times, and $J\ge c_-/(2w)$ at its closest approach; also $\inf r/J^2\le1/c_-$ and $\Xi=\sup r/J^2\ge1/c_+$ (Proposition G.3). At $w=\tfrac1{10}$: $r\ge36.6$ and $J\ge7.32$ at closest approach.
4. **The loss alone cannot cancel the gain unless the radial travel is large (derived).** $M_+\le(4w^2\kappa_M/c_-)\,[\Theta+2wR_1+wc_+R_2]$. At $w=\tfrac1{10}$ the coefficient is at most $0.01845$: without radial travel the loss is under two percent of $\Theta$. With $L=(4w^2\kappa_M/c_-)\,[1+(2w+wc_+/J_{\min})\rho_r]$, the exact balance gives $-B_S\ge(1-\eta-L)\,\Theta$ (Corollary G.5). This makes the breathing integral negative only when the whole bracket is positive, $\eta+L<1$; small or zero radial travel alone gives no sign, and the breathing integral carries nearly all of the gain only when $\eta$ is small as well as $L$.
5. **Exclusion without $\Xi$ (derived).** With $\rho_r=R_{\rm var}/(J_{\min}\Theta)$ the radial travel per radian in units of $J_{\min}$ and $X=\sup r/J$, no rigidly repeating solution in the speed class with $J\ge J_{\min}>0$ satisfies
   $$
   4w^2\Bigl\{\Bigl[\kappa_M+\kappa_S\Bigl(c_1+2w\,c_2\,X+\frac{c_3}{J_{\min}}\Bigr)\Bigr]\frac{1+(2w+w\,c_+/J_{\min})\,\rho_r}{c_-}+\kappa_S\,\rho_r\Bigr\}<1-\eta
   $$
   (Corollary G.6). The class is empty when $\eta\ge1$. In the subclass of constant separation this is unconditional over a stated range: at $w=\tfrac1{10}$ there is no rigidly repeating solution with constant separation $r\le10^6$ (Corollary G.7; hand arithmetic, to be audited).
6. **What is not obtained.** No bound on the radial travel $\rho_r$ from the equation, and none on $X$ or on $J_{\min}$. The breathing integral is still bounded by its absolute value; its sign structure is not used. General non-mirror periodicity stays open.

**Claim grade.** Items 1 to 5 are hand derivations of one session. The [Codex review](saturday-solution-weighted-geometry-comparison-codex-review-2026-10-12.md) reconstructs Theorems G.1, G.2 and G.4, Proposition G.3 and Corollaries G.5 to G.7 separately, checks every displayed decimal and the constant-separation comparison with its own exact-fraction reference, and requested the four corrections GVR1 to GVR4 incorporated here. No instrument was written in this stage and nothing was run by this author; the decimals at $w=\tfrac1{10}$ are hand evaluations rounded in the safe direction, and their audit is the review's. Nothing is measured on solutions.

Everything is for the unchanged Master Equation, planar motion, opposite unit polarities, unit reduced coupling, $c_f=1$, twice continuously differentiable complete histories, positive separation, rigid repetition after a fixed rotation and translation, $J>0$, and both speeds at most a fixed $w<\tfrac13$ over the whole past, so that each member receives exactly one partner row of positive strength and none from its own path. No low-$J$ or sign-changing regime is treated.

## 1. Setting, sources and reading

This is item 3 of the [evolved-history and geometry round](../../../../op/agent-chats/2026-10-12-saturday-evolved-history-and-geometry/chat.md), released at 21:45:55Z.

**Reading, with times from the clock (2026-10-12) and its order.** Before any derivation: the release in full (21:46Z); the common-motion note in full from the file, and the manuscript's Section 9 in full with the last part of Section 8 (21:47Z). After that reading, and before the readings listed next, the unweighted form of the identity of Theorem G.1 was worked out in thought; its form with the weight $1/J$ followed between 21:49Z and 21:51Z, and the constant-separation corollary after 21:52Z. So the derivation did not wait for the whole reading that the release asked for. Nothing was written before 21:52Z; the note was written between 21:52Z and 21:57Z, and nothing was run. Before writing: the common-motion review in full with its final disposition (21:49Z); the lead paragraphs of the binary priorities and the whole periodicity queue entry, neither truncated (21:51Z); the final dispositions of the straight-term, breathing and curved-window reviews (21:52Z). Read *in part* at 21:49Z to 21:51Z, as search results cut at 700 characters a line: of the non-mirror note, the statement of Proposition D and the line after its proof that gives $\ddot r$, Lemma 3, and the bounds (B2), (B4), (B5); of the breathing note, Proposition B.3 with its proof and constants in full. *Not reread in this stage:* the rest of the non-mirror note and its review, the curved-window note and the earlier sections of its review, the straight-term note and the earlier sections of its review, the rest of the breathing note and the earlier sections of its review. For these, earlier full readings in this session are relied on: the session record shows the non-mirror and curved-window notes read in full from the file at 18:47Z, and the accepted common-motion note records full readings of the others between 18:41Z and 19:28Z. Their current SHA-256 values (`874fb446…`, `c885bfdf…`, `5f7ca156…`, `fc36c4c2…`, `e46ced83…`, `b1b22ed7…`, `d43d49a9…`, `6d3b9082…`) equal values recorded in this session at or after those readings; that is a byte check against an earlier reading, not a second reading. Of the Master Equation source, the transmitter-side factor, weight, per-hit acceleration, total equation and Heaviside convention were read at 21:36Z for the previous item; the file was not reread for this one, and the row is used only through the accepted Proposition D and bounds (B2) and (B5).

**Additional reading after the review (2026-10-12, 22:02Z to 22:04Z; finding GVR1).** The paragraph above records the coverage at the first return, including the fact that the derivation came before part of the reading, and is left as it was. After the review, and so after the derivation and the first return, the following were read from the files without truncation. Of the non-mirror note (`874fb446…`, unchanged): its setting and hypotheses, with the root-existence discussion and the three kinds of repetition; Proposition D with its whole proof, the check that gives $\ddot r$ and $\dot J$, and the reading paragraph; Lemma 3 with its proof; Theorem E with its proof and kinematic core; and the derivations (B1) to (B5). Of its review (`c885bfdf…`, unchanged): the independent reconstruction of the four component equations, of $\dot J$ and $\ddot r$, of Lemma 3 and of Theorem E, and finding N1 on root existence. Of the breathing review: the reconstruction of Proposition B.3 with its constants. The Codex review of the present note in full. Of the Master Equation source (`a3fa7047…`, unchanged since the readings of the same day): the authority statement, the per-hit acceleration with its separation, direction, polarity sign, transmitter-side factor and weight, the note on interaction structure, the total-acceleration section with the boxed equation and the partner and self-hit split, and the Heaviside convention with the exclusion of zero delay. *Still not reread in this stage*, and relied on through the byte-checked earlier full readings named above: the remainder of the non-mirror note and of its review, the curved-window note and review apart from the final disposition, the straight-term note and review apart from the final disposition, the remainder of the breathing note and review. The second reading that (B5) cites and the earlier accepted note that supplies the positive cosine were not reopened; both facts follow from relations displayed in the passages read, $\tau_1\sin\beta_1=-\hat{\boldsymbol\theta}\cdot\boldsymbol\Delta_2$ with $\lvert\boldsymbol\Delta_2\rvert\le w\tau_1$, and $\tau_1\cos\beta_1=r+\hat{\mathbf r}\cdot\boldsymbol\Delta_2\ge r-w\tau_1>0$ by (B1), likewise for the other member. *Consequence:* none found for the mathematics. The row is the canonical one with $\sigma=-1$, unit coupling and $c_f=1$: strength $1/(\tau_i^2D_i)$ along the line from the emission point to the receiver, with $D_i$ taken at the emission time, which is why the bound on $a_i$ needs the speed bound over the whole past and not only at present. Identifying $\hat{\mathbf r}\cdot(\ddot{\mathbf x}_2-\ddot{\mathbf x}_1)$ with $A_r$ uses the equation and holds only on solutions, in the one-partner, no-own-row setting that the uniform speed margin of rigid repetition supplies; Theorem G.1(a) does not use it.

**Notation** is that of the accepted notes. $\mathbf r=\mathbf x_1-\mathbf x_2$, $r=\lvert\mathbf r\rvert$, $\hat{\mathbf r}=(\cos\vartheta,\sin\vartheta)$; $u_i$, $b_i$ the velocity components along and across the axis; $\dot r=u_1-u_2$; $J=r\,(b_1-b_2)=r^2\dot\vartheta>0$; $P_\perp=b_1+b_2$; $x=r/J$; $\Theta=\oint\dot\vartheta\,dt$; $\oint f\,d\vartheta=\oint f\,\dot\vartheta\,dt$. $a_i>0$ are the row strengths and $\beta_i$ the aberration angles. From the [non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md): Proposition D gives, on solutions,

$$
\ddot r=\frac{J^2}{r^3}-A_r,\qquad A_r=a_1\cos\beta_1+a_2\cos\beta_2,\qquad\dot J=r\,(a_1\sin\beta_1+a_2\sin\beta_2),
$$

and under the whole-past speed bound, (B2) $a_-\le a_i\le a_+$ with $r^2a_-=\alpha(w)=(1-w)^2/(1+w)$ and $r^2a_+=c_1(w)=(1+w)^2/(1-w)$, and (B5) $\lvert\sin\beta_i\rvert\le w$, $\cos\beta_i\ge\sqrt{1-w^2}$. Hence

$$
\frac{c_-}{r^2}\le A_r\le\frac{c_+}{r^2},\qquad\lvert\dot J\rvert\le\frac{w\,c_+}{r},\qquad c_-=2\alpha\sqrt{1-w^2},\quad c_+=2c_1 .
$$

From the [breathing note](saturday-combined-breathing-period-average-2026-10-12.md): $c_2=(3w+w^3)/(1-w^2)$, $c_3=(1+w)^3/(1-3w)^2$, $R_{\rm var}=\oint\lvert\dot r\rvert\,dt$, $X=\sup r/J$. From the common-motion note: $M_+$, $M_{\rm rel}$, $B_S$, $R$, $\eta$, $\kappa_M$, $\kappa_S$, $\mathcal V=\oint\lvert dx\rvert$. New here: $\mathcal N=\oint(r/J^2)\,d\vartheta=\oint dt/(rJ)$, $R_1=\oint\lvert\dot r\rvert\,dt/J$, $R_2=\oint\lvert\dot r\rvert\,dt/J^2$, $\rho_r=R_{\rm var}/(J_{\min}\Theta)$. All integrals are over one period. Rigid repetition makes $r$, $\dot r$, $J$, $b_i$, $u_i$ periodic.

## 2. The radial period identity

**Theorem G.1 (derived).** (a) *Kinematic.* For any rigidly repeating twice continuously differentiable planar pair with $r>0$ and $J>0$, with $\mathcal A=\hat{\mathbf r}\cdot(\ddot{\mathbf x}_2-\ddot{\mathbf x}_1)$,

$$
\oint\frac{r\,\mathcal A}{J}\,dt=\Theta+\oint\frac{\dot r^2}{J}\,dt-\oint\frac{r\,\dot r\,\dot J}{J^2}\,dt .
$$

(b) *On solutions* in the setting above, $\mathcal A=A_r$, which is the identity of the Result.

*Proof.* $\ddot r=r\dot\vartheta^2+\hat{\mathbf r}\cdot(\ddot{\mathbf x}_1-\ddot{\mathbf x}_2)=J^2/r^3-\mathcal A$. The function $Y=r\dot r/J$ is continuously differentiable and periodic, and

$$
\dot Y=\frac{\dot r^2+r\,\ddot r}{J}-\frac{r\,\dot r\,\dot J}{J^2}=\frac{\dot r^2}{J}+\frac{J}{r^2}-\frac{r\,\mathcal A}{J}-\frac{r\,\dot r\,\dot J}{J^2}.
$$

Integrate over a period; $\oint J/r^2\,dt=\Theta$. On a solution $\hat{\mathbf r}\cdot\ddot{\mathbf x}_1=-a_1\cos\beta_1$ and $\hat{\mathbf r}\cdot\ddot{\mathbf x}_2=a_2\cos\beta_2$ (Proposition D). $\qquad\blacksquare$

*Check against a known case.* With $J$ constant and $A_r=2/r^2$ the identity reads $2\oint dt/r=\oint(\dot r^2+J^2/r^2)\,dt$, the virial theorem for an inverse-square attraction of strength $2$. That case is a comparison and is not a solution of the delayed law.

**Theorem G.2 (the angle average of $r/J^2$; derived).** For a rigidly repeating solution in the speed class,

$$
\frac{\Theta-w\,c_+R_2}{c_+}\ \le\ \mathcal N\ \le\ \frac{\Theta+2w\,R_1+w\,c_+R_2}{c_-},
$$

and in particular $\mathcal N\le\bigl[1+(2w+w\,c_+/J_{\min})\,\rho_r\bigr]\Theta/c_-$ when $J\ge J_{\min}$.

*Proof.* $c_-/r\le rA_r\le c_+/r$, so $c_-\mathcal N\le\oint rA_r\,dt/J\le c_+\mathcal N$. On the right side of Theorem G.1: $0\le\oint\dot r^2dt/J\le\sup\lvert\dot r\rvert\,R_1\le2wR_1$, because $\lvert\dot r\rvert=\lvert u_1-u_2\rvert\le2w$; and $\lvert r\dot r\dot J/J^2\rvert\le wc_+\lvert\dot r\rvert/J^2$. Finally $R_1\le R_{\rm var}/J_{\min}$ and $R_2\le R_{\rm var}/J_{\min}^2$. $\qquad\blacksquare$

So the average of $r/J^2$ over the turning angle lies between about $1/c_+$ and $1/c_-$, the circular value $\tfrac12$ widened by the speed, apart from terms in the radial travel. The supremum $\Xi$ is not bounded by this; it is no longer needed in what follows.

## 3. A floor on the separation

**Proposition G.3 (derived).** For a rigidly repeating solution in the speed class: (i) at an instant $t_m$ where $r$ is smallest, $r/J^2\le1/c_-$; (ii) $r(t)\ge c_-/(4w^2)$ for all $t$, and $J(t_m)\ge c_-/(2w)$; (iii) at an instant where $r$ is largest, $r/J^2\ge1/c_+$, so $\Xi\ge1/c_+$.

*Proof.* $r$ is periodic and twice continuously differentiable, so it attains a smallest value at some $t_m$ with $\ddot r(t_m)\ge0$, that is $J^2/r^3\ge A_r\ge c_-/r^2$, which is (i). Since $J=r\,(b_1-b_2)\le2w\,r$, (i) gives $r_{\min}\le J(t_m)^2/c_-\le4w^2r_{\min}^2/c_-$, hence $r_{\min}\ge c_-/(4w^2)$, and then $J(t_m)^2\ge c_-r_{\min}\ge c_-^2/(4w^2)$. At a largest value $\ddot r\le0$ gives $J^2/r^3\le A_r\le c_+/r^2$. $\qquad\blacksquare$

*Values at $w=\tfrac1{10}$ (hand evaluation).* $\sqrt{0.99}\in(0.994987,0.994988)$, so $c_-=1.62\sqrt{0.99}/1.1\ge1.4653$ and $1/c_-\le0.6825$; $c_+=2.42/0.9\le2.6889$. Then $r\ge36.63$ and $J(t_m)\ge7.326$.

The floor says that a repeating pair in the speed class is wide: the equation ties the closest approach to the speed bound. It does not bound $J$ from below at other instants, so it does not by itself make $\eta$ small; $J_{\min}$ stays a property of the solution.

## 4. The two weighted integrals and the exclusion

**Theorem G.4 (derived).** For a rigidly repeating solution in the speed class with $J\ge J_{\min}>0$ and $P_{\perp\max}=\sup\lvert P_\perp\rvert\le2w$,

$$
(1-\eta)\,\Theta\ \le\ \kappa_M\oint P_\perp^2\frac r{J^2}\,d\vartheta+\kappa_S\oint P_\perp^2\lvert dx\rvert\ \le\ P_{\perp\max}^2\Bigl\{\Bigl[\kappa_M+\kappa_S\Bigl(c_1+c_2\,P_{\perp\max}X+\frac{c_3}{J_{\min}}\Bigr)\Bigr]\mathcal N+\kappa_S\,R_1\Bigr\},
$$

with $\mathcal N$ bounded by Theorem G.2.

*Proof.* The left inequality is the accepted Theorem C.3. For the right: $\oint P_\perp^2(r/J^2)\,d\vartheta\le P_{\perp\max}^2\,\mathcal N$. For the variation, the proof of the accepted Proposition B.3 gives $\lvert\dot x\rvert\le\lvert\dot r\rvert/J+c_1/(rJ)+c_2\lvert P_\perp\rvert/J^2+c_3/(rJ^2)$; integrate, keeping $\oint dt/(rJ)=\mathcal N$ instead of replacing it by $\Xi\Theta$: $\oint dt/J^2=\oint(r/J)\,dt/(rJ)\le X\mathcal N$ and $\oint dt/(rJ^2)\le\mathcal N/J_{\min}$. So $\mathcal V\le R_1+[c_1+c_2P_{\perp\max}X+c_3/J_{\min}]\,\mathcal N$. $\qquad\blacksquare$

This is the accepted necessary condition with $\Xi\Theta$ replaced by $\mathcal N$ in both integrals, and $\mathcal N$ is then bounded through the radial identity. The weight $P_\perp^2$ is taken out at its supremum in both; its correlation with $r/J^2$ and with $dx$ is not used.

**Corollary G.5 (the loss alone; derived).** $M_+\le\kappa_MP_{\perp\max}^2\,\mathcal N\le(4w^2\kappa_M/c_-)\,[\Theta+2wR_1+wc_+R_2]$. Consequently, by the exact balance $M_+-B_S=\Theta+M_{\rm rel}+R$ with $M_{\rm rel}\ge0$ and $\lvert R\rvert\le\eta\Theta$,

$$
-B_S\ \ge\ \Bigl[1-\eta-\frac{4w^2\kappa_M}{c_-}\bigl(1+(2w+w\,c_+/J_{\min})\,\rho_r\bigr)\Bigr]\Theta .
$$

Write $L$ for the last term in the bracket, so the bracket is $1-\eta-L$. When $1-\eta-L>0$ the breathing integral is negative and at least that large in size. When $1-\eta-L\le0$ the inequality gives no sign for $B_S$; in particular small or zero radial travel does not by itself make $B_S$ negative, because $\eta$ may be near or above one. At $w=\tfrac1{10}$, $4w^2\kappa_M/c_-\le0.02703\times0.6825\le0.01845$.

**Corollary G.6 (exclusion; derived).** No rigidly repeating solution in the speed class with $J\ge J_{\min}>0$ satisfies the inequality of Result item 5. It can hold only when $\eta<1$.

*Proof.* Theorem G.4 with $P_{\perp\max}\le2w$, Theorem G.2 and $R_1\le\rho_r\Theta$, divided by $\Theta>0$. $\qquad\blacksquare$

*A sufficient test at $w=\tfrac1{10}$ (hand evaluation with upward-rounded coefficients; it implies the exact inequality and is not equivalent to it).* With the accepted $4w^2\kappa_M\le0.02703$, $4w^2\kappa_S\le0.01016$, $e_1\le3.989$, $e_2\le0.2731$, and $c_1\le1.3445$, $2wc_2\le0.06081$, $c_3\le2.7164$, $wc_+\le0.2689$:

$$
0.6825\,\Bigl(0.04070+0.000618\,X+\frac{0.0276}{J_{\min}}\Bigr)\Bigl(1+\Bigl(0.2+\frac{0.2689}{J_{\min}}\Bigr)\rho_r\Bigr)+0.01016\,\rho_r<1-\frac{3.989}{J_{\min}}-\frac{0.2731}{J_{\min}^2}.
$$

With no radial travel and large $J_{\min}$ the left side is $0.0278+0.00043\,X$.

**Corollary G.7 (constant separation; derived, numbers by hand).** At $w=\tfrac1{10}$ there is no rigidly repeating solution in the speed class whose separation is constant with $r\le10^6$.

*Proof.* If $\dot r\equiv0$ then $\rho_r=0$ and $\ddot r\equiv0$, so $J^2=r^3A_r\ge c_-r$ at every instant: $J_{\min}\ge\sqrt{c_-r}$ and $X\le\sqrt{r/c_-}$. By Proposition G.3, $r\ge c_-/(4w^2)$, so $J_{\min}\ge c_-/(2w)\ge7.32$. For $r\le10^6$, $X\le\sqrt{10^6/1.4653}\le826.2$. The left side of the test is at most $0.6825\,(0.04070+0.000618\times826.2+0.0276/7.32)\le0.6825\times0.5551\le0.379$, and the right side is at least $1-3.989/7.32-0.2731/7.32^2\ge0.449$. $\qquad\blacksquare$

This subclass is a restriction added here, not a consequence of the law. It contains pairs whose axis turns at a varying rate and whose centre moves, and it is not limited to mirror pairs or to circles about a fixed centre.

## 5. Where this stops

- *The radial travel.* $\rho_r$ enters twice: through the breathing integral, with coefficient $4w^2\kappa_S$, and through the corrections to $\mathcal N$. I derived no bound on it from the equation. The radial identity turns radial motion into a correction of the angle average, but it does not limit how much radial motion there is. At $w=\tfrac1{10}$, dropping the nonnegative terms in $X$ and in $1/J_{\min}$ from the left side of the displayed sufficient test leaves exactly $0.02777775+0.01571555\,\rho_r$, which is $0.97071075$ at $\rho_r=60$ and $1.00214185$ at $\rho_r=62$. So for $\rho_r\ge62$ that displayed conservative test cannot hold, since its right side is at most one. This is a statement about the test as written, with its upward-rounded coefficients. It is not a boundary for repeating solutions and not a bound on the radial travel of solutions. For orientation only: on a no-delay comparison ellipse of eccentricity $e$, which is not a solution, $\rho_r$ is about $Je/(\pi(1-e^2))$. That comparison shows no obstruction, from the delayed law, to an estimate that keeps the correlations; it is not used for any claim.
- *The breathing integral by absolute value.* By Corollary G.5, in the class where $1-\eta-L>0$ the breathing integral is negative and at least $(1-\eta-L)\,\Theta$ in size; outside that class nothing is said about its sign. In that class the open question is its *signed* size, and Theorem G.4 uses only $\lvert B_S\rvert\le\kappa_S\oint P_\perp^2\lvert dx\rvert$. An estimate that keeps the correlation between $P_\perp^2$ and $dx$ needs the evolution of $P_\perp$ along the solution, which is the accepted common-motion equation; I did not carry that out.
- *The term in $X$.* $\oint dt/J^2$, the duration weighted by $1/J^2$, is bounded by $X\mathcal N$. After $P_{\perp\max}\le2w$ its coefficient in the exclusion is exactly $8w^3\kappa_S(w)\,c_2(w)/c_-(w)$, multiplied by the radial factor $1+(2w+wc_+/J_{\min})\rho_r$. Since $c_2(w)=(3w+w^3)/(1-w^2)=O(w)$, this is of fourth order in $w$ as $w\to0$ with $X$, $\rho_r$ and $J_{\min}$ held fixed; those are properties of the solution and need not stay fixed as $w$ varies. $X$ is not bounded by the equation. Proposition G.3 gives only $X\ge1/(2w)$.
- *Small $J_{\min}$.* Unchanged: when $\eta\ge1$ nothing is excluded, and the error allowance is not dropped anywhere here.

**A reduced missing statement.** For rigidly repeating solutions in the speed class *with $1-\eta-L>0$*, where $L=(4w^2\kappa_M/c_-)(1+(2w+wc_+/J_{\min})\rho_r)$: a bound, from the delayed law, on $\kappa_S\oint P_\perp^2\lvert dx\rvert$, or on the signed $-B_S$, strictly below $(1-\eta-L)\,\Theta$. Such a bound would exclude that class. Where $1-\eta-L\le0$ the target is empty and nothing is reduced. In the class with a positive bracket the loss term $M_+$ is no longer part of what is missing, except through $\rho_r$ inside $L$. This is a reduction of the accepted remaining obligation, not its completion, and it is not shown that the reduced statement is true.

## 6. Evidence and the reference boundary

No instrument was written and nothing was run; the evidence folder assigned to this stage was not created. The identity of Theorem G.1 is three lines of calculus and was checked by hand against the virial theorem for the inverse-square comparison. The decimals at $w=\tfrac1{10}$ are hand evaluations, each rounded in the direction that weakens the claim; they use the accepted table of the common-motion note for $4w^2\kappa_M$, $4w^2\kappa_S$, $e_1$, $e_2$. This author made no exact-arithmetic audit, and a same-author check would not be independent evidence. The separate audit is the Codex review's exact-fraction reference, which imports nothing from this note; by its record it confirms each rounding direction and gives $0.3788298776\ldots<0.4499578219\ldots$ for the comparison of Corollary G.7. It evaluates no history.

## 7. Limits

Planar motion, opposite unit polarities, unit reduced coupling, $c_f=1$, twice continuously differentiable complete histories, positive separation, rigid repetition, $J>0$ throughout. Theorem G.1(a) is kinematic. Everything else needs a solution in the ordinary setting below wake speed with the whole-past bound $w<\tfrac13$, through the accepted Proposition D, bounds (B2) and (B5), Proposition B.3 and Theorem C.3. Theorem G.2, Proposition G.3, Theorem G.4 and Corollary G.5 hold for every $\eta$; the exclusion class of Corollary G.6 is empty when $\eta\ge1$. Corollary G.7 is for constant separation and $w=\tfrac1{10}$ only. Nothing is claimed for histories repeating only up to a rotation about a drifting centre, for $J$ with zeros or changes of sign, or for speeds of $\tfrac13$ or more. No repeating history was constructed or searched for, no solution was integrated, and no accepted file was changed.

## 8. Falsifiers

- A rigidly repeating twice differentiable pair, prescribed or not, with $r>0$, $J>0$, on which the two sides of Theorem G.1(a) differ refutes it.
- A rigidly repeating solution in the speed class with $\mathcal N$ outside the interval of Theorem G.2 refutes it, or the accepted bounds (B2), (B5) it uses.
- A rigidly repeating solution in the speed class with $r<c_-/(4w^2)$ at some instant, or with $r/J^2>1/c_-$ at its closest approach, refutes Proposition G.3.
- A rigidly repeating solution in the speed class satisfying the inequality of Corollary G.6, or one with constant separation $r\le10^6$ at $w=\tfrac1{10}$, refutes that corollary. A prescribed path with these properties refutes nothing.
- An exact evaluation showing a displayed decimal rounded in the wrong direction withdraws that decimal.

## 9. Proposed propagation (not applied)

No shared tracker, manuscript or queue was edited. Suggested text for the coordinator, for the periodicity queue entry: "Radial period identity (Saturday round, 2026-10-12, derived, unreviewed until its review): on rigidly repeating solutions $\oint rA_r\,dt/J=\Theta+\oint\dot r^2dt/J-\oint r\dot r\dot J\,dt/J^2$ with $A_r=a_1\cos\beta_1+a_2\cos\beta_2$. Under the whole-past bound $w<1/3$ the angle average of $r/J^2$ is at most $[1+(2w+wc_+/J_{\min})\rho_r]/c_-$, with $\rho_r$ the radial travel per radian over $J_{\min}$; the separation is at least $c_-/(4w^2)$; the loss satisfies $M_+\le L\,\Theta$ with $L=(4w^2\kappa_M/c_-)[1+(2w+wc_+/J_{\min})\rho_r]$, under two percent of $\Theta$ at $w=0.1$ without radial travel, and $-B_S\ge(1-\eta-L)\Theta$, which signs the breathing integral only when $\eta+L<1$. The sufficient exclusion no longer needs $\sup r/J^2$; it needs radial travel per radian, $\sup r/J$ with coefficient $8w^3\kappa_Sc_2/c_-$ times the radial factor (fourth order in $w$ at fixed geometric inputs), and $\eta<1$. Constant-separation solutions with $r\le10^6$ are excluded at $w=0.1$. Open: a bound from the law on the signed breathing integral or on the radial travel; small $J_{\min}$; general non-mirror periodicity."
