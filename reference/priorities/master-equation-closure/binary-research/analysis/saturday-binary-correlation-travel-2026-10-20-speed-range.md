# The inverse-weighted angular balance at higher speed bounds, and an alternative amplitude coefficient (2026-10-20)

## Result

**The low-angular-momentum theorem's mean and separation bounds need its coefficient $D$ to be positive, and the actual-correlation radial-speed lines need the stronger condition $D>m$; $D$ is negative on $[0.11,1/3)$. The inverse-separation-weighted balance does not use $D$. For every speed bound up to $27/100$ it therefore excludes, once the closest approach exceeds an explicit distance, repeating histories with constant separation or constant angular momentum, and it forces a minimum radial amplitude there. Where Theorem Z applies, using the full angular-momentum rate instead of its size bound gives an alternative amplitude coefficient; it is stronger at the three tabulated speed bounds, by a factor $1.78$ at speed bound one tenth and by larger factors at smaller speed bounds, but not at every speed bound with $D>0$.** The setting, class, recurrence and notation are those of the [inverse-weight note](saturday-binary-correlation-travel-2026-10-20-inverse-weight.md), whose Theorem R and Corollaries R.1–R.3 this note uses:

- complete planar pairs of opposite unit polarity under the unchanged [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), with unit reduced coupling and wake speed $c_f=1$;
- twice continuously differentiable paths, positive separation, and both speeds at most $w<1/3$ over the whole history;
- one ordinary partner root per member and no positive-delay root from the member's own past;
- relative periodicity after an orientation-preserving rotation, without rigid recurrence.

Theorem R states $\tfrac12\oint\dot r\,d^2\,dt\ge G(w,r_{\min})\oint r^{-2}dt$, with $d=J/r$ the relative transverse speed and

$$
G(w,\rho)=\alpha c_--\bigl(w^2c_1+k_1\bigr)-\frac{k_A'}{4\rho}-(1+w)\,z_0c_1-e\,\min\Bigl\{2w,\sqrt{c_+/\rho}\Bigr\}.
$$

Its proof uses the accepted pointwise row bounds, Lemma 0 and the separation floor of the low-angular-momentum theorem, but neither the coefficient $D=\alpha-2we/c_-$ nor Theorem Z. Corollaries R.1 and R.2 and the first amplitude bound of R.3 likewise need only $G>0$ at the history's closest approach.

1. **Thresholds above speed one tenth (derived; thresholds evaluated exactly).** For each tabulated speed bound $w\le27/100$ there is an explicit distance $\rho_w$ with $G(w,\rho)>0$ for all $\rho\ge\rho_w$. Every relative-periodic history in $\mathcal C_w$ whose closest approach is at least $\rho_w$ has non-constant separation, non-constant angular momentum, $\operatorname{osc}(J^2)\ge2G/w$, and $\Delta r\ge\kappa_aG\,r_{\min}/\sqrt{r_{\max}}$ (Corollary S.1). For example $\rho_w=63$ at $w=11/100$, $9199$ at $w=1/5$, $740{,}904$ at $w=1/4$ and $1.713\times10^7$ at $w=27/100$.
2. **Where the method stops (derived for the sign; inferred for its reading).** The large-separation limit $G_\infty(w)$ of $G$ is strictly decreasing in $w$; it is positive at $w=27/100$ and negative at $w=3/10$. Above the crossing the method gives nothing at any separation (Proposition S.2). This is a limit of the constants, not a statement about histories.
3. **An alternative amplitude coefficient where Theorem Z applies (derived).** Bounding $|J\dot J|$ by the full accepted rate rather than by $wc_+|d|$ replaces the factor $wc_+$ in Corollary R.3 by $\beta=c_1k+2wc_2+2wc_3k/c_-$, giving $\Delta r\ge\kappa_a'G\,r_{\min}/\sqrt{r_{\max}}$ and $\Delta r\ge\kappa_b'G\,r_{\min}/r_{\max}$ with $\kappa_a'>8.073$ and $\kappa_b'>251.5$ at $w=1/10$, against $4.535$ and $141.3$ before. The new coefficient is the stronger one exactly when $\beta<wc_+$, which holds at the three tabulated speed bounds; both bounds remain valid, so the larger of the two requirements may always be used (Proposition S.3).

> Claim grade: derived for Corollary S.1, Proposition S.2 and Proposition S.3, by the hand arguments below from Theorem R of the inverse-weight note and the accepted inputs it lists, together with Theorem Z for Proposition S.3; the thresholds and coefficients are exact-rational evaluations by a same-author instrument that passed seven known cases first, one of them against values computed independently by the inverse-weight note's reviewer. This is arithmetic verification, not independent evidence. Nothing is measured on a history. Falsifier: a complete relative-periodic history in $\mathcal C_w$ at a tabulated $w$, with closest approach at least $\rho_w$, that has constant separation or constant angular momentum, or violates one of the stated amplitude bounds, refutes Corollary S.1 or Proposition S.3; an exact re-evaluation with $G(w,\rho_w)\le0$ withdraws that threshold.

## 1. Thresholds above speed one tenth

**Corollary S.1 (derived).** Let $w<1/3$ and $\rho_w$ be such that $G(w,\rho)>0$ for every $\rho\ge\rho_w$. Then every relative-periodic history in $\mathcal C_w$ with $r_{\min}\ge\rho_w$ satisfies the conclusions of the inverse-weight note's Corollaries R.1 and R.2 and the first amplitude bound of its Corollary R.3: its separation is not constant, its angular momentum is not constant, $\operatorname{osc}(J^2)\ge2G(w,r_{\min})/w$, and $\Delta r\ge\kappa_aG(w,r_{\min})\,r_{\min}/\sqrt{r_{\max}}$ with $\kappa_a=2/(wc_+^{3/2})$. Every history whose speed bound is some $w'\le w$ belongs to $\mathcal C_w$, so the same threshold serves for it.

*Proof.* Theorem R holds for every relative-periodic history in $\mathcal C_w$ with $G=G(w,r_{\min})$, and $G(w,\cdot)$ is nondecreasing, so $r_{\min}\ge\rho_w$ gives $G>0$. The proofs of Corollaries R.1, R.2 and of the bound with $\kappa_a$ use only Theorem R, the kinematic identity $\oint\dot rd^2=2\oint J\dot J\,r^{-1}dt$, Lemma 0, $|\dot r|\le2w$ and $|J\dot J|\le wc_+|d|$; none uses $D$ or Theorem Z. $\blacksquare$

The instrument certifies, for each tabulated $w$, an integer $\rho_w$ (or the lower bound of the floor $c_-/(4w^2)$ when $G$ is already positive there) with $G(w,\rho_w)>0$ in exact rational arithmetic; since $G$ is nondecreasing in $\rho$, every larger $\rho$ qualifies. The table gives these certified thresholds; they are upper bounds on the least admissible threshold, not its exact value.

| speed bound $w$ | floor $c_-/(4w^2)$ | $G$ at floor (display) | certified threshold $\rho_w$ | $G_\infty(w)>$ |
| --- | --- | --- | --- | --- |
| $1/10$ | $36.63$ | $0.2437$ | floor | $1.0626$ |
| $21/200$ | $32.69$ | $0.0968$ | floor | $1.0266$ |
| $11/100$ | $29.30$ | $-0.0630$ | $63$ | $0.99145$ |
| $1/8$ | $21.60$ | $-0.640$ | $129$ | $0.89019$ |
| $3/20$ | $13.80$ | $-2.096$ | $463$ | $0.73384$ |
| $1/5$ | $6.531$ | $-9.784$ | $9199$ | $0.45322$ |
| $1/4$ | $3.485$ | $-47.49$ | $740{,}904$ | $0.18814$ |
| $27/100$ | $2.771$ | $-104.0$ | $17{,}126{,}360$ | $0.078679$ |

The middle column is a coarse approximate display, to the digits shown, of the exact lower bound of $G$ at the floor, not a directed bound; a negative entry means only that this floor-based certificate is empty there, not that a history exists. The floor column and the last column are lower bounds rounded down.

**Reading.** At speed bound one fifth no relative-periodic history whose closest approach is at least $9199$ has constant separation or constant angular momentum, and every such history has $\operatorname{osc}(J^2)>0$ and a positive minimum amplitude. The low-angular-momentum theorem's D-dependent bounds and the actual-correlation lines carry no conclusion at that speed, because they need $D>0$ (respectively $D>m$), and $D<0$ on $[0.11,1/3)$ by the accepted monotonicity proof. The accepted constant-separation exclusions of the radial-period and signed-breathing notes rest on other sufficient inequalities and are stated at speed bound one tenth only; this note does not assess whether their methods extend to speed one fifth. The threshold grows quickly with $w$ because the curvature allowance $e\sqrt{c_+/\rho}$ grows with $w$ through the curved-window constant $c(w)$, which diverges as $w\to1/3$.

## 2. Where the method stops

**Proposition S.2 (derived).** $G_\infty(w)=\alpha c_--(w^2c_1+k_1)-(1+w)z_0c_1$ is strictly decreasing on $(0,1/3)$, and $G(w,\rho)<G_\infty(w)$ for every $\rho$. The exact evaluation gives $G_\infty(27/100)>0.0786$ and $G_\infty(3/10)<-0.0970$. Hence $G_\infty$ has exactly one zero in $(27/100,3/10)$, and above it $G(w,\rho)<0$ for every $\rho$.

*Proof.* $\alpha=(1-w)^2/(1+w)$ and $c_-=2\alpha\sqrt{1-w^2}$ are positive and strictly decreasing. $c_1=(1+w)^2/(1-w)$, $c_2=(3w+w^3)/(1-w^2)$ and $g(w)=(1-w^2)^{-1/2}-1$ are nonnegative and increasing, so $z_0=2wg(w)$, $k_1=\tfrac14(2wz_0+2w^3c_1+w^2c_2)$, $w^2c_1$ and $(1+w)z_0c_1$ are increasing. So $G_\infty$ is strictly decreasing. The subtracted terms $k_A'/(4\rho)$ and $e\min\{2w,\sqrt{c_+/\rho}\}$ are positive. The two signs come from exact lower and upper enclosures of $G_\infty$ respectively. $\blacksquare$

The zero of $G_\infty$ is a property of the constants in the accepted bounds; sharper row bounds would move it. It is not a speed above which repeating histories are known to exist.

## 3. An alternative amplitude coefficient where Theorem Z applies

**Proposition S.3 (derived).** At a speed bound with $D>0$, put $\beta=c_1k+2wc_2+2wc_3k/c_-$, with $k=(w^2+wz_0)/D$ the accepted Theorem Z constant. Every relative-periodic history in $\mathcal C_w$ satisfies $\Delta r\,L_d\ge(2G/\beta)\,r_{\min}r_{\max}I_2$, where $L_d=\oint|d|\,dt$ and $I_2=\oint r^{-2}dt$; consequently

$$
\Delta r\ge\kappa_a'G\,\frac{r_{\min}}{\sqrt{r_{\max}}},\quad\kappa_a'=\frac2{\beta\sqrt{c_+}},\qquad
\Delta r\ge\kappa_b'G\,\frac{r_{\min}}{r_{\max}},\quad\kappa_b'=\frac2{\beta k}.
$$

*Proof.* The accepted rate $\dot J=\mu J+r\delta P_\perp+re_J$ with $r^2\mu\le c_1$ (input I1), $r^2|\delta|\le c_2$ (the [signed-breathing note](saturday-signed-breathing-radial-travel-2026-10-14.md)'s accepted bound), $|P_\perp|\le2w$ and $|re_J|\le c_3/r^2$ gives $|\dot J|\le c_1|J|r^{-2}+2wc_2r^{-1}+c_3r^{-2}$, hence $|J\dot J|\le c_1d^2+2wc_2|d|+c_3|d|/r$. Integrate: $\oint|J\dot J|\le c_1Q_d+2wc_2L_d+c_3\oint|d|r^{-1}$, with $Q_d=\oint d^2dt$. Theorem Z gives $Q_d\le kL_d$, and the accepted estimate $\oint|d|r^{-1}\le(2w/c_-)Q_d$ then gives $\oint|d|r^{-1}\le(2wk/c_-)L_d$; so $\oint|J\dot J|\le\beta L_d$. The proof of Corollary R.3 shows $\oint\dot rd^2\le\Delta r\oint|J\dot J|/(r_{\min}r_{\max})$; combining with Theorem R gives the product inequality. The two consequences follow as in Corollary R.3, from $L_d\le c_+^{1/2}r_{\max}^{3/2}I_2$ and from $L_d\le kT\le kr_{\max}^2I_2$. $\blacksquare$

| $w$ | $\beta<$ | $wc_+$ | $\kappa_a'>$ (was $\kappa_a>$) | $\kappa_b'>$ (was $\kappa_b>$) |
| --- | --- | --- | --- | --- |
| $1/10$ | $0.15107$ | $0.26889$ | $8.073$ ($4.535$) | $251.5$ ($141.3$) |
| $1/20$ | $0.019263$ | $0.11605$ | $68.15$ ($11.31$) | $30907$ ($5129$) |
| $1/100$ | $7.0876\times10^{-4}$ | $0.020608$ | $1965.6$ ($67.60$) | $2.7049\times10^7$ ($9.3027\times10^5$) |

As $w\to0$, $k=w^2+O(w^3)$, $c_1=1+O(w)$ and $c_2=3w+O(w^3)$, so $\beta=7w^2+O(w^3)$ while $wc_+=2w+O(w^2)$, and the ratio $wc_+/\beta$ behaves like $2/(7w)$. At larger speed bounds the comparison can reverse: at the end $w=8/75$ of the accepted positive-$D$ interval the [chunk-3 round-1 review](../evidence/saturday-binary-correlation-travel-2026-10-20/review/chunk3-reply-round1.md)'s independent evaluation gives $\beta\approx0.3905>wc_+\approx0.2925$, so there the original coefficient of Corollary R.3 is the stronger. Both bounds hold wherever $D>0$, and the larger requirement may be used. **Worked reading at speed bound one tenth.** A relative-periodic history with $r_{\min}\ge10^4$ and $r_{\min}\ge r_{\max}/2$, where $G>0.997$, now needs $\Delta r>\tfrac12\cdot8.073\cdot0.997\sqrt{r_{\max}}>4.02\sqrt{r_{\max}}$ and $\Delta r>125$: more than $568$ at $r_{\max}=2\times10^4$ and more than $40{,}200$ at $r_{\max}=10^8$. (The endpoint $r_{\max}=10^4$ with $r_{\min}\ge10^4$ would mean constant separation, which Corollary R.1 already excludes.)

## Limits

The class and assumptions are those of the inverse-weight note, and every statement depends on its Theorem R and on the accepted inputs listed there; any defect propagates. Corollary S.1 and Proposition S.2 do not use $D$ or Theorem Z; Proposition S.3 does, and so is stated only at speed bounds with $D>0$. The thresholds are certified at the tabulated speeds only; a speed bound between two tabulated values uses the larger one's threshold, by nesting of the classes. Large-separation thresholds at speed bounds near $27/100$ are of order $10^7$, so the gain there is limited to wide histories. No history was integrated, no prescribed path was used, and no repeating solution is shown to exist. Strongly eccentric histories and general periodicity remain open at every speed. Mirror symmetry, constant common velocity, conserved J, rigid recurrence and observer-level physics are not assumed. Nothing here changes BP-001, production gates or canonical scores.

## Instrument

The thresholds and coefficients come from [`correlation_travel_speed_range.py`](../evidence/saturday-binary-correlation-travel-2026-10-20/correlation_travel_speed_range.py), described in the [evidence README](../evidence/saturday-binary-correlation-travel-2026-10-20/README.md). It is separate from the instrument of the two companion notes, which stays frozen. It evaluates a lower enclosure of $G$ and two-sided enclosures of $G_\infty$ in exact rational arithmetic, doubles $\rho$ from the floor until $G>0$ and then bisects over integers keeping $G>0$ at the returned value. Its seven known cases include exact zero-speed limits and the inverse-weight reviewer's independently computed values $G(0.105,\text{floor})\approx0.0969$ and $G(0.11,\text{floor})\approx-0.0630$. Its printed decimals are nearest-rounded displays; every certified sign and threshold was decided in exact arithmetic, and the decimals above are rounded conservatively and coarsely from them, except the column of approximate displays of $G$ at the floor.

## Falsifiers

- A complete relative-periodic history in $\mathcal C_w$ at a tabulated $w$ with $r_{\min}\ge\rho_w$ and constant separation, constant angular momentum, $\operatorname{osc}(J^2)<2G/w$ or $\Delta r<\kappa_aG\,r_{\min}/\sqrt{r_{\max}}$ refutes Corollary S.1; one at a speed bound with $D>0$ violating Proposition S.3's bounds refutes it.
- An exact evaluation with $G(w,\rho_w)\le0$, $G_\infty(27/100)\le0$ or $G_\infty(3/10)\ge0$ withdraws the corresponding entry or sign; an exact evaluation showing any other tabulated bound to be non-conservative withdraws that entry.
- A valid solution violating one of the accepted inputs invalidates that input and withdraws the proof support of every statement using it.

## Reading record (operational)

The reading recorded in the companion centred-excursion note, completed on 2026-10-20 by 21:07Z, covers this note. The inverse-weight note's round-1 review, which supports Theorem R, was read in full at about 21:27Z before this note was written. This record is development provenance and not part of the academic treatment.
