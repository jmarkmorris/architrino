# Low and sign-changing angular momentum in repeating two-member histories (2026-10-14)

## Result

**Two period identities that never divide by the relative angular momentum give estimates uniform in its minimum, valid through zeros and sign changes. They exclude every repeating history whose separation stays below an explicit bound, but do not decide general periodicity.** The setting is the existing two-member periodicity question of the [binary manuscript, Section 9](../manuscript.md#9-curved-delay-windows-and-the-unresolved-period-average): complete planar opposite-unit pairs under the unchanged [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), unit reduced coupling, $c_f=1$, positive separation, whole-history speed bound $0<w<1/3$, one ordinary partner root per member and no positive-delay self root. The accepted positive-J results of Sections 9.2–9.5 carry error fractions in $1/J_{\min}$ and $1/J_{\min}^2$. Their exclusion predicates are empty once $J_{\min}$ is of order a few units. They divide by J and cannot cross a zero. This note treats the two remaining regimes separately: positive but arbitrarily small J (Domain 1), and J with zeros or sign changes (Domain 2). This is task 3 of the [round of 2026-10-14](../../../../op/agent-chats/2026-10-14-saturday-breathing-lattice-low-angular-momentum/chat.md).

1. **Uniformly small J is excluded; an isolated small minimum is not (derived).** The time-period radial identity gives $\oint J^2r^{-3}dt=\oint A_r\,dt\ge c_-\oint r^{-2}dt>0$, with no sign condition on J. Hence identically zero J is excluded, and so is any repeating history with $J^2<c_-r$ at every instant. At a time of least separation $|J|\ge c_-/(2w)$, which is at least $7.32$ at $w=0.1$. Nothing in this argument bounds the minimum of J, so a breathing history with a small isolated minimum of J stays open (Proposition U).
2. **Domain 1: a turning estimate uniform in $J_{\min}$ (derived).** For $J\ge0$, the integrated rate of J and the radial identity give, without $J_{\min}$, $\Theta\le k(w)\oint dt/r$. Here $\Theta=\oint J r^{-2}dt$ is the net turning and $k(w)=w^2+O(w^3)$ is explicit. The relative transverse speed $d=J/r$ therefore has mean at most $k(w)$ when time is weighted by $1/r$. This is second order in speed, although each member's speed may be first order. The same identities give $\sup r\ge c_-/(2wk)$ (Theorem L).
3. **Domain 2: a sign-free estimate in a regular chart (derived).** Integrating $J\dot J$, which is the rate of $J^2/2$, over a period gives an identity valid through every zero of J. Combined with the radial identity it yields $\oint d^2dt\le k(w)\oint|d|\,dt$. Hence the time means satisfy $\langle|d|\rangle\le k$, $\langle d^2\rangle\le k^2$ and $\langle r^{-2}\rangle\le k^2/(c_-r_{\min})$. Consequently $\sup r\ge\sqrt{c_-r_{\min}}/k\ge c_-/(2wk)$ for every sign pattern of J (Theorem Z).
4. **An exclusion covering low J, zeros and sign changes alike (derived; constants evaluated exactly).** No J-periodic history in the class has separation always below $c_-/(2wk(w))$. In exact arithmetic this bound exceeds $139.2$ at $w=1/10$ and $5110$ at $w=1/20$; its product with $w^3$ tends to one as $w\to0$. The accepted separation floor $c_-/(4w^2)$ is $36.6$ and $171.7$ at the same speeds (Corollary Z.1).
5. **The rate of J at its zeros (derived).** At any instant where $J=0$ the two transverse velocities are equal, $b_1=b_2=b$. The actual delayed rate is then $\dot J=P_\parallel b/(r\sqrt{1-b^2})+E$ with $|E|\le(c_3+wc)/r^2$, where $P_\parallel$ is the axial part of the velocity sum. Write $\beta_0=(c_3+wc)\sqrt{1-b^2}/r$ for the error band. The actual product $P_\parallel b>\beta_0$ certifies $\dot J>0$, and $P_\parallel b<-\beta_0$ certifies $\dot J<0$. A zero followed by negative J requires $P_\parallel b\le\beta_0$, a zero followed by positive J requires $P_\parallel b\ge-\beta_0$, and a tangency requires $|P_\parallel b|\le\beta_0$. Zeros with the product inside the band, and zeros with zero derivative, stay unclassified. Large separation alone fixes no direction (Proposition X).
6. **What stays uncontrolled.** Both period identities balance the positive delayed gain against a common-motion correlation. In Domain 1 this is $K_1=-\tfrac12\oint P_\parallel P_\perp\,dt/r$; in Domain 2 it is $K_2=-\tfrac12\oint d\,P_\parallel P_\perp\,dt$. The proofs use only the size bound $|P_\parallel P_\perp|\le2w^2$. Separation is also not bounded above by anything derived here. A solution-derived bound on either correlation, or on the separation, would turn these necessary conditions into further exclusions (Section 5). A failed sufficient predicate proves neither a repeating solution nor a no-go result.

> Claim grade: derived for Proposition U, Theorems L and Z, Corollary Z.1 and Proposition X, by the hand proofs below from accepted pointwise row bounds on the stated class; the decimal constants at $w=1/10$, $1/20$, $1/100$, $1/1000$ are exact-rational evaluations by a same-author instrument that passed five known cases first, which is arithmetic verification and not independent evidence; the sign of $D(w)$ on $(0,8/75]$ and $[0.11,1/3)$ is derived from its strict monotonicity together with endpoint enclosures, the upper enclosure at $0.11$ coming from the independent review's reference, and the transition between $8/75$ and $0.11$ is not located. Nothing is measured on a history. Falsifier: a complete J-periodic opposite pair in the class, with $D(w)>0$, whose separation stays below $c_-/(2wk(w))$, or whose time means violate Theorem Z, or which has a zero of J followed by negative J at an instant with $P_\parallel b>(c_3+wc)\sqrt{1-b^2}/r$, refutes the corresponding statement; so does a valid solution violating one of the accepted row bounds the proofs use.

## Setting and accepted inputs

**Class.** Write $\mathcal C_w$ for histories with the following properties.

- Two architrinos of opposite unit polarity move in a plane on twice continuously differentiable paths $\mathbf x_1,\mathbf x_2$ defined for all times. They obey the unchanged Master Equation with unit reduced coupling and $c_f=1$.
- The separation $r=|\mathbf x_1-\mathbf x_2|$ is positive.
- Both speeds are at most $w$ at every time, for one fixed $0<w<1/3$.
- At every instant each member receives exactly one ordinary partner row and no positive-delay row from its own past.

The speed bound below wake speed supplies this root census, as in the [non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md) and the [curved-window theorem](saturday-curved-window-strength-difference-2026-10-11.md).

**Three recurrence meanings.** A history is *J-periodic* when $\mathbf r(t+T)=R\,\mathbf r(t)$ for one $T>0$ and one fixed rotation $R$ of the motion plane that preserves its orientation, where $\mathbf r=\mathbf x_1-\mathbf x_2$. It is *rigidly repeating* when $\mathbf x_i(t+T)=R\mathbf x_i(t)+\mathbf d$ for both members with the same $R$ and $\mathbf d$. It is *periodic* when $R$ is the identity and $\mathbf d=0$. Periodic and relative-periodic histories are rigidly repeating, and rigidly repeating histories are J-periodic. Every result below uses only J-periodicity, so it holds for each of the three meanings; none is substituted for another. J-periodicity makes $r$, $\dot r$ and $J$ periodic, because an orientation-preserving rotation of the plane preserves lengths and planar cross products. A spatial proper rotation that maps the motion plane to itself can instead reverse the plane's orientation, for example a half turn about an axis lying in the plane; then $J(t+T)=-J(t)$. In that case $R^2$ preserves the orientation and $\mathbf r(t+2T)=R^2\mathbf r(t)$, so the history is J-periodic with period $2T$ and every result below applies with $T$ replaced by $2T$.

**Notation.** The relative angular momentum is the planar cross product $J=\mathbf r\times(\mathbf v_1-\mathbf v_2)$. It is a continuously differentiable function of time. Define the following:

- $u_i$ and $b_i$ are member $i$'s velocity components along and across the present axis $\hat{\mathbf r}$.
- $d=J/r=b_1-b_2$ is the relative transverse speed.
- $P_\parallel=u_1+u_2$ and $P_\perp=b_1+b_2$ are the components of the velocity sum $\mathbf P$.
- $\Theta=\oint J r^{-2}dt$ is the net turning over one period.
- $r_{\min}$ and $r_{\max}$ are the least and greatest separations.
- $a_i$ is the size of member $i$'s received acceleration, $\mu=(a_1+a_2)/2$ and $\delta=(a_2-a_1)/2$.
- $A_r=a_1\cos\beta_1+a_2\cos\beta_2$ is the inward relative acceleration along the axis, with the aberration angles of the accepted notes.
- $\langle f\rangle=T^{-1}\oint f\,dt$ is a time mean.

None of the arguments below divides by J or uses the turning angle as a measure.

**Accepted pointwise inputs on $\mathcal C_w$.** Each holds at every instant, for any sign of J:

- (I1) $\alpha/r^2\le a_i\le c_1/r^2$, with $\alpha=(1-w)^2/(1+w)$ and $c_1=(1+w)^2/(1-w)$ ([non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md), bound B2).
- (I2) $c_-/r^2\le A_r\le c_+/r^2$, with $c_-=2(1-w)^2\sqrt{1-w^2}/(1+w)$ and $c_+=2c_1$ ([manuscript Section 9.4](../manuscript.md#94-the-radial-period-identity-and-a-constant-separation-exclusion)).
- (I3) $\dot J=\mu J+r\delta P_\perp+re_J$ with $|re_J|\le c_3/r^2$ and $c_3=(1+w)^3/(1-3w)^2$. This is the non-mirror note's Theorem E, built from its pointwise Lemma 3, together with the bound $r^3(a_1\epsilon_2+a_2\epsilon_1)\le c_3$ of [manuscript Section 9.2](../manuscript.md#92-an-exact-balance-with-a-nonnegative-loss).
- (I4) $2r^2\delta=P_\parallel+\zeta$ with $|\zeta-\zeta_0|\le c(w)/r$. Here $\zeta_0=u_1g(b_1)+u_2g(b_2)$, $g(b)=(1-b^2)^{-1/2}-1$, $|\zeta_0|\le z_0=2wg(w)$, and $c(w)$ is the curved-window constant ([manuscript Section 9](../manuscript.md#9-curved-delay-windows-and-the-unresolved-period-average)).
- (I5) $\ddot r=J^2/r^3-A_r$. The kinematic part, $\ddot r=(|\mathbf v_1-\mathbf v_2|^2-\dot r^2)/r+\hat{\mathbf r}\cdot(\ddot{\mathbf x}_1-\ddot{\mathbf x}_2)$ with $r^2|\mathbf v_1-\mathbf v_2|^2-(\mathbf r\cdot(\mathbf v_1-\mathbf v_2))^2=J^2$, is Cartesian and regular at $J=0$. The inward component is identified with $A_r$ by the received rows.

Inputs I1–I4 are derived from the whole-history speed bound and the row law and are independently accepted in the cited reviews; this note re-proves none of them. They use no conserved energy, force, mass or angular momentum. Two further constants recur:

$$
e(w)=c_3+w\,c(w),\qquad D(w)=\alpha-\frac{2w\,e(w)}{c_-},\qquad k(w)=\frac{w^2+wz_0}{D(w)}\quad(D(w)>0).
$$

The constant $e(w)$ is the accepted $e_1$ of Section 9.2.

## 1. Period identities that are regular at zero angular momentum

**Lemma 0 (derived).** For every J-periodic history in $\mathcal C_w$:

$$
\text{(a)}\ \oint\dot J\,dt=0,\qquad
\text{(b)}\ \oint J\dot J\,dt=0,\qquad
\text{(c)}\ \oint\frac{J^2}{r^3}dt=\oint A_r\,dt\in\Bigl[c_-\oint\frac{dt}{r^2},\,c_+\oint\frac{dt}{r^2}\Bigr].
$$

At a time of least separation, $J^2\ge c_-r_{\min}$; hence $r_{\min}\ge c_-/(4w^2)$, and $|J|\ge c_-/(2w)$ at that time.

*Proof.* J is continuously differentiable and periodic, so J and $J^2/2$ have zero period integrals of their derivatives, giving (a) and (b). By I5, $\oint\ddot r\,dt=0$ because $\dot r$ is periodic, which with I2 gives (c). At a least separation $\ddot r\ge0$, so $J^2\ge r^3A_r\ge c_-r_{\min}$ by I5 and I2. Since $|d|=|b_1-b_2|\le2w$, $J^2\le4w^2r^2$, so $r_{\min}\ge c_-/(4w^2)$ and $J^2\ge c_-^2/(4w^2)$ at that instant. $\blacksquare$

The floor and the closest-approach bound are those of manuscript Section 9.4, now noted to hold without any sign condition on J. None of (a)–(c) contains an inverse power of J.

## 2. Domain 1: uniformly small and isolated small positive J

**Proposition U (derived).** No J-periodic history in $\mathcal C_w$ has J identically zero, or $J^2<c_-r$ at every instant, or $|J|<c_-/(2w)$ at every instant.

*Proof.* If $J^2<c_-r$ everywhere then $\oint J^2r^{-3}dt<c_-\oint r^{-2}dt$, contradicting Lemma 0(c). Identically zero J is the special case. The third statement contradicts the closest-approach bound of Lemma 0. $\blacksquare$

Identically zero J was already excluded by the fixed-direction radial argument of the [accepted October 10 note](saturday-two-member-subwake-periodicity-2026-10-10.md#without-mirror-symmetry-no-repeating-history-while-the-centre-term-is-the-smaller-one). Lemma 0(c) restates it as a period average. Proposition U says that J cannot be *uniformly* small. It says nothing about the minimum of J: the bound $|J|\ge c_-/(2w)$ holds at closest approach only, and a breathing history may have a much smaller J elsewhere. The positive-J results of Sections 9.2–9.5 need $J_{\min}$ itself, through $\oint dt/r^2=\oint d\vartheta/J\le\Theta/J_{\min}$. The next theorem replaces that step by an average.

**Theorem L (derived).** Let a J-periodic history in $\mathcal C_w$ have $J\ge0$ at every time, with isolated zeros or tangencies allowed. Then

$$
\oint\frac{dt}{r^2}\le\frac{2w}{c_-}\Theta,
\qquad
\alpha\Theta\le K_1+wz_0\oint\frac{dt}r+e(w)\oint\frac{dt}{r^2},
\qquad K_1=-\frac12\oint\frac{P_\parallel P_\perp}{r}dt.
$$

If $D(w)>0$, then

$$
\Theta\le k(w)\oint\frac{dt}r,
\qquad
\frac{\oint r^{-2}dt}{\oint r^{-1}dt}\le\frac{2w\,k(w)}{c_-},
\qquad
r_{\max}\ge\frac{c_-}{2w\,k(w)}.
$$

*Proof.* Since $0\le d\le2w$, $J^2/r^3=d\,J/r^2\le2wJ/r^2$, and Lemma 0(c) gives the first inequality. By I1, $\mu J\ge\alpha J/r^2$, so $\oint\mu J\,dt\ge\alpha\Theta$. Lemma 0(a) and I3 give $\oint\mu J\,dt=-\oint r\delta P_\perp dt-\oint re_Jdt$. By I4, $r\delta P_\perp=(P_\parallel+\zeta)P_\perp/(2r)$, so $-\oint r\delta P_\perp dt=K_1-\oint\zeta P_\perp/(2r)\,dt$. Since $|P_\perp|\le2w$ and $|\zeta|\le z_0+c/r$, the last integrand satisfies $|\zeta P_\perp/(2r)|\le wz_0/r+wc/r^2$. With $|re_J|\le c_3/r^2$ this proves the second display. Insert the first inequality into the $e(w)$ term; then $|P_\parallel P_\perp|\le\tfrac12|\mathbf P|^2\le2w^2$ gives $K_1\le w^2\oint dt/r$, so $D(w)\Theta\le(w^2+wz_0)\oint dt/r$. Combining with the first inequality gives the ratio bound. Finally $\oint r^{-1}dt\le r_{\max}\oint r^{-2}dt$ gives $r_{\max}\ge c_-/(2wk)$. $\blacksquare$

**Reading.** Write $\langle d\rangle_{1/r}=\oint(d/r)dt/\oint(1/r)dt$ for the mean of $d$ when time is weighted by $1/r$; since $\oint(d/r)dt=\Theta$, Theorem L says $\langle d\rangle_{1/r}\le k(w)$. The positive delayed gain $\mu J\approx J/r^2$ must be returned over each period, and the only first-order source of loss is the common-motion term $r\delta P_\perp\approx P_\parallel P_\perp/(2r)$, which is second order in speed. Therefore the turning must be correspondingly slow. Theorem L does not use $J_{\min}$ and remains valid as $J_{\min}\to0$, where the accepted inverse-J predicates are empty.

**Remark (the averaged replacement for $J_{\min}$).** The first inequality of Theorem L is the inverse-J bound $\oint dt/r^2\le\Theta/J_{\min}$ with $J_{\min}$ replaced by the closest-approach value $c_-/(2w)$. It applies to every error integral of the form $\oint O(r^{-2})dt$. In the common-motion balance of Section 9.2 these are the curvature and $e_J$ parts of $R$. There the coefficient $e(w)/J_{\min}$ in $\eta$ may be replaced by $2w\,e(w)/c_-$, which is at most $0.5445$ at $w=0.1$. The part $e_2/J_{\min}^2$ of $\eta$ comes from $R_M$, whose weight is $r/J$. The breathing, loss and $\mathcal N$ integrals of Sections 9.2–9.5 carry the same weight. These terms are intrinsically positive-J and are not made uniform by this remark.

## 3. Domain 2: zeros and sign changes in a regular chart

Across a sign-changing zero of J the turning direction reverses and $d\vartheta$ is not a positive measure. At a tangency, or on an interval where J vanishes, it need not reverse. At every zero, whatever its kind, each weight $r/J$ or $1/J$ is singular. That singularity belongs to the inverse-J formulas of Sections 9.2–9.5, not to the Cartesian period equations. The following uses only the Cartesian quantities J, $d=J/r$, r and the actual rows. Identically zero J, isolated or tangent zeros, flat zero intervals and sign changes are kept separate, and no transverse crossing is assumed.

**Theorem Z (derived).** Let a J-periodic history in $\mathcal C_w$ have J of any sign pattern. Then

$$
\alpha\oint d^2dt\le K_2+wz_0\oint|d|\,dt+\frac{2w\,e(w)}{c_-}\oint d^2dt,
\qquad K_2=-\frac12\oint d\,P_\parallel P_\perp\,dt.
$$

If $D(w)>0$, then

$$
\oint d^2dt\le k(w)\oint|d|\,dt,\qquad
\langle|d|\rangle\le k(w),\qquad
\langle d^2\rangle\le k(w)^2,
$$

$$
\Bigl\langle\frac1{r^2}\Bigr\rangle\le\frac{k(w)^2}{c_-r_{\min}}\le\Bigl(\frac{2w\,k(w)}{c_-}\Bigr)^2,
\qquad
r_{\max}\ge\frac{\sqrt{c_-r_{\min}}}{k(w)}\ge\frac{c_-}{2w\,k(w)}.
$$

*Proof.* Multiply I3 by J and integrate; Lemma 0(b) gives $\oint\mu J^2dt=-\oint Jr\delta P_\perp dt-\oint Jre_Jdt$. The left side is at least $\alpha\oint d^2dt$ by I1, because $J^2/r^2=d^2\ge0$; no sign of J is needed. By I4, $-Jr\delta P_\perp=-\tfrac12d(P_\parallel+\zeta)P_\perp$. The $P_\parallel$ part integrates to $K_2$. The rest is bounded by $w|d|(z_0+c/r)$, and $|Jre_J|\le c_3|J|/r^2$. Hence

$$
\alpha\oint d^2\le K_2+wz_0\oint|d|+e(w)\oint\frac{|J|}{r^2}.
$$

By the Cauchy–Schwarz inequality, $\oint|J|r^{-2}=\oint|d|\,r^{-1}\le(\oint d^2)^{1/2}(\oint r^{-2})^{1/2}$. By Lemma 0(c), $\oint r^{-2}\le c_-^{-1}\oint d^2r^{-1}\le(c_-r_{\min})^{-1}\oint d^2$. By the floor, $(c_-r_{\min})^{-1/2}\le2w/c_-$. Hence $\oint|J|r^{-2}\le(2w/c_-)\oint d^2$, which proves the first display. Using $K_2\le w^2\oint|d|$ gives $D\oint d^2\le(w^2+wz_0)\oint|d|$. Cauchy–Schwarz again gives $(\oint|d|)^2\le T\oint d^2\le Tk\oint|d|$, so $\langle|d|\rangle\le k$ and $\langle d^2\rangle\le k^2$; the case $\oint|d|=0$ is excluded by Proposition U. Then $c_-\langle r^{-2}\rangle\le\langle d^2r^{-1}\rangle\le\langle d^2\rangle/r_{\min}\le k^2/r_{\min}$. Finally $\langle r^{-2}\rangle\ge r_{\max}^{-2}$ and the floor give the last chain. $\blacksquare$

**Corollary Z.1 (bounded-separation exclusion; derived).** If $D(w)>0$, no J-periodic history in $\mathcal C_w$ has $r<c_-/(2w\,k(w))$ at every time. This holds whether J is positive with a small minimum, has isolated zeros or tangencies, or changes sign. The exact-rational evaluations in the evidence folder give the following lower bounds on this separation.

| Speed bound $w$ | $D(w)\ge$ | $k(w)\le$ | Excluded: $\sup r<$ | Accepted floor $c_-/(4w^2)$ | $w^3c_-/(2wk)$ |
| --- | --- | --- | --- | --- | --- |
| $1/10$ | $0.19194$ | $0.052624$ | $139.229$ | $36.633$ | $0.1392$ |
| $1/20$ | $0.74604$ | $0.0033595$ | $5110.7$ | $171.68$ | $0.6388$ |
| $1/100$ | $0.95865$ | $1.0433\times10^{-4}$ | $9.3013\times10^5$ | $4851.7$ | $0.9301$ |
| $1/1000$ | $0.99598$ | $1.0041\times10^{-6}$ | $9.9300\times10^8$ | $4.9850\times10^5$ | $0.9930$ |

Each entry is rounded in the conservative direction from the exact-rational value. The square root $\sqrt{1-w^2}$ is enclosed by a squared rational bracket of width below $10^{-29}$. A history whose speed bound is any $w'\le1/10$ also satisfies the bound $1/10$, so the first row applies to the whole class $w\le0.1$. A smaller speed bound gives a stronger conclusion where $D$ is positive at that speed. Only the four tabulated rows carry certified decimals.

**The sign of D (derived).** $D$ is strictly decreasing on $(0,1/3)$. The independent review supplies this argument; it is reproduced here with that attribution. The first term $\alpha=(1-w)^2/(1+w)$ is strictly decreasing, and $c_-=2\alpha\sqrt{1-w^2}$ is positive and decreasing. The constant $c_3=(1+w)^3/(1-3w)^2$ is positive and increasing. So is $c(w)$: its prefactor $(1+w)^3/((1-w)(1-3w)^2)$ and its bracket $1+(3+2w)/\sqrt{1-w^2}$ are both positive and increasing. Hence $e=c_3+wc$ and $2we/c_-$ are increasing, and $D=\alpha-2we/c_-$ is strictly decreasing. The lower enclosure of this note's instrument gives $D(8/75)>0$, so $D>0$ on all of $(0,8/75]$. The instrument's lower enclosure at $0.11$ is negative, but a negative lower bound alone does not prove $D(0.11)<0$. The upper enclosure of the [independent review's reference](../evidence/saturday-lowj-codex-review-2026-10-14/lowj_reference.py) does prove it, so $D<0$ on $[0.11,1/3)$, where Theorems L and Z carry no exclusion. These signs follow from monotonicity and the two endpoint enclosures, not from interpolating the instrument's grid of lower bounds. Where D changes sign in $(8/75,0.11)$ is not located, and the constants are not claimed optimal.

**Proposition X (the rate of J at its zeros; derived).** Let $t_0$ be any instant of a history in $\mathcal C_w$ at which $J(t_0)=0$; no periodicity is needed. Write $b=b_1(t_0)=b_2(t_0)$ and $S=\sqrt{1-b^2}$. Then

$$
\dot J(t_0)=\frac{P_\parallel b}{rS}+E,\qquad |E|\le\frac{e(w)}{r^2}=\frac{c_3+wc(w)}{r^2}.
$$

Consequently:

- (i) If $J(t_0)=0$ and $J<0$ on an interval just after $t_0$, then $P_\parallel b\le e(w)S/r$ at $t_0$. If $J>0$ just after, then $P_\parallel b\ge-e(w)S/r$.
- (ii) A tangency, $J(t_0)=\dot J(t_0)=0$, requires $|P_\parallel b|\le e(w)S/r$.
- (iii) A J-periodic history whose J takes both signs has at least one zero of each kind in (i) in every period. Either derivative may be zero, so this asserts neither a transverse crossing nor the absence of flat zero intervals.
- (iv) The actual-product inequalities give sufficient direction tests: $P_\parallel b>e(w)S/r$ certifies $\dot J(t_0)>0$, and $P_\parallel b<-e(w)S/r$ certifies $\dot J(t_0)<0$. A zero with $|P_\parallel b|\le e(w)S/r$ is not classified by this proposition.
- (v) The size cap $|P_\parallel b|\le2w^2$ never puts an actual product outside the band, so large separation alone fixes no direction. The quantity $e(w)S/(2w^2)$ has a narrower role: only at zeros with $r>e(w)S/(2w^2)$ can a product obeying the cap lie outside the band at all. That makes it a necessary condition for (iv) to apply, never a sufficient one. At $w=0.1$ it is at most $199.441$.

*Proof.* $J=r(b_1-b_2)=0$ gives $b_1=b_2=b$, so $P_\perp=2b$ and $\zeta_0=(u_1+u_2)g(b)=P_\parallel g(b)$. Hence $P_\parallel+\zeta_0=P_\parallel/S$. By I3 and I4 with $J=0$, $\dot J=(P_\parallel+\zeta)b/r+re_J=P_\parallel b/(rS)+(\zeta-\zeta_0)b/r+re_J$. The last two terms are bounded by $wc/r^2$ and $c_3/r^2$. For (i), if $J<0$ just after $t_0$ the right difference quotient gives $\dot J(t_0)\le0$; the other case is symmetric. (ii) is immediate. For (iii), if $J(t_1)>0>J(t_2)$ with $t_1<t_2$, then $t_d=\sup\{t\in[t_1,t_2]:J(t)\ge0\}$ is a zero followed by negative J. Periodicity supplies the reverse ordering and a zero followed by positive J. (iv) is the rate formula with $|E|\le e(w)/r^2$ and $S>0$. For (v), $|P_\parallel|\le2w$ and $|b|\le w$; a product outside the band therefore needs $2w^2\ge|P_\parallel b|>e(w)S/r$. $\blacksquare$

**Reading.** At a zero of J the members move across the axis together, so their common velocity $\mathbf V=\mathbf P/2$ has parts $V_\parallel=P_\parallel/2$ and $V_\perp=b$. When the actual product lies outside the band of width $O(r^{-1})$, the sign of $\dot J$ is the sign of $V_\parallel V_\perp$. This is the October 10 note's centre term evaluated at an instant where it alone drives $\dot J$, now with an explicit actual-row error. Zeros whose actual products lie outside the band with opposite signs have certified opposite derivatives. A sign-changing periodic J need not realize such zeros: its reversal and its return may both occur at zeros whose products lie inside the band, or at zeros with zero derivative, and those stay unclassified. The proposition gives local necessary conditions and sufficient direction tests at a given zero. It is not a crossing law obtained from positive-J formulas, and it does not show that a crossing occurs.

**Identically zero J on an interval.** If $J\equiv0$ on an interval, the axis direction is fixed there, $\ddot r=-A_r<0$ by I5, and Proposition X requires $|P_\parallel b|\le e(w)S/r$ throughout. Identically zero J on a whole period is excluded by Proposition U. A finite interval of zero J inside a period is not excluded here.

## 4. How the two domains relate to the accepted positive-J results

For positive J both Theorem L and Theorem Z apply, with the same $k(w)$ and the same separation bound. They use different weights: Theorem L weights time by $1/r$, Theorem Z uses unweighted time. Neither replaces the inverse-J predicates of Sections 9.3–9.5. Those predicates bound J-weighted breathing and loss integrals and exclude classes with a large $J_{\min}$ and controlled radial travel. The present results exclude classes with bounded separation, whatever J does. The two families of results overlap only through the shared floor and row bounds.

The statements here have three distinct contents. Uniformly small J is excluded (Proposition U). Repeating histories, if any exist in $\mathcal C_w$ with $D(w)>0$, must turn slowly in the mean, $\langle|d|\rangle\le k(w)=w^2(1+O(w))$, and must reach separations of order at least $w^{-3}$, far beyond the floor of order $w^{-2}$ (Theorems L and Z). At zeros of J the rate has an explicit formula, which yields one-sided necessary conditions and sufficient direction tests in terms of the actual product $P_\parallel b$ (Proposition X). None of these excludes a wide, slowly turning repeating history, and none shows that one exists.

## 5. What is uncontrolled, and sufficient additional conditions

**Uncontrolled correlations.** The only first-order loss in either period identity is a common-motion correlation, $K_1$ in Domain 1 and $K_2$ in Domain 2. Both proofs bound it by size alone, $|P_\parallel P_\perp|\le2w^2$. Its sign and its correlation with $1/r$ or with $d$ are not controlled. These correlations are the period averages of the October 10 note's centre term, written with actual-row errors. The same note's slow-pair reduced model, which has no error bound, suggests a sign for a related common-speed change but does not control $K_1$ or $K_2$.

**Uncontrolled norm.** Lemma 0 bounds separation from below only. Nothing in the equations used here bounds $r_{\max}$, the time spent at large separation, or the radial travel from above. Theorem Z's conclusions are means, and a history may spend a long time at large separation where $1/r$ is small.

**Proved sufficient conditions.** For a J-periodic history in $\mathcal C_w$ with $D(w)>0$, each item below suffices to exclude the history. Each follows directly from the displayed inequalities of Theorems L and Z.

- (S1) $J\ge0$ and $K_1+wz_0\oint dt/r<D(w)\Theta$.
- (S2) Any sign of J and $K_2+wz_0\oint|d|\,dt<D(w)\oint d^2dt$.
- (S3) Any sign of J and a solution-derived bound $r_{\max}<\sqrt{c_-r_{\min}}/k(w)$.
- (S4) $J\ge0$ and a solution-derived lower bound $\langle d\rangle_{1/r}>k(w)$.
- (S5) Any sign of J and a solution-derived lower bound $\langle|d|\rangle>k(w)$.

For example, a solution-derived inequality $K_2\le\kappa\oint|d|$ with $\kappa+wz_0$ below $D(w)\langle d^2\rangle/\langle|d|\rangle$ would give S2. These are sufficient predicates. A history that fails one of them is neither a repeating solution nor evidence against the question.

## Limits

The class is planar, opposite-polarity, unit-coupling and below wake speed for all time, with positive separation and complete histories. The proofs use the accepted pointwise row bounds I1–I4; any defect in those propagates here. Theorems L and Z need $D(w)>0$. By the monotonicity argument and endpoint enclosures of Section 3, $D>0$ on $(0,8/75]$ and $D<0$ on $[0.11,1/3)$. For speed bounds in the second interval the theorems carry no exclusion, and the gap between the two intervals is unresolved. No history was integrated, and no prescribed path was used: a prescribed path would test only a kinematic identity and would be no solution. The constant $k(w)$ is not claimed optimal. Its leading coefficient comes from the crude bound $|P_\parallel P_\perp|\le2w^2$, and the Cauchy–Schwarz and floor steps are not sharp. Mirror symmetry, constant common velocity, constant J, a conserved quantity and observer-level physics are not assumed. Nothing here bears on BP-001, production gates, canonical scores or the lattice and solver programmes.

## Instrument

The constants in Corollary Z.1 and Proposition X(v) come from [`lowj_constants.py`](../evidence/saturday-low-angular-momentum-2026-10-14/lowj_constants.py), described in its [README](../evidence/saturday-low-angular-momentum-2026-10-14/README.md). It evaluates the closed forms above in exact rational arithmetic. Before any target it reproduces two hand values and three accepted regression values; this is arithmetic verification by the author, not independent evidence. No theorem depends on a computed value except the tabulated decimals.

## Falsifiers

- A complete J-periodic history in $\mathcal C_w$ with $J^2<c_-r$ throughout refutes Proposition U.
- One with $J\ge0$ and $\Theta>k(w)\oint dt/r$, at a speed with $D(w)>0$, refutes Theorem L.
- One of any sign pattern with $\oint d^2>k\oint|d|$, or with $r<c_-/(2wk)$ throughout, refutes Theorem Z or Corollary Z.1.
- A history in $\mathcal C_w$ with a zero of J at which $|\dot J-P_\parallel b/(rS)|>e(w)/r^2$ refutes Proposition X.
- An exact re-evaluation in which one tabulated decimal is not conservative withdraws that entry.

## Corrections after review

The [independent review](saturday-low-angular-momentum-codex-review-2026-10-14.md) supports Lemma 0, Proposition U, Theorems L and Z, Corollary Z.1 and the rate formula of Proposition X. Three corrections followed from it. Proposition X now separates the sufficient direction tests from the one-sided necessary conditions, and treats $e(w)S/(2w^2)$ as a size comparison only (LJ1). The recurrence rotation is stated to preserve the orientation of the motion plane, with a doubled period otherwise, and the kinds of zeros of J are kept separate (LJ2). The sign of $D$ outside the interval $(8/75,0.11)$ now rests on monotonicity and endpoint enclosures (LJ3). No theorem inequality, constant or tabulated decimal changed.
