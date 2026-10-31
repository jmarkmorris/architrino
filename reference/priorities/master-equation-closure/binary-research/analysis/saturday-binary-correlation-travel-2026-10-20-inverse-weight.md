# An inverse-separation-weighted angular balance without the common-motion correlation (2026-10-20)

## Result

**Weighting the period balance of the squared relative angular momentum by the inverse separation removes the uncontrolled common-motion correlation from it. What the delayed gain must then be balanced against is a property of the relative orbit alone: how much faster the pair separates while its transverse speed is large. Three exclusions follow at every separation, for every sign pattern of the angular momentum: no repeating history in the subwake class at speed bound one tenth or less has constant separation, none has constant angular momentum, and every one must breathe with a minimum radial amplitude, which grows with the size of the pair whenever the ratio of its largest to its smallest separation stays bounded. Strongly eccentric wide histories remain open.** The setting is the periodicity question of the [binary manuscript, Section 9](../manuscript.md#9-curved-delay-windows-and-the-unresolved-period-average), in the class of the accepted [actual-correlation note](saturday-actual-common-motion-correlations-2026-10-17.md):

- complete planar pairs of opposite unit polarity under the unchanged [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), with unit reduced coupling and wake speed $c_f=1$;
- twice continuously differentiable paths, positive separation $r$, and both speeds at most $w<1/3$ over the whole history;
- at every instant one ordinary partner root per member and no positive-delay root from the member's own past.

**Why a weight matters.** The accepted period balances integrate the rate of the relative angular momentum $J$ with some weight. The rate is a positive delayed gain, close to $J/r^2$, plus a common-motion term proportional to $P_\parallel P_\perp$, the product of the components of the velocity sum $\mathbf P=\mathbf v_1+\mathbf v_2$ along and across the separation axis. With the weight $J$ (the accepted sign-free balance) the common-motion term becomes the correlation $K_2=-\tfrac12\oint d\,P_\parallel P_\perp\,dt$, $d=J/r$, which contains the uncontrolled radial–anisotropy correlation $\tfrac18\oint\dot r(P_\parallel^2-P_\perp^2)\,dt$. With the weight $J/r$ the common-motion term becomes the *turning correlation* $\oint\dot\vartheta P_\parallel P_\perp\,dt$, where $\vartheta$ is the polar angle of the separation vector. The common-motion equation fixes that integral exactly, up to a bounded boundary term, as minus half the integral of a small nonnegative quantity plus a third-order remainder. The weight $1/r$ on $J^2$ is the only power weight with this property (Section 1).

1. **The inverse-weighted balance (derived).** For every relative-periodic history in the class, $\oint\dot r\,d^2\,dt=2\oint J\dot J\,r^{-1}dt$ exactly, and on solutions $\tfrac12\oint\dot r\,d^2\,dt\ge G(w,r_{\min})\oint r^{-2}dt$ with an explicit $G$. At $w=1/10$, $G>0.2437$ at the accepted separation floor and $G>0.997$ once $r_{\min}\ge10^4$ (Theorem R).
2. **Constant separation is excluded at every separation (derived).** If $r$ is constant the left side vanishes. Hence no relative-periodic history in the class at $w\le1/10$ has constant separation, whatever that separation is. The accepted exclusions reached normalized separation $2\times10^7$ for rigidly repeating histories with positive angular momentum, and $4.04\times10^6$ for every sign pattern (Corollary R.1).
3. **Constant angular momentum is excluded, and J must oscillate (derived).** If $J$ is constant the left side also vanishes. More generally, the oscillation of $J^2$ over a period, times the total variation of $1/r$, is at least $4G\oint r^{-2}dt$; hence $\max J^2-\min J^2\ge2G/w$, which exceeds $4.87$ at $w=1/10$. This removes the constant-angular-momentum alternative of the accepted October 10 and 11 notes for relative-periodic histories at $w\le1/10$, without their threshold on J or their bound on the separation (Corollary R.2).
4. **A minimum radial amplitude at every separation (derived; constants evaluated exactly).** The radial excursion $\Delta r=r_{\max}-r_{\min}$ satisfies $\Delta r\ge\kappa_aG\,r_{\min}/\sqrt{r_{\max}}$ and, where the accepted Theorem Z applies, $\Delta r\ge\kappa_bG\,r_{\min}/r_{\max}$. At $w=1/10$ and $r_{\min}\ge10^4$ these read $\Delta r>4.522\,r_{\min}/\sqrt{r_{\max}}$ and $\Delta r>140.9\,r_{\min}/r_{\max}$. A history with $r_{\min}\ge r_{\max}/2$ and $r_{\min}\ge10^4$ must therefore have $\Delta r>2.26\sqrt{r_{\max}}$, for example more than $22{,}600$ at $r_{\max}=10^8$ (Corollary R.3).
5. **What remains (derived for the reduction; inferred for its reading).** On this route the only uncontrolled quantity is the relative-orbit correlation $\oint\dot r\,d^2\,dt$, equivalently the inverse-weighted variation $2\oint J\dot J\,r^{-1}dt$ of the angular momentum. It contains no common-velocity factor. A useful upper bound on it, below $2G\oint r^{-2}dt$, would exclude a history; the size estimate $|\dot J|\le wc_+/r$ yields only item 4, which leaves wide strongly eccentric histories unexcluded (Section 4).

> Claim grade: derived for Theorem R and Corollaries R.1–R.3, by the hand proofs below from the accepted pointwise row bounds and kinematic identities on the stated class; the decimals are exact-rational evaluations by a same-author instrument that passed six known cases first, which is arithmetic verification and not independent evidence. Nothing is measured on a history. Falsifier: a complete relative-periodic history in the class at $w\le1/10$ with constant separation, or with constant angular momentum, or with $\tfrac12\oint\dot rd^2\,dt<G(w,r_{\min})\oint r^{-2}dt$, or with $\Delta r$ below either bound of item 4, refutes the corresponding statement; a valid solution violating one of the accepted pointwise inputs used invalidates that input and withdraws the proof support of the statements that use it, refuting one of them only if it also violates that statement's conclusion.

## Setting and accepted inputs

**Class and recurrence.** The class $\mathcal C_w$ is that of the [low-angular-momentum theorem](saturday-low-angular-momentum-2026-10-14.md#setting-and-accepted-inputs). A history is *relative-periodic* (J-periodic in the accepted notes) when $\mathbf r(t+T)=R\,\mathbf r(t)$ for one period $T>0$ and one orientation-preserving rotation $R$ of the motion plane, where $\mathbf r=\mathbf x_1-\mathbf x_2$; an orientation-reversing return is handled by doubling the period. Relative periodicity makes $r$, $\dot r$, $J$ and $d=J/r$ periodic. It does not make the velocity components $u_i,b_i$ of the members, or $P_\parallel,P_\perp$, periodic: the common velocity may drift or turn independently of the relative vector. Rigid recurrence (the same rotation and translation for both members) would make them periodic, but it is not assumed anywhere below; every boundary term that involves the common velocity is removed by averaging over many periods.

**Notation.** $\hat{\mathbf r}$, $\hat{\boldsymbol\theta}$ are the unit vectors along and across the axis, $\vartheta$ the continuous polar angle of $\mathbf r$, and $\dot\vartheta=J/r^2=d/r$. Member $i$ has velocity components $u_i$ along and $b_i$ across the axis, and $q_i=\hat{\boldsymbol\theta}\cdot\ddot{\mathbf x}_i$ is its actual acceleration across the axis; $P_\parallel=u_1+u_2$, $P_\perp=b_1+b_2$, $Q=P_\parallel^2-P_\perp^2$, and $\mathbf A=\ddot{\mathbf x}_1+\ddot{\mathbf x}_2$ has components $A_\parallel,A_\perp$. The functions $g(b)=(1-b^2)^{-1/2}-1$ and $\Phi(b)=1-\sqrt{1-b^2}-b^2/2$ satisfy $\Phi'(b)=bg(b)$, are even, nonnegative and increasing in $|b|$. Over one period, $I_n=\oint r^{-n}dt$, $L_d=\oint|d|\,dt$ and $Q_d=\oint d^2dt$. The *oscillation* of a function over a period is its largest value minus its smallest; the *total variation* of $1/r$ over a period is $\oint|\dot r|r^{-2}dt$. $\Delta r=r_{\max}-r_{\min}$ is the radial excursion.

**Accepted inputs, each pointwise and valid for any sign of J.**

- (I1)–(I5) of the low-J theorem: $\alpha/r^2\le a_i\le c_1/r^2$, with $\mu=(a_1+a_2)/2$ and $\delta=(a_2-a_1)/2$; $c_-/r^2\le A_r\le c_+/r^2$ with $c_+=2c_1$; $\dot J=\mu J+r\delta P_\perp+re_J$ with $|re_J|\le c_3/r^2$; $2r^2\delta=P_\parallel+\zeta$ with $|\zeta-\zeta_0|\le c/r$, $\zeta_0=u_1g(b_1)+u_2g(b_2)$ and $|\zeta_0|\le z_0=2wg(w)$; $\ddot r=d^2/r-A_r$.
- (I6) The actual-row decomposition of the [signed-breathing note](saturday-signed-breathing-radial-travel-2026-10-14.md), as used in the correlation note: $H=A_\parallel P_\parallel-A_\perp P_\perp=(P_\parallel^2+r^2\mu P_\perp^2)r^{-2}+\mathcal R$ with $0\le P_\parallel^2+r^2\mu P_\perp^2\le4w^2c_1$ and $|\mathcal R|\le4k_1r^{-2}+k_A'r^{-3}$.
- (I7) The kinematic identity $\dot Q=2H+4\dot\vartheta P_\parallel P_\perp$ (correlation note, Lemma C.1).
- (I8) The kinematic identity $\dot b_i=q_i-\dot\vartheta u_i$ and the algebraic identity $\zeta_0P_\perp=2(u_1b_1g(b_1)+u_2b_2g(b_2))-d\,(u_1g(b_1)-u_2g(b_2))$ of the [straight-term note](saturday-straight-strength-period-average-2026-10-12.md) (Lemmas Z.1 and Z.2). Neither divides by J.
- (I9) On solutions $q_1=a_1\sin\beta_1$ and $q_2=-a_2\sin\beta_2$, with $|\sin\beta_i|\le w$ ([non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md), Proposition D and bound B5), and $|\dot J|\le wc_+/r$ ([radial-period note](saturday-solution-weighted-geometry-comparison-2026-10-12.md)).
- From the low-J theorem: $\oint J\dot J\,dt=0$ and $\oint A_r\,dt=\oint d^2r^{-1}dt$ (Lemma 0), the floor $r_{\min}\ge c_-/(4w^2)$, and Theorem Z's mean bound $\langle|d|\rangle\le k$ where $D>0$.

The constants $\alpha,c_1,c_\pm,c_3,c,z_0,e=c_3+wc,D,k$ are those of the low-J theorem and $k_1,k_A'$ those of the signed-breathing note. All inputs are derived from the whole-history speed bound and the canonical per-hit row, whose transmitter factor is evaluated at emission and summed over the admitted roots; they are accepted in the cited reviews. No conserved energy, force, mass or angular momentum enters.

## 1. Which weight removes the radial–anisotropy correlation

Consider the period balance of $F=G(r)J^2/2$ for a weight $G$, so that $\dot F=\tfrac12G'(r)\dot rJ^2+GJ\dot J$. By (I3) and (I4), $GJ\cdot r\delta P_\perp=\tfrac12G\,(J/r)(P_\parallel+\zeta)P_\perp$, and its common-motion part, the $P_\parallel$ part, is $\tfrac12G\,(J/r)\,P_\parallel P_\perp=\tfrac12g\,\dot\vartheta P_\parallel P_\perp$ with $g=Gr$, because $J/r=r\dot\vartheta$. With $G=1$ this is $\tfrac12d\,P_\parallel P_\perp$, the integrand of $-K_2$. By (I7), for any periodic weight $g(r)$,

$$
\oint g\,\dot\vartheta P_\parallel P_\perp\,dt=\frac14\bigl[gQ\bigr]-\frac14\oint\dot g\,Q\,dt-\frac12\oint gH\,dt .
$$

The middle term is a radial–anisotropy correlation $\oint g'(r)\dot rQ\,dt$, which no accepted estimate controls by sign. It vanishes identically for every history exactly when $g$ is constant, that is $G=\text{const}/r$; among power weights $G=r^n$ this is $n=-1$. The accepted sign-free balance uses $G=1$, $g=r$, and so carries $\tfrac18\oint\dot rQ$ (with the factor $-\tfrac12$ of $K_2$). The balance below uses $G=1/r$.

## 2. The inverse-weighted balance

**Theorem R (derived).** Let a relative-periodic history in $\mathcal C_w$ be given. Then $\oint\dot r\,d^2\,dt=2\oint J\dot J\,r^{-1}dt$, and

$$
\frac12\oint\dot r\,d^2\,dt\ \ge\ G(w,r_{\min})\,I_2,
$$

$$
G(w,\rho)=\alpha c_--\bigl(w^2c_1+k_1\bigr)-\frac{k_A'}{4\rho}-(1+w)\,z_0c_1-e\,\min\Bigl\{2w,\sqrt{c_+/\rho}\Bigr\}.
$$

$G$ is nondecreasing in $\rho$, so $G(w,r_{\min})\ge G(w,c_-/(4w^2))$.

*Proof.* *The kinematic identity.* $J^2/r$ is continuously differentiable and periodic, so over $N$ periods $0=\int_0^{NT}\tfrac{d}{dt}(J^2/r)\,dt=2\int J\dot J\,r^{-1}dt-\int\dot rJ^2r^{-2}dt$, and $J^2/r^2=d^2$. Both integrands are periodic, so each period contributes equally.

*Splitting the rate.* By (I3) and (I4), $J\dot J/r=\mu J^2/r+J\delta P_\perp+Je_J$, and $J\delta P_\perp=\tfrac12\dot\vartheta(P_\parallel+\zeta)P_\perp$ because $J/r^2=\dot\vartheta$. So, over $N$ periods,

$$
\tfrac12\int\dot rd^2=\int\frac{\mu J^2}r+\tfrac12\int\dot\vartheta P_\parallel P_\perp+\tfrac12\int\dot\vartheta\zeta_0P_\perp+\tfrac12\int\dot\vartheta(\zeta-\zeta_0)P_\perp+\int Je_J .
$$

*Gain.* $\mu J^2/r=(r^2\mu)\,J^2r^{-3}\ge\alpha J^2r^{-3}$, and Lemma 0 with (I2) gives $\oint J^2r^{-3}dt=\oint A_r\,dt\ge c_-I_2$. One period contributes at least $\alpha c_-I_2$.

*Turning correlation.* By (I7), $\tfrac12\int\dot\vartheta P_\parallel P_\perp=\tfrac18[Q]-\tfrac14\int H$. Since $|Q|\le4w^2$, the boundary term is at least $-w^2$. By (I6), $\tfrac14H\le(w^2c_1+k_1)r^{-2}+\tfrac14k_A'r^{-3}$, and $I_3\le I_2/r_{\min}$. One period contributes at least $-(w^2c_1+k_1)I_2-\tfrac{k_A'}{4r_{\min}}I_2$.

*Straight strength difference.* By (I8), $\tfrac12\dot\vartheta\zeta_0P_\perp=\dot\vartheta\sum_iu_ib_ig(b_i)-\tfrac12\dot\vartheta d\,(u_1g(b_1)-u_2g(b_2))$. Differentiating $\Phi(b_i)$ with (I8) gives $\dot\vartheta u_ib_ig(b_i)=b_ig(b_i)q_i-\tfrac{d}{dt}\Phi(b_i)$. By (I9) and (I1), $|q_i|\le wc_1r^{-2}$, and $|b_ig(b_i)|\le wg(w)$, so $|\sum_ib_ig(b_i)q_i|\le2w^2g(w)c_1r^{-2}=wz_0c_1r^{-2}$. The boundary term $[\Phi(b_1)+\Phi(b_2)]$ lies in $[-2\Phi(w),2\Phi(w)]$. Next $\dot\vartheta d=d^2/r\ge0$ and $|u_1g(b_1)-u_2g(b_2)|\le z_0$, so $|\tfrac12\int\dot\vartheta d(u_1g_1-u_2g_2)|\le\tfrac12z_0\int d^2r^{-1}=\tfrac12z_0\int A_r\le\tfrac12z_0c_+\int r^{-2}=z_0c_1\int r^{-2}$. One period contributes at least $-(w+1)z_0c_1I_2$, apart from the bounded boundary term.

*Curvature terms.* $|\tfrac12\dot\vartheta(\zeta-\zeta_0)P_\perp|\le\tfrac12(|d|/r)(c/r)(2w)=wc|d|r^{-2}$ and $|Je_J|=|J|\,|re_J|/r\le c_3|d|r^{-2}$. Their sum is at most $e|d|r^{-2}$. Either $|d|\le2w$ gives $\oint|d|r^{-2}\le2wI_2$, or the Cauchy–Schwarz inequality with Lemma 0 gives $\oint|d|r^{-2}\le(\oint d^2r^{-1})^{1/2}I_3^{1/2}\le(c_+I_2)^{1/2}(I_2/r_{\min})^{1/2}$. One period contributes at least $-e\min\{2w,\sqrt{c_+/r_{\min}}\}I_2$.

*Assembly.* Summing, $\tfrac N2\oint\dot rd^2\ge NG(w,r_{\min})I_2-w^2-2\Phi(w)$. Divide by $N$ and let $N\to\infty$. Monotonicity in $\rho$ holds because $-k_A'/(4\rho)$ and $-e\min\{2w,\sqrt{c_+/\rho}\}$ do not decrease as $\rho$ grows. $\blacksquare$

**Reading.** The delayed gain enters with the weight $1/r^2$ through $\oint A_r=\oint J^2/r^3$: it is concentrated where the pair is close. The common-motion correlation in this weighting is the turning correlation, which the common-velocity equation pins down: it is a small loss of size at most $w^2c_1I_2$, plus a third-order remainder. So the only thing that can balance the gain is the kinematic term $\tfrac12\oint\dot rd^2$, which is positive when the transverse speed is larger on the way out than on the way in. Equivalently, since $\oint\dot rd^2=\oint r^{-1}\tfrac{d}{dt}(J^2)\,dt$, the squared angular momentum must on balance grow while the pair is close and fall while it is far. A history whose $r$ or $J$ does not vary has nothing to supply this term.

## 3. Consequences

**Corollary R.1 (constant separation; derived).** If $G(w,c_-/(4w^2))>0$, no relative-periodic history in $\mathcal C_w$ has constant separation. The exact evaluation gives $G(1/10,c_-/(4w^2))>0.2437$, so this holds for every history in the class with $w\le1/10$, at every separation and for every sign pattern of J.

*Proof.* $\dot r\equiv0$ makes the left side of Theorem R zero, while $G>0$ and $I_2>0$. A history whose speeds are bounded by some $w'\le1/10$ is in $\mathcal C_{1/10}$. $\blacksquare$

This extends the accepted constant-separation exclusions: through $10^6$ ([radial-period note](saturday-solution-weighted-geometry-comparison-2026-10-12.md)) and $2\times10^7$ ([signed-breathing note](saturday-signed-breathing-radial-travel-2026-10-14.md)) for rigidly repeating histories with positive J, and through $4.04\times10^6$ for every sign pattern ([correlation note](saturday-actual-common-motion-correlations-2026-10-17.md)). It is consistent with the accepted formal one-turn comparison of the non-mirror note, in which a circular relative orbit loses only the fraction $V_0^2/2$ of its gain; that comparison is not a solution and is not used.

**Corollary R.2 (angular momentum must oscillate; derived).** For every relative-periodic history in $\mathcal C_w$,

$$
\operatorname{osc}(J^2)\cdot\oint\frac{|\dot r|}{r^2}\,dt\ \ge\ 4G(w,r_{\min})\,I_2,
\qquad\text{hence}\qquad
\operatorname{osc}(J^2)\ge\frac{2G(w,r_{\min})}{w}.
$$

In particular no such history with $w\le1/10$ has constant J.

*Proof.* $\oint\dot rd^2=\oint J^2\dot r\,r^{-2}=-\oint J^2\tfrac{d}{dt}(r^{-1})$. Since $\oint\tfrac{d}{dt}(r^{-1})=0$, $J^2$ may be replaced by $J^2-\bar J^2$ with $\bar J^2$ the midpoint of its range, whose size is at most $\tfrac12\operatorname{osc}(J^2)$. So $\oint\dot rd^2\le\tfrac12\operatorname{osc}(J^2)\oint|\dot r|r^{-2}$; combine with Theorem R. Finally $|\dot r|=|u_1-u_2|\le2w$ gives $\oint|\dot r|r^{-2}\le2wI_2$. $\blacksquare$

At $w=1/10$ the oscillation of $J^2$ exceeds $4.87$ at the floor and $19.94$ once $r_{\min}\ge10^4$. The accepted non-mirror Theorem F excluded constant J only for $w\le0.14$, $J$ above the threshold $j_F(w)$ and bounded separation. Corollary R.2 needs neither the threshold nor the separation bound and allows every sign pattern. Corollary R.2 is certified and presented here for $w\le1/10$; its validity at somewhat larger speed bounds depends on the sign of $G$ there and is not claimed in this note.

**Corollary R.3 (minimum radial amplitude; derived).** For every relative-periodic history in $\mathcal C_w$,

$$
\Delta r\cdot L_d\ \ge\ \frac{2G(w,r_{\min})}{wc_+}\,r_{\min}r_{\max}I_2 .
$$

Consequently

$$
\Delta r\ \ge\ \kappa_a\,G(w,r_{\min})\,\frac{r_{\min}}{\sqrt{r_{\max}}},\qquad\kappa_a=\frac{2}{w\,c_+^{3/2}},
$$

and, at speed bounds with $D>0$,

$$
\Delta r\ \ge\ \kappa_b\,G(w,r_{\min})\,\frac{r_{\min}}{r_{\max}},\qquad\kappa_b=\frac{2}{w\,c_+k}.
$$

*Proof.* By the kinematic identity and $\oint J\dot J=0$, $\oint\dot rd^2=2\oint J\dot J(r^{-1}-r_h^{-1})$ for the constant $r_h^{-1}=\tfrac12(r_{\min}^{-1}+r_{\max}^{-1})$, and $|r^{-1}-r_h^{-1}|\le\tfrac12(r_{\min}^{-1}-r_{\max}^{-1})=\Delta r/(2r_{\min}r_{\max})$. By (I9), $|J\dot J|\le r|d|\cdot wc_+/r=wc_+|d|$. So $\oint\dot rd^2\le wc_+\Delta rL_d/(r_{\min}r_{\max})$; combine with Theorem R. For the first consequence, $L_d\le(TQ_d)^{1/2}$ with $T\le r_{\max}^2I_2$ and $Q_d\le r_{\max}\oint d^2r^{-1}=r_{\max}\oint A_r\le c_+r_{\max}I_2$, so $L_d\le c_+^{1/2}r_{\max}^{3/2}I_2$. For the second, Theorem Z gives $L_d\le kT\le kr_{\max}^2I_2$. $\blacksquare$

| $w$ | floor $c_-/(4w^2)$ | $G$ at floor $>$ | $G$ at $\rho=10^4$ $>$ | $G$ as $\rho\to\infty$ $>$ | $\kappa_a>$ | $\kappa_b>$ | $2G/w$ at floor $>$ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $1/10$ | $36.63$ | $0.24377$ | $0.99712$ | $1.0626$ | $4.5359$ | $141.34$ | $4.8754$ |
| $1/20$ | $171.68$ | $1.2764$ | $1.4427$ | $1.4724$ | $11.311$ | $5129.9$ | $51.056$ |
| $1/100$ | $4851.7$ | $1.8603$ | $1.8667$ | $1.8831$ | $67.604$ | $930273$ | $372.06$ |

| $w=1/10$, $r_{\min}\ge$ | $36.63$ (floor) | $100$ | $10^3$ | $10^4$ | $10^6$ | $10^8$ |
| --- | --- | --- | --- | --- | --- | --- |
| $G>$ | $0.24377$ | $0.40081$ | $0.85499$ | $0.99712$ | $1.0560$ | $1.0619$ |
| $\kappa_aG>$ | $1.1057$ | $1.8180$ | $3.8782$ | $4.5229$ | $4.7902$ | $4.8170$ |
| $\kappa_bG>$ | $34.455$ | $56.652$ | $120.84$ | $140.93$ | $149.26$ | $150.10$ |
| $\operatorname{osc}(J^2)>$ | $4.8754$ | $8.0162$ | $17.099$ | $19.942$ | $21.121$ | $21.239$ |

Each entry is a lower bound rounded down from the exact-rational value, and applies to every $r_{\min}$ at or above the column heading because $G$ is nondecreasing.

**Worked reading at speed bound one tenth.** A relative-periodic history that never comes closer than $10^4$ and whose separation varies by at most a factor two must have $\Delta r>2.26\sqrt{r_{\max}}$ and $\Delta r>70.4$: more than $226$ at $r_{\max}=10^4$, more than $2261$ at $r_{\max}=10^6$, and more than $22{,}600$ at $r_{\max}=10^8$. Under that ratio restriction the relative amplitude required tends to zero as the pair widens, while the absolute amplitude required grows without bound; without a bound on $r_{\max}/r_{\min}$ the requirement $\kappa_aG\,r_{\min}/\sqrt{r_{\max}}$ need not grow. Corollary R.3 holds at every separation, so it covers the wide range beyond $4.04\times10^6$ where the excursion requirement of the [companion centred-excursion note](saturday-binary-correlation-travel-2026-10-20.md) is empty; below about $10^6$ the companion requirement is the stronger of the two.

## 4. What remains on this route

Theorem R converts the periodicity question, on this route, into a question about the relative orbit alone: is $\tfrac12\oint\dot rd^2\,dt$, equivalently $\oint J\dot J\,r^{-1}dt$, at least $G\,I_2$? Corollaries R.1–R.3 are the explicit consequences: constant separation and constant J fail it, and so does any history whose radial excursion is below the bounds of Corollary R.3. Those bounds allow the required relative amplitude to tend to zero at large size, so near-circular wide histories with sufficient amplitude are not excluded. Strongly eccentric histories are not excluded either; this note does not show that they can satisfy the balance. Substituting the rate equation into $\oint J\dot J\,r^{-1}dt$ in the way used here returns the inequality of Theorem R and so supplies no new upper bound; that does not show that no other use of the rate equation could. An exclusion of the eccentric regime on this route therefore needs an upper bound on the inverse-weighted variation of $J^2$ that uses the coupled radial and angular dynamics over an orbit, for example an estimate of the in-and-out asymmetry of the radial motion; such an estimate is not derived here (inferred reading).

The accepted signed-breathing note's auxiliary frozen ellipse, with constant J and constant common velocity, has $\oint\dot rd^2=J^2\oint\dot r\,r^{-2}dt=0$ and so violates Theorem R; this confirms in a second way that it is not a solution, and adds no information about solutions. Large-separation eccentric recurrence, the eccentric-regime estimate above and general periodicity remain open.

## Limits

Planar, opposite-polarity, unit-coupling, complete histories below wake speed with positive separation are assumed throughout, together with relative periodicity after an orientation-preserving rotation (or a doubled period). The proofs use the accepted pointwise inputs (I1)–(I9) and the accepted Lemma 0, floor and Theorem Z; any defect there propagates. Corollaries R.1 and R.2 are stated for $w\le1/10$, where the exact evaluation certifies $G>0$ at the floor; an uncertified hand estimate puts $G$ at the floor below zero at $w=0.11$, so the speed range cannot be much enlarged with these constants, and its exact upper end is not located. The bound $\kappa_b$ needs $D>0$, which holds on $(0,8/75]$ by the accepted monotonicity proof. No history was integrated, no prescribed path was used, and no repeating solution is shown to exist. The constants are not claimed optimal. Mirror symmetry, constant common velocity, conserved J, rigid recurrence and observer-level physics are not assumed. Nothing here changes BP-001, production gates or canonical scores.

## Instrument

The tables come from the same exact-rational instrument as the companion note, [`correlation_travel_constants.py`](../evidence/saturday-binary-correlation-travel-2026-10-20/correlation_travel_constants.py), described in the [evidence README](../evidence/saturday-binary-correlation-travel-2026-10-20/README.md). It evaluates $G(w,\rho)$ with lower bounds for $\alpha c_-$ and upper bounds for every subtracted term, including an upper enclosure of $\sqrt{c_+/\rho}$, and evaluates $\kappa_a$, $\kappa_b$ with upper enclosures of $\sqrt{c_+}$ and $k$. Its six known cases include the exact zero-speed limit $G=2$. That is the author's arithmetic verification, not independent evidence.

## Falsifiers

- A relative-periodic history in $\mathcal C_w$ with $\oint\dot rd^2\ne2\oint J\dot J\,r^{-1}dt$ refutes the kinematic identity.
- A relative-periodic history in $\mathcal C_w$ with $\tfrac12\oint\dot rd^2<G(w,r_{\min})I_2$ refutes Theorem R; one at $w\le1/10$ with constant separation or constant J refutes Corollary R.1 or R.2; one violating the displayed inequalities of Corollary R.2 or R.3 refutes that corollary.
- A valid solution violating one of (I1)–(I9) invalidates that input and withdraws the proof support of every statement that uses it; it refutes such a statement only if it also violates that statement's conclusion.
- An exact re-evaluation in which a tabulated decimal is not conservative withdraws that entry.

## Reading record (operational)

The reading recorded in the companion note, completed on 2026-10-20 by 21:07Z before any derivation, covers this note; in addition the straight-term note's Lemmas Z.1 and Z.2 and the non-mirror note's Proposition D and bound B5 were read in full in that reading. This record is development provenance and not part of the academic treatment.
