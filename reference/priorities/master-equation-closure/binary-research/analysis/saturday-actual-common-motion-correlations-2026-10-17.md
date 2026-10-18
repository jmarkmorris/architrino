# The sign-free common-motion correlation reduced to radial travel (2026-10-17)

## Result

**The actual common-velocity evolution converts the sign-free correlation $K_2$ into a nonnegative common-motion loss plus one radial-travel term. Repeating histories must therefore have a positive mean radial speed out to much larger separations than before, but nothing here proves they move mostly radially or rules out a near-circular history, and general periodicity remains undecided.** The setting is the periodicity question of the [binary manuscript, Section 9](../manuscript.md#9-curved-delay-windows-and-the-unresolved-period-average) and the class of the accepted [low-angular-momentum theorem](saturday-low-angular-momentum-2026-10-14.md):

- complete planar opposite-unit pairs under the unchanged [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), with unit reduced coupling and $c_f=1$;
- twice continuously differentiable paths, positive separation and whole-history speeds at most $w<1/3$;
- one ordinary partner root per member and no positive-delay self root.

That theorem's sign-free balance is $D\oint d^2dt\le K_2+wz_0\oint|d|\,dt$, where $d=J/r$ and $K_2=-\frac12\oint d\,P_\parallel P_\perp\,dt$. Its proofs bounded $K_2$ by size alone, $|K_2|\le w^2\oint|d|\,dt$. This note is task 1 of the [round of 2026-10-17](../../../../op/agent-chats/2026-10-17-saturday-correlations-six-hour/chat.md).

1. **An exact identity for $K_2$, regular at zeros of J (derived).** The rotating-frame equations of the velocity sum $\mathbf P=\mathbf v_1+\mathbf v_2$ give $d\,P_\parallel P_\perp=\tfrac14 r\dot Q-\tfrac12r(A_\parallel P_\parallel-A_\perp P_\perp)$, where $Q=P_\parallel^2-P_\perp^2$. Hence

   $$K_2=-\tfrac18\bigl[rQ\bigr]_0^T+\tfrac18\oint\dot rQ\,dt+\tfrac14\oint r(A_\parallel P_\parallel-A_\perp P_\perp)\,dt.$$

   The boundary term vanishes under rigid recurrence. Under relative recurrence alone it is at most $w^2r(0)$ and disappears from every per-period inequality on averaging over many periods (Lemma C.1).
2. **$K_2$ is a nonnegative loss plus radial travel (derived).** The actual-row bound of the accepted signed-breathing note makes the last integrand $(P_\parallel^2+r^2\mu P_\perp^2)/r\ge0$ up to an error of third order. Therefore

   $$K_2\le\tfrac{w^2}2\oint|\dot r|\,dt+\mathcal M(w)\oint\frac{dt}r,$$

   up to the boundary allowance, with $\mathcal M=w^2c_1+k_1+w^2k_A'/c_-=w^2+O(w^3)$. The first-order-in-$d$ factor of the old bound is replaced by the radial speed $|\dot r|$ (Theorem C.2).
3. **The transverse kinetic budget is bounded by radial travel (derived).** Together with the radial virial identity $\oint(\dot r^2+d^2)dt=\oint rA_r\,dt$, every J-periodic history of any sign pattern with $D>m=\mathcal M/c_-$ satisfies $(D-m)\oint d^2\le\frac{w^2}2\oint|\dot r|+m\oint\dot r^2+wz_0\oint|d|$ (Corollary C.3).
4. **A positive lower bound on mean radial speed (derived; constants evaluated exactly).** Write $\rho_1=\langle|\dot r|\rangle$ for the mean radial speed and $u=\langle1/r\rangle$, with time means over a period. Every J-periodic history satisfies $c_-u\le a_f\rho_1+b_f$ for each of three explicit pairs $(a_f,b_f)$ (Corollary C.4). Each slope is $2w(1+O(w))$. Their intercepts are of orders $w^4$ (from the accepted theorem alone), $w^6$ and $w^8$. At $w=1/10$ the three forms give a positive lower bound on mean radial speed for every history whose separation stays below 529, 46,257 and 4,043,686 respectively. These are cutoffs for that positive bound, not new necessary maximum separations. The bound shrinks to zero as the maximum separation approaches each cutoff. An order-$\langle1/r\rangle/w$ statement needs a margin: when $c_-u\ge2b_f$, for example whenever $r_{\max}\le c_-/(2b_f)$, the mean radial speed is at least $c_-u/(2a_f)$. Positive mean radial speed is not a proof that the motion is mostly radial or far from circular.
5. **The precise obstruction.** The radial equation alone allows mean radial speed up to $\sqrt{c_+\langle1/r\rangle}$. Throughout the class this exceeds the required speed, so no exclusion follows without further input (Proposition C.5). The remaining unknown on this route is the radial–anisotropy correlation $\tfrac18\oint\dot rQ\,dt$. A solution-derived upper bound $\rho_1\le U$ would exclude whenever $a_fU+b_f<c_-u$; such travel control is a sufficient alternative, not information equivalent to the signed correlation, which might be controlled even when radial travel is large. Integrating that term by parts returns $K_2$ minus the loss term, so the next lemma must use a different structure (Section 5).

> Claim grade: derived for Lemma C.1, Theorem C.2, Corollaries C.3–C.4 and Proposition C.5, by the hand proofs below from accepted pointwise row bounds on the stated class; the decimals are exact-rational evaluations by a same-author instrument that passed five known cases first, which is arithmetic verification, not independent evidence. Nothing is measured on a history. Falsifier: a complete J-periodic history in the class, at a speed bound with $D>m$, that violates the inequality of Corollary C.3, or whose mean radial speed lies below one of the lines of Corollary C.4, refutes the corresponding statement; so does a valid solution violating one of the accepted pointwise bounds used.

## Setting and accepted inputs

**Class and recurrence.** The class $\mathcal C_w$ and the three recurrence meanings are those of the [low-angular-momentum theorem](saturday-low-angular-momentum-2026-10-14.md#setting-and-accepted-inputs). A history is *J-periodic* when $\mathbf r(t+T)=R\,\mathbf r(t)$ for an orientation-preserving rotation $R$ of the motion plane. An orientation-reversing rotation is handled by doubling the period. J-periodicity makes $r$, $\dot r$, $J$ and $d=J/r$ periodic. It does **not** make the components $P_\parallel$, $P_\perp$ of the velocity sum periodic: the common velocity may drift or rotate independently. *Rigid recurrence*, $\mathbf x_i(t+T)=R\mathbf x_i(t)+\mathbf d$ for both members, does make them periodic, because the two velocities rotate together with the axis.

**Notation.** The following are defined:

- $\hat{\mathbf r}$ and $\hat{\boldsymbol\theta}$ are the axis and transverse unit vectors, and $\vartheta$ is the continuous polar angle of $\mathbf r$, so $\dot\vartheta=J/r^2=d/r$.
- These quantities are regular wherever $r>0$, including where J vanishes; nothing below divides by J.
- $\mathbf A=\ddot{\mathbf x}_1+\ddot{\mathbf x}_2$ has components $A_\parallel$ and $A_\perp$ along $\hat{\mathbf r}$ and $\hat{\boldsymbol\theta}$.
- Over one period: $R_1=\oint|\dot r|\,dt$ (radial travel), $R_2=\oint\dot r^2dt$, $Q_d=\oint d^2dt$, $L_d=\oint|d|\,dt$, $I_1=\oint r^{-1}dt$ and $I_2=\oint r^{-2}dt$.
- Time means are $\rho_1=R_1/T$, $\rho_2=R_2/T$, $q=Q_d/T$ and $u=I_1/T$.

**Accepted pointwise inputs on $\mathcal C_w$.** Each holds at every instant, for any sign of J:

- (I1)–(I5) of the low-J theorem:
  - row strengths $\alpha/r^2\le a_i\le c_1/r^2$;
  - $c_-/r^2\le A_r\le c_+/r^2$;
  - $\dot J=\mu J+r\delta P_\perp+re_J$ with $|re_J|\le c_3/r^2$;
  - $2r^2\delta=P_\parallel+\zeta$ with $|\zeta|\le z_0+c/r$;
  - $\ddot r=d^2/r-A_r$.
- (I6) From the [signed-breathing note](saturday-signed-breathing-radial-travel-2026-10-14.md), Lemma W.2 and Theorem W.3, built on non-mirror Proposition H:

  $$A_\parallel P_\parallel-A_\perp P_\perp=\frac{P_\parallel^2+r^2\mu P_\perp^2}{r^2}+\mathcal R,\qquad|\mathcal R|\le\frac{4k_1}{r^2}+\frac{k_A'}{r^3},$$

  with $k_1=\tfrac14(2wz_0+2w^3c_1+w^2c_2)$, $k_A'=2w(c+c_3)$ and $c_2=(3w+w^3)/(1-w^2)$. Its four remainder bounds use $|\zeta P_\parallel|$, $|\chi P_\parallel|$, $|\delta dP_\perp|\le c_2|b_1^2-b_2^2|/r^2\le c_2w^2/r^2$ and $|e_PP_\perp|$. All are pointwise and sign-free. The principal numerator satisfies $0\le P_\parallel^2+r^2\mu P_\perp^2\le c_1|\mathbf P|^2\le4w^2c_1$.
- (I7) The rotating-frame equations $\dot P_\parallel=A_\parallel+\dot\vartheta P_\perp$ and $\dot P_\perp=A_\perp-\dot\vartheta P_\parallel$ (non-mirror Proposition H). These are kinematic: they follow from $\dot{\hat{\mathbf r}}=\dot\vartheta\hat{\boldsymbol\theta}$ and $\dot{\hat{\boldsymbol\theta}}=-\dot\vartheta\hat{\mathbf r}$.

The constants $\alpha,c_1,c_\pm,c_3,c,z_0,e,D,k$ are those of the low-J theorem. Inputs (I1)–(I6) come from the received rows. They are derived from the whole-history speed bound and are accepted in the cited reviews. No conserved energy, force, mass or angular momentum enters.

## 1. An exact identity for the correlation

**Lemma C.1 (derived).** On every history in $\mathcal C_w$, at every instant,

$$
\frac{d}{dt}Q=2(A_\parallel P_\parallel-A_\perp P_\perp)+4\dot\vartheta P_\parallel P_\perp,
\qquad
d\,P_\parallel P_\perp=\frac r4\dot Q-\frac r2(A_\parallel P_\parallel-A_\perp P_\perp).
$$

Consequently, over any interval $[0,T]$,

$$
-\frac12\int_0^Td\,P_\parallel P_\perp\,dt
=-\frac18\bigl[rQ\bigr]_0^T+\frac18\int_0^T\dot rQ\,dt+\frac14\int_0^Tr(A_\parallel P_\parallel-A_\perp P_\perp)\,dt.
$$

For a J-periodic history, $r(T)=r(0)$ and $|Q|\le|\mathbf P|^2\le4w^2$, so the boundary term is at most $w^2r(0)$ in size. Under rigid recurrence it vanishes.

*Proof.* By (I7), $\dot Q=2P_\parallel\dot P_\parallel-2P_\perp\dot P_\perp=2(A_\parallel P_\parallel-A_\perp P_\perp)+4\dot\vartheta P_\parallel P_\perp$. Multiply by $r/4$ and use $r\dot\vartheta=d$. Integrate $r\dot Q$ by parts. Under rigid recurrence the components of $\mathbf P$ are periodic, because $\mathbf v_i(t+T)=R\mathbf v_i(t)$ and the axis rotates by the same R. $\blacksquare$

The first identity is kinematic. Inserting (I6) uses the equation. Every quantity is regular through zeros of J, and no weight $1/J$ or measure $d\vartheta$ appears. The positive-J correlation $K_1=-\frac12\oint P_\parallel P_\perp\,dt/r$ has the analogous form only with the weight $r/J$ in place of $r$. That is the inverse-J route of manuscript Section 9.5, and this note does not treat $K_1$.

## 2. The correlation as a loss plus radial travel

**Theorem C.2 (derived).** For a J-periodic history in $\mathcal C_w$, with $K_2$ the one-period integral,

$$
K_2\le w^2r(0)+\frac{w^2}2R_1+(w^2c_1+k_1)I_1+\frac{k_A'}4I_2,
$$

$$
K_2\ge-w^2r(0)-\frac{w^2}2R_1+\frac14\oint\frac{P_\parallel^2+r^2\mu P_\perp^2}{r}dt-k_1I_1-\frac{k_A'}4I_2.
$$

Under rigid recurrence the terms $\pm w^2r(0)$ are absent.

*Proof.* Insert (I6) into Lemma C.1: $r(A_\parallel P_\parallel-A_\perp P_\perp)=(P_\parallel^2+r^2\mu P_\perp^2)/r+r\mathcal R$, with $|r\mathcal R|\le4k_1/r+k_A'/r^2$. Then use $|\dot rQ|\le4w^2|\dot r|$ and $0\le P_\parallel^2+r^2\mu P_\perp^2\le4w^2c_1$. $\blacksquare$

**Reading.** The accepted proof bounded $K_2$ by $w^2L_d$, which is first order in the transverse speed. Theorem C.2 splits $K_2$ into three parts:

- a nonnegative common-motion loss, at most $w^2c_1I_1$;
- a remainder of third order in speed;
- one radial-travel term, $\tfrac18\oint\dot rQ$.

The loss has the wrong sign to help: a positive $K_2$ is what permits turning in the balance. Its weight $1/r$, however, is one that the radial virial identity bounds (it bounds the loss; it does not determine it). The only term not tied to that weight is the radial-travel term, whose integrand is the correlation of the radial velocity with the common velocity's anisotropy $Q$.

## 3. Consequences for the transverse kinetic budget

Put $\mathcal M(w)=w^2c_1+k_1+w^2k_A'/c_-$ and $m(w)=\mathcal M/c_-$.

**Corollary C.3 (derived).** For a J-periodic history in $\mathcal C_w$ of any sign pattern, at a speed bound with $D>m$,

$$
(D-m)\,Q_d\le\frac{w^2}2R_1+m\,R_2+wz_0L_d.
$$

*Proof.* Over $N$ consecutive periods the accepted sign-free primitive of the low-J theorem gives $DNQ_d\le K_2^{(N)}+Nwz_0L_d$, where $K_2^{(N)}$ is the integral over the $N$ periods. Theorem C.2 over the same interval bounds $K_2^{(N)}$ by $w^2r(0)+N[\tfrac{w^2}2R_1+(w^2c_1+k_1)I_1+\tfrac{k_A'}4I_2]$, since $r$ and $\dot r$ are periodic. Divide by $N$ and let $N\to\infty$; the boundary allowance disappears.

The floor $r_{\min}\ge c_-/(4w^2)$ gives $I_2\le(4w^2/c_-)I_1$. The radial virial identity follows from $\tfrac{d}{dt}(r\dot r)=\dot r^2+r\ddot r=\dot r^2+d^2-rA_r$ and periodicity of $r\dot r$. It reads $\oint rA_r\,dt=R_2+Q_d$, and with $rA_r\ge c_-/r$ it gives $c_-I_1\le R_2+Q_d$. Hence $(w^2c_1+k_1)I_1+\tfrac{k_A'}4I_2\le\mathcal MI_1\le m(R_2+Q_d)$. $\blacksquare$

**Corollary C.4 (repeating histories must breathe; derived).** Under the hypotheses of Corollary C.3 with $D>0$, every J-periodic history satisfies all three inequalities

$$
\text{(0)}\ c_-u\le2w\rho_1+k^2,\qquad
\text{(A)}\ c_-u\le a\rho_1+b,\qquad
\text{(B)}\ c_-u\le a'\rho_1+b',
$$

with

$$
a=2w+\frac{2wm+w^2/2}{D-m},\quad b=\frac{wz_0k}{D-m},\qquad
a'=2w+\frac{4wm+w^2}{D-m},\quad b'=\Bigl(\frac{wz_0}{D-m}\Bigr)^2.
$$

Since $u\ge1/r_{\max}$, each form implies a lower bound on mean radial speed for every history with $r_{\max}<c_-/b_f$:

$$
\rho_1\ge\frac{c_-/r_{\max}-b_f}{a_f}.
$$

This lower bound tends to zero as $r_{\max}$ approaches $c_-/b_f$. With a margin $c_-u\ge2b_f$, which holds whenever $r_{\max}\le c_-/(2b_f)$, it gives $\rho_1\ge c_-u/(2a_f)$.

*Proof.* Divide the virial identity by T: $c_-u\le\rho_2+q$, and $\rho_2\le2w\rho_1$ because $|\dot r|=|u_1-u_2|\le2w$. Form (0) inserts the accepted $q\le k^2$ of the low-J Theorem Z. Form (A) inserts Corollary C.3 divided by T together with the accepted $\langle|d|\rangle\le k$. That gives $q\le[\tfrac{w^2}2\rho_1+m\rho_2+wz_0k]/(D-m)$, so $\rho_2+q\le\rho_2D/(D-m)+\ldots$. Form (B) instead uses $\langle|d|\rangle\le\sqrt q$ and $wz_0\sqrt q\le\tfrac12(D-m)q+(wz_0)^2/(2(D-m))$. That gives $q\le[w^2\rho_1+2m\rho_2]/(D-m)+b'$. Collect the $\rho_1$ terms using $\rho_2\le2w\rho_1$. $\blacksquare$

Form (0) uses only accepted results and is recorded here as the baseline. Forms (A) and (B) use Theorem C.2 and are new. The exact-rational evaluations in the evidence folder give the following conservative values.

| $w$ | $D-m\ge$ | slope $a\le$ | $b\le$ | slope $a'\le$ | $b'\le$ | $k^2\le$ | (0) bites below | (A) bites below | (B) bites below |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $1/10$ | $0.16737$ | $0.25924$ | $3.1679\times10^{-5}$ | $0.31847$ | $3.6238\times10^{-7}$ | $0.0027693$ | $529.15$ | $46257$ | $4.0436\times10^6$ |
| $1/20$ | $0.74353$ | $0.10202$ | $2.8292\times10^{-8}$ | $0.10404$ | $7.0924\times10^{-11}$ | $1.1286\times10^{-5}$ | $1.5213\times10^5$ | $6.0685\times10^7$ | $2.4207\times10^{10}$ |
| $1/100$ | $0.95859$ | $0.020054$ | $1.0884\times10^{-12}$ | $0.020107$ | $1.0885\times10^{-16}$ | $1.0884\times10^{-8}$ | $1.7831\times10^8$ | $1.7831\times10^{12}$ | $1.7830\times10^{16}$ |

"Bites below" is the separation $c_-/b_f$ (rounded down) under which the form forces positive mean radial speed. Each slope and intercept is computed with the enclosure end that makes it an upper bound; each slope is written in a form decreasing in $D$ and increasing in $m$. At $w=1/10$ and $r_{\max}=1000$, form (A) requires $\rho_1\ge0.00553$, against the trivial cap $2w=0.2$.

**Constant separation.** If $\dot r\equiv0$, form (B) excludes every separation $r<c_-/b'$, which is $4.04\times10^6$ at $w=0.1$. That range is already inside the accepted constant-separation exclusion through $2\times10^7$ at that speed, so the constant-separation case adds nothing new at $w=0.1$. Form (B) also applies at the other tabulated speeds and for every sign pattern of J, but this note claims no comparison there.

**Reading.** The balance bounds the turning by radial travel: $q$ is at most about $\tfrac{w^2}{2}\rho_1/(D-m)$ plus small terms. The virial identity demands a relative kinetic budget $\rho_2+q\ge c_-\langle1/r\rangle$. Together these force a positive mean radial speed wherever the forcing line has a positive numerator. That is all that is proved. Whether the budget is met *mostly* radially ($\rho_2\gg q$) would need its own quantitative predicate, which is not supplied here, and near the cutoff the forced radial speed tends to zero. The accepted results alone (form (0)) give a positive lower bound only below 529 at speed 0.1. Theorem C.2 extends the cutoff to about $4\times10^6$, as the intercepts drop from order $w^4$ to order $w^8$. The cutoff is not a necessary maximum separation.

## 4. Why radial forcing alone does not exclude

**Proposition C.5 (derived).** For every J-periodic history in $\mathcal C_w$, $\rho_1\le\sqrt{\rho_2}\le\sqrt{c_+u}$. The forcing line of form (f) requires $\rho_1\ge(c_-u-b_f)/a_f$. Since $b_f>0$, that requirement is compatible with the ceiling $\sqrt{c_+u}$ whenever $c_-u/a_f\le\sqrt{c_+u}$, that is, whenever $u\le c_+a_f^2/c_-^2$. For forms (0), (A) and (B) at $w=1/10$, the floor $u\le4w^2/c_-<0.0273$ lies below each of these thresholds; the smallest threshold, belonging to form (0), is $c_+\cdot0.04/c_-^2>0.0500$. Radial forcing and the radial equation's own speed allowance are therefore compatible throughout the class.

*Proof.* By the virial identity, $\rho_2=\langle rA_r\rangle-q\le c_+u$, and $\rho_1^2\le\rho_2$ by Cauchy–Schwarz. $\blacksquare$

This states only that the two necessary conditions are compatible; it shows neither that such a history exists nor that the radial equation can actually reach its upper allowance. Strongly breathing histories, whose mean radial speed is of the order $\sqrt{\langle1/r\rangle}$, are untouched by Corollary C.4. Large-separation recurrence stays open.

## 5. The remaining unknown and the next distinct lemma

**What is now uncontrolled.** On the sign-free route, the only part of $K_2$ outside the bounded loss and the third-order remainder is the radial–anisotropy correlation $\tfrac18\oint\dot rQ\,dt$. It is bounded here by $\tfrac{w^2}2R_1$ through size alone. Two sufficient routes exist. The first is a direct signed bound on this correlation, which might succeed even when radial travel is large. The second is a solution-derived upper bound $\rho_1\le U$ on mean radial speed. It excludes a J-periodic history whenever $a_fU+b_f<c_-u$ for one form f, or in conservative form whenever $a_fU+b_f<c_-/r_{\max}$. A bound of the same asymptotic order with an unspecified coefficient need not suffice, and the two routes carry different information.

**What does not work.** Integrating $\oint\dot rQ$ by parts and inserting Lemma C.1 returns $K_2$ minus the loss term exactly, which is circular. A sign on a differently weighted integral does not transfer. One example: the time-weighted turning correlation satisfies $\oint\dot\vartheta P_\parallel P_\perp\,dt=-\tfrac12\oint(P_\parallel^2+r^2\mu P_\perp^2)r^{-2}dt-\tfrac12\oint\mathcal R\,dt$ under rigid recurrence, so it is negative at leading order. That sign does not give a sign for $K_2$, whose weight is $r$.

**Suggested next lemma (inferred route, not attempted).** Write $\oint\dot rQ=-\oint(r-\bar r)\dot Q$ for a constant $\bar r$. The boundary term vanishes under rigid recurrence; under relative recurrence it would need the averaging argument above. Then $\dot Q$ has the nonnegative principal part $2(P_\parallel^2+r^2\mu P_\perp^2)/r^2$, plus the turning term $4\dot\vartheta P_\parallel P_\perp$. Input (I6) bounds only the combination $A_\parallel P_\parallel-A_\perp P_\perp$, not this term. The turning term has its own short bound: $\oint|\dot\vartheta P_\parallel P_\perp|\,dt\le2w^2\oint|d|\,r^{-1}dt\le(4w^3/c_-)Q_d$, from $|P_\parallel P_\perp|\le2w^2$ and the accepted sign-free estimate $\oint|d|r^{-1}dt\le(2w/c_-)Q_d$. Multiplying by an excursion supremum makes that supremum an explicit additional input. This would bound the correlation by the radial excursion $\max|r-\bar r|$ times controlled integrals, instead of by radial speed. Its usefulness depends on a solution-derived bound on the excursion relative to $r_{\max}$, which is not available; no new exclusion follows yet. A certified search for wide, strongly breathing candidates, or a radial-oscillation averaging theorem with error bounds, are the alternatives.

## Limits

Planar, opposite-polarity, unit-coupling, complete histories below wake speed with positive separation are assumed throughout. The proofs use the accepted pointwise bounds (I1)–(I7) and the accepted low-J primitive, floor and mean bounds; any defect there propagates. Corollaries C.3–C.4 need $D>m$ and $D>0$. These hold at the three tabulated speeds, and $D>0$ holds on $(0,8/75]$ by the accepted monotonicity proof. Monotonicity of $D-m$ is not proved here, so other speeds need their own evaluation. No history was integrated, and no prescribed path was used. The separations $c_-/b_f$ are cutoffs for a positive lower bound on mean radial speed, not necessary maximum separations, and a positive mean radial speed does not by itself make a history mostly radial or far from circular. Radial-travel control and a signed bound on the radial–anisotropy correlation are different sufficient routes. The constants are not claimed optimal. The positive-J correlation $K_1$, signed breathing and the lattice programme are not treated. Mirror symmetry, constant common velocity, conserved J and observer-level physics are not assumed. Nothing here changes BP-001, production gates or canonical scores.

## Instrument

The table comes from [`correlation_constants.py`](../evidence/saturday-actual-common-motion-correlations-2026-10-17/correlation_constants.py), described in its [README](../evidence/saturday-actual-common-motion-correlations-2026-10-17/README.md). It evaluates the closed forms above in exact rational arithmetic, with a squared-bracket enclosure of $\sqrt{1-w^2}$. Before any target it reproduces hand values and accepted regression values; this is the author's arithmetic verification, not independent evidence.

## Falsifiers

- A history in $\mathcal C_w$ at an instant where the identity of Lemma C.1 fails refutes it; the identity is kinematic once $\mathbf A$ is the actual acceleration sum.
- A J-periodic history in $\mathcal C_w$ with $D>m$ violating Theorem C.2 or Corollary C.3, or with mean radial speed below one of the lines of Corollary C.4, refutes the corresponding statement.
- A valid solution violating one of (I1)–(I7) refutes the accepted input and every statement that uses it.
- An exact re-evaluation in which a tabulated decimal is not conservative withdraws that entry.

## Corrections after review

The [independent review](saturday-actual-common-motion-correlations-codex-review-2026-10-18.md) supports Lemma C.1, the multi-period boundary treatment, Theorem C.2, Corollaries C.3–C.4, Proposition C.5 and every tabulated value. It asked for three scope corrections, now made. The lead, Result items 3–5 and the Reading of Corollary C.4 claim only a positive lower bound on mean radial speed below each cutoff; an order statement now carries the explicit margin $c_-u\ge2b_f$, and claims of radial dominance or non-circularity are withdrawn (CR1). Radial-travel control is stated as the strict sufficient predicate $a_fU+b_f<c_-u$, distinct from a signed bound on the correlation, and the loss is described as bounded rather than determined by the virial identity (CR2). The turning term in the candidate excursion route now carries its own bound $\oint|\dot\vartheta P_\parallel P_\perp|\le(4w^3/c_-)Q_d$ instead of an attribution to (I6) (CR3). No theorem inequality, constant or tabulated decimal changed.
